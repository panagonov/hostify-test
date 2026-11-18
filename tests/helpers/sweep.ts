import {expect, type Browser, type BrowserContext, type Page, type TestInfo} from '@playwright/test';
import {probePage, expectPresentable, type ProbeResult} from './probe';
import {Sidebar, MENU_CHROME} from './page-objects/Sidebar';
import {LoginPage} from './page-objects/LoginPage';
import {credentialsOf, type SignInWho} from './fixtures';
import {clicksFor, type NavPage} from './navigation';
import {waitForPageData} from './settle';
import {checkGridLayout} from './checks';
import {GridPage} from './page-objects/GridPage';
import {ThemeSwitch} from './page-objects/ThemeSwitch';

/**
 * The differences between inventory/navigation.json (generated 2026-11-05) and the live menu that wait for the
 * developers' `npm run inventory` (the QA person, 2026-11-10): reported as „чака inventory“, never red. Delete an
 * entry when the inventory is regenerated — the test then judges it like any other page.
 */
export const AWAITING_INVENTORY: Record<string, string> = {
    // in the inventory, not on the live menu
    reviewsMenu: 'Reviews', reviews: 'Reviews', airbnbReviewsMenu: 'Reviews', airbnbReviewsDashboard: 'Reviews',
    airbnbReviews: 'Reviews', airbnbReviewListings: 'Reviews', airbnbTripIssues: 'Reviews',
    bookingComReviewsMenu: 'Reviews', bookingComReviewsDashboard: 'Reviews', bookingComReviews: 'Reviews',
    bookingComReviewListings: 'Reviews', vrboReviewsMenu: 'Reviews', vrboReviewsDashboard: 'Reviews', vrboReviews: 'Reviews',
    vrboReviewListings: 'Reviews', internalReviewsMenu: 'Reviews', internalReviewsDashboard: 'Reviews', internalReviews: 'Reviews',
    bookingOptimizer: 'Reporting › Booking optimizer', pricingPromotions: 'Pricing › Promotions',
    // on the live menu, not in the inventory
    supportAgents: 'Platform Admin › Support people', alerts: 'Alerts'
};

/** Nodes of the bar that are not pages of the menu — defined by the Sidebar, which never presses them. */
export {MENU_CHROME};

/** The grids 1.0.10 names in its fix "actions sat in an extra column outside the grid's layout" — named in the report. */
export const LAYOUT_FIX_GRIDS = new Set(['securityGroups', 'customFields', 'icalSubscriptions', 'channelListings', 'syncActivities']);

export interface VisitOptions {
    /** the dark theme is on: no part of the page may stay light */
    dark?: boolean
    /** false: no probe screenshot (a one-test sweep photographs only its failing pages) */
    shot?: boolean
}

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
    who: SignInWho = 'admin';
    email = '';

    static async open(browser: Browser, who: SignInWho): Promise<SweepSession> {
        const s = new SweepSession();
        s.context = await browser.newContext({extraHTTPHeaders: {'x-demo-data': '1'}, viewport: {width: 1600, height: 1000}, locale: 'en-GB'});
        s.page = await s.context.newPage();
        s.sidebar = new Sidebar(s.page);
        const {email, password} = credentialsOf(who);
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
    async visit(nav: NavPage, testInfo: TestInfo, options: VisitOptions = {}): Promise<ProbeResult> {
        const {group, items} = clicksFor(nav);
        // the menu texts a person reads, collected as they are clicked — the "how to reproduce" of a failure
        const labels: string[] = [];
        const labelOf = async (locator: ReturnType<Sidebar['group']>) => ((await locator.first().innerText().catch(() => '')) || '').split('\n')[0].trim();
        await this.sidebar.openGroup(group);
        // the bar shows icons only: the group's text is the title of the submenu it opens (a page without one keeps its link text)
        labels.push(await labelOf(this.sidebar.submenuTitle) || await labelOf(this.sidebar.group(group)) || group);
        for (const id of items) labels.push(await labelOf(this.sidebar.item(id)) || id);
        if (items.length) await this.sidebar.openItem(items);
        await testInfo.attach('repro.json', {body: JSON.stringify({
            role: this.who, email: this.email, menu: labels, menuIds: nav.menuPath, url: `${this.page.url().split('/app/')[0]}${nav.path}`
        }), contentType: 'application/json'});
        // a page that only forwards (Pricing › Taxes → Fee templates filtered on its kind, Hostify M10-1) is judged where
        // it lands — any of the addresses the inventory knows for it
        const escape = (address: string) => address.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const expected = (nav.landsOn?.length ? nav.landsOn : [nav.path]).map(escape).join('|');
        await expect(this.page, `the URL of "${nav.id}"`).toHaveURL(new RegExp(`(${expected})(/|\\?|&|$)`), {timeout: 45_000});
        // the page is loaded when its DATA is on the screen (rows, cards, columns, widgets) or its "No data" indicator —
        // a page that shows neither within the time fails here, with the reason
        const state = await waitForPageData(this.page);
        const result = await probePage(this.page, testInfo, nav.id, {shot: options.shot});
        result.stats.rows = state.rows;
        result.stats.empty = state.empty ? 1 : 0;
        await testInfo.attach('page-data.json', {body: JSON.stringify({page: nav.id, ...state}), contentType: 'application/json'});
        // every grid keeps its columns in its layout (1.0.10): headers on an empty grid, the first row on a full one
        if (state.kind === 'grid') {
            const grid = new GridPage(this.page, nav.entity || nav.id);
            await checkGridLayout(grid);
            if (state.rows > 0) await expect.soft(grid.buttonsOutsideActions(grid.rows.first()), `${nav.id}: no button of the first row outside the actions column`).toHaveCount(0);
            if (LAYOUT_FIX_GRIDS.has(nav.id)) testInfo.annotations.push({type: 'grid-layout', description: `${nav.id}: one of the grids of the 1.0.10 fix — checked (${state.rows} row(s))`});
        }
        if (options.dark) {
            const light = await new ThemeSwitch(this.page).lightParts();
            expect.soft(light, `${nav.id}: no part of the page stays light in the dark theme`).toEqual([]);
        }
        expectPresentable(result);
        return result;
    }
}
