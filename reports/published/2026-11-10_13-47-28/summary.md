# QA run 2026-11-10_13-47-28

- Application: https://hostify.bioseek.eu — version **1.0.10**
- Started: 2026-11-10T11:47:31.440Z, finished: 2026-11-10T11:48:49.575Z
- Result: **failed** — 0 passed, 2 failed, 0 skipped of 2

## Failures

### 006 006-platform-admin-users.spec.ts › 006 platform admin › users › the Create user form opens, every tab is presentable, an empty Save is refused

**What went wrong**

```
Error: The page reported 1 error(s) — API answers, failed requests, console errors:
- [console.error] [dashboard] decorator load failed TypeError: Failed to fetch @ https://hostify.bioseek.eu/app/static/js/main.2463612a.js
```
- console.error: [dashboard] decorator load failed TypeError: Failed to fetch — `/app/static/js/main.2463612a.js`

**How to reproduce**

1. Sign in at https://hostify.bioseek.eu/app/ as the super administrator (alarm@mail.bg).
2. Page: https://hostify.bioseek.eu/app/platformAdmin/users/614d3d67-77d4-4351-abf8-90443678862d/info
3. Spec `tests/e2e/006-platform-admin-users.spec.ts`: the Create user form opens, every tab is presentable, an empty Save is refused
4. Developer tools › Console shows the error(s) above.

**The spec**: 006 — Platform Admin › Users: the super administrator's Create user form behaves and follows its layout, and the

**Screenshots**

- `006_the_Create_user_form_opens_every_tab_is_presentable_an_empty_Save_is_refused__shot-platform-user-form.png`
- `006_the_Create_user_form_opens_every_tab_is_presentable_an_empty_Save_is_refused__screenshot.png`

- file: `tests/e2e/006-platform-admin-users.spec.ts`, status: failed (38 s)

### 006 006-platform-admin-users.spec.ts › 006 platform admin › users › the grid keeps every action inside its actions column

**What went wrong**

```
Error: The page reported 1 error(s) — API answers, failed requests, console errors:
- [console.error] [dashboard] definition load failed TypeError: Failed to fetch @ https://hostify.bioseek.eu/app/static/js/main.2463612a.js
```
- console.error: [dashboard] definition load failed TypeError: Failed to fetch — `/app/static/js/main.2463612a.js`

**How to reproduce**

1. Sign in at https://hostify.bioseek.eu/app/ as the super administrator (alarm@mail.bg).
2. Page: https://hostify.bioseek.eu/app/platformAdmin/users/614d3d67-77d4-4351-abf8-90443678862d/info
3. Spec `tests/e2e/006-platform-admin-users.spec.ts`: the grid keeps every action inside its actions column
4. every column has a header and the actions column is the last one
5. Developer tools › Console shows the error(s) above.

**The spec**: 006 — Platform Admin › Users: the super administrator's Create user form behaves and follows its layout, and the

**Screenshots**

- `006_the_grid_keeps_every_action_inside_its_actions_column__screenshot.png`

- file: `tests/e2e/006-platform-admin-users.spec.ts`, status: failed (31 s)

## Browser console

### 006 006-platform-admin-users.spec.ts › 006 platform admin › users › the Create user form opens, every tab is presentable, an empty Save is refused

- [console.warning] [AlertsMenuCount] TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.error] [dashboard] decorator load failed TypeError: Failed to fetch @ /app/static/js/main.2463612a.js

### 006 006-platform-admin-users.spec.ts › 006 platform admin › users › the grid keeps every action inside its actions column

- [console.warning] [AlertsMenuCount] TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.error] [dashboard] definition load failed TypeError: Failed to fetch @ /app/static/js/main.2463612a.js

## Visual review (what the eye must judge)

### low-contrast: 9 unique texts on 1 surfaces

- (text of a platform page, not quoted) 3.72:1 (rgb(136, 136, 136) on rgb(48, 48, 48)) @ span.cc-submenu-slide-panel__title — 1 surface(s): platform-user-form
- (text of a platform page, not quoted) 4.16:1 (rgb(136, 136, 136) on rgb(40, 40, 40)) @ span.cc-sidebar-footer__version.cc-sidebar-footer__version--link — 1 surface(s): platform-user-form
- (text of a platform page, not quoted) 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ a — 1 surface(s): platform-user-form
- (text of a platform page, not quoted) 3.36:1 (rgb(140, 140, 140) on rgb(255, 255, 255)) @ span.navigator-description — 1 surface(s): platform-user-form
- (text of a platform page, not quoted) 3.1:1 (rgb(141, 141, 166) on rgb(250, 250, 251)) @ span.aero-gs-trigger-text — 1 surface(s): platform-user-form
- (text of a platform page, not quoted) 3.23:1 (rgb(141, 141, 166) on rgb(255, 255, 255)) @ span.aero-gs-kbd — 1 surface(s): platform-user-form
- (text of a platform page, not quoted) 3.45:1 (rgb(22, 127, 252) on rgb(230, 245, 255)) @ span.agg-tag — 1 surface(s): platform-user-form
- (text of a platform page, not quoted) 3.84:1 (rgb(255, 255, 255) on rgb(22, 127, 252)) @ span — 1 surface(s): platform-user-form
- (text of a platform page, not quoted) 3.52:1 (rgb(22, 127, 252) on rgb(245, 245, 245)) @ div.ant-space-item — 1 surface(s): platform-user-form

## Every test

| № | Test | Status | s | Console | Findings |
|---|---|---|---|---|---|
| 006 | 006-platform-admin-users.spec.ts › 006 platform admin › users › the Create user form opens, every tab is presentable, an empty Save is refused | failed | 38 | 2 | 15 |
| 006 | 006-platform-admin-users.spec.ts › 006 platform admin › users › the grid keeps every action inside its actions column | failed | 31 | 2 | 0 |
