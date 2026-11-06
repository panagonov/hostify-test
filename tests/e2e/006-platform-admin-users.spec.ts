import {test} from '../helpers/fixtures';
import {UsersPage} from '../helpers/page-objects/PlatformAdminPages';
import {checkCreateForm} from '../helpers/checks';

/**
 * 006 — Platform Admin › Users: the super administrator's Create user form behaves and follows its layout.
 * @qa-description: Platform Admin › Users — формата „Create user“ на супер администратора: всяко поле, всеки таб, валидацията
 *
 * Proves: the Create user form of the platform console opens; EVERY tab of it is probed — besides the probe's usual
 * checks, the form's layout (tests/helpers/probe.ts → form layout): every single-line field has the form's height
 * (the Password field too) and every Search field (Account, Role, Default account, Owner) is one control, its input
 * and its button of one height; the required fields are marked; an empty Save is refused; Cancel closes it.
 * 002 opens the same form only when the administrator is missing — this spec opens it on every run.
 * Creates: nothing (the form is never saved). Needs: 001 green.
 */
test.describe('006 platform admin › users', () => {
    test('the Create user form opens, every tab is presentable, an empty Save is refused', async ({page, signInAs}, testInfo) => {
        await signInAs('superAdmin');
        const users = new UsersPage(page);
        await users.navigate();
        await checkCreateForm(users, testInfo, /^Create (a new )?user$/, {
            surface: 'platform-user-form',
            expectRequired: ['tenant', 'name', 'email', 'role']
        });
    });
});
