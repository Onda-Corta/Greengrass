# Campaign Approval Demo Spec

**A working demonstration, to open the door for GreenGrass with real candidates**

Status: a pitch, not a specification. Nothing it describes is accepted, and [ADR-018](../decisions/018-ai-agent-posture.md) remains proposed.
Code: in a separate repository, `greengrass-demo`. It is not GreenGrass code.
Standalone version, for candidacies: [pitch.md](pitch.md).
Drafted: 2026-09-29

---

## 1. What it is for

GreenGrass has a complete specification and nothing it can show. You do not sell a candidate on 21 ADRs. You sell them on something that happens on their own phone.

This pitch shows a candidacy one thing working: the Campaign Agent writes to the candidate on WhatsApp, the candidate answers with a voice note, receives talking points and four pieces for social media, approves each one with a button, staff request changes to two, and the candidate approves the new versions. It is [ADR-018](../decisions/018-ai-agent-posture.md#worked-example-approving-the-days-posts-over-whatsapp)'s worked example as the prototype drew it, with the candidate holding the phone.

This flow was chosen for three reasons:

1. **It happens where the candidate already lives.** In the target markets, the campaign runs on WhatsApp. The pitch asks the candidate to install nothing and learn no new screen.
2. **It shows the rule that makes GreenGrass trustworthy.** Nothing goes out unless a named person approved that exact version. In the pitch that is not a promise; it is on screen.
3. **It serves the ADR-018 review.** Running the worked example with real candidacies produces concrete evidence on the six places it meets the gate (§7).

## 2. What it is not

- **It is not the MVP.** The [MVP](mvp.md) tests whether sovereign political organizations will pool their data. This pitch tests neither that assumption nor any other: it opens the conversation with candidacies. The two must not be confused.
- **It is not GreenGrass code.** It lives in `greengrass-demo`, outside this corpus. None of that code moves into the platform without first clearing the ADR-018 review.
- **It does not accept ADR-018.** It runs inside the bounds the proposal under review suggests, and so puts them to the test, but it does not decide them. ADR-018 remains proposed.
- **It publishes nothing.** No piece reaches a real X, Facebook or Instagram account.
- **It does not commit GreenGrass to WhatsApp.** The pitch uses WhatsApp because that is where the candidate already lives. In production it will very likely need a different channel: WhatsApp's business terms prohibit political party activity.

## 3. On the safe side of the gate

[ADR-018 § The review is a precondition on production, not on prototyping](../decisions/018-ai-agent-posture.md#the-review-is-a-precondition-on-production-not-on-prototyping) draws the line at production and at any deployment holding real voter, donor or member records. The pitch stays on this side of it:

- **It holds no voter, donor or member records.** There is no CRM, no list, and none is loaded.
- **The only real personal data is the candidate's own:** their messages, their voice notes and the photos their campaign supplies. They give them knowingly, in the demonstration, and are told beforehand that their voice passes through a transcription provider and their messages through a model provider. In GreenGrass those would be their own organization's BYOM providers.
- **Everything is deleted when the pitch ends**, unless the campaign asks to keep the record.
- **It does not publish.** There are no social media credentials anywhere in the system.

Three things would take it across the line, and none is done while ADR-018 remains proposed: loading a contact list, connecting a real social media account, or the candidate continuing to use it day to day after the pitch. If a candidacy asks to keep the tool, the honest answer is *not yet*, and the invitation is to the pilot.

## 4. The script

It takes two people. The candidate holds their phone. Someone from GreenGrass, or from the campaign, runs the staff screen on a computer the audience can see. In the prototype the morning runs from 5:30 to 7:18. In the pitch it takes about fifteen minutes, and publication times run on a demo clock.

### Before it starts

1. The candidate saves the Campaign Agent's number and sends it "Hola" from a `wa.me` link or a QR code. That opens the 24-hour conversation window and records their opt-in. Without that first message, the agent could only write to them with a template message approved by Meta.
2. The day before, someone from their team rehearses the run with the fictional folder (§8).

### The morning

3. On the staff screen, a person taps **Start day**. The Campaign Agent greets the candidate by name and asks what to focus on today.
4. The candidate answers with a voice note: the topic, the tone, and whatever is on the agenda. In the prototype, the loss of water service, in a firm but not alarmist tone, and a radio interview that morning.
5. The agent transcribes the note, drafts talking points from the candidacy's knowledge base and sends them as a PDF, with a summary of three short messages. Each point cites the passage it rests on. Where the knowledge base lacks a fact, the agent leaves a marker such as `[PROPUESTA]` instead of inventing one. That is [ADR-013](../decisions/013-analytics-ai.md)'s guardrail, and it is worth pointing out aloud.
6. The agent recommends four pieces. Each arrives as its own WhatsApp card: an image mocking up how it would look on the network, the piece number, the network, the time it would go out, and three buttons: **Aprobado**, **Pedir cambios** and **Descartar**.
7. The candidate taps a button on each card. The agent confirms how many were approved.

### The round of changes

8. On the staff screen, someone requests changes to two pieces. The comment is required, as in the [content pipeline](../decisions/021-content-approval-pipeline.md#the-content-pipeline-generalizes-post-approval): "shorter and tied to the interview", "the water-truck photo instead of the press conference". Each request opens a new round and voids that piece's earlier approval.
9. The agent makes the changes and sends the candidate the second versions, which they approve from WhatsApp. If the candidate is the one who taps **Pedir cambios**, the agent asks what they would change and takes their next message, text or voice, as the comment. It is the same path as a staff request.

### Close

10. The demo clock moves forward. The simulated publisher marks each piece as published at its time, and the agent tells the candidate as each one goes out. If a new version was left unapproved, it does not go out, and the screen shows it.
11. The staff screen shows what the audience did not see on the phone: the mirror of the conversation, each piece's rounds side by side, who approved which version through which channel, and what each call cost, passed through at cost.

## 5. What is real and what is simulated

| Step | Status | How |
|---|---|---|
| WhatsApp conversation, cards and buttons | Real | WhatsApp Cloud API. Each piece is an interactive message with the image in the header and three reply buttons |
| Voice note transcription | Real | A transcription provider |
| Talking points and piece copy | Real | A model provider, with structured output |
| Talking points PDF | Real | An HTML template rendered to PDF |
| Artwork and network mockups | Real | Artwork templates rendered to images, with the campaign's photos. No image is generated |
| Rounds, versions and approvals | Real | The pitch's database |
| Staff change request | Real | The staff screen |
| Strategy and knowledge base | Simplified | Short documents placed whole in the prompt. No retrieval |
| The candidate's calendar | Simulated | A file in the candidacy's folder |
| Scheduling and publishing | Simulated | Demo clock and simulated publisher. Nothing reaches a social network |
| The organization's own WhatsApp Business number | Simulated | One pitch number, shared by every candidacy (§8) |

There is also a **fallback**: for the topic agreed with each campaign, the folder keeps an output generated in advance. If the model provider or the network fails live, the conversation continues from it. The WhatsApp side stays real.

## 6. How it maps onto GreenGrass

Every part of the pitch corresponds to something the specification already names, and in two cases to something still proposed.

| In the pitch | In GreenGrass | Status |
|---|---|---|
| A candidacy's folder | An organization of type Candidate ([users.md § Organization Hierarchy](users.md#organization-hierarchy)). Every record carries the organization it belongs to | Accepted |
| The WhatsApp adapter | Channel transport ([ADR-020](../decisions/020-central-service-line-up-and-builders.md#channel-transport)), on the architecture at [system.md § SMS / WhatsApp](../design/architecture/system.md#sms-whatsapp) | Accepted |
| Drafting the talking points and pieces | The text builder ([ADR-020](../decisions/020-central-service-line-up-and-builders.md#builders-text-accepted-images-and-video-proposed)), with one difference that matters: here the agent invokes it, not a person with a brief | The difference is what ADR-018 decides |
| The artwork templates | None. They compose assets the campaign already has and generate nothing, so they are not the image builder | Outside the gate |
| Pieces, rounds, versions and approvals | The [content pipeline](../decisions/021-content-approval-pipeline.md#the-content-pipeline-generalizes-post-approval): every round kept, every revision request commented | Accepted |
| Usage events with their cost | [ADR-019](../decisions/019-central-services-and-metered-billing.md#two-billing-planes-and-no-margin-on-the-second)'s metering and pass-through at cost | Accepted |
| The record of each approval | The "on behalf of" relation, proposed for [ADR-018](../decisions/018-ai-agent-posture.md#what-this-adr-must-resolve) item 3 | Proposed |
| The simulated publisher | The social media adapter ([system.md § Social media](../design/architecture/system.md#social-media)), not connected | Accepted, not used |
| The Campaign Agent | ADR-018's agent harness, reduced to a single conversation | Proposed |

## 7. The worked example's six points, in the pitch

ADR-018's worked example meets the gate in six places. The pitch decides none of them. What it does is pick, in each, the most conservative side that still lets the flow be seen.

| Point | What the pitch does |
|---|---|
| 1. Read scope | The agent reads the candidate's messages, the strategy and knowledge base in their folder, and the calendar. There are no contacts, voter records or donations to read: none exist in the pitch |
| 2. It speaks first | No. A person taps **Start day**, and the conversation is already open because the candidate wrote first. The version in which the agent writes on its own at a set time is not demonstrated |
| 3. Generated images | None. The artwork comes from templates and from the campaign's real photos, used with its permission. The identifiable-person question is left untouched for the review |
| 4. Who dispatches | The agent places the approved version in the schedule, and nothing more. The simulated publisher only takes approved versions. The agent holds no credential to publish, and in the pitch none exists. That shows the proposed answer — the tap on Aprobado counts as the candidate's send — without deciding it |
| 5. Changes after approval | A new version voids the earlier approval. If it is not approved by its time, it does not go out. The pitch can leave one version unapproved on purpose so that this is seen |
| 6. Audit | Each approval records the candidate as the actor, the agent as the channel, and the exact version. It is a draft of the "on behalf of" relation, not the audit model the review has to define |

## 8. One folder per candidacy

The pitch has to run for any candidacy without touching the code. Everything specific to a candidacy lives in its folder, and the application loads whichever it is told to. Adding a candidacy is data work, not programming.

### What goes in the folder

```
packs/
  _example/            fictional candidacy; for development and rehearsals
  juan-dalmau/
    pack.yaml          name, accounts per network, party, language, time zone,
                       active networks, posting slots, the visual identity
                       and template set it uses
    photos/            the campaign's photos + photos.yaml (topics, credit,
                       whether the candidate appears)
    knowledge/         strategy, tone guide, one document per topic
    calendar.yaml      simulated calendar
    replay/            fallback for the agreed topic
brands/
  pip/  mvc/  alianza/ logo, typefaces, design tokens, domain, hashtags
templates/
  sets/<name>/         artwork template sets
  frames/              X, Facebook, Instagram and story mockups
  documents/           the talking points PDF
locales/
  es-PR.yaml           the agent's messages and button labels
```

The visual identity lives outside the folder because it is shared: two candidacies from the same party use the same one, and each folder says whether it uses its party's or the Alianza's. Phone numbers and provider keys never go in the folder; they go in the deployment's configuration. That way a folder can be shared without exposing anyone's phone number.

### Artwork templates swap separately

An artwork template set carries the layouts — headline over photo, type only, event card for stories, quote — and carries no colours or typefaces: it takes them from the visual identity's design tokens. A folder picks a set and can replace a single template. The network mockups belong to everyone. Every template with a photo has a type-only variant, used when the photo library has nothing for the day's topic.

### One shared number, routed by sender

In GreenGrass each organization has its own WhatsApp Business account ([integrations.md § WhatsApp Business API](integrations.md#whatsapp-business-api)). The pitch uses one number for every candidacy, identifies each by the number it writes from, and routes the conversation to its folder. A folder can bring its own number if the campaign has one. There is one staff screen per candidacy, with its own access code: nothing from one campaign appears in another's pitch.

### Adding a candidacy

- `pack:new <name>` copies the fictional folder.
- `pack:check <name>` validates the folder, renders every template with sample copy onto a contact sheet, and fails if any breaks with that visual identity's typefaces or that name's length.
- Rehearsals always run on the fictional folder and the developer's own phone. A real candidacy's folder is used only in the last rehearsal and in the pitch.

## 9. The first round of candidacies

| Candidacy | Party | Folder |
|---|---|---|
| Juan Dalmau | PIP | `juan-dalmau` |
| María de Lourdes Santiago | PIP | `maria-de-lourdes-santiago` |
| Eva Prados | MVC | `eva-prados` |
| Manuel Natal | MVC | `manuel-natal` |

All four are in Puerto Rico and in Spanish, so this round tests swapping the candidacy and the visual identity, but not the language. Changing language is provided for — a new file in `locales/` and a WhatsApp template approved in that language — and is not exercised.

They are the [pilot](mvp.md#3-the-parties)'s two parties. That has two consequences. Each candidacy is its own organization, and nothing from one appears in another's pitch, which is the same rule the pilot promises each party. And [the asymmetry between the two parties](mvp.md#the-asymmetry-is-the-most-important-fact-in-this-plan) applies here too: GreenGrass builds the folder, and the campaign is asked for as little as possible.

## 10. What each campaign supplies

- Five to ten photos the campaign has the right to use, with a word or two on what each shows.
- Its visual identity, or permission to use its party's or the Alianza's.
- Its public accounts on each network.
- Three to five topics, with what the candidate has already said publicly on each: the platform, press releases, interviews. The knowledge base is built from that alone, and every talking point cites it.
- The candidate's WhatsApp number, kept outside the folder.
- The candidate's consent to their voice and messages passing through the transcription and model providers during the pitch.
- An hour from someone on the team for the rehearsal.

## 11. What the pitch does not prove

- **That ADR-018's bounds are enough.** It applies them in the narrowest case possible: one conversation, no voter data, no real publishing. The review still has to decide read scope, the threat model, audit, offline and the BYOM screen.
- **Anything about the image builder.** The artwork templates generate no images, on purpose.
- **That the knowledge base scales.** A few documents fit whole in the prompt. A real knowledge base needs retrieval, and with it read-scope questions that do not come up here.
- **Onboarding with Meta.** The shared number sidesteps each organization's business verification, which is the slow part ([integrations.md § WhatsApp Business API](integrations.md#whatsapp-business-api)).
- **That candidacies will adopt it.** A candidate liking it in a demonstration does not mean their campaign will use it every day.
- **What it would cost.** The costs the staff screen shows are real but cover one morning. They give an order of magnitude, not a price.

## 12. How it is built

A TypeScript application on SvelteKit, from the stack decided in [system.md](../design/architecture/system.md), serving the WhatsApp webhook, the staff screen and background jobs in a single process. SQLite as the database, which can move to PostgreSQL. Playwright to render the templates to images and to PDF.

The order:

0. **The Meta account**, first, because review of the display name and the template takes days: business account, app, dedicated number, display name, greeting template.
1. A webhook and a three-button card that reaches a phone.
2. The folder format, the fictional folder, `pack:new` and `pack:check`.
3. Templates rendered to image and to PDF, with the contact sheet.
4. Pieces, versions, approvals, audit and usage events.
5. The agent flow: greeting, voice note, transcription, drafting, PDF and four cards.
6. The round of changes, from staff and from the candidate, and the staff screen.
7. The simulated publisher, the demo clock, the audit and cost panel, and the conversation mirror.
8. The fallback, rehearsals with the fictional folder, and then each candidacy's folder.

## 13. Open questions

1. **The number's display name.** Meta may reject a generic one such as "Agente de Campaña". The alternative is to register it as "GreenGrass" and have each candidate save the contact under the agent's name.
2. **Each candidacy's visual identity:** its party's or the Alianza's. Each campaign decides.
3. **How much is kept afterwards.** The rule is to delete everything at the end. Whether a campaign may keep its record, and for how long, is undecided.
4. **Recordings.** A recording of the pitch carries a real candidate's voice saying things an agent drafted. It is not shown to another campaign without that candidate's written permission.
5. **What to offer whoever says yes.** The answer to "I want to use it tomorrow" is the pilot, and the pilot waits on the ADR-018 review for anything agent-shaped. That has to be said well, and before anyone asks.
