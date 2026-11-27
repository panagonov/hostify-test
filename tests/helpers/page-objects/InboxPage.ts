import {expect, type Locator, type Page} from '@playwright/test';
import {BasePage} from './BasePage';

/**
 * Inbox › Unified inbox (1.0.36): the list, the open conversation and its composer (data-test `unified-inbox`,
 * `inbox-thread-list`, `inbox-conversation`, `inbox-star`, `inbox-assignee`, `inbox-tags`, `inbox-snooze`, `inbox-close`,
 * `inbox-composer`, `composer-text`, `composer-send`, `composer-send-via`, `composer-saved-replies`).
 * NEVER pressed: `composer-ai-suggest`, `composer-ai-command`, `inbox-translate` (the AI assistant — absolute, the QA person,
 * 2026-11-27), `inbox-archive`; a message goes ONLY to our guest, by e-mail, written by hand.
 */
export class InboxPage extends BasePage {
    constructor(page: Page) { super(page); }
    get conversation(): Locator { return this.locator('inbox-conversation'); }
    get text(): Locator { return this.locator('composer-text'); }
    get send(): Locator { return this.locator('composer-send'); }
    get sendVia(): Locator { return this.locator('composer-send-via'); }
    get noteTab(): Locator { return this.locator('composer-tab-note'); }
    get savedReplies(): Locator { return this.locator('composer-saved-replies'); }
    get star(): Locator { return this.locator('inbox-star'); }
    get assignee(): Locator { return this.locator('inbox-assignee'); }
    get tags(): Locator { return this.locator('inbox-tags'); }
    get snooze(): Locator { return this.locator('inbox-snooze'); }
    get close(): Locator { return this.locator('inbox-close'); }
    /** A snoozed (or closed) thread shows „Reopen“ instead of Close (1.0.36). */
    get reopen(): Locator { return this.locator('inbox-reopen').or(this.page.getByRole('button', {name: /Reopen/})).first(); }
    get search(): Locator { return this.locator('inbox-search'); }
    get list(): Locator { return this.locator('inbox-thread-list'); }
    async openThread(id: string) {
        await this.goto(`/inbox/unifiedInbox?thread=${id}`);
        await expect(this.conversation, 'the open conversation').toBeVisible({timeout: 45_000});
    }
    /** A saved reply of the composer's panel („Search saved replies“ — the replies of the thread's listing). */
    savedReply(name: RegExp): Locator {
        return this.page.getByText(name).last();
    }
    /** After a trigger (Tags, the assignee …): the select of its small window, typed into, and the option picked; a plain
     *  menu is picked directly. */
    async pick(term: string, option: RegExp) {
        // wait for what the trigger opens: a small window with a select (Tags), an open select (the assignee) or a menu
        await expect(this.page.locator('[role=tooltip]:visible [role=combobox], .ant-popover:visible [role=combobox], .ant-select-dropdown:visible, .ant-dropdown:visible').first(), 'what the trigger opens').toBeVisible({timeout: 15_000});
        // the select of a small window (Tags) — or a select already open under the trigger (the assignee, 1.0.36)
        if (await this.page.locator('.ant-select-dropdown:visible').count()) {
            await this.page.keyboard.type(term, {delay: 40});
            const o = this.page.locator('.ant-select-dropdown:visible').last().locator('.ant-select-item-option').filter({hasText: option}).first();
            await expect(o, `the option ${option}`).toBeVisible({timeout: 15_000});
            await o.click();
            return;
        }
        const box = this.page.locator('[role=tooltip]:visible [role=combobox], .ant-popover:visible [role=combobox]').first();
        if (await box.isVisible().catch(() => false)) {
            await box.click();
            await this.page.keyboard.type(term, {delay: 40});
            const o = this.page.locator('.ant-select-dropdown:visible').last().locator('.ant-select-item-option').filter({hasText: option}).first();
            await expect(o, `the option ${option}`).toBeVisible({timeout: 15_000});
            await o.click();
            await this.page.keyboard.press('Escape');
            return;
        }
        await this.option(option).click();
    }
    /** An option of the open dropdown / popover menu. */
    option(text: RegExp): Locator {
        return this.page.locator('.ant-dropdown:visible .ant-dropdown-menu-item, .ant-select-dropdown:visible .ant-select-item-option, .ant-popover:visible [role=menuitem], .ant-popover:visible li, .ant-popover:visible button').filter({hasText: text}).first();
    }
}
