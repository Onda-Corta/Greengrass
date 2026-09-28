# Diary Entry 14: The Proposal Under Review

**Date:** 2026-09-28

---

## The Task

Entry 12 opened a gate and said the review came before implementation. Entry 13 was the first decision taken with the gate open, and it ended with four more pieces of work planned against the same board. This entry is about those four, and about what ADR-018 has on its desk now that they're done.

The ground rule for all of it came from the gate itself. Platform and service structure could be accepted. Anything agent-shaped went into ADR-018 as a proposal, and nowhere else.

## Mutual Suppression Becomes a Service

The pilot has exactly one operational feature: before a party sends, it asks whether any other member has contacted these people in the last N days, and gets a yes or no back. ADR-019 had already said this check was the first entry in the service catalogue. Putting it in the send path, as a third layer after frequency caps and the quiet window, meant answering questions the pilot plan never had to.

Three answers are now written down.
- **The "shared ledger" is not a pool.** A central service keeps nothing between calls, so the ledger is each member's own contact history, asked per call.
- **Matching needs a second index.** `mvp.md` says suppression is "what the blind-index architecture gives you for free". It doesn't, quite. The blind index is keyed per tenant, so by design it can't match across tenants. Suppression needs a second index keyed per alliance contract, held by the members and never by GreenGrass.
- **An unanswered member is not a veto.** If one party's instance is down, the other's send goes ahead, and the record notes who didn't answer.

None of that changes the pilot. It makes the pilot and the platform one design.

## The Four Services

ADR-020 named what sits in the middle of the board: Capture, Analysis, Builders and channel transport. Three of them already existed under other names.
- Capture is the media monitoring ADR-015 parked in March with a note to come back to it.
- Analysis is the dossier work the comms intelligence roadmap had already sequenced and gated.
- Channel transport is the communication infrastructure the architecture already specified.

Builders was the new one, and the one with a decision in it. Text drafting from a brief a person supplies has the same shape as the activism generator ADR-013 accepted in March: a draft comes out and a person approves it. It has none of ADR-018's four gating properties, so it was accepted. Images and video were not. A synthetic video of an identifiable person is the worst thing a generation feature can produce in an electoral product, and that question belongs to the review.

One small thing from that work is worth keeping. The plan called the held features "candidates". In a product about elections that word already means someone, in both languages. They're "proposed" now, and the glossary says why.

## Creators Are Contacts

A set of wireframes for a creator-management tool arrived with the board: a roster in tiers, a WhatsApp inbox, multi-round review, dispatch with per-creator tracking, and a leaderboard. The data was commercial, "Shop now" and product launches.

The decision that shaped ADR-021 was one sentence from the product side: creators should be treated exactly the same as press and influencers. That settled both open questions at once. A creator is a Contact record with creator fields, the way a journalist is. There is no new record type. Any tenant can run a program, and a creator relationship crosses tenants only under a sharing contract.

The redraw turned 21 prototype screens into 12.
- The four mobile variants folded into their desktop screens.
- Two screens already existed in Settings and the navigation shell.
- The three AI screens weren't drawn at all.

Two parts of the prototype ran into decisions the corpus had already made. The leaderboard met ADR-015's refusal of gamification, and it became staff-only engagement that is never ranked. The open WhatsApp chat met the Business API's 24-hour conversation window, and the inbox now shows the window and switches to templates when it closes.

## What ADR-018 Has Now

ADR-018 stays `Proposed`. It gained a section called "The proposal under review", and every sentence in that section says it's a proposal.

The board draws one agent harness per tenant. Four sources feed it: strategy, knowledge base, geo data and the CRM. It feeds people. Every arrow into a dispatch service starts at a person, never at the harness. That drawing, plus the three new ADRs, gives the review proposed answers to three of its eight items and one of its four gating properties.
- **Cost:** ADR-019's pass-through.
- **Credential breadth:** entitlements.
- **The human gate:** its first enumerated form, *no agent dispatches*.
- **Compartmented data:** an agent reads only under the contract of the person who invoked it, and never in the background.

It also makes the hardest question plain. The harness reads four sources, and that is exactly the wide read scope the gate exists for. The creator program's AI flow reads one inbound item and one designated document. One is the ceiling, the other is the floor, and the review has to say where in between an agent may stand. That flow is now written into ADR-018 as the review's worked example. The part of it that most needs deciding is the part that sounds most harmless: badging every inbound item with a fit score on arrival, before anyone opens it. Nobody asks for that read, and nobody approves the badge it writes.

## What the Rules Held

Nothing was quietly fixed. The blind-index claim in `mvp.md` was named where the new index is specified. The leaderboard conflict is listed in ADR-021 as a conflict. Every amended ADR got a banner: ADR-015 once, ADR-016 three times. Every English change shipped with its Spanish mirror, and every new term went into the glossary before it was used. That makes four more glossary sections, on top of the one entry 13 added the same morning.

## Where It Stands

| Artifact | Count | Status |
|---|---|---|
| Spec documents | 14 | Press, integrations, users, MVP, workflows and comms intelligence amended |
| UX documents | 38 | Content operations wireframes added |
| Screens | 248 | 12 added |
| ADRs | 21 | 20 accepted, 1 proposed |
| Diary entries | 14 | Current |
| ADR-018 items with a proposed answer | 3 of 8 | Cost, human gate, compartments; plus credential breadth, a gating property |
| Production gate | 1 | Open |

## Next

The review. What it has to produce:
- the threat model extension;
- the automated-decision-making section;
- the audit model's non-human actor;
- the offline answer;
- the BYOM settings screen;
- a decision on read scope;
- a decision on the fit badge.

The board made the review shorter. It did not make it optional.
