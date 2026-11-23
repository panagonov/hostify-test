import * as fs from 'fs';
import * as path from 'path';
import {ROOT} from './env';

/**
 * The navigation inventory (`inventory/navigation.json`, built by `npm run inventory` from the Hostify checkout):
 * every page of the left menu with its route, menu path, roles and the entity it lists.
 */
export interface NavPage {
    id: string
    kind: 'list' | 'page' | 'group'
    path: string
    menuPath: string[]
    roles: string[]
    noMenu: boolean
    entity: string | null
    redirectTo: Record<string, string> | null
    /**
     * The addresses a page that only FORWARDS may land on (Pricing › Taxes → Fee templates filtered on "tax"; Reporting ›
     * Reviews → the reviews dashboard of the first channel with reviews) — `tools/inventory/build.mjs`.
     */
    landsOn: string[] | null
    default: string[] | null
    depth: number
}

export interface NavItem {
    id: string
    parent: string | null
    menuPath: string[]
    roles: string[]
    defaultTab: string | null
    paramName: string
}

export interface Navigation {
    generatedAt: string
    roles: string[]
    pages: NavPage[]
    items: NavItem[]
}

let cached: Navigation | null = null;

export const navigation = (): Navigation => {
    if (!cached) cached = JSON.parse(fs.readFileSync(path.join(ROOT, 'inventory', 'navigation.json'), 'utf8')) as Navigation;
    return cached;
};

/**
 * Pages the suite never opens, whatever the inventory says (the QA person, 2026-11-23): Platform logs › Assistant
 * journal (1.0.22) lists the AI assistant's work in EVERY account — other accounts' data. Its node on the menu is
 * enough; the page itself is not visited, not photographed, not probed.
 */
export const NEVER_OPEN = new Set(['assistantTurnLogs']);

/**
 * Pages that left the menu after the inventory of 2026-11-05 was written: the inventory still lists them, the live
 * menu has no node for them. Dashboards (1.0.25): the logo opens /app/dashboards — 003 checks it (QA-451, declined:
 * 010 looked for the old node). A page leaves this list when `npm run inventory` drops it.
 */
export const LEFT_THE_MENU = new Set(['dashboards']);

/** The menu pages a role reaches (no groups, no hidden pages), in menu order. */
export const menuPagesFor = (role: string): NavPage[] =>
    navigation().pages.filter(p => p.kind !== 'group' && !p.noMenu && p.roles.includes(role) && !NEVER_OPEN.has(p.id) && !LEFT_THE_MENU.has(p.id));

/** The nodes to click for a page: the top-level group, then the submenu nodes (nested groups first). */
export const clicksFor = (page: NavPage): {group: string; items: string[]} => ({group: page.menuPath[0], items: page.menuPath.slice(1)});
