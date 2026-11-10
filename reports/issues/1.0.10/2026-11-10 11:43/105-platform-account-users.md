# 105-platform-account-users — Platform Admin › Accounts › QA Automation — табът Users показва точно хората на акаунта

- Пуск: 2026-11-10_11-43-00 · Приложение: https://hostify.bioseek.eu · Версия: 1.0.10
- Спек: `tests/e2e/105-platform-account-users.spec.ts`
- Казуси: 1 от 1 проверки

## Казус 1: the QA account's record page has a Users tab with exactly its people

_Известен от пуска 2026-11-10 11:33 (същата версия) — не е отстранен._

**Какво се обърка**

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.ant-table').filter({ hasNot: locator('.hydra-dashboard-widget') }).first().locator('tbody tr.ant-table-row').filter({ has: locator('td.name').filter({ hasText: /^\s*QA Automation\s*$/ }) }).first().locator('a[href]').first()
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for locator('.ant-table').filter({ hasNot: locator('.hydra-dashboard-widget') }).first().locator('tbody tr.ant-table-row').filter({ has: locator('td.name').filter({ hasText: /^\s*QA Automation\s*$/ }) }).first().locator('a[href]').first()

```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като суперадминистратор (alarm@mail.bg).
2. Страница: https://hostify.bioseek.eu/app/platformAdmin/tenants/f2b3ad65-0d9a-4992-929c-3abe4823df98/info
3. Спек `tests/e2e/105-platform-account-users.spec.ts`, проверка „the QA account's record page has a Users tab with exactly its people“ — стъпките:
4. open the first record of the row (its link) — the item page
5. the record page looks like a record page: head, white page, the tabs of the grid
6. open the tab "info" of the item page
7. open the tab "users" of the item page
8. open the tab "auditLog" of the item page

**Скрийншоти**

![105-platform-account-users-1-shot-item-tenant.png](./105-platform-account-users-1-shot-item-tenant.png)
![105-platform-account-users-1-shot-item-tenant-info.png](./105-platform-account-users-1-shot-item-tenant-info.png)
![105-platform-account-users-1-shot-item-tenant-users.png](./105-platform-account-users-1-shot-item-tenant-users.png)
![105-platform-account-users-1-shot-item-tenant-auditLog.png](./105-platform-account-users-1-shot-item-tenant-auditLog.png)
![105-platform-account-users-1-screenshot.png](./105-platform-account-users-1-screenshot.png)


**Предупреждения в конзолата**

- [AlertsMenuCount] TypeError: Failed to fetch

---

Какво проверява спекът: 105 — Platform Admin › Accounts › QA Automation › Users: the account's people (1.0.7).
