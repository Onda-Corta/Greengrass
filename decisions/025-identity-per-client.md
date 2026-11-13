# ADR-025: Identity per Client

**Status:** Accepted
**Date:** 2026-11-13
**Sources:** `spec/users.md`, `spec/compliance.md`, `spec/workflows.md`, `design/architecture/system.md`, `decisions/001-platform-architecture.md`, `decisions/003-identity-access-organization.md`, `decisions/016-cross-cutting-resolutions.md`, `decisions/017-sharing-contract-trust-model.md`, `decisions/022-core-modules-and-lanes.md`

## Context

[ADR-003 § Federated identity with per-tenant profiles](003-identity-access-organization.md#federated-identity-with-per-tenant-profiles) decided that a person has one platform-level identity and one profile per tenant. [system.md § Identity & Authentication Architecture](../design/architecture/system.md#identity-authentication-architecture) built it: an identity service shared by every tenant, outside all of them, with a centralized primary in the incorporation jurisdiction and read replicas in each country. [users.md § Multi-org membership](../spec/users.md#multi-org-membership) describes what a person sees: one login across organizations, and a tenant selector when they belong to more than one.

That service is the one place in the architecture where data about people in every organization sits together. It was accepted because it made one person, one login possible, and because it let the alliance layer see that a person existed across member tenants.

The product side has decided otherwise, in one sentence of the two-lane description ([ADR-022 § Two lanes on one infrastructure](022-core-modules-and-lanes.md#two-lanes-on-one-infrastructure)): each client runs its own instance, with its own data and its own accounts. Identity is per client.

### Conflicts this ADR resolves

This ADR reverses an accepted decision. The conflicts are named so that the reversal is visible.

1. **[ADR-003 § Federated identity with per-tenant profiles](003-identity-access-organization.md#federated-identity-with-per-tenant-profiles)** and **[ADR-003 § Platform identity vs. person-owned data split](003-identity-access-organization.md#platform-identity-vs-person-owned-data-split)** decide one platform-level identity per person. Superseded.
2. **[system.md § Identity & Authentication Architecture](../design/architecture/system.md#identity-authentication-architecture)** specifies a shared platform identity service with a centralized primary and per-country read replicas. Superseded.
3. **[users.md § Multi-org membership](../spec/users.md#multi-org-membership)** specifies one login across organizations and a tenant selector. Removed as specified.
4. **[ADR-016](016-cross-cutting-resolutions.md) §59** specifies platform-assisted recovery for a locked-out Org Admin, run by GreenGrass support against the shared service. It becomes a procedure of each instance's operator.
5. **[compliance.md § Cross-Border Data Transfers](../spec/compliance.md#cross-border-data-transfers)** places platform identity data in the incorporation jurisdiction with replicas in each country. With no platform identity data, that line has nothing to describe.

## Decision

### Each instance runs its own identity service and holds its own accounts

Each client's instance runs its own identity service: its own credential store, its own session manager and its own recovery service. An account exists in one instance and nowhere else. There is no identity component outside the instances, no centralized primary and no per-country replicas.

Everything about how a person authenticates is unchanged: passkeys first, the fallbacks and tiers of ADR-016 §57 to §60, field-mode authentication, trusted-contact recovery, role-based session duration. Those were decisions about the service's behaviour. This ADR changes where the service runs and whose accounts it holds.

**Alternatives considered:** The shared platform identity service was the accepted design and is what this ADR replaces. What it bought was one login for a person in several organizations, and a platform-level view of the same person across them. The decision gives both up, and in exchange removes a central component and the cross-client data it held. ADR-003 had rejected per-tenant identities because they create duplicate records, fragment donation history and make alliance-level coordination impossible. Those costs are real and are listed under Consequences.

### What follows

- **One more central component disappears,** along with the cross-client data it held. The platform layer no longer contains identity.
- **Self-hosted instances get simpler.** A self-hosted client no longer depends on an identity service it does not run.
- **Multi-org membership goes away as specified.** A person who works in both the PIP and the Alianza has two accounts, and there is no tenant selector.
- **Recovery for a locked-out Org Admin becomes a per-instance operator procedure.** ADR-016 §59 has GreenGrass support run it against the shared service. This ADR changes who performs it and where, and nothing else about it: the verification, the 72-hour cooling-off period and the notification of the organization's contacts are as §59 decided them.
- **Single sign-on across an alliance and its members is not part of this design.** If it is wanted later, it can be added as an opt-in trust between instances.

### What the platform identity held, and where it goes

[ADR-003 § Platform identity vs. person-owned data split](003-identity-access-organization.md#platform-identity-vs-person-owned-data-split) gave the person a platform-level record: credentials, name and contact details, language preference, communication opt-in and opt-out preferences, donation history as the donor's own record, and organization memberships. The split between what belongs to the person and what belongs to the organization still describes what an instance holds about its own people. What changes is that nothing sits above the instances to hold the person's side once for all of them.

- **Credentials, name, contact details and language preference** are held per instance, in the account.
- **Consent and communication preferences** are held per instance, in the Core CRM ([ADR-022 § What the Core contains](022-core-modules-and-lanes.md#what-the-core-contains)). An opt-out recorded in one instance holds everywhere in that instance. It reaches another organization only under a sharing contract between the two ([ADR-017](017-sharing-contract-trust-model.md)); [ADR-024](024-event-bus-as-federation.md) proposes how.
- **Matching the same person across organizations** no longer has a shared identity to rely on. Mutual suppression already matches on a blind index keyed per alliance contract and held by the members ([system.md § Cross-channel orchestration engine](../design/architecture/system.md#cross-channel-orchestration-engine)), so it is unaffected.

Three things the platform identity gave have no replacement in this ADR, and are recorded as open rather than answered:

1. **The donor's own record across organizations.** A person's donation history was theirs at platform level. Each instance now holds only its own donations from that person.
2. **Portability.** A person could leave an organization and keep their identity. An account now ends with the instance it lives in, unless something is designed to carry it.
3. **A person-level opt-out of data sharing that binds every organization at once.** [users.md § Cross-org sharing within alliances](../spec/users.md#cross-org-sharing-within-alliances) reads that preference from "their platform preferences". It now has to be recorded in each instance that holds the person.

### What is rewritten, and what is marked

This ADR rewrites the sections that define identity: [system.md § Identity & Authentication Architecture](../design/architecture/system.md#identity-authentication-architecture), the platform-level entities in [system.md § Data Model](../design/architecture/system.md#data-model), and [users.md § Multi-org membership](../spec/users.md#multi-org-membership). It adds an **Amended by** line to [ADR-003](003-identity-access-organization.md) and extends the one on [ADR-016](016-cross-cutting-resolutions.md) for §59.

It does not chase every sentence that assumes a platform identity. Those that remain are in [workflows.md](../spec/workflows.md), [geography.md](../spec/geography.md), [compliance.md](../spec/compliance.md), the wireframes, and elsewhere in `system.md`. Where one of them is met in a document this change touches, it is marked `REVISIT:` and left as written. A reconciliation pass over the rest is follow-up work.

## Consequences

**Benefits:**
- No component holds accounts or personal data across clients; the largest cross-client store in the architecture is gone
- A political client and a commercial client share no identity infrastructure
- An instance is complete on its own, which is what self-hosting and per-country residency both want
- The incorporation-jurisdiction primary, its replicas and their failover are no longer built or operated

**Costs:**
- A person in several organizations has several accounts and several logins
- The same person is a separate record in each instance, and matching across organizations exists only where a contract provides it
- The donor's cross-organization record, identity portability and a single person-level sharing opt-out lose their home, and nothing replaces them yet
- Org Admin recovery depends on each instance's operator, and a self-hosted client has to run the procedure itself
- An accepted decision is reversed, and the documents that assumed it need a reconciliation pass that is not done here

**Constraints:**
- No identity data is held outside a client's instance
- Authentication methods, tiers and recovery safeguards stay as ADR-016 §57 to §60 decided them
- Person-level consent still overrides contract terms ([ADR-017](017-sharing-contract-trust-model.md)); it is recorded per instance
- Single sign-on between instances, if added, is opt-in and is a trust between instances, never a shared service

**Related ADRs:** [ADR-001](001-platform-architecture.md) (one instance per client; identity now follows the same rule), [ADR-002](002-security-threat-model.md) (authentication methods, unchanged), [ADR-003](003-identity-access-organization.md) (amended: federated platform identity and multi-org membership superseded; roles, scoping, sharing and governance unchanged), [ADR-016](016-cross-cutting-resolutions.md) (§57 to §60 unchanged in substance; §59 recovery becomes a per-instance procedure), [ADR-017](017-sharing-contract-trust-model.md) (contracts carry what a shared identity used to), [ADR-022](022-core-modules-and-lanes.md) (identity is Core, one service per client), [ADR-024](024-event-bus-as-federation.md) (proposes how consent crosses between instances)
