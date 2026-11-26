import {test, expect} from '../helpers/fixtures';
import {GridPage} from '../helpers/page-objects/GridPage';
import {formJourney, cleanBefore} from '../helpers/journey';
import {qaName} from '../fixtures/test-data';
import {tolerateDuring} from '../helpers/tolerate';

/**
 * 230 — Guests: one guest through its form, from create to remove; a wrong e-mail is refused.
 * @qa-description: Guests — гост през формата: отказ на празна и на грешен имейл, запис, четене през API, редакция, изтриване
 * @qa-level: regression
 *
 * Proves: the page opens through the menu; an empty form is refused (First name required); an e-mail without a domain is
 * refused; „QA Guest Ana“ is saved with her e-mail of @hostify-qa.test, a fictional phone and her last name — the API gives
 * back the same; the row's Edit sets Is verified and the API shows it; the row's Remove deletes her. Nothing is sent to
 * the guest (the address is a .test one; no message is written).
 * Creates: guest ×1 (removed at the end). Needs: 003 green.
 */
const SPEC = '230';
const ENTITY = 'guest';
const FIRST = 'QA Guest';
const LAST = 'Ana';
const NAME = qaName('Guest Ana');
const EMAIL = 'qa.guest.ana@hostify-qa.test';
const PHONE = '+359000000001';

test.describe('230 guests', () => {
    test.setTimeout(300_000);
    test.beforeAll(async () => cleanBefore(ENTITY, SPEC, 'QA Guest'));

    test('an e-mail without a domain is refused by the form', async ({page, signInAs}) => {
        await signInAs('admin');
        const grid = new GridPage(page, ENTITY);
        await grid.goto('/guests');
        await grid.waitLoaded();
        const form = await grid.openCreate('Create guest');
        await form.fill('firstName', FIRST);
        // QA-539: the client logs this refusal as a console error — tolerated ONLY in this step (with --tolerate QA-539)
        await tolerateDuring('QA-539', async () => {
            await form.fill('email', 'qa.guest.ana@');
            await form.save();
            await expect(form.root.locator('.ant-form-item-explain-error').first(), 'the e-mail without a domain is refused').toBeVisible({timeout: 15_000});
            await form.cancel();
        });
    });

    test('a guest goes through her form: refused empty, created, read back, edited, removed', async ({page, signInAs, adminApi}, testInfo) => {
        await formJourney(page, signInAs, adminApi, testInfo, {
            spec: SPEC, entity: ENTITY, menu: ['guests'], url: /\/app\/guests/,
            path: '/guests', createTitle: 'Create guest', editTitle: /guest|QA Guest Ana/i,
            required: ['firstName'], name: NAME,
            fill: async form => {
                await form.fill('firstName', FIRST);
                await form.fill('lastName', LAST);
                await form.fill('email', EMAIL);
                await form.fill('phone', PHONE);
            },
            saved: r => {
                expect(r.firstName, 'First name').toBe(FIRST);
                expect(r.lastName, 'Last name').toBe(LAST);
                expect(r.email, 'Email').toBe(EMAIL);
                expect(String(r.phone).replace(/\s/g, ''), 'Phone').toBe(PHONE);
            },
            edit: async form => form.setSwitch('isVerified', true),
            edited: r => expect(r.isVerified, 'Is verified after Edit').toBe(true)
        });
    });
});
