# Activism & Engagement Campaign Wireframes

## Purpose

Activism campaigns turn a supporter base into a coordinated political force — letter-writing actions, petitions, and public comment submissions that create measurable constituent pressure on targets (elected officials, regulatory bodies, corporations).

The core UX challenge: the platform serves two radically different users in a single flow. Staff (OA, CD) build campaigns with talking points, targets, and strategy. Supporters — often first-time participants on a mobile phone — land on a public page and must complete an action in under two minutes, with zero training. The AI message generation adds a third concern: the supporter must understand what the AI wrote on their behalf, trust it, and approve it before sending.

Design priorities: (1) public action pages stripped down enough that people actually finish them, (2) AI-generated messages that feel personal and transparent, (3) staff tools for tracking impact and documenting outcomes.

## Scope

| ID | Screen | Personas | Offline | Mobile | Section |
|----|--------|----------|---------|--------|---------|
| ACT-001 | Activism Campaign List | OA, CD | No | Yes | Admin |
| ACT-002 | Letter/Email Action Setup | OA, CD | No | Desktop | Admin |
| ACT-003 | Petition Setup | OA, CD | No | Desktop | Admin |
| ACT-004 | Public Comment Campaign Setup | OA, CD | No | Desktop | Admin |
| ACT-005 | Action Page (Public) | S, Public | No | Primary | Public |
| ACT-006 | Petition Page (Public) | S, Public | No | Primary | Public |
| ACT-007 | AI Message Generation Preview | S | No | Primary | Public |
| ACT-008 | Activism Campaign Analytics | OA, CD | No | Desktop | Admin |
| ACT-009 | Delivery Event Documentation | OA, CD | Partial | Yes | Admin |

## Activism Navigation Context

```
ACTIVISM (sidebar section for OA, CD)
  Campaigns      → ACT-001
  Analytics      → ACT-008  (also per-campaign from ACT-001)

Public routes (no sidebar):
  /action/[id]   → ACT-005 + ACT-007
  /petition/[id] → ACT-006
```

---

## ACT-001: Activism Campaign List

Staff overview of all activism campaigns — letter-writing, petition, and public comment. Answers "what campaigns are running, how are they performing, what needs attention?"

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Activism Campaigns                                     [+ New Campaign ▾]  │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  [Search campaigns...]   Type: [All ▾]   Status: [All ▾]   Sort: [Recent ▾] │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │ ✉ Clean Water Act — Email Your Representative                        │  │
│  │   Letter/Email  ·  Active  ·  Created Mar 1                          │  │
│  │                                                                      │  │
│  │   Target: Sen. María Torres, District 12                             │  │
│  │                                                                      │  │
│  │   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐           │  │
│  │   │ Actions  │  │ Sent     │  │ Opened   │  │ Regions  │           │  │
│  │   │ 847      │  │ 812      │  │ 489      │  │ 14       │           │  │
│  │   └──────────┘  └──────────┘  └──────────┘  └──────────┘           │  │
│  │                                                                      │  │
│  │   [Edit]  [View Analytics]  [Copy Link]  [···]                       │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │ ✍ Stop Deforestation in the Eastern Valley                           │  │
│  │   Petition  ·  Active  ·  Created Feb 20                             │  │
│  │                                                                      │  │
│  │   Target: Ministry of Environment                                    │  │
│  │                                                                      │  │
│  │   ┌──────────────────────┐  ┌──────────┐  ┌──────────┐              │  │
│  │   │ Signatures           │  │ Goal     │  │ Progress │              │  │
│  │   │ 2,341                │  │ 5,000    │  │ ████░ 47%│              │  │
│  │   └──────────────────────┘  └──────────┘  └──────────┘              │  │
│  │                                                                      │  │
│  │   [Edit]  [View Analytics]  [Copy Link]  [···]                       │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │ 💬 Water Quality Standards Comment Period                             │  │
│  │   Public Comment  ·  Ended Feb 28  ·  Created Feb 10                 │  │
│  │                                                                      │  │
│  │   Target: Environmental Regulation Agency                            │  │
│  │                                                                      │  │
│  │   ┌──────────┐  ┌──────────┐  ┌──────────────┐                     │  │
│  │   │ Comments │  │ Submitted│  │ Deadline     │                     │  │
│  │   │ 156      │  │ 143      │  │ Passed Feb 28│                     │  │
│  │   └──────────┘  └──────────┘  └──────────────┘                     │  │
│  │                                                                      │  │
│  │   [View Analytics]  [···]                                            │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

**[+ New Campaign ▾]** dropdown:
- Create Letter/Email Action → ACT-002
- Create Petition → ACT-003
- Create Public Comment Campaign → ACT-004

**[···]** overflow menu:
- Duplicate Campaign
- Archive Campaign
- Delete Campaign (confirmation required)

### Mobile

```
┌────────────────────────────┐
│  Activism              [+] │
├────────────────────────────┤
│                            │
│  [Search...]   [Filter ▾]  │
│                            │
│  ┌────────────────────────┐│
│  │ ✉ Clean Water Act —   ││
│  │   Email Your Rep      ││
│  │   Letter/Email · Active││
│  │                        ││
│  │   847 actions · 14 reg ││
│  │   [View] [Copy Link]   ││
│  └────────────────────────┘│
│                            │
│  ┌────────────────────────┐│
│  │ ✍ Stop Deforestation  ││
│  │   Petition · Active    ││
│  │                        ││
│  │   2,341 / 5,000 sigs   ││
│  │   ████░ 47%            ││
│  │   [View] [Copy Link]   ││
│  └────────────────────────┘│
│                            │
│  ┌────────────────────────┐│
│  │ 💬 Water Quality Stds ││
│  │   Public Comment · End ││
│  │                        ││
│  │   156 comments         ││
│  │   [View]               ││
│  └────────────────────────┘│
│                            │
└────────────────────────────┘
```

### States

- **Active**: campaign accepting actions, full controls visible
- **Paused**: campaign temporarily stopped, "(Paused)" badge, Resume action in overflow
- **Ended**: comment period passed or manually closed, no Edit, [View Analytics] only
- **Draft**: campaign not yet published, "Draft" badge, no public link

### Interaction

- Cards sorted by most recent activity by default
- Type filter: All / Letter-Email / Petition / Public Comment
- Status filter: All / Active / Paused / Ended / Draft
- [Copy Link] copies public URL to clipboard with toast confirmation
- Card click → ACT-008 analytics for that campaign
- Petition cards show progress bar toward goal

---

## ACT-002: Letter/Email Action Setup

Staff form for creating or editing letter/email action campaigns. Configure the target, template message, and talking points that the AI will use to generate personalized messages for supporters.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ← Activism Campaigns              Letter/Email Action Setup                 │
│                                                     [Save Draft] [Publish]   │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─ Campaign Details ──────────────────────────────────────────────────────┐ │
│  │                                                                        │ │
│  │  Campaign Name *                                                       │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐  │ │
│  │  │ Clean Water Act — Email Your Representative                     │  │ │
│  │  └──────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                        │ │
│  │  Internal Description                                                  │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐  │ │
│  │  │ Pressure campaign for SB-1247 clean water amendment...          │  │ │
│  │  └──────────────────────────────────────────────────────────────────┘  │ │
│  │  Staff-only. Not shown to supporters.                                  │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌─ Target ────────────────────────────────────────────────────────────────┐ │
│  │                                                                        │ │
│  │  Target Name *                           Target Title                  │ │
│  │  ┌────────────────────────────┐          ┌──────────────────────────┐  │ │
│  │  │ Sen. María Torres          │          │ State Senator, Dist. 12  │  │ │
│  │  └────────────────────────────┘          └──────────────────────────┘  │ │
│  │                                                                        │ │
│  │  Target Email *                          Target Phone (optional)       │ │
│  │  ┌────────────────────────────┐          ┌──────────────────────────┐  │ │
│  │  │ maria.torres@senate.gov    │          │ +1 (787) 555-0142        │  │ │
│  │  └────────────────────────────┘          └──────────────────────────┘  │ │
│  │                                                                        │ │
│  │  Target Mailing Address (optional)                                     │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐  │ │
│  │  │ Capitol Building, Suite 401, San Juan, PR 00901                 │  │ │
│  │  └──────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌─ The Ask ───────────────────────────────────────────────────────────────┐ │
│  │                                                                        │ │
│  │  What are you asking the target to do? *                               │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐  │ │
│  │  │ Vote YES on SB-1247 to strengthen clean water protections       │  │ │
│  │  │ for rural communities in District 12.                           │  │ │
│  │  └──────────────────────────────────────────────────────────────────┘  │ │
│  │  Shown to supporters as the headline ask.                              │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌─ Talking Points ────────────────────────────────────────────────── [+] ┐ │
│  │                                                                        │ │
│  │  The AI uses these to generate unique personalized messages.           │ │
│  │  Order matters — higher points are weighted more heavily.              │ │
│  │                                                                        │ │
│  │  1. ┌──────────────────────────────────────────────────────────────┐   │ │
│  │     │ 3 in 10 rural families lack access to safe drinking water   │   │ │
│  │     └──────────────────────────────────────────────────────────────┘   │ │
│  │     [↑] [↓] [×]                                                       │ │
│  │                                                                        │ │
│  │  2. ┌──────────────────────────────────────────────────────────────┐   │ │
│  │     │ SB-1247 would fund water testing for every public school    │   │ │
│  │     └──────────────────────────────────────────────────────────────┘   │ │
│  │     [↑] [↓] [×]                                                       │ │
│  │                                                                        │ │
│  │  3. ┌──────────────────────────────────────────────────────────────┐   │ │
│  │     │ Similar legislation in 4 other states reduced contamination │   │ │
│  │     │ incidents by 60% within 2 years                             │   │ │
│  │     └──────────────────────────────────────────────────────────────┘   │ │
│  │     [↑] [↓] [×]                                                       │ │
│  │                                                                        │ │
│  │  [+ Add Talking Point]                                                 │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌─ Template Message ──────────────────────────────────────────────────────┐ │
│  │                                                                        │ │
│  │  Base template for the AI to personalize. Supporters see their         │ │
│  │  unique version, not this template directly.                           │ │
│  │                                                                        │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐  │ │
│  │  │ Dear Senator Torres,                                            │  │ │
│  │  │                                                                  │  │ │
│  │  │ As a constituent of District 12, I am writing to urge you to    │  │ │
│  │  │ vote YES on SB-1247. Clean water is not a luxury — it is a      │  │ │
│  │  │ fundamental right that too many of our neighbors still lack...  │  │ │
│  │  │                                                                  │  │ │
│  │  │ [Rich text: Bold, Italic, Link]                                 │  │ │
│  │  └──────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ▸ Public Page Appearance (collapsed)                                        │
│  ▸ Promotion & Sharing (collapsed)                                           │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│  [Preview Public Page]                          [Save Draft]  [Publish]      │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Collapsed Sections (Progressive Disclosure)

**Public Page Appearance:**
- Hero image (optional upload)
- Headline override (defaults to campaign name)
- Background context paragraph (shown to supporters before the action)
- Supporter information fields: Name (required), Email (required), Location (optional but recommended for constituent targeting), Personal connection (optional free text — e.g., "I'm a parent of two students at Lincoln Elementary")

**Promotion & Sharing:**
- Public URL (auto-generated, copiable)
- Social share text (pre-filled, editable)
- Email share text for forwarding

### Interaction

- **Save Draft**: saves without publishing. Campaign visible only to staff
- **Publish**: activates the public page. Confirmation dialog: "This will make the action page live at [URL]. Supporters can start taking action immediately."
- **Talking point reordering**: drag or use [↑][↓] arrows. Order determines AI weighting
- **[Preview Public Page]**: opens ACT-005 in a new tab with "PREVIEW" banner — no actions recorded
- **Edit after publish**: allowed. Changes apply immediately. Active campaign shows "Published" badge and "Unpublish" in overflow

---

## ACT-003: Petition Setup

Staff form for creating or editing petition campaigns. Configure the petition text, signature goal, and signer information requirements.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ← Activism Campaigns                          Petition Setup                │
│                                                     [Save Draft] [Publish]   │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─ Campaign Details ──────────────────────────────────────────────────────┐ │
│  │                                                                        │ │
│  │  Campaign Name *                                                       │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐  │ │
│  │  │ Stop Deforestation in the Eastern Valley                        │  │ │
│  │  └──────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                        │ │
│  │  Target *                                Target Title                  │ │
│  │  ┌────────────────────────────┐          ┌──────────────────────────┐  │ │
│  │  │ Ministry of Environment    │          │ Natural Resources Dept   │  │ │
│  │  └────────────────────────────┘          └──────────────────────────┘  │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌─ Petition Content ──────────────────────────────────────────────────────┐ │
│  │                                                                        │ │
│  │  Petition Statement *                                                  │ │
│  │  What are you petitioning for?                                         │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐  │ │
│  │  │ We, the undersigned, call on the Ministry of Environment to     │  │ │
│  │  │ immediately halt all logging permits in the Eastern Valley      │  │ │
│  │  │ watershed and conduct an independent environmental impact       │  │ │
│  │  │ assessment before any further development is approved.          │  │ │
│  │  │                                                                  │  │ │
│  │  │ The Eastern Valley is home to...                                │  │ │
│  │  │                                                                  │  │ │
│  │  │ [Rich text: Bold, Italic, Link]                                 │  │ │
│  │  └──────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                        │ │
│  │  Background Information                                                │ │
│  │  Shown above the petition text to give context.                        │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐  │ │
│  │  │ The Eastern Valley watershed provides drinking water to over    │  │ │
│  │  │ 200,000 residents across three municipalities...                │  │ │
│  │  └──────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌─ Signature Goal ────────────────────────────────────────────────────────┐ │
│  │                                                                        │ │
│  │  Target Signatures *               □ Show goal publicly                │ │
│  │  ┌────────────────┐                                                    │ │
│  │  │ 5000           │                ☑ Show signature count              │ │
│  │  └────────────────┘                                                    │ │
│  │                                                                        │ │
│  │  When goal is reached:                                                 │ │
│  │  ○ Keep collecting signatures                                          │ │
│  │  ○ Show "Goal reached!" and keep collecting                            │ │
│  │  ○ Close petition                                                      │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌─ Signer Information ────────────────────────────────────────────────────┐ │
│  │                                                                        │ │
│  │  Field              Required    Visible on petition                    │ │
│  │  ─────────────────  ─────────   ────────────────────                   │ │
│  │  Name               ☑ Always    ☑ Show (first name + last initial)     │ │
│  │  Email              ☑ Always    □ Hide                                 │ │
│  │  Location           ☑ Required  ☑ Show (city only)                     │ │
│  │  Comment            □ Optional  ☑ Show (as "Why I signed")             │ │
│  │  Phone              □ Optional  □ Hide                                 │ │
│  │                                                                        │ │
│  │  ⓘ Email is always required for dedup and CRM linking.                │ │
│  │    It is never shown publicly.                                         │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ▸ Public Page Appearance (collapsed)                                        │
│  ▸ Promotion & Sharing (collapsed)                                           │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│  [Preview Public Page]                          [Save Draft]  [Publish]      │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- **Signer information table**: checkboxes control what fields appear on the public page and what is shown in the signature list
- **Privacy by default**: email never shown publicly, location shows city only, name shows first name + last initial
- **Goal behavior**: three options for what happens when signature target is reached
- **Show goal publicly**: whether the target number is displayed. Some orgs prefer hiding it until close to achieving it
- **[Preview Public Page]**: opens ACT-006 in preview mode
- **Publish/Save Draft**: same behavior as ACT-002

---

## ACT-004: Public Comment Campaign Setup

Staff form for creating a public comment submission campaign. Defines the regulatory comment period, provides background for supporters, and creates a template comment.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ← Activism Campaigns               Public Comment Campaign Setup            │
│                                                     [Save Draft] [Publish]   │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─ Campaign Details ──────────────────────────────────────────────────────┐ │
│  │                                                                        │ │
│  │  Campaign Name *                                                       │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐  │ │
│  │  │ Water Quality Standards Comment Period                          │  │ │
│  │  └──────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                        │ │
│  │  Regulatory Body *                       Regulation/Docket Number      │ │
│  │  ┌────────────────────────────┐          ┌──────────────────────────┐  │ │
│  │  │ Environmental Regulation   │          │ ERA-2026-0142            │  │ │
│  │  │ Agency                     │          │                          │  │ │
│  │  └────────────────────────────┘          └──────────────────────────┘  │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌─ Comment Period ────────────────────────────────────────────────────────┐ │
│  │                                                                        │ │
│  │  Deadline *                              Days Remaining                │ │
│  │  ┌────────────────────────────┐          ┌──────────────────────────┐  │ │
│  │  │ 2026-03-28  📅             │          │ 25 days (auto-calc)      │  │ │
│  │  └────────────────────────────┘          └──────────────────────────┘  │ │
│  │                                                                        │ │
│  │  ⚠ Campaign will auto-close when the deadline passes.                 │ │
│  │                                                                        │ │
│  │  Submission Method *                                                   │ │
│  │  ○ Platform submits directly (via email to regulatory body)            │ │
│  │  ○ Supporter downloads comment and submits manually                    │ │
│  │  ○ Both options available to supporter                                 │ │
│  │                                                                        │ │
│  │  Submission Email (if platform submits)                                │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐  │ │
│  │  │ comments@era.gov                                                │  │ │
│  │  └──────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌─ Background & Talking Points ───────────────────────────────────────────┐ │
│  │                                                                        │ │
│  │  Issue Explainer *                                                     │ │
│  │  Plain-language explanation shown to supporters.                       │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐  │ │
│  │  │ The Environmental Regulation Agency is proposing new water      │  │ │
│  │  │ quality standards that would weaken protections for rural       │  │ │
│  │  │ communities. The public comment period is your chance to        │  │ │
│  │  │ tell the agency that strong standards matter...                 │  │ │
│  │  └──────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                        │ │
│  │  Talking Points                                                   [+]  │ │
│  │  ──────────────                                                        │ │
│  │  1. ┌──────────────────────────────────────────────────────────────┐   │ │
│  │     │ Current standards have prevented 500+ contamination cases   │   │ │
│  │     └──────────────────────────────────────────────────────────────┘   │ │
│  │     [↑] [↓] [×]                                                       │ │
│  │                                                                        │ │
│  │  2. ┌──────────────────────────────────────────────────────────────┐   │ │
│  │     │ Weakening standards would disproportionately affect         │   │ │
│  │     │ low-income communities who can't afford filtration           │   │ │
│  │     └──────────────────────────────────────────────────────────────┘   │ │
│  │     [↑] [↓] [×]                                                       │ │
│  │                                                                        │ │
│  │  [+ Add Talking Point]                                                 │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌─ Template Comment ──────────────────────────────────────────────────────┐ │
│  │                                                                        │ │
│  │  Base template for AI personalization.                                 │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐  │ │
│  │  │ Re: Docket ERA-2026-0142                                        │  │ │
│  │  │                                                                  │  │ │
│  │  │ I am writing to express my strong opposition to the proposed    │  │ │
│  │  │ weakening of water quality standards. As a resident of...      │  │ │
│  │  │                                                                  │  │ │
│  │  │ [Rich text: Bold, Italic]                                       │  │ │
│  │  └──────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ▸ Public Page Appearance (collapsed)                                        │
│  ▸ Promotion & Sharing (collapsed)                                           │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│  [Preview Public Page]                          [Save Draft]  [Publish]      │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- **Deadline auto-close**: when the comment period deadline passes, the campaign auto-closes. Staff can override to keep it open if the deadline is extended
- **Submission method**: determines whether the platform sends comments directly (via configured email) or provides a download for manual submission. "Both" lets the supporter choose
- **Days Remaining**: auto-calculated from deadline. Shows urgency — turns amber at 7 days, red at 3 days
- **Talking points**: same reorderable list as ACT-002. AI uses these plus the template to generate personalized comments
- **Docket number**: included in the generated comment header for official record matching

---

## ACT-005: Action Page (Public)

The public-facing page where supporters take action on a letter/email campaign. Mobile-first design — most supporters arrive via a shared link on their phone. The flow: read the context → provide your info → review AI-generated message → approve and send.

### Mobile (Primary)

```
┌────────────────────────────┐
│  [Org Logo]                │
│  Partido Verde de PR       │
├────────────────────────────┤
│                            │
│  Email Your                │
│  Representative            │
│                            │
│  ┌────────────────────────┐│
│  │                        ││
│  │     [Hero Image]       ││
│  │                        ││
│  └────────────────────────┘│
│                            │
│  Ask Sen. Torres to vote   │
│  YES on clean water        │
│  protections for District  │
│  12 families.              │
│                            │
│  3 in 10 rural families    │
│  lack access to safe       │
│  drinking water. SB-1247   │
│  would change that.        │
│                            │
│  847 people have taken     │
│  action ✓                  │
│                            │
│  ─────────────────────     │
│                            │
│  Take Action               │
│  ────────────              │
│                            │
│  Your Name *               │
│  ┌────────────────────────┐│
│  │                        ││
│  └────────────────────────┘│
│                            │
│  Your Email *              │
│  ┌────────────────────────┐│
│  │                        ││
│  └────────────────────────┘│
│                            │
│  Your Location             │
│  ┌────────────────────────┐│
│  │ City, State/Region     ││
│  └────────────────────────┘│
│  Helps show you're a       │
│  real constituent.         │
│                            │
│  Your Connection           │
│  (optional)                │
│  ┌────────────────────────┐│
│  │ Why does this matter   ││
│  │ to you personally?     ││
│  │                        ││
│  │                        ││
│  └────────────────────────┘│
│  The AI will weave this    │
│  into your message.        │
│                            │
│  ┌────────────────────────┐│
│  │                        ││
│  │   Generate My Message  ││
│  │                        ││
│  └────────────────────────┘│
│     48px tall, full-width  │
│                            │
│  ┌────────────────────────┐│
│  │ ⓘ We'll create a      ││
│  │ unique message using   ││
│  │ your info and our key  ││
│  │ points. You'll review  ││
│  │ it before anything is  ││
│  │ sent.                  ││
│  └────────────────────────┘│
│                            │
│  Paid for by Partido Verde │
│  de Puerto Rico            │
│                            │
└────────────────────────────┘
```

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  [Org Logo]  Partido Verde de Puerto Rico                                    │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────┐  ┌──────────────────────────────────┐  │
│  │                                 │  │                                  │  │
│  │  Email Your Representative      │  │  Take Action                     │  │
│  │                                 │  │  ──────────────                  │  │
│  │  ┌─────────────────────────┐   │  │                                  │  │
│  │  │                         │   │  │  Your Name *                     │  │
│  │  │     [Hero Image]        │   │  │  ┌──────────────────────────┐   │  │
│  │  │                         │   │  │  │                          │   │  │
│  │  └─────────────────────────┘   │  │  └──────────────────────────┘   │  │
│  │                                 │  │                                  │  │
│  │  Ask Sen. Torres to vote YES    │  │  Your Email *                   │  │
│  │  on clean water protections     │  │  ┌──────────────────────────┐   │  │
│  │  for District 12 families.      │  │  │                          │   │  │
│  │                                 │  │  └──────────────────────────┘   │  │
│  │  3 in 10 rural families lack    │  │                                  │  │
│  │  access to safe drinking        │  │  Your Location                  │  │
│  │  water. SB-1247 would change    │  │  ┌──────────────────────────┐   │  │
│  │  that by funding water          │  │  │ City, State/Region       │   │  │
│  │  testing for every public       │  │  └──────────────────────────┘   │  │
│  │  school and mandating...        │  │                                  │  │
│  │                                 │  │  Your Connection (optional)     │  │
│  │  847 people have taken          │  │  ┌──────────────────────────┐   │  │
│  │  action ✓                       │  │  │ Why does this matter    │   │  │
│  │                                 │  │  │ to you personally?      │   │  │
│  │                                 │  │  └──────────────────────────┘   │  │
│  │                                 │  │                                  │  │
│  │                                 │  │  ┌──────────────────────────┐   │  │
│  │                                 │  │  │   Generate My Message    │   │  │
│  │                                 │  │  └──────────────────────────┘   │  │
│  │                                 │  │                                  │  │
│  │                                 │  │  ⓘ We'll create a unique       │  │
│  │                                 │  │  message using your info.       │  │
│  │                                 │  │  You review before sending.     │  │
│  │                                 │  │                                  │  │
│  └─────────────────────────────────┘  └──────────────────────────────────┘  │
│                                                                              │
│  Paid for by Partido Verde de Puerto Rico                                    │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

Desktop uses a two-column layout: context/story on the left, action form on the right.

### Flow

1. Supporter lands on page (via shared link from email, SMS, WhatsApp, social)
2. Reads the ask and background context
3. Fills in name, email, location, optional personal connection
4. Taps "Generate My Message"
5. → Transitions to ACT-007 (AI Message Generation Preview)
6. Reviews, optionally edits, approves
7. → Confirmation screen (inline, replaces form)

### Confirmation (replaces form after successful send)

```
┌────────────────────────────┐
│                            │
│         ✓                  │
│                            │
│  Your message has been     │
│  sent to Sen. Torres.      │
│                            │
│  You're #848 to take       │
│  action. Thank you!        │
│                            │
│  ─────────────────────     │
│                            │
│  Help spread the word:     │
│                            │
│  [Share on WhatsApp]       │
│  [Share on Facebook]       │
│  [Copy Link]               │
│                            │
│  ─────────────────────     │
│                            │
│  Stay connected:           │
│  ┌────────────────────────┐│
│  │ Get updates from       ││
│  │ Partido Verde          ││
│  │ ☑ Email  □ SMS         ││
│  │ [Sign Up]              ││
│  └────────────────────────┘│
│                            │
└────────────────────────────┘
```

### Interaction

- **Action counter**: real-time count of total actions taken. Social proof — "847 people have taken action"
- **Personal connection field**: optional but valuable. The AI weaves personal stories into the generated message, making each one unique and impactful
- **Generate My Message**: validates required fields, then transitions to ACT-007. Loading state: "Generating your personalized message..." with spinner
- **Compliance disclaimer**: always visible at bottom — tenant-branded "Paid for by..." text
- **CRM integration**: on submit, supporter is added to CRM (or matched to existing record via email dedup)
- **Consent opt-in**: confirmation screen offers opt-in for future communications — not pre-checked

---

## ACT-006: Petition Page (Public)

Public-facing petition page. Simpler than the letter action — supporter reads the petition, signs it, done. No AI generation needed. Mobile-first.

### Mobile (Primary)

```
┌────────────────────────────┐
│  [Org Logo]                │
│  Partido Verde de PR       │
├────────────────────────────┤
│                            │
│  Stop Deforestation        │
│  in the Eastern Valley     │
│                            │
│  ┌────────────────────────┐│
│  │                        ││
│  │     [Hero Image]       ││
│  │                        ││
│  └────────────────────────┘│
│                            │
│  To: Ministry of           │
│  Environment               │
│                            │
│  The Eastern Valley        │
│  watershed provides        │
│  drinking water to over    │
│  200,000 residents across  │
│  three municipalities...   │
│                            │
│  [Read full petition ▾]    │
│                            │
│  ─────────────────────     │
│                            │
│  2,341 have signed         │
│  ┌────────────────────────┐│
│  │ ████████████░░░░░░ 47% ││
│  │ Goal: 5,000            ││
│  └────────────────────────┘│
│                            │
│  ─────────────────────     │
│                            │
│  Sign This Petition        │
│  ──────────────────        │
│                            │
│  Your Name *               │
│  ┌────────────────────────┐│
│  │                        ││
│  └────────────────────────┘│
│                            │
│  Your Email *              │
│  ┌────────────────────────┐│
│  │                        ││
│  └────────────────────────┘│
│                            │
│  Your Location *           │
│  ┌────────────────────────┐│
│  │ City, State/Region     ││
│  └────────────────────────┘│
│                            │
│  Why I'm Signing           │
│  (optional)                │
│  ┌────────────────────────┐│
│  │                        ││
│  │                        ││
│  └────────────────────────┘│
│                            │
│  ┌────────────────────────┐│
│  │                        ││
│  │   Sign the Petition    ││
│  │                        ││
│  └────────────────────────┘│
│     48px tall, full-width  │
│                            │
│  ─────────────────────     │
│                            │
│  Recent Signatures         │
│  ──────────────────        │
│                            │
│  Ana R. · San Juan         │
│  "Our children deserve     │
│   clean water."            │
│                            │
│  Carlos M. · Bayamón       │
│  2 hours ago               │
│                            │
│  María L. · Caguas         │
│  "I grew up swimming in    │
│   the valley's rivers."    │
│                            │
│  [Show more signatures]    │
│                            │
│  Paid for by Partido Verde │
│  de Puerto Rico            │
│                            │
└────────────────────────────┘
```

### Desktop

Two-column layout like ACT-005: petition text + signatures on left, sign form on right.

### Confirmation

```
┌────────────────────────────┐
│                            │
│         ✍                  │
│                            │
│  Thank you for signing!    │
│                            │
│  You're signature #2,342.  │
│  Only 2,658 more needed    │
│  to reach our goal.        │
│                            │
│  ─────────────────────     │
│                            │
│  Help us get there:        │
│                            │
│  [Share on WhatsApp]       │
│  [Share on Facebook]       │
│  [Copy Link]               │
│                            │
│  ─────────────────────     │
│                            │
│  Stay connected:           │
│  ┌────────────────────────┐│
│  │ Get updates from       ││
│  │ Partido Verde          ││
│  │ ☑ Email  □ SMS         ││
│  │ [Sign Up]              ││
│  └────────────────────────┘│
│                            │
└────────────────────────────┘
```

### Interaction

- **Progress bar**: visual goal tracking. Counter updates in real-time after signing
- **Read full petition**: expandable — shows truncated version by default on mobile to keep the sign form above the fold
- **Recent signatures**: social proof. Shows first name + last initial, city, and optional comment. Most recent first. Respects signer visibility settings from ACT-003
- **Sign the Petition**: validates required fields, submits immediately (no AI step). Shows spinner briefly, then confirmation
- **Dedup**: if email matches an existing CRM record, the signature is linked to the existing contact (no duplicate created). If the email already signed this petition, shows "You've already signed this petition. Thank you!" instead of the form
- **Confirmation math**: "Only X more needed to reach our goal" — keeps momentum visible

---

## ACT-007: AI Message Generation Preview

Inline component within ACT-005 where supporters review the AI-generated personalized message before approving it. This is the most critical UX in the activism flow — it must build trust, give the supporter control, and make approval effortless.

### Mobile (Primary)

```
┌────────────────────────────┐
│  Your Message to           │
│  Sen. Torres               │
├────────────────────────────┤
│                            │
│  ┌────────────────────────┐│
│  │ ⓘ This message was    ││
│  │ written for you based  ││
│  │ on key facts and your  ││
│  │ personal connection.   ││
│  │ It's unique — no one   ││
│  │ else will send this    ││
│  │ exact message.         ││
│  └────────────────────────┘│
│                            │
│  ┌────────────────────────┐│
│  │                        ││
│  │ Dear Senator Torres,   ││
│  │                        ││
│  │ My name is Ana Reyes   ││
│  │ and I live in Caguas   ││
│  │ with my two children   ││
│  │ who attend Lincoln     ││
│  │ Elementary. I'm writing││
│  │ because clean water is ││
│  │ not an abstract issue  ││
│  │ for our family — last  ││
│  │ year the school        ││
│  │ fountain was shut down ││
│  │ for three weeks due to ││
│  │ contamination concerns.││
│  │                        ││
│  │ SB-1247 would require  ││
│  │ water testing at every ││
│  │ public school in your  ││
│  │ district. Right now, 3 ││
│  │ in 10 rural families   ││
│  │ lack access to safe    ││
│  │ drinking water. Four   ││
│  │ other states have      ││
│  │ passed similar bills   ││
│  │ and seen contamination ││
│  │ drop by 60% in two     ││
│  │ years.                 ││
│  │                        ││
│  │ Please vote YES on     ││
│  │ SB-1247. Our children  ││
│  │ deserve safe water at  ││
│  │ school.                ││
│  │                        ││
│  │ Sincerely,             ││
│  │ Ana Reyes              ││
│  │ Caguas, PR             ││
│  │                        ││
│  └────────────────────────┘│
│                            │
│  [✎ Edit Message]          │
│                            │
│  ─────────────────────     │
│                            │
│  ☑ I've reviewed this      │
│    message and approve     │
│    sending it on my behalf │
│                            │
│  ┌────────────────────────┐│
│  │                        ││
│  │    Send My Message     ││
│  │                        ││
│  └────────────────────────┘│
│    48px tall, full-width   │
│    Disabled until checkbox │
│    is checked              │
│                            │
│  [← Change my info]       │
│                            │
│  ┌────────────────────────┐│
│  │ Your message will be   ││
│  │ sent via email to      ││
│  │ maria.torres@senate.gov││
│  │ from GreenGrass on your││
│  │ behalf. Your name and  ││
│  │ location will be       ││
│  │ included.              ││
│  └────────────────────────┘│
│                            │
└────────────────────────────┘
```

### Edit Mode (when [✎ Edit Message] is tapped)

```
┌────────────────────────────┐
│  Edit Your Message         │
├────────────────────────────┤
│                            │
│  ┌────────────────────────┐│
│  │ Dear Senator Torres,   ││
│  │                        ││
│  │ My name is Ana Reyes   ││
│  │ and I live in Caguas   ││
│  │ with my two children   ││
│  │ who attend Lincoln     ││
│  │ Elementary...          ││
│  │                        ││
│  │ [Editable text area    ││
│  │  full message visible  ││
│  │  for editing]          ││
│  │                        ││
│  └────────────────────────┘│
│                            │
│  [Use This Version]        │
│  [↺ Regenerate Message]    │
│  [← Discard Changes]      │
│                            │
└────────────────────────────┘
```

### States

- **Loading**: "Generating your personalized message..." with progress indicator. Typically 2-4 seconds
- **Generated**: message displayed read-only with approval checkbox
- **Editing**: message in editable textarea with save/regenerate/discard options
- **Error**: "We couldn't generate your message. You can try again or use the template below." Falls back to showing the staff-created template with a [Send Template] button
- **Regenerated**: same as Generated but with "↺ New version" badge. Regeneration limit: 3 per session

### Interaction

- **Approval checkbox**: explicit opt-in before the Send button activates. Required for trust and legal compliance
- **Edit Message**: opens the generated text in an editable area. Supporter can modify freely
- **Regenerate**: creates a new AI-generated version. Different phrasing, same talking points. Limited to 3 regenerations to prevent abuse
- **[← Change my info]**: returns to ACT-005 form with fields preserved, so supporter can update their name/location/connection
- **Transparency note**: bottom disclosure explains exactly what happens — sent via email, from platform on behalf, name and location included
- **Send button**: disabled until checkbox is checked. On send: email dispatched to target, action recorded, supporter redirected to confirmation screen in ACT-005
- **Fallback**: if AI generation fails, show the staff template (ACT-002 template message) with the supporter's name inserted. Never block the action

---

## ACT-008: Activism Campaign Analytics

Per-campaign analytics for staff. Shows total participation, geographic distribution, and per-supporter action history. Metrics vary by campaign type.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ← Activism Campaigns        Clean Water Act Analytics          [Export CSV] │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ Total Actions│  │ Sent         │  │ Opened       │  │ Participants │    │
│  │ 847          │  │ 812          │  │ 489 (60%)    │  │ 847          │    │
│  │ ↑ 23 today   │  │ 96% sent     │  │              │  │ unique       │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Actions Over Time                                                           │
│  ──────────────────                                                          │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                                                                      │   │
│  │  120 ┤                                                               │   │
│  │  100 ┤          ██                                                   │   │
│  │   80 ┤       ██ ██ ██                                                │   │
│  │   60 ┤    ██ ██ ██ ██ ██                                             │   │
│  │   40 ┤ ██ ██ ██ ██ ██ ██ ██ ██                                      │   │
│  │   20 ┤ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██                             │   │
│  │    0 ┼──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──                    │   │
│  │       M1  M3  M5  M7  M9  M11 M13 M15 M17 M19 M21                  │   │
│  │                                                                      │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Geographic Distribution                                                     │
│  ────────────────────────                                                    │
│  ┌──────────────────────────────────┐  ┌────────────────────────────────┐   │
│  │                                  │  │ Region         Actions   %    │   │
│  │      [Map visualization]         │  │ ──────────────────────────── │   │
│  │                                  │  │ San Juan        234     28%  │   │
│  │      Shaded by action density.   │  │ Bayamón         187     22%  │   │
│  │      Darker = more actions.      │  │ Caguas          142     17%  │   │
│  │                                  │  │ Carolina        98      12%  │   │
│  │                                  │  │ Ponce           76       9%  │   │
│  │                                  │  │ Mayagüez        53       6%  │   │
│  │                                  │  │ Other           57       7%  │   │
│  └──────────────────────────────────┘  └────────────────────────────────┘   │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Action Feed                                          [Search...] [Filter]  │
│  ───────────                                                                 │
│                                                                              │
│  Ana Reyes · Caguas · Mar 3, 2:14 PM                                        │
│  Sent ✓ · Opened ✓ · Personal connection: "Parent at Lincoln Elementary"    │
│  [View Message] [View in CRM →]                                              │
│                                                                              │
│  Carlos Méndez · Bayamón · Mar 3, 1:52 PM                                   │
│  Sent ✓ · Opened — · No personal connection                                 │
│  [View Message] [View in CRM →]                                              │
│                                                                              │
│  Luisa Fernández · San Juan · Mar 3, 12:30 PM                               │
│  Sent ✓ · Opened ✓ · Personal connection: "Chemistry teacher"               │
│  [View Message] [View in CRM →]                                              │
│                                                                              │
│  [Load more...]                                                              │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Campaign-Type Specific Metrics

**Letter/Email Actions (shown above):**
- Total Actions, Sent (delivery rate), Opened (read receipt if available), Participants
- Geographic distribution (critical for constituent-based pressure)
- Per-supporter: Sent/Opened status, personal connection text, CRM link

**Petitions:**
- Signatures (total), Goal Progress (% and bar), Daily Rate, Regions
- Signature timeline (similar chart)
- Recent signatures list with comments
- [Document Delivery →] link to ACT-009

**Public Comments:**
- Comments Generated, Submitted (platform vs manual breakdown), Deadline countdown
- Submission timeline
- Per-comment: submission method (platform/manual), submission status
- Docket reference for regulatory record

### Mobile

Stacks vertically: metric cards → chart → table (scrollable). Map replaced with region list only.

### Interaction

- **[View Message]**: modal showing the AI-generated message that was sent
- **[View in CRM →]**: navigates to CRM-002 (Contact Detail) for that supporter
- **[Export CSV]**: exports all action data — supporters, messages, timestamps, geography
- **Geographic map**: click a region to filter the action feed to that area
- **Sent/Opened tracking**: for letter/email campaigns, "Sent" means email was dispatched, "Opened" means read receipt was received (not always available)

---

## ACT-009: Delivery Event Documentation

Staff interface for documenting petition delivery or campaign completion events. When signatures are delivered to the target (printed and hand-delivered, emailed in bulk, presented at a hearing), this screen records the evidence.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ← Campaign Analytics            Document Delivery Event                     │
│                                                               [Save Event]   │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Campaign: Stop Deforestation in the Eastern Valley                          │
│  Petition · 2,341 signatures collected                                       │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  ┌─ Delivery Details ──────────────────────────────────────────────────────┐ │
│  │                                                                        │ │
│  │  Delivery Date *                         Delivery Time                 │ │
│  │  ┌────────────────────────────┐          ┌──────────────────────────┐  │ │
│  │  │ 2026-03-03  📅             │          │ 10:00 AM                 │  │ │
│  │  └────────────────────────────┘          └──────────────────────────┘  │ │
│  │                                                                        │ │
│  │  Delivery Method *                                                     │ │
│  │  ○ In-person delivery                                                  │ │
│  │  ○ Mailed / Shipped                                                    │ │
│  │  ○ Email delivery (bulk)                                               │ │
│  │  ○ Presented at public hearing                                         │ │
│  │  ○ Other                                                               │ │
│  │                                                                        │ │
│  │  Location (if in-person)                                               │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐  │ │
│  │  │ Ministry of Environment, Main Office, Av. Central 450           │  │ │
│  │  └──────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                        │ │
│  │  Delivered To                                                          │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐  │ │
│  │  │ Dr. Carmen Soto, Deputy Minister for Natural Resources          │  │ │
│  │  └──────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                        │ │
│  │  Staff Present                                                         │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐  │ │
│  │  │ [× Jorge Rivera]  [× Ana López]  [Add staff...]                │  │ │
│  │  └──────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌─ Evidence ──────────────────────────────────────────────────────────────┐ │
│  │                                                                        │ │
│  │  Photos                                                                │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐             │ │
│  │  │          │  │          │  │          │  │          │             │ │
│  │  │  [photo] │  │  [photo] │  │  [photo] │  │   [+]   │             │ │
│  │  │          │  │          │  │          │  │  Upload  │             │ │
│  │  │          │  │          │  │          │  │          │             │ │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘             │ │
│  │  Delivery handoff  Petition stack  Target receiving                  │ │
│  │                                                                        │ │
│  │  Documents                                                             │ │
│  │  📎 Cover letter.pdf                                     [×]          │ │
│  │  📎 Signature pages — certified.pdf                      [×]          │ │
│  │  [+ Attach Document]                                                   │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌─ Outcome ───────────────────────────────────────────────────────────────┐ │
│  │                                                                        │ │
│  │  Target Response                                                       │ │
│  │  ○ Acknowledged receipt                                                │ │
│  │  ○ Committed to action                                                 │ │
│  │  ○ Noncommittal                                                        │ │
│  │  ○ Refused / Hostile                                                   │ │
│  │  ○ No direct response                                                  │ │
│  │  ○ Not yet known                                                       │ │
│  │                                                                        │ │
│  │  Notes                                                                 │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐  │ │
│  │  │ Deputy Minister Soto accepted the petition and said her team   │  │ │
│  │  │ would review it within 30 days. She noted the number of        │  │ │
│  │  │ signatures and asked about the geographic distribution...      │  │ │
│  │  └──────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌─ Related Coverage ──────────────────────────────────────────────────────┐ │
│  │                                                                        │ │
│  │  Link press coverage of this delivery:                                 │ │
│  │  [+ Link Coverage Entry]  (searches PRESS coverage log)                │ │
│  │                                                                        │ │
│  │  📰 "2,000+ Sign Petition Against Valley Logging" — El Nuevo Día      │ │
│  │     Mar 3, 2026  ·  Print + Online  ·  [View in Coverage Log →]       │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│  [Save Event]    [Save & Share with Team]                                    │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Mobile

Same fields, stacked vertically. Photo upload uses device camera directly. GPS auto-fills location if permitted.

### Interaction

- **Partial offline support**: delivery details and photos can be captured in the field without connectivity. Data syncs when connection is restored. Offline state shows "Saved locally — will sync when connected" banner
- **Photo upload**: supports camera capture (preferred in field) or gallery selection. Photos auto-compress for bandwidth
- **Staff present**: tag picker from org member list. Records who attended the delivery for accountability
- **Related coverage**: links to entries in the Coverage Log (PRESS-010). Cross-references press coverage of the delivery event
- **[Save & Share with Team]**: saves and sends a summary to the campaign's internal messaging thread with photos attached
- **Target response**: tracked over time — staff can return to update the response as it evolves
- **Multiple deliveries**: a campaign can have multiple delivery events (e.g., petition delivered to multiple officials). Each is a separate ACT-009 record

---

## Empty States Summary

| Screen | Empty Message | Action |
|--------|--------------|--------|
| ACT-001 (no campaigns) | Activism campaigns let you organize letter-writing actions, petitions, and public comment campaigns. Create your first campaign to start mobilizing supporters. | [+ New Campaign ▾] |
| ACT-001 (no results) | No campaigns match your filters. | Clear filters |
| ACT-005 (campaign ended) | This action is no longer active. Thank you for your interest. | (link to org homepage if available) |
| ACT-006 (petition closed) | This petition has been closed. Thank you to all 2,341 signers. | Share link |
| ACT-008 (no actions yet) | No one has taken action yet. Share the campaign link to get started. | Copy Link |
| ACT-009 (no deliveries) | No delivery events have been documented for this campaign. | Document Delivery |

---

## Accessibility Notes

- Public action pages (ACT-005, ACT-006) meet WCAG AA for contrast — critical since these serve the broadest audience
- All form fields have visible labels (no placeholder-only labels)
- AI-generated message is in a clearly bounded region with role="region" and aria-label="Your generated message"
- Approval checkbox is large (minimum 24×24px tap target) with explicit label text
- Progress bars have aria-valuenow, aria-valuemin, aria-valuemax
- Signature counter live-updates use aria-live="polite"
- Photo upload includes alt text input for each photo (screen reader users can describe delivery photos)
- Talking point reordering supports keyboard (arrow keys) in addition to drag

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| AI-generated messages (not template copy-paste) | Each supporter gets a unique AI-written message | Prevents the "form letter" effect that targets learn to ignore. Unique messages carry more weight and avoid anti-astroturfing filters |
| Explicit approval checkbox | Supporter must check "I've reviewed this message" before sending | Legal and ethical requirement — the message is sent on their behalf. Explicit consent prevents "I didn't know what I was signing" |
| Personal connection as optional input | Supporter can share why the issue matters to them personally | AI weaves personal stories into the message, making it more compelling. Optional to reduce friction |
| Talking points ordered (not unordered) | Staff controls priority order of talking points | Order determines AI emphasis — most important points first. Gives staff strategic control over message content |
| Real-time action counter on public pages | Shows total actions taken, updated live | Social proof drives participation — seeing 847 others acted reduces hesitation |
| Petition signatures show first name + last initial only | Privacy-preserving default for public display | Full names could expose supporters in politically sensitive contexts. Staff configures visibility in ACT-003 |
| Regeneration limit (3 per session) | Supporters can regenerate the AI message up to 3 times | Prevents abuse of AI generation while giving supporters enough control to get a message they're comfortable with |

## Open Questions

1. **Multi-target campaigns** — should a single letter campaign support multiple targets (e.g., "email all 3 senators in your district")? Current wireframe shows single-target. Multi-target would require target lookup by supporter location
2. **AI model choice** — which AI model generates personalized messages? Needs to be fast (2-4 second generation time), multilingual, and cost-effective at scale. Model selection affects message quality and per-action cost
3. **Letter vs email** — should the platform also support generating printable letters (PDF) for campaigns targeting officials without email or where physical mail carries more weight? Current scope is email-only
4. **Comment submission verification** — for public comment campaigns using "platform submits directly," how do we verify the regulatory body's email actually accepts the comment? Some agencies use web forms only
5. **Supporter identity verification** — should there be any verification that the supporter is a real constituent (e.g., zip code validation against the target's district)? Too much friction kills completion rates, but fake actions undermine credibility
