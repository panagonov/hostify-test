# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 010-account-pages.spec.ts >> 010 account pages >> pricing › pricingExtras opens (/app/pricing/pricingExtras)
- Location: tests/e2e/010-account-pages.spec.ts:28:13

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-test="login-input-email"]')
Expected: visible
Timeout: 45000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 45000ms
  - waiting for locator('[data-test="login-input-email"]')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - heading "502 Bad Gateway" [level=1] [ref=e3]
  - separator [ref=e4]
  - generic [ref=e5]: nginx
```

# Test source

```ts
  1  | import {expect, type Locator, type Page} from '@playwright/test';
  2  | import {BasePage} from './BasePage';
  3  | 
  4  | /**
  5  |  * The login form (an Ant Design modal shown on every app URL while there is no session).
  6  |  * Selectors: the Hydra client's `tools/Selectors.ts` → `login.*`.
  7  |  */
  8  | export class LoginPage extends BasePage {
  9  |     readonly modal: Locator;
  10 |     readonly emailInput: Locator;
  11 |     readonly passwordInput: Locator;
  12 |     readonly submitButton: Locator;
  13 |     readonly alert: Locator;
  14 | 
  15 |     constructor(page: Page) {
  16 |         super(page);
  17 |         // data-test sits on the modal ROOT (a box-less wrapper); the dialog itself is its .ant-modal
  18 |         this.modal = this.locator('login-modal').locator('.ant-modal');
  19 |         this.emailInput = this.locator('login-input-email');
  20 |         this.passwordInput = this.locator('login-input-password');
  21 |         this.submitButton = this.locator('login-button');
  22 |         this.alert = this.locator('login-alert');
  23 |     }
  24 | 
  25 |     /** Opens an app URL without a session — the login form appears on it. */
  26 |     async navigate(path = '/') {
  27 |         await this.goto(path);
> 28 |         await expect(this.emailInput).toBeVisible({timeout: 45_000});
     |                                       ^ Error: expect(locator).toBeVisible() failed
  29 |     }
  30 | 
  31 |     /**
  32 |      * Fills the form and submits. After a successful login the client redirects to the role's default page and
  33 |      * reloads the document once — the method waits for that, so the caller starts on a settled page.
  34 |      */
  35 |     async login(email: string, password: string) {
  36 |         await this.emailInput.fill(email);
  37 |         await this.passwordInput.fill(password);
  38 |         const reload = this.page.waitForEvent('load', {timeout: 10_000}).catch(() => undefined);
  39 |         await this.submitButton.click();
  40 |         await expect(this.modal).toBeHidden({timeout: 30_000});
  41 |         await reload;
  42 |         await this.page.waitForURL(url => !/^\/app\/?$/.test(url.pathname), {timeout: 30_000});
  43 |         await this.page.waitForLoadState('networkidle', {timeout: 15_000}).catch(() => undefined);
  44 |         await this.skipDemoWelcome();
  45 |         // after the immediate one: a handler registered before would take the dialog from under skipDemoWelcome's click
  46 |         await this.watchDemoWelcome();
  47 |     }
  48 | 
  49 |     /**
  50 |      * The demo-data dialogs of the platform, dismissed the way a person dismisses them:
  51 |      * - an EMPTY account greets its first visitor with "Welcome" ("Your workspace is currently empty. We can populate
  52 |      *   it…", buttons "Skip" / "Generate demo data") — Skip, never the primary one: generating the demo would fill the
  53 |      *   QA account with hundreds of records;
  54 |      * - an account whose records are demo records (every record the suite creates is one, since the server stamps the
  55 |      *   suite's `x-demo-data` header) greets with "Demo data is ready" ("Your workspace was set up with a realistic
  56 |      *   sample dataset…", button "OK") — OK.
  57 |      * (No data-test on either dialog yet — docs/selectors.md → Gaps.)
  58 |      */
  59 |     async skipDemoWelcome() {
  60 |         const dialog = this.demoWelcome;
  61 |         if (await dialog.isVisible({timeout: 3000}).catch(() => false)) {
  62 |             await dialog.locator('button').filter({hasText: /^\s*(Skip|OK)\s*$/}).first().click();
  63 |             await expect(dialog).toBeHidden({timeout: 15_000});
  64 |         }
  65 |     }
  66 | 
  67 |     private get demoWelcome(): Locator {
  68 |         return this.page.locator('.ant-modal').filter({hasText: /workspace (is currently empty|was set up with a realistic sample)/i});
  69 |     }
  70 | 
  71 |     /**
  72 |      * The demo dialogs come when the demo status answers — often seconds after the sign-in, after the 3 s of
  73 |      * skipDemoWelcome — and then cover the menu the next click needs. Playwright's locator handler dismisses
  74 |      * them whenever they appear before an action (once per page).
  75 |      */
  76 |     private static watched = new WeakSet<Page>();
  77 |     async watchDemoWelcome() {
  78 |         if (LoginPage.watched.has(this.page)) return;
  79 |         LoginPage.watched.add(this.page);
  80 |         const dialog = this.demoWelcome;
  81 |         await this.page.addLocatorHandler(dialog, async () => {
  82 |             await dialog.locator('button').filter({hasText: /^\s*(Skip|OK)\s*$/}).first().click();
  83 |             await expect(dialog).toBeHidden({timeout: 15_000});
  84 |         });
  85 |     }
  86 | 
  87 |     /** Submits credentials that are expected to be refused. */
  88 |     async submitInvalid(email: string, password: string) {
  89 |         await this.emailInput.fill(email);
  90 |         await this.passwordInput.fill(password);
  91 |         await this.submitButton.click();
  92 |     }
  93 | }
  94 | 
```