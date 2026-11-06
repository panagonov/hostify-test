# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 010-account-pages.spec.ts >> 010 account pages >> reporting › reportingHousekeeping opens (/app/reporting/reportingHousekeeping)
- Location: tests/e2e/010-account-pages.spec.ts:28:13

# Error details

```
Error: the URL of "reportingHousekeeping"

expect(page).toHaveURL(expected) failed

Expected pattern: /\/app\/reporting\/reportingHousekeeping(\/|\?|$)/
Received string:  "https://hostify.bioseek.eu/app/operations/housekeepingBoard"
Timeout: 45000ms

Call log:
  - the URL of "reportingHousekeeping" with timeout 45000ms
    48 × unexpected value "https://hostify.bioseek.eu/app/operations/housekeepingBoard"

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
          - generic [ref=e148]: Tasks
          - button "left" [ref=e149]:
            - img "left" [ref=e151]:
              - img [ref=e152]
        - generic [ref=e155]:
          - link "Tasks" [ref=e156] [cursor=pointer]:
            - /url: /app/operations/tasks
            - generic [ref=e157]: Tasks
          - link "Housekeeping" [ref=e158] [cursor=pointer]:
            - /url: /app/operations/housekeepingBoard
            - generic [ref=e159]: Housekeeping
          - link "Tasks dashboard" [ref=e160] [cursor=pointer]:
            - /url: /app/operations/taskDashboard
            - generic [ref=e161]: Tasks dashboard
          - link "Issues" [ref=e162] [cursor=pointer]:
            - /url: /app/operations/taskIssues
            - generic [ref=e163]: Issues
          - link "My tasks" [ref=e164] [cursor=pointer]:
            - /url: /app/operations/myTasks
            - generic [ref=e165]: My tasks
          - link "Templates" [ref=e166] [cursor=pointer]:
            - /url: /app/operations/taskTemplates
            - generic [ref=e167]: Templates
          - link "Assignments" [ref=e168] [cursor=pointer]:
            - /url: /app/operations/defaultAssignments
            - generic [ref=e169]: Assignments
          - link "Teams" [ref=e170] [cursor=pointer]:
            - /url: /app/operations/taskTeams
            - generic [ref=e171]: Teams
          - link "Notifications" [ref=e172] [cursor=pointer]:
            - /url: /app/operations/taskNotificationSettings
            - generic [ref=e173]: Notifications
          - link "Operations calendar" [ref=e174] [cursor=pointer]:
            - /url: /app/operations/calendar
            - generic [ref=e175]: Operations calendar
          - link "Task expenses" [ref=e176] [cursor=pointer]:
            - /url: /app/operations/taskExpenses
            - generic [ref=e177]: Task expenses
    - generic [ref=e178]:
      - generic [ref=e179]:
        - generic [ref=e180] [cursor=pointer]:
          - img [ref=e183]:
            - img [ref=e184]
          - generic [ref=e186]: Support
        - generic [ref=e187] [cursor=pointer]:
          - img [ref=e190]:
            - img [ref=e191]
          - generic [ref=e193]: Notifications
      - generic [ref=e194]:
        - button "Collapse menu" [expanded] [ref=e195] [cursor=pointer]:
          - img "double-left" [ref=e196]:
            - img [ref=e197]
        - button "v 1.0.6" [ref=e199] [cursor=pointer]
  - generic [ref=e200]:
    - banner [ref=e201]:
      - button "arrow-left" [ref=e202] [cursor=pointer]:
        - img "arrow-left" [ref=e204]:
          - img [ref=e205]
      - img [ref=e208]:
        - img [ref=e209]
      - generic [ref=e211]:
        - navigation [ref=e212]:
          - list [ref=e213]:
            - listitem [ref=e214]:
              - link "Tasks" [ref=e216] [cursor=pointer]:
                - /url: /app/operations
            - listitem [ref=e217]: /
            - listitem [ref=e218]:
              - link "Housekeeping" [ref=e220] [cursor=pointer]:
                - /url: /app/operations/housekeepingBoard
        - generic [ref=e221]: Cleaning and maintenance tasks on a board by status
      - button "search Search everything… ⌘K" [ref=e222] [cursor=pointer]:
        - img "search" [ref=e223]:
          - img [ref=e224]
        - generic [ref=e226]: Search everything…
        - generic [ref=e227]: ⌘K
      - button "Dark theme" [ref=e228] [cursor=pointer]:
        - img "moon" [ref=e230]:
          - img [ref=e231]
      - generic [ref=e233] [cursor=pointer]:
        - img "user" [ref=e236]:
          - img [ref=e237]
        - generic [ref=e240]: QA Admin
    - generic [ref=e242]:
      - generic [ref=e243]:
        - radiogroup "segmented control" [ref=e245]:
          - generic [ref=e246]:
            - generic [ref=e247] [cursor=pointer]:
              - radio "Housekeeping" [checked]
              - generic "Housekeeping" [ref=e248]
            - generic [ref=e249] [cursor=pointer]:
              - radio "Board"
              - generic "Board" [ref=e250]
            - generic [ref=e251] [cursor=pointer]:
              - radio "Activity"
              - generic "Activity" [ref=e252]
        - generic [ref=e256]:
          - generic [ref=e258]: Overdue tasks
          - generic [ref=e259]:
            - img "warning" [ref=e261]:
              - img [ref=e262]
            - generic [ref=e264]: "0"
      - generic [ref=e266]:
        - generic [ref=e267]:
          - radiogroup "segmented control" [ref=e269]:
            - generic [ref=e270]:
              - generic [ref=e271] [cursor=pointer]:
                - radio "Yesterday"
                - generic "Yesterday" [ref=e272]
              - generic [ref=e273] [cursor=pointer]:
                - radio "Today" [checked]
                - generic "Today" [ref=e274]
              - generic [ref=e275] [cursor=pointer]:
                - radio "Tomorrow"
                - generic "Tomorrow" [ref=e276]
              - generic [ref=e277] [cursor=pointer]:
                - radio "In the next"
                - generic "In the next" [ref=e278]
              - generic [ref=e279] [cursor=pointer]:
                - radio "Between"
                - generic "Between" [ref=e280]
          - generic [ref=e282]:
            - generic [ref=e283]:
              - generic "Check out" [ref=e285]:
                - generic [ref=e286]: Check out
                - img [ref=e288] [cursor=pointer]:
                  - img [ref=e289]
              - generic:
                - generic: Check out / check in
                - generic:
                  - img:
                    - img
              - generic "+ 1 ..." [ref=e292]:
                - generic [ref=e293]: + 1 ...
              - combobox [ref=e295]
            - img "down" [ref=e297]:
              - img [ref=e298]
            - img "close-circle" [ref=e301] [cursor=pointer]:
              - img [ref=e302]
          - generic [ref=e305]:
            - searchbox "Listing or address" [ref=e307]
            - button "search" [ref=e309] [cursor=pointer]:
              - img "search" [ref=e311]:
                - img [ref=e312]
          - generic [ref=e315]:
            - generic [ref=e316]:
              - spinbutton "Nights from" [ref=e317]
              - generic:
                - button "Increase Value" [ref=e318] [cursor=pointer]:
                  - img "up" [ref=e319]:
                    - img [ref=e320]
                - button "Decrease Value" [ref=e322] [cursor=pointer]:
                  - img "down" [ref=e323]:
                    - img [ref=e324]
            - generic [ref=e326]:
              - spinbutton "to" [ref=e327]
              - generic:
                - button "Increase Value" [ref=e328] [cursor=pointer]:
                  - img "up" [ref=e329]:
                    - img [ref=e330]
                - button "Decrease Value" [ref=e332] [cursor=pointer]:
                  - img "down" [ref=e333]:
                    - img [ref=e334]
          - textbox "Cleaning notes" [ref=e338]
          - generic [ref=e341] [cursor=pointer]:
            - checkbox "With notes" [ref=e343]
            - generic [ref=e344]: With notes
          - generic [ref=e346]:
            - generic [ref=e347] [cursor=pointer]:
              - generic [ref=e348]:
                - generic: Saved views
                - combobox [ref=e349]
              - img "down" [ref=e351]:
                - img [ref=e352]
            - button "+ Add view" [ref=e354] [cursor=pointer]:
              - generic [ref=e355]: + Add view
          - button "download Export CSV" [disabled] [ref=e357]:
            - generic:
              - img "download":
                - img
            - generic: Export CSV
          - button "share-alt Share" [ref=e359] [cursor=pointer]:
            - img "share-alt" [ref=e361]:
              - img [ref=e362]
            - generic [ref=e364]: Share
        - table [ref=e373]:
          - rowgroup [ref=e386]:
            - row "Date Listing Property status Type Time Guests Beds Nights Cleaning notes Tags Cleaning task Cost" [ref=e387]:
              - columnheader "Date" [ref=e388]
              - columnheader "Listing" [ref=e389]
              - columnheader "Property status" [ref=e390]
              - columnheader "Type" [ref=e391]
              - columnheader "Time" [ref=e392]
              - columnheader "Guests" [ref=e393]
              - columnheader "Beds" [ref=e394]
              - columnheader "Nights" [ref=e395]
              - columnheader "Cleaning notes"
              - columnheader "Tags" [ref=e396]
              - columnheader "Cleaning task" [ref=e397]
              - columnheader "Cost" [ref=e398]
          - rowgroup [ref=e399]:
            - row "Nothing in this period" [ref=e400]:
              - cell "Nothing in this period" [ref=e401]:
                - generic [ref=e402]: Nothing in this period
  - generic [ref=e407]:
    - generic [ref=e408]:
      - img "Assistant" [ref=e409]
      - generic [ref=e410]:
        - generic [ref=e412]: Assistant
        - generic [ref=e413]: live context
      - button "plus" [ref=e415] [cursor=pointer]:
        - img "plus" [ref=e416]:
          - img [ref=e417]
      - button "history" [ref=e420] [cursor=pointer]:
        - img "history" [ref=e421]:
          - img [ref=e422]
      - button "close" [ref=e424] [cursor=pointer]:
        - img "close" [ref=e425]:
          - img [ref=e426]
    - generic [ref=e431]:
      - img [ref=e433]
      - paragraph [ref=e437]:
        - text: Ask me anything about your data — I can
        - strong [ref=e438]: find records
        - text: ","
        - strong [ref=e439]: answer questions
        - text: and
        - strong [ref=e440]: run quick analyses
        - text: . Type
        - code [ref=e441]: "#"
        - text: to reference an entity.
    - generic [ref=e444]:
      - generic [ref=e445]:
        - generic [ref=e447]:
          - generic: Drop a document, or ask anything…
          - textbox [ref=e448]
        - generic [ref=e449]:
          - img "paper-clip" [ref=e451] [cursor=pointer]:
            - img [ref=e452]
          - button "audio" [ref=e454] [cursor=pointer]:
            - img "audio" [ref=e455]:
              - img [ref=e456]
          - button "send" [disabled] [ref=e458]:
            - img "send" [ref=e459]:
              - img [ref=e460]
      - generic [ref=e463]: "Enter sends · Shift+Enter breaks · # references an entity"
  - generic [ref=e466]:
    - button "Assistant" [ref=e467] [cursor=pointer]:
      - img "message" [ref=e468]:
        - img [ref=e469]
    - button "Support" [ref=e471] [cursor=pointer]:
      - img "customer-service" [ref=e472]:
        - img [ref=e473]
    - button "Audit log" [ref=e475] [cursor=pointer]:
      - img "audit" [ref=e476]:
        - img [ref=e477]
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
     |                                                           ^ Error: the URL of "reportingHousekeeping"
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