# ADR-024: The Event Bus as Federation

**Status:** Proposed
**Date:** 2026-11-13
**Sources:** `spec/users.md`, `spec/mvp.md`, `design/architecture/system.md`, `diary/13-services-a-la-carte.md`, `decisions/001-platform-architecture.md`, `decisions/017-sharing-contract-trust-model.md`, `decisions/019-central-services-and-metered-billing.md`, `decisions/022-core-modules-and-lanes.md`

## Context

[system.md § System Topology](../design/architecture/system.md#system-topology) draws three layers. The middle one is a federation layer that "mediates cross-tenant interactions": alliance coordination, shared resources, dedup across organizations and joint campaigns. It operates on explicit sharing rules and by design never holds tenant data. It is still a central component that every cross-organization flow passes through, and it has to be trusted with that flow.

Two things in the corpus point at a different shape. Each instance already runs its own NATS JetStream event stream, for analytics ([system.md § Analytics Architecture](../design/architecture/system.md#analytics-architecture)). And the alliance services board recorded in [diary entry 13](../diary/13-services-a-la-carte.md) drew three sealed enclaves, the alliance and MVC and PIP, with flows between them and nothing in the middle that holds data.

The new direction states it outright: separate deployments per organization, an event service bus between them, and the alliance as a third organization that subscribes.

This ADR is `Proposed`. The bus replacing the federation layer is not yet agreed. One thing in it is decided, and is marked: the Asociación de Publicistas works exactly like the Alianza.

### Conflicts this ADR resolves

1. **[system.md § System Topology](../design/architecture/system.md#system-topology)** has a central federation layer. This ADR proposes to replace it with contract-filtered event exports between instances.
2. **[ADR-001 § Federation model over monolithic multi-tenancy](001-platform-architecture.md#federation-model-over-monolithic-multi-tenancy)** and **[users.md § Organization Hierarchy](../spec/users.md#organization-hierarchy)** make an alliance a "lightweight coordination tenant" that does not replicate the full platform stack. In this direction the alliance is a client like any other, with its own instance. Under [ADR-022](022-core-modules-and-lanes.md) the two readings can meet, since an instance with few modules enabled is a light one. That reading is proposed here, not decided.
3. **[system.md § Cross-channel orchestration engine](../design/architecture/system.md#cross-channel-orchestration-engine)** specifies mutual suppression as a central service that asks each member and combines the flags ([ADR-019](019-central-services-and-metered-billing.md)). This ADR proposes it as request and reply over the bus. The rules are the same; the carrier changes.
4. **[users.md § Multi-org membership](../spec/users.md#multi-org-membership)** lets "the alliance layer" see that a person exists across member tenants. With no central layer and no shared identity ([ADR-025](025-identity-per-client.md)), that visibility exists only as a contract term between instances.

## Decision

### Inside one organization: the event stream becomes the integration spine

Proposed.

The per-instance event stream stops being an analytics pipeline only and becomes the instance's integration spine. The Core and modules publish domain events: `person.created`, `consent.changed`, `interaction.recorded`, `donation.received`, `content.approved`. Modules, connectors and dashboards consume them. A module's manifest names what it publishes and what it consumes ([ADR-022 § The module contract](022-core-modules-and-lanes.md#the-module-contract)).

Usage events already travel on this stream ([ADR-019 § The catalogue, entitlements and metering live in the platform layer](019-central-services-and-metered-billing.md#the-catalogue-entitlements-and-metering-live-in-the-platform-layer)). Nothing about them changes.

### Between organizations: contract-filtered exports

Proposed.

Each organization exports a filtered subset of its stream to the instances it has contracts with. The alliance is a third organization with its own instance. It subscribes to its members' exports and publishes back: joint campaigns, suppression requests, shared talking points.

The rules that make it safe:

- **Filtered at the source.** What leaves an instance is decided by the sharing contract before it is published, field by field, deny by default ([ADR-017](017-sharing-contract-trust-model.md)). Nothing raw crosses and gets filtered later.
- **Opaque in transit.** Payloads are encrypted under the contract's keys, which the members hold. Any relay GreenGrass operates sees routing metadata, never content. That keeps the platform out of every contract, as [ADR-017 § Consequences](017-sharing-contract-trust-model.md#consequences) requires.
- **Revocation stops the export.** Events already delivered are not clawed back, which is ADR-017's existing rule. Both sides see who cut access and when.
- **Consent travels first.** `consent.changed` events cross every contract that covers the person, ahead of other events.
- **Mutual suppression is request and reply over the bus.** Matching uses the second blind index keyed per alliance contract ([system.md § Cross-channel orchestration engine](../design/architecture/system.md#cross-channel-orchestration-engine)). A member that does not answer is not a veto.
- **Durable consumers absorb intermittent connections.** An instance that goes offline catches up from where it stopped.

**Verify:** that NATS supports exporting and importing streams across accounts and leaf nodes in the way this needs. The deployment topology is separate clusters, sometimes separate clouds ([ADR-001](001-platform-architecture.md)), and it has to be confirmed to work with that before anything is committed.

**Alternatives considered:** Keeping the central federation layer and adding the bus beside it was rejected because it leaves in place the one central piece that has to be trusted with cross-organization flow, which is the thing the bus removes. Exporting raw events and filtering them at the receiver, or at a relay, was rejected because it puts unfiltered member data outside the member's instance, where the contract can no longer be enforced by the party that granted it.

### The bus replaces the central federation layer

Proposed, and not yet agreed.

Federation becomes contract-filtered event exports between instances, with no central component that holds or mediates cross-organization data. This is a simplification: it removes the one central piece that had to be trusted with cross-tenant flow. It is also an architectural change, and until this ADR is accepted the three-layer topology in [system.md § System Topology](../design/architecture/system.md#system-topology) stands, with the bus drawn beside it as a proposal.

What the platform layer keeps is what does not carry organization data: provisioning, the catalogue, entitlements and metering, and any relay, which sees routing metadata only. Identity leaves it under [ADR-025](025-identity-per-client.md).

### The same shape in the commercial lane

**Decided.** The Asociación de Publicistas works exactly like the Alianza. It has its own instance, each member agency has its own instance, and they connect through sharing contracts and the bus. Nothing new is needed:

- Sharing is deny by default and field by field, and any member can cut it alone ([ADR-017 § Uniform terms at every rung](017-sharing-contract-trust-model.md#uniform-terms-at-every-rung)).
- The Asociación can pay its members' metered costs, using the `alliance_pays` billing mode [ADR-019 § An alliance may pay for its members, as an onboarding setting](019-central-services-and-metered-billing.md#an-alliance-may-pay-for-its-members-as-an-onboarding-setting) already defines.
- Coalition Trust is therefore a module for both lanes ([ADR-022 § The module catalogue](022-core-modules-and-lanes.md#the-module-catalogue)).

What is decided is the shape: an association of agencies is an alliance of parties under another name, and gets no mechanism of its own. Whether the connection between instances runs over the bus proposed above or through the federation layer as specified today follows from whether this ADR is accepted.

### Open questions

1. **Does the bus replace the central federation layer?** This has to be agreed before this ADR can be accepted.
2. **The NATS check** marked *Verify* above.
3. **The alliance as a full client or a lightweight tenant.** Conflict 2 above. The reading proposed here is that "lightweight" means few modules enabled.
4. **A proving exercise.** The direction proposes a political-lane spike with a real MVC export: the CSV round trip of ADR-027, then mutual suppression between two instances over the bus. It is not scheduled.

### Housekeeping: amendment banners

This ADR adds an **Amendment proposed by** line to [ADR-001](001-platform-architecture.md), for the federation model. ADR-001 stands as written until this ADR is accepted.

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
- Until this ADR is accepted, the federation layer in `system.md` is the specified design

**Related ADRs:** [ADR-001](001-platform-architecture.md) (amendment proposed: the federation model's central layer; instance isolation unchanged), [ADR-017](017-sharing-contract-trust-model.md) (the contract filters every export), [ADR-019](019-central-services-and-metered-billing.md) (usage events on the same stream; `alliance_pays`; mutual suppression), [ADR-022](022-core-modules-and-lanes.md) (events are Core; Coalition Trust is a module for both lanes), [ADR-025](025-identity-per-client.md) (no shared identity to match people through), ADR-027 (the connector worker sits behind the bus)
