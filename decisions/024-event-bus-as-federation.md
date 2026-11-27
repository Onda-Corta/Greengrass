# ADR-024: The Event Bus between Instances

**Status:** Accepted
**Date:** 2026-11-13
**Accepted:** 2026-11-26 — the bus replaces the central layer, the alliance is a client like any other ("lightweight" means few modules enabled), and the export filter and the import landing are named Core components. The NATS features the bus needs stay marked **Verify:** until confirmed.
**Sources:** `spec/users.md`, `spec/mvp.md`, `design/architecture/system.md`, `diary/13-services-a-la-carte.md`, `decisions/001-platform-architecture.md`, `decisions/017-sharing-contract-trust-model.md`, `decisions/019-central-services-and-metered-billing.md`, `decisions/022-core-modules-and-lanes.md`

## Context

[system.md § System Topology](../design/architecture/system.md#system-topology) draws three layers. The middle one is a federation layer that "mediates cross-tenant interactions": alliance coordination, shared resources, dedup across organizations and joint campaigns. It operates on explicit sharing rules and by design never holds tenant data. It is still a central component that every cross-organization flow passes through, and it has to be trusted with that flow.

Two things in the corpus point at a different shape. Each instance already runs its own NATS JetStream event stream, for analytics ([system.md § Analytics Architecture](../design/architecture/system.md#analytics-architecture)). And the alliance services board recorded in [diary entry 13](../diary/13-services-a-la-carte.md) drew three sealed enclaves, the alliance and MVC and PIP, with flows between them and nothing in the middle that holds data.

The new direction states it outright: separate deployments per organization, an event service bus between them, and the alliance as a third organization that subscribes.

This ADR was `Proposed` when written and is accepted as of 2026-11-26. What it decided is marked.

### Conflicts this ADR resolves

1. **[system.md § System Topology](../design/architecture/system.md#system-topology)** had a central federation layer. This ADR replaces it with contract-filtered event exports between instances.
2. **[ADR-001 § Affiliation over monolithic multi-tenancy](001-platform-architecture.md#affiliation-over-monolithic-multi-tenancy)** and **[users.md § Organization Hierarchy](../spec/users.md#organization-hierarchy)** made an alliance a "lightweight coordination tenant" that does not replicate the full platform stack. Resolved: the alliance is a client like any other, with its own instance, and under [ADR-022](022-core-modules-and-lanes.md) the two readings meet — "lightweight" means an instance with few modules enabled.
3. **[system.md § Cross-channel orchestration engine](../design/architecture/system.md#cross-channel-orchestration-engine)** specified mutual suppression as a central service that asks each member and combines the flags ([ADR-019](019-central-services-and-metered-billing.md)). This ADR makes it request and reply over the bus. The rules are the same; the carrier changes.
4. **[users.md § Multi-org membership](../spec/users.md#multi-org-membership)** let "the alliance layer" see that a person exists across member tenants. With no central layer and no shared identity ([ADR-025](025-identity-per-client.md)), that visibility exists only as a contract term between instances.

## Decision

### Inside one organization: the event stream becomes the integration spine

Decided 2026-11-26.

The per-instance event stream stops being an analytics pipeline only and becomes the instance's integration spine. The Core and modules publish domain events: `person.created`, `consent.changed`, `interaction.recorded`, `donation.received`, `content.approved`. Modules, connectors and dashboards consume them. A module's manifest names what it publishes and what it consumes ([ADR-022 § The module contract](022-core-modules-and-lanes.md#the-module-contract)).

Usage events already travel on this stream ([ADR-019 § The catalogue, entitlements and metering live in the platform layer](019-central-services-and-metered-billing.md#the-catalogue-entitlements-and-metering-live-in-the-platform-layer)). Nothing about them changes.

### Between organizations: contract-filtered exports

Decided 2026-11-26.

Each organization exports a filtered subset of its stream to the instances it has contracts with. The alliance is a third organization with its own instance. It subscribes to its members' exports and publishes back: joint campaigns, suppression requests, shared talking points.

Two Core components carry this, named here and specified in [system.md § The event bus between instances](../design/architecture/system.md#the-event-bus-between-instances):

- **The export filter.** The component that turns a sharing contract into the source-side filter on the instance's stream: field by field, deny by default, before anything is published. A contract change recompiles the filter; a revocation stops the export there.
- **The import landing.** The component that writes delivered events into the receiving instance's store, tagged with the contract they arrived under and marked untrusted at ingestion. Once landed, a delivered event is read under the compartmented-data rules — by people ([ADR-017](017-sharing-contract-trust-model.md)) and by the harness alike ([spec/harness.md § Read scope](../spec/harness.md#read-scope)).

Event schemas are a contract between instances that may run different versions. Schema versions are declared per export and an export never emits a version the receiving instance has not said it understands.

The rules that make it safe:

- **Filtered at the source.** What leaves an instance is decided by the sharing contract before it is published, field by field, deny by default ([ADR-017](017-sharing-contract-trust-model.md)). Nothing raw crosses and gets filtered later.
- **Opaque in transit.** Payloads are encrypted under the contract's keys, which the members hold. Any relay GreenGrass operates sees routing metadata, never content. That keeps the platform out of every contract, as [ADR-017 § Consequences](017-sharing-contract-trust-model.md#consequences) requires.
- **Revocation stops the export.** Events already delivered are not clawed back, which is ADR-017's existing rule. Both sides see who cut access and when.
- **Consent travels first.** `consent.changed` events cross every contract that covers the person, ahead of other events.
- **Mutual suppression is request and reply over the bus.** Matching uses the second blind index keyed per alliance contract ([system.md § Cross-channel orchestration engine](../design/architecture/system.md#cross-channel-orchestration-engine)). A member that does not answer is not a veto.
- **Durable consumers absorb intermittent connections.** An instance that goes offline catches up from where it stopped.
- **Bus events are untrusted input.** A payload delivered under a contract is data, never instructions. The import landing marks it untrusted at ingestion, as [security.md § Prompt injection](../spec/security.md#prompt-injection) names bus events from counterparties an injection vector.

**Verify:** that NATS supports exporting and importing streams across accounts and leaf nodes in the way this needs. The deployment topology is separate clusters, sometimes separate clouds ([ADR-001](001-platform-architecture.md)), and it has to be confirmed to work with that before anything is committed.

**Alternatives considered:** Keeping the central federation layer and adding the bus beside it was rejected because it leaves in place the one central piece that has to be trusted with cross-organization flow, which is the thing the bus removes. Exporting raw events and filtering them at the receiver, or at a relay, was rejected because it puts unfiltered member data outside the member's instance, where the contract can no longer be enforced by the party that granted it.

### The bus replaces the central layer

Decided 2026-11-26.

Cross-organization flow becomes contract-filtered event exports between instances, with no central component that holds or mediates cross-organization data. This is a simplification: it removes the one central piece that had to be trusted with cross-tenant flow. The three-layer topology in [system.md § System Topology](../design/architecture/system.md#system-topology) is superseded; the document keeps the old layer visible as the design this replaces.

What the old layer carried is re-homed, not dropped: alliance coordination and joint campaigns live in the alliance's own instance and travel as events; shared talking points are published back the same way; mutual suppression is request and reply over the bus. Cross-organization dedup — the old layer's promise to see that a person exists across member tenants — has no replacement: with no shared identity ([ADR-025](025-identity-per-client.md)) and no central layer, matching people across instances exists only as a contract term, and mutual suppression's contract-keyed blind index is the only such term specified. Anything more is open, and [ADR-025](025-identity-per-client.md) already records the gap.

What the platform layer keeps is what does not carry organization data: provisioning, the catalogue, entitlements and metering, and any relay, which sees routing metadata only. Identity leaves it under [ADR-025](025-identity-per-client.md).

### The same shape in the commercial lane

**Decided.** The Asociación de Publicistas works exactly like the Alianza. It has its own instance, each member agency has its own instance, and they connect through sharing contracts and the bus. Nothing new is needed:

- Sharing is deny by default and field by field, and any member can cut it alone ([ADR-017 § Uniform terms at every rung](017-sharing-contract-trust-model.md#uniform-terms-at-every-rung)).
- The Asociación can pay its members' metered costs, using the `alliance_pays` billing mode [ADR-019 § An alliance may pay for its members, as an onboarding setting](019-central-services-and-metered-billing.md#an-alliance-may-pay-for-its-members-as-an-onboarding-setting) already defines.
- Coalition Trust is therefore a module for both lanes ([ADR-022 § The module catalogue](022-core-modules-and-lanes.md#the-module-catalogue)).

What is decided is the shape: an association of agencies is an alliance of parties under another name, and gets no mechanism of its own. With this ADR accepted, the connection between instances runs over the bus decided above.

### Open questions

1. ~~**Does the bus replace the central layer?**~~ — **RESOLVED 2026-11-26.** Yes; this ADR is accepted.
2. **The NATS check** marked *Verify* above. Unresolved; the marker stands until it is confirmed.
3. ~~**The alliance as a full client or a lightweight tenant.**~~ — **RESOLVED 2026-11-26.** A full client; "lightweight" means few modules enabled (conflict 2 above).
4. **A proving exercise.** The direction proposes a political-lane spike with a real MVC export: the CSV round trip of [ADR-027](027-third-party-crm-sync-and-connectors.md), then mutual suppression between two instances over the bus. It is not scheduled.

### Housekeeping: amendment banners

This ADR's **Amendment proposed by** line on [ADR-001](001-platform-architecture.md) became **Amended by** on acceptance, and the affiliation section there is rewritten accordingly.

## Consequences

**Benefits:**
- No central component holds or mediates cross-organization data, so there is one less thing to trust and one less thing to breach
- The mechanism that connects two parties connects an association and its agencies, with no new machinery
- The platform stays out of every contract in transit as well as at rest
- Intermittent connectivity between instances is absorbed by the stream, not handled by each feature
- Modules, connectors and dashboards share one way of hearing about a change

**Costs:**
- An architectural change to a decided topology, with the migration of every cross-organization feature onto events
- Event schemas become a contract between instances that may run different versions ([ADR-022 § What the lanes require of the design](022-core-modules-and-lanes.md#what-the-lanes-require-of-the-design))
- Enforcement at the source means a filtering bug is a leak, the cost [ADR-017](017-sharing-contract-trust-model.md) already names for contracts
- The topology depends on NATS features that are not yet verified across separate clusters and clouds

**Constraints:**
- The platform is never a party to a contract ([ADR-017](017-sharing-contract-trust-model.md)); a relay never sees content
- Nothing leaves an instance that the sharing contract has not allowed, field by field, before it is published
- Person-level consent overrides contract terms, and consent changes are delivered first
- An unanswered member is never a veto
- Delivered events are marked untrusted at ingestion and read under the compartmented-data rules
- The NATS features the bus needs are marked **Verify:** and remain unverified; nothing here asserts them

**Related ADRs:** [ADR-001](001-platform-architecture.md) (amended: the central layer of the affiliation model; instance isolation unchanged), [ADR-017](017-sharing-contract-trust-model.md) (the contract filters every export), [ADR-018](018-ai-agent-posture.md) (the harness reads cross-tenant material only as delivered bus events), [ADR-019](019-central-services-and-metered-billing.md) (amended: mutual suppression leaves the catalogue; usage events on the same stream; `alliance_pays`), [ADR-022](022-core-modules-and-lanes.md) (events are Core; Coalition Trust is a module for both lanes), [ADR-025](025-identity-per-client.md) (no shared identity to match people through), [ADR-027](027-third-party-crm-sync-and-connectors.md) (the connector worker sits behind the bus)
