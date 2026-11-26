import {test, expect} from '../helpers/fixtures';
import {ChannelPages} from '../helpers/page-objects/ChannelPages';
import {probePage, expectPresentable} from '../helpers/probe';
import {menuPagesFor} from '../helpers/navigation';

/**
 * 104 — Apps by role (1.0.11): every person of the account uses the installed plugins; only the administrator and the
 * manager install and configure them; QA-75 (a booking agent got a 403 behind every page) stays fixed.
 * @qa-description: Apps и плъгините по роли — App Center и страниците на Apps се отварят без отказ за ролите, които ги имат (само гледане)
 *
 * Proves, for the administrator, the manager, the booking agent and the housekeeper of 100: App Center shows its app
 * tiles, and every page of Apps the inventory gives the role opens, is presentable and is answered without a 4xx
 * (the automatic console check); a page of Apps the inventory does not give the role (QA-396: the configuration pages
 * a booking agent cannot read — Booking API, Compliance connections) reads "Page not found"; the
 * housekeeper, who has no Apps, reads "Page not found" and no data. Owner portal roles went with the Owner Portal (1.0.29:
 * an owner is a company of its own) and are no longer among the pages.
 * Only the administrator and the manager have Install / Configure / Enable enabled; the booking agent none (scenario
 * 26). The actions menu of an installed plugin's card (1.0.25) is not checked: the QA account installs no plugin.
 * ONLY LOOKS (CLAUDE.md → Channels and plugins): no tile is opened, nothing is installed, configured or switched; the
 * demo-data notice is closed with its OK. Install / Configure on a plugin's own page: a later batch, after a look at
 * what opening a tile does.
 * Creates: nothing (the sign-ins write sessions; opening a grid stores the person's grid settings). Needs: 100.
 */
const APPS = ['paymentProcessorAccounts', 'bookingApiClients', 'checkinFormTemplates', 'complianceConnections'];
const at = (id: string) => `/apps/${id}`;

test.describe('104 apps by role', () => {
    for (const role of ['admin', 'manager', 'bookingAgent'] as const) {
        test(`${role}: App Center shows the apps and every page of Apps opens without a refusal`, async ({page, signInAs}, testInfo) => {
            test.setTimeout(240_000);
            await signInAs(role);
            const apps = new ChannelPages(page);
            await test.step('App Center shows its apps', async () => {
                await apps.open(at('appCenter'));
                await expect.soft(apps.notFound, `${role}: App Center is not "Page not found"`).toHaveCount(0);
                await expect.soft(apps.appTiles.first(), `${role}: App Center shows the apps (1.0.11: every person uses the installed plugins)`).toBeVisible({timeout: 30_000});
                testInfo.annotations.push({type: 'App Center', description: `${role}: ${await apps.appTiles.count()} app tile(s)`});
                // scenario 26 (1.0.11, 1.0.25): only the administrator and the manager may install / configure / switch on —
                // the buttons of the tiles are LOOKED AT (enabled or not), never pressed
                const actions = apps.appTiles.locator('button').filter({hasText: /^\s*(Install|Configure|Enable)\s*$/});
                const enabled = await actions.evaluateAll(els => els.filter(e => !(e as HTMLButtonElement).disabled && (e as HTMLElement).offsetParent !== null).length);
                testInfo.annotations.push({type: 'Install / Configure / Enable', description: `${role}: ${enabled} enabled of ${await actions.count()}`});
                if (role === 'bookingAgent') expect.soft(enabled, `${role}: no Install / Configure / Enable it could press (1.0.11)`).toBe(0);
                else if (await actions.count()) expect.soft(enabled, `${role}: Install / Configure / Enable are enabled (1.0.11)`).toBeGreaterThan(0);
                // 1.0.25: the card of an installed PLUGIN shows its actions menu (Disable / Enable, Uninstall) when pointed
                // at. NOT CHECKED: the QA account never installs a plugin (CLAUDE.md → Channels and plugins), and its only
                // "Installed" card is Mass Messages, a built-in feature without that menu (calm look 2026-11-24: on
                // pointing, the card shows its logo and its badge, nothing else — QA-469/470 were this test's mistake).
                // What a pointed card shows is only written down, never pressed.
                const installed = apps.appTiles.filter({hasText: /Installed|Enabled|Disabled/i});
                testInfo.annotations.push({type: 'installed cards', description: `${role}: ${(await installed.allInnerTexts()).map(t => t.replace(/\s+/g, ' ').trim()).join(' / ') || 'none'} — the 1.0.25 menu is not checked (no plugin is installed)`});
                expectPresentable(await probePage(page, testInfo, `${role}-appCenter`, {shot: false}));
            });
            const given = new Set(menuPagesFor(role).map(p => p.id));
            for (const id of APPS.filter(id => given.has(id))) {
                await test.step(`${id} opens and is presentable`, async () => {
                    await apps.open(at(id));
                    await expect.soft(apps.notFound, `${role}: ${id} is not "Page not found"`).toHaveCount(0);
                    expectPresentable(await probePage(page, testInfo, `${role}-${id}`, {shot: false}));
                });
            }
            for (const id of APPS.filter(id => !given.has(id))) {
                await test.step(`${id} is not the role's: "Page not found"`, async () => {
                    await apps.open(at(id));
                    await expect.soft(apps.notFound, `${role}: ${id} shows "Page not found"`).toBeVisible({timeout: 30_000});
                });
            }
        });
    }

    test('housekeeper: the pages of Apps say "Page not found"', async ({page, signInAs}) => {
        test.setTimeout(180_000);
        await signInAs('housekeeper');
        const apps = new ChannelPages(page);
        for (const id of ['appCenter', ...APPS]) {
            await test.step(`${id} by its address`, async () => {
                await apps.open(at(id));
                await expect.soft(apps.notFound, `housekeeper: ${id} shows "Page not found"`).toBeVisible({timeout: 30_000});
            });
        }
    });
});
