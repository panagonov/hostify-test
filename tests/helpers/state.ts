import * as fs from 'fs';
import * as path from 'path';
import {ROOT} from './env';

/**
 * What one run leaves for the next, in `.qa/` (git-ignored):
 *
 * - `state.json` — the QA account: its id (stable from the first run on, so a record can be recognised by it as
 *   well as by the account's name), the administrator's id, when it was made.
 * - `created.json` — the MANIFEST of records the specs created through the forms: entity, id, name, the spec.
 *   Every spec that creates records registers them (`rememberCreated`), and the count check at its end reads the
 *   same manifest; the cleanup of the next run deletes exactly these when the platform's demo-data wipe is not
 *   available for them.
 */
const DIR = path.join(ROOT, '.qa');
const STATE = path.join(DIR, 'state.json');
const MANIFEST = path.join(DIR, 'created.json');

export interface QaState {
    tenantId?: string
    tenantName?: string
    adminUserId?: string
    adminEmail?: string
    createdAt?: string
    updatedAt?: string
}

export interface CreatedRecord {
    id: string
    name: string
    spec: string
    at: string
}

export interface Manifest {
    order: string[]
    entities: Record<string, CreatedRecord[]>
}

const readJson = <T>(file: string, fallback: T): T => {
    try {
        return JSON.parse(fs.readFileSync(file, 'utf8')) as T;
    } catch {
        return fallback;
    }
};

const writeJson = (file: string, value: unknown): void => {
    fs.mkdirSync(DIR, {recursive: true});
    fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n');
};

export const readState = (): QaState => readJson<QaState>(STATE, {});

export const writeState = (patch: Partial<QaState>): QaState => {
    const next = {...readState(), ...patch, updatedAt: new Date().toISOString()};
    writeJson(STATE, next);
    return next;
};

export const readManifest = (): Manifest => readJson<Manifest>(MANIFEST, {order: [], entities: {}});

export const resetManifest = (): void => writeJson(MANIFEST, {order: [], entities: {}});

/** A record a spec created through the UI — registered so the count check and the next cleanup know it. */
export const rememberCreated = (entity: string, record: {id: string; name: string}, spec: string): void => {
    const manifest = readManifest();
    if (!manifest.entities[entity]) {
        manifest.entities[entity] = [];
        manifest.order.push(entity);
    }
    if (!manifest.entities[entity].some(r => r.id === record.id))
        manifest.entities[entity].push({...record, spec, at: new Date().toISOString()});
    writeJson(MANIFEST, manifest);
};

/** The records a spec (or every spec) registered for an entity. */
export const createdIn = (entity: string, spec?: string): CreatedRecord[] =>
    (readManifest().entities[entity] || []).filter(r => !spec || r.spec === spec);

/** Drops a spec's entries (or every entry of the entity) from the manifest — after they were deleted. */
export const forgetCreated = (entity: string, spec?: string): void => {
    const manifest = readManifest();
    const kept = (manifest.entities[entity] || []).filter(r => spec && r.spec !== spec);
    if (kept.length) manifest.entities[entity] = kept;
    else {
        delete manifest.entities[entity];
        manifest.order = manifest.order.filter(e => e !== entity);
    }
    writeJson(MANIFEST, manifest);
};
