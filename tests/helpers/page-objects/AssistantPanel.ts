import {expect, type Locator, type Page} from '@playwright/test';
import {BasePage} from './BasePage';

/**
 * The assistant: the panel on the right (`assistant-panel`) that „Support“ of the left menu opens since 1.0.7
 * (`navbarSupport`, in the menu's foot above Notifications) — the separate support messenger is gone.
 *
 * The tests here only OPEN and LOOK: nothing is typed into the composer and nothing is sent (no AI call, no question
 * reaches a person of support). The close button has no `data-test` yet — a gap (docs/selectors.md), the fallback is
 * the panel's button with the close icon.
 */
export class AssistantPanel extends BasePage {
    readonly supportButton: Locator;
    readonly panel: Locator;

    constructor(page: Page) {
        super(page);
        this.supportButton = page.locator('[data-test="navbarSupport"]');
        this.panel = page.locator('[data-test="assistant-panel"]');
    }

    get composer(): Locator {
        return this.panel.locator('[data-test="assistant-composer-input"]');
    }

    get newConversationButton(): Locator {
        return this.panel.locator('[data-test="assistant-new-conversation"]');
    }

    get historyButton(): Locator {
        return this.panel.locator('[data-test="assistant-history"]');
    }

    /** The send button (no `data-test` — fallback: the button with the send icon); disabled while the composer is empty. */
    get sendButton(): Locator {
        return this.panel.locator('[data-test="assistant-send"]').or(this.panel.locator('button').filter({has: this.page.locator('[data-icon="send"]')})).first();
    }

    /** The close button (no `data-test` — fallback: the button with the close icon). */
    get closeButton(): Locator {
        return this.panel.locator('[data-test="assistant-close"]').or(this.panel.locator('button').filter({has: this.page.locator('[data-icon="close"]')})).first();
    }

    /**
     * What is left of the old support messenger (before 1.0.7: a separate panel of its own). Nothing of it may be on the
     * page, not even hidden: an element whose `data-test`, class or id names a messenger or a support chat.
     */
    get oldMessenger(): Locator {
        return this.page.locator('[data-test*="messenger" i], [class*="messenger" i], [id*="messenger" i], [data-test*="support-chat" i], [class*="support-chat" i], [class*="supportChat"]');
    }

    /** Opens the assistant through „Support“ of the left menu. */
    async openThroughSupport() {
        await expect(this.supportButton, '„Support“ in the foot of the left menu').toBeVisible({timeout: 30_000});
        await this.supportButton.click();
        await expect(this.panel, 'the assistant opens').toBeVisible({timeout: 15_000});
    }

    async close() {
        await this.closeButton.click();
        await expect(this.panel, 'the assistant closes').toBeHidden({timeout: 10_000});
    }
}
