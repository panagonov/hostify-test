---
name: qa-teach
description: "Use when the QA person shows something the tests missed (a note in feedback/, a screenshot, a sentence): reproduce it on production, write the test that is RED because of it, record the note — „това не е наред, а тестът го пропуска“."
user-invocable: true
allowed-tools: Read Grep Glob Bash Write Edit
argument-hint: "feedback/<date>-<slug>.md | \"<what is wrong>\""
---

# qa-teach — from an observation to a red test

Answer in Bulgarian. The flow: `docs/teaching.md`. The convention: a defect gets a test that is RED
because of it BEFORE anything else; green on the first run means the test does not catch it — rework.

## Steps

1. **Read the note** (or write one from the sentence: `npm run qa:feedback "<title>"`, then fill it) and
   LOOK at its screenshot. Restate the defect in one sentence and the expected behaviour in one.
2. **Reproduce on production** in the QA account: the same menu path, the same record. If it does not
   reproduce, say so with what you saw; do not write a test for a thing that is not there.
3. **Decide the level**:
   - one page, one behaviour → a step in that page's spec (`/qa-page` rules), or a new numbered spec when the
     page has none yet;
   - a class (every form, every grid, every page) → the probe (`tests/helpers/probe.ts`), the console rules
     (`tests/helpers/console.ts`) or a page object — every page inherits it;
   - a missing `data-test` behind it → `docs/selectors.md` → Gaps.
4. **Write the check so it fails on the CAUSE**, then run that spec (`node tools/qa.mjs run --only NNN
   --tenant continue` — the account keeps its data) and see the red. The runner turns the failed check into the
   bug file `bugs/new/<version>--<spec>--<check>--<id>.md` (what went wrong, how to reproduce, the screenshots)
   — that file is the hand-over to the developers. NEVER `test.fail()` / "expected to fail": a red check stays
   red; its bug file carries the state, and a known one is „видян отново“, not noise.
5. **Close the loop**: the note gets `status: covered by <spec> — bugs/new/<file>` at its top (and the bug file's
   history gets a line „от бележка feedback/<note>“); `npm run qa:check`; tell the person to `npm run qa:publish`.

## Never

Weaken a check to make it pass; change the application (this repository is the suite); mark a check as
expected-to-fail (it would hide the bug from the runner); decide that the person is wrong without
reproducing — when the screen says otherwise, show the screenshot and explain.
