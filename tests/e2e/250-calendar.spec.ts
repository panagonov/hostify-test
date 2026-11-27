import {test, expect} from '../helpers/fixtures';
import {MultiCalendar, UpdateCalendar} from '../helpers/page-objects/MultiCalendar';
import {probePage, expectPresentable} from '../helpers/probe';
import {Seed, money, reportLeftovers} from '../helpers/seed';
import {billingUnchanged} from '../helpers/billing';
import {isoDateIn, RUN_TAG} from '../fixtures/test-data';

/**
 * 250 — Calendar: a reservation on its nights, a block, a price of a night — through the selection bar and „Update
 * Calendar“.
 * @qa-description: Calendar — резервацията на нощите си, блокиране на 2 нощи (не се дават) и отблокиране, цена на нощ 120 € и обратно 100 €; Sync никога
 * @qa-level: regression
 *
 * Proves, on our listing (API, 100 € a night) with our reservation of 2 nights (API, Direct, unpaid, automations off): the
 * Calendar finds the listing by its name; the nights of the reservation are not free and the free ones show 100 €; two
 * free nights selected → More → Update Calendar → Availability „Blocked“ → saved: the nights are blocked and the quote of
 * them is refused; → „Available (Default)“: free again and bookable; one night → Daily price „Set“ 120 → saved: the quote
 * of that night is 120 €; set back to 100 €. Settings › Billing is recorded before and after (look only). Sync is never
 * pressed (channels are absolute — no channel on this listing either).
 * Creates: listing ×1, guest ×1, reservation ×1 (API; the reservation cancelled, the others known leftovers). Needs: 003.
 */
const SPEC = '250';
const LISTING = `QA G1 Calendar Listing ${RUN_TAG}`;

test.describe('250 calendar', () => {
    test.setTimeout(480_000);

    test('the reservation on its nights; block and unblock; the price of a night', async ({page, signInAs, adminApi}, testInfo) => {
        const seed = new Seed(adminApi, SPEC);
        try {
            const listing = await seed.listing(LISTING, {price: 100});
            const guest = await seed.guest('QA G1 Calendar', `Guest ${RUN_TAG}`, `qa.g1.calendar.${RUN_TAG}@hostify-qa.test`);
            await signInAs('admin');
            await billingUnchanged(page, testInfo, 'before the reservation');
            await seed.reservation({listing, guest, inDays: 5, nights: 2});
            const cal = new MultiCalendar(page);
            await cal.open();
            await cal.search(LISTING);
            expectPresentable(await probePage(page, testInfo, 'calendar-listing'));
            await test.step('the nights of the reservation are taken, a free night shows 100 €', async () => {
                for (const n of [5, 6]) await expect(cal.cell(listing.id, isoDateIn(n)), `the night ${isoDateIn(n)} is taken`).not.toHaveAttribute('data-state', 'free');
                await expect(cal.cell(listing.id, isoDateIn(8)), 'a free night').toHaveAttribute('data-state', 'free');
                await expect(cal.cell(listing.id, isoDateIn(8)), 'its price').toHaveAttribute('title', /100/);
            });
            const set = async (from: number, to: number, what: (uc: UpdateCalendar) => Promise<void>) => {
                await cal.select(listing.id, isoDateIn(from), isoDateIn(to));
                const uc = await cal.more();
                await uc.ensurePeriod(isoDateIn(from), isoDateIn(to));
                await what(uc);
                await uc.save.click();
                await expect(uc.root, 'Update Calendar closes after the save').toBeHidden({timeout: 30_000});
            };
            await test.step('two nights blocked: not free, not bookable; unblocked: free and bookable again', async () => {
                await set(9, 10, async uc => { await uc.choice('Blocked').click(); testInfo.annotations.push({type: 'Block reason', description: await uc.pickBlockReason()}); });
                await expect.poll(async () => (await seed.quote(listing.id, isoDateIn(9), isoDateIn(11))).verdict, {message: 'blocked nights are not bookable', timeout: 60_000}).not.toBe('bookable');
                await cal.open(); await cal.search(LISTING);
                await expect(cal.cell(listing.id, isoDateIn(9)), 'the blocked night').not.toHaveAttribute('data-state', 'free');
                await set(9, 10, async uc => { await uc.choice('Available (Default)').click(); });
                await expect.poll(async () => (await seed.quote(listing.id, isoDateIn(9), isoDateIn(11))).verdict, {message: 'the nights are bookable again', timeout: 60_000}).toBe('bookable');
            });
            await test.step('the price of one night: 120 €, then 100 € again', async () => {
                const price = (v: string) => async (uc: UpdateCalendar) => {
                    await uc.choice('Set').click();
                    await uc.dailyPrice.fill(v);
                };
                await cal.open(); await cal.search(LISTING);
                await set(12, 12, price('120'));
                await expect.poll(async () => money((await seed.quote(listing.id, isoDateIn(12), isoDateIn(13))).accommodation), {message: 'the night costs 120 €', timeout: 60_000}).toBe(120);
                await cal.open(); await cal.search(LISTING);
                await set(12, 12, price('100'));
                await expect.poll(async () => money((await seed.quote(listing.id, isoDateIn(12), isoDateIn(13))).accommodation), {message: 'the night costs 100 € again', timeout: 60_000}).toBe(100);
            });
            await billingUnchanged(page, testInfo, 'after the reservation');
        } finally {
            reportLeftovers(testInfo, await seed.cleanup());
        }
    });
});
