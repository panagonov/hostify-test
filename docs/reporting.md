# Reporting — what a run leaves and how it reaches the developers

## During a run

`npm run qa:status` reads `reports/runs/<runId>/status.json`, which the reporter rewrites after every
test: state, how many done / passed / failed, the test running now. `npm run qa:stop` ends the run
(`.qa/run.pid`).

## After a run

`reports/runs/<runId>/`:

| File | What |
|---|---|
| `summary.md` | for a person: every failure with **what went wrong** (the error, the page's own API / console errors, the probe's blockers), **how to reproduce** (who signs in, the menu texts clicked, the URL, the test's steps, where to look in the developer tools) and the **screenshots**; then the browser console per test; then the visual review (contrast and cut text as unique texts with the number of surfaces); then a table of every test |
| `summary.json` | the same for a program: `tests[]` with number, title, status, duration, error, `console[]`, `findings[]`, `attachments[]` |
| `status.json` | the final state |
| `<NNN>_<test>__shot-<surface>.png` | the screenshot of every probed surface, green or red |
| `<NNN>_<test>__console.json` is folded into `summary.json`; failure screenshots and traces of Playwright sit in `test-results/` |

`npm run qa:summary` prints the newest `summary.md`; `npm run qa:report` opens Playwright's HTML report
(`reports/html`, with traces of the failed tests).

`reports/runs/` is git-ignored: it is big and personal.

## The issues folder — `reports/issues/<version>/<YYYY-MM-DD HH:mm>/`

One folder per run under the application's VERSION (the runner asks the API before the run; every answer carries
`version`, the navbar footer shows it), named by the run's start (local time, to the minute — the folders sort by
name into time order, newest last), written by the runner as the run goes: one `<NNN-name>.md` per spec that had issues — for every failed
check: what went wrong (the error, the page's own API / console errors, the probe's blockers), how to reproduce
(who signs in, the menu texts, the URL, the steps, where to look in the developer tools), the screenshots copied
next to it, the console warnings — and a `README.md` with the list. The folder is tracked in git: this is the
hand-over to the developers' agent in the Hostify project, which analyses and fixes. The suite never fixes.

`issues.json` holds the signatures of the run's issues (spec, check, first error line, API answers). On the SAME
version, an issue found in the version's previous folder is „известен от <папка>“ — same md, same README, but
not news; the developers look at the „нов“ ones. `reports/issues/<version>/release-notes.md` (written once per
version from `GET /version/changelog`: this release and every one since the last tested version) tells the agent
which pages and specs a new version touches — they run first, and the previous version's known issues are
checked for being fixed.

## Sharing a run — `npm run qa:publish`

Copies `summary.md`, `summary.json`, `status.json` and the screenshots of the FAILED tests of the newest
run (or `--run <id>`) into `reports/published/<runId>/`, commits them together with `reports/issues/` and
`feedback/`, and pushes.
The developers `git pull` and read `reports/published/<runId>/summary.md`; the agent reads the same files
when asked to fix a finding (`/qa-run report`).

What a developer gets per failure: the spec and test, the error (an assertion with the expected and the
received value, or a locator that never appeared), the screenshot at the moment of failure, the console of
the test, the probe findings of every surface the test opened. The screenshots of green tests stay in the
QA person's `reports/runs/` — ask for them when the eye is needed.

## No data of other accounts in a report

The reports are shared with the developers and pushed to git: they show the QA account only (the QA person,
2026-11-10).

- The probe's screenshot of a platform page (`/app/platform…`, `/app/apps…`) masks the grid rows, list items and
  dropdown options (`tests/helpers/probe.ts` → `platformMask`); its cut-text and low-contrast findings there say where
  and how, never the words. The failure screenshot is the same: Playwright's own is off (`playwright.config.ts`), the
  `qaConsole` fixture takes it with the same mask and attaches it as `screenshot` (`tests/helpers/fixtures.ts`).
- A spec on a platform grid searches it for the QA account's own records (the administrator by the local part of the
  e-mail, `qa.admin`, not the whole address: the whole one finds every address with "hostify") and ends on a page of
  the QA account, so Playwright's failure screenshot shows no one else.
- A screenshot, trace or text that slipped through is removed from the current state and its link becomes
  „снимката е махната от QA“. Older commits keep it: clearing the history is the developers' decision (a rewrite and
  a force push).

## How the findings are classified

| Column in `summary.md` | Meaning |
|---|---|
| Failures | the test did not pass: a journey step, a count, a presentable check, a dirty console |
| Browser console | every console error / warning, uncaught exception, failed request, 4xx / 5xx or `success:false` API answer, per test — even in green tests |
| Visual review | the probe's findings per surface: blockers and errors (they also failed the test), warnings, and `review` items (contrast, cut text) that a person judges |

A console warning or a `review` finding is not a failure by default: it is information for the person,
who decides whether it is a defect (then `/qa-teach` turns it into a red test) or noise (then
`tests/helpers/console.ts` → `IGNORE` or the probe's thresholds learn it, with the reason in a comment).
