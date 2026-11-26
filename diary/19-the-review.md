# Diary Entry 19: The Review

**Date:** 2026-11-26

---

## The Task

ADR-018 opened on 2026-09-07 as the project's first `Proposed` decision: a gate on production until somebody answered what changes if AI agents operate throughout the product. It stood for almost three months. In that time it gathered eight items to resolve, a proposal under review (the board's per-tenant agent harness, with a candidate approving the day's posts over WhatsApp as its worked example), twelve questions from the coaches, two from the builders, and a pitch that lived on the prototyping side of it. Every ADR accepted since September carries a sentence somewhere saying *this does not resolve ADR-018*.

Today the review happened, in one session, and the lens was a thesis the corpus had been walking toward without saying out loud: **the Core is a per-tenant agent harness, and every piece of functionality is pluggable into it.** Once that sentence is on the table, most of the eight items stop being open questions and start being consequences. The harness is one per instance, inside the tenant's own enclave, never across tenants. It reads what it is allowed to read, holds only the credentials the tenant has entitlements for, and acts only through operations that module manifests declare. The five AI features the spec decided one by one turn out to be narrow configurations of it, with their bounds unchanged.

## What the Review Decided

**The chat is the harness's primary interface, acting as the person's hands.** That was ADR-023's proposed position; the review adopted it. The chat runs on the invoking person's role, scopes and contracts; reads are free, every write is confirmed by the person's tap at the moment it happens, and the audit log records the person as the actor and the chat as the channel. And *machine proposes, human disposes* is now a stated cross-cutting principle, with its exceptions enumerated: nothing an agent touches reaches a recipient except through a person's send or a schedule a person set. Capability inside that posture needs no further review. Anything beyond it is a new ADR.

**Provider sovereignty has a mechanism.** This was the user's standing requirement — the data sovereignty value — and it had been a principle without plumbing since ADR-016 said BYOM. Now: a model router per tenant is the only path to a model. Every call — chat, coaches, builders, translation, the concierge — goes through the tenant's router, which holds the tenant's provider policy, picks provider and model per call, enforces routing rules by data class, and meters everything. BYOM extends to any endpoint the tenant names, including a self-hosted model, so inference can stay entirely inside the tenant's own infrastructure. The platform default is metered and priced by lane. And the BYOM settings screen ADR-016 committed to exists, at least on paper, with the encryption-boundary warning in plain language.

**Read scope, which the whole review turned on, is answered by source.** Interactive reads are the invoking person's scope, at the moment they ask — so a coach can talk about named members, within the scope of the person talking to it. Strategy documents and the knowledge base come in by deliberate, logged tenant designation. Compartmented data never crosses the encryption boundary, because the platform is never a party to a contract. Scheduled outputs run on schedules a person set. Nothing reaches across tenants.

**The guardrails.** The audit model answers the non-human-actor question with a negative: the harness never acts, people act through it — the log gains a channel and a trigger, and prompt and response bodies are retained under the Operational tier. Provenance means a statement says what it stood on; never a fictional chain of reasoning. In the threat model the harness is an attack surface, not a principal: the confused deputy, prompt injection as a named threat with its vectors enumerated, exfiltration bounded by routing rather than vigilance, and principle 8 intact because the harness was never given anything to concentrate. In compliance: no solely automated significant decisions anywhere, a prompt carrying personal data to an external endpoint is a cross-border transfer with the routing rules as the tenant's transfer decisions, model providers are sub-processors, and the tenant gets a standing document of harness data handling written for a compliance officer and legible to an electoral authority. Offline: no harness step on any field-required path, and degradation is explicit — a coach offline says so, and nothing queues. Cost: inference is a metered usage event and, with chat as the main surface, a line item of ordinary daily work rather than a rounding error. The arithmetic of that stays open in ADR-026, where it lives.

## The Backlog It Cleared

The review also took the recorded questions, which had been collecting for weeks.

The image and video builders are **accepted, outside the gate**, on the same terms as the text builders — they read only what the invoking person supplies, return a draft, and hold no send authority — with two conditions: documented consent for depicting a real, identifiable person, and provenance metadata plus visible disclosure on published generated media. ADR-020's two questions are answered.

All twelve coaching questions are answered. The headline: the bounded coach — never speaks first, never acts, never reads records — has none of the four gated properties and **may ship**. Briefings, recommended actions, acting and record reads are permitted under the posture (a briefing is a schedule a person set; acting is declared operations, each confirmed with a card) and remain unspecified product work, piece by piece. A document under a sharing contract is never coach context. And a coach is the chat with a persona — a named configuration of module set, context and guardrails — not a module. Who may write a coach, and who maintains the organizing knowledge, stay open: they are the product side's questions, and the first is now also a security question, since org-written instructions are trusted by designation.

The worked example — the candidate approving the day's posts over WhatsApp, the flow the pitch demonstrates — **passed the gate as a bounded feature**, all six gate-points resolved in the flow's favor. The demo stays a pitch: no records, no publishing, everything marked, everything deleted the same day. But it did its job. The six points were answered by people who had watched a candidate hold the phone.

## What the Gate Was For

The gate stood for eighty days, and it earned its keep. Because nothing agent-shaped shipped into the spec in that time, the review could decide once, in one place, instead of chasing agent features across eighteen specs and untangling them one by one. The proposal sections all stay as written, as the record of what was evaluated; the answers live in a new section, and ADR-018 is `Accepted`. The corpus has a new spec, `harness.md`, and the sentence the last three entries kept circling is now the first section of it.

## Where It Stands

| Artifact | Count | Status |
|---|---|---|
| Specs | 18 | `harness.md` added; product, support, coaching, demo, comms-intelligence, compliance, security, fundraising cross-referenced |
| ADRs | 28 | 23 accepted, 5 proposed |
| Questions the review answered | 28 | 8 items, 12 coaching questions, 2 builder questions, 6 worked-example points |
| Diary entries | 19 | Current |
| Production gate | 0 | Discharged 2026-11-26; the posture governs what ships instead |

## Next

The owed screens: the provider settings screen and the audit viewer's channel facet, with their screen-inventory entries and wireframes. The pieces the review permits but does not specify — briefings, recommended actions, coaches reading records and acting — each specified on its own before it ships. The product side's two coaching questions. ADR-026's arithmetic, which now prices a line item of daily work. And production, which no longer has a review in front of it.
