# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 010-account-pages.spec.ts >> 010 account pages >> reporting › bookingOptimizer opens (/app/reporting/bookingOptimizer)
- Location: tests/e2e/010-account-pages.spec.ts:28:13

# Error details

```
Error: submenu node "bookingOptimizer"

expect(locator).toBeVisible() failed

Locator: locator('.cc-submenu-slide-panel').locator('[data-test="bookingOptimizer"]')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - submenu node "bookingOptimizer" with timeout 30000ms
  - waiting for locator('.cc-submenu-slide-panel').locator('[data-test="bookingOptimizer"]')

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
        - link [ref=e12] [cursor=pointer]:
          - /url: /app/dashboards
          - img [ref=e16]:
            - img [ref=e17]
        - img [ref=e23] [cursor=pointer]:
          - img [ref=e24]
        - link [ref=e26] [cursor=pointer]:
          - /url: /app/multiCalendar
          - img [ref=e30]:
            - img [ref=e31]
        - img [ref=e37] [cursor=pointer]:
          - img [ref=e38]
        - img [ref=e44] [cursor=pointer]:
          - img [ref=e45]
        - img [ref=e51] [cursor=pointer]:
          - img [ref=e52]
        - link [ref=e54] [cursor=pointer]:
          - /url: /app/guests
          - img [ref=e58]:
            - img [ref=e59]
        - img [ref=e65] [cursor=pointer]:
          - img [ref=e66]
        - img [ref=e72] [cursor=pointer]:
          - img [ref=e73]
        - img [ref=e79] [cursor=pointer]:
          - img [ref=e80]
        - img [ref=e86] [cursor=pointer]:
          - img [ref=e87]
        - img [ref=e93] [cursor=pointer]:
          - img [ref=e94]
        - img [ref=e100] [cursor=pointer]:
          - img [ref=e101]
        - img [ref=e107] [cursor=pointer]:
          - img [ref=e108]
        - img [ref=e114] [cursor=pointer]:
          - img [ref=e115]
        - img [ref=e121] [cursor=pointer]:
          - img [ref=e122]
        - img "hdd" [ref=e128] [cursor=pointer]:
          - img [ref=e129]
        - img "audit" [ref=e135] [cursor=pointer]:
          - img [ref=e136]
        - img [ref=e142] [cursor=pointer]:
          - img [ref=e143]
      - generic [ref=e146]:
        - generic [ref=e147] [cursor=pointer]:
          - generic [ref=e148]: Reporting
          - button "left" [ref=e149]:
            - img "left" [ref=e151]:
              - img [ref=e152]
        - generic [ref=e155]:
          - link "Overview" [ref=e156] [cursor=pointer]:
            - /url: /app/reporting/reportingOverview
            - generic [ref=e157]: Overview
          - link "Listing performance" [ref=e158] [cursor=pointer]:
            - /url: /app/reporting/pivotGrid
            - generic [ref=e159]: Listing performance
          - link "Inbox reports" [ref=e160] [cursor=pointer]:
            - /url: /app/reporting/inboxReports
            - generic [ref=e161]: Inbox reports
          - link "Housekeeping" [ref=e162] [cursor=pointer]:
            - /url: /app/reporting/reportingHousekeeping
            - generic [ref=e163]: Housekeeping
          - link "Channel Health" [ref=e164] [cursor=pointer]:
            - /url: /app/reporting/channelHealth
            - generic [ref=e165]: Channel Health
          - link "Reviews" [ref=e166] [cursor=pointer]:
            - /url: /app/reporting/reportingReviews
            - generic [ref=e167]: Reviews
          - link "Registrations" [ref=e168] [cursor=pointer]:
            - /url: /app/reporting/guestCheckins
            - generic [ref=e169]: Registrations
          - link "Registered guests" [ref=e170] [cursor=pointer]:
            - /url: /app/reporting/checkinGuests
            - generic [ref=e171]: Registered guests
    - generic [ref=e172]:
      - generic [ref=e173]:
        - generic [ref=e174] [cursor=pointer]:
          - img [ref=e177]:
            - img [ref=e178]
          - generic [ref=e180]: Support
        - generic [ref=e181] [cursor=pointer]:
          - img [ref=e184]:
            - img [ref=e185]
          - generic [ref=e187]: Notifications
      - generic [ref=e188]:
        - button "Collapse menu" [expanded] [ref=e189] [cursor=pointer]:
          - img "double-left" [ref=e190]:
            - img [ref=e191]
        - button "v 1.0.6" [ref=e193] [cursor=pointer]
  - generic [ref=e194]:
    - banner [ref=e195]:
      - button "arrow-left" [ref=e196] [cursor=pointer]:
        - img "arrow-left" [ref=e198]:
          - img [ref=e199]
      - img "pie-chart" [ref=e202]:
        - img [ref=e203]
      - generic [ref=e205]:
        - navigation [ref=e206]:
          - list [ref=e207]:
            - listitem [ref=e208]:
              - link "Reporting" [ref=e210] [cursor=pointer]:
                - /url: /app/reporting
            - listitem [ref=e211]: /
            - listitem [ref=e212]:
              - link "Overview" [ref=e214] [cursor=pointer]:
                - /url: /app/reporting/reportingOverview
        - generic [ref=e215]: Key performance figures and saved reporting views
      - button "search Search everything… ⌘K" [ref=e216] [cursor=pointer]:
        - img "search" [ref=e217]:
          - img [ref=e218]
        - generic [ref=e220]: Search everything…
        - generic [ref=e221]: ⌘K
      - button "Dark theme" [ref=e222] [cursor=pointer]:
        - img "moon" [ref=e224]:
          - img [ref=e225]
      - generic [ref=e227] [cursor=pointer]:
        - img "user" [ref=e230]:
          - img [ref=e231]
        - generic [ref=e234]: QA Admin
    - generic [ref=e237]:
      - generic [ref=e238]:
        - generic [ref=e240] [cursor=pointer]:
          - generic "Reporting — Default" [ref=e241]:
            - text: Reporting — Default
            - combobox [ref=e242]
          - img "down" [ref=e244]:
            - img [ref=e245]
        - generic [ref=e248]:
          - img "star" [ref=e249]:
            - img [ref=e250]
          - text: Default
        - button "plus Save as new view" [ref=e253] [cursor=pointer]:
          - img "plus" [ref=e255]:
            - img [ref=e256]
          - generic [ref=e259]: Save as new view
        - generic [ref=e261] [cursor=pointer]:
          - generic [ref=e262]:
            - generic: View period
            - combobox [ref=e263]
          - img "down" [ref=e265]:
            - img [ref=e266]
        - generic [ref=e269] [cursor=pointer]:
          - generic [ref=e270]:
            - generic: Comparison
            - combobox [ref=e271]
          - img "down" [ref=e273]:
            - img [ref=e274]
        - generic [ref=e277] [cursor=pointer]:
          - generic [ref=e278]:
            - generic: Group
            - combobox [ref=e279]
          - img "down" [ref=e281]:
            - img [ref=e282]
        - generic [ref=e285] [cursor=pointer]:
          - generic [ref=e286]:
            - generic: Revenue allocation
            - combobox [ref=e287]
          - img "down" [ref=e289]:
            - img [ref=e290]
        - button "search Inspect data" [ref=e293] [cursor=pointer]:
          - img "search" [ref=e295]:
            - img [ref=e296]
          - generic [ref=e298]: Inspect data
        - button "export Export page CSV" [ref=e300] [cursor=pointer]:
          - img "export" [ref=e302]:
            - img [ref=e303]
          - generic [ref=e305]: Export page CSV
      - generic [ref=e306]:
        - generic [ref=e307]:
          - generic [ref=e308]:
            - tablist [ref=e310]:
              - tab "This month" [selected] [ref=e311] [cursor=pointer]
              - tab "Last month" [ref=e312] [cursor=pointer]
              - tab "This year" [ref=e313] [cursor=pointer]
              - tab "Last year" [ref=e314] [cursor=pointer]
              - tab "Last 30 days" [ref=e315] [cursor=pointer]
              - tab "Last 7 days" [ref=e316] [cursor=pointer]
              - tab "Year to date" [ref=e317] [cursor=pointer]
              - tab "Last 90 days" [ref=e318] [cursor=pointer]
              - tab "Last 365 days" [ref=e319] [cursor=pointer]
              - tab "This week" [ref=e320] [cursor=pointer]
              - tab "Previous week" [ref=e321] [cursor=pointer]
              - tab "calendar" [ref=e322] [cursor=pointer]:
                - img "calendar" [ref=e323]:
                  - img [ref=e324]
              - button "Your own periods — add, rename or remove" [ref=e326] [cursor=pointer]:
                - img "plus" [ref=e327]:
                  - img [ref=e328]
            - generic [ref=e331] [cursor=pointer]:
              - generic [ref=e332]:
                - generic: Owner
                - combobox [ref=e333]
              - img "down" [ref=e335]:
                - img [ref=e336]
            - generic [ref=e338] [cursor=pointer]:
              - generic [ref=e339]:
                - generic: Listing
                - combobox [ref=e340]
              - img "down" [ref=e342]:
                - img [ref=e343]
            - generic [ref=e345] [cursor=pointer]:
              - generic [ref=e346]:
                - generic: City
                - combobox [ref=e347]
              - img "down" [ref=e349]:
                - img [ref=e350]
            - generic [ref=e352] [cursor=pointer]:
              - generic [ref=e353]:
                - generic: Tag
                - combobox [ref=e354]
              - img "down" [ref=e356]:
                - img [ref=e357]
            - generic [ref=e359] [cursor=pointer]:
              - generic [ref=e360]:
                - generic: Channel
                - combobox [ref=e361]
              - img "down" [ref=e363]:
                - img [ref=e364]
            - generic [ref=e366]:
              - generic "EUR · EUR" [ref=e367]:
                - text: EUR · EUR
                - combobox "Currency" [disabled] [ref=e368]
              - img "down" [ref=e370]:
                - img [ref=e371]
          - generic [ref=e373]:
            - button "download Export" [ref=e374] [cursor=pointer]:
              - img "download" [ref=e376]:
                - img [ref=e377]
              - generic [ref=e379]: Export
            - button "edit Edit" [ref=e382] [cursor=pointer]:
              - img "edit" [ref=e384]:
                - img [ref=e385]
              - generic [ref=e387]: Edit
        - generic [ref=e390]:
          - generic [ref=e391]:
            - generic [ref=e392]: Reporting — Default
            - generic [ref=e393]: "Reporting v2 default view over the nightly fact: KPI cards, the revenue overview against targets, occupancy, RevPAR, ADR, average reservation value, length of stay, days in advance and guests, revenue by channel and by type."
          - generic [ref=e394]:
            - generic [ref=e396]:
              - generic [ref=e398]: Gross revenue (pro-rated)
              - generic "emptySlice" [ref=e400]:
                - generic [ref=e401]: No data for this selection yet
            - generic [ref=e403]:
              - generic [ref=e405]: Booked nights
              - generic "emptySlice" [ref=e407]:
                - generic [ref=e408]: No data for this selection yet
            - generic [ref=e410]:
              - generic [ref=e412]: Occupancy rate
              - generic "emptySlice" [ref=e414]:
                - generic [ref=e415]: No data for this selection yet
            - generic [ref=e417]:
              - generic [ref=e419]: ADR
              - generic "emptySlice" [ref=e421]:
                - generic [ref=e422]: No data for this selection yet
            - generic [ref=e424]:
              - generic [ref=e425]:
                - generic [ref=e426]: Revenue overview
                - generic [ref=e427]: gross, net and owner revenue (pro-rated) — the original's Revenue Overview
              - generic [ref=e430]: No data in the selected period
            - generic [ref=e432]:
              - generic [ref=e433]:
                - generic [ref=e434]: Revenue vs target
                - generic [ref=e435]: gross revenue (pro-rated) against the listings' monthly targets
              - generic [ref=e439]: No data in the selected period
            - generic [ref=e441]:
              - generic [ref=e442]:
                - generic [ref=e443]: Occupancy
                - generic [ref=e444]: booked nights ÷ available nights
              - generic [ref=e447]: No data in the selected period
            - generic [ref=e449]:
              - generic [ref=e450]:
                - generic [ref=e451]: RevPAR
                - generic [ref=e452]: base price ÷ available nights
              - generic [ref=e455]: No data in the selected period
            - generic [ref=e457]:
              - generic [ref=e458]:
                - generic [ref=e459]: ADR
                - generic [ref=e460]: base price ÷ booked nights
              - generic [ref=e463]: No data in the selected period
            - generic [ref=e465]:
              - generic [ref=e466]:
                - generic [ref=e467]: Avg. reservation value
                - generic [ref=e468]: gross revenue ÷ reservations (by check-in)
              - generic [ref=e471]: No data in the selected period
            - generic [ref=e473]:
              - generic [ref=e474]:
                - generic [ref=e475]: Avg. length of stay
                - generic [ref=e476]: nights ÷ reservations (by check-in)
              - generic [ref=e479]: No data in the selected period
            - generic [ref=e481]:
              - generic [ref=e482]:
                - generic [ref=e483]: Avg. days in advance
                - generic [ref=e484]: days from booking to check-in ÷ reservations
              - generic [ref=e487]: No data in the selected period
            - generic [ref=e489]:
              - generic [ref=e490]:
                - generic [ref=e491]: Avg. guests per reservation
                - generic [ref=e492]: guests ÷ check-ins
              - generic [ref=e495]: No data in the selected period
            - generic [ref=e497]:
              - generic [ref=e499]: Revenue by channel
              - generic [ref=e503]:
                - generic:
                  - generic: "0"
            - generic [ref=e509]:
              - generic [ref=e510]:
                - generic [ref=e511]: Revenue by type
                - generic [ref=e512]: accommodation and fees (cleaning and other fees)
              - generic [ref=e515]: No data in the selected period
  - generic [ref=e518]:
    - button "Assistant" [ref=e519] [cursor=pointer]:
      - img "message" [ref=e520]:
        - img [ref=e521]
    - button "Support" [ref=e523] [cursor=pointer]:
      - img "customer-service" [ref=e524]:
        - img [ref=e525]
    - button "Audit log" [ref=e527] [cursor=pointer]:
      - img "audit" [ref=e528]:
        - img [ref=e529]
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
     |                                                        ^ Error: submenu node "bookingOptimizer"
  55 |             const className = (await node.getAttribute('class')) || '';
  56 |             if (className.includes('cc-submenu-item--group') && className.includes('is-open')) continue;
  57 |             await node.click();
  58 |         }
  59 |     }
  60 | }
  61 | 
```