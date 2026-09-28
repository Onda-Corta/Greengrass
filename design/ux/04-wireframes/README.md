# Wireframes

## Contents

| Directory | Document | Description |
|-----------|----------|-------------|
| `navigation-shell/` | `navigation-shell.md` | Desktop shell (sidebar expanded/collapsed, detail panel, notification drawer), mobile shell (all persona tab bars, hamburger menu, "More" bottom sheet), field mode shell, wizard shell, supporter portal shell. RTL variants. Responsive transitions. |
| `dashboards/` | `dashboards.md` | All 11 dashboards: Campaign Overview, Field Operations, Fundraising, Communications, Volunteer, Data Quality, Compliance, GOTV War Room, Team Lead, Candidate, Alliance (cross-ref). Empty and loading states. |
| `field-mode/` | `field-mode.md` | Complete shift lifecycle: start flow, walk list, door card (canvassing + GOTV), phone bank variant, voter registration, map view, end shift + debrief, crash recovery. Touch target specs. |
| `onboarding/` | `onboarding.md` | Org Setup wizard (5 steps), Volunteer Onboarding (4 steps), BYOK Key Generation wizard (critical security flow). Post-wizard checklist. |
| `messaging/` | `messaging.md` | Desktop split view, mobile conversation list + thread, compose flow, candidate briefings, approval requests, War Room channel (election day), offline messaging, encryption indicators. |
| `supporter/` | `supporter-portal.md` | Public donation page (pre-auth), donation confirmation, portal home, donation history + recurring management, events + RSVP, preferences, public event page. |
| `alliance/` | `alliance.md` | Alliance Dashboard (aggregate + per-org), Member List, Affiliation Request Form + Queue, Sharing Configuration, Joint Campaign Setup wizard, Shared Analytics, GOTV Alliance Coordination. Empty states. |
| `crm/` | `crm.md` | Contact List/Detail/Create-Edit, Segment Builder + List, Dedup Review Queue + Side-by-Side Comparison, Data Import Wizard (4 steps), Import History, Data Export, Data Quality Report, Tag Management. Empty states. |
| `field-ops/` | `field-ops.md` | Canvassing: Campaign List/Create-Edit, Script Builder, Turf Management Map, Turf Auto-Generation, Walk List Management, Results Review, Progress Map. Phone Banking: Campaign List/Create-Edit, Script Builder, Progress Dashboard. Voter Registration: Drive List/Create-Edit, Jurisdiction Template Selector, Results Review. Empty states. |
| `fundraising/` | `fundraising.md` | Donation List/Detail, Donation Form Builder + Preview + Embed Config, Fundraising Campaign List/Create-Edit, Recurring Donation Management, Pledge Management, Refund Processing, Cash Donation Recording + Reconciliation, Compliance Flag Review, A/B Test Setup + Results, Alliance Split Configuration + Report, Payment Processor Configuration, Year-End Statement Generator. Empty states. |
| `communications/` | `communications.md` | Email Campaign List/Builder, Email Template Builder + Library, SMS/WhatsApp Composer (channel toggle, character counter, quick replies), Communication Analytics (cross-channel), Consent Management (channel × purpose matrix, expiry tracking), Communication Preferences (frequency caps, quiet hours, disclaimers, sender identities), Unsubscribe Management, Email Sending Domain Config (DNS verification). Empty states. |
| `social-media/` | `social-media.md` | Social Media Dashboard (connected accounts, scheduled/recent posts), Post Composer (multi-platform with overrides, character counters, media, compliance), Post Calendar (month/week/list views, drag-to-reschedule), Post Analytics (per-post + aggregate, per-platform breakdown, best posting times), Social Account Connection (OAuth, token management), Platform-Specific Preview (side-by-side). Empty states. |
| `events/` | `events.md` | Event List (persona-adaptive admin/volunteer views), Event Create/Edit (in-person/virtual/hybrid, RSVP settings, staff assignment, promotion), Event Detail (admin + volunteer variants, post-event outcome view), RSVP Management (approval queue variant), Check-in Tool (offline-capable, QR scan, walk-in registration, touch-optimized), Event Metrics (attendance breakdown, RSVP source, check-in timeline, fundraising, CRM impact, event comparison), Virtual Event Setup (platform integration, unique links, recording), Post-Event Survey Builder (question types, results visualization). Empty states. |
| `press/` | `press.md` | Media Contact List/Detail (relationship tracking, interaction history, pitch success rate), Media List Management (dynamic + static lists), Press Release Builder (split-pane structured editor with embargo support, versioning), Press Release Preview + Distribution (media list selection, personalization, attachment), Media Advisory Builder (WHO/WHAT/WHEN/WHERE with event linking), Statement Builder (rapid-response with urgent flag, emergency bypass), Media Kit Management (public/gated assets, access tracking), Coverage Log + Analytics (sentiment, format, topic, pitch-to-coverage rate, journalist responsiveness), Endorsement Pipeline (Kanban stages, announcement trigger), Endorsement Detail (timeline, quote, photo), Talking Points Library (versioned, topic-organized, team sharing), Interview Schedule (requests, prep auto-assembly, outcome logging), Spokesperson Configuration (topic routing, press contact). Empty states. |
| `activism/` | `activism.md` | Activism Campaign List (letter/email, petition, public comment), Letter/Email Action Setup (target, talking points, template, AI config), Petition Setup (petition text, signature goal, signer fields), Public Comment Campaign Setup (regulatory body, deadline, submission method), Action Page — Public (mobile-first supporter flow with form and AI generation), Petition Page — Public (mobile-first signing with progress bar, recent signatures), AI Message Generation Preview (unique personalized message, review, edit, approve), Activism Campaign Analytics (actions over time, geographic distribution, per-supporter feed), Delivery Event Documentation (photos, outcome, press coverage linking). Empty states. |
| `gotv/` | `gotv.md` | GOTV Universe Builder (criteria builder, segment tiers, geographic preview), Early Voting Data Upload (file upload, column mapping, match preview), Volunteer Staging Setup (map + list, capacity tracking, supplies), GOTV Turf Cutting (map-based drawing, auto-generate, multi-pass scheduling), Election Day Comms Plan (wave timeline, auto/manual triggers, personalization, GOTV override), Poll Watcher Registry + Credential Tracking (registration status, jurisdiction requirements, credential documents), Ride Coordination Dispatcher (map + pending/driver split, smart matching, accessibility), Poll Watcher Issue Queue (severity-ordered, escalation routing, photo evidence), Turnout Dashboard Map + Segment views (heatmap, confidence-weighted data, target comparison), Reallocation Suggestions (human-in-the-loop approve/modify/reject), Election Night Results Entry + Dashboard (mobile-first entry, real-time aggregation, timeline, model comparison), Post-Election Analysis (turnout/operations/volunteers/model validation tabs), Staging Location Check-in (mobile-first, QR scan, 56px targets). Empty states. Cross-refs: DASH-008, GOTV field mode, ALLY-008. |
| `settings/` | `settings.md` | Org Profile & Branding (name, logo, colors, languages, preview), Role Template Editor (permission matrix by feature area, clone/reset), Permission Override Panel (per-user additive overrides with audit), Staff Management List (roles, status, bulk actions), Staff Invite Flow (email, role, geographic scope, permission preview), Geographic Scope Configuration (map + region list, jurisdiction level), Campaign Period Configuration (dates, election date, status), Compliance Configuration (jurisdiction, framework, enforced rules, enforcement behavior), Contribution Limits (per-type per-cycle limits, aggregation, over-limit behavior), Disclaimer Text (per-channel, translations), Data Retention Policy (per-type rules, post-campaign cleanup), Integration Settings Hub (card grid by category), WhatsApp/SMS/Email/Social integration detail screens, Billing & Subscription (plan, payment, history), Audit Trail Viewer (searchable, filterable, non-deletable, exportable), Security Settings (three tiers, MFA, session timeout, IP allowlist, incident response), Encryption Key Management (BYOK, Shamir shares, rotation, history), API Key Management (scoped keys, usage tracking), Webhook Configuration (event selection, delivery logs, test). Empty states. |
| `auth/` | `auth.md` | Login with Passkey (single CTA, <3 second biometric login, tenant-branded), Login Fallback (magic link with 15 min expiry + SMS OTP with 6-digit auto-submit, rate limiting), Account Recovery (trusted contact 2-of-3 approval, 24-hour cooling-off, old passkeys invalidated), Passkey Registration (guided enrollment, duress passkey option for Maximum tier), Trusted Contact Setup (2-5 contacts from same org), Device Authorization (QR code + manual code, approval from existing device), Session Expired (data preserved in local storage, re-auth variant). Edge case states. |
| `profile/` | `profile.md` | Personal Profile (name, avatar, phone, language, timezone, role info), Notification Preferences (channel × type matrix, quiet hours with GOTV override, email digest frequency), Security Settings — Personal (device list, trusted contacts, security checklist, duress passkey), Language Preference (instant-apply, RTL auto-flip, bilingual header), Tenant Switcher (org cards with role/last active, full context switch). Empty states. |
| `help/` | `help.md` | Knowledge Base Browser (full-text search, role-filtered, categories), Knowledge Base Article (formatted content with TOC, related articles, thumbs up/down, partial offline), AI Concierge Chat (context-aware, article + action links, desktop side panel / mobile full screen, escalation), Training Module List (volunteer progress view / admin completion matrix), Training Module Content (sequential lessons, offline caching), Training Quiz (one-at-a-time, pass/fail, retake, offline-capable), Certification Status (volunteer cards / admin cross-tab matrix, expiration tracking), Training Content Editor (lesson list, quiz editor, assignment, versioning). Empty states. |
| `public/` | `public.md` | Candidate Profile Page (short URL, photo/bio, endorsements, events, donate/volunteer CTAs, SEO), Organization Profile Page (mission, hero image, get involved CTAs, dynamic events + press), Volunteer Signup Page (minimal fields, interest checkboxes, CRM integration, consent opt-in), Media Kit Page (press contact, downloadable assets with optional gated access, download tracking). Cross-refs: PUB-003 Supporter Portal, PUB-004 Event Page, PUB-005 Action Page, PUB-006 Petition Page. Empty states. |
| `content-ops/` | `content-ops.md` | Content Dashboard (today's schedule with pipeline state, what waits on you, topics from talking points), Content Review (round history, comparison between rounds, required revision comments, escalation), Approval Queue (sorted by scheduled time, batch approval), Approval (current and previous round side by side; mobile). Redrawn from the review screens of a prototype built for managing content creators; the creator screens are not drawn. |

## Format

These wireframes are written as detailed ASCII specifications — implementation-ready screen descriptions with box-drawing wireframes, state definitions, interaction specs, and responsive behavior notes.

They serve as the bridge between the design system foundations (Phase 3) and visual design. Each document can be directly translated into high-fidelity mockups in Paper or Figma, or used as specs for component implementation.

## Reading Order

1. **Navigation shell first** — the global frame everything lives inside
2. **Dashboards** — each persona's home screen
3. **Field mode** — the highest-risk UX, most detailed wireframes
4. **Onboarding** — first impressions for new users
5. **Messaging** — internal coordination
6. **Supporter portal** — public-facing donor experience
7. **Alliance** — cross-org coordination and shared operations
8. **CRM / People** — the data layer everything else builds on
9. **Field operations (admin)** — planning, configuration, and review for canvassing, phone banking, and voter registration
10. **Fundraising (admin)** — donation management, form building, compliance, cash handling, alliance splits, payment processors
11. **Communications** — email campaigns, SMS/WhatsApp, templates, analytics, consent management
12. **Social media** — post composition, scheduling, analytics, account management
13. **Events** — event lifecycle, check-in, metrics, virtual events, post-event surveys
14. **Press & media** — media contacts, press content, coverage tracking, endorsements, talking points, interviews
15. **Activism** — letter/email actions with AI-generated messages, petitions, public comment campaigns, delivery documentation
16. **GOTV (admin)** — pre-election setup (universe, early voting, staging, turfs, comms plan, poll watchers), election day ops (turnout tracking, ride dispatch, issue queue, reallocation), election night (results entry + dashboard), post-election analysis
17. **Settings & admin** — org branding, roles & permissions, staff management, campaign config, compliance, integrations, billing, security, encryption keys, API keys, webhooks, audit trail
18. **Authentication** — passkey-first login, fallback (magic link, SMS OTP), account recovery via trusted contacts, passkey registration, device authorization, session management
19. **User profile** — personal settings, notification preferences, security (personal), language preference, tenant switching
20. **Support & help** — knowledge base, AI concierge chat, volunteer training modules with quizzes and certification, training content editor
21. **Public pages** — candidate profile, org profile, volunteer signup, media kit (plus cross-references to supporter portal, events, activism)
22. **Content operations** — the content pipeline: review in rounds, the approval queue, and final approval

## Cross-References

- Navigation structure: `01-information-architecture/navigation-model.md`
- Per-persona views: `01-information-architecture/persona-views.md`
- UI patterns: `02-global-patterns/pattern-catalog.md`
- Design tokens: `03-design-system/foundations.md`
- Component names: `03-design-system/component-inventory.md`
- Responsive behavior: `03-design-system/responsive-strategy.md`
- Audit report: `audit.md`

---

## Screen Index

Complete cross-reference of all 240 screen IDs from `screen-inventory.md` to their wireframe location.

**Status key:**
- **Complete** — Full wireframe under screen ID heading
- **Covered** — Wireframe content exists but without a screen ID heading (pre-normalization)
- **Cross-ref** — Wireframed in a different document than expected
- **Missing** — No wireframe content exists

### 1. Dashboards (11 screens)

| ID | Screen | Document | Status |
|----|--------|----------|--------|
| DASH-001 | Campaign Overview Dashboard | `dashboards/dashboards.md` | Complete |
| DASH-002 | Field Operations Dashboard | `dashboards/dashboards.md` | Complete |
| DASH-003 | Fundraising Dashboard | `dashboards/dashboards.md` | Complete |
| DASH-004 | Communications Dashboard | `dashboards/dashboards.md` | Complete |
| DASH-005 | Volunteer Dashboard | `dashboards/dashboards.md` | Complete |
| DASH-006 | Data Quality Dashboard | `dashboards/dashboards.md` | Complete |
| DASH-007 | Compliance Dashboard | `dashboards/dashboards.md` | Complete |
| DASH-008 | GOTV War Room Dashboard | `dashboards/dashboards.md` | Complete |
| DASH-009 | Team Lead Dashboard | `dashboards/dashboards.md` | Complete |
| DASH-010 | Candidate Dashboard | `dashboards/dashboards.md` | Complete |
| DASH-011 | Alliance Dashboard | `dashboards/dashboards.md` | Cross-ref → `alliance/alliance.md` ALLY-001 |

### 2. CRM / People (15 screens)

| ID | Screen | Document | Status |
|----|--------|----------|--------|
| CRM-001 | Contact List | `crm/crm.md` | Complete |
| CRM-002 | Contact Detail | `crm/crm.md` | Complete |
| CRM-003 | Contact Create/Edit | `crm/crm.md` | Complete |
| CRM-004 | Segment Builder | `crm/crm.md` | Complete |
| CRM-005 | Segment List | `crm/crm.md` | Complete |
| CRM-006 | Dedup Review Queue | `crm/crm.md` | Complete |
| CRM-007 | Dedup Side-by-Side Comparison | `crm/crm.md` | Complete |
| CRM-008 | Data Import Wizard — File Upload | `crm/crm.md` | Complete |
| CRM-009 | Data Import Wizard — Column Mapping | `crm/crm.md` | Complete |
| CRM-010 | Data Import Wizard — Dedup Preview | `crm/crm.md` | Complete |
| CRM-011 | Data Import Wizard — Confirmation | `crm/crm.md` | Complete |
| CRM-012 | Data Import History | `crm/crm.md` | Complete |
| CRM-013 | Data Export | `crm/crm.md` | Complete |
| CRM-014 | Data Quality Report | `crm/crm.md` | Complete |
| CRM-015 | Tag Management | `crm/crm.md` | Complete |

### 3. Canvassing (14 screens)

| ID | Screen | Document | Status |
|----|--------|----------|--------|
| CANV-001 | Canvassing Campaign List | `field-ops/field-ops.md` | Complete |
| CANV-002 | Canvassing Campaign Create/Edit | `field-ops/field-ops.md` | Complete |
| CANV-003 | Script Builder | `field-ops/field-ops.md` | Complete |
| CANV-004 | Turf Management Map | `field-ops/field-ops.md` | Complete |
| CANV-005 | Turf Auto-Generation | `field-ops/field-ops.md` | Complete |
| CANV-006 | Walk List Management | `field-ops/field-ops.md` | Complete |
| CANV-007 | Field Mode — Shift Start | `field-mode/field-mode.md` | Covered |
| CANV-008 | Field Mode — Walk List View | `field-mode/field-mode.md` | Covered |
| CANV-009 | Field Mode — Map View | `field-mode/field-mode.md` | Covered |
| CANV-010 | Field Mode — Door Card | `field-mode/field-mode.md` | Covered |
| CANV-011 | Field Mode — Interaction Form | `field-mode/field-mode.md` | Covered |
| CANV-012 | Field Mode — Shift End / Debrief | `field-mode/field-mode.md` | Covered |
| CANV-013 | Canvassing Results Review | `field-ops/field-ops.md` | Complete |
| CANV-014 | Canvassing Progress Map | `field-ops/field-ops.md` | Complete |

### 4. Phone Banking (7 screens)

| ID | Screen | Document | Status |
|----|--------|----------|--------|
| PHONE-001 | Phone Bank Campaign List | `field-ops/field-ops.md` | Complete |
| PHONE-002 | Phone Bank Campaign Create/Edit | `field-ops/field-ops.md` | Complete |
| PHONE-003 | Phone Bank Script Builder | `field-ops/field-ops.md` | Complete |
| PHONE-004 | Phone Bank — Call Interface (BYOP) | `field-mode/field-mode.md` | Covered |
| PHONE-005 | Phone Bank — Call Interface (Integrated) | `field-mode/field-mode.md` | Covered |
| PHONE-006 | Phone Bank — Call Result Form | `field-mode/field-mode.md` | Covered |
| PHONE-007 | Phone Bank Progress Dashboard | `field-ops/field-ops.md` | Complete |

### 5. Voter Registration (6 screens)

| ID | Screen | Document | Status |
|----|--------|----------|--------|
| VREG-001 | Voter Reg Drive List | `field-ops/field-ops.md` | Complete |
| VREG-002 | Voter Reg Drive Create/Edit | `field-ops/field-ops.md` | Complete |
| VREG-003 | Voter Reg Jurisdiction Template Selector | `field-ops/field-ops.md` | Complete |
| VREG-004 | Field Mode — Voter Registration Form | `field-mode/field-mode.md` | Covered |
| VREG-005 | Field Mode — Eligibility Check | `field-mode/field-mode.md` | Covered |
| VREG-006 | Voter Reg Results Review | `field-ops/field-ops.md` | Complete |

### 6. Fundraising (20 screens)

| ID | Screen | Document | Status |
|----|--------|----------|--------|
| FUND-001 | Donation List | `fundraising/fundraising.md` | Complete |
| FUND-002 | Donation Detail | `fundraising/fundraising.md` | Complete |
| FUND-003 | Donation Form Builder | `fundraising/fundraising.md` | Complete |
| FUND-004 | Donation Form Preview | `fundraising/fundraising.md` | Complete |
| FUND-005 | Donation Form — Public (Hosted) | `fundraising/fundraising.md` | Cross-ref → `supporter/supporter-portal.md` |
| FUND-006 | Donation Form — Embed Config | `fundraising/fundraising.md` | Complete |
| FUND-007 | Recurring Donation Management | `fundraising/fundraising.md` | Complete |
| FUND-008 | Pledge Management | `fundraising/fundraising.md` | Complete |
| FUND-009 | Refund Processing | `fundraising/fundraising.md` | Complete |
| FUND-010 | Cash Donation Recording | `fundraising/fundraising.md` | Complete |
| FUND-011 | Cash Reconciliation | `fundraising/fundraising.md` | Complete |
| FUND-012 | Compliance Flag Review | `fundraising/fundraising.md` | Complete |
| FUND-013 | A/B Test Setup | `fundraising/fundraising.md` | Complete |
| FUND-014 | A/B Test Results | `fundraising/fundraising.md` | Complete |
| FUND-015 | Alliance Split Configuration | `fundraising/fundraising.md` | Complete |
| FUND-016 | Alliance Fundraising Report | `fundraising/fundraising.md` | Complete |
| FUND-017 | Payment Processor Configuration | `fundraising/fundraising.md` | Complete |
| FUND-018 | Fundraising Campaign List | `fundraising/fundraising.md` | Complete |
| FUND-019 | Fundraising Campaign Create/Edit | `fundraising/fundraising.md` | Complete |
| FUND-020 | Year-End Statement Generator | `fundraising/fundraising.md` | Complete |

### 7. Communications (10 screens)

| ID | Screen | Document | Status |
|----|--------|----------|--------|
| COMM-001 | Email Campaign List | `communications/communications.md` | Complete |
| COMM-002 | Email Campaign Builder | `communications/communications.md` | Complete |
| COMM-003 | Email Template Builder | `communications/communications.md` | Complete |
| COMM-004 | Email Template Library | `communications/communications.md` | Complete |
| COMM-005 | SMS/WhatsApp Composer | `communications/communications.md` | Complete |
| COMM-006 | Communication Analytics | `communications/communications.md` | Complete |
| COMM-007 | Consent Management | `communications/communications.md` | Complete |
| COMM-008 | Communication Preferences (Staff) | `communications/communications.md` | Complete |
| COMM-009 | Unsubscribe Management | `communications/communications.md` | Complete |
| COMM-010 | Email Sending Domain Config | `communications/communications.md` | Complete |

### 8. Social Media (6 screens)

| ID | Screen | Document | Status |
|----|--------|----------|--------|
| SOCIAL-001 | Social Media Dashboard | `social-media/social-media.md` | Complete |
| SOCIAL-002 | Post Composer (Multi-platform) | `social-media/social-media.md` | Complete |
| SOCIAL-003 | Post Calendar / Schedule | `social-media/social-media.md` | Complete |
| SOCIAL-004 | Post Analytics | `social-media/social-media.md` | Complete |
| SOCIAL-005 | Social Account Connection | `social-media/social-media.md` | Complete |
| SOCIAL-006 | Platform-Specific Preview | `social-media/social-media.md` | Complete |

### 9. Events (10 screens)

| ID | Screen | Document | Status |
|----|--------|----------|--------|
| EVT-001 | Event List | `events/events.md` | Complete |
| EVT-002 | Event Create/Edit | `events/events.md` | Complete |
| EVT-003 | Event Detail | `events/events.md` | Complete |
| EVT-004 | Event RSVP Management | `events/events.md` | Complete |
| EVT-005 | Event Check-in Tool | `events/events.md` | Complete |
| EVT-006 | Event RSVP Form (Public) | `events/events.md` | Complete |
| EVT-007 | Event Page (Public) | `events/events.md` | Complete |
| EVT-008 | Event Metrics | `events/events.md` | Complete |
| EVT-009 | Virtual Event Setup | `events/events.md` | Complete |
| EVT-010 | Post-Event Survey Builder | `events/events.md` | Complete |

### 10. Activism (9 screens)

| ID | Screen | Document | Status |
|----|--------|----------|--------|
| ACT-001 | Activism Campaign List | `activism/activism.md` | Complete |
| ACT-002 | Letter/Email Action Setup | `activism/activism.md` | Complete |
| ACT-003 | Petition Setup | `activism/activism.md` | Complete |
| ACT-004 | Public Comment Campaign Setup | `activism/activism.md` | Complete |
| ACT-005 | Action Page (Public) | `activism/activism.md` | Complete |
| ACT-006 | Petition Page (Public) | `activism/activism.md` | Complete |
| ACT-007 | AI Message Generation Preview | `activism/activism.md` | Complete |
| ACT-008 | Activism Campaign Analytics | `activism/activism.md` | Complete |
| ACT-009 | Delivery Event Documentation | `activism/activism.md` | Complete |

### 11. Press & Media (16 screens)

| ID | Screen | Document | Status |
|----|--------|----------|--------|
| PRESS-001 | Media Contact List | `press/press.md` | Complete |
| PRESS-002 | Media Contact Detail | `press/press.md` | Complete |
| PRESS-003 | Media List Management | `press/press.md` | Complete |
| PRESS-004 | Press Release Builder | `press/press.md` | Complete |
| PRESS-005 | Press Release Preview | `press/press.md` | Complete |
| PRESS-006 | Press Release Distribution | `press/press.md` | Complete |
| PRESS-007 | Media Advisory Builder | `press/press.md` | Complete |
| PRESS-008 | Statement Builder | `press/press.md` | Complete |
| PRESS-009 | Media Kit Management | `press/press.md` | Complete |
| PRESS-010 | Coverage Log | `press/press.md` | Complete |
| PRESS-011 | Coverage Analytics | `press/press.md` | Complete |
| PRESS-012 | Endorsement Pipeline | `press/press.md` | Complete |
| PRESS-013 | Endorsement Detail | `press/press.md` | Complete |
| PRESS-014 | Talking Points Library | `press/press.md` | Complete |
| PRESS-015 | Interview Schedule | `press/press.md` | Complete |
| PRESS-016 | Spokesperson Configuration | `press/press.md` | Complete |

### 12. GOTV & Election Day (23 screens)

| ID | Screen | Document | Status |
|----|--------|----------|--------|
| GOTV-001 | GOTV Universe Builder | `gotv/gotv.md` | Complete |
| GOTV-002 | Early Voting Data Upload | `gotv/gotv.md` | Complete |
| GOTV-003 | Volunteer Staging Setup | `gotv/gotv.md` | Complete |
| GOTV-004 | GOTV Turf Cutting | `gotv/gotv.md` | Complete |
| GOTV-005 | Election Day Comms Plan | `gotv/gotv.md` | Complete |
| GOTV-006 | Poll Watcher Registry | `gotv/gotv.md` | Complete |
| GOTV-007 | Poll Watcher Credential Tracking | `gotv/gotv.md` | Complete |
| GOTV-008 | Field Mode — GOTV Door Card | `field-mode/field-mode.md` | Covered |
| GOTV-009 | Field Mode — GOTV Walk List | `field-mode/field-mode.md` | Covered |
| GOTV-010 | Chase Call Interface | `gotv/gotv.md` | Complete |
| GOTV-011 | Ride Request Form | `gotv/gotv.md` | Complete |
| GOTV-012 | Ride Coordination — Dispatcher View | `gotv/gotv.md` | Complete |
| GOTV-013 | Ride Coordination — Driver View | `gotv/gotv.md` | Complete |
| GOTV-014 | Poll Watcher Check-in | `gotv/gotv.md` | Complete |
| GOTV-015 | Poll Watcher Issue Report Form | `gotv/gotv.md` | Complete |
| GOTV-016 | Poll Watcher Issue Queue | `gotv/gotv.md` | Complete |
| GOTV-017 | Turnout Dashboard — Map View | `gotv/gotv.md` | Complete |
| GOTV-018 | Turnout Dashboard — Segment View | `gotv/gotv.md` | Complete |
| GOTV-019 | Reallocation Suggestions | `gotv/gotv.md` | Complete |
| GOTV-020 | Election Night Results Entry | `gotv/gotv.md` | Complete |
| GOTV-021 | Election Night Results Dashboard | `gotv/gotv.md` | Complete |
| GOTV-022 | Post-Election Analysis | `gotv/gotv.md` | Complete |
| GOTV-023 | Staging Location Check-in | `gotv/gotv.md` | Complete |

### 13. Messaging (14 screens)

| ID | Screen | Document | Status |
|----|--------|----------|--------|
| MSG-001 | Message List (Inbox) | `messaging/messaging.md` | Covered |
| MSG-002 | Conversation View (DM) | `messaging/messaging.md` | Covered |
| MSG-003 | Conversation View (Group) | `messaging/messaging.md` | Covered |
| MSG-004 | Thread View | `messaging/messaging.md` | Covered |
| MSG-005 | Group Create/Edit | `messaging/messaging.md` | Covered |
| MSG-006 | Broadcast Composer | `messaging/messaging.md` | Covered |
| MSG-007 | War Room Channel | `messaging/messaging.md` | Covered |
| MSG-008 | Contextual Thread (Event) | `messaging/messaging.md` | Covered |
| MSG-009 | Contextual Thread (Shift) | `messaging/messaging.md` | Covered |
| MSG-010 | Contextual Thread (Issue) | `messaging/messaging.md` | Covered |
| MSG-011 | Contextual Thread (Donation Flag) | `messaging/messaging.md` | Covered |
| MSG-012 | Candidate Briefing View | `messaging/messaging.md` | Covered |
| MSG-013 | Candidate Approval Queue | `messaging/messaging.md` | Covered |
| MSG-014 | Alliance Channel | `messaging/messaging.md` | Covered |

### 14. Settings & Administration (22 screens)

| ID | Screen | Document | Status |
|----|--------|----------|--------|
| SET-001 | Org Profile & Branding | `settings/settings.md` | Complete |
| SET-002 | Role Template Editor | `settings/settings.md` | Complete |
| SET-003 | Permission Override Panel | `settings/settings.md` | Complete |
| SET-004 | Staff Management List | `settings/settings.md` | Complete |
| SET-005 | Staff Invite Flow | `settings/settings.md` | Complete |
| SET-006 | Geographic Scope Configuration | `settings/settings.md` | Complete |
| SET-007 | Campaign Period Configuration | `settings/settings.md` | Complete |
| SET-008 | Compliance Configuration | `settings/settings.md` | Complete |
| SET-009 | Contribution Limits Configuration | `settings/settings.md` | Complete |
| SET-010 | Disclaimer Text Configuration | `settings/settings.md` | Complete |
| SET-011 | Data Retention Policy | `settings/settings.md` | Complete |
| SET-012 | Integration Settings Hub | `settings/settings.md` | Complete |
| SET-013 | WhatsApp Business Setup | `settings/settings.md` | Complete |
| SET-014 | SMS Provider Configuration | `settings/settings.md` | Complete |
| SET-015 | Email Domain Configuration | `settings/settings.md` | Complete |
| SET-016 | Social Media Account Connections | `settings/settings.md` | Complete |
| SET-017 | Billing & Subscription | `settings/settings.md` | Complete |
| SET-018 | Audit Trail Viewer | `settings/settings.md` | Complete |
| SET-019 | Security Settings | `settings/settings.md` | Complete |
| SET-020 | Encryption Key Management | `settings/settings.md` | Complete |
| SET-021 | API Key Management | `settings/settings.md` | Complete |
| SET-022 | Webhook Configuration | `settings/settings.md` | Complete |

### 15. Onboarding Wizards (8 screens)

| ID | Screen | Document | Status |
|----|--------|----------|--------|
| WIZ-001 | Org Setup Wizard | `onboarding/onboarding.md` | Covered |
| WIZ-002 | Payment Processor Wizard | `onboarding/onboarding.md` | Complete |
| WIZ-003 | BYOK Key Generation Wizard | `onboarding/onboarding.md` | Covered |
| WIZ-004 | Compliance Configuration Wizard | `onboarding/onboarding.md` | Complete |
| WIZ-005 | WhatsApp Business Setup Wizard | `onboarding/onboarding.md` | Complete |
| WIZ-006 | SMS Number Setup Wizard | `onboarding/onboarding.md` | Complete |
| WIZ-007 | Voter File Import Wizard | `onboarding/onboarding.md` | Complete |
| WIZ-008 | Volunteer Onboarding Wizard | `onboarding/onboarding.md` | Covered |

### 16. Support & Help (8 screens)

| ID | Screen | Document | Status |
|----|--------|----------|--------|
| HELP-001 | Knowledge Base Browser | `help/help.md` | Complete |
| HELP-002 | Knowledge Base Article | `help/help.md` | Complete |
| HELP-003 | AI Concierge Chat | `help/help.md` | Complete |
| HELP-004 | Training Module List | `help/help.md` | Complete |
| HELP-005 | Training Module Content | `help/help.md` | Complete |
| HELP-006 | Training Quiz | `help/help.md` | Complete |
| HELP-007 | Certification Status | `help/help.md` | Complete |
| HELP-008 | Training Content Editor | `help/help.md` | Complete |

### 17. Supporter Portal (9 screens)

| ID | Screen | Document | Status |
|----|--------|----------|--------|
| SUP-001 | Supporter Home | `supporter/supporter-portal.md` | Covered |
| SUP-002 | Donation History | `supporter/supporter-portal.md` | Covered |
| SUP-003 | Donation Receipt View | `supporter/supporter-portal.md` | Complete |
| SUP-004 | Recurring Donation Management | `supporter/supporter-portal.md` | Covered |
| SUP-005 | Payment Method Update | `supporter/supporter-portal.md` | Complete |
| SUP-006 | Supporter Profile | `supporter/supporter-portal.md` | Complete |
| SUP-007 | Communication Preferences | `supporter/supporter-portal.md` | Complete |
| SUP-008 | My Events | `supporter/supporter-portal.md` | Covered |
| SUP-009 | Year-End Statement Download | `supporter/supporter-portal.md` | Complete |

### 18. Alliance (8 screens)

| ID | Screen | Document | Status |
|----|--------|----------|--------|
| ALLY-001 | Alliance Dashboard | `alliance/alliance.md` | Complete |
| ALLY-002 | Alliance Member List | `alliance/alliance.md` | Complete |
| ALLY-003 | Affiliation Request Form | `alliance/alliance.md` | Complete |
| ALLY-004 | Affiliation Request Queue | `alliance/alliance.md` | Complete |
| ALLY-005 | Sharing Configuration | `alliance/alliance.md` | Complete |
| ALLY-006 | Joint Campaign Setup | `alliance/alliance.md` | Complete |
| ALLY-007 | Shared Analytics | `alliance/alliance.md` | Complete |
| ALLY-008 | GOTV Alliance Coordination | `alliance/alliance.md` | Complete |

### 19. Public Pages (8 screens)

| ID | Screen | Document | Status |
|----|--------|----------|--------|
| PUB-001 | Candidate Profile Page | `public/public.md` | Complete |
| PUB-002 | Organization Profile Page | `public/public.md` | Complete |
| PUB-003 | Donation Form (Hosted) | `supporter/supporter-portal.md` | Cross-ref → `fundraising/fundraising.md` FUND-005 |
| PUB-004 | Event Page | `events/events.md` | Cross-ref → EVT-006, EVT-007 |
| PUB-005 | Action Page (Letter/Email) | `activism/activism.md` | Cross-ref → ACT-005 |
| PUB-006 | Petition Page | `activism/activism.md` | Cross-ref → ACT-006 |
| PUB-007 | Volunteer Signup Page | `public/public.md` | Complete |
| PUB-008 | Media Kit Page | `public/public.md` | Complete |

### 20. Authentication (7 screens)

| ID | Screen | Document | Status |
|----|--------|----------|--------|
| AUTH-001 | Login (Passkey) | `auth/auth.md` | Complete |
| AUTH-002 | Login Fallback (Magic Link / SMS OTP) | `auth/auth.md` | Complete |
| AUTH-003 | Account Recovery (Trusted Contact) | `auth/auth.md` | Complete |
| AUTH-004 | Passkey Registration | `auth/auth.md` | Complete |
| AUTH-005 | Trusted Contact Setup | `auth/auth.md` | Complete |
| AUTH-006 | Device Authorization | `auth/auth.md` | Complete |
| AUTH-007 | Session Expired / Re-authenticate | `auth/auth.md` | Complete |

### 21. User Profile & Preferences (5 screens)

| ID | Screen | Document | Status |
|----|--------|----------|--------|
| PROF-001 | Personal Profile | `profile/profile.md` | Complete |
| PROF-002 | Notification Preferences | `profile/profile.md` | Complete |
| PROF-003 | Security Settings (Personal) | `profile/profile.md` | Complete |
| PROF-004 | Language Preference | `profile/profile.md` | Complete |
| PROF-005 | Tenant Switcher | `profile/profile.md` | Complete |

### 22. Content Operations (4 screens)

| ID | Screen | Document | Status |
|----|--------|----------|--------|
| CONTENT-001 | Content Dashboard | `content-ops/content-ops.md` | Complete |
| CONTENT-002 | Content Review | `content-ops/content-ops.md` | Complete |
| CONTENT-003 | Approval Queue | `content-ops/content-ops.md` | Complete |
| CONTENT-004 | Approval | `content-ops/content-ops.md` | Complete |

### Summary

| Status | Count |
|--------|-------|
| Complete | 200 |
| Covered (no ID heading) | 25 |
| Cross-ref | 5 |
| Missing | 0 |
| Navigation shell (no screen IDs) | 10 variants |
| **Total** | **240** |

The 10 navigation shell variants (desktop expanded/collapsed, detail panel, notification drawer, RTL, mobile standard, field mode, wizard, supporter portal, mobile "More") are not assigned screen IDs in the inventory — they are structural shells, not screens.
