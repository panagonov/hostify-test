import {expect, type Locator, type Page} from '@playwright/test';
import {BasePage} from './BasePage';

/** How a tab bar looks: the active tab's font, the ink bar under it, the frame of a tab (none for line tabs). */
export interface TabsStyle {
    /** "13.5px 500" */
    font: string
    /** "rgb(22, 127, 252) 2px" */
    ink: string
    /** the top border width of a tab: "0px" for line tabs, a width for the default card tabs */
    border: string
    /** the background of a tab: transparent for line tabs */
    background: string
}

/** The view tabs of the grids (Settings › Users, Platform Admin › Accounts), measured on 2026-11-10 (1.0.10): the
 *  reference for a record page whose grid has no view tabs (Settings › Listing tags). */
export const GRID_VIEW_TABS: TabsStyle = {font: '13.5px 500', ink: 'rgb(22, 127, 252) 2px', border: '0px', background: 'rgba(0, 0, 0, 0)'};

/** The style of the tab bar `bar` (an antd `.ant-tabs`) — compared between a record page and its grid (1.0.10). */
export const tabsStyleOf = async (bar: Locator): Promise<TabsStyle> => bar.evaluate(el => {
    const css = (e: Element | null) => e ? getComputedStyle(e) : null;
    const active = css(el.querySelector('.ant-tabs-tab-active .ant-tabs-tab-btn'));
    const ink = css(el.querySelector('.ant-tabs-ink-bar'));
    const tab = css(el.querySelector('.ant-tabs-tab'));
    return {
        font: active ? `${active.fontSize} ${active.fontWeight}` : '(no active tab)',
        ink: ink ? `${ink.backgroundColor} ${ink.height}` : '(no ink bar)',
        border: tab ? tab.borderTopWidth : '(no tab)',
        background: tab ? tab.backgroundColor : '(no tab)'
    };
});

/** What a record page looks like (1.0.10: "the white page with its head and tabs"). */
export interface RecordLook {
    /** the title's bottom and the tab bar's top, in px from the top of the window */
    titleBottom: number
    tabsTop: number
    /** the background of the page the record sits on: the nearest painted box around the tab bar */
    pageBackground: string
    tabs: TabsStyle
}

/**
 * The item page of a record (ItemController): a title and a tab bar (TabsBuilder renders `data-test="tab-<name>"`).
 */
export class ItemPage extends BasePage {
    readonly title: Locator;

    constructor(page: Page) {
        super(page);
        // ItemTitle renders an antd Typography.Title level 2; a project title component may render its own h1/h2
        this.title = page.locator('[data-test="item-title"], h2.ant-typography, h1.ant-typography').first();
    }

    /** The record's tab bar (TabsBuilder) — no data-test yet (docs/selectors.md → Gaps: `item-tabs`). */
    get tabBar(): Locator {
        return this.page.locator('.ant-tabs.tabBuilder').or(this.page.locator('.ant-tabs').filter({has: this.page.locator('[data-test^="tab-"]')})).first();
    }

    /** The head, the background and the tabs of the record page. */
    async look(): Promise<RecordLook> {
        const tabs = await tabsStyleOf(this.tabBar);
        const titleBottom = await this.title.evaluate(e => Math.round(e.getBoundingClientRect().bottom));
        const box = await this.tabBar.evaluate(bar => {
            let e: HTMLElement | null = bar as HTMLElement;
            while (e && e !== document.body && /rgba\(0, 0, 0, 0\)|transparent/.test(getComputedStyle(e).backgroundColor)) e = e.parentElement;
            return {top: Math.round(bar.getBoundingClientRect().top), background: e ? getComputedStyle(e).backgroundColor : '(none)'};
        });
        return {titleBottom, tabsTop: box.top, pageBackground: box.background, tabs};
    }

    /**
     * The cards, dashboard widgets and grids of the open tab that stand edge to edge: closer than `margin` px to the
     * left or the right edge of the record page (the painted box around the tab bar). Described, never thrown.
     */
    async edgeToEdge(margin = 8): Promise<string[]> {
        return this.tabBar.evaluate((bar, margin) => {
            let page: HTMLElement | null = bar as HTMLElement;
            while (page && page !== document.body && /rgba\(0, 0, 0, 0\)|transparent/.test(getComputedStyle(page).backgroundColor)) page = page.parentElement;
            const edge = (page || bar).getBoundingClientRect();
            return Array.from((page || bar).querySelectorAll('.ant-card, .hydra-dashboard-widget, .ant-table-wrapper'))
                .filter(e => (e as HTMLElement).offsetParent !== null)
                .filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.left - edge.left < margin || edge.right - r.right < margin); })
                .slice(0, 5)
                .map(e => { const r = e.getBoundingClientRect(); return `${e.className.toString().split(' ')[0]} at ${Math.round(r.left - edge.left)}px from the left / ${Math.round(edge.right - r.right)}px from the right`; });
        }, margin);
    }

    tab(name: string): Locator {
        return this.locator(`tab-${name}`);
    }

    /** The names of the tabs the page shows, in order. */
    async tabNames(): Promise<string[]> {
        return this.page.locator('[data-test^="tab-"]').evaluateAll(els =>
            els.filter(e => (e as HTMLElement).offsetParent !== null).map(e => (e.getAttribute('data-test') || '').slice(4)));
    }

    get activePanel(): Locator {
        return this.page.locator('.ant-tabs-tabpane-active').first();
    }

    async openTab(name: string) {
        await this.tab(name).click();
        await expect(this.tab(name)).toHaveClass(/ant-tabs-tab-active/, {timeout: 15_000}).catch(async () => {
            // antd v6: the active class sits on the wrapping .ant-tabs-tab
            await expect(this.tab(name).locator('xpath=ancestor-or-self::*[contains(@class,"ant-tabs-tab")]').first()).toHaveClass(/ant-tabs-tab-active/, {timeout: 15_000});
        });
        await this.waitForSpinners().catch(() => undefined);
    }
}
