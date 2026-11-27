---
title: 1.0.37: създава ли нов собственик компания (акаунт) извън QA Automation, и как да тестваме Owners без това?
date: 2026-11-27
status: new            # new | covered by <spec> (<date>) | fixed <date> | not a defect — <reason>
severity: high         # blocker | high | medium | low
---

## Where

Owners › Owners › „Create a new owner“ (и всичко, което иска собственик: Contracts, Statements, PnL, Owners › Payments); акаунт
QA Automation, версия 1.0.37.

## What I did

Само четене преди кода на група 4 (тестовете на Owners и Finance) — нито един собственик не е създаден:
- changelog 1.0.29: „every owner gets a company of its own … An owner's company opens on the free plan: it is never asked to choose
  a plan and never charged“; commit „an owner company is not billed — no Trial, no suspension, no charge“;
- записът owner има поле `ownerTenant` (и `portalUser`);
- changelog 1.0.31: фонова задача премества собственика в собствената му компания („the same company is reused, the listings move“).

## What I saw

Всичко сочи, че собственикът получава **отделна компания — акаунт в платформата, извън QA Automation**. Тестовете могат да създават
и трият записи само в QA акаунта, затова 312 (Owners), 314 (Contracts) и 315 (Statements, PnL) чакат.

## What I expected

Въпроси към програмиста:
1. Създава ли записът на собственик (формата Owners › Create) **веднага** нов акаунт / компания в платформата — или само когато
   собственикът има потребител, договор или друго?
2. Може ли собственик в QA акаунта да бъде **само запис**, без собствена компания (например флаг или настройка за QA акаунта),
   или да има тестова компания, която тестовете могат да създават и чистят сами?
3. Може ли да има **един постоянен тестов собственик с тестова компания**, създадени от програмиста, които тестовете само ползват
   (без да създават нови и без да ги трият)? Тогава тестовете на Contracts, Statements и PnL работят с тях.

## How often

always
