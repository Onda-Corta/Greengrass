# ADR-022: Core, Modules & Lanes

**Status:** Proposed
**Date:** 2026-11-13
**Sources:** `spec/product.md`, `spec/users.md`, `spec/security.md`, `spec/comms-intelligence.md`, `spec/mvp.md`, `design/architecture/system.md`, `decisions/001-platform-architecture.md`, `decisions/015-product-scope.md`, `decisions/017-sharing-contract-trust-model.md`, `decisions/019-central-services-and-metered-billing.md`, `decisions/020-central-service-line-up-and-builders.md`, `decisions/021-content-approval-pipeline.md`

## Context

[product.md](../spec/product.md) describes an all-in-one product: a CRM, a voter database, fundraising, communications and analytics in one package, for grassroots political campaigns. Every document since has built on that shape, and on the assumption that the client is political.

The direction has changed. The parts stay and the shape does not. What the project builds is shared infrastructure for organizations: a central product, the Core, and a catalogue of modules that each client enables individually. That infrastructure is sold through two lanes, each with its own brand and product. Greengrass is the political one. Basecamp is the commercial one. "Greengrass" therefore now names the political product, not the infrastructure.

The corpus already has most of the parts this needs. [ADR-001](001-platform-architecture.md#single-tenant-architecture-with-tiered-isolation) decided one deployment per organization, and this ADR reaffirms it. [ADR-019](019-central-services-and-metered-billing.md) gave shared capabilities a home, a catalogue and per-tenant entitlements. [ADR-017](017-sharing-contract-trust-model.md) gave every boundary one trust mechanism. What the corpus lacks is the vocabulary, the boundary of the Core, a contract for modules, and a place for a second kind of client.

This ADR is `Proposed` because two things it depends on are open: where the voter file lives, and what the Core is called. It also records several things the product side has already decided. The table below says which is which, and every section repeats it. Nothing marked proposed or open may be read as settled.

| Item | Standing |
|---|---|
| Two lanes on one infrastructure, as described in [Two lanes on one infrastructure](#two-lanes-on-one-infrastructure) | Decided |
| Each client runs its own instance, with its own data and its own accounts | Decided ([ADR-001](001-platform-architecture.md), ADR-025) |
| The CRM is part of the Core | Decided |
| Fundraising & payments is one module with a shared payment layer | Decided |
| Modules are built by GreenGrass first; the module contract is designed so vetted partners can build later | Decided |
| The vocabulary, including the renaming of ADR-019's "internal module" | Proposed |
| What the Core contains, beyond the CRM | Proposed |
| What the lanes require of the design | Proposed |
| The module contract and the module catalogue | Proposed |
| The voter file as a political-lane module, outside the Core | Recommended, not decided |
| The Campaign Agent as the chat with content modules enabled, not a module | Recommended, not decided |
| A name for the Core; operator access by lane; a disabled module's data; the name "Basecamp" | Open |

### Conflicts this ADR resolves

Following [ADR-016](016-cross-cutting-resolutions.md), [ADR-017](017-sharing-contract-trust-model.md) and [ADR-019](019-central-services-and-metered-billing.md), the conflicts with the existing corpus are named here. Those that turn on a decided item are resolved below. Those that turn on a proposed or open one are named and left standing.

1. **[product.md](../spec/product.md)** describes an all-in-one product and uses "GreenGrass" for the whole platform. The product is now a Core with modules, and Greengrass is one of two products built on it.
2. **[ADR-019 § Two kinds of capability: internal modules and central services](019-central-services-and-metered-billing.md#two-kinds-of-capability-internal-modules-and-central-services)** uses "internal module" to mean code that runs inside the tenant. That describes where code runs, not what a client enables. The term has to change before "module" can mean the product unit.
3. **The corpus as a whole is written for political clients only.** Threat tiers ([security.md § Threat Actors](../spec/security.md#threat-actors)), election law ([compliance.md](../spec/compliance.md)) and the voter file ([integrations.md § Voter File Integration](../spec/integrations.md#voter-file-integration)) are written as properties of the platform. With a commercial lane they become policy of the political lane.
4. **[security.md § GreenGrass Team Access](../spec/security.md#greengrass-team-access)** assumes one platform team with administrative access. Two lanes are run by different companies, and a commercial agency may work for a political client's opponent.
5. **[users.md § Organization Hierarchy](../spec/users.md#organization-hierarchy)** makes an alliance a "lightweight tenant" that does not replicate the full platform stack. In this direction an alliance is a client like any other, with its own instance. ADR-024 takes this up.
6. **[ADR-020 § Four central services](020-central-service-line-up-and-builders.md#four-central-services)** and [comms-intelligence.md](../spec/comms-intelligence.md) specify one media monitor. The catalogue below lists three monitoring modules. They draw on the one Capture service, so this is packaging and the architecture is unchanged.
7. **[ADR-015](015-product-scope.md)** fixed the product's scope boundaries. The catalogue names two modules, Crisis management and Polls & surveys, that no document specifies.

## Decision

### Vocabulary

Proposed.

| Term | Meaning |
|---|---|
| **Core** | What every instance always has, in both lanes. Headless, lane-neutral, and never dependent on a module. It needs a name of its own, now that Greengrass is a lane. |
| **Lane** | A product and brand built on the Core: Greengrass (political) or Basecamp (commercial). Configuration, not a fork. |
| **Client** | An organization that buys a lane's product. The corpus says *tenant*; the two words name the same thing from two sides. |
| **Instance** | A client's own deployment: its own database, application and keys, as [ADR-001](001-platform-architecture.md#single-tenant-architecture-with-tiered-isolation) decided. |
| **Module** | The unit a client enables and the catalogue lists. Shared by both lanes unless marked lane-only. Described by a manifest. Made of in-tenant components, central-service calls, or both. |
| **In-tenant component** | Code that runs inside the client's instance. This is ADR-019's "internal module", renamed. |
| **Central service** | Code that runs platform-side for one client per call and keeps nothing ([ADR-019](019-central-services-and-metered-billing.md)): Capture, Analysis, Builders and channel transport ([ADR-020](020-central-service-line-up-and-builders.md)). Unchanged. |
| **Surface** | Where a person does the work: chat, admin UI or field app (ADR-023). |
| **Connector** | A link to an outside tool such as NationBuilder. It sits in the integration hub and is not a module (ADR-027). |

A worked example. Radio & TV monitoring is a module. It is made of the Capture central service with transcription, an in-tenant monitoring inbox, outlet and journalist records in the Core CRM, and a digest in chat.

Documents written before this ADR that say "internal module" are read as "in-tenant component". They are not rewritten one by one; [ADR-019](019-central-services-and-metered-billing.md) and [system.md § Central Services Architecture](../design/architecture/system.md#central-services-architecture) carry a note.

<!-- REVISIT: the two-lane description writes "Greengrass"; every earlier document writes "GreenGrass", and means the whole platform by it. This ADR uses "Greengrass" for the political lane's product and leaves the earlier documents as they are. Until the Core has a name of its own, "GreenGrass" in an earlier document means the infrastructure. -->

**Alternatives considered:** Keeping "internal module" and finding another word for what a client enables was rejected because *module* is the word the catalogue is sold in, and a term that means one thing in the price list and another in the architecture gets misread.

### Two lanes on one infrastructure

Decided.

| | Political lane | Commercial lane |
|---|---|---|
| Product | Greengrass | Basecamp (PR Media / Relacionistas.app) |
| Run by | Blimp.io and Onda Corta | R&R and Onda Corta |
| For | Community movements, unions, political parties | Advertisers, PR professionals, agencies, other businesses |
| First clients | PIP, MVC, Alianza de País | Asociación de Publicistas |
| Price | Cost, plus a commission that covers the cost of selling | Cost, plus a 30% margin for the product's owner, plus the Comercializadora's commission |

<!-- REVISIT: "the product's owner" (la dueña del producto) and "the Comercializadora" are used as the product side gave them, without a definition. Both need one. See ADR-026. -->

- **Shared modules.** Every module in the catalogue can run in either product, though some are useful in only one: electoral analysis is political only.
- **One instance per client.** Each client runs its own instance, with its own data and its own accounts.
- **Independent lanes.** A lane never waits for the other. The work with PIP and MVC does not depend on what the Asociación de Publicistas' tool turns out to be, or the reverse.
- **Shared improvements.** When one lane improves a shared module, the improvement reaches the other.

The prices are decided in ADR-026.

### What the lanes require of the design

Proposed. These are what it takes for the four statements above to hold at once.

- **A lane is configuration over one codebase, never a fork.** A lane sets its brand, its vocabulary, which modules its catalogue shows, its price rules, and its policies: security defaults, compliance packs, the AI gate.
- **The Core is lane-neutral.** Nothing electoral lives in it. The main consequence is the voter file, below.
- **Each lane has its own release train.** A lane pins the versions of the Core and modules it runs and upgrades on its own schedule, so it never waits. An improvement lands in the shared module, and the other lane receives it at its next upgrade. The module contract is versioned, and a breaking change needs a deprecation window.
- **A lane-specific need goes into the shared module** as configuration or an extension point. If it cannot, it becomes a lane-only module.
- **Operators are separated by lane.** A political client's threat model includes political opponents ([security.md § Threat Actors](../spec/security.md#threat-actors)), and a commercial agency may work for one. A lane's operators can administer only that lane's instances. Query logs against shared services stay scoped to the client and are invisible across lanes; ADR-019 already requires the first half. Onda Corta sits in both lanes, so its access has to be defined explicitly. Political clients should be told that the same infrastructure serves commercial clients. The details are open, below.
- **The shared public corpus is the main economy.** Radio, TV, press and public social accounts are captured once and serve both lanes. Only public data is shared, as [ADR-019 § Central services execute per tenant and retain nothing](019-central-services-and-metered-billing.md#central-services-execute-per-tenant-and-retain-nothing) already rules.
- **Pricing is a lane rule, not a Core rule** (ADR-026).

**Alternatives considered:** A fork of the codebase per lane was rejected because it breaks the promise that an improvement in one lane reaches the other, and it doubles the cost of every security fix.

### What the Core contains

Every instance gets all of this, always. The Core is headless: each item is an API with events, and has no screens of its own beyond what the admin UI needs to configure it.

| Group | Contents | Already decided in |
|---|---|---|
| Trust | Isolation tiers, identity and passkeys (one identity service per client, ADR-025), keys and BYOK, sharing contracts, the audit log | [ADR-001](001-platform-architecture.md), [ADR-002](002-security-threat-model.md), [ADR-003](003-identity-access-organization.md), [ADR-017](017-sharing-contract-trust-model.md) |
| Data: the CRM | People and the omni-list, record types, consent per channel and per purpose, dedup by suggest-and-confirm, segments, import and export, third-party sync (ADR-027) | [users.md](../spec/users.md), [ADR-004](004-data-model-integrity.md) |
| Content | Content store, versioned assets, approval pipeline in rounds | [ADR-021](021-content-approval-pipeline.md) |
| Delivery | Channel transport with consent checks, frequency caps, the quiet window and mutual suppression | [system.md § Cross-channel orchestration engine](../design/architecture/system.md#cross-channel-orchestration-engine), [ADR-016](016-cross-cutting-resolutions.md) §2, [ADR-019](019-central-services-and-metered-billing.md) |
| Commerce | Catalogue, entitlements, metering | [ADR-019](019-central-services-and-metered-billing.md) |
| Events | The per-client event stream and the bus (ADR-024) | [system.md § Analytics Architecture](../design/architecture/system.md#analytics-architecture) |
| Lane configuration | Brand, vocabulary, catalogue visibility, price rules, policy defaults | New, above |
| Plumbing | Integration hub and connectors, AI abstraction (BYOM), localization, offline sync engine, public API and webhooks | [system.md](../design/architecture/system.md), [ADR-005](005-offline-first-sync.md), [ADR-010](010-internationalization-localization.md), [ADR-016](016-cross-cutting-resolutions.md) §38 |

**The CRM is part of the Core. Decided.** One person record, consent and dedup underlie nearly every module. Keeping them in the Core is also what guarantees that a person's opt-out holds everywhere inside an instance. A module that does not use the CRM, such as the demonstration's campaign agent ([demo.md](../spec/demo.md)), still runs; the CRM is simply empty.

**Two comms-intelligence primitives turn out to be Core. Proposed.** [comms-intelligence.md § 5. Seven features are three primitives](../spec/comms-intelligence.md#5-seven-features-are-three-primitives) names three. The actor graph (outlets, ownership, journalists, analysts) is CRM entities and relationships, so it extends the Core CRM. The claims ledger (claim, sources, verification status, approved response) is a content item, so it extends the Core content store. Only the compartmented dossier is module-specific, and its access machinery is ADR-017 contracts, which are Core.

The rest of the table is proposed. Identity per client is decided in ADR-025.

**Alternatives considered:** Making the CRM a module was considered and rejected. Nearly every module would then depend on it, and consent would have to be enforced by each module separately, which is how an opt-out gets honoured in one place and ignored in another.

### The voter file: recommended as a political-lane module, not decided

A first draft of this direction put the voter file in the Core. The two-lane model reverses that. The Core has to be lane-neutral, and a voter file means nothing to an advertising agency.

The recommendation is that the voter file becomes a political-lane module, Voter File, which extends the Core CRM and which Greengrass can switch on by default. Street operations, electoral analysis and coalition overlap build on it. It remains one of the three things no competitor integrates, alongside offline field tools and tools for coalitions of parties. It would belong to the Greengrass product, not the shared Core.

This is not decided. Until it is, nothing moves: the data model in [system.md § Data Model](../design/architecture/system.md#data-model) and the voter-file handling in [integrations.md § Voter File Integration](../spec/integrations.md#voter-file-integration) stand as written.

### The module contract

Proposed, except where marked.

Every module ships a manifest that declares:

- **Data:** schema extensions to Core entities, its own tables, retention classes.
- **Dependencies:** the modules it requires, and what happens to its data when it is disabled.
- **Events:** the events it publishes and consumes on the bus (ADR-024).
- **Access:** the role templates and permissions it contributes ([ADR-003](003-identity-access-organization.md)).
- **Surfaces:** its chat operations, each marked read or write, with the confirmation card for writes; its admin screens and navigation entries; its field capabilities and offline behaviour (ADR-023).
- **Services:** the central services it calls, and so the entitlements it needs.
- **Perimeter:** what data leaves the encryption boundary, and which isolation tiers and jurisdictions it supports.
- **ADR-018 standing:** read scope, tool authority, autonomy and credential breadth, the four properties [ADR-018](018-ai-agent-posture.md#no-agent-capability-reaches-production-until-this-adr-is-accepted) gates on.

**Shipping.** First-party modules ship in the deployment image and are switched on by entitlement. ADR-001 is unchanged: there are no per-module deployments.

**Who builds. Decided.** Modules are built by GreenGrass first. The contract is designed so that vetted partners can build later. That needs four things to be true from the start: API parity, which [system.md § Public API](../design/architecture/system.md#public-api) already commits to; the manifest; signed module packages; and no internal-only API. A review process for partner modules can wait.

What happens to a module's data when it is disabled is open, below.

### The module catalogue

Proposed. The names are the product side's. Every module can run in either product; the Lanes column says where it is useful.

| Module | Lanes | Builds on | Main surfaces | Gate or note |
|---|---|---|---|---|
| Radio & TV monitoring | Both | Capture (broadcast, transcribed), actor graph | Chat (digest), admin | Iteration 0 probe; transcription is a metered cost |
| Social monitoring | Both | Capture (public accounts) | Chat, admin | Iteration 0 probe; public accounts only |
| Press summary | Both | Capture (press), text builder | Chat (daily digest) | Iteration 0 probe |
| Ad-art builder | Both | Builders, content pipeline, brand templates | Chat, admin | Template layouts are fine, as in the demonstration; generated images wait on [ADR-018](018-ai-agent-posture.md) |
| Content distribution | Both | Channel transport, content pipeline, CRM | Chat, admin | The spec's outreach, plus press and social |
| Crisis management | Both | Monitoring modules, claims ledger, talking points | Chat, admin | Named, not yet specified |
| Polls & surveys | Both | CRM, channel transport | Admin, chat | Named, not yet specified |
| Events & volunteers | Both | CRM | Chat, admin, field (check-in) | Volunteers are mostly a political need |
| Fundraising & payments | Both | CRM, payment adapters | Admin, chat (totals) | Shared payment layer; donation rules are political-lane configuration |
| Street operations | Political | Voter File, offline engine | Field, admin | Canvassing, voter registration, GOTV |
| Voter File | Political | Core CRM | Admin | Recommended as a module, not decided (above) |
| Electoral analysis | Political | Analysis, Voter File, geography | Admin, chat | Not yet scheduled ([ADR-020](020-central-service-line-up-and-builders.md)) |
| Coalition Trust | Both | CRM, bus, mutual suppression | Admin, chat | The MVP ([mvp.md](../spec/mvp.md)). Alliances of parties; associations of agencies (ADR-024) |
| Opposition research & vetting | Political | Analysis, compartments | Admin | Compartments; legal review per country |
| Activism | Political | CRM, text builder | Public pages, admin | None |

- **The spec's single media monitor is three modules here.** All three draw on the one Capture service, so this is a packaging choice. The architecture in ADR-020 is unchanged, and all three stay behind the corpus probe, Iteration 0 of [comms-intelligence.md § 9. The iterations](../spec/comms-intelligence.md#9-the-iterations).
- **Crisis management is the claims-ledger workflow** at [comms-intelligence.md § 5.2 The claims ledger](../spec/comms-intelligence.md#52-the-claims-ledger): an attack surfaces in monitoring, becomes a claim, gets sourced and adjudicated, and the answer becomes a talking point. The spec has the primitive and no module by this name.
- **Polls & surveys has no spec at all.** ADR-020 gives one rule to keep: a client's own polling is its own data and never enters the shared corpus.
- **Fundraising & payments is one module with a shared payment layer. Decided.** In the commercial lane it means integration with ATH Móvil and other micropayment and online payment services such as Stripe. Those are the payment adapters [system.md § Payment adapter pattern](../design/architecture/system.md#payment-adapter-pattern) already specifies, so the adapters are shared by both lanes. The political lane adds donation handling on top: contribution limits, campaign-finance reporting and alliance splits ([fundraising.md](../spec/fundraising.md), [compliance.md](../spec/compliance.md)).
- **The Campaign Agent is not a module. Recommended, not decided.** If the chat acts as the person (ADR-023), the agent of the demonstration is that chat with content modules enabled.

**Named, not yet specified.** Crisis management and Polls & surveys are in the catalogue and specified nowhere. This ADR does not specify them. Each needs its own spec before it is built.

### Open questions

None of these is settled here. Where the direction has a recommendation, it is given as one.

1. **A name for the Core**, now that Greengrass is a lane. Also where its spec lives: today everything is in the Greengrass repository.
2. **The voter file** as a political-lane module, not part of the Core. Recommended above.
3. **The Campaign Agent** as the chat with content modules enabled, not a module. Recommended above.
4. **A disabled module's data:** kept read-only, exported, or purged on the operational retention schedule.
5. **Operator access by lane,** including Onda Corta's access across both, and what political clients are told.
6. **The name "Basecamp".** It is also 37signals' project-management product, in the same broad category of software. It needs a trademark check before it goes on anything public.
7. **Definitions.** "The product's owner" and "the Comercializadora" are used as given and defined nowhere.

### Housekeeping: amendment banners

A proposed ADR amends nothing until it is accepted. This ADR adds an **Amendment proposed by** line to [ADR-019](019-central-services-and-metered-billing.md), for the vocabulary, and to [ADR-015](015-product-scope.md) and [ADR-020](020-central-service-line-up-and-builders.md), for the catalogue. Each says that the ADR it sits on stands as written until this one is accepted.

## Consequences

**Benefits:**
- The product can be sold a module at a time, to a client that keeps the tools it already has
- A second kind of client pays for the same Core, capture corpus and modules
- "Module" means one thing in the catalogue, the price list and the architecture
- The Core has a boundary, so a new capability has a rule for where it goes
- A partner could build a module later without a change to the architecture

**Costs:**
- The oldest document in the repository no longer describes the product, and every document written for political clients needs its political parts marked as lane policy
- Two release trains, two operator groups and one codebase are harder to run than one of each
- A lane-neutral Core is a constraint on every future Core change: nothing electoral may go into it
- If the voter file moves, the data model and three specs change with it
- Two catalogue modules have a name and no specification

**Constraints:**
- [ADR-001](001-platform-architecture.md) is unchanged: one instance per client, no per-module deployments
- [ADR-019](019-central-services-and-metered-billing.md)'s rules for central services are unchanged: one client per call, nothing retained, only public data shared
- The Core never depends on a module
- A lane is configuration, never a fork
- The [ADR-018](018-ai-agent-posture.md) gate applies to the whole Core, so to both lanes (ADR-023)
- Nothing marked proposed, recommended or open in this ADR may be built on as if it were decided

**Related ADRs:** [ADR-001](001-platform-architecture.md) (one instance per client, reaffirmed), [ADR-015](015-product-scope.md) (amendment proposed: the catalogue names modules outside its scope list), [ADR-017](017-sharing-contract-trust-model.md) (contracts are Core), [ADR-018](018-ai-agent-posture.md) (the manifest declares each module's standing against the gate), [ADR-019](019-central-services-and-metered-billing.md) (amendment proposed: "internal module" becomes "in-tenant component"; catalogue, entitlements and metering are Core), [ADR-020](020-central-service-line-up-and-builders.md) (amendment proposed: one media monitor is packaged as three modules; the four services are unchanged), [ADR-021](021-content-approval-pipeline.md) (the content pipeline is Core), ADR-023 (surfaces), ADR-024 (the bus; alliances and associations), ADR-025 (identity per client), ADR-026 (prices), ADR-027 (sync and connectors)
