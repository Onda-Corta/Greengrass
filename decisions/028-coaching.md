# ADR-028: Coaching

**Status:** Proposed
**Date:** 2026-11-25
**Sources:** `spec/coaching.md`, `spec/users.md`, `spec/support.md`, `spec/comms-intelligence.md`, `design/architecture/system.md`, `decisions/005-offline-first-sync.md`, `decisions/013-analytics-ai.md`, `decisions/014-volunteer-onboarding.md`, `decisions/016-cross-cutting-resolutions.md`, `decisions/017-sharing-contract-trust-model.md`, `decisions/018-ai-agent-posture.md`, `decisions/019-central-services-and-metered-billing.md`, `decisions/020-central-service-line-up-and-builders.md`, `decisions/022-core-modules-and-lanes.md`, `decisions/023-surfaces-chat-admin-field.md`, `decisions/026-two-lane-pricing.md`

## Context

On 2026-11-24 the project was shown the sandbox of a distributed-organizing product. It gives every role an AI coach. An organization-management coach sits at the top of the administrator's home page, under the question "What do you need to get done today?", with suggestions such as *A group is stuck* and *Announcement talking points*. A group-leader coach answers a leader who describes a member coming to them privately, and explains it with a named author's idea about how groups form. The organization can write coaches of its own. A context layer the organization sets (mission, brand, guardrails) informs every coach. Around the coaches sit a daily briefing, a ranked list of recommended actions with *Add task* and *Reach out* buttons, voice input, past conversations, a share button and a notice that coaches use AI and can make mistakes.

The corpus has decided AI five times ([ADR-018 § Context](018-ai-agent-posture.md#context)). Two of those decisions are close to a coach and are not one. The AI concierge ([ADR-014](014-volunteer-onboarding.md#ai-first-support-concierge-with-human-escalation)) helps with the platform and is grounded strictly in the knowledge base. A text builder ([ADR-020](020-central-service-line-up-and-builders.md#builders-text-accepted-images-and-video-proposed)) turns a brief into a draft. Nothing in the corpus helps a person think through their own work: how to run a meeting, what to do about a group that has stalled, what to say in an announcement.

The chat of [ADR-023](023-surfaces-chat-admin-field.md#the-chat-as-the-persons-hands) is the closest thing. A coach shares its shape, a conversation with a model, and much of the sandbox's coaching needs exactly what the chat needs: reading across features, acting on records, speaking first. That is the agent the ADR-018 review exists to settle.

This ADR is `Proposed`. Two things in it are decided, and are marked.

| Item | Standing |
|---|---|
| Coaching is part of the Core | Decided |
| The name: *Coach*, in English and in Spanish | Decided |
| What a coach is, and how it differs from the concierge, the builders and the chat | Proposed |
| Role coaches and coaches the organization writes | Proposed |
| The bounded coach | Proposed |
| The organization's context layer | Proposed |
| Briefings, recommended actions, acting from a coach, reading records | Proposed, and waiting on the ADR-018 review |
| Who may write a coach; who writes and maintains the organizing knowledge coaches draw on | Open |

### Conflicts this ADR resolves

1. **[ADR-022 § What the Core contains](022-core-modules-and-lanes.md#what-the-core-contains)** lists no coaching. This ADR adds it, as decided. The Core must stay lane-neutral, and coaching is: what a coach knows about organizing is the client's context and the lane's configuration, not the Core's.
2. **[system.md § AI concierge](../design/architecture/system.md#ai-concierge)** grounds the concierge strictly in the knowledge base and platform documentation, with "no broader reasoning or external knowledge". The coach in the sandbox draws on general knowledge of how groups work. The concierge's rule stands as written, for the concierge. The coach's grounding is proposed below and is a different rule.
3. **[users.md § Volunteer Team Lead](../spec/users.md#volunteer-team-lead)** is a field-level role for an operation: a canvassing day, a phone bank. The sandbox's group leader runs a standing local group over months. No role in the corpus describes that. Named, not resolved: this ADR gives coaches to the roles that exist and adds no role.
4. **[ADR-018 § No agent capability reaches production until this ADR is accepted](018-ai-agent-posture.md#no-agent-capability-reaches-production-until-this-adr-is-accepted)** gates three properties the sandbox's coaching has. The briefing and the recommendations read groups, contact history and setup status: read scope wider than one feature. *Add task* and *Reach out* act: tool authority. The briefing appears before anyone asks: autonomous action. The gate stands. This ADR splits coaching into a bounded coach, drawn to have none of the four properties, and the rest, which waits.
5. **[ADR-016](016-cross-cutting-resolutions.md) §49** commits that "staff can see exactly why a suggestion was made", and made reallocation suggestions rule-based for v1 to keep that promise. A model's recommended actions cannot keep it as written. Named, and sent to the review with the recommendations.

## Decision

### Coaching is part of the Core

**Decided.** Every instance has Coaching, in both lanes, the way every instance has the CRM.

The reason is the agent posture. Coaching is where most people will meet whatever [ADR-018](018-ai-agent-posture.md) settles: read scope, tool authority, autonomy, audit. If coaching were a module, each client that enabled it would carry its own version of those rules, and the rules could drift between what the chat does and what a coach does. In the Core, coaching is built on the same posture as the chat and changes when the posture changes. It is the CRM's reasoning applied to AI: one place where the rule holds, so it cannot be honoured in one place and ignored in another.

What follows from that:

- **The Core never depends on a module** ([ADR-022](022-core-modules-and-lanes.md)). If a coach is ever allowed to read a module's data, it reads it through operations the module declares in its manifest, and only when the module is enabled.
- **Being in the Core does not move coaching past the gate.** The ADR-018 gate binds the whole Core ([ADR-023 § The ADR-018 gate binds the whole Core](023-surfaces-chat-admin-field.md#the-adr-018-gate-binds-the-whole-core)). What may ship before the review is only what has none of the four gated properties.
- **The cost is metered.** Every turn is an inference call, metered under [ADR-019](019-central-services-and-metered-billing.md) and priced by each lane's rule ([ADR-026](026-two-lane-pricing.md)), or billed to the client by its own provider under BYOM ([ADR-016](016-cross-cutting-resolutions.md) §38).

**Alternatives considered:** Coaching as a module in the catalogue was rejected for the reason above: a module that is in practice an agent would restate the agent posture per client. Coaching as a political-lane module was rejected because the mechanism is lane-neutral. A commercial client's account teams have roles and craft too. Folding coaches into the chat with no separate concept was not decided either way, and is sent to the review (question 12 below).

### The name

**Decided.** The capability is *Coaching* and each assistant is a *Coach*, in English and in Spanish. In Spanish both words stay as they are: *el coach*, *los coaches*, *el Coaching*. The sandbox's "eCoach" belongs to another product and is not used. Neither are *asistente*, which the glossary gives to `wizard`, *agente*, which is the AI agent ADR-018 gates, or *concierge*, which is support's.

### What a coach is

Proposed.

A coach is a conversation with a model, set up for one role or one purpose, that helps a person with their own work. It advises, explains and drafts. It is not one of the three AI features it sits beside:

| | AI concierge | Text builder | Chat | Coach |
|---|---|---|---|---|
| For | Help with the platform | A draft from a brief | Doing the work | Thinking through the work |
| Reads | The knowledge base and platform documentation | What the person hands it | What the person may read, when they ask | The conversation, attachments, and the context the organization designates |
| Acts | No; escalates to a person | No; returns a draft | Yes; every write confirmed | No (the bounded coach) |
| Standing | Accepted ([ADR-014](014-volunteer-onboarding.md)) | Accepted ([ADR-020](020-central-service-line-up-and-builders.md)) | Proposed and gated ([ADR-023](023-surfaces-chat-admin-field.md)) | Proposed (this ADR) |

There are two kinds:

- **Role coaches.** One for each role template in [users.md § Permissions Model](../spec/users.md#permissions-model) except Supporter, so for the Org Admin, each staff template, the Volunteer, the Volunteer Team Lead and the Candidate. The lane supplies their starting instructions; the commercial lane supplies its own roles.
- **Coaches the organization writes.** A name, a purpose, instructions, the context documents it may use, and the roles that may open it. Who may write one is open.

### The bounded coach

Proposed. These are the bounds of [ADR-020 § Builders](020-central-service-line-up-and-builders.md#builders-text-accepted-images-and-video-proposed), applied to a conversation.

- **A person opens it.** A coach never speaks first and never runs in the background.
- **It reads three things:** the conversation, what the person attaches, and the context documents the organization designated for that coach. It has no read path into contacts, voter records, groups, messages, donations, events, audit data or compartments.
- **It returns text.** It invokes no platform operation. A draft leaves the conversation only when the person copies it somewhere, and once there it enters whatever approval that kind of content already has ([ADR-021](021-content-approval-pipeline.md)).
- **It holds one credential:** to the model provider, under the client's entitlement or its own BYOM provider.
- **It keeps ADR-013's guardrails.** It states no fact, figure or claim about the organization that is not in the conversation or the context.
- **It says what it rests on.** A statement taken from a context document cites the document. An idea taken from a published author names the author and the work. Everything else is offered as the coach's own advice. This adapts [comms-intelligence.md § 8.2 Provenance is mandatory](../spec/comms-intelligence.md#82-provenance-is-mandatory) to advice, where the rule there is written for findings.
- **It needs a connection.** No field task depends on a coach ([ADR-005](005-offline-first-sync.md), [ADR-023](023-surfaces-chat-admin-field.md)).

| Gated property | The bounded coach |
|---|---|
| Read scope | The conversation, attachments and designated context documents. Whether designated documents count as "wider than a single feature" is question 1 below |
| Tool authority | None |
| Autonomous action | None |
| Credential breadth | The model provider only |

A coach with no context documents reads only what the person hands it, which is a text builder's read scope exactly. A coach with context documents waits on question 1. Until the review answers it, both are treated as gated.

### The organization's context layer

Proposed.

The organization writes once what every coach builds on:

- **Mission and voice:** what the organization is for and how it speaks.
- **Guardrails:** topics a coach declines, positions it never takes, language it avoids.
- **Context documents:** items from the content store ([ADR-021](021-content-approval-pipeline.md)) the organization designates, such as its strategy, its training materials ([support.md § In-Platform Training Module](../spec/support.md#in-platform-training-module)) and its knowledge base. Each coach uses the documents designated for it.

The layer lives in the instance and never crosses to another. A document held under a sharing contract cannot be designated, because the platform is never a party to a contract ([ADR-017](017-sharing-contract-trust-model.md)). Changes to the layer are logged with the person who made them. The lane supplies defaults.

The context layer is what ADR-018's harness drawing calls *Strategy* and *Knowledge base* ([ADR-018 § The per-tenant harness, as drawn](018-ai-agent-posture.md#the-per-tenant-harness-as-drawn)), specified for coaches. That makes it the harness's input, not the harness, and leaves the harness's other two sources, geo data and the CRM, out.

### What waits on the ADR-018 review

Recorded here so the review sees the whole of what was shown. None of it is specified for production, and nothing may be built on it as if it were.

1. **Briefings.** A daily summary of the person's scope: groups active, people due for contact, setup unfinished. It reads beyond the conversation, and it either speaks first or runs on a schedule a person set.
2. **Recommended actions.** A ranked list such as "You have not spoken with a member in 54 days." It reads contact history, raises ADR-016 §49's explainability promise, and ranks identifiable people.
3. **Acting from a coach.** *Add task* and *Reach out*. Under the chat-as-hands proposal these would be declared operations, each confirmed with a card.
4. **Reading records in the conversation.** A leader asks about their group and the coach reads its roster and activity.
5. **Coaches in other channels.** A coach in Telegram or Signal, which turns on the default chat channel ([ADR-023 § Cost and channel](023-surfaces-chat-admin-field.md#cost-and-channel)).

Briefings and recommendations have a version outside the gate: counts and rules computed without a model and shown as an ordinary dashboard, as ADR-016 §49 did for reallocation. That version needs a specification of local groups that the corpus does not have (conflict 3).

### Questions sent to the ADR-018 review

Recorded in [ADR-018 § Questions recorded by later ADRs](018-ai-agent-posture.md#questions-recorded-by-later-adrs). None is answered here.

1. **Designated context and read scope.** Does reading the context documents an organization designated for a coach count as read scope wider than a single feature? This decides whether the bounded coach is outside the gate. *Read scope.*
2. **Records.** May a coach read groups, members, contact history or the CRM, to brief, to recommend or to answer? If so, within the person's own scope, as the chat-as-hands proposal says, or narrower, source by source? *Read scope; item 2.*
3. **Talking about people.** A leader describing a named member's behaviour, and a coach analysing that person's place in the group, is profiling an identifiable person on a political platform. Is that permitted, and on what basis? *Item 2.*
4. **Acting.** Are *Add task* and *Reach out* writes confirmed with a card, or links into the admin UI that the person completes there? *Tool authority; item 6.*
5. **Briefings.** Is a daily briefing a schedule a person set, which ADR-020 and ADR-023 already allow for sends, or a coach speaking first? *Autonomous action; item 6.*
6. **Retention and who can read a conversation.** How long conversations are kept, under which tier of [ADR-016 § 4](016-cross-cutting-resolutions.md#4-tiered-data-retention-policy); what the audit log records; whether anyone but the person can read them, including the Org Admin, given the no-superuser-read-path rule at [comms-intelligence.md § 8.5 Access and retention](../spec/comms-intelligence.md#85-access-and-retention); and what sharing a conversation does. *Item 3.*
7. **Prompt injection** from attachments, from designated documents, and from the instructions of a coach the organization wrote. *Item 1.*
8. **Offline.** What a person sees without a connection, given that the people who lead local groups work close to the field. *Item 4.*
9. **Cost.** Who pays when a volunteer talks to a coach, and what the default tier includes. *Item 5; ADR-026.*
10. **Contracts.** Whether a coach may ever read data held under a sharing contract, such as a coalition's. Proposed here: never designated as context. *Item 7.*
11. **The model provider.** Whether a coach may use an external BYOM provider when conversations carry members' names, which then leave the encryption boundary ([system.md § BYOM architecture](../design/architecture/system.md#byom-architecture)). *Item 8.*
12. **Coaches and the chat.** Is a coach the chat of ADR-023 with a role's instructions and no operations, or a surface of its own? This ties to the Campaign Agent recommendation in [ADR-022 § The module catalogue](022-core-modules-and-lanes.md#the-module-catalogue), which is not decided. *The chat-as-hands proposal.*

### Open questions

These do not depend on the review. They are not settled here.

1. **Who may write a coach.** The Org Admin only, staff, team leads, or an alliance or association for its members over the bus ([ADR-024](024-event-bus-as-federation.md), itself proposed).
2. **Who writes and maintains the organizing knowledge coaches draw on.** GreenGrass, the lane, the client or partners, and in which languages.

## Consequences

**Benefits:**
- Every person gets help with their own work, in their own language, without a trainer in the room
- An organization writes its mission, voice and guardrails once, and every coach keeps to them
- The agent posture applies to coaches and the chat from one place
- The bounded coach is a concrete, small case for the review, with its four properties stated

**Costs:**
- Most of what made the sandbox's coaching useful, the briefing and the recommendations, waits on the review
- Every turn is inference, and coaching invites long conversations
- Conversations will contain what people say about other people, before anyone has decided how long they are kept
- Lane-neutral coaches need organizing knowledge that someone has to write, and no one is named yet

**Constraints:**
- No coach reaches production in either lane before the ADR-018 review is accepted, unless the review confirms it has none of the four gated properties
- A coach never speaks first, never acts and never reads records until the review says otherwise
- No field task depends on a coach
- A document under a sharing contract is never coach context
- The concierge's grounding rule is unchanged

**Related ADRs:** [ADR-005](005-offline-first-sync.md) (coaches need a connection; field work does not), [ADR-013](013-analytics-ai.md) (the guardrails coaches keep), [ADR-014](014-volunteer-onboarding.md) (the concierge, which a coach is not), [ADR-016](016-cross-cutting-resolutions.md) (§4 retention, §38 BYOM, §49 explainability), [ADR-017](017-sharing-contract-trust-model.md) (contracts are never coach context), [ADR-018](018-ai-agent-posture.md) (the gate; twelve questions sent to the review), [ADR-019](019-central-services-and-metered-billing.md) (inference is metered), [ADR-020](020-central-service-line-up-and-builders.md) (the builder bounds the bounded coach follows), [ADR-021](021-content-approval-pipeline.md) (context documents come from the content store; drafts enter its approval), [ADR-022](022-core-modules-and-lanes.md) (Coaching is part of the Core), [ADR-023](023-surfaces-chat-admin-field.md) (the gate binds the whole Core; the chat a coach resembles), [ADR-024](024-event-bus-as-federation.md) (whether coaches travel over the bus is open), [ADR-026](026-two-lane-pricing.md) (the price of a conversation)
