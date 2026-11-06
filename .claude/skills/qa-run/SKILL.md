---
name: qa-run
description: "Use to run, stop, watch, read or publish a run of the Hostify production QA suite, or to explain what a result means — „пусни тестовете“, „спри“, „какво стана“, „публикувай резултата“."
user-invocable: true
allowed-tools: Read Grep Glob Bash
argument-hint: "run [--only NNN | --from NNN --to NNN] [--headed] | stop | status | report [--run id] | publish"
---

# qa-run — running the suite

Everything is `node tools/qa.mjs <command>` (the npm scripts in `package.json` wrap it). Answer in Bulgarian.
**The person says what to run; YOU run it** (CLAUDE.md → The run rule) — through Bash, and relay the runner's
lines: `пускам тест <NNN-name> — <описание>` before each spec, the verdict after each, the issues folder
`reports/issues/<version>/<YYYY-MM-DD HH:mm>/` at the end — new issues first, known ones as known. Never ask the person to type the command themselves.

| Ask | Do |
|---|---|
| run everything | `npm run qa:run` — the whole chain in number order, spec by spec; takes long (hundreds of pages). Relay each `пускам тест …` line and each verdict as they come |
| run one spec / a block | `npm run qa:run -- --only 002`, `--from 100 --to 199`; the browser is VISIBLE by default (the person watches), `--headless` for a background run; `-- --grep "<text>"` after the double dash goes to Playwright |
| stop | `npm run qa:stop` |
| what is going on | `npm run qa:status` → state, done / passed / failed, the test running now |
| read a result | `npm run qa:summary` (the newest run) or Read `reports/runs/<id>/summary.md`; the screenshots are next to it; `npm run qa:report` opens Playwright's HTML with traces |
| publish for the developers | `npm run qa:publish` → `reports/published/<id>/` + `reports/issues/` + `bugs/` + `feedback/` committed and pushed; `-- --github` also opens / comments GitHub issues (see docs/bugs.md) |
| the bugs | `npm run qa:bugs` — per state; `docs/bugs.md` explains the states and the file |

## Before a run — the account

`npm run qa:tenants` shows the accounts and what each reached. Ask the person what to do with the active one and
pass it: `--tenant wipe` (empty it, the chain from 001), `--tenant keep` (leave it for verifications, start a new
account), `--tenant continue` (go on in it; 002 is left out; `--only NNN` re-runs one spec on its data). A bug in
`bugs/for-verification/` is checked first when the account holds its data — say which ones will be verified.
`--account <n>` returns to a kept account.

## Before a run — the version

Say the version the runner printed. A NEW version: Read `reports/issues/<version>/release-notes.md`, name the
pages / specs its notes touch (menu names, entities, fixes) and propose running them first — above all the bugs of
its „Поправени бъгове според версията“ (`QA-<n>`, each with its spec and state: a bug in `for-verification` is
verified with priority on an account that holds its data; a number in another state, or not in `bugs/`, is said); then the known
issues of the previous version (`reports/issues/<previous>/<last folder>/README.md`) to see them fixed. The
SAME version: say that repeated issues will be marked known.

## Bug numbers

Every bug is `QA-<n>` (frontmatter `bug`, the title) — name it so to the person, in the summary and in the
publish message; the runner numbers a file from before the numbering itself (`npm run qa:bugs`). Never renumber
and never edit a number by hand (`docs/bugs.md` → The number).

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
