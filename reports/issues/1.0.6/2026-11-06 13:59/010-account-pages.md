# 010-account-pages — проверка на навбар менютата на акаунта (всяка страница се отваря и се оглежда)

- Пуск: 2026-11-06_13-59-50 · Приложение: https://hostify.bioseek.eu · Версия: 1.0.6
- Спек: `tests/e2e/010-account-pages.spec.ts`
- Казуси: 1 от 177 проверки

## Казус 1: dashboards opens (/app/dashboards)

_Нов в този пуск._

**Какво се обърка**

```
TimeoutError: page.goto: Timeout 60000ms exceeded.
Call log:
  - navigating to "https://hostify.bioseek.eu/app/", waiting until "domcontentloaded"

```

**Как да се възпроизведе**

1. Спек `tests/e2e/010-account-pages.spec.ts`, проверка „dashboards opens (/app/dashboards)“.

**Скрийншоти**

![010-account-pages-1-_screenshot.png](./010-account-pages-1-_screenshot.png)


---

Какво проверява спекът: 010 — every page of the ACCOUNT menu opens for the account administrator of the QA account.
