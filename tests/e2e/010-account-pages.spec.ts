import {test} from '../helpers/fixtures';
import {menuPagesFor} from '../helpers/navigation';
import {SweepSession} from '../helpers/sweep';

/**
 * 010 — every page of the ACCOUNT menu opens for the account administrator of the QA account.
 *
 * One test per menu page of the role `admin` (inventory/navigation.json), reached through the menu and probed the
 * same way as 005 — on an EMPTY account: a page that needs records to render is still a page that must open.
 * Creates: nothing. Needs: 003 green. The dedicated page specs (1xx) fill the pages in dependency order.
 */
test.describe('010 account pages', () => {
    // not serial: every page is its own verdict — a page that fails must not skip the pages after it
    let session: SweepSession;
    // every test runs in the session's one window (no blank window per test): the console fixture listens there
    test.use(SweepSession.fixturesOf(() => session));

    test.beforeAll(async ({browser}) => {
        session = await SweepSession.open(browser, 'admin');
    });

    test.afterAll(async () => {
        await session?.close();
    });

    for (const nav of menuPagesFor('admin')) {
        test(`${nav.menuPath.join(' › ')} opens (${nav.path})`, async ({}, testInfo) => {
            await session.visit(nav, testInfo);
        });
    }
});
