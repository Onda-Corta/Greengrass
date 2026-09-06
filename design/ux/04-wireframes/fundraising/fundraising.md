# Fundraising Wireframes

## Purpose

Fundraising is the financial engine of the platform. These wireframes cover the admin-side screens used by the Finance Director and Org Admin to manage donations, build forms, track pledges, process refunds, handle cash, monitor compliance, run A/B tests, configure alliance splits, and manage payment processors.

The core UX challenge: fundraising touches money, compliance, and cross-org allocation — every screen must balance power with auditability. Actions are logged, amounts are precise, and destructive operations (refunds, cancellations) require explicit confirmation.

The supporter-facing donation experience (public donation form, portal home, donation history, recurring management, receipts, year-end statements) is wireframed in `supporter/supporter-portal.md`. This document covers admin-side screens only, with cross-references where the two overlap.

## Scope

| ID | Screen | Personas | Offline | Mobile | Section |
|----|--------|----------|---------|--------|---------|
| FUND-001 | Donation List | OA, FD | No | Yes | Donations |
| FUND-002 | Donation Detail | OA, FD | No | Yes | Donations |
| FUND-003 | Donation Form Builder | OA, FD | No | Desktop | Forms |
| FUND-004 | Donation Form Preview | OA, FD | No | Yes | Forms |
| FUND-005 | Donation Form — Public (Hosted) | S, Public | No | Primary | Forms (cross-ref) |
| FUND-006 | Donation Form — Embed Config | OA, FD | No | Desktop | Forms |
| FUND-007 | Recurring Donation Management | OA, FD | No | Desktop | Recurring |
| FUND-008 | Pledge Management | OA, FD | No | Desktop | Pledges |
| FUND-009 | Refund Processing | OA, FD | No | Desktop | Refunds |
| FUND-010 | Cash Donation Recording | OA, FD, V | Partial | Primary | Cash |
| FUND-011 | Cash Reconciliation | OA, FD | No | Desktop | Cash |
| FUND-012 | Compliance Flag Review | OA, FD | No | Desktop | Compliance |
| FUND-013 | A/B Test Setup | OA, FD | No | Desktop | A/B Testing |
| FUND-014 | A/B Test Results | OA, FD | No | Desktop | A/B Testing |
| FUND-015 | Alliance Split Configuration | OA, FD | No | Desktop | Alliance |
| FUND-016 | Alliance Fundraising Report | OA, FD | No | Desktop | Alliance |
| FUND-017 | Payment Processor Configuration | OA | No | Desktop | Settings |
| FUND-018 | Fundraising Campaign List | OA, FD | No | Yes | Campaigns |
| FUND-019 | Fundraising Campaign Create/Edit | OA, FD | No | Desktop | Campaigns |
| FUND-020 | Year-End Statement Generator | OA, FD | No | Desktop | Statements |

## Finance Director Navigation Context

The Finance Director's sidebar organizes fundraising into a flat structure under a single "Fundraising" section:

```
OVERVIEW
  Dashboard           → DASH-003

FUNDRAISING
  Donations           → FUND-001
  Forms               → form list (within FUND-003)
  Campaigns           → FUND-018
  Recurring           → FUND-007
  Pledges             → FUND-008
  Refunds             → FUND-009
  Cash                → FUND-010 list / FUND-011
  Compliance Flags    → FUND-012
  A/B Tests           → FUND-013 list / FUND-014
  Alliance Splits     → FUND-015
  Payment Processors  → FUND-017
  Statements          → FUND-020

PEOPLE
  Donors              → CRM-001 (filtered to donor tag)
  Segments            → CRM-005

MESSAGING
  Messages            → messaging screens
```

---

## FUND-001: Donation List

The primary browse screen for all donations. Answers "what money came in?" with filtering, search, and export.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Donations                                    [Export ▾]  [+ Record Cash]   │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Summary Bar                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │
│  │ Today       │  │ This Week   │  │ This Month  │  │ This Year   │       │
│  │ $2,340      │  │ $14,780     │  │ $52,100     │  │ $347,200    │       │
│  │ 18 gifts    │  │ 96 gifts    │  │ 412 gifts   │  │ 2,847 gifts │       │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘       │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ 🔍 Search by donor name, email, or transaction ID...                │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  Filters:  [Type ▾]  [Status ▾]  [Method ▾]  [Amount ▾]  [Date Range ▾]   │
│            [Campaign ▾]  [Source ▾]                                          │
│                                                                              │
│  ☐  Donor               Amount    Type       Method     Date       Status   │
│  ─────────────────────────────────────────────────────────────────────────   │
│  ☐  María García        $100.00   One-time   Card       Mar 3      ✓ Comp   │
│  ☐  Anonymous           $50.00    Recurring  Card       Mar 3      ✓ Comp   │
│  ☐  Carlos Ruiz         $250.00   One-time   Transfer   Mar 2      ◷ Pend   │
│  ☐  Lucía Fernández     $25.00    Recurring  Card       Mar 2      ✓ Comp   │
│  ☐  Pedro Martínez      $500.00   Pledge     Cash       Mar 2      ✓ Comp   │
│  ☐  Anonymous           $75.00    One-time   M-Pesa     Mar 1      ✓ Comp   │
│  ☐  ⚠ Raj Patel         $1,000    One-time   Card       Mar 1      ⚑ Flag   │
│  ☐  Amina Diallo        $30.00    Recurring  Card       Mar 1      ✓ Comp   │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│  Showing 1-50 of 2,847   ◀ 1  2  3  ... 57 ▶                               │
│                                                                              │
│  Bulk actions: [Mark Reviewed]  [Export Selected]                            │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Mobile

```
┌────────────────────────────┐
│  Donations            [⋮]  │
├────────────────────────────┤
│                            │
│  Today $2,340 · 18 gifts   │
│                            │
│  🔍 Search...              │
│  [Filters ▾]               │
│                            │
│  ┌──────────────────────┐  │
│  │ María García         │  │
│  │ $100 · One-time      │  │
│  │ Card · Mar 3    ✓    │  │
│  ├──────────────────────┤  │
│  │ Anonymous            │  │
│  │ $50 · Recurring      │  │
│  │ Card · Mar 3    ✓    │  │
│  ├──────────────────────┤  │
│  │ Carlos Ruiz          │  │
│  │ $250 · One-time      │  │
│  │ Transfer · Mar 2  ◷  │  │
│  ├──────────────────────┤  │
│  │ ⚠ Raj Patel          │  │
│  │ $1,000 · One-time    │  │
│  │ Card · Mar 1    ⚑    │  │
│  └──────────────────────┘  │
│                            │
│  Load more...              │
└────────────────────────────┘
```

### Filter Options

| Filter | Options |
|--------|---------|
| Type | One-time, Recurring, Pledge fulfillment, Cash |
| Status | Completed, Pending, Failed, Refunded, Flagged |
| Method | Card, Bank transfer, M-Pesa, Cash, Other |
| Amount | Custom range (min–max) |
| Date Range | Today, This week, This month, Custom |
| Campaign | All campaigns + "No campaign" |
| Source | Online form, Phone bank, Canvassing, Event, Direct, Import |

### Interaction

- **Row click** → opens FUND-002 Donation Detail
- **Flagged row** (⚑): highlighted with warning background, flag icon. Click → detail with compliance info
- **Export dropdown**: CSV, Excel, PDF. Respects current filters. Audit-logged
- **"+ Record Cash"** → opens FUND-010 Cash Donation Recording
- **Bulk actions**: appear when checkboxes are selected
- **Summary bar**: updates in real time as filters change

### States

- **Empty**: "No donations yet. Create a donation form to start accepting contributions." [Create Form]
- **Filtered empty**: "No donations match these filters." [Clear Filters]
- **Loading**: Skeleton rows with shimmer

---

## FUND-002: Donation Detail

Full record view of a single donation. Answers "what happened with this gift?" — the complete transaction lifecycle.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ← Donations    Donation #TXN-2024-00847                    [Refund]  [⋮]  │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────────────────────────────────┬──────────────────────────────────────┐   │
│  │                                │                                      │   │
│  │  Donation Summary              │  Donor                               │   │
│  │  ──────────────────            │  ──────                              │   │
│  │                                │                                      │   │
│  │  Amount          $100.00       │  María García                        │   │
│  │  Processing fee  −$3.20        │  maria.garcia@email.com              │   │
│  │  Net amount      $96.80        │  +1 (787) 555-0142                   │   │
│  │                                │                                      │   │
│  │  Type            One-time      │  123 Calle Sol, San Juan PR          │   │
│  │  Method          Visa ••4821   │                                      │   │
│  │  Status          ✓ Completed   │  Donor since: Jan 2024               │   │
│  │  Date            Mar 3, 2026   │  Total given: $1,450 (12 gifts)      │   │
│  │  Time            2:34 PM AST   │                                      │   │
│  │                                │  [View Contact →]                    │   │
│  │  Campaign        Spring Drive  │                                      │   │
│  │  Source          Online form   │                                      │   │
│  │  Form            Main website  │                                      │   │
│  │  Designation     General fund  │                                      │   │
│  │                                │                                      │   │
│  │  Fee covered     Yes (+$3.20)  │                                      │   │
│  │  Currency        USD           │                                      │   │
│  │  Processor ref   ch_3Mx...     │                                      │   │
│  │                                │                                      │   │
│  └────────────────────────────────┴──────────────────────────────────────┘   │
│                                                                              │
│  Compliance                                                                  │
│  ──────────                                                                  │
│  Employer: Acme Corp    Occupation: Software Engineer                        │
│  Contribution limit check: ✓ Within limits ($1,450 of $5,000 max)           │
│  Flags: None                                                                 │
│                                                                              │
│  ──────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Audit Trail                                                                 │
│  ───────────                                                                 │
│  Mar 3, 2:34 PM   Donation received via online form                         │
│  Mar 3, 2:34 PM   Payment processed (Stripe: ch_3Mx...)                     │
│  Mar 3, 2:34 PM   Receipt emailed to maria.garcia@email.com                 │
│  Mar 3, 2:35 PM   Contact record updated (CRM-002 #4782)                   │
│  Mar 3, 2:35 PM   Thank-you email queued                                    │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Mobile

```
┌────────────────────────────┐
│  ← Donations          [⋮]  │
├────────────────────────────┤
│                            │
│  $100.00                   │
│  ✓ Completed · Mar 3       │
│                            │
│  ─────────────────────     │
│                            │
│  María García              │
│  maria.garcia@email.com    │
│  [View Contact →]          │
│                            │
│  ─────────────────────     │
│                            │
│  Type       One-time       │
│  Method     Visa ••4821    │
│  Net        $96.80         │
│  Campaign   Spring Drive   │
│  Source     Online form    │
│                            │
│  ─────────────────────     │
│                            │
│  Compliance                │
│  Within limits             │
│  ($1,450 of $5,000 max)   │
│                            │
│  ─────────────────────     │
│                            │
│  ▸ Audit Trail (5 events)  │
│                            │
│  ─────────────────────     │
│                            │
│  [Refund This Donation]    │
│                            │
└────────────────────────────┘
```

### Flagged Donation Variant

When a donation has compliance flags, the detail view adds a prominent flag section:

```
│  ⚠ Compliance Flags                                                         │
│  ────────────────────                                                        │
│                                                                              │
│  ⚠ Velocity alert: 3 donations from this donor in 24 hours                  │
│    Total in window: $2,750                                                   │
│    Previous: $1,000 (Mar 1, 1:12 PM), $750 (Mar 1, 6:45 PM)               │
│                                                                              │
│  Actions:  [✓ Approve — Mark Reviewed]  [↩ Refund]  [⚑ Escalate]           │
│                                                                              │
│  Notes                                                                       │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Add a note about this review decision...                            │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│  Required before Approve or Refund                                           │
```

### Interaction

- **Refund button** → opens FUND-009 Refund Processing pre-filled with this donation
- **"View Contact"** → navigates to CRM-002 for the donor
- **Flagged actions** require a note before Approve or Refund
- **Audit trail**: read-only, auto-generated, includes all system events
- **Overflow menu** (⋮): Resend receipt, Download receipt PDF, View in processor dashboard (external link)

### Multi-Currency Variant

When the donation was in a non-settlement currency, the summary shows both:

```
│  Amount          KES 12,500       │
│  (Converted)     $96.15 @ 130.01 │
│  Processing fee  −$3.08           │
│  Net amount      $93.07           │
│  Currency        KES → USD        │
│  Rate locked     Mar 3, 2:34 PM  │
```

---

## FUND-003: Donation Form Builder

Split-pane builder for creating and editing donation forms. The form builder configures what donors see on the public hosted page (FUND-005) or embedded widget (FUND-006).

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ← Forms    Edit: Spring Campaign Form                [Preview]  [Publish]  │
├────────────────────────────────┬─────────────────────────────────────────────┤
│                                │                                             │
│  FORM SETTINGS                 │  Live Preview                               │
│  ─────────────                 │  ─────────────                              │
│                                │                                             │
│  Form name *                   │  ┌───────────────────────────────────────┐  │
│  ┌──────────────────────────┐  │  │                                       │  │
│  │ Spring Campaign Form     │  │  │  🌿 Partido Verde                     │  │
│  └──────────────────────────┘  │  │                                       │  │
│                                │  │  Support our Spring Campaign           │  │
│  Internal description          │  │                                       │  │
│  ┌──────────────────────────┐  │  │  Your contribution makes a            │  │
│  │ Primary form for spring  │  │  │  difference in our community.         │  │
│  └──────────────────────────┘  │  │                                       │  │
│                                │  │  ┌─────┐ ┌─────┐ ┌──────┐ ┌─────┐   │  │
│  ▾ AMOUNTS                     │  │  │ $25 │ │ $50 │ │[$100]│ │$250 │   │  │
│  ──────────                    │  │  └─────┘ └─────┘ └──────┘ └─────┘   │  │
│                                │  │  ┌─────┐ ┌───────┐                   │  │
│  Suggested amounts *           │  │  │$500 │ │ Other │                   │  │
│  ┌──────────────────────────┐  │  │  └─────┘ └───────┘                   │  │
│  │ 25, 50, 100, 250, 500   │  │  │                                       │  │
│  └──────────────────────────┘  │  │  ☐ Make this monthly                  │  │
│                                │  │                                       │  │
│  Default amount                │  │  ☐ I'd like to cover the              │  │
│  ┌──────────────────────────┐  │  │    processing fee (+$3.20)            │  │
│  │ 100                      │  │  │                                       │  │
│  └──────────────────────────┘  │  │  First Name *    Last Name *          │  │
│                                │  │  ┌──────────┐   ┌──────────┐         │  │
│  Min / Max                     │  │  │          │   │          │         │  │
│  ┌──────┐  ┌──────┐           │  │  └──────────┘   └──────────┘         │  │
│  │ 5    │  │ 5000 │           │  │                                       │  │
│  └──────┘  └──────┘           │  │  Email *                               │  │
│                                │  │  ┌──────────────────────┐             │  │
│  ☑ Allow custom amount         │  │  │                      │             │  │
│  ☑ Show recurring option       │  │  └──────────────────────┘             │  │
│  ☑ Show fee pass-through       │  │                                       │  │
│                                │  │        [Donate $100]                   │  │
│  ▾ DONOR FIELDS                │  │                                       │  │
│  ──────────────                │  └───────────────────────────────────────┘  │
│                                │                                             │
│  Required:                     │  Device: [Desktop ▾]  Lang: [Español ▾]    │
│  ☑ First name                  │                                             │
│  ☑ Last name                   │                                             │
│  ☑ Email                       │                                             │
│  ☐ Phone                       │                                             │
│                                │                                             │
│  Conditional (if jurisdiction  │                                             │
│  requires):                    │                                             │
│  ☑ Address                     │                                             │
│  ☑ Employer                    │                                             │
│  ☑ Occupation                  │                                             │
│                                │                                             │
│  ▸ APPEARANCE                  │                                             │
│  ▸ PAYMENT METHODS             │                                             │
│  ▸ CONFIRMATION                │                                             │
│  ▸ ADVANCED                    │                                             │
│                                │                                             │
└────────────────────────────────┴─────────────────────────────────────────────┘
```

### Collapsed Sections Detail

**APPEARANCE:**
- Hero heading text (rich text)
- Body text (rich text)
- Hero image (upload or URL)
- Button text (default: "Donate {amount}")
- Button color (defaults to tenant primary)
- Background color
- Language (multi-select from tenant's enabled languages)

**PAYMENT METHODS:**
- Checkboxes per available method, determined by the configured processor(s)
- Card (always available if processor connected)
- Bank transfer (if processor supports)
- M-Pesa (if Kenya processor connected)
- Each method shows the processor it routes to

**CONFIRMATION:**
- Thank-you page heading
- Thank-you page body text
- Redirect URL (optional — redirect after donation instead of showing thank-you page)
- Receipt email template (select from templates)

**ADVANCED:**
- Campaign assignment (select fundraising campaign)
- Designation / fund (free text or select from org-defined list)
- UTM tracking (auto-captured from URL params)
- A/B test enrollment (link to FUND-013)
- Form slug (URL path for hosted version)

### Interaction

- **Live preview**: updates as settings change, no save required to see changes
- **Device toggle**: switches preview between desktop and mobile widths
- **Language toggle**: switches preview to show the form in selected language
- **Publish**: if form is new, shows confirmation dialog with hosted URL. If existing, applies changes immediately with "Changes published" toast
- **Preview button**: opens FUND-004 in new tab (full-page preview)
- **Saving**: auto-saves draft. Explicit Publish required to make changes live
- **Validation**: form name required, at least one suggested amount, at least one payment method

### States

- **New form**: all fields empty, preview shows placeholder
- **Published form**: "Published" badge next to form name, last-published timestamp
- **Draft changes**: "Unpublished changes" warning badge

---

## FUND-004: Donation Form Preview

Full-page preview of a donation form as donors will see it. Accessed from the builder's Preview button.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ⚠ PREVIEW MODE — This form is not live    [← Back to Builder]  [Publish]  │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                    (Full rendering of the public donation form               │
│                     as it will appear to donors — identical                  │
│                     to FUND-005 / supporter-portal.md public                │
│                     donation page, but with preview banner)                  │
│                                                                              │
│                    Form interactions work (amount selection,                  │
│                    field validation) but payment submission                   │
│                    shows "This is a preview" instead of                       │
│                    processing.                                               │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- Form fields are interactive (validation fires, amounts toggle)
- Submit button shows "Preview — no payment will be processed" tooltip
- **"Back to Builder"** returns to FUND-003
- **Publish** publishes from preview context
- Mobile preview: accessible via the builder's device toggle or by opening the preview URL on a mobile device

---

## FUND-005: Donation Form — Public (Hosted)

The public-facing donation page. For web donations, this is where the donor starts.

> **Cross-reference:** The full wireframe for this screen is in `supporter/supporter-portal.md` — "Public Donation Page (Pre-Auth)". It covers the tenant-branded donation form, amount selection, donor fields, payment method selection, and the confirmation/receipt flow.

This screen lives at `/donate/:form-slug` and uses the `(public)` layout group (no app shell, no login required).

---

## FUND-006: Donation Form — Embed Config

Configuration screen for embedding a donation form on external websites. Generates HTML embed code and provides customization options.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ← Forms    Embed: Spring Campaign Form                                     │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Embed Options                                                               │
│  ─────────────                                                               │
│                                                                              │
│  Embed type                                                                  │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐                │
│  │  [● Inline]    │  │  ○ Modal       │  │  ○ Button      │                │
│  │  Form renders  │  │  Opens in      │  │  "Donate" btn  │                │
│  │  directly on   │  │  overlay when  │  │  opens modal   │                │
│  │  the page      │  │  triggered     │  │  on click      │                │
│  └────────────────┘  └────────────────┘  └────────────────┘                │
│                                                                              │
│  Appearance overrides                                                        │
│  ☐ Hide header image                                                         │
│  ☐ Hide header text (amount buttons only)                                    │
│  ☐ Match host page background (transparent)                                  │
│                                                                              │
│  Allowed domains *                                                           │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ partidoverde.org, campaign2026.pr                                   │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│  Security: embed will only render on these domains                           │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Embed Code                                                                  │
│  ──────────                                                                  │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ <script src="https://app.greengrass.io/embed/v1.js"                 │   │
│  │   data-form="spring-campaign"                                       │   │
│  │   data-type="inline"                                                │   │
│  │   data-tenant="partido-verde">                                      │   │
│  │ </script>                                                           │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│  [Copy Code]                                                                 │
│                                                                              │
│  Preview                                                                     │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  (Rendered preview of the embed as it will appear on a host page)   │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- **Embed type**: radio cards. Code snippet updates in real time as type changes
- **Copy Code**: copies to clipboard with confirmation toast
- **Allowed domains**: comma-separated. Embed script validates referrer at runtime
- **Preview**: live rendering of the selected embed type
- Domain field required — empty domain list means embed won't render anywhere

---

## FUND-018: Fundraising Campaign List

Browse and manage fundraising campaigns. Campaigns are containers that group donation forms, track goals, and measure performance.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Fundraising Campaigns                                    [+ New Campaign]  │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  [Active]  [Upcoming]  [Ended]  [All]                                       │
│                                                                              │
│  Campaign              Goal         Raised       Progress   Period           │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Spring Drive 2026     $50,000      $32,100      ████████░░ 64%             │
│  Online + events       412 donors   $78 avg      Ends Apr 15                │
│                                                                              │
│  Monthly Sustainer     $5,000/mo    $4,200/mo    ████████░░ 84%             │
│  Recurring focus       168 active   $25 avg      Ongoing                    │
│                                                                              │
│  Year-End Appeal       $25,000      $25,780      ██████████ 103% ✓          │
│  Email + SMS           198 donors   $130 avg     Ended Dec 31               │
│                                                                              │
│  Launch Fund           $10,000      $1,200       █░░░░░░░░░ 12%             │
│  Seed funding          15 donors    $80 avg      Starts Apr 1               │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│  Showing 1-4 of 4                                                            │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Mobile

```
┌────────────────────────────┐
│  Campaigns            [+]  │
├────────────────────────────┤
│                            │
│  [Active] [Upcoming] [All] │
│                            │
│  ┌──────────────────────┐  │
│  │ Spring Drive 2026    │  │
│  │ $32,100 of $50,000   │  │
│  │ ████████░░ 64%       │  │
│  │ 412 donors · Apr 15  │  │
│  ├──────────────────────┤  │
│  │ Monthly Sustainer    │  │
│  │ $4,200 of $5,000/mo  │  │
│  │ ████████░░ 84%       │  │
│  │ 168 active · Ongoing │  │
│  ├──────────────────────┤  │
│  │ Year-End Appeal  ✓   │  │
│  │ $25,780 of $25,000   │  │
│  │ ██████████ 103%      │  │
│  │ 198 donors · Done    │  │
│  └──────────────────────┘  │
│                            │
└────────────────────────────┘
```

### Interaction

- **Row click** → opens FUND-019 Campaign Create/Edit in view mode
- **Status tabs**: filter by campaign lifecycle. Counts shown in tab labels
- **Progress bar**: green when on track (>50% of goal with >50% of time remaining), yellow when behind, full green with checkmark when goal met
- **"+ New Campaign"** → opens FUND-019

### States

- **Empty**: "No fundraising campaigns yet. Campaigns help you set goals and track progress for fundraising drives." [Create Campaign]

---

## FUND-019: Fundraising Campaign Create/Edit

Create or configure a fundraising campaign.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ← Campaigns    New Fundraising Campaign                          [Save]    │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Campaign Details                                                            │
│  ────────────────                                                            │
│                                                                              │
│  Campaign name *                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Spring Drive 2026                                                   │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  Description                                                                 │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Primary fundraising push for spring campaign activities...          │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  Goal                                                                        │
│  ┌────────────────┐  Currency ┌──────┐                                      │
│  │ 50000          │           │ USD ▾│                                      │
│  └────────────────┘           └──────┘                                      │
│                                                                              │
│  Period                                                                      │
│  ┌────────────────┐  to  ┌────────────────┐   ☐ Ongoing (no end date)      │
│  │ Mar 1, 2026    │      │ Apr 15, 2026   │                                 │
│  └────────────────┘      └────────────────┘                                 │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  ▸ Donation Forms (2 linked)                                                 │
│  ▸ Linked Communications (5 sends)                                           │
│  ▸ Alliance Split                                                            │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Performance (read-only in edit mode)                                        │
│  ─────────────                                                               │
│  Total raised: $32,100 · 412 donors · Avg: $78 · Recurring: 23%            │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Collapsed Sections

**Donation Forms:** List of linked forms with "Link Form" button. Each form shows its name, type (hosted/embedded), and donation count.

**Linked Communications:** Read-only list of email/SMS sends that reference this campaign's donation forms. Shows send date, channel, audience size, and donation attribution.

**Alliance Split:** If the org is in an alliance, option to enable alliance split for this campaign. Links to FUND-015 for configuration.

### Interaction

- **Save**: validates required fields, saves campaign
- **Delete** (edit mode, overflow menu): confirmation dialog, only if no donations received. If donations exist, campaign can be archived but not deleted
- **Ongoing checkbox**: disables end date field
- **Performance section**: shown only in edit mode (existing campaign), read-only

---

## FUND-007: Recurring Donation Management

Admin view of all recurring donation schedules. Answers "what's our recurring revenue health?"

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Recurring Donations                                           [Export ▾]   │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Summary                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ Active       │  │ MRR          │  │ Avg Amount   │  │ Churn (30d)  │   │
│  │ 168          │  │ $4,200       │  │ $25          │  │ 3.2%         │   │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                                              │
│  [Active]  [Paused]  [Failed]  [Cancelled]  [All]                           │
│                                                                              │
│  🔍 Search donor name or email...                                           │
│  Filters: [Frequency ▾]  [Amount Range ▾]  [Payment Method ▾]              │
│                                                                              │
│  Donor               Amount    Frequency  Method      Next Charge  Status   │
│  ─────────────────────────────────────────────────────────────────────────   │
│  Lucía Fernández     $25.00    Monthly    Visa ••41   Mar 15       Active   │
│  Anonymous           $50.00    Monthly    MC ••82     Mar 12       Active   │
│  Carlos Ruiz         $100.00   Quarterly  Transfer    Apr 1        Active   │
│  Pedro Martínez      $10.00    Monthly    Visa ••63   —            Paused   │
│  Amina Diallo        $30.00    Monthly    Visa ••17   Mar 8        ⚠ Retry  │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│  Showing 1-50 of 168                                                         │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Status Definitions

| Status | Meaning | Visual |
|--------|---------|--------|
| Active | Charges processing normally | Green text |
| Paused | Donor paused (self-service or admin) | Grey text, italic |
| Retry | Last charge failed, smart retry in progress (up to 4 attempts over 14 days) | Warning icon, amber |
| Failed | All retry attempts exhausted | Red text |
| Cancelled | Donor or admin cancelled | Strikethrough |

### Row Detail Panel

Clicking a row opens a right-side detail panel:

```
┌──────────────────────────────────────┐
│  Lucía Fernández                     │
│  lucia.fernandez@email.com           │
│  [View Contact →]                    │
│                                      │
│  ──────────────────                  │
│                                      │
│  Schedule                            │
│  Amount:     $25.00 / month          │
│  Method:     Visa ••4821             │
│  Started:    Jan 15, 2024            │
│  Next:       Mar 15, 2026            │
│  Total paid: $325 (13 charges)       │
│                                      │
│  ──────────────────                  │
│                                      │
│  Charge History                      │
│  Feb 15  $25.00  ✓ Completed         │
│  Jan 15  $25.00  ✓ Completed         │
│  Dec 15  $25.00  ✓ Completed         │
│  Nov 15  $25.00  ⚠ Retry → ✓        │
│  ...                                 │
│                                      │
│  ──────────────────                  │
│                                      │
│  Admin Actions                       │
│  [Pause]  [Cancel]                   │
│  Both require confirmation dialog    │
│                                      │
└──────────────────────────────────────┘
```

### Interaction

- **Row click** → opens detail panel (desktop) or navigates to detail (mobile)
- **Export**: CSV with all recurring data, respects current filters
- **Admin Pause/Cancel**: confirmation dialog with reason field. Logged to audit trail. Pause is reversible (Resume button appears). Cancel sends notification to donor
- **Retry status row**: shows retry attempt count ("Retry 2 of 4, next attempt Mar 9")

### States

- **Empty**: "No recurring donations yet. When donors choose recurring giving on your donation forms, they'll appear here."

---

## FUND-008: Pledge Management

Track pledges made during phone banking, canvassing, or events that haven't yet been fulfilled.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Pledges                                          [Export]  [+ New Pledge]  │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Summary                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ Outstanding  │  │ Value        │  │ Fulfilled    │  │ Lapsed       │   │
│  │ 47           │  │ $8,350       │  │ 62%          │  │ 12%          │   │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                                              │
│  [Pending]  [Reminded]  [Fulfilled]  [Lapsed]  [All]                        │
│                                                                              │
│  Donor               Amount    Source         Pledged     Status    Actions  │
│  ─────────────────────────────────────────────────────────────────────────   │
│  María García        $200      Phone bank     Feb 28      Pending   [⋮]     │
│  Carlos Ruiz         $100      Canvassing     Feb 25      Reminded  [⋮]     │
│  Raj Patel           $500      Event          Feb 20      Pending   [⋮]     │
│  Amina Diallo        $50       Phone bank     Feb 15      Reminded  [⋮]     │
│  Pedro Martínez      $150      Canvassing     Feb 10      Fulfilled [⋮]     │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│  Showing 1-47 of 47                                                          │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Pledge Lifecycle

```
  Created ──→ Pending ──→ Reminded ──→ Fulfilled
                │                         ↑
                │    (donor pays)─────────┘
                │
                └──→ Lapsed (after configurable grace period)
```

### Row Actions Menu (⋮)

- **Send Reminder**: triggers reminder via configured channel (email, SMS, WhatsApp). Button disabled if reminded within last 7 days
- **Record Fulfillment**: links to a received donation, changes status to Fulfilled
- **Mark Lapsed**: manual override, requires note
- **View Contact**: navigates to CRM-002

### Creating a Pledge (+ New Pledge)

```
┌──────────────────────────────────────────────────┐
│  New Pledge                                [Save] │
├──────────────────────────────────────────────────┤
│                                                    │
│  Donor *             [Search or create contact...] │
│  Amount *            ┌────────────────────┐       │
│                      │                    │       │
│                      └────────────────────┘       │
│  Source              [Phone bank ▾]                │
│  Campaign            [Spring Drive ▾]              │
│                                                    │
│  Reminder schedule                                 │
│  ○ Default (7 days, then 14, then 30)              │
│  ○ Custom                                          │
│                                                    │
│  Notes                                             │
│  ┌────────────────────────────────────────────┐   │
│  │                                            │   │
│  └────────────────────────────────────────────┘   │
│                                                    │
└──────────────────────────────────────────────────┘
```

### States

- **Empty**: "No pledges recorded yet. Pledges can be created here, or automatically during phone bank and canvassing shifts."

---

## FUND-009: Refund Processing

Initiate and track refunds. Only Finance Director and Org Admin can refund.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ← Donations    Refund: Donation #TXN-2024-00847              [Process ▾]   │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Original Donation                                                           │
│  ──────────────────                                                          │
│  Donor:    María García                                                      │
│  Amount:   $100.00                                                           │
│  Date:     Mar 3, 2026                                                       │
│  Method:   Visa ••4821                                                       │
│  Status:   ✓ Completed                                                       │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Refund Details                                                              │
│  ──────────────                                                              │
│                                                                              │
│  Refund type                                                                 │
│  ● Full refund ($100.00)                                                     │
│  ○ Partial refund  ┌────────────┐                                           │
│                     │            │                                           │
│                     └────────────┘                                           │
│                                                                              │
│  Reason *                                                                    │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Donor requested refund — duplicate donation                         │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ⓘ Refund will be processed to original payment method (Visa ••4821).       │
│    Processing time: 5–10 business days.                                      │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  ⚠ Alliance Split Impact                                                     │
│  This donation was split across the alliance:                                │
│  · Partido Verde: $60.00 (60%)                                               │
│  · Movimiento Ecologista: $40.00 (40%)                                       │
│  Refund will reverse both allocations.                                       │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  ⓘ This refund does NOT automatically cancel a recurring donation.           │
│    To cancel recurring, go to Recurring Donations.                           │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Process Button Dropdown

- **Process Refund**: submits to payment processor. Confirmation dialog: "Refund $100.00 to Visa ••4821? This cannot be undone."
- **Save as Pending**: saves refund request for review by another admin before processing

### Interaction

- Reached from FUND-002 "Refund" button (pre-fills donation data) or from FUND-001 bulk action
- **Reason field**: required, logged to audit trail
- **Alliance split section**: only shown if donation was split. Shows each org's portion and confirms reversal
- **Cash donation refund**: shows "Cash refunds must be handled manually. Record the refund here for audit purposes." with a "Record Manual Refund" button instead of processor submission
- **Partial refund**: amount field appears, validated against original amount

### Refund History (accessed from Refunds sidebar item)

```
│  Refunded Donations                                            [Export]     │
│                                                                              │
│  Donor               Original   Refunded   Type     Date       Reason       │
│  ─────────────────────────────────────────────────────────────────────────   │
│  María García        $100.00    $100.00    Full     Mar 3      Duplicate     │
│  Carlos Ruiz         $250.00    $75.00     Partial  Feb 28     Overcharge    │
```

---

## FUND-010: Cash Donation Recording

Mobile-first form for recording cash donations at events or in the field. Works offline.

### Mobile (Primary)

```
┌────────────────────────────┐
│  ← Cash Donation           │
├────────────────────────────┤
│                            │
│  Amount *                  │
│  ┌──────────────────────┐  │
│  │ $                    │  │
│  └──────────────────────┘  │
│                            │
│  ─────────────────────     │
│                            │
│  Donor (optional)          │
│                            │
│  ○ Named donor             │
│  ● Anonymous               │
│                            │
│  (If Named:)               │
│  Name                      │
│  ┌──────────────────────┐  │
│  │                      │  │
│  └──────────────────────┘  │
│  Phone or Email            │
│  ┌──────────────────────┐  │
│  │                      │  │
│  └──────────────────────┘  │
│                            │
│  ─────────────────────     │
│                            │
│  Event context             │
│  ┌──────────────────────┐  │
│  │ Rally — Plaza del... │  │
│  └──────────────────────┘  │
│                            │
│  Receipt photo             │
│  ┌──────────────────────┐  │
│  │    📷 Take Photo     │  │
│  │    or tap to upload   │  │
│  └──────────────────────┘  │
│                            │
│  Notes                     │
│  ┌──────────────────────┐  │
│  │                      │  │
│  └──────────────────────┘  │
│                            │
│  Collected by              │
│  You (Ana Reyes)           │
│                            │
│         [Record Cash       │
│          Donation]         │
│                            │
│  ◌ Offline — will sync     │
│    when connected          │
│                            │
└────────────────────────────┘
```

### Desktop

Same form rendered in a centered card (max-width 480px) within the app shell. Used when Finance Director records cash from the office.

### Interaction

- **Amount**: numeric keyboard on mobile, currency formatted
- **Named/Anonymous toggle**: anonymous hides name and contact fields. Jurisdiction rules may require named donor above certain thresholds — warning shown if anonymous exceeds threshold
- **Receipt photo**: uses device camera (Capacitor Camera API). Optional. Stored as attachment on the donation record
- **"Collected by"**: auto-filled with current user, read-only. Chain of custody starts here
- **Offline**: form saves locally, syncs when connected. Shows offline indicator
- **Submit confirmation**: "Cash donation of $[amount] recorded" toast. Returns to previous screen or offers "Record Another"

### Volunteer Access

Volunteers see a simplified version: amount, named/anonymous, event context, photo. No notes, no campaign assignment. The donation enters the reconciliation queue (FUND-011) automatically.

---

## FUND-011: Cash Reconciliation

Finance Director matches recorded cash donations against bank deposits. Answers "does the money we recorded match the money we deposited?"

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Cash Reconciliation                                      [+ Record Batch]  │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Unreconciled: 12 records · $1,340         Reconciled this month: $4,200    │
│                                                                              │
│  ┌───────────────────────────────────┬──────────────────────────────────┐   │
│  │                                   │                                  │   │
│  │  Recorded Cash Donations          │  Bank Deposits                   │   │
│  │  ─────────────────────            │  ─────────────                   │   │
│  │                                   │                                  │   │
│  │  ☐ Mar 3  $50   Ana Reyes        │  Mar 3  $480  Ref: DEP-0312     │   │
│  │    Rally — Plaza del Sol          │  (No linked records yet)         │   │
│  │                                   │                                  │   │
│  │  ☐ Mar 3  $120  Ana Reyes        │  Mar 1  $860  Ref: DEP-0311     │   │
│  │    Rally — Plaza del Sol          │  Linked: 6 records ✓            │   │
│  │                                   │                                  │   │
│  │  ☐ Mar 3  $75   Jorge Vega       │                                  │   │
│  │    Rally — Plaza del Sol          │  [+ Add Deposit]                 │   │
│  │                                   │                                  │   │
│  │  ☑ Mar 2  $200  Miguel Torres    │                                  │   │
│  │    Door-to-door collection        │                                  │   │
│  │                                   │                                  │   │
│  │  ☐ Mar 2  $150  Miguel Torres    │                                  │   │
│  │    Door-to-door collection        │                                  │   │
│  │                                   │                                  │   │
│  │  ─────────────────────            │                                  │   │
│  │  Selected: 1 · $200              │                                  │   │
│  │  [Match to Deposit ▾]            │                                  │   │
│  │                                   │                                  │   │
│  └───────────────────────────────────┴──────────────────────────────────┘   │
│                                                                              │
│  ⚠ Discrepancies                                                             │
│  ─────────────                                                               │
│  DEP-0310 (Feb 28): Deposit $500, Linked records $475. Difference: $25      │
│  [Add Adjustment]  [Add Note]                                                │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- **Two-column layout**: recorded cash on the left, bank deposits on the right
- **Matching workflow**: select one or more cash records (checkboxes) → click "Match to Deposit" → select or create a deposit → records linked
- **"+ Add Deposit"**: manually enter bank deposit reference and amount
- **"+ Record Batch"**: opens a form to record a batch of cash (e.g., "Event envelope: $480, 6 individual records")
- **Discrepancies section**: auto-calculated when linked records don't sum to deposit amount. Adjustments require a note (logged to audit trail)
- **Chain of custody**: clicking a cash record shows the full chain (collector → handoff → deposit)

### States

- **Empty**: "No unreconciled cash donations. All recorded cash has been matched to bank deposits."
- **No deposits**: right column shows "No deposits recorded yet. Add your first bank deposit to start matching."

---

## FUND-012: Compliance Flag Review

Review donations flagged by automated fraud detection rules. Critical for campaign finance compliance.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Compliance Flags                                     [Flag Settings ⚙]     │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                      │
│  │ ⚑ Open       │  │ ✓ Resolved   │  │ Total (30d)  │                      │
│  │ 5            │  │ 23           │  │ 28           │                      │
│  └──────────────┘  └──────────────┘  └──────────────┘                      │
│                                                                              │
│  [Open]  [Resolved]  [All]                                                  │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                                                                      │   │
│  │  ⚠ HIGH — Contribution Limit Approaching                            │   │
│  │  Raj Patel — $1,000 donation on Mar 1                                │   │
│  │  Total this cycle: $4,500 of $5,000 limit                           │   │
│  │  Flagged: Mar 1, 2:34 PM                                            │   │
│  │                                                                      │   │
│  │  [✓ Approve]  [↩ Refund]  [View Donation →]                        │   │
│  │                                                                      │   │
│  ├──────────────────────────────────────────────────────────────────────┤   │
│  │                                                                      │   │
│  │  ⚠ HIGH — Velocity Alert                                            │   │
│  │  Unknown Donor (card ••9182) — 3 donations in 24 hours              │   │
│  │  Amounts: $200, $200, $200 = $600 total                             │   │
│  │  Flagged: Mar 2, 8:15 AM                                            │   │
│  │                                                                      │   │
│  │  [✓ Approve]  [↩ Refund All]  [⛔ Block Card]  [View Donations →]  │   │
│  │                                                                      │   │
│  ├──────────────────────────────────────────────────────────────────────┤   │
│  │                                                                      │   │
│  │  ⚡ MEDIUM — Geographic Mismatch                                     │   │
│  │  Lisa Chen — IP location (California) ≠ billing address (PR)        │   │
│  │  $150 donation on Mar 2                                              │   │
│  │  Flagged: Mar 2, 3:22 PM                                            │   │
│  │                                                                      │   │
│  │  [✓ Approve]  [↩ Refund]  [View Donation →]                        │   │
│  │                                                                      │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  Note required before any action ────────────────────────────────────────   │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Review notes...                                                     │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Flag Types

| Type | Severity | Trigger |
|------|----------|---------|
| Contribution limit approaching | High | Within 10% of jurisdiction max |
| Contribution limit exceeded | Critical | Over jurisdiction max |
| Velocity alert | High | Multiple donations from same source in short window |
| Geographic mismatch | Medium | IP location ≠ billing address |
| Info mismatch | Medium | Name/address variations across donations |
| Known bad actor | Critical | Previously blocked donor/payment method |
| Anonymous threshold | High | Anonymous donation exceeds jurisdiction limit |

### Interaction

- **Actions require note**: the note field at the bottom must have content before Approve, Refund, or Block actions are enabled
- **Approve**: marks flag as resolved, donation proceeds normally. Logged to audit trail
- **Refund**: navigates to FUND-009 pre-filled. Flag resolved on refund completion
- **Block Card**: adds payment method to block list. Confirmation dialog warns this affects future donations
- **Flag Settings** (⚙): navigates to configuration screen for threshold values and automated rules
- **Severity sorting**: Critical flags always sorted first, then High, then Medium

### States

- **Empty (Open tab)**: "No open compliance flags. All flagged donations have been reviewed." ✓
- **Empty (All)**: "No compliance flags in the last 30 days. Your fraud detection rules are configured in Flag Settings."

---

## FUND-013: A/B Test Setup

Configure A/B tests for donation forms to optimize conversion.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ← A/B Tests    New A/B Test                                      [Start]   │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Test name *                                                                 │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Spring form — suggested amounts test                                │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  Base form *                                                                 │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Spring Campaign Form                                           [▾]  │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Variants                                                                    │
│  ─────────                                                                   │
│                                                                              │
│  ┌──────────────────────────────────┬──────────────────────────────────┐   │
│  │  A — Control (50%)               │  B — Variant (50%)               │   │
│  │  ─────────────                   │  ─────────────                   │   │
│  │                                  │                                  │   │
│  │  Amounts: $25, $50, $100,        │  Amounts: $50, $100, $250,       │   │
│  │           $250, $500             │           $500, $1000            │   │
│  │  Default: $100                   │  Default: $250                   │   │
│  │                                  │                                  │   │
│  │  (All other settings from        │  What to vary:                   │   │
│  │   base form)                     │  ☑ Suggested amounts             │   │
│  │                                  │  ☑ Default amount                │   │
│  │                                  │  ☐ Button text                   │   │
│  │                                  │  ☐ Header text                   │   │
│  │                                  │  ☐ Hero image                    │   │
│  │                                  │                                  │   │
│  │                                  │  [Edit Variant →]                │   │
│  └──────────────────────────────────┴──────────────────────────────────┘   │
│                                                                              │
│  Traffic split                                                               │
│  A: [50]%    B: [50]%                                                        │
│                                                                              │
│  Minimum sample size                                                         │
│  ┌────────┐ donations per variant before results are significant             │
│  │ 100    │                                                                  │
│  └────────┘                                                                  │
│                                                                              │
│  Auto-declare winner                                                         │
│  ☑ Automatically switch to winning variant when significance reached         │
│  Metric: ○ Conversion rate  ● Revenue per visitor  ○ Average donation        │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- **Base form**: dropdown of published donation forms. Control variant inherits all settings
- **"Edit Variant"**: opens a subset of the form builder (FUND-003) with only the varied fields editable
- **Traffic split**: numeric fields, must sum to 100%. Slider alternative considered but numeric is more precise
- **Start**: begins the test. Confirmation dialog: "Start A/B test? Traffic to [form name] will be split between variants."
- **Running test**: Start button changes to "Stop Test". Variant settings become read-only. Traffic split can still be adjusted (e.g., to stop sending traffic to a losing variant)

### A/B Test List (accessed from sidebar)

```
│  A/B Tests                                               [+ New Test]       │
│                                                                              │
│  Test                      Form              Status    Winner   Started      │
│  ─────────────────────────────────────────────────────────────────────────   │
│  Amounts test              Spring Campaign    Running   —        Mar 1       │
│  Button color test         Main Website       Done      B        Feb 1       │
│  Header image test         Year-End           Done      A        Jan 15      │
```

---

## FUND-014: A/B Test Results

Results dashboard for a running or completed A/B test.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ← A/B Tests    Amounts Test — Spring Campaign Form         [Stop Test]     │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Status: Running · Started Mar 1 · 18 days                                  │
│                                                                              │
│  ┌──────────────────────────────────┬──────────────────────────────────┐   │
│  │  A — Control                     │  B — Variant                     │   │
│  │  ────────────                    │  ────────────                    │   │
│  │                                  │                                  │   │
│  │  Visitors      1,247             │  Visitors      1,253             │   │
│  │  Donations     89                │  Donations     72                │   │
│  │  Conv. rate    7.1%              │  Conv. rate    5.7%              │   │
│  │  Revenue       $6,230            │  Revenue       $7,920     ★     │   │
│  │  Avg donation  $70               │  Avg donation  $110       ★     │   │
│  │  Rev/visitor   $5.00             │  Rev/visitor   $6.32      ★     │   │
│  │                                  │                                  │   │
│  └──────────────────────────────────┴──────────────────────────────────┘   │
│                                                                              │
│  Statistical Significance                                                    │
│  ────────────────────────                                                    │
│  Revenue per visitor:  B leads by 26%                                        │
│  Confidence: 87% (target: 95%)                                               │
│  Estimated samples needed: ~40 more donations per variant                    │
│  ████████████████████░░░░ 87%                                               │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Daily Breakdown                                                             │
│  ────────────────                                                            │
│  Date       A visits  A conv  A rev    B visits  B conv  B rev               │
│  Mar 18     68        5       $350     72        4       $440                │
│  Mar 17     71        4       $280     65        3       $330                │
│  Mar 16     74        6       $420     70        5       $550                │
│  ...                                                                         │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  [Declare B Winner]  — applies variant B settings to the form permanently   │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- **★ indicators**: mark the leading variant for each metric
- **Confidence bar**: shows progress toward statistical significance
- **"Declare Winner"**: confirmation dialog, applies winning variant's settings to the base form, ends the test. Button enabled when confidence > 90% or manually at any time
- **"Stop Test"**: ends test without declaring a winner. Traffic returns to 100% control
- **Completed test**: shows final results with "Winner: B" badge, date declared, and impact summary

---

## FUND-015: Alliance Split Configuration

Configure how donations are split between alliance member organizations. Requires unanimous consent from all participating orgs.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Alliance Fundraising Splits                              [+ New Split ▾]   │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ⓘ Split changes require approval from all member organizations.            │
│                                                                              │
│  Active Splits                                                               │
│  ──────────────                                                              │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  Spring Drive 2026                                          [Edit]   │   │
│  │  Type: Percentage-based                                              │   │
│  │                                                                      │   │
│  │  Partido Verde              60%     ████████████░░░░░░░░            │   │
│  │  Movimiento Ecologista      25%     █████░░░░░░░░░░░░░░            │   │
│  │  Candidatura Torres         15%     ███░░░░░░░░░░░░░░░░            │   │
│  │                                                                      │   │
│  │  Applied to: Spring Campaign Form, Event Donation Form               │   │
│  │  Disbursement: Immediate                                             │   │
│  │  Status: ✓ Active — Approved by all 3 orgs                          │   │
│  │                                                                      │   │
│  ├──────────────────────────────────────────────────────────────────────┤   │
│  │  General Alliance Fund                                      [Edit]   │   │
│  │  Type: Fixed amount first, then percentage                           │   │
│  │                                                                      │   │
│  │  First $500 → Partido Verde (host org)                               │   │
│  │  Remainder:                                                          │   │
│  │  Partido Verde              40%     ████████░░░░░░░░░░░░            │   │
│  │  Movimiento Ecologista      35%     ███████░░░░░░░░░░░░░            │   │
│  │  Candidatura Torres         25%     █████░░░░░░░░░░░░░░░            │   │
│  │                                                                      │   │
│  │  Applied to: Main Website Form                                       │   │
│  │  Disbursement: Monthly batch                                         │   │
│  │  Status: ✓ Active — Approved by all 3 orgs                          │   │
│  │                                                                      │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  Pending Approval                                                            │
│  ────────────────                                                            │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  Year-End Appeal Split                               [View Details]  │   │
│  │  Proposed by: Movimiento Ecologista · Feb 28                        │   │
│  │  Waiting on: Candidatura Torres                                      │   │
│  │  ◷ Partido Verde ✓  Movimiento ✓  Torres ◷                         │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### New Split / Edit Form

```
│  Split Configuration                                                         │
│  ───────────────────                                                         │
│                                                                              │
│  Name *          ┌──────────────────────────────────────┐                   │
│                  │ Spring Drive 2026                     │                   │
│                  └──────────────────────────────────────┘                   │
│                                                                              │
│  Split type                                                                  │
│  ● Percentage-based (each org gets a fixed %)                                │
│  ○ Fixed amount first (one org gets first $X, rest split %)                  │
│  ○ Threshold-based (split changes at revenue thresholds)                     │
│                                                                              │
│  Allocations                                                                 │
│  Partido Verde           [60]%  ████████████░░░░░░░░                        │
│  Movimiento Ecologista   [25]%  █████░░░░░░░░░░░░░░                        │
│  Candidatura Torres      [15]%  ███░░░░░░░░░░░░░░░░                        │
│                          ─────                                               │
│                          100%   ← must sum to 100                            │
│                                                                              │
│  Apply to forms                                                              │
│  ☑ Spring Campaign Form                                                      │
│  ☑ Event Donation Form                                                       │
│  ☐ Main Website Form                                                         │
│                                                                              │
│  Disbursement                                                                │
│  ● Immediate (each donation split at time of receipt)                        │
│  ○ Monthly batch (split calculated and disbursed monthly)                    │
│                                                                              │
│  [Submit for Approval]                                                       │
│  All 3 member organizations must approve before this split activates.        │
```

### Interaction

- **Percentage fields**: must sum to 100%. Validation prevents save if sum ≠ 100
- **"Submit for Approval"**: sends approval requests to all member org admins. Status changes to "Pending Approval"
- **Approval flow**: each org admin sees the proposal in their notification center and on this screen. Must explicitly approve. Unanimous required
- **Edit existing**: creates a new pending version. Current split remains active until new version is unanimously approved

### States

- **No alliance**: "Your organization is not part of an alliance. Alliance fundraising splits allow coalition members to share donation revenue." [Learn More →]
- **Alliance, no splits**: "No fundraising splits configured. Create a split to share donation revenue across alliance members." [Create Split]

---

## FUND-016: Alliance Fundraising Report

Cross-org fundraising analytics for alliance members.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Alliance Fundraising Report                    [Date Range ▾]  [Export ▾]  │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Coalición Verde — Fundraising Summary                                       │
│  Period: Mar 1–31, 2026                                                      │
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ Total Raised │  │ Donations    │  │ Avg Gift     │  │ Splits Paid  │   │
│  │ $82,400      │  │ 847          │  │ $97          │  │ $78,200      │   │
│  │ across 3 orgs│  │ across 3 orgs│  │              │  │ of $82,400   │   │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                                              │
│  Per-Organization Breakdown                                                  │
│  ──────────────────────────                                                  │
│                                                                              │
│  Organization           Gross      Split Recv'd  Split Paid  Net Position   │
│  ─────────────────────────────────────────────────────────────────────────   │
│  Partido Verde          $52,100    $8,200        $20,840     $39,460        │
│  Movimiento Ecologista  $18,300    $10,600       $7,320      $21,580        │
│  Candidatura Torres     $12,000    $9,400        $4,800      $16,600        │
│  ─────────────────────────────────────────────────────────────────────────   │
│  Alliance Total         $82,400                               $77,640       │
│                                                                              │
│  By Campaign                                                                 │
│  ───────────                                                                 │
│  Campaign              Total     PV Share    ME Share    CT Share            │
│  Spring Drive          $52,100   $31,260     $13,025     $7,815             │
│  General Fund          $18,300   $7,820      $6,405      $4,575             │
│  Events                $12,000   $7,200      $3,000      $1,800             │
│                                                                              │
│  By Payment Method                                                           │
│  ─────────────────                                                           │
│  Method        Count    Amount     % of Total                                │
│  Card          612      $64,800    78.6%                                     │
│  Transfer      108      $12,400    15.0%                                     │
│  Cash          94       $3,800     4.6%                                      │
│  M-Pesa        33       $1,400     1.7%                                      │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Disbursement History                                                        │
│  ─────────────────────                                                       │
│  Date       Type       From → To                        Amount   Status      │
│  Mar 15     Monthly    Partido Verde → Mov. Ecologista  $2,100   ✓ Sent     │
│  Mar 15     Monthly    Partido Verde → Cand. Torres     $1,200   ✓ Sent     │
│  Mar 1      Immediate  Mov. Ecologista → Partido Verde  $580     ✓ Sent     │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- **Date range**: preset periods (This month, Last month, This quarter, This year, Custom)
- **Export**: CSV or PDF. PDF version formatted for board reporting. Audit-logged
- **"Across N orgs" attribution**: consistent with alliance visual pattern
- **Member org view**: when a member org (not the alliance admin) views this report, they see only their own columns with alliance totals. They cannot see other orgs' individual gross amounts — only the split amounts relevant to them

### States

- **No data**: "No alliance fundraising activity in this period." [Change Date Range]

---

## FUND-017: Payment Processor Configuration

Connect and manage payment processor accounts. OA-only screen.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Payment Processors                                                         │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ⓘ Each payment method routes to a processor. Configure at least one        │
│    processor to start accepting donations.                                   │
│                                                                              │
│  Connected Processors                                                        │
│  ─────────────────────                                                       │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  Stripe                                              [Test] [⚙]     │   │
│  │  Connected: Jan 15, 2024                                            │   │
│  │  Status: ✓ Live                                                     │   │
│  │  Methods: Card (Visa, MC, Amex), Bank transfer (ACH)               │   │
│  │  Last transaction: Mar 3, 2026 (2 min ago)                          │   │
│  │  Success rate (30d): 98.2%                                          │   │
│  ├──────────────────────────────────────────────────────────────────────┤   │
│  │  M-Pesa (Safaricom)                                  [Test] [⚙]     │   │
│  │  Connected: Feb 1, 2025                                             │   │
│  │  Status: ✓ Live                                                     │   │
│  │  Methods: M-Pesa mobile money                                       │   │
│  │  Last transaction: Mar 2, 2026                                      │   │
│  │  Success rate (30d): 96.7%                                          │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Add Processor                                                               │
│  ─────────────                                                               │
│                                                                              │
│  Recommended for your jurisdiction (Puerto Rico):                            │
│                                                                              │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐                │
│  │  ATH Móvil     │  │  PayPal        │  │  Other         │                │
│  │  Local PR      │  │  International │  │  Manual config │                │
│  │  [Connect →]   │  │  [Connect →]   │  │  [Connect →]   │                │
│  └────────────────┘  └────────────────┘  └────────────────┘                │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Settlement Currency: USD ▾                                                  │
│  Multi-currency acceptance: ☑ Enabled (donors can pay in their currency)    │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Connect Flow (inline expansion)

Clicking "Connect →" expands a guided setup:

```
│  Connect Stripe                                                              │
│  ──────────────                                                              │
│                                                                              │
│  Step 1 of 3: Enter API credentials                                          │
│                                                                              │
│  ⓘ Find these in your Stripe Dashboard → Developers → API Keys             │
│                                                                              │
│  Publishable key *                                                           │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ pk_live_...                                                         │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  Secret key *                                                                │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ ••••••••••••••••                                                    │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│  🔒 Encrypted in Vault. Never displayed again after saving.                 │
│                                                                              │
│  [Next: Verify Connection]                                                   │
│                                                                              │
│  Step 2: Verification (auto-runs)                                            │
│  ✓ API connection valid                                                      │
│  ✓ Account active and verified                                               │
│  ✓ Available methods: Card (Visa, MC, Amex), ACH                            │
│                                                                              │
│  Step 3: Test Transaction                                                    │
│  [Run Test Charge ($1.00)]  — charges and immediately refunds                │
│  Result: ✓ Test charge successful, refund processed                          │
│                                                                              │
│  [Save & Go Live]                                                            │
```

### Interaction

- **Credential entry**: secret keys are write-only. After save, displayed as masked (••••). Cannot be viewed again, only replaced
- **Test button** (on connected processor): runs a test charge and refund. Shows result inline
- **Settings gear** (⚙): opens processor-specific settings (webhook URL, supported payment methods, fee configuration)
- **Disconnect**: in settings gear menu. Confirmation dialog warns about impact on active forms. Cannot disconnect if it's the only processor

### Security Note

- API credentials stored in Vault, encrypted at rest
- Only Org Admin can access this screen
- All credential changes logged to audit trail

### States

- **No processors**: "Connect a payment processor to start accepting online donations. GreenGrass supports multiple processors — you can connect one for each payment method." [Get Started]

---

## FUND-020: Year-End Statement Generator

Generate and send consolidated year-end donation statements to donors.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Year-End Statements                                                        │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Generate Statements                                                         │
│  ───────────────────                                                         │
│                                                                              │
│  Fiscal year *                                                               │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ 2025                                                           [▾]  │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  Preview                                                                     │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Donors with donations in 2025:               412                    │   │
│  │ Total donations:                             $347,200               │   │
│  │ Donors with email addresses:                 398 (96.6%)            │   │
│  │ Donors without email (manual handling):      14 (3.4%)              │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  Statement includes:                                                         │
│  ☑ All donations (one-time, recurring charges, fulfilled pledges)            │
│  ☑ Per-campaign breakdown                                                    │
│  ☑ Tax-deductibility statement (jurisdiction-specific)                       │
│  ☑ Organization legal name and registration number                           │
│  ☐ Include refunded donations (shown as net $0)                              │
│                                                                              │
│  Delivery                                                                    │
│  ● Email to all donors with email addresses (398)                            │
│  ○ Generate PDFs only (download as ZIP)                                      │
│                                                                              │
│  Email preview                                                               │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Subject: Your 2025 Donation Statement — Partido Verde               │   │
│  │                                                                      │   │
│  │ Dear {donor_name},                                                   │   │
│  │                                                                      │   │
│  │ Thank you for your generous support in 2025. Attached is your        │   │
│  │ consolidated donation statement for tax purposes.                    │   │
│  │                                                                      │   │
│  │ Total contributions: {total_amount}                                  │   │
│  │ Number of gifts: {gift_count}                                        │   │
│  │                                                                      │   │
│  │ [View Full Statement]                                                │   │
│  │                                                                      │   │
│  │ With gratitude,                                                      │   │
│  │ Partido Verde de Puerto Rico                                         │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│  [Edit Email Template]                                                       │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  [Preview Sample Statement]  [Generate & Send]                               │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                              │
│  Previous Generations                                                        │
│  ─────────────────────                                                       │
│  2025  Generated Jan 15, 2026  398 sent, 14 manual  [Download ZIP]          │
│  2024  Generated Jan 12, 2025  312 sent, 8 manual   [Download ZIP]          │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- **"Preview Sample Statement"**: generates a PDF preview using a real donor record (most recent large donor), opens in new tab
- **"Generate & Send"**: confirmation dialog: "Generate 398 statements and send via email? 14 donors without email will be available for manual download." Progress bar during generation. Background process — user can navigate away
- **"Download ZIP"**: downloads all generated PDFs for the year
- **Fiscal year dropdown**: lists years with donation activity
- **Email template**: editable subject and body with merge fields. HTML preview

### States

- **No donations**: "No donations recorded for the selected fiscal year." [Change Year]

---

## Empty States Summary

| Screen | Empty Message | Action |
|--------|--------------|--------|
| FUND-001 Donation List | No donations yet. Create a donation form to start accepting contributions. | Create Form |
| FUND-007 Recurring | No recurring donations yet. When donors choose recurring giving on your donation forms, they'll appear here. | — |
| FUND-008 Pledges | No pledges recorded yet. Pledges can be created here, or automatically during phone bank and canvassing shifts. | Create Pledge |
| FUND-012 Compliance | No open compliance flags. All flagged donations have been reviewed. ✓ | — |
| FUND-015 Splits (no alliance) | Your organization is not part of an alliance. | Learn More |
| FUND-015 Splits (no splits) | No fundraising splits configured. Create a split to share donation revenue across alliance members. | Create Split |
| FUND-017 Processors | Connect a payment processor to start accepting online donations. | Get Started |
| FUND-018 Campaigns | No fundraising campaigns yet. Campaigns help you set goals and track progress for fundraising drives. | Create Campaign |

---

## Accessibility Notes

- All currency amounts use proper formatting with currency symbol and locale-appropriate separators
- Compliance flag severity levels are communicated via icon + text + color (not color alone)
- Donation status uses icon + text label (not just color)
- Form builder preview is not the only way to verify settings — settings panel shows all values textually
- Cash donation recording form uses large touch targets (48px min) for field use
- A/B test results use ★ text marker alongside visual indicators for leading variant
- Alliance split percentages shown as both numeric value and proportional bar

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Donation list summary bar | Inline metric cards above the table | Finance Director checks totals frequently — should be visible without scrolling |
| Flagged donations in main list | Warning row highlight + flag icon in status column | Flags must be noticeable but not separate from normal donation flow |
| Cash recording as mobile-first | Full-screen centered form, camera integration | Cash donations happen at events, in the field — phone is the primary device |
| Reconciliation as two-column | Cash records left, bank deposits right | Mirrors the mental model of matching two lists — like a bookkeeper's desk |
| A/B test as separate screens | Setup and Results are distinct (FUND-013, FUND-014) | Setup is a configuration task (edit mode), Results is an analytics task (read mode) — different mental modes |
| Alliance split approval inline | Approval status shown on the split card, not a separate queue | Splits are few and infrequent — a dedicated queue would usually be empty |
| Payment processor connect flow | Inline stepped expansion, not a wizard | Only 3 steps, simple enough for inline. Wizard overhead not warranted |

## Open Questions

1. **Refund time limits** — should there be a maximum age for refundable donations (e.g., 90 days)? Processor policies vary
2. **Pledge reminder channels** — should pledge reminders support all channels (email, SMS, WhatsApp) or just email? Channel availability varies by contact data quality
3. **Cash photo requirements** — should receipt photos be required above a certain cash amount? Balances audit needs against field friction
4. **A/B test variant count** — should we support more than 2 variants (A/B/C testing)? Increases complexity but some orgs may want it
5. **Alliance split dispute resolution** — what happens if a member org disputes a split calculation? Need a formal process beyond the approval flow
