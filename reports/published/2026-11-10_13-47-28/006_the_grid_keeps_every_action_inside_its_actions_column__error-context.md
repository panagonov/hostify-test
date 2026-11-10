# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 006-platform-admin-users.spec.ts >> 006 platform admin › users >> the grid keeps every action inside its actions column
- Location: tests/e2e/006-platform-admin-users.spec.ts:41:9

# Error details

```
Error: The page reported 1 error(s) — API answers, failed requests, console errors:
- [console.error] [dashboard] definition load failed TypeError: Failed to fetch @ https://hostify.bioseek.eu/app/static/js/main.2463612a.js
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
          - generic [ref=e50]: Platform Admin
          - button "left" [ref=e51]:
            - img "left" [ref=e53]:
              - img [ref=e54]
        - generic [ref=e57]:
          - link "Accounts" [ref=e58] [cursor=pointer]:
            - /url: /app/platformAdmin/tenants
            - generic [ref=e59]: Accounts
          - link "Users" [ref=e60] [cursor=pointer]:
            - /url: /app/platformAdmin/users
            - generic [ref=e61]: Users
          - link "Support people" [ref=e62] [cursor=pointer]:
            - /url: /app/platformAdmin/supportAgents
            - generic [ref=e63]: Support people
          - link "User roles" [ref=e64] [cursor=pointer]:
            - /url: /app/platformAdmin/securityGroups
            - generic [ref=e65]: User roles
    - generic [ref=e66]:
      - generic [ref=e68] [cursor=pointer]:
        - generic [ref=e69]:
          - img [ref=e71]:
            - img [ref=e72]
          - superscript [ref=e74]:
            - generic [ref=e76]: "1"
        - generic [ref=e77]: Notifications
      - generic [ref=e78]:
        - button "Collapse menu" [expanded] [ref=e79] [cursor=pointer]:
          - img "double-left" [ref=e80]:
            - img [ref=e81]
        - button "v 1.0.10" [ref=e83] [cursor=pointer]
  - banner [ref=e85]:
    - button "arrow-left" [ref=e86] [cursor=pointer]:
      - img "arrow-left" [ref=e88]:
        - img [ref=e89]
    - img "user" [ref=e92]:
      - img [ref=e93]
    - generic [ref=e95]:
      - navigation [ref=e96]:
        - list [ref=e97]:
          - listitem [ref=e98]:
            - link "Platform Admin" [ref=e100] [cursor=pointer]:
              - /url: /app/platformAdmin
          - listitem [ref=e101]: /
          - listitem [ref=e102]:
            - link "Users" [ref=e104] [cursor=pointer]:
              - /url: /app/platformAdmin/users
      - generic [ref=e105]: People who can sign in, with their roles and status
    - button "search Search everything… ⌘K" [ref=e106] [cursor=pointer]:
      - img "search" [ref=e107]:
        - img [ref=e108]
      - generic [ref=e110]: Search everything…
      - generic [ref=e111]: ⌘K
    - button "Audit log" [ref=e112] [cursor=pointer]:
      - img "audit" [ref=e113]:
        - img [ref=e114]
    - button "Dark theme" [ref=e116] [cursor=pointer]:
      - img "moon" [ref=e118]:
        - img [ref=e119]
    - generic [ref=e121] [cursor=pointer]:
      - img "user" [ref=e124]:
        - img [ref=e125]
      - generic [ref=e128]: admin
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