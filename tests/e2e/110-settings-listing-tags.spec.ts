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
 * 2026-11-06); the Date created filter is a PERIOD picked in its calendar — today keeps the three tags, a period wholly
 * in the past and one that ends yesterday keep none, Clear filters and a reload bring them back (queued by the QA person,
 * 2026-11-09, after QA-70); the item page of a tag opens with its tabs; the account holds exactly the three tags.
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

    // Queued by the QA person (2026-11-09, after QA-70): the period filter of Date created was only recognised and
    // closed — never driven. The three tags were created today by this spec: a period of today keeps them, a period
    // wholly in the past and one that ends yesterday keep none, Clear filters and a reload bring them back.
    test('filtering Date created by a period: today keeps the three tags, past periods keep none', async ({page, signInAs}, testInfo) => {
        await signInAs('admin');
        const grid = new GridPage(page, ENTITY);
        await grid.goto('/settings/listingTags');
        await grid.waitLoaded();
        await grid.clearFilters();
        const column = 'date_created';
        const today = new Date();
        const day = (offset: number, from = today) => new Date(from.getFullYear(), from.getMonth(), from.getDate() + offset);
        const monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const names = TAGS.map(t => t.name);
        try {
            await test.step(`the period ${GridPage.isoDay(today)} → ${GridPage.isoDay(today)} (today) keeps the three tags`, async () => {
                await grid.filterByPeriod(column, today, today);
                await expect(grid.filterTrigger(column), 'the filter icon of Date created shows the filter is on').toHaveClass(/active/);
                for (const name of names) await expect(grid.row(name), `"${name}" (created today) stays`).toBeVisible();
                for (const cell of await grid.cellTexts(column)) expect(GridPage.dayOf(cell), `a Date created left by the period of today: "${cell}"`).toBe(day(0).getTime());
                expectPresentable(await probePage(page, testInfo, 'listing-tags-date-created-today'));
            });
            await test.step(`the period ${GridPage.isoDay(monthAgo)} → ${GridPage.isoDay(day(9, monthAgo))} (wholly in the past) keeps none`, async () => {
                await grid.filterByPeriod(column, monthAgo, day(9, monthAgo));
                await expect(grid.rows, 'no tag was created in that period').toHaveCount(0);
                expect(await grid.total(), 'the total of the period').toBe(0);
            });
            await test.step(`the period ${GridPage.isoDay(day(-30))} → ${GridPage.isoDay(day(-1))} (ends yesterday) keeps none`, async () => {
                await grid.filterByPeriod(column, day(-30), day(-1));
                await expect(grid.rows, 'tags of today are outside a period that ends yesterday').toHaveCount(0);
            });
            await test.step('Clear filters of the column brings the three tags back', async () => {
                await grid.clearColumnFilter(column);
                await expect(grid.filterTrigger(column), 'the filter icon of Date created is off').not.toHaveClass(/active/);
                for (const name of names) await expect(grid.row(name), `"${name}" is back`).toBeVisible();
            });
            await test.step('a reload keeps no filter', async () => {
                await page.reload({waitUntil: 'domcontentloaded'});
                await grid.waitLoaded();
                await expect(grid.filterTrigger(column)).not.toHaveClass(/active/);
                for (const name of names) await expect(grid.row(name), `"${name}" after the reload`).toBeVisible();
            });
        } finally {
            // the filter lives in the user's saved view: a failed step must not leave it for the next test
            await grid.clearFilters();
        }
    });

    test('the account holds exactly the tags this spec created', async ({adminApi}) => {
        await expectCreatedCount(adminApi, ENTITY, SPEC);
        expect(await adminApi.count(ENTITY, {searchTerm: 'QA Tag'}), 'listing tags named by this spec').toBe(TAGS.length);
    });
});
