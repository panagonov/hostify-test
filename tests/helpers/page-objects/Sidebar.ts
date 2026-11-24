import {expect, type Locator, type Page} from '@playwright/test';
import {BasePage} from './BasePage';

/**
 * Nodes of the bar that are not pages of the menu: Support opens the assistant, Collapse folds the bar. They are
 * listed by `menuIds` but never pressed (2026-11-18: a banner at the page's foot covered Collapse and the click
 * waited out its time — and a pressed Collapse would fold the bar the menu walk needs).
 */
export const MENU_CHROME = new Set(['navbarSupport', 'navbarCollapse']);

/**
 * The left navigation: the main bar (`.cc-sidebar`, one `data-test="<groupId>"` link per top-level node) and the
 * slide-in submenu (`.cc-submenu-slide-panel`, `data-test="<pageId>"` per page; a nested group opens inside it).
 * The bar can be COLLAPSED to its icons (`.cc-sidebar--collapsed`, the button "Expand menu" at its foot): then a
 * group's click opens no slide-in submenu and every page of it is "hidden" (102, 2026-11-16/17: QA-405–407 —
 * the manager and the revenue manager lost 95 and 45 pages to it). A person expands it before using the menu, and
 * so does the test (`ensureExpanded`, before every group it opens).
 */
export class Sidebar extends BasePage {
    readonly bar: Locator;
    readonly submenu: Locator;

    constructor(page: Page) {
        super(page);
        this.bar = page.locator('.cc-sidebar');
        this.submenu = page.locator('.cc-submenu-slide-panel');
    }

    /** The bar collapsed to its icons. GAP: no data-test on the bar's state — the class is the fallback (docs/selectors.md). */
    get collapsed(): Locator {
        return this.page.locator('.cc-sidebar.cc-sidebar--collapsed');
    }

    /** The button at the bar's foot that expands it. GAP: no data-test — its accessible name (`sideBar.expand`). */
    get expandButton(): Locator {
        return this.page.getByRole('button', {name: 'Expand menu'});
    }

    /**
     * The logo at the top of the bar — since 1.0.25 the only way to the home page (the first icon, `dashboards`, left
     * the menu). GAP: no data-test; the link around the image named "logo".
     */
    get logo(): Locator {
        return this.page.getByRole('link', {name: /^logo$/i}).first();
    }

    /** The version at the bar's foot (`v 1.0.26`); a click opens the change history (1.0.9). */
    get versionButton(): Locator {
        return this.page.locator('.cc-sidebar-footer__version').first();
    }

    /**
     * The change history the version opens: a drawer titled "Change history" listing the releases. GAP: no data-test.
     * 1.0.26's drawer is `.ant-drawer-section[role=dialog]` (no `.ant-drawer-content` — QA-461 was this locator).
     */
    get changeHistory(): Locator {
        return this.page.locator('.ant-drawer-section:visible, .ant-drawer-content:visible, .ant-modal-content:visible').filter({hasText: /\d+\.\d+\.\d+/}).first();
    }

    /** The bar expanded, as a person does before using the menu: "Expand menu" pressed when the bar is collapsed. */
    async ensureExpanded() {
        await expect(this.bar).toBeVisible({timeout: 45_000});
        if (await this.collapsed.count()) {
            await this.expandButton.click();
            await expect(this.collapsed, 'the menu is expanded').toHaveCount(0, {timeout: 10_000});
        }
    }

    group(id: string): Locator {
        return this.bar.locator(`[data-test="${id}"]`);
    }

    item(id: string): Locator {
        return this.submenu.locator(`[data-test="${id}"]`);
    }

    get submenuTitle(): Locator {
        return this.submenu.locator('.cc-submenu-slide-panel__title');
    }

    /** The ids of every top-level node the signed-in role sees. */
    async groupIds(): Promise<string[]> {
        await expect(this.bar).toBeVisible({timeout: 45_000});
        return this.bar.locator('[data-test]').evaluateAll(els => els.map(e => e.getAttribute('data-test') || '').filter(Boolean));
    }

    /**
     * Every node of the menu the signed-in role sees, at every depth: each top-level node is opened (a page node
     * navigates — harmless), every nested group of its submenu is unfolded once, and the visible ids are collected.
     */
    async menuIds(): Promise<string[]> {
        const all = new Set<string>();
        for (const id of await this.groupIds()) {
            all.add(id);
            if (MENU_CHROME.has(id)) continue;
            await this.ensureExpanded();
            await this.group(id).click();
            await this.page.waitForTimeout(400);
            const unfolded = new Set<string>();
            for (let i = 0; i < 40; i++) {
                const visible = await this.submenu.locator('[data-test]').evaluateAll(els =>
                    els.filter(e => (e as HTMLElement).offsetParent !== null).map(e => ({id: e.getAttribute('data-test') || '', group: /cc-submenu-item--group/.test(e.className.toString()), open: /is-open/.test(e.className.toString())})));
                for (const v of visible) if (v.id) all.add(v.id);
                const next = visible.find(v => v.group && !v.open && !unfolded.has(v.id));
                if (!next) break;
                unfolded.add(next.id);
                await this.item(next.id).click();
                await this.page.waitForTimeout(300);
            }
            await this.page.keyboard.press('Escape');
        }
        return [...all];
    }

    /** Opens a top-level node; a group shows its submenu, a page navigates. */
    async openGroup(id: string) {
        const node = this.group(id);
        await this.ensureExpanded();
        await expect(node, `menu node "${id}"`).toBeVisible({timeout: 30_000});
        await node.click();
        // a person moves on: the pointer left on the icon keeps its tooltip ("App settings") open over the submenu's
        // second row, and that row's click never lands — the pointer goes to the submenu's title
        if (await this.submenuTitle.isVisible().catch(() => false)) await this.submenuTitle.hover();
    }

    /**
     * Clicks a page of the open submenu (through its nested groups, outermost first). A nested group
     * (`.cc-submenu-item--group`) TOGGLES on click: one that is already open (`is-open`) is left alone, else a second
     * visit would fold it and hide the page.
     */
    async openItem(path: string[]) {
        for (const id of path) {
            const node = this.item(id);
            await expect(node, `submenu node "${id}"`).toBeVisible({timeout: 30_000});
            const className = (await node.getAttribute('class')) || '';
            if (className.includes('cc-submenu-item--group') && className.includes('is-open')) continue;
            await node.click();
        }
    }
}
