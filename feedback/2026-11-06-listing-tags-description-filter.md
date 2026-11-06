---
title: Филтърът по колоната Description в Listing tags показва и чужди тагове
date: 2026-11-06
status: covered by 110-settings-listing-tags — bugs/new/1.0.5--110-settings-listing-tags--filtering-the-description-column-by-the-whole-desc--173e90f6.md (2026-11-06 09:40)
severity: medium
---

## Where

Menu path: Settings › Listing tags › колоната „Description“ › иконата филтър

URL: https://hostify.bioseek.eu/app/settings/listingTags

## What I did

1. Влязох като администратора на „QA Automation“.
2. В грида имаше трите тага от тестовете (Sea view, Pet friendly, Retired).
3. Натиснах филтъра на колоната Description, написах цялото описание на първия таг: „Listings with a view to the sea“ и Search.

## What I saw

Остават ДВА реда — „QA Tag Sea view“ (описанието му съвпада) и „QA Tag Pet friendly“, чието описание е „Pets are welcome“ и няма нищо общо с търсения текст. Думите „a“ / „the“ са осветени като съвпадение.

(the screenshot: `2026-11-06-listing-tags-description-filter.png` next to this file)

## What I expected

Да остане само тагът, чието описание съдържа търсения текст. Филтър по колона с цяло изречение не бива да връща редове, в които го няма.

## How often

always
