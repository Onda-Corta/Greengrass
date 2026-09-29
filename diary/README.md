# Project Diary

This directory contains a chronological diary of building GreenGrass — written as the project progresses, intended to be turned into a series of blog posts.

The diary captures the process, decisions, surprises, and lessons learned from designing a complex platform for grassroots political elections in the global south, built almost entirely through conversation with Claude Code.

## Entries

1. **[From Description to Specification](01-from-description-to-specification.md)** — Starting with a product description and turning it into 12 interconnected spec documents. How conversational AI handles ambiguity, forces decisions, and surfaces gaps.

2. **[The Architecture Session](02-the-architecture-session.md)** — System architecture as a conversation. From product constraints to technology choices in a single session.

3. **[Information Architecture](03-information-architecture.md)** — Designing the UX skeleton for 10 personas, 236 screens, and a platform that works offline on low-end phones.

4. **[The Design System and Wireframes](04-design-system-and-wireframes.md)** — Building a visual language before having a brand. System fonts over custom fonts, 8px grids, theming as a cascade, and why ASCII wireframes work better than expected.

5. **[The Wireframe Audit](05-the-wireframe-audit.md)** — Auditing 21 wireframe documents for consistency, normalizing 9 early-batch docs to a standard structure, filling 15 missing wireframes, and making implicit conventions explicit.

6. **[Resolving the Open Questions](06-resolving-the-open-questions.md)** — Systematically resolving all 89 open questions from the wireframe audit. Cross-cutting policies first (data retention, channel orchestration), then category by category. BYOM emerges from an AI question, v2 tentpoles identified.

7. **[Reconciling the Architecture](07-reconciling-the-architecture.md)** — Updating the system architecture document to reflect ADR-016 decisions. 22 changes: 2 new sections (Data Retention, Election Day), 1 rewrite (AI Integration for BYOM), 19 augmentations. The BYOK + BYOM tension documented.

8. **[Housekeeping](08-housekeeping.md)** — Documentation audit and consistency fixes. Stale READMEs, scrambled numbering in the UX overview, missing diary entries. Creating a memory file for session persistence. The project is now ready for implementation.

9. **[The Documentation Website](09-the-documentation-website.md)** — Turning ~80 Markdown files into a browsable website with a sidebar table of contents. A custom static generator over a docs framework, styled with GreenGrass's own design tokens. How the build became an audit and caught 33 broken links, and why the Markdown stays canonical while the site is just the front door.

10. **[The Spanish Edition](10-the-spanish-edition.md)** — Translating the 14 specs into Spanish and adding an EN/ES switch, plus a voice pass over the whole corpus. Why 108 line-number citations had to become heading anchors before a single word could be edited, a slugify bug that had been silently deleting every accent, and what happens when six translators coin vocabulary in parallel.

11. **[Translating the Rest](11-translating-the-rest.md)** — Extending the Spanish edition to the architecture, all 18 decision records and the non-wireframe UX documents: 34 more documents, 80,000 words. A heading parser that had been silently disagreeing with the site generator, a build that validated every anchor and then exited 0 anyway, and what happens when you move terminology reconciliation to *before* the translation instead of after.

12. **[The Agent Question](12-the-agent-question.md)** — The spec decided AI five times, feature by feature, and never asked what happens if agents run through the whole product. The threat model contains zero AI mentions, compliance contains one, the audit trail has no non-human actor, and flat pricing meets per-token cost. ADR-018 opens as the project's first `Proposed` decision: a gate on production until the review lands.

13. **[Services à la Carte](13-services-a-la-carte.md)** — A Whimsical board asks for shared services that tenants plug into ad hoc and pay for as used, and the spec has neither a home for them nor a price. ADR-019 gives shared capabilities an architectural home as central services executed per tenant, adds a second billing plane that passes third-party costs through at cost with no margin, lets an alliance pay for its members as an onboarding setting, and defers the free-tier allowance. Two amendment banners, one of which finds that the decision it was meant to mark superseded never existed.

14. **[The Proposal Under Review](14-the-proposal-under-review.md)** — The four pieces of work planned against the board in entry 13. Mutual suppression becomes the first central service, and it turns out the blind index was never going to match across tenants on its own. ADR-020 names the four services and accepts text builders but not images or video. ADR-021 treats creators exactly like press contacts and redraws a 21-screen prototype as 12. ADR-018 stays `Proposed` and gains the board as the proposal under review: proposed answers for three of its eight items and one gating property, the read-scope question made plain, and a worked example whose most dangerous part is a badge.

15. **[Not a Creator Tool](15-not-a-creator-tool.md)** — The first diagram of the post-approval flow drew outside creators being briefed and approved tier by tier, and the answer was that GreenGrass is not trying to manage content creators. ADR-021 is narrowed and renamed to the Content Approval Pipeline: review in rounds, each round kept, every revision request commented. The creator program is withdrawn on the record, eight screens go, and a candidate approving the day's posts over WhatsApp becomes ADR-018's worked example, running into the gate at every turn.

16. **[The Pitch](16-the-pitch.md)** — The smallest thing that gets GreenGrass off the ground: a working demonstration of the WhatsApp approval flow, with real candidates holding the phone. Why it sits on the prototyping side of ADR-018's gate, why the artwork is templated rather than generated, and how one candidate became four through a folder per candidacy. `spec/pitch.md` is the first document written in Spanish first, and *pitch* could not be *propuesta*.
