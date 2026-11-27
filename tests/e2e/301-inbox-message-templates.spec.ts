import {test, expect} from '../helpers/fixtures';
import {formJourney, cleanBefore} from '../helpers/journey';
import {qaName} from '../fixtures/test-data';

/**
 * 301 — Inbox › Message templates: one template through its form — inactive and not global — from create to remove.
 * @qa-description: Inbox › Message templates — шаблон през формата (неактивен, не глобален): отказ на празна, запис, четене през API, редакция, изтриване
 * @qa-level: regression
 *
 * Proves: an empty form is refused (Name, Category, Default language required); „QA Template Welcome“ is saved with
 * Active OFF, Is global OFF and an English text (the form's „Add texts“ — the server asks for one, -726) — the API gives back the same (an inactive, non-global template is sent by nothing); the
 * row's Edit changes its name and the API shows it; the row's Remove deletes it.
 * Creates: messageTemplate ×1 (removed at the end). Needs: 003 green.
 */
const SPEC = '301';
const ENTITY = 'messageTemplate';
const NAME = qaName('Template Welcome');

test.describe('301 inbox › message templates', () => {
    test.setTimeout(300_000);
    test.beforeAll(async () => cleanBefore(ENTITY, SPEC, 'QA Template'));

    test('a template goes through its form inactive and not global: refused empty, created, read back, edited, removed', async ({page, signInAs, adminApi}, testInfo) => {
        await formJourney(page, signInAs, adminApi, testInfo, {
            spec: SPEC, entity: ENTITY, menu: ['inbox', 'messageTemplates'], url: /\/app\/inbox\/messageTemplates/,
            path: '/inbox/messageTemplates', createTitle: 'Create message template', editTitle: /message template|QA Template/i,
            required: ['name', 'category', 'defaultLanguage'], name: NAME,
            fill: async form => {
                await form.fill('name', NAME);
                testInfo.annotations.push({type: 'Category', description: await form.pickFirst('category')});
                await form.pickFirst('defaultLanguage', /English|^en/i);
                await form.setSwitch('active', false);
                await form.setSwitch('isGlobal', false);
                // the server asks for a text in the default language (-726): the form's „Add texts“
                await form.addTexts({language: /English/, subject: 'QA welcome', text: 'QA: welcome!', html: '<p>QA: welcome!</p>'});
            },
            saved: r => {
                expect(r.name, 'Name').toBe(NAME);
                expect(Boolean(r.active), 'Active stays OFF').toBe(false);
                expect(Boolean(r.isGlobal), 'Is global stays OFF').toBe(false);
                expect(JSON.stringify(r), 'the text in the default language').toContain('QA: welcome!');
            },
            edit: async form => {
                await expect(form.control('active'), 'Active is still OFF in the edit form').toHaveAttribute('aria-checked', 'false');
                await form.setSwitch('isGlobal', false);
            },
            edited: r => expect(Boolean(r.active), 'Active still OFF after the edit').toBe(false)
        });
    });
});
