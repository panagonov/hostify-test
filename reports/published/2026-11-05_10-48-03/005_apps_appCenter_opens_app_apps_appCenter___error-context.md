# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 005-platform-pages.spec.ts >> 005 platform pages >> apps › appCenter opens (/app/apps/appCenter)
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
          - link "App Center" [active] [ref=e58] [cursor=pointer]:
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
      - img "appstore-add" [ref=e100]:
        - img [ref=e101]
      - generic [ref=e103]:
        - navigation [ref=e104]:
          - list [ref=e105]:
            - listitem [ref=e106]:
              - link "Apps" [ref=e108] [cursor=pointer]:
                - /url: /app/apps
            - listitem [ref=e109]: /
            - listitem [ref=e110]:
              - link "App Center" [ref=e112] [cursor=pointer]:
                - /url: /app/apps/appCenter
        - generic [ref=e113]: Browse and connect apps and integrations
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
    - generic [ref=e138]:
      - generic [ref=e139]:
        - heading "Apps" [level=1] [ref=e140]
        - generic [ref=e141]: Manage optional apps and services connected to your workspace.
      - generic [ref=e142]:
        - generic [ref=e143]:
          - img "search" [ref=e145]:
            - img [ref=e146]
          - textbox "Search apps" [ref=e148]
        - generic [ref=e150] [cursor=pointer]:
          - generic [ref=e151]:
            - generic: All categories
            - combobox [ref=e152]
          - img "down" [ref=e154]:
            - img [ref=e155]
        - radiogroup "segmented control" [ref=e157]:
          - generic [ref=e158]:
            - generic [ref=e159] [cursor=pointer]:
              - radio "All92" [checked]
              - generic [ref=e161]: All92
            - generic [ref=e162] [cursor=pointer]:
              - radio "Installed4"
              - generic [ref=e164]: Installed4
            - generic [ref=e165] [cursor=pointer]:
              - radio "Not installed88"
              - generic [ref=e167]: Not installed88
        - generic [ref=e168]: 92 apps
      - generic [ref=e169]:
        - button "Asana Asana" [ref=e170] [cursor=pointer]:
          - img "Asana" [ref=e172]
          - generic [ref=e173]: Asana
        - button "Stripe Stripe" [ref=e174] [cursor=pointer]:
          - img "Stripe" [ref=e176]
          - generic [ref=e177]: Stripe
        - button "Paypal Paypal" [ref=e178] [cursor=pointer]:
          - img "Paypal" [ref=e180]
          - generic [ref=e181]: Paypal
        - button "Booking Engine Booking Engine" [ref=e182] [cursor=pointer]:
          - img "Booking Engine" [ref=e184]
          - generic [ref=e185]: Booking Engine
        - button "Owner Portal Owner Portal" [ref=e186] [cursor=pointer]:
          - img "Owner Portal" [ref=e188]
          - generic [ref=e189]: Owner Portal
        - button "Check-in Form Check-in Form" [ref=e190] [cursor=pointer]:
          - img "Check-in Form" [ref=e192]
          - generic [ref=e193]: Check-in Form
        - button "Mr.GG Mr.GG Coming soon" [ref=e194] [cursor=pointer]:
          - img "Mr.GG" [ref=e196]
          - generic [ref=e197]: Mr.GG
          - generic [ref=e199]: Coming soon
        - button "HostifyAI HostifyAI" [ref=e200] [cursor=pointer]:
          - img "HostifyAI" [ref=e202]
          - generic [ref=e203]: HostifyAI
        - button "WordPress WordPress" [ref=e204] [cursor=pointer]:
          - img "WordPress" [ref=e206]
          - generic [ref=e207]: WordPress
        - button "WordPress Bundle WordPress Bundle" [ref=e208] [cursor=pointer]:
          - img "WordPress Bundle" [ref=e210]
          - generic [ref=e211]: WordPress Bundle
        - button "Excel Reservation Import Excel Reservation Import" [ref=e212] [cursor=pointer]:
          - img "Excel Reservation Import" [ref=e214]
          - generic [ref=e215]: Excel Reservation Import
        - button "Duve Duve Premium" [ref=e216] [cursor=pointer]:
          - img "Duve" [ref=e218]
          - generic [ref=e219]: Duve
          - generic [ref=e221]: Premium
        - button "Chekin Chekin Premium" [ref=e222] [cursor=pointer]:
          - img "Chekin" [ref=e224]
          - generic [ref=e225]: Chekin
          - generic [ref=e227]: Premium
        - button "Superhog Superhog Premium" [ref=e228] [cursor=pointer]:
          - img "Superhog" [ref=e230]
          - generic [ref=e231]: Superhog
          - generic [ref=e233]: Premium
        - button "Hostify Exclusive Promotion Breezeway Breezeway Premium" [ref=e234] [cursor=pointer]:
          - generic [ref=e235]: Hostify Exclusive Promotion
          - img "Breezeway" [ref=e237]
          - generic [ref=e238]: Breezeway
          - generic [ref=e240]: Premium
        - button "Hostify Exclusive Promotion Beyond Pricing Beyond Pricing Premium" [ref=e241] [cursor=pointer]:
          - generic [ref=e242]: Hostify Exclusive Promotion
          - img "Beyond Pricing" [ref=e244]
          - generic [ref=e245]: Beyond Pricing
          - generic [ref=e247]: Premium
        - button "Price Labs Price Labs check Installed Premium" [ref=e248] [cursor=pointer]:
          - img "Price Labs" [ref=e250]
          - generic [ref=e251]: Price Labs
          - generic [ref=e252]:
            - generic [ref=e253]:
              - img "check" [ref=e254]:
                - img [ref=e255]
              - text: Installed
            - generic [ref=e257]: Premium
        - button "Cardcom Cardcom" [ref=e258] [cursor=pointer]:
          - img "Cardcom" [ref=e260]
          - generic [ref=e261]: Cardcom
        - button "Akiles Akiles Premium" [ref=e262] [cursor=pointer]:
          - img "Akiles" [ref=e264]
          - generic [ref=e265]: Akiles
          - generic [ref=e267]: Premium
        - button "Hostify Locks Hostify Locks Premium" [ref=e268] [cursor=pointer]:
          - img "Hostify Locks" [ref=e270]
          - generic [ref=e271]: Hostify Locks
          - generic [ref=e273]: Premium
        - button "RemoteLock RemoteLock Premium" [ref=e274] [cursor=pointer]:
          - img "RemoteLock" [ref=e276]
          - generic [ref=e277]: RemoteLock
          - generic [ref=e279]: Premium
        - button "SMS Messaging SMS Messaging Premium" [ref=e280] [cursor=pointer]:
          - img "SMS Messaging" [ref=e282]
          - generic [ref=e283]: SMS Messaging
          - generic [ref=e285]: Premium
        - button "Key Data Key Data Premium" [ref=e286] [cursor=pointer]:
          - img "Key Data" [ref=e288]
          - generic [ref=e289]: Key Data
          - generic [ref=e291]: Premium
        - button "InsuraGuest InsuraGuest Premium" [ref=e292] [cursor=pointer]:
          - img "InsuraGuest" [ref=e294]
          - generic [ref=e295]: InsuraGuest
          - generic [ref=e297]: Premium
        - button "TurnoverBNB TurnoverBNB Premium" [ref=e298] [cursor=pointer]:
          - img "TurnoverBNB" [ref=e300]
          - generic [ref=e301]: TurnoverBNB
          - generic [ref=e303]: Premium
        - button "Minut Minut Premium" [ref=e304] [cursor=pointer]:
          - img "Minut" [ref=e306]
          - generic [ref=e307]: Minut
          - generic [ref=e309]: Premium
        - button "Turbosuite Turbosuite Premium" [ref=e310] [cursor=pointer]:
          - img "Turbosuite" [ref=e312]
          - generic [ref=e313]: Turbosuite
          - generic [ref=e315]: Premium
        - button "Safely Safely Premium" [ref=e316] [cursor=pointer]:
          - img "Safely" [ref=e318]
          - generic [ref=e319]: Safely
          - generic [ref=e321]: Premium
        - button "Doinn Doinn Premium" [ref=e322] [cursor=pointer]:
          - img "Doinn" [ref=e324]
          - generic [ref=e325]: Doinn
          - generic [ref=e327]: Premium
        - button "Hostify Exclusive Promotion Lula Lula Premium" [ref=e328] [cursor=pointer]:
          - generic [ref=e329]: Hostify Exclusive Promotion
          - img "Lula" [ref=e331]
          - generic [ref=e332]: Lula
          - generic [ref=e334]: Premium
        - button "Hostify Exclusive Promotion Tedee Tedee Premium" [ref=e335] [cursor=pointer]:
          - generic [ref=e336]: Hostify Exclusive Promotion
          - img "Tedee" [ref=e338]
          - generic [ref=e339]: Tedee
          - generic [ref=e341]: Premium
        - button "Hostify Exclusive Promotion Enso Enso Premium" [ref=e342] [cursor=pointer]:
          - generic [ref=e343]: Hostify Exclusive Promotion
          - img "Enso" [ref=e345]
          - generic [ref=e346]: Enso
          - generic [ref=e348]: Premium
        - button "Hostkit Hostkit Premium" [ref=e349] [cursor=pointer]:
          - img "Hostkit" [ref=e351]
          - generic [ref=e352]: Hostkit
          - generic [ref=e354]: Premium
        - button "KeyNest KeyNest Premium" [ref=e355] [cursor=pointer]:
          - img "KeyNest" [ref=e357]
          - generic [ref=e358]: KeyNest
          - generic [ref=e360]: Premium
        - button "Baintex Baintex Premium" [ref=e361] [cursor=pointer]:
          - img "Baintex" [ref=e363]
          - generic [ref=e364]: Baintex
          - generic [ref=e366]: Premium
        - button "Revyoos Revyoos Coming soon" [ref=e367] [cursor=pointer]:
          - img "Revyoos" [ref=e369]
          - generic [ref=e370]: Revyoos
          - generic [ref=e372]: Coming soon
        - button "Hostify Exclusive Promotion Stayfi Stayfi Premium" [ref=e373] [cursor=pointer]:
          - generic [ref=e374]: Hostify Exclusive Promotion
          - img "Stayfi" [ref=e376]
          - generic [ref=e377]: Stayfi
          - generic [ref=e379]: Premium
        - button "Alertify Alertify" [ref=e380] [cursor=pointer]:
          - img "Alertify" [ref=e382]
          - generic [ref=e383]: Alertify
        - button "AutoChatBnB AutoChatBnB" [ref=e384] [cursor=pointer]:
          - img "AutoChatBnB" [ref=e386]
          - generic [ref=e387]: AutoChatBnB
        - button "BeSafe BeSafe" [ref=e388] [cursor=pointer]:
          - img "BeSafe" [ref=e390]
          - generic [ref=e391]: BeSafe
        - button "Bimopay Bimopay" [ref=e392] [cursor=pointer]:
          - img "Bimopay" [ref=e394]
          - generic [ref=e395]: Bimopay
        - button "Hostify Exclusive Promotion Clearing Clearing" [ref=e396] [cursor=pointer]:
          - generic [ref=e397]: Hostify Exclusive Promotion
          - img "Clearing" [ref=e399]
          - generic [ref=e400]: Clearing
        - button "ESTI Bulgaria ESTI Bulgaria" [ref=e401] [cursor=pointer]:
          - img "ESTI Bulgaria" [ref=e403]
          - generic [ref=e404]: ESTI Bulgaria
        - button "iCare / Orion iCare / Orion" [ref=e405] [cursor=pointer]:
          - img "iCare / Orion" [ref=e407]
          - generic [ref=e408]: iCare / Orion
        - button "appstore Invopop (VERI*FACTU, AT Portugal) Premium" [ref=e409] [cursor=pointer]:
          - img "appstore" [ref=e412]:
            - img [ref=e413]
          - generic [ref=e415]: Invopop (VERI*FACTU, AT Portugal)
          - generic [ref=e417]: Premium
        - button "Form bulk download Form bulk download" [ref=e418] [cursor=pointer]:
          - img "Form bulk download" [ref=e420]
          - generic [ref=e421]: Form bulk download
        - button "GuestGenie GuestGenie" [ref=e422] [cursor=pointer]:
          - img "GuestGenie" [ref=e424]
          - generic [ref=e425]: GuestGenie
        - button "HostyAI HostyAI" [ref=e426] [cursor=pointer]:
          - img "HostyAI" [ref=e428]
          - generic [ref=e429]: HostyAI
        - button "Hostify Exclusive Promotion Jervis Systems Jervis Systems" [ref=e430] [cursor=pointer]:
          - generic [ref=e431]: Hostify Exclusive Promotion
          - img "Jervis Systems" [ref=e433]
          - generic [ref=e434]: Jervis Systems
        - button "Keyless Keyless" [ref=e435] [cursor=pointer]:
          - img "Keyless" [ref=e437]
          - generic [ref=e438]: Keyless
        - button "Localbird Localbird" [ref=e439] [cursor=pointer]:
          - img "Localbird" [ref=e441]
          - generic [ref=e442]: Localbird
        - button "Mass Messages Mass Messages" [ref=e443] [cursor=pointer]:
          - img "Mass Messages" [ref=e445]
          - generic [ref=e446]: Mass Messages
        - button "MasterMind MasterMind" [ref=e447] [cursor=pointer]:
          - img "MasterMind" [ref=e449]
          - generic [ref=e450]: MasterMind
        - button "Mercado Pago Mercado Pago" [ref=e451] [cursor=pointer]:
          - img "Mercado Pago" [ref=e453]
          - generic [ref=e454]: Mercado Pago
        - button "Merchantone Merchantone" [ref=e455] [cursor=pointer]:
          - img "Merchantone" [ref=e457]
          - generic [ref=e458]: Merchantone
        - button "Ministerio del interior Ministerio del interior check Installed" [ref=e459] [cursor=pointer]:
          - img "Ministerio del interior" [ref=e461]
          - generic [ref=e462]: Ministerio del interior
          - generic [ref=e464]:
            - img "check" [ref=e465]:
              - img [ref=e466]
            - text: Installed
        - button "Netpay Netpay" [ref=e468] [cursor=pointer]:
          - img "Netpay" [ref=e470]
          - generic [ref=e471]: Netpay
        - button "Partee Partee" [ref=e472] [cursor=pointer]:
          - img "Partee" [ref=e474]
          - generic [ref=e475]: Partee
        - button "Paydollar Paydollar" [ref=e476] [cursor=pointer]:
          - img "Paydollar" [ref=e478]
          - generic [ref=e479]: Paydollar
        - button "Pesopay Pesopay" [ref=e480] [cursor=pointer]:
          - img "Pesopay" [ref=e482]
          - generic [ref=e483]: Pesopay
        - button "Portuguese Police Portuguese Police check Installed" [ref=e484] [cursor=pointer]:
          - img "Portuguese Police" [ref=e486]
          - generic [ref=e487]: Portuguese Police
          - generic [ref=e489]:
            - img "check" [ref=e490]:
              - img [ref=e491]
            - text: Installed
        - button "PrimeHost PrimeHost" [ref=e493] [cursor=pointer]:
          - img "PrimeHost" [ref=e495]
          - generic [ref=e496]: PrimeHost
        - button "RevTech RevTech" [ref=e497] [cursor=pointer]:
          - img "RevTech" [ref=e499]
          - generic [ref=e500]: RevTech
        - button "Roommatik Roommatik" [ref=e501] [cursor=pointer]:
          - img "Roommatik" [ref=e503]
          - generic [ref=e504]: Roommatik
        - button "Shelly Shelly" [ref=e505] [cursor=pointer]:
          - img "Shelly" [ref=e507]
          - generic [ref=e508]: Shelly
        - button "Siampay Siampay" [ref=e509] [cursor=pointer]:
          - img "Siampay" [ref=e511]
          - generic [ref=e512]: Siampay
        - button "SIRE Colombia SIRE Colombia" [ref=e513] [cursor=pointer]:
          - generic [ref=e514]:
            - img "SIRE Colombia"
          - generic [ref=e515]: SIRE Colombia
        - button "Strly Strly" [ref=e516] [cursor=pointer]:
          - generic [ref=e517]:
            - img "Strly"
          - generic [ref=e518]: Strly
        - button "SuiteOp SuiteOp" [ref=e519] [cursor=pointer]:
          - generic [ref=e520]:
            - img "SuiteOp"
          - generic [ref=e521]: SuiteOp
        - button "Swikly Swikly" [ref=e522] [cursor=pointer]:
          - generic [ref=e523]:
            - img "Swikly"
          - generic [ref=e524]: Swikly
        - button "TouchStay TouchStay" [ref=e525] [cursor=pointer]:
          - generic [ref=e526]:
            - img "TouchStay"
          - generic [ref=e527]: TouchStay
        - button "TRA Colombia TRA Colombia" [ref=e528] [cursor=pointer]:
          - generic [ref=e529]:
            - img "TRA Colombia"
          - generic [ref=e530]: TRA Colombia
        - button "Upmarket Upmarket" [ref=e531] [cursor=pointer]:
          - generic [ref=e532]:
            - img "Upmarket"
          - generic [ref=e533]: Upmarket
        - button "Yaago Yaago" [ref=e534] [cursor=pointer]:
          - generic [ref=e535]:
            - img "Yaago"
          - generic [ref=e536]: Yaago
        - button "Yacan Yacan" [ref=e537] [cursor=pointer]:
          - generic [ref=e538]:
            - img "Yacan"
          - generic [ref=e539]: Yacan
        - button "Zapier Zapier" [ref=e540] [cursor=pointer]:
          - generic [ref=e541]:
            - img "Zapier"
          - generic [ref=e542]: Zapier
        - button "Guestar Guestar" [ref=e543] [cursor=pointer]:
          - generic [ref=e544]:
            - img "Guestar"
          - generic [ref=e545]: Guestar
        - button "Valentia Valentia" [ref=e546] [cursor=pointer]:
          - generic [ref=e547]:
            - img "Valentia"
          - generic [ref=e548]: Valentia
        - button "INE INE" [ref=e549] [cursor=pointer]:
          - generic [ref=e550]:
            - img "INE"
          - generic [ref=e551]: INE
        - button "Hostify Exclusive Promotion ChargeAutomation ChargeAutomation Premium" [ref=e552] [cursor=pointer]:
          - generic [ref=e553]: Hostify Exclusive Promotion
          - generic [ref=e554]:
            - img "ChargeAutomation"
          - generic [ref=e555]: ChargeAutomation
          - generic [ref=e557]: Premium
        - button "E&V GO E&V GO" [ref=e558] [cursor=pointer]:
          - generic [ref=e559]:
            - img "E&V GO"
          - generic [ref=e560]: E&V GO
        - button "Moloni Moloni" [ref=e561] [cursor=pointer]:
          - generic [ref=e562]:
            - img "Moloni"
          - generic [ref=e563]: Moloni
        - button "Automated Messages Automated Messages" [ref=e564] [cursor=pointer]:
          - generic [ref=e565]:
            - img "Automated Messages"
          - generic [ref=e566]: Automated Messages
        - button "Airbnb AutoReviews Airbnb AutoReviews" [ref=e567] [cursor=pointer]:
          - generic [ref=e568]:
            - img "Airbnb AutoReviews"
          - generic [ref=e569]: Airbnb AutoReviews
        - button "Email Grabber Email Grabber" [ref=e570] [cursor=pointer]:
          - generic [ref=e571]:
            - img "Email Grabber"
          - generic [ref=e572]: Email Grabber
        - button "Answering Machine Answering Machine" [ref=e573] [cursor=pointer]:
          - generic [ref=e574]:
            - img "Answering Machine"
          - generic [ref=e575]: Answering Machine
        - button "Automated Payments Automated Payments" [ref=e576] [cursor=pointer]:
          - generic [ref=e577]:
            - img "Automated Payments"
          - generic [ref=e578]: Automated Payments
        - button "Auto Pricing Auto Pricing" [ref=e579] [cursor=pointer]:
          - generic [ref=e580]:
            - img "Auto Pricing"
          - generic [ref=e581]: Auto Pricing
        - button "Automated Tasks Automated Tasks" [ref=e582] [cursor=pointer]:
          - generic [ref=e583]:
            - img "Automated Tasks"
          - generic [ref=e584]: Automated Tasks
        - button "Automated Invoicing Automated Invoicing" [ref=e585] [cursor=pointer]:
          - generic [ref=e586]:
            - img "Automated Invoicing"
          - generic [ref=e587]: Automated Invoicing
        - button "Mailbox (Gmail / Microsoft 365) Mailbox (Gmail / Microsoft 365) check Installed" [ref=e588] [cursor=pointer]:
          - generic [ref=e589]:
            - img "Mailbox (Gmail / Microsoft 365)"
          - generic [ref=e590]: Mailbox (Gmail / Microsoft 365)
          - generic [ref=e592]:
            - img "check" [ref=e593]:
              - img [ref=e594]
            - text: Installed
        - button "Twilio (SMS & calls) Twilio (SMS & calls)" [ref=e596] [cursor=pointer]:
          - generic [ref=e597]:
            - img "Twilio (SMS & calls)"
          - generic [ref=e598]: Twilio (SMS & calls)
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