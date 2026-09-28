# ADR-021: Creator Program & Content Pipeline

**Status:** Accepted
**Date:** 2026-09-28
**Sources:** `spec/press.md`, `spec/integrations.md`, `spec/users.md`, `design/ux/04-wireframes/content-ops/content-ops.md`, `decisions/003-identity-access-organization.md`, `decisions/015-product-scope.md`, `decisions/016-cross-cutting-resolutions.md`, `decisions/017-sharing-contract-trust-model.md`, `decisions/018-ai-agent-posture.md`, `decisions/020-central-service-line-up-and-builders.md`

## Context

A set of 21 lo-fi wireframes for a creator-management tool arrived alongside the alliance services board recorded in [diary entry 13](../diary/13-services-a-la-carte.md). They describe a program run over WhatsApp. A roster of creators is sorted into tiers A to D. Their submissions come in through an inbox and go through multi-round review with comparisons between rounds and comment threads. Briefs and posts go out through a dispatch screen that tracks each creator's response. An approval queue routes tier A and B work to multi-round approval and tier C and D work to a simple approve or reject. Around that sit an engagement dashboard with a per-creator leaderboard, creator settings, a team screen with four roles, and notifications. Three more screens add an AI flow that scores every inbound item against a strategy document and drafts production instructions. The sample data is commercial: product launches and "Shop now".

The corpus has most of the parts and none of the whole. [press.md § Media Contacts as CRM Records](../spec/press.md#media-contacts-as-crm-records) models journalists as Contact records with press fields. [press.md § Post Approval Workflow](../spec/press.md#post-approval-workflow) approves the organization's own social posts. [integrations.md § WhatsApp Business API](../spec/integrations.md#whatsapp-business-api) is outbound and template-bound. Nothing models people who publish on their own accounts at a campaign's request, which in the target markets is where much of a campaign's reach now lives. The board names them "press and influencers". The wireframes call them creators.

### Conflicts this ADR resolves

1. **[ADR-016](016-cross-cutting-resolutions.md) #22** approves posts the organization publishes itself. The pipeline approves content that creators publish on their own accounts, in rounds, routed by tier.
2. **[ADR-016](016-cross-cutting-resolutions.md) #23** keeps v1 to direct file upload and makes the Shared Content Library a v2 tentpole. Review rounds need versioned assets with comparisons.
3. **[ADR-015 § Out of scope: volunteer gamification](015-product-scope.md#out-of-scope-volunteer-gamification)** rules out leaderboards. The wireframes' engagement screen ranks creators.
4. **[integrations.md § WhatsApp Business API](../spec/integrations.md#whatsapp-business-api)** allows free-form messages only within 24 hours of the other person writing in. The wireframes treat WhatsApp as open chat.

## Decision

### Creators are treated exactly like press contacts and influencers

A creator is a Contact record with creator fields, the way a journalist is a Contact record with press fields ([users.md § Contact](../spec/users.md#contact)). It is not a new record type and not a second CRM. A militant, spokesperson, volunteer or candidate who also creates content is the same Person on the omni-list, with one more facet.

- **Influencers are creators.** An independent person with an audience who publishes on their own accounts gets the same profile. The corpus never specified influencers; this is where they live.
- **Any tenant keeps them, as any tenant keeps media contacts.** A party, a candidacy or an alliance may run a creator program. No rule gives creators to the parties and press to the alliance.
- **A creator relationship crosses a tenant boundary only under a sharing contract** ([ADR-017](017-sharing-contract-trust-model.md)), like any other contact. The case that makes this real: an alliance briefing a member party's candidate on the candidate's own account is a relationship between two tenants, governed by their contract, and either side may contract it unilaterally.

**Alternatives considered:** A dedicated creator record type was rejected because it duplicates Person and turns one human who volunteers, donates and posts into three records. Assigning creator programs to parties and press relationships to the alliance was rejected for the reason ADR-017 rejected per-rung defaults: it encodes a political judgment about which tenant does what into the data model.

### Three role templates

[ADR-003](003-identity-access-organization.md)'s hybrid model gains three default staff templates, specified in [users.md § Staff](../spec/users.md#staff): **Editor**, who reviews submissions, requests changes and dispatches; **Approver**, who gives final approval; and **Creator Manager**, who maintains the roster and tiers. They stack with the existing templates. In a small campaign the Communications Director holds all three.

### The content pipeline generalizes post approval

Content moves through one pipeline whether it is the organization's own post or a creator's: pending, draft, under review, revision requested, approved, published.

- **Tier decides the route.** Tier A and B work goes through multi-round approval: each round is kept, a revision request requires a comment, and an Editor can escalate to an Approver. Tier C and D work gets a simple approve or reject, and can be approved in bulk.
- **#22's default stands.** All content requires approval before it is published. An Org Admin may relax that as #22 allows, and the emergency bypass in [press.md § Post Approval Workflow](../spec/press.md#post-approval-workflow) applies unchanged.
- **Dispatch is a person's send.** A dispatch is either a post to publish or a brief. It goes to named creators or to a tier, every creator's delivery and response is tracked, and reminders go only to those who have not answered. Nothing is dispatched by a machine ([ADR-020](020-central-service-line-up-and-builders.md)).

### Versioned assets move forward from v2

A review round is meaningless without the asset it reviewed. Each round's asset is kept as a version, with a comparison against the previous round. That storage is the core of the Shared Content Library, and it moves into the first build of the creator program. The rest of the library stays a v2 tentpole: tagging, search, usage tracking, rights management, brand collections and reuse across features.

### Per-creator engagement is staff-only and never ranked

Per-creator engagement is reported the way per-post engagement already is, from the same platform adapters. It is visible only to staff whose templates include it, it is never shown to creators, and it carries no rank, position or badge. That keeps it on the analytics side of [ADR-015](015-product-scope.md#out-of-scope-volunteer-gamification)'s line: the perverse incentive a leaderboard creates comes from creators seeing where they stand. The asymmetry the pilot flags for the contribution ledger ([mvp.md § Appendix — Hypotheses beyond the core assumption](../spec/mvp.md#appendix-hypotheses-beyond-the-core-assumption), H8) applies here too, and is a reason to keep this view narrow.

### WhatsApp is a two-way inbox inside the Business API's rules

Messages a creator sends land in the tenant's inbox, and staff can reply freely while the conversation window is open: 24 hours from the creator's last message. Outside the window, only a pre-approved template can be sent. A brief dispatched outside the window goes as a template announcing it, and its content follows once the creator replies. The dispatch and tracking screens show each creator's window state. Details are in [integrations.md § WhatsApp Business API](../spec/integrations.md#whatsapp-business-api).

**Alternatives considered:** A staff member's own phone was rejected because it takes the thread out of the tenant, out of the audit trail and out of the encryption perimeter. Moving briefs to email alone was rejected because WhatsApp is where creators in the target markets already are.

### The three AI screens are not part of this decision

The wireframes' AI flow is held for the [ADR-018](018-ai-agent-posture.md) review as its worked example. It covers a strategic-fit score on arrival, an analysis panel that recommends networks and cites a strategy document, and generated production instructions. The inbox is specified here without fit badges. The part that needs the review most is the classification of every inbound item on arrival, which is a background read that no person started. A person may still draft a brief with the text builder that [ADR-020](020-central-service-line-up-and-builders.md) accepted.

### Compliance

- **Disclaimers.** Content a creator publishes at a campaign's request is political communication. The rules in [press.md § Political Advertising Disclaimers on Social Media](../spec/press.md#political-advertising-disclaimers-on-social-media) apply to it, and a dispatch carries the required disclaimer with it.
- **Paid creators.** Payment to a creator is a campaign expenditure, reported under [compliance.md § Campaign Finance Reporting](../spec/compliance.md#campaign-finance-reporting), and the post carries the platform's paid-partnership label.
- **Unpaid creators.** Content produced for a campaign without payment may count as an in-kind contribution in some jurisdictions. That question goes to counsel and is recorded in [press.md § Open Questions](../spec/press.md#open-questions).

### Housekeeping: amendment banners

This ADR adds an **Amended by** entry to [ADR-016](016-cross-cutting-resolutions.md) for #22 and #23.

## Consequences

**Benefits:**
- One pipeline for the organization's posts and creators' posts, and one contact model for journalists, influencers and creators
- The reach that lives on people's own accounts gets the same approval and disclaimer discipline as the organization's own
- Creator relationships across tenants inherit the trust model instead of needing their own
- The part of the Shared Content Library that review needs arrives when review arrives

**Costs:**
- The inbox is bound by WhatsApp's conversation window, which makes dispatch slower than the wireframes assumed
- Pulling versioned assets forward adds storage and comparison work to the first build of the program
- Staff-only engagement gives creators less feedback than a public leaderboard would

**Constraints:**
- Creators are Contact records; no creator record type
- Any tenant may run a creator program; cross-tenant creator relationships need a sharing contract
- All content requires approval by default; no machine dispatches
- Per-creator engagement is never shown to creators and never ranked
- The AI screens and inbound classification wait for ADR-018

**Related ADRs:** [ADR-003](003-identity-access-organization.md) (three role templates added to the hybrid model), [ADR-015](015-product-scope.md) (no gamification, kept by making engagement staff-only), [ADR-016](016-cross-cutting-resolutions.md) (amended — #22 generalizes to the content pipeline; #23's versioned assets move forward), [ADR-017](017-sharing-contract-trust-model.md) (cross-tenant creator relationships), [ADR-018](018-ai-agent-posture.md) (the AI screens held as the review's worked example), [ADR-020](020-central-service-line-up-and-builders.md) (no machine dispatch; the text builder may draft a brief)
