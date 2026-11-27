import {test, expect} from '../helpers/fixtures';
import {Seed, money, reportLeftovers} from '../helpers/seed';
import {isoDateIn, RUN_TAG} from '../fixtures/test-data';

/**
 * 222 — the amounts by the rules: a listing's own fees (a cleaning fee per stay and a city tax per guest a night with a cap
 * of 2 nights) and what the engine charges for them — every line apart, the total their sum.
 * @qa-description: Сумите по правилата — такси на наша обява (почистване на престой, туристически данък на гост на нощ с таван 2 нощи): офертата ред по ред и общото; без резервация
 * @qa-level: regression
 *
 * Proves, on our inactive listing (API, 100 € a night) whose fees are set through the API (the listing's fee editor is
 * looked at in 220; the fee is set ONLY on this listing — the QA person, 2026-11-27): the system „Cleaning fee“ 30 € per
 * stay and the system „City Tax“ 2 € per guest a night, capped at 2 nights, are stored as set (read back); the quote of
 * 3 nights for 2 adults is, line by line: rent 3 × 100 € = 300 €, Cleaning 30 €, City Tax 2 € × 2 guests × 2 nights (the cap)
 * = 8 €; total = 338 €; the quote of 1 night is rent 100 €, Cleaning 30 €, City Tax 2 € × 2 × 1 = 4 € (under the cap), total
 * 134 €. Every other fee of a quote is named; a „QA …“ one is a leftover of another test, not a bug; any other unexpected
 * fee is recorded for QA, not failed. The rules (the amounts, the cap) live ONLY in the fees of our listing: the account's
 * system „Cleaning fee“ and „City Tax“ are read through the API before and after and must be the same — else a STOP (as
 * 203). Nothing is reserved: a quote creates no record and bills nothing.
 * Creates: listing ×1 (API, archived — a known leftover). Needs: 003 green.
 */
const SPEC = '222';
// the account's SYSTEM fee items the listing's fees point to — never changed (read before and after; a difference is a STOP)
const SYSTEM = ['fee-19', 'fee-1'];
const pick = (f: any) => JSON.stringify({name_en: f?.name_en, feeItemType: f?.feeItemType, chargeType: f?.chargeType, allowedChargeTypes: f?.allowedChargeTypes, allocation: f?.allocation, status: f?.status, system: f?.system, defaultAmount: f?.defaultAmount, capNights: f?.capNights, capAmount: f?.capAmount, exemptAgeUnder: f?.exemptAgeUnder});
const LISTING = `QA G2 Amounts Listing ${RUN_TAG}`;

test.describe('222 pricing › the amounts by the rules', () => {
    test.setTimeout(300_000);

    test('a cleaning fee per stay and a capped city tax: every line of the quote and the total', async ({adminApi}, testInfo) => {
        const seed = new Seed(adminApi, SPEC);
        const before: Record<string, string> = {};
        for (const id of SYSTEM) before[id] = pick(await adminApi.read('feeItem', id));
        try {
            const listing = await seed.listing(LISTING, {price: 100});
            const own: any = await adminApi.read('listing', listing.id);
            const fees = [
                ...(own.fees || []),
                {feeItem: {id: 'fee-19'}, feeItemType: 'fee', chargeType: 'perStay', condition: 'online', allocation: 'owner', amount: 30, currency: 'eur', status: 'active', source: 'manual', syncWithTemplate: false},
                {feeItem: {id: 'fee-1'}, feeItemType: 'tax', chargeType: 'perGuestNight', condition: 'online', allocation: 'owner', amount: 2, currency: 'eur', status: 'active', source: 'manual', syncWithTemplate: false, capNights: 2}
            ];
            await adminApi.must('PUT', '/listing', {id: listing.id, fees});
            const stored: any[] = ((await adminApi.read<any>('listing', listing.id))?.fees || []);
            const cleaning = stored.find(f => (f.feeItem?.id || f.feeItem) === 'fee-19');
            const city = stored.find(f => (f.feeItem?.id || f.feeItem) === 'fee-1');
            expect(cleaning?.amount, 'Cleaning fee 30 € is stored on the listing').toBe(30);
            expect(city?.amount, 'City Tax 2 € is stored on the listing').toBe(2);
            expect(city?.capNights, 'the City Tax cap of 2 nights is stored').toBe(2);

            const check = async (nights: number, expected: {rent: number; cleaning: number; city: number}) => {
                const q = await seed.quote(listing.id, isoDateIn(60), isoDateIn(60 + nights), 2);
                const lines: any[] = q.lines || [];
                const sum = (re: RegExp) => lines.filter(l => re.test(l.name)).reduce((s, l) => s + money(l.total), 0);
                for (const l of lines.filter(l => l.lineType !== 'accommodation' && !/Cleaning fee|City Tax/i.test(l.name) && money(l.total) !== 0))
                    testInfo.annotations.push({type: /^QA /.test(l.name) ? 'остатък от друг тест' : 'неочаквана такса', description: `${nights} нощ(и): ${l.name} ${money(l.total)} €`});
                expect(money(q.accommodation), `${nights} night(s): rent = ${nights} × 100 €`).toBe(expected.rent);
                expect(sum(/Cleaning fee/i), `${nights} night(s): Cleaning fee per stay`).toBe(expected.cleaning);
                expect(sum(/City Tax/i), `${nights} night(s): City Tax 2 € × 2 guests × min(nights, 2)`).toBe(expected.city);
                const others = lines.filter(l => l.lineType !== 'accommodation' && !/Cleaning fee|City Tax/i.test(l.name)).reduce((s, l) => s + money(l.total), 0);
                expect(money(q.totalPrice), `${nights} night(s): total = rent + Cleaning + City Tax (+ the named others)`).toBe(expected.rent + expected.cleaning + expected.city + others);
            };
            await test.step('3 nights, 2 adults: 300 + 30 + 8 (the cap) = 338 €', () => check(3, {rent: 300, cleaning: 30, city: 8}));
            await test.step('1 night, 2 adults: 100 + 30 + 4 = 134 €', () => check(1, {rent: 100, cleaning: 30, city: 4}));
        } finally {
            reportLeftovers(testInfo, await seed.cleanup());
            for (const id of SYSTEM) {
                const after = pick(await adminApi.read('feeItem', id));
                if (after !== before[id]) {
                    testInfo.annotations.push({type: 'СПРИ', description: `системната такса ${id} се е променила в ${new Date().toISOString()}: преди ${before[id]} · след ${after}`});
                    throw new Error(`STOP — the system fee item ${id} is not as it was: before ${before[id]}, after ${after}. Nothing retried.`);
                }
            }
        }
    });
});
