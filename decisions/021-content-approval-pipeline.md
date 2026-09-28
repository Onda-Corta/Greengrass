# ADR-021: Content Approval Pipeline

**Status:** Accepted
**Date:** 2026-09-28
**Revised:** 2026-09-28 — narrowed to the approval pipeline. The first version also specified a creator program; that part is withdrawn. See [What this ADR no longer decides](#what-this-adr-no-longer-decides).
**Sources:** `spec/press.md`, `spec/users.md`, `design/ux/04-wireframes/content-ops/content-ops.md`, `decisions/003-identity-access-organization.md`, `decisions/016-cross-cutting-resolutions.md`, `decisions/018-ai-agent-posture.md`, `decisions/020-central-service-line-up-and-builders.md`

## Context

[press.md § Post Approval Workflow](../spec/press.md#post-approval-workflow) approves the organization's social posts in one pass: draft, review, approve, schedule or publish. [ADR-016](016-cross-cutting-resolutions.md) #22 made approval the default for every post. Neither says what happens when a reviewer sends a piece back. In practice most pieces go through more than one round: a caption gets shortened, a photo gets swapped, and the version that finally goes out is not the one first submitted.

A set of lo-fi wireframes that arrived alongside the alliance services board recorded in [diary entry 13](../diary/13-services-a-la-carte.md) drew that round-by-round review well: round history, a comparison between rounds, a required comment on every change request, and escalation to a final approver. The same wireframes were built around a program for managing outside content creators. That part is not what GreenGrass is for, and this ADR keeps only the review.

### Conflicts this ADR resolves

1. **[ADR-016](016-cross-cutting-resolutions.md) #22** approves a post once. Review in rounds needs each round kept, compared and commented.
2. **[ADR-016](016-cross-cutting-resolutions.md) #23** keeps v1 to direct file upload and makes the Shared Content Library a v2 tentpole. Review rounds need versioned assets.

## Decision

### The content pipeline generalizes post approval

Content the organization publishes moves through one pipeline: pending, draft, under review, revision requested, approved, published.

- **Every round is kept.** A revision request opens a new round. The reviewer sees the current round beside the previous one, with the differences marked.
- **A revision request needs a comment.** A piece is never sent back without saying why.
- **An Editor can escalate to an Approver**, pulling them into the thread without moving the piece to approval.
- **Final approval follows the Post Approval Workflow.** Where the organization routes final approval to the candidate, the candidate approves, as for press releases; otherwise an Approver does. Batch approval works as it already does for scheduled posts.
- **#22's default stands.** All content requires approval before it is published. An Org Admin may relax that as #22 allows, and the emergency bypass in [press.md § Post Approval Workflow](../spec/press.md#post-approval-workflow) applies unchanged.
- **Publishing is a person's action.** An approved piece goes out when a person publishes it or at the time a person scheduled. Nothing is published by a machine ([ADR-020](020-central-service-line-up-and-builders.md)). A person may draft a piece with the text builder ADR-020 accepted; the draft enters the pipeline like any other.

### Two role templates

[ADR-003](003-identity-access-organization.md)'s hybrid model gains two default staff templates, specified in [users.md § Staff](../spec/users.md#staff): **Editor**, who reviews pieces, requests revisions and escalates; and **Approver**, who gives final approval. They stack with the existing templates. In a small campaign the Communications Director holds both.

### Versioned assets move forward from v2

A review round means nothing without the asset it reviewed. Each round's asset is kept as a version, with a comparison against the previous round. That storage is the core of the Shared Content Library, and it moves into the first build of the pipeline. The rest of the library stays a v2 tentpole: tagging, search, usage tracking, rights management, brand collections and reuse across features.

### Approving from WhatsApp is not decided here

Candidates in the target markets live in WhatsApp, and approving a piece from a WhatsApp card is an obvious surface for the last step of this pipeline. The only version drawn so far has an AI agent preparing the pieces and scheduling them, and it is held as [ADR-018](018-ai-agent-posture.md)'s worked example. Whether a person can approve from WhatsApp with no agent in the loop is recorded as an open question at [press.md § Open Questions](../spec/press.md#open-questions).

### What this ADR no longer decides

The first version of this ADR, accepted earlier the same day, also specified a program for managing content creators. It is withdrawn in full, because GreenGrass is not a tool for managing content creators. Recorded here so the reversal is visible rather than silent:

- **Creators as Contact records**, with tiers A to D, and creator relationships across tenants under a sharing contract.
- **Dispatch** of briefs and posts to creators, with per-creator delivery tracking and reminders.
- **Tier-based routing** to multi-round or simple approval, and bulk approval of low tiers.
- **A two-way WhatsApp inbox** for creator submissions and conversations.
- **Per-creator engagement**, staff-only and unranked.
- **The Creator Manager role template.**
- **Creator compliance**: disclaimers carried by dispatches, paid-partnership labels, and the in-kind contribution question for counsel.
- **The prototype's three AI screens**, which ADR-018 had been holding as its worked example. ADR-018's worked example is now the WhatsApp approval flow.

Eight of the twelve content-operations screens went with it. The four that remain are the dashboard, content review, the approval queue and approval.

### Housekeeping: amendment banners

This ADR adds an **Amended by** entry to [ADR-016](016-cross-cutting-resolutions.md) for #22 and #23.

## Consequences

**Benefits:**
- A piece that goes back and forth keeps its history, and the approver sees what changed and why
- The part of the Shared Content Library that review needs arrives when review arrives
- The pipeline is the same one the candidate already uses for press releases and posts, with rounds added

**Costs:**
- Pulling versioned assets forward adds storage and comparison work to the first build
- Withdrawing the creator program the day it was accepted leaves a gap in the record between diary entry 14 and this revision; diary entry 15 records it

**Constraints:**
- All content requires approval by default; nothing is published by a machine
- Every revision request carries a comment
- Approval from WhatsApp is open; any version with an agent in it waits for ADR-018

**Related ADRs:** [ADR-003](003-identity-access-organization.md) (two role templates added to the hybrid model), [ADR-016](016-cross-cutting-resolutions.md) (amended — #22 generalizes to the content pipeline; #23's versioned assets move forward), [ADR-018](018-ai-agent-posture.md) (the WhatsApp approval flow held as the review's worked example), [ADR-020](020-central-service-line-up-and-builders.md) (nothing published by a machine; the text builder may draft a piece)
