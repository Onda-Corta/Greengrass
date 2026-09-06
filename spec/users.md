# Users & Roles

## Overview

GreenGrass serves two distinct categories of people:

1. **Platform users** — people who log in and use the software to run or participate in a campaign
2. **Database records** — people who exist in the CRM as contacts, voters, or constituents, but may never log in

The product description states "explicit login access for *everyone*" — this means the boundary between these two categories is porous by design. A voter record can become an active user. A donor who gives once through a form can later be invited to volunteer. The system must support this fluidity without creating duplicate records.

---

## Organizations

Each GreenGrass tenant is an **organization**. An organization could be:

- A political campaign (candidate running for office)
- A political party (ongoing entity managing multiple campaigns)
- An advocacy or activist organization
- A coalition or movement coordinating across groups

### Organization Hierarchy

**DECIDED:** The org model is a federation of sovereign entities connected by affiliation, not ownership.

**Entity types:**

| Entity | Tenant type | Description |
|--------|------------|-------------|
| Alliance | Lightweight | Coalition of parties, orgs, and/or candidates. Has its own billing, staff, volunteer pool, member/supporter data, and joint campaigns. Does not duplicate the full CRM/fundraising/comms stack of its members. |
| Party / Organization | Full | Political party, advocacy org, movement. Complete platform access — CRM, fundraising, comms, analytics, own billing and accounts. |
| Candidate | Full | Individual running for office. Complete platform access — own data, billing, accounts. |
| Campaign | None (inherits) | Belongs to its parent entity (candidate, party, org, or alliance). Inherits parent's billing and admin structure. |

**Affiliation model:**

```
Alliance (sovereign, coordination layer)
├── Party / Organization (sovereign tenant) ── affiliation
│   └── Campaign(s)
├── Candidate (sovereign tenant) ── affiliation
│   └── Campaign(s)
└── Joint Campaign (alliance-level)
```

A candidate can also affiliate directly with a party:

```
Party (sovereign)
├── Candidate A (sovereign, affiliated) ── affiliation
├── Candidate B (sovereign, affiliated) ── affiliation
└── Party Campaign
```

**Rules:**

- **Every entity except Campaign is sovereign.** Each has its own data, billing, user accounts, and administrative control.
- **Affiliations are voluntary and do not transfer ownership.** A party does not own a candidate's data. An alliance does not own its members' data. Affiliation defines cooperation boundaries, not control.
- **Candidates can affiliate with a party, or operate independently.** An independent candidate with one campaign is just a standalone sovereign tenant.
- **Campaigns belong to their parent entity** (candidate, party/org, or alliance). They are not sovereign — they inherit their parent's billing and administrative structure.
- **Alliances are lightweight tenants** with their own operational capabilities: staff accounts, volunteer pools, member/supporter data, joint campaigns, and billing for shared costs. They do not replicate the full platform stack (full CRM, fundraising tools, comms suite) — member entities retain those independently.
- **Standalone operation** is always supported. Any entity can operate without affiliations.

### Cross-org sharing within alliances

Alliances enable cooperation at defined boundaries. Member orgs choose what to share:

**DECIDED:** All resource types are shareable, with per-resource opt-in by each member org.

**Shareable resources:**

| Resource | Description | Sovereignty note |
|----------|-------------|-----------------|
| Volunteer pools | Volunteers available for assignment to any member campaign | Volunteer's platform identity stays with them; assignment history is logged per-tenant |
| Voter contact data | Canvassing results shared to avoid duplicate door knocks | Org chooses which contact data to surface; internal tags/scores stay private unless explicitly shared |
| Event infrastructure | Joint rallies, shared RSVP lists, coordinated event scheduling | Event ownership stays with creating org; RSVPs flow to all co-hosting orgs |
| Fundraising | Joint fundraising pages with configurable donation splits | Each org's financial records remain sovereign; split rules defined at campaign level |
| Communication lists | Shared supporter lists for coordinated messaging | Orgs share list membership, not their internal segmentation or engagement data |
| Analytics | Aggregate dashboards across the alliance | Member orgs see alliance-wide aggregates; per-org breakdowns require that org's consent |

**Sharing rules:**

- **Opt-in per resource, per org.** Each member org explicitly chooses which resource types to share with the alliance. No default sharing.
- **Revocable.** An org can withdraw a shared resource. Data already copied or acted on (e.g., a volunteer who already worked a joint shift) remains in the audit trail, but ongoing access is cut.
- **Audited.** All sharing grants, revocations, and cross-org data access are logged.
- **Respects person-level consent.** If a supporter has opted out of data sharing in their platform preferences, their record is excluded from shared resources regardless of org-level settings.

### Multi-org membership

**DECIDED:** Platform identity with federated profiles.

A person has **one platform-level identity** and **one profile per tenant** they belong to. The platform knows it's the same person (enabling dedup and cross-org coordination at the alliance level), but each tenant only sees its own data about that person.

**Data ownership split:**

| Belongs to the person (platform-level) | Belongs to the tenant |
|---|---|
| Auth credentials (login, 2FA) | Role and permissions within that org |
| Name, contact info, language preference | Volunteer hours, shift history |
| Communication opt-in/opt-out preferences | Canvassing assignments and field notes |
| Donation history (as the donor's own record) | Internal tags, scores, segments |
| Org memberships and affiliation history | Staff notes about the person |
| Global account preferences | Task and event assignments |

**Portability:** A person's platform identity is independent of any tenant. They can leave an org, join a new one, or exist unaffiliated. Core identity data travels with the person; tenant-specific operational data stays with the tenant.

**Alliance visibility:** When member orgs participate in an alliance, the alliance layer can see that a person exists across member tenants for coordination purposes (e.g., dedup, shared volunteer pools, don't-re-knock lists). The *substance* of each tenant's data about that person is not exposed to the alliance without explicit sharing rules.

<!-- REVISIT: The boundary between person-owned and tenant-owned data will need stress-testing as we define canvassing workflows and alliance-level coordination in detail. Canvassing contact history is a known gray area — it's the campaign's operational data, but it's also a record of the person's labor, and the alliance may need selective access for coordination. -->

---

## Platform Roles

### Organization Admin

The top-level administrator for a tenant. Typically the campaign manager, party director, or organization leader.

**Capabilities:**
- Full access to all platform features
- Manage staff accounts, roles, and permissions
- Configure organization settings (branding, payment processors, integrations)
- Access all data (CRM, financial, analytics)
- Manage billing and subscription

**Typical users:** Campaign manager, party executive director, organization founder

---

### Staff

Paid or senior campaign workers with role-based access to specific platform areas. Staff is not a single role — it's a category with configurable permissions.

**Possible staff sub-roles:**

#### Communications Director
- Create and send email campaigns, SMS, WhatsApp messages
- Manage social media accounts and scheduling
- Access engagement analytics
- Manage email/SMS templates and contact lists

#### Finance Director
- Manage donation forms and payment processor configuration
- View and export financial reports
- Process refunds and manage recurring donations
- Track cash donations and generate compliance reports

#### Field Director
- Manage canvassing operations and turf assignments
- Oversee voter registration drives
- Manage phone banking campaigns and scripts
- Access field analytics (doors knocked, calls made, voter contacts)

#### Volunteer Coordinator
- Recruit, onboard, and manage volunteers
- Create and manage shifts, events, and task assignments
- Communicate with volunteers
- Track volunteer hours and activity

#### Data Manager
- Import, export, and clean CRM data
- Manage voter file imports and list segmentation
- Build reports and custom queries
- Manage deduplication and data quality

**DECIDED:** Hybrid — role templates as starting points with per-user permission overrides.

The platform ships with a default set of staff role templates (Communications Director, Finance Director, Field Director, Volunteer Coordinator, Data Manager). Org admins can:

- Assign a template to a staff member as-is (covers most cases)
- Assign multiple templates to one person (the three-person campaign where someone does comms and finance)
- Override individual permissions on top of a template (grant or revoke specific capabilities)
- Create custom role templates for their org

Templates are additive when stacked — assigning both Comms Director and Finance Director grants the union of both permission sets. Explicit revocations override grants.

---

### Volunteer

People who have signed up to help the campaign and have been given platform access. Volunteers are the largest user group and the most variable in terms of technical literacy and device capability.

**Capabilities:**
- View their assigned shifts, tasks, and events
- RSVP to events
- Access canvassing tools (mobile, offline-capable)
- Access phone banking interface
- Log their own activity
- Update their own profile and contact preferences

**Cannot:**
- View other volunteers' personal information
- Access financial data
- Send mass communications
- Export data
- Modify CRM records beyond their assigned canvassing data

**Typical users:** Community members, activists, students, retirees, part-time supporters

**DECIDED:** Volunteers have two tiers — Volunteer and Volunteer Team Lead.

#### Volunteer Team Lead

A field-level leadership role for managing a small group of volunteers during operations (canvassing days, phone banks, events). Not a staff role — team leads are still volunteers, but with scoped additional access.

**Capabilities (in addition to base Volunteer):**
- View their assigned team roster (names, contact info for coordination)
- Check in team members for shifts and events
- View their team's turf assignment and canvassing progress
- Reassign doors/calls within their team during an operation
- Report issues or flag data quality problems to staff
- Access a lightweight team dashboard (attendance, completion rates)

**Cannot:**
- View teams other than their own
- Create or modify shifts, events, or turf assignments (that's Volunteer Coordinator / Field Director)
- Access org-wide CRM data, financial data, or analytics
- Send mass communications

---

### Supporter

A person who has expressed support for the campaign — signed up on the website, donated, attended an event, signed a petition — but is not actively volunteering. Supporters may or may not have a login.

**If logged in, capabilities:**
- View their own profile and donation history
- Update contact preferences and communication opt-ins
- RSVP to public events
- Access public-facing candidate/organization profiles
- Make donations

**Typical users:** Donors, petition signers, newsletter subscribers, event attendees

---

### Candidate

The person running for office. In some campaigns, the candidate is heavily involved in platform use; in others, they are hands-off.

**Capabilities:**
- View dashboards and reports (read-only or curated views)
- Access their own public profile management
- View fundraising totals and event attendance
- Communicate with staff (internal messaging)

**DECIDED:** Candidate is a role template, not a separate role type.

The Candidate template provides a curated, simplified interface by default:
- Campaign dashboards and key metrics (fundraising, volunteer activity, events)
- Public profile management
- Fundraising totals and donor overview (without full financial admin)
- Event attendance and upcoming schedule
- Internal messaging with staff

The template intentionally excludes operational complexity (data management, volunteer shift scheduling, comms tools) by default, but since it's a template, permissions can be overridden for hands-on candidates who want full access.

**Design note:** The template system is a core pattern across the platform. All roles — staff sub-roles, volunteer tiers, and candidate — are implemented as permission templates that can be assigned as-is, stacked, or customized. This gives the platform good defaults for common configurations while allowing orgs to tailor access to their actual structure.

---

## CRM Record Types (Non-login)

These are people who exist in the database but may not have platform accounts.

### Voter / Constituent

A person in the voter file or constituent database. The core record in the CRM.

**Data points (typical):**
- Name, address, contact information
- Voting precinct / electoral district
- Voter registration status
- Voting history (elections participated in, not how they voted)
- Demographics (age, language preference)
- Support score / sentiment (from canvassing interactions)
- Communication history (emails opened, doors knocked, calls made)
- Tags and segments
- Household relationships

### Donor

A person who has made a financial contribution. May overlap with any other record type.

**Additional data points:**
- Donation history (amounts, dates, methods)
- Recurring donation status
- Compliance information (employer, occupation — varies by jurisdiction)

### Contact

A general-purpose record for people who don't fit neatly into voter or donor categories. Could be media contacts, allied organization leaders, elected officials, endorsers.

---

## The Omni-list and Deduplication

The product description calls for "an omni-list that de-dupes people." In practice, this means:

- A single person should have one canonical record regardless of how many times they appear across different data sources
- A voter who also donates and also volunteers is **one record** with multiple facets, not three separate records
- Role/type is additive — a record is tagged as voter + donor + volunteer, not siloed into one category

### Deduplication strategy

**DECIDED:** Composite matching with mobile phone number as the primary identifier.

The dedup engine uses weighted matching across multiple fields, with configurable weights per deployment to account for country-specific data quality and availability.

**Matching fields by priority:**

1. **Mobile phone number (primary)** — highest weight. Strong identifier in mobile-first contexts with high global south penetration. Normalized to international format (E.164).
2. **Email** — secondary. Useful where available but not assumed universal.
3. **National ID / voter ID** — definitive match where available. Treated as sensitive data with appropriate storage protections. Availability and format varies by country.
4. **Name + address** — fuzzy matching as supporting signal. Used to corroborate or surface potential matches, not as a sole match criterion.

**Configurable per deployment:** Match weights, required confidence thresholds, and which fields are available/relevant can be adjusted per tenant or per country context. A deployment in a country with universal national ID may weight that heavily; one where phone sharing is common may lower phone weight and require a second matching field.

### Merge behavior

**DECIDED:** Suggest and confirm.

The system flags potential duplicates and surfaces them in a review queue. A human with appropriate permissions (Data Manager or Org Admin) reviews and decides whether to merge, dismiss, or defer. No automatic merging — the risk of misattributing donations or losing canvassing history in a political context is too high.

The review interface should show a side-by-side comparison of the candidate records with match confidence score and which fields matched.

---

## Authentication & Access

The product description specifies "explicit login access for everyone, with easy-to-manage account preferences."

### Authentication methods

**DECIDED:** Passkeys as primary. No social login.

**Auth methods by priority:**

1. **Passkeys / WebAuthn (primary)** — most secure, phishing-resistant, no shared secrets. Well-suited for mobile devices where biometric unlock (fingerprint, face) makes creating and using a passkey a single gesture. No per-login cost. Eliminates SIM-swapping risk.
2. **Email magic link (secondary)** — fallback for devices or contexts where passkeys aren't supported. Simpler than passwords, no credentials to remember or steal.
3. **Phone + SMS OTP (tertiary)** — fallback for users without email. Accessible but has per-login cost and SIM-swapping risk. Should be paired with a prompt to set up a passkey.
4. **Email + password (legacy fallback)** — available but not promoted. For users or contexts where the above methods aren't viable.

**Explicitly excluded:** Social login (Google, Facebook, etc.). Tying political activity to a commercial identity creates surveillance risk and platform dependency. Not appropriate for this context.

**Security note:** For staff and admin roles, passkey should be strongly encouraged or required. For volunteers and supporters, the system should default to passkey setup during onboarding but allow fallback methods without extra steps.

### Session management

**DECIDED:** Role-based session duration with remote revocation and shift-based lifecycle.

**Session duration by role:**

| Role | Session duration | Rationale |
|------|-----------------|-----------|
| Org Admin | Short (hours) | Highest-privilege access, sensitive data |
| Staff | Medium (workday) | Operational access, regular use |
| Volunteer (general) | Medium (workday) | General platform access |
| Volunteer (field mode) | Shift-length | Persistent for the duration of an assigned shift, then ends |
| Supporter | Long (weeks) | Low-privilege, convenience matters for engagement |

**Remote session revocation:** Staff roles (Volunteer Coordinator, Field Director, Org Admin) can revoke any active session for users they manage. This is critical for lost/stolen devices during field operations. Revocation should be immediate and force re-authentication.

**Shift lifecycle as an event boundary:** Ending a canvassing or phone banking shift is a first-class platform event that triggers:

- Sync all outstanding offline data to the server
- Close the field mode session
- Log volunteer hours for the shift
- Prompt for a shift debrief (notes, issues encountered)
- Release turf/call list assignments
- Notify the Volunteer Coordinator / Team Lead of completion

<!-- REVISIT: The shift lifecycle event model should be expanded in the workflows spec. It's a natural hook for analytics, gamification (if desired), and quality control (flagging incomplete canvassing routes). -->

---

## Permissions Model

**DECIDED:** Hybrid — RBAC foundation with geographic and team-based attribute scoping.

**How it works:**

- **Role templates** determine *what actions* a user can perform (create events, send emails, manage volunteers, view financials)
- **Scope assignments** determine *on what data* those actions apply

**Scope types:**

| Scope | Description | Example |
|-------|-------------|---------|
| Geographic | Limits access to a region, district, precinct, or turf | Field Director assigned to the north side only sees north side data |
| Team | Limits access to a specific team or group | Team Lead sees only their team's roster and progress |
| Campaign | Limits access to a specific campaign within the tenant | Staff member working only on the municipal race, not the gubernatorial |
| Unscoped | Full access within the tenant (default for Org Admin) | Org Admin sees everything |

**Scoping rules:**

- Scopes are **assigned per user**, not per role template. Two Field Directors can have different geographic scopes.
- Scopes are **additive** — a user assigned to District 5 and District 6 sees both.
- **Org Admin is unscoped by default** — full visibility across the tenant. Can be scoped down if desired (e.g., a large party where regional admins manage their own area).
- Scopes apply as a **filter on data access**, not on feature access. A scoped Field Director has the same tools as an unscoped one — they just see a different slice of data.
- Scopes **compose with the federation model** — tenant boundaries are the outermost scope, then geographic/team/campaign scoping narrows within a tenant.

<!-- REVISIT: Geographic scoping depends on the geographic data model (how precincts, districts, turfs, and regions are structured and nested). This should be defined in the architecture spec. -->

---

## Open Questions

1. ~~**Multi-org membership**~~ — **RESOLVED.** Federated profiles. See Multi-org membership section above.
2. ~~**Organization hierarchy**~~ — **RESOLVED.** Multi-level federation of sovereign entities. See Organization Hierarchy section above.
3. ~~**Role transitions**~~ — **RESOLVED.** Templates are additive. Transitioning from supporter to volunteer to staff means adding templates, not replacing them. All prior activity history carries forward on the platform identity. Approval gates are role-appropriate: a supporter can self-promote to volunteer (sign up for a shift), but staff roles require Org Admin to grant.
4. ~~**Data visibility across roles**~~ — **RESOLVED.** Per-tenant configuration, private by default. Each org decides its own visibility rules (e.g., whether volunteers can see co-volunteers on a shift, whether donor names are shown publicly). The platform defaults to minimal visibility — orgs must opt in to more open settings. This accounts for the range of political safety contexts across deployments.
5. ~~**Delegation**~~ — **RESOLVED.** Two mechanisms:
   - **Time-bound delegation:** Org Admin can grant temporary elevated access to another user with an explicit expiration date. Access automatically revokes when the period ends. Covers leave, travel, emergencies.
   - **Deputy template:** A standing role template with near-admin access (manage staff, run operations, view all data) but without the most sensitive capabilities (billing management, revoking other admins, deleting the tenant). Covers the ongoing second-in-command need.
6. ~~**Audit trail**~~ — **RESOLVED.** Full audit logging. Every data change is logged — who, what, when, from where. This includes CRM edits, financial transactions, permission changes, logins, data exports, record merges, bulk operations, and session events. Election integrity and trust are core to the platform; a complete audit trail is non-negotiable.
   <!-- REVISIT: Retention policies and storage strategy (tiered storage, archival, per-tenant vs shared audit infrastructure) should be addressed in the architecture spec. Compliance requirements for audit retention will vary by jurisdiction. -->
7. ~~**Account recovery**~~ — **RESOLVED.** Trusted contact recovery, in-app.
   - During onboarding, the user designates one or more trusted contacts within their org (e.g., their team lead, volunteer coordinator, or a staff member).
   - When locked out, the user initiates a recovery request through the app (on a new device or via a web login screen).
   - The trusted contact receives the request in-app, verifies the person's identity (in person, by phone — whatever satisfies them), and approves the recovery.
   - The system issues a new credential setup flow (new passkey on the new device).
   - The entire recovery process is logged in the audit trail: who requested, who approved, when, from what device.
   - **Safeguard:** Trusted contacts can only approve recovery for users they are explicitly designated for — not for arbitrary accounts. Org Admins can override as a last resort, also fully logged.
8. ~~**Platform-level admin**~~ — **RESOLVED.** Platform Admin role, no user impersonation.

   **Platform Admin** exists outside the tenant model. It is the GreenGrass team's operational role for managing the platform itself.

   **Capabilities:**
   - Tenant provisioning and lifecycle (create, suspend, decommission)
   - Billing and subscription management across tenants
   - System monitoring, health dashboards, and infrastructure management
   - Deployment management (push updates across tenants in the single-tenant architecture)
   - Full read visibility into tenant data for support and debugging
   - Manage alliance affiliations at the platform level

   **Explicitly excluded:** User impersonation. Platform Admins cannot log in as or act as a tenant user. Support and debugging is done through read-only visibility, not by assuming another identity. This preserves tenant trust and audit trail integrity.
