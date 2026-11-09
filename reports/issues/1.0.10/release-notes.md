# Версия 1.0.10 — какво е ново

- Предишна версия с пуск на тестовете: 1.0.6
- Прочетено от GET /version/changelog на 2026-11-09T10:09:16.411Z

## 1.0.10 — Support keeps answering in the assistant when an AI provider fails, and tidier grids (2026-11-09)

This release keeps support working in the assistant when one of its AI providers fails, and shows the failure plainly to the people who must act on it. Record pages look like record pages again, and every grid keeps its actions inside its actions column.

New and changed:
- Assistant: when the AI service that sorts the questions is unavailable (for example, its account has run out of credit), support still answers how-to questions with numbered steps and a picture of your own screen, using the second AI service meanwhile.
- Support › Queue (support team): a red notice at the top says which AI service fails and why in plain words (for example "the account has no credit"), quotes the service's own message, since when, and whether support still answers meanwhile.
- Notifications (platform administrators and support leads): an alert with an e-mail copy when an AI service starts failing, at most once in six hours for the same problem.
- A person's page › Telemetry: the dashboard of what the person did is the platform's own, and its Changes card follows the dark theme.
- Under the hood: the self-hosted apps and the client of this release are built from the release itself; nothing changes in how you use them.

Fixed:
- Assistant: when the sorting AI service failed, every question went to the assistant alone — a general answer without the steps and the pictures → support answers with its steps and pictures.
- Every record page (a listing, a reservation, a person …): the page had lost its look — default tabs, a grey background, grids edge to edge → the white page with its head and tabs is back, and its tabs look like the grid's view tabs.
- Settings › Users and Platform Admin › Users: "Resend invitation" was a column without a header after the actions → it is a button among the row's actions.
- Settings › Roles, Custom fields, iCal imports, Channel listings and the Activity log: actions sat in an extra column outside the grid's layout → they are items of the row's actions menu (Roles: the Clone button).

- **fix(support):** support answers in the assistant when OpenAI fails, and the failure is seen
- **fix(grids):** Resend invitation and other actions are row actions — no column outside the layout
- **test(record pages):** the record page's look reaches every record page
- **fix(grids):** no grid has a column outside its layout — Resend invitation and other actions are row actions
- **fix(record pages):** every record page looks like a record page again, its tabs like the grid's
- **feat(telemetry):** a person's Telemetry tab is the module's — hydra-dashboard 1.4.0, hydra-telemetry 1.5.0/1.5.1 (build-config 1.0.80)
- **feat(telemetry):** a person's Telemetry tab is the module's — the project's copies go (build-config 1.0.80)
- **test(client):** the production image builds the client without the forked type checker
- **fix(client):** FORK_TS_CHECKER=false drops the type checker in the image's build (client 1.5.128)
- **fix(docker):** the plugin images run the build's packages/plugin-host — nothing of the engine
- **feat(plugins):** the plugin host travels with the deploy repository

## 1.0.9 — A person's Telemetry shows times on their own clock (2026-11-06)

This release names every row of a person's telemetry with the time on that person's own device, and changes how Hostify is built and shipped: the application now lives in its own repository and the server builds the web app itself when it is deployed. Nothing changes in how you use Hostify.

New and changed:
- Releases: Hostify is built and shipped from its own repository; the web app is built on the server at every deploy, and each release lists its changes from every part of Hostify, so the change history and the QA suite see every fix.
- Ask support in the assistant: in production the support answers' screenshots open Hostify's own address.

Fixed:
- Settings › Users › a person › Telemetry: a row's name gave the time in UTC, not on the person's clock → the name shows the time of the person's own device, and says "UTC" when the device's time zone is unknown. Rows written before keep their UTC names.

- **test(telemetry):** a row's name says UTC when the zone is unknown (hydra-telemetry 1.4.1)
- **chore(build):** the generated application lives in its own repository — project/ (hostify-com/hostify-next)
- **docs(operations):** SUPPORT_APP_URL in production's api.env
- 1.0.8 - Ask support in the assistant: step-by-step answers with screenshots of your own screen

## 1.0.8 — Ask support in the assistant: step-by-step answers with screenshots of your own screen (2026-11-06)

Support moves into the assistant. Ask anything about Hostify in the assistant panel: how-to questions get numbered steps in your language with a picture of your own screen where the places to click are outlined and numbered, a feature Hostify does not have yet gets a clear answer and reaches the product team as a suggestion, and a problem goes to a person from Hostify support who answers you in the same chat.

New and changed:
- Assistant: ask how to do something in Hostify (for example how to switch the application to Portuguese) and get the steps in your language, followed by a picture of your own screen with each place to click outlined and numbered; click the picture to see it full size. Only you can see your pictures.
- Assistant: ask for something Hostify does not offer yet (for example the interface in Japanese) and you get a clear answer with what is available instead; your request is passed to the product team as a suggestion.
- Assistant: describe a problem and a person from Hostify support takes it; their answer appears in the same chat with their name, and your next messages about it go straight to them.
- Assistant: questions about your own data (bookings, listings, figures) are answered by the assistant as before.
- Navbar › Support: opens the assistant. The separate support messenger panel is gone.
- Notifications: when support answered and you have not read it, the notification and its e-mail tell you to open the assistant.
- Support › Queue (support team): questions asked in the assistant arrive here with the assistant's reading; a reply goes straight into the person's chat. Support › Proposals: a request for a missing feature is added at once, and requests for the same thing are counted together.
- Platform Admin › Accounts › an account: a Users tab with the account's people.
- A person's page (Platform Admin › Users, Settings › Users): an Activity tab with what the person did, for the platform's administrators and the account's administrators.
- Finance › Invoices › an invoice › Payments: a payment closed by a credit note, a journal entry, an opening balance, a down payment or netting is shown as such.

Fixed:
- Background services (document processing and the other background work) could stop at start after the previous update → they start again.
- Support › Queue (support team): a support person without their entry in Support people saw only "The queue could not be loaded" → the console now says that the platform admin adds them in Support people.


## 1.0.7 — Ask support in the assistant: step-by-step answers with screenshots of your own screen (2026-11-06)

Support moves into the assistant. Ask anything about Hostify in the assistant panel: how-to questions get numbered steps in your language with a picture of your own screen where the places to click are outlined and numbered, a feature Hostify does not have yet gets a clear answer and reaches the product team as a suggestion, and a problem goes to a person from Hostify support who answers you in the same chat.

New and changed:
- Assistant: ask how to do something in Hostify (for example how to switch the application to Portuguese) and get the steps in your language, followed by a picture of your own screen with each place to click outlined and numbered; click the picture to see it full size. Only you can see your pictures.
- Assistant: ask for something Hostify does not offer yet (for example the interface in Japanese) and you get a clear answer with what is available instead; your request is passed to the product team as a suggestion.
- Assistant: describe a problem and a person from Hostify support takes it; their answer appears in the same chat with their name, and your next messages about it go straight to them.
- Assistant: questions about your own data (bookings, listings, figures) are answered by the assistant as before.
- Navbar › Support: opens the assistant. The separate support messenger panel is gone.
- Notifications: when support answered and you have not read it, the notification and its e-mail tell you to open the assistant.
- Support › Queue (support team): questions asked in the assistant arrive here with the assistant's reading; a reply goes straight into the person's chat. Support › Proposals: a request for a missing feature is added at once, and requests for the same thing are counted together.
- Platform Admin › Accounts › an account: a Users tab with the account's people.
- A person's page (Platform Admin › Users, Settings › Users): an Activity tab with what the person did, for the platform's administrators and the account's administrators.
- Finance › Invoices › an invoice › Payments: a payment closed by a credit note, a journal entry, an opening balance, a down payment or netting is shown as such.

Fixed:
- Background services (document processing and the other background work) could stop at start after the previous update → they start again.
- Support › Queue (support team): a support person without their entry in Support people saw only "The queue could not be loaded" → the console now says that the platform admin adds them in Support people.

- **feat(support):** ask support in the assistant — step-by-step answers with screenshots of your own screen
- **chore(build):** the engine's module updates — invoicing cash on delivery, an account's Users tab, a person's Activity tab
- **fix(ai):** the background services start again — the decision model's adapter compiles
- 1.0.6 - Support desk: write to Hostify support from inside the app, and the QA suite's fixes

---

Правило: преди пуск на нова версия агентът чете този файл, казва кои страници и спекове засягат промените (по имена на менюта, същности и поправки) и ги пуска първи; познатите казуси от предишната версия се проверяват дали са отстранени.
