// The night and the hour a run must end by (the QA person, 2026-11-26/27 — CLAUDE.md → „Day and night“).
//
// --until <HH:MM>   the run ends by that hour: no new spec in the last 30 minutes before it; at the hour the spec that
//                   runs is stopped, and the run's README says how far it got and what was not run. A run started inside
//                   the last 30 minutes does not start. 01:00 is the DEFAULT of --night, not an absolute limit: another
//                   hour is given with --until, `--until none` runs to the end (the person decides before such a run).
// --night           the night's order: the regression chain (it holds every spec that verifies a bug in
//                   for-verification — those are checked first by the runner itself) and then the full share of the night,
//                   A, B, C in turn (.qa/night-rotation.json); a share that did not finish is continued the next night.
// --level <l>       smoke | regression | full — the `@qa-level:` line of a spec's header (no line = regression).
import fs from 'node:fs';
import path from 'node:path';

export const SOFT_MINUTES = 30;
export const NIGHT_DEFAULT_UNTIL = '01:00';

/** The moment `HH:MM` comes next after `from` (01:00 at 18:30 is tomorrow's). Null for `none` / nothing. */
export const deadlineOf = (until, from = new Date()) => {
    if (!until || String(until).toLowerCase() === 'none') return null;
    const m = /^(\d{1,2}):(\d{2})$/.exec(String(until).trim());
    if (!m) throw new Error(`--until wants HH:MM (or none), not "${until}"`);
    const d = new Date(from);
    d.setHours(Number(m[1]), Number(m[2]), 0, 0);
    if (d <= from) d.setDate(d.getDate() + 1);
    return d;
};
export const softOf = deadline => deadline ? new Date(deadline.getTime() - SOFT_MINUTES * 60_000) : null;
export const hhmm = d => d ? `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}` : '—';

/** The `@qa-level:` of a spec (smoke | regression | full); a spec without the line is regression. */
export const levelOf = (e2eDir, file) =>
    ((fs.readFileSync(path.join(e2eDir, file), 'utf8').match(/@qa-level:\s*(smoke|regression|full)/) || [])[1]) || 'regression';

export const LEVELS = {smoke: ['smoke'], regression: ['smoke', 'regression'], full: ['smoke', 'regression', 'full']};

/**
 * The full chain's shares, one a night in turn (the plan of 2026-11-26): the heavy checks — the roles, the dark theme,
 * every column — of a group run only here. A share is the `full` specs of its blocks plus the heavy sweeps named in it;
 * the heavy sweeps leave the regression.
 */
export const SHARES = {
    A: {blocks: [[200, 299]], extra: ['011'], what: 'група 1 и 2 (Listings, Reservations, Calendar, Guests, Pricing) — пълни; 011 тъмната тема'},
    B: {blocks: [[300, 329]], extra: [], what: 'група 3 и 4 (Inbox, Owners, Finance) — пълни'},
    C: {blocks: [[330, 499]], extra: ['008'], what: 'групи 5–7 (Tasks, Reporting, Settings, Reviews) — пълни; 008 тъмната тема на платформата'}
};
export const HEAVY_SWEEPS = Object.values(SHARES).flatMap(s => s.extra);
const ORDER = ['A', 'B', 'C'];

const rotationFile = qaDir => path.join(qaDir, 'night-rotation.json');
export const readRotation = qaDir => {
    try { return JSON.parse(fs.readFileSync(rotationFile(qaDir), 'utf8')); } catch { return {next: 'A', pending: null}; }
};
export const writeRotation = (qaDir, state) => fs.writeFileSync(rotationFile(qaDir), JSON.stringify(state, null, 2) + '\n');

/** The specs of a share among `files` (by number), in number order. */
export const shareFiles = (e2eDir, files, share) => {
    const s = SHARES[share];
    const no = f => Number((f.match(/^(\d{3})/) || [])[1]);
    return files.filter(f => s.extra.some(x => f.startsWith(x)) || (levelOf(e2eDir, f) === 'full' && s.blocks.some(([a, b]) => no(f) >= a && no(f) <= b)));
};

/** The night's list: the regression chain, then tonight's share (or what the last night left of it). */
export const nightPlan = (e2eDir, files, qaDir) => {
    const regression = files.filter(f => LEVELS.regression.includes(levelOf(e2eDir, f)) && !HEAVY_SWEEPS.some(x => f.startsWith(x)));
    const rot = readRotation(qaDir);
    const share = rot.pending?.share || rot.next || 'A';
    const all = shareFiles(e2eDir, files, share);
    const left = rot.pending?.share === share ? all.filter(f => rot.pending.files.includes(f)) : all;
    return {regression, share, shareFiles: left.filter(f => !regression.includes(f))};
};

/** After the night: a share that ran to its end hands over to the next; one that did not keeps what is left. */
export const advanceRotation = (qaDir, share, notRun) => {
    const next = ORDER[(ORDER.indexOf(share) + 1) % ORDER.length];
    writeRotation(qaDir, notRun.length ? {next: share, pending: {share, files: notRun}} : {next, pending: null});
    return notRun.length ? share : next;
};

/** The README section of a run with an hour: how far it got, what was stopped, what was not run. */
export const reachedSection = ({until, deadline, finished, interrupted, notRun, endedAt, share}) => [
    '', '## Докъде стигна', '',
    `- Краен час: ${until ? `${hhmm(deadline)} (--until ${until}; нов спек не започва след ${hhmm(softOf(deadline))})` : 'без (--until none)'}${share ? ` · нощен дял ${share}` : ''}`,
    `- Последен завършен спек: ${finished.length ? finished[finished.length - 1] : '—'} (${finished.length} завършени)`,
    `- Прекъснат в крайния час: ${interrupted || 'няма'}${interrupted ? ' — почистването в края му може да не е минало; остатъците му (по списъка на създадените записи) изтрива 002 при следващия пуск' : ''}`,
    `- Непуснати (${notRun.length}): ${notRun.length ? notRun.join(', ') : 'няма'}`,
    `- Край: ${endedAt.toLocaleString('bg-BG')}`, ''
].join('\n');
