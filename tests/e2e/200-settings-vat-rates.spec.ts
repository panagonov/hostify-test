import {test, expect} from '../helpers/fixtures';
import {formJourney, cleanBefore} from '../helpers/journey';
import {GridPage} from '../helpers/page-objects/GridPage';
import {qaName} from '../fixtures/test-data';

/**
 * 200 — Settings › VATs: one VAT rate through its form, from create to remove; impossible rates refused.
 * @qa-description: Settings › VATs — ДДС ставка през формата: отказ на празна и на невъзможна ставка, запис, четене през API, редакция, изтриване
 * @qa-level: regression
 *
 * Proves: an empty form is refused (Name, Rate (%), Rate type, Status required); a rate of −5 % and one of 150 % are
 * refused, by the form or by the server (accepted = a finding); „QA VAT 9“ (9 %, Bulgaria, Active, VAT not included in the price) is saved — the API
 * gives back the same; the row's Edit sets 10 % and the API shows it; the row's Remove deletes it.
 * Creates: vatRate ×1 (removed at the end). Needs: 003 green.
 */
const SPEC = '200';
const ENTITY = 'vatRate';
const NAME = qaName('VAT 9');

test.describe('200 settings › vat rates', () => {
    test.setTimeout(300_000);
    test.beforeAll(async () => cleanBefore(ENTITY, SPEC, 'QA VAT'));

    test('an impossible rate is refused by the form', async ({page, signInAs, adminApi, qaConsole}) => {
        await signInAs('admin');
        const grid = new GridPage(page, ENTITY);
        await grid.goto('/settings/vatRates');
        await grid.waitLoaded();
        for (const rate of ['-5', '150']) {
            // the server's refusal is the check itself (1.0.35: 400, -496 „The rate does not match its type“)
            const release = qaConsole.expectRefusal('POST', /\/api\/vatRate(\?|$)/, 400);
            const form = await grid.openCreate('Create vat rate');
            await form.fill('name', `${NAME} wrong`);
            await form.fillByLabel('Rate (%)', rate);
            await form.pickFirst('rateType');
            await form.pickFirst('status');
            await form.save();
            // refused by the form or by the server (1.0.35: -496 „The rate does not match its type“)
            await expect(form.refusal, `a rate of ${rate} % is refused`).toBeVisible({timeout: 15_000});
            await form.dismissNotifications();
            await form.cancel();
            release();
        }
        expect((await adminApi.search<any>(ENTITY, {searchTerm: `${NAME} wrong`, size: 10})).filter(r => r.name === `${NAME} wrong`), 'no impossible rate was saved').toHaveLength(0);
    });

    test('a VAT rate goes through its form: refused empty, created, read back, edited, removed', async ({page, signInAs, adminApi}, testInfo) => {
        await formJourney(page, signInAs, adminApi, testInfo, {
            spec: SPEC, entity: ENTITY, menu: ['settings', 'vatRates'], url: /\/app\/settings\/vatRates/,
            path: '/settings/vatRates', createTitle: 'Create vat rate', editTitle: /vat rate|QA VAT 9/i,
            required: ['name', 'rateType', 'status'], name: NAME,
            fill: async form => {
                await form.fill('name', NAME);
                await form.fillByLabel('Rate (%)', '9');
                await form.pickFirst('country', /Bulgaria/, 'Bulgaria');
                testInfo.annotations.push({type: 'Rate type', description: await form.pickFirst('rateType')});
                await form.pickFirst('status', /Active/i);
                await form.setSwitch('priceIncludesVat', false);
            },
            saved: r => {
                expect(r.name, 'Name').toBe(NAME);
                expect(Number(r.ratePercent ?? r.rate), 'Rate (%)').toBe(9);
                expect(Boolean(r.priceIncludesVat), 'VAT not included').toBe(false);
            },
            edit: async form => form.fillByLabel('Rate (%)', '10'),
            edited: r => expect(Number(r.ratePercent ?? r.rate), 'the edited Rate (%)').toBe(10)
        });
    });
});
