// GreenGrass documentation site generator.
//
// Scans every Markdown file in the repo, renders each to a styled, self-contained
// HTML page (mirroring the directory structure), generates a grouped sidebar table
// of contents, rewrites .md links to .html, and emits a client-side search index.
//
// All asset/navigation links are RELATIVE so the site works at file://, on a local
// server, and at https://<user>.github.io/<repo>/ without any base-path config.

import { promises as fs, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createMarkdown, scrapeHeadings } from './lib/headings.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'docs');
const ASSETS_SRC = path.join(ROOT, 'site-assets');

const SITE_TITLE = 'GreenGrass';   // proper noun - never translated

// ---------------------------------------------------------------------------
// Languages. English sources live at the repo root; every other language
// mirrors the English tree under `i18n/<code>/`. `outPrefix` is the ONLY thing
// that moves output: it is '' for English, so English URLs never change.
// ---------------------------------------------------------------------------
const DEFAULT_LANG = 'en';

const LANGS = [
  {
    code: 'en', htmlLang: 'en', label: 'EN', srcPrefix: '', outPrefix: '',
    ui: {
      subtitle: 'Spec & Design',
      descSuffix: 'GreenGrass spec & design documentation.',
      skip: 'Skip to content',
      navToggle: 'Toggle navigation',
      searchPlaceholder: 'Search docs\u2026',
      searchLabel: 'Search documentation',
      themeToggle: 'Toggle dark mode',
      sidebarLabel: 'Documentation navigation',
      breadcrumbLabel: 'Breadcrumb',
      onThisPage: 'On this page',
      noResults: 'No results for',
      langNavLabel: 'Language',
      // Shown on a page in THIS language, pointing at the other one - so it is
      // written in the *target* language: the reader who needs it reads that.
      toOther: 'Ver esta p\u00e1gina en espa\u00f1ol',
      toOtherFallback: 'Esta p\u00e1gina no est\u00e1 traducida. Ir a la documentaci\u00f3n en espa\u00f1ol.',
      sections: {
        home: 'Home', spec: 'Specifications', arch: 'Architecture',
        ux: 'UX Design', adr: 'Decisions', diary: 'Diary',
        internal: 'Project & Internal',
      },
    },
  },
  {
    code: 'es', htmlLang: 'es', label: 'ES', srcPrefix: 'i18n/es/', outPrefix: 'es/',
    ui: {
      subtitle: 'Especificaci\u00f3n y dise\u00f1o',
      descSuffix: 'Documentaci\u00f3n de especificaci\u00f3n y dise\u00f1o de GreenGrass.',
      skip: 'Saltar al contenido',
      navToggle: 'Alternar navegaci\u00f3n',
      searchPlaceholder: 'Buscar en la documentaci\u00f3n\u2026',
      searchLabel: 'Buscar en la documentaci\u00f3n',
      themeToggle: 'Alternar modo oscuro',
      sidebarLabel: 'Navegaci\u00f3n de la documentaci\u00f3n',
      breadcrumbLabel: 'Ruta de navegaci\u00f3n',
      onThisPage: 'En esta p\u00e1gina',
      noResults: 'No hay resultados para',
      langNavLabel: 'Idioma',
      toOther: 'View this page in English',
      toOtherFallback: 'This page is not translated. Go to the English documentation.',
      sections: {
        home: 'Inicio', spec: 'Especificaciones', arch: 'Arquitectura',
        ux: 'Dise\u00f1o UX', adr: 'Decisiones', diary: 'Diario',
        internal: 'Proyecto e interno',
      },
    },
  },
];

// Directories/files never scanned for content.
const EXCLUDE_DIRS = new Set([
  'node_modules', 'docs', '.git', 'scripts', 'site-assets', '.github',
  '.context', // Conductor workspace scratch (gitignored; not project content)
]);
const EXCLUDE_FILES = new Set(['package.json', 'package-lock.json']);

// Translation sources live here and are collected per-language, not swept into
// the English set. Matched root-relative so a nested `foo/i18n/` is unaffected.
const I18N_ROOT = 'i18n';

// ---------------------------------------------------------------------------
// Markdown rendering. slugify() and the heading scraper live in lib/headings.mjs
// so scripts/fix-es-anchors.mjs resolves a heading to exactly the id this build
// will emit for it -- see that module's header for why they must not diverge.
// ---------------------------------------------------------------------------
const md = createMarkdown();

// ---------------------------------------------------------------------------
// File discovery
// ---------------------------------------------------------------------------
async function walk(dir, acc = [], root = dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (EXCLUDE_DIRS.has(entry.name)) continue;
      // Skip i18n only at the scan root. When walking i18n/es itself, that dir
      // IS the root, so this guard cannot fire and the tree is collected.
      const rel = path.relative(root, full).split(path.sep).join('/');
      if (rel === I18N_ROOT) continue;
      await walk(full, acc, root);
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
  'pitch', 'demo', 'product', 'mvp', 'users', 'workflows', 'geography', 'security', 'compliance',
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
    id: 'home',
    title: 'Home',
    match: (r) => r === 'README.md',
    sort: () => 0,
  },
  {
    id: 'spec',
    title: 'Specifications',
    match: (r) => r.startsWith('spec/'),
    sort: (r) => indexIn(SPEC_ORDER, baseName(r)),
  },
  {
    id: 'arch',
    title: 'Architecture',
    match: (r) => r.startsWith('design/architecture/'),
    sort: (r) => baseName(r),
  },
  {
    id: 'ux',
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
    id: 'adr',
    title: 'Decisions',
    match: (r) => r.startsWith('decisions/'),
    // ADRs 001-016 numeric first, ux-decisions.md last
    sort: (r) => (baseName(r) === 'ux-decisions' ? [1, 0] : [0, numericPrefix(r)]),
  },
  {
    id: 'diary',
    title: 'Diary',
    match: (r) => r.startsWith('diary/'),
    sort: (r) => (baseName(r).toLowerCase() === 'readme' ? -1 : numericPrefix(r)),
  },
  {
    id: 'internal',
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
// Per-language collection (Pass A)
//
// Each language gets its own doc set, link maps and sidebar. Classification runs
// on `logical` -- the repo-relative path with the language's source prefix
// stripped -- so every existing English-shaped matcher/sorter works unchanged.
// For English `logical === relMd` and `outPrefix === ''`, so English output
// paths are byte-identical to a single-language build.
// ---------------------------------------------------------------------------
async function collect(lang) {
  const srcRoot = lang.srcPrefix ? path.join(ROOT, lang.srcPrefix) : ROOT;
  if (lang.srcPrefix) {
    try {
      await fs.access(srcRoot);
    } catch {
      console.log(`  skip (no sources): ${lang.code}`);
      return null;   // language not translated yet -- not an error
    }
  }
  const files = await walk(srcRoot);

  const docs = [];
  for (const full of files) {
    const relMd = path.relative(ROOT, full).split(path.sep).join('/');
    const logical = lang.srcPrefix ? relMd.slice(lang.srcPrefix.length) : relMd;
    const source = await fs.readFile(full, 'utf8');
    if (source.trim() === '') {
      console.log(`  skip (empty): ${relMd}`);
      continue;
    }
    const outputPath = lang.outPrefix + toOutputPath(logical);
    const title = extractTitle(source, logical.split('/').pop());
    const sectionIdx = sectionFor(logical);
    const sortKey = SECTIONS[sectionIdx].sort(logical);
    docs.push({ lang, relMd, logical, full, source, outputPath, title, sectionIdx, sortKey });
  }

  // Map: language-local .md path -> output path (for link rewriting).
  const mdToOut = new Map();
  for (const d of docs) mdToOut.set(d.logical, d.outputPath);

  // Map: filename -> output path(s). Used as a fallback when a source link uses
  // an incorrect relative path (some source docs do). Only trusted when unique.
  const byBasename = new Map();
  for (const d of docs) {
    const bn = d.logical.split('/').pop().toLowerCase();
    if (!byBasename.has(bn)) byBasename.set(bn, []);
    byBasename.get(bn).push(d.outputPath);
  }

  // Map: directory (language-local, no trailing slash) -> landing output path.
  const dirLanding = new Map();
  {
    const byDir = new Map();
    for (const d of docs) {
      const dir = d.logical.includes('/') ? d.logical.slice(0, d.logical.lastIndexOf('/')) : '';
      if (!byDir.has(dir)) byDir.set(dir, []);
      byDir.get(dir).push(d);
    }
    for (const [dir, list] of byDir) {
      list.sort((a, b) => compareKeys(a.sortKey, b.sortKey));
      const readme = list.find((d) => /readme\.md$/i.test(d.logical));
      const overview = list.find((d) => /00-/.test(d.logical.split('/').pop()));
      const landing = readme || overview || list[0];
      if (dir) dirLanding.set(dir, landing.outputPath);
    }
  }

  // Sidebar nav structure (sections -> ordered items) for this language.
  const sections = SECTIONS.map((sec) => ({ id: sec.id, items: [] }));
  for (const d of docs) sections[d.sectionIdx].items.push(d);
  for (const sec of sections) sec.items.sort((a, b) => compareKeys(a.sortKey, b.sortKey));
  const navSections = sections.filter((sec) => sec.items.length > 0);

  if (docs.length === 0) {
    console.log(`  skip (no documents): ${lang.code}`);
    return null;
  }

  return { lang, docs, mdToOut, byBasename, dirLanding, navSections };
}

// Resolve a language-local link target within one language context.
function resolveIn(ctx, absRel) {
  if (/\.md$/i.test(absRel) && ctx.mdToOut.has(absRel)) return ctx.mdToOut.get(absRel);
  const dirKey = absRel.replace(/\/$/, '');
  if (ctx.dirLanding.has(dirKey)) return ctx.dirLanding.get(dirKey);
  if (ctx.mdToOut.has(absRel + '.md')) return ctx.mdToOut.get(absRel + '.md');
  return null;
}

// The same page in another language: exact counterpart if it exists, else that
// language's home page (flagged so the UI can present it as a fallback).
function counterpart(d, otherLang, outputSet) {
  const stem = d.lang.outPrefix ? d.outputPath.slice(d.lang.outPrefix.length) : d.outputPath;
  const want = otherLang.outPrefix + stem;
  if (outputSet.has(want)) return { href: want, exact: true };
  const home = otherLang.outPrefix + 'index.html';
  if (outputSet.has(home)) return { href: home, exact: false };
  return null;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  // Wipe the output tree so renamed/deleted sources cannot leave stale pages
  // behind (docs/ is committed and deployed, so stale files would ship).
  await fs.rm(OUT, { recursive: true, force: true });

  const ctxs = [];
  for (const lang of LANGS) {
    const ctx = await collect(lang);
    if (ctx) ctxs.push(ctx);
  }
  const enCtx = ctxs.find((c) => c.lang.code === DEFAULT_LANG);

  const allDocs = ctxs.flatMap((c) => c.docs);
  const docsByOutput = new Map(allDocs.map((d) => [d.outputPath, d]));
  const outputSet = new Set(docsByOutput.keys());

  // Pass B: render markdown, collect heading slugs + TOC + plain text.
  for (const d of allDocs) {
    const env = {};
    const html = md.render(d.source, env);
    d.renderedHtml = html;
    // Heading ids + TOC (h2/h3) + slug set, scraped from rendered HTML.
    d.slugSet = new Set();
    d.toc = [];
    for (const { level, id, text } of scrapeHeadings(html)) {
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
  const images = new Set(); // repo-relative paths of images pages point at

  for (const ctx of ctxs) {
    // A translated page may link to a document that has no translation yet;
    // fall back to the English page rather than emitting a dead link.
    const chain = ctx === enCtx ? [ctx] : [ctx, enCtx];

    for (const d of ctx.docs) {
      const fromOut = d.outputPath;
      const fromDir = d.logical.includes('/') ? d.logical.slice(0, d.logical.lastIndexOf('/')) : '';

      const rewritten = d.renderedHtml.replace(/href="([^"]*)"/g, (full, href) => {
        // External / special schemes: leave as-is.
        if (/^(https?:|mailto:|tel:|\/\/)/i.test(href)) return full;
        // Same-page anchor: nothing to rewrite, but still worth checking -- a
        // hand-written in-page link is just as easy to get wrong as a cross-doc one.
        if (href.startsWith('#')) {
          let slug = href.slice(1);
          try { slug = decodeURIComponent(slug); } catch { /* keep raw */ }
          if (slug && !d.slugSet.has(slug)) {
            console.warn(`  ! anchor not found: ${d.relMd} -> ${href}`);
            unresolved++;
          }
          return full;
        }

        // Split off anchor.
        const hashIdx = href.indexOf('#');
        let pathPart = hashIdx === -1 ? href : href.slice(0, hashIdx);
        let anchorPart = hashIdx === -1 ? '' : href.slice(hashIdx); // includes '#'

        pathPart = decodeURI(pathPart);

        // Resolve relative to the source file's directory.
        const absRel = pathPart === ''
          ? d.logical
          : path.posix.normalize(path.posix.join(fromDir, pathPart));

        let targetOut = null;
        let viaLang = null;

        if (pathPart === '') {
          targetOut = fromOut; // pure anchor written as path
        } else {
          for (const c of chain) {
            targetOut = resolveIn(c, absRel);
            if (targetOut) { viaLang = c; break; }
          }
        }

        // Fallback: source link's relative path is wrong, but the target filename
        // is unique across the repo -- resolve by basename and note the fix.
        if (!targetOut && /\.md$/i.test(pathPart)) {
          const bn = pathPart.split('/').pop().toLowerCase();
          for (const c of chain) {
            const candidates = c.byBasename.get(bn);
            if (candidates && candidates.length === 1) {
              targetOut = candidates[0];
              viaLang = c;
              console.warn(`  ~ rerouted broken link in ${d.relMd}: "${pathPart}" -> ${targetOut}`);
              break;
            }
          }
        }

        if (!targetOut) {
          console.warn(`  ! unresolved link in ${d.relMd}: "${href}"`);
          unresolved++;
          return full;
        }

        // Make an untranslated cross-language link visible rather than silent.
        if (viaLang && viaLang !== ctx) {
          console.log(`  > ${ctx.lang.code} link falls back to ${viaLang.lang.code}: ${d.relMd}: "${pathPart}"`);
        }

        // Validate cross-doc anchor against target's heading slugs.
        if (anchorPart) {
          const targetDoc = docsByOutput.get(targetOut);
          const raw = anchorPart.slice(1);
          // markdown-it percent-encodes non-ASCII fragments (#...%C3%B1o) while
          // heading ids stay literal (#...ño). Browsers decode before matching.
          let slug = raw;
          try { slug = decodeURIComponent(raw); } catch { /* keep raw */ }
          if (targetDoc && slug && !targetDoc.slugSet.has(slug)) {
            console.warn(`  ! anchor not found: ${d.relMd} -> ${href}`);
            unresolved++;
          }
        }

        const relPath = relHref(fromOut, targetOut);
        return `href="${relPath}${anchorPart}"`;
      });

      // Images resolve against the source file's real location, so one path
      // works on GitHub and here: a Spanish page reaches an English-tree image
      // with ../../../spec/... . The file is copied into docs/ at its repo path.
      // A missing image fails the build, like a broken link.
      const withImages = rewritten.replace(/<img([^>]*?) src="([^"]*)"/g, (full, pre, src) => {
        if (/^(https?:|data:|\/\/)/i.test(src)) return full;
        const repoPath = path.posix.normalize(path.posix.join(path.posix.dirname(d.relMd), decodeURI(src)));
        if (repoPath.startsWith('..') || !existsSync(path.join(ROOT, repoPath))) {
          console.warn(`  ! missing image in ${d.relMd}: "${src}"`);
          unresolved++;
          return full;
        }
        images.add(repoPath);
        return `<img${pre} src="${relHref(fromOut, repoPath)}"`;
      });

      // External links get target/rel.
      const finalContent = withImages.replace(
        /<a href="(https?:[^"]+)"/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer"'
      );

      const page = renderPage(d, finalContent, ctx, outputSet);
      const outFull = path.join(OUT, d.outputPath);
      await fs.mkdir(path.dirname(outFull), { recursive: true });
      await fs.writeFile(outFull, page, 'utf8');

      searchIndex.push({
        title: d.title,
        url: d.outputPath,
        lang: d.lang.code,
        section: d.lang.ui.sections[SECTIONS[d.sectionIdx].id],
        headings: d.toc.map((t) => t.text),
        text: d.plainText.slice(0, 1400),
      });
    }
  }

  for (const img of images) {
    await fs.mkdir(path.join(OUT, path.dirname(img)), { recursive: true });
    await fs.copyFile(path.join(ROOT, img), path.join(OUT, img));
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

  console.log(`\nBuilt ${allDocs.length} pages into docs/`);
  for (const ctx of ctxs) {
    const t = ctx.lang.ui.sections;
    console.log(
      `  [${ctx.lang.code}] ${ctx.docs.length} pages: ` +
      ctx.navSections.map((sec) => `${t[sec.id]} (${sec.items.length})`).join(', ')
    );
  }
  if (unresolved > 0) {
    // Non-zero on purpose: CI builds and deploys unconditionally, so a warning
    // nobody reads is a broken anchor shipped to production.
    console.error(`\n${unresolved} unresolved link/anchor warning(s) above.`);
    process.exitCode = 1;
  } else {
    console.log('All internal links and anchors resolved.');
  }
}

// ---------------------------------------------------------------------------
// Page template
// ---------------------------------------------------------------------------
function renderSidebar(active, navSections, t) {
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
        `<button type="button" class="nav-section-title" aria-expanded="${sectionActive}">${escapeHtml(t.sections[section.id])}<span class="chev" aria-hidden="true"></span></button>` +
        `<ul>${items}</ul>` +
      `</div>`
    );
  }
  return parts.join('\n');
}

function renderToc(d, t) {
  if (d.toc.length < 2) return '';
  const items = d.toc
    .map((x) => `<li class="toc-${x.level}"><a href="#${x.id}">${escapeHtml(x.text)}</a></li>`)
    .join('');
  return `<nav class="toc" aria-label="${escapeHtml(t.onThisPage)}"><div class="toc-label">${escapeHtml(t.onThisPage)}</div><ul>${items}</ul></nav>`;
}

// EN | ES switch. Server-rendered per page, so it needs no JavaScript. The
// current language is inert text; the other is a link. When this page has no
// counterpart in the other language the link points at that language's home and
// is marked as a fallback rather than hidden -- a control that disappears on
// most pages is never discoverable.
function renderLangSwitch(d, outputSet) {
  const opts = LANGS.map((l) => {
    if (l.code === d.lang.code) {
      return `<span class="lang-opt active" aria-current="true">${escapeHtml(l.label)}</span>`;
    }
    const cp = counterpart(d, l, outputSet);
    if (!cp) return '';
    const href = relHref(d.outputPath, cp.href);
    // Authored on the CURRENT page's strings, but written in the target language
    // -- the reader who needs this prompt is the one who reads that language.
    const title = cp.exact ? d.lang.ui.toOther : d.lang.ui.toOtherFallback;
    const cls = cp.exact ? 'lang-opt' : 'lang-opt lang-opt--fallback';
    return `<a class="${cls}" href="${href}" hreflang="${l.htmlLang}" lang="${l.htmlLang}" title="${escapeHtml(title)}">${escapeHtml(l.label)}</a>`;
  }).filter(Boolean);
  // Only the current language available -> nothing to switch to, render nothing
  // rather than a lone inert button.
  if (opts.length < 2) return '';
  return `\n  <nav class="lang-switch" aria-label="${escapeHtml(d.lang.ui.langNavLabel)}">${opts.join('')}</nav>`;
}

// hreflang alternates -- only for pages that genuinely exist in both languages.
function renderAlternates(d, outputSet) {
  const links = [];
  for (const l of LANGS) {
    const cp = l.code === d.lang.code
      ? { href: d.outputPath, exact: true }
      : counterpart(d, l, outputSet);
    if (!cp || !cp.exact) return '';   // incomplete pair -> declare nothing
    links.push({ lang: l, href: cp.href });
  }
  const en = links.find((x) => x.lang.code === DEFAULT_LANG);
  const tags = links.map(
    (x) => `<link rel="alternate" hreflang="${x.lang.htmlLang}" href="${relHref(d.outputPath, x.href)}">`
  );
  if (en) tags.push(`<link rel="alternate" hreflang="x-default" href="${relHref(d.outputPath, en.href)}">`);
  return '\n' + tags.join('\n');
}

function renderPage(d, content, ctx, outputSet) {
  const t = d.lang.ui;
  const base = baseFor(d.outputPath);
  const sidebar = renderSidebar(d, ctx.navSections, t);
  const toc = renderToc(d, t);
  const sectionName = t.sections[SECTIONS[d.sectionIdx].id] || '';
  const pageTitle = `${d.title} · ${SITE_TITLE}`;
  return `<!DOCTYPE html>
<html lang="${d.lang.htmlLang}" data-base="${base}" data-no-results="${escapeHtml(t.noResults)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(pageTitle)}</title>
<meta name="description" content="${escapeHtml(d.title)} — ${escapeHtml(t.descSuffix)}">${renderAlternates(d, outputSet)}
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%232563eb'/%3E%3Cstop offset='1' stop-color='%2316a34a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='32' height='32' rx='7' fill='url(%23g)'/%3E%3C/svg%3E">
<link rel="stylesheet" href="${base}assets/styles.css">
</head>
<body>
<a class="skip-link" href="#content">${escapeHtml(t.skip)}</a>
<header class="site-header">
  <button type="button" class="menu-toggle" aria-label="${escapeHtml(t.navToggle)}" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
  <a class="brand" href="${base}${d.lang.outPrefix}index.html">
    <span class="brand-mark" aria-hidden="true"></span>
    <span class="brand-text"><strong>${SITE_TITLE}</strong><small>${escapeHtml(t.subtitle)}</small></span>
  </a>
  <div class="search">
    <input type="search" id="search-input" placeholder="${escapeHtml(t.searchPlaceholder)}" autocomplete="off" aria-label="${escapeHtml(t.searchLabel)}">
    <div id="search-results" class="search-results" hidden></div>
  </div>${renderLangSwitch(d, outputSet)}
  <button type="button" class="theme-toggle" aria-label="${escapeHtml(t.themeToggle)}" title="${escapeHtml(t.themeToggle)}">
    <span class="theme-icon" aria-hidden="true"></span>
  </button>
</header>
<div class="layout">
  <div class="sidebar-backdrop" hidden></div>
  <aside class="sidebar" aria-label="${escapeHtml(t.sidebarLabel)}">
    <nav class="nav">
${sidebar}
    </nav>
  </aside>
  <main id="content" class="content">
    <nav class="breadcrumb" aria-label="${escapeHtml(t.breadcrumbLabel)}">${escapeHtml(sectionName)}</nav>
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
