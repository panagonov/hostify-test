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
