# Content Operations Wireframes

## Purpose

Most pieces a campaign publishes go through more than one round: a caption gets shortened, a photo gets swapped, and the version that goes out is not the one first submitted. These wireframes cover the content pipeline specified at [press.md § Content Pipeline](../../../../spec/press.md#content-pipeline): review in rounds, the approval queue, and final approval.

The core UX challenge: approval is the last thing between a draft and the public, and the person approving is often the candidate, on a phone, between events. The screens have to show what changed since the last round and why, so that approving takes seconds and a revision request never goes back without a reason.

### Source and what changed

These screens are redrawn from part of a lo-fi prototype that arrived with the alliance services board. The prototype was built around managing outside content creators, which GreenGrass does not do ([ADR-021 § What this ADR no longer decides](../../../../decisions/021-content-approval-pipeline.md#what-this-adr-no-longer-decides)). Only its review screens are kept:

- **No creator screens.** The roster, creator profiles, the inbound inbox, dispatch to creators, dispatch tracking and creator engagement are not drawn.
- **One approval route.** The prototype routed approval by creator tier. Here every piece goes through the same approval screen.
- **Team & Roles and Notifications are not new screens.** The Editor and Approver role templates are managed in SET-002, SET-004 and SET-005; pipeline notifications use the notification drawer in `navigation-shell/navigation-shell.md` and the rules in `02-global-patterns/notification-patterns.md`.
- **No AI screens.** An agent-prepared version of this flow, approved over WhatsApp, is held as [ADR-018](../../../../decisions/018-ai-agent-posture.md)'s worked example.

## Scope

| ID | Screen | Personas | Offline | Mobile | Section |
|----|--------|----------|---------|--------|---------|
| CONTENT-001 | Content Dashboard | OA, CD | No | Yes | Overview |
| CONTENT-002 | Content Review | OA, CD | No | Desktop | Pipeline |
| CONTENT-003 | Approval Queue | OA, CD, C | No | Yes | Approvals |
| CONTENT-004 | Approval | OA, CD, C | No | Yes | Approvals |

Personas use the standard codes. Within them, the role templates decide actions: an **Editor** reviews, requests revisions and escalates; an **Approver** gives final approval ([users.md § Staff](../../../../spec/users.md#staff)). The Candidate reaches the approval screens where the org routes final approval to them, as for press releases.

## Content Operations Navigation Context

```
PRESS (Communications Director sidebar)
  Media Contacts      → PRESS-001
  Content             → CONTENT-001  (Review and Approvals as tabs)
  Releases            → press release list (within PRESS-004)
  ...
```

---

## CONTENT-001: Content Dashboard

What is waiting on the team, what is waiting on approval, and what goes out today.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Content                                                    Tue 14 Apr 2026  │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  In review        Revision requested   Awaiting approval   Scheduled today   │
│  ┌──────────┐     ┌──────────┐         ┌──────────┐        ┌──────────┐      │
│  │    3     │     │    2     │         │    4     │        │    4     │      │
│  └──────────┘     └──────────┘         └──────────┘        └──────────┘      │
│                                                                              │
│  TODAY                                     │ WAITING ON YOU                  │
│  09:00  IG story · Hoy en entrevista       │ X · Water, short version        │
│         APPROVED                           │ Round 2 · awaiting approval     │
│  09:30  X · "No es sequía, es saqueo"      │                   [Review →]    │
│         ROUND 2 · AWAITING APPROVAL        │ Facebook · Dry taps             │
│  12:00  Facebook · Dry taps                │ Round 2 · awaiting approval     │
│         ROUND 2 · AWAITING APPROVAL        │                   [Review →]    │
│  13:00  IG post · Water                    │ ─────────────────────────────   │
│         APPROVED                           │ ACTIVITY                        │
│                                            │ Maria G. requested a revision   │
│  TOPICS (from talking points)              │ on Facebook · 7:15              │
│  Water       ████████░░  4 pieces          │ Candidate approved IG post 7:03 │
│  Housing     ██░░░░░░░░  1 piece           │                                 │
│                                                             [+ New piece]    │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Mobile

```
┌────────────────────────────┐
│  Content                   │
├────────────────────────────┤
│                            │
│  In review 3   Revision 2  │
│  Approval  4   Today    4  │
│                            │
│  ! 2 pieces go out before  │
│    noon without approval   │
│    yet            [View →] │
│                            │
│  TODAY                     │
│  09:00  IG story  APPROVED │
│  09:30  X         ROUND 2  │
│  12:00  Facebook  ROUND 2  │
│  13:00  IG post   APPROVED │
└────────────────────────────┘
```

### Interaction

- **Stat cards** open the matching filtered view: In review and Revision requested → the review list; Awaiting approval → CONTENT-003
- **Today** lists every piece scheduled for the day in time order with its pipeline state. A piece not yet approved at its scheduled time does not go out; the row turns to a warning 30 minutes before
- **Topics** are the talking-points topics from PRESS-014
- **"+ New piece"** opens the Post Composer (SOCIAL-002), which submits into the pipeline when approval is required

### States

- **Empty**: "Nothing in the pipeline. Pieces submitted for approval appear here." [New piece]
- **Nothing today**: the Today column shows "Nothing scheduled for today."

---

## CONTENT-002: Content Review

The Editor's working view of one piece: preview, round history and the review thread.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Content Review                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│  Content → Facebook · Dry taps                                               │
│                                                                              │
│  ┌────────────────────┐  Draft ── Under Review ── Revision ── Final          │
│  │                    │                        ●                             │
│  │ [ IMAGE · 4:5 ]    │  Scheduled Tue 14 Apr, 12:00 · Facebook              │
│  │                    │  Topic: Water                                        │
│  │                    │                                                      │
│  └────────────────────┘  ROUND HISTORY                                       │
│                          Round 1 — Original      REVISION_REQUESTED          │
│                            "Use the tanker truck photo, not the              │
│                             press conference. Shorter copy."                 │
│                          Round 2 — Current       UNDER_REVIEW                │
│                          [Compare rounds]                                    │
│                                                                              │
│  REVIEW THREAD                                                               │
│  Maria G. · Editor      Tanker photo, shorter copy.          07:15           │
│  Luis R. · Comms        New photo and copy uploaded.         07:40           │
│                                                                              │
│  Comment (required for a revision request)                                   │
│  ┌──────────────────────────────────────────────────────────────────┐        │
│  │                                                                  │        │
│  └──────────────────────────────────────────────────────────────────┘        │
│  [Request Revision]   [Escalate to Approver]   [Send to Approval →]          │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- **"Compare rounds"** shows the current round beside the previous one with the differences marked (text diff for captions, timestamps for video)
- **Request Revision** is disabled until the comment box has text. It opens a new round and notifies whoever submitted the piece
- **"Escalate to Approver"** pulls an Approver into the thread without moving the piece to approval
- **"Send to Approval"** moves the piece to CONTENT-003

---

## CONTENT-003: Approval Queue

Everything awaiting the viewer's approval, sorted by scheduled time.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Approval Queue                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│  4 pieces awaiting your approval · sorted by scheduled time                  │
│  [All] [Round 2+] [Goes out today] [Overdue]                                 │
│                                                                              │
│  ☐  09:30 today   X · "No es sequía, es saqueo"                              │
│                   Round 2 · shorter, tied to today's interview   Review →    │
│  ☐  12:00 today   Facebook · Dry taps                                        │
│                   Round 2 · tanker photo, shorter copy          Review →     │
│  ☐  Wed 10:00     IG post · Housing                                          │
│                   Round 1                                       Review →     │
│  ☐  Thu 18:00     X · Town hall reminder                                     │
│                   Round 1                                       Review →     │
│                                                                              │
│  2 selected                                    [Approve Selected]            │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Mobile

```
┌────────────────────────────┐
│  Approvals             4   │
├────────────────────────────┤
│  09:30  X · Round 2        │
│  "No es sequía, es saqueo" │
│  [Approve]     [Review →]  │
│  ────────────────────────  │
│  12:00  Facebook · Round 2 │
│  Dry taps                  │
│  [Approve]     [Review →]  │
│  ────────────────────────  │
│  Wed 10:00  IG · Round 1   │
│  Housing       [Review →]  │
└────────────────────────────┘
```

### Interaction

- **Row click** → CONTENT-004
- **Approve Selected** is batch approval, as in the Post Approval Workflow. A piece in round 2 or later can be batch-approved only after its comparison has been opened once
- **Candidate approval**: where the org routes final approval to the candidate, these pieces also appear in the candidate's Pending Approvals alongside press releases

### States

- **Empty**: "Nothing awaiting your approval."

---

## CONTENT-004: Approval

Final approval for one piece, with the current round, the previous round and the thread side by side.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Approval                                                                    │
├──────────────────────────────────────────────────────────────────────────────┤
│  Approval Queue → Facebook · Dry taps (Round 2)                              │
│  Draft ── Under Review ── Revision ── Final Approval                         │
│                                       ●                                      │
│  Scheduled Tue 14 Apr, 12:00                                                 │
│                                                                              │
│  ROUND 2 — CURRENT      │ ROUND 1 — ORIGINAL   │ REVIEW THREAD               │
│  ┌──────────────────┐   │ ┌──────────────────┐ │ Tanker photo, shorter       │
│  │ [ IMAGE 4:5 ]    │   │ │ [ IMAGE 4:5 ]    │ │ copy.         07:15         │
│  └──────────────────┘   │ └──────────────────┘ │ New photo and copy          │
│  "Hoy muchas familias   │ "Ayer lo dijimos en  │ uploaded.     07:40         │
│  siguen con las llaves  │ conferencia de       │                             │
│  secas..."              │ prensa y hoy..."     │                             │
│                                                                              │
│  Add a comment (required for a revision request)                             │
│  ┌──────────────────────────────────────────────────────────────────┐        │
│  └──────────────────────────────────────────────────────────────────┘        │
│  [Approve]    [Request Another Revision]    [Reject]                         │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Mobile

```
┌────────────────────────────┐
│  Facebook · Round 2        │
│  12:00 today               │
├────────────────────────────┤
│  [Current] [Previous]      │
│  ┌──────────────────────┐  │
│  │ [ IMAGE 4:5 ]        │  │
│  └──────────────────────┘  │
│  "Hoy muchas familias      │
│  siguen con las llaves     │
│  secas..."                 │
│                            │
│  Changed: photo, copy      │
│                            │
│  [      Approve       ]    │
│  [Request revision] [Rej.] │
└────────────────────────────┘
```

### Interaction

- **Approve** marks the round approved and keeps its schedule. Approval applies to this round only: if a later round is opened, the piece needs approval again before it goes out
- **Request Another Revision** opens a new round and requires a comment
- **Reject** closes the piece and takes it off the schedule; the comment, if any, goes to whoever submitted it
- **Mobile** shows one round at a time with a Current/Previous toggle and a one-line summary of what changed

---

## Open Questions

1. **Late approval.** A piece still awaiting approval at its scheduled time does not go out. Should the approver be warned earlier, and should an unapproved later round ever fall back to an approved earlier one?
2. **Approving from WhatsApp.** Could CONTENT-004's decision be made from a WhatsApp card? Recorded at [press.md § Open Questions](../../../../spec/press.md#open-questions); the agent version is held for the ADR-018 review.
