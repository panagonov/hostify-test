---
name: qa-selectors
description: "Use to audit the data-test coverage of what the tests touch on a Hostify page (toolbar, headers, row menus, form buttons, fields, tabs), record the gaps for the engine and keep docs/selectors.md current — „има ли селектори“, „добави data-test“."
user-invocable: true
allowed-tools: Read Grep Glob Bash Write Edit
argument-hint: "<pageId> | all"
---

# qa-selectors — the data-test audit

Answer in Bulgarian. The register: `docs/selectors.md` (present / gaps / rules).

## Audit of a page

1. Open the page on production (a throw-away Playwright script, or the screenshot and probe of the last
   run) and list what a test must touch: the toolbar (search, create, clear filters, views), every column
   header, the row link and the row menu, the pagination, the form's tabs, controls, Save / Cancel, the item
   page's title and tabs, the view's rows / cards / columns.
2. For each: the `data-test` it has (`page.locator('[data-test]')` → attributes), or none.
3. An element with none and used on MORE than one page is a gap of the ENGINE (`docs/selectors.md` → Gaps,
   with the engine file: the table knows the usual ones). An element of one page only is a gap of the
   project (`client/src/page/<Page>/`) — same table, "where" says the project.
4. Until the gap is closed the page object uses a structural fallback, written NEXT to the `data-test`
   (`.locator('[data-test="x"]').or(<fallback>)`), with the date in a comment.

## The engine side (developers)

Attributes land directly on the antd component (`Input` → the `<input>`, `Select` → the wrapper, `Switch` →
the button). One name per repeated element, used on every page. The first batch asked on 2026-11-05 is the
"Gaps" table of `docs/selectors.md`; a guard test in the Hostify repository keeps them in the engine source.
