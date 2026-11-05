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
