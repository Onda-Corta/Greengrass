# Design System Foundations

## Purpose

This document defines the visual and spatial primitives of the GreenGrass design system — spacing, color, typography, grid, elevation, iconography, and motion. These foundations produce every component and screen in the platform.

No brand exists yet. This design system is built to be themed — every tenant applies their own branding on top of these structural foundations. The foundations define the *rules*; the theme defines the *look*. See `theming-strategy.md` for how per-tenant branding works.

## Design Tokens

All foundational values are expressed as design tokens — named, reusable values that can be overridden per theme. Tokens are implemented as CSS custom properties (variables) and referenced by name, never as raw values.

```css
/* Never this: */
padding: 16px;
color: #2563eb;

/* Always this: */
padding: var(--space-4);
color: var(--color-primary);
```

This indirection is what makes per-tenant theming possible without changing component code.

---

## Spacing

### Scale

An 8px base unit with a geometric scale. Every spatial value in the system — padding, margin, gap, component sizing — uses this scale.

| Token | Value | Use |
|-------|-------|-----|
| `--space-0` | 0px | Reset, collapsed states |
| `--space-px` | 1px | Borders, dividers |
| `--space-0.5` | 2px | Tight inline spacing |
| `--space-1` | 4px | Icon padding, badge spacing |
| `--space-2` | 8px | Compact internal padding, small gaps |
| `--space-3` | 12px | Default inline gap, list item padding |
| `--space-4` | 16px | Standard component padding, card padding |
| `--space-5` | 20px | Comfortable section padding |
| `--space-6` | 24px | Section gaps, form field spacing |
| `--space-8` | 32px | Large section gaps |
| `--space-10` | 40px | Page section spacing |
| `--space-12` | 48px | Major layout gaps |
| `--space-16` | 64px | Page margins (desktop) |
| `--space-20` | 80px | Large layout spacing |
| `--space-24` | 96px | Maximum component height reference |

### Usage Guidelines

- **Component internal padding:** `--space-3` (compact) or `--space-4` (standard)
- **Space between form fields:** `--space-6`
- **Space between sections:** `--space-8` or `--space-10`
- **Card padding:** `--space-4` (mobile) or `--space-6` (desktop)
- **Page margin (mobile):** `--space-4`
- **Page margin (desktop):** `--space-8` to `--space-16`

### Touch Targets

Minimum touch target size on mobile: **44x44px** (WCAG 2.1 AA). This is a hard floor — no interactive element can be smaller.

In field mode, touch targets increase to **48x48px** minimum. Field mode is designed for one-handed use in difficult conditions — larger targets reduce errors.

---

## Color

### Color Architecture

The color system has three layers:

1. **Primitive palette** — raw color values (hex codes). Not used directly in components.
2. **Semantic tokens** — named colors that describe their *purpose*, not their *hue*. These are what components reference.
3. **Theme overrides** — per-tenant customizations that remap semantic tokens to different primitive values.

### Semantic Color Tokens

| Token | Purpose | Default Value | Notes |
|-------|---------|--------------|-------|
| **Surface** | | | |
| `--color-surface` | Page/app background | `#ffffff` | |
| `--color-surface-raised` | Cards, panels, modals | `#ffffff` | Differentiated by elevation shadow |
| `--color-surface-sunken` | Inset areas, input backgrounds | `#f8fafc` | |
| `--color-surface-overlay` | Modal/drawer backdrops | `rgba(0,0,0,0.5)` | |
| **Text** | | | |
| `--color-text` | Primary text | `#0f172a` | |
| `--color-text-secondary` | Secondary/helper text | `#475569` | |
| `--color-text-tertiary` | Placeholder, disabled text | `#94a3b8` | |
| `--color-text-inverse` | Text on dark backgrounds | `#ffffff` | |
| `--color-text-link` | Links | `--color-primary` | |
| **Primary** | | | |
| `--color-primary` | Primary actions, active states | `#2563eb` | Tenant-brandable |
| `--color-primary-hover` | Primary hover state | `#1d4ed8` | |
| `--color-primary-active` | Primary pressed state | `#1e40af` | |
| `--color-primary-subtle` | Primary backgrounds, badges | `#eff6ff` | |
| `--color-on-primary` | Text on primary | `#ffffff` | Auto-calculated for contrast |
| **Status** | | | |
| `--color-success` | Success states, confirmations | `#16a34a` | |
| `--color-success-subtle` | Success backgrounds | `#f0fdf4` | |
| `--color-warning` | Warnings, attention needed | `#d97706` | |
| `--color-warning-subtle` | Warning backgrounds | `#fffbeb` | |
| `--color-error` | Errors, destructive actions | `#dc2626` | |
| `--color-error-subtle` | Error backgrounds | `#fef2f2` | |
| `--color-info` | Informational | `#2563eb` | |
| `--color-info-subtle` | Info backgrounds | `#eff6ff` | |
| **Interactive** | | | |
| `--color-border` | Default borders | `#e2e8f0` | |
| `--color-border-strong` | Emphasized borders | `#cbd5e1` | |
| `--color-border-focus` | Focus rings | `--color-primary` | |
| `--color-input-border` | Form input borders | `#cbd5e1` | |
| `--color-disabled` | Disabled backgrounds | `#f1f5f9` | |
| `--color-disabled-text` | Disabled text | `#94a3b8` | |
| **Sync/Connectivity** | | | |
| `--color-sync-connected` | Online/synced | `#16a34a` | Green dot |
| `--color-sync-stale` | Connected but stale | `#d97706` | Amber |
| `--color-sync-offline` | Offline | `#94a3b8` | Grey |
| `--color-sync-error` | Sync error | `#dc2626` | Red |
| **Data Visualization** | | | |
| `--color-chart-1` through `--color-chart-8` | Chart series | Sequential palette | Distinguishable in colorblind simulations |

### Color Accessibility

- **Text contrast:** All text meets WCAG 2.1 AA minimum — 4.5:1 for normal text, 3:1 for large text (18px+ or 14px+ bold).
- **UI component contrast:** Interactive elements (buttons, inputs, icons) meet 3:1 against adjacent colors.
- **No color-only encoding:** Every piece of information conveyed by color is also conveyed by text, icon, or pattern. A red badge also has "Error" text. A green dot also has "Connected" text (or tooltip).
- **Colorblind safety:** The data visualization palette is tested against deuteranopia, protanopia, and tritanopia simulations. Status colors (success/warning/error) use hue + luminance differentiation, not hue alone.
- **Dark mode:** All tokens have dark mode equivalents. See `theming-strategy.md`.

### High Contrast Mode

For users who need maximum contrast (setting in accessibility preferences):
- All borders become `2px solid` instead of `1px solid`
- Text colors collapse to two values: primary text (`#000000`) and secondary text (`#333333`)
- Background colors collapse to `#ffffff` and `#f5f5f5`
- Focus rings become `3px solid` with offset
- All subtle background colors become more pronounced

---

## Typography

### Font Stack

```css
--font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
             'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
             'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji';
--font-mono: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas,
             'DejaVu Sans Mono', monospace;
```

**Why system fonts:** Zero font loading. No network requests, no FOIT/FOUT, no layout shift. The text renders instantly with the font the device already has — critical for low-end phones on slow connections where a custom font download adds seconds to first contentful paint. System fonts also have the best native script support: San Francisco on Apple, Segoe UI on Windows, Roboto on Android, and Noto Sans as a broad Unicode fallback covering Latin, Thai, Hindi, Arabic, and Portuguese diacritics natively.

**No custom fonts, no Google Fonts dependency.** This is a deliberate constraint. Every device in our target markets ships with a high-quality system sans-serif that's optimized for that device's screen. Loading a web font to override it trades performance for brand control — and there's no brand yet. If a brand typeface is adopted later, it can be added to the front of the stack without changing any component code.

**Script coverage:** System font stacks handle multi-script rendering natively. `system-ui` on Android resolves to Roboto for Latin and Noto Sans Thai/Devanagari/Arabic for those scripts. On iOS, San Francisco delegates to platform-appropriate fonts per script. No language-specific font overrides are needed — the OS handles it.

### Type Scale

A modular scale based on a 1.25 ratio (major third), anchored at 16px body text.

| Token | Size | Line Height | Weight | Use |
|-------|------|-------------|--------|-----|
| `--text-xs` | 12px | 16px | 400 | Badges, captions, timestamps |
| `--text-sm` | 14px | 20px | 400 | Helper text, secondary labels, table cells |
| `--text-base` | 16px | 24px | 400 | Body text, form inputs, list items |
| `--text-lg` | 18px | 28px | 500 | Emphasized body, card titles |
| `--text-xl` | 20px | 28px | 600 | Section headings, dialog titles |
| `--text-2xl` | 24px | 32px | 600 | Page titles, dashboard widget headers |
| `--text-3xl` | 30px | 36px | 700 | Major headings |
| `--text-4xl` | 36px | 40px | 700 | Dashboard hero metrics |
| `--text-5xl` | 48px | 48px | 700 | Fundraising thermometer total, election night results |

### Font Weights

| Token | Weight | Use |
|-------|--------|-----|
| `--font-normal` | 400 | Body text, most content |
| `--font-medium` | 500 | Emphasized text, navigation items, form labels |
| `--font-semibold` | 600 | Headings, button text, card titles |
| `--font-bold` | 700 | Major headings, hero metrics |

### Typography Rules

- **Line length:** Maximum 75 characters per line for body text (readability). On desktop, content areas constrain width; on mobile, full-width is acceptable at mobile font sizes.
- **Paragraph spacing:** `--space-4` between paragraphs.
- **Heading spacing:** `--space-8` above headings, `--space-3` below (more space above to separate from previous content, less below to connect with following content).
- **No text smaller than 12px.** Even for captions and timestamps, 12px is the floor. On low-resolution mobile screens, smaller text is unreadable.
- **Field mode type sizes:** Body text in field mode is `--text-lg` (18px) minimum. Form labels are `--text-base` (16px). Response option buttons use `--text-lg`. Larger than standard because field volunteers may be reading in poor conditions.

---

## Grid

### Desktop Layout Grid

```
┌──────────────────────────────────────────────────────────────┐
│  Sidebar (240px / 64px)  │  Content (fluid)                  │
│                          │                                    │
│                          │  ┌──────────────────────────────┐ │
│                          │  │  12-column grid               │ │
│                          │  │  Column gap: --space-6 (24px) │ │
│                          │  │  Max width: 1280px            │ │
│                          │  │  Margin: auto (centered)      │ │
│                          │  └──────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

- **Sidebar width:** 240px expanded, 64px collapsed (persisted preference)
- **Content area:** Fluid, fills remaining space
- **Content grid:** 12 columns within the content area
- **Column gap:** `--space-6` (24px)
- **Content max-width:** 1280px (centered in the content area when viewport exceeds this)
- **Content padding:** `--space-8` on each side

### Mobile Layout Grid

```
┌──────────────────────────────┐
│  Full-width content           │
│                               │
│  4-column grid                │
│  Column gap: --space-4 (16px) │
│  Page margin: --space-4 (16px)│
│                               │
└──────────────────────────────┘
```

- **No sidebar** — full-width content
- **4 columns** within the content area
- **Column gap:** `--space-4` (16px)
- **Page margin:** `--space-4` (16px) on each side

### Tablet Grid

- **8 columns**
- **Column gap:** `--space-4` (16px)
- **Sidebar:** collapsed by default, expandable as overlay

### Common Layout Patterns

| Pattern | Desktop Columns | Tablet | Mobile |
|---------|----------------|--------|--------|
| Full-width content | 12 | 8 | 4 |
| Content + sidebar detail | 8 + 4 | 5 + 3 | Stacked (full + full) |
| Two-column form | 6 + 6 | 4 + 4 | Stacked |
| Three-column dashboard | 4 + 4 + 4 | 4 + 4 (third wraps) | Stacked |
| Settings page | 3 (nav) + 9 (content) | Full (tabs instead of nav) | Full |

---

## Elevation

Elevation (shadow depth) communicates layering — what's on top of what.

| Token | Shadow | Use |
|-------|--------|-----|
| `--elevation-0` | none | Flat elements, table rows |
| `--elevation-1` | `0 1px 2px rgba(0,0,0,0.05)` | Cards, raised surfaces |
| `--elevation-2` | `0 2px 4px rgba(0,0,0,0.1)` | Dropdowns, popovers |
| `--elevation-3` | `0 4px 8px rgba(0,0,0,0.1)` | Modals, drawers, floating panels |
| `--elevation-4` | `0 8px 16px rgba(0,0,0,0.15)` | Toasts, snackbars |

### Rules

- **Cards** use `--elevation-1`. On hover (if interactive), they gain `--elevation-2`.
- **Dropdowns and popovers** use `--elevation-2`.
- **Modals and drawers** use `--elevation-3`.
- **Toasts** use `--elevation-4` (highest — they float above everything).
- **Sidebar** uses `--elevation-1` on desktop. On mobile (as overlay), `--elevation-3`.
- **No elevation stacking** — if a modal contains a dropdown, the dropdown uses `--elevation-3` (same as modal, but rendered above via z-index), not `--elevation-5`.

---

## Borders and Radius

| Token | Value | Use |
|-------|-------|-----|
| `--radius-none` | 0px | No rounding (table cells, some inputs) |
| `--radius-sm` | 4px | Badges, tags, small elements |
| `--radius-md` | 6px | Buttons, inputs, cards |
| `--radius-lg` | 8px | Large cards, modals, drawers |
| `--radius-xl` | 12px | Dialog boxes, floating panels |
| `--radius-full` | 9999px | Avatars, pill badges, circular buttons |

### Rules

- **Buttons:** `--radius-md`
- **Input fields:** `--radius-md`
- **Cards:** `--radius-lg`
- **Modals:** `--radius-xl` (top corners only on mobile bottom sheets)
- **Avatars:** `--radius-full`
- **Tags/badges:** `--radius-sm`

---

## Iconography

### Icon System

- **Icon library:** Lucide Icons (open-source, MIT license, consistent 24px grid, 1000+ icons). Self-hosted, no external dependency.
- **Default size:** 20px (within a 24px bounding box for touch target padding)
- **Stroke width:** 1.5px (matches the Inter font's visual weight at body sizes)

<!-- REVISIT: the stroke weight is justified as matching "the Inter font's visual weight",
but this document and ADR-011 both reject Inter in favour of the system font stack. -->

### Icon Sizes

| Token | Size | Use |
|-------|------|-----|
| `--icon-xs` | 14px | Inline with small text, badge icons |
| `--icon-sm` | 16px | Inline with body text, form field icons |
| `--icon-md` | 20px | Navigation items, button icons, list item icons |
| `--icon-lg` | 24px | Section headers, standalone icons |
| `--icon-xl` | 32px | Feature icons, empty state illustrations |
| `--icon-2xl` | 48px | Hero illustrations, onboarding |

### Icon Rules

- **Directional icons mirror in RTL.** Arrows, chevrons, and directional indicators flip horizontally in RTL mode. Non-directional icons (checkmarks, stars, etc.) do not flip. The icon component handles this via CSS logical property awareness.
- **Color follows text.** Icons inherit the color of adjacent text by default. Override only for status indicators (green checkmarks, red errors).
- **No decorative icons.** Every icon conveys meaning or aids navigation. Icons are paired with text labels (except in icon-only buttons, which require a tooltip/aria-label).
- **Field mode icons:** Minimum `--icon-lg` (24px). Most action icons use `--icon-xl` (32px) for easier tapping.

---

## Motion

### Transition Defaults

| Token | Duration | Easing | Use |
|-------|----------|--------|-----|
| `--duration-fast` | 100ms | ease-out | Hover states, focus rings |
| `--duration-normal` | 200ms | ease-in-out | Panel open/close, tab switches |
| `--duration-slow` | 300ms | ease-in-out | Modal open/close, drawer slide |
| `--duration-slower` | 500ms | ease-in-out | Page transitions, large element animations |

### Motion Rules

- **Respect `prefers-reduced-motion`.** When the user's OS is set to reduce motion, all transitions are instant (duration: 0ms). This is not optional — it's an accessibility requirement.
- **No bouncing, no spring physics.** Motion is functional, not playful. Elements move to communicate state changes (panel opening, item added/removed, loading), not to entertain.
- **Field mode: minimal motion.** In field mode, transitions are reduced to `--duration-fast` or eliminated. Volunteers are moving quickly — the UI should keep up.
- **Loading indicators:** Subtle pulse or rotation, not complex animations. The sync icon rotates; skeleton loaders pulse. That's the extent of animated loading states.
- **No entrance animations on page load.** Content appears immediately. Staggered entrance animations waste time and slow perceived performance — the opposite of what low-end devices need.

---

## Z-Index Scale

A constrained z-index scale to prevent z-index wars:

| Token | Value | Use |
|-------|-------|-----|
| `--z-base` | 0 | Default content |
| `--z-raised` | 10 | Sticky headers, floating action buttons |
| `--z-dropdown` | 20 | Dropdowns, popovers, tooltips |
| `--z-sidebar` | 30 | Sidebar (when overlaying content on mobile) |
| `--z-modal` | 40 | Modals, drawers |
| `--z-toast` | 50 | Toast notifications |
| `--z-overlay` | 60 | Modal backdrops |
| `--z-panic` | 100 | Panic button lock screen (always on top) |

---

## Density

The design system supports two density modes to accommodate different contexts:

| Mode | Use | Differences |
|------|-----|-------------|
| **Default** | Mobile, field mode, volunteer-facing | Larger touch targets (44px+), more spacing, larger text |
| **Compact** | Desktop admin, data-heavy screens | Smaller row heights (36px), tighter spacing, data tables fit more on screen |

Density is not user-configurable — it's determined by the device and context:
- **Mobile:** always default density
- **Field mode:** always default density
- **Desktop:** compact density for list views and data tables, default density for forms and content areas

---

## Open Questions

1. **Icon customization.** Should tenants be able to customize the icon set (e.g., replacing the default "person" icon with a culturally appropriate alternative)? Low priority but relevant for global south contexts.

2. **Print styles.** Should the design system include print-specific tokens? Some screens may be printed (compliance reports, year-end statements, event check-in sheets). Print tokens would strip color, adjust spacing for paper, and use serif fonts for readability.

<!-- REVISIT: The color palette default values are intentionally generic (blue primary, slate neutrals). When GreenGrass establishes a brand identity, the default palette should be updated to reflect the brand. The token system ensures this change propagates without touching component code. -->
<!-- REVISIT: The data visualization color palette (chart-1 through chart-8) needs finalization with a colorblind-safe sequential and categorical palette. Consider using established palettes like ColorBrewer or Tableau's. -->
