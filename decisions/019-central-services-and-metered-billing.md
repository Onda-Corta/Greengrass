# ADR-019: Central Services & Metered Billing

**Status:** Accepted
**Date:** 2026-09-28
**Sources:** `spec/fundraising.md`, `spec/product.md`, `spec/users.md`, `spec/mvp.md`, `spec/comms-intelligence.md`, `spec/workflows.md`, `design/architecture/system.md`

## Context

The architecture has three layers ([system.md § System Topology](../design/architecture/system.md#system-topology)): a platform layer that sees across tenants and holds identity, provisioning, administration and billing; a federation layer that mediates cross-tenant flow under sharing rules and never holds tenant data; and a tenant layer where every capability runs as a per-tenant instance. That decomposition has held for every feature the corpus specified, because every feature so far runs on the tenant's own data inside the tenant's own instance.

The alliance communications work and the post-MVP roadmap describe capabilities that do not fit that shape. Capturing press, broadcast and social coverage over public sources ([comms-intelligence.md § 9. The iterations](../spec/comms-intelligence.md#9-the-iterations), Iteration 3), analysing public electoral results, generating text, images and video, and transporting messages through channel providers are shared capabilities with per-tenant consumption. Running a media corpus once per tenant is wasteful; running it once for everyone and letting tenants draw on it is the obvious design. The platform layer has no place for that: no catalogue of what exists, no record of which tenant has enabled what, and no way to measure use.

The pricing decision does not fit either. [fundraising.md § Platform Revenue Model](../spec/fundraising.md#platform-revenue-model) decided flat subscription tiers, "not tied to donation volume, user count, or any usage metric", and [ADR-007 § Zero platform fee on donations](007-fundraising-payments.md#zero-platform-fee-on-donations) restates it as "flat tiers, not usage-based". The product description had already carved out the exception the platform would need: one set fee "with the exception of unavoidable variable costs such as SMS sends, which are usually billed by volume by the supplier" ([product.md](../spec/product.md)). Model inference, media capture and content generation are that class of cost. [ADR-018](018-ai-agent-posture.md) named per-token inference against flat pricing as one of the things its review must resolve; this ADR answers it.

One more fact shapes the decision. The pilot's two parties are unequal in tooling and resources, and [mvp.md § The asymmetry is the most important fact in this plan](../spec/mvp.md#the-asymmetry-is-the-most-important-fact-in-this-plan) warns that tooling friction must not be allowed to masquerade as unwillingness. Metering makes cost visible per tenant. That removes a free-rider problem and creates an affordability one, and the design has to answer both.

### Conflicts this ADR resolves

Following [ADR-016](016-cross-cutting-resolutions.md) and [ADR-017](017-sharing-contract-trust-model.md), the conflicts with accepted decisions are named here and resolved below.

1. **[fundraising.md § Platform Revenue Model](../spec/fundraising.md#platform-revenue-model)** rules out "any usage metric". Metered pass-through is a usage metric.
2. **[ADR-007 § Zero platform fee on donations](007-fundraising-payments.md#zero-platform-fee-on-donations)** says revenue comes from "flat tiers, not usage-based". It still does; what changes is that metered costs pass through beside that revenue without becoming part of it.
3. **[system.md § System Topology](../design/architecture/system.md#system-topology)** gives shared processing no home. Its platform layer lists identity, provisioning, admin and billing, and its federation layer explicitly never holds data.

## Decision

### Two kinds of capability: internal modules and central services

Every capability the platform offers is one of two things, and the distinction is load-bearing for isolation, pricing and the agent gate alike.

| | Internal module | Central service |
|---|---|---|
| Examples | CRM, field operations, GOTV, fundraising, events, internal messaging, outreach composition | Media capture, electoral analysis, opposition research delivery, text/image/video generation, channel transport |
| Runs where | Inside the tenant's own instance | Platform side, executed per tenant |
| Tenant data crosses the tenant wall | Never | Yes, for the duration of a call, under the tenant's keys and contracts |
| How a tenant gets it | Enabled per tenant as part of its plan | Enabled per tenant, per service, from the catalogue |
| Billing plane | Flat subscription | Metered pass-through, at cost |
| Isolation tier availability | All tiers | See below |

An internal module enabled per tenant is feature flagging inside a single-tenant instance. Nothing about [ADR-001](001-platform-architecture.md#single-tenant-architecture-with-tiered-isolation) changes for it. A central service is new, and the rest of this ADR is about it.

**Alternatives considered:** Running every capability as an internal module, including media capture, was rejected because a per-tenant corpus of public media is unaffordable for the campaigns the platform exists for and duplicates work that carries no tenant data. Making central services a fourth architectural layer was rejected because they do not see across tenants the way the platform layer does, and giving them a layer of their own would invite exactly that.

### Central services execute per tenant and retain nothing

A central service is shared code, not shared state.

- **Every call runs on behalf of exactly one tenant**, under that tenant's credentials, keys and sharing contracts. The platform is never a party to a contract ([ADR-017 § The sharing contract is the single mechanism for data flow across boundaries](017-sharing-contract-trust-model.md#the-sharing-contract-is-the-single-mechanism-for-data-flow-across-boundaries)), so a service acting for tenant A has no path to tenant B's data, and no service acts for two tenants in one call.
- **Output lands where the tenant's contracts say it lands.** Opposition research delivered by a central service is written into the requesting tenant's compartment, where [comms-intelligence.md § 8.5 Access and retention](../spec/comms-intelligence.md#85-access-and-retention) applies in full: the Org Admin cannot read it, the Platform Admin cannot read it at all, and any future agent reads it only under the invoking user's contract.
- **The service keeps no corpus, index, memory or cache of tenant-derived material across calls.** If it did, the service itself would be the superuser read path the roadmap forbids. Working state lives inside the tenant, encrypted with the tenant's keys.
- **Public data is the one exception, and only the data.** A media capture corpus is built from public sources and may be shared across tenants within a country. What a tenant asks of it is not public: queries reveal what a campaign is watching. Query logs are tenant-scoped and never aggregated, the same reasoning that made [ADR-012](012-external-integrations.md) self-host map tiles so that no third party sees canvassing patterns.

**Alternatives considered:** A central service with its own cross-tenant index, for example a single research store with per-tenant views, was rejected because it recreates the superuser read path under a different name. Per-country shared query logs for capacity planning were rejected for the map-tile reason.

### Two billing planes, and no margin on the second

The revenue model becomes two planes. The first is the existing decision, unchanged in substance. The second is the exception the product description always allowed, made explicit.

**Plane 1: the flat subscription.** Fixed monthly or annual pricing by plan. It covers the tenant instance, every internal module the plan includes, and GreenGrass's own cost of building and operating central services: compute, storage, staff, and the ongoing operation of any shared public corpus. The four pricing principles in [fundraising.md § Platform Revenue Model](../spec/fundraising.md#platform-revenue-model) stand: not per user, not per transaction, accessible to resource-constrained campaigns, transparent.

**Plane 2: metered pass-through, at cost.** Central services carry costs that reach GreenGrass metered, billed by the unit by someone GreenGrass cannot avoid paying, and that therefore cannot be made flat: inference tokens billed by a model provider, per-message charges from SMS and WhatsApp gateways, per-generation charges from media generation providers, per-source fees from data suppliers, and infrastructure that a cloud provider bills GreenGrass per unit of use to run the service. These pass through to the tenant that incurred them.

**GreenGrass takes no margin on metered costs.** The supplier's price is the tenant's price. No markup, no rounding up, no bundling into opaque units, no minimum spend. Where a supplier bills GreenGrass in aggregate rather than per tenant, the allocation method is published and the tenant pays its allocated share and nothing more. Where a supplier's terms make exact pass-through impossible, the closest achievable approximation is used and the deviation is documented in the catalogue entry. GreenGrass's revenue comes from the subscription alone. This is the same principle as zero platform fee on donations, applied to services: the platform earns from platform quality, never from volume.

What this rules out is as important as what it permits. The test is whether GreenGrass itself receives a metered bill, not whose infrastructure the cost runs on. GreenGrass's own compute, storage and staff for running a central service are subscription cost when GreenGrass pays for them flat, as reserved capacity or salaries. When a cloud provider bills GreenGrass by the unit for running a service, per invocation or per GPU-second, that charge passes through like any other metered bill, at cost. A service that generates no metered bill to GreenGrass has no metered plane at all. Metering exists to pass through what GreenGrass is charged by the unit, not to price usage.

**Transparency obligations.** Before enabling a metered service, the tenant sees the unit price, the supplier it originates from, and a worked estimate. The tenant can set a spend cap per service, with a soft warning and a hard stop. A monthly statement itemises every metered service by units and cost. Nothing is enabled by default.

**Alternatives considered:** Absorbing all third-party variable cost into the subscription was rejected because it either prices the subscription for the heaviest user, which fails the accessibility principle, or subsidises heavy users from light ones, which is a hidden cross-subsidy the transparency principle forbids. A margin on pass-through to fund the platform was rejected because it gives GreenGrass an incentive to push consumption, the incentive ADR-007 refused for donations. Pricing GreenGrass's own flat-cost compute by usage was rejected as usage pricing by another name; only compute that GreenGrass is itself billed for by the unit passes through.

### The catalogue, entitlements and metering live in the platform layer

The platform layer gains one component with three parts. It is the only new cross-tenant surface this ADR creates, and it holds metadata only.

- **Service catalogue.** What central services exist, in which countries, at which isolation tiers, from which suppliers, at what unit price as passed through, and what data leaves the tenant's perimeter per call.
- **Entitlements.** One record per tenant per service, created when an Org Admin enables the service. Each entitlement carries a credential scoped to that one service and that one tenant. Central services are consumed through the same per-tenant adapter layer as external integrations ([system.md § Integration Architecture](../design/architecture/system.md#integration-architecture)): one adapter per service, the same health monitoring, the same audit logging. Enabling a service whose calls carry tenant data outside the encryption perimeter requires the same explicit acknowledgement the BYOM configuration already demands ([system.md § BYOM Architecture](../design/architecture/system.md#byom-architecture)).
- **Metering.** Every call to a central service emits a usage event on the tenant's own event stream: tenant, service, unit, quantity, supplier cost, the actor who invoked it, and the contract it ran under. Usage events are audit-trail metadata under [ADR-016](016-cross-cutting-resolutions.md) §4 and retain no content. The billing pipeline consumes them; so does the tenant's own audit view.

**Entitlements are the credential boundary for any future agent.** [ADR-018](018-ai-agent-posture.md#what-this-adr-must-resolve) gates production on credential breadth among other things. Under this ADR an agent acting for a tenant can hold no credential to a service the tenant has not enabled, and every call it makes is a metered, logged event with an actor. This ADR does not resolve ADR-018 and adds no agent capability; it supplies the mechanism that review can build on.

**Alternatives considered:** Keeping entitlements inside each tenant instance was rejected because the catalogue has to be consulted before a tenant instance exists, at provisioning, and because billing needs a cross-tenant view of metadata that the tenant layer by construction cannot give.

### An alliance may pay for its members, as an onboarding setting

Per-tenant metering answers the free-rider concern in [mvp.md § 8. What "egalitarian" costs architecturally](../spec/mvp.md#8-what-egalitarian-costs-architecturally) and raises the affordability one. The answer is a billing mode on the affiliation.

- **`billing_mode` on the affiliation**, with two values: `member_pays`, the default, and `alliance_pays`. Under `alliance_pays`, metered costs incurred by the member's use of central services are billed to the alliance tenant's statement.
- **It is set at onboarding.** An alliance chooses its default when it is set up ([workflows.md § 1. Tenant Onboarding](../spec/workflows.md#1-tenant-onboarding)); each affiliation request shows the member which mode applies before the member accepts. Changing the mode on a live affiliation requires the Org Admins of both the alliance and the member, the same rule ADR-007 applies to donation split changes. An alliance that stops paying does so at the end of a billing period, with notice; the member's entitlements continue as member-paid unless the member disables them.
- **Paying is not seeing.** Results still land in the member tenant, under the member's keys, inside whatever compartment the member's contracts specify. The alliance receives the statement: service, units, cost. Never the content, never the queries. Statement lines are the same metadata class as usage events.
- **Public-data services are the natural case.** Capture over public media shares cleanly; an alliance paying for it and every member drawing on it is the intended shape. Opposition research does not share, and alliance-paid research still lands per member, per compartment.

**Alternatives considered:** Alliance-level entitlements shared by members, where the alliance holds the credential and members call through it, were rejected because they make the alliance a party to every member's call and blur whose keys and contracts govern the output. Pooled billing with a contribution ledger was rejected for this ADR because [mvp.md](../spec/mvp.md) already flags the ledger as a possible liability between unequal parties and puts it under test.

### Availability by isolation tier

- **Standard and Enhanced.** All central services are available.
- **Maximum.** Services whose calls carry tenant data beyond the perimeter, generation and analysis among them, are available only with the explicit encryption-boundary acknowledgement. Capture, whose calls carry queries but return public data, is available with the same acknowledgement scoped to query metadata.
- **Self-hosted.** Central services are remote calls into GreenGrass infrastructure and are disabled by default. A self-hosted tenant may enable them under the same acknowledgement, or run its own instance of a service where GreenGrass publishes one as part of the self-hosted package, mirroring the self-hosted model option under BYOM.

### Deferred: a metered allowance in the free tier

Whether the free or very-low-cost plan includes any metered allowance, and if so how much and for which services, is deferred. The accessibility principle stands as written: that plan must exist and be genuinely usable. Whether "usable" includes a starting balance of metered services is a pricing decision the pilot should inform, and it is recorded as open in [fundraising.md § Platform Revenue Model](../spec/fundraising.md#platform-revenue-model) so that it is not read as decided either way.

### Housekeeping: amendment banners

ADRs amended by later decisions now say so at the top. This ADR adds an **Amended by** line to [ADR-007](007-fundraising-payments.md), pointing here. It also adds a clarifying banner to [ADR-013](013-analytics-ai.md), resolving the first inconsistency recorded in [ADR-018 § Inconsistencies recorded, not corrected](018-ai-agent-posture.md#inconsistencies-recorded-not-corrected): `system.md` states that ADR-013's "AI model decision" was superseded by ADR-016 §38, but ADR-013 never chose a model or provider. The hybrid managed-key versus BYOK model it is said to have decided lived only in `system.md`'s own open questions. The banner records that nothing in ADR-013 is superseded and that ADR-016 §38 governs model choice.

## Consequences

**Benefits:**
- Shared capabilities get an architectural home without a fourth layer and without weakening isolation: shared code, per-tenant execution, nothing retained
- The pricing model stays honest. Flat subscription for the platform, pass-through at cost for what cannot be flattened, and no incentive anywhere for GreenGrass to push consumption
- A tenant can see exactly what a service costs before enabling it and cap what it spends, which is more transparency than the flat model gave for the SMS costs it already excepted
- An alliance can absorb its members' metered costs, so the poorer partner in a coalition is not priced out of the capabilities the coalition exists to share
- Entitlements give ADR-018 a concrete credential boundary and an audit event per call, without deciding anything that review must decide
- The pilot's mutual suppression check is the first entry in the catalogue, which makes the pilot and the platform one continuous design rather than two

**Costs:**
- The platform layer grows a billing pipeline: catalogue, entitlements, metering, statements, allocation of aggregate supplier bills. This is real infrastructure that did not exist under flat pricing
- Pass-through at cost means GreenGrass carries supplier price changes straight to tenants, and has to communicate them
- The per-tenant execution rule makes some services more expensive to build than a shared-state design would, and forbids optimisations that would otherwise be obvious
- Two billing planes are harder to explain than one, and the transparency obligations are there because the simplicity of the original decision is gone
- Alliance-paid billing adds a governance surface to affiliations that were previously about data sharing only

**Constraints:**
- The tenant remains the isolation boundary ([ADR-001](001-platform-architecture.md)); a central service never persists tenant-derived state outside the tenant
- The platform is never a party to a contract ([ADR-017](017-sharing-contract-trust-model.md)); a central service acts for one tenant per call and inherits that tenant's contracts
- No superuser read path ([comms-intelligence.md § 8.5 Access and retention](../spec/comms-intelligence.md#85-access-and-retention)); this binds central services and the metering pipeline, which sees metadata only
- Usage events retain no content, under [ADR-016](016-cross-cutting-resolutions.md) §4
- Nothing here adds agent capability or resolves [ADR-018](018-ai-agent-posture.md); the gate stands
- The free-tier allowance question is deferred, not decided; nothing in this ADR may be read as settling it

**Related ADRs:** [ADR-001](001-platform-architecture.md) (tenant isolation, unchanged), [ADR-007](007-fundraising-payments.md) (amended — revenue model gains a metered plane), [ADR-012](012-external-integrations.md) (no third-party visibility precedent, applied to query logs), [ADR-013](013-analytics-ai.md) (clarifying banner added), [ADR-016](016-cross-cutting-resolutions.md) (BYOM §38, tiered retention §4; amended — §2 gains a third send-time layer, mutual suppression), [ADR-017](017-sharing-contract-trust-model.md) (platform never a party; compartments), [ADR-018](018-ai-agent-posture.md) (cost item answered, credential boundary supplied, gate unchanged)
