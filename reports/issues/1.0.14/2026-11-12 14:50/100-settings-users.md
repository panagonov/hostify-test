# 100-settings-users — Settings › Users — по един потребител на роля през формата; всеки влиза с известната парола

- Пуск: 2026-11-12_14-50-35 · Приложение: https://hostify.bioseek.eu · Версия: 1.0.14
- Спек: `tests/e2e/100-settings-users.spec.ts`
- Казуси: 1 от 1 проверки

## Казус 1: a user of every role exists — created through the form when missing — and signs in

_Известен от пуска 2026-11-12 10:55 (същата версия) — не е отстранен._

**Какво се обърка**

```
TimeoutError: locator.fill: Timeout 20000ms exceeded.
Call log:
  - waiting for locator('[data-test="grid-search"]').or(locator('.filterTags input')).or(getByPlaceholder(/search/i)).first()

```
- сървърът отговори: POST 401 — `/api/user`

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Страница: https://hostify.bioseek.eu/app/
3. Спек `tests/e2e/100-settings-users.spec.ts`, проверка „a user of every role exists — created through the form when missing — and signs in“ — стъпките:
4. Manager: qa.manager@hostify-qa.test
5. Revenue Manager: qa.revenue.manager@hostify-qa.test
6. Developer tools › Network: заявките по-горе отговарят така.

**Скрийншоти**

![100-settings-users-1-screenshot.png](./100-settings-users-1-screenshot.png)


**Предупреждения в конзолата**

- [ReviewsMenuChannels] TypeError: Failed to fetch
- [InboxMenuCount] TypeError: Failed to fetch
- [hydraPartner] navbarExtensionLoader failed TypeError: Failed to fetch
- [demoData] the demo data status could not be read — no welcome modal TypeError: Failed to fetch
- [AlertsMenuCount] TypeError: Failed to fetch
- [hydraPartner] the plugin surfaces were not read TypeError: Failed to fetch

---

Какво проверява спекът: 100 — Settings › Users: the people of the QA account, one per role, through the Users form.
