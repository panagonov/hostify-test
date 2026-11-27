---
title: 1.0.36: тестова пощенска кутия за QA акаунта, и бутонът, който сам става „Send · SMS“, когато имейлът не е свързан
date: 2026-11-27
status: new            # new | covered by <spec> (<date>) | fixed <date> | not a defect — <reason>
severity: medium       # blocker | high | medium | low
---

## Where

Inbox › Unified inbox › разговор с гост › полето за отговор („Send via:“ и бутона Send); акаунт QA Automation, версия 1.0.36.

## What I did

1. Разговор (Conversations › Create, Reservation, Open) с наш гост `@hostify-qa.test` и негова резервация.
2. Отворен в Unified inbox; „Send via:“.

## What I saw

- „Send via:“: **Channel** и **Email** са изключени — „Connect a mailbox (Gmail or Microsoft 365) in App Center“; активен е само
  **SMS** (с отметка).
- Бутонът за изпращане **сам става „Send · SMS“**. Нищо не беше изпратено (тестът спира преди Send; SMS е забранен в пакета).

## What I expected

Въпроси към програмиста:
1. Може ли QA акаунтът да има **тестова пощенска кутия** (без инсталиране на плъгин от наша страна), за да тестваме изпращането
   на имейл до наш гост `@hostify-qa.test`? Дотогава 305 тества само вътрешна бележка (Note).
2. Когато имейлът не е свързан, бутонът сам става „Send · SMS“ — **нарочно ли е?** Рисково е: човек, свикнал да праща имейли,
   може да изпрати SMS на госта, без да иска (а SMS струва пари и стига до реален телефон). Очаквано: никакъв избран начин по
   подразбиране, или ясно предупреждение, че ще тръгне SMS.

## How often

always (докато няма свързана пощенска кутия)
