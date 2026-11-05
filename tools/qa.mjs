#!/usr/bin/env node
/**
 * The QA commands (no dependencies). The AGENT runs them when the QA person asks (CLAUDE.md → The run rule):
 *   node tools/qa.mjs run [--tenant wipe|keep|continue] [--account <n>] [--headless] [--only 002] [--from 010] [--to 199] [-- <playwright args>]
 *       spec files ONE BY ONE, in number order, a VISIBLE browser by default; before each: "пускам тест …",
 *       after each: the verdict; the run's record → reports/issues/<version>/<YYYY-MM-DD HH:mm>/; every failed
 *       check → a bug file in bugs/new/ (or "seen again" on the one that exists); the bugs in bugs/for-verification/
 *       are checked FIRST and moved to bugs/verified/ or bugs/needs-new-fix/.
 *       --tenant: what to do with the ACTIVE account — wipe it and start the chain over, keep it (for verifications)
 *       and start a new account, or continue on it without wiping (002 left out); asked on a terminal when absent.
 *   node tools/qa.mjs tenants [--activate <n>] [--retire <n>]   # the suite's accounts and what each reached
 *   node tools/qa.mjs bugs                                       # the bugs per state
 *   node tools/qa.mjs stop            # stops the run started with `run`
 *   node tools/qa.mjs status          # the live status of the newest run
 *   node tools/qa.mjs summary [--run <id>]
 *   node tools/qa.mjs publish [--run <id>] [--no-push] [--github]   # reports + bugs + feedback → git commit + push; --github opens an issue per new bug (QA_GITHUB_TOKEN)
 *   node tools/qa.mjs feedback "<title>"                  # a new note in feedback/ for the developers / the agent
 *   node tools/qa.mjs lint            # the numbering, header and description rules of tests/e2e
 */
import {spawn, execSync} from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as readline from 'node:readline/promises';
import {fileURLToPath} from 'node:url';
import * as tenants from './lib/tenants.mjs';
import * as bugs from './lib/bugs.mjs';

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
    const envFile = readEnv();
    // ── the account: wipe it, keep it and start a new one, or continue on it ──────────────────────────────────────
    const accountFlag = flag('--account');
    if (accountFlag) tenants.activate(ROOT, Number(accountFlag));
    let account = tenants.ensureActive(ROOT, envFile);
    let mode = flag('--tenant');
    const waiting = bugs.waitingVerification(ROOT);
    if (!mode) {
        if (!account.id && !account.reached) mode = 'wipe'; // a brand-new account: nothing to keep
        else if (process.stdin.isTTY) {
            console.log(`Активен акаунт: ${tenants.describe(account)}${waiting.length ? `\n${waiting.length} бъг(а) чакат проверка (bugs/for-verification/)` : ''}`);
            const rl = readline.createInterface({input: process.stdin, output: process.stdout});
            const answer = (await rl.question('Какво да направя с него? [w] изтрий данните и започни веригата отначало · [k] запази го за проверки и започни нов акаунт · [c] продължи в него без изтриване (002 отпада): ')).trim().toLowerCase();
            rl.close();
            mode = answer.startsWith('k') ? 'keep' : answer.startsWith('c') ? 'continue' : 'wipe';
        } else {
            console.error(`Активен акаунт: ${tenants.describe(account)}. Кажи какво да стане с него: --tenant wipe (изтрий и започни отначало) | keep (запази го и започни нов) | continue (продължи без изтриване).`);
            process.exit(2);
        }
    }
    if (!['wipe', 'keep', 'continue'].includes(mode)) { console.error(`Непознат режим "${mode}" — wipe | keep | continue`); process.exit(2); }
    if (mode === 'keep') {
        account = tenants.keepAndStartNew(ROOT, envFile);
        console.log(`Предишният акаунт е запазен; новият е „${account.name}“ (администратор ${account.adminEmail}).`);
        mode = 'wipe'; // a new account starts the chain the ordinary way (002 creates it)
    }
    if (mode === 'continue') {
        if (only && String(only).startsWith('002')) { console.error('002 изтрива акаунта — в режим continue не се пуска. Избери wipe.'); process.exit(2); }
        const before = files.length;
        files = files.filter(f => !f.startsWith('002-'));
        if (files.length < before) console.log('Режим continue: 002 (почистването) отпада; акаунтът продължава с данните си.');
    } else if (mode === 'wipe') {
        tenants.resetProgress(ROOT, account.number);
    }
    // ── the bugs waiting for verification come first, on the account that holds their data ──────────────────────
    const verifyFirst = [];
    for (const bug of waiting) {
        const specFile = specFiles().find(f => f.startsWith(bug.meta.spec + '.spec'));
        if (!specFile) continue;
        const n = Number(numberOf(specFile));
        const hasData = mode === 'continue' && account.reached && Number(account.reached) >= n;
        if (hasData && !verifyFirst.includes(specFile) && !files.includes(specFile)) verifyFirst.push(specFile);
        else if (!hasData && !files.includes(specFile)) console.log(`⚠ бъгът ${bug.file} чака проверка в ${bug.meta.spec}, но акаунтът няма данните дотам (стигнал е до ${account.reached || 'нищо'}) — проверката ще стане, когато веригата мине през ${bug.meta.spec}.`);
    }
    if (verifyFirst.length) {
        console.log(`С приоритет — проверка на поправени бъгове: ${verifyFirst.map(specName).join(', ')}`);
        files = [...verifyFirst, ...files];
    }
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
    const env = {...process.env, QA_RUN_ID: runId, QA_HEADED: headed ? '1' : '0', QA_APP_VERSION: info.version, QA_TENANT_NUMBER: String(account.number), QA_RUN_MODE: mode};
    const cli = path.join(ROOT, 'node_modules', '.bin', 'playwright');
    fs.writeFileSync(PID_FILE, String(process.pid));
    console.log(`Пуск ${runId}: ${files.length} спек(а), ${headed ? 'видим браузър' : 'без прозорец'}, акаунт „${account.name}“ (${mode}) — pid ${process.pid}`);
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
        const specNo = numberOf(file);
        tenants.recordProgress(ROOT, account.number, {specNumber: specNo, passed: verdict.tests.length > 0 && !verdict.failed.length, runId, version: info.version, id: tenants.active(ROOT)?.id || readJson(path.join(QA_DIR, 'state.json'), {})?.tenantId || null});
        // the bugs: new files, "seen again", and the verdict on the ones waiting for verification in this spec
        const runFolder = `reports/issues/${info.version}/${issuesStamp(started)}`;
        const failedSignatures = new Set(verdict.failed.map(t => signatureOf(file, t)));
        verdict.failed.forEach((t, i) => {
            const r = bugs.record(ROOT, {version: info.version, spec: name, description, test: t.title, signature: signatureOf(file, t), runId, runFolder, tenant: account.name,
                body: bugBody(t, verdict.baseUrl, file), screenshots: (t.attachments || []).filter(a => a.endsWith('.png')).map(a => `${runFolder}/${name}-${i + 1}-${safeName(a.split('__').pop())}`)});
            console.log(`   ${r.fresh ? '🆕 нов бъг' : `↻ видян отново (${r.state})`}: bugs/${r.state}/${r.file}`);
        });
        if (verdict.tests.length) {
            for (const bug of bugs.waitingVerification(ROOT).filter(b => b.meta.spec === name)) {
                const stamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
                if (failedSignatures.has(bug.meta.signature)) {
                    bugs.move(ROOT, bug, 'needs-new-fix', `${stamp} — проверката в пуска ${runId} (версия ${info.version}) пада отново → за нов фикс`);
                    console.log(`   ✖ поправката НЕ е потвърдена → bugs/needs-new-fix/${bug.file}`);
                } else {
                    bugs.move(ROOT, bug, 'verified', `${stamp} — проверено в пуска ${runId} (версия ${info.version}): проверката минава`);
                    console.log(`   ✔ поправката е потвърдена → bugs/verified/${bug.file}`);
                }
            }
        }
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
    if (index.length) console.log(`Казусите: reports/issues/${info.version}/${path.basename(issuesDir)}/ (README.md е списъкът); бъговете по състояние: bugs/new, bugs/for-verification, bugs/verified, bugs/needs-new-fix. Отчетът: reports/runs/${runId}/summary.md`);
    else console.log(`Отчетът: reports/runs/${runId}/summary.md`);
    console.log(`Акаунт: ${tenants.describe(tenants.active(ROOT))}`);
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

/** The sections of one failed check, as the run's md has them — the body of its bug file. */
const bugBody = (t, baseUrl, file) => {
    const lines = ['**Какво се обърка**', ''];
    if (t.error) lines.push('```', t.error, '```');
    const reported = (t.console || []).filter(c => c.kind !== 'console.warning');
    for (const c of reported.slice(0, 10))
        lines.push(`- ${c.kind === 'api.status' ? 'сървърът отговори' : c.kind === 'api.failure' ? 'сървърът отказа' : c.kind === 'pageerror' ? 'грешка в страницата' : c.kind === 'request.failed' ? 'неуспешна заявка' : 'конзола'}: ${c.text.split('\n')[0].slice(0, 200)}${c.url ? ` — \`${c.url.replace(baseUrl, '')}\`` : ''}`);
    for (const f of (t.findings || []).filter(f => f.severity === 'blocker' || f.severity === 'error').slice(0, 10))
        lines.push(`- на екрана (${f.surface}): ${f.message}${f.at ? ` @ ${f.at}` : ''}`);
    lines.push('', '**Как да се възпроизведе**', '');
    let k = 1;
    if (t.repro) {
        lines.push(`${k++}. Влез в ${baseUrl}/app/ като ${t.repro.role === 'superAdmin' ? 'суперадминистратор' : `${t.repro.role} на акаунта`} (${t.repro.email}).`);
        lines.push(`${k++}. Меню: ${t.repro.menu.join(' › ')} — ${t.repro.url}`);
    } else {
        lines.push(`${k++}. Спек \`tests/e2e/${file}\`, проверка „${t.title.split(' › ').slice(-1)[0]}“.`);
    }
    for (const step of t.steps || []) lines.push(`${k++}. ${step.trim()}`);
    if (reported.some(c => c.kind === 'api.status' || c.kind === 'api.failure' || c.kind === 'request.failed')) lines.push(`${k++}. Developer tools › Network: заявките по-горе отговарят така.`);
    if (reported.some(c => c.kind === 'console.error' || c.kind === 'pageerror')) lines.push(`${k++}. Developer tools › Console показва грешките по-горе.`);
    const warnings = (t.console || []).filter(c => c.kind === 'console.warning');
    if (warnings.length) lines.push('', '**Предупреждения в конзолата**', '', ...warnings.slice(0, 10).map(c => `- ${c.text.split('\n')[0].slice(0, 200)}`));
    return lines.join('\n');
};

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
    console.log(`  акаунт: ${tenants.describe(tenants.active(ROOT))}`);
};

const summary = () => {
    const dir = latestRun();
    const file = dir && path.join(dir, 'summary.md');
    if (!file || !fs.existsSync(file)) { console.log('Няма завършен пуск (summary.md).'); return; }
    process.stdout.write(fs.readFileSync(file, 'utf8'));
};

const publish = async () => {
    const noPush = !!flag('--no-push');
    if (flag('--github')) await publishGithub();
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
    execSync(`git add "${path.relative(ROOT, target)}" reports/issues bugs feedback`, {cwd: ROOT, stdio: 'inherit'});
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

const tenantsCmd = () => {
    const activateN = flag('--activate');
    const retireN = flag('--retire');
    if (activateN) { const t = tenants.activate(ROOT, Number(activateN)); console.log(`Активен акаунт: ${tenants.describe(t)}`); return; }
    if (retireN) {
        const r = tenants.read(ROOT); const t = r.tenants.find(x => x.number === Number(retireN));
        if (!t) { console.error(`Няма акаунт ${retireN}`); process.exit(2); }
        t.status = 'retired'; tenants.write(ROOT, r);
        console.log(`Акаунт „${t.name}“ е отбелязан като изоставен — данните му остават на платформата, докато суперадминистратор не го скрие (Platform Admin ▸ Accounts) или пуск с --account ${t.number} --tenant wipe не ги изтрие.`);
        return;
    }
    const r = tenants.read(ROOT);
    if (!r.tenants.length) { console.log('Още няма акаунти (първият пуск ги създава).'); return; }
    for (const t of r.tenants) console.log(`${t.number === r.active ? '▶' : ' '} ${t.number}. ${tenants.describe(t)}`);
};

const bugsCmd = () => {
    const all = bugs.list(ROOT);
    if (!all.length) { console.log('Няма бъгове.'); return; }
    for (const state of bugs.STATES) {
        const items = all.filter(b => b.state === state);
        console.log(`${state} (${items.length})`);
        for (const b of items) console.log(`  - ${b.file}${b.meta.lastSeen ? ` — последно в ${b.meta.lastSeen}` : ''}`);
    }
};

/** GitHub Issues from the bug files (QA_GITHUB_TOKEN in .env, the repo from `git remote`): one issue per new bug, a comment per state change, closed when verified. */
const publishGithub = async () => {
    const env = readEnv();
    const token = env.QA_GITHUB_TOKEN;
    if (!token) { console.log('Без QA_GITHUB_TOKEN в .env няма GitHub issues — само git.'); return; }
    const remote = execSync('git remote get-url origin', {cwd: ROOT, encoding: 'utf8'}).trim();
    const m = remote.match(/github\.com[/:]([^/]+)\/([^/.]+)/);
    if (!m) { console.log(`Отдалеченото хранилище не е GitHub (${remote}).`); return; }
    const api = `https://api.github.com/repos/${m[1]}/${m[2]}`;
    const headers = {Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json', 'User-Agent': 'hostify-qa'};
    let created = 0, commented = 0;
    for (const bug of bugs.list(ROOT)) {
        if (!bug.meta.github) {
            const res = await fetch(`${api}/issues`, {method: 'POST', headers, body: JSON.stringify({title: `[${bug.meta.version}] ${bug.meta.spec}: ${bug.meta.test}`, body: bug.body, labels: ['qa', bug.state]})});
            const issue = await res.json();
            if (issue?.number) { bugs.setMeta(bug.path, {github: String(issue.number), githubState: bug.state}); created++; }
            else console.log(`  issue не е създадена за ${bug.file}: ${issue?.message || res.status}`);
        } else if (bug.meta.githubState !== bug.state) {
            const res = await fetch(`${api}/issues/${bug.meta.github}/comments`, {method: 'POST', headers, body: JSON.stringify({body: `Състояние: **${bug.state}** (${bug.meta.moved || ''})\n\n${(bug.body.split('## История')[1] || '').trim()}`})});
            if (res.ok) { bugs.setMeta(bug.path, {githubState: bug.state}); commented++; }
            if (bug.state === 'verified') await fetch(`${api}/issues/${bug.meta.github}`, {method: 'PATCH', headers, body: JSON.stringify({state: 'closed'})});
        }
    }
    console.log(`GitHub: ${created} нови issue(s), ${commented} коментар(а).`);
};

const commands = {run, stop, status, summary, publish, feedback, lint, help, tenants: tenantsCmd, bugs: bugsCmd};
if (!commands[command]) { console.error(`Unknown command "${command}"`); help(); process.exit(2); }
await commands[command]();
