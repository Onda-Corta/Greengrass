# Diary Entry 10: The Spanish Edition

**Date:** 2026-09-06

---

## The Task

Two things this time, and they turned out to be tangled together.

First: the documentation is in English only. That's an odd thing to say about a platform whose alpha market is Puerto Rico and whose whole design premise is multilingual populations in the Global South. The spec describes a system built for people organizing in Spanish, and those people can't read the spec. So: a Spanish edition of the 14 spec documents, and an EN/ES switch in the site header.

Second: a voice pass over the whole corpus. The writing had accumulated across many sessions, and in places it had drifted into vendor register — "revolutionize political campaigning by streamlining operations and enhancing community engagement." That sentence was sitting in the executive summary of `spec/product.md`, which is the first thing anyone reads. It sounds like a deck. The project deserves to sound like people who know what they're doing.

## The Thing That Had to Happen First

Before I could touch a single word, there was a problem.

Six documents carried about a hundred cross-references written as line numbers — `spec/users.md:87`, `workflows.md:36-39`, `compliance.md:375-380`. They pointed into nearly every spec file, plus the architecture document, two wireframes, and three ADRs.

A voice pass edits those target files. Every added or removed line silently invalidates a citation. Nothing breaks loudly; the reference just quietly starts pointing at the wrong paragraph, and it keeps doing that forever because nobody re-checks a line number.

The obvious fix is to be careful — edit around them, preserve line counts. That's not a fix, it's a promise, and it only has to fail once. The real fix is to make the references survive editing at all. So the first move was converting all 108 citations to heading anchors: `[users.md § Contact Record](users.md#contact-record)`. They now survive edits, they're clickable on the site, and — the part that matters — the build validates every one of them and fails loudly when one goes stale.

That last property paid for itself within the hour. More on that in a moment.

## The Bug Under the Floorboards

To build the Spanish site I had to look closely at the function that turns a heading into a URL anchor. It was doing this:

```js
.replace(/[^\w\s-]/g, '')
```

In JavaScript, `\w` without the `u` flag means exactly `[A-Za-z0-9_]`. So every accented character isn't transliterated — it's **deleted**. `Diseño y localización` became `diseo-y-localizacin`. `¿Qué es GreenGrass?` became `qu-es-greengrass`.

Nothing crashed. Heading IDs and the on-page outline both came from the same function, so they agreed with each other and the page worked. It was just quietly producing mangled, unshareable URLs, and it would have done that for every Spanish heading on the site. The comment above the function claimed to be GitHub-compatible, which had been false for accented headings the whole time.

The fix is one character class: keep Unicode letters and numbers instead of ASCII word characters. The blast radius on the existing English corpus was exactly one heading — `PIP — Partido Independentista Puertorriqueño`, which had been silently losing its ñ.

And then the build shouted at me. Two anchors in ADR-017 pointed at the old accent-stripped slug and no longer resolved. That's the payoff from the citation work, arriving immediately: a change to the slug algorithm reached across the corpus and broke two references, and instead of finding out months later, I found out in seconds. Loud beats silent.

## What the Voice Pass Actually Found

I expected to rewrite a lot. I rewrote very little — about 45 edits across 85 documents.

The corpus was in better shape than I thought. Most files needed nothing, and the honest answer for a wireframe document full of screen tables and ASCII mockups is usually "no changes." The register problem was concentrated exactly where you'd expect: the outward-facing marketing surface. `spec/product.md`'s executive summary was the worst offender by a distance, and a handful of ADRs had drifted into consultant-speak — "force multiplier," "maximize donation value," "optimize for meaningful engagement."

The rule I worked to was principles, not persona. Strip the corporate register, name the actor instead of hiding behind the passive, anchor abstractions in something concrete, keep the human stakes visible. But don't inject a first-person essay voice into a specification — a screen inventory should not sound like a LinkedIn post. Headings stayed frozen, because 108 anchors now depend on them.

One useful side effect: a pass over `url-structure.md` surfaced a sentence claiming the app has four SvelteKit layout groups, directly above a table listing six. Two other documents say six. That's not a voice problem, it's just wrong, and it had been wrong for months.

## Six Translators, One Glossary

The translation was the part with the real coordination risk, and it isn't the prose — it's the vocabulary.

Fourteen documents translated in parallel means fourteen chances to independently invent a word for *tenant*, and *inquilino* is a calque from renting an apartment that tells a reader nothing. So the glossary came first, before any translation: one file, binding, settling the terms that appear everywhere. *Tenant* → **organización**. *Voter file* → **padrón electoral**. *Canvassing* → **trabajo de campo**, never *canvasear*. Latin American vocabulary throughout — *computadora*, not *ordenador*; *celular*, not *móvil*; *vosotros* never.

It wasn't enough, and it was never going to be. Translators hit terms the glossary didn't anticipate and had to coin them, and coining in parallel produces conflicts. *War room* came out as both *centro de mando* and *sala de operaciones*. *Decision gate* as both *punto de decisión* and *punto de control*. The Deputy role as both *Adjunto* and *Suplente* — and those aren't stylistic variants, they mean different things: a permanent second-in-command versus an occasional stand-in. Role names came back in Title Case in some files and sentence case in others, and sentence case is the correct Spanish.

So there's a reconciliation step, and it isn't optional. I picked a winner for each conflict, normalized every file, and then wrote all of it back into the glossary — including the coined terms that didn't conflict — so the contract is stronger for whoever translates the next document than it was for the people who translated this one.

The other thing worth recording: one document quotes another verbatim in a blockquote. Two different people translated the quote and its source, so the "verbatim" quote didn't match the thing it was quoting. Now it does, and the rule is in the glossary.

Also: the translations aren't translations of the English *sentences*. The instruction was to read the paragraph, understand the claim, and write it in Spanish. Word-for-word rendering of English technical prose produces stiff, calque-ridden Spanish that nobody wants to read. The bluntness had to survive the crossing — "Real-time or useless" is *En tiempo real o no sirve*, not some softened *debe ser oportuno*.

## The Switch

One design decision worth writing down, because I nearly got it wrong.

Only the specs are translated — 15 Spanish pages against 85 English ones. So on most pages there is no Spanish counterpart, and the obvious move is to hide the switch there. Show it where it works, hide it where it doesn't.

That's the wrong call. A control that appears and disappears as you move between `spec/` and `design/` is a control nobody ever learns exists. Someone reading a wireframe document has no way to discover there's a Spanish edition at all. Disabling it is no better — a dead button answers "is there Spanish?" with silence.

So the switch is always there. On an untranslated page it's dimmed, its tooltip says so plainly, and it takes you to the Spanish home page — which opens by telling you exactly what is and isn't translated. It always answers the question, and it always goes somewhere real.

Small detail I got backwards on the first pass and had to fix: the tooltip on the English page should be in *Spanish*. The person who needs "Ver esta página en español" is, by definition, the person who reads Spanish.

## What the Crawl Caught

Entry 9 ended with the build catching 33 broken links. This time I went further and crawled the generated site itself — every page, every link, every fragment: 8,093 internal links and 300 asset references.

All of them resolved except two, which pointed at `#door-card--canvassing` with a doubled hyphen against a heading that slugifies to a single one. Broken since long before this session. The build hadn't caught it because it only validated links *between* documents and skipped same-page anchors entirely — on the reasonable-sounding theory that there's nothing to rewrite in a bare `#fragment`. But there's still something to *check*. A hand-written in-page link is exactly as easy to get wrong as a cross-document one.

So the build checks those now too. Same lesson as last time, and I suspect I'll keep relearning it: the value isn't in the generator, it's in the assertions the generator can make on every build. A build step doesn't get bored.

## Current State

| Artifact | Count | Status |
|----------|-------|--------|
| Spec documents (EN) | 14 | Published |
| Spec documents (ES) | 14 + home | Published |
| UX documents | 37 | Published |
| ADRs | 17 + UX decisions | Published |
| Architecture | 1 | Published |
| Diary entries | 10 | Current |
| Rendered site pages | 100 | Building cleanly |
| Internal links verified | 8,093 | All resolving |

The Markdown is still the source. The site is still the front door. There are just two doors now.

## Next

Implementation, same as entries 8 and 9 said. But the pilot is in Puerto Rico, and the conversations that matter there happen in Spanish. Handing someone a URL was the improvement last time. Handing them a URL they can read in their own language is this one.

The obvious open question is Portuguese, for Brazil. The generator is ready for it — adding a language is one entry in a table and a directory of files. The glossary is the hard part, and now there's a template for how to build one.
