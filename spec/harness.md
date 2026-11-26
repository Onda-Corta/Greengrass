# The Agent Harness

**One harness per tenant, acting only as a person's hands, reaching a model only through that tenant's router**

Status: accepted in the [ADR-018](../decisions/018-ai-agent-posture.md) review, 2026-11-26. This document specifies the mechanism the review decided; the review's record, and what it leaves open, is at [ADR-018 § The review](../decisions/018-ai-agent-posture.md#the-review).
Drafted: 2026-11-26

---

## Purpose

The Core is a per-tenant agent harness. Every AI capability in the product — the chat, coaches, builders, translation, the concierge — runs inside one set of rules about what a model may read, what it may do, who answers for it, and where its calls go. This document states those rules once, so that no feature invents its own.

The posture in one paragraph: the harness never acts on its own. It reads what the person using it may read, plus what the organization designated for it. It does nothing in the background except work a person scheduled. Every write is confirmed by a person at the moment it happens, and nothing it produces reaches a recipient except through a person's send. Its every model call goes through the tenant's own router, under the tenant's own provider policy. And in the audit log there is never an entry whose author is a model.

## What the harness is

One harness per instance, inside the tenant's own enclave ([ADR-025](../decisions/025-identity-per-client.md)). It is never cross-tenant. It holds only the credentials the tenant has entitlements for — one per central service per tenant ([ADR-019](../decisions/019-central-services-and-metered-billing.md)) — and it reaches action only through **declared operations**: operations a module's manifest names, each marked read or write ([ADR-022 § The module contract](../decisions/022-core-modules-and-lanes.md#the-module-contract)). The model chooses among declared operations and cannot invent new ones.

The five AI features the corpus accepted before the harness — activism message drafting ([ADR-013](../decisions/013-analytics-ai.md)), translation ([ADR-010](../decisions/010-internationalization-localization.md)), the concierge ([ADR-014](../decisions/014-volunteer-onboarding.md)), BYOM ([ADR-016](../decisions/016-cross-cutting-resolutions.md) §38) and text builders ([ADR-020](../decisions/020-central-service-line-up-and-builders.md)) — are narrow harness configurations. Their bounds are unchanged.

A capability that stays inside this posture — the person's scope, declared operations, confirmed writes, entitled credentials, the model router — needs no further review. Anything beyond it is a new ADR.

## The human gate

*Machine proposes, human disposes* is a stated cross-cutting principle, with three forms:

1. **No agent dispatches.** Nothing reaches a recipient except through a person's send or a schedule a person set. The harness holds no credential to channel transport.
2. **Every write is confirmed at the moment it happens.** Reads need no confirmation; writes always do. The person confirms with a tap on a card that shows the operation and its target in plain language.
3. **Exceptions are enumerated, not implicit.** The five accepted features' human gates — review before send, sign-off before publish, escalation to a person — are the enumeration. Nothing else is an exception.

A schedule a person set is a person's act, not an exception: the person chose the thing and the time once, and the harness carries it out. Anything the harness does traces back to a person's request, a person's tap, or a person's schedule.

## Read scope

Decided per source in the review.

- **The invoking person's scope.** The harness reads what the person using it may read, at the moment they ask — CRM, support scores, donation totals, everything their role and contracts include. The harness holds no read scope of its own.
- **Designated sources: a tenant act.** The Org Admin designates corpora the harness may ground in regardless of the invoker's scope — strategy documents, the knowledge base, the organization's context layer ([spec/coaching.md § The organization's context layer](coaching.md#the-organizations-context-layer)), geo data — per audience: org-wide, per role, per coach. Designation is logged, and the whole list sits in one place a client can audit. A document held under a sharing contract can never be designated, because the platform is never a party to a contract ([ADR-017](../decisions/017-sharing-contract-trust-model.md)).
- **Compartmented data.** The harness reads data under a sharing contract only under the contract of the person who invoked it, never more than that person could read, and never in the background. The read is logged as that person's read through the harness. The no-superuser-read-path rule of [comms-intelligence.md § 8.5](comms-intelligence.md#85-access-and-retention) binds the harness absolutely — operators and support staff included.
- **Background reads: only for schedules a person set.** A briefing or digest may be prepared in the background, reading only designated sources and what the subscribing person may read, evaluated under their scope at preparation time. Never compartmented data.
- **Exclusions.** The harness never reads credentials, keys or secrets; a person's private messages not addressed to or shared with the invoker; anything a lane's policy marks off-limits.
- **Cross-tenant: never a reach, only a delivery.** The harness never reaches into another tenant's instance. Cross-tenant material arrives only as contract-filtered events on the bus ([ADR-024](../decisions/024-event-bus-as-federation.md)) — filtered at the source, field by field, deny by default, opaque in transit. Once delivered, it sits in this instance under the contract it arrived under, and the harness reads it only under the compartmented-data rule above. An alliance's harness reads the alliance's own instance — its records plus what members' contracts delivered — and never a member's enclave.

## The model router

Every model call in an instance goes through that tenant's **model router**. No feature calls a provider directly. The router is the single choke point where provider sovereignty is enforced and metering happens.

- **Provider policy is per tenant.** The tenant chooses BYOM — its own provider, endpoint and credentials ([ADR-016](../decisions/016-cross-cutting-resolutions.md) §38) — or the platform default. BYOM extends to any endpoint the tenant names, including a self-hosted model, so a tenant can keep inference entirely inside its own infrastructure.
- **Routing rules by data class.** The tenant, starting from lane-supplied defaults, says which providers may carry which classes of data: public corpus material (press, broadcasts) may go to an external API; prompts carrying personal data go only to providers meeting the tenant's residency rules; compartmented data never leaves the tenant's encryption boundary and reaches only in-boundary endpoints.
- **Standing requirements for any provider,** BYOM or platform: no training on tenant prompts or data; declared retention limits; disclosed as a sub-processor where the law requires ([spec/compliance.md § Automated processing and the harness](compliance.md#automated-processing-and-the-harness)).
- **The boundary warning.** When a tenant names an external endpoint, the settings screen shows the warning of [system.md § The harness and the model router](../design/architecture/system.md#the-harness-and-the-model-router) in plain language: prompt data leaves the encryption boundary.
- **Metering.** Every call is a usage event with an actor under [ADR-019](../decisions/019-central-services-and-metered-billing.md), priced by the lane's rule ([ADR-026](../decisions/026-two-lane-pricing.md)). Under BYOM the provider bills the tenant directly and nothing passes through.
- **The settings screen.** Providers, credentials, routing rules per data class, the boundary warning and current metering are configured on one admin-UI screen, owed by [ADR-016](../decisions/016-cross-cutting-resolutions.md) and the review's item 8. Credentials live in the tenant's key store like every other tenant-owned credential.

## Personas

A **persona** is the harness with a name, instructions, designated context and a declared operation set. There is one harness; personas are how it presents itself.

- **The chat** is the general case: the harness's primary interface, acting as the person's hands, carrying the operations of every enabled module ([ADR-023](../decisions/023-surfaces-chat-admin-field.md)).
- **A coach** is a persona with a role's instructions and context documents. The bounded coach — reads the conversation, attachments and its designated documents, holds no operations, never speaks first — has none of the four gated properties and ships outside the gate ([spec/coaching.md](coaching.md)). A coach with declared operations is the chat by another name and follows the same rules.
- **The Campaign Agent** is the chat with the content modules enabled: a persona and a module set, not a module.

## Audit and retention

The audit model's rule: **the person is the actor, the harness is the channel.** No non-human actor type exists, and no log entry's author is ever a model.

- Every harness-mediated read and write logs: the person as actor; the harness component as channel (chat, a named coach, a builder); the manifest operation invoked; and for writes the confirmation reference — the tap, or the schedule the person set.
- **The trigger** records what the harness responded to: a person's request, a confirmation tap, or a person's schedule. A scheduled briefing logs the subscriber as actor, the harness as channel, their schedule as trigger.
- **Retention follows [ADR-016](../decisions/016-cross-cutting-resolutions.md) §4's tiers, with no new tier.** Prompt and response bodies are Operational-tier content: OA-configurable between 90 days and 5 years, default 2 years, purged like message bodies, covered by deletion and export. Call metadata is audit-trail-tier, indefinite: who asked, channel, provider and model, router policy version, tokens and cost, operation, confirmation reference.
- **Provenance, not explanation.** Model output shows what it stood on — the designated sources and context used, the operation, the model and provider, citations for factual claims — adapting [comms-intelligence.md § 8.2](comms-intelligence.md#82-provenance-is-mandatory). Rule-based suggestions still show their rule and inputs.

## Security

The harness enters the threat model as an attack surface, not a principal: the confused deputy an attacker steers through content it reads. The full treatment is at [spec/security.md § The agent harness](security.md#the-agent-harness) and [§ Prompt injection](security.md#prompt-injection). The load-bearing rules:

- **Untrusted content is data, never instructions.** Monitored articles and posts, inbound messages and email, CSV imports, web pages and bus events are marked untrusted at ingestion and never enter the instruction channel. Designated documents and org-written instructions are trusted by designation, and designation changes are logged.
- **Injection can propose, never dispose.** A steered harness still has only declared operations, and every write needs a person's tap. The confirmation card is the tripwire.
- **Exfiltration is bounded by routing.** Compartmented data never reaches an external endpoint, whatever the harness is steered into asking for.

## Offline

No harness step sits on any path [ADR-005](../decisions/005-offline-first-sync.md) requires to work offline — canvassing, voter registration, event check-in, poll-watcher results, sync. A manifest may not declare a field capability that depends on a model call. When there is no connection, harness surfaces say so plainly and offer cached conversations; the admin UI and the field app are unaffected. No writes queue: every write is confirmed live, so there is nothing to queue.

## Cost

Inference is a metered usage event, priced by each lane's rule; under BYOM the provider bills the tenant directly. With the chat as a main surface, inference is a cost of ordinary daily work, not a marginal one, and the lane price rules treat it as a line item. What "cost" includes, what the platform default tier carries, and whether any free tier has a metered allowance are [ADR-026](../decisions/026-two-lane-pricing.md)'s open questions, not this document's.

## Open questions

- **The owed screens.** The provider settings screen (review item 8), the audit viewer's channel facet, and their screen-inventory and wireframe entries.
- **The pricing arithmetic**, at [ADR-026](../decisions/026-two-lane-pricing.md).
- **Who may write a coach**, at [spec/coaching.md § Open questions](coaching.md#open-questions) — also a security question, since org-written instructions are trusted by designation.
