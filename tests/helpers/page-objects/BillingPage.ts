import {expect, type Locator, type Page} from '@playwright/test';
import {BasePage} from './BasePage';

/**
 * Settings › Billing — LOOK ONLY (the QA person, 2026-11-18 / 2026-11-26): nothing on it is ever pressed (no plan, no
 * card, no SEPA, no Save, no cancel of the subscription). The specs that make reservations read „Next payment“ and the
 * invoices before the first reservation and after the last; an amount, a next payment or an invoice is a STOP.
 */
export class BillingPage extends BasePage {
    constructor(page: Page) { super(page); }
    get main(): Locator { return this.page.locator('body'); }
    async open() {
        await this.goto('/settings/accountBilling');
        await expect(this.main.getByText(/Next payment/), 'Billing › Next payment').toBeVisible({timeout: 45_000});
        await this.waitForSpinners().catch(() => undefined);
    }
    /** What a person reads: nothing to bill, no invoices — or the text that says otherwise. */
    async state(): Promise<{nothingToBill: boolean; noInvoices: boolean; text: string}> {
        const text = (await this.main.innerText()).replace(/\s+/g, ' ');
        return {nothingToBill: /Nothing to bill yet in this period/i.test(text), noInvoices: /No invoices yet/i.test(text), text: text.slice(0, 1500)};
    }
}
