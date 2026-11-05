import type {FullConfig, FullResult, Reporter, Suite, TestCase, TestResult} from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

/**
 * The run report the QA person and the developers read: `reports/runs/<runId>/`
 *   status.json   — live: state, counts, the test that runs now (`npm run qa:status`)
 *   summary.json  — every test: number, title, status, duration, error, console records, visual findings, shots
 *   summary.md    — the same for a person, grouped: failures first, then the console, then the visual review
 *   <files>       — the attachments of every test (console.json, probe-*.json, shot-*.png, failure screenshots)
 * `reports/runs/latest.json` points at the newest run. `npm run qa:publish` copies a run into reports/published/.
 */
interface TestRecord {
    number: string
    file: string
    title: string
    status: string
    expectedStatus: string
    durationMs: number
    error?: string
    console: {kind: string; text: string; url?: string; status?: number; page?: string}[]
    findings: {severity: string; tag: string; message: string; at?: string; surface: string}[]
    attachments: string[]
    /** How to get there: who signs in, the menu texts clicked, the URL (the sweeps attach it). */
    repro?: {role: string; email: string; menu: string[]; menuIds: string[]; url: string}
    /** The test's own steps, in order (`test.step` titles). */
    steps: string[]
    /** What the spec proves — its header comment. */
    spec?: string
}

interface Summary {
    runId: string
    startedAt: string
    finishedAt?: string
    baseUrl: string
    /** The application's version (every API answer carries it; the navbar footer shows it) — set by tools/qa.mjs. */
    version: string
    status: string
    counts: {total: number; passed: number; failed: number; skipped: number; flaky: number}
    tests: TestRecord[]
}

const ROOT = path.resolve(__dirname, '..');
const RUNS = path.join(ROOT, 'reports', 'runs');

const stamp = (): string => {
    const d = new Date();
    const p = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}_${p(d.getHours())}-${p(d.getMinutes())}-${p(d.getSeconds())}`;
};

const numberOf = (file: string): string => (path.basename(file).match(/^(\d{3}[a-z]?)-/) || [])[1] || '';

const safe = (s: string): string => s.replace(/[^\w.-]+/g, '_').slice(0, 80);
/** Playwright colours its messages; a report is read on GitHub, not in a terminal. */
const plain = (s: string): string => s.replace(/\u001b\[[0-9;]*m/g, '');

const headerCache = new Map<string, string>();
/** The spec's header comment (what it proves, creates, needs) — read once per file. */
const specHeader = (file: string): string => {
    if (!headerCache.has(file)) {
        let text = '';
        try {
            const m = fs.readFileSync(file, 'utf8').match(/\/\*\*([\s\S]*?)\*\//);
            text = m ? m[1].split('\n').map(l => l.replace(/^\s*\*\s?/, '')).join('\n').trim() : '';
        } catch { /* no file */ }
        headerCache.set(file, text);
    }
    return headerCache.get(file) || '';
};

const stepTitles = (steps: TestResult['steps']): string[] =>
    steps.flatMap(step => step.category === 'test.step' ? [step.title, ...stepTitles(step.steps).map(t => `  ${t}`)] : stepTitles(step.steps));

class QaReporter implements Reporter {
    private summary!: Summary;
    private dir!: string;
    private current = '';

    onBegin(config: FullConfig, suite: Suite) {
        const runId = process.env.QA_RUN_ID || stamp();
        this.dir = path.join(RUNS, runId);
        fs.mkdirSync(this.dir, {recursive: true});
        // tools/qa.mjs runs the spec files one by one under ONE run id: a later file continues the run's summary
        const previous = fs.existsSync(path.join(this.dir, 'summary.json')) ? (JSON.parse(fs.readFileSync(path.join(this.dir, 'summary.json'), 'utf8')) as Summary) : null;
        this.summary = previous
            ? {...previous, status: 'running', finishedAt: undefined, counts: {...previous.counts, total: previous.counts.total + suite.allTests().length}}
            : {
                runId, startedAt: new Date().toISOString(), baseUrl: String(config.projects[0]?.use?.baseURL || ''), version: process.env.QA_APP_VERSION || 'unknown', status: 'running',
                counts: {total: suite.allTests().length, passed: 0, failed: 0, skipped: 0, flaky: 0}, tests: []
            };
        fs.writeFileSync(path.join(RUNS, 'latest.json'), JSON.stringify({runId, dir: this.dir}, null, 2));
        this.writeStatus();
    }

    onTestBegin(test: TestCase) {
        this.current = `${numberOf(test.location.file)} ${test.title}`;
        this.writeStatus();
    }

    onTestEnd(test: TestCase, result: TestResult) {
        const record: TestRecord = {
            number: numberOf(test.location.file), file: path.relative(ROOT, test.location.file), title: test.titlePath().slice(2).join(' › '),
            status: result.status, expectedStatus: test.expectedStatus, durationMs: result.duration,
            error: result.error ? plain(`${result.error.message || ''}`).split('\n').slice(0, 12).join('\n') : undefined,
            console: [], findings: [], attachments: [], steps: stepTitles(result.steps), spec: specHeader(test.location.file)
        };
        const prefix = `${record.number || '000'}_${safe(test.title)}`;
        for (const a of result.attachments) {
            if (a.name === 'console.json' && a.body) {
                // a test may attach the console more than once (a shared sweep session and the automatic fixture): add up
                try { record.console.push(...JSON.parse(a.body.toString('utf8'))); } catch { /* ignore */ }
                continue;
            }
            if (a.name === 'repro.json' && a.body) {
                try { record.repro = JSON.parse(a.body.toString('utf8')); } catch { /* ignore */ }
                continue;
            }
            if (a.name.startsWith('probe-') && a.body) {
                try {
                    const probe = JSON.parse(a.body.toString('utf8'));
                    for (const f of probe.findings || []) record.findings.push({...f, surface: probe.surface});
                } catch { /* ignore */ }
                continue;
            }
            if (a.path && fs.existsSync(a.path)) {
                const target = path.join(this.dir, `${prefix}__${safe(a.name)}${a.name.includes('.') ? '' : path.extname(a.path)}`);
                try { fs.copyFileSync(a.path, target); record.attachments.push(path.basename(target)); } catch { /* ignore */ }
            } else if (a.body) {
                const target = path.join(this.dir, `${prefix}__${safe(a.name)}`);
                try { fs.writeFileSync(target, a.body); record.attachments.push(path.basename(target)); } catch { /* ignore */ }
            }
        }
        this.summary.tests.push(record);
        const ok = result.status === test.expectedStatus;
        if (result.status === 'skipped') this.summary.counts.skipped++;
        else if (ok) this.summary.counts.passed++;
        else this.summary.counts.failed++;
        this.writeStatus();
    }

    onEnd(result: FullResult) {
        this.summary.finishedAt = new Date().toISOString();
        // the run's status is the worst of its files
        this.summary.status = this.summary.counts.failed > 0 ? 'failed' : result.status;
        this.current = '';
        this.writeStatus();
        fs.writeFileSync(path.join(this.dir, 'summary.json'), JSON.stringify(this.summary, null, 2));
        fs.writeFileSync(path.join(this.dir, 'summary.md'), this.markdown());
        console.log(`\nQA run ${this.summary.runId}: ${this.summary.counts.passed} passed, ${this.summary.counts.failed} failed, ${this.summary.counts.skipped} skipped → ${path.relative(ROOT, path.join(this.dir, 'summary.md'))}`);
    }

    private writeStatus() {
        const s = this.summary;
        fs.writeFileSync(path.join(this.dir, 'status.json'), JSON.stringify({
            runId: s.runId, state: s.status, startedAt: s.startedAt, finishedAt: s.finishedAt, baseUrl: s.baseUrl, version: s.version,
            counts: s.counts, done: s.tests.length, current: this.current, pid: process.pid
        }, null, 2));
    }

    private markdown(): string {
        const s = this.summary;
        const lines: string[] = [];
        lines.push(`# QA run ${s.runId}`, '', `- Application: ${s.baseUrl} — version **${s.version}**`, `- Started: ${s.startedAt}, finished: ${s.finishedAt}`,
            `- Result: **${s.status}** — ${s.counts.passed} passed, ${s.counts.failed} failed, ${s.counts.skipped} skipped of ${s.counts.total}`, '');
        const failed = s.tests.filter(t => t.status !== 'skipped' && t.status !== t.expectedStatus);
        lines.push('## Failures', '');
        if (!failed.length) lines.push('_none_', '');
        for (const t of failed) {
            lines.push(`### ${t.number} ${t.title}`, '');
            // what went wrong — the error, the page's own errors (API, console), the probe's blockers and errors
            lines.push('**What went wrong**', '');
            if (t.error) lines.push('```', t.error, '```');
            const reported = t.console.filter(c => c.kind !== 'console.warning');
            for (const c of reported.slice(0, 10)) lines.push(`- ${c.kind === 'api.status' ? 'the server answered' : c.kind === 'api.failure' ? 'the server refused' : c.kind}: ${c.text.split('\n')[0].slice(0, 200)}${c.url ? ` — \`${c.url.replace(s.baseUrl, '')}\`` : ''}`);
            for (const f of t.findings.filter(f => f.severity === 'blocker' || f.severity === 'error').slice(0, 10)) lines.push(`- on the screen (${f.surface}): ${f.message}${f.at ? ` @ ${f.at}` : ''}`);
            lines.push('', '**How to reproduce**', '');
            let n = 1;
            if (t.repro) {
                lines.push(`${n++}. Sign in at ${s.baseUrl}/app/ as the ${t.repro.role === 'superAdmin' ? 'super administrator' : 'account administrator of "QA Automation"'} (${t.repro.email}).`);
                lines.push(`${n++}. Menu: ${t.repro.menu.join(' › ')} — ${t.repro.url}`);
            } else {
                lines.push(`${n++}. Spec \`${t.file}\`: ${t.title.split(' › ').slice(-1)[0]}`);
            }
            for (const step of t.steps) lines.push(`${n++}. ${step.trim()}`);
            if (reported.some(c => c.kind === 'api.status' || c.kind === 'api.failure' || c.kind === 'request.failed'))
                lines.push(`${n++}. Open the browser's developer tools › Network: the request(s) above answer as reported.`);
            if (reported.some(c => c.kind === 'console.error' || c.kind === 'pageerror'))
                lines.push(`${n++}. Developer tools › Console shows the error(s) above.`);
            if (t.spec) lines.push('', '**The spec**: ' + t.spec.split('\n')[0]);
            const shots = t.attachments.filter(a => a.endsWith('.png'));
            if (shots.length) lines.push('', '**Screenshots**', '', ...shots.map(a => `- \`${a}\``));
            lines.push('', `- file: \`${t.file}\`, status: ${t.status} (${Math.round(t.durationMs / 1000)} s)`, '');
        }
        lines.push('## Browser console', '');
        const withConsole = s.tests.filter(t => t.console.length);
        if (!withConsole.length) lines.push('_clean in every test_', '');
        for (const t of withConsole) {
            lines.push(`### ${t.number} ${t.title}`, '');
            for (const c of t.console.slice(0, 30)) lines.push(`- [${c.kind}] ${c.text.split('\n')[0].slice(0, 220)}${c.url ? ` @ ${c.url.replace(s.baseUrl, '')}` : ''}`);
            if (t.console.length > 30) lines.push(`- … ${t.console.length - 30} more`);
            lines.push('');
        }
        lines.push('## Visual review (what the eye must judge)', '');
        const findings = s.tests.flatMap(t => t.findings.map(f => ({...f, test: `${t.number} ${t.title}`})));
        if (!findings.length) lines.push('_no findings_', '');
        // blockers, errors and warnings per surface (few); the review items (contrast, cut text) as UNIQUE texts with the
        // number of surfaces each appears on — the same muted label repeats on every page
        const hard = findings.filter(f => f.severity !== 'review');
        const bySurface = new Map<string, typeof findings>();
        for (const f of hard) bySurface.set(f.surface, [...(bySurface.get(f.surface) || []), f]);
        for (const [surface, list] of bySurface) {
            lines.push(`### ${surface}`, '');
            for (const f of list.slice(0, 40)) lines.push(`- [${f.severity}/${f.tag}] ${f.message}${f.at ? ` @ ${f.at}` : ''}`);
            lines.push('');
        }
        for (const tag of ['low-contrast', 'cut-text']) {
            const items = findings.filter(f => f.tag === tag);
            if (!items.length) continue;
            const unique = new Map<string, {message: string; at?: string; surfaces: Set<string>}>();
            for (const f of items) {
                const key = f.message.replace(/\s+/g, ' ');
                const entry = unique.get(key) || {message: f.message, at: f.at, surfaces: new Set<string>()};
                entry.surfaces.add(f.surface);
                unique.set(key, entry);
            }
            const sorted = [...unique.values()].sort((a, b) => b.surfaces.size - a.surfaces.size);
            lines.push(`### ${tag}: ${unique.size} unique texts on ${new Set(items.map(f => f.surface)).size} surfaces`, '');
            for (const u of sorted.slice(0, 60)) lines.push(`- ${u.message}${u.at ? ` @ ${u.at}` : ''} — ${u.surfaces.size} surface(s)${u.surfaces.size <= 3 ? `: ${[...u.surfaces].join(', ')}` : ''}`);
            if (sorted.length > 60) lines.push(`- … ${sorted.length - 60} more (summary.json)`);
            lines.push('');
        }
        lines.push('## Every test', '', '| № | Test | Status | s | Console | Findings |', '|---|---|---|---|---|---|');
        for (const t of s.tests) lines.push(`| ${t.number} | ${t.title.replace(/\|/g, '/')} | ${t.status} | ${Math.round(t.durationMs / 1000)} | ${t.console.length} | ${t.findings.length} |`);
        lines.push('');
        return lines.join('\n');
    }
}

export default QaReporter;
