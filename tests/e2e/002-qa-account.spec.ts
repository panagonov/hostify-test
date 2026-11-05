import {test, expect} from '../helpers/fixtures';
import {TenantsPage, UsersPage} from '../helpers/page-objects/PlatformAdminPages';
import {CONFIG, adminCredentials} from '../helpers/env';
import {cleanupPreviousRun, findTenantByName} from '../helpers/cleanup';
import {writeState} from '../helpers/state';
import {probePage, expectPresentable} from '../helpers/probe';
import {ApiHelper} from '../helpers/api';

/**
 * 002 — the QA account and its administrator exist, and the account is empty.
 * @qa-description: почистване на предишния пуск; акаунт „QA Automation“ и неговият администратор през формите
 *
 * Before anything: the previous run's records are removed (tests/helpers/cleanup.ts) — the platform's own
 * demo-data wipe, then the manifest of created records; the run stops when something stays.
 * Then, through the super administrator's FORMS: the account "QA Automation" (found by NAME — created once, its id
 * is stable from then on and cached in .qa/state.json) and its administrator with the KNOWN password of .env
 * (created when missing). Both are pinned `demo: false` through the API — survivors of the demo-data wipe — and the
 * account is flagged as the demo/test account.
 * Counts at the end: exactly one account with that name, exactly one user with that e-mail.
 * Creates: tenant ×1, user ×1 (both permanent). Needs: 001 green; QA_ADMIN_PASSWORD in .env.
 */
test.describe('002 QA account', () => {
    test.describe.configure({mode: 'serial'});
    test.setTimeout(420_000);

    test.beforeAll(async () => {
        await cleanupPreviousRun();
    });

    test('the account "QA Automation" exists — created through the Accounts form when missing', async ({page, signInAs, superAdminApi}, testInfo) => {
        await signInAs('superAdmin');
        const tenants = new TenantsPage(page);
        await tenants.navigate();
        await tenants.clearFilters();
        expectPresentable(await probePage(page, testInfo, 'platform-admin-accounts'));

        const existing = await findTenantByName(superAdminApi, CONFIG.tenant.name);
        if (!existing) {
            await test.step('create the account through the form', async () => {
                const form = await tenants.openCreateForm();
                await form.fill('name', CONFIG.tenant.name);
                await form.pickSelect('accountType', CONFIG.tenant.accountType);
                await form.fill('accountEmail', CONFIG.tenant.accountEmail);
                await form.pickSelect('currency', CONFIG.tenant.currency);
                await form.pickSelect('timezone', CONFIG.tenant.timezone);
                // "region" sits on the Platform tab; it is required on create
                await form.openTab('platform');
                await form.pickSelect('region', /^EU$|Europe/i);
                expectPresentable(await probePage(page, testInfo, 'tenant-form-platform-tab'));
                await form.saveAndClose();
            });
            await tenants.dismissNotifications();
        }

        await test.step('the account is in the grid', async () => {
            await tenants.search(CONFIG.tenant.name);
            await expect(tenants.row(CONFIG.tenant.name)).toBeVisible({timeout: 30_000});
        });

        await test.step('exactly one account carries the name; it is flagged demo and pinned as a survivor', async () => {
            const rows = (await superAdminApi.search<any>('tenant', {name: CONFIG.tenant.name, size: 20})).filter(t => t.name === CONFIG.tenant.name);
            expect(rows, 'accounts named like the QA account').toHaveLength(1);
            const tenant = rows[0];
            // `demo: false` keeps the account out of its own demo-data wipe; the flag the suite recognises it by is its NAME
            if (tenant.demo !== false) await superAdminApi.must('PUT', '/tenant', {id: tenant.id, demo: false});
            writeState({tenantId: tenant.id, tenantName: tenant.name, createdAt: tenant.date_created});
        });

        await test.step('the account is marked as the platform\'s QA account (never suspended, never charged) — a NORMAL account otherwise', async () => {
            // tenant.qaAccount (build-config 1.0.66): billing never suspends or charges it, so the specs switch its plans and
            // features freely. A platform field: set through the API as the super administrator (setup, like the demo pin).
            // Until the build that carries the field is deployed the server refuses the property — recorded, not hidden.
            const tenant = (await superAdminApi.search<any>('tenant', {name: CONFIG.tenant.name, size: 20})).find(t => t.name === CONFIG.tenant.name);
            if (tenant?.qaAccount !== true) {
                const answer = await superAdminApi.put('/tenant', {id: tenant.id, qaAccount: true});
                await testInfo.attach('qa-account-mark.json', {body: JSON.stringify({success: answer.success, message: answer.message || null, status: answer.status}), contentType: 'application/json'});
                if (!answer.success) console.log(`[002] the qaAccount mark is not accepted yet (${answer.message || answer.status}) — the build with tenant.qaAccount is not deployed; the account is an ordinary Trial until then`);
            }
            // no plan, no feature is forced here: the account stays as the platform made it — the variants are the tests' job
        });
    });

    test('the administrator of the account exists — created through the Users form when missing', async ({page, signInAs, superAdminApi}, testInfo) => {
        const admin = adminCredentials();
        const tenant = await findTenantByName(superAdminApi, CONFIG.tenant.name);
        expect(tenant, 'the QA account (made by the previous test)').toBeTruthy();

        await signInAs('superAdmin');
        const users = new UsersPage(page);
        await users.navigate();
        await users.clearFilters();
        expectPresentable(await probePage(page, testInfo, 'platform-admin-users'));

        // `searchTerm` is the free-text search of every entity; `email` is not a filter of user/search
        const found = (await superAdminApi.search<any>('user', {searchTerm: admin.email, size: 20})).filter(u => u.email === admin.email);
        if (!found.length) {
            await test.step('create the administrator through the form', async () => {
                const form = await users.openCreateForm();
                await form.pickSearch('Account', CONFIG.tenant.name, CONFIG.tenant.name);
                await form.fill('name', CONFIG.admin.name);
                await form.fill('email', admin.email);
                // the role is a Search field (a relation to the user roles): reached by its label, no data-test yet
                await form.pickSearch('Role', 'Admin', /^Admin(istrator)?$/);
                await form.password.fill(admin.password);
                expectPresentable(await probePage(page, testInfo, 'user-form'));
                await form.saveAndClose();
            });
            await users.dismissNotifications();
        } else if (!(await ApiHelper.canLogin(admin.email, admin.password))) {
            throw new Error(`the administrator ${admin.email} exists but QA_ADMIN_PASSWORD does not open it — set the password in .env to the known one, or delete the user in Platform Admin ▸ Users and run again`);
        }

        await test.step('the administrator is in the grid', async () => {
            await users.search(admin.email);
            await expect(users.row(admin.email)).toBeVisible({timeout: 30_000});
        });

        await test.step('exactly one user carries the e-mail, in the QA account, pinned as a survivor; the password opens it', async () => {
            const rows = (await superAdminApi.search<any>('user', {searchTerm: admin.email, size: 20})).filter(u => u.email === admin.email);
            expect(rows, 'users with the administrator e-mail').toHaveLength(1);
            const user = rows[0];
            expect(user.tenant?.id || user.tenant, 'the administrator belongs to the QA account').toBe(tenant!.id);
            if (user.demo !== false) await superAdminApi.must('PUT', '/user', {id: user.id, demo: false});
            writeState({adminUserId: user.id, adminEmail: admin.email});
            expect(await ApiHelper.canLogin(admin.email, admin.password), 'the known password signs the administrator in').toBe(true);
        });
    });
});
