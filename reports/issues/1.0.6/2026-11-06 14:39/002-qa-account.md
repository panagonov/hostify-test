# 002-qa-account — почистване на предишния пуск; акаунт „QA Automation“ и неговият администратор през формите

- Пуск: 2026-11-06_14-39-08 · Приложение: https://hostify.bioseek.eu · Версия: 1.0.6
- Спек: `tests/e2e/002-qa-account.spec.ts`
- Казуси: 1 от 2 проверки

## Казус 1: the QA account exists — created through the Accounts form when missing

_Нов в този пуск._

**Какво се обърка**

```
TimeoutError: page.waitForResponse: Timeout 45000ms exceeded while waiting for event "response"
```
- конзола: [dashboard] definition load failed TypeError: Failed to fetch — `/app/static/js/main.40ca681e.js`

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като суперадминистратор (alarm@mail.bg).
2. Страница: https://hostify.bioseek.eu/app/platformAdmin/tenants
3. Спек `tests/e2e/002-qa-account.spec.ts`, проверка „the QA account exists — created through the Accounts form when missing“.
4. Developer tools › Console показва грешките по-горе.

**Скрийншоти**

_(снимката е махната от QA)_


**Предупреждения в конзолата**

- [AlertsMenuCount] TypeError: Failed to fetch

---

Какво проверява спекът: 002 — the QA account and its administrator exist, and the account is empty.
