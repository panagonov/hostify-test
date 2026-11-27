import {test, expect} from '../helpers/fixtures';
import {ItemPage} from '../helpers/page-objects/ItemPage';
import {probePage, expectPresentable} from '../helpers/probe';
import {Seed, money, reportLeftovers} from '../helpers/seed';
import {isoDateIn, RUN_TAG} from '../fixtures/test-data';

/**
 * 221 — the price of a night: a listing's Rates tab (its standard rate plan) changes the default daily price, and the
 * engine prices the nights by it.
 * @qa-description: Цената на нощувката — табът Rates на обявата: 100 € → 120 €, записът се чете през API, офертата за 3 нощувки 300 € → 360 €
 * @qa-level: regression
 *
 * Proves: on our inactive listing (API, 100 € a night) the quote of 3 nights is a rent of 300 €; on the listing's Rates tab
 * the Default daily price is set to 120 € and saved; the quote is then 360 €; every fee of the quote is named (a „QA …“
 * fee we did not expect is a leftover of another test, not a bug). Nothing is reserved (a quote creates no record and
 * bills nothing); Change currency and Remove of the rate plan are never pressed.
 * Creates: listing ×1 (API, archived — a known leftover). Needs: 003 green.
 */
const SPEC = '221';
const LISTING = `QA G2 Price Listing ${RUN_TAG}`;

test.describe('221 pricing › the price of a night', () => {
    test.setTimeout(300_000);

    test('the Rates tab sets 120 € a night and the quote follows', async ({page, signInAs, adminApi}, testInfo) => {
        const seed = new Seed(adminApi, SPEC);
        const rent = async (listingId: string) => {
            const q = await seed.quote(listingId, isoDateIn(60), isoDateIn(63));
            for (const l of (q.lines || []).filter((x: any) => x.lineType !== 'accommodation' && money(x.total) !== 0))
                testInfo.annotations.push({type: /^QA /.test(l.name) ? 'остатък от друг тест' : 'такса в офертата', description: `${l.name}: ${money(l.total)} €`});
            return money(q.accommodation);
        };
        try {
            const listing = await seed.listing(LISTING, {price: 100});
            expect(await rent(listing.id), '3 nights × 100 €').toBe(300);
            await signInAs('admin');
            const item = new ItemPage(page);
            await item.goto(`/listingsMenu/listings/${listing.id}/rates`);
            await expect(item.tab('rates'), 'the Rates tab').toBeVisible({timeout: 30_000});
            await item.openTab('rates');
            expectPresentable(await probePage(page, testInfo, 'listing-rates'));
            const price = page.getByRole('spinbutton', {name: /Default daily price/});
            await expect(price, 'the Default daily price shows 100').toHaveValue(/^100(\.00)?$/);
            await price.fill('120');
            await page.getByRole('button', {name: /^\s*(save\s+)?Save\s*$/}).first().click();
            await expect.poll(() => rent(listing.id), {message: '3 nights × 120 €', timeout: 60_000}).toBe(360);
            await page.reload();
            await item.openTab('rates');
            await expect(page.getByRole('spinbutton', {name: /Default daily price/}), 'the saved price after a reload').toHaveValue(/^120(\.00)?$/);
        } finally {
            reportLeftovers(testInfo, await seed.cleanup());
        }
    });
});
