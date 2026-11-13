# ADR-027: Third-Party CRM Sync & Connectors

**Status:** Proposed
**Date:** 2026-11-13
**Sources:** `spec/integrations.md`, `spec/mvp.md`, `spec/compliance.md`, `design/architecture/system.md`, `decisions/002-security-threat-model.md`, `decisions/004-data-model-integrity.md`, `decisions/005-offline-first-sync.md`, `decisions/012-external-integrations.md`, `decisions/017-sharing-contract-trust-model.md`, `decisions/022-core-modules-and-lanes.md`, `decisions/024-event-bus-as-federation.md`

## Context

[integrations.md § Migration from Other Platforms](../spec/integrations.md#migration-from-other-platforms) decided how an organization arrives from another tool: migration guides plus the generic import. That is a one-way path. It assumes the organization leaves the tool it had.

Victoria Ciudadana runs NationBuilder ([mvp.md § MVC — Movimiento Victoria Ciudadana](../spec/mvp.md#mvc-movimiento-victoria-ciudadana)). Without sync, adopting the platform means leaving NationBuilder, which is the migration the MVP deliberately avoided. With sync, an organization can keep NationBuilder as its system of record and add modules beside it, coalition tools first. "No migration" becomes a product position, not just a pilot shortcut.

The direction also proposes Parsons, Movement Co-op's Python library, as the connector layer, for interoperability with the tools the US left already runs and visibility among the people who run them.

This ADR is `Proposed`. One requirement in it is decided, and is marked: NationBuilder sync, starting with a CSV round trip. API sync and Parsons are proposed, and three facts they rest on are not yet verified.

### Conflicts this ADR resolves

1. **[integrations.md § Migration from Other Platforms](../spec/integrations.md#migration-from-other-platforms)** decides "migration guides + generic import", one way. Sync is two ways.
2. **[ADR-012](012-external-integrations.md)** is the integration strategy, and it has no decision about other campaign platforms at all. The migration decision lives only in `integrations.md`. ADR-012 gets a banner so that a reader of the integration ADR finds this one.
3. **[system.md § Technology Stack](../design/architecture/system.md#technology-stack)** decides a TypeScript backend. Parsons is Python.
4. **[mvp.md § 1. Context](../spec/mvp.md#1-context)** describes the full platform as one that "asks a political party to migrate everything it does onto a new tool". With sync it no longer has to.

## Decision

### NationBuilder sync is required, starting with CSV

**Decided.** The core CRM syncs both ways with third-party tools. NationBuilder comes first, and CSV comes first, to bring in MVC.

NationBuilder sync is a political-lane priority. The sync rules and the connectors live in the Core, so the commercial lane gets them for its own tools without extra work.

### Phase A: the CSV round trip

Decided as a requirement. The details below are the proposed design for it.

- **In:** import NationBuilder's people export. `mvp.md` already lists its stable field names, from `nationbuilder_id` to `mobile_opt_in`. Map those fields once and save the mapping.
- **Out:** export changes as a CSV that NationBuilder can import, keyed by `nationbuilder_id`.
- **Cadence:** whatever the organization works at. That is what the MVP assumes anyway.
- **No standing access:** this needs no API access, no OAuth app, and no ongoing credentials stored in the instance.

Phase A extends the import pipeline and the export formats `integrations.md` already specifies. What is new is that the two are a pair: a saved mapping, an external identifier, and an export that the other tool can read back.

### Phase B: API sync

Proposed.

The same mapping, run continuously through a connector, using webhooks or polling with incremental cursors. Phase A's rules carry over unchanged.

### The rules live in the core CRM, not in the connector

Proposed. They apply to both phases.

- **Identity crosswalk.** Each person has an external-ID map (`nationbuilder_id` ↔ the person's own ID). Inbound records go through suggest-and-confirm dedup ([ADR-004 § Suggest-and-confirm deduplication](004-data-model-integrity.md#suggest-and-confirm-deduplication)). Sync never merges people on its own.
- **System of record per field.** The organization chooses, per field, which side wins. It sets this once, when it connects.
- **Conflicts are kept on both sides and flagged for a person,** as merge-and-flag already does for offline sync ([ADR-005](005-offline-first-sync.md)).
- **Consent is asymmetric.** An opt-out or `do_not_contact` crosses both ways and the most restrictive value wins, whoever owns the field. An opt-in never overrides a newer opt-out.
- **Field scope is deny by default.** `support_level`, `tags` and encrypted fields stay out unless switched on. Fields synced in remain subject to sharing contracts: arriving through sync never puts a field in a coalition's shared view ([ADR-017](017-sharing-contract-trust-model.md)).
- **The perimeter.** Data sent to NationBuilder leaves the BYOK boundary. That needs the same acknowledgement BYOM requires ([system.md § BYOM architecture](../design/architecture/system.md#byom-architecture)). For the Puerto Rico alpha, NationBuilder's US hosting is the same jurisdiction, so residency is a light question there. In Brazil or India it is not, and [compliance.md § Cross-Border Data Transfers](../spec/compliance.md#cross-border-data-transfers) applies.
- **Audit.** Every sync batch is an audit entry, with the connector as the actor.

**Alternatives considered:** Keeping the rules in connector scripts was rejected because each connector would then reimplement the crosswalk, per-field ownership, consent precedence and conflict handling differently, and consent is the one rule that cannot be allowed to vary by tool.

### Sync is not a module

Proposed.

Sync is a core CRM capability exposed through connectors. A connector is a link to an outside tool; it sits in the integration hub ([system.md § Integration Architecture](../design/architecture/system.md#integration-architecture)) and is not a module ([ADR-022 § Vocabulary](022-core-modules-and-lanes.md#vocabulary)). Connectors are catalogued and enabled per organization, as integrations are.

### Parsons as the connector layer

Proposed, pending the checks below.

Why it fits:

- It is open source and built for progressive organizations.
- It already connects to much of the US left's stack: VAN/EveryAction, ActBlue, Action Network, Mobilize, Google Sheets and data warehouses.
- Contributing a connector to Parsons would make the platform a destination in other organizations' pipelines. That is real visibility, not a marketing claim.

What to plan for:

- **Stack.** The decided backend is TypeScript. Parsons is Python. It would run as a separate connector worker container in each instance, consuming from and publishing to the event bus ([ADR-024](024-event-bus-as-federation.md)). The bus is what makes the language split clean: the worker never touches the database directly.
- **Batch versus sync.** Parsons is an ETL library built for batch jobs. That suits Phase A and scheduled syncs. The two-way rules above have to live in the core CRM, not in Parsons scripts.
- **Reach.** Its connectors are largely US-centric. Brazil, Thailand, India and Lebanon will need connectors Parsons does not have. Parsons is the interoperability layer for the US left and Puerto Rico, not the whole connector story.
- **Threat model.** A large Python dependency tree is a supply-chain surface under [ADR-002](002-security-threat-model.md). Pin and vendor dependencies. Run the worker sandboxed, holding only its own connector's credential, fetched from Vault.

**Verify before committing.** None of these is asserted here:

- **Verify:** that Parsons has a NationBuilder connector, and what it covers: people only, or donations and events too.
- **Verify:** Parsons' licence.
- **Verify:** NationBuilder's API rate limits and webhook coverage, for Phase B.

**Alternatives considered:** Writing every connector in TypeScript inside the application was the default the stack implies. Parsons is proposed over it for the connectors it already has and for the standing it gives among the organizations that use it. Neither argument holds if the checks above fail.

### Open questions

1. **Parsons:** adopt it as the connector layer for the US left and Puerto Rico, after the verification above.
2. **The three *Verify* items.**
3. **A proving exercise.** The direction proposes a political-lane spike with a real MVC export: Phase A's CSV round trip with Parsons, then mutual suppression between two instances over the bus ([ADR-024](024-event-bus-as-federation.md)). It is not scheduled.
4. **The pilot.** [mvp.md](../spec/mvp.md) specifies the pilot as ingest-only. Whether Phase A's outbound half joins the pilot is not decided here, and the pilot plan is unchanged.

### Housekeeping: amendment banners

This ADR adds an **Amended by** line to [ADR-012](012-external-integrations.md), for the decided requirement, which also notes what is proposed.

## Consequences

**Benefits:**
- An organization can adopt the platform without leaving the tool it runs today
- MVC arrives with its NationBuilder data and its consent flags intact, and can send changes back
- One set of sync rules serves every connector and both lanes
- Phase A needs no credentials and no API, so it can exist before any connector does
- If Parsons holds up, the platform reaches a set of tools it would otherwise integrate one by one

**Costs:**
- Two-way sync is harder than one-way import: conflicts, per-field ownership and an external identifier on every person
- A second language and a second runtime in every instance, if Parsons is adopted
- Data sent to an outside CRM leaves the encryption boundary, and the client has to accept that knowingly
- The Parsons proposal rests on three unverified facts

**Constraints:**
- Sync never merges people on its own; dedup is suggest-and-confirm ([ADR-004](004-data-model-integrity.md))
- An opt-out always crosses, and the most restrictive consent value wins
- Sensitive fields stay out of sync unless switched on, and a synced field never enters a shared view by arriving
- A connector holds only its own credential and never reaches the database directly
- Nothing marked *Verify* may be treated as true

**Related ADRs:** [ADR-002](002-security-threat-model.md) (supply-chain surface of the connector worker), [ADR-004](004-data-model-integrity.md) (suggest-and-confirm dedup; audit entries per batch), [ADR-005](005-offline-first-sync.md) (merge-and-flag conflict handling), [ADR-012](012-external-integrations.md) (amended: third-party CRM sync joins the integration strategy), [ADR-017](017-sharing-contract-trust-model.md) (synced fields stay under sharing contracts), [ADR-022](022-core-modules-and-lanes.md) (sync is Core; a connector is not a module), [ADR-024](024-event-bus-as-federation.md) (the connector worker sits behind the bus)
