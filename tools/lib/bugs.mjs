/**
 * The bugs the suite found, ONE FILE PER BUG, in a folder per state — the hand-over between the QA person and the
 * developers (the user, 2026-11-05):
 *
 *   bugs/new/               the runner writes a bug here when a check fails for the first time (per version + signature)
 *   bugs/for-verification/  the developers' agent moves a bug here after fixing it (a "## Fix" section says what and where)
 *   bugs/verified/          the runner moves it here when its check passes again
 *   bugs/needs-new-fix/     the runner moves it here when its check fails again after a fix — the developers take it again
 *   bugs/declined/          the developers' agent moves it here with the reason (not a defect / by design / out of scope);
 *                           the runner still marks it "seen again", never files it anew; the QA person may reopen (move to new)
 *
 * A bug seen again (same version, same signature) is NOT a new file: its file gets a "seen again" line. A bug in
 * for-verification is checked WITH PRIORITY at the next run (tools/qa.mjs: its spec runs first on the account that
 * holds its data). File name: <version>--<NNN-spec>--<check>--<id>.md; the frontmatter carries the facts a program
 * reads, the sections what a person reads (what went wrong, how to reproduce, screenshots).
 *
 * Every bug has a NUMBER, `QA-<n>` (frontmatter `bug`, the title's prefix) — the name people and agents use: the
 * developers' fix commit is `fix(QA-<n>): …`, so the release's change history (GET /version/changelog) names the bugs
 * it fixes and the runner's release notes list them (the user, 2026-11-06). The runner gives the next free number when
 * it files a bug; a number is never changed or reused. A file from before the numbering gets its number from
 * `ensureNumbers` — in the order the bugs were found, so every clone of the repository gives the same numbers.
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as crypto from 'node:crypto';

export const STATES = ['new', 'for-verification', 'verified', 'needs-new-fix', 'declined'];
export const dirOf = (root, state) => path.join(root, 'bugs', state);

const slug = s => s.toLowerCase().replace(/[^a-z0-9а-я]+/gi, '-').replace(/^-+|-+$/g, '').slice(0, 50);
/** Local date and time to the minute — the same clock as the run ids and the issues folders. */
const now = () => { const d = new Date(); const p = n => String(n).padStart(2, '0'); return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`; };
export const idOf = signature => crypto.createHash('sha1').update(signature).digest('hex').slice(0, 8);

/** Frontmatter + body of a bug file. */
export const parse = text => {
    const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    if (!m) return {meta: {}, body: text};
    const meta = {};
    for (const line of m[1].split('\n')) {
        const i = line.indexOf(':');
        if (i < 0) continue;
        const key = line.slice(0, i).trim();
        let value = line.slice(i + 1).trim();
        if (value.startsWith('[') && value.endsWith(']')) value = value.slice(1, -1).split(',').map(v => v.trim().replace(/^"|"$/g, '')).filter(Boolean);
        else value = value.replace(/^"|"$/g, '');
        meta[key] = value;
    }
    return {meta, body: m[2]};
};

const fm = meta => '---\n' + Object.entries(meta).map(([k, v]) => `${k}: ${Array.isArray(v) ? `[${v.map(x => `"${x}"`).join(', ')}]` : `"${String(v).replace(/"/g, "'")}"`}`).join('\n') + '\n---\n';

/** Every bug file of every state (or one state), with its parsed meta. */
export const list = (root, states = STATES) => {
    const out = [];
    for (const state of states) {
        const dir = dirOf(root, state);
        if (!fs.existsSync(dir)) continue;
        for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.md')).sort()) {
            const text = fs.readFileSync(path.join(dir, file), 'utf8');
            out.push({state, file, path: path.join(dir, file), ...parse(text), text});
        }
    }
    return out;
};

/** The bug with this signature in any state (the id is the signature's hash). */
export const find = (root, signature) => list(root).find(b => b.meta.id === idOf(signature)) || null;

// ── the bug numbers ──────────────────────────────────────────────────────────────────────────────────────────────
export const NUMBER_PREFIX = 'QA-';
/** "QA-7" → 7; anything else → null. */
export const numberValue = label => { const m = /^QA-(\d+)$/.exec(String(label || '').trim()); return m ? Number(m[1]) : null; };
/** Every `QA-<n>` named in a text (a commit subject, a release note), in order, once each. */
export const numbersIn = text => [...new Set(String(text || '').match(/\bQA-\d+\b/g) || [])];
/** The bug with this number (`QA-7` or 7) in any state. */
export const byNumber = (root, label) => {
    const n = typeof label === 'number' ? label : numberValue(label);
    return n === null ? null : list(root).find(b => numberValue(b.meta.bug) === n) || null;
};
/** The meta with `bug` right after `id`, so the number is the second line of every file. */
const withNumber = (meta, label) => {
    const {id, bug, ...rest} = meta;
    return {...(id !== undefined ? {id} : {}), bug: label, ...rest};
};

/**
 * Numbers every bug file that has none yet: the next free numbers, in the order the bugs were found (`created`, then
 * `found`, then the file name), and the title gets the number in front. Returns the files it numbered.
 */
export const ensureNumbers = root => {
    const all = list(root);
    let next = Math.max(0, ...all.map(b => numberValue(b.meta.bug) || 0)) + 1;
    const key = b => `${b.meta.created || ''}|${b.meta.found || ''}|${b.file}`;
    const numbered = [];
    for (const b of all.filter(x => numberValue(x.meta.bug) === null).sort((a, z) => key(a).localeCompare(key(z)))) {
        const label = `${NUMBER_PREFIX}${next++}`;
        const body = b.body.replace(/^(\s*)# (?!QA-\d+ · )/, `$1# ${label} · `);
        fs.writeFileSync(b.path, fm(withNumber(b.meta, label)) + body);
        numbered.push({file: b.file, state: b.state, bug: label});
    }
    return numbered;
};

const appendHistory = (bugPath, line) => {
    const text = fs.readFileSync(bugPath, 'utf8');
    const marker = '\n## История\n';
    const updated = text.includes(marker) ? text.replace(marker, `${marker}\n- ${line}`) : `${text.trimEnd()}\n${marker}\n- ${line}\n`;
    fs.writeFileSync(bugPath, updated);
};

/**
 * A failed check of a run: a new bug file in bugs/new, or a "seen again" line on the file that exists in any state.
 * Returns {state, file, fresh, bug} — `bug` is its number, `QA-<n>`.
 */
export const record = (root, {version, spec, description, test, signature, runId, runFolder, tenant, body, screenshots}) => {
    ensureNumbers(root);
    const existing = find(root, signature);
    const stamp = now();
    if (existing) {
        appendHistory(existing.path, `${stamp} — видян отново в пуска ${runId} (версия ${version}, акаунт „${tenant}“), папка \`${runFolder}\``);
        setMeta(existing.path, {seenIn: [...new Set([...(Array.isArray(existing.meta.seenIn) ? existing.meta.seenIn : []), runId])], lastSeen: runId, lastSeenVersion: version});
        return {state: existing.state, file: existing.file, fresh: false, bug: existing.meta.bug};
    }
    const id = idOf(signature);
    const label = `${NUMBER_PREFIX}${Math.max(0, ...list(root).map(b => numberValue(b.meta.bug) || 0)) + 1}`;
    const check = test.split(' › ').slice(-1)[0];
    const file = `${version}--${spec}--${slug(check)}--${id}.md`;
    const meta = {id, bug: label, status: 'new', version, spec, description, test: check, signature, tenant, found: runId, foundFolder: runFolder, seenIn: [runId], lastSeen: runId, lastSeenVersion: version, created: stamp};
    // the file lives in bugs/<state>/ — two levels under the root; the screenshots stay in the run's folder
    const rel = p => `../../${encodeURI(p)}`;
    const lines = [
        `# ${label} · ${spec} — ${check}`, '',
        `- Версия на приложението: **${version}** · Акаунт: ${tenant} · Намерен в пуска ${runId}`,
        `- Спек: \`tests/e2e/${spec}.spec.ts\` — ${description}`,
        `- Папка на пуска: [${runFolder}](${rel(runFolder)})`, '',
        body.trim(), ''
    ];
    if (screenshots?.length) lines.push('**Скрийншоти**', '', ...screenshots.map(s => `![${path.basename(s)}](${rel(s)})`), '');
    lines.push('## История', '', `- ${stamp} — намерен в пуска ${runId}`, '');
    fs.mkdirSync(dirOf(root, 'new'), {recursive: true});
    fs.writeFileSync(path.join(dirOf(root, 'new'), file), fm(meta) + '\n' + lines.join('\n'));
    return {state: 'new', file, fresh: true, bug: label};
};

export const setMeta = (bugPath, patch) => {
    const text = fs.readFileSync(bugPath, 'utf8');
    const {meta, body} = parse(text);
    fs.writeFileSync(bugPath, fm({...meta, ...patch}) + body);
};

/** Moves a bug to another state folder, records why; returns the new path. */
export const move = (root, bug, state, note) => {
    const target = path.join(dirOf(root, state), bug.file);
    fs.mkdirSync(dirOf(root, state), {recursive: true});
    fs.renameSync(bug.path, target);
    setMeta(target, {status: state, moved: now()});
    appendHistory(target, note);
    return target;
};

/** The spec numbers of the bugs waiting for verification, with their files. */
export const waitingVerification = root => list(root, ['for-verification']);
