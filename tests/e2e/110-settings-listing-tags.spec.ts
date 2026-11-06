import {test, expect} from '../helpers/fixtures';
import {Sidebar} from '../helpers/page-objects/Sidebar';
import {GridPage} from '../helpers/page-objects/GridPage';
import {probePage, expectPresentable} from '../helpers/probe';
import {checkCreateForm, checkGridColumns, checkItemTabs, expectCreatedCount, idOfSaved} from '../helpers/checks';
import {rememberCreated} from '../helpers/state';
import {cleanupSpecRecords} from '../helpers/cleanup';
import {ApiHelper} from '../helpers/api';
import {adminCredentials} from '../helpers/env';
import {qaName} from '../fixtures/test-data';

/**
 * 110 — Settings › Listing tags: the first master-data page, and the TEMPLATE of a page spec.
 * @qa-description: Settings › Listing tags: форма, записи през формата, сортиране и филтър по колони, табове, броене
 *
 * Proves: the page opens through the menu and is presentable; the Create form has the fields the model gives it
 * (Tag required, Colour, Active ON by default, Description), refuses an empty save and cancels; three tags are
 * created through the form (one inactive) and appear in the grid; EVERY column sorts both ways and filters by a
 * value of the first row; a filter of Description by a WHOLE description leaves only its tag (taught by the QA person,
 * 2026-11-06); the item page of a tag opens with its tabs; the account holds exactly the three tags.
 * Creates: listingTag ×3. Needs: 003 green (the account administrator).
 */
const SPEC = '110';
const ENTITY = 'listingTag';
const TAGS = [
    {name: qaName('Tag Sea view'), description: 'Listings with a view to the sea', active: true},
    {name: qaName('Tag Pet friendly'), description: 'Pets are welcome', active: true},
    {name: qaName('Tag Retired'), description: 'No longer offered', active: false}
];

test.describe('110 settings › listing tags', () => {
    test.describe.configure({mode: 'serial'});
    test.setTimeout(300_000);

    // the spec's own records of an earlier run go first, so it can be run alone (the chain's cleanup is 002)
    test.beforeAll(async () => {
        const {email, password} = adminCredentials();
        const api = await ApiHelper.login(email, password);
        try { await cleanupSpecRecords(api, ENTITY, SPEC, 'QA Tag'); } finally { await api.dispose(); }
    });

    test('the page opens through the menu and the Create form behaves', async ({page, signInAs}, testInfo) => {
        await signInAs('admin');
        const sidebar = new Sidebar(page);
        await sidebar.openGroup('settings');
        await sidebar.openItem(['listingTags']);
        await expect(page).toHaveURL(/\/app\/settings\/listingTags/);
        const grid = new GridPage(page, ENTITY);
        await grid.waitLoaded();
        expectPresentable(await probePage(page, testInfo, 'listing-tags'));
        await checkCreateForm(grid, testInfo, 'Create listing tag', {expectOn: ['active'], expectRequired: ['name']});
    });

    test('three tags are created through the form and appear in the grid', async ({page, signInAs, adminApi}, testInfo) => {
        await signInAs('admin');
        const grid = new GridPage(page, ENTITY);
        await grid.goto('/settings/listingTags');
        await grid.waitLoaded();
        // the grid keeps its filters in the user's view across sessions: start from none, or an inactive tag stays hidden
        await grid.clearFilters();
        for (const tag of TAGS) {
            await test.step(`create "${tag.name}"`, async () => {
                const form = await grid.openCreate('Create listing tag');
                await form.fill('name', tag.name);
                await form.fill('description', tag.description);
                await form.setSwitch('active', tag.active);
                await form.saveAndClose();
                await grid.search(tag.name);
                await expect(grid.row(tag.name)).toBeVisible({timeout: 30_000});
                rememberCreated(ENTITY, {id: await idOfSaved(adminApi, ENTITY, tag.name), name: tag.name}, SPEC);
            });
        }
        await grid.clearFilters();
        expectPresentable(await probePage(page, testInfo, 'listing-tags-filled'));
    });

    test('every column sorts and filters; the item page opens with its tabs', async ({page, signInAs}, testInfo) => {
        await signInAs('admin');
        const grid = new GridPage(page, ENTITY);
        await grid.goto('/settings/listingTags');
        await checkGridColumns(grid, testInfo);
        await checkItemTabs(grid, grid.row(TAGS[0].name), testInfo);
    });

    // Taught by the QA person (feedback/2026-11-06-listing-tags-description-filter.md): the column filter of Description
    // with the WHOLE description of one tag shows other tags too — a filter by a phrase must leave only the rows that
    // contain it. Red on 1.0.5 (the search matches any word, "a" / "the" of the phrase hit "Pets are welcome").
    test('filtering the Description column by the whole description of one tag leaves only that tag', async ({page, signInAs}, testInfo) => {
        await signInAs('admin');
        const grid = new GridPage(page, ENTITY);
        await grid.goto('/settings/listingTags');
        await grid.waitLoaded();
        await grid.clearFilters();
        const phrase = TAGS[0].description;
        await test.step(`filter the column "Description" by the phrase "${phrase}" (its filter icon, the text box, Search)`, async () => {
            await grid.filterByText('description', phrase);
        });
        try {
            const left = await grid.cellTexts('description');
            expectPresentable(await probePage(page, testInfo, 'listing-tags-description-phrase-filter'));
            expect(left.length, `rows after filtering by "${phrase}"`).toBeGreaterThan(0);
            for (const cell of left) expect(cell, `a row left after filtering Description by "${phrase}"`).toContain(phrase);
        } finally {
            await grid.clearFilters();
        }
    });

    test('the account holds exactly the tags this spec created', async ({adminApi}) => {
        await expectCreatedCount(adminApi, ENTITY, SPEC);
        expect(await adminApi.count(ENTITY, {searchTerm: 'QA Tag'}), 'listing tags named by this spec').toBe(TAGS.length);
    });
});
