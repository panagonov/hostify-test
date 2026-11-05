import {expect, type Browser, type BrowserContext, type Page, type TestInfo} from '@playwright/test';
import {probePage, expectPresentable, type ProbeResult} from './probe';
import {Sidebar} from './page-objects/Sidebar';
import {LoginPage} from './page-objects/LoginPage';
import {adminCredentials, superAdminCredentials} from './env';
import {clicksFor, type NavPage} from './navigation';
import {waitForPageData} from './settle';

/**
 * The page sweep: ONE browser window per spec file (signing in before every page would cost more than the pages),
 * every page of the menu opened THROUGH THE MENU — the group in the bar, then the nodes of the submenu — and probed.
 * The spec hands this window to every test as its `page` (`test.use({page, context})`), so the automatic console
 * fixture listens on it per test and no blank window opens per test; a person watches one window the whole time.
 */
export class SweepSession {
    context!: BrowserContext;
    page!: Page;
    sidebar!: Sidebar;
    /** Who is signed in — part of every "how to reproduce". */
    who: 'superAdmin' | 'admin' = 'admin';
    email = '';

    static async open(browser: Browser, who: 'superAdmin' | 'admin'): Promise<SweepSession> {
        const s = new SweepSession();
        s.context = await browser.newContext({extraHTTPHeaders: {'x-demo-data': '1'}, viewport: {width: 1600, height: 1000}, locale: 'en-GB'});
        s.page = await s.context.newPage();
        s.sidebar = new Sidebar(s.page);
        const {email, password} = who === 'superAdmin' ? superAdminCredentials() : adminCredentials();
        s.who = who;
        s.email = email;
        const login = new LoginPage(s.page);
        await login.navigate();
        await login.login(email, password);
        return s;
    }

    async close() {
        await this.context?.close();
    }

    /** The fixtures a sweep spec hands to its tests: the session's window as `page` and `context`. */
    static fixturesOf(get: () => SweepSession) {
        return {
            page: async ({}: {}, use: (page: Page) => Promise<void>) => { await use(get().page); },
            context: async ({}: {}, use: (context: BrowserContext) => Promise<void>) => { await use(get().context); }
        };
    }

    /** Opens a menu page by clicking, waits for it to settle, probes it; the automatic console fixture judges the console. */
    async visit(nav: NavPage, testInfo: TestInfo): Promise<ProbeResult> {
        const {group, items} = clicksFor(nav);
        // the menu texts a person reads, collected as they are clicked — the "how to reproduce" of a failure
        const labels: string[] = [];
        const labelOf = async (locator: ReturnType<Sidebar['group']>) => ((await locator.first().innerText().catch(() => '')) || '').split('\n')[0].trim();
        labels.push(await labelOf(this.sidebar.group(group)) || group);
        await this.sidebar.openGroup(group);
        for (const id of items) labels.push(await labelOf(this.sidebar.item(id)) || id);
        if (items.length) await this.sidebar.openItem(items);
        await testInfo.attach('repro.json', {body: JSON.stringify({
            role: this.who, email: this.email, menu: labels, menuIds: nav.menuPath, url: `${this.page.url().split('/app/')[0]}${nav.path}`
        }), contentType: 'application/json'});
        await expect(this.page, `the URL of "${nav.id}"`).toHaveURL(new RegExp(`${nav.path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(/|\\?|$)`), {timeout: 45_000});
        // the page is loaded when its DATA is on the screen (rows, cards, columns, widgets) or its "No data" indicator —
        // a page that shows neither within the time fails here, with the reason
        const state = await waitForPageData(this.page);
        const result = await probePage(this.page, testInfo, nav.id);
        result.stats.rows = state.rows;
        result.stats.empty = state.empty ? 1 : 0;
        await testInfo.attach('page-data.json', {body: JSON.stringify({page: nav.id, ...state}), contentType: 'application/json'});
        expectPresentable(result);
        return result;
    }
}
