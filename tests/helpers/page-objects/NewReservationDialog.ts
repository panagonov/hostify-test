import {expect, type Locator, type Page} from '@playwright/test';
import {BasePage} from './BasePage';

/**
 * The dialog „Add reservation“ (Reservations › the arrow next to „Add new“ › „New reservation without the calendar“, and
 * the Calendar) — data-test `new-res-*` / `newres-*` (1.0.31). The payment fields (`new-res-payment`, Method, Reference)
 * are NEVER filled: a reservation of the suite is unpaid (CLAUDE.md — payments: never).
 */
export class NewReservationDialog extends BasePage {
    readonly root: Locator;
    constructor(page: Page) {
        super(page);
        this.root = page.getByRole('dialog').filter({hasText: /Add reservation/}).last();
    }
    get listing(): Locator { return this.root.locator('[data-test="new-res-listing"]'); }
    get guestSearch(): Locator { return this.root.locator('[data-test="newres-guest-search"]'); }
    get quote(): Locator { return this.root.locator('[data-test="newres-quote"]'); }
    get total(): Locator { return this.root.locator('[data-test="newres-total"]'); }
    get verdict(): Locator { return this.root.locator('[data-test="newres-verdict"]'); }
    get error(): Locator { return this.root.locator('[data-test="newres-error"]'); }
    get create(): Locator { return this.root.locator('[data-test="newres-ok"]').or(this.root.getByRole('button', {name: /^\s*Create\s*$/})).first(); }
    get payment(): Locator { return this.root.locator('[data-test="new-res-payment"]'); }
    get dateInputs(): Locator { return this.root.locator('.ant-picker-range input'); }
    get validation(): Locator { return this.root.locator('.ant-form-item-explain-error'); }

    /** Reservations › the arrow next to „Add new“ › „New reservation without the calendar“. */
    static async openFromReservations(page: Page): Promise<NewReservationDialog> {
        await page.locator('[data-test="reservation-create-more"]').click();
        await page.locator('.ant-dropdown:visible .ant-dropdown-menu-item').filter({hasText: /New reservation without the calendar/}).first().click();
        const d = new NewReservationDialog(page);
        await d.waitOpen();
        return d;
    }

    /** Closes the dialog without creating anything. */
    async close() {
        await this.root.getByRole('button', {name: /^\s*(Cancel|Close)\s*$/}).first().click();
        await expect(this.root).toBeHidden({timeout: 15_000});
    }

    async waitOpen() { await expect(this.root, 'the dialog „Add reservation“').toBeVisible({timeout: 30_000}); }

    async pickListing(nickname: string) {
        await this.listing.click();
        await this.page.keyboard.type(nickname, {delay: 40});
        const o = this.page.locator('.ant-select-dropdown:visible').last().locator('.ant-select-item-option').filter({hasText: nickname}).first();
        await expect(o, `the listing "${nickname}" in the list`).toBeVisible({timeout: 20_000});
        await o.click();
    }

    /** The stay: check-in and check-out typed into the range picker (YYYY-MM-DD), as a person types them. */
    async dates(checkIn: string, checkOut: string) {
        await this.dateInputs.nth(0).click();
        await this.dateInputs.nth(0).fill(checkIn);
        await this.page.keyboard.press('Enter');
        await this.dateInputs.nth(1).fill(checkOut);
        await this.page.keyboard.press('Enter');
        await expect(this.page.locator('.ant-picker-dropdown:visible')).toHaveCount(0, {timeout: 10_000}).catch(async () => this.page.keyboard.press('Escape'));
    }

    async pickGuest(name: string) {
        await this.guestSearch.click();
        await this.page.keyboard.type(name, {delay: 40});
        const o = this.page.locator('.ant-select-dropdown:visible').last().locator('.ant-select-item-option').filter({hasText: name}).first();
        await expect(o, `the guest "${name}" in the search`).toBeVisible({timeout: 20_000});
        await o.click();
    }
}
