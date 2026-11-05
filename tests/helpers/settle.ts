import {expect, type Page} from '@playwright/test';

/**
 * A page is LOADED when its data is on the screen — not when the spinner goes away. A grid shows its rows or its
 * "No data" indicator (and its paginator total), a card view its cards, a board its columns, a list its rows, a
 * dashboard its widgets without skeletons. Until then nothing may be probed or judged, and a page that shows neither
 * data nor "No data" within the time is a failure of its own ("the grid never loaded").
 */
export interface PageDataState {
    kind: 'grid' | 'cards' | 'board' | 'list' | 'dashboard' | 'page'
    rows: number
    empty: boolean
}

const GRID = '.ant-table:not(.hydra-dashboard-widget .ant-table)';

export async function waitForPageData(page: Page, timeout = 30_000): Promise<PageDataState> {
    // 1. nothing turning: spinners and skeletons gone (a stuck spinner is reported by the probe, so this is bounded and quiet)
    await expect(page.locator('.ant-spin-spinning, .ant-skeleton-active')).toHaveCount(0, {timeout}).catch(() => undefined);

    const hasGrid = await page.locator(GRID).first().isVisible().catch(() => false);
    if (hasGrid) {
        const table = page.locator(GRID).first();
        const rows = table.locator('tbody tr.ant-table-row');
        const empty = table.locator('.ant-table-placeholder, .ant-empty');
        await expect.poll(async () => (await rows.count()) > 0 || (await empty.first().isVisible().catch(() => false)), {
            timeout,
            message: 'the grid shows neither rows nor "No data"'
        }).toBe(true);
        const count = await rows.count();
        // the paginator's total comes with the data; give it a moment when the page has one
        const total = page.locator('.ant-pagination-total-text').first();
        if (await page.locator('.ant-pagination').first().isVisible().catch(() => false))
            await expect(total).toBeVisible({timeout: 10_000}).catch(() => undefined);
        return {kind: 'grid', rows: count, empty: count === 0};
    }
    const cards = page.locator('.cardView .cardViewCol, .cardView .ant-empty');
    if (await page.locator('.cardView').first().isVisible().catch(() => false)) {
        await expect.poll(async () => cards.count(), {timeout, message: 'the card view shows neither cards nor "No data"'}).toBeGreaterThan(0);
        const n = await page.locator('.cardView .cardViewCol').count();
        return {kind: 'cards', rows: n, empty: n === 0};
    }
    if (await page.locator('.boardColumn').first().isVisible().catch(() => false)) {
        await expect.poll(async () => page.locator('.boardColumn').count(), {timeout, message: 'the board shows no columns'}).toBeGreaterThan(0);
        const n = await page.locator('.boardColumn .droppableArea > *:not(.columnLoadingMore)').count();
        return {kind: 'board', rows: n, empty: n === 0};
    }
    if (await page.locator('.hydra-dashboard-widget').first().isVisible().catch(() => false)) {
        await expect(page.locator('.hydra-dashboard-widget .ant-skeleton')).toHaveCount(0, {timeout}).catch(() => undefined);
        return {kind: 'dashboard', rows: await page.locator('.hydra-dashboard-widget').count(), empty: false};
    }
    const list = page.locator('.listBuilder, [class*="ListBuilder"], .cc-list');
    if (await list.first().isVisible().catch(() => false)) {
        await expect.poll(async () => list.locator('.ant-empty, [class*="row"], [class*="item"]').count(), {timeout, message: 'the list shows neither rows nor "No data"'}).toBeGreaterThan(0);
        const n = await list.locator('[class*="row"], [class*="item"]').count();
        return {kind: 'list', rows: n, empty: n === 0};
    }
    // a plain page (a form page, a settings page, a wizard): its content must be there
    await expect.poll(async () => page.locator('.siteContent, .ant-layout-content, main').first().evaluate(el => el.textContent?.trim().length || 0).catch(() => 0), {timeout, message: 'the page shows no content'}).toBeGreaterThan(0);
    return {kind: 'page', rows: 0, empty: false};
}
