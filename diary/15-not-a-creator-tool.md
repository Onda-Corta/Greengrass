# Diary Entry 15: Not a Creator Tool

**Date:** 2026-09-28

---

## The Task

Entry 14 said ADR-021 treats creators exactly like press contacts. By the end of the same day that was withdrawn, and this entry records why and what replaced it.

## What Went Wrong

The request was to take the post-approval and revision-rounds interaction and run it through the services board. There were two sources for that interaction. One was the set of creator-management wireframes behind ADR-021. The other was a prototype conversation in which a candidate approves the day's social media from WhatsApp. The first diagram used the wireframes, and drew an Editor briefing outside creators, receiving their submissions and approving them tier by tier.

The answer was short: we are not trying to manage content creators. The diagram was deleted. And that same framing sat in an accepted ADR, a spec section, three role templates, a WhatsApp inbox and twelve screens.

## What Stayed

The review itself was good, and it was never really about creators. A piece that goes back and forth keeps each round. The reviewer sees the current round beside the previous one. A revision request has to say why. An Approver can be pulled in early. All of that generalizes the post approval `press.md` already had, and it is what ADR-021 now decides, under a new title: Content Approval Pipeline. Versioned assets still move forward from v2, because review rounds still need them. The Editor and Approver templates stay.

## What Went

Creators as Contact records, tiers A to D, dispatch to creators, per-creator tracking, tier-routed approval, the two-way WhatsApp inbox, per-creator engagement, the Creator Manager template, and creator compliance. ADR-021 lists them under a heading that says it no longer decides them, rather than deleting them silently. `integrations.md` is back to what it said before ADR-021. Eight of twelve content-operations screens went, which takes the platform from 248 screens to 240. The glossary keeps the creator vocabulary in a table of retired terms, so that if the words come back, somebody notices.

## The Flow That Replaced It

The WhatsApp conversation is now ADR-018's worked example, in place of the creator prototype's AI screens. It is a better example because it is the one we actually want, and it runs into the gate at every turn. The agent reads strategy, the knowledge base and the calendar. It writes first, at dawn, before anyone asks. It generates images. It schedules what the candidate approves, which is where "no agent dispatches" meets its first real case: does a tap on Approve count as the candidate's send? Staff change a piece after it was approved. And the audit log has no way yet to say that the candidate approved something through an agent.

The pipeline answers one of those without the agent: approval covers one round, and nothing unapproved goes out. Whether the candidate can approve from WhatsApp with no agent at all is a separate question, and it is written down as open in `press.md` rather than decided in passing.

## Where It Stands

| Artifact | Count | Status |
|---|---|---|
| ADRs | 21 | 20 accepted, 1 proposed; ADR-021 revised and renamed |
| Screens | 240 | 8 creator screens removed |
| Diary entries | 15 | Current |
| Production gate | 1 | Open, with a new worked example |

## Next

The review, as before. Item 6 now has a concrete question at its centre: what a person's approval has to be, and record, for an agent to act on it.
