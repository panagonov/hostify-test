import {test, expect} from '../helpers/fixtures';
import {formJourney, cleanBefore} from '../helpers/journey';
import {qaName} from '../fixtures/test-data';

/**
 * 311 — Owners › Chart of accounts: one ledger account through its form, from create to remove.
 * @qa-description: Owners › Chart of accounts — сметка през формата: отказ на празна, запис, четене през API, редакция, изтриване
 * @qa-level: regression
 *
 * Proves: an empty form is refused (Name (en), Account type required); „QA Test account“ (code QA-7999, the first account
 * type, Active) is saved — the API gives back the same; the row's Edit sets a description and the API shows it; the row's
 * Remove deletes it.
 * Creates: ledgerAccount ×1 (removed at the end). Needs: 003 green.
 */
const SPEC = '311';
const ENTITY = 'ledgerAccount';
const NAME = qaName('Test account');

test.describe('311 owners › chart of accounts', () => {
    test.setTimeout(300_000);
    test.beforeAll(async () => cleanBefore(ENTITY, SPEC, 'QA Test account'));

    test('a ledger account goes through its form: refused empty, created, read back, edited, removed', async ({page, signInAs, adminApi}, testInfo) => {
        await formJourney(page, signInAs, adminApi, testInfo, {
            spec: SPEC, entity: ENTITY, menu: ['ownersMenu', 'ledgerAccounts'], url: /\/app\/ownersMenu\/ledgerAccounts/,
            path: '/ownersMenu/ledgerAccounts', createTitle: 'Create ledger account', editTitle: /ledger account|QA Test account/i,
            required: ['accountType'], name: NAME, nameField: 'name_en',
            fill: async form => {
                await form.fill('code', 'QA-7999');
                await form.fill('name_en', NAME);
                testInfo.annotations.push({type: 'Account type', description: await form.pickFirst('accountType')});
                await form.setSwitch('active', true);
            },
            saved: r => {
                expect(r.name_en ?? r.name, 'Name (en)').toBe(NAME);
                expect(r.code, 'Code').toBe('QA-7999');
            },
            edit: async form => form.fill('description', 'QA account for the tests'),
            edited: r => expect(r.description, 'the edited Description').toBe('QA account for the tests')
        });
    });
});
