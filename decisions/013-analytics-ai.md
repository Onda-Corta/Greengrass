# ADR-013: Analytics & AI

**Status:** Accepted
**Date:** 2026-03-03
**Sources:** `spec/workflows.md`, `design/architecture/system.md`

## Context

Campaign decision-making depends on timely data. A Field Director on canvassing day needs real-time contact rates and turf coverage. An election day war room needs live turnout dashboards that update within seconds. But a Campaign Manager reviewing last quarter's fundraising performance can wait for a batch rollup. Building real-time analytics for everything is expensive and unnecessary; building only batch analytics fails the highest-stakes moments.

The platform also uses AI for specific operational tasks — generating personalized activism messages and assisting with translation — where the AI drafts and a person reviews before anything goes out.

## Decision

### Real-time analytics for active operations, batch for historical

Two analytics tiers serve different freshness needs:

**Real-time:** Field day dashboards (doors knocked, contact rate, team progress), phone bank dashboards (calls made, outcomes), election day turnout tracker, live fundraising thermometer during appeals, GOTV war room metrics. Data updates as it flows in from the field. The election day dashboard must update within 30 seconds of underlying data changes.

**Batch:** Historical trend reporting (fundraising over time, volunteer growth, engagement trends), cross-campaign comparisons, compliance reports, donor segmentation analysis. Aggregated on a defined schedule (hourly or daily depending on the metric).

The event sourcing architecture (see [ADR-005](005-offline-first-sync.md)) provides the foundation for both — real-time analytics consume the event stream as events arrive, while batch analytics aggregate over historical event data.

**Alternatives considered:** Real-time for everything was rejected because it's expensive and provides no meaningful benefit for historical analysis. Batch-only was rejected because election day and field day operations demand live data — stale data on election day is worse than no data.

### AI-generated custom messaging for activism

For activism campaigns (letter-writing, public comment submissions), AI generates unique, personalized messages based on the campaign's talking points and the supporter's input. No two messages are identical, preventing targets from dismissing them as identical astroturfing. The supporter reviews the generated message in the UI, can edit it, and must approve it before it's sent.

The AI draws on the campaign's talking points for consistency while varying tone, structure, and personal framing. Content guardrails prevent the AI from going off-message. The supporter's approval creates a consent record in the audit trail.

**Alternatives considered:** Template-only messages were rejected because identical messages are easily dismissed by recipients as astroturfing. Fully supporter-written messages were rejected because completion rates are much lower — the friction of writing from scratch reduces participation.

## Consequences

**Benefits:**
- Real-time analytics for active operations enables data-driven field decisions when timing matters most
- Batch processing for historical analysis avoids the cost of maintaining real-time infrastructure for data that doesn't need it
- AI-generated activism messages significantly increase completion rates while maintaining authenticity
- Event sourcing provides a unified data foundation for both real-time and batch analytics

**Costs:**
- Real-time analytics pipeline (event streaming, aggregation, push to dashboards) is significant infrastructure
- Election day peak load (every volunteer active, dashboard continuously refreshed, communications sending) requires capacity planning
- AI message generation has per-generation cost and requires content guardrails to stay on-message
- Dual analytics tiers add operational complexity compared to a single approach

**Constraints:**
- Election day dashboards must handle 10x normal concurrent load
- Communication sends during GOTV must complete within configured time windows, not delayed by analytics queue backlog
- AI-generated messages must be reviewed and approved by the supporter — nothing sends without explicit consent
- Real-time analytics infrastructure must be tuned for election day sync intervals (30-second updates)

**Related ADRs:** [ADR-005](005-offline-first-sync.md) (event sourcing as analytics foundation), [ADR-006](006-field-operations-gotv.md) (election day dashboards, reallocation suggestions), [ADR-010](010-internationalization-localization.md) (AI-assisted translation)
