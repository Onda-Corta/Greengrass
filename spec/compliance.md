# Compliance & Legal Framework

## Purpose

This document defines GreenGrass's compliance strategy across all target jurisdictions. It consolidates compliance-related decisions made in other specs (security.md, geography.md, workflows.md, users.md) and fills gaps around election law, data protection, campaign finance, encryption restrictions, and operational compliance.

GreenGrass operates at the intersection of political organizing, personal data processing, and financial transactions — three of the most heavily regulated domains in every jurisdiction we target. Compliance is not a layer we bolt on. It is structural.

## Compliance Philosophy

**Principled compliance, not minimal compliance.**

GreenGrass's approach:

1. **Design for the strictest jurisdiction first.** Build to meet the highest standard among our target countries, then relax where local law permits, rather than building to the weakest standard and retrofitting.
2. **Architectural compliance.** Where possible, make non-compliance technically impossible (BYOK means we *cannot* hand over tenant data) rather than relying on policy promises.
3. **Transparency by default.** Warrant canary, annual transparency reports, open source application code, auditable consent records.
4. **Local counsel is non-negotiable.** Every country launch requires engagement with local legal experts. This document provides the framework; local counsel validates it.
5. **Compliance as a feature for tenants.** Campaign finance reporting, consent management, donor disclosure — these are things campaigns *need*. Build them well and compliance becomes a product advantage.

## Regulatory Landscape by Country

### Puerto Rico (Alpha)

**Governing framework:** US federal law + Puerto Rico local law.

**Election law:**
- Federal Elections Commission (FEC) regulations for federal races
- Puerto Rico State Elections Commission (CEE) for local/territorial races
- Bipartisan Campaign Reform Act (BCRA) restrictions on fundraising and advertising
- Foreign national contribution ban (52 USC §30121) — strict prohibition on contributions from non-US persons
- Disclosure requirements for contributions above thresholds (currently $200 cumulative per election cycle for federal)
- Political advertising disclaimer requirements ("Paid for by…")

**Data protection:**
- No comprehensive US federal privacy law (as of 2025)
- Puerto Rico has limited local data protection provisions
- FTC Act Section 5 (unfair/deceptive practices) as de facto data protection floor
- State breach notification laws apply (Puerto Rico Act 111-2005)
- Children's Online Privacy Protection Act (COPPA) if platform touches users under 13
- CAN-SPAM Act for commercial email; Telephone Consumer Protection Act (TCPA) for calls/SMS

**Campaign finance:**
- FEC reporting for federal races (quarterly/pre-election reports)
- Puerto Rico CEE reporting for local races
- Contribution limits (federal: per-election limits, indexed to inflation)
- PAC/Super PAC rules if alliances coordinate spending
- Employer/occupation disclosure required for contributions >$200 (federal)

**Key risks:**
- Dual federal/territorial regulatory regime creates complexity
- FEC enforcement has been inconsistent but rules are strict on paper
- TCPA violations carry statutory damages ($500-$1,500 per violation) — SMS/call consent is critical

### Brazil (Pilot 1)

**Governing framework:** Brazilian Constitution + Lei das Eleições (Law 9.504/1997) + LGPD + TSE regulations.

**Election law:**
- Tribunal Superior Eleitoral (TSE) regulates all elections
- Strict campaign period restrictions — campaigning only permitted during defined window
- Restrictions on mass messaging (WhatsApp bulk messaging banned by TSE since 2018)
- Candidates must register with TSE; campaign accounts are separate legal entities
- Political advertising restrictions on specific platforms and media
- Prohibition on paid political advertising on internet platforms (only organic content and boosting to the candidate's own page followers)

**Data protection:**
- Lei Geral de Proteção de Dados (LGPD) — comprehensive data protection law modeled on GDPR
- Autoridade Nacional de Proteção de Dados (ANPD) as enforcement authority
- Legal basis required for processing: consent, legitimate interest, legal obligation, etc.
- Data subject rights: access, correction, deletion, portability, information about sharing
- Data Protection Impact Assessment (DPIA) likely required given political data sensitivity
- Data localization: LGPD has preferences but not strict requirements; cross-border transfer permitted with adequate safeguards
- Political opinion is sensitive data under LGPD — requires explicit consent or other specific legal basis

**Campaign finance:**
- TSE tracks all campaign finances
- All donations processed through regulated campaign bank accounts
- Individual contribution limits (percentage of prior year gross income)
- Corporate donations banned (since 2015)
- Real-time disclosure through TSE's DivulgaCandContas system
- Strict accounting and receipt requirements
- Campaign spending caps set by TSE per race

**Key risks:**
- TSE is active and technologically sophisticated — enforces digital campaign rules aggressively
- WhatsApp is dominant communication channel but TSE has restricted bulk political messaging
- LGPD classification of political opinion as sensitive data creates heightened obligations
- Campaign finance violations can result in candidacy annulment

**DECIDED: TSE-aware channel management.** Platform enforces TSE rules during campaign periods — message volume limits, content restrictions, no bulk sends — but permits broader use outside campaign windows. WhatsApp is too important in Brazil to disable entirely, and the TSE's restrictions are campaign-period-specific. The platform encodes TSE rules and enforces them contextually based on configured campaign period dates.

### Thailand (Pilot 2)

**Governing framework:** Constitution of Thailand + Organic Act on Election of Members of the House of Representatives + PDPA + Computer Crime Act.

**Election law:**
- Election Commission of Thailand (ECT) oversees elections
- Organic Act on Political Parties regulates party formation and funding
- Strict prohibitions on vote buying (broadly defined)
- Campaign period restrictions and spending caps
- Restrictions on political advertising — pre-approval required in some contexts
- Lèse-majesté law (Section 112 of Criminal Code) — criminal offense to defame the monarchy; affects all content on platform
- Computer Crime Act — broad provisions for content takedown and platform liability

**Data protection:**
- Personal Data Protection Act (PDPA) B.E. 2562 — Thailand's comprehensive data protection law (effective June 2022)
- Modeled loosely on GDPR
- Consent required for sensitive data processing (political opinion is sensitive under PDPA)
- Data subject rights similar to LGPD/GDPR
- Cross-border transfer restrictions — adequate safeguards or consent required
- Data Protection Officer (DPO) required for large-scale sensitive data processing

**Campaign finance:**
- Political party funding regulated by Organic Act
- Contribution limits and disclosure requirements
- State funding available for qualifying parties
- Spending caps per election
- ECT audit of party finances

**Key risks:**
- Lèse-majesté law is a severe criminal offense — platform must prevent content that could be construed as violating it, but enforcement is politically selective
- Military intervention history — platform data could be seized during coup; aggressive security tier essential
- Computer Crime Act gives authorities broad takedown powers
- Political party dissolution is used as a political tool — party data must be preserved independently

**DECIDED: Prominent user warnings + tenant responsibility.** Platform displays clear, prominent warnings about lèse-majesté restrictions when content is created within Thai tenants. No automated content filtering — it's technically unreliable and creates a chilling effect. Tenant/user bears responsibility for their content. This respects user agency and avoids putting GreenGrass in the position of censoring political speech.

### India (Pilot 3)

**Governing framework:** Constitution of India + Representation of the People Act (1950, 1951) + IT Act 2000 + Digital Personal Data Protection Act (DPDPA) 2023.

**Election law:**
- Election Commission of India (ECI) — powerful independent body
- Model Code of Conduct (MCC) during election periods — extensive restrictions on what parties/candidates can say and do
- Voluntary Code of Ethics for social media platforms during elections (could apply to GreenGrass)
- ECI Voter Registration system (EPIC) — integration may be needed
- Pre-certification required for political advertisements on social media (since 2019)
- Paid political advertising must carry "Paid for by" disclaimers with specific formatting

**Data protection:**
- Digital Personal Data Protection Act (DPDPA) 2023 — India's comprehensive data protection law
- Consent-based processing for personal data
- Data fiduciary obligations
- Data localization requirements for "significant data fiduciaries" — government can mandate local storage
- Right to erasure, correction, grievance redressal
- Data Protection Board of India as enforcement authority
- Exemptions for government — broad national security carve-outs
- Political data not explicitly classified as sensitive (unlike LGPD/PDPA) but treatment TBD under forthcoming rules

**Campaign finance:**
- Electoral bonds system struck down by Supreme Court (2024) — new framework evolving
- Companies can donate to parties; individual limits exist
- Parties must file annual financial statements with ECI
- Cash donation limit (currently ₹2,000 per individual without identity disclosure)
- Foreign contributions to political parties prohibited under Foreign Contribution (Regulation) Act (FCRA)
- FCRA also restricts foreign funding of NGOs involved in political activity — GreenGrass's operational model may be scrutinized

**Key risks:**
- Scale: 900M+ eligible voters, enormous data volumes, performance and storage challenges
- ECI's MCC creates extensive content and behavior restrictions during election periods
- FCRA could be used to scrutinize GreenGrass itself as a foreign entity providing services to Indian political organizations
- State-level variations in election rules add complexity
- IT Act intermediary guidelines require compliance with government takedown orders within tight timelines
- Data localization likely required given scale and sensitivity

**DECIDED: Technology-only positioning.** GreenGrass positions as a technology vendor (SaaS tool) selling at market rates, not a political service provider. This argues FCRA doesn't apply because it's a commercial transaction, not a foreign contribution. **Requires formal legal opinion from Indian counsel before pilot launch** — this interpretation has not been tested and FCRA risk is serious.

### Lebanon (Pilot 4)

**Governing framework:** Lebanese Constitution + Electoral Law of 2017 (Law 44) + fragmented regulatory landscape.

**Election law:**
- Supervisory Commission for Elections (SCE) oversees elections
- Confessional seat allocation system (Taif Agreement) — seats distributed among religious communities
- Electoral Law of 2017 introduced proportional representation
- Campaign spending caps per candidate
- Political advertising restrictions during official campaign period
- Foreign funding of campaigns prohibited
- Electoral lists (coalitions) are a formal legal construct with specific registration requirements

**Data protection:**
- No comprehensive data protection law (as of 2025)
- Draft data protection law has been proposed but not enacted
- E-Transactions and Personal Data Law (Law 81/2018) provides limited digital protections
- Banking secrecy laws (Law of 3 September 1956) — historically strong but undermined by banking crisis
- No formal data protection authority

**Campaign finance:**
- Campaign spending caps defined by Electoral Law of 2017
- Candidates must open dedicated campaign bank accounts
- Post-election financial disclosure required (within 60 days)
- SCE can audit campaign finances
- Banking system crisis severely complicates financial compliance — many transactions are cash-based
- OMT and similar money transfer services are workarounds for collapsed banking system

**Key risks:**
- Most complex security environment among all target countries
- Multiple intelligence services (state and non-state) with surveillance capabilities
- Hezbollah's parallel governance structures — tenants on both sides of political spectrum
- No data protection law means no legal floor, but also no safe harbor
- Banking system collapse means cash-heavy workflows are the norm, not the exception
- Infrastructure instability (electricity, internet) affects always-on compliance monitoring
- Sectarian political system means data itself is politically sensitive (knowing someone's sect/district reveals political affiliation)

**DECIDED: Apply GDPR as baseline.** All Lebanese user data is treated as if GDPR applied. GDPR is the global gold standard, well-understood, and since we're already building for LGPD and PDPA (both GDPR-influenced), the implementation cost is marginal. This is documented as a contractual commitment to Lebanese tenants.

## Cross-Cutting Compliance Requirements

### Data Protection Framework

**DECIDED: Treat all political data as sensitive everywhere.** LGPD/GDPR-level sensitive-data protections applied globally regardless of local law. GreenGrass is a political organizing platform — all data on it is political by nature. One protection tier, no ambiguity, no per-jurisdiction classification logic to maintain.

**Already decided (from security.md and system.md):**
- BYOK encryption by default — tenant holds master key
- Per-country data residency
- Application-level encryption for sensitive fields
- Full audit trail of all data access and mutations
- Federated identity with per-tenant data ownership

**Requires further specification:**

#### Data Subject Rights

All target jurisdictions (except Lebanon) grant individuals rights over their personal data. GreenGrass must support:

| Right | LGPD | PDPA | DPDPA | FTC/State | Platform implementation |
|-------|------|------|-------|-----------|----------------------|
| Access | Yes | Yes | Yes | Limited | Self-service data export from supporter profile |
| Correction | Yes | Yes | Yes | Limited | Self-service edit + request to tenant |
| Deletion | Yes | Yes | Yes | Limited | Deletion request flow with compliance holds |
| Portability | Yes | Yes | Yes | No | Export in standard format (JSON/CSV) |
| Objection to processing | Yes | Yes | No | No | Opt-out mechanisms per processing purpose |
| Withdraw consent | Yes | Yes | Yes | No | One-click withdrawal, immediate effect |

**DECIDED: Tenant decides.** Deletion requests are passed to the tenant admin with jurisdiction-specific guidance on their legal retention obligations. The tenant makes the call — GreenGrass provides the tools and the guidance but stays out of interpreting legal obligations on the tenant's behalf. The compliance dashboard surfaces pending deletion requests with SLA timers and relevant retention guidance notes.

#### Data Processing Agreements

GreenGrass acts as a data processor on behalf of tenants (data controllers). Each tenant relationship requires:

- **Data Processing Agreement (DPA)** — standard template covering: data categories processed, processing purposes, sub-processor list, security measures, breach notification obligations, audit rights
- **Sub-processor disclosure** — GreenGrass must maintain and disclose a list of all sub-processors (hosting providers, email infrastructure, payment processors, AI service providers)
- **Data Protection Impact Assessment (DPIA)** — required under LGPD and PDPA for large-scale processing of sensitive data. GreenGrass should provide a template DPIA that tenants can adapt.

**DECIDED: Tenant handles all.** Supporters contact the campaign/org directly. Tenant admins process requests using platform-provided self-service tools. Clean data-controller/data-processor separation — the relationship is between the supporter and the organization they engaged with. GreenGrass builds the tooling (data export, deletion workflows, correction forms, SLA tracking) but the tenant owns the interaction.

#### Cross-Border Data Transfers

Per-country data residency (already decided) minimizes cross-border transfer issues. However, transfers still occur:

- **Platform identity data** lives in incorporation jurisdiction → read replicas in each country
- **Tenant data** stays in-country by default
- **Alliance data sharing** may cross borders when alliance members are in different countries

Safeguards required:
- Standard Contractual Clauses (SCCs) or equivalent for any cross-border transfer
- Transfer Impact Assessments where required (LGPD, PDPA)
- Explicit user consent for cross-border sharing in alliance contexts

### Election Law Compliance

#### Campaign Period Enforcement

Multiple jurisdictions restrict campaign activities to defined periods. The platform must support:

- **Campaign period configuration** — per-tenant setting defining official campaign start/end dates
- **Channel restrictions during campaign period** — per-jurisdiction rules about what communications are permitted
- **Pre-campaign vs. campaign behavior** — some features may need to be disabled or restricted during official campaign periods

**DECIDED: Configurable, hard enforcement as default.** Tenants choose hard or soft enforcement per jurisdiction. Hard enforcement is the default — platform blocks restricted actions during configured campaign periods. Sophisticated tenants with their own legal counsel can switch to soft enforcement (warnings only) if they want to make their own judgment calls.

#### Political Advertising Disclaimers

Every target jurisdiction requires some form of "Paid for by" disclaimer on political advertising. The platform must:

- Automatically append jurisdiction-appropriate disclaimers to qualifying communications
- Allow tenants to configure disclaimer text per jurisdiction
- Check that disclaimers are present on all outbound public-facing content (emails, social media posts, SMS if applicable)
- Maintain records of all political communications for disclosure purposes

#### Foreign Contribution Restrictions

Every target jurisdiction prohibits or restricts foreign contributions to political campaigns. The platform must:

- Collect nationality/residency information from donors
- Block or flag contributions from non-eligible donors based on jurisdiction rules
- Maintain records for regulatory reporting
- Handle the complexity of diaspora donors (US citizens in Puerto Rico, Brazilian nationals abroad, etc.)

**DECIDED: Both — two-tier approach.** Obviously ineligible donors (non-citizen, non-resident, no qualifying connection) are blocked at payment in real-time. Edge cases (diaspora, dual citizens, incomplete information) are accepted but held in escrow, flagged for compliance review, and require manual approval before funds are released to the campaign. The compliance dashboard surfaces held donations with context about why they were flagged.

### Campaign Finance Reporting

Each jurisdiction has different reporting requirements. The platform needs a reporting engine that can generate jurisdiction-specific reports.

**Already decided (from workflows.md):** Full audit trail, configurable donation tracking, compliance reporting per jurisdiction.

**Required reporting capabilities:**

| Jurisdiction | Reporting body | Report type | Frequency | Key fields |
|-------------|---------------|-------------|-----------|------------|
| US (federal) | FEC | Form 3/3X | Quarterly + pre-election | Itemized contributions >$200, expenditures, cash-on-hand |
| PR (local) | CEE | TBD per race type | Per election cycle | TBD — requires local counsel |
| Brazil | TSE | DivulgaCandContas | Real-time + final | All donations (no threshold), all expenditures |
| Thailand | ECT | Annual party finance | Annual + per election | Party income, expenditures, asset declarations |
| India | ECI | Contribution report | Annual + per election | Contributions >₹20,000 (itemized), total expenditure |
| Lebanon | SCE | Post-election disclosure | Within 60 days of election | All campaign expenditures, funding sources |

**DECIDED: Hybrid.** Built-in report generator for priority jurisdictions (US/FEC first for alpha), structured data export in clean formats available everywhere from day one as a fallback. Jurisdiction-specific reporting modules added as each pilot launches. This is pragmatic — we build what we need when we need it.

### Consent & Communication Compliance

**Already decided (from workflows.md):**
- Per-channel + per-purpose consent with smart defaults
- One-click unsubscribe with immediate effect
- Consent audit trail
- Consent checked at send time

**Additional compliance requirements:**

- **TCPA compliance (US/PR):** Prior express written consent required for automated calls/texts to mobile phones. Opt-in must be clear and conspicuous. Revocation must be honored immediately. Applies to SMS outreach and phone banking features.
- **CAN-SPAM compliance (US/PR):** Commercial emails must include physical address, unsubscribe mechanism, honest subject lines. Unsubscribe requests honored within 10 business days.
- **LGPD consent (Brazil):** Consent must be freely given, informed, and unambiguous. Pre-checked boxes are not valid consent. Consent can be withdrawn at any time with same ease as granting it.
- **TSE messaging rules (Brazil):** Bulk WhatsApp messaging prohibited. SMS campaigns restricted during election period.
- **PDPA consent (Thailand):** Explicit consent required for sensitive data (political opinion). Consent must be separate from other terms. Minors require parental consent.
- **DPDPA consent (India):** Consent must be free, specific, informed, unconditional, and unambiguous. Notice must be in English or any language in the Eighth Schedule of the Constitution.
- **Lebanese requirements:** Minimal formal consent requirements, but GreenGrass applies its own standard (see Lebanon data protection decision above).

### Audit Trail & Retention

**Already decided (from users.md):** Full audit logging of all data mutations, permission changes, financial transactions, logins, exports, merges.

**Retention requirements by jurisdiction:**

**DECIDED: Uniform retention — 10 years globally.** All audit logs retained for 10 years regardless of jurisdiction, matching Lebanon's commercial records requirement as the longest among target countries. One rule everywhere — simplest to implement, no risk of premature deletion, and structured event data is cheap to store relative to the compliance risk of getting jurisdiction-specific retention wrong.

| Jurisdiction | Financial records | Election records | General audit logs |
|-------------|------------------|-----------------|-------------------|
| US (FEC) | 3 years after filing | Per election cycle + 3 years | No federal mandate |
| Brazil (TSE) | 5 years | Per election cycle + TSE requirements | LGPD: as long as purpose persists |
| Thailand | 5 years (tax) | Per ECT requirements | PDPA: as long as purpose persists |
| India | 8 years (tax/financial) | Per ECI requirements | DPDPA: as long as purpose persists |
| Lebanon | 10 years (commercial records) | Per SCE requirements (60 days post-election for disclosure) | No formal requirement |

### Encryption & Lawful Access

**Already decided (from security.md):**
- BYOK by default — GreenGrass cannot decrypt tenant data
- Architectural inability to comply with data demands for BYOK tenants
- Challenge overbroad/politically motivated demands for managed-key tenants
- No voluntary cooperation with foreign government demands absent valid legal process in incorporation jurisdiction

**Per-jurisdiction encryption considerations:**

| Jurisdiction | Encryption restrictions | Lawful interception obligations | Impact on GreenGrass |
|-------------|----------------------|-------------------------------|---------------------|
| US/PR | No general restrictions. CALEA applies to telecom carriers (GreenGrass is not one) | Not applicable to software platforms | Minimal — strongest legal protections for encryption |
| Brazil | Marco Civil da Internet protects encryption. No backdoor mandate. | Court orders can compel providers to turn over data they possess | BYOK means we don't possess the keys. Managed-key: comply with valid court orders. |
| Thailand | Computer Crime Act allows authorities to demand decryption keys | Yes — authorities can compel disclosure of encryption keys | Aggressive security tier is essential. BYOK is critical for Thai activists. |
| India | IT Act Section 69 allows government to demand decryption | Yes — failure to assist with decryption can be penalized | BYOK is critical. Indian government has pushed for backdoor access. |
| Lebanon | No formal encryption restrictions | Multiple intelligence services operate extrajudicially | No legal framework to compel, but physical seizure is a risk. Self-hosted option important. |

**DECIDED: Disclose inability + challenge.** GreenGrass responds that it does not possess the decryption keys and cannot comply, directing the authority to the tenant. Additionally, GreenGrass actively challenges the demand's legal basis even though compliance is technically impossible — to establish precedent, signal commitment to users, and contribute to the broader legal ecosystem around encryption rights. The tenant is notified unless prohibited by a gag order. All demands and responses are included in the annual transparency report.

## Compliance Infrastructure

### Compliance Configuration per Tenant

Each tenant must configure:

- **Jurisdiction** — which country's laws apply to their operations
- **Race type** — federal, state/provincial, local (affects reporting requirements)
- **Campaign period dates** — official start/end of campaign period
- **Contribution rules** — limits, prohibited sources, disclosure thresholds (pre-loaded from jurisdiction templates, customizable)
- **Communication rules** — channel restrictions, disclaimer requirements (pre-loaded from jurisdiction templates)
- **Retention policy** — how long to retain various record types (default from jurisdiction, tenant can extend but not shorten)

### Compliance Dashboard

Tenant admins need a compliance view that surfaces:

- **Contribution alerts** — flagged donations (near limits, foreign status, missing required info)
- **Consent health** — percentage of contacts with valid consent per channel, upcoming consent expirations
- **Reporting deadlines** — upcoming filing dates with preparation status
- **Data subject requests** — pending access/deletion/correction requests with SLA timers
- **Audit log access** — searchable audit trail with export capability

### Automated Compliance Checks

The platform should run continuous compliance checks:

- **Real-time:** Contribution limit checking, foreign donor screening, consent verification at send time, disclaimer presence on outbound communications
- **Batch:** Approaching contribution limits (warnings), consent expiration alerts, missing required donor information, campaign period restriction enforcement
- **Pre-report:** Data completeness checks before filing deadlines, reconciliation of donation records against payment processor data

### Compliance Reporting Engine

**Architecture note:** The reporting engine follows the hybrid approach decided above — built-in generators added per jurisdiction as pilots launch, with structured data export as the universal fallback. Internally, jurisdiction-specific reporting is implemented as per-jurisdiction modules loaded based on tenant configuration, consistent with the adapter pattern used throughout the system (payments, SMS, social media).

## Corporate Structure & Jurisdiction

**Already decided (from security.md):** Incorporate in a privacy-strong jurisdiction (Estonia or Switzerland candidate).

**Structural considerations:**

**DECIDED: Single entity with subsidiary option.** Start with one company in the incorporation jurisdiction, operating globally through contracts with local service providers. If and when a specific jurisdiction demands local presence (India's FCRA scrutiny, Brazil's TSE requirements), establish wholly-owned local subsidiaries as needed. The architecture already supports this — per-country data residency and modular infrastructure mean spinning up a subsidiary doesn't require re-architecting, just adding a legal entity and local contracts.

Factors to consider:
- **FCRA (India):** Foreign entities providing services to political organizations face scrutiny. Local subsidiary likely necessary.
- **TSE (Brazil):** Campaign technology providers may need registration. Local presence advisable.
- **Tax implications:** Transfer pricing, digital services taxes, VAT/GST in each jurisdiction.
- **Banking:** Each country needs local payment processing capability. Subsidiaries can hold local bank accounts.
- **Liability:** Local subsidiaries can limit parent company exposure to local legal actions.

## Compliance Roadmap

### Alpha (Puerto Rico)

**Pre-launch requirements:**
- US/FEC compliance module fully built and tested
- Puerto Rico CEE requirements validated with local counsel
- TCPA/CAN-SPAM consent mechanisms operational
- FEC reporting format validated
- Contribution limit checking operational
- Disclaimer generation for political communications
- Basic compliance dashboard

### Pilot 1 (Brazil)

**Pre-launch requirements:**
- LGPD compliance assessment completed
- TSE registration/notification (if required)
- TSE registration completed (if required — pending legal counsel determination)
- PIX payment integration with donation compliance checks
- TSE reporting format implemented
- WhatsApp channel restrictions implemented per TSE rules
- LGPD consent mechanisms (separate from general consent)
- Data Protection Impact Assessment completed
- Portuguese-language legal text reviewed by Brazilian counsel

### Pilot 2 (Thailand)

**Pre-launch requirements:**
- PDPA compliance assessment completed
- ECT registration/notification (if required)
- Content risk framework for lèse-majesté implemented
- Thai subsidiary or partnership established
- PromptPay integration with donation compliance checks
- ECT reporting format implemented
- PDPA consent mechanisms operational
- Aggressive security tier fully operational (critical for Thailand)
- Thai-language legal text reviewed by Thai counsel

### Pilot 3 (India)

**Pre-launch requirements:**
- DPDPA compliance assessment completed
- ECI registration/engagement
- FCRA legal opinion obtained validating technology-vendor positioning (subsidiary established if counsel advises it)
- UPI integration with donation compliance checks
- ECI reporting format implemented
- MCC enforcement rules implemented (campaign period)
- Multi-language consent notices (Hindi + English + regional languages)
- Data localization infrastructure operational in India
- Indian-language legal text reviewed by Indian counsel

### Pilot 4 (Lebanon)

**Pre-launch requirements:**
- Compliance baseline established (GDPR/incorporation-jurisdiction standard per decision above)
- SCE registration/notification (if required)
- Cash donation tracking fully operational
- OMT integration with donation compliance checks
- SCE reporting format implemented
- Confessional seat system awareness built into campaign features
- Arabic/French/English legal text reviewed by Lebanese counsel
- Aggressive security tier + self-hosted option available (critical for Lebanon)
- Infrastructure resilience plan for electricity/internet instability

## Open Questions for Legal Counsel

The following require engagement with legal professionals before implementation:

1. **Incorporation jurisdiction final selection** — Estonia vs. Switzerland vs. other candidates. MLAT analysis, tax implications, operational feasibility.
2. **Corporate structure** — per decision above, requires legal/tax advisor input.
3. **FCRA (India) risk assessment** — can GreenGrass operate as a technology vendor? Is a subsidiary sufficient?
4. **TSE (Brazil) platform registration** — does GreenGrass need to register as a campaign technology platform?
5. **BYOK legal defensibility** — has "architectural inability to comply" been tested in any target jurisdiction? Legal opinion needed.
6. **Platform liability for user content** — especially regarding lèse-majesté (Thailand), MCC violations (India), and sectarian content (Lebanon).
7. **Data protection officer requirements** — which jurisdictions require a DPO, and can a single person serve for multiple jurisdictions?
8. **Warrant canary legality** — are warrant canaries legally defensible in each target jurisdiction?
9. **E2E encryption legality** — is providing E2E encrypted messaging to political organizations permissible in all target jurisdictions?
10. **Insurance** — cyber liability insurance, political risk insurance, directors & officers insurance across jurisdictions.

<!-- REVISIT: This document provides the framework. Each country launch requires a dedicated compliance workbook developed with local legal counsel. The workbook should validate every assumption made here and identify any requirements we've missed. -->
