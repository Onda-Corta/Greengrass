# ADR-017: The Sharing Contract as Universal Trust Primitive

**Status:** Accepted
**Date:** 2026-09-06
**Sources:** `spec/users.md`, `spec/security.md`, `spec/mvp.md`, `spec/comms-intelligence.md`

## Context

GreenGrass has two access-control mechanisms that evolved separately and were never reconciled.

Inside a tenant, [ADR-003](003-identity-access-organization.md) gives hybrid RBAC — stackable role templates with per-user overrides — plus attribute scoping by geography, team, and campaign. Between tenants, the same ADR gives sharing contracts: opt-in per resource, per org, revocable, audited, and subordinate to person-level consent ([users.md § Cross-org sharing within alliances](../spec/users.md#cross-org-sharing-within-alliances)).

The second mechanism is scoped to alliances by document structure rather than by architecture. The section that defines it is headed "Cross-org sharing within alliances" ([users.md § Cross-org sharing within alliances](../spec/users.md#cross-org-sharing-within-alliances)), yet nothing in the contract's shape is alliance-specific. Meanwhile [users.md § Organization Hierarchy](../spec/users.md#organization-hierarchy) establishes that every entity except Campaign is sovereign — alliance, party, organization, and candidate alike — and [users.md § Organization Hierarchy](../spec/users.md#organization-hierarchy) states plainly that "a party does not own a candidate's data."

Three gaps follow.

**The party↔candidate relationship is declared sovereign-to-sovereign with no mechanism to express what is shared.** Both are full tenants, affiliation explicitly does not transfer ownership, and the only machinery for expressing cooperation between sovereign entities lives under an alliance heading. The relationship has the assertion of sovereignty and nothing to operationalize it.

**"Inherits" is undefined for data.** Campaign is the sole non-sovereign entity ([users.md § Organization Hierarchy](../spec/users.md#organization-hierarchy)), inheriting "their parent's billing and administrative structure" ([users.md § Organization Hierarchy](../spec/users.md#organization-hierarchy)). Billing and administration are clear. Data access is not. A candidacy running a primary against a rival from its own party has no way to represent the boundary it needs, because the model offers no boundary at that level.

<!-- REVISIT: "these are four capabilities" but only three are enumerated (per-record
access lists, read logging, no superuser read path). -->

**Compartmented storage reads as an entirely new primitive.** `spec/comms-intelligence.md` requires per-record access lists, read logging, and no superuser read path for candidate vetting and opposition research. Under the current model these are four capabilities the platform lacks, requiring their own ADR and their own engineering effort.

### Conflicts this ADR resolves

Following the precedent of [ADR-016](016-cross-cutting-resolutions.md), the conflicts with previously accepted decisions are named here and resolved below.

1. **[003-identity-access-organization.md § Consequences](003-identity-access-organization.md#consequences)** constrains that "tenant boundaries are the outermost scope — no user ever sees data from a tenant they don't belong to." Contracts operating below the tenant contradict this as written.
2. **[security.md § Metadata Protection](../spec/security.md#metadata-protection)** makes non-logging a defense: "avoid logging unnecessary metadata (don't record which specific records a user viewed if you only need to know they logged in)." A compartment requires the opposite.
3. **[security.md § GreenGrass Team Access](../spec/security.md#greengrass-team-access)** grants Platform Admin silent read access to tenant data without notification.
4. **[004-data-model-integrity.md § Full audit trail for all data mutations](004-data-model-integrity.md#full-audit-trail-for-all-data-mutations)** commits to a full audit trail "for all data mutations." Reads are not covered, and for compartmented data the read is the event worth recording — insider exfiltration leaves no mutation behind.

## Decision

### The sharing contract is the single mechanism for data flow across boundaries

A sharing contract governs data flow across any boundary — alliance, party, candidacy, campaign, or compartment. Roles govern only *inside* a boundary, where no contract has been drawn.

The operative rule: **a contract exists wherever someone has drawn a boundary; where no boundary is drawn, roles govern.** A three-person campaign never encounters a contract, because it has drawn no internal boundaries and the mechanism stays invisible until it is needed.

**Alternatives considered:** Generalizing contracts between sovereign units only, while leaving intra-tenant access untouched, was rejected because it leaves compartmentation as a separate primitive and forgoes the main benefit. Making the contract the only mechanism — with roles as syntactic sugar generating implicit contracts — was rejected because it recreates the pure-ABAC complexity that ADR-003 explicitly declined as "too complex for campaign staff to manage."

### Parties to a contract

Alliance, Party/Organization, Candidate, Campaign, and Compartment.

**Campaign is promoted to a contracting party.** Its default contract to its parent is total, which is what [users.md § Organization Hierarchy](../spec/users.md#organization-hierarchy)'s "inherits" now means for data. Making it a contract rather than a structural fact is what allows a campaign to narrow it — the primary-against-a-party-rival case.

**Sub-organizational units remain geographic scopes for now, but the schema does not assume it.** The party column is polymorphic, so a unit such as one of PIP's 78 municipal committees ([mvp.md § PIP — Partido Independentista Puertorriqueño](../spec/mvp.md#pip-partido-independentista-puertorriqueño)) can become a contracting node later with no migration. PIP's actual structure is a discovery task ([mvp.md § PIP — Partido Independentista Puertorriqueño](../spec/mvp.md#pip-partido-independentista-puertorriqueño)), and committing to sub-unit machinery before that discovery lands would be speculative. Committing to a schema that forecloses it would be worse.

**Alternatives considered:** Making sub-units contracting nodes immediately was rejected as premature. Restricting parties to sovereign entities plus compartments was rejected because it leaves the boundary inside a single candidacy unrepresentable.

### Uniform terms at every rung

Unanimous to expand a grant; unilateral to contract it. No exceptions by rung.

- **Revocation is never silent.** The counterparty sees who cut access and when.
- **Revocation cuts ongoing access without clawing back what was already acted on**, generalizing the existing rule at [users.md § Cross-org sharing within alliances](../spec/users.md#cross-org-sharing-within-alliances).
- **Deadlock persists as status quo** and the platform is never the tiebreaker, generalizing [mvp.md § 8. What "egalitarian" costs architecturally](../spec/mvp.md#8-what-egalitarian-costs-architecturally) from alliance governance to every boundary.

This admits a case that per-rung defaults would have declared illegitimate by construction: a campaign walling off the parent that created it. That is not incoherent, it is a primary — and Puerto Rico has primaries in the pilot cycle ([mvp.md § 7. Phases](../spec/mvp.md#7-phases)).

**Alternatives considered:** Per-rung default terms — unanimity between alliance peers, subordination for parent→campaign — were rejected because they encode a political judgment about which boundaries are legitimate into the access model, and because they cost the one-sentence trust story that makes joining safe at any rung.

### Isolation and flow are different boundaries

The constraint at [003-identity-access-organization.md § Consequences](003-identity-access-organization.md#consequences) conflated two things. This ADR separates them.

**The tenant remains the isolation boundary.** Own database, own application instance, own keys ([001-platform-architecture.md § Single-tenant architecture with tiered isolation](001-platform-architecture.md#single-tenant-architecture-with-tiered-isolation)). Nothing about the single-tenant architecture changes.

**The tenant is no longer the outermost permission scope.** Contracts govern flow at rungs above it (alliance) and below it (campaign, compartment). [003-identity-access-organization.md § Consequences](003-identity-access-organization.md#consequences) is amended to read as a statement about isolation, not about permission.

### Observability: a distinction in the metadata ladder, not a new rung

[security.md § Metadata Protection](../spec/security.md#metadata-protection) defines two metadata protection tiers, Moderate and Aggressive. Both suppress read logging; neither turns it on. Attaching compartment observability to that ladder as written would yield nothing.

The ladder protects **activity metadata** — login timing, communication graph, canvassing geography ([security.md § Metadata Protection](../spec/security.md#metadata-protection)) — and minimizing it defends the movement against traffic analysis. That reasoning is correct and unchanged at both tiers.

**Access logging on a compartmented record is a different thing pointed at a different threat**: Tier 5, insider threats ([security.md § Tier 5: Insider Threats](../spec/security.md#tier-5-insider-threats)). The existing ladder collapses the two because before compartments there was no data class whose primary risk was an authorized insider reading it.

Therefore: **both Moderate and Aggressive continue to suppress activity metadata, and both log reads on compartmented records.** This is a property of the data class applied uniformly, not a per-contract setting — configuring observability contract by contract would hand campaign staff a control whose misuse builds exactly the metadata trove the ladder exists to prevent. A tenant that does not want read logging does not create compartments.

This scopes rather than reverses [security.md § Metadata Protection](../spec/security.md#metadata-protection), which was always about activity metadata. It extends [004-data-model-integrity.md § Full audit trail for all data mutations](004-data-model-integrity.md#full-audit-trail-for-all-data-mutations) from mutations to reads for compartmented data only. And it overrides [security.md § GreenGrass Team Access](../spec/security.md#greengrass-team-access) for contracted data: the platform is not a party to any contract, so it has no read path, with no exception for support or debugging.

**Alternatives considered:** Observability as a per-contract term was rejected for the footgun above. Logging every boundary crossing platform-wide was rejected because it reverses the metadata ladder in exactly the countries [geography.md § Security Tier Relevance by Country](../spec/geography.md#security-tier-relevance-by-country) rates most dangerous.

### Compartments are the bottom rung, not a new primitive

A compartment is a contract whose parties are named individuals rather than organizational units. Uniform terms apply without exception:

- **Creation is unilateral**, because at the moment of creation there is one party.
- **Growth requires unanimity of current members.** Nobody is added to a dossier behind an existing member's back.
- **Departure is unilateral**, and a member who leaves the organization loses standing — so staff turnover ([press.md § Media Interaction Tracking](../spec/press.md#media-interaction-tracking)) does not leave vetoes lying around.

Two properties that would otherwise need writing as bespoke rules fall out instead as consequences. An Org Admin who creates a compartment is its first party and may then **remove their own access**, since unilateral contraction is always available — so "the admin can grant but cannot read" is derived, not stipulated. And per-compartment key scope follows from the compartment being a party: keys scope to contracts, and [ADR-002](002-security-threat-model.md)'s per-tenant BYOK becomes the default case rather than the only one.

### Schema generality is required before the ALLY-005 build

[mvp.md § 4.1 What gets built](../spec/mvp.md#41-what-gets-built) scopes the sharing contract as the MVP's centerpiece for a two-party alliance, built in Phase 2, February–June 2027. That build now decides the shape of the platform's entire trust model.

**The data model must be general — contract between parties over resources, with the party reference polymorphic — even though the pilot exercises only the alliance case.** The pilot UI stays exactly as narrow as `spec/mvp.md` specifies. General schema, narrow UI.

This is the same argument [mvp.md § 4.4 Kept despite looking cuttable](../spec/mvp.md#44-kept-despite-looking-cuttable) already makes for BYOK: you cannot retrofit encryption onto a data trust after members have uploaded. You cannot retrofit generality onto a contract after it ships as an alliance feature.

## Consequences

**Benefits:**
- One mechanism instead of two, with a rule stating when each applies
- The party↔candidate relationship becomes expressible, closing a gap where the spec asserted sovereignty it gave no means to exercise
- "Inherits" acquires a definition for data, and a candidacy can represent a primary boundary against its own party
- Compartmentation stops being a new primitive requiring separate engineering — the comms intelligence roadmap's Iteration 4 becomes configuration of the ladder rather than construction of a new one
- Two long-standing conflicts ([security.md § Metadata Protection](../spec/security.md#metadata-protection), [004-data-model-integrity.md § Full audit trail for all data mutations](004-data-model-integrity.md#full-audit-trail-for-all-data-mutations)) resolve by scoping rather than reversal, leaving the original reasoning intact where it was correct
- Zero cost to small campaigns, which never draw a boundary and never see a contract

**Costs:**
- Enforcement is harder, not easier. [003-identity-access-organization.md § Consequences](003-identity-access-organization.md#consequences) already warns the RBAC+scoping hybrid needs careful server-side enforcement; a contract graph makes every read a traversal, and a bug is a cross-boundary leak
- The alliance-only framing in [users.md § Cross-org sharing within alliances](../spec/users.md#cross-org-sharing-within-alliances) needs rewriting as a general mechanism, and ADR-003's constraint section needs amending
- Promoting Campaign to a contracting party adds a node type to a model that previously treated it as structural
- Read logging on compartments creates an access record that is itself sensitive, in tenants that may be under surveillance

**Constraints:**
- The tenant remains the isolation boundary; nothing here permits shared databases or weakens ADR-001
- Person-level consent continues to override contract terms ([users.md § Cross-org sharing within alliances](../spec/users.md#cross-org-sharing-within-alliances))
- The platform is never a party to a contract and therefore never a tiebreaker, generalizing [mvp.md § 8. What "egalitarian" costs architecturally](../spec/mvp.md#8-what-egalitarian-costs-architecturally)
- Equal rights do not equalize leverage ([mvp.md § 8. What "egalitarian" costs architecturally](../spec/mvp.md#8-what-egalitarian-costs-architecturally)). A candidacy that revokes against its party may find itself deselected. The contract is a technical guarantee, not a political one, and nothing in this ADR changes that
- ALLY-005's Phase 2 data model must be general per the section above, or this ADR becomes a migration rather than a decision

**Related ADRs:** [ADR-001](001-platform-architecture.md) (federation model, tenant isolation), [ADR-002](002-security-threat-model.md) (BYOK key scope), [ADR-003](003-identity-access-organization.md) (amended — permission model and the outermost-scope constraint), [ADR-004](004-data-model-integrity.md) (extended — audit trail covers reads for compartmented data), [ADR-016](016-cross-cutting-resolutions.md) (alliance governance, joint campaign ownership)
