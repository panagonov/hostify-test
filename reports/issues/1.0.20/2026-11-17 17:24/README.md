# Казуси от пуска 2026-11-17 17:24 — версия 1.0.20

- Версия на приложението: **1.0.20** (същата като пуска 2026-11-17 14:12; „известен“ = същият казус в някой от предишните пускове на версията)
- Пуск: 2026-11-17_17-24-40 (`reports/runs/2026-11-17_17-24-40/summary.md`)
- Спекове в пуска: 100-settings-users, 103-channels-by-role, 104-apps-by-role, 105-platform-account-users, 110-settings-listing-tags, 111-user-telemetry

| Спек | Описание | Казуси | Нови | Файл |
|---|---|---|---|---|
| 104-apps-by-role | Apps и плъгините по роли — App Center и страниците на Apps се отварят без отказ за ролите, които ги имат (само гледане) | 1 | 1 | `104-apps-by-role.md` |
| 111-user-telemetry | Telemetry на човек — какво е направил (таговете на 110), часът на устройството му, тъмната тема | 2 | 2 | `111-user-telemetry.md` |

## ⚠ Пуск с толериран QA-227

Известните симптоми на тези бъгове се броят, не карат проверката да пада; никой бъг не е потвърден в този пуск.

| Спек | Проверка | Толерирани |
|---|---|---|
| 100-settings-users | the Users page opens through the menu and the Create form behaves | 78 |
| 104-apps-by-role | admin: App Center shows the apps and every page of Apps opens without a refusal | 52 |
| 104-apps-by-role | manager: App Center shows the apps and every page of Apps opens without a refusal | 36 |
| 104-apps-by-role | bookingAgent: App Center shows the apps and every page of Apps opens without a refusal | 22 |
| 110-settings-listing-tags | the page opens through the menu and the Create form behaves | 78 |

Всеки файл описва какво се е объркало, как се възпроизвежда и кои скрийншоти да се гледат. Папката се подава на агента в проекта Hostify за анализ и поправка.
