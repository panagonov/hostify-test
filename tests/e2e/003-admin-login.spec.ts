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
 * Creates: nothing. Needs: 002 green.
 */
test.describe('003 account administrator', () => {
    test('signs in, lands on the Dashboard with the account menu', async ({page, signInAs}, testInfo) => {
        await signInAs('admin');
        await expect(page).toHaveURL(/\/app\/dashboards\/?$/);
        await expect(new Sidebar(page).headerUser(CONFIG.admin.name)).toBeVisible({timeout: 30_000});

        const sidebar = new Sidebar(page);
        const groups = await sidebar.groupIds();
        for (const id of ['dashboards', 'inbox', 'multiCalendar', 'operations', 'reservationsMenu', 'listingsMenu', 'guests', 'reporting', 'pricing', 'ownersMenu', 'finance', 'automations', 'channelManager', 'apps', 'settings'])
            expect(groups, `menu node "${id}"`).toContain(id);
        for (const id of ['platformAdmin', 'platformSettings', 'platformLogs'])
            expect(groups, `no platform node "${id}" for an account administrator`).not.toContain(id);

        expectPresentable(await probePage(page, testInfo, 'dashboard'));
    });
});
