# Press & Media Wireframes

## Purpose

Resource-constrained campaigns can't buy reach, so they earn it — press coverage is usually the cheapest way to get in front of a lot of people at once. These wireframes cover media contact management, press content creation (releases, advisories, statements), media kit management, coverage tracking and analytics, endorsement pipeline, talking points, interview scheduling, and spokesperson configuration.

The core UX challenge: press work is relationship-driven and time-sensitive. A press release needs to go out in hours, not days. A statement responding to breaking news needs approval in minutes. The tools must be fast, with approval workflows that accelerate rather than block, and relationship context always visible when composing.

Social media management is wireframed separately in `social-media/social-media.md`. This document covers traditional press operations.

## Scope

| ID | Screen | Personas | Offline | Mobile | Section |
|----|--------|----------|---------|--------|---------|
| PRESS-001 | Media Contact List | OA, CD | No | Yes | Media Contacts |
| PRESS-002 | Media Contact Detail | OA, CD | No | Yes | Media Contacts |
| PRESS-003 | Media List Management | OA, CD | No | Desktop | Media Contacts |
| PRESS-004 | Press Release Builder | OA, CD | No | Desktop | Press Content |
| PRESS-005 | Press Release Preview | OA, CD | No | Yes | Press Content |
| PRESS-006 | Press Release Distribution | OA, CD | No | Desktop | Press Content |
| PRESS-007 | Media Advisory Builder | OA, CD | No | Desktop | Press Content |
| PRESS-008 | Statement Builder | OA, CD | No | Desktop | Press Content |
| PRESS-009 | Media Kit Management | OA, CD | No | Desktop | Media Kit |
| PRESS-010 | Coverage Log | OA, CD | No | Desktop | Coverage |
| PRESS-011 | Coverage Analytics | OA, CD | No | Desktop | Coverage |
| PRESS-012 | Endorsement Pipeline | OA, CD | No | Desktop | Endorsements |
| PRESS-013 | Endorsement Detail | OA, CD | No | Yes | Endorsements |
| PRESS-014 | Talking Points Library | OA, CD | No | Yes | Spokesperson |
| PRESS-015 | Interview Schedule | OA, CD | No | Yes | Interviews |
| PRESS-016 | Spokesperson Configuration | OA | No | Desktop | Spokesperson |

## Press Navigation Context

```
PRESS (Communications Director sidebar)
  Media Contacts      → PRESS-001
  Releases            → press release list (within PRESS-004)
  Advisories          → advisory list (within PRESS-007)
  Statements          → statement list (within PRESS-008)
  Coverage            → PRESS-010
  Endorsements        → PRESS-012
  Talking Points      → PRESS-014
  Interviews          → PRESS-015
```

---

## PRESS-001: Media Contact List

Browse and manage journalists, editors, and media contacts. These are CRM contacts with press-specific fields.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Media Contacts                                           [+ New Contact]   │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  🔍 Search by name, outlet, or beat...                                      │
│  Filters: [Outlet ▾]  [Beat ▾]  [Coverage Area ▾]  [Relationship ▾]        │
│                                                                              │
│  Name              Outlet              Beat         Area        Rel.  Last   │
│  ─────────────────────────────────────────────────────────────────────────   │
│  Elena Vargas      El Nuevo Día        Politics     PR-wide     ●●●○  Mar 1 │
│  Ricardo Morales   WAPA TV             Local Gov    San Juan    ●●○○  Feb 28│
│  Ana Pérez         Associated Press    Elections    Caribbean   ●●●●  Feb 25│
│  James Cooke       The Guardian        LatAm        Internat.   ●○○○  Feb 20│
│  Carla Méndez      Metro PR            Community    Metro area  ●●●○  Feb 15│
│  Kenji Watanabe    NHK World           Elections    Internat.   ●○○○  —     │
│  Luisa Rodríguez   Radio Isla 1320     Politics     PR-wide     ●●○○  Feb 10│
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│  Showing 1-25 of 84                                                          │
│                                                                              │
│  Lists: [Political Reporters (23)]  [National Press (8)]  [All Media ▾]    │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Mobile

```
┌────────────────────────────┐
│  Media Contacts       [+]  │
├────────────────────────────┤
│                            │
│  🔍 Search...              │
│  [Filters ▾]               │
│                            │
│  ┌──────────────────────┐  │
│  │ Elena Vargas    ●●●○ │  │
│  │ El Nuevo Día         │  │
│  │ Politics · PR-wide   │  │
│  │ Last: Mar 1          │  │
│  ├──────────────────────┤  │
│  │ Ricardo Morales ●●○○ │  │
│  │ WAPA TV              │  │
│  │ Local Gov · San Juan │  │
│  │ Last: Feb 28         │  │
│  ├──────────────────────┤  │
│  │ Ana Pérez       ●●●● │  │
│  │ Associated Press     │  │
│  │ Elections · Caribb.  │  │
│  │ Last: Feb 25         │  │
│  └──────────────────────┘  │
│                            │
└────────────────────────────┘
```

### Relationship Status Indicator

| Level | Display | Meaning |
|-------|---------|---------|
| Cold | ●○○○ | No prior contact or initial outreach only |
| Warm | ●●○○ | Some interaction, responded to pitches |
| Established | ●●●○ | Regular contact, has covered the campaign |
| Close | ●●●● | Strong relationship, reliable coverage |

### Interaction

- **Row click** → opens PRESS-002 Media Contact Detail
- **"+ New Contact"** → opens contact create form with media-specific fields pre-shown
- **Relationship dots**: visual indicator, not a filter on its own. Filterable via the Relationship dropdown
- **Lists bar** (bottom): quick-filter by media list. Shows list name and count. "All Media" shows all press contacts
- **"Last" column**: last interaction date (pitch sent, response received, interview, etc.)

### States

- **Empty**: "No media contacts yet. Add journalists and editors to build your press contact database." [Add Contact]

---

## PRESS-002: Media Contact Detail

Full profile of a media contact with interaction history. Extends the standard CRM contact detail (CRM-002) with press-specific sections.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ← Media Contacts    Elena Vargas                    [Edit]  [Pitch →]  [⋮] │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────────────────────────────────┬──────────────────────────────────────┐   │
│  │                                │                                      │   │
│  │  Elena Vargas              ●●●○│  Contact                             │   │
│  │  Political Reporter            │  ──────                              │   │
│  │  El Nuevo Día                  │  elena.vargas@elnuevodia.com         │   │
│  │                                │  +1 (787) 555-0198                   │   │
│  │  Beat: Politics, Elections     │  WhatsApp preferred                  │   │
│  │  Area: PR-wide                 │                                      │   │
│  │  Language: Spanish, English    │  Social                              │   │
│  │                                │  ──────                              │   │
│  │  Relationship: Established     │  @elenavargas_pr (𝕏)                │   │
│  │                                │                                      │   │
│  │  Notes:                        │                                      │   │
│  │  Covers legislative sessions.  │                                      │   │
│  │  Deadline: 4 PM weekdays.      │                                      │   │
│  │  Prefers WhatsApp for initial  │                                      │   │
│  │  pitches, email for materials. │                                      │   │
│  │                                │                                      │   │
│  └────────────────────────────────┴──────────────────────────────────────┘   │
│                                                                              │
│  Member of Lists: Political Reporters, PR-Wide Press, Election Night Pool   │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Interaction History                                                         │
│  ────────────────────                                                        │
│                                                                              │
│  Mar 1   📤 Pitch sent: "Spring campaign fundraising milestone"              │
│          Via: Email · By: Ana Reyes                                          │
│          Response: Interested — requested interview                          │
│                                                                              │
│  Feb 20  📰 Coverage: "Partido Verde surpasses voter outreach targets"      │
│          El Nuevo Día · Positive · [View Article →]                         │
│                                                                              │
│  Feb 15  📤 Press release sent: "Healthcare policy announcement"             │
│          Via: Email · Response: Covered (see Feb 20)                         │
│                                                                              │
│  Feb 1   🎙 Interview: Candidate on healthcare platform                     │
│          Phone, 15 min · Resulted in coverage                                │
│                                                                              │
│  Jan 20  📤 Pitch sent: "Campaign launch announcement"                      │
│          Via: WhatsApp · Response: Passed (not her beat at the time)         │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Coverage from this journalist: 4 articles                    [View All →]  │
│  Pitch success rate: 67% (4 of 6 pitches resulted in coverage)              │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- **"Pitch →"**: opens a compose flow pre-filled with this journalist's email/WhatsApp. Logged as a pitch interaction
- **Interaction history**: auto-populated from pitches, releases sent to media lists containing this contact, interviews, and coverage links. Chronological, most recent first
- **"View Article →"**: opens external link to the coverage
- **Edit**: modifies contact fields (relationship status, notes, beat, etc.)
- **Overflow menu** (⋮): Add to List, Remove from List, Log Interaction, View in CRM
- **Coverage stats**: auto-calculated from interaction history

---

## PRESS-003: Media List Management

Create and manage curated lists of journalists for targeted outreach.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Media Lists                                               [+ New List]     │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  Political Reporters — PR                                   [Edit]   │   │
│  │  Type: Dynamic (Beat = Politics, Area = PR)                         │   │
│  │  23 contacts · Last used: Mar 1 (Spring fundraising release)        │   │
│  │                                                                      │   │
│  ├──────────────────────────────────────────────────────────────────────┤   │
│  │  National Press                                             [Edit]   │   │
│  │  Type: Static (manually curated)                                    │   │
│  │  8 contacts · Last used: Feb 15 (Healthcare announcement)           │   │
│  │                                                                      │   │
│  ├──────────────────────────────────────────────────────────────────────┤   │
│  │  Election Night Pool                                        [Edit]   │   │
│  │  Type: Static                                                       │   │
│  │  12 contacts · Last used: —                                         │   │
│  │                                                                      │   │
│  ├──────────────────────────────────────────────────────────────────────┤   │
│  │  Friendly Columnists                                        [Edit]   │   │
│  │  Type: Dynamic (Relationship ≥ Established)                         │   │
│  │  6 contacts · Last used: Feb 28 (Statement on housing)              │   │
│  │                                                                      │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### New / Edit List

```
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  List Name *                                                         │   │
│  │  ┌──────────────────────────────────────────────────────────────┐   │   │
│  │  │ Political Reporters — PR                                     │   │   │
│  │  └──────────────────────────────────────────────────────────────┘   │   │
│  │                                                                      │   │
│  │  Type                                                                │   │
│  │  ● Dynamic (auto-updates based on criteria)                          │   │
│  │  ○ Static (manually add/remove contacts)                             │   │
│  │                                                                      │   │
│  │  Criteria (dynamic):                                                 │   │
│  │  Beat = [Politics ▾]  AND  Coverage Area = [PR-wide ▾]             │   │
│  │  [+ Add Criteria]                                                    │   │
│  │                                                                      │   │
│  │  Matching contacts: 23                    [View Contacts →]         │   │
│  │                                                                      │   │
│  │  [Save]                                                              │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
```

### Interaction

- **Dynamic lists**: auto-update as contacts are added/modified. Criteria use AND logic
- **Static lists**: manual add/remove via contact search
- **"Edit"**: opens inline edit panel
- **"View Contacts →"**: navigates to PRESS-001 filtered by this list
- **List usage tracking**: shows when the list was last used for distribution

---

## PRESS-004: Press Release Builder

Structured content builder for press releases. Uses the Composer pattern with press-specific structure.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ← Releases    New Press Release            [Save Draft]  [Submit ▾]        │
├────────────────────────────────┬─────────────────────────────────────────────┤
│                                │                                             │
│  STRUCTURE                     │  Preview                                    │
│  ─────────                     │  ───────                                    │
│                                │                                             │
│  Status: ✎ Draft               │  FOR IMMEDIATE RELEASE                      │
│                                │  March 3, 2026                              │
│  Headline *                    │                                             │
│  ┌──────────────────────────┐  │  PARTIDO VERDE SURPASSES                   │
│  │ Partido Verde Surpasses  │  │  $300K FUNDRAISING GOAL                    │
│  │ $300K Fundraising Goal   │  │                                             │
│  └──────────────────────────┘  │  Spring campaign raises $347,200            │
│                                │  from 2,847 donors across                   │
│  Subhead                       │  Puerto Rico                                │
│  ┌──────────────────────────┐  │                                             │
│  │ Spring campaign raises   │  │  SAN JUAN, PR — Partido Verde              │
│  │ $347,200 from 2,847      │  │  today announced that its Spring            │
│  │ donors across Puerto Rico│  │  Drive 2026 has surpassed its              │
│  └──────────────────────────┘  │  $300,000 fundraising goal,                │
│                                │  raising $347,200 from 2,847               │
│  Dateline *                    │  individual donors...                        │
│  ┌──────────────────────────┐  │                                             │
│  │ San Juan, PR             │  │  "This milestone shows that                │
│  └──────────────────────────┘  │  our movement is growing,"                  │
│                                │  said María Torres, Campaign                │
│  Release timing                │  Director. "Every dollar came               │
│  ● For immediate release       │  from people who believe in a               │
│  ○ Embargoed until:            │  greener Puerto Rico."                      │
│    ┌────────────┐ ┌────────┐  │                                             │
│    │ Mar 5      │ │ 8 AM ▾ │  │  ###                                        │
│    └────────────┘ └────────┘  │                                             │
│                                │  ABOUT PARTIDO VERDE                        │
│  ─────────────                 │  Partido Verde de Puerto Rico               │
│                                │  is a grassroots political                   │
│  BODY *                        │  movement dedicated to                      │
│  ┌──────────────────────────┐  │  environmental justice and                  │
│  │ Partido Verde today      │  │  social equity...                           │
│  │ announced that its       │  │                                             │
│  │ Spring Drive 2026 has    │  │  CONTACT                                    │
│  │ surpassed its $300,000   │  │  Ana Reyes, Press Secretary                │
│  │ fundraising goal...      │  │  press@partidoverde.org                    │
│  └──────────────────────────┘  │  +1 (787) 555-0100                         │
│  Rich text (bold, italic,     │                                             │
│  lists, links)                 │  ─────────────────                           │
│                                │  Paid for by Partido Verde                  │
│  ▸ QUOTE BLOCKS (2)           │  de Puerto Rico                              │
│  ▸ BOILERPLATE                 │                                             │
│  ▸ CONTACT INFO                │                                             │
│  ▸ MEDIA ASSETS                │                                             │
│                                │                                             │
└────────────────────────────────┴─────────────────────────────────────────────┘
```

### Collapsed Sections

**QUOTE BLOCKS:**
```
│  Quote 1                                                                     │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ "This milestone shows that our movement is growing. Every dollar    │   │
│  │ came from people who believe in a greener Puerto Rico."             │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│  Attributed to: María Torres, Campaign Director                             │
│  [+ Add Quote Block]                                                         │
```

**BOILERPLATE:**
```
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Partido Verde de Puerto Rico is a grassroots political movement     │   │
│  │ dedicated to environmental justice and social equity...             │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│  ⓘ Boilerplate is shared across all releases. Edit in org settings.        │
│  [Use org default]                                                           │
```

**CONTACT INFO:**
```
│  Press contact: [Ana Reyes ▾]                                                │
│  Email: press@partidoverde.org                                               │
│  Phone: +1 (787) 555-0100                                                    │
│  ⓘ Auto-populated from spokesperson configuration (PRESS-016).              │
```

**MEDIA ASSETS:**
```
│  Attached assets (included with distribution):                               │
│  ┌────────┐  ┌────────┐                                                    │
│  │ [img]  │  │ + Add  │                                                    │
│  │ hires  │  │ Asset  │                                                    │
│  │ photo  │  │        │                                                    │
│  └────────┘  └────────┘                                                    │
│  From media kit or upload                                                    │
```

### Interaction

- **Split-pane**: structure left, live preview right. Preview updates as content changes
- **Submit dropdown**: "Submit for Approval" (routes to candidate), "Save Draft"
- **Embargo**: when embargoed, the preview shows "EMBARGOED UNTIL [date/time]" header. Distribution includes embargo notice
- **Compliance disclaimer**: auto-appended in preview. Cannot be removed
- **Versioning**: edit mode shows version number. "Previous Versions" link shows history
- **Preview button**: opens PRESS-005 full-page preview

### Press Release List (sidebar entry point)

```
│  Press Releases                                           [+ New Release]   │
│                                                                              │
│  [All]  [Draft]  [Pending Approval]  [Approved]  [Distributed]             │
│                                                                              │
│  Release                      Date        Status           Distributed To   │
│  ─────────────────────────────────────────────────────────────────────────   │
│  Fundraising milestone        Mar 3       ◷ Pending        —               │
│  Healthcare policy launch     Feb 15      ✓ Distributed    24 contacts     │
│  Campaign launch              Jan 20      ✓ Distributed    32 contacts     │
```

---

## PRESS-005: Press Release Preview

Full-page preview of a press release as it will appear when distributed.

### Desktop & Mobile

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ⚠ PREVIEW    [← Back to Editor]   [Submit for Approval]   [Distribute]    │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  (Full rendering of the press release in distribution format:                │
│   clean, professional layout with proper formatting of                       │
│   headline, dateline, body, quotes, boilerplate, contact,                   │
│   and compliance disclaimer. Identical to what journalists                   │
│   receive via email.)                                                        │
│                                                                              │
│  Mobile preview accessible — scrollable single-column layout.               │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- Read-only rendering of the complete press release
- **"Submit for Approval"**: routes to candidate approval flow
- **"Distribute"**: only enabled if status is "Approved". Opens PRESS-006
- **Mobile**: accessible for reviewing press releases on the go

---

## PRESS-006: Press Release Distribution

Select recipients and send an approved press release.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ← Release    Distribute: Fundraising Milestone                    [Send]   │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Status: ✓ Approved by María Torres (Candidate) · Mar 3, 10:15 AM          │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  RECIPIENTS                                                                  │
│  ──────────                                                                  │
│                                                                              │
│  Media lists:                                                                │
│  ☑ Political Reporters — PR (23 contacts)                                   │
│  ☐ National Press (8 contacts)                                               │
│  ☐ Election Night Pool (12 contacts)                                         │
│  ☐ Friendly Columnists (6 contacts)                                          │
│                                                                              │
│  Individual contacts:                                                        │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ + Add individual contacts...                                        │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│  Added: Ana Pérez (AP), James Cooke (The Guardian)                          │
│                                                                              │
│  Total recipients: 25 (23 from list + 2 individual)                         │
│  Duplicates removed: 0                                                       │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  PERSONALIZATION                                                             │
│  ───────────────                                                             │
│                                                                              │
│  Subject line *                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Press Release: Partido Verde Surpasses $300K Fundraising Goal       │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ☑ Personalize greeting ("Dear {{journalist_name}},")                       │
│  ☐ Add pitch note (custom text before the release body)                     │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  ATTACHMENTS                                                                 │
│  ───────────                                                                 │
│  ☑ Press release as PDF attachment                                           │
│  ☑ High-resolution photo: campaign_milestone.jpg (2.4 MB)                   │
│  ☐ Include media kit link                                                    │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  EMBARGO                                                                     │
│  ───────                                                                     │
│  ⓘ This release is set for IMMEDIATE RELEASE.                               │
│                                                                              │
│  [Preview Email]  [Send Test to Me]                                          │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Embargoed Variant

```
│  EMBARGO                                                                     │
│  ───────                                                                     │
│  ⚠ This release is EMBARGOED until March 5, 2026 at 8:00 AM AST.           │
│  Embargo notice will be included in the email.                               │
│                                                                              │
│  ☑ Track embargo acknowledgment (request reply confirmation)                 │
```

### Interaction

- **Media list checkboxes**: select one or more lists. Contact count shown per list. Deduplication is automatic
- **Individual contacts**: type-ahead search of media contacts
- **"Send Test to Me"**: sends the distribution email to the current user for review
- **"Preview Email"**: shows the complete email (subject, greeting, release body, attachments) as the journalist will receive it
- **"Send"**: confirmation dialog: "Send to 25 journalists now?" Logged to audit trail and each contact's interaction history
- **Post-send**: each contact's record (PRESS-002) updated with "Press release sent" interaction entry

---

## PRESS-007: Media Advisory Builder

Simplified content builder for media advisories — shorter than press releases, focused on alerting media to upcoming events.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ← Advisories    New Media Advisory               [Save Draft]  [Submit ▾]  │
├────────────────────────────────┬─────────────────────────────────────────────┤
│                                │                                             │
│  ADVISORY                      │  Preview                                    │
│  ────────                      │  ───────                                    │
│                                │                                             │
│  Headline *                    │  MEDIA ADVISORY                             │
│  ┌──────────────────────────┐  │  March 3, 2026                              │
│  │ Partido Verde to Hold    │  │                                             │
│  │ Community Rally in San   │  │  PARTIDO VERDE TO HOLD                     │
│  │ Juan                     │  │  COMMUNITY RALLY IN SAN JUAN              │
│  └──────────────────────────┘  │                                             │
│                                │  WHO:  Candidate María Torres              │
│  Linked event (optional):     │        and community leaders                │
│  ┌──────────────────────────┐  │                                             │
│  │ Rally at Plaza del ▾     │  │  WHAT: Community rally with                │
│  └──────────────────────────┘  │        speakers, music, and                │
│  ⓘ Auto-fills WHO/WHAT/WHEN/  │        policy announcements                │
│    WHERE from event details.   │                                             │
│                                │  WHEN: March 5, 2026                        │
│  WHO *                         │        6:00 PM — 9:00 PM                    │
│  ┌──────────────────────────┐  │                                             │
│  │ Candidate María Torres   │  │  WHERE: Plaza del Mercado                  │
│  │ and community leaders    │  │         Calle Dos Hermanos                 │
│  └──────────────────────────┘  │         San Juan, PR 00907                 │
│                                │                                             │
│  WHAT *                        │  WHY:  To celebrate fundraising             │
│  ┌──────────────────────────┐  │        milestone and announce              │
│  │ Community rally with     │  │        community initiatives               │
│  │ speakers, music, and     │  │                                             │
│  │ policy announcements     │  │  MEDIA: Photo and video                    │
│  └──────────────────────────┘  │         opportunities available            │
│                                │                                             │
│  WHEN *                        │  CONTACT                                    │
│  ┌──────────────────────────┐  │  Ana Reyes, Press Secretary                │
│  │ March 5, 2026            │  │  press@partidoverde.org                    │
│  │ 6:00 PM — 9:00 PM       │  │                                             │
│  └──────────────────────────┘  │  ─────────────────                          │
│                                │  Paid for by Partido Verde                  │
│  WHERE *                       │  de Puerto Rico                              │
│  ┌──────────────────────────┐  │                                             │
│  │ Plaza del Mercado,       │  │                                             │
│  │ Calle Dos Hermanos,      │  │                                             │
│  │ San Juan, PR 00907       │  │                                             │
│  └──────────────────────────┘  │                                             │
│                                │                                             │
│  WHY                           │                                             │
│  ┌──────────────────────────┐  │                                             │
│  │ To celebrate fundraising │  │                                             │
│  │ milestone and announce   │  │                                             │
│  │ community initiatives    │  │                                             │
│  └──────────────────────────┘  │                                             │
│                                │                                             │
│  MEDIA OPPORTUNITIES           │                                             │
│  ☑ Photo opportunity            │                                             │
│  ☑ Video/broadcast opportunity  │                                             │
│  ☐ Interviews available         │                                             │
│                                │                                             │
└────────────────────────────────┴─────────────────────────────────────────────┘
```

### Interaction

- **Event linking**: selecting a platform event auto-fills WHEN and WHERE fields. WHO and WHAT need human input
- **Submit**: same approval and distribution workflow as press releases (→ PRESS-006)
- **Split-pane preview**: updates in real time

---

## PRESS-008: Statement Builder

Rapid-response content builder for official campaign statements. Optimized for speed.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ← Statements   New Statement                     [Save Draft]  [Submit ▾]  │
├────────────────────────────────┬─────────────────────────────────────────────┤
│                                │                                             │
│  ⚡ URGENT                     │  Preview                                    │
│  ☐ Mark as urgent (expedites  │  ───────                                    │
│    approval)                   │                                             │
│                                │  STATEMENT FROM MARÍA TORRES               │
│  Topic *                       │  ON PROPOSED WATER POLICY                   │
│  ┌──────────────────────────┐  │                                             │
│  │ Proposed water policy    │  │  March 3, 2026                              │
│  └──────────────────────────┘  │                                             │
│                                │  "The proposed changes to                    │
│  Attributed to *               │  water management policy fail               │
│  ┌──────────────────────────┐  │  to address the fundamental                │
│  │ María Torres, Candidate ▾│  │  access issues facing rural                │
│  └──────────────────────────┘  │  communities. We call on the               │
│                                │  legislature to..."                         │
│  Statement text *              │                                             │
│  ┌──────────────────────────┐  │  — María Torres                            │
│  │ "The proposed changes to │  │    Candidate, District 5                   │
│  │ water management policy  │  │    Partido Verde de Puerto Rico            │
│  │ fail to address the      │  │                                             │
│  │ fundamental access       │  │  ─────────────────                          │
│  │ issues facing rural      │  │  Paid for by Partido Verde                  │
│  │ communities. We call on  │  │  de Puerto Rico                              │
│  │ the legislature to..."   │  │                                             │
│  └──────────────────────────┘  │                                             │
│                                │                                             │
│  Distribution:                 │                                             │
│  ☑ Media lists                 │                                             │
│  ☑ Social media (post draft)  │                                             │
│  ☐ Email to supporters         │                                             │
│                                │                                             │
└────────────────────────────────┴─────────────────────────────────────────────┘
```

### Interaction

- **Urgent flag**: marks statement as priority in the approval queue. Candidate receives push notification for urgent statements
- **Submit dropdown**: "Submit for Approval" (standard), "Publish — Emergency Bypass" (OA/CD only, skips candidate approval, logged for audit, candidate notified after the fact)
- **Distribution checkboxes**: selects channels. When approved, statement is distributed to selected channels. "Social media" creates a draft post in SOCIAL-002 pre-filled with the statement text
- **Speed-oriented**: fewer fields than press release. No boilerplate, no subhead, no media assets — just the statement text and attribution

---

## PRESS-009: Media Kit Management

Manage the persistent collection of campaign materials for journalist reference.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Media Kit                                          [Preview Public Page]   │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Public URL: greengrass.io/partido-verde/press        [Copy]                │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Assets                                                                      │
│  ──────                                                                      │
│                                                                              │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐                │
│  │ 📄             │  │ 📷             │  │ 📷             │                │
│  │ Candidate Bio  │  │ Headshot       │  │ Action Shot    │                │
│  │ .docx · 24 KB  │  │ .jpg · 4.2 MB  │  │ .jpg · 3.8 MB  │                │
│  │ Access: Public │  │ Access: Public │  │ Access: Gated  │                │
│  │ [Edit] [⋮]     │  │ [Edit] [⋮]     │  │ [Edit] [⋮]     │                │
│  └────────────────┘  └────────────────┘  └────────────────┘                │
│                                                                              │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐                │
│  │ 📄             │  │ 🎨             │  │ 📄             │                │
│  │ Org Boilerplate│  │ Logo Pack      │  │ Policy Brief   │                │
│  │ .docx · 8 KB   │  │ .zip · 1.2 MB  │  │ .pdf · 340 KB  │                │
│  │ Access: Public │  │ Access: Public │  │ Access: Gated  │                │
│  │ [Edit] [⋮]     │  │ [Edit] [⋮]     │  │ [Edit] [⋮]     │                │
│  └────────────────┘  └────────────────┘  └────────────────┘                │
│                                                                              │
│  [+ Upload Asset]                                                            │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Access Tracking (Last 30 days)                                              │
│  ──────────────────                                                          │
│  Total views: 47 · Downloads: 23 · Gated access requests: 8                │
│                                                                              │
│  Recent gated access:                                                        │
│  Mar 2  elena.vargas@elnuevodia.com  — Action Shot, Policy Brief            │
│  Feb 28 james.cooke@guardian.com     — Policy Brief                          │
│  [View All →]                                                                │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Asset Access Levels

| Level | Behavior |
|-------|----------|
| Public | Freely downloadable, no login required |
| Gated | Requires email to download. Email auto-creates media contact record in CRM |

### Interaction

- **"+ Upload Asset"**: file upload with name, description, access level (public/gated), and optional usage rights notes
- **"Preview Public Page"**: opens the public-facing media kit page as journalists will see it
- **Edit**: modify asset metadata (name, description, access level). Replace file
- **Overflow menu** (⋮): Download, Replace File, Delete, View Access Log
- **Gated access log**: shows who accessed gated assets. Auto-creates CRM contact if email is new

---

## PRESS-010: Coverage Log

Track media coverage generated by the campaign. Manual logging with rich metadata.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Coverage Log                                          [+ Log Coverage]     │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  🔍 Search by headline, outlet, or journalist...                            │
│  Filters: [Sentiment ▾]  [Format ▾]  [Date Range ▾]  [Topic ▾]             │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                                                                      │   │
│  │  📰 Partido Verde surpasses voter outreach targets                   │   │
│  │  El Nuevo Día · Elena Vargas · Feb 20, 2026                         │   │
│  │  Format: Article · Sentiment: ✓ Positive                            │   │
│  │  Topics: Canvassing, Field Operations                                │   │
│  │  Linked to: Healthcare policy press release                          │   │
│  │  [View Article →]                                              [⋮]   │   │
│  │                                                                      │   │
│  ├──────────────────────────────────────────────────────────────────────┤   │
│  │                                                                      │   │
│  │  📺 Campaign rally draws hundreds in San Juan                        │   │
│  │  WAPA TV · Ricardo Morales · Mar 5, 2026                            │   │
│  │  Format: TV Segment · Sentiment: ✓ Positive                         │   │
│  │  Topics: Events, Community                                           │   │
│  │  Linked to: Rally media advisory                                     │   │
│  │  [View Clip →]                                                 [⋮]   │   │
│  │                                                                      │   │
│  ├──────────────────────────────────────────────────────────────────────┤   │
│  │                                                                      │   │
│  │  📰 Green party faces questions on infrastructure policy             │   │
│  │  Caribbean Business · Staff Reporter · Feb 28, 2026                 │   │
│  │  Format: Article · Sentiment: ⚡ Mixed                               │   │
│  │  Topics: Infrastructure, Policy                                      │   │
│  │  Linked to: — (unsolicited)                                          │   │
│  │  [View Article →]                                              [⋮]   │   │
│  │                                                                      │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Log Coverage Form

```
│  Log Coverage                                                       [Save]  │
│  ────────────                                                                │
│                                                                              │
│  Headline *          ┌──────────────────────────────────────────────────┐   │
│                      │ Partido Verde surpasses voter outreach targets   │   │
│                      └──────────────────────────────────────────────────┘   │
│                                                                              │
│  Outlet *            ┌──────────────────────────┐                           │
│                      │ El Nuevo Día         [▾]  │                           │
│                      └──────────────────────────┘                           │
│                                                                              │
│  Journalist          ┌──────────────────────────┐                           │
│                      │ Elena Vargas          [▾] │  (search media contacts)  │
│                      └──────────────────────────┘                           │
│                                                                              │
│  Date published *    ┌──────────────┐                                       │
│                      │ Feb 20, 2026 │                                       │
│                      └──────────────┘                                       │
│                                                                              │
│  URL                 ┌──────────────────────────────────────────────────┐   │
│                      │ https://elnuevodia.com/...                       │   │
│                      └──────────────────────────────────────────────────┘   │
│                                                                              │
│  Format              ○ Article  ○ TV Segment  ○ Radio  ○ Podcast            │
│                      ○ Social Media Mention  ○ Other                         │
│                                                                              │
│  Sentiment           ○ Positive  ○ Neutral  ○ Negative  ○ Mixed             │
│                                                                              │
│  Topics              [Canvassing ▾] [+ Add]                                 │
│                                                                              │
│  Reach estimate      ┌──────────┐  (optional)                               │
│                      │          │                                            │
│                      └──────────┘                                            │
│                                                                              │
│  Linked to           ┌──────────────────────────────────────────────────┐   │
│                      │ Healthcare policy press release             [▾]  │   │
│                      └──────────────────────────────────────────────────┘   │
│  (optional: link to the pitch/release that generated this coverage)          │
│                                                                              │
│  Notes               ┌──────────────────────────────────────────────────┐   │
│                      │                                                  │   │
│                      └──────────────────────────────────────────────────┘   │
```

### States

- **Empty**: "No media coverage logged yet. When your pitches and releases generate coverage, log it here to track your press impact." [Log Coverage]

---

## PRESS-011: Coverage Analytics

Aggregate coverage metrics and trends.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Coverage Analytics                             [Date Range ▾]  [Export]    │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Period: Last 90 Days                                                        │
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ Total        │  │ Positive     │  │ Pitch→Cover  │  │ Est. Reach   │   │
│  │ Coverage     │  │              │  │ Rate         │  │              │   │
│  │ 18 pieces    │  │ 72%          │  │ 67%          │  │ 245K         │   │
│  │ ↑ 5 vs prior │  │              │  │ (8 of 12)   │  │              │   │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                                              │
│  Coverage by Sentiment                                                       │
│  ─────────────────────                                                       │
│  Positive  13 (72%)  ████████████████████████████████████████████████       │
│  Neutral    3 (17%)  ██████████████                                         │
│  Mixed      2 (11%)  ████████                                               │
│  Negative   0 (0%)                                                           │
│                                                                              │
│  Coverage by Format                                                          │
│  ──────────────────                                                          │
│  Article     10      ████████████████████████████████████████               │
│  TV Segment   4      ████████████████                                       │
│  Radio        2      ████████                                               │
│  Social       2      ████████                                               │
│                                                                              │
│  Coverage by Topic                                                           │
│  ─────────────────                                                           │
│  Topic              Coverage   Sentiment                                     │
│  ─────────────────────────────────────────                                   │
│  Healthcare          5         ✓✓✓✓⚡                                        │
│  Environment         4         ✓✓✓✓                                         │
│  Community/Events    3         ✓✓✓                                          │
│  Fundraising         3         ✓✓⚡                                          │
│  Infrastructure      2         ✓⚡                                           │
│  Education           1         ✓                                            │
│                                                                              │
│  Most Responsive Journalists                                                 │
│  ────────────────────────────                                                │
│  Journalist          Outlet          Pitches  Covered  Rate                  │
│  Elena Vargas        El Nuevo Día    6        4        67%                   │
│  Ana Pérez           AP              3        2        67%                   │
│  Carla Méndez        Metro PR        4        2        50%                   │
│  Ricardo Morales     WAPA TV         3        1        33%                   │
│                                                                              │
│  Coverage Over Time                                                          │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  (Bar chart: monthly coverage count with sentiment color coding)    │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## PRESS-012: Endorsement Pipeline

Kanban-style pipeline for tracking endorsements from identification through public announcement.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Endorsements                                          [+ New Endorsement]  │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────────────┬────────────┬────────────┬────────────┬────────────┐        │
│  │ Identified │ Approached │ Considering│ Committed  │ Public     │        │
│  │     (5)    │     (3)    │    (2)     │    (1)     │    (8)     │        │
│  ├────────────┼────────────┼────────────┼────────────┼────────────┤        │
│  │            │            │            │            │            │        │
│  │ ┌────────┐│ ┌────────┐ │ ┌────────┐ │ ┌────────┐ │ ┌────────┐ │        │
│  │ │Dr. Rosa ││ │Sen.    │ │ │Chamber │ │ │Env.    │ │ │Rep.    │ │        │
│  │ │López    ││ │Martín  │ │ │of Comm.│ │ │Defense │ │ │García  │ │        │
│  │ │Univ.    ││ │Rivera  │ │ │PR      │ │ │League  │ │ │(Dist.3)│ │        │
│  │ │Prof.    ││ │(Dist.2)│ │ │        │ │ │        │ │ │Elected │ │        │
│  │ │Target:  ││ │Contacted│ │ │Meeting │ │ │Ready to│ │ │Jan 20  │ │        │
│  │ │Mar 15   ││ │Feb 28  │ │ │Mar 10  │ │ │announce│ │ │        │ │        │
│  │ └────────┘│ └────────┘ │ └────────┘ │ └────────┘ │ └────────┘ │        │
│  │            │            │            │            │            │        │
│  │ ┌────────┐│ ┌────────┐ │ ┌────────┐ │            │ ┌────────┐ │        │
│  │ │Labor   ││ │Mayor   │ │ │ACLU PR │ │            │ │Teachers│ │        │
│  │ │Union   ││ │Sánchez │ │ │        │ │            │ │Union   │ │        │
│  │ │Local 42││ │(Caguas)│ │ │Reviewing│            │ │PR      │ │        │
│  │ │        ││ │        │ │ │platform│ │            │ │Feb 5   │ │        │
│  │ │Target: ││ │Called   │ │ │        │ │            │ │        │ │        │
│  │ │Mar 20  ││ │Mar 1   │ │ │        │ │            │ │        │ │        │
│  │ └────────┘│ └────────┘ │ └────────┘ │            │ └────────┘ │        │
│  │            │            │            │            │            │        │
│  │ ┌────────┐│ ┌────────┐ │            │            │ ... +6     │        │
│  │ │Comm.   ││ │Rev.    │ │            │            │ more       │        │
│  │ │Board   ││ │Méndez  │ │            │            │            │        │
│  │ │Pres.   ││ │(Church)│ │            │            │            │        │
│  │ └────────┘│ └────────┘ │            │            │            │        │
│  │            │            │            │            │            │        │
│  │ ... +2    │            │            │            │            │        │
│  │            │            │            │            │            │        │
│  └────────────┴────────────┴────────────┴────────────┴────────────┘        │
│                                                                              │
│  Categories: [All]  [Elected Officials (5)]  [Organizations (8)]            │
│              [Community Leaders (4)]  [Individuals (2)]                     │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- **Drag-and-drop**: cards can be dragged between pipeline stages. Moving to "Public" triggers announcement workflow
- **Card click** → opens PRESS-013 Endorsement Detail
- **"+ New Endorsement"**: creates a new endorsement in the "Identified" stage
- **Category filter**: filter by endorser type
- **"Public" trigger**: when a card is moved to "Public," prompt: "Announce this endorsement? This will generate a press release draft and social media post." Options: "Generate Announcement", "Skip — Just Mark Public"

---

## PRESS-013: Endorsement Detail

Full endorsement record with relationship tracking.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ← Endorsements    Environmental Defense League             [Edit]  [⋮]    │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Status: ● Committed                        Category: Organization          │
│  ──────────────────────────────────────────────────────────────────────      │
│  ● Identified → ● Approached → ● Considering → ● Committed → ○ Public      │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Endorser                                                                    │
│  ────────                                                                    │
│  Environmental Defense League of Puerto Rico                                 │
│  Contact: Dr. Carmen Vélez, Executive Director                              │
│  [View Contact →]                                                            │
│                                                                              │
│  Endorsement Quote                                                           │
│  ─────────────────                                                           │
│  "Partido Verde's environmental platform is the most comprehensive          │
│  we've seen from any party in Puerto Rico. Their commitment to clean        │
│  water access and renewable energy aligns with our mission."                │
│  — Dr. Carmen Vélez, Executive Director                                     │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  📷 Photo: carmen_velez_headshot.jpg                     [View] [Replace]   │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Timeline                                                                    │
│  ────────                                                                    │
│  Mar 1   Moved to Committed — Dr. Vélez confirmed endorsement               │
│  Feb 25  Meeting with Dr. Vélez — discussed platform alignment              │
│  Feb 20  Moved to Considering — board reviewing platform                    │
│  Feb 15  Moved to Approached — sent endorsement request packet              │
│  Feb 1   Identified — recommended by Teachers' Union                        │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Assigned to: Ana Reyes                      Target date: Mar 10            │
│  Notes: Board vote scheduled for March 8. Expect formal letter after.       │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  [Move to Public & Announce]                                                 │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- **Pipeline progress bar**: visual indicator of current stage
- **"Move to Public & Announce"**: triggers announcement workflow (press release draft + social media post)
- **Timeline**: auto-populated from stage changes and manual notes
- **Edit**: modify endorser info, quote, photo, assigned staff, target date, notes
- **Mobile**: scrollable single-column view for checking endorsement status on the go

---

## PRESS-014: Talking Points Library

Managed collection of approved talking points organized by topic.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Talking Points                                        [+ New Topic]        │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  🔍 Search talking points...                                                │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  🏥 Healthcare                                  Updated: Mar 1  [▾] │   │
│  │  ──────────                                                         │   │
│  │                                                                      │   │
│  │  • We support universal primary healthcare access as a              │   │
│  │    fundamental right for all Puerto Ricans.                         │   │
│  │                                                                      │   │
│  │  • Our plan invests $50M in community health centers, creating     │   │
│  │    200 new jobs and serving 100,000 additional patients annually.   │   │
│  │                                                                      │   │
│  │  • When asked about costs: "The cost of inaction is higher —       │   │
│  │    preventable ER visits alone cost PR taxpayers $120M annually."   │   │
│  │                                                                      │   │
│  │  • Key stat: 340,000 Puerto Ricans currently lack reliable access  │   │
│  │    to primary care.                                                  │   │
│  │                                                                      │   │
│  │  Version 3 · Last updated by Ana Reyes                              │   │
│  │  [Edit]  [View History]  [Share with Team]                          │   │
│  │                                                                      │   │
│  ├──────────────────────────────────────────────────────────────────────┤   │
│  │  🌿 Environment                                Updated: Feb 25 [▾] │   │
│  │  ─────────────                                                      │   │
│  │                                                                      │   │
│  │  • Partido Verde's climate action plan targets 100% renewable       │   │
│  │    energy for PR by 2035.                                           │   │
│  │                                                                      │   │
│  │  • We oppose any new fossil fuel infrastructure on the island.     │   │
│  │                                                                      │   │
│  │  • When asked about jobs: "Renewable energy creates 3x more jobs   │   │
│  │    per dollar invested than fossil fuels."                          │   │
│  │                                                                      │   │
│  │  [Edit]  [View History]  [Share with Team]                          │   │
│  │                                                                      │   │
│  ├──────────────────────────────────────────────────────────────────────┤   │
│  │  💧 Water Access                               Updated: Feb 20 [▾] │   │
│  │  ▸ (collapsed — click to expand)                                    │   │
│  ├──────────────────────────────────────────────────────────────────────┤   │
│  │  🎓 Education                                  Updated: Feb 15 [▾] │   │
│  │  ▸ (collapsed)                                                      │   │
│  ├──────────────────────────────────────────────────────────────────────┤   │
│  │  🏠 Housing                                    Updated: Jan 30 [▾] │   │
│  │  ▸ (collapsed)                                                      │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- **Accordion layout**: topics expand/collapse. Most recently updated topics expanded by default
- **"Edit"**: opens rich text editor for the topic's talking points
- **"View History"**: shows previous versions with diff highlighting
- **"Share with Team"**: sends the current talking points to designated staff via internal messaging. Used when talking points are updated and the team needs to be informed
- **"+ New Topic"**: creates a new topic section
- **Search**: full-text search across all talking points
- **Candidate briefing integration**: before an interview (PRESS-015), relevant talking points are automatically surfaced

### Mobile

Accordion layout adapts naturally. Used by spokespeople to review talking points before press interactions.

---

## PRESS-015: Interview Schedule

Track interview requests and scheduled interviews.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Interviews                                          [+ Log Interview]      │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  [Upcoming]  [Past]  [Requests]  [All]                                      │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                                                                      │   │
│  │  Mar 5, 10:00 AM — Phone Interview                                  │   │
│  │  Journalist: Elena Vargas, El Nuevo Día                              │   │
│  │  Topic: Spring fundraising milestone                                 │   │
│  │  Interviewee: María Torres (Candidate)                               │   │
│  │  Duration: 20 min                                                    │   │
│  │                                                                      │   │
│  │  Prep: Talking points on [Fundraising] · Recent coverage from       │   │
│  │  El Nuevo Día (3 articles)                                           │   │
│  │  [View Prep →]                                                       │   │
│  │                                                                      │   │
│  ├──────────────────────────────────────────────────────────────────────┤   │
│  │                                                                      │   │
│  │  Mar 8, 2:00 PM — In-Person Interview                               │   │
│  │  Journalist: Ricardo Morales, WAPA TV                                │   │
│  │  Topic: Community rally follow-up                                    │   │
│  │  Interviewee: María Torres (Candidate)                               │   │
│  │  Duration: 15 min · On camera                                        │   │
│  │                                                                      │   │
│  │  [View Prep →]                                                       │   │
│  │                                                                      │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Pending Requests                                                            │
│  ────────────────                                                            │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  📩 Interview Request                                                │   │
│  │  James Cooke, The Guardian                                           │   │
│  │  Topic: LatAm environmental politics                                 │   │
│  │  Requested: Mar 3 · Format: Video call, 30 min                      │   │
│  │  [Accept & Schedule]  [Decline]  [Reply]                             │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interview Prep View (expanded from "View Prep →")

```
│  Interview Prep                                                              │
│  ──────────────                                                              │
│                                                                              │
│  Talking Points                                                              │
│  · Fundraising: $347K raised, 2,847 donors, 100% grassroots                │
│  · Spring Drive: surpassed $300K goal                                        │
│  · Next milestone: voter registration drive launching April                 │
│  [View Full Talking Points →]                                                │
│                                                                              │
│  Recent Coverage from El Nuevo Día                                          │
│  · Feb 20: "Partido Verde surpasses voter outreach targets" (Positive)      │
│  · Jan 15: "Green party launches spring campaign" (Neutral)                 │
│  · Dec 10: "Environmental groups back Verde platform" (Positive)            │
│                                                                              │
│  Journalist Notes                                                            │
│  Elena Vargas covers legislative sessions. Deadline: 4 PM weekdays.         │
│  Previously covered healthcare and environment angles favorably.            │
```

### Interaction

- **"+ Log Interview"**: manually add an interview (scheduled or completed)
- **"Accept & Schedule"**: opens scheduling form (date, time, format, duration, interviewee). Sends confirmation to journalist (via email). Adds to candidate briefing
- **"View Prep →"**: shows relevant talking points + recent coverage from the requesting outlet + journalist notes. Auto-assembled — no manual prep required
- **Post-interview**: after the interview date passes, status changes to "Completed." "Log outcome" prompt appears: aired/published, killed, pending. Link to resulting coverage
- **Mobile**: list view for checking upcoming interviews on the go

---

## PRESS-016: Spokesperson Configuration

Designate authorized spokespeople and assign topic areas. OA-only.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Spokesperson Configuration                                                 │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Designated Spokespeople                                                     │
│  ───────────────────────                                                     │
│                                                                              │
│  Person              Role                Topic Areas              Default    │
│  ─────────────────────────────────────────────────────────────────────────   │
│  María Torres        Candidate           All topics               ●         │
│  Ana Reyes           Press Secretary      All topics (primary)     ○         │
│  Dr. Pedro Vélez     Policy Director      Healthcare, Education    ○         │
│  Jorge Vega          Finance Director     Fundraising, Budget      ○         │
│                                                                              │
│  [+ Add Spokesperson]                                                        │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Contact Routing                                                             │
│  ───────────────                                                             │
│                                                                              │
│  When a journalist contacts the campaign through the public profile          │
│  or media kit, inquiries are routed by topic:                                │
│                                                                              │
│  Topic                Routed to                                              │
│  ─────────────────────────────────────────                                   │
│  Healthcare           Dr. Pedro Vélez                                        │
│  Education            Dr. Pedro Vélez                                        │
│  Fundraising/Budget   Jorge Vega                                             │
│  All other topics     Ana Reyes (default)                                    │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Press Contact Info (displayed on press releases and media kit)              │
│  ────────────────────                                                        │
│  Name:   Ana Reyes, Press Secretary                                          │
│  Email:  press@partidoverde.org                                              │
│  Phone:  +1 (787) 555-0100                                                   │
│                                                                              │
│  [Save Changes]                                                              │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- **"+ Add Spokesperson"**: search team members, assign topic areas
- **Default spokesperson**: receives all inquiries not matched to a specific topic
- **Topic routing**: configures automatic routing of press inquiries from public-facing forms
- **Press contact info**: displayed on press releases and the media kit page

---

## Empty States Summary

| Screen | Empty Message | Action |
|--------|--------------|--------|
| PRESS-001 Media Contacts | No media contacts yet. Add journalists and editors to build your press contact database. | Add Contact |
| PRESS-010 Coverage | No media coverage logged yet. When your pitches and releases generate coverage, log it here. | Log Coverage |
| PRESS-012 Endorsements | No endorsements tracked yet. Use the pipeline to manage your endorsement strategy. | Add Endorsement |
| PRESS-014 Talking Points | No talking points yet. Create topic-organized talking points for your team and spokespeople. | Create Topic |
| PRESS-015 Interviews | No interviews scheduled. Log interview requests and upcoming interviews here. | Log Interview |

---

## Accessibility Notes

- Relationship status dots (●○○○) accompanied by text label on hover/focus and in contact detail
- Sentiment indicators use icon + text (not color alone): ✓ Positive, ⚡ Mixed, ✗ Negative
- Endorsement pipeline uses column headers with counts, not just visual positioning
- Talking points accordion sections have keyboard expand/collapse
- Interview prep information is structured text, not just visual blocks

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Media contacts as CRM extension | Press-specific fields on standard Contact records | Journalists are contacts — separate databases fragment relationships and miss cross-references (a journalist who donates, a donor who writes) |
| Endorsement pipeline as Kanban | Visual pipeline with drag-and-drop stages | Endorsement strategy is inherently pipeline-shaped. The CD needs to see the funnel at a glance |
| Statement builder as streamlined | Minimal fields vs. press release builder | Statements are reactive and time-sensitive. The builder must not slow down a rapid response |
| Coverage logging as manual | No automated media monitoring in v1 | Automated monitoring is expensive, Western-focused, and poorly covers global south regional media. Manual is more accurate for the target market |
| Interview prep as auto-assembled | System surfaces relevant talking points and journalist history | Manual prep is error-prone and time-consuming. Auto-assembly ensures the candidate always has context |
| Talking points as versioned | Full version history with diff | Talking points evolve as policy positions develop. Staff must always use current language. History preserves the evolution |

## Open Questions

1. **Embargo enforcement** — can the platform technically enforce embargoes, or is it purely trust-based with tracking? Currently trust-based (track who received it, no technical mechanism to prevent early publication)
2. **Crisis communications mode** — should there be a dedicated "crisis mode" that shortcuts approval workflows, pins key messages, and coordinates rapid response? Or is the urgent flag on statements sufficient?
3. **Coverage sentiment auto-suggestion** — should the system suggest sentiment based on headline analysis, or is manual classification always more accurate for the nuanced coverage in this context?
4. **Endorsement public display** — where exactly do public endorsements appear? Candidate profile page, dedicated endorsements page, or both? Design the public-facing endorsement display
5. **Multi-language press releases** — should the builder support creating the same release in multiple languages simultaneously, or are they separate releases? Puerto Rico's bilingual media market makes this critical
