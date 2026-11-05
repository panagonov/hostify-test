/**
 * The registry of the suite's accounts on the platform — `.qa/tenants.json` (git-ignored: it holds ids of the
 * production database, and every QA machine has its own).
 *
 * Every account is "QA Automation <n>" (the first one plain "QA Automation"), administrator `qa.admin.<n>@…`, people
 * `qa.<role>.<n>@…`. One account is ACTIVE: the specs work in it. Each account knows the spec it REACHED (the highest
 * number that passed on it in chain order) — a kept account with its data lets a fixed bug in spec 300 be verified
 * by running 300 alone, without the chain before it.
 *
 * Modes of a run (`run --tenant …`, asked on a terminal when absent):
 *   wipe      — the active account is emptied by 002 and the chain starts over on it (the default when nothing is kept)
 *   keep      — the active account is KEPT as it is (for verifications) and a NEW account starts the chain
 *   continue  — the active account goes on from where it is: no wipe, 002 is left out, only the chosen specs run
 */
import * as fs from 'node:fs';
import * as path from 'node:path';

export const FILE = root => path.join(root, '.qa', 'tenants.json');

export const read = root => {
    try { return JSON.parse(fs.readFileSync(FILE(root), 'utf8')); } catch { return {active: null, tenants: []}; }
};

export const write = (root, registry) => {
    fs.mkdirSync(path.dirname(FILE(root)), {recursive: true});
    fs.writeFileSync(FILE(root), JSON.stringify(registry, null, 2) + '\n');
};

export const nameOf = (base, number) => number > 1 ? `${base} ${number}` : base;
export const emailOf = (base, number) => {
    const [local, domain] = base.split('@');
    return number > 1 ? `${local}.${number}@${domain}` : base;
};

export const active = root => {
    const r = read(root);
    return r.tenants.find(t => t.number === r.active) || null;
};

/** The active account, created in the registry when there is none (number 1). */
export const ensureActive = (root, env) => {
    const r = read(root);
    if (!r.tenants.length) {
        r.tenants.push(entry(1, env));
        r.active = 1;
        write(root, r);
    }
    return active(root);
};

const entry = (number, env, extra = {}) => ({
    number,
    name: nameOf(env.QA_TENANT_NAME || 'QA Automation', number),
    adminEmail: emailOf(env.QA_ADMIN_EMAIL || 'qa.admin@hostify-qa.test', number),
    accountEmail: emailOf(env.QA_TENANT_EMAIL || 'qa.account@hostify-qa.test', number),
    id: null,
    status: 'active',            // active | kept | retired
    createdAt: new Date().toISOString(),
    reached: null,               // the highest spec number that passed on it, in chain order
    failedAt: null,
    version: null,
    runs: [],
    ...extra
});

/** `keep`: the active account stays as it is; a new one becomes active. Returns the new entry. */
export const keepAndStartNew = (root, env) => {
    const r = read(root);
    const current = r.tenants.find(t => t.number === r.active);
    if (current) current.status = 'kept';
    const number = Math.max(0, ...r.tenants.map(t => t.number)) + 1;
    const next = entry(number, env);
    r.tenants.push(next);
    r.active = number;
    write(root, r);
    return next;
};

/** Switch the active account to another number (a kept one, to verify on its data). */
export const activate = (root, number) => {
    const r = read(root);
    const t = r.tenants.find(x => x.number === Number(number));
    if (!t) throw new Error(`no account number ${number} in .qa/tenants.json`);
    const current = r.tenants.find(x => x.number === r.active);
    if (current && current.number !== t.number && current.status === 'active') current.status = 'kept';
    t.status = 'active';
    r.active = t.number;
    write(root, r);
    return t;
};

/** After a spec: the account's progress (reached / failedAt), its version and the run. */
export const recordProgress = (root, number, {specNumber, passed, runId, version, id}) => {
    const r = read(root);
    const t = r.tenants.find(x => x.number === number);
    if (!t) return;
    if (id) t.id = id;
    if (version) t.version = version;
    if (!t.runs.includes(runId)) t.runs.push(runId);
    const n = Number(specNumber);
    if (passed) {
        if (t.reached === null || n > Number(t.reached)) t.reached = String(specNumber).padStart(3, '0');
        if (t.failedAt && Number(t.failedAt) === n) t.failedAt = null;
    } else {
        t.failedAt = String(specNumber).padStart(3, '0');
    }
    write(root, r);
};

/** `wipe` resets the progress of the active account (002 empties it). */
export const resetProgress = (root, number) => {
    const r = read(root);
    const t = r.tenants.find(x => x.number === number);
    if (t) { t.reached = null; t.failedAt = null; t.wipedAt = new Date().toISOString(); }
    write(root, r);
};

export const describe = t => t ? `${t.name}${t.id ? ` (${t.id.slice(0, 8)}…)` : ' (not created yet)'} — ${t.status}, reached ${t.reached || 'nothing'}${t.failedAt ? `, failed at ${t.failedAt}` : ''}${t.version ? `, version ${t.version}` : ''}` : 'none';
