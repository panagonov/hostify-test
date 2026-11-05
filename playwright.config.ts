import {defineConfig, devices} from '@playwright/test';
import {CONFIG} from './tests/helpers/env';

/**
 * Hostify production QA suite — Playwright against the LIVE application (nothing is started here).
 *
 * - ONE worker, no parallelism, no retries: the specs are a numbered chain (001 signs in, 002 makes the QA
 *   account, 003 signs in as its administrator, 1xx fill the pages in dependency order). A later spec relies
 *   on the records an earlier one created; Playwright runs the files in path order, which is the number order.
 * - Every request the browser or the API helper makes carries `x-demo-data: 1`: once the server stamps
 *   `demo: true` on records created under that header, the platform's own "Delete demo data" removes a whole
 *   run (tests/helpers/cleanup.ts). Until then the manifest of created records is the fallback.
 * - Credentials come from `.env` (tests/helpers/env.ts) — never from a spec.
 */
export default defineConfig({
    testDir: './tests/e2e',
    outputDir: 'test-results',
    timeout: 180_000,
    expect: {timeout: 15_000},
    fullyParallel: false,
    workers: 1,
    retries: 0,
    forbidOnly: !!process.env.CI,
    reporter: [
        ['list'],
        ['html', {open: 'never', outputFolder: 'reports/html'}],
        ['./reporters/qaReporter.ts']
    ],
    use: {
        baseURL: CONFIG.baseUrl,
        viewport: {width: 1600, height: 1000},
        locale: 'en-GB',
        timezoneId: 'Europe/Sofia',
        headless: !CONFIG.headed,
        launchOptions: CONFIG.slowMo ? {slowMo: CONFIG.slowMo} : {},
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'off',
        actionTimeout: 20_000,
        navigationTimeout: 60_000,
        extraHTTPHeaders: {'x-demo-data': '1'}
    },
    projects: [
        {name: 'chromium', use: {...devices['Desktop Chrome'], viewport: {width: 1600, height: 1000}}}
    ]
});
