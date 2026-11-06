# 005-platform-pages — проверка на навбар менютата на платформената конзола (всяка страница се отваря и се оглежда)

- Пуск: 2026-11-06_09-34-06 · Приложение: https://hostify.bioseek.eu · Версия: 1.0.5
- Спек: `tests/e2e/005-platform-pages.spec.ts`
- Казуси: 1 от 34 проверки

## Казус 1: platformDashboard opens (/app/platformDashboard)

_Нов в този пуск._

**Какво се обърка**

```
TimeoutError: page.goto: Timeout 60000ms exceeded.
Call log:
  - navigating to "https://hostify.bioseek.eu/app/", waiting until "domcontentloaded"

```

**Как да се възпроизведе**

1. Спек `tests/e2e/005-platform-pages.spec.ts`, проверка „platformDashboard opens (/app/platformDashboard)“.

**Скрийншоти**

![005-platform-pages-1-_screenshot.png](./005-platform-pages-1-_screenshot.png)


---

Какво проверява спекът: 005 — every page of the PLATFORM console opens for the super administrator.
