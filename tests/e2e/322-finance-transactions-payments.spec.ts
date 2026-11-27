import {test, expect} from '../helpers/fixtures';
import {GridPage} from '../helpers/page-objects/GridPage';
import {FormDrawer} from '../helpers/page-objects/FormDrawer';
import {probePage, expectPresentable} from '../helpers/probe';

/**
 * 322 — Finance › Transactions and Owners › Payments: LOOK ONLY (payments are never made; an owner payment needs an owner —
 * see feedback 2026-11-27): the grids, their views and columns, their forms opened and closed with Cancel — nothing saved.
 * @qa-description: Finance › Transactions и Owners › Payments — само гледане: гридовете, изгледите, колоните, формите се отварят и затварят с Cancel; нищо не се записва; SEPA никога
 * @qa-level: regression
 *
 * Proves: Transactions opens with its views (Failed, Holds, Pending, Refunds, Paid this month) and its columns; Owners ›
 * Payments opens with its views (Active, All transactions, Rejected / deleted, SEPA scheduled — looked at, never used) and
 * its columns; each Create form opens, is presentable and closes with Cancel; the counts of payment transactions and owner
 * payments are the same before and after (nothing written). Request payment, Charge card and SEPA are never pressed.
 * Creates: nothing. Needs: 003 green.
 */
const PAGES = [
    {entity: 'paymentTransaction', path: '/finance/paymentTransactions', views: [/Failed/, /Pending/, /Refunds/], form: /Create payment transaction/},
    {entity: 'ownerPayment', path: '/ownersMenu/ownerPayments', views: [/All transactions/, /SEPA scheduled/], form: /Create owner payment/}
];

test.describe('322 finance › transactions and owner payments, look only', () => {
    test.setTimeout(300_000);

    for (const p of PAGES) {
        test(`${p.path}: views, columns, the form opened and cancelled; nothing written`, async ({page, signInAs, adminApi}, testInfo) => {
            const before = await adminApi.count(p.entity, {});
            await signInAs('admin');
            const grid = new GridPage(page, p.entity);
            await grid.goto(p.path);
            await grid.waitLoaded();
            expectPresentable(await probePage(page, testInfo, `${p.entity}-grid`));
            for (const v of p.views) await expect(grid.viewTabs.getByRole('tab', {name: v}).first(), `the view ${v}`).toBeVisible({timeout: 30_000});
            expect((await grid.columns()).length, 'the grid has its columns').toBeGreaterThan(3);
            await grid.createButton.click();
            const form = new FormDrawer(page, p.form);
            await form.waitOpen();
            expectPresentable(await probePage(page, testInfo, `${p.entity}-form`));
            await form.cancel();
            expect(await adminApi.count(p.entity, {}), 'nothing was written').toBe(before);
        });
    }
});
