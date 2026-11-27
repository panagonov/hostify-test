import {test, expect} from '../helpers/fixtures';
import {formJourney, cleanBefore} from '../helpers/journey';
import {qaName} from '../fixtures/test-data';

/**
 * 313 — Owners › Contract templates: one template through its form, from create to remove (no owner needed).
 * @qa-description: Owners › Contract templates — шаблон на договор през формата (20 % комисиона): отказ на празна, запис, четене през API, редакция на 25 %, изтриване
 * @qa-level: regression
 *
 * Proves: an empty form is refused (Name required); „QA Contract Template 20%“ (Active, management commission 20 %) is saved
 * — the API gives back the same; the row's Edit sets 25 % and the API shows it; the row's Remove deletes it.
 * Creates: ownerContractTemplate ×1 (removed at the end). Needs: 003 green.
 */
const SPEC = '313';
const ENTITY = 'ownerContractTemplate';
const NAME = qaName('Contract Template 20%');
const percent = (r: any) => Number(JSON.stringify(r).match(/"managementCommissionPercent"\s*:\s*([\d.]+)/)?.[1]);

test.describe('313 owners › contract templates', () => {
    test.setTimeout(300_000);
    test.beforeAll(async () => cleanBefore(ENTITY, SPEC, 'QA Contract Template'));

    test('a contract template goes through its form: refused empty, created, read back, edited, removed', async ({page, signInAs, adminApi}, testInfo) => {
        await formJourney(page, signInAs, adminApi, testInfo, {
            spec: SPEC, entity: ENTITY, menu: ['ownersMenu', 'ownerContractTemplates'], url: /\/app\/ownersMenu\/ownerContractTemplates/,
            path: '/ownersMenu/ownerContractTemplates', createTitle: 'Create owner contract template', editTitle: /owner contract template|QA Contract Template/i,
            required: ['name'], name: NAME,
            fill: async form => {
                await form.fill('name', NAME);
                await form.setSwitch('active', true);
                await form.fillByLabel('Management commission percent', '20');
            },
            saved: r => {
                expect(r.name, 'Name').toBe(NAME);
                expect(percent(r), 'management commission 20 %').toBe(20);
            },
            edit: async form => form.fillByLabel('Management commission percent', '25'),
            edited: r => expect(percent(r), 'management commission 25 % after the edit').toBe(25)
        });
    });
});
