import {test, expect} from '../helpers/fixtures';
import {credentialsOf} from '../helpers/fixtures';
import {menuPagesFor} from '../helpers/navigation';
import {SweepSession, AWAITING_INVENTORY} from '../helpers/sweep';
import {ThemeSwitch} from '../helpers/page-objects/ThemeSwitch';

/**
 * 011 — every page of the ACCOUNT menu in the DARK theme (the sweep of 010, the theme switched on first).
 * @qa-description: тъмната тема на акаунта — всяка страница се отваря, оглежда се и нищо не остава светло
 *
 * Proves: with the dark theme on (through the theme button of the header), every menu page of the role `admin`
 * opens through the menu, is presentable — the probe measures the contrast of every text — and no part of it (the
 * content area, cards, grids and their headers, widgets, drawers, dialogs, tab bars, lists) stays light; every grid
 * keeps its columns in its layout. The pages that wait for the inventory (sweep.ts → AWAITING_INVENTORY) are left out
 * — 010 reports them. The theme is the person's setting: it goes back to LIGHT at the end, ALWAYS — by the button,
 * then through the API when the button did not save it (QA-85) — and the saved theme is checked.
 * Creates: nothing (the theme setting, put back). Needs: 003 green.
 */
const WHO = 'admin' as const;

test.describe('011 account-pages-dark', () => {
    // not serial: every page is its own verdict
    let session: SweepSession;
    test.use(SweepSession.fixturesOf(() => session));

    test.beforeAll(async ({browser}) => {
        session = await SweepSession.open(browser, WHO);
        await new ThemeSwitch(session.page).toDark();
    });

    test.afterAll(async () => {
        // ALWAYS back to light — the page's button first, the API when the button did not save it
        let saved = '';
        try {
            saved = await ThemeSwitch.restoreLight(session?.page ?? null, credentialsOf(WHO));
        } finally {
            await session?.close();
        }
        expect(saved, 'the theme saved for the person is light again').not.toBe('dark');
    });

    for (const nav of menuPagesFor(WHO).filter(p => !AWAITING_INVENTORY[p.id])) {
        test(`${nav.menuPath.join(' › ')} in the dark theme (${nav.path})`, async ({}, testInfo) => {
            await session.visit(nav, testInfo, {dark: true});
        });
    }
});
