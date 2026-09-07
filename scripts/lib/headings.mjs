// The single source of truth for heading ids.
//
// Two things need to know what a heading's anchor will be: the site generator,
// which renders the page, and the Spanish anchor pass, which rewrites links to
// point at it. When each computed that separately, they disagreed -- a regex
// scanner counts the four `###` lines inside the `DECISION NEEDED` HTML comment
// in design/architecture/system.md as headings, and markdown-it does not. So
// both go through this module, and the only way to learn a heading id is to
// render the document the way the site renders it.

import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';

// GitHub-compatible slugify (matches anchors authored in the source).
export function slugify(str) {
  return String(str)
    .trim()
    .toLowerCase()
    // Keep Unicode letters/numbers so accented headings survive (a plain \w is
    // ASCII-only and would delete a/e/i/o/u accents and n-tilde outright).
    // '_' must be listed explicitly since \w had included it.
    .replace(/[^\p{L}\p{N}\s_-]/gu, '')  // drop punctuation, keep letters / space / hyphen
    .replace(/\s+/g, '-');      // spaces -> hyphens
}

// The renderer the site is built with. `permalink` is on by default because the
// published pages want the clickable '#'; the anchor pass passes false so its
// scraped heading text is not polluted by the permalink glyph.
export function createMarkdown({ permalink = true } = {}) {
  const md = new MarkdownIt({ html: true, linkify: true, typographer: false });
  return md.use(anchor, {
    slugify,
    ...(permalink
      ? {
          permalink: anchor.permalink.linkInsideHeader({
            symbol: '#',
            placement: 'before',
            class: 'heading-anchor',
            ariaHidden: true,
          }),
        }
      : {}),
  });
}

// Heading ids, levels and plain text, in document order, scraped from rendered
// HTML. Duplicate-slug suffixing (foo, foo-1, foo-2...) is markdown-it-anchor's,
// so it is correct by construction rather than by reimplementation.
export function scrapeHeadings(html) {
  const out = [];
  const re = /<h([1-6])[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    out.push({
      level: parseInt(m[1], 10),
      id: m[2],
      text: m[3].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(),
    });
  }
  return out;
}

const plain = createMarkdown({ permalink: false });

// Convenience for callers that have source, not HTML.
export function headingSlugs(src) {
  return scrapeHeadings(plain.render(String(src), {}));
}
