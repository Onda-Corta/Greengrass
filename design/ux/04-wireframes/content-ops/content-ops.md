# Content Operations Wireframes

## Purpose

A campaign's reach now lives largely on other people's accounts: militants, spokespeople, candidates and independent influencers who publish to their own audiences. These wireframes cover the creator program specified at [press.md § Creator Program](../../../../spec/press.md#creator-program): the creator roster, the inbound inbox, multi-round and simple review, dispatch of briefs and posts to publish, per-creator tracking, and staff-only engagement.

The core UX challenge: the program runs on WhatsApp, at the speed of a conversation, but everything it produces is political communication that needs approval and a disclaimer before it goes public. The screens have to keep review fast for tier A creators, bulk-friendly for tier D, and honest about WhatsApp's 24-hour conversation window rather than pretending it is open chat.

Creators are Contact records with creator fields, exactly as journalists are Contact records with press fields ([ADR-021](../../../../decisions/021-creator-program-and-content-pipeline.md)). The creator screens extend the CRM contact screens the way PRESS-001 and PRESS-002 do.

### Source and what changed

These screens are redrawn from a 21-screen lo-fi prototype (17 desktop, 4 mobile) built for a commercial creator program. The redraw uses political sample data and the design system's patterns, and it departs from the source in five places:

- **Mobile variants are folded into their desktop screens**, as in every other wireframe document. The four mobile screens appear as Mobile sections of CONTENT-001, 003, 004 and 006.
- **Team & Roles and Notifications are not new screens.** The Editor, Approver and Creator Manager role templates are managed in SET-002, SET-004 and SET-005; program notifications use the notification drawer in `navigation-shell/navigation-shell.md` and the rules in `02-global-patterns/notification-patterns.md`.
- **The three AI screens are not drawn.** Strategic-fit scoring on arrival, the AI analysis panel and generated production instructions are held for the [ADR-018](../../../../decisions/018-ai-agent-posture.md) review as its worked example. The inbox here has no fit badges.
- **The engagement leaderboard is not ranked.** CONTENT-011 is staff-only and shows no rank, position or badge ([ADR-015](../../../../decisions/015-product-scope.md)).
- **Dispatch shows WhatsApp's conversation window.** Recipients outside the 24-hour window receive a template first ([integrations.md § WhatsApp Business API](../../../../spec/integrations.md#whatsapp-business-api)).

## Scope

| ID | Screen | Personas | Offline | Mobile | Section |
|----|--------|----------|---------|--------|---------|
| CONTENT-001 | Content Operations Dashboard | OA, CD | No | Yes | Overview |
| CONTENT-002 | Creator List | OA, CD | No | Desktop | Creators |
| CONTENT-003 | Creator Profile | OA, CD | No | Yes | Creators |
| CONTENT-004 | Inbound Inbox | OA, CD | No | Yes | Pipeline |
| CONTENT-005 | Content Review | OA, CD | No | Desktop | Pipeline |
| CONTENT-006 | Dispatch Composer | OA, CD | No | Yes | Dispatch |
| CONTENT-007 | Dispatch Tracking | OA, CD | No | Desktop | Dispatch |
| CONTENT-008 | Approval Queue | OA, CD, C | No | Desktop | Approvals |
| CONTENT-009 | Multi-round Approval | OA, CD, C | No | Desktop | Approvals |
| CONTENT-010 | Simple Approval | OA, CD, C | No | Desktop | Approvals |
| CONTENT-011 | Creator Engagement | OA, CD | No | Desktop | Analytics |
| CONTENT-012 | Creator Profile Edit | OA, CD | No | Desktop | Creators |

Personas use the standard codes. Within them, the role templates decide actions: an **Editor** reviews, requests changes and dispatches; an **Approver** gives final approval; a **Creator Manager** maintains the roster and tiers ([users.md § Staff](../../../../spec/users.md#staff)). The Candidate reaches the approval screens only where the org routes final approval to them, as for press releases.

## Content Operations Navigation Context

```
PRESS (Communications Director sidebar)
  Media Contacts      → PRESS-001
  Creators            → CONTENT-002
  Content             → CONTENT-001  (Inbox, Dispatch, Approvals as tabs)
  Releases            → press release list (within PRESS-004)
  ...
```

---

## CONTENT-001: Content Operations Dashboard

The command center for the program: what is waiting on the team, what is waiting on creators, and what has been published, by topic.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Content                                                    Mon 12 Jan 2026  │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Pending approval   Dispatched today   Overdue    Awaiting creator           │
│  ┌────────────┐     ┌────────────┐     ┌────────┐ ┌────────────┐             │
│  │     12     │     │      8     │     │   3    │ │      6     │             │
│  └────────────┘     └────────────┘     └────────┘ └────────────┘             │
│                                                                              │
│  TOPICS            │ PUBLISHED                        │ TIER A QUEUE         │
│  Cost of living    │ Filters: [Date ▾] [Network ▾]    │ Marisol Vega         │
│  ████████░░  8/10  │          [Creator ▾] [Topic ▾]   │ Video · awaiting     │
│  Energy bills      │ ┌──────────┐ ┌──────────┐        │ reply  [Reply]       │
│  █████░░░░░  5/10  │ │ [video]  │ │ [image]  │        │ Javier Colón         │
│  Public schools    │ │ M. Vega  │ │ J. Colón │        │ Caption · round 2    │
│  ███░░░░░░░  3/10  │ │ IG · TT  │ │ IG · FB  │        │        [Review]      │
│  Health care       │ └──────────┘ └──────────┘        │ ─────────────────    │
│  ██░░░░░░░░  2/10  │ ┌──────────┐ ┌──────────┐        │ PIPELINE             │
│                    │ │ [text]   │ │ [video]  │        │ Yamilet approved     │
│                    │ │ A. Rivera│ │ C. Ortiz │        │ brief · 45m          │
│                    │ │ X        │ │ TT · YT  │        │ Luis sent image      │
│                    │ └──────────┘ └──────────┘        │ · 2h                 │
│                                                                              │
│                                                     [+ New dispatch]         │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Mobile

```
┌────────────────────────────┐
│  Content                   │
├────────────────────────────┤
│                            │
│  Pending 12   Dispatched 8 │
│  Overdue  3   Awaiting   6 │
│                            │
│  ! 3 unread from tier A    │
│    creators       [View →] │
│                            │
│  TIER A                    │
│  ┌────────────────────────┐│
│  │ Marisol Vega   PENDING ││
│  │ Updated video ready    ││
│  │ for review      [Open] ││
│  └────────────────────────┘│
│                            │
│  ACTIVITY                  │
│  Marisol sent a video 2m   │
│  Luis approved brief 45m   │
└────────────────────────────┘
```

### Interaction

- **Stat cards** open the matching filtered view: Pending approval → CONTENT-008, Overdue → CONTENT-008 filtered to overdue, Awaiting creator → CONTENT-007 filtered to unanswered
- **Topics** are the talking-points topics from PRESS-014. Progress is published items against the target the team sets per topic for the period
- **Published grid** cards open the item in CONTENT-005 in read-only mode, with its round history
- **Tier A queue** rows open CONTENT-003 on the conversation tab or CONTENT-009, depending on whether the item waits on the creator or on the team
- **"+ New dispatch"** → CONTENT-006

### States

- **Empty (no creators)**: "No creators yet. Add the people who publish for your campaign to start briefing them." [Add Creator] → CONTENT-012
- **Empty (no published content)**: grid shows "Nothing published through the program yet."

---

## CONTENT-002: Creator List

The roster, grouped by tier. Extends the CRM contact list (CRM-001) with creator fields, as PRESS-001 does for journalists.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Creators                                                   [+ Add Creator]  │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Search creators by name or handle...                                        │
│  [All] [Tier A] [Tier B] [Tier C] [Tier D]   [Active] [Overdue]              │
│                                                                              │
│  A — TOP PRIORITY · 3                                     Collapse ▲         │
│  ☐ Marisol Vega      IG · TT       Last: 2h ago    ACTIVE   [Dispatch]       │
│  ☐ Javier Colón      IG · TT · FB  Last: today     ACTIVE   [Dispatch]       │
│  ☐ Camila Ortiz      TT · YT       Last: yesterday ACTIVE   [Dispatch]       │
│                                                                              │
│  B — SECOND PRIORITY · 10                                 Collapse ▲         │
│  ☐ Andrés Rivera     IG · X        Last: today     ACTIVE   [Dispatch]       │
│  ☐ Yamilet Cruz      IG · TT       Last: 3d ago    OVERDUE  [Dispatch]       │
│  ...                                                  Show 8 more ▼          │
│                                                                              │
│  C — SELECTED · 18                                        Collapse ▲         │
│  ☐ Luis Ortega       IG · FB       Last: yesterday                           │
│  ...                                                 Show 17 more ▼          │
│                                                                              │
│  D — GENERAL · 41                                           Expand ▼         │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────       │
│  72 creators · 2 selected                            [Bulk Dispatch →]       │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- **Row click** → CONTENT-003 Creator Profile
- **Checkboxes** select across tiers; **Bulk Dispatch** opens CONTENT-006 with the selection as recipients
- **Tier D starts collapsed**: at that size the team works it in bulk, not row by row
- **OVERDUE** means the creator has an item past its due date, not that they are late to reply
- **"+ Add Creator"** → CONTENT-012 in create mode. If the person already exists on the omni-list, the dedup check on save offers to add the creator facet to that record instead

### States

- **Empty**: "No creators yet. Add militants, spokespeople and influencers who publish for the campaign." [Add Creator]
- **Shared roster** (alliance contract active): a banner names the tenants whose creators appear here and under which contract; shared rows carry the owning tenant's name and cannot be edited

---

## CONTENT-003: Creator Profile

One creator: profile, WhatsApp conversation and active items. Extends CRM-002 Contact Detail with a creator section.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Marisol Vega                                                    ← Creators  │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────┐  Marisol Vega · Tier A           [Edit Profile] [Dispatch]         │
│  │ [ph] │  IG @marisolvega · TT @marisol.v                                   │
│  └──────┘  Last submission 2h · Response rate 94% · Posting 9/10             │
│            Tier A since Jan 2026 (B → A)                                     │
│                                                                              │
│  CONVERSATION · WhatsApp            │ ACTIVE ITEMS                           │
│  ● Window open · closes in 21h      │ Energy bills video                     │
│  ───────────────────────────────    │ UNDER_REVIEW · round 2                 │
│  Here is the new cut for the        │                                        │
│  energy bills piece.     Mon 09:14  │ Cost of living reel                    │
│        Brief: lead with the bill,   │ DRAFT · yesterday                      │
│        then the family. Mon 09:18   │                                        │
│  [ voice note · 0:38 ]   Mon 09:31  │ January brief                          │
│  Posting Wednesday after            │ APPROVED · yesterday                   │
│  10:00.                  Mon 09:42  │                                        │
│        Approved, thank you.         │ Caption options                        │
│                          Mon 10:03  │ UNDER_REVIEW · Mon                     │
│  ───────────────────────────────    │                                        │
│  Write a message...        [Send →] │                                        │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Mobile

```
┌────────────────────────────┐
│  Marisol Vega              │
├────────────────────────────┤
│  [Thread] [Items] [Profile]│
│  ● Window open · 21h left  │
│                            │
│  Here is the new cut for   │
│  the energy bills piece.   │
│                     09:14  │
│        Brief: lead with the│
│        bill, then family.  │
│                     09:18  │
│  [ voice note · 0:38 ]     │
│                     09:31  │
│                            │
│  Message Marisol... [Send] │
└────────────────────────────┘
```

### Window State

| State | Display | Composer |
|-------|---------|----------|
| Open | ● Window open · closes in 21h | Free-form message |
| Closing | ● Window closes in 45m (warning color) | Free-form message |
| Closed | ○ Window closed · templates only | Template picker replaces the text box |

### Interaction

- **Conversation** is the tenant's WhatsApp thread with this creator, stored under the tenant's keys. Attachments and voice notes open inline
- **Active items** rows open CONTENT-005, or CONTENT-009/010 when the item is at approval
- **"Dispatch"** → CONTENT-006 with this creator pre-selected
- **Tier line** shows the current tier and the last change; the full tier history is in CONTENT-012
- **Other tenants**: if the creator also works with another tenant, nothing about that relationship appears here

---

## CONTENT-004: Inbound Inbox

Everything creators send in, newest first, with a preview panel. Items enter the review pipeline from here.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Inbox                                                             14 items  │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Search inbound content...                                                   │
│  [All · 14] [Tier A+B] [Video] [Image] [Pending] [Approved]                  │
│                                                                              │
│  ITEMS                          │ PREVIEW                                    │
│  ─────────────────────────────  │ ┌──────────────────────────────┐           │
│  ▸ Marisol Vega        2m       │ │  [ VIDEO · 9:16 · 0:42 ]     │           │
│    Energy bills — vertical cut  │ └──────────────────────────────┘           │
│    DRAFT                        │ Marisol Vega · Tier A                      │
│  Javier Colón          1h       │ 2m ago · WhatsApp                          │
│    Housing carousel v2          │                                            │
│    UNDER_REVIEW                 │ "Here is the new cut, vertical,            │
│  Camila Ortiz          3h       │  with the bill reveal at 0:23.             │
│    Voice note — brief review    │  Can you review it this week?"             │
│    DRAFT                        │                                            │
│  Andrés Rivera         5h       │ Topic: [Energy bills ▾]                    │
│    Caption — stronger hook      │                                            │
│    REVISION_REQUESTED           │ [Start Review →]  [Approve]                │
│  Luis Ortega          yday      │ [Request Revision]  [Reject]               │
│    Behind the scenes still      │                                            │
│    APPROVED                     │                                            │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Mobile

```
┌────────────────────────────┐
│  Inbox                     │
├────────────────────────────┤
│  [All] [A+B] [Video] [Pend]│
│                            │
│  Marisol Vega · A     2m   │
│  Energy bills — vertical   │
│  DRAFT                     │
│  ────────────────────────  │
│  Javier Colón · A     1h   │
│  Housing carousel v2       │
│  UNDER_REVIEW              │
│  ────────────────────────  │
│  Camila Ortiz · A     3h   │
│  Voice note — brief        │
│  DRAFT                     │
└────────────────────────────┘
```

### Interaction

- **Item click** selects it and fills the preview. **"Start Review"** → CONTENT-005
- **Topic** is set by a person when the item is triaged. There is no automatic classification: scoring every inbound item on arrival is a background read that waits for the ADR-018 review
- **Approve** on an inbox item applies only to tier C and D items; tier A and B items always go through CONTENT-005 and CONTENT-009
- **Request Revision** requires a comment, sent to the creator over WhatsApp (template if the window is closed)

### States

- **Empty**: "Nothing in the inbox. Submissions from creators appear here as they arrive."
- **WhatsApp disconnected**: banner "WhatsApp is not connected. New submissions will not arrive until it is." [Open integration settings] → WhatsApp setup in SET-013

---

## CONTENT-005: Content Review

The Editor's working view of one item: preview, round history and the review thread.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Content Review                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│  Inbox → Marisol Vega → Energy bills video                                   │
│                                                                              │
│  ┌────────────────────┐  Draft ── Under Review ── Revision ── Final          │
│  │                    │           ●                                          │
│  │ [ VIDEO · 9:16 ]   │  Submitted 12 Jan 2026, 09:14                        │
│  │                    │  Type VIDEO · 42 MB · Topic: Energy bills            │
│  │                    │                                                      │
│  └────────────────────┘  ROUND HISTORY                                       │
│                          Round 1 — Original      REVISION_REQUESTED          │
│                            "Show the bill before the family, at 0:05"        │
│                          Round 2 — Current       UNDER_REVIEW                │
│                          [Compare rounds]                                    │
│                                                                              │
│  REVIEW THREAD                                                               │
│  Maria G. · Editor      Show the bill before the family.     10:02           │
│  Jon B. · Approver      Strong. Check the audio levels.      10:18           │
│  Marisol V. · Creator   Updated and re-uploaded.             10:31           │
│                                                                              │
│  Comment (required for a revision request)                                   │
│  ┌──────────────────────────────────────────────────────────────────┐        │
│  │                                                                  │        │
│  └──────────────────────────────────────────────────────────────────┘        │
│  [Request Revision]   [Escalate to Approver]   [Send to Approval →]          │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- **"Compare rounds"** shows the current round beside the previous one with the differences marked (timestamps for video, text diff for captions)
- **Request Revision** is disabled until the comment box has text
- **"Escalate to Approver"** pulls an Approver into the thread without moving the item to approval
- **"Send to Approval"** moves the item to CONTENT-008; tier decides whether it lands in multi-round or simple approval
- **Creator messages** in the thread are the WhatsApp replies tied to this item

---

## CONTENT-006: Dispatch Composer

Send a brief or a post to publish to one creator, a tier, or a selection. The right column lists recent dispatches.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Dispatch                                                                    │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  NEW DISPATCH                          │ SENT DISPATCHES                     │
│  (●) Post to publish  ( ) Brief        │ [All] [Posts] [Briefs]              │
│                                        │                                     │
│  Caption / content                     │ POST · Energy bills                 │
│  ┌──────────────────────────────────┐  │ Today 10:42 · 8 creators            │
│  │ ¿Tu factura de luz subió otra    │  │ 5 approved · 2 pending              │
│  │ vez? No eres la única...         │  │                                     │
│  └──────────────────────────────────┘  │ BRIEF · Housing angles              │
│  Attachments  [Image] [Video] [Link]   │ Yesterday · 3 creators              │
│  Platforms    ☑ IG ☑ TT ☐ FB ☐ X ☐ YT  │ 3 viewed                            │
│  Disclaimer   Paid for by... (auto) ✓  │                                     │
│  Schedule     [Select date and time]   │ POST · School supplies              │
│                                        │ Mon · 12 creators                   │
│  Recipients                            │ 11 posted                           │
│  [Search creators...]  [All tiers ▾]   │                                     │
│  Marisol V. [A] ×   Javier C. [A] ×    │ Showing 1–3 of 24                   │
│  + Select more    Bulk select by tier  │                                     │
│                                        │                                     │
│  ! 1 recipient outside the WhatsApp    │                                     │
│    window: a template goes first       │                                     │
│                                        │                                     │
│  [Send Dispatch]   [Save Draft]        │                                     │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Mobile

```
┌────────────────────────────┐
│  New Dispatch              │
├────────────────────────────┤
│  (●) Post  ( ) Brief       │
│                            │
│  Caption / content         │
│  ┌──────────────────────┐  │
│  │                      │  │
│  └──────────────────────┘  │
│  Attach [IMG][VID][URL]    │
│  Platforms IG TT FB X YT   │
│  Schedule [Date/time]      │
│  Recipients        [+ Add] │
│  Marisol V. [A] ×          │
│                            │
│  [    Send Dispatch     ]  │
└────────────────────────────┘
```

### Interaction

- **Type toggle**: a *post to publish* is finished content the creator posts as-is; a *brief* is direction the creator turns into their own content. Briefs hide the platform checkboxes
- **Disclaimer** is filled from the disclaimer settings (SET-010) and cannot be removed from a post to publish. A paid creator's dispatch adds the platform's paid-partnership label
- **Window warning** counts recipients whose WhatsApp window is closed. They receive the approved "new dispatch" template first; the content follows when they reply
- **Draft with the text builder**: a person may draft the caption or brief with the text builder ([ADR-020](../../../../decisions/020-central-service-line-up-and-builders.md)); the draft lands in this composer and is sent only by the person
- **"Send Dispatch"** → CONTENT-007 for the new dispatch

---

## CONTENT-007: Dispatch Tracking

One dispatch: each recipient's delivery, response and status.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Dispatch Tracking                                                           │
├──────────────────────────────────────────────────────────────────────────────┤
│  Dispatch → Energy bills post                                                │
│                                                                              │
│  POST TO PUBLISH · Energy bills                                              │
│  "¿Tu factura de luz subió otra vez? No eres la única..."                    │
│  Sent 30 Mar 2026 · by Maria G. · 8 recipients                               │
│                                                                              │
│  Creator      Tier  Window  Delivered  Viewed  Status      Action            │
│  ───────────────────────────────────────────────────────────────────         │
│  Marisol V.   A     ●       ✓          ✓       APPROVED    View →            │
│  Javier C.    A     ●       ✓          ✓       REVISION    View →            │
│  Camila O.    A     ○       ✓          ✓       REVISION    View →            │
│  Andrés R.    B     ●       ✓          ✓       APPROVED    View →            │
│  Yamilet C.   B     ○       ✓          —       DELIVERED   Remind            │
│  Luis O.      C     ○       ✓          —       PENDING     Remind            │
│                                                                              │
│  REPLY THREAD · Javier C.                                 Collapse           │
│  Strong edit. Can we move the bill shot earlier?     Yesterday 16:02         │
│       Noted for round two.                           Yesterday 16:14         │
│  Reply in thread...                                        [Send]            │
│                                                                              │
│                            [Send Reminder to All Unacknowledged]             │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- **Window column**: ● open, ○ closed. Reminders to creators with a closed window use a template
- **"Send Reminder to All Unacknowledged"** reaches only rows not yet viewed
- **Row "View"** opens the reply thread for that creator; the item link opens CONTENT-005

---

## CONTENT-008: Approval Queue

Everything awaiting approval, sorted by tier priority and due date, filtered to what the viewer's role templates allow them to approve.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Approval Queue                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│  12 items awaiting your approval · sorted by tier, then due date             │
│  [All] [Multi-round] [Simple] [Overdue] [Due today]                          │
│                                                                              │
│  ☐  A  Marisol Vega   Energy bills video       Due: today   OVERDUE          │
│        Round 2 · updated video with the bill shot at 0:05   Review →         │
│  ☐  A  Javier Colón   Housing carousel         Due: today                    │
│        Round 2 · caption rewritten                           Review →        │
│  ☐  B  Andrés Rivera  Caption — town hall      Due: tomorrow                 │
│        Round 1                                               Review →        │
│  ☐  C  Luis Ortega    Behind the scenes still  Due: in 2 days                │
│        Image · IG + FB                                       Review →        │
│  ☐  D  Nilda Rosa     School supplies repost   Due: in 3 days                │
│        Post to publish · IG                                  Review →        │
│  ...                                                        4 more ▼         │
│                                                                              │
│  2 selected (C/D)                       [Bulk Approve Selected (C/D)]        │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- **Tier A and B rows** → CONTENT-009 Multi-round Approval. **Tier C and D rows** → CONTENT-010 Simple Approval
- **Bulk approve** accepts only tier C and D selections; selecting an A or B item disables it
- **Candidate approval**: where the org routes final approval to the candidate, these items also appear in the candidate's Pending Approvals alongside press releases and social posts

---

## CONTENT-009: Multi-round Approval

Final approval for tier A and B content, with the current round, the previous round and the thread side by side.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Multi-round Approval                                                        │
├──────────────────────────────────────────────────────────────────────────────┤
│  Approval Queue → Marisol Vega → Energy bills video (Round 2)                │
│  Draft ── Under Review ── Revision ── Final Approval                         │
│                                       ●                                      │
│                                                                              │
│  ROUND 2 — CURRENT      │ ROUND 1 — ORIGINAL   │ REVIEW THREAD               │
│  Submitted today 09:14  │ REVISION_REQUESTED   │ Show the bill first.        │
│  ┌──────────────────┐   │ ┌──────────────────┐ │           28 Mar            │
│  │ [ VIDEO 9:16 ]   │   │ │ [ VIDEO 9:16 ]   │ │ Updated cut ready.          │
│  └──────────────────┘   │ └──────────────────┘ │           09:15             │
│  Bill shot moved to     │ Feedback: show the   │ Reads much better.          │
│  0:05 as requested.     │ bill before 0:05.    │           09:31             │
│                                                                              │
│  Add a review comment (required for a revision request)                      │
│  ┌──────────────────────────────────────────────────────────────────┐        │
│  └──────────────────────────────────────────────────────────────────┘        │
│  [Final Approve]    [Request Another Revision]    [Reject]                   │
│  Final approval notifies the creator over WhatsApp.                          │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- **Final Approve** marks the item approved and notifies the creator; a post to publish is released to the creator with its disclaimer
- **Request Another Revision** opens a new round and requires a comment
- **Reject** closes the item; the comment, if any, goes to the creator

---

## CONTENT-010: Simple Approval

Approve or reject for tier C and D content.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Simple Approval                                                             │
├──────────────────────────────────────────────────────────────────────────────┤
│  Approval Queue → Luis Ortega → Image submission                             │
│                                                                              │
│  ┌────────────────────┐  Luis Ortega · Tier C · active 18m ago               │
│  │                    │  "Behind the scenes at the Caguas town               │
│  │ [ IMAGE ]          │   hall. ¡Gracias a todos los que..."                 │
│  │                    │  Submitted 30 Mar 2026 · Target: IG + FB             │
│  └────────────────────┘  Status: PENDING                                     │
│                                                                              │
│  Optional note for the creator                                               │
│  ┌──────────────────────────────────────────────────────────────────┐        │
│  └──────────────────────────────────────────────────────────────────┘        │
│  [✓ Approve]   [✗ Reject]          The creator is notified by WhatsApp       │
│                                                                              │
│  Show previous approvals from this creator (5) ▼                             │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- **Approve** and **Reject** notify the creator; the optional note travels with the notification
- **Previous approvals** expands the creator's last five decisions, to keep tier C and D decisions consistent

---

## CONTENT-011: Creator Engagement

Engagement on content published through the program. **Staff-only.** Creators never see this screen, and it shows no rank, position or badge ([ADR-015](../../../../decisions/015-product-scope.md) rules out leaderboards).

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Creator Engagement                                                          │
├──────────────────────────────────────────────────────────────────────────────┤
│  Mar 01 — Mar 30, 2026   [All platforms ▾]   [All tiers ▾]                   │
│                                                                              │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐         │
│  │ 48,230 likes │ │ 12,440 shares│ │ 8,920 comm.  │ │ 340k views   │         │
│  │ ↑ 8.4%       │ │ ↑ 3.1%       │ │ ↓ 1.8%       │ │ ↑ 12.7%      │         │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘         │
│                                                                              │
│  ENGAGEMENT OVER TIME                                                        │
│  [ Line chart: likes · shares · comments · views, 30 days ]                  │
│                                                                              │
│  [By Creator] [By Platform] [By Topic]                                       │
│  Creator        Tier  Posts  Likes   Shares  Comments  Views                 │
│  ───────────────────────────────────────────────────────────────             │
│  Andrés Rivera  B     6      4,120   980     640       31k                   │
│  Camila Ortiz   A     4      6,300   1,410   820       52k                   │
│  Javier Colón   A     5      7,980   1,730   1,020     61k                   │
│  Marisol Vega   A     7      8,420   2,050   1,180     74k                   │
│  (alphabetical by default · sortable by any column)                          │
│                                                                              │
│  [ Media monitoring — see the Capture service, ADR-020 ]                     │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- **Default sort is alphabetical.** Staff may sort by any column; the screen never numbers rows or marks a top creator
- **By Topic** groups engagement by talking-points topic, which is the view most teams need
- **Access** follows role templates: Creator Manager and Communications Director by default
- **The monitoring placeholder** points to the Capture central service rather than a third-party listening tool

---

## CONTENT-012: Creator Profile Edit

Create or edit a creator. Adds the creator fields to a Contact record; the standard contact fields stay in CRM-003.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Creator Profile — Edit                                                      │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  PROFILE                              TIER                                   │
│  [ photo ]  Click to upload           (●) A — Top priority                   │
│  Full name   [Marisol Vega       ]    ( ) B — Second priority                │
│  WhatsApp    [+1 787 555 0142    ]    ( ) C — Selected                       │
│  Handles     [@marisolvega       ]    ( ) D — General                        │
│  Notes       [Internal notes...  ]                                           │
│                                       TIER HISTORY                           │
│  PLATFORMS                            A · Jan 2026 · by Maria G.             │
│  ☑ IG ☑ TT ☐ FB ☐ X ☐ YT ☐ LI         B · Oct 2025 · by Maria G.             │
│  ☐ Threads ☐ Blog                     C · Aug 2025 · added                   │
│                                                                              │
│  CONTENT TYPES EXPECTED               PAYMENT                                │
│  ☑ Video ☑ Image ☐ Text ☐ Audio       ( ) Unpaid  (●) Paid                   │
│                                                                              │
│  [Save Changes]   [Cancel]                       [Deactivate Creator]        │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- **Tier change** is logged to tier history with who made it; it takes effect on the next item, not on items already in review
- **Payment** marks the creator as paid, which adds the paid-partnership label to their dispatches and flags their payments for campaign finance reporting
- **Deactivate** removes the creator from the roster and from future dispatches; the Contact record and its history remain
- **Duplicate check on save** matches on WhatsApp number and offers to add the creator facet to an existing Person

---

## Open Questions

1. **Topic targets.** CONTENT-001 shows progress per topic against a target. Who sets the target, and per what period?
2. **Creators who are candidates.** When the creator is the tenant's own candidate, should their items skip creator approval and go straight to the candidate's own final approval?
3. **Voice notes.** Should voice notes be transcribed for review, and if so, is transcription a metered call to the Capture service's supplier?
