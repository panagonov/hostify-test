import {test, expect} from '../helpers/fixtures';
import {formJourney, cleanBefore} from '../helpers/journey';
import {qaName} from '../fixtures/test-data';

/**
 * 310 — Finance › Expense categories: one category through its form, from create to remove.
 * @qa-description: Finance › Expense categories — категория през формата: отказ на празна, езиците, запис, четене през API, редакция, изтриване
 * @qa-level: regression
 *
 * Proves: an empty form is refused (Name (en) required); the language tabs open; „QA Cost Cleaning“ (Visible to owner ON,
 * Active) is saved — the API gives back the same; the row's Edit switches Visible to owner OFF and the API shows it; the
 * row's Remove deletes it.
 * Creates: costCategory ×1 (removed at the end). Needs: 003 green.
 */
const SPEC = '310';
const ENTITY = 'costCategory';
const NAME = qaName('Cost Cleaning');

test.describe('310 finance › expense categories', () => {
    test.setTimeout(300_000);
    test.beforeAll(async () => cleanBefore(ENTITY, SPEC, 'QA Cost'));

    test('a category goes through its form: refused empty, created, read back, edited, removed', async ({page, signInAs, adminApi}, testInfo) => {
        await formJourney(page, signInAs, adminApi, testInfo, {
            spec: SPEC, entity: ENTITY, menu: ['finance', 'costCategories'], url: /\/app\/finance\/costCategories/,
            path: '/finance/costCategories', createTitle: 'Create expense category', editTitle: /expense category|QA Cost/i,
            required: [], name: NAME, nameField: 'name_en', // Name (en) is marked required on its TAB („* Name (en)“), not on the field
            fill: async form => {
                for (const tab of ['es', 'fr', 'pt', 'en']) await form.root.getByRole('tab', {name: new RegExp(`Name \\(${tab}\\)`)}).click();
                await form.fill('name_en', NAME);
                await form.setSwitch('visibleToOwner', true);
                await form.setSwitch('active', true);
            },
            saved: r => {
                expect(r.name_en ?? r.name, 'Name (en)').toBe(NAME);
                expect(r.visibleToOwner, 'Visible to owner').toBe(true);
                expect(r.active, 'Active').toBe(true);
            },
            edit: async form => form.setSwitch('visibleToOwner', false),
            edited: r => expect(r.visibleToOwner, 'Visible to owner OFF after the edit').toBe(false)
        });
    });
});
