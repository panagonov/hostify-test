import {test, expect} from '../helpers/fixtures';
import {formJourney, cleanBefore} from '../helpers/journey';
import {qaName} from '../fixtures/test-data';

/**
 * 214 — Listings › Listing faqs: one question through its form, from create to remove.
 * @qa-description: Listings › Listing faqs — въпрос през формата: отказ на празна, запис, четене през API, редакция, изтриване
 * @qa-level: regression
 *
 * Proves: the page opens through the menu; an empty form is refused (Question required); „QA FAQ: Is parking free?“ is
 * saved with a Category and a Status — the API gives back the same; the row's Edit changes the Status and the API shows
 * it; the row's Remove deletes it. The assistant is never asked anything.
 * Creates: listingFaq ×1 (removed at the end). Needs: 003 green.
 */
const SPEC = '214';
const ENTITY = 'listingFaq';
const NAME = qaName('FAQ: Is parking free?');
const chosen: {category?: string; status?: string; edited?: string} = {};

test.describe('214 listings › faqs', () => {
    test.setTimeout(300_000);
    test.beforeAll(async () => cleanBefore(ENTITY, SPEC, 'QA FAQ'));

    test('a question goes through its form: refused empty, created, read back, edited, removed', async ({page, signInAs, adminApi}, testInfo) => {
        await formJourney(page, signInAs, adminApi, testInfo, {
            spec: SPEC, entity: ENTITY, menu: ['listingsMenu', 'listingFaqs'], url: /\/app\/listingsMenu\/listingFaqs/,
            path: '/listingsMenu/listingFaqs', createTitle: 'Create listing faq', editTitle: /listing faq|Is parking free/i,
            required: ['question'], name: NAME, nameField: 'question',
            fill: async form => {
                await form.fill('question', NAME);
                chosen.category = await form.pickFirst('category');
                chosen.status = await form.pickFirst('status');
                testInfo.annotations.push({type: 'Category / Status', description: `${chosen.category} / ${chosen.status}`});
            },
            saved: r => {
                expect(r.question, 'Question').toBe(NAME);
                expect(r.category, 'a Category is saved').toBeTruthy();
                expect(r.status, 'a Status is saved').toBeTruthy();
            },
            edit: async form => { chosen.edited = await form.pickOther('status'); testInfo.annotations.push({type: 'Status after Edit', description: chosen.edited}); },
            edited: r => expect(JSON.stringify(r.status).toLowerCase(), 'the edited Status').toContain(String(chosen.edited).toLowerCase().split(/\s|,/)[0])
        });
    });
});
