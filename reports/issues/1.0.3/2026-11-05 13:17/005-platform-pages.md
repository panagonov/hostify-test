# 005-platform-pages — проверка на навбар менютата на платформената конзола (всяка страница се отваря и се оглежда)

- Пуск: 2026-11-05_13-17-15 · Приложение: https://hostify.bioseek.eu · Версия: 1.0.3
- Спек: `tests/e2e/005-platform-pages.spec.ts`
- Казуси: 9 от 34 проверки

## Казус 1: consoleActions opens (/app/platformLogs/consoleActions)

_Нов в този пуск._

**Какво се обърка**

```
Error: The page reported 1 error(s) — API answers, failed requests, console errors:
- [api.status] POST 404 @ https://hostify.bioseek.eu/api/tenant/search
```
- сървърът отговори: POST 404 — `/api/tenant/search`

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като суперадминистратор (alarm@mail.bg).
2. Меню: LOGS › Console actions — https://hostify.bioseek.eu/app/platformLogs/consoleActions
3. Developer tools › Network: заявките по-горе отговарят така.

**Скрийншоти**

- `005-platform-pages-1-_shot-consoleActions.png`
- `005-platform-pages-1-_screenshot.png`

## Казус 2: appCenter opens (/app/apps/appCenter)

_Нов в този пуск._

**Какво се обърка**

```
Error: The page reported 1 error(s) — API answers, failed requests, console errors:
- [api.status] POST 403 @ https://hostify.bioseek.eu/api/automationApp/state
```
- сървърът отговори: POST 403 — `/api/automationApp/state`

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като суперадминистратор (alarm@mail.bg).
2. Меню: APPS › App Center — https://hostify.bioseek.eu/app/apps/appCenter
3. Developer tools › Network: заявките по-горе отговарят така.

**Скрийншоти**

- `005-platform-pages-2-_shot-appCenter.png`
- `005-platform-pages-2-_screenshot.png`

## Казус 3: partners opens (/app/apps/partners)

_Нов в този пуск._

**Какво се обърка**

```
Error: The page reported 1 error(s) — API answers, failed requests, console errors:
- [api.status] POST 403 @ https://hostify.bioseek.eu/api/automationApp/state
```
- сървърът отговори: POST 403 — `/api/automationApp/state`

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като суперадминистратор (alarm@mail.bg).
2. Меню: APPS › Partner apps — https://hostify.bioseek.eu/app/apps/partners
3. Developer tools › Network: заявките по-горе отговарят така.

**Скрийншоти**

- `005-platform-pages-3-_shot-partners.png`
- `005-platform-pages-3-_screenshot.png`

## Казус 4: paymentProcessorAccounts opens (/app/apps/paymentProcessorAccounts)

_Нов в този пуск._

**Какво се обърка**

```
Error: The page reported 1 error(s) — API answers, failed requests, console errors:
- [api.status] POST 403 @ https://hostify.bioseek.eu/api/automationApp/state
```
- сървърът отговори: POST 403 — `/api/automationApp/state`

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като суперадминистратор (alarm@mail.bg).
2. Меню: APPS › Payment processors — https://hostify.bioseek.eu/app/apps/paymentProcessorAccounts
3. Developer tools › Network: заявките по-горе отговарят така.

**Скрийншоти**

- `005-platform-pages-4-_shot-paymentProcessorAccounts.png`
- `005-platform-pages-4-_screenshot.png`

## Казус 5: bookingApiClients opens (/app/apps/bookingApiClients)

_Нов в този пуск._

**Какво се обърка**

```
Error: The page reported 1 error(s) — API answers, failed requests, console errors:
- [api.status] POST 403 @ https://hostify.bioseek.eu/api/automationApp/state
```
- сървърът отговори: POST 403 — `/api/automationApp/state`

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като суперадминистратор (alarm@mail.bg).
2. Меню: APPS › Booking API — https://hostify.bioseek.eu/app/apps/bookingApiClients
3. Developer tools › Network: заявките по-горе отговарят така.

**Скрийншоти**

- `005-platform-pages-5-_shot-bookingApiClients.png`
- `005-platform-pages-5-_screenshot.png`

## Казус 6: ownerPortalRoles opens (/app/apps/ownerPortalRoles)

_Нов в този пуск._

**Какво се обърка**

```
Error: The page reported 1 error(s) — API answers, failed requests, console errors:
- [api.status] POST 403 @ https://hostify.bioseek.eu/api/automationApp/state
```
- сървърът отговори: POST 403 — `/api/automationApp/state`

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като суперадминистратор (alarm@mail.bg).
2. Меню: APPS › Owner portal roles — https://hostify.bioseek.eu/app/apps/ownerPortalRoles
3. Developer tools › Network: заявките по-горе отговарят така.

**Скрийншоти**

- `005-platform-pages-6-_shot-ownerPortalRoles.png`
- `005-platform-pages-6-_screenshot.png`

## Казус 7: checkinFormTemplates opens (/app/apps/checkinFormTemplates)

_Нов в този пуск._

**Какво се обърка**

```
Error: The page reported 1 error(s) — API answers, failed requests, console errors:
- [api.status] POST 403 @ https://hostify.bioseek.eu/api/automationApp/state
```
- сървърът отговори: POST 403 — `/api/automationApp/state`

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като суперадминистратор (alarm@mail.bg).
2. Меню: APPS › Online check-in — https://hostify.bioseek.eu/app/apps/checkinFormTemplates
3. Developer tools › Network: заявките по-горе отговарят така.

**Скрийншоти**

- `005-platform-pages-7-_shot-checkinFormTemplates.png`
- `005-platform-pages-7-_screenshot.png`

## Казус 8: complianceConnections opens (/app/apps/complianceConnections)

_Нов в този пуск._

**Какво се обърка**

```
Error: The page reported 1 error(s) — API answers, failed requests, console errors:
- [api.status] POST 403 @ https://hostify.bioseek.eu/api/automationApp/state
```
- сървърът отговори: POST 403 — `/api/automationApp/state`

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като суперадминистратор (alarm@mail.bg).
2. Меню: APPS › Compliance connections — https://hostify.bioseek.eu/app/apps/complianceConnections
3. Developer tools › Network: заявките по-горе отговарят така.

**Скрийншоти**

- `005-platform-pages-8-_shot-complianceConnections.png`
- `005-platform-pages-8-_screenshot.png`

## Казус 9: complianceSubmissions opens (/app/apps/complianceSubmissions)

_Нов в този пуск._

**Какво се обърка**

```
Error: The page reported 1 error(s) — API answers, failed requests, console errors:
- [api.status] POST 403 @ https://hostify.bioseek.eu/api/automationApp/state
```
- сървърът отговори: POST 403 — `/api/automationApp/state`

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като суперадминистратор (alarm@mail.bg).
2. Меню: APPS › Requests status — https://hostify.bioseek.eu/app/apps/complianceSubmissions
3. Developer tools › Network: заявките по-горе отговарят така.

**Скрийншоти**

- `005-platform-pages-9-_shot-complianceSubmissions.png`
- `005-platform-pages-9-_screenshot.png`

---

Какво проверява спекът: 005 — every page of the PLATFORM console opens for the super administrator.
