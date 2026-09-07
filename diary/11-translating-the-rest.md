# Diary Entry 11: Translating the Rest

**Date:** 2026-09-07

---

## The Task

"Now I want to translate everything else."

Everything else was 68 documents and 233,000 words — five times the spec corpus that entry 10 covered. So the first real decision wasn't about translation at all. It was about what "everything" meant.

The 23 wireframe documents are 140,000 words on their own, more than half of everything written for this project. They're also the least useful thing to hand a Spanish-speaking organizer first, because they describe screens that don't exist yet. The architecture, the 17 ADRs and the UX foundations are 80,000 words and they're the documents that explain how the thing works and why it works that way. So: those 34, and the wireframes and the diary stay English for now. Forty-eight documents in Spanish, forty-nine pages counting the home page.

That's a boundary, and the Spanish home page says so plainly instead of pretending the site is complete.

## The Bug Under the Floorboards, Again

Entry 10 found a slugify function eating accents. This time it was worse, because it had been sitting there working.

`fix-es-anchors.mjs` repoints Spanish cross-references by mapping the Nth English heading to the Nth Spanish one. To do that it needs to know a document's headings, and it found them with a regex over lines starting with `#`. The site generator finds them a different way: it renders the Markdown and reads the ids off the HTML.

Those two disagree about `design/architecture/system.md`. The regex counts 76 headings; markdown-it produces 72. The difference is four `###` lines living inside an HTML comment — the `DECISION NEEDED` block where the technology stack was still being argued out. Markdown ignores them. The regex doesn't.

The map was therefore misaligned from index 66 to the end of the file, and had been the whole time. Nothing pointed at that tail, so nothing broke. But sixteen of the documents queued for translation contain HTML comments, and no translator has any reason to preserve four headings inside one. The first person to reflow that block would have silently repointed every citation of the architecture document.

The fix isn't a better regex. It's that there should never have been a second way to compute a heading id. There's now one module, it renders the document the way the site renders it, and both scripts import it. Duplicate-slug suffixing is markdown-it-anchor's problem, not ours, so it's correct by construction rather than by reimplementation.

While I was in there: `npm run build` validated every link and anchor, printed a warning count, and exited 0 regardless. CI builds and deploys unconditionally. A broken anchor shipped to production with a green check. That's two lines to fix and I should have caught it in entry 9.

## Reconciling Before Instead of After

The real finding from entry 10 was that a glossary written in advance is not enough — parallel translators coin conflicting words, and you need a reconciliation pass afterwards. *War room* came back as both *centro de mando* and *sala de operaciones*.

So this time I tried to do the reconciliation first. Three read-only passes over the corpus, one per domain, each proposing terminology for its own documents and flagging what it expected the others to coin too.

They disagreed on eight terms. Before a single sentence was translated.

`universal chrome` came back as both *elementos permanentes de la interfaz* and *elementos universales*. `drawer` as *cajón* and *panel lateral*. `data freshness` as *actualidad de los datos* and *frescura*, which is a property of food. `caché` came back both masculine and feminine. And `AI concierge` came back as *conserje*, which is a doorman, against a rule already in the glossary that *asistente* is taken by `wizard`.

Each of those would have been a two-hour cleanup afterwards, spread across a dozen files. Settled in advance, they were a table.

That's the actual lesson, and it's not the one I expected. Reconciliation isn't a phase that has to come after translation. It's a phase that has to come after *disagreement*. If you can manufacture the disagreement cheaply — three readers instead of one, arguing about words rather than producing prose — you can move the whole thing to the front.

## The Mistake

I decided `persona` should be **arquetipo (de usuario)**, wrote the reasoning into the commit message, and then dropped the row when I assembled the glossary file.

A translator hit the term, went looking for the row I'd told them to read, grepped the whole file, found nothing, and used *perfil* instead — reasonably, because two already-published documents used it. Then they told me.

*Perfil* turns out to be wrong, and demonstrably so: `profile` is already *perfil*, so the screen inventory ended up with a column headed *Perfiles* sitting directly above the row `PROF-001 | Perfil personal`. Seventy occurrences across eight files had to be walked back.

The contract is the file. Not the decision, not the commit message, not what I remember deciding. If it isn't in `i18n/GLOSSARY.md`, it does not exist, and everything downstream is entitled to act as though it doesn't.

## Two Rules Worth Keeping

**Screen names get looked up, not coined.** There are 236 of them, and they appear across the inventory, the URL structure and the pattern catalog. Putting 236 rows in the glossary would have buried the 212 real terms under a phone book. Instead the Spanish screen inventory *is* the artifact: for screen `AREA-NNN`, the Spanish name is whatever its row says, and the glossary carries one rule pointing there. It's in the published tree, it's reviewable on the site, and it can't drift from itself.

**Don't fix the English.** Five documents contradict themselves — touch-target sizes that are 44, 48 and 56 pixels in three different documents; a security tier that mixes two different axes; a list introduced as "four capabilities" that enumerates three; a table of three v2 features whose summary line lists four. Every one of those is tempting to quietly correct in translation, and every correction would create an EN/ES divergence that no structural check can catch. They're translated as written, and marked `REVISIT:` in *both* languages so the note doesn't evaporate when someone fixes the source.

Finding them was a side effect. Translation is the most thorough proofread a document ever gets, because it's the only kind of reading that can't skim.

## Where It Landed

| Metric | Count | Status |
|---|---|---|
| Documents in Spanish | 48 | Published |
| Spanish pages on the site | 49 | Building cleanly |
| Words translated this round | ~80,000 | — |
| Glossary terms | 596 | Binding |
| Still English only | 23 wireframes + the diary | Stated on the Spanish home page |
| Unresolved links and anchors | 0 | Build now fails if not |

The Spanish search index went from 15 documents to 49. That's the change a person actually feels: last round you could search the specs in Spanish, and now you can search almost the whole project.

## Next

The wireframes, eventually — 140,000 words and 236 screens, and the glossary that comes out of this round is a much better starting gun than the one that started this one. Everything three translators coined got written back into it, including the terms that didn't conflict, which is the part that's easy to skip and the part that compounds.

Portuguese is still one table entry and a directory. It was true in entry 10 and it's more true now, because the hard part of a new language isn't the generator — it's having 596 decisions already argued out and written down.
