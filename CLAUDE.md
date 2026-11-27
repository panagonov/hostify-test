# CLAUDE.md — Hostify QA suite

Guidance for Claude Code in this repository. Rules and pointers only; the detail lives in `docs/`.

This repository is ONE project of its own: the automated QA suite of Hostify, run against the production
application **https://hostify.bioseek.eu/app/** by the QA person. It is not the Hostify code base — the QA
person has access to this repository only. Nothing here is generated; everything is edited directly.
**Answer the person ONLY in Bulgarian — no exceptions**, including the short messages between steps, the
progress notes and the questions (the QA person, 2026-11-10: never Russian, never English to the person).
Code, comments, file names and documentation stay in English.

**⚠ Never commit, push or `npm run qa:publish` without the person's explicit „да“** (the QA person, 2026-11-17) —
not even a small change. Before each one, show: the files (new, changed, deleted), grouped by kind; the commit
message; whether screenshots are included and whether they were checked for other accounts' data. A change asked
for → show the new list and wait again.

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

## ⚠ Day and night (the QA person, 2026-11-26 — from 2026-11-27)

- **Day, until 18:00**: in the morning — a check for a new version, `git pull`, the results of the night (told first);
  then writing tests and SHORT runs in the background; a commit by 17:30, only after the person's „да“.
- **Night, from ~18:30 until 01:00 at the latest** (the computer rests after it): headless, `caffeinate -i`, in order of
  importance — 1) the bugs in `bugs/for-verification/`, 2) the regression, 3) a share of the full chain's groups, a
  different share each night when they do not fit in one. **01:00 is the DEFAULT, not an absolute limit**: a run that
  needs more time is asked about BEFORE it starts, and the person decides then; what was not run is said in the
  morning. The runner's `--until <HH:MM>` takes another hour or is left out; until it exists, the night run is started as
  the person says and watched for 01:00.

## ⚠ The bug workflow and the accounts

Every failed check becomes ONE bug file in `bugs/new/` (one per version + signature; seen again = a line, not a
file) with its NUMBER, **`QA-<n>`** — given once by the runner, never changed or reused; the person, the reports and
the developers' commits (`fix(QA-<n>): …`) name a bug by it. The developers' agent fixes and moves it to
`bugs/for-verification/` (or to `bugs/declined/` with the reason); the next run checks those FIRST and moves each to `bugs/verified/` or `bugs/needs-new-fix/`. The run's
full record stays in `reports/issues/<version>/<date time>/`; `bugs/index.html` shows every bug as one page for a
person. A defect the QA person saw by eye goes through `/qa-teach`: the check that is red because of it, run once,
files the bug like any other (no `test.fail()` in this suite). Details and the file format: `docs/bugs.md`.

A fix in spec 300 is verified on an account that holds the data of 100–299, so the suite keeps NUMBERED accounts
(`.qa/tenants.json`, `npm run qa:tenants`), each knowing the spec it reached. Before a run the agent asks the
person what to do with the active account — **wipe** (empty it, chain from the start), **keep** (leave it for
verifications, start a new account) or **continue** (go on in it, no wipe, 002 left out) — and passes
`--tenant <mode>` (and `--account <n>` to return to a kept one). No account ever holds duplicated data: a spec
re-run on an account cleans its own records first.

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
  checked for being fixed. The notes are the map of where to look; their section „Поправени бъгове според
  версията“ lists the `QA-<n>` the release says it fixes (its `fix(QA-<n>)` commits and note lines) — their specs
  run first, and a number there that is not in `bugs/for-verification/` is said to the person.
- A run against an unknown version (the API could not be asked) files under `reports/issues/unknown/` and says so.

## ⚠ The QA account is a normal account

"QA Automation" is an ordinary customer account that happens to be marked `qaAccount` (the user, 2026-11-05):
billing never suspends it (an expired Trial, unpaid bills) and never charges it, so it switches plans and
features „безнаказано“ — and that is ALL that differs. Rules:

- **Nothing is forced on it.** 002 creates it as the platform creates every account (a Trial) and never sets a
  plan, a feature or a module. A page that needs a plan or a feature is tested by a spec that switches it
  THROUGH THE FORMS (the super administrator's account form, the account's Settings › Billing), checks the
  effect, and may switch it back — every variant is a test, not a precondition.
- **Every role signs in.** Spec 100 creates one person per role through Settings › Users
  (`tests/fixtures/users.ts`: manager, property manager, revenue manager, booking agent, accountant, team
  supervisor, housekeeper; `QA_USERS_PASSWORD`, else the administrator's). `signInAs('<role>')` opens any of
  them; a page spec checks the page from the role that works on it, not only from the administrator.
- **The mark is set, never worked around.** 002 pins `qaAccount` through the API as the super administrator
  (until the build with the field is deployed the server refuses it — 002 records that and goes on; the
  account is then an ordinary Trial that billing suspends on its last day, which is a finding, not a reason
  to touch billing data).
- **Never press „Choose a plan“** (the banner "Your trial has ended. Choose a plan…") **nor anything about the
  plan, the payment or the subscription** — plan pickers, upgrade / subscribe / pay buttons, card or invoice
  payment forms (the QA person, 2026-11-18). The trial of the QA account is set by the QA person by hand; a banner
  about it is reported, never acted on.

## ⚠ Channels and plugins: look, never act (the QA person, 2026-11-12)

The booking channels (1.0.11+) and the plugins reach real booking sites and real services. A test only LOOKS at
them and checks whether their buttons are enabled or disabled for the role. Never:

- connect a real channel (a connect wizard may be opened and looked at, never completed);
- switch a channel to the trial run or to live;
- press Sync now, Full sync, Push update, an import, or Airbnb's opportunities;
- install, configure, switch on or start a plugin.

## ⚠ The AI assistant and AI settings: look, never act (the QA person, 2026-11-17)

Since 1.0.18 the AI assistant (the panel on the right) carries out changes itself, and since 1.0.19 Settings › AI
assistant has automatic modes. A test only LOOKS at them. Never:

- ask the AI assistant to change anything: cancel or change a reservation, set prices or minimum stays, unblock
  dates, add charges, delete records, push to a channel, deactivate a listing, and so on;
- switch on automatic answers, the automatic publishing of review replies, or any other automatic mode in
  Settings › AI assistant;
- create an MCP key (Apps › Hostify MCP) or any other AI agent key.

## ⚠ Process rules and e-mail to guests: never (the QA person, 2026-11-23)

Since 1.0.26 a process rule can send an e-mail to the guest and to written addresses. Never create a process rule
(Settings › Process rules: no New, no "Generate with AI", no save in the builder), and never create anything else
that sends an e-mail to a guest automatically (automated messages, notifications to outside addresses). The pages
may be opened and looked at. A message written by hand is allowed only as the next section says.

## ⚠ Full coverage: what a test may do in the QA account (the QA person, 2026-11-26)

The suite now covers every menu, form and function a person of the QA account can use. The limits:

- **Messages to guests** — only to a guest WE created, with an e-mail `@hostify-qa.test`, chosen explicitly by name.
  Never "to all", never to a guest the suite did not create. Mass messages — only with our guests picked one by one.
- **Automations** — Automated tasks may be switched on and checked. Automated messages, payments, invoicing and the
  other automations: look only, until the QA person decides each one separately.
- **Finance** — invoices, expenses and transactions are created, but NEVER sent and NEVER paid.
- **Excel import of reservations** — allowed, only with our own test file holding our own data.
- **Reservations and Billing (the QA person, 2026-11-27)** — at this stage nothing is paid: every function is tested,
  reservations included (made from the Calendar and from Reservations › Add new, their details, Cancel, Alterations,
  the Excel import, the Calendar). Settings › Billing is NOT a stop: an amount, an invoice or a „Next payment“ is only
  RECORDED in the report (before / after the spec's reservations). A reservation is never deleted (the application
  refuses) — it is cancelled under the guards of `tests/helpers/seed.ts` (ours, Direct, guest `@hostify-qa.test`, nothing
  paid, automations off). Never: a card payment or any other payment, „Choose a plan“, a plugin installed.
- **Absolute, for now: the channels and the AI assistant.** No direct synchronisation with a channel — Sync, Push,
  a mapping, an import from a channel, Connect (since 1.0.32 they really reach the channel; `tests/helpers/channel-guard.ts`
  refuses every such request, in the browser and in the API helper) — and no action of the AI assistant. Process rules
  are never created.
- **Names and cleanup** — everything created is named „QA …“ and is deleted at the end of its spec; a delete that does
  not go through is a STOP: what (name, id), when, nothing retried, the QA person is told before anything else runs.
  Known leftovers (a listing or a guest the application keeps because of its linked records, a cancelled reservation)
  are named in the report and removed by the demo-data wipe of 002.

## ⚠ What a good test looks like (the QA person, 2026-11-26)

- **What was saved is checked**: the record is opened again and read through the API — the values are the same.
- **The links**: what was created is seen everywhere it should be (the reservation in the calendar, on the guest, on
  the listing; the revenue in Reporting).
- **Validation**: an empty required field and wrong values are refused.
- **Edit and delete through the form**, not only create.
- **Rights**: which roles create, which only look, which do not see.
- **Exact values**: the data are ours, so the numbers are checked too (3 nights × 100 € = 300 €).

## ⚠ Traces: never in git, never published (the QA person, 2026-11-23)

A Playwright trace (`*_trace.zip`) holds the sign-in requests with the password and every token. Traces stay in
`reports/runs/` (git-ignored) or on the archive disk (`QA_ARCHIVE_DIR`, `tools/lib/traces.mjs`); `.gitignore` refuses
`*.zip` / `*.trace`, `qa:publish` copies only screenshots and stops when a trace is staged.

## ⚠ The chain rules (never bend them)

- **Order is data.** A spec may rely only on records of LOWER-numbered specs. `npm run qa:lint` checks the
  names; a new spec takes the next free number of its block (`docs/conventions.md` → Numbering).
- **Data goes in through the forms** in the spec that tests that form — once, in its own spec. Every OTHER group
  prepares what it needs quickly through the API (`tests/helpers/api.ts`), tests, and cleans up after itself, so a
  failure hurts only its own group (the QA person, 2026-11-26). The API is otherwise for counts and verification.
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
| `bugs/new|for-verification|verified|needs-new-fix|declined/` | one file per bug, moved between the states — the hand-over to the developers' agent (`docs/bugs.md`) |
| `bugs/index.html` | the same bugs as ONE page for a person (newest first, per state, the steps, the page links, the screenshots inline) — rewritten after every run; `npm run qa:bugs:open` opens it |
| `reports/issues/<version>/<YYYY-MM-DD HH:mm>/` | the record of one run: one md per spec with issues, screenshots, `issues.json`, `README.md`; `reports/issues/<version>/release-notes.md` |
| `reports/published/` | the run summaries the QA person shared (`npm run qa:publish` commits them with `reports/issues/` and `feedback/`, and pushes) |
| `feedback/` | the QA person's notes for the developers and the agent (`npm run qa:feedback "…"`, `/qa-teach`) |
| `tools/qa.mjs` | run (spec by spec, announcing and judging each; `--tenant wipe|keep|continue`) / stop / status / tenants / bugs / summary / publish (`--github`) / feedback / lint |
| `docs/` | `conventions.md`, `selectors.md`, `pages.md`, `reporting.md`, `bugs.md`, `teaching.md` |
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
