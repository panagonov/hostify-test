# Карта на менютата и формите на QA акаунта (Стъпка 1, 2026-11-26)

Огледът е **headless и само гледане**: администраторът на „QA Automation“ отваря всяка страница от живото си меню,
чете грида (изгледи, колони, бутони, действията на първия ред и табовете на записа, когато има редове), натиска бутона
за създаване, чете формата (табове, полета, задължителни `*`, вид на контрола, първите опции на падащите списъци),
натиска **Save на празната форма** и чете отказа, после **Cancel**. Всеки запис към сървъра (не-GET, освен четенията)
е спрян в браузъра — **нищо не е записано**. Не са отваряни по правилата формите на каналите, плъгините, плащанията,
картите, e-фактурите, AI настройките, Process rules, Security, Billing, Demo data.

Скрипт и сурови данни (не са в git): `look/map/map.spec.ts`, `look/map.json` в scratchpad-а на сесията.

## Версии

Картата вървя 12:57:50–14:19:20; Listings е огледан наново 14:20–14:24; Settings и шестте форми — наново на 1.0.31 (~15:20); помощникът за обява — ~15:45.
Changelog-ът дава 1.0.30 (13:15) и 1.0.31 (13:44) — това са часовете на изданията, но API-то още отговаряше **1.0.29**
след 14:05, т.е. внедряването е след това. Групите до Custom data / Usage (свършили до ~14:03) са на **1.0.29**;
Settings е огледан наново на **1.0.31** (единствената разлика спрямо 1.0.29: Extras › „Create a new fee item“ вече
отваря форма отстрани — Name, **Type \***, **Charge type \***, **Status \***, …); Listings, помощникът и шестте форми — на
**1.0.31** (долу в лентата „v 1.0.31“). 1.0.30 (асистентът и каналите / плъгините) и 1.0.31 (компании
по обява) не обявяват промени във формите на картата, освен полето „Assistant“ на записа на приложение (Apps — не отваряно).

## Живото меню срещу inventory и списъка на QA

Водещо е живото меню. 178 страници в 18 групи съвпадат с inventory. В inventory, но не в менюто — 15 (Reviews на
Airbnb / Booking.com / VRBO, Booking optimizer, Promotions); `alerts` е в менюто, а в inventory е `noMenu` — бележка за
програмиста: `feedback/2026-11-26-1-0-29-inventory-navigation-json-се-разминава-с-жи.md`.
Спрямо списъка на QA: Tasks = група Operations с 12 страници; Reviews (Internal) = Dashboard, Internal reviews, Reviews;
Pricing — 6 страници (Lodging taxes = `taxRules`); Automations — 8 страници; More = Channels (9), Apps (9), Other
features (42), Custom data (1), Usage (3), Settings (32 огледани).

## Обобщение по групи

| Група | Версия | Страници | С грид | С бутон за създаване | Огледани форми | Неотворени по правило | Задължителни полета (общо) | Форма без нито едно задължително | Страници с редове |
|---|---|---|---|---|---|---|---|---|---|
| Inbox | 1.0.29 | 8 | 7 | 6 | 6 | 0 | 16 | conversationScores | 4 |
| Calendar, Reservations, Guests | 1.0.29 | 5 | 4 | 4 | 3 | 1 | 5 | — | 0 |
| Operations (Tasks) | 1.0.29 | 12 | 9 | 9 | 9 | 0 | 26 | checkFindings | 2 |
| Listings | 1.0.31 (повторен оглед ~14:20) | 7 | 7 | 7 | 7 | 0 | 18 | — | 0 |
| Reporting, Reviews | 1.0.29 | 12 | 9 | 5 | 5 | 0 | 9 | listingBenchmarks | 0 |
| Pricing | 1.0.29 | 6 | 6 | 6 | 6 | 0 | 31 | — | 1 |
| Owners, Finance | 1.0.29 | 12 | 10 | 9 | 9 | 0 | 33 | — | 2 |
| Automations | 1.0.29 | 8 | 7 | 7 | 7 | 0 | 53 | — | 2 |
| Channels, Apps (само гледане — формите не се отварят) | 1.0.29 | 18 | 15 | 13 | 0 | 13 | 0 | — | 2 |
| Other features | 1.0.29 | 42 | 39 | 34 | 27 | 7 | 124 | aiUsages | 10 |
| Custom data, Usage | 1.0.29 | 4 | 3 | 0 | 0 | 0 | 0 | — | 3 |
| Settings | 1.0.31 (повторен оглед ~15:20) | 32 | 25 | 19 | 18 | 1 | 136 | securityGroups | 12 |

## Находки на картата (решения на QA, 2026-11-26)

- **Save на празна форма изпраща заявката** (няма задължително поле, няма проверка във формата):
  - Settings › Roles — **QA-534** „кандидат“ (ще се потвърди в тестовете за Roles; ако сървърът приеме роля без име, тестът я трие);
  - Inbox › Conversation quality, Operations › Check findings, Reporting › Listing benchmarks, Other features › AI usage —
    един въпрос към програмиста: `feedback/2026-11-26-1-0-29-forms-without-required-fields.md`.
- **Остатъци от премахнатото в 1.0.29** във формата на роля: полето Portal — **QA-535**, правото Sub customers — **QA-536**
  (кандидати; `gaps.md` #7).
- Cancel след спрения запис не затвори тези пет форми (заявката висеше) — от огледа, **не е бъг**.
- `POST /api/security/accounts → 404` на страниците на Inbox — QA-507 (потвърден), видян и тук.

## Създаване, което не е форма отстрани

- **Listings › „Create a new listing“** → страница `/listingsMenu/listingWizard` „New listing“, 6 стъпки; бутони Back,
  Save & Exit, Save & Continue (на последната — **Finish**). Огледан на 1.0.31 със стойности „QA …“ и **без Finish / Save &
  Exit**: мрежата е следена на всяка стъпка — **Save & Continue не праща нито една заявка за запис** (чернова не се пази;
  помощникът държи всичко в браузъра до Finish). Горе: „Already listed somewhere? Import it from the link“ (Airbnb,
  Booking.com, Vrbo, trip.com) — **Import никога не се натиска** (внос от канал).
  1. **General**: Search the address (Find, Show on map), **Listing nickname \***, **Property type \*** (Apartment,
     Condominium, Loft, Serviced apartment, Aparthotel, House, Villa, Townhouse …), **Place type \*** (= Entire place), Tags,
     Brand, **Country \***, **City \*** („Type at least 2 letters“; „Sofia · 22“), Neighbourhood, **Street \***, No., ZIP,
     Time zone, Licence / registration number.
  2. **Layout**: **Capacity (guests) \***, **Bedrooms \***, **Bathrooms \*** (празни → „Please enter …“), Area + Unit, стаи
     (Room name = Bedroom 1, вид, легла, Beds = 1; Add another room).
  3. **Amenities**: отметки по категории (с „Check all amenities from this category“) и знаци към кои канали отиват
     (ABB, BDC, vrbo, marriottHomesVillas); нищо задължително.
  4. **Texts**: **Language \*** (EN), Title, Summary, The space, Guest access, The neighbourhood, House rules, Interaction
     with guests, Getting around, Other things to note; Add a language.
  5. **Policies**: **Currency \*** (EUR), **Default price \***, Guests included, Extra guest price, Default min / max stay,
     Min days in advance, **Booking window (days) \*** (120 days), Availability window, Prep before / after (= 0), Days
     guests can't check in / out, **Check-in from \*** (08:00), Check-in until, Flexible, **Check-out \***, **Instant
     booking \*** (Everyone), Cancellation policy, Children, Infants, Pets, Smoking, Events.
  6. **Photos**: Add photo; **„Activate now (PMS Services ON)“ — отметнато по подразбиране** (Finish би активирал обявата).
- Reservations › „Add new“ → отваря Calendar (`/multiCalendar`) — резервацията се прави от календара.
- Settings › Extras › „Create a new fee item“ → страницата Fee items (`/settings/feeItems?feeItemType=…extra`).

## Неотворени форми

По правилата (канали, плъгини, плащания, карти, e-фактури, Process rules, Security, Billing, Demo data, AI): Channels и
Apps изцяло; Owner statement runs, SEPA payout batches, e-Invoice submissions, Credit cards, iCal subscriptions / export
feeds, Deferred writes, Booking sites, Reservation imports (Excel внос — ще се огледа с наш тестов файл).

Шестте форми, пропуснати първо от твърде широкия филтър (думите „payment“, „plan“, „notification“), са огледани на
1.0.31 (само гледане, Cancel); всички отказват празен Save със „Required field“ и се затварят с Cancel:
Settings › Payment schedules (**Name \***), Owners › Payments (**Owner, Direction, Payment mode, Method, Amount, Payment
date \***), Finance › Transactions (**Reservation, Type, Action, Amount \***), Automations › Auto payment rules (13
задължителни — само гледане), Other features › Calendar service › Rate plans (не е на каналите; **Listing, Default daily
price, Currency, Max advance period \***), Operations › Task notification settings (**Event, Recipients, Channels \***).

## Страница по страница

## Inbox

Версия при огледа: 1.0.29. Страници: 8.

### unifiedInbox — `unifiedInbox`

- Адрес: `/app/inbox/unifiedInbox`
- Бутони: Open 0, [inbox-filters]
- Създаване: няма бутон
- API 4xx/5xx: 404 POST /security/accounts

### inboxThreads — `inboxThreads`

- Адрес: `/app/inbox/inboxThreads`
- Изгледи (табове на грида): Default, All, Closed, Open, Snoozed, Support
- Колони (17): Name, State, Thread type, Guest, Listing, Reservation, Source, Reservation status, Check in, Check out, Assignee, Tags, Starred, Unread, Awaiting reply, Last message preview, Last message at; редове: 0 (Total: 0)
- Бутони: Create a new inbox thread, Export, Customize view
- Създаване: „Create a new inbox thread“ → форма „Create inbox thread“
  - Полета (34): Name _text_; Thread type **\*** _select_; State **\*** _select_; Snoozed until _date_; Assignee _select_; Starred _switch_; Unread _switch_; Awaiting reply _switch_; No reply needed _switch_; Detected language _select_; Translate enabled _switch_; Reservation _select_; Guest _select_; Listing _select_; Source _select_; Channel account _select_; Channel thread id _text_; Reservation status _select_; Check in _date_; Check out _date_; Last message at _date_; Last inbound at _date_; First response at _date_; Unread count _number_; Closed at _date_; Closed by _select_; Last message preview _textarea_; Pinned note _select_; Handled by _select_; Since _date_; Escalated by the AI _date_; Taken over by _select_; Last AI run _select_; Escalation reason _text_
  - Save на празна форма: отказ — Required field; Required field
  - Cancel: затваря

### inboxAiRuns — `inboxAiRuns`

- Адрес: `/app/inbox/inboxAiRuns`
- Изгледи (табове на грида): Default, All runs, Answered, Needs attention
- Колони (11): Name, Conversation, Reservation, Status, Decision, Run type, What the guest wants, Guest language, Date created, Duration (ms), Listing; редове: 0 (Total: 0)
- Бутони: AI run, Export, Customize view
- Създаване: „AI run“ → форма „AI run“
  - Полета (26): Name _text_; Conversation _select_; Status **\*** _select_; Run type **\*** _select_; Reservation _select_; Listing _select_; Guest _select_; Guest language _select_; Decision _select_; Why _textarea_; Text written _textarea_; Message sent _select_; Note for the team _select_; Issue logged _select_; Stay extension _select_; Payment requested _select_; What the assistant understood _textarea_; First message _date_; Due _date_; Started _date_; Finished _date_; Duration (ms) _number_; Attempts _number_; AI model _text_; Asked by _select_; Error _text_
  - Save на празна форма: отказ — Required field; Required field
  - Cancel: затваря

### conversationScores — `conversationScores`

- Адрес: `/app/inbox/conversationScores`
- Изгледи (табове на грида): Default, All, All, All, All, All, All, All, Needs a look, Not resolved, All
- Колони (9): Name, Day, Score, Resolved, Accurate, Polite, Slow, Answered by, Listing; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, Create a new conversation score, Export, Customize view
- Създаване: „Create a new conversation score“ → форма „Create conversation score“
  - Полета (12): Name _text_; Inbox thread _select_; Day _date_; Score _number_; Resolved _switch_; Accurate _switch_; Polite _switch_; Slow _switch_; Answered by _select_; Listing _select_; Reservation _select_; Model _text_
  - Save на празна форма: **без отказ във формата — заявката тръгна (спряна от огледа)**
  - Cancel: не стигна (страницата се смени)
- Бележка на огледа: TimeoutError: locator.click: Timeout 20000ms exceeded. Call log: [2m - waiting for locator('.ant-drawer-open .ant-drawe

### messageTemplates — `messageTemplates`

- Адрес: `/app/inbox/messageTemplates`
- Колони (6): Name, Category, Default language, Is global, Active, Date updated; редове: 10 (Total: 30)
- Бутони: Add card0 / 5, Create a new message template, Export, Customize view
- Страница на запис (`/inbox/messageTemplates/bookingConfirmation/info`): табове Info, Audit log
- Създаване: „Create a new message template“ → форма „Create message template“
  - Полета (5): Name **\*** _text_; Category **\*** _select_; Default language **\*** _select_; Active _switch_; Is global _switch_
  - Save на празна форма: отказ — Required field; Required field; Required field
  - Cancel: затваря

### emailTemplates — `emailTemplates`

- Адрес: `/app/inbox/emailTemplates`
- Колони (7): Name, Event, Audience, Subject, Active, System, Date created; редове: 10 (Total: 16)
- Бутони: Create a new email template, Export, Customize view
- Действия на реда: edit, delete
- Страница на запис (`/inbox/emailTemplates/dboeq6EBTQeRW773bBiJ/info`): табове Info, Designer, Audit log
- Създаване: „Create a new email template“ → форма „Create email template“
  - Езикови табове: * Name (en), Name (es), Name (fr), Name (pt), * Subject (en), Subject (es), Subject (fr), Subject (pt) (едни и същи полета)
  - Полета (5): Event **\*** _select_; Audience _select_; (без етикет) _text_; Active _switch_; System _switch_
  - Save на празна форма: отказ — Required field; Required field; Required field
  - Cancel: затваря

### emailLogs — `emailLogs`

- Адрес: `/app/inbox/emailLogs`
- Колони (6): Date created, Event, Template, To, Subject, Status; редове: 10 (Total: 77)
- Бутони: Export, Customize view
- Действия на реда: eye
- Страница на запис (`/inbox/emailTemplates/Zboeq6EBTQeRW773axjq/info`): табове Info, Designer, Audit log
- Създаване: няма бутон

### inboxTags — `inboxTags`

- Адрес: `/app/inbox/inboxTags`
- Колони (6): Name, Color, Thread count, Active, Sort order, Description; редове: 10 (Total: 10)
- Бутони: Add card0 / 5, Create a new inbox tag, Export, Customize view
- Действия на реда: row-actions, Edit, Remove
- Страница на запис (`/inbox/inboxTags/droeq6EBTQeRW773bRgL/info`): табове Info, Audit log
- Създаване: „Create a new inbox tag“ → форма „Create inbox tag“
  - Полета (5): Name **\*** _text_; Color _other_; Active _switch_; Sort order _number_; Description _textarea_
  - Save на празна форма: отказ — Required field
  - Cancel: затваря


## Calendar, Reservations, Guests

Версия при огледа: 1.0.29. Страници: 5.

### Calendar — `multiCalendar`

- Адрес: `/app/multiCalendar`
- Бутони: Filters, Find availability, [mc-prev], Today, [mc-next], Sync, Legend, [mc-display], [mc-more]
- Създаване: няма бутон

### reservations — `reservations`

- Адрес: `/app/reservationsMenu/reservations`
- Изгледи (табове на грида): Default, Cancelled, Checking in today, Checking out today, Confirmed, Currently hosting, Owner stays, Past reservations, Requests, Upcoming, Past reservations, Upcoming
- Колони (15): Name, Code, Confirmation code, Channel reservation id, Listing, Listing unit, Guest, Check in, Check out, Nights, Status, Source, Revenue, Guest payment status, Date created; редове: 0 (Total: 0)
- Бутони: Add new, [reservation-create-more], Export, Customize view, Views, Public link
- Създаване: „Add new“ → страница `/multiCalendar`
  - Полета (0): —
  - Save на празна форма: без съобщение
  - Cancel: не стигна (страницата се смени)

### reservationAlterations — `reservationAlterations`

- Адрес: `/app/reservationsMenu/reservationAlterations`
- Изгледи (табове на грида): Default, Declined / failed, Done, Open
- Колони (13): Name, Reservation, Origin, Status, Channel alteration id, Original check in, New check in, Original check out, New check out, Payout difference, Requested at, Expires at, Date created; редове: 0 (Total: 0)
- Бутони: Create a new reservation alteration, Export, Customize view
- Създаване: „Create a new reservation alteration“ → форма „Create reservation alteration“
  - Полета (32): Reservation **\*** _select_; Origin **\*** _select_; Status _select_; Original check in _date_; New check in **\*** _date_; Original check out _date_; New check out **\*** _date_; Original listing _select_; New listing _select_; Guest message _textarea_; Original base price _select_; (без етикет) _select_; New base price _select_; Original cleaning fee _select_; New cleaning fee _select_; Original channel commission _select_; New channel commission _select_; Original payout _select_; New payout _select_; Price adjustment _select_; Service fee adjustment _select_; Vat adjustment _select_; Payout difference _select_; Guest total _select_; Price recalculated _switch_; Channel alteration id _text_; Expires at _date_; Requested at _date_; Requested by _select_; Responded at _date_; Responded by _select_; Failure reason _textarea_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field
  - Cancel: затваря

### reservationImports — `reservationImports`

- Адрес: `/app/reservationsMenu/reservationImports`
- Изгледи (табове на грида): Default, Completed, Failed / undone, In progress
- Колони (14): Name, Number, Status, Uploaded by, Total rows, Imported count, Skipped count, Error count, Run automations, Update existing, Default source, Completed at, Undone at, Date created; редове: 0 (Total: 0)
- Бутони: Create a new reservation import, Export, Customize view
- Създаване: „Create a new reservation import“ — **не е отварян по правилата** (канали / плъгини / плащания / AI / Process rules / сигурност / billing)

### Guests — `guests`

- Адрес: `/app/guests`
- Изгледи (табове на грида): Default, Anonymized, Verified
- Колони (11): Name, Email, Phone, Location, Is verified, Country, Language, Reservations count, Last stay at, Total revenue, Date created; редове: 0 (Total: 0)
- Бутони: Create a new guest, Export, Customize view, Views
- Създаване: „Create a new guest“ → форма „Create guest“
  - Полета (53): Salutation _text_; Preferred contact _select_; Loyalty discount (%) _number_; First name **\*** _text_; Last name _text_; Email _text_; Phone _text_; Language _select_; Gender _select_; Date of birth _date_; Nationality _select_; Location _text_; Country _select_; State _select_; City _select_; District _text_; Street _text_; Street number _text_; Block _text_; Postcode _text_; Entrance _text_; Floor _text_; Apartment _text_; Building _text_; Zone _text_; Type _select_; Primary _switch_; Verified _switch_; Address note _text_; Location _other_; Tax id _text_; Work _text_; Shared with the master account _switch_; Is verified _switch_; Email verified _switch_; Phone verified _switch_; Government id verified _switch_; Previous no shows _number_; Facebook url _text_; About _textarea_; Avatar _upload_; Add a note _textarea_; Blacklisted _switch_; Why blacklisted _text_; Reservations count _number_; First stay at _date_; Last stay at _date_; Total revenue _select_; (без етикет) _select_; Anonymized _switch_; Reviews count _number_; Average rating _number_; Returning guest _switch_
  - Save на празна форма: отказ — Required field
  - Cancel: затваря


## Operations (Tasks)

Версия при огледа: 1.0.29. Страници: 12.

### checkFindings — `checkFindings`

- Адрес: `/app/operations/checkFindings`
- Изгледи (табове на грида): Default, All, Critical, Open
- Колони (8): Name, Check, Severity, Status, Record name, Listing, Money at risk, Last seen at; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, Create a new check finding, Export, Customize view
- Създаване: „Create a new check finding“ → форма „Create check finding“
  - Полета (15): Name _text_; Check _select_; Severity _select_; Status _select_; Record name _text_; Listing _select_; Reservation _select_; Money at risk _select_; (без етикет) _select_; Detail _textarea_; Fix label _textarea_; First seen at _date_; Last seen at _date_; Resolved at _date_; Dismiss note _textarea_
  - Save на празна форма: **без отказ във формата — заявката тръгна (спряна от огледа)**
  - Cancel: не стигна (страницата се смени)
- Бележка на огледа: TimeoutError: locator.click: Timeout 20000ms exceeded. Call log: [2m - waiting for locator('.ant-drawer-open .ant-drawe

### tasks — `tasks`

- Адрес: `/app/operations/tasks`
- Изгледи (табове на грида): Default, Cancelled, Done, In progress, New, Overdue, This week, Today, Tomorrow
- Колони (15): Task no., Title, Type, Priority, Status, Overdue, Property, Reservation, Possible start, Deadline, Assignee, Team, Service company, Cost, Created from; редове: 0 (Total: 0)
- Бутони: Create a new task, Export, Customize view, Views
- Създаване: „Create a new task“ → форма „Create task“
  - Полета (27): Title **\*** _text_; Type _select_; Priority **\*** _select_; Property _select_; Unit _select_; Reservation _select_; Next reservation _select_; Template _select_; Status **\*** _select_; Possible start _date_; Deadline _date_; Assignee _select_; Team _select_; Service company _select_; Visible to _multi-select_; Cost _select_; (без етикет) _select_; Currency **\*** _select_; Estimated duration (h) _number_; Guests _number_; Description _textarea_; Issue _select_; Show on calendar _switch_; Linked records _multi-select_; Completion report _textarea_; Damage report _textarea_; Cancel reason _textarea_
  - Save на празна форма: отказ — Required field; Required field
  - Cancel: затваря

### housekeepingBoard — `housekeepingBoard`

- Адрес: `/app/operations/housekeepingBoard`
- Колони (12): Date, Listing, Property status, Type, Time, Guests, Beds, Nights, Cleaning notes, Tags, Cleaning task, Cost; редове: 0
- Бутони: + Add view, Export CSV, Share
- Карти / плочки (1): Overdue tasks0
- Създаване: няма бутон

### taskDashboard — `taskDashboard`

- Адрес: `/app/operations/taskDashboard`
- Табло: 7 уиджета
- Бутони: Save as new view, Next 30 days, Last 30 days, This month, All time, Export, Edit
- Карти / плочки (1): Overdue tasks0
- Създаване: няма бутон

### taskIssues — `taskIssues`

- Адрес: `/app/operations/taskIssues`
- Изгледи (табове на грида): Default, Dismissed, In progress, Open, Resolved
- Колони (13): Issue no., Reported at, Listing, Reservation, Type, Priority, Issue text, Damage, Estimated cost, Reported by, Status, Resolution task, Date created; редове: 0 (Total: 0)
- Бутони: Create a new task issue, Export, Customize view
- Създаване: „Create a new task issue“ → форма „Create task issue“
  - Полета (15): Listing **\*** _select_; Reservation _select_; Type **\*** _select_; Priority **\*** _select_; Damage _switch_; Issue text **\*** _textarea_; Estimated cost _select_; (без етикет) _select_; Found during task _select_; Resolution task _select_; Conversation _select_; Guest message _select_; AI assessment _textarea_; Status _select_; Resolution note _textarea_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field
  - Cancel: затваря

### myTasks — `myTasks`

- Адрес: `/app/operations/myTasks`
- Бутони: Refresh
- Създаване: няма бутон

### taskTemplates — `taskTemplates`

- Адрес: `/app/operations/taskTemplates`
- Колони (7): Name, Type, Priority, Default duration (min), Default cost, Active, Date created; редове: 6 (Total: 6)
- Бутони: Add card0 / 5, Create a new task template, Export, Customize view
- Действия на реда: row-actions, Edit, Remove
- Страница на запис (`/operations/taskTemplates/tt-f2b3ad65-0d9a-4992-929c-3abe4823df98-deepClean/info`): табове Info, Audit log
- Създаване: „Create a new task template“ → форма „Create task template“
  - Полета (9): Name **\*** _text_; Type **\*** _select_; Priority **\*** _select_; Default duration (min) _number_; Default cost _select_; (без етикет) _select_; Currency _select_; Active _switch_; Description _textarea_
  - Save на празна форма: отказ — Required field; Required field; Required field
  - Cancel: затваря

### defaultAssignments — `defaultAssignments`

- Адрес: `/app/operations/defaultAssignments`
- Колони (7): Name, Listing, Task type (empty = all), Assignee, Team, Active, Date created; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, Create a new default assignment, Export, Customize view
- Създаване: „Create a new default assignment“ → форма „Create default assignment“
  - Полета (5): Listing **\*** _select_; Task type (empty = all) _select_; Assignee _select_; Team _select_; Active _switch_
  - Save на празна форма: отказ — Required field
  - Cancel: затваря

### taskTeams — `taskTeams`

- Адрес: `/app/operations/taskTeams`
- Колони (7): Name, Email, Members, Supervisors, Calendar colour, Active, Date created; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, Create a new task team, Export, Customize view
- Създаване: „Create a new task team“ → форма „Create task team“
  - Полета (7): First name **\*** _text_; Last name **\*** _text_; Email **\*** _text_; Calendar colour _other_; Active _switch_; Members **\*** _multi-select_; Supervisors _multi-select_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field
  - Cancel: затваря

### taskNotificationSettings — `taskNotificationSettings`

- Адрес: `/app/operations/taskNotificationSettings`
- Колони (8): Name, Event, Recipients, Specific users, Channels, Minutes before start, Active, Date created; редове: 10 (Total: 12)
- Бутони: Add card0 / 5, Create a new task notification setting, Export, Customize view
- Действия на реда: row-actions, Edit, Remove
- Страница на запис (`/operations/taskNotificationSettings/tns-f2b3ad65-0d9a-4992-929c-3abe4823df98-expenseAdded/info`): табове Info, Audit log
- Създаване: „Create a new task notification setting“ → форма „Create task notification setting“
  - Полета (8): Event **\*** _select_; Active _switch_; Recipients **\*** _multi-select_; Specific users _multi-select_; Channels **\*** _multi-select_; Minutes before start _number_; Send the summary at _text_; Summary covers (days) _number_
  - Save на празна форма: отказ — Required field; Required field; Required field
  - Cancel: затваря

### calendar — `calendar`

- Адрес: `/app/operations/calendar`
- Бутони: Create a new calendar, Today, Customize view, Work hours
- Създаване: „Create a new calendar“ → форма „Create calendar“
  - Полета (14): Type _select_; Name **\*** _text_; User **\*** _select_; Period _date-range_; All day _switch_; Repeating _switch_; From _date_; To _date_; Repeating value _multi-select_; Repeating type _select_; Calendar name **\*** _select_; Meeting collaborators _multi-select_; Listing _select_; Watchers _multi-select_
  - Save на празна форма: отказ — Required field; Required field; Required field
  - Cancel: затваря

### taskExpenses — `taskExpenses`

- Адрес: `/app/operations/taskExpenses`
- Изгледи (табове на грида): Default, Cancelled, Draft, Posted
- Колони (11): Name, Task, Cost, Vendor, Expense category, VAT rate, Receipt, Added by, Status, Owner expense, Date created; редове: 0 (Total: 0)
- Бутони: Create a new task expense, Export, Customize view
- Създаване: „Create a new task expense“ → форма „Create task expense“
  - Полета (9): Task **\*** _select_; Description **\*** _text_; Cost **\*** _select_; (без етикет) _select_; Currency **\*** _select_; Vendor _select_; Expense category _select_; VAT rate _select_; Receipt _upload_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field
  - Cancel: затваря


## Listings

Версия при огледа: 1.0.31 (повторен оглед ~14:20). Страници: 7.

### listings — `listings`

- Адрес: `/app/listingsMenu/listings`
- Изгледи (табове на грида): Default, Active listings, All listings, Archived, Child listings, Inactive listings, Listed, Unlisted
- Колони (26): Listing, Listing ID, Channels, Integration, Property status, Title, PMS Services, Listed, Multi-unit role, Property type, Listing type, Address, Tags, Instant booking, Brand, Owner, Group, Licence number, Security deposit, Capacity, Bedrooms, Price, Min nights, Currency, Cleaning fee, Date created; редове: 0 (Total: 0)
- Бутони: Create a new listing, Export, Customize view, Views
- Създаване: „Create a new listing“ → страница `/listingsMenu/listingWizard`
  - Полета (0): —
  - Save на празна форма: без съобщение
  - Cancel: не стигна (страницата се смени)

### listingFaqs — `listingFaqs`

- Адрес: `/app/listingsMenu/listingFaqs`
- Изгледи (табове на грида): Default, All, All, All, All, All, All, All, All, All, All, All, All, All, All, All, All, All, All, All, All, All, Learned, to review, All
- Колони (6): Question, Category, Status, Date created, Source, Reviewed at; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, Create a new listing faq, Export, Customize view
- Създаване: „Create a new listing faq“ → форма „Create listing faq“
  - Полета (7): Question **\*** _text_; Category _select_; Status _select_; Source _select_; Source thread _select_; Reviewed at _date_; Valid days _number_
  - Save на празна форма: отказ — Required field
  - Cancel: затваря

### guidebookTemplates — `guidebookTemplates`

- Адрес: `/app/listingsMenu/guidebookTemplates`
- Колони (5): Name, Template type, Language, Active, Date created; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, Create a new guidebook template, Export, Customize view
- Създаване: „Create a new guidebook template“ → форма „Create guidebook template“
  - Полета (8): Name **\*** _text_; Template type **\*** _select_; Language _text_; All listings _switch_; Show instructions days before _number_; Active _switch_; Listings _select_; Tags _select_
  - Save на празна форма: отказ — Required field; Required field
  - Cancel: затваря

### listingUnits — `listingUnits`

- Адрес: `/app/listingsMenu/listingUnits`
- Колони (11): Name, Listing, Member listing, Door / apartment no., Property status, Status changed at, Status changed by, Building, Sort order, Active, Date created; редове: 0 (Total: 0)
- Бутони: Create a new listing unit, Export, Customize view
- Създаване: „Create a new listing unit“ → форма „Create listing unit“
  - Полета (8): Listing **\*** _select_; Active _switch_; Sort order _number_; Name **\*** _text_; Door / apartment no. _text_; Building _select_; Member listing _select_; Property status _select_
  - Save на празна форма: отказ — Required field; Required field
  - Cancel: затваря

### listingBuildings — `listingBuildings`

- Адрес: `/app/listingsMenu/listingBuildings`
- Колони (5): Building name, Leading listing, Address, Sort order, Date created; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, Create a new listing building, Export, Customize view
- Създаване: „Create a new listing building“ → форма „Create listing building“
  - Полета (21): Building name **\*** _text_; Sort order _number_; Leading listing _select_; Country _select_; State _select_; City _select_; District _text_; Street _text_; Street number _text_; Block _text_; Postcode _text_; Entrance _text_; Floor _text_; Apartment _text_; Building _text_; Zone _text_; Type _select_; Primary _switch_; Verified _switch_; Address note _text_; Location _other_
  - Save на празна форма: отказ — Required field
  - Cancel: затваря

### listingLinks — `listingLinks`

- Адрес: `/app/listingsMenu/listingLinks`
- Колони (12): Name, Link type, Parent / source listing, Child / affected listing, Direction, Link status, Calendar rules warning, Price markup %, Pricing, Existing reservations, Note, Date created; редове: 0 (Total: 0)
- Бутони: Create a new listing link, Export, Customize view
- Създаване: „Create a new listing link“ → форма „Create listing link“
  - Полета (18): Link type **\*** _select_; Direction **\*** _select_; Link status _select_; Parent / source listing **\*** _select_; Child / affected listing **\*** _select_; Price markup % _number_; Existing reservations _switch_; Note _textarea_; Calendar rules warning _textarea_; Pricing _switch_; Description _switch_; Rooms _switch_; Amenities _switch_; Photos _switch_; Settings _switch_; Address _switch_; Custom fields _switch_; Seasonal promotions _switch_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field
  - Cancel: затваря

### listingPolicies — `listingPolicies`

- Адрес: `/app/listingsMenu/listingPolicies`
- Колони (8): Name, Code, Channels, Non-refundable, Default, System, Active, Date created; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, Create a new listing policy, Export, Customize view
- Създаване: „Create a new listing policy“ → форма „Create listing policy“
  - Езикови табове: Guest description (en), Guest description (es), Guest description (fr), Guest description (pt) (едни и същи полета)
  - Полета (6): Name **\*** _text_; Code **\*** _select_; Non-refundable _switch_; Default _switch_; Active _switch_; (без етикет) _textarea_
  - Save на празна форма: отказ — Required field; Required field
  - Cancel: затваря


## Reporting, Reviews

Версия при огледа: 1.0.29. Страници: 12.

### reportingOverview — `reportingOverview`

- Адрес: `/app/reporting/reportingOverview`
- Табло: 15 уиджета
- Бутони: Save as new view, Inspect data, Export page CSV, This month, Last month, This year, Last year, Last 30 days, Last 7 days, Year to date, Last 90 days, Last 365 days, This week, Previous week, Export, Edit
- Създаване: няма бутон

### pivotGrid — `pivotGrid`

- Адрес: `/app/reporting/pivotGrid`
- Бутони: Excel, Analyses ▾, abcCity, abcListing, abcUnit, abcMember listing, tagTag, abcOwner, abcOwner contract, abcChannel, countReservation, abcNight status, abcRow kind, cycleYear, cycleQuarter of year, cycleMonth of year, cycleWeekday, #All unit-nights, #Booked nights, #Available nights, #Blocked nights, #Owner-stay nights, %Occupancy rate, %Occupancy rate (gross), #Check-ins, #Check-outs, #Avg. length of stay (check-in)
- Създаване: няма бутон

### inboxReports — `inboxReports`

- Адрес: `/app/reporting/inboxReports`
- Табло: 9 уиджета
- Бутони: Save as new view, This month, Last month, Last 7 days, Last 14 days, Last 30 days, Export, Edit
- Създаване: няма бутон

### reportingHousekeeping — `reportingHousekeeping`

- Адрес: `/app/reporting/reportingHousekeeping`
- Колони (12): Date, Listing, Property status, Type, Time, Guests, Beds, Nights, Cleaning notes, Tags, Cleaning task, Cost; редове: 0
- Бутони: + Add view, Export CSV, Share
- Карти / плочки (1): Overdue tasks0
- Създаване: няма бутон

### channelHealth — `channelHealth`

- Адрес: `/app/reporting/channelHealth`
- Колони (8): Name, Channel, Connection, Last sync at, Errors (24 h), Listings, Sync, Last error message; редове: 0
- Карти / плочки (1): Channel Health26.11.2026 13:18NameChannelConnectionLast sync
- Създаване: няма бутон

### reportingReviews — `reportingReviews`

- Адрес: `/app/reporting/reportingReviews`
- Колони (15): Listing, Reviews, Overall, Top review rate, Accuracy, Check-in, Cleanliness, Communication, Location, Value, Facilities, Comfort, Staff, Negative tags, Last review; редове: 0
- Бутони: Export
- Карти / плочки (12): Review score—WoW—MoM—YoY— · Top rating KPI—WoW—MoM—YoY— · Reviews0in the selected range · Listings0with reviews in the range · Rating analyticsOverall —WoW—MoM—YoY—Accuracy —WoW—MoM—YoY—C · Ratings over timeNo dataNo data · Weekly average score against last yearNo dataNo data · Weekly top review rate against last yearNo dataNo data · Rating distribution · Top negative tagsNo dataNo negative tags · Review tag breakdownNo dataNo tags · Listings reviews overviewExportListingReviewsOverallTop revi
- Създаване: няма бутон

### listingBenchmarks — `listingBenchmarks`

- Адрес: `/app/reporting/listingBenchmarks`
- Изгледи (табове на грида): Default, All, All, All, All, All, All, All, All, Last 90 days, Next 90 days, All
- Колони (12): Name, Listing, Period, Occupancy %, Market occupancy %, ADR, Market ADR, RevPAR, Market RevPAR, Currency, Area, Compared with; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, Market comparison, Export, Customize view
- Създаване: „Market comparison“ → форма „Market comparison“
  - Полета (16): Name _text_; Listing _select_; Period _select_; Currency _select_; From _date_; Till _date_; Computed _date_; Occupancy % _number_; ADR _number_; RevPAR _number_; Compared with _select_; Area _text_; Bedrooms compared _number_; Market occupancy % _number_; Market ADR _number_; Market RevPAR _number_
  - Save на празна форма: **без отказ във формата — заявката тръгна (спряна от огледа)**
  - Cancel: не стигна (страницата се смени)
- Бележка на огледа: TimeoutError: locator.click: Timeout 20000ms exceeded. Call log: [2m - waiting for locator('.ant-drawer-open .ant-drawe

### guestCheckins — `guestCheckins`

- Адрес: `/app/reporting/guestCheckins`
- Изгледи (табове на грида): Default, Awaiting guest, Closed, To verify, Verified, This month
- Колони (12): Code, Name, Reservation, Listing, Main guest, Status, Check in date, Check out date, Registered guests, Arrival time (ETA), Submitted at, Verified at; редове: 0 (Total: 0)
- Бутони: Create a new guest checkin, Export, Customize view, Views
- Създаване: „Create a new guest checkin“ → форма „Create guest checkin“
  - Полета (23): Name _text_; Reservation **\*** _select_; Listing **\*** _select_; Main guest _select_; Template **\*** _select_; Status _select_; Language _select_; Form version _number_; Check in date _date_; Check out date _date_; Arrival time (ETA) _text_; Declared guests _number_; Check-in link _text_; Link valid until _date_; Changes requested _textarea_; Sent at _date_; Opened at _date_; Submitted at _date_; Signed at _date_; Verified at _date_; Verified by _select_; Locked _date_; Declaration pdf _upload_
  - Save на празна форма: отказ — Required field; Required field; Required field
  - Cancel: затваря

### checkinGuests — `checkinGuests`

- Адрес: `/app/reporting/checkinGuests`
- Колони (11): First name, Last Name, Gender, Date of birth, Nationality, Document type, Document number, Check-in, Check-out, Code, Listing; редове: 0 (Total: 0)
- Бутони: Create a new checkin guest, Export, Customize view
- Създаване: „Create a new checkin guest“ → форма „Create checkin guest“
  - Полета (39): Name _text_; Guest checkin **\*** _select_; Guest type **\*** _select_; Minor _switch_; First name **\*** _text_; Middle name _text_; Last Name **\*** _text_; Surname (second) _text_; Gender _select_; Date of birth _date_; Nationality _select_; Place of birth _text_; City of birth _text_; Country of birth _select_; Relationship to main guest _text_; Listing _select_; Document type _select_; Document number _text_; Support number (DNI/NIE) _text_; Issuing country _select_; Date of issue _date_; Date of expiry _date_; Personal ID (EGN / LNCh) _text_; Data source _select_; Visa type _text_; Visa number _text_; Visa expiry date _date_; Images purged on _date_; Images purged _date_; Email address _text_; Phone number _text_; Street address _text_; City _text_; Zip code _text_; State province _text_; Country _select_; Purpose of visit _text_; Arriving from _text_; Next destination _text_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field
  - Cancel: затваря

### internalReviewsDashboard — `internalReviewsDashboard`

- Адрес: `/app/reviewsMenu/internalReviewsMenu/internalReviewsDashboard`
- Колони (15): Listing, Reviews, Overall, Top review rate, Accuracy, Check-in, Cleanliness, Communication, Location, Value, Facilities, Comfort, Staff, Negative tags, Last review; редове: 0
- Бутони: Export
- Карти / плочки (12): Review score—WoW—MoM—YoY— · Top rating KPI—WoW—MoM—YoY— · Reviews0in the selected range · Listings0with reviews in the range · Rating analyticsOverall —WoW—MoM—YoY—Accuracy —WoW—MoM—YoY—C · Ratings over timeNo dataNo data · Weekly average score against last yearNo dataNo data · Weekly top review rate against last yearNo dataNo data · Rating distribution · Top negative tagsNo dataNo negative tags · Review tag breakdownNo dataNo tags · Listings reviews overviewExportListingReviewsOverallTop revi
- Създаване: няма бутон

### internalReviews — `internalReviews`

- Адрес: `/app/reviewsMenu/internalReviewsMenu/internalReviews`
- Изгледи (табове на грида): Default, Accuracy issues, Average (3★), Bad (2★), Check-in issues, Cleanliness issues, Communication issues, Excellent (5★), Location issues, Not answered, Okay (4★), Terrible (1★), Trip issues, Value issues
- Колони (16): Review, Overall, Accuracy, Check-in rating, Cleanliness, Communication, Location, Value, Channel, Created at, Listing, Reservation, Public review, Private review, Negative tags, Reply; редове: 0 (Total: 0)
- Бутони: Create a new review, Export, Customize view, Views
- Създаване: „Create a new review“ → форма „New internal review“
  - Полета (31): Channel **\*** _select_; Direction _select_; Created at _date_; Reservation _select_; Listing _select_; Guest _select_; Guest name _text_; Listing name _text_; Reservation code _text_; Check-in _date_; Check-out _date_; Language _text_; Overall _number_; Accuracy _number_; Check-in rating _number_; Cleanliness _number_; Communication _number_; Location _number_; Value _number_; Facilities _number_; Comfort _number_; Staff _number_; Title _text_; Public review _textarea_; Private review _textarea_; Would improve _textarea_; Loved _textarea_; Host reply _textarea_; Reply _select_; Replied at _date_; Replied by _select_
  - Save на празна форма: отказ — Required field
  - Cancel: затваря

### reviews — `reviews`

- Адрес: `/app/reviewsMenu/reviews`
- Изгледи (табове на грида): Default, Accuracy issues, Average (3★), Bad (2★), Check-in issues, Cleanliness issues, Communication issues, Excellent (5★), Location issues, Not answered, Okay (4★), Terrible (1★), Trip issues, Value issues
- Колони (16): Review, Overall, Accuracy, Check-in rating, Cleanliness, Communication, Location, Value, Channel, Created at, Listing, Reservation, Public review, Private review, Negative tags, Reply; редове: 0 (Total: 0)
- Бутони: Create a new review, Export, Customize view, Views
- Създаване: „Create a new review“ → форма „New internal review“
  - Полета (31): Channel **\*** _select_; Direction _select_; Created at _date_; Reservation _select_; Listing _select_; Guest _select_; Guest name _text_; Listing name _text_; Reservation code _text_; Check-in _date_; Check-out _date_; Language _text_; Overall _number_; Accuracy _number_; Check-in rating _number_; Cleanliness _number_; Communication _number_; Location _number_; Value _number_; Facilities _number_; Comfort _number_; Staff _number_; Title _text_; Public review _textarea_; Private review _textarea_; Would improve _textarea_; Loved _textarea_; Host reply _textarea_; Reply _select_; Replied at _date_; Replied by _select_
  - Save на празна форма: отказ — Required field
  - Cancel: затваря


## Pricing

Версия при огледа: 1.0.29. Страници: 6.

### pricingBasePrice — `pricingBasePrice`

- Адрес: `/app/pricing/pricingBasePrice`
- Изгледи (табове на грида): Default, Accommodation, Costs, Costs, Costs, Extras, Extras, Fees, Fees, Taxes, Taxes, URL filter
- Колони (8): Name, Type, Currency, Country, Properties, Description, Status, Date created; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, Saved filters, Clear all, Save as, Create a new fee template, Export, Customize view
- Създаване: „Create a new fee template“ → форма „Create fee template“
  - Полета (9): Name **\*** _text_; Type **\*** _select_; Currency **\*** _select_; Country **\*** _select_; Status **\*** _select_; State / region _text_; Default VAT rate _select_; Description _textarea_; Properties _multi-select_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field; Required field
  - Cancel: затваря

### pricingFees — `pricingFees`

- Адрес: `/app/pricing/pricingFees`
- Изгледи (табове на грида): Default, Accommodation, Costs, Costs, Costs, Extras, Extras, Fees, Fees, Taxes, Taxes, URL filter
- Колони (8): Name, Type, Currency, Country, Properties, Description, Status, Date created; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, Saved filters, Clear all, Save as, Create a new fee template, Export, Customize view
- Създаване: „Create a new fee template“ → форма „Create fee template“
  - Полета (9): Name **\*** _text_; Type **\*** _select_; Currency **\*** _select_; Country **\*** _select_; Status **\*** _select_; State / region _text_; Default VAT rate _select_; Description _textarea_; Properties _multi-select_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field; Required field
  - Cancel: затваря

### pricingTaxes — `pricingTaxes`

- Адрес: `/app/pricing/pricingTaxes`
- Изгледи (табове на грида): Default, Accommodation, Costs, Costs, Costs, Extras, Extras, Fees, Fees, Taxes, Taxes, URL filter
- Колони (8): Name, Type, Currency, Country, Properties, Description, Status, Date created; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, Saved filters, Clear all, Save as, Create a new fee template, Export, Customize view
- Създаване: „Create a new fee template“ → форма „Create fee template“
  - Полета (9): Name **\*** _text_; Type **\*** _select_; Currency **\*** _select_; Country **\*** _select_; Status **\*** _select_; State / region _text_; Default VAT rate _select_; Description _textarea_; Properties _multi-select_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field; Required field
  - Cancel: затваря

### pricingExtras — `pricingExtras`

- Адрес: `/app/pricing/pricingExtras`
- Изгледи (табове на грида): Default, Accommodation, Costs, Costs, Costs, Extras, Extras, Fees, Fees, Taxes, Taxes, URL filter
- Колони (8): Name, Type, Currency, Country, Properties, Description, Status, Date created; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, Saved filters, Clear all, Save as, Create a new fee template, Export, Customize view
- Създаване: „Create a new fee template“ → форма „Create fee template“
  - Полета (9): Name **\*** _text_; Type **\*** _select_; Currency **\*** _select_; Country **\*** _select_; Status **\*** _select_; State / region _text_; Default VAT rate _select_; Description _textarea_; Properties _multi-select_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field; Required field
  - Cancel: затваря

### pricingCosts — `pricingCosts`

- Адрес: `/app/pricing/pricingCosts`
- Изгледи (табове на грида): Default, Accommodation, Costs, Costs, Costs, Extras, Extras, Fees, Fees, Taxes, Taxes, URL filter
- Колони (8): Name, Type, Currency, Country, Properties, Description, Status, Date created; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, Saved filters, Clear all, Save as, Create a new fee template, Export, Customize view
- Създаване: „Create a new fee template“ → форма „Create fee template“
  - Полета (9): Name **\*** _text_; Type **\*** _select_; Currency **\*** _select_; Country **\*** _select_; Status **\*** _select_; State / region _text_; Default VAT rate _select_; Description _textarea_; Properties _multi-select_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field; Required field
  - Cancel: затваря

### taxRules — `taxRules`

- Адрес: `/app/pricing/taxRules`
- Изгледи (табове на грида): Default, Active, Inactive
- Колони (14): Name, Jurisdiction, Tax code, Tax kind, Charge type, Rate, Amount, Base, Exempt at nights, Sample, System, Status, Valid from, Valid to; редове: 8 (Total: 8)
- Бутони: Add card0 / 5, Create a new tax rule, Export, Customize view
- Страница на запис (`/pricing/taxRules/tr-us-tx-austin-hot/info`): табове Info, Audit log
- Създаване: „Create a new tax rule“ → форма „Create tax rule“
  - Полета (16): Name **\*** _text_; Tax code **\*** _text_; Jurisdiction **\*** _select_; Tax kind **\*** _select_; Charge type **\*** _select_; Rate _number_; Amount _number_; Base _select_; Exempt at nights _number_; Long stay reason _select_; Exempt party types _multi-select_; Unincorporated only _switch_; Sample _switch_; Valid from _date_; Valid to _date_; Status **\*** _select_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field; Required field; Required field
  - Cancel: затваря


## Owners, Finance

Версия при огледа: 1.0.29. Страници: 12.

### ownerStatements — `ownerStatements`

- Адрес: `/app/ownersMenu/ownerStatements`
- Изгледи (табове на грида): Default, Cancelled, Finalized, Open dues, Pending
- Колони (12): Number, Name, Statement date, Owner, Listing, Contract, Period start, Period end, Amount, Status, Balance status, Amount due; редове: 0 (Total: 0)
- Бутони: Create a new owner statement, Export, Customize view, Views, Generate period report
- Създаване: „Create a new owner statement“ → форма „Create owner statement“
  - Полета (12): Owner **\*** _select_; Listing **\*** _select_; Contract **\*** _select_; Management company **\*** _select_; Period start **\*** _date_; Period end **\*** _date_; Currency **\*** _select_; Status **\*** _select_; Exchange rate _number_; Finalize before the period ends _switch_; Statement PDF _upload_; Notes _textarea_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field; Required field; Required field; Required field; Required field
  - Cancel: затваря

### ownerPayments — `ownerPayments`

- Адрес: `/app/ownersMenu/ownerPayments`
- Изгледи (табове на грида): Default, Active, All transactions, Rejected / deleted, SEPA scheduled
- Колони (15): Payment id, Name, Owner, Initial balance shown, Amount, Amount due after, Payment date, Description, Method, Paid by, Sepa batch, Date created, Deleted on, Status, Listing; редове: 0 (Total: 0)
- Бутони: Create a new owner payment, Export, Customize view, Views
- Създаване: „Create a new owner payment“ → форма „Create owner payment“
  - Полета (9): Owner **\*** _select_; Direction **\*** _select_; Payment mode **\*** _select_; Method **\*** _select_; Amount **\*** _select_; (без етикет) _select_; Payment date **\*** _date_; Description _text_; Bank reference _text_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field; Required field; Required field; Required field; Required field
  - Cancel: затваря

### owners — `owners`

- Адрес: `/app/ownersMenu/owners`
- Изгледи (табове на грида): Default, Active, Inactive, New owners (30 days)
- Колони (9): Name, Owner code, Company name, Phone, Email, Listings, Listings count, Balance, Status; редове: 0 (Total: 0)
- Бутони: Create a new owner, Export, Customize view, Views, Import owners
- Създаване: „Create a new owner“ → форма „Create owner“
  - Полета (43): Name **\*** _text_; Status **\*** _select_; First name _text_; Last name _text_; Email **\*** _text_; Phone _text_; Invoices email _text_; Vat id _text_; Company name _text_; Owner company _select_; Tax number _text_; Date of birth _date_; Preferred contact method _select_; Language _select_; Country _select_; State _select_; City _select_; District _text_; Street _text_; Street number _text_; Block _text_; Postcode _text_; Entrance _text_; Floor _text_; Apartment _text_; Building _text_; Zone _text_; Type _select_; Primary _switch_; Verified _switch_; Address note _text_; Location _other_; Reference _text_; Note _textarea_; Iban _text_; Bic _text_; Bank name _text_; Account holder name _text_; Currency **\*** _select_; Payment start month _date_; Base currency relation _select_; Initial balance _select_; (без етикет) _select_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field
  - Cancel: затваря

### ownerContracts — `ownerContracts`

- Адрес: `/app/ownersMenu/ownerContracts`
- Изгледи (табове на грида): Default, Active, Drafts, Ended, Expiring soon (30 days)
- Колони (11): Contract number, Name, Owner, Management company, Template, Listings, Start date, End date, Auto renewal, Commission percent, Status; редове: 0 (Total: 0)
- Бутони: Create a new owner contract, Export, Customize view, Views, Duplicate, Issue invoice, Refresh contract, Statements by contract
- Създаване: „Create a new owner contract“ → форма „Create owner contract“
  - Полета (59): Name **\*** _text_; Status **\*** _select_; Owner **\*** _select_; Management company **\*** _select_; Template _select_; Follow template _switch_; Start date **\*** _date_; End date _date_; Notice period days _number_; Auto renewal _switch_; Renewal period _number_; Renewal unit _select_; Termination date _date_; Signed document _select_; Termination reason _textarea_; Note _textarea_; Listings _multi-select_; Management commission percent _number_; Commission vat rate _select_; Commission base items _multi-select_; Commission base deductions _multi-select_; Commission base vat mode _select_; Channel commission vat _select_; Channel commission vat percent _number_; Owner revenue items _multi-select_; Owner expense items _multi-select_; Vat pass through _select_; Management commission shown gross _switch_; Minimum management commission _number_; Commission tax _select_; Owner revenue tax _select_; Revenue allocation _select_; Pro rata split one time fees _switch_; Pro rata split one time costs _switch_; Show fee totals _switch_; Hide guest details _switch_; Show vat _switch_; Show confirmation code _switch_; Group net revenue _switch_; Orientation _select_; Use different currency _switch_; Statement currency _select_; Exchange rate source _select_; Include zero accommodation _switch_; Create statement without reservations _switch_; Exclude check out on first _switch_; Show owner balance _switch_; Show average daily rate _switch_; Show owner bank details _switch_; Show net revenue legend _switch_; Group channel collected taxes _switch_; Footer _text_; Net revenue column name _text_; Monthly invoicing _switch_; Invoicing costs _multi-select_; Issuer _select_; Recipient _select_; Document type _select_; Invoicing expenses _switch_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field; Required field
  - Cancel: затваря

### ownerContractTemplates — `ownerContractTemplates`

- Адрес: `/app/ownersMenu/ownerContractTemplates`
- Колони (6): Name, Management company, Auto renewal, Contracts count, Commission percent, Active; редове: 0 (Total: 0)
- Бутони: Create a new owner contract template, Export, Customize view
- Създаване: „Create a new owner contract template“ → форма „Create owner contract template“
  - Полета (49): Name **\*** _text_; Active _switch_; Management company _select_; Auto renewal _switch_; Renewal period _number_; Renewal unit _select_; Description _textarea_; Management commission percent _number_; Commission vat rate _select_; Commission base items _multi-select_; Commission base deductions _multi-select_; Commission base vat mode _select_; Channel commission vat _select_; Channel commission vat percent _number_; Owner revenue items _multi-select_; Owner expense items _multi-select_; Vat pass through _select_; Management commission shown gross _switch_; Minimum management commission _number_; Commission tax _select_; Owner revenue tax _select_; Revenue allocation _select_; Pro rata split one time fees _switch_; Pro rata split one time costs _switch_; Show fee totals _switch_; Hide guest details _switch_; Show vat _switch_; Show confirmation code _switch_; Group net revenue _switch_; Orientation _select_; Use different currency _switch_; Statement currency _select_; Exchange rate source _select_; Include zero accommodation _switch_; Create statement without reservations _switch_; Exclude check out on first _switch_; Show owner balance _switch_; Show average daily rate _switch_; Show owner bank details _switch_; Show net revenue legend _switch_; Group channel collected taxes _switch_; Footer _text_; Net revenue column name _text_; Monthly invoicing _switch_; Invoicing costs _multi-select_; Issuer _select_; Recipient _select_; Document type _select_; Invoicing expenses _switch_
  - Save на празна форма: отказ — Required field
  - Cancel: затваря

### ownerPnl — `ownerPnl`

- Адрес: `/app/ownersMenu/ownerPnl`
- Създаване: няма бутон

### generalLedger — `generalLedger`

- Адрес: `/app/ownersMenu/generalLedger`
- Създаване: няма бутон

### ledgerAccounts — `ledgerAccounts`

- Адрес: `/app/ownersMenu/ledgerAccounts`
- Колони (7): Code, Name, Account type, Subtype, Description, System, Active; редове: 10 (Total: 60)
- Бутони: Add card0 / 5, Create a new ledger account, Export, Customize view
- Страница на запис (`/ownersMenu/ledgerAccounts/la-100/info`): табове Info, Audit log
- Създаване: „Create a new ledger account“ → форма „Create ledger account“
  - Езикови табове: * Name (en), Name (es), Name (fr), Name (pt) (едни и същи полета)
  - Полета (6): Code _text_; (без етикет) _text_; Account type **\*** _select_; Subtype _select_; Description _text_; Active _switch_
  - Save на празна форма: отказ — Required field; Required field
  - Cancel: затваря

### invoices — `invoices`

- Адрес: `/app/finance/invoices`
- Изгледи (табове на грида): Default, Annulled, Costs, Drafts, E-invoicing errors, Issued, Unpaid, Last month, This month
- Колони (18): Type, Number, Note type, Status, Payment status, Period, Overdue date, Discount price no vat, Vat, Final price, Partially payed, Advance payment, Issuer, Client, Cancel reason, Delivery status, Related, Send history; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, Create a new invoice, Export, Customize view, Finalize reservations, Export files, Views
- Създаване: „Create a new invoice“ → форма „Add line“
  - Полета (16): Item **\*** _text_; Quantity _number_; VAT % _number_; Catalogue unit price excl. VAT _select_; (без етикет) _select_; Unit discount before VAT _select_; Unit price due excl. VAT _select_; Unit price due incl. VAT _select_; Unit discount after VAT _select_; Unit price to pay _select_; Catalogue amount excl. VAT _select_; Discount before VAT _select_; Amount due excl. VAT _select_; Amount due incl. VAT _select_; Discount after VAT _select_; Amount to pay _select_
  - Save на празна форма: отказ — Required field
  - Cancel: **не затвори**

### expenses — `expenses`

- Адрес: `/app/finance/expenses`
- Изгледи (табове на грида): Default, Annulled, Costs, Drafts, E-invoicing errors, Issued, Unpaid, Last month, This month
- Колони (8): Number, Issuer, Issue date, Listing, Cost category, Final price, Status, Cost repeat; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, New cost, Export, Customize view, Views, Import CSV
- Създаване: няма бутон

### costCategories — `costCategories`

- Адрес: `/app/finance/costCategories`
- Колони (6): Name, Parent, Default vat rate, Visible to owner, Active, System; редове: 10 (Total: 14)
- Бутони: Add card0 / 5, Create a new expense category, Export, Customize view
- Страница на запис (`/finance/costCategories/other/info`): табове Info, Audit log
- Създаване: „Create a new expense category“ → форма „Create expense category“
  - Езикови табове: * Name (en), Name (es), Name (fr), Name (pt) (едни и същи полета)
  - Полета (6): (без етикет) _text_; Parent _select_; Default vat rate _select_; Visible to owner _switch_; Active _switch_; Ledger account _select_
  - Save на празна форма: отказ — Required field
  - Cancel: затваря

### paymentTransactions — `paymentTransactions`

- Адрес: `/app/finance/paymentTransactions`
- Изгледи (табове на грида): Default, Failed, Holds, Pending, Refunds, Paid this month, Past transactions
- Колони (17): Name, Number, Reservation, Guest, Listing, Charge date, Check-in, Amount, Type, Action, Status, Processor reference, Completed at, Payment link, Processor account, Tags, Date created; редове: 0 (Total: 0)
- Бутони: Create a new payment transaction, Export, Customize view, Views
- Създаване: „Create a new payment transaction“ → форма „Create payment transaction“
  - Полета (36): Reservation **\*** _select_; Processor account _select_; Type **\*** _select_; Action **\*** _select_; Status _select_; Amount **\*** _select_; (без етикет) _select_; Captured amount _select_; Refunded amount _select_; Currency _select_; Payment method _select_; Origin _select_; Credit card _select_; Card last4 _text_; Charge date _date_; Check-in _date_; Parent transaction _select_; Stay change _select_; Description _textarea_; Payment link _text_; Link expires at _date_; Link sent via _select_; Link sent to _text_; Message template _select_; Requires action _switch_; Processor reference _text_; Auto payment rule _select_; Authorized at _date_; Hold expires at _date_; Completed at _date_; Released at _date_; Guest _select_; Listing _select_; Failure reason _textarea_; Tags _multi-select_; Notes _textarea_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field
  - Cancel: затваря


## Automations

Версия при огледа: 1.0.29. Страници: 8.

### automationsHub — `automationsHub`

- Адрес: `/app/automations/automationsHub`
- Бутони: Not installedAutomated Messages, Not installedAsana, Not installedAirbnb AutoReviews, Not installedEmail Grabber, Not installedAnswering Machine, Not installedAutomated Payments, Not installedAuto Pricing, Not installedAutomated Tasks, Not installedAutomated Invoicing, InstalledMass Messages, Automation log
- Създаване: няма бутон

### autoMessageRules — `autoMessageRules`

- Адрес: `/app/automations/autoMessageRules`
- Табове на страницата: Automated messages, Message templates
- Колони (7): Recipient type, Name, Trigger event, Timing mode, Send via, Listings, Active; редове: 9 (Total: 9)
- Бутони: Add card0 / 5, Create a new auto message rule, Export, Customize view
- Действия на реда: row-actions, Edit, Remove
- Страница на запис (`/automations/autoMessageRules/iLoeq6EBTQeRW773bhgk/info`): табове Info, Audit log
- Създаване: „Create a new auto message rule“ → форма „Create auto message rule“
  - Полета (29): Active _switch_; Name **\*** _text_; Trigger event **\*** _select_; Timing mode **\*** _select_; Offset value **\*** _number_; Offset unit **\*** _select_; Set exact time _switch_; Exact time _text_; Also trigger if late _switch_; Include owner stays _switch_; Recipient type **\*** _select_; Send via **\*** _select_; Recipient user **\*** _select_; Recipient email _text_; Recipient custom field **\*** _text_; Reply to _text_; Template _select_; Default language **\*** _select_; Save as template name _text_; Image _upload_; Listing scope **\*** _select_; Apply to new listings _switch_; Listings _multi-select_; Listing cities _multi-select_; Listing tags _multi-select_; Excluded listings _multi-select_; Last run at _date_; Runs count _number_; Errors count _number_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field; Required field; Required field; Required field; Required field; Required field; Required field; Required field
  - Cancel: затваря

### autoPaymentRules — `autoPaymentRules`

- Адрес: `/app/automations/autoPaymentRules`
- Колони (14): Name, Code, Payment type, Trigger event, Timing mode, Offset value, Offset unit, Amount mode, Percentage, Processor account, Action, Notification, Active, Listings; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, Create a new auto payment rule, Export, Customize view
- Създаване: „Create a new auto payment rule“ → форма „Create auto payment rule“
  - Полета (18): Active _switch_; Name **\*** _text_; Payment type **\*** _select_; Action **\*** _select_; Amount mode **\*** _select_; Percentage **\*** _number_; Trigger event **\*** _select_; Timing mode **\*** _select_; Offset value **\*** _number_; Offset unit **\*** _select_; Processor account **\*** _select_; Notification **\*** _select_; Notify email **\*** _text_; Send via _select_; Template _select_; Default language _select_; Listings **\*** _multi-select_; Apply to new listings _switch_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field; Required field; Required field; Required field; Required field; Required field; Required field; Required field; Required field; Required field
  - Cancel: затваря

### autoPricingRules — `autoPricingRules`

- Адрес: `/app/automations/autoPricingRules`
- Изгледи (табове на грида): Default, Active, Inactive
- Колони (14): Active, Name, Type, Window, Window from, Period from / to, Days ahead, Gap = N nights, Gap ≤ N nights, Action, Amount, Amount type, Listings, Date created; редове: 0 (Total: 0)
- Бутони: Create a new auto pricing rule, Export, Customize view
- Създаване: „Create a new auto pricing rule“ → форма „Create auto pricing rule“
  - Полета (13): Name _text_; Active _switch_; Type **\*** _select_; Window **\*** _select_; Window from **\*** _date_; Period from / to **\*** _date_; Days ahead **\*** _number_; Gap = N nights _number_; Gap ≤ N nights _number_; Action **\*** _select_; Amount **\*** _number_; Amount type **\*** _select_; Listings _multi-select_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field; Required field; Required field; Required field; Required field
  - Cancel: затваря

### autoTaskRules — `autoTaskRules`

- Адрес: `/app/automations/autoTaskRules`
- Изгледи (табове на грида): Default, Recurring, Reservation
- Колони (11): Name, Template, Trigger, When, Repeats, Associated properties, Assignee user, Team, Active, Last run, Date created; редове: 2 (Total: 2)
- Бутони: Add card0 / 5, Create a new auto task rule, Export, Customize view
- Действия на реда: row-actions, Edit, Remove
- Страница на запис (`/automations/autoTaskRules/atr-f2b3ad65-0d9a-4992-929c-3abe4823df98-checkInInspection/info`): табове Info, Audit log
- Създаване: „Create a new auto task rule“ → форма „Create auto task rule“
  - Полета (18): Name **\*** _text_; Active _switch_; Template **\*** _select_; Trigger **\*** _select_; When _select_; Repeats _select_; Time _number_; Unit _select_; Interval _number_; Month day _number_; Time of day _text_; Start date _date_; End date _date_; Assignee user _select_; Team _select_; Default assignment _switch_; Apply to existing reservations _switch_; Associated properties **\*** _multi-select_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field
  - Cancel: затваря

### autoInvoiceRules — `autoInvoiceRules`

- Адрес: `/app/automations/autoInvoiceRules`
- Колони (10): Name, Schedule mode, Schedule event, Issuer mode, Recipient mode, Items mode, Document type, Consolidated billing, Active, Listings; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, Create a new auto invoice rule, Export, Customize view
- Създаване: „Create a new auto invoice rule“ → форма „Create auto invoice rule“
  - Полета (16): Name **\*** _text_; Active _switch_; Schedule mode **\*** _select_; Schedule offset _number_; Schedule unit _select_; Schedule event **\*** _select_; Issuer mode **\*** _select_; Issuer company **\*** _select_; Recipient mode **\*** _select_; Recipient client _select_; Items mode **\*** _select_; Document type **\*** _select_; Consolidated billing _switch_; Finalize automatically _switch_; Listings _multi-select_; Apply to new listings _switch_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field; Required field; Required field; Required field; Required field
  - Cancel: затваря

### massMessages — `massMessages`

- Адрес: `/app/automations/massMessages`
- Колони (10): Name, Status, Send via, Send at, Listings, Recipients, Sent, Failed, Created by, Updated by; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, Create a new mass message, Export, Customize view
- Създаване: „Create a new mass message“ → форма „Create mass message“
  - Полета (17): Name **\*** _text_; Send via **\*** _select_; Subject _text_; Text _textarea_; Image _upload_; Relevant for **\*** _select_; In-house guests only _switch_; Listings _multi-select_; Listing tags _multi-select_; Excluded listings _multi-select_; Status _select_; Send at _date_; Sent at _date_; Recipients _number_; Sent _number_; Failed _number_; Completed at _date_
  - Save на празна форма: отказ — Required field; Required field; Required field
  - Cancel: затваря

### automationRuns — `automationRuns`

- Адрес: `/app/automations/automationRuns`
- Изгледи (табове на грида): Default, All runs, Failed, Pending
- Колони (12): Name, Reservation, Rule type, Trigger event, Scheduled for, Status, Enabled, Executed at, Attempts, Error message, Auto message rule, Auto payment rule; редове: 0 (Total: 0)
- Бутони: Create a new automation run, Export, Customize view
- Създаване: „Create a new automation run“ → форма „Create automation run“
  - Полета (18): Name _text_; Rule type **\*** _select_; Status **\*** _select_; Enabled _switch_; Auto message rule _select_; Auto payment rule _select_; External rule ref _text_; Trigger event **\*** _select_; Reservation **\*** _select_; Listing _select_; Scheduled for **\*** _date_; Executed at _date_; Attempts _number_; Trigger occurrence key **\*** _text_; Error message _textarea_; Preview text _textarea_; Result message _select_; Result transaction _select_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field; Required field; Required field
  - Cancel: затваря


## Channels, Apps (само гледане — формите не се отварят)

Версия при огледа: 1.0.29. Страници: 18.

### channelsHub — `channelsHub`

- Адрес: `/app/channelManager/channelsHub`
- Бутони: Airbnb, Booking.com, Expedia, Vrbo, Marriott Homes & Villas, Holidu, Google Vacation Rentals, Agoda, HomeToGo, Plum Guide, Whimstay, GetawayGoGo, Lake, PaidSiteMinder, PaidRentals United, Uniplaces, HousingAnywhere, Blueground, PopConnect, Wunderflats, PaidSimplex, TripAdvisor Rentals, Flataway
- Създаване: няма бутон

### channelAccounts — `channelAccounts`

- Адрес: `/app/channelManager/channelAccounts`
- Изгледи (табове на грида): Default, Connected, Deactivated, Needs attention
- Колони (7): Name, Channel, Account status, Connection, Connected at, Last sync at, Channel listing count; редове: 0 (Total: 0)
- Бутони: Connect a channel, Export, Customize view
- Създаване: няма бутон

### channelConnectWizard — `channelConnectWizard`

- Адрес: `/app/channelManager/channelConnectWizard`
- Бутони: Back, Next
- Карти / плочки (17): AgodaConnected by Hostify · AirbnbSign in with the channelHost fee 15.5% · suggested mar · Booking.comConnected by Hostify · ExpediaConnected by Hostify · Google Vacation RentalsFeed URL · HoliduConnected by HostifyHost fee 16.5% · suggested markup  · HomeToGoConnected by Hostify · HousingAnywhereFeed URL · Marriott Homes & VillasConnected by Hostify · Plum GuideChannel credentialsHost fee 16.5% · suggested mark · Rentals UnitedConnected by Hostify · SimplexConnected by Hostify · SiteMinderConnected by Hostify · TripAdvisor RentalsChannel credentials · UniplacesFeed URL · VrboConnected by Hostify · AccountNicknameAccount ID
- Създаване: няма бутон

### channelListings — `channelListings`

- Адрес: `/app/channelManager/channelListings`
- Изгледи (табове на грида): Default, Deleted on channel, Mapped, Sync errors, Unmapped
- Колони (13): Name, Channel, Channel account, External listing id, External name, Parent listing, Listing unit, Sync type, Listed, Mapping status, Publish status, Last sync status, Last sync at; редове: 0 (Total: 0)
- Бутони: Create a new channel listing, Export, Customize view
- Създаване: „Create a new channel listing“ — **не е отварян по правилата** (канали / плъгини / плащания / AI / Process rules / сигурност / billing)

### channelProperties — `channelProperties`

- Адрес: `/app/channelManager/channelProperties`
- Изгледи (табове на грида): Default, Added, Declined, Pending, Reconnect required
- Колони (10): Name, External property id, Channel account, Legal id, Import status, Connection type, Active, Multi rate, Currency, Open for booking; редове: 0 (Total: 0)
- Бутони: Create a new channel property, Export, Customize view
- Създаване: „Create a new channel property“ — **не е отварян по правилата** (канали / плъгини / плащания / AI / Process rules / сигурност / billing)

### channelRatePlans — `channelRatePlans`

- Адрес: `/app/channelManager/channelRatePlans`
- Колони (12): Name, Channel listing, External rate plan id, Is standard, Active, Xml active, Parent rate plan, Adjustment direction, Adjustment percent, Markup percent, Guests included, Restrictions source; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, Create a new channel rate plan, Export, Customize view
- Създаване: „Create a new channel rate plan“ — **не е отварян по правилата** (канали / плъгини / плащания / AI / Process rules / сигурност / billing)

### channelListingPromotions — `channelListingPromotions`

- Адрес: `/app/channelManager/channelListingPromotions`
- Колони (7): Name, Channel listing, Promotion type, Discount percent, Start date, End date, Active; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, Create a new channel listing promotion, Export, Customize view
- Създаване: „Create a new channel listing promotion“ — **не е отварян по правилата** (канали / плъгини / плащания / AI / Process rules / сигурност / billing)

### airbnbOpportunities — `airbnbOpportunities`

- Адрес: `/app/channelManager/airbnbOpportunities`
- Колони (6): Listing, Opportunity, Discount, Stay, Book by, On; редове: 0
- Бутони: Fetch opportunities, [opportunity-expired], Turn on selected, Turn off selected
- Карти / плочки (5): Opportunities0 · Nights with a discount0 · Listings in the pilot0 · Turned on0 · AllOnOffShow expiredBooking periodStay periodTurn on selecte
- Създаване: няма бутон

### channelCommands — `channelCommands`

- Адрес: `/app/channelManager/channelCommands`
- Изгледи (табове на грида): Default, Cancelled, Completed, Failed, Open
- Колони (9): Name, Command type, Channel account, Channel listing, Listing, Requested by, Requested at, Command status, Result summary; редове: 0 (Total: 0)
- Бутони: Create a new channel command, Export, Customize view
- Създаване: „Create a new channel command“ — **не е отварян по правилата** (канали / плъгини / плащания / AI / Process rules / сигурност / billing)

### appCenter — `appCenter`

- Адрес: `/app/apps/appCenter`
- Създаване: няма бутон

### paymentProcessorAccounts — `paymentProcessorAccounts`

- Адрес: `/app/apps/paymentProcessorAccounts`
- Изгледи (табове на грида): Default, Connected, Disconnected, Error
- Колони (9): Name, Provider, Mode, Account currency, Listings, Is default, Status, Webhook healthy, Date created; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, Create a new payment processor account, Export, Customize view
- Създаване: „Create a new payment processor account“ — **не е отварян по правилата** (канали / плъгини / плащания / AI / Process rules / сигурност / billing)

### bookingApiClients — `bookingApiClients`

- Адрес: `/app/apps/bookingApiClients`
- Изгледи (табове на грида): Default, Active, Draft, Suspended
- Колони (14): Favicon, Logo, Name, Site type, Brand, Status, Listings mode, Listings, Multi-Unit mode, Long Term mode, Reservation mode, Payment, Last call, Date created; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, Create a new booking site, Export, Customize view
- Създаване: „Create a new booking site“ — **не е отварян по правилата** (канали / плъгини / плащания / AI / Process rules / сигурност / billing)

### apiKeys — `apiKeys`

- Адрес: `/app/apps/apiKeys`
- Изгледи (табове на грида): Default, Active, Expired, Revoked
- Колони (9): Name, Key, Scope, Status, Primary, Last used, Expires, Created by, Date created; редове: 1 (Total: 1)
- Бутони: Add card0 / 5, Create a new api key, Export, Customize view
- Действия на реда: row-actions, Edit, Remove
- Страница на запис (``): табове Info, Audit log
- Създаване: „Create a new api key“ — **не е отварян по правилата** (канали / плъгини / плащания / AI / Process rules / сигурност / billing)

### webhookSubscriptions — `webhookSubscriptions`

- Адрес: `/app/apps/webhookSubscriptions`
- Изгледи (табове на грида): Default, Active, Disabled, Failing, Paused, Pending confirmation
- Колони (11): Name, URL, Events, Status, Payload format, Description, Last delivery, Failures, Api key, App, Date created; редове: 0 (Total: 0)
- Бутони: Create a new webhook subscription, Export, Customize view
- Създаване: „Create a new webhook subscription“ — **не е отварян по правилата** (канали / плъгини / плащания / AI / Process rules / сигурност / billing)

### webhookDeliveries — `webhookDeliveries`

- Адрес: `/app/apps/webhookDeliveries`
- Изгледи (табове на грида): Default, Delivered, Failed, Pending, Retrying
- Колони (12): Name, Subscription, Event, Event id, Record, Status, Attempts, HTTP status, Response time (ms), Next attempt, Delivered at, Date created; редове: 0 (Total: 0)
- Бутони: Create a new webhook delivery, Export, Customize view
- Създаване: „Create a new webhook delivery“ — **не е отварян по правилата** (канали / плъгини / плащания / AI / Process rules / сигурност / billing)

### checkinFormTemplates — `checkinFormTemplates`

- Адрес: `/app/apps/checkinFormTemplates`
- Колони (7): Name, Form Preset, Assigned Listings, Guest form languages, Verification mode, Active, Date updated; редове: 4 (Total: 4)
- Бутони: Add card0 / 5, Create a new checkin form template, Export, Customize view
- Действия на реда: row-actions, Edit, Remove
- Страница на запис (``): табове Info, Audit log
- Създаване: „Create a new checkin form template“ — **не е отварян по правилата** (канали / плъгини / плащания / AI / Process rules / сигурност / billing)

### complianceConnections — `complianceConnections`

- Адрес: `/app/apps/complianceConnections`
- Изгледи (табове на грида): Default, AIMA / SIBA (PT), ESTI (BG), SES.Hospedajes (ES), SIRE (CO), TRA (CO)
- Колони (8): Integration name, Authority, Country, Mode, Status, Listings, Active, Last validated; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, Create a new compliance connection, Export, Customize view
- Създаване: „Create a new compliance connection“ — **не е отварян по правилата** (канали / плъгини / плащания / AI / Process rules / сигурност / billing)

### complianceSubmissions — `complianceSubmissions`

- Адрес: `/app/apps/complianceSubmissions`
- Изгледи (табове на грида): Default, Accepted, In progress, Needs attention
- Колони (16): Code, Name, Date, Integration, Authority, Reservation, Listing, Guest name, Guest type, Movement, Status, Response, Sent date, Attempts, External reference, Resend required; редове: 0 (Total: 0)
- Бутони: Create a new compliance submission, Export, Customize view
- Създаване: „Create a new compliance submission“ — **не е отварян по правилата** (канали / плъгини / плащания / AI / Process rules / сигурност / billing)


## Other features

Версия при огледа: 1.0.29. Страници: 42.

### reportsOverview — `reportsOverview`

- Адрес: `/app/ourFeatures/ourReporting/reportsOverview`
- Карти / плочки (6): In progress0being generated · Awaiting approval0need four-eyes review · Approved0ready to distribute · Distributed0sent to recipients · Needs actionNo dataNothing awaiting action — generate a repo · By categoryNo dataNo runs yet
- Създаване: няма бутон

### reportRuns — `reportRuns`

- Адрес: `/app/ourFeatures/ourReporting/reportRuns`
- Колони (9): Code, Date created, Category, Period, Status, Owner, Recipients, Distributed date, Version; редове: 0 (Total: 0)
- Бутони: Filter, Create a new report run, Export, Customize view
- Създаване: „Create a new report run“ → форма „Create report run“
  - Полета (10): Report definition **\*** _select_; Status _select_; Period _text_; Version _number_; Period start _date_; Period end _date_; Preparer _select_; Approver _select_; Approved date _date_; Distributed date _date_
  - Save на празна форма: отказ — Required field
  - Cancel: затваря

### reportDefinitions — `reportDefinitions`

- Адрес: `/app/ourFeatures/ourReporting/reportDefinitions`
- Бутони: Filter, Generate with AI, Export
- Създаване: няма бутон

### reportCategories — `reportCategories`

- Адрес: `/app/ourFeatures/ourReporting/reportCategories`
- Колони (4): Name, Code, Parent item, Active; редове: 10 (Total: 34)
- Бутони: Generate with AI, Export, Customize view
- Създаване: няма бутон

### reservationNights — `reservationNights`

- Адрес: `/app/ourFeatures/ourReporting/reservationNights`
- Изгледи (табове на грида): Default, Blocked & owner stays, Booked nights, Free nights
- Колони (14): Name, Date, Listing, Listing unit, Row kind, Night status, Reservation, Reservation source, Owner, Booked nights, Available nights, Gross revenue, Owner revenue, Base price; редове: 0 (Total: 0)
- Бутони: Create a new reservation night, Export, Customize view
- Създаване: „Create a new reservation night“ → форма „Create reservation night“
  - Полета (53): Name _text_; Listing **\*** _select_; Listing unit _select_; Member listing (Multi Unit) _select_; Date **\*** _date_; Row kind **\*** _select_; Night status _select_; Reservation _select_; Reservation source _select_; Cancelled _switch_; Owner _select_; Owner contract _select_; City _select_; Check in date _date_; Check out date _date_; Booked at _date_; Currency **\*** _select_; Account currency **\*** _select_; Exchange rate _number_; Computed at **\*** _date_; Unit-nights _number_; Booked nights _number_; Available nights _number_; Blocked nights _number_; Owner-stay nights _number_; Cancelled nights _number_; Check-ins _number_; Check-outs _number_; Stay nights (check-in) _number_; Stay nights (check-out) _number_; Booking window days (check-in) _number_; Booking window days (check-out) _number_; Gross revenue _select_; (без етикет) _select_; In account currency _select_; Net revenue _select_; Owner revenue _select_; Payout _select_; Base price _select_; Management commission _select_; Revenue target _select_; Gross revenue (check-in) _select_; Gross revenue (check-out) _select_; Net revenue (check-in) _select_; Net revenue (check-out) _select_; Owner revenue (check-in) _select_; Owner revenue (check-out) _select_; Payout (check-in) _select_; Payout (check-out) _select_; Base price (check-in) _select_; Base price (check-out) _select_; Management commission (check-in) _select_; Management commission (check-out) _select_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field; Required field; Required field
  - Cancel: затваря

### kpiDefinitions — `kpiDefinitions`

- Адрес: `/app/ourFeatures/ourReporting/kpiDefinitions`
- Изгледи (табове на грида): Default, Occupancy & rates, Revenue, Volume & other
- Колони (8): Name, KPI key, Group, Unit, Depends on the revenue allocation, Higher is better, Formula, Order; редове: 10 (Total: 35)
- Бутони: Create a new KPI definition, Export, Customize view
- Страница на запис (`/ourFeatures/ourReporting/kpiDefinitions/grossRevenue/info`): табове Info, Audit log
- Създаване: „Create a new KPI definition“ → форма „Create KPI definition“
  - Езикови табове: * Name (en), Name (es), Name (fr), Name (pt), * Definition (en), Definition (es), Definition (fr), Definition (pt) (едни и същи полета)
  - Полета (13): (без етикет) _text_; KPI key **\*** _text_; Group **\*** _select_; Unit **\*** _select_; Order _number_; Depends on the revenue allocation _switch_; Higher is better _switch_; System KPI _switch_; (без етикет) _textarea_; Source data _text_; Formula _text_; Formula (check-in allocation) _text_; Formula (check-out allocation) _text_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field; Required field
  - Cancel: затваря

### ownerStatementRuns — `ownerStatementRuns`

- Адрес: `/app/ourFeatures/ourOwners/ownerStatementRuns`
- Изгледи (табове на грида): Default, Running, With errors
- Колони (12): Run number, Name, Action, Period start, Period end, Status, Total count, Processed count, Error count, Started by, Started at, Finished at; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, Create a new owner statement run, Export, Customize view
- Създаване: „Create a new owner statement run“ — **не е отварян по правилата** (канали / плъгини / плащания / AI / Process rules / сигурност / billing)

### sepaPayoutBatches — `sepaPayoutBatches`

- Адрес: `/app/ourFeatures/ourOwners/sepaPayoutBatches`
- Изгледи (табове на грида): Default, Confirmed, Open, Rejected / cancelled
- Колони (8): Batch number, Name, Company, Requested execution date, Number of transactions, Control sum, Status, Sent at; редове: 0 (Total: 0)
- Бутони: Create a new sepa payout batch, Export, Customize view, New SEPA batch
- Създаване: „Create a new sepa payout batch“ — **не е отварян по правилата** (канали / плъгини / плащания / AI / Process rules / сигурност / billing)

### eInvoiceSubmissions — `eInvoiceSubmissions`

- Адрес: `/app/ourFeatures/ourOwners/eInvoiceSubmissions`
- Изгледи (табове на грида): Default, Errors, Queued, Registered
- Колони (11): Name, Invoice, Company, Scheme, Action, Status, Requested at, Responded at, Response code, Response message, Attempts; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, Create a new e invoice submission, Export, Customize view
- Създаване: „Create a new e invoice submission“ — **не е отварян по правилата** (канали / плъгини / плащания / AI / Process rules / сигурност / billing)

### vendors — `vendors`

- Адрес: `/app/ourFeatures/ownersSettings/vendors`
- Изгледи (табове на грида): Default, Active, Inactive
- Колони (8): Name, Legal name, Category, Contact person, Email, Phone, Active contracts, Status; редове: 0 (Total: 0)
- Бутони: Create a new vendor, Export, Customize view
- Създаване: „Create a new vendor“ → форма „Create vendor“
  - Полета (33): Name **\*** _text_; Status **\*** _select_; Terminate active contracts on deactivation _switch_; Legal name _text_; Category _select_; Tax number _text_; Country _select_; State _select_; City _select_; District _text_; Street _text_; Street number _text_; Block _text_; Postcode _text_; Entrance _text_; Floor _text_; Apartment _text_; Building _text_; Zone _text_; Type _select_; Primary _switch_; Verified _switch_; Address note _text_; Location _other_; Contact person _text_; Email _text_; Phone _text_; Default currency _select_; Default expense category _select_; Task team _select_; Notes _textarea_; Iban _text_; Bic _text_
  - Save на празна форма: отказ — Required field; Required field
  - Cancel: затваря

### printTemplates — `printTemplates`

- Адрес: `/app/ourFeatures/ownersSettings/printTemplates`
- Бутони: Create a new print template, Filter, Export, Customize view
- Карти / плочки (6): Annulment protocol A4ActiveAnnulment protocolIs default210 × · Invoice A4ActiveInvoiceIs default210 × 297 mm · PortraitInvo · Management contract A4ActiveManagement contractIs default210 · Owner statement A4 (landscape)ActiveOwner statement (landsca · Owner statement A4 (portrait)ActiveOwner statementIs default · Service contract A4ActiveService contractIs default210 × 297
- Създаване: „Create a new print template“ → форма „Create print template“
  - Полета (8): Name **\*** _text_; Type **\*** _select_; Status _select_; Is default _switch_; Page width _number_ = 210; Page height _number_ = 297; Orientation _select_; Description _textarea_
  - Save на празна форма: отказ — Required field
  - Cancel: затваря

### vendorContracts — `vendorContracts`

- Адрес: `/app/ourFeatures/ownersSettings/vendorContracts`
- Изгледи (табове на грида): Default, Active, Drafts, Ended
- Колони (10): Contract number, Name, Vendor, Company, Service categories, Listings, Start date, End date, Auto renewal, Status; редове: 0 (Total: 0)
- Бутони: Create a new vendor contract, Export, Customize view
- Създаване: „Create a new vendor contract“ → форма „Create vendor contract“
  - Полета (25): Name **\*** _text_; Status **\*** _select_; Vendor **\*** _select_; Company **\*** _select_; Start date _date_; End date _date_; Notice period days _number_; Auto renewal _switch_; Renewal period months _number_; Payment terms days _number_; Recharge to owner _switch_; Default expense category _select_; Signed document _select_; Renewed from _select_; Termination date _date_; Termination reason _textarea_; Notes _textarea_; Scope of services _textarea_; Listings _multi-select_; Sla urgent response hours _number_; Sla standard response hours _number_; Sla completion rule _select_; Sla completion hours _number_; Sla quality terms _textarea_; Sla penalty terms _textarea_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field
  - Cancel: затваря

### fiscalSeriesList — `fiscalSeriesList`

- Адрес: `/app/ourFeatures/ownersSettings/fiscalSeriesList`
- Изгледи (табове на грида): Default, Credit notes, Invoices, Receipts
- Колони (12): Name, Company, Document type, Fiscal year, Prefix, Next number, Offset, Suffix, Numbering source, Last issued number, Last issue date, Active; редове: 0 (Total: 0)
- Бутони: Create a new fiscal series, Export, Customize view
- Създаване: „Create a new fiscal series“ → форма „Create fiscal series“
  - Полета (10): Company **\*** _select_; Document type **\*** _select_; Fiscal year **\*** _date_; Prefix _text_; Next number **\*** _number_; Offset **\*** _number_; Suffix _text_; Numbering source **\*** _select_; At series code _text_; Active _switch_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field; Required field; Required field
  - Cancel: затваря

### taxJurisdictions — `taxJurisdictions`

- Адрес: `/app/ourFeatures/ownersSettings/taxJurisdictions`
- Изгледи (табове на грида): Default, Active, Inactive
- Колони (9): Name, Level, Code, State code, Country, Parent, Sample, System, Status; редове: 7 (Total: 7)
- Бутони: Add card0 / 5, Create a new tax jurisdiction, Export, Customize view
- Страница на запис (`/ourFeatures/ownersSettings/taxJurisdictions/tj-us-ca/info`): табове Info, Audit log
- Създаване: „Create a new tax jurisdiction“ → форма „Create tax jurisdiction“
  - Полета (8): Name **\*** _text_; Level **\*** _select_; Country _select_; State code _text_; Code **\*** _text_; Parent _select_; Status **\*** _select_; Sample _switch_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field
  - Cancel: затваря

### costCategorySettings — `costCategorySettings`

- Адрес: `/app/ourFeatures/ownersSettings/costCategorySettings`
- Колони (4): Name, Active, Default vat rate, Visible to owner; редове: 0 (Total: 0)
- Бутони: Create a new expense category setting, Export, Customize view
- Създаване: „Create a new expense category setting“ → форма „Create expense category setting“
  - Полета (4): Category **\*** _select_; Active _switch_; Visible to owner _switch_; Default vat rate _select_
  - Save на празна форма: отказ — Required field
  - Cancel: затваря

### creditCards — `creditCards`

- Адрес: `/app/ourFeatures/ourFinance/creditCards`
- Изгледи (табове на грида): Default, Active, Expired / invalid
- Колони (13): Name, Reservation, Guest, Cardholder name, Brand, Last4, Expiry month, Expiry year, Source, Is virtual card, Chargeable from, Status, Date created; редове: 0 (Total: 0)
- Бутони: Create a new credit card, Export, Customize view
- Създаване: „Create a new credit card“ — **не е отварян по правилата** (канали / плъгини / плащания / AI / Process rules / сигурност / billing)

### brands — `brands`

- Адрес: `/app/ourFeatures/ourSettings/brands`
- Колони (10): Name, Sender name, Sender email, Website url, Listings count, Default company, Default language, Is default, Active, Date created; редове: 1 (Total: 1)
- Бутони: Add card0 / 5, Create a new brand, Export, Customize view
- Действия на реда: row-actions, Edit, Remove
- Страница на запис (`/ourFeatures/ourSettings/brands/R7oeq6EBTQeRW773ZBiD/info`): табове Info, Audit log
- Създаване: „Create a new brand“ → форма „Create brand“
  - Полета (12): Name **\*** _text_; Is default _switch_; Active _switch_; Logo _upload_; Primary color _other_; Default language _select_; Website url _text_; Default company _select_; Sender name _text_; Sender email _text_; Support phone _text_; Support email _text_
  - Save на празна форма: отказ — Required field
  - Cancel: затваря

### offices — `offices`

- Адрес: `/app/ourFeatures/ourSettings/offices`
- Колони (9): Name, Code, Address, Phone, Email, Manager, Is head office, Active, Date created; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, Create a new office, Export, Customize view
- Създаване: „Create a new office“ → форма „Create office“
  - Полета (7): Name **\*** _text_; Code _text_; Is head office _switch_; Phone _text_; Email _text_; Manager _select_; Active _switch_
  - Save на празна форма: отказ — Required field
  - Cancel: затваря

### inboxAiSettings — `inboxAiSettings`

- Адрес: `/app/ourFeatures/ourSettings/inboxAiSettings`
- Колони (5): Feature, Calls, Failed, Tokens, Cost; редове: 2
- Бутони: Save, [inbox-ai-active], [inbox-ai-learn], Add hours, Add a listing, Add a topic, [inbox-ai-damage-check], [inbox-ai-self-help], [inbox-ai-quality-scoring], Test, Judge today's conversations
- Карти / плочки (4): AI assistantSaveThe AI assistant reads every guest message:  · Test the assistantWrite a message as a guest would and see w · Questions the assistant could not answer Conversation scores · AI usageDay by dayThe AI work of this account: the calls to 
- Създаване: няма бутон

### aiUsages — `aiUsages`

- Адрес: `/app/ourFeatures/ourSettings/aiUsages`
- Изгледи (табове на грида): Default, All, All, All, All, All, All, All, All, Assistant chat, Guest messages, All
- Колони (10): Name, Day, Feature, Model, Calls, Failed, Input tokens, Output tokens, Cost usd, Estimated; редове: 3 (Total: 3)
- Бутони: Add card0 / 5, Create a new ai usage, Export, Customize view
- Действия на реда: row-actions, Edit, Remove
- Страница на запис (`/ourFeatures/ourSettings/aiUsages/au-f2b3ad65-0d9a-4992-929c-3abe4823df98-2026-11-23-assistantChat-assistant/info`): табове —
- Създаване: „Create a new ai usage“ → форма „Create ai usage“
  - Полета (11): Name _text_; Day _date_; Feature _select_; Model _text_; Calls _number_; Failed _number_; Input tokens _number_; Output tokens _number_; Cost usd _number_; Estimated _switch_; Cost unknown _switch_
  - Save на празна форма: **без отказ във формата — заявката тръгна (спряна от огледа)**
  - Cancel: не стигна (страницата се смени)
- Бележка на огледа: TimeoutError: locator.click: Timeout 20000ms exceeded. Call log: [2m - waiting for locator('.ant-drawer-open .ant-drawe

### documents — `documents`

- Адрес: `/app/ourFeatures/ourSettings/documents`
- Колони (209): Name, Category, Processing status, Not related to the business, AI confidence, Summary, User, Date created, Account (IBAN), Account holder, Addendum date, Addendum number, Address, Address, Agreement number, Annex date, Annex number, Automatic renewal, Automatic renewal, BIC, Bank, Bank, Bank account (IBAN), Batch reference, Billed party, Billing period, Cadastral reference, Changes, Changes, Closing balance, Commission VAT, Commission base, Condition, Confidentiality clause, Confidentiality clause, Consumption, Contract holder, Contract number, Contract number, Contract value, Control sum, Cost, Cost, Coverage, Coverage period, Currency, Currency, Currency, Damage description, Damaged items, Date, Debtor IBAN, Deductible, Deed / protocol number, Deed date, Description, Direct debit, Discount, Document kind, Due date, Effective date, Effective date, Effective period, Effective period, Estimated total, Execution date, Findings, Governing law, Governing law, Governing law, Guest, Guest, Guests, Handed over by, Handover date, Handover type, House rules, Inspection date, Inspection type, Inspector, Inspector (vendor), Insurance requirements, Insured party, Insured vendor, Insurer, Inventory, Invoice number, Issue date, Issue date, Issue date, Issuer, Issuer tax number, Issuing authority, Items, Jurisdiction, Keys, Land registry entry, Licence holder, Licence number, Licence type, Line items, Management commission %, Management company, Management company, Maximum guests, Merchant, Meter number, Meter readings, Next inspection, Notary, Notes, Notice period (days), Notice period (days), Opening balance, Original or copy, Owner, Owner IBAN, Owner contract, Owner contract, Owner expense items, Owner payout terms, Owner revenue items, Owner tax number, Payment method, Payment method, Payment term (days), Penalties, Period, Photos included, Policy number, Premium, Price, Price changes, Price list, Properties, Properties, Properties added, Properties added, Properties removed, Properties serviced, Property, Property, Property, Property, Property, Property, Property, Property, Property, Protocol number, Quality requirements, Receipt number, Received by, Recommendations, Registered owners, Registry number, Rejected transfers, Renewal period, Rent, Repair vendor, Report date, Report number, Report number, Reported by, Reservation code, Reservation code, Result, SLA completion rule, SLA response times, Scope of services, Security deposit, Service categories, Service category, Service period, Signatories, Signatories, Signatories, Signed by guest, Signing date, Signing date, Signing date, Status, Stay, Sum insured, Supply point ID, Surface (m²), Tax point date, Taxable base, Taxable base, Termination clause, Termination clause, Title, Title, Total, Total, Transactions, Transactions, Unit, Utility, VAT amount, VAT amount, VAT rate, Valid until, Vendor, Vendor, Vendor contract, Vendor contract, Work order / task reference, Validation; редове: 0 (Total: 0)
- Бутони: Add document, Export, Customize view
- Създаване: няма бутон

### documentCustomFields — `documentCustomFields`

- Адрес: `/app/ourFeatures/ourSettings/documentCustomFields`
- Изгледи (табове на грида): Default, Guests, Listings, Reservations
- Колони (9): Name, Hostify type, Index, Placeholder key, Required, AI significant, Show as list column, Inherit to child listings, Date created; редове: 10 (Total: 200)
- Бутони: Create a new custom field, Export, Customize view
- Създаване: „Create a new custom field“ → форма „Create custom field“
  - Езикови табове: * Name (en), Name (es), Name (fr), Name (pt), Description (en), Description (es), Description (fr), Description (pt) (едни и същи полета)
  - Полета (17): (без етикет) _text_; Hostify type _select_; Show as list column _switch_; Inherit to child listings _switch_; Help text _text_; AI significant _switch_; Default value _select_; Default text / digits _text_; Default option _text_; (без етикет) _other_; Type **\*** _select_; Validators _multi-select_; Default _switch_; Required _switch_; Locale _switch_; Can sort _switch_; Can search _switch_
  - Save на празна форма: отказ — Required field
  - Cancel: затваря

### histories — `histories`

- Адрес: `/app/ourFeatures/ourSettings/histories`
- Колони (4): Explanation, Index, User, Date created; редове: 10 (Total: 2813)
- Бутони: Export, Customize view
- Страница на запис (`/settings/users/614d3d67-77d4-4351-abf8-90443678862d/info`): табове Info, Assistant journal, Telemetry, Audit log
- Създаване: няма бутон

### engineHealth — `engineHealth`

- Адрес: `/app/ourFeatures/ourSettings/engineHealth`
- Колони (6): Kind, Subject, Occurrences, First raised, Last raised, Detail; редове: 0
- Бутони: Refresh, Rebuild derived views
- Карти / плочки (7): Pending announcements0Change announcements not yet delivered · Oldest pending—Over an hour raises the “oldest pending over  · Open alerts0Stuck announcements, failed jobs, stale exchange · iCal failing0Subscriptions whose last reads failed (retried  · iCal switched off0Disabled after repeated failures — re-enab · Rebuild backlog0Listings waiting for the daily / monthly vie · Open engine alertsAll alertsKindSubjectOccurrencesFirst rais
- Създаване: няма бутон

### calUpdateLogs — `calUpdateLogs`

- Адрес: `/app/ourFeatures/ourSettings/calUpdateLogs`
- Колони (12): Name, Date, User, Source, Type, Listings, From, Till, Changed, Summary, Items, Correlation id; редове: 0 (Total: 0)
- Бутони: Create a new cal update log, Export, Customize view
- Създаване: „Create a new cal update log“ → форма „Create cal update log“
  - Полета (13): Name _text_; Date **\*** _date_; User _select_; Source **\*** _select_; Type **\*** _select_; Listings **\*** _multi-select_; From _date_; Till _date_; Changed **\*** _multi-select_; Summary **\*** _textarea_; Items **\*** _number_; Duration (ms) _number_; Correlation id **\*** _text_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field; Required field; Required field; Required field; Required field
  - Cancel: затваря

### changeAnnouncements — `changeAnnouncements`

- Адрес: `/app/ourFeatures/ourSettings/changeAnnouncements`
- Изгледи (табове на грида): Default, Delivered, Pending
- Колони (10): Name, Kind, State, Recorded at, Correlation id, Producer, Attempts, Next attempt at, Alert raised, Origin; редове: 0 (Total: 0)
- Бутони: Create a new change announcement, Export, Customize view
- Създаване: „Create a new change announcement“ → форма „Create change announcement“
  - Полета (13): Name _text_; Kind **\*** _select_; Audience **\*** _select_; Producer **\*** _select_; Recorded at **\*** _date_; Correlation id _text_; Origin _text_; State **\*** _select_; Attempts **\*** _number_; Alert raised _switch_; Next attempt at _date_; Delivered at _date_; Last failure _textarea_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field; Required field; Required field
  - Cancel: затваря

### calWarnings — `calWarnings`

- Адрес: `/app/ourFeatures/ourSettings/calendarService/calWarnings`
- Изгледи (табове на грида): Default, Acknowledged, Open, Resolved
- Колони (9): Name, Kind, Status, Listing, Unit, Reservation, Raised at, Detail, Handled by; редове: 0 (Total: 0)
- Бутони: Create a new cal warning, Export, Customize view
- Създаване: „Create a new cal warning“ → форма „Create cal warning“
  - Полета (10): Name _text_; Kind **\*** _select_; Status **\*** _select_; Listing **\*** _select_; Unit _select_; Reservation _select_; Raised at **\*** _date_; Handled by _select_; Handled at _date_; Detail _textarea_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field
  - Cancel: затваря

### icalSubscriptions — `icalSubscriptions`

- Адрес: `/app/ourFeatures/ourSettings/calendarService/icalSubscriptions`
- Изгледи (табове на грида): Default, Failing, Healthy, Off
- Колони (11): Name, Listing, Unit, iCal URL, Sync interval (seconds), Sync status, Message, Last sync, Export, Blocks, Date created; редове: 0 (Total: 0)
- Бутони: Create a new ical subscription, Export, Customize view
- Създаване: „Create a new ical subscription“ — **не е отварян по правилата** (канали / плъгини / плащания / AI / Process rules / сигурност / billing)

### icalExportFeeds — `icalExportFeeds`

- Адрес: `/app/ourFeatures/ourSettings/calendarService/icalExportFeeds`
- Колони (6): Name, Listing, Unit, Feed active, Last fetched, Date created; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, Create a new ical export feed, Export, Customize view
- Създаване: „Create a new ical export feed“ — **не е отварян по правилата** (канали / плъгини / плащания / AI / Process rules / сигурност / billing)

### availabilityDependencies — `availabilityDependencies`

- Адрес: `/app/ourFeatures/ourSettings/calendarService/availabilityDependencies`
- Колони (5): Name, Blocking listing, Affected listings, Created from, Date created; редове: 0 (Total: 0)
- Бутони: Create a new availability dependency, Export, Customize view
- Създаване: „Create a new availability dependency“ → форма „Create availability dependency“
  - Полета (5): Blocking listing **\*** _select_; Affected listings **\*** _multi-select_; Two-way (recommended) _switch_; Created from _select_; Listing link _select_
  - Save на празна форма: отказ — Required field; Required field
  - Cancel: затваря

### pricingDependencies — `pricingDependencies`

- Адрес: `/app/ourFeatures/ourSettings/calendarService/pricingDependencies`
- Колони (6): Name, Follower listing, Source listing, Markup %, Created from, Date created; редове: 0 (Total: 0)
- Бутони: Create a new pricing dependency, Export, Customize view
- Създаване: „Create a new pricing dependency“ → форма „Create pricing dependency“
  - Полета (5): Follower listing **\*** _select_; Source listing **\*** _select_; Markup % **\*** _number_; Created from _select_; Listing link _select_
  - Save на празна форма: отказ — Required field; Required field; Required field
  - Cancel: затваря

### ratePlans — `ratePlans`

- Адрес: `/app/ourFeatures/ourSettings/calendarService/ratePlans`
- Колони (12): Name, Listing, Default daily price, Currency, Pricing model, Guests included, Max guests, Default min stay, Default max stay, Max advance period, Timezone, Date updated; редове: 0 (Total: 0)
- Бутони: Create a new rate plan, Export, Customize view
- Създаване: „Create a new rate plan“ → форма „Create rate plan“
  - Полета (32): Listing **\*** _select_; Default daily price **\*** _number_; Currency **\*** _select_; Pricing model _select_; Guests included _number_; Max guests _number_; Extra guest fee _number_; Extra guest fee type _select_; Default min stay _number_; Default max stay _number_; Min nights per stay _number_; Max nights per stay _number_; Mon _number_; Tue _number_; Wed _number_; Thu _number_; Fri _number_; Sat _number_; Monday _number_; Cta weekdays _multi-select_; Ctd weekdays _multi-select_; CTA window (days) _number_; CTA window: include blocked periods _switch_; Min advance period _text_; Max advance period **\*** _text_; Pre preparation days _number_; Post preparation days _number_; Allow RTB below min notice _switch_; Allow RTB above max nights _switch_; Allow RTB beyond availability window _switch_; Timezone _text_; Check-in time _text_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field
  - Cancel: затваря

### calStretches — `calStretches`

- Адрес: `/app/ourFeatures/ourSettings/calendarService/calStretches`
- Изгледи (табове на грида): Default, Availability, Notes, Prices, Stay rules
- Колони (14): Name, Kind, Listing, Unit, From, Till, Price, Amount, Min nights, Max nights, Closed, Available, Note, Date updated; редове: 0 (Total: 0)
- Бутони: Create a new cal stretch, Export, Customize view
- Създаване: „Create a new cal stretch“ → форма „Create cal stretch“
  - Полета (15): Name _text_; Kind **\*** _select_; Listing **\*** _select_; Unit **\*** _select_; From **\*** _date_; Till **\*** _date_; Listing wide _switch_; Price **\*** _number_; Amount **\*** _number_; Min nights **\*** _number_; Max nights **\*** _number_; Closed _switch_; Available _switch_; Note **\*** _textarea_; Color _text_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field; Required field; Required field; Required field; Required field; Required field; Required field
  - Cancel: затваря

### calReservations — `calReservations`

- Адрес: `/app/ourFeatures/ourSettings/calendarService/calReservations`
- Изгледи (табове на грида): Default, Not occupying, Occupying
- Колони (12): Name, Booking reference, Confirmation code, Listing, Unit, Arrival, Departure, Nights, Occupancy status code, Occupies nights, Channel name, Date updated; редове: 0 (Total: 0)
- Бутони: Create a new cal reservation, Export, Customize view
- Създаване: „Create a new cal reservation“ → форма „Create cal reservation“
  - Полета (13): Name _text_; Booking reference **\*** _text_; Confirmation code _text_; Listing **\*** _select_; Unit _select_; Arrival _date_; Departure _date_; Nights _number_; Occupancy status code _text_; Occupies nights _switch_; Guests _number_; Channel name _text_; Channel rate plan code _text_
  - Save на празна форма: отказ — Required field; Required field
  - Cancel: затваря

### deferredWrites — `deferredWrites`

- Адрес: `/app/ourFeatures/ourSettings/calendarService/deferredWrites`
- Изгледи (табове на грида): Default, Applied, Failed, Waiting
- Колони (9): Reference, Name, Kind, Status, Attempts, Origin, Correlation id, Accepted at, Applied at; редове: 0 (Total: 0)
- Бутони: Create a new deferred write, Export, Customize view
- Създаване: „Create a new deferred write“ — **не е отварян по правилата** (канали / плъгини / плащания / AI / Process rules / сигурност / billing)

### engineAlerts — `engineAlerts`

- Адрес: `/app/ourFeatures/ourSettings/calendarService/engineAlerts`
- Изгледи (табове на грида): Default, Acknowledged, Closed, Open
- Колони (8): Name, Kind, Status, Subject, Occurrences, First raised, Last raised, Detail; редове: 0 (Total: 0)
- Бутони: Create a new engine alert, Export, Customize view
- Създаване: „Create a new engine alert“ → форма „Create engine alert“
  - Полета (8): Name _text_; Kind **\*** _select_; Status **\*** _select_; Subject **\*** _text_; First raised **\*** _date_; Last raised **\*** _date_; Occurrences **\*** _number_; Detail _textarea_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field; Required field; Required field
  - Cancel: затваря

### dailyViews — `dailyViews`

- Адрес: `/app/ourFeatures/ourSettings/calendarService/dailyViews`
- Колони (13): Name, Listing, Date, State, Blocked reason, Operator mark, Price, Currency, Min stay, Max stay, Cta, Ctd, Computed at; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, Create a new daily view, Export, Customize view
- Създаване: „Create a new daily view“ → форма „Create daily view“
  - Полета (22): Name _text_; Listing **\*** _select_; Date **\*** _date_; Computed at **\*** _date_; State _select_; State without mark _select_; Operator mark _select_; Blocked reason _select_; Price _number_; Standard price _number_; LOS price _number_; Minimum booking value _number_; Currency **\*** _select_; Min stay _number_; Min stay override _number_; Max stay _number_; Max stay override _number_; Cta _switch_; Cta override _switch_; Ctd _switch_; … (painted) _switch_; Note _textarea_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field
  - Cancel: затваря

### monthlyViews — `monthlyViews`

- Адрес: `/app/ourFeatures/ourSettings/calendarService/monthlyViews`
- Колони (8): Name, Listing, Month, Average nightly price, Monthly price, Currency, Qualifying nights, Computed at; редове: 0 (Total: 0)
- Бутони: Create a new monthly view, Export, Customize view
- Създаване: „Create a new monthly view“ → форма „Create monthly view“
  - Полета (8): Name _text_; Listing **\*** _select_; Month **\*** _text_; Average nightly price **\*** _number_; Monthly price **\*** _number_; Currency **\*** _select_; Qualifying nights **\*** _number_; Computed at **\*** _date_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field; Required field; Required field; Required field
  - Cancel: затваря

### websiteStatsList — `websiteStatsList`

- Адрес: `/app/ourFeatures/ourSettings/calendarService/websiteStatsList`
- Колони (10): Name, Listing, Lowest price, Lowest price date, Cheapest 31-night price, Cheapest window from, Cheapest window to, First available date, Currency, Computed at; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, Create a new website stats, Export, Customize view
- Създаване: „Create a new website stats“ → форма „Create website stats“
  - Полета (10): Name _text_; Listing **\*** _select_; Currency _select_; Computed at **\*** _date_; Lowest price _number_; Lowest price date _date_; First available date _date_; Cheapest 31-night price _number_; Cheapest window from _date_; Cheapest window to _date_
  - Save на празна форма: отказ — Required field; Required field
  - Cancel: затваря

### distributionPermissions — `distributionPermissions`

- Адрес: `/app/ourFeatures/ourSettings/calendarService/distributionPermissions`
- Колони (7): Name, Publish rates & availability to channels, Publish content to channels, Stopped by Hostify support, Changed by, Changed at, Created; редове: 1 (Total: 1)
- Бутони: Add card0 / 5, Create a new distribution permission, Export, Customize view
- Действия на реда: row-actions, Edit, Remove
- Страница на запис (`/ourFeatures/ourSettings/calendarService/distributionPermissions/dp-f2b3ad65-0d9a-4992-929c-3abe4823df98/info`): табове Info, Audit log
- Създаване: „Create a new distribution permission“ → форма „Create distribution permission“
  - Полета (7): Name _text_; Publish rates & availability to channels _switch_; Publish content to channels _switch_; Stopped by Hostify support _switch_; Created **\*** _date_; Changed by _select_; Changed at _date_
  - Save на празна форма: отказ — Required field
  - Cancel: затваря

### icalBlocks — `icalBlocks`

- Адрес: `/app/ourFeatures/ourSettings/calendarService/icalBlocks`
- Колони (8): Name, Subscription, Listing, Unit, Event UID, First blocked night, Departure (exclusive), Date updated; редове: 0 (Total: 0)
- Бутони: Create a new ical block, Export, Customize view
- Създаване: „Create a new ical block“ → форма „Create ical block“
  - Полета (8): Name _text_; Subscription **\*** _select_; Listing **\*** _select_; Unit _select_; Event UID **\*** _text_; Occurrence start _date_; First blocked night **\*** _date_; Departure (exclusive) **\*** _date_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field; Required field
  - Cancel: затваря

### codeGeneratorRules — `codeGeneratorRules`

- Адрес: `/app/ourFeatures/ourSettings/codeGeneratorRules`
- Колони (5): Entity, Code field, Template, Counter reset period, Counter next number; редове: 10 (Total: 28)
- Бутони: Export, Customize view
- Действия на реда: edit
- Създаване: няма бутон


## Custom data, Usage

Версия при огледа: 1.0.29. Страници: 4.

### customRecords — `customRecords`

- Адрес: `/app/customData/customRecords`
- Създаване: няма бутон

### userEvents — `userEvents`

- Адрес: `/app/usage/userEvents`
- Колони (7): Name, Kind, Platform, Route, Index, Occurred at, Detail; редове: 10 (Total: 58522)
- Бутони: Export, Customize view
- Страница на запис (`/usage/userEvents/1_C1F6IB05zkctHJJ_g_/info`): табове —
- Създаване: няма бутон

### userEventRollups — `userEventRollups`

- Адрес: `/app/usage/userEventRollups`
- Колони (8): Name, Bucket, Period, Kind, Route, Events, Sessions, Errors; редове: 10 (Total: 8536)
- Бутони: Export, Customize view
- Действия на реда: row-actions, Edit
- Страница на запис (`/usage/userEventRollups/a3bb792d1e7274c0679ffdd2c31aaaabe6087c45/info`): табове —
- Създаване: няма бутон

### userSessions — `userSessions`

- Адрес: `/app/usage/userSessions`
- Колони (6): Name, Platform, App version, Event count, Started at, Last seen at; редове: 10 (Total: 4792)
- Бутони: Export, Customize view
- Действия на реда: row-actions, Edit
- Страница на запис (`/usage/userSessions/d20c1baa1939532444efc545419e37d65cea7de0/info`): табове —
- Създаване: няма бутон


## Settings

Версия при огледа: 1.0.31 (повторен оглед ~15:20). Страници: 32.

### accountProfile — `accountProfile`

- Адрес: `/app/settings/accountProfile`
- Бутони: Save, Change logo, [account-show-seasons], [account-guidebook-active], [account-module-tasks], [account-module-owners], [account-module-finance], [account-module-advancedFees], Manage API keys
- Карти / плочки (4): Account trialSaveAccount IDf2b3ad65-0d9a-4992-929c-3abe4823d · Channels (3)Booking EngineConnectWordPressConnectWordPress B · Automations (10)AsanaMass MessagesAutomated MessagesAirbnb A · Apps (95)StripeConnectPaypalConnectCheck-in FormConnectMr.GG
- Създаване: няма бутон

### reportingSettingsList — `reportingSettingsList`

- Адрес: `/app/settings/reportingSettingsList`
- Табове на страницата: Info, Audit log
- Създаване: няма бутон

### dashboardDefinitions — `dashboardDefinitions`

- Адрес: `/app/settings/dashboardDefinitions`
- Колони (8): Code, Title, Where it appears, Exact place, Who it is for, Active, Origin, Date updated; редове: 10 (Total: 25)
- Бутони: Generate with AI, Export, Customize view
- Страница на запис (`/settings/dashboardDefinitions/dash-listing-operations/preview`): табове Info, Preview, Audit log
- Създаване: няма бутон

### users — `users`

- Адрес: `/app/settings/users`
- Изгледи (табове на грида): Default, Active, Deactivated, Invited
- Колони (7): Name, Email, Role, Listing scope mode, Last login at, User status, Phone; редове: 9 (Total: 9)
- Бутони: Create a new user, Export, Customize view
- Действия на реда: copy, mail, edit, delete
- Страница на запис (`/settings/users/68c990e3-532c-4e16-bca1-5aad02761eef/info`): табове Info, Assistant journal, Telemetry, Audit log
- Създаване: „Create a new user“ → форма „Create user“
  - Полета (12): Name **\*** _text_; Email **\*** _text_; Phone _text_; Ui language _select_; Role **\*** _select_; User status _select_; (без етикет) _upload_; Password _text_; Listing scope mode _select_; Suspended _switch_; Reporting access _switch_; Invitation expires at _date_
  - Save на празна форма: отказ — Required field; Required field; Required field
  - Cancel: затваря

### workflowDefinitions — `workflowDefinitions`

- Адрес: `/app/settings/workflowDefinitions`
- Колони (7): Code, Name, Applies to, Trigger, Status, Version, Date updated; редове: 0 (Total: 0)
- Бутони: Generate with AI, Export, Customize view
- Създаване: няма бутон

### dataShape — `dataShape`

- Адрес: `/app/settings/dataShape`
- Изгледи (табове на грида): Default, Guests, Listings, Reservations
- Колони (12): Name, Hostify type, Index, Placeholder key, Required, AI significant, Show as list column, Inherit to child listings, Date created, Name, Date created, Date updated; редове: 0 (Total: 0)
- Бутони: Add field
- Създаване: няма бутон

### securityGroups — `securityGroups`

- Адрес: `/app/settings/securityGroups`
- Колони (3): Name, Default rights, Exceptions to default; редове: 10 (Total: 10)
- Бутони: Create a new security group
- Действия на реда: copy
- Създаване: „Create a new security group“ → форма „Create security group“
  - Езикови табове: Name (en), Name (es), Name (fr), Name (pt), Description (en), Description (es), Description (fr), Description (pt) (едни и същи полета)
  - Полета (43): (без етикет) _text_; Role type _select_; Portal _select_; Applies listing scope _switch_; Selected listings only _switch_; (без етикет) _textarea_; Cloned from _select_; Named permissions _multi-select_; Account settings _select_; Users roles _select_; Contacts _select_; Settings catalogs _select_; Audit logs _select_; Sub customers _select_; Billing _select_; Listings view _select_; Listings edit _select_; Listings advanced _select_; Channels view _select_; Channels connect _select_; Channels mapping _select_; Channels activity log _select_; Channels pull reservations _select_; App center _select_; Api key _select_; Webhooks _select_; Calendar view _select_; Calendar rates _select_; Reservations view _select_; Reservations edit _select_; Transactions _select_; Reservation import _select_; Inbox _select_; Automations _select_; Tasks _select_; Task setup _select_; Owners finance _select_; Finance catalogs _select_; Checkin _select_; Reporting _select_; Reviews _select_; Default rights _select_; All tenants _select_
  - Save на празна форма: **без отказ във формата — заявката тръгна (спряна от огледа)**
  - Cancel: не стигна (страницата се смени)
- Бележка на огледа: TimeoutError: locator.click: Timeout 20000ms exceeded. Call log: [2m - waiting for locator('.ant-drawer-open .ant-drawe

### securitySettings — `securitySettings`

- Адрес: `/app/settings/securitySettings`
- Бутони: Save, [account-disallow-old-passwords], [account-2fa], Sign out all users
- Карти / плочки (1): SecuritySavePasswordMinimum password lengthUpper / lower cas
- Създаване: няма бутон

### companies — `companies`

- Адрес: `/app/settings/companies`
- Изгледи (табове на грида): Default, Clients
- Колони (8): Name, Company type, Country, Tax number, Email, Default currency, Listings count, Active; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, Create a new company, Export, Customize view
- Създаване: „Create a new company“ → форма „Create company“
  - Полета (64): Name **\*** _text_; Company type **\*** _select_; Owner _select_; Country **\*** _select_; State _select_; City _select_; District _text_; Street _text_; Street number _text_; Block _text_; Postcode _text_; Entrance _text_; Floor _text_; Apartment _text_; Building _text_; Zone _text_; Type _select_; Primary _switch_; Verified _switch_; Address note _text_; Location _other_; Phone _text_; Email _text_; Website _text_; SIRET number _text_; Tax number _text_; Active _switch_; Logo _upload_; Documents language **\*** _select_; Default currency **\*** _select_; Default document type **\*** _select_; Assign new properties _switch_; Hide invoice price _switch_; Allow unfinalize _switch_; Restart numbering yearly _switch_; Combine fees _switch_; Combined fees name _text_; Hide total in words _switch_; Mx fiscal regime _select_; Invoice footer _textarea_; Receipt footer _textarea_; Credit note footer _textarea_; Enabled _switch_; Invoice month _select_; Invoice day _number_; Initial invoice _select_; Initial invoice days _number_; Document type _select_; Subject _text_; Body _text_; Send statement on finalize _switch_; Scheme _select_; Provider _text_; Registration status _select_; Provider supplier id _text_; Registration link _text_; Registered at _date_; At series invoice _text_; At series credit note _text_; At user configured _switch_; Last error _text_; Pt company capital _select_; (без етикет) _select_; Pt commercial registry _text_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field; Required field; Required field
  - Cancel: затваря

### contacts — `contacts`

- Адрес: `/app/settings/contacts`
- Изгледи (табове на грида): Default, Agents
- Колони (11): Name, Title, Contact role, Email, Phone, Preferred contact method, Quiet hours enabled, Organization, Used as main contact, Used as emergency contact, Active; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, Create a new contact, Export, Customize view
- Създаване: „Create a new contact“ → форма „Create contact“
  - Полета (32): Name **\*** _text_; Contact role **\*** _select_; Title _text_; Organization _text_; External ID _text_; Country _select_; State _select_; City _select_; District _text_; Street _text_; Street number _text_; Block _text_; Postcode _text_; Entrance _text_; Floor _text_; Apartment _text_; Building _text_; Zone _text_; Type _select_; Primary _switch_; Verified _switch_; Address note _text_; Location _other_; Email _text_; Phone _text_; Preferred contact method **\*** _select_; Language _select_; Quiet hours enabled _switch_; Quiet hours from _text_; Quiet hours to _text_; Active _switch_; Notes _textarea_
  - Save на празна форма: отказ — Required field; Required field; Required field
  - Cancel: затваря

### reservationSources — `reservationSources`

- Адрес: `/app/settings/reservationSources`
- Колони (10): Image, Name, Code, Source type, Channel code, Color, Is system, Default commission percent, Active, Sort order; редове: 10 (Total: 18)
- Бутони: Add card0 / 5, Create a new reservation source, Export, Customize view
- Действия на реда: row-actions, Edit, Remove
- Страница на запис (`/settings/reservationSources/S7oeq6EBTQeRW773ZBjp/info`): табове Info, Audit log
- Създаване: „Create a new reservation source“ → форма „Create reservation source“
  - Полета (8): Name **\*** _text_; Source type **\*** _select_; Channel code **\*** _select_; Color _other_; Default commission percent _number_; Sort order _number_; Image _upload_; Active _switch_
  - Save на празна форма: отказ — Required field; Required field; Required field
  - Cancel: затваря

### settingsFormulas — `settingsFormulas`

- Адрес: `/app/settings/settingsFormulas`
- Табове на страницата: Direct, Website (Booking API), Owner stay, Airbnb, Booking.com, Expedia, Vrbo, Agoda, Plum Guide, TripAdvisor, Holidu, Google, Marriott Homes & Villas, HousingAnywhere, Uniplaces, Rentals United, SiteMinder, Flataway
- Бутони: Save changes
- Карти / плочки (1): FormulasOwner and net revenue of the stays from each reserva
- Създаване: няма бутон

### savedReplies — `savedReplies`

- Адрес: `/app/settings/savedReplies`
- Колони (7): Name, Listings, Language, Category, Active, Text, Date updated; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, Create a new saved reply, Export, Customize view
- Създаване: „Create a new saved reply“ → форма „Create saved reply“
  - Полета (7): Name **\*** _text_; Category _text_; Language _select_; Active _switch_; Listings _multi-select_; Excluded listings _multi-select_; Text **\*** _textarea_
  - Save на празна форма: отказ — Required field; Required field
  - Cancel: затваря

### messagingSettings — `messagingSettings`

- Адрес: `/app/settings/messagingSettings`
- Бутони: Save, [messaging-auto-translate], Connect a mailbox
- Карти / плочки (2): MessagingSaveHow the account's messages to guests look: the  · MailboxConnect a mailboxThe guests' e-mails go out from this
- Създаване: няма бутон

### transactionTags — `transactionTags`

- Адрес: `/app/settings/transactionTags`
- Колони (7): Name, Color, Applies to, Transactions, Description, Active, Sort order; редове: 5 (Total: 5)
- Бутони: Add card0 / 5, Create a new transaction tag, Export, Customize view
- Действия на реда: row-actions, Edit, Remove
- Страница на запис (`/settings/transactionTags/W7oeq6EBTQeRW773ZRiV/info`): табове Info, Audit log
- Създаване: „Create a new transaction tag“ → форма „Create transaction tag“
  - Полета (6): Name **\*** _text_; Applies to **\*** _select_; Color _other_; Sort order _number_; Active _switch_; Description _textarea_
  - Save на празна форма: отказ — Required field; Required field
  - Cancel: затваря

### listingTags — `listingTags`

- Адрес: `/app/settings/listingTags`
- Колони (5): Tag, Color, Description, Active, Date created; редове: 3 (Total: 3)
- Бутони: Add card0 / 5, Create a new listing tag, Export, Customize view
- Действия на реда: row-actions, Edit, Remove
- Страница на запис (`/settings/listingTags/UfAwF6IB05zkctHJyuuW/info`): табове Info, Audit log
- Създаване: „Create a new listing tag“ → форма „Create listing tag“
  - Полета (4): Tag **\*** _text_; Color _other_; Active _switch_; Description _textarea_
  - Save на празна форма: отказ — Required field
  - Cancel: затваря

### customFields — `customFields`

- Адрес: `/app/settings/customFields`
- Изгледи (табове на грида): Default, Guests, Listings, Reservations
- Колони (9): Name, Hostify type, Index, Placeholder key, Required, AI significant, Show as list column, Inherit to child listings, Date created; редове: 0 (Total: 0)
- Бутони: Create a new custom field, Export, Customize view
- Създаване: „Create a new custom field“ → форма „Create custom field“
  - Езикови табове: * Name (en), Name (es), Name (fr), Name (pt), Description (en), Description (es), Description (fr), Description (pt) (едни и същи полета)
  - Полета (17): (без етикет) _text_; Hostify type _select_; Show as list column _switch_; Inherit to child listings _switch_; Help text _text_; AI significant _switch_; Default value _select_; Default text / digits _text_; Default option _text_; (без етикет) _other_; Type **\*** _select_; Validators _multi-select_; Default _switch_; Required _switch_; Locale _switch_; Can sort _switch_; Can search _switch_
  - Save на празна форма: отказ — Required field
  - Cancel: затваря

### settingsFees — `settingsFees`

- Адрес: `/app/settings/settingsFees`
- Изгледи (табове на грида): Default, Accommodation, Costs, Extras, Fees, Taxes, URL filter
- Колони (13): Fee ID, Name, Type, Charge type, Default amount, Default condition, Taxable, VAT, Allocation, System, Country, State, Status; редове: 10 (Total: 40)
- Бутони: Add card0 / 5, Saved filters, Clear all, Save as, Create a new fee item, Export, Customize view
- Страница на запис (`/settings/feeItems/fee-2/info`): табове Info, Audit log
- Създаване: „Create a new fee item“ → форма „Create fee item“
  - Езикови табове: * Name (en), Name (es), Name (fr), Name (pt), Description (en), Description (es), Description (fr), Description (pt) (едни и същи полета)
  - Полета (25): (без етикет) _text_; Type **\*** _select_; Charge type **\*** _select_; Status **\*** _select_; Allowed charge types _multi-select_; Default amount _number_; Default condition _select_; Taxable _switch_; Allocation _select_; VAT _select_; Account code _text_; Exclude direct stays _switch_; (без етикет) _textarea_; Image _upload_; Fiscal code (Prod Serv) _text_; Ledger account _select_; Country _select_; State _text_; Cap (nights) _number_; Cap (amount) _number_; Exempt under age _number_; Cap unit _select_; Percent on _select_; Base: line types _multi-select_; Base: fee items _multi-select_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field
  - Cancel: затваря

### settingsExtras — `settingsExtras`

- Адрес: `/app/settings/settingsExtras`
- Изгледи (табове на грида): Default, Accommodation, Costs, Extras, Fees, Taxes, URL filter
- Колони (13): Fee ID, Name, Type, Charge type, Default amount, Default condition, Taxable, VAT, Allocation, System, Country, State, Status; редове: 5 (Total: 5)
- Бутони: Add card0 / 5, Saved filters, Clear all, Save as, Create a new fee item, Export, Customize view
- Страница на запис (`/settings/feeItems/fee-52/info`): табове Info, Audit log
- Създаване: „Create a new fee item“ → форма „Create fee item“
  - Езикови табове: * Name (en), Name (es), Name (fr), Name (pt), Description (en), Description (es), Description (fr), Description (pt) (едни и същи полета)
  - Полета (25): (без етикет) _text_; Type **\*** _select_; Charge type **\*** _select_; Status **\*** _select_; Allowed charge types _multi-select_; Default amount _number_; Default condition _select_; Taxable _switch_; Allocation _select_; VAT _select_; Account code _text_; Exclude direct stays _switch_; (без етикет) _textarea_; Image _upload_; Fiscal code (Prod Serv) _text_; Ledger account _select_; Country _select_; State _text_; Cap (nights) _number_; Cap (amount) _number_; Exempt under age _number_; Cap unit _select_; Percent on _select_; Base: line types _multi-select_; Base: fee items _multi-select_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field
  - Cancel: затваря

### settingsTaxes — `settingsTaxes`

- Адрес: `/app/settings/settingsTaxes`
- Изгледи (табове на грида): Default, Accommodation, Costs, Extras, Fees, Taxes, URL filter
- Колони (13): Fee ID, Name, Type, Charge type, Default amount, Default condition, Taxable, VAT, Allocation, System, Country, State, Status; редове: 10 (Total: 25)
- Бутони: Add card0 / 5, Saved filters, Clear all, Save as, Create a new fee item, Export, Customize view
- Страница на запис (`/settings/feeItems/fee-1/info`): табове Info, Audit log
- Създаване: „Create a new fee item“ → форма „Create fee item“
  - Езикови табове: * Name (en), Name (es), Name (fr), Name (pt), Description (en), Description (es), Description (fr), Description (pt) (едни и същи полета)
  - Полета (25): (без етикет) _text_; Type **\*** _select_; Charge type **\*** _select_; Status **\*** _select_; Allowed charge types _multi-select_; Default amount _number_; Default condition _select_; Taxable _switch_; Allocation _select_; VAT _select_; Account code _text_; Exclude direct stays _switch_; (без етикет) _textarea_; Image _upload_; Fiscal code (Prod Serv) _text_; Ledger account _select_; Country _select_; State _text_; Cap (nights) _number_; Cap (amount) _number_; Exempt under age _number_; Cap unit _select_; Percent on _select_; Base: line types _multi-select_; Base: fee items _multi-select_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field
  - Cancel: затваря

### vatRates — `vatRates`

- Адрес: `/app/settings/vatRates`
- Изгледи (табове на грида): Default, Active, Inactive
- Колони (11): Name, Rate (%), Country, Region, Rate type, Typical use, Exemption reason, Valid from, Valid to, System, Status; редове: 10 (Total: 27)
- Бутони: Add card0 / 5, Create a new vat rate, Export, Customize view
- Страница на запис (`/settings/vatRates/vat-es-cn-3/info`): табове Info, Audit log
- Създаване: „Create a new vat rate“ → форма „Create vat rate“
  - Полета (11): Name **\*** _text_; Rate (%) **\*** _number_; Country _select_; Region _text_; Rate type **\*** _select_; Status **\*** _select_; Typical use _text_; Exemption reason _text_; Valid from _date_; Valid to _date_; VAT included in the price _switch_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field
  - Cancel: затваря

### settingsCosts — `settingsCosts`

- Адрес: `/app/settings/settingsCosts`
- Изгледи (табове на грида): Default, Accommodation, Costs, Extras, Fees, Taxes, URL filter
- Колони (13): Fee ID, Name, Type, Charge type, Default amount, Default condition, Taxable, VAT, Allocation, System, Country, State, Status; редове: 7 (Total: 7)
- Бутони: Add card0 / 5, Saved filters, Clear all, Save as, Create a new fee item, Export, Customize view
- Страница на запис (`/settings/feeItems/fee-541/info`): табове Info, Audit log
- Създаване: „Create a new fee item“ → форма „Create fee item“
  - Езикови табове: * Name (en), Name (es), Name (fr), Name (pt), Description (en), Description (es), Description (fr), Description (pt) (едни и същи полета)
  - Полета (25): (без етикет) _text_; Type **\*** _select_; Charge type **\*** _select_; Status **\*** _select_; Allowed charge types _multi-select_; Default amount _number_; Default condition _select_; Taxable _switch_; Allocation _select_; VAT _select_; Account code _text_; Exclude direct stays _switch_; (без етикет) _textarea_; Image _upload_; Fiscal code (Prod Serv) _text_; Ledger account _select_; Country _select_; State _text_; Cap (nights) _number_; Cap (amount) _number_; Exempt under age _number_; Cap unit _select_; Percent on _select_; Base: line types _multi-select_; Base: fee items _multi-select_
  - Save на празна форма: отказ — Required field; Required field; Required field; Required field
  - Cancel: затваря

### feeItemSettings — `feeItemSettings`

- Адрес: `/app/settings/feeItemSettings`
- Колони (5): Name, Fee item, Active, Allocation, Account code; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, Create a new fee item setting, Export, Customize view
- Създаване: „Create a new fee item setting“ → форма „Create fee item setting“
  - Езикови табове: Description (en), Description (es), Description (fr), Description (pt) (едни и същи полета)
  - Полета (8): Fee item **\*** _select_; Name _text_; Active _switch_; Allocation _select_; Account code _text_; Fiscal code (Prod Serv) _text_; (без етикет) _textarea_; Image _upload_
  - Save на празна форма: отказ — Required field
  - Cancel: затваря

### vatRateSettings — `vatRateSettings`

- Адрес: `/app/settings/vatRateSettings`
- Колони (4): Name, VAT rate, Active, VAT included in the price; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, Create a new vat rate setting, Export, Customize view
- Създаване: „Create a new vat rate setting“ → форма „Create vat rate setting“
  - Полета (4): VAT rate **\*** _select_; Name _text_; Active _switch_; VAT included in the price _switch_
  - Save на празна форма: отказ — Required field
  - Cancel: затваря

### paymentSchedules — `paymentSchedules`

- Адрес: `/app/settings/paymentSchedules`
- Колони (4): Name, Is default, Active, Date created; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, Create a new payment schedule, Export, Customize view
- Създаване: „Create a new payment schedule“ → форма „Create payment schedule“
  - Полета (4): Name **\*** _text_; Is default _switch_; Active _switch_; Description _textarea_
  - Save на празна форма: отказ — Required field
  - Cancel: затваря

### bookingSites — `bookingSites`

- Адрес: `/app/settings/bookingSites`
- Изгледи (табове на грида): Default, Active, Draft, Suspended
- Колони (14): Favicon, Logo, Name, Site type, Brand, Status, Listings mode, Listings, Multi-Unit mode, Long Term mode, Reservation mode, Payment, Last call, Date created; редове: 0 (Total: 0)
- Бутони: Add card0 / 5, Create a new booking site, Export, Customize view
- Създаване: „Create a new booking site“ — **не е отварян по правилата** (канали / плъгини / плащания / AI / Process rules / сигурност / billing)

### listingGroups — `listingGroups`

- Адрес: `/app/settings/listingGroups`
- Колони (12): Group name, Leading listing, Building, Units, SBA status, Smart Booking Allocation, Fixed Advance Days, Shuffle, Allocation Pending, Last allocation, Active, Date created; редове: 0 (Total: 0)
- Бутони: Create a new listing group, Add building, Export, Customize view
- Създаване: „Create a new listing group“ → форма „Create listing group“
  - Полета (9): Group name **\*** _text_; Active _switch_; Leading listing **\*** _select_; Building _select_; Smart Booking Allocation _switch_; Fixed Advance Days _number_; Shuffle _switch_; Allocation Pending _switch_; Moves _select_
  - Save на празна форма: отказ — Required field; Required field
  - Cancel: затваря

### notificationSettings — `notificationSettings`

- Адрес: `/app/settings/notificationSettings`
- Колони (3): Event, In-app, E-mail; редове: 48
- Бутони: Save
- Карти / плочки (1): NotificationsSaveNotifications e-mailReceives the account's 
- Действия на реда: notification-doubleBooking-email
- Създаване: няма бутон

### syncActivities — `syncActivities`

- Адрес: `/app/settings/syncActivities`
- Изгледи (табове на грида): Default, Dismissed, Errors, In progress, Synced
- Табове на страницата: System & Sync, Audit
- Колони (12): Name, Occurred at, Activity type, Listings, Channel accounts, Actor, Source, Duration ms, Sync status, Error guide, Summary, Correlation id; редове: 0 (Total: 0)
- Бутони: Export, Customize view
- Създаване: няма бутон

### privacySettings — `privacySettings`

- Адрес: `/app/settings/privacySettings`
- Бутони: Save, [privacy-enabled]
- Карти / плочки (1): Privacy (GDPR)SaveGuests are anonymised automatically a numb
- Създаване: няма бутон

### accountBilling — `accountBilling`

- Адрес: `/app/settings/accountBilling`
- Колони (6): Number, Period, Date, Due, Amount, Status; редове: 0
- Бутони: Refresh
- Карти / плочки (2): PlanThe account has no plan yet. Hostify sets it. · InvoicesNumberPeriodDateDueAmountStatusNumberPeriodDateDueAm
- Създаване: няма бутон

### demoData — `demoData`

- Адрес: `/app/settings/demoData`
- Бутони: Generate demo data, Delete demo data
- Карти / плочки (1): Demo data is loaded (15 records).Generate demo dataDelete de
- Създаване: няма бутон
