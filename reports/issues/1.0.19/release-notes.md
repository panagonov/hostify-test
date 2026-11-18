# Версия 1.0.19 — какво е ново

- Предишна версия с пуск на тестовете: 1.0.15
- Прочетено от GET /version/changelog на 2026-11-17T10:08:15.831Z

## 1.0.19 — The AI assistant: test and review its answers, daily account checks and a market comparison (2026-11-17)

This release lets you test the AI guest assistant before it answers guests, see why it answered as it did, and hold its automatic answers for a moment so a person can send, change or stop them. The assistant can now reply to guest reviews, propose issues and guest requests for your approval, mark urgent and unhappy guests, offer an early check-in or a late check-out, learn from your team's answers, give a guest the listing's own steps before a technician is called, and compare the cleaning photos after a stay to spot a possible damage. Every day the account's settings and money are checked, every guest conversation can be scored for its quality, and the AI work of the account is counted with its cost. Owners can ask about their statements in words, each listing is compared with similar listings in its area, and an AI agent can read your account through its own key. The servers now adapt the number of their processes to failures and memory. Guest messages in other languages are shown translated next to the original, and channel bookings with owner statements, tasks and check-ins are processed with less work.

New and changed:
- Settings › AI assistant: Test the assistant — write a guest message for a listing and a stay or a stage of the stay, and see the answer, what the assistant would do and every fact it used or was not allowed to share; the settings you have not saved yet are used.
- Settings › AI assistant: a review window for automatic answers; what a guest must have done before the access information is shared; a mode for each listing and each stage of the stay, how each topic is handled, and how sure the assistant must be before it answers.
- Settings › AI assistant: replies to guest reviews — off, a draft in your property's voice, or published by itself from the star rating you set, signed by the AI assistant; a low rating becomes a task for the team, never an AI reply.
- Settings › AI assistant: choose how what a guest reports is filed — at once, or proposed for your approval; a guest's request (towels, a crib) is filed as a "Guest request".
- Settings › AI assistant: early check-in and late check-out — the assistant offers them for their price when the day allows it; the team confirms and adds the fee.
- Inbox: the issues the assistant proposes wait above the message box with Approve and Reject — never for an urgent or dangerous problem.
- Inbox: an urgent guest and an unhappy or angry tone are labelled in the conversation list and can be filtered; an urgent guest nobody answered comes first, and a team member's answer clears it.
- Inbox: "Why?" shows what the assistant was given and what it was not allowed to share — on a draft too.
- Inbox: an automatic answer waits above the message box with a countdown — Send now, Edit or Delete; the assistant waits while a team member is typing.
- Inbox: guest messages in another language are shown translated next to the original.
- Inbox: a guest message the assistant does not answer shows why.
- Invoices and receipts: the net amount and the VAT always add up to the total.
- The assistant panel is not shown to property owners.
- The assistant can explain the availability and the price of a listing's nights.
- Booking website: listings are described for search engines and AI search.
- Channel bookings: a booking with owner statements, tasks and check-ins is read and written with fewer requests — a new guest is saved once, and the booking's details are reused instead of read again.
- Operations › Account checks: every day the account is checked — listings without an owner, fees that differ, taxes that differ within a city, unpaid stays close to arrival, owners who owe the company, deposits not secured before arrival, calendar blocks without a reason, cleaning problems, channel problems, failing automations, knowledge to review, questions guests keep asking, channel listings not kept in step and contracts that differ from the signed agreement. Each finding says what to do and can be dismissed; a new finding raises an alert.
- The assistant: "Explain this" on a sync activity, an automation run, an account check finding, a night of the calendar, a channel operation or an AI answer asks the assistant what happened, why and what to do.
- Inbox › Conversation quality: with quality scoring switched on in Settings › AI assistant, every guest conversation is scored each day against your rubric — resolved, accurate, polite, a slow answer, and who answered; the AI assistant settings show the week and the questions the assistant could not answer.
- Settings › AI usage: the account's AI work day by day — calls, failed calls and the cost of each feature; the AI assistant settings show it for 7, 30 or 90 days.
- Settings › AI assistant: learn from the team's answers — your answer to a question the assistant could not answer becomes a draft answer for the listing, for you to review (FAQ › Learned, to review); an answer can have a validity period, and an out-of-date answer is not given to guests.
- Settings › AI assistant: steps before a technician — for a problem the listing's knowledge has steps for, the assistant first gives the guest those steps; a leak, a safety problem or anything urgent goes to the team at once. Test the assistant shows the steps it would give.
- Settings › AI assistant: compare the cleaning photos after each stay — the photos of the cleaning after a stay are compared with those of the cleaning before it, and a possible damage is proposed as an issue of the stay for a person to approve or reject. The claim pack of a stay gathers the approved damages, their original photos, the estimated total and the deadline to claim.
- Owner portal › Ask: an owner asks about their statements in words — why a month was lower, what an expense was — and gets an answer from their own figures only.
- Apps › Hostify MCP: connect an AI agent to your account with the app's own key — it reads your listings, your stays without the guests' personal data and the calendar, and changes nothing.
- Reporting › Market comparison: each listing's occupancy, ADR and RevPAR over the last and the next 90 days beside the average of similar listings in its area — the same city and bedrooms, or wider when there are too few; recomputed every night.
- Servers: the platform runs fewer server processes when one keeps failing or the memory runs short and more again once it is calm, without interrupting anyone.
- Live updates on screen take less processor time when the platform runs several server processes.

Fixed (found by the QA suite):
- QA-226 — Settings › Users: removing a person was refused because of their own activity trail and saved views → the person is removed with their trail. Check: 002-qa-account „the QA account exists — created through the Accounts form when missing“.
- QA-227 — Apps › App Center: the logos of the channel apps were blocked by the browser → every logo loads. Check: 010-account-pages „appCenter opens“.
- QA-274 — Settings › Billing and Reporting › Channel health: a column had no header → the actions column and the Sync column have their headers. Check: 010-account-pages „every column has a header and the actions column is the last one“.
- QA-393 — the menu: a housekeeper got a refusal behind every page from the Inbox count and the Reviews menu → they are read only by a role that may read them. Check: 103-channels-by-role „housekeeper: Channels is not on the menu and its pages say "Page not found"“.
- QA-396 — Apps: a booking agent was offered pages it may not open (Booking API, Owner portal roles, Compliance connections) → it is offered only the pages it may read. Check: 104-apps-by-role „bookingAgent: App Center shows the apps and every page of Apps opens without a refusal“.
- QA-401 — Channels › Background operations: a booking agent got a refusal → it sees the operations without starting any. Check: 103-channels-by-role „booking agent: the channels are seen, nothing can be started“.
- QA-402 — Channels: leaving a page while it loaded showed an error notice and a grid error → leaving a page is no failure. Check: 103-channels-by-role „manager: every page of Channels opens“.

Fixed:
- Inbox: an urgent hand-over to the team now reads as urgent.
- Inbox: the assistant never promises another guest's details.
- The menu: a role was offered list pages it could not open → each role is offered only the pages it may read.
- Servers: a server process could stop while it was starting → it starts every time.
- Reports: the nightly figures waited up to 10 minutes after a server process stopped → a stopped process hands its work over at once.

- **feat(workers):** the API's workers adapt — fewer when they crash or the memory runs short, more after a quiet time
- **test(channels):** load tools — ES CPU sampler, socket frame counter, heavier load and worker profiles
- **fix(jobs):** a stopped API process gives its jobs' leases back; a wake a lease refused runs when it lapses
- **feat(workers):** the API's workers adapt — fewer when they crash or the memory runs short, more after a quiet time
- **fix(ai):** the Gemini adapter writes nothing when it loads — API workers no longer die at their start
- **perf(socket-frames):** an API process parses a record frame only when it uses it
- **feat(account-checks):** an alert of the daily account checks is filed under its notification category
- **docs(ai-features-market):** stages 4 and 5 committed
- **feat(ai-features):** the client, migrations and MCP server of stages 4 and 5 of the AI features plan
- **feat(ai-features):** stages 4 and 5 of the AI features plan — back-office checks, conversation quality, AI usage, learned knowledge, self-help, owner assistant, damage dossier, MCP key, benchmarks
- **fix(client):** the menu offers a list page only to a role that may read its entity
- **fix(QA-227):** every channel Worker answers its logo without a session
- **fix(QA-274):** Billing's actions column and Channel health's Sync column have their headers
- **fix(QA-396,QA-401):** Apps and Channels offer a role only the pages it may read
- **fix(QA-393):** the Inbox and Reviews menu counts ask only what the role may read
- **fix(QA-226):** removing a person takes their own trail — telemetry and saved views no longer block it
- **fix(QA-402):** a request cut by leaving the page is no failure — no error notice, no grid error
- **fix(client):** the menu offers a list page only to a role that may read its entity
- **fix(QA-227):** every channel Worker answers its logo without a session
- **fix(QA-274):** Billing's actions column and Channel health's Sync column have their headers
- **fix(QA-396,QA-401):** Apps and Channels offer a role only the pages it may read
- **fix(QA-393):** the Inbox and Reviews menu counts ask only what the role may read
- **fix(docker):** the text-extraction image builds again — python:3.8-slim with the engine template's build tools
- **chore(build):** the build manifest of the release's build
- **docs(ai-features-market):** stage 3 committed for release 1.0.19
- **build:** build-config 1.0.121, hostifyInboxAI 1.10.0, hostifyAutomations 1.33.0 — stage 3 of the AI features plan
- **feat(inbox-ai):** review replies, proposed issues, urgency and tone, upsells — the settings and the inbox
- **chore(docker):** the text-extraction image builds on python:3.8-slim
- **test(engine):** the Hydra compatibility audit of the shared engine — four findings with their reproductions
- **feat(inbox-ai):** stage 3 of the AI features plan — review replies, proposals, urgency and tone, upsells
- **test(channels):** the load tools reach the API's own Redis with its password, and the ES trace weighs the answers
- **perf(channels):** a channel booking reads in one request a wave, writes a new guest once and hands its stay on
- **build:** build-config 1.0.120, hostifyInboxAI 1.9.0 — stages 1 and 2 of the AI features plan
- **feat(inbox-ai):** the test bench, the context panel, the held answer and the scope settings; AI search on the hosted site
- **feat(inbox-ai):** stages 1 and 2 of the AI features plan — the guest agent tested, explained, held and scoped

## 1.0.18 — The assistant handles more requests for you; faster channel bookings and lighter servers (2026-11-16)

This release lets the AI assistant carry out many of the requests customers used to send to support, processes channel bookings in listings with owner contracts, automated tasks and online check-in faster, removes a file from storage together with its record, and makes the platform's servers start faster and use much less memory.

New and changed:
- AI assistant (the panel on the right): it now does what customers used to ask support for — cancel a booking, change its dates or number of guests, change its price or add a charge, set the price or the minimum stay for specific dates, unblock dates, pull a missing reservation from Booking.com or Airbnb, push prices to a channel again, change a listing's capacity, deactivate a listing.
- AI assistant: it can delete a contact, a task, a guest profile created by mistake or an unused listing tag. It always asks first, and the deletion can be undone from the chat.
- AI assistant: "How do I shorten my guest's stay?" and "What happened to this reservation?" are now answered and done by the assistant, without waiting for a person.
- Support: when you write that something does not work, the assistant, or the support person who takes your message, sees what you did in the app in the last 15 minutes and which of your changes were refused, so you do not have to explain the steps.
- Channels: bookings, changes and cancellations from the channels in listings with owner contracts, automated tasks and online check-in are processed faster (about 10 % more a second); the owner statements' nightly figures are rebuilt once per booking instead of for the whole month.
- Files and folders: removing a file also deletes the stored file itself; before, it stayed in the storage after its record was removed.
- The platform's servers start in about 15 seconds instead of about two minutes and use much less memory.

Fixed:
- AI assistant: it sometimes gave an empty answer after a change the platform refused, and an unblock of dates it prepared could be rejected → it answers and the unblock goes through.

- **chore(build):** the build manifest of the release's build
- **feat(assistant):** customers' Intercom requests done by the assistant — the eval, the price of dates, a stay's money, the recent activity
- **fix(server):** the deploy's check of the server's types warns and never stops the release
- **test(data):** every test removes what it made — its stored files, records, Redis keys, queued work and sessions
- **perf(channels):** bookings with owner statements, tasks and check-ins — codes in a block, the statement lock once, the nights once
- **perf(server):** the API runs its TypeScript translated only; the deploy checks the server's types
- **fix(documents):** a removed file takes its stored file with it

## 1.0.17 — Security: passwords and keys are kept out of the code (2026-11-16)

This release changes nothing on the screens: it tightens how the platform keeps its passwords and keys.

New and changed:
- Security: the files that hold an installation's passwords and keys (the database, the plugins' service account, the background services) are never stored with the code any more. Only examples without values are kept; every installation makes its own private copies from them.
- Security: the platform's automatic checks no longer carry the platform administrator's password in their code. They read it from the installation's own private file, which is never stored with the code.

- **fix(security):** every env file is git-ignored — the plugins' env file the server writes too
- **fix(security):** the superAdmin's password is read from the server's .env.superadmin — in no file of the repository
- **fix(security):** every env file is git-ignored; docker/services.env becomes its example

## 1.0.16 — Channel bookings and their follow-up work are applied faster; scheduled work runs on time (2026-11-16)

This release makes the channels and everything a booking sets off faster. One server now applies about 280–340 new channel bookings and about 240–260 changes a second (about 100 before), and about 120–130 a second for accounts with owner statements, task rules and check-ins, with almost half the processor time per booking. Work that used to wait for a periodic check — holds, scheduled messages, statement runs, reminders, snoozes, webhooks, guest registrations — now starts at the moment it is due or as soon as its event happens; the remaining safety checks run every 10 minutes.

New and changed:
- Channels: the Inbound events page is gone; the events a channel sends are no longer kept as records.
- Channels › Background operations: a request is kept for 7 days after its last change; older finished requests no longer appear there.
- Channels › iCal imports: subscribed calendars are read every 10 minutes (they were read every 5).
- Apps: the 16 booking channel apps and the Channel Hub no longer ask for access to inbound events; installed apps are updated automatically.
- Listings › Listing dashboard: a new section, Listing operations, shows open tasks, open issues, tasks done, task costs, tasks by month and vendor spend; Listing performance keeps the revenue and occupancy widgets.
- Reservations: a hold on dates is released exactly when it expires.
- Listing groups › Smart Booking Allocation: a group is re-allocated as soon as a booking change needs it (it was every 5 minutes).
- Automations: scheduled messages and actions run at their exact time; the background check of reservations and the collection of SMS costs run every 10 minutes, so an SMS cost can appear up to 10 minutes later.
- Inbox: a snoozed conversation comes back exactly when its snooze ends.
- Inbox AI: the AI answers after exactly the account's response delay; expired stay-extension offers and the hand-back to a person are checked every 10 minutes.
- Owners › Statement runs: a run starts as soon as it is created.
- Invoicing › Auto-invoice rules: an account is checked about 30 seconds after a reservation or a payment changes and at a rule's due time (it was every 5 minutes); an e-invoice with a technical error is sent again 5 minutes later.
- Tasks: the "due soon" reminder goes out the moment a task enters its lead time.
- Notifications: e-mail digests leave at their scheduled time; a newly saved digest subscription is picked up within 10 minutes.
- Process rules: date and schedule triggers and approval deadlines fire at their exact moment, and a saved rule or a changed date takes effect at once.
- Guest registration: a submission is sent as soon as it is queued, a failed one is retried at its retry time, and a connection validated again sends its failed submissions at once; changing the reporting currency starts the recalculation at once.
- Apps › Webhooks: a webhook goes out right after its event, and a retry at its time.
- Website › Own domain: the certificate is checked every 10 minutes; a failed subdomain update is retried at its retry time.
- Support console: its forms (cases, support people, help center pages, saved replies, labels, teams, settings) open in the right drawer in sections, like every other form, with a quick-jump menu and a required-fields alert.
- Support console: the status picker of a topic lists Closed, Open, Snoozed; snooze ends, SLA deadlines and the customer notice happen at their exact time, and the incident scan runs every 15 minutes.
- Platform admin › User events: on a quiet installation a click can take up to 10 minutes to appear.
- Internal: the plan, the measurements and the load tools of this channel work, and the re-check of the channel server audit, are recorded.

Fixed:
- Settings › Users: an account administrator creating a user with a password got "Account not found" → the user is created.
- Apps › API keys: an account API key sent as a bearer token was refused with "Invalid token" → it is accepted.
- Reservations: stays under an owner contract that were pending, awaiting payment, in verification or a request to book on hold showed 0 owner revenue, net revenue and management commission → they show the contract's figures; statements still count only accepted stays.
- Reservations: a Booking.com booking that arrived already cancelled showed the full booking commission → it shows the commission the channel keeps on the cancellation, and the line and the total agree.
- Guests: two bookings of one guest from two channels applied at the same moment gave the guest only the first channel's profile → the guest gets both.
- Inbox: a guest who wrote on Airbnb or Expedia before booking got a second conversation for the booking → the booking continues the first conversation.
- Inbox: a person and an automation starting a reservation's conversation in the same second made two conversations → there is one.
- Automations: "after booking" messages of a channel booking applied late were timed from when it was applied → they are timed from the booking.
- Process rules: a date-based rule stopped firing after 500 records of its window, and later reminders came late → every record fires on time.
- Listings › Listing dashboard: Listing performance could not be copied or edited ("too many widgets") → it can.
- Error messages: many refusals (calendar, iCal subscriptions, owner portal blocks and reservations, listing settings and links, rate plans, Asana and Moloni, owner contract documents and costs, "sign in required") showed an unrelated text or "access denied" → each shows its own message.
- Dashboards, Reservations, Tasks, Inbox, App Center: the page could fail with an error when the notification counters had not loaded and a live update arrived → it keeps working.
- Channels: after a server restart, the bookings being processed reached the calendar only after 10 minutes → they are applied right after the restart.
- Channels: a booking event waiting for a retry could be overtaken by a later event of the same stay, and the retry wrote the older version over the newer one → later events wait behind it.
- Channels: a booking held back until its listing was mapped was marked done even when its calendar update failed → it is tried again.
- Channels: connecting the same channel host account twice at the same moment could create two connections → the second is refused.
- Reservations: a reservation entered by a person or the API with a channel code at the same moment the channel delivered it could be stored twice → the second is refused.
- Reservations: after a failure of the counter store, the same reservation numbers could be given twice → every number is given once.
- Calendar log: in a batch of channel bookings every entry showed the first booking's correlation id → each shows its own.
- Demo accounts: demo listings had "Sync custom stay with children" off → it is on.

- **docs(channels):** plan 11 — the state committed on 2026-11-16
- **build:** build-engine 1.5.208 (af8bf36a), build-config 1.0.116 (e8894142) — the channel batch with its consequences, the watcher only checks
- **feat(channels):** the channel events leave Elasticsearch — the plugins' scopes and the event pages go; the support forms in sections
- **chore(analysis):** the server channel audit's revalidation, the channel profile's evidence, the data lifecycle plans
- **docs(channels):** plan 11 — stages 5–9, the measurements, the requests of a new booking, the load tools
- **perf(channels):** the channel batch with its consequences in one read and one write — the work of an event started by the event

## Поправени бъгове според версията

- **QA-226** — 002-qa-account: the QA account exists — created through the Accounts form when missing — сега в `bugs/for-verification/1.0.14--002-qa-account--the-qa-account-exists-created-through-the-accounts--66a23257.md`
- **QA-227** — 010-account-pages: appCenter opens (/app/apps/appCenter) — сега в `bugs/for-verification/1.0.14--010-account-pages--appcenter-opens-app-apps-appcenter--8f356585.md`
- **QA-274** — 010-account-pages: accountBilling opens (/app/settings/accountBilling) — сега в `bugs/for-verification/1.0.14--010-account-pages--accountbilling-opens-app-settings-accountbilling--cf2e66ae.md`
- **QA-393** — 103-channels-by-role: housekeeper: Channels is not on the menu and its pages say 'Page not found' — сега в `bugs/for-verification/1.0.15--103-channels-by-role--housekeeper-channels-is-not-on-the-menu-and-its-pa--1302bbbd.md`
- **QA-396** — 104-apps-by-role: bookingAgent: App Center shows the apps and every page of Apps opens without a refusal — сега в `bugs/for-verification/1.0.15--104-apps-by-role--bookingagent-app-center-shows-the-apps-and-every-p--489e927a.md`
- **QA-401** — 103-channels-by-role: booking agent: the channels are seen, nothing can be started; Inbound events is not his — сега в `bugs/for-verification/1.0.15--103-channels-by-role--booking-agent-the-channels-are-seen-nothing-can-be--13090282.md`
- **QA-402** — 103-channels-by-role: manager: every page of Channels opens; the sites can be connected; Fetch opportunities is looked at — сега в `bugs/for-verification/1.0.15--103-channels-by-role--manager-every-page-of-channels-opens-the-sites-can--32aa3ffc.md`

Спековете на тези бъгове се пускат първи; бъг в `for-verification` се проверява с приоритет, бъг в друго състояние — казва се на човека.

---

Правило: преди пуск на нова версия агентът чете този файл, казва кои страници и спекове засягат промените (по имена на менюта, същности и поправки) и ги пуска първи; познатите казуси от предишната версия се проверяват дали са отстранени.
