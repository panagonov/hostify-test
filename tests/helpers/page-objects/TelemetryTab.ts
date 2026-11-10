import {expect, type Locator, type Page} from '@playwright/test';
import {BasePage} from './BasePage';

/** One row of the Changes table: "09-11-2026 16:12 | Create | Listing tag | QA Tag Retired". */
export interface ChangeEntry {
    when: string
    what: string
    kind: string
    record: string
}

/**
 * The Telemetry tab of a person's page (Settings › Users › a person, Platform Admin › Users › a person) — since
 * 1.0.10 the platform's dashboard of what the person did: the period buttons, the cards (Actions, Records opened,
 * Changes, Searches, Errors, Sessions), the charts and the tables Sessions, Actions and Changes. Read only: its Edit
 * and Export buttons are never pressed by the suite.
 * `data-test` present: `user-changes` (the Changes table), `user-actions` (the Actions table), `user-change-detail`
 * (the action of a change). Gaps (docs/selectors.md): the cards, the Sessions table, the period buttons.
 */
export class TelemetryTab extends BasePage {
    readonly changes: Locator;

    constructor(page: Page) {
        super(page);
        this.changes = this.locator('user-changes');
    }

    /** A card of the dashboard by its eyebrow ("Actions", "Changes" …). */
    card(name: string): Locator {
        return this.page.locator('.hydra-kpi-card').filter({hasText: new RegExp(`^\\s*${name}`, 'i')}).first();
    }

    /** A widget of the dashboard by its title ("Sessions", "Changes" …) — the painted box around it. */
    widget(title: string): Locator {
        return this.page.locator('.hydra-dashboard-widget').filter({has: this.page.locator('.hydra-dashboard-widget-title', {hasText: new RegExp(`^\\s*${title}`)})}).first();
    }

    /** The widget a card sits in (the card itself paints nothing). */
    cardWidget(name: string): Locator {
        return this.page.locator('.hydra-dashboard-widget').filter({has: this.card(name)}).first();
    }

    /** A period button: "Last 7 days", "Last 30 days", "Last 90 days", "All time". */
    period(name: string): Locator {
        return this.page.locator('.hydra-dashboard-period-track button').filter({hasText: new RegExp(`^${name}$`)}).first();
    }

    get changeRows(): Locator {
        return this.changes.locator('tbody tr.ant-table-row');
    }

    /** The open detail of a change (a popover: "Create · What was created · …"). */
    get changeDetail(): Locator {
        return this.page.locator('.ant-popover:visible').first();
    }

    async waitLoaded(timeout = 45_000) {
        await expect(this.card('Actions'), 'the Telemetry dashboard shows its cards').toBeVisible({timeout});
        await expect(this.widget('Changes'), 'the Telemetry dashboard shows its Changes table').toBeVisible({timeout});
        await this.waitForSpinners().catch(() => undefined);
    }

    /** Picks a period; the choice is the person's (`PUT /dashboardDecorator {filterValues: {period}}`) and is awaited, so
     *  a test that ends on it leaves it saved (2026-11-10: a test that closed the page first left the previous one). */
    async pickPeriod(name: string) {
        if (/active/.test((await this.period(name).getAttribute('class')) || '')) return;
        const saved = this.page.waitForResponse(res => res.url().includes('/dashboardDecorator') && res.request().method() === 'PUT', {timeout: 30_000});
        await this.period(name).click();
        await expect(this.period(name)).toHaveClass(/active/, {timeout: 15_000});
        expect((await saved).ok(), `the period "${name}" is saved for the person`).toBe(true);
        await this.waitForSpinners().catch(() => undefined);
    }

    async changeEntries(): Promise<ChangeEntry[]> {
        return this.changeRows.evaluateAll(rows => rows.map(r => {
            const cells = Array.from(r.querySelectorAll('td')).map(td => (td.textContent || '').replace(/\s+/g, ' ').trim());
            return {when: cells[0] || '', what: cells[1] || '', kind: cells[2] || '', record: cells[3] || ''};
        }));
    }

    /** The row of the Changes table of `record`, created (`what`). */
    changeRow(record: string, what = 'Create'): Locator {
        return this.changeRows.filter({hasText: record}).filter({has: this.page.locator('td', {hasText: new RegExp(`^\\s*${what}\\s*$`)})}).first();
    }

    /** Opens the detail of a change (its action) — a popover, the address stays. */
    async openChangeDetail(row: Locator) {
        await row.locator('[data-test="user-change-detail"]').first().click();
        await expect(this.changeDetail, 'the detail of the change opens').toBeVisible({timeout: 15_000});
    }

    async closeChangeDetail() {
        await this.page.keyboard.press('Escape');
        await expect(this.changeDetail).toBeHidden({timeout: 10_000});
    }

    /** The names of the sessions, newest first ("desktop · 1.0.10 · Windows · 2026-11-10 10:24"). */
    async sessionNames(): Promise<string[]> {
        return this.widget('Sessions').locator('tbody tr.ant-table-row').evaluateAll(rows => rows.map(r => (r.querySelector('td')?.textContent || '').replace(/\s+/g, ' ').trim()));
    }

    /** The background colour of a painted box. */
    static background(box: Locator): Promise<string> {
        return box.evaluate(e => getComputedStyle(e).backgroundColor);
    }

    /** "DD-MM-YYYY HH:mm" (the dashboard's dates, the browser's clock) → ms, or null. */
    static timeOf(text: string): number | null {
        const m = text.match(/(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2})/);
        return m ? new Date(+m[3], +m[2] - 1, +m[1], +m[4], +m[5]).getTime() : null;
    }

    /** The wall-clock "YYYY-MM-DD HH:mm" at the end of a session's name, as minutes (comparable, zone-free), or null. */
    static sessionClock(name: string): number | null {
        const m = name.match(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})\s*$/);
        return m ? Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]) / 60_000 : null;
    }

    /** The wall clock of `at` in `timeZone`, as minutes (the same scale as `sessionClock`). */
    static clockIn(at: Date, timeZone: string): number {
        const parts = Object.fromEntries(new Intl.DateTimeFormat('en-CA', {timeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'})
            .formatToParts(at).map(p => [p.type, p.value]));
        return Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute) / 60_000;
    }
}
