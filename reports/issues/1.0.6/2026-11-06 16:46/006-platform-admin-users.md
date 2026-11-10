# 006-platform-admin-users — Platform Admin › Users — формата „Create user“ на супер администратора: всяко поле, всеки таб, валидацията

- Пуск: 2026-11-06_16-46-10 · Приложение: https://hostify.bioseek.eu · Версия: 1.0.6
- Спек: `tests/e2e/006-platform-admin-users.spec.ts`
- Казуси: 1 от 1 проверки

## Казус 1: the Create user form opens, every tab is presentable, an empty Save is refused

_Нов в този пуск._

**Какво се обърка**

```
Error: The page reported 1 error(s) — API answers, failed requests, console errors:
- [console.error] [dashboard] definition load failed TypeError: Failed to fetch @ https://hostify.bioseek.eu/app/static/js/main.40ca681e.js
```
- конзола: [dashboard] definition load failed TypeError: Failed to fetch — `/app/static/js/main.40ca681e.js`

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като суперадминистратор (alarm@mail.bg).
2. Страница: https://hostify.bioseek.eu/app/platformAdmin/users
3. Спек `tests/e2e/006-platform-admin-users.spec.ts`, проверка „the Create user form opens, every tab is presentable, an empty Save is refused“.
4. Developer tools › Console показва грешките по-горе.

**Скрийншоти**

_(снимката е махната от QA)_
_(снимката е махната от QA)_


**Предупреждения в конзолата**

- [AlertsMenuCount] TypeError: Failed to fetch

---

Какво проверява спекът: 006 — Platform Admin › Users: the super administrator's Create user form behaves and follows its layout.
