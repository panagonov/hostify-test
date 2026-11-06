# Teaching the suite — the QA person shows, the agent writes the test

The suite covers what it was taught. A QA person sees more: a wrong default, a field that should hide, a
grid that sorts by the wrong value, a text nobody translated. The loop that turns such an observation into
a permanent check:

1. **Note it**: `npm run qa:feedback "the listing form shows Rooms before Name"` creates
   `feedback/<date>-<slug>.md` from `feedback/_template.md`. Fill in: where (menu path, record, tab), what
   you did, what you saw, what you expected, the screenshot (drop the PNG next to the note), and how often.
   A note is short; the screenshot carries the detail.
2. **Teach**: in Claude Code, `/qa-teach feedback/<date>-<slug>.md`. The agent reads the note and the
   screenshot, opens the same screen on production, reproduces, and writes the check:
   - a step in the page's existing spec, or a new numbered spec, that is **RED because of the defect** — it
     runs that spec once (`--tenant continue`, the account keeps its data) to see the red;
   - when the observation is a class (every form, every grid), the check goes into the probe or the page
     object, so every page gets it;
   - the failed check becomes the bug file in `bugs/new/` (the runner writes it: what went wrong, how to
     reproduce, the run's screenshots) — THAT file is what the developers take (`docs/bugs.md`);
   - the note gets `status: covered by <spec> — bugs/new/<file>` at its top.
3. **Share**: `npm run qa:publish` — the note and the red test reach the developers in the same push; the
   developers fix, and the test turns green in the next run. The note is closed when it does
   (`status: fixed <date>`).

What the agent must NOT do while teaching: change the application (it cannot — this repository is the
suite only), weaken a check to make it green, or mark the check as "expected to fail" (`test.fail()`): in this
suite a red check STAYS red and its bug file carries the state (new → for-verification → verified); an
"expected" failure would hide the bug from the runner.

A note that is not a defect (a wish, a question) is answered in the note itself, `status: not a defect —
<reason>`, and stays as the record of the decision.
