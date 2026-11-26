import {test, expect} from '../helpers/fixtures';
import {Sidebar} from '../helpers/page-objects/Sidebar';
import {GridPage} from '../helpers/page-objects/GridPage';
import {ListingWizard} from '../helpers/page-objects/ListingWizard';
import {probePage, expectPresentable} from '../helpers/probe';
import {Seed, money, reportLeftovers} from '../helpers/seed';
import {isoDateIn, RUN_TAG} from '../fixtures/test-data';

/**
 * 211 — Listings › „Create a new listing“: a listing through the six steps of the wizard, Finish without activation.
 * @qa-description: Listings › нова обява през помощника — шестте стъпки, отказ на празни стъпки, Back пази данните, Finish без активиране
 * @qa-level: regression
 *
 * Proves: the wizard opens from Listings; an empty General and an empty Layout are refused (their required fields speak);
 * Back keeps what was typed; „QA Listing Wizard <run mark>“ goes through General (Apartment, Bulgaria, Sofia, QA Street), Layout
 * (2 guests, 1 bedroom, 1 bathroom), Amenities (Hot water), Texts (English title), Policies (EUR, 100 € a night, check-in
 * from 15:00, check-out 11:00, instant booking for everyone) and Photos with „Activate now (PMS Services ON)“ UNTICKED; after
 * Finish the listing is in the API, NOT active, and the engine prices its nights at 100 € (3 nights = 300 € of
 * accommodation). Never pressed: Import from the link, Save & Exit, Add photo.
 * Cleanup: the listing is archived and removed; a removal refused because of its linked records is a known leftover the
 * demo-data wipe of 002 removes (the QA person, 2026-11-26).
 * Creates: listing ×1. Needs: 003 green.
 */
const SPEC = '211';
// the run's mark: an archived listing of an earlier run keeps its nickname until 002 (a nickname is unique)
const NICK = `QA Listing Wizard ${RUN_TAG}`;

test.describe('211 listings › new listing wizard', () => {
    test.setTimeout(420_000);

    test('a listing goes through the six steps and is created inactive at 100 € a night', async ({page, signInAs, adminApi}, testInfo) => {
        const seed = new Seed(adminApi, SPEC);
        try {
            await signInAs('admin');
            const sidebar = new Sidebar(page);
            await sidebar.openGroup('listingsMenu');
            await sidebar.openItem(['listings']);
            const grid = new GridPage(page, 'listing');
            await grid.waitLoaded();
            await grid.createButton.click();
            await expect(page).toHaveURL(/\/listingsMenu\/listingWizard/);
            const w = new ListingWizard(page);
            await w.waitOpen();
            expectPresentable(await probePage(page, testInfo, 'listing-wizard-general'));

            await test.step('General: an empty step is refused; then filled', async () => {
                await w.next.click();
                await expect(w.errors.first(), 'the empty General step is refused').toBeVisible({timeout: 15_000});
                await expect(w.activeStep).toHaveText(/General/);
                await w.textbox(/Listing nickname/).fill(NICK);
                await w.pick(/Property type/, /^Apartment$/);
                await w.pick(/Country/, /Bulgaria/, 'Bulgaria');
                await w.pick(/City/, /Sofia/, 'Sofia');
                await w.textbox(/^\W*Street$/).fill('QA Street');
                await w.continueTo(/Layout/);
            });
            await test.step('Layout: an empty step is refused; Back keeps General; then filled', async () => {
                await w.next.click();
                await expect(w.errors.first(), 'the empty Layout step is refused (Capacity, Bedrooms, Bathrooms)').toBeVisible({timeout: 15_000});
                await w.back.click();
                await expect(w.textbox(/Listing nickname/), 'Back keeps the nickname').toHaveValue(NICK);
                await w.continueTo(/Layout/);
                await w.spin(/Capacity/).fill('2');
                await w.spin(/Bedrooms/).fill('1');
                await w.spin(/Bathrooms/).fill('1');
                await w.continueTo(/Amenities/);
            });
            await test.step('Amenities, Texts, Policies', async () => {
                await w.amenity(/^Hot water/);
                await w.continueTo(/Texts/);
                await w.pick(/Language/, /^(EN|English)/);
                await w.textbox(/^Title$/).fill(NICK);
                await w.continueTo(/Policies/);
                expectPresentable(await probePage(page, testInfo, 'listing-wizard-policies'));
                await w.pick(/Currency/, /EUR/i, 'EUR');
                await w.spin(/Default price/).fill('100');
                await w.pick(/Booking window/, /./);
                await w.pick(/Check-in from/, /^15:00$/, '15:00');
                await w.textbox(/Check-out/).fill('11:00');
                await w.pick(/Instant booking/, /Everyone/);
                await w.continueTo(/Photos/);
            });
            await test.step('Photos: „Activate now“ is unticked; Finish', async () => {
                await w.activateNow.uncheck();
                await expect(w.activateNow, '„Activate now (PMS Services ON)“ is off before Finish').not.toBeChecked();
                await w.finish.click();
                // Finish stays on the wizard's address (1.0.31); the listing is there once the API lists it
                await expect.poll(async () => (await adminApi.search<any>('listing', {searchTerm: NICK, size: 20})).filter(x => x.nickname === NICK).length,
                    {message: 'Finish creates the listing', timeout: 60_000}).toBe(1);
                expectPresentable(await probePage(page, testInfo, 'listing-wizard-finished'));
            });
            await test.step('the listing is in the API, not active, and its nights cost 100 €', async () => {
                const l = (await adminApi.search<any>('listing', {searchTerm: NICK, size: 20})).find(x => x.nickname === NICK);
                expect(l?.id, 'the listing is readable through the API').toBeTruthy();
                seed.adoptListing(l.id, NICK);
                expect(l.status, 'the listing is not active (Activate now was off)').not.toBe('active');
                expect(JSON.stringify(l), 'the street of General').toContain('QA Street');
                const q = await seed.quote(l.id, isoDateIn(60), isoDateIn(63));
                expect(q.nights, 'nights').toBe(3);
                expect(String(q.currency).toLowerCase(), 'currency').toBe('eur');
                expect(money(q.accommodation), 'accommodation of 3 nights × 100 €').toBe(300);
            });
        } finally {
            reportLeftovers(testInfo, await seed.cleanup());
        }
    });
});
