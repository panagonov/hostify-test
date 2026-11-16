import {expect, type Locator, type Page} from '@playwright/test';
import {BasePage} from './BasePage';
import {ApiHelper} from '../api';

/**
 * The theme button of the header (the moon / the sun, `data-test="theme-switch"`). The theme is the PERSON'S setting:
 * a click saves it on the server (`POST /security/saveMyProfile {"uiTheme": …}`) and in the browser (`uiTheme`), so it
 * stays after a reload and on the next sign-in. A test that turns the dark theme on turns it off in a `finally`
 * (`ensureLight`) — the QA account's administrator always ends in the light theme.
 * 2026-11-10 (1.0.10): the switch to DARK is saved, the switch back to LIGHT is not (only the browser keeps it) — the
 * test reads the saved theme (`savedTheme`) and, when the server still says dark, puts it back through the API
 * (`restoreLight`, a cleanup) after the check that reports it.
 */
export class ThemeSwitch extends BasePage {
    readonly button: Locator;

    constructor(page: Page) {
        super(page);
        this.button = this.locator('theme-switch');
    }

    /** The page is dark: the client marks `<html data-theme="dark">`. */
    async isDark(): Promise<boolean> {
        return this.page.evaluate(() => document.documentElement.getAttribute('data-theme') === 'dark');
    }

    /** Dark, by the button; the switch is saved for the person (the server answers the save). */
    async toDark() {
        if (!(await this.isDark())) {
            const saved = this.page.waitForResponse(res => res.url().includes('/security/saveMyProfile') && res.request().method() === 'POST', {timeout: 30_000});
            await this.button.click();
            const res = await saved;
            expect(res.ok(), `the dark theme is saved for the person (saveMyProfile ${res.status()})`).toBe(true);
        }
        await expect.poll(() => this.isDark(), {message: 'the page is dark', timeout: 15_000}).toBe(true);
    }

    /** Light, by the button, whatever the state — the page only; whether the server saved it is `savedTheme`. */
    async ensureLight() {
        if (await this.isDark()) await this.button.click();
        await expect.poll(() => this.isDark(), {message: 'the page is light', timeout: 15_000}).toBe(false);
    }

    /** The theme saved for the person (`uiTheme` of a fresh sign-in): 'dark', 'light' or '' when never set. */
    static async savedTheme(who: {email: string; password: string}): Promise<string> {
        const api = await ApiHelper.login(who.email, who.password);
        try { return String(api.user?.uiTheme || ''); } finally { await api.dispose(); }
    }

    /** CLEANUP: the light theme saved for the person through the API, when the button did not save it. */
    static async restoreLightByApi(who: {email: string; password: string}): Promise<void> {
        const api = await ApiHelper.login(who.email, who.password);
        try { await api.must('POST', '/security/saveMyProfile', {uiTheme: 'light'}); } finally { await api.dispose(); }
    }

    /**
     * The parts of the page that stay LIGHT in the dark theme (1.0.10: "the Changes card follows the dark theme" — the
     * kind of leftover looked for): the content area, cards, grids and their headers, dashboard widgets, drawers,
     * modals, tab bars and lists whose own background is near white. Described by part and size, never by text.
     */
    async lightParts(): Promise<string[]> {
        return this.page.evaluate(() => {
            const parts: Record<string, string> = {
                'content area': '.ant-layout-content, .siteContent', 'card': '.ant-card', 'grid': '.ant-table',
                'grid header': '.ant-table-thead > tr > th', 'dashboard widget': '.hydra-dashboard-widget',
                'drawer': '.ant-drawer-content', 'dialog': '.ant-modal-content', 'tab bar': '.ant-tabs-nav', 'list': '.ant-list'
            };
            const lum = (c: string) => {
                const m = c.match(/[\d.]+/g); if (!m) return 0;
                // a translucent background shows what is under it: rgba(241, 245, 249, 0.04) over the dark theme is
                // dark (2026-11-16: 59 false findings on the grid header) — only a mostly opaque one can be light
                const [r, g, b, a] = m.map(Number); if (a !== undefined && a < 0.5) return 0;
                const f = (v: number) => { const x = v / 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; };
                return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
            };
            const out: string[] = [];
            for (const [name, sel] of Object.entries(parts)) {
                const light = Array.from(document.querySelectorAll(sel)).filter(e => {
                    const el = e as HTMLElement; const r = el.getBoundingClientRect();
                    return el.offsetParent !== null && r.width > 40 && r.height > 20 && lum(getComputedStyle(el).backgroundColor) > 0.8;
                });
                if (light.length) out.push(`${name} ×${light.length} (${getComputedStyle(light[0]).backgroundColor})`);
            }
            return out;
        });
    }

    /**
     * CLEANUP after a dark run: the light theme by the button (when the page still lives), then the saved theme read
     * through the API and put back to light there when the button did not save it (QA-85). Returns the saved theme.
     */
    static async restoreLight(page: Page | null, who: {email: string; password: string}): Promise<string> {
        if (page && !page.isClosed()) {
            try { await new ThemeSwitch(page).ensureLight(); } catch { /* cleanup: the API below decides */ }
        }
        if ((await ThemeSwitch.savedTheme(who)) === 'dark') await ThemeSwitch.restoreLightByApi(who);
        return ThemeSwitch.savedTheme(who);
    }

    /** "rgb(r, g, b)" → its relative luminance (0 black … 1 white). */
    static luminance(color: string): number {
        const [r, g, b] = (color.match(/\d+(\.\d+)?/g) || ['255', '255', '255']).slice(0, 3).map(Number).map(c => {
            const s = c / 255;
            return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }
}
