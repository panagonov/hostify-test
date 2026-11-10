import {test, expect} from '../helpers/fixtures';
import {Sidebar} from '../helpers/page-objects/Sidebar';
import {GridPage} from '../helpers/page-objects/GridPage';
import {TenantsPage} from '../helpers/page-objects/PlatformAdminPages';
import {probePage, expectPresentable} from '../helpers/probe';
import {checkGridLayout, checkItemTabs} from '../helpers/checks';
import {activeTenant} from '../helpers/env';
import {USERS_WITHOUT_LISTINGS, QA_INVITED_USER} from '../fixtures/users';

/**
 * 105 — Platform Admin › Accounts › QA Automation › Users: the account's people (1.0.7).
 * @qa-description: Platform Admin › Accounts › QA Automation — табът Users показва точно хората на акаунта
 *
 * Proves: the super administrator finds the QA account in Platform Admin › Accounts, its record page looks like a
 * record page and every tab of it opens (1.0.10); its Users tab is a grid that keeps its columns in its layout and
 * holds exactly the account's people — the administrator, the six people of 100 and the invited one — each with the
 * role and the status of 100, as many as the account has by the API, and no one of another account; the grid sorts by
 * Name both ways (Email has no sorter).
 * ONLY the QA account is looked at: the accounts grid is searched for its name and only its row is opened; a person of
 * another account found in the tab is reported by COUNT, never by name or e-mail. Nothing is pressed but tabs, sorters
 * and the search: no Create, no edit, no delete, no Impersonate.
 * Creates: nothing. Needs: 100 (the people and the invited one).
 */
const QA_DOMAIN = '@hostify-qa.test';

test.describe('105 platform › account › users', () => {
    test.setTimeout(400_000);

    test('the QA account\'s record page has a Users tab with exactly its people', async ({page, signInAs, superAdminApi, adminApi}, testInfo) => {
        const account = activeTenant();
        const people = [
            {email: account.adminEmail, role: 'Admin', status: 'Active'},
            ...USERS_WITHOUT_LISTINGS.map(u => ({email: account.userEmail(u.email), role: u.roleLabel, status: 'Active'})),
            {email: account.userEmail(QA_INVITED_USER.email), role: QA_INVITED_USER.roleLabel, status: 'Invited'}
        ];
        const tenantId = (await superAdminApi.search<any>('tenant', {searchTerm: account.name, size: 20})).find(t => t.name === account.name)?.id;
        expect(tenantId, `the account "${account.name}" is readable through the API`).toBeTruthy();

        await signInAs('superAdmin');
        const sidebar = new Sidebar(page);
        await sidebar.openGroup('platformAdmin');
        await sidebar.openItem(['tenants']);
        const tenants = new TenantsPage(page);
        await tenants.waitLoaded();
        try {
            await tenants.search(account.name);
            const row = tenants.rowWhere('name', account.name);
            await expect(row, `the row of "${account.name}"`).toBeVisible({timeout: 30_000});
            // the record page's look and every tab of it (scenario 6), then back to the accounts
            const tabs = await checkItemTabs(tenants, row, testInfo, 'item-tenant');
            expect(tabs, 'the account\'s record page has a Users tab').toContain('users');

            // back on the accounts the box still holds the name: `search` sees it and asks nothing more
            await tenants.search(account.name);
            const item = await tenants.openItem(tenants.rowWhere('name', account.name));
            await expect(page, 'the record page is the QA account\'s').toHaveURL(new RegExp(`/app/platformAdmin/tenants/${tenantId}/`));
            await item.openTab('users');
            const users = new GridPage(page, 'user');
            await users.waitLoaded();
            // the tab's view remembers the last search typed in it (the grid stores it in the person's active view): the
            // super administrator's view of this tab held "QA Automation" (QA-90, 2026-11-10). A search text lists by
            // relevance and leaves the sorters aside — by design — and may hide people, so the tab is judged without one
            await users.clearFilters();
            expectPresentable(await probePage(page, testInfo, 'tenant-users'));
            await checkGridLayout(users);

            const emails = await users.cellTexts('email');
            // never a name or an address of another account in the report: only how many
            expect(emails.filter(e => !e.endsWith(QA_DOMAIN)).length, 'people of another account in the QA account\'s Users tab (their number only)').toBe(0);
            expect([...emails].sort(), 'the tab holds exactly the administrator, the six people of 100 and the invited one').toEqual(people.map(p => p.email).sort());
            expect(await users.total(), 'the total of the tab').toBe(people.length);
            expect((await adminApi.search<any>('user', {size: 100})).length, 'as many people as the account has by the API').toBe(emails.length);

            const roles = await users.cellTexts('role');
            const statuses = await users.cellTexts('userStatus');
            for (const person of people) {
                const i = emails.indexOf(person.email);
                expect.soft(roles[i], `${person.email}: the role`).toBe(person.role);
                expect.soft(statuses[i], `${person.email}: the status`).toBe(person.status);
            }

            // Email has no sorter (here and in Settings › Users, 2026-11-10): the tab sorts by Name
            for (const key of ['name']) {
                for (const direction of ['ascend', 'descend'] as const) {
                    await test.step(`sort by ${key} ${direction}`, async () => {
                        await users.sortBy(key, direction);
                        const values = await users.cellTexts(key);
                        expect.soft(() => GridPage.expectOrdered(values, direction, key), `the tab sorts by ${key} ${direction} — the order: ${values.join(' / ')}`).not.toThrow();
                        expect([...await users.cellTexts('email')].sort(), 'the same people after sorting').toEqual(people.map(p => p.email).sort());
                    });
                }
            }
            // the grid's own order (by name, ascending) back
            await users.sortBy('name', 'ascend');
        } finally {
            // the search goes, then the page ends on the QA account itself: the list of every account is not what the
            // report's last screenshot shows
            await tenants.navigate();
            await tenants.clearFilters();
            await tenants.goto(`/platformAdmin/tenants/${tenantId}/info`);
        }
    });
});
