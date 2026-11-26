---
title: 1.0.29: inventory/navigation.json се разминава с живото меню на QA акаунта — обновете inventory
date: 2026-11-26
status: new            # new | covered by <spec> (<date>) | fixed <date> | not a defect — <reason>
severity: medium       # blocker | high | medium | low
---

## Where

Лявото меню на администратора на акаунта „QA Automation“, версия 1.0.29, срещу `inventory/navigation.json`
(генериран 2026-11-26T07:24, commit a87ca68). **Водещо е живото меню** (решение на QA, 2026-11-26).

## What I did

1. Влязох като администратор на QA Automation (headless, само гледане, 2026-11-26 ~12:25).
2. Отворих всяка група на менюто и всяка вложена подгрупа (`Sidebar.menuIds()`), събрах всички `data-test` на менюто.
3. Сравних ги с всички страници на inventory с роля `admin` и без `noMenu`.

## What I saw

**В inventory, но ги няма в живото меню (15)** — 010 / 011 ги отварят по адрес и падат на тях при всеки пуск
(отказани QA-26…29, QA-35, QA-55…60, QA-65):

| Група | id | Адрес |
|---|---|---|
| Reporting | `bookingOptimizer` | /app/reporting/bookingOptimizer |
| Reviews | `airbnbReviewsMenu` (група) | /app/reviewsMenu/airbnbReviewsMenu |
| Reviews | `airbnbReviewsDashboard` | /app/reviewsMenu/airbnbReviewsMenu/airbnbReviewsDashboard |
| Reviews | `airbnbReviews` | /app/reviewsMenu/airbnbReviewsMenu/airbnbReviews |
| Reviews | `airbnbReviewListings` | /app/reviewsMenu/airbnbReviewsMenu/airbnbReviewListings |
| Reviews | `airbnbTripIssues` | /app/reviewsMenu/airbnbReviewsMenu/airbnbTripIssues |
| Reviews | `bookingComReviewsMenu` (група) | /app/reviewsMenu/bookingComReviewsMenu |
| Reviews | `bookingComReviewsDashboard` | /app/reviewsMenu/bookingComReviewsMenu/bookingComReviewsDashboard |
| Reviews | `bookingComReviews` | /app/reviewsMenu/bookingComReviewsMenu/bookingComReviews |
| Reviews | `bookingComReviewListings` | /app/reviewsMenu/bookingComReviewsMenu/bookingComReviewListings |
| Reviews | `vrboReviewsMenu` (група) | /app/reviewsMenu/vrboReviewsMenu |
| Reviews | `vrboReviewsDashboard` | /app/reviewsMenu/vrboReviewsMenu/vrboReviewsDashboard |
| Reviews | `vrboReviews` | /app/reviewsMenu/vrboReviewsMenu/vrboReviews |
| Reviews | `vrboReviewListings` | /app/reviewsMenu/vrboReviewsMenu/vrboReviewListings |
| Pricing | `pricingPromotions` | /app/pricing/pricingPromotions |

Живото меню на Reviews има само Internal: `internalReviewsMenu` › `internalReviewsDashboard`, `internalReviews`, и `reviews`.

**В живото меню, но не (или не така) в inventory:**

| id | Какво | В inventory |
|---|---|---|
| `alerts` | звънчето „Notifications“ в долната част на лентата | има го, но с `noMenu: true` — а то е в менюто |
| `navbarSupport`, `navbarCollapse` | „Support“ и бутонът за свиване на лентата | няма ги — части на лентата, не страници (тестовете ги прескачат, `MENU_CHROME`); за пълнота |

Всичко останало (178 страници в 18 групи) съвпада едно към едно.

## What I expected

`inventory/navigation.json` да описва живото меню: 15-те страници горе — махнати от inventory или отбелязани така, че
да не се очакват в менюто (`noMenu` / друг признак — ако са скрити нарочно, например докато каналите не са свързани,
кажете по какво условие се показват, за да го провери тестът); `alerts` — без `noMenu`. След това 010 / 011 спират да
падат на тях.

## How often

always — във всеки пуск от 1.0.6 насам (последно: веригата на 1.0.29, 2026-11-26 09:58).
