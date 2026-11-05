import {test, expect} from '../helpers/fixtures';
import {LoginPage} from '../helpers/page-objects/LoginPage';
import {Sidebar} from '../helpers/page-objects/Sidebar';
import {superAdminCredentials} from '../helpers/env';
import {probePage, expectPresentable} from '../helpers/probe';

/**
 * 001 — the platform console opens for the super administrator.
 *
 * Proves: the login form stands on every app URL without a session; wrong credentials are refused with an
 * alert; the super administrator signs in through the FORM and lands on the platform dashboard with the platform
 * menu (Platform Admin, Platform Settings, Platform Logs). The screen is probed (untranslated keys, broken layout,
 * contrast) and the console is clean.
 * Creates: nothing. Needs: QA_SUPERADMIN_EMAIL / QA_SUPERADMIN_PASSWORD in .env.
 * Every later spec relies on this one: a platform whose console does not open has nothing else to test.
 */
test.describe('001 super administrator', () => {
    test('a visitor without a session gets the login form on any app URL', async ({page}, testInfo) => {
        const login = new LoginPage(page);
        await login.navigate('/platformAdmin/tenants');
        await expect(login.modal).toBeVisible();
        await expect(login.passwordInput).toBeVisible();
        await expect(login.submitButton).toBeVisible();
        expectPresentable(await probePage(page, testInfo, 'login-form', {expectLogin: true}));
    });

    test('wrong credentials are refused with an alert', async ({page}) => {
        const login = new LoginPage(page);
        await login.navigate();
        const {email} = superAdminCredentials();
        // a password the form's own rule accepts (8+ symbols, capitals and digits), so it reaches the server
        await login.submitInvalid(email, `Wrong#${Date.now()}Pw`);
        await expect(login.alert).toBeVisible();
        await expect(login.modal).toBeVisible();
    });

    test('the super administrator signs in and sees the platform console', async ({page, signInAs}, testInfo) => {
        await signInAs('superAdmin');
        await expect(page).toHaveURL(/\/app\/platformDashboard\/?$/);

        const sidebar = new Sidebar(page);
        const groups = await sidebar.groupIds();
        for (const id of ['platformDashboard', 'platformAdmin', 'platformSettings', 'platformLogs'])
            expect(groups, `menu node "${id}"`).toContain(id);

        expectPresentable(await probePage(page, testInfo, 'platform-dashboard'));

        await sidebar.openGroup('platformAdmin');
        await expect(page).toHaveURL(/\/app\/platformAdmin\/tenants/);
        await expect(sidebar.submenuTitle).toHaveText(/Platform Admin/i, {timeout: 30_000});
        await expect(sidebar.item('tenants')).toBeVisible();
        await expect(sidebar.item('users')).toBeVisible();
        await expect(sidebar.item('securityGroups')).toBeVisible();
    });
});
