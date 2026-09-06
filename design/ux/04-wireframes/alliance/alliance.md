# Alliance Wireframes

## Purpose

Alliance features let sovereign organizations coordinate — sharing resources, running joint campaigns, and reporting aggregate metrics without any org losing control of its data. This document wireframes the 8 alliance screens (ALLY-001 through ALLY-008).

The central UX challenge: alliance operations span organizational boundaries, but each org admin must always understand what they're sharing, with whom, and under what terms. The UI must make the cross-org nature visible without making it feel foreign.

## Scope

| ID | Screen | Personas | Offline | Mobile | Section |
|----|--------|----------|---------|--------|---------|
| ALLY-001 | Alliance Dashboard | OA | No | Yes | Dashboard |
| ALLY-002 | Alliance Member List | OA | No | Desktop | Members |
| ALLY-003 | Affiliation Request Form | OA | No | Desktop | Affiliation |
| ALLY-004 | Affiliation Request Queue | OA | No | Desktop | Affiliation |
| ALLY-005 | Sharing Configuration | OA | No | Desktop | Sharing |
| ALLY-006 | Joint Campaign Setup | OA | No | Desktop | Campaigns |
| ALLY-007 | Shared Analytics | OA | No | Desktop | Analytics |
| ALLY-008 | GOTV Alliance Coordination | OA, FiD | No | Desktop | GOTV |

## Alliance Visual Context

When the user is viewing alliance screens, the navigation shell shifts to signal the cross-org context:

- **Header bar:** Shows the alliance name with an "Alliance" badge and a tenant switcher dropdown (replacing the standard org name)
- **Sidebar:** The Alliance section uses a **teal accent** (`--color-alliance: #0f766e`) instead of the standard primary blue — active state background `#f0fdfa`, active text `#0f766e`. This color differentiation is subtle but consistent, reinforcing that the user is looking at cross-org data.
- **Metric attribution:** All aggregate numbers include "across N orgs" attribution so the user never mistakes alliance-wide data for their own org's data.

### Alliance Navigation Shell — Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  [Alliance Logo]  Coalición Verde  [Alliance ▾]     🔍  ● Synced  🔔  [👤] │
├─────────────┬────────────────────────────────────────────────────────────────┤
│             │                                                                │
│  OVERVIEW   │                                                                │
│  ○ Dashboard│  (content area)                                                │
│             │                                                                │
│  PEOPLE     │                                                                │
│  ○ Contacts │                                                                │
│  ○ Teams    │                                                                │
│             │                                                                │
│  FIELD      │                                                                │
│  ○ Campaigns│                                                                │
│             │                                                                │
│  ...        │                                                                │
│             │                                                                │
│  ALLIANCE   │  ← teal section header                                        │
│  ● Overview │  ← teal active state (#f0fdfa bg, #0f766e text)               │
│  ○ Members  │                                                                │
│  ○ Shared   │                                                                │
│    Campaigns│                                                                │
│  ○ Analytics│                                                                │
│             │                                                                │
│  SETTINGS   │                                                                │
│  ○ Settings │                                                                │
│             │                                                                │
│  ─────────  │                                                                │
│  ○ Help     │                                                                │
│  ○ Español  │                                                                │
└─────────────┴────────────────────────────────────────────────────────────────┘
```

### Tenant Switcher Dropdown

Clicking the alliance name in the header opens a dropdown:

```
┌────────────────────────────────────────┐
│  Switch context                        │
│  ──────────────────────                │
│                                        │
│  🏛 Coalición Verde         Alliance   │  ← current, checked
│                                        │
│  Organizations                         │
│  ──────────────────────                │
│  🟢 Partido Verde          Your org    │
│  ⚪ Movimiento Ecologista              │  ← visible only if
│  ⚪ Candidatura Torres                 │    user has cross-org
│                                        │    access
│  ──────────────────────                │
│  ⚙ Manage Alliance                    │
└────────────────────────────────────────┘
```

The dropdown lets the user switch between the alliance view and individual org views. "Your org" is always listed first with a green indicator. Other orgs are visible only if the user has cross-org access rights.

---

## ALLY-001: Alliance Dashboard

The alliance admin's home within the alliance context. Answers "how is the coalition doing overall?" with aggregate metrics and per-org breakdowns.

### Personas
- Org Admin (primary)

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Alliance Overview                              Last updated: 5 min ago  ↻  │
│  ───────────────────────────────────────────── Date range: [Last 30 days ▾] │
│                                                                              │
│  Coalición Verde · 3 member organizations                                    │
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │  💰 Combined  │  │  🚪 Total    │  │  👥 Shared    │  │  📊 Voter    │    │
│  │  Raised       │  │  Doors       │  │  Volunteers   │  │  Contact     │    │
│  │  $142,800     │  │  3,891       │  │  87           │  │  68.2%       │    │
│  │  across 3 orgs│  │  across 3 orgs│  │  in shared   │  │  of shared   │    │
│  │  ↑ 18% vs prev│  │  ↑ 12%       │  │  pool         │  │  universe    │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  Contribution by Organization                                        │   │
│  │  ────────────────────────────                                        │   │
│  │                                                                       │   │
│  │  Partido Verde         $68,200   1,842 doors   42 volunteers         │   │
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  48% of raised          │   │
│  │                                                                       │   │
│  │  Movimiento Ecologista $45,300   1,204 doors   28 volunteers         │   │
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░  32% of raised          │   │
│  │                                                                       │   │
│  │  Candidatura Torres    $29,300     845 doors   17 volunteers         │   │
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░  21% of raised          │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌─────────────────────────────────┐  ┌─────────────────────────────────┐   │
│  │  Joint Campaigns (2 active)     │  │  Sharing Status                  │   │
│  │  ─────────────────              │  │  ──────────────                  │   │
│  │                                 │  │                                   │   │
│  │  🟢 Voter Registration Drive   │  │  Volunteer sharing    🟢 Active  │   │
│  │     3 orgs · Shared governance  │  │  3 orgs contributing             │   │
│  │     Progress: 68% of goal       │  │                                   │   │
│  │     [View campaign →]           │  │  Voter contact data   🟢 Active  │   │
│  │                                 │  │  Dedup: 1,240 contacts merged    │   │
│  │  🟡 Fundraising Coalition      │  │                                   │   │
│  │     3 orgs · Org-controlled     │  │  Canvassing turfs     🟢 Active  │   │
│  │     Split: 40/35/25             │  │  No overlap verified             │   │
│  │     [View campaign →]           │  │                                   │   │
│  │                                 │  │  Event coordination   🟡 Partial │   │
│  │  [Create joint campaign →]      │  │  2 of 3 orgs opted in            │   │
│  └─────────────────────────────────┘  └─────────────────────────────────┘   │
│                                                                              │
│  ┌─────────────────────────────────┐  ┌─────────────────────────────────┐   │
│  │  ⚠ Needs Attention (3)          │  │  Recent Alliance Activity        │   │
│  │  ─────────────────              │  │  ─────────────────────           │   │
│  │                                 │  │                                   │   │
│  │  🟡 Sharing config change       │  │  2 hours ago                     │   │
│  │     Candidatura Torres updated  │  │  Mov. Ecologista added 5         │   │
│  │     volunteer sharing rules     │  │  volunteers to shared pool       │   │
│  │     [Review →]                  │  │                                   │   │
│  │                                 │  │  Yesterday                       │   │
│  │  🟡 Split approval pending      │  │  Joint fundraising: $2,400       │   │
│  │     Fundraising Coalition —     │  │  split processed                 │   │
│  │     2 of 3 orgs approved        │  │                                   │   │
│  │     [View →]                    │  │  2 days ago                      │   │
│  │                                 │  │  Voter Reg Drive hit 50%         │   │
│  │  🔵 New affiliation request     │  │  milestone                       │   │
│  │     Partido Progresista         │  │                                   │   │
│  │     wants to join               │  │  [View all activity →]           │   │
│  │     [Review →]                  │  │                                   │   │
│  └─────────────────────────────────┘  └─────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Mobile

```
┌──────────────────────────────┐
│  ≡  Alliance        🔍  ↻   │
├──────────────────────────────┤
│  Coalición Verde · 3 orgs    │
│  Last 30 days ▾              │
│                              │
│  ┌──────────────────────────┐│
│  │  💰 Combined Raised      ││
│  │  $142,800    ↑ 18%       ││
│  │  across 3 organizations  ││
│  └──────────────────────────┘│
│                              │
│  ┌──────────────────────────┐│
│  │  🚪 Total Doors          ││
│  │  3,891       ↑ 12%       ││
│  │  across 3 organizations  ││
│  └──────────────────────────┘│
│                              │
│  ┌──────────────────────────┐│
│  │  👥 Shared Volunteers    ││
│  │  87 in shared pool       ││
│  └──────────────────────────┘│
│                              │
│  ┌──────────────────────────┐│
│  │  ⚠ Needs Attention (3)   ││
│  │  🟡 Sharing config change││
│  │  🟡 Split approval       ││
│  │  🔵 Affiliation request  ││
│  │  [View all →]            ││
│  └──────────────────────────┘│
│                              │
│  ┌──────────────────────────┐│
│  │  Joint Campaigns (2)     ││
│  │  🟢 Voter Reg Drive 68% ││
│  │  🟡 Fundraising 40/35/25││
│  │  [View all →]            ││
│  └──────────────────────────┘│
│                              │
├──────────────────────────────┤
│ 📊      👥      💰     💬   ⋯│
│ Dash  Contacts Donate  Msgs More│
└──────────────────────────────┘
```

### Mobile Differences
- Metric cards stack vertically (single column)
- "Contribution by Organization" section omitted — accessible via drill-down on any metric
- Sharing status omitted — accessible from Members screen
- Alerts show top 3 with "View all" link
- Joint campaigns show as a compact list
- Pull-to-refresh triggers data reload

### Interaction Specs

| Element | Action | Result |
|---------|--------|--------|
| Metric card | Tap | Navigate to per-org breakdown for that metric |
| Org contribution bar | Tap org name | Navigate to that org's individual dashboard (if user has access) |
| Joint campaign | Tap "View campaign" | Navigate to ALLY-006 Joint Campaign detail |
| Sharing status item | Tap | Navigate to ALLY-005 Sharing Configuration |
| Alert item | Tap action link | Navigate to relevant screen |
| "Create joint campaign" | Tap | Navigate to ALLY-006 setup wizard |
| Refresh icon (↻) | Tap | Manual data refresh, update "Last updated" timestamp |
| Date range filter | Tap | Dropdown: Last 7 days, Last 30 days, Last 90 days, Custom |

---

## ALLY-002: Alliance Member List

Shows all organizations in the alliance with their membership status, contribution metrics, and sharing configuration summary.

### Personas
- Org Admin

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Members                                                                     │
│  ───────────────────────────────────────────────────────────────────────────  │
│  Coalición Verde · 3 active members, 1 pending                               │
│                                                                              │
│  [+ Invite Organization]                                        🔍 Search   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                                                                       │   │
│  │  Name                    Status    Joined      Sharing     Actions    │   │
│  │  ─────────────────────────────────────────────────────────────────    │   │
│  │                                                                       │   │
│  │  🟢 Partido Verde        Active    Jan 2024    Full          [⋯]     │   │
│  │     Your organization                                                 │   │
│  │     42 shared volunteers · 1,842 doors · $68,200 raised              │   │
│  │                                                                       │   │
│  │  🟢 Movimiento Ecologista Active   Mar 2024    Full          [⋯]     │   │
│  │     28 shared volunteers · 1,204 doors · $45,300 raised              │   │
│  │                                                                       │   │
│  │  🟢 Candidatura Torres    Active    Jun 2024    Partial      [⋯]     │   │
│  │     17 shared volunteers · 845 doors · $29,300 raised                │   │
│  │     ⚠ Event sharing disabled                                         │   │
│  │                                                                       │   │
│  │  ⏳ Partido Progresista   Pending   —           —            [⋯]     │   │
│  │     Requested Feb 28 · Awaiting approval                             │   │
│  │     [Review Request →]                                                │   │
│  │                                                                       │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  Showing 4 organizations                                                     │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Detail Panel (Right Side)

Clicking an org name opens a detail panel on the right (desktop detail panel pattern):

```
┌────────────────────────────────────┐
│  Movimiento Ecologista         ✕   │
│  ────────────────────              │
│                                    │
│  Status: 🟢 Active                │
│  Joined: March 15, 2024           │
│  Primary contact: Ana Rodríguez   │
│                                    │
│  Sharing Configuration             │
│  ────────────────────              │
│  Volunteers     🟢 Sharing        │
│  Voter data     🟢 Sharing        │
│  Canvass turfs  🟢 Sharing        │
│  Events         🟢 Sharing        │
│  Analytics      🟢 Sharing        │
│                                    │
│  Contribution (Last 30 days)       │
│  ────────────────────              │
│  Raised:       $45,300             │
│  Doors:         1,204              │
│  Volunteers:       28              │
│  Calls:            312             │
│                                    │
│  Joint Campaigns                   │
│  ────────────────────              │
│  ● Voter Reg Drive     Active      │
│  ● Fundraising Coalition Active    │
│                                    │
│  [View Full Profile →]             │
│  [Edit Sharing →]                  │
└────────────────────────────────────┘
```

### Actions Menu (⋯)

| Action | Description |
|--------|-------------|
| View profile | Open detail panel |
| Edit sharing | Navigate to ALLY-005 scoped to this org |
| View contributions | Drill into org's metrics |
| Remove from alliance | Confirmation dialog with consequences listed |

### Design Notes
- "Your organization" label on the user's own org — always listed first
- Sharing column shows "Full" (all categories active) or "Partial" (some disabled, with inline warning)
- Pending orgs show request date and review action
- Metric summaries inline under each org give quick context without navigating away
- Desktop only — no mobile variant (per screen inventory)

---

## ALLY-003: Affiliation Request Form

The form an organization fills out to request joining the alliance.

### Personas
- Org Admin (requesting org)

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Request Alliance Affiliation                                                │
│  ───────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  You are requesting to join:                                                 │
│  ┌──────────────────────────────────────────┐                               │
│  │  🏛 Coalición Verde                       │                               │
│  │  3 member organizations                   │                               │
│  │  Founded: January 2024                    │                               │
│  └──────────────────────────────────────────┘                               │
│                                                                              │
│  About Your Organization                                                     │
│  ────────────────────                                                        │
│                                                                              │
│  Organization name:   [Partido Progresista               ]                  │
│  Primary contact:     [Elena Torres                      ]                  │
│  Contact email:       [elena@partidoprogresista.org      ]                  │
│  Contact phone:       [+1 (787) 555-0134                 ]                  │
│                                                                              │
│  Why do you want to join this alliance?                                      │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  We share environmental policy goals and want to coordinate         │   │
│  │  voter outreach in the western municipalities...                     │   │
│  │                                                                       │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  Proposed Sharing                                                            │
│  ────────────────                                                            │
│  These are your initial preferences. Sharing details are finalized           │
│  after approval.                                                             │
│                                                                              │
│  ☑ Volunteer pool — share volunteers for joint campaigns                    │
│  ☑ Voter contact data — contribute to shared contact universe               │
│  ☐ Canvassing turfs — coordinate turf assignment                            │
│  ☑ Event coordination — share event logistics                               │
│  ☑ Analytics — participate in aggregate reporting                           │
│                                                                              │
│                                                                              │
│  [Cancel]                                           [Submit Request →]      │
│                                                                              │
│  By submitting, your request will be reviewed by the alliance                │
│  administrators. You will be notified of the decision.                       │
└──────────────────────────────────────────────────────────────────────────────┘
```

### After Submission

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Request Submitted                                                           │
│  ───────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│                            ✓                                                 │
│                                                                              │
│              Your affiliation request has been                               │
│              submitted to Coalición Verde.                                   │
│                                                                              │
│              The alliance administrators will                                │
│              review your request and you'll be                               │
│              notified of their decision.                                      │
│                                                                              │
│              Typical review time: 2–5 business days                          │
│                                                                              │
│              [Return to Dashboard →]                                         │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Design Notes
- The alliance summary card at the top confirms what the user is joining
- Proposed sharing preferences are non-binding — they signal intent but are finalized during the onboarding process after approval
- Desktop only (per screen inventory)
- The form pre-fills organization name and contact details from the org's existing profile

---

## ALLY-004: Affiliation Request Queue

Where alliance admins review incoming affiliation requests.

### Personas
- Org Admin (alliance admin role)

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Affiliation Requests                                                        │
│  ───────────────────────────────────────────────────────────────────────────  │
│  2 pending · 5 approved · 1 declined                                         │
│                                                                              │
│  [Pending]  [Approved]  [Declined]                                           │
│  ─────────                                                                   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  Partido Progresista                               Requested Feb 28  │   │
│  │  ──────────────────────                                              │   │
│  │  Contact: Elena Torres · elena@partidoprogresista.org                │   │
│  │                                                                       │   │
│  │  "We share environmental policy goals and want to coordinate         │   │
│  │  voter outreach in the western municipalities..."                     │   │
│  │                                                                       │   │
│  │  Proposed sharing: Volunteers, Voter data, Events, Analytics          │   │
│  │                                                                       │   │
│  │  [Approve]  [Decline]  [Request More Info]                           │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  Coalición Urbana                                  Requested Feb 15  │   │
│  │  ──────────────────────                                              │   │
│  │  Contact: Marco Díaz · marco@coalicionurbana.org                     │   │
│  │                                                                       │   │
│  │  "Looking to coordinate urban housing advocacy campaigns              │   │
│  │  across metropolitan municipalities..."                               │   │
│  │                                                                       │   │
│  │  Proposed sharing: Volunteers, Events                                 │   │
│  │                                                                       │   │
│  │  [Approve]  [Decline]  [Request More Info]                           │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  Showing 2 pending requests                                                  │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Approval Confirmation Dialog

```
┌────────────────────────────────────────────┐
│  Approve Partido Progresista?              │
│  ──────────────────────────────            │
│                                            │
│  This will:                                │
│  • Add them as a member of Coalición Verde │
│  • Enable their proposed sharing settings  │
│  • Give them access to alliance features   │
│                                            │
│  You can adjust sharing permissions        │
│  after approval in Sharing Configuration.  │
│                                            │
│  [Cancel]                       [Approve]  │
└────────────────────────────────────────────┘
```

### Decline Dialog

```
┌────────────────────────────────────────────┐
│  Decline Partido Progresista?              │
│  ──────────────────────────────            │
│                                            │
│  Reason (optional — will be sent to the    │
│  requesting organization):                 │
│  ┌────────────────────────────────────┐    │
│  │                                    │    │
│  └────────────────────────────────────┘    │
│                                            │
│  ☐ Allow them to reapply in the future    │
│                                            │
│  [Cancel]                      [Decline]   │
└────────────────────────────────────────────┘
```

### Tab States
- **Pending:** Requests awaiting decision (default view)
- **Approved:** Historical approved requests with join date
- **Declined:** Historical declined requests with reason and whether reapplication is allowed

### Design Notes
- Quoted motivation text from the request form is displayed inline — gives reviewers context without navigating away
- "Request More Info" sends a message to the requesting org's contact (opens compose in messaging)
- Desktop only (per screen inventory)
- Approval requires confirmation to prevent accidental clicks
- Each request card is a self-contained unit with all information needed for a decision

---

## ALLY-005: Sharing Configuration

Controls what each member organization shares with the alliance, at a granular level. The most critical alliance screen for data governance.

### Personas
- Org Admin

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Sharing Configuration                                                       │
│  ───────────────────────────────────────────────────────────────────────────  │
│  Coalición Verde · Manage what is shared across the alliance                 │
│                                                                              │
│  ┌───────────────────────┐                                                   │
│  │ All Members │ By Org  │  ← tab toggle                                    │
│  └───────────────────────┘                                                   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  Volunteer Sharing                                         🟢 Active │   │
│  │  ──────────────────                                                   │   │
│  │                                                                       │   │
│  │  Shared pool: 87 volunteers across 3 organizations                    │   │
│  │                                                                       │   │
│  │  Rules:                                                               │   │
│  │  • Volunteers must consent to cross-org assignment                    │   │
│  │  • Home org retains scheduling priority                               │   │
│  │  • Training requirements: home org's standards apply                  │   │
│  │                                                                       │   │
│  │  Per-org status:                                                      │   │
│  │  Partido Verde          42 shared   🟢 Active    [Edit rules →]      │   │
│  │  Mov. Ecologista        28 shared   🟢 Active    [Edit rules →]      │   │
│  │  Candidatura Torres     17 shared   🟢 Active    [Edit rules →]      │   │
│  │                                                                       │   │
│  │  [Configure volunteer sharing →]                                      │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  Voter Contact Data                                        🟢 Active │   │
│  │  ──────────────────                                                   │   │
│  │                                                                       │   │
│  │  Shared universe: 8,450 contacts (deduped from 9,690 across orgs)    │   │
│  │  Dedup savings: 1,240 contacts (12.8%)                               │   │
│  │                                                                       │   │
│  │  Rules:                                                               │   │
│  │  • "Don't re-knock" list enforced across all orgs                     │   │
│  │  • Contact ownership retained by originating org                      │   │
│  │  • Support scores visible across orgs (read-only)                     │   │
│  │                                                                       │   │
│  │  Per-org status:                                                      │   │
│  │  Partido Verde          4,200 contacts  🟢 Active  [Edit rules →]    │   │
│  │  Mov. Ecologista        3,100 contacts  🟢 Active  [Edit rules →]    │   │
│  │  Candidatura Torres     2,390 contacts  🟢 Active  [Edit rules →]    │   │
│  │                                                                       │   │
│  │  [Configure data sharing →]                                           │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  Canvassing Turfs                                          🟢 Active │   │
│  │  ──────────────────                                                   │   │
│  │                                                                       │   │
│  │  Coordinated turfs: 12 turfs across 3 municipalities                  │   │
│  │  Overlap: None detected ✓                                             │   │
│  │                                                                       │   │
│  │  [Configure turf coordination →]                                      │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  Event Coordination                                       🟡 Partial │   │
│  │  ──────────────────                                                   │   │
│  │                                                                       │   │
│  │  2 of 3 organizations participating                                   │   │
│  │                                                                       │   │
│  │  Partido Verde          🟢 Active                                    │   │
│  │  Mov. Ecologista        🟢 Active                                    │   │
│  │  Candidatura Torres     🔴 Disabled — [Request opt-in →]            │   │
│  │                                                                       │   │
│  │  [Configure event sharing →]                                          │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  Analytics                                                 🟢 Active │   │
│  │  ──────────────────                                                   │   │
│  │                                                                       │   │
│  │  All 3 organizations sharing aggregate analytics                      │   │
│  │  Per-org breakdowns visible to: Alliance admins only                  │   │
│  │                                                                       │   │
│  │  [Configure analytics sharing →]                                      │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────────┘
```

### "By Org" Tab View

When the user switches to the "By Org" tab, the same data is reorganized by organization instead of by sharing category:

```
  ┌──────────────────────────────────────────────────────────────────────┐
  │  Candidatura Torres                                                   │
  │  ──────────────────                                                   │
  │                                                                       │
  │  Volunteer sharing    🟢 Active    17 shared                         │
  │  Voter contact data   🟢 Active    2,390 contacts                    │
  │  Canvassing turfs     🟢 Active                                      │
  │  Event coordination   🔴 Disabled                                    │
  │  Analytics            🟢 Active                                      │
  │                                                                       │
  │  [Edit all sharing for this org →]                                    │
  └──────────────────────────────────────────────────────────────────────┘
```

### Design Notes
- Two views of the same data: "All Members" (by category) and "By Org" (by organization). Same underlying configuration, different lens.
- Status indicators: 🟢 Active, 🟡 Partial (some orgs opted out), 🔴 Disabled
- "Request opt-in" sends a notification to the org's admin asking them to enable that sharing category
- Every sharing category has inline rules — the user always sees what the sharing terms are without drilling down
- Dedup metrics on voter data make the value of sharing concrete
- Desktop only (per screen inventory)
- Changes to sharing configuration are audited (recorded in the alliance audit trail)

---

## ALLY-006: Joint Campaign Setup

Wizard for creating and managing joint campaigns that span multiple member organizations.

### Personas
- Org Admin

### Desktop — Step 1: Campaign Type

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Create Joint Campaign                                      Step 1 of 4     │
│  ───────────────────────────────────────────────────────────────────────────  │
│  ● Campaign Type  ○ Participants  ○ Configuration  ○ Review                 │
│                                                                              │
│  What kind of joint campaign?                                                │
│                                                                              │
│  ┌────────────────────────────────┐  ┌────────────────────────────────┐     │
│  │  🗳 GOTV / Voter Contact       │  │  💰 Joint Fundraising          │     │
│  │                                │  │                                │     │
│  │  Coordinate canvassing, phone  │  │  Shared donation forms with    │     │
│  │  banking, and voter outreach   │  │  configurable splits between   │     │
│  │  across organizations.         │  │  member organizations.         │     │
│  │                                │  │                                │     │
│  │  Includes: shared voter data,  │  │  Includes: split rules,       │     │
│  │  turf coordination, don't-     │  │  shared forms, per-org        │     │
│  │  re-knock lists, shared pools  │  │  attribution, compliance.     │     │
│  │                                │  │                                │     │
│  │  [Select →]                    │  │  [Select →]                    │     │
│  └────────────────────────────────┘  └────────────────────────────────┘     │
│                                                                              │
│  ┌────────────────────────────────┐  ┌────────────────────────────────┐     │
│  │  📋 Voter Registration         │  │  📅 Event Coordination         │     │
│  │                                │  │                                │     │
│  │  Joint voter registration      │  │  Coordinate events across      │     │
│  │  drives with shared targets    │  │  orgs: shared logistics,       │     │
│  │  and territory coordination.   │  │  volunteer scheduling, and     │     │
│  │                                │  │  cross-promotion.              │     │
│  │  [Select →]                    │  │  [Select →]                    │     │
│  └────────────────────────────────┘  └────────────────────────────────┘     │
│                                                                              │
│  [Cancel]                                                                    │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Desktop — Step 2: Participants

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Create Joint Campaign                                      Step 2 of 4     │
│  ───────────────────────────────────────────────────────────────────────────  │
│  ✓ Campaign Type  ● Participants  ○ Configuration  ○ Review                 │
│                                                                              │
│  Voter Registration Drive                                                    │
│                                                                              │
│  Which organizations will participate?                                       │
│                                                                              │
│  ☑ Partido Verde          42 volunteers available                           │
│  ☑ Movimiento Ecologista  28 volunteers available                           │
│  ☑ Candidatura Torres     17 volunteers available                           │
│                                                                              │
│  All 3 member organizations selected.                                        │
│                                                                              │
│  Governance model                                                            │
│  ────────────────                                                            │
│                                                                              │
│  ◉ Shared governance                                                        │
│    Multiple orgs collaborate as co-equals with shared permissions.            │
│    Best for: campaigns where organizations are true partners.                │
│                                                                              │
│  ○ Alliance-controlled                                                       │
│    Alliance admin directs operations. Orgs contribute resources.              │
│    Best for: tightly coordinated efforts like a national GOTV push.          │
│                                                                              │
│  ○ Org-controlled                                                            │
│    Each org runs their piece independently. Alliance coordinates.             │
│    Best for: loose coalitions or issue-based alignments.                      │
│                                                                              │
│                                                                              │
│  [← Back]                                              [Continue →]         │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Desktop — Step 3: Configuration (Voter Registration example)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Create Joint Campaign                                      Step 3 of 4     │
│  ───────────────────────────────────────────────────────────────────────────  │
│  ✓ Campaign Type  ✓ Participants  ● Configuration  ○ Review                 │
│                                                                              │
│  Campaign Details                                                            │
│  ────────────────                                                            │
│                                                                              │
│  Campaign name:    [Voter Registration Drive — Spring 2024   ]              │
│  Start date:       [March 15, 2024      ]                                   │
│  End date:         [April 30, 2024      ]                                   │
│  Goal:             [500 new registrations]                                   │
│                                                                              │
│  Territory                                                                   │
│  ────────────────                                                            │
│                                                                              │
│  ◉ Assign territories by organization                                       │
│    Each org is responsible for specific municipalities or turfs.              │
│                                                                              │
│  ○ Shared territory                                                          │
│    All orgs work the same territory with dedup coordination.                 │
│                                                                              │
│  Resource Sharing                                                            │
│  ────────────────                                                            │
│                                                                              │
│  ☑ Share volunteer pool across organizations                                │
│  ☑ Enforce "don't re-contact" across organizations                          │
│  ☑ Merge voter contact data into shared universe                            │
│  ☐ Allow cross-org volunteer assignment (requires volunteer consent)         │
│                                                                              │
│                                                                              │
│  [← Back]                                              [Continue →]         │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Desktop — Step 3: Configuration (Joint Fundraising variant)

For fundraising campaigns, Step 3 includes the split configuration:

```
│  Donation Split                                                              │
│  ────────────────                                                            │
│                                                                              │
│  Split type: [Percentage-based ▾]                                           │
│                                                                              │
│  Partido Verde          [40] %                                              │
│  Movimiento Ecologista  [35] %                                              │
│  Candidatura Torres     [25] %                                              │
│                                        Total: 100% ✓                        │
│                                                                              │
│  Calculated on: ◉ Net amount (after processor fees)                         │
│                 ○ Gross amount                                               │
│                                                                              │
│  Disbursement:  [Immediate ▾]                                               │
│  Each org must have a connected payment account.                             │
│                                                                              │
│  ⚠ All participating organizations must approve these                       │
│  split terms before the campaign goes live.                                  │
```

### Desktop — Step 4: Review & Launch

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Create Joint Campaign                                      Step 4 of 4     │
│  ───────────────────────────────────────────────────────────────────────────  │
│  ✓ Campaign Type  ✓ Participants  ✓ Configuration  ● Review                 │
│                                                                              │
│  Review Your Joint Campaign                                                  │
│  ─────────────────────────                                                   │
│                                                                              │
│  Type:           Voter Registration                                          │
│  Name:           Voter Registration Drive — Spring 2024                      │
│  Dates:          March 15 – April 30, 2024                                   │
│  Goal:           500 new registrations                                        │
│  Governance:     Shared governance                                            │
│  Territory:      Assigned by organization                                    │
│                                                                              │
│  Participants                                                                │
│  ────────────────                                                            │
│  ✓ Partido Verde                                                             │
│  ✓ Movimiento Ecologista                                                     │
│  ✓ Candidatura Torres                                                        │
│                                                                              │
│  Resource Sharing                                                            │
│  ────────────────                                                            │
│  ✓ Shared volunteer pool                                                     │
│  ✓ Don't re-contact enforcement                                             │
│  ✓ Merged voter contact data                                                │
│  ✗ Cross-org volunteer assignment                                            │
│                                                                              │
│  What happens next                                                           │
│  ────────────────                                                            │
│  1. Each participating org admin will receive an approval request            │
│  2. Once all orgs approve, the campaign goes live                            │
│  3. Shared resources are activated per the configuration above               │
│                                                                              │
│  [← Back]                                        [Send for Approval →]      │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Design Notes
- 4-step wizard using the wizard shell layout (per navigation-shell.md)
- Step 1 is a selection card pattern, not a form — the user picks the campaign type visually
- The three governance models are a critical decision — descriptions explain when each is appropriate
- Joint fundraising requires unanimous consent from all participating orgs before going live
- "Send for Approval" (not "Launch") — the campaign requires multi-org approval before activation
- Desktop only (per screen inventory)
- The wizard can be saved as a draft and resumed later

---

## ALLY-007: Shared Analytics

Cross-org analytics with aggregate metrics and per-org breakdowns. The "how are we doing together?" view.

### Personas
- Org Admin

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Shared Analytics                                   Date range: [Last 30 ▾] │
│  ───────────────────────────────────────────────────────────────────────────  │
│  Coalición Verde · 3 organizations                                           │
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │  🚪 Doors     │  │  📞 Calls     │  │  📋 Registered│  │  👥 Active   │    │
│  │  3,891        │  │  1,847        │  │  342          │  │  87          │    │
│  │  combined     │  │  combined     │  │  combined     │  │  volunteers  │    │
│  │  ↑ 12%       │  │  ↑ 8%        │  │  ↑ 24%       │  │  across orgs │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  Voter Contact Trend (30 days)                                        │   │
│  │  ─────────────────────────────                                        │   │
│  │                                                                       │   │
│  │  600 ┤                                                               │   │
│  │  500 ┤              ___                  ___                          │   │
│  │  400 ┤         ____/   \     ___        /   \____                    │   │
│  │  300 ┤    ____/         \___/   \______/         \___                │   │
│  │  200 ┤___/                                            \__            │   │
│  │  100 ┤                                                               │   │
│  │       W1       W2       W3       W4                                  │   │
│  │                                                                       │   │
│  │  ── Partido Verde  ── Mov. Ecologista  ── Candidatura Torres         │   │
│  │  ━━ Alliance Total                                                    │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  Per-Organization Breakdown                                           │   │
│  │  ──────────────────────────                                           │   │
│  │                                                                       │   │
│  │               Doors    Calls    Registered   Volunteers   Contact %   │   │
│  │  Partido V.   1,842      723         156           42      71.4%     │   │
│  │  Mov. Ecol.   1,204      687         112           28      64.8%     │   │
│  │  Cand. Torres   845      437          74           17      62.1%     │   │
│  │  ─────────────────────────────────────────────────────────────────    │   │
│  │  Alliance     3,891    1,847         342           87      68.2%     │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌─────────────────────────────────┐  ┌─────────────────────────────────┐   │
│  │  Support Score Distribution     │  │  Shared Universe Health          │   │
│  │  ─────────────────────          │  │  ───────────────────             │   │
│  │                                 │  │                                   │   │
│  │  Strong Support  ▓▓▓▓▓▓▓ 28%   │  │  Total contacts:     8,450      │   │
│  │  Lean Support    ▓▓▓▓▓▓▓▓ 32%  │  │  Deduped from:       9,690      │   │
│  │  Undecided       ▓▓▓▓▓  19%    │  │  Overlap:            12.8%      │   │
│  │  Lean Oppose     ▓▓     8%     │  │                                   │   │
│  │  Strong Oppose   ▓      4%     │  │  Contacted:          68.2%      │   │
│  │  Not Home        ▓▓     9%     │  │  Not yet contacted:  31.8%      │   │
│  │                                 │  │                                   │   │
│  │  ── Alliance total              │  │  Don't-re-knock list: 2,847     │   │
│  └─────────────────────────────────┘  └─────────────────────────────────┘   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  Joint Campaign Progress                                              │   │
│  │  ───────────────────────                                              │   │
│  │                                                                       │   │
│  │  Voter Reg Drive        ▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░  68%   342/500        │   │
│  │    PV: 156  ME: 112  CT: 74                                          │   │
│  │                                                                       │   │
│  │  Fundraising Coalition  ▓▓▓▓▓▓▓▓▓░░░░░░░░░░░  47%   $142,800/$300K │   │
│  │    PV: $68.2K  ME: $45.3K  CT: $29.3K                               │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Data Visibility Rules
- **Alliance admins** see all per-org breakdowns
- **Member org admins** see their own org's data + alliance aggregate totals (not other orgs' individual numbers)
- This is enforced server-side, not just hidden in the UI

### Design Notes
- Multi-line chart with per-org series + bold alliance total line
- Breakdown table uses abbreviated org names to fit in columns
- "Shared Universe Health" card makes the payoff from dedup concrete — overlap percentage and don't-re-knock count
- Joint campaign progress shows per-org contribution inline
- Desktop only (per screen inventory)
- All charts are clickable — drill into the underlying data

---

## ALLY-008: GOTV Alliance Coordination

Election day coordination across alliance member organizations. Extends the War Room (DASH-008) with cross-org visibility.

### Personas
- Org Admin
- Field Director

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ████████████████  ELECTION DAY ACTIVE  ████████████████  Polls close: 4h 23m│
├──────────────────────────────────────────────────────────────────────────────┤
│  Alliance GOTV Coordination                          Auto-refresh: 30s  ↻  ● │
│  Coalición Verde · 3 organizations                                           │
│  ─────────────────────────────────────────────────────────────────────────── │
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │  🗳 COMBINED  │  │  🚪 TOTAL    │  │  🚗 RIDES    │  │  ⚠ ISSUES    │    │
│  │  TURNOUT      │  │  KNOCKED     │  │  ALL ORGS    │  │  ALL ORGS    │    │
│  │  11,847       │  │  7,234/12,000│  │  34 pending  │  │  7 open      │    │
│  │  of 34,200    │  │  60%         │  │  128 complete│  │  3 escalated │    │
│  │  34.6%        │  │  across 3 orgs│  │              │  │              │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  Turnout by Organization                                              │   │
│  │  ───────────────────────                                              │   │
│  │                                                                       │   │
│  │  Partido Verde                                                        │   │
│  │    Precinct 1 (San Juan)    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░  41%   🟢 On track │   │
│  │    Precinct 3 (Carolina)    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░  44%   🟢 On track │   │
│  │    Subtotal: 4,231 of 12,450 (34.0%)                                 │   │
│  │                                                                       │   │
│  │  Movimiento Ecologista                                                │   │
│  │    Precinct 2 (Bayamón)     ▓▓▓▓▓▓▓▓▓▓░░░░░░░░  32%   🟡 Behind   │   │
│  │    Precinct 5 (Caguas)      ▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░  37%   🟡 Behind   │   │
│  │    Subtotal: 4,892 of 13,800 (35.4%)                                 │   │
│  │                                                                       │   │
│  │  Candidatura Torres                                                   │   │
│  │    Precinct 4 (Ponce)       ▓▓▓▓▓░░░░░░░░░░░░░░  22%   🔴 Critical │   │
│  │    Subtotal: 2,724 of 7,950 (34.3%)                                   │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌─────────────────────────────────┐  ┌─────────────────────────────────┐   │
│  │  Cross-Org Reallocation         │  │  Alliance Live Feed              │   │
│  │  ──────────────────             │  │  ───────────────                 │   │
│  │                                 │  │                                   │   │
│  │  🟡 Move 6 volunteers from     │  │  ● 2:45 PM                      │   │
│  │     Partido Verde (ahead)  →   │  │  Mov. Ecologista: 3 rides       │   │
│  │     Candidatura Torres (behind) │  │  fulfilled by PV drivers        │   │
│  │     Impact: +est. 180 contacts │  │                                   │   │
│  │     Requires: PV + CT approval  │  │  ● 2:38 PM                      │   │
│  │     [Approve]  [Modify]         │  │  Ponce precinct 4 below         │   │
│  │                                 │  │  target. Alliance reallocation   │   │
│  │  🟡 Share 3 drivers from       │  │  suggested.                      │   │
│  │     Mov. Ecologista  →         │  │                                   │   │
│  │     Candidatura Torres area    │  │  ● 2:30 PM                      │   │
│  │     (18 pending ride requests) │  │  Don't-re-knock conflict:        │   │
│  │     [Approve]  [Modify]         │  │  Resolved. PV defers to ME      │   │
│  │                                 │  │  for Calle Esperanza.            │   │
│  │                                 │  │                                   │   │
│  │                                 │  │  ● 2:22 PM                      │   │
│  │                                 │  │  CT volunteer checked in at      │   │
│  │                                 │  │  PV staging area (cross-org).    │   │
│  └─────────────────────────────────┘  └─────────────────────────────────┘   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  Communication Waves                                                  │   │
│  │  ───────────────────                                                  │   │
│  │                                                                       │   │
│  │  Alliance-level:   Wave 1 ✓ (8 AM)   Wave 2 ✓ (2 PM)   Wave 3 ○ (5 PM) │
│  │  Partido Verde:    Wave 1 ✓          Wave 2 ✓           Wave 3 ○    │   │
│  │  Mov. Ecologista:  Wave 1 ✓          Wave 2 ✓           Wave 3 ○    │   │
│  │  Cand. Torres:     Wave 1 ✓          Wave 2 — skipped   Wave 3 ○    │   │
│  │                                                                       │   │
│  │  [Manage alliance waves →]                                            │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Key Differences from Single-Org War Room (DASH-008)
- **Election Day banner:** Same persistent banner, shared across alliance and org views
- **Metrics are alliance-wide aggregates** with "all orgs" attribution
- **Turnout by Organization:** Precinct data grouped under each org, not flat. Each org sees the full picture.
- **Cross-Org Reallocation:** The alliance-specific feature — moving resources between organizations. Requires approval from both the sending and receiving org.
- **Alliance Live Feed:** Shows cross-org events: ride sharing, turf conflicts resolved, cross-org volunteer check-ins
- **Communication Waves:** Shows both alliance-level and per-org communication timing
- **Dark mode default** (inherits from War Room)
- **Auto-refresh every 30s** (inherits from War Room)
- **Sidebar collapsed to icons** to maximize screen space (inherits from War Room)

### Cross-Org Reallocation Rules
- Reallocation suggestions are generated when one org is significantly ahead and another is critically behind
- Requires approval from both the sending org and the receiving org
- Volunteers being reassigned cross-org must have previously consented to cross-org assignment
- Ride sharing is automatic if cross-org ride coordination was enabled in the joint campaign setup

---

## Alliance Empty States

### Alliance Dashboard — No Alliance

When the user's org is not part of any alliance:

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Alliance                                                                    │
│  ───────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│                                                                              │
│                         🏛                                                   │
│                                                                              │
│                  Your organization is not part                                │
│                  of an alliance.                                              │
│                                                                              │
│         Alliances let multiple organizations coordinate                      │
│         campaigns, share volunteers, and report aggregate                    │
│         metrics — while each org keeps control of its data.                  │
│                                                                              │
│         ┌────────────────────────────────────┐                               │
│         │  Options:                           │                               │
│         │                                     │                               │
│         │  1. Create a new alliance           │                               │
│         │  2. Request to join an existing one  │                               │
│         └────────────────────────────────────┘                               │
│                                                                              │
│         [Create Alliance →]                                                  │
│                                                                              │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Alliance Dashboard — Pending Affiliation

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Alliance                                                                    │
│  ───────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│                         ⏳                                                   │
│                                                                              │
│                  Your affiliation request to                                  │
│                  Coalición Verde is pending.                                  │
│                                                                              │
│                  Submitted: February 28, 2024                                │
│                  Status: Awaiting review                                     │
│                                                                              │
│                  You'll be notified when the                                 │
│                  alliance administrators respond.                            │
│                                                                              │
│         [Cancel Request]                                                     │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Alliance Dashboard — New Alliance (No Members Yet)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Alliance Overview                                                           │
│  ───────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  Coalición Verde · 1 member (you)                                            │
│                                                                              │
│                         👥                                                   │
│                                                                              │
│                  Your alliance is set up.                                     │
│                  Now invite other organizations.                              │
│                                                                              │
│         ┌────────────────────────────────────┐                               │
│         │  Next steps:                        │                               │
│         │                                     │                               │
│         │  1. Invite organizations to join     │                               │
│         │  2. Configure sharing rules          │                               │
│         │  3. Create your first joint campaign │                               │
│         └────────────────────────────────────┘                               │
│                                                                              │
│         [Invite Organization →]                                              │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## Accessibility Notes

- All alliance-specific colors (teal accent) maintain WCAG AA contrast ratios against their backgrounds
- Status indicators (🟢 🟡 🔴) always include text labels ("Active", "Partial", "Disabled") — never color-only
- Org contribution bars include percentage text — not dependent on bar length for meaning
- Cross-org reallocation actions have explicit "Approve" / "Modify" buttons — no drag-and-drop for critical decisions
- Tenant switcher dropdown is keyboard-navigable with arrow keys and Enter
- Alliance Live Feed items are announced by screen reader as they arrive (polite `aria-live` region)

## Offline Behavior

All alliance screens require connectivity. When offline:

- Alliance sidebar items are greyed out with an offline badge (●)
- Tapping a greyed item shows: "Alliance features require an internet connection. Your individual campaign tools are still available offline."
- The alliance section remains in the sidebar (stable navigation principle — items don't disappear)

---

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Alliance nav color | Teal accent (`--color-alliance`) instead of standard primary | Subtle but consistent signal that user is viewing cross-org data |
| Member list as desktop-only | No mobile variant | Alliance admin work is strategic, not field work |
| Sharing as two views | "All Members" (by category) + "By Org" (by organization) | Same data, different lenses for different questions |
| Joint campaign as wizard | 4-step wizard inside wizard shell | Complex multi-org setup benefits from guided flow |
| Three governance models | Lead-org / committee / equal | Different alliance structures need different decision-making models |
| Cross-org reallocation | Requires dual-org approval | Neither org should have resources moved without consent |
| Request form pre-fills | Org name and contact from existing profile | Reduces friction; data already exists |
| Approval as inline cards | Self-contained request cards with all info | Reviewers can decide without navigating away |

## Open Questions

1. **Alliance admin role.** Currently all alliance features are restricted to Org Admin. Should there be a dedicated Alliance Admin role that can be granted to non-OA staff? This would allow a coalition coordinator to manage alliance operations without full org admin access.

2. **Cross-alliance analytics.** Should an org that belongs to multiple alliances see a cross-alliance view? Currently each alliance is independent. If a regional party belongs to both a state coalition and a national alliance, they'd switch between them via the tenant switcher.

3. **Alliance communication channel placement.** The alliance coordination channel (from messaging.md) is a shared group conversation. Should it appear in the Alliance sidebar section or in the Messaging section? Currently unspecified.

4. **Sharing revocation UX.** When an org disables sharing for a category, what happens to already-shared data? The spec says "shared resources are revoked" but the UX for this (confirmation dialog, grace period, impact summary) needs design.

5. **Alliance audit trail.** All sharing configuration changes are audited. Should the audit trail be a dedicated screen (ALLY-009?) or a tab within Sharing Configuration?
