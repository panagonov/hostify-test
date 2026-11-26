import {test, expect} from '../helpers/fixtures';
import {formJourney, cleanBefore} from '../helpers/journey';
import {qaName} from '../fixtures/test-data';

/**
 * 210 — Listings › Buildings: one building through its form, from create to remove.
 * @qa-description: Listings › Buildings — сграда през формата: отказ на празна, запис, четене през API, редакция, изтриване
 * @qa-level: regression
 *
 * Proves: the page opens through the menu; an empty form is refused (Building name required); „QA Building 1“ is saved
 * with its street, number and postcode — the API gives back the same; the row's Edit changes the street and the API
 * shows it; the row's Remove deletes it.
 * Creates: listingBuilding ×1 (removed at the end). Needs: 003 green.
 */
const SPEC = '210';
const ENTITY = 'listingBuilding';
const NAME = qaName('Building 1');

test.describe('210 listings › buildings', () => {
    test.setTimeout(300_000);
    test.beforeAll(async () => cleanBefore(ENTITY, SPEC, 'QA Building'));

    test('a building goes through its form: refused empty, created, read back, edited, removed', async ({page, signInAs, adminApi}, testInfo) => {
        await formJourney(page, signInAs, adminApi, testInfo, {
            spec: SPEC, entity: ENTITY, menu: ['listingsMenu', 'listingBuildings'], url: /\/app\/listingsMenu\/listingBuildings/,
            path: '/listingsMenu/listingBuildings', createTitle: 'Create listing building', editTitle: /listing building|QA Building 1/i,
            required: ['name'], name: NAME,
            fill: async form => {
                await form.fill('name', NAME);
                await form.fill('address,street', 'QA Street');
                await form.fill('address,streetNumber', '1');
                await form.fill('address,postcode', '1000');
            },
            saved: r => {
                expect(r.name, 'Building name').toBe(NAME);
                expect(r.address?.street, 'Street').toBe('QA Street');
                expect(String(r.address?.streetNumber), 'Street number').toBe('1');
                expect(String(r.address?.postcode), 'Postcode').toBe('1000');
            },
            edit: async form => form.fill('address,street', 'QA Street 2'),
            edited: r => expect(r.address?.street, 'the edited Street').toBe('QA Street 2')
        });
    });
});
