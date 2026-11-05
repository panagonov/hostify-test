import * as fs from 'fs';
import * as path from 'path';

/**
 * The suite's configuration: `.env` at the project root (never committed; `.env.example` lists the keys), then the
 * process environment — a variable already set in the environment wins over the file.
 */
export const ROOT = path.resolve(__dirname, '../..');

const loadDotEnv = (file: string): void => {
    if (!fs.existsSync(file)) return;
    for (const raw of fs.readFileSync(file, 'utf8').split('\n')) {
        const line = raw.trim();
        if (!line || line.startsWith('#')) continue;
        const eq = line.indexOf('=');
        if (eq < 0) continue;
        const key = line.slice(0, eq).trim();
        let value = line.slice(eq + 1).trim();
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
        if (process.env[key] === undefined) process.env[key] = value;
    }
};

loadDotEnv(path.join(ROOT, '.env'));

const baseUrl = (process.env.QA_BASE_URL || 'https://hostify.bioseek.eu').replace(/\/+$/, '');

export const CONFIG = {
    baseUrl,
    apiUrl: (process.env.QA_API_URL || `${baseUrl}/api`).replace(/\/+$/, ''),
    /** The client lives under /app (the Hydra client's homepage). */
    appPath: '/app',
    headed: process.env.QA_HEADED === '1',
    slowMo: Number(process.env.QA_SLOW_MO || 0) || 0,
    strictVisual: process.env.QA_STRICT_VISUAL === '1',
    failOnWarnings: process.env.QA_FAIL_ON_WARNINGS === '1',
    superAdmin: {
        email: process.env.QA_SUPERADMIN_EMAIL || '',
        password: process.env.QA_SUPERADMIN_PASSWORD || ''
    },
    /** The QA account the suite creates once (002) and reuses: found by NAME, its id is cached in .qa/state.json. */
    tenant: {
        name: process.env.QA_TENANT_NAME || 'QA Automation',
        accountEmail: process.env.QA_TENANT_EMAIL || 'qa.account@hostify-qa.test',
        accountType: 'Standalone',
        currency: 'EUR',
        timezone: 'Europe/Sofia',
        region: 'eu'
    },
    /** The account administrator (002) — a KNOWN password, so a person can sign in to the same account. */
    admin: {
        name: process.env.QA_ADMIN_NAME || 'QA Admin',
        email: process.env.QA_ADMIN_EMAIL || 'qa.admin@hostify-qa.test',
        password: process.env.QA_ADMIN_PASSWORD || ''
    }
} as const;

/** A credential the run cannot go on without — the message says which key of `.env` to fill. */
export const requireSecret = (value: string, key: string): string => {
    if (value) return value;
    throw new Error(`Missing ${key}: fill it in ${path.join(ROOT, '.env')} (see .env.example).`);
};

export const superAdminCredentials = () => ({
    email: requireSecret(CONFIG.superAdmin.email, 'QA_SUPERADMIN_EMAIL'),
    password: requireSecret(CONFIG.superAdmin.password, 'QA_SUPERADMIN_PASSWORD')
});

export const adminCredentials = () => ({
    email: CONFIG.admin.email,
    password: requireSecret(CONFIG.admin.password, 'QA_ADMIN_PASSWORD')
});
