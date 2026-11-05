#!/usr/bin/env node
/**
 * Builds `inventory/navigation.json` — every page of the application's left menu with its route, menu path, roles,
 * kind (list / page / group) and the entity whose records it lists — from the Hostify project checkout:
 *   client/src/hydraExtension/config/pagesDecorator.ts   (the menu tree, hand-maintained)
 *   client/src/hydraExtension/config/pagesConfig.ts      (page types: tabs / item pages, url overrides)
 *
 *   node tools/inventory/build.mjs [--project /path/to/hostify-desktop]   (default: the parent folder)
 *
 * The developers run it after a menu change and commit the JSON; the sweep specs (005, 010) and the page specs read
 * it. The QA person never needs the Hostify checkout.
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const argIndex = process.argv.indexOf('--project');
const PROJECT = path.resolve(argIndex > 0 ? process.argv[argIndex + 1] : path.join(ROOT, '..'));
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

const pages = [];
const items = [];
const isItemPage = id => {
    const cfg = pagesConfig[id];
    return !!cfg && (cfg.type === 'tabs' || cfg.type === 'item');
};

const walk = (node, parents, roles) => {
    const nodeRoles = node.role || roles;
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
        entity: itemChildren[0]?.id || null, redirectTo: node.redirectTo || null, default: node.default || null, depth: parents.length
    });
    for (const child of children) walk(child, [...parents, node], nodeRoles);
};
for (const node of decorator) walk(node, [], node.role);

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
