import {expect, type Page} from '@playwright/test';
import type {ApiHelper} from './api';

/**
 * The version of the application under test. Every API answer carries `version`; the navbar footer shows it
 * (`v 1.0.3`, a click opens the change history); tools/qa.mjs asks it before a run and files the run's issues under
 * `reports/issues/<version>/`. A spec that signs in checks the two agree — a client served from another build than
 * the API would make every other finding of the run doubtful.
 */
export const FOOTER_VERSION = '.cc-sidebar-footer__version';

/** The version the navbar footer shows (without the "v " prefix). */
export const footerVersion = async (page: Page): Promise<string> => {
    const footer = page.locator(FOOTER_VERSION).first();
    await expect(footer, 'the navbar footer shows the version').toBeVisible({timeout: 30_000});
    // the text reads "v 1.0.3"; the title attribute is the tooltip ("Change history") when the click opens the history
    const text = (await footer.innerText()).replace(/^v\s*/i, '').trim();
    const title = ((await footer.getAttribute('title')) || '').trim();
    return /^\d+\.\d+/.test(text) ? text : title;
};

/** The version the API answers with (ApiHelper keeps it from every answer). */
export const apiVersion = (api: ApiHelper): string => api.version || '';
