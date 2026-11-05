import {expect, type Locator, type Page} from '@playwright/test';
import {BasePage} from './BasePage';

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
