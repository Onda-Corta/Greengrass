# Coaching

**AI coaches for every role, built on what the organization says about itself**

Status: proposed in [ADR-028](../decisions/028-coaching.md). Two things are decided: Coaching is part of the Core, and the name is *Coach* in English and in Spanish. Everything else here is proposed. Nothing here reaches production in either lane before the [ADR-018](../decisions/018-ai-agent-posture.md) review is accepted, and the parts listed under [What waits on the ADR-018 review](#what-waits-on-the-adr-018-review) are recorded, not specified.
Drafted: 2026-11-25

---

## Purpose

People who organize learn the craft from other people: how to run a first meeting, what to do when a group stalls, how to bring a quiet member in, what to say when a decision lands badly. In the places GreenGrass is built for, there is rarely a trainer in the room when the question comes up.

A coach is that help, in the product, at the moment it is needed. It is a conversation with a model, set up for one role or one purpose, that advises, explains and drafts. It works from what the person tells it and from what the organization has written about itself, and it does nothing on its own.

## What a coach is

A coach helps a person with their own work. Three AI features sit beside it, and each does something else.

| | AI concierge | Text builder | Chat | Coach |
|---|---|---|---|---|
| For | Help with the platform | A draft from a brief | Doing the work | Thinking through the work |
| Reads | The knowledge base and platform documentation | What the person hands it | What the person may read, when they ask | The conversation, attachments, and the context the organization designates |
| Acts | No; escalates to a person | No; returns a draft | Yes; every write confirmed | No |
| Where it is decided | [support.md § Onboarding Concierge](support.md#onboarding-concierge) | [ADR-020](../decisions/020-central-service-line-up-and-builders.md#builders-text-accepted-images-and-video-proposed) | [ADR-023](../decisions/023-surfaces-chat-admin-field.md#the-chat-as-the-persons-hands), proposed | This document, proposed |

Typical questions for a coach:

- "Two members keep clashing in meetings and the rest have gone quiet. What do I do?"
- "We lost the vote on the budget. Help me write the announcement."
- "I have four new volunteers on Saturday. How do I run the first hour?"
- "Which of these three priorities should the committee take first, given our strategy?"

## Who has a coach

### Role coaches

Each role template in [users.md § Permissions Model](users.md#permissions-model) has a coach, except Supporter: the Org Admin, each staff template, the Volunteer, the Volunteer Team Lead and the Candidate. A person sees the coaches for the roles they hold.

The lane supplies each role coach's starting instructions. In Greengrass they speak to political organizing; Basecamp supplies its own roles and its own instructions. The organization's context layer then applies to all of them.

### Coaches the organization writes

An organization can add coaches for its own purposes: a coach for new committee chairs, one for its press volunteers, one for its election-day captains. A written coach has:

- **A name and a one-line purpose,** shown where people choose a coach.
- **Instructions:** what it helps with, how it should speak, what it should send people elsewhere for.
- **Context documents:** which of the organization's designated documents it may use.
- **Who may open it:** by role.
- **Suggested starters:** a few prompts shown before the first message, such as *A group is stuck*.

Who may write a coach is open ([Open questions](#open-questions)).

## The organization's context layer

The organization writes once what every coach builds on.

- **Mission and voice.** What the organization is for, who it serves, how it speaks.
- **Guardrails.** Topics a coach declines, positions it never takes, words it avoids. A coach that reaches a guardrail says so and points the person to someone in the organization.
- **Context documents.** Items from the content store ([ADR-021](../decisions/021-content-approval-pipeline.md)) the organization designates as coach context: its strategy, its training materials ([support.md § In-Platform Training Module](support.md#in-platform-training-module)), its knowledge base. Each coach uses only the documents designated for it.

Rules:

- The layer belongs to one instance and never crosses to another.
- A document held under a sharing contract cannot be designated ([ADR-017](../decisions/017-sharing-contract-trust-model.md)).
- Changing the layer is logged with the person who changed it.
- The lane supplies defaults, so a new organization's coaches work before it has written anything.

## A conversation with a coach

- **Starting.** From a coach's page, from the coach box on a role's home page, or from a suggested starter.
- **Input.** Typing, or a voice note transcribed in the person's language.
- **Attachments.** A document or image the person adds becomes part of that conversation only.
- **Past conversations.** A person can return to their own past conversations. How long they are kept, and whether anyone else can read them, is a question for the review.
- **Sharing.** A share button sends a read-only copy of a conversation to someone else in the instance. What that does to retention and to the people named in it is a question for the review; until it is answered, sharing is drawn and not specified.
- **The notice.** Every conversation shows that coaches use AI and can make mistakes, and that important information should be checked before anyone acts on it.

## Grounding and citations

A coach says what each part of its answer rests on.

- **From the organization:** a statement taken from a context document cites the document.
- **From a published author:** an idea taken from a book or study names the author and the work, so the person can look it up and judge it.
- **Its own advice:** everything else is offered as advice, not as fact.

A coach states no fact, figure or claim about the organization that is not in the conversation or the context, as [ADR-013](../decisions/013-analytics-ai.md) requires of generated messages. This adapts [comms-intelligence.md § 8.2 Provenance is mandatory](comms-intelligence.md#82-provenance-is-mandatory) to advice. The concierge keeps its stricter rule, the knowledge base and nothing else ([system.md § AI concierge](../design/architecture/system.md#ai-concierge)), because a wrong answer about election law or compliance has real consequences, and a coach that hits such a question sends the person to the concierge or to staff.

## What a coach never does

Until the ADR-018 review says otherwise:

- **It never speaks first.** No message, briefing or reminder arrives from a coach unless the person opened the conversation.
- **It never acts.** It changes no record, creates no task, sends nothing to anyone. A draft leaves the conversation only when the person copies it, and then enters whatever approval that kind of content has.
- **It never reads records.** No contacts, voter records, groups, messages, donations, events, audit data or compartments. If the person pastes something in, the coach reads what was pasted.
- **It never decides about a person.** It does not score, rank or label anyone.

## Languages

A coach answers in the language the person writes in, and falls back to their profile language, as the concierge does. Role coaches' instructions and the lane's defaults are written in English and Spanish first, and in each new language before a country launches. An organization writes its context layer in the languages it works in. A context document in another language can be used, and the coach says when it is quoting across languages.

## Cost

Every turn is an inference call. It is metered under [ADR-019](../decisions/019-central-services-and-metered-billing.md) and priced by the lane's rule ([ADR-026](../decisions/026-two-lane-pricing.md)), or billed to the organization by its own provider under BYOM. The organization can set a spend cap for coaching as it can for any metered service. Who pays when a volunteer talks to a coach, and what the default tier includes, is open.

## Offline

A coach needs a connection. Without one, the coach page says so and offers the person's past conversations if they are kept on the device, which is itself a question for the review. No field task depends on a coach ([ADR-005](../decisions/005-offline-first-sync.md)).

## What waits on the ADR-018 review

The product that prompted this document does more than the bounds above allow. Each of these is recorded so the review sees all of it, and none is specified for production.

### Briefings

A summary of the person's scope at the start of the day: how many groups are active, who is due for contact, who has not finished setup, which group has stalled. It reads beyond the conversation, and it either speaks first or runs on a schedule a person set.

### Recommended actions

A ranked list of suggestions with a reason each: "You have not spoken with a member in 54 days — the quiet ones are easy to overlook." It reads contact history and ranks identifiable people, and [ADR-016](../decisions/016-cross-cutting-resolutions.md) §49's promise that staff can see exactly why a suggestion was made does not hold for a model.

### Acting from a coach

*Add task* and *Reach out*, on a recommendation or inside a conversation. Under the chat-as-hands proposal each would be a declared operation confirmed with a card.

### Reading records

A leader asks about their own group, and the coach reads the group's roster, attendance and recent activity to answer.

### Coaches in other channels

A coach in Telegram or Signal rather than in the app. This turns on the default chat channel ([ADR-023 § Cost and channel](../decisions/023-surfaces-chat-admin-field.md#cost-and-channel)).

Briefings and recommended actions have a version outside the gate: counts and rules computed without a model and shown as an ordinary dashboard. That version needs a specification of standing local groups and the people who lead them, which the corpus does not have ([users.md § Volunteer Team Lead](users.md#volunteer-team-lead) is a role for one operation, not for a group over months).

The twelve questions this sends to the review are listed in [ADR-028 § Questions sent to the ADR-018 review](../decisions/028-coaching.md#questions-sent-to-the-adr-018-review).

## Open questions

1. **Who may write a coach.** The Org Admin only, staff, team leads, or an alliance or association for its members over the bus ([ADR-024](../decisions/024-event-bus-as-federation.md), itself proposed).
2. **Who writes and maintains the organizing knowledge coaches draw on.** GreenGrass, the lane, the client or partners, and in which languages.
