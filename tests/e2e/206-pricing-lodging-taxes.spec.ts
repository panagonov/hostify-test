import {test, expect} from '../helpers/fixtures';
import {formJourney, cleanBefore} from '../helpers/journey';
import {GridPage} from '../helpers/page-objects/GridPage';
import {qaName} from '../fixtures/test-data';

/**
 * 206 — Pricing › Lodging taxes (tax rules): one rule through its form, from create to remove; a period that ends before
 * it starts is refused.
 * @qa-description: Pricing › Lodging taxes — данъчно правило през формата: отказ на празна и на обърнат период, запис, четене през API, редакция, изтриване
 * @qa-level: regression
 *
 * Proves: an empty form is refused (Name, Tax code, Jurisdiction, Tax kind, Charge type, Status required); Valid to before
 * Valid from (picked in the calendar, DD-MM-YYYY) is refused by the server (accepted = a finding); „QA Lodging Tax Sofia“ (code QA-LT, 1.50) is saved — the API gives back
 * the same; the row's Edit sets 2.00 and the API shows it; the row's Remove deletes it. The rule applies by its
 * jurisdiction, not by listing (the form has no listing); the jurisdictions are American only (1.0.36) — City of Austin
 * (TX), where the account has no listing; it lives only for the spec.
 * Creates: taxRule ×1 (removed at the end). Needs: 003 green.
 */
const SPEC = '206';
const ENTITY = 'taxRule';
const NAME = qaName('Lodging Tax Sofia');

test.describe('206 pricing › lodging taxes', () => {
    test.setTimeout(300_000);
    test.beforeAll(async () => cleanBefore(ENTITY, SPEC, 'QA Lodging'));

    const fill = async (form: import('../helpers/page-objects/FormDrawer').FormDrawer, name: string, testInfo?: any) => {
        await form.fill('name', name);
        await form.fill('taxCode', 'QA-LT');
        // 1.0.36: the jurisdictions are American only (no Bulgaria) — one where the suite has no listing
        const j = await form.pickFirst('jurisdiction', /City of Austin/i);
        const k = await form.pickFirst('taxKind');
        const c = await form.pickFirst('chargeType', /^Per night$/i);
        await form.fillByLabel('Amount', '1.5');
        await form.pickFirst('status', /Active/i);
        testInfo?.annotations.push({type: 'Jurisdiction / Tax kind / Charge type', description: `${j} / ${k} / ${c}`});
    };

    test('a period that ends before it starts is refused', async ({page, signInAs, adminApi, qaConsole}) => {
        await signInAs('admin');
        const grid = new GridPage(page, ENTITY);
        await grid.goto('/pricing/taxRules');
        await grid.waitLoaded();
        // the server's refusal is the check itself (1.0.36: 400 on POST /taxRule)
        const release = qaConsole.expectRefusal('POST', /\/api\/taxRule(\?|$)/, 400);
        const form = await grid.openCreate('Create tax rule');
        await fill(form, `${NAME} wrong`);
        await form.fillDate('validFrom', '2027-01-31');
        await form.fillDate('validTo', '2027-01-01');
        await form.save();
        await expect(form.refusal, 'Valid to before Valid from is refused (the form or the server)').toBeVisible({timeout: 15_000});
        await form.dismissNotifications();
        await form.cancel();
        release();
        expect((await adminApi.search<any>(ENTITY, {searchTerm: `${NAME} wrong`, size: 10})).filter(r => r.name === `${NAME} wrong`), 'no rule with a reversed period was saved').toHaveLength(0);
    });

    test('a rule goes through its form: refused empty, created, read back, edited, removed', async ({page, signInAs, adminApi}, testInfo) => {
        await formJourney(page, signInAs, adminApi, testInfo, {
            spec: SPEC, entity: ENTITY, menu: ['pricing', 'taxRules'], url: /\/app\/pricing\/taxRules/,
            path: '/pricing/taxRules', createTitle: 'Create tax rule', editTitle: /tax rule|QA Lodging/i,
            required: ['name', 'taxCode', 'jurisdiction', 'taxKind', 'chargeType', 'status'], name: NAME,
            fill: form => fill(form, NAME, testInfo),
            saved: r => {
                expect(r.name, 'Name').toBe(NAME);
                expect(r.taxCode, 'Tax code').toBe('QA-LT');
                expect(Number(r.amount?.value ?? r.amount), 'Amount').toBe(1.5);
            },
            edit: async form => form.fillByLabel('Amount', '2'),
            edited: r => expect(Number(r.amount?.value ?? r.amount), 'the edited Amount').toBe(2)
        });
    });
});
