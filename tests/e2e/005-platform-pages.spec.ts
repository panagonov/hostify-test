import {test} from '../helpers/fixtures';
import {menuPagesFor} from '../helpers/navigation';
import {SweepSession} from '../helpers/sweep';

/**
 * 005 — every page of the PLATFORM console opens for the super administrator.
 * @qa-description: проверка на навбар менютата на платформената конзола (всяка страница се отваря и се оглежда)
 *
 * One test per menu page of the role `superAdmin` (inventory/navigation.json): the page is reached through the
 * menu, its URL is right, it settles, and it is probed — untranslated keys, crashes, error notices, broken images,
 * sideways scrolling fail it; contrast and cut text are recorded for the eye; the browser console must stay clean.
 * Creates: nothing. Needs: 001 green. The dedicated page specs (1xx) go deeper: grids, forms, item tabs.
 */
test.describe('005 platform pages', () => {
    // not serial: every page is its own verdict — a page that fails must not skip the pages after it
    let session: SweepSession;
    // every test runs in the session's one window (no blank window per test): the console fixture listens there
    test.use(SweepSession.fixturesOf(() => session));

    test.beforeAll(async ({browser}) => {
        session = await SweepSession.open(browser, 'superAdmin');
    });

    test.afterAll(async () => {
        await session?.close();
    });

    for (const nav of menuPagesFor('superAdmin')) {
        test(`${nav.menuPath.join(' › ')} opens (${nav.path})`, async ({}, testInfo) => {
            await session.visit(nav, testInfo);
        });
    }
});
