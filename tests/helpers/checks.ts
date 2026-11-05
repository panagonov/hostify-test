import {expect, type Locator, type Page, type TestInfo} from '@playwright/test';
import {GridPage, type GridColumn} from './page-objects/GridPage';
import {FormDrawer} from './page-objects/FormDrawer';
import {probePage, expectPresentable, type Finding} from './probe';
import {ApiHelper} from './api';
import {createdIn} from './state';

/**
 * The standard checks every page spec runs — written once, so a 1xx spec is the page's DATA and its own logic,
 * not a copy of the mechanics (docs/conventions.md → What every page gets).
 */

/** Sorts EVERY sortable column ascending and descending and checks the order; filters every filterable column by a
 *  value of the first row and checks the rows left. Returns what could not be checked (no value, an unknown filter). */
export async function checkGridColumns(grid: GridPage, testInfo: TestInfo, options: {skipSort?: string[]; skipFilter?: string[]} = {}): Promise<Finding[]> {
    const notes: Finding[] = [];
    await grid.waitLoaded();
    await grid.clearFilters();
    const columns = await grid.columns();
    expect(columns.length, 'the grid has columns').toBeGreaterThan(0);
    const rowsBefore = await grid.rows.count();
    if (rowsBefore < 2) {
        notes.push({severity: 'warn', tag: 'grid-too-small', message: `${rowsBefore} row(s): sorting and filtering cannot be judged`});
        await testInfo.attach('grid-columns.json', {body: JSON.stringify({columns, rows: rowsBefore, notes}, null, 2), contentType: 'application/json'});
        return notes;
    }
    for (const column of columns) {
        if (column.sortable && !options.skipSort?.includes(column.key)) {
            for (const direction of ['ascend', 'descend'] as const) {
                const sort = await grid.sortBy(column.key, direction);
                expect(sort, `the search request carries the sort of "${column.key}" ${direction}`).toMatch(new RegExp(`${column.key}`));
                GridPage.expectOrdered(await grid.cellTexts(column.key), direction, column.label || column.key);
            }
        }
        if (column.filterable && !options.skipFilter?.includes(column.key)) {
            const sample = (await grid.cellTexts(column.key))[0] || '';
            if (!sample) {
                notes.push({severity: 'warn', tag: 'filter-no-sample', message: `column "${column.label || column.key}": the first row has no value to filter by`});
                continue;
            }
            // one WORD of the first row's value (the longest, 4+ letters): what a person types into a column filter
            const words = sample.split(/[^\p{L}\p{N}]+/u).filter(w => w.length >= 4);
            const value = (words.sort((a, b) => b.length - a.length)[0] || sample.split(/\s+/)[0]).slice(0, 40);
            const kind = await filterColumn(grid, column, value);
            if (kind === 'unknown' || kind === 'date') {
                notes.push({severity: 'warn', tag: `filter-${kind}`, message: `column "${column.label || column.key}": ${kind === 'date' ? 'a date range — the page spec drives it with its own period' : 'a filter kind the check does not drive'}`});
                continue;
            }
            try {
                const left = await grid.cellTexts(column.key);
                expect(left.length, `rows after filtering "${column.label || column.key}" by "${value}"`).toBeGreaterThan(0);
                for (const cell of left) expect(cell.toLowerCase(), `a row left after filtering "${column.label || column.key}" by "${value}"`).toContain(value.toLowerCase());
            } finally {
                // the filter lives in the user's saved view: a failed check must not leave it for the next spec
                await grid.clearFilters();
            }
        }
    }
    await testInfo.attach('grid-columns.json', {body: JSON.stringify({columns, rows: rowsBefore, notes}, null, 2), contentType: 'application/json'});
    return notes;
}

/** Drives the column's filter dropdown by what it shows: a text / number input, a list of options, or nothing known. */
async function filterColumn(grid: GridPage, column: GridColumn, value: string): Promise<'text' | 'number' | 'option' | 'date' | 'unknown'> {
    const page = grid.page;
    await grid.header(column.key).locator('.ant-table-filter-trigger').click();
    const dropdown = page.locator('.ant-table-filter-dropdown:visible').last();
    await expect(dropdown).toBeVisible({timeout: 15_000});
    // a date range is driven by the page spec itself (a period is a question of the page's data), not by a sample value
    if (await dropdown.locator('.ant-picker').count()) {
        await page.keyboard.press('Escape');
        return 'date';
    }
    const textInputs = dropdown.locator('input[type="text"], input:not([type]), .ant-input');
    const numberInputs = dropdown.locator('.ant-input-number-input');
    const options = dropdown.locator('.ant-select-item-option, .ant-checkbox-wrapper, .ant-tree-node-content-wrapper, .ant-radio-wrapper, .ant-dropdown-menu-item');
    let kind: 'text' | 'number' | 'option' | 'unknown' = 'unknown';
    if (await numberInputs.count() >= 1 && /^\d/.test(value)) {
        const n = value.replace(/[^\d.-]/g, '');
        await numberInputs.first().fill(n);
        if (await numberInputs.count() >= 2) await numberInputs.nth(1).fill(n);
        kind = 'number';
    } else if (await textInputs.count() >= 1) {
        await textInputs.first().fill(value);
        kind = 'text';
    } else if (await options.count() >= 1) {
        const match = options.filter({hasText: value}).first();
        if (await match.count()) await match.click();
        else await options.first().click();
        kind = 'option';
    }
    if (kind === 'unknown') {
        await page.keyboard.press('Escape');
        return kind;
    }
    const apply = dropdown.locator('.hydra-filter-container__apply, .ant-btn-primary').first();
    const waiting = grid.waitForSearch();
    if (await apply.isVisible({timeout: 1000}).catch(() => false)) await apply.click();
    else await page.keyboard.press('Enter');
    await waiting;
    // a text filter also searches while typing; the dropdown may still be open after the request of the typing
    if (await dropdown.isVisible().catch(() => false)) {
        await page.keyboard.press('Escape');
        await expect(dropdown).toBeHidden({timeout: 5000});
    }
    await grid.waitForSpinners();
    return kind;
}

/** Opens the Create form, probes EVERY tab, checks the defaults it is given, submits empty (the validation must speak), cancels. */
export async function checkCreateForm(grid: GridPage, testInfo: TestInfo, title: string | RegExp, options: {
    expectOn?: string[]; expectOff?: string[]; expectRequired?: string[]; surface?: string
} = {}): Promise<FormDrawer> {
    const form = await grid.openCreate(title);
    const surface = options.surface || `form-${grid.entity}`;
    expectPresentable(await probePage(grid.page, testInfo, surface));
    const tabs = await form.root.locator('[data-test^="tab-"]').evaluateAll(els => els.map(e => e.getAttribute('data-test') || '').map(t => t.slice(4)).filter(Boolean));
    for (const tab of tabs.slice(1)) {
        await form.openTab(tab);
        expectPresentable(await probePage(grid.page, testInfo, `${surface}-${tab}`));
    }
    if (tabs.length > 1) await form.openTab(tabs[0]);
    for (const name of options.expectOn || []) await expect(form.control(name), `"${name}" opens ON`).toHaveAttribute('aria-checked', 'true');
    for (const name of options.expectOff || []) await expect(form.control(name), `"${name}" opens OFF`).toHaveAttribute('aria-checked', 'false');
    // antd marks a required field on its label (`label.ant-form-item-required`) inside the field's `.ant-form-item`
    for (const name of options.expectRequired || [])
        // the `has` locator must be page-relative (a locator chained from the root would be looked for INSIDE the item)
        await expect(form.root.locator('.ant-form-item').filter({has: grid.page.locator(`[data-test="${name}"]`)}).first().locator('label.ant-form-item-required'), `"${name}" is marked required`).toHaveCount(1);
    // an empty form refused: at least one validation message, the drawer still open
    await form.save();
    await expect(form.root.locator('.ant-form-item-explain-error').first(), 'the validation speaks on an empty form').toBeVisible({timeout: 15_000});
    await expect(form.root).toBeVisible();
    await form.cancel();
    return form;
}

/** Opens the item page of `row`, opens EVERY tab and probes it; returns the tab names. */
export async function checkItemTabs(grid: GridPage, row: Locator, testInfo: TestInfo, surface = `item-${grid.entity}`): Promise<string[]> {
    const item = await grid.openItem(row);
    await expect(item.title, 'the item page has a title').toBeVisible({timeout: 30_000});
    expectPresentable(await probePage(grid.page, testInfo, surface));
    const tabs = await item.tabNames();
    for (const tab of tabs) {
        await item.openTab(tab);
        expectPresentable(await probePage(grid.page, testInfo, `${surface}-${tab}`));
    }
    // back to the list: by its path when the spec opened it with `goto`, else the browser's back
    if (grid.lastPath) await grid.goto(grid.lastPath);
    else await grid.page.goBack();
    await grid.waitLoaded();
    return tabs;
}

/** The count at the end of a creating spec: the records registered by `spec` for `entity` all exist, and the entity
 *  holds exactly as many records with the suite's names as the manifest says. */
export async function expectCreatedCount(api: ApiHelper, entity: string, spec: string, searchTerm = 'QA '): Promise<void> {
    const mine = createdIn(entity, spec);
    expect(mine.length, `records of ${entity} registered by ${spec}`).toBeGreaterThan(0);
    for (const record of mine) expect(await api.read(entity, record.id), `${entity} "${record.name}" (${record.id}) exists`).toBeTruthy();
    const found = (await api.search<any>(entity, {searchTerm, size: 200})).filter(r => mine.some(m => m.id === r.id || m.name === r.name));
    expect(found.length, `${entity} records named by the suite`).toBe(mine.length);
}

/** Finds the id of the record just saved through the form (by the name typed into it) — for the manifest. */
export async function idOfSaved(api: ApiHelper, entity: string, name: string, field = 'name'): Promise<string> {
    const rows = await api.search<any>(entity, {searchTerm: name, size: 50});
    const hit = rows.find(r => r[field] === name) || rows.find(r => JSON.stringify(r).includes(name));
    expect(hit?.id, `${entity} "${name}" is readable through the API after Save`).toBeTruthy();
    return hit.id;
}

export type {Page};
