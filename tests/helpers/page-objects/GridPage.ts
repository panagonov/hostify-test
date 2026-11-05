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
            await this.clearFiltersButton.click();
            await this.waitForSearch();
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
