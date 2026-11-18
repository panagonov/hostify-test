# Казуси от пуска 2026-11-17 12:08 — версия 1.0.19

- Версия на приложението: **1.0.19** (първи пуск за тази версия)
- Пуск: 2026-11-17_12-08-15 (`reports/runs/2026-11-17_12-08-15/summary.md`)
- Спекове в пуска: 001-super-admin-login, 002-qa-account, 003-admin-login, 005-platform-pages, 006-platform-admin-users, 007-platform-support-pages, 008-platform-pages-dark, 010-account-pages, 011-account-pages-dark, 100-settings-users, 101-navbar-support-assistant, 102-role-access, 103-channels-by-role, 104-apps-by-role, 105-platform-account-users, 110-settings-listing-tags, 111-user-telemetry

| Спек | Описание | Казуси | Нови | Файл |
|---|---|---|---|---|
| 002-qa-account | почистване на предишния пуск; акаунт „QA Automation“ и неговият администратор през формите | 1 | 1 | `002-qa-account.md` |
| 005-platform-pages | проверка на навбар менютата на платформената конзола (всяка страница се отваря и се оглежда) | 9 | 9 | `005-platform-pages.md` |
| 007-platform-support-pages | поддръжката в платформената конзола — Support people, Queue и Proposals се отварят и се оглеждат | 2 | 2 | `007-platform-support-pages.md` |
| 008-platform-pages-dark | тъмната тема на платформената конзола — всяка страница се отваря, оглежда се и нищо не остава светло | 9 | 9 | `008-platform-pages-dark.md` |
| 010-account-pages | проверка на навбар менютата на акаунта (всяка страница се отваря и се оглежда) | 52 | 52 | `010-account-pages.md` |
| 011-account-pages-dark | тъмната тема на акаунта — всяка страница се отваря, оглежда се и нищо не остава светло | 2 | 2 | `011-account-pages-dark.md` |
| 100-settings-users | Settings › Users — по един потребител на роля през формата; всеки влиза с известната парола | 1 | 1 | `100-settings-users.md` |
| 101-navbar-support-assistant | Support в лявото меню отваря асистента (не стария месинджър) — за администратора и за booking agent | 1 | 1 | `101-navbar-support-assistant.md` |
| 102-role-access | права по роли — всяка роля от 100 вижда точно своите страници, отваря ги без 403 и не вижда чуждите | 6 | 6 | `102-role-access.md` |
| 103-channels-by-role | каналите по роли — кой вижда страниците и кой има активни бутони (само гледане); Inbound events вече я няма | 4 | 4 | `103-channels-by-role.md` |
| 104-apps-by-role | Apps и плъгините по роли — App Center и страниците на Apps се отварят без отказ за ролите, които ги имат (само гледане) | 4 | 4 | `104-apps-by-role.md` |
| 105-platform-account-users | Platform Admin › Accounts › QA Automation — табът Users показва точно хората на акаунта | 1 | 1 | `105-platform-account-users.md` |
| 110-settings-listing-tags | Settings › Listing tags: форма, записи през формата, сортиране и филтър по колони, табове, броене | 1 | 1 | `110-settings-listing-tags.md` |
| 111-user-telemetry | Telemetry на човек — какво е направил (таговете на 110), часът на устройството му, тъмната тема | 4 | 4 | `111-user-telemetry.md` |

Всеки файл описва какво се е объркало, как се възпроизвежда и кои скрийншоти да се гледат. Папката се подава на агента в проекта Hostify за анализ и поправка.
