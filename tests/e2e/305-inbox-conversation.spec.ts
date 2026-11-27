import {test, expect} from '../helpers/fixtures';
import {GridPage} from '../helpers/page-objects/GridPage';
import {InboxPage} from '../helpers/page-objects/InboxPage';
import {BasePage} from '../helpers/page-objects/BasePage';
import {probePage, expectPresentable} from '../helpers/probe';
import {checkCreateForm} from '../helpers/checks';
import {rememberCreated} from '../helpers/state';
import {Seed, reportLeftovers} from '../helpers/seed';
import {RUN_TAG} from '../fixtures/test-data';

/**
 * 305 — Inbox: a conversation with OUR guest — made through the Conversations form, an internal NOTE with a saved reply
 * inserted (no message reaches the guest: e-mail needs a mailbox, SMS is never used — the QA person, 2026-11-27); the E-mail
 * log; tags, star, assignee, snooze, reopen, close.
 * @qa-description: Inbox › разговор с наш гост — през формата, вътрешна бележка със запазен отговор (нищо до госта; SMS никога), E-mail log без ред, таг, звезда, отговорник, отлагане, затваряне; AI изключен (иначе СПРИ)
 * @qa-level: regression
 *
 * Proves, with our listing, our guest @hostify-qa.test and his reservation (API), a saved reply and an inbox tag (API):
 * the AI assistant's automatic answers are OFF (Other features › Our settings › AI — looked at; ON is a STOP, nothing is
 * sent); the Conversations form refuses an empty create (Thread type, State) and makes „QA Thread <run mark>“ of type
 * Reservation, Open, with our guest and reservation; the conversation opens in the Unified inbox; on the composer's Note
 * tab the saved reply is inserted and a line typed by hand; the button is checked to send nothing to the guest (no SMS,
 * e-mail or channel — else a STOP); the note is in the conversation; the E-mail log has NO line to our address; the tag
 * is set (its thread count 1), the thread starred, assigned to the administrator, snoozed, then closed (the API follows
 * each). Never pressed: Suggest reply, AI, Translate, Archive, SMS / WhatsApp, anything „to all“.
 * Cleanup: the reservation cancelled; the thread, the guest and the listing known leftovers (the platform keeps them for
 * their linked records — removed by 002); the saved reply removed; the tag is DEACTIVATED instead of deleted (it is on the
 * conversation — the message and Inactive are checked; a known leftover). A cleanup problem never hides the first failure.
 * Creates: listing, guest, reservation, savedReply, inboxTag (API), inboxThread ×1 (form), a note ×1. Needs: 003.
 */
const SPEC = '305';
const NAME = `QA Thread ${RUN_TAG}`;

test.describe('305 inbox › a conversation with our guest', () => {
    test.setTimeout(600_000);

    test('made through the form, an internal note, the log, tags, star, assignee, snooze, close', async ({page, signInAs, adminApi}, testInfo) => {
        const seed = new Seed(adminApi, SPEC);
        const extra: {entity: string; id: string; name: string}[] = [];
        let first: unknown = null;
        try {
            const listing = await seed.listing(`QA G3 Listing ${RUN_TAG}`, {price: 100});
            const guest = await seed.guest('QA G3', `Guest ${RUN_TAG}`, `qa.g3.guest.${RUN_TAG}@hostify-qa.test`);
            await seed.reservation({listing, guest, inDays: 40, nights: 2});
            // a saved reply is offered in the composer only for its listings (1.0.36: „No saved replies for this listing“)
            const reply = await adminApi.must<any>('POST', '/savedReply', {name: `QA Reply ${RUN_TAG}`, text: 'QA: parking is free in the yard.', language: 'en', active: true, listings: [{id: listing.id}]});
            extra.push({entity: 'savedReply', id: reply.id, name: reply.name}); rememberCreated('savedReply', {id: reply.id, name: reply.name}, SPEC);
            const tag = await adminApi.must<any>('POST', '/inboxTag', {name: `QA Tag Thread ${RUN_TAG}`, active: true});
            extra.push({entity: 'inboxTag', id: tag.id, name: tag.name}); rememberCreated('inboxTag', {id: tag.id, name: tag.name}, SPEC);
            await signInAs('admin');

            await test.step('the AI assistant answers nothing by itself (looked at; ON is a STOP)', async () => {
                await new BasePage(page).goto('/ourFeatures/ourSettings/inboxAiSettings');
                const ai = page.locator('[data-test="inbox-ai-active"]');
                await expect(ai, 'the switch of the AI assistant').toBeVisible({timeout: 30_000});
                if ((await ai.getAttribute('aria-checked')) !== 'false') {
                    testInfo.annotations.push({type: 'СПРИ', description: `AI асистентът е включен (${new Date().toISOString()}) — нищо не е изпратено`});
                    throw new Error('STOP — the AI assistant\'s automatic answers are ON; nothing is sent. Tell the QA person.');
                }
            });
            let threadId = '';
            await test.step('the Conversations form: refused empty, then our thread', async () => {
                const grid = new GridPage(page, 'inboxThread');
                await grid.goto('/inbox/inboxThreads');
                await grid.waitLoaded();
                await checkCreateForm(grid, testInfo, 'Create inbox thread', {expectRequired: ['threadType', 'state']});
                const form = await grid.openCreate('Create inbox thread');
                await form.fill('name', NAME);
                await form.pickFirst('threadType', /Reservation/);
                await form.pickFirst('state', /Open/);
                await form.pickFirst('guest', new RegExp(guest.name), guest.name);
                await form.pickFirst('reservation', new RegExp(guest.name), guest.name);
                await form.saveAndClose();
                threadId = (await adminApi.search<any>('inboxThread', {searchTerm: NAME, size: 10})).find(t => t.name === NAME)?.id;
                expect(threadId, 'the thread is readable').toBeTruthy();
                rememberCreated('inboxThread', {id: threadId, name: NAME}, SPEC);
                extra.push({entity: 'inboxThread', id: threadId, name: NAME});
                const t: any = await adminApi.read('inboxThread', threadId);
                expect(t.state, 'Open').toBe('open');
                expect(t.guest?.id, 'our guest').toBe(guest.id);
            });
            const inbox = new InboxPage(page);
            await test.step('an internal NOTE with the saved reply — nothing goes to the guest (no mailbox; SMS never)', async () => {
                await inbox.openThread(threadId);
                expectPresentable(await probePage(page, testInfo, 'unified-inbox-thread'));
                await inbox.noteTab.click();
                await inbox.savedReplies.click();
                await inbox.savedReply(new RegExp(`QA Reply ${RUN_TAG}`)).click();
                await expect(inbox.text, 'the saved reply in the note').toContainText('QA: parking is free in the yard.');
                await inbox.text.click();
                await page.keyboard.press('End');
                await page.keyboard.type(' QA internal note, please ignore.');
                // the button must not send anything to the guest: SMS (the app's default without a mailbox) is never pressed
                const label = (await inbox.send.innerText()).replace(/\s+/g, ' ');
                testInfo.annotations.push({type: 'бутонът', description: label});
                if (/SMS|WhatsApp|e-?mail|Channel/i.test(label)) {
                    testInfo.annotations.push({type: 'СПРИ', description: `бутонът казва „${label}“ — нищо не е изпратено (${new Date().toISOString()})`});
                    throw new Error(`STOP — the send button says "${label}": it would reach the guest. Nothing pressed.`);
                }
                await inbox.send.click();
                await expect(inbox.conversation, 'the note in the conversation').toContainText('QA internal note, please ignore.', {timeout: 30_000});
            });
            await test.step('the E-mail log has NO line to our guest (a note is not sent)', async () => {
                const log = new GridPage(page, 'emailLog');
                await log.goto('/inbox/emailLogs');
                await log.waitLoaded();
                await log.search(guest.email);
                await expect(log.row(guest.email), 'no e-mail to our guest').toHaveCount(0);
                await log.clearFilters();
            });
            await test.step('tag, star, assignee, snooze, close — the API follows', async () => {
                await inbox.openThread(threadId);
                await inbox.tags.click();
                await inbox.pick(`QA Tag Thread ${RUN_TAG}`, new RegExp(`QA Tag Thread ${RUN_TAG}`));
                await page.keyboard.press('Escape');
                await expect.poll(async () => JSON.stringify((await adminApi.read<any>('inboxThread', threadId))?.tags || []), {message: 'the tag on the thread', timeout: 30_000}).toContain(tag.id);
                await inbox.star.click();
                await expect.poll(async () => (await adminApi.read<any>('inboxThread', threadId))?.starred, {message: 'starred', timeout: 30_000}).toBe(true);
                await inbox.assignee.click();
                await inbox.pick('QA Admin', /QA Admin/);
                await expect.poll(async () => (await adminApi.read<any>('inboxThread', threadId))?.assignee?.name, {message: 'assigned to the administrator', timeout: 30_000}).toMatch(/QA Admin/);
                await inbox.snooze.click();
                await inbox.option(/tomorrow|1 day|day/i).click();
                await expect.poll(async () => (await adminApi.read<any>('inboxThread', threadId))?.state, {message: 'snoozed', timeout: 30_000}).toBe('snoozed');
                // a snoozed thread offers „Reopen“ instead of Close
                await inbox.openThread(threadId);
                await inbox.reopen.click();
                await expect.poll(async () => (await adminApi.read<any>('inboxThread', threadId))?.state, {message: 'open again', timeout: 30_000}).toBe('open');
                await inbox.openThread(threadId);
                await inbox.close.click();
                await expect.poll(async () => (await adminApi.read<any>('inboxThread', threadId))?.state, {message: 'closed', timeout: 30_000}).toBe('closed');
            });
        } catch (e) {
            first = e;
        }
        // the cleanup never hides the first failure: its own problems are said beside it
        try {
            const leftovers = await seed.cleanup();
            for (const e of extra.reverse()) {
                const gone = await adminApi.remove(e.entity, e.id);
                if (gone.ok) continue;
                if (/relation/i.test(gone.message || '')) { leftovers.push({...e, why: gone.message || ''}); continue; }
                // a tag on a conversation is DEACTIVATED instead of deleted (1.0.36) — checked as a function: the message and
                // Inactive; a known leftover the demo wipe of 002 removes (the QA person, 2026-11-27)
                if (e.entity === 'inboxTag' && /deactivated instead of deleted/i.test(gone.message || '')) {
                    expect((await adminApi.read<any>('inboxTag', e.id))?.active, `the tag "${e.name}" is Inactive after the refused delete`).toBe(false);
                    leftovers.push({...e, why: gone.message || ''});
                    continue;
                }
                throw new Error(`STOP — ${e.entity} "${e.name}" (${e.id}) could not be removed at ${new Date().toISOString()}: ${gone.message}. Not retried.`);
            }
            reportLeftovers(testInfo, leftovers);
        } catch (cleanupError) {
            if (!first) throw cleanupError;
            testInfo.annotations.push({type: 'почистване', description: String((cleanupError as Error)?.message || cleanupError).slice(0, 400)});
        }
        if (first) throw first;
    });
});
