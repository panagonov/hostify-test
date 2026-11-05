import {ApiHelper} from './api';
import {activeTenant, adminCredentials, CONFIG, superAdminCredentials} from './env';
import {forgetCreated, readManifest, readState, resetManifest, writeState} from './state';

/**
 * Before a run: everything the PREVIOUS run created in the QA account is removed, and the removal is verified — a
 * spec that finds yesterday's records counts them as its own and lies.
 *
 * Two mechanisms, in this order:
 *  1. the platform's own "Delete demo data" (POST /demoData/remove as the account's administrator): removes every
 *     record of the account that carries `demo: true` — which is every record a run creates once the server stamps
 *     the `x-demo-data` header (every request of this suite carries it);
 *  2. the manifest `.qa/created.json`: every record a spec registered is deleted by id (as the administrator, then as
 *     the super administrator), newest entity first — the fallback for a server that does not stamp yet, and the
 *     verification of (1).
 * The QA account and its administrator SURVIVE (pinned `demo: false` by spec 002); only their contents go.
 *
 * Throws when something stays — the chain must not start on dirty data.
 */
export interface CleanupReport {
    tenantId: string | null
    demoRemoved: boolean
    demoCountBefore: number
    manifestDeleted: number
    manifestFailed: {entity: string; id: string; message: string}[]
    notes: string[]
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export const findTenantByName = async (superAdmin: ApiHelper, name: string): Promise<{id: string; name: string; [k: string]: any} | null> => {
    const rows = await superAdmin.search<any>('tenant', {name, size: 20});
    return rows.find(t => t?.name === name) || null;
};

export async function cleanupPreviousRun(log: (line: string) => void = console.log): Promise<CleanupReport> {
    const report: CleanupReport = {tenantId: null, demoRemoved: false, demoCountBefore: 0, manifestDeleted: 0, manifestFailed: [], notes: []};
    const sa = superAdminCredentials();
    const superAdmin = await ApiHelper.login(sa.email, sa.password);
    try {
        const tenant = await findTenantByName(superAdmin, activeTenant().name);
        if (!tenant) {
            log(`[cleanup] no account "${activeTenant().name}" yet — nothing to remove`);
            resetManifest();
            writeState({tenantId: undefined, adminUserId: undefined});
            return report;
        }
        report.tenantId = tenant.id;
        const state = readState();
        if (state.tenantId && state.tenantId !== tenant.id)
            report.notes.push(`the account "${activeTenant().name}" has id ${tenant.id}, the state remembered ${state.tenantId} — the account was re-created outside the suite`);
        writeState({tenantId: tenant.id, tenantName: tenant.name});

        // 1. the platform's wipe, as the account administrator
        const admin = CONFIG.admin.password ? await ApiHelper.login(adminCredentials().email, adminCredentials().password).catch(() => null) : null;
        if (!admin) {
            report.notes.push(`the administrator ${adminCredentials().email} cannot sign in — the demo-data wipe was skipped; spec 002 re-creates the administrator when it is missing`);
        } else {
            try {
                const status = await admin.get('/demoData/status');
                const count = Number(status?.data?.count || 0);
                report.demoCountBefore = count;
                if (count > 0) {
                    log(`[cleanup] the account holds ${count} demo record(s) — asking the platform to remove them`);
                    const started = await admin.post('/demoData/remove', {});
                    if (!started.success) report.notes.push(`POST /demoData/remove refused: ${started.message || started.status}`);
                    else {
                        const end = Date.now() + 240_000;
                        while (Date.now() < end) {
                            await sleep(3000);
                            const now = await admin.get('/demoData/status');
                            if (Number(now?.data?.count || 0) === 0 && !now?.data?.running && !now?.data?.job) { report.demoRemoved = true; break; }
                        }
                        if (!report.demoRemoved) report.notes.push('the demo-data removal did not finish within 4 minutes');
                    }
                } else {
                    report.demoRemoved = true;
                }
            } catch (e: any) {
                report.notes.push(`demo-data status/remove failed: ${e?.message || e}`);
            }
        }

        // 2. the manifest: delete by id what is still there, newest entity first
        const manifest = readManifest();
        for (const entity of [...manifest.order].reverse()) {
            for (const record of [...(manifest.entities[entity] || [])].reverse()) {
                const still = await superAdmin.read(entity, record.id);
                if (!still) continue;
                let answer = admin ? await admin.remove(entity, record.id) : {ok: false, message: 'no administrator session'};
                if (!answer.ok) answer = await superAdmin.remove(entity, record.id);
                if (answer.ok) report.manifestDeleted++;
                else report.manifestFailed.push({entity, id: record.id, message: answer.message || 'refused'});
            }
        }
        // verification: nothing of the manifest may remain
        const leftovers: string[] = [];
        for (const entity of manifest.order)
            for (const record of manifest.entities[entity] || [])
                if (await superAdmin.read(entity, record.id)) leftovers.push(`${entity}/${record.id} (${record.name})`);
        if (leftovers.length)
            throw new Error(`[cleanup] ${leftovers.length} record(s) of the previous run are still there — remove them by hand before the run:\n${leftovers.slice(0, 20).join('\n')}`);
        resetManifest();
        log(`[cleanup] account ${tenant.id}: demo wipe ${report.demoRemoved ? 'done' : 'skipped'} (${report.demoCountBefore} before), manifest deleted ${report.manifestDeleted}, failed ${report.manifestFailed.length}`);
        for (const note of report.notes) log(`[cleanup] note: ${note}`);
        if (admin) await admin.dispose();
        return report;
    } finally {
        await superAdmin.dispose();
    }
}

/**
 * A spec's OWN records from an earlier run of the same spec — deleted before it creates them again, so a spec can be run
 * alone (`--only NNN`) without the whole chain's cleanup (002). By the manifest first, then by the suite's names in the
 * entity (`searchTerm`), as the account's administrator. Nothing else of the account is touched.
 */
export async function cleanupSpecRecords(api: ApiHelper, entity: string, spec: string, searchTerm: string, log: (line: string) => void = console.log): Promise<number> {
    let deleted = 0;
    const seen = new Set<string>();
    const byManifest = readManifest().entities[entity]?.filter(r => r.spec === spec) || [];
    const byName = (await api.search<any>(entity, {searchTerm, size: 200})).filter(r => typeof r?.name === 'string' && r.name.startsWith(searchTerm));
    for (const record of [...byManifest, ...byName]) {
        if (!record?.id || seen.has(record.id)) continue;
        seen.add(record.id);
        if (!(await api.read(entity, record.id))) continue;
        const answer = await api.remove(entity, record.id);
        if (!answer.ok) throw new Error(`[cleanup ${spec}] ${entity} "${record.name}" (${record.id}) could not be removed: ${answer.message}`);
        deleted++;
    }
    forgetCreated(entity, spec);
    if (deleted) log(`[cleanup ${spec}] removed ${deleted} ${entity} record(s) of an earlier run`);
    return deleted;
}
