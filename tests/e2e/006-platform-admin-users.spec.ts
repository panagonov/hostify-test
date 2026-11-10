import {test, expect} from '../helpers/fixtures';
import {UsersPage} from '../helpers/page-objects/PlatformAdminPages';
import {checkCreateForm, checkGridLayout} from '../helpers/checks';
import {adminCredentials} from '../helpers/env';

/**
 * 006 — Platform Admin › Users: the super administrator's Create user form behaves and follows its layout, and the
 * grid keeps its actions inside its actions column.
 * @qa-description: Platform Admin › Users — формата „Create user“ на супер администратора: всяко поле, всеки таб, валидацията; действията на реда са в колоната си
 *
 * Proves: the Create user form of the platform console opens; EVERY tab of it is probed — besides the probe's usual
 * checks, the form's layout (tests/helpers/probe.ts → form layout): every single-line field has the form's height
 * (the Password field too) and every Search field (Account, Role, Default account, Owner) is one control, its input
 * and its button of one height; the required fields are marked; an empty Save is refused; Cancel closes it.
 * The grid (1.0.10 fixed: "Resend invitation" was a column without a header after the actions): every column has a
 * header, the actions column is the last, and the row of the QA account's administrator keeps every button inside it.
 * Only the QA account's rows are looked at; no button of a row is pressed.
 * 002 opens the same form only when the administrator is missing — this spec opens it on every run.
 * Creates: nothing (the form is never saved). Needs: 001 green; 002 (the QA account's administrator).
 */
test.describe('006 platform admin › users', () => {
    test('the Create user form opens, every tab is presentable, an empty Save is refused', async ({page, signInAs, adminApi}, testInfo) => {
        await signInAs('superAdmin');
        const users = new UsersPage(page);
        await users.navigate();
        try {
            // the grid behind the form shows the QA account's administrator only: the screenshots of the form show no one
            // of another account (the QA person, 2026-11-10)
            // the local part only ("qa.admin"): the whole address also finds every person whose address holds "hostify" — people of other accounts
            await users.search(adminCredentials().email.split('@')[0]);
            await checkCreateForm(users, testInfo, /^Create (a new )?user$/, {
                surface: 'platform-user-form',
                expectRequired: ['tenant', 'name', 'email', 'role']
            });
        } finally {
            await users.clearFilters();
            await users.goto(`/platformAdmin/users/${adminApi.user.id}/info`);
        }
    });

    test('the grid keeps every action inside its actions column', async ({page, signInAs, adminApi}) => {
        await signInAs('superAdmin');
        const users = new UsersPage(page);
        await users.navigate();
        await users.clearFilters();
        await checkGridLayout(users);
        const {email} = adminCredentials();
        try {
            // the local part only ("qa.admin"): the whole address also finds every person whose address holds "hostify" — people of other accounts
            await users.search(email.split('@')[0]);
            const row = users.row(email);
            await expect(row, `the QA account's administrator (${email}) is in the grid`).toBeVisible({timeout: 30_000});
            await expect(users.rowActionButtons(row).first(), 'the row has its actions in the actions column').toBeVisible();
            await expect(users.buttonsOutsideActions(row), 'no button of the row outside the actions column').toHaveCount(0);
        } finally {
            await users.clearFilters();
            // the page ends on the QA account's administrator, not on the list of every account's people: the report's
            // last screenshot shows no one of another account (the QA person, 2026-11-10)
            await users.goto(`/platformAdmin/users/${adminApi.user.id}/info`);
        }
    });
});
