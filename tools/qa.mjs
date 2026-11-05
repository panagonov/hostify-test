#!/usr/bin/env node
/**
 * The QA commands (no dependencies). The AGENT runs them when the QA person asks (CLAUDE.md → The run rule):
 *   node tools/qa.mjs run [--headless] [--only 002] [--from 010] [--to 199] [-- <playwright args>]
 *       spec files ONE BY ONE, in number order, a VISIBLE browser by default; before each: "пускам тест …",
 *       after each: the verdict; the issues of the run → reports/issues/<YYYY-MM-DD HH:mm>/ (one md per spec)
 *   node tools/qa.mjs stop            # stops the run started with `run`
 *   node tools/qa.mjs status          # the live status of the newest run
 *   node tools/qa.mjs summary [--run <id>]
 *   node tools/qa.mjs publish [--run <id>] [--no-push]   # reports/published/<id>/ + reports/issues + feedback → git commit + push
 *   node tools/qa.mjs feedback "<title>"                  # a new note in feedback/ for the developers / the agent
 *   node tools/qa.mjs lint            # the numbering, header and description rules of tests/e2e
 */
import {spawn, execSync} from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const QA_DIR = path.join(ROOT, '.qa');
const PID_FILE = path.join(QA_DIR, 'run.pid');
const RUNS = path.join(ROOT, 'reports', 'runs');
const ISSUES = path.join(ROOT, 'reports', 'issues');
const E2E = path.join(ROOT, 'tests', 'e2e');

const args = process.argv.slice(2);
const command = args.shift() || 'help';
const flag = name => {
    const i = args.indexOf(name);
    if (i < 0) return undefined;
    const value = args[i + 1];
    args.splice(i, value && !value.startsWith('--') ? 2 : 1);
    return value && !value.startsWith('--') ? value : true;
};

const readJson = (file, fallback = null) => {
    try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return fallback; }
};
const pad = n => String(n).padStart(2, '0');
const runStamp = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}`;
/** The issues folder of a run: the local date and time to the minute, so the folders sort by name into time order. */
const issuesStamp = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;

const latestRun = () => {
    const explicit = flag('--run');
    if (explicit) return path.join(RUNS, explicit);
    const latest = readJson(path.join(RUNS, 'latest.json'));
    return latest?.dir || null;
};

const specFiles = () => fs.existsSync(E2E) ? fs.readdirSync(E2E).filter(f => f.endsWith('.spec.ts')).sort() : [];

/** `.env` of the project (never committed) — the runner needs the base URL and a sign-in to ask the version. */
const readEnv = () => {
    const env = {...process.env};
    try {
        for (const raw of fs.readFileSync(path.join(ROOT, '.env'), 'utf8').split('\n')) {
            const line = raw.trim();
            if (!line || line.startsWith('#') || !line.includes('=')) continue;
            const [key, ...rest] = line.split('=');
            if (env[key.trim()] === undefined) env[key.trim()] = rest.join('=').trim().replace(/^["']|["']$/g, '');
        }
    } catch { /* no .env */ }
    return env;
};

/**
 * The version of the application under test, and its change history — every API answer carries `version`, the
 * navbar footer shows it, and GET /version/changelog lists the releases (version, date, title, note, commits).
 * Asked once per run; written to .qa/version.json for the specs and the reporter.
 */
const fetchVersion = async () => {
    const env = readEnv();
    const base = (env.QA_API_URL || `${(env.QA_BASE_URL || 'https://hostify.bioseek.eu').replace(/\/+$/, '')}/api`).replace(/\/+$/, '');
    const result = {version: 'unknown', releases: [], checkedAt: new Date().toISOString(), baseUrl: base};
    const who = env.QA_SUPERADMIN_EMAIL ? {email: env.QA_SUPERADMIN_EMAIL, password: env.QA_SUPERADMIN_PASSWORD} : {email: env.QA_ADMIN_EMAIL, password: env.QA_ADMIN_PASSWORD};
    try {
        const login = await fetch(`${base}/user/login`, {method: 'POST', headers: {'Content-Type': 'application/json', 'x-demo-data': '1'}, body: JSON.stringify(who)});
        const body = await login.json();
        if (body?.version) result.version = String(body.version);
        const token = body?.data?.token;
        if (token) {
            const res = await fetch(`${base}/version/changelog`, {headers: {Authorization: `Bearer ${token}`}});
            const log = await res.json();
            if (log?.data?.version) result.version = String(log.data.version);
            result.releases = Array.isArray(log?.data?.releases) ? log.data.releases : [];
        }
    } catch (e) {
        result.error = e?.message || String(e);
    }
    fs.mkdirSync(QA_DIR, {recursive: true});
    fs.writeFileSync(path.join(QA_DIR, 'version.json'), JSON.stringify(result, null, 2));
    return result;
};

/** The newest issues folder of a version before `current` (folders sort by name into time order). */
const previousIssuesFolder = (versionDir, current) => {
    if (!fs.existsSync(versionDir)) return null;
    const folders = fs.readdirSync(versionDir).filter(f => /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(f) && f !== path.basename(current)).sort();
    for (const f of folders.reverse()) if (fs.existsSync(path.join(versionDir, f, 'issues.json'))) return path.join(versionDir, f);
    return null;
};

/** The versions that have an issues folder, oldest first (by the folder's time). */
const knownVersions = () => {
    if (!fs.existsSync(ISSUES)) return [];
    return fs.readdirSync(ISSUES).filter(v => fs.statSync(path.join(ISSUES, v)).isDirectory()).map(v => {
        const runs = fs.readdirSync(path.join(ISSUES, v)).filter(f => /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(f)).sort();
        return {version: v, last: runs[runs.length - 1] || ''};
    }).sort((a, b) => a.last.localeCompare(b.last));
};

/** What makes two issues "the same" between runs of ONE version: the spec, the check, the first line of the error, the API answers. */
const signatureOf = (file, t) => {
    const first = (t.error || '').split('\n').find(l => l.trim()) || '';
    const api = (t.console || []).filter(c => c.kind === 'api.status' || c.kind === 'api.failure').map(c => `${c.text.split('\n')[0]} ${(c.url || '').replace(/https?:\/\/[^/]+/, '')}`).sort().join(';');
    return `${file}|${t.title}|${first.replace(/\d{2,}/g, '#').slice(0, 160)}|${api}`;
};

/** release-notes.md of a version, written once: its release and every release after the previous known version. */
const writeReleaseNotes = (versionDir, info, previousVersion) => {
    const file = path.join(versionDir, 'release-notes.md');
    if (fs.existsSync(file)) return false;
    const releases = info.releases || [];
    const index = releases.findIndex(r => r.version === info.version);
    const prevIndex = previousVersion ? releases.findIndex(r => r.version === previousVersion) : -1;
    // releases are newest first: everything from this version down to (not including) the previous known one
    const span = index >= 0 ? releases.slice(index, prevIndex > index ? prevIndex : index + 1) : [];
    const lines = [`# Версия ${info.version} — какво е ново`, '', `- Предишна версия с пуск на тестовете: ${previousVersion || 'няма (първи пуск)'}`, `- Прочетено от GET /version/changelog на ${info.checkedAt}`, ''];
    if (!span.length) lines.push('_Няма запис за тази версия в историята на промените._', '');
    for (const r of span) {
        lines.push(`## ${r.version} — ${r.title || '(без заглавие)'} (${(r.date || '').slice(0, 10)})`, '');
        if (r.note) lines.push(r.note, '');
        for (const c of r.commits || []) lines.push(`- ${c.type ? `**${c.type}${c.scope ? `(${c.scope})` : ''}:** ` : ''}${c.breaking ? '⚠ ' : ''}${(c.subject || '').slice(0, 300)}`);
        lines.push('');
    }
    lines.push('---', '', 'Правило: преди пуск на нова версия агентът чете този файл, казва кои страници и спекове засягат промените (по имена на менюта, същности и поправки) и ги пуска първи; познатите казуси от предишната версия се проверяват дали са отстранени.', '');
    fs.mkdirSync(versionDir, {recursive: true});
    fs.writeFileSync(file, lines.join('\n'));
    return true;
};
const numberOf = file => (file.match(/^(\d{3})[a-z]?-/) || [])[1];
const specName = file => file.replace(/\.spec\.ts$/, '');
/** The short description of a spec: the `@qa-description:` line of its header comment (Bulgarian, for the person). */
const descriptionOf = file => ((fs.readFileSync(path.join(E2E, file), 'utf8').match(/@qa-description:\s*(.+)/) || [])[1] || '').trim();

// ── run ──────────────────────────────────────────────────────────────────────────────────────────────────────────
const run = async () => {
    const headless = !!flag('--headless') || process.env.QA_HEADED === '0';
    flag('--headed'); // accepted for compatibility: it is the default
    const headed = !headless;
    const only = flag('--only');
    const from = flag('--from');
    const to = flag('--to');
    const rest = args.includes('--') ? args.slice(args.indexOf('--') + 1) : [];
    let files = specFiles();
    if (only) files = files.filter(f => f.startsWith(String(only)));
    if (from) files = files.filter(f => Number(numberOf(f)) >= Number(from));
    if (to) files = files.filter(f => Number(numberOf(f)) <= Number(to));
    if (!files.length) {
        console.error('Няма спек, който да отговаря на избора.');
        process.exit(2);
    }
    if (fs.existsSync(PID_FILE)) {
        const pid = Number(fs.readFileSync(PID_FILE, 'utf8'));
        try { process.kill(pid, 0); console.error(`Вече върви пуск (pid ${pid}). Спри го първо: npm run qa:stop`); process.exit(3); } catch { fs.rmSync(PID_FILE); }
    }
    fs.mkdirSync(QA_DIR, {recursive: true});
    const started = new Date();
    const runId = process.env.QA_RUN_ID || runStamp(started);
    const runDir = path.join(RUNS, runId);
    // the version of the application decides where the issues go and what counts as known
    const info = await fetchVersion();
    const versions = knownVersions();
    const previousVersion = versions.filter(v => v.version !== info.version).pop()?.version || null;
    const versionDir = path.join(ISSUES, info.version);
    const issuesDir = path.join(versionDir, issuesStamp(started));
    const previousDir = previousIssuesFolder(versionDir, issuesDir);
    const known = new Map((readJson(path.join(previousDir || '', 'issues.json'), []) || []).map(i => [i.signature, i]));
    const env = {...process.env, QA_RUN_ID: runId, QA_HEADED: headed ? '1' : '0', QA_APP_VERSION: info.version};
    const cli = path.join(ROOT, 'node_modules', '.bin', 'playwright');
    fs.writeFileSync(PID_FILE, String(process.pid));
    console.log(`Пуск ${runId}: ${files.length} спек(а), ${headed ? 'видим браузър' : 'без прозорец'} — pid ${process.pid}`);
    if (info.error) console.log(`⚠ версията на приложението не можа да се прочете (${info.error}) — казусите отиват в reports/issues/unknown/`);
    else if (!previousVersion && !previousDir) console.log(`Версия на приложението: ${info.version} — първи пуск на тестовете за нея.`);
    else if (previousDir) console.log(`Версия на приложението: ${info.version} — същата като предишния пуск (${path.basename(previousDir)}): повтарящите се казуси ще бъдат отбелязани като известни.`);
    else console.log(`Версия на приложението: ${info.version} — НОВА спрямо предишния пуск (${previousVersion}).`);
    if (writeReleaseNotes(versionDir, info, previousVersion))
        console.log(`   новостите на версията са записани в reports/issues/${info.version}/release-notes.md — прегледай ги: те казват на кои тестове да се обърне внимание.`);

    let current = null;
    let stopped = false;
    const onSignal = () => {
        stopped = true;
        if (current) { try { process.kill(-current.pid, 'SIGTERM'); } catch { /* gone */ } }
    };
    process.on('SIGTERM', onSignal);
    process.on('SIGINT', onSignal);

    const totals = {specs: 0, passed: 0, issues: 0, fresh: 0, warnings: 0};
    const index = [];
    const allIssues = [];
    for (const file of files) {
        if (stopped) break;
        const name = specName(file);
        const description = descriptionOf(file) || '(без описание)';
        console.log(`\n▶ пускам тест ${name} — ${description}`);
        await new Promise(resolve => {
            current = spawn(cli, ['test', `tests/e2e/${file}`, ...rest], {cwd: ROOT, env, stdio: 'inherit', detached: true});
            current.on('exit', () => resolve());
        });
        current = null;
        const verdict = verdictOf(runDir, file);
        totals.specs++;
        if (verdict.failed.length) {
            totals.issues += verdict.failed.length;
            for (const t of verdict.failed) {
                t.signature = signatureOf(file, t);
                t.knownSince = known.get(t.signature)?.since || null;
            }
            const fresh = verdict.failed.filter(t => !t.knownSince).length;
            totals.fresh += fresh;
            console.log(`✖ ${name}: ${verdict.failed.length} казус(а) за решаване (${fresh} нови, ${verdict.failed.length - fresh} известни)${verdict.warnings ? `, ${verdict.warnings} предупреждения в конзолата` : ''}:`);
            for (const t of verdict.failed) console.log(`   - ${t.knownSince ? `[известен от ${t.knownSince}] ` : '[нов] '}${t.title.split(' › ').slice(-1)[0]}`);
            const written = writeIssues(issuesDir, runDir, runId, file, name, description, verdict);
            index.push({file, name, description, failed: verdict.failed.length, fresh, md: written});
            allIssues.push(...verdict.failed.map(t => ({signature: t.signature, spec: name, title: t.title, since: t.knownSince || path.basename(issuesDir)})));
            fs.writeFileSync(path.join(issuesDir, 'issues.json'), JSON.stringify(allIssues, null, 2));
            console.log(`   записани в reports/issues/${info.version}/${path.basename(issuesDir)}/${written}`);
        } else if (!verdict.tests.length) {
            console.log(`? ${name}: няма резултат (пускът беше прекъснат?)`);
        } else {
            totals.passed++;
            console.log(`✔ ${name}: завърши без грешка (${verdict.tests.length} проверки${verdict.warnings ? `, ${verdict.warnings} предупреждения в конзолата` : ''})`);
        }
        totals.warnings += verdict.warnings;
    }
    try { fs.rmSync(PID_FILE); } catch { /* gone */ }
    if (index.length) writeIssuesIndex(issuesDir, runId, started, files, index, stopped, info, previousDir);
    console.log(`\n${stopped ? 'Пускът беше спрян. ' : ''}Версия ${info.version}, ${totals.specs} спек(а): ${totals.passed} без грешка, ${totals.issues} казус(а) за решаване (${totals.fresh} нови)${totals.warnings ? `, ${totals.warnings} предупреждения` : ''}.`);
    if (index.length) console.log(`Казусите: reports/issues/${info.version}/${path.basename(issuesDir)}/ (README.md е списъкът). Отчетът: reports/runs/${runId}/summary.md`);
    else console.log(`Отчетът: reports/runs/${runId}/summary.md`);
    process.exit(totals.issues ? 1 : 0);
};

/** The tests of one spec file in the run's summary: failed ones, console warnings, all. */
const verdictOf = (runDir, file) => {
    const summary = readJson(path.join(runDir, 'summary.json'), {tests: []});
    const tests = (summary.tests || []).filter(t => t.file.endsWith(file));
    const failed = tests.filter(t => t.status !== 'skipped' && t.status !== t.expectedStatus);
    const warnings = tests.reduce((n, t) => n + t.console.filter(c => c.kind === 'console.warning').length, 0);
    return {tests, failed, warnings, baseUrl: summary.baseUrl || ''};
};

const safeName = s => s.replace(/[^\w.-]+/g, '_').slice(0, 60);

/** One md per spec with issues, in the run's issues folder: what went wrong, how to reproduce, screenshots (copied). */
const writeIssues = (issuesDir, runDir, runId, file, name, description, verdict) => {
    fs.mkdirSync(issuesDir, {recursive: true});
    const version = readJson(path.join(QA_DIR, 'version.json'), {})?.version || 'unknown';
    const lines = [`# ${name} — ${description}`, '', `- Пуск: ${runId} · Приложение: ${verdict.baseUrl} · Версия: ${version}`, `- Спек: \`tests/e2e/${file}\``, `- Казуси: ${verdict.failed.length} от ${verdict.tests.length} проверки`, ''];
    verdict.failed.forEach((t, i) => {
        const n = i + 1;
        lines.push(`## Казус ${n}: ${t.title.split(' › ').slice(-1)[0]}`, '', t.knownSince ? `_Известен от пуска ${t.knownSince} (същата версия) — не е отстранен._` : '_Нов в този пуск._', '');
        lines.push('**Какво се обърка**', '');
        if (t.error) lines.push('```', t.error, '```');
        const reported = (t.console || []).filter(c => c.kind !== 'console.warning');
        for (const c of reported.slice(0, 10))
            lines.push(`- ${c.kind === 'api.status' ? 'сървърът отговори' : c.kind === 'api.failure' ? 'сървърът отказа' : c.kind === 'pageerror' ? 'грешка в страницата' : c.kind === 'request.failed' ? 'неуспешна заявка' : 'конзола'}: ${c.text.split('\n')[0].slice(0, 200)}${c.url ? ` — \`${c.url.replace(verdict.baseUrl, '')}\`` : ''}`);
        for (const f of (t.findings || []).filter(f => f.severity === 'blocker' || f.severity === 'error').slice(0, 10))
            lines.push(`- на екрана (${f.surface}): ${f.message}${f.at ? ` @ ${f.at}` : ''}`);
        lines.push('', '**Как да се възпроизведе**', '');
        let k = 1;
        if (t.repro) {
            lines.push(`${k++}. Влез в ${verdict.baseUrl}/app/ като ${t.repro.role === 'superAdmin' ? 'суперадминистратор' : 'администратор на акаунта „QA Automation“'} (${t.repro.email}).`);
            lines.push(`${k++}. Меню: ${t.repro.menu.join(' › ')} — ${t.repro.url}`);
        } else {
            lines.push(`${k++}. Спек \`tests/e2e/${file}\`, проверка „${t.title.split(' › ').slice(-1)[0]}“.`);
        }
        for (const step of t.steps || []) lines.push(`${k++}. ${step.trim()}`);
        if (reported.some(c => c.kind === 'api.status' || c.kind === 'api.failure' || c.kind === 'request.failed'))
            lines.push(`${k++}. Developer tools › Network: заявките по-горе отговарят така.`);
        if (reported.some(c => c.kind === 'console.error' || c.kind === 'pageerror'))
            lines.push(`${k++}. Developer tools › Console показва грешките по-горе.`);
        const shots = (t.attachments || []).filter(a => a.endsWith('.png'));
        const copied = [];
        for (const a of shots) {
            const src = path.join(runDir, a);
            if (!fs.existsSync(src)) continue;
            const target = `${name}-${n}-${safeName(a.split('__').pop())}`;
            try { fs.copyFileSync(src, path.join(issuesDir, target)); copied.push(target); } catch { /* skip */ }
        }
        if (copied.length) lines.push('', '**Скрийншоти**', '', ...copied.map(c => `- \`${c}\``));
        const warnings = (t.console || []).filter(c => c.kind === 'console.warning');
        if (warnings.length) lines.push('', '**Предупреждения в конзолата**', '', ...warnings.slice(0, 10).map(c => `- ${c.text.split('\n')[0].slice(0, 200)}`));
        lines.push('');
    });
    if (verdict.tests[0]?.spec) lines.push('---', '', `Какво проверява спекът: ${verdict.tests[0].spec.split('\n')[0]}`, '');
    const md = `${name}.md`;
    fs.writeFileSync(path.join(issuesDir, md), lines.join('\n'));
    return md;
};

const writeIssuesIndex = (issuesDir, runId, started, files, index, stopped, info, previousDir) => {
    const lines = [`# Казуси от пуска ${issuesStamp(started)} — версия ${info.version}`, '',
        `- Версия на приложението: **${info.version}**${previousDir ? ` (същата като пуска ${path.basename(previousDir)}; „известен“ = същият казус и там)` : ' (първи пуск за тази версия)'}`,
        `- Пуск: ${runId} (\`reports/runs/${runId}/summary.md\`)${stopped ? ' — ПРЕКЪСНАТ' : ''}`, `- Спекове в пуска: ${files.map(specName).join(', ')}`, '', '| Спек | Описание | Казуси | Нови | Файл |', '|---|---|---|---|---|'];
    for (const i of index) lines.push(`| ${i.name} | ${i.description} | ${i.failed} | ${i.fresh} | \`${i.md}\` |`);
    lines.push('', 'Всеки файл описва какво се е объркало, как се възпроизвежда и кои скрийншоти да се гледат. Папката се подава на агента в проекта Hostify за анализ и поправка.', '');
    fs.writeFileSync(path.join(issuesDir, 'README.md'), lines.join('\n'));
};

// ── the rest ──────────────────────────────────────────────────────────────────────────────────────────────────────
const stop = () => {
    if (!fs.existsSync(PID_FILE)) { console.log('Не върви пуск.'); return; }
    const pid = Number(fs.readFileSync(PID_FILE, 'utf8'));
    try { process.kill(pid, 'SIGTERM'); } catch { /* gone */ }
    setTimeout(() => {
        try { process.kill(pid, 0); process.kill(pid, 'SIGKILL'); } catch { /* ended */ }
        try { fs.rmSync(PID_FILE); } catch { /* gone */ }
        console.log(`Пускът (pid ${pid}) е спрян.`);
    }, 3000);
};

const status = () => {
    const dir = latestRun();
    if (!dir) { console.log('Още няма пуск.'); return; }
    const s = readJson(path.join(dir, 'status.json'));
    if (!s) { console.log(`Няма статус в ${dir}`); return; }
    const alive = fs.existsSync(PID_FILE);
    console.log(`Пуск ${s.runId} — ${s.state}${alive ? ' (процесът е жив)' : ''}`);
    console.log(`  ${s.baseUrl}`);
    console.log(`  готови ${s.done}/${s.counts.total}: ${s.counts.passed} без грешка, ${s.counts.failed} с казуси, ${s.counts.skipped} пропуснати`);
    if (s.current) console.log(`  сега: ${s.current}`);
    console.log(`  папка: ${path.relative(ROOT, dir)}`);
};

const summary = () => {
    const dir = latestRun();
    const file = dir && path.join(dir, 'summary.md');
    if (!file || !fs.existsSync(file)) { console.log('Няма завършен пуск (summary.md).'); return; }
    process.stdout.write(fs.readFileSync(file, 'utf8'));
};

const publish = () => {
    const noPush = !!flag('--no-push');
    const dir = latestRun();
    if (!dir || !fs.existsSync(path.join(dir, 'summary.json'))) { console.error('Няма завършен пуск за публикуване.'); process.exit(2); }
    const runId = path.basename(dir);
    const target = path.join(ROOT, 'reports', 'published', runId);
    fs.mkdirSync(target, {recursive: true});
    const s = readJson(path.join(dir, 'summary.json'));
    for (const f of ['summary.md', 'summary.json', 'status.json']) if (fs.existsSync(path.join(dir, f))) fs.copyFileSync(path.join(dir, f), path.join(target, f));
    const failed = new Set(s.tests.filter(t => t.status !== 'skipped' && t.status !== t.expectedStatus).flatMap(t => t.attachments));
    let copied = 0;
    for (const name of failed) {
        const src = path.join(dir, name);
        if (fs.existsSync(src) && fs.statSync(src).size < 3_000_000) { fs.copyFileSync(src, path.join(target, name)); copied++; }
    }
    const message = `QA run ${runId}: ${s.counts.passed} passed, ${s.counts.failed} failed, ${s.counts.skipped} skipped`;
    execSync(`git add "${path.relative(ROOT, target)}" reports/issues feedback`, {cwd: ROOT, stdio: 'inherit'});
    execSync(`git commit -m "${message}"`, {cwd: ROOT, stdio: 'inherit'});
    if (!noPush) execSync('git push', {cwd: ROOT, stdio: 'inherit'});
    console.log(`Публикуван ${runId} (${copied} скрийншота) → reports/published/${runId}${noPush ? ' (без push)' : ''}`);
};

const feedback = () => {
    const title = args.join(' ').trim();
    if (!title) { console.error('Употреба: node tools/qa.mjs feedback "<какво не е наред, с няколко думи>"'); process.exit(2); }
    const date = new Date().toISOString().slice(0, 10);
    const slug = title.toLowerCase().replace(/[^a-z0-9а-я]+/gi, '-').replace(/^-+|-+$/g, '').slice(0, 50);
    const file = path.join(ROOT, 'feedback', `${date}-${slug}.md`);
    const template = fs.readFileSync(path.join(ROOT, 'feedback', '_template.md'), 'utf8').replace('<title>', title).replace('<date>', date);
    fs.writeFileSync(file, template);
    console.log(`Създаден ${path.relative(ROOT, file)} — попълни го, добави скрийншота, после \`/qa-teach\` или \`npm run qa:publish\`.`);
};

const lint = () => {
    const files = specFiles();
    const problems = [];
    const numbers = new Map();
    for (const f of files) {
        const m = f.match(/^(\d{3})([a-z]?)-([a-z0-9]+(?:-[a-z0-9]+)*)\.spec\.ts$/);
        if (!m) { problems.push(`${f}: the name must be NNN[a]-kebab-name.spec.ts`); continue; }
        const key = m[1] + m[2];
        if (numbers.has(key)) problems.push(`${f}: the number ${key} is taken by ${numbers.get(key)}`);
        numbers.set(key, f);
        const src = fs.readFileSync(path.join(E2E, f), 'utf8');
        if (!/^\/\*\*[\s\S]*?\*\//m.test(src.slice(0, 3000))) problems.push(`${f}: no header comment (what the spec proves, what it creates, what it needs)`);
        if (!descriptionOf(f)) problems.push(`${f}: no "@qa-description: <кратко описание на български>" line in the header comment`);
        if (!src.includes("from '../helpers/fixtures'")) problems.push(`${f}: import test/expect from ../helpers/fixtures`);
        if (/\.catch\(\s*\(\)\s*=>\s*(undefined|null|false|\{\})\s*\)/.test(src) && !/cleanup|dismiss|optional/i.test(src)) problems.push(`${f}: a swallowed failure (.catch(() => …)) — a missing element must fail the test`);
    }
    if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
    console.log(`${files.length} spec file(s) follow the rules.`);
};

const help = () => console.log(fs.readFileSync(fileURLToPath(import.meta.url), 'utf8').split('*/')[0].split('\n').slice(2).map(l => l.replace(/^ \* ?/, '')).join('\n'));

const commands = {run, stop, status, summary, publish, feedback, lint, help};
if (!commands[command]) { console.error(`Unknown command "${command}"`); help(); process.exit(2); }
await commands[command]();
