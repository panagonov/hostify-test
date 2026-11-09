# QA run 2026-11-09_13-24-12

- Application: https://hostify.bioseek.eu — version **1.0.10**
- Started: 2026-11-09T11:24:15.699Z, finished: 2026-11-09T11:27:32.183Z
- Result: **passed** — 5 passed, 0 failed, 0 skipped of 5

## Failures

_none_

## Browser console

### 110 110-settings-listing-tags.spec.ts › 110 settings › listing tags › the page opens through the menu and the Create form behaves

- [console.warning] [ReviewsMenuChannels] TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [hydraPartner] navbarExtensionLoader failed TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [InboxMenuCount] TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [AlertsMenuCount] TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [demoData] the demo data status could not be read — no welcome modal TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [hydraPartner] the plugin surfaces were not read TypeError: Failed to fetch @ /app/static/js/main.2463612a.js

### 110 110-settings-listing-tags.spec.ts › 110 settings › listing tags › three tags are created through the form and appear in the grid

- [console.warning] [InboxMenuCount] TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [hydraPartner] navbarExtensionLoader failed TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [ReviewsMenuChannels] TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [demoData] the demo data status could not be read — no welcome modal TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [AlertsMenuCount] TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [hydraPartner] the plugin surfaces were not read TypeError: Failed to fetch @ /app/static/js/main.2463612a.js

### 110 110-settings-listing-tags.spec.ts › 110 settings › listing tags › every column sorts and filters; the item page opens with its tabs

- [console.warning] [hydraPartner] navbarExtensionLoader failed TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [InboxMenuCount] TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [ReviewsMenuChannels] TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [demoData] the demo data status could not be read — no welcome modal TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [AlertsMenuCount] TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [hydraPartner] the plugin surfaces were not read TypeError: Failed to fetch @ /app/static/js/main.2463612a.js

### 110 110-settings-listing-tags.spec.ts › 110 settings › listing tags › filtering the Description column by the whole description of one tag leaves only that tag

- [console.warning] [InboxMenuCount] TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [hydraPartner] navbarExtensionLoader failed TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [ReviewsMenuChannels] TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [hydraPartner] the plugin surfaces were not read TypeError: Failed to fetch @ /app/static/js/main.2463612a.js
- [console.warning] [AlertsMenuCount] Response @ /app/static/js/main.2463612a.js

## Visual review (what the eye must judge)

### listing-tags-filled

- [warn/empty-column] columns with no value in any row: Color

### low-contrast: 23 unique texts on 7 surfaces

- "Settings" 3.72:1 (rgb(136, 136, 136) on rgb(48, 48, 48)) @ span.cc-submenu-slide-panel__title — 7 surface(s)
- "v 1.0.10" 4.16:1 (rgb(136, 136, 136) on rgb(40, 40, 40)) @ span.cc-sidebar-footer__version.cc-sidebar-footer__version--link — 7 surface(s)
- "Listing tags" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ a — 7 surface(s)
- "Tags for filtering listings across the app" 3.36:1 (rgb(140, 140, 140) on rgb(255, 255, 255)) @ span.navigator-description — 7 surface(s)
- "Search everything…" 3.1:1 (rgb(141, 141, 166) on rgb(250, 250, 251)) @ span.aero-gs-trigger-text — 7 surface(s)
- "⌘K" 3.23:1 (rgb(141, 141, 166) on rgb(255, 255, 255)) @ span.aero-gs-kbd — 7 surface(s)
- "0 / 5" 3.31:1 (rgba(0, 0, 0, 0.45) on rgb(245, 245, 245)) @ span.cnt — 4 surface(s)
- "Create a new listing tag" 3.84:1 (rgb(255, 255, 255) on rgb(22, 127, 252)) @ [data-test=grid-create] span — 4 surface(s)
- "Export" 3.52:1 (rgb(22, 127, 252) on rgb(245, 245, 245)) @ div.ant-space-item — 4 surface(s)
- "Customize view" 3.52:1 (rgb(22, 127, 252) on rgb(245, 245, 245)) @ span — 4 surface(s)
- "Tag" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 4 surface(s)
- "Color" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ th.ant-table-cell.color — 4 surface(s)
- "Description" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 4 surface(s)
- "Active" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 3 surface(s): listing-tags, form-listingTag, listing-tags-filled
- "Date created" 2.95:1 (rgb(138, 147, 175) on rgb(250, 251, 253)) @ span.ant-table-column-title — 3 surface(s): listing-tags, form-listingTag, listing-tags-filled
- "Info" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ a — 2 surface(s): item-listingTag, item-listingTag-info
- "Yes" 3.37:1 (rgb(56, 158, 13) on rgb(246, 255, 237)) @ [data-test=section-card-info] span.ant-tag.ant-tag-filled — 2 surface(s): item-listingTag, item-listingTag-info
- "Audit log" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ a — 1 surface(s): item-listingTag-auditLog
- "created QA Tag Sea view" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ span.ant-typography.ant-typography-secondary — 1 surface(s): item-listingTag-auditLog
- "QA Tag Sea view" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ span.cc-drag-content — 1 surface(s): item-listingTag-auditLog
- "Nov 9, 13:25" 3.35:1 (rgba(0, 0, 0, 0.45) on rgb(255, 255, 255)) @ span.ant-typography.ant-typography-secondary — 1 surface(s): item-listingTag-auditLog
- "Clear all" 3.36:1 (rgb(140, 140, 140) on rgb(255, 255, 255)) @ [data-test=grid-clear-filters] span — 1 surface(s): listing-tags-description-phrase-filter
- "Save as" 3.84:1 (rgb(255, 255, 255) on rgb(22, 127, 252)) @ span — 1 surface(s): listing-tags-description-phrase-filter

## Every test

| № | Test | Status | s | Console | Findings |
|---|---|---|---|---|---|
| 110 | 110-settings-listing-tags.spec.ts › 110 settings › listing tags › the page opens through the menu and the Create form behaves | passed | 42 | 6 | 30 |
| 110 | 110-settings-listing-tags.spec.ts › 110 settings › listing tags › three tags are created through the form and appear in the grid | passed | 55 | 6 | 16 |
| 110 | 110-settings-listing-tags.spec.ts › 110 settings › listing tags › every column sorts and filters; the item page opens with its tabs | passed | 63 | 6 | 26 |
| 110 | 110-settings-listing-tags.spec.ts › 110 settings › listing tags › filtering the Description column by the whole description of one tag leaves only that tag | passed | 29 | 5 | 15 |
| 110 | 110-settings-listing-tags.spec.ts › 110 settings › listing tags › the account holds exactly the tags this spec created | passed | 2 | 0 | 0 |
