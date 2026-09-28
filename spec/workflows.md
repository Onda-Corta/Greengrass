# Core Workflows

## Overview

This document defines the core user journeys through the GreenGrass platform. Each workflow maps a real-world campaign activity to a sequence of platform interactions, identifying who's involved, what happens at each step, and where key design decisions arise.

Workflows are organized by campaign function, not by feature. A single workflow may touch multiple platform features (CRM, comms, events, analytics).

### Cross-cutting concerns

Several constraints apply to all workflows:

- **Offline capability:** Which steps must work without connectivity? (See offline section per workflow)
- **Mobile-first:** Every workflow must be usable on a phone. Desktop is the enhanced experience, not the primary one.
- **Multilingual:** All user-facing content and interfaces must support the tenant's configured languages.
- **Audit trail:** Every data-mutating step is logged (decided in security.md).

---

## 1. Tenant Onboarding

The journey from "we want to use GreenGrass" to "we're running our campaign on it."

### Actors
- **Org founder** — the person setting up the tenant (campaign manager, party leader, candidate)
- **Platform Admin** — GreenGrass team (provisioning, support)

### Flow

```
1. Org founder signs up on GreenGrass website
2. Select entity type: Party/Org, Candidate, or Alliance
   a. If Alliance: choose the default billing mode for members' central services —
      member_pays (default) or alliance_pays (ADR-019). Shown to each member on affiliation.
3. Choose hosting tier (standard / enhanced / maximum) and data residency country
4. Choose encryption model (BYOK default, managed keys opt-in)
5. Platform Admin provisions the tenant
6. Org founder completes Org Admin onboarding:
   a. Set up passkey
   b. Configure org profile (name, branding, languages)
   c. Invite initial staff members
   d. Configure payment processor(s) for fundraising
   e. Import initial data (voter file, existing supporter list) — or start fresh
7. Org Admin sets up role templates (use defaults or customize)
8. Org Admin configures privacy and visibility settings
9. Tenant is live
```

### Decision points

**DECIDED:** Fully automated, self-serve.

Sign up, configure, provision, go — no human in the loop. The platform handles tenant provisioning end-to-end: infrastructure spin-up, database creation, encryption key setup (BYOK flow or managed), and initial configuration.

This is architecturally ambitious given per-country data residency and single-tenant isolation, but it's the right target. The provisioning pipeline must be reliable enough to create isolated tenants in the correct country on demand.

**DECIDED:** Alliance billing mode is an onboarding setting ([ADR-019](../decisions/019-central-services-and-metered-billing.md)).

An alliance chooses at setup whether it pays the metered central-service costs its members incur (`alliance_pays`) or each member pays its own (`member_pays`, the default). Every affiliation request shows the member which mode applies before the member accepts. Changing the mode on a live affiliation requires the Org Admins of both the alliance and the member. Paying does not grant the alliance any view of the member's data or queries; it receives the statement only.

<!-- REVISIT: The provisioning automation pipeline is a major piece of infrastructure work. Needs detailed treatment in the architecture spec — orchestration, country-specific hosting providers, failure handling, rollback. Early phases (alpha/pilot) may use a simpler pipeline with guardrails while full automation is built out. -->

### Offline capability
- None required. Onboarding requires connectivity.

---

## 2. Volunteer Onboarding

The journey from "I want to help" to "I'm ready to canvass."

### Actors
- **Prospective volunteer** — person signing up
- **Volunteer Coordinator** — staff member managing volunteers
- **Team Lead** — (optional) field leader the volunteer is assigned to

### Flow

```
1. Prospective volunteer finds the campaign (website, social media, event, word of mouth)
2. Signs up through a public-facing volunteer form
   a. Provides basic info (name, phone, email, language preference, location)
   b. Indicates availability and interests (canvassing, phone banking, events, etc.)
3. System creates a platform identity (or links to existing one if they're already in the system)
4. System checks for dedup against existing CRM records
   a. If match found → link to existing record, add volunteer facet
   b. If no match → create new record
5. Volunteer Coordinator reviews and approves the signup (or auto-approve if org configured)
6. Volunteer receives onboarding:
   a. Set up passkey (primary) or fallback auth
   b. Designate trusted contact(s) for account recovery
   c. Brief orientation (platform tour, what to expect)
   d. Assign to team and/or geographic scope
7. Volunteer appears on the Volunteer Coordinator's roster
8. Volunteer can now:
   a. View available shifts and events
   b. Sign up for shifts
   c. Access training materials
   d. See their team and Team Lead (if visibility enabled)
```

### Decision points

**DECIDED:** Configurable per tenant.

Each org sets their own volunteer approval policy:
- **Auto-approve** — volunteers are immediately active after signup. Fastest onboarding, good for low-threat environments.
- **Require approval** — Volunteer Coordinator reviews and approves each signup before the volunteer gets platform access. Appropriate for high-threat environments or orgs concerned about infiltration.

The default can be set at the org level, with the option to override per signup channel (e.g., auto-approve referrals from existing volunteers, require approval for cold signups).

**DECIDED:** Full onboarding module.

The platform provides a built-in onboarding and training system:
- **Platform walkthrough** — interactive tour of the tools the volunteer will use (canvassing app, phone banking, event RSVP, etc.)
- **Org-customizable content** — the org can add their own training materials (campaign messaging, local context, do's and don'ts, safety protocols)
- **Quizzes and checkpoints** — knowledge checks to confirm the volunteer understands the tools and the campaign's expectations
- **Certification gates** — orgs can require completion of specific training modules before a volunteer can access field tools (e.g., must complete canvassing training before being assigned a walk list)
- **Training materials cached for offline viewing** after initial download

<!-- REVISIT: Training module content management (how orgs author and organize training content), progress tracking, and whether training completion feeds into the volunteer's CRM record should be detailed in the UX spec. -->

### Offline capability
- Signup requires connectivity.
- Post-onboarding, training materials could be cached for offline viewing.

---

## 3. Canvassing (Door-to-Door Outreach)

The core field operation. This is the workflow with the strongest offline requirements and the most complex data flow.

### Actors
- **Field Director** — plans and oversees the canvassing operation
- **Volunteer Coordinator** — manages volunteer scheduling
- **Team Lead** — leads a small group in the field
- **Volunteer (canvasser)** — knocks doors, records interactions
- **Voter/Constituent** — the person being contacted

### Pre-operation (staff, requires connectivity)

```
1. Field Director defines a canvassing campaign:
   a. Select target geography (precinct, neighborhood, turf)
   b. Define canvassing goals (voter ID, persuasion, GOTV, voter registration)
   c. Create or select a canvassing script (questions, talking points, response options)
   d. Set date(s) and shifts
2. Field Director cuts turf:
   a. Divide target geography into walk lists (manageable chunks for one canvasser)
   b. Each walk list = a sequence of addresses with associated voter records
   c. Assign walk lists to shifts
3. Volunteer Coordinator opens shifts for signup:
   a. Volunteers see available shifts and sign up
   b. Or Volunteer Coordinator assigns volunteers directly
4. Team Leads are assigned to teams
```

### Day-of operation

```
5. Team Lead checks in:
   a. Opens field mode on their device
   b. Sees their team roster, turf assignment, walk lists
   c. Downloads walk list data for offline use
   d. Checks in arriving volunteers
6. Volunteer starts canvassing:
   a. Opens field mode → enters shift-length session
   b. Downloads assigned walk list (addresses, voter records, script)
   c. Walks to first door
7. At each door:
   a. App shows voter info for that address (name, age, previous contact history)
   b. Volunteer follows the script
   c. Records the interaction:
      - Contact result (spoke to voter, not home, refused, moved, etc.)
      - Responses to script questions (support level, key issues, etc.)
      - Free-text notes
      - Voter registration status update (if applicable)
   d. App marks address as completed and advances to next
   e. All data saved locally on device
8. Periodically (when connectivity available):
   a. App syncs completed interactions to the server
   b. Downloads any updates (e.g., turf reassignments from Team Lead)
9. Volunteer completes their walk list or shift ends:
   a. Final sync of all outstanding data
   b. Shift lifecycle event fires (decided in users.md):
      - Sync remaining data
      - Log volunteer hours
      - Prompt for shift debrief
      - Release turf assignment
      - Close field mode session
   c. Team Lead is notified of completion
```

### Post-operation (staff, requires connectivity)

```
10. Field Director reviews results:
    a. Doors knocked, contact rate, response data
    b. Canvassing progress map (which turfs are complete)
    c. Flagged issues from Team Leads or volunteers
11. Data Manager reviews data quality:
    a. Dedup check on any new records created in the field
    b. Flag incomplete or suspicious entries
12. CRM updated:
    a. Voter records updated with canvassing interaction data
    b. Support scores recalculated
    c. Follow-up actions generated (e.g., voter needs registration help → routed to voter reg workflow)
```

### Offline requirements

This is the most offline-dependent workflow in the platform:

| Step | Offline capable? | Notes |
|------|-----------------|-------|
| Download walk list | Requires initial connectivity | Data cached on device for offline use |
| Record interactions | Yes, fully offline | All data stored locally |
| Sync data | Requires connectivity | Opportunistic sync when available |
| View voter records | Yes, from cached data | Limited to downloaded walk list |
| Team Lead reassignment | Requires connectivity | Real-time coordination needs the network |

### Conflict resolution

**DECIDED:** Merge and flag.

When conflicting records sync from multiple devices, both records are preserved and flagged for human review. The Data Manager sees both records side-by-side — who recorded what, when, from which device — and decides how to reconcile. No data is silently discarded. Consistent with the suggest-and-confirm dedup approach decided in users.md.

**DECIDED:** Operational data only.

The walk list downloads: name, address, age, previous contact result (e.g., "spoke March 5 — leaning supportive"), and the canvassing script. Enough context for an effective conversation without exposing the full voter record.

**Excluded from device:** detailed canvassing notes from prior visits, internal tags and scores, donation history, national ID, full communication history. This data stays on the server — if the device is seized or compromised, exposure is limited to what's operationally necessary.

All on-device data is encrypted and wiped at session end (decided in security.md).

---

## 4. Phone Banking

Structured phone outreach from a call center or distributed callers.

### Actors
- **Field Director** — plans the phone bank campaign
- **Volunteer Coordinator** — manages shifts and caller assignments
- **Volunteer (caller)** — makes the calls
- **Voter/Constituent** — the person being called

### Flow

```
1. Field Director creates a phone bank campaign:
   a. Define target list (from CRM segments — e.g., registered voters who haven't been contacted)
   b. Create or select a call script
   c. Set campaign parameters (dates, shift times, calls per shift)
2. Volunteer Coordinator creates shifts and opens for signup
3. Volunteer starts a phone bank shift:
   a. Logs in, enters phone bank mode
   b. System presents the next contact from the call list
   c. Volunteer sees: name, phone number, call script, any prior contact notes
4. Volunteer makes the call:
   a. Dials the number (through platform VoIP or their own phone)
   b. Follows the script
   c. Records the result:
      - Call outcome (answered, voicemail, busy, wrong number, disconnected, do-not-call)
      - Responses to script questions
      - Free-text notes
   d. System advances to the next contact
5. Shift ends:
   a. Shift lifecycle event fires
   b. Volunteer hours logged
   c. Debrief prompt
6. Field Director reviews results:
   a. Calls made, contact rate, response data
   b. Do-not-call list updated
```

### Decision points

**DECIDED:** BYOP for MVP, hybrid integration for pilot.

**MVP:** Volunteer uses their personal phone. The platform shows the contact, the script, and records the result. No telephony infrastructure needed. Simplest and cheapest path to a working phone bank.

**Pilot:** Integrate with an external telephony provider (Twilio, Plivo, or regional equivalent) for click-to-call from within the platform. The calling happens through the provider but the UX feels native — volunteer sees the script, clicks call, records the result, and the system advances to the next contact. Call duration and outcomes tracked automatically.

<!-- REVISIT: Telephony provider selection will depend on target countries and cost. Some regions have local providers that are cheaper and more reliable than global ones. Also, volunteer phone number privacy — with BYOP, the volunteer's personal number is visible to the person being called. The hybrid integration can mask this. -->

### Offline capability
- Phone banking requires connectivity (need to load contacts, sync results in real time to prevent duplicate calls).
- **Not an offline-capable workflow.**

---

## 5. Voter Registration Drive

Field teams registering voters, often in public locations or door-to-door.

### Actors
- **Field Director** — plans and targets the drive
- **Volunteer Coordinator** — manages volunteers
- **Team Lead** — manages on-site team
- **Volunteer (registrar)** — helps people register
- **Unregistered voter** — the person being registered

### Flow

```
1. Field Director plans the voter registration drive:
   a. Identify target area or event (community center, market, campus, door-to-door)
   b. Determine registration requirements for the jurisdiction
   c. Prepare registration materials (forms, ID requirements checklist)
   d. Create shifts and assign volunteers
2. On-site:
   a. Team Lead sets up and checks in volunteers
   b. Volunteer approaches or is approached by an unregistered voter
   c. Volunteer opens voter registration tool:
      - Captures registrant information (name, address, DOB, ID number if required)
      - Verifies eligibility based on jurisdiction rules
      - Completes the digital registration form (or assists with paper form)
   d. Data saved locally on device
   e. Syncs when connectivity available
3. Post-drive:
   a. Registration data synced to CRM
   b. New voter records created (with dedup check)
   c. Registrants added to follow-up pipeline (confirm registration processed, GOTV outreach)
   d. Drive metrics logged (registrations completed, volunteers participated, hours)
```

### Offline requirements
- **Must work fully offline.** Voter registration drives often happen in locations with poor connectivity (rural areas, outdoor events).
- Registration data stored on-device, encrypted, synced when connectivity restores.
- Same conflict resolution and device data minimization principles as canvassing.

### Compliance considerations
**DECIDED:** Both — pre-built jurisdiction templates where available, custom configuration where not.

- **Jurisdiction templates:** GreenGrass builds and maintains voter registration form templates for target countries, incorporating eligibility requirements, required fields, documentation rules, and submission procedures. Orgs select their jurisdiction and get a ready-to-use form.
- **Custom form builder:** For countries or regions without a pre-built template, orgs can configure their own registration forms using a form builder with validation rules, required field logic, and submission workflow configuration.
- **Community contribution:** As orgs in new jurisdictions build custom forms, those configurations can be submitted back to GreenGrass as candidate templates for other orgs in the same jurisdiction.

<!-- REVISIT: Which jurisdiction templates to build first depends on target geography (next spec pass). Template maintenance is ongoing — election laws change. Need a process for keeping templates current. -->

---

## 6. Fundraising

The donation lifecycle — from first contribution to ongoing donor relationship.

### Actors
- **Finance Director** — configures fundraising, manages financial operations
- **Communications Director** — creates fundraising appeals
- **Donor** — the person contributing
- **Org Admin** — oversees compliance

### Online donation flow

```
1. Donor encounters a donation prompt:
   a. Campaign website (embedded donation form)
   b. Email appeal (link to donation page)
   c. SMS/WhatsApp message with donation link
   d. Social media post with donation link
   e. In-app donation page (for supporters with accounts)
2. Donor lands on donation form:
   a. Select amount (suggested amounts or custom)
   b. Choose one-time or recurring
   c. Option to cover processing fees
   d. Select payment method (country-specific options)
   e. Provide required donor information (name, email/phone, employer/occupation if required by jurisdiction)
   f. Confirm and submit
3. Payment processed:
   a. Payment processor handles the transaction
   b. Platform receives confirmation
   c. Receipt generated and sent to donor (email/SMS)
   d. Donor record created or updated in CRM (dedup check)
   e. Donation logged with full audit trail
4. Post-donation:
   a. Thank-you message sent (automated, configurable)
   b. Donor enters follow-up pipeline (future appeals, event invitations, volunteer recruitment)
   c. If recurring: scheduled payments managed, notifications on success/failure
```

### Cash donation flow

```
1. At an in-person event, someone donates cash
2. Staff or volunteer with appropriate permissions opens cash donation tool:
   a. Records donor information (name, contact info — or anonymous if allowed by jurisdiction)
   b. Records amount
   c. Records event context
   d. Takes photo of any physical receipt/form (optional)
3. Cash donation logged in the system with audit trail
4. Finance Director reviews and reconciles cash donations
```

### Fundraising campaign management

```
1. Finance Director creates a fundraising campaign:
   a. Set goal amount and deadline
   b. Configure donation form (suggested amounts, messaging, payment methods)
   c. Create embeddable form for external sites
2. Communications Director creates fundraising appeals:
   a. Draft email/SMS/WhatsApp message
   b. Link to the donation form
   c. Schedule sends to target segments
3. Analytics:
   a. Real-time fundraising dashboard (total raised, donor count, average donation, goal progress)
   b. Donor segmentation (first-time vs recurring, amount tiers, geographic distribution)
   c. Channel performance (which appeal drove the most donations)
```

### Decision points

**DECIDED:** Configurable per campaign.

The alliance defines donation split rules when creating each joint fundraising campaign. Different campaigns can have different splits — a voter registration drive might split evenly, while a candidate-focused campaign might weight toward that candidate's org.

Split rules are set by the Alliance Admin with agreement from participating member orgs. Each org's financial records reflect their portion with full audit trail tracing the split from original donation through to distribution.

### Offline capability
- Online donations require connectivity (payment processing).
- Cash donation recording should work offline and sync later.

---

## 7. Multi-Channel Communications

Outreach across email, SMS, WhatsApp, and social media.

### Actors
- **Communications Director** — creates and manages campaigns
- **Org Admin** — approves sensitive communications
- **Data Manager** — manages contact lists and segments

### Email campaign flow

```
1. Communications Director creates a campaign:
   a. Select audience segment from CRM (e.g., supporters in District 5 who attended an event)
   b. Design email using template builder (visual, mobile-first)
   c. Write content (subject, body, CTA)
   d. Set sender identity and reply-to
   e. Preview and test send
2. Schedule or send:
   a. Send immediately or schedule for optimal time
   b. System checks: opt-in status, bounce list, suppression list
   c. Sends in batches (deliverability management)
3. Tracking:
   a. Open rate, click rate, unsubscribe rate
   b. Bounces and complaints processed automatically
   c. Engagement data flows back to CRM (contact record updated)
4. Automated follow-ups:
   a. Configurable rules (e.g., "if not opened in 3 days, resend with different subject")
   b. Drip sequences for onboarding, fundraising, GOTV
```

### SMS / WhatsApp flow

```
1. Communications Director creates a message:
   a. Select audience segment
   b. Write message (character limits for SMS, richer content for WhatsApp)
   c. Include links, media (WhatsApp), or quick-reply options
2. Compliance check:
   a. Opt-in verification (has recipient consented to this channel?)
   b. Time-of-day restrictions (no messages at 3am)
   c. Frequency caps (don't over-message)
3. Send and track:
   a. Delivery status, read receipts (WhatsApp), replies
   b. Replies routed to appropriate staff for response
   c. Engagement data flows back to CRM
```

### Social media flow

```
1. Communications Director creates a post:
   a. Write content, attach media
   b. Select platforms (Facebook, Instagram, Twitter/X, TikTok, etc.)
   c. Adapt content per platform (character limits, aspect ratios)
   d. Schedule or post immediately
2. Track:
   a. Engagement metrics per platform (likes, shares, comments, reach)
   b. Cross-platform analytics dashboard
   c. Comment monitoring and response tools
```

### Decision points

**DECIDED:** Post scheduling and analytics, with the architecture open for deeper integration later.

- **In scope:** Multi-platform post scheduling, publishing, and performance analytics (engagement metrics, reach, growth). Links out to native platforms for engagement (comments, DMs, replies).
- **Out of scope for now:** Comment management, DM handling, and in-platform engagement tools.
- **Architecture:** The social media integration layer should be modular — per-platform adapters behind a common interface — so deeper engagement features can be added per platform as demand warrants, without rearchitecting.

**DECIDED:** Per-channel + per-purpose with smart defaults.

**Granularity:** Consent is tracked per combination of channel (email, SMS, WhatsApp) and purpose (transactional, event-related, fundraising, GOTV, activism/advocacy, newsletter).

**Smart defaults:** The system infers reasonable initial consent based on the context of opt-in:
- Giving a phone number for an event RSVP → SMS transactional and event-related: yes. SMS fundraising: no (requires separate explicit opt-in).
- Signing up to volunteer → email transactional and event-related: yes. Email fundraising and newsletter: prompted, not assumed.
- Donating → email transactional (receipt): yes. Email fundraising: prompted.

**Requirements:**
- **Revocable** — one-click unsubscribe/opt-out on every message, with immediate effect.
- **Auditable** — the system records when consent was granted, through what mechanism, and when it was revoked. Logged in the audit trail.
- **Accessible** — supporters can view and manage all their consent preferences from their profile.
- **Enforced** — the comms system checks consent at send time. No message goes out without valid consent for that channel + purpose combination.

### Offline capability
- **Not offline-capable.** Communications require connectivity to send and track.
- Message drafting could work offline and queue for send when connectivity restores.

---

## 8. Event Management

Campaign events — rallies, town halls, fundraisers, volunteer trainings, canvass launches.

### Actors
- **Volunteer Coordinator** (or Event Organizer staff role) — creates and manages events
- **Communications Director** — promotes events
- **Volunteer / Supporter** — attends events
- **Team Lead** — manages on-site check-in

### Flow

```
1. Create event:
   a. Event details (name, date/time, location, description, capacity)
   b. Event type (rally, town hall, fundraiser, training, canvass launch, phone bank, virtual)
   c. RSVP settings (open, invite-only, approval-required)
   d. Assign staff roles (who's managing, who's checking in)
2. Promote event:
   a. Send invitations via email/SMS/WhatsApp to target segments
   b. Post to social media
   c. Public event page (shareable link)
   d. Calendar integration (export to personal calendar)
3. RSVPs:
   a. Supporters RSVP through form, email link, or in-app
   b. RSVP data flows to CRM
   c. Automated reminders sent before the event (configurable timing)
   d. Capacity management (waitlist if full)
4. Day-of:
   a. Check-in tool (Team Lead or staff scans QR code, searches name, or marks attendance manually)
   b. Walk-in registration for non-RSVP attendees
   c. Attendance data recorded in real time
   d. Cash donation collection at fundraising events (links to cash donation workflow)
5. Post-event:
   a. Attendance data synced to CRM
   b. Follow-up messages sent to attendees (thank you, next steps, volunteer recruitment)
   c. Follow-up messages sent to no-shows (sorry we missed you, link to recording if virtual)
   d. Event metrics logged (RSVPs, attendance, conversion rate, donations collected)
   e. Post-event survey (optional)
```

### Virtual events

**DECIDED:** External integration with registration bridge.

- GreenGrass manages the full event lifecycle: creation, promotion, RSVPs, reminders, follow-up, and analytics.
- For virtual events, the platform integrates with external video providers (Zoom, Google Meet, Jitsi, etc.).
- A unique link is generated per registrant, enabling attendance tracking through the integration — GreenGrass knows who actually showed up, not just who RSVP'd.
- Attendance data flows back to CRM records automatically.
- Video hosting is explicitly out of scope — building streaming infrastructure is a separate product.

### Offline capability
- Event creation and promotion require connectivity.
- **Check-in should work offline** — events may be in locations with poor connectivity. Attendance data syncs when connectivity restores.

---

## 9. Activism & Engagement Campaigns

Coordinated action beyond elections — pressure campaigns, letter-writing, petitions, public comment submissions.

### Actors
- **Campaign Manager / Org Admin** — defines the action campaign
- **Communications Director** — promotes the action
- **Supporter / Volunteer** — takes the action
- **Target** — the person or institution being pressured (elected official, regulator, corporation)

### Email/Letter writing campaign

```
1. Staff creates an action campaign:
   a. Define the target (elected official, regulatory body, etc.)
   b. Provide target's contact information (email, mailing address, phone)
   c. Write a template letter/email that supporters can customize
   d. Set talking points and key messages
   e. Define the ask (vote yes/no, sign a resolution, respond to constituents)
2. Promote the action:
   a. Send appeal to supporters via email/SMS/WhatsApp
   b. Post to social media
   c. Public action page (shareable link)
3. Supporter takes action:
   a. Lands on action page
   b. Reviews the template letter
   c. Optionally personalizes the message
   d. Provides their contact info (for the target to see it's from a real constituent)
   e. Submits — system sends the letter/email to the target
4. Tracking:
   a. Total actions taken
   b. Geographic distribution of participants (important for constituent-based pressure)
   c. Per-supporter action history (flows to CRM)
```

### Petition campaign

```
1. Staff creates a petition:
   a. Define the petition text and ask
   b. Set a signature goal
   c. Configure signer information requirements
2. Promote:
   a. Multi-channel outreach (same as above)
   b. Public petition page with signature counter
3. Supporter signs:
   a. Provides name, location, optional comment
   b. Signature recorded and counted
   c. Signer added to CRM (dedup check)
4. Delivery:
   a. Petition delivered to target (digitally or printed)
   b. Delivery event documented (photo, press coverage)
```

### Public comment submission

```
1. Staff identifies a regulatory comment period:
   a. Define the issue, deadline, and submission mechanism
   b. Provide background information and talking points
   c. Create a template comment
2. Promote and mobilize:
   a. Multi-channel outreach
   b. Explainer content (why this matters, how to comment)
3. Supporter submits comment:
   a. Reviews template, personalizes
   b. Submits through the platform (if the regulatory body accepts electronic submissions)
      or downloads/copies for manual submission
4. Tracking:
   a. Comments submitted through the platform
   b. Supporter action history updated
```

### Decision points

**DECIDED:** Platform sends on behalf of the supporter, with AI-generated custom messaging approved by the user.

**Flow:**
1. Staff creates the action campaign with talking points, key messages, and the ask.
2. Supporter lands on the action page and provides their info (name, location, personal connection to the issue if desired).
3. An AI agent generates a unique, personalized message based on the campaign's talking points and the supporter's input — no two messages are identical.
4. The supporter reviews the generated message in the UI, can edit it, and approves it before it's sent.
5. The platform sends the approved message to the target on the supporter's behalf.

**Benefits:**
- High completion rate (one-click approval, no email client gymnastics)
- Each message is authentically worded — targets cannot dismiss them as identical astroturfing
- The supporter retains control — nothing goes out without their approval
- The AI draws on the campaign's talking points for message consistency while varying tone, structure, and personal framing

<!-- REVISIT: AI model selection, prompt design for message generation, content guardrails (preventing the AI from going off-message), and cost per generation need to be addressed in the architecture spec. Also, the supporter's approval creates a consent record in the audit trail. -->

### Offline capability
- Action pages and petition signing require connectivity (real-time count, delivery).
- **Not offline-capable.**

---

## 10. Alliance Coordination

Workflows specific to alliance-level operations across member orgs.

### Joint campaign launch

```
1. Alliance Admin creates a joint campaign:
   a. Define campaign scope (GOTV, voter registration, issue advocacy)
   b. Invite member orgs to participate
   c. Member Org Admins accept and configure their sharing preferences
2. Resource sharing activated:
   a. Shared volunteer pool populated (from participating orgs' volunteers)
   b. Shared voter contact data merged (with dedup, respecting per-org sharing rules)
   c. Joint canvassing turfs cut across org boundaries
   d. Shared analytics dashboard created
3. Operations:
   a. Canvassing, phone banking, events run through member orgs' tenants but with alliance-level coordination
   b. "Don't re-knock" list shared across participating orgs
   c. Volunteer assignments can cross org boundaries (with volunteer consent)
4. Reporting:
   a. Alliance-level aggregate metrics
   b. Per-org breakdowns (visible only to that org and the alliance admin)
```

### Alliance fundraising

```
1. Alliance creates a joint fundraising campaign:
   a. Configure donation split rules
   b. Create shared donation form with alliance branding
   c. Member orgs promote through their own channels
2. Donations processed:
   a. Payment goes to alliance payment processor
   b. Split applied per configured rules
   c. Each org receives their portion
   d. Audit trail captures full flow
3. Reporting:
   a. Alliance-level totals
   b. Per-org attribution
```

### Affiliation management

```
1. Candidate or org requests affiliation with a party or alliance:
   a. Request sent through platform
   b. Party/Alliance Admin reviews and approves
   c. Affiliation established — sharing options become available
2. Disaffiliation:
   a. Either party can initiate
   b. Shared resources are revoked
   c. Data that belongs to each tenant stays with that tenant
   d. Platform identities of people in both orgs are unaffected
   e. Audit trail captures the affiliation change
```

### Decision points

**DECIDED:** Configurable per campaign.

The alliance chooses the governance model when creating each joint campaign:

- **Alliance-controlled** — Alliance Admin directs operations. Member orgs contribute resources but the alliance runs the show. For tightly coordinated efforts like a national GOTV push.
- **Org-controlled** — each member org runs their piece independently. The alliance provides coordination (dedup, shared lists, aggregate reporting) but doesn't direct operations. For loose coalitions or issue-based alignments.
- **Shared governance** — the joint campaign gets its own role structure with staff from multiple orgs collaborating under shared permissions. For campaigns where multiple orgs are true co-equals.

Different joint campaigns within the same alliance can use different models. A coalition might centrally direct a voter registration drive while loosely coordinating on a fundraising campaign.

### Offline capability
- Alliance coordination requires connectivity.
- Individual org workflows within a joint campaign follow their own offline rules (canvassing is offline-capable, phone banking is not, etc.)

---

## 11. Data Import & Management

Getting data into the system, keeping it clean, getting it out.

### Voter file import

```
1. Data Manager initiates a voter file import:
   a. Upload file (CSV, with configurable column mapping)
   b. System validates format and data quality
   c. Preview import (sample records, field mapping confirmation)
   d. System runs dedup matching against existing records
   e. Matched records flagged for review (suggest and confirm)
   f. Data Manager confirms import
2. Post-import:
   a. New records created, existing records updated
   b. Import logged in audit trail (who imported what, when, source file)
   c. Data quality report generated (incomplete records, potential duplicates remaining)
```

### Data export

```
1. Authorized user (Data Manager, Org Admin) initiates an export:
   a. Select data set (contacts, donors, volunteers, event attendees, etc.)
   b. Apply filters (segment, geography, date range)
   c. Select fields to include
   d. Choose format (CSV, JSON)
2. Security checks:
   a. User has export permission for this data scope
   b. Export logged in audit trail (who exported what, when)
   c. Sensitive fields may be redacted or excluded based on role
3. Export generated and delivered:
   a. Download link (time-limited) or direct download
   b. Optional: encrypted export file
```

### Decision points

**DECIDED:** Full export with relationship data, as a contractual guarantee.

- **Scope:** Everything the org owns — contacts, donor records, donation history, communication history, canvassing data, volunteer records and hours, event data, analytics, tags, segments, notes, audit logs for their tenant.
- **Relationships preserved:** Cross-references are included — which donors attended which events, which volunteers canvassed which turfs, which supporters opened which emails. The data retains its relational value, not just flat tables.
- **Standard formats:** Exported in open, standard formats (CSV, JSON) with documentation of the schema. No proprietary lock-in.
- **Contractual guarantee:** Data portability is a right guaranteed in the terms of service, not just a feature. It is documented, regularly tested, and enforceable. If GreenGrass shuts down, is acquired, or the org simply wants to leave, their data is theirs to take.
- **Timely:** Export must be available on demand, not subject to a queue or approval process. The org doesn't need to explain why.

### Offline capability
- Import and export require connectivity.

---

## 12. Reporting & Analytics

How campaign leaders understand what's happening and make decisions.

### Actors
- **Org Admin / Campaign Manager** — strategic overview
- **Candidate** — curated high-level view
- **Field Director** — field operation metrics
- **Finance Director** — financial metrics
- **Communications Director** — engagement metrics

### Dashboard hierarchy

```
Campaign overview (Org Admin / Candidate):
├── Fundraising: total raised, goal progress, donor count, avg donation
├── Field: doors knocked, voter contacts made, contact rate, support scores
├── Communications: emails sent, open rate, SMS delivered, social engagement
├── Volunteers: active count, hours logged, shifts filled vs available
└── Events: upcoming, recent attendance, RSVPs pending

Field operations (Field Director):
├── Canvassing progress map (turfs complete vs remaining)
├── Contact rate by turf, team, volunteer
├── Support score distribution
├── Voter registration drive metrics
└── Phone bank metrics (calls made, contact rate, outcomes)

Fundraising (Finance Director):
├── Revenue by channel, campaign, time period
├── Donor retention and churn
├── Recurring donation health
├── Cash vs digital breakdown
├── Compliance reporting (per jurisdiction requirements)
└── Payment processor status

Communications (Communications Director):
├── Email performance (opens, clicks, bounces, unsubscribes)
├── SMS / WhatsApp delivery and engagement
├── Social media performance per platform
├── Audience growth over time
└── Channel effectiveness comparison
```

### Decision points

**DECIDED:** Hybrid — real-time for active operations, batch for historical analysis.

- **Real-time:** Field day dashboards (doors knocked, contact rate, team progress), phone bank dashboards (calls made, outcomes), election day tracker, live fundraising thermometer during appeals. Data updates as it flows in from the field.
- **Batch:** Historical trend reporting (fundraising over time, volunteer growth, engagement trends), cross-campaign comparisons, compliance reports. Aggregated on a defined schedule (hourly or daily depending on the metric).

The right freshness for the right context — a Field Director on canvassing day needs live data, a campaign manager reviewing last quarter's performance can wait for the rollup.

<!-- REVISIT: The real-time analytics pipeline (event streaming, aggregation, push to dashboards) is a significant architecture decision. Needs treatment in the architecture spec. -->

### Offline capability
- **Not offline-capable.** Dashboards and reports require connectivity.

---

## Open Questions — Resolved

1. ~~**GOTV workflow**~~ — **RESOLVED.** Separate spec. Election day operations (rides to polls, poll monitoring, real-time voter check-in tracking) are a distinct, high-stakes workflow that warrants its own detailed spec document.
2. ~~**Internal messaging workflow**~~ — **RESOLVED.** Needs its own spec pass. Candidate-to-staff and staff-to-staff communication workflows need detailed definition, particularly how they interact with E2E encryption (decided in security.md) and the candidate's curated interface.
3. ~~**Press and media workflows**~~ — **RESOLVED.** In scope. Press contact management, media lists, press release distribution, delivery events, and media coverage tracking are within the platform's scope. Needs its own spec.
4. ~~**Volunteer gamification**~~ — **RESOLVED.** Out of scope. There are better ways to keep volunteers coming back than cheap gamification. No leaderboards, badges, or achievement systems.
5. ~~**Multi-campaign coordination within a single org**~~ — **RESOLVED.** Handled by existing campaign-level scoping in the permissions model (decided in users.md). Staff, data, and operations can be scoped to specific campaigns within a tenant. No additional workflow spec needed as long as campaign-level definitions remain consistent.

## Future Specs Identified

- `spec/gotv.md` — Election day / Get Out The Vote operations
- `spec/messaging.md` — Internal communications (staff-to-staff, candidate-to-staff)
- `spec/press.md` — Press, media, and public relations workflows
