# Campaign Approval Demo Spec

**A working demonstration, to open the door for GreenGrass with real candidacies and regional committees**

Status: a pitch, not a specification. Nothing it describes is accepted, and [ADR-018](../decisions/018-ai-agent-posture.md) remains proposed.
Code: in a separate private repository, `Onda-Corta/campaign-agent-demo`. It is not GreenGrass code. At the time of this revision it holds working code for most of its work plan: the bot and registration, the drafting, the approvals, the team's screen, the demo clock, the guardrails and the reset. The asset builder is being built there now, and a mock draws the artwork until it is ready.
Standalone version, for candidacies: [pitch.md](pitch.md).
Drafted: 2026-09-29
Revised: 2026-10-04, to match the demo repository's work plan (Telegram, principals, live registration)
Revised: 2026-10-06, to match the code in the demo repository and its decision to build the asset builder itself

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
- **The only real personal data is each person's own:** their messages, what they say about themselves when they register (name, role, region, or the candidate's name and office), and the photos a campaign supplies. They give them knowingly, in the demonstration. The first message says it is a demo, that everything is deleted at the end of the session, and that nothing is published. It also says that what they write goes through a model: an open-weight model that runs on Cloudflare. In GreenGrass that would be their own organization's BYOM provider. Telegram also carries the conversation, which is one more provider to name in that message.
- **Everything is deleted the same day**, at the end of the session, by a reset: a button on the team's screen, or one command. It closes registration under a new start code, deletes the messages from the Telegram chats themselves, wipes the ledger of everything but the seeded principal, and empties the store of generated artwork and PDFs. Telegram lets a bot delete a message only within 48 hours of sending it, which is one more reason to run the reset the same day; anything it cannot delete is reported. The model recordings it keeps are of the seeded principal's morning only, so they hold nothing a visitor wrote. The earlier plan let a campaign ask to keep its record; that exception is gone.
- **It does not publish.** There are no social media credentials anywhere in the system, and the simulated publisher refuses any output not flagged as demo output.
- **Everything it generates is marked as demo output**, on every surface: the artwork, the PDF, each chat message, the team's screen and the ledger. The mark comes from the harness, never from the model, so a prompt cannot remove it. This matters more now that visitors can name real candidates when they register.
- **It never invents a quote.** A reply from the model is checked before anything reaches the chat: a quote has to appear word for word in a public statement that someone checked by eye against its source, a figure has to appear in the folder or in the principal's message, and every source has to be in the principal's own folder. A reply that fails goes back to the model with the problems listed, up to three times, and then the morning fails instead of going out. For a candidacy whose only source is what a visitor typed, the output carries no words or positions that were not given. Gaps are shown, not filled.

Three things would take it across the line, and none is done while ADR-018 remains proposed: loading a contact list, connecting a real social media account, or anyone continuing to use it day to day after the pitch. If a candidacy asks to keep the tool, the honest answer is *not yet*, and the invitation is to the pilot.

## 4. The script

It takes about fifteen minutes, in eight segments: the problem, the proposal and the rule, the seeded principal's morning, the room joining, what the demonstration does not do (told while the room's mornings are being drafted), what came back to one visitor, the ask, and the close. The run of show, with what each person does and says, is in the demo repository at `docs/run-of-show.md`. The morning runs on a demo clock from 5:30 to 7:18. For the seeded morning the clock runs at real speed and the team's screen skips it forward to each beat, so the whole morning takes about five minutes and the clock never gets ahead of what is being said. Three roles are needed on the day: whoever narrates, whoever holds the phone for the seeded principal, and whoever runs the team's screen and the clock on a computer the audience can see. Who takes each is not yet decided (§13).

### Before it starts

1. The seeded principal's phone opens the bot and presses `/start`. On Telegram a bot cannot write first until the person has done that once, so this records their opt-in. No window or approved template is involved. Until the candidate's own phone is used, a phone of the team's stands in for it, and the narrator says so.
2. Someone rehearses the run on the seeded principal's folder (§8), and its model calls are recorded so the morning can be replayed (§5). Before the doors open, the reset runs, the seeded principal's calls are set to replay, the clock stands at 5:30, and the cost caps and the kill switch are checked.

### The rehearsed morning

3. On the team's screen, the operator starts the demo clock. At 5:30 on that clock the Campaign Agent writes first to the seeded principal: good morning, the day's agenda from the folder (marked as simulated), and what to focus on today. Only the seeded principal gets this greeting; visitors write first. The previous revision of this spec had a person tap **Start day** instead; the demo repository chose the clock (§7 point 2).
4. The principal answers with a text message: the topic, the tone, and whatever is on the agenda, typed or dictated with the phone's own keyboard. In the seeded morning the topic is health, the Plan Universal de Salud. A message too short to work from gets a request for more, and a voice note gets a one-line reply asking for text. Voice-note transcription was dropped: phones already dictate, and it is not what the demonstration sells. While the model works, the agent says it needs a moment.
5. The agent sends three key messages in the chat, then talking points drafted from the principal's folder, as a PDF. Each point cites the public statement it rests on, with its outlet and date. Where the folder lacks a fact, the agent leaves a visible gap instead of inventing one. That is [ADR-013](../decisions/013-analytics-ai.md)'s guardrail, and it is worth pointing out aloud. For the seeded morning the gaps are real ones, such as the Medicaid fiscal cliff in 2027, on which the candidate has said nothing in public.
6. The agent recommends four pieces: X, Facebook, an Instagram post and an Instagram story. Each arrives as its own card: the piece's artwork, the network, the version, the headline on the artwork, the post's copy, and three buttons: **Aprobado**, **Pedir cambios** and **Descartar**.
7. The principal taps a button on each card. The card edits itself in place to show the decision, with the approver's name and the time: "Aprobada por Juan Dalmau · 6:46 a. m.". While the morning runs on the demo clock, the time on the card is the clock's; the ledger keeps the real one.

### The round of changes

8. When the principal taps **Pedir cambios**, the agent asks what they would change and takes their next message as the comment. The comment is required, as in the [content pipeline](../decisions/021-content-approval-pipeline.md#the-content-pipeline-generalizes-post-approval): in the seeded morning, "say that today at 10 I'm visiting the CDT". Until the comment arrives nothing is recorded, and the principal can still approve or discard instead. The request then lands on the team's screen and opens a new round.
9. On the team's screen, someone writes the new version, starting from the latest one and held to the same length limits as the model's copy, and sends it. It arrives in the principal's chat as a new card that names who wrote it and quotes the change asked for, and the older cards are rewritten as replaced, without buttons. The principal approves it there. The team can also edit a piece on its own initiative; a new version voids any earlier approval. The team writes every new version: the agent does not offer a redraft.

### The room joins

10. Everyone else opens one shared link, `t.me/<bot>?start=<code>`. The first question is whether they work for a committee or for a candidate's campaign. Then name, role and region for a committee, or the candidate's name and office for a campaign, and an optional theme. That creates a principal of the chosen kind from a template (§8), with the person as its approver; for a candidate's campaign the visitor stands in for the candidate. They then write their own morning message and run steps 4 to 9, unscripted, with live model calls. Opening the link again resumes, and never creates a duplicate. Once the cap on visitors is reached, the next one is told the demo is full, and nothing is stored.

### Close

11. The demo clock reaches 7:18 and the simulated publisher settles every open piece: **published** if a named person approved its latest version and that approval still stands, **held** otherwise, with the reason. Both are final. Publishing is a row in the ledger and nothing more: no network, no account and no chat message. The rehearsed morning leaves one piece unapproved on purpose, so a held piece is seen.
12. The team's screen shows what the audience did not see on their phones:
    - The **threads** across committees and candidates, grouped by who has to act (the team, the agent, the principal, or no one), most urgent first. Each names its principal and kind, says who it waits on and since when, and is marked when something new happened on it. A thread that has waited on the agent for more than ninety seconds is marked as stalled.
    - A **stream** per principal: everything that principal did and everything done for them, filterable by principal.
    - A **thread detail**. For a piece: its versions side by side, who wrote each, every decision on it, the morning it came from with its sources and gaps, and what each call cost, model and builder, passed through at cost. For a conversation: the chat, where the team can write to the principal, retry a morning that failed, take the thread over when the model stalls, set that principal's own cost cap, or remove a visitor.
    - The **controls**: registration open or closed, the shared link and its code, the cap on visitors and on cost with what has been spent, a kill switch for every model call, the reset, and the clock, on a panel of its own.

## 5. What is real and what is simulated

| Step | Status | How |
|---|---|---|
| Telegram conversation, cards and buttons | Real | Telegram Bot API, with inline keyboards. Each piece is a card with its artwork and three buttons, which edits in place after a tap |
| Key messages, talking points and piece copy | Real | GLM-5.3, an open-weight model on Workers AI picked by a bake-off, with structured output, checks on quotes, figures and sources, and up to three calls, over the principal's folder |
| Talking points PDF and the four artworks | Real | An asset builder inside the demo's own code: layouts drawn with an open-source engine and painted in a headless browser, with a brand kit per template set. No image is generated. A mock draws them until the builder is ready (§8) |
| Photos on the artwork | Not yet | Every artwork goes without a photo for now. Adding the campaign's photos is optional work before the pitch (§13) |
| Versions, approvals, audit and cost per call | Real | One ledger that the team's screen reads |
| Team writing the new version | Real | The team's screen |
| Voice-note transcription | Dropped | The principal types or dictates. A voice note gets a one-line reply |
| Strategy and knowledge base | Simplified | Whole documents placed in the prompt. No retrieval |
| The principal's agenda | Simulated | Read from the principal's folder, and marked as simulated wherever it is shown |
| Scheduling and publishing | Simulated | A demo clock runs 5:30 to 7:18; at 7:18 the simulated publisher publishes approved, demo-flagged versions and holds the rest. Nothing reaches a social network |
| The organization's own business number | Simulated | One shared bot for everyone, routed by Telegram user (§8) |
| Who approved | Simulated | The approver is whoever holds the Telegram account tied to the principal. The name on the card and in the ledger comes from the folder (the candidate, or the committee's president), never from Telegram |

There are **fallbacks**. Every model call can be recorded and replayed, so the scripted morning survives a provider failure; it covers the rehearsed run only, and the seeded morning replays its recording on the day. For live visitors a failed call gets a short reply in the chat, and the team's screen has a retry button and the option to take over the thread. If the asset builder's browser fails, the mock draws the artwork. If one artwork still fails, its card goes out as text; if the PDF fails, it is left out and the cards still go.

## 6. How it maps onto GreenGrass

Every part of the pitch corresponds to something the specification already names, and in two cases to something still proposed.

| In the pitch | In GreenGrass | Status |
|---|---|---|
| A principal's folder | An organization ([users.md § Organization Hierarchy](users.md#organization-hierarchy)): of type Candidate for a candidate. The spec has no regional-committee type, so a committee principal stands for an organization or campaign under a party. Every record carries the organization it belongs to | Accepted for candidates; committee not mapped |
| The Telegram adapter | Channel transport ([ADR-020](../decisions/020-central-service-line-up-and-builders.md#channel-transport)), on the architecture at [system.md § SMS / WhatsApp](../design/architecture/system.md#sms-whatsapp). Telegram is not a channel the architecture names | Accepted for the transport; Telegram not named |
| Drafting the talking points and pieces | The text builder ([ADR-020](../decisions/020-central-service-line-up-and-builders.md#builders-text-accepted-images-and-video-proposed)), with one difference that matters: here the agent invokes it, not a person with a brief | The difference is what ADR-018 decides |
| The asset builder, its layouts and brand kits | None. It sets an approved headline, a name and a date over a campaign's colours, type and logotype, and generates nothing, so it is not the image builder. It is the demo's own code, not a GreenGrass component | Outside the gate |
| Pieces, rounds, versions and approvals | The [content pipeline](../decisions/021-content-approval-pipeline.md#the-content-pipeline-generalizes-post-approval): every round kept, every revision request commented | Accepted |
| Usage events with their cost | [ADR-019](../decisions/019-central-services-and-metered-billing.md#two-billing-planes-and-no-margin-on-the-second)'s metering and pass-through at cost | Accepted |
| The record of each approval | The "on behalf of" relation, proposed for [ADR-018](../decisions/018-ai-agent-posture.md#what-this-adr-must-resolve) item 3 | Proposed |
| The simulated publisher | The social media adapter ([system.md § Social media](../design/architecture/system.md#social-media)), not connected | Accepted, not used |
| The Campaign Agent | ADR-018's agent harness, reduced to a single conversation per principal | Proposed |

## 7. The worked example's six points, in the pitch

ADR-018's worked example meets the gate in six places. The pitch decides none of them. What it does is pick, in each, the most conservative side that still lets the flow be seen.

| Point | What the pitch does |
|---|---|
| 1. Read scope | Each conversation's agent reads that principal's messages and its folder: strategy, public statements, agenda. It reads nothing of any other principal's. There are no contacts, voter records or donations to read: none exist in the pitch. The team's screen sees everyone by design. A visitor's message is fenced off in the prompt as material, not instructions, and a reply that cites anything outside that principal's folder is rejected. Tests run two principals at once, including a visitor who tries to make the agent copy the seeded principal's folder, and check that neither prompt, chat nor card reaches the other's |
| 2. It speaks first | In one narrow case. At 5:30 on the demo clock the agent writes first to the seeded principal, with the agenda and a question. The clock is started by a person on the team's screen, the conversation was opened by the principal pressing `/start`, and visitors always write first. So the agent speaks at a set time, but only on a clock someone starts, to someone who opted in, in a staged run. The previous revision of this spec kept a person tapping **Start day** in that role; the demo repository chose the clock. Whether a bound like this is enough is the review's question |
| 3. Generated images | None. The artwork is laid out from a brand kit, with the approved headline on it, and for now it carries no photos. If photos are added, they are the campaign's real photos, used with its permission. A committee principal has no personal name or photo at all. The identifiable-person question is left untouched for the review |
| 4. Who dispatches | The agent places the approved version in the schedule, and nothing more. The simulated publisher only takes approved versions: the database refuses a published row unless the version is the latest one and its approval stands. The agent holds no credential to publish, and in the pitch none exists. That shows the proposed answer — the tap on Aprobado counts as the principal's send — without deciding it |
| 5. Changes after approval | A new version voids the earlier approval, and an approval is tied to one exact version. If it is not approved by its time, it does not go out. The rehearsed morning leaves one piece unapproved on purpose, and the publisher holds it |
| 6. Audit | Each approval records the named person from the principal's folder as the actor, the Telegram account that tapped, the time, the agent as the channel, and the exact version. For a committee the actor is its president, a named role. It is a draft of the "on behalf of" relation, not the audit model the review has to define |

## 8. One folder per principal

The pitch has to run for any principal without touching the code. Everything specific to a principal lives in its folder, and the application loads whichever it is told to. Nothing in the schema assumes a personal name. Adding a principal is data work, not programming, and for visitors it happens by itself, through registration.

### What goes in the folder

A typed loader validates each folder. A folder holds:

- The principal's kind, `person` or `committee`, which changes only the voice and the identity: first person for a candidate, an institutional voice for a committee, never an invented personal quote.
- A biography or description, each fact with its source; for a committee, its region, and a named approver, the president.
- Its public accounts on each network.
- One to five themes.
- The agenda, which stands in for a calendar and is marked as simulated.
- A public-statements file, with a source URL for every claim. Each statement is marked as verbatim, which may be quoted, or as a paraphrase, which is never turned into a quote. This is what lets the demonstration show "cite only what is in the folder, show the gaps". For the seeded principal it is built from sourced research, and every verbatim quote is checked by eye against its source before it can be quoted.
- The gaps: facts the folder does not have, shown in the PDF and never filled in.
- A photo manifest, up to ten photos with captions. For a committee, photos of the region and its events rather than of a person.
- Which template set the asset builder uses, and optionally an accent colour.

Phone numbers, bot tokens and provider keys never go in the folder; they go in the deployment's configuration.

### The seeded principal and the two templates

There is one seeded principal, **Juan Dalmau** (`person`). His campaign has agreed. His morning is about health, and its content comes only from his public statements, each with its source. There are no other seeded principals, and the earlier plan for a first round of four candidacies is replaced by this.

Everyone else gets a principal from one of two folder templates, **committee** or **candidate's campaign**, filled in from the registration answers. The templates are the product surface for visitors, who give almost no material, so they carry sensible default themes and show gaps instead of inventing. Both templates hold no public statements, and their gaps say so. For a candidate's campaign the only source is what the visitor says, so the output never invents quotes or positions for the named candidate.

### Artwork templates

The artwork and the PDF come from an asset builder that, since 2026-10-06, the demo repository builds itself, as part of the same application. An earlier plan had it built separately, outside that repository, behind an agreed interface; the interface stays, now between the two halves of the application. Its request carries the headline and copy, the format (X, Facebook, Instagram post, Instagram story or PDF), a photo, the principal's identity, a flag `demo: true` and a `demo_label`. It rejects any request without the flag. It works with or without a person's name and photo.

The builder has a fixed half and a replaceable half. The fixed half is built once: the interface, the renderer, the demo mark, the checks, the fallback and a preview page where every sample is painted in every format. The replaceable half is the look: the layouts, the formats and their sizes, the brand kits and the body of the PDF. The artwork, layouts and formats are expected to be redesigned, so nothing in the fixed half depends on a particular layout or size. The first layout is a placeholder, adapted from an existing open-source design for social-media cards, so real artwork reaches the cards before the redesign; whether the redesign lands before the pitch is open (§13).

- **The engine.** The artwork is drawn with the engine of an open-source social-card project, `tarjetas-sociales`: a scene painter, text fitting that finds the largest size that fits and flags overflow, and a contrast audit. Each artwork is a scene painted on a canvas in a headless browser that stays warm between renders; the PDF is HTML printed by the same browser. Fonts are bundled with the application, never fetched while rendering.
- **The demo mark** is added by the harness after the layout composes the scene, inside the format's safe zones, so no layout, current or redesigned, can drop it. The page refuses to paint a scene without it, and the contrast audit checks it like any other text. The PDF carries a demo header and footer on every page and a line saying its content is generated and unverified.
- **The brand kits.** One per template set, candidacy and committee: one ink, one font family and a logotype. The team's designer supplies them; until then, a default typeface and inks.
- **What goes on an artwork.** The approved headline, the principal's name and role (or the committee and its region), the morning's date and the handle when there is one. The post's copy stays off the image. A headline that does not fit is flagged instead of drawn over the rest.

### One shared bot, routed by sender

In GreenGrass each organization has its own WhatsApp Business account ([integrations.md § WhatsApp Business API](integrations.md#whatsapp-business-api)). The pitch uses one Telegram bot for everyone and identifies each person by their Telegram user, the first time they open the link. Each person becomes their own principal, and the conversation is routed to its folder. One team's screen sees them all, so isolation between principals is a property of what each prompt is given, not of separate screens.

### Controlling who gets in

The link can be forwarded, so control is operational and sits with the operator: registration is closed except during the session, the start code rotates afterwards, cost is capped per principal and overall, the number of principals is capped (25 by default), and a global kill switch stops the next model call, including the next call of a morning already being drafted. A sender who is unknown while registration is closed, or who has the wrong code, gets one polite "demo cerrada" reply, and nothing is stored.

## 9. The audience

The first plan was a round of four candidacies from the pilot's two parties, one folder each. The current plan replaces it with one room: a narrated morning for one candidate, then the regional committee presidents and any campaign staff present registering themselves.

The seeded candidate is a Puerto Rico candidate and the language is Spanish throughout, so the round tests swapping the principal and its kind but not the language. Changing language is provided for, as a new set of the agent's messages and button labels, and is not exercised.

Two consequences from the pilot still hold. Each principal is its own organization, and nothing from one appears in another's pitch, which is the same rule the pilot promises each party. And [the asymmetry between the two parties](mvp.md#the-asymmetry-is-the-most-important-fact-in-this-plan) applies here too: GreenGrass builds the folders and templates, and a visitor is asked for as little as possible.

## 10. What each campaign supplies

For the live part, nothing in advance: Telegram on the phone, and the registration answers in §4 step 10. The seeded principal's content was assembled from public sources.

For a rehearsed morning of its own, which is only done with a campaign that has agreed to it:

- Five to ten photos the campaign has the right to use, with a word or two on what each shows.
- Its visual identity (a colour, a typeface it may use on the web, and its logo), or permission to use its party's or the Alianza's.
- Its public accounts on each network.
- Three to five topics, with what the person has already said publicly on each: the platform, press releases, interviews. The folder is built from that alone, and every talking point cites it.
- Their Telegram account, kept outside the folder.
- Their consent to their messages passing through the model provider during the pitch.
- An hour from someone on the team for the rehearsal.

## 11. What the pitch does not prove

- **That ADR-018's bounds are enough.** It applies them in the narrowest case possible: one conversation per principal, no voter data, no real publishing. The review still has to decide read scope, the threat model, audit, offline and the BYOM screen.
- **Anything about the image builder.** The asset builder generates no images, on purpose.
- **That the agent never misstates a position.** The checks catch invented quotes, figures, sources and links. They cannot catch an invented argument in the principal's voice that the folder does not support; the bake-off produced one. Approval is the safeguard: nothing goes out until a named person approves that exact version, and the talking points carry their sources so the person can check.
- **That the knowledge base scales.** A few documents fit whole in the prompt. A real knowledge base needs retrieval, and with it read-scope questions that do not come up here.
- **Anything about WhatsApp or Meta onboarding.** Telegram removes business verification, the display-name review and the 24-hour window, which are the slow and constraining parts ([integrations.md § WhatsApp Business API](integrations.md#whatsapp-business-api)). The pitch says nothing about how they go.
- **That the agent holds up against a hostile or careless visitor.** The room is invited, the registration is gated and the costs are capped. That is a test of a friendly room, not of an open one.
- **That people will adopt it.** A candidate or a president liking it in a demonstration does not mean their campaign will use it every day.
- **What it would cost.** The costs the team's screen shows are real but cover one morning: about a cent and a half of model time for the seeded morning and about half a cent for a visitor's. They give an order of magnitude, not a price.

## 12. How it is built

A TypeScript application on Cloudflare Workers, with D1 as the ledger and R2 for the generated images and PDFs. The model is GLM-5.3, an open-weight model on Workers AI, run with low reasoning. A short bake-off picked it over Kimi K2.6 and DeepSeek V4 Pro: it wrote the best Spanish copy, returned valid structured output on the first call, and took 13 to 60 seconds per morning. This is not the stack decided in [system.md](../design/architecture/system.md): the demonstration is throwaway, and D1 was chosen partly to get hands-on with it. D1 has no realtime feed, so the team's screen short-polls it every two seconds.

The harness receives the Telegram webhook, checks its secret token, handles each update once, acknowledges at once and does the work after, and holds the routing, the registration, the approval state machine, the demo clock and the simulated publisher. A morning takes longer to draft than a webhook may run, so it goes through a queue. The ledger holds principals, pieces, versions, approvals tied to an exact version, publications, cost events and the message log, all flagged as demo. The asset builder is part of the same application: a single long-lived worker keeps one headless browser warm and opens a tab per render, in Cloudflare Browser Rendering.

The work plan, with owners, dependencies and cut lines, is in the demo repository at `docs/work-plan.md`. The target is a clean fifteen-minute run by Monday, 2026-10-12. The order:

1. Decisions: stack, model, channel wording, principals, registration, retention.
2. Foundations: the ledger schema, the asset builder's interface with a mock, the folder format and its content, the webhook, the registration flow and the channel client. The bot itself is a fifteen-minute manual setup.
3. The loop: the text builder, the recorded fallback and the story of the seeded morning.
4. The approval state machine, then the integration with the real asset builder.
5. The team's screen, the demo clock, the reset and the live-visitor guardrails.
6. A first end-to-end run, then fixes, a timed dry run, a dress rehearsal with fixed roles and a clean run from the reset state, with a screen recording as a backup.

At the time of this revision steps 1 to 3 and 5 are done, and step 4 is done except the real asset builder. What remains is that builder (the pipeline, the placeholder layout, the PDF and, optionally, photos), making it the default instead of the mock, the brand kits, the redesign if it is done before the pitch, and step 6.

If time slips, the cuts go in this order: the team's screen is reduced to the inbox and thread detail, the round of changes to one piece, the Instagram story to a static mock, and a late asset builder to the placeholder layout without photos, then to the mock. A redesign that is not ready leaves the placeholder layout. If a second kind of principal is not ready, the demonstration runs one kind live and shows the other from the recording. If open registration is not solid, the operator creates each president's principal in advance.

## 13. Open questions

1. **Roles on the day.** Who narrates, who holds the phone and who runs the team's screen, and whether the team's designer is available the weekend before for the slides and a review of the artwork.
2. **The redesign.** The first layout is a placeholder. Whether the artwork, the layouts and the formats are redesigned before 2026-10-12 or after the pitch is not decided. The rest of the asset builder does not change either way.
3. **Photos.** Whether the artwork carries the campaign's photos at the pitch. For now every artwork goes without one, and adding them is optional work. A demonstration without photos still shows the flow, but looks less like what a campaign posts.
4. **Recordings.** A recording of the pitch carries a real person's voice or words saying things an agent drafted. It is not shown to another campaign without that person's written permission. The backup screen recording carries the same demo marking.
5. **What to offer whoever says yes.** The answer to "I want to use it tomorrow" is the pilot, and the pilot waits on the ADR-018 review for anything agent-shaped. That has to be said well, and before anyone asks.
6. **What a committee maps to.** The specification has no regional-committee organization type (§6). Whether a committee is a campaign under a party or something new is not decided here.
