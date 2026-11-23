/**
 * The Playwright traces of old runs (the QA person, 2026-11-23). A trace (`reports/runs/<runId>/*_trace.zip`) holds the
 * whole network of a failed check — sign-in requests WITH THE PASSWORD and every `Authorization` token — so it never
 * goes into git or into what is published; it is only kept, on this Mac or on the archive disk.
 *
 * At the start of every run (`archiveOldTraces`): the traces of every run except the newest `QA_KEEP_TRACES` (5) and
 * the runs pinned in `.qa/keep-traces.json` are MOVED to `QA_ARCHIVE_DIR/<runId>/` (the external disk,
 * /Volumes/QA-TRACES/hostify-traces): copied as `.part`, the copy's size checked against the original, renamed, and only
 * then the original removed. The screenshots and the summaries stay in the run's folder. When the disk is not mounted,
 * not set, full or not writable, NOTHING is moved and NOTHING is deleted — a warning says why.
 *
 * Before a run (`checkFreeSpace`): the Mac must have at least 5 GB free, or the run does not start.
 */
import * as fs from 'node:fs';
import * as path from 'node:path';

const RUN_ID = /^\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}$/;
const GB = 1024 ** 3;
export const MIN_FREE_GB = 5;

const freeBytes = dir => { const s = fs.statfsSync(dir); return s.bavail * s.bsize; };
const gb = bytes => (bytes / GB).toFixed(1);
const isTrace = f => f.endsWith('.zip') || f.endsWith('.trace');

/** The runs whose traces stay on the Mac whatever their age (`.qa/keep-traces.json` → {"keep": [runId, …]}). */
export const pinnedRuns = root => {
    try { return new Set(JSON.parse(fs.readFileSync(path.join(root, '.qa', 'keep-traces.json'), 'utf8')).keep || []); } catch { return new Set(); }
};

/**
 * The archive folder when it can be used, else the reason it cannot. The disk is the first two parts of the path
 * (/Volumes/<name>): it must exist and be ANOTHER device than the repository — an unmounted disk leaves an empty
 * /Volumes/<name> or nothing, and a folder made there would fill the Mac itself. The folder is never inside the repository.
 */
export const archiveTarget = (root, dir) => {
    if (!dir) return {reason: 'QA_ARCHIVE_DIR не е зададен в .env'};
    const abs = path.resolve(dir);
    if (abs === root || abs.startsWith(root + path.sep)) return {reason: `QA_ARCHIVE_DIR (${abs}) е вътре в репото — trace-овете никога не влизат в git`};
    const parts = abs.split(path.sep).filter(Boolean);
    const mount = parts[0] === 'Volumes' && parts[1] ? path.join(path.sep, parts[0], parts[1]) : null;
    if (!mount) return {reason: `QA_ARCHIVE_DIR (${abs}) не е на външен диск (/Volumes/<име>/…)`};
    if (!fs.existsSync(mount)) return {reason: `дискът ${mount} не е включен`};
    if (fs.statSync(mount).dev === fs.statSync(root).dev) return {reason: `дискът ${mount} не е включен (пътят е на диска на Мака)`};
    try {
        fs.mkdirSync(abs, {recursive: true});
        fs.accessSync(abs, fs.constants.W_OK);
    } catch (e) { return {reason: `в ${abs} не може да се пише (${e.code || e.message})`}; }
    return {dir: abs};
};

/** The traces of the runs older than the newest `keep` and not pinned: [{runId, file, src, size}]. */
export const tracesToArchive = (runsDir, keep, pinned) => {
    if (!fs.existsSync(runsDir)) return [];
    const runs = fs.readdirSync(runsDir).filter(r => RUN_ID.test(r)).sort();
    const recent = new Set(runs.slice(-keep));
    const out = [];
    for (const runId of runs) {
        if (recent.has(runId) || pinned.has(runId)) continue;
        for (const file of fs.readdirSync(path.join(runsDir, runId)).filter(isTrace)) {
            const src = path.join(runsDir, runId, file);
            out.push({runId, file, src, size: fs.statSync(src).size});
        }
    }
    return out;
};

/**
 * Moves the old traces to the archive. Returns {moved, bytes, warning}. A file is removed from the Mac only after its
 * copy on the disk has the same size; any failure leaves the original where it is and stops the moving.
 */
export const archiveOldTraces = (root, runsDir, env) => {
    const keep = Number(env.QA_KEEP_TRACES || 5);
    const todo = tracesToArchive(runsDir, keep, pinnedRuns(root));
    if (!todo.length) return {moved: 0, bytes: 0};
    const total = todo.reduce((n, t) => n + t.size, 0);
    const target = archiveTarget(root, env.QA_ARCHIVE_DIR);
    if (!target.dir) return {moved: 0, bytes: 0, warning: `⚠ Trace-овете на ${new Set(todo.map(t => t.runId)).size} стари пуска (${todo.length} файла, ${gb(total)} GB) остават на Мака: ${target.reason}. Нищо не е преместено и нищо не е изтрито.`};
    const room = freeBytes(target.dir);
    if (room < total + GB) return {moved: 0, bytes: 0, warning: `⚠ Дискът за архива е пълен: свободно ${gb(room)} GB, трябват ${gb(total + GB)} GB. Trace-овете (${todo.length} файла) остават на Мака; нищо не е изтрито.`};
    let moved = 0, bytes = 0;
    for (const t of todo) {
        const dir = path.join(target.dir, t.runId);
        const dest = path.join(dir, t.file);
        try {
            fs.mkdirSync(dir, {recursive: true});
            fs.copyFileSync(t.src, dest + '.part');
            if (fs.statSync(dest + '.part').size !== t.size) throw new Error('копието е с друг размер');
            fs.renameSync(dest + '.part', dest);
            if (fs.statSync(dest).size !== t.size) throw new Error('копието е с друг размер');
        } catch (e) {
            try { fs.rmSync(dest + '.part', {force: true}); } catch { /* the partial copy only */ }
            return {moved, bytes, warning: `⚠ Местенето спря на ${t.runId}/${t.file}: ${e.message}. Този файл и следващите остават на Мака; нищо от тях не е изтрито.`};
        }
        fs.rmSync(t.src);
        const record = path.join(path.dirname(t.src), 'traces-archived.json');
        let list = [];
        try { list = JSON.parse(fs.readFileSync(record, 'utf8')); } catch { /* the first one */ }
        list.push({file: t.file, size: t.size, to: dest, at: new Date().toISOString()});
        fs.writeFileSync(record, JSON.stringify(list, null, 2));
        moved++; bytes += t.size;
    }
    return {moved, bytes, dir: target.dir};
};

/** At least 5 GB free on the Mac, else the reason the run does not start. */
export const checkFreeSpace = root => {
    const free = freeBytes(root);
    return free >= MIN_FREE_GB * GB ? {ok: true, free: gb(free)} : {ok: false, free: gb(free)};
};
