import {expect, type Locator, type Page} from '@playwright/test';
import {BasePage} from './BasePage';

const escapeRe = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * The create / edit form of a Hydra grid page (GridController → a drawer, a modal or a FormPage, found by its
 * title). Fields are reached the way a person reaches them — a control's `data-test` (every Hydra form control
 * carries `data-test="<field name>"`) or, for a Search field, its label — and filled through the UI, never through
 * the API: the journeys test the form itself.
 *
 * Save / Cancel: `data-test="form-save"` / `form-cancel` once the client ships them (docs/selectors.md); until then
 * the buttons are found by their text — the fallback is kept in ONE place, here.
 */
export class FormDrawer extends BasePage {
    readonly root: Locator;

    constructor(page: Page, title: string | RegExp) {
        super(page);
        const has = typeof title === 'string' ? page.getByText(title, {exact: true}) : page.getByText(title);
        this.root = page.locator('.ant-drawer-section, .ant-drawer-content, .ant-modal-content, .form-page').filter({has}).last();
    }

    async waitOpen() {
        await expect(this.root).toBeVisible({timeout: 30_000});
        await this.page.waitForTimeout(300);
    }

    /** A tab of the form (FormBuilder renders `data-test="tab-<name>"` on the tab). */
    tab(name: string): Locator {
        return this.root.locator(`[data-test="tab-${name}"]`);
    }

    async openTab(name: string) {
        await this.tab(name).click();
        await this.page.waitForTimeout(200);
    }

    /** The form item whose label reads `label`. */
    formItem(label: string): Locator {
        return this.root.locator('.ant-form-item').filter({
            has: this.page.locator('.ant-form-item-label label', {hasText: new RegExp(`^\\s*${escapeRe(label)}\\s*\\*?\\s*$`)})
        });
    }

    control(dataTest: string): Locator {
        return this.root.locator(`[data-test="${dataTest}"]`);
    }

    /** The names (data-test) of the controls the form shows on its open tab. */
    async controlNames(): Promise<string[]> {
        return this.root.locator('.ant-form-item [data-test]').evaluateAll(els =>
            Array.from(new Set(els.filter(e => (e as HTMLElement).offsetParent !== null).map(e => e.getAttribute('data-test') || ''))).filter(n => n && !n.startsWith('tab-')));
    }

    /** An option of the open select / autocomplete dropdown. */
    option(text: string | RegExp): Locator {
        return this.page.locator('.ant-select-dropdown:visible .ant-select-item-option').filter({hasText: text});
    }

    /** The validation message under a form item. */
    errorOf(label: string): Locator {
        return this.formItem(label).locator('.ant-form-item-explain-error');
    }

    async fill(dataTest: string, value: string) {
        const control = this.control(dataTest);
        const input = (await control.evaluate(e => e.tagName)) === 'INPUT' || (await control.evaluate(e => e.tagName)) === 'TEXTAREA' ? control : control.locator('input, textarea').first();
        await input.fill(value);
    }

    /** A Search field (relation): type, then pick the option — as a person does. */
    async pickSearch(label: string, term: string, option: string | RegExp) {
        const input = this.formItem(label).locator('input').first();
        await input.click();
        await input.fill(term);
        const choice = this.option(option).first();
        await expect(choice, `option "${option}" of ${label}`).toBeVisible({timeout: 20_000});
        await choice.click();
    }

    /** A select (lookup or relation list): open it, pick the option, close the dropdown. */
    async pickSelect(dataTest: string, option: string | RegExp) {
        const control = this.control(dataTest);
        await control.click();
        const search = control.locator('input').first();
        if (typeof option === 'string' && await search.isVisible().catch(() => false) && await search.isEditable().catch(() => false))
            await search.fill(option).catch(() => undefined);
        const choice = this.option(option).first();
        await expect(choice, `option "${option}" of ${dataTest}`).toBeVisible({timeout: 20_000});
        await choice.click();
        await this.page.keyboard.press('Escape');
    }

    /** A select: opens it and picks its FIRST option; returns the option's text. */
    async pickFirst(dataTest: string, option?: RegExp, term?: string): Promise<string> {
        await this.closedDropdowns();
        await this.control(dataTest).click();
        // a relation (search) select loads its options only once something is typed
        if (term) await this.page.keyboard.type(term, {delay: 40});
        const list = this.page.locator('.ant-select-dropdown:visible').last().locator('.ant-select-item-option');
        const choice = (option ? list.filter({hasText: option}) : list).first();
        await expect(choice, `the first option of ${dataTest}`).toBeVisible({timeout: 20_000});
        const text = (await choice.innerText()).trim();
        await choice.click();
        await this.page.keyboard.press('Escape');
        await this.closedDropdowns();
        return text;
    }

    /** Waits until no select dropdown is open (a closing one is still "visible" for its animation). */
    async closedDropdowns() {
        await expect(this.page.locator('.ant-select-dropdown:visible')).toHaveCount(0, {timeout: 10_000});
    }

    /** A select: picks an option OTHER than the one it shows; returns the option's text. */
    async pickOther(dataTest: string): Promise<string> {
        const current = ((await this.control(dataTest).locator('.ant-select-selection-item').first().textContent().catch(() => '')) || '').trim();
        await this.closedDropdowns();
        await this.control(dataTest).click();
        const choice = this.page.locator('.ant-select-dropdown:visible').last().locator('.ant-select-item-option').filter({hasNotText: current || '\u0000'}).first();
        await expect(choice, `an option of ${dataTest} other than "${current}"`).toBeVisible({timeout: 20_000});
        const text = (await choice.innerText()).trim();
        await choice.click();
        await this.page.keyboard.press('Escape');
        await this.closedDropdowns();
        return text;
    }

    /** A field without a data-test (a number box, 1.0.35: Rate (%), Default amount, Cap …), filled by its label. GAP. */
    async fillByLabel(label: string, value: string) {
        const input = this.formItem(label).locator('input, textarea').first();
        await expect(input, `the field "${label}"`).toBeVisible({timeout: 15_000});
        await input.fill(value);
    }

    /** A date box (antd DatePicker): typed as a person types it and confirmed with Enter WHILE its calendar is open (a
     *  typed date that is not confirmed is dropped; an Enter with the calendar closed submits the form — 2026-11-27); the
     *  box must show a date before anything else happens. */
    async fillDate(dataTest: string, isoDay: string) {
        const control = this.control(dataTest);
        const input = (await control.evaluate(e => e.tagName)) === 'INPUT' ? control : control.locator('input').first();
        await input.click();
        const calendar = this.page.locator('.ant-picker-dropdown:visible').last();
        await expect(calendar, `the calendar of ${dataTest}`).toBeVisible({timeout: 10_000});
        // the app's format is DD-MM-YYYY with dashes (QA, 2026-11-27): the day is CLICKED in the calendar under the box,
        // whose month is moved with its > arrow; a cell's title is the day in that format
        const [y, m, d] = isoDay.split('-');
        const shown = `${d}-${m}-${y}`;
        const cell = calendar.locator(`td[title="${shown}"], td[title="${isoDay}"]`).first();
        for (let i = 0; i < 36 && !(await cell.isVisible()); i++)
            await calendar.locator('.ant-picker-header-next-btn').first().click();
        await expect(cell, `the day ${shown} in the calendar of ${dataTest}`).toBeVisible({timeout: 10_000});
        await cell.click();
        await expect(this.page.locator('.ant-picker-dropdown:visible'), `the calendar of ${dataTest} closes`).toHaveCount(0, {timeout: 10_000});
        await expect(input, `${dataTest} shows ${shown}`).toHaveValue(shown);
        return;
        await expect(input, `${dataTest} shows the date`).not.toHaveValue('');
    }

    /** A refusal of Save: a message under a field, or the server's error notice — either one. */
    get refusal(): Locator {
        return this.root.locator('.ant-form-item-explain-error').or(this.page.locator('.ant-notification-notice-error:visible, .ant-message-error:visible, [role=alert]:visible')).first();
    }

    /** A block of texts added by „Add texts“ (Inbox › Message templates, 1.0.36): Language, Subject, Text, Html body — all
     *  required. GAP: no data-test on the block — its controls by their accessible names. */
    async addTexts(o: {language: RegExp; subject: string; text: string; html: string}) {
        await this.root.getByRole('button', {name: /Add texts/}).click();
        const lang = this.root.getByRole('combobox', {name: /Language/}).filter({hasNot: this.page.locator('[aria-label*="Default"]')}).last();
        await lang.click();
        const o1 = this.page.locator('.ant-select-dropdown:visible').last().locator('.ant-select-item-option').filter({hasText: o.language}).first();
        await expect(o1, 'the language of the text').toBeVisible({timeout: 15_000});
        await o1.click();
        await this.closedDropdowns().catch(async () => this.page.keyboard.press('Escape'));
        await this.root.getByRole('textbox', {name: /Subject/}).last().fill(o.subject);
        await this.root.getByRole('textbox', {name: /^\W*Text$/}).last().fill(o.text);
        await this.root.getByRole('textbox', {name: /Html body/}).last().fill(o.html);
    }

    /** The value a text control shows. */
    async valueOf(dataTest: string): Promise<string> {
        const control = this.control(dataTest);
        const input = (await control.evaluate(e => e.tagName)) === 'INPUT' || (await control.evaluate(e => e.tagName)) === 'TEXTAREA' ? control : control.locator('input, textarea').first();
        return input.inputValue();
    }

    /** A switch (boolean field): sets it to `on`. */
    async setSwitch(dataTest: string, on: boolean) {
        const control = this.control(dataTest);
        const checked = (await control.getAttribute('aria-checked')) === 'true';
        if (checked !== on) await control.click();
    }

    get saveButton(): Locator {
        // by text, not by accessible name: after a first click antd keeps a (hidden) loading icon in the button
        return this.root.locator('[data-test="form-save"]').or(this.root.locator('button').filter({hasText: /^\s*Save(\s+and\s+close)?\s*$/}));
    }

    get cancelButton(): Locator {
        return this.root.locator('[data-test="form-cancel"]').or(this.root.locator('button').filter({hasText: /^\s*Cancel\s*$/}));
    }

    async save() {
        await this.saveButton.last().click();
    }

    /** Saves and waits for the drawer to close — a form that stays open has a validation error; it is reported. */
    async saveAndClose() {
        await this.save();
        try {
            await expect(this.root).toBeHidden({timeout: 30_000});
        } catch (e) {
            const errors = await this.root.locator('.ant-form-item-explain-error').allTextContents().catch(() => []);
            const notice = await this.page.locator('.ant-notification-notice-error, .ant-message-error').allTextContents().catch(() => []);
            throw new Error(`the form did not close after Save${errors.length ? ` — validation: ${errors.join(' | ')}` : ''}${notice.length ? ` — notice: ${notice.join(' | ')}` : ''}`);
        }
    }

    async cancel() {
        await this.cancelButton.first().click();
        // a changed form asks "discard?" — confirm
        const confirm = this.page.locator('.ant-popover:visible .ant-btn-primary, [data-test="unsaved-changes-leave"]').first();
        // isVisible() does not wait: the popover appears a moment after the click (QA-480, calm look 2026-11-25) — wait for it
        if (await confirm.waitFor({state: 'visible', timeout: 2_000}).then(() => true, () => false)) await confirm.click();
        await expect(this.root).toBeHidden({timeout: 15_000});
    }
}
