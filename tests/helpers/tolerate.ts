/**
 * Known bugs a run TOLERATES — `node tools/qa.mjs run --tolerate QA-227` (QA_TOLERATE=QA-227): what the bug breaks on
 * every page is recorded as „толерирано“, not as an error, so the rest of the page can still be checked (the QA
 * person, 2026-11-16: QA-227 stops 110, and 111 has no tags without it). Only the exact symptom of the bug is
 * tolerated — any other error of the same kind stays red. Never the default: the runner says it before the run, the
 * run's README and every check's record count what was tolerated, and a bug is never verified in such a run. A bug
 * leaves this list when it is fixed.
 */
const KNOWN: Record<string, {what: string; matches: (kind: string, url: string, text: string) => boolean}> = {
    // the CHANNEL logos (`<site>.tsvetan-54a.workers.dev/logo.png`) blocked by the browser (ERR_BLOCKED_BY_ORB / a broken
    // image): on 2026-11-24 they answer 401 text/html. The PLUGIN logos (hostify-apps.bioseek.eu/plugins/…) were fixed
    // that day (62 logos, 200, image/*) and are no longer tolerated — they must load on their own.
    'QA-227': {
        what: 'блокираните лога на каналите (*.tsvetan-54a.workers.dev/logo.png)',
        matches: (kind, url, text) =>
            /^https:\/\/[\w-]+\.tsvetan-54a\.workers\.dev\/logo\.png$/i.test(url)
            && ((kind === 'request.failed' && /ERR_BLOCKED_BY_ORB/.test(text)) || kind === 'broken-image')
    },
    // 1.0.26: the client logs this console error after the sign-in's own reload and 2–4 s after every page opens (an
    // aborted POST /userEvent/collect before it) — seen on a calm sign-in too (2026-11-23 12:25). ONLY the exact text
    // from the app's own bundle; any other console error stays red.
    'QA-450': {
        what: 'грешката „EventEmitter error whn try to add result in event“ в конзолата',
        matches: (kind, url, text) => kind === 'console.error'
            && text.trim() === 'EventEmitter error whn try to add result in event'
            && /^https:\/\/hostify\.bioseek\.eu\/app\/static\/js\/main\.[0-9a-f]+\.js(\?[\d.]+)?$/.test(url)
    }
};

/**
 * Warnings that come WITH a tolerated error (within COMPANION_MS of it, before or after) and are counted with it;
 * alone they stay what they are. QA-450: the menu counters, the demo status and the plugins lose their requests when
 * the sign-in reloads the page.
 */
const COMPANIONS: Record<string, RegExp> = {
    'QA-450': /^\[(InboxMenuCount|AlertsMenuCount|demoData|hydraPartner)\][^\n]*TypeError: Failed to fetch/
};
export const COMPANION_MS = 5_000;

const active = (process.env.QA_TOLERATE || '').split(',').map(s => s.trim()).filter(s => KNOWN[s]);

/** The bug a record is the known symptom of, when the run tolerates that bug; else null. */
export const toleratedBy = (kind: string, url: string, text = ''): string | null =>
    active.find(bug => KNOWN[bug].matches(kind, url, text)) || null;

export const TOLERABLE = Object.fromEntries(Object.entries(KNOWN).map(([bug, k]) => [bug, k.what]));

/** The tolerated bug a warning accompanies (the bug's own error must be within COMPANION_MS of it); else null. */
export const companionOf = (text: string): string | null =>
    active.find(bug => COMPANIONS[bug]?.test(text)) || null;
