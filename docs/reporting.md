# Reporting — what a run leaves and how it reaches the developers

## During a run

`npm run qa:status` reads `reports/runs/<runId>/status.json`, which the reporter rewrites after every
test: state, how many done / passed / failed, the test running now. `npm run qa:stop` ends the run
(`.qa/run.pid`).

## After a run

`reports/runs/<runId>/`:

| File | What |
|---|---|
| `summary.md` | for a person: failures first (error, screenshot names), then the browser console per test, then the visual review per surface, then a table of every test |
| `summary.json` | the same for a program: `tests[]` with number, title, status, duration, error, `console[]`, `findings[]`, `attachments[]` |
| `status.json` | the final state |
| `<NNN>_<test>__shot-<surface>.png` | the screenshot of every probed surface, green or red |
| `<NNN>_<test>__console.json` is folded into `summary.json`; failure screenshots and traces of Playwright sit in `test-results/` |

`npm run qa:summary` prints the newest `summary.md`; `npm run qa:report` opens Playwright's HTML report
(`reports/html`, with traces of the failed tests).

`reports/runs/` is git-ignored: it is big and personal.

## Sharing a run — `npm run qa:publish`

Copies `summary.md`, `summary.json`, `status.json` and the screenshots of the FAILED tests of the newest
run (or `--run <id>`) into `reports/published/<runId>/`, commits them together with `feedback/`, and pushes.
The developers `git pull` and read `reports/published/<runId>/summary.md`; the agent reads the same files
when asked to fix a finding (`/qa-run report`).

What a developer gets per failure: the spec and test, the error (an assertion with the expected and the
received value, or a locator that never appeared), the screenshot at the moment of failure, the console of
the test, the probe findings of every surface the test opened. The screenshots of green tests stay in the
QA person's `reports/runs/` — ask for them when the eye is needed.

## How the findings are classified

| Column in `summary.md` | Meaning |
|---|---|
| Failures | the test did not pass: a journey step, a count, a presentable check, a dirty console |
| Browser console | every console error / warning, uncaught exception, failed request, 4xx / 5xx or `success:false` API answer, per test — even in green tests |
| Visual review | the probe's findings per surface: blockers and errors (they also failed the test), warnings, and `review` items (contrast, cut text) that a person judges |

A console warning or a `review` finding is not a failure by default: it is information for the person,
who decides whether it is a defect (then `/qa-teach` turns it into a red test) or noise (then
`tests/helpers/console.ts` → `IGNORE` or the probe's thresholds learn it, with the reason in a comment).
