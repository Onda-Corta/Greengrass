# Supporter Portal Wireframes

## Purpose

The supporter portal is the public-facing personal space for donors and supporters. It's visually branded with the tenant's colors and logo, uses simplified navigation (no sidebar), and handles donation history, recurring management, event RSVPs, and profile/preferences. Mobile-first.

The portal exists at `/portal/*` routes and uses the `(portal)` layout group — separate from the main app shell.

## Scope

| ID | Screen | Personas | Offline | Mobile | Section |
|----|--------|----------|---------|--------|---------|
| SUP-001 | Supporter Home | S | No | Primary | Portal Home |
| SUP-002 | Donation History | S | No | Primary | Donation History |
| SUP-003 | Donation Receipt View | S | No | Primary | Donation Receipt View |
| SUP-004 | Recurring Donation Management | S | No | Primary | Portal Home (inline) |
| SUP-005 | Payment Method Update | S | No | Primary | Payment Method Update |
| SUP-006 | Supporter Profile | S | No | Primary | Supporter Profile |
| SUP-007 | Communication Preferences | S | No | Primary | Communication Preferences |
| SUP-008 | My Events | S | No | Primary | Events Page |
| SUP-009 | Year-End Statement Download | S | No | Primary | Year-End Statement Download |

All supporter portal screens are online-only. The portal is a public web experience — no offline capability.

Cross-references: FUND-005 (Public Donation Form) is wireframed in the fundraising section of this document and also in `fundraising/fundraising.md`. EVT-006 and EVT-007 (Public Event Pages) are wireframed in `events/events.md`.

## Supporter Portal Navigation Context

The portal uses a simplified horizontal nav (desktop) or tab bar (mobile), not the standard sidebar:

```
Desktop:   [Logo]  Home  |  Donations  |  Events  |  Preferences     [Account ▾]  [Español ▾]
Mobile:    [Perfil]  [Donaciones]  [Eventos]
```

Pre-auth pages (donation form, event page) show no navigation — just the tenant header and content.

---

## Public Donation Page (Pre-Auth)

The first touchpoint. Tenant-branded. No login required to donate.

### Desktop

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  🌿 Partido Verde de Puerto Rico                         [Log In]  [Español ▾] │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                                                                          │   │
│  │                  Support Partido Verde                                   │   │
│  │                  ─────────────────────                                   │   │
│  │                                                                          │   │
│  │      Your contribution powers our campaign for a                         │   │
│  │      greener, more equitable Puerto Rico.                                │   │
│  │                                                                          │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
│  ┌──────────────────────────────────────────────────────────┐                   │
│  │                                                          │                   │
│  │  Choose an amount:                                       │                   │
│  │                                                          │                   │
│  │  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐            │                   │
│  │  │  $25  │  │  $50  │  │ [$100]│  │ $250  │            │                   │
│  │  └───────┘  └───────┘  └───────┘  └───────┘            │                   │
│  │                                                          │                   │
│  │  ┌───────┐  ┌───────┐                                   │                   │
│  │  │ $500  │  │ Other │                                   │                   │
│  │  └───────┘  └───────┘                                   │                   │
│  │                                                          │                   │
│  │  ☐ Make this a monthly donation                          │                   │
│  │                                                          │                   │
│  │  ─────────────────────────────────────────               │                   │
│  │                                                          │                   │
│  │  Your Information                                        │                   │
│  │                                                          │                   │
│  │  First Name *              Last Name *                   │                   │
│  │  ┌─────────────────┐      ┌─────────────────┐          │                   │
│  │  │                 │      │                 │          │                   │
│  │  └─────────────────┘      └─────────────────┘          │                   │
│  │                                                          │                   │
│  │  Email *                                                 │                   │
│  │  ┌──────────────────────────────────────────┐           │                   │
│  │  │                                          │           │                   │
│  │  └──────────────────────────────────────────┘           │                   │
│  │                                                          │                   │
│  │  Address *                                               │                   │
│  │  ┌──────────────────────────────────────────┐           │                   │
│  │  │                                          │           │                   │
│  │  └──────────────────────────────────────────┘           │                   │
│  │                                                          │                   │
│  │  City *                State *        ZIP *              │                   │
│  │  ┌──────────┐        ┌────────┐      ┌──────┐          │                   │
│  │  │          │        │  PR ▾  │      │      │          │                   │
│  │  └──────────┘        └────────┘      └──────┘          │                   │
│  │                                                          │                   │
│  │  Employer *                Occupation *                   │                   │
│  │  ┌─────────────────┐      ┌─────────────────┐          │                   │
│  │  │                 │      │                 │          │                   │
│  │  └─────────────────┘      └─────────────────┘          │                   │
│  │  ⓘ Required by campaign finance law.                    │                   │
│  │                                                          │                   │
│  │  ─────────────────────────────────────────               │                   │
│  │                                                          │                   │
│  │  Payment                                                 │                   │
│  │  ┌──────────────────────────────────────────┐           │                   │
│  │  │  Card Number                              │           │                   │
│  │  │  ┌────────────────────────────────────┐   │           │                   │
│  │  │  │ 4242 4242 4242 4242               │   │           │                   │
│  │  │  └────────────────────────────────────┘   │           │                   │
│  │  │  Exp          CVC                         │           │                   │
│  │  │  ┌──────────┐ ┌──────────┐                │           │                   │
│  │  │  │ 12/27    │ │ 123      │                │           │                   │
│  │  │  └──────────┘ └──────────┘                │           │                   │
│  │  └──────────────────────────────────────────┘           │                   │
│  │                                                          │                   │
│  │  ┌──────────────────────────────────────────────────┐   │                   │
│  │  │  💰  Donate $100                                  │   │                   │
│  │  └──────────────────────────────────────────────────┘   │                   │
│  │                                                          │                   │
│  │  ☐ Subscribe to email updates from Partido Verde        │                   │
│  │                                                          │                   │
│  └──────────────────────────────────────────────────────────┘                   │
│                                                                                 │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │  Paid for by Partido Verde de Puerto Rico.                               │   │
│  │  Contributions are not tax-deductible. Federal law requires us           │   │
│  │  to use our best efforts to collect and report the name, mailing         │   │
│  │  address, occupation, and name of employer of individuals whose          │   │
│  │  contributions exceed $200 in an election cycle.                         │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
│  Partido Verde de Puerto Rico · Privacy Policy · Terms of Service              │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Mobile Donation Page

```
┌──────────────────────────────┐
│  🌿 Partido Verde   [Español]│
├──────────────────────────────┤
│                              │
│  Support Partido Verde       │
│  ─────────────────────       │
│                              │
│  Your contribution powers    │
│  our campaign.               │
│                              │
│  ┌──────┐ ┌──────┐ ┌──────┐│
│  │ $25  │ │ $50  │ │[$100]││
│  └──────┘ └──────┘ └──────┘│
│  ┌──────┐ ┌──────┐ ┌──────┐│
│  │ $250 │ │ $500 │ │Other ││
│  └──────┘ └──────┘ └──────┘│
│                              │
│  ☐ Make this monthly         │
│                              │
│  ─────────────────────       │
│                              │
│  First Name *                │
│  ┌──────────────────────────┐│
│  │                          ││
│  └──────────────────────────┘│
│  Last Name *                 │
│  ┌──────────────────────────┐│
│  │                          ││
│  └──────────────────────────┘│
│  Email *                     │
│  ┌──────────────────────────┐│
│  │                          ││
│  └──────────────────────────┘│
│         ↓ scroll             │
│  (Address, employer fields)  │
│  (Payment card fields)       │
│                              │
│  ┌──────────────────────────┐│
│  │  💰  Donate $100         ││
│  └──────────────────────────┘│
│                              │
│  Compliance disclaimer...    │
│                              │
│  Privacy · Terms             │
└──────────────────────────────┘
```

### Donation Confirmation

```
┌──────────────────────────────┐
│  🌿 Partido Verde            │
├──────────────────────────────┤
│                              │
│           ✓                  │
│                              │
│  Thank you!                  │
│  ─────────────────────       │
│                              │
│  Your $100 donation to       │
│  Partido Verde has been      │
│  processed successfully.     │
│                              │
│  A receipt has been sent     │
│  to ana@email.com.           │
│                              │
│  Transaction: #GG-2026-4521 │
│  Date: March 3, 2026        │
│                              │
│  ─────────────────────       │
│                              │
│  ┌──────────────────────────┐│
│  │  Create an Account       ││
│  │  View your history,      ││
│  │  manage recurring, get   ││
│  │  receipts.               ││
│  └──────────────────────────┘│
│                              │
│  [Return to Partido Verde]   │
│                              │
│  Privacy · Terms             │
└──────────────────────────────┘
```

---

## Supporter Portal (Logged In)

### Portal Home

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  🌿 Partido Verde de Puerto Rico                   [Mi Perfil]  [Cerrar]    │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  [Mi Perfil]    [Donaciones]    [Eventos]    [Preferencias]                  │
│                                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Hola, Ana                                                                   │
│  ─────────                                                                   │
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                       │
│  │  💰 Donated   │  │  🔄 Recurring │  │  📅 Events   │                       │
│  │  $1,250 total │  │  $100/month   │  │  2 upcoming  │                       │
│  │  8 donations  │  │  Next: Apr 1  │  │  next: Mar 5 │                       │
│  └──────────────┘  └──────────────┘  └──────────────┘                       │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  Quick Actions                                                        │   │
│  │  ────────────────                                                     │   │
│  │  [💰 Donate Again]  [📅 View Events]  [⚙ Update Preferences]        │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  Recent Activity                                                      │   │
│  │  ────────────────                                                     │   │
│  │  Mar 1   $100 monthly donation processed                ✓ Receipt    │   │
│  │  Feb 28  RSVP'd to Rally at Plaza (Mar 5)                            │   │
│  │  Feb 1   $100 monthly donation processed                ✓ Receipt    │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│  Partido Verde de Puerto Rico · Privacidad · Términos · Ayuda              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Donation History

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  🌿 Partido Verde de Puerto Rico                   [Mi Perfil]  [Cerrar]    │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  [Mi Perfil]    [◉ Donaciones]    [Eventos]    [Preferencias]               │
│                                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Historial de Donaciones                                                     │
│  ─────────────────────────                                                   │
│                                                                              │
│  Total donado: $1,250  ·  8 donaciones  ·  Desde enero 2025                 │
│                                                                              │
│  [💰 Donar Otra Vez]                                                        │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  Date         Amount    Type       Status     Receipt               │   │
│  ├──────────────────────────────────────────────────────────────────────┤   │
│  │  Mar 1, 2026  $100.00   Mensual    ✓ Procesado  [↓ PDF]            │   │
│  │  Feb 1, 2026  $100.00   Mensual    ✓ Procesado  [↓ PDF]            │   │
│  │  Jan 15, 2026 $250.00   Única      ✓ Procesado  [↓ PDF]            │   │
│  │  Jan 1, 2026  $100.00   Mensual    ✓ Procesado  [↓ PDF]            │   │
│  │  Dec 1, 2025  $100.00   Mensual    ✓ Procesado  [↓ PDF]            │   │
│  │  Nov 1, 2025  $100.00   Mensual    ✓ Procesado  [↓ PDF]            │   │
│  │  Oct 1, 2025  $100.00   Mensual    ✓ Procesado  [↓ PDF]            │   │
│  │  Sep 1, 2025  $100.00   Mensual    ✓ Procesado  [↓ PDF]            │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ─────────────────────────                                                   │
│                                                                              │
│  Donación Recurrente                                                         │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                                                                      │   │
│  │  $100.00 / mes                                                       │   │
│  │  Próxima: April 1, 2026                                              │   │
│  │  Método: Visa ending 4242                                            │   │
│  │  Activa desde: September 1, 2025                                     │   │
│  │                                                                      │   │
│  │  [Cambiar Monto]  [Actualizar Tarjeta]  [Pausar]  [Cancelar]       │   │
│  │                                                                      │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ⓘ Necesitas un resumen anual de tus donaciones?                           │
│  [Generar Resumen Anual (2025) →]                                           │
│                                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│  Partido Verde de Puerto Rico · Privacidad · Términos · Ayuda              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Events Page

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  🌿 Partido Verde de Puerto Rico                   [Mi Perfil]  [Cerrar]    │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  [Mi Perfil]    [Donaciones]    [◉ Eventos]    [Preferencias]               │
│                                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Próximos Eventos                                                            │
│  ────────────────                                                            │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                                                                      │   │
│  │  Rally at Plaza del Mercado                                          │   │
│  │  📅 March 5, 2026 · 6:00 PM                                         │   │
│  │  📍 Plaza del Mercado, San Juan                                      │   │
│  │  👥 142 attending                                                     │   │
│  │                                                                      │   │
│  │  Join us for a community rally featuring live music,                 │   │
│  │  speakers, and a celebration of our campaign progress.               │   │
│  │                                                                      │   │
│  │  ✓ You're going                            [Cancel RSVP]            │   │
│  │                                                                      │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                                                                      │   │
│  │  Town Hall: Healthcare Access                                        │   │
│  │  📅 March 12, 2026 · 7:00 PM                                        │   │
│  │  📍 Centro Comunal, Bayamón                                          │   │
│  │  👥 67 attending                                                      │   │
│  │                                                                      │   │
│  │  An open forum to discuss healthcare access and our                  │   │
│  │  party's policy proposals.                                           │   │
│  │                                                                      │   │
│  │  [RSVP — I'm Going]                                                 │   │
│  │                                                                      │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  Past Events                                                                 │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  Feb 22  Volunteer Appreciation Night  ✓ Attended                   │   │
│  │  Feb 8   Phone Bank Kickoff           ✓ Attended                   │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│  Partido Verde de Puerto Rico · Privacidad · Términos · Ayuda              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Preferences

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  🌿 Partido Verde de Puerto Rico                   [Mi Perfil]  [Cerrar]    │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  [Mi Perfil]    [Donaciones]    [Eventos]    [◉ Preferencias]               │
│                                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Preferencias de Comunicación                                                │
│  ────────────────────────────                                                │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  Email                                                               │   │
│  │  ────────                                                            │   │
│  │  ☑ Campaign updates and news                                         │   │
│  │  ☑ Event invitations                                                 │   │
│  │  ☑ Fundraising appeals                                               │   │
│  │  ☑ Donation receipts (cannot be disabled)                            │   │
│  │  ☐ Volunteer opportunities                                           │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  SMS / WhatsApp                                                      │   │
│  │  ────────────                                                        │   │
│  │  ☑ Event reminders                                                   │   │
│  │  ☐ Campaign updates                                                  │   │
│  │  ☐ Fundraising appeals                                               │   │
│  │                                                                      │   │
│  │  Phone: +1 787-555-0147   [Change]                                   │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  Push Notifications (App)                                            │   │
│  │  ──────────────────────                                              │   │
│  │  ☑ Event reminders                                                   │   │
│  │  ☑ Donation receipts                                                 │   │
│  │  ☐ Campaign updates                                                  │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ─────────────────────────────                                               │
│                                                                              │
│  Language: [Español ▾]                                                       │
│                                                                              │
│  ─────────────────────────────                                               │
│                                                                              │
│  [Unsubscribe from all communications]                                      │
│  ⓘ You will still receive donation receipts and account security notices.   │
│                                                                              │
│  ─────────────────────────────                                               │
│                                                                              │
│  Data & Privacy                                                              │
│  [Download my data]  [Delete my account]                                    │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  [Save Changes]                                                      │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│  Partido Verde de Puerto Rico · Privacidad · Términos · Ayuda              │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## Public Event Page (No Auth)

Accessible via shared link. Tenant-branded.

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  🌿 Partido Verde de Puerto Rico                               [Español ▾] │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                                                                      │   │
│  │              [Event hero image or color block]                       │   │
│  │                                                                      │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  Rally at Plaza del Mercado                                                  │
│  ═══════════════════════════                                                 │
│                                                                              │
│  📅  March 5, 2026 · 6:00 PM — 9:00 PM                                     │
│  📍  Plaza del Mercado, Calle Dos Hermanos, San Juan, PR                    │
│  👥  142 people going                                                        │
│                                                                              │
│  ─────────────────────────────                                               │
│                                                                              │
│  Join us for a community rally featuring live music, speakers,              │
│  food vendors, and a celebration of our campaign progress.                  │
│                                                                              │
│  Featured speakers:                                                          │
│  • Ana Martínez, Candidate for District 5                                   │
│  • Dr. Elena Torres, Healthcare Policy Director                             │
│  • Carlos Rivera, Community Organizer                                       │
│                                                                              │
│  ─────────────────────────────                                               │
│                                                                              │
│  ┌────────────────────────────────────────────────────────┐                  │
│  │                                                        │                  │
│  │  RSVP                                                  │                  │
│  │                                                        │                  │
│  │  Name *           ┌──────────────────────────┐        │                  │
│  │                    │                          │        │                  │
│  │                    └──────────────────────────┘        │                  │
│  │  Email *          ┌──────────────────────────┐        │                  │
│  │                    │                          │        │                  │
│  │                    └──────────────────────────┘        │                  │
│  │  Phone (optional) ┌──────────────────────────┐        │                  │
│  │                    │                          │        │                  │
│  │                    └──────────────────────────┘        │                  │
│  │                                                        │                  │
│  │  ┌──────────────────────────────────────────────┐     │                  │
│  │  │  ✓  RSVP — I'm Going                        │     │                  │
│  │  └──────────────────────────────────────────────┘     │                  │
│  │                                                        │                  │
│  └────────────────────────────────────────────────────────┘                  │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  [Map showing venue location]                                        │   │
│  │                                                                      │   │
│  │  [Get Directions →]                                                  │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ─────────────────────────────                                               │
│  Share: [Facebook] [Twitter] [WhatsApp] [Copy Link]                         │
│                                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│  Partido Verde de Puerto Rico · Privacidad · Términos                       │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## SUP-003: Donation Receipt View

Accessed from the donation history table (SUP-002) by tapping a donation row. Displays a printable, downloadable receipt for a single donation. Mobile-first single-column layout.

```
┌──────────────────────────────┐
│  🌿 Partido Verde            │
├──────────────────────────────┤
│                              │
│  [← Back to History]        │
│                              │
│  ┌──────────────────────────┐│
│  │  🌿 Partido Verde de     ││
│  │  Puerto Rico              ││
│  │                           ││
│  │  Donation Receipt         ││
│  │  ════════════════         ││
│  └──────────────────────────┘│
│                              │
│  Date                        │
│  March 1, 2026               │
│                              │
│  Amount                      │
│  $100.00 USD                 │
│                              │
│  Donor                       │
│  Ana Martínez                │
│  ana@email.com               │
│                              │
│  Payment Method              │
│  Visa ending in 4242         │
│                              │
│  Transaction ID              │
│  #GG-2026-4521               │
│                              │
│  ─────────────────────       │
│                              │
│  Tax Deductibility           │
│  This contribution is not    │
│  tax-deductible for federal  │
│  income tax purposes.        │
│                              │
│  ─────────────────────       │
│                              │
│  Paid for by Partido Verde   │
│  de Puerto Rico. Federal law │
│  requires us to use our best │
│  efforts to collect and      │
│  report the name, mailing    │
│  address, occupation, and    │
│  name of employer of         │
│  individuals whose           │
│  contributions exceed $200   │
│  in an election cycle.       │
│                              │
│  ┌──────────────────────────┐│
│  │  ↓  Download PDF         ││
│  └──────────────────────────┘│
│  ┌──────────────────────────┐│
│  │  ✉  Email Receipt        ││
│  └──────────────────────────┘│
│                              │
│  [← Back to History]        │
│                              │
│  Privacy · Terms             │
└──────────────────────────────┘
```

The receipt header displays the organization's logo and name, followed by the receipt title. Donation details are presented in a label/value list format optimized for scanning. The tax deductibility statement and compliance disclaimer are pulled from the organization's compliance configuration — different tenants may have different legal language depending on their jurisdiction and tax status.

The two action buttons allow the supporter to download a PDF version of the receipt (for filing) or email a copy to their address on file. Both buttons are full-width on mobile for easy tap targets.

---

## SUP-005: Payment Method Update

Accessed from the recurring donation management section of donation history (SUP-002) via the "Actualizar Tarjeta" button, or from account settings. Requires a full account — magic link access is not sufficient for financial changes.

```
┌──────────────────────────────┐
│  🌿 Partido Verde            │
├──────────────────────────────┤
│                              │
│  [← Back to Donations]      │
│                              │
│  Update Payment Method       │
│  ═══════════════════════     │
│                              │
│  Current Payment Method      │
│  ─────────────────────       │
│  ┌──────────────────────────┐│
│  │  💳 Visa ending in 4242  ││
│  │  Expires: 12/2027        ││
│  └──────────────────────────┘│
│                              │
│  ⓘ This will update the     │
│  payment method for 1 active │
│  recurring donation.         │
│                              │
│  New Payment Method          │
│  ─────────────────────       │
│                              │
│  ┌──────────────────────────┐│
│  │  Card Number              ││
│  │  ┌──────────────────────┐││
│  │  │                      │││
│  │  └──────────────────────┘││
│  │  Exp          CVV        ││
│  │  ┌──────────┐ ┌────────┐││
│  │  │          │ │        │││
│  │  └──────────┘ └────────┘││
│  └──────────────────────────┘│
│                              │
│  Billing Address             │
│  ─────────────────────       │
│                              │
│  Address *                   │
│  ┌──────────────────────────┐│
│  │                          ││
│  └──────────────────────────┘│
│  City *                      │
│  ┌──────────────────────────┐│
│  │                          ││
│  └──────────────────────────┘│
│  State *        ZIP *        │
│  ┌────────────┐ ┌──────────┐│
│  │  PR ▾      │ │          ││
│  └────────────┘ └──────────┘│
│                              │
│  ┌──────────────────────────┐│
│  │  Update Payment Method   ││
│  └──────────────────────────┘│
│                              │
│  🔒 Your payment information │
│  is securely processed by    │
│  [processor name]. GreenGrass│
│  does not store your card    │
│  details.                    │
│                              │
│  Privacy · Terms             │
└──────────────────────────────┘
```

The card entry fields are rendered inside a PCI-compliant iframe provided by the payment processor — GreenGrass never handles raw card data. The billing address section is shown when required by the processor for address verification (AVS).

If the supporter has active recurring donations, an informational banner at the top of the form tells them how many recurring donations will be affected. On success, the screen shows a confirmation message:

```
┌──────────────────────────────┐
│                              │
│           ✓                  │
│                              │
│  Payment Method Updated      │
│  ─────────────────────       │
│                              │
│  Your next recurring         │
│  donation will use the new   │
│  card ending in 8910.        │
│                              │
│  [← Back to Donations]      │
│                              │
└──────────────────────────────┘
```

---

## SUP-006: Supporter Profile

Personal information management for supporters. Simpler than the staff profile screen (PROF-001) — no avatar, no timezone, no role information. Accessed from the "Mi Perfil" tab in the portal navigation.

```
┌──────────────────────────────┐
│  🌿 Partido Verde            │
├──────────────────────────────┤
│                              │
│  [◉ Mi Perfil]  [Donaciones]│
│  [Eventos]  [Preferencias]   │
│                              │
├──────────────────────────────┤
│                              │
│  Mi Perfil                   │
│  ═════════                   │
│                              │
│  First Name *                │
│  ┌──────────────────────────┐│
│  │ Ana                      ││
│  └──────────────────────────┘│
│                              │
│  Last Name *                 │
│  ┌──────────────────────────┐│
│  │ Martínez                 ││
│  └──────────────────────────┘│
│                              │
│  Email                       │
│  ana@email.com               │
│  ⓘ Managed via your account │
│                              │
│  Phone                       │
│  ┌──────────────────────────┐│
│  │ +1 787-555-0147          ││
│  └──────────────────────────┘│
│  [Verify Phone]              │
│                              │
│  ─────────────────────       │
│                              │
│  Mailing Address             │
│  (used for receipts and      │
│  year-end statements)        │
│                              │
│  Address                     │
│  ┌──────────────────────────┐│
│  │ 123 Calle Sol            ││
│  └──────────────────────────┘│
│  City                        │
│  ┌──────────────────────────┐│
│  │ San Juan                 ││
│  └──────────────────────────┘│
│  State           ZIP         │
│  ┌────────────┐ ┌──────────┐│
│  │  PR ▾      │ │ 00901    ││
│  └────────────┘ └──────────┘│
│                              │
│  ─────────────────────       │
│                              │
│  Language Preference         │
│  ┌──────────────────────────┐│
│  │  Español ▾               ││
│  └──────────────────────────┘│
│                              │
│  ┌──────────────────────────┐│
│  │  Save Changes            ││
│  └──────────────────────────┘│
│                              │
│  ─────────────────────       │
│                              │
│  [Delete My Account]         │
│                              │
│  Privacy · Terms             │
└──────────────────────────────┘
```

The email field is read-only — displayed as plain text with a helper note. Email changes are handled through account management (password reset / re-verification flow), not inline editing.

Phone verification uses a one-time code sent via SMS. Tapping "Verify Phone" sends a code and displays an inline verification field:

```
  Phone
  ┌──────────────────────────┐
  │ +1 787-555-0147          │
  └──────────────────────────┘
  Enter verification code:
  ┌──────────────────────────┐
  │                          │
  └──────────────────────────┘
  [Verify]  [Resend Code]
```

The "Delete My Account" link at the bottom triggers a confirmation dialog explaining data retention:

```
┌──────────────────────────────┐
│                              │
│  Delete Your Account?        │
│  ─────────────────────       │
│                              │
│  This will:                  │
│  • Remove your personal info │
│  • Cancel recurring donations│
│  • Remove event RSVPs        │
│                              │
│  Donation records will be    │
│  retained as required by     │
│  campaign finance law, but   │
│  your account will be        │
│  deactivated.                │
│                              │
│  ┌──────────────────────────┐│
│  │  Delete My Account       ││
│  └──────────────────────────┘│
│  [Cancel]                    │
│                              │
└──────────────────────────────┘
```

---

## SUP-007: Communication Preferences

Supporter's control over how the organization contacts them. Accessed from the "Preferencias" tab in the portal navigation. This is a dedicated, more detailed version of the preferences — the existing Preferences screen in the portal provides a consolidated view, while this screen offers granular per-channel control.

```
┌──────────────────────────────┐
│  🌿 Partido Verde            │
├──────────────────────────────┤
│                              │
│  [Mi Perfil]  [Donaciones]  │
│  [Eventos]  [◉ Preferencias]│
│                              │
├──────────────────────────────┤
│                              │
│  Communication Preferences   │
│  ════════════════════════    │
│                              │
│  Email                       │
│  ─────────────────────       │
│  ☑ Campaign updates          │
│  ☑ Donation receipts         │
│    ⓘ Cannot be disabled     │
│  ☑ Event invitations         │
│  ☐ Fundraising appeals       │
│                              │
│  SMS                         │
│  ─────────────────────       │
│  ☑ Event reminders           │
│  ☐ Campaign updates          │
│                              │
│  WhatsApp                    │
│  ─────────────────────       │
│  ☐ All communications        │
│                              │
│  ─────────────────────       │
│                              │
│  How often should we email   │
│  you?                        │
│  ┌──────────────────────────┐│
│  │  As needed ▾             ││
│  └──────────────────────────┘│
│  Options: As needed /        │
│  Weekly digest /             │
│  Monthly digest              │
│                              │
│  ─────────────────────       │
│                              │
│  Data Sharing                │
│  ☐ Allow Partido Verde to   │
│    share my contact info     │
│    with allied organizations │
│                              │
│  ─────────────────────       │
│                              │
│  ┌──────────────────────────┐│
│  │  Save Preferences        ││
│  └──────────────────────────┘│
│                              │
│  [Unsubscribe from all]     │
│  ⓘ You can update these     │
│  preferences at any time.    │
│  Required transactional      │
│  emails (receipts, account   │
│  changes) cannot be disabled.│
│                              │
│  Privacy · Terms             │
└──────────────────────────────┘
```

The "Unsubscribe from all" link triggers a confirmation dialog:

```
┌──────────────────────────────┐
│                              │
│  Unsubscribe from All?       │
│  ─────────────────────       │
│                              │
│  You will stop receiving:    │
│  • Campaign updates          │
│  • Event invitations         │
│  • Fundraising appeals       │
│  • SMS and WhatsApp messages │
│                              │
│  You will still receive:     │
│  • Donation receipts         │
│  • Account security notices  │
│                              │
│  ┌──────────────────────────┐│
│  │  Unsubscribe from All    ││
│  └──────────────────────────┘│
│  [Cancel]                    │
│                              │
└──────────────────────────────┘
```

Channel preferences are persisted per-supporter and respected by all outbound communication systems (email, SMS, WhatsApp). The frequency preference controls email digest batching — when set to "Weekly digest" or "Monthly digest," non-urgent emails are aggregated into a single message rather than sent individually.

---

## SUP-009: Year-End Statement Download

Tax statement summarizing a full year of donations. Accessed from the donation history page (SUP-002) via the "Generar Resumen Anual" link. Only years with recorded donations appear in the year selector.

```
┌──────────────────────────────┐
│  🌿 Partido Verde            │
├──────────────────────────────┤
│                              │
│  [← Back to Donations]      │
│                              │
│  Year-End Statement          │
│  ═══════════════════         │
│                              │
│  Year                        │
│  ┌──────────────────────────┐│
│  │  2025 ▾                  ││
│  └──────────────────────────┘│
│                              │
│  ┌──────────────────────────┐│
│  │                           ││
│  │  Donation Summary         ││
│  │  ─────────────────        ││
│  │                           ││
│  │  Year:       2025         ││
│  │  Total:      $1,250.00    ││
│  │  Donations:  8            ││
│  │                           ││
│  │  Organization:            ││
│  │  Partido Verde de         ││
│  │  Puerto Rico              ││
│  │                           ││
│  │  Tax ID:                  ││
│  │  XX-XXXXXXX               ││
│  │                           ││
│  └──────────────────────────┘│
│                              │
│  ┌──────────────────────────┐│
│  │  ↓  Download PDF Statement││
│  └──────────────────────────┘│
│  ┌──────────────────────────┐│
│  │  ✉  Email Statement      ││
│  └──────────────────────────┘│
│                              │
│  ─────────────────────       │
│                              │
│  This contribution is not    │
│  tax-deductible for federal  │
│  income tax purposes. Paid   │
│  for by Partido Verde de     │
│  Puerto Rico.                │
│                              │
│  Privacy · Terms             │
└──────────────────────────────┘
```

When the supporter selects a year with no donations, the summary card is replaced with an empty state:

```
┌──────────────────────────────┐
│                              │
│  No donations recorded       │
│  for 2024.                   │
│                              │
│  Select another year or      │
│  [Make a Donation →]         │
│                              │
└──────────────────────────────┘
```

The PDF statement is generated server-side and includes: the organization's name and tax ID (if applicable), the supporter's name and mailing address (from their profile), a line-item table of all donations for the selected year, and the total. The tax deductibility footer text is pulled from the organization's compliance configuration — the language shown here ("not tax-deductible") is an example; some organizations in different jurisdictions may have deductible contributions and different required language.

The "Email Statement" button sends the PDF to the supporter's email address on file, with a confirmation toast: "Statement emailed to ana@email.com."

---

## Empty States Summary

| Screen | Empty State | Message | Action |
|--------|-------------|---------|--------|
| Portal Home | No donation history | "You haven't made any donations yet." | [Make a Donation →] |
| Donation History | No donations | "No donations found." | [Make a Donation →] |
| My Events | No RSVPs | "You haven't RSVPed to any events yet." | [Browse Events →] |
| Recurring Management | No recurring | "You don't have any recurring donations." | [Set Up Monthly Giving →] |

## Accessibility Notes

- All form fields properly labeled with `<label>` elements
- Amount selection buttons behave as radio group (`role="radiogroup"`)
- Donation form validation: inline errors, field-level announcements via `aria-describedby`
- Receipt downloads: announced to screen reader
- RSVP buttons: clear state change ("RSVP — I'm Going" → "You're Going ✓")
- Portal navigation: `role="navigation"` with `aria-label="Supporter portal"`
- Color contrast: tenant brand colors validated for WCAG AA on white/light backgrounds

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Tenant-branded portal | Org's colors, logo, and name — not GreenGrass-branded | Supporters should feel they're interacting with their org |
| Two-tier authentication | Magic link for viewing, full account for management | Low barrier to see history; higher bar for financial changes |
| No dark mode on public pages | Always tenant's configured theme (typically light) | Consistent brand experience across all supporters |
| Mobile-first design | Designed for phone, adapted up to desktop | Most supporters access from social media links on phones |
| Compliance disclaimers in system style | Not branded — legal requirement | Disclaimers must be clearly distinguishable from marketing content |
| Donation amounts as button grid | Pre-set amounts + custom field | Faster than free-text; pre-sets can be optimized per campaign |
| Horizontal nav (not sidebar) | Simple page-to-page navigation | Portal has fewer screens; sidebar would be overkill |

## Open Questions

1. **Peer-to-peer fundraising pages.** Deferred feature, but the portal architecture should accommodate personal fundraising pages in the future (supporters creating their own pages to share).

2. **Donor wall / leaderboard.** Should the portal include an optional "Top Donors" or campaign progress page visible to all supporters? Motivates giving but may raise privacy concerns.

3. **Portal as PWA.** Should the supporter portal be installable as a PWA from the browser? Supporters don't need the full Capacitor app, but a home-screen shortcut with push notifications could bring supporters back more often.
