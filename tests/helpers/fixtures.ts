import {test as base, expect} from '@playwright/test';
import {ApiHelper} from './api';
import {ConsoleCollector, assertClean} from './console';
import {adminCredentials, superAdminCredentials} from './env';
import {LoginPage} from './page-objects/LoginPage';

/**
 * Shared fixtures — import `test` / `expect` from here, never from @playwright/test.
 *
 * - `qaConsole` (automatic): the browser console, uncaught exceptions and failed / refused API calls of the page are
 *   collected for the whole test, attached as `console.json`, and FAIL the test at its end when something blocking
 *   was said (tests/helpers/console.ts). A journey never ends green over a red console.
 * - `signInAs`: the LOGIN FORM, as a person does it — `superAdmin` or `admin` (the QA account's administrator).
 * - `superAdminApi` / `adminApi`: API sessions for setup and verification (counts, ids, pinning flags).
 */
interface Fixtures {
    qaConsole: ConsoleCollector
    signInAs: (who: 'superAdmin' | 'admin') => Promise<void>
    superAdminApi: ApiHelper
    adminApi: ApiHelper
}

export const test = base.extend<Fixtures>({
    qaConsole: [async ({page}, use, testInfo) => {
        const collector = new ConsoleCollector(page);
        await use(collector);
        collector.dispose();
        await collector.attach(testInfo);
        if (testInfo.status === 'passed' || testInfo.status === testInfo.expectedStatus) assertClean(collector);
    }, {auto: true}],

    signInAs: async ({page}, use) => {
        await use(async who => {
            const {email, password} = who === 'superAdmin' ? superAdminCredentials() : adminCredentials();
            const login = new LoginPage(page);
            await login.navigate();
            await login.login(email, password);
        });
    },

    superAdminApi: async ({}, use) => {
        const {email, password} = superAdminCredentials();
        const api = await ApiHelper.login(email, password);
        await use(api);
        await api.dispose();
    },

    adminApi: async ({}, use) => {
        const {email, password} = adminCredentials();
        const api = await ApiHelper.login(email, password);
        await use(api);
        await api.dispose();
    }
});

export {expect};
