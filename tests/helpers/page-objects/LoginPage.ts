import {expect, type Locator, type Page} from '@playwright/test';
import {BasePage} from './BasePage';

/**
 * The login form (an Ant Design modal shown on every app URL while there is no session).
 * Selectors: the Hydra client's `tools/Selectors.ts` → `login.*`.
 */
export class LoginPage extends BasePage {
    readonly modal: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly alert: Locator;

    constructor(page: Page) {
        super(page);
        // data-test sits on the modal ROOT (a box-less wrapper); the dialog itself is its .ant-modal
        this.modal = this.locator('login-modal').locator('.ant-modal');
        this.emailInput = this.locator('login-input-email');
        this.passwordInput = this.locator('login-input-password');
        this.submitButton = this.locator('login-button');
        this.alert = this.locator('login-alert');
    }

    /** Opens an app URL without a session — the login form appears on it. */
    async navigate(path = '/') {
        await this.goto(path);
        await expect(this.emailInput).toBeVisible({timeout: 45_000});
    }

    /**
     * Fills the form and submits. After a successful login the client redirects to the role's default page and
     * reloads the document once — the method waits for that, so the caller starts on a settled page.
     */
    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        const reload = this.page.waitForEvent('load', {timeout: 10_000}).catch(() => undefined);
        await this.submitButton.click();
        await expect(this.modal).toBeHidden({timeout: 30_000});
        await reload;
        await this.page.waitForURL(url => !/^\/app\/?$/.test(url.pathname), {timeout: 30_000});
        await this.page.waitForLoadState('networkidle', {timeout: 15_000}).catch(() => undefined);
        await this.skipDemoWelcome();
    }

    /**
     * An EMPTY account greets its first visitor with the "Welcome" dialog ("Your workspace is currently empty. We can
     * populate it…", buttons "Skip" / "Generate demo data"). A person skips it; so does the suite — by the Skip
     * button's text, never the primary one: generating the demo would fill the QA account with hundreds of records.
     * (No data-test on the dialog yet — docs/selectors.md → Gaps.)
     */
    async skipDemoWelcome() {
        const welcome = this.page.locator('.ant-modal').filter({hasText: /workspace is currently empty/i});
        if (await welcome.isVisible({timeout: 3000}).catch(() => false)) {
            await welcome.locator('button').filter({hasText: /^\s*Skip\s*$/}).click();
            await expect(welcome).toBeHidden({timeout: 15_000});
        }
    }

    /** Submits credentials that are expected to be refused. */
    async submitInvalid(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }
}
