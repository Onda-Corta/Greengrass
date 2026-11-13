# ADR-001: Platform Architecture & Deployment

**Status:** Accepted
**Date:** 2026-03-03
**Sources:** `design/architecture/system.md`, `spec/users.md`, `spec/workflows.md`, `spec/product.md`
**Amendment proposed by:** [ADR-024](024-event-bus-as-federation.md) (Proposed) — the central federation layer that mediates cross-tenant flow would be replaced by contract-filtered event exports between instances, and an alliance would be a client like any other, with its own instance. Nothing below changes until ADR-024 is accepted. Single-tenant isolation is reaffirmed by [ADR-022](022-core-modules-and-lanes.md) and is not in question.

## Context

GreenGrass serves political campaigns in the global south — organizations operating under active surveillance, in hostile political environments, across countries with fundamentally different regulatory and infrastructure realities. The platform architecture must prioritize security isolation, data sovereignty, mobile accessibility, and operational independence for each tenant. Traditional multi-tenant SaaS architectures optimize for operational efficiency at the cost of shared blast radius, shared infrastructure control, and limited per-tenant customization — all unacceptable tradeoffs in this threat model.

## Decision

### Single-tenant architecture with tiered isolation

Each tenant gets its own database, application instance, and resources. Isolation tiers scale with the tenant's threat profile and needs:

| Tier | Isolation level | For whom |
|------|----------------|----------|
| Standard | Separate containers, shared cluster | Small campaigns, advocacy orgs, low-threat environments |
| Enhanced | Separate cluster | Mid-size campaigns, elevated threat environments, large voter files |
| Maximum | Separate cloud account | High-risk campaigns under active state surveillance, large parties |
| Self-hosted | Tenant's own infrastructure | Tenants requiring full physical and administrative control |

Tenants select their tier at provisioning and can upgrade without data migration downtime.

**Alternatives considered:** Multi-tenant with logical isolation was rejected because compromising one tenant could expose others, and per-tenant security policies (encryption keys, data residency, isolation level) become exponentially harder to enforce in a shared database. Multi-tenant with physical isolation was considered but offers no meaningful advantage over single-tenant while adding coordination complexity.

### Federation model over monolithic multi-tenancy

Organizations are sovereign entities connected by voluntary affiliation, not subdivisions of a monolithic system. Each entity (party, candidate, advocacy org) is a full tenant with its own data, billing, and administrative control. Alliances are lightweight coordination tenants that enable resource sharing across sovereign members without transferring ownership. Campaigns inherit from their parent entity.

**Alternatives considered:** A hierarchical ownership model (party owns candidate data) was rejected because it contradicts the sovereignty principle — a candidate's data belongs to the candidate, and an alliance cannot compel data sharing from members.

### Per-country data residency

Each tenant's data is stored in a country the tenant chooses at provisioning time. The single-tenant architecture makes this architecturally natural — placing an isolated tenant in a specific country is an operational question, not an architectural redesign. GreenGrass manages infrastructure in each target country (cloud providers or in-country data centers). Self-hosted tenants control their own data residency entirely.

### Mobile-first design

The primary interface is a phone, not a desktop. Every workflow must be usable on a phone; desktop is the enhanced experience. This reflects the reality of political organizing in the global south, where volunteers and supporters primarily access the platform through mobile devices, often low-end ones on slow connections.

### Fully automated tenant provisioning

Tenant creation is self-serve with no human in the loop. The provisioning pipeline handles infrastructure spin-up, database creation, encryption key setup (BYOK flow or managed), country-specific hosting, and initial configuration end-to-end.

**Alternatives considered:** Human-in-the-loop provisioning was rejected because it creates a bottleneck that undermines the platform's accessibility goals — campaigns in the global south need to get started immediately, not wait for business hours in another timezone.

## Consequences

**Benefits:**
- Compromising one tenant cannot expose another — blast radius is limited to a single organization
- Per-tenant security policies (encryption keys, data residency, access controls) are architecturally enforced, not just configured
- Tenants can be placed in any country without architectural changes
- The federation model respects organizational sovereignty — critical for political contexts where data ownership has safety implications
- Mobile-first ensures the platform works for the actual devices volunteers use

**Costs:**
- Operational complexity is significantly higher than multi-tenant — every tenant is its own deployment, requiring robust automation
- Infrastructure costs scale linearly with tenant count rather than amortizing across shared resources
- Automated provisioning across multiple countries and cloud providers is a major infrastructure investment
- Self-hosted deployments create version fragmentation and support complexity

**Constraints:**
- Every infrastructure change must work across all isolation tiers
- Updates must be deployable to hundreds of independent tenants without downtime
- The provisioning pipeline must be robust enough to handle per-country hosting providers and failure/rollback scenarios

**Related ADRs:** [ADR-002](002-security-threat-model.md) (security architecture depends on single-tenant isolation), [ADR-005](005-offline-first-sync.md) (mobile-first drives offline requirements), [ADR-010](010-internationalization-localization.md) (per-country deployment supports data residency)
