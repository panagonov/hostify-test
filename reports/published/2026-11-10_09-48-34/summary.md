# QA run 2026-11-10_09-48-34

- Application: https://hostify.bioseek.eu — version **1.0.10**
- Started: 2026-11-10T07:48:37.734Z, finished: 2026-11-10T07:52:34.831Z
- Result: **failed** — 3 passed, 1 failed, 1 skipped of 5

## Failures

### 100 100-settings-users.spec.ts › 100 settings › users › every column sorts and filters; the item page of a user opens with its tabs

**What went wrong**

```
Error: rows after filtering "Email" by "supervisor" (a value of the first row)

expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
```

**How to reproduce**

1. Sign in at https://hostify.bioseek.eu/app/ as the account's admin (qa.admin@hostify-qa.test).
2. Page: https://hostify.bioseek.eu/app/settings/users
3. Spec `tests/e2e/100-settings-users.spec.ts`: every column sorts and filters; the item page of a user opens with its tabs
4. every column has a header and the actions column is the last one
5. sort the column "Name" ascending (click its header)
6. sort the column "Name" descending (click its header)
7. filter the column "Name" by "Supervisor" (its filter icon), then Clear all
8. filter the column "Email" by "supervisor" (its filter icon), then Clear all
9. filter the column "Role" by "Supervisor" (its filter icon), then Clear all
10. sort the column "Listing scope mode" ascending (click its header)
11. sort the column "Listing scope mode" descending (click its header)
12. filter the column "Listing scope mode" by "All" (its filter icon), then Clear all
13. sort the column "Last login at" ascending (click its header)
14. sort the column "Last login at" descending (click its header)
15. sort the column "User status" ascending (click its header)
16. sort the column "User status" descending (click its header)
17. filter the column "User status" by "Invited" (its filter icon), then Clear all
18. open the first record of the row (its link) — the item page
19. open the tab "info" of the item page
20. open the tab "telemetry" of the item page
21. open the tab "auditLog" of the item page

**The spec**: 100 — Settings › Users: the people of the QA account, one per role, through the Users form.

**Screenshots**

- `100_every_column_sorts_and_filters_the_item_page_of_a_user_opens_with_its_tabs__shot-item-user.png`
- `100_every_column_sorts_and_filters_the_item_page_of_a_user_opens_with_its_tabs__shot-item-user-info.png`
- `100_every_column_sorts_and_filters_the_item_page_of_a_user_opens_with_its_tabs__shot-item-user-telemetry.png`
- `100_every_column_sorts_and_filters_the_item_page_of_a_user_opens_with_its_tabs__shot-item-user-auditLog.png`
- `100_every_column_sorts_and_filters_the_item_page_of_a_user_opens_with_its_tabs__screenshot.png`

- file: `tests/e2e/100-settings-users.spec.ts`, status: failed (115 s)

## Browser console

### 100 100-settings-users.spec.ts › 100 settings › users › the Users page opens through the menu and the Create form behaves

- [console.warning] [hydraPartner] navbarExtensionLoader failed TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [ReviewsMenuChannels] TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [InboxMenuCount] TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [AlertsMenuCount] TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [demoData] the demo data status could not be read — no welcome modal TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [hydraPartner] the plugin surfaces were not read TypeError: Failed to fetch @ /app/static/js/main.2463612a.js

### 100 100-settings-users.spec.ts › 100 settings › users › a user of every role exists — created through the form when missing — and signs in

- [console.warning] [hydraPartner] navbarExtensionLoader failed TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [InboxMenuCount] TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [ReviewsMenuChannels] TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [AlertsMenuCount] TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [demoData] the demo data status could not be read — no welcome modal TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [hydraPartner] the plugin surfaces were not read TypeError: Failed to fetch @ /app/static/js/main.2463612a.js

### 100 100-settings-users.spec.ts › 100 settings › users › the grid keeps every action inside its actions column

- [console.warning] [ReviewsMenuChannels] TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [hydraPartner] navbarExtensionLoader failed TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [InboxMenuCount] TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [AlertsMenuCount] TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [demoData] the demo data status could not be read — no welcome modal TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [hydraPartner] the plugin surfaces were not read TypeError: Failed to fetch @ /app/static/js/main.2463612a.js

### 100 100-settings-users.spec.ts › 100 settings › users › every column sorts and filters; the item page of a user opens with its tabs

- [console.warning] [InboxMenuCount] TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [hydraPartner] navbarExtensionLoader failed TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [ReviewsMenuChannels] TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [AlertsMenuCount] TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [demoData] the demo data status could not be read — no welcome modal TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [hydraPartner] the plugin surfaces were not read TypeError: Failed to fetch @ /app/static/js/main.2463612a.js

## Visual review (what the eye must judge)

### users

- [warn/empty-column] columns with no value in any row: Phone

### form-user

- [warn/empty-column] columns with no value in any row: Phone

### users-filled

- [warn/empty-column] columns with no value in any row: Phone

### low-contrast: 28 unique texts on 7 surfaces

- "Settings" 3.72:1 (rgb(136, 136, 136) on rgb(48, 48, 48)) @ span.cc-submenu-slide-panel__title — 7 surface(s)
- "v 1.0.10" 4.16:1 (rgb(136, 136, 136) on rgb(40, 40, 40)) @ span.cc-sidebar-footer__version.cc-sidebar-footer__version--link — 7 surface(s)
- "Users" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ a — 7 surface(s)
- "People who can sign in, with their roles and statu" 3.36:1 (rgb(140, 140, 140) on rgb(255, 255, 255)) @ span.navigator-description — 7 surface(s)
- "Search everything…" 3.1:1 (rgb(141, 141, 166) on rgb(250, 250, 251)) @ span.aero-gs-trigger-text — 7 surface(s)
- "⌘K" 3.23:1 (rgb(141, 141, 166) on rgb(255, 255, 255)) @ span.aero-gs-kbd — 7 surface(s)
- "User" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ div.sum-label — 3 surface(s): users, form-user, users-filled
- "in this view" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ div.sum-sub — 3 surface(s): users, form-user, users-filled
- "By User statusSPLIT" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ div.sum-label — 3 surface(s): users, form-user, users-filled
- "SPLIT" 3.45:1 (rgb(22, 127, 252) on rgb(230, 245, 255)) @ span.agg-tag — 3 surface(s): users, form-user, users-filled
- "By Listing scope modeSPLIT" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ div.sum-label — 3 surface(s): users, form-user, users-filled
- "Create a new user" 3.84:1 (rgb(255, 255, 255) on rgb(22, 127, 252)) @ [data-test=grid-create] span — 3 surface(s): users, form-user, users-filled
- "Export" 3.52:1 (rgb(22, 127, 252) on rgb(245, 245, 245)) @ div.ant-space-item — 3 surface(s): users, form-user, users-filled
- "Customize view" 3.52:1 (rgb(22, 127, 252) on rgb(245, 245, 245)) @ span — 3 surface(s): users, form-user, users-filled
- "Name" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 3 surface(s): users, form-user, users-filled
- "Info" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ a — 2 surface(s): item-user, item-user-info
- "QA Manager" 4.1:1 (rgb(22, 119, 255) on rgb(255, 255, 255)) @ span — 2 surface(s): item-user, item-user-info
- "Telemetry" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ a — 1 surface(s): item-user-telemetry
- "Actions" 3.06:1 (rgb(138, 147, 175) on rgb(255, 255, 255)) @ div.hydra-kpi-eyebrow — 1 surface(s): item-user-telemetry
- "Records opened" 3.06:1 (rgb(138, 147, 175) on rgb(255, 255, 255)) @ div.hydra-kpi-eyebrow — 1 surface(s): item-user-telemetry
- "Changes" 3.06:1 (rgb(138, 147, 175) on rgb(255, 255, 255)) @ div.hydra-kpi-eyebrow — 1 surface(s): item-user-telemetry
- "Searches" 3.06:1 (rgb(138, 147, 175) on rgb(255, 255, 255)) @ div.hydra-kpi-eyebrow — 1 surface(s): item-user-telemetry
- "Errors" 3.06:1 (rgb(138, 147, 175) on rgb(255, 255, 255)) @ div.hydra-kpi-eyebrow — 1 surface(s): item-user-telemetry
- "Sessions" 3.06:1 (rgb(138, 147, 175) on rgb(255, 255, 255)) @ div.hydra-kpi-eyebrow — 1 surface(s): item-user-telemetry
- "No data in the selected period" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ span.ant-typography.ant-typography-secondary — 1 surface(s): item-user-telemetry
- "every session, newest first" 3.06:1 (rgb(138, 147, 175) on rgb(255, 255, 255)) @ span.hydra-dashboard-widget-subtitle — 1 surface(s): item-user-telemetry
- "Audit log" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ a — 1 surface(s): item-user-auditLog
- "No recorded changes" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ div.ant-empty-description — 1 surface(s): item-user-auditLog

## Every test

| № | Test | Status | s | Console | Findings |
|---|---|---|---|---|---|
| 100 | 100-settings-users.spec.ts › 100 settings › users › the Users page opens through the menu and the Create form behaves | passed | 35 | 6 | 32 |
| 100 | 100-settings-users.spec.ts › 100 settings › users › a user of every role exists — created through the form when missing — and signs in | passed | 35 | 6 | 16 |
| 100 | 100-settings-users.spec.ts › 100 settings › users › the grid keeps every action inside its actions column | passed | 36 | 6 | 0 |
| 100 | 100-settings-users.spec.ts › 100 settings › users › every column sorts and filters; the item page of a user opens with its tabs | failed | 115 | 6 | 39 |
| 100 | 100-settings-users.spec.ts › 100 settings › users › the account holds exactly the administrator, the six people and the invited one | skipped | 0 | 0 | 0 |
