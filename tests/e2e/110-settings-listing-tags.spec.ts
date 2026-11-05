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
 *
 * Proves: the page opens through the menu and is presentable; the Create form has the fields the model gives it
 * (Tag required, Colour, Active ON by default, Description), refuses an empty save and cancels; three tags are
 * created through the form (one inactive) and appear in the grid; EVERY column sorts both ways and filters by a
 * value of the first row; the item page of a tag opens with its tabs; the account holds exactly the three tags.
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

    test('the account holds exactly the tags this spec created', async ({adminApi}) => {
        await expectCreatedCount(adminApi, ENTITY, SPEC);
        expect(await adminApi.count(ENTITY, {searchTerm: 'QA Tag'}), 'listing tags named by this spec').toBe(TAGS.length);
    });
});
