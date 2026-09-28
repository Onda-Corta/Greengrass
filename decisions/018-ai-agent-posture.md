# ADR-018: AI Agent Posture

**Status:** Proposed
**Date:** 2026-09-07
**Updated:** 2026-09-28 — the proposal under review added; later the same day its worked example was replaced by the WhatsApp approval flow. Status unchanged: nothing in it is accepted.
**Sources:** `spec/security.md`, `spec/compliance.md`, `spec/fundraising.md`, `spec/gotv.md`, `spec/comms-intelligence.md`, `design/architecture/system.md`, `decisions/019-central-services-and-metered-billing.md`, `decisions/020-central-service-line-up-and-builders.md`, `decisions/021-content-approval-pipeline.md`, `design/ux/04-wireframes/content-ops/content-ops.md`

## Context

GreenGrass has decided AI five times, and each decision drew a bounded feature with a human gate at its exit.

1. [ADR-013](013-analytics-ai.md) generates a personalized activism message; the supporter edits, approves, and the approval becomes a consent record.
2. [ADR-010](010-internationalization-localization.md) drafts translations for human sign-off, with mandatory review for security prompts, legal text and consent language.
3. [ADR-014](014-volunteer-onboarding.md) puts an AI concierge at first contact for support, escalating to a person for anything high-stakes.
4. [ADR-016](016-cross-cutting-resolutions.md) §38 chose BYOM — the organization supplies its own provider, endpoint and credentials.
5. [system.md § AI Integration](../design/architecture/system.md#ai-integration) implements all four behind a provider-agnostic abstraction layer with content guardrails.

Each is sound in isolation. None of them asks the systemic question: what changes if AI agents operate *throughout* the product rather than inside five boxes — reading across features, holding credentials, invoking tools, and acting between human checkpoints.

That question is unasked, and the documents that would have to answer it are silent. [security.md § Threat Actors](../spec/security.md#threat-actors) and [ADR-002](002-security-threat-model.md) contain no reference to AI of any kind. [compliance.md § Data Processing Agreements](../spec/compliance.md#data-processing-agreements) contains the only AI reference in the entire compliance framework, as a sub-processor disclosure obligation.

Meanwhile the doorway is already open. [integrations.md § Integration Principles](../spec/integrations.md#integration-principles) establishes that "tenants bring their own API keys and accounts for external services," and [system.md § BYOM Architecture](../design/architecture/system.md#byom-architecture) already concedes that BYOM prompt data "leaves your encryption boundary." The platform has the plumbing for agents without the posture for them.

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

The five decisions listed above ship as specified. They are bounded, reviewed, and unaffected by this gate.

Anything beyond them is gated. Specifically, a capability is gated if it has any of:

- **Read scope wider than a single feature** — access to contacts, voter records, messages, donations or audit data outside the boundary of the accepted feature invoking it.
- **Tool authority** — the ability to invoke platform operations rather than return text for a person to act on.
- **Autonomous action** — any state change, send, or external call that no person approved at the moment it happened.
- **Credential breadth** — a key scoped to more than the single integration it serves.

**Alternatives considered:** Allowing agent work to proceed in parallel with the review was rejected because the architecture decisions an agent implies — actor model, credential scope, audit schema — are the expensive ones to reverse, and the pilot's Phase 2 build ([mvp.md § 7. Phases](../spec/mvp.md#7-phases)) sets them. Writing a full agent posture now, before the review, was rejected because the gaps span security, compliance, audit, offline and pricing, and settling them from a single sitting would repeat the feature-by-feature error this ADR exists to correct.

### The review is a precondition on production, not on prototyping

Nothing here restricts experimentation against synthetic data in a development environment. The gate is on production and on any deployment holding real voter, donor or member records. The distinction matters because the pilot is the first place the two converge.

## What this ADR must resolve

Acceptance requires an answer to each of the following, recorded here or in the document named.

1. **Threat model extension** — a non-human actor in [security.md § Threat Actors](../spec/security.md#threat-actors), covering prompt injection, model exfiltration, and the concentration problem under [security.md § Security Principles](../spec/security.md#security-principles) principle 8.
2. **Automated decision-making and profiling** — a new section in [compliance.md § Cross-Cutting Compliance Requirements](../spec/compliance.md#cross-cutting-compliance-requirements) covering GDPR Article 22, LGPD Article 20, the status of support scores, and prompt data as a cross-border transfer.
3. **Audit model** — a non-human actor type, an "on behalf of" relation, and a retention rule for prompts and responses consistent with [ADR-016](016-cross-cutting-resolutions.md) §4 tiered retention.
4. **Offline posture** — what a field user sees when an agent-mediated capability is unavailable, and whether any such capability may sit on a path [ADR-005](005-offline-first-sync.md) requires to work offline.
5. **Cost** — reconciliation of per-token inference with [fundraising.md § Platform Revenue Model](../spec/fundraising.md#platform-revenue-model), including who pays under BYOM and what happens on the platform default tier.
6. **The human-gate principle** — promotion of *machine proposes, human disposes* to a stated cross-cutting principle, with its exceptions enumerated rather than left implicit.
7. **Compartmented data** — whether an agent may ever read data governed by a sharing contract under [ADR-017](017-sharing-contract-trust-model.md), given that the platform is never a party to a contract.
8. **BYOM settings screen** — the screen [ADR-016](016-cross-cutting-resolutions.md) committed to, added to the wireframes and the screen inventory, including the encryption-boundary warning already specified at [system.md § BYOM Architecture](../design/architecture/system.md#byom-architecture).

## The proposal under review

Everything in this section is a proposal for the review to evaluate. None of it is accepted, none of it appears in the architecture document as structure, and the gate above is unchanged.

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

- **Item 5, cost.** ADR-019's metered plane: inference and generation costs pass through to the tenant at cost, with no margin; under BYOM the tenant's own provider bills the tenant directly. What the platform default tier includes, and whether the free plan carries any metered allowance, stays open, as ADR-019 recorded.
- **Credential breadth.** ADR-019's entitlements: one credential per tenant per central service. An agent acting for a tenant could hold no credential to a service the tenant has not enabled, and every call it made would be a metered usage event with an actor. This bounds what the harness can *call*. It does not bound what it can *read* inside its own tenant, which is the open question below.
- **Item 6, the human gate.** The proposed principle is *machine proposes, human disposes*, and the drawing supplies its first enumerated form: **no agent dispatches.** An agent holds no credential to channel transport or to builder dispatch, and nothing it produces reaches a recipient except through a person's send. ADR-020 and ADR-021 already apply this to builders and to the content pipeline; the proposal extends it to every agent. The remaining forms and their exceptions are for the review to enumerate.
- **Item 7, compartmented data.** The proposed answer: an agent reads compartmented data only under the contract of the person who invoked it, and never more than that person could read. Research delivered by the Analysis service lands in the compartment its contract names (ADR-019), and an agent invoked by someone outside that compartment cannot see it. The proposal also rules out background reads of compartmented data entirely. A read on someone's behalf is logged as that person's read, through the agent, under [ADR-017 § Observability: a distinction in the metadata ladder, not a new rung](017-sharing-contract-trust-model.md#observability-a-distinction-in-the-metadata-ladder-not-a-new-rung).

### What it leaves open

The drawing is silent on four items and makes one of them sharper.

- **Read scope.** This is the central decision the review has to make. The worked example below reads the candidate's own message, the strategy documents, the knowledge base and the candidate's calendar, and stops short of voter records. The harness as drawn reads strategy, knowledge base, geo data and the whole CRM, support scores included. The review has to decide, per source, how far an agent may read.
- **Item 2, automated decision-making and profiling.** The arrow from the CRM into the agents means an agent reading support scores for identifiable voters. That is exactly the case item 2 names, and the drawing makes it concrete rather than hypothetical.
- **Item 1, the threat model; item 3, the audit model; item 4, offline; item 8, the BYOM settings screen.** Unanswered. The on-behalf-of relation proposed under item 7 is a start on item 3, not an answer to it.

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

### Questions recorded by later ADRs

- **From ADR-020:** whether an image or video builder may ever depict a real, identifiable person, and what identification as generated content a published image or video must carry. These belong under item 6 and, for disclosure, under item 2's compliance section.

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

**Related ADRs:** [ADR-002](002-security-threat-model.md) (threat model to extend), [ADR-004](004-data-model-integrity.md) (audit trail to extend), [ADR-005](005-offline-first-sync.md) (offline constraint), [ADR-009](009-compliance-legal.md) (automated filtering refused), [ADR-010](010-internationalization-localization.md) (AI translation with review), [ADR-012](012-external-integrations.md) (no third-party visibility precedent), [ADR-013](013-analytics-ai.md) (AI messaging; model choice superseded), [ADR-014](014-volunteer-onboarding.md) (AI concierge), [ADR-016](016-cross-cutting-resolutions.md) (BYOM §38, rule-based reallocation §49, tiered retention §4), [ADR-017](017-sharing-contract-trust-model.md) (contracts govern every boundary), [ADR-019](019-central-services-and-metered-billing.md) (cost item and credential boundary proposed), [ADR-020](020-central-service-line-up-and-builders.md) (text builders accepted outside the gate; image and video wait on item 6), [ADR-021](021-content-approval-pipeline.md) (the content pipeline an agent's pieces would enter; its WhatsApp approval question points here)
