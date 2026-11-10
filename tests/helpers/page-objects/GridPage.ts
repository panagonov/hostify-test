import {expect, type Locator, type Page} from '@playwright/test';
import {BasePage} from './BasePage';
import {FormDrawer} from './FormDrawer';
import {ItemPage} from './ItemPage';
import {waitForPageData} from '../settle';

export interface GridColumn {
    key: string
    label: string
    sortable: boolean
    filterable: boolean
}

export type SortDirection = 'ascend' | 'descend';

const num = (s: string): number | null => {
    const t = s.replace(/[\s,]/g, '').replace(/[^\d.+-]/g, '');
    if (!t || !/\d/.test(t)) return null;
    const n = Number(t);
    return Number.isFinite(n) ? n : null;
};

const date = (s: string): number | null => {
    const m = s.match(/(\d{1,2})[./-](\d{1,2})[./-](\d{4})/);
    if (m) return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1])).getTime();
    const iso = s.match(/(\d{4})-(\d{2})-(\d{2})/);
    if (iso) return new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3])).getTime();
    return null;
};

/**
 * A Hydra grid page: the table, its toolbar (search, create, clear filters), the column headers (sort, filter), the
 * rows and the pagination. Column cells carry the column's name as class (`td.<name>`, `th[columnkey="<name>"]`).
 *
 * Toolbar selectors prefer `data-test` (`grid-search`, `grid-create`, `grid-clear-filters`, `row-actions`) and keep
 * a structural fallback until the client that ships them is deployed — docs/selectors.md.
 */
export class GridPage extends BasePage {
    readonly entity: string;
    readonly table: Locator;
    readonly rows: Locator;
    /** The app path the page was last opened with (`goto`) — the way back from an item page. */
    lastPath: string | null = null;

    constructor(page: Page, entity: string) {
        super(page);
        this.entity = entity;
        this.table = page.locator('.ant-table').filter({hasNot: page.locator('.hydra-dashboard-widget')}).first();
        this.rows = this.table.locator('tbody tr.ant-table-row');
    }

    get searchInput(): Locator {
        return this.page.locator('[data-test="grid-search"]').or(this.page.locator('.filterTags input')).or(this.page.getByPlaceholder(/search/i)).first();
    }

    get createButton(): Locator {
        return this.page.locator('[data-test="grid-create"]').or(this.page.locator('.cc-grid-toolbar button').filter({has: this.page.locator('.anticon-plus-circle')})).or(this.page.getByRole('button', {name: /^Create\b/})).first();
    }

    get clearFiltersButton(): Locator {
        return this.page.locator('[data-test="grid-clear-filters"]').or(this.page.getByRole('button', {name: /Clear all/})).first();
    }

    get totalText(): Locator {
        return this.page.locator('.ant-pagination-total-text').first();
    }

    async goto(path: string) {
        this.lastPath = path;
        await super.goto(path);
    }

    /** The grid is loaded when its rows or its "No data" indicator are on the screen — never on the spinner alone. */
    async waitLoaded(timeout = 45_000) {
        await expect(this.table).toBeVisible({timeout});
        await waitForPageData(this.page, timeout);
    }

    /** The grid starts from no filter: a saved view may keep yesterday's. */
    async clearFilters() {
        if (await this.clearFiltersButton.isVisible({timeout: 1000}).catch(() => false) && await this.clearFiltersButton.isEnabled().catch(() => false)) {
            // the answer is awaited from BEFORE the click: a fast answer (or slowMo after the click) would be missed
            const search = this.waitForSearch();
            await this.clearFiltersButton.click();
            await search;
        }
    }

    /** The next answer of the entity's search endpoint. */
    waitForSearch(timeout = 45_000) {
        return this.page.waitForResponse(res => res.url().includes(`/api/${this.entity}/search`) || res.url().includes(`/api/${this.entity}?`), {timeout}).then(async res => {
            await this.waitForSpinners().catch(() => undefined);
            return res;
        });
    }

    /** The number the paginator reports ("Total: N"), or the row count when there is no paginator. */
    async total(): Promise<number> {
        if (await this.totalText.isVisible({timeout: 2000}).catch(() => false)) {
            const text = (await this.totalText.textContent()) || '';
            const m = text.replace(/\s/g, '').match(/\d+/);
            if (m) return Number(m[0]);
        }
        return this.rows.count();
    }

    /** Header cells with a column key — what the grid shows, in order. */
    async columns(): Promise<GridColumn[]> {
        return this.table.locator('thead th[columnkey]').evaluateAll(ths => ths.map(th => ({
            key: th.getAttribute('columnkey') || '',
            label: (th.textContent || '').replace(/\s+/g, ' ').trim(),
            sortable: !!th.querySelector('.ant-table-column-sorters'),
            filterable: !!th.querySelector('.ant-table-filter-trigger')
        })).filter(c => c.key && c.key !== 'actions'));
    }

    header(key: string): Locator {
        return this.table.locator(`thead th[columnkey="${key}"]`);
    }

    /** The visible texts of one column, row by row. */
    async cellTexts(key: string): Promise<string[]> {
        return this.rows.locator(`td.${key}`).evaluateAll(tds => tds.map(td => (td.textContent || '').replace(/\s+/g, ' ').trim()));
    }

    /** Clicks the header until the column sorts in `direction`; returns the search request's sort parameter. */
    async sortBy(key: string, direction: SortDirection): Promise<string> {
        const sorter = this.header(key).locator('.ant-table-column-sorters');
        let lastSort = '';
        for (let i = 0; i < 3; i++) {
            const waiting = this.page.waitForRequest(req => req.url().includes(`/api/${this.entity}/search`) || req.url().includes(`/api/${this.entity}?`), {timeout: 30_000});
            await sorter.click();
            const req = await waiting;
            lastSort = GridPage.sortOf(req.url(), req.postData());
            await this.waitForSpinners().catch(() => undefined);
            const state = await this.header(key).getAttribute('aria-sort');
            if ((direction === 'ascend' && state === 'ascending') || (direction === 'descend' && state === 'descending')) return lastSort;
            if (lastSort.includes(direction)) return lastSort;
        }
        return lastSort;
    }

    /** The sort a search request carries (query string or JSON body), as "field^direction" or "". */
    static sortOf(url: string, body: string | null): string {
        try {
            const u = new URL(url);
            const sort = u.searchParams.get('sort') || u.searchParams.getAll('sort[]').join(',');
            if (sort) return sort;
        } catch { /* keep looking */ }
        if (body) {
            try {
                const json = JSON.parse(body);
                const sort = json?.sort ?? json?.data?.sort;
                if (Array.isArray(sort)) return sort.join('^');
                if (typeof sort === 'string') return sort;
                if (sort && typeof sort === 'object') return JSON.stringify(sort);
            } catch { /* not JSON */ }
        }
        return '';
    }

    /** Opens the column's filter dropdown, types `value` into its text search and applies it. */
    async filterByText(key: string, value: string) {
        await this.header(key).locator('.ant-table-filter-trigger').click();
        const dropdown = this.page.locator('.ant-table-filter-dropdown:visible, .ant-dropdown:visible .hydra-filter-container').last();
        await expect(dropdown).toBeVisible({timeout: 15_000});
        const input = dropdown.locator('input').first();
        await input.fill(value);
        const waiting = this.waitForSearch();
        const apply = dropdown.locator('.hydra-filter-container__apply');
        if (await apply.isVisible({timeout: 1000}).catch(() => false)) await apply.click();
        else await input.press('Enter');
        await waiting;
    }

    /** The filter icon of a column; antd marks it `active` while the column is filtered. */
    filterTrigger(key: string): Locator {
        return this.header(key).locator('.ant-table-filter-trigger');
    }

    /** The open filter dropdown of a column (Hydra's filter container: title, Clear filters, body, Cancel / Search). */
    get filterDropdown(): Locator {
        return this.page.locator('.ant-table-filter-dropdown:visible').last();
    }

    /** The calendar of an open date picker (two months side by side, the presets on the left). */
    get calendar(): Locator {
        return this.page.locator('.ant-picker-dropdown:visible').last();
    }

    /**
     * Filters a date column by a period through its calendar, as a person does: the filter icon, the start date, the
     * day in the calendar (paging back or forward month by month), the end date, then Search. The calendar closes
     * after the second day — it covered the Search button while open (QA-70).
     */
    async filterByPeriod(key: string, from: Date, to: Date) {
        await this.filterTrigger(key).click();
        const dropdown = this.filterDropdown;
        await expect(dropdown.locator('.ant-picker-range'), `the filter of "${key}" is a period (start → end date)`).toBeVisible({timeout: 15_000});
        await dropdown.locator('.ant-picker-input-start input').click();
        await expect(this.calendar).toBeVisible({timeout: 10_000});
        await this.pickDay(from);
        await this.pickDay(to);
        await expect(this.calendar, 'the calendar closes once the end date is picked').toBeHidden({timeout: 10_000});
        const waiting = this.waitForSearch();
        await dropdown.locator('.hydra-filter-container__apply').click();
        await waiting;
        await expect(dropdown).toBeHidden({timeout: 10_000});
        await this.waitForSpinners();
    }

    /** Clicks a day of the open calendar; pages the months until the day is in view (two years at most). */
    async pickDay(day: Date) {
        const title = GridPage.isoDay(day);
        const cell = this.calendar.locator(`td.ant-picker-cell-in-view[title="${title}"]`).first();
        for (let i = 0; i < 24 && !(await cell.isVisible()); i++) {
            const shown = await this.calendar.locator('td.ant-picker-cell-in-view[title]').first().getAttribute('title');
            const back = !!shown && title < shown;
            await this.calendar.locator(back ? '.ant-picker-header-prev-btn' : '.ant-picker-header-next-btn').first().click();
        }
        await expect(cell, `the day ${title} in the calendar`).toBeVisible({timeout: 5000});
        await cell.click();
    }

    /** Removes the filter of one column through its own dropdown: the filter icon, Clear filters (then Search, when the dropdown stays). */
    async clearColumnFilter(key: string) {
        await this.filterTrigger(key).click();
        const dropdown = this.filterDropdown;
        await expect(dropdown).toBeVisible({timeout: 15_000});
        const waiting = this.waitForSearch();
        await dropdown.locator('.hydra-filter-container__clear').click();
        if (await dropdown.isVisible()) await dropdown.locator('.hydra-filter-container__apply').click();
        await waiting;
        await expect(dropdown).toBeHidden({timeout: 10_000});
        await this.waitForSpinners();
    }

    /**
     * Every header cell of the table, in order, with what it is: the row selection, the actions column, the scroll
     * bar's placeholder, or a data column (its key and label). The layout check reads this (tests/helpers/checks.ts).
     */
    async headerCells(): Promise<{key: string; label: string; kind: 'selection' | 'actions' | 'scrollbar' | 'data'}[]> {
        return this.table.locator('thead tr').last().locator('th').evaluateAll(ths => ths.map(th => {
            const key = th.getAttribute('columnkey') || '';
            const cls = th.className || '';
            const kind = cls.includes('ant-table-selection-column') ? 'selection' as const
                : key === 'actions' || cls.split(/\s+/).includes('actions') ? 'actions' as const
                : cls.includes('ant-table-cell-scrollbar') ? 'scrollbar' as const : 'data' as const;
            return {key, label: (th.textContent || '').replace(/\s+/g, ' ').trim(), kind};
        }));
    }

    /** The buttons of the row's actions cell (`td.actions`), each with its icon name — what the person sees there. */
    rowActionButtons(row: Locator): Locator {
        return row.locator('td.actions').locator('button, a[role="button"]');
    }

    /** The "Resend invitation" button of a row (an invited person): `data-test` sits on its icon. */
    resendInvitationButton(row: Locator): Locator {
        return row.locator('td.actions button').filter({has: this.page.locator('[data-test="user-resend-invitation"]')});
    }

    /** Buttons of a row that stand OUTSIDE its actions cell — none may (1.0.10: actions belong to the actions column). */
    buttonsOutsideActions(row: Locator): Locator {
        return row.locator('td:not(.actions):not(.ant-table-selection-column) button');
    }

    /** `2026-11-09` — the calendar names its days so (`td[title]`). */
    static isoDay(d: Date): string {
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }

    /** The day (local midnight, ms) a grid cell's date names, or null when the text holds no date. */
    static dayOf(text: string): number | null {
        return date(text);
    }

    /** Types into the grid's search box and submits. */
    async search(term: string) {
        const waiting = this.waitForSearch();
        await this.searchInput.fill(term);
        await this.searchInput.press('Enter');
        await waiting;
    }

    row(text: string | RegExp): Locator {
        return this.rows.filter({hasText: text}).first();
    }

    /** The row's actions menu (the "menu" icon button at the end of the row). */
    rowMenu(row: Locator): Locator {
        return row.locator('[data-test="row-actions"]').or(row.locator('button').filter({has: this.page.locator('.anticon-menu')})).first();
    }

    /** Opens the Create form of the page. */
    async openCreate(title: string | RegExp): Promise<FormDrawer> {
        await expect(this.createButton).toBeVisible({timeout: 30_000});
        await this.createButton.click();
        const form = new FormDrawer(this.page, title);
        await form.waitOpen();
        return form;
    }

    /** Clicks the first link of a row — the item page of that record. */
    async openItem(row: Locator): Promise<ItemPage> {
        const link = row.locator('a[href]').first();
        await expect(link).toBeVisible({timeout: 15_000});
        await link.click();
        await this.page.waitForURL(/\/app\/.+\/[^/]+$/, {timeout: 45_000});
        await this.waitForSpinners().catch(() => undefined);
        return new ItemPage(this.page);
    }

    /** Fails unless the visible values are in `direction` order (numbers, dates and strings each their own way). */
    static expectOrdered(values: string[], direction: SortDirection, column: string) {
        const filled = values.filter(v => v !== '');
        if (filled.length < 2) return;
        const asNum = filled.map(num);
        const asDate = filled.map(date);
        let keys: (number | string)[];
        if (asNum.every(n => n !== null)) keys = asNum as number[];
        else if (asDate.every(d => d !== null)) keys = asDate as number[];
        else keys = filled.map(v => v.toLocaleLowerCase());
        const cmp = (a: number | string, b: number | string) => typeof a === 'number' && typeof b === 'number' ? a - b : String(a).localeCompare(String(b), undefined, {numeric: true, sensitivity: 'base'});
        for (let i = 1; i < keys.length; i++) {
            const c = cmp(keys[i - 1], keys[i]);
            const ok = direction === 'ascend' ? c <= 0 : c >= 0;
            if (!ok) throw new Error(`column "${column}" is not sorted ${direction}: "${filled[i - 1]}" before "${filled[i]}" (rows ${i}, ${i + 1})`);
        }
    }
}
