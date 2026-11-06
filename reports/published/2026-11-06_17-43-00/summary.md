# QA run 2026-11-06_17-43-00

- Application: https://hostify.bioseek.eu — version **1.0.6**
- Started: 2026-11-06T15:43:03.306Z, finished: 2026-11-06T16:15:50.119Z
- Result: **failed** — 72 passed, 20 failed, 120 skipped of 212

## Failures

### 010 010-account-pages.spec.ts › 010 account pages › reporting › reportingHousekeeping opens (/app/reporting/reportingHousekeeping)

**What went wrong**

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

**How to reproduce**

1. Sign in at https://hostify.bioseek.eu/app/ as the account's admin (qa.admin@hostify-qa.test).
2. Menu: REPORTING › Housekeeping — https://hostify.bioseek.eu/app/reporting/reportingHousekeeping
3. Spec `tests/e2e/010-account-pages.spec.ts`: reportingHousekeeping opens (/app/reporting/reportingHousekeeping)

**The spec**: 010 — every page of the ACCOUNT menu opens for the account administrator of the QA account.

**Screenshots**

- `010_reporting_reportingHousekeeping_opens_app_reporting_reportingHousekeeping___screenshot.png`

- file: `tests/e2e/010-account-pages.spec.ts`, status: failed (47 s)

### 010 010-account-pages.spec.ts › 010 account pages › reporting › reportingReviews opens (/app/reporting/reportingReviews)

**What went wrong**

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

**How to reproduce**

1. Sign in at https://hostify.bioseek.eu/app/ as the account's admin (qa.admin@hostify-qa.test).
2. Menu: REPORTING › Reviews — https://hostify.bioseek.eu/app/reporting/reportingReviews
3. Spec `tests/e2e/010-account-pages.spec.ts`: reportingReviews opens (/app/reporting/reportingReviews)

**The spec**: 010 — every page of the ACCOUNT menu opens for the account administrator of the QA account.

**Screenshots**

- `010_reporting_reportingReviews_opens_app_reporting_reportingReviews___screenshot.png`

- file: `tests/e2e/010-account-pages.spec.ts`, status: failed (47 s)

### 010 010-account-pages.spec.ts › 010 account pages › reporting › bookingOptimizer opens (/app/reporting/bookingOptimizer)

**What went wrong**

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

**How to reproduce**

1. Page: https://hostify.bioseek.eu/app/reporting/reportingOverview
2. Spec `tests/e2e/010-account-pages.spec.ts`: bookingOptimizer opens (/app/reporting/bookingOptimizer)

**The spec**: 010 — every page of the ACCOUNT menu opens for the account administrator of the QA account.

**Screenshots**

- `010_reporting_bookingOptimizer_opens_app_reporting_bookingOptimizer___screenshot.png`

- file: `tests/e2e/010-account-pages.spec.ts`, status: failed (54 s)

### 010 010-account-pages.spec.ts › 010 account pages › reviewsMenu › airbnbReviewsMenu › airbnbReviewsDashboard opens (/app/reviewsMenu/airbnbReviewsMenu/airbnbReviewsDashboard)

**What went wrong**

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

**How to reproduce**

1. Page: https://hostify.bioseek.eu/app/airbnbReviewsMenu
2. Spec `tests/e2e/010-account-pages.spec.ts`: airbnbReviewsDashboard opens (/app/reviewsMenu/airbnbReviewsMenu/airbnbReviewsDashboard)

**The spec**: 010 — every page of the ACCOUNT menu opens for the account administrator of the QA account.

**Screenshots**

- `010_reviewsMenu_airbnbReviewsMenu_airbnbReviewsDashboard_opens_app_reviewsMenu_airbn__screenshot.png`

- file: `tests/e2e/010-account-pages.spec.ts`, status: failed (71 s)

### 010 010-account-pages.spec.ts › 010 account pages › reviewsMenu › airbnbReviewsMenu › airbnbReviews opens (/app/reviewsMenu/airbnbReviewsMenu/airbnbReviews)

**What went wrong**

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

**How to reproduce**

1. Page: https://hostify.bioseek.eu/app/airbnbReviewsMenu
2. Spec `tests/e2e/010-account-pages.spec.ts`: airbnbReviews opens (/app/reviewsMenu/airbnbReviewsMenu/airbnbReviews)

**The spec**: 010 — every page of the ACCOUNT menu opens for the account administrator of the QA account.

**Screenshots**

- `010_reviewsMenu_airbnbReviewsMenu_airbnbReviews_opens_app_reviewsMenu_airbnbReviewsM__screenshot.png`

- file: `tests/e2e/010-account-pages.spec.ts`, status: failed (74 s)

### 010 010-account-pages.spec.ts › 010 account pages › reviewsMenu › airbnbReviewsMenu › airbnbReviewListings opens (/app/reviewsMenu/airbnbReviewsMenu/airbnbReviewListings)

**What went wrong**

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

**How to reproduce**

1. Page: https://hostify.bioseek.eu/app/airbnbReviewsMenu
2. Spec `tests/e2e/010-account-pages.spec.ts`: airbnbReviewListings opens (/app/reviewsMenu/airbnbReviewsMenu/airbnbReviewListings)

**The spec**: 010 — every page of the ACCOUNT menu opens for the account administrator of the QA account.

**Screenshots**

- `010_reviewsMenu_airbnbReviewsMenu_airbnbReviewListings_opens_app_reviewsMenu_airbnbR__screenshot.png`

- file: `tests/e2e/010-account-pages.spec.ts`, status: failed (71 s)

### 010 010-account-pages.spec.ts › 010 account pages › reviewsMenu › airbnbReviewsMenu › airbnbTripIssues opens (/app/reviewsMenu/airbnbReviewsMenu/airbnbTripIssues)

**What went wrong**

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

**How to reproduce**

1. Page: https://hostify.bioseek.eu/app/airbnbReviewsMenu
2. Spec `tests/e2e/010-account-pages.spec.ts`: airbnbTripIssues opens (/app/reviewsMenu/airbnbReviewsMenu/airbnbTripIssues)

**The spec**: 010 — every page of the ACCOUNT menu opens for the account administrator of the QA account.

**Screenshots**

- `010_reviewsMenu_airbnbReviewsMenu_airbnbTripIssues_opens_app_reviewsMenu_airbnbRevie__screenshot.png`

- file: `tests/e2e/010-account-pages.spec.ts`, status: failed (71 s)

### 010 010-account-pages.spec.ts › 010 account pages › reviewsMenu › bookingComReviewsMenu › bookingComReviewsDashboard opens (/app/reviewsMenu/bookingComReviewsMenu/bookingComReviewsDashboard)

**What went wrong**

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

**How to reproduce**

1. Page: https://hostify.bioseek.eu/app/airbnbReviewsMenu
2. Spec `tests/e2e/010-account-pages.spec.ts`: bookingComReviewsDashboard opens (/app/reviewsMenu/bookingComReviewsMenu/bookingComReviewsDashboard)

**The spec**: 010 — every page of the ACCOUNT menu opens for the account administrator of the QA account.

**Screenshots**

- `010_reviewsMenu_bookingComReviewsMenu_bookingComReviewsDashboard_opens_app_reviewsMe__screenshot.png`

- file: `tests/e2e/010-account-pages.spec.ts`, status: failed (73 s)

### 010 010-account-pages.spec.ts › 010 account pages › reviewsMenu › bookingComReviewsMenu › bookingComReviews opens (/app/reviewsMenu/bookingComReviewsMenu/bookingComReviews)

**What went wrong**

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

**How to reproduce**

1. Page: https://hostify.bioseek.eu/app/airbnbReviewsMenu
2. Spec `tests/e2e/010-account-pages.spec.ts`: bookingComReviews opens (/app/reviewsMenu/bookingComReviewsMenu/bookingComReviews)

**The spec**: 010 — every page of the ACCOUNT menu opens for the account administrator of the QA account.

**Screenshots**

- `010_reviewsMenu_bookingComReviewsMenu_bookingComReviews_opens_app_reviewsMenu_bookin__screenshot.png`

- file: `tests/e2e/010-account-pages.spec.ts`, status: failed (72 s)

### 010 010-account-pages.spec.ts › 010 account pages › reviewsMenu › bookingComReviewsMenu › bookingComReviewListings opens (/app/reviewsMenu/bookingComReviewsMenu/bookingComReviewListings)

**What went wrong**

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

**How to reproduce**

1. Page: https://hostify.bioseek.eu/app/airbnbReviewsMenu
2. Spec `tests/e2e/010-account-pages.spec.ts`: bookingComReviewListings opens (/app/reviewsMenu/bookingComReviewsMenu/bookingComReviewListings)

**The spec**: 010 — every page of the ACCOUNT menu opens for the account administrator of the QA account.

**Screenshots**

- `010_reviewsMenu_bookingComReviewsMenu_bookingComReviewListings_opens_app_reviewsMenu__screenshot.png`

- file: `tests/e2e/010-account-pages.spec.ts`, status: failed (71 s)

### 010 010-account-pages.spec.ts › 010 account pages › reviewsMenu › vrboReviewsMenu › vrboReviewsDashboard opens (/app/reviewsMenu/vrboReviewsMenu/vrboReviewsDashboard)

**What went wrong**

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

**How to reproduce**

1. Page: https://hostify.bioseek.eu/app/airbnbReviewsMenu
2. Spec `tests/e2e/010-account-pages.spec.ts`: vrboReviewsDashboard opens (/app/reviewsMenu/vrboReviewsMenu/vrboReviewsDashboard)

**The spec**: 010 — every page of the ACCOUNT menu opens for the account administrator of the QA account.

**Screenshots**

- `010_reviewsMenu_vrboReviewsMenu_vrboReviewsDashboard_opens_app_reviewsMenu_vrboRevie__screenshot.png`

- file: `tests/e2e/010-account-pages.spec.ts`, status: failed (73 s)

### 010 010-account-pages.spec.ts › 010 account pages › reviewsMenu › vrboReviewsMenu › vrboReviews opens (/app/reviewsMenu/vrboReviewsMenu/vrboReviews)

**What went wrong**

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

**How to reproduce**

1. Page: https://hostify.bioseek.eu/app/airbnbReviewsMenu
2. Spec `tests/e2e/010-account-pages.spec.ts`: vrboReviews opens (/app/reviewsMenu/vrboReviewsMenu/vrboReviews)

**The spec**: 010 — every page of the ACCOUNT menu opens for the account administrator of the QA account.

**Screenshots**

- `010_reviewsMenu_vrboReviewsMenu_vrboReviews_opens_app_reviewsMenu_vrboReviewsMenu_vr__screenshot.png`

- file: `tests/e2e/010-account-pages.spec.ts`, status: failed (73 s)

### 010 010-account-pages.spec.ts › 010 account pages › reviewsMenu › vrboReviewsMenu › vrboReviewListings opens (/app/reviewsMenu/vrboReviewsMenu/vrboReviewListings)

**What went wrong**

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

**How to reproduce**

1. Page: https://hostify.bioseek.eu/app/airbnbReviewsMenu
2. Spec `tests/e2e/010-account-pages.spec.ts`: vrboReviewListings opens (/app/reviewsMenu/vrboReviewsMenu/vrboReviewListings)

**The spec**: 010 — every page of the ACCOUNT menu opens for the account administrator of the QA account.

**Screenshots**

- `010_reviewsMenu_vrboReviewsMenu_vrboReviewListings_opens_app_reviewsMenu_vrboReviews__screenshot.png`

- file: `tests/e2e/010-account-pages.spec.ts`, status: failed (71 s)

### 010 010-account-pages.spec.ts › 010 account pages › reviewsMenu › internalReviewsMenu › internalReviewsDashboard opens (/app/reviewsMenu/internalReviewsMenu/internalReviewsDashboard)

**What went wrong**

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

**How to reproduce**

1. Page: https://hostify.bioseek.eu/app/airbnbReviewsMenu
2. Spec `tests/e2e/010-account-pages.spec.ts`: internalReviewsDashboard opens (/app/reviewsMenu/internalReviewsMenu/internalReviewsDashboard)

**The spec**: 010 — every page of the ACCOUNT menu opens for the account administrator of the QA account.

**Screenshots**

- `010_reviewsMenu_internalReviewsMenu_internalReviewsDashboard_opens_app_reviewsMenu_i__screenshot.png`

- file: `tests/e2e/010-account-pages.spec.ts`, status: failed (74 s)

### 010 010-account-pages.spec.ts › 010 account pages › reviewsMenu › internalReviewsMenu › internalReviews opens (/app/reviewsMenu/internalReviewsMenu/internalReviews)

**What went wrong**

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

**How to reproduce**

1. Page: https://hostify.bioseek.eu/app/airbnbReviewsMenu
2. Spec `tests/e2e/010-account-pages.spec.ts`: internalReviews opens (/app/reviewsMenu/internalReviewsMenu/internalReviews)

**The spec**: 010 — every page of the ACCOUNT menu opens for the account administrator of the QA account.

**Screenshots**

- `010_reviewsMenu_internalReviewsMenu_internalReviews_opens_app_reviewsMenu_internalRe__screenshot.png`

- file: `tests/e2e/010-account-pages.spec.ts`, status: failed (74 s)

### 010 010-account-pages.spec.ts › 010 account pages › reviewsMenu › reviews opens (/app/reviewsMenu/reviews)

**What went wrong**

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

**How to reproduce**

1. Page: https://hostify.bioseek.eu/app/airbnbReviewsMenu
2. Spec `tests/e2e/010-account-pages.spec.ts`: reviews opens (/app/reviewsMenu/reviews)

**The spec**: 010 — every page of the ACCOUNT menu opens for the account administrator of the QA account.

**Screenshots**

- `010_reviewsMenu_reviews_opens_app_reviewsMenu_reviews___screenshot.png`

- file: `tests/e2e/010-account-pages.spec.ts`, status: failed (51 s)

### 010 010-account-pages.spec.ts › 010 account pages › pricing › pricingBasePrice opens (/app/pricing/pricingBasePrice)

**What went wrong**

```
Error: the URL of "pricingBasePrice"

expect(page).toHaveURL(expected) failed

Expected pattern: /\/app\/pricing\/pricingBasePrice(\/|\?|$)/
Received string:  "https://hostify.bioseek.eu/app/pricing/feeTemplates?feeItemType=_or&feeItemType=accommodation"
Timeout: 45000ms

Call log:
  - the URL of "pricingBasePrice" with timeout 45000ms
    48 × unexpected value "https://hostify.bioseek.eu/app/pricing/feeTemplates?feeItemType=_or&feeItemType=accommodation"

```

**How to reproduce**

1. Sign in at https://hostify.bioseek.eu/app/ as the account's admin (qa.admin@hostify-qa.test).
2. Menu: PRICING › Base Price — https://hostify.bioseek.eu/app/pricing/pricingBasePrice
3. Spec `tests/e2e/010-account-pages.spec.ts`: pricingBasePrice opens (/app/pricing/pricingBasePrice)

**The spec**: 010 — every page of the ACCOUNT menu opens for the account administrator of the QA account.

**Screenshots**

- `010_pricing_pricingBasePrice_opens_app_pricing_pricingBasePrice___screenshot.png`

- file: `tests/e2e/010-account-pages.spec.ts`, status: failed (51 s)

### 010 010-account-pages.spec.ts › 010 account pages › pricing › pricingFees opens (/app/pricing/pricingFees)

**What went wrong**

```
Error: the URL of "pricingFees"

expect(page).toHaveURL(expected) failed

Expected pattern: /\/app\/pricing\/pricingFees(\/|\?|$)/
Received string:  "https://hostify.bioseek.eu/app/pricing/feeTemplates?feeItemType=_or&feeItemType=fee"
Timeout: 45000ms

Call log:
  - the URL of "pricingFees" with timeout 45000ms
    47 × unexpected value "https://hostify.bioseek.eu/app/pricing/feeTemplates?feeItemType=_or&feeItemType=fee"

```

**How to reproduce**

1. Sign in at https://hostify.bioseek.eu/app/ as the account's admin (qa.admin@hostify-qa.test).
2. Menu: PRICING › Fees — https://hostify.bioseek.eu/app/pricing/pricingFees
3. Spec `tests/e2e/010-account-pages.spec.ts`: pricingFees opens (/app/pricing/pricingFees)

**The spec**: 010 — every page of the ACCOUNT menu opens for the account administrator of the QA account.

**Screenshots**

- `010_pricing_pricingFees_opens_app_pricing_pricingFees___screenshot.png`

- file: `tests/e2e/010-account-pages.spec.ts`, status: failed (49 s)

### 010 010-account-pages.spec.ts › 010 account pages › pricing › pricingTaxes opens (/app/pricing/pricingTaxes)

**What went wrong**

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

**How to reproduce**

1. Sign in at https://hostify.bioseek.eu/app/ as the account's admin (qa.admin@hostify-qa.test).
2. Menu: PRICING › Taxes — https://hostify.bioseek.eu/app/pricing/pricingTaxes
3. Spec `tests/e2e/010-account-pages.spec.ts`: pricingTaxes opens (/app/pricing/pricingTaxes)

**The spec**: 010 — every page of the ACCOUNT menu opens for the account administrator of the QA account.

**Screenshots**

- `010_pricing_pricingTaxes_opens_app_pricing_pricingTaxes___screenshot.png`

- file: `tests/e2e/010-account-pages.spec.ts`, status: failed (51 s)

### 010 010-account-pages.spec.ts › 010 account pages › pricing › pricingExtras opens (/app/pricing/pricingExtras)

**What went wrong**

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-test="login-input-email"]')
Expected: visible
Timeout: 45000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 45000ms
  - waiting for locator('[data-test="login-input-email"]')

```

**How to reproduce**

1. Spec `tests/e2e/010-account-pages.spec.ts`: pricingExtras opens (/app/pricing/pricingExtras)

**The spec**: 010 — every page of the ACCOUNT menu opens for the account administrator of the QA account.

**Screenshots**

- `010_pricing_pricingExtras_opens_app_pricing_pricingExtras___screenshot.png`

- file: `tests/e2e/010-account-pages.spec.ts`, status: failed (0 s)

## Browser console

### 006 006-platform-admin-users.spec.ts › 006 platform admin › users › the Create user form opens, every tab is presentable, an empty Save is refused

- [console.warning] [AlertsMenuCount] TypeError: Failed to fetch @ /app/static/js/main.40ca681e.js

## Visual review (what the eye must judge)

### users

- [warn/empty-column] columns with no value in any row: Phone

### securityGroups

- [warn/empty-column] columns with no value in any row: #4

### hostifyCustomerPlans

- [warn/empty-column] columns with no value in any row: Minimum fee

### channels

- [warn/empty-column] columns with no value in any row: Expected initial sync hours, #11

### syncErrorGuides

- [warn/empty-column] columns with no value in any row: #6

### amenities

- [warn/empty-column] columns with no value in any row: #8

### propertyTypes

- [warn/empty-column] columns with no value in any row: #6

### userActions

- [warn/empty-column] columns with no value in any row: Staff, Account, Error message

### financeLogs

- [warn/empty-column] columns with no value in any row: #5

### staffSessions

- [warn/empty-column] columns with no value in any row: Reason

### engineJobRuns

- [warn/empty-column] columns with no value in any row: Correlation id

### paymentProcessorAccounts

- [warn/empty-column] columns with no value in any row: Account currency, Listings

### bookingApiClients

- [warn/empty-column] columns with no value in any row: Site type, Listings, Multi-Unit mode, Long Term mode, #15

### checkinFormTemplates

- [warn/empty-column] columns with no value in any row: Assigned Listings

### complianceSubmissions

- [warn/empty-column] columns with no value in any row: Code, Name, Date, Integration, Authority, Reservation, Listing, Guest name, Guest type, Movement, Status, Response, Sent date, Attempts, External reference, Resend required, #17

### platform-user-form

- [warn/empty-column] columns with no value in any row: Phone

### messageTemplates

- [warn/spinner] 1 spinner(s) still turning

### emailTemplates

- [warn/empty-column] columns with no value in any row: Event, Audience, Date created, #8

### taskTemplates

- [warn/empty-column] columns with no value in any row: Default cost

### taskNotificationSettings

- [warn/empty-column] columns with no value in any row: Specific users

### low-contrast: 455 unique texts on 72 surfaces

- "v 1.0.6" 4.16:1 (rgb(136, 136, 136) on rgb(40, 40, 40)) @ span.cc-sidebar-footer__version.cc-sidebar-footer__version--link — 72 surface(s)
- "Search everything…" 3.1:1 (rgb(141, 141, 166) on rgb(250, 250, 251)) @ span.aero-gs-trigger-text — 72 surface(s)
- "⌘K" 3.23:1 (rgb(141, 141, 166) on rgb(255, 255, 255)) @ span.aero-gs-kbd — 72 surface(s)
- "Export" 3.52:1 (rgb(22, 127, 252) on rgb(245, 245, 245)) @ div.ant-space-item — 52 surface(s)
- "Customize view" 3.52:1 (rgb(22, 127, 252) on rgb(245, 245, 245)) @ span — 46 surface(s)
- "Name" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 32 surface(s)
- "0 / 5" 3.31:1 (rgba(0, 0, 0, 0.45) on rgb(245, 245, 245)) @ span.cnt — 32 surface(s)
- "in this view" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ div.sum-sub — 17 surface(s)
- "SPLIT" 3.45:1 (rgb(22, 127, 252) on rgb(230, 245, 255)) @ span.agg-tag — 17 surface(s)
- "App settings" 3.72:1 (rgb(136, 136, 136) on rgb(48, 48, 48)) @ span.cc-submenu-slide-panel__title — 15 surface(s)
- "No rows in this slice" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ div.blocked-note — 13 surface(s)
- "Tasks" 3.72:1 (rgb(136, 136, 136) on rgb(48, 48, 48)) @ span.cc-submenu-slide-panel__title — 11 surface(s)
- "Billing" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ a — 9 surface(s)
- "Date created" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 9 surface(s)
- "By StatusSPLIT" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ div.sum-label — 9 surface(s)
- "Account" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 8 surface(s)
- "Apps" 3.72:1 (rgb(136, 136, 136) on rgb(48, 48, 48)) @ span.cc-submenu-slide-panel__title — 8 surface(s)
- "Logs" 3.72:1 (rgb(136, 136, 136) on rgb(48, 48, 48)) @ span.cc-submenu-slide-panel__title — 7 surface(s)
- "Inbox" 3.72:1 (rgb(136, 136, 136) on rgb(48, 48, 48)) @ span.cc-submenu-slide-panel__title — 7 surface(s)
- "SUM" 3.45:1 (rgb(22, 127, 252) on rgb(230, 245, 255)) @ span.agg-tag — 7 surface(s)
- "Listings" 3.72:1 (rgb(136, 136, 136) on rgb(48, 48, 48)) @ span.cc-submenu-slide-panel__title — 7 surface(s)
- "Active" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 6 surface(s)
- "Reporting" 3.72:1 (rgb(136, 136, 136) on rgb(48, 48, 48)) @ span.cc-submenu-slide-panel__title — 6 surface(s)
- "Code" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 5 surface(s)
- "Category" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 5 surface(s)
- "Platform Admin" 3.72:1 (rgb(136, 136, 136) on rgb(48, 48, 48)) @ span.cc-submenu-slide-panel__title — 4 surface(s)
- "Channel" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 4 surface(s)
- "Listing" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 4 surface(s)
- "Status" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 4 surface(s)
- "No data" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ div.ant-empty-description — 4 surface(s)
- "Clear all" 3.36:1 (rgb(140, 140, 140) on rgb(255, 255, 255)) @ [data-test=grid-clear-filters] span — 3 surface(s): tenants, users, platform-user-form
- "Save as" 3.84:1 (rgb(255, 255, 255) on rgb(22, 127, 252)) @ span — 3 surface(s): tenants, users, platform-user-form
- "Type" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 3 surface(s): hostifyPlans, housekeepingBoard, taskTemplates
- "Channels" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 3 surface(s): amenities, taskNotificationSettings, listingPolicies
- "Sort order" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 3 surface(s): propertyTypes, inboxTags, listingBuildings
- "Mode" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 3 surface(s): staffSessions, paymentProcessorAccounts, complianceConnections
- "Event" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 3 surface(s): emailTemplates, emailLogs, taskNotificationSettings
- "Default" 2.76:1 (rgb(212, 136, 6) on rgb(255, 251, 230)) @ span — 3 surface(s): taskDashboard, reportingOverview, inboxReports
- "Assistant" 3.6:1 (rgb(60, 144, 180) on rgb(255, 255, 255)) @ [data-test=assistant-panel] span — 3 surface(s): myTasks, listingFaqs, pivotGrid
- "Reservations" 3.72:1 (rgb(136, 136, 136) on rgb(48, 48, 48)) @ span.cc-submenu-slide-panel__title — 3 surface(s): reservations, reservationAlterations, reservationImports
- "Dashboard" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ a — 2 surface(s): platformDashboard, dashboards
- "Users" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ a — 2 surface(s): users, platform-user-form
- "People who can sign in, with their roles and statu" 3.36:1 (rgb(140, 140, 140) on rgb(255, 255, 255)) @ span.navigator-description — 2 surface(s): users, platform-user-form
- "User" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ div.sum-label — 2 surface(s): users, platform-user-form
- "By User statusSPLIT" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ div.sum-label — 2 surface(s): users, platform-user-form
- "By Listing scope modeSPLIT" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ div.sum-label — 2 surface(s): users, platform-user-form
- "Create a new user" 3.84:1 (rgb(255, 255, 255) on rgb(22, 127, 252)) @ [data-test=grid-create] span — 2 surface(s): users, platform-user-form
- "Plan" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 2 surface(s): hostifyCustomerPlans, hostifyListingPlans
- "Kind" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 2 surface(s): hostifyBillingItems, backgroundJobs
- "Country" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 2 surface(s): hostifyBillingProfiles, complianceConnections
- "System" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 2 surface(s): amenities, emailTemplates
- "Staff" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 2 surface(s): userActions, staffSessions
- "Listings" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 2 surface(s): paymentProcessorAccounts, channelHealth
- "No data for this selection yet" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ span.ant-typography.ant-typography-secondary — 2 surface(s): dashboards, inboxReports
- "No data in the selected period" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ span.ant-typography.ant-typography-secondary — 2 surface(s): dashboards, inboxReports
- "Subject" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 2 surface(s): emailTemplates, emailLogs
- "City" 1.83:1 (rgba(0, 0, 0, 0.25) on rgb(255, 255, 255)) @ [data-test=mc-city] div.ant-select-placeholder — 2 surface(s): multiCalendar, reportingOverview
- "Tag" 1.83:1 (rgba(0, 0, 0, 0.25) on rgb(255, 255, 255)) @ [data-test=mc-tag] div.ant-select-placeholder — 2 surface(s): multiCalendar, reportingOverview
- "CostSUM" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ div.sum-label — 2 surface(s): tasks, taskExpenses
- "Overdue tasks" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ [data-test=task-overdue-tile] div.ant-statistic-title — 2 surface(s): housekeepingBoard, taskDashboard
- … 395 more (summary.json)

### cut-text: 17 unique texts on 17 surfaces

- "User status" @ span.ant-table-column-title — 2 surface(s): users, platform-user-form
- "Fee type" @ span.ant-table-column-title — 1 surface(s): hostifyBillingItems
- "Expected initial sync hours" @ span.ant-table-column-title — 1 surface(s): channels
- "Webhook healthy" @ span.ant-table-column-title — 1 surface(s): paymentProcessorAccounts
- "Multi-Unit mode" @ span.ant-table-column-title — 1 surface(s): bookingApiClients
- "Guest type" @ span.ant-table-column-title — 1 surface(s): complianceSubmissions
- "Guest language" @ span.ant-table-column-title — 1 surface(s): inboxAiRuns
- "Tue" @ [data-test=mc-grid] div.mc-day-name — 1 surface(s): multiCalendar
- "Cost" @ [data-test=housekeeping-table] th.ant-table-cell — 1 surface(s): housekeepingBoard
- "Date created" @ span.ant-table-column-title — 1 surface(s): defaultAssignments
- "Active" @ span.ant-table-column-title — 1 surface(s): taskNotificationSettings
- "Yes" @ span.ant-tag.ant-tag-filled — 1 surface(s): taskNotificationSettings
- "Past reservations" @ span.cv-tab-label — 1 surface(s): reservations
- "Original check out" @ span.ant-table-column-title — 1 surface(s): reservationAlterations
- "Status changed by" @ span.ant-table-column-title — 1 surface(s): listingUnits
- "Calendar rules warning" @ th.ant-table-cell.rulesWarning — 1 surface(s): listingLinks
- "Reservations count" @ span.ant-table-column-title — 1 surface(s): guests

## Every test

| № | Test | Status | s | Console | Findings |
|---|---|---|---|---|---|
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformDashboard opens (/app/platformDashboard) | passed | 2 | 0 | 15 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformAdmin › tenants opens (/app/platformAdmin/tenants) | passed | 4 | 0 | 15 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformAdmin › users opens (/app/platformAdmin/users) | passed | 3 | 0 | 18 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformAdmin › securityGroups opens (/app/platformAdmin/securityGroups) | passed | 5 | 0 | 16 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformSettings › cityNightsLimits opens (/app/platformSettings/cityNightsLimits) | passed | 4 | 0 | 15 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformSettings › revenueFormulas opens (/app/platformSettings/revenueFormulas) | passed | 4 | 0 | 15 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformSettings › platformBilling › activeRuListings opens (/app/platformSettings/platformBilling/activeRuListings) | passed | 24 | 0 | 10 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformSettings › platformBilling › hostifyBills opens (/app/platformSettings/platformBilling/hostifyBills) | passed | 5 | 0 | 15 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformSettings › platformBilling › hostifyCustomerPlans opens (/app/platformSettings/platformBilling/hostifyCustomerPlans) | passed | 4 | 0 | 16 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformSettings › platformBilling › hostifyPlans opens (/app/platformSettings/platformBilling/hostifyPlans) | passed | 4 | 0 | 15 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformSettings › platformBilling › hostifyListingPlans opens (/app/platformSettings/platformBilling/hostifyListingPlans) | passed | 4 | 0 | 15 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformSettings › platformBilling › hostifyBillingRules opens (/app/platformSettings/platformBilling/hostifyBillingRules) | passed | 3 | 0 | 15 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformSettings › platformBilling › hostifyBillingItems opens (/app/platformSettings/platformBilling/hostifyBillingItems) | passed | 4 | 0 | 16 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformSettings › platformBilling › hostifyBillingProfiles opens (/app/platformSettings/platformBilling/hostifyBillingProfiles) | passed | 4 | 0 | 15 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformSettings › platformBilling › hostifyBillingSettingsList opens (/app/platformSettings/platformBilling/hostifyBillingSettingsList) | passed | 4 | 0 | 15 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformSettings › channels opens (/app/platformSettings/channels) | passed | 4 | 0 | 18 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformSettings › syncErrorGuides opens (/app/platformSettings/syncErrorGuides) | passed | 4 | 0 | 16 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformSettings › amenities opens (/app/platformSettings/amenities) | passed | 4 | 0 | 16 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformSettings › propertyTypes opens (/app/platformSettings/propertyTypes) | passed | 5 | 0 | 16 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformLogs › userActions opens (/app/platformLogs/userActions) | passed | 3 | 0 | 16 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformLogs › financeLogs opens (/app/platformLogs/financeLogs) | passed | 4 | 0 | 16 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformLogs › staffSessions opens (/app/platformLogs/staffSessions) | passed | 4 | 0 | 16 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformLogs › engineJobRuns opens (/app/platformLogs/engineJobRuns) | passed | 5 | 0 | 16 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformLogs › backgroundJobs opens (/app/platformLogs/backgroundJobs) | passed | 3 | 0 | 15 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformLogs › customerMigrations opens (/app/platformLogs/customerMigrations) | passed | 4 | 0 | 15 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › platformLogs › consoleActions opens (/app/platformLogs/consoleActions) | passed | 4 | 0 | 8 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › apps › appCenter opens (/app/apps/appCenter) | passed | 3 | 0 | 10 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › apps › partners opens (/app/apps/partners) | passed | 3 | 0 | 7 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › apps › paymentProcessorAccounts opens (/app/apps/paymentProcessorAccounts) | passed | 3 | 0 | 18 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › apps › bookingApiClients opens (/app/apps/bookingApiClients) | passed | 3 | 0 | 18 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › apps › ownerPortalRoles opens (/app/apps/ownerPortalRoles) | passed | 3 | 0 | 15 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › apps › checkinFormTemplates opens (/app/apps/checkinFormTemplates) | passed | 3 | 0 | 16 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › apps › complianceConnections opens (/app/apps/complianceConnections) | passed | 3 | 0 | 15 |
| 005 | 005-platform-pages.spec.ts › 005 platform pages › apps › complianceSubmissions opens (/app/apps/complianceSubmissions) | passed | 3 | 0 | 18 |
| 006 | 006-platform-admin-users.spec.ts › 006 platform admin › users › the Create user form opens, every tab is presentable, an empty Save is refused | passed | 28 | 1 | 18 |
| 010 | 010-account-pages.spec.ts › 010 account pages › dashboards opens (/app/dashboards) | passed | 4 | 0 | 15 |
| 010 | 010-account-pages.spec.ts › 010 account pages › inbox › unifiedInbox opens (/app/inbox/unifiedInbox) | passed | 3 | 0 | 9 |
| 010 | 010-account-pages.spec.ts › 010 account pages › inbox › inboxThreads opens (/app/inbox/inboxThreads) | passed | 3 | 0 | 15 |
| 010 | 010-account-pages.spec.ts › 010 account pages › inbox › inboxAiRuns opens (/app/inbox/inboxAiRuns) | passed | 4 | 0 | 17 |
| 010 | 010-account-pages.spec.ts › 010 account pages › inbox › messageTemplates opens (/app/inbox/messageTemplates) | passed | 3 | 0 | 16 |
| 010 | 010-account-pages.spec.ts › 010 account pages › inbox › emailTemplates opens (/app/inbox/emailTemplates) | passed | 5 | 0 | 16 |
| 010 | 010-account-pages.spec.ts › 010 account pages › inbox › emailLogs opens (/app/inbox/emailLogs) | passed | 4 | 0 | 15 |
| 010 | 010-account-pages.spec.ts › 010 account pages › inbox › inboxTags opens (/app/inbox/inboxTags) | passed | 4 | 0 | 15 |
| 010 | 010-account-pages.spec.ts › 010 account pages › multiCalendar opens (/app/multiCalendar) | passed | 2 | 0 | 16 |
| 010 | 010-account-pages.spec.ts › 010 account pages › operations › tasks opens (/app/operations/tasks) | passed | 3 | 0 | 15 |
| 010 | 010-account-pages.spec.ts › 010 account pages › operations › housekeepingBoard opens (/app/operations/housekeepingBoard) | passed | 2 | 0 | 16 |
| 010 | 010-account-pages.spec.ts › 010 account pages › operations › taskDashboard opens (/app/operations/taskDashboard) | passed | 4 | 0 | 15 |
| 010 | 010-account-pages.spec.ts › 010 account pages › operations › taskIssues opens (/app/operations/taskIssues) | passed | 4 | 0 | 15 |
| 010 | 010-account-pages.spec.ts › 010 account pages › operations › myTasks opens (/app/operations/myTasks) | passed | 2 | 0 | 11 |
| 010 | 010-account-pages.spec.ts › 010 account pages › operations › taskTemplates opens (/app/operations/taskTemplates) | passed | 4 | 0 | 16 |
| 010 | 010-account-pages.spec.ts › 010 account pages › operations › defaultAssignments opens (/app/operations/defaultAssignments) | passed | 4 | 0 | 17 |
| 010 | 010-account-pages.spec.ts › 010 account pages › operations › taskTeams opens (/app/operations/taskTeams) | passed | 4 | 0 | 15 |
| 010 | 010-account-pages.spec.ts › 010 account pages › operations › taskNotificationSettings opens (/app/operations/taskNotificationSettings) | passed | 5 | 0 | 25 |
| 010 | 010-account-pages.spec.ts › 010 account pages › operations › calendar opens (/app/operations/calendar) | passed | 4 | 0 | 15 |
| 010 | 010-account-pages.spec.ts › 010 account pages › operations › taskExpenses opens (/app/operations/taskExpenses) | passed | 4 | 0 | 15 |
| 010 | 010-account-pages.spec.ts › 010 account pages › reservationsMenu › reservations opens (/app/reservationsMenu/reservations) | passed | 3 | 0 | 16 |
| 010 | 010-account-pages.spec.ts › 010 account pages › reservationsMenu › reservationAlterations opens (/app/reservationsMenu/reservationAlterations) | passed | 3 | 0 | 16 |
| 010 | 010-account-pages.spec.ts › 010 account pages › reservationsMenu › reservationImports opens (/app/reservationsMenu/reservationImports) | passed | 4 | 0 | 15 |
| 010 | 010-account-pages.spec.ts › 010 account pages › listingsMenu › listings opens (/app/listingsMenu/listings) | passed | 4 | 0 | 15 |
| 010 | 010-account-pages.spec.ts › 010 account pages › listingsMenu › listingFaqs opens (/app/listingsMenu/listingFaqs) | passed | 2 | 0 | 15 |
| 010 | 010-account-pages.spec.ts › 010 account pages › listingsMenu › guidebookTemplates opens (/app/listingsMenu/guidebookTemplates) | passed | 4 | 0 | 15 |
| 010 | 010-account-pages.spec.ts › 010 account pages › listingsMenu › listingUnits opens (/app/listingsMenu/listingUnits) | passed | 4 | 0 | 17 |
| 010 | 010-account-pages.spec.ts › 010 account pages › listingsMenu › listingBuildings opens (/app/listingsMenu/listingBuildings) | passed | 4 | 0 | 15 |
| 010 | 010-account-pages.spec.ts › 010 account pages › listingsMenu › listingLinks opens (/app/listingsMenu/listingLinks) | passed | 5 | 0 | 16 |
| 010 | 010-account-pages.spec.ts › 010 account pages › listingsMenu › listingPolicies opens (/app/listingsMenu/listingPolicies) | passed | 3 | 0 | 15 |
| 010 | 010-account-pages.spec.ts › 010 account pages › guests opens (/app/guests) | passed | 2 | 0 | 17 |
| 010 | 010-account-pages.spec.ts › 010 account pages › reporting › reportingOverview opens (/app/reporting/reportingOverview) | passed | 3 | 0 | 15 |
| 010 | 010-account-pages.spec.ts › 010 account pages › reporting › pivotGrid opens (/app/reporting/pivotGrid) | passed | 3 | 0 | 12 |
| 010 | 010-account-pages.spec.ts › 010 account pages › reporting › inboxReports opens (/app/reporting/inboxReports) | passed | 4 | 0 | 15 |
| 010 | 010-account-pages.spec.ts › 010 account pages › reporting › reportingHousekeeping opens (/app/reporting/reportingHousekeeping) | failed | 47 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › reporting › channelHealth opens (/app/reporting/channelHealth) | passed | 5 | 0 | 15 |
| 010 | 010-account-pages.spec.ts › 010 account pages › reporting › reportingReviews opens (/app/reporting/reportingReviews) | failed | 47 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › reporting › bookingOptimizer opens (/app/reporting/bookingOptimizer) | failed | 54 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › reporting › guestCheckins opens (/app/reporting/guestCheckins) | passed | 7 | 0 | 15 |
| 010 | 010-account-pages.spec.ts › 010 account pages › reporting › checkinGuests opens (/app/reporting/checkinGuests) | passed | 3 | 0 | 6 |
| 010 | 010-account-pages.spec.ts › 010 account pages › reviewsMenu › airbnbReviewsMenu › airbnbReviewsDashboard opens (/app/reviewsMenu/airbnbReviewsMenu/airbnbReviewsDashboard) | failed | 71 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › reviewsMenu › airbnbReviewsMenu › airbnbReviews opens (/app/reviewsMenu/airbnbReviewsMenu/airbnbReviews) | failed | 74 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › reviewsMenu › airbnbReviewsMenu › airbnbReviewListings opens (/app/reviewsMenu/airbnbReviewsMenu/airbnbReviewListings) | failed | 71 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › reviewsMenu › airbnbReviewsMenu › airbnbTripIssues opens (/app/reviewsMenu/airbnbReviewsMenu/airbnbTripIssues) | failed | 71 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › reviewsMenu › bookingComReviewsMenu › bookingComReviewsDashboard opens (/app/reviewsMenu/bookingComReviewsMenu/bookingComReviewsDashboard) | failed | 73 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › reviewsMenu › bookingComReviewsMenu › bookingComReviews opens (/app/reviewsMenu/bookingComReviewsMenu/bookingComReviews) | failed | 72 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › reviewsMenu › bookingComReviewsMenu › bookingComReviewListings opens (/app/reviewsMenu/bookingComReviewsMenu/bookingComReviewListings) | failed | 71 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › reviewsMenu › vrboReviewsMenu › vrboReviewsDashboard opens (/app/reviewsMenu/vrboReviewsMenu/vrboReviewsDashboard) | failed | 73 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › reviewsMenu › vrboReviewsMenu › vrboReviews opens (/app/reviewsMenu/vrboReviewsMenu/vrboReviews) | failed | 73 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › reviewsMenu › vrboReviewsMenu › vrboReviewListings opens (/app/reviewsMenu/vrboReviewsMenu/vrboReviewListings) | failed | 71 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › reviewsMenu › internalReviewsMenu › internalReviewsDashboard opens (/app/reviewsMenu/internalReviewsMenu/internalReviewsDashboard) | failed | 74 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › reviewsMenu › internalReviewsMenu › internalReviews opens (/app/reviewsMenu/internalReviewsMenu/internalReviews) | failed | 74 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › reviewsMenu › reviews opens (/app/reviewsMenu/reviews) | failed | 51 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › pricing › pricingBasePrice opens (/app/pricing/pricingBasePrice) | failed | 51 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › pricing › pricingFees opens (/app/pricing/pricingFees) | failed | 49 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › pricing › pricingTaxes opens (/app/pricing/pricingTaxes) | failed | 51 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › pricing › pricingExtras opens (/app/pricing/pricingExtras) | failed | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › pricing › pricingCosts opens (/app/pricing/pricingCosts) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › pricing › pricingPromotions opens (/app/pricing/pricingPromotions) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › pricing › taxRules opens (/app/pricing/taxRules) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ownersMenu › ownerStatements opens (/app/ownersMenu/ownerStatements) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ownersMenu › ownerPayments opens (/app/ownersMenu/ownerPayments) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ownersMenu › owners opens (/app/ownersMenu/owners) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ownersMenu › ownerContracts opens (/app/ownersMenu/ownerContracts) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ownersMenu › ownerContractTemplates opens (/app/ownersMenu/ownerContractTemplates) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ownersMenu › ownerPnl opens (/app/ownersMenu/ownerPnl) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ownersMenu › generalLedger opens (/app/ownersMenu/generalLedger) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ownersMenu › ledgerAccounts opens (/app/ownersMenu/ledgerAccounts) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › finance › invoices opens (/app/finance/invoices) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › finance › expenses opens (/app/finance/expenses) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › finance › costCategories opens (/app/finance/costCategories) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › finance › paymentTransactions opens (/app/finance/paymentTransactions) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › automations › automationsHub opens (/app/automations/automationsHub) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › automations › autoMessageRules opens (/app/automations/autoMessageRules) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › automations › autoPaymentRules opens (/app/automations/autoPaymentRules) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › automations › autoPricingRules opens (/app/automations/autoPricingRules) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › automations › autoTaskRules opens (/app/automations/autoTaskRules) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › automations › autoInvoiceRules opens (/app/automations/autoInvoiceRules) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › automations › massMessages opens (/app/automations/massMessages) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › automations › automationRuns opens (/app/automations/automationRuns) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › channelManager › channelsHub opens (/app/channelManager/channelsHub) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › channelManager › channelAccounts opens (/app/channelManager/channelAccounts) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › channelManager › channelConnectWizard opens (/app/channelManager/channelConnectWizard) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › channelManager › channelListings opens (/app/channelManager/channelListings) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › channelManager › channelProperties opens (/app/channelManager/channelProperties) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › channelManager › channelRatePlans opens (/app/channelManager/channelRatePlans) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › channelManager › channelListingPromotions opens (/app/channelManager/channelListingPromotions) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › channelManager › airbnbOpportunities opens (/app/channelManager/airbnbOpportunities) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › channelManager › channelCommands opens (/app/channelManager/channelCommands) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › channelManager › channelInboundEvents opens (/app/channelManager/channelInboundEvents) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › apps › appCenter opens (/app/apps/appCenter) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › apps › paymentProcessorAccounts opens (/app/apps/paymentProcessorAccounts) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › apps › bookingApiClients opens (/app/apps/bookingApiClients) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › apps › apiKeys opens (/app/apps/apiKeys) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › apps › webhookSubscriptions opens (/app/apps/webhookSubscriptions) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › apps › webhookDeliveries opens (/app/apps/webhookDeliveries) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › apps › ownerPortalRoles opens (/app/apps/ownerPortalRoles) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › apps › checkinFormTemplates opens (/app/apps/checkinFormTemplates) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › apps › complianceConnections opens (/app/apps/complianceConnections) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › apps › complianceSubmissions opens (/app/apps/complianceSubmissions) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ourReporting › reportsOverview opens (/app/ourFeatures/ourReporting/reportsOverview) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ourReporting › reportRuns opens (/app/ourFeatures/ourReporting/reportRuns) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ourReporting › reportDefinitions opens (/app/ourFeatures/ourReporting/reportDefinitions) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ourReporting › reportCategories opens (/app/ourFeatures/ourReporting/reportCategories) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ourReporting › reservationNights opens (/app/ourFeatures/ourReporting/reservationNights) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ourReporting › kpiDefinitions opens (/app/ourFeatures/ourReporting/kpiDefinitions) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ourOwners › ownerStatementRuns opens (/app/ourFeatures/ourOwners/ownerStatementRuns) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ourOwners › sepaPayoutBatches opens (/app/ourFeatures/ourOwners/sepaPayoutBatches) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ourOwners › eInvoiceSubmissions opens (/app/ourFeatures/ourOwners/eInvoiceSubmissions) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ownersSettings › vendors opens (/app/ourFeatures/ownersSettings/vendors) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ownersSettings › printTemplates opens (/app/ourFeatures/ownersSettings/printTemplates) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ownersSettings › vendorContracts opens (/app/ourFeatures/ownersSettings/vendorContracts) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ownersSettings › fiscalSeriesList opens (/app/ourFeatures/ownersSettings/fiscalSeriesList) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ownersSettings › taxJurisdictions opens (/app/ourFeatures/ownersSettings/taxJurisdictions) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ownersSettings › costCategorySettings opens (/app/ourFeatures/ownersSettings/costCategorySettings) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ourFinance › creditCards opens (/app/ourFeatures/ourFinance/creditCards) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ourSettings › accountAccesses opens (/app/ourFeatures/ourSettings/accountAccesses) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ourSettings › brands opens (/app/ourFeatures/ourSettings/brands) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ourSettings › accountGenealogy opens (/app/ourFeatures/ourSettings/accountGenealogy) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ourSettings › inboxAiSettings opens (/app/ourFeatures/ourSettings/inboxAiSettings) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ourSettings › documents opens (/app/ourFeatures/ourSettings/documents) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ourSettings › documentCustomFields opens (/app/ourFeatures/ourSettings/documentCustomFields) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ourSettings › histories opens (/app/ourFeatures/ourSettings/histories) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ourSettings › engineHealth opens (/app/ourFeatures/ourSettings/engineHealth) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ourSettings › calUpdateLogs opens (/app/ourFeatures/ourSettings/calUpdateLogs) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ourSettings › changeAnnouncements opens (/app/ourFeatures/ourSettings/changeAnnouncements) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ourSettings › calendarService › calWarnings opens (/app/ourFeatures/ourSettings/calendarService/calWarnings) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ourSettings › calendarService › icalSubscriptions opens (/app/ourFeatures/ourSettings/calendarService/icalSubscriptions) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ourSettings › calendarService › icalExportFeeds opens (/app/ourFeatures/ourSettings/calendarService/icalExportFeeds) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ourSettings › calendarService › availabilityDependencies opens (/app/ourFeatures/ourSettings/calendarService/availabilityDependencies) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ourSettings › calendarService › pricingDependencies opens (/app/ourFeatures/ourSettings/calendarService/pricingDependencies) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ourSettings › calendarService › ratePlans opens (/app/ourFeatures/ourSettings/calendarService/ratePlans) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ourSettings › calendarService › calStretches opens (/app/ourFeatures/ourSettings/calendarService/calStretches) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ourSettings › calendarService › calReservations opens (/app/ourFeatures/ourSettings/calendarService/calReservations) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ourSettings › calendarService › deferredWrites opens (/app/ourFeatures/ourSettings/calendarService/deferredWrites) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ourSettings › calendarService › engineAlerts opens (/app/ourFeatures/ourSettings/calendarService/engineAlerts) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ourSettings › calendarService › dailyViews opens (/app/ourFeatures/ourSettings/calendarService/dailyViews) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ourSettings › calendarService › monthlyViews opens (/app/ourFeatures/ourSettings/calendarService/monthlyViews) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ourSettings › calendarService › websiteStatsList opens (/app/ourFeatures/ourSettings/calendarService/websiteStatsList) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ourSettings › calendarService › distributionPermissions opens (/app/ourFeatures/ourSettings/calendarService/distributionPermissions) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ourSettings › calendarService › icalBlocks opens (/app/ourFeatures/ourSettings/calendarService/icalBlocks) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › ourFeatures › ourSettings › codeGeneratorRules opens (/app/ourFeatures/ourSettings/codeGeneratorRules) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › customData › customRecords opens (/app/customData/customRecords) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › usage › userEvents opens (/app/usage/userEvents) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › usage › userEventRollups opens (/app/usage/userEventRollups) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › usage › userSessions opens (/app/usage/userSessions) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › settings › accountProfile opens (/app/settings/accountProfile) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › settings › reportingSettingsList opens (/app/settings/reportingSettingsList) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › settings › users opens (/app/settings/users) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › settings › workflowDefinitions opens (/app/settings/workflowDefinitions) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › settings › dataShape opens (/app/settings/dataShape) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › settings › securityGroups opens (/app/settings/securityGroups) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › settings › securitySettings opens (/app/settings/securitySettings) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › settings › companies opens (/app/settings/companies) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › settings › contacts opens (/app/settings/contacts) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › settings › reservationSources opens (/app/settings/reservationSources) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › settings › settingsFormulas opens (/app/settings/settingsFormulas) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › settings › savedReplies opens (/app/settings/savedReplies) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › settings › messagingSettings opens (/app/settings/messagingSettings) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › settings › transactionTags opens (/app/settings/transactionTags) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › settings › listingTags opens (/app/settings/listingTags) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › settings › customFields opens (/app/settings/customFields) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › settings › settingsFees opens (/app/settings/settingsFees) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › settings › settingsExtras opens (/app/settings/settingsExtras) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › settings › settingsTaxes opens (/app/settings/settingsTaxes) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › settings › vatRates opens (/app/settings/vatRates) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › settings › settingsCosts opens (/app/settings/settingsCosts) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › settings › feeItemSettings opens (/app/settings/feeItemSettings) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › settings › vatRateSettings opens (/app/settings/vatRateSettings) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › settings › paymentSchedules opens (/app/settings/paymentSchedules) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › settings › bookingSites opens (/app/settings/bookingSites) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › settings › listingGroups opens (/app/settings/listingGroups) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › settings › notificationSettings opens (/app/settings/notificationSettings) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › settings › syncActivities opens (/app/settings/syncActivities) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › settings › privacySettings opens (/app/settings/privacySettings) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › settings › accountBilling opens (/app/settings/accountBilling) | skipped | 0 | 0 | 0 |
| 010 | 010-account-pages.spec.ts › 010 account pages › settings › demoData opens (/app/settings/demoData) | skipped | 0 | 0 | 0 |
