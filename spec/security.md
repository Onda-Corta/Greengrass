# Security & Threat Model

## Why This Document Matters

GreenGrass is a political organizing platform operating in the global south. This is not a standard enterprise security context. The people using this platform — candidates, organizers, volunteers, supporters — may face real-world consequences if their data is compromised: surveillance, harassment, arrest, or violence. Security failures are not just reputational or financial risks — they are safety risks.

Evaluate every security decision against this reality.

---

## Threat Actors

### Tier 1: State Actors

Nation-state intelligence and security services with significant technical capabilities.

**Motivation:** Monitor opposition political activity, identify organizers, suppress movements, gather intelligence on candidates and their supporters.

**Capabilities:**
- Network traffic interception and deep packet inspection
- Compel local ISPs and telecoms to hand over data
- Legal and extralegal access to cloud infrastructure within their jurisdiction
- Targeted device compromise (spyware like Pegasus)
- Social engineering at scale
- Physical seizure of devices

**Likelihood:** High in many target countries. This is the defining threat.

### Tier 2: Non-State Geopolitical Actors

Multinational corporations, foreign political organizations, extractive industries, transnational NGOs, and other powerful non-state entities with interests in the political outcome.

**Motivation:** Protect business interests (mining, energy, agriculture), advance foreign political agendas, suppress labor or environmental movements, maintain favorable regulatory environments.

**Capabilities:**
- Corporate intelligence and private investigation firms
- Commercial surveillance tools (legally acquired spyware, data brokers)
- Significant financial resources to hire technical talent
- Legal pressure (lawsuits, injunctions to compel data disclosure)
- Influence over local media and institutions
- Social media manipulation and astroturfing at scale

**Likelihood:** High in contexts where grassroots campaigns challenge entrenched corporate or foreign interests — extractive industries, land rights, labor organizing, environmental movements.

### Tier 3: Political Opponents

Rival campaigns, parties, or political operatives.

**Motivation:** Gain competitive advantage — steal voter data, donor lists, campaign strategy. Discredit or disrupt opposition campaigns.

**Capabilities:**
- Social engineering (posing as volunteers to gain access)
- Bribery or coercion of insiders
- Hiring hackers or using commercial surveillance tools
- Weaponizing stolen data through media leaks

**Likelihood:** High, especially during election cycles.

### Tier 4: Criminal Actors

Organized crime, ransomware operators, opportunistic attackers.

**Motivation:** Financial gain — ransom, selling data, fraud using donor payment information.

**Capabilities:**
- Ransomware and extortion
- Credential stuffing and phishing
- Exploiting known vulnerabilities
- Payment fraud

**Likelihood:** Moderate. Political campaigns are not primary targets for most criminal actors, but donor payment data and the high-profile nature of campaigns can attract attention.

### Tier 5: Insider Threats

Current or former staff, volunteers, or affiliated org members.

**Motivation:** Personal grievance, ideological disagreement, coercion by external actors, financial incentive.

**Capabilities:**
- Legitimate access to the platform (role-based)
- Knowledge of internal processes and personnel
- Ability to exfiltrate data gradually over time
- Ability to sabotage data or operations

**Likelihood:** Moderate. Campaigns are high-turnover, emotionally charged environments with large volunteer bases and varying levels of vetting.

---

## Assets to Protect

### Critical Assets (compromise causes direct harm to people)

| Asset | Risk if compromised |
|-------|-------------------|
| Supporter/volunteer identity and contact info | Targeting, harassment, arrest in hostile political environments |
| Voter contact data with political sentiment | Reveals who supports the opposition — dangerous under authoritarian regimes |
| Canvassing notes and field data | Detailed records of who said what to whom at their home address |
| Candidate private communications | Blackmail, political manipulation, media leaks |
| Donor identity and contribution history | Financial targeting, political retaliation, extortion |

### High-Value Assets (compromise causes operational damage)

| Asset | Risk if compromised |
|-------|-------------------|
| Campaign strategy and internal analytics | Competitive advantage lost to opponents |
| Voter file and segmentation data | Months of organizing work stolen |
| Financial records and payment processor credentials | Fraud, fund theft, compliance violations |
| Platform credentials and access tokens | Full system compromise, impersonation |
| Audit logs | Cover tracks after a breach, undermine trust |

### Infrastructure Assets

| Asset | Risk if compromised |
|-------|-------------------|
| Application servers and databases | Full data breach, service disruption |
| Backup systems | Data destruction (ransomware), historical data theft |
| Deployment pipelines | Supply chain attack, malicious code injection |
| DNS and domain control | Phishing, traffic interception, service hijacking |
| SMS/email sending infrastructure | Impersonation, misinformation campaigns |

---

## Security Principles

1. **Assume breach.** Design every layer assuming the layer above it has been compromised. Defense in depth, not perimeter security.
2. **Minimize blast radius.** Single-tenant architecture helps here — compromising one tenant should not expose another.
3. **Minimize data collection.** Don't collect data you don't need. Every field stored is a field that can be stolen.
4. **Encrypt everything.** At rest, in transit, no exceptions.
5. **Audit everything.** Full audit logging (decided in users.md) is a security control, not just a compliance feature.
6. **Default to private.** Decided in users.md — private by default, opt-in to visibility.
7. **Sovereign data, sovereign infrastructure.** Tenant data should stay within jurisdictions the tenant controls.
8. **No single point of compromise.** No single credential, key, or person should be able to expose the entire platform.

---

## Encryption

### In Transit

**DECIDED:** TLS 1.2+ with TLS 1.3 preferred. Clients that support 1.3 negotiate it automatically; older devices fall back to 1.2 with weak cipher suites disabled. Balances security with device accessibility in the global south.

All network communication must be encrypted:
- Client ↔ server: HTTPS with HSTS, certificate pinning in mobile clients
- Server ↔ server: mutual TLS for internal service communication
- Server ↔ third-party APIs: TLS with certificate validation

### At Rest

All stored data must be encrypted at rest:
- Database encryption (transparent data encryption or filesystem-level)
- Backup encryption with separate key management
- Local device storage encryption for offline-capable features (canvassing app data on the volunteer's phone)

**DECIDED:** Yes. High-sensitivity fields receive application-level encryption on top of storage-level encryption. Defense in depth — a database compromise alone does not expose the most sensitive data.

**Fields requiring application-level encryption:**
- Political sentiment scores and support ratings
- Canvassing notes and field interaction records
- Donor identity and contribution details
- Candidate private communications
- National ID / voter ID numbers

<!-- REVISIT: The specific implementation (envelope encryption, searchable encryption, or decrypt-on-read) should be addressed in the architecture spec. Tradeoffs between query capability and security will need to be evaluated per field. -->

### End-to-End Encryption

**DECIDED:** End-to-end encryption by default for internal messaging, with optional tenant-controlled key escrow.

- **Default:** All internal messaging (staff-to-staff, candidate-to-campaign-manager) is E2E encrypted. GreenGrass cannot read message content and has nothing to hand over if compelled.
- **Opt-in escrow:** Tenants can choose to enable server-side key escrow for their org. This enables message search, easier device recovery, and message history continuity — at the cost of GreenGrass (and potentially a legal demand) being able to access content.
- **Transparent:** The choice is surfaced clearly to users. If escrow is enabled, the messaging UI should indicate that messages are not E2E encrypted in that org.
- **Per-tenant, not per-user:** This is an org-level setting, not an individual choice. The Org Admin decides the tradeoff for their organization.

<!-- REVISIT: Key management UX, device recovery flow for E2E mode, and the escrow mechanism need detailed design in the architecture spec. -->

---

## Data Sovereignty & Residency

### The Problem

GreenGrass operates across multiple countries. Each country has different laws about:
- Where data can be stored
- Who can compel access to data (courts, intelligence services, police)
- What data protection rights citizens have
- Whether political data has special protections

A campaign in Country A should not have its data stored in or accessible from Country B, especially if Country B has an adversarial relationship with the campaign's political movement.

### Data Residency

**DECIDED:** Per-country data residency as standard, with a self-hosted option.

**Per-country residency (managed):**
- Each tenant's data is stored within their country or a country they explicitly choose at provisioning time.
- GreenGrass manages the infrastructure — deployment, updates, monitoring, support.
- Requires GreenGrass to establish hosting presence in each target country, either through local cloud providers or in-country data centers.
- The single-tenant architecture makes this architecturally natural — each tenant is already isolated, so placing that isolation in a specific country is an operational question, not an architectural one.

**Self-hosted option:**
- For the most security-sensitive tenants, GreenGrass provides the software for deployment on the tenant's own infrastructure.
- The tenant controls physical and network security, data residency, and access.
- GreenGrass provides update packages, documentation, and support — but does not have access to the tenant's instance unless explicitly granted.
- Self-hosted tenants are responsible for their own backups, monitoring, and infrastructure maintenance.

<!-- REVISIT: The self-hosted option has significant implications for update delivery, version fragmentation, and support cost. Needs detailed treatment in the architecture spec. Also, the per-country hosting strategy needs a rollout plan — which countries first, which cloud providers, cost modeling. -->

### Legal Jurisdiction

**DECIDED:** Incorporate in a privacy-strong jurisdiction. Architectural inability to comply where possible. Transparency measures.

**Incorporation:**
- GreenGrass will incorporate in a jurisdiction with strong, stable privacy and data protection laws — candidates include Estonia and Switzerland.
- The jurisdiction should provide: strong data protection regulation, political stability, no history of extralegal data compulsion, and a legal framework that supports refusing foreign government data demands.

<!-- REVISIT: Final incorporation decision requires legal counsel. Key factors: mutual legal assistance treaties (MLATs) the jurisdiction participates in, whether the jurisdiction can be pressured by larger powers, tax implications, and practical considerations for operating a global business. -->

**Data compulsion response:**
- Where possible, GreenGrass should be **architecturally unable to comply** with data demands — if the tenant holds their own encryption keys (see BYOK decision below), GreenGrass cannot decrypt tenant data even under court order.
- For managed tenants where GreenGrass holds keys, the company will challenge overbroad or politically motivated demands using the full legal protections of its incorporation jurisdiction.
- GreenGrass will not voluntarily cooperate with data demands from governments that are not the jurisdiction of incorporation, absent a valid legal process recognized by that jurisdiction.

**Transparency:**
- **Warrant canary:** GreenGrass will maintain a publicly posted, regularly updated statement confirming it has not received secret government demands for data. If the statement disappears, users can draw their own conclusions.
- **Transparency report:** Regular public reporting of all government data requests received, how they were handled, and how many were complied with, challenged, or refused. Published at minimum annually.

---

## Infrastructure Security

### Single-Tenant Isolation

The single-tenant architecture (decided in the product description) is a security advantage:

- **No cross-tenant data leakage** — each tenant has its own database, application instance, and resources
- **Compromising one tenant doesn't expose others** — blast radius is limited to one organization
- **Tenant-specific security policies** — each tenant can have different encryption keys, data residency, and access controls

**DECIDED:** Tiered isolation based on tenant risk profile and needs.

| Tier | Isolation level | For whom |
|------|----------------|----------|
| Standard | Separate containers, shared cluster | Small campaigns, advocacy orgs, low-threat environments |
| Enhanced | Separate cluster | Mid-size campaigns, elevated threat environments, tenants handling large voter files |
| Maximum | Separate cloud account | High-risk campaigns under active state surveillance, large parties, tenants requiring auditability of infrastructure access |
| Self-hosted | Tenant's own infrastructure | Tenants who require full physical and administrative control |

Tenants select their tier at provisioning time. Tier upgrades are supported without data migration downtime (the single-tenant architecture means moving a tenant is operationally straightforward, even if not trivial).

<!-- REVISIT: Pricing implications per tier, and whether certain threat assessments should trigger a mandatory minimum tier, need to be addressed in the business model and onboarding specs. -->

### Network Security

- Network segmentation between tenants
- No direct tenant-to-tenant communication (alliance sharing goes through the platform layer)
- Intrusion detection and monitoring
- DDoS protection (campaigns are high-profile targets during election periods)

### Secrets Management

- No secrets in code, configuration files, or environment variables
- Centralized secrets management (e.g., HashiCorp Vault or cloud-native equivalent)
- Automatic secret rotation
- Separate encryption keys per tenant

**DECIDED:** BYOK by default. GreenGrass-managed keys as opt-in.

- **Default:** Tenants generate and hold their own encryption keys. GreenGrass cannot decrypt tenant data. This is the strongest trust model — GreenGrass cannot be compelled to expose data it cannot read.
- **Opt-in managed keys:** Tenants who explicitly choose convenience over sovereignty can opt into GreenGrass-managed keys. This enables GreenGrass support to assist with data recovery and simplifies operations for less technical orgs.
- **The choice is transparent:** Tenants are clearly informed during onboarding what each option means. BYOK is presented as the recommended default, not a power-user feature.
- **Key management UX:** The burden of key management on tenants is a UX problem to solve, not a reason to centralize control. The platform must provide guided key generation, secure backup flows, and clear recovery documentation.
- **Key loss:** If a BYOK tenant loses their key, the data is unrecoverable. This is a feature, not a bug — it means the data is equally unrecoverable by anyone else. The onboarding flow must make this consequence unmistakably clear.

<!-- REVISIT: Key backup UX, key rotation procedures, and multi-party key recovery (e.g., Shamir's secret sharing across multiple org admins) should be designed in the architecture spec. -->

---

## Application Security

### Authentication Security
(See users.md for auth method decisions — passkeys primary, no social login)

- Rate limiting on all auth endpoints
- Account lockout after failed attempts (with notification to the user and their trusted contacts)
- Credential stuffing protection
- Session token security (secure, httpOnly, sameSite cookies; short-lived access tokens with refresh rotation)

### Authorization Security

- Server-side authorization checks on every request (never trust client-side role checks)
- Principle of least privilege across all role templates
- Scope enforcement at the data query layer, not just the API layer
- Authorization decisions logged in the audit trail

### Input Validation & Injection Prevention

- All user input validated and sanitized server-side
- Parameterized queries (no string concatenation in database queries)
- Content Security Policy headers
- XSS protection on all rendered content
- File upload validation and sandboxing

### API Security

- Authentication required on all API endpoints
- Rate limiting per user, per tenant, and globally
- Request size limits
- API versioning to prevent compatibility-related security issues
- No sensitive data in URLs or query parameters

### Dependency Security

- Automated dependency scanning for known vulnerabilities
- Minimal dependency footprint — every dependency is an attack surface
- Lock files for reproducible builds
- Supply chain verification (signed packages where available)

---

## Operational Security

### GreenGrass Team Access

- Platform Admin access requires strong authentication (passkey + second factor)
- All Platform Admin actions logged in a separate, immutable audit trail
- Access to production systems requires justification and is time-bound
- No standing access to tenant data — read-only access granted per-incident, logged, and auto-revoked
- Background checks for team members with infrastructure access

**DECIDED:** Silent access. Platform Admin can read tenant data for support and debugging without tenant notification. All access is logged in the immutable Platform Admin audit trail. Standard operational approach — keeps support fast and unblocked during incidents.

### Incident Response

**DECIDED:** Fast notification, err on the side of speed over completeness.

**Notification:**
- Affected tenants are notified as quickly as possible — within hours, not days. If people's safety may be at risk, waiting 72 hours to craft a polished disclosure is unacceptable.
- Initial notification can be incomplete ("we have detected a breach affecting your tenant, here is what we know so far, here is what we are doing") followed by detailed updates as the investigation progresses.
- Notification goes to all Org Admins and Deputies of affected tenants through multiple channels (in-app, email, SMS) to ensure it's received even if one channel is compromised.

**Tenant isolation:**
- Compromised tenants are isolated immediately to prevent further data exposure. Campaign disruption is a serious cost, but ongoing data exfiltration is worse.
- The Org Admin is informed of the isolation and given a timeline for restoration.

**External forensics:**
- GreenGrass maintains a pre-arranged relationship with at least one external security firm for incident forensics. In-house capability is not sufficient for a serious breach — external expertise and credibility matter.

<!-- REVISIT: A full incident response plan (severity tiers, escalation procedures, communication templates, post-incident review process) should be developed as a standalone operational document. -->

### Vulnerability Disclosure

**DECIDED:** Both. Responsible disclosure policy from day one, bug bounty program once the platform is mature.

- **Disclosure policy (day one):** Published security contact, PGP key for encrypted reporting, clear responsible disclosure guidelines, commitment to not pursue legal action against good-faith researchers, and a defined response timeline.
- **Bug bounty (post-pilot):** Paid program for verified vulnerabilities, tiered by severity. Launched once the platform is stable enough to handle the volume of reports. Attracts active security testing from the research community, which is especially valuable for an open-source political platform.

---

## Device & Endpoint Security

### Volunteer Devices

Volunteers use their personal phones for canvassing. GreenGrass cannot control these devices.

**Protections:**
- Offline data stored on-device must be encrypted
- Field mode session expires at shift end (decided in users.md)
- Remote session revocation (decided in users.md)
- No sensitive data cached beyond what's needed for the current shift
- Data wiped from device on session end/revocation

**DECIDED:** Warn but don't block.

- The platform detects indicators of device compromise (jailbreak, root, known spyware signatures) and surfaces a warning to the user: "Your device may be compromised. Avoid using it for sensitive campaign work."
- The warning is also surfaced to the user's Org Admin or Volunteer Coordinator so they can follow up.
- **Access is not blocked.** Users on older, modified, or custom-ROM devices — common in the global south — are not locked out. The user decides what to do with the information.
- Detection is best-effort and clearly communicated as such — not a guarantee of security.

### Staff Devices

**DECIDED:** Recommended guidelines by default, with opt-in enforcement via device attestation.

- **Default:** All staff receive recommended device security guidelines during onboarding (enable screen lock, keep OS updated, enable device encryption). The platform surfaces gentle reminders if it detects missing protections, but does not block access.
- **Opt-in enforcement:** Org Admins can enable device attestation for their tenant, either org-wide or per-role. When enabled, the platform checks device state (OS version, screen lock, encryption) and refuses access if minimum standards aren't met.
- **The choice belongs to the org.** A campaign operating in a high-threat environment can enforce strict device requirements. A small advocacy org using whatever devices people have can stick with guidelines. The platform supports both without imposing either.

---

## Anti-Surveillance Considerations

### Metadata Protection

Even if content is encrypted, metadata reveals patterns:
- Who logs in when (activity patterns reveal organizing cycles)
- Who communicates with whom (social graph of the movement)
- Geographic patterns (where canvassing happens reveals strategy)
- Donation timing and frequency

**DECIDED:** Tiered metadata protection. Moderate by default, aggressive available for high-risk tenants.

**Moderate (default):**
- Minimize metadata retention periods — purge detailed access logs on a defined schedule, retain only aggregates
- Strip identifying information from analytics where possible (aggregate trends, not individual activity timelines)
- Avoid logging unnecessary metadata (don't record which specific records a user viewed if you only need to know they logged in)
- Separate metadata storage from content storage so a breach of one doesn't automatically expose both

**Aggressive (opt-in for high-risk tenants):**
- Traffic padding to mask real usage patterns
- Timing obfuscation on requests to prevent activity correlation
- Minimal server-side logging — log only what's strictly necessary for security and operations
- Tor-compatible access (see traffic analysis decision below)

<!-- REVISIT: The moderate retention schedule (how long before metadata is purged/aggregated) needs to be defined in the architecture spec. Must balance security with the full audit logging requirement — audit logs and metadata logs serve different purposes and may have different retention rules. -->

### Traffic Analysis Resistance

**DECIDED:** Both domain fronting and Tor access available, neither required. Part of the aggressive metadata protection tier.

- **Domain fronting / CDN delivery:** Traffic appears to go to a generic CDN, making it harder for network-level surveillance to identify GreenGrass usage. Available for tenants on the aggressive metadata tier.
- **Tor-compatible access:** Users can access the platform through Tor for maximum anonymity. Slower, may be blocked in some countries, but available for those who need it.
- **Standard access is always supported.** The platform works normally over standard HTTPS. Domain fronting and Tor are additional options, not requirements.
- **Bundled with aggressive tier:** These features are available to tenants that opt into aggressive metadata protection, keeping the security model coherent — tenants who need traffic analysis resistance likely need the other aggressive-tier protections too.

### Physical Security Considerations

In some contexts, devices may be physically seized at checkpoints, protests, or raids.

**Protections:**
- Quick-lock mechanism (panic button that immediately locks the app and requires re-authentication)
- Configurable data retention on-device (option to keep no data locally)
- Duress mode (a secondary passkey that logs in to a sanitized/decoy view of the app)

**DECIDED:** In scope, part of the aggressive metadata protection tier.

- A secondary passkey logs into a sanitized view of the app — appears functional but contains no sensitive data. The real data remains hidden and inaccessible.
- The duress login is indistinguishable from a normal login to an observer. No visual cues, no different loading behavior, no telltale differences in the UI.
- A duress login triggers a silent alert to the user's trusted contacts and Org Admin, so the organization knows a coercion event may be occurring.
- **Available only on the aggressive tier.** Tenants operating in stable political environments don't need the complexity. Tenants in hostile environments can enable it.

<!-- REVISIT: The decoy view needs careful design — it must look realistic enough to withstand casual inspection. Should it show plausible fake data, or an empty "new account" state? Needs UX design input. Also, the silent alert mechanism must not be detectable by network monitoring — the alert itself can't be the thing that gives away the duress. -->

---

## Open Source Security Model

The product description states GreenGrass is open source "except where security or technical concerns make that approach unworkable."

**DECIDED:** Open source the application, keep operational security configurations private.

**Open source:**
- Application code (server, client, mobile)
- Data models and APIs
- Encryption implementations
- Client apps
- Authentication and authorization logic

Public auditability builds trust and invites security review. For a political platform where trust is paramount, users and their technical advisors must be able to verify the code is sound.

**Closed source:**
- Security monitoring and intrusion detection configurations
- Anti-surveillance implementation details (where revealing the method compromises its effectiveness)
- Tenant provisioning and infrastructure automation
- Operational runbooks and incident response tooling

The principle: people should be able to verify *what the software does*. They don't need to know *what tripwires are set* to catch attackers.

---

## Compliance & Regulatory

This section is a placeholder — it depends heavily on target countries and will be expanded in a dedicated compliance spec.

**Key areas to address per jurisdiction:**
- Data protection laws (GDPR equivalents)
- Campaign finance reporting requirements
- Political data handling regulations
- Cross-border data transfer restrictions
- Lawful interception obligations
- Encryption restrictions (some countries restrict strong encryption)

<!-- REVISIT: This needs a dedicated compliance spec per target country/region. -->

---

## Security Roadmap

Security cannot be bolted on — it must be built in from the start. But not every measure needs to ship in v1.

### Must have for MVP
- TLS 1.2+ with 1.3 preferred, everywhere
- Storage-level encryption at rest
- Application-level encryption for high-sensitivity fields
- BYOK by default, managed keys as opt-in
- Passkey auth with fallbacks
- Single-tenant isolation (standard tier: container-level)
- Full audit logging
- Server-side authorization on every request
- Input validation and injection prevention
- Secrets management with per-tenant keys
- Encrypted on-device storage for offline features
- Remote session revocation
- Incident response plan with external forensics relationship
- Responsible disclosure policy
- Warn-but-don't-block device compromise detection
- Recommended device security guidelines

### Should have for pilot
- Enhanced and maximum isolation tiers
- Per-country data residency (initial target countries)
- E2E encryption for messaging with opt-in key escrow
- Moderate metadata protection (default tier)
- DDoS protection
- Automated dependency scanning
- Bug bounty program
- Opt-in device attestation enforcement
- Warrant canary and transparency report

### Future / aggressive tier
- Aggressive metadata protection tier
- Traffic analysis resistance (domain fronting, Tor-compatible access)
- Duress mode (decoy login)
- Self-hosted deployment option
- Per-country compliance implementations
