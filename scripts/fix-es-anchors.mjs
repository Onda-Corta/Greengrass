// Repoint translated cross-references at translated headings.
//
// Translators copy each citation's URL verbatim from the English source, so a
// link in i18n/es/spec/support.md still reads (workflows.md#1-tenant-onboarding)
// while the Spanish heading is "1. Incorporación de organizaciones". Headings are
// translated in place, so the Nth heading of the English file corresponds to the
// Nth heading of the Spanish one; that positional correspondence is what we map
// through. Heading ids come from lib/headings.mjs -- the same renderer the site
// build uses -- so a mapped anchor is the id the build will actually emit.
//
// Structure is load-bearing, so this validates the whole tree before writing
// anything: a mid-run abort would leave a tree that is half English, half
// Spanish, and whose already-processed state is ambiguous.
//
//   node scripts/fix-es-anchors.mjs                 rewrite
//   node scripts/fix-es-anchors.mjs --report-only   parity table, no writes
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { headingSlugs } from './lib/headings.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ES_ROOT = path.join(ROOT, 'i18n/es');
const REPORT_ONLY = process.argv.includes('--report-only');

// The Spanish home page is deliberately NOT a translation of the English repo
// README -- it is a reader-facing front door that drops the build instructions
// and says what is and isn't in Spanish. It therefore has no positional heading
// correspondence, so it is exempt from the parity check and never used as an
// anchor target. Any citation of `README.md#something` will surface as unmapped,
// which is the right outcome: there is nothing to map it through.
const NOT_A_TRANSLATION = new Set(['README.md']);

const read = (f) => fs.readFile(f, 'utf8');
const posix = (p) => p.split(path.sep).join('/');

async function walk(dir, acc = []) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) await walk(full, acc);
    else if (e.isFile() && e.name.toLowerCase().endsWith('.md')) acc.push(full);
  }
  return acc;
}

// --- Pass 1: discover -------------------------------------------------------
// Every ES document is keyed by its logical path -- the repo-relative path of
// the English original -- because that is what the site generator keys on too.
const esFiles = (await walk(ES_ROOT)).sort();
const pairs = new Map();   // logical -> { logical, esPath, en, es, enH, esH }
const problems = [];

for (const esPath of esFiles) {
  const logical = posix(path.relative(ES_ROOT, esPath));
  const enPath = path.join(ROOT, logical);
  let en;
  try {
    en = await read(enPath);
  } catch {
    // An ES file with no English original can never pair with an English page:
    // the language switch and the sidebar sort both key on the English name.
    problems.push(`${logical}: no English original at ${logical} (translated filename?)`);
    continue;
  }
  const es = await read(esPath);
  pairs.set(logical, {
    logical, esPath, en, es,
    enH: headingSlugs(en),
    esH: headingSlugs(es),
  });
}

// --- Pass 2: validate, write nothing ---------------------------------------
for (const p of pairs.values()) {
  const first = p.es.split('\n').find((l) => l.trim() !== '') ?? '';
  if (!/^#\s+\S/.test(first)) {
    // Without an H1 the generator falls back to title-casing the filename, which
    // silently puts an English, wrongly-capitalized title in the Spanish sidebar.
    problems.push(`${p.logical}: first line is not an "# H1" (got: ${JSON.stringify(first.slice(0, 60))})`);
  }
  if (NOT_A_TRANSLATION.has(p.logical)) continue;
  if (p.enH.length !== p.esH.length) {
    problems.push(
      `${p.logical}: heading count differs -- en=${p.enH.length} es=${p.esH.length}. ` +
      `The Nth-heading mapping is void; the translation must mirror the English structure exactly.`
    );
  }
}

if (REPORT_ONLY) {
  console.log(`${pairs.size} translated document(s):\n`);
  for (const p of [...pairs.values()].sort((a, b) => a.logical.localeCompare(b.logical))) {
    const ok = p.enH.length === p.esH.length;
    const mark = NOT_A_TRANSLATION.has(p.logical) ? 'n/a ' : ok ? 'ok  ' : 'DIFF';
    console.log(`  ${mark}  ${String(p.enH.length).padStart(3)}/${String(p.esH.length).padEnd(3)}  ${p.logical}`);
  }
  if (problems.length) console.log(`\n${problems.length} problem(s):\n  ${problems.join('\n  ')}`);
  process.exit(0);
}

if (problems.length) {
  console.error(`Refusing to rewrite anything. ${problems.length} problem(s):\n`);
  for (const m of problems) console.error(`  ! ${m}`);
  process.exit(1);
}

// --- Passes 3 & 4: resolve targets, repoint anchors -------------------------
const maps = new Map();     // logical -> { en: Map(enSlug -> esSlug), es: Set(esSlug) }
for (const p of pairs.values()) {
  if (NOT_A_TRANSLATION.has(p.logical)) continue;
  maps.set(p.logical, {
    en: new Map(p.enH.map((h, i) => [h.id, p.esH[i].id])),
    es: new Set(p.esH.map((h) => h.id)),
  });
}

const LINK_RE = /\]\(([^)\s#]+\.md)#([^)\s]+)\)/g;
let fixed = 0, already = 0, missed = 0, external = 0;

for (const p of pairs.values()) {
  const dir = path.posix.dirname(p.logical);
  let fenced = false;
  const out = p.es.split('\n').map((line) => {
    if (/^\s*```/.test(line)) { fenced = !fenced; return line; }
    if (fenced) return line;
    return line.replace(LINK_RE, (full, target, anchor) => {
      // Resolve against the containing file's directory. This is what makes the
      // untranslated trees fall out automatically instead of needing allow-lists:
      // design/ux/00-overview.md + 04-wireframes/README.md resolves to a file
      // that has no translation, so its English anchor is left alone and the
      // build validates it through the English fallback chain.
      const logical = path.posix.normalize(path.posix.join(dir, target));
      if (logical.startsWith('..')) { external++; return full; }
      const m = maps.get(logical);
      if (!m) return full;                       // untranslated target -> EN fallback

      let raw = anchor;
      try { raw = decodeURIComponent(anchor); } catch { /* keep */ }

      // English first, always. A slug can be valid in BOTH languages (`Color`,
      // `Grid`, `Dashboards`, ADR-016's `#N:` headings), and preferring the
      // Spanish reading there would silently point at a real-but-wrong heading
      // -- the one failure `npm run build` cannot catch. Checking English first
      // is also inherently idempotent: an untranslated heading maps to itself.
      if (m.en.has(raw)) {
        const to = m.en.get(raw);
        if (to === raw) { already++; return full; }
        fixed++;
        return `](${target}#${to})`;
      }
      if (m.es.has(raw)) { already++; return full; }
      console.error(`  ! no mapping: ${p.logical} -> ${target}#${raw}`);
      missed++;
      return full;
    });
  }).join('\n');

  if (out !== p.es) await fs.writeFile(p.esPath, out, 'utf8');
}

console.log(
  `\n${pairs.size} translated document(s). ` +
  `Repointed ${fixed} anchor(s); ${already} already correct; ` +
  `${external} outside the tree; ${missed} unmapped.`
);
if (missed > 0) {
  console.error('An unmapped anchor is a broken link. Fix the citation or the heading.');
  process.exit(1);
}
