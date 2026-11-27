import {test, expect} from '../helpers/fixtures';
import {GridPage} from '../helpers/page-objects/GridPage';
import {ReservationPage} from '../helpers/page-objects/ReservationPage';
import {probePage, expectPresentable} from '../helpers/probe';
import {Seed, money, reportLeftovers} from '../helpers/seed';
import {billingUnchanged} from '../helpers/billing';
import {isoDateIn, RUN_TAG} from '../fixtures/test-data';

/**
 * 241 — the record page of a reservation: its tabs, the notes, the guests, Extend, and Cancel through the page.
 * @qa-description: Reservations › страницата на резервация — табовете, бележка, брой гости без смяна на цената, Extend до 4 нощувки = 400 €, Cancel през страницата (празна причина, Close, отказ), нощите се освобождават
 * @qa-level: regression
 *
 * Proves, on our reservation (API: our listing 100 € a night, our guest @hostify-qa.test, 3 nights = 300 €, Direct,
 * unpaid, automations off): every tab of the record opens and is presentable; the notes are edited on the page and read
 * back; 3 guests instead of 2 do not change the price of the made stay (1.0.26 — the change through the API); Actions ›
 * Extend to a 4th night prices it from the calendar: 4 nights = 400 €; Actions › Cancel — an empty reason is refused,
 * Close cancels nothing, then „Cancelled by: Host“ + a reason cancels it (status Cancelled, in the view Cancelled) — only
 * after the guards of seed.ts; the nights are free again (the quote of those nights is bookable). Settings › Billing is
 * recorded before and after (look only). Never pressed: a payment (Request / Charge / Record), Add card, Conversation,
 * Re-evaluate automations, Create invoice.
 * Creates: listing ×1, guest ×1, reservation ×1 (API; the reservation cancelled, the others known leftovers). Needs: 003.
 */
const SPEC = '241';
const LISTING = `QA G1 Details Listing ${RUN_TAG}`;

test.describe('241 reservations › the record page', () => {
    test.setTimeout(480_000);

    test('tabs, notes, guests, Extend, Cancel through the page; the nights are free again', async ({page, signInAs, adminApi}, testInfo) => {
        const seed = new Seed(adminApi, SPEC);
        try {
            const listing = await seed.listing(LISTING, {price: 100});
            const guest = await seed.guest('QA G1 Details', `Guest ${RUN_TAG}`, `qa.g1.details.${RUN_TAG}@hostify-qa.test`);
            await signInAs('admin');
            await billingUnchanged(page, testInfo, 'before the reservation');
            const r: any = await seed.reservation({listing, guest, inDays: 50, nights: 3});
            expect(money(r.totalPrice), '3 nights × 100 €').toBe(300);
            const rp = new ReservationPage(page);
            await rp.goto(`/reservationsMenu/reservations/${r.id}/info`);
            await expect(rp.status, 'the status of the reservation').toBeVisible({timeout: 30_000});

            await test.step('every tab of the record opens', async () => {
                for (const tab of ['nights', 'info', 'financialBreakdown', 'checkin', 'alterations', 'resolutions', 'automations', 'reviews', 'tasks', 'communications']) {
                    await rp.tab(tab).click();
                    await rp.waitForSpinners().catch(() => undefined);
                    expectPresentable(await probePage(page, testInfo, `reservation-${tab}`));
                }
                await rp.tab('info').click();
            });
            await test.step('the notes are edited on the page and read back', async () => {
                await rp.editNotes.click();
                await rp.notesBox.fill('QA note: late arrival');
                await page.keyboard.press('Enter');
                await expect.poll(async () => (await adminApi.read<any>('reservation', r.id))?.notes, {message: 'the notes in the API', timeout: 30_000}).toBe('QA note: late arrival');
            });
            await test.step('3 guests instead of 2 do not change the price of the made stay (1.0.26)', async () => {
                await adminApi.must('PUT', '/reservation', {id: r.id, adults: 3});
                const after: any = await adminApi.read('reservation', r.id);
                expect(after.adults, 'adults').toBe(3);
                expect(money(after.totalPrice), 'the price stays 300 €').toBe(300);
            });
            await test.step('Actions › Extend to a 4th night: 400 €', async () => {
                await page.reload();
                await rp.action(/Extend/);
                await rp.pickDay(rp.extendDate, isoDateIn(54));
                await rp.dialogOk.click();
                await expect(rp.dialog).toBeHidden({timeout: 30_000});
                await expect.poll(async () => money((await adminApi.read<any>('reservation', r.id))?.totalPrice), {message: '4 nights × 100 €', timeout: 60_000}).toBe(400);
                const after: any = await adminApi.read('reservation', r.id);
                expect(Number(after.nights), 'nights').toBe(4);
            });
            await test.step('Actions › Cancel: an empty reason is refused, Close cancels nothing, then it is cancelled', async () => {
                await seed.mayCancel(r.id);
                await page.reload();
                await rp.openCancel();
                await rp.dialogOk.click();
                await expect(rp.validation.first(), 'an empty reason is refused').toBeVisible({timeout: 15_000});
                await rp.dialogClose.click();
                await expect(rp.dialog).toBeHidden({timeout: 15_000});
                expect((await adminApi.read<any>('reservation', r.id))?.status, 'Close cancels nothing').toBe('accepted');
                await rp.openCancel();
                await rp.cancelReason.fill('QA cancel test');
                await rp.dialogOk.click();
                await expect(rp.dialog).toBeHidden({timeout: 30_000});
                await expect.poll(async () => (await adminApi.read<any>('reservation', r.id))?.status, {message: 'the reservation is cancelled', timeout: 30_000}).toBe('cancelled');
                const grid = new GridPage(page, 'reservation');
                await grid.goto('/reservationsMenu/reservations');
                await grid.waitLoaded();
                await grid.search(r.code);
                await expect(grid.row(r.code), 'the cancelled reservation is in the grid').toBeVisible({timeout: 30_000});
                await grid.clearFilters();
                const q = await seed.quote(listing.id, isoDateIn(50), isoDateIn(54));
                expect(q.verdict, 'the nights are free again').toBe('bookable');
            });
            await billingUnchanged(page, testInfo, 'after the reservation');
        } finally {
            reportLeftovers(testInfo, await seed.cleanup());
        }
    });
});
