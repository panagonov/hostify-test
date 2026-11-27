import {test, expect} from '../helpers/fixtures';
import {formJourney, cleanBefore} from '../helpers/journey';
import {qaName} from '../fixtures/test-data';

/**
 * 303 — Settings › Saved replies (group 3, the QA person, 2026-11-27): one reply through its form, from create to remove.
 * @qa-description: Settings › Saved replies — запазен отговор през формата: отказ на празна, запис, четене през API, редакция, изтриване
 * @qa-level: regression
 *
 * Proves: an empty form is refused (Name, Text required); „QA Reply Parking“ (English, Active, the text „QA: parking is
 * free in the yard.“) is saved — the API gives back the same; the row's Edit changes the text and the API shows it; the
 * row's Remove deletes it. (305 inserts a saved reply into a message to our guest.)
 * Creates: savedReply ×1 (removed at the end). Needs: 003 green.
 */
const SPEC = '303';
const ENTITY = 'savedReply';
const NAME = qaName('Reply Parking');

test.describe('303 settings › saved replies', () => {
    test.setTimeout(300_000);
    test.beforeAll(async () => cleanBefore(ENTITY, SPEC, 'QA Reply'));

    test('a saved reply goes through its form: refused empty, created, read back, edited, removed', async ({page, signInAs, adminApi}, testInfo) => {
        await formJourney(page, signInAs, adminApi, testInfo, {
            spec: SPEC, entity: ENTITY, menu: ['settings', 'savedReplies'], url: /\/app\/settings\/savedReplies/,
            path: '/settings/savedReplies', createTitle: 'Create saved reply', editTitle: /saved reply|QA Reply/i,
            required: ['name', 'text'], name: NAME,
            fill: async form => {
                await form.fill('name', NAME);
                await form.pickFirst('language', /English|^en/i);
                await form.setSwitch('active', true);
                await form.fill('text', 'QA: parking is free in the yard.');
            },
            saved: r => {
                expect(r.name, 'Name').toBe(NAME);
                expect(r.text, 'Text').toBe('QA: parking is free in the yard.');
                expect(r.active, 'Active').toBe(true);
            },
            edit: async form => form.fill('text', 'QA: parking is free in the yard (edited).'),
            edited: r => expect(r.text, 'the edited Text').toBe('QA: parking is free in the yard (edited).')
        });
    });
});
