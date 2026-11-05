import {expect, type Locator, type Page} from '@playwright/test';
import {CONFIG} from '../env';

/**
 * Base of every page object: navigation under the app path, `data-test` locators, toasts, spinners.
 * Selectors live HERE (and in the other page objects), never in a spec — docs/selectors.md lists them.
 */
export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /** `/x/y` → `/app/x/y`; an absolute app path is kept. */
    static appPath(path: string): string {
        if (path.startsWith(CONFIG.appPath + '/') || path === CONFIG.appPath) return path;
        return `${CONFIG.appPath}${path.startsWith('/') ? '' : '/'}${path}`;
    }

    /** Navigate and let the page settle (the app keeps a socket open: "network idle" is best effort). */
    async goto(path: string) {
        await this.page.goto(BasePage.appPath(path), {waitUntil: 'domcontentloaded'});
        await this.page.waitForLoadState('networkidle', {timeout: 15_000}).catch(() => undefined);
    }

    locator(dataTest: string): Locator {
        return this.page.locator(`[data-test="${dataTest}"]`);
    }

    /** Waits until no antd spinner turns on the page (the grid's load, a drawer's init). */
    async waitForSpinners(timeout = 30_000) {
        await expect(this.page.locator('.ant-spin-spinning')).toHaveCount(0, {timeout});
    }

    /** An Ant Design message toast (success / error / warning) with the given text. */
    toast(text: string | RegExp): Locator {
        return this.page.locator('.ant-message-notice').filter({hasText: text});
    }

    /** An Ant Design notification (e.g. the server-error notice). */
    notification(text?: string | RegExp): Locator {
        const all = this.page.locator('.ant-notification-notice');
        return text ? all.filter({hasText: text}) : all;
    }

    /** Closes every open notification — one left open covers the top-right tools of the next step. */
    async dismissNotifications() {
        const closers = this.page.locator('.ant-notification-notice-close');
        const n = await closers.count();
        for (let i = n - 1; i >= 0; i--) await closers.nth(i).click({timeout: 2000}).catch(() => undefined);
    }

    /** The signed-in user's badge in the header. */
    headerUser(name: string): Locator {
        return this.page.locator('.userIndicator, .ant-card-meta-title').filter({hasText: name}).first();
    }
}
