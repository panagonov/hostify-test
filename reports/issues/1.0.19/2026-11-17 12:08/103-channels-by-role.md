# 103-channels-by-role — каналите по роли — кой вижда страниците и кой има активни бутони (само гледане); Inbound events вече я няма

- Пуск: 2026-11-17_12-08-15 · Приложение: https://hostify.bioseek.eu · Версия: 1.0.19
- Спек: `tests/e2e/103-channels-by-role.spec.ts`
- Казуси: 4 от 7 проверки

## Казус 1: manager: every page of Channels opens; the sites can be connected; Fetch opportunities is looked at

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

1. Влез в https://hostify.bioseek.eu/app/ като manager на акаунта (qa.manager@hostify-qa.test).
2. Страница: https://hostify.bioseek.eu/app/
3. Спек `tests/e2e/103-channels-by-role.spec.ts`, проверка „manager: every page of Channels opens; the sites can be connected; Fetch opportunities is looked at“.

**Скрийншоти**

![103-channels-by-role-1-screenshot.png](./103-channels-by-role-1-screenshot.png)


## Казус 2: booking agent: the channels are seen, nothing can be started; Inbound events is not his

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
3. Спек `tests/e2e/103-channels-by-role.spec.ts`, проверка „booking agent: the channels are seen, nothing can be started; Inbound events is not his“.

**Скрийншоти**

![103-channels-by-role-2-screenshot.png](./103-channels-by-role-2-screenshot.png)


## Казус 3: housekeeper: Channels is not on the menu and its pages say "Page not found"

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

1. Влез в https://hostify.bioseek.eu/app/ като housekeeper на акаунта (qa.housekeeper@hostify-qa.test).
2. Страница: https://hostify.bioseek.eu/app/
3. Спек `tests/e2e/103-channels-by-role.spec.ts`, проверка „housekeeper: Channels is not on the menu and its pages say "Page not found"“.

**Скрийншоти**

![103-channels-by-role-3-_screenshot.png](./103-channels-by-role-3-_screenshot.png)


## Казус 4: manager: Inbound events is gone since 1.0.16 — its address says "Page not found"

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

1. Влез в https://hostify.bioseek.eu/app/ като manager на акаунта (qa.manager@hostify-qa.test).
2. Страница: https://hostify.bioseek.eu/app/
3. Спек `tests/e2e/103-channels-by-role.spec.ts`, проверка „manager: Inbound events is gone since 1.0.16 — its address says "Page not found"“.

**Скрийншоти**

![103-channels-by-role-4-_screenshot.png](./103-channels-by-role-4-_screenshot.png)


---

Какво проверява спекът: 103 — Channels by role (1.0.11–1.0.16): every role sees the channels it may see; only the administrator and the
