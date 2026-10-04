# Campaign Approval Demo Spec

**A working demonstration, to open the door for GreenGrass with real candidacies and regional committees**

Status: a pitch, not a specification. Nothing it describes is accepted, and [ADR-018](../decisions/018-ai-agent-posture.md) remains proposed.
Code: in a separate private repository, `Onda-Corta/campaign-agent-demo`. It is not GreenGrass code. At the time of this revision it holds a work plan and no application code.
Standalone version, for candidacies: [pitch.md](pitch.md).
Drafted: 2026-09-29
Revised: 2026-10-04, to match the demo repository's work plan (Telegram, principals, live registration)

---

## 1. What it is for

GreenGrass has a complete specification and nothing it can show. You do not sell a candidate on 21 ADRs. You sell them on something that happens on their own phone.

This pitch shows one thing working: the Campaign Agent writes to the person it works for in a chat, they tell it what the day is about, they receive talking points and four pieces for social media, they approve each one with a button, the team writes new versions of the pieces they ask to change, and they approve those. It is [ADR-018](../decisions/018-ai-agent-posture.md#worked-example-approving-the-days-posts-over-whatsapp)'s worked example as the earlier prototype drew it, with the person holding the phone and, in this version, the audience holding theirs.

The audience is wider than the first plan assumed. It includes regional committee presidents as well as campaigns, so the unit the agent works for is a **principal**: a candidate (`person`) or a regional committee (`committee`). The narrated morning is one candidate's. The rest of the room registers live and gets a morning of their own.

This flow was chosen for three reasons:

1. **It happens in a chat, on their own phone.** The pitch asks nobody to learn a new screen. In the target markets the campaign runs on WhatsApp, and the demonstration runs on Telegram as a stand-in (§2), so the one thing it asks is a free app.
2. **It shows the rule that makes GreenGrass trustworthy.** Nothing goes out unless a named person approved that exact version. In the pitch that is not a promise; it is on screen.
3. **It serves the ADR-018 review.** Running the worked example with real people produces concrete evidence on the six places it meets the gate (§7).

## 2. What it is not

- **It is not the MVP.** The [MVP](mvp.md) tests whether sovereign political organizations will pool their data. This pitch tests neither that assumption nor any other: it opens the conversation. The two must not be confused.
- **It is not GreenGrass code.** It lives in `Onda-Corta/campaign-agent-demo`, outside this corpus. None of that code moves into the platform without first clearing the ADR-018 review.
- **It does not accept ADR-018.** It runs inside the bounds the proposal under review suggests, and so puts them to the test, but it does not decide them. ADR-018 remains proposed.
- **It publishes nothing.** No piece reaches a real X, Facebook or Instagram account.
- **It does not commit GreenGrass to Telegram or to WhatsApp.** The demonstration runs on Telegram because it needs no business verification, display-name review or approved templates: a bot is set up in minutes. WhatsApp's business terms prohibit political party activity, so the pitch does not promise it either. The wording on slides and in the run of show is "the demonstration runs on Telegram; the production channel is decided with each campaign". The demonstration keeps the channel behind a thin interface so another can be added.

## 3. On the safe side of the gate

[ADR-018 § The review is a precondition on production, not on prototyping](../decisions/018-ai-agent-posture.md#the-review-is-a-precondition-on-production-not-on-prototyping) draws the line at production and at any deployment holding real voter, donor or member records. The pitch stays on this side of it:

- **It holds no voter, donor or member records.** There is no CRM, no list, and none is loaded.
- **The only real personal data is each person's own:** their messages, what they say about themselves when they register (name, role, region, or the candidate's name and office), and the photos a campaign supplies. They give them knowingly, in the demonstration. The first message says it is a demo, that everything is deleted at the end, and that nothing is published. They are told that their messages pass through a model provider. In GreenGrass that would be their own organization's BYOM provider. Telegram also carries the conversation, which is one more provider to name in that message.
- **Everything is deleted the same day**, at the end of the session, by a reset script that leaves only the seeded principal. The earlier plan let a campaign ask to keep its record; that exception is gone.
- **It does not publish.** There are no social media credentials anywhere in the system, and the simulated publisher refuses any output not flagged as demo output.
- **Everything it generates is marked as demo output**, on every surface: the artwork, the PDF, each chat message, the team's screen and the ledger. The mark comes from the harness, never from the model, so a prompt cannot remove it. This matters more now that visitors can name real candidates when they register.
- **It never invents a quote.** For a candidacy whose only source is what a visitor typed, the output carries no words or positions that were not given. Gaps are shown, not filled.

Three things would take it across the line, and none is done while ADR-018 remains proposed: loading a contact list, connecting a real social media account, or anyone continuing to use it day to day after the pitch. If a candidacy asks to keep the tool, the honest answer is *not yet*, and the invitation is to the pilot.

## 4. The script

It takes about fifteen minutes, and publication times run on a demo clock. In the earlier prototype the morning ran from 5:30 to 7:18, and the clock compresses that span. Three roles are needed on the day: whoever narrates, whoever holds the phone for the seeded principal, and whoever runs the team's screen on a computer the audience can see. Who takes each is not yet decided (§13).

### Before it starts

1. The seeded principal opens the bot and presses `/start`. On Telegram a bot cannot write first until the person has done that once, so this records their opt-in. No window or approved template is involved.
2. The day before, someone rehearses the run on the seeded principal's folder (§8). A recorded fallback exists for it (§5).

### The rehearsed morning

3. On the team's screen, a person taps **Start day**. The Campaign Agent greets the principal by name and asks what to focus on today. The earlier prototype had the agent write at 5:30 by itself; the demonstration keeps a person in that role (§7 point 2).
4. The principal answers with a text message: the topic, the tone, and whatever is on the agenda, typed or dictated with the phone's own keyboard. In the seeded morning the topic is health, the Plan Universal de Salud. A voice note gets a one-line reply asking for text. Voice-note transcription was dropped: phones already dictate, and it is not what the demonstration sells.
5. The agent drafts talking points from the principal's folder and sends them as a PDF, with a summary of three short messages. Each point cites the public statement it rests on. Where the folder lacks a fact, the agent leaves a visible gap instead of inventing one. That is [ADR-013](../decisions/013-analytics-ai.md)'s guardrail, and it is worth pointing out aloud. For the seeded morning the gaps are real ones, such as the federal funding the plan would replace.
6. The agent recommends four pieces: X, Facebook, an Instagram post and an Instagram story. Each arrives as its own card: an image with the mockup of how it would look on the network, the piece number, the network, the time it would go out, and three buttons: **Aprobado**, **Pedir cambios** and **Descartar**.
7. The principal taps a button on each card. The card edits itself in place to show the decision, and the agent confirms how many were approved.

### The round of changes

8. When the principal taps **Pedir cambios**, the agent asks what they would change and takes their next message as the comment. The comment is required, as in the [content pipeline](../decisions/021-content-approval-pipeline.md#the-content-pipeline-generalizes-post-approval): "shorter and tied to the interview", "a different photo". The request lands on the team's screen and opens a new round, and the piece's earlier approval is void.
9. On the team's screen, someone writes the new version and sends it. It arrives in the principal's chat as a new card, which they approve there. The team can also edit a piece on its own initiative; that voids the approval in the same way.

### The room joins

10. Everyone else opens one shared link, `t.me/<bot>?start=<code>`. The first question is whether they work for a committee or for a candidate's campaign. Then name, role and region for a committee, or the candidate's name and office for a campaign, and an optional theme. That creates a principal of the chosen kind from a template (§8), with the person as its approver; for a candidate's campaign the visitor stands in for the candidate. They then run their own morning, steps 3 to 9, unscripted. Opening the link again resumes, and never creates a duplicate.

### Close

11. The demo clock moves forward. The simulated publisher marks each approved piece as published at its time, and the agent tells the principal as each one goes out. If a new version was left unapproved, it is held, and the screen shows it.
12. The team's screen shows what the audience did not see on their phones, in four views:
    - An **inbox** of every open thread, across committees and candidates, each with its principal, its kind, its state (awaiting the principal, awaiting the team, approved, held), its last activity and an unread badge, sorted by urgency and updating live.
    - A **stream** per principal: everything that principal did and everything done for them, filterable by principal.
    - A **thread detail**: the conversation, each piece's rounds side by side, who approved which version, and what each call cost, passed through at cost. The team can take over a thread when the model stalls.
    - The **controls**: registration open or closed, the start code, a cap on principals and on cost, a kill switch, and a list of self-registered principals that can be removed.

## 5. What is real and what is simulated

| Step | Status | How |
|---|---|---|
| Telegram conversation, cards and buttons | Real | Telegram Bot API, with inline keyboards. Each piece is a card with the image and three buttons, which edits in place after a tap |
| Talking points and piece copy | Real | An open-weight model on Workers AI, with structured output and validation, over the principal's folder |
| Talking points PDF and the four artworks | Real | A separate asset builder, from templates, behind an agreed interface. No image is generated |
| Versions, approvals, audit and cost per call | Real | One ledger that the team's screen reads |
| Team writing the new version | Real | The team's screen |
| Voice-note transcription | Dropped | The principal types or dictates. A voice note gets a one-line reply |
| Strategy and knowledge base | Simplified | Whole documents placed in the prompt. No retrieval |
| The principal's agenda | Simulated | Read from the principal's folder |
| Scheduling and publishing | Simulated | A demo clock compresses 5:30 to 7:18; the simulated publisher takes only approved, demo-flagged versions. Nothing reaches a social network |
| The organization's own business number | Simulated | One shared bot for everyone, routed by Telegram user (§8) |
| Who approved | Simulated | Telegram shows no phone number, so the approver is a Telegram display name mapped to a named person in the folder |

There is also a **fallback**: every model call can be recorded and replayed, so the scripted morning survives a provider failure. It covers the rehearsed run only. For live visitors a failed call gets a short reply in the chat ("dame un momento"), and the team's screen has a retry button and the option to take over the thread.

## 6. How it maps onto GreenGrass

Every part of the pitch corresponds to something the specification already names, and in two cases to something still proposed.

| In the pitch | In GreenGrass | Status |
|---|---|---|
| A principal's folder | An organization ([users.md § Organization Hierarchy](users.md#organization-hierarchy)): of type Candidate for a candidate. The spec has no regional-committee type, so a committee principal stands for an organization or campaign under a party. Every record carries the organization it belongs to | Accepted for candidates; committee not mapped |
| The Telegram adapter | Channel transport ([ADR-020](../decisions/020-central-service-line-up-and-builders.md#channel-transport)), on the architecture at [system.md § SMS / WhatsApp](../design/architecture/system.md#sms-whatsapp). Telegram is not a channel the architecture names | Accepted for the transport; Telegram not named |
| Drafting the talking points and pieces | The text builder ([ADR-020](../decisions/020-central-service-line-up-and-builders.md#builders-text-accepted-images-and-video-proposed)), with one difference that matters: here the agent invokes it, not a person with a brief | The difference is what ADR-018 decides |
| The asset builder and its templates | None. They compose assets the campaign already has and generate nothing, so they are not the image builder | Outside the gate |
| Pieces, rounds, versions and approvals | The [content pipeline](../decisions/021-content-approval-pipeline.md#the-content-pipeline-generalizes-post-approval): every round kept, every revision request commented | Accepted |
| Usage events with their cost | [ADR-019](../decisions/019-central-services-and-metered-billing.md#two-billing-planes-and-no-margin-on-the-second)'s metering and pass-through at cost | Accepted |
| The record of each approval | The "on behalf of" relation, proposed for [ADR-018](../decisions/018-ai-agent-posture.md#what-this-adr-must-resolve) item 3 | Proposed |
| The simulated publisher | The social media adapter ([system.md § Social media](../design/architecture/system.md#social-media)), not connected | Accepted, not used |
| The Campaign Agent | ADR-018's agent harness, reduced to a single conversation per principal | Proposed |

## 7. The worked example's six points, in the pitch

ADR-018's worked example meets the gate in six places. The pitch decides none of them. What it does is pick, in each, the most conservative side that still lets the flow be seen.

| Point | What the pitch does |
|---|---|
| 1. Read scope | Each conversation's agent reads that principal's messages and its folder: strategy, public statements, agenda. It reads nothing of any other principal's. There are no contacts, voter records or donations to read: none exist in the pitch. The team's screen sees everyone by design, and a visitor's text never overrides the folder rules or reaches another principal's data, which is tested with two simultaneous principals |
| 2. It speaks first | No. A person taps **Start day**, and the conversation is open because the principal pressed `/start` or opened the link first. The version in which the agent writes on its own at a set time is not demonstrated. Whether the work plan keeps this reading is an open question (§13) |
| 3. Generated images | None. The artwork comes from templates and, where there are any, the campaign's real photos, used with its permission. A committee principal has no personal name or photo at all. The identifiable-person question is left untouched for the review |
| 4. Who dispatches | The agent places the approved version in the schedule, and nothing more. The simulated publisher only takes approved versions. The agent holds no credential to publish, and in the pitch none exists. That shows the proposed answer — the tap on Aprobado counts as the principal's send — without deciding it |
| 5. Changes after approval | A new version voids the earlier approval, and an approval is tied to one exact version. If it is not approved by its time, it does not go out. The pitch can leave one version unapproved on purpose so that this is seen |
| 6. Audit | Each approval records a named person as the actor, the agent as the channel, and the exact version. For a committee the actor is its president, a named role. It is a draft of the "on behalf of" relation, not the audit model the review has to define |

## 8. One folder per principal

The pitch has to run for any principal without touching the code. Everything specific to a principal lives in its folder, and the application loads whichever it is told to. Nothing in the schema assumes a personal name. Adding a principal is data work, not programming, and for visitors it happens by itself, through registration.

### What goes in the folder

A typed loader validates each folder. A folder holds:

- The principal's kind, `person` or `committee`, which changes only the voice and the identity: first person for a candidate, an institutional voice for a committee, never an invented personal quote.
- A biography or description; for a committee, its region, and a named approver, the president.
- Its public accounts on each network.
- Three to five themes.
- The agenda, which stands in for a calendar.
- A public-statements file, with a source URL for every claim. This is what lets the demonstration show "cite only what is in the folder, show the gaps". For the seeded principal it is built from sourced research, and every verbatim quote is checked by eye against its source before it goes into seed data.
- A photo manifest, five to ten photos with captions. For a committee, photos of the region and its events rather than of a person.
- The look and identity the asset builder uses.

Phone numbers, bot tokens and provider keys never go in the folder; they go in the deployment's configuration.

### The seeded principal and the two templates

There is one seeded principal, **Juan Dalmau** (`person`). His campaign has agreed. His morning is about health, and its content comes only from his public statements, each with its source. There are no other seeded principals, and the earlier plan for a first round of four candidacies is replaced by this.

Everyone else gets a principal from one of two folder templates, **committee** or **candidate's campaign**, filled in from the registration answers. The templates are the product surface for visitors, who give almost no material, so they carry sensible default themes and show gaps instead of inventing. For a candidate's campaign the only source is what the visitor says, so the output never invents quotes or positions for the named candidate.

### Artwork templates

The artwork comes from a separate asset builder, built outside this repository from the Alianza's templates and reached through an agreed interface. Its request carries the piece copy, the format (X, Facebook, Instagram post, Instagram story or PDF), a photo, the principal's identity, a flag `demo: true` and a `demo_label`. It rejects any request without the flag. Its templates work with or without a person's name and photo.

### One shared bot, routed by sender

In GreenGrass each organization has its own WhatsApp Business account ([integrations.md § WhatsApp Business API](integrations.md#whatsapp-business-api)). The pitch uses one Telegram bot for everyone and identifies each person by their Telegram user, the first time they open the link. Each person becomes their own principal, and the conversation is routed to its folder. One team's screen sees them all, so isolation between principals is a property of what each prompt is given, not of separate screens.

### Controlling who gets in

The link can be forwarded, so control is operational and sits with the operator: registration is closed except during the session, the start code rotates afterwards, cost is capped per principal and overall, the number of principals is capped (for example at 25), and a global kill switch stops all model calls within one request. A sender who is unknown while registration is closed, or who has the wrong code, gets one polite "demo cerrada" reply, and nothing is stored.

## 9. The audience

The first plan was a round of four candidacies from the pilot's two parties, one folder each. The current plan replaces it with one room: a narrated morning for one candidate, then the regional committee presidents and any campaign staff present registering themselves.

The seeded candidate is a Puerto Rico candidate and the language is Spanish throughout, so the round tests swapping the principal and its kind but not the language. Changing language is provided for, as a new set of the agent's messages and button labels, and is not exercised.

Two consequences from the pilot still hold. Each principal is its own organization, and nothing from one appears in another's pitch, which is the same rule the pilot promises each party. And [the asymmetry between the two parties](mvp.md#the-asymmetry-is-the-most-important-fact-in-this-plan) applies here too: GreenGrass builds the folders and templates, and a visitor is asked for as little as possible.

## 10. What each campaign supplies

For the live part, nothing in advance: Telegram on the phone, and the registration answers in §4 step 10. The seeded principal's content was assembled from public sources.

For a rehearsed morning of its own, which is only done with a campaign that has agreed to it:

- Five to ten photos the campaign has the right to use, with a word or two on what each shows.
- Its visual identity, or permission to use its party's or the Alianza's.
- Its public accounts on each network.
- Three to five topics, with what the person has already said publicly on each: the platform, press releases, interviews. The folder is built from that alone, and every talking point cites it.
- Their Telegram account, kept outside the folder.
- Their consent to their messages passing through the model provider during the pitch.
- An hour from someone on the team for the rehearsal.

## 11. What the pitch does not prove

- **That ADR-018's bounds are enough.** It applies them in the narrowest case possible: one conversation per principal, no voter data, no real publishing. The review still has to decide read scope, the threat model, audit, offline and the BYOM screen.
- **Anything about the image builder.** The artwork templates generate no images, on purpose.
- **That the knowledge base scales.** A few documents fit whole in the prompt. A real knowledge base needs retrieval, and with it read-scope questions that do not come up here.
- **Anything about WhatsApp or Meta onboarding.** Telegram removes business verification, the display-name review and the 24-hour window, which are the slow and constraining parts ([integrations.md § WhatsApp Business API](integrations.md#whatsapp-business-api)). The pitch says nothing about how they go.
- **That the agent holds up against a hostile or careless visitor.** The room is invited, the registration is gated and the costs are capped. That is a test of a friendly room, not of an open one.
- **That people will adopt it.** A candidate or a president liking it in a demonstration does not mean their campaign will use it every day.
- **What it would cost.** The costs the team's screen shows are real but cover one morning. They give an order of magnitude, not a price.

## 12. How it is built

A TypeScript application on Cloudflare Workers, with D1 as the ledger and R2 for the asset builder's images and PDFs, and an open-weight model on Workers AI. The model is picked by a short bake-off between Kimi K2.6, GLM-5.3 and DeepSeek V4 Pro, with Kimi K2.6 if there is no clear winner. This is not the stack decided in [system.md](../design/architecture/system.md): the demonstration is throwaway, and D1 was chosen partly to get hands-on with it. D1 has no realtime feed, so the team's screen short-polls it every second or two.

The harness receives the Telegram webhook, checks its secret token, handles each update once, acknowledges at once and does the work after, and holds the routing, the registration, the approval state machine, the demo clock and the simulated publisher. The ledger holds principals, pieces, versions, approvals tied to an exact version, cost events and the message log, all flagged as demo.

The work plan, with owners, dependencies and cut lines, is in the demo repository at `docs/work-plan.md`. The target is a clean fifteen-minute run by Monday, 2026-10-12. The order:

1. Decisions: stack, model, channel wording, principals, registration, retention.
2. Foundations: the ledger schema, the asset builder's interface with a mock, the folder format and its content, the webhook, the registration flow and the channel client. The bot itself is a fifteen-minute manual setup.
3. The loop: the text builder, the recorded fallback and the story of the seeded morning.
4. The approval state machine, then the integration with the real asset builder.
5. The team's screen, the demo clock, the reset script and the live-visitor guardrails.
6. A first end-to-end run, then fixes, a timed dry run, a dress rehearsal with fixed roles and a clean run from the reset state, with a screen recording as a backup.

If time slips, the cuts go in this order: the team's screen is reduced to the inbox and thread detail, the round of changes to one piece, the Instagram story to a static mock, and a late asset builder to one template reused. If a second kind of principal is not ready, the demonstration runs one kind live and shows the other from the recording. If open registration is not solid, the operator creates each president's principal in advance.

## 13. Open questions

1. **Roles on the day.** Who narrates, who holds the phone and who runs the team's screen, and whether the asset builder's author is available the weekend before.
2. **The asset builder's interface document.** It has to land in the demo repository before the contract and its mock can be written against it.
3. **Start day.** Whether the greeting is triggered by a person, as this spec holds, or by the demo clock at 5:30. The work plan says only that the greeting becomes a bot-initiated message once the recipient has pressed `/start`. A timer would be the autonomous-action case that §7 point 2 keeps out.
4. **Who writes the new version.** The work plan says the team writes and sends it, and also lists "v2 generation" under the approval state machine. Whether the agent offers a redraft for the team to edit is undecided.
5. **Recordings.** A recording of the pitch carries a real person's voice or words saying things an agent drafted. It is not shown to another campaign without that person's written permission. The backup screen recording carries the same demo marking.
6. **What to offer whoever says yes.** The answer to "I want to use it tomorrow" is the pilot, and the pilot waits on the ADR-018 review for anything agent-shaped. That has to be said well, and before anyone asks.
7. **What a committee maps to.** The specification has no regional-committee organization type (§6). Whether a committee is a campaign under a party or something new is not decided here.
