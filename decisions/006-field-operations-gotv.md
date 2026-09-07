# ADR-006: Field Operations & GOTV

**Status:** Accepted
**Date:** 2026-03-03
**Sources:** `spec/gotv.md`, `spec/workflows.md`, `design/ux/04-wireframes/field-mode/field-mode.md`, `design/ux/03-design-system/foundations.md`

## Context

Field operations — canvassing, voter registration drives, phone banking, and GOTV — are the most operationally intense workflows in the platform. Election day in particular compresses all campaign activity into a few hours with fixed deadlines (polls close). These workflows demand a purpose-built interface optimized for one-handed mobile use while walking, in variable lighting, with unreliable connectivity. The standard platform UI, designed for desktop and general mobile use, is too complex and too small-targeted for field conditions.

GOTV operations also require the platform to make real-time resource allocation decisions — shifting canvassers from high-turnout to low-turnout areas, routing ride requests to nearby drivers, and managing communication waves to unvoted supporters.

## Decision

### Automated GOTV universe builder

The platform generates the GOTV universe automatically based on configurable criteria: support score thresholds, voting history filters, geographic filters. Campaign staff review, adjust segments, add/remove voters, and finalize. This reduces manual work for building the target list and ensures consistency, while preserving human control over the final universe.

Turnout data (early voting, canvasser reports, phone banker confirmations, voter self-reports) feeds back into the universe with confidence-weighted confirmations: official election data removes voters from contact lists entirely, while canvasser/phone banker reports deprioritize but don't fully remove (acknowledging the lower certainty of field reports).

**Alternatives considered:** Fully manual universe building was rejected because it's error-prone at scale and wastes staff time on mechanical work. Fully automated with no review was rejected because campaign staff understand political nuances the algorithm cannot capture.

### API-ready but manual-first electoral data integration

Electoral commission integration points are designed as adapter slots, but all countries start with manual workflows (file upload/download). API integrations are built only when a specific pilot demands it. Electoral commission APIs are rare, unreliable, and vary wildly by country — speculative API work would be wasted.

Early/absentee voting data follows the same pattern: real-time feeds where jurisdictions provide them, manual upload as universal fallback.

### Configurable GOTV communication waves

The election day communication sequence (morning reminder, midday follow-up, afternoon push, final push) is independently configurable per wave: each can be fully automated or manual-trigger. Morning reminders might auto-send, while the final push might wait for staff to review real-time turnout data before triggering.

**Alternatives considered:** Fully automated waves were rejected because the final push decision depends on real-time context that only war room staff can assess. Fully manual was rejected because morning reminders are routine and shouldn't require human intervention.

### Field mode renders at phone size on larger devices

Field mode is a full-screen takeover that completely replaces normal navigation — no sidebar, tabs, or extraneous notifications. The volunteer's world is the walk list until the shift ends. On tablets or desktops, field mode still renders at phone dimensions to maintain the one-handed, walking-optimized interface. Tablets and desktops accessing field operations are redirected to the management view.

The shift lifecycle is a first-class event boundary: start shift downloads data → field mode active → end shift triggers sync + debrief + hour logging + turf release → return to normal shell. Crash recovery shows last position and allows resume.

### 44px touch targets standard, 48px in field mode

Default touch targets are 44px minimum (WCAG 2.1 AAA). Field mode increases to 56px minimum to account for walking, one-handed use, poor lighting, and gloves. Issue checkboxes in poll watcher forms use 44px tap areas. "Not Home" auto-advances after 3 seconds to minimize dwell time between doors.

<!-- REVISIT: touch-target sizes disagree across three documents. This heading says 48px
in field mode; the paragraph below says 56px; ADR-011 says 56px field / 44px standard; and
ux-decisions.md sets --touch-target-min: 48px / --touch-target-field: 56px. The 48px here
is the orphan value. Pick one and propagate. -->

Dynamic resource reallocation on election day uses automatic suggestions with human approval: the platform analyzes real-time turnout data and surfaces reallocation recommendations ("Precinct 7 at 35% turnout — consider shifting canvassers from Precinct 12 at 78%"). War room staff approve, reject, or modify each suggestion.

## Consequences

**Benefits:**
- Automated universe builder scales to campaigns with hundreds of thousands of target voters
- Manual-first electoral data integration avoids wasted work on unreliable APIs while keeping the architecture ready for future automation
- Configurable communication waves balance automation efficiency with human judgment for high-stakes decisions
- Field mode's full-screen takeover eliminates distractions and ensures usability in challenging physical conditions
- Larger touch targets in field mode reduce errors during walking/one-handed use

**Costs:**
- Field mode is essentially a separate application shell requiring its own design, testing, and maintenance
- GOTV universe builder requires tuning per-country (different voter history data, support scoring models)
- Election day sync priority and reallocation engine add significant real-time infrastructure requirements
- Field mode on tablets/desktops showing phone-sized UI is suboptimal for users who want to use larger screens in the field

**Constraints:**
- Field mode must work fully offline (see [ADR-005](005-offline-first-sync.md))
- Walk list data must be pre-downloadable within reasonable bandwidth and storage limits
- Election day sync interval drops to near-real-time (every 30 seconds) — infrastructure must handle this at peak volunteer load
- Reallocation suggestions must update within 30 seconds of underlying turnout data changes

**Related ADRs:** [ADR-005](005-offline-first-sync.md) (offline-first field operations), [ADR-011](011-design-system-ux.md) (touch targets, spacing, performance budgets), [ADR-013](013-analytics-ai.md) (real-time analytics for election day dashboards)
