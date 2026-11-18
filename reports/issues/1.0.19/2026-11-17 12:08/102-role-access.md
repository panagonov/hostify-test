# 102-role-access — права по роли — всяка роля от 100 вижда точно своите страници, отваря ги без 403 и не вижда чуждите

- Пуск: 2026-11-17_12-08-15 · Приложение: https://hostify.bioseek.eu · Версия: 1.0.19
- Спек: `tests/e2e/102-role-access.spec.ts`
- Казуси: 6 от 6 проверки

## Казус 1: manager: the menu holds the role's pages, each opens without a refusal, the administrator's pages are refused

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

1. Спек `tests/e2e/102-role-access.spec.ts`, проверка „manager: the menu holds the role's pages, each opens without a refusal, the administrator's pages are refused“.

## Казус 2: revenueManager: the menu holds the role's pages, each opens without a refusal, the administrator's pages are refused

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

1. Спек `tests/e2e/102-role-access.spec.ts`, проверка „revenueManager: the menu holds the role's pages, each opens without a refusal, the administrator's pages are refused“.

## Казус 3: bookingAgent: the menu holds the role's pages, each opens without a refusal, the administrator's pages are refused

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

1. Спек `tests/e2e/102-role-access.spec.ts`, проверка „bookingAgent: the menu holds the role's pages, each opens without a refusal, the administrator's pages are refused“.

## Казус 4: accountant: the menu holds the role's pages, each opens without a refusal, the administrator's pages are refused

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

1. Спек `tests/e2e/102-role-access.spec.ts`, проверка „accountant: the menu holds the role's pages, each opens without a refusal, the administrator's pages are refused“.

## Казус 5: teamSupervisor: the menu holds the role's pages, each opens without a refusal, the administrator's pages are refused

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

1. Спек `tests/e2e/102-role-access.spec.ts`, проверка „teamSupervisor: the menu holds the role's pages, each opens without a refusal, the administrator's pages are refused“.

## Казус 6: housekeeper: the menu holds the role's pages, each opens without a refusal, the administrator's pages are refused

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

1. Спек `tests/e2e/102-role-access.spec.ts`, проверка „housekeeper: the menu holds the role's pages, each opens without a refusal, the administrator's pages are refused“.

---

Какво проверява спекът: 102 — every role of the QA account sees its own pages, opens them without a refusal, and is refused the others.
