# Theming Strategy

## Purpose

This document defines how GreenGrass supports per-tenant visual branding, RTL layouts, dark mode, and accessibility themes. Every tenant runs the same application code — theming happens entirely through design token overrides, not code changes.

## Per-Tenant Branding

### What Tenants Can Customize

| Element | Customizable | How |
|---------|-------------|-----|
| **Primary color** | Yes | Maps to `--color-primary` and its derivatives |
| **Logo** | Yes | Uploaded in org settings; displayed in header bar and public pages |
| **Favicon** | Yes | Uploaded; replaces default in browser tab |
| **Brand name** | Yes | Text in header bar, document titles, email templates |
| **Accent color** | Optional | Secondary brand color for data visualization, charts |
| **Font** | No | System font stack. Tenants cannot change it. |
| **Layout** | No | Navigation structure, spacing, grid are fixed. |
| **Component styles** | No | Button shapes, card styles, input styles are fixed. |
| **Icons** | No | Lucide icon set is fixed. |

### Why Font and Layout Are Fixed

Per-tenant font and layout customization would:
- Break spacing and alignment (different fonts have different metrics)
- Require per-tenant testing of every screen
- Increase bundle size (loading different fonts per tenant)
- Create maintenance burden that grows with tenant count

The trade-off is intentional: tenants get color/logo customization (which covers 90% of brand expression needs) without the engineering cost of deeper customization.

### Theme Token Override

A tenant's theme is expressed as a set of CSS custom property overrides:

```css
/* Default theme (GreenGrass defaults) */
:root {
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-primary-active: #1e40af;
  --color-primary-subtle: #eff6ff;
  --color-on-primary: #ffffff;
}

/* Tenant override (e.g., Partido Verde - green brand) */
:root[data-theme="partido-verde"] {
  --color-primary: #16a34a;
  --color-primary-hover: #15803d;
  --color-primary-active: #166534;
  --color-primary-subtle: #f0fdf4;
  --color-on-primary: #ffffff;
}
```

### Automatic Derivative Colors

When a tenant sets their primary color, the system automatically generates:
- **Hover state:** 10% darker
- **Active/pressed state:** 20% darker
- **Subtle background:** 95% lighter (near-white tint)
- **On-primary text:** White or black, whichever meets 4.5:1 contrast against the primary color

This auto-generation runs server-side during theme configuration. The Org Admin sees a preview before saving.

### Theme Configuration UX

In Settings > Org Profile & Branding:

```
┌──────────────────────────────────────────────────────┐
│  Branding                                             │
├──────────────────────────────────────────────────────┤
│                                                       │
│  Organization Name: [Partido Verde de Puerto Rico  ]  │
│                                                       │
│  Logo:  [Current logo]  [Upload New]                  │
│  Favicon: [Current icon]  [Upload New]                │
│                                                       │
│  Brand Color:                                         │
│  [#16a34a]  [Color picker ▾]                          │
│                                                       │
│  Preview:                                             │
│  ┌────────────────────────────────────────────────┐   │
│  │  [Logo]  Partido Verde    [●] [🔔] [👤]       │   │
│  │  ┌──────┐                                      │   │
│  │  │ Nav  │  [Primary Button]  [Link Text]       │   │
│  │  │ item │  [Active Tab]  [Inactive Tab]        │   │
│  │  └──────┘                                      │   │
│  └────────────────────────────────────────────────┘   │
│                                                       │
│  ⚠ If your brand color has low contrast against      │
│    white, text will automatically switch to dark.     │
│                                                       │
│  [Cancel]                                     [Save]  │
└──────────────────────────────────────────────────────┘
```

### Brand Color Constraints

The Org Admin can choose any brand color, but the system enforces accessibility:
- If the chosen color has insufficient contrast with white text, `--color-on-primary` switches to dark text automatically.
- If the chosen color is too light for use as link text against white backgrounds, `--color-text-link` uses a darkened variant.
- A warning appears if the color is close to status colors (red, amber, green) — "This color is similar to error/warning/success indicators, which may cause confusion."

### Public Page Theming

Public pages (donation forms, event pages, candidate profiles) inherit the tenant's theme more aggressively:
- Tenant logo prominent in header
- Primary color used for buttons, links, and accents
- Optional hero background color or image
- Compliance disclaimers remain in the standard system font and style (not branded — legal requirements)

---

## RTL Support

### Structural Approach

RTL is not a theme — it's a layout mode. The entire application flips when the UI language is RTL (Arabic, Hebrew).

```css
/* LTR (default) */
html[dir="ltr"] {
  --sidebar-position: inline-start;  /* left */
  --detail-panel-position: inline-end;  /* right */
}

/* RTL */
html[dir="rtl"] {
  --sidebar-position: inline-start;  /* right */
  --detail-panel-position: inline-end;  /* left */
}
```

### What Flips

| Element | LTR | RTL |
|---------|-----|-----|
| Sidebar position | Left | Right |
| Detail panel position | Right | Left |
| Text alignment | Left-aligned | Right-aligned |
| Navigation arrows/chevrons | Points right (forward) | Points left (forward) |
| Breadcrumb direction | Left → Right | Right → Left |
| Tab bar order | Left-to-right | Right-to-left |
| Progress bars | Fill left-to-right | Fill right-to-left |
| Form labels | Left of input (or above) | Right of input (or above) |
| List item icons | Left side | Right side |
| Notification drawer | Slides from right | Slides from left |
| Number input spinners | Right side | Left side |

### What Does NOT Flip

| Element | Behavior | Why |
|---------|----------|-----|
| Phone numbers | Always LTR | International standard |
| Email addresses | Always LTR | Technical standard |
| URLs | Always LTR | Technical standard |
| Currency amounts | Always LTR | International standard |
| Code/technical text | Always LTR | Universal |
| Maps | No flip | Geographic north/south/east/west don't flip |
| Media playback controls | No flip | Universal convention |
| Checkmarks | No flip | Not directional |
| Close buttons (✗) | No flip | Not directional |

### Implementation

RTL is handled entirely through CSS logical properties:

```css
/* Never this: */
margin-left: var(--space-4);
padding-right: var(--space-2);
text-align: left;

/* Always this: */
margin-inline-start: var(--space-4);
padding-inline-end: var(--space-2);
text-align: start;
```

This means no duplicate stylesheets, no RTL-specific CSS files, no conditional classes. A single stylesheet works for both directions. The `dir` attribute on `<html>` triggers the correct behavior.

### RTL Font Considerations

Arabic script requires specific typographic attention:
- **Arabic text uses system fonts** — the font stack falls through to Noto Sans Arabic, Arabic UI Text, or system Arabic fonts.
- **Mixed-direction text** — a paragraph in Arabic containing an English brand name or email address uses Unicode bidirectional algorithm (BiDi) for inline direction switching. No manual intervention needed in most cases.
- **Numerals** — Arabic-language UI uses Western Arabic numerals (0-9), not Eastern Arabic numerals (٠-٩), for consistency with data displays and international standards. This is configurable per tenant if needed.

### RTL Testing

Every component and screen must be tested in RTL mode. The development environment includes a language toggle that switches between LTR and RTL instantly for visual verification.

---

## Dark Mode

### Approach

Dark mode is a user preference, not a tenant setting. It applies across the entire application.

### Token Mapping

Dark mode remaps all surface, text, and border tokens:

| Token | Light | Dark |
|-------|-------|------|
| `--color-surface` | `#ffffff` | `#0f172a` |
| `--color-surface-raised` | `#ffffff` | `#1e293b` |
| `--color-surface-sunken` | `#f8fafc` | `#020617` |
| `--color-text` | `#0f172a` | `#f1f5f9` |
| `--color-text-secondary` | `#475569` | `#94a3b8` |
| `--color-text-tertiary` | `#94a3b8` | `#64748b` |
| `--color-border` | `#e2e8f0` | `#334155` |
| `--color-border-strong` | `#cbd5e1` | `#475569` |
| `--color-input-border` | `#cbd5e1` | `#475569` |
| `--color-disabled` | `#f1f5f9` | `#1e293b` |

### Primary Color in Dark Mode

The tenant's primary color may need adjustment in dark mode:
- If the primary color is dark (e.g., dark blue), it may lack contrast against the dark background. The system auto-lightens it for dark mode.
- If the primary color is already light (e.g., yellow), it may be used as-is or slightly saturated.
- `--color-primary-subtle` inverts — instead of a near-white tint, it becomes a near-black tint of the primary.

### Status Colors in Dark Mode

Status colors (success, warning, error) shift to slightly lighter/more saturated variants in dark mode to maintain visibility against dark backgrounds.

### Dark Mode Activation

- **User setting:** Toggle in personal profile preferences
- **System preference:** Respects `prefers-color-scheme: dark` media query by default
- **Override:** User can override system preference (force light, force dark, or follow system)
- **Persistence:** User's choice persisted to profile (server-side), applies across devices

### Dark Mode Exclusions

Some elements don't change in dark mode:
- **Public donation forms** — always use the tenant's brand-configured theme (typically light). Dark mode applies to the platform, not public pages.
- **Print views** — always light.
- **Map tiles** — map providers have their own dark mode tiles (optional).

### War Room Dark Mode

The war room dashboard defaults to dark mode during election night operations (override-able). Dark mode is easier on eyes during prolonged monitoring in dimly lit rooms, and large-screen war room displays look better with dark backgrounds.

---

## Accessibility Themes

Beyond dark mode, the design system supports accessibility overrides:

### High Contrast Mode

Activated in personal accessibility preferences. Overrides:

| Change | Effect |
|--------|--------|
| Border width | All borders `1px` → `2px` |
| Focus rings | `2px` → `3px`, with `2px` offset |
| Text contrast | All text meets 7:1 ratio (WCAG AAA) |
| Color simplification | Subtle background colors become more distinct |
| Status indicators | Icons added to all color-only indicators |
| Link underlines | All links are underlined (not just on hover) |

### Large Text Mode

For users who need larger text without zooming (which can break layouts):

| Change | Effect |
|--------|--------|
| Base font size | 16px → 20px |
| Minimum font size | 12px → 16px |
| Line heights | Proportionally increased |
| Touch targets | 44px → 52px minimum |
| Spacing | Proportionally increased |

**Note:** Large text mode may cause some desktop layouts to behave like tablet layouts (less content visible, more scrolling). This is acceptable — usability over information density.

### Reduced Motion Mode

Respects `prefers-reduced-motion: reduce`:
- All transitions: `duration: 0ms`
- No animated loading indicators (static icon instead)
- No auto-scrolling in war room feed (manual scroll only)
- No skeleton loader pulsing (static grey blocks instead)

---

## Theme Composition

Themes compose — multiple concerns are applied simultaneously:

```
Base tokens (foundations.md)
  └── Tenant brand override (primary color, logo)
      └── Color mode (light / dark)
          └── Accessibility overrides (high contrast, large text)
              └── Context overrides (field mode density, war room dark)
```

Each layer only overrides what it needs. A tenant's dark mode high-contrast theme = base tokens + tenant brand + dark palette + high contrast adjustments. The CSS cascade handles this naturally through specificity:

```css
:root { /* base */ }
:root[data-theme="partido-verde"] { /* tenant */ }
:root[data-color-mode="dark"] { /* dark mode */ }
:root[data-high-contrast="true"] { /* accessibility */ }
:root[data-context="field-mode"] { /* context */ }
```

---

## Open Questions

1. **Tenant dark mode defaults.** Should tenants be able to set a default color mode (light/dark) for new users? Some campaigns run in the evening; dark mode default might be appropriate.

2. **Seasonal/campaign themes.** Should tenants be able to configure time-limited theme overrides (election day theme, fundraising drive theme)? Adds visual dynamism but increases complexity.

3. **White-label depth.** Some tenants (particularly self-hosted) may want deeper white-labeling (custom app name, custom login screen, custom email templates). How deep does theming go? Currently limited to color + logo. Full white-label would require a different architecture.

<!-- REVISIT: The auto-generation of derivative colors (hover, active, subtle, on-primary) needs an algorithm that works across the full color gamut. HSL manipulation is simple but produces poor results for some hues. Consider using OKLCH or a perceptual color space for better results. -->
