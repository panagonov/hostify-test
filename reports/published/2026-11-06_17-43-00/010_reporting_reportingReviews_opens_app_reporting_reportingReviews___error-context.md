# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 010-account-pages.spec.ts >> 010 account pages >> reporting › reportingReviews opens (/app/reporting/reportingReviews)
- Location: tests/e2e/010-account-pages.spec.ts:28:13

# Error details

```
Error: the URL of "reportingReviews"

expect(page).toHaveURL(expected) failed

Expected pattern: /\/app\/reporting\/reportingReviews(\/|\?|$)/
Received string:  "https://hostify.bioseek.eu/app/reviewsMenu/internalReviewsMenu/internalReviewsDashboard"
Timeout: 45000ms

Call log:
  - the URL of "reportingReviews" with timeout 45000ms
    48 × unexpected value "https://hostify.bioseek.eu/app/reviewsMenu/internalReviewsMenu/internalReviewsDashboard"

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
          - generic [ref=e148]: Reviews
          - button "left" [ref=e149]:
            - img "left" [ref=e151]:
              - img [ref=e152]
        - generic [ref=e155]:
          - link "Internal right" [ref=e156] [cursor=pointer]:
            - /url: /app/reviewsMenu/internalReviewsMenu
            - generic [ref=e157]: Internal
            - img "right" [ref=e159]:
              - img [ref=e160]
          - link "Dashboard" [ref=e162] [cursor=pointer]:
            - /url: /app/reviewsMenu/internalReviewsMenu/internalReviewsDashboard
            - generic [ref=e163]: Dashboard
          - link "Reviews" [ref=e164] [cursor=pointer]:
            - /url: /app/reviewsMenu/internalReviewsMenu/internalReviews
            - generic [ref=e165]: Reviews
          - link "All reviews" [ref=e166] [cursor=pointer]:
            - /url: /app/reviewsMenu/reviews
            - generic [ref=e167]: All reviews
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
      - img "star" [ref=e198]:
        - img [ref=e199]
      - generic [ref=e201]:
        - navigation [ref=e202]:
          - list [ref=e203]:
            - listitem [ref=e204]:
              - link "Reviews" [ref=e206] [cursor=pointer]:
                - /url: /app/reviewsMenu
            - listitem [ref=e207]: /
            - listitem [ref=e208]:
              - link "Internal" [ref=e210] [cursor=pointer]:
                - /url: /app/reviewsMenu/internalReviewsMenu
            - listitem [ref=e211]: /
            - listitem [ref=e212]:
              - link "Dashboard" [ref=e214] [cursor=pointer]:
                - /url: /app/reviewsMenu/internalReviewsMenu/internalReviewsDashboard
        - generic [ref=e215]: Internal review scores, trends and tags
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
    - generic [ref=e236]:
      - generic [ref=e237]:
        - heading "Internal reviews" [level=3] [ref=e238]
        - generic [ref=e239]:
          - radiogroup "segmented control" [ref=e240]:
            - generic [ref=e241]:
              - generic [ref=e242] [cursor=pointer]:
                - radio "This month"
                - generic "This month" [ref=e243]
              - generic [ref=e244] [cursor=pointer]:
                - radio "Last 3 months"
                - generic "Last 3 months" [ref=e245]
              - generic [ref=e246] [cursor=pointer]:
                - radio "Last 6 months" [checked]
                - generic "Last 6 months" [ref=e247]
          - generic [ref=e248]:
            - textbox "Start date" [ref=e250]: 2026-05-06
            - generic "to" [ref=e252]:
              - img "swap-right" [ref=e253]:
                - img [ref=e254]
            - textbox "End date" [ref=e257]: 2026-11-06
            - generic:
              - img:
                - img
          - generic [ref=e258]:
            - searchbox "Search listing" [ref=e260]
            - button "search" [ref=e262] [cursor=pointer]:
              - img "search" [ref=e264]:
                - img [ref=e265]
          - button "reload" [ref=e267] [cursor=pointer]:
            - img "reload" [ref=e269]:
              - img [ref=e270]
      - generic [ref=e273]:
        - generic [ref=e274]:
          - generic [ref=e276]:
            - generic [ref=e280]:
              - generic [ref=e281]: Review score
              - img "question-circle" [ref=e283]:
                - img [ref=e284]
            - generic [ref=e288]:
              - progressbar [ref=e289]:
                - generic [ref=e294]: —
              - generic [ref=e295]:
                - generic [ref=e296]:
                  - generic [ref=e297]: WoW
                  - generic [ref=e298]: —
                - generic [ref=e299]:
                  - generic [ref=e300]: MoM
                  - generic [ref=e301]: —
                - generic [ref=e302]:
                  - generic [ref=e303]: YoY
                  - generic [ref=e304]: —
          - generic [ref=e306]:
            - generic [ref=e310]:
              - generic [ref=e311]: Top rating KPI
              - img "question-circle" [ref=e313]:
                - img [ref=e314]
            - generic [ref=e318]:
              - progressbar [ref=e319]:
                - generic [ref=e324]: —
              - generic [ref=e325]:
                - generic [ref=e326]:
                  - generic [ref=e327]: WoW
                  - generic [ref=e328]: —
                - generic [ref=e329]:
                  - generic [ref=e330]: MoM
                  - generic [ref=e331]: —
                - generic [ref=e332]:
                  - generic [ref=e333]: YoY
                  - generic [ref=e334]: —
          - generic [ref=e336]:
            - generic [ref=e339]:
              - generic [ref=e340]:
                - generic [ref=e342]: Reviews
                - generic [ref=e344]: "0"
              - text: in the selected range
            - generic [ref=e347]:
              - generic [ref=e348]:
                - generic [ref=e350]: Listings
                - generic [ref=e352]: "0"
              - text: with reviews in the range
        - generic [ref=e353]:
          - generic [ref=e357]:
            - generic [ref=e358]: Rating analytics
            - img "question-circle" [ref=e360]:
              - img [ref=e361]
          - generic [ref=e365]:
            - generic [ref=e367]:
              - generic [ref=e368]: Overall
              - generic [ref=e369]:
                - img "star" [ref=e370]:
                  - img [ref=e371]
                - text: —
              - generic [ref=e373]:
                - generic [ref=e374]:
                  - generic [ref=e375]: WoW
                  - generic [ref=e376]: —
                - generic [ref=e377]:
                  - generic [ref=e378]: MoM
                  - generic [ref=e379]: —
                - generic [ref=e380]:
                  - generic [ref=e381]: YoY
                  - generic [ref=e382]: —
            - generic [ref=e384]:
              - generic [ref=e385]: Accuracy
              - generic [ref=e386]:
                - img "star" [ref=e387]:
                  - img [ref=e388]
                - text: —
              - generic [ref=e390]:
                - generic [ref=e391]:
                  - generic [ref=e392]: WoW
                  - generic [ref=e393]: —
                - generic [ref=e394]:
                  - generic [ref=e395]: MoM
                  - generic [ref=e396]: —
                - generic [ref=e397]:
                  - generic [ref=e398]: YoY
                  - generic [ref=e399]: —
            - generic [ref=e401]:
              - generic [ref=e402]: Check-in
              - generic [ref=e403]:
                - img "star" [ref=e404]:
                  - img [ref=e405]
                - text: —
              - generic [ref=e407]:
                - generic [ref=e408]:
                  - generic [ref=e409]: WoW
                  - generic [ref=e410]: —
                - generic [ref=e411]:
                  - generic [ref=e412]: MoM
                  - generic [ref=e413]: —
                - generic [ref=e414]:
                  - generic [ref=e415]: YoY
                  - generic [ref=e416]: —
            - generic [ref=e418]:
              - generic [ref=e419]: Cleanliness
              - generic [ref=e420]:
                - img "star" [ref=e421]:
                  - img [ref=e422]
                - text: —
              - generic [ref=e424]:
                - generic [ref=e425]:
                  - generic [ref=e426]: WoW
                  - generic [ref=e427]: —
                - generic [ref=e428]:
                  - generic [ref=e429]: MoM
                  - generic [ref=e430]: —
                - generic [ref=e431]:
                  - generic [ref=e432]: YoY
                  - generic [ref=e433]: —
            - generic [ref=e435]:
              - generic [ref=e436]: Communication
              - generic [ref=e437]:
                - img "star" [ref=e438]:
                  - img [ref=e439]
                - text: —
              - generic [ref=e441]:
                - generic [ref=e442]:
                  - generic [ref=e443]: WoW
                  - generic [ref=e444]: —
                - generic [ref=e445]:
                  - generic [ref=e446]: MoM
                  - generic [ref=e447]: —
                - generic [ref=e448]:
                  - generic [ref=e449]: YoY
                  - generic [ref=e450]: —
            - generic [ref=e452]:
              - generic [ref=e453]: Location
              - generic [ref=e454]:
                - img "star" [ref=e455]:
                  - img [ref=e456]
                - text: —
              - generic [ref=e458]:
                - generic [ref=e459]:
                  - generic [ref=e460]: WoW
                  - generic [ref=e461]: —
                - generic [ref=e462]:
                  - generic [ref=e463]: MoM
                  - generic [ref=e464]: —
                - generic [ref=e465]:
                  - generic [ref=e466]: YoY
                  - generic [ref=e467]: —
            - generic [ref=e469]:
              - generic [ref=e470]: Value
              - generic [ref=e471]:
                - img "star" [ref=e472]:
                  - img [ref=e473]
                - text: —
              - generic [ref=e475]:
                - generic [ref=e476]:
                  - generic [ref=e477]: WoW
                  - generic [ref=e478]: —
                - generic [ref=e479]:
                  - generic [ref=e480]: MoM
                  - generic [ref=e481]: —
                - generic [ref=e482]:
                  - generic [ref=e483]: YoY
                  - generic [ref=e484]: —
            - generic [ref=e486]:
              - generic [ref=e487]: Facilities
              - generic [ref=e488]:
                - img "star" [ref=e489]:
                  - img [ref=e490]
                - text: —
              - generic [ref=e492]:
                - generic [ref=e493]:
                  - generic [ref=e494]: WoW
                  - generic [ref=e495]: —
                - generic [ref=e496]:
                  - generic [ref=e497]: MoM
                  - generic [ref=e498]: —
                - generic [ref=e499]:
                  - generic [ref=e500]: YoY
                  - generic [ref=e501]: —
            - generic [ref=e503]:
              - generic [ref=e504]: Comfort
              - generic [ref=e505]:
                - img "star" [ref=e506]:
                  - img [ref=e507]
                - text: —
              - generic [ref=e509]:
                - generic [ref=e510]:
                  - generic [ref=e511]: WoW
                  - generic [ref=e512]: —
                - generic [ref=e513]:
                  - generic [ref=e514]: MoM
                  - generic [ref=e515]: —
                - generic [ref=e516]:
                  - generic [ref=e517]: YoY
                  - generic [ref=e518]: —
            - generic [ref=e520]:
              - generic [ref=e521]: Staff
              - generic [ref=e522]:
                - img "star" [ref=e523]:
                  - img [ref=e524]
                - text: —
              - generic [ref=e526]:
                - generic [ref=e527]:
                  - generic [ref=e528]: WoW
                  - generic [ref=e529]: —
                - generic [ref=e530]:
                  - generic [ref=e531]: MoM
                  - generic [ref=e532]: —
                - generic [ref=e533]:
                  - generic [ref=e534]: YoY
                  - generic [ref=e535]: —
        - generic [ref=e536]:
          - generic [ref=e538]:
            - generic [ref=e541]: Ratings over time
            - generic [ref=e543]:
              - img "No data" [ref=e545]
              - generic [ref=e551]: No data
          - generic [ref=e553]:
            - generic [ref=e556]: Weekly average score against last year
            - generic [ref=e558]:
              - img "No data" [ref=e560]
              - generic [ref=e566]: No data
          - generic [ref=e568]:
            - generic [ref=e571]: Weekly top review rate against last year
            - generic [ref=e573]:
              - img "No data" [ref=e575]
              - generic [ref=e581]: No data
          - generic [ref=e586]: Rating distribution
        - generic [ref=e591]:
          - generic [ref=e593]:
            - generic [ref=e597]:
              - generic [ref=e598]: Top negative tags
              - img "question-circle" [ref=e600]:
                - img [ref=e601]
            - generic [ref=e605]:
              - img "No data" [ref=e607]
              - generic [ref=e613]: No negative tags
          - generic [ref=e615]:
            - generic [ref=e618]: Review tag breakdown
            - generic [ref=e620]:
              - img "No data" [ref=e622]
              - generic [ref=e628]: No tags
        - generic [ref=e629]:
          - generic [ref=e631]:
            - generic [ref=e632]: Listings reviews overview
            - button "download Export" [disabled] [ref=e634]:
              - generic:
                - img "download":
                  - img
              - generic: Export
          - table [ref=e642]:
            - rowgroup [ref=e659]:
              - row "Listing Reviews Overall Top review rate Accuracy Check-in Cleanliness Communication Location Value Facilities Comfort Staff Negative tags Last review" [ref=e660]:
                - columnheader "Listing" [ref=e661] [cursor=pointer]:
                  - generic [ref=e662]:
                    - generic [ref=e663]: Listing
                    - generic [ref=e665]:
                      - img [ref=e666]:
                        - img [ref=e667]
                      - img [ref=e669]:
                        - img [ref=e670]
                - columnheader "Reviews" [ref=e672] [cursor=pointer]:
                  - generic [ref=e673]:
                    - generic [ref=e674]: Reviews
                    - generic [ref=e676]:
                      - img [ref=e677]:
                        - img [ref=e678]
                      - img [ref=e680]:
                        - img [ref=e681]
                - columnheader "Overall" [ref=e683] [cursor=pointer]:
                  - generic [ref=e684]:
                    - generic [ref=e685]: Overall
                    - generic [ref=e687]:
                      - img [ref=e688]:
                        - img [ref=e689]
                      - img [ref=e691]:
                        - img [ref=e692]
                - columnheader "Top review rate" [ref=e694]
                - columnheader "Accuracy" [ref=e695] [cursor=pointer]:
                  - generic [ref=e696]:
                    - generic [ref=e697]: Accuracy
                    - generic [ref=e699]:
                      - img [ref=e700]:
                        - img [ref=e701]
                      - img [ref=e703]:
                        - img [ref=e704]
                - columnheader "Check-in" [ref=e706] [cursor=pointer]:
                  - generic [ref=e707]:
                    - generic [ref=e708]: Check-in
                    - generic [ref=e710]:
                      - img [ref=e711]:
                        - img [ref=e712]
                      - img [ref=e714]:
                        - img [ref=e715]
                - columnheader "Cleanliness" [ref=e717] [cursor=pointer]:
                  - generic [ref=e718]:
                    - generic [ref=e719]: Cleanliness
                    - generic [ref=e721]:
                      - img [ref=e722]:
                        - img [ref=e723]
                      - img [ref=e725]:
                        - img [ref=e726]
                - columnheader "Communication" [ref=e728] [cursor=pointer]:
                  - generic [ref=e729]:
                    - generic [ref=e730]: Communication
                    - generic [ref=e732]:
                      - img [ref=e733]:
                        - img [ref=e734]
                      - img [ref=e736]:
                        - img [ref=e737]
                - columnheader "Location" [ref=e739] [cursor=pointer]:
                  - generic [ref=e740]:
                    - generic [ref=e741]: Location
                    - generic [ref=e743]:
                      - img [ref=e744]:
                        - img [ref=e745]
                      - img [ref=e747]:
                        - img [ref=e748]
                - columnheader "Value" [ref=e750] [cursor=pointer]:
                  - generic [ref=e751]:
                    - generic [ref=e752]: Value
                    - generic [ref=e754]:
                      - img [ref=e755]:
                        - img [ref=e756]
                      - img [ref=e758]:
                        - img [ref=e759]
                - columnheader "Facilities" [ref=e761] [cursor=pointer]:
                  - generic [ref=e762]:
                    - generic [ref=e763]: Facilities
                    - generic [ref=e765]:
                      - img [ref=e766]:
                        - img [ref=e767]
                      - img [ref=e769]:
                        - img [ref=e770]
                - columnheader "Comfort" [ref=e772] [cursor=pointer]:
                  - generic [ref=e773]:
                    - generic [ref=e774]: Comfort
                    - generic [ref=e776]:
                      - img [ref=e777]:
                        - img [ref=e778]
                      - img [ref=e780]:
                        - img [ref=e781]
                - columnheader "Staff" [ref=e783] [cursor=pointer]:
                  - generic [ref=e784]:
                    - generic [ref=e785]: Staff
                    - generic [ref=e787]:
                      - img [ref=e788]:
                        - img [ref=e789]
                      - img [ref=e791]:
                        - img [ref=e792]
                - columnheader "Negative tags" [ref=e794]
                - columnheader "Last review" [ref=e795]
            - rowgroup [ref=e796]:
              - generic [ref=e797]:
                - generic [ref=e798]: Listing
                - generic [ref=e800]:
                  - img [ref=e801]:
                    - img [ref=e802]
                  - img [ref=e804]:
                    - img [ref=e805]
              - generic [ref=e807]:
                - generic [ref=e808]: Reviews
                - generic [ref=e810]:
                  - img [ref=e811]:
                    - img [ref=e812]
                  - img [ref=e814]:
                    - img [ref=e815]
              - generic [ref=e817]:
                - generic [ref=e818]: Overall
                - generic [ref=e820]:
                  - img [ref=e821]:
                    - img [ref=e822]
                  - img [ref=e824]:
                    - img [ref=e825]
              - generic [ref=e827]:
                - generic [ref=e828]: Accuracy
                - generic [ref=e830]:
                  - img [ref=e831]:
                    - img [ref=e832]
                  - img [ref=e834]:
                    - img [ref=e835]
              - generic [ref=e837]:
                - generic [ref=e838]: Check-in
                - generic [ref=e840]:
                  - img [ref=e841]:
                    - img [ref=e842]
                  - img [ref=e844]:
                    - img [ref=e845]
              - generic [ref=e847]:
                - generic [ref=e848]: Cleanliness
                - generic [ref=e850]:
                  - img [ref=e851]:
                    - img [ref=e852]
                  - img [ref=e854]:
                    - img [ref=e855]
              - generic [ref=e857]:
                - generic [ref=e858]: Communication
                - generic [ref=e860]:
                  - img [ref=e861]:
                    - img [ref=e862]
                  - img [ref=e864]:
                    - img [ref=e865]
              - generic [ref=e867]:
                - generic [ref=e868]: Location
                - generic [ref=e870]:
                  - img [ref=e871]:
                    - img [ref=e872]
                  - img [ref=e874]:
                    - img [ref=e875]
              - generic [ref=e877]:
                - generic [ref=e878]: Value
                - generic [ref=e880]:
                  - img [ref=e881]:
                    - img [ref=e882]
                  - img [ref=e884]:
                    - img [ref=e885]
              - generic [ref=e887]:
                - generic [ref=e888]: Facilities
                - generic [ref=e890]:
                  - img [ref=e891]:
                    - img [ref=e892]
                  - img [ref=e894]:
                    - img [ref=e895]
              - generic [ref=e897]:
                - generic [ref=e898]: Comfort
                - generic [ref=e900]:
                  - img [ref=e901]:
                    - img [ref=e902]
                  - img [ref=e904]:
                    - img [ref=e905]
              - generic [ref=e907]:
                - generic [ref=e908]: Staff
                - generic [ref=e910]:
                  - img [ref=e911]:
                    - img [ref=e912]
                  - img [ref=e914]:
                    - img [ref=e915]
              - row "No listings with reviews in this range" [ref=e917]:
                - cell "No listings with reviews in this range" [ref=e918]:
                  - generic [ref=e919]: No listings with reviews in this range
  - generic [ref=e922]:
    - button "Assistant" [ref=e923] [cursor=pointer]:
      - img "message" [ref=e924]:
        - img [ref=e925]
    - button "Support" [ref=e927] [cursor=pointer]:
      - img "customer-service" [ref=e928]:
        - img [ref=e929]
    - button "Audit log" [ref=e931] [cursor=pointer]:
      - img "audit" [ref=e932]:
        - img [ref=e933]
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
     |                                                           ^ Error: the URL of "reportingReviews"
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