# ADR-003: Identity, Access & Organization

**Status:** Accepted
**Date:** 2026-03-03
**Sources:** `spec/users.md`, `spec/workflows.md`

## Context

GreenGrass users often participate in multiple organizations — a volunteer may work for a candidate, a party, and an alliance simultaneously. The platform must handle this multi-org reality without creating duplicate identities or leaking data between organizations. At the same time, the role and permissions model must accommodate the wide variety of campaign structures — from a three-person candidate campaign where one person does communications and finance, to a national party with hundreds of staff in scoped geographic regions.

Volunteer approval is another tension point: low-threat campaigns want volunteers signing up and working the same day, while campaigns facing infiltration threats need to vet every signup.

## Decision

### Federated identity with per-tenant profiles

A person has one platform-level identity (auth credentials, name, contact info, language preference, communication opt-in/opt-out, donation history as the donor's record) and one profile per tenant they belong to (role, permissions, volunteer hours, canvassing assignments, internal tags, staff notes). The platform knows it's the same person — enabling deduplication and cross-org coordination at the alliance level — but each tenant only sees its own data about that person.

A person's platform identity is independent of any tenant. They can leave an org, join a new one, or exist unaffiliated. Core identity data travels with the person; tenant-specific operational data stays with the tenant.

**Alternatives considered:** Per-tenant identities (separate account per org) was rejected because it creates duplicate records, fragments donation history, and makes alliance-level coordination impossible. Fully shared profiles were rejected because they leak operational data between organizations.

### Platform identity vs. person-owned data split

| Belongs to the person (platform-level) | Belongs to the tenant |
|---|---|
| Auth credentials (login, 2FA) | Role and permissions within that org |
| Name, contact info, language preference | Volunteer hours, shift history |
| Communication opt-in/opt-out preferences | Canvassing assignments and field notes |
| Donation history (as the donor's own record) | Internal tags, scores, segments |
| Org memberships and affiliation history | Staff notes about the person |

This split ensures data portability (a person can take their identity with them) while respecting organizational sovereignty over operational data.

### Hybrid role templates with per-user overrides

The platform ships with default staff role templates (Communications Director, Finance Director, Field Director, Volunteer Coordinator, Data Manager, Candidate, Deputy). Org admins can assign templates as-is, stack multiple templates on one person (the three-person campaign scenario), override individual permissions, or create custom templates. Templates are additive when stacked — explicit revocations override grants.

The permissions model is hybrid RBAC + attribute scoping: role templates determine what actions a user can perform, while scope assignments (geographic, team, campaign, unscoped) determine on what data those actions apply.

**Alternatives considered:** Pure RBAC without scoping was rejected because campaigns need geographic and team-based access control. Pure ABAC was rejected as too complex for campaign staff to manage. Fixed roles without customization were rejected because no two campaign structures are alike.

### All resource types shareable in alliances

Alliances enable cooperation at defined boundaries. Shareable resources include volunteer pools, voter contact data, event infrastructure, fundraising (with configurable splits), communication lists, and analytics. Sharing is opt-in per resource and per org, revocable, audited, and respects person-level consent. No default sharing — each member org explicitly chooses what to share.

### Configurable volunteer approval policy

Each org sets their own policy: auto-approve (volunteers immediately active) or require approval (Volunteer Coordinator reviews each signup). The default can be set at the org level with overrides per signup channel (e.g., auto-approve referrals, require approval for cold signups).

**Alternatives considered:** Always-approve was rejected because high-threat campaigns need to vet for infiltration. Always-require-approval was rejected because it creates unnecessary friction for low-threat environments.

### Configurable alliance governance models

Alliances choose a governance model per joint campaign:
- **Alliance-controlled** — Alliance Admin directs operations, member orgs contribute resources
- **Org-controlled** — each member org runs independently, alliance provides coordination
- **Shared governance** — joint campaign with its own role structure and staff from multiple orgs

Different campaigns within the same alliance can use different models.

## Consequences

**Benefits:**
- People can participate in multiple organizations without duplicate identities
- The data ownership split protects both person-level portability and organizational sovereignty
- Template stacking handles the full range of campaign sizes without custom role engineering
- Alliance sharing is granular enough for real coalition politics while preserving each org's autonomy
- Configurable approval policies accommodate both open and security-sensitive campaigns

**Costs:**
- Federated identity adds complexity to deduplication, especially when the same person joins an org both as a voter record and as an active user
- The RBAC + scoping hybrid requires careful server-side enforcement to prevent scope leaks
- Alliance sharing rules create complex access control chains that must be audited

**Constraints:**
- Tenant boundaries are the outermost scope — no user ever sees data from a tenant they don't belong to
- Alliance visibility of cross-tenant people is limited to coordination metadata unless explicit sharing rules are in place
- Person-level consent overrides org-level sharing settings

**Related ADRs:** [ADR-001](001-platform-architecture.md) (federation model), [ADR-002](002-security-threat-model.md) (authentication methods), [ADR-004](004-data-model-integrity.md) (audit trail for permission changes), [ADR-008](008-communications-messaging.md) (alliance communication encryption)
