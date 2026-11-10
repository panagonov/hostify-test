# 110-settings-listing-tags — Settings › Listing tags: форма, записи през формата, сортиране и филтър по колони, табове, броене

- Пуск: 2026-11-10_11-43-00 · Приложение: https://hostify.bioseek.eu · Версия: 1.0.10
- Спек: `tests/e2e/110-settings-listing-tags.spec.ts`
- Казуси: 1 от 6 проверки

## Казус 1: filtering Date created by a period: today keeps the three tags, past periods keep none

_Нов в този пуск._

**Какво се обърка**

```
Error: The page reported 1 error(s) — API answers, failed requests, console errors:
- [console.error] [dashboard] definition load failed TypeError: Failed to fetch @ https://hostify.bioseek.eu/app/static/js/main.2463612a.js
```
- конзола: [dashboard] definition load failed TypeError: Failed to fetch — `/app/static/js/main.2463612a.js`

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Страница: https://hostify.bioseek.eu/app/settings/listingTags
3. Спек `tests/e2e/110-settings-listing-tags.spec.ts`, проверка „filtering Date created by a period: today keeps the three tags, past periods keep none“ — стъпките:
4. the period 2026-11-10 → 2026-11-10 (today) keeps the three tags
5. the period 2026-10-01 → 2026-10-10 (wholly in the past) keeps none
6. the period 2026-10-11 → 2026-11-09 (ends yesterday) keeps none
7. Clear filters of the column brings the three tags back
8. a reload keeps no filter
9. Developer tools › Console показва грешките по-горе.

**Скрийншоти**

![110-settings-listing-tags-1-_shot-listing-tags-date-created-today.png](./110-settings-listing-tags-1-_shot-listing-tags-date-created-today.png)
![110-settings-listing-tags-1-_screenshot.png](./110-settings-listing-tags-1-_screenshot.png)


**Предупреждения в конзолата**

- [InboxMenuCount] TypeError: Failed to fetch
- [hydraPartner] navbarExtensionLoader failed TypeError: Failed to fetch
- [ReviewsMenuChannels] TypeError: Failed to fetch
- [AlertsMenuCount] TypeError: Failed to fetch
- [demoData] the demo data status could not be read — no welcome modal TypeError: Failed to fetch
- [hydraPartner] the plugin surfaces were not read TypeError: Failed to fetch

---

Какво проверява спекът: 110 — Settings › Listing tags: the first master-data page, and the TEMPLATE of a page spec.
