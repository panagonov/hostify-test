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
        if (await confirm.isVisible({timeout: 1000}).catch(() => false)) await confirm.click();
        await expect(this.root).toBeHidden({timeout: 15_000});
    }
}
