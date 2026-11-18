# 101-navbar-support-assistant — Support в лявото меню отваря асистента (не стария месинджър) — за администратора и за booking agent

- Пуск: 2026-11-17_12-08-15 · Приложение: https://hostify.bioseek.eu · Версия: 1.0.19
- Спек: `tests/e2e/101-navbar-support-assistant.spec.ts`
- Казуси: 1 от 2 проверки

## Казус 1: a booking agent: „Support“ opens the assistant

_Нов в този пуск._

**Какво се обърка**

```
Error: expect(locator).toBeHidden() failed

Locator:  locator('[data-test="login-modal"]').locator('.ant-modal')
Expected: hidden
Received: visible
Timeout:  30000ms

Call log:
  - Expect "toBeHidden" with timeout 30000ms
  - waiting for locator('[data-test="login-modal"]').locator('.ant-modal')
    33 × locator resolved to <div role="dialog" tabindex="-1" aria-modal="true" aria-labelledby="_r_1_" class="ant-modal css-ry7cab">…</div>
       - unexpected value "visible"
```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като bookingAgent на акаунта (qa.booking.agent@hostify-qa.test).
2. Страница: https://hostify.bioseek.eu/app/
3. Спек `tests/e2e/101-navbar-support-assistant.spec.ts`, проверка „a booking agent: „Support“ opens the assistant“.

**Скрийншоти**

![101-navbar-support-assistant-1-screenshot.png](./101-navbar-support-assistant-1-screenshot.png)


---

Какво проверява спекът: 101 — „Support“ of the left menu opens the assistant (1.0.7: the separate support messenger is gone).
