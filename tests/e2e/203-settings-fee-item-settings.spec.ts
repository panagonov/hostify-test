import {test, expect} from '../helpers/fixtures';
import {formJourney, cleanBefore} from '../helpers/journey';
import {qaName} from '../fixtures/test-data';

/**
 * 203 — Settings › Fee item settings: the account's setting of a SYSTEM fee item through its form; the system item is
 * exactly as before at the end.
 * @qa-description: Settings › Fee item settings — настройка на системната Cleaning fee през формата: отказ на празна, запис, API, редакция, изтриване; системната такса непроменена (иначе СПРИ)
 * @qa-level: regression
 *
 * Proves: an empty form is refused (Fee item required); a setting of the system „Cleaning fee“ named „QA Cleaning
 * override“, Active, is saved — the API gives back the same; the row's Edit changes its name; the row's Remove deletes it;
 * the system Cleaning fee read through the API at the end is the same as at the start — if not, a STOP (the QA person,
 * 2026-11-27).
 * Creates: feeItemSetting ×1 (removed at the end). Needs: 003 green.
 */
const SPEC = '203';
const ENTITY = 'feeItemSetting';
const NAME = qaName('Cleaning override');
const pick = (f: any) => JSON.stringify({name: f?.name, name_en: f?.name_en, feeItemType: f?.feeItemType, chargeType: f?.chargeType, status: f?.status, allocation: f?.allocation, defaultAmount: f?.defaultAmount, accountCode: f?.accountCode});

test.describe('203 settings › fee item settings', () => {
    test.setTimeout(300_000);
    test.beforeAll(async () => cleanBefore(ENTITY, SPEC, 'QA Cleaning'));

    test('a setting of the system Cleaning fee goes through its form; the system item stays as it was', async ({page, signInAs, adminApi}, testInfo) => {
        const cleaning = (await adminApi.search<any>('feeItem', {searchTerm: 'Cleaning', size: 50})).find(f => f.system && /^Cleaning fee$/i.test(f.name_en || f.name || ''));
        expect(cleaning?.id, 'the system fee item „Cleaning fee“').toBeTruthy();
        const before = pick(await adminApi.read('feeItem', cleaning.id));
        try {
            await formJourney(page, signInAs, adminApi, testInfo, {
                spec: SPEC, entity: ENTITY, menu: ['settings', 'feeItemSettings'], url: /\/app\/settings\/feeItemSettings/,
                path: '/settings/feeItemSettings', createTitle: 'Create fee item setting', editTitle: /fee item setting|QA Cleaning/i,
                required: ['feeItem'], name: NAME,
                fill: async form => {
                    await form.pickFirst('feeItem', /^Cleaning fee$/i, 'Cleaning');
                    await form.fill('name', NAME);
                    await form.setSwitch('active', true);
                },
                saved: r => {
                    expect(r.name, 'Name').toBe(NAME);
                    expect(r.feeItem?.id || r.feeItem, 'the setting is of the system Cleaning fee').toBe(cleaning.id);
                },
                edit: async form => form.fill('name', `${NAME} 2`),
                edited: r => expect(r.name, 'the edited Name').toBe(`${NAME} 2`)
            });
        } finally {
            const after = pick(await adminApi.read('feeItem', cleaning.id));
            if (after !== before) {
                testInfo.annotations.push({type: 'СПРИ', description: `системната Cleaning fee (${cleaning.id}) се е променила в ${new Date().toISOString()}: преди ${before} · след ${after}`});
                throw new Error(`STOP — the system Cleaning fee (${cleaning.id}) is not as it was: before ${before}, after ${after}. Nothing retried.`);
            }
        }
    });
});
