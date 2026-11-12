import {expect, type Locator, type Page} from '@playwright/test';
import {BasePage} from './BasePage';

/**
 * The left navigation: the main bar (`.cc-sidebar`, one `data-test="<groupId>"` link per top-level node) and the
 * slide-in submenu (`.cc-submenu-slide-panel`, `data-test="<pageId>"` per page; a nested group opens inside it).
 */
export class Sidebar extends BasePage {
    readonly bar: Locator;
    readonly submenu: Locator;

    constructor(page: Page) {
        super(page);
        this.bar = page.locator('.cc-sidebar');
        this.submenu = page.locator('.cc-submenu-slide-panel');
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
