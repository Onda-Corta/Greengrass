# ADR-016: Cross-Cutting Resolutions

**Status:** Accepted
**Date:** 2026-03-04
**Sources:** `design/ux/04-wireframes/audit.md` (Appendix A: Consolidated Open Questions)
**Amended by:** [ADR-019](019-central-services-and-metered-billing.md) — §2: a third send-time layer, cross-tenant mutual suppression, runs after the two decided below for a tenant in an alliance whose contract carries the suppression term ([system.md § Cross-channel orchestration engine](../design/architecture/system.md#cross-channel-orchestration-engine)). The two layers decided here are unchanged. [ADR-020](020-central-service-line-up-and-builders.md) — #25: in-platform video editing stays external as decided below; generating video from a brief is a separate capability, proposed and gated on [ADR-018](018-ai-agent-posture.md). Until it is accepted, #25 applies to all video. [ADR-021](021-creator-program-and-content-pipeline.md) — #22: post approval generalizes to a content pipeline that also approves creators' content, routed by tier; the all-posts default stands. #23: versioned assets, the storage core of the Shared Content Library, move forward from v2 because review rounds need them; the rest of the library stays v2.

## Context

The wireframe audit identified 89 open questions across 21 documents. Among these, 2 contradictions and 3 overlap clusters span multiple feature areas and cannot be resolved within a single document. This ADR resolves the cross-cutting concerns first, establishing policies that individual feature-area resolutions build on.

### Contradictions

1. **Settings delegation:** ADR-011 and `settings.md` established "All settings OA-only, no delegation." Open question #52 asks whether specific categories can be delegated to non-OA roles.
2. **Frequency caps vs. cross-channel orchestration:** `communications.md` decided on org-wide frequency caps per channel. Open question #21 asks about preventing same-topic messages across different channels on the same day.

### Overlap clusters

1. **Paid event tickets (#27) + fundraising refunds (#31):** Paid events overlap with the fundraising pipeline. Ticket revenue needs a clear home.
2. **Data retention (#14, #51, #84):** Message retention, GOTV data retention, and import rollback windows were asked independently but share the same underlying policy question.
3. **Cross-channel coordination (#21) + pledge reminder channels (#32):** Both require a cross-channel orchestration model.

---

## Decision

### 1. Settings Delegation — OA-Only for v1

Settings remain OA-only in v1. No delegation mechanism.

**Rationale:** Security-sensitive context demands a single point of responsibility. The existing additive-only overrides pattern (ADR-011) provides the foundation for delegation in a future version. v1 organizations will be small enough that the OA bottleneck is manageable. Adding delegation later is additive; removing it later would break workflows.

**Closes:** Open question #52.

---

### 2. Two-Layer Channel Orchestration

Communications are governed by two complementary mechanisms:

**Layer 1 — Per-channel frequency caps (existing decision)**
Org-wide ceilings on contacts per channel per time period. Example: max 2 emails/week, max 1 SMS/day. Configured by OA in communications settings.

**Layer 2 — Cross-channel quiet window (new)**
After contacting a person on *any* channel about a specific topic, same-topic messages on other channels are suppressed for a configurable window (default: 24 hours). Different topics on different channels are allowed, up to each channel's per-channel cap.

The system enforces both layers at send time. A message that passes the per-channel cap may still be deferred by the cross-channel quiet window.

**Rationale:** Per-channel caps and cross-channel orchestration solve different problems. Caps prevent over-messaging on a single channel. The quiet window prevents the same person from being contacted about the same thing via email, then SMS, then WhatsApp in the same day. Both are needed; neither subsumes the other.

**Closes:** Open questions #21 and #32.

---

### 3. Ticket Revenue Through the Fundraising Pipeline

Paid event tickets are processed through the fundraising pipeline. A ticket purchase is a donation record with event metadata (event ID, ticket type, quantity).

- **Event system** handles: registration, attendance tracking, check-in, capacity
- **Fundraising system** handles: payment processing, receipt generation, compliance tracking, refunds
- **Refund policy** is unified: governed by payment processor policy plus an org-configurable maximum window (default: 90 days)

Event screens display ticket revenue as a metric but link to the fundraising system for financial details. There is no separate payment pipeline for events.

**Rationale:** In most jurisdictions, political event tickets are legally treated as contributions. Separate payment pipelines multiply integration complexity, compliance surface, and reconciliation work. A single pipeline means one set of compliance rules, one receipt generator, one reconciliation workflow.

**Closes:** Open questions #27 and #31.

---

### 4. Tiered Data Retention Policy

Data retention is governed by a unified policy with four tiers. Each tier defines what is stored, how long it is kept, and whether it can be deleted.

#### Tier definitions

| Tier | What is stored | Default retention | Minimum | Maximum | Deletable? |
|------|---------------|-------------------|---------|---------|------------|
| **Operational** | Full content: message bodies, attachments, canvass responses, GOTV operational data, shift logs | 2 years | 90 days | 5 years | Yes, after minimum period |
| **Compliance** | Financial records: donation details, receipts, tax documents, compliance filings | Per local law | 5 years | 10 years | No, until legal minimum expires |
| **Audit trail** | Action metadata only (see below) | Indefinite | — | — | No |
| **Import rollback** | Undo capability for data imports | 30 days | 7 days | 90 days | Auto-expires |

#### Critical distinction: audit trail stores metadata, not content

The audit trail records **that an action happened** — who did what, when, to what entity. It does **not** store the content of the action.

**Example — a message is sent, then purged after the retention window:**

| Tier | What exists before purge | What exists after purge |
|------|------------------------|----------------------|
| Operational | Full message: body, attachments, thread context | **Deleted.** Message body and attachments are gone. |
| Audit trail | Log entry: "Staff A sent SMS to Contact B on 2026-03-04 at 14:32 UTC" | **Preserved.** The log entry remains indefinitely. |

The audit trail is a **skeleton** — it proves actions happened but does not retain their payload. This distinction is critical for three reasons:

1. **Privacy compliance:** When a supporter requests data deletion, their message content is purged from the operational tier. The audit trail retains only the metadata record that communication occurred — no personal content.
2. **Storage:** Indefinite retention of metadata-only records is feasible. Indefinite retention of full message bodies, attachments, and canvass audio recordings is not.
3. **Legal exposure:** If compelled to produce records, the organization hands over metadata (who/what/when) — not full communication content that may have been legitimately purged.

#### Configuration

- The OA configures retention periods within the bounds defined above
- The system enforces minimums — an OA cannot set message retention below 90 days
- Compliance tier minimums are derived from the tenant's configured jurisdiction(s)
- Import rollback windows auto-expire — no manual cleanup needed

**Closes:** Open questions #14, #51, and #84.

---

---

## Category Resolutions

The following sections resolve feature-specific open questions, grouped by category.

### Navigation & Layout (5 questions: #1–#5)

#### #1: Sidebar section collapse persistence → Persist across sessions

Collapsed/expanded state of sidebar sections persists across sessions. Stored in localStorage (works offline), synced to server when connectivity is available so the state follows the user across devices.

Users develop muscle memory for their sidebar layout. Resetting on login forces pointless re-configuration. localStorage is trivial on low-end devices.

#### #2: Detail panel memory → Reset on navigation, restore on browser back/forward

When a user navigates to a different feature area and returns, the detail panel resets to closed. The previous panel context is stale — data may have changed, the user's task has shifted. Closed is the predictable default.

Browser back/forward restores panel state via the History API. That's an explicit "go back to where I was" action and should honor the user's intent.

#### #3: Notification count cap → Cap at 99+

The notification badge caps at "99+". The exact unread count is visible inside the notification drawer.

Numbers above 99 don't change user behavior — they'll open the drawer either way. Large numbers don't fit in a badge cleanly, especially on low-end screens. This follows established convention (iOS, Android, WhatsApp).

#### #4: Dashboard personalization → No for v1

Dashboards use fixed layouts, filtered by role. No rearranging or hiding sections in v1.

The dashboards are already curated per role (candidate gets a simplified view; campaign manager gets operational detail). Personalization adds drag-and-drop state management, per-user sync, and support complexity where every user's dashboard looks different. Revisit in v2 if users request it.

#### #5: Dashboard refresh interval → Tiered by urgency, with mandatory freshness indicator

**Refresh intervals:**

| Dashboard type | Auto-refresh interval | Rationale |
|---------------|----------------------|-----------|
| Operational (GOTV war room, field ops) | 30 seconds | Time-critical during active operations |
| Campaign (fundraising, communications, events) | 5 minutes | Data changes throughout the day, not second-by-second |
| Administrative (compliance, data quality, settings) | 15 minutes | Slow-moving data |
| Candidate | 15 minutes | Curated summary, not operational |

**Refresh behavior:**

- **Manual refresh button is mandatory** on every dashboard. Always visible, always accessible. Users must never have to guess whether they're seeing current data or wait for the next auto-refresh cycle.
- Auto-refresh pauses when the browser tab is not visible (saves bandwidth on low-connectivity networks).
- Immediate refresh on reconnect after an offline period.
- Uses polling, not WebSockets — simpler, degrades gracefully on intermittent connections.

**Data freshness indicator is mandatory** on every dashboard. The dashboard must always communicate the state of its data:

| State | Indicator | Behavior |
|-------|-----------|----------|
| **Current** | Subtle timestamp: "Updated 30s ago" | Low-profile; does not demand attention |
| **Refreshing** | Spinner or progress bar replacing the timestamp | Visible confirmation that new data is loading |
| **Stale** | Warning badge: "Data is 5+ minutes old" with amber styling | Appears when data age exceeds 2× the dashboard's refresh interval |
| **Disconnected** | Persistent banner: "Offline — showing cached data from [timestamp]" with red/amber styling | Cannot be dismissed while disconnected |

On **Operational dashboards** (GOTV war room, field ops), the freshness indicator is high-visibility ambient information — always prominent, not tucked into a corner. Staff making time-sensitive decisions during election day operations must never mistake stale data for current data. The indicator should use color, position, and size to ensure it is noticed without active attention.

On **all other dashboards**, the freshness indicator follows the same state model but can use a more compact presentation (e.g., a timestamp near the page header that transitions to a warning state when stale or disconnected).

### Field Operations (8 questions: #6–#13)

#### #6: Walk list sorting → Route-optimized by default, with Field Director override

Walk lists are sorted by optimized walking route by default (already specified in field-mode.md wireframe). Route optimization means more doors per hour — the primary constraint for volunteers on foot. Priority scoring is better handled at the turf assignment level (give high-priority turfs to your best volunteers) rather than within walk list ordering.

**Override:** The Field Director can toggle a specific walk list to priority-sorted. This is useful for GOTV chase lists where reaching specific people matters more than routing efficiency.

#### #7: Door card skip reasons → 3× Not Home = deprioritize; Refused = immediate stop

| Outcome | Counts toward limit? | Effect |
|---------|:-------------------:|--------|
| Not Home | Yes | After 3×, contact moves to phone/SMS attempt queue and drops from future walk lists |
| Refused | Immediate | 1× = contact marked as refused, removed from all future canvassing for this campaign |
| Come Back Later | No | Re-queued within the same shift or next shift; intentional deferral |

The threshold (default: 3) is configurable by the Field Director per campaign. The system surfaces contacts approaching the limit in the results review (CANV-013) so the Field Director can decide on escalation.

#### #8: Map offline tile size → Assigned turf + 500m buffer at street-level zoom

The system pre-caches map tiles for the volunteer's assigned turf plus a 500m buffer around the turf boundary, at street-level zoom (typically zoom 16–17 in standard tile schemes).

The wireframe already uses a simplified schematic view (not satellite imagery), which reduces tile requirements significantly. The pre-shift check screen validates "Map tiles cached ✓" — volunteers know before leaving whether their maps are ready. If zooming beyond cached area: grey placeholder with "Map not available offline" (already specified in wireframe).

Exact tile area in MB depends on tile provider and region density — this is an implementation detail. The UX contract is: your assigned turf is always available offline.

#### #9: Script versioning in-field → Active shifts are version-locked; urgent updates on next door

When a shift starts, the current script version is loaded and locked for that shift. Volunteers mid-canvass do not have their script change under them.

If the Field Director updates a script mid-day, volunteers already in-field keep their version until their current shift ends.

**Urgent update override:** The Field Director can push an update flagged as "urgent." This appears as a notification on the volunteer's next door card — never during the current interaction. The volunteer sees: "Script updated — tap to review changes before continuing." On new shift start, the latest script version is always loaded.

Script version history is visible to the Field Director in the script builder.

#### #10: Cross-campaign script reuse → Copy-as-template, not linked

"Save as Template" copies a script into a shared template library. Creating a new campaign script offers "Start from template" or "Start blank."

Once copied, the campaign script is independent — editing it does not affect the template or other campaigns. Templates are org-wide; any Field Director can use them.

This is the standard copy-not-link pattern: prevents accidental cross-campaign contamination while enabling reuse.

#### #11: Turf auto-generation constraints → Configurable defaults with mandatory preview

| Constraint | Default | Min | Max | Rationale |
|-----------|---------|-----|-----|-----------|
| Contacts per turf | 50 | 10 | 150 | 50 ≈ a 2-hour canvass shift at ~2.5 min/door |
| Estimated walk time | 2 hours | 30 min | 4 hours | Volunteer fatigue; shift length |
| Buffer between turfs | 0 (no overlap) | — | — | Prevents double-canvassing |

Geographic constraints: don't split turfs across major roads, rivers, or railways. Respect administrative boundaries (wards, precincts) when available. Below 10 contacts, merge with adjacent turf.

Auto-generation always produces a **preview** — the Field Director reviews proposed turfs on the map and adjusts boundaries before committing. No auto-generation result goes live without human approval.

#### #12: Walk list reassignment mid-shift → Yes; completed doors stay, new assignee picks up

Walk lists can be reassigned mid-shift (no-show volunteers, volunteer fatigue, shifting priorities).

- Completed doors remain completed regardless of reassignment
- The new assignee's walk list starts from the first uncompleted door
- If the original volunteer has unsynced data when reassignment happens, it merges on next sync — no data loss
- **Conflict resolution:** if both old and new volunteer canvassed the same door (race condition during reassignment), the system keeps the chronologically latest interaction and flags the conflict for Field Director review in CANV-013

#### #13: Canvassing results data retention → Already resolved (ADR-016 §4)

Individual canvass interaction records (door responses, timestamps, volunteer notes) fall under the operational tier of the tiered data retention policy: default 2 years, configurable 90 days–5 years.

### Messaging & Communications (8 questions: #15–#20, #22–#23)

*Questions #14 and #21 were resolved in the cross-cutting section above.*

#### #15: Message search vs. E2E encryption → Search available only with key escrow

ADR-008 established that orgs can opt into server-side key escrow (disabling E2E encryption). Message search behavior follows directly:

| Encryption mode | Search capability |
|----------------|-------------------|
| E2E encrypted (default) | Metadata only: sender, timestamp, conversation name. Server cannot read content. |
| Key escrow enabled | Full-text search of message content. Server has access via escrow key. |
| Both modes | Client-side local search of messages already cached on the device. |

The UI makes this tradeoff explicit. E2E conversations show "Search limited to message metadata" with a brief explanation of why. This is not a limitation to fix — it's a direct consequence of the security model the org chose.

#### #16: Read receipts → Opt-out per user, visible by default

Read receipts are on by default (standard messaging convention). Any user can disable them in profile settings. Disabling is symmetric: it hides the user's read status from senders *and* hides other people's read status from that user.

In group conversations, read receipts show as a subtle count ("Read by 4") rather than listing individual names, to avoid social pressure dynamics.

**Security consideration:** In duress mode, read receipts are automatically disabled to prevent activity tracking.

#### #17: Email builder conditional content → No for v1; merge fields only

Conditional content blocks (show paragraph A if donor, paragraph B if volunteer) require conditional logic UI, per-variant preview, and a testing matrix. This is significant builder complexity.

v1 supports: merge fields (`{{first_name}}`, `{{org_name}}`) and segment-based sends (send different campaigns to different segments). This covers the large majority of personalization needs without conditional logic in the template itself. Conditional content blocks can be added to the email builder in a future version.

#### #18: WhatsApp template approval status → Yes, visible in composer

WhatsApp Business API requires pre-approved message templates. The composer shows template approval status inline:

| Status | Display | Behavior |
|--------|---------|----------|
| Approved | Green badge | Ready to send |
| Pending | Amber badge | Cannot send; shows estimated review time |
| Rejected | Red badge with reason | Cannot send; shows Meta's rejection reason and edit link |

This prevents the frustrating workflow of composing a message, hitting send, and discovering it was rejected by Meta.

#### #19: SMS A/B testing → Defer to v2

SMS messages are shorter and more expensive than email. Campaign SMS lists in the target context (global south grassroots) are typically smaller than email lists. A/B testing requires statistical significance — with smaller audiences and higher per-message cost, the math rarely works.

Focus A/B testing on email (COMM-008) where volumes support it. SMS A/B testing can be revisited if tenant SMS volumes grow to support it.

#### #20: Drip sequence builder → Simple linear rules for v1; visual flow builder is a v2 tentpole

v1 drip sequences use a linear rule format:

```
Trigger event → wait N days → send message → wait N days → send message
```

No branching logic. Linear sequences cover the core use cases: welcome series, pledge reminders, event follow-ups.

**v2 tentpole feature: Visual Flow Builder.** A node-graph flow builder with branching logic (if opened → path A, if not → path B), visual drag-and-drop, and multi-channel orchestration within a single flow. This is a flagship v2 capability — it takes the communications system from sending one message at a time to running branching, multi-channel sequences. It should be designed and scoped as a major feature, not bolted on incrementally.

#### #22: Social post approval workflow → Configurable; default all posts

In a political campaign context, any social media post can become a crisis. Default: all posts require approval before publishing. The OA can relax this to "only flagged posts" if the org has established trust with its social media staff.

The approval screen shows the post as it will appear on each platform (side-by-side preview, already designed in SOCIAL-003).

#### #23: Content library → File upload for v1; shared asset library is a v2 tentpole

v1: each campaign/post has direct file upload. A "recent uploads" panel shows the last 20 files uploaded across the org, providing lightweight reuse without dedicated asset management.

**v2 tentpole feature: Shared Content Library.** A centralized asset management system with tagging, search, usage tracking, rights management, brand-approved asset collections, and cross-feature reuse (an image uploaded for a social post is findable when building an email campaign or event page). Like the visual flow builder, this is a flagship v2 capability that should be designed as one system, not as an afterthought.

### Social Media (2 questions: #24–#25)

#### #24: Cross-posting analytics → 1 post with per-platform breakdown

The mental model established in SOCIAL-001 is "one message, multiple channels." Analytics mirror this: a single cross-posted item shows aggregate reach/engagement at the top, with a per-platform breakdown below (impressions, clicks, engagement by platform). This reinforces the composer's unified model and lets comms staff compare platform performance for the same content.

#### #25: TikTok video creation → External only; upload finished videos

In-platform video editing is massive scope — timeline editors, effects, transitions, music licensing. TikTok content creation is best done in TikTok's own tools or dedicated video apps. GreenGrass handles: upload, scheduling, caption writing, approval workflow, and analytics. The composer accepts video file upload and shows a preview thumbnail.

### Events (4 questions: #26, #28–#30)

*Question #27 was resolved in the cross-cutting section above.*

#### #26: Multi-day events → Single event with multiple date slots

A multi-day conference or training is conceptually one event — one registration, one attendee list, one post-event survey. The event detail screen (EVT-002) supports multiple date/time slots within a single event record. Each slot can have its own location, capacity, and check-in list. This avoids fragmenting attendee data across linked events and matches how organizers think about multi-day gatherings.

#### #28: Recurring events → Auto-create instances with edit/cancel-one-or-all

When creating a recurring event (weekly canvass training, monthly town hall), the system auto-generates instances based on the recurrence rule. Each instance has its own attendee list and check-in data.

**Editing** an instance offers: "Edit this event only" or "Edit this and all future events" — the standard calendar pattern.

**Cancelling** an instance offers the same pattern: "Cancel this event only" or "Cancel this and all future events." Cancelling one instance does not affect others. Cancelled instances remain visible in the calendar (greyed out, marked "Cancelled") so staff can see what was planned. Attendees who had RSVPed to a cancelled instance receive a cancellation notification.

#### #29: In-event broadcast → Staff-only via app; attendees via SMS

In-event broadcasts serve two distinct audiences with different channels:

**Staff broadcast (in-app):** During an event, Event Managers can send a push notification to all event staff (e.g., "Move check-in to Door 2," "Speaker running 15 min late"). This uses the existing notification system — one-way announcement, not a conversation. Available only to staff with the Event Manager role.

**Attendee broadcast (SMS):** Most attendees will not have the app installed. For attendee-facing announcements (e.g., "Session 2 moved to Room B"), Event Managers can send an SMS to all checked-in attendees who provided a phone number at registration or RSVP. This uses the communications system's SMS capability, subject to the org's SMS consent model. Limited to checked-in attendees to prevent messaging no-shows.

The event detail screen provides two distinct broadcast actions: "Notify Staff" (in-app) and "Message Attendees" (SMS), making the audience and channel explicit.

<!-- REVISIT: the heading says last-write-wins but the body says the earliest timestamp
wins. These are opposite rules. -->

#### #30: Multi-staff offline check-in → Last-write-wins with duplicate detection

When multiple staff check in attendees offline simultaneously (large venue, multiple entry points), each device maintains its own check-in list. On sync, the system merges: if two devices checked in the same person, the earliest timestamp wins and the duplicate is logged. No attendee appears double-checked-in.

The check-in screen shows a sync status indicator (following the dashboard freshness pattern from #5) so staff know whether they're seeing the full picture or working from a local-only view.

### Fundraising (4 questions: #33–#36)

*Questions #31 and #32 were resolved in the cross-cutting section above.*

#### #33: Cash photo requirements → Required above configurable threshold (default $100 USD equivalent)

Below threshold: photo optional but encouraged. Above threshold: camera capture mandatory before the cash donation record can be saved. The photo is attached to the donation record for audit trail purposes.

The threshold is org-configurable (default: equivalent of $100 USD in local currency). This balances audit rigor with field friction — small donations (market stall collections, door-to-door) shouldn't require fumbling with a camera, but larger cash amounts need documentation.

#### #34: A/B test variant count → 2 variants for v1

A/B only (not A/B/C/D). Two variants are sufficient for most fundraising page tests (different headlines, different ask amounts, different images). More variants require larger audiences for statistical significance — the same math problem as SMS A/B testing (#19). The test results screen (already designed as separate from setup per design decision) shows a clean head-to-head comparison. Support for additional variants can be added later without changing the data model.

#### #35: Alliance split dispute resolution → Escalation to alliance lead + configurable timeout

If a member org rejects a proposed fundraising split, the rejection includes a required reason. The alliance lead (or committee, per the governance model from alliance.md) receives the rejection and mediates.

If no resolution within a configurable timeout (default: 14 days), the split reverts to the alliance's default split ratio. No formal arbitration system — that's organizational governance, not software.

#### #36: Dashboard data freshness for fundraising → Covered by #5

Fundraising dashboards fall under the "Campaign" tier from #5: 5-minute auto-refresh, mandatory freshness indicator, manual refresh button. During active fundraising pushes (e.g., end-of-quarter deadline), the Campaign Manager uses the manual refresh button for on-demand totals.

### Activism (5 questions: #37–#41)

#### #37: Multi-target campaigns → Yes; one campaign, multiple targets, one letter per target

A campaign like "Tell your representatives to vote for X" may target multiple legislators. The supporter sees a single action page. The system generates a unique AI message for each target (using the generation model already designed in ACT-005). The supporter reviews and approves each letter before sending.

The campaign dashboard shows per-target response rates so staff can see which targets are receiving the most constituent pressure.

#### #38: AI model choice → Bring Your Own Model (BYOM), provider-agnostic

Organizations increasingly have their own AI environments — enterprise agreements, compliance constraints on data residency, models fine-tuned on their messaging and tone, context from their broader workflows. The platform should plug into that existing infrastructure, not replace it.

- **BYOM configuration:** The OA configures their AI provider in settings, following the same pattern as BYOK for encryption. The org provides an API endpoint and credentials. The platform's AI features (message generation, concierge, etc.) route through the org's configured provider.
- **Platform default:** Orgs without their own AI infrastructure get a platform-managed model. This ensures all AI features work out of the box for smaller orgs.
- **Provider-agnostic interface:** The platform defines what it needs from the model (text generation with language support), not which specific model it is. An abstraction layer handles provider-specific API differences.
- **Continuity of context:** Using the org's own AI environment means the models that staff use in their other work — with their tone, terminology, and institutional context — are the same models powering GreenGrass features.

This connects to the existing BYOK pattern: orgs that care about controlling their infrastructure can do so; orgs that don't get sensible defaults.

#### #39: Printable letters → Yes; "Download as PDF" on the supporter action page

Some targets (local government offices, regulatory bodies) accept physical letters. After the supporter approves their AI-generated message, they can either send via email or download a formatted PDF for printing and mailing. The PDF includes the target's mailing address, a formatted letter body, and the supporter's name.

This is a low-cost addition — it's the same content rendered to a different output format.

#### #40: Comment submission verification → Manual verification by staff + delivery tracking

Before launching a regulatory comment campaign, staff must verify the submission endpoint (email address or web form URL) and mark it as verified in the campaign setup. The system does not auto-verify — regulatory submission processes vary too widely across jurisdictions.

After supporters submit, the campaign tracks delivery status: Sent, Delivered (email delivery confirmation), Bounced. Bounced submissions are flagged for staff review. No guarantee of acceptance by the regulatory body — that is outside the platform's control.

#### #41: Supporter identity verification → Optional per campaign; default self-reported

Some campaigns require constituency validation (only constituents of District 5 should write to the District 5 representative). The campaign creator can enable constituency verification, which adds an address or postal code field to the action page and validates against the target's constituency boundaries.

Default: off (self-reported name and email only), because every additional field reduces participation. When enabled, the system is transparent: "We verify your address to ensure your message reaches the correct representative."

---

## v2 Tentpole Features

Features explicitly deferred from v1 and designated as major v2 capabilities:

| Feature | Source | Description |
|---------|--------|-------------|
| **Visual Flow Builder** | #20 | Node-graph drip sequence builder with branching logic, multi-channel orchestration, drag-and-drop |
| **Shared Content Library** | #23 | Centralized asset management with tagging, search, usage tracking, rights management, cross-feature reuse |
| **Settings Delegation** | #52 | Controlled delegation of low-risk settings categories to non-OA roles |

<!-- REVISIT: this table lists three v2 tentpole features; the corresponding line in
Consequences lists four, adding Public Page A/B Testing. -->

### Press & Media (5 questions: #42–#46)

#### #42: Embargo enforcement → Trust-based tracking with audit trail

Technical enforcement (blocking access before embargo time) is fragile — the content has already been shared with journalists via email. The platform tracks: which journalists received embargoed material, when, and whether the embargo was honored.

The press release screen shows embargo status (Active / Lifted / Broken) and a journalist-by-journalist timeline. If a journalist breaks an embargo, staff can flag it on their contact record — this informs future decisions about who gets early access. The system is a tracking tool, not a DRM system.

#### #43: Crisis communications → Urgent flag with streamlined workflow, not a separate mode

A dedicated "crisis mode" implies a binary state that must be entered and exited — adding ceremony when speed matters most. Instead: any press release or statement can be flagged "Urgent," which:

- Triggers a streamlined approval workflow (fewer required approvers, shorter timeouts)
- Pushes it to the top of the comms team's queue
- Sends immediate notification to designated crisis contacts

The statement builder (already designed as streamlined per design decision) is the crisis tool. It doesn't need a separate mode.

#### #44: Coverage sentiment → Manual only for v1

Automated sentiment analysis of headlines requires NLP that performs poorly on multilingual global south media (limited training data, cultural context, sarcasm). Manual sentiment tagging (Positive / Neutral / Negative / Mixed) by press staff who actually read the coverage is more accurate.

The coverage log screen shows a sentiment distribution chart. Auto-suggest can be explored in a future version if the BYOM AI infrastructure (#38) makes multilingual sentiment feasible.

#### #45: Public endorsement display → Three locations

1. **Endorsement pipeline Kanban (PRESS-011)** — the management view for press staff tracking endorsement status
2. **Candidate dashboard (DASH-002)** — a summary count and recent endorsements card, since endorsements are high-impact metrics for candidates
3. **Public endorsement page (PUB-004 or dedicated section)** — a public-facing list, optionally gated by the OA, for press kits and supporter-facing communications

#### #46: Multi-language press releases → Single release with language variants

One press release record with multiple language versions, managed as tabs within the press release editor (PRESS-003). All language variants share the same embargo, distribution list, and metadata. Each variant can have its own journalist distribution sublist (francophone journalists get the French version).

This keeps the press release as a single logical entity while supporting multilingual distribution.

### GOTV & Election Day (4 questions: #47–#50)

*Question #51 was resolved in the cross-cutting section above.*

#### #47: Official election data feeds → Abstraction layer with manual fallback

Electoral authority APIs vary wildly by country and are often nonexistent in the global south. The platform defines a standard election data schema (polling locations, candidate lists, district boundaries, results) and provides two ingestion paths:

1. **API connector** for jurisdictions that offer machine-readable feeds, configured per-tenant
2. **Manual import** via CSV/spreadsheet for everywhere else

No specific electoral authority integration is promised in v1. The value is the standard schema and the manual import workflow. API connectors can be added per-jurisdiction as demand warrants.

#### #48: Alliance ride sharing → Yes, opt-in per alliance

Alliance members can contribute drivers to a shared pool for election day rides-to-polls. The alliance lead enables this in GOTV settings.

- Each member org's drivers remain visible to that org
- Ride requests can be routed to any available driver in the shared pool
- **Driver assignment priority:** same-org first, then alliance pool
- Each org sees only rides fulfilled by their own drivers in their own reporting
- The alliance dashboard shows aggregate metrics

#### #49: Reallocation algorithm → Rule-based for v1

The reallocation suggestions (already governed by human-in-the-loop per design decision) use simple rules: if a polling location's volunteer coverage drops below a configurable threshold, suggest reallocation from over-staffed locations.

Rules are transparent and auditable — staff can see exactly why a suggestion was made. Predictive models (ML-based turnout prediction, optimal allocation) require training data that doesn't exist for most global south elections. Rule-based is correct for v1; predictive can be explored via the BYOM infrastructure (#38) in future versions.

#### #50: Results entry security → Multi-layer verification without blocking speed

| Layer | Mechanism | Purpose |
|-------|-----------|---------|
| Identity | Only registered poll watchers (GOTV-012) can submit results | Prevents anonymous submissions |
| Geolocation | Optional GPS stamp on submission (watcher must be near polling location) | Deters remote fabrication; optional because GPS may be unavailable indoors |
| Photo evidence | Camera capture of official results board/tally sheet attached to submission | Primary verification artifact |
| Cross-check | Side-by-side comparison when multiple watchers submit from same location | Flags discrepancies for war room review |
| Audit trail | All submissions immutable with timestamp, submitter ID, device info | Non-deletable per retention policy |

No single layer is blocking — a poll watcher with no GPS signal can still submit. But the layers compound: a fraudulent entry would need a registered watcher, at the right location, with a convincing photo, that matches other watchers' submissions. The war room dashboard highlights discrepancies for human review.

### Settings & Administration (4 questions: #53–#56)

*Question #52 was resolved in the cross-cutting section above.*

#### #53: Two-OA approval → Yes, for destructive operations only

Destructive operations require confirmation from a second OA:

- Deleting the organization
- Revoking all API keys
- Changing the security tier downward
- Removing the last integration of a critical type (payment processor, SMS provider)

Routine settings changes (updating org name, adjusting frequency caps, editing role templates) do not require two-OA approval.

**Single-OA fallback:** If the org has only one OA, destructive operations require a 48-hour cooling-off period with email confirmation instead. This prevents accidental or coerced catastrophic changes without adding friction to daily administration.

#### #54: Settings import/export → Export-only for v1

OAs can export their settings as a JSON snapshot for documentation, backup, or sharing with consultants.

Cross-tenant import (apply Org A's settings to Org B) is deferred — it requires validating that the target tenant has the same integrations, payment processors, and compliance jurisdiction. A settings snapshot is useful as a reference even without automated import.

#### #55: API rate limits → Plan-level defaults with per-key overrides

Each pricing plan defines default rate limits. OAs can adjust limits per API key within the plan's ceiling — e.g., give the voter file sync key a higher limit than the reporting key.

The API settings screen (SET-017) shows current usage against limits per key. Rate limit headers are included in all API responses per standard convention (`X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`).

#### #56: Integration health monitoring → Proactive health checks with alert escalation

The integration hub (SET-012) shows real-time status per integration: Connected (green), Degraded (amber), Failed (red). The system runs periodic health checks (API ping, token validity, last successful sync timestamp).

**Alert escalation:**

1. In-app notification to OA after first failure
2. Email alert after 3 consecutive failures
3. Dashboard warning banner if a critical integration (payment processor, SMS provider) is down

The integration detail screen shows a health timeline (last 30 days) so the OA can distinguish intermittent issues from sustained failures.

### Authentication & Security (4 questions: #57–#60)

#### #57: Passkey sync → Allow cloud-synced passkeys

Device-bound-only passkeys (hardware security keys) are more secure but create a severe usability problem: lose your phone, lose access. In the target context (global south, low-end devices, devices shared within families), device loss and replacement is common.

Cloud-synced passkeys (iCloud Keychain, Google Password Manager) provide the phishing resistance of WebAuthn with practical recoverability. The security tier setting can restrict to device-bound only for orgs at Maximum security tier.

#### #58: TOTP fallback → Yes, opt-in at Enhanced and Maximum security tiers

Passkey authentication requires a brief network round-trip. In areas with intermittent connectivity, this can fail. TOTP (Google Authenticator, etc.) works entirely offline after initial setup.

OAs at Enhanced or Maximum security tier can enable TOTP as a fallback authentication method. Standard tier relies on passkey + trusted contact recovery only (simpler setup for smaller orgs).

#### #59: OA recovery with no trusted contacts → Platform-assisted with identity verification

This is the "bootstrap problem" — the first OA has no peers to vouch for them.

**Resolution:** The OA contacts GreenGrass support, who verify identity through the original org registration channel (email used at signup, payment method on file). After verification, support initiates a **72-hour cooling-off recovery** (longer than the standard 24-hour because there is no peer verification). During cooling-off, all org email contacts receive a notification.

This is intentionally slow and visible — it's the highest-risk recovery path.

#### #60: Low-end device passkey support → Android 9+ / iOS 16+ / Chrome 109+

This covers the large majority of devices in active use in the global south (Android 9 is from 2018). Devices below this threshold fall back to magic link authentication (email-based, no WebAuthn).

The login screen auto-detects WebAuthn support and shows the appropriate flow — no user decision needed.

### User Profile (3 questions: #61–#63)

#### #61: Profile photo privacy → Internal-only by default

Profile photos appear in internal messaging, staff directories, and assignment screens. They are not shown in supporter-facing contexts (portal, emails, public pages) unless the staff member explicitly enables "Show my photo to supporters" in profile settings.

Default: off. This protects staff identity in security-sensitive contexts.

#### #62: Notification sounds → OS default only

Custom notification sounds require audio file management, per-device sync, and add no meaningful value. The platform uses the device's default notification sound. Users who want custom sounds can configure them at the OS level for the GreenGrass app.

Profile settings offer: sounds on/off, vibration on/off.

#### #63: Multi-tenant notifications → Yes, with org badge; configurable per org

Staff who work with multiple organizations (consultants, alliance coordinators) need to see notifications from non-active orgs — otherwise they'd miss time-sensitive messages.

Each notification shows an org badge (org avatar + name). Users can mute notifications per org in profile settings. Active org notifications are always shown; non-active org notifications are grouped in a separate section of the notification drawer.

### Support & Help (4 questions: #64–#67)

#### #64: AI concierge language → Detect from question, default to configured

If the user types in French, respond in French — even if their profile language is English. Language detection provides a more natural experience for multilingual users who switch between languages.

If detection confidence is low (very short query, mixed languages), fall back to the user's configured profile language. The concierge always offers "Switch to [configured language]" as a quick action.

#### #65: Training completion gating → Yes, for safety-critical training only

The OA marks specific training modules as "required before field deployment" (e.g., security protocols, de-escalation, voter interaction guidelines). Volunteers who haven't completed required modules cannot be assigned to shifts — the assignment screen shows "Training incomplete" with a link to the outstanding module.

Non-required training (platform tutorials, best practices) is encouraged but not gated.

#### #66: External content in knowledge base → Yes, with clear visual distinction

Knowledge base articles can link to external resources (partner org guides, government election authority pages, third-party training videos). External links are visually distinct (icon + "External link" label) and open in a new tab.

The help system does not embed or cache external content — it's a link, not a mirror. This prevents stale cached copies while letting orgs curate resources beyond what's in the platform KB.

#### #67: AI hallucination prevention → KB-grounded with explicit "I don't know"

The AI concierge is grounded strictly in the org's knowledge base and GreenGrass platform documentation. If a question can't be answered from these sources, the concierge says "I don't have information about that" and offers to connect the user with support or search the KB.

No broader reasoning or external knowledge. This is a political platform — a hallucinated answer about election law or compliance could have real consequences.

### Public Pages (4 questions: #68–#71)

#### #68: Custom domains → Yes, v1

Orgs can map a custom domain (e.g., `join.partyname.org`) to their public pages. The platform handles SSL certificate provisioning (Let's Encrypt). Configuration in SET-012 (integrations). Default: pages served under a GreenGrass subdomain (`partyname.greengrass.app`).

Custom domains are critical for brand credibility — supporters clicking a donation link need to see the org's domain, not the platform's.

#### #69: Page analytics → Built-in lightweight analytics; no third-party tracking

Public pages track: views, unique visitors, conversion rate (form submissions / views), referral source (UTM parameters). Displayed on the public pages dashboard.

No third-party analytics (Google Analytics, Meta Pixel) in v1 — these raise privacy concerns and add cookie consent complexity in GDPR/LGPD jurisdictions. OAs who need deeper analytics can add external scripts via a custom code injection field (advanced setting, off by default).

#### #70: Volunteer signup A/B testing → Defer to v2

A/B testing on public pages requires traffic splitting, variant serving, and statistical analysis. The fundraising A/B testing infrastructure (#34) is scoped to donation pages. Extending it to volunteer signup pages is additive work. For v1, orgs manually iterate on their signup page copy. When the A/B testing infrastructure matures, extending it to public pages is straightforward.

#### #71: Open Graph images → Auto-generated with manual override

The platform auto-generates OG images from the page title + org logo + brand colors (simple template composition, not AI). OAs can override with a manually uploaded image per page.

Auto-generation ensures every shared link has a preview image (critical for social media sharing) without requiring design effort for every page.

### Onboarding (3 questions: #72–#74)

#### #72: Wizard skip behavior → Required core (3 steps), optional extensions

Three steps are unskippable: org name + admin account + security tier selection. The platform can't function without them.

All other wizard steps (payment processor, compliance config, WhatsApp, SMS, voter file import) show a "Skip for now" option that adds them to the post-wizard checklist.

**Minimum viable path:** 3 steps to a working org with basic features, then progressive setup via checklist.

#### #73: Wizard resume → Yes, auto-save after each completed step

If the wizard is abandoned (browser closed, session timeout), the next login resumes from the last completed step. Completed steps show as done with a checkmark; the current step is pre-populated with any entered data. No data loss on abandonment. The wizard state persists until the wizard is completed or the OA explicitly restarts it.

#### #74: Post-wizard checklist → Persistent until required items complete, then dismissible

The checklist shows on the dashboard after the wizard. Required items (those skipped during the wizard) cannot be individually dismissed — the checklist stays until they're done. Optional items ("Invite your first team member," "Create your first event") can be individually dismissed.

Once all required items are complete, the entire checklist becomes dismissible with a "Got it, hide checklist" action.

### Supporter Portal (3 questions: #75–#77)

#### #75: Authentication tiers → Already decided (magic link + full account)

Magic link for basic access (view donation history, download receipts). Full account (with passkey) for management actions (update payment method, change communication preferences). This was recorded in the supporter-portal.md design decisions table. Confirmed here as canonical.

#### #76: Portal branding → Logo, colors, and content; not layout

The supporter portal uses the org's logo, primary/secondary brand colors, and custom welcome text. The layout, navigation structure, and component design are fixed (platform-controlled).

This ensures consistent UX across orgs while giving each org brand identity. CSS-level customization (custom fonts, layout overrides) is not supported — it creates support burden and breaks accessibility guarantees.

#### #77: Mobile portal → Responsive web, not a separate app

The supporter portal is a responsive web application that works on phone browsers. No native app for supporters — the install barrier would kill adoption. The portal is already designed mobile-first (per the public pages design decision).

PWA capabilities (add to home screen, offline receipt viewing) can be added incrementally without requiring an app store presence.

### Alliance (5 questions: #78–#82)

#### #78: Cross-alliance data visibility → Contact existence shared; interaction details private

**Shared by default:** Contact existence (prevents duplicate outreach) and aggregate campaign metrics (total doors knocked, total raised).

**Private by default:** Individual interaction records, internal notes, supporter communication history.

The alliance sharing configuration screen (already designed with by-category and by-org views) controls these boundaries. OAs can loosen sharing per category.

#### #79: Alliance hierarchy → Flat for v1

An alliance is a single-level group of member orgs. No sub-alliances, no nested hierarchies. Hierarchical alliances add significant complexity to governance, data sharing rules, and dashboard aggregation.

Flat alliances cover the primary use case: coalition partners coordinating for an election. If sub-alliances are needed, they can be modeled as separate alliances with overlapping membership.

#### #80: Joint campaign data ownership → Lead org retains; members keep their own data

When a joint campaign ends:

- The **lead org** (or committee, per governance model) retains the joint campaign record, aggregate results, and shared assets
- Each **member org** retains full access to interactions their own volunteers conducted and contacts they brought into the campaign
- **Shared contacts** (contacted by multiple orgs) remain in each org's CRM independently — no forced deduplication across org boundaries

No member org loses access to data their people generated.

#### #81: Alliance dashboard permissions → Aggregate only; per-member opt-in

The alliance dashboard shows aggregate metrics (total doors, total raised, total events) across all members. Individual member performance is visible only to the alliance lead and to each member for their own data.

The alliance lead can enable per-member visibility if all members consent (configured in alliance settings, requires opt-in from each member OA).

#### #82: Affiliation request SLA → 30-day timeout with reminders

An affiliation request that goes unanswered for 30 days auto-expires. The system sends reminders at 7, 14, and 21 days to the target org's OA. After expiry, the requesting org can re-send. No auto-approval — silence means no.

The requesting org sees request status (Pending / Accepted / Declined / Expired) in their alliance screen.

### CRM & Data (4 questions: #83, #85–#87)

*Question #84 was resolved in the cross-cutting section above.*

#### #83: Dedup confidence threshold → Three tiers by match confidence

| Confidence | Action | Example |
|-----------|--------|---------|
| 95%+ (exact) | Auto-merge with audit log | Same email address, same phone number |
| 70–94% (likely) | Surface in dedup review queue for manual merge | Similar name + same postal code |
| Below 70% | Ignore unless manually searched | Same last name only |

Thresholds are org-configurable. The dedup review screen (already designed as side-by-side comparison) handles the manual review tier. Auto-merged records are logged in the audit trail with the match reason, and can be unmerged within the import rollback window.

#### #85: Segment refresh → On access + daily background refresh

Dynamic segments recalculate when a user views the segment (ensuring current data) and once daily in a background job (ensuring campaign targeting is fresh).

The segment list shows "Last refreshed: [timestamp]" per segment. Large segments (50k+ contacts) may take seconds to recalculate — the UI shows a loading state rather than stale data. Manual refresh is available via a refresh button on the segment detail screen.

#### #86: Data export audit → Reason required for bulk exports (100+ records)

Exporting more than 100 records requires the user to select a reason from a predefined list: Compliance reporting / Campaign operations / Data migration / Alliance sharing / Other + free text. The reason is logged in the audit trail alongside the export metadata (who, when, how many records, which fields).

Individual record views and small exports (<100 records) do not require a reason — that would add friction to normal CRM usage.

#### #87: Tag taxonomy → Flat with optional prefix convention

Tags are flat strings. No enforced hierarchy, no parent-child relationships. Orgs that want hierarchy use a naming convention: `region:north`, `region:south`, `issue:education`, `issue:healthcare`.

The tag picker supports prefix filtering (type "region:" to see all region tags). This gives the flexibility of hierarchy without the complexity of a tree data structure.

### Cross-Cutting (2 questions: #88–#89)

#### #88: Dashboards real-time vs. polling → Polling for v1 (covered by #5)

All dashboards use polling at tiered intervals (30s–15min per dashboard type). WebSockets add infrastructure complexity (connection management, reconnection logic, load balancer configuration) without proportional UX benefit given the refresh intervals.

The mandatory freshness indicator (#5) makes the polling model transparent to users. WebSockets can be evaluated for v2 if operational dashboards need sub-second updates.

#### #89: Dashboard widget library → Fixed widget vocabulary for v1

All dashboards draw from a standard set of widget types:

- Metric card (single number + trend)
- Bar chart
- Line chart
- Table
- Map
- Status list
- Progress bar
- Alert banner

No custom widget builder or user-defined visualizations. This ensures visual consistency, simplifies implementation, and keeps dashboards predictable. The widget set can be extended as dashboard needs mature.

---

## Consequences

- **All 89 open questions resolved**
- **Both contradictions resolved:** settings delegation deferred; frequency caps and cross-channel orchestration made complementary
- **New system capabilities required:**
  - Cross-channel quiet window (Layer 2 orchestration)
  - Dashboard freshness indicator component
  - Script template library
  - WhatsApp template approval status display in composer
  - BYOM (Bring Your Own Model) AI provider abstraction layer and settings screen
  - PDF letter generation for activism campaigns
  - Standard election data schema with API connector + CSV import paths
  - Multi-layer results entry verification (identity, geolocation, photo, cross-check)
  - Two-OA approval flow for destructive settings operations
  - Integration health monitoring with alert escalation
  - Platform-assisted OA recovery path (72-hour cooling-off)
  - Training completion gating for shift assignment
  - Custom domain support with SSL provisioning
  - Auto-generated Open Graph images
  - Three-tier dedup confidence engine (auto-merge / review queue / ignore)
- **v2 tentpole features identified:** Visual Flow Builder, Shared Content Library, Settings Delegation, Public Page A/B Testing
- **Event + fundraising integration tightened:** implementation must support donation records with event metadata
- **Data retention is a platform-level concern:** must be implemented as infrastructure, not per-feature
- **No open questions remain.** The wireframe audit's Appendix A is fully resolved. All resolutions are recorded in this ADR with traceable section references.
