# QA run 2026-11-06_11-30-05

- Application: https://hostify.bioseek.eu — version **1.0.5**
- Started: 2026-11-06T09:30:11.227Z, finished: 2026-11-06T09:30:28.395Z
- Result: **failed** — 0 passed, 1 failed, 0 skipped of 1

## Failures

### 006 006-platform-admin-users.spec.ts › 006 platform admin › users › the Create user form opens, every tab is presentable, an empty Save is refused

**What went wrong**

```
Error: platform-user-form: the screen is not presentable (5):
- [error/field-parts] "Account": the parts of one field do not match — input 40px, button 34px @ [data-test=tenant] div.ant-space-compact.css-ry7cab
- [error/field-parts] "Role": the parts of one field do not match — input 40px, button 34px @ [data-test=role] div.ant-space-compact.css-ry7cab
- [error/field-parts] "Default account": the parts of one field do not match — input 40px, button 34px @ [data-test=defaultAccount] div.ant-space-compact.css-ry7cab
- [error/field-parts] "Owner": the parts of one field do not match — input 40px, button 34px @ [data-test=owner] div.ant-space-compact.css-ry7cab
- [error/field-height] "Password" is 56px tall — the form's fields are 40px @ [data-test=section-info] span.ant-input-affix-wrapper.ant-input-affix-wrapper-lg
```
- on the screen (platform-user-form): "Account": the parts of one field do not match — input 40px, button 34px @ [data-test=tenant] div.ant-space-compact.css-ry7cab
- on the screen (platform-user-form): "Role": the parts of one field do not match — input 40px, button 34px @ [data-test=role] div.ant-space-compact.css-ry7cab
- on the screen (platform-user-form): "Default account": the parts of one field do not match — input 40px, button 34px @ [data-test=defaultAccount] div.ant-space-compact.css-ry7cab
- on the screen (platform-user-form): "Owner": the parts of one field do not match — input 40px, button 34px @ [data-test=owner] div.ant-space-compact.css-ry7cab
- on the screen (platform-user-form): "Password" is 56px tall — the form's fields are 40px @ [data-test=section-info] span.ant-input-affix-wrapper.ant-input-affix-wrapper-lg

**How to reproduce**

1. Sign in at https://hostify.bioseek.eu/app/ as the super administrator (alarm@mail.bg).
2. Page: https://hostify.bioseek.eu/app/platformAdmin/users
3. Spec `tests/e2e/006-platform-admin-users.spec.ts`: the Create user form opens, every tab is presentable, an empty Save is refused

**The spec**: 006 — Platform Admin › Users: the super administrator's Create user form behaves and follows its layout.

**Screenshots**

- `006_the_Create_user_form_opens_every_tab_is_presentable_an_empty_Save_is_refused__shot-platform-user-form.png`
- `006_the_Create_user_form_opens_every_tab_is_presentable_an_empty_Save_is_refused__screenshot.png`

- file: `tests/e2e/006-platform-admin-users.spec.ts`, status: failed (12 s)

## Browser console

### 006 006-platform-admin-users.spec.ts › 006 platform admin › users › the Create user form opens, every tab is presentable, an empty Save is refused

- [console.warning] [ReviewsMenuChannels] TypeError: Failed to fetch @ /app/static/js/main.e91a7312.js
- [console.warning] [InboxMenuCount] TypeError: Failed to fetch @ /app/static/js/main.e91a7312.js
- [console.warning] [AlertsMenuCount] TypeError: Failed to fetch @ /app/static/js/main.e91a7312.js

## Visual review (what the eye must judge)

### platform-user-form

- [error/field-parts] "Account": the parts of one field do not match — input 40px, button 34px @ [data-test=tenant] div.ant-space-compact.css-ry7cab
- [error/field-parts] "Role": the parts of one field do not match — input 40px, button 34px @ [data-test=role] div.ant-space-compact.css-ry7cab
- [error/field-parts] "Default account": the parts of one field do not match — input 40px, button 34px @ [data-test=defaultAccount] div.ant-space-compact.css-ry7cab
- [error/field-parts] "Owner": the parts of one field do not match — input 40px, button 34px @ [data-test=owner] div.ant-space-compact.css-ry7cab
- [error/field-height] "Password" is 56px tall — the form's fields are 40px @ [data-test=section-info] span.ant-input-affix-wrapper.ant-input-affix-wrapper-lg
- [warn/empty-column] columns with no value in any row: Phone

### low-contrast: 15 unique texts on 1 surfaces

- "Platform Admin" 3.72:1 (rgb(136, 136, 136) on rgb(48, 48, 48)) @ span.cc-submenu-slide-panel__title — 1 surface(s): platform-user-form
- "v 1.0.5" 4.16:1 (rgb(136, 136, 136) on rgb(40, 40, 40)) @ span.cc-sidebar-footer__version.cc-sidebar-footer__version--link — 1 surface(s): platform-user-form
- "Users" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ a — 1 surface(s): platform-user-form
- "People who can sign in, with their roles and statu" 3.36:1 (rgb(140, 140, 140) on rgb(255, 255, 255)) @ span.navigator-description — 1 surface(s): platform-user-form
- "Search everything…" 3.1:1 (rgb(141, 141, 166) on rgb(250, 250, 251)) @ span.aero-gs-trigger-text — 1 surface(s): platform-user-form
- "⌘K" 3.23:1 (rgb(141, 141, 166) on rgb(255, 255, 255)) @ span.aero-gs-kbd — 1 surface(s): platform-user-form
- "User" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ div.sum-label — 1 surface(s): platform-user-form
- "in this view" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ div.sum-sub — 1 surface(s): platform-user-form
- "By User statusSPLIT" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ div.sum-label — 1 surface(s): platform-user-form
- "SPLIT" 3.45:1 (rgb(22, 127, 252) on rgb(230, 245, 255)) @ span.agg-tag — 1 surface(s): platform-user-form
- "By Listing scope modeSPLIT" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ div.sum-label — 1 surface(s): platform-user-form
- "Clear all" 3.36:1 (rgb(140, 140, 140) on rgb(255, 255, 255)) @ [data-test=grid-clear-filters] span — 1 surface(s): platform-user-form
- "Save as" 3.84:1 (rgb(255, 255, 255) on rgb(22, 127, 252)) @ span — 1 surface(s): platform-user-form
- "Create a new user" 3.84:1 (rgb(255, 255, 255) on rgb(22, 127, 252)) @ [data-test=grid-create] span — 1 surface(s): platform-user-form
- "Export" 3.52:1 (rgb(22, 127, 252) on rgb(245, 245, 245)) @ div.ant-space-item — 1 surface(s): platform-user-form

### cut-text: 1 unique texts on 1 surfaces

- "User status" @ span.ant-table-column-title — 1 surface(s): platform-user-form

## Every test

| № | Test | Status | s | Console | Findings |
|---|---|---|---|---|---|
| 006 | 006-platform-admin-users.spec.ts › 006 platform admin › users › the Create user form opens, every tab is presentable, an empty Save is refused | failed | 12 | 3 | 23 |
