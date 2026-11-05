import {expect, type Browser, type BrowserContext, type Page, type TestInfo} from '@playwright/test';
import {probePage, expectPresentable, type ProbeResult} from './probe';
import {Sidebar} from './page-objects/Sidebar';
import {LoginPage} from './page-objects/LoginPage';
import {adminCredentials, superAdminCredentials} from './env';
import {clicksFor, type NavPage} from './navigation';

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

    static async open(browser: Browser, who: 'superAdmin' | 'admin'): Promise<SweepSession> {
        const s = new SweepSession();
        s.context = await browser.newContext({extraHTTPHeaders: {'x-demo-data': '1'}, viewport: {width: 1600, height: 1000}, locale: 'en-GB'});
        s.page = await s.context.newPage();
        s.sidebar = new Sidebar(s.page);
        const {email, password} = who === 'superAdmin' ? superAdminCredentials() : adminCredentials();
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
        await this.sidebar.openGroup(group);
        if (items.length) await this.sidebar.openItem(items);
        await expect(this.page, `the URL of "${nav.id}"`).toHaveURL(new RegExp(`${nav.path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(/|\\?|$)`), {timeout: 45_000});
        await this.page.waitForLoadState('networkidle', {timeout: 20_000}).catch(() => undefined);
        // a grid or a dashboard loads after the route: give the spinner a bounded chance to go away (a stuck one is a finding)
        await expect(this.page.locator('.ant-spin-spinning')).toHaveCount(0, {timeout: 30_000}).catch(() => undefined);
        const result = await probePage(this.page, testInfo, nav.id);
        expectPresentable(result);
        return result;
    }
}
