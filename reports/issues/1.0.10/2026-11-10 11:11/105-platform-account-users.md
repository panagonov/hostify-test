# 105-platform-account-users — Platform Admin › Accounts › QA Automation — табът Users показва точно хората на акаунта

- Пуск: 2026-11-10_11-11-55 · Приложение: https://hostify.bioseek.eu · Версия: 1.0.10
- Спек: `tests/e2e/105-platform-account-users.spec.ts`
- Казуси: 1 от 1 проверки

## Казус 1: the QA account's record page has a Users tab with exactly its people

_Нов в този пуск._

**Какво се обърка**

```
Error: column "name" is not sorted ascend: "QIQA Invited" before "QHQA Housekeeper" (rows 1, 2)
```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като суперадминистратор (alarm@mail.bg).
2. Страница: https://hostify.bioseek.eu/app/platformAdmin/tenants
3. Спек `tests/e2e/105-platform-account-users.spec.ts`, проверка „the QA account's record page has a Users tab with exactly its people“ — стъпките:
4. open the first record of the row (its link) — the item page
5. the record page looks like a record page: head, white page, the tabs of the grid
6. open the tab "info" of the item page
7. open the tab "users" of the item page
8. open the tab "auditLog" of the item page
9. every column has a header and the actions column is the last one
10. sort by name ascend

**Скрийншоти**

![105-platform-account-users-1-shot-item-tenant.png](./105-platform-account-users-1-shot-item-tenant.png)
![105-platform-account-users-1-shot-item-tenant-info.png](./105-platform-account-users-1-shot-item-tenant-info.png)
![105-platform-account-users-1-shot-item-tenant-users.png](./105-platform-account-users-1-shot-item-tenant-users.png)
![105-platform-account-users-1-shot-item-tenant-auditLog.png](./105-platform-account-users-1-shot-item-tenant-auditLog.png)
![105-platform-account-users-1-shot-tenant-users.png](./105-platform-account-users-1-shot-tenant-users.png)
_(снимката е махната от QA: на нея се виждаха данни на други акаунти)_


**Предупреждения в конзолата**

- [AlertsMenuCount] TypeError: Failed to fetch

---

Какво проверява спекът: 105 — Platform Admin › Accounts › QA Automation › Users: the account's people (1.0.7).
