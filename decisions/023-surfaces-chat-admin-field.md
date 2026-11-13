# ADR-023: Surfaces — a Headless Core, Chat, Admin & Field

**Status:** Proposed
**Date:** 2026-11-13
**Sources:** `spec/pitch.md`, `spec/demo.md`, `design/architecture/system.md`, `design/ux/01-information-architecture/navigation-model.md`, `design/ux/01-information-architecture/screen-inventory.md`, `decisions/005-offline-first-sync.md`, `decisions/018-ai-agent-posture.md`, `decisions/019-central-services-and-metered-billing.md`, `decisions/020-central-service-line-up-and-builders.md`, `decisions/022-core-modules-and-lanes.md`

## Context

The UX corpus draws one application. [navigation-model.md](../design/ux/01-information-architecture/navigation-model.md) organizes every feature into one shell, and [screen-inventory.md](../design/ux/01-information-architecture/screen-inventory.md) catalogues 240 screens inside it.

The new direction is a headless Core ([ADR-022](022-core-modules-and-lanes.md)). Everything the platform does is an API operation first. A chat UI is meant to carry 70 to 80% of daily staff work, an admin UI carries the complex rest, and the field app stays as the offline surface.

The architecture already allows this. [system.md § Public API](../design/architecture/system.md#public-api) commits that the public API is the same API the frontend consumes, with "no private backdoors". That commitment is what makes a headless Core possible: every surface is an API consumer, and none is privileged.

What the architecture does not allow yet is the chat. A chat that does most of the daily work reads across features, holds credentials and invokes operations. That is the agent [ADR-018](018-ai-agent-posture.md) gates. This is the largest consequence of the new direction, and this ADR faces it directly: it records one decision about the gate, and sends one proposal into the review.

This ADR is `Proposed`. One thing in it is decided, and is marked.

### Conflicts this ADR resolves

1. **[ADR-018 § No agent capability reaches production until this ADR is accepted](018-ai-agent-posture.md#no-agent-capability-reaches-production-until-this-adr-is-accepted)** gates exactly the agent a chat-first surface implies. The gate stands. This ADR does not resolve it, and says what waits behind it.
2. **[ADR-005](005-offline-first-sync.md)** makes offline-first operation the basis of field work. Chat needs connectivity and a model call by construction, as ADR-018 already says of every agent-mediated feature.
3. **[navigation-model.md](../design/ux/01-information-architecture/navigation-model.md)** and **[screen-inventory.md](../design/ux/01-information-architecture/screen-inventory.md)** assume every feature exists in one UI for every organization.
4. **[pitch.md](../spec/pitch.md)** and **[demo.md](../spec/demo.md)** show the approval flow on WhatsApp in the prototype and on Telegram in the demonstration, because WhatsApp's business terms bar political parties. Neither names a default channel for the product.

## Decision

### A headless Core and three surfaces

Proposed.

Headless means every surface calls the same public API. A surface is where a person does the work, and there are three.

| Chat (target: 70 to 80% of daily work) | Admin UI | Field app |
|---|---|---|
| Approving content, as in the demonstration | Imports and column mapping | Canvassing |
| Questions: "how many doors yesterday in Carolina?" | Sharing contracts and coalition setup | Voter registration |
| Drafting with a builder | Key ceremonies, BYOK, security settings | Event check-in |
| Notifications and daily briefings | Turf cutting and maps | Poll-watcher results |
| Simple record updates: "mark Ana as volunteer" | Segment building | |
| Media monitor digest | Dedup review at scale | |
| Fundraising totals, RSVP counts | Compliance reports and filings | |
| | The GOTV war room | |
| | Module and connector settings | |

The 70 to 80% figure is staff and candidate work, not field work.

Each module declares in its manifest what it puts on each surface ([ADR-022 § The module contract](022-core-modules-and-lanes.md#the-module-contract)).

**Alternatives considered:** Chat as the only surface was rejected because two of the three things no competitor integrates, the voter file and offline field tools, are not chat-shaped, and the design has to accept that.

### The field app stays, as the offline surface

Proposed, and it reaffirms [ADR-005](005-offline-first-sync.md).

Offline field tools are one of the things no competitor integrates. Chat cannot be the surface for work done without signal. The field app remains the third surface, with the sync engine, the on-device storage and the conflict rules ADR-005 decided. Chat is not used for field work.

### Most of the wireframes survive as the admin UI

Proposed.

Most of the 240 wireframed screens survive as the admin UI. The screen inventory needs re-tagging by surface, not redrawing. Screens whose job moves to chat, such as dashboards read daily, approval queues and notification centres, become secondary in the admin UI. Navigation is built from the modules a client has enabled, since each module contributes its own screens and navigation entries.

The re-tagging is follow-up work. It needs a judgement per screen and is not done here. No wireframe is redrawn by this ADR.

### The ADR-018 gate binds the whole Core

**Decided.** The ADR-018 review applies to the Core, and so to both lanes. Chat is a Core surface, so neither Greengrass nor Basecamp ships it to production before the review is accepted. ADR-018 stays `Proposed`.

- **This is the one place where the lanes are not independent.** [ADR-022 § Two lanes on one infrastructure](022-core-modules-and-lanes.md#two-lanes-on-one-infrastructure) says a lane never waits for the other. Both wait for the review. It is on the critical path for both.
- **What can ship before the review:** the admin UI, the field app, and any module that has none of the four gated properties.
- **Prototypes stay outside the gate,** as [ADR-018 § The review is a precondition on production, not on prototyping](018-ai-agent-posture.md#the-review-is-a-precondition-on-production-not-on-prototyping) already says and [demo.md](../spec/demo.md) relies on: anything that holds no real client records.

**Alternatives considered:** Applying the gate to the political lane only was rejected because the chat is a Core surface, and the Core is the same in both lanes.

### The chat as the person's hands

Proposed, as input to the ADR-018 review. Nothing here is accepted, and this ADR cannot be accepted for the chat surface before ADR-018 is.

The position is that the chat is the person's hands, not a second actor:

- **It acts under the invoking person's own role, scopes and sharing contracts.** A chat user can do nothing they could not do in the admin UI.
- **Every write is confirmed by the person with a tap on a card,** as in the demonstration. Reads need no confirmation; writes always do.
- **It never acts in the background.** A scheduled briefing is a schedule a person set, as [ADR-020 § Channel transport](020-central-service-line-up-and-builders.md#channel-transport) already allows for sends.
- **The audit log records the person as the actor and the chat as the channel.** The demonstration already does this.
- **Modules declare their chat operations in the manifest,** including which ones are writes. The model chooses among declared operations and cannot invent new ones.

That position gives proposed answers to several ADR-018 items: read scope (the person's scope), tool authority (declared operations only), autonomy (none without confirmation) and the audit actor (person plus channel). It does not settle the review. Prompt injection from content the chat reads, such as a monitored article or an inbound message, is still unanswered.

The position is recorded in [ADR-018 § The proposal under review](018-ai-agent-posture.md#the-proposal-under-review), where the review will evaluate it beside the per-tenant harness already held there.

### Cost and channel

Two practical consequences, both open.

- **Cost.** Chat is inference on every turn. Under [ADR-019](019-central-services-and-metered-billing.md) that is a metered cost, or the client's own bill under BYOM. When chat is the main surface, this cost is no longer marginal, and pricing has to account for it ([ADR-026](026-two-lane-pricing.md)).
- **Channel.** The proposal is a default home for the chat inside the product's own app, with Telegram or Signal as options per client. WhatsApp should not be the assumed channel, since its business terms prohibit political party activity ([pitch.md](../spec/pitch.md)).

### Open questions

1. **Is the chat as the person's hands the position to send into the ADR-018 review?** It is recorded there as a proposal either way.
2. **The default chat channel:** in-app first, Telegram or Signal per client, WhatsApp not assumed.
3. **Prompt injection** from content the chat reads. Unanswered, and it belongs to ADR-018's item 1.
4. **The Campaign Agent** as this chat with content modules enabled ([ADR-022 § The module catalogue](022-core-modules-and-lanes.md#the-module-catalogue)). Recommended, not decided.

## Consequences

**Benefits:**
- Staff and candidates work where they already are, and the product does not have to win a place on their home screen
- Every capability exists as an API operation before it exists as a screen, which is what a partner module and a native app both need
- The 240 screens are kept; the work is re-tagging, not redrawing
- The agent question has one concrete position on the table for its largest case

**Costs:**
- The main surface of both products waits for the ADR-018 review
- Inference becomes a cost of ordinary daily work
- Three surfaces have to stay consistent with each other, and the manifest is what keeps them so
- The navigation model and the screen inventory describe one application, and both need a pass before they describe three surfaces

**Constraints:**
- No chat surface reaches production in either lane before ADR-018 is accepted
- The field app works without connectivity ([ADR-005](005-offline-first-sync.md)); no field task may depend on chat
- No surface is a privileged client of the Core: there is no internal-only API
- A chat user can do nothing they could not do in the admin UI
- The position on the chat is a proposal; nothing may be built on it for production

**Related ADRs:** [ADR-005](005-offline-first-sync.md) (the field app remains the offline surface), [ADR-011](011-design-system-ux.md) (the design system the admin UI and field app keep), [ADR-018](018-ai-agent-posture.md) (the gate binds the whole Core; the chat position is sent to its review), [ADR-019](019-central-services-and-metered-billing.md) (inference is a metered cost), [ADR-020](020-central-service-line-up-and-builders.md) (a send is a person's action or a schedule a person set), [ADR-022](022-core-modules-and-lanes.md) (the headless Core; the manifest declares each module's surfaces), [ADR-026](026-two-lane-pricing.md) (the cost of chat in the price)
