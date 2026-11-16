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
 * a booking agent cannot read — Booking API, Owner portal roles, Compliance connections) reads "Page not found"; the
 * housekeeper, who has no Apps, reads "Page not found" and no data.
 * ONLY LOOKS (CLAUDE.md → Channels and plugins): no tile is opened, nothing is installed, configured or switched; the
 * demo-data notice is closed with its OK. Install / Configure on a plugin's own page: a later batch, after a look at
 * what opening a tile does.
 * Creates: nothing (the sign-ins write sessions; opening a grid stores the person's grid settings). Needs: 100.
 */
const APPS = ['paymentProcessorAccounts', 'bookingApiClients', 'ownerPortalRoles', 'checkinFormTemplates', 'complianceConnections'];
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
