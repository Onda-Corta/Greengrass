# Comms Intelligence — Post-MVP Roadmap

**Systematic media intelligence and controlled-access research, sequenced as the first iterations after the coalition data trust validates**

Drafted: 2026-09-01
Status: Roadmap. Depends on `spec/mvp.md` clearing its March 2028 decision gate. No existing spec has been modified.

---

## 1. What this is, and what it is not

Seven capabilities, requested as one tool:

media monitoring · fact check · talking points · media map · analyst profiles · candidate vetting · opposition research

The binding qualifier is *"todo de forma sistemática, con acceso controlado"* — systematic, with controlled access. Those two words carry more weight than any of the seven features, and much of this document is about them.

**This is not an alternate MVP.** `spec/mvp.md` tests the one question in the project that is not a normal engineering problem — whether sovereign political organizations will pool data under the right rules — and `spec/mvp.md:22` is right that it should be tested first and cheaply, before the expensive build. Nothing here displaces that. The pilot stays as specified: MVC and PIP, ingest-only, mutual suppression, the phases at `spec/mvp.md:216-223`.

This document is what gets built **after** that question is answered: the first iterations of real product, ordered by dependency, each with the gate that releases it.

Two things follow from the sequencing. §2 is why this domain goes first among the many that could. §3 is what it inherits from the MVP — which turns out to be more than a validated assumption.

---

## 2. Why this domain goes first

The full platform is large: fundraising, field operations, GOTV, events, activism, the supporter portal. Any of them could follow the pilot. Four reasons this one leads.

**The spec already scheduled it.** `spec/press.md:101` defers automated media monitoring in unusually forward language:

> Automated media monitoring is deferred not because it's unimportant, but because it deserves serious investment rather than a bolt-on integration. Existing media monitoring services (Meltwater, Cision, etc.) are expensive, Western-focused, and poorly cover regional and local media in the global south. This is a significant market gap. […] Revisit as a dedicated product initiative, not an afterthought.

ADR-015 carries the same decision into the architecture record. This request did not arrive from outside the project — it was parked by it, with a note to come back.

**There is standing demand evidence in the pilot geography.** `puntos-ds.pages.dev` — a hand-built talking-points site from Democracia Socialista in Puerto Rico — exists. Topic filtering, keyword search, copy-to-clipboard, verification flags, and a footer warning about staleness. No platform, no budget, and enough sustained need to justify maintaining it. Hand-built internal tooling is the strongest demand signal available short of revenue, and this one is in the target market, solving one-seventh of the request, unprompted.

**It asks the parties for nothing new.** The pilot is ingest-only: the parties hand over files and get a suppression flag back. Every other domain in the platform asks them to migrate operations. Comms intelligence asks for no import, no field app, no offline client, no custodian sign-off, no new consent question. It is the shortest step from where the pilot leaves them.

**It gives the trust relationship something to do.** The pilot ends with two parties that have proven they will pool data and a single narrow operational feature. If nothing follows quickly, the relationship has no surface to live on. A shared media picture is the natural second thing coalition partners coordinate on, and it carries far lower stakes than pooling supporter lists — which is what makes it a good second ask rather than a good first one.

---

## 3. What it inherits from the MVP

The pilot is not only a validation. It builds four things this roadmap depends on, and one of them is a genuine surprise.

| Built by the MVP | Why this roadmap needs it |
|---|---|
| **BYOK from day one** (`spec/mvp.md:123`) | The dossier store's central claim is that the platform cannot read the material. BYOK makes that true rather than contractual |
| **Immutable audit trail from day one** (`spec/mvp.md:124`) | Chain of custody on research findings is the same machinery |
| **Event sourcing for provenance** (`spec/mvp.md:125`) | The claims ledger *is* a provenance structure — same shape, different subject |
| **The sharing contract, ALLY-005** (`spec/mvp.md:97`) | Field-level, default-deny, per-member. See below |
| **A validated answer on whether the rules are what made it possible** (A7) | Determines whether anything below can be coalition-shared at all |

### 3.1 The sharing contract turns out to be the media map's answer

The most useful thing the MVP leaves behind is the one built for a different purpose.

An open question that would otherwise be hard: who owns the actor graph — the map of outlets, their ownership, financing, and alignment? Per-tenant means every campaign rebuilds it from scratch, which is enormous duplicated effort in exactly the organizations with the least capacity. GreenGrass-maintained is the strongest moat in the whole proposal and also a shared liability, since one bad alignment label on an outlet becomes every tenant's bad label.

If the MVP passes, there is a third answer: **coalition-shared, under the same default-deny field-level contract the pilot already built.** Members contribute what they know about the media landscape, see the union, and withhold what they choose — the identical primitive, pointed at institutional knowledge instead of supporter records.

And it is a *safer* second use of that machinery than the first. A media map contains no personal data of supporters, no consent question, and no `support_level` field that a party guards as its core asset (`spec/mvp.md:58`). If the sharing contract works anywhere, it works here. That makes this domain a natural place to extend the trust arrangement rather than to test it.

**This only becomes available if the MVP passes.** If A7 fails and the parties turn out to have trusted each other rather than the rules (`spec/mvp.md:144`), the actor graph falls back to per-tenant and the coalition-shared version is dropped.

---

## 4. What GreenGrass already has

The spec suite is partly ahead of the request and partly absent.

| Capability | Status | Evidence |
|---|---|---|
| **Media monitoring** | Deferred **as a named strategic opportunity** | `spec/press.md:101`, `decisions/015-product-scope.md` |
| **Talking points** | **Exists** — versioned, topic-organized, team-shared | `spec/press.md:188-193`; PRESS-014 in `design/ux/04-wireframes/press/press.md:1007` |
| **Media map** | Partial — contacts carry outlet, beat, coverage area; the landscape itself is prose | `spec/press.md:22-31`, `spec/press.md:223-229` |
| **Analyst profiles** | Partial — journalists are Contact records with relationship state; analysts are a different object | `spec/press.md:20-31`, `spec/users.md:291-294` |
| **Fact check** | Absent | — |
| **Candidate vetting** | Absent. Nearest neighbor is configurable volunteer approval for infiltration risk, ADR-003 | — |
| **Opposition research** | Absent — appears only in the threat model, as something done *to* the campaign | `spec/security.md:17`, `spec/security.md:49` |

### What the talking-points reference adds

`puntos-ds.pages.dev` has three things PRESS-014 does not:

1. **The *lo que decimos / lo que contestamos* pairing.** Offense and defense as one unit. PRESS-014 stores assertions; the reference stores assertions *and their rebuttals*, which is how the material is actually used under questioning.
2. **Copy-to-clipboard per point.** A small thing that reveals the real use case: someone is composing a reply right now, on a phone, mid-argument. PRESS-014 is designed for review, not for live use.
3. **Per-point verification status** — *"Sin verificar."* The footer reads: *"Uso interno. Los puntos cambian; verifica la fecha antes de citar públicamente."*

The third is the important one, and it is the seam where two of the seven requested features turn out to be one. A talking point with a verification status *is* a fact-check record. See §5.

---

## 5. Seven features are three primitives

Treating the request as seven features produces seven half-built tools. It is three data structures, and the iteration order in §9 follows from them.

### 5.1 The actor graph

Outlets, journalists, analysts, and monitoring targets are one structure, not four. The unit missing today is the **outlet as a first-class record**: ownership, financing, political or confessional alignment, reach, editorial line, sister properties, and who at it writes what.

`spec/press.md:223-229` describes exactly this — Lebanon's *"confessional media landscape (outlets aligned with political/religious groups),"* India's regional-language fragmentation, Puerto Rico's bilingual split — as prose, in a section titled "Media Landscape Differences," and never models any of it. Every outlet in the platform today exists only as a text field on a journalist's contact record (`spec/press.md:24`).

Analyst profiles fall out of the same graph. A journalist is someone you pitch. An analyst or commentator is someone you *predict* — their prior positions, their alignment, what they said last time this issue came up. Same graph, different edge.

### 5.2 The claims ledger

A claim, its sources, its verification status, its approved response, its history.

Fact-check, the verification flag on a talking point, and an incoming monitoring hit are three views of one record. An attack surfaces in monitoring; it becomes a claim; the claim gets sourced and adjudicated; the adjudication becomes an approved response; the approved response is a talking point. Today those four steps live in four places, three of which do not exist.

This is the primitive that makes the tool *systematic* rather than a folder of documents. It is also the one with no analogue anywhere in the current spec — though as §3 notes, it is structurally the same provenance shape the MVP's event sourcing already produces.

### 5.3 The compartmented dossier

Candidate vetting and opposition research are the same machinery pointed in two directions: a subject, a set of sourced findings, a chain of custody, an access list.

Self-vetting is the easier sell and the more defensible product — finding the liability in your own candidate before the other side does. It is the same store, and it is why §9 sequences vetting before oppo.

---

## 6. "Acceso controlado" does not exist yet

This is the part of the request the platform cannot currently satisfy, and it is not a permissions tweak. It is the reason the dossier iterations sit last in §9.

ADR-003 gives hybrid RBAC — stackable role templates with per-user overrides — plus attribute scoping by geography, team, and campaign. It answers *"what can a Communications Director do, and over which region."* It has no answer for *"only these four named people may open this file, and the Org Admin is not one of them."*

The press wireframes make the gap concrete: every screen from PRESS-001 to PRESS-015 is marked visible to **OA, CD** — Org Admin and Communications Director (`design/ux/04-wireframes/press/press.md:15-30`). Role-level, org-wide, no finer grain anywhere in the domain.

A compartmented dossier store needs four things the platform does not have:

| Requirement | Current state |
|---|---|
| Per-record access lists (named people, not roles) | Not modeled |
| Read logging | **Explicitly declined** |
| No superuser read path | **Explicitly declined** |
| Per-compartment key scope | BYOK is per-tenant (ADR-002) |

Two of those are not gaps but active contradictions, and they should be resolved rather than papered over:

- **`decisions/004-data-model-integrity.md:13`** commits to a full audit trail *"for all data mutations."* Reads are not logged. For a dossier store, the read *is* the event worth logging — exfiltration by an insider leaves no mutation behind.
- **`spec/security.md:404`** goes further and makes non-logging a *defense*: *"Avoid logging unnecessary metadata (don't record which specific records a user viewed if you only need to know they logged in)."* That is correct metadata-minimization reasoning for a canvassing app under state surveillance, and it is precisely inverted for a research compartment.
- **`spec/security.md:330`** grants Platform Admin *"silent access… to read tenant data for support and debugging without tenant notification."* Defensible for a CRM. Not defensible for a file on a sitting official.

There is also a knock-on to the duress design. `spec/security.md:435` specifies a decoy passkey that opens a sanitized view. That feature is currently a nice-to-have for the highest tier. Add a dossier store and it becomes load-bearing — there is now something specific that a coerced login must not reveal.

**Compartmentation is its own ADR and its own engineering effort, not a configuration of ADR-003.** It is Iteration 4.

---

## 7. The feasibility risk that could reshape the whole plan

The monitoring pillar rests on an assumption nobody has tested, and it is testable cheaply and early.

### 7.1 "Won't" or "can't"?

Meltwater and Cision do not cover these markets. `spec/press.md:101` reads that as a market gap. It is equally consistent with a market *impossibility*, and the two imply completely different products:

- **Won't** — the markets are real but too small and too fragmented to be worth a Western vendor's integration cost. Then GreenGrass's lower cost base and local-language focus are a genuine moat.
- **Can't** — the coverage is not digitally reachable at any reasonable cost. Then no amount of focus helps, and the product is monitoring the sliver of media that happens to be scrapeable while missing the part that decides elections.

Nothing in the spec suite answers this. §7.4 answers it in three weeks.

### 7.2 The news does not move through the web

In three of five target markets, the spec says the dominant news channel is a closed messaging network:

- **Brazil** — *"WhatsApp is the dominant communication channel (including for news sharing)"* (`spec/press.md:226`)
- **India** — *"WhatsApp and YouTube are dominant digital channels. Regional language media is critical"* (`spec/press.md:228`)
- **Lebanon** — *"WhatsApp is dominant for messaging"* (`spec/press.md:229`)

Monitoring closed messaging networks means surveilling private groups. **The line, stated as a commitment alongside §8: this product does not do that.** Not as a technical limitation. A political intelligence tool that ingests private group chat is a surveillance product, and building one for grassroots organizations in exactly the countries where that capability would be turned against them is not a thing GreenGrass should ship.

That commitment has a cost, and it is the honest cost of the whole idea: in the markets where the platform is most needed, a principled monitoring product sees a minority of what actually circulates.

Radio and television compound it. `spec/press.md:225` puts *"strong local TV and radio"* at the center of Puerto Rico's market and `spec/press.md:226` notes Brazil's mandated *horário eleitoral*. None of that is text-searchable without transcription infrastructure — buildable, a real cost line, and in nobody's estimate today.

### 7.3 Puerto Rico will flatter the result

The pilot parties are in Puerto Rico: a small, bilingual, well-digitized market with a manageable number of outlets and a US-adjacent web presence. Plausibly the *easiest* media environment in the entire target set.

Monitoring that works in San Juan tells you close to nothing about Recife or Chennai. This is the mirror image of the situation `spec/mvp.md:82` describes for the data trust — for that experiment, PR is a clean test; for monitoring feasibility, it is the friendliest possible case and will overstate what generalizes.

**Mitigation:** the corpus probe runs on Brazil and one other market even though the first deployment is in Puerto Rico. Feasibility and adoption get measured in different places on purpose.

### 7.4 The corpus probe — run it early, it costs three weeks

One person, three weeks, and **it does not need to wait for the MVP gate**. It requires no engineering and no pilot party, so it can run alongside the pilot's own Phase 0 or 1 without competing for anyone.

1. Pick two markets. **Brazil and one of India or Lebanon** — not Puerto Rico.
2. Take one week of political news, as a domain expert would define it.
3. Attempt to assemble it from reachable sources: RSS, sitemaps, public APIs, open archives, public social accounts.
4. Measure: what fraction is retrievable without bespoke per-outlet work; what fraction sits behind paywalls, app-only distribution, radio, TV, or closed messaging; what the long tail of regional-language outlets costs to add.

The output is a number per market and a cost curve. If reachable coverage is thin in Brazil, Iteration 3 is repositioned or dropped and the roadmap shortens to the ledger, the graph, and the dossier store — a smaller and different product, known about years before anyone builds it. That is the whole value of running it early.

---

## 8. The doctrine

Opposition research and candidate vetting are in scope at full capability. That is a defensible position, and it is defensible **only** with an explicit doctrine attached. These are commitments, not considerations, and they must exist in writing before Iteration 5 begins.

### 8.1 Sourcing

**Lawful sources only.** Public records, published material, on-the-record statements, court and regulatory filings, campaign finance disclosures, licensed vendor data with documented provenance.

**Prohibited, by design and not by policy alone:** hacked or leaked material, pretexting or misrepresentation to obtain records, personal data of unclear origin, scraped private accounts, and anything obtained from a closed messaging group.

### 8.2 Provenance is mandatory

Every finding carries source, date, collector, and method. There is no free-text field for an unsourced assertion, because the moment there is, that is what the store fills with.

This is what separates research from rumor. It is also the liability shield: a dossier where every line traces to a public record is defensible in a way that a document of assertions never is.

### 8.3 Scope limit

**Public conduct of public figures.** Candidates, officeholders, and their political and financial conduct.

Excluded by default: family members, minors, private medical and sexual matters. Override requires written justification, is logged, and is visible to the compartment owner. The default is the product's position; the override exists because there are real cases and pretending otherwise just moves the work off-platform.

### 8.4 The data-subject-rights collision

The largest unresolved question in this document.

`spec/compliance.md:212` commits GreenGrass to *"LGPD/GDPR-level sensitive-data protections applied globally regardless of local law,"* on the reasoning that all data on a political platform is political by nature. `spec/compliance.md:223-236` then enumerates access, correction, deletion, portability, and objection rights.

**An opponent is a data subject.** Under LGPD, PDPA, and DPDPA they hold rights over a dossier held about them — including access and deletion. A subject-access request against an oppo file is not an edge case; it is an obvious and cheap tactic, and the first campaign to use it against a GreenGrass tenant sets the precedent for the product.

Three partial answers, none sufficient alone:

1. **Journalistic and legitimate-interest exemptions.** Real, but narrow, jurisdiction-specific, and generally written for press rather than for political operations.
2. **Tenant-as-controller with a genuinely blind platform.** GreenGrass is a processor (`spec/compliance.md:240`); the request goes to the tenant. BYOK — which the MVP already ships (`spec/mvp.md:123`) — makes platform blindness *true* rather than merely contractual, and directly conflicts with the silent Platform Admin read path at `spec/security.md:330`.
3. **Public-record-only scope.** Where the underlying facts are already public, the subject's position is weakest. The cleanest answer and also the narrowest product.

**This goes to counsel per jurisdiction before a line of dossier code is written**, and it belongs on the list at `spec/compliance.md:481`. It is a plausible reason for the dossier module to ship in some markets and not others.

### 8.5 Access and retention

- **Compartmented by default.** Sealed to a named access list, never to a role. Adding a person is an event, logged and visible to the compartment owner.
- **Reads are logged and the log is visible to the compartment owner.** Reverses `spec/security.md:404` for this data class only, and the reversal must be scoped precisely so it does not leak back into field operations, where the original reasoning still holds.
- **No superuser read path.** Org Admin can grant access; Org Admin cannot read. Platform Admin cannot read at all — the silent-access decision at `spec/security.md:330` is overridden for this data class, with no exception for support or debugging.
- **Forced expiry.** Dossiers expire at the end of the electoral cycle unless renewed with written justification.

### 8.6 The threat model inverts

`spec/security.md` is built on the premise that the campaign is the target of surveillance. A dossier store makes the campaign a high-value target for an entirely different reason — and a leak is not a compliance incident but an inter-party scandal with named victims. `spec/mvp.md:276` already makes precisely this argument about the data trust; it applies with more force here, because a dossier is *about* someone rather than merely containing them.

Consequences to design for: separate encryption scope, and a serious argument for offering the dossier module **self-host-only**, so that GreenGrass never holds the material at all.

### 8.7 The authoritarian-context position

`spec/geography.md:65-69` rates Thailand and India *"Enhanced to Aggressive"* and Lebanon *"Aggressive"* — for state surveillance capability and political pressure on opposition.

A compartmented research store is precisely what a hostile state most wants to seize, and seizure endangers **sources**, not just the campaign. Someone who spoke to a researcher on condition of discretion is exposed by a store built to protect the researcher.

**The hard position, stated as product policy: the dossier module is unavailable, or local-device-only, in the highest-threat jurisdictions.** Refusing to ship a capability into a market where it converts into a target list is the correct call even though a competitor will make the opposite one.

---

## 9. The iterations

Ordered by dependency, not by appeal. Each releases only when its gate passes.

| # | Iteration | Contains | Gate to start | Rough cost |
|---|---|---|---|---|
| **0** | **Corpus probe** | §7.4. Two markets, one week of coverage, measure reachability | None — runs alongside the MVP's Phase 0/1 | 1 person, 3 weeks |
| **1** | **Talking points + claims ledger** | PRESS-014 extended with the three additions from §4; claim records with sources, status, approved response | MVP decision gate passed (`spec/mvp.md:223`) | 2 eng + 1 designer, ~6 weeks |
| **2** | **The actor graph** | Outlet as first-class record; journalist and analyst profiles; media map views | Iteration 1 in real use | ~8 weeks |
| **3** | **Monitoring ingestion** | Source configuration, monitoring inbox, hit → coverage promotion feeding PRESS-010/011 | **Iteration 0 result** — see kill criteria | ~12 weeks, plus ongoing corpus operations |
| **4** | **Compartmentation primitive** | The ADR from §6, plus per-record access lists, read logging, key scoping | Iterations 1–3 shipped; no dossier work starts before this | ~8 weeks, cross-cutting |
| **5** | **Candidate vetting** | Self-vetting dossiers under the §8 doctrine | Iteration 4 complete; doctrine written and adopted | ~6 weeks |
| **6** | **Opposition research** | Same store, external subjects | **Legal review complete per jurisdiction** (§8.4) | ~4 weeks on top of 5 |

### 9.1 Why this order

**Iteration 1 first because it needs nothing.** Talking points and the claims ledger require no new access-control primitive, no ingestion pipeline, and no legal review. They extend a screen that is already wireframed. It is the fastest path from the MVP gate to something a campaign uses daily.

**Iteration 3 gated on Iteration 0 and nothing else.** Monitoring is the most expensive pillar and the only one whose feasibility is genuinely unknown. Running the probe years ahead of the build is the cheapest risk reduction available anywhere in this plan.

**Iteration 4 before 5 and 6, without exception.** Shipping a dossier store on top of role-based permissions would be worse than not shipping it — it would create the appearance of compartmentation without the substance, which is the failure mode most likely to get someone hurt.

**Iteration 5 before 6** because self-vetting is the same machinery with far lower legal exposure, and it proves the compartment works on material where a mistake is survivable.

### 9.2 Kept from the start, despite looking deferrable

- **Provenance on every claim, from Iteration 1.** Retrofitting sourcing onto a ledger that already contains unsourced assertions does not work; the assertions never get sources.
- **Verification status on talking points, from Iteration 1.** One field, and it is the seam that makes the ledger and the library one product rather than two.

### 9.3 Screen reuse

Most of this is not new drawing. Iteration 1 extends PRESS-014. Iteration 2 reuses CRM-001/002 patterns for the graph and PRESS-001/002 for person views. Iteration 3 feeds PRESS-010 and PRESS-011, which are already wireframed as manual-entry screens and become automatically populated. Genuinely new and unwireframed: the monitoring inbox, the claims ledger, the outlet record, and the compartment management surface.

---

## 10. Gates and kill criteria

Decided in advance, so the calls are not made under sunk-cost pressure.

| Signal | Reading | Action |
|---|---|---|
| MVP decision gate says stop or reposition (`spec/mvp.md:223`) | The premise this roadmap sits on changed | **Re-derive.** Iterations 1–3 may still stand alone as a single-tenant product; the coalition-shared actor graph (§3.1) does not |
| A7 fails — they trusted each other, not the rules | The sharing contract is not the asset it appeared to be | **Actor graph goes per-tenant.** Everything else proceeds |
| Corpus probe returns <30% reachable coverage in Brazil | The gap is "can't," not "won't" | **Drop Iteration 3.** Roadmap shortens to ledger, graph, dossiers — and that is known years early |
| Iteration 1 ships and nobody authors a talking point in 6 weeks | Consumption without authorship; it is a document, not a system | **Stop before Iteration 2.** Investigate whether the org has anyone whose job this is |
| Only one person ever logs in | One staffer's habit, not an org capability | **Investigate.** Single-user tools churn when that user leaves, and campaign turnover is high (`spec/press.md:52`) |
| Legal review says dossiers are impermissible in 3+ target markets | The research pillar is regionally bounded | **Ship Iterations 1–4 and stop.** Do not build a module sellable in two countries |
| Any pressure to ship Iteration 5 before Iteration 4 | The failure mode that gets someone hurt | **Refuse.** This is the one line in the document with no override |

---

## 11. What to start now

Nothing in §9 begins before the MVP gate, with one exception.

**Run the corpus probe (Iteration 0) during the pilot.** It costs one person three weeks, needs no engineering, needs no pilot party, and does not compete with the data trust's own Phase 1 — which `spec/mvp.md:239` prices at one person for three weeks and which stays exactly as specified. Running both is roughly six person-weeks total and answers two independent questions years before either build is funded.

The corpus probe is also the only item here whose answer could restructure the roadmap rather than merely schedule it. If monitoring turns out to be intractable in Brazil, that changes what GreenGrass is selling — and it is much better to learn it in 2027 than in 2029.

Everything else waits for March 2028.

---

## 12. Open questions

### For legal counsel — before Iteration 5

1. Does any target jurisdiction offer an exemption that covers opposition research as a lawful basis, and how narrow is it? (§8.4.)
2. Does tenant-as-controller with genuine platform blindness satisfy a subject-access request under LGPD or DPDPA, or does the tenant's obligation simply pass through?
3. Does automated ingestion of published news content raise copyright or database-right exposure in any target market, and does storing full text versus headline-plus-link change the answer?

### For product

4. If the coalition-shared actor graph (§3.1) is viable, does contributing to it create the same free-rider legibility problem as the contribution ledger at `spec/mvp.md:316` — and does H8's mitigation transfer?
5. Does the claims ledger connect to the AI activism message generation at ADR-013, which already draws on talking points? If a claim's approved response can seed a generated message, the two systems are closer than this document assumes.
6. Does self-vetting sell on its own, without opposition research attached? Same machinery, far lower exposure, possibly the more honest product.

### For the pilot parties, once the gate passes

7. Would MVC, PIP, or DS pay for this, and at what tier?
8. Who at a campaign of ten people owns this work today, and is it anyone's actual job? If the answer is "nobody, it happens in a WhatsApp group," that is both the opportunity and the adoption problem.
