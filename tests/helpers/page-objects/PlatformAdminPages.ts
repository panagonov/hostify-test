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

/**
 * The support pages of the platform console (since 1.0.7): Platform Admin › Support people (`supportAgents`, in the
 * menu) and Queue / Proposals (`supportQueue`, `supportProposals` — on 2026-11-09 NOT in the super administrator's
 * menu; reached by their address). Seen and never changed by the suite: nothing is created, answered or assigned.
 * The entity names are not confirmed on production (the pages were not open to the suite): the tests use the grid's
 * layout and the probe only, never `waitForSearch`.
 */
export const SUPPORT_PAGES = {
    supportAgents: {path: '/platformAdmin/supportAgents', entity: 'supportAgent', title: 'Support people'},
    supportQueue: {path: '/platformAdmin/supportQueue', entity: 'supportTopic', title: 'Queue'},
    supportProposals: {path: '/platformAdmin/supportProposals', entity: 'supportProposal', title: 'Proposals'}
} as const;

export class SupportPage extends GridPage {
    readonly path: string;

    constructor(page: Page, which: keyof typeof SUPPORT_PAGES) {
        super(page, SUPPORT_PAGES[which].entity);
        this.path = SUPPORT_PAGES[which].path;
    }

    /** The page's own "Page not found" (an ant-result 404 under the page's title). */
    get notFound() {
        return this.page.locator('.ant-result-404').or(this.page.getByText(/^Page not found$/)).first();
    }

    /** The red notices at the top of the page (1.0.10: an AI service fails — which, why, its message, since when). */
    get errorNotices() {
        return this.page.locator('.ant-alert-error:visible');
    }

    async navigate() {
        await this.goto(this.path);
    }

    /** The page has rendered what it will show: its grid, an empty state, or its "Page not found" — never judged before. */
    async waitRendered(timeout = 45_000) {
        await expect(this.table.or(this.notFound).or(this.page.locator('.ant-empty:visible')).first(), `the page ${this.path} renders`).toBeVisible({timeout});
        await this.waitForSpinners();
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
