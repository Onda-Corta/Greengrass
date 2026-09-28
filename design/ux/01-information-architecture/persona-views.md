# Persona Views

## Purpose

This document defines how the same platform renders differently for each persona. Each persona sees a role-adapted view — different home screen, different navigation items, different feature surface. Features outside their access are absent from their view entirely (not greyed out — invisible).

This is the "role-adaptive UX" specification. It builds on the navigation model (navigation-model.md) and references specific screens from the screen inventory (screen-inventory.md).

## Persona Summary

| Persona | Primary device | Session length | Offline needs | Feature surface |
|---------|---------------|---------------|--------------|----------------|
| Org Admin | Desktop | Short (hours) | None | Everything |
| Communications Director | Desktop | Workday | None | Comms, press, social, people |
| Finance Director | Desktop | Workday | None | Fundraising, compliance, people |
| Field Director | Desktop + mobile | Workday | None (staff); field mode if also canvassing | Field ops, GOTV, people |
| Volunteer Coordinator | Desktop + mobile | Workday | Event check-in | Volunteers, events, shifts |
| Data Manager | Desktop | Workday | None | CRM, import/export, data quality |
| Volunteer | Mobile | Shift-length (field) / workday (general) | Full field mode | Shifts, events, field mode, messages |
| Team Lead | Mobile | Shift-length (field) / workday (general) | Full field mode + team mgmt | Everything volunteer sees + team |
| Candidate | Mobile + desktop | Medium (workday) | Reading messages | Curated dashboard, approvals, messages |
| Supporter | Mobile | Long (weeks) | None | Donation history, preferences, events |

## Org Admin

### Home Screen
**Campaign Overview Dashboard** (DASH-001) — the hub of the operation. Shows:
- Fundraising: total raised, goal progress, donor count, average donation
- Field: doors knocked, voter contacts, contact rate, aggregate support scores
- Communications: emails sent, open rate, SMS delivered, social engagement
- Volunteers: active count, hours logged, shifts filled vs. available
- Events: upcoming events, recent attendance
- Alerts: compliance flags, sync issues, system notifications

### Sidebar Sections
All sections visible. The Org Admin's sidebar is the union of all feature areas, organized in collapsible groups:
- Overview, People, Field, Fundraising, Communications, Events, Activism, Press, GOTV, Messaging, Alliance, Settings

### Mobile Experience
The Org Admin primarily works on desktop. Mobile is for checking dashboards, reading messages, and handling urgent notifications on the go. Mobile tabs: Dashboard, Contacts, Donations, Messages, More.

### Special Behaviors
- Sees the full audit trail
- Can impersonate other roles (for testing role template configuration) — clearly indicated in the UI
- Receives all system-level notifications (billing, security, integration status)
- Can activate election day mode
- Can toggle between their org view and the alliance view (if in an alliance)

---

## Communications Director

### Home Screen
**Communications Dashboard** (DASH-004) — focused on outreach performance:
- Email campaign performance (recent sends, open rates, click rates)
- SMS/WhatsApp delivery stats
- Social media engagement summary (across platforms)
- Upcoming scheduled sends
- Recent coverage (if also handling press)

### Sidebar Sections
- **Overview:** Comms Dashboard
- **Communications:** Email Campaigns, SMS/WhatsApp, Templates
- **Social Media:** Dashboard, Post Composer, Calendar, Analytics, Account Connections
- **Press:** Media Contacts, Creators, Content, Releases, Advisories, Statements, Coverage, Endorsements, Talking Points, Interviews
- **People:** Contacts, Segments (for targeting communications)
- **Messaging:** Messages

### Mobile Experience
Desktop-primary for content creation (email builder, press release drafting). Mobile for reviewing analytics, responding to messages, and approving urgent sends. Mobile tabs: Dashboard, Email, Social, Messages, More.

### What They Don't See
No access to: fundraising details (donations, forms, compliance), field operations (canvassing, turfs, phone banking), volunteer management (roster, shifts, training), settings (billing, roles, integrations), data management (import/export, dedup), GOTV operations (unless granted additional templates).

---

## Finance Director

### Home Screen
**Fundraising Dashboard** (DASH-003) — focused on money:
- Revenue: today, this week, this month, total (with trend lines)
- Goal progress thermometer
- Donor stats: new vs. returning, average donation, recurring health
- Payment processor status (last sync, success rate)
- Compliance alerts: approaching contribution limits, flagged donations needing review
- Upcoming reporting deadlines

### Sidebar Sections
- **Overview:** Fundraising Dashboard
- **Fundraising:** Donations, Forms, Campaigns, Recurring, Pledges, Refunds, Cash, Compliance Flags, A/B Tests, Alliance Splits, Payment Processors, Statements
- **People:** Donors, Segments
- **Messaging:** Messages

### Mobile Experience
Desktop-primary for financial management, form building, and compliance review. Mobile for checking totals and handling urgent compliance flags. Mobile tabs: Dashboard, Donations, Compliance, Messages, More.

### What They Don't See
No access to: communications (email, SMS, social), field operations, volunteer management, press, GOTV, settings (except payment processor config, which they can access within Fundraising), data management.

---

## Field Director

### Home Screen
**Field Operations Dashboard** (DASH-002) — focused on ground game:
- Canvassing progress map (turfs complete vs. remaining)
- Contact rate by turf, team, volunteer
- Support score distribution
- Phone banking metrics (calls made, contact rate, outcomes)
- Voter registration drive stats
- Active shifts and volunteer deployment
- Upcoming canvassing campaigns

### Sidebar Sections
- **Overview:** Field Dashboard
- **Field:** Canvassing Campaigns, Phone Banking, Voter Registration, Turfs, Walk Lists, Scripts
- **GOTV:** Universe Builder, Staging, Turf Cutting, War Room, Rides, Poll Watchers, Results, Post-Election
- **People:** Contacts, Segments
- **Messaging:** Messages

### Mobile Experience
Desktop for planning (turf cutting, campaign setup, script building). Mobile for monitoring active operations in the field and checking dashboards. Mobile tabs: Dashboard, Canvassing, Turfs, Messages, More.

### Election Day
During election day mode, the Field Director's home screen switches to the War Room Dashboard (DASH-008). GOTV items are promoted to the top of their sidebar.

### What They Don't See
No access to: fundraising (donations, forms, compliance), communications (email, SMS, social), volunteer management (roster, onboarding, training — they see volunteers through the field lens, not the management lens), press, settings, data management.

---

## Volunteer Coordinator

### Home Screen
**Volunteer Dashboard** (DASH-005) — focused on people:
- Active volunteer count and recent signups
- Shift fill rates (today, this week)
- Volunteer hours (this week, total)
- Pending approvals (new volunteer signups awaiting review)
- Training completion rates
- Upcoming events with RSVP status
- Team status overview

### Sidebar Sections
- **Overview:** Volunteer Dashboard
- **Volunteers:** Roster, Onboarding Setup, Training Modules, Training Content Editor, Shifts, Teams, Certifications
- **Events:** Events, Check-in, Post-Event
- **Messaging:** Messages

### Mobile Experience
Desktop for setup (training content, shift scheduling, team management). Mobile for checking in volunteers at events, monitoring shift coverage, and messaging. Mobile tabs: Dashboard, Roster, Shifts, Messages, More.

### What They Don't See
No access to: fundraising, communications, field operations (they manage volunteers but not field strategy — the Field Director handles canvassing campaigns and turfs), press, GOTV (unless granted), settings, data management.

---

## Data Manager

### Home Screen
**Data Quality Dashboard** (DASH-006) — focused on data health:
- Records by type and status
- Recent imports and their quality scores
- Dedup queue size (pending reviews)
- Data quality flags (incomplete records, potential duplicates, stale records)
- Export history
- Recent merge activity

### Sidebar Sections
- **Overview:** Data Dashboard
- **People:** Contacts, Segments, Import, Export, Dedup Queue, Data Quality, Tags
- **Messaging:** Messages

### Mobile Experience
Desktop-only for practically all work (data import, dedup review, export). Mobile for messages only. Mobile tabs: Contacts, Import, Dedup, Messages, More.

### What They Don't See
No access to: fundraising, communications, field operations, volunteer management, press, GOTV, settings (except data-related settings accessed through People). The Data Manager works with the data layer, not the operational layer.

---

## Volunteer

### Home Screen
**My Shifts** — a simple, action-oriented home:
- Today's shifts (with location, time, role)
- Upcoming shifts (next 7 days)
- "Start Shift" action button (prominent, if a shift is active)
- Unread message count
- Upcoming events they've RSVP'd to
- Training progress (if modules are assigned)

### Sidebar Sections
- **My Stuff:** My Shifts, My Tasks, My Team
- **Events:** Events
- **Messaging:** Messages
- **Training:** Modules, Certifications
- **Field:** Start Shift (action button)

### Mobile Experience
**Mobile is the primary device.** The entire volunteer experience is designed for a phone. Desktop is a secondary option (for volunteers who want to check shifts from a computer).

Mobile tabs: Shifts, Events, Messages, Start Shift

The "Start Shift" tab is visually distinct — a filled/colored button rather than a standard tab icon. It's the primary action for the volunteer.

### Field Mode
When the volunteer taps "Start Shift," the app transitions to field mode (see navigation-model.md). The normal navigation shell disappears entirely. The volunteer's world becomes:
1. Walk list / call list / registration queue
2. Door card / call card / registration form (one at a time)
3. Response capture
4. Next item
5. End shift → debrief → return to normal shell

### Offline Surface
In field mode, everything works offline:
- Walk list with voter information
- Map tiles (pre-cached)
- Door card and interaction form
- All data saved locally, synced when connected
- Sync status indicator prominently displayed

Outside field mode, limited offline:
- Read synced messages
- Compose messages (queued)
- View cached shift and event information

### What They Don't See
No access to: any staff features. No dashboards (beyond their personal shifts view), no CRM management, no settings, no financial data, no campaign configuration. The volunteer sees only their own shifts, events, messages, and training.

---

## Team Lead

### Home Screen
Same as Volunteer, but with an additional **Team** section:
- Team roster (who's checked in, who's missing)
- Team progress (doors knocked, calls made — aggregate)
- Pending check-ins
- Team-level issues

### Sidebar Sections
Everything a Volunteer sees, plus:
- **My Team:** Team Roster, Team Progress, Check-in

### Mobile Experience
Same as Volunteer — mobile-primary. The "Shifts" tab defaults to the team view (showing all team members' shifts) rather than just the personal view.

### Field Mode
Same field mode as Volunteer, but the Team Lead can also:
- View the team's overall progress
- Reassign doors/calls within their team
- Check in team members at staging locations
- Escalate issues to the war room (during GOTV)

### What They Don't See
Same restrictions as Volunteer. Team Leads are volunteers with scoped team leadership — they don't gain access to any staff features. They see their team, not the org.

---

## Candidate

### Home Screen
**Candidate Dashboard** (DASH-010) — deliberately curated and simplified:
- Fundraising thermometer (total raised vs. goal — no drill-down into individual donations)
- Volunteer count (active volunteers — no roster access)
- Event attendance (upcoming events, recent turnout — no event management)
- Field progress (high-level: "X% of target voters contacted" — no turf-level detail)
- Unread messages (prominent — messaging is a primary candidate activity)
- Pending approvals (press releases, social posts awaiting their review)

### Sidebar Sections
- **Overview:** Campaign Dashboard
- **Profile:** My Public Profile
- **Approvals:** Pending Approvals
- **Messaging:** Messages

### Mobile Experience
Mobile and desktop are equally important for the Candidate. They check the dashboard and messages from their phone, review and approve content from wherever they are.

Mobile tabs: Dashboard, Profile, Approvals, Messages

### Messaging Patterns
The Candidate's messaging experience emphasizes:
- **Briefing messages** appear distinctly from casual conversation (formatted, structured)
- **Approval requests** appear in both the Approvals section and in messages, with approve/reject/comment actions
- Conversations with key staff (Campaign Manager, Communications Director) are pinned to the top
- Group conversations they're part of (e.g., "Leadership Team") are easily accessible

### What They Don't See
The Candidate's view is intentionally limited to high-level information. No access to: operational dashboards, CRM details, volunteer roster, financial details (individual donations, compliance), settings, data management, canvassing details, phone banking, GOTV operations. They see summaries, not source data.

**Override:** Since the Candidate role is a template, the Org Admin can grant additional permissions for hands-on candidates who want deeper access. But the default is curated.

---

## Supporter

### Home Screen
**Supporter Home** (SUP-001) — a minimal personal portal:
- Recent activity (last donation, last event attended)
- Quick actions: Donate, View Events, Update Preferences
- Communication preference status (what they're subscribed to)

### Sidebar Sections
- **My Profile:** Profile, Preferences, Communication Settings
- **Donations:** Donation History, Recurring, Receipts
- **Events:** My Events

### Mobile Experience
**Mobile-primary.** Supporters interact with the platform primarily through their phone — donation forms, event RSVPs, and profile management are all mobile-first.

Mobile tabs: Profile, Donations, Events

### Authentication
Supporters have tiered access:
- **Magic link** (low friction): click a link in an email to access donation history and receipts
- **Full account** (passkey or email login): required for management actions (modify recurring donations, update payment method, change personal info)

### What They Don't See
Supporters see only their own data and public content. No access to any internal platform features — no CRM, no campaigns, no staff tools, no volunteer features. Their view is a personal portal, not a campaign management tool.

---

## Cross-Persona Patterns

### Notification Behavior by Persona

| Persona | High-priority notifications | Delivery channels |
|---------|---------------------------|-------------------|
| Org Admin | Security alerts, compliance deadlines, system issues, billing | In-app, push, email, SMS (critical only) |
| Communications Director | Campaign delivery failures, approval responses | In-app, push, email |
| Finance Director | Compliance flags, payment failures, recurring donation issues | In-app, push, email |
| Field Director | Active operation alerts, GOTV escalations | In-app, push, email |
| Volunteer Coordinator | New volunteer signups, shift cancellations, no-shows | In-app, push, email |
| Data Manager | Import completion, dedup queue updates, data quality alerts | In-app, email |
| Volunteer | Shift reminders, assignment changes, messages from Team Lead | In-app, push |
| Team Lead | Team member issues, shift reminders, war room escalations (GOTV) | In-app, push |
| Candidate | Approval requests, briefings, key staff messages | In-app, push |
| Supporter | Donation receipts, event reminders, recurring donation status | Email, push (if opted in) |

### Session Management by Persona

| Persona | Session length | Re-auth requirement | Field mode |
|---------|---------------|--------------------| -----------|
| Org Admin | Short (hours) | Re-auth for sensitive actions | No |
| Staff (all) | Medium (workday) | Re-auth for sensitive actions | No (unless also a volunteer) |
| Volunteer | Medium (workday) / shift-length (field) | Re-auth after shift end | Yes |
| Team Lead | Medium (workday) / shift-length (field) | Re-auth after shift end | Yes |
| Candidate | Medium (workday) | Standard | No |
| Supporter | Long (weeks) | Re-auth for payment changes | No |

### Election Day View Changes

When election day mode is activated:

| Persona | View change |
|---------|-------------|
| Org Admin | War Room Dashboard promoted to top of sidebar. "Election Day Active" banner. |
| Field Director | Home screen switches to War Room Dashboard. GOTV section promoted. |
| Volunteer Coordinator | Staging check-in tools promoted. Shift management emphasized. |
| Communications Director | Election day comms plan active. Send controls for each wave visible. |
| Volunteer | GOTV-specific field mode (GOTV door cards, simplified script). |
| Team Lead | Team GOTV progress visible. War room escalation button available. |
| All others | No change (Candidate, Supporter, Data Manager, Finance Director). |

## Open Questions

1. **Role template preview.** When an Org Admin is configuring a role template, can they preview what that role's view looks like? A "preview as this role" mode would help Org Admins understand the impact of their permission choices.

2. **First-run experience per persona.** Should each persona see a brief tour/onboarding specific to their role when they first log in? ("Welcome, Field Director — here's where you set up canvassing campaigns...")

3. **Persona-specific empty states.** When a persona's home screen has no data yet (no shifts created, no campaigns running), the empty state should guide them toward their first action. These need to be persona-specific — a Finance Director's empty state says "Set up your first donation form," while a Field Director's says "Create your first canvassing campaign."

<!-- REVISIT: The mobile tab selections per persona are estimates based on spec analysis. Actual usage data from alpha testing should inform adjustments. -->
