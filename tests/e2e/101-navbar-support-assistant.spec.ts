import {test, expect} from '../helpers/fixtures';
import {AssistantPanel} from '../helpers/page-objects/AssistantPanel';
import {GridPage} from '../helpers/page-objects/GridPage';
import {probePage, expectPresentable} from '../helpers/probe';
import type {SignInWho} from '../helpers/fixtures';
import type {Page} from '@playwright/test';

/**
 * 101 — „Support“ of the left menu opens the assistant (1.0.7: the separate support messenger is gone).
 * @qa-description: Support в лявото меню отваря асистента (не стария месинджър) — за администратора и за booking agent
 *
 * Proves: „Support“ stands in the foot of the left menu; a click opens the assistant's panel on the page the person is
 * on (the address does not change); the panel is presentable, its composer and its buttons are there and its send
 * button is disabled while nothing is typed; nothing of the old support messenger is on the page, not even hidden;
 * the panel's close button closes it; „Support“ opens it again on another page; a booking agent (spec 100) gets the
 * same. Nothing is typed into the assistant and nothing is sent: no AI call, no question reaches a person of support.
 * Numbered after 100 (not in the 010–099 block of the cross-cutting journeys) because it signs in as a person of 100.
 * Creates: nothing. Needs: 003 green (the administrator); 100 (the booking agent).
 */
const looksAt = async (page: Page, who: SignInWho, testInfo: any) => {
    const assistant = new AssistantPanel(page);
    await expect(assistant.panel, 'the assistant is closed before „Support“ is clicked').toBeHidden();
    const before = page.url();
    await assistant.openThroughSupport();
    await expect(page, 'the address stays the same: the assistant opens over the page').toHaveURL(before);
    await expect(assistant.composer, 'the composer of the assistant').toBeVisible();
    await expect(assistant.newConversationButton, 'the button for a new conversation').toBeVisible();
    await expect(assistant.historyButton, 'the button of the history').toBeVisible();
    await expect(assistant.sendButton, 'the send button is disabled while nothing is typed (nothing is sent)').toBeDisabled();
    await expect(assistant.oldMessenger, 'nothing of the old support messenger is on the page').toHaveCount(0);
    expectPresentable(await probePage(page, testInfo, `assistant-${who}`));
    await assistant.close();
    return assistant;
};

test.describe('101 navbar › support opens the assistant', () => {
    test('the administrator: „Support“ opens the assistant on the Dashboard and on another page', async ({page, signInAs}, testInfo) => {
        await signInAs('admin');
        await looksAt(page, 'admin', testInfo);
        await test.step('another page: Settings › Listing tags — „Support“ opens the assistant there too', async () => {
            const grid = new GridPage(page, 'listingTag');
            await grid.goto('/settings/listingTags');
            await grid.waitLoaded();
            const assistant = new AssistantPanel(page);
            await assistant.openThroughSupport();
            await expect(page).toHaveURL(/\/app\/settings\/listingTags/);
            await expect(assistant.oldMessenger, 'nothing of the old support messenger on this page either').toHaveCount(0);
            await assistant.close();
        });
    });

    test('a booking agent: „Support“ opens the assistant', async ({page, signInAs}, testInfo) => {
        await signInAs('bookingAgent');
        await looksAt(page, 'bookingAgent', testInfo);
    });
});
