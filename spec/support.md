# Tenant Support & Onboarding

## Purpose

This document catalogs every place where GreenGrass needs to educate, guide, or support tenants through a process. It emerged from the pattern across all other specs: payment processor setup, WhatsApp verification, SMS number provisioning, compliance configuration, BYOK key management, voter file import, platform migration — tenants need help at every turn.

This is not a customer support ticket system spec. It's an inventory of the **support surface** — every touchpoint where GreenGrass must provide guidance — and the strategy for delivering that guidance at scale across five countries, seven languages, and wildly different technical sophistication levels.

## Support Philosophy

1. **The platform is the primary support channel.** Guided wizards, contextual help, smart defaults, and compliance guardrails should handle 80% of support needs. If tenants regularly need human help for something, the UX has failed.
2. **Compliance guidance is not optional.** Campaign finance rules, data protection obligations, consent requirements — tenants must understand these. GreenGrass makes compliance the path of least resistance through templates, automated checks, and clear warnings.
3. **Localized support.** Every support resource must be available in the tenant's configured language. AI-assisted translation with human review (per geography.md) applies to support content, not just the UI.
4. **Tiered support model.** Self-service for common tasks, concierge for complex setup, human support for edge cases. Scale support without scaling headcount linearly.

## Support Surface Inventory

### Tier 1: In-Platform Self-Service

These are guidance touchpoints built directly into the platform UI. No human intervention needed.

#### Onboarding Wizards

| Wizard | Triggered by | Steps | Spec reference |
|--------|-------------|-------|---------------|
| **Org setup** | New tenant provisioning | Passkey setup → org profile (name, branding, languages) → invite staff → configure jurisdiction | [workflows.md § 1. Tenant Onboarding](workflows.md#1-tenant-onboarding) |
| **Payment processor** | First visit to fundraising settings | Select jurisdiction → choose processor(s) from supported list → enter credentials → test donation → verify | [fundraising.md § Processor Onboarding](fundraising.md#processor-onboarding) |
| **BYOK key generation** | Tenant choosing BYOK during setup | Explain implications → generate key → secure backup (Shamir's option) → confirm recovery plan → acknowledge key-loss consequences | [security.md § Secrets Management](security.md#secrets-management), [system.md § Destructive operation approval](../design/architecture/system.md#destructive-operation-approval) |
| **Compliance configuration** | After jurisdiction selection | Pre-load jurisdiction templates → configure contribution limits → set campaign period dates → configure disclaimer text → set retention policy | [compliance.md § Compliance Configuration per Tenant](compliance.md#compliance-configuration-per-tenant) |
| **WhatsApp Business setup** | Enabling WhatsApp channel | Meta verification walkthrough → business account setup → phone number registration → first template submission → test message | [integrations.md § WhatsApp Business API](integrations.md#whatsapp-business-api) |
| **SMS number setup** | Enabling SMS channel | Country-specific guide → recommended number type → provider account setup → number acquisition → DLT/10DLC registration (if applicable) → test message | [integrations.md § Number Provisioning](integrations.md#number-provisioning) |
| **Voter file import** | First data import | Upload file → format detection → column mapping with suggestions → preview → dedup preview → confirm → post-import report | [integrations.md § Import Formats](integrations.md#import-formats) |
| **Volunteer onboarding** | Volunteer first login | Passkey/fallback setup → trusted contact designation → platform tour → org-specific training → knowledge checks → certification (if configured) | [workflows.md § 2. Volunteer Onboarding](workflows.md#2-volunteer-onboarding) |

#### Contextual Help

In-context guidance that appears where the user needs it:

- **Tooltips and info panels** — every configuration field that has compliance implications includes an explanation of why it matters and what the jurisdiction requires
- **Smart defaults with explanations** — when the platform pre-fills a value (e.g., contribution limits for a US federal race), it shows why and lets the tenant override
- **Warning banners** — when an action may violate campaign period restrictions, foreign contribution rules, or consent requirements, a clear warning explains the risk before the user proceeds
- **Lèse-majesté warnings** — prominent, persistent warnings for Thai tenants when creating content (per compliance.md)
- **Data subject request guidance** — when a deletion request arrives, the compliance dashboard shows jurisdiction-specific retention obligations alongside the request

#### Templates & Pre-Built Content

| Template type | What it provides | Spec reference |
|--------------|-----------------|---------------|
| **Jurisdiction compliance templates** | Pre-loaded contribution limits, disclosure thresholds, campaign period rules, communication restrictions, disclaimer text | [compliance.md § Compliance Configuration per Tenant](compliance.md#compliance-configuration-per-tenant) |
| **Voter registration form templates** | Per-jurisdiction eligibility requirements, required fields, documentation rules, submission procedures | [workflows.md § Compliance considerations](workflows.md#compliance-considerations) |
| **Data Processing Agreement (DPA)** | Standard DPA template covering data categories, purposes, sub-processors, security measures, breach notification, audit rights | [compliance.md § Data Processing Agreements](compliance.md#data-processing-agreements) |
| **Data Protection Impact Assessment (DPIA)** | Template DPIA for tenants processing sensitive political data at scale (required under LGPD, PDPA) | [compliance.md § Data Processing Agreements](compliance.md#data-processing-agreements) |
| **Role templates** | Pre-built role configurations (Org Admin, Campaign Manager, Finance Director, Communications Director, Field Director, Volunteer Coordinator, Data Manager, Volunteer, Team Lead, Candidate, Deputy) | [users.md § Volunteer Coordinator](users.md#volunteer-coordinator) |
| **Email templates** | Visual, mobile-first email template builder with pre-built layouts | [workflows.md § Email campaign flow](workflows.md#email-campaign-flow) |
| **Canvassing scripts** | Script builder with branching logic based on responses | [workflows.md § Offline requirements](workflows.md#offline-requirements) |

#### Automated Compliance Checks

The platform continuously monitors and alerts:

- **Real-time:** contribution limit checking, foreign donor screening, consent verification at send time, disclaimer presence on outbound communications
- **Batch:** approaching contribution limits, consent expiration alerts, missing required donor information, campaign period restriction enforcement
- **Pre-report:** data completeness checks before filing deadlines, donation record reconciliation
- **Compliance dashboard:** contribution alerts, consent health, reporting deadlines with preparation status, data subject requests with SLA timers, searchable audit trail

### Tier 2: Guided Support Resources

Self-service content that tenants consume independently, but requires GreenGrass to create and maintain.

#### Knowledge Base

A searchable, multilingual knowledge base covering:

**Getting Started**
- Platform overview and core concepts
- Org setup walkthrough (with screenshots/video)
- Staff role configuration guide
- Volunteer onboarding setup guide
- First campaign creation guide

**Integration Guides**
- Payment processor setup — per processor, per country
- WhatsApp Business API setup — step-by-step Meta verification guide
- SMS provider setup — per country (number types, registration requirements, compliance checklists)
- Phone banking provider setup (pilot phase)
- Zoom integration setup
- Jitsi self-hosted setup
- Email sending domain configuration (SPF, DKIM, DMARC)

**Data Management**
- Voter file import guide — per country (expected formats, common issues, field mapping tips)
- Platform migration guides — per source platform (NationBuilder, NGP VAN, Action Network, CiviCRM)
- Data export guide
- Deduplication and merge guide
- Electoral boundary data import guide (GeoJSON, Shapefile, KML)

**Compliance Guides**
- Campaign finance reporting — per jurisdiction (what to file, when, how to generate reports)
- Consent management best practices — per jurisdiction
- Data subject rights handling — step-by-step for each right (access, correction, deletion)
- Foreign contribution compliance — how the two-tier screening works, handling flagged donations
- Campaign period restrictions — per jurisdiction, what changes during campaign periods

**Security Guides**
- BYOK key management — generation, backup, rotation, recovery, what happens if you lose your key
- Passkey setup and management
- Trusted contact recovery setup
- Device security recommendations
- Security tier selection guide (standard, enhanced, aggressive)
- Self-hosted deployment guide — step-by-step with configuration templates

**Fundraising Guides**
- Donation form creation and optimization
- A/B testing guide
- Recurring donation management
- Cash donation recording and chain-of-custody
- Alliance fundraising setup and split configuration
- Pledge management
- Refund processing

#### Video Tutorials

Short (<5 min) task-specific videos for visual learners:

- Platform walkthrough (interactive tour equivalent as a video)
- Creating your first donation form
- Importing a voter file
- Setting up a canvassing campaign
- Configuring compliance settings
- Managing recurring donations
- Using the compliance dashboard

All videos produced in English first, subtitled in all supported languages, with AI-assisted translation and human review.

#### In-Platform Training Module

Already decided in workflows.md: full onboarding module with:

- Platform walkthrough (interactive tour)
- Org-customizable training materials (campaign messaging, local context, safety protocols)
- Knowledge checks and quizzes
- Certification gates before field tools access
- Training materials cached for offline viewing
- Configurable per tenant (which modules are required, which are optional)

### Tier 3: Concierge & Hands-On Support

For complex setup tasks that self-service can't fully handle.

#### Onboarding Concierge

**DECIDED: AI-first with human escalation.** AI concierge (in-platform chat) handles first contact, guides through common setup tasks, answers standard questions. Available 24/7, multilingual. When the AI can't resolve or the tenant requests it, escalates to a human specialist. Humans focus on edge cases, complex jurisdictional questions, and high-stakes setup (BYOK key management, self-hosted deployment). Scales while maintaining quality for the hard problems.

**Concierge scope — complex tasks that benefit from guided support:**

| Task | Complexity reason | Concierge role |
|------|------------------|---------------|
| WhatsApp Business verification | Meta's process is opaque and slow | Guide through verification, troubleshoot rejections, help with template approval |
| BYOK key setup | High stakes — key loss means permanent data loss | Walk through generation, verify backup, confirm recovery plan |
| Payment processor configuration | Per-country variation, credential management | Help connect to correct processor, verify test transactions |
| Compliance configuration for new jurisdictions | Legal complexity, jurisdiction-specific rules | Review configuration, flag potential issues, recommend settings |
| Platform migration | Data mapping complexity, relationship preservation | Review source data, recommend mapping, verify import quality |
| Electoral boundary data import | GIS expertise needed | Help with format conversion, validate boundaries, troubleshoot rendering |
| Self-hosted deployment | Infrastructure expertise needed | Guide through deployment, verify configuration, troubleshoot connectivity |

#### Local Support Partnerships

Per product.md: full launch includes local support network with partnerships to provide training and customer service in key regions.

- **Per-country support partners** — local organizations or contractors who understand the political, cultural, and regulatory context
- **Language-native support** — support in the tenant's language, not through translation
- **On-the-ground training** — in-person training sessions for large org rollouts, especially in countries with low digital literacy or complex political contexts
- **Regulatory liaison** — local partners can help navigate country-specific regulatory requirements that the platform's automated guidance can't fully address

#### Developer Support

For tenants using the public API:

- **API reference** — auto-generated from OpenAPI spec, interactive (Swagger UI or similar)
- **Webhook documentation** — event schemas, delivery guarantees, retry behavior
- **SDKs** — JavaScript/TypeScript (first-class), Python (community or first-class based on demand)
- **Sandbox environment** — per-tenant test environment with seed data
- **Developer community** — forum or discussion board for API users to share integrations, ask questions, and contribute

## Support Content Lifecycle

### Creation

- All support content authored in English first
- AI-assisted translation into all supported languages (per geography.md)
- Human review required for all translated support content before publication
- Critical content (compliance guides, security guides, legal templates) requires legal review per jurisdiction

### Maintenance

- Support content versioned alongside platform releases
- When a feature changes, associated support content is flagged for update
- Per-country compliance guides reviewed before each election cycle in that country
- Jurisdiction template updates trigger knowledge base article updates
- Deprecation notices when support content becomes outdated

### Localization Priority

| Priority | Content type | Reason |
|----------|-------------|--------|
| P0 — before launch | Onboarding wizards, compliance configuration, security setup | Tenants can't use the platform without these |
| P1 — at launch | Core knowledge base articles, integration guides, compliance guides | Tenants need these within first week |
| P2 — within 30 days | Video tutorials, advanced guides, migration guides | Nice-to-have at launch, necessary for growth |
| P3 — ongoing | Community-contributed content, edge case documentation | Accumulates over time |

## Support Channels

### In-Platform

- **Contextual help** — tooltips, info panels, warning banners (always available)
- **Knowledge base search** — searchable from within the platform
- **AI concierge** — in-platform chat for guided setup and troubleshooting (per concierge decision)
- **Training module** — structured onboarding content (per workflows.md)

### External

- **Documentation site** — public knowledge base (hosted separately from the platform)
- **Community forum** — for tenant-to-tenant support, feature requests, and best practice sharing
- **Email support** — for issues that can't be resolved through self-service
- **Status page** — self-hosted (per integrations.md) for platform health visibility

### What GreenGrass Does NOT Provide

- **Legal advice** — GreenGrass provides compliance guidance and templates, not legal counsel. Every compliance guide includes a disclaimer that tenants should consult local legal counsel for their specific situation.
- **Campaign strategy** — GreenGrass provides tools, not political consulting. The platform helps campaigns execute, not decide what to execute.
- **Content creation** — beyond AI-assisted translation and messaging generation (per workflows.md), GreenGrass doesn't create campaign content for tenants.
- **Data entry services** — the platform provides import tools and guidance, but tenants manage their own data.

## Support Metrics

Track to measure support quality and identify UX failures:

- **Wizard completion rate** — percentage of tenants who complete each onboarding wizard without abandoning
- **Time to first donation** — how long from tenant creation to first successful donation (proxy for onboarding effectiveness)
- **Knowledge base search → resolution** — percentage of searches that don't result in a support ticket
- **Concierge escalation rate** — percentage of AI concierge conversations that escalate to human
- **Support ticket volume by category** — identifies which areas need better self-service
- **Per-country support volume** — identifies which jurisdictions need more localized guidance

## Support Roadmap

### Alpha (Puerto Rico)

- All onboarding wizards operational (English + Spanish)
- Core knowledge base articles (English + Spanish)
- Compliance guides for US/FEC and Puerto Rico CEE
- AI concierge (per decision) — English and Spanish
- Email support channel
- Payment processor setup guide (Stripe + ATH Movil)
- FEC reporting guide

### Pilot 1 (Brazil)

- All content translated to Portuguese
- Brazil-specific compliance guides (LGPD, TSE)
- PIX setup guide
- WhatsApp Business setup concierge (Portuguese)
- TSE reporting guide
- Local support partner engagement (Brazil)

### Pilot 2 (Thailand)

- All content translated to Thai
- Thailand-specific compliance guides (PDPA, ECT, lèse-majesté)
- PromptPay setup guide
- Lèse-majesté content warnings fully localized
- Security tier guidance (aggressive tier emphasis)
- Local support partner engagement (Thailand)

### Pilot 3 (India)

- All content translated to Hindi + English (regional languages per demand)
- India-specific compliance guides (DPDPA, ECI, FCRA, MCC)
- UPI setup guide
- DLT SMS registration guide
- Multi-language consent notice setup guide
- Local support partner engagement (India)

### Pilot 4 (Lebanon)

- All content translated to Arabic + French + English
- Lebanon-specific compliance guides (GDPR-as-baseline, SCE, cash handling)
- OMT recording guide
- Cash chain-of-custody guide
- Self-hosted deployment guide (critical for Lebanon security context)
- Aggressive security tier setup guide
- Local support partner engagement (Lebanon)

## Open Questions

1. **Community-contributed support content** — should tenants be able to contribute knowledge base articles or guides? Could be valuable for jurisdiction-specific tips from experienced campaigns, but needs moderation.

2. **Support SLAs** — should paid tiers include guaranteed response times? What are reasonable SLAs given the global timezone spread?

3. **Training certification marketplace** — could GreenGrass-certified trainers (individuals or organizations) offer paid training services through the platform? Revenue share model?

4. **Offline support content** — for environments with unreliable connectivity (Lebanon, rural India), should the knowledge base and training materials be downloadable for offline access?

<!-- REVISIT: The AI concierge's capabilities, training data, and escalation rules need detailed specification during implementation. This is both a product design challenge (conversation flows, persona, tone) and a technical challenge (which AI model, how to keep it current with platform changes, how to handle jurisdiction-specific questions). -->
