import {test, expect} from '../helpers/fixtures';
import {ItemPage} from '../helpers/page-objects/ItemPage';
import {activeTenant} from '../helpers/env';
import {QA_USERS} from '../fixtures/users';
import {probePage, expectPresentable} from '../helpers/probe';
import type {Locator} from '@playwright/test';

/**
 * 117 — a record's tabs stay on ONE row in a narrow window, the rest in the "…" menu (1.0.21). Scenario 24
 * (reports/test-scenarios/1.0.26.md).
 * @qa-description: страницата на запис в тясно окно — табовете на един ред, останалите в „…“ (само гледане)
 *
 * Proves, on a person of 100 (Settings › Users › QA Booking Agent: Info, Assistant journal, Telemetry, Audit log on
 * 1.0.26) and on a tag of 110 (Settings › Listing tags): at 800 px the tab bar is one row; the tabs that do not fit are
 * in the "…" menu, and one of them opens from there; at 1600 px every tab is on the row and there is no "…".
 * Only tabs are pressed. Creates: nothing. Needs: 100 (the booking agent), 110 (the tags).
 */
const NARROW = {width: 800, height: 900};
const WIDE = {width: 1600, height: 1000};

/** The rows the visible tabs of the bar take (tabs whose tops differ by more than 8 px are on another row). */
const tabRows = (bar: Locator) => bar.evaluate(b => {
    const tops: number[] = [];
    for (const t of Array.from(b.querySelectorAll('.ant-tabs-tab')).filter(e => (e as HTMLElement).offsetParent !== null)) {
        const top = Math.round(t.getBoundingClientRect().top);
        if (!tops.some(x => Math.abs(x - top) <= 8)) tops.push(top);
    }
    return tops.length;
});

/** antd's "more" button of a tab bar ("…") — GAP: no data-test; antd's own class. */
const moreButton = (bar: Locator) => bar.locator('.ant-tabs-nav-more');

const checkRecord = async (item: ItemPage, page: import('@playwright/test').Page, testInfo: import('@playwright/test').TestInfo, what: string) => {
    await page.setViewportSize(NARROW);
    await page.waitForTimeout(600);
    const bar = item.tabBar;
    expect.soft(await tabRows(bar), `${what}: at 800 px the tabs are one row (1.0.21)`).toBe(1);
    const more = moreButton(bar);
    const hidden = await more.isVisible();
    testInfo.annotations.push({type: what, description: `800 px: "…" ${hidden ? 'shown' : 'not needed'}`});
    if (hidden) {
        await more.hover();
        const menu = page.locator('.ant-tabs-dropdown:visible .ant-tabs-dropdown-menu-item');
        await expect(menu.first(), `${what}: the "…" menu lists the tabs that do not fit`).toBeVisible({timeout: 10_000});
        const label = (await menu.last().innerText()).trim();
        await menu.last().click();
        await expect(bar.locator('.ant-tabs-tab-active'), `${what}: the tab "${label}" opens from the "…" menu`).toContainText(label, {timeout: 15_000});
    }
    expectPresentable(await probePage(page, testInfo, `${what}-narrow`));
    await page.setViewportSize(WIDE);
    await page.waitForTimeout(600);
    expect.soft(await tabRows(bar), `${what}: at 1600 px the tabs are one row`).toBe(1);
    await expect.soft(more, `${what}: at 1600 px no "…" — every tab fits`).toBeHidden();
};

test.describe('117 record tabs › narrow window', () => {
    test('a person of 100: the tabs on one row at 800 px, the rest in "…"', async ({page, signInAs, adminApi}, testInfo) => {
        await signInAs('admin');
        const email = activeTenant().userEmail(QA_USERS.bookingAgent.email);
        const person = (await adminApi.search<any>('user', {searchTerm: email, size: 20})).find(u => u.email === email);
        expect(person?.id, `${email} exists (100)`).toBeTruthy();
        const item = new ItemPage(page);
        await item.goto(`/settings/users/${person.id}/info`);
        await expect(item.tabBar, 'the person\'s page has its tabs').toBeVisible({timeout: 30_000});
        testInfo.annotations.push({type: 'tabs', description: (await item.tabNames()).join(', ')});
        await checkRecord(item, page, testInfo, 'person');
    });

    test('a tag of 110: the tabs on one row at 800 px, the rest in "…"', async ({page, signInAs, adminApi}, testInfo) => {
        await signInAs('admin');
        const tag = (await adminApi.search<any>('listingTag', {searchTerm: 'QA Tag', size: 20}))[0];
        expect(tag?.id, 'a tag of 110 exists').toBeTruthy();
        const item = new ItemPage(page);
        await item.goto(`/settings/listingTags/${tag.id}/info`);
        await expect(item.tabBar, 'the tag\'s page has its tabs').toBeVisible({timeout: 30_000});
        await checkRecord(item, page, testInfo, 'tag');
    });
});
