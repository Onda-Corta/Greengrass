# Diary Entry 12: The Agent Question

**Date:** 2026-09-07

---

## The Task

Entries 8, 9, 10 and 11 all ended the same way: the next step is implementation.

It isn't. Not yet. There's one question the spec never asked, and it has to be answered before a line of production code gets written.

The corpus decided AI five times. It never decided what happens if AI agents run *through* the product.

## What the Spec Decided

Five bounded decisions, each one a feature with a human standing at the exit:

- **ADR-013** — AI drafts a personalized activism message. The supporter reads it, edits it, approves it. The approval is a consent record in the audit trail.
- **ADR-010** — AI drafts translations. Humans sign off. Security prompts, legal text, donation forms and consent language always require human review.
- **ADR-014** — an AI concierge handles first contact for support, escalating to a human for anything high-stakes. BYOK key management was named explicitly: lose the key, lose the data, so a person verifies.
- **ADR-016 §38** — BYOM. The organization brings its own model, its own endpoint, its own credentials.
- **`design/architecture/system.md`, "AI Integration"** — the abstraction layer that implements all of the above, with guardrails written out: stay on topic, no fabricated statistics, no external knowledge in the concierge, because a hallucinated answer about election law has real consequences.

Every one of those is a good decision. Every one of them is also a *box*. Something goes in, a draft comes out, a person approves it.

Agents aren't a box. They're a mode. And the documents that would have to absorb a mode don't mention AI at all.

## What the Spec Never Asked

**The threat model has zero AI in it.** Not one mention across `spec/security.md` or ADR-002. Five tiers of threat actor — state, geopolitical, political opponent, criminal, insider — and no prompt injection, no model exfiltration, no question of what authority a non-human actor holds. Principle 8 reads: "No single credential, key, or person should be able to expose the entire platform." An agent holding a scoped key across feature areas is precisely that, and it isn't a person, so the sentence doesn't even catch it.

**Compliance mentions AI once**, in a sub-processor disclosure bullet. There is no automated-decision-making or profiling section anywhere in `spec/compliance.md` — in a product that assigns 1–5 support scores to individual voters, deployed in jurisdictions governed by GDPR Article 22 and LGPD Article 20. A prompt carrying voter PII to a model endpoint in another country is a cross-border transfer, and the transfer section doesn't know it exists. ADR-009 already refused automated content filtering for lèse-majesté on the grounds that it's unreliable and puts GreenGrass in the business of censoring political speech. An agent reading a Thai tenant's content walks straight into that refusal.

**The audit trail has no non-human actor.** ADR-004 and SET-018 log a user, an IP, a user agent. There's no actor type for an agent, no "acting on behalf of," no model for retaining prompts or responses. ADR-016 §49 promises that staff "can see exactly why a suggestion was made" — an explainability commitment a language model cannot meet as written.

**Offline is the founding promise, and agents break it.** ADR-005 exists because canvassers work in places with no signal. Every agent-mediated feature is online-only by construction; the design system already says so about the concierge. A product whose core value is working without connectivity cannot quietly acquire a layer that requires it.

**The pricing model and the cost model contradict each other.** `spec/fundraising.md` decided flat subscription tiers — "not tied to donation volume, user count, or any usage metric... no surprises." Per-token inference is a usage metric. Nothing in the corpus reconciles those two sentences, and pervasive agents make the gap the size of the business.

**And there's a doctrine here that nobody ever named.** *Machine proposes, human disposes.* It's the answer in ADR-006 for the GOTV universe builder, in `spec/gotv.md` for election-day reallocation, in ADR-010 for translation, in ADR-013 for activism messages, in `spec/users.md` for deduplication — no automatic merging, because misattributing a donation in a political context is too expensive. Five separate documents reached the same conclusion independently and none of them wrote it down as a principle. If agents become pervasive, it has to be promoted to a cross-cutting rule, because right now it survives only as a habit.

## What the Read-Through Turned Up

Four things worth recording, none of which I'm fixing here:

`decisions/013-analytics-ai.md` still says **Status: Accepted** with no supersession banner, even though the architecture document states its model choice was superseded by ADR-016 §38.

`design/ux/04-wireframes/dashboards/dashboards.md` still describes war-room reallocation suggestions as "AI-generated, require human approval." ADR-016 §49 made them rule-based for v1. The wireframe never got the memo.

ADR-016 lists a "BYOM AI provider abstraction layer **and settings screen**" as a required new capability. `settings.md` runs SET-001 through SET-022 and there is no such screen, in the wireframes or in the screen inventory. The architecture decided it and the UX never drew it.

And the strongest argument against pervasive agents is already on the record, twice. ADR-012 chose self-hosted map tiles specifically so that "no third party sees canvassing patterns." `spec/comms-intelligence.md` requires "no superuser read path" for opposition research — Org Admin can grant access and cannot read; Platform Admin cannot read at all. An agent with cross-feature read scope is a superuser read path. The project has already decided how it feels about this. It just hasn't applied the decision to itself.

I'm leaving all four alone deliberately. The rule from entry 11 holds: don't quietly fix the source. Name it where it can be seen, in both languages, and let the fix be a decision somebody makes on purpose.

## The Review

ADR-018 is now open, with status **Proposed** — the first ADR in this project that isn't Accepted. It decides exactly one thing: nothing with agent characteristics reaches production until the review lands. The five accepted features ship as specified. Anything with broader read scope, tool authority, or the ability to act without a person approving the act is gated.

What the review has to settle: extend the threat model; write the automated-decision-making and profiling section; give the audit model a non-human actor; answer the offline story honestly; reconcile per-token cost with flat pricing; promote *machine proposes, human disposes* to a stated principle; decide whether an agent may ever touch compartmented data under ADR-017; and draw the BYOM settings screen that ADR-016 already committed to.

## Where It Stands

| Artifact | Count | Status |
|---|---|---|
| Spec documents | 14 | Unchanged |
| UX documents | 37 | Unchanged |
| ADRs | 18 | 17 accepted, 1 proposed |
| Diary entries | 12 | Current |
| Documents that mention AI | ~20 | Feature-by-feature |
| Threat model documents that mention AI | 0 | The gap |
| Production gate | 1 | Open |

## Next

The review, then implementation. In that order.

The argument for doing it now rather than later is just arithmetic. Right now the corpus is 89 English documents and no code, and the review is a reading exercise. After the pilot, it's a system holding the Puerto Rican electoral roll, donation records, and canvassing notes about identifiable people's politics — and the same review becomes a migration, a re-consent, and a conversation with a regulator.

The project has been good at deciding things before building them. This is one more.
