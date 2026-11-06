# Версия 1.0.6 — какво е ново

- Предишна версия с пуск на тестовете: 1.0.5
- Прочетено от GET /version/changelog на 2026-11-06T11:43:32.070Z

## 1.0.6 — Support desk: write to Hostify support from inside the app, and the QA suite's fixes (2026-11-06)

This release brings the support desk: the people of an account write to Hostify support from inside the app and read the answers in the same conversation, an assistant answers what the Help Center already covers, and Hostify's support people work in their own console. It also fixes every issue the QA suite found on 1.0.5, and the user form shows only the sections that fit the person's role.

New and changed:
- Navbar › Support: write to Hostify support from inside the app, follow the conversation and see how many answers are unread. The assistant answers a question the Help Center covers; anything else goes to a support person. Someone who has not read an answer gets an alert and an e-mail.
- Support (Hostify's support people): the conversations by team with reply-time targets, cases, the Help Center, Insights, incidents (the same failure seen in several accounts), triage and proposals; beside every conversation the account's listings, its channel connections and the channel work that failed in the last seven days.
- Support › Settings › Support people: the lead limits a support person to some accounts, picked by name.
- Platform Admin › Support people: the super administrator attaches support people to accounts.
- QA suite: every issue it finds has a number (QA-<n>) that the fix names, so a version's change history lists the issues it fixes; an issue that is not a defect is closed as declined, with the reason.

Fixed (found by the QA suite):
- QA-12 — Settings › Listing tags: filtering the Description column by a phrase also left rows that matched only one short word of it → the filter leaves only the rows that hold every word. Check: 110-settings-listing-tags „filtering the Description column by the whole description of one tag leaves only that tag“.
- QA-13 — Platform Admin › Users › Create user: the magnifier buttons of Account, Role, Default account and Owner were shorter than their fields, and Password was taller than the other fields → every field of the form has the same height. Check: 006-platform-admin-users „the Create user form opens, every tab is presentable, an empty Save is refused“.
- QA-6 — Logs › Console actions: the list of accounts stayed empty and every open of the page logged an error → the accounts load. Check: 005-platform-pages „consoleActions opens (/app/platformLogs/consoleActions)“.
- QA-1, QA-2, QA-3, QA-4, QA-5, QA-7, QA-8, QA-9 — Apps › App Center, Booking API, Online check-in, Compliance connections, Requests status, Owner portal roles, Partner apps, Payment processors: for the super administrator each page was refused with "You have no access to this account" → the pages open without the error. Check: 005-platform-pages „<page> opens (…)“.

Fixed:
- The user form (Platform Admin › Users and an account's users): Owner portal was offered on every role, and Scope on the roles without an account, where its listings and tags could not be filled → Owner portal shows only for a Property Owner, Scope only for a person of an account; changing a person to support or super administrator resets the scope to all listings.

- **docs(release):** what a release says and the QA bug numbers — the /deploy skill
- **feat(support):** the support desk — Hostify's own help desk for its customers (hydra-support 1.3.1)
- **fix(users):** the user form shows Owner portal and Scope only for the roles that use them
- **fix(QA-13):** Platform Admin › Users — the Create user form's search fields and Password have the form's height
- **fix(QA-12):** Settings › Listing tags — a column filter of several words leaves only the rows with every word
- qa-fix: a bug that is not a defect goes to qa-test/bugs/declined with the reason
- The QA bugs of 1.0.5 fixed (client 1.5.128): Console actions reads the accounts with GET, the Apps pages ask the automations for an account only; the qa-fix skill and the bug workflow page
- 1.0.5 - Usage telemetry: what each person actually does, on their own page

## Поправени бъгове според версията

- **QA-12** — 110-settings-listing-tags: filtering the Description column by the whole description of one tag leaves only that tag — сега в `bugs/for-verification/1.0.5--110-settings-listing-tags--filtering-the-description-column-by-the-whole-desc--173e90f6.md`
- **QA-13** — 006-platform-admin-users: the Create user form opens, every tab is presentable, an empty Save is refused — сега в `bugs/for-verification/1.0.5--006-platform-admin-users--the-create-user-form-opens-every-tab-is-presentabl--156f5dfd.md`
- **QA-6** — 005-platform-pages: consoleActions opens (/app/platformLogs/consoleActions) — сега в `bugs/verified/1.0.5--005-platform-pages--consoleactions-opens-app-platformlogs-consoleactio--0c2939d3.md`
- **QA-1** — 005-platform-pages: appCenter opens (/app/apps/appCenter) — сега в `bugs/verified/1.0.5--005-platform-pages--appcenter-opens-app-apps-appcenter--e18f84d3.md`
- **QA-2** — 005-platform-pages: bookingApiClients opens (/app/apps/bookingApiClients) — сега в `bugs/verified/1.0.5--005-platform-pages--bookingapiclients-opens-app-apps-bookingapiclients--94804e05.md`
- **QA-3** — 005-platform-pages: checkinFormTemplates opens (/app/apps/checkinFormTemplates) — сега в `bugs/verified/1.0.5--005-platform-pages--checkinformtemplates-opens-app-apps-checkinformtem--0147750f.md`
- **QA-4** — 005-platform-pages: complianceConnections opens (/app/apps/complianceConnections) — сега в `bugs/verified/1.0.5--005-platform-pages--complianceconnections-opens-app-apps-compliancecon--46566c4a.md`
- **QA-5** — 005-platform-pages: complianceSubmissions opens (/app/apps/complianceSubmissions) — сега в `bugs/verified/1.0.5--005-platform-pages--compliancesubmissions-opens-app-apps-compliancesub--e2fe6b91.md`
- **QA-7** — 005-platform-pages: ownerPortalRoles opens (/app/apps/ownerPortalRoles) — сега в `bugs/verified/1.0.5--005-platform-pages--ownerportalroles-opens-app-apps-ownerportalroles--2e87da5e.md`
- **QA-8** — 005-platform-pages: partners opens (/app/apps/partners) — сега в `bugs/verified/1.0.5--005-platform-pages--partners-opens-app-apps-partners--d8ee471e.md`
- **QA-9** — 005-platform-pages: paymentProcessorAccounts opens (/app/apps/paymentProcessorAccounts) — сега в `bugs/verified/1.0.5--005-platform-pages--paymentprocessoraccounts-opens-app-apps-paymentpro--b525490e.md`

Спековете на тези бъгове се пускат първи; бъг в `for-verification` се проверява с приоритет, бъг в друго състояние — казва се на човека.

---

Правило: преди пуск на нова версия агентът чете този файл, казва кои страници и спекове засягат промените (по имена на менюта, същности и поправки) и ги пуска първи; познатите казуси от предишната версия се проверяват дали са отстранени.
