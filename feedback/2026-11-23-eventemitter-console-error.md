---
title: QA-450 — „EventEmitter error whn try to add result in event“ в конзолата на 1.0.26
date: 2026-11-23
status: new
severity: high
---

## Where

Всяка страница на акаунта след вход (таблото, Settings › Users, Settings › Listing tags, Calendar…).

URL: https://hostify.bioseek.eu/app/dashboards/

## What I did

1. Вход като администратор на QA Automation; изчакано таблото да зареди напълно.
2. Отворени Settings › Users, Settings › Listing tags и Calendar, всяка изчакана да зареди.

## What I saw

`console.error: EventEmitter error whn try to add result in event` (`main.90ab07ee.js`, версия 1.0.26):
- веднага след входа, когато приложението само презарежда страницата и заявките на първото зареждане се прекъсват
  (`net::ERR_ABORTED`), заедно с `[InboxMenuCount]`, `[AlertsMenuCount]`, `[ReviewsMenuChannels]`, `[demoData]`,
  `[hydraPartner] … TypeError: Failed to fetch`;
- отново 3 s по-късно на зареденото табло, без действие;
- при всяка следваща страница, 2–4 s след прекъснато `POST /userEvent/collect`.

Час: 2026-11-23 12:25 EET (10:25 UTC). Бъгът: QA-450 (`bugs/new/`), дубликатите QA-453–460 са в `bugs/declined/`.

## What I expected

Без грешки в конзолата (както на 1.0.21).

## How often

always
