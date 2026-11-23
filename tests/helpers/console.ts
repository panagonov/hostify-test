import type {Page, TestInfo} from '@playwright/test';
import {CONFIG} from './env';
import {toleratedBy, companionOf, COMPANION_MS} from './tolerate';

/**
 * What the browser said while a journey ran — the part of a result a person cannot see in a green tick:
 * console errors and warnings, uncaught exceptions, failed requests, API answers of 4xx/5xx and API answers that
 * say `success: false` with a 200. Everything is kept per test (attachment `console.json`, read by the run
 * reporter); what FAILS the test is decided by `assertClean`.
 */
export type ConsoleKind = 'console.error' | 'console.warning' | 'pageerror' | 'request.failed' | 'api.status' | 'api.failure' | 'tolerated';

export interface ConsoleRecord {
    kind: ConsoleKind
    text: string
    url?: string
    status?: number
    /** the server's answer of a refused API call (its first 500 characters), when it could still be read */
    body?: string
    at: string
    page: string
}

/** Noise no page can avoid — never a finding. */
const IGNORE: RegExp[] = [
    /Download the React DevTools/i,
    /favicon\.ico/i,
    /ResizeObserver loop/i,
    /WebSocket .*(closed|failed)/i,
    /net::ERR_ABORTED/i,
    /\[antd: Message\]/i, // the app's own message hints
    // the browser's own line for a 4xx / 5xx answer or a failed request — the same event is recorded as `api.status`
    // / `request.failed` with its URL and status, and judged by the status rule, not as a console error
    /^Failed to load resource:/i,
    // the client logs antd's validation outcome of a refused save ({message: Required field, errorFields: …}) as a
    // console error; a spec submits an empty form on purpose to see the validation speak
    /^\{message: Required field/i
];

const isNoise = (text: string): boolean => IGNORE.some(re => re.test(text));

export class ConsoleCollector {
    readonly records: ConsoleRecord[] = [];
    private readonly seen = new Set<string>();
    private readonly off: Array<() => void> = [];

    constructor(private readonly page: Page) {
        const listen = (event: string, handler: (...args: any[]) => void) => {
            (page as any).on(event, handler);
            this.off.push(() => (page as any).off(event, handler));
        };
        listen('console', (message: any) => {
            const type = message.type();
            if (type !== 'error' && type !== 'warning') return;
            const text = message.text();
            if (isNoise(text)) return;
            const url = message.location()?.url;
            // a bug the run tolerates (--tolerate QA-450): its exact console error, and the warnings that come with it
            const bug = type === 'error' ? toleratedBy('console.error', url || '', text) : null;
            if (bug) {
                this.add({kind: 'tolerated', text: `${bug} ${text.slice(0, 1500)}`, url});
                this.pairCompanions(bug);
                return;
            }
            const companion = type === 'warning' ? companionOf(text) : null;
            if (companion && this.near(companion)) {
                this.add({kind: 'tolerated', text: `${companion} ${text.slice(0, 1500)}`, url});
                return;
            }
            this.add({kind: type === 'error' ? 'console.error' : 'console.warning', text: text.slice(0, 1500), url});
        });
        listen('pageerror', (error: any) => {
            this.add({kind: 'pageerror', text: `${error.message}\n${(error.stack || '').slice(0, 1500)}`});
        });
        listen('requestfailed', (req: any) => {
            const text = req.failure()?.errorText || 'failed';
            if (isNoise(text)) return;
            // a bug the run tolerates (--tolerate QA-227): recorded, counted, never a failure
            const bug = toleratedBy('request.failed', req.url(), text);
            this.add(bug ? {kind: 'tolerated', text: `${bug} ${text}`, url: req.url()} : {kind: 'request.failed', text, url: req.url()});
        });
        listen('response', async (res: any) => {
            const url = res.url();
            if (!url.includes('/api/')) return;
            const status = res.status();
            if (status >= 400) {
                // the answer says WHY (a 401 on POST /user, 2026-11-12, left no trace of it): read it while it is there —
                // a separate field, so the signature of a known issue does not change
                let body: string | undefined;
                try { body = (await res.text()).slice(0, 500); } catch { /* the page went on and the body is gone */ }
                this.add({kind: 'api.status', text: `${res.request().method()} ${status}`, url, status, body});
                return;
            }
            // a Hydra API answer is JSON; {success: false} with a 200 is a refusal the UI may have swallowed
            const type = res.headers()['content-type'] || '';
            if (!type.includes('json')) return;
            try {
                const body = await res.json();
                if (body && typeof body === 'object' && body.success === false)
                    this.add({kind: 'api.failure', text: `${res.request().method()} success:false ${body.message || ''}`.trim(), url, status});
            } catch { /* not JSON after all, or the body is gone */ }
        });
    }

    /** Stops listening — a shared page (the sweeps) gets a new collector per test and must not keep the old ones. */
    dispose(): void {
        while (this.off.length) this.off.pop()!();
    }

    /** A record of the tolerated bug within COMPANION_MS of now. */
    private near(bug: string): boolean {
        const now = Date.now();
        return this.records.some(r => r.kind === 'tolerated' && r.text.startsWith(`${bug} `) && now - Date.parse(r.at) <= COMPANION_MS);
    }

    /** The companion warnings recorded just BEFORE the bug's error become tolerated too. */
    private pairCompanions(bug: string): void {
        const now = Date.now();
        for (const r of this.records)
            if (r.kind === 'console.warning' && companionOf(r.text) === bug && now - Date.parse(r.at) <= COMPANION_MS) {
                r.kind = 'tolerated';
                r.text = `${bug} ${r.text}`;
            }
    }

    private add(record: Omit<ConsoleRecord, 'at' | 'page'>): void {
        const key = `${record.kind}|${record.text.slice(0, 200)}|${record.url || ''}`;
        if (this.seen.has(key)) return;
        this.seen.add(key);
        this.records.push({...record, at: new Date().toISOString(), page: this.page.url()});
    }

    /** What fails a journey: uncaught exceptions, console errors, every API answer of 4xx / 5xx or `success: false`, a
     *  failed request. A page that asks the server for something it refuses or does not have is a defect to REPORT —
     *  the suite never explains it away. Warnings fail only with QA_FAIL_ON_WARNINGS=1. */
    blocking(): ConsoleRecord[] {
        return this.records.filter(r =>
            r.kind === 'pageerror'
            || r.kind === 'console.error'
            || r.kind === 'api.status'
            || r.kind === 'api.failure'
            || r.kind === 'request.failed'
            || (CONFIG.failOnWarnings && r.kind === 'console.warning'));
    }

    async attach(testInfo: TestInfo): Promise<void> {
        await testInfo.attach('console.json', {body: JSON.stringify(this.records, null, 2), contentType: 'application/json'});
    }
}

/** Fails the journey on what the browser reported; the full list is already attached. */
export const assertClean = (collector: ConsoleCollector): void => {
    const blocking = collector.blocking();
    if (!blocking.length) return;
    const lines = blocking.slice(0, 10).map(r => `- [${r.kind}] ${r.text.split('\n')[0].slice(0, 200)}${r.url ? ` @ ${r.url}` : ''}`);
    throw new Error(`The page reported ${blocking.length} error(s) — API answers, failed requests, console errors:\n${lines.join('\n')}`);
};
