# External Integrations

## Purpose

This document specifies GreenGrass's external integration strategy — the specific services, data sources, and third-party systems the platform connects to. It builds on the integration hub architecture defined in system.md (adapter pattern, common interfaces, per-tenant configuration) and resolves the remaining gaps around electoral data sources, GIS/mapping, SMS gateways, telephony, and monitoring.

Every external integration follows the same pattern: a common interface with per-provider adapters, tenant-configurable credentials, rate limiting, error handling, and audit trail logging. This document specifies *what* we integrate with and *how*, not the adapter architecture itself (that's in system.md).

## Integration Principles

1. **No vendor lock-in.** Every integration is an adapter behind a common interface. Swapping providers requires writing a new adapter, not re-architecting.
2. **Per-country flexibility.** Different countries need different providers. The platform supports multiple active adapters per integration category, selected per tenant or per country.
3. **Tenant owns their credentials.** Tenants bring their own API keys and accounts for external services. GreenGrass facilitates the connection but doesn't intermediate (consistent with direct merchant decision in fundraising.md).
4. **Offline-first where applicable.** Integrations that support field operations (mapping, data sync) must degrade gracefully without connectivity.
5. **Audit everything.** All data flowing through integrations is logged in the audit trail.

## Electoral Data & Voter Files

### Electoral Boundary Data

Electoral boundaries (districts, precincts, constituencies, voting stations) are foundational for canvassing, GOTV, and voter targeting. Each country has a completely different administrative geography.

#### Per-Country Data Sources

| Country | Source | Data format | Update frequency | Access method |
|---------|--------|------------|-----------------|--------------|
| Puerto Rico | US Census Bureau (TIGER/Line), PR State Elections Commission (CEE) | Shapefiles, GeoJSON | After redistricting (every 10 years for Census, per-cycle for CEE) | Public download |
| Brazil | IBGE (Instituto Brasileiro de Geografia e Estatística), TSE | Shapefiles, CSV | Per election cycle | Public download |
| Thailand | Election Commission of Thailand (ECT) | Varies — may require manual digitization | Per election cycle | Government publication, potentially limited digital access |
| India | Election Commission of India (ECI), Survey of India | Shapefiles, KML | Per delimitation exercise | Partially public, some data requires official request |
| Lebanon | Ministry of Interior, Central Administration of Statistics | Limited digital availability | Infrequent — last major boundary revision with 2017 Electoral Law | May require manual digitization from official maps |

**DECIDED: Hybrid — GreenGrass-maintained for target countries + tenant import for others.** GreenGrass acquires, cleans, and maintains curated electoral boundary datasets for all five target countries, updated each election cycle. Tenants in other countries import their own data using the platform's import tools (GeoJSON, Shapefile, KML). Community contribution model lets tenants share imported datasets back to GreenGrass for inclusion in the curated library. Long-term goal: GreenGrass becomes a trusted single source of truth for electoral boundary data, especially in the global south where this data is fragmented and hard to access.

#### Boundary Data Format

- **Internal storage:** GeoJSON (standard, well-supported, human-readable)
- **Import support:** GeoJSON, Shapefiles (.shp), KML/KMZ, TopoJSON
- **Export support:** GeoJSON, Shapefiles
- **Coordinate system:** WGS 84 (EPSG:4326) — standard GPS coordinates, universal

#### Boundary Hierarchy

Each country has a different administrative hierarchy. The platform's configurable geographic hierarchy (system.md) must map to:

| Country | Hierarchy (top → bottom) |
|---------|------------------------|
| Puerto Rico | Island → Senatorial District → Representative District → Municipality → Ward (Barrio) → Precinct |
| Brazil | State (Estado) → Municipality (Município) → Electoral Zone (Zona Eleitoral) → Electoral Section (Seção Eleitoral) |
| Thailand | Province (Changwat) → District (Amphoe) → Sub-district (Tambon) → Constituency |
| India | State → Parliamentary Constituency → Assembly Constituency → Polling Station (Booth) |
| Lebanon | Governorate (Muhafazah) → District (Qada) → Constituency (per 2017 law) |

### Voter File Integration

Voter files (official voter registration records) are a core data source for campaigns. Access, format, and legality vary dramatically by country.

#### Per-Country Voter File Access

| Country | Voter file availability | Format | Access method | Legal constraints |
|---------|----------------------|--------|---------------|-------------------|
| Puerto Rico | Available from CEE | CSV/database export | Official request or public records | US voter file regulations apply |
| Brazil | TSE provides voter data (limited) | CSV | TSE open data portal (limited fields) | LGPD restricts use of personal data |
| Thailand | ECT maintains rolls | Varies | Limited public access | PDPA restrictions on political data |
| India | ECI provides electoral rolls | PDF (!) and limited digital formats | State-level access, downloadable from ECI website | Some states restrict bulk access |
| Lebanon | Ministry of Interior maintains rolls | Limited digital availability | Political parties receive updated rolls before elections | Confessional registration data is politically sensitive |

**DECIDED: Both — API sync + structured import with smart mapping.** API sync when available (future-proofing for modernizing electoral commissions). File upload with smart mapping as the universal fallback — configurable column mapper, encoding detection, field suggestions, dedup preview. The smart mapping import interface is a UX priority — voter files are messy and most campaign staff aren't data engineers. Making this flow intuitive is critical.

#### Voter File Data Handling

- All imported voter data is subject to the same encryption and access controls as other CRM data
- Political data classification applies (all data treated as sensitive per compliance.md)
- Import creates audit trail entries (who imported, when, how many records, source file hash)
- Dedup runs automatically against existing records using composite matching (phone primary, per users.md)
- Imported records tagged with source and import date for provenance tracking

### Electoral Commission Integration

Direct API integration with electoral commissions is rare but valuable where available.

| Country | API availability | Potential integrations |
|---------|-----------------|----------------------|
| Puerto Rico | FEC API (federal), CEE (limited) | FEC filing verification, campaign registration status |
| Brazil | TSE APIs (DivulgaCandContas, Candidaturas) | Real-time campaign finance disclosure, candidate registration data |
| India | ECI limited APIs | Electoral roll lookup (limited), election schedule |
| Thailand | ECT — no known public API | Manual data exchange |
| Lebanon | SCE — no known public API | Manual data exchange |

**DECIDED: API-ready but manual-first.** Design the integration points (adapter slots) for all electoral commission APIs, but implement manual workflows (file upload/download) for all countries initially. Build API integrations only when a specific pilot demands it (e.g., TSE's real-time disclosure for Brazil may force the issue). No speculative API integrations for commissions whose APIs we haven't validated.

## GIS & Mapping

### Mapping Provider

The platform needs mapping capabilities for: canvassing turf visualization, walk list routing, voter geographic distribution, event location display, and geographic analytics.

**DECIDED: Hybrid, OSM default.** Self-hosted OSM tiles (via OpenMapTiles or Protomaps) as the default for all map display — free, sovereign, no third party sees canvassing patterns. Commercial services available as fallback where OSM tile quality or coverage is insufficient for a specific region. Tile infrastructure self-hosted in each country's K8s cluster.

### Offline Maps

Field operations (canvassing, voter registration drives) must work without connectivity. The mapping layer must support:

- **Pre-downloaded map tiles** for assigned turf areas — downloaded at shift start, used offline
- **Offline geocoding** — basic address-to-coordinate resolution without network (limited accuracy acceptable)
- **Offline routing** — basic turn-by-turn or walking directions within downloaded area
- **Sync on reconnect** — any location data captured offline syncs when connectivity returns

### Geocoding

Converting addresses to coordinates (and vice versa) is needed for voter file processing, canvassing assignment, and geographic analytics.

**DECIDED: Hybrid, self-hosted default.** Self-hosted Pelias or Nominatim for bulk operations (voter file processing, batch geocoding) — data stays sovereign for heavy workloads. Commercial geocoding (provider TBD at implementation) for real-time UX (address autocomplete on forms, single-address lookup) where self-hosted accuracy falls short. Same sovereignty-first pattern as mapping.

### Turf Management

Turf (geographic areas assigned to canvassing teams) is a core platform concept. The mapping integration must support:

- **Drawing turfs** on a map — staff draw boundaries by clicking/tapping on a map
- **Auto-generated turfs** — platform suggests turf boundaries based on voter density, walking distance, and geographic features
- **Turf assignment** — assign turfs to volunteers/teams, track coverage
- **Walk list optimization** — generate efficient walking routes within a turf
- **Coverage visualization** — heat maps showing canvassed vs. uncanvassed areas

**DECIDED: Built-in routing.** Self-hosted open-source routing engine (OSRM, Valhalla, or GraphHopper — specific choice at implementation time). Routes pre-calculated at shift start and cached on device for fully offline use. Consistent with the sovereignty-first, offline-first pattern across all GIS integrations.

## SMS & Messaging Gateways

### SMS Provider Strategy

Already decided in system.md: provider-agnostic adapter layer with per-country providers. This section specifies the per-country strategy.

**DECIDED: Hybrid — global provider as fallback + local providers where advantageous.** Same pattern as payments, mapping, and geocoding. Global provider (Twilio, Vonage, or MessageBird) as baseline/fallback. Local providers in countries where they offer significant advantages in deliverability or pricing. Adapter pattern makes this transparent to the application.

#### Per-Country SMS Landscape

| Country | Local providers | Global provider coverage | Notes |
|---------|----------------|------------------------|-------|
| Puerto Rico | US providers work | Twilio, Vonage — full US coverage | Standard US SMS infrastructure. TCPA compliance critical. |
| Brazil | Zenvia, Infobip (regional), Twilio | Good global coverage | High SMS volume culture. Short codes common. Regulatory approval needed for A2P messaging. |
| Thailand | AIS, DTAC, TrueMove (carrier-direct or via aggregators) | Twilio available but pricier | Thai number required for domestic messaging. Local aggregators have better rates. |
| India | Kaleyra, MSG91, Gupshup, Twilio | Twilio available | DLT registration required for A2P SMS. Sender ID registration mandatory. Template-based messaging. Very high volume, very low cost. |
| Lebanon | Alfa, Touch (two carriers, both state-influenced) | Limited global provider coverage | Unreliable infrastructure. SMS delivery can be inconsistent. WhatsApp often more reliable than SMS. |

### WhatsApp Business API

Already decided: TSE-aware channel management for Brazil. WhatsApp integration via Business API requires:

- **Business verification** through Meta
- **Template messages** — pre-approved message templates for outbound messaging (required by WhatsApp policy)
- **Session messaging** — free-form replies within 24-hour window after user-initiated contact
- **Per-tenant WhatsApp Business Account** — each tenant needs their own verified business account (consistent with direct-merchant pattern)

**DECIDED: Direct Meta API with onboarding concierge.** Each tenant registers directly with Meta — no intermediary markup, tenant owns the relationship. Meta's verification process is complex, so GreenGrass provides an onboarding concierge service (human or AI-assisted) to guide tenants through verification, business account setup, and template approval. One-time onboarding friction is better than permanent per-message BSP markup.

### Number Provisioning

SMS requires sender numbers (long codes, short codes, or toll-free numbers depending on country and use case).

**DECIDED: Tenant-provisioned with GreenGrass guidance.** Tenants own their numbers. GreenGrass provides country-specific setup guides, recommended number types (long code vs. short code vs. toll-free), and compliance checklists (India DLT registration, US 10DLC registration, Brazil A2P approval, etc.). Consistent with the direct-merchant pattern across all integrations.

## Telephony (Phone Banking)

### Provider Strategy

Already decided in workflows.md: BYOP for MVP, hybrid integration for pilot. The hybrid integration needs a telephony provider.

**DECIDED: Hybrid — global baseline + local providers where cost-effective.** Same pattern as SMS, payments, mapping. Global provider (Twilio Voice or equivalent) as baseline, local VoIP providers where they offer significant cost advantages for high-volume calling.

### Phone Banking Features (Pilot Phase)

When the platform transitions from BYOP to integrated telephony:

- **Click-to-call** — volunteer clicks a contact in the platform, call initiates through the provider
- **Call logging** — call duration, outcome (answered, voicemail, no answer, wrong number), and notes recorded automatically
- **Number masking** — volunteer's personal number is not visible to the person being called (critical privacy feature missing from BYOP)
- **Preview dialer** — volunteer sees contact info before the call initiates (not a predictive/auto-dialer — those have TCPA implications in the US)
- **Call scripts** — script displayed alongside the call interface, with branching based on responses
- **Do-not-call list** — platform enforces DNC lists (federal, state, per-campaign opt-outs)

## Video & Event Platform Integration

Already decided in workflows.md: external integration with registration bridge.

### Supported Platforms

**DECIDED: Zoom + Jitsi.** Zoom for mainstream use (dominant market share), Jitsi for tenants who want open-source and self-hosted video (aligns with platform sovereignty values). Two adapters cover the vast majority of use cases. Additional platforms can be added via the adapter pattern if demand warrants it.

### Integration Capabilities

Regardless of platform:
- **Event creation** — staff creates event in GreenGrass, meeting is automatically created on the video platform
- **Unique join links** — each registrant receives a unique link for attendance tracking
- **Attendance sync** — who actually joined, duration of participation, synced back to CRM
- **Recording link** — if the event is recorded, link is stored in the event record and can be shared with registrants who missed it
- **Calendar integration** — event details pushed to registrants' calendars (iCal/ICS format, universal)

## Calendar Integration

Events created in GreenGrass should integrate with external calendar systems.

- **ICS/iCal export** — every event generates an .ics file. Attached to event confirmation emails. Works with any calendar app.
- **Google Calendar, Apple Calendar, Outlook** — deep links to "Add to Calendar" for these platforms in event confirmations
- **No inbound calendar sync** — GreenGrass is the source of truth for campaign events. External calendar integrations are outbound only (push events out, don't pull events in).

## Data Import/Export

### Import Formats

The platform must handle messy real-world data files from diverse sources.

**Supported import formats:**
- CSV (with configurable delimiter, encoding detection including UTF-8, Latin-1, Windows-1252)
- Excel (.xlsx, .xls)
- JSON
- vCard (.vcf) — for contact imports
- GeoJSON, Shapefile, KML — for geographic data

### Import Pipeline

1. **Upload** — user uploads file or provides URL
2. **Format detection** — platform auto-detects file format and encoding
3. **Column mapping** — interactive column mapper with smart suggestions (e.g., "this column looks like phone numbers")
4. **Preview** — sample of mapped records shown for validation
5. **Dedup preview** — platform identifies potential duplicates against existing records, shows proposed merges
6. **Confirmation** — user confirms mapping and dedup decisions
7. **Import** — records created/merged, import logged in audit trail
8. **Post-import report** — summary: records created, merged, skipped (with reasons), errors

### Export Formats

**Supported export formats:**
- CSV (UTF-8)
- Excel (.xlsx)
- JSON
- GeoJSON (for geographic data)
- PDF (for reports)

**Export capabilities:**
- Full tenant data export (contractual right per workflows.md)
- Per-entity exports (contacts, donations, events, interactions)
- Filtered exports (by tag, segment, date range, geography)
- Scheduled exports (recurring export to webhook URL or file storage)
- Compliance report exports (per jurisdiction format)

### Migration from Other Platforms

Campaigns switching to GreenGrass from other tools (NationBuilder, NGP VAN, Action Network, CiviCRM, etc.) need migration support.

**DECIDED: Migration guides + generic import.** Detailed documentation for migrating from common campaign platforms (NationBuilder, NGP VAN, Action Network, CiviCRM) — what to export, how to map fields, what to watch out for. Plus the generic smart-mapping import tools. If a particular source platform becomes a dominant migration path, a dedicated importer can be built later.

## Monitoring & Observability

### Platform Monitoring

GreenGrass itself needs monitoring for operational health.

#### Infrastructure Monitoring

- **Metrics:** CPU, memory, disk, network across all Kubernetes clusters
- **Container orchestration:** Kubernetes metrics (pod health, deployment status, resource utilization)
- **Database:** PostgreSQL metrics (connections, query latency, replication lag, storage)
- **Message queue:** NATS JetStream metrics (consumer lag, message throughput, storage)

**DECIDED: Prometheus + Grafana.** Industry-standard open-source monitoring. Self-hosted, no vendor dependency, works identically for cloud-hosted and self-hosted deployments. Prometheus for metrics collection and alerting, Grafana for dashboards. Consistent with platform sovereignty values.

#### Application Monitoring

- **Request tracing:** distributed tracing across services (OpenTelemetry)
- **Error tracking:** structured error logging with context (Sentry or self-hosted equivalent)
- **Application metrics:** request latency, error rates, endpoint usage, active users
- **Business metrics:** active tenants, donation volume, message delivery rates, sync latency

#### Alerting

- **Infrastructure alerts:** resource exhaustion, pod failures, database issues, replication lag
- **Application alerts:** elevated error rates, latency spikes, failed payment processing, sync failures
- **Security alerts:** authentication anomalies, unusual data access patterns, failed encryption operations
- **Compliance alerts:** approaching retention limits, consent processing failures, missed reporting deadlines

**DECIDED: Start simple, upgrade when needed.** Email + Slack/Matrix webhook alerts for alpha and early pilots. Adopt PagerDuty/Opsgenie when the ops team grows and formal on-call rotation becomes necessary. No premature vendor commitments.

### Uptime Monitoring

- **External health checks** — independent uptime monitoring from outside the infrastructure (e.g., UptimeRobot, Pingdom, or self-hosted alternative)
- **Public status page** — tenant-facing status page showing platform health (per-country, per-service)

**DECIDED: Self-hosted status page.** Open-source (Upptime, Cachet, or Gatus — specific choice at implementation time). Fully controlled, no vendor dependency. Consistent with platform sovereignty values.

### Logging

- **Structured logging** — JSON-formatted logs with correlation IDs across services
- **Centralized log aggregation** — all logs collected in a single searchable system

**DECIDED: Loki + Grafana.** Grafana Loki for log aggregation, Grafana for querying. Lightweight, and it plugs into the Prometheus/Grafana stack already in place — metrics, logs, and dashboards in one place, queried the same way. Labels-based indexing keeps resource usage low.

## Third-Party Integration via Public API

Already decided in system.md: REST + webhooks from day one. The public API enables tenants and third parties to build their own integrations.

### Webhook Events

The platform emits webhook events for key actions. Tenants configure webhook endpoints per event type.

**Webhook event categories:**
- **CRM:** contact created/updated/merged, tag applied/removed, segment membership changed
- **Donations:** donation received, recurring donation created/cancelled/failed, refund processed, pledge created/fulfilled/lapsed
- **Communications:** message sent/delivered/bounced/opened/clicked, consent granted/revoked
- **Events:** event created, RSVP received, attendance recorded
- **Canvassing:** interaction recorded, turf assigned, shift started/ended
- **Compliance:** contribution limit approaching, foreign donation flagged, data subject request received
- **System:** data import completed, export ready, sync completed

### API Rate Limiting

- Per-tenant, per-API-key rate limits
- Configurable by subscription tier
- Rate limit headers in responses (X-RateLimit-Remaining, X-RateLimit-Reset)
- Webhook retry with exponential backoff on delivery failure

### Developer Documentation

- **API reference** — auto-generated from OpenAPI spec, interactive (Swagger UI or similar)
- **Webhook documentation** — event schemas, delivery guarantees, retry behavior
- **SDKs** — JavaScript/TypeScript SDK (first-class), Python SDK (community or first-class based on demand)
- **Sandbox environment** — per-tenant test environment with seed data for integration development

## Integration Roadmap

### Alpha (Puerto Rico)

**Required integrations:**
- Payment: credit card processor (Stripe or equivalent), ATH Movil adapter
- SMS: US provider (Twilio or equivalent) with TCPA compliance
- Email: managed service for alpha (Postmark or SES), self-hosted MTA in progress
- Mapping: chosen provider with offline tile support
- Geocoding: for voter file processing and address validation
- Data import: CSV/Excel with column mapping for voter files
- FEC API: for compliance report filing (if building FEC reporting for alpha)
- Public API: REST + webhooks operational

### Pilot 1 (Brazil)

**Additional integrations:**
- Payment: PIX adapter (local processor), Boleto adapter
- SMS: Brazilian provider or Twilio with Brazil number
- WhatsApp: Business API integration (critical for Brazil)
- TSE APIs: DivulgaCandContas for campaign finance disclosure
- Mapping: Brazil-specific tile coverage verification
- Geocoding: Brazilian address format support

### Pilot 2 (Thailand)

**Additional integrations:**
- Payment: PromptPay adapter, TrueMoney adapter
- SMS: Thai provider for domestic messaging
- WhatsApp: Business API (WhatsApp popular in Thailand too)
- Mapping: Thai address format and script support
- Line messaging: consider Line integration (popular in Thailand)

### Pilot 3 (India)

**Additional integrations:**
- Payment: UPI adapter (Razorpay or Cashfree), Paytm/PhonePe adapters
- SMS: Indian provider with DLT registration, template-based messaging
- WhatsApp: Business API (WhatsApp dominant in India)
- ECI data: electoral roll import tools, constituency boundary data
- Mapping: India-specific geocoding (Plus Codes may be useful for areas without formal addresses)

### Pilot 4 (Lebanon)

**Additional integrations:**
- Payment: OMT manual recording interface, bank transfer tracking
- SMS: Lebanese carrier integration (limited reliability)
- WhatsApp: Business API (primary messaging channel given SMS unreliability)
- Mapping: offline-heavy — infrastructure instability means offline maps are essential, not optional
- Cash tracking: full chain-of-custody integration (per fundraising.md)

## Open Questions

1. **Line messaging integration for Thailand** — Line is more popular than WhatsApp in Thailand. Should we add a Line adapter? Likely yes, but needs research into Line's Business API capabilities and political messaging restrictions.

2. **India Plus Codes** — Google's Plus Codes address areas without formal street addresses. Useful for rural India canvassing. Worth integrating as a supplementary geocoding/addressing system?

3. **Electoral commission relationship management** — for countries where we want API access or official data, who manages the relationship? GreenGrass corporate? Local counsel? The tenant?

4. **Self-hosted monitoring for self-hosted tenants** — tenants who self-host GreenGrass need monitoring too. Do we include the monitoring stack in the self-hosted package, or expect them to bring their own?

<!-- REVISIT: Each integration adapter needs its own technical specification during implementation — API contracts, authentication flows, error handling, rate limit strategies, webhook formats. These are implementation details that belong in engineering docs, not this spec. -->
