---
title: Telemetry › Actions shows only the last 10 rows, without pages (question)
date: 2026-11-25
status: new
severity: low
---

## Where

Settings › Users › QA Admin › Telemetry, the Actions table (`data-test="user-actions"`)

## What I did

1. Opened a listing tag from Settings › Listing tags, searched the tags (headless look, 2026-11-25 09:46).
2. Opened the administrator's Telemetry four times over 5½ minutes.

## What I saw

- The Actions table holds exactly **10 rows** and has no pager — older actions cannot be reached.
- New actions appear only after about 5 minutes.
- Every opening of the Telemetry page adds 3–4 rows itself (Application started, Signed in, Record opened, Error in the
  client), so after a few visits the person's own actions (the opened tag, the search) are pushed out of the 10 rows.

## What I expected

All the person's actions of the period, with pages (as Changes has).

## Question for the developers

**Is Telemetry › Actions with 10 rows and no pages the intended design?** Meanwhile spec 111 checks the recorded
actions through the API, not through the table (QA-471 / QA-485 were the test's own visits pushing the rows out).

## How often

always
