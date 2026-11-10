import {test, expect} from '../helpers/fixtures';
import {Sidebar} from '../helpers/page-objects/Sidebar';
import {SupportPage, SUPPORT_PAGES} from '../helpers/page-objects/PlatformAdminPages';
import {probePage, expectPresentable} from '../helpers/probe';
import {checkGridLayout} from '../helpers/checks';

/**
 * 007 — the support pages of the platform console open for the super administrator (1.0.7 – 1.0.10).
 * @qa-description: поддръжката в платформената конзола — Support people, Queue и Proposals се отварят и се оглеждат
 *
 * Proves: Platform Admin › Support people opens through the menu, is presentable and its grid keeps its columns in
 * its layout; Support › Queue (1.0.7: the questions asked in the assistant arrive here; 1.0.10: a red notice says which
 * AI service fails) and Support › Proposals (1.0.7: requests for missing features, counted together) open by their
 * address and show their content, not "Page not found". When the Queue shows a red notice, its text is recorded in
 * the report (1.0.10 asks it to name the service, the reason, the service's message, since when, and whether support
 * still answers) — the suite cannot make an AI service fail, so the notice is read, never provoked.
 *
 * Queue and Proposals are NOT in the super administrator's menu on 2026-11-09 and answer "Page not found" to them.
 * That is a QUESTION for the developers, not a sure defect: the pages may be meant only for the people of Support
 * people (the super administrator is not one of them). The checks stay red until the developers answer — then they
 * either open for the super administrator, or this spec signs in as a person of support.
 * Nothing is clicked on these pages: no topic is answered, assigned or created, and no proposal is touched.
 * Creates: nothing. Needs: 001 green. The pages are not in inventory/navigation.json (generated 2026-11-05), so 005
 * does not visit them yet.
 */
const QUESTION = 'QUESTION for the developers: is the page meant only for the people of Support people? The super administrator is not one of them';

test.describe('007 platform support pages', () => {
    // not serial: every page is its own verdict

    test('Platform Admin › Support people opens through the menu; its grid keeps its columns', async ({page, signInAs}, testInfo) => {
        await signInAs('superAdmin');
        const sidebar = new Sidebar(page);
        await sidebar.openGroup('platformAdmin');
        await sidebar.openItem(['supportAgents']);
        await expect(page).toHaveURL(new RegExp(`/app${SUPPORT_PAGES.supportAgents.path}`));
        const people = new SupportPage(page, 'supportAgents');
        await people.waitRendered();
        await expect(people.notFound, 'Support people shows its content, not "Page not found"').toBeHidden();
        expectPresentable(await probePage(page, testInfo, 'support-people'));
        await checkGridLayout(people);
    });

    for (const which of ['supportQueue', 'supportProposals'] as const) {
        const {path, title} = SUPPORT_PAGES[which];
        test(`Support › ${title} opens (/app${path})`, async ({page, signInAs}, testInfo) => {
            await signInAs('superAdmin');
            const support = new SupportPage(page, which);
            await support.navigate();
            await expect(page).toHaveURL(new RegExp(`/app${path}`));
            await support.waitRendered();
            // the red notice of 1.0.10 (an AI service fails): read and recorded — its presence depends on the services
            const notices = await support.errorNotices.allInnerTexts();
            await testInfo.attach(`${which}-notices.json`, {body: JSON.stringify({notices}, null, 2), contentType: 'application/json'});
            testInfo.annotations.push({type: 'ai-notice', description: notices.length ? notices.join(' / ').slice(0, 500) : 'no red notice (the AI services answer)'});
            await expect(support.notFound, `${title} shows its content, not "Page not found" — ${QUESTION}`).toBeHidden({timeout: 15_000});
            expectPresentable(await probePage(page, testInfo, which));
        });
    }
});
