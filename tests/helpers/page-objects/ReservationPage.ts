import {expect, type Locator, type Page} from '@playwright/test';
import {BasePage} from './BasePage';

/**
 * The record page of a reservation (1.0.35): its status (`reservation-status`), its actions (`reservation-actions`,
 * `reservation-cancel`, `reservation-more`) and the dialog of an action (`reservation-dialog-ok`; Cancel:
 * `reservation-cancel-by`, `reservation-cancel-reason`). Cancel is pressed ONLY for our reservation, after the guards of
 * seed.ts (the QA person, 2026-11-26).
 */
export class ReservationPage extends BasePage {
    constructor(page: Page) { super(page); }
    get status(): Locator { return this.locator('reservation-status'); }
    get cancel(): Locator { return this.locator('reservation-cancel'); }
    get more(): Locator { return this.locator('reservation-more'); }
    get dialog(): Locator { return this.page.getByRole('dialog').filter({has: this.page.locator('[data-test="reservation-dialog-ok"]')}).last(); }
    get dialogOk(): Locator { return this.dialog.locator('[data-test="reservation-dialog-ok"]'); }
    get cancelReason(): Locator { return this.dialog.locator('[data-test="reservation-cancel-reason"]'); }
    get cancelBy(): Locator { return this.dialog.locator('[data-test="reservation-cancel-by"]'); }
    get dialogClose(): Locator { return this.dialog.getByRole('button', {name: /^\s*Close\s*$/}).last(); }
    get validation(): Locator { return this.dialog.locator('.ant-form-item-explain-error'); }
    get actions(): Locator { return this.locator('reservation-actions'); }
    /** Finance card › Record payment — only RECORDS a payment (cash / bank transfer), no processor, no card (QA, 2026-11-27). */
    get recordPayment(): Locator { return this.page.getByRole('button', {name: /Record payment/}).first(); }
    get paymentDialog(): Locator { return this.page.getByRole('dialog').filter({has: this.page.locator('[data-test="fb-payment-ok"]')}).last(); }
    get paymentAmount(): Locator { return this.paymentDialog.locator('[data-test="fb-payment-amount"]').locator('input').or(this.paymentDialog.locator('input[data-test="fb-payment-amount"]')).first(); }
    get paymentNote(): Locator { return this.paymentDialog.getByRole('textbox', {name: /Note/}); }
    get paymentOk(): Locator { return this.paymentDialog.locator('[data-test="fb-payment-ok"]'); }
    /** „Paid by“: a manual way only (cash, bank transfer) — never a card or a processor. */
    async pickPaidBy(option: RegExp): Promise<string> {
        await this.paymentDialog.locator('[data-test="fb-payment-method"]').click();
        const o = this.page.locator('.ant-select-dropdown:visible').last().locator('.ant-select-item-option').filter({hasText: option}).first();
        await expect(o, `a manual way to pay ${option}`).toBeVisible({timeout: 15_000});
        const t = (await o.innerText()).trim();
        expect(t, 'never a card or a processor').not.toMatch(/card|stripe|paypal|processor/i);
        await o.click();
        return t;
    }
    get notes(): Locator { return this.locator('reservation-info-notes'); }
    get editNotes(): Locator { return this.page.getByRole('button', {name: /Edit the notes/}); }
    /** The notes edited in place (antd editable text): the box that has the focus after „Edit the notes“; Enter saves. */
    get notesBox(): Locator { return this.page.locator('textarea:focus, input:focus').first(); }
    get extendDate(): Locator { return this.dialog.locator('[data-test="reservation-extend-date"]'); }
    tab(name: string): Locator { return this.locator(`tab-${name}`); }

    /** An item of „Actions“ (Check in, Extend, Move, Cancel …). NEVER called with Add card, Conversation, Re-evaluate
     *  automations, Create invoice, or a payment: Request payment and Charge card are forbidden; Record payment waits for
     *  the decision of group 4 (the QA person, 2026-11-27). */
    async action(name: RegExp) {
        expect(String(name), 'an action the suite may press').not.toMatch(/card|Conversation|automations|invoice|payment/i);
        await this.actions.or(this.more).first().click();
        const item = this.page.locator('.ant-dropdown:visible .ant-dropdown-menu-item').filter({hasText: name}).first();
        await expect(item, `the action ${name}`).toBeVisible({timeout: 15_000});
        await item.click();
        await expect(this.dialog, `the dialog of ${name}`).toBeVisible({timeout: 15_000});
    }

    async openCancel() { await this.action(/^\s*(close-circle\s+)?Cancel\s*$/); }

    /** A day picked in a date box of the open dialog: the box is opened, the month moved with its > arrow, the day's cell
     *  clicked (the app's format is DD-MM-YYYY — QA, 2026-11-27). */
    async pickDay(box: Locator, isoDay: string) {
        const input = (await box.evaluate(e => e.tagName)) === 'INPUT' ? box : box.locator('input').first();
        await input.click();
        const calendar = this.page.locator('.ant-picker-dropdown:visible').last();
        await expect(calendar).toBeVisible({timeout: 10_000});
        const [y, m, d] = isoDay.split('-');
        const cell = calendar.locator(`td[title="${d}-${m}-${y}"], td[title="${isoDay}"]`).first();
        for (let i = 0; i < 36 && !(await cell.isVisible()); i++) await calendar.locator('.ant-picker-header-next-btn').first().click();
        await cell.click();
        await expect(this.page.locator('.ant-picker-dropdown:visible')).toHaveCount(0, {timeout: 10_000});
    }
}
