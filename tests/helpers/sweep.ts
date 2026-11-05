import {expect, type Browser, type BrowserContext, type Page, type TestInfo} from '@playwright/test';
import {ConsoleCollector, assertClean} from './console';
import {probePage, expectPresentable, type ProbeResult} from './probe';
import {Sidebar} from './page-objects/Sidebar';
import {LoginPage} from './page-objects/LoginPage';
import {adminCredentials, superAdminCredentials} from './env';
import {clicksFor, type NavPage} from './navigation';

/**
 * The page sweep: ONE browser session per spec file (signing in before every page would cost more than the pages),
 * every page of the menu opened THROUGH THE MENU — the group in the bar, then the nodes of the submenu — and probed.
 * The console is sliced per page, so each page test reports and fails on its own words only.
 */
export class SweepSession {
    context!: BrowserContext;
    page!: Page;
    collector!: ConsoleCollector;
    sidebar!: Sidebar;
    private mark = 0;

    static async open(browser: Browser, who: 'superAdmin' | 'admin'): Promise<SweepSession> {
        const s = new SweepSession();
        s.context = await browser.newContext({extraHTTPHeaders: {'x-demo-data': '1'}, viewport: {width: 1600, height: 1000}, locale: 'en-GB'});
        s.page = await s.context.newPage();
        s.collector = new ConsoleCollector(s.page);
        s.sidebar = new Sidebar(s.page);
        const {email, password} = who === 'superAdmin' ? superAdminCredentials() : adminCredentials();
        const login = new LoginPage(s.page);
        await login.navigate();
        await login.login(email, password);
        s.mark = s.collector.records.length;
        return s;
    }

    async close() {
        await this.context?.close();
    }

    /** Opens a menu page by clicking, waits for it to settle, probes it; attaches the page's console and findings. */
    async visit(nav: NavPage, testInfo: TestInfo): Promise<ProbeResult> {
        this.mark = this.collector.records.length;
        const {group, items} = clicksFor(nav);
        await this.sidebar.openGroup(group);
        if (items.length) await this.sidebar.openItem(items);
        await expect(this.page, `the URL of "${nav.id}"`).toHaveURL(new RegExp(`${nav.path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(/|\\?|$)`), {timeout: 45_000});
        await this.page.waitForLoadState('networkidle', {timeout: 20_000}).catch(() => undefined);
        // a grid or a dashboard loads after the route: give the spinner a bounded chance to go away (a stuck one is a finding)
        await expect(this.page.locator('.ant-spin-spinning')).toHaveCount(0, {timeout: 30_000}).catch(() => undefined);
        const result = await probePage(this.page, testInfo, nav.id);
        const slice = this.collector.records.slice(this.mark);
        await testInfo.attach('console.json', {body: JSON.stringify(slice, null, 2), contentType: 'application/json'});
        expectPresentable(result);
        const partial = Object.create(this.collector) as ConsoleCollector;
        Object.defineProperty(partial, 'records', {value: slice});
        assertClean(partial);
        return result;
    }
}
