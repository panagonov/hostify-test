---
title: 1.0.29: четири форми за записи, които прави системата, нямат нито едно задължително поле — нарочно ли е?
date: 2026-11-26
status: new            # new | covered by <spec> (<date>) | fixed <date> | not a defect — <reason>
severity: low          # blocker | high | medium | low
---

## Where

Акаунт QA Automation, администратор, версия 1.0.29 — бутонът „Create a new …“ на:

| Страница | Адрес | Полета на формата |
|---|---|---|
| Inbox › Conversation quality | /app/inbox/conversationScores | Name, Inbox thread, Day, Score, Resolved, Accurate, Polite, Slow, Answered by, Listing, Reservation, Model |
| Operations › Check findings | /app/operations/checkFindings | Name, Check, Severity, Status, Record name, Listing, Reservation, Money at risk, Detail, Fix label, First / Last seen at, Resolved at, Dismiss note |
| Reporting › Listing benchmarks („Market comparison“) | /app/reporting/listingBenchmarks | Name, Listing, Period, Currency, From, Till, Computed, Occupancy %, ADR, RevPAR, Compared with, Area, Bedrooms compared, Market occupancy % / ADR / RevPAR |
| Other features › AI usage | /app/ourFeatures/…/aiUsages | Name, Day, Feature, Model, Calls, Failed, Input / Output tokens, Cost usd, Estimated, Cost unknown |

## What I did

1. Картата на формите (Стъпка 1, 2026-11-26, headless, само гледане): отворих формата, натиснах Save без нищо попълнено, после Cancel.
2. Всяка заявка за запис беше спряна в браузъра от режима „само гледане“ — нищо не е записано.

## What I saw

Нито едно поле не е задължително (няма звездичка) и Save изпраща заявката без никаква проверка във формата. Ако сървърът я
приеме, в акаунта остава празен запис (без име, без дата, без обява).

## What I expected

Въпрос към програмиста: тези записи ги създава системата (оценки на разговори, находки на проверките, сравнения с пазара,
разход на AI). (1) Трябва ли човек изобщо да може да ги създава на ръка — бутонът „Create“ нарочно ли е там? (2) Ако да,
нарочно ли нямат задължителни полета, т.е. празен запис се пази? Ако не — Create да се махне или полетата (поне Name /
Day / Listing) да станат задължителни.

(Формата на Settings › Roles — същото поведение, но там е записан кандидат QA-534.)

## How often

always
