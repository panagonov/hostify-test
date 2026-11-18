import {test, expect} from '../helpers/fixtures';
import {credentialsOf} from '../helpers/fixtures';
import {GridPage} from '../helpers/page-objects/GridPage';
import {ItemPage} from '../helpers/page-objects/ItemPage';
import {LoginPage} from '../helpers/page-objects/LoginPage';
import {UsersPage} from '../helpers/page-objects/PlatformAdminPages';
import {TelemetryTab} from '../helpers/page-objects/TelemetryTab';
import {ThemeSwitch} from '../helpers/page-objects/ThemeSwitch';
import {probePage, expectPresentable} from '../helpers/probe';
import {activeTenant} from '../helpers/env';
import {QA_USERS} from '../fixtures/users';
import type {ApiHelper} from '../helpers/api';
import type {Page, TestInfo} from '@playwright/test';

/**
 * 111 — a person's Telemetry: what the person did, the time on the person's own device, the dark theme (1.0.7–1.0.10).
 * @qa-description: Telemetry на човек — какво е направил (таговете на 110), часът на устройството му, тъмната тема
 *
 * Proves: the Telemetry tab of the account's administrator (Settings › Users › QA Admin) shows its cards and lists in
 * Changes the creation of the three tags of 110, at the time 110 created them; the detail of such a change opens; the
 * periods Last 7 days and All time keep them. A booking agent who signs in from a browser in Pacific/Auckland gets a
 * session named with the time of Auckland (1.0.9: the device's clock, not UTC). In the dark theme the Changes card and
 * table are dark and readable (1.0.10); the theme goes back to light at the end, ALWAYS — it is the person's setting,
 * saved on the server. The super administrator sees the same Changes through Platform Admin › Users.
 * The 1.0.7 notes promise an "Activity" tab with what the person did; the page has Info, Telemetry and Audit log, and
 * that content is in Telemetry. A QUESTION for the developers (the QA person, 2026-11-10), not a failing check: the
 * tabs are recorded in the report. A session whose device zone is unknown (the zone taken out of the telemetry call) is
 * named with the UTC time and says "UTC" (1.0.9). Edit and Export of the dashboard are never pressed.
 * Creates: nothing (the booking agent's sign-in writes a session of its telemetry). Needs: 100 (the booking agent),
 * 110 (the three tags, created by the administrator).
 */
const TAG_NAMES = ['QA Tag Sea view', 'QA Tag Pet friendly', 'QA Tag Retired'];
const AUCKLAND = 'Pacific/Auckland';
/**
 * How long a new session may take to reach Telemetry › Sessions. 1.0.20 (2026-11-17): both sessions of 111 were named
 * right on the server (the Auckland clock, "… UTC") but came after more than the 2 minutes the test waited (QA-390,
 * QA-440 — a defect of the test, scenario 20). The time it took is recorded in the report.
 */
const SESSION_WAIT = 600_000;
/** The telemetry the server ACCEPTED (`POST /userEvent/collect` → 200, `accepted` > 0): counted on a context. */
const acceptedTelemetry = (context: import('@playwright/test').BrowserContext) => {
    const seen = {accepted: 0};
    context.on('response', async res => {
        if (!res.url().includes('/api/userEvent/collect') || res.status() !== 200) return;
        const body = await res.json().catch(() => null);
        seen.accepted += Number(body?.data?.accepted) || 0;
    });
    return seen;
};

/** The person's page › Telemetry, from a users grid; the tabs are recorded (the Activity question). */
const openTelemetry = async (page: Page, grid: GridPage, email: string, testInfo: TestInfo): Promise<TelemetryTab> => {
    const item: ItemPage = await grid.openItem(grid.rowWhere('email', email));
    await expect(item.tab('telemetry'), 'the person\'s page has a Telemetry tab').toBeVisible({timeout: 30_000});
    const tabs = await item.tabNames();
    testInfo.annotations.push({type: 'question', description: `tabs of ${email}: ${tabs.join(', ')} — the 1.0.7 "Activity" tab is not among them; its content is in Telemetry (merged?)`});
    await item.openTab('telemetry');
    const telemetry = new TelemetryTab(page);
    await telemetry.waitLoaded();
    return telemetry;
};

/** The three tags of 110 are among the Changes, as created, at the minute 110 created them (± 2). */
const expectTagsInChanges = async (telemetry: TelemetryTab, api: ApiHelper) => {
    const tags = (await api.search<any>('listingTag', {searchTerm: 'QA Tag', size: 20})).filter(t => TAG_NAMES.includes(t.name));
    expect(tags.map(t => t.name).sort(), 'the three tags of 110 exist (spec 110 ran before)').toEqual([...TAG_NAMES].sort());
    const entries = await telemetry.changeEntries();
    for (const tag of tags) {
        const created = new Date(tag.date_created).getTime();
        const hit = entries.find(e => e.what === 'Create' && e.kind === 'Listing tag' && e.record === tag.name
            && Math.abs((TelemetryTab.timeOf(e.when) ?? 0) - created) <= 120_000);
        expect.soft(hit, `Changes lists "Create · Listing tag · ${tag.name}" at ${new Date(created).toLocaleString()} — the rows: ${entries.slice(0, 10).map(e => `${e.when} ${e.what} ${e.kind} ${e.record}`).join(' / ')}`).toBeTruthy();
    }
};

test.describe('111 user › telemetry', () => {
    test.setTimeout(300_000);
    // not serial: every part is its own verdict

    test('the administrator\'s Telemetry lists the three tags of 110 among its Changes', async ({page, signInAs, adminApi}, testInfo) => {
        await signInAs('admin');
        const grid = new GridPage(page, 'user');
        await grid.goto('/settings/users');
        await grid.waitLoaded();
        await grid.clearFilters();
        const telemetry = await openTelemetry(page, grid, activeTenant().adminEmail, testInfo);
        for (const card of ['Actions', 'Records opened', 'Changes', 'Searches', 'Errors', 'Sessions'])
            await expect.soft(telemetry.card(card), `the card "${card}"`).toBeVisible();
        // the period the person left last time stays (seen 2026-11-10: All time after a run that ended on Last 30 days)
        const found = await telemetry.period('Last 30 days').getAttribute('class');
        testInfo.annotations.push({type: 'period', description: `Last 30 days active on arrival: ${/active/.test(found || '')}`});
        await telemetry.pickPeriod('Last 30 days');
        expectPresentable(await probePage(page, testInfo, 'telemetry-admin'));
        await expectTagsInChanges(telemetry, adminApi);

        await test.step('the detail of a change opens over the page (the tag\'s values), the address stays', async () => {
            const before = page.url();
            await telemetry.openChangeDetail(telemetry.changeRow(TAG_NAMES[0]));
            await expect(telemetry.changeDetail, 'the detail names the tag').toContainText(TAG_NAMES[0]);
            await expect(page).toHaveURL(before);
            await telemetry.closeChangeDetail();
        });

        try {
            for (const period of ['Last 7 days', 'All time']) {
                await test.step(`the period ${period} keeps the tags`, async () => {
                    await telemetry.pickPeriod(period);
                    await expect(telemetry.card('Changes')).toBeVisible();
                    await expectTagsInChanges(telemetry, adminApi);
                });
            }
        } finally {
            await telemetry.pickPeriod('Last 30 days');
        }
    });

    test('a person\'s session is named with the time of their own device (Pacific/Auckland), not UTC', async ({browser, page, signInAs}, testInfo) => {
        test.setTimeout(SESSION_WAIT + 300_000);
        const agent = credentialsOf('bookingAgent');
        let signedInAt = new Date();
        await test.step(`the booking agent signs in from a browser in ${AUCKLAND}`, async () => {
            const context = await browser.newContext({baseURL: testInfo.project.use.baseURL, viewport: testInfo.project.use.viewport, timezoneId: AUCKLAND});
            const telemetrySent = acceptedTelemetry(context);
            try {
                const away = await context.newPage();
                const login = new LoginPage(away);
                await login.navigate();
                signedInAt = new Date();
                await login.login(agent.email, agent.password);
                expect(await away.evaluate(() => Intl.DateTimeFormat().resolvedOptions().timeZone), 'the browser\'s clock is Auckland').toBe(AUCKLAND);
                // the browser stays until the server has ACCEPTED telemetry of the session (QA-440: closed 4 s after the
                // sign-in, its only batch never got an answer)
                await expect.poll(() => telemetrySent.accepted, {message: 'the server accepted telemetry of the Auckland session', timeout: 60_000, intervals: [1_000]}).toBeGreaterThan(0);
            } finally {
                await context.close();
            }
        });
        const expected = TelemetryTab.clockIn(signedInAt, AUCKLAND);
        const utc = TelemetryTab.clockIn(signedInAt, 'UTC');
        await signInAs('admin');
        const grid = new GridPage(page, 'user');
        await grid.goto('/settings/users');
        await grid.waitLoaded();
        await grid.clearFilters();
        let telemetry = await openTelemetry(page, grid, activeTenant().userEmail(QA_USERS.bookingAgent.email), testInfo);
        const fmt = (minutes: number) => new Date(minutes * 60_000).toISOString().slice(0, 16).replace('T', ' ');
        let names: string[] = [];
        let found = '';
        const waitFrom = Date.now();
        // the session reaches Telemetry within minutes (scenario 20): the tab is reopened until it is there, looked for
        // in the whole list — another session of the same minutes does not hide it
        await expect.poll(async () => {
            names = await telemetry.sessionNames();
            found = names.find(n => { const c = TelemetryTab.sessionClock(n); return c !== null && Math.abs(c - expected) <= 2; }) || '';
            if (found) return 'Auckland';
            await page.reload();
            telemetry = new TelemetryTab(page);
            await telemetry.waitLoaded();
            return `not yet — the newest: ${names.slice(0, 3).join(' / ')}`;
        }, {message: `a session named with the time of Auckland (${fmt(expected)}), not UTC (${fmt(utc)}), within ${SESSION_WAIT / 60_000} min`, timeout: SESSION_WAIT, intervals: [5_000, 10_000, 15_000, 30_000]}).toBe('Auckland');
        testInfo.annotations.push({type: 'session', description: `${found} — Auckland ${fmt(expected)}, UTC ${fmt(utc)}; in Telemetry after ${Math.round((Date.now() - waitFrom) / 1000)} s`});
    });

    // 1.0.9: "… and says "UTC" when the device's time zone is unknown" — a browser always knows its zone, so the test
    // takes it out of the call the client sends its telemetry with (`context.device.timezone` of POST /userEvent/collect);
    // the server is the real one: its naming of a session without a zone is what is checked
    test('a session whose device time zone is unknown is named with the UTC time and says "UTC"', async ({browser, page, signInAs}, testInfo) => {
        test.setTimeout(SESSION_WAIT + 300_000);
        const agent = credentialsOf('bookingAgent');
        let signedInAt = new Date();
        let stripped = 0;
        await test.step('the booking agent signs in; the zone of the device does not reach the server', async () => {
            const context = await browser.newContext({baseURL: testInfo.project.use.baseURL, viewport: testInfo.project.use.viewport});
            try {
                await context.route('**/api/userEvent/collect', async route => {
                    const body = JSON.parse(route.request().postData() || '{}');
                    if (body?.context?.device && 'timezone' in body.context.device) {
                        delete body.context.device.timezone;
                        stripped++;
                    }
                    await route.continue({postData: JSON.stringify(body)});
                });
                const away = await context.newPage();
                const login = new LoginPage(away);
                await login.navigate();
                signedInAt = new Date();
                await login.login(agent.email, agent.password);
                // QA-390: the client sends its context (with the zone) with the FIRST batch of each start of the page —
                // the sign-in reloads the document once, so the page that stays sends it again with its first batch, on
                // its 10-second timer. Closing the context earlier (it waited 3 s) let that batch leave in the closing
                // flush, which the route does not see: the server got the zone and named the session on it. The page
                // stays until a batch of the page that stays has gone through the route without its zone.
                const strippedBefore = stripped;
                await expect.poll(() => stripped, {message: 'a batch of the page after the sign-in left without its zone', timeout: 30_000, intervals: [1_000]}).toBeGreaterThan(strippedBefore);
            } finally {
                await context.close();
            }
            expect(stripped, 'the telemetry left the browser without its zone').toBeGreaterThan(0);
        });
        const utc = TelemetryTab.clockIn(signedInAt, 'UTC');
        const fmt = (minutes: number) => new Date(minutes * 60_000).toISOString().slice(0, 16).replace('T', ' ');
        await signInAs('admin');
        const grid = new GridPage(page, 'user');
        await grid.goto('/settings/users');
        await grid.waitLoaded();
        await grid.clearFilters();
        let telemetry = await openTelemetry(page, grid, activeTenant().userEmail(QA_USERS.bookingAgent.email), testInfo);
        let newest = '';
        const waitFrom = Date.now();
        // up to 10 minutes (scenario 20), the session looked for in the whole list: the one with the UTC clock of the sign-in
        await expect.poll(async () => {
            const names = await telemetry.sessionNames();
            newest = names.find(n => { const c = TelemetryTab.sessionClock(n.replace(/\s*UTC\s*$/, '')); return c !== null && Math.abs(c - utc) <= 2; }) || '';
            if (newest) return newest;
            await page.reload();
            telemetry = new TelemetryTab(page);
            await telemetry.waitLoaded();
            return `not yet — the newest: ${names.slice(0, 3).join(' / ')}`;
        }, {message: `a session signed in at ${fmt(utc)} UTC, within ${SESSION_WAIT / 60_000} min`, timeout: SESSION_WAIT, intervals: [5_000, 10_000, 15_000, 30_000]}).not.toMatch(/^not yet/);
        expect(newest, `the session without a zone says "UTC" (${fmt(utc)} UTC)`).toMatch(/\bUTC\s*$/);
        testInfo.annotations.push({type: 'session', description: `${newest} — signed in at ${fmt(utc)} UTC; in Telemetry after ${Math.round((Date.now() - waitFrom) / 1000)} s`});
    });

    test('in the dark theme the Changes card and table are dark and readable; the theme goes back to light', async ({page, signInAs}, testInfo) => {
        const admin = credentialsOf('admin');
        await signInAs('admin');
        const theme = new ThemeSwitch(page);
        // the start is light, on the page and for the person (a run that broke before its cleanup may have left dark)
        await theme.ensureLight();
        if ((await ThemeSwitch.savedTheme(admin)) === 'dark') await ThemeSwitch.restoreLightByApi(admin);
        const grid = new GridPage(page, 'user');
        await grid.goto('/settings/users');
        await grid.waitLoaded();
        await grid.clearFilters();
        const telemetry = await openTelemetry(page, grid, activeTenant().adminEmail, testInfo);
        const lightChanges = await TelemetryTab.background(telemetry.widget('Changes'));
        let saved = '';
        try {
            await theme.toDark();
            await telemetry.waitLoaded();
            const table = await TelemetryTab.background(telemetry.widget('Changes'));
            const card = await TelemetryTab.background(telemetry.cardWidget('Changes'));
            const other = await TelemetryTab.background(telemetry.widget('Sessions'));
            testInfo.annotations.push({type: 'dark-theme', description: `Changes table ${table}, Changes card ${card}, Sessions ${other} (light: ${lightChanges})`});
            expect.soft(ThemeSwitch.luminance(table), `the Changes table is dark (${table}), not left white`).toBeLessThan(0.2);
            expect.soft(ThemeSwitch.luminance(card), `the Changes card is dark (${card})`).toBeLessThan(0.2);
            expect.soft(table, 'the Changes table has the background of the other widgets').toBe(other);
            expect.soft(card, 'the Changes card has the background of the other widgets').toBe(other);
            // the probe measures the contrast of every text: the dark Changes must stay readable
            expectPresentable(await probePage(page, testInfo, 'telemetry-dark'));
        } finally {
            // ALWAYS back to light: by the button as a person does it, then — when the server did not keep it — the
            // cleanup through the API, so the administrator never stays dark
            await theme.ensureLight();
            await page.waitForTimeout(3_000);
            saved = await ThemeSwitch.savedTheme(admin);
            if (saved === 'dark') await ThemeSwitch.restoreLightByApi(admin);
        }
        expect(await ThemeSwitch.savedTheme(admin), 'the administrator ends in the light theme (the cleanup)').not.toBe('dark');
        await test.step('after a reload the theme is still light', async () => {
            await page.reload();
            await new TelemetryTab(page).waitLoaded();
            expect(await theme.isDark(), 'the page is light after a reload').toBe(false);
        });
        expect(saved, 'the switch back to light through the theme button is saved for the person — the server still said "dark", so the next sign-in is dark again').toBe('light');
    });

    test('the super administrator sees the same Changes on the person\'s page of Platform Admin Users', async ({page, signInAs, adminApi}, testInfo) => {
        await signInAs('superAdmin');
        const users = new UsersPage(page);
        await users.navigate();
        const email = activeTenant().adminEmail;
        try {
            // the local part only ("qa.admin"): the whole address also finds every person whose address holds "hostify" — people of other accounts
            await users.search(email.split('@')[0]);
            const telemetry = await openTelemetry(page, users, email, testInfo);
            expectPresentable(await probePage(page, testInfo, 'telemetry-platform'));
            await expectTagsInChanges(telemetry, adminApi);
        } finally {
            await users.navigate();
            await users.clearFilters();
            // the page ends on the QA account's administrator, not on the list of every account's people: the report's
            // last screenshot shows no one of another account (the QA person, 2026-11-10)
            await users.goto(`/platformAdmin/users/${adminApi.user.id}/info`);
        }
    });
});
