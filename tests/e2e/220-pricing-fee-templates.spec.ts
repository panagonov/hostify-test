import {test, expect} from '../helpers/fixtures';
import {Sidebar} from '../helpers/page-objects/Sidebar';
import {GridPage} from '../helpers/page-objects/GridPage';
import {FormDrawer} from '../helpers/page-objects/FormDrawer';
import {probePage, expectPresentable} from '../helpers/probe';
import {checkCreateForm, idOfSaved} from '../helpers/checks';
import {rememberCreated, forgetCreated} from '../helpers/state';
import {Seed, money, reportLeftovers} from '../helpers/seed';
import {isoDateIn, qaName, RUN_TAG} from '../fixtures/test-data';

/**
 * 220 — Pricing › Fees (fee templates — the grid Base Price, Fees, Taxes, Extras and Costs share): a template through its
 * form, with ONE line and ONLY our listing; its amount reaches the listing's price.
 * @qa-description: Pricing › шаблон за такси през формата — ред „Bed linen fee“, само наша обява; офертата на обявата показва таксата; редакция и изтриване
 * @qa-level: regression
 *
 * Proves: an empty form is refused (Name, Type, Currency, Country, Status); a template without a line is refused (the
 * server: „A template needs at least one fee line“); „QA Fee Template <run mark>“ (EUR, Bulgaria, Active) with the line
 * „Bed linen fee“ of 30 € and Properties = only our inactive listing (API) is saved — the API gives back the same; the
 * engine's quote of 3 nights on that listing shows a line „Bed linen“ of 30 € beside the rent of 300 € (nothing reserved:
 * a quote creates no record and bills nothing); the row's Edit sets 40 € and the quote follows; the row's Remove deletes
 * it; the line the template COPIED into the listing's fees stays (1.0.36 — a question to the developer: recorded, not
 * failed) and is removed from the listing's fees by the test, after which the quote has no Bed linen. Every fee of the quote is named; a „QA …“ fee we did not expect is reported as a
 * leftover of another test, not as a bug (the QA person, 2026-11-27).
 * Creates: listing ×1 (API, archived — a known leftover), feeTemplate ×1 (removed). Needs: 003 green.
 */
const SPEC = '220';
const ENTITY = 'feeTemplate';
const NAME = qaName(`Fee Template ${RUN_TAG}`);
const LISTING = `QA G2 Template Listing ${RUN_TAG}`;

test.describe('220 pricing › fee templates', () => {
    test.setTimeout(480_000);

    test('a template with one line and only our listing: its fee reaches the quote, follows the edit, leaves with the remove', async ({page, signInAs, adminApi, qaConsole}, testInfo) => {
        const seed = new Seed(adminApi, SPEC);
        const linenOf = async (listingId: string) => {
            const q = await seed.quote(listingId, isoDateIn(60), isoDateIn(63));
            const lines: any[] = q.lines || [];
            for (const l of lines.filter(x => x.lineType !== 'accommodation' && money(x.total) !== 0))
                testInfo.annotations.push({type: /^QA /.test(l.name) && !/Bed linen/i.test(l.name) ? 'остатък от друг тест' : 'такса в офертата', description: `${l.name}: ${money(l.total)} €`});
            expect(money(q.accommodation), 'the rent of 3 nights × 100 €').toBe(300);
            return lines.filter(l => /linen/i.test(l.name)).reduce((s, l) => s + money(l.total), 0);
        };
        let id = '';
        try {
            const listing = await seed.listing(LISTING, {price: 100});
            expect(await linenOf(listing.id), 'no Bed linen fee before the template').toBe(0);
            await signInAs('admin');
            const sidebar = new Sidebar(page);
            await sidebar.openGroup('pricing');
            await sidebar.openItem(['pricingFees']);
            const grid = new GridPage(page, ENTITY);
            await grid.waitLoaded();
            await grid.clearFilters();
            expectPresentable(await probePage(page, testInfo, 'fee-templates'));
            await checkCreateForm(grid, testInfo, 'Create fee template', {expectRequired: ['name', 'feeItemType', 'currency', 'country', 'status']});

            await test.step(`"${NAME}": refused without a line, then saved with "Bed linen fee" 30 € and only our listing`, async () => {
                const form = await grid.openCreate('Create fee template');
                const info = async () => {
                    await form.fill('name', NAME);
                    testInfo.annotations.push({type: 'Type', description: await form.pickFirst('feeItemType', /Fee/i)});
                    await form.pickFirst('currency', /€|EUR/i);
                    await form.pickFirst('country', /Bulgaria/, 'Bulg');
                    await form.pickFirst('status', /Active/i);
                };
                await info();
                // the server's refusal is the check itself (1.0.36: 400 „A template needs at least one fee line“)
                const release = qaConsole.expectRefusal('POST', /\/api\/feeTemplate(\?|$)/, 400);
                await form.save();
                await expect(form.refusal, 'a template without a line is refused').toBeVisible({timeout: 15_000});
                await form.dismissNotifications();
                release();
                // 1.0.36: after the server's refusal the form is EMPTY again (a candidate, reported to QA) — filled anew
                if (!(await form.valueOf('name'))) {
                    testInfo.annotations.push({type: 'наблюдение', description: 'след отказа на сървъра формата изчисти въведеното'});
                    await info();
                }
                await form.root.getByRole('button', {name: /^Items$/}).click();
                await form.control('fee-quick-fee-22').click();
                await form.fillByLabel('Amount', '30');
                await form.root.getByRole('button', {name: /^Listings$/}).click();
                await form.pickFirst('listings', new RegExp(LISTING), LISTING);
                await form.saveAndClose();
                id = await idOfSaved(adminApi, ENTITY, NAME);
                rememberCreated(ENTITY, {id, name: NAME}, SPEC);
                const t: any = await adminApi.read(ENTITY, id);
                expect(JSON.stringify(t), 'the template holds only our listing').toContain(listing.id);
                expect(JSON.stringify(t).toLowerCase(), 'the template has the line of Bed linen').toMatch(/linen|fee-22/);
                await expect.poll(() => linenOf(listing.id), {message: 'the quote of our listing shows Bed linen 30 €', timeout: 60_000}).toBe(30);
            });
            await test.step('the row\'s Edit sets 40 €; the quote follows', async () => {
                await grid.search(NAME);
                await grid.rowAction(grid.row(NAME), /^\s*Edit\s*$/);
                const form = new FormDrawer(page, new RegExp(`fee template|${NAME}`, 'i'));
                await form.waitOpen();
                await form.root.getByRole('button', {name: /^Items$/}).click();
                await form.fillByLabel('Amount', '40');
                await form.saveAndClose();
                await expect.poll(() => linenOf(listing.id), {message: 'the quote shows Bed linen 40 €', timeout: 60_000}).toBe(40);
            });
            await test.step('the row\'s Remove deletes the template; the fee leaves the quote', async () => {
                await grid.clearFilters();
                await grid.search(NAME);
                await grid.removeRow(grid.row(NAME));
                await expect(grid.row(NAME)).toBeHidden({timeout: 30_000});
                if (await adminApi.read(ENTITY, id)) throw new Error(`STOP — feeTemplate "${NAME}" (${id}) is still there after Remove (${new Date().toISOString()}). Not retried.`);
                forgetCreated(ENTITY, SPEC);
                id = '';
                // 1.0.36: the template COPIED its line into the listing's fees, and the copy stays after the template is
                // removed (a question to the developer, feedback/2026-11-27-1-0-36-fee-template-copy-stays.md) — recorded,
                // not failed; the copy is then removed from OUR listing's fees
                const own: any = await adminApi.read('listing', listing.id);
                const copies = (own.fees || []).filter((f: any) => /linen/i.test(f.feeItem?.name || f.feeItem?.name_en || ''));
                testInfo.annotations.push({type: 'поведение (въпрос към програмиста)', description: `след Remove на шаблона в таксите на обявата остават ${copies.length} копие(я): ${copies.map((c: any) => `${c.feeItem?.name} ${c.amount} € (source ${c.source}, template ${c.template ?? 'няма'})`).join('; ') || 'няма'}`});
                if (copies.length) await adminApi.must('PUT', '/listing', {id: listing.id, fees: (own.fees || []).filter((f: any) => !copies.includes(f))});
                await expect.poll(() => linenOf(listing.id), {message: 'no Bed linen fee once the copy is removed from the listing', timeout: 60_000}).toBe(0);
                await grid.clearFilters();
            });
        } finally {
            if (id) {
                const gone = await adminApi.remove(ENTITY, id);
                if (!gone.ok) throw new Error(`STOP — feeTemplate "${NAME}" (${id}) could not be removed at ${new Date().toISOString()}: ${gone.message}. Not retried.`);
            }
            reportLeftovers(testInfo, await seed.cleanup());
        }
    });
});
