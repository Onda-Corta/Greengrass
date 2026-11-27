# Diary Entry 20: The Bus

**Date:** 2026-11-26

---

## The Layer

The three-layer architecture dates from the architecture session in March: a platform layer that sees across tenants, a tenant layer where everything runs, and between them a federation layer that mediated every cross-organization flow — alliance coordination, shared resources, dedup, joint campaigns. By design it never held tenant data. It was still the one central component that flow passed through, and it had to be trusted with it.

Two things had been arguing against that shape for a while. Entry 13's services board drew three sealed enclaves — the alliance, MVC, PIP — with flows between them and nothing in the middle. And each instance already ran its own NATS event stream for analytics. The November direction said it outright: separate deployments per organization, an event bus between them, the alliance as a third organization that subscribes. ADR-024 wrote it down as a proposal on the thirteenth.

Today it was accepted, in one session, the same day as the ADR-018 review. The timing is not a coincidence, and it is also a debt coming due: the review's harness spec already rules that cross-tenant material arrives *only as contract-filtered events on the bus* — never a reach, only a delivery. Three accepted documents were citing a proposed ADR as their cross-tenant carrier. Accepting ADR-024 ratified the carrier they presumed; rejecting it would have sent the harness, the threat model and the review back for rework.

## What It Decides

**The stream becomes the spine.** The per-instance event stream stops being an analytics pipeline and carries the domain events of the Core and every module. Between organizations, each instance exports a filtered subset of its stream to the instances it has contracts with. Filtered at the source, field by field, deny by default, encrypted under the contract's keys, which the members hold. Any relay the platform operates sees routing metadata, never content.

**Two components get names.** The export filter compiles each sharing contract into the source-side filter on an instance's stream — and a filtering bug is a leak, the cost ADR-017 already names for contracts. The import landing writes delivered events into the receiving instance's store, tagged with the contract they arrived under and marked untrusted at ingestion, because the review named bus events from counterparties an injection vector: a payload delivered under contract is data, never instructions. Event schemas are versioned, and an export never emits a version the receiver hasn't said it understands.

**The alliance is a client like any other.** "Lightweight" turns out to mean few modules enabled, not a different kind of tenant. What the old layer carried is re-homed, not dropped: coordination, joint campaigns and shared talking points live in the alliance's own instance and travel as events, in both directions. Mutual suppression — the pilot's primitive, the first central service — leaves the catalogue and becomes request and reply over the bus, every rule unchanged: it runs last, it runs for the sending tenant alone, an unanswered member is not a veto, and asking stays visible in each side's audit log.

**The word goes.** "Federation" is retired as vocabulary: the governance is affiliation, the mechanism is the bus, and the old word survives only where the text keeps the reversal visible — the topology note, the key hierarchy, ADR-001's affiliation section. The key hierarchy loses its two central keys, because nothing central can read cross-organization flow anymore, and gains contract keys, held by the members and rotated on membership change.

## What It Does Not Replace

Cross-organization dedup is gone with the layer. The promise that the alliance could see that a person exists across member tenants has no mechanism now: with no shared identity and no central layer, matching people across instances exists only as a contract term, and mutual suppression's contract-keyed blind index is the only such term specified. ADR-025 already recorded the gap; the bus makes it structural rather than transitional. It is written down as open, in system.md and in the ADR, so it doesn't vanish quietly.

## Where It Stands

| Artifact | Count | Status |
|---|---|---|
| Specs | 18 | users, messaging, mvp, product, coaching cross-referenced |
| ADRs | 28 | 24 accepted, 4 proposed |
| Central components trusted with cross-organization flow | 0 | The federation layer is removed from system.md, kept visible as the design the bus replaces |
| **Verify:** markers | 2 | NATS stream export/import across clusters and clouds; Parsons' connector and licence |
| Diary entries | 20 | Current |

## Next

The NATS check, before anything is committed against the topology — stream export and import across accounts and leaf nodes, over separate clusters and separate clouds. The proving exercise the direction proposed: the MVC's CSV round trip from ADR-027, then mutual suppression between two real instances over the bus. ALLY-005's Phase 2 builds the first contracts whose exports run this way, and ADR-017 already demands the general schema for it. ADR-022 and ADR-027 stay proposed, and the Core still has no name.
