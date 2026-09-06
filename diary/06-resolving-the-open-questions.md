# Entry 6: Resolving the Open Questions

*March 2026*

## 89 questions nobody wanted to answer

The wireframe audit left behind 89 open questions. They'd been accumulating since the first wireframe document — little "we'll figure this out later" notes at the bottom of each doc. Individually, each one seemed minor. Collectively, they represented a layer of ambiguity sitting between the wireframes and implementation.

The temptation was to punt them all to "implementation time." That's what usually happens. The designer says "TBD," the developer makes a guess, and six months later someone discovers that the guess was wrong but it's now baked into the codebase.

## Contradictions first

The most useful thing in the audit wasn't the questions themselves — it was the discovery that some of them contradicted each other. Two formal contradictions and three overlap clusters where the same question had been asked independently in different feature areas.

The contradictions were instructive. One asked whether settings could be delegated to non-admin roles, while an existing design decision said all settings are OA-only. The question and the decision couldn't both be right. The other had frequency caps decided per-channel while a separate question asked about cross-channel orchestration — solving them independently would have produced conflicting systems.

The overlap clusters were worse in a way. Three separate documents had independently asked about data retention — how long do we keep messages, how long do we keep GOTV data, can imports be rolled back? Each was framed as a feature-specific question, but the real answer was a platform-level policy that none of them could see from their local context.

Resolving these first established the policies that everything else would build on. A tiered retention model. A two-layer orchestration system. Ticket revenue flowing through the fundraising pipeline instead of inventing a second payment system. These weren't UX decisions — they were architectural ones wearing UX clothing.

## The data retention distinction

One resolution forced a clarification that turned out to matter more than expected. The tiered retention policy included an "audit trail" tier with indefinite retention. The obvious question: doesn't the audit trail contain everything the other tiers have?

No — and the distinction is critical. The audit trail stores *metadata about actions* (who did what, when, to what entity), not *the content of those actions*. When a message is purged after the retention window, the audit trail still says "Staff A sent an SMS to Contact B on March 4th." But the message body is gone. The audit trail is a skeleton — it proves things happened without retaining their payload.

This matters for privacy (supporters can have their content deleted while the action record persists), for storage (indefinite metadata retention is feasible; indefinite message body retention is not), and for legal exposure (what you can hand over if compelled is limited to metadata).

## Category by category

After the cross-cutting resolutions, the remaining questions fell into natural categories. Navigation and layout was straightforward — sidebar persistence, notification badge caps, dashboard refresh intervals. The kind of questions where there's usually one obvious answer and the real value is just writing it down so nobody has to re-derive it.

Field operations was more interesting. Walk list sorting (route-optimized vs. priority-scored) had already been answered in the wireframes but never formally recorded. Script versioning in the field — what happens when a script updates while 20 volunteers are mid-canvass — required thinking about the boundary between "admin makes a change" and "field volunteer experiences the change." The answer: version-lock active shifts, but give the Field Director an urgent-update override that appears on the next door card, never mid-interaction.

The dashboard freshness indicator emerged from a simple question about refresh intervals. The answer isn't just "30 seconds for operational, 5 minutes for campaign" — it's that the dashboard must always communicate the state of its data. Current, refreshing, stale, disconnected. On an operational dashboard during election day, this is high-visibility ambient information. A Field Director making reallocation decisions must never mistake stale data for current data.

## The pattern

What's emerging from this work is that most open questions aren't actually hard. They're undecided. The difficulty isn't figuring out the right answer — it's creating the forcing function to write it down. An open question sitting at the bottom of a wireframe document will stay open forever unless someone walks through the list and says "this one, now, here's the answer."

The few genuinely hard questions tend to be the ones that span multiple feature areas. Those are the ones worth spending time on. The rest just need someone to make a reasonable call and record it.

## The full sweep

After the cross-cutting resolutions and the first two categories, the remaining questions fell fast. Press and media, GOTV, settings, authentication, profile, help, public pages, onboarding, supporter portal, alliance, CRM — each category took less time than the last, because earlier resolutions established patterns that later ones could reference. Dashboard refresh? Already answered in Navigation & Layout. Data retention? Already answered in the cross-cutting policy. Fundraising dashboard freshness? Same answer.

A few resolutions surfaced decisions bigger than the questions that prompted them:

- **BYOM (Bring Your Own Model)** emerged from a question about AI model selection for activism campaigns. The original question assumed the platform would choose a model. But organizations increasingly have their own AI environments — enterprise agreements, compliance constraints, models trained on their tone and context. The platform should plug into existing infrastructure, not replace it. This connects to the existing BYOK pattern for encryption: orgs that care about controlling their infrastructure can do so; orgs that don't get sensible defaults.

- **Results entry security** for election day poll watchers required thinking in layers — identity, geolocation, photo evidence, cross-checking, audit trail — where no single layer is blocking but all layers compound. A fraudulent entry would need a registered watcher, at the right location, with a convincing photo, that matches other watchers' submissions.

- **Alliance data ownership** when joint campaigns end turned out to have a clean answer: the lead org retains the joint record; each member keeps data their own people generated. No member loses access to their own work. Simple, but it needed to be written down.

Three features were explicitly flagged as v2 tentpole capabilities rather than just "deferred": the Visual Flow Builder (transforming communications from message sending to journey orchestration), the Shared Content Library (centralized asset management across all features), and Settings Delegation (controlled permission sharing beyond OA-only). Naming them as tentpoles rather than backlog items signals that they should be designed as a whole rather than bolted onto what already exists.

## 89 of 89

All 89 questions resolved. Zero remaining. The wireframe audit's Appendix A is fully closed. Every resolution is recorded in ADR-016 with traceable section references back to the original question numbers.

The spec is now a closed surface — no open questions sitting between the wireframes and implementation. That doesn't mean every answer is perfect, but it means every answer is written down, traceable, and changeable. A wrong answer you can find and fix is better than an absent answer someone has to guess at.
