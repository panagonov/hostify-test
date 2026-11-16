# Казуси от пуска 2026-11-16 14:55 — версия 1.0.15

- Версия на приложението: **1.0.15** (същата като пуска 2026-11-16 14:42; „известен“ = същият казус в някой от предишните пускове на версията)
- Пуск: 2026-11-16_14-55-22 (`reports/runs/2026-11-16_14-55-22/summary.md`)
- Спекове в пуска: 103-channels-by-role, 104-apps-by-role

| Спек | Описание | Казуси | Нови | Файл |
|---|---|---|---|---|
| 103-channels-by-role | каналите по роли — кой вижда страниците и кой има активни бутони (само гледане); колоните с опитите в Inbound events | 5 | 2 | `103-channels-by-role.md` |
| 104-apps-by-role | Apps и плъгините по роли — App Center и страниците на Apps се отварят без отказ за ролите, които ги имат (само гледане) | 2 | 1 | `104-apps-by-role.md` |

## ⚠ Пуск с толериран QA-227

Известните симптоми на тези бъгове се броят, не карат проверката да пада; никой бъг не е потвърден в този пуск.

| Спек | Проверка | Толерирани |
|---|---|---|
| 104-apps-by-role | admin: App Center shows the apps and every page of Apps opens without a refusal | 24 |
| 104-apps-by-role | manager: App Center shows the apps and every page of Apps opens without a refusal | 24 |
| 104-apps-by-role | bookingAgent: App Center shows the apps and every page of Apps opens without a refusal | 26 |

Всеки файл описва какво се е объркало, как се възпроизвежда и кои скрийншоти да се гледат. Папката се подава на агента в проекта Hostify за анализ и поправка.
