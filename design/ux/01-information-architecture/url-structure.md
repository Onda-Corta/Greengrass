# URL Structure

## Purpose

This document maps the screen inventory (screen-inventory.md) to SvelteKit routes. It defines the complete URL hierarchy for the platform, identifying which routes are public, authenticated, offline-capable, or mobile-only.

SvelteKit uses file-based routing in `src/routes/`. Route groups `(group)` affect layout nesting but do not appear in the URL. Dynamic segments use `[param]`. This structure is the bridge between the information architecture and the implementation.

## Route Architecture

The app uses six SvelteKit layout groups, each with a distinct navigation shell:

| Group | Shell | Purpose |
|-------|-------|---------|
| `(public)` | Minimal public chrome | Public pages — no authentication required |
| `(auth)` | Auth-specific layout | Login, recovery, registration flows |
| `(app)` | Full navigation shell (sidebar + header) | All authenticated staff, volunteer, and candidate screens |
| `(field-mode)` | Field mode shell (stripped-down, full-screen) | Active shift canvassing, phone banking, voter reg, GOTV |
| `(portal)` | Supporter portal shell | Supporter self-service (minimal navigation) |
| `(wizard)` | Wizard shell (progress steps, no sidebar nav) | Onboarding wizards |

Each group wraps a `+layout.svelte` that defines the navigation shell for all routes within it.

## Route Map

### Public Pages — `(public)`

No authentication required. Tenant-branded but publicly accessible.

| URL | Screen ID | Screen | Mobile |
|-----|-----------|--------|--------|
| `/p/[slug]` | PUB-001 | Candidate Profile Page | Primary |
| `/o/[slug]` | PUB-002 | Organization Profile Page | Primary |
| `/donate/[formId]` | PUB-003, FUND-005 | Donation Form (Hosted) | Primary |
| `/events/[eventId]` | PUB-004, EVT-007 | Event Page | Primary |
| `/action/[actionId]` | PUB-005, ACT-005 | Action Page (Letter/Email) | Primary |
| `/petition/[petitionId]` | PUB-006, ACT-006 | Petition Page | Primary |
| `/volunteer` | PUB-007 | Volunteer Signup Page | Primary |
| `/media-kit` | PUB-008 | Media Kit Page | Primary |
| `/events/[eventId]/rsvp` | EVT-006 | Event RSVP Form | Primary |

**Notes:**
- `/p/` and `/o/` are short prefixes for public profiles — keeps URLs clean for sharing on social media, print materials, and SMS.
- `/donate/[formId]` is the most latency-sensitive public route — must load fast on low-end devices over slow connections. Pre-rendered where possible.
- Public event pages can be shared via URL without requiring login. The RSVP form at `/events/[eventId]/rsvp` collects information without requiring authentication.

---

### Authentication — `(auth)`

Authentication flow screens. These use a minimal, focused layout — no sidebar, no app navigation.

| URL | Screen ID | Screen | Mobile |
|-----|-----------|--------|--------|
| `/login` | AUTH-001 | Login (Passkey) | Primary |
| `/login/fallback` | AUTH-002 | Login Fallback (Magic Link / SMS OTP) | Primary |
| `/recover` | AUTH-003 | Account Recovery (Trusted Contact) | Primary |
| `/register` | AUTH-004 | Passkey Registration | Primary |
| `/register/trusted-contacts` | AUTH-005 | Trusted Contact Setup | Yes |
| `/authorize-device` | AUTH-006 | Device Authorization | Yes |
| `/session-expired` | AUTH-007 | Session Expired / Re-authenticate | Primary |

**Notes:**
- `/login` detects passkey availability and auto-selects the appropriate flow. `/login/fallback` is for devices without passkey support or when the user explicitly requests it.
- All auth routes work on mobile — authentication is the first experience for most users.
- `/register` is the passkey enrollment flow after initial invitation acceptance.

---

### Authenticated App — `(app)`

The main application. Uses the full navigation shell (header bar + sidebar on desktop, bottom tabs on mobile). All routes require authentication and are role-gated — the role template determines which routes a user can access. Accessing a route outside one's role returns a 404 (not 403 — restricted features are invisible, not forbidden).

#### Dashboards

| URL | Screen ID | Screen | Personas | Offline |
|-----|-----------|--------|----------|---------|
| `/dashboard` | DASH-001 | Campaign Overview Dashboard | OA, C | No |
| `/dashboard/field` | DASH-002 | Field Operations Dashboard | OA, FiD | No |
| `/dashboard/fundraising` | DASH-003 | Fundraising Dashboard | OA, FD | No |
| `/dashboard/communications` | DASH-004 | Communications Dashboard | OA, CD | No |
| `/dashboard/volunteers` | DASH-005 | Volunteer Dashboard | OA, VC | No |
| `/dashboard/data` | DASH-006 | Data Quality Dashboard | OA, DM | No |
| `/dashboard/compliance` | DASH-007 | Compliance Dashboard | OA, FD | No |
| `/dashboard/war-room` | DASH-008 | GOTV War Room Dashboard | OA, FiD | No |
| `/dashboard/team` | DASH-009 | Team Lead Dashboard | TL | No |
| `/dashboard/candidate` | DASH-010 | Candidate Dashboard | C | No |
| `/dashboard/alliance` | DASH-011 | Alliance Dashboard | OA | No |

**Home screen routing:** Each persona has a default dashboard. When a user navigates to `/dashboard` (or logs in), the server redirects to their role-appropriate dashboard:
- Org Admin → `/dashboard`
- Communications Director → `/dashboard/communications`
- Finance Director → `/dashboard/fundraising`
- Field Director → `/dashboard/field`
- Volunteer Coordinator → `/dashboard/volunteers`
- Data Manager → `/dashboard/data`
- Candidate → `/dashboard/candidate`
- Team Lead → `/dashboard/team`
- Volunteer → `/shifts` (not a dashboard — goes directly to shifts)
- Supporter → redirected to `(portal)` at `/portal`

#### People / CRM

| URL | Screen ID | Screen | Offline |
|-----|-----------|--------|---------|
| `/people` | CRM-001 | Contact List | No |
| `/people/[contactId]` | CRM-002 | Contact Detail | Partial |
| `/people/[contactId]/edit` | CRM-003 | Contact Create/Edit | No |
| `/people/new` | CRM-003 | Contact Create (new) | No |
| `/people/segments` | CRM-005 | Segment List | No |
| `/people/segments/new` | CRM-004 | Segment Builder (new) | No |
| `/people/segments/[segmentId]` | CRM-004 | Segment Builder (edit) | No |
| `/people/dedup` | CRM-006 | Dedup Review Queue | No |
| `/people/dedup/[pairId]` | CRM-007 | Dedup Side-by-Side Comparison | No |
| `/people/import` | CRM-008 | Data Import Wizard — File Upload | No |
| `/people/import/[importId]/map` | CRM-009 | Data Import Wizard — Column Mapping | No |
| `/people/import/[importId]/preview` | CRM-010 | Data Import Wizard — Dedup Preview | No |
| `/people/import/[importId]/confirm` | CRM-011 | Data Import Wizard — Confirmation | No |
| `/people/import/history` | CRM-012 | Data Import History | No |
| `/people/export` | CRM-013 | Data Export | No |
| `/people/data-quality` | CRM-014 | Data Quality Report | No |
| `/people/tags` | CRM-015 | Tag Management | No |

**Notes:**
- The Data Import Wizard (CRM-008 through CRM-011) uses a multi-step URL progression. Each step is a distinct URL so the wizard state is bookmarkable and shareable.
- `/people/[contactId]` loads partial data offline (cached contacts) but cannot save edits offline.

#### Field Operations

| URL | Screen ID | Screen | Offline |
|-----|-----------|--------|---------|
| `/field/canvassing` | CANV-001 | Canvassing Campaign List | No |
| `/field/canvassing/new` | CANV-002 | Canvassing Campaign Create | No |
| `/field/canvassing/[campaignId]` | CANV-002 | Canvassing Campaign Edit | No |
| `/field/canvassing/[campaignId]/results` | CANV-013 | Canvassing Results Review | No |
| `/field/canvassing/[campaignId]/progress` | CANV-014 | Canvassing Progress Map | No |
| `/field/scripts/new` | CANV-003 | Script Builder (canvassing, new) | No |
| `/field/scripts/[scriptId]` | CANV-003 | Script Builder (canvassing, edit) | No |
| `/field/turfs` | CANV-004 | Turf Management Map | No |
| `/field/turfs/auto-generate` | CANV-005 | Turf Auto-Generation | No |
| `/field/walk-lists` | CANV-006 | Walk List Management | No |
| `/field/phone-banking` | PHONE-001 | Phone Bank Campaign List | No |
| `/field/phone-banking/new` | PHONE-002 | Phone Bank Campaign Create | No |
| `/field/phone-banking/[campaignId]` | PHONE-002 | Phone Bank Campaign Edit | No |
| `/field/phone-banking/[campaignId]/script` | PHONE-003 | Phone Bank Script Builder | No |
| `/field/phone-banking/[campaignId]/progress` | PHONE-007 | Phone Bank Progress Dashboard | No |
| `/field/voter-registration` | VREG-001 | Voter Reg Drive List | No |
| `/field/voter-registration/new` | VREG-002 | Voter Reg Drive Create | No |
| `/field/voter-registration/[driveId]` | VREG-002 | Voter Reg Drive Edit | No |
| `/field/voter-registration/[driveId]/templates` | VREG-003 | Jurisdiction Template Selector | No |
| `/field/voter-registration/[driveId]/results` | VREG-006 | Voter Reg Results Review | No |

**Notes:**
- `/field/scripts` are shared between canvassing and phone banking. Scripts are created here and referenced from campaigns.
- All field management screens are desktop-preferred. The actual field work (canvassing, calling, registering) happens in field mode — a separate layout group.

#### Fundraising

| URL | Screen ID | Screen | Offline |
|-----|-----------|--------|---------|
| `/fundraising/donations` | FUND-001 | Donation List | No |
| `/fundraising/donations/[donationId]` | FUND-002 | Donation Detail | No |
| `/fundraising/forms` | FUND-003 | Donation Form Builder (list) | No |
| `/fundraising/forms/new` | FUND-003 | Donation Form Builder (new) | No |
| `/fundraising/forms/[formId]` | FUND-003 | Donation Form Builder (edit) | No |
| `/fundraising/forms/[formId]/preview` | FUND-004 | Donation Form Preview | No |
| `/fundraising/forms/[formId]/embed` | FUND-006 | Embed Configuration | No |
| `/fundraising/campaigns` | FUND-018 | Fundraising Campaign List | No |
| `/fundraising/campaigns/new` | FUND-019 | Fundraising Campaign Create | No |
| `/fundraising/campaigns/[campaignId]` | FUND-019 | Fundraising Campaign Edit | No |
| `/fundraising/recurring` | FUND-007 | Recurring Donation Management | No |
| `/fundraising/pledges` | FUND-008 | Pledge Management | No |
| `/fundraising/refunds` | FUND-009 | Refund Processing | No |
| `/fundraising/cash` | FUND-010 | Cash Donation Recording | Partial |
| `/fundraising/cash/reconciliation` | FUND-011 | Cash Reconciliation | No |
| `/fundraising/compliance` | FUND-012 | Compliance Flag Review | No |
| `/fundraising/ab-tests` | FUND-013 | A/B Test Setup (list) | No |
| `/fundraising/ab-tests/new` | FUND-013 | A/B Test Setup (new) | No |
| `/fundraising/ab-tests/[testId]` | FUND-014 | A/B Test Results | No |
| `/fundraising/alliance-splits` | FUND-015 | Alliance Split Configuration | No |
| `/fundraising/alliance-reports` | FUND-016 | Alliance Fundraising Report | No |
| `/fundraising/processors` | FUND-017 | Payment Processor Configuration | No |
| `/fundraising/statements` | FUND-020 | Year-End Statement Generator | No |

#### Communications

| URL | Screen ID | Screen | Offline |
|-----|-----------|--------|---------|
| `/communications/email` | COMM-001 | Email Campaign List | No |
| `/communications/email/new` | COMM-002 | Email Campaign Builder (new) | No |
| `/communications/email/[campaignId]` | COMM-002 | Email Campaign Builder (edit) | No |
| `/communications/email/templates` | COMM-004 | Email Template Library | No |
| `/communications/email/templates/new` | COMM-003 | Email Template Builder (new) | No |
| `/communications/email/templates/[templateId]` | COMM-003 | Email Template Builder (edit) | No |
| `/communications/sms` | COMM-005 | SMS/WhatsApp Composer | No |
| `/communications/analytics` | COMM-006 | Communication Analytics | No |
| `/communications/consent` | COMM-007 | Consent Management | No |
| `/communications/preferences` | COMM-008 | Communication Preferences (Staff) | No |
| `/communications/unsubscribes` | COMM-009 | Unsubscribe Management | No |

#### Social Media

| URL | Screen ID | Screen | Offline |
|-----|-----------|--------|---------|
| `/social` | SOCIAL-001 | Social Media Dashboard | No |
| `/social/compose` | SOCIAL-002 | Post Composer (Multi-platform) | No |
| `/social/calendar` | SOCIAL-003 | Post Calendar / Schedule | No |
| `/social/analytics` | SOCIAL-004 | Post Analytics | No |
| `/social/accounts` | SOCIAL-005 | Social Account Connection | No |

**Notes:**
- Social media is a top-level route (`/social`) rather than nested under `/communications` because it's a distinct functional area in the sidebar (Press section for Comms Director).
- Platform-specific preview (SOCIAL-006) is a component within the Post Composer, not a separate route.

#### Events

| URL | Screen ID | Screen | Offline |
|-----|-----------|--------|---------|
| `/events` | EVT-001 | Event List | No |
| `/events/new` | EVT-002 | Event Create | No |
| `/events/[eventId]/manage` | EVT-002 | Event Edit | No |
| `/events/[eventId]` | EVT-003 | Event Detail | No |
| `/events/[eventId]/rsvps` | EVT-004 | Event RSVP Management | No |
| `/events/[eventId]/check-in` | EVT-005 | Event Check-in Tool | Yes |
| `/events/[eventId]/metrics` | EVT-008 | Event Metrics | No |
| `/events/[eventId]/virtual` | EVT-009 | Virtual Event Setup | No |
| `/events/[eventId]/survey` | EVT-010 | Post-Event Survey Builder | No |

**Notes:**
- `/events/[eventId]` is the read-only detail view; `/events/[eventId]/manage` is the edit form. This avoids overloading the same URL with view/edit state.
- `/events/[eventId]/check-in` is one of the few authenticated routes that works fully offline. It downloads attendee data on load and works disconnected.

#### Activism

| URL | Screen ID | Screen | Offline |
|-----|-----------|--------|---------|
| `/activism` | ACT-001 | Activism Campaign List | No |
| `/activism/letter/new` | ACT-002 | Letter/Email Action Setup (new) | No |
| `/activism/letter/[actionId]` | ACT-002 | Letter/Email Action Setup (edit) | No |
| `/activism/petition/new` | ACT-003 | Petition Setup (new) | No |
| `/activism/petition/[petitionId]` | ACT-003 | Petition Setup (edit) | No |
| `/activism/public-comment/new` | ACT-004 | Public Comment Campaign Setup (new) | No |
| `/activism/public-comment/[campaignId]` | ACT-004 | Public Comment Campaign Setup (edit) | No |
| `/activism/[campaignId]/analytics` | ACT-008 | Activism Campaign Analytics | No |
| `/activism/[campaignId]/delivery` | ACT-009 | Delivery Event Documentation | No |

**Notes:**
- The public-facing action pages (`/action/[actionId]`, `/petition/[petitionId]`) are in the `(public)` group. These staff routes are for creating and managing the campaigns.
- AI Message Generation Preview (ACT-007) is a component within the public action page, not a separate staff route.

#### Press & Media

| URL | Screen ID | Screen | Offline |
|-----|-----------|--------|---------|
| `/press/contacts` | PRESS-001 | Media Contact List | No |
| `/press/contacts/[contactId]` | PRESS-002 | Media Contact Detail | No |
| `/press/lists` | PRESS-003 | Media List Management | No |
| `/press/releases` | PRESS-004 | Press Release Builder (list) | No |
| `/press/releases/new` | PRESS-004 | Press Release Builder (new) | No |
| `/press/releases/[releaseId]` | PRESS-004 | Press Release Builder (edit) | No |
| `/press/releases/[releaseId]/preview` | PRESS-005 | Press Release Preview | No |
| `/press/releases/[releaseId]/distribute` | PRESS-006 | Press Release Distribution | No |
| `/press/advisories/new` | PRESS-007 | Media Advisory Builder (new) | No |
| `/press/advisories/[advisoryId]` | PRESS-007 | Media Advisory Builder (edit) | No |
| `/press/statements/new` | PRESS-008 | Statement Builder (new) | No |
| `/press/statements/[statementId]` | PRESS-008 | Statement Builder (edit) | No |
| `/press/media-kit` | PRESS-009 | Media Kit Management | No |
| `/press/coverage` | PRESS-010 | Coverage Log | No |
| `/press/coverage/analytics` | PRESS-011 | Coverage Analytics | No |
| `/press/endorsements` | PRESS-012 | Endorsement Pipeline | No |
| `/press/endorsements/[endorsementId]` | PRESS-013 | Endorsement Detail | No |
| `/press/talking-points` | PRESS-014 | Talking Points Library | No |
| `/press/interviews` | PRESS-015 | Interview Schedule | No |
| `/press/spokespersons` | PRESS-016 | Spokesperson Configuration | No |

#### GOTV & Election Day

| URL | Screen ID | Screen | Offline |
|-----|-----------|--------|---------|
| `/gotv/universe` | GOTV-001 | GOTV Universe Builder | No |
| `/gotv/early-voting` | GOTV-002 | Early Voting Data Upload | No |
| `/gotv/staging` | GOTV-003 | Volunteer Staging Setup | No |
| `/gotv/staging/check-in` | GOTV-023 | Staging Location Check-in | No |
| `/gotv/turfs` | GOTV-004 | GOTV Turf Cutting | No |
| `/gotv/comms-plan` | GOTV-005 | Election Day Comms Plan | No |
| `/gotv/poll-watchers` | GOTV-006 | Poll Watcher Registry | No |
| `/gotv/poll-watchers/credentials` | GOTV-007 | Poll Watcher Credential Tracking | No |
| `/gotv/poll-watchers/issues` | GOTV-016 | Poll Watcher Issue Queue | No |
| `/gotv/rides` | GOTV-012 | Ride Coordination — Dispatcher View | No |
| `/gotv/turnout` | GOTV-017 | Turnout Dashboard — Map View | No |
| `/gotv/turnout/segments` | GOTV-018 | Turnout Dashboard — Segment View | No |
| `/gotv/reallocation` | GOTV-019 | Reallocation Suggestions | No |
| `/gotv/results/entry` | GOTV-020 | Election Night Results Entry | No |
| `/gotv/results` | GOTV-021 | Election Night Results Dashboard | No |
| `/gotv/analysis` | GOTV-022 | Post-Election Analysis | No |

**Field mode GOTV screens:** GOTV-008, GOTV-009, GOTV-010 (GOTV door card, walk list, chase calls) are in the `(field-mode)` group, not here.

**Volunteer-facing GOTV screens:** GOTV-011 (ride request), GOTV-014 (poll watcher check-in), GOTV-015 (issue report) are under `/shifts/...` — see Volunteer Screens below.

#### Messaging

| URL | Screen ID | Screen | Offline |
|-----|-----------|--------|---------|
| `/messages` | MSG-001 | Message List (Inbox) | Partial |
| `/messages/[conversationId]` | MSG-002, MSG-003 | Conversation View (DM or Group) | Partial |
| `/messages/[conversationId]/thread/[threadId]` | MSG-004 | Thread View | Partial |
| `/messages/new-group` | MSG-005 | Group Create | No |
| `/messages/[conversationId]/settings` | MSG-005 | Group Edit | No |
| `/messages/broadcast` | MSG-006 | Broadcast Composer | No |
| `/messages/war-room` | MSG-007 | War Room Channel | No |
| `/messages/alliance` | MSG-014 | Alliance Channel | No |

**Contextual threads:** MSG-008 through MSG-011 (event, shift, issue, donation flag threads) are accessed from their parent context (e.g., an event detail page shows a "Discussion" tab that renders the contextual thread inline). They share the conversation view component but are navigated to from the parent entity, not from the messages inbox.

**Candidate-specific views:** MSG-012 (Briefing View) and MSG-013 (Approval Queue) reuse the messages layout but with filtered views:
| `/messages?view=briefings` | MSG-012 | Candidate Briefing View | Partial |
| `/approvals` | MSG-013 | Candidate Approval Queue | No |

#### Volunteers (Coordinator Screens)

| URL | Screen ID | Screen | Offline |
|-----|-----------|--------|---------|
| `/volunteers/roster` | — | Volunteer Roster | No |
| `/volunteers/onboarding` | — | Onboarding Setup | No |
| `/volunteers/training` | HELP-008 | Training Content Editor | No |
| `/volunteers/training/modules` | HELP-004 | Training Module List (management view) | No |
| `/volunteers/shifts` | — | Shift Management | No |
| `/volunteers/teams` | — | Team Management | No |
| `/volunteers/certifications` | HELP-007 | Certification Status (management view) | No |

#### Volunteer Self-Service Screens

These are the screens volunteers and team leads see for their own work.

| URL | Screen ID | Screen | Offline |
|-----|-----------|--------|---------|
| `/shifts` | — | My Shifts (Volunteer home screen) | Partial |
| `/shifts/[shiftId]` | — | Shift Detail | Partial |
| `/tasks` | — | My Tasks | Partial |
| `/team` | — | My Team (Team Leads only) | No |
| `/team/roster` | — | Team Roster | No |
| `/team/progress` | — | Team Progress | No |
| `/training` | HELP-004 | Training Module List | Partial |
| `/training/[moduleId]` | HELP-005 | Training Module Content | Partial |
| `/training/[moduleId]/quiz` | HELP-006 | Training Quiz | Partial |
| `/training/certifications` | HELP-007 | Certification Status | No |

**Notes:**
- `/shifts` is the volunteer's home. When a volunteer navigates to the root (`/`) they are redirected here.
- The "Start Shift" action from `/shifts/[shiftId]` transitions the user to the `(field-mode)` group.

#### GOTV Volunteer Screens

Screens that volunteers and team leads use during GOTV operations, outside of field mode.

| URL | Screen ID | Screen | Offline |
|-----|-----------|--------|---------|
| `/gotv/ride-request` | GOTV-011 | Ride Request Form | Partial |
| `/gotv/ride-request/drive` | GOTV-013 | Ride Coordination — Driver View | No |
| `/gotv/poll-watch/check-in` | GOTV-014 | Poll Watcher Check-in | No |
| `/gotv/poll-watch/report` | GOTV-015 | Poll Watcher Issue Report Form | Partial |

#### Alliance

| URL | Screen ID | Screen | Offline |
|-----|-----------|--------|---------|
| `/alliance` | ALLY-001 | Alliance Dashboard | No |
| `/alliance/members` | ALLY-002 | Alliance Member List | No |
| `/alliance/join` | ALLY-003 | Affiliation Request Form | No |
| `/alliance/requests` | ALLY-004 | Affiliation Request Queue | No |
| `/alliance/sharing` | ALLY-005 | Sharing Configuration | No |
| `/alliance/campaigns` | ALLY-006 | Joint Campaign Setup | No |
| `/alliance/analytics` | ALLY-007 | Shared Analytics | No |
| `/alliance/gotv` | ALLY-008 | GOTV Alliance Coordination | No |

#### Settings

| URL | Screen ID | Screen | Offline |
|-----|-----------|--------|---------|
| `/settings` | — | Settings Hub | No |
| `/settings/org` | SET-001 | Org Profile & Branding | No |
| `/settings/roles` | SET-002 | Role Template Editor (list) | No |
| `/settings/roles/[roleId]` | SET-002 | Role Template Editor (detail) | No |
| `/settings/roles/[roleId]/permissions` | SET-003 | Permission Override Panel | No |
| `/settings/staff` | SET-004 | Staff Management List | No |
| `/settings/staff/invite` | SET-005 | Staff Invite Flow | No |
| `/settings/geography` | SET-006 | Geographic Scope Configuration | No |
| `/settings/campaign-period` | SET-007 | Campaign Period Configuration | No |
| `/settings/compliance` | SET-008 | Compliance Configuration | No |
| `/settings/contribution-limits` | SET-009 | Contribution Limits Configuration | No |
| `/settings/disclaimers` | SET-010 | Disclaimer Text Configuration | No |
| `/settings/data-retention` | SET-011 | Data Retention Policy | No |
| `/settings/integrations` | SET-012 | Integration Settings Hub | No |
| `/settings/integrations/whatsapp` | SET-013 | WhatsApp Business Setup | No |
| `/settings/integrations/sms` | SET-014 | SMS Provider Configuration | No |
| `/settings/integrations/email` | SET-015, COMM-010 | Email Domain Configuration | No |
| `/settings/integrations/social` | SET-016 | Social Media Account Connections | No |
| `/settings/billing` | SET-017 | Billing & Subscription | No |
| `/settings/audit-trail` | SET-018 | Audit Trail Viewer | No |
| `/settings/security` | SET-019 | Security Settings | No |
| `/settings/encryption` | SET-020 | Encryption Key Management | No |
| `/settings/api-keys` | SET-021 | API Key Management | No |
| `/settings/webhooks` | SET-022 | Webhook Configuration | No |

#### Help & Support

| URL | Screen ID | Screen | Offline |
|-----|-----------|--------|---------|
| `/help` | HELP-001 | Knowledge Base Browser | No |
| `/help/[articleSlug]` | HELP-002 | Knowledge Base Article | Partial |
| `/help/chat` | HELP-003 | AI Concierge Chat | No |

#### User Profile & Preferences

| URL | Screen ID | Screen | Offline |
|-----|-----------|--------|---------|
| `/profile` | PROF-001 | Personal Profile | No |
| `/profile/notifications` | PROF-002 | Notification Preferences | No |
| `/profile/security` | PROF-003 | Security Settings (Personal) | No |
| `/profile/language` | PROF-004 | Language Preference | No |
| `/profile/switch-tenant` | PROF-005 | Tenant Switcher | No |

---

### Field Mode — `(field-mode)`

Full-screen takeover shell. No sidebar, no bottom tabs, no standard navigation. Only the field header (sync status, shift timer) and task navigation (prev/next/end shift).

All field mode routes require an active shift. Navigating to a field mode URL without an active shift redirects to `/shifts`.

| URL | Screen ID | Screen | Offline |
|-----|-----------|--------|---------|
| `/field-mode/canvass/[shiftId]` | CANV-007 | Field Mode — Shift Start | Yes |
| `/field-mode/canvass/[shiftId]/list` | CANV-008 | Field Mode — Walk List View | Yes |
| `/field-mode/canvass/[shiftId]/map` | CANV-009 | Field Mode — Map View | Yes |
| `/field-mode/canvass/[shiftId]/door/[voterId]` | CANV-010 | Field Mode — Door Card | Yes |
| `/field-mode/canvass/[shiftId]/door/[voterId]/interact` | CANV-011 | Field Mode — Interaction Form | Yes |
| `/field-mode/canvass/[shiftId]/debrief` | CANV-012 | Field Mode — Shift End / Debrief | Partial |
| `/field-mode/phone-bank/[sessionId]` | PHONE-004, PHONE-005 | Phone Bank — Call Interface | No |
| `/field-mode/phone-bank/[sessionId]/result` | PHONE-006 | Phone Bank — Call Result Form | No |
| `/field-mode/voter-reg/[sessionId]` | VREG-004 | Voter Registration Form | Yes |
| `/field-mode/voter-reg/[sessionId]/eligibility` | VREG-005 | Eligibility Check | Yes |
| `/field-mode/gotv/[shiftId]` | GOTV-009 | GOTV Walk List | Yes |
| `/field-mode/gotv/[shiftId]/door/[voterId]` | GOTV-008 | GOTV Door Card | Yes |
| `/field-mode/gotv/[shiftId]/chase/[voterId]` | GOTV-010 | Chase Call Interface | No |

**Notes:**
- Field mode URLs contain the shift/session ID so that a crashed app can resume exactly where the user left off.
- The canvassing field mode is the most complex — it supports list view, map view, and individual door cards. The volunteer navigates linearly through the walk list but can switch between list and map views.
- Phone banking field mode does not work offline (requires call connectivity).
- GOTV field mode is a simplified variant of canvassing field mode with a GOTV-specific script and door card.

---

### Supporter Portal — `(portal)`

Minimal navigation shell for supporters. Separate layout from the main app — no sidebar, no staff features. Simple personal portal.

| URL | Screen ID | Screen | Offline |
|-----|-----------|--------|---------|
| `/portal` | SUP-001 | Supporter Home | No |
| `/portal/donations` | SUP-002 | Donation History | No |
| `/portal/donations/[donationId]` | SUP-003 | Donation Receipt View | No |
| `/portal/recurring` | SUP-004 | Recurring Donation Management | No |
| `/portal/payment-methods` | SUP-005 | Payment Method Update | No |
| `/portal/profile` | SUP-006 | Supporter Profile | No |
| `/portal/preferences` | SUP-007 | Communication Preferences | No |
| `/portal/events` | SUP-008 | My Events | No |
| `/portal/statements` | SUP-009 | Year-End Statement Download | No |

**Notes:**
- The supporter portal uses magic link authentication by default (low friction). Full account features (modifying recurring donations, updating payment methods) require passkey or email login.
- Portal routes are under `/portal` prefix to separate them from the main app namespace.

---

### Onboarding Wizards — `(wizard)`

Wizard shell replaces the sidebar with step indicators. Global chrome (header, sync, notifications) remains.

| URL | Screen ID | Screen | Offline |
|-----|-----------|--------|---------|
| `/wizard/org-setup` | WIZ-001 | Org Setup Wizard | No |
| `/wizard/payment-processor` | WIZ-002 | Payment Processor Wizard | No |
| `/wizard/byok` | WIZ-003 | BYOK Key Generation Wizard | No |
| `/wizard/compliance` | WIZ-004 | Compliance Configuration Wizard | No |
| `/wizard/whatsapp` | WIZ-005 | WhatsApp Business Setup Wizard | No |
| `/wizard/sms` | WIZ-006 | SMS Number Setup Wizard | No |
| `/wizard/voter-import` | WIZ-007 | Voter File Import Wizard | No |
| `/wizard/volunteer-onboarding` | WIZ-008 | Volunteer Onboarding Wizard | No |

**Notes:**
- Each wizard has internal step state managed by the component, not by URL segments. The URL stays at `/wizard/org-setup` throughout all steps — progress is tracked in the wizard component state and persisted server-side.
- `/wizard/volunteer-onboarding` is the only mobile-primary wizard. All others are desktop-preferred.
- Wizards can be exited and resumed. Navigating back to the wizard URL resumes at the last completed step.

---

## SvelteKit File Structure

The route hierarchy maps to SvelteKit's file system:

```
src/routes/
├── (public)/
│   ├── +layout.svelte              # Public page shell (minimal branding)
│   ├── p/[slug]/+page.svelte       # Candidate profile
│   ├── o/[slug]/+page.svelte       # Organization profile
│   ├── donate/[formId]/+page.svelte
│   ├── events/[eventId]/
│   │   ├── +page.svelte            # Public event page
│   │   └── rsvp/+page.svelte       # RSVP form
│   ├── action/[actionId]/+page.svelte
│   ├── petition/[petitionId]/+page.svelte
│   ├── volunteer/+page.svelte
│   └── media-kit/+page.svelte
│
├── (auth)/
│   ├── +layout.svelte              # Auth flow layout
│   ├── login/
│   │   ├── +page.svelte            # Passkey login
│   │   └── fallback/+page.svelte   # Magic link / SMS OTP
│   ├── recover/+page.svelte
│   ├── register/
│   │   ├── +page.svelte            # Passkey enrollment
│   │   └── trusted-contacts/+page.svelte
│   ├── authorize-device/+page.svelte
│   └── session-expired/+page.svelte
│
├── (app)/
│   ├── +layout.svelte              # Main app shell (header + sidebar + tabs)
│   ├── +layout.server.ts           # Auth guard, role resolution
│   ├── dashboard/
│   │   ├── +page.svelte            # Campaign overview (+ redirect logic)
│   │   ├── field/+page.svelte
│   │   ├── fundraising/+page.svelte
│   │   ├── communications/+page.svelte
│   │   ├── volunteers/+page.svelte
│   │   ├── data/+page.svelte
│   │   ├── compliance/+page.svelte
│   │   ├── war-room/+page.svelte
│   │   ├── team/+page.svelte
│   │   ├── candidate/+page.svelte
│   │   └── alliance/+page.svelte
│   ├── people/
│   │   ├── +page.svelte            # Contact list
│   │   ├── [contactId]/
│   │   │   ├── +page.svelte        # Contact detail
│   │   │   └── edit/+page.svelte
│   │   ├── new/+page.svelte
│   │   ├── segments/...
│   │   ├── dedup/...
│   │   ├── import/...
│   │   ├── export/+page.svelte
│   │   ├── data-quality/+page.svelte
│   │   └── tags/+page.svelte
│   ├── field/...                    # Field management
│   ├── fundraising/...              # Fundraising management
│   ├── communications/...           # Email, SMS
│   ├── social/...                   # Social media
│   ├── events/...                   # Event management
│   ├── activism/...                 # Activism campaigns
│   ├── press/...                    # Press & media
│   ├── gotv/...                     # GOTV operations
│   ├── messages/...                 # Messaging
│   ├── volunteers/...               # Volunteer management
│   ├── shifts/...                   # Volunteer self-service
│   ├── team/...                     # Team lead
│   ├── training/...                 # Training modules
│   ├── approvals/+page.svelte      # Candidate approvals
│   ├── alliance/...                 # Alliance management
│   ├── settings/...                 # Settings & admin
│   ├── help/...                     # Knowledge base & support
│   └── profile/...                  # User profile & preferences
│
├── (field-mode)/
│   ├── +layout.svelte              # Field mode shell (sync, timer, nav)
│   ├── +layout.server.ts           # Active shift guard
│   └── field-mode/
│       ├── canvass/[shiftId]/...
│       ├── phone-bank/[sessionId]/...
│       ├── voter-reg/[sessionId]/...
│       └── gotv/[shiftId]/...
│
├── (portal)/
│   ├── +layout.svelte              # Supporter portal shell
│   └── portal/...
│
└── (wizard)/
    ├── +layout.svelte              # Wizard shell (step indicators)
    └── wizard/...
```

## Routing Patterns

### Auth Guards

All routes in `(app)`, `(field-mode)`, and `(wizard)` require authentication, enforced by `+layout.server.ts` at the group level:

- **Unauthenticated request** → redirect to `/login` with `?redirect=` parameter
- **Authenticated but wrong role** → 404 (not 403 — restricted features are invisible)
- **Authenticated but no active shift (field mode)** → redirect to `/shifts`

### Home Screen Redirect

`/` redirects based on user role:
- Staff roles → their role-specific dashboard
- Volunteer / Team Lead → `/shifts`
- Candidate → `/dashboard/candidate`
- Supporter → `/portal`

### Deep Linking

All screens are deep-linkable by design. Field mode preserves the exact position in a walk list via URL (`/field-mode/canvass/[shiftId]/door/[voterId]`), enabling crash recovery and device handoff.

### Offline-Capable Routes

Routes marked as offline-capable use a service worker to cache the page shell and a local SQLite database (via Capacitor) for data. The SvelteKit `+page.ts` load function detects connectivity and switches between server fetch and local DB queries:

- **Online:** Standard server-side data loading
- **Offline:** Load from local SQLite, display "Offline" badge, queue writes for sync

Offline-capable routes: all `(field-mode)` canvassing/voter-reg/gotv routes, `/events/[eventId]/check-in`, `/messages` (read-only), `/shifts` (cached), `/training` (cached modules).

### RTL URL Behavior

URLs are not affected by RTL mode — paths remain LTR regardless of UI language. The `lang` attribute on `<html>` and CSS logical properties handle the visual layout flip. No URL changes needed for RTL support.

### Public vs. Authenticated Event Pages

Events have two URL patterns:
- `/events/[eventId]` (public, in `(public)` group) — the shareable public page
- `/events/[eventId]/manage` (authenticated, in `(app)` group) — the management view

SvelteKit resolves this via layout group precedence: the `(public)` group's `/events/[eventId]` route exists only as the public page. Authenticated event management routes include the `/manage`, `/rsvps`, `/check-in`, `/metrics` suffixes to avoid collision.

## Open Questions

1. **Vanity URLs for public profiles.** Should tenants be able to configure custom slugs for their candidate/org profile pages (e.g., `/maria-santos` instead of `/p/maria-santos`)? This would require a catch-all route that checks for vanity slugs before falling through to 404.

2. **API route namespace.** The SvelteKit API routes (server endpoints) should be prefixed to avoid collision with page routes. Likely `/api/v1/...` — but this overlaps with the public REST API mentioned in the architecture doc. Needs alignment between the SvelteKit server routes and the standalone API.

3. **Localized URLs.** Should URL paths be localized (e.g., `/personas` instead of `/people` in Spanish, `/contacts` in French)? Most internationalized apps keep English URLs with localized content — simpler implementation, consistent deep linking. But some jurisdictions may have requirements around language in official URLs.

<!-- REVISIT: The public event page routing needs careful implementation to avoid conflicts between the (public) and (app) groups. SvelteKit's route resolution rules may require a different approach — potentially using a route matcher or a single events route with conditional layout selection based on auth state. -->
<!-- REVISIT: Field mode URL structure assumes shift IDs are URL-safe. If using UUIDs, this is fine. If using sequential IDs, consider slug-based alternatives for readability. -->
