import {expect, type Locator, type Page} from '@playwright/test';
import {BasePage} from './BasePage';

/**
 * Listings › „Create a new listing“ → the page „New listing“ (`/listingsMenu/listingWizard`, 1.0.31): six steps — General,
 * Layout, Amenities, Texts, Policies, Photos — with Back, Save & Exit, Save & Continue and, on the last, Finish.
 * Save & Continue writes nothing (the wizard keeps its values in the browser until Finish — looked at on 2026-11-26).
 * Never pressed: „Import“ (from a channel's link), Save & Exit, Add photo. „Activate now (PMS Services ON)“ is unticked
 * before Finish (the QA person, 2026-11-26). GAP: no data-test on the wizard — its controls are found by their
 * accessible names (docs/selectors.md → Gaps: `listing-wizard`).
 */
export class ListingWizard extends BasePage {
    constructor(page: Page) { super(page); }

    textbox(name: RegExp): Locator { return this.page.getByRole('textbox', {name}).first(); }
    spin(name: RegExp): Locator { return this.page.getByRole('spinbutton', {name}).first(); }
    combo(name: RegExp): Locator { return this.page.getByRole('combobox', {name}).first(); }
    get errors(): Locator { return this.page.locator('.ant-form-item-explain-error'); }
    get activeStep(): Locator { return this.page.locator('.ant-steps-item-process .ant-steps-item-title').first(); }
    get next(): Locator { return this.page.getByRole('button', {name: /Save & Continue/}); }
    get back(): Locator { return this.page.getByRole('button', {name: /^\s*(arrow-left\s+)?Back\s*$/}); }
    get finish(): Locator { return this.page.getByRole('button', {name: /Finish/}); }
    get activateNow(): Locator { return this.page.getByRole('checkbox', {name: /Activate now/}); }

    async waitOpen() { await expect(this.textbox(/Listing nickname/), 'the wizard opens on General').toBeVisible({timeout: 30_000}); }

    /** A select of the wizard: opens it, types `term` (when given) and picks the option matching `option`. */
    async pick(name: RegExp, option: RegExp, term?: string) {
        await this.combo(name).click();
        if (term) await this.page.keyboard.type(term, {delay: 50});
        const choice = this.page.locator('.ant-select-dropdown:visible').last().locator('.ant-select-item-option').filter({hasText: option}).first();
        await expect(choice, `the option ${option} of ${name}`).toBeVisible({timeout: 20_000});
        await choice.click();
        await expect(this.page.locator('.ant-select-dropdown:visible')).toHaveCount(0, {timeout: 10_000}).catch(async () => this.page.keyboard.press('Escape'));
    }

    /** Save & Continue and the step it lands on. */
    async continueTo(step: RegExp) {
        await this.next.click();
        await expect(this.activeStep, `the wizard moves on to ${step}`).toHaveText(step, {timeout: 20_000});
    }

    /** Ticks the amenity of that name (a checkbox of the Amenities step). */
    async amenity(name: RegExp) { await this.page.getByRole('checkbox', {name}).first().check(); }
}
