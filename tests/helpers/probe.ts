import type {Page, TestInfo} from '@playwright/test';
import {CONFIG} from './env';

/**
 * The look of a screen, measured — what a QA person checks on every page before anything else:
 *
 *  1. untranslated text: raw localization keys (`listing:label.name`, `formField.x`) and bare `undefined`/`NaN`;
 *  2. broken images (loaded, 0 px wide);
 *  3. a horizontal page overflow (the page scrolls sideways);
 *  4. CUT TEXT: an element that hides part of its own text without an ellipsis, or that sticks out of the window;
 *  5. LOW CONTRAST: text whose colour against the first painted background behind it is under WCAG AA
 *     (4.5:1, 3:1 for large text);
 *  6. a crashed screen (`ant-result` error, an error notification, the login form where a page should be).
 *
 * Severity: `blocker` / `error` fail the journey; `review` (contrast, cut text) is RECORDED for the person's eye
 * and fails only with `QA_STRICT_VISUAL=1`. A screenshot is written for EVERY probed surface, green or red: the
 * probe measures the mechanical part, the composition is judged from the picture (`reports/runs/<run>/`).
 *
 * The in-page function is self-contained (no imports, no closures): it is serialised into the browser. Ported from
 * the hydra-qa skill's DOM probe (CloudCart's visual-quality check) and extended with the contrast and cut-text passes.
 */
export type Severity = 'blocker' | 'error' | 'warn' | 'review';

export interface Finding {
    severity: Severity
    tag: string
    message: string
    at?: string
}

export interface ProbeResult {
    surface: string
    url: string
    title: string
    findings: Finding[]
    screenshot?: string
    table?: {columns: number; rows: number; total: number | null; emptyColumns: string[]} | null
    tabs: string[]
    stats: Record<string, number>
}

interface RawProbe {
    title: string
    url: string
    rawKeys: string[]
    bareValues: string[]
    brokenImages: string[]
    hOverflow: {scrollWidth: number; innerWidth: number} | null
    results: {status: string | null; title: string}[]
    notifications: string[]
    messages: string[]
    loginModal: boolean
    connectionError: boolean
    spinners: number
    modals: string[]
    cutText: {text: string; at: string}[]
    lowContrast: {text: string; ratio: number; fg: string; bg: string; at: string}[]
    table: {columns: number; rows: number; total: number | null; emptyColumns: string[]} | null
    tabs: string[]
    mainElements: number
    mainTextLength: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function domProbe(): any {
    const RAW_KEY = /\b[a-z][a-zA-Z0-9]*:[a-z][a-zA-Z0-9]*\.[a-zA-Z0-9._-]+\b/;
    const RAW_PREFIX = /^(formField|label|formTab|itemMenu|lookup|placeholder|title|menu|common|error|gridPlugin)\.[a-zA-Z]/;
    const RAW_NS = /^[a-z][a-zA-Z0-9]{2,}:[a-zA-Z][a-zA-Z0-9]{2,}$/;
    const TIME_TOKEN = /^(hh|HH|mm|ss|dd|DD|MM|yy|yyyy|h|m|s):/;
    const BARE = /^(undefined|null|NaN|\[object Object\]|Invalid Date)$/;

    const isVisible = (el: Element | null): boolean => {
        if (!el || !(el instanceof Element)) return false;
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return false;
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
    };
    const text = (el: Element | null | undefined): string => ((el && el.textContent) || '').replace(/\s+/g, ' ').trim();
    const q = (sel: string, root?: Element | Document): Element[] => Array.from((root || document).querySelectorAll(sel));
    const visibleQ = (sel: string, root?: Element | Document): Element[] => q(sel, root).filter(isVisible);
    const where = (el: Element): string => {
        const dt = el.closest('[data-test]');
        const cls = (el.className && String(el.className).split(' ').filter(Boolean).slice(0, 2).join('.')) || '';
        return (dt ? `[data-test=${dt.getAttribute('data-test')}] ` : '') + el.tagName.toLowerCase() + (cls ? '.' + cls : '');
    };

    const rawKeys: string[] = [];
    const bareValues: string[] = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const seen = new Set<string>();
    let node: Node | null;
    // eslint-disable-next-line no-cond-assign
    while ((node = walker.nextNode())) {
        const t = (node.textContent || '').trim();
        if (!t || t.length > 300 || seen.has(t)) continue;
        seen.add(t);
        const parent = node.parentElement;
        if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA'].includes(parent.tagName)) continue;
        if (!isVisible(parent)) continue;
        if (parent.closest('pre, code, .monaco-editor, .cm-editor, [contenteditable=true]')) continue;
        if ((RAW_KEY.test(t) || RAW_NS.test(t)) && !t.includes('://') && !t.includes('@') && !/^\d/.test(t) && !TIME_TOKEN.test(t)) rawKeys.push(t.slice(0, 80));
        else if (RAW_PREFIX.test(t)) rawKeys.push(t.slice(0, 80));
        if (BARE.test(t)) bareValues.push(t);
        if (rawKeys.length > 20 && bareValues.length > 20) break;
    }

    const brokenImages: string[] = [];
    for (const img of Array.from(document.images))
        if (img.complete && img.naturalWidth === 0 && img.src && !img.src.startsWith('data:') && isVisible(img)) brokenImages.push(img.src.slice(0, 120));

    const doc = document.documentElement;
    const hOverflow = doc.scrollWidth > window.innerWidth + 4 ? {scrollWidth: doc.scrollWidth, innerWidth: window.innerWidth} : null;

    const results = visibleQ('.ant-result').map(r => ({
        status: (r.className.match(/ant-result-(\w+)/) || [])[1] || null,
        title: text(r.querySelector('.ant-result-title'))
    }));
    const notifications = visibleQ('.ant-notification-notice-error').map(n => text(n).slice(0, 300));
    const messages = visibleQ('.ant-message-error, .ant-message-notice-error').map(n => text(n).slice(0, 300));
    const loginModal = !!document.querySelector("[data-test='login-modal']") && visibleQ("[data-test='login-input-email']").length > 0;
    const connectionError = !!visibleQ("[data-test='connectionError-modal']").find(m => m.querySelector('.ant-result-error'));
    const spinners = visibleQ('.ant-spin-spinning').length;
    const modals = visibleQ(".ant-modal-wrap:not([style*='display: none']) .ant-modal").filter(m => !m.closest("[data-test='login-modal']")).map(m =>
        text(m.querySelector('.ant-modal-title')) || text(m.querySelector('.ant-modal-confirm-title')) || text(m).slice(0, 80));

    // ── cut text ────────────────────────────────────────────────────────────
    const cutText: {text: string; at: string}[] = [];
    const candidates = visibleQ('span, a, button, td, th, h1, h2, h3, h4, label, p, div').slice(0, 2500);
    for (const el of candidates) {
        const own = Array.from(el.childNodes).some(n => n.nodeType === 3 && (n.textContent || '').trim().length > 2);
        if (!own) continue;
        const style = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        if (rect.width === 0) continue;
        const hidden = style.overflowX === 'hidden' || style.overflow === 'hidden';
        const clipped = hidden && el.scrollWidth > el.clientWidth + 2 && style.textOverflow !== 'ellipsis' && style.whiteSpace !== 'normal';
        const outside = rect.right > window.innerWidth + 2 && rect.left < window.innerWidth;
        if (clipped || outside) {
            cutText.push({text: text(el).slice(0, 60), at: where(el)});
            if (cutText.length >= 15) break;
        }
    }

    // ── contrast ────────────────────────────────────────────────────────────
    const parseColor = (value: string): [number, number, number, number] | null => {
        const m = value.match(/rgba?\(([^)]+)\)/);
        if (!m) return null;
        const parts = m[1].split(',').map(s => parseFloat(s.trim()));
        return [parts[0], parts[1], parts[2], parts.length > 3 ? parts[3] : 1];
    };
    const luminance = (rgb: number[]): number => {
        const f = (c: number) => { const s = c / 255; return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4); };
        return 0.2126 * f(rgb[0]) + 0.7152 * f(rgb[1]) + 0.0722 * f(rgb[2]);
    };
    const blend = (fg: number[], bg: number[]): number[] => {
        const a = fg[3];
        return [fg[0] * a + bg[0] * (1 - a), fg[1] * a + bg[1] * (1 - a), fg[2] * a + bg[2] * (1 - a), 1];
    };
    // null = unknown: a picture or a gradient paints behind the text — the ratio cannot be computed, the check is skipped
    const backgroundBehind = (el: Element): number[] | null => {
        let cur: Element | null = el;
        let acc: number[] | null = null;
        while (cur) {
            const cs = window.getComputedStyle(cur);
            if (cs.backgroundImage && cs.backgroundImage !== 'none') return null;
            const bg = parseColor(cs.backgroundColor);
            if (bg && bg[3] > 0) {
                acc = acc ? blend(acc, bg) : (bg[3] >= 1 ? bg : null);
                if (bg[3] >= 1) return acc ? acc : bg;
                if (acc && acc[3] >= 0.999) return acc;
            }
            cur = cur.parentElement;
        }
        const body = parseColor(window.getComputedStyle(document.body).backgroundColor);
        return body && body[3] > 0 ? body : [255, 255, 255, 1];
    };
    const lowContrast: {text: string; ratio: number; fg: string; bg: string; at: string}[] = [];
    const seenText = new Set<string>();
    for (const el of candidates) {
        const own = Array.from(el.childNodes).some(n => n.nodeType === 3 && (n.textContent || '').trim().length > 1);
        if (!own) continue;
        if (el.closest('[disabled], .ant-input-disabled, .ant-select-disabled, .ant-btn[disabled], [aria-disabled="true"], .ant-picker-disabled, .ant-checkbox-disabled, .ant-switch-disabled, input::placeholder')) continue;
        const style = window.getComputedStyle(el);
        if (style.opacity !== '' && parseFloat(style.opacity) < 0.6) continue;
        const fg = parseColor(style.color);
        if (!fg) continue;
        const bg = backgroundBehind(el);
        if (!bg) continue;
        const fgSolid = fg[3] < 1 ? blend(fg, bg) : fg;
        const l1 = luminance(fgSolid), l2 = luminance(bg);
        const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
        const size = parseFloat(style.fontSize) || 14;
        const bold = parseInt(style.fontWeight, 10) >= 700;
        const large = size >= 24 || (size >= 18.66 && bold);
        const threshold = large ? 3 : 4.5;
        if (ratio < threshold) {
            const t = text(el).slice(0, 50);
            if (seenText.has(t)) continue;
            seenText.add(t);
            lowContrast.push({text: t, ratio: Math.round(ratio * 100) / 100, fg: style.color, bg: `rgb(${bg.slice(0, 3).map(Math.round).join(', ')})`, at: where(el)});
            if (lowContrast.length >= 15) break;
        }
    }

    // ── grid ────────────────────────────────────────────────────────────────
    let table: RawProbe['table'] = null;
    const tableEl = visibleQ('.ant-table').find(el => !el.closest('.hydra-dashboard-widget, .hydra-table-card'));
    if (tableEl) {
        const ths = q('.ant-table-thead th', tableEl).filter(th => !th.classList.contains('ant-table-cell-scrollbar'));
        const headers = ths.map(th => text(th).slice(0, 40));
        const rows = q('.ant-table-tbody tr.ant-table-row', tableEl).filter(r => !r.classList.contains('ant-table-measure-row'));
        const emptyColumns: string[] = [];
        if (rows.length >= 3) {
            for (let i = 0; i < ths.length; i++) {
                const th = ths[i];
                if (th.classList.contains('ant-table-selection-column') || th.classList.contains('ant-table-row-expand-icon-cell')) continue;
                let empty = 0, total = 0;
                for (const r of rows) {
                    const cell = r.children[i];
                    if (!cell) continue;
                    total++;
                    const hasContent = text(cell).length > 0 || !!cell.querySelector("svg, img, a, button, input, .ant-tag, .ant-badge, .ant-avatar, .ant-checkbox, .ant-switch, .ant-progress, .ant-rate, .anticon, [class*='icon'], [class*='Icon']");
                    if (!hasContent) empty++;
                }
                if (total >= 3 && empty === total) emptyColumns.push(headers[i] || `#${i}`);
            }
        }
        const totalText = text(document.querySelector('.ant-pagination-total-text'));
        table = {columns: ths.length, rows: rows.length, total: totalText ? Number((totalText.match(/\d[\d\s]*/) || [''])[0].replace(/\s/g, '')) || null : null, emptyColumns};
    }
    const tabs = visibleQ("[data-test^='tab-']").map(t => (t.getAttribute('data-test') || '').slice(4));
    const main = document.querySelector('.siteContent, .ant-layout-content, main, .contentContainer') || document.querySelector('#root');
    const mainText = main ? text(main) : '';

    return {
        title: document.title, url: location.href, rawKeys: rawKeys.slice(0, 20), bareValues: bareValues.slice(0, 20),
        brokenImages: brokenImages.slice(0, 10), hOverflow, results, notifications, messages, loginModal, connectionError, spinners, modals,
        cutText, lowContrast, table, tabs, mainElements: main ? q('*', main).filter(isVisible).length : 0, mainTextLength: mainText.length
    };
}

const slug = (value: string): string => value.replace(/[^\w-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 70);

/** Measures the open screen, writes its screenshot and `probe-<surface>.json`, returns the findings. */
export async function probePage(page: Page, testInfo: TestInfo, surface: string, options: {expectLogin?: boolean; expectModal?: boolean} = {}): Promise<ProbeResult> {
    // a drawer or a modal slides in (~300 ms): a screenshot before it settles shows the page without it
    await page.waitForTimeout(400);
    const file = testInfo.outputPath(`shot-${slug(surface)}.png`);
    await page.screenshot({path: file, animations: 'disabled', fullPage: false}).catch(() => undefined);
    await testInfo.attach(`shot-${slug(surface)}.png`, {path: file, contentType: 'image/png'}).catch(() => undefined);

    const raw = await page.evaluate(domProbe) as RawProbe;
    const findings: Finding[] = [];
    if (raw.connectionError) findings.push({severity: 'blocker', tag: 'connection-error', message: 'the "connection error" dialog is open'});
    if (raw.loginModal && !options.expectLogin) findings.push({severity: 'blocker', tag: 'login-modal', message: 'the login form covers the page: no session'});
    for (const r of raw.results) if (r.status && /error|404|403|500|warning/.test(r.status)) findings.push({severity: 'blocker', tag: `result-${r.status}`, message: r.title || `ant-result ${r.status}`});
    for (const n of raw.notifications) findings.push({severity: 'error', tag: 'error-notification', message: n});
    for (const m of raw.messages) findings.push({severity: 'error', tag: 'error-message', message: m});
    for (const k of raw.rawKeys) findings.push({severity: 'error', tag: 'raw-key', message: `untranslated: "${k}"`});
    for (const b of raw.bareValues) findings.push({severity: 'error', tag: 'bare-value', message: `"${b}" printed on the screen`});
    for (const i of raw.brokenImages) findings.push({severity: 'error', tag: 'broken-image', message: i});
    if (raw.hOverflow) findings.push({severity: 'warn', tag: 'h-overflow', message: `the page scrolls sideways: ${raw.hOverflow.scrollWidth}px in a ${raw.hOverflow.innerWidth}px window`});
    if (raw.spinners > 0) findings.push({severity: 'warn', tag: 'spinner', message: `${raw.spinners} spinner(s) still turning`});
    if (!options.expectModal) for (const m of raw.modals) findings.push({severity: 'warn', tag: 'modal-on-load', message: `a dialog is open on the page: "${m}"`});
    if (raw.table && raw.table.emptyColumns.length) findings.push({severity: 'warn', tag: 'empty-column', message: `columns with no value in any row: ${raw.table.emptyColumns.join(', ')}`});
    for (const c of raw.cutText) findings.push({severity: 'review', tag: 'cut-text', message: `"${c.text}"`, at: c.at});
    for (const c of raw.lowContrast) findings.push({severity: 'review', tag: 'low-contrast', message: `"${c.text}" ${c.ratio}:1 (${c.fg} on ${c.bg})`, at: c.at});
    if (raw.mainElements < 5 && raw.mainTextLength < 20 && !raw.loginModal) findings.push({severity: 'error', tag: 'blank', message: 'the content area is empty'});

    const result: ProbeResult = {
        surface, url: raw.url, title: raw.title, findings, screenshot: `shot-${slug(surface)}.png`,
        table: raw.table, tabs: raw.tabs,
        stats: {cutText: raw.cutText.length, lowContrast: raw.lowContrast.length, rawKeys: raw.rawKeys.length, spinners: raw.spinners}
    };
    await testInfo.attach(`probe-${slug(surface)}.json`, {body: JSON.stringify(result, null, 2), contentType: 'application/json'});
    return result;
}

/** Fails on what a client would not accept; `review` findings fail only in strict mode. */
export const expectPresentable = (result: ProbeResult): void => {
    const failing = result.findings.filter(f => f.severity === 'blocker' || f.severity === 'error' || (CONFIG.strictVisual && f.severity === 'review'));
    if (!failing.length) return;
    const lines = failing.slice(0, 12).map(f => `- [${f.severity}/${f.tag}] ${f.message}${f.at ? ` @ ${f.at}` : ''}`);
    throw new Error(`${result.surface}: the screen is not presentable (${failing.length}):\n${lines.join('\n')}`);
};
