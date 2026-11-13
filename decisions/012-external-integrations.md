# ADR-012: External Integrations

**Status:** Accepted
**Date:** 2026-03-03
**Sources:** `spec/workflows.md`, `spec/integrations.md`
**Amended by:** [ADR-027](027-third-party-crm-sync-and-connectors.md) (Proposed) — one requirement in it is decided: the core CRM syncs both ways with third-party tools, NationBuilder first and by CSV first. That replaces the one-way "migration guides + generic import" decided at [integrations.md § Migration from Other Platforms](../spec/integrations.md#migration-from-other-platforms); this ADR never decided migration itself. Continuous API sync and Parsons as the connector layer are proposed, not accepted. The decisions below are unchanged.

## Context

GreenGrass must integrate with a wide variety of external services — telephony providers, video platforms, mapping services, SMS gateways, monitoring tools — across five countries with different providers, APIs, and infrastructure quality. No single global provider covers all needs in all markets. The integration strategy must prevent vendor lock-in, support per-country provider selection, and degrade gracefully in low-infrastructure environments.

## Decision

### BYOP telephony for MVP, hybrid Twilio/local for pilot

MVP phone banking uses volunteers' personal phones — the platform shows the contact, script, and records the result with no telephony infrastructure needed. Pilot phase integrates with telephony providers (Twilio Voice as global baseline, local VoIP providers where cost-effective) for click-to-call, call logging, number masking, preview dialer, and do-not-call enforcement.

**Alternatives considered:** Building telephony from launch was rejected because it's unnecessary for MVP (BYOP works) and would delay delivery. Global-only provider was rejected because local providers offer significantly better rates for high-volume calling in target markets.

### External integration for virtual events

GreenGrass manages the full event lifecycle (creation, promotion, RSVPs, reminders, follow-up, analytics) but integrates with external video providers for the actual video hosting. Two adapters cover the majority of use cases: Zoom (dominant market share) and Jitsi (open-source, self-hosted, aligns with sovereignty values). Unique per-registrant join links enable attendance tracking through the integration.

**Alternatives considered:** Building video hosting was rejected as a separate product problem. Single provider (Zoom only) was rejected because campaigns with sovereignty requirements need an open-source self-hosted option.

### Hybrid OSM default + commercial fallback for mapping

Self-hosted OpenStreetMap tiles (via OpenMapTiles or Protomaps) are the default for all map display. This is free, sovereign, and no third party sees canvassing patterns (where volunteers are knocking doors). Commercial mapping services are available as fallback where OSM coverage or quality is insufficient for a specific region. Tile infrastructure is self-hosted in each country's Kubernetes cluster.

Self-hosted geocoding (Pelias or Nominatim) handles bulk operations (voter file processing, batch geocoding) where data sovereignty matters. Commercial geocoding is the fallback for real-time UX (address autocomplete) where self-hosted accuracy falls short. Walk list routing uses a self-hosted open-source routing engine (OSRM, Valhalla, or GraphHopper), pre-calculated at shift start and cached for offline use.

**Alternatives considered:** Commercial mapping only (Google Maps, Mapbox) was rejected because it exposes canvassing patterns to third parties — where volunteers are knocking doors reveals campaign strategy. OSM-only without commercial fallback was rejected because OSM coverage gaps in some target regions would degrade the user experience.

### Monitoring: Prometheus + Grafana + Loki

Infrastructure monitoring uses Prometheus (metrics collection and alerting) and Grafana (dashboards). Log aggregation uses Grafana Loki. All self-hosted, no vendor dependency, works identically for cloud-hosted and self-hosted deployments. Alerting starts simple (email + Slack/Matrix webhooks) and upgrades to PagerDuty/Opsgenie when the ops team grows. Status page is self-hosted (Upptime, Cachet, or Gatus).

**Alternatives considered:** Commercial monitoring (Datadog, New Relic) was rejected because it adds vendor dependency and doesn't work for self-hosted deployments. The observability stack must be the same everywhere.

## Consequences

**Benefits:**
- BYOP telephony eliminates infrastructure cost and complexity for MVP while the product validates phone banking workflows
- Self-hosted mapping ensures no third party can observe campaign canvassing patterns
- Prometheus/Grafana/Loki provides a unified observability stack that works identically across cloud and self-hosted deployments
- Adapter pattern across all integrations means providers can be swapped without rearchitecting

**Costs:**
- Self-hosted mapping tiles, geocoding, and routing require GIS infrastructure expertise and ongoing maintenance
- Each telephony/SMS adapter is its own mini-integration project with provider-specific API contracts and webhook formats
- BYOP telephony means volunteers' personal numbers are visible to the people being called (hybrid integration fixes this with number masking)
- OSM tile quality varies by region — commercial fallback configuration adds per-country operational work

**Constraints:**
- Offline maps require pre-downloaded tiles, bounded at ~200MB for low-end phone storage
- All integration credentials are tenant-owned and stored in secrets management (HashiCorp Vault)
- Integration data flows are logged in the audit trail
- Social media integrations must have OAuth + copy-paste fallback given increasing API restrictions for political content

**Related ADRs:** [ADR-001](001-platform-architecture.md) (per-country infrastructure), [ADR-005](005-offline-first-sync.md) (offline maps, pre-cached routing), [ADR-006](006-field-operations-gotv.md) (phone banking, turf management), [ADR-011](011-design-system-ux.md) (performance budgets for external resources)
