// One-shot maintenance pass: repoint Spanish spec cross-references at Spanish anchors.
//
// Translators copy each citation's URL verbatim from the English source, so a link
// in i18n/es/spec/support.md still reads (workflows.md#1-tenant-onboarding) while the
// Spanish workflows.md heading is "1. Incorporación de organizaciones". Headings are
// translated in place, so the Nth heading of the English file corresponds to the Nth
// heading of the Spanish one; that positional correspondence is what we map through.
//
// Anything that does not map cleanly is reported and left alone -- `npm run build`
// validates every anchor afterwards, so a miss is loud, not silent.
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const EN_DIR = path.join(ROOT, 'spec');
const ES_DIR = path.join(ROOT, 'i18n/es/spec');

// Must stay identical to slugify() in build.mjs.
const slugify = (s) => String(s).trim().toLowerCase()
  .replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/\s+/g, '-');

// Headings outside fenced code blocks, in document order, with build.mjs's
// duplicate-slug suffixing (foo, foo-1, foo-2...) applied.
function headings(src) {
  const out = [];
  const seen = new Map();
  let fenced = false;
  for (const line of src.split('\n')) {
    if (/^\s*```/.test(line)) { fenced = !fenced; continue; }
    if (fenced) continue;
    const m = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (!m) continue;
    const text = m[2].replace(/[`*_]/g, '').trim();
    const base = slugify(text);
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    out.push({ text, slug: n === 0 ? base : `${base}-${n}` });
  }
  return out;
}

const read = (f) => fs.readFile(f, 'utf8');

const esFiles = (await fs.readdir(ES_DIR)).filter((f) => f.endsWith('.md'));
const maps = new Map();   // basename -> Map(enSlug -> {slug, text})

const esSlugs = new Map();   // basename -> Set(spanish slugs), for idempotency

for (const f of esFiles) {
  const en = headings(await read(path.join(EN_DIR, f)));
  const es = headings(await read(path.join(ES_DIR, f)));
  esSlugs.set(f, new Set(es.map((h) => h.slug)));
  if (en.length !== es.length) {
    console.warn(`  ! heading count differs for ${f}: en=${en.length} es=${es.length} -- skipping map`);
    continue;
  }
  maps.set(f, new Map(en.map((h, i) => [h.slug, es[i]])));
}

let fixed = 0, missed = 0, already = 0;
for (const f of esFiles) {
  const p = path.join(ES_DIR, f);
  const before = await read(p);
  // Only rewrite links whose target is another translated spec file.
  const after = before.replace(/\]\(([A-Za-z0-9._-]+\.md)#([^)]+)\)/g, (full, target, anchor) => {
    const map = maps.get(target);
    if (!map) return full;                       // target not translated -> leave (EN fallback)
    let raw = anchor;
    try { raw = decodeURIComponent(anchor); } catch { /* keep */ }
    // Already pointing at a Spanish heading -> this file has been processed.
    if (esSlugs.get(target)?.has(raw)) { already++; return full; }
    const hit = map.get(raw);
    if (!hit) {
      console.warn(`  ! no mapping: ${f} -> ${target}#${raw}`);
      missed++;
      return full;
    }
    fixed++;
    return `](${target}#${hit.slug})`;
  });
  if (after !== before) await fs.writeFile(p, after, 'utf8');
}

console.log(`\nRepointed ${fixed} anchor(s) to Spanish headings; ${already} already correct; ${missed} unmapped.`);
