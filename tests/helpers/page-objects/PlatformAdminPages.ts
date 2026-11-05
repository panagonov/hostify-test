import {expect, type Page} from '@playwright/test';
import {GridPage} from './GridPage';
import {FormDrawer} from './FormDrawer';

/**
 * Platform Admin ▸ Accounts (`/app/platformAdmin/tenants`, entity `tenant`) and ▸ Users (`/app/platformAdmin/users`,
 * entity `user`) — the super administrator's pages that the first journeys drive.
 */
export class TenantsPage extends GridPage {
    constructor(page: Page) {
        super(page, 'tenant');
    }

    async navigate() {
        await this.goto('/platformAdmin/tenants');
        await this.waitLoaded();
    }

    async openCreateForm(): Promise<TenantForm> {
        await expect(this.createButton).toBeVisible({timeout: 30_000});
        await this.createButton.click();
        const form = new TenantForm(this.page);
        await form.waitOpen();
        return form;
    }
}

export class TenantForm extends FormDrawer {
    constructor(page: Page) {
        super(page, /^Create (a new )?(tenant|account)$/);
    }
}

export class UsersPage extends GridPage {
    constructor(page: Page) {
        super(page, 'user');
    }

    async navigate() {
        await this.goto('/platformAdmin/users');
        await this.waitLoaded();
    }

    async openCreateForm(): Promise<UserForm> {
        await expect(this.createButton).toBeVisible({timeout: 30_000});
        await this.createButton.click();
        const form = new UserForm(this.page);
        await form.waitOpen();
        return form;
    }
}

export class UserForm extends FormDrawer {
    constructor(page: Page) {
        super(page, /^Create (a new )?user$/);
    }

    /** The password control (the `passwordGenerator` component: a password input with a generate button). */
    get password() {
        return this.control('password').locator('input').first().or(this.formItem('Password').locator('input').first());
    }
}
