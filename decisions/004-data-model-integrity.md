# ADR-004: Data Model & Integrity

**Status:** Accepted
**Date:** 2026-03-03
**Sources:** `spec/security.md`, `spec/compliance.md`, `spec/workflows.md`, `spec/users.md`, `design/architecture/system.md`
**Amended by:** [ADR-018](018-ai-agent-posture.md) § The review — the audit trail gains a channel and a trigger for harness-mediated actions; the actor is always a person, and no non-human actor type exists.

## Context

GreenGrass manages politically sensitive data — voter contact records with sentiment scores, donor identities, canvassing notes, candidate communications — in environments where data integrity has safety implications. Conflicting records from offline field operations must be resolved without silent data loss. Deduplication must handle messy real-world data (shared phone numbers, inconsistent names) without misattributing donations or canvassing history. And every data mutation must be traceable for election integrity, compliance reporting, and security auditing.

## Decision

### Full audit trail for all data mutations

Every data change is logged: who, what, when, from where. This includes CRM edits, financial transactions, permission changes, logins, data exports, record merges, bulk operations, and session events. The audit trail is immutable — entries cannot be modified or deleted by any user including Platform Admin. A separate Platform Admin audit trail logs all GreenGrass team actions.

Audit log retention is 10 years globally, matching Lebanon's commercial records requirement as the longest among target countries. One rule everywhere eliminates the risk of premature deletion from incorrect jurisdiction-specific retention logic.

For actions mediated by the agent harness ([spec/harness.md](../spec/harness.md), decided in the [ADR-018](018-ai-agent-posture.md) review), the entry also records the **channel** — chat, a named coach, a builder — and the **trigger**: a person's request, a confirmation tap, or a schedule a person set. The actor is always a person; no non-human actor type exists. Prompt and response bodies are retained under the Operational tier of [ADR-016](016-cross-cutting-resolutions.md) §4, and call metadata — provider, model, tokens, cost, operation, confirmation reference — under the audit-trail tier.

**Alternatives considered:** Per-jurisdiction retention periods were rejected because structured event data is cheap to store relative to the compliance risk of getting jurisdiction-specific retention wrong.

### Merge-and-flag conflict resolution

When conflicting records sync from multiple devices (common in offline field operations), both records are preserved and flagged for human review. The Data Manager sees both records side-by-side — who recorded what, when, from which device — and decides how to reconcile. No data is silently discarded. This is consistent with the suggest-and-confirm deduplication approach.

For non-contentious fields, the sync protocol applies automatic resolution rules: last-write-wins for simple fields, additive merge for interactions, server-wins for assignments, client-wins for in-progress field work. User-facing conflicts are rare and presented with the safe default of keeping both versions.

**Alternatives considered:** Last-write-wins globally was rejected because silently discarding canvassing data or donation records in a political context is unacceptable. Fully manual resolution was rejected because it would create an unmanageable backlog during high-volume field operations.

### Political data treated as sensitive everywhere

All data on the platform is treated as sensitive regardless of local law — LGPD/GDPR-level protections applied globally. GreenGrass is a political organizing platform; all data on it is political by nature. One protection tier, no ambiguity, no per-jurisdiction classification logic to maintain. Application-level encryption protects the highest-sensitivity fields on top of storage-level encryption.

### Suggest-and-confirm deduplication

The dedup engine uses composite matching with mobile phone number as primary identifier (highest weight in mobile-first contexts), email as secondary, national ID/voter ID as definitive where available, and name + address as supporting signal with fuzzy matching. Match weights are configurable per deployment to account for country-specific data quality.

The system flags potential duplicates and surfaces them in a review queue. A human with appropriate permissions reviews and decides whether to merge, dismiss, or defer. No automatic merging — the risk of misattributing donations or losing canvassing history is too high.

**Alternatives considered:** Automatic merging above a confidence threshold was rejected because false positive merges in a political CRM have outsized consequences (misattributed donations, merged records of different people sharing a phone). Manual-only detection was rejected because the volume of records in campaigns with large voter files makes it impractical.

### Full export with relationship data in open formats

Tenants can export everything they own: contacts, donor records, donation history, communication history, canvassing data, volunteer records and hours, event data, analytics, tags, segments, notes, and audit logs. Cross-references are preserved (which donors attended which events, which volunteers canvassed which turfs). Export uses open standard formats (CSV, JSON) with documented schema. Data portability is a contractual guarantee in the terms of service — not just a feature but an enforceable right.

**Alternatives considered:** Flat table export was rejected because it strips relational value from the data. Proprietary formats were never considered — lock-in is antithetical to the platform's sovereignty principles.

## Consequences

**Benefits:**
- Complete audit trail provides election integrity assurance and compliance evidence
- Merge-and-flag prevents silent data loss during the highest-stakes operations (field days, election day)
- Treating all data as sensitive eliminates the risk of misclassification across jurisdictions
- Suggest-and-confirm dedup prevents costly merge errors while keeping the review workload manageable
- Full export with relationship data ensures no vendor lock-in

**Costs:**
- Comprehensive audit logging generates significant storage volume, though structured events compress well
- 10-year retention means audit storage grows indefinitely (mitigated by tiered storage and archival)
- Human review of conflicts and dedup candidates requires Data Manager capacity during high-volume operations
- Full relational export is more complex to implement than flat table dumps

**Constraints:**
- Audit trail immutability must be enforced at the infrastructure level, not just the application level
- Dedup matching weights must be validated per country before deployment
- Export must be available on demand without approval queues — the org doesn't need to explain why

**Related ADRs:** [ADR-002](002-security-threat-model.md) (application-level encryption for sensitive fields), [ADR-003](003-identity-access-organization.md) (federated identity creates dedup challenges), [ADR-005](005-offline-first-sync.md) (conflict resolution for offline sync), [ADR-009](009-compliance-legal.md) (retention requirements per jurisdiction)
