import {test, expect} from '../helpers/fixtures';
import {formJourney, cleanBefore} from '../helpers/journey';
import {qaName} from '../fixtures/test-data';

/**
 * 215 — Listings › Guidebook templates: one template through its form, from create to remove.
 * @qa-description: Listings › Guidebook templates — шаблон през формата: отказ на празна, запис, четене през API, редакция, изтриване
 * @qa-level: regression
 *
 * Proves: the page opens through the menu; an empty form is refused (Name and Template type required); „QA Guidebook“ is
 * saved with a template type, All listings OFF (it reaches no listing), Active ON — the API gives back the same; the
 * row's Edit sets Language „en“ and the API shows it; the row's Remove deletes it. Nothing is sent to a guest.
 * Creates: guidebookTemplate ×1 (removed at the end). Needs: 003 green.
 */
const SPEC = '215';
const ENTITY = 'guidebookTemplate';
const NAME = qaName('Guidebook');

test.describe('215 listings › guidebook templates', () => {
    test.setTimeout(300_000);
    test.beforeAll(async () => cleanBefore(ENTITY, SPEC, 'QA Guidebook'));

    test('a template goes through its form: refused empty, created, read back, edited, removed', async ({page, signInAs, adminApi}, testInfo) => {
        await formJourney(page, signInAs, adminApi, testInfo, {
            spec: SPEC, entity: ENTITY, menu: ['listingsMenu', 'guidebookTemplates'], url: /\/app\/listingsMenu\/guidebookTemplates/,
            path: '/listingsMenu/guidebookTemplates', createTitle: 'Create guidebook template', editTitle: /guidebook template|QA Guidebook/i,
            required: ['name', 'templateType'], name: NAME,
            fill: async form => {
                await form.fill('name', NAME);
                testInfo.annotations.push({type: 'Template type', description: await form.pickFirst('templateType')});
                await form.setSwitch('allListings', false);
                await form.setSwitch('active', true);
            },
            saved: r => {
                expect(r.name, 'Name').toBe(NAME);
                expect(r.templateType, 'a Template type is saved').toBeTruthy();
                expect(Boolean(r.allListings), 'All listings stays OFF').toBe(false);
                expect(r.active, 'Active').toBe(true);
            },
            edit: async form => form.fill('language', 'en'),
            edited: r => expect(r.language, 'the edited Language').toBe('en')
        });
    });
});
