import {test, expect} from '../helpers/fixtures';
import {formJourney, cleanBefore} from '../helpers/journey';
import {qaName} from '../fixtures/test-data';

/**
 * 204 — Settings › Payment schedules: one schedule through its form, from create to remove; never the default.
 * @qa-description: Settings › Payment schedules — график през формата: отказ на празна, запис, четене през API, редакция, изтриване; никога по подразбиране
 * @qa-level: regression
 *
 * Proves: an empty form is refused (Name required); „QA Schedule 30/70“ is saved with Is default OFF and Active ON — the
 * API gives back the same; the row's Edit changes the description and the API shows it; the row's Remove deletes it.
 * Is default is never switched on (the account's default schedule stays its own).
 * Creates: paymentSchedule ×1 (removed at the end). Needs: 003 green.
 */
const SPEC = '204';
const ENTITY = 'paymentSchedule';
const NAME = qaName('Schedule 30/70');

test.describe('204 settings › payment schedules', () => {
    test.setTimeout(300_000);
    test.beforeAll(async () => cleanBefore(ENTITY, SPEC, 'QA Schedule'));

    test('a schedule goes through its form: refused empty, created, read back, edited, removed', async ({page, signInAs, adminApi}, testInfo) => {
        await formJourney(page, signInAs, adminApi, testInfo, {
            spec: SPEC, entity: ENTITY, menu: ['settings', 'paymentSchedules'], url: /\/app\/settings\/paymentSchedules/,
            path: '/settings/paymentSchedules', createTitle: 'Create payment schedule', editTitle: /payment schedule|QA Schedule/i,
            required: ['name'], name: NAME,
            fill: async form => {
                await form.fill('name', NAME);
                await form.setSwitch('isDefault', false);
                await form.setSwitch('active', true);
                await form.fill('description', 'QA 30 % now, 70 % at arrival');
            },
            saved: r => {
                expect(r.name, 'Name').toBe(NAME);
                expect(Boolean(r.isDefault), 'Is default stays OFF').toBe(false);
                expect(r.active, 'Active').toBe(true);
                expect(r.description, 'Description').toBe('QA 30 % now, 70 % at arrival');
            },
            edit: async form => form.fill('description', 'QA 30 % now, 70 % a week before arrival'),
            edited: r => expect(r.description, 'the edited Description').toBe('QA 30 % now, 70 % a week before arrival')
        });
    });
});
