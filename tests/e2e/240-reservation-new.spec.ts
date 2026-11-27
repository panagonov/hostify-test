import {test, expect} from '../helpers/fixtures';
import {GridPage} from '../helpers/page-objects/GridPage';
import {MultiCalendar} from '../helpers/page-objects/MultiCalendar';
import {NewReservationDialog} from '../helpers/page-objects/NewReservationDialog';
import {probePage, expectPresentable} from '../helpers/probe';
import {Seed, money, reportLeftovers} from '../helpers/seed';
import {billingUnchanged} from '../helpers/billing';
import {isoDateIn, RUN_TAG} from '../fixtures/test-data';

/**
 * 240 — a new reservation, from the Calendar and from Reservations › „New reservation without the calendar“.
 * @qa-description: Reservations › нова резервация от Calendar и без календара — активна обява, суми (наем, такси, общо), застъпване, връзките, Billing без промяна; Cancel в края
 * @qa-level: regression
 *
 * Proves (variant A of the QA person, 2026-11-26 — the dialog „Add reservation“ lists ACTIVE listings only): „QA G1 Listing
 * <run mark>“ is made ACTIVE through the API (100 € a night) and the listing is in Listings › Active listings; Settings ›
 * Billing (look only) is RECORDED before the first reservation and after the last (nothing is paid at this stage —
 * the QA person, 2026-11-27);
 * A) in the Calendar three nights in 8 days are selected → More → Update Calendar → Add reservation: the dialog comes with
 *    the listing; our guest is picked; it is created: 3 nights; rent 300 €;
 * B) Reservations › the arrow next to „Add new“ › „New reservation without the calendar“: an empty create is refused;
 *    2 nights in 30 days, our guest: rent 200 €;
 * for both the amounts are checked APART: rent = nights × 100 €, every fee / tax the account adds named one by one,
 * total = rent + fees (a fee we did not expect is recorded, not failed); both are Direct, accepted, unpaid; a reservation
 * on nights that are taken is refused; a check-out before the check-in is refused; both are in Reservations and on the
 * guest; Billing still shows nothing after the last. The payment field is never filled; the automations of a new
 * reservation are switched off at once.
 * Cleanup: both reservations CANCELLED under the guards (a reservation is never deleted, −649); the guest removed; the
 * listing archived (a known leftover the demo wipe of 002 removes).
 * Creates: listing ×1, guest ×1 (API), reservation ×2 (Calendar and the dialog). Needs: 003 green.
 */
const SPEC = '240';
const LISTING = `QA G1 Listing ${RUN_TAG}`;
const GUEST = {first: 'QA G1', last: `Guest ${RUN_TAG}`, email: `qa.g1.guest.${RUN_TAG}@hostify-qa.test`};

test.describe('240 reservations › new reservation', () => {
    test.setTimeout(600_000);

    test('from the Calendar and without it: amounts apart, overlap refused, links, Billing unchanged', async ({page, signInAs, adminApi}, testInfo) => {
        const seed = new Seed(adminApi, SPEC);
        const amounts = async (id: string, nights: number) => {
            const r: any = await adminApi.read('reservation', id);
            expect(r.status, 'status').toBe('accepted');
            expect(r.source?.name || r.source, 'source').toMatch(/Direct/);
            expect(money(r.amountPaid), 'nothing paid').toBe(0);
            const items: any[] = r.items || [];
            const rent = items.filter(i => i.lineType === 'accommodation').reduce((s, i) => s + money(i.total), 0);
            const fees = items.filter(i => i.lineType !== 'accommodation' && i.lineType !== 'cost' && money(i.total) !== 0);
            for (const f of fees) testInfo.annotations.push({type: 'такса, добавена от акаунта', description: `${r.code}: ${f.name} (${f.lineType}) ${money(f.total)} €`});
            if (fees.length) testInfo.annotations.push({type: 'неочаквана такса', description: `${r.code}: ${fees.length} — за решение на QA`});
            expect(rent, `${r.code}: rent = ${nights} nights × 100 €`).toBe(nights * 100);
            expect(money(r.totalPrice), `${r.code}: total = rent + fees`).toBe(rent + fees.reduce((s, f) => s + money(f.total), 0));
            return r;
        };
        try {
            const listing = await seed.listing(LISTING, {price: 100, activate: true});
            const guest = await seed.guest(GUEST.first, GUEST.last, GUEST.email);
            await signInAs('admin');

            await test.step('the activated listing is in Listings › Active listings', async () => {
                const listings = new GridPage(page, 'listing');
                await listings.goto('/listingsMenu/listings');
                await listings.waitLoaded();
                await listings.search(LISTING);
                await expect(listings.row(LISTING), 'the active listing in the grid').toBeVisible({timeout: 30_000});
                await listings.clearFilters();
            });
            await billingUnchanged(page, testInfo, 'before the first reservation');

            // nights the Calendar shows without scrolling far (it opens on today)
            const aIn = isoDateIn(8), aLast = isoDateIn(10), aOut = isoDateIn(11);
            let aId = '', bId = '';
            await test.step(`A) the Calendar: nights ${aIn} … ${aLast} → More → Add reservation`, async () => {
                const cal = new MultiCalendar(page);
                await cal.open();
                await cal.search(LISTING);
                await cal.select(listing.id, aIn, aLast);
                await expect(cal.selectionNights, 'the selection bar counts 3 nights').toContainText(/3 nights/);
                const uc = await cal.more();
                expectPresentable(await probePage(page, testInfo, 'update-calendar'));
                await uc.addReservation.click();
                const d = new NewReservationDialog(page);
                await d.waitOpen();
                await expect(d.root, 'the dialog comes with the listing').toContainText(LISTING);
                await expect(d.dateInputs.nth(0), 'and with the first night').toHaveValue(aIn);
                await expect(d.dateInputs.nth(1), 'and the check-out after the third night').toHaveValue(aOut);
                await d.pickGuest(guest.name);
                await expect(d.total, 'the quote: 3 nights × 100 €').toContainText(/300/, {timeout: 30_000});
                await expect(d.payment.locator('input').first(), 'the payment stays empty').toHaveValue('');
                await d.create.click();
                await expect(d.root, 'the dialog closes after Create').toBeHidden({timeout: 30_000});
                const mine = (await adminApi.search<any>('reservation', {searchTerm: guest.name, size: 20}))
                    .filter(r => (r.listing?.id || r.listing) === listing.id && String(r.checkIn).startsWith(aIn));
                expect(mine, 'one reservation of ours on those nights').toHaveLength(1);
                aId = mine[0].id;
                await seed.adopt(aId, `${mine[0].code} — ${guest.name}`);
                const r = await amounts(aId, 3);
                expect(String(r.checkOut), 'check-out after the third night').toContain(aOut);
            });
            const bIn = isoDateIn(30), bOut = isoDateIn(32);
            await test.step(`B) Reservations › New reservation without the calendar: refused empty, then 2 nights from ${bIn}`, async () => {
                const grid = new GridPage(page, 'reservation');
                await grid.goto('/reservationsMenu/reservations');
                await grid.waitLoaded();
                let d = await NewReservationDialog.openFromReservations(page);
                expectPresentable(await probePage(page, testInfo, 'new-reservation-dialog'));
                await d.create.click();
                await expect(d.validation.first(), 'an empty reservation is refused').toBeVisible({timeout: 15_000});
                await d.close();
                d = await NewReservationDialog.openFromReservations(page);
                await d.pickListing(LISTING);
                await d.dates(bIn, bOut);
                await d.pickGuest(guest.name);
                await expect(d.total, 'the quote: 2 nights × 100 €').toContainText(/200/, {timeout: 30_000});
                await expect(d.payment.locator('input').first(), 'the payment stays empty').toHaveValue('');
                await d.create.click();
                await expect(d.root, 'the dialog closes after Create').toBeHidden({timeout: 30_000});
                const mine = (await adminApi.search<any>('reservation', {searchTerm: guest.name, size: 20}))
                    .filter(r => (r.listing?.id || r.listing) === listing.id && String(r.checkIn).startsWith(bIn));
                expect(mine, 'one reservation of ours on those nights').toHaveLength(1);
                bId = mine[0].id;
                await seed.adopt(bId, `${mine[0].code} — ${guest.name}`);
                await amounts(bId, 2);
            });
            await test.step('nights that are taken are refused; a check-out before the check-in too', async () => {
                const d = await NewReservationDialog.openFromReservations(page);
                await d.pickListing(LISTING);
                await d.dates(bIn, bOut);
                await expect(d.verdict.or(d.error).first(), 'the engine refuses nights that are taken').toBeVisible({timeout: 30_000});
                await expect(d.verdict.or(d.error).first()).not.toHaveText(/^\s*bookable\s*$/i);
                await d.close();
                const q = await adminApi.post('/reservation/quote', {listing: {id: listing.id}, checkIn: bOut, checkOut: bIn, adults: 2, children: 0});
                expect(q.success, 'a check-out before the check-in is refused').not.toBe(true);
            });
            await test.step('both reservations are in Reservations and on the guest', async () => {
                const grid = new GridPage(page, 'reservation');
                await grid.goto('/reservationsMenu/reservations');
                await grid.waitLoaded();
                for (const id of [aId, bId]) {
                    const r: any = await adminApi.read('reservation', id);
                    await grid.search(r.code);
                    await expect(grid.row(r.code), `${r.code} in the grid`).toBeVisible({timeout: 30_000});
                }
                await grid.clearFilters();
                await expect.poll(async () => Number((await adminApi.read<any>('guest', guest.id))?.reservationsCount || 0), {message: 'the guest counts both reservations', timeout: 60_000}).toBe(2);
            });
            await billingUnchanged(page, testInfo, 'after the last reservation');
        } finally {
            reportLeftovers(testInfo, await seed.cleanup());
        }
    });
});
