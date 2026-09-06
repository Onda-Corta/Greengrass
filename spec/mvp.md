# GreenGrass MVP — Product Plan

**The Coalition Data Trust: testing whether sovereign political organizations will pool data under the right rules**

Pilot pair: MVC and PIP (Puerto Rico)
Drafted: 2026-08-19

---

## 1. Context

GreenGrass has a complete specification — 12 spec documents, 37 UX documents, 236 wireframed screens, 16 ADRs — and no code. The full platform is a campaign operating system that asks a political party to migrate everything it does onto a new tool.

Underneath that plan sits a single load-bearing assumption that has never been tested:

> **Sovereign political organizations will pool data with each other under the right rules.**

Every alliance feature in the spec depends on it. The federation layer, the per-resource sharing contracts, cross-org dedup, joint campaigns, unanimous-consent fundraising splits, alliance key rotation — all of it presumes that parties who guard their lists as their core institutional asset will hand them into a shared arrangement if the governance is good enough.

If that assumption is false, roughly a third of the specified product is dead weight and GreenGrass is a single-tenant campaign CRM competing with NationBuilder, NGP VAN, and Action Network on features. That is a much worse business.

Everything else in the 16 ADRs is a normal engineering problem. This one is not. **It should be tested first, cheaply, before the expensive build.**

This plan scopes the smallest product that can test it, and specifies how the test is run and what would falsify it.

---

## 2. The product, in one sentence

Two or more parties in a joint campaign each upload whatever contact data they already have. The platform tells them who they collectively know and who overlaps — without any member seeing another's non-overlapping records, and without anyone becoming the owner of the merged result.

No migration. No field app. No offline mode. Parties keep organizing exactly as they do today and hand over exports on whatever cadence they actually work at.

### The core coordination primitive: mutual suppression

The pilot ships exactly one operational feature, and it is deliberately narrow.

Each party sends its own messages, under its own consent, from its own tooling. Before sending, it asks the shared layer: *has any other member contacted these people in the last N days?* The answer comes back as a yes/no flag per record.

This is the right primitive for four reasons:

1. **It is the minimum that delivers real value.** Not double-messaging a shared supporter is the concrete, immediate pain of coalition work.
2. **It is what the blind-index architecture gives you for free.** No additional disclosure machinery.
3. **It is legally cleaner than joint sending.** Each party's contacts opted in to *that party*, not to a coalition entity. Suppression means no contact data leaves either party and no message is sent under ambiguous consent — only a "skip this one" signal returns. See §9.6.
4. **It is directional and revocable.** Nothing about non-overlapping records is disclosed in either direction, ever.

Coverage-by-geography and don't-re-knock coordination are stretch goals, contingent on address data neither party may have (§4.3).

---

## 3. The parties

### MVC — Movimiento Victoria Ciudadana

- Founded 2019. Newer, and organizationally younger.
- **Runs NationBuilder.** This is a gift: NationBuilder's CSV people export has stable, documented field names — `nationbuilder_id`, `first_name`, `last_name`, `email`, `phone_number`, `mobile_number`, `primary_address1`, `city`, `state`, `zip`, `tags`, `support_level`, `is_volunteer`, `do_not_contact`, `email_opt_in`, `mobile_opt_in`.
- Consent flags travel with the export, which matters — person-level consent overrides org-level sharing settings ([users.md § Cross-org sharing within alliances](users.md#cross-org-sharing-within-alliances)).
- **`support_level` and `tags` are exactly the fields that must never enter the shared view.** MVC's own assessment of a voter is its most sensitive asset. The sharing contract's first job is to make excluding them obvious and default.

### PIP — Partido Independentista Puertorriqueño

- Founded 1946. Much older, with a deep municipal committee structure across the island's 78 *municipios*.
- **Tooling unknown.** This is a discovery task, not an assumption to paper over. Plausible states, roughly in order of likelihood: fragmented Excel/Google Sheets maintained by volunteers; a legacy local database; municipal committee lists held in pieces by different people; paper-adjacent records.
- Expect heterogeneous fragments, inconsistent formatting, and multiple custodians who each have to say yes.

### The asymmetry is the most important fact in this plan

MVC arrives with clean structured data from a modern tool. PIP likely arrives with fragments. That asymmetry drives three consequences, and each needs a designed response:

| Consequence | Response |
|---|---|
| Match rates will be dragged down by PIP-side data quality, not MVC-side | Budget hands-on data-wrangling support for PIP (§7). Tooling friction must not be allowed to masquerade as unwillingness — that is the single most likely way this pilot produces a false negative. |
| PIP will experience the product as more work than MVC does | Front-load PIP's effort into Phase 0/1, where a human does the work for them. |
| The shared view may be dominated by MVC's contributions, making PIP look like a free-rider even if it isn't | **The contribution ledger may be a liability with unequal parties.** See Appendix, H8. |

### Starting position

Operationally, the two parties are starting from scratch: no shared data infrastructure, no pooled lists, nothing to inherit. The pilot builds on a blank slate.

**Prior cycles are out of scope.** Past arrangements between these parties are not a research subject for this project and are not to be raised — in interviews, in materials, or in the pilot framing. All discovery is prospective: what pooling would require going forward (§6.4).

One planning consequence worth noting internally: because there is no inherited data-sharing relationship, there is no prior-cooperation confound to design around. MVC/PIP is a clean test of the assumption.

---

## 4. Scope

### 4.1 What gets built

Roughly 12 screens. This build serves the experiment, not the market — it is deliberately thinner than a general v1 of the coalition product would be.

| Area | Screens | Reuse |
|---|---|---|
| Auth | Passkey login + fallbacks | AUTH-001–007 as drawn |
| Onboarding | Org setup (trimmed), BYOK ceremony | WIZ-001, WIZ-003 |
| Import | Upload → column map → preview → confirm; import history | CRM-008–012 |
| Sharing contract | Field-level, default-deny, per-member | ALLY-005, the centerpiece |
| Members | Member list, affiliation request + approval | ALLY-002–004 |
| Shared universe | Overlap summary, suppression list, export | New |
| Audit | Multilateral audit log, visible to all members | SET-018, extended |
| Contribution ledger | What each member put in and got out | New — and under test, see H8 |

Genuinely new and unwireframed: the suppression query/response flow, the contribution ledger, and the exit/dissolution flow.

### 4.2 What is cut

All fundraising (20 screens), communications, events, press, activism, social, the GOTV war room (21), field mode and field ops (29 screens and by far the hardest engineering — offline SQLite, sync, conflict resolution, map tiles), supporter portal, messaging, help and training, most dashboards, most settings.

Puerto Rico only. Spanish and English. RTL correctness maintained in CSS per ADR-010, but no Arabic ships.

### 4.3 The input-shape branch

The expected floor from both parties is a CSV of emails and phone numbers. Plan for both branches, because they produce different products:

**Branch A — identifiers only (email + phone).** Matching gets *easier*: exact match on normalized identifiers, no fuzzy-name problem at all. But coverage-by-geography is impossible, and the product collapses to overlap detection plus mutual suppression. **This is still the whole pilot** — it tests the assumption fully. Build for this branch.

**Branch B — identifiers plus address/geography.** Makes coverage maps, gap analysis, and turf coordination possible. Treat as stretch. Requires geocoding to *municipio* at minimum; precinct-level would be better but is unlikely to survive the data.

Do not let Branch B's appeal delay Branch A. The assumption under test does not require a map.

### 4.4 Kept despite looking cuttable

- **BYOK from day one** (ADR-002). You cannot retrofit encryption onto a data trust after members have uploaded, and "the platform itself cannot read your list" is most of why a suspicious partner says yes.
- **The immutable audit trail from day one** (ADR-004). It is the product, not the plumbing.
- Event sourcing is retained for provenance and audit, since it is the right shape for that anyway. The offline client is not built at all — ingest-only means there is no field device, so ADR-005's sync rationale is dormant.
- **A general sharing-contract schema, even though the pilot only needs the alliance case** (ADR-017). The contract at §4.1 is the platform's trust primitive at every boundary — alliance, party, candidacy, campaign, and compartment — not an alliance feature. Phase 2 is where that shape gets decided in practice. Keep the party reference polymorphic and the terms general; keep the UI exactly as narrow as this plan specifies. General schema, narrow UI. Same argument as BYOK above: you cannot retrofit generality onto a contract after it ships as an alliance feature.

---

## 5. The assumption, decomposed

"They will pool data under the right rules" is too coarse to test. It decomposes into seven falsifiable claims, ordered so that cheap ones gate expensive ones.

| # | Claim | Measured by | Pass bar |
|---|---|---|---|
| **A1** | They will upload at all — behaviorally, not in principle | File received | Both parties deliver within 30 days of signed agreement |
| **A2** | They will upload something real, not a token sample | Row count vs. claimed list size | Each file ≥50% of claimed total |
| **A3** | The data will match at a useful rate | Deterministic match on normalized email/phone | Overlap in the 5–60% band |
| **A4** | Seeing the overlap will not scare them off | Withdrawal / contract tightening after the report | Neither withdraws within 2 weeks |
| **A5** | They will act on the shared view | Documented operational decisions changed | ≥1 per party, evidenced |
| **A6** | They will do it again | Voluntary repeat uploads | ≥2 per party after the first |
| **A7** | **The rules are what made it possible** | Separate blind interviews, pre and post | Both say they would *not* have sent the file directly to the other party |

**A7 is the thesis.** A1–A6 can all pass while A7 fails, and if A7 fails the product is a dedup utility rather than trust infrastructure. That is a different, smaller company — not necessarily fatal, but it must be known before the full build is funded.

On the A3 band: below 5%, dedup is not worth the integration cost. Above 60%, the two parties are effectively holding one list, and the coordination problem is a different problem than the one specified. Both outcomes are informative; neither is a pass.

---

## 6. Instrumentation

### 6.1 Behavioral signals — trust measured by conduct, not by survey

People overstate their willingness to share in interviews. Log conduct instead:

- **Time-to-upload from agreement.** Hesitation is data.
- **What they withhold.** Fields excluded from the sharing contract. Columns stripped before upload — for MVC this is directly measurable by diffing the delivered file's schema against NationBuilder's default export schema. Deletions are visible and meaningful.
- **Row count vs. claimed list size.**
- **Whether anyone ever opens the audit log.** If nobody reads it, the trust machinery may be decorative — they trusted the counterparty, not the system. Direct probe at A7.
- **Whether the sharing contract changes after results land.** Loosening indicates earned trust. Tightening indicates a scare, and the scare should be chased down in interview.
- **Who gets access.** One person per org, or a team? Delegating access is a trust behavior.

### 6.2 Interviews

Structured, **separately, never jointly.** In a joint session neither party will say the uncomfortable thing. Three points: before any file moves, after the overlap report, after the pilot window closes.

### 6.3 The counterfactual, recorded before exposure

Ask both, in Phase 0, before they have seen anything: *"If GreenGrass did not exist, how would you coordinate lists with a coalition partner?"* Record verbatim. This is the control for A7 and it is worthless if collected after they have used the product.

### 6.4 The readiness interview — prospective only

Before building anything, interview both parties separately about what pooling would require **going forward**. Ask nothing about past cycles (§3).

The forward-looking framing is not just diplomatic, it is better research. "What would it take?" gets a designable answer; "why didn't you?" gets a defense.

Six questions, each aimed at a different class of blocker:

| Question | Surfaces |
|---|---|
| What would have to be true for you to put your contact list into a shared arrangement with a coalition partner? | The general shape of the objection |
| Who would have to sign off on that? | **Authorization** — how many yeses, at what level |
| If you decided today, what would actually stop you next week? | **Capacity** — the practical, unglamorous blockers |
| Do you know whether your supporters' opt-ins would cover coalition contact? | **Legal** (§9.6) — and whether they have even considered it |
| How long would it take you to produce a clean export? | **Data quality** — and it calibrates PIP-side support needs (§3) |
| What would you absolutely not include, under any rules? | **The sharing contract's real requirements** |

That last question is the most directly useful thing in this plan for the build. It defines the default-deny field list in ALLY-005 from the parties' own words rather than from our guesses.

**Why this matters beyond requirements-gathering:** several of these blockers are not "trust" in the sense the spec assumes. The federation layer, per-resource sharing contracts, and unanimous-consent governance are all designed against a *suspicion* model. If the binding constraint is capacity, legality, or authorization, the elaborate consent machinery solves a problem these parties do not have. See §9.2.

**Run before Phase 0 closes.** It can reorder everything downstream.

### 6.5 The contrast pair

A second pair with no coalition history — conversation only, no build. One that says "absolutely not, under any rules" bounds the market; one that says "under those rules, maybe" is strong evidence for the thesis. Two meetings, high information per hour.

---

## 7. Phases

Anchored to the Puerto Rico electoral calendar. The next general election is November 2028, with primaries around mid-2028.

### The scheduling problem: there may be no live joint campaign

The MVP is defined as organizing data *within the context of a joint campaign*. With no coalition currently operating, **there may be nothing to attach the pilot to during 2026–2027.** That breaks A5 — if no shared operation is underway, there is no decision for the shared view to change, and A5 is the gate separating real pooling from theater.

Three options, in preference order:

1. **Target the 2028 coalition-formation window (recommended).** If a coalition is negotiated for 2028, that negotiation happens through 2027 — before primaries, before the campaign proper. That is the sweet spot: the parties are actively deciding what to share, motivation is high, and electoral risk is low because no votes are being chased yet. The product shows up exactly when the question is live.
2. **Attach to a non-electoral joint activity.** A shared advocacy push, a joint fundraiser, a voter registration drive. Lower stakes but a real operation, which is enough for A5.
3. **Run as an explicit dry run.** Framed as infrastructure-building ahead of 2028. Cheapest, but highest risk of drift and of A5 going untested — nobody changes a decision because there is no decision to change.

Do not run the first pilot during the 2028 campaign itself. Becoming a variable in a live election outcome is both an ethical problem and a guarantee of uninterpretable data.

| Phase | Window | What happens | Gates |
|---|---|---|---|
| **0 — Consent & framing** | Sep–Oct 2026 | Participation agreement and DPA signed by both. Readiness and counterfactual interviews recorded. PIP tooling discovery. Legal review of cross-party consent (§9.6). | — |
| **1 — Manual Wizard-of-Oz** | Nov 2026 – Jan 2027 | Both parties send a file. Match run **by hand**, offline, on an air-gapped machine. Report returned. | **A1, A2, A3, A4** |
| **2 — Build** | Feb – Jun 2027 | The ~12 screens. Only if Phase 1 gates pass. | — |
| **3 — Live pilot** | Jul 2027 – Jan 2028 | Timed to the coalition-formation window. Bounded slice — one senatorial district or a few municipios, not the island. Both parties operate mutual suppression against the shared ledger. | **A5, A6, A7** |
| **4 — Withdrawal test** | Feb 2028 | Scheduled, consensual exercise of revocation and exit by one party. | Exit integrity |
| **Decision gate** | Mar 2028 | Fund the full build, reposition, or stop. | — |

### On Phase 1 — and its honest limitation

The first test of A1–A4 needs no product at all. Two weeks of Python instead of four months of engineering.

But there is a catch that must be stated plainly to both parties: **in the manual version, we can see both files.** The product's central claim is that nobody — including the platform — sees the other side's data. The manual test therefore validates *willingness to pool via a trusted human intermediary*, which is a weaker claim than the product makes.

That is acceptable, because it is a **necessary-but-not-sufficient gate**: if they will not pool even with a trusted intermediary, they will certainly not pool with software. Phase 1 tests the floor. If they fail the floor, stop before spending the build budget.

### On Phase 4 — the test nobody runs

Deliberately exercising exit, on a schedule, while everyone is calm, is the most informative hour in the plan. If revocation is ambiguous or the export is incomplete, you learn it now rather than during a real dispute when the relationship is already failing. Offering the test is itself a trust signal.

### Team and cost

- Phase 1: one person, ~3 weeks. Effectively free.
- Phase 2: 2 engineers + 1 designer, ~4 months.
- Phase 3: 1 engineer + **1 dedicated partner-support person.** The support role is not optional — it is the control against false negatives from PIP-side data friction (§3).

---

## 8. What "egalitarian" costs architecturally

Governance is N-party with unanimous consent. This is where the existing spec has to bend.

- **No lead org.** ADR-016 §80 gives the joint campaign record to a lead org; unanimity breaks that. Requires an **Alliance Steward** role held symmetrically, one seat per member — which forces the open question at [alliance.md § Open Questions](../design/ux/04-wireframes/alliance/alliance.md#open-questions) to resolve as *yes, dedicated role*.
- **Unanimous to expand sharing; unilateral to contract it.** Grants need every member. Revocation is any one member's call, effective immediately. This asymmetry *is* the trust model: it means joining is never a trap.
- **Deadlock is a feature.** With unanimity there is no majority to break ties. Status quo persists, no timeouts, no auto-approval. The spec already got this right for affiliation requests (ADR-016 §82, "silence means no") — generalize it.
- **The platform is never the tiebreaker.** No "contact support to resolve the dispute." If members cannot agree, nothing happens. That commitment is what makes the arrangement safe for the *weaker* party in an unequal coalition — which, on data maturity, is PIP.
- **Shared view, not shared master.** Per ADR-016 §80, no forced cross-org dedup. Records stay in each member's own systems; the shared universe is a view.
- **Exit is rehearsed, not theoretical.** Leave with a full export of your own data plus the audit log covering your participation; your contribution drops out of the live view going forward.

**The honest limit:** equal rights do not equalize leverage. The party with more records learns more from the intersection than the party with fewer. The contribution ledger makes this visible and identity-only contribution mitigates it, but it cannot be designed away.

---

## 9. Risks

**9.1 No live joint campaign to test against.** *Likelihood: high. Severity: high — it makes A5 untestable, and A5 is what separates real pooling from theater.* Mitigation: target the coalition-formation window, or attach to a non-electoral joint activity (§7).

**9.2 The blocker may not be trust at all.** *Likelihood: medium. Severity: strategic.* If the readiness interviews (§6.4) show the binding constraint is capacity, legality, or political authorization rather than suspicion, then the spec's elaborate consent machinery — the federation layer, per-resource sharing contracts, unanimous-consent governance — solves a problem these parties do not have. That does not kill the product, but it substantially rescopes it and lowers the value of the ADR-016 §78–82 alliance surface.

**9.3 Asymmetric data maturity produces a false negative.** *Likelihood: high. Severity: high.* PIP's friction gets misread as PIP's unwillingness. Mitigation: dedicated partner-support person; do the wrangling *for* them in Phase 1; measure willingness by decisions made, not by files formatted correctly.

**9.4 Puerto Rico data quality.** *Likelihood: certain. Severity: medium under Branch A, high under Branch B.*

- **Two surnames.** Paternal + maternal naming means `last_name` may hold one, both, or a hyphenated mash. Devastating for fuzzy name matching — and a strong argument for staying in Branch A, where names are not used for matching at all.
- **Phone formatting.** +1 787 and +1 939 both serve PR; local formatting varies. Normalization to E.164 is mandatory and mostly solves this.
- **Addresses.** *Urbanización* / *barrio* / rural-route conventions break US-standard address parsers. Do not assume USPS normalization works.
- **Diaspora.** Many PR-connected donors and voters carry stateside phones and addresses. Cross-jurisdiction wrinkle for both matching and consent.
- **Electoral geography.** 78 municipios, 8 senatorial districts, 40 representative districts, precincts and units, with the CEE as authority. If neither file carries precinct or municipio, the coverage feature dies — hence Branch A as the plan of record.

**9.5 Political sensitivity.** *Likelihood: low. Severity: severe.* A leak here is not a compliance incident, it is an inter-party scandal with named victims. The BYOK and no-platform-access posture is insurance on GreenGrass's own reputation as much as on theirs.

**9.6 Cross-party consent may be legally impermissible.** *Likelihood: medium. Severity: high if unaddressed.* Puerto Rico is a US jurisdiction: TCPA governs SMS, CAN-SPAM governs email. Each party's contacts opted in to *that party*, not to a coalition. Whether the original opt-in covers joint contact is a real question and **must be answered in Phase 0, not discovered in Phase 3.**

This risk is the direct reason the pilot operation is mutual suppression rather than joint sending. Suppression requires no new consent: each party contacts only its own opted-in people, and the only thing crossing the boundary is a suppression flag.

**9.7 This may be a feature, not a company.** *Likelihood: medium. Severity: strategic.* A coordination layer with no field app is easy to describe and easy to copy. Defensibility lives in the trust posture and the accumulated boundary data, not in the join itself.

---

## 10. Kill and pivot criteria

Decided in advance, so the decision is not made under sunk-cost pressure.

| Signal | Reading | Action |
|---|---|---|
| Either party refuses to upload after signing | The thesis is wrong for this pair | **Stop.** Diagnose why before generalizing — the refusal reason is the most valuable data the pilot can produce |
| Both say they would have just emailed the file (A7 fails) | Not trust infrastructure; a dedup utility | **Reposition.** Different product, different pricing, much smaller alliance surface in the full build |
| Match rate <2% on clean identifiers | Data quality, not trust, is the binding constraint | **Pivot** toward data quality and normalization as the product |
| Both set sharing to maximum on the first try | Granular controls are over-engineered for this segment | **Simplify** the sharing contract — a "success" that is a finding against the design |
| Files arrive, overlap is computed, nobody changes any decision (A5 fails) | Pooling is theater | **Stop.** Data that changes no behavior has no value to sell |

---

## 11. Open questions to resolve with the parties

All prospective. Nothing here asks about prior cycles.

1. Is a coalition being contemplated for 2028, and on what timeline is that decided? (Sets the Phase 3 window, §7 — currently the load-bearing unknown in the schedule.)
2. What does PIP actually use, and who are the custodians of each fragment?
3. Who at each party can say yes — and is it the same level of authority on both sides? (PIP's municipal committee structure may mean many yeses are needed.)
4. Does either party's existing opt-in language contemplate coalition contact? (§9.6)
5. What would each consider the *minimum* useful contribution — identifiers only, or would they go further?
6. What would each absolutely not include, under any rules? (Defines the default-deny field list in ALLY-005.)
7. Would either accept the contribution ledger being visible to all members, or must it be private to each? (Directly tests H8.)

---

## Appendix — Hypotheses beyond the core assumption

**H8 — The contribution ledger is a liability with unequal parties.** It was designed to make free-riding legible and thereby make the arrangement fair. With MVC contributing clean structured volume and PIP contributing fragments, it may instead broadcast PIP's relative weakness and damage the relationship. Mitigations to test: normalize by list size; report *coverage delivered* rather than raw record counts; make the ledger private to each member by default.

**H9 — The audit log is decorative.** If neither party ever opens it, the trust was in the counterparty rather than the system, and the immutable-log investment does not carry its weight for this segment. Direct probe at A7.

**H10 — Suppression alone justifies adoption.** If mutual suppression is enough to drive repeat use with no map, no canvassing coordination, and no joint sending, the buildable product is far smaller than specified — and reaches market far sooner.
