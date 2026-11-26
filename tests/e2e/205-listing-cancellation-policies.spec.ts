import {test, expect} from '../helpers/fixtures';
import {formJourney, cleanBefore} from '../helpers/journey';
import {qaName} from '../fixtures/test-data';

/**
 * 205 — Listings › Cancellation policies: one policy through its form, from create to remove.
 * @qa-description: Listings › Cancellation policies — политика през формата: отказ на празна, запис, четене през API, редакция, изтриване
 * @qa-level: regression
 *
 * Proves: the page opens through the menu; an empty form is refused (Name and Code required); „QA Policy Flex“ is saved
 * with the custom code (a standard one exists already — the server answers -406), Active ON, Default and Non-refundable OFF, an English guest description — the API
 * gives back the same; the four language tabs open; the row's Edit changes the description and the API shows it; the
 * row's Remove deletes it. Default stays OFF (the policy never becomes the account's default).
 * Creates: listingPolicy ×1 (removed at the end). Needs: 003 green (the account administrator).
 */
const SPEC = '205';
const ENTITY = 'listingPolicy';
const NAME = qaName('Policy Flex');
let code = '';

test.describe('205 listings › cancellation policies', () => {
    test.setTimeout(300_000);
    test.beforeAll(async () => cleanBefore(ENTITY, SPEC, 'QA Policy'));

    test('a policy goes through its form: refused empty, created, read back, edited, removed', async ({page, signInAs, adminApi}, testInfo) => {
        await formJourney(page, signInAs, adminApi, testInfo, {
            spec: SPEC, entity: ENTITY, menu: ['listingsMenu', 'listingPolicies'], url: /\/app\/listingsMenu\/listingPolicies/,
            path: '/listingsMenu/listingPolicies', createTitle: 'Create listing policy', editTitle: /listing policy|QA Policy Flex/i,
            required: ['name', 'policyCode'], name: NAME,
            fill: async form => {
                await form.fill('name', NAME);
                // a standard code exists in the account already (-406 „use the custom code for your own policies“)
                code = await form.pickFirst('policyCode', /custom/i);
                testInfo.annotations.push({type: 'Code', description: code});
                await form.setSwitch('isNonRefundable', false);
                await form.setSwitch('isDefault', false);
                await form.setSwitch('active', true);
                await form.fill('guestDescription_en', 'QA: free cancellation up to 7 days.');
            },
            saved: r => {
                expect(r.name, 'Name').toBe(NAME);
                expect(r.active, 'Active').toBe(true);
                expect(Boolean(r.isDefault), 'Default stays OFF').toBe(false);
                expect(Boolean(r.isNonRefundable), 'Non-refundable').toBe(false);
                expect(JSON.stringify(r), 'the English guest description').toContain('free cancellation up to 7 days');
            },
            edit: async form => {
                for (const tab of ['es', 'fr', 'pt', 'en']) await form.root.getByRole('tab', {name: new RegExp(`\\(${tab}\\)`)}).click();
                await form.fill('guestDescription_en', 'QA: free cancellation up to 14 days.');
            },
            edited: r => expect(JSON.stringify(r), 'the edited English description').toContain('free cancellation up to 14 days')
        });
    });
});
