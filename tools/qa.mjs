#!/usr/bin/env node
/**
 * The QA person's commands (no dependencies):
 *   node tools/qa.mjs run [--headed] [--only 002] [--from 010] [--to 199] [-- <playwright args>]
 *   node tools/qa.mjs stop            # stops the run started with `run`
 *   node tools/qa.mjs status          # the live status of the newest run
 *   node tools/qa.mjs summary [--run <id>]
 *   node tools/qa.mjs publish [--run <id>] [--no-push]   # reports/published/<id>/ → git commit + push
 *   node tools/qa.mjs feedback "<title>"                  # a new note in feedback/ for the developers / the agent
 *   node tools/qa.mjs lint            # the numbering and header rules of tests/e2e
 */
import {spawn} from 'node:child_process';
import {execSync} from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const QA_DIR = path.join(ROOT, '.qa');
const PID_FILE = path.join(QA_DIR, 'run.pid');
const RUNS = path.join(ROOT, 'reports', 'runs');
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

const latestRun = () => {
    const explicit = flag('--run');
    if (explicit) return path.join(RUNS, explicit);
    const latest = readJson(path.join(RUNS, 'latest.json'));
    return latest?.dir || null;
};

const specFiles = () => fs.existsSync(E2E) ? fs.readdirSync(E2E).filter(f => f.endsWith('.spec.ts')).sort() : [];

const numberOf = file => (file.match(/^(\d{3})[a-z]?-/) || [])[1];

const run = () => {
    const headed = !!flag('--headed');
    const only = flag('--only');
    const from = flag('--from');
    const to = flag('--to');
    const rest = args.includes('--') ? args.slice(args.indexOf('--') + 1) : [];
    let files = specFiles();
    if (only) files = files.filter(f => f.startsWith(String(only)));
    if (from) files = files.filter(f => Number(numberOf(f)) >= Number(from));
    if (to) files = files.filter(f => Number(numberOf(f)) <= Number(to));
    if (!files.length) {
        console.error('No spec matches the selection.');
        process.exit(2);
    }
    if (fs.existsSync(PID_FILE)) {
        const pid = Number(fs.readFileSync(PID_FILE, 'utf8'));
        try { process.kill(pid, 0); console.error(`A run is already going (pid ${pid}). Stop it first: npm run qa:stop`); process.exit(3); } catch { fs.rmSync(PID_FILE); }
    }
    fs.mkdirSync(QA_DIR, {recursive: true});
    const runId = process.env.QA_RUN_ID || new Date().toISOString().replace(/[:T]/g, '-').replace(/\..+/, '').replace(/-(\d\d)-(\d\d)-(\d\d)$/, '_$1-$2-$3');
    const env = {...process.env, QA_RUN_ID: runId, ...(headed ? {QA_HEADED: '1'} : {})};
    const cli = path.join(ROOT, 'node_modules', '.bin', 'playwright');
    const child = spawn(cli, ['test', ...files.map(f => `tests/e2e/${f}`), ...rest], {cwd: ROOT, env, stdio: 'inherit', detached: true});
    fs.writeFileSync(PID_FILE, String(child.pid));
    console.log(`QA run ${runId}: ${files.length} spec file(s)${headed ? ', visible browser' : ''} — pid ${child.pid}`);
    child.on('exit', code => {
        try { fs.rmSync(PID_FILE); } catch { /* gone */ }
        process.exit(code ?? 1);
    });
    for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => { try { process.kill(-child.pid, 'SIGTERM'); } catch { /* gone */ } });
};

const stop = () => {
    if (!fs.existsSync(PID_FILE)) { console.log('No run is going.'); return; }
    const pid = Number(fs.readFileSync(PID_FILE, 'utf8'));
    try { process.kill(-pid, 'SIGTERM'); } catch { try { process.kill(pid, 'SIGTERM'); } catch { /* gone */ } }
    setTimeout(() => { try { process.kill(-pid, 'SIGKILL'); } catch { /* gone */ } try { fs.rmSync(PID_FILE); } catch { /* gone */ } console.log(`Run ${pid} stopped.`); }, 1500);
};

const status = () => {
    const dir = latestRun();
    if (!dir) { console.log('No run yet.'); return; }
    const s = readJson(path.join(dir, 'status.json'));
    if (!s) { console.log(`No status in ${dir}`); return; }
    const alive = fs.existsSync(PID_FILE);
    console.log(`Run ${s.runId} — ${s.state}${alive ? ' (process alive)' : ''}`);
    console.log(`  ${s.baseUrl}`);
    console.log(`  done ${s.done}/${s.counts.total}: ${s.counts.passed} passed, ${s.counts.failed} failed, ${s.counts.skipped} skipped`);
    if (s.current) console.log(`  now: ${s.current}`);
    console.log(`  folder: ${path.relative(ROOT, dir)}`);
};

const summary = () => {
    const dir = latestRun();
    const file = dir && path.join(dir, 'summary.md');
    if (!file || !fs.existsSync(file)) { console.log('No finished run (summary.md) yet.'); return; }
    process.stdout.write(fs.readFileSync(file, 'utf8'));
};

const publish = () => {
    const noPush = !!flag('--no-push');
    const dir = latestRun();
    if (!dir || !fs.existsSync(path.join(dir, 'summary.json'))) { console.error('No finished run to publish.'); process.exit(2); }
    const runId = path.basename(dir);
    const target = path.join(ROOT, 'reports', 'published', runId);
    fs.mkdirSync(target, {recursive: true});
    const s = readJson(path.join(dir, 'summary.json'));
    for (const f of ['summary.md', 'summary.json', 'status.json']) fs.copyFileSync(path.join(dir, f), path.join(target, f));
    // the screenshots of the failed tests only (a whole run holds hundreds of pictures)
    const failed = new Set(s.tests.filter(t => t.status !== 'skipped' && t.status !== t.expectedStatus).flatMap(t => t.attachments));
    let copied = 0;
    for (const name of failed) {
        const src = path.join(dir, name);
        if (fs.existsSync(src) && fs.statSync(src).size < 3_000_000) { fs.copyFileSync(src, path.join(target, name)); copied++; }
    }
    const message = `QA run ${runId}: ${s.counts.passed} passed, ${s.counts.failed} failed, ${s.counts.skipped} skipped`;
    execSync(`git add "${path.relative(ROOT, target)}" feedback`, {cwd: ROOT, stdio: 'inherit'});
    execSync(`git commit -m "${message}"`, {cwd: ROOT, stdio: 'inherit'});
    if (!noPush) execSync('git push', {cwd: ROOT, stdio: 'inherit'});
    console.log(`Published ${runId} (${copied} screenshot(s)) → reports/published/${runId}${noPush ? ' (not pushed)' : ''}`);
};

const feedback = () => {
    const title = args.join(' ').trim();
    if (!title) { console.error('Usage: node tools/qa.mjs feedback "<what is wrong, in a few words>"'); process.exit(2); }
    const date = new Date().toISOString().slice(0, 10);
    const slug = title.toLowerCase().replace(/[^a-z0-9а-я]+/gi, '-').replace(/^-+|-+$/g, '').slice(0, 50);
    const file = path.join(ROOT, 'feedback', `${date}-${slug}.md`);
    const template = fs.readFileSync(path.join(ROOT, 'feedback', '_template.md'), 'utf8').replace('<title>', title).replace('<date>', date);
    fs.writeFileSync(file, template);
    console.log(`Created ${path.relative(ROOT, file)} — fill it in, add the screenshot, then \`/qa-teach\` or \`npm run qa:publish\`.`);
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
        if (!/^\/\*\*[\s\S]*?\*\//m.test(src.slice(0, 2500))) problems.push(`${f}: no header comment (what the spec proves, what it creates, what it needs)`);
        if (!src.includes("from '../helpers/fixtures'")) problems.push(`${f}: import test/expect from ../helpers/fixtures`);
        if (/\.catch\(\s*\(\)\s*=>\s*(undefined|null|false|\{\})\s*\)/.test(src) && !/cleanup|dismiss|optional/i.test(src)) problems.push(`${f}: a swallowed failure (.catch(() => …)) — a missing element must fail the test`);
    }
    if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
    console.log(`${files.length} spec file(s) follow the rules.`);
};

const help = () => console.log(fs.readFileSync(fileURLToPath(import.meta.url), 'utf8').split('*/')[0].split('\n').slice(2).map(l => l.replace(/^ \* ?/, '')).join('\n'));

const commands = {run, stop, status, summary, publish, feedback, lint, help};
if (!commands[command]) { console.error(`Unknown command "${command}"`); help(); process.exit(2); }
commands[command]();
