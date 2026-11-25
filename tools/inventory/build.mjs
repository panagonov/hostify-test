#!/usr/bin/env node
/**
 * Builds `inventory/navigation.json` — every page of the application's left menu with its route, menu path, roles,
 * kind (list / page / group) and the entity whose records it lists — from the Hostify project checkout:
 *   client/src/hydraExtension/config/pagesDecorator.ts   (the menu tree, hand-maintained)
 *   client/src/hydraExtension/config/pagesConfig.ts      (page types: tabs / item pages, url overrides)
 *
 *   node tools/inventory/build.mjs [--project /path/to/hostify-desktop]   (default: the parent folder)
 *
 * Since 2026-11-06 the generated client lives in the deploy repository `project/` of the Hostify checkout: a checkout
 * without `client/` is read through its `project/`.
 *
 * A page's roles are the menu's: the role arrays of pagesDecorator (a node's own, else its parent's), and since client
 * 1.5.132 only the roles that may READ the page's entity — the list page named after its item page in the plural
 * (`emailTemplates` › `emailTemplate`, the client's @tools/pageEntities), the rights from the seeds of the security groups
 * in the Hostify checkout (`_build-engine/…/hydra-user/…/securityGroup.json`, `_build-config/…/securityGroup.json`).
 * The roles the rights take away are in `refusedRoles` of the page.
 *
 * The developers run it after a menu change and commit the JSON; the sweep specs (005, 010) and the page specs read
 * it. The QA person never needs the Hostify checkout.
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const argIndex = process.argv.indexOf('--project');
const GIVEN = path.resolve(argIndex > 0 ? process.argv[argIndex + 1] : path.join(ROOT, '..'));
const MENU = 'client/src/hydraExtension/config/pagesDecorator.ts';
const PROJECT = fs.existsSync(path.join(GIVEN, MENU)) || !fs.existsSync(path.join(GIVEN, 'project', MENU)) ? GIVEN : path.join(GIVEN, 'project');
const DECORATOR = path.join(PROJECT, 'client/src/hydraExtension/config/pagesDecorator.ts');
const PAGES_CONFIG = path.join(PROJECT, 'client/src/hydraExtension/config/pagesConfig.ts');

if (!fs.existsSync(DECORATOR)) {
    console.error(`Not a Hostify checkout: ${DECORATOR} is missing (pass --project).`);
    process.exit(2);
}

const evalArray = (source, marker, afterEquals = true) => {
    const start = source.indexOf(marker);
    if (start < 0) throw new Error(`"${marker}" not found`);
    // the array literal starts after the "=" (a type such as `any[]` holds brackets of its own)
    const open = source.indexOf('[', afterEquals ? source.indexOf('=', start) : start);
    let depth = 0, i = open;
    for (; i < source.length; i++) {
        const ch = source[i];
        if (ch === '[') depth++;
        else if (ch === ']' && --depth === 0) break;
    }
    const literal = source.slice(open, i + 1)
        .replace(/EPageType\.(\w+)/g, '"$1"')
        .replace(/\/\/[^\n]*/g, '')
        .replace(/\/\*[\s\S]*?\*\//g, '');
    return Function(`return (${literal});`)();
};

const decorator = evalArray(fs.readFileSync(DECORATOR, 'utf8'), 'const pageDecorator');
const pagesConfig = {};
try {
    const src = fs.readFileSync(PAGES_CONFIG, 'utf8');
    const walkConfig = nodes => {
        for (const n of nodes || []) {
            if (n && n.id) pagesConfig[n.id] = n;
            if (n && n.children) walkConfig(n.children);
        }
    };
    walkConfig(evalArray(src, 'pages: [', false));
} catch (e) {
    console.warn(`pagesConfig.ts not read (${e.message}) — page types unknown`);
}

// The roles' rights (the seeds of the security groups) and the entity of each list page — the client's rule: a list page
// whose child is the entity's item page (tabs / item / params) and that is named after it in the plural; its item page
// is the entity's too. A role the seeds do not hold, and superAdmin, keep every page.
const CHECKOUT = [GIVEN, path.dirname(PROJECT)].find(dir => fs.existsSync(path.join(dir, '_build-config')));
const SEEDS = [
    '_build-engine/code-generator-config/services/hydra-user/initData/type1/data/securityGroup.json',
    '_build-config/code-generator-config/server/initData/type1/data/securityGroup.json'
];
const seedRoles = new Map();
for (const file of CHECKOUT ? SEEDS : []) {
    const full = path.join(CHECKOUT, file);
    if (!fs.existsSync(full)) continue;
    const data = JSON.parse(fs.readFileSync(full, 'utf8'));
    for (const role of (Array.isArray(data) ? data : data.data || []))
        if (role && typeof role === 'object') seedRoles.set(role.id || role._id, role);
}
if (!seedRoles.size) console.warn('The seeds of the security groups were not found — the roles are the menu\'s role arrays alone');
const readsEntity = (roleId, entity) => {
    const role = seedRoles.get(roleId);
    if (roleId === 'superAdmin' || !role) return true;
    const rule = (role.rights || []).find(r => r?.entity === entity);
    const listed = rule && Array.isArray(rule.permissions) ? rule.permissions.filter(Boolean) : [];
    const permissions = rule ? (listed.length ? listed : ['denied']) : [role.defaultRights || 'denied'];
    return permissions[0] !== 'denied' && (permissions[0] === 'all' || permissions.includes('read'));
};
const DETAIL_TYPES = new Set(['tabs', 'item', 'params']);
// `…List` too (`reportingSettingsList` › `reportingSettings` — Hostify client 1.5.145, QA-467)
const pluralsOf = entity => [`${entity}s`, `${entity}es`, ...(entity.endsWith('y') ? [`${entity.slice(0, -1)}ies`] : []), `${entity}List`];
const pageEntities = {};
const collectEntities = nodes => {
    for (const node of nodes || []) {
        if (!node?.id) continue;
        if (!DETAIL_TYPES.has(pagesConfig[node.id]?.type)) {
            const item = (node.children || []).find(c => c?.id && DETAIL_TYPES.has(pagesConfig[c.id]?.type) && pluralsOf(c.id).includes(node.id));
            if (item) pageEntities[node.id] = pageEntities[item.id] = item.id;
        }
        collectEntities(node.children);
    }
};
collectEntities(decorator);
// The project's own pages tied to an entity by hand (`userRightsPageToIndexMapping.ts`: the Inbox → inboxThread, Reporting ›
// Reviews → review — Hostify QA-468); the client lets this mapping win over the rule above.
const MAPPING = path.join(PROJECT, 'client/src/hydraExtension/config/userRightsPageToIndexMapping.ts');
if (fs.existsSync(MAPPING))
    for (const [, page, entity] of fs.readFileSync(MAPPING, 'utf8').matchAll(/^\s*["']?(\w+)["']?\s*:\s*["'](\w+)["']/gm))
        pageEntities[page] = entity;
/** The roles of `node` the menu offers it to: its role arrays (else the parent's), less those that cannot read its entity. */
const offeredRoles = (node, inherited) => {
    const declared = node.role || inherited;
    const entity = pageEntities[node.id];
    if (!declared || !entity) return {roles: declared, refused: []};
    return {roles: declared.filter(r => readsEntity(r, entity)), refused: declared.filter(r => !readsEntity(r, entity))};
};

// A menu entry whose page only FORWARDS to another page (`landsOn`, the addresses it may land on — the sweep judges the
// page there). Two forms in `client/src/page/<Page>.tsx`:
//   - `export default kindRedirect("feeTemplates", "tax")` (Hostify menu point 10, M10-1 / M10-2: Pricing › Base Price /
//     Fees / Taxes / Extras / Costs and Settings › Fees / Extras / Taxes / Costs open the one list filtered on its kind;
//     the query is kindRedirect's own, `feeItemType=_or&feeItemType=<kind>` — page/pricingMenu/kindRedirect.tsx);
//   - a component that renders nothing and navigates to `findPath("<page>")` (Reporting › Housekeeping → Operations'
//     housekeeping board, M08-15; Reporting › Reviews → the first channel's reviews dashboard with reviews, M08-22):
//     every page id the file names is a place it may land.
const PAGE_DIR = path.join(PROJECT, 'client/src/page');
const forwards = {};
for (const file of fs.existsSync(PAGE_DIR) ? fs.readdirSync(PAGE_DIR).filter(f => f.endsWith('.tsx')) : []) {
    const src = fs.readFileSync(path.join(PAGE_DIR, file), 'utf8');
    const id = file.charAt(0).toLowerCase() + file.slice(1, -'.tsx'.length);
    const kind = /export default kindRedirect\(\s*"(\w+)"\s*,\s*"(\w+)"\s*\)/.exec(src);
    if (kind) forwards[id] = {pages: [kind[1]], query: `?feeItemType=_or&feeItemType=${kind[2]}`};
    else if (/navigate\(/.test(src) && /findPath/.test(src) && /^\s*return null;/m.test(src) && !/return\s*\(?\s*</.test(src))
        forwards[id] = {pages: Array.from(src.matchAll(/"(\w+)"/g), m => m[1]), query: ''};
}

const pages = [];
const items = [];
const isItemPage = id => {
    const cfg = pagesConfig[id];
    return !!cfg && (cfg.type === 'tabs' || cfg.type === 'item');
};

const walk = (node, parents, roles) => {
    const {roles: nodeRoles, refused} = offeredRoles(node, roles);
    const menuPath = [...parents.map(p => p.id), node.id];
    const children = node.children || [];
    if (isItemPage(node.id)) {
        items.push({id: node.id, parent: parents[parents.length - 1]?.id || null, menuPath, roles: nodeRoles, defaultTab: pagesConfig[node.id]?.defaultTab || null, paramName: pagesConfig[node.id]?.paramName || 'id'});
        return;
    }
    const itemChildren = children.filter(c => isItemPage(c.id));
    const pageChildren = children.filter(c => !isItemPage(c.id));
    const isGroup = !!node.redirectTo || (pageChildren.length > 0 && !itemChildren.length && !pagesConfig[node.id]?.component);
    const kind = isGroup ? 'group' : itemChildren.length ? 'list' : 'page';
    const url = pagesConfig[node.id]?.url || node.id;
    const route = '/app/' + [...parents.map(p => pagesConfig[p.id]?.url || p.id), url].join('/');
    pages.push({
        id: node.id, kind, path: route, menuPath, roles: nodeRoles || [], noMenu: !!node.noMenu || parents.some(p => p.noMenu),
        entity: itemChildren[0]?.id || null, redirectTo: node.redirectTo || null, default: node.default || null, depth: parents.length,
        landsOn: null,
        ...(refused.length ? {refusedRoles: refused} : {})
    });
    for (const child of children) walk(child, [...parents, node], nodeRoles);
};
for (const node of decorator) walk(node, [], node.role);
for (const page of pages) {
    const forward = forwards[page.id];
    const targets = forward ? forward.pages.filter(id => id !== page.id).map(id => pages.find(p => p.id === id)).filter(Boolean) : [];
    if (targets.length) page.landsOn = Array.from(new Set(targets.map(t => t.path + forward.query)));
}

const roles = Array.from(new Set(pages.flatMap(p => p.roles))).sort();
const out = {
    generatedAt: new Date().toISOString(),
    source: path.relative(PROJECT, DECORATOR),
    roles,
    counts: {pages: pages.length, menuPages: pages.filter(p => !p.noMenu && p.kind !== 'group').length, groups: pages.filter(p => p.kind === 'group').length, items: items.length},
    pages,
    items
};
fs.mkdirSync(path.join(ROOT, 'inventory'), {recursive: true});
fs.writeFileSync(path.join(ROOT, 'inventory/navigation.json'), JSON.stringify(out, null, 2) + '\n');
console.log(`inventory/navigation.json: ${out.counts.menuPages} menu pages, ${out.counts.groups} groups, ${out.counts.items} item pages, roles ${roles.join(', ')}`);

// ── docs/pages.md — the menu pages as a table, with the spec that covers each (a spec names the page id) ──
const E2E = path.join(ROOT, 'tests', 'e2e');
const specs = fs.existsSync(E2E) ? fs.readdirSync(E2E).filter(f => f.endsWith('.spec.ts')).sort().map(f => ({file: f, src: fs.readFileSync(path.join(E2E, f), 'utf8')})) : [];
const coveringSpec = id => specs.find(s => !/^0(05|10)-/.test(s.file) && new RegExp(`['"\`/]${id}['"\`/]`).test(s.src))?.file || '';
const menuPages = pages.filter(p => p.kind !== 'group' && !p.noMenu);
const lines = ['# Pages of the menu', '', `Generated by \`npm run inventory\` from the Hostify checkout on ${out.generatedAt.slice(0, 10)} — never edit by hand.`,
    `${menuPages.length} menu pages, ${out.counts.items} item pages. "Spec" is the dedicated spec of the page (005 / 010 open every page anyway).`, '',
    '| Page | Route | Kind | Entity | Roles | Spec |', '|---|---|---|---|---|---|'];
for (const p of menuPages) lines.push(`| ${p.menuPath.join(' › ')} | \`${p.path}\` | ${p.kind} | ${p.entity || ''} | ${p.roles.join(', ')} | ${coveringSpec(p.id) ? `\`${coveringSpec(p.id)}\`` : ''} |`);
lines.push('', '## Item pages', '', '| Item | Under | Default tab |', '|---|---|---|');
for (const i of items) lines.push(`| ${i.id} | ${i.parent || ''} | ${i.defaultTab || ''} |`);
fs.mkdirSync(path.join(ROOT, 'docs'), {recursive: true});
fs.writeFileSync(path.join(ROOT, 'docs', 'pages.md'), lines.join('\n') + '\n');
console.log(`docs/pages.md: ${menuPages.length} rows`);
