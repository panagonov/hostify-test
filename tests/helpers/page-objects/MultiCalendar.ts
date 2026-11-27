import {expect, type Locator, type Page} from '@playwright/test';
import {BasePage} from './BasePage';

/**
 * Calendar (`/multiCalendar`, data-test `multi-calendar`, 1.0.35): a row per listing, a cell per night
 * (`td[data-test="mc-cell"][data-listing][data-date][data-state]`). Dragging over nights opens the selection bar
 * (`mc-sel-price`, `mc-sel-block`, `mc-sel-more`, `mc-sel-close`); „More“ opens „Update Calendar“ (its „Add reservation“
 * opens the dialog „Add reservation“). Never pressed: Sync (the toolbar) — channels are look-only.
 */
export class MultiCalendar extends BasePage {
    constructor(page: Page) { super(page); }
    get root(): Locator { return this.locator('multi-calendar'); }
    cell(listingId: string, date: string): Locator {
        return this.page.locator(`td[data-test="mc-cell"][data-listing="${listingId}"][data-date="${date}"]`);
    }
    async open() {
        await this.goto('/multiCalendar');
        await expect(this.root, 'the Calendar').toBeVisible({timeout: 45_000});
        await this.waitForSpinners().catch(() => undefined);
    }
    async search(text: string) {
        await this.locator('mc-search').fill(text);
        await this.page.waitForTimeout(1500);
    }
    /** Drags over the nights `from` … `to` (both included) of the listing, as a person selects them. */
    async select(listingId: string, from: string, to: string) {
        const a = this.cell(listingId, from), b = this.cell(listingId, to);
        await expect(a, `the night ${from} in the Calendar`).toBeVisible({timeout: 30_000});
        await b.scrollIntoViewIfNeeded();
        await a.scrollIntoViewIfNeeded();
        const ba = (await a.boundingBox())!, bb = (await b.boundingBox())!;
        await this.page.mouse.move(ba.x + ba.width / 2, ba.y + ba.height / 2);
        await this.page.mouse.down();
        await this.page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2, {steps: 8});
        await this.page.mouse.up();
        await expect(this.locator('mc-sel-more'), 'the selection bar').toBeVisible({timeout: 15_000});
    }
    get selectionNights(): Locator { return this.locator('mc-selection-nights'); }
    /** „More“ of the selection bar → the dialog „Update Calendar“. */
    async more(): Promise<UpdateCalendar> {
        await this.locator('mc-sel-more').click();
        const d = new UpdateCalendar(this.page);
        await expect(d.root, 'the dialog „Update Calendar“').toBeVisible({timeout: 20_000});
        return d;
    }
}

/** The dialog „Update Calendar“ of the selected nights. GAP: no data-test on its controls — their visible names. */
export class UpdateCalendar extends BasePage {
    readonly root: Locator;
    constructor(page: Page) {
        super(page);
        this.root = page.getByRole('dialog').filter({hasText: /Update Calendar/}).last();
    }
    get addReservation(): Locator { return this.root.getByRole('button', {name: /Add reservation/}); }
    /** A choice of a group by its exact text: „Blocked“, „Available (Default)“ (Availability), „Set“ (Daily price). */
    choice(text: string): Locator {
        const re = new RegExp(`^\\s*${text.replace(/[()]/g, m => '\\' + m)}\\s*$`);
        return this.root.locator('label.ant-radio-button-wrapper, label.ant-radio-wrapper').filter({hasText: re}).first();
    }
    get periodStart(): Locator { return this.root.getByRole('textbox', {name: /^Period$/}); }
    get periodEnd(): Locator { return this.root.getByRole('textbox', {name: /^End date$/}); }
    get blockReason(): Locator { return this.root.getByRole('combobox', {name: /Block reason/}).first(); }
    /** The period of the dialog: filled from the selection; a start the dialog left empty is typed (YYYY-MM-DD). */
    async ensurePeriod(fromIso: string, toIso: string) {
        for (const [box, v] of [[this.periodStart, fromIso], [this.periodEnd, toIso]] as const) {
            if (await box.inputValue()) continue;
            await box.click();
            await box.fill(v);
            await this.page.keyboard.press('Enter');
        }
        await expect(this.periodStart, 'the period starts').not.toHaveValue('');
        await expect(this.periodEnd, 'the period ends').not.toHaveValue('');
    }
    async pickBlockReason(): Promise<string> {
        await this.blockReason.click();
        const o = this.page.locator('.ant-select-dropdown:visible').last().locator('.ant-select-item-option').first();
        await expect(o, 'a block reason').toBeVisible({timeout: 15_000});
        const t = (await o.innerText()).trim();
        await o.click();
        return t;
    }
    get dailyPrice(): Locator { return this.root.getByPlaceholder('0.00').first(); }
    get save(): Locator { return this.root.getByRole('button', {name: /^\s*(save\s+|check\s+)?(Save|Apply|Update)\s*$/}).last(); }
}
