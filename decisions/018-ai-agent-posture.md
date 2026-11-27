# ADR-018: AI Agent Posture

**Status:** Accepted
**Date:** 2026-09-07
**Updated:** 2026-09-28 — the proposal under review added; later the same day its worked example was replaced by the WhatsApp approval flow. Status unchanged: nothing in it is accepted. 2026-11-13 — the gate recorded as applying to the whole Core, in both lanes; the chat as the person's hands added to the proposal under review. Status unchanged. 2026-11-25 — questions from ADR-028 (Coaching) recorded. Status unchanged. 2026-11-26 — the review held. This ADR is accepted, its eight items resolved and its proposals settled as [§ The review](#the-review) records. The mechanism the review specifies lives in `spec/harness.md`.
**Sources:** `spec/security.md`, `spec/compliance.md`, `spec/fundraising.md`, `spec/gotv.md`, `spec/comms-intelligence.md`, `design/architecture/system.md`, `decisions/019-central-services-and-metered-billing.md`, `decisions/020-central-service-line-up-and-builders.md`, `decisions/021-content-approval-pipeline.md`, `decisions/022-core-modules-and-lanes.md`, `decisions/023-surfaces-chat-admin-field.md`, `decisions/026-two-lane-pricing.md`, `decisions/028-coaching.md`, `design/ux/04-wireframes/content-ops/content-ops.md`

## Context

GreenGrass has decided AI five times, and each decision drew a bounded feature with a human gate at its exit.

1. [ADR-013](013-analytics-ai.md) generates a personalized activism message; the supporter edits, approves, and the approval becomes a consent record.
2. [ADR-010](010-internationalization-localization.md) drafts translations for human sign-off, with mandatory review for security prompts, legal text and consent language.
3. [ADR-014](014-volunteer-onboarding.md) puts an AI concierge at first contact for support, escalating to a person for anything high-stakes.
4. [ADR-016](016-cross-cutting-resolutions.md) §38 chose BYOM — the organization supplies its own provider, endpoint and credentials.
5. [system.md § AI Integration](../design/architecture/system.md#ai-integration) implements all four behind a provider-agnostic abstraction layer with content guardrails.

Each is sound in isolation. None of them asks the systemic question: what changes if AI agents operate *throughout* the product rather than inside five boxes — reading across features, holding credentials, invoking tools, and acting between human checkpoints.

That question is unasked, and the documents that would have to answer it are silent. [security.md § Threat Actors](../spec/security.md#threat-actors) and [ADR-002](002-security-threat-model.md) contain no reference to AI of any kind. [compliance.md § Data Processing Agreements](../spec/compliance.md#data-processing-agreements) contains the only AI reference in the entire compliance framework, as a sub-processor disclosure obligation.

Meanwhile the doorway is already open. [integrations.md § Integration Principles](../spec/integrations.md#integration-principles) establishes that "tenants bring their own API keys and accounts for external services," and [system.md § The harness and the model router](../design/architecture/system.md#the-harness-and-the-model-router) already concedes that BYOM prompt data "leaves your encryption boundary." The platform has the plumbing for agents without the posture for them.

### Gaps this ADR names

**The threat model does not model a non-human actor.** [security.md § Security Principles](../spec/security.md#security-principles) states that "no single credential, key, or person should be able to expose the entire platform." An agent holding scoped credentials across feature areas is exactly that concentration, and is neither a credential, a key, nor a person. There is no treatment of prompt injection, model exfiltration, or agent authority anywhere in [security.md § Application Security](../spec/security.md#application-security).

**Compliance has no automated-decision-making or profiling section.** The platform assigns 1–5 support scores to identifiable voters ([users.md § The Omni-list and Deduplication](../spec/users.md#the-omni-list-and-deduplication), [security.md § At Rest](../spec/security.md#at-rest)) in jurisdictions governed by GDPR Article 22 and LGPD Article 20. A prompt carrying voter PII to an external endpoint is a transfer under [compliance.md § Cross-Border Data Transfers](../spec/compliance.md#cross-border-data-transfers), and that section does not contemplate it. [ADR-009](009-compliance-legal.md) has already refused automated content filtering for lèse-majesté as unreliable and chilling; an agent with read access to a Thai tenant's content contradicts that refusal.

**The audit model has no non-human actor either.** [ADR-004](004-data-model-integrity.md) logs mutations by user; [settings.md § SET-018: Audit Trail Viewer](../design/ux/04-wireframes/settings/settings.md#set-018-audit-trail-viewer) shows actor, IP and user agent. There is no actor type for an agent, no "acting on behalf of" relation, and no retention model for prompts and responses. [ADR-016](016-cross-cutting-resolutions.md) §49 commits that "staff can see exactly why a suggestion was made" — an explainability guarantee a language model cannot satisfy as written.

**Offline is a founding constraint that agents cannot meet.** [ADR-005](005-offline-first-sync.md) makes offline-first operation the basis of field work. Agent-mediated features require connectivity by construction, as [settings-help-patterns.md § AI Concierge](../design/ux/02-global-patterns/settings-help-patterns.md#ai-concierge) already states.

**The cost model contradicts the pricing model.** [fundraising.md § Platform Revenue Model](../spec/fundraising.md#platform-revenue-model) decided flat subscription tiers, "not tied to donation volume, user count, or any usage metric." Per-token inference is a usage metric. Nothing in the corpus reconciles these.

**An unnamed doctrine is doing load-bearing work.** *Machine proposes, human disposes* is independently reached at [ADR-006 § Automated GOTV universe builder](006-field-operations-gotv.md#automated-gotv-universe-builder), [gotv.md § Dynamic Resource Reallocation](../spec/gotv.md#dynamic-resource-reallocation), [ADR-010 § AI-assisted localization with human review](010-internationalization-localization.md#ai-assisted-localization-with-human-review), [ADR-013 § AI-generated custom messaging for activism](013-analytics-ai.md#ai-generated-custom-messaging-for-activism), and [ADR-004 § Suggest-and-confirm deduplication](004-data-model-integrity.md#suggest-and-confirm-deduplication). It is stated five times and never once as a principle.

**A prior decision already answers the question, in the opposite direction.** [ADR-012](012-external-integrations.md) chose self-hosted map tiles so that no third party sees canvassing patterns. [comms-intelligence.md § 8.5 Access and retention](../spec/comms-intelligence.md#85-access-and-retention) requires that "Org Admin cannot read" and "Platform Admin cannot read at all." An agent with cross-feature read scope is a superuser read path, which that document forbids by design.

### Inconsistencies recorded, not corrected

Three contradictions surfaced while assembling this ADR. Following the practice established for translation, they are named rather than silently fixed, so that correcting them is a decision somebody makes deliberately.

1. [ADR-013](013-analytics-ai.md) is `Status: Accepted` with no supersession banner, although [system.md § AI Integration](../design/architecture/system.md#ai-integration) states its AI model decision was superseded by [ADR-016](016-cross-cutting-resolutions.md) §38. *Resolved by [ADR-019](019-central-services-and-metered-billing.md): a clarifying banner records that ADR-013 never made a model decision and that ADR-016 §38 governs.*
2. [dashboards.md § War Room — Key Differences From Other Dashboards](../design/ux/04-wireframes/dashboards/dashboards.md#war-room-key-differences-from-other-dashboards) describes reallocation suggestions as "AI-generated," after [ADR-016](016-cross-cutting-resolutions.md) §49 made them rule-based for v1.
3. [ADR-016](016-cross-cutting-resolutions.md) lists a BYOM provider abstraction layer *and settings screen* as a required new capability. No such screen exists in [settings.md](../design/ux/04-wireframes/settings/settings.md) (SET-001 through SET-022) or in [screen-inventory.md](../design/ux/01-information-architecture/screen-inventory.md).

## Decision

### No agent capability reaches production until this ADR is accepted

*Discharged 2026-11-26: this ADR is accepted. The gate's purpose is fulfilled. The four properties below remain the test every new capability is checked against — now against the posture in [§ The review](#the-review), declared in each module's manifest.*

The five decisions listed above ship as specified. They are bounded, reviewed, and unaffected by this gate.

Anything beyond them is gated. Specifically, a capability is gated if it has any of:

- **Read scope wider than a single feature** — access to contacts, voter records, messages, donations or audit data outside the boundary of the accepted feature invoking it.
- **Tool authority** — the ability to invoke platform operations rather than return text for a person to act on.
- **Autonomous action** — any state change, send, or external call that no person approved at the moment it happened.
- **Credential breadth** — a key scoped to more than the single integration it serves.

**Alternatives considered:** Allowing agent work to proceed in parallel with the review was rejected because the architecture decisions an agent implies — actor model, credential scope, audit schema — are the expensive ones to reverse, and the pilot's Phase 2 build ([mvp.md § 7. Phases](../spec/mvp.md#7-phases)) sets them. Writing a full agent posture now, before the review, was rejected because the gaps span security, compliance, audit, offline and pricing, and settling them from a single sitting would repeat the feature-by-feature error this ADR exists to correct.

### The review is a precondition on production, not on prototyping

Nothing here restricts experimentation against synthetic data in a development environment. The gate is on production and on any deployment holding real voter, donor or member records. The distinction matters because the pilot is the first place the two converge.

### The gate applies to the whole Core, in both lanes

Added 2026-11-13, and decided in [ADR-023 § The ADR-018 gate binds the whole Core](023-surfaces-chat-admin-field.md#the-adr-018-gate-binds-the-whole-core). The platform is now a Core sold through two lanes, a political product and a commercial one ([ADR-022](022-core-modules-and-lanes.md)). This review applies to the Core, and so to both. Neither product ships a chat surface, or any other gated capability, to production before this ADR is accepted. What can ship before it is what the gate never covered: the admin UI, the field app, and any module with none of the four properties above.

## What this ADR must resolve

Acceptance requires an answer to each of the following, recorded here or in the document named. **Resolved 2026-11-26** — each item's answer is in [§ The eight items, answered](#the-eight-items-answered).

1. **Threat model extension** — a non-human actor in [security.md § Threat Actors](../spec/security.md#threat-actors), covering prompt injection, model exfiltration, and the concentration problem under [security.md § Security Principles](../spec/security.md#security-principles) principle 8.
2. **Automated decision-making and profiling** — a new section in [compliance.md § Cross-Cutting Compliance Requirements](../spec/compliance.md#cross-cutting-compliance-requirements) covering GDPR Article 22, LGPD Article 20, the status of support scores, and prompt data as a cross-border transfer.
3. **Audit model** — a non-human actor type, an "on behalf of" relation, and a retention rule for prompts and responses consistent with [ADR-016](016-cross-cutting-resolutions.md) §4 tiered retention.
4. **Offline posture** — what a field user sees when an agent-mediated capability is unavailable, and whether any such capability may sit on a path [ADR-005](005-offline-first-sync.md) requires to work offline.
5. **Cost** — reconciliation of per-token inference with [fundraising.md § Platform Revenue Model](../spec/fundraising.md#platform-revenue-model), including who pays under BYOM and what happens on the platform default tier.
6. **The human-gate principle** — promotion of *machine proposes, human disposes* to a stated cross-cutting principle, with its exceptions enumerated rather than left implicit.
7. **Compartmented data** — whether an agent may ever read data governed by a sharing contract under [ADR-017](017-sharing-contract-trust-model.md), given that the platform is never a party to a contract.
8. **BYOM settings screen** — the screen [ADR-016](016-cross-cutting-resolutions.md) committed to, added to the wireframes and the screen inventory, including the encryption-boundary warning already specified at [system.md § The harness and the model router](../design/architecture/system.md#the-harness-and-the-model-router).

## The proposal under review

Everything in this section was a proposal for the review to evaluate. *Resolved 2026-11-26 — the review accepted the thesis, bounded as [§ The review](#the-review) records. This section is kept as written, as the record of what was evaluated.*

### What has changed since the review opened

Three accepted decisions have landed since this ADR was opened, each deliberately short of the gate:

- [ADR-019](019-central-services-and-metered-billing.md) added central services, per-tenant entitlements, and metered pass-through billing at cost.
- [ADR-020](020-central-service-line-up-and-builders.md) named the four central services and accepted text builders. A text builder is invoked by a person, reads only what that person hands it, returns a draft, and cannot send, so it has none of the four gating properties above. Image and video builders stay proposed until this ADR is accepted with item 6 answered.
- [ADR-021](021-content-approval-pipeline.md) generalized post approval into a content pipeline reviewed in rounds. Its first version also specified a program for managing content creators, and held that prototype's three AI screens here; both were withdrawn the same day.

### The per-tenant harness, as drawn

The alliance services board recorded in [diary entry 13](../diary/13-services-a-la-carte.md) draws one agent harness per tenant, inside each tenant's enclave:

```
  Strategy ──┐
  Knowledge  │
  base     ──┼──► AGENTS (memory, retrieval, ──► PEOPLE ──► Builders dispatch
  Geo data ──┤     skills, context,             (teams,      (text, image, video)
  CRM ───────┘     model router)                 committees,
                                                 militants,  ──► Outbound dispatch
       Capture ──► (into each tenant)             spokespeople,   (email, SMS,
       Analysis ─► (into each tenant)             candidates)      WhatsApp, social)
                                                              ▲
                                        mutual suppression ───┘ before every send
```

Three properties of the drawing matter to the review:

1. **The harness is per tenant.** Each enclave has its own strategy, knowledge base, geo data, CRM and agents. No agent reads another tenant's sources, and the alliance draws no harness over its members.
2. **Agents feed people, and only people dispatch.** Every arrow into builders dispatch and outbound dispatch starts at a person. No arrow runs from the harness to a send.
3. **The harness reads four sources.** That is read scope wider than a single feature, the first gating property above. The drawing does not claim otherwise.

### What the proposal answers

For three of the review's eight items, and for one of its four gating properties, the drawing and the three new ADRs supply a proposed answer. Each is for the review to accept, amend or reject.

- **Item 5, cost.** ADR-019's metered plane: inference and generation costs pass through to the tenant at cost, with no margin; under BYOM the tenant's own provider bills the tenant directly. What the platform default tier includes, and whether the free plan carries any metered allowance, stays open, as ADR-019 recorded. *Amended by [ADR-026](026-two-lane-pricing.md): the metering still answers this item, but "at cost, with no margin" no longer describes what a client pays. Each lane adds its own price rule to the metered cost, and what "cost" includes is open there.*
- **Credential breadth.** ADR-019's entitlements: one credential per tenant per central service. An agent acting for a tenant could hold no credential to a service the tenant has not enabled, and every call it made would be a metered usage event with an actor. This bounds what the harness can *call*. It does not bound what it can *read* inside its own tenant, which is the open question below.
- **Item 6, the human gate.** The proposed principle is *machine proposes, human disposes*, and the drawing supplies its first enumerated form: **no agent dispatches.** An agent holds no credential to channel transport or to builder dispatch, and nothing it produces reaches a recipient except through a person's send. ADR-020 and ADR-021 already apply this to builders and to the content pipeline; the proposal extends it to every agent. The remaining forms and their exceptions are for the review to enumerate.
- **Item 7, compartmented data.** The proposed answer: an agent reads compartmented data only under the contract of the person who invoked it, and never more than that person could read. Research delivered by the Analysis service lands in the compartment its contract names (ADR-019), and an agent invoked by someone outside that compartment cannot see it. The proposal also rules out background reads of compartmented data entirely. A read on someone's behalf is logged as that person's read, through the agent, under [ADR-017 § Observability: a distinction in the metadata ladder, not a new rung](017-sharing-contract-trust-model.md#observability-a-distinction-in-the-metadata-ladder-not-a-new-rung).

### What it leaves open

The drawing is silent on four items and makes one of them sharper.

- **Read scope.** This is the central decision the review has to make. The worked example below reads the candidate's own message, the strategy documents, the knowledge base and the candidate's calendar, and stops short of voter records. The harness as drawn reads strategy, knowledge base, geo data and the whole CRM, support scores included. The review has to decide, per source, how far an agent may read.
- **Item 2, automated decision-making and profiling.** The arrow from the CRM into the agents means an agent reading support scores for identifiable voters. That is exactly the case item 2 names, and the drawing makes it concrete rather than hypothetical.
- **Item 1, the threat model; item 3, the audit model; item 4, offline; item 8, the BYOM settings screen.** Unanswered. The on-behalf-of relation proposed under item 7 is a start on item 3, not an answer to it.

### The chat as the person's hands

Added 2026-11-13. Like everything in this section, it is a proposal for the review to accept, amend or reject.

[ADR-023](023-surfaces-chat-admin-field.md) proposes a headless Core with a chat surface meant to carry 70 to 80% of daily staff work. That chat reads across features, holds credentials and invokes operations. It is the agent this ADR gates, at the scale of the whole product and not of one feature.

The position ADR-023 sends to this review is that the chat is the person's hands, not a second actor:

- **It acts under the invoking person's own role, scopes and sharing contracts.** A chat user can do nothing they could not do in the admin UI.
- **Every write is confirmed by the person with a tap on a card.** Reads need no confirmation; writes always do.
- **It never acts in the background.** A scheduled briefing is a schedule a person set, as [ADR-020](020-central-service-line-up-and-builders.md) already allows for sends.
- **The audit log records the person as the actor and the chat as the channel.**
- **Modules declare their chat operations in a manifest,** including which ones are writes ([ADR-022 § The module contract](022-core-modules-and-lanes.md#the-module-contract)). The model chooses among declared operations and cannot invent new ones.

**What it would answer, if accepted.** Read scope: the person's scope. Tool authority: declared operations only. Autonomous action: none without confirmation. The audit actor under item 3: the person, with the chat as the channel.

**How it differs from the harness as drawn.** The harness reads four sources in its own right. The chat reads what the person who invoked it may read, when they ask, and nothing otherwise. That bounds the chat by the person and not by the feature. For a person with a wide role the person's scope is wide, support scores included, so item 2 is as concrete under this position as the harness made it.

**What it does not answer.** Prompt injection from content the chat reads, such as a monitored article or an inbound message, which belongs to item 1. Items 2, 4 and 8. And the retention of prompts and responses under item 3.

### Worked example: approving the day's posts over WhatsApp

A prototype conversation, shared alongside the alliance services board and mapped onto it, shows a candidate running a day of social media from WhatsApp. It is proposed here as a bounded feature, the first to be evaluated under this review, and it is not accepted.

**What it does.** At the start of the day the tenant's campaign agent writes to the candidate on WhatsApp and asks what to focus on. The candidate answers with a voice note: the topic, the tone, and an interview later that morning. The agent transcribes it, reads the tenant's strategy, its knowledge base and the candidate's calendar, and sends back talking points for the interview as a PDF. It then recommends four pieces for social media, each with its network and the time it would go out. Each piece arrives as its own WhatsApp card with three buttons: Approve, Request changes and Discard. Approved pieces go into the schedule. Later, a staff member reviews the images in GreenGrass and asks for changes to two pieces. The agent makes them and sends the second versions back to the candidate, who approves them from WhatsApp. Each piece is published at its time, and the agent reports when it goes out.

**Where it meets the gate.** Six places, each for the review to decide:

1. **Read scope.** The agent reads strategy, the knowledge base and the calendar: wider than a single feature, the first gating property. It does not read voter records, which puts it between the two ends of the read-scope question above.
2. **It speaks first.** The agent opens the conversation at a set time, before anyone asks: autonomous action, the third gating property. WhatsApp adds its own rule, since a message the business starts outside the 24-hour window has to be a pre-approved template ([integrations.md § WhatsApp Business API](../spec/integrations.md#whatsapp-business-api)).
3. **Generated images.** The pieces carry generated images, and image builders are proposed, not accepted ([ADR-020](020-central-service-line-up-and-builders.md)). If a piece shows the candidate, it is the identifiable-person question recorded below.
4. **Who dispatches.** The agent schedules what the candidate approved, and the proposal above says no agent dispatches. The review has to decide whether a person's tap on Approve, bound to one version of one piece at one time, counts as that person's send, with the agent only placing it in the schedule.
5. **Changes after approval.** Staff change a piece the candidate has already approved. [ADR-021](021-content-approval-pipeline.md) says approval covers one round and nothing unapproved is published. The review has to confirm the agent is bound by the same rule when the new version is not approved by its time.
6. **Audit.** Each approval has to record the candidate as the actor and the agent as the channel it passed through. The audit model has no non-human actor yet (item 3).

**Proposed bounds:**
- **Read scope:** the candidate's messages, the strategy documents and knowledge base the tenant designates, and the calendar. No contacts, voter records, donations or other messages.
- **Nothing goes out without a tap:** every published piece carries a named person's approval of that exact version. A new version voids it.
- **No tool authority beyond the schedule:** the agent may place an approved piece in the schedule and nothing more. It holds no credential to publish, and none to channel transport beyond its own conversation with the candidate.
- **Credentials:** the tenant's BYOM provider or the platform default, under an entitlement, and the tenant's own WhatsApp Business number.
- **Citations mandatory:** talking points cite the knowledge-base passages they rest on, under the provenance rule at [comms-intelligence.md § 8.2 Provenance is mandatory](../spec/comms-intelligence.md#82-provenance-is-mandatory).
- **A path without the agent:** staff can draft the same pieces and the candidate can approve them in the content pipeline's own screens.

**A pitch runs it.** [demo.md](../spec/demo.md) documents a working demonstration of this example, built outside the corpus to open the door with candidacies. It runs on the prototyping side of the gate and inside the bounds above, and it accepts nothing here.

### Questions recorded by later ADRs

*Answered 2026-11-26: ADR-020's two in [§ The proposals under review, resolved](#the-proposals-under-review-resolved); ADR-028's twelve at [ADR-028 § The review's answers](028-coaching.md#the-reviews-answers).*

- **From ADR-020:** whether an image or video builder may ever depict a real, identifiable person, and what identification as generated content a published image or video must carry. These belong under item 6 and, for disclosure, under item 2's compliance section.
- **From ADR-028:** twelve questions about coaches, listed at [ADR-028 § Questions sent to the ADR-018 review](028-coaching.md#questions-sent-to-the-adr-018-review). The first decides whether a coach that reads only the conversation, attachments and the documents an organization designated for it is outside the gate. The rest cover reading records, talking about named people, acting, briefings, retention, prompt injection, offline, cost, contracts, the model provider, and whether a coach is the chat. Coaching is part of the Core, so the gate binds it in both lanes.

## The review

Held 2026-11-26, after the November change of direction settled what the review needed in front of it: two lanes, a headless Core, and the chat proposed as the main surface. The review accepted this ADR and answered its eight items. This section records what was decided and what stays open; the mechanism is specified in [spec/harness.md](../spec/harness.md).

### The thesis: the Core is a per-tenant agent harness

Decided.

- **The Core is a per-tenant agent harness.** One harness per instance, inside the tenant's own enclave; never cross-tenant ([ADR-025](025-identity-per-client.md)). It reads designated sources, holds only credentials the tenant has entitlements for ([ADR-019](019-central-services-and-metered-billing.md)), and reaches action only through operations declared in module manifests ([ADR-022 § The module contract](022-core-modules-and-lanes.md#the-module-contract)). The five accepted AI features stand as narrow harness configurations, their bounds unchanged.
- **The chat is the harness's primary interface, acting as the person's hands.** The position [ADR-023](023-surfaces-chat-admin-field.md) proposed is adopted: the harness acts under the invoking person's own role, scopes and sharing contracts; reads need no confirmation, writes always do; it never acts in the background; the audit log records the person as the actor and the chat as the channel; the model chooses only among declared operations and cannot invent new ones.
- ***Machine proposes, human disposes* is a stated cross-cutting principle.** Its forms: (a) **no agent dispatches** — nothing reaches a recipient except through a person's send or a schedule a person set; (b) **every write is confirmed** by the person at the moment it happens; (c) **exceptions are enumerated**, not implicit — the five accepted features' human gates are the enumeration.

A capability that stays inside this posture — the person's scope, declared operations, confirmed writes, entitled credentials, the model router below — needs no further review. Anything beyond it is a new ADR.

### Read scope

Decided, per source. The central question this ADR left open.

- **Interactive reads: the invoking person's scope.** The harness reads what that person may read, at the moment they ask — CRM, support scores, donation totals, everything their role and contracts include. This supersedes the drawing's "reads four sources in its own right": the harness holds no read scope of its own. A person whose role includes support scores can ask the harness about them, which makes item 2 concrete; it gets its compliance answer below, not a read ban.
- **Designated sources: a tenant act, not a person act.** The tenant designates corpora the harness may ground in regardless of the invoker's scope — strategy documents, the knowledge base, the brand/context layer ([ADR-028](028-coaching.md)), geo data — per audience: org-wide, per role, per coach. Designation is an Org Admin act, logged, and listed in one place a client can audit.
- **Compartmented data.** Answers item 7: the harness reads compartmented data only under the sharing contract of the person who invoked it, never more than that person could read, and never in the background. A read on someone's behalf is logged as that person's read through the harness — the distinction in the metadata ladder [ADR-017 § Observability](017-sharing-contract-trust-model.md#observability-a-distinction-in-the-metadata-ladder-not-a-new-rung) provides, not a new rung. The no-superuser-read-path rule of [comms-intelligence.md § 8.5](../spec/comms-intelligence.md#85-access-and-retention) binds the harness absolutely, operators and support included.
- **Background reads: only for schedules a person set.** A briefing or digest may be prepared in the background, reading only designated sources and what the subscribing person may read, evaluated under their scope at preparation time. Never compartmented data. Each background read traces to a schedule a person set — the human gate's first form applied to reads.
- **Exclusions and the cross-tenant rule.** The harness never reads credentials, keys or secrets; a person's private messages not addressed to or shared with the invoker; anything a lane's policy marks off-limits. And it never reaches into another tenant's instance. Cross-tenant material arrives only as contract-filtered events on the bus ([ADR-024](024-event-bus-as-federation.md)) — filtered at the source, field by field, deny by default — and once delivered it sits in this instance under the contract it arrived under, read only under the compartmented-data rule above. An alliance's harness reads the alliance's own instance, never a member's enclave; no harness is drawn over members. Manifests keep declaring per-module read scope as [ADR-022](022-core-modules-and-lanes.md) requires; these are the rules those declarations are checked against.

### Provider sovereignty: the model router

Decided.

- **A model router per tenant is the only path to a model.** Every model call — chat, coaches, builders, translation, concierge — goes through the tenant's router. No feature calls a provider directly. The router holds the tenant's provider policy, picks provider and model per call, and every call is a metered usage event with an actor ([ADR-019](019-central-services-and-metered-billing.md)).
- **Provider policy is per tenant.** BYOM stands ([ADR-016](016-cross-cutting-resolutions.md) §38) and extends to any endpoint the tenant names, including a self-hosted model, so inference can stay entirely inside the tenant's infrastructure. The platform default is metered and priced by the lane's rule ([ADR-026](026-two-lane-pricing.md)). Routing rules by data class: the tenant, with lane-supplied defaults, says which providers may carry which classes — public corpus material may go to an external API; prompts carrying personal data only to providers meeting the tenant's residency rules; compartmented data never leaves the tenant's encryption boundary and reaches only in-boundary endpoints.
- **Standing requirements for any provider,** BYOM or platform: no training on tenant prompts or data; declared retention limits; disclosed as a sub-processor where the law requires; and the encryption-boundary warning of [system.md § The harness and the model router](../design/architecture/system.md#the-harness-and-the-model-router) shown at configuration time, in plain language.
- **The settings screen exists.** Answers item 8: an admin-UI screen — a new SET screen, screen-inventory entry and wireframe — for providers, credentials, routing rules per data class, the boundary warning and current metering. Credentials live in the tenant's key store like every other tenant-owned credential.

### Audit

Decided. Answers item 3.

- **Person = actor, harness = channel; no non-human actor type is ever added.** Every harness-mediated read and write logs the person as actor, the harness component as channel (chat, a named coach, a builder), the manifest operation invoked, and for writes the confirmation reference. The review answers the item's non-human actor type with a refusal: the harness never acts, persons act through it. [settings.md § SET-018](../design/ux/04-wireframes/settings/settings.md#set-018-audit-trail-viewer)'s audit viewer gains a channel facet.
- **"On behalf of" is a trigger field,** not a new relation: each entry records what the harness responded to — a person's request, a confirmation tap, or a schedule a person set. A scheduled briefing logs the subscriber as actor, the harness as channel, their schedule as trigger.
- **Prompts and responses land in [ADR-016](016-cross-cutting-resolutions.md) §4's existing tiers; no new tier.** Bodies go to the Operational tier (OA-configurable 90 days to 5 years, default 2 years, purged like message bodies). Call metadata goes to the audit-trail tier indefinitely: who asked, channel, provider and model, router policy version, tokens and cost, operation, confirmation reference. Provider-side retention is bounded by the standing requirements above.
- **ADR-016 §49's explainability promise is amended.** Rule-based suggestions still show their rule and inputs. Model-produced output shows provenance instead: the designated sources and context it drew on, the operation, the model and provider, and citations wherever it makes factual claims — [comms-intelligence.md § 8.2](../spec/comms-intelligence.md#82-provenance-is-mandatory). Staff can always see what it stood on, never a fictional chain of reasoning.

### The threat model

Decided. Answers item 1; specified at [security.md § The agent harness](../spec/security.md#the-agent-harness) and [§ Prompt injection](../spec/security.md#prompt-injection).

- **The harness is an attack surface, not a principal.** It enters the threat model as the confused deputy: an attacker steers it, through content it reads, into misusing a legitimate person's scope, or misleads a person into confirming a bad action. It is never a trusted actor — it has no scope of its own.
- **Prompt injection is a named threat, with architectural countermeasures.** Vectors: monitored articles and posts, inbound messages and email, CSV imports, web pages, and bus events from counterparties — contract-delivered data is adversarial if the other org is compromised. Countermeasures: untrusted content is data, never instructions; injection can propose, never dispose — a steered harness still has only declared operations, and every write needs a tap, with the confirmation card showing operation and target in plain language; attempts are logged.
- **Model exfiltration is bounded by routing, not vigilance.** Data-class rules mean compartmented data never reaches an external endpoint and personal data only providers meeting residency rules; a steered harness cannot exfiltrate what it cannot route. Tenant provider credentials sit in the tenant's key store.
- **The concentration problem is designed out.** Principle 8 keeps holding because the harness is not a credential, key or person and holds none: one entitlement per tenant per service, no read scope of its own, no cross-tenant reach, no dispatch path.

### Compliance

Decided. Answers item 2; specified at [compliance.md § Automated processing and the harness](../spec/compliance.md#automated-processing-and-the-harness).

- **The platform makes no solely automated significant decisions, and the harness keeps it so.** Support scores are profiling that predates the harness: rule-computed, read only under the invoker's scope, with lawful basis and the GDPR Article 22 / LGPD Article 20 analysis resting with the tenant as controller. The platform guarantees, as processor: persons decide; every action traces to a person; provenance is inspectable; deletion and export extend to prompt and response bodies. [ADR-009](009-compliance-legal.md)'s refusal of automated content filtering stands untouched.
- **A prompt carrying personal data to an external endpoint is a cross-border transfer, and routing is the compliance mechanism.** Data-class rules are the tenant's transfer decisions as configuration; the router enforces them; the audit trail records provider, model and policy version per call — the tenant's transfer log. Compartmented data never crosses. The configuration-time warning is the plain-language disclosure.
- **Model providers are sub-processors.** The platform's DPA and sub-processor list name the platform-default providers; a BYOM provider is the tenant's own sub-processor, disclosed by them. Tenants get a standing document of the harness's data handling: the read-scope rules, routing, retention and human-gate guarantees, readable by their compliance officers and electoral authorities.

### Offline and cost

Decided. Answers items 4 and 5.

- **No harness step on any offline-required path.** Canvassing, voter registration, event check-in, poll-watcher results, sync: [ADR-005](005-offline-first-sync.md)'s paths contain no harness-mediated step. A manifest may not declare a field capability that depends on a model call.
- **Unavailability degrades explicitly.** Harness surfaces show a plain "needs a connection" state; cached conversations stay readable; the admin UI and field app are unaffected. No queued writes exist by design — every write is confirmed live, so there is nothing to queue. A missed scheduled briefing is visibly absent, not silent.
- **Cost: resolved by [ADR-026](026-two-lane-pricing.md).** Inference is a metered usage event, priced by each lane's rule; under BYOM the provider bills the tenant directly. With chat as a main surface, inference is a cost of ordinary daily work, not a marginal one — the lane price rules treat it as a line item. The residue — what "cost" includes, the commissions, the platform default tier's allowance, the free plan — stays open in ADR-026, where it belongs.

### The eight items, answered

| # | Item | Answer |
|---|---|---|
| 1 | Threat model extension | The harness enters [security.md § The agent harness](../spec/security.md#the-agent-harness) as an attack surface, not a principal; prompt injection is named with architectural countermeasures; concentration is designed out |
| 2 | Automated decision-making and profiling | [compliance.md § Automated processing and the harness](../spec/compliance.md#automated-processing-and-the-harness): no solely automated significant decisions; support scores stay the tenant's analysis as controller; prompts are transfers, routed and logged |
| 3 | Audit model | Person = actor, harness = channel; a trigger field, not a new relation; prompts and responses in [ADR-016](016-cross-cutting-resolutions.md) §4's existing tiers; §49's promise amended to provenance |
| 4 | Offline posture | No harness step on an offline-required path; explicit "needs a connection" degradation; no queued writes |
| 5 | Cost | Resolved by [ADR-026](026-two-lane-pricing.md): metered under [ADR-019](019-central-services-and-metered-billing.md), priced by lane rule, BYOM billed direct; arithmetic stays open in ADR-026 |
| 6 | The human-gate principle | Stated: no agent dispatches; every write confirmed at the moment it happens; exceptions enumerated |
| 7 | Compartmented data | Only under the invoking person's contract, never more than they could read, never in the background, logged as their read |
| 8 | BYOM settings screen | Owed: a new SET screen, screen-inventory entry and wireframe, carrying the boundary warning and metering |

### The proposals under review, resolved

- **The per-tenant harness as drawn** is accepted, bounded by the person's-hands position. Two of the drawing's three properties stand: the harness is per tenant, and agents feed people while only people dispatch. The third does not: the harness reads no source in its own right — it reads what the invoking person may read, plus what the tenant designated.
- **The chat as the person's hands** is accepted, as recorded in the thesis above.
- **The worked example passes the gate** as a bounded feature under its stated bounds. Its six meeting points: (1) its read scope is a valid designation plus the candidate's own messages; (2) speaking first is a schedule the candidate set, and WhatsApp's template rule is unchanged; (3) generated images follow the image-builder answer below; (4) the candidate's tap on Approve is the person's send, and the agent only places the piece in the schedule; (5) a new version voids approval, and the agent is bound — unapproved by its time, a piece does not go; (6) each approval records the candidate as actor and the agent as channel.
- **ADR-020's two questions are answered.** Image and video builders are mechanically identical to text builders — a person invokes, reads what they hand it, a draft returns, nothing sends — so they are outside the gate and accepted on the same terms. A builder may depict a real, identifiable person only with that person's documented consent recorded and attached to the asset. Published generated media carries provenance metadata — generated, model, date — and a visible disclosure wherever it shows a real person or the law requires; a lane may require more.
- **ADR-028's twelve questions are answered** at [ADR-028 § The review's answers](028-coaching.md#the-reviews-answers). The load-bearing one: reading the context documents an organization designated for a coach is not read scope wider than a single feature, because designation is a deliberate, logged tenant act. The bounded coach has none of the four gated properties and may ship.

### What stays open

- **The pricing arithmetic.** What "cost" includes, how each commission is calculated, what the platform default tier includes, whether any free tier carries a metered allowance — [ADR-026](026-two-lane-pricing.md)'s open questions, where they belong.
- **ADR-028's two product questions.** Who may write a coach — now also a security question, since org-written instructions are trusted by designation — and who writes and maintains the organizing knowledge coaches draw on.
- **The owed screens.** The provider settings screen (item 8), the audit viewer's channel facet, and the screen-inventory and wireframe updates both need.
- **ADR-022's open questions** are untouched: a name for the Core, operator access by lane, the event bus replacing the federation layer, the voter file as a political-lane module, Parsons as the connector layer, and what happens to a disabled module's data. *Updated 2026-11-26: the event-bus item is decided — [ADR-024](024-event-bus-as-federation.md) is accepted.*

## Consequences

**Benefits:**
- The review is a reading exercise now and a migration later. The corpus is 85 documents and no code; after the pilot it is a live system holding an electoral roll, donation records, and canvassing notes about identifiable people's politics
- The gate is explicit and citable, so agent work cannot arrive incrementally through five separate feature decisions the way AI itself did
- The five accepted AI features are unblocked, so nothing already specified waits on this
- Three long-standing inconsistencies are on the record where they can be seen

**Costs:**
- The project declared specification and design complete. This reopens it, and the phase language in `README.md` and `CLAUDE.md` has to say so
- Any agent-based capability is delayed by the length of the review
- A `Proposed` ADR is a new state in this corpus — every other decision record is `Accepted`, and a proposed one has to be prevented from being read as settled

**Constraints:**
- The platform is never a party to a sharing contract ([ADR-017](017-sharing-contract-trust-model.md)), so no agent may be given a read path that a contract does not grant
- [comms-intelligence.md § 8.5 Access and retention](../spec/comms-intelligence.md#85-access-and-retention)'s no-superuser-read-path rule binds any future agent design without exception for support or debugging
- Tenant ownership of credentials ([integrations.md § Integration Principles](../spec/integrations.md#integration-principles)) applies to model providers as it does to every other integration
- This ADR adds no new capability and reverses no accepted decision. It records a gate and the questions behind it

**Related ADRs:** [ADR-002](002-security-threat-model.md) (threat model to extend), [ADR-004](004-data-model-integrity.md) (audit trail to extend), [ADR-005](005-offline-first-sync.md) (offline constraint), [ADR-009](009-compliance-legal.md) (automated filtering refused), [ADR-010](010-internationalization-localization.md) (AI translation with review), [ADR-012](012-external-integrations.md) (no third-party visibility precedent), [ADR-013](013-analytics-ai.md) (AI messaging; model choice superseded), [ADR-014](014-volunteer-onboarding.md) (AI concierge), [ADR-016](016-cross-cutting-resolutions.md) (BYOM §38, rule-based reallocation §49, tiered retention §4), [ADR-017](017-sharing-contract-trust-model.md) (contracts govern every boundary), [ADR-019](019-central-services-and-metered-billing.md) (cost item and credential boundary proposed), [ADR-020](020-central-service-line-up-and-builders.md) (text builders accepted outside the gate; image and video wait on item 6), [ADR-021](021-content-approval-pipeline.md) (the content pipeline an agent's pieces would enter; its WhatsApp approval question points here), [ADR-022](022-core-modules-and-lanes.md) (the Core and its two lanes; a module's manifest declares its standing against the gate), [ADR-023](023-surfaces-chat-admin-field.md) (the gate binds the whole Core; the chat position proposed to this review), [ADR-026](026-two-lane-pricing.md) (the cost item: metering stands, "no margin" does not), [ADR-028](028-coaching.md) (Coaching is part of the Core; twelve questions sent to this review)
