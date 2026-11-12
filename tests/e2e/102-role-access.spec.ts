import {test, expect} from '../helpers/fixtures';
import {menuPagesFor, navigation} from '../helpers/navigation';
import {SweepSession, AWAITING_INVENTORY, MENU_CHROME} from '../helpers/sweep';
import {probeShot} from '../helpers/probe';
import {BasePage} from '../helpers/page-objects/BasePage';
import {GridPage} from '../helpers/page-objects/GridPage';
import type {QaRole} from '../fixtures/users';
import type {Response} from '@playwright/test';

/**
 * 102 — every role of the QA account sees its own pages, opens them without a refusal, and is refused the others.
 * @qa-description: права по роли — всяка роля от 100 вижда точно своите страници, отваря ги без 403 и не вижда чуждите
 *
 * Proves, for each person of 100 (manager, revenue manager, booking agent, accountant, team supervisor, housekeeper):
 * the live menu holds exactly the pages the inventory gives the role (a missing or an extra node is a finding; the
 * differences that wait for the developers' `npm run inventory` are reported as „чака inventory“ and are never red —
 * sweep.ts → AWAITING_INVENTORY); every page of the role opens through the menu, settles, is presentable and keeps its
 * grid in its layout (the sweep of 010); no API call of those pages is answered 4xx / 5xx (QA-75: a booking agent got
 * 403); up to five pages of the administrator only, opened by their address, show "Page not found" and no data.
 * ONE test per role: a cause that repeats on every page (a refused call of the navbar) is one finding of the role, not
 * one per page; the table role × page goes to the report (`role-access-<role>.json`); a page is photographed only
 * when it fails. Nothing is clicked but the menu. The property manager (no listings yet — 2xx), the invited person
 * (no password) and the inventory's `user`, `listingOwner`, `developer` (not created) are not among them.
 * Creates: nothing (the sign-ins write sessions of the people's telemetry). Needs: 100 (the people).
 */
const ROLES: QaRole[] = ['manager', 'revenueManager', 'bookingAgent', 'accountant', 'teamSupervisor', 'housekeeper'];
/** Pages of the administrator only (by the inventory), tried by their address — the ones a role must not see. */
const ADMIN_ONLY = ['users', 'accountProfile', 'securityGroups', 'apiKeys', 'userSessions', 'accountBilling', 'workflowDefinitions'];

interface PageRow {
    page: string
    path: string
    kind: 'menu' | 'not the role\'s'
    opens: boolean
    api: string[]
}

const apiPath = (url: string) => (url.split('/api')[1] || url).split('?')[0];

for (const role of ROLES) {
    test.describe(`102 role access › ${role}`, () => {
        let session: SweepSession;
        test.use(SweepSession.fixturesOf(() => session));

        test.beforeAll(async ({browser}) => {
            session = await SweepSession.open(browser, role);
        });

        test.afterAll(async () => {
            await session?.close();
        });

        const pages = menuPagesFor(role);

        test(`${role}: the menu holds the role's pages, each opens without a refusal, the administrator's pages are refused`, async ({}, testInfo) => {
            test.setTimeout(pages.length * 30_000 + 300_000);
            const rows: PageRow[] = [];

            await test.step('the live menu holds exactly the pages the inventory gives the role', async () => {
                const live = new Set(await session.sidebar.menuIds());
                const expected = new Set(navigation().pages.filter(p => !p.noMenu && p.roles.includes(role)).map(p => p.id));
                const differs = (id: string) => expected.has(id) !== live.has(id);
                const awaiting = [...new Set([...expected, ...live])].filter(id => AWAITING_INVENTORY[id] && differs(id));
                testInfo.annotations.push({type: 'чака inventory', description: awaiting.length ? awaiting.map(id => `${id} (${AWAITING_INVENTORY[id]})`).join(', ') : 'няма'});
                const missing = [...expected].filter(id => !live.has(id) && !AWAITING_INVENTORY[id]);
                const extra = [...live].filter(id => !expected.has(id) && !AWAITING_INVENTORY[id] && !MENU_CHROME.has(id));
                expect.soft(missing, `${role}: pages the inventory gives the role, missing from the live menu`).toEqual([]);
                expect.soft(extra, `${role}: nodes of the live menu the inventory does not give the role`).toEqual([]);
            });

            for (const nav of pages.filter(p => !AWAITING_INVENTORY[p.id])) {
                await test.step(`${nav.menuPath.join(' › ')} (${nav.path})`, async () => {
                    const api: string[] = [];
                    const listen = (res: Response) => { if (res.url().includes('/api/') && res.status() >= 400) api.push(`${res.status()} ${res.request().method()} ${apiPath(res.url())}`); };
                    session.page.on('response', listen);
                    const before = testInfo.errors.length;
                    try {
                        // a page that fails is a finding of this step and the sweep goes on to the next page
                        await expect.soft(session.visit(nav, testInfo, {shot: false}), `${role}: ${nav.id} opens and is presentable`).resolves.toBeTruthy();
                    } finally {
                        session.page.off('response', listen);
                    }
                    const opens = testInfo.errors.length === before;
                    if (!opens) await probeShot(session.page, testInfo, `${role}-${nav.id}`);
                    rows.push({page: nav.id, path: nav.path, kind: 'menu', opens, api: [...new Set(api)]});
                });
            }

            await test.step('the administrator\'s pages, by their address, show "Page not found" and no data', async () => {
                const base = new BasePage(session.page);
                const grid = new GridPage(session.page, 'page');
                for (const nav of navigation().pages.filter(p => ADMIN_ONLY.includes(p.id) && !p.noMenu && !p.roles.includes(role)).slice(0, 5)) {
                    const api: string[] = [];
                    const listen = (res: Response) => { if (res.url().includes('/api/') && res.status() >= 400) api.push(`${res.status()} ${res.request().method()} ${apiPath(res.url())}`); };
                    session.page.on('response', listen);
                    try {
                        await base.goto(nav.path.replace(/^\/app/, ''));
                        await expect.soft(base.notFound, `${role}: ${nav.id} by its address shows "Page not found"`).toBeVisible({timeout: 30_000});
                        await expect.soft(grid.rows, `${role}: ${nav.id} shows no rows of data`).toHaveCount(0);
                    } finally {
                        session.page.off('response', listen);
                    }
                    rows.push({page: nav.id, path: nav.path, kind: 'not the role\'s', opens: false, api: [...new Set(api)]});
                }
            });

            // the table role × page, and the refusals of the role's OWN pages, one line per call with its pages
            await testInfo.attach(`role-access-${role}.json`, {body: JSON.stringify({role, rows}, null, 2), contentType: 'application/json'});
            const byCall = new Map<string, string[]>();
            for (const r of rows.filter(r => r.kind === 'menu')) for (const call of r.api) byCall.set(call, [...(byCall.get(call) || []), r.page]);
            const refusals = [...byCall].map(([call, on]) => `${call} — on ${on.length} page(s): ${on.slice(0, 5).join(', ')}${on.length > 5 ? ' …' : ''}`);
            const menuRows = rows.filter(r => r.kind === 'menu');
            testInfo.annotations.push({type: 'role-access', description: `${role}: ${menuRows.filter(r => r.opens).length}/${menuRows.length} pages open; ${refusals.length} refused call(s)`});
            expect.soft(refusals, `${role}: API answers 4xx / 5xx on the role's own pages`).toEqual([]);
        });
    });
}
