import {test, expect} from '../helpers/fixtures';
import {Sidebar} from '../helpers/page-objects/Sidebar';
import {CONFIG} from '../helpers/env';
import {probePage, expectPresentable} from '../helpers/probe';

/**
 * 003 — the QA account's administrator signs in and sees the account's menu.
 * @qa-description: вход на администратора на QA акаунта и менюто му
 *
 * Proves: the login form accepts the known password (002), the administrator lands on the Dashboard, the header
 * shows their name, the left menu holds every group an account administrator gets (the navigation inventory,
 * inventory/navigation.json, is the source of the expected list), and nothing of the platform console shows.
 * Creates: nothing. Needs: 002 green. (The booking agent's menu without the home icon: 101, after 100.)
 */
test.describe('003 account administrator', () => {
    test('signs in, lands on the Dashboard with the account menu', async ({page, signInAs}, testInfo) => {
        await signInAs('admin');
        await expect(page).toHaveURL(/\/app\/dashboards\/?$/);
        await expect(new Sidebar(page).headerUser(CONFIG.admin.name)).toBeVisible({timeout: 30_000});

        const sidebar = new Sidebar(page);
        const groups = await sidebar.groupIds();
        // 1.0.25: the first icon (the home page, `dashboards`) left the menu — the logo opens it; the landing stays
        for (const id of ['inbox', 'multiCalendar', 'operations', 'reservationsMenu', 'listingsMenu', 'guests', 'reporting', 'pricing', 'ownersMenu', 'finance', 'automations', 'channelManager', 'apps', 'settings'])
            expect(groups, `menu node "${id}"`).toContain(id);
        for (const id of ['platformAdmin', 'platformSettings', 'platformLogs'])
            expect(groups, `no platform node "${id}" for an account administrator`).not.toContain(id);
        // scenario 28 (1.0.25): no home icon on the menu, it starts with the Inbox; the logo opens the Dashboard
        expect(groups, 'the first icon (the home page) is gone from the menu (1.0.25)').not.toContain('dashboards');
        expect(groups[0], 'the menu starts with the Inbox (1.0.25)').toBe('inbox');

        expectPresentable(await probePage(page, testInfo, 'dashboard'));

        await sidebar.openGroup('settings');
        await sidebar.openItem(['listingTags']);
        await expect(page, 'another page is open before the logo is clicked').toHaveURL(/\/app\/settings\/listingTags/, {timeout: 30_000});
        await sidebar.logo.click();
        await expect(page, 'the logo opens the Dashboard (1.0.25)').toHaveURL(/\/app\/dashboards\/?$/, {timeout: 30_000});
    });
});
