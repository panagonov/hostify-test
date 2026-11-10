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
 * tabs are recorded in the report. Edit and Export of the dashboard are never pressed.
 * Creates: nothing (the booking agent's sign-in writes a session of its telemetry). Needs: 100 (the booking agent),
 * 110 (the three tags, created by the administrator).
 */
const TAG_NAMES = ['QA Tag Sea view', 'QA Tag Pet friendly', 'QA Tag Retired'];
const AUCKLAND = 'Pacific/Auckland';

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
        const agent = credentialsOf('bookingAgent');
        let signedInAt = new Date();
        await test.step(`the booking agent signs in from a browser in ${AUCKLAND}`, async () => {
            const context = await browser.newContext({baseURL: testInfo.project.use.baseURL, viewport: testInfo.project.use.viewport, timezoneId: AUCKLAND});
            try {
                const away = await context.newPage();
                const login = new LoginPage(away);
                await login.navigate();
                signedInAt = new Date();
                await login.login(agent.email, agent.password);
                expect(await away.evaluate(() => Intl.DateTimeFormat().resolvedOptions().timeZone), 'the browser\'s clock is Auckland').toBe(AUCKLAND);
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
        let newest = '';
        // the session reaches the telemetry within a minute or so: the tab is reopened until it is there
        await expect.poll(async () => {
            newest = (await telemetry.sessionNames())[0] || '';
            const clock = TelemetryTab.sessionClock(newest);
            if (clock !== null && Math.abs(clock - expected) <= 2) return 'Auckland';
            await page.reload();
            telemetry = new TelemetryTab(page);
            await telemetry.waitLoaded();
            return newest;
        }, {message: `the newest session is named with the time of Auckland (${fmt(expected)}), not UTC (${fmt(utc)})`, timeout: 120_000, intervals: [5_000, 10_000, 15_000]}).toBe('Auckland');
        testInfo.annotations.push({type: 'session', description: `${newest} — Auckland ${fmt(expected)}, UTC ${fmt(utc)}`});
    });

    test('in the dark theme the Changes card and table are dark and readable; the theme goes back to light', async ({page, signInAs}, testInfo) => {
        const admin = credentialsOf('admin');
        await signInAs('admin');
        const theme = new ThemeSwitch(page);
        // the start is light, on the page and for the person (a run that broke before its cleanup may have left dark)
        await theme.ensureLight();
        if ((await ThemeSwitch.savedTheme(admin)) === 'dark') await ThemeSwitch.restoreLight(admin);
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
            if (saved === 'dark') await ThemeSwitch.restoreLight(admin);
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
