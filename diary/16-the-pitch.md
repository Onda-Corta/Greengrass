# Diary Entry 16: The Pitch

**Date:** 2026-09-29

---

## The Task

Build the smallest thing that gets GreenGrass off the ground: a demonstration of the WhatsApp approval flow, running through the proposed infrastructure, in which a candidate is shown talking points and artwork to approve, and a revision loop. Fake some of it, but make most of it real working code.

## Why This, and Why Now

The corpus is 90-odd documents and no code. That is the right state for a design phase and the wrong one for a conversation with a candidate. The WhatsApp flow is ADR-018's worked example, and it is also the one thing in the whole specification that a candidate would recognise in the first ten seconds, because it happens on the phone they already carry.

There is a tension, and it had to be faced before anything else. CLAUDE.md says nothing agent-shaped goes into the spec or an implementation until ADR-018 is resolved, and this demo is an agent. The way through was already in ADR-018 itself: the review gates production, not prototyping, and it draws the line at any deployment holding real voter, donor or member records. The demo holds none. The only real personal data in it is the candidate's own voice and messages, given knowingly, in the room. It publishes nothing. That keeps it on the prototyping side, and the pitch document says which three things would take it across: loading a contact list, connecting a real social account, or a candidate continuing to use it after the pitch.

## Two Decisions That Made It Small

**Templates, not image generation.** The pieces in the prototype look generated, but they are brand layouts: a headline over a photo, a domain, a network frame around it. Rendering those from HTML templates with the campaign's own photos looks exactly like the prototype every time, turns "the water-truck photo instead of the press conference" into a photo swap, and stays clear of the image builder that ADR-020 holds back. It also leaves the identifiable-person question untouched, which is where it belongs.

**A person starts the day.** In the prototype the agent writes first at 5:30. In the pitch someone taps Start day, and the conversation is already open because the candidate wrote "Hola" first. The flow looks the same and the demo sidesteps the autonomous-action property entirely. Going through the six places the worked example meets the gate, the pitch takes the conservative side of each while still showing the flow: no voter data, no generated images, no publishing credential, a new version voids approval, and each approval records the candidate as actor and the agent as channel.

## Portability

The first plan was written for one candidate. It became four: Juan Dalmau and María de Lourdes Santiago from the PIP, Eva Prados and Manuel Natal from the MVC. The pilot's two parties, which is not a coincidence and has a consequence: each candidacy is its own organization, and nothing from one appears in another's pitch.

Everything candidate-specific moved into a folder per candidacy. Visual identity moved out of the folder, because two candidacies from the same party share one, and artwork template sets moved out again, because a layout should not care whose colours it wears. Phone numbers stayed out of all of it. Adding a candidate is meant to be data work, checked by a command that renders every template with that candidate's name and typefaces and fails if anything breaks.

## Spanish First

`spec/pitch.md` was written in Spanish and then carried into English, the reverse of every other document in the corpus. The audience for this one speaks Spanish. The word itself needed a decision: the glossary had *pitch* as *propuesta*, which is a press pitch, and which collides with ADR-018's *propuesta en revisión*. In Spanish the document is a *presentación*.

## Where It Stands

| Artifact | Count | Status |
|---|---|---|
| Specs | 15 | `pitch.md` added, in English and Spanish |
| ADRs | 21 | 20 accepted, 1 proposed; unchanged apart from a cross-reference |
| Diary entries | 16 | Current |
| Code | 0 lines here | The demo lives in `greengrass-demo` |

## Next

The Meta account first, because display-name and template review take days. Then the webhook and a single card with three buttons, on a fictional candidate and a developer's phone, before any real candidacy's folder exists.
