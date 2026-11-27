import {test, expect} from '../helpers/fixtures';
import {formJourney, cleanBefore} from '../helpers/journey';
import {qaName} from '../fixtures/test-data';

/**
 * 201 — Settings › VAT settings: the account's setting of a SYSTEM VAT rate through its form; the system rate is exactly as
 * before at the end.
 * @qa-description: Settings › VAT settings — настройка на системна ДДС ставка през формата: отказ на празна, запис, API, редакция, изтриване; системната ставка непроменена (иначе СПРИ)
 * @qa-level: regression
 *
 * Proves: an empty form is refused (VAT rate required); the list offers the SYSTEM VAT rates (our own rates are not in it,
 * 1.0.36); a setting of the first of them named „QA VAT override“, Active, is saved — the API gives back the same; the row's
 * Edit changes its name; the row's Remove deletes it; the system rate read through the API at the end is the same as at
 * the start — if not, a STOP (as 203 for the Cleaning fee).
 * Creates: vatRateSetting ×1 (removed at the end). Needs: 003 green.
 */
const SPEC = '201';
const ENTITY = 'vatRateSetting';
const NAME = qaName('VAT override');
const pick = (v: any) => JSON.stringify({name: v?.name, ratePercent: v?.ratePercent, rateType: v?.rateType, status: v?.status, priceIncludesVat: v?.priceIncludesVat, country: v?.country?.id || v?.country});

test.describe('201 settings › vat settings', () => {
    test.setTimeout(300_000);
    test.beforeAll(async () => cleanBefore(ENTITY, SPEC, 'QA VAT override'));

    test('a setting of a system VAT rate goes through its form; the system rate stays as it was', async ({page, signInAs, adminApi}, testInfo) => {
        let rate: any = null, before = '';
        try {
            await formJourney(page, signInAs, adminApi, testInfo, {
                spec: SPEC, entity: ENTITY, menu: ['settings', 'vatRateSettings'], url: /\/app\/settings\/vatRateSettings/,
                path: '/settings/vatRateSettings', createTitle: 'Create vat rate setting', editTitle: /vat rate setting|QA VAT override/i,
                required: ['vatRate'], name: NAME,
                fill: async form => {
                    const chosen = await form.pickFirst('vatRate');
                    testInfo.annotations.push({type: 'VAT rate', description: chosen});
                    rate = (await adminApi.search<any>('vatRate', {searchTerm: chosen.split(/\s+[(·-]/)[0], size: 20})).find(v => chosen.includes(v.name));
                    expect(rate?.id, `the system VAT rate „${chosen}“ is readable`).toBeTruthy();
                    before = pick(await adminApi.read('vatRate', rate.id));
                    await form.fill('name', NAME);
                    await form.setSwitch('active', true);
                },
                saved: r => {
                    expect(r.name, 'Name').toBe(NAME);
                    expect(r.vatRate?.id || r.vatRate, 'the setting is of the chosen system rate').toBe(rate.id);
                },
                edit: async form => form.fill('name', `${NAME} 2`),
                edited: r => expect(r.name, 'the edited Name').toBe(`${NAME} 2`)
            });
        } finally {
            if (rate) {
                const after = pick(await adminApi.read('vatRate', rate.id));
                if (after !== before) {
                    testInfo.annotations.push({type: 'СПРИ', description: `системната ДДС ставка ${rate.id} се е променила в ${new Date().toISOString()}: преди ${before} · след ${after}`});
                    throw new Error(`STOP — the system VAT rate (${rate.id}) is not as it was: before ${before}, after ${after}. Nothing retried.`);
                }
            }
        }
    });
});
