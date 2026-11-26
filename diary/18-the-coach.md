# Diary Entry 18: The Coach

**Date:** 2026-11-25

---

## The Task

On Tuesday I got on a call with Ned and Lars from Tectonica, in Barcelona. Lars shared his screen and walked me through a sandbox: an organization called Progressive Voter Action, full of sample data, with a yellow badge in the corner and a switch for viewing it as the organization or as the leader of a local group. I came out of the call with four screenshots and an idea I didn't have going in.

There was a lot on those screens. A daily briefing for the organization, a library of videos and tips sorted by where a group is in its life, to-do lists, notes, a public page for each group. Most of it maps onto something the spec already has, or something the spec decided not to have. The piece that stuck was the coach.

Every role in the sandbox has one. The organization's coach sits at the top of the administrator's home page, under "What do you need to get done today?", with suggestions like *A group is stuck* and *Announcement talking points*. The group leader's coach was in the middle of a conversation when Lars pulled it up. A member had gone to the leader privately about a problem, rather than raising it with the group, and the coach used that to explain Edgar Schein's distinction between a group and a pseudo-group: whether members can deal with their tensions with each other directly, or whether everything has to flow through the leader. Then it asked whether that matched what the leader was seeing.

That is organizing craft, and GreenGrass has almost none of it. We've spent two years specifying the plumbing of organizing (the CRM, consent per channel, turf, walk lists, the content pipeline) and almost nothing about how to actually do it. The corpus has an AI concierge that can walk you through WhatsApp Business verification, and a training module with quizzes and certification gates. Neither one helps a first-time committee chair figure out what to do when two members stop talking to each other. In the places this platform is built for, there is rarely a trainer in the room when that question comes up.

So the idea is Tectonica's, and I want that on the record. What follows is what happened when we tried to fit it into a corpus with a gate in the middle of it.

## Two Calls, and Two Left Open

The first call was the name. The sandbox says "eCoach", and that's their word. Ours is *Coach*, and it stays *Coach* in Spanish too, the same way *concierge* stayed *concierge*: *el coach*, *los coaches*, *el Coaching*. It's in the glossary now, with a note ruling out *asistente* and *agente*, which already belong to other things in this corpus, and *entrenador*, which sounds like the gym.

The second call was where coaching lives, and I put it in the Core. Whatever the ADR-018 review ends up deciding about agents (what they can read, what they can do, what gets logged when they do it), coaching is where most people are going to run into it. If coaching were a module, every client that switched it on would carry its own copy of those rules, and sooner or later the chat would be playing by one set and the coaches by another. It's the same argument we made for keeping consent in the CRM, and the same argument for keeping the CRM in the Core: one place where the rule holds, so it can't be honoured in one screen and ignored in the next.

Two questions I left open, on purpose and with no recommendation attached. Who gets to write a coach: only the Org Admin, staff, team leads, or an alliance writing coaches for its members over the bus. And who writes and maintains the organizing knowledge the coaches draw on, and in which languages. The second one is the expensive one. A lane-neutral coach is only as good as what somebody put into it, and nobody is named yet.

## What Fits Through the Gate

The irony of this ADR is that the parts of the sandbox that made it feel alive are exactly the parts we can't ship. The briefing that tells the administrator twenty leaders are due for a check-in. The recommendation that says "You have not spoken with Grace Osei in 54 days — the quiet ones are easy to overlook." The *Reach out* button next to it. Each of those reads across features, acts on a record, or speaks before anyone asked, and those are three of the four properties ADR-018 gates on.

So ADR-028 specifies a much smaller thing: a coach that reads the conversation, whatever the person attaches, and the documents the organization has designated for that coach, and returns text. It never speaks first, never acts, and never reads a record. Those are the bounds ADR-020 gave the text builders, applied to a conversation. Everything else from the sandbox is written down in a section that records it for the review and specifies none of it.

Even the small version isn't clearly through. Reading an organization's strategy and training materials is wider than reading one brief, and whether that counts as "read scope wider than a single feature" is a question only the review can answer. Until it does, ADR-028 treats the coach as gated. That question is the first of twelve the ADR sends to ADR-018, alongside reading records, a coach talking about named members, what happens to the conversations afterward and who can read them, prompt injection from an attached document, and whether a coach is really just the chat with a role's instructions and no tools.

There's a version of the briefing that sits outside the gate: counts and rules computed without a model and shown as a plain dashboard, which is what ADR-016 did for reallocation suggestions. It needs a specification of local groups first, and that turned out to be the more interesting gap.

## What the Sandbox Showed Us About the Spec

**There is no group leader.** The sandbox is built around standing local groups (a Ward 7 team with a recruitment goal of twenty and a public page of its own) and the people who lead them over months. The corpus has a Volunteer Team Lead, but that role exists for one canvassing day or one phone bank. Everything we've specified is organized around campaigns and operations, not around groups that meet every week whether or not there's an election. ADR-028 records the gap and does not fill it. Filling it is a spec of its own, and probably a conversation with the product side before that.

**The Schein citation became a rule.** The concierge is grounded strictly in the knowledge base, because a wrong answer about election law has real consequences. A coach can't work that way. Advice about a stalled group draws on what people have learned about groups, and some of that is in books. So the coach cites the organization's document when it draws on one, names the author and the work when it borrows an idea, and offers everything else as its own advice and not as fact. It's the provenance rule from comms intelligence, adapted from findings to advice. The concierge keeps its stricter rule, and a coach that runs into a question about compliance sends the person there.

One more detail I liked. The sandbox carried a banner over the coach saying that a real deployment would layer in the organization's own context (mission, brand, guardrails) and that this sandbox didn't have it yet. A demo that says plainly what it isn't is the same instinct as the pitch's rule that everything it generates is marked as demo output. That banner is also where the context layer in ADR-028 comes from: the organization writes its mission, voice and guardrails once, designates the documents its coaches can use, and every coach builds on that.

## Where It Stands

| Artifact | Count | Status |
|---|---|---|
| Specs | 17 | `coaching.md` added; product, support and users cross-referenced |
| ADRs | 28 | 22 accepted, 6 proposed |
| Decided in ADR-028 | 2 | Coaching is part of the Core; the name is *Coach* in English and Spanish |
| Questions sent to the ADR-018 review | 12 | Recorded in ADR-018 and ADR-028 |
| Roles the corpus lacks | 1 | A leader of a standing local group |
| Diary entries | 18 | Current |
| Production gate | 1 | Open, and now in front of the coaches as well as the chat |

## Next

The two open questions, which are the product side's to answer. A decision on whether standing local groups belong in the spec at all, because the rule-based briefing and most of what made the sandbox useful depend on it. And the review, which has twelve more questions on it than it did last week.
