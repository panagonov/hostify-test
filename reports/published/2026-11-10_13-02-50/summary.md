# QA run 2026-11-10_13-02-50

- Application: https://hostify.bioseek.eu — version **1.0.10**
- Started: 2026-11-10T11:02:53.762Z, finished: 2026-11-10T11:05:56.562Z
- Result: **failed** — 2 passed, 2 failed, 0 skipped of 4

## Failures

### 111 111-user-telemetry.spec.ts › 111 user › telemetry › in the dark theme the Changes card and table are dark and readable; the theme goes back to light

**What went wrong**

```
Error: the switch back to light through the theme button is saved for the person — the server still said "dark", so the next sign-in is dark again

expect(received).toBe(expected) // Object.is equality

Expected: "light"
Received: "dark"
```
- console.error: [dashboard] data load failed TypeError: Failed to fetch — `/app/static/js/main.2463612a.js`

**How to reproduce**

1. Sign in at https://hostify.bioseek.eu/app/ as the account's admin (qa.admin@hostify-qa.test).
2. Page: https://hostify.bioseek.eu/app/settings/users/614d3d67-77d4-4351-abf8-90443678862d/telemetry
3. Spec `tests/e2e/111-user-telemetry.spec.ts`: in the dark theme the Changes card and table are dark and readable; the theme goes back to light
4. after a reload the theme is still light
5. Developer tools › Console shows the error(s) above.

**The spec**: 111 — a person's Telemetry: what the person did, the time on the person's own device, the dark theme (1.0.7–1.0.10).

**Screenshots**

- `111_in_the_dark_theme_the_Changes_card_and_table_are_dark_and_readable_the_theme_goe__shot-telemetry-dark.png`
- `111_in_the_dark_theme_the_Changes_card_and_table_are_dark_and_readable_the_theme_goe__screenshot.png`

- file: `tests/e2e/111-user-telemetry.spec.ts`, status: failed (52 s)

### 111 111-user-telemetry.spec.ts › 111 user › telemetry › the super administrator sees the same Changes on the person's page of Platform Admin Users

**What went wrong**

```
Error: The page reported 1 error(s) — API answers, failed requests, console errors:
- [console.error] [dashboard] definition load failed TypeError: Failed to fetch @ https://hostify.bioseek.eu/app/static/js/main.2463612a.js
```
- console.error: [dashboard] definition load failed TypeError: Failed to fetch — `/app/static/js/main.2463612a.js`

**How to reproduce**

1. Sign in at https://hostify.bioseek.eu/app/ as the super administrator (alarm@mail.bg).
2. Page: https://hostify.bioseek.eu/app/platformAdmin/users/614d3d67-77d4-4351-abf8-90443678862d/info
3. Spec `tests/e2e/111-user-telemetry.spec.ts`: the super administrator sees the same Changes on the person's page of Platform Admin Users
4. Developer tools › Console shows the error(s) above.

**The spec**: 111 — a person's Telemetry: what the person did, the time on the person's own device, the dark theme (1.0.7–1.0.10).

**Screenshots**

- `111_the_super_administrator_sees_the_same_Changes_on_the_person_s_page_of_Platform_A__shot-telemetry-platform.png`
- `111_the_super_administrator_sees_the_same_Changes_on_the_person_s_page_of_Platform_A__screenshot.png`

- file: `tests/e2e/111-user-telemetry.spec.ts`, status: failed (40 s)

## Browser console

### 111 111-user-telemetry.spec.ts › 111 user › telemetry › the administrator's Telemetry lists the three tags of 110 among its Changes

- [console.warning] [InboxMenuCount] TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [ReviewsMenuChannels] TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [hydraPartner] navbarExtensionLoader failed TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [demoData] the demo data status could not be read — no welcome modal TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [AlertsMenuCount] TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [hydraPartner] the plugin surfaces were not read TypeError: Failed to fetch @ /app/static/js/main.2463612a.js

### 111 111-user-telemetry.spec.ts › 111 user › telemetry › a person's session is named with the time of their own device (Pacific/Auckland), not UTC

- [console.warning] [InboxMenuCount] TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [hydraPartner] navbarExtensionLoader failed TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [ReviewsMenuChannels] TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [demoData] the demo data status could not be read — no welcome modal TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [AlertsMenuCount] TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [hydraPartner] the plugin surfaces were not read TypeError: Failed to fetch @ /app/static/js/main.2463612a.js

### 111 111-user-telemetry.spec.ts › 111 user › telemetry › in the dark theme the Changes card and table are dark and readable; the theme goes back to light

- [console.warning] [InboxMenuCount] TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [ReviewsMenuChannels] TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [hydraPartner] navbarExtensionLoader failed TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [demoData] the demo data status could not be read — no welcome modal TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [AlertsMenuCount] TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [hydraPartner] the plugin surfaces were not read TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.error] [dashboard] data load failed TypeError: Failed to fetch @ /app/static/js/main.2463612a.js

### 111 111-user-telemetry.spec.ts › 111 user › telemetry › the super administrator sees the same Changes on the person's page of Platform Admin Users

- [console.warning] [AlertsMenuCount] TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.error] [dashboard] definition load failed TypeError: Failed to fetch @ /app/static/js/main.2463612a.js

## Visual review (what the eye must judge)

### low-contrast: 22 unique texts on 3 surfaces

- "v 1.0.10" 4.16:1 (rgb(136, 136, 136) on rgb(40, 40, 40)) @ span.cc-sidebar-footer__version.cc-sidebar-footer__version--link — 3 surface(s): telemetry-admin, telemetry-dark, telemetry-platform
- "Settings" 3.72:1 (rgb(136, 136, 136) on rgb(48, 48, 48)) @ span.cc-submenu-slide-panel__title — 2 surface(s): telemetry-admin, telemetry-dark
- "Users" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ a — 2 surface(s): telemetry-admin, telemetry-platform
- "Telemetry" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ a — 2 surface(s): telemetry-admin, telemetry-platform
- "People who can sign in, with their roles and statu" 3.36:1 (rgb(140, 140, 140) on rgb(255, 255, 255)) @ span.navigator-description — 2 surface(s): telemetry-admin, telemetry-platform
- "Search everything…" 3.1:1 (rgb(141, 141, 166) on rgb(250, 250, 251)) @ span.aero-gs-trigger-text — 2 surface(s): telemetry-admin, telemetry-platform
- "⌘K" 3.23:1 (rgb(141, 141, 166) on rgb(255, 255, 255)) @ span.aero-gs-kbd — 2 surface(s): telemetry-admin, telemetry-platform
- "Actions" 3.06:1 (rgb(138, 147, 175) on rgb(255, 255, 255)) @ div.hydra-kpi-eyebrow — 2 surface(s): telemetry-admin, telemetry-platform
- "Records opened" 3.06:1 (rgb(138, 147, 175) on rgb(255, 255, 255)) @ div.hydra-kpi-eyebrow — 2 surface(s): telemetry-admin, telemetry-platform
- "Changes" 3.06:1 (rgb(138, 147, 175) on rgb(255, 255, 255)) @ div.hydra-kpi-eyebrow — 2 surface(s): telemetry-admin, telemetry-platform
- "Searches" 3.06:1 (rgb(138, 147, 175) on rgb(255, 255, 255)) @ div.hydra-kpi-eyebrow — 2 surface(s): telemetry-admin, telemetry-platform
- "Errors" 3.06:1 (rgb(138, 147, 175) on rgb(255, 255, 255)) @ div.hydra-kpi-eyebrow — 2 surface(s): telemetry-admin, telemetry-platform
- "Sessions" 3.06:1 (rgb(138, 147, 175) on rgb(255, 255, 255)) @ div.hydra-kpi-eyebrow — 2 surface(s): telemetry-admin, telemetry-platform
- "The high is 3.6K at 06-11-2026." 3.06:1 (rgb(138, 147, 175) on rgb(255, 255, 255)) @ div.hydra-dashboard-widget-observation.is-openable — 2 surface(s): telemetry-admin, telemetry-platform
- "Page opened is the largest at 3.3K." 3.06:1 (rgb(138, 147, 175) on rgb(255, 255, 255)) @ div.hydra-dashboard-widget-observation.is-openable — 2 surface(s): telemetry-admin, telemetry-platform
- "People who can sign in, with their roles and statu" 4.35:1 (rgb(140, 140, 140) on rgb(30, 41, 59)) @ span.navigator-description — 1 surface(s): telemetry-dark
- "Search everything…" 3.92:1 (rgba(241, 245, 249, 0.45) on rgb(30, 41, 59)) @ span.aero-gs-trigger-text — 1 surface(s): telemetry-dark
- "⌘K" 3.54:1 (rgba(241, 245, 249, 0.45) on rgb(44, 56, 72)) @ span.aero-gs-kbd — 1 surface(s): telemetry-dark
- "Last 30 days" 3.68:1 (rgb(255, 255, 255) on rgb(66, 135, 218)) @ button.active — 1 surface(s): telemetry-dark
- "Create" 3.35:1 (rgb(22, 104, 220) on rgb(17, 26, 44)) @ [data-test=user-change-detail] span.ant-tag.ant-tag-filled — 1 surface(s): telemetry-dark
- "Remove" 3.35:1 (rgb(22, 104, 220) on rgb(17, 26, 44)) @ [data-test=user-change-detail] span.ant-tag.ant-tag-filled — 1 surface(s): telemetry-dark
- "Platform Admin" 3.72:1 (rgb(136, 136, 136) on rgb(48, 48, 48)) @ span.cc-submenu-slide-panel__title — 1 surface(s): telemetry-platform

## Every test

| № | Test | Status | s | Console | Findings |
|---|---|---|---|---|---|
| 111 | 111-user-telemetry.spec.ts › 111 user › telemetry › the administrator's Telemetry lists the three tags of 110 among its Changes | passed | 39 | 6 | 15 |
| 111 | 111-user-telemetry.spec.ts › 111 user › telemetry › a person's session is named with the time of their own device (Pacific/Auckland), not UTC | passed | 41 | 6 | 0 |
| 111 | 111-user-telemetry.spec.ts › 111 user › telemetry › in the dark theme the Changes card and table are dark and readable; the theme goes back to light | failed | 52 | 7 | 8 |
| 111 | 111-user-telemetry.spec.ts › 111 user › telemetry › the super administrator sees the same Changes on the person's page of Platform Admin Users | failed | 40 | 2 | 15 |
