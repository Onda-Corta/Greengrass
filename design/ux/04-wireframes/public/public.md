# Public Pages Wireframes

## Purpose

Public pages are the campaign's outward face — the pages shared via social media, printed on flyers, and texted to supporters. No authentication required. Every public page has one job: turning a curious visitor into a donor, volunteer, petition signer, or informed voter.

The core UX challenge: public pages serve an audience with zero context. A visitor landing from a WhatsApp share on a low-end phone must understand who the campaign is, what they're being asked to do, and how to do it — all within 10 seconds. Every page is tenant-branded, mobile-first, fast-loading, and compliant (with auto-inserted disclaimers).

Scope boundary: several public pages are already wireframed in their feature-specific documents. This document covers the remaining public pages and provides cross-references.

## Scope

| ID | Screen | Personas | Offline | Mobile | URL | Status |
|----|--------|----------|---------|--------|-----|--------|
| PUB-001 | Candidate Profile Page | Public | No | Primary | `/p/[slug]` | New |
| PUB-002 | Organization Profile Page | Public | No | Primary | `/o/[slug]` | New |
| PUB-003 | Donation Form (Hosted) | Public | No | Primary | `/donate/[formId]` | Cross-ref |
| PUB-004 | Event Page (Public) | Public | No | Primary | `/events/[eventId]` | Cross-ref |
| PUB-005 | Action Page (Letter/Email) | Public | No | Primary | `/action/[actionId]` | Cross-ref |
| PUB-006 | Petition Page | Public | No | Primary | `/petition/[petitionId]` | Cross-ref |
| PUB-007 | Volunteer Signup Page | Public | No | Primary | `/volunteer` | New |
| PUB-008 | Media Kit Page | Public | No | Primary | `/media-kit` | New |

### Cross-References (wireframed elsewhere)

| ID | Screen | Location |
|----|--------|----------|
| PUB-003 | Donation Form | `supporter/supporter-portal.md` (SUP-001) + `fundraising/fundraising.md` (FUND-003-006) |
| PUB-004 | Event Page | `events/events.md` (EVT-003 public variant) |
| PUB-005 | Action Page | `activism/activism.md` (ACT-005) |
| PUB-006 | Petition Page | `activism/activism.md` (ACT-006) |

## Public Pages Shared Patterns

All public pages share:
- **No navigation shell** — no sidebar, no top bar. Just a header with org logo + name
- **Tenant branding** — org colors, logo, custom imagery where configured
- **Compliance disclaimer** — "Paid for by..." footer, auto-inserted, jurisdiction-appropriate
- **Mobile-first** — designed for phone, adapted up to desktop
- **Share buttons** — WhatsApp, Facebook, Copy Link (platform-contextual)
- **Fast loading** — target: <2s FCP on 3G. Minimal JS, optimized images
- **RTL support** — layout flips automatically for RTL languages

---

## PUB-001: Candidate Profile Page

Public-facing candidate biography and campaign page. The URL printed on yard signs, flyers, and business cards.

### Mobile (Primary)

```
┌────────────────────────────┐
│  [Org Logo]                │
│  Partido Verde de PR       │
├────────────────────────────┤
│                            │
│  ┌────────────────────────┐│
│  │                        ││
│  │   [Candidate Photo]    ││
│  │                        ││
│  │                        ││
│  └────────────────────────┘│
│                            │
│  María Torres              │
│  Candidate for Governor    │
│                            │
│  "Clean water, strong      │
│   schools, and a voice     │
│   for every community."    │
│                            │
│  ─────────────────────     │
│                            │
│  About María               │
│  ────────────              │
│                            │
│  Born and raised in Caguas,│
│  María Torres has spent 15 │
│  years advocating for      │
│  environmental justice and │
│  educational equity...     │
│                            │
│  [Read more ▾]             │
│                            │
│  ─────────────────────     │
│                            │
│  Endorsements              │
│  ──────────────            │
│                            │
│  "María is the leader we   │
│   need."                   │
│   — Sen. Carlos Rivera     │
│                            │
│  "A champion for working   │
│   families."               │
│   — United Workers Union   │
│                            │
│  [View all endorsements ▾] │
│                            │
│  ─────────────────────     │
│                            │
│  Upcoming Events           │
│  ────────────────          │
│                            │
│  Mar 8 · Town Hall          │
│  Community Center, Caguas   │
│  [RSVP →]                  │
│                            │
│  Mar 15 · Election Day!     │
│  Find your polling place   │
│  [Find my poll →]          │
│                            │
│  ─────────────────────     │
│                            │
│  ┌────────────────────────┐│
│  │                        ││
│  │    Support María       ││
│  │    [Donate →]          ││
│  │                        ││
│  └────────────────────────┘│
│                            │
│  ┌────────────────────────┐│
│  │   Volunteer →          ││
│  └────────────────────────┘│
│                            │
│  ─────────────────────     │
│                            │
│  Follow María              │
│  [𝕏] [📘] [📸]            │
│                            │
│  ─────────────────────     │
│                            │
│  Share this page:          │
│  [WhatsApp] [Facebook]     │
│  [Copy Link]               │
│                            │
│  Paid for by Partido Verde │
│  de Puerto Rico            │
│                            │
└────────────────────────────┘
```

### Desktop

Two-column layout: photo + bio on left (60%), endorsements + events + CTAs on right (40%).

### Interaction

- **Short URL**: `/p/maria-torres` — printable on physical materials. Configured in admin
- **Candidate-editable content**: the candidate (or OA) controls the bio, photo, tagline, and social links via their profile settings
- **Dynamic sections**: Endorsements pulled from Endorsement Pipeline (PRESS-012) — only "Public" stage endorsements shown. Upcoming Events pulled from Event List. Latest press pulled from Coverage Log
- **[Donate →]**: links to the org's primary donation form (PUB-003)
- **[Volunteer →]**: links to PUB-007
- **[RSVP →]**: links to PUB-004 for that event
- **Social links**: external links to the candidate's social media profiles
- **SEO**: meta tags, Open Graph image (candidate photo), structured data for search engines

---

## PUB-002: Organization Profile Page

Public-facing organization page. The campaign's institutional identity online.

### Mobile (Primary)

```
┌────────────────────────────┐
│                            │
│      [Org Logo — large]    │
│                            │
│  Partido Verde de          │
│  Puerto Rico               │
│                            │
│  Building a greener,       │
│  fairer Puerto Rico        │
│  for everyone.             │
│                            │
├────────────────────────────┤
│                            │
│  ┌────────────────────────┐│
│  │                        ││
│  │  [Hero image —         ││
│  │   campaign in action]  ││
│  │                        ││
│  └────────────────────────┘│
│                            │
│  Our Mission               │
│  ────────────              │
│                            │
│  Partido Verde fights for  │
│  clean water, strong       │
│  schools, and economic     │
│  opportunity in every      │
│  community across Puerto   │
│  Rico...                   │
│                            │
│  [Read more ▾]             │
│                            │
│  ─────────────────────     │
│                            │
│  Get Involved              │
│  ─────────────             │
│                            │
│  ┌────────────────────────┐│
│  │ 🗳  Volunteer           ││
│  │    Join hundreds of     ││
│  │    neighbors making     ││
│  │    a difference.        ││
│  │    [Sign Up →]          ││
│  └────────────────────────┘│
│                            │
│  ┌────────────────────────┐│
│  │ 💚  Donate              ││
│  │    Every dollar builds  ││
│  │    grassroots power.    ││
│  │    [Donate →]           ││
│  └────────────────────────┘│
│                            │
│  ─────────────────────     │
│                            │
│  Upcoming Events           │
│  ────────────────          │
│                            │
│  Mar 8 · Town Hall, Caguas │
│  Mar 12 · Phone Bank Night │
│  Mar 15 · Election Day     │
│                            │
│  [View all events →]       │
│                            │
│  ─────────────────────     │
│                            │
│  In the News               │
│  ────────────              │
│                            │
│  "Green Party Surges in    │
│   Latest Poll" — El Nuevo  │
│   Día, Mar 2               │
│                            │
│  "Volunteers Canvass 5,000 │
│   Doors in Weekend Drive"  │
│   — Primera Hora, Feb 28   │
│                            │
│  ─────────────────────     │
│                            │
│  Follow Us                 │
│  [𝕏] [📘] [📸] [🎵]      │
│                            │
│  Share:                    │
│  [WhatsApp] [Facebook]     │
│  [Copy Link]               │
│                            │
│  Paid for by Partido Verde │
│  de Puerto Rico            │
│                            │
└────────────────────────────┘
```

### Interaction

- **Short URL**: `/o/partido-verde` — shareable in SMS, printable
- **Dynamic content**: events pulled from Event List, press mentions from Coverage Log, social links from SET-001
- **CTAs**: [Volunteer] → PUB-007, [Donate] → PUB-003
- **Content editable by OA**: mission text, hero image, and featured content configured in SET-001 or a dedicated content editor
- **SEO optimized**: structured data, Open Graph tags, meta description

---

## PUB-007: Volunteer Signup Page

Public recruitment page for prospective volunteers. The most important conversion page for campaign capacity.

### Mobile (Primary)

```
┌────────────────────────────┐
│  [Org Logo]                │
│  Partido Verde de PR       │
├────────────────────────────┤
│                            │
│  ┌────────────────────────┐│
│  │                        ││
│  │   [Photo: volunteers   ││
│  │    in action]          ││
│  │                        ││
│  └────────────────────────┘│
│                            │
│  Join Our Team             │
│                            │
│  Hundreds of neighbors     │
│  are volunteering to build │
│  a better Puerto Rico.     │
│  We need you too.          │
│                            │
│  ─────────────────────     │
│                            │
│  Sign Up                   │
│  ──────────                │
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
│  Your Phone                │
│  ┌────────────────────────┐│
│  │                        ││
│  └────────────────────────┘│
│  So we can text you about  │
│  upcoming opportunities.   │
│                            │
│  Your Location             │
│  ┌────────────────────────┐│
│  │ City, neighborhood     ││
│  └────────────────────────┘│
│  Helps us find             │
│  opportunities near you.   │
│                            │
│  What interests you?       │
│  (select all that apply)   │
│                            │
│  ☑ Knocking doors          │
│  □ Making phone calls      │
│  □ Attending events        │
│  □ Data entry              │
│  □ Driving voters to polls │
│  □ Social media            │
│  □ Anything — I'm flexible!│
│                            │
│  When are you available?   │
│  ☑ Weekday mornings        │
│  ☑ Weekday evenings        │
│  □ Weekends                │
│  □ Election Day (Mar 15)   │
│                            │
│  ┌────────────────────────┐│
│  │                        ││
│  │   Sign Me Up!          ││
│  │                        ││
│  └────────────────────────┘│
│    48px tall, full-width   │
│                            │
│  ☑ I'd like to receive     │
│    updates from Partido    │
│    Verde via email         │
│                            │
│  Paid for by Partido Verde │
│  de Puerto Rico            │
│                            │
└────────────────────────────┘
```

### Confirmation

```
┌────────────────────────────┐
│                            │
│         🎉                 │
│                            │
│  Welcome to the team!      │
│                            │
│  We'll be in touch soon    │
│  with your first           │
│  volunteer opportunity.    │
│                            │
│  ─────────────────────     │
│                            │
│  What's next:              │
│                            │
│  1. Check your email for   │
│     a confirmation         │
│                            │
│  2. Download the app (when │
│     available) to get      │
│     started with training  │
│                            │
│  ─────────────────────     │
│                            │
│  Share with friends:       │
│                            │
│  [Share on WhatsApp]       │
│  [Share on Facebook]       │
│  [Copy Link]               │
│                            │
│  ─────────────────────     │
│                            │
│  Want to make an even      │
│  bigger impact?            │
│                            │
│  ┌────────────────────────┐│
│  │    Donate →            ││
│  └────────────────────────┘│
│                            │
└────────────────────────────┘
```

### Desktop

Two-column layout: mission/photos on left, signup form on right.

### Interaction

- **Minimal required fields**: name and email only. Phone, location, interests, and availability are optional but encouraged
- **Interest checkboxes**: help the Volunteer Coordinator match volunteers to appropriate roles. Auto-tags the CRM contact
- **Availability**: helps scheduling. Auto-populated into the volunteer's profile for shift matching
- **CRM integration**: on submit, creates a new contact (or matches existing via email dedup) tagged as "Prospective Volunteer"
- **Email confirmation**: automatic confirmation email sent with next steps
- **Consent checkbox**: opt-in for future communications. Not pre-checked (GDPR-compatible default)
- **Customizable**: OA can customize the hero image, intro text, interest options, and availability options per org
- **Donation upsell**: confirmation page gently suggests a donation — conversion opportunity without pressuring
- **Volunteer onboarding**: after signing up and creating an account, the volunteer enters the Volunteer Onboarding wizard (ONB-002)

---

## PUB-008: Media Kit Page

Public-facing media kit with downloadable assets for press and media.

### Mobile (Primary)

```
┌────────────────────────────┐
│  [Org Logo]                │
│  Partido Verde de PR       │
├────────────────────────────┤
│                            │
│  Media Kit                 │
│                            │
│  Resources for press and   │
│  media coverage of         │
│  Partido Verde de Puerto   │
│  Rico.                     │
│                            │
│  ─────────────────────     │
│                            │
│  Press Contact             │
│  ──────────────            │
│  Carlos Méndez             │
│  Communications Director   │
│  📧 press@partido.org      │
│  📱 +1 (787) 555-0150      │
│                            │
│  ─────────────────────     │
│                            │
│  Logos                     │
│  ──────                    │
│                            │
│  ┌──────────┐ ┌──────────┐│
│  │ [logo]   │ │ [logo]   ││
│  │ Full     │ │ White    ││
│  │ Color    │ │ on Dark  ││
│  │ [↓ PNG]  │ │ [↓ PNG]  ││
│  │ [↓ SVG]  │ │ [↓ SVG]  ││
│  └──────────┘ └──────────┘│
│                            │
│  ─────────────────────     │
│                            │
│  Photos                    │
│  ──────                    │
│                            │
│  ┌──────────┐ ┌──────────┐│
│  │ [photo]  │ │ [photo]  ││
│  │ Candidate│ │ Campaign ││
│  │ Headshot │ │ Rally    ││
│  │ [↓ Hi-res│ │ [↓ Hi-res││
│  └──────────┘ └──────────┘│
│                            │
│  ┌──────────┐ ┌──────────┐│
│  │ [photo]  │ │ [photo]  ││
│  │ Team     │ │ Community││
│  │ Photo    │ │ Event    ││
│  │ [↓ Hi-res│ │ [↓ Hi-res││
│  └──────────┘ └──────────┘│
│                            │
│  ─────────────────────     │
│                            │
│  Documents                 │
│  ──────────                │
│                            │
│  📄 Candidate Bio (PDF)    │
│     [↓ Download]           │
│                            │
│  📄 Platform Summary (PDF) │
│     [↓ Download]           │
│                            │
│  📄 Fact Sheet (PDF)       │
│     [↓ Download]           │
│                            │
│  ─────────────────────     │
│                            │
│  Recent Coverage           │
│  ────────────────          │
│                            │
│  "Green Party Surges..."   │
│  El Nuevo Día · Mar 2      │
│                            │
│  "5,000 Doors in Weekend"  │
│  Primera Hora · Feb 28     │
│                            │
│  ─────────────────────     │
│                            │
│  Paid for by Partido Verde │
│  de Puerto Rico            │
│                            │
└────────────────────────────┘
```

### Desktop

Three-column grid for logos and photos. Documents list on the side. Press contact card at top right.

### Gated Access Variant

```
┌────────────────────────────┐
│                            │
│  To download media kit     │
│  assets, please provide    │
│  your contact information: │
│                            │
│  Name *                    │
│  ┌────────────────────────┐│
│  │                        ││
│  └────────────────────────┘│
│                            │
│  Email *                   │
│  ┌────────────────────────┐│
│  │                        ││
│  └────────────────────────┘│
│                            │
│  Organization *            │
│  ┌────────────────────────┐│
│  │                        ││
│  └────────────────────────┘│
│                            │
│  ┌────────────────────────┐│
│  │   Access Media Kit     ││
│  └────────────────────────┘│
│                            │
└────────────────────────────┘
```

### Interaction

- **Public vs gated**: configurable per org. Public shows all assets directly. Gated requires email before download — creates a CRM contact tagged "Media Contact"
- **Asset categories**: Logos (PNG + SVG), Photos (hi-res JPEG), Documents (PDF). Categories configurable by OA
- **Download tracking**: each download is tracked — who downloaded what and when. Visible in the Media Kit Management admin screen (PRESS-009)
- **Press contact**: direct contact info for media inquiries. Points to the Spokesperson Configuration (PRESS-016)
- **Recent coverage**: pulled from Coverage Log (PRESS-010). Social proof for journalists
- **Updatable**: OA manages assets through PRESS-009 (Media Kit Management). Changes reflect immediately on PUB-008

---

## Empty States Summary

| Screen | Empty Message | Action |
|--------|--------------|--------|
| PUB-001 (no candidate configured) | This page is not yet available. | — |
| PUB-002 (no org info) | This organization hasn't set up their public page yet. | — |
| PUB-007 (form not configured) | Volunteer signup is not currently available. | — |
| PUB-008 (no assets) | No media kit assets have been uploaded yet. Contact [org name] directly for press materials. | (press contact info if available) |

---

## Accessibility Notes

- All public pages meet WCAG AA contrast ratios — broadest audience, highest standard
- Images have descriptive alt text (candidate photos, event images)
- Form fields have visible labels with helper text below (not placeholder-only)
- Share buttons include text labels (not icon-only)
- Download links clearly indicate file format and size
- Candidate/org pages use semantic HTML (article, header, section) for screen reader structure
- All pages are keyboard-navigable with visible focus indicators

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Short URL slugs (/p/, /o/) | Printable, memorable URLs | Public pages are shared physically (flyers, yard signs). Short URLs are easier to type and remember |
| Mobile-first (not responsive) | Designed for phone, adapted up | Majority of public page traffic comes from social media shares opened on phones. Desktop is secondary |
| Minimal form fields | Name and email only required | Every additional required field reduces conversion. Optional fields collect useful data without creating barriers |
| Gated media kit as option | Configurable by OA — public or gated | Some orgs want to track who downloads press materials. Others want maximum accessibility. Both valid |
| Donation upsell on confirmation | Gentle CTA after volunteer signup | The confirmation moment has high engagement. A soft donation ask converts well without feeling pushy |
| No authentication on public pages | Completely open access | Public pages exist to reach people who don't have accounts. Any login wall would kill conversion |

## Open Questions

1. **Custom domains** — should public pages support custom domains (e.g., mariatorres.org instead of greengrass.app/p/maria-torres)? Requires DNS configuration and SSL cert management
2. **Page analytics** — should public pages include built-in analytics (page views, conversion rates, referral sources)? Or rely on external tools (Google Analytics, Plausible)?
3. **A/B testing for volunteer signup** — should the platform support testing different headlines, images, or form fields on PUB-007 to optimize conversion? Useful but adds complexity
4. **Social media preview cards** — how are Open Graph images generated? Auto-generated from candidate photo + org branding? Or manually uploaded? Auto-generation reduces admin burden
