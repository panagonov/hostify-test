import type {Locator} from '@playwright/test';
import {BasePage} from './BasePage';

/**
 * Channel Manager and Apps (1.0.11+) — the parts the tests LOOK at. Nothing here presses a button that acts on a
 * channel or a plugin (CLAUDE.md → Channels and plugins: look, never act): the locators are for `toBeEnabled` /
 * `toBeDisabled` / `toBeVisible` only. The one click of this object is the OK of the demo-data notice.
 */
export class ChannelPages extends BasePage {
    /** The demo-data notice of a fresh account ("You can delete the demo data at any time …"): it covers the page. */
    get demoNotice(): Locator {
        return this.page.locator('.ant-modal').filter({hasText: /demo data/i});
    }

    /** An optional dialog: dismissed with its OK when it is there (CLAUDE.md allows it). */
    async dismissDemoNotice() {
        const ok = this.demoNotice.getByRole('button', {name: /^OK$/});
        if (await ok.isVisible().catch(() => false)) {
            // an optional dialog (allowed): the welcome dialog's own handler may close it first — the click then has
            // nothing to press, which is fine (2026-11-16: a 20 s timeout of the click failed the wizard's check)
            await ok.click({timeout: 5_000}).catch(() => undefined);
            await this.demoNotice.waitFor({state: 'hidden', timeout: 10_000}).catch(() => undefined);
        }
    }

    /** Opens a page and lets it finish reading: a grid read cut short by the next page's navigation is logged by the
     *  client as `Grid read failed … error: -200` (2026-11-16, the booking agent's channel pages). */
    async open(path: string) {
        await this.goto(path);
        await this.dismissDemoNotice();
        await this.waitForSpinners();
        await this.page.waitForLoadState('networkidle', {timeout: 15_000}).catch(() => undefined);
    }

    /** Channels › Overview: one tile per booking site (`channels-hub-<site>`) — a disabled tile cannot be connected. */
    get hubTiles(): Locator {
        return this.page.locator('[data-test^="channels-hub-"]');
    }

    /** How many site tiles can be connected — by Playwright's own "enabled" (a tile is switched off by a disabled
     *  wrapper, not by its own attribute: a CSS `:not([disabled])` counted the booking agent's 23 off tiles as on). */
    async hubTilesEnabled(): Promise<number> {
        let n = 0;
        for (const tile of await this.hubTiles.all()) if (await tile.isEnabled()) n++;
        return n;
    }

    /** Channels › Channel accounts › "Connect a channel". */
    get connectButton(): Locator {
        return this.locator('channel-account-connect');
    }

    /** Channels › Optimize for Airbnb: the actions that reach Airbnb — looked at, never pressed. */
    get opportunityFetch(): Locator {
        return this.locator('opportunity-fetch');
    }

    get opportunityBulkEnable(): Locator {
        return this.locator('opportunity-bulk-enable');
    }

    get opportunityBulkDisable(): Locator {
        return this.locator('opportunity-bulk-disable');
    }

    /** The line a person who does not set the channel up reads instead of the actions (1.0.11). Gap: no data-test. */
    get setupNote(): Locator {
        return this.page.getByText(/only the account's administrator or manager sets this channel up/i).first();
    }

    /** Channels › Connect a channel: its steps and the sites it offers; `Next` is never pressed. Gap: the steps and
     *  the site cards have no data-test (docs/selectors.md). */
    get wizardSteps(): Locator {
        return this.page.locator('.ant-steps-item-title');
    }

    /** One line per offered site: "Sign in with the channel" or "Connected by Hostify" (its way to connect). */
    get wizardSites(): Locator {
        return this.page.getByText(/^(Sign in with the channel|Connected by Hostify)$/);
    }

    get wizardNext(): Locator {
        return this.locator('channel-connect-next');
    }

    /** Apps › App Center: one tile per app (`app-tile`). */
    get appTiles(): Locator {
        return this.locator('app-tile');
    }
}
