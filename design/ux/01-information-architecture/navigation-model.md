# Navigation Model

## Purpose

This document defines how GreenGrass organizes its feature surface into a navigable structure. It is the single most important information architecture document — every screen, wireframe, and component design depends on the navigation model.

The core challenge: 9 distinct personas across radically different contexts share one application. A volunteer knocking doors on a low-end Android phone in rural India needs a completely different interface than an Org Admin configuring compliance settings on a desktop in Puerto Rico. The navigation model must serve both without compromise.

## Navigation Paradigm

### Desktop Layout

**DECIDED: Hybrid — top bar + sidebar.** Top bar handles context ("where am I"): tenant identity, global search, sync status, notifications, user profile. Sidebar handles feature navigation ("what can I do"): role-adaptive items organized in collapsible sections. Clean separation of concerns.

#### Desktop Shell Anatomy

```
┌──────────────────────────────────────────────────────────────┐
│  [Logo/Tenant]    [Search]          [Sync] [Notif] [Avatar] │  ← Header bar
├────────────┬─────────────────────────────────────────────────┤
│            │                                                 │
│  Sidebar   │              Main Content Area                  │
│            │                                                 │
│  [nav      │                                                 │
│   items    │                                                 │
│   adapt    │                                                 │
│   per      │                                                 │
│   role]    │                                                 │
│            │                                                 │
│            │                                                 │
│            │                                                 │
│            ├────────────────────────────────┬────────────────┤
│            │                                │ Detail Panel   │
│            │                                │ (contextual,   │
│            │                                │  optional)     │
├────────────┴────────────────────────────────┴────────────────┤
│  [Help]  [Language]  [Settings]                              │  ← Sidebar footer
└──────────────────────────────────────────────────────────────┘
```

**Header bar (always visible):**
- Tenant logo/name (links to home). In alliance context, shows alliance name with a tenant switcher dropdown.
- Global search bar
- Sync status indicator (see offline-sync-patterns.md)
- Notification bell with unread badge count
- User avatar → dropdown menu (profile, preferences, switch tenant, log out)

**Sidebar (role-adaptive):**
- Navigation items change based on the user's active role template(s)
- Collapsible to icon-only mode (persists user preference)
- Footer area: Help/Support access, Language switcher, Settings link
- Sidebar width: ~240px expanded, ~64px collapsed

**Main content area:**
- Full-width when no detail panel is active
- Splits when a detail panel is needed (contact detail, message thread, etc.)
- Breadcrumb trail at the top of the content area for deep navigation

**Detail panel (contextual):**
- Appears on the right for contextual information (viewing a contact while browsing a list, reading a message thread while in the inbox)
- Can be dismissed. On smaller desktop viewports, opens as a full-screen overlay instead of a panel.

#### RTL Considerations

In RTL mode (Arabic):
- Sidebar moves to the right side
- Detail panel moves to the left
- All directional icons (arrows, chevrons) mirror
- Text alignment flips
- Breadcrumb direction reverses
- CSS logical properties (`inline-start`/`inline-end`) handle this without separate layouts

### Mobile Layout

```
┌──────────────────────────────┐
│  [≡/Back]  [Title]  [Actions]│  ← Top bar (contextual)
├──────────────────────────────┤
│                              │
│                              │
│       Full-screen            │
│       Content Area           │
│                              │
│                              │
│                              │
│                              │
├──────────────────────────────┤
│  [Tab1] [Tab2] [Tab3] [More]│  ← Bottom tab bar
└──────────────────────────────┘
```

**Top bar:**
- Left: hamburger menu (when at top level) or back arrow (when navigated deep)
- Center: current screen title
- Right: contextual actions (search, filter, compose — varies per screen)

**Content area:**
- Full-screen. No sidebar, no split views.
- Lists and details are separate screens (tap to navigate into detail, back to return)

**Bottom tab bar:**
- 4-5 items maximum per role (more opens a "More" sheet)
- Items change based on user's role template
- Active tab indicated with fill/highlight
- Badge counts on relevant tabs (unread messages, pending approvals)

**RTL:** Tab bar item order reverses. Back arrow points right.

### Field Mode (Mobile Only)

Field mode is a **full-screen takeover** that replaces the normal navigation shell entirely. It activates when a volunteer starts a canvassing shift, voter registration session, or GOTV operation.

```
┌──────────────────────────────┐
│  [Sync: 2m ago]  [●REC] 2:34│  ← Field header
├──────────────────────────────┤
│                              │
│                              │
│   Task-specific content      │
│   (walk list, door card,     │
│    registration form,        │
│    phone bank call card)     │
│                              │
│                              │
│                              │
├──────────────────────────────┤
│ [◀ Prev]  [3 of 47]  [Next ▶]│  ← Task navigation
├──────────────────────────────┤
│  [End Shift]    [🔒 Lock]    │  ← Field actions
└──────────────────────────────┘
```

**Field header:**
- Sync status with time since last sync (prominent — stale data is dangerous on election day)
- Recording indicator (shift is active)
- Shift timer (elapsed time)
- No global nav, no sidebar, no bottom tabs

**Task-specific content:**
- The entire screen is dedicated to the current task (the door being knocked, the call being made, the voter being registered)
- Content varies by workflow but always shows: the relevant person's information, the script/form, and the response capture interface

**Task navigation:**
- Linear progression through the task list (walk list, call list)
- Previous/Next with position indicator ("3 of 47")
- Can jump to a specific item via a list view

**Field actions:**
- End Shift: triggers the shift lifecycle (sync, debrief prompt, hours logging, turf release)
- Lock: panic button — immediately locks the app and requires re-authentication (security.md)
- No other navigation. The volunteer's world is the walk list until the shift ends.

**Why a full takeover, not just a different tab layout:**
Field mode has a fundamentally different mental model. The volunteer is walking, one-handed, possibly in poor lighting. They need large touch targets, minimal navigation decisions, and zero distraction. The normal shell (sidebar, tabs, notifications) would be noise. Field mode is the app stripped to its essential task.

**Entry and exit:**
- Entry: Volunteer taps "Start Shift" from their shifts screen. App downloads walk list data, confirms readiness, switches to field mode.
- Exit: Volunteer taps "End Shift." App syncs remaining data, shows debrief prompt, logs hours, and returns to the normal shell.
- Abnormal exit: If the app crashes or the device dies, the shift resumes where it left off on next launch (data is saved locally after each interaction).

## Role-Adaptive Navigation

### How Role Templates Affect Navigation

The sidebar (desktop) and bottom tab bar (mobile) show different items based on the user's active role template(s). Users see only the features they have access to — restricted features are absent, not greyed out.

**DECIDED: Grouped sections.** Sidebar groups navigation items by role with collapsible section headers (e.g., "Communications," "Finance," "Field"). Users with multiple roles see multiple sections, each collapsible independently. Provides a clear mental model — "I'm doing comms work now" — and users can collapse sections they're not actively using to reduce visual noise.

### Navigation Items Per Persona

The following tables define what each persona sees. Items marked with (M) are also available on mobile bottom tabs (limited to 4-5 per persona).

#### Org Admin

The Org Admin sees everything. Their sidebar is the union of all feature areas.

| Section | Items |
|---------|-------|
| **Overview** | Dashboard (M), Activity Feed |
| **People** | Contacts (M), Segments, Import/Export, Dedup Queue |
| **Field** | Canvassing, Phone Banking, Voter Registration, Turfs |
| **Fundraising** | Donations (M), Forms, Campaigns, Compliance, Alliance Splits |
| **Communications** | Email, SMS/WhatsApp, Social Media, Templates |
| **Events** | Events (M), Check-in |
| **Activism** | Campaigns, Petitions, Public Comments |
| **Press** | Media Contacts, Content, Releases, Coverage, Endorsements, Social |
| **GOTV** | Universe, Staging, War Room, Rides, Poll Watchers, Results |
| **Messaging** | Messages (M) |
| **Alliance** | Alliance Dashboard, Members, Shared Campaigns |
| **Settings** | Org Profile, Branding, Roles, Compliance, Integrations, Billing |

Mobile tabs: Dashboard, Contacts, Donations, Messages, More

#### Communications Director

| Section | Items |
|---------|-------|
| **Overview** | Comms Dashboard (M) |
| **Communications** | Email Campaigns (M), SMS/WhatsApp, Social Media (M), Templates |
| **Press** | Media Contacts, Content, Releases, Coverage, Endorsements, Talking Points |
| **People** | Contacts, Segments |
| **Messaging** | Messages (M) |

Mobile tabs: Dashboard, Email, Social, Messages, More

#### Finance Director

| Section | Items |
|---------|-------|
| **Overview** | Fundraising Dashboard (M) |
| **Fundraising** | Donations (M), Forms, Campaigns, Recurring, Refunds, Cash, Compliance (M) |
| **People** | Donors, Segments |
| **Messaging** | Messages (M) |

Mobile tabs: Dashboard, Donations, Compliance, Messages, More

#### Field Director

| Section | Items |
|---------|-------|
| **Overview** | Field Dashboard (M) |
| **Field** | Canvassing (M), Phone Banking, Voter Registration, Turfs (M) |
| **GOTV** | Universe, Staging, War Room, Rides, Poll Watchers |
| **People** | Contacts, Segments |
| **Messaging** | Messages (M) |

Mobile tabs: Dashboard, Canvassing, Turfs, Messages, More

#### Volunteer Coordinator

| Section | Items |
|---------|-------|
| **Overview** | Volunteer Dashboard (M) |
| **Volunteers** | Roster (M), Onboarding, Training, Shifts (M), Teams |
| **Events** | Events (M), Check-in |
| **Messaging** | Messages (M) |

Mobile tabs: Dashboard, Roster, Shifts, Messages, More

#### Data Manager

| Section | Items |
|---------|-------|
| **Overview** | Data Dashboard |
| **People** | Contacts (M), Segments, Import (M), Export, Dedup Queue (M), Data Quality |
| **Messaging** | Messages (M) |

Mobile tabs: Contacts, Import, Dedup, Messages, More

#### Volunteer

| Section | Items |
|---------|-------|
| **My Stuff** | My Shifts (M), My Tasks, My Team |
| **Events** | Events (M) |
| **Messaging** | Messages (M) |
| **Training** | Modules, Certifications |
| **Field** | Start Shift (M) → enters field mode |

Mobile tabs: Shifts, Events, Messages, Start Shift

The "Start Shift" tab is a prominent action button (visually distinct — filled/colored) that enters field mode.

#### Team Lead

Everything a Volunteer sees, plus:

| Section | Additional Items |
|---------|-----------------|
| **My Team** | Team Roster, Team Progress, Check-in |
| **Field** | Team Assignments (view only) |

Mobile tabs: Same as Volunteer, but "Shifts" tab shows team view by default

#### Candidate

| Section | Items |
|---------|-------|
| **Overview** | Campaign Dashboard (M) — curated, simplified |
| **Profile** | My Public Profile (M) |
| **Approvals** | Pending Approvals (M) — press releases, social posts |
| **Messaging** | Messages (M) — briefings prominent |

Mobile tabs: Dashboard, Profile, Approvals, Messages

The Candidate sees a deliberately limited view. No operational settings, no data management, no compliance configuration. The dashboard shows high-level metrics (fundraising totals, volunteer count, event attendance, top-line field progress) without drill-down into operational detail.

#### Supporter

Supporters primarily interact with public pages (no auth required). If logged in:

| Section | Items |
|---------|-------|
| **My Profile** | Profile (M), Preferences, Communication Settings |
| **Donations** | Donation History (M), Recurring, Receipts |
| **Events** | My Events (M) |

Mobile tabs: Profile, Donations, Events

Supporters do not see any internal platform features. Their navigation is a simple personal portal.

## Universal Chrome

Elements present in all navigation contexts (except field mode, which strips everything):

### Sync Status Indicator

Always visible in the header bar. States:
- **Connected (real-time)** — subtle green dot or checkmark. No text — the default should be unobtrusive.
- **Connected (stale)** — amber indicator with "Last sync: X min ago." Appears if sync hasn't completed in >5 minutes.
- **Syncing** — animated indicator (subtle pulse or spinner). Brief — usually seconds.
- **Offline** — prominent indicator: "Offline — changes will sync when connected." Persistent until reconnected.
- **Sync error** — red indicator with "Sync failed — tap to retry." Tapping shows error detail.

In field mode, the sync indicator is larger and shows the exact time since last sync, because stale data is operationally dangerous.

### Notification Bell

- Badge count of unread notifications
- Tapping opens a notification drawer (slides from right, or full-screen on mobile)
- Notifications grouped by source (Messaging, Assignments, GOTV, Fundraising, etc.)
- Each notification links to the relevant screen
- "Mark all read" action
- Link to notification preferences

### User Menu

- User avatar/initials → dropdown (desktop) or full-screen profile menu (mobile)
- Contains: profile settings, notification preferences, language, security settings (passkey management, trusted contacts), tenant switcher (if multi-tenant), log out
- In duress mode: shows the same menu structure but with sanitized data

### Language Switcher

- Available from the user menu and from the sidebar footer (desktop)
- Shows the tenant's configured languages
- Changing language updates the UI immediately (persists to user profile)
- Does not affect data language (a canvassing note written in Spanish stays in Spanish regardless of UI language)

### Help Access

- "?" icon or "Help" link in the sidebar footer (desktop) and accessible from the user menu (mobile)
- Opens: contextual help (if available for the current screen), knowledge base search, AI concierge chat
- Contextual help appears as a slide-out panel on desktop, full-screen on mobile

## Special Navigation Contexts

### Election Day Mode

When GOTV operations are activated (explicit action by Org Admin):

- War room staff see a prominent "Election Day Active" banner at the top of the screen
- Their navigation is augmented with the GOTV War Room as a primary item (pinned to top of sidebar, or replaces the first mobile tab)
- Notification priority shifts — GOTV notifications elevated
- The War Room screen becomes the default home for war room staff
- Deactivation: Org Admin explicitly deactivates, or automatic deactivation at a configured time (after polls close)

### Alliance Context

**DECIDED: Dedicated alliance section in sidebar.** Alliance features appear as another collapsible section in the sidebar, consistent with the role-based grouping pattern. Contains: Alliance Dashboard, Members, Shared Campaigns, Coordination. No context switching needed — the alliance is part of the user's workspace, not a separate world. Discoverable and consistent with the grouped sections pattern.

### Duress Mode (Aggressive Security Tier)

When a user logs in with their duress passkey:

**DECIDED: Sanitized real structure.** The duress view presents the real navigation structure with plausible but scrubbed data. The navigation items, sidebar sections, and shell look identical to a normal session. Content is sanitized: contact lists show a small number of innocuous contacts (no political sensitivity markers), dashboards show low plausible numbers, canvassing data and voter ID scores are absent, sensitive notes are stripped. The most convincing option — an observer sees what looks like a low-activity but real account. Detailed sanitization rules per feature area to be defined in `security-ux-patterns.md`.

### Onboarding Wizard Context

When a user is in an onboarding wizard (first-time setup, payment processor config, etc.):

- The wizard takes over the main content area but the global chrome (header, sync, notifications) remains visible
- Sidebar shows wizard progress steps instead of normal navigation
- A "Save & Exit" option lets the user leave the wizard and return to it later
- Wizard state is persisted — returning to the wizard resumes where they left off

## Navigation State Persistence

- **Sidebar collapse state** — persisted to user preference (local storage)
- **Last visited screen** — on next login, the user returns to their last visited screen (or home if the session expired)
- **Field mode state** — if the app is killed during a shift, relaunching goes directly back to field mode at the last position in the walk list
- **Wizard state** — incomplete wizard progress is saved and resumable

## Offline Navigation Behavior

**DECIDED: Grey out with offline badge.** Features requiring connectivity appear greyed out with a small offline badge icon on each unavailable item. Tapping a greyed-out item shows a "Requires connection" message. The navigation structure stays stable regardless of connectivity state — no items appearing or disappearing as the connection fluctuates. Users always know what the platform can do, even when they can't do it right now.

**Features available offline:**
- Field mode (canvassing, voter registration, GOTV door-knocking)
- Event check-in
- Reading synced messages
- Composing messages (queued for send)
- Viewing cached CRM contacts (read-only)
- Ride request creation (queued)
- Poll watcher issue reports (queued)

**Features requiring connectivity:**
- All dashboards and analytics
- Settings and configuration
- Data import/export
- Phone banking (requires call connectivity)
- Communication sends (email, SMS, WhatsApp)
- Social media posting
- Real-time GOTV war room
- Search (server-side)
- Onboarding wizards (some steps require server validation)

## Open Questions

1. **Contextual navigation vs. persistent navigation.** Should the sidebar always show the full navigation for the user's role, or should it adapt contextually (e.g., when viewing a canvassing campaign, the sidebar shows only canvassing sub-navigation)? Persistent is simpler; contextual reduces clutter but can be disorienting.

2. **Keyboard navigation.** Should the platform support keyboard shortcuts for power users (e.g., `G then D` for Go to Dashboard, `G then M` for Go to Messages)? Common in tools like GitHub and Gmail. Low priority but high value for staff who use the platform all day.

3. **Navigation breadcrumbs.** How deep does the breadcrumb trail go? For a path like Dashboard → Canvassing → Campaign X → Turf Y → Walk List, does the breadcrumb show all levels or truncate?

<!-- REVISIT: The exact mobile tab bar items per persona need validation against actual usage patterns once the first alpha users are active. The initial mapping above is based on spec analysis, but real usage may differ. -->
<!-- REVISIT: The detail panel (right panel on desktop) needs careful sizing and behavior rules. When does it appear? Can the user pin it open? Does it resize? These are interaction design details for the wireframe phase. -->
