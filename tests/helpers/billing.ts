import {test, expect} from './fixtures';
import type {Page, TestInfo} from '@playwright/test';
import {BillingPage} from './page-objects/BillingPage';
import {probePage, expectPresentable} from './probe';

/**
 * Settings › Billing read before the first reservation of a spec and after its last — LOOK ONLY. At this stage nothing is
 * paid (the QA person, 2026-11-27): an amount, a „Next payment“ or an invoice is RECORDED in the report (an annotation
 * „Billing <when>“ and a screenshot), never a stop. Nothing on the page is ever pressed.
 */
export async function billingUnchanged(page: Page, testInfo: TestInfo, when: string): Promise<void> {
    await test.step(`Settings › Billing (look only) ${when}: recorded`, async () => {
        const billing = new BillingPage(page);
        await billing.open();
        expectPresentable(await probePage(page, testInfo, `billing-${when.replace(/\W+/g, '-')}`));
        const s = await billing.state();
        const next = (s.text.match(/Next payment.{0,260}/) || [''])[0];
        testInfo.annotations.push({type: `Billing ${when}`, description: `${s.nothingToBill ? 'нищо за плащане' : 'има сума'} · ${s.noInvoices ? 'без фактури' : 'има фактура'} · ${next}`.slice(0, 500)});
        expect(s.text.length, 'Settings › Billing was read').toBeGreaterThan(0);
    });
}
