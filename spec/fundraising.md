# Fundraising & Payment Infrastructure

## Purpose

This document specifies the fundraising capabilities and payment infrastructure for GreenGrass. It builds on decisions made in workflows.md (donation flows, alliance splits, analytics), compliance.md (foreign contribution blocking, campaign finance reporting, consent), geography.md (per-country payment methods), and system.md (payment adapter pattern, data model).

Fundraising is a core survival function for political campaigns. In the global south, payment infrastructure varies dramatically — from PIX in Brazil (instant, free, ubiquitous) to cash-heavy workflows in Lebanon (banking system in crisis). GreenGrass must handle all of this behind a consistent interface while ensuring every transaction is auditable, compliant, and attributable.

## Fundraising Philosophy

1. **Every payment method is first-class.** Cash donations are not second-class transactions. PIX is not a workaround for credit cards. Each country's dominant payment method gets native integration, not adapter shims.
2. **Compliance is the product.** Campaign finance reporting, donor disclosure, contribution limits — these aren't tax on the fundraising feature, they're the reason campaigns choose a purpose-built platform over generic payment tools.
3. **Transparency to donors.** Donors see exactly where their money goes — processing fees, splits, net amount to campaign. No hidden fees, no opaque splits.
4. **Offline-capable.** Cash donation recording must work without connectivity. Sync when back online.

## Payment Processor Strategy

### Processor Selection Approach

**DECIDED: Hybrid — global processor as backbone + local processors for country-specific methods.** A global processor (e.g., Stripe) handles credit cards and provides baseline infrastructure. Local processors handle country-specific payment methods (PIX, UPI, PromptPay, ATH Movil, OMT) for best rates and native coverage. The payment adapter pattern in system.md supports this cleanly — each processor is an adapter behind a common interface.

### Per-Country Payment Integration Plan

| Country | Primary methods | Processor approach | Settlement currency |
|---------|----------------|-------------------|-------------------|
| Puerto Rico | Credit cards, ATH Movil, Venmo, Zelle | Credit cards via global processor; ATH Movil via ATH Business API; Venmo/Zelle via respective APIs or manual tracking | USD |
| Brazil | PIX, Boleto, Credit cards | PIX via local processor (e.g., Mercado Pago, PagSeguro, or direct Central Bank integration); credit cards via global processor or local processor | BRL |
| Thailand | PromptPay, TrueMoney, Bank transfer | PromptPay via local processor (e.g., Omise/Opn Payments); TrueMoney via API; bank transfer via local processor | THB |
| India | UPI, Paytm, PhonePe, Bank transfer | UPI via local payment aggregator (e.g., Razorpay, Cashfree); other wallets via same aggregator | INR |
| Lebanon | Cash, OMT, Bank transfer | Cash tracked in-platform; OMT via manual recording (no API); bank transfers where banking system permits | USD (de facto dollarized economy) or LBP |

### Processor Onboarding

Each tenant must configure at least one payment processor during onboarding (decided in workflows.md). The platform provides:

- **Guided setup wizard** — walks tenant through connecting their payment processor account(s)
- **Pre-configured processor options** — per-jurisdiction list of supported processors with setup instructions
- **Test mode** — tenants can create test donations to verify their configuration before going live
- **Credential security** — processor API keys stored in HashiCorp Vault (per system.md), encrypted at rest, never exposed in the UI after initial entry

## Multi-Currency Handling

**DECIDED: Multi-currency acceptance, single settlement.** Tenants accept donations in multiple currencies, but all donations settle into the tenant's primary currency. The platform records original currency, original amount, conversion rate, and settled amount. Donors give in their own currency (critical for diaspora fundraising), campaigns receive everything in their primary currency. Clean for accounting, no multi-currency bank accounts needed.

Implementation:
- **Every donation records:** original currency, original amount, conversion rate (if converted), settlement currency, settlement amount, processor fees, net amount
- **Conversion rates** are captured at transaction time and stored immutably — no retroactive recalculation
- **Display currency** is configurable per tenant for dashboards and reports, with original currency always visible on individual transaction records
- **Alliance splits** (decided in workflows.md) are calculated on the settlement amount, not the original amount, to avoid conversion discrepancies

## Donation Types & Flows

### One-Time Donations

Already specified in workflows.md. Key additions:

- **Minimum donation amounts** — configurable per tenant, with jurisdiction-specific floors where applicable
- **Maximum donation amounts** — enforced per jurisdiction contribution limits (compliance.md), with real-time checking against cumulative donor total
- **Anonymous donations** — permitted where jurisdiction allows, with separate tracking for compliance (some jurisdictions require identity for donations above a threshold even if displayed as "anonymous" to the campaign)

### Recurring Donations

Workflows.md established recurring donations exist. Detailed specification:

#### Setup
- Donor selects recurring frequency: monthly (default), weekly, quarterly, annually
- Donor sets amount per period
- Payment method must support recurring charges (credit card, UPI autopay, some PIX configurations; not cash, not OMT, not Venmo/Zelle)
- Donor receives confirmation with clear terms: amount, frequency, next charge date, how to cancel

#### Management
- **Donor self-service portal** — donors can view, modify, pause, or cancel recurring donations without contacting the campaign
- **Modification options:** change amount, change frequency, change payment method, pause (with resume date), cancel
- **Campaign-side management:** Finance Director can view all recurring donors, filter by status (active, paused, failed, cancelled), and export

#### Payment Processing
- Platform triggers recurring charges via processor on schedule
- **Retry logic on failure:**

**DECIDED: Smart retry.** Retry at processor-recommended optimal times when available (up to 4 attempts over 14 days), fall back to simple schedule (day 1, 3, 7) for processors that don't provide smart retry data. After final failure, mark as failed and notify both donor (with link to update payment method) and campaign.

- **On final failure:** recurring donation marked as failed, donor notified with link to update payment method, campaign notified in compliance dashboard
- **Successful charge:** receipt generated, donor record updated, audit trail entry created

#### Notifications
- **Pre-charge reminder** (optional, configurable by tenant) — notify donor X days before next charge
- **Successful charge confirmation** — receipt via email/SMS per donor preference
- **Failed charge notification** — immediate notification to donor with remediation link
- **Expiring payment method** — notify donor when card is approaching expiration (if processor provides this data)

### Pledges

**DECIDED: First-class pledges.** Donors can pledge a future donation. The platform tracks pledge status (pending, fulfilled, lapsed), sends configurable reminders, and connects fulfillment to the actual payment when it arrives. Pledges are a formal donation type with their own lifecycle — created during phone banking or canvassing, reminder sent on schedule, fulfilled when donor completes payment, lapsed after configurable expiry. Connects the field operation to the fundraising pipeline.

### Peer-to-Peer Fundraising

**DECIDED: Deferred.** Not for alpha or early pilots. All fundraising pages are campaign-controlled for now. However, the data model should accommodate peer-to-peer fundraising (supporter-created pages linked to campaigns, with attribution tracking) so it can be added later without migration pain.

## Donation Forms

### Form Types

1. **Hosted donation page** — full-page donation form on the tenant's GreenGrass subdomain (or custom domain). Campaign-branded, mobile-optimized, multilingual.
2. **Embeddable widget** — JavaScript embed for third-party websites. Renders an inline donation form or a modal. Respects the host page's styling where possible.
3. **Link-based** — shareable URL that opens the hosted donation page. Works in SMS, WhatsApp, email, social media.

### Form Configuration

Tenants configure donation forms with:

- **Suggested amounts** — up to 5 preset amounts + custom amount option
- **Default amount** — which preset is pre-selected (if any)
- **Recurring option** — whether to show recurring toggle, and whether recurring or one-time is the default
- **Processing fee option** — whether to offer donors the choice to cover processing fees
- **Required fields** — per-jurisdiction donor information requirements (name, email/phone, employer/occupation)
- **Custom fields** — tenant-defined additional fields (e.g., "How did you hear about us?", T-shirt size for event donations)
- **Payment methods** — which configured payment methods to show on this form
- **Language** — form language (from tenant's configured languages), with auto-detection based on visitor's browser/device language
- **Branding** — logo, colors, hero image, thank-you message
- **Designation** — optional fund/campaign designation if the tenant uses fund accounting

### Processing Fee Pass-Through

**DECIDED: Opt-in checkbox.** "Add $X.XX to cover processing fees so 100% of your donation goes to [campaign]." Fee calculated in real-time based on the processor's rate for the selected payment method, displayed before donor confirms. Whether the checkbox is checked or unchecked by default is tenant-configurable. MVP feature — table stakes for campaign fundraising platforms.

### Form Analytics

Each donation form tracks:
- Views, starts (donor began entering info), completions, abandonment rate
- Conversion by payment method, device type, referral source
- Average donation amount
- A/B test results (if configured)

**DECIDED: Built-in A/B testing.** Tenants can create form variants (different suggested amounts, copy, layouts), split traffic between them, and track conversion per variant. Platform declares a winner based on configurable success metric (conversion rate, average donation, total revenue). Core fundraising optimization capability.

## Processing Fees

### Fee Structure

**DECIDED: Zero platform fee.** GreenGrass takes no cut of donations. Tenants pay only the payment processor's fees. Every dollar goes to the campaign. Revenue comes entirely from platform subscriptions and services. Strongest alignment with mission and cleanest positioning — GreenGrass's financial incentives are tied to platform quality, not donation volume.

### Fee Transparency

Regardless of fee structure:
- Donors see the total amount they'll be charged, including any fees they've opted to cover
- Campaigns see: gross donation, processor fee, net amount
- Receipts show the full donation amount (gross), not the net — the donor gave the full amount, fees are the campaign's cost of doing business (unless donor opted to cover them)

### Per-Method Fee Expectations

| Payment method | Typical processor fee | Notes |
|---------------|----------------------|-------|
| Credit card | 2.9% + $0.30 (varies) | Highest fee, most universal |
| PIX (Brazil) | 0-1% | Very low cost, instant settlement |
| UPI (India) | 0% (government subsidized, may change) | Currently free for merchants |
| PromptPay (Thailand) | 0-0.25% | Very low cost |
| ATH Movil (PR) | ~1-2% | Lower than credit cards |
| Venmo/Zelle | Varies | Person-to-person may be free, business accounts have fees |
| OMT (Lebanon) | Fixed per-transaction fee | Cash-based, fee structure varies |
| Cash | 0% processing fee | But administrative cost of recording and reconciliation |

## Cash Donation Handling

Workflows.md established the basic cash flow. Detailed specification:

### Recording

- **Offline-capable** — cash donations can be recorded without connectivity (critical for events, canvassing)
- **Required fields:** amount, date, collector (staff/volunteer who received the cash)
- **Optional fields:** donor name, donor contact info, event context, designation, receipt photo
- **Anonymous tracking:** if donor declines to provide identity, recorded as anonymous with collector attestation. Jurisdiction rules on anonymous donation limits enforced (e.g., India's ₹2,000 cash limit without identity)

### Chain of Custody

**DECIDED: Full chain of custody.** Platform tracks who collected the cash, every handoff (volunteer → team lead → finance staff), when it was deposited, and which bank deposit it's part of. Every handoff is a logged event with collector, recipient, timestamp, and amount. Critical for compliance and fraud prevention in cash-heavy environments like Lebanon.

### Reconciliation

- Finance Director matches cash donation records against bank deposit records
- Platform highlights discrepancies (recorded donations without matching deposits, deposits without matching records)
- Reconciliation status tracked per donation: unreconciled, matched, disputed
- Reconciliation reports available for compliance filing

## Alliance Fundraising

Already decided in workflows.md: configurable donation splits per campaign. Detailed specification:

### Split Configuration

- Alliance admin defines split rules per joint fundraising campaign
- **Split types:**
  - **Percentage-based** — each member org receives a configured percentage (must total 100%)
  - **Fixed amount first** — one org receives a fixed amount per donation, remainder split by percentage among others
  - **Threshold-based** — split percentages change once a fundraising goal is met (e.g., 60/40 until org A hits $50k, then 40/60)

**DECIDED: Unanimous consent.** All member org admins must approve split changes. Money splits are too sensitive for unilateral modification. Platform sends approval requests to all member org admins, tracks responses, and only applies the new split once all have approved. Original agreed terms stand until everyone agrees to new terms.

### Split Execution

- Donation is processed through the alliance's payment processor
- Platform calculates split amounts based on configured rules
- Split calculated on net amount (after processor fees) unless configured otherwise
- Each member org's share is recorded as a separate ledger entry
- **Disbursement timing:**

**DECIDED: Configurable.** Alliance chooses immediate or batch disbursement per campaign. Immediate requires each member org to have their own connected payment account; batch accumulates in the alliance account and disburses on a configured schedule (weekly, monthly). Alliance picks what fits the campaign's needs.

### Alliance Reporting

- Alliance-level view: total raised, per-org attribution, split amounts, donor overlap across orgs
- Member org view: their share only, with donation details for their attributed donors
- Compliance: each org's share is reported separately for campaign finance purposes — an alliance donation is not one donation, it's multiple donations split at intake

## Refund Workflows

### Who Can Initiate

- **Finance Director/Manager** — can initiate refunds from the platform
- **Donor self-service** — donors cannot initiate refunds directly through the platform (they go through their payment processor's dispute process or contact the campaign)
- **Platform Admin** — can initiate refunds in case of fraud or platform-level issues

### Refund Types

- **Full refund** — entire donation amount returned
- **Partial refund** — portion of donation returned (e.g., if a donor overpaid or wants to reduce a pledge)

### Refund Process

1. Finance Director initiates refund, selects donation, enters reason
2. Platform checks: is this donation part of an alliance split? If yes, calculate refund amounts per org
3. Refund submitted to payment processor
4. On processor confirmation: donation record updated, donor record updated, audit trail entry, compliance reports adjusted
5. Donor notified of refund

### Refund Constraints

- Refunds only possible through original payment method
- Cash donations cannot be "refunded" through the platform — handled manually, recorded as a manual adjustment
- Refunds of recurring donations do not automatically cancel the recurring schedule — Finance Director must cancel separately if appropriate
- Processor fees are generally not refunded by the processor — the campaign absorbs this cost

## Donor Experience

### Donation Receipt

Every donation (including cash) generates a receipt containing:
- Donor name (or "Anonymous Donor")
- Donation amount (gross — what the donor gave, not net)
- Date
- Campaign/organization name and legal entity information
- Tax-deductibility statement if applicable (jurisdiction-dependent — in many target countries, political donations are not tax-deductible)
- Transaction reference number
- For recurring: next charge date and cancellation instructions

Receipts are delivered via the donor's preferred channel (email or SMS) and available in the donor self-service portal.

### Donor Self-Service Portal

Donors with an account (or who create one from a receipt link) can:
- View donation history
- Download receipts
- Manage recurring donations (modify, pause, cancel)
- Update payment methods
- Update personal information
- Manage communication preferences (consent)

**DECIDED: Both — tiered access.** Magic link for quick access (view donation history, download receipts). Full account (passkey or email) required for management actions (modify recurring donations, update payment method, change personal info). Low friction for common tasks, proper authentication for anything that touches money.

### Year-End Donor Statements

At the end of each calendar year (or fiscal year, configurable), the platform generates a consolidated donor statement:
- All donations made during the period
- Total amount
- Per-campaign breakdown
- Tax-relevant information per jurisdiction
- Sent automatically to all donors who gave during the period

## Fundraising Analytics

Already decided in workflows.md: real-time fundraising thermometer, Finance Director dashboard with revenue by channel/campaign/period, donor retention, recurring health, cash vs. digital breakdown.

### Additional Analytics

- **Donor segmentation:** first-time vs. repeat, one-time vs. recurring, amount tiers, payment method, acquisition channel
- **Donor lifetime value:** total contributions over time, average frequency, predicted future value
- **Lapsed donor identification:** donors whose recurring donations have ended or who haven't given in X months
- **Campaign ROI:** fundraising revenue vs. cost of fundraising appeals (email sends, SMS costs, etc.)
- **Conversion funnel:** form view → form start → payment attempt → successful donation, with drop-off analysis per step
- **Geographic distribution:** donations mapped by donor location (where available)

## Platform Revenue Model

**DECIDED: Two billing planes — a flat subscription, and metered pass-through at cost.** Amended by [ADR-019](../decisions/019-central-services-and-metered-billing.md). The original decision read: flat subscription tiers, not tied to donation volume, user count, or any usage metric. That remains true of the subscription. It stopped being true of the whole model once the platform gained central services whose third-party costs cannot be made flat.

**Plane 1 — Flat subscription.** Fixed monthly/annual pricing based on plan (basic, professional, enterprise). Covers the tenant instance, every internal module the plan includes, and GreenGrass's own cost of building and operating central services. Predictable for campaigns, simple to understand, no surprises. A genuinely usable free or very-low-cost plan must exist for resource-constrained campaigns.

**Plane 2 — Metered pass-through, at cost.** Central services ([ADR-019](../decisions/019-central-services-and-metered-billing.md)) carry variable costs that reach GreenGrass metered, billed by the unit, and that cannot be made flat: inference tokens from a model provider, per-message charges from SMS and WhatsApp gateways, per-generation charges from media generation providers, per-source fees from data suppliers, and infrastructure a cloud provider bills GreenGrass per unit to run the service. These pass through to the tenant that incurred them.

**GreenGrass takes no margin on metered costs.** The supplier's price is the tenant's price: no markup, no rounding up, no bundling into opaque units, no minimum spend. Where a supplier bills GreenGrass in aggregate rather than per tenant, the allocation method is published and the tenant pays its allocated share and nothing more. Where a supplier's terms make exact pass-through impossible, the closest achievable approximation is used and the deviation is documented in the service's catalogue entry. GreenGrass's revenue comes from the subscription alone, for the same reason it takes no cut of donations: the platform earns from platform quality, never from volume.

What is never metered: GreenGrass's own compute, storage and staff time when GreenGrass pays for them flat, as reserved capacity or salaries. Those are subscription costs. The test is whether GreenGrass itself receives a metered bill: when a cloud provider charges GreenGrass by the unit to run a service, that charge passes through at cost like any other. A service that generates no metered bill has no metered plane at all.

**Transparency obligations for metered services.** Nothing is enabled by default. Before enabling a service the tenant sees its unit price, the supplier it originates from, and a worked estimate. The tenant can set a spend cap per service, with a soft warning and a hard stop. A monthly statement itemizes every metered service by units and cost.

**Alliances paying for members.** An alliance can absorb the metered costs of its members' use of central services. This is a setting on the affiliation, `member_pays` (default) or `alliance_pays`, chosen when the alliance is set up and shown to each member before it accepts affiliation ([workflows.md § 1. Tenant Onboarding](workflows.md#1-tenant-onboarding)). Changing it on a live affiliation requires the Org Admins of both sides, the same rule that governs donation split changes. Paying is not seeing: results land in the member tenant under the member's keys, and the alliance receives the statement, never the content.

### Pricing Principles (from product.md, to be preserved regardless of model)

- **Not per-user pricing** — explicitly rejected. Campaigns shouldn't be penalized for having more volunteers.
- **Not per-transaction pricing** — GreenGrass takes zero cut of donations (decided above).
- **Accessible to resource-constrained campaigns** — free or very low-cost plan must exist and be genuinely usable, not hobbled.
- **Transparent** — no hidden fees, no surprise charges.
- **No margin on pass-through costs** — added by ADR-019. Variable third-party costs reach the tenant at cost. GreenGrass never earns from a tenant's consumption.

### Deferred: metered allowance in the free plan

Whether the free or very-low-cost plan includes any metered allowance — a starting balance of central-service use, and if so how much and for which services — is deferred. The accessibility principle stands as written. This is recorded here so that it is not read as decided either way; the pilot should inform it.

## Fraud Prevention

### Donation Fraud Indicators

The platform monitors for:
- **Rapid small donations** from the same source (structuring to avoid disclosure thresholds)
- **Mismatched donor information** (name on payment method doesn't match donor info provided)
- **Unusual geographic patterns** (donation from a country where the campaign doesn't operate, unless diaspora is expected)
- **Velocity checks** (unusual spike in donations from a single IP or device)
- **Known bad actors** (processor-provided fraud signals)

### Fraud Response

- Flagged donations are held for Finance Director review (similar to foreign contribution escrow)
- Finance Director can approve, refund, or escalate
- Repeated fraud patterns trigger alerts and can lead to payment method blocking
- All fraud flags and resolutions logged in audit trail

## Offline Donation Sync

Cash donations recorded offline follow the event sourcing sync protocol (system.md):

1. Donation recorded on device, stored in SQLCipher
2. Event created: `DonationRecorded { amount, donor_info, collector, timestamp, event_context }`
3. On connectivity: event synced to server
4. Server validates: duplicate check (same collector, same amount, same timestamp = likely duplicate), jurisdiction rules applied
5. Donation appears in Finance Director's reconciliation queue
6. If conflict (same donation recorded by two people): merge-and-flag per canvassing conflict rules (workflows.md)

## Resolved Open Questions

1. **Payment processor relationship model**

**DECIDED: Direct merchant.** Each tenant signs their own agreement with the payment processor. GreenGrass facilitates the connection (guided setup wizard, pre-configured processor options) but is not party to the financial relationship. Cleanest liability separation — GreenGrass is a software platform, not a financial intermediary. Avoids payfac regulatory burden across five countries.

2. **Cryptocurrency donations**

**DECIDED: Deferred.** Not for alpha or pilots. If a tenant accepts crypto through their own external processor, the platform can record it as a manual/external donation. No active prevention, no active support. Revisit when regulatory clarity emerges in a target jurisdiction.

3. **Matching gifts**

**DECIDED: Deferred.** Primarily a US/corporate feature, not relevant for most global south jurisdictions in early phases. Revisit when platform matures and US market grows.

<!-- REVISIT: Integration with specific payment processors (API contracts, webhook formats, settlement timing) will need detailed technical specs per processor during implementation. Each processor adapter is its own mini-integration project. -->
