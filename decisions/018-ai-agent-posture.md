# ADR-018: AI Agent Posture

**Status:** Proposed
**Date:** 2026-09-07
**Sources:** `spec/security.md`, `spec/compliance.md`, `spec/fundraising.md`, `spec/gotv.md`, `spec/comms-intelligence.md`, `design/architecture/system.md`

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

1. [ADR-013](013-analytics-ai.md) is `Status: Accepted` with no supersession banner, although [system.md § AI Integration](../design/architecture/system.md#ai-integration) states its AI model decision was superseded by [ADR-016](016-cross-cutting-resolutions.md) §38.
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

**Related ADRs:** [ADR-002](002-security-threat-model.md) (threat model to extend), [ADR-004](004-data-model-integrity.md) (audit trail to extend), [ADR-005](005-offline-first-sync.md) (offline constraint), [ADR-009](009-compliance-legal.md) (automated filtering refused), [ADR-010](010-internationalization-localization.md) (AI translation with review), [ADR-012](012-external-integrations.md) (no third-party visibility precedent), [ADR-013](013-analytics-ai.md) (AI messaging; model choice superseded), [ADR-014](014-volunteer-onboarding.md) (AI concierge), [ADR-016](016-cross-cutting-resolutions.md) (BYOM §38, rule-based reallocation §49, tiered retention §4), [ADR-017](017-sharing-contract-trust-model.md) (contracts govern every boundary)
