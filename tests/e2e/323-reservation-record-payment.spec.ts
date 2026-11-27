import {test, expect} from '../helpers/fixtures';
import {GridPage} from '../helpers/page-objects/GridPage';
import {ReservationPage} from '../helpers/page-objects/ReservationPage';
import {probePage, expectPresentable} from '../helpers/probe';
import {Seed, money, reportLeftovers} from '../helpers/seed';
import {billingUnchanged} from '../helpers/billing';
import {RUN_TAG} from '../fixtures/test-data';

/**
 * 323 — Record payment: a payment RECORDED on our reservation (cash or bank transfer — no processor, no card, no money
 * moved; the QA person, 2026-11-27).
 * @qa-description: Record payment на наша резервация — само запис (в брой / банков превод, без процесор и карта): платено 100 €, дължимо 200 €, статусът на плащането, транзакцията в Finance › Transactions
 * @qa-level: regression
 *
 * Proves, on our reservation (API: our listing 100 € a night, our guest @hostify-qa.test, 3 nights = 300 €, Direct,
 * unpaid, automations off): the reservation's Finance card › Record payment opens „Record a payment“ with no processor and
 * no card field; 100 € paid by cash (or bank transfer) with the note „QA record only“ is saved; the API then gives
 * amount paid 100 €, amount due 200 €, a guest payment status that is no longer „not paid“; the transaction is in Finance ›
 * Transactions with its method and amount and no processor account. Settings › Billing is recorded before and after.
 * Never pressed: Request payment, Charge card, Add card.
 * Cleanup: the transaction is removed (refused — a known leftover; never a refund); the reservation is cancelled — the
 * guard „nothing paid“ accepts exactly THIS recorded amount of THIS spec; the guest and the listing known leftovers.
 * Creates: listing, guest, reservation (API), paymentTransaction ×1 (the dialog). Needs: 003 green.
 */
const SPEC = '323';

test.describe('323 reservations › record payment', () => {
    test.setTimeout(420_000);

    test('100 € recorded in cash on our reservation: paid 100, due 200, the transaction without a processor', async ({page, signInAs, adminApi}, testInfo) => {
        const seed = new Seed(adminApi, SPEC);
        let txId = '';
        let first: unknown = null;
        try {
            const listing = await seed.listing(`QA G4 Payment Listing ${RUN_TAG}`, {price: 100});
            const guest = await seed.guest('QA G4 Payment', `Guest ${RUN_TAG}`, `qa.g4.payment.${RUN_TAG}@hostify-qa.test`);
            await signInAs('admin');
            await billingUnchanged(page, testInfo, 'before the reservation');
            const r: any = await seed.reservation({listing, guest, inDays: 45, nights: 3});
            const rp = new ReservationPage(page);
            await rp.goto(`/reservationsMenu/reservations/${r.id}/info`);
            await expect(rp.status).toBeVisible({timeout: 30_000});
            await test.step('Record payment: 100 € in cash, no processor, no card', async () => {
                await rp.recordPayment.click();
                await expect(rp.paymentDialog, 'the dialog „Record a payment“').toBeVisible({timeout: 15_000});
                expectPresentable(await probePage(page, testInfo, 'record-payment'));
                await expect(rp.paymentDialog, 'no processor and no card in the dialog').not.toContainText(/processor|card number|credit card/i);
                await rp.paymentAmount.fill('100');
                testInfo.annotations.push({type: 'Paid by', description: await rp.pickPaidBy(/^\s*(Cash|Bank transfer)\s*$/i)});
                await rp.paymentNote.fill('QA record only');
                await rp.paymentOk.click();
                await expect(rp.paymentDialog).toBeHidden({timeout: 30_000});
            });
            await test.step('the API: paid 100 €, due 200 €, the payment status; the transaction without a processor', async () => {
                await expect.poll(async () => money((await adminApi.read<any>('reservation', r.id))?.amountPaid), {message: 'amount paid', timeout: 60_000}).toBe(100);
                const after: any = await adminApi.read('reservation', r.id);
                expect(money(after.amountDue), 'amount due').toBe(200);
                expect(after.guestPaymentStatus, 'the guest payment status').not.toBe('notPaid');
                testInfo.annotations.push({type: 'Guest payment status', description: String(after.guestPaymentStatus)});
                const tx = (await adminApi.search<any>('paymentTransaction', {size: 50})).filter(t => (t.reservation?.id || t.reservation) === r.id);
                expect(tx, 'one transaction of our reservation').toHaveLength(1);
                txId = tx[0].id;
                seed.allowRecordedPayment(r.id, 100);
                expect(money(tx[0].amount), 'the transaction amount').toBe(100);
                expect(tx[0].processorAccount ?? null, 'no processor account').toBeFalsy();
                const grid = new GridPage(page, 'paymentTransaction');
                await grid.goto('/finance/paymentTransactions');
                await grid.waitLoaded();
                await grid.search(guest.name);
                await expect(grid.rows.first(), 'the transaction in Finance › Transactions').toBeVisible({timeout: 30_000});
                await grid.clearFilters();
            });
            await billingUnchanged(page, testInfo, 'after the payment');
        } catch (e) {
            first = e;
        }
        try {
            const leftovers = [];
            if (txId) {
                const gone = await adminApi.remove('paymentTransaction', txId);
                if (!gone.ok) leftovers.push({entity: 'paymentTransaction', id: txId, name: 'QA record only', why: gone.message || 'refused'});
            }
            leftovers.push(...await seed.cleanup());
            reportLeftovers(testInfo, leftovers);
        } catch (cleanupError) {
            if (!first) throw cleanupError;
            testInfo.annotations.push({type: 'почистване', description: String((cleanupError as Error)?.message || cleanupError).slice(0, 400)});
        }
        if (first) throw first;
    });
});
