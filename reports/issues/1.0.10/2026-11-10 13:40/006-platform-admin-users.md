# 006-platform-admin-users — Platform Admin › Users — формата „Create user“ на супер администратора: всяко поле, всеки таб, валидацията; действията на реда са в колоната си

- Пуск: 2026-11-10_13-40-15 · Приложение: https://hostify.bioseek.eu · Версия: 1.0.10
- Спек: `tests/e2e/006-platform-admin-users.spec.ts`
- Казуси: 1 от 2 проверки

## Казус 1: the grid keeps every action inside its actions column

_Известен от пуска 2026-11-09 15:51 (същата версия) — не е отстранен._

**Какво се обърка**

```
Error: The page reported 1 error(s) — API answers, failed requests, console errors:
- [console.error] [dashboard] definition load failed TypeError: Failed to fetch @ https://hostify.bioseek.eu/app/static/js/main.2463612a.js
```
- конзола: [dashboard] definition load failed TypeError: Failed to fetch — `/app/static/js/main.2463612a.js`

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като суперадминистратор (alarm@mail.bg).
2. Страница: https://hostify.bioseek.eu/app/platformAdmin/users/614d3d67-77d4-4351-abf8-90443678862d/info
3. Спек `tests/e2e/006-platform-admin-users.spec.ts`, проверка „the grid keeps every action inside its actions column“ — стъпките:
4. every column has a header and the actions column is the last one
5. Developer tools › Console показва грешките по-горе.

**Скрийншоти**

![006-platform-admin-users-1-screenshot.png](./006-platform-admin-users-1-screenshot.png)


**Предупреждения в конзолата**

- [AlertsMenuCount] TypeError: Failed to fetch

---

Какво проверява спекът: 006 — Platform Admin › Users: the super administrator's Create user form behaves and follows its layout, and the
