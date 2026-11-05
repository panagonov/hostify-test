import {test, expect} from '../helpers/fixtures';
import {Sidebar} from '../helpers/page-objects/Sidebar';
import {GridPage} from '../helpers/page-objects/GridPage';
import {probePage, expectPresentable} from '../helpers/probe';
import {checkCreateForm, checkGridColumns, checkItemTabs} from '../helpers/checks';
import {ApiHelper} from '../helpers/api';
import {usersPassword} from '../helpers/env';
import {USERS_WITHOUT_LISTINGS} from '../fixtures/users';
import {rememberCreated, writeState} from '../helpers/state';

/**
 * 100 — Settings › Users: the people of the QA account, one per role, through the Users form.
 * @qa-description: Settings › Users — по един потребител на роля през формата; всеки влиза с известната парола
 *
 * Proves: the Users page opens for the administrator and is presentable; the Create user form behaves (fields, an
 * empty save refused); a user of every role that needs no listing (manager, revenue manager, booking agent, accountant,
 * team supervisor, housekeeper — the property manager is locked to "Selected listings" and comes with the listings, 2xx) exists — created through the form when missing, with the known password of .env
 * (`QA_USERS_PASSWORD`, else the administrator's); each of them signs in through the API; every column of the grid
 * sorts and filters; the item page of a user opens with its tabs. The users are the suite's own (`QA …`), so later
 * specs sign in as any role (`signInAs('housekeeper')`).
 * Creates: user ×6 (when missing). Needs: 003 green.
 */
const SPEC = '100';
const ENTITY = 'user';
// the property manager needs a listing (the form locks it to "Selected listings"): created after the listings, by a 2xx spec
const ROLES = USERS_WITHOUT_LISTINGS;

test.describe('100 settings › users', () => {
    test.describe.configure({mode: 'serial'});
    test.setTimeout(600_000);

    test('the Users page opens through the menu and the Create form behaves', async ({page, signInAs}, testInfo) => {
        await signInAs('admin');
        const sidebar = new Sidebar(page);
        await sidebar.openGroup('settings');
        await sidebar.openItem(['users']);
        await expect(page).toHaveURL(/\/app\/settings\/users/);
        const grid = new GridPage(page, ENTITY);
        await grid.waitLoaded();
        expectPresentable(await probePage(page, testInfo, 'users'));
        await checkCreateForm(grid, testInfo, 'Create user', {expectRequired: ['name', 'email']});
    });

    test('a user of every role exists — created through the form when missing — and signs in', async ({page, signInAs, adminApi}, testInfo) => {
        await signInAs('admin');
        const grid = new GridPage(page, ENTITY);
        await grid.goto('/settings/users');
        await grid.waitLoaded();
        await grid.clearFilters();
        const password = usersPassword();
        for (const user of ROLES) {
            await test.step(`${user.roleLabel}: ${user.email}`, async () => {
                const existing = (await adminApi.search<any>(ENTITY, {searchTerm: user.email, size: 20})).find(u => u.email === user.email);
                if (!existing) {
                    const form = await grid.openCreate('Create user');
                    await form.fill('name', user.name);
                    await form.fill('email', user.email);
                    // the role is a Search field (a relation to the user roles): reached by its label
                    await form.pickSearch('Role', user.roleLabel, new RegExp(`^${user.roleLabel}$`));
                    await form.formItem('Password').locator('input').first().fill(password);
                    await form.saveAndClose();
                    await grid.dismissNotifications();
                    await grid.search(user.email);
                    await expect(grid.row(user.email)).toBeVisible({timeout: 30_000});
                    await grid.clearFilters();
                }
                const record = (await adminApi.search<any>(ENTITY, {searchTerm: user.email, size: 20})).find(u => u.email === user.email);
                expect(record?.id, `${user.email} is readable through the API`).toBeTruthy();
                rememberCreated(ENTITY, {id: record.id, name: user.name}, SPEC);
                expect(await ApiHelper.canLogin(user.email, password), `${user.roleLabel} signs in with the known password`).toBe(true);
            });
        }
        writeState({usersReadyAt: new Date().toISOString()} as any);
        expectPresentable(await probePage(page, testInfo, 'users-filled'));
    });

    test('every column sorts and filters; the item page of a user opens with its tabs', async ({page, signInAs}, testInfo) => {
        await signInAs('admin');
        const grid = new GridPage(page, ENTITY);
        await grid.goto('/settings/users');
        await checkGridColumns(grid, testInfo, {skipFilter: ['lastLoginAt']});
        await checkItemTabs(grid, grid.row(ROLES[0].email), testInfo);
    });

    test('the account holds exactly the administrator and the six people', async ({adminApi}) => {
        const users = await adminApi.search<any>(ENTITY, {size: 100});
        const emails = users.map(u => u.email);
        for (const user of ROLES) expect(emails, `${user.email} is in the account`).toContain(user.email);
        expect(users.filter(u => String(u.email || '').endsWith('@hostify-qa.test')).length, 'people of the QA account').toBe(ROLES.length + 1);
    });
});
