# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 005-platform-pages.spec.ts >> 005 platform pages >> apps › paymentProcessorAccounts opens (/app/apps/paymentProcessorAccounts)
- Location: tests/e2e/005-platform-pages.spec.ts:28:13

# Error details

```
Error: The page reported 1 error(s) — API answers, failed requests, console errors:
- [api.status] POST 403 @ https://hostify.bioseek.eu/api/automationApp/state
```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic [ref=e5]:
    - link "logo" [ref=e7] [cursor=pointer]:
      - /url: /app/platformDashboard/
      - img "logo" [ref=e8]
    - generic [ref=e9]:
      - generic [ref=e11]:
        - link [ref=e12] [cursor=pointer]:
          - /url: /app/platformDashboard
          - img [ref=e16]:
            - img [ref=e17]
        - img [ref=e23] [cursor=pointer]:
          - img [ref=e24]
        - img [ref=e30] [cursor=pointer]:
          - img [ref=e31]
        - img [ref=e37] [cursor=pointer]:
          - img [ref=e38]
        - img [ref=e44] [cursor=pointer]:
          - img [ref=e45]
      - generic [ref=e48]:
        - generic [ref=e49] [cursor=pointer]:
          - generic [ref=e50]: Apps
          - button "left" [ref=e51]:
            - img "left" [ref=e53]:
              - img [ref=e54]
        - generic [ref=e57]:
          - link "App Center" [ref=e58] [cursor=pointer]:
            - /url: /app/apps/appCenter
            - generic [ref=e59]: App Center
          - link "Partner apps" [ref=e60] [cursor=pointer]:
            - /url: /app/apps/partners
            - generic [ref=e61]: Partner apps
          - link "Payment processors" [active] [ref=e62] [cursor=pointer]:
            - /url: /app/apps/paymentProcessorAccounts
            - generic [ref=e63]: Payment processors
          - link "Booking API" [ref=e64] [cursor=pointer]:
            - /url: /app/apps/bookingApiClients
            - generic [ref=e65]: Booking API
          - link "Owner portal roles" [ref=e66] [cursor=pointer]:
            - /url: /app/apps/ownerPortalRoles
            - generic [ref=e67]: Owner portal roles
          - link "Online check-in" [ref=e68] [cursor=pointer]:
            - /url: /app/apps/checkinFormTemplates
            - generic [ref=e69]: Online check-in
          - link "Compliance connections" [ref=e70] [cursor=pointer]:
            - /url: /app/apps/complianceConnections
            - generic [ref=e71]: Compliance connections
          - link "Requests status" [ref=e72] [cursor=pointer]:
            - /url: /app/apps/complianceSubmissions
            - generic [ref=e73]: Requests status
    - generic [ref=e74]:
      - generic [ref=e76] [cursor=pointer]:
        - generic [ref=e77]:
          - img [ref=e79]:
            - img [ref=e80]
          - superscript [ref=e82]:
            - generic [ref=e84]: "1"
        - generic [ref=e85]: Notifications
      - generic [ref=e86]:
        - button "Collapse menu" [expanded] [ref=e87] [cursor=pointer]:
          - img "double-left" [ref=e88]:
            - img [ref=e89]
        - button "v 1.0.3" [ref=e91] [cursor=pointer]
  - generic [ref=e92]:
    - banner [ref=e93]:
      - button "arrow-left" [ref=e94] [cursor=pointer]:
        - img "arrow-left" [ref=e96]:
          - img [ref=e97]
      - img "credit-card" [ref=e100]:
        - img [ref=e101]
      - generic [ref=e103]:
        - navigation [ref=e104]:
          - list [ref=e105]:
            - listitem [ref=e106]:
              - link "Apps" [ref=e108] [cursor=pointer]:
                - /url: /app/apps
            - listitem [ref=e109]: /
            - listitem [ref=e110]:
              - link "Payment processors" [ref=e112] [cursor=pointer]:
                - /url: /app/apps/paymentProcessorAccounts
        - generic [ref=e113]: Stripe, PayPal and other connected payment accounts
      - button "search Search everything… ⌘K" [ref=e114] [cursor=pointer]:
        - img "search" [ref=e115]:
          - img [ref=e116]
        - generic [ref=e118]: Search everything…
        - generic [ref=e119]: ⌘K
      - button "Audit log" [ref=e120] [cursor=pointer]:
        - img "audit" [ref=e121]:
          - img [ref=e122]
      - button "Dark theme" [ref=e124] [cursor=pointer]:
        - img "moon" [ref=e126]:
          - img [ref=e127]
      - generic [ref=e129] [cursor=pointer]:
        - img "user" [ref=e132]:
          - img [ref=e133]
        - generic [ref=e136]: admin
    - generic [ref=e139]:
      - generic [ref=e140]:
        - tablist [ref=e141]:
          - generic [ref=e143]:
            - generic [ref=e144] [cursor=pointer]:
              - tab "Default" [selected] [ref=e145]:
                - generic [ref=e146]: Default
              - button "remove" [ref=e147]
            - generic [ref=e148] [cursor=pointer]:
              - tab "Connected" [ref=e149]:
                - generic [ref=e150]: Connected
              - button "remove" [ref=e151]
            - generic [ref=e152] [cursor=pointer]:
              - tab "Disconnected" [ref=e153]:
                - generic [ref=e154]: Disconnected
              - button "remove" [ref=e155]
            - generic [ref=e156] [cursor=pointer]:
              - tab "Error" [ref=e157]:
                - generic [ref=e158]: Error
              - button "remove" [ref=e159]
        - generic:
          - generic:
            - tabpanel "Default"
      - button "Add card 0 / 5" [ref=e161] [cursor=pointer]:
        - generic [ref=e162]: Add card
        - generic [ref=e163]: 0 / 5
      - generic [ref=e166]:
        - generic [ref=e167]:
          - generic [ref=e169]:
            - generic [ref=e170]:
              - img "search" [ref=e171]:
                - img [ref=e172]
              - textbox "Search" [ref=e174]
            - button "plus-circle Create a new payment processor account" [ref=e175] [cursor=pointer]:
              - img "plus-circle" [ref=e177]:
                - img [ref=e178]
              - generic [ref=e181]: Create a new payment processor account
            - button "export Export down" [ref=e182] [cursor=pointer]:
              - generic [ref=e183]:
                - img "export" [ref=e185]:
                  - img [ref=e186]
                - generic [ref=e188]: Export
                - img "down" [ref=e190]:
                  - img [ref=e191]
            - button "layout Customize view" [ref=e193] [cursor=pointer]:
              - img "layout" [ref=e195]:
                - img [ref=e196]
              - generic [ref=e198]: Customize view
          - generic [ref=e199]:
            - table [ref=e201]:
              - rowgroup [ref=e215]:
                - row "Name Provider Mode Account currency Listings filter Is default Status Webhook healthy Date created" [ref=e216]:
                  - columnheader [ref=e217]
                  - columnheader "Name" [ref=e218] [cursor=pointer]:
                    - generic [ref=e219]:
                      - generic [ref=e221]:
                        - generic [ref=e222]: Name
                        - generic [ref=e224]:
                          - img [ref=e225]:
                            - img [ref=e226]
                          - img [ref=e228]:
                            - img [ref=e229]
                      - button "search" [ref=e231]:
                        - button "search" [ref=e232]:
                          - img "search" [ref=e234]:
                            - img [ref=e235]
                  - columnheader "Provider" [ref=e238] [cursor=pointer]:
                    - generic [ref=e239]:
                      - generic [ref=e241]:
                        - generic [ref=e242]: Provider
                        - generic [ref=e244]:
                          - img [ref=e245]:
                            - img [ref=e246]
                          - img [ref=e248]:
                            - img [ref=e249]
                      - button "filter" [ref=e251]:
                        - button "filter" [ref=e252]:
                          - img "filter" [ref=e254]:
                            - img [ref=e255]
                  - columnheader "Mode" [ref=e258] [cursor=pointer]:
                    - generic [ref=e259]:
                      - generic [ref=e261]:
                        - generic [ref=e262]: Mode
                        - generic [ref=e264]:
                          - img [ref=e265]:
                            - img [ref=e266]
                          - img [ref=e268]:
                            - img [ref=e269]
                      - button "filter" [ref=e271]:
                        - button "filter" [ref=e272]:
                          - img "filter" [ref=e274]:
                            - img [ref=e275]
                  - columnheader "Account currency" [ref=e278] [cursor=pointer]:
                    - generic [ref=e279]:
                      - generic [ref=e281]:
                        - generic [ref=e282]: Account currency
                        - generic [ref=e284]:
                          - img [ref=e285]:
                            - img [ref=e286]
                          - img [ref=e288]:
                            - img [ref=e289]
                      - button "filter" [ref=e291]:
                        - button "filter" [ref=e292]:
                          - img "filter" [ref=e294]:
                            - img [ref=e295]
                  - columnheader "Listings filter" [ref=e298]:
                    - generic [ref=e299]:
                      - generic [ref=e300]: Listings
                      - button "filter" [ref=e301] [cursor=pointer]:
                        - button "filter" [ref=e302]:
                          - img "filter" [ref=e304]:
                            - img [ref=e305]
                  - columnheader "Is default" [ref=e308] [cursor=pointer]:
                    - generic [ref=e309]:
                      - generic [ref=e311]:
                        - generic [ref=e312]: Is default
                        - generic [ref=e314]:
                          - img [ref=e315]:
                            - img [ref=e316]
                          - img [ref=e318]:
                            - img [ref=e319]
                      - button "filter" [ref=e321]:
                        - button "filter" [ref=e322]:
                          - img "filter" [ref=e324]:
                            - img [ref=e325]
                  - columnheader "Status" [ref=e328] [cursor=pointer]:
                    - generic [ref=e329]:
                      - generic [ref=e331]:
                        - generic [ref=e332]: Status
                        - generic [ref=e334]:
                          - img [ref=e335]:
                            - img [ref=e336]
                          - img [ref=e338]:
                            - img [ref=e339]
                      - button "filter" [ref=e341]:
                        - button "filter" [ref=e342]:
                          - img "filter" [ref=e344]:
                            - img [ref=e345]
                  - columnheader "Webhook healthy" [ref=e348] [cursor=pointer]:
                    - generic [ref=e349]:
                      - generic [ref=e351]:
                        - generic [ref=e352]: Webhook healthy
                        - generic [ref=e354]:
                          - img [ref=e355]:
                            - img [ref=e356]
                          - img [ref=e358]:
                            - img [ref=e359]
                      - button "filter" [ref=e361]:
                        - button "filter" [ref=e362]:
                          - img "filter" [ref=e364]:
                            - img [ref=e365]
                  - columnheader "Date created" [ref=e368] [cursor=pointer]:
                    - generic [ref=e369]:
                      - generic [ref=e371]:
                        - generic [ref=e372]: Date created
                        - generic [ref=e374]:
                          - img [ref=e375]:
                            - img [ref=e376]
                          - img [ref=e378]:
                            - img [ref=e379]
                      - button "filter" [ref=e381]:
                        - button "filter" [ref=e382]:
                          - img "filter" [ref=e384]:
                            - img [ref=e385]
                  - columnheader [ref=e388]
                  - columnheader [ref=e390]
            - table [ref=e392]:
              - rowgroup [ref=e405]:
                - generic [ref=e406]:
                  - generic [ref=e408]:
                    - generic [ref=e409]: Name
                    - generic [ref=e411]:
                      - img [ref=e412]:
                        - img [ref=e413]
                      - img [ref=e415]:
                        - img [ref=e416]
                  - button [ref=e418] [cursor=pointer]:
                    - button [ref=e419]:
                      - img [ref=e421]:
                        - img [ref=e422]
                - generic [ref=e424]:
                  - generic [ref=e426]:
                    - generic [ref=e427]: Provider
                    - generic [ref=e429]:
                      - img [ref=e430]:
                        - img [ref=e431]
                      - img [ref=e433]:
                        - img [ref=e434]
                  - button [ref=e436] [cursor=pointer]:
                    - button [ref=e437]:
                      - img [ref=e439]:
                        - img [ref=e440]
                - generic [ref=e442]:
                  - generic [ref=e444]:
                    - generic [ref=e445]: Mode
                    - generic [ref=e447]:
                      - img [ref=e448]:
                        - img [ref=e449]
                      - img [ref=e451]:
                        - img [ref=e452]
                  - button [ref=e454] [cursor=pointer]:
                    - button [ref=e455]:
                      - img [ref=e457]:
                        - img [ref=e458]
                - generic [ref=e460]:
                  - generic [ref=e462]:
                    - generic [ref=e463]: Account currency
                    - generic [ref=e465]:
                      - img [ref=e466]:
                        - img [ref=e467]
                      - img [ref=e469]:
                        - img [ref=e470]
                  - button [ref=e472] [cursor=pointer]:
                    - button [ref=e473]:
                      - img [ref=e475]:
                        - img [ref=e476]
                - generic [ref=e478]:
                  - generic [ref=e479]: Listings
                  - button [ref=e480] [cursor=pointer]:
                    - button [ref=e481]:
                      - img [ref=e483]:
                        - img [ref=e484]
                - generic [ref=e486]:
                  - generic [ref=e488]:
                    - generic [ref=e489]: Is default
                    - generic [ref=e491]:
                      - img [ref=e492]:
                        - img [ref=e493]
                      - img [ref=e495]:
                        - img [ref=e496]
                  - button [ref=e498] [cursor=pointer]:
                    - button [ref=e499]:
                      - img [ref=e501]:
                        - img [ref=e502]
                - generic [ref=e504]:
                  - generic [ref=e506]:
                    - generic [ref=e507]: Status
                    - generic [ref=e509]:
                      - img [ref=e510]:
                        - img [ref=e511]
                      - img [ref=e513]:
                        - img [ref=e514]
                  - button [ref=e516] [cursor=pointer]:
                    - button [ref=e517]:
                      - img [ref=e519]:
                        - img [ref=e520]
                - generic [ref=e522]:
                  - generic [ref=e524]:
                    - generic [ref=e525]: Webhook healthy
                    - generic [ref=e527]:
                      - img [ref=e528]:
                        - img [ref=e529]
                      - img [ref=e531]:
                        - img [ref=e532]
                  - button [ref=e534] [cursor=pointer]:
                    - button [ref=e535]:
                      - img [ref=e537]:
                        - img [ref=e538]
                - generic [ref=e540]:
                  - generic [ref=e542]:
                    - generic [ref=e543]: Date created
                    - generic [ref=e545]:
                      - img [ref=e546]:
                        - img [ref=e547]
                      - img [ref=e549]:
                        - img [ref=e550]
                  - button [ref=e552] [cursor=pointer]:
                    - button [ref=e553]:
                      - img [ref=e555]:
                        - img [ref=e556]
                - row "Select row 1 Stripe · Sunny Stays Stripe Test (demo) Yes Connected Yes 02-11-2026 menu" [ref=e558]:
                  - cell "Select row 1" [ref=e559]:
                    - radio "Select row 1" [ref=e562] [cursor=pointer]
                  - cell "Stripe · Sunny Stays" [ref=e563]:
                    - link "Stripe · Sunny Stays" [ref=e567] [cursor=pointer]:
                      - /url: /app/apps/paymentProcessorAccounts/paymentProcessorAccount-1-6932c00f-cb60-4599-80e7-ebd6758399a5
                      - generic [ref=e569]: Stripe · Sunny Stays
                  - cell "Stripe" [ref=e570]:
                    - generic [ref=e572]:
                      - img [ref=e573]
                      - text: Stripe
                  - cell "Test (demo)" [ref=e575]:
                    - generic [ref=e577]:
                      - img [ref=e578]
                      - text: Test (demo)
                  - cell [ref=e580]
                  - cell [ref=e581]
                  - cell "Yes" [ref=e582]:
                    - generic [ref=e584]: "Yes"
                  - cell "Connected" [ref=e585]:
                    - generic [ref=e587]:
                      - img [ref=e588]
                      - text: Connected
                  - cell "Yes" [ref=e590]:
                    - generic [ref=e592]: "Yes"
                  - cell "02-11-2026" [ref=e593]:
                    - generic [ref=e595]: 02-11-2026
                  - cell "menu" [ref=e596]:
                    - button "menu" [ref=e599] [cursor=pointer]:
                      - img "menu" [ref=e601]:
                        - img [ref=e602]
                - row "Select row 2 Stripe · Sunny Stays Stripe Test (demo) Yes Connected Yes 29-10-2026 menu" [ref=e604]:
                  - cell "Select row 2" [ref=e605]:
                    - radio "Select row 2" [ref=e608] [cursor=pointer]
                  - cell "Stripe · Sunny Stays" [ref=e609]:
                    - link "Stripe · Sunny Stays" [ref=e613] [cursor=pointer]:
                      - /url: /app/apps/paymentProcessorAccounts/paymentProcessorAccount-1-92e8a39a-ed61-4fc1-b57a-9b15c4d5d0df
                      - generic [ref=e615]: Stripe · Sunny Stays
                  - cell "Stripe" [ref=e616]:
                    - generic [ref=e618]:
                      - img [ref=e619]
                      - text: Stripe
                  - cell "Test (demo)" [ref=e621]:
                    - generic [ref=e623]:
                      - img [ref=e624]
                      - text: Test (demo)
                  - cell [ref=e626]
                  - cell [ref=e627]
                  - cell "Yes" [ref=e628]:
                    - generic [ref=e630]: "Yes"
                  - cell "Connected" [ref=e631]:
                    - generic [ref=e633]:
                      - img [ref=e634]
                      - text: Connected
                  - cell "Yes" [ref=e636]:
                    - generic [ref=e638]: "Yes"
                  - cell "29-10-2026" [ref=e639]:
                    - generic [ref=e641]: 29-10-2026
                  - cell "menu" [ref=e642]:
                    - button "menu" [ref=e645] [cursor=pointer]:
                      - img "menu" [ref=e647]:
                        - img [ref=e648]
                - row "Select row 3 Stripe · Sunny Stays Stripe Test (demo) Yes Connected Yes 29-10-2026 menu" [ref=e650]:
                  - cell "Select row 3" [ref=e651]:
                    - radio "Select row 3" [ref=e654] [cursor=pointer]
                  - cell "Stripe · Sunny Stays" [ref=e655]:
                    - link "Stripe · Sunny Stays" [ref=e659] [cursor=pointer]:
                      - /url: /app/apps/paymentProcessorAccounts/paymentProcessorAccount-1-fdf7397b-696a-4ffd-b1c7-86b33a8dbd52
                      - generic [ref=e661]: Stripe · Sunny Stays
                  - cell "Stripe" [ref=e662]:
                    - generic [ref=e664]:
                      - img [ref=e665]
                      - text: Stripe
                  - cell "Test (demo)" [ref=e667]:
                    - generic [ref=e669]:
                      - img [ref=e670]
                      - text: Test (demo)
                  - cell [ref=e672]
                  - cell [ref=e673]
                  - cell "Yes" [ref=e674]:
                    - generic [ref=e676]: "Yes"
                  - cell "Connected" [ref=e677]:
                    - generic [ref=e679]:
                      - img [ref=e680]
                      - text: Connected
                  - cell "Yes" [ref=e682]:
                    - generic [ref=e684]: "Yes"
                  - cell "29-10-2026" [ref=e685]:
                    - generic [ref=e687]: 29-10-2026
                  - cell "menu" [ref=e688]:
                    - button "menu" [ref=e691] [cursor=pointer]:
                      - img "menu" [ref=e693]:
                        - img [ref=e694]
        - list [ref=e696]:
          - listitem [ref=e697]: "Total: 3"
          - listitem "Previous Page" [ref=e698]:
            - button "left" [disabled] [ref=e699]:
              - img "left" [ref=e700]:
                - img [ref=e701]
          - listitem "1" [ref=e703] [cursor=pointer]:
            - generic [ref=e704]: "1"
          - listitem "Next Page" [ref=e705]:
            - button "right" [disabled] [ref=e706]:
              - img "right" [ref=e707]:
                - img [ref=e708]
          - listitem [ref=e710]:
            - generic [ref=e711]:
              - generic "10 / page" [ref=e712]:
                - text: 10 / page
                - combobox "Page Size" [ref=e713]
              - img "down" [ref=e715]:
                - img [ref=e716]
```

# Test source

```ts
  18  |     page: string
  19  | }
  20  | 
  21  | /** Noise no page can avoid — never a finding. */
  22  | const IGNORE: RegExp[] = [
  23  |     /Download the React DevTools/i,
  24  |     /favicon\.ico/i,
  25  |     /ResizeObserver loop/i,
  26  |     /WebSocket .*(closed|failed)/i,
  27  |     /net::ERR_ABORTED/i,
  28  |     /\[antd: Message\]/i, // the app's own message hints
  29  |     // the browser's own line for a 4xx / 5xx answer or a failed request — the same event is recorded as `api.status`
  30  |     // / `request.failed` with its URL and status, and judged by the status rule, not as a console error
  31  |     /^Failed to load resource:/i,
  32  |     // the client logs antd's validation outcome of a refused save ({message: Required field, errorFields: …}) as a
  33  |     // console error; a spec submits an empty form on purpose to see the validation speak
  34  |     /^\{message: Required field/i
  35  | ];
  36  | 
  37  | const isNoise = (text: string): boolean => IGNORE.some(re => re.test(text));
  38  | 
  39  | export class ConsoleCollector {
  40  |     readonly records: ConsoleRecord[] = [];
  41  |     private readonly seen = new Set<string>();
  42  |     private readonly off: Array<() => void> = [];
  43  | 
  44  |     constructor(private readonly page: Page) {
  45  |         const listen = (event: string, handler: (...args: any[]) => void) => {
  46  |             (page as any).on(event, handler);
  47  |             this.off.push(() => (page as any).off(event, handler));
  48  |         };
  49  |         listen('console', (message: any) => {
  50  |             const type = message.type();
  51  |             if (type !== 'error' && type !== 'warning') return;
  52  |             const text = message.text();
  53  |             if (isNoise(text)) return;
  54  |             this.add({kind: type === 'error' ? 'console.error' : 'console.warning', text: text.slice(0, 1500), url: message.location()?.url});
  55  |         });
  56  |         listen('pageerror', (error: any) => {
  57  |             this.add({kind: 'pageerror', text: `${error.message}\n${(error.stack || '').slice(0, 1500)}`});
  58  |         });
  59  |         listen('requestfailed', (req: any) => {
  60  |             const text = req.failure()?.errorText || 'failed';
  61  |             if (isNoise(text)) return;
  62  |             this.add({kind: 'request.failed', text, url: req.url()});
  63  |         });
  64  |         listen('response', async (res: any) => {
  65  |             const url = res.url();
  66  |             if (!url.includes('/api/')) return;
  67  |             const status = res.status();
  68  |             if (status >= 400) {
  69  |                 this.add({kind: 'api.status', text: `${res.request().method()} ${status}`, url, status});
  70  |                 return;
  71  |             }
  72  |             // a Hydra API answer is JSON; {success: false} with a 200 is a refusal the UI may have swallowed
  73  |             const type = res.headers()['content-type'] || '';
  74  |             if (!type.includes('json')) return;
  75  |             try {
  76  |                 const body = await res.json();
  77  |                 if (body && typeof body === 'object' && body.success === false)
  78  |                     this.add({kind: 'api.failure', text: `${res.request().method()} success:false ${body.message || ''}`.trim(), url, status});
  79  |             } catch { /* not JSON after all, or the body is gone */ }
  80  |         });
  81  |     }
  82  | 
  83  |     /** Stops listening — a shared page (the sweeps) gets a new collector per test and must not keep the old ones. */
  84  |     dispose(): void {
  85  |         while (this.off.length) this.off.pop()!();
  86  |     }
  87  | 
  88  |     private add(record: Omit<ConsoleRecord, 'at' | 'page'>): void {
  89  |         const key = `${record.kind}|${record.text.slice(0, 200)}|${record.url || ''}`;
  90  |         if (this.seen.has(key)) return;
  91  |         this.seen.add(key);
  92  |         this.records.push({...record, at: new Date().toISOString(), page: this.page.url()});
  93  |     }
  94  | 
  95  |     /** What fails a journey: uncaught exceptions, console errors, every API answer of 4xx / 5xx or `success: false`, a
  96  |      *  failed request. A page that asks the server for something it refuses or does not have is a defect to REPORT —
  97  |      *  the suite never explains it away. Warnings fail only with QA_FAIL_ON_WARNINGS=1. */
  98  |     blocking(): ConsoleRecord[] {
  99  |         return this.records.filter(r =>
  100 |             r.kind === 'pageerror'
  101 |             || r.kind === 'console.error'
  102 |             || r.kind === 'api.status'
  103 |             || r.kind === 'api.failure'
  104 |             || r.kind === 'request.failed'
  105 |             || (CONFIG.failOnWarnings && r.kind === 'console.warning'));
  106 |     }
  107 | 
  108 |     async attach(testInfo: TestInfo): Promise<void> {
  109 |         await testInfo.attach('console.json', {body: JSON.stringify(this.records, null, 2), contentType: 'application/json'});
  110 |     }
  111 | }
  112 | 
  113 | /** Fails the journey on what the browser reported; the full list is already attached. */
  114 | export const assertClean = (collector: ConsoleCollector): void => {
  115 |     const blocking = collector.blocking();
  116 |     if (!blocking.length) return;
  117 |     const lines = blocking.slice(0, 10).map(r => `- [${r.kind}] ${r.text.split('\n')[0].slice(0, 200)}${r.url ? ` @ ${r.url}` : ''}`);
> 118 |     throw new Error(`The page reported ${blocking.length} error(s) — API answers, failed requests, console errors:\n${lines.join('\n')}`);
      |           ^ Error: The page reported 1 error(s) — API answers, failed requests, console errors:
  119 | };
  120 | 
```