# ADR-020: Central Service Line-up & Builders

**Status:** Accepted
**Date:** 2026-09-28
**Sources:** `spec/comms-intelligence.md`, `spec/press.md`, `design/architecture/system.md`, `decisions/013-analytics-ai.md`, `decisions/015-product-scope.md`, `decisions/016-cross-cutting-resolutions.md`, `decisions/018-ai-agent-posture.md`, `decisions/019-central-services-and-metered-billing.md`

## Context

[ADR-019](019-central-services-and-metered-billing.md) gave central services a home: a catalogue, per-tenant entitlements, metering, execution for one tenant per call, and nothing retained between calls. It named the kinds of capability that would live there and left the line-up itself for later. The alliance services board recorded in [diary entry 13](../diary/13-services-a-la-carte.md) draws four services, with mutual suppression consulted before every send: Capture, Analysis, Builders and outbound dispatch.

Three of the four already exist in the corpus under other names. Capture is the automated media monitoring that [comms-intelligence.md § 9. The iterations](../spec/comms-intelligence.md#9-the-iterations) sequences as Iteration 3 and [ADR-015](015-product-scope.md#deferred-automated-media-monitoring) defers. Analysis is the dossier work of Iterations 4 to 6, plus analysis of published electoral results. Outbound dispatch is the channel transport [system.md § Communication Infrastructure](../design/architecture/system.md#communication-infrastructure) already specifies, and which ADR-019 lists as a central service.

Builders is the new one. The corpus has accepted exactly one generation feature: [ADR-013 § AI-generated custom messaging for activism](013-analytics-ai.md#ai-generated-custom-messaging-for-activism), where a supporter reviews, edits and approves a drafted message before it is sent. The board's Builders service drafts text, images and video for campaign staff. [ADR-016](016-cross-cutting-resolutions.md) #25 kept video creation outside the platform. And [ADR-018](018-ai-agent-posture.md) gates any AI capability with wide read scope, tool authority, autonomous action or broad credentials until its review is accepted.

### Conflicts this ADR resolves

1. **[ADR-015 § Deferred: automated media monitoring](015-product-scope.md#deferred-automated-media-monitoring)** defers monitoring "as a dedicated product initiative". Capture specifies it.
2. **[ADR-016](016-cross-cutting-resolutions.md) #25** decides that TikTok video creation is "external only; upload finished videos". The board puts video in Builders.

## Decision

### Four central services

| Service | What it does | What it works on | Where output lands | When |
|---|---|---|---|---|
| **Capture** | Collects published press, broadcast (TV, radio and podcasts, transcribed), public social accounts and published polls | Public sources. The corpus may be shared within a country; queries against it are tenant-scoped | The tenant's monitoring inbox | Comms intelligence Iteration 3, gated on Iteration 0 |
| **Analysis** | Electoral analysis over published results; delivery of opposition research and self-vetting findings | Published results, which share like the capture corpus. Research, which never shares | The tenant. Research lands in the compartment its contract names | Research: Iterations 4 to 6, gates unchanged. Electoral analysis: not yet scheduled |
| **Builders** | Drafts text, images and video from a brief a person supplies | Only what the invoking person hands it | A draft inside the tenant | Text: new Iteration 7. Images and video: proposed, see below |
| **Channel transport** | Sends email, SMS and WhatsApp, and distributes to social accounts | The tenant's own messages | The recipient | Already specified; mutual suppression runs before every send |

Every one of them runs under ADR-019 without exception: an entitlement per tenant, one tenant per call, nothing retained, metered supplier costs passed through at cost.

**Alternatives considered:** A separate "monitoring platform" outside the central-service model was rejected because it would need its own isolation and billing story, and ADR-019 already supplies both. Folding electoral analysis into Capture was rejected because it produces analysis rather than a corpus, and the difference decides where output lands.

### Capture: automated media monitoring moves from deferred to specified

ADR-015 deferred automated monitoring until it could be a dedicated product initiative. [comms-intelligence.md](../spec/comms-intelligence.md) is that initiative, and ADR-019 gives it an architectural home. It is now specified as the Capture service. **The build stays gated on Iteration 0**, the corpus probe at [comms-intelligence.md § 7.4 The corpus probe — run it early, it costs three weeks](../spec/comms-intelligence.md#74-the-corpus-probe-run-it-early-it-costs-three-weeks), and the kill criterion stands: under 30% reachable coverage in Brazil drops the service.

- **Published sources only.** Closed messaging groups are never captured, as a commitment rather than a limitation ([comms-intelligence.md § 7.2 The news does not move through the web](../spec/comms-intelligence.md#72-the-news-does-not-move-through-the-web)). Social capture means public accounts.
- **Broadcast needs transcription.** That is the cost line §7.2 names. Where a transcription supplier bills per minute, it is a metered cost and passes through at cost.
- **Published polls are public data. A tenant's own polling is not.** Polls a campaign commissions are tenant data. They stay in the tenant and never enter the shared corpus.

### Analysis: shared where the data is public, compartmented where it is not

Electoral analysis over published results carries no personal data and no contract, and shares within a country like the capture corpus. Opposition research and self-vetting findings are delivered into the requesting tenant's compartment under [comms-intelligence.md § 8. The doctrine](../spec/comms-intelligence.md#8-the-doctrine). Iterations 4, 5 and 6, their order and their gates are unchanged: no dossier work before the compartmentation primitive, and no opposition research before legal review in each jurisdiction. Electoral analysis is a catalogue entry without a scheduled iteration. When it is built is an open product question, recorded in [comms-intelligence.md § 12. Open questions](../spec/comms-intelligence.md#12-open-questions).

### Builders: text accepted, images and video proposed

Every builder, whatever it produces, works inside the same bounds:

- **A person invokes it with a brief.** Nothing triggers a builder in the background.
- **It reads only what that person hands it:** the brief, the talking points they select, the assets they attach. It has no read path into contacts, voter records, messages, donations or compartments.
- **It returns a draft, never a send.** The draft lands in the tenant marked as generated and enters the approval workflows that already apply to that kind of content ([ADR-016](016-cross-cutting-resolutions.md) #22 for social posts). A builder holds no credential to channel transport. Output reaches a recipient only through a person's send action.
- **It keeps the guardrails of ADR-013:** no facts, statistics or claims that are not in the source material.
- **Its cost is metered.** Inference and generation charges pass through at cost under ADR-019. Under BYOM ([ADR-016](016-cross-cutting-resolutions.md) §38) the tenant's own provider bills the tenant directly, and nothing passes through.

Within these bounds a builder has none of the four properties ADR-018 gates on: its read scope is one brief, it invokes no platform operation, it changes nothing without a person, and its credential is scoped to one service.

**Text builders are accepted.** They are ADR-013's shape extended from supporters to staff: a draft from supplied material, reviewed, edited and approved by a person before anything happens.

**Image and video builders are proposed, not accepted.** They get catalogue entries, and those entries cannot be enabled until ADR-018 is accepted with its item 6, the human-gate principle, answered. The bounds above are necessary for them and not sufficient. Synthetic images and video of identifiable people are the sharpest misuse of generation in an electoral product, and disclosure rules for synthetic political media differ across the target jurisdictions. Two questions are recorded for the review and not decided here: whether a builder may ever depict a real, identifiable person, and what labelling a generated image or video must carry when published.

**Alternatives considered:** Accepting all three builders now was rejected because it would decide the human-gate principle for the highest-risk media before the review that exists to state it. Leaving Builders out of the line-up entirely was rejected because text drafting is the same shape as a feature already accepted, and holding it back would gate something ADR-018 does not gate.

### ADR-016 #25: editing stays external; generation is a separate question

#25 decided against in-platform video *editing* (timeline editors, effects, transitions, music licensing) on grounds of scope. That stands: GreenGrass does not build a video editor. Generating a video from a brief is a different capability with a different cost: a supplier call, not an editor. It is proposed above and gated. Until it is accepted, #25 applies to all video, and campaigns upload finished files. If the video builder is accepted, its output is a finished file that enters the composer exactly as #25 describes: upload, scheduling, caption writing, approval and analytics.

### Channel transport

Nothing about channel transport changes. It is named here as the fourth service so the line-up is complete. Per-message charges from SMS and WhatsApp gateways pass through at cost; self-hosted email is flat cost to GreenGrass and has no metered plane. Mutual suppression runs before every send, as the third layer at [system.md § Cross-channel orchestration engine](../design/architecture/system.md#cross-channel-orchestration-engine). A send is always a person's action or a schedule a person set.

### Housekeeping: amendment banners

This ADR adds an **Amended by** line to [ADR-015](015-product-scope.md) for automated media monitoring and extends the one on [ADR-016](016-cross-cutting-resolutions.md) to cover #25.

## Consequences

**Benefits:**
- The four services on the board map onto one architecture and one roadmap. No new spec document, no parallel plan
- Media monitoring, parked in March with a note to come back, has a specification and a gate
- Text drafting for staff ships on the same terms as a feature already accepted, without waiting for a review it does not need
- The highest-risk generation, images and video of people, waits for the review built to decide it

**Costs:**
- Capture carries ongoing corpus operations and transcription costs that no estimate included before comms intelligence
- A builder that reads only what it is handed produces weaker drafts than one that could read the CRM. That is the price of staying outside the ADR-018 gate, and it is paid on purpose
- Electoral analysis is named and unscheduled, which leaves a catalogue entry without a delivery date

**Constraints:**
- Every service in the line-up is bound by ADR-019: per-tenant execution, nothing retained, metering at cost
- Capture's build is gated on Iteration 0; its sources are published only, never closed messaging
- Iterations 4 to 6 and their gates are unchanged
- No builder has send authority, background triggers, or read access beyond its brief
- Image and video builders cannot be enabled until ADR-018 is accepted with item 6 answered

**Related ADRs:** [ADR-013](013-analytics-ai.md) (the accepted shape text builders extend), [ADR-015](015-product-scope.md) (amended — automated media monitoring moves from deferred to specified), [ADR-016](016-cross-cutting-resolutions.md) (amended — #25 holds for editing, generation proposed; #22 approval applies to builder drafts; §38 BYOM), [ADR-018](018-ai-agent-posture.md) (image and video builders wait on item 6; the gate is unchanged), [ADR-019](019-central-services-and-metered-billing.md) (the model every service in the line-up runs under)
