// GreenGrass documentation site generator.
//
// Scans every Markdown file in the repo, renders each to a styled, self-contained
// HTML page (mirroring the directory structure), generates a grouped sidebar table
// of contents, rewrites .md links to .html, and emits a client-side search index.
//
// All asset/navigation links are RELATIVE so the site works at file://, on a local
// server, and at https://<user>.github.io/<repo>/ without any base-path config.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'docs');
const ASSETS_SRC = path.join(ROOT, 'site-assets');

const SITE_TITLE = 'GreenGrass';
const SITE_SUBTITLE = 'Spec & Design';

// Directories/files never scanned for content.
const EXCLUDE_DIRS = new Set([
  'node_modules', 'docs', '.git', 'scripts', 'site-assets', '.github',
  '.context', // Conductor workspace scratch (gitignored; not project content)
]);
const EXCLUDE_FILES = new Set(['package.json', 'package-lock.json']);

// ---------------------------------------------------------------------------
// GitHub-compatible heading slugify (matches anchors authored in the source).
// ---------------------------------------------------------------------------
function slugify(str) {
  return String(str)
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')   // drop punctuation, keep word chars / space / hyphen
    .replace(/\s+/g, '-');      // spaces -> hyphens
}

const md = new MarkdownIt({ html: true, linkify: true, typographer: false }).use(anchor, {
  slugify,
  permalink: anchor.permalink.linkInsideHeader({
    symbol: '#',
    placement: 'before',
    class: 'heading-anchor',
    ariaHidden: true,
  }),
});

// ---------------------------------------------------------------------------
// File discovery
// ---------------------------------------------------------------------------
async function walk(dir, acc = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (EXCLUDE_DIRS.has(entry.name)) continue;
      await walk(full, acc);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
      if (EXCLUDE_FILES.has(entry.name)) continue;
      acc.push(full);
    }
  }
  return acc;
}

// Output path: mirror structure, strip leading dots from segments (GitHub Pages
// does not reliably serve dot-directories), README.md -> index.html in its dir.
function toOutputPath(relMd) {
  const parts = relMd.split('/');
  const file = parts.pop();
  const dirSegs = parts.map((s) => s.replace(/^\.+/, '')); // .claude -> claude
  let outFile;
  if (file.toLowerCase() === 'readme.md') outFile = 'index.html';
  else outFile = file.replace(/\.md$/i, '.html');
  return [...dirSegs, outFile].join('/');
}

function humanize(name) {
  return name
    .replace(/\.md$/i, '')
    .replace(/^\d+[-_]?/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function extractTitle(source, fallbackName) {
  const m = source.match(/^#\s+(.+?)\s*$/m);
  if (m) {
    return m[1]
      .replace(/[`*_]/g, '')       // strip simple inline markdown
      .replace(/\s*#*\s*$/, '')
      .trim();
  }
  return humanize(fallbackName);
}

// ---------------------------------------------------------------------------
// Section configuration — curated order driven by the repo's own reading orders.
// Each entry: { title, match(relMd) -> bool, order(relMd) -> sortable }
// ---------------------------------------------------------------------------
const SPEC_ORDER = [
  'product', 'mvp', 'users', 'workflows', 'geography', 'security', 'compliance',
  'fundraising', 'integrations', 'support', 'gotv', 'messaging', 'press', 'comms-intelligence',
];
const WIREFRAME_ORDER = [
  'navigation-shell', 'dashboards', 'field-mode', 'onboarding', 'messaging',
  'supporter-portal', 'alliance', 'crm', 'field-ops', 'fundraising',
  'communications', 'social-media', 'events', 'press', 'activism', 'gotv',
  'settings', 'auth', 'profile', 'help', 'public',
];
const UX_TOP_ORDER = ['00-overview'];
const UX_SUBDIR_ORDER = [
  '01-information-architecture', '02-global-patterns', '03-design-system', '04-wireframes',
];
const IA_ORDER = ['navigation-model', 'screen-inventory', 'persona-views', 'url-structure'];
const PATTERN_ORDER = [
  'pattern-catalog', 'offline-sync-patterns', 'notification-patterns',
  'search-patterns', 'settings-help-patterns', 'security-ux-patterns',
];
const DS_ORDER = ['foundations', 'theming-strategy', 'component-inventory', 'responsive-strategy'];

function baseName(relMd) {
  return relMd.split('/').pop().replace(/\.md$/i, '');
}
function indexIn(list, key) {
  const i = list.indexOf(key);
  return i === -1 ? 999 : i;
}

// Returns a numeric sort key derived from a leading number in the filename, else big.
function numericPrefix(relMd) {
  const m = baseName(relMd).match(/^(\d+)/);
  return m ? parseInt(m[1], 10) : 9999;
}

const SECTIONS = [
  {
    title: 'Home',
    match: (r) => r === 'README.md',
    sort: () => 0,
  },
  {
    title: 'Specifications',
    match: (r) => r.startsWith('spec/'),
    sort: (r) => indexIn(SPEC_ORDER, baseName(r)),
  },
  {
    title: 'Architecture',
    match: (r) => r.startsWith('design/architecture/'),
    sort: (r) => baseName(r),
  },
  {
    title: 'UX Design',
    match: (r) => r.startsWith('design/ux/'),
    sort: (r) => {
      const rel = r.slice('design/ux/'.length);
      if (!rel.includes('/')) {
        // top-level file (00-overview.md)
        return [0, indexIn(UX_TOP_ORDER, baseName(r)), baseName(r)];
      }
      const sub = rel.split('/')[0];
      const subIdx = indexIn(UX_SUBDIR_ORDER, sub);
      // within-subdir ordering
      let within;
      const bn = baseName(r);
      if (sub === '01-information-architecture') within = indexIn(IA_ORDER, bn);
      else if (sub === '02-global-patterns') within = indexIn(PATTERN_ORDER, bn);
      else if (sub === '03-design-system') within = indexIn(DS_ORDER, bn);
      else if (sub === '04-wireframes') {
        if (bn.toLowerCase() === 'readme') within = -1;       // README first
        else if (bn === 'audit') within = 998;                // audit last
        else within = indexIn(WIREFRAME_ORDER, bn);
      } else within = bn;
      return [1, subIdx, within, bn];
    },
  },
  {
    title: 'Decisions',
    match: (r) => r.startsWith('decisions/'),
    // ADRs 001-016 numeric first, ux-decisions.md last
    sort: (r) => (baseName(r) === 'ux-decisions' ? [1, 0] : [0, numericPrefix(r)]),
  },
  {
    title: 'Diary',
    match: (r) => r.startsWith('diary/'),
    sort: (r) => (baseName(r).toLowerCase() === 'readme' ? -1 : numericPrefix(r)),
  },
  {
    title: 'Project & Internal',
    match: () => true, // catch-all (CLAUDE.md, .claude/*, etc.)
    sort: (r) => r,
  },
];

function sectionFor(relMd) {
  for (let i = 0; i < SECTIONS.length; i++) {
    if (SECTIONS[i].match(relMd)) return i;
  }
  return SECTIONS.length - 1;
}

function compareKeys(a, b) {
  const av = Array.isArray(a) ? a : [a];
  const bv = Array.isArray(b) ? b : [b];
  const len = Math.max(av.length, bv.length);
  for (let i = 0; i < len; i++) {
    const x = av[i] ?? 0;
    const y = bv[i] ?? 0;
    if (x < y) return -1;
    if (x > y) return 1;
  }
  return 0;
}

// ---------------------------------------------------------------------------
// HTML helpers
// ---------------------------------------------------------------------------
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function relHref(fromOutput, toOutput) {
  const fromDir = path.posix.dirname(fromOutput);
  let rel = path.posix.relative(fromDir, toOutput);
  if (!rel) rel = path.posix.basename(toOutput);
  if (!rel.startsWith('.') && !rel.startsWith('/')) rel = './' + rel;
  return rel;
}

function baseFor(outputPath) {
  const depth = outputPath.split('/').length - 1;
  return depth === 0 ? '' : '../'.repeat(depth);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const files = await walk(ROOT);

  // Pass A: build doc records + maps.
  const docs = [];
  for (const full of files) {
    const relMd = path.relative(ROOT, full).split(path.sep).join('/');
    const source = await fs.readFile(full, 'utf8');
    if (source.trim() === '') {
      console.log(`  skip (empty): ${relMd}`);
      continue;
    }
    const outputPath = toOutputPath(relMd);
    const baseNm = relMd.split('/').pop();
    const title = extractTitle(source, baseNm);
    const sectionIdx = sectionFor(relMd);
    const sortKey = SECTIONS[sectionIdx].sort(relMd);
    docs.push({ relMd, full, source, outputPath, title, sectionIdx, sortKey });
  }

  // Map: repo-relative .md path -> output path (for link rewriting).
  const mdToOut = new Map();
  for (const d of docs) mdToOut.set(d.relMd, d.outputPath);

  // Map: filename -> output path(s). Used as a fallback when a source link uses
  // an incorrect relative path (some source docs do). Only trusted when unique.
  const byBasename = new Map();
  for (const d of docs) {
    const bn = d.relMd.split('/').pop().toLowerCase();
    if (!byBasename.has(bn)) byBasename.set(bn, []);
    byBasename.get(bn).push(d.outputPath);
  }

  // Map: directory (repo-relative, no trailing slash) -> landing output path.
  const dirLanding = new Map();
  {
    const byDir = new Map();
    for (const d of docs) {
      const dir = d.relMd.includes('/') ? d.relMd.slice(0, d.relMd.lastIndexOf('/')) : '';
      if (!byDir.has(dir)) byDir.set(dir, []);
      byDir.get(dir).push(d);
    }
    for (const [dir, list] of byDir) {
      list.sort((a, b) => compareKeys(a.sortKey, b.sortKey));
      const readme = list.find((d) => /readme\.md$/i.test(d.relMd));
      const overview = list.find((d) => /00-/.test(d.relMd.split('/').pop()));
      const landing = readme || overview || list[0];
      if (dir) dirLanding.set(dir, landing.outputPath);
    }
  }

  // Build sidebar nav structure (sections -> ordered items).
  const sections = SECTIONS.map((s) => ({ title: s.title, items: [] }));
  for (const d of docs) sections[d.sectionIdx].items.push(d);
  for (const s of sections) s.items.sort((a, b) => compareKeys(a.sortKey, b.sortKey));
  const navSections = sections.filter((s) => s.items.length > 0);

  // Pass B: render markdown, collect heading slugs + TOC + plain text.
  for (const d of docs) {
    const env = {};
    const html = md.render(d.source, env);
    d.renderedHtml = html;
    // Heading ids + TOC (h2/h3) + slug set, scraped from rendered HTML.
    d.slugSet = new Set();
    d.toc = [];
    const headingRe = /<h([1-6])[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/g;
    let hm;
    while ((hm = headingRe.exec(html)) !== null) {
      const level = parseInt(hm[1], 10);
      const id = hm[2];
      const text = hm[3].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      d.slugSet.add(id);
      if (level === 2 || level === 3) d.toc.push({ level, id, text });
    }
    // Plain text excerpt for search (strip tags, collapse whitespace).
    d.plainText = html
      .replace(/<pre[\s\S]*?<\/pre>/g, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&[a-z]+;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Pass C: rewrite links, assemble pages, write files.
  let unresolved = 0;
  const searchIndex = [];

  for (const d of docs) {
    const fromOut = d.outputPath;
    const fromDir = d.relMd.includes('/') ? d.relMd.slice(0, d.relMd.lastIndexOf('/')) : '';

    const rewritten = d.renderedHtml.replace(/href="([^"]*)"/g, (full, href) => {
      // External / anchors / special schemes: leave as-is.
      if (/^(https?:|mailto:|tel:|\/\/)/i.test(href)) return full;
      if (href.startsWith('#')) return full;

      // Split off anchor.
      const hashIdx = href.indexOf('#');
      let pathPart = hashIdx === -1 ? href : href.slice(0, hashIdx);
      let anchorPart = hashIdx === -1 ? '' : href.slice(hashIdx); // includes '#'

      pathPart = decodeURI(pathPart);

      // Resolve relative to the source file's directory.
      const absRel = pathPart === ''
        ? d.relMd
        : path.posix.normalize(path.posix.join(fromDir, pathPart));

      let targetOut = null;

      if (pathPart === '') {
        targetOut = fromOut; // pure anchor written as path
      } else if (/\.md$/i.test(absRel) && mdToOut.has(absRel)) {
        targetOut = mdToOut.get(absRel);
      } else {
        // Maybe a directory link.
        const dirKey = absRel.replace(/\/$/, '');
        if (dirLanding.has(dirKey)) {
          targetOut = dirLanding.get(dirKey);
        } else if (mdToOut.has(absRel + '.md')) {
          targetOut = mdToOut.get(absRel + '.md');
        }
      }

      // Fallback: source link's relative path is wrong, but the target filename
      // is unique across the repo — resolve by basename and note the fix.
      if (!targetOut && /\.md$/i.test(pathPart)) {
        const bn = pathPart.split('/').pop().toLowerCase();
        const candidates = byBasename.get(bn);
        if (candidates && candidates.length === 1) {
          targetOut = candidates[0];
          console.warn(`  ~ rerouted broken link in ${d.relMd}: "${pathPart}" -> ${targetOut}`);
        }
      }

      if (!targetOut) {
        console.warn(`  ! unresolved link in ${d.relMd}: "${href}"`);
        unresolved++;
        return full;
      }

      // Validate cross-doc anchor against target's heading slugs.
      if (anchorPart) {
        const targetDoc = docs.find((x) => x.outputPath === targetOut);
        const slug = anchorPart.slice(1);
        if (targetDoc && slug && !targetDoc.slugSet.has(slug)) {
          console.warn(`  ! anchor not found: ${d.relMd} -> ${href}`);
          unresolved++;
        }
      }

      const relPath = relHref(fromOut, targetOut);
      return `href="${relPath}${anchorPart}"`;
    });

    // External links get target/rel.
    const finalContent = rewritten.replace(
      /<a href="(https?:[^"]+)"/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer"'
    );

    const page = renderPage(d, finalContent, navSections);
    const outFull = path.join(OUT, d.outputPath);
    await fs.mkdir(path.dirname(outFull), { recursive: true });
    await fs.writeFile(outFull, page, 'utf8');

    searchIndex.push({
      title: d.title,
      url: d.outputPath,
      section: SECTIONS[d.sectionIdx].title,
      headings: d.toc.map((t) => t.text),
      text: d.plainText.slice(0, 1400),
    });
  }

  // Assets + search index + .nojekyll.
  await fs.mkdir(path.join(OUT, 'assets'), { recursive: true });
  for (const f of ['styles.css', 'app.js', 'search.js']) {
    await fs.copyFile(path.join(ASSETS_SRC, f), path.join(OUT, 'assets', f));
  }
  await fs.writeFile(
    path.join(OUT, 'assets', 'search-index.json'),
    JSON.stringify(searchIndex),
    'utf8'
  );
  await fs.writeFile(path.join(OUT, '.nojekyll'), '', 'utf8');

  console.log(`\nBuilt ${docs.length} pages into docs/`);
  console.log(`Sections: ${navSections.map((s) => `${s.title} (${s.items.length})`).join(', ')}`);
  if (unresolved > 0) {
    console.log(`\n${unresolved} unresolved link/anchor warning(s) above.`);
  } else {
    console.log('All internal links and anchors resolved.');
  }
}

// ---------------------------------------------------------------------------
// Page template
// ---------------------------------------------------------------------------
function renderSidebar(active, navSections) {
  const fromOut = active.outputPath;
  const parts = [];
  for (const section of navSections) {
    const sectionActive = section.items.some((it) => it.outputPath === fromOut);
    const items = section.items
      .map((it) => {
        const isActive = it.outputPath === fromOut;
        const href = relHref(fromOut, it.outputPath);
        return `<li><a href="${href}"${isActive ? ' aria-current="page" class="active"' : ''}>${escapeHtml(it.title)}</a></li>`;
      })
      .join('');
    parts.push(
      `<div class="nav-section${sectionActive ? ' open' : ''}">` +
        `<button type="button" class="nav-section-title" aria-expanded="${sectionActive}">${escapeHtml(section.title)}<span class="chev" aria-hidden="true"></span></button>` +
        `<ul>${items}</ul>` +
      `</div>`
    );
  }
  return parts.join('\n');
}

function renderToc(d) {
  if (d.toc.length < 2) return '';
  const items = d.toc
    .map((t) => `<li class="toc-${t.level}"><a href="#${t.id}">${escapeHtml(t.text)}</a></li>`)
    .join('');
  return `<nav class="toc" aria-label="On this page"><div class="toc-label">On this page</div><ul>${items}</ul></nav>`;
}

function renderPage(d, content, navSections) {
  const base = baseFor(d.outputPath);
  const sidebar = renderSidebar(d, navSections);
  const toc = renderToc(d);
  const sectionName = navSections.find((s) => s.items.includes(d))?.title || '';
  const pageTitle = `${d.title} · ${SITE_TITLE}`;
  return `<!DOCTYPE html>
<html lang="en" data-base="${base}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(pageTitle)}</title>
<meta name="description" content="${escapeHtml(d.title)} — GreenGrass spec &amp; design documentation.">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%232563eb'/%3E%3Cstop offset='1' stop-color='%2316a34a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='32' height='32' rx='7' fill='url(%23g)'/%3E%3C/svg%3E">
<link rel="stylesheet" href="${base}assets/styles.css">
</head>
<body>
<a class="skip-link" href="#content">Skip to content</a>
<header class="site-header">
  <button type="button" class="menu-toggle" aria-label="Toggle navigation" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
  <a class="brand" href="${base}index.html">
    <span class="brand-mark" aria-hidden="true"></span>
    <span class="brand-text"><strong>${SITE_TITLE}</strong><small>${SITE_SUBTITLE}</small></span>
  </a>
  <div class="search">
    <input type="search" id="search-input" placeholder="Search docs…" autocomplete="off" aria-label="Search documentation">
    <div id="search-results" class="search-results" hidden></div>
  </div>
  <button type="button" class="theme-toggle" aria-label="Toggle dark mode" title="Toggle dark mode">
    <span class="theme-icon" aria-hidden="true"></span>
  </button>
</header>
<div class="layout">
  <div class="sidebar-backdrop" hidden></div>
  <aside class="sidebar" aria-label="Documentation navigation">
    <nav class="nav">
${sidebar}
    </nav>
  </aside>
  <main id="content" class="content">
    <nav class="breadcrumb" aria-label="Breadcrumb">${escapeHtml(sectionName)}</nav>
    <article class="prose">
${content}
    </article>
  </main>
  <div class="toc-rail">${toc}</div>
</div>
<script src="${base}assets/search.js" defer></script>
<script src="${base}assets/app.js" defer></script>
</body>
</html>
`;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
