# Bugs — the hand-over between the QA person and the developers

One file per bug, in a folder per state (`bugs/`). The runner writes and moves them; the developers' agent
(`/qa-fix` in the Hostify project) moves them after a fix. Everything travels through git (`npm run qa:publish`
commits and pushes; the developers `git pull` in `qa-test/`); with `QA_GITHUB_TOKEN` in `.env`, `qa:publish --github`
also opens a GitHub issue per new bug, comments on every state change and closes it when verified.

`bugs/index.html` renders every bug file as ONE page for a person — the newest first, per state, with the steps,
the page's link and the screenshots inline — rewritten at the end of every run and by `npm run qa:bugs:open`
(`tools/lib/bugsHtml.mjs`, no dependency; the file is tracked, so the developers see the same page).

## The states

| Folder | Who moves a bug here | When |
|---|---|---|
| `bugs/new/` | the runner | a check failed for the first time on this version (a new signature) |
| `bugs/for-verification/` | the developers' agent, after fixing | the fix is in the code (a `## Fix` section says what, where, which version carries it) |
| `bugs/verified/` | the runner | the bug's check passed again — the fix is confirmed |
| `bugs/needs-new-fix/` | the runner | the bug's check failed again after a fix — the developers take it once more |
| `bugs/declined/` | the developers' agent, with the reason | not a defect / by design / out of scope — the runner still marks it „видян отново“, never files it anew; the QA person may move it back to `new` to reopen |

A bug seen again (the same version, the same signature) is never a second file: its file gets a „видян отново“
line under `## История`. A bug of a NEW version with the same signature is a new file (the version is in the name).

## A bug the QA person found by eye

The runner files only what a CHECK catches. When the QA person sees something the tests miss, she writes a note
in `feedback/` (with her screenshot) and asks `/qa-teach`: the agent reproduces it on production, writes the check
that is RED because of it (a step in the page's spec, or a probe rule for a class of defect), runs that spec — and
the failed check becomes the bug file in `bugs/new/` like any other, with the steps to reproduce and the run's
screenshots; the note gets `status: covered by <spec> — bugs/new/<file>`. No `test.fail()` / "expected to fail" in
this suite: a red check stays red and its bug file carries the state; a known bug is „видян отново“, not noise.

## Priority of the verifications

At the start of a run the runner reads `bugs/for-verification/`: every bug whose spec can run on the active
account's data (the account reached that spec or further, mode `continue`) is run FIRST; a bug whose data the
account does not hold is announced („ще стане, когато веригата мине през …“) and checked when the chain gets
there. After the spec: the signature failed again → `needs-new-fix`; the spec ran and the signature did not fail →
`verified`.

## The accounts and their data

Verifying a fix in spec 300 needs the records of 100–299. So the suite keeps several accounts
(`.qa/tenants.json`, `npm run qa:tenants`): "QA Automation", "QA Automation 2", … — each knows the spec it
REACHED. Before a run the runner asks (or takes `--tenant`):

- **wipe** — empty the active account (002) and start the chain over on it;
- **keep** — leave the active account as it is, for verifications, and start a NEW account for the fresh chain
  (its administrator `qa.admin.<n>@…`, its people `qa.<role>.<n>@…`, the same passwords);
- **continue** — go on in the active account without wiping (002 is left out): a spec re-run there cleans its own
  records first, so nothing is duplicated.

`--account <n>` makes a kept account active again (to verify on its data). `npm run qa:tenants -- --retire <n>`
marks one as abandoned; its data stays on the platform until a super administrator hides it or a `--tenant wipe`
run on it empties it.

## The file

```
---
id: "3f9a1c2e"            # the hash of the signature
status: "new"
version: "1.0.3"
spec: "005-platform-pages"
description: "проверка на навбар менютата…"
test: "consoleActions opens (/app/platformLogs/consoleActions)"
signature: "<spec>|<check>|<first error line>|<API answers>"
tenant: "QA Automation"
found: "2026-11-05_13-17-15"
foundFolder: "reports/issues/1.0.3/2026-11-05 13:17"
seenIn: ["2026-11-05_13-17-15", …]
lastSeen: …  lastSeenVersion: …  created: …
---
# <spec> — <check>
- Версия · Акаунт · Намерен в пуска …
**Какво се обърка**   (the error, the page's API / console errors, the probe's blockers)
**Как да се възпроизведе**   (who signs in, the menu, the URL, the steps, where to look in the dev tools)
**Скрийншоти**   (paths into the run's folder, tracked in git)
## Fix   (written by the developers' agent: what was changed, where, the version that carries it, how to verify)
## История   (one line per event: found, seen again, moved, verified)
```

The developers' agent reads the frontmatter and the sections, reproduces with the screenshots, fixes in the
Hostify code (a RED test first, as every defect there), writes `## Fix`, sets `status: for-verification`, moves the
file, commits and pushes. Never edit the signature.
