# Diary Entry 13: Services à la Carte

**Date:** 2026-09-28

---

## The Task

Entry 12 opened a gate and stopped. The question it left was whether agents could run through the product at all, and the honest answer was that nobody had drawn what "through the product" would look like.

Somebody drew it. A Whimsical board titled *Plataforma de comunicaciones de la Alianza — arquitectura de servicios* started as a single agent hexagon with four sources feeding it and every team in the coalition hanging off the bottom. Over three days of back-and-forth it became something else: three sealed tenant enclaves, one each for the alliance, MVC and PIP, and four services in the middle that all three could draw on. Capture. Analysis. Builders. Outbound dispatch. The instruction that came with the final version was one sentence: each tenant can plug into services on an ad hoc basis and be billed appropriately.

That sentence is not compatible with the spec as written. This entry is about making it compatible without breaking anything that was right.

## What the Spec Said

Three things, each correct on its own terms.

The architecture had three layers. Platform, which sees across tenants and holds identity, provisioning and billing. Federation, which mediates cross-tenant flow under sharing rules and by design never holds data. Tenant, where everything else runs as a per-tenant instance. Every capability in 85 documents lived in the third layer, because every capability ran on the tenant's own data.

The pricing was flat. `fundraising.md` decided subscription tiers "not tied to donation volume, user count, or any usage metric". ADR-007 said it again: revenue from "flat tiers, not usage-based". The reasoning was good. Per-user pricing punishes campaigns for having volunteers. Per-transaction pricing gives the platform a stake in donation volume. Flat is predictable, and predictable matters when the people paying have very little money.

And the product description, the oldest document in the repo, had left a door open that nobody had walked through: one set fee, "with the exception of unavoidable variable costs such as SMS sends, which are usually billed by volume by the supplier".

## What the Board Needed

A media capture corpus does not fit in a tenant. Building one per campaign is unaffordable for the campaigns the platform exists for, and it duplicates work over public data that carries nothing private. Model inference does not fit in a flat fee either; ADR-018 had already listed per-token cost against flat pricing as one of the eight things its review had to settle. Generation, transport, research delivery: all shared capability, all per-tenant consumption, all carrying somebody else's variable bill.

So the board was asking for two things the spec did not have. A home for shared capabilities that did not weaken isolation. And a way to pass through costs that could not be flattened, without turning the platform into something that earns from consumption.

## What Got Decided

ADR-019, accepted, with three instructions attached to it that I want to record because they shaped the text.

**No vig.** The first instruction was that when GreenGrass meters something, it takes nothing on top. The supplier's price is the tenant's price. No markup, no rounding, no opaque units, no minimum spend. Where a supplier bills in aggregate, the allocation method is published and the tenant pays its share and nothing more. This is the zero-platform-fee principle from donations applied to services, and it is what keeps the second billing plane from corrupting the first: the platform still earns only from the subscription, and still has no reason to push volume. It is stated in the ADR and again in `fundraising.md`, as a fifth pricing principle.

**Alliances can pay, as an onboarding setting.** The pilot's two parties are unequal, and `mvp.md` is blunt that tooling friction must not be mistaken for unwillingness. Per-tenant metering makes cost visible per party, which is good for the free-rider problem and bad for the poorer partner. So an affiliation carries a billing mode, `member_pays` or `alliance_pays`, chosen when the alliance is set up and shown to each member before it joins. Paying is not seeing. The alliance gets the statement; the results still land in the member's tenant under the member's keys.

**The free-tier allowance is deferred.** Whether the free plan includes any starting balance of metered services is a pricing question the pilot should answer, and it is written down as open so that it is not read as decided either way.

The architectural half fell out of the constraints the corpus already had. A central service is shared code, not shared state. Every call runs for exactly one tenant under that tenant's keys and contracts, because ADR-017 says the platform is never a party to a contract. The service retains nothing between calls, because if it did it would be the superuser read path the comms intelligence roadmap forbids. Public data is the one exception, and only the data: the capture corpus can be shared, the queries against it cannot, for the same reason ADR-012 self-hosts map tiles. The catalogue, entitlements and metering go in the platform layer and hold metadata only. Central services are not a fourth layer; they would see across tenants if they were, and that is the thing they must not do.

## What It Gave ADR-018

Nothing was decided about agents, and the gate stands. But the review now has a mechanism it did not have. An entitlement is a credential scoped to one tenant and one service. An agent acting for a tenant can hold no credential to a service the tenant has not enabled, and every call it makes is a metered, logged event with an actor on it. Credential breadth, the fourth of ADR-018's gating properties, has a concrete boundary. Item 5, the cost question, has an answer. Neither closes the review. Both make it shorter.

## Housekeeping

Two banners. ADR-007 now says at the top that ADR-019 amends it. ADR-013 gets a note that turned out to be more interesting than expected: `system.md` claims ADR-013's "AI model decision" was superseded by BYOM, and ADR-013 never made one. The hybrid model it is said to have chosen lived only in `system.md`'s own open questions. The first of the three inconsistencies ADR-018 recorded is resolved by saying so.

Everything shipped in both languages. The glossary gained a section for the new vocabulary before any of it was translated, which is the lesson from entries 10 and 11 applied instead of relearned.

## Next

Four more PRs are planned against the same board. Mutual suppression as the first catalogue entry, which makes the pilot and the platform one design. The four central services sequenced into the comms intelligence roadmap. Content operations from a set of creator-management wireframes, as an extension of the press spec. And then ADR-018 itself, fed with the board as the proposal under review. None of them reverses anything. This one did, and it was the right one to do first.
