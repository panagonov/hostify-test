import {test, expect} from '../helpers/fixtures';
import {ChannelPages} from '../helpers/page-objects/ChannelPages';
import {probePage, expectPresentable} from '../helpers/probe';

/**
 * 103 — Channels by role (1.0.11–1.0.16): every role sees the channels it may see; only the administrator and the
 * manager can start what reaches a booking site; Inbound events is gone (1.0.16 — the channel events are kept in the
 * server's queues, not as records; QA-394).
 * @qa-description: каналите по роли — кой вижда страниците и кой има активни бутони (само гледане); Inbound events вече я няма
 *
 * Proves, for the administrator, the manager, the booking agent and the housekeeper of 100: the pages of Channels open
 * (or show "Page not found" for who may not see them) and are presentable; on Overview the site tiles are enabled for
 * the administrator and the manager and all disabled for the booking agent; "Connect a channel" is there for the
 * administrator and the manager only; the booking agent reads who sets a channel up (1.0.11); the connect wizard
 * opens for the administrator and creates nothing (the channel records are counted before and after); Inbound events
 * says "Page not found" to every role (1.0.15 showed the attempts of an event there; 1.0.16 removed the page with its
 * model — the events and their attempts live in the server's queues — QA-394).
 * ONLY LOOKS (CLAUDE.md → Channels and plugins): no tile, no Connect, no Fetch opportunities, no Next of the wizard is
 * ever pressed — the buttons are checked enabled / disabled. The demo-data notice is closed with its OK.
 * Not checked (no channel is connected to the QA account): Sync now, Full sync, Push update, imports — manual.
 * Creates: nothing (the sign-ins write sessions; opening a grid stores the person's grid settings). Needs: 100.
 */
const CHANNEL_PAGES = ['channelsHub', 'channelAccounts', 'channelListings', 'channelProperties', 'channelRatePlans', 'channelListingPromotions', 'airbnbOpportunities', 'channelCommands'];
// channelInboundEvent is no record since 1.0.16 (its model and index are removed — QA-394)
const CHANNEL_RECORDS = ['channelAccount', 'channelListing', 'channelProperty', 'channelRatePlan', 'channelListingPromotion', 'channelCommand', 'channelClaim'];
const at = (id: string) => `/channelManager/${id}`;

test.describe('103 channels by role', () => {
    for (const role of ['admin', 'manager'] as const) {
        test(`${role}: every page of Channels opens; the sites can be connected; Fetch opportunities is looked at`, async ({page, signInAs}, testInfo) => {
            test.setTimeout(300_000);
            await signInAs(role);
            const channels = new ChannelPages(page);
            for (const id of CHANNEL_PAGES) {
                await test.step(`${id} opens and is presentable`, async () => {
                    await channels.open(at(id));
                    await expect.soft(channels.notFound, `${role}: ${id} is not "Page not found"`).toHaveCount(0);
                    expectPresentable(await probePage(page, testInfo, `${role}-${id}`, {shot: false}));
                });
            }
            await test.step('Overview: the sites with a plugin can be connected', async () => {
                await channels.open(at('channelsHub'));
                await expect(channels.hubTiles.first(), 'the sites of Overview').toBeVisible({timeout: 30_000});
                expect.soft(await channels.hubTilesEnabled(), `${role}: sites that can be connected on Overview`).toBeGreaterThan(0);
            });
            await test.step('Channel accounts: "Connect a channel" is enabled (never pressed)', async () => {
                await channels.open(at('channelAccounts'));
                await expect.soft(channels.connectButton, `${role}: Connect a channel`).toBeEnabled({timeout: 30_000});
            });
            await test.step('Optimize for Airbnb: Fetch opportunities is looked at (never pressed)', async () => {
                await channels.open(at('airbnbOpportunities'));
                await expect(channels.opportunityFetch, 'Fetch opportunities is on the page').toBeVisible({timeout: 30_000});
                // without an Airbnb account the action is off for everyone: its state is recorded, not judged
                testInfo.annotations.push({type: 'Fetch opportunities', description: `${role}: ${await channels.opportunityFetch.isEnabled() ? 'enabled' : 'disabled'} (no Airbnb account)`});
                await expect.soft(channels.setupNote, `${role}: no "only the administrator or manager sets this channel up" line`).toHaveCount(0);
            });
        });
    }

    test('booking agent: the channels are seen, nothing can be started; Inbound events is not his', async ({page, signInAs}, testInfo) => {
        test.setTimeout(300_000);
        await signInAs('bookingAgent');
        const channels = new ChannelPages(page);
        for (const id of CHANNEL_PAGES) {
            await test.step(`${id} opens and is presentable`, async () => {
                await channels.open(at(id));
                await expect.soft(channels.notFound, `booking agent: ${id} is not "Page not found"`).toHaveCount(0);
                expectPresentable(await probePage(page, testInfo, `bookingAgent-${id}`, {shot: false}));
            });
        }
        await test.step('Overview: every site tile is disabled', async () => {
            await channels.open(at('channelsHub'));
            await expect(channels.hubTiles.first(), 'the sites of Overview').toBeVisible({timeout: 30_000});
            expect.soft(await channels.hubTilesEnabled(), 'booking agent: sites that can be connected').toBe(0);
        });
        await test.step('Channel accounts: no enabled "Connect a channel"', async () => {
            await channels.open(at('channelAccounts'));
            await expect.soft(channels.connectButton.and(page.locator(':enabled')), 'booking agent: an enabled Connect a channel').toHaveCount(0);
        });
        await test.step('Optimize for Airbnb: the actions are off and the line says who sets the channel up', async () => {
            await channels.open(at('airbnbOpportunities'));
            await expect.soft(channels.opportunityFetch, 'booking agent: Fetch opportunities').toBeDisabled({timeout: 30_000});
            await expect.soft(channels.setupNote, 'booking agent: "only the administrator or manager sets this channel up"').toBeVisible();
        });
        await test.step('Inbound events and the connect wizard by their address: "Page not found"', async () => {
            for (const id of ['channelInboundEvents', 'channelConnectWizard']) {
                await channels.open(at(id));
                await expect.soft(channels.notFound, `booking agent: ${id} by its address`).toBeVisible({timeout: 30_000});
            }
        });
    });

    test('housekeeper: Channels is not on the menu and its pages say "Page not found"', async ({page, signInAs}) => {
        test.setTimeout(240_000);
        await signInAs('housekeeper');
        const channels = new ChannelPages(page);
        for (const id of [...CHANNEL_PAGES, 'channelInboundEvents']) {
            await test.step(`${id} by its address`, async () => {
                await channels.open(at(id));
                await expect.soft(channels.notFound, `housekeeper: ${id} shows "Page not found"`).toBeVisible({timeout: 30_000});
            });
        }
    });

    test('the connect wizard opens for the administrator, offers the sites and creates nothing (Next never pressed)', async ({page, signInAs, adminApi}, testInfo) => {
        const before: Record<string, number> = {};
        for (const e of CHANNEL_RECORDS) before[e] = await adminApi.count(e);
        await signInAs('admin');
        const channels = new ChannelPages(page);
        await channels.open(at('channelConnectWizard'));
        await expect(channels.wizardSteps, 'the wizard\'s steps').toHaveText([/Channel/, /Account/, /Sign in/], {timeout: 30_000});
        await expect(channels.wizardNext, 'Next is there — and is never pressed').toBeVisible();
        const sites = await channels.wizardSites.count();
        testInfo.annotations.push({type: 'wizard', description: `${sites} site(s) offered`});
        expectPresentable(await probePage(page, testInfo, 'channel-connect-wizard'));
        // left by opening another page: the wizard has no Cancel
        await channels.open(at('channelsHub'));
        const after: Record<string, number> = {};
        for (const e of CHANNEL_RECORDS) after[e] = await adminApi.count(e);
        expect(after, 'opening the wizard and leaving it created no channel record').toEqual(before);
    });

    // QA-394: 1.0.15 promised the attempts of an event on Inbound events; 1.0.16 removed the page and its model (the
    // channel events are kept in the server's queues in Redis, not as records) — the page is gone for every role
    for (const role of ['admin', 'manager'] as const) {
        test(`${role}: Inbound events is gone since 1.0.16 — its address says "Page not found"`, async ({page, signInAs}) => {
            await signInAs(role);
            const channels = new ChannelPages(page);
            await channels.open(at('channelInboundEvents'));
            await expect.soft(channels.notFound, `${role}: channelInboundEvents by its address`).toBeVisible({timeout: 30_000});
        });
    }
});
