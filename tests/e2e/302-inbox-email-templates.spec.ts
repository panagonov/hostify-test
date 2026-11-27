import {test, expect} from '../helpers/fixtures';
import {formJourney, cleanBefore} from '../helpers/journey';
import {qaName} from '../fixtures/test-data';

/**
 * 302 — Inbox › E-mail templates: one template of an event through its form — INACTIVE before and after every save.
 * @qa-description: Inbox › E-mail templates — шаблон за събитие през формата, изключен преди и след всеки запис: отказ на празна, езиците, запис, API, редакция, изтриване (иначе СПРИ)
 * @qa-level: regression
 *
 * Proves: an empty form is refused (Event, Name (en), Subject (en) required); the language tabs open; „QA Email Template“
 * of the first event is saved with Active OFF and System OFF — the API gives back Active false (checked before and after
 * the save: the system never sends it); the row's Edit changes the English subject, Active is still false; the row's
 * Remove deletes it — a removal that does not go through is a STOP (the QA person, 2026-11-27).
 * Creates: emailTemplate ×1 (removed at the end). Needs: 003 green.
 */
const SPEC = '302';
const ENTITY = 'emailTemplate';
const NAME = qaName('Email Template');

test.describe('302 inbox › e-mail templates', () => {
    test.setTimeout(300_000);
    test.beforeAll(async () => cleanBefore(ENTITY, SPEC, 'QA Email'));

    test('an e-mail template goes through its form, inactive: refused empty, created, read back, edited, removed', async ({page, signInAs, adminApi}, testInfo) => {
        await formJourney(page, signInAs, adminApi, testInfo, {
            spec: SPEC, entity: ENTITY, menu: ['inbox', 'emailTemplates'], url: /\/app\/inbox\/emailTemplates/,
            path: '/inbox/emailTemplates', createTitle: 'Create email template', editTitle: /email template|QA Email/i,
            required: ['event'], name: NAME, nameField: 'name_en',
            fill: async form => {
                testInfo.annotations.push({type: 'Event', description: await form.pickFirst('event')});
                for (const tab of ['es', 'fr', 'pt', 'en']) await form.root.getByRole('tab', {name: new RegExp(`Name \\(${tab}\\)`)}).click();
                await form.fill('name_en', NAME);
                await form.root.getByRole('tab', {name: /Subject \(en\)/}).click();
                await form.fill('subject_en', 'QA subject');
                await form.setSwitch('active', false);
                await expect(form.control('active'), 'Active is OFF before the save').toHaveAttribute('aria-checked', 'false');
                if (await form.control('system').isVisible()) await form.setSwitch('system', false);
            },
            saved: r => {
                expect(r.name_en ?? r.name, 'Name (en)').toBe(NAME);
                expect(r.active, 'Active is OFF after the save').toBe(false);
                expect(Boolean(r.system), 'System OFF').toBe(false);
            },
            edit: async form => {
                await expect(form.control('active'), 'Active is OFF in the edit form').toHaveAttribute('aria-checked', 'false');
                await form.root.getByRole('tab', {name: /Subject \(en\)/}).click();
                await form.fill('subject_en', 'QA subject (edited)');
            },
            edited: r => {
                expect(JSON.stringify(r), 'the edited subject').toContain('QA subject (edited)');
                expect(r.active, 'Active still OFF after the edit').toBe(false);
            }
        });
    });
});
