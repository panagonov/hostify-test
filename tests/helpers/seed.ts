import {expect} from '@playwright/test';
import {ApiHelper} from './api';
import {rememberCreated} from './state';
import {isoDateIn} from '../fixtures/test-data';

/**
 * Quick set-up through the API for the groups that do NOT test the form of a record (the QA person, 2026-11-26: a record
 * goes in through its form ONCE, in its own spec; every other group prepares what it needs here, tests, and cleans up).
 *
 * Every record is named „QA …“, registered with `rememberCreated` (the chain's cleanup in 002 knows it) and kept in
 * `this.made`, so the spec removes exactly its own records in `cleanup()` — never anything else of the account.
 *
 * The limits of the QA account (CLAUDE.md, „Full coverage“):
 * - a listing is made INACTIVE (`activate: false` — „Activate now (PMS Services ON)“ off), with no channel — ACTIVE only
 *   when a spec asks for it and checks it (240–250, variant A of the QA person, 2026-11-26);
 * - a guest has an e-mail of `@hostify-qa.test` only and a fictional phone (+359 000 000 …);
 * - a reservation is DIRECT (source Direct), unpaid, and its automations are switched OFF before anything else;
 * - a reservation is never deleted (the application refuses: −649 „cancel it instead“) — it is CANCELLED, and only
 *   when every guard holds: made by this spec, source Direct, guest `@hostify-qa.test`, nothing paid, automations off;
 *   a guard that fails is a STOP (nothing pressed, nothing retried);
 * - a listing is ARCHIVED, then removed; a guest is removed. A removal refused because of the records the platform
 *   linked to it („db relations“ — the listing's calendar, its cancelled reservations) is a KNOWN LEFTOVER: named in
 *   the report, removed by the demo-data wipe of 002 (the QA person, 2026-11-26, after the --only 002 probe). Any other
 *   refusal is a STOP.
 */
export const QA_GUEST_DOMAIN = '@hostify-qa.test';

export interface Made {entity: 'listing' | 'guest' | 'reservation'; id: string; name: string}
export interface Leftover {entity: string; id: string; name: string; why: string}

/** Money as the API answers it: `{value, currency}`. */
export const money = (m: any): number => Number(m?.value ?? m ?? 0);

export class Seed {
    readonly made: Made[] = [];
    private directId: string | null = null;

    constructor(readonly api: ApiHelper, readonly spec: string) {}

    private remember(m: Made) {
        this.made.push(m);
        rememberCreated(m.entity, {id: m.id, name: m.name}, this.spec);
    }

    /** An inactive listing through the wizard's own call (`POST /listing/createListingWizard`, as Finish sends it). */
    async listing(nickname: string, opts: {price?: number; currency?: string; guests?: number; activate?: boolean} = {}): Promise<any> {
        expect(nickname.startsWith('QA '), `a listing of the suite is named „QA …“: ${nickname}`).toBe(true);
        const res = await this.api.post('/listing/createListingWizard', {
            listing: {
                nickname,
                propertyType: {id: 'apartment', name: 'Apartment', code: 'apartment'},
                placeType: 'entireHome',
                listingType: 'standalone',
                tags: [],
                address: {
                    country: {id: 'bg', name_en: 'Bulgaria'},
                    city: {id: 'Sofia_bg_42.69751_23.32415', name_en: 'Sofia'},
                    street: 'QA Street',
                    location: {lat: 42.69751, lon: 23.32415}
                },
                maxGuests: opts.guests ?? 2, bedrooms: 1, bathrooms: 1, amenities: [],
                checkInStart: '15:00', checkOutTime: '11:00', instantBookingMode: 'everyone',
                childrenAllowed: false, infantsAllowed: false, petsAllowed: false
            },
            ratePlan: {
                currency: opts.currency ?? 'eur', price: opts.price ?? 100, pricingModel: 'standard', maxOccupancy: opts.guests ?? 2,
                maxAdvancePeriod: 'P365D', prePreparationDays: 0, postPreparationDays: 0, ctaWeekdays: [], ctdWeekdays: []
            },
            rooms: [{name: 'Bedroom 1', roomType: 'bedroom', sortOrder: 1, beds: [{bedType: 'double', quantity: 1}]}],
            descriptions: [], photos: [],
            // ACTIVE only for the specs that need it (240–250: the dialog „Add reservation“ lists active listings only)
            activate: opts.activate === true,
            requireRatePlan: true
        });
        expect(res.success, `the listing "${nickname}" is created through the API: ${res.message || ''}`).toBe(true);
        const found = (await this.api.search<any>('listing', {searchTerm: nickname, size: 20})).find(l => l.nickname === nickname);
        expect(found?.id, `the listing "${nickname}" is readable after its creation`).toBeTruthy();
        this.remember({entity: 'listing', id: found.id, name: nickname});
        if (opts.activate) expect(found.status, `the listing "${nickname}" is active (activated on purpose)`).toBe('active');
        else expect(found.status, `the listing "${nickname}" is not active (Activate now is off)`).not.toBe('active');
        return found;
    }

    /** A guest of the suite: `QA …`, e-mail `@hostify-qa.test` only. */
    async guest(firstName: string, lastName: string, email: string, phone = '+359000000002'): Promise<any> {
        expect(email.endsWith(QA_GUEST_DOMAIN), `a guest of the suite has an e-mail of ${QA_GUEST_DOMAIN}: ${email}`).toBe(true);
        const name = `${firstName} ${lastName}`;
        expect(name.startsWith('QA '), `a guest of the suite is named „QA …“: ${name}`).toBe(true);
        expect(phone.startsWith('+359000000'), `a fictional phone: ${phone}`).toBe(true);
        const g = await this.api.must<any>('POST', '/guest', {firstName, lastName, name, email, phone});
        this.remember({entity: 'guest', id: g.id, name});
        return g;
    }

    async directSource(): Promise<string> {
        if (!this.directId) {
            const direct = (await this.api.search<any>('reservationSource', {size: 50})).find(s => s.code === 'direct');
            expect(direct?.id, 'the reservation source Direct').toBeTruthy();
            this.directId = direct.id;
        }
        return this.directId!;
    }

    /** What the engine would charge (`POST /reservation/quote`) — the lines, the accommodation, the total. */
    async quote(listingId: string, checkIn: string, checkOut: string, adults = 2): Promise<any> {
        const q = await this.api.post('/reservation/quote', {listing: {id: listingId}, checkIn, checkOut, adults, children: 0, source: {id: await this.directSource()}});
        expect(q.success, `the quote of ${checkIn} → ${checkOut}: ${q.message || ''}`).toBe(true);
        return q.data;
    }

    /** A direct, unpaid reservation of our guest on our listing; its automations are switched off at once and checked. */
    async reservation(o: {listing: any; guest: any; inDays: number; nights: number; adults?: number}): Promise<any> {
        const checkIn = isoDateIn(o.inDays), checkOut = isoDateIn(o.inDays + o.nights);
        const res = await this.api.post('/reservation/manual', {
            listing: {id: o.listing.id}, status: 'accepted', checkIn, checkOut,
            adults: o.adults ?? 2, children: 0, infants: 0, pets: 0,
            guestName: o.guest.name, guest: {id: o.guest.id}, source: {id: await this.directSource()},
            automationsEnabled: false
        });
        expect(res.success, `the reservation ${checkIn} → ${checkOut} on "${o.listing.nickname}": ${res.message || ''}`).toBe(true);
        const r: any = res.data;
        this.remember({entity: 'reservation', id: r.id, name: `${r.code || 'reservation'} — ${o.guest.name}`});
        await this.automationsOff(r.id);
        return this.api.read('reservation', r.id);
    }

    /** A reservation THIS spec made through a form: registered as ours, its automations switched off and checked. */
    async adopt(id: string, name: string): Promise<any> {
        this.remember({entity: 'reservation', id, name});
        await this.automationsOff(id);
        return this.api.read('reservation', id);
    }

    /** A listing THIS spec made through a form (the wizard): registered as ours, so cleanup archives it. */
    adoptListing(id: string, name: string) {
        this.remember({entity: 'listing', id, name});
    }

    /** Switches the automations of OUR reservation off and checks it (a new reservation opens with them on). */
    async automationsOff(id: string): Promise<void> {
        let r: any = await this.api.read('reservation', id);
        if (r?.automationsEnabled !== false) {
            await this.api.put('/reservation', {id, automationsEnabled: false});
            r = await this.api.read('reservation', id);
        }
        if (r?.automationsEnabled !== false)
            throw new Error(`STOP — the automations of reservation ${id} could not be switched off (${new Date().toISOString()}); nothing else is done with it.`);
    }

    /**
     * Cancels OUR reservation — only when every guard holds (the QA person, 2026-11-26); a guard that fails is a STOP.
     * Returns the reservation as it is after the cancel.
     */
    async cancel(id: string, reason = 'QA cleanup'): Promise<any> {
        const r: any = await this.api.read('reservation', id);
        if (!r) return null;
        if (r.status === 'cancelled') return r;
        await this.mayCancel(id);
        const at = new Date().toISOString();
        const c = await this.api.post('/reservation/cancel', {id, cancelledBy: 'host', reason});
        if (!c.success) throw new Error(`STOP — the cancel of reservation ${r.code || ''} (${id}) was refused at ${at}: ${c.message || c.status}. Not retried.`);
        return this.api.read('reservation', id);
    }

    /** The guards before ANY cancel of a reservation — through the API or the page (the QA person, 2026-11-26); a guard
     *  that fails is a STOP (nothing pressed). */
    async mayCancel(id: string): Promise<void> {
        const r: any = await this.api.read('reservation', id);
        const at = new Date().toISOString();
        const guards: [boolean, string][] = [
            [this.made.some(m => m.entity === 'reservation' && m.id === id), 'made by this spec'],
            [(r.source?.id || r.source) === await this.directSource(), 'source Direct'],
            [String(r.guestEmail || '').endsWith(QA_GUEST_DOMAIN), `guest ${QA_GUEST_DOMAIN}`],
            [money(r.amountPaid) === 0, 'nothing paid'],
            [r.automationsEnabled === false, 'automations off']
        ];
        const failed = guards.filter(([ok]) => !ok).map(([, what]) => what);
        if (failed.length)
            throw new Error(`STOP — reservation ${r.code || ''} (${id}) is NOT cancelled at ${at}: the guard(s) ${failed.join(', ')} do not hold. Nothing pressed, nothing retried.`);
    }

    /** Cancels / archives / removes what this spec made, newest first. Returns the known leftovers; throws a STOP otherwise. */
    async cleanup(): Promise<Leftover[]> {
        const leftovers: Leftover[] = [];
        for (const m of [...this.made].reverse()) {
            const at = new Date().toISOString();
            if (m.entity === 'reservation') { await this.cancel(m.id); continue; }
            if (!(await this.api.read(m.entity, m.id))) continue;
            if (m.entity === 'listing') await this.api.put('/listing', {id: m.id, status: 'archived'});
            const gone = await this.api.remove(m.entity, m.id);
            if (gone.ok) continue;
            if (/relation/i.test(gone.message || '')) { leftovers.push({entity: m.entity, id: m.id, name: m.name, why: gone.message || ''}); continue; }
            throw new Error(`STOP — ${m.entity} "${m.name}" (${m.id}) could not be removed at ${at}: ${gone.message}. Not retried.`);
        }
        return leftovers;
    }
}

/** The known leftovers of a spec, named in its report (an annotation per record). */
export const reportLeftovers = (testInfo: {annotations: {type: string; description?: string}[]}, leftovers: Leftover[]) => {
    for (const l of leftovers)
        testInfo.annotations.push({type: 'известен остатък', description: `${l.entity} „${l.name}“ (${l.id}) — ${l.why}; трие го демо почистването в 002`});
};
