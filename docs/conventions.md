# Conventions of the QA suite

The rules every spec, helper and page object follows. CLAUDE.md points here; this page has the detail.

## The chain

`tests/e2e` is a **serial, data-building chain**: Playwright runs the files in path order with one worker
(`playwright.config.ts`), so the number in the file name IS the execution order. A spec may rely on the
records of lower-numbered specs only.

| Block | What |
|---|---|
| `001–009` | the platform console: super administrator sign-in (001), the QA account and its administrator (002), the administrator's sign-in (003), the sweep of every platform page (005), the platform's Users page and its Create user form (006) |
| `010–099` | the account as a whole: the sweep of every account page on the empty account (010), cross-cutting journeys (header, search, theme, profile) |
| `100–199` | settings and master data: what every other entity points at (account profile, users and roles, companies, contacts, sources, tags, fees, taxes, custom fields …) |
| `200–299` | listings: listings, units, buildings, groups, policies, links, FAQs, guidebooks |
| `300–399` | pricing and calendar: base prices, fees, taxes, extras, promotions, the multi-calendar |
| `400–499` | guests and reservations: guests, reservations and their tabs, alterations, imports, check-in |
| `500–599` | operations: tasks, housekeeping board, teams, templates, expenses |
| `600–699` | inbox and automations: templates, saved replies, automation rules, mass messages |
| `700–799` | finance and owners: invoices, payments, expenses, owners, statements, contracts |
| `800–899` | channels and apps: channel accounts, app center, integrations (read-only on production) |
| `900–999` | reporting and the rest: reports, pivot grid, dashboards, usage |

Inside a block the order follows the data: the entity other entities point at comes first. A letter suffix
(`120a-…`) squeezes a spec between two numbers when renumbering would be worse.

### Numbering and naming

`NNN-kebab-name.spec.ts` (`NNN[a]` three digits plus an optional letter). `npm run qa:lint` refuses a
duplicate number, a name outside the pattern, a spec without a header comment, a spec that imports
`test` from somewhere else than `../helpers/fixtures`, and a swallowed failure.

### The header comment

Every spec starts with a `/** … */` that says, in this order: the number and the one-line claim; a line
`@qa-description: <кратко описание на български>` (what the runner announces before the spec, e.g.
„проверка на навбар менюта“ — `npm run qa:lint` requires it); what it PROVES; what it CREATES (entity ×
count); what it NEEDS (the specs it depends on, the `.env` keys). A person reading the header knows whether
the spec can run on its own.

## Data

- **Through the forms.** A record the suite needs is created the way a person creates it: the grid's Create
  button, the drawer, Save. The API (`tests/helpers/api.ts`) serves setup that has no UI (pinning a flag),
  counts and verification.
- **Names.** Every record the suite creates has the prefix `QA ` (`tests/fixtures/test-data.ts` →
  `qaName`). A person recognises them in any grid; a spec finds its own by name.
- **No real addresses.** E-mails end in `.test`; phone numbers are fictional. The QA account's e-mail is
  `qa.account@hostify-qa.test`, the administrator's `qa.admin@hostify-qa.test` (`.env`).
- **The manifest.** After a record is saved, the spec reads its id through the API (search by the name it
  typed) and calls `rememberCreated(entity, {id, name}, '<spec number>')` (`tests/helpers/state.ts`). The
  count at the end of the spec reads the same manifest.
- **People per role.** Spec 100 creates the QA account's people (`tests/fixtures/users.ts`) through Settings ›
  Users — every role but the property manager, whom the form locks to "Selected listings" (a listing is
  required): that person is created by the spec that follows the first listings (2xx). `signInAs('<role>')`
  opens any of them.
- **The count.** The last step of a creating spec asks the API how many records of the entity carry the
  suite's names (or ids) and expects EXACTLY the number the spec created. Fewer = a save that lied; more =
  the cleanup did not run. Either fails the spec and everything after it.

## Cleanup

Spec 002 calls `cleanupPreviousRun()` (`tests/helpers/cleanup.ts`) before anything else:

1. the platform's own **Delete demo data** as the QA account's administrator (`POST /demoData/remove`, then
   `GET /demoData/status` until the count is 0). Every request of the suite carries `x-demo-data: 1`
   (`playwright.config.ts`, `api.ts`); once the server stamps `demo: true` on records created under that
   header, this step removes a whole run at once;
2. the **manifest**: every record registered by the previous run that still exists is deleted by id (as the
   administrator, then as the super administrator), newest entity first;
3. **verification**: a record of the manifest that still exists stops the run with its name — the chain never
   starts on dirty data.

A spec that creates records also cleans ITS OWN records of an earlier run in `test.beforeAll`
(`cleanupSpecRecords(api, entity, 'NNN', 'QA <prefix>')` — by the manifest, then by the suite's names), so it
can be run alone with `--only NNN` while the chain's cleanup stays in 002. Template: `110-settings-listing-tags`.

Two traps the template already avoids: the grid keeps its filters in the user's saved view across sessions
(`clearFilters()` before creating, and after every column check), and an empty account greets its first
visitor with the "Welcome" dialog (`LoginPage.login` skips it — never "Generate demo data").

The QA account and its administrator are **survivors**: 002 pins them `demo: false` and the cleanup never
touches them. The account is a NORMAL account marked `qaAccount` (never suspended, never charged): no plan,
feature or module is forced on it — the variants are tests (CLAUDE.md → The QA account is a normal account);
spec 100 creates one person per role, and `signInAs('<role>')` opens any of them. The account is found by its NAME (`QA_TENANT_NAME`); its id, stable from the first run on, is
cached in `.qa/state.json`.

## What every page gets

`probePage()` (`tests/helpers/probe.ts`) on every screen a spec opens — a list, a form, an item tab:

| Finding | Severity | Fails the test |
|---|---|---|
| the login form where a page should be, the connection-error dialog, an `ant-result` error / 404 / 403 | blocker | yes |
| an error notification or message, an untranslated key (`entity:label.x`, `formField.x`), a bare `undefined` / `NaN`, a broken image, an empty content area | error | yes |
| a form that breaks its layout: a single-line field whose height is not the one most of the form's fields have (`field-height`: the Password field 56 px among 40 px fields), a compound field whose parts differ in height or top (`field-parts`: the Search field's button 34 px next to its 40 px input) | error | yes |
| sideways scrolling, a spinner that never stops, a column with no value in any row | warn | no (reported) |
| cut text (hidden without an ellipsis, or outside the window), low contrast (under 4.5:1, 3:1 for large text) | review | only with `QA_STRICT_VISUAL=1` |

A screenshot of every probed surface lands in the run folder — the probe measures the mechanical part, the
picture is for the eye (the QA person's and the agent's).

The **console** (`tests/helpers/console.ts`) is collected for the whole test: console errors and warnings,
uncaught exceptions, failed requests, API answers of 4xx / 5xx and `success: false`. All of these FAIL the test
— a page that asks the server for something it refuses (403) or does not have (404) is a defect to report, never
to explain away; warnings are reported (`QA_FAIL_ON_WARNINGS=1` makes them fail too). Everything is in
`console.json` of the test and in the run summary, with the URL and the status.

## Grids, forms, item pages

`GridPage` (`tests/helpers/page-objects/GridPage.ts`):

- `columns()` reads the header: key, label, sortable, filterable. A page spec goes through EVERY column:
  `sortBy(key, 'ascend')` then `'descend'` — the search request must carry the sort and the visible values
  must be in order (`GridPage.expectOrdered`, numbers / dates / strings each their own way);
  `filterByText(key, value)` with a value taken from the first row — every row left must contain it.
- `search(term)` is the grid's own search box; `total()` the paginator's count.
- `openCreate(title)` → `FormDrawer`; `openItem(row)` → `ItemPage`.

`FormDrawer`: controls by `data-test="<field name>"`; a Search field (relation) by its label
(`pickSearch`); tabs by `data-test="tab-<name>"`. A page spec checks the form the way `hydra-qa-forms` does:
every tab opens, the required marks, the defaults, a dependent field that shows / hides or fills itself
when its master changes, the validation message on an empty required field, and then creates the records.

`ItemPage`: `tabNames()` → every tab is opened and probed.

## Selectors

`docs/selectors.md`. Page objects only; `data-test` first; a structural fallback is written next to the
`data-test` it waits for, with the date, and removed when the client that ships the attribute is deployed.
