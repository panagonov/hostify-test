# 100-settings-users — Settings › Users — по един потребител на роля през формата; всеки влиза с известната парола

- Пуск: 2026-11-06_14-08-44 · Приложение: https://hostify.bioseek.eu · Версия: 1.0.6
- Спек: `tests/e2e/100-settings-users.spec.ts`
- Казуси: 1 от 4 проверки

## Казус 1: the Users page opens through the menu and the Create form behaves

_Нов в този пуск._

**Какво се обърка**

```
TimeoutError: page.goto: Timeout 60000ms exceeded.
Call log:
  - navigating to "https://hostify.bioseek.eu/app/", waiting until "domcontentloaded"

```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Страница: https://hostify.bioseek.eu/app/
3. Спек `tests/e2e/100-settings-users.spec.ts`, проверка „the Users page opens through the menu and the Create form behaves“.

**Скрийншоти**

![100-settings-users-1-screenshot.png](./100-settings-users-1-screenshot.png)


---

Какво проверява спекът: 100 — Settings › Users: the people of the QA account, one per role, through the Users form.
