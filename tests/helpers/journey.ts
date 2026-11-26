import {test, expect} from './fixtures';
import type {TestInfo} from '@playwright/test';
import {Sidebar} from './page-objects/Sidebar';
import {GridPage} from './page-objects/GridPage';
import {FormDrawer} from './page-objects/FormDrawer';
import {probePage, expectPresentable} from './probe';
import {checkCreateForm, idOfSaved} from './checks';
import {rememberCreated, forgetCreated} from './state';
import {ApiHelper} from './api';
import {cleanupSpecRecords} from './cleanup';
import {adminCredentials} from './env';

/**
 * The journey of ONE record through its form (group 1 and later, the QA person, 2026-11-26 — „what a good test looks
 * like“): the page opens through the menu; an empty form is refused (the required fields marked); the record is created
 * through the form; it is read back through the API with the same values; it is edited through the row's "Edit" and read
 * back again; it is removed through the row's "Remove" and is gone from the grid and the API. A removal that does not go
 * through is a STOP (what, id, when — not retried).
 */
export interface FormJourney {
    spec: string;
    entity: string;
    menu: [group: string, ...items: string[]];
    url: RegExp;
    path: string;
    createTitle: string;
    /** The form's title when it edits a record (a RegExp: the drawer is found by it). */
    editTitle: RegExp;
    required: string[];
    name: string;
    /** Fills the create form. */
    fill: (form: FormDrawer) => Promise<void>;
    /** The values the API must give back after the create. */
    saved: (record: any) => void;
    /** Changes the edit form. */
    edit: (form: FormDrawer) => Promise<void>;
    /** The values the API must give back after the edit. */
    edited: (record: any) => void;
    /** The field the record is found by through the API (default `name`). */
    nameField?: string;
}

export async function formJourney(page: import('@playwright/test').Page, signInAs: (who: any) => Promise<void>, api: ApiHelper, testInfo: TestInfo, j: FormJourney): Promise<void> {
    await signInAs('admin');
    const grid = new GridPage(page, j.entity);
    let id = '';
    await test.step('the page opens through the menu; an empty form is refused', async () => {
        const sidebar = new Sidebar(page);
        await sidebar.openGroup(j.menu[0]);
        await sidebar.openItem(j.menu.slice(1));
        await expect(page).toHaveURL(j.url);
        await grid.waitLoaded();
        await grid.clearFilters();
        expectPresentable(await probePage(page, testInfo, `${j.entity}-grid`));
        await checkCreateForm(grid, testInfo, j.createTitle, {expectRequired: j.required});
    });
    await test.step(`"${j.name}" is created through the form and read back through the API`, async () => {
        const form = await grid.openCreate(j.createTitle);
        await j.fill(form);
        await form.saveAndClose();
        id = await idOfSaved(api, j.entity, j.name, j.nameField);
        rememberCreated(j.entity, {id, name: j.name}, j.spec);
        await grid.search(j.name);
        await expect(grid.row(j.name), `"${j.name}" is in the grid`).toBeVisible({timeout: 30_000});
        j.saved(await api.read(j.entity, id));
    });
    await test.step(`"${j.name}" is edited through the row's Edit and read back`, async () => {
        await grid.rowAction(grid.row(j.name), /^\s*Edit\s*$/);
        const form = new FormDrawer(page, j.editTitle);
        await form.waitOpen();
        expectPresentable(await probePage(page, testInfo, `${j.entity}-edit`));
        await j.edit(form);
        await form.saveAndClose();
        j.edited(await api.read(j.entity, id));
    });
    await test.step(`"${j.name}" is removed through the row's Remove`, async () => {
        await grid.clearFilters();
        await grid.search(j.name);
        await grid.removeRow(grid.row(j.name));
        await expect(grid.row(j.name), `"${j.name}" left the grid`).toBeHidden({timeout: 30_000});
        const still = await api.read(j.entity, id);
        if (still) {
            testInfo.annotations.push({type: 'СПРИ', description: `${j.entity} „${j.name}“ (${id}) не се изтри през Remove в ${new Date().toISOString()}; не се опитва повторно.`});
            throw new Error(`STOP — ${j.entity} "${j.name}" (${id}) is still there after Remove. Not retried.`);
        }
        forgetCreated(j.entity, j.spec);
        await grid.clearFilters();
    });
}

/** Removes the spec's own records of an earlier run (by the manifest and by the „QA …“ name) before it starts. */
export async function cleanBefore(entity: string, spec: string, prefix: string) {
    const {email, password} = adminCredentials();
    const api = await ApiHelper.login(email, password);
    try { await cleanupSpecRecords(api, entity, spec, prefix); } finally { await api.dispose(); }
}
