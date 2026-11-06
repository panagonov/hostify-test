/**
 * `bugs/index.html` — the bug files as ONE page for a person: the newest bugs first, per state, each with what
 * went wrong, how to reproduce (the page's URL as a link), the screenshots inline and the history. The same
 * content as the md files, rendered; no server, no dependency — the QA person opens it in a browser
 * (`npm run qa:bugs:open`). Rewritten at the end of every run and by `qa:bugs --html`.
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as bugs from './bugs.mjs';

const STATE_TEXT = {
    'new': {title: 'Нови', hint: 'намерени от тестовете, чакат разработчик', colour: '#d4380d'},
    'needs-new-fix': {title: 'За нов фикс', hint: 'поправката не издържа проверката', colour: '#ad4e00'},
    'for-verification': {title: 'За проверка', hint: 'поправени, чакат следващия пуск', colour: '#0958d9'},
    'verified': {title: 'Проверени', hint: 'поправката е потвърдена от тестовете', colour: '#389e0d'},
    'declined': {title: 'Отхвърлени', hint: 'не е дефект — с причината', colour: '#595959'}
};
const ORDER = ['new', 'needs-new-fix', 'for-verification', 'verified', 'declined'];

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** The md files sit in bugs/<state>/; the page sits in bugs/ — one `../` less. */
const fixPath = p => p.replace(/^\.\.\/\.\.\//, '../');

const inline = text => {
    let t = esc(text);
    t = t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => `<a class="shot" href="${fixPath(src)}" target="_blank"><img src="${fixPath(src)}" alt="${alt}" loading="lazy"></a>`);
    t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => `<a href="${fixPath(href)}" target="_blank">${label}</a>`);
    t = t.replace(/`([^`]+)`/g, '<code>$1</code>');
    t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    // bare URLs (outside the links made above) — the problematic page becomes a link
    t = t.replace(/(^|[^"'>=])(https?:\/\/[^\s<)]+)/g, (_, pre, url) => `${pre}<a href="${url}" target="_blank">${url}</a>`);
    return t;
};

/** The md subset the bug files use → HTML. */
const md = body => {
    const out = [];
    const lines = body.split('\n');
    let i = 0, list = null;
    const closeList = () => { if (list) { out.push(`</${list}>`); list = null; } };
    while (i < lines.length) {
        const line = lines[i];
        if (line.startsWith('```')) {
            closeList();
            const code = [];
            i++;
            while (i < lines.length && !lines[i].startsWith('```')) code.push(lines[i++]);
            out.push(`<pre>${esc(code.join('\n'))}</pre>`);
            i++;
            continue;
        }
        if (/^# /.test(line)) { i++; continue; } // the title: the card has its own
        if (/^## /.test(line)) { closeList(); out.push(`<h4>${inline(line.slice(3))}</h4>`); i++; continue; }
        if (/^\*\*[^*]+\*\*\s*$/.test(line)) { closeList(); out.push(`<h5>${inline(line.replace(/\*\*/g, ''))}</h5>`); i++; continue; }
        if (/^---\s*$/.test(line)) { closeList(); out.push('<hr>'); i++; continue; }
        const bullet = line.match(/^- (.*)$/);
        const numbered = line.match(/^(\d+)\. (.*)$/);
        if (bullet || numbered) {
            const kind = bullet ? 'ul' : 'ol';
            if (list !== kind) { closeList(); out.push(`<${kind}>`); list = kind; }
            out.push(`<li>${inline(bullet ? bullet[1] : numbered[2])}</li>`);
            i++;
            continue;
        }
        if (!line.trim()) { closeList(); i++; continue; }
        closeList();
        out.push(`<p>${inline(line)}</p>`);
        i++;
    }
    closeList();
    return out.join('\n');
};

const card = b => {
    const m = b.meta;
    const body = b.body.replace(/^\n+/, '');
    const fix = body.includes('\n## Fix') ? body.split('\n## Fix')[1].split('\n## История')[0] : '';
    const history = body.includes('\n## История') ? body.split('\n## История')[1] : '';
    const main = body.split('\n## Fix')[0].split('\n## История')[0];
    const seen = Array.isArray(m.seenIn) ? m.seenIn.length : 1;
    return `<article class="bug" id="${esc(m.id)}" data-state="${b.state}">
  <header>
    <span class="state" style="--c:${STATE_TEXT[b.state]?.colour || '#999'}">${esc(STATE_TEXT[b.state]?.title || b.state)}</span>
    <h3>${esc(m.spec)} — ${esc(m.test)}</h3>
    <div class="meta">версия <b>${esc(m.version)}</b> · ${esc(m.description || '')} · акаунт ${esc(m.tenant || '')} · намерен ${esc(m.found || '')}${seen > 1 ? ` · видян ${seen} пъти, последно ${esc(m.lastSeen)}` : ''}${m.github ? ` · <a href="#" class="gh">issue #${esc(m.github)}</a>` : ''}</div>
  </header>
  <div class="body">${md(main)}</div>
  ${fix ? `<details class="fix" open><summary>Поправка</summary>${md(fix)}</details>` : ''}
  ${history ? `<details class="history"><summary>История</summary>${md(history)}</details>` : ''}
  <footer><code>${esc(b.file)}</code></footer>
</article>`;
};

export const render = root => {
    const all = bugs.list(root).sort((a, b) => (b.meta.lastSeen || '').localeCompare(a.meta.lastSeen || ''));
    const counts = Object.fromEntries(ORDER.map(s => [s, all.filter(b => b.state === s).length]));
    const versions = [...new Set(all.map(b => b.meta.version))].sort().reverse();
    const stamp = new Date().toLocaleString('bg-BG', {dateStyle: 'short', timeStyle: 'short'});
    const sections = ORDER.map(s => {
        const items = all.filter(b => b.state === s);
        if (!items.length) return '';
        return `<section data-state="${s}"><h2 style="--c:${STATE_TEXT[s].colour}">${STATE_TEXT[s].title} <small>${items.length} · ${STATE_TEXT[s].hint}</small></h2>${items.map(card).join('\n')}</section>`;
    }).join('\n');
    const html = `<!doctype html>
<html lang="bg"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Hostify QA — казуси</title>
<style>
:root{--bg:#f5f6f8;--card:#fff;--text:#1f2329;--muted:#6b7280;--line:#e5e7eb;--code:#f0f2f5}
@media(prefers-color-scheme:dark){:root{--bg:#111418;--card:#1a1f26;--text:#e6e8eb;--muted:#9aa3ad;--line:#2b323b;--code:#0f1216}}
*{box-sizing:border-box}body{margin:0;font:15px/1.5 -apple-system,Segoe UI,Roboto,sans-serif;background:var(--bg);color:var(--text)}
.top{position:sticky;top:0;background:var(--card);border-bottom:1px solid var(--line);padding:12px 24px;display:flex;gap:16px;align-items:center;flex-wrap:wrap;z-index:2}
.top h1{font-size:18px;margin:0 16px 0 0}.top .muted{color:var(--muted);font-size:13px}
.chips{display:flex;gap:8px;flex-wrap:wrap}.chip{border:1px solid var(--line);border-radius:999px;padding:4px 12px;cursor:pointer;background:var(--card);color:var(--text);font-size:13px}
.chip[aria-pressed=true]{background:var(--text);color:var(--card)}
main{max-width:1100px;margin:0 auto;padding:16px 24px 64px}
section h2{font-size:17px;margin:28px 0 12px;padding-left:10px;border-left:4px solid var(--c)}section h2 small{color:var(--muted);font-weight:normal;font-size:13px}
.bug{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:16px 20px;margin:0 0 14px}
.bug header h3{font-size:16px;margin:6px 0 4px}.bug .state{display:inline-block;font-size:12px;padding:2px 10px;border-radius:999px;color:#fff;background:var(--c)}
.bug .meta{color:var(--muted);font-size:13px}.bug h4{font-size:14px;margin:14px 0 6px}.bug h5{font-size:13px;margin:12px 0 4px;text-transform:uppercase;letter-spacing:.03em;color:var(--muted)}
.bug p,.bug li{margin:4px 0}.bug ol,.bug ul{padding-left:22px}.bug pre{background:var(--code);padding:10px 12px;border-radius:8px;overflow:auto;font-size:13px;white-space:pre-wrap}
.bug code{background:var(--code);padding:1px 5px;border-radius:4px;font-size:13px}.bug a{color:#1677ff;word-break:break-all}
.bug img{max-width:100%;border:1px solid var(--line);border-radius:8px;display:block;margin:6px 0}.bug .shot{display:inline-block;max-width:48%;margin-right:2%;vertical-align:top}
.bug details{margin-top:10px;border-top:1px dashed var(--line);padding-top:8px}.bug summary{cursor:pointer;font-weight:600;font-size:14px}
.bug footer{margin-top:10px;color:var(--muted);font-size:12px}.empty{color:var(--muted);padding:40px 0;text-align:center}
</style></head><body>
<div class="top"><h1>Hostify QA — казуси</h1><span class="muted">генерирано ${esc(stamp)} · версии: ${versions.map(esc).join(', ') || '—'}</span>
<div class="chips">${ORDER.map(s => `<button class="chip" data-filter="${s}" aria-pressed="${s === 'new' || s === 'needs-new-fix' ? 'true' : 'false'}">${STATE_TEXT[s].title} (${counts[s]})</button>`).join('')}<button class="chip" data-filter="all" aria-pressed="false">всички (${all.length})</button></div></div>
<main>${sections || '<p class="empty">Няма казуси.</p>'}</main>
<script>
const chips=[...document.querySelectorAll('.chip')];const apply=()=>{const on=new Set(chips.filter(c=>c.getAttribute('aria-pressed')==='true').map(c=>c.dataset.filter));const all=on.has('all')||on.size===0;document.querySelectorAll('section[data-state]').forEach(s=>s.style.display=all||on.has(s.dataset.state)?'':'none');};
chips.forEach(c=>c.addEventListener('click',()=>{if(c.dataset.filter==='all'){chips.forEach(x=>x.setAttribute('aria-pressed',x===c?'true':'false'));}else{document.querySelector('[data-filter=all]').setAttribute('aria-pressed','false');c.setAttribute('aria-pressed',c.getAttribute('aria-pressed')==='true'?'false':'true');}apply();}));apply();
</script></body></html>`;
    const file = path.join(root, 'bugs', 'index.html');
    fs.mkdirSync(path.dirname(file), {recursive: true});
    fs.writeFileSync(file, html);
    return {file, total: all.length, counts};
};
