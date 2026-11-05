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
4. **Write the check so it fails on the CAUSE**, run it, see the red, paste the red line into the note.
   A check that must stay red while the developers fix it is marked `test.fail()` with a line
   `Open defect: <reason> (<date>)` next to it — never a bare skip.
5. **Close the loop**: the note gets `status: covered by <spec> (<date>)`; `npm run qa:check`; tell the
   person to `npm run qa:publish`.

## Never

Weaken a check to make it pass; change the application (this repository is the suite); mark a test as
expected-to-fail without the dated `Open defect:` line; decide that the person is wrong without
reproducing — when the screen says otherwise, show the screenshot and explain.
