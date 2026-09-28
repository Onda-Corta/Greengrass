# ADR-007: Fundraising & Payments

**Status:** Accepted
**Date:** 2026-03-03
**Sources:** `spec/fundraising.md`, `spec/workflows.md`
**Amended by:** [ADR-019](019-central-services-and-metered-billing.md) — the revenue model gains a second, metered billing plane for central services, passed through at cost with no margin. "Flat tiers, not usage-based" below now describes the subscription plane only.

## Context

Fundraising is a survival function for political campaigns. In the global south, payment infrastructure varies dramatically: PIX in Brazil is instant, free, and ubiquitous; UPI in India is government-subsidized and zero-cost; Lebanon's banking system has collapsed and most transactions are cash through money transfer services like OMT. The platform must handle all of this behind a consistent interface while ensuring every transaction is auditable, compliant, and attributable. Campaigns also range from small single-candidate operations to large alliances with complex donation split requirements.

## Decision

### Hybrid global + local payment processor strategy

A global processor (e.g., Stripe) handles credit cards and provides baseline infrastructure. Local processors handle country-specific payment methods (PIX, UPI, PromptPay, ATH Movil, OMT) for best rates and native coverage. Each processor is an adapter behind a common interface — the payment adapter pattern allows swapping or adding processors without rearchitecting.

Each tenant signs their own agreement with payment processors directly (direct merchant model). GreenGrass facilitates the connection through guided setup wizards and pre-configured processor options but is not party to the financial relationship. This provides the cleanest liability separation and avoids payfac regulatory burden across five countries.

**Alternatives considered:** Single global processor was rejected because no global processor covers all target country payment methods with competitive rates. GreenGrass as payment facilitator (payfac) was rejected because it would require financial regulation compliance in every target jurisdiction.

### Multi-currency acceptance, single-currency settlement

Tenants accept donations in multiple currencies but all donations settle into the tenant's primary currency. Every donation records: original currency, original amount, conversion rate at transaction time (stored immutably), settlement currency, settlement amount, processor fees, and net amount. Alliance splits are calculated on the settlement amount, not the original, to avoid conversion discrepancies.

**Alternatives considered:** Multi-currency settlement was rejected because it would require campaigns to maintain multi-currency bank accounts — impractical for most target organizations.

### Smart retry logic for recurring donations

When a recurring donation payment fails, the platform retries at processor-recommended optimal times when available (up to 4 attempts over 14 days), falling back to a simple schedule (day 1, 3, 7) for processors that don't provide smart retry data. After final failure, the donation is marked as failed with notifications to both donor (with link to update payment method) and campaign.

### First-class pledges

Pledges are a formal donation type with their own lifecycle: created during phone banking or canvassing, reminder sent on configurable schedule, fulfilled when the donor completes payment, lapsed after configurable expiry. This connects the field operation pipeline to the fundraising pipeline — a pledge taken at a door becomes a tracked commitment with follow-up.

**Alternatives considered:** Treating pledges as notes/tags on contact records was rejected because pledges have financial and compliance implications that require structured tracking.

### Built-in A/B testing for donation forms

Tenants can create form variants (different suggested amounts, copy, layouts), split traffic between them, and track conversion per variant. The platform declares a winner based on configurable success metrics (conversion rate, average donation, total revenue). This is a core fundraising optimization capability, not an add-on.

### Zero platform fee on donations

GreenGrass takes no cut of donations. Tenants pay only their payment processor's fees. Revenue comes entirely from platform subscriptions (flat tiers, not usage-based). That keeps the incentives honest: GreenGrass earns from platform quality, not donation volume.

**Alternatives considered:** Percentage fee on donations was rejected because it misaligns incentives and penalizes successful fundraising campaigns. Per-transaction fee was rejected for the same reason.

### Configurable donation split rules for alliance campaigns

Alliance-level fundraising supports multiple split types: percentage-based, fixed amount first (one org gets a fixed amount, remainder split), and threshold-based (split percentages change once a goal is met). All member org admins must unanimously approve split changes — money splits are too sensitive for unilateral modification. Disbursement timing is configurable per campaign: immediate (each org has connected payment accounts) or batch (accumulated and disbursed on schedule).

## Consequences

**Benefits:**
- Every country's dominant payment method gets native integration, not adapter shims
- Direct merchant model avoids financial intermediary regulation across five countries
- Zero platform fee means everything but the processor's cut reaches the campaign, and removes any incentive to push donation volume
- Pledge tracking connects field operations to fundraising with structured follow-through
- A/B testing gives resource-constrained campaigns access to professional fundraising optimization

**Costs:**
- Maintaining adapters for 10+ payment processors across five countries is ongoing integration work
- Multi-currency handling adds complexity to financial reporting and compliance
- Cash donation handling (full chain of custody: collector → team lead → finance staff → bank deposit) requires careful workflow design
- Alliance split rules with unanimous consent can slow down operational changes

**Constraints:**
- Cash donations must work offline and sync later (see [ADR-005](005-offline-first-sync.md))
- Every donation must be auditable end-to-end for campaign finance compliance
- Refunds are only possible through the original payment method
- Foreign contribution screening (real-time blocking for obviously ineligible, escrow for edge cases) must integrate with compliance checks

**Related ADRs:** [ADR-004](004-data-model-integrity.md) (full audit trail for financial transactions), [ADR-009](009-compliance-legal.md) (campaign finance reporting, foreign contribution blocking), [ADR-003](003-identity-access-organization.md) (alliance governance for split rules), [ADR-005](005-offline-first-sync.md) (offline cash donation recording)
