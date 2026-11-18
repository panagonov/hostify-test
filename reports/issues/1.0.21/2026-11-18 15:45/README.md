# Казуси от пуска 2026-11-18 15:45 — версия 1.0.21

- Версия на приложението: **1.0.21** (първи пуск за тази версия)
- Пуск: 2026-11-18_15-45-41 (`reports/runs/2026-11-18_15-45-41/summary.md`)
- Спекове в пуска: 001-super-admin-login, 002-qa-account, 003-admin-login, 006-platform-admin-users, 100-settings-users, 101-navbar-support-assistant, 102-role-access, 103-channels-by-role, 104-apps-by-role, 105-platform-account-users, 110-settings-listing-tags, 111-user-telemetry

| Спек | Описание | Казуси | Нови | Файл |
|---|---|---|---|---|
| 102-role-access | права по роли — всяка роля от 100 вижда точно своите страници, отваря ги без 403 и не вижда чуждите | 6 | 6 | `102-role-access.md` |
| 104-apps-by-role | Apps и плъгините по роли — App Center и страниците на Apps се отварят без отказ за ролите, които ги имат (само гледане) | 1 | 1 | `104-apps-by-role.md` |

## ⚠ Пуск с толериран QA-227

Известните симптоми на тези бъгове се броят, не карат проверката да пада; никой бъг не е потвърден в този пуск.

| Спек | Проверка | Толерирани |
|---|---|---|
| 100-settings-users | the Users page opens through the menu and the Create form behaves | 78 |
| 102-role-access | manager: the menu holds the role's pages, each opens without a refusal, the administrator's pages are refused | 31 |
| 102-role-access | bookingAgent: the menu holds the role's pages, each opens without a refusal, the administrator's pages are refused | 31 |
| 104-apps-by-role | admin: App Center shows the apps and every page of Apps opens without a refusal | 42 |
| 104-apps-by-role | manager: App Center shows the apps and every page of Apps opens without a refusal | 30 |
| 104-apps-by-role | bookingAgent: App Center shows the apps and every page of Apps opens without a refusal | 36 |
| 110-settings-listing-tags | the page opens through the menu and the Create form behaves | 78 |

Всеки файл описва какво се е объркало, как се възпроизвежда и кои скрийншоти да се гледат. Папката се подава на агента в проекта Hostify за анализ и поправка.
