# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 005-platform-pages.spec.ts >> 005 platform pages >> apps › partners opens (/app/apps/partners)
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
          - link "Partner apps" [active] [ref=e60] [cursor=pointer]:
            - /url: /app/apps/partners
            - generic [ref=e61]: Partner apps
          - link "Payment processors" [ref=e62] [cursor=pointer]:
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
      - img "appstore" [ref=e100]:
        - img [ref=e101]
      - generic [ref=e103]:
        - navigation [ref=e104]:
          - list [ref=e105]:
            - listitem [ref=e106]:
              - link "Apps" [ref=e108] [cursor=pointer]:
                - /url: /app/apps
            - listitem [ref=e109]: /
            - listitem [ref=e110]:
              - link "Partner apps" [ref=e112] [cursor=pointer]:
                - /url: /app/apps/partners
        - generic [ref=e113]: Registered partner apps and their integration settings
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
    - generic [ref=e140]:
      - generic [ref=e141]:
        - generic [ref=e142]:
          - button "plus-circle Create a new partner" [ref=e144] [cursor=pointer]:
            - img "plus-circle" [ref=e146]:
              - img [ref=e147]
            - generic [ref=e150]: Create a new partner
          - button "filter Filter" [ref=e156] [cursor=pointer]:
            - img "filter" [ref=e158]:
              - img [ref=e159]
            - generic [ref=e161]: Filter
          - generic [ref=e163]:
            - searchbox "Search" [ref=e165]
            - button "search" [ref=e167] [cursor=pointer]:
              - img "search" [ref=e169]:
                - img [ref=e170]
          - generic [ref=e173] [cursor=pointer]:
            - generic "Name ↑" [ref=e174]:
              - text: Name ↑
              - combobox [ref=e175]
            - img "sort-ascending" [ref=e177]:
              - img [ref=e178]
        - generic [ref=e180]:
          - button "export Export down" [ref=e184] [cursor=pointer]:
            - generic [ref=e185]:
              - img "export" [ref=e187]:
                - img [ref=e188]
              - generic [ref=e190]: Export
              - img "down" [ref=e192]:
                - img [ref=e193]
          - list [ref=e196]:
            - listitem "Previous Page" [ref=e197]:
              - button "left" [disabled] [ref=e198]:
                - img "left" [ref=e199]:
                  - img [ref=e200]
            - listitem "1" [ref=e202] [cursor=pointer]:
              - generic [ref=e203]: "1"
            - listitem "Next Page" [ref=e204] [cursor=pointer]:
              - button "right" [ref=e205]:
                - img "right" [ref=e206]:
                  - img [ref=e207]
            - listitem [ref=e209]:
              - generic [ref=e210]:
                - generic "48 / page" [ref=e211]:
                  - text: 48 / page
                  - combobox "Page Size" [ref=e212]
                - img "down" [ref=e214]:
                  - img [ref=e215]
      - generic [ref=e217]:
        - generic [ref=e220] [cursor=pointer]:
          - generic [ref=e222]:
            - img [ref=e226]
            - generic [ref=e228]: Included
          - generic [ref=e231]: Custom
        - generic [ref=e234] [cursor=pointer]:
          - generic [ref=e236]:
            - img [ref=e240]
            - generic [ref=e242]: Partner billed
          - generic [ref=e244]:
            - generic [ref=e245]: Remote Locks and Check-ins
            - generic [ref=e246]: Custom
        - generic [ref=e249] [cursor=pointer]:
          - generic [ref=e251]:
            - img [ref=e255]
            - generic [ref=e257]: Partner billed
          - generic [ref=e259]:
            - generic [ref=e260]: Security
            - generic [ref=e261]: Custom
        - generic [ref=e264] [cursor=pointer]:
          - generic [ref=e266]:
            - img [ref=e270]
            - generic [ref=e272]: Included
          - generic [ref=e275]: Custom
        - generic [ref=e278] [cursor=pointer]:
          - generic [ref=e280]:
            - img [ref=e284]
            - generic [ref=e286]: Partner billed
          - generic [ref=e288]:
            - generic [ref=e289]: Project Management
            - generic [ref=e290]: Custom
        - generic [ref=e293] [cursor=pointer]:
          - generic [ref=e295]:
            - img [ref=e299]
            - generic [ref=e301]: Included
          - generic [ref=e304]: Custom
        - generic [ref=e307] [cursor=pointer]:
          - generic [ref=e309]:
            - img [ref=e313]
            - generic [ref=e315]: Partner billed
          - generic [ref=e317]:
            - generic [ref=e318]: Guest Experience
            - generic [ref=e319]: Custom
        - generic [ref=e322] [cursor=pointer]:
          - generic [ref=e324]:
            - img [ref=e328]
            - generic [ref=e330]: Included
          - generic [ref=e333]: Custom
        - generic [ref=e336] [cursor=pointer]:
          - generic [ref=e338]:
            - img [ref=e342]
            - generic [ref=e344]: Included
          - generic [ref=e347]: Custom
        - generic [ref=e350] [cursor=pointer]:
          - generic [ref=e352]:
            - img [ref=e356]
            - generic [ref=e358]: Included
          - generic [ref=e361]: Custom
        - generic [ref=e364] [cursor=pointer]:
          - generic [ref=e366]:
            - img [ref=e370]
            - generic [ref=e372]: Included
          - generic [ref=e375]: Custom
        - generic [ref=e378] [cursor=pointer]:
          - generic [ref=e380]:
            - img [ref=e384]
            - generic [ref=e386]: Partner billed
          - generic [ref=e388]:
            - generic [ref=e389]: Remote Locks and Check-ins
            - generic [ref=e390]: Custom
        - generic [ref=e393] [cursor=pointer]:
          - generic [ref=e395]:
            - img [ref=e399]
            - generic [ref=e401]: Partner billed
          - generic [ref=e403]:
            - generic [ref=e404]: Security
            - generic [ref=e405]: Custom
        - generic [ref=e408] [cursor=pointer]:
          - generic [ref=e410]:
            - img [ref=e414]
            - generic [ref=e416]: Partner billed
          - generic [ref=e418]:
            - generic [ref=e419]: Revenue & Accounting
            - generic [ref=e420]: Custom
        - generic [ref=e423] [cursor=pointer]:
          - generic [ref=e425]:
            - img [ref=e429]
            - generic [ref=e431]: Partner billed
          - generic [ref=e433]:
            - generic [ref=e434]: Payment Providers
            - generic [ref=e435]: Payment
        - generic [ref=e438] [cursor=pointer]:
          - generic [ref=e440]:
            - img [ref=e444]
            - generic [ref=e446]: Included
          - generic [ref=e449]: Sales channel
        - generic [ref=e452] [cursor=pointer]:
          - generic [ref=e454]:
            - img [ref=e458]
            - generic [ref=e460]: Partner billed
          - generic [ref=e462]:
            - generic [ref=e463]: Cleaning and Maintenance
            - generic [ref=e464]: Custom
        - generic [ref=e467] [cursor=pointer]:
          - generic [ref=e469]:
            - img [ref=e473]
            - generic [ref=e475]: Partner billed
          - generic [ref=e477]:
            - generic [ref=e478]: Payment Providers
            - generic [ref=e479]: Payment
        - generic [ref=e482] [cursor=pointer]:
          - generic [ref=e484]:
            - img "appstore" [ref=e488]:
              - img [ref=e489]
            - generic [ref=e492]: Included
          - generic [ref=e495]: Channel manager
        - generic [ref=e498] [cursor=pointer]:
          - generic [ref=e500]:
            - img [ref=e504]
            - generic [ref=e506]: Partner billed
          - generic [ref=e508]:
            - generic [ref=e509]: Guest Experience
            - generic [ref=e510]: Custom
        - generic [ref=e513] [cursor=pointer]:
          - generic [ref=e515]:
            - img [ref=e519]
            - generic [ref=e521]: Included
          - generic [ref=e524]: Guest screening
        - generic [ref=e527] [cursor=pointer]:
          - generic [ref=e529]:
            - img [ref=e533]
            - generic [ref=e535]: Partner billed
          - generic [ref=e537]:
            - generic [ref=e538]: Remote Locks and Check-ins
            - generic [ref=e539]: Custom
        - generic [ref=e542] [cursor=pointer]:
          - generic [ref=e544]:
            - img [ref=e548]
            - generic [ref=e550]: Partner billed
          - generic [ref=e552]:
            - generic [ref=e553]: Revenue & Accounting
            - generic [ref=e554]: Custom
        - generic [ref=e557] [cursor=pointer]:
          - generic [ref=e559]:
            - img [ref=e563]
            - generic [ref=e565]: Partner billed
          - generic [ref=e567]:
            - generic [ref=e568]: Cleaning and Maintenance
            - generic [ref=e569]: Custom
        - generic [ref=e572] [cursor=pointer]:
          - generic [ref=e574]:
            - img [ref=e578]
            - generic [ref=e580]: Partner billed
          - generic [ref=e582]:
            - generic [ref=e583]: Guest Experience
            - generic [ref=e584]: Custom
        - generic [ref=e587] [cursor=pointer]:
          - generic [ref=e589]:
            - img [ref=e593]
            - generic [ref=e595]: Partner billed
          - generic [ref=e598]: Custom
        - generic [ref=e601] [cursor=pointer]:
          - generic [ref=e603]:
            - img [ref=e607]
            - generic [ref=e609]: Included
          - generic [ref=e612]: Administration
        - generic [ref=e615] [cursor=pointer]:
          - generic [ref=e617]:
            - img [ref=e621]
            - generic [ref=e623]: Included
          - generic [ref=e626]: Custom
        - generic [ref=e629] [cursor=pointer]:
          - generic [ref=e631]:
            - img [ref=e635]
            - generic [ref=e637]: Partner billed
          - generic [ref=e640]: Custom
        - generic [ref=e643] [cursor=pointer]:
          - generic [ref=e645]:
            - img [ref=e649]
            - generic [ref=e651]: Included
          - generic [ref=e654]: Migration
        - generic [ref=e657] [cursor=pointer]:
          - generic [ref=e659]:
            - img [ref=e663]
            - generic [ref=e665]: Partner billed
          - generic [ref=e668]: Administration
        - generic [ref=e671] [cursor=pointer]:
          - generic [ref=e673]:
            - img [ref=e677]
            - generic [ref=e679]: Partner billed
          - generic [ref=e681]:
            - generic [ref=e682]: Guest Experience
            - generic [ref=e683]: Custom
        - generic [ref=e686] [cursor=pointer]:
          - generic [ref=e688]:
            - img [ref=e692]
            - generic [ref=e694]: Partner billed
          - generic [ref=e696]:
            - generic [ref=e697]: Guest Experience
            - generic [ref=e698]: Custom
        - generic [ref=e701] [cursor=pointer]:
          - generic [ref=e703]:
            - img [ref=e707]
            - generic [ref=e709]: Partner billed
          - generic [ref=e712]: Administration
        - generic [ref=e715] [cursor=pointer]:
          - generic [ref=e717]:
            - img [ref=e721]
            - generic [ref=e723]: Partner billed
          - generic [ref=e725]:
            - generic [ref=e726]: Remote Locks and Check-ins
            - generic [ref=e727]: Custom
        - generic [ref=e730] [cursor=pointer]:
          - generic [ref=e732]:
            - img [ref=e736]
            - generic [ref=e738]: Included
          - generic [ref=e741]: Chat
        - generic [ref=e744] [cursor=pointer]:
          - generic [ref=e746]:
            - img [ref=e750]
            - generic [ref=e752]: Partner billed
          - generic [ref=e755]: Custom
        - generic [ref=e758] [cursor=pointer]:
          - generic [ref=e760]:
            - img [ref=e764]
            - generic [ref=e766]: Partner billed
          - generic [ref=e768]:
            - generic [ref=e769]: Guest Experience
            - generic [ref=e770]: Custom
        - generic [ref=e773] [cursor=pointer]:
          - generic [ref=e775]:
            - img [ref=e779]
            - generic [ref=e781]: Included
          - generic [ref=e784]: Custom
        - generic [ref=e787] [cursor=pointer]:
          - generic [ref=e789]:
            - img [ref=e793]
            - generic [ref=e795]: Partner billed
          - generic [ref=e797]:
            - generic [ref=e798]: Security
            - generic [ref=e799]: Custom
        - generic [ref=e802] [cursor=pointer]:
          - generic [ref=e804]:
            - img "appstore" [ref=e808]:
              - img [ref=e809]
            - generic [ref=e812]: Paid add-on
          - generic [ref=e814]:
            - generic [ref=e815]: Revenue & Accounting
            - generic [ref=e816]: accountingSynctax
        - generic [ref=e819] [cursor=pointer]:
          - generic [ref=e821]:
            - img [ref=e825]
            - generic [ref=e827]: Partner billed
          - generic [ref=e829]:
            - generic [ref=e830]: Remote Locks and Check-ins
            - generic [ref=e831]: Custom
        - generic [ref=e834] [cursor=pointer]:
          - generic [ref=e836]:
            - img [ref=e840]
            - generic [ref=e842]: Partner billed
          - generic [ref=e844]:
            - generic [ref=e845]: Data
            - generic [ref=e846]: Custom
        - generic [ref=e849] [cursor=pointer]:
          - generic [ref=e851]:
            - img [ref=e855]
            - generic [ref=e857]: Partner billed
          - generic [ref=e860]: Custom
        - generic [ref=e863] [cursor=pointer]:
          - generic [ref=e865]:
            - img [ref=e869]
            - generic [ref=e871]: Partner billed
          - generic [ref=e873]:
            - generic [ref=e874]: Remote Locks and Check-ins
            - generic [ref=e875]: Custom
        - generic [ref=e878] [cursor=pointer]:
          - generic [ref=e880]:
            - img [ref=e884]
            - generic [ref=e886]: Partner billed
          - generic [ref=e888]:
            - generic [ref=e889]: Guest Experience
            - generic [ref=e890]: Custom
        - generic [ref=e893] [cursor=pointer]:
          - generic [ref=e895]:
            - img [ref=e899]
            - generic [ref=e901]: Partner billed
          - generic [ref=e903]:
            - generic [ref=e904]: Cleaning and Maintenance
            - generic [ref=e905]: Custom
        - generic [ref=e908] [cursor=pointer]:
          - img [ref=e914]
          - generic [ref=e916]:
            - generic [ref=e917]: Messaging
            - generic [ref=e918]: Messaging
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