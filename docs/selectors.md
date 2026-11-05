# Selectors

What the tests click and read, by `data-test`. The Hydra client puts `data-test` on the elements below;
what has none is a **gap** the developers add in the engine (`_build-engine/code-generator-config/client/src/hydra/…`).
A page object may keep a structural fallback next to the `data-test` it waits for, dated, until the client
that ships the attribute is deployed.

## Present on production (client 1.5.125, 2026-11-05)

| Element | Selector | Page object |
|---|---|---|
| login form: modal, e-mail, password, submit, alert | `login-modal`, `login-input-email`, `login-input-password`, `login-button`, `login-alert` | `LoginPage` |
| main menu node (top level) | `.cc-sidebar [data-test="<groupId>"]` | `Sidebar.group` |
| submenu node (page or nested group) | `.cc-submenu-slide-panel [data-test="<pageId>"]` | `Sidebar.item` |
| submenu title | `.cc-submenu-slide-panel__title` | `Sidebar.submenuTitle` |
| form control of field `x` (string, text, number, select, date, boolean, image, file) | `[data-test="x"]` | `FormDrawer.control` |
| form section / tab | `[data-test="section-<name>"]`, `[data-test="tab-<name>"]` | `FormDrawer.tab` |
| array field: add button | `[data-test="<field>-add-btn"]` | — |
| item page tab | `[data-test="tab-<name>"]` | `ItemPage.tab` |
| grid column header | `th[columnkey="<name>"]` (also class `<name>`) | `GridPage.header` |
| grid cell of column | `td.<name>` | `GridPage.cellTexts` |
| grid read error | `[data-test="grid-read-error"]` | — |
| theme switch, user menu | `theme-switch`, `user-menu-theme` | — |
| impersonation badge / return | `impersonation-badge`, `impersonation-return` | — |
| unsaved-changes dialog | `unsaved-changes-stay`, `unsaved-changes-leave` | `FormDrawer.cancel` |
| connection error dialog | `connectionError-modal` | probe |
| navbar footer version (click = change history) | `.cc-sidebar-footer__version` (title = the number) | `tests/helpers/version.ts` |

## Gaps — added in the engine on 2026-11-05 (engine 1.5.182, client 1.5.126), NOT yet deployed: fallback in the page object until the production client carries them

| Element | Wanted `data-test` | Fallback now | Where in the engine |
|---|---|---|---|
| grid search box | `grid-search` | `.filterTags input`, placeholder "Search" | `components/grid/gridPlugins/FilterTags.tsx`, `Search.tsx` |
| grid Create button | `grid-create` | toolbar button with the plus-circle icon / text "Create" | `components/grid/gridPlugins/CreateRow.tsx` |
| grid "Clear all" filters | `grid-clear-filters` | button text "Clear all" | `components/grid/gridPlugins/FilterTags.tsx` |
| grid column header | `grid-column-<name>` | `th[columnkey]` (present) | `components/grid/hooks/useGridColumns.tsx` → `onHeaderCell` |
| row actions menu button | `row-actions` | `button:has(.anticon-menu)` | `components/gridField/Actions.tsx` |
| form Save / Save and close / Cancel | `form-save`, `form-save-close`, `form-cancel` | button text | `components/grid/GridController.tsx` → `formMainControls` |
| Search (relation) form field | `<field name>` | the form item by its label (`pickSearch`) | `components/form/formField/Search.tsx` |
| item page title | `item-title` | `h2.ant-typography` | `components/itemController/ItemTitle.tsx` |
| the "Welcome" dialog of an empty account (Skip / Generate demo data) | `demo-welcome`, `demo-welcome-skip`, `demo-welcome-generate` | the modal by its text, the button by "Skip" | the engine's demoData module UI (`services/demoData/ui`) |
| colour picker form field (`color`) | `<field name>` | the form item by its label | `components/form/formField/Color*.tsx` |
| list view row, card view card, board column / card | `list-row`, `card-item`, `board-column-<key>`, `board-card` | class names | `components/list`, `components/cardView`, `components/boards` |

When a gap is closed: move the row to the table above with the client version, delete the fallback from
the page object, run the affected specs.

## Rules

- A spec never writes a selector — it calls a page object.
- `data-test` goes directly on the antd component (the engine's `docs/client/antd-v6.md` says where it lands:
  `Input` → the `<input>`, `Select` → the wrapper, `Switch` → the button, `Modal` → a zero-size root).
- A repeated element (toolbar, form footer, row menu, tab) gets ONE name used everywhere, not one per page.
