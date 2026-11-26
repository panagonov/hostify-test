/**
 * Non-sensitive data of the suite. Credentials live in `.env` (tests/helpers/env.ts), never here.
 *
 * Names of records the specs create carry the prefix `QA ` — a person recognises them in any grid, and a spec finds
 * its own records by name when it counts them.
 */
export const NAME_PREFIX = 'QA ';

/** `QA <name>` — the display name of a record a spec creates. */
export const qaName = (name: string): string => `${NAME_PREFIX}${name}`;

/** ISO date (YYYY-MM-DD) `days` from today, in the suite's time zone. */
export const isoDateIn = (days: number): string => {
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    d.setDate(d.getDate() + days);
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

/**
 * The mark of this run (`MMDD-HHmm`, local time) — added to the names a record keeps after its spec: an archived listing
 * that cannot be removed (its linked records) keeps its nickname until the demo-data wipe of 002, and the application
 * refuses a second listing with the same nickname (2026-11-26). One value for the whole run of a worker.
 */
export const RUN_TAG = (() => {
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}`;
})();
