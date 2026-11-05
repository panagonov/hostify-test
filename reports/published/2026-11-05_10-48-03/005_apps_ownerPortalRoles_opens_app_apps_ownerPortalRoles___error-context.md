# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 005-platform-pages.spec.ts >> 005 platform pages >> apps › ownerPortalRoles opens (/app/apps/ownerPortalRoles)
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
          - link "Payment processors" [ref=e62] [cursor=pointer]:
            - /url: /app/apps/paymentProcessorAccounts
            - generic [ref=e63]: Payment processors
          - link "Booking API" [ref=e64] [cursor=pointer]:
            - /url: /app/apps/bookingApiClients
            - generic [ref=e65]: Booking API
          - link "Owner portal roles" [active] [ref=e66] [cursor=pointer]:
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
      - img "close" [ref=e100]:
        - img [ref=e101]
      - navigation [ref=e104]:
        - list [ref=e105]:
          - listitem [ref=e106]:
            - link "Apps" [ref=e108] [cursor=pointer]:
              - /url: /app/apps
          - listitem [ref=e109]: /
          - listitem [ref=e110]:
            - link "Owner portal roles" [ref=e112] [cursor=pointer]:
              - /url: /app/apps/ownerPortalRoles
      - button "search Search everything… ⌘K" [ref=e113] [cursor=pointer]:
        - img "search" [ref=e114]:
          - img [ref=e115]
        - generic [ref=e117]: Search everything…
        - generic [ref=e118]: ⌘K
      - button "Audit log" [ref=e119] [cursor=pointer]:
        - img "audit" [ref=e120]:
          - img [ref=e121]
      - button "Dark theme" [ref=e123] [cursor=pointer]:
        - img "moon" [ref=e125]:
          - img [ref=e126]
      - generic [ref=e128] [cursor=pointer]:
        - img "user" [ref=e131]:
          - img [ref=e132]
        - generic [ref=e135]: admin
    - generic [ref=e138]:
      - button "Add card 0 / 5" [ref=e140] [cursor=pointer]:
        - generic [ref=e141]: Add card
        - generic [ref=e142]: 0 / 5
      - generic [ref=e145]:
        - generic [ref=e146]:
          - generic [ref=e148]:
            - generic [ref=e149]:
              - img "search" [ref=e150]:
                - img [ref=e151]
              - textbox "Search" [ref=e153]
            - button "plus-circle Create a new owner portal role" [ref=e154] [cursor=pointer]:
              - img "plus-circle" [ref=e156]:
                - img [ref=e157]
              - generic [ref=e160]: Create a new owner portal role
            - button "export Export down" [ref=e161] [cursor=pointer]:
              - generic [ref=e162]:
                - img "export" [ref=e164]:
                  - img [ref=e165]
                - generic [ref=e167]: Export
                - img "down" [ref=e169]:
                  - img [ref=e170]
            - button "layout Customize view" [ref=e172] [cursor=pointer]:
              - img "layout" [ref=e174]:
                - img [ref=e175]
              - generic [ref=e177]: Customize view
          - generic [ref=e178]:
            - table [ref=e180]:
              - rowgroup [ref=e190]:
                - row "Name Is default filter Is system filter Adr basis Date created" [ref=e191]:
                  - columnheader [ref=e192]
                  - columnheader "Name" [ref=e193] [cursor=pointer]:
                    - generic [ref=e194]:
                      - generic [ref=e196]:
                        - generic [ref=e197]: Name
                        - generic [ref=e199]:
                          - img [ref=e200]:
                            - img [ref=e201]
                          - img [ref=e203]:
                            - img [ref=e204]
                      - button "search" [ref=e206]:
                        - button "search" [ref=e207]:
                          - img "search" [ref=e209]:
                            - img [ref=e210]
                  - columnheader "Is default filter" [ref=e213]:
                    - generic [ref=e214]:
                      - generic [ref=e215]: Is default
                      - button "filter" [ref=e216] [cursor=pointer]:
                        - button "filter" [ref=e217]:
                          - img "filter" [ref=e219]:
                            - img [ref=e220]
                  - columnheader "Is system filter" [ref=e223]:
                    - generic [ref=e224]:
                      - generic [ref=e225]: Is system
                      - button "filter" [ref=e226] [cursor=pointer]:
                        - button "filter" [ref=e227]:
                          - img "filter" [ref=e229]:
                            - img [ref=e230]
                  - columnheader "Adr basis" [ref=e233]: Adr basis
                  - columnheader "Date created" [ref=e235] [cursor=pointer]:
                    - generic [ref=e236]:
                      - generic [ref=e238]:
                        - generic [ref=e239]: Date created
                        - generic [ref=e241]:
                          - img [ref=e242]:
                            - img [ref=e243]
                          - img [ref=e245]:
                            - img [ref=e246]
                      - button "filter" [ref=e248]:
                        - button "filter" [ref=e249]:
                          - img "filter" [ref=e251]:
                            - img [ref=e252]
                  - columnheader [ref=e255]
                  - columnheader [ref=e257]
            - table [ref=e259]:
              - rowgroup [ref=e268]:
                - generic [ref=e269]:
                  - generic [ref=e271]:
                    - generic [ref=e272]: Name
                    - generic [ref=e274]:
                      - img [ref=e275]:
                        - img [ref=e276]
                      - img [ref=e278]:
                        - img [ref=e279]
                  - button [ref=e281] [cursor=pointer]:
                    - button [ref=e282]:
                      - img [ref=e284]:
                        - img [ref=e285]
                - generic [ref=e287]:
                  - generic [ref=e288]: Is default
                  - button [ref=e289] [cursor=pointer]:
                    - button [ref=e290]:
                      - img [ref=e292]:
                        - img [ref=e293]
                - generic [ref=e295]:
                  - generic [ref=e296]: Is system
                  - button [ref=e297] [cursor=pointer]:
                    - button [ref=e298]:
                      - img [ref=e300]:
                        - img [ref=e301]
                - generic [ref=e303]:
                  - generic [ref=e305]:
                    - generic [ref=e306]: Date created
                    - generic [ref=e308]:
                      - img [ref=e309]:
                        - img [ref=e310]
                      - img [ref=e312]:
                        - img [ref=e313]
                  - button [ref=e315] [cursor=pointer]:
                    - button [ref=e316]:
                      - img [ref=e318]:
                        - img [ref=e319]
                - row "Select row 1 Standard Yes Yes Owner revenue 05-11-2026 menu" [ref=e321]:
                  - cell "Select row 1" [ref=e322]:
                    - radio "Select row 1" [ref=e325] [cursor=pointer]
                  - cell "Standard" [ref=e326]:
                    - link "Standard" [ref=e330] [cursor=pointer]:
                      - /url: /app/apps/ownerPortalRoles/opr-f2b3ad65-0d9a-4992-929c-3abe4823df98-standard
                      - generic [ref=e332]: Standard
                  - cell "Yes" [ref=e333]:
                    - generic [ref=e335]: "Yes"
                  - cell "Yes" [ref=e336]:
                    - generic [ref=e338]: "Yes"
                  - cell "Owner revenue" [ref=e339]:
                    - generic [ref=e340]: Owner revenue
                  - cell "05-11-2026" [ref=e341]:
                    - generic [ref=e343]: 05-11-2026
                  - cell "menu" [ref=e344]:
                    - button "menu" [ref=e347] [cursor=pointer]:
                      - img "menu" [ref=e349]:
                        - img [ref=e350]
                - row "Select row 2 Standard Yes Yes Owner revenue 02-11-2026 menu" [ref=e352]:
                  - cell "Select row 2" [ref=e353]:
                    - radio "Select row 2" [ref=e356] [cursor=pointer]
                  - cell "Standard" [ref=e357]:
                    - link "Standard" [ref=e361] [cursor=pointer]:
                      - /url: /app/apps/ownerPortalRoles/opr-6932c00f-cb60-4599-80e7-ebd6758399a5-standard
                      - generic [ref=e363]: Standard
                  - cell "Yes" [ref=e364]:
                    - generic [ref=e366]: "Yes"
                  - cell "Yes" [ref=e367]:
                    - generic [ref=e369]: "Yes"
                  - cell "Owner revenue" [ref=e370]:
                    - generic [ref=e371]: Owner revenue
                  - cell "02-11-2026" [ref=e372]:
                    - generic [ref=e374]: 02-11-2026
                  - cell "menu" [ref=e375]:
                    - button "menu" [ref=e378] [cursor=pointer]:
                      - img "menu" [ref=e380]:
                        - img [ref=e381]
                - row "Select row 3 Standard Yes Yes Owner revenue 29-10-2026 menu" [ref=e383]:
                  - cell "Select row 3" [ref=e384]:
                    - radio "Select row 3" [ref=e387] [cursor=pointer]
                  - cell "Standard" [ref=e388]:
                    - link "Standard" [ref=e392] [cursor=pointer]:
                      - /url: /app/apps/ownerPortalRoles/opr-92e8a39a-ed61-4fc1-b57a-9b15c4d5d0df-standard
                      - generic [ref=e394]: Standard
                  - cell "Yes" [ref=e395]:
                    - generic [ref=e397]: "Yes"
                  - cell "Yes" [ref=e398]:
                    - generic [ref=e400]: "Yes"
                  - cell "Owner revenue" [ref=e401]:
                    - generic [ref=e402]: Owner revenue
                  - cell "29-10-2026" [ref=e403]:
                    - generic [ref=e405]: 29-10-2026
                  - cell "menu" [ref=e406]:
                    - button "menu" [ref=e409] [cursor=pointer]:
                      - img "menu" [ref=e411]:
                        - img [ref=e412]
                - row "Select row 4 Standard Yes Yes Owner revenue 29-10-2026 menu" [ref=e414]:
                  - cell "Select row 4" [ref=e415]:
                    - radio "Select row 4" [ref=e418] [cursor=pointer]
                  - cell "Standard" [ref=e419]:
                    - link "Standard" [ref=e423] [cursor=pointer]:
                      - /url: /app/apps/ownerPortalRoles/opr-fdf7397b-696a-4ffd-b1c7-86b33a8dbd52-standard
                      - generic [ref=e425]: Standard
                  - cell "Yes" [ref=e426]:
                    - generic [ref=e428]: "Yes"
                  - cell "Yes" [ref=e429]:
                    - generic [ref=e431]: "Yes"
                  - cell "Owner revenue" [ref=e432]:
                    - generic [ref=e433]: Owner revenue
                  - cell "29-10-2026" [ref=e434]:
                    - generic [ref=e436]: 29-10-2026
                  - cell "menu" [ref=e437]:
                    - button "menu" [ref=e440] [cursor=pointer]:
                      - img "menu" [ref=e442]:
                        - img [ref=e443]
        - list [ref=e445]:
          - listitem [ref=e446]: "Total: 4"
          - listitem "Previous Page" [ref=e447]:
            - button "left" [disabled] [ref=e448]:
              - img "left" [ref=e449]:
                - img [ref=e450]
          - listitem "1" [ref=e452] [cursor=pointer]:
            - generic [ref=e453]: "1"
          - listitem "Next Page" [ref=e454]:
            - button "right" [disabled] [ref=e455]:
              - img "right" [ref=e456]:
                - img [ref=e457]
          - listitem [ref=e459]:
            - generic [ref=e460]:
              - generic "10 / page" [ref=e461]:
                - text: 10 / page
                - combobox "Page Size" [ref=e462]
              - img "down" [ref=e464]:
                - img [ref=e465]
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