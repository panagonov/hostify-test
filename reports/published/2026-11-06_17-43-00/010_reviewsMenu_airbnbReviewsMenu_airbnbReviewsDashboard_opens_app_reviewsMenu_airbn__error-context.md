# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 010-account-pages.spec.ts >> 010 account pages >> reviewsMenu › airbnbReviewsMenu › airbnbReviewsDashboard opens (/app/reviewsMenu/airbnbReviewsMenu/airbnbReviewsDashboard)
- Location: tests/e2e/010-account-pages.spec.ts:28:13

# Error details

```
Error: submenu node "airbnbReviewsMenu"

expect(locator).toBeVisible() failed

Locator: locator('.cc-submenu-slide-panel').locator('[data-test="airbnbReviewsMenu"]')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - submenu node "airbnbReviewsMenu" with timeout 30000ms
  - waiting for locator('.cc-submenu-slide-panel').locator('[data-test="airbnbReviewsMenu"]')

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic [ref=e5]:
    - link "logo" [ref=e7] [cursor=pointer]:
      - /url: /app/dashboards/
      - img "logo" [ref=e8]
    - generic [ref=e9]:
      - generic [ref=e11]:
        - link "Dashboard" [ref=e12] [cursor=pointer]:
          - /url: /app/dashboards
          - generic [ref=e13]:
            - img [ref=e16]:
              - img [ref=e17]
            - generic [ref=e19]: Dashboard
        - generic [ref=e21] [cursor=pointer]:
          - img [ref=e24]:
            - img [ref=e25]
          - generic [ref=e27]: Inbox
        - link "Calendar" [ref=e28] [cursor=pointer]:
          - /url: /app/multiCalendar
          - generic [ref=e29]:
            - img [ref=e32]:
              - img [ref=e33]
            - generic [ref=e35]: Calendar
        - generic [ref=e37] [cursor=pointer]:
          - img [ref=e40]:
            - img [ref=e41]
          - generic [ref=e43]: Tasks
        - generic [ref=e45] [cursor=pointer]:
          - img [ref=e48]:
            - img [ref=e49]
          - generic [ref=e51]: Reservations
        - generic [ref=e53] [cursor=pointer]:
          - img [ref=e56]:
            - img [ref=e57]
          - generic [ref=e59]: Listings
        - link "Guests" [ref=e60] [cursor=pointer]:
          - /url: /app/guests
          - generic [ref=e61]:
            - img [ref=e64]:
              - img [ref=e65]
            - generic [ref=e67]: Guests
        - generic [ref=e69] [cursor=pointer]:
          - img [ref=e72]:
            - img [ref=e73]
          - generic [ref=e75]: Reporting
        - generic [ref=e77] [cursor=pointer]:
          - img [ref=e80]:
            - img [ref=e81]
          - generic [ref=e83]: Reviews
        - generic [ref=e85] [cursor=pointer]:
          - img [ref=e88]:
            - img [ref=e89]
          - generic [ref=e91]: Pricing
        - generic [ref=e93] [cursor=pointer]:
          - img [ref=e96]:
            - img [ref=e97]
          - generic [ref=e99]: Owners
        - generic [ref=e101] [cursor=pointer]:
          - img [ref=e104]:
            - img [ref=e105]
          - generic [ref=e107]: Finance
        - generic [ref=e109] [cursor=pointer]:
          - img [ref=e112]:
            - img [ref=e113]
          - generic [ref=e115]: Automations
        - generic [ref=e117] [cursor=pointer]:
          - img [ref=e120]:
            - img [ref=e121]
          - generic [ref=e123]: Channels
        - generic [ref=e125] [cursor=pointer]:
          - img [ref=e128]:
            - img [ref=e129]
          - generic [ref=e131]: Apps
        - generic [ref=e133] [cursor=pointer]:
          - img [ref=e136]:
            - img [ref=e137]
          - generic [ref=e139]: Other features
        - generic [ref=e141] [cursor=pointer]:
          - img "hdd" [ref=e144]:
            - img [ref=e145]
          - generic [ref=e147]: Custom data
        - generic [ref=e149] [cursor=pointer]:
          - img "audit" [ref=e152]:
            - img [ref=e153]
          - generic [ref=e155]: Usage
        - generic [ref=e157] [cursor=pointer]:
          - img [ref=e160]:
            - img [ref=e161]
          - generic [ref=e163]: Settings
      - button "left" [ref=e167] [cursor=pointer]:
        - img "left" [ref=e169]:
          - img [ref=e170]
    - generic [ref=e174]:
      - generic [ref=e175]:
        - generic [ref=e176] [cursor=pointer]:
          - img [ref=e179]:
            - img [ref=e180]
          - generic [ref=e182]: Support
        - generic [ref=e183] [cursor=pointer]:
          - img [ref=e186]:
            - img [ref=e187]
          - generic [ref=e189]: Notifications
      - generic [ref=e190]:
        - button "Collapse menu" [expanded] [ref=e191] [cursor=pointer]:
          - img "double-left" [ref=e192]:
            - img [ref=e193]
        - button "v 1.0.6" [ref=e195] [cursor=pointer]
  - generic [ref=e196]:
    - banner [ref=e197]:
      - button "arrow-left" [ref=e198] [cursor=pointer]:
        - img "arrow-left" [ref=e200]:
          - img [ref=e201]
      - img "star" [ref=e204]:
        - img [ref=e205]
      - generic [ref=e207]:
        - navigation [ref=e208]:
          - list [ref=e209]:
            - listitem [ref=e210]:
              - link "Airbnb" [ref=e212] [cursor=pointer]:
                - /url: /app/airbnbReviewsMenu
        - generic [ref=e213]: Airbnb reviews
      - button "search Search everything… ⌘K" [ref=e214] [cursor=pointer]:
        - img "search" [ref=e215]:
          - img [ref=e216]
        - generic [ref=e218]: Search everything…
        - generic [ref=e219]: ⌘K
      - button "Dark theme" [ref=e220] [cursor=pointer]:
        - img "moon" [ref=e222]:
          - img [ref=e223]
      - generic [ref=e225] [cursor=pointer]:
        - img "user" [ref=e228]:
          - img [ref=e229]
        - generic [ref=e232]: QA Admin
    - generic [ref=e235]:
      - img "No Found" [ref=e237]
      - generic [ref=e291]: Error 404
      - generic [ref=e292]: Page not found
      - button "Go Back" [ref=e294] [cursor=pointer]:
        - generic [ref=e295]: Go Back
  - generic [ref=e298]:
    - button "Assistant" [ref=e299] [cursor=pointer]:
      - img "message" [ref=e300]:
        - img [ref=e301]
    - button "Support" [ref=e303] [cursor=pointer]:
      - img "customer-service" [ref=e304]:
        - img [ref=e305]
    - button "Audit log" [ref=e307] [cursor=pointer]:
      - img "audit" [ref=e308]:
        - img [ref=e309]
```

# Test source

```ts
  1  | import {expect, type Locator, type Page} from '@playwright/test';
  2  | import {BasePage} from './BasePage';
  3  | 
  4  | /**
  5  |  * The left navigation: the main bar (`.cc-sidebar`, one `data-test="<groupId>"` link per top-level node) and the
  6  |  * slide-in submenu (`.cc-submenu-slide-panel`, `data-test="<pageId>"` per page; a nested group opens inside it).
  7  |  */
  8  | export class Sidebar extends BasePage {
  9  |     readonly bar: Locator;
  10 |     readonly submenu: Locator;
  11 | 
  12 |     constructor(page: Page) {
  13 |         super(page);
  14 |         this.bar = page.locator('.cc-sidebar');
  15 |         this.submenu = page.locator('.cc-submenu-slide-panel');
  16 |     }
  17 | 
  18 |     group(id: string): Locator {
  19 |         return this.bar.locator(`[data-test="${id}"]`);
  20 |     }
  21 | 
  22 |     item(id: string): Locator {
  23 |         return this.submenu.locator(`[data-test="${id}"]`);
  24 |     }
  25 | 
  26 |     get submenuTitle(): Locator {
  27 |         return this.submenu.locator('.cc-submenu-slide-panel__title');
  28 |     }
  29 | 
  30 |     /** The ids of every top-level node the signed-in role sees. */
  31 |     async groupIds(): Promise<string[]> {
  32 |         await expect(this.bar).toBeVisible({timeout: 45_000});
  33 |         return this.bar.locator('[data-test]').evaluateAll(els => els.map(e => e.getAttribute('data-test') || '').filter(Boolean));
  34 |     }
  35 | 
  36 |     /** Opens a top-level node; a group shows its submenu, a page navigates. */
  37 |     async openGroup(id: string) {
  38 |         const node = this.group(id);
  39 |         await expect(node, `menu node "${id}"`).toBeVisible({timeout: 30_000});
  40 |         await node.click();
  41 |         // a person moves on: the pointer left on the icon keeps its tooltip ("App settings") open over the submenu's
  42 |         // second row, and that row's click never lands — the pointer goes to the submenu's title
  43 |         if (await this.submenuTitle.isVisible().catch(() => false)) await this.submenuTitle.hover();
  44 |     }
  45 | 
  46 |     /**
  47 |      * Clicks a page of the open submenu (through its nested groups, outermost first). A nested group
  48 |      * (`.cc-submenu-item--group`) TOGGLES on click: one that is already open (`is-open`) is left alone, else a second
  49 |      * visit would fold it and hide the page.
  50 |      */
  51 |     async openItem(path: string[]) {
  52 |         for (const id of path) {
  53 |             const node = this.item(id);
> 54 |             await expect(node, `submenu node "${id}"`).toBeVisible({timeout: 30_000});
     |                                                        ^ Error: submenu node "airbnbReviewsMenu"
  55 |             const className = (await node.getAttribute('class')) || '';
  56 |             if (className.includes('cc-submenu-item--group') && className.includes('is-open')) continue;
  57 |             await node.click();
  58 |         }
  59 |     }
  60 | }
  61 | 
```