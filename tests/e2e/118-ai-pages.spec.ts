import {test, expect} from '../helpers/fixtures';
import {Sidebar} from '../helpers/page-objects/Sidebar';
import {GridPage} from '../helpers/page-objects/GridPage';
import {probePage, expectPresentable} from '../helpers/probe';
import {checkGridLayout} from '../helpers/checks';
import type {Request, Response} from '@playwright/test';

/**
 * 118 — the pages the inventory of 2026-11-05 does not know, so 010 / 011 never open them: AI › Check findings,
 * Listing benchmarks, Conversation scores, AI usage (1.0.19; their forms follow the others since 1.0.23) and
 * Settings › Dashboards (1.0.25). Scenario 29 (reports/test-scenarios/1.0.26.md).
 * @qa-description: страниците извън inventory — AI страниците и Settings › Dashboards се отварят, гледат се, формите се затварят с Cancel
 *
 * Proves, for the administrator: each page is reached through the live menu (the node found by its data-test in
 * whatever group holds it), opens, passes the probe, keeps its grid in its layout; where the page has a create
 * button, its form opens like every other form (a drawer with sections and its buttons) and closes with Cancel; no
 * write reaches the server. For the people of 100 whose live menu holds a page: it opens without a 4xx.
 * NEVER pressed: Save, anything that starts an analysis or an AI call ("Run", "Analyse", "Generate"…), Export.
 * Delete this spec's page list entry when `npm run inventory` brings the page in: 010 / 011 then sweep it.
 * Creates: nothing. Needs: 100 (the people).
 */
const PAGES = ['checkFindings', 'listingBenchmarks', 'conversationScores', 'aiUsages', 'dashboardDefinitions'];
const ROLES = ['manager', 'revenueManager', 'bookingAgent', 'accountant'] as const;
/**
 * A write of the account's data: PUT / PATCH / DELETE, or a POST to the entity itself (`POST /api/<entity>` creates) or
 * to an action that changes or starts something. Hydra READS through POST too (`/security/session`, `/security/accounts`,
 * `/inboxThread/inbox`, `/review/channels`, `/reporting/kpi`, `/reporting/displayCurrencies`,
 * `/security/consolidatedActivity`, `/listing/airbnbLimitsListing` — calm look 2026-11-24; QA-476 counted them).
 * The client's own bookkeeping (telemetry, the person's grid / dashboard settings) is not a write.
 */
const WRITES = (r: Request) => {
    if (!r.url().includes('/api/')) return false;
    const p = r.url().split('/api')[1].split('?')[0];
    // `POST /summary` is a read — the summary cards over a grid ({index, cards, slice} → their figures), not a create
    if (/^\/(userEvent|gridDecorator|dashboardDecorator|sharedGridView|summary)\b/i.test(p)) return false;
    if (['PUT', 'PATCH', 'DELETE'].includes(r.method())) return true;
    return r.method() === 'POST' && (/^\/[^/]+\/?$/.test(p) || /\/(create|save|update|delete|remove|run|analy[sz]e|generate|start|execute|import|push|sync)\w*$/i.test(p));
};

/** Finds a node in the live menu: opens each top-level group in turn until the node is visible. */
const reach = async (sidebar: Sidebar, id: string): Promise<boolean> => {
    for (const group of await sidebar.groupIds()) {
        if (['navbarSupport', 'navbarCollapse', 'alerts'].includes(group)) continue;
        await sidebar.openGroup(group);
        const node = sidebar.item(id);
        await sidebar.page.waitForTimeout(800);
        if (await node.isVisible()) { await node.click(); return true; }
        // a nested group of the submenu may hold it
        const nested = await sidebar.submenu.locator('.cc-submenu-item--group[data-test]').evaluateAll(els => els.map(e => e.getAttribute('data-test') || ''));
        for (const n of nested) {
            await sidebar.item(n).click();
            await sidebar.page.waitForTimeout(500);
            if (await node.isVisible()) { await node.click(); return true; }
        }
        await sidebar.page.keyboard.press('Escape');
    }
    return false;
};

test.describe('118 pages outside the inventory', () => {
    test('admin: every page opens, is presentable, its form closes with Cancel, nothing is written', async ({page, signInAs}, testInfo) => {
        test.setTimeout(600_000);
        await signInAs('admin');
        const sidebar = new Sidebar(page);
        const writes: string[] = [];
        const listen = (r: Request) => { if (WRITES(r)) writes.push(`${r.method()} ${r.url().split('/api')[1]}`); };
        page.on('request', listen);
        try {
            for (const id of PAGES) {
                await test.step(id, async () => {
                    const found = await reach(sidebar, id);
                    expect.soft(found, `${id}: the node is on the administrator's live menu`).toBe(true);
                    if (!found) return;
                    const grid = new GridPage(page, id);
                    await grid.waitForSpinners();
                    expectPresentable(await probePage(page, testInfo, `admin-${id}`));
                    if (await grid.table.isVisible()) await checkGridLayout(grid);
                    if (await grid.createButton.isVisible()) {
                        await grid.createButton.click();
                        // 1.0.26's drawer is `.ant-drawer-section[role=dialog]` (QA-479: the form was open, the locator missed it)
                        const drawer = page.locator('.ant-drawer-section:visible, .ant-drawer-content:visible').last();
                        await expect.soft(drawer, `${id}: the create form opens in a drawer like every other form (1.0.23)`).toBeVisible({timeout: 30_000});
                        expectPresentable(await probePage(page, testInfo, `admin-${id}-form`));
                        await drawer.locator('button').filter({hasText: /^\s*Cancel\s*$/}).first().click();
                        await expect(drawer, `${id}: Cancel closes the form`).toBeHidden({timeout: 15_000});
                    }
                });
            }
        } finally {
            page.off('request', listen);
        }
        expect(writes, 'nothing is written while the pages are looked at').toEqual([]);
    });

    for (const role of ROLES) {
        test(`${role}: the pages of its live menu open without a refusal`, async ({page, signInAs}, testInfo) => {
            test.setTimeout(300_000);
            await signInAs(role);
            const sidebar = new Sidebar(page);
            const live = new Set(await sidebar.menuIds());
            const mine = PAGES.filter(id => live.has(id));
            testInfo.annotations.push({type: role, description: mine.length ? mine.join(', ') : 'none of the pages on its menu'});
            for (const id of mine) {
                await test.step(id, async () => {
                    const refused: string[] = [];
                    const listen = (r: Response) => { if (r.url().includes('/api/') && r.status() >= 400) refused.push(`${r.status()} ${r.request().method()} ${r.url().split('/api')[1].split('?')[0]}`); };
                    page.on('response', listen);
                    try {
                        expect.soft(await reach(sidebar, id), `${role}: ${id} is reached through the menu`).toBe(true);
                        await new GridPage(page, id).waitForSpinners();
                        expectPresentable(await probePage(page, testInfo, `${role}-${id}`, {shot: false}));
                    } finally {
                        page.off('response', listen);
                    }
                    expect.soft([...new Set(refused)], `${role}: ${id} is answered without a 4xx / 5xx`).toEqual([]);
                });
            }
        });
    }
});
