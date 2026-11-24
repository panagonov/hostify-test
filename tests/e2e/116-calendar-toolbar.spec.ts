import {test, expect} from '../helpers/fixtures';
import {CalendarPage} from '../helpers/page-objects/CalendarPage';
import {AssistantPanel} from '../helpers/page-objects/AssistantPanel';
import {ThemeSwitch} from '../helpers/page-objects/ThemeSwitch';
import {Sidebar} from '../helpers/page-objects/Sidebar';
import {probePage, expectPresentable} from '../helpers/probe';
import {credentialsOf} from '../helpers/fixtures';
import type {Request} from '@playwright/test';

/**
 * 116 — Calendar: the toolbar on one row (1.0.21), and the calendar, the right panel's icons and the logo in the dark
 * theme (1.0.21). Scenarios 21 and 22 (reports/test-scenarios/1.0.26.md).
 * @qa-description: Calendar — лентата с бутоните на един ред, групите като един контрол, Legend, тъмната тема (само гледане)
 *
 * Proves: Calendar opens through the menu for the administrator, the manager and the booking agent of 100; its toolbar
 * is ONE row, nothing in it is cut or overlaps; ‹ Today › and the other groups are one control (no rounded inner
 * corner); Legend shows and hides the legend and writes nothing (no POST/PUT/DELETE while it is pressed); with the right
 * panel open the toolbar stays on one row and every icon-only control has a name. In the dark theme the calendar has
 * no light part (`lightParts`), the right panel's icons and the logo follow the theme; the theme goes back to light.
 * LOOK ONLY: Sync and Find availability are never pressed; nothing is typed into the assistant. The QA account has no
 * listings: the calendar is empty, the toolbar must still be whole.
 * Creates: nothing (the person's calendar view is left as found). Needs: 100 (the manager and the booking agent).
 */
const WRITES = (r: Request) => r.url().includes('/api/') && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(r.method())
    // the client's own bookkeeping (telemetry, the person's remembered view) is not a write of the calendar's data
    && !/\/(userEvent|gridDecorator|dashboardDecorator|sharedGridView|calendarView|userPreference)/i.test(r.url());

test.describe('116 calendar › toolbar', () => {
    for (const role of ['admin', 'manager', 'bookingAgent'] as const) {
        test(`${role}: the toolbar is one row, its groups are one control, nothing is cut`, async ({page, signInAs}, testInfo) => {
            test.setTimeout(180_000);
            await signInAs(role);
            const sidebar = new Sidebar(page);
            await sidebar.openGroup('multiCalendar');
            const calendar = new CalendarPage(page);
            await expect(calendar.todayButton, `${role}: the Calendar's toolbar`).toBeVisible({timeout: 45_000});
            expectPresentable(await probePage(page, testInfo, `${role}-calendar`));

            const {rows, controls} = await calendar.toolbarRows();
            testInfo.annotations.push({type: 'toolbar', description: `${role}: ${rows} row(s) — ${controls.map(c => c.name || '(icon)').join(' | ')}`});
            expect.soft(rows, `${role}: the toolbar is one row (1.0.21)`).toBe(1);
            expect.soft(await calendar.overlapsAndCuts(), `${role}: no control of the toolbar is cut or overlaps another`).toEqual([]);
            expect.soft(await calendar.roundedInsideGroups(), `${role}: ‹ Today › and the other groups are one control (1.0.21)`).toEqual([]);
            await expect.soft(calendar.syncButton, `${role}: Sync is on the toolbar (never pressed)`).toBeVisible();
        });
    }

    test('admin: Legend shows and hides the legend and writes nothing', async ({page, signInAs}) => {
        await signInAs('admin');
        const calendar = new CalendarPage(page);
        await calendar.navigate();
        const writes: string[] = [];
        const listen = (r: Request) => { if (WRITES(r)) writes.push(`${r.method()} ${r.url().split('/api')[1]}`); };
        page.on('request', listen);
        try {
            const before = await calendar.legend.isVisible();
            await calendar.legendButton.click();
            await expect.poll(() => calendar.legend.isVisible(), {message: 'the first Legend click flips the legend', timeout: 10_000}).toBe(!before);
            await calendar.legendButton.click();
            await expect.poll(() => calendar.legend.isVisible(), {message: 'the second click puts it back (the view ends as it began)', timeout: 10_000}).toBe(before);
        } finally {
            page.off('request', listen);
        }
        expect(writes, 'Legend writes no data').toEqual([]);
    });

    test('admin: with the right panel open the toolbar stays one row and every icon has a name', async ({page, signInAs}, testInfo) => {
        await signInAs('admin');
        const calendar = new CalendarPage(page);
        await calendar.navigate();
        const assistant = new AssistantPanel(page);
        await assistant.openThroughSupport();
        try {
            await page.waitForTimeout(800);
            const {rows, controls} = await calendar.toolbarRows();
            testInfo.annotations.push({type: 'toolbar with the panel', description: `${rows} row(s); icon-only: ${controls.filter(c => c.iconOnly).length}`});
            expect.soft(rows, 'with the right panel open the toolbar is still one row').toBe(1);
            expect.soft(controls.filter(c => c.iconOnly && !c.named).map(c => `at ${c.left}px`), 'every icon-only control has a name (tooltip / aria-label)').toEqual([]);
            expect.soft(await calendar.overlapsAndCuts(), 'nothing is cut or overlaps').toEqual([]);
        } finally {
            await assistant.close();
        }
    });

    test('admin: in the dark theme the calendar, the right panel\'s icons and the logo are dark; the theme goes back to light', async ({page, signInAs}, testInfo) => {
        await signInAs('admin');
        const theme = new ThemeSwitch(page);
        try {
            await theme.toDark();
            const calendar = new CalendarPage(page);
            await calendar.navigate();
            expect.soft(await theme.lightParts(), 'no light part on the dark Calendar (1.0.21)').toEqual([]);
            expectPresentable(await probePage(page, testInfo, 'calendar-dark'));
            // the logo and the icons of the right dock: none on a near-white background in the dark theme
            const light = await page.evaluate(() => {
                const lum = (c: string) => { const m = c.match(/[\d.]+/g); if (!m) return 0; const [r, g, b, a] = m.map(Number); if (a !== undefined && a < 0.5) return 0; const f = (v: number) => { const x = v / 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
                const out: string[] = [];
                const logo = document.querySelector('.cc-sidebar a img, .cc-sidebar a svg')?.closest('a');
                if (logo && lum(getComputedStyle(logo).backgroundColor) > 0.8) out.push('the logo stands on a light box');
                const dock = Array.from(document.querySelectorAll('body *')).filter(e => { const r = e.getBoundingClientRect(); return r.left > window.innerWidth - 70 && r.width > 20 && r.width < 70 && r.height > 20 && (e as HTMLElement).offsetParent !== null; });
                for (const e of dock) if (lum(getComputedStyle(e).backgroundColor) > 0.8) out.push(`a right-dock element on a light box (${e.className.toString().slice(0, 40)})`);
                return [...new Set(out)];
            });
            expect.soft(light, 'the logo and the right panel\'s icons follow the dark theme (1.0.21)').toEqual([]);
        } finally {
            const saved = await ThemeSwitch.restoreLight(page, credentialsOf('admin'));
            expect(saved, 'the administrator ends in the light theme').not.toBe('dark');
        }
    });
});
