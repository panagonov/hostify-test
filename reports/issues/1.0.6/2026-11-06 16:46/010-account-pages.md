# 010-account-pages — проверка на навбар менютата на акаунта (всяка страница се отваря и се оглежда)

- Пуск: 2026-11-06_16-46-10 · Приложение: https://hostify.bioseek.eu · Версия: 1.0.6
- Спек: `tests/e2e/010-account-pages.spec.ts`
- Казуси: 27 от 177 проверки

## Казус 1: reportingHousekeeping opens (/app/reporting/reportingHousekeeping)

_Известен от пуска 2026-11-06 15:51 (същата версия) — не е отстранен._

**Какво се обърка**

```
Error: the URL of "reportingHousekeeping"

expect(page).toHaveURL(expected) failed

Expected pattern: /\/app\/reporting\/reportingHousekeeping(\/|\?|$)/
Received string:  "https://hostify.bioseek.eu/app/operations/housekeepingBoard"
Timeout: 45000ms

Call log:
  - the URL of "reportingHousekeeping" with timeout 45000ms
    48 × unexpected value "https://hostify.bioseek.eu/app/operations/housekeepingBoard"

```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: REPORTING › Housekeeping — https://hostify.bioseek.eu/app/reporting/reportingHousekeeping
3. Спек `tests/e2e/010-account-pages.spec.ts`, проверка „reportingHousekeeping opens (/app/reporting/reportingHousekeeping)“.

**Скрийншоти**

![010-account-pages-1-_screenshot.png](./010-account-pages-1-_screenshot.png)


## Казус 2: reportingReviews opens (/app/reporting/reportingReviews)

_Известен от пуска 2026-11-06 15:51 (същата версия) — не е отстранен._

**Какво се обърка**

```
Error: the URL of "reportingReviews"

expect(page).toHaveURL(expected) failed

Expected pattern: /\/app\/reporting\/reportingReviews(\/|\?|$)/
Received string:  "https://hostify.bioseek.eu/app/reviewsMenu/internalReviewsMenu/internalReviewsDashboard"
Timeout: 45000ms

Call log:
  - the URL of "reportingReviews" with timeout 45000ms
    48 × unexpected value "https://hostify.bioseek.eu/app/reviewsMenu/internalReviewsMenu/internalReviewsDashboard"

```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: REPORTING › Reviews — https://hostify.bioseek.eu/app/reporting/reportingReviews
3. Спек `tests/e2e/010-account-pages.spec.ts`, проверка „reportingReviews opens (/app/reporting/reportingReviews)“.

**Скрийншоти**

![010-account-pages-2-_screenshot.png](./010-account-pages-2-_screenshot.png)


## Казус 3: bookingOptimizer opens (/app/reporting/bookingOptimizer)

_Известен от пуска 2026-11-06 15:51 (същата версия) — не е отстранен._

**Какво се обърка**

```
Error: submenu node "bookingOptimizer"

expect(locator).toBeVisible() failed

Locator: locator('.cc-submenu-slide-panel').locator('[data-test="bookingOptimizer"]')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - submenu node "bookingOptimizer" with timeout 30000ms
  - waiting for locator('.cc-submenu-slide-panel').locator('[data-test="bookingOptimizer"]')
```

**Как да се възпроизведе**

1. Страница: https://hostify.bioseek.eu/app/reporting/reportingOverview
2. Спек `tests/e2e/010-account-pages.spec.ts`, проверка „bookingOptimizer opens (/app/reporting/bookingOptimizer)“.

**Скрийншоти**

![010-account-pages-3-_screenshot.png](./010-account-pages-3-_screenshot.png)


## Казус 4: airbnbReviewsDashboard opens (/app/reviewsMenu/airbnbReviewsMenu/airbnbReviewsDashboard)

_Известен от пуска 2026-11-06 15:51 (същата версия) — не е отстранен._

**Какво се обърка**

```
Error: submenu node "airbnbReviewsMenu"

expect(locator).toBeVisible() failed

Locator: locator('.cc-submenu-slide-panel').locator('[data-test="airbnbReviewsMenu"]')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - submenu node "airbnbReviewsMenu" with timeout 30000ms
  - waiting for locator('.cc-submenu-slide-panel').locator('[data-test="airbnbReviewsMenu"]')
```

**Как да се възпроизведе**

1. Страница: https://hostify.bioseek.eu/app/airbnbReviewsMenu
2. Спек `tests/e2e/010-account-pages.spec.ts`, проверка „airbnbReviewsDashboard opens (/app/reviewsMenu/airbnbReviewsMenu/airbnbReviewsDashboard)“.

**Скрийншоти**

![010-account-pages-4-screenshot.png](./010-account-pages-4-screenshot.png)


## Казус 5: airbnbReviews opens (/app/reviewsMenu/airbnbReviewsMenu/airbnbReviews)

_Известен от пуска 2026-11-06 15:51 (същата версия) — не е отстранен._

**Какво се обърка**

```
Error: submenu node "airbnbReviewsMenu"

expect(locator).toBeVisible() failed

Locator: locator('.cc-submenu-slide-panel').locator('[data-test="airbnbReviewsMenu"]')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - submenu node "airbnbReviewsMenu" with timeout 30000ms
  - waiting for locator('.cc-submenu-slide-panel').locator('[data-test="airbnbReviewsMenu"]')
```

**Как да се възпроизведе**

1. Страница: https://hostify.bioseek.eu/app/airbnbReviewsMenu
2. Спек `tests/e2e/010-account-pages.spec.ts`, проверка „airbnbReviews opens (/app/reviewsMenu/airbnbReviewsMenu/airbnbReviews)“.

**Скрийншоти**

![010-account-pages-5-screenshot.png](./010-account-pages-5-screenshot.png)


## Казус 6: airbnbReviewListings opens (/app/reviewsMenu/airbnbReviewsMenu/airbnbReviewListings)

_Известен от пуска 2026-11-06 15:51 (същата версия) — не е отстранен._

**Какво се обърка**

```
Error: submenu node "airbnbReviewsMenu"

expect(locator).toBeVisible() failed

Locator: locator('.cc-submenu-slide-panel').locator('[data-test="airbnbReviewsMenu"]')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - submenu node "airbnbReviewsMenu" with timeout 30000ms
  - waiting for locator('.cc-submenu-slide-panel').locator('[data-test="airbnbReviewsMenu"]')
```

**Как да се възпроизведе**

1. Страница: https://hostify.bioseek.eu/app/airbnbReviewsMenu
2. Спек `tests/e2e/010-account-pages.spec.ts`, проверка „airbnbReviewListings opens (/app/reviewsMenu/airbnbReviewsMenu/airbnbReviewListings)“.

**Скрийншоти**

![010-account-pages-6-screenshot.png](./010-account-pages-6-screenshot.png)


## Казус 7: airbnbTripIssues opens (/app/reviewsMenu/airbnbReviewsMenu/airbnbTripIssues)

_Известен от пуска 2026-11-06 15:51 (същата версия) — не е отстранен._

**Какво се обърка**

```
Error: submenu node "airbnbReviewsMenu"

expect(locator).toBeVisible() failed

Locator: locator('.cc-submenu-slide-panel').locator('[data-test="airbnbReviewsMenu"]')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - submenu node "airbnbReviewsMenu" with timeout 30000ms
  - waiting for locator('.cc-submenu-slide-panel').locator('[data-test="airbnbReviewsMenu"]')
```

**Как да се възпроизведе**

1. Страница: https://hostify.bioseek.eu/app/airbnbReviewsMenu
2. Спек `tests/e2e/010-account-pages.spec.ts`, проверка „airbnbTripIssues opens (/app/reviewsMenu/airbnbReviewsMenu/airbnbTripIssues)“.

**Скрийншоти**

![010-account-pages-7-screenshot.png](./010-account-pages-7-screenshot.png)


## Казус 8: bookingComReviewsDashboard opens (/app/reviewsMenu/bookingComReviewsMenu/bookingComReviewsDashboard)

_Известен от пуска 2026-11-06 15:51 (същата версия) — не е отстранен._

**Какво се обърка**

```
Error: submenu node "bookingComReviewsMenu"

expect(locator).toBeVisible() failed

Locator: locator('.cc-submenu-slide-panel').locator('[data-test="bookingComReviewsMenu"]')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - submenu node "bookingComReviewsMenu" with timeout 30000ms
  - waiting for locator('.cc-submenu-slide-panel').locator('[data-test="bookingComReviewsMenu"]')
```

**Как да се възпроизведе**

1. Страница: https://hostify.bioseek.eu/app/airbnbReviewsMenu
2. Спек `tests/e2e/010-account-pages.spec.ts`, проверка „bookingComReviewsDashboard opens (/app/reviewsMenu/bookingComReviewsMenu/bookingComReviewsDashboard)“.

**Скрийншоти**

![010-account-pages-8-screenshot.png](./010-account-pages-8-screenshot.png)


## Казус 9: bookingComReviews opens (/app/reviewsMenu/bookingComReviewsMenu/bookingComReviews)

_Известен от пуска 2026-11-06 15:51 (същата версия) — не е отстранен._

**Какво се обърка**

```
Error: submenu node "bookingComReviewsMenu"

expect(locator).toBeVisible() failed

Locator: locator('.cc-submenu-slide-panel').locator('[data-test="bookingComReviewsMenu"]')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - submenu node "bookingComReviewsMenu" with timeout 30000ms
  - waiting for locator('.cc-submenu-slide-panel').locator('[data-test="bookingComReviewsMenu"]')
```

**Как да се възпроизведе**

1. Страница: https://hostify.bioseek.eu/app/airbnbReviewsMenu
2. Спек `tests/e2e/010-account-pages.spec.ts`, проверка „bookingComReviews opens (/app/reviewsMenu/bookingComReviewsMenu/bookingComReviews)“.

**Скрийншоти**

![010-account-pages-9-screenshot.png](./010-account-pages-9-screenshot.png)


## Казус 10: bookingComReviewListings opens (/app/reviewsMenu/bookingComReviewsMenu/bookingComReviewListings)

_Известен от пуска 2026-11-06 15:51 (същата версия) — не е отстранен._

**Какво се обърка**

```
Error: submenu node "bookingComReviewsMenu"

expect(locator).toBeVisible() failed

Locator: locator('.cc-submenu-slide-panel').locator('[data-test="bookingComReviewsMenu"]')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - submenu node "bookingComReviewsMenu" with timeout 30000ms
  - waiting for locator('.cc-submenu-slide-panel').locator('[data-test="bookingComReviewsMenu"]')
```

**Как да се възпроизведе**

1. Страница: https://hostify.bioseek.eu/app/airbnbReviewsMenu
2. Спек `tests/e2e/010-account-pages.spec.ts`, проверка „bookingComReviewListings opens (/app/reviewsMenu/bookingComReviewsMenu/bookingComReviewListings)“.

**Скрийншоти**

![010-account-pages-10-screenshot.png](./010-account-pages-10-screenshot.png)


## Казус 11: vrboReviewsDashboard opens (/app/reviewsMenu/vrboReviewsMenu/vrboReviewsDashboard)

_Известен от пуска 2026-11-06 15:51 (същата версия) — не е отстранен._

**Какво се обърка**

```
Error: submenu node "vrboReviewsMenu"

expect(locator).toBeVisible() failed

Locator: locator('.cc-submenu-slide-panel').locator('[data-test="vrboReviewsMenu"]')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - submenu node "vrboReviewsMenu" with timeout 30000ms
  - waiting for locator('.cc-submenu-slide-panel').locator('[data-test="vrboReviewsMenu"]')
```

**Как да се възпроизведе**

1. Страница: https://hostify.bioseek.eu/app/airbnbReviewsMenu
2. Спек `tests/e2e/010-account-pages.spec.ts`, проверка „vrboReviewsDashboard opens (/app/reviewsMenu/vrboReviewsMenu/vrboReviewsDashboard)“.

**Скрийншоти**

![010-account-pages-11-screenshot.png](./010-account-pages-11-screenshot.png)


## Казус 12: vrboReviews opens (/app/reviewsMenu/vrboReviewsMenu/vrboReviews)

_Известен от пуска 2026-11-06 15:51 (същата версия) — не е отстранен._

**Какво се обърка**

```
Error: submenu node "vrboReviewsMenu"

expect(locator).toBeVisible() failed

Locator: locator('.cc-submenu-slide-panel').locator('[data-test="vrboReviewsMenu"]')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - submenu node "vrboReviewsMenu" with timeout 30000ms
  - waiting for locator('.cc-submenu-slide-panel').locator('[data-test="vrboReviewsMenu"]')
```

**Как да се възпроизведе**

1. Страница: https://hostify.bioseek.eu/app/airbnbReviewsMenu
2. Спек `tests/e2e/010-account-pages.spec.ts`, проверка „vrboReviews opens (/app/reviewsMenu/vrboReviewsMenu/vrboReviews)“.

**Скрийншоти**

![010-account-pages-12-screenshot.png](./010-account-pages-12-screenshot.png)


## Казус 13: vrboReviewListings opens (/app/reviewsMenu/vrboReviewsMenu/vrboReviewListings)

_Известен от пуска 2026-11-06 15:51 (същата версия) — не е отстранен._

**Какво се обърка**

```
Error: submenu node "vrboReviewsMenu"

expect(locator).toBeVisible() failed

Locator: locator('.cc-submenu-slide-panel').locator('[data-test="vrboReviewsMenu"]')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - submenu node "vrboReviewsMenu" with timeout 30000ms
  - waiting for locator('.cc-submenu-slide-panel').locator('[data-test="vrboReviewsMenu"]')
```

**Как да се възпроизведе**

1. Страница: https://hostify.bioseek.eu/app/airbnbReviewsMenu
2. Спек `tests/e2e/010-account-pages.spec.ts`, проверка „vrboReviewListings opens (/app/reviewsMenu/vrboReviewsMenu/vrboReviewListings)“.

**Скрийншоти**

![010-account-pages-13-screenshot.png](./010-account-pages-13-screenshot.png)


## Казус 14: internalReviewsDashboard opens (/app/reviewsMenu/internalReviewsMenu/internalReviewsDashboard)

_Известен от пуска 2026-11-06 15:51 (същата версия) — не е отстранен._

**Какво се обърка**

```
Error: submenu node "internalReviewsMenu"

expect(locator).toBeVisible() failed

Locator: locator('.cc-submenu-slide-panel').locator('[data-test="internalReviewsMenu"]')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - submenu node "internalReviewsMenu" with timeout 30000ms
  - waiting for locator('.cc-submenu-slide-panel').locator('[data-test="internalReviewsMenu"]')
```

**Как да се възпроизведе**

1. Страница: https://hostify.bioseek.eu/app/airbnbReviewsMenu
2. Спек `tests/e2e/010-account-pages.spec.ts`, проверка „internalReviewsDashboard opens (/app/reviewsMenu/internalReviewsMenu/internalReviewsDashboard)“.

**Скрийншоти**

![010-account-pages-14-screenshot.png](./010-account-pages-14-screenshot.png)


## Казус 15: internalReviews opens (/app/reviewsMenu/internalReviewsMenu/internalReviews)

_Известен от пуска 2026-11-06 15:51 (същата версия) — не е отстранен._

**Какво се обърка**

```
Error: submenu node "internalReviewsMenu"

expect(locator).toBeVisible() failed

Locator: locator('.cc-submenu-slide-panel').locator('[data-test="internalReviewsMenu"]')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - submenu node "internalReviewsMenu" with timeout 30000ms
  - waiting for locator('.cc-submenu-slide-panel').locator('[data-test="internalReviewsMenu"]')
```

**Как да се възпроизведе**

1. Страница: https://hostify.bioseek.eu/app/airbnbReviewsMenu
2. Спек `tests/e2e/010-account-pages.spec.ts`, проверка „internalReviews opens (/app/reviewsMenu/internalReviewsMenu/internalReviews)“.

**Скрийншоти**

![010-account-pages-15-screenshot.png](./010-account-pages-15-screenshot.png)


## Казус 16: reviews opens (/app/reviewsMenu/reviews)

_Известен от пуска 2026-11-06 15:51 (същата версия) — не е отстранен._

**Какво се обърка**

```
Error: submenu node "reviews"

expect(locator).toBeVisible() failed

Locator: locator('.cc-submenu-slide-panel').locator('[data-test="reviews"]')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - submenu node "reviews" with timeout 30000ms
  - waiting for locator('.cc-submenu-slide-panel').locator('[data-test="reviews"]')
```

**Как да се възпроизведе**

1. Страница: https://hostify.bioseek.eu/app/airbnbReviewsMenu
2. Спек `tests/e2e/010-account-pages.spec.ts`, проверка „reviews opens (/app/reviewsMenu/reviews)“.

**Скрийншоти**

![010-account-pages-16-_screenshot.png](./010-account-pages-16-_screenshot.png)


## Казус 17: pricingBasePrice opens (/app/pricing/pricingBasePrice)

_Известен от пуска 2026-11-06 15:51 (същата версия) — не е отстранен._

**Какво се обърка**

```
Error: the page shows no content

expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate
```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: PRICING › Base Price — https://hostify.bioseek.eu/app/pricing/pricingBasePrice
3. Спек `tests/e2e/010-account-pages.spec.ts`, проверка „pricingBasePrice opens (/app/pricing/pricingBasePrice)“.

**Скрийншоти**

![010-account-pages-17-_screenshot.png](./010-account-pages-17-_screenshot.png)


## Казус 18: pricingFees opens (/app/pricing/pricingFees)

_Известен от пуска 2026-11-06 15:51 (същата версия) — не е отстранен._

**Какво се обърка**

```
Error: the URL of "pricingFees"

expect(page).toHaveURL(expected) failed

Expected pattern: /\/app\/pricing\/pricingFees(\/|\?|$)/
Received string:  "https://hostify.bioseek.eu/app/pricing/feeTemplates?feeItemType=_or&feeItemType=fee"
Timeout: 45000ms

Call log:
  - the URL of "pricingFees" with timeout 45000ms
    48 × unexpected value "https://hostify.bioseek.eu/app/pricing/feeTemplates?feeItemType=_or&feeItemType=fee"

```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: PRICING › Fees — https://hostify.bioseek.eu/app/pricing/pricingFees
3. Спек `tests/e2e/010-account-pages.spec.ts`, проверка „pricingFees opens (/app/pricing/pricingFees)“.

**Скрийншоти**

![010-account-pages-18-_screenshot.png](./010-account-pages-18-_screenshot.png)


## Казус 19: pricingTaxes opens (/app/pricing/pricingTaxes)

_Известен от пуска 2026-11-06 15:51 (същата версия) — не е отстранен._

**Какво се обърка**

```
Error: the URL of "pricingTaxes"

expect(page).toHaveURL(expected) failed

Expected pattern: /\/app\/pricing\/pricingTaxes(\/|\?|$)/
Received string:  "https://hostify.bioseek.eu/app/pricing/feeTemplates?feeItemType=_or&feeItemType=tax"
Timeout: 45000ms

Call log:
  - the URL of "pricingTaxes" with timeout 45000ms
    48 × unexpected value "https://hostify.bioseek.eu/app/pricing/feeTemplates?feeItemType=_or&feeItemType=tax"

```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: PRICING › Taxes — https://hostify.bioseek.eu/app/pricing/pricingTaxes
3. Спек `tests/e2e/010-account-pages.spec.ts`, проверка „pricingTaxes opens (/app/pricing/pricingTaxes)“.

**Скрийншоти**

![010-account-pages-19-_screenshot.png](./010-account-pages-19-_screenshot.png)


## Казус 20: pricingExtras opens (/app/pricing/pricingExtras)

_Известен от пуска 2026-11-06 15:51 (същата версия) — не е отстранен._

**Какво се обърка**

```
Error: the URL of "pricingExtras"

expect(page).toHaveURL(expected) failed

Expected pattern: /\/app\/pricing\/pricingExtras(\/|\?|$)/
Received string:  "https://hostify.bioseek.eu/app/pricing/feeTemplates?feeItemType=_or&feeItemType=extra"
Timeout: 45000ms

Call log:
  - the URL of "pricingExtras" with timeout 45000ms
    48 × unexpected value "https://hostify.bioseek.eu/app/pricing/feeTemplates?feeItemType=_or&feeItemType=extra"

```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: PRICING › Extras — https://hostify.bioseek.eu/app/pricing/pricingExtras
3. Спек `tests/e2e/010-account-pages.spec.ts`, проверка „pricingExtras opens (/app/pricing/pricingExtras)“.

**Скрийншоти**

![010-account-pages-20-_screenshot.png](./010-account-pages-20-_screenshot.png)


## Казус 21: pricingCosts opens (/app/pricing/pricingCosts)

_Известен от пуска 2026-11-06 15:51 (същата версия) — не е отстранен._

**Какво се обърка**

```
Error: the URL of "pricingCosts"

expect(page).toHaveURL(expected) failed

Expected pattern: /\/app\/pricing\/pricingCosts(\/|\?|$)/
Received string:  "https://hostify.bioseek.eu/app/pricing/feeTemplates?feeItemType=_or&feeItemType=cost"
Timeout: 45000ms

Call log:
  - the URL of "pricingCosts" with timeout 45000ms
    47 × unexpected value "https://hostify.bioseek.eu/app/pricing/feeTemplates?feeItemType=_or&feeItemType=cost"

```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: PRICING › Costs — https://hostify.bioseek.eu/app/pricing/pricingCosts
3. Спек `tests/e2e/010-account-pages.spec.ts`, проверка „pricingCosts opens (/app/pricing/pricingCosts)“.

**Скрийншоти**

![010-account-pages-21-_screenshot.png](./010-account-pages-21-_screenshot.png)


## Казус 22: pricingPromotions opens (/app/pricing/pricingPromotions)

_Известен от пуска 2026-11-06 15:51 (същата версия) — не е отстранен._

**Какво се обърка**

```
Error: submenu node "pricingPromotions"

expect(locator).toBeVisible() failed

Locator: locator('.cc-submenu-slide-panel').locator('[data-test="pricingPromotions"]')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - submenu node "pricingPromotions" with timeout 30000ms
  - waiting for locator('.cc-submenu-slide-panel').locator('[data-test="pricingPromotions"]')
```

**Как да се възпроизведе**

1. Страница: https://hostify.bioseek.eu/app/pricing/feeTemplates?feeItemType=_or&feeItemType=accommodation
2. Спек `tests/e2e/010-account-pages.spec.ts`, проверка „pricingPromotions opens (/app/pricing/pricingPromotions)“.

**Скрийншоти**

![010-account-pages-22-_screenshot.png](./010-account-pages-22-_screenshot.png)


## Казус 23: vendorContracts opens (/app/ourFeatures/ownersSettings/vendorContracts)

_Нов в този пуск._

**Какво се обърка**

```
TimeoutError: locator.click: Timeout 20000ms exceeded.
Call log:
  - waiting for locator('.cc-submenu-slide-panel').locator('[data-test="vendorContracts"]')
    - locator resolved to <a class="cc-submenu-item" data-test="vendorContracts" href="/app/ourFeatures/ownersSettings/vendorContracts">…</a>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div id="_r_14_" role="tooltip" class="ant-tooltip-container">Other features</div> from <div>…</div> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
```

**Как да се възпроизведе**

1. Страница: https://hostify.bioseek.eu/app/ourFeatures/ownersSettings/printTemplates
2. Спек `tests/e2e/010-account-pages.spec.ts`, проверка „vendorContracts opens (/app/ourFeatures/ownersSettings/vendorContracts)“.

**Скрийншоти**

![010-account-pages-23-_screenshot.png](./010-account-pages-23-_screenshot.png)


## Казус 24: settingsFees opens (/app/settings/settingsFees)

_Известен от пуска 2026-11-06 15:51 (същата версия) — не е отстранен._

**Какво се обърка**

```
Error: the URL of "settingsFees"

expect(page).toHaveURL(expected) failed

Expected pattern: /\/app\/settings\/settingsFees(\/|\?|$)/
Received string:  "https://hostify.bioseek.eu/app/settings/feeItems?feeItemType=_or&feeItemType=fee"
Timeout: 45000ms

Call log:
  - the URL of "settingsFees" with timeout 45000ms
    47 × unexpected value "https://hostify.bioseek.eu/app/settings/feeItems?feeItemType=_or&feeItemType=fee"

```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: SETTINGS › Fees — https://hostify.bioseek.eu/app/settings/settingsFees
3. Спек `tests/e2e/010-account-pages.spec.ts`, проверка „settingsFees opens (/app/settings/settingsFees)“.

**Скрийншоти**

![010-account-pages-24-_screenshot.png](./010-account-pages-24-_screenshot.png)


## Казус 25: settingsExtras opens (/app/settings/settingsExtras)

_Известен от пуска 2026-11-06 15:51 (същата версия) — не е отстранен._

**Какво се обърка**

```
Error: the URL of "settingsExtras"

expect(page).toHaveURL(expected) failed

Expected pattern: /\/app\/settings\/settingsExtras(\/|\?|$)/
Received string:  "https://hostify.bioseek.eu/app/settings/feeItems?feeItemType=_or&feeItemType=extra"
Timeout: 45000ms

Call log:
  - the URL of "settingsExtras" with timeout 45000ms
    47 × unexpected value "https://hostify.bioseek.eu/app/settings/feeItems?feeItemType=_or&feeItemType=extra"

```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: SETTINGS › Extras — https://hostify.bioseek.eu/app/settings/settingsExtras
3. Спек `tests/e2e/010-account-pages.spec.ts`, проверка „settingsExtras opens (/app/settings/settingsExtras)“.

**Скрийншоти**

![010-account-pages-25-_screenshot.png](./010-account-pages-25-_screenshot.png)


## Казус 26: settingsTaxes opens (/app/settings/settingsTaxes)

_Известен от пуска 2026-11-06 15:51 (същата версия) — не е отстранен._

**Какво се обърка**

```
Error: the URL of "settingsTaxes"

expect(page).toHaveURL(expected) failed

Expected pattern: /\/app\/settings\/settingsTaxes(\/|\?|$)/
Received string:  "https://hostify.bioseek.eu/app/settings/feeItems?feeItemType=_or&feeItemType=tax"
Timeout: 45000ms

Call log:
  - the URL of "settingsTaxes" with timeout 45000ms
    47 × unexpected value "https://hostify.bioseek.eu/app/settings/feeItems?feeItemType=_or&feeItemType=tax"

```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: SETTINGS › Taxes — https://hostify.bioseek.eu/app/settings/settingsTaxes
3. Спек `tests/e2e/010-account-pages.spec.ts`, проверка „settingsTaxes opens (/app/settings/settingsTaxes)“.

**Скрийншоти**

![010-account-pages-26-_screenshot.png](./010-account-pages-26-_screenshot.png)


## Казус 27: settingsCosts opens (/app/settings/settingsCosts)

_Известен от пуска 2026-11-06 15:51 (същата версия) — не е отстранен._

**Какво се обърка**

```
Error: the URL of "settingsCosts"

expect(page).toHaveURL(expected) failed

Expected pattern: /\/app\/settings\/settingsCosts(\/|\?|$)/
Received string:  "https://hostify.bioseek.eu/app/settings/feeItems?feeItemType=_or&feeItemType=cost"
Timeout: 45000ms

Call log:
  - the URL of "settingsCosts" with timeout 45000ms
    47 × unexpected value "https://hostify.bioseek.eu/app/settings/feeItems?feeItemType=_or&feeItemType=cost"

```

**Как да се възпроизведе**

1. Влез в https://hostify.bioseek.eu/app/ като администратор на акаунта (qa.admin@hostify-qa.test).
2. Меню: SETTINGS › Costs — https://hostify.bioseek.eu/app/settings/settingsCosts
3. Спек `tests/e2e/010-account-pages.spec.ts`, проверка „settingsCosts opens (/app/settings/settingsCosts)“.

**Скрийншоти**

![010-account-pages-27-_screenshot.png](./010-account-pages-27-_screenshot.png)


---

Какво проверява спекът: 010 — every page of the ACCOUNT menu opens for the account administrator of the QA account.
