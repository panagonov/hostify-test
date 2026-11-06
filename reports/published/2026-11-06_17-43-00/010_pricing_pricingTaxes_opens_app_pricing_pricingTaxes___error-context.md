# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 010-account-pages.spec.ts >> 010 account pages >> pricing › pricingTaxes opens (/app/pricing/pricingTaxes)
- Location: tests/e2e/010-account-pages.spec.ts:28:13

# Error details

```
Error: the URL of "pricingTaxes"

expect(page).toHaveURL(expected) failed

Expected pattern: /\/app\/pricing\/pricingTaxes(\/|\?|$)/
Received string:  "https://hostify.bioseek.eu/app/pricing/feeTemplates?feeItemType=_or&feeItemType=tax"
Timeout: 45000ms

Call log:
  - the URL of "pricingTaxes" with timeout 45000ms
    48 × unexpected value "https://hostify.bioseek.eu/app/pricing/feeTemplates?feeItemType=_or&feeItemType=tax"

```

# Page snapshot

```yaml
- generic [ref=e1]:
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
            - generic [ref=e148]: Pricing
            - button "left" [ref=e149]:
              - img "left" [ref=e151]:
                - img [ref=e152]
          - generic [ref=e155]:
            - link "Base Price" [ref=e156] [cursor=pointer]:
              - /url: /app/pricing/pricingBasePrice
              - generic [ref=e157]: Base Price
            - link "Fees" [ref=e158] [cursor=pointer]:
              - /url: /app/pricing/pricingFees
              - generic [ref=e159]: Fees
            - link "Taxes" [active] [ref=e160] [cursor=pointer]:
              - /url: /app/pricing/pricingTaxes
              - generic [ref=e161]: Taxes
            - link "Extras" [ref=e162] [cursor=pointer]:
              - /url: /app/pricing/pricingExtras
              - generic [ref=e163]: Extras
            - link "Costs" [ref=e164] [cursor=pointer]:
              - /url: /app/pricing/pricingCosts
              - generic [ref=e165]: Costs
            - link "Lodging taxes" [ref=e166] [cursor=pointer]:
              - /url: /app/pricing/taxRules
              - generic [ref=e167]: Lodging taxes
      - generic [ref=e168]:
        - generic [ref=e169]:
          - generic [ref=e170] [cursor=pointer]:
            - img [ref=e173]:
              - img [ref=e174]
            - generic [ref=e176]: Support
          - generic [ref=e177] [cursor=pointer]:
            - img [ref=e180]:
              - img [ref=e181]
            - generic [ref=e183]: Notifications
        - generic [ref=e184]:
          - button "Collapse menu" [expanded] [ref=e185] [cursor=pointer]:
            - img "double-left" [ref=e186]:
              - img [ref=e187]
          - button "v 1.0.6" [ref=e189] [cursor=pointer]
    - generic [ref=e190]:
      - banner [ref=e191]:
        - button "arrow-left" [ref=e192] [cursor=pointer]:
          - img "arrow-left" [ref=e194]:
            - img [ref=e195]
        - img "profile" [ref=e198]:
          - img [ref=e199]
        - generic [ref=e201]:
          - navigation [ref=e202]:
            - list [ref=e203]:
              - listitem [ref=e204]:
                - link "Pricing" [ref=e206] [cursor=pointer]:
                  - /url: /app/pricing
              - listitem [ref=e207]: /
              - listitem [ref=e208]:
                - link "Fee templates" [ref=e210] [cursor=pointer]:
                  - /url: /app/pricing/feeTemplates
          - generic [ref=e211]: Reusable sets of fees linked to many listings
        - button "search Search everything… ⌘K" [ref=e212] [cursor=pointer]:
          - img "search" [ref=e213]:
            - img [ref=e214]
          - generic [ref=e216]: Search everything…
          - generic [ref=e217]: ⌘K
        - button "Dark theme" [ref=e218] [cursor=pointer]:
          - img "moon" [ref=e220]:
            - img [ref=e221]
        - generic [ref=e223] [cursor=pointer]:
          - img "user" [ref=e226]:
            - img [ref=e227]
          - generic [ref=e230]: QA Admin
      - generic [ref=e233]:
        - generic [ref=e234]:
          - tablist [ref=e235]:
            - generic [ref=e237]:
              - generic [ref=e238] [cursor=pointer]:
                - tab "Default" [ref=e239]:
                  - generic [ref=e240]: Default
                - button "remove" [ref=e241]
              - generic [ref=e242] [cursor=pointer]:
                - tab "Accommodation" [ref=e243]:
                  - generic [ref=e244]: Accommodation
                - button "remove" [ref=e245]
              - generic [ref=e246] [cursor=pointer]:
                - tab "Costs" [ref=e247]:
                  - generic [ref=e248]: Costs
                - button "remove" [ref=e249]
              - generic [ref=e250] [cursor=pointer]:
                - tab "Costs" [ref=e251]:
                  - generic [ref=e252]: Costs
                - button "remove" [ref=e253]
              - generic [ref=e254] [cursor=pointer]:
                - tab "Costs" [ref=e255]:
                  - generic [ref=e256]: Costs
                - button "remove" [ref=e257]
              - generic [ref=e258] [cursor=pointer]:
                - tab "Extras" [ref=e259]:
                  - generic [ref=e260]: Extras
                - button "remove" [ref=e261]
              - generic [ref=e262] [cursor=pointer]:
                - tab "Extras" [ref=e263]:
                  - generic [ref=e264]: Extras
                - button "remove" [ref=e265]
              - generic [ref=e266] [cursor=pointer]:
                - tab "Fees" [ref=e267]:
                  - generic [ref=e268]: Fees
                - button "remove" [ref=e269]
              - generic [ref=e270] [cursor=pointer]:
                - tab "Fees" [ref=e271]:
                  - generic [ref=e272]: Fees
                - button "remove" [ref=e273]
              - generic [ref=e274] [cursor=pointer]:
                - tab "Taxes" [ref=e275]:
                  - generic [ref=e276]: Taxes
                - button "remove" [ref=e277]
              - generic [ref=e278] [cursor=pointer]:
                - tab "Taxes" [ref=e279]:
                  - generic [ref=e280]: Taxes
                - button "remove" [ref=e281]
              - generic [ref=e282] [cursor=pointer]:
                - tab "link URL filter" [selected] [ref=e283]:
                  - generic [ref=e284]:
                    - img "link" [ref=e286]:
                      - img [ref=e287]
                    - text: URL filter
                - button "remove" [ref=e289]:
                  - img "close" [ref=e290]:
                    - img [ref=e291]
          - generic:
            - generic:
              - tabpanel "link URL filter"
        - button "Add card 0 / 5" [ref=e294] [cursor=pointer]:
          - generic [ref=e295]: Add card
          - generic [ref=e296]: 0 / 5
        - generic [ref=e300]:
          - generic [ref=e302]:
            - generic [ref=e303]:
              - img "search" [ref=e304]:
                - img [ref=e305]
              - generic [ref=e307]:
                - superscript [ref=e308]:
                  - generic [ref=e310]: "1"
                - button "filter Saved filters" [ref=e311] [cursor=pointer]:
                  - img "filter" [ref=e313]:
                    - img [ref=e314]
                  - generic [ref=e316]: Saved filters
              - textbox "Search" [ref=e317]
              - button "close Clear all" [ref=e318] [cursor=pointer]:
                - img "close" [ref=e320]:
                  - img [ref=e321]
                - generic [ref=e323]: Clear all
              - button "book Save as" [ref=e324] [cursor=pointer]:
                - img "book" [ref=e326]:
                  - img [ref=e327]
                - generic [ref=e329]: Save as
            - button "plus-circle Create a new fee template" [ref=e330] [cursor=pointer]:
              - img "plus-circle" [ref=e332]:
                - img [ref=e333]
              - generic [ref=e336]: Create a new fee template
            - button "export Export down" [ref=e337] [cursor=pointer]:
              - generic [ref=e338]:
                - img "export" [ref=e340]:
                  - img [ref=e341]
                - generic [ref=e343]: Export
                - img "down" [ref=e345]:
                  - img [ref=e346]
            - button "layout Customize view" [ref=e348] [cursor=pointer]:
              - img "layout" [ref=e350]:
                - img [ref=e351]
              - generic [ref=e353]: Customize view
          - generic [ref=e354]:
            - table [ref=e356]:
              - rowgroup [ref=e368]:
                - row "Name Type Currency Country Properties filter Description search Status Date created" [ref=e369]:
                  - columnheader [ref=e370]
                  - columnheader "Name" [ref=e371] [cursor=pointer]:
                    - generic [ref=e372]:
                      - generic [ref=e374]:
                        - generic [ref=e375]: Name
                        - generic [ref=e377]:
                          - img [ref=e378]:
                            - img [ref=e379]
                          - img [ref=e381]:
                            - img [ref=e382]
                      - button "search" [ref=e384]:
                        - button "search" [ref=e385]:
                          - img "search" [ref=e387]:
                            - img [ref=e388]
                  - columnheader "Type" [ref=e391] [cursor=pointer]:
                    - generic [ref=e392]:
                      - generic [ref=e394]:
                        - generic [ref=e395]: Type
                        - generic [ref=e397]:
                          - img [ref=e398]:
                            - img [ref=e399]
                          - img [ref=e401]:
                            - img [ref=e402]
                      - button "filter" [ref=e404]:
                        - button "filter" [ref=e405]:
                          - img "filter" [ref=e407]:
                            - img [ref=e408]
                  - columnheader "Currency" [ref=e411] [cursor=pointer]:
                    - generic [ref=e412]:
                      - generic [ref=e414]:
                        - generic [ref=e415]: Currency
                        - generic [ref=e417]:
                          - img [ref=e418]:
                            - img [ref=e419]
                          - img [ref=e421]:
                            - img [ref=e422]
                      - button "filter" [ref=e424]:
                        - button "filter" [ref=e425]:
                          - img "filter" [ref=e427]:
                            - img [ref=e428]
                  - columnheader "Country" [ref=e431] [cursor=pointer]:
                    - generic [ref=e432]:
                      - generic [ref=e434]:
                        - generic [ref=e435]: Country
                        - generic [ref=e437]:
                          - img [ref=e438]:
                            - img [ref=e439]
                          - img [ref=e441]:
                            - img [ref=e442]
                      - button "filter" [ref=e444]:
                        - button "filter" [ref=e445]:
                          - img "filter" [ref=e447]:
                            - img [ref=e448]
                  - columnheader "Properties filter" [ref=e451]:
                    - generic [ref=e452]:
                      - generic [ref=e453]: Properties
                      - button "filter" [ref=e454] [cursor=pointer]:
                        - button "filter" [ref=e455]:
                          - img "filter" [ref=e457]:
                            - img [ref=e458]
                  - columnheader "Description search" [ref=e461]:
                    - generic [ref=e462]:
                      - generic [ref=e463]: Description
                      - button "search" [ref=e464] [cursor=pointer]:
                        - button "search" [ref=e465]:
                          - img "search" [ref=e467]:
                            - img [ref=e468]
                  - columnheader "Status" [ref=e471] [cursor=pointer]:
                    - generic [ref=e472]:
                      - generic [ref=e474]:
                        - generic [ref=e475]: Status
                        - generic [ref=e477]:
                          - img [ref=e478]:
                            - img [ref=e479]
                          - img [ref=e481]:
                            - img [ref=e482]
                      - button "filter" [ref=e484]:
                        - button "filter" [ref=e485]:
                          - img "filter" [ref=e487]:
                            - img [ref=e488]
                  - columnheader "Date created" [ref=e491] [cursor=pointer]:
                    - generic [ref=e492]:
                      - generic [ref=e494]:
                        - generic [ref=e495]: Date created
                        - generic [ref=e497]:
                          - img [ref=e498]:
                            - img [ref=e499]
                          - img [ref=e501]:
                            - img [ref=e502]
                      - button "filter" [ref=e504]:
                        - button "filter" [ref=e505]:
                          - img "filter" [ref=e507]:
                            - img [ref=e508]
                  - columnheader [ref=e511]
                  - columnheader
            - table [ref=e514]:
              - rowgroup [ref=e526]:
                - generic [ref=e527]:
                  - generic [ref=e529]:
                    - generic [ref=e530]: Name
                    - generic [ref=e532]:
                      - img [ref=e533]:
                        - img [ref=e534]
                      - img [ref=e536]:
                        - img [ref=e537]
                  - button [ref=e539] [cursor=pointer]:
                    - button [ref=e540]:
                      - img [ref=e542]:
                        - img [ref=e543]
                - generic [ref=e545]:
                  - generic [ref=e547]:
                    - generic [ref=e548]: Type
                    - generic [ref=e550]:
                      - img [ref=e551]:
                        - img [ref=e552]
                      - img [ref=e554]:
                        - img [ref=e555]
                  - button [ref=e557] [cursor=pointer]:
                    - button [ref=e558]:
                      - img [ref=e560]:
                        - img [ref=e561]
                - generic [ref=e563]:
                  - generic [ref=e565]:
                    - generic [ref=e566]: Currency
                    - generic [ref=e568]:
                      - img [ref=e569]:
                        - img [ref=e570]
                      - img [ref=e572]:
                        - img [ref=e573]
                  - button [ref=e575] [cursor=pointer]:
                    - button [ref=e576]:
                      - img [ref=e578]:
                        - img [ref=e579]
                - generic [ref=e581]:
                  - generic [ref=e583]:
                    - generic [ref=e584]: Country
                    - generic [ref=e586]:
                      - img [ref=e587]:
                        - img [ref=e588]
                      - img [ref=e590]:
                        - img [ref=e591]
                  - button [ref=e593] [cursor=pointer]:
                    - button [ref=e594]:
                      - img [ref=e596]:
                        - img [ref=e597]
                - generic [ref=e599]:
                  - generic [ref=e600]: Properties
                  - button [ref=e601] [cursor=pointer]:
                    - button [ref=e602]:
                      - img [ref=e604]:
                        - img [ref=e605]
                - generic [ref=e607]:
                  - generic [ref=e608]: Description
                  - button [ref=e609] [cursor=pointer]:
                    - button [ref=e610]:
                      - img [ref=e612]:
                        - img [ref=e613]
                - generic [ref=e615]:
                  - generic [ref=e617]:
                    - generic [ref=e618]: Status
                    - generic [ref=e620]:
                      - img [ref=e621]:
                        - img [ref=e622]
                      - img [ref=e624]:
                        - img [ref=e625]
                  - button [ref=e627] [cursor=pointer]:
                    - button [ref=e628]:
                      - img [ref=e630]:
                        - img [ref=e631]
                - generic [ref=e633]:
                  - generic [ref=e635]:
                    - generic [ref=e636]: Date created
                    - generic [ref=e638]:
                      - img [ref=e639]:
                        - img [ref=e640]
                      - img [ref=e642]:
                        - img [ref=e643]
                  - button [ref=e645] [cursor=pointer]:
                    - button [ref=e646]:
                      - img [ref=e648]:
                        - img [ref=e649]
                - row "No data No data" [ref=e651]:
                  - cell "No data No data" [ref=e652]:
                    - generic [ref=e654]:
                      - img "No data" [ref=e656]
                      - generic [ref=e662]: No data
    - generic [ref=e665]:
      - button "Assistant" [ref=e666] [cursor=pointer]:
        - img "message" [ref=e667]:
          - img [ref=e668]
      - button "Support" [ref=e670] [cursor=pointer]:
        - img "customer-service" [ref=e671]:
          - img [ref=e672]
      - button "Audit log" [ref=e674] [cursor=pointer]:
        - img "audit" [ref=e675]:
          - img [ref=e676]
  - generic [ref=e678]:
    - dialog:
      - generic [ref=e681]:
        - img "close-circle" [ref=e683]:
          - img [ref=e684]
        - generic [ref=e686]: The connection to the server has been lost
        - generic [ref=e687]: This is usually due to a new version of the application being uploaded. The process takes about 2 minutes. This window will close automatically when the connection is restored.
```

# Test source

```ts
  1  | import {expect, type Browser, type BrowserContext, type Page, type TestInfo} from '@playwright/test';
  2  | import {probePage, expectPresentable, type ProbeResult} from './probe';
  3  | import {Sidebar} from './page-objects/Sidebar';
  4  | import {LoginPage} from './page-objects/LoginPage';
  5  | import {credentialsOf, type SignInWho} from './fixtures';
  6  | import {clicksFor, type NavPage} from './navigation';
  7  | import {waitForPageData} from './settle';
  8  | 
  9  | /**
  10 |  * The page sweep: ONE browser window per spec file (signing in before every page would cost more than the pages),
  11 |  * every page of the menu opened THROUGH THE MENU — the group in the bar, then the nodes of the submenu — and probed.
  12 |  * The spec hands this window to every test as its `page` (`test.use({page, context})`), so the automatic console
  13 |  * fixture listens on it per test and no blank window opens per test; a person watches one window the whole time.
  14 |  */
  15 | export class SweepSession {
  16 |     context!: BrowserContext;
  17 |     page!: Page;
  18 |     sidebar!: Sidebar;
  19 |     /** Who is signed in — part of every "how to reproduce". */
  20 |     who: SignInWho = 'admin';
  21 |     email = '';
  22 | 
  23 |     static async open(browser: Browser, who: SignInWho): Promise<SweepSession> {
  24 |         const s = new SweepSession();
  25 |         s.context = await browser.newContext({extraHTTPHeaders: {'x-demo-data': '1'}, viewport: {width: 1600, height: 1000}, locale: 'en-GB'});
  26 |         s.page = await s.context.newPage();
  27 |         s.sidebar = new Sidebar(s.page);
  28 |         const {email, password} = credentialsOf(who);
  29 |         s.who = who;
  30 |         s.email = email;
  31 |         const login = new LoginPage(s.page);
  32 |         await login.navigate();
  33 |         await login.login(email, password);
  34 |         return s;
  35 |     }
  36 | 
  37 |     async close() {
  38 |         await this.context?.close();
  39 |     }
  40 | 
  41 |     /** The fixtures a sweep spec hands to its tests: the session's window as `page` and `context`. */
  42 |     static fixturesOf(get: () => SweepSession) {
  43 |         return {
  44 |             page: async ({}: {}, use: (page: Page) => Promise<void>) => { await use(get().page); },
  45 |             context: async ({}: {}, use: (context: BrowserContext) => Promise<void>) => { await use(get().context); }
  46 |         };
  47 |     }
  48 | 
  49 |     /** Opens a menu page by clicking, waits for it to settle, probes it; the automatic console fixture judges the console. */
  50 |     async visit(nav: NavPage, testInfo: TestInfo): Promise<ProbeResult> {
  51 |         const {group, items} = clicksFor(nav);
  52 |         // the menu texts a person reads, collected as they are clicked — the "how to reproduce" of a failure
  53 |         const labels: string[] = [];
  54 |         const labelOf = async (locator: ReturnType<Sidebar['group']>) => ((await locator.first().innerText().catch(() => '')) || '').split('\n')[0].trim();
  55 |         await this.sidebar.openGroup(group);
  56 |         // the bar shows icons only: the group's text is the title of the submenu it opens (a page without one keeps its link text)
  57 |         labels.push(await labelOf(this.sidebar.submenuTitle) || await labelOf(this.sidebar.group(group)) || group);
  58 |         for (const id of items) labels.push(await labelOf(this.sidebar.item(id)) || id);
  59 |         if (items.length) await this.sidebar.openItem(items);
  60 |         await testInfo.attach('repro.json', {body: JSON.stringify({
  61 |             role: this.who, email: this.email, menu: labels, menuIds: nav.menuPath, url: `${this.page.url().split('/app/')[0]}${nav.path}`
  62 |         }), contentType: 'application/json'});
> 63 |         await expect(this.page, `the URL of "${nav.id}"`).toHaveURL(new RegExp(`${nav.path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(/|\\?|$)`), {timeout: 45_000});
     |                                                           ^ Error: the URL of "pricingTaxes"
  64 |         // the page is loaded when its DATA is on the screen (rows, cards, columns, widgets) or its "No data" indicator —
  65 |         // a page that shows neither within the time fails here, with the reason
  66 |         const state = await waitForPageData(this.page);
  67 |         const result = await probePage(this.page, testInfo, nav.id);
  68 |         result.stats.rows = state.rows;
  69 |         result.stats.empty = state.empty ? 1 : 0;
  70 |         await testInfo.attach('page-data.json', {body: JSON.stringify({page: nav.id, ...state}), contentType: 'application/json'});
  71 |         expectPresentable(result);
  72 |         return result;
  73 |     }
  74 | }
  75 | 
```