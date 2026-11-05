---
name: qa-run
description: "Use to run, stop, watch, read or publish a run of the Hostify production QA suite, or to explain what a result means — „пусни тестовете“, „спри“, „какво стана“, „публикувай резултата“."
user-invocable: true
allowed-tools: Read Grep Glob Bash
argument-hint: "run [--only NNN | --from NNN --to NNN] [--headed] | stop | status | report [--run id] | publish"
---

# qa-run — running the suite

Everything is `node tools/qa.mjs <command>` (the npm scripts in `package.json` wrap it). Answer in Bulgarian.

| Ask | Do |
|---|---|
| run everything | `npm run qa:run` — the whole chain in number order; takes long (hundreds of pages). Say how to watch: `npm run qa:status` in another terminal |
| run one spec / a block | `npm run qa:run -- --only 002`, `--from 100 --to 199`; `--headed` opens the browser; `-- --grep "<text>"` after the double dash goes to Playwright |
| stop | `npm run qa:stop` |
| what is going on | `npm run qa:status` → state, done / passed / failed, the test running now |
| read a result | `npm run qa:summary` (the newest run) or Read `reports/runs/<id>/summary.md`; the screenshots are next to it; `npm run qa:report` opens Playwright's HTML with traces |
| publish for the developers | `npm run qa:publish` → `reports/published/<id>/` committed and pushed (see docs/reporting.md) |

## Reading a result for the person

Lead with the verdict (how many failed, which), then per failure: the spec and the step, what the error says
in plain words, the screenshot to look at. Then the console section (only what is new), then the visual
review (contrast, cut text — the person judges, the agent names the surfaces). Never say "green" when the
console section is not empty — say "green with N console warnings".

## Rules

- Never run two suites at once (`qa.mjs run` refuses while `.qa/run.pid` is alive).
- A run writes to PRODUCTION's QA account only. Never change `.env` to another account to "test faster".
- A failure that is an environment problem (no network, wrong password in `.env`) is said as such, not as a defect.
- The first spec that fails stops the trust in every spec after it (the chain): report the FIRST failure first.

Details: `docs/reporting.md`, `docs/conventions.md`.
