import {expect, type Locator, type Page} from '@playwright/test';
import {BasePage} from './BasePage';

/**
 * Calendar (`/app/multiCalendar`, the menu node `multiCalendar`) — 1.0.21: the toolbar is ONE row (search, views,
 * filters, Find availability, ‹ Today ›, Sync, Legend, View, More); the legend shows and hides with Legend; in a narrow
 * window (or with the right panel open) the words give way to icons; ‹ Today › and the other groups are one control.
 * LOOK ONLY: Sync and Find availability are never pressed (they reach the channels / start a search for a stay);
 * Legend is the only button the suite presses, twice, so the view ends as it began (1.0.25 remembers the view).
 * GAPS (docs/selectors.md): no data-test on the toolbar, its groups or the legend — the fallbacks below are by role
 * and accessible name, and the toolbar is the row that holds the Today button.
 */
export class CalendarPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async navigate() {
        await this.goto('/multiCalendar');
        await expect(this.todayButton, 'the Calendar shows its toolbar (the Today button)').toBeVisible({timeout: 45_000});
        await this.waitForSpinners().catch(() => undefined);
    }

    get todayButton(): Locator {
        return this.page.getByRole('button', {name: /^\s*Today\s*$/}).first();
    }

    get legendButton(): Locator {
        return this.page.getByRole('button', {name: /Legend/i}).first();
    }

    /** NEVER pressed — named so a test can see it is there. */
    get syncButton(): Locator {
        return this.page.getByRole('button', {name: /^\s*Sync\s*$/i}).first();
    }

    /** The toolbar: the nearest ancestor of Today that is wider than half the content area. */
    get toolbar(): Locator {
        return this.todayButton.locator('xpath=ancestor::*[contains(@class,"toolbar") or contains(@class,"Toolbar")][1]')
            .or(this.todayButton.locator('xpath=../../..')).first();
    }

    /**
     * A control is a visible button / input / select of the toolbar — NOT the input inside a select ("All listings" is
     * one control: QA-472–474 counted its own input as overlapping it) and NOT antd's clear icon of the search box while
     * it is hidden (`ant-input-clear-icon-hidden`: QA-475 took it for a nameless icon button) — calm look 2026-11-24.
     *
     * The toolbar's controls and how many rows they take: the visible buttons, inputs and selects of the toolbar with
     * their top edge, grouped into rows (a control whose top is within 8 px of another is on its row).
     */
    async toolbarRows(): Promise<{rows: number; controls: {name: string; top: number; left: number; width: number; iconOnly: boolean; named: boolean}[]}> {
        return this.toolbar.evaluate(bar => {
            const controls = Array.from(bar.querySelectorAll('button, input, .ant-select, .ant-segmented'))
                .filter(e => (e as HTMLElement).offsetParent !== null && getComputedStyle(e).visibility !== 'hidden'
                    && !(e.parentElement && e.parentElement.closest('button, .ant-select, .ant-input-affix-wrapper .ant-input-suffix'))
                    && !/-hidden\b/.test(e.className.toString()))
                .map(e => {
                    const r = e.getBoundingClientRect();
                    const text = (e.textContent || '').trim();
                    const name = e.getAttribute('aria-label') || e.getAttribute('title') || text || (e as HTMLInputElement).placeholder || '';
                    return {name: name.slice(0, 40), top: Math.round(r.top), left: Math.round(r.left), width: Math.round(r.width), iconOnly: !text && e.tagName === 'BUTTON', named: !!name};
                });
            const tops: number[] = [];
            for (const c of controls) if (!tops.some(t => Math.abs(t - c.top) <= 8)) tops.push(c.top);
            return {rows: tops.length, controls};
        });
    }

    /** Controls of the toolbar that overlap another one or stand outside the content area (cut). */
    async overlapsAndCuts(): Promise<string[]> {
        return this.toolbar.evaluate(bar => {
            const els = Array.from(bar.querySelectorAll('button, input, .ant-select')).filter(e => (e as HTMLElement).offsetParent !== null && getComputedStyle(e).visibility !== 'hidden'
                && !(e.parentElement && e.parentElement.closest('button, .ant-select, .ant-input-affix-wrapper .ant-input-suffix'))
                && !/-hidden\b/.test(e.className.toString()));
            const box = bar.getBoundingClientRect();
            const out: string[] = [];
            els.forEach((a, i) => {
                const r = a.getBoundingClientRect();
                const name = (a.getAttribute('aria-label') || a.textContent || '').trim().slice(0, 30) || a.tagName;
                if (r.right > box.right + 1 || r.left < box.left - 1) out.push(`${name}: outside the toolbar`);
                els.slice(i + 1).forEach(b => {
                    const s = b.getBoundingClientRect();
                    if (r.left < s.right - 1 && s.left < r.right - 1 && r.top < s.bottom - 1 && s.top < r.bottom - 1) out.push(`${name} overlaps ${(b.getAttribute('aria-label') || b.textContent || '').trim().slice(0, 30) || b.tagName}`);
                });
            });
            return out;
        });
    }

    /**
     * The groups of buttons (‹ Today ›): an antd compact group / button group whose buttons are NOT separate rounded
     * buttons — the inner corners are square. Returns the groups with a rounded inner corner.
     */
    async roundedInsideGroups(): Promise<string[]> {
        return this.toolbar.evaluate(bar => Array.from(bar.querySelectorAll('.ant-space-compact, .ant-btn-group, .ant-segmented'))
            .filter(g => (g as HTMLElement).offsetParent !== null)
            .flatMap(g => {
                const btns = Array.from(g.querySelectorAll(':scope > button, :scope > * > button'));
                return btns.slice(0, -1).filter(b => parseFloat(getComputedStyle(b).borderTopRightRadius) > 1)
                    .map(b => `${(b.getAttribute('aria-label') || b.textContent || '').trim().slice(0, 20) || 'button'}: rounded inside its group`);
            }));
    }

    /** The legend of the calendar (the colours of the stays and blocks) — GAP: no data-test; by its class or role. */
    get legend(): Locator {
        return this.page.locator('[class*="legend" i]:visible').filter({hasNot: this.page.locator('button')}).first();
    }
}
