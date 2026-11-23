/**
 * The failed requests of a Playwright trace, as a markdown section for the developer — with every secret removed
 * (the QA person, 2026-11-23: „програмистът трябва да получава важното от trace-овете, без паролите“).
 *
 * Rows: the requests that failed — HTTP status >= 400, aborted / no answer, or a 200 whose body says it failed
 * (`"success": false`, Hydra's `{"error": -30, …}`). Columns: time (Europe/Sofia, ms), method, address, status,
 * duration, request body, answer (<= 400 characters). At most 40 rows; the app's own files a reload aborts (js, css,
 * images) are one line. The console errors of the same trace follow, with their time.
 *
 * Removed: headers (never written), the request body of the sign-in / session / password calls (never written),
 * the values of keys named like a secret (password, token, cookie, authorization, session, api key, …), JWTs,
 * `Bearer …`, hex strings of 40+ characters, e-mails outside `@hostify-qa.test`. The QA account's id stays in the
 * addresses (the QA person, 2026-11-23).
 *
 * The last guard: the text is searched for the `.env` passwords and for every Authorization / Cookie / Set-Cookie
 * value of the trace. One found → nothing is returned but `stopped` („СПРЯНО: …“), and the section is not written.
 */
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import {execFileSync} from 'node:child_process';

export const HIDE = '‹скрито›';
export const MAX_ROWS = 40;
const SECRET_KEY = /pass(word)?|token|secret|authori[sz]ation|cookie|api[-_]?key|session|otp|refresh|jwt|signature|credential/i;
const NEVER_BODY = /\/api\/(user\/login|security\/session|user\/password|user\/resetPassword|user\/setPassword)/i;

export const scrubText = s => String(s)
    .replace(/eyJ[\w-]+\.[\w-]+\.[\w-]+/g, HIDE)                    // JWT
    .replace(/Bearer\s+[\w.~+/=-]+/gi, `Bearer ${HIDE}`)
    .replace(/\b[a-f0-9]{40,}\b/gi, HIDE)                           // long hex secrets
    .replace(/[\w.+-]+@(?!hostify-qa\.test\b)[\w-]+(\.[\w-]+)+/g, '‹имейл›');
const scrubJson = v => Array.isArray(v) ? v.map(scrubJson)
    : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, SECRET_KEY.test(k) ? HIDE : scrubJson(x)]))
    : typeof v === 'string' ? scrubText(v) : v;
const scrubBody = (raw, max = 400) => {
    if (!raw) return '';
    let out;
    try { out = JSON.stringify(scrubJson(JSON.parse(raw))); } catch { out = scrubText(raw); }
    return out.length > max ? out.slice(0, max) + '…' : out;
};
const scrubUrl = u => {
    let x;
    try { x = new URL(u); } catch { return scrubText(u); }
    for (const k of [...x.searchParams.keys()]) if (SECRET_KEY.test(k)) x.searchParams.set(k, 'HIDDEN');
    let search = x.search;
    try { search = decodeURIComponent(search); } catch { /* keep it encoded */ }
    return scrubText(x.pathname + search).replace(/HIDDEN/g, HIDE);
};
const lines = file => fs.readFileSync(file, 'utf8').split('\n').filter(Boolean);
const json = l => { try { return JSON.parse(l); } catch { return {}; } };

/**
 * Reads an unzipped trace folder. `passwords`: the `.env` passwords (QA_ADMIN_PASSWORD, QA_SUPERADMIN_PASSWORD,
 * QA_USERS_PASSWORD). Returns {text} — the section, '' when nothing failed — or {stopped} when a secret would leak.
 */
export const sectionOfDir = (dir, {label = path.basename(dir), passwords = []} = {}) => {
    const res = sha => { try { return fs.readFileSync(path.join(dir, 'resources', sha), 'utf8'); } catch { return ''; } };
    const rows = [];
    const secrets = new Set(passwords.filter(Boolean));
    for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.network'))) for (const l of lines(path.join(dir, f))) {
        const s = json(l).snapshot;
        if (!s?.request) continue;
        for (const h of [...(s.request.headers || []), ...(s.response?.headers || [])])
            if (/^(authorization|cookie|set-cookie)$/i.test(h.name)) secrets.add(String(h.value).replace(/^Bearer\s+/i, ''));
        const status = s.response?.status ?? -1;
        const failure = s.response?._failureText || s._failureText || '';
        const bodyText = s.response?.content?._sha1 ? res(s.response.content._sha1) : (s.response?.content?.text || '');
        const appFalse = /"success"\s*:\s*false|^\s*\{\s*"error"\s*:\s*-?\d/.test(bodyText);
        if (!(status >= 400 || status <= 0 || failure || appFalse)) continue;
        const reqBody = NEVER_BODY.test(s.request.url) ? '' : scrubBody(s.request.postData?._sha1 ? res(s.request.postData._sha1) : s.request.postData?.text);
        rows.push({at: s.startedDateTime, ms: Math.round(s.time), method: s.request.method, url: scrubUrl(s.request.url),
            status: status > 0 ? String(status) : `прекъсната (${failure || 'няма отговор'})`, body: status > 0 ? scrubBody(bodyText) : '', reqBody});
    }
    const consoleErr = [];
    let wall = 0, mono = 0;
    for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.trace'))) for (const l of lines(path.join(dir, f))) {
        const d = json(l);
        if (d.type === 'context-options') { wall = d.wallTime; mono = d.monotonicTime; }
        if (d.type === 'console' && d.messageType === 'error') consoleErr.push({at: wall ? new Date(wall + (d.time - mono)).toISOString() : '', text: scrubText(d.text).slice(0, 200)});
    }
    if (!rows.length && !consoleErr.length) return {text: ''};
    rows.sort((a, b) => String(a.at).localeCompare(String(b.at)));
    const t = iso => new Date(iso).toLocaleTimeString('en-GB', {hour12: false, timeZone: 'Europe/Sofia'}) + '.' + new Date(iso).toISOString().slice(20, 23);
    // the app's own files (js, css, images) that a reload aborts: one line, not one row each
    const isAsset = r => /^\/app\/(static\/|[\w.-]+\.(svg|png|ico)$)/.test(r.url);
    const assets = rows.filter(isAsset);
    const api = rows.filter(r => !isAsset(r));
    const shown = api.slice(0, MAX_ROWS);
    const cell = s => s ? '`' + s.replace(/\|/g, '/') + '`' : '—';
    const out = ['### Неуспешни заявки (от trace-а, без тайни)', '',
        `Trace: \`${label}\` · ${api.length} заявки · време — Европа/София · пароли, бисквитки, Authorization и токени махнати`, ''];
    if (shown.length) out.push('| Час | Метод | Адрес | Код | мс | Тяло на заявката | Отговор |', '|---|---|---|---|---|---|---|',
        ...shown.map(r => `| ${t(r.at)} | ${r.method} | \`${r.url.replace(/\|/g, '%7C')}\` | ${r.status} | ${r.ms} | ${cell(r.reqBody)} | ${cell(r.body)} |`));
    if (api.length > shown.length) out.push('', `… и още ${api.length - shown.length} заявки (показани са първите ${MAX_ROWS}).`);
    if (assets.length) out.push('', `Освен тях: ${assets.length} файла на приложението (js / css / изображения), прекъснати в ${[...new Set(assets.map(a => t(a.at).slice(0, 8)))].join(', ')} — презареждане на страницата.`);
    if (consoleErr.length) out.push('', '**Грешки в конзолата в същия trace**', '', ...consoleErr.slice(0, MAX_ROWS).map(c => `- ${c.at ? t(c.at) + ' — ' : ''}${c.text}`));
    const text = out.join('\n');
    const leaked = [...secrets].filter(x => x && x.length >= 6 && text.includes(x));
    if (leaked.length) return {stopped: `СПРЯНО: ${leaked.length} тайни щяха да влязат в текста — разделът не се пише`};
    return {text};
};

/** The same from a `*_trace.zip`: unzipped into a temporary folder that is removed afterwards. */
export const sectionOfZip = (zip, options = {}) => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'qa-trace-'));
    try {
        execFileSync('unzip', ['-q', '-o', zip, '-d', tmp], {stdio: 'ignore'});
        return sectionOfDir(tmp, {label: path.basename(zip), ...options});
    } catch (e) {
        return {text: '', error: String(e.message || e).split('\n')[0]};
    } finally {
        fs.rmSync(tmp, {recursive: true, force: true});
    }
};
