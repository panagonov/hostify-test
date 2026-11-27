import {test, expect} from '../helpers/fixtures';
import {formJourney, cleanBefore} from '../helpers/journey';
import {qaName} from '../fixtures/test-data';

/**
 * 300 — Inbox › Inbox tags: one tag through its form, from create to remove.
 * @qa-description: Inbox › Inbox tags — таг през формата: отказ на празна, запис, четене през API, редакция, изтриване
 * @qa-level: regression
 *
 * Proves: the page opens through the menu; an empty form is refused (Name required); „QA Tag VIP“ is saved Active with a
 * description — the API gives back the same; the row's Edit changes the description and the API shows it; the row's Remove
 * deletes it.
 * Creates: inboxTag ×1 (removed at the end). Needs: 003 green.
 */
const SPEC = '300';
const ENTITY = 'inboxTag';
const NAME = qaName('Tag VIP');

test.describe('300 inbox › tags', () => {
    test.setTimeout(300_000);
    test.beforeAll(async () => cleanBefore(ENTITY, SPEC, 'QA Tag VIP'));

    test('a tag goes through its form: refused empty, created, read back, edited, removed', async ({page, signInAs, adminApi}, testInfo) => {
        await formJourney(page, signInAs, adminApi, testInfo, {
            spec: SPEC, entity: ENTITY, menu: ['inbox', 'inboxTags'], url: /\/app\/inbox\/inboxTags/,
            path: '/inbox/inboxTags', createTitle: 'Create inbox tag', editTitle: /inbox tag|QA Tag VIP/i,
            required: ['name'], name: NAME,
            fill: async form => {
                await form.fill('name', NAME);
                await form.setSwitch('active', true);
                await form.fill('description', 'QA VIP guests');
            },
            saved: r => {
                expect(r.name, 'Name').toBe(NAME);
                expect(r.active, 'Active').toBe(true);
                expect(r.description, 'Description').toBe('QA VIP guests');
            },
            edit: async form => form.fill('description', 'QA VIP guests (edited)'),
            edited: r => expect(r.description, 'the edited Description').toBe('QA VIP guests (edited)')
        });
    });
});
