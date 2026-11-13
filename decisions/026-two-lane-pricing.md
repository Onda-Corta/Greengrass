# ADR-026: Two-Lane Pricing

**Status:** Accepted
**Date:** 2026-11-13
**Sources:** `spec/product.md`, `spec/fundraising.md`, `design/architecture/system.md`, `decisions/007-fundraising-payments.md`, `decisions/018-ai-agent-posture.md`, `decisions/019-central-services-and-metered-billing.md`, `decisions/022-core-modules-and-lanes.md`, `decisions/023-surfaces-chat-admin-field.md`

## Context

The corpus has decided pricing twice. [fundraising.md § Platform Revenue Model](../spec/fundraising.md#platform-revenue-model) and [ADR-007 § Zero platform fee on donations](007-fundraising-payments.md#zero-platform-fee-on-donations) decided flat subscription tiers, not tied to any usage metric. [ADR-019 § Two billing planes, and no margin on the second](019-central-services-and-metered-billing.md#two-billing-planes-and-no-margin-on-the-second) kept the subscription and added a second plane beside it: metered third-party costs passed through at cost, with no margin, so that revenue came from the subscription alone.

The two-lane model ([ADR-022](022-core-modules-and-lanes.md)) states the prices in different terms, and the product side has decided that those prices override the spec.

This ADR is `Accepted`. The prices are decided. Several definitions the prices need are not, and they are listed as open in [Definitions still needed](#definitions-still-needed). They are gaps, not objections, and nothing in this ADR fills them.

### Conflicts this ADR resolves

This ADR reverses accepted decisions. The conflicts are named so that the reversal is visible.

1. **[fundraising.md § Platform Revenue Model](../spec/fundraising.md#platform-revenue-model)** decides a flat subscription "not tied to donation volume, user count, or any usage metric". Superseded.
2. **[ADR-007 § Zero platform fee on donations](007-fundraising-payments.md#zero-platform-fee-on-donations)** says revenue comes "entirely from platform subscriptions (flat tiers, not usage-based)". That sentence is superseded. The decision the section is named for, that the platform takes no cut of donations, is not among the things the new prices override.
3. **[ADR-019 § Two billing planes, and no margin on the second](019-central-services-and-metered-billing.md#two-billing-planes-and-no-margin-on-the-second)** says "GreenGrass takes no margin on metered costs" and "GreenGrass's revenue comes from the subscription alone". Both superseded.
4. **ADR-019's own reasoning.** It rejected a margin on pass-through "because it gives GreenGrass an incentive to push consumption, the incentive ADR-007 refused for donations". The commercial lane's price contains a margin. This ADR does not answer that argument. It records that the decision was taken with the argument on the table.
5. **[ADR-019 § Deferred: a metered allowance in the free tier](019-central-services-and-metered-billing.md#deferred-a-metered-allowance-in-the-free-tier)** and [product.md](../spec/product.md) assume a free or very-low-cost plan exists. Whether it survives is now open.
6. **[ADR-018 § What the proposal answers](018-ai-agent-posture.md#what-the-proposal-answers)** holds ADR-019's pass-through "at cost, with no margin" as the proposed answer to its cost item. The metering still answers it. The "no margin" does not hold in the commercial lane.

## Decision

### The prices

| Lane | Price |
|---|---|
| Political (Greengrass) | Cost, plus a commission that covers the cost of selling |
| Commercial (Basecamp) | Cost, plus a 30% margin for the product's owner, plus the Comercializadora's commission |

<!-- REVISIT: "the product's owner" (la dueña del producto) and "the Comercializadora" are used as the product side gave them. Neither is defined anywhere in the corpus. Both need a definition before a price can be computed. -->

These prices override the spec. Where ADR-007, ADR-019 and `fundraising.md` say otherwise, they are superseded:

- The flat subscription "not tied to any usage metric" ([fundraising.md § Platform Revenue Model](../spec/fundraising.md#platform-revenue-model), ADR-007).
- "GreenGrass takes no margin on metered costs" and "revenue comes from the subscription alone" (ADR-019).

**Alternatives considered:** The model this replaces, a flat subscription with metered costs passed through at no margin, is recorded in ADR-019 with its reasoning. No other alternative is on record. The prices were set by the product side together with the two-lane model.

### Pricing is a lane rule, not a Core rule

The Core meters cost only. ADR-019's usage events already carry the supplier cost of each call, and that does not change. Each lane applies its own price rule on top of the metered cost. A lane's price rule is part of its configuration ([ADR-022 § What the lanes require of the design](022-core-modules-and-lanes.md#what-the-lanes-require-of-the-design)).

A client's statement should show cost, margin and commission as separate lines. That keeps ADR-019's transparency in both lanes: a client can always see what a thing cost and what was added to it.

### What stays from ADR-019

The new prices need these, and they are unchanged:

- **Per-call metering of supplier cost.** Every call to a central service emits a usage event with the supplier cost.
- **Itemised statements.**
- **Spend caps,** with a soft warning and a hard stop.
- **Nothing enabled by default.**
- **The `alliance_pays` billing mode.** An alliance, or an association ([ADR-024 § The same shape in the commercial lane](024-event-bus-as-federation.md#the-same-shape-in-the-commercial-lane)), can pay its members' costs. Paying is not seeing.

Everything in ADR-019 that is not about the price is also unchanged: central services, per-client execution, nothing retained, the catalogue and entitlements, availability by isolation tier.

### Definitions still needed

Open. The prices cannot be computed until each of these has an answer, and this ADR does not supply one.

1. **What "cost" includes.** Metered supplier charges only, or also a share of hosting and of building and running the Core and the modules?
2. **How each commission is calculated.** A fixed fee or a percentage, and of what.
3. **What the 30% applies to.** The whole bill, or only part of it.
4. **How shared costs are split between lanes.** The capture corpus serves both.
5. **Whether the free tier survives.** [product.md](../spec/product.md) promised a freemium plan, and ADR-019 deferred the question of a metered allowance inside it.
6. **Who "the product's owner" and "the Comercializadora" are.**

Two further points follow from the gaps and are recorded so they are not lost:

- **Donations.** ADR-007's zero platform fee on donations stands. If a commission is defined as a percentage, its base has to be stated, and a base that includes donation volume would reverse ADR-007 and needs to say so.
- **Chat.** If chat becomes the main surface, inference is a cost of ordinary daily work ([ADR-023 § Cost and channel](023-surfaces-chat-admin-field.md#cost-and-channel)). Whatever "cost" is defined to include has to account for it.

### Housekeeping: amendment banners

This ADR extends the **Amended by** line on [ADR-007](007-fundraising-payments.md) and adds one to [ADR-019](019-central-services-and-metered-billing.md) and to [ADR-020](020-central-service-line-up-and-builders.md), whose services are described as passing costs through "at cost".

## Consequences

**Benefits:**
- Each lane has a stated price, and the two can differ without a second codebase or a second metering pipeline
- The price is built on a number the Core already measures, the supplier cost of each call
- Cost, margin and commission are visible to the client as separate lines
- An association can pay for its member agencies with the mechanism already built for alliances

**Costs:**
- Two accepted pricing decisions are reversed within seven weeks of the second one
- The predictability argument for a flat fee is gone: a client's bill now moves with its use
- The commercial lane earns from consumption, the incentive ADR-019 set out to avoid, and nothing here replaces that safeguard
- The prices cannot be quoted until six definitions exist
- The accessibility principle, a free or very-low-cost plan that is genuinely usable, has no stated place in the new model

**Constraints:**
- The Core meters cost and nothing else; no lane's price rule lives in the Core
- A statement shows cost separately from anything added to it
- Nothing is enabled by default, and every metered service has a spend cap
- ADR-007's zero platform fee on donations stands unless a later decision reverses it by name
- None of the open definitions may be assumed in a quote, a contract or an implementation

**Related ADRs:** [ADR-007](007-fundraising-payments.md) (amended: "revenue comes entirely from platform subscriptions" superseded; zero platform fee on donations stands), [ADR-018](018-ai-agent-posture.md) (its cost item: metering still answers it, "no margin" no longer holds in the commercial lane), [ADR-019](019-central-services-and-metered-billing.md) (amended: the two billing planes and "no margin" superseded; metering, statements, spend caps and `alliance_pays` kept), [ADR-020](020-central-service-line-up-and-builders.md) (amended: "at cost" is what the Core meters, not what a client pays), [ADR-022](022-core-modules-and-lanes.md) (the two lanes; price rules are lane configuration), [ADR-023](023-surfaces-chat-admin-field.md) (the cost of chat), [ADR-024](024-event-bus-as-federation.md) (an association pays as an alliance does)
