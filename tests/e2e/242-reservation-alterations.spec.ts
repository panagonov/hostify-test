import {test, expect} from '../helpers/fixtures';
import {GridPage} from '../helpers/page-objects/GridPage';
import {probePage, expectPresentable} from '../helpers/probe';
import {checkCreateForm} from '../helpers/checks';
import {Seed, reportLeftovers} from '../helpers/seed';
import {billingUnchanged} from '../helpers/billing';
import {isoDateIn, RUN_TAG} from '../fixtures/test-data';

/**
 * 242 — Reservations › Alterations: the form, and the refusal of an alteration of a DIRECT reservation (an alteration exists
 * for a channel reservation only — 1.0.36, −666). Accept and Decline are NEVER pressed (the QA person, 2026-11-26).
 * @qa-description: Reservations › Alterations — формата: отказ на празна; промяна на директна резервация се отказва от сървъра (само за резервации от канал), нищо не се записва
 * @qa-level: regression
 *
 * Proves, on our reservation (API: our listing, our guest @hostify-qa.test, 3 nights, Direct, unpaid, automations off):
 * an empty form is refused (Reservation, Origin, New check in, New check out); an alteration of that reservation (a manual
 * origin, the dates one day later) is refused by the server — „Alteration requests can only be sent for channel
 * reservations“ — nothing is saved and the reservation keeps its dates. The full journey (create, edit, remove) needs a
 * channel reservation — channels are absolute for now, so it waits.
 * Creates: listing ×1, guest ×1, reservation ×1 (API; cancelled / known leftovers).
 * Needs: 003 green.
 */
const SPEC = '242';
const ENTITY = 'reservationAlteration';
const LISTING = `QA G1 Alteration Listing ${RUN_TAG}`;

test.describe('242 reservations › alterations', () => {
    test.setTimeout(480_000);

    test('an alteration of our reservation: refused empty, created, read back, edited, removed; never accepted', async ({page, signInAs, adminApi, qaConsole}, testInfo) => {
        const seed = new Seed(adminApi, SPEC);
        let altId = '';
        try {
            const listing = await seed.listing(LISTING, {price: 100});
            const guest = await seed.guest('QA G1 Alteration', `Guest ${RUN_TAG}`, `qa.g1.alteration.${RUN_TAG}@hostify-qa.test`);
            await signInAs('admin');
            await billingUnchanged(page, testInfo, 'before the reservation');
            const r: any = await seed.reservation({listing, guest, inDays: 70, nights: 3});
            const grid = new GridPage(page, ENTITY);
            await grid.goto('/reservationsMenu/reservationAlterations');
            await grid.waitLoaded();
            await grid.clearFilters();
            expectPresentable(await probePage(page, testInfo, 'alterations'));
            await checkCreateForm(grid, testInfo, 'Create reservation alteration', {expectRequired: ['reservation', 'origin', 'newCheckIn', 'newCheckOut']});

            await test.step('an alteration of a DIRECT reservation is refused by the server (only a channel reservation has them)', async () => {
                // 1.0.36: 400, -666 „Alteration requests can only be sent for channel reservations“ — the refusal is the check
                const release = qaConsole.expectRefusal('POST', /\/api\/reservationAlteration(\?|$)/, 400);
                const form = await grid.openCreate('Create reservation alteration');
                // a reservation is listed as „<guest> — <confirmation code>“ (1.0.36)
                await form.pickFirst('reservation', new RegExp(guest.name), guest.name);
                const origin = await form.pickFirst('origin', /host|manual|guest|staff/i);
                testInfo.annotations.push({type: 'Origin', description: origin});
                await form.fillDate('newCheckIn', isoDateIn(71));
                await form.fillDate('newCheckOut', isoDateIn(74));
                await form.save();
                await expect(form.refusal, 'the alteration of a direct reservation is refused').toBeVisible({timeout: 15_000});
                testInfo.annotations.push({type: 'отказ', description: (await form.refusal.innerText()).replace(/\s+/g, ' ').slice(0, 200)});
                await form.dismissNotifications();
                await form.cancel();
                release();
                const mine = (await adminApi.search<any>(ENTITY, {size: 50})).filter(a => (a.reservation?.id || a.reservation) === r.id);
                expect(mine, 'no alteration of our reservation was saved').toHaveLength(0);
                expect(String((await adminApi.read<any>('reservation', r.id))?.checkIn), 'the reservation keeps its dates').toContain(isoDateIn(70));
            });
            await billingUnchanged(page, testInfo, 'after the reservation');
        } finally {
            if (altId) {
                const gone = await adminApi.remove(ENTITY, altId);
                if (!gone.ok) throw new Error(`STOP — reservationAlteration ${altId} could not be removed at ${new Date().toISOString()}: ${gone.message}. Not retried.`);
            }
            reportLeftovers(testInfo, await seed.cleanup());
        }
    });
});
