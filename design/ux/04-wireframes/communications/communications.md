# Communications Wireframes

## Purpose

Communications is how the campaign reaches its audience — email campaigns, SMS/WhatsApp messages, templates, analytics, and consent management. These wireframes cover the admin screens used by the Communications Director and Org Admin to create, send, track, and manage outbound communications.

The core UX challenge: communications span multiple channels (email, SMS, WhatsApp) with different constraints (character limits, media support, compliance rules) but need a unified management experience. The Communications Director should think in terms of "reaching my audience" rather than wrestling with per-channel mechanics.

Internal messaging (staff/volunteer conversations, war room) is wireframed in `messaging/messaging.md`. Social media is covered in a separate document. This document covers external campaign communications only.

## Scope

| ID | Screen | Personas | Offline | Mobile | Section |
|----|--------|----------|---------|--------|---------|
| COMM-001 | Email Campaign List | OA, CD | No | Yes | Email |
| COMM-002 | Email Campaign Builder | OA, CD | No | Desktop | Email |
| COMM-003 | Email Template Builder | OA, CD | No | Desktop | Templates |
| COMM-004 | Email Template Library | OA, CD | No | Yes | Templates |
| COMM-005 | SMS/WhatsApp Composer | OA, CD | No | Yes | SMS/WhatsApp |
| COMM-006 | Communication Analytics | OA, CD | No | Desktop | Analytics |
| COMM-007 | Consent Management | OA, CD, DM | No | Desktop | Consent |
| COMM-008 | Communication Preferences (Staff) | OA, CD | No | Desktop | Consent |
| COMM-009 | Unsubscribe Management | OA, CD | No | Desktop | Consent |
| COMM-010 | Email Sending Domain Config | OA | No | Desktop | Settings |

## Communications Director Navigation Context

```
OVERVIEW
  Dashboard            → DASH-004

COMMUNICATIONS
  Email Campaigns      → COMM-001
  SMS / WhatsApp       → COMM-005 (list view)
  Templates            → COMM-004
  Analytics            → COMM-006
  Consent              → COMM-007
  Unsubscribes         → COMM-009
  Sending Domains      → COMM-010 (OA only)

SOCIAL MEDIA
  (covered in social-media.md)

PRESS
  (covered in press.md)

PEOPLE
  Contacts             → CRM-001
  Segments             → CRM-005

MESSAGING
  Messages             → messaging screens
```

---

## COMM-001: Email Campaign List

Browse and manage email campaigns. A campaign is a single email send (or scheduled send) to a segment.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Email Campaigns                                         [+ New Campaign]   │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  [All]  [Draft]  [Scheduled]  [Sent]  [Automated]                           │
│                                                                              │
│  🔍 Search campaigns...                                                     │
│                                                                              │
│  Campaign               Audience     Status      Sent / Open / Click        │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Spring Fundraising      All donors   ✓ Sent      4,218 / 38.2% / 12.1%    │
│  Appeal                  (4,320)      Mar 1                                  │
│                                                    [View Report →]           │
│                                                                              │
│  Volunteer Recruitment   Active vols   ◷ Sched    —                         │
│  March 2026              (892)         Mar 5      [Edit]  [Pause]            │
│                          8:00 AM                                             │
│                                                                              │
│  Weekly Newsletter       Newsletter    ⚙ Auto     12,340 / 42.1% / 8.3%    │
│  #47                     segment       Weekly     [View Report →]            │
│                          (3,120)       Tuesdays                              │
│                                                                              │
│  Event Invitation —      Seg: San      ✎ Draft    —                         │
│  San Juan Rally          Juan area     —          [Edit]  [Delete]           │
│                          (1,450)                                             │
│                                                                              │
│  GOTV Reminder           Identified    ✓ Sent     8,912 / 52.4% / 28.7%    │
│  (Election Day)          supporters    Nov 5      [View Report →]            │
│                          (9,200)                                             │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│  Showing 1-20 of 47   ◀ 1  2  3 ▶                                          │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Mobile

```
┌────────────────────────────┐
│  Email Campaigns      [+]  │
├────────────────────────────┤
│                            │
│  [All] [Draft] [Sent] [▾] │
│                            │
│  ┌──────────────────────┐  │
│  │ Spring Fundraising   │  │
│  │ Appeal               │  │
│  │ ✓ Sent · Mar 1       │  │
│  │ 4,218 sent · 38% op  │  │
│  ├──────────────────────┤  │
│  │ Volunteer Recruit.   │  │
│  │ March 2026           │  │
│  │ ◷ Mar 5, 8:00 AM     │  │
│  │ 892 recipients       │  │
│  ├──────────────────────┤  │
│  │ Event Invitation     │  │
│  │ San Juan Rally       │  │
│  │ ✎ Draft              │  │
│  │ 1,450 recipients     │  │
│  └──────────────────────┘  │
│                            │
│  Load more...              │
└────────────────────────────┘
```

### Status Definitions

| Status | Icon | Meaning |
|--------|------|---------|
| Draft | ✎ | Created but not scheduled or sent |
| Scheduled | ◷ | Queued for future send. Shows date/time |
| Sending | ● | Actively being sent (batched delivery) |
| Sent | ✓ | Delivery complete. Shows metrics |
| Automated | ⚙ | Recurring automated send (drip, digest, etc.) |
| Paused | ⏸ | Scheduled or automated campaign paused |

### Interaction

- **Row click** → opens COMM-002 (draft/scheduled) or COMM-006 report (sent)
- **"+ New Campaign"** → opens COMM-002 with blank campaign
- **Inline actions** vary by status: Draft (Edit, Delete), Scheduled (Edit, Pause), Sent (View Report), Automated (View Report, Edit Schedule, Pause)
- **Status tabs**: filter by lifecycle. Count shown in tab label

### States

- **Empty**: "No email campaigns yet. Create your first campaign to reach your audience." [Create Campaign]
- **Empty (filtered)**: "No [status] campaigns." [View All]

---

## COMM-002: Email Campaign Builder

Email campaign editor. Multi-step but presented as a single scrollable page with sections (not a wizard — the user can jump between sections).

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ← Campaigns   Spring Fundraising Appeal              [Save Draft] [Send ▾] │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  SETUP                                                                       │
│  ─────                                                                       │
│                                                                              │
│  Campaign name *                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Spring Fundraising Appeal                                           │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  From name *                  From email *                                   │
│  ┌──────────────────────┐    ┌──────────────────────────────────────┐      │
│  │ Partido Verde        │    │ info@partidoverde.org           [▾]  │      │
│  └──────────────────────┘    └──────────────────────────────────────┘      │
│                                                                              │
│  Reply-to (optional)                                                         │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ replies@partidoverde.org                                            │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  AUDIENCE                                                                    │
│  ────────                                                                    │
│                                                                              │
│  Segment *                                                                   │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ All donors                                                     [▾]  │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│  4,320 contacts · 4,218 with valid email · 102 suppressed                   │
│                                                                              │
│  Suppression info:                                                           │
│  · 48 unsubscribed · 31 bounced · 18 no email · 5 duplicate                │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  CONTENT                                                                     │
│  ───────                                                                     │
│                                                                              │
│  Subject line *                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Your support makes a difference, {{first_name}}                     │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│  52 characters · [A/B Test Subject]                                          │
│                                                                              │
│  Preview text                                                                │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Join 412 donors who gave this spring...                             │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  Template    [Spring Appeal ▾]    [Edit Template →]   [Browse Templates]    │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                                                                      │   │
│  │  ┌────────────────────────────────────────────────────────────────┐  │   │
│  │  │                                                                │  │   │
│  │  │  🌿  PARTIDO VERDE                                             │  │   │
│  │  │                                                                │  │   │
│  │  │  Dear {{first_name}},                                          │  │   │
│  │  │                                                                │  │   │
│  │  │  Spring is a time for growth — in our gardens and in           │  │   │
│  │  │  our movement. This month, 412 supporters have already         │  │   │
│  │  │  contributed to our Spring Drive.                              │  │   │
│  │  │                                                                │  │   │
│  │  │  ┌──────────────────────────────────────────────────────┐     │  │   │
│  │  │  │              [Donate Now — $100]                      │     │  │   │
│  │  │  └──────────────────────────────────────────────────────┘     │  │   │
│  │  │                                                                │  │   │
│  │  │  Every dollar goes directly to organizing in your              │  │   │
│  │  │  community.                                                    │  │   │
│  │  │                                                                │  │   │
│  │  │  Con esperanza,                                                │  │   │
│  │  │  María Torres, Campaign Director                               │  │   │
│  │  │                                                                │  │   │
│  │  │  ─────────────────────────────────                             │  │   │
│  │  │  Paid for by Partido Verde de Puerto Rico                      │  │   │
│  │  │  Unsubscribe | Update preferences                             │  │   │
│  │  │                                                                │  │   │
│  │  └────────────────────────────────────────────────────────────────┘  │   │
│  │                                                                      │   │
│  │  Device: [Desktop ▾]   [Edit in Template Builder →]                  │   │
│  │                                                                      │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ⓘ Compliance disclaimer auto-appended based on jurisdiction settings.      │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  DELIVERY                                                                    │
│  ────────                                                                    │
│                                                                              │
│  ● Send now                                                                  │
│  ○ Schedule for   ┌────────────────┐  ┌────────────┐                       │
│                    │ Mar 5, 2026    │  │ 8:00 AM ▾  │                       │
│                    └────────────────┘  └────────────┘                       │
│  ○ Optimal send time (system chooses per-recipient based on open history)    │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Pre-send Checklist                                                          │
│  ✓ Subject line set                                                          │
│  ✓ Audience selected (4,218 recipients)                                      │
│  ✓ Template content filled                                                   │
│  ✓ Compliance disclaimer present                                             │
│  ✓ Unsubscribe link present                                                  │
│  ◷ Test send — [Send Test to Me]                                            │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Send Button Dropdown

- **Send Now**: confirmation dialog: "Send to 4,218 recipients now? This cannot be undone."
- **Schedule**: saves scheduled send. Shows in campaign list as "Scheduled"
- **Send Test**: sends to the current user's email address (or a custom address)

### Interaction

- **Section navigation**: each section (Setup, Audience, Content, Delivery) is a collapsible section. Jump links in a sticky mini-nav would be a future enhancement
- **Segment selector**: dropdown of saved segments from CRM. Shows recipient count, suppression breakdown
- **Subject A/B test**: clicking "A/B Test Subject" reveals a variant subject field and traffic split slider
- **Template selector**: dropdown of templates from COMM-004. "Edit Template →" opens COMM-003 in a new tab. Content is rendered inline as a live preview
- **Device toggle**: switches content preview between desktop and mobile widths
- **Personalization tokens**: `{{first_name}}`, `{{last_name}}`, etc. Typing `{{` in subject or preview text shows autocomplete
- **Compliance disclaimer**: auto-appended, cannot be removed. Editable content in org settings
- **Pre-send checklist**: auto-validated. Items show ✓ (complete), ✗ (missing), or ◷ (recommended). All ✗ items must be resolved before send is enabled
- **Auto-save**: every change auto-saves as draft

### Automated Campaign Variant

For automated campaigns (drip sequences, recurring digests), the Delivery section changes:

```
│  AUTOMATION                                                                  │
│  ──────────                                                                  │
│                                                                              │
│  Trigger                                                                     │
│  ● Recurring schedule                                                        │
│    Every [Tuesday ▾] at [8:00 AM ▾]                                         │
│  ○ Event-triggered                                                           │
│    When: [Contact created ▾]  Wait: [3 days ▾]                              │
│                                                                              │
│  Status: ⚙ Active — Next send: Mar 5, 8:00 AM                              │
│  [Pause Automation]                                                          │
```

---

## COMM-003: Email Template Builder

Visual editor for creating reusable email templates. Block-based layout with drag-and-drop.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ← Templates   Edit: Spring Appeal Template           [Save]  [Use in ▾]   │
├─────────────────┬────────────────────────────────────────────────────────────┤
│                 │                                                            │
│  BLOCKS         │  Canvas                                                    │
│  ──────         │  ──────                                                    │
│                 │                                                            │
│  ┌───────────┐  │  ┌────────────────────────────────────────────────────┐   │
│  │ ☰ Header  │  │  │                                                    │   │
│  └───────────┘  │  │  🌿  PARTIDO VERDE                                 │   │
│  ┌───────────┐  │  │  ════════════════                                   │   │
│  │ ¶ Text    │  │  │                                                    │   │
│  └───────────┘  │  │  Dear {{first_name}},                               │   │
│  ┌───────────┐  │  │                                                    │   │
│  │ 🖼 Image  │  │  │  [Click any block to edit]                         │   │
│  └───────────┘  │  │                                                    │   │
│  ┌───────────┐  │  │  Spring is a time for growth...                     │   │
│  │ ▣ Button  │  │  │                                                    │   │
│  └───────────┘  │  │  ┌────────────────────────────────────────────┐    │   │
│  ┌───────────┐  │  │  │          [Donate Now — $100]                │    │   │
│  │ ── Divider│  │  │  └────────────────────────────────────────────┘    │   │
│  └───────────┘  │  │                                                    │   │
│  ┌───────────┐  │  │  Every dollar goes directly to organizing...        │   │
│  │ ☐ Columns │  │  │                                                    │   │
│  └───────────┘  │  │  Con esperanza,                                     │   │
│  ┌───────────┐  │  │  María Torres                                       │   │
│  │ {} Token  │  │  │                                                    │   │
│  └───────────┘  │  │  ─────────────────────────────────                  │   │
│  ┌───────────┐  │  │  Paid for by Partido Verde de PR                    │   │
│  │ 📋 Social │  │  │  Unsubscribe | Preferences                         │   │
│  └───────────┘  │  │                                                    │   │
│                 │  └────────────────────────────────────────────────────┘   │
│  ──────         │                                                            │
│                 │  Device: [Desktop ▾]   Width: [600px]                      │
│  STYLES         │                                                            │
│                 │  ─────────────────────────────────────────────────────     │
│  Background     │                                                            │
│  [#ffffff]      │  Block Settings (when a block is selected)                 │
│                 │  ────────────────                                           │
│  Font           │  Text block selected                                       │
│  [System ▾]     │  Font size: [16px ▾]  Color: [#1a1a1a]                    │
│                 │  Padding: T[16] R[24] B[16] L[24]                         │
│  Link color     │  ☐ Bold  ☐ Italic  Align: [Left ▾]                       │
│  [#2563eb]      │                                                            │
│                 │                                                            │
└─────────────────┴────────────────────────────────────────────────────────────┘
```

### Block Types

| Block | Purpose |
|-------|---------|
| Header | Logo + org name, configurable background color |
| Text | Rich text with merge tokens, inline links |
| Image | Upload or URL, alt text required, responsive sizing |
| Button | CTA with configurable text, URL, color, size |
| Divider | Horizontal rule with configurable style |
| Columns | 2-column or 3-column layout for side-by-side content |
| Token | Standalone merge field block (e.g., donation amount) |
| Social | Social media icon row with configurable links |

### Interaction

- **Drag-and-drop**: blocks from the left panel drag onto the canvas. Blocks on canvas can be reordered
- **Click to edit**: clicking a block on the canvas selects it and shows block-specific settings below the canvas
- **Inline editing**: text and button blocks support direct editing on the canvas
- **Compliance footer**: always present, locked at the bottom. Content editable in org settings but cannot be removed from template
- **Device toggle**: switches canvas width to simulate mobile rendering
- **"Use in ▾"**: dropdown to create a new campaign using this template (→ COMM-002) or copy template
- **Save**: saves template. Templates are reusable across campaigns

### States

- **New template**: empty canvas with a single header block and compliance footer pre-inserted

---

## COMM-004: Email Template Library

Browse, search, and manage reusable email templates.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Email Templates                                       [+ New Template]     │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  [All]  [Fundraising]  [Events]  [Newsletter]  [GOTV]  [Custom]            │
│                                                                              │
│  🔍 Search templates...                                                     │
│                                                                              │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐                │
│  │                │  │                │  │                │                │
│  │  ┌──────────┐  │  │  ┌──────────┐  │  │  ┌──────────┐  │                │
│  │  │ 🌿       │  │  │  │ 🌿       │  │  │  │ 🌿       │  │                │
│  │  │ ▔▔▔▔▔▔▔▔ │  │  │  │ ▔▔▔▔▔▔▔▔ │  │  │  │ ▔▔▔▔▔▔▔▔ │  │                │
│  │  │ ▔▔▔▔▔▔   │  │  │  │ 🖼       │  │  │  │ ▔▔▔▔▔▔   │  │                │
│  │  │ ▔▔▔▔▔    │  │  │  │ ▔▔▔▔▔▔   │  │  │  │ ▔▔▔▔▔    │  │                │
│  │  │ [Button] │  │  │  │ ▔▔▔▔     │  │  │  │ ▔▔▔▔▔▔▔  │  │                │
│  │  │          │  │  │  │ [Button] │  │  │  │ ▔▔▔▔     │  │                │
│  │  └──────────┘  │  │  └──────────┘  │  │  └──────────┘  │                │
│  │                │  │                │  │                │                │
│  │  Spring Appeal │  │  Event Invite  │  │  Weekly        │                │
│  │  Fundraising   │  │  Events        │  │  Newsletter    │                │
│  │  Used 3 times  │  │  Used 8 times  │  │  Newsletter    │                │
│  │  Modified Mar 1│  │  Modified Feb  │  │  Used 47 times │                │
│  │                │  │                │  │  Modified Feb  │                │
│  │  [Edit] [⋮]   │  │  [Edit] [⋮]   │  │  [Edit] [⋮]   │                │
│  └────────────────┘  └────────────────┘  └────────────────┘                │

│  ┌────────────────┐  ┌────────────────┐                                    │
│  │                │  │                │                                    │
│  │  ┌──────────┐  │  │  ┌──────────┐  │                                    │
│  │  │ 🌿       │  │  │  │ 🌿       │  │                                    │
│  │  │ ▔▔▔▔▔▔▔▔ │  │  │  │ ▔▔▔▔▔▔▔▔ │  │                                    │
│  │  │ ▔▔▔▔▔▔   │  │  │  │ ▔▔▔▔▔▔▔  │  │                                    │
│  │  │ ▔▔▔▔▔    │  │  │  │ [Button] │  │                                    │
│  │  │ ▔▔▔▔▔▔▔  │  │  │  │ ▔▔▔▔▔▔   │  │                                    │
│  │  └──────────┘  │  │  └──────────┘  │                                    │
│  │                │  │                │                                    │
│  │  GOTV Remind.  │  │  Thank You     │                                    │
│  │  GOTV          │  │  Fundraising   │                                    │
│  │  Used 1 time   │  │  Used 12 times │                                    │
│  │  Modified Nov  │  │  Modified Jan  │                                    │
│  │                │  │                │                                    │
│  │  [Edit] [⋮]   │  │  [Edit] [⋮]   │                                    │
│  └────────────────┘  └────────────────┘                                    │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Mobile

```
┌────────────────────────────┐
│  Templates            [+]  │
├────────────────────────────┤
│                            │
│  [All] [Fund.] [Events] ▾ │
│                            │
│  ┌──────────────────────┐  │
│  │ ┌────┐ Spring Appeal │  │
│  │ │ 🌿 │ Fundraising   │  │
│  │ │    │ Used 3 times  │  │
│  │ └────┘ Mar 1         │  │
│  ├──────────────────────┤  │
│  │ ┌────┐ Event Invite  │  │
│  │ │ 🌿 │ Events        │  │
│  │ │    │ Used 8 times  │  │
│  │ └────┘ Feb 20        │  │
│  ├──────────────────────┤  │
│  │ ┌────┐ Weekly Newslt │  │
│  │ │ 🌿 │ Newsletter    │  │
│  │ │    │ Used 47 times │  │
│  │ └────┘ Feb 18        │  │
│  └──────────────────────┘  │
│                            │
└────────────────────────────┘
```

### Interaction

- **Card layout** (desktop): thumbnail preview of template, name, category, usage count, last modified
- **List layout** (mobile): compact rows with small thumbnail
- **Category tabs**: filter templates by purpose. Categories assigned when creating/editing a template
- **Edit** → opens COMM-003 Template Builder
- **Overflow menu** (⋮): Duplicate, Rename, Delete (only if not used by active campaigns), Assign Category
- **"+ New Template"**: opens COMM-003 with blank template or offers "Start from existing" to duplicate

### States

- **Empty**: "No email templates yet. Templates make it easy to maintain consistent branding across campaigns." [Create Template]

---

## COMM-005: SMS/WhatsApp Composer

Compose and send SMS or WhatsApp messages to a segment. Uses the Composer pattern with channel-specific adaptations.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ← Messages   New SMS/WhatsApp Message                 [Save Draft] [Send ▾]│
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Channel                                                                     │
│  ┌──────────────────┐  ┌──────────────────┐                                │
│  │  [● SMS]         │  │  ○ WhatsApp      │                                │
│  │  Text message    │  │  Rich message    │                                │
│  └──────────────────┘  └──────────────────┘                                │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  AUDIENCE                                                                    │
│  ────────                                                                    │
│                                                                              │
│  Segment *                                                                   │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Active volunteers — San Juan                                   [▾]  │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│  892 contacts · 847 with phone · 45 no phone                               │
│  Consent: 812 opted in for SMS · 35 opted out                               │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  MESSAGE                                                  [{{}} Insert Token]│
│  ───────                                                                     │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Hi {{first_name}}! Reminder: our volunteer training is this        │   │
│  │ Saturday at 10am at Centro Comunitario. RSVP: {{event_link}}       │   │
│  │                                                                     │   │
│  │ Reply STOP to unsubscribe.                                          │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│  128 / 160 characters (1 SMS segment)    ████████████████████░░░░  80%      │
│                                                                              │
│  ⓘ "Reply STOP" auto-appended for compliance.                               │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  DELIVERY                                                                    │
│  ────────                                                                    │
│                                                                              │
│  ● Send now                                                                  │
│  ○ Schedule for   ┌────────────────┐  ┌────────────┐                       │
│                    │ Mar 5, 2026    │  │ 10:00 AM ▾ │                       │
│                    └────────────────┘  └────────────┘                       │
│                                                                              │
│  ⚠ Time-of-day check: 23 recipients in a timezone where it will be          │
│    before 8 AM. These will be delayed to 8 AM local time.                    │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Preview                                                                     │
│  ┌─────────────────────────────────┐                                        │
│  │  ┌───────────────────────────┐  │                                        │
│  │  │ Partido Verde             │  │                                        │
│  │  │                           │  │                                        │
│  │  │ Hi Ana! Reminder: our     │  │                                        │
│  │  │ volunteer training is     │  │                                        │
│  │  │ this Saturday at 10am at  │  │                                        │
│  │  │ Centro Comunitario.       │  │                                        │
│  │  │ RSVP: pverde.org/e/123    │  │                                        │
│  │  │                           │  │                                        │
│  │  │ Reply STOP to unsub.      │  │                                        │
│  │  └───────────────────────────┘  │                                        │
│  └─────────────────────────────────┘                                        │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### WhatsApp Variant

When WhatsApp is selected, the composer changes:

```
│  MESSAGE                                                  [{{}} Insert Token]│
│  ───────                                                                     │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Hi {{first_name}}! 🌿                                               │   │
│  │                                                                      │   │
│  │ Reminder: our volunteer training is *this Saturday* at 10am at       │   │
│  │ Centro Comunitario.                                                  │   │
│  │                                                                      │   │
│  │ 📍 Location: Calle Sol 123, San Juan                                │   │
│  │ 🕐 Time: 10:00 AM — 12:00 PM                                       │   │
│  │                                                                      │   │
│  │ Tap below to RSVP:                                                   │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│  No character limit · Supports *bold*, _italic_, ~strikethrough~            │
│                                                                              │
│  Media attachment                                                            │
│  ┌──────────────────────────┐                                               │
│  │    📎 Attach Image/PDF   │                                               │
│  └──────────────────────────┘                                               │
│                                                                              │
│  Quick reply buttons (optional, max 3)                                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                      │
│  │ ✓ I'll be    │  │ ✗ Can't make │  │ + Add button │                      │
│  │   there      │  │   it         │  │              │                      │
│  └──────────────┘  └──────────────┘  └──────────────┘                      │
```

### SMS/WhatsApp Message List (sidebar entry point)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  SMS / WhatsApp Messages                                  [+ New Message]   │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  [All]  [Draft]  [Scheduled]  [Sent]                                        │
│                                                                              │
│  Message            Channel    Audience     Sent      Delivered   Date       │
│  ─────────────────────────────────────────────────────────────────────────   │
│  Training Remind.   SMS        Active vols  812       798 (98%)   Mar 3     │
│  GOTV — Vote Today  WhatsApp   Supporters   4,120     4,089 (99%) Nov 5     │
│  Event Cancellation SMS        Event RSVPs  234       230 (98%)   Feb 28    │
│  Shift Reminder      SMS        Sat shift    45        45 (100%)   Feb 22    │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- **Channel toggle**: SMS vs WhatsApp. Switching channels adapts the composer (character counter, media, quick replies)
- **Character counter** (SMS only): shows count, segment count (messages > 160 chars = multiple SMS segments with cost implications). Color changes at 80% (amber) and 100% (red)
- **Personalization tokens**: `{{first_name}}`, `{{event_link}}`, etc. "Insert Token" button shows available fields
- **Compliance auto-append**: "Reply STOP" for SMS, unsubscribe link for WhatsApp. Cannot be removed
- **Time-of-day enforcement**: system blocks sends during quiet hours (configurable, default 8 PM — 8 AM) per recipient timezone. Warning shown if schedule would violate
- **Frequency cap check**: warning if audience has been messaged recently ("47 recipients received an SMS within the last 7 days")
- **Preview**: phone mockup showing the message as it will appear to recipients, with tokens resolved using sample data
- **Quick reply buttons** (WhatsApp only): up to 3, replies are captured and logged on the contact record

### States

- **Empty**: "No SMS or WhatsApp messages yet. Text messaging is great for time-sensitive communications like event reminders and GOTV." [Compose Message]

---

## COMM-006: Communication Analytics

Cross-channel analytics for all outbound communications. The big picture: "how is our audience engagement?"

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Communication Analytics                        [Date Range ▾]  [Export ▾]  │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Period: Last 30 Days                                                        │
│                                                                              │
│  Channel Overview                                                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ Email        │  │ SMS          │  │ WhatsApp     │  │ Total Reach  │   │
│  │ 12 campaigns │  │ 8 messages   │  │ 3 messages   │  │ 18,400       │   │
│  │ 38.2% open   │  │ 97.8% deliv  │  │ 99.1% deliv  │  │ unique       │   │
│  │ 12.1% click  │  │              │  │ 84% read     │  │ contacts     │   │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Email Performance                                                           │
│  ─────────────────                                                           │
│                                                                              │
│  Campaign               Sent     Open%    Click%   Unsub%   Bounce%         │
│  ─────────────────────────────────────────────────────────────────────────   │
│  Spring Fundraising      4,218    38.2%    12.1%    0.8%     1.2%           │
│  Weekly Newsletter #47   3,120    42.1%    8.3%     0.3%     0.9%           │
│  Volunteer Recruitment   892      51.3%    22.7%    0.1%     0.7%           │
│  Event Invitation        1,450    44.8%    31.2%    0.4%     1.1%           │
│                                                                              │
│  Trends (30 days)                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  40% ┤                                                               │   │
│  │      │     ╱╲         ╱╲                                             │   │
│  │  30% ┤   ╱    ╲     ╱    ╲      ╱╲                   ← Open rate    │   │
│  │      │  ╱      ╲   ╱      ╲    ╱  ╲                                  │   │
│  │  20% ┤ ╱        ╲ ╱        ╲  ╱    ╲                                 │   │
│  │      │╱          ╳          ╲╱      ╲                                │   │
│  │  10% ┤     ──────────────────────────── ← Click rate                 │   │
│  │      │                                                               │   │
│  │   0% ┼────────────────────────────────────────                       │   │
│  │       W1        W2        W3        W4                               │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  SMS / WhatsApp Performance                                                  │
│  ──────────────────────────                                                  │
│                                                                              │
│  Message              Channel   Sent     Delivered   Read     Replies        │
│  ─────────────────────────────────────────────────────────────────────────   │
│  Training Reminder    SMS       812      798 (98%)   —        12             │
│  GOTV — Vote Today    WhatsApp  4,120    4,089 (99%) 84%      342            │
│  Event Cancellation   SMS       234      230 (98%)   —        5              │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Audience Health                                                             │
│  ───────────────                                                             │
│  Total contacts with email:      8,420                                       │
│  Opted in (email):               7,890 (93.7%)                               │
│  Hard bounced (removed):         124 (1.5%)                                  │
│  Total contacts with phone:      6,340                                       │
│  Opted in (SMS):                 5,890 (92.9%)                               │
│  Opted in (WhatsApp):            4,120 (65.0%)                               │
│                                                                              │
│  ⓘ Audience health metrics help monitor list quality and compliance.         │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- **Date range**: preset periods (Last 7 days, Last 30 days, Last 90 days, This year, Custom)
- **Export**: CSV (raw data) or PDF (formatted report). Audit-logged
- **Campaign row click**: expands to show per-campaign detail (top links clicked, geographic distribution, device breakdown)
- **Trend chart**: line chart showing open and click rate over time. Hover for per-week values
- **Audience Health section**: monitors list hygiene. Alerts if bounce rate exceeds threshold or opt-in rate drops

### States

- **Empty**: "No communications sent yet. Analytics will appear here after your first campaign." [Create Email Campaign] [Compose SMS]
- **No data in range**: "No communications sent in this period." [Change Date Range]

---

## COMM-007: Consent Management

Manage per-channel, per-purpose consent records. Critical for multi-jurisdictional compliance (GDPR, CCPA, local election law).

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Consent Management                                        [Export Audit]   │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Consent Overview                                                            │
│  ────────────────                                                            │
│                                                                              │
│  Channel ╲ Purpose   Transact.  Events   Fundrais.  GOTV    Newsletter       │
│  ─────────────────────────────────────────────────────────────────────────   │
│  Email              8,120      6,450    5,890      7,200   4,320             │
│  SMS                5,890      4,120    3,450      5,100   2,890             │
│  WhatsApp           4,120      3,200    2,780      3,890   2,100             │
│                                                                              │
│  Total unique contacts with any consent: 8,420                               │
│  Contacts with no consent (receive nothing): 340                             │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Recent Consent Changes                                                      │
│  ──────────────────────                                                      │
│                                                                              │
│  Contact              Action          Channel     Purpose     Date           │
│  ─────────────────────────────────────────────────────────────────────────   │
│  María García         Opted out       Email       Newsletter  Mar 3          │
│  Carlos Ruiz          Opted in        WhatsApp    Events      Mar 2          │
│  Anonymous (ID 4782)  Opted out all   SMS         All         Mar 1          │
│  Lucía Fernández      Renewed         Email       Fundraising Feb 28         │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Consent Expiry                                                              │
│  ──────────────                                                              │
│  ⓘ Some jurisdictions require consent renewal. Contacts below have           │
│    consent approaching expiry.                                               │
│                                                                              │
│  Expiring in 30 days:      142 contacts   [Send Renewal Request]            │
│  Expiring in 60 days:      318 contacts   [Send Renewal Request]            │
│  Expired (no longer valid): 47 contacts   [View List]                        │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Default Consent Rules                                                       │
│  ─────────────────────                                                       │
│  When a contact is created via:                                              │
│                                                                              │
│  Source              Default consent granted                                 │
│  ─────────────────────────────────────────────────────────────────────────   │
│  Online donation     Email: Transactional, Fundraising                       │
│  Event RSVP          Email: Events; SMS: Events (if phone given)             │
│  Volunteer signup    Email: All; SMS: All; WhatsApp: Events, GOTV            │
│  Import              None (must be explicitly mapped during import)           │
│  Manual create       None (staff must select during creation)                │
│                                                                              │
│  [Edit Default Rules]                                                        │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- **Consent matrix**: read-only overview. Numbers are clickable — opens filtered contact list (CRM-001) showing those contacts
- **"Export Audit"**: exports full consent audit trail (who consented to what, when, via what mechanism). Required for compliance audits
- **"Send Renewal Request"**: queues a re-consent email to contacts with expiring consent. Confirmation dialog with recipient count
- **"Edit Default Rules"**: opens a modal/drawer to configure which consent levels are auto-granted per contact source
- **Consent changes log**: audit trail of all consent modifications. Filterable by contact, action, channel

### States

- **Empty**: "No consent records yet. Consent tracking begins automatically when contacts are created or imported."

---

## COMM-008: Communication Preferences (Staff)

Org-wide default communication preferences and frequency caps. Governs how aggressively the org can communicate.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Communication Preferences                                                   │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Frequency Caps                                                              │
│  ──────────────                                                              │
│                                                                              │
│  Maximum sends per contact per period:                                       │
│                                                                              │
│  Channel    Per Day    Per Week    Per Month                                 │
│  ─────────────────────────────────────────────                               │
│  Email      [ 1 ]      [ 3 ]       [ 8 ]                                    │
│  SMS        [ 1 ]      [ 2 ]       [ 4 ]                                    │
│  WhatsApp   [ 1 ]      [ 2 ]       [ 4 ]                                    │
│                                                                              │
│  ⓘ Transactional messages (receipts, confirmations) are exempt from caps.   │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Quiet Hours                                                                 │
│  ───────────                                                                 │
│                                                                              │
│  Do not send SMS/WhatsApp between:                                           │
│  ┌──────────┐  and  ┌──────────┐  (recipient local time)                   │
│  │ 8:00 PM  │       │ 8:00 AM  │                                            │
│  └──────────┘       └──────────┘                                            │
│                                                                              │
│  ☑ Override quiet hours for election day GOTV messages                       │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Compliance Disclaimers                                                      │
│  ──────────────────────                                                      │
│                                                                              │
│  Email footer disclaimer *                                                   │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Paid for by Partido Verde de Puerto Rico. PO Box 1234, San Juan,   │   │
│  │ PR 00901. Federal ID: XX-XXXXXXX.                                   │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  SMS disclaimer (auto-appended)                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Reply STOP to unsubscribe.                                          │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Sender Identities                                                           │
│  ─────────────────                                                           │
│                                                                              │
│  Name                     Email                        Default               │
│  Partido Verde            info@partidoverde.org        ● Yes                 │
│  María Torres, Director   maria@partidoverde.org       ○                     │
│  Campaign Team            team@partidoverde.org        ○                     │
│                                                                              │
│  [+ Add Sender Identity]                                                     │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  [Save Changes]                                                              │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- **Frequency caps**: numeric inputs. System enforces at send time — if a campaign would exceed the cap for any recipient, those recipients are excluded with a warning in the pre-send checklist
- **Quiet hours**: time pickers. Applied per recipient timezone
- **GOTV override**: election day checkbox allows GOTV messages to bypass quiet hours
- **Disclaimers**: required fields. Auto-appended to all communications in the respective channel
- **Sender identities**: each sender needs a verified email domain (COMM-010). "Add Sender Identity" validates against configured domains
- **Save**: applies changes org-wide

---

## COMM-009: Unsubscribe Management

View and manage unsubscribed contacts. Ensures compliance with opt-out requests.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Unsubscribe Management                                    [Export]         │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Summary                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ Total Unsub  │  │ This Month   │  │ Unsub Rate   │  │ Trend        │   │
│  │ 487          │  │ 12           │  │ 0.8%         │  │ ↓ Improving  │   │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                                              │
│  🔍 Search by name or email...                                              │
│  Filters: [Channel ▾]  [Reason ▾]  [Date Range ▾]                          │
│                                                                              │
│  Contact              Channel   Reason              Date       Source        │
│  ─────────────────────────────────────────────────────────────────────────   │
│  María García         Email     Newsletter only     Mar 3      Unsub link   │
│  Carlos Ruiz          SMS       All                 Mar 2      Reply STOP   │
│  Amina Diallo         Email     Too frequent        Feb 28     Unsub link   │
│  Pedro Martínez       WhatsApp  Not interested      Feb 25     In-app       │
│  Lisa Chen            Email     All                 Feb 20     Unsub link   │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│  Showing 1-50 of 487                                                         │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  ⚠ Manual re-subscribe                                                       │
│  Re-subscribing a contact requires documented proof of consent (e.g.,        │
│  written request from the contact). All re-subscribes are audit-logged.      │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Reason Categories

| Reason | Source |
|--------|--------|
| All (global unsubscribe) | Unsub link, Reply STOP, manual request |
| Too frequent | Unsub page selection |
| Not interested | Unsub page selection |
| Specific purpose only | Unsub page — opted out of one purpose (e.g., newsletter) |
| Other | Unsub page — free text |

### Interaction

- **Row click**: opens contact detail (CRM-002) with consent tab focused
- **Suppression is automatic**: unsubscribed contacts are excluded from all future sends for the relevant channel/purpose. No manual action needed
- **Manual re-subscribe**: requires clicking through a confirmation dialog with a reason field. Logged to audit trail. Used only when a contact explicitly requests re-subscription
- **Export**: for compliance audit. Includes timestamp, reason, source, and audit chain

### States

- **Empty**: "No unsubscribed contacts. When recipients opt out of communications, they'll appear here."

---

## COMM-010: Email Sending Domain Config

Configure and verify email sending domains. Required for deliverability and compliance. OA-only.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Sending Domain Configuration                                               │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ⓘ Configure your email sending domains to improve deliverability and        │
│    prevent your emails from being marked as spam.                            │
│                                                                              │
│  Verified Domains                                                            │
│  ────────────────                                                            │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  partidoverde.org                                         [⚙]       │   │
│  │  Status: ✓ Verified                                                 │   │
│  │                                                                      │   │
│  │  DNS Records:                                                        │   │
│  │  ✓ SPF    — v=spf1 include:greengrass.io ~all                      │   │
│  │  ✓ DKIM   — selector: gg._domainkey.partidoverde.org               │   │
│  │  ✓ DMARC  — v=DMARC1; p=quarantine; rua=mailto:dmarc@pverde.org   │   │
│  │                                                                      │   │
│  │  Last verified: Mar 1, 2026                                         │   │
│  │  Sender identities using this domain: 3                             │   │
│  │                                                                      │   │
│  ├──────────────────────────────────────────────────────────────────────┤   │
│  │  campaign2026.pr                                          [⚙]       │   │
│  │  Status: ◷ Pending verification                                     │   │
│  │                                                                      │   │
│  │  DNS Records needed:                                                 │   │
│  │  ✗ SPF    — Add this TXT record to your DNS:                       │   │
│  │             v=spf1 include:greengrass.io ~all                       │   │
│  │  ✗ DKIM   — Add this CNAME record:                                 │   │
│  │             gg._domainkey → dkim.greengrass.io                      │   │
│  │  ✗ DMARC  — Recommended but not required                           │   │
│  │                                                                      │   │
│  │  [Copy All DNS Records]  [Re-check DNS]                             │   │
│  │                                                                      │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  [+ Add Domain]                                                              │
│                                                                              │
│  Add Domain:                                                                 │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ newdomain.org                                                       │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│  [Verify Domain]                                                             │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- **Add Domain**: enter domain name, system generates required DNS records
- **"Copy All DNS Records"**: copies TXT and CNAME records for pasting into DNS provider
- **"Re-check DNS"**: triggers immediate DNS verification. Shows results inline
- **Verification polling**: system automatically checks DNS every hour for pending domains. Notifies the OA when verification succeeds
- **Settings gear** (⚙): Remove domain (confirmation if sender identities use it), View delivery stats for domain
- **Verified indicators**: ✓ (verified), ✗ (not found), ◷ (checking)

### States

- **No domains**: "Add your email sending domain to start sending campaigns. Without a verified domain, emails may be marked as spam." [Add Domain]

---

## Empty States Summary

| Screen | Empty Message | Action |
|--------|--------------|--------|
| COMM-001 Email Campaigns | No email campaigns yet. Create your first campaign to reach your audience. | Create Campaign |
| COMM-004 Templates | No email templates yet. Templates make it easy to maintain consistent branding across campaigns. | Create Template |
| COMM-005 SMS/WhatsApp | No SMS or WhatsApp messages yet. Text messaging is great for time-sensitive communications. | Compose Message |
| COMM-006 Analytics | No communications sent yet. Analytics will appear here after your first campaign. | Create Email Campaign |
| COMM-010 Sending Domains | Add your email sending domain to start sending campaigns. | Add Domain |

---

## Accessibility Notes

- Email campaign status uses icon + text label, not color alone
- Character counter for SMS uses color + numeric display + progress bar
- Template library thumbnails have descriptive alt text (template name and category)
- Consent matrix numbers are actual links, not just styled text — screen reader announces "6,450 contacts opted in for Events via Email"
- Quiet hours time pickers support keyboard input in addition to dropdown selection
- Compliance flag severity indicators use semantic labels (not just icons)

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Campaign builder as single page, not wizard | Scrollable sections with jump links | Email campaigns are iterative — users jump between subject, content, and audience. A wizard forces linear progression |
| Template library as card grid | Card with thumbnail preview | Visual preview is critical for choosing the right template. Cards use the space better than a list |
| SMS and WhatsApp in one screen | Channel toggle within a single composer | Same audience targeting, similar workflow. Separate screens would fragment the experience for minimal UI difference |
| Consent as channel × purpose matrix | Table overview with drill-down | The matrix is the correct mental model — consent is always about "which channel for which purpose." Grid makes gaps visible |
| Frequency caps as org-wide settings | Global caps, not per-campaign | Per-campaign caps are too granular — the contact's total experience matters. Transactional messages exempt |
| Unsubscribe reasons captured | Structured selection on unsub page | Reasons help diagnose communication quality issues. "Too frequent" vs "not interested" are different problems |

## Open Questions

1. **Email builder complexity** — should the template builder (COMM-003) support conditional content blocks (show/hide based on contact attributes), or is that over-engineering for the v1? Conditional content significantly increases builder complexity
2. **WhatsApp Business API** — WhatsApp requires pre-approved message templates for some use cases. Should template approval status be visible in the composer, or is that an integration detail handled transparently?
3. **A/B testing for SMS** — email supports subject line A/B testing (COMM-002). Should SMS support message body A/B testing? Lower volume may make statistical significance hard to reach
4. **Drip sequence builder** — COMM-002 mentions automated campaigns with triggers. Is a visual drip/flow builder needed, or are simple "trigger + delay + send" rules sufficient for v1?
5. **Cross-channel orchestration** — should the system prevent sending an SMS and email about the same topic on the same day? Currently frequency caps are per-channel; cross-channel caps would be more protective but harder to configure
