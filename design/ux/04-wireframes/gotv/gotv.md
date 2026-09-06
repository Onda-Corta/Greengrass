# GOTV Admin Wireframes

## Purpose

Get Out The Vote is the highest-stakes operation in the platform — election day itself. Everything the campaign has built (contact data, support scores, volunteer relationships, turf knowledge) converges into a single-day sprint to get identified supporters to the polls.

The core UX challenge: GOTV admin screens serve two timelines. Before election day, staff methodically plan — building the voter universe, cutting turfs, registering poll watchers, staging volunteers. On election day, the same staff shift into real-time operations — monitoring turnout, dispatching rides, triaging issues, reallocating resources. The admin UX must support both the deliberate planning phase and the high-pressure, time-critical operational phase.

Scope boundary: this document covers GOTV **admin, coordination, and field volunteer** screens. Field-mode screens (GOTV Door Card, Walk List) are in `field-mode/field-mode.md`. The War Room Dashboard (DASH-008) is in `dashboards/dashboards.md`. Alliance GOTV coordination (ALLY-008) is in `alliance/alliance.md`.

## Scope

| ID | Screen | Personas | Offline | Mobile | Phase |
|----|--------|----------|---------|--------|-------|
| GOTV-001 | GOTV Universe Builder | OA, FiD | No | Desktop | Pre-Election |
| GOTV-002 | Early Voting Data Upload | OA, FiD, DM | No | Desktop | Pre-Election |
| GOTV-003 | Volunteer Staging Setup | OA, FiD, VC | No | Desktop | Pre-Election |
| GOTV-004 | GOTV Turf Cutting | OA, FiD | No | Desktop | Pre-Election |
| GOTV-005 | Election Day Comms Plan | OA, FiD, CD | No | Desktop | Pre-Election |
| GOTV-006 | Poll Watcher Registry | OA, FiD | No | Desktop | Pre-Election |
| GOTV-007 | Poll Watcher Credential Tracking | OA, FiD | No | Desktop | Pre-Election |
| GOTV-010 | Chase Call Interface | V | No | Primary | Election Day |
| GOTV-011 | Ride Request Form | V, TL, S | Partial | Primary | Election Day |
| GOTV-012 | Ride Coordination — Dispatcher View | OA, FiD, VC | No | Yes | Election Day |
| GOTV-013 | Ride Driver View | V | No | Primary | Election Day |
| GOTV-014 | Poll Watcher Check-in | V | No | Primary | Election Day |
| GOTV-015 | Poll Watcher Issue Report Form | V | Partial | Primary | Election Day |
| GOTV-016 | Poll Watcher Issue Queue | OA, FiD | No | Yes | Election Day |
| GOTV-017 | Turnout Dashboard — Map View | OA, FiD | No | Yes | Election Day |
| GOTV-018 | Turnout Dashboard — Segment View | OA, FiD | No | Desktop | Election Day |
| GOTV-019 | Reallocation Suggestions | OA, FiD | No | Yes | Election Day |
| GOTV-020 | Election Night Results Entry | V | No | Primary | Election Night |
| GOTV-021 | Election Night Results Dashboard | OA, FiD | No | Yes | Election Night |
| GOTV-022 | Post-Election Analysis | OA, FiD | No | Desktop | Post-Election |
| GOTV-023 | Staging Location Check-in | TL | No | Primary | Election Day |

### Cross-References (wireframed elsewhere)

| ID | Screen | Location |
|----|--------|----------|
| DASH-008 | GOTV War Room Dashboard | `dashboards/dashboards.md` |
| GOTV-008 | GOTV Door Card | `field-mode/field-mode.md` |
| GOTV-009 | GOTV Walk List | `field-mode/field-mode.md` |
| ALLY-008 | GOTV Alliance Coordination | `alliance/alliance.md` |

## GOTV Navigation Context

```
GOTV (sidebar section — appears when GOTV is activated)

  Pre-Election Setup
    Universe Builder    → GOTV-001
    Early Voting Upload → GOTV-002
    Staging Locations   → GOTV-003
    Turf Cutting        → GOTV-004
    Comms Plan          → GOTV-005
    Poll Watchers       → GOTV-006, GOTV-007

  Election Day Ops
    War Room            → DASH-008 (cross-ref)
    Turnout Map         → GOTV-017
    Turnout Segments    → GOTV-018
    Chase Calls         → GOTV-010
    Ride Request        → GOTV-011
    Ride Dispatch       → GOTV-012
    Ride Driver         → GOTV-013
    Poll Watcher Check  → GOTV-014
    Issue Report        → GOTV-015
    Issue Queue         → GOTV-016
    Reallocation        → GOTV-019
    Staging Check-in    → GOTV-023

  Results
    Results Entry       → GOTV-020
    Results Dashboard   → GOTV-021

  Post-Election
    Analysis            → GOTV-022
```

---

## GOTV-001: GOTV Universe Builder

Defines which voters the campaign will target on election day. The GOTV universe is the subset of all contacts who should be contacted — typically supporters identified through canvassing, phone banking, and other outreach. This is the foundational step; everything else (turfs, comms, staffing) flows from the universe.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ← GOTV Setup                 GOTV Universe Builder                          │
│                                           [Save Draft]  [Finalize Universe]  │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─ Universe Criteria ─────────────────────────────────────────────────────┐ │
│  │                                                                        │ │
│  │  Include contacts matching ALL of:                                     │ │
│  │                                                                        │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐  │ │
│  │  │ Support Score     [is at least ▾]    [3 ▾]                      │  │ │
│  │  └──────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                        │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐  │ │
│  │  │ Voting History    [has voted in ▾]   [1 of last 3 elections ▾]  │  │ │
│  │  └──────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                        │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐  │ │
│  │  │ Registration      [is ▾]             [Active ▾]                 │  │ │
│  │  └──────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                        │ │
│  │  [+ Add Criterion]                                                     │ │
│  │                                                                        │ │
│  │  ─ Exclude contacts matching ANY of: ────────────────                  │ │
│  │                                                                        │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐  │ │
│  │  │ Tag               [is ▾]             [Do Not Contact ▾]         │  │ │
│  │  └──────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                        │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐  │ │
│  │  │ Early Voted       [is ▾]             [Yes ▾]                    │  │ │
│  │  └──────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                        │ │
│  │  [+ Add Exclusion]                                                     │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌─ Universe Preview ──────────────────────────────────────────────────────┐ │
│  │                                                                        │ │
│  │  Matching Contacts: 14,832                   [↻ Refresh Count]        │ │
│  │                                                                        │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                │ │
│  │  │ Score 5      │  │ Score 4      │  │ Score 3      │                │ │
│  │  │ (Strong)     │  │ (Lean)       │  │ (Soft)       │                │ │
│  │  │ 4,210        │  │ 6,118        │  │ 4,504        │                │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘                │ │
│  │                                                                        │ │
│  │  Geographic Breakdown                                                  │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐  │ │
│  │  │ District/Region      Score 5   Score 4   Score 3   Total        │  │ │
│  │  │ ────────────────     ───────   ───────   ───────   ─────        │  │ │
│  │  │ San Juan North       1,240     1,890     1,320     4,450        │  │ │
│  │  │ Bayamón              980       1,450     1,010     3,440        │  │ │
│  │  │ Caguas               720       1,100     890       2,710        │  │ │
│  │  │ Carolina             650       840       680       2,170        │  │ │
│  │  │ Ponce                620       838       604       2,062        │  │ │
│  │  └──────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌─ Segments ──────────────────────────────────────────────────────── [+] ┐ │
│  │                                                                        │ │
│  │  Segment GOTV contacts into priority tiers for targeting.              │ │
│  │                                                                        │ │
│  │  Tier 1 — Must Contact (first pass)          4,210 contacts            │ │
│  │  Score 5 (Strong supporters)                  [Edit Criteria] [×]      │ │
│  │                                                                        │ │
│  │  Tier 2 — Should Contact (second pass)        6,118 contacts           │ │
│  │  Score 4 (Lean supporters)                    [Edit Criteria] [×]      │ │
│  │                                                                        │ │
│  │  Tier 3 — If Time Allows (third pass)         4,504 contacts           │ │
│  │  Score 3 (Soft supporters)                    [Edit Criteria] [×]      │ │
│  │                                                                        │ │
│  │  [+ Add Segment]                                                       │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  ⓘ Finalizing the universe locks the criteria and generates turf-ready     │
│    contact lists. You can still add exclusions (e.g., early voters)        │
│    after finalization.                                                      │
│                                                                              │
│  [Save Draft]                                          [Finalize Universe]  │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- **Criteria builder**: similar to CRM Segment Builder (CRM-004) but with GOTV-specific fields: Support Score, Voting History, Registration Status, Geography, Tags
- **Live preview**: count updates on [↻ Refresh Count] click (not auto-refresh to avoid expensive queries during editing)
- **Segments**: priority tiers that determine contact order. Tier 1 gets contacted first in every turf pass
- **Finalize Universe**: locks inclusion criteria, generates per-turf contact lists. Confirmation dialog: "This will generate GOTV contact lists for 14,832 voters across 5 regions. Proceed?" Once finalized, status changes to "Finalized" and criteria become read-only (exclusions can still be added)
- **Early Voter exclusion**: auto-applied from GOTV-002 uploads. Shows as a permanent exclusion rule
- **Save Draft**: saves criteria without finalizing. Universe can be refined over days/weeks

---

## GOTV-002: Early Voting Data Upload

Upload lists of voters who have already voted (early/absentee) to remove them from the GOTV universe. Prevents wasting volunteer time contacting voters who've already cast ballots.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ← GOTV Setup                    Early Voting Data Upload                    │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─ Upload Early Voting List ──────────────────────────────────────────────┐ │
│  │                                                                        │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐  │ │
│  │  │                                                                  │  │ │
│  │  │              Drag a file here or click to browse                 │  │ │
│  │  │              CSV or Excel  ·  Max 50MB                          │  │ │
│  │  │                                                                  │  │ │
│  │  └──────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                        │ │
│  │  Data Source *                                                         │ │
│  │  ○ Official electoral authority file                                   │ │
│  │  ○ Poll watcher reports                                                │ │
│  │  ○ Voter self-report (lower confidence)                                │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌─ Column Mapping ────────────────────────────────────── (after upload) ──┐ │
│  │                                                                        │ │
│  │  File: early_voters_mar2.csv  ·  2,847 rows  ·  6 columns             │ │
│  │                                                                        │ │
│  │  Match file columns to voter fields:                                   │ │
│  │                                                                        │ │
│  │  File Column          →   GreenGrass Field                             │ │
│  │  ─────────────────        ────────────────                             │ │
│  │  voter_id             →   [Voter ID ▾]         ✓ Primary match key     │ │
│  │  full_name            →   [Full Name ▾]        ↳ Used if no Voter ID   │ │
│  │  date_of_birth        →   [Date of Birth ▾]    ↳ Secondary match       │ │
│  │  vote_date            →   [Vote Date ▾]                                │ │
│  │  vote_method          →   [Vote Method ▾]                              │ │
│  │  precinct             →   [Precinct ▾]                                 │ │
│  │                                                                        │ │
│  │  [Preview Matches]                                                     │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌─ Match Preview ─────────────────────────────────── (after matching) ────┐ │
│  │                                                                        │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                │ │
│  │  │ Total Rows   │  │ Matched      │  │ Unmatched    │                │ │
│  │  │ 2,847        │  │ 2,614 (92%)  │  │ 233 (8%)     │                │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘                │ │
│  │                                                                        │ │
│  │  ┌──────────────┐  ┌──────────────┐                                  │ │
│  │  │ In Universe  │  │ Not in Univ. │                                  │ │
│  │  │ 1,204        │  │ 1,410        │                                  │ │
│  │  │ Will remove  │  │ No action    │                                  │ │
│  │  └──────────────┘  └──────────────┘                                  │ │
│  │                                                                        │ │
│  │  ⓘ 1,204 voters will be marked as "Early Voted" and excluded from    │ │
│  │    GOTV contact lists. 1,410 matched voters are not in the GOTV       │ │
│  │    universe (no action needed).                                        │ │
│  │                                                                        │ │
│  │  [Import & Exclude from Universe]                                      │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Upload History                                                              │
│  ──────────────                                                              │
│  Mar 2 · Official file · 2,847 rows · 1,204 excluded · by Jorge Rivera     │
│  Mar 1 · Official file · 1,923 rows · 812 excluded · by Ana López           │
│  Feb 28 · Poll watcher · 342 rows · 198 excluded · by Jorge Rivera          │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- **Three-step flow**: Upload → Map columns → Preview & confirm. Similar to CRM Data Import (CRM-008) but simpler
- **Match keys**: Voter ID is primary. Falls back to name + DOB combo for fuzzy matching
- **Data source confidence**: Official files get highest confidence. Self-reports flagged as lower confidence in analytics
- **Cumulative**: multiple uploads are additive. Each adds more early voters to the exclusion list
- **Upload history**: shows all previous uploads with row counts, exclusion counts, and who performed them
- **Undo**: individual uploads can be reverted from history (re-includes those voters in the universe)

---

## GOTV-003: Volunteer Staging Setup

Create and manage physical staging locations where volunteers gather on election day before deploying to their turf assignments.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ← GOTV Setup                    Staging Locations           [+ Add Location]│
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────────────────┐  ┌────────────────────────────────────┐│
│  │                                  │  │                                    ││
│  │       [Map with pins]            │  │  Community Center — San Juan North ││
│  │                                  │  │  ──────────────────────────────── ││
│  │       📍 3 staging locations     │  │                                    ││
│  │          shown on map            │  │  Address                           ││
│  │                                  │  │  Calle Luna 45, San Juan 00901    ││
│  │                                  │  │                                    ││
│  │                                  │  │  Contact: María Del Valle          ││
│  │                                  │  │  📱 +1 (787) 555-0198             ││
│  │                                  │  │                                    ││
│  │                                  │  │  Hours: 5:30 AM – 8:00 PM         ││
│  │                                  │  │  Capacity: 40 volunteers           ││
│  │                                  │  │                                    ││
│  │                                  │  │  Assigned: 34 / 40                 ││
│  │                                  │  │  ████████████████░░░░ 85%         ││
│  │                                  │  │                                    ││
│  │                                  │  │  Supplies                          ││
│  │                                  │  │  ☑ Walk sheets (200)              ││
│  │                                  │  │  ☑ Door hangers (500)             ││
│  │                                  │  │  ☑ Water/snacks                   ││
│  │                                  │  │  □ Phones/chargers                ││
│  │                                  │  │                                    ││
│  │                                  │  │  [Edit] [View Roster] [Delete]     ││
│  │                                  │  │                                    ││
│  └──────────────────────────────────┘  └────────────────────────────────────┘│
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │  All Staging Locations                                                │  │
│  │  ─────────────────────                                                │  │
│  │                                                                       │  │
│  │  Location                     Contact          Capacity   Assigned    │  │
│  │  ──────────────────────       ──────────       ────────   ────────    │  │
│  │  📍 Community Ctr — SJ North  María Del Valle  40         34 (85%)   │  │
│  │  📍 Church Hall — Bayamón     Carlos Ruiz      30         28 (93%)   │  │
│  │  📍 School Gym — Caguas       Luisa Fernández  25         18 (72%)   │  │
│  │                                                                       │  │
│  │  Totals                                         95         80 (84%)   │  │
│  │                                                                       │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Create/Edit Location (modal)

```
┌─ Add Staging Location ─────────────────────────┐
│                                                 │
│  Location Name *                                │
│  ┌─────────────────────────────────────────┐   │
│  │ Community Center — San Juan North       │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  Address *                                      │
│  ┌─────────────────────────────────────────┐   │
│  │ Calle Luna 45, San Juan, PR 00901      │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  Contact Person *        Contact Phone *        │
│  ┌──────────────────┐   ┌──────────────────┐   │
│  │ María Del Valle  │   │ +1 787-555-0198  │   │
│  └──────────────────┘   └──────────────────┘   │
│                                                 │
│  Hours *                                        │
│  Open: [5:30 AM ▾]    Close: [8:00 PM ▾]      │
│                                                 │
│  Capacity *                                     │
│  ┌──────────────────┐                          │
│  │ 40               │  volunteers              │
│  └──────────────────┘                          │
│                                                 │
│  Supplies Checklist                             │
│  □ Walk sheets      Qty: [____]                │
│  □ Door hangers     Qty: [____]                │
│  □ Water/snacks                                │
│  □ Phones/chargers                             │
│  □ [+ Add item...]                             │
│                                                 │
│  Notes                                          │
│  ┌─────────────────────────────────────────┐   │
│  │ Parking available in rear lot...        │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  [Cancel]                        [Save Location]│
│                                                 │
└─────────────────────────────────────────────────┘
```

### Interaction

- **Map + list**: map shows pins for all locations, clicking a pin selects the detail panel. List below for quick scanning
- **Capacity tracking**: visual bar showing assigned vs. capacity. Over-capacity highlighted in amber
- **[View Roster]**: shows the list of volunteers assigned to this location — names, phone numbers, assigned turfs, check-in status (on election day)
- **Supplies checklist**: customizable per location. Items can be checked off as delivered
- **Volunteer assignment**: volunteers are assigned to staging locations when turfs are assigned (GOTV-004). This screen shows the resulting assignments

---

## GOTV-004: GOTV Turf Cutting

Create election-day-specific turfs optimized for speed and supporter density. GOTV turfs are smaller than canvassing turfs — designed for 1-2 hour completion in a time-critical context. Supports multiple passes (morning, afternoon, evening) over the same geography.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ← GOTV Setup                    GOTV Turf Cutting                           │
│                                                [Auto-Generate]  [Save All]   │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────────────────────────┐  ┌────────────────────────────┐│
│  │                                          │  │ Turf Details               ││
│  │         [Map — full interactive]         │  │ ────────────               ││
│  │                                          │  │                            ││
│  │   Colored polygons showing turf          │  │ Selected: Turf SJ-N-03    ││
│  │   boundaries. Color by:                  │  │                            ││
│  │   ○ Completion status                    │  │ Contacts: 42              ││
│  │   ○ Priority tier                        │  │  Tier 1: 18              ││
│  │   ○ Assignment status                    │  │  Tier 2: 16              ││
│  │                                          │  │  Tier 3: 8               ││
│  │   Draw tools:                            │  │                            ││
│  │   [✎ Draw] [□ Select] [✂ Split]         │  │ Est. Time: 1h 15m         ││
│  │                                          │  │ Walking Dist: 2.1 km      ││
│  │   Supporter density heatmap              │  │                            ││
│  │   overlay (toggle on/off)                │  │ Staging: Community Ctr     ││
│  │                                          │  │          SJ North          ││
│  │                                          │  │                            ││
│  │                                          │  │ Assigned: (unassigned)     ││
│  │                                          │  │ [Assign Volunteer ▾]      ││
│  │                                          │  │                            ││
│  │                                          │  │ Pass Schedule              ││
│  │                                          │  │ ☑ Morning  (6-10 AM)      ││
│  │                                          │  │ ☑ Afternoon (12-3 PM)     ││
│  │                                          │  │ □ Evening  (4-7 PM)       ││
│  │                                          │  │                            ││
│  │                                          │  │ [Edit Boundary] [Delete]   ││
│  │                                          │  │                            ││
│  └──────────────────────────────────────────┘  └────────────────────────────┘│
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │  Turf Summary                                                         │  │
│  │  ─────────────                                                        │  │
│  │  Total Turfs: 38    Contacts Covered: 14,832 / 14,832 (100%)         │  │
│  │  Assigned: 31 / 38  Avg Contacts/Turf: 390                           │  │
│  │  Avg Est. Time: 1h 20m                                                │  │
│  │                                                                       │  │
│  │  ⚠ 7 turfs unassigned. Assign volunteers before election day.        │  │
│  │                                                                       │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Auto-Generate Modal

```
┌─ Auto-Generate GOTV Turfs ─────────────────────┐
│                                                 │
│  Target Contacts per Turf                       │
│  ┌──────────────┐                              │
│  │ 40           │  (recommended: 30-50)        │
│  └──────────────┘                              │
│                                                 │
│  Max Completion Time                            │
│  ┌──────────────┐                              │
│  │ 90 minutes   │                              │
│  └──────────────┘                              │
│                                                 │
│  Priority                                       │
│  ○ Minimize walking distance                    │
│  ○ Maximize supporter density                   │
│  ○ Balance both                                 │
│                                                 │
│  Staging Location Assignment                    │
│  ☑ Auto-assign to nearest staging location      │
│                                                 │
│  [Cancel]         [Generate 38 Turfs (preview)] │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Interaction

- **Map-centric**: most time spent drawing or adjusting turf boundaries on the map. Same drawing tools as canvassing turf management (CANV-004) but with GOTV-specific parameters
- **Auto-generate**: creates turfs algorithmically based on target contacts per turf, time constraints, and optimization priority. Preview before applying
- **Multi-pass scheduling**: same geography can be contacted multiple times (morning for catch, afternoon for follow-up). Each pass is a checkbox on the turf
- **Supporter density heatmap**: overlay shows where supporters are concentrated. Helps manual turf cutting focus on high-value areas
- **Assignment**: turfs assigned to individual volunteers or team lead + team. Dropdown searches the volunteer roster
- **Dynamic re-cutting** (election day): on election day, staff can access this screen from the War Room to split or merge turfs based on real-time turnout data. Banner shows "Election Day — changes apply immediately to field workers"
- **Coverage check**: bottom summary shows total coverage. Warning if any universe contacts fall outside all turfs

---

## GOTV-005: Election Day Comms Plan

Pre-configure the sequence of communications that go out on election day. Each "wave" is a scheduled blast (SMS, WhatsApp, email) targeting voters who haven't yet voted.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ← GOTV Setup                    Election Day Communications Plan            │
│                                                                [Save Plan]   │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─ Communication Timeline ────────────────────────────────────────────────┐ │
│  │                                                                        │ │
│  │  6 AM    8 AM    10 AM   12 PM   2 PM    4 PM    6 PM    8 PM         │ │
│  │  ├───────┼───────┼───────┼───────┼───────┼───────┼───────┤            │ │
│  │  ▲               ▲               ▲               ▲                    │ │
│  │  Wave 1          Wave 2          Wave 3          Wave 4               │ │
│  │  Morning         Midday          Afternoon       Final                │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌─ Wave 1: Morning Reminder ──────────────────────────────────────── [×] ┐ │
│  │                                                                        │ │
│  │  Scheduled Time *     Trigger                                          │ │
│  │  [6:30 AM ▾]          ○ Auto-send at time  ○ Manual trigger           │ │
│  │                                                                        │ │
│  │  Channel *            Audience                                         │ │
│  │  [SMS ▾]              ○ Full GOTV universe (who haven't voted)         │ │
│  │                       ○ Tier 1 only                                    │ │
│  │                       ○ Custom segment                                 │ │
│  │                                                                        │ │
│  │  Message                                                               │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐  │ │
│  │  │ Buenos días {{first_name}}! Today is Election Day. Polls are    │  │ │
│  │  │ open 8 AM - 5 PM. Your polling place: {{polling_location}}.    │  │ │
│  │  │ Every vote counts! 🗳️                                          │  │ │
│  │  └──────────────────────────────────────────────────────────────────┘  │ │
│  │  SMS: 148 / 160 chars (1 segment)   Recipients: ~12,450              │ │
│  │                                                                        │ │
│  │  Status: ● Ready                                                       │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌─ Wave 2: Midday Follow-up ─────────────────────────────────────── [×] ┐ │
│  │                                                                        │ │
│  │  Scheduled Time *     Trigger                                          │ │
│  │  [11:30 AM ▾]         ○ Auto-send at time  ● Manual trigger           │ │
│  │                                                                        │ │
│  │  Channel *            Audience                                         │ │
│  │  [WhatsApp ▾]         ● Full GOTV universe (who haven't voted)        │ │
│  │                       ○ Tier 1 only                                    │ │
│  │                                                                        │ │
│  │  Message                                                               │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐  │ │
│  │  │ {{first_name}}, polls close at 5 PM today. Have you voted yet? │  │ │
│  │  │ Your polling place: {{polling_location}}. Need a ride?          │  │ │
│  │  │ Reply RIDE and we'll help! 🚗                                   │  │ │
│  │  └──────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                        │ │
│  │  Quick Reply Buttons (WhatsApp)                                        │ │
│  │  [Already Voted]  [Need a Ride]  [Where's My Poll?]                   │ │
│  │                                                                        │ │
│  │  Status: ● Ready                                                       │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌─ Wave 3: Afternoon Push ────────────────────────────────────────── [×] ┐ │
│  │  [Collapsed — click to expand]                                         │ │
│  │  2:00 PM · SMS · Manual trigger · Tier 1 + Tier 2 not voted           │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌─ Wave 4: Final Push ───────────────────────────────────────────── [×] ┐ │
│  │  [Collapsed — click to expand]                                         │ │
│  │  4:00 PM · SMS + WhatsApp · Manual trigger · All not voted             │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  [+ Add Wave]                                                                │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│  ⓘ "Who haven't voted" excludes contacts marked as early voted and         │
│    any voters confirmed voted during election day via poll watcher           │
│    reports or self-report.                                                   │
│                                                                              │
│  [Save Plan]                                                                 │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Election Day State

On election day, each wave shows additional controls:

```
│  Status: ● Ready   →   [Send Now]  or  (Auto-sends at 6:30 AM)          │
│  Status: ● Sending →   Sent: 8,234 / 12,450  (66%)                      │
│  Status: ● Sent    →   Delivered: 11,890 / 12,450 (95%)  ·  2 min ago   │
```

### Interaction

- **Visual timeline**: top bar shows wave timing at a glance. Drag wave markers to adjust timing
- **Auto vs manual trigger**: auto-send fires at the scheduled time with no intervention. Manual trigger requires a staff member to click [Send Now] in the War Room — useful for waves that depend on turnout data
- **Dynamic audience**: "who haven't voted" recalculates at send time using the latest early voting data and election day confirmations
- **Personalization tokens**: `{{first_name}}`, `{{polling_location}}`, `{{polling_hours}}` — auto-filled per recipient
- **WhatsApp quick replies**: up to 3 buttons. "Already Voted" auto-marks the contact as voted. "Need a Ride" creates a ride request (GOTV-012)
- **GOTV override**: election day comms bypass normal quiet hours and frequency caps (as configured in Communications Preferences)

---

## GOTV-006: Poll Watcher Registry

Register and manage poll watchers. Track their registration status with electoral authorities and assign them to polling locations.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ← GOTV Setup                    Poll Watchers             [+ Add Watcher]   │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  [Search watchers...]   Status: [All ▾]   Location: [All ▾]                 │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │ Name              Status       Polling Location     Backup     Creds  │  │
│  │ ────────────────  ──────────   ──────────────────   ────────   ─────  │  │
│  │ Jorge Rivera      ● Registered Esc. Lincoln, SJ     Esc. Muñoz  ✓    │  │
│  │ Ana López         ● Registered Centro Com. Bayamón  —           ✓    │  │
│  │ Carlos Méndez     ◐ Pending    Esc. Barbosa, Caguas —           —    │  │
│  │ María Santos      ○ Not filed  (unassigned)          —           —    │  │
│  │ Luis Ortiz        ● Registered Iglesia San José     Esc. Lincoln ✓   │  │
│  │ Carmen Vega       ◐ Pending    Esc. Muñoz, SJ       —           —    │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                      │
│  │ Total        │  │ Registered   │  │ Locations    │                      │
│  │ 6 watchers   │  │ 3 (50%)      │  │ 4 covered    │                      │
│  └──────────────┘  └──────────────┘  └──────────────┘                      │
│                                                                              │
│  Jurisdiction Requirements                                                   │
│  ─────────────────────────                                                   │
│  Registration deadline: Mar 15, 2026 (12 days away)                          │
│  Required documents: Government ID, party affiliation proof                  │
│  Filing authority: Comisión Estatal de Elecciones                            │
│  [Export Roster for Filing]                                                   │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Add/Edit Watcher (modal)

Fields: Name, Phone, Email, Government ID #, Party affiliation, Assigned polling location (dropdown of known locations), Backup location, Registration status (Not filed / Pending / Registered / Denied), Notes.

### Interaction

- **Status badges**: ○ Not filed, ◐ Pending, ● Registered, ✕ Denied
- **Credential tracking**: ✓ indicates credentials received (tracked in detail in GOTV-007)
- **[Export Roster for Filing]**: generates a formatted document matching jurisdiction requirements for submission to electoral authorities
- **Deadline warning**: amber at 14 days, red at 7 days before registration deadline
- **Backup assignments**: if a primary watcher can't attend, backup is automatically promoted
- **Row click**: opens watcher detail with full history, assigned location details, and credential documents

---

## GOTV-007: Poll Watcher Credential Tracking

Track credentials/certificates issued by electoral authorities for registered poll watchers.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ← Poll Watchers                 Credential Tracking                         │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │ Watcher           Credential        Issued       Expires    Status    │  │
│  │ ────────────────  ──────────────    ──────────   ────────   ──────    │  │
│  │ Jorge Rivera      CEE-2026-4521    Feb 28       Mar 15     ✓ Valid   │  │
│  │                   📎 credential.pdf                                   │  │
│  │                                                                       │  │
│  │ Ana López         CEE-2026-4522    Feb 28       Mar 15     ✓ Valid   │  │
│  │                   📎 credential.pdf                                   │  │
│  │                                                                       │  │
│  │ Luis Ortiz        CEE-2026-4598    Mar 2        Mar 15     ✓ Valid   │  │
│  │                   📎 credential.pdf                                   │  │
│  │                                                                       │  │
│  │ Carlos Méndez     —                —            —          ⏳ Pending│  │
│  │                   Registration pending                                │  │
│  │                                                                       │  │
│  │ Carmen Vega       —                —            —          ⏳ Pending│  │
│  │                   Registration pending                                │  │
│  │                                                                       │  │
│  │ María Santos      —                —            —          — Not filed│  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                      │
│  │ Credentials  │  │ Pending      │  │ Missing      │                      │
│  │ 3 received   │  │ 2            │  │ 1            │                      │
│  └──────────────┘  └──────────────┘  └──────────────┘                      │
│                                                                              │
│  [Print Credential Summary]                                                  │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- **Upload credential**: click a row to upload credential PDF or photo. Record credential number, issue date, expiration
- **Status**: Valid (credential received and not expired), Pending (registration pending), Not filed (registration not started), Expired (past expiration date)
- **[Print Credential Summary]**: generates a printable sheet with all watcher names, locations, and credential numbers — for field day distribution
- **Expiration warnings**: credentials expiring within 7 days highlighted in amber
- **Compact view**: this is a simpler extension of GOTV-006, often accessed from the same flow

---

## GOTV-010: Chase Call Interface

Mobile-first phone banking interface for GOTV chase calls — contacting voters who haven't yet voted on election day. This is the highest-urgency phone bank: every call is a direct attempt to get a supporter to the polls before they close. The interface is stripped down for speed and single-purpose focus.

### Mobile (Primary)

The screen is organized as a single-card, single-task flow optimized for one-handed use. Top to bottom:

**Election Day Header Bar** — persistent bar at the top of the screen showing the election day clock: "Polls close in 3h 12m" with a countdown timer. Background color shifts from green (>4 hours) to amber (2-4 hours) to red (<2 hours) as time runs out. This creates urgency without requiring the caller to check the time.

**Progress Counter** — immediately below the header: "23 of 145 calls made" with a thin progress bar. Shows the caller how far through their list they are and how much remains.

**Contact Card** — the main content area. A full-width card displaying:
- Voter name (large, bold — the first thing the caller sees)
- Support tier badge (e.g., "Tier 1 — Strong Supporter") with color coding
- Phone number (tappable, large font)
- Address (street address, municipality)
- Voting status: "Not Voted" (default for chase list) or "Early Voted — Skip" if the voter was marked after the list was generated
- Polling location name and hours

**Call Button** — a large, full-width primary button: "Call [First Name]". Tapping opens the device phone dialer via `tel:` link (BYOP model — the volunteer uses their own phone and carrier). The button is 56px tall with high contrast.

**Result Buttons** — appear below the call button in a 2x3 grid of quick-result options. Each button is a large touch target (minimum 48px tall):
- **Voted** (green) — voter confirms they already voted or will go now
- **Will Vote** (blue) — voter says they plan to vote but hasn't yet
- **Not Voting** (gray) — voter declines or says they won't vote
- **No Answer** (gray) — call wasn't picked up
- **Wrong Number** (amber) — number is incorrect
- **Do Not Call** (red) — voter requests removal from call list

**Needs a Ride** — below the result grid, a secondary toggle: "Needs a ride to polls?" When enabled, tapping a positive result (Voted/Will Vote) also creates a ride request routed to the GOTV-011 form (pre-filled with voter name, address, and polling location) and then into the GOTV-012 dispatcher queue.

**Auto-Advance** — after a result is logged, the screen auto-advances to the next contact after a 1-second delay. A brief toast confirms the result: "Logged: No Answer. Next call..." The caller can tap "Undo" on the toast to go back and change the result.

**Skip Button** — small text link at the bottom: "Skip this contact →" for cases where the caller needs to move on without logging a result (e.g., they recognize the person and know they've voted).

### Interaction

- **List source**: the chase call list is generated from the GOTV universe (GOTV-001) filtered to voters not yet marked as voted. Ordered by priority tier (Tier 1 first, then Tier 2, then Tier 3)
- **BYOP model**: the platform does not place calls — it provides the number and the caller uses their own phone. The `tel:` link opens the native dialer. This avoids telephony infrastructure and works on any device
- **Result logging is the primary action**: the screen is designed so that after each call, the caller taps one button and moves on. No forms, no text entry, no navigation
- **Ride request shortcut**: the "Needs a Ride" flag creates a ride request (GOTV-011) with voter name, address, and polling location pre-filled. The caller doesn't leave the chase call flow — the request is submitted in the background
- **Offline**: not supported. Chase calls require real-time list updates to avoid duplicate calls across volunteers. If connectivity is lost, the screen shows a banner: "Offline — results will sync when reconnected" but the caller can continue working from the cached list
- **Mirrors PHONE-004**: the layout closely follows the standard phone bank call interface but removes survey questions, scripts, and multi-issue tracking. The only question is binary: did they vote / will they vote?

### Design Notes

- The election day clock is the most important ambient element — it keeps the caller aware of urgency without being distracting. The color shift is subtle but effective
- Result buttons are deliberately large and few. On a high-stress, high-volume day, reducing the number of taps per call is critical. Six options cover every outcome without requiring "Other" or free text
- Auto-advance eliminates the need to manually navigate to the next contact. The 1-second delay gives the caller a beat to mentally prepare for the next call
- The "Do Not Call" button is red and positioned last in the grid to prevent accidental taps. Logging DNC is irreversible and removes the contact from all future lists
- No desktop wireframe: this screen is designed for volunteers making calls from their personal phones while standing, walking, or sitting in a staging location. Desktop use is possible but not the target

---

## GOTV-011: Ride Request Form

Simple form for requesting a ride to the polls. Used by volunteers during chase calls (GOTV-010), team leads at staging locations, and staff processing voter requests from SMS/WhatsApp replies. The form is intentionally minimal — requesting a ride should take less than 30 seconds.

### Mobile (Primary)

```
┌────────────────────────────┐
│  Request a Ride to Polls    │
├────────────────────────────┤
│                            │
│  Voter Name *              │
│  ┌────────────────────────┐│
│  │ María Colón            ││
│  └────────────────────────┘│
│  (pre-filled from contact) │
│                            │
│  Pickup Address *          │
│  ┌────────────────────────┐│
│  │ Calle Sol 12, San Juan ││
│  └────────────────────────┘│
│                            │
│  Phone Number *            │
│  ┌────────────────────────┐│
│  │ +1 787-555-0142        ││
│  └────────────────────────┘│
│                            │
│  Passengers     [1 ▾]      │
│                            │
│  Accessibility Needs        │
│  □ Wheelchair accessible   │
│  □ Walker / mobility aid   │
│  □ Visual assistance       │
│  □ Other: [____________]   │
│                            │
│  Preferred Pickup Time     │
│  [As soon as possible ▾]   │
│                            │
│  Polling Location          │
│  ┌────────────────────────┐│
│  │ Esc. Lincoln, San Juan ││
│  └────────────────────────┘│
│  (auto-populated from      │
│   voter record, editable)  │
│                            │
│  Notes                     │
│  ┌────────────────────────┐│
│  │ Gate code: 4521        ││
│  └────────────────────────┘│
│                            │
│  ┌────────────────────────┐│
│  │                        ││
│  │   Submit Ride Request  ││
│  │                        ││
│  └────────────────────────┘│
│                            │
└────────────────────────────┘
```

### Confirmation

```
┌────────────────────────────┐
│                            │
│           ✓                │
│                            │
│  Ride requested!           │
│                            │
│  A volunteer driver will   │
│  contact María Colón at    │
│  +1 787-555-0142.          │
│                            │
│  Pickup: Calle Sol 12, SJ  │
│  To: Esc. Lincoln, SJ      │
│  Passengers: 1             │
│  Time: As soon as possible │
│                            │
│  Request #RD-2026-0089     │
│                            │
│  [Submit Another Request]  │
│  [Back to Chase Calls]     │
│                            │
└────────────────────────────┘
```

### Interaction

- **Pre-fill**: when opened from a chase call (GOTV-010), voter name, phone number, address, and polling location are pre-filled from the contact record. The volunteer only needs to confirm and tap Submit
- **Passengers**: defaults to 1, dropdown goes up to 6. Useful when the voter is bringing family members
- **Accessibility checkboxes**: selecting any option flags the ride as requiring an accessible vehicle in the dispatcher queue (GOTV-012). The "Other" field allows free text for needs not covered by the standard options
- **Pickup time**: dropdown with options: "As soon as possible", "Within 30 minutes", "Within 1 hour", or a specific time picker. Defaults to "As soon as possible" for chase call requests
- **Polling location**: auto-populated from the voter's record. Editable in case the voter prefers a different location (where permitted by jurisdiction rules)
- **Offline support**: the form can be filled out and queued locally. When connectivity is restored, the request is submitted automatically. A banner shows: "You're offline — this request will be submitted when you reconnect." The confirmation screen shows "Queued" instead of a reference number
- **Submission**: creates an entry in the GOTV-012 dispatcher queue with status "Pending". Dispatcher is notified of new requests via the auto-refresh mechanism
- **[Back to Chase Calls]**: returns to GOTV-010 at the next contact in the list — the caller doesn't lose their place

### Design Notes

- The form is kept to a single scroll with no tabs or multi-step flow. On election day, every second counts — the fewer taps, the better
- Accessibility needs are checkboxes rather than a dropdown so multiple options can be selected simultaneously (e.g., wheelchair + visual assistance)
- The confirmation screen includes the reference number for tracking and the voter's phone number so the volunteer can tell the voter "someone will call you at this number"
- Pre-fill is critical: when coming from GOTV-010, the form should require zero typing in the common case. Just review and submit
- Notes field is optional but valuable for practical details like gate codes, apartment numbers, or "call when arriving, voter is hard of hearing"

---

## GOTV-012: Ride Coordination — Dispatcher View

Real-time dispatcher interface for matching ride requests with available drivers on election day. Requests come from voter WhatsApp replies, volunteer reports, and phone bank calls.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  GOTV Rides                                            [Map View] [List View]│
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ Pending      │  │ Assigned     │  │ In Transit   │  │ Completed    │    │
│  │ 8            │  │ 5            │  │ 3            │  │ 34           │    │
│  │ ● 2 urgent   │  │              │  │              │  │ today        │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                                              │
│  ┌──────────────────────────────────┐  ┌────────────────────────────────────┐│
│  │                                  │  │ Pending Requests                   ││
│  │       [Map]                      │  │ ──────────────────                 ││
│  │                                  │  │                                    ││
│  │  🔴 = pending (urgent)           │  │ 🔴 María Colón · 1:45 PM          ││
│  │  🟡 = pending                    │  │    Calle Sol 12, SJ → Esc. Lincoln││
│  │  🔵 = assigned/in transit        │  │    Wheelchair accessible           ││
│  │  🟢 = driver available           │  │    ⏱ Waiting 22 min               ││
│  │                                  │  │    [Assign Driver ▾]               ││
│  │  Rider pins + driver pins        │  │                                    ││
│  │  with routing lines              │  │ 🔴 Pedro Ríos · 2:00 PM           ││
│  │                                  │  │    Calle Luna 8 → Centro Comunal  ││
│  │                                  │  │    Needs 2 seats (bringing spouse) ││
│  │                                  │  │    ⏱ Waiting 7 min                ││
│  │                                  │  │    [Assign Driver ▾]               ││
│  │                                  │  │                                    ││
│  │                                  │  │ 🟡 Ana Vega · 2:15 PM             ││
│  │                                  │  │    Bayamón → Esc. Barbosa          ││
│  │                                  │  │    ⏱ Waiting 2 min                ││
│  │                                  │  │    [Assign Driver ▾]               ││
│  │                                  │  │                                    ││
│  │                                  │  │ [Show 5 more...]                   ││
│  │                                  │  │                                    ││
│  └──────────────────────────────────┘  │ ─────────────────────────────────  ││
│                                         │                                    ││
│                                         │ Available Drivers                  ││
│                                         │ ──────────────────                 ││
│                                         │                                    ││
│                                         │ 🟢 Carlos R. · Sedan · 3 seats    ││
│                                         │    Near: San Juan North            ││
│                                         │    Trips today: 4                  ││
│                                         │                                    ││
│                                         │ 🟢 Luisa F. · Van · 6 seats       ││
│                                         │    Near: Caguas                    ││
│                                         │    Trips today: 2                  ││
│                                         │    ☑ Wheelchair accessible         ││
│                                         │                                    ││
│                                         │ 🟢 Miguel T. · Sedan · 3 seats    ││
│                                         │    Near: Bayamón                   ││
│                                         │    Trips today: 5                  ││
│                                         │                                    ││
│                                         └────────────────────────────────────┘│
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Assign Driver Flow

```
[Assign Driver ▾] → dropdown with recommended drivers:
┌─────────────────────────────────────────┐
│ Recommended                             │
│ ✓ Luisa F. · Van · ♿ · 8 min away     │
│   Carlos R. · Sedan · 12 min away      │
│                                         │
│ All Available                           │
│   Miguel T. · Sedan · 22 min away      │
│   [Show more...]                        │
└─────────────────────────────────────────┘
```

### Mobile

```
┌────────────────────────────┐
│  GOTV Rides            [☰] │
├────────────────────────────┤
│                            │
│  Pending: 8 · Assigned: 5  │
│  Transit: 3 · Done: 34     │
│                            │
│  [Pending] [Active] [Done] │
│                            │
│  🔴 María Colón · 1:45 PM  │
│  Calle Sol 12 → Esc Lincol │
│  ♿ Wheelchair · ⏱ 22 min  │
│  [Assign ▾]                │
│                            │
│  🔴 Pedro Ríos · 2:00 PM   │
│  Calle Luna 8 → Centro Com │
│  2 seats · ⏱ 7 min        │
│  [Assign ▾]                │
│                            │
│  🟡 Ana Vega · 2:15 PM     │
│  Bayamón → Esc. Barbosa    │
│  ⏱ 2 min                  │
│  [Assign ▾]                │
│                            │
│  [Show 5 more...]          │
│                            │
└────────────────────────────┘
```

### Interaction

- **Priority ordering**: urgent requests (waiting >15 min, accessibility needs) at top with 🔴
- **Smart matching**: [Assign Driver ▾] shows recommended drivers sorted by proximity, vehicle compatibility (wheelchair accessible, seat count), and workload
- **Map + list split**: map shows spatial relationships, list shows details. Either can be used independently
- **Multi-passenger optimization**: platform can suggest grouping nearby requests for a single driver run
- **Status tracking**: Pending → Assigned (driver notified) → En Route (driver confirmed) → Transporting → Completed
- **Auto-refresh**: 30-second refresh on pending list. New requests appear at top with brief highlight
- **Ride source**: requests come from WhatsApp quick reply ("Need a Ride"), volunteer canvasser reports (field mode), phone bank referrals, or manual entry by dispatcher

---

## GOTV-013: Ride Driver View

Mobile interface for volunteer drivers on election day. A task-by-task workflow: the driver sees their current assignment, completes it, and moves to the next one. No complex data views, no dispatch decisions — just clear instructions for the current ride.

### Mobile (Primary)

```
┌────────────────────────────┐
│  GOTV Driver        [!]    │
│  4 completed · 1 active    │
├────────────────────────────┤
│                            │
│  ── Current Assignment ──  │
│                            │
│  ┌────────────────────────┐│
│  │                        ││
│  │  PICKUP                ││
│  │  María Colón           ││
│  │  📱 +1 787-555-0142    ││
│  │  Calle Sol 12, SJ      ││
│  │                        ││
│  │  Passengers: 1          ││
│  │  ♿ Wheelchair access   ││
│  │                        ││
│  │  TO POLLS              ││
│  │  Esc. Lincoln, SJ      ││
│  │                        ││
│  │  ┌────────────────────┐││
│  │  │   📍 Navigate      │││
│  │  └────────────────────┘││
│  │  (opens native maps)   ││
│  │                        ││
│  │  ┌────────────────────┐││
│  │  │   📱 Call Voter    │││
│  │  └────────────────────┘││
│  │                        ││
│  │  Status:                ││
│  │  [En Route] [Picked Up]││
│  │  [At Polls] [Completed]││
│  │                        ││
│  └────────────────────────┘│
│                            │
│  ── Next Up ──             │
│                            │
│  ┌────────────────────────┐│
│  │ Pedro Ríos             ││
│  │ Calle Luna 8 → Centro  ││
│  │ 2 passengers           ││
│  └────────────────────────┘│
│                            │
│  [Report Issue]            │
│                            │
└────────────────────────────┘
```

### Report Issue (modal)

```
┌─ Report Issue ────────────────────┐
│                                    │
│  Issue Type                        │
│  ○ Voter no-show at pickup         │
│  ○ Delay (traffic, road closure)   │
│  ○ Accessibility problem           │
│  ○ Vehicle issue                   │
│  ○ Other                           │
│                                    │
│  Details                           │
│  ┌────────────────────────────┐   │
│  │ Voter not answering phone, │   │
│  │ waited 10 minutes...       │   │
│  └────────────────────────────┘   │
│                                    │
│  [Cancel]          [Submit Report] │
│                                    │
└────────────────────────────────────┘
```

### Interaction

- **Task-by-task flow**: the driver only sees their current assignment prominently. No list of all assignments, no queue management — that complexity lives in the dispatcher view (GOTV-012)
- **Status progression**: En Route → Picked Up → At Polls → Completed. Each tap advances the status. Status updates are visible to the dispatcher in real time
- **[Navigate]**: opens the device's native maps app (Google Maps, Apple Maps, Waze) with directions to the pickup address. After pickup, the button changes to navigate to the polling location
- **[Call Voter]**: opens phone dialer via `tel:` link. Used when the driver arrives and needs to coordinate ("I'm outside in the blue sedan")
- **Next assignment preview**: shows a compact card for the next ride so the driver knows what's coming. The preview becomes the current assignment when the current ride is marked Completed
- **[Report Issue]**: modal for problems — voter no-show, delays, accessibility mismatches, vehicle breakdowns. Reports go to the dispatcher who can reassign the ride
- **Ride count**: "4 completed, 1 in progress" in the header gives the driver a sense of their contribution for the day
- **Assignment push**: new assignments arrive via push notification. The driver doesn't need to refresh or check for assignments — they appear automatically
- **No offline mode**: drivers need real-time assignment updates and status synchronization with dispatch. Offline driving is not supported

### Design Notes

- The screen is designed for use while standing next to a car or sitting in a parked vehicle. Large text, large buttons, minimal scrolling. The driver should be able to glance at their phone and know exactly what to do next
- Navigate and Call buttons are the two most-used actions and get prominent placement. They use native OS capabilities (`tel:` and maps deep links) rather than in-app implementations
- The status buttons are a horizontal row rather than a stepper — the driver taps the relevant status rather than advancing through each one sequentially. This handles cases where a status is skipped (e.g., voter meets the driver at the curb, so "Picked Up" and "At Polls" happen almost simultaneously)
- Accessibility needs are shown prominently on the assignment card so the driver can confirm their vehicle is suitable before departing. If there's a mismatch, [Report Issue] routes the ride back to dispatch
- The "Next Up" preview reduces anxiety — the driver knows whether they can take a break after the current ride or should head straight to the next pickup

---

## GOTV-014: Poll Watcher Check-in

Simple check-in screen for poll watchers arriving at their assigned polling location on election day. The screen serves a single purpose: confirm arrival so that the field team knows which locations are covered. Minimal interface — this is used once per shift, not repeatedly.

### Mobile (Primary)

```
┌────────────────────────────┐
│  Poll Watcher Check-in      │
├────────────────────────────┤
│                            │
│  ┌────────────────────────┐│
│  │                        ││
│  │  Your Assignment       ││
│  │                        ││
│  │  Esc. Lincoln          ││
│  │  Calle Fortaleza 22    ││
│  │  San Juan, PR 00901    ││
│  │                        ││
│  │  Shift: 8:00 AM – 2 PM││
│  │  Credential: CEE-4521  ││
│  │                        ││
│  └────────────────────────┘│
│                            │
│  Status: ○ Not Checked In  │
│                            │
│  ┌────────────────────────┐│
│  │                        ││
│  │     ✓ Check In Now     ││
│  │                        ││
│  └────────────────────────┘│
│    56px tall, full-width   │
│                            │
│  ─────────────────────     │
│                            │
│  Quick Links               │
│  ──────────                │
│                            │
│  [Report Issue →]          │
│    → GOTV-015              │
│                            │
│  [View Talking Points →]   │
│    Opens reference doc     │
│                            │
│  [Contact Field Director]  │
│    📱 +1 787-555-0101      │
│                            │
│  ─────────────────────     │
│                            │
│  ⓘ Check in when you       │
│  arrive at your assigned   │
│  location. This confirms   │
│  coverage for the field    │
│  team.                     │
│                            │
└────────────────────────────┘
```

### Checked-In State

```
┌────────────────────────────┐
│  Poll Watcher Check-in      │
├────────────────────────────┤
│                            │
│  ┌────────────────────────┐│
│  │                        ││
│  │  Esc. Lincoln          ││
│  │  Calle Fortaleza 22    ││
│  │  San Juan, PR 00901    ││
│  │                        ││
│  │  Shift: 8:00 AM – 2 PM││
│  │  Credential: CEE-4521  ││
│  │                        ││
│  └────────────────────────┘│
│                            │
│  Status: ● Checked In      │
│  Since: 7:52 AM            │
│                            │
│  ┌────────────────────────┐│
│  │   Complete Shift       ││
│  └────────────────────────┘│
│                            │
│  Quick Links               │
│  ──────────                │
│                            │
│  [Report Issue →]          │
│  [View Talking Points →]   │
│  [Contact Field Director]  │
│                            │
└────────────────────────────┘
```

### Interaction

- **Check-in flow**: single tap on "Check In Now" → confirmation vibration (haptic) → status changes to "Checked In" with timestamp. The check-in updates the poll watcher's status in the GOTV-006 registry, visible to field staff
- **Status progression**: Not Checked In → Checked In → Shift Complete. Three states, no complexity
- **GPS validation** (optional, configurable): if enabled, the platform compares the watcher's GPS coordinates against the assigned polling location. If the location doesn't match (>500m), a warning appears: "Your location doesn't match your assigned polling place. Are you at the right location?" The watcher can override and check in anyway — GPS is advisory, not blocking
- **Shift information**: start time, end time, and credential number displayed prominently. The credential number is useful if challenged by election officials at the location
- **Quick links**: three essential actions available throughout the shift:
  - **Report Issue** → opens GOTV-015 (issue report form)
  - **View Talking Points** → opens a reference document with poll watcher rights, what to observe, and how to handle common situations
  - **Contact Field Director** → direct phone call to the assigned field director for the watcher's area
- **[Complete Shift]**: marks the shift as done when the watcher leaves. Timestamp recorded. If a backup watcher is assigned (GOTV-006), they receive a notification to take over

### Design Notes

- This is deliberately one of the simplest screens in the platform. Poll watchers are volunteers, often first-timers, arriving at an unfamiliar location early in the morning. The screen should feel reassuring, not overwhelming
- The assignment card is the anchor — it confirms the watcher is at the right place. Address is displayed prominently so they can verify against the physical location
- The credential number is shown on this screen specifically because poll watchers are sometimes asked to produce their credentials by election officials. Having it visible on their phone is a backup if they misplace the physical document
- GPS validation is optional because GPS can be unreliable indoors or in dense urban areas. It's a helpful check, not a gate
- The "Talking Points" link is important for watcher confidence — having a quick reference for their rights and responsibilities reduces anxiety and improves observation quality

---

## GOTV-015: Poll Watcher Issue Report Form

Form for poll watchers to report issues observed at polling locations. Designed for speed and clarity under pressure — a poll watcher witnessing a problem needs to document it quickly before details fade. Reports feed into the GOTV-016 issue queue for staff triage.

### Mobile (Primary)

```
┌────────────────────────────┐
│  ← Report Issue             │
│  Esc. Lincoln, San Juan     │
├────────────────────────────┤
│                            │
│  Issue Category *          │
│  ┌────────────────────────┐│
│  │ Voter Access          ▾││
│  └────────────────────────┘│
│  Voter Access / Equipment  │
│  Failure / Campaign        │
│  Violation / Long Wait     │
│  Times / Accessibility     │
│  Issue / Voter Intimidation│
│  / Other                   │
│                            │
│  Severity *                │
│  ┌────────────────────────┐│
│  │ High                  ▾││
│  └────────────────────────┘│
│  Critical / High / Medium  │
│                            │
│  Description *             │
│  ┌────────────────────────┐│
│  │ Poll worker asked voter││
│  │ for photo ID. This     ││
│  │ jurisdiction does not  ││
│  │ require photo ID...    ││
│  │                        ││
│  │                        ││
│  └────────────────────────┘│
│                            │
│  Evidence (optional)       │
│  [📷 Take Photo]           │
│  [🖼 Choose from Gallery]  │
│  photo_001.jpg ✓           │
│                            │
│  Time Observed             │
│  [2:34 PM ▾] (now)         │
│  (defaults to now,         │
│   editable)                │
│                            │
│  People Involved (optional)│
│  ┌────────────────────────┐│
│  │ Male poll worker at    ││
│  │ check-in table 2       ││
│  └────────────────────────┘│
│                            │
│  ┌────────────────────────┐│
│  │ ⚠ This requires        ││
│  │ immediate attention    ││
│  │                 [OFF]  ││
│  └────────────────────────┘│
│  Sends push notification   │
│  to Field Director         │
│                            │
│  ┌────────────────────────┐│
│  │                        ││
│  │    Submit Report       ││
│  │                        ││
│  └────────────────────────┘│
│                            │
└────────────────────────────┘
```

### Confirmation

```
┌────────────────────────────┐
│                            │
│           ✓                │
│                            │
│  Issue reported.           │
│                            │
│  Reference #ISS-2026-0047  │
│                            │
│  Category: Voter Access    │
│  Severity: High            │
│  Location: Esc. Lincoln    │
│                            │
│  The field team has been   │
│  notified.                 │
│                            │
│  [Report Another Issue]    │
│  [Back to Check-in]        │
│                            │
└────────────────────────────┘
```

### Interaction

- **Pre-filled location**: the polling location is pre-filled from the watcher's assignment (GOTV-014). Not editable — reports are tied to the assigned location
- **Issue categories**: seven options covering the most common polling location issues. "Other" includes a required text field for the category description
- **Severity levels**: Critical (voter being denied right to vote, intimidation, systemic failure), High (significant problems affecting multiple voters), Medium (minor issues or potential problems). No "Low" option — if it's not worth a Medium, it's not worth a report
- **Description**: required free-text field. Minimum 20 characters to encourage meaningful detail. Placeholder text: "Describe what you observed. Be specific about what happened, who was involved, and how it affects voters."
- **Photo/video evidence**: camera button opens the device camera directly. Gallery button allows selecting existing photos. Multiple files can be attached. Files are uploaded immediately on selection (progress indicator shown). Maximum 5 attachments, 20MB each
- **Time observed**: defaults to current time. Editable via time picker for cases where the watcher is reporting an issue that happened earlier in the day
- **"Immediate attention" toggle**: when enabled, the report triggers a push notification to the Field Director and the issue appears with a 🔴 badge in the GOTV-016 queue. Used for Critical severity issues that need real-time response
- **Offline support**: the form can be filled out offline, including photos. The report is queued locally and submitted when connectivity is restored. A banner shows: "You're offline — this report will be submitted when you reconnect." Photos are stored locally until upload completes
- **Submission**: creates an entry in the GOTV-016 issue queue. Reference number is generated server-side (or "Queued" if offline). The watcher can reference this number in follow-up communications

### Design Notes

- The form is ordered by importance: category and severity first (for triage), then description (for understanding), then evidence (for documentation), then metadata (time, people). This matches how a dispatcher would read the report
- The "immediate attention" toggle is deliberately not a checkbox — it's a prominent, labeled toggle that makes the watcher consciously choose to escalate. This prevents accidental escalations while making real ones easy
- Photo evidence is optional because requiring it would slow down reporting. Some issues (long wait times, verbal incidents) may not have visual evidence. But the camera button is prominent because photo evidence is extremely valuable when available
- The severity picker has only three levels (no "Low") to prevent poll watchers from under-classifying issues. If someone takes the time to fill out a report, it's at least Medium
- The confirmation screen includes the reference number prominently — the watcher may need to reference it when speaking with election officials or the legal team later in the day
- The "People Involved" field is intentionally vague ("optional text field") rather than structured (name, role, ID) because poll watchers may not know who the person is. Descriptive identification ("male poll worker at check-in table 2") is more practical than trying to get a name

---

## GOTV-016: Poll Watcher Issue Queue

Staff view for incoming issue reports from poll watchers at polling locations. Issues range from procedural irregularities to voter intimidation to equipment problems.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  GOTV Issue Queue                           [Filter ▾]   Auto-refresh: [ON] │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ 🔴 Critical  │  │ 🟠 High      │  │ 🟡 Medium    │  │ ✓ Resolved   │    │
│  │ 2            │  │ 3            │  │ 5            │  │ 12           │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                                              │
│  ┌─ Open Issues ───────────────────────────────────────────────────────────┐ │
│  │                                                                        │ │
│  │  🔴 Voter turned away — no ID required for this jurisdiction           │ │
│  │     Esc. Lincoln, San Juan · Jorge Rivera · 2:34 PM (12 min ago)       │ │
│  │     Category: Voter Access · Severity: Critical                        │ │
│  │     📷 1 photo attached                                                │ │
│  │     [View Details]  [Escalate]  [Resolve]                              │ │
│  │                                                                        │ │
│  │  🔴 Machine malfunction — voters waiting 45+ min                       │ │
│  │     Centro Comunal, Bayamón · Ana López · 2:20 PM (26 min ago)         │ │
│  │     Category: Equipment · Severity: Critical                           │ │
│  │     [View Details]  [Escalate]  [Resolve]                              │ │
│  │                                                                        │ │
│  │  🟠 Campaigning inside 100m zone                                       │ │
│  │     Esc. Barbosa, Caguas · Carlos Méndez · 1:45 PM (1h 1m ago)        │ │
│  │     Category: Campaign Violation · Severity: High                      │ │
│  │     📷 2 photos attached                                               │ │
│  │     [View Details]  [Escalate]  [Resolve]                              │ │
│  │                                                                        │ │
│  │  🟠 Long lines — estimated 2 hour wait                                 │ │
│  │     Iglesia San José, SJ · Luis Ortiz · 1:30 PM (1h 16m ago)          │ │
│  │     Category: Wait Times · Severity: High                              │ │
│  │     [View Details]  [Escalate]  [Resolve]                              │ │
│  │                                                                        │ │
│  │  🟡 Accessibility ramp blocked by delivery truck                       │ │
│  │     Esc. Muñoz, SJ · Carmen Vega · 12:45 PM (2h 1m ago)               │ │
│  │     Category: Accessibility · Severity: Medium                         │ │
│  │     Internal note: Called building manager, ETA 30 min                 │ │
│  │     [View Details]  [Escalate]  [Resolve]                              │ │
│  │                                                                        │ │
│  │  [Show 5 more medium issues...]                                        │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Issue Detail (modal or side panel)

```
┌─ Issue Detail ──────────────────────────────────────────┐
│                                                         │
│  🔴 Voter turned away — no ID required                  │
│                                                         │
│  Location: Esc. Lincoln, San Juan                       │
│  Reported by: Jorge Rivera (Poll Watcher)               │
│  Time: 2:34 PM, March 15, 2026                          │
│  Category: Voter Access                                 │
│  Severity: Critical                                     │
│                                                         │
│  Description                                            │
│  Poll worker asked voter for government-issued photo    │
│  ID. This jurisdiction does not require photo ID. Voter │
│  left without voting. I informed the poll worker of     │
│  the correct rule but they said "it's our policy."      │
│                                                         │
│  📷 Photo: [poll worker sign reading "ID Required"]     │
│                                                         │
│  ─ Actions ──────────────────────────────               │
│                                                         │
│  Escalate to:                                           │
│  [Election Protection Hotline]                          │
│  [Legal Team]                                           │
│  [Electoral Commission]                                 │
│                                                         │
│  Internal Notes                                         │
│  ┌──────────────────────────────────────────────┐      │
│  │ Called election protection hotline at 2:40 PM.│      │
│  │ Case #EP-2026-4521. They are sending a...    │      │
│  └──────────────────────────────────────────────┘      │
│  [Add Note]                                             │
│                                                         │
│  [Mark Resolved]                                        │
│                                                         │
│  Resolution                                             │
│  ┌──────────────────────────────────────────────┐      │
│  │ (Fill in when resolving)                     │      │
│  └──────────────────────────────────────────────┘      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Interaction

- **Severity ordering**: Critical issues always at top, then High, then Medium. Within severity, sorted by age (oldest first — longest unresolved)
- **Category filter**: Voter Access, Equipment, Campaign Violation, Wait Times, Accessibility, Intimidation, Other
- **Auto-refresh**: new issues appear automatically (30-second poll). Sound notification for Critical issues
- **Escalation routing**: configurable per severity. Critical can auto-notify legal team. Escalation buttons send to external election protection organizations with pre-formatted report
- **Photo/video**: attached evidence from poll watcher's phone (uploaded via their field mode interface)
- **Internal notes**: timestamped log of actions taken, visible only to staff
- **Resolution**: required description when marking as resolved — creates audit trail
- **Mobile**: full queue with swipe-to-act (swipe right to escalate, swipe left to resolve)

---

## GOTV-017: Turnout Dashboard — Map View

The war room's primary spatial view of election day turnout. Real-time heatmap showing which areas are hitting targets and which need attention.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  GOTV Turnout — Map View                      [Segment View]  [War Room →]   │
│                                                 Last updated: 2:46 PM        │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ Universe     │  │ Voted        │  │ Turnout      │  │ Target       │    │
│  │ 14,832       │  │ 5,891        │  │ 39.7%        │  │ 65%          │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │                                                                          ││
│  │                    [Full-width map]                                       ││
│  │                                                                          ││
│  │   Color by turnout %:                                                    ││
│  │   🟥 < 25%   🟧 25-40%   🟨 40-55%   🟩 55-65%   🟦 > 65%              ││
│  │                                                                          ││
│  │   Each turf/precinct is a colored polygon.                               ││
│  │   Click to see detail.                                                   ││
│  │                                                                          ││
│  │   Overlay toggles:                                                       ││
│  │   ☑ Turf boundaries                                                     ││
│  │   □ Active canvassers (pins)                                             ││
│  │   □ Staging locations                                                    ││
│  │   □ Polling locations                                                    ││
│  │                                                                          ││
│  └──────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  ┌─ Selected: Turf SJ-N-03 ───────────────────────────────────────────────┐ │
│  │                                                                        │ │
│  │  Universe: 42 · Voted: 14 (33%) · Target: 65%                         │ │
│  │  Tier 1: 8/18 voted · Tier 2: 4/16 voted · Tier 3: 2/8 voted         │ │
│  │                                                                        │ │
│  │  Canvasser: Ana López · Pass 2 in progress                             │ │
│  │  Contacts remaining: 28                                                │ │
│  │                                                                        │ │
│  │  Data source: ● Official (12) · ◐ Volunteer report (2)                │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Mobile

```
┌────────────────────────────┐
│  Turnout Map      [Segs ▾] │
├────────────────────────────┤
│                            │
│  39.7% of 14,832 voted     │
│  Target: 65%               │
│                            │
│  ┌────────────────────────┐│
│  │                        ││
│  │    [Map — full width]  ││
│  │                        ││
│  │    Color-coded turfs   ││
│  │                        ││
│  │                        ││
│  │                        ││
│  └────────────────────────┘│
│                            │
│  Tap turf for details      │
│                            │
│  ── Lowest Turnout ──      │
│  SJ-N-03  33%  42 voters   │
│  BAY-02   35%  38 voters   │
│  CAG-05   36%  45 voters   │
│                            │
└────────────────────────────┘
```

### Interaction

- **Auto-refresh**: map updates every 60 seconds. Turnout numbers update on each refresh
- **Color coding**: red (behind target) → green (at/above target). Color scale relative to the 65% target, not absolute
- **Data confidence**: each turnout data point has a source — official electoral authority data is highest confidence, volunteer reports are medium, voter self-reports are lowest. The detail panel shows the breakdown
- **Overlay toggles**: layer active canvassers, staging locations, and polling locations onto the turnout map for spatial awareness
- **Click turf for detail**: shows universe/voted/target for that turf, current canvasser, remaining contacts, and data source breakdown
- **"Lowest Turnout" list**: mobile shows the turfs most needing attention — feeds into reallocation decisions (GOTV-019)

---

## GOTV-018: Turnout Dashboard — Segment View

Tabular breakdown of turnout by voter segment. Complements the map view with analytical depth.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  GOTV Turnout — Segment View                  [Map View]    [War Room →]     │
│                                                 Last updated: 2:46 PM        │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  View by: [Support Tier ▾]    Compare: [Target vs Actual ▾]                 │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │ Segment          Universe   Voted    Turnout   Target   Gap           │  │
│  │ ───────────────  ────────   ─────    ───────   ──────   ───           │  │
│  │ Tier 1 (Strong)  4,210      2,104    50.0%     75%      -25% ⚠       │  │
│  │                  ████████████████████░░░░░░░░░░                       │  │
│  │                                                                       │  │
│  │ Tier 2 (Lean)    6,118      2,387    39.0%     60%      -21% ⚠       │  │
│  │                  ██████████████░░░░░░░░░░░░░░░░                       │  │
│  │                                                                       │  │
│  │ Tier 3 (Soft)    4,504      1,400    31.1%     50%      -19%          │  │
│  │                  ████████████░░░░░░░░░░░░░░░░░░                       │  │
│  │                                                                       │  │
│  │ Total            14,832     5,891    39.7%     65%      -25%          │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Turnout Over Time                                                           │
│  ─────────────────                                                           │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                                                                      │   │
│  │  70% ┤                                              ·····Target      │   │
│  │  60% ┤                                         ·····                 │   │
│  │  50% ┤                                    ·····        ___Tier 1     │   │
│  │  40% ┤                     ___─────────── ─────       ___Tier 2      │   │
│  │  30% ┤          __────────                            ___Tier 3      │   │
│  │  20% ┤    __────                                                     │   │
│  │  10% ┤ ──                                                            │   │
│  │   0% ┼──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──                           │   │
│  │       8AM 9  10  11  12  1PM 2  3  4  5PM                            │   │
│  │                                                                      │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  By Geography                                                                │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │ Region           Universe   Voted    Turnout   Target   Gap           │  │
│  │ ──────────────   ────────   ─────    ───────   ──────   ───           │  │
│  │ San Juan North   4,450      1,868    42.0%     65%      -23%          │  │
│  │ Bayamón          3,440      1,204    35.0%     65%      -30% ⚠       │  │
│  │ Caguas           2,710      1,138    42.0%     65%      -23%          │  │
│  │ Carolina         2,170      911      42.0%     65%      -23%          │  │
│  │ Ponce            2,062      770      37.3%     65%      -28% ⚠       │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- **View by**: toggle between Support Tier, Geography, Demographics, Custom segment — different table groupings
- **Target vs Actual**: visual comparison with gap column. ⚠ flags segments >20% below target
- **Turnout over time chart**: shows the hourly trajectory. Dotted line is the target pace. If the actual line is below the target pace at any point, the gap is widening and action is needed
- **Drill-down**: click a segment row to see individual contacts in that segment and their vote status
- **Export**: CSV export for post-election analysis

---

## GOTV-019: Reallocation Suggestions

Platform analyzes live turnout data and suggests resource reallocation. War room staff review and approve suggestions — the platform recommends, humans decide.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  GOTV Reallocation Suggestions                              [War Room →]     │
│                                          Generated: 2:50 PM  [↻ Regenerate] │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─ Suggestion 1 ── Priority: High ───────────────────────────────────────┐ │
│  │                                                                        │ │
│  │  Shift 2 canvassers from San Juan North → Bayamón                      │ │
│  │                                                                        │ │
│  │  Rationale:                                                            │ │
│  │  · SJ North is at 42% turnout with strong Tier 1 performance (58%)    │ │
│  │  · Bayamón is at 35% — lowest performing region, 30% gap to target    │ │
│  │  · 3 canvassers in SJ North have completed their turfs                │ │
│  │  · 4 Bayamón turfs are unworked in Pass 2                             │ │
│  │                                                                        │ │
│  │  Available canvassers:                                                 │ │
│  │  · Ana López (completed SJ-N-03, SJ-N-04)                             │ │
│  │  · Miguel Torres (completed SJ-N-07)                                   │ │
│  │                                                                        │ │
│  │  [✓ Approve]  [✎ Modify]  [✕ Reject]                                 │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌─ Suggestion 2 ── Priority: High ───────────────────────────────────────┐ │
│  │                                                                        │ │
│  │  Add phone banking surge for Ponce Tier 1 non-voters                   │ │
│  │                                                                        │ │
│  │  Rationale:                                                            │ │
│  │  · 620 Tier 1 contacts in Ponce, only 37% have voted                  │ │
│  │  · 390 remaining — too many for door-to-door in remaining time        │ │
│  │  · 4 phone bank volunteers available                                   │ │
│  │                                                                        │ │
│  │  [✓ Approve]  [✎ Modify]  [✕ Reject]                                 │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌─ Suggestion 3 ── Priority: Medium ─────────────────────────────────────┐ │
│  │                                                                        │ │
│  │  Send SMS reminder to 1,240 Tier 1 non-voters in Bayamón + Ponce      │ │
│  │                                                                        │ │
│  │  Rationale:                                                            │ │
│  │  · These regions have the widest gap to target                        │ │
│  │  · Tier 1 contacts are highest-value — each additional vote matters   │ │
│  │  · Sending now (3 PM) gives 2 hours before polls close                │ │
│  │                                                                        │ │
│  │  [✓ Approve]  [✎ Modify]  [✕ Reject]                                 │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Previously Actioned                                                         │
│  ──────────────────                                                          │
│  ✓ 1:30 PM — Shifted 1 canvasser from Carolina to Caguas (approved)         │
│  ✕ 12:45 PM — Suggested Wave 3 comms early (rejected — too soon)            │
│  ✓ 11:00 AM — Redirected 2 phone bankers to Tier 1 focus (approved)         │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- **Human-in-the-loop**: platform suggests, staff decides. No auto-execution of resource changes
- **[✓ Approve]**: executes the suggestion — reassigns canvassers, triggers phone bank, sends comms. Shows confirmation with details
- **[✎ Modify]**: opens the suggestion for adjustment — change which canvassers, modify the target area, edit the message. Then approve the modified version
- **[✕ Reject]**: dismisses with optional reason. Platform learns (or rather, the team learns what works)
- **[↻ Regenerate]**: re-analyzes current data and generates fresh suggestions based on latest turnout numbers
- **Priority**: High (significant impact, time-sensitive), Medium (helpful but not urgent), Low (optimization)
- **Previously Actioned**: audit trail of all approved and rejected suggestions

---

## GOTV-020: Election Night Results Entry

Fast, mobile-first data entry for poll watchers and staff to enter results as they're posted at polling locations.

### Mobile (Primary)

```
┌────────────────────────────┐
│  Results Entry              │
├────────────────────────────┤
│                            │
│  Polling Location          │
│  [Esc. Lincoln, SJ ▾]     │
│  (your assigned location)  │
│                            │
│  ─────────────────────     │
│                            │
│  Race: Governor             │
│  ──────────────            │
│                            │
│  María Torres (PV)         │
│  ┌────────────────────────┐│
│  │ 1,247                  ││
│  └────────────────────────┘│
│                            │
│  Rafael Ortiz (PNP)        │
│  ┌────────────────────────┐│
│  │ 1,102                  ││
│  └────────────────────────┘│
│                            │
│  Carmen Soto (PPD)         │
│  ┌────────────────────────┐│
│  │ 438                    ││
│  └────────────────────────┘│
│                            │
│  Write-in / Other          │
│  ┌────────────────────────┐│
│  │ 23                     ││
│  └────────────────────────┘│
│                            │
│  Total: 2,810              │
│                            │
│  ─────────────────────     │
│                            │
│  Results Status            │
│  ○ Partial (still counting)│
│  ● Final (all counted)     │
│                            │
│  ┌────────────────────────┐│
│  │                        ││
│  │    Submit Results      ││
│  │                        ││
│  └────────────────────────┘│
│    48px tall, full-width   │
│                            │
│  [+ Add Another Race]     │
│                            │
└────────────────────────────┘
```

### Confirmation

```
┌────────────────────────────┐
│                            │
│         ✓                  │
│                            │
│  Results submitted for     │
│  Esc. Lincoln, San Juan    │
│                            │
│  Governor                  │
│  Torres (PV): 1,247       │
│  Ortiz (PNP): 1,102       │
│  Soto (PPD): 438          │
│  Other: 23                 │
│  Status: Final             │
│                            │
│  Submitted at 8:42 PM      │
│                            │
│  [Edit Submission]         │
│  [Enter Next Location]     │
│                            │
└────────────────────────────┘
```

### Interaction

- **Pre-filled location**: defaults to the watcher's assigned location. Can switch if covering multiple
- **Pre-filled candidates**: race and candidate names pre-configured by staff. Watcher just enters numbers
- **Number input**: large numeric keyboard, numeric input type. Fast data entry
- **Partial vs Final**: partial results submitted as counting progresses, final when complete. Partial updates are additive — previous entries for the same location are replaced
- **Validation**: total vote count checked against registered voters for reasonableness. Warning (not block) if total seems unusually high or low
- **Timestamp**: auto-recorded on submission. Used for results timeline in GOTV-021

---

## GOTV-021: Election Night Results Dashboard

Real-time aggregation of entered results. The war room's view of how the election is going.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Election Night Results                                 Last update: 8:45 PM │
│                                                [Map] [Table]  [War Room →]   │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Governor                                            42 / 68 locations (62%)│
│  ────────                                            reporting              │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │                                                                          ││
│  │  María Torres (PV)      ████████████████████████████████  52.1%          ││
│  │                          38,420 votes                                    ││
│  │                                                                          ││
│  │  Rafael Ortiz (PNP)     ██████████████████████████        41.3%          ││
│  │                          30,480 votes                                    ││
│  │                                                                          ││
│  │  Carmen Soto (PPD)      ███                                5.8%          ││
│  │                          4,270 votes                                     ││
│  │                                                                          ││
│  │  Other                  ▏                                  0.8%          ││
│  │                          610 votes                                       ││
│  │                                                                          ││
│  └──────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Results Timeline                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                                                                      │   │
│  │  55% ┤                                           ___Torres           │   │
│  │  50% ┤                              ____─────────                    │   │
│  │  45% ┤              ─────────────── ─────────────Ortiz               │   │
│  │  40% ┤   ─────────── ──────────────                                  │   │
│  │  35% ┤ ──                                                            │   │
│  │      ┼───┬───┬───┬───┬───┬───┬───┬───                               │   │
│  │       7PM  7:15  7:30  7:45  8:00  8:15  8:30  8:45                  │   │
│  │                                                                      │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  By Location                                                                 │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │ Location              Status    Torres    Ortiz     Soto     Total    │  │
│  │ ────────────────────  ────────  ────────  ────────  ──────   ─────    │  │
│  │ Esc. Lincoln, SJ      Final    1,247     1,102     438      2,810    │  │
│  │ Centro Com. Bayamón    Final    987       1,234     312      2,556    │  │
│  │ Esc. Barbosa, Caguas   Partial  845       790       198      1,833    │  │
│  │ Iglesia San José       Final    1,102     856       267      2,240    │  │
│  │ [Show all 42 locations...]                                            │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Internal Comparison                                                         │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │ Region         Our Turnout    Torres Vote %    Expected (from data)   │  │
│  │ ──────────     ───────────    ──────────────   ────────────────────    │  │
│  │ SJ North       47%           54%               52% (support score)    │  │
│  │ Bayamón        38%           43%               49%   ⚠ below exp.    │  │
│  │ Caguas         44%           55%               51%                    │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- **Auto-refresh**: 30-second refresh. New results highlight briefly when they come in
- **Reporting progress**: "42 / 68 locations reporting" — shows completeness of the picture
- **Results timeline**: how the race has moved as more results come in. Useful for understanding whether the trend is favorable
- **Internal comparison**: compares actual vote percentage against the campaign's internal support score data. Validates the accuracy of the campaign's voter data
- **Map view**: toggle to see results geographically — each location colored by leading candidate
- **Multiple races**: tab selector at top if multiple races are being tracked (Governor, Senate, etc.)

---

## GOTV-022: Post-Election Analysis

Retrospective on how the GOTV operation actually went. Used days/weeks after election day, so the team knows what to change next time.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ← GOTV                    Post-Election Analysis              [Export PDF]   │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  [Turnout] [Operations] [Volunteers] [Model Validation] [Resources]          │
│                                                                              │
│  ── Turnout Analysis ──────────────────────────────────────────────────────  │
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ Universe     │  │ Final Turnout│  │ Target       │  │ Gap          │    │
│  │ 14,832       │  │ 9,641 (65.0%)│  │ 65%          │  │ 0% ✓        │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                                              │
│  Turnout by Segment                                                          │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │ Segment          Universe   Voted    Turnout   Target   Result        │  │
│  │ ───────────────  ────────   ─────    ───────   ──────   ──────        │  │
│  │ Tier 1 (Strong)  4,210      3,368    80.0%     75%      +5% ✓        │  │
│  │ Tier 2 (Lean)    6,118      3,916    64.0%     60%      +4% ✓        │  │
│  │ Tier 3 (Soft)    4,504      2,357    52.3%     50%      +2% ✓        │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  Turnout by Region                                                           │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │ Region           Universe   Voted    Turnout   Target   Result        │  │
│  │ ──────────────   ────────   ─────    ───────   ──────   ──────        │  │
│  │ San Juan North   4,450      3,115    70.0%     65%      +5% ✓        │  │
│  │ Bayamón          3,440      2,097    61.0%     65%      -4% ⚠        │  │
│  │ Caguas           2,710      1,843    68.0%     65%      +3% ✓        │  │
│  │ Carolina         2,170      1,432    66.0%     65%      +1% ✓        │  │
│  │ Ponce            2,062      1,154    56.0%     65%      -9% ⚠        │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ── Operations ────────────────────────────────────────── [Operations tab]   │
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ Door Knocks  │  │ Contact Rate │  │ Phone Calls  │  │ Rides Given  │    │
│  │ 8,234        │  │ 62%          │  │ 3,890        │  │ 87           │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                                              │
│  Contact Rate by Region                                                      │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │ Region           Doors    Contacts  Rate     Avg. per Vol   Passes    │  │
│  │ ──────────────   ──────   ────────  ──────   ────────────   ──────    │  │
│  │ San Juan North   2,890    1,835     63%      28.4           2.1       │  │
│  │ Bayamón          2,120    1,230     58%      22.1           1.8       │  │
│  │ Caguas           1,540    1,012     66%      31.0           2.3       │  │
│  │ Carolina         980      612       62%      25.5           2.0       │  │
│  │ Ponce            704      398       57%      19.9           1.5       │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ── Model Validation ───────────────────── [Model Validation tab]           │
│                                                                              │
│  How well did our support scores predict actual voting behavior?              │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │ Score    Universe   Voted    Turnout   Expected    Accuracy           │  │
│  │ ──────   ────────   ─────    ───────   ────────    ────────           │  │
│  │ 5        4,210      3,368    80.0%     80%         High ✓            │  │
│  │ 4        6,118      3,916    64.0%     65%         High ✓            │  │
│  │ 3        4,504      2,357    52.3%     45%         Moderate ◐        │  │
│  │ 2        —          —        —         —           (excluded)        │  │
│  │ 1        —          —        —         —           (excluded)        │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  Key Insight: Score 3 voters turned out at higher rates than predicted.       │
│  Consider expanding the GOTV universe to include more Score 3 contacts       │
│  in future elections.                                                        │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- **Tab navigation**: Turnout, Operations, Volunteers, Model Validation, Resources — each tab is a section of the analysis
- **[Export PDF]**: generates a formatted report with all tabs, suitable for organizational review, board reports, or funder updates
- **Model Validation tab**: the most strategically valuable section — compares support score predictions against actual turnout to improve future targeting
- **Volunteers tab** (not shown): per-volunteer metrics — shifts completed, contacts made, contact rate, issues reported. Helps identify top performers and training needs
- **Resources tab** (not shown): staging location utilization, ride completion rate, supply consumption — operational efficiency metrics

---

## GOTV-023: Staging Location Check-in

Team Lead checks in volunteers at their staging location on election day morning. Fast, mobile-first interface similar to Event Check-in (EVT-005).

### Mobile (Primary)

```
┌────────────────────────────┐
│  Staging Check-in          │
│  Community Ctr — SJ North  │
├────────────────────────────┤
│                            │
│  Checked in: 28 / 34       │
│  ████████████████████░░░░  │
│  82%                       │
│                            │
│  [Search volunteers...]    │
│  [📷 Scan QR]              │
│                            │
│  ─────────────────────     │
│                            │
│  Not Yet Checked In (6)    │
│  ──────────────────────    │
│                            │
│  ┌────────────────────────┐│
│  │ Carlos Méndez          ││
│  │ Turf: BAY-02           ││
│  │ 📱 787-555-0134        ││
│  │            [Check In ✓]││
│  └────────────────────────┘│
│                            │
│  ┌────────────────────────┐│
│  │ María Santos           ││
│  │ Turf: SJ-N-05          ││
│  │ 📱 787-555-0167        ││
│  │            [Check In ✓]││
│  └────────────────────────┘│
│                            │
│  [Show 4 more...]          │
│                            │
│  ─────────────────────     │
│                            │
│  Checked In (28)           │
│  ────────────────          │
│                            │
│  Ana López · 5:45 AM       │
│  Jorge Rivera · 5:42 AM    │
│  Luisa Fernández · 5:40 AM │
│  [Show all 28...]          │
│                            │
│  ─────────────────────     │
│                            │
│  [Report Issue]            │
│  [Contact Field Director]  │
│                            │
└────────────────────────────┘
```

### Interaction

- **Tap to check in**: [Check In ✓] — single tap with confirmation vibration (haptic). 10-second undo
- **QR scan**: volunteer shows their app's QR code. Faster than searching
- **Not-checked-in priority**: volunteers who haven't arrived are shown first. Team Lead can call them directly via phone number
- **Turf assignment visible**: confirms each volunteer knows their assignment
- **Progress counter**: always visible at top. Helps Team Lead know how many are still missing
- **[Report Issue]**: if a volunteer doesn't show, or supplies are missing — sends an issue to the Field Director
- **56px row height**: large touch targets for election morning (cold hands, stress, speed)

---

## Empty States Summary

| Screen | Empty Message | Action |
|--------|--------------|--------|
| GOTV-001 (no criteria) | Define your GOTV universe to identify which voters to contact on election day. Start by setting support score and voting history criteria. | (form is ready to fill) |
| GOTV-002 (no uploads) | Upload early voting data to remove voters who've already cast ballots from your GOTV contact lists. | Upload File |
| GOTV-003 (no locations) | Set up staging locations where volunteers will gather on election day before deploying to their turfs. | + Add Location |
| GOTV-004 (no turfs) | Cut GOTV turfs to divide your universe into manageable assignments. Finalize the universe first. | (Finalize Universe link if not done) |
| GOTV-005 (no waves) | Plan your election day communication waves. Schedule reminders for voters who haven't yet voted. | + Add Wave |
| GOTV-006 (no watchers) | Register poll watchers to monitor polling locations on election day. | + Add Watcher |
| GOTV-010 (no contacts) | No chase call contacts available. Finalize the GOTV universe and ensure voters are loaded into the call list. | (waiting state — depends on GOTV-001) |
| GOTV-011 (standalone) | Request a ride to the polls for a voter. Fill in the voter's details and a volunteer driver will be dispatched. | (form is ready to fill) |
| GOTV-012 (no requests) | No ride requests yet. Requests come from voter replies, volunteer reports, and phone bank referrals. | (waiting state) |
| GOTV-013 (no assignment) | No ride assignments yet. The dispatcher will assign rides to you as requests come in. | (waiting state) |
| GOTV-014 (not checked in) | You're assigned to [location name]. Check in when you arrive to confirm coverage for the field team. | Check In Now |
| GOTV-015 (standalone) | Report an issue observed at your polling location. Select a category and describe what you saw. | (form is ready to fill) |
| GOTV-016 (no issues) | No issues reported. Poll watchers report issues through their field interface. | (waiting state) |
| GOTV-020 (no results) | Results entry opens when polls close. Select your assigned location and enter results as they're posted. | (waiting state) |

---

## Accessibility Notes

- All status indicators use both color and text/shape (●/◐/○ + "Registered"/"Pending"/"Not filed")
- Map views always have a companion table view for screen reader users
- Turnout percentages announced via aria-live on refresh
- Issue queue severity uses icons + text labels, never color alone
- Results entry uses large numeric inputs with clear labels
- Check-in uses 56px touch targets with haptic confirmation
- Auto-refresh can be paused for users who find it disorienting
- Chase call result buttons (GOTV-010) use color + text labels and are minimum 48px tall for reliable touch targets
- Election day countdown clock (GOTV-010) uses color shift + text for urgency — not color alone
- Ride request form (GOTV-011) uses standard form controls with visible labels; offline status announced via aria-live banner
- Ride driver view (GOTV-013) uses large text and buttons designed for glanceable use; status buttons include text labels
- Poll watcher check-in (GOTV-014) uses 56px CTA button with haptic confirmation; status uses symbol + text (○/●)
- Issue report form (GOTV-015) severity levels use text labels, not color alone; immediate attention toggle includes descriptive text

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Human-in-the-loop reallocation | Platform suggests, staff approves | Election day decisions are too high-stakes for full automation. Staff have context the platform doesn't (volunteer morale, weather, local knowledge) |
| Multi-pass turf design | Same turf gets morning/afternoon/evening passes | Voters who aren't home in the morning may be reachable later. Multiple passes maximize contact rate |
| Confidence-weighted turnout data | Different icons for official vs. volunteer-reported vs. self-reported | Prevents overconfidence in turnout numbers. Staff can see how much of the data is confirmed vs. estimated |
| Separate map and segment turnout views | Two dedicated screens (GOTV-017, GOTV-018) rather than one combined | Map answers "where" — spatial awareness for resource deployment. Segment view answers "who" — analytical depth for targeting. Different mental models, different screens |
| Poll watcher separation (registry + credentials) | GOTV-006 for people, GOTV-007 for documents | Registration workflow is people-focused (assign, track status). Credential tracking is document-focused (upload, verify, print). Combining them makes both harder |
| Results entry as mobile-first | Dedicated simple form, not a spreadsheet | Poll watchers are standing in a room watching results post. They need a fast, one-handed interface — not a data entry tool |

## Open Questions

1. **Official election data feeds** — can the platform integrate with official electoral authority APIs for real-time turnout data, or is manual upload the only option? Official feeds would dramatically improve turnout tracking accuracy
2. **Alliance ride sharing** — should ride coordination support cross-org driver pools? A multi-org ride dispatch is operationally complex but could serve voters in areas where one org has drivers and another has requests
3. **Reallocation suggestion algorithm** — what model generates reallocation suggestions? Simple rule-based (gap-to-target) vs. predictive (based on historical turnout patterns by time of day)? Rule-based is more transparent and trustworthy
4. **Results entry security** — how do we prevent fraudulent results entries? Options: restrict to registered poll watchers, require photo of posted results, dual-entry verification. Balance speed vs. integrity
5. **Post-election data retention** — how long is GOTV operational data retained? Valuable for future elections but contains sensitive voter contact information. Retention policy should balance utility against data minimization
