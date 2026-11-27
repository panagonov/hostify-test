import {test, expect} from '../helpers/fixtures';
import {GridPage} from '../helpers/page-objects/GridPage';
import {FormDrawer} from '../helpers/page-objects/FormDrawer';
import {probePage, expectPresentable} from '../helpers/probe';

/**
 * 309 — Inbox › AI runs and Conversation quality: LOOK ONLY (the AI assistant is absolute for now — the QA person,
 * 2026-11-27): the grids, their views and columns, their forms opened and closed with Cancel — nothing saved.
 * @qa-description: Inbox › AI runs и Conversation quality — само гледане: гридовете, изгледите, колоните, формите се отварят и затварят с Cancel; нищо не се записва
 * @qa-level: regression
 *
 * Proves: AI runs opens with its views (All runs, Answered, Needs attention) and its columns; Conversation quality opens
 * with its views (Needs a look, Not resolved) and its columns; each Create form opens, is presentable and closes with
 * Cancel; the account's count of AI runs and of conversation scores is the same before and after (nothing written).
 * The forms are never saved — a question to the developer is open on creating such records by hand (feedback,
 * 2026-11-26). Creates: nothing. Needs: 003 green.
 */
const PAGES = [
    {entity: 'inboxAiRun', path: '/inbox/inboxAiRuns', views: [/All runs/, /Answered/, /Needs attention/], form: /AI run/},
    {entity: 'conversationScore', path: '/inbox/conversationScores', views: [/Needs a look/, /Not resolved/], form: /Create conversation score/}
];

test.describe('309 inbox › AI pages, look only', () => {
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
