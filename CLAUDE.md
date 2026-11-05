# CLAUDE.md — Hostify QA suite

Guidance for Claude Code in this repository. Rules and pointers only; the detail lives in `docs/`.

This repository is ONE project of its own: the automated QA suite of Hostify, run against the production
application **https://hostify.bioseek.eu/app/** by the QA person. It is not the Hostify code base — the QA
person has access to this repository only. Nothing here is generated; everything is edited directly.
**Answer the person in Bulgarian.** Code, comments, file names and documentation stay in English.

## What the suite is

Numbered Playwright journeys (`tests/e2e/NNN-name.spec.ts`) that open a real browser against production,
in **strict order** with **one worker**: 001 signs in to the platform console as the super administrator,
002 makes the QA account ("QA Automation") and its administrator with the known password of `.env`,
003 signs in as that administrator, 005 / 010 open every page of the menu, 1xx fill the pages in dependency
order (a page that lists records of another entity comes AFTER the spec that creates them). Every page is
checked the way a QA person checks it: untranslated texts, cut elements, low contrast, broken layout,
console errors and warnings, failed API calls — `tests/helpers/probe.ts`, `tests/helpers/console.ts`.
Rules in full: `docs/conventions.md`.

## ⚠ The run rule (the person says what, the agent runs it)

The QA person tells the agent WHAT to run — one spec, a block, or everything; the AGENT runs it, with
`node tools/qa.mjs run …` through Bash (a visible browser by default), never by asking the person to type
commands. The runner takes the spec files ONE BY ONE in number order and the agent relays what it prints:

- before every spec: `пускам тест <NNN-name> — <description>` (the `@qa-description:` line of the spec's
  header, Bulgarian, e.g. „проверка на навбар менюта“ — `npm run qa:lint` requires it);
- after every spec: the verdict — `завърши без грешка` or `N казус(а) за решаване` with their names;
- the issues of the run go into **`reports/issues/<version>/<YYYY-MM-DD HH:mm>/`** (the application's version,
  then the run's start, local time, to the minute — the folders sort by name into time order, newest last): one md per spec with issues (what went
  wrong, how to reproduce, the screenshots copied next to it, the console) and a `README.md` list. That folder
  is what the developers' agent in the Hostify project analyses and fixes — the agent here never fixes the
  application, it reports (a 404 or a 403 behind a page is a finding, not something to explain away).

After the run the agent tells the person, in Bulgarian: which specs passed, which have issues and where the
folder is; `npm run qa:publish` commits the folder (with `feedback/`) and pushes it to the developers.

## ⚠ The version rule (every run knows what it tested)

Every API answer carries the application's `version`; the navbar footer shows it (`v 1.0.3`, a click opens the
change history — `GET /version/changelog`: releases with title, note and commits). The runner asks it before a
run (`.qa/version.json`), 001 checks the footer and the API agree, the run summary records it, and the issues
go under **`reports/issues/<version>/<YYYY-MM-DD HH:mm>/`**.

- **Same version as the last run → the same issue is not news.** An issue repeated from the version's previous
  folder is marked „известен от <папка>“ (its signature: spec, check, first error line, API answers) in the md,
  the README and the console; only „нов“ issues need the developers' eyes. Never report a known issue as new.
- **New version → read `reports/issues/<version>/release-notes.md` first** (the runner writes it once per
  version: this release and every release since the last tested one). The agent names the pages and specs the
  notes touch (menu names, entities, fixes) and runs them first; a known issue of the previous version is
  checked for being fixed. The notes are the map of where to look — the release note and commit texts will get
  more detailed from here on.
- A run against an unknown version (the API could not be asked) files under `reports/issues/unknown/` and says so.

## ⚠ The chain rules (never bend them)

- **Order is data.** A spec may rely only on records of LOWER-numbered specs. `npm run qa:lint` checks the
  names; a new spec takes the next free number of its block (`docs/conventions.md` → Numbering).
- **Data goes in through the forms**, never through the API. The API (`tests/helpers/api.ts`) is for
  setup, counts and verification only.
- **Every spec that creates records counts them at its end** against the API and FAILS when the count is
  not the expected one; it registers every record with `rememberCreated` (`tests/helpers/state.ts`).
- **Every run starts clean.** 002 removes what the previous run created (`tests/helpers/cleanup.ts`: the
  platform's demo-data wipe, then the manifest of created records) and stops when something stays. The QA
  account and its administrator are the only survivors — never delete or rename them, never run against
  another account, never touch records that are not the suite's.
- **Selectors only in page objects** (`tests/helpers/page-objects/`), by `data-test` first; a spec never
  types a CSS class. An element the tests need and that has no `data-test` is a GAP: record it in
  `docs/selectors.md` → Gaps (the developers add it in the Hydra engine), use the documented fallback meanwhile.
- **A test never swallows its own failure**: no `.catch(() => …)` around a locator action or an assertion,
  no `expect` inside an `if` that probes visibility. Allowed: dismissing an optional dialog, cleanup.
- **A defect the QA person shows gets a RED test first** (`/qa-teach`), then the defect goes to the
  developers through the published run (`npm run qa:publish`) — the test is the proof and the regression guard.
- **No credentials in git**: `.env` only (`.env.example` lists the keys). No real e-mails or phones in
  test data — `.test` domains, fictional numbers.

## Where things live

| Path | What |
|---|---|
| `tests/e2e/` | the numbered journeys |
| `tests/helpers/page-objects/` | `BasePage`, `LoginPage`, `Sidebar`, `GridPage` (sort / filter / search per column, create, row link), `FormDrawer`, `ItemPage` (tabs), `PlatformAdminPages` |
| `tests/helpers/` | `env.ts` (.env), `api.ts`, `state.ts` (.qa/state.json + the manifest), `cleanup.ts`, `console.ts`, `probe.ts`, `sweep.ts`, `navigation.ts`, `fixtures.ts` |
| `inventory/navigation.json` | every menu page with route, roles, kind, entity — generated by `npm run inventory` from the Hostify checkout (developers only) |
| `reporters/qaReporter.ts` | `reports/runs/<runId>/summary.md|json`, `status.json`, screenshots |
| `reports/issues/<version>/<YYYY-MM-DD HH:mm>/` | the issues of one run, one md per spec, with screenshots, `issues.json` (signatures), `README.md`; `reports/issues/<version>/release-notes.md` — the hand-over to the developers' agent |
| `reports/published/` | the run summaries the QA person shared (`npm run qa:publish` commits them with `reports/issues/` and `feedback/`, and pushes) |
| `feedback/` | the QA person's notes for the developers and the agent (`npm run qa:feedback "…"`, `/qa-teach`) |
| `tools/qa.mjs` | run (spec by spec, announcing and judging each) / stop / status / summary / publish / feedback / lint |
| `docs/` | `conventions.md`, `selectors.md`, `pages.md`, `reporting.md`, `teaching.md` |
| `.claude/skills/` | `qa-run`, `qa-page`, `qa-teach`, `qa-selectors` |

## Commands

```bash
npm run qa:setup                 # once: dependencies + Chromium
npm run qa:run                   # the whole chain, in order
npm run qa:run -- --only 002     # one spec; --from 100 --to 199 a block; a VISIBLE browser by default, --headless for the background
npm run qa:stop · qa:status · qa:summary · qa:report · qa:publish
npm run qa:check                 # tsc + the numbering lint — before every commit
```

The suite needs `.env` with `QA_SUPERADMIN_EMAIL/PASSWORD` and `QA_ADMIN_PASSWORD`. A run is a browser against
PRODUCTION: it creates records in the QA account only, through the same forms a person uses.

## Writing a page spec

Use `/qa-page <pageId>`: it reads `inventory/navigation.json`, the page's grid and form on the live
application, and writes the spec after the template `tests/e2e/110-settings-listing-tags.spec.ts`
(`tests/helpers/checks.ts` holds the shared mechanics) with the checks every page gets — the probe, the grid (every column: sort
ascending and descending, the column filter / search, the total), the create form (fields, tabs, show / hide
logic, defaults, validation), the item page (every tab opens and is probed), and the count at the end.
Then `npm run qa:check` and a run of the new spec alone, then of the chain from the first spec it depends on.

## Skills

- `/qa-run` — run, stop, watch, read and publish a run; what each result means.
- `/qa-page` — write or extend the spec of a menu page.
- `/qa-teach` — the QA person shows what is wrong and the tests missed: a RED test + a feedback note.
- `/qa-selectors` — audit `data-test` coverage of what the tests touch; write the gaps for the engine.

## For the developers (the Hostify side)

The suite tests the deployed client. Missing `data-test` attributes are added in the Hydra engine
(`_build-engine/code-generator-config/client/src/hydra/…`), never patched here; a fallback selector in a page
object is temporary and says so. `npm run inventory -- --project <hostify-desktop>` rebuilds
`inventory/navigation.json` after a menu change. Results and the QA person's notes arrive in
`reports/published/` and `feedback/` of this repository (`git pull`).
