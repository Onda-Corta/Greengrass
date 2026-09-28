# Screen Inventory

## Purpose

A comprehensive catalog of every distinct screen in the platform, organized by feature area. Each entry identifies which personas can access the screen, whether it works offline, and whether it's mobile-optimized.

This inventory is derived from the 12 spec documents and the navigation model. It serves as the master reference for wireframing, route planning, and implementation scoping.

## Reading the Table

- **Screen ID** — unique identifier for cross-referencing (format: `AREA-NNN`)
- **Screen** — human-readable screen name
- **Personas** — who can access this screen (abbreviated: OA=Org Admin, CD=Communications Director, FD=Finance Director, FiD=Field Director, VC=Volunteer Coordinator, DM=Data Manager, V=Volunteer, TL=Team Lead, C=Candidate, S=Supporter)
- **Offline** — whether the screen works without connectivity (Yes, Partial, No)
- **Mobile** — whether the screen is designed for mobile use (Primary=mobile-first, Yes=works on mobile, Desktop=desktop-preferred)
- **Spec ref** — source spec document and relevant section

## 1. Dashboards

| ID | Screen | Personas | Offline | Mobile | Spec ref |
|----|--------|----------|---------|--------|----------|
| DASH-001 | Campaign Overview Dashboard | OA, C | No | Yes | workflows.md — reporting |
| DASH-002 | Field Operations Dashboard | OA, FiD | No | Yes | workflows.md — reporting |
| DASH-003 | Fundraising Dashboard | OA, FD | No | Yes | workflows.md — reporting |
| DASH-004 | Communications Dashboard | OA, CD | No | Yes | workflows.md — reporting |
| DASH-005 | Volunteer Dashboard | OA, VC | No | Yes | workflows.md — reporting |
| DASH-006 | Data Quality Dashboard | OA, DM | No | Desktop | workflows.md — reporting |
| DASH-007 | Compliance Dashboard | OA, FD | No | Desktop | compliance.md — infrastructure |
| DASH-008 | GOTV War Room Dashboard | OA, FiD | No | Yes | gotv.md — turnout dashboard |
| DASH-009 | Team Lead Dashboard | TL | No | Primary | workflows.md — canvassing |
| DASH-010 | Candidate Dashboard | C | No | Yes | users.md — candidate persona |
| DASH-011 | Alliance Dashboard | OA | No | Yes | workflows.md — alliance coordination |

## 2. CRM / People

| ID | Screen | Personas | Offline | Mobile | Spec ref |
|----|--------|----------|---------|--------|----------|
| CRM-001 | Contact List | OA, CD, FD, FiD, VC, DM | No | Yes | users.md — CRM records |
| CRM-002 | Contact Detail | OA, CD, FD, FiD, VC, DM | Partial | Yes | users.md — CRM records |
| CRM-003 | Contact Create/Edit | OA, CD, FD, FiD, VC, DM | No | Yes | users.md — CRM records |
| CRM-004 | Segment Builder | OA, CD, FD, FiD, DM | No | Desktop | workflows.md — communications |
| CRM-005 | Segment List | OA, CD, FD, FiD, DM | No | Yes | workflows.md — communications |
| CRM-006 | Dedup Review Queue | OA, DM | No | Desktop | users.md — deduplication |
| CRM-007 | Dedup Side-by-Side Comparison | OA, DM | No | Desktop | users.md — deduplication |
| CRM-008 | Data Import Wizard — File Upload | OA, DM | No | Desktop | integrations.md — voter file import |
| CRM-009 | Data Import Wizard — Column Mapping | OA, DM | No | Desktop | integrations.md — voter file import |
| CRM-010 | Data Import Wizard — Dedup Preview | OA, DM | No | Desktop | integrations.md — voter file import |
| CRM-011 | Data Import Wizard — Confirmation | OA, DM | No | Desktop | integrations.md — voter file import |
| CRM-012 | Data Import History | OA, DM | No | Desktop | integrations.md — voter file import |
| CRM-013 | Data Export | OA, DM | No | Desktop | workflows.md — data import/export |
| CRM-014 | Data Quality Report | OA, DM | No | Desktop | workflows.md — data import/export |
| CRM-015 | Tag Management | OA, DM | No | Desktop | users.md — CRM records |

## 3. Canvassing

| ID | Screen | Personas | Offline | Mobile | Spec ref |
|----|--------|----------|---------|--------|----------|
| CANV-001 | Canvassing Campaign List | OA, FiD | No | Yes | workflows.md — canvassing |
| CANV-002 | Canvassing Campaign Create/Edit | OA, FiD | No | Desktop | workflows.md — canvassing |
| CANV-003 | Script Builder | OA, FiD | No | Desktop | workflows.md — canvassing |
| CANV-004 | Turf Management Map | OA, FiD | No | Desktop | integrations.md — GIS/mapping |
| CANV-005 | Turf Auto-Generation | OA, FiD | No | Desktop | integrations.md — GIS/mapping |
| CANV-006 | Walk List Management | OA, FiD | No | Desktop | workflows.md — canvassing |
| CANV-007 | Field Mode — Shift Start | V, TL | Yes | Primary | workflows.md — canvassing |
| CANV-008 | Field Mode — Walk List View | V, TL | Yes | Primary | workflows.md — canvassing |
| CANV-009 | Field Mode — Map View | V, TL | Yes | Primary | integrations.md — offline maps |
| CANV-010 | Field Mode — Door Card | V, TL | Yes | Primary | workflows.md — canvassing |
| CANV-011 | Field Mode — Interaction Form | V, TL | Yes | Primary | workflows.md — canvassing |
| CANV-012 | Field Mode — Shift End / Debrief | V, TL | Partial | Primary | workflows.md — canvassing |
| CANV-013 | Canvassing Results Review | OA, FiD | No | Yes | workflows.md — canvassing |
| CANV-014 | Canvassing Progress Map | OA, FiD | No | Desktop | workflows.md — reporting |

## 4. Phone Banking

| ID | Screen | Personas | Offline | Mobile | Spec ref |
|----|--------|----------|---------|--------|----------|
| PHONE-001 | Phone Bank Campaign List | OA, FiD | No | Yes | workflows.md — phone banking |
| PHONE-002 | Phone Bank Campaign Create/Edit | OA, FiD | No | Desktop | workflows.md — phone banking |
| PHONE-003 | Phone Bank Script Builder | OA, FiD | No | Desktop | workflows.md — phone banking |
| PHONE-004 | Phone Bank — Call Interface (BYOP) | V | No | Primary | workflows.md — phone banking |
| PHONE-005 | Phone Bank — Call Interface (Integrated) | V | No | Primary | integrations.md — telephony |
| PHONE-006 | Phone Bank — Call Result Form | V | No | Primary | workflows.md — phone banking |
| PHONE-007 | Phone Bank Progress Dashboard | OA, FiD | No | Yes | workflows.md — phone banking |

## 5. Voter Registration

| ID | Screen | Personas | Offline | Mobile | Spec ref |
|----|--------|----------|---------|--------|----------|
| VREG-001 | Voter Reg Drive List | OA, FiD | No | Yes | workflows.md — voter registration |
| VREG-002 | Voter Reg Drive Create/Edit | OA, FiD | No | Desktop | workflows.md — voter registration |
| VREG-003 | Voter Reg Jurisdiction Template Selector | OA, FiD | No | Desktop | workflows.md — voter registration |
| VREG-004 | Field Mode — Voter Registration Form | V, TL | Yes | Primary | workflows.md — voter registration |
| VREG-005 | Field Mode — Eligibility Check | V, TL | Yes | Primary | workflows.md — voter registration |
| VREG-006 | Voter Reg Results Review | OA, FiD | No | Yes | workflows.md — voter registration |

## 6. Fundraising

| ID | Screen | Personas | Offline | Mobile | Spec ref |
|----|--------|----------|---------|--------|----------|
| FUND-001 | Donation List | OA, FD | No | Yes | fundraising.md — donation types |
| FUND-002 | Donation Detail | OA, FD | No | Yes | fundraising.md — donation types |
| FUND-003 | Donation Form Builder | OA, FD | No | Desktop | fundraising.md — donation forms |
| FUND-004 | Donation Form Preview | OA, FD | No | Yes | fundraising.md — donation forms |
| FUND-005 | Donation Form — Public (Hosted) | S, Public | No | Primary | fundraising.md — donation forms |
| FUND-006 | Donation Form — Embed Config | OA, FD | No | Desktop | fundraising.md — donation forms |
| FUND-007 | Recurring Donation Management | OA, FD | No | Desktop | fundraising.md — recurring |
| FUND-008 | Pledge Management | OA, FD | No | Desktop | fundraising.md — pledges |
| FUND-009 | Refund Processing | OA, FD | No | Desktop | fundraising.md — refunds |
| FUND-010 | Cash Donation Recording | OA, FD, V | Partial | Primary | fundraising.md — cash handling |
| FUND-011 | Cash Reconciliation | OA, FD | No | Desktop | fundraising.md — cash handling |
| FUND-012 | Compliance Flag Review | OA, FD | No | Desktop | fundraising.md — fraud prevention |
| FUND-013 | A/B Test Setup | OA, FD | No | Desktop | fundraising.md — A/B testing |
| FUND-014 | A/B Test Results | OA, FD | No | Desktop | fundraising.md — A/B testing |
| FUND-015 | Alliance Split Configuration | OA, FD | No | Desktop | fundraising.md — alliance fundraising |
| FUND-016 | Alliance Fundraising Report | OA, FD | No | Desktop | fundraising.md — alliance fundraising |
| FUND-017 | Payment Processor Configuration | OA | No | Desktop | fundraising.md — processors |
| FUND-018 | Fundraising Campaign List | OA, FD | No | Yes | fundraising.md — analytics |
| FUND-019 | Fundraising Campaign Create/Edit | OA, FD | No | Desktop | fundraising.md — analytics |
| FUND-020 | Year-End Statement Generator | OA, FD | No | Desktop | fundraising.md — donor experience |

## 7. Communications

| ID | Screen | Personas | Offline | Mobile | Spec ref |
|----|--------|----------|---------|--------|----------|
| COMM-001 | Email Campaign List | OA, CD | No | Yes | workflows.md — communications |
| COMM-002 | Email Campaign Builder | OA, CD | No | Desktop | workflows.md — communications |
| COMM-003 | Email Template Builder | OA, CD | No | Desktop | workflows.md — communications |
| COMM-004 | Email Template Library | OA, CD | No | Yes | workflows.md — communications |
| COMM-005 | SMS/WhatsApp Composer | OA, CD | No | Yes | workflows.md — communications |
| COMM-006 | Communication Analytics | OA, CD | No | Desktop | workflows.md — reporting |
| COMM-007 | Consent Management | OA, CD, DM | No | Desktop | compliance.md — consent |
| COMM-008 | Communication Preferences (Staff) | OA, CD | No | Desktop | compliance.md — consent |
| COMM-009 | Unsubscribe Management | OA, CD | No | Desktop | compliance.md — consent |
| COMM-010 | Email Sending Domain Config | OA | No | Desktop | integrations.md — email |

## 8. Social Media

| ID | Screen | Personas | Offline | Mobile | Spec ref |
|----|--------|----------|---------|--------|----------|
| SOCIAL-001 | Social Media Dashboard | OA, CD | No | Yes | press.md — social media |
| SOCIAL-002 | Post Composer (Multi-platform) | OA, CD | No | Desktop | press.md — post creation |
| SOCIAL-003 | Post Calendar / Schedule | OA, CD | No | Desktop | press.md — scheduling |
| SOCIAL-004 | Post Analytics | OA, CD | No | Desktop | press.md — analytics |
| SOCIAL-005 | Social Account Connection | OA | No | Desktop | press.md — OAuth/fallback |
| SOCIAL-006 | Platform-Specific Preview | OA, CD | No | Desktop | press.md — post creation |

## 9. Events

| ID | Screen | Personas | Offline | Mobile | Spec ref |
|----|--------|----------|---------|--------|----------|
| EVT-001 | Event List | OA, VC, V, TL, S | No | Yes | workflows.md — events |
| EVT-002 | Event Create/Edit | OA, VC | No | Desktop | workflows.md — events |
| EVT-003 | Event Detail | OA, VC, V, TL, S | No | Yes | workflows.md — events |
| EVT-004 | Event RSVP Management | OA, VC | No | Yes | workflows.md — events |
| EVT-005 | Event Check-in Tool | OA, VC, TL | Yes | Primary | workflows.md — events |
| EVT-006 | Event RSVP Form (Public) | S, Public | No | Primary | workflows.md — events |
| EVT-007 | Event Page (Public) | Public | No | Primary | workflows.md — events |
| EVT-008 | Event Metrics | OA, VC | No | Desktop | workflows.md — events |
| EVT-009 | Virtual Event Setup | OA, VC | No | Desktop | workflows.md — events |
| EVT-010 | Post-Event Survey Builder | OA, VC | No | Desktop | workflows.md — events |

## 10. Activism

| ID | Screen | Personas | Offline | Mobile | Spec ref |
|----|--------|----------|---------|--------|----------|
| ACT-001 | Activism Campaign List | OA, CD | No | Yes | workflows.md — activism |
| ACT-002 | Letter/Email Action Setup | OA, CD | No | Desktop | workflows.md — activism |
| ACT-003 | Petition Setup | OA, CD | No | Desktop | workflows.md — activism |
| ACT-004 | Public Comment Campaign Setup | OA, CD | No | Desktop | workflows.md — activism |
| ACT-005 | Action Page (Public) | S, Public | No | Primary | workflows.md — activism |
| ACT-006 | Petition Page (Public) | S, Public | No | Primary | workflows.md — activism |
| ACT-007 | AI Message Generation Preview | S | No | Primary | workflows.md — activism |
| ACT-008 | Activism Campaign Analytics | OA, CD | No | Desktop | workflows.md — activism |
| ACT-009 | Delivery Event Documentation | OA, CD | No | Yes | workflows.md — activism |

## 11. Press & Media

| ID | Screen | Personas | Offline | Mobile | Spec ref |
|----|--------|----------|---------|--------|----------|
| PRESS-001 | Media Contact List | OA, CD | No | Yes | press.md — media contacts |
| PRESS-002 | Media Contact Detail | OA, CD | No | Yes | press.md — media contacts |
| PRESS-003 | Media List Management | OA, CD | No | Desktop | press.md — media lists |
| PRESS-004 | Press Release Builder | OA, CD | No | Desktop | press.md — press releases |
| PRESS-005 | Press Release Preview | OA, CD | No | Yes | press.md — press releases |
| PRESS-006 | Press Release Distribution | OA, CD | No | Desktop | press.md — press releases |
| PRESS-007 | Media Advisory Builder | OA, CD | No | Desktop | press.md — advisories |
| PRESS-008 | Statement Builder | OA, CD | No | Desktop | press.md — statements |
| PRESS-009 | Media Kit Management | OA, CD | No | Desktop | press.md — media kit |
| PRESS-010 | Coverage Log | OA, CD | No | Desktop | press.md — coverage tracking |
| PRESS-011 | Coverage Analytics | OA, CD | No | Desktop | press.md — coverage analytics |
| PRESS-012 | Endorsement Pipeline | OA, CD | No | Desktop | press.md — endorsements |
| PRESS-013 | Endorsement Detail | OA, CD | No | Yes | press.md — endorsements |
| PRESS-014 | Talking Points Library | OA, CD | No | Yes | press.md — spokesperson |
| PRESS-015 | Interview Schedule | OA, CD | No | Yes | press.md — press events |
| PRESS-016 | Spokesperson Configuration | OA | No | Desktop | press.md — spokesperson |

## 12. GOTV & Election Day

| ID | Screen | Personas | Offline | Mobile | Spec ref |
|----|--------|----------|---------|--------|----------|
| GOTV-001 | GOTV Universe Builder | OA, FiD | No | Desktop | gotv.md — universe definition |
| GOTV-002 | Early Voting Data Upload | OA, FiD, DM | No | Desktop | gotv.md — early voting |
| GOTV-003 | Volunteer Staging Setup | OA, FiD, VC | No | Desktop | gotv.md — staging |
| GOTV-004 | GOTV Turf Cutting | OA, FiD | No | Desktop | gotv.md — turf cutting |
| GOTV-005 | Election Day Comms Plan | OA, FiD, CD | No | Desktop | gotv.md — comms plan |
| GOTV-006 | Poll Watcher Registry | OA, FiD | No | Desktop | gotv.md — poll watcher prep |
| GOTV-007 | Poll Watcher Credential Tracking | OA, FiD | No | Desktop | gotv.md — poll watcher prep |
| GOTV-008 | Field Mode — GOTV Door Card | V, TL | Yes | Primary | gotv.md — GOTV canvassing |
| GOTV-009 | Field Mode — GOTV Walk List | V, TL | Yes | Primary | gotv.md — GOTV canvassing |
| GOTV-010 | Chase Call Interface | V | No | Primary | gotv.md — chase calls |
| GOTV-011 | Ride Request Form | V, TL, S | Partial | Primary | gotv.md — rides to polls |
| GOTV-012 | Ride Coordination — Dispatcher View | OA, FiD, VC | No | Yes | gotv.md — rides to polls |
| GOTV-013 | Ride Coordination — Driver View | V | No | Primary | gotv.md — rides to polls |
| GOTV-014 | Poll Watcher Check-in | V | No | Primary | gotv.md — poll watching |
| GOTV-015 | Poll Watcher Issue Report Form | V | Partial | Primary | gotv.md — issue reporting |
| GOTV-016 | Poll Watcher Issue Queue | OA, FiD | No | Yes | gotv.md — issue escalation |
| GOTV-017 | Turnout Dashboard — Map View | OA, FiD | No | Yes | gotv.md — turnout tracking |
| GOTV-018 | Turnout Dashboard — Segment View | OA, FiD | No | Desktop | gotv.md — turnout tracking |
| GOTV-019 | Reallocation Suggestions | OA, FiD | No | Yes | gotv.md — dynamic reallocation |
| GOTV-020 | Election Night Results Entry | V | No | Primary | gotv.md — results tracking |
| GOTV-021 | Election Night Results Dashboard | OA, FiD | No | Yes | gotv.md — results tracking |
| GOTV-022 | Post-Election Analysis | OA, FiD | No | Desktop | gotv.md — post-election |
| GOTV-023 | Staging Location Check-in | TL | No | Primary | gotv.md — volunteer staging |

## 13. Messaging

| ID | Screen | Personas | Offline | Mobile | Spec ref |
|----|--------|----------|---------|--------|----------|
| MSG-001 | Message List (Inbox) | All authenticated | Partial | Primary | messaging.md — DMs |
| MSG-002 | Conversation View (DM) | All authenticated | Partial | Primary | messaging.md — DMs |
| MSG-003 | Conversation View (Group) | All authenticated | Partial | Primary | messaging.md — groups |
| MSG-004 | Thread View | All authenticated | Partial | Primary | messaging.md — threading |
| MSG-005 | Group Create/Edit | OA, CD, FD, FiD, VC | No | Yes | messaging.md — groups |
| MSG-006 | Broadcast Composer | OA, CD, FiD, VC | No | Desktop | messaging.md — broadcasts |
| MSG-007 | War Room Channel | OA, FiD, CD, VC | No | Yes | messaging.md — war room |
| MSG-008 | Contextual Thread (Event) | OA, VC, TL | Partial | Yes | messaging.md — contextual |
| MSG-009 | Contextual Thread (Shift) | OA, FiD, VC, TL | Partial | Yes | messaging.md — contextual |
| MSG-010 | Contextual Thread (Issue) | OA, FiD | No | Yes | messaging.md — contextual |
| MSG-011 | Contextual Thread (Donation Flag) | OA, FD | No | Desktop | messaging.md — contextual |
| MSG-012 | Candidate Briefing View | C | Partial | Primary | messaging.md — candidate |
| MSG-013 | Candidate Approval Queue | C | No | Primary | messaging.md — candidate |
| MSG-014 | Alliance Channel | OA | No | Yes | messaging.md — alliance |

## 14. Settings & Administration

| ID | Screen | Personas | Offline | Mobile | Spec ref |
|----|--------|----------|---------|--------|----------|
| SET-001 | Org Profile & Branding | OA | No | Desktop | workflows.md — onboarding |
| SET-002 | Role Template Editor | OA | No | Desktop | users.md — permissions |
| SET-003 | Permission Override Panel | OA | No | Desktop | users.md — permissions |
| SET-004 | Staff Management List | OA | No | Desktop | users.md — staff |
| SET-005 | Staff Invite Flow | OA | No | Desktop | workflows.md — onboarding |
| SET-006 | Geographic Scope Configuration | OA | No | Desktop | users.md — scoping |
| SET-007 | Campaign Period Configuration | OA | No | Desktop | compliance.md — campaign periods |
| SET-008 | Compliance Configuration | OA | No | Desktop | compliance.md — per-tenant config |
| SET-009 | Contribution Limits Configuration | OA | No | Desktop | compliance.md — campaign finance |
| SET-010 | Disclaimer Text Configuration | OA | No | Desktop | compliance.md — disclaimers |
| SET-011 | Data Retention Policy | OA | No | Desktop | compliance.md — retention |
| SET-012 | Integration Settings Hub | OA | No | Desktop | integrations.md |
| SET-013 | WhatsApp Business Setup | OA | No | Desktop | integrations.md — WhatsApp |
| SET-014 | SMS Provider Configuration | OA | No | Desktop | integrations.md — SMS |
| SET-015 | Email Domain Configuration | OA | No | Desktop | integrations.md — email |
| SET-016 | Social Media Account Connections | OA | No | Desktop | press.md — social media |
| SET-017 | Billing & Subscription | OA | No | Desktop | fundraising.md — pricing |
| SET-018 | Audit Trail Viewer | OA | No | Desktop | security.md — audit |
| SET-019 | Security Settings | OA | No | Desktop | security.md — tier config |
| SET-020 | Encryption Key Management | OA | No | Desktop | security.md — BYOK |
| SET-021 | API Key Management | OA | No | Desktop | integrations.md — public API |
| SET-022 | Webhook Configuration | OA | No | Desktop | integrations.md — webhooks |

## 15. Onboarding Wizards

| ID | Screen | Personas | Offline | Mobile | Spec ref |
|----|--------|----------|---------|--------|----------|
| WIZ-001 | Org Setup Wizard | OA | No | Yes | support.md — onboarding wizards |
| WIZ-002 | Payment Processor Wizard | OA | No | Desktop | support.md — onboarding wizards |
| WIZ-003 | BYOK Key Generation Wizard | OA | No | Desktop | support.md — onboarding wizards |
| WIZ-004 | Compliance Configuration Wizard | OA | No | Desktop | support.md — onboarding wizards |
| WIZ-005 | WhatsApp Business Setup Wizard | OA | No | Desktop | support.md — onboarding wizards |
| WIZ-006 | SMS Number Setup Wizard | OA | No | Desktop | support.md — onboarding wizards |
| WIZ-007 | Voter File Import Wizard | OA, DM | No | Desktop | support.md — onboarding wizards |
| WIZ-008 | Volunteer Onboarding Wizard | V | No | Primary | support.md — onboarding wizards |

## 16. Support & Help

| ID | Screen | Personas | Offline | Mobile | Spec ref |
|----|--------|----------|---------|--------|----------|
| HELP-001 | Knowledge Base Browser | All authenticated | No | Yes | support.md — knowledge base |
| HELP-002 | Knowledge Base Article | All authenticated | Partial | Yes | support.md — knowledge base |
| HELP-003 | AI Concierge Chat | All authenticated | No | Yes | support.md — concierge |
| HELP-004 | Training Module List | V, TL | Partial | Primary | support.md — training |
| HELP-005 | Training Module Content | V, TL | Partial | Primary | support.md — training |
| HELP-006 | Training Quiz | V, TL | Partial | Primary | support.md — training |
| HELP-007 | Certification Status | V, TL, VC | No | Yes | support.md — training |
| HELP-008 | Training Content Editor | OA, VC | No | Desktop | support.md — training |

## 17. Supporter Portal

| ID | Screen | Personas | Offline | Mobile | Spec ref |
|----|--------|----------|---------|--------|----------|
| SUP-001 | Supporter Home | S | No | Primary | fundraising.md — donor portal |
| SUP-002 | Donation History | S | No | Primary | fundraising.md — donor portal |
| SUP-003 | Donation Receipt View | S | No | Primary | fundraising.md — receipts |
| SUP-004 | Recurring Donation Management | S | No | Primary | fundraising.md — donor portal |
| SUP-005 | Payment Method Update | S | No | Primary | fundraising.md — donor portal |
| SUP-006 | Supporter Profile | S | No | Primary | users.md — supporter |
| SUP-007 | Communication Preferences | S | No | Primary | compliance.md — consent |
| SUP-008 | My Events | S | No | Primary | workflows.md — events |
| SUP-009 | Year-End Statement Download | S | No | Primary | fundraising.md — statements |

## 18. Alliance

| ID | Screen | Personas | Offline | Mobile | Spec ref |
|----|--------|----------|---------|--------|----------|
| ALLY-001 | Alliance Dashboard | OA | No | Yes | workflows.md — alliance |
| ALLY-002 | Alliance Member List | OA | No | Desktop | workflows.md — alliance |
| ALLY-003 | Affiliation Request Form | OA | No | Desktop | workflows.md — alliance |
| ALLY-004 | Affiliation Request Queue | OA | No | Desktop | workflows.md — alliance |
| ALLY-005 | Sharing Configuration | OA | No | Desktop | workflows.md — alliance |
| ALLY-006 | Joint Campaign Setup | OA | No | Desktop | workflows.md — alliance |
| ALLY-007 | Shared Analytics | OA | No | Desktop | workflows.md — alliance |
| ALLY-008 | GOTV Alliance Coordination | OA, FiD | No | Desktop | gotv.md — alliance GOTV |

## 19. Public Pages (No Auth Required)

| ID | Screen | Personas | Offline | Mobile | Spec ref |
|----|--------|----------|---------|--------|----------|
| PUB-001 | Candidate Profile Page | Public | No | Primary | press.md — public profiles |
| PUB-002 | Organization Profile Page | Public | No | Primary | press.md — public profiles |
| PUB-003 | Donation Form (Hosted) | Public | No | Primary | fundraising.md — forms |
| PUB-004 | Event Page | Public | No | Primary | workflows.md — events |
| PUB-005 | Action Page (Letter/Email) | Public | No | Primary | workflows.md — activism |
| PUB-006 | Petition Page | Public | No | Primary | workflows.md — activism |
| PUB-007 | Volunteer Signup Page | Public | No | Primary | workflows.md — volunteer onboarding |
| PUB-008 | Media Kit Page | Public | No | Primary | press.md — media kit |

## 20. Authentication

| ID | Screen | Personas | Offline | Mobile | Spec ref |
|----|--------|----------|---------|--------|----------|
| AUTH-001 | Login (Passkey) | All | No | Primary | security.md — auth |
| AUTH-002 | Login Fallback (Magic Link / SMS OTP) | All | No | Primary | security.md — auth |
| AUTH-003 | Account Recovery (Trusted Contact) | All | No | Primary | security.md — recovery |
| AUTH-004 | Passkey Registration | All | No | Primary | security.md — auth |
| AUTH-005 | Trusted Contact Setup | All | No | Yes | security.md — recovery |
| AUTH-006 | Device Authorization | All | No | Yes | security.md — multi-device |
| AUTH-007 | Session Expired / Re-authenticate | All | No | Primary | security.md — sessions |

## 21. User Profile & Preferences

| ID | Screen | Personas | Offline | Mobile | Spec ref |
|----|--------|----------|---------|--------|----------|
| PROF-001 | Personal Profile | All authenticated | No | Yes | users.md — profiles |
| PROF-002 | Notification Preferences | All authenticated | No | Yes | messaging.md — notifications |
| PROF-003 | Security Settings (Personal) | All authenticated | No | Yes | security.md — passkeys |
| PROF-004 | Language Preference | All authenticated | No | Yes | geography.md — localization |
| PROF-005 | Tenant Switcher | Multi-tenant users | No | Yes | users.md — federation |

## 22. Content Operations

| ID | Screen | Personas | Offline | Mobile | Spec ref |
|----|--------|----------|---------|--------|----------|
| CONTENT-001 | Content Dashboard | OA, CD | No | Yes | press.md — content pipeline |
| CONTENT-002 | Content Review | OA, CD | No | Desktop | press.md — review rounds |
| CONTENT-003 | Approval Queue | OA, CD, C | No | Yes | press.md — review rounds |
| CONTENT-004 | Approval | OA, CD, C | No | Yes | press.md — review rounds |

## Summary

| Feature Area | Screen Count | Offline Screens | Mobile-Primary Screens |
|-------------|-------------|-----------------|----------------------|
| Dashboards | 11 | 0 | 0 |
| CRM / People | 15 | 1 | 0 |
| Canvassing | 14 | 6 | 6 |
| Phone Banking | 7 | 0 | 3 |
| Voter Registration | 6 | 2 | 2 |
| Fundraising | 20 | 1 | 1 |
| Communications | 10 | 0 | 0 |
| Social Media | 6 | 0 | 0 |
| Events | 10 | 1 | 2 |
| Activism | 9 | 0 | 2 |
| Press & Media | 16 | 0 | 0 |
| GOTV / Election Day | 23 | 3 | 6 |
| Messaging | 14 | 7 | 5 |
| Settings & Admin | 22 | 0 | 0 |
| Onboarding Wizards | 8 | 0 | 1 |
| Support & Help | 8 | 3 | 3 |
| Supporter Portal | 9 | 0 | 9 |
| Alliance | 8 | 0 | 0 |
| Public Pages | 8 | 0 | 8 |
| Authentication | 7 | 0 | 5 |
| User Profile | 5 | 0 | 0 |
| Content Operations | 4 | 0 | 0 |
| **Total** | **240** | **24** | **53** |

The platform has approximately **240 distinct screens**, of which **24 work offline** and **53 are mobile-primary** (designed primarily for phone use). The remaining screens work on mobile but are designed desktop-first (complex configuration, data tables, builders).

<!-- REVISIT: This inventory will grow as implementation reveals sub-screens and modal flows not captured at this level of analysis. The screen IDs provide a stable reference system for additions. -->
