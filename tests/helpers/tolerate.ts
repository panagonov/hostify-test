/**
 * Known bugs a run TOLERATES — `node tools/qa.mjs run --tolerate QA-227` (QA_TOLERATE=QA-227): what the bug breaks on
 * every page is recorded as „толерирано“, not as an error, so the rest of the page can still be checked (the QA
 * person, 2026-11-16: QA-227 stops 110, and 111 has no tags without it). Only the exact symptom of the bug is
 * tolerated — any other error of the same kind stays red. Never the default: the runner says it before the run, the
 * run's README and every check's record count what was tolerated, and a bug is never verified in such a run. A bug
 * leaves this list when it is fixed.
 */
const KNOWN: Record<string, {what: string; matches: (kind: string, url: string, text: string) => boolean}> = {
    // the plugin and channel logos blocked by the browser (ERR_BLOCKED_BY_ORB / a broken image), 1.0.14+; the plugins'
    // container not answering at all (ERR_CONNECTION_TIMED_OUT, 1.0.20 — QA-438, a duplicate) — the plugin logos only
    'QA-227': {
        what: 'блокираните лога на плъгините и каналите',
        matches: (kind, url, text) =>
            (/^https:\/\/(hostify-apps\.bioseek\.eu\/plugins\/[\w-]+\/logo\.(png|svg|jpe?g|gif)|[\w-]+\.tsvetan-54a\.workers\.dev\/logo\.png)$/i.test(url)
                && ((kind === 'request.failed' && /ERR_BLOCKED_BY_ORB/.test(text)) || kind === 'broken-image'))
            || (/^https:\/\/hostify-apps\.bioseek\.eu\/plugins\/[\w-]+\/logo\.(png|svg|jpe?g|gif)$/i.test(url)
                && kind === 'request.failed' && /ERR_CONNECTION_TIMED_OUT/.test(text))
    }
};

const active = (process.env.QA_TOLERATE || '').split(',').map(s => s.trim()).filter(s => KNOWN[s]);

/** The bug a record is the known symptom of, when the run tolerates that bug; else null. */
export const toleratedBy = (kind: string, url: string, text = ''): string | null =>
    active.find(bug => KNOWN[bug].matches(kind, url, text)) || null;

export const TOLERABLE = Object.fromEntries(Object.entries(KNOWN).map(([bug, k]) => [bug, k.what]));
