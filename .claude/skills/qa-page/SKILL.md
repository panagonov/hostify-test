---
name: qa-page
description: "Use to write or extend the numbered spec of one menu page of Hostify — its grid (sort and filter per column), its create form (fields, tabs, logic, defaults, validation), its item page tabs, the records it creates and the count — „напиши тест за страница X“."
user-invocable: true
allowed-tools: Read Grep Glob Bash Write Edit
argument-hint: "<pageId> [--block NNN] [--role admin]"
---

# qa-page — the spec of a menu page

Answer in Bulgarian; write the spec in English. Rules: `docs/conventions.md`; selectors: `docs/selectors.md`.

## Steps

1. **Find the page** in `inventory/navigation.json` (`id`, `path`, `menuPath`, `kind`, `entity`, `roles`).
   The number: the block of its area (`docs/conventions.md` → The chain), the next free number after the specs
   whose records it needs (`npm run qa:lint` refuses a collision). Name: `NNN-<menu>-<page>.spec.ts`.
2. **Look at the live page** before writing: run a throw-away Playwright script or `npm run qa:run -- --only 010
   -- --grep "<pageId>"` with `--headed`, and read the screenshot and `probe-<pageId>.json` of the run: the
   grid's columns (`GridPage.columns()`), the Create form's controls (`FormDrawer.controlNames()` per tab),
   the item page's tabs (`ItemPage.tabNames()`). Never guess field names — they are the model's field names
   and carry `data-test`.
3. **Write the spec** from this skeleton (one `test.describe` in serial mode, `SweepSession` or `signInAs`):
   - *opens*: through the menu, URL, probe, console (what 010 does — repeated here so the spec stands alone);
   - *grid*: `clearFilters()`; for EVERY column of `columns()`: sortable → `sortBy(key,'ascend')` /
     `'descend'` + `GridPage.expectOrdered(await cellTexts(key), …)`; filterable → `filterByText(key, <a
     value of the first row>)` + every remaining row contains it; then `search(<name>)` and `total()`;
     a list / card / board view: its own rows and the Sort plugin;
   - *form*: `openCreate(title)`; every tab opens and is probed; required marks; defaults (a switch named
     `active` opens ON); a dependent field (master changes → child shows / hides / fills); Save on an empty
     form → the validation message; `cancel()`;
   - *create*: N records with `qaName(...)` through the form (every enum value at least once where the
     form offers it); after each Save: the row is in the grid; the id through `api.search` by name →
     `rememberCreated(entity, {id, name}, 'NNN')`;
   - *item*: `openItem(row)`; every tab of `tabNames()` → `openTab` + probe;
   - *count*: `api.count(entity, {searchTerm: 'QA '})` (or by name) equals N — the LAST step.
4. **Run it alone** (`--only NNN`), then from the first spec it depends on. Fix the spec, never the check.
5. **Record**: `docs/pages.md` row of the page → the spec; a missing `data-test` → `docs/selectors.md` → Gaps.

## What makes a page spec wrong

A selector typed in the spec; a record created through the API; a `.catch` that hides a missing element; a
count that is `>=` instead of `===`; a dependency on a record a HIGHER number creates; a page checked
without its item tabs.
