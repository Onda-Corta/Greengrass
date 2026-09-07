# ADR-002: Security & Threat Model

**Status:** Accepted
**Date:** 2026-03-03
**Sources:** `spec/security.md`, `design/architecture/system.md`, `design/ux/02-global-patterns/security-ux-patterns.md`

## Context

GreenGrass operates in political environments where security failures have real-world consequences — surveillance, harassment, arrest, or violence. The threat model includes state actors with network interception capabilities, political opponents who might infiltrate as volunteers, and devices that may be physically seized at checkpoints or raids. Standard enterprise security measures are insufficient; the architecture must assume breach, minimize blast radius, and provide features specifically designed for hostile political environments.

## Decision

### BYOK encryption by default

Tenants generate and hold their own encryption keys. GreenGrass cannot decrypt tenant data and therefore cannot be compelled to hand it over. This is the default, not an advanced option — BYOK is presented as the recommended choice during onboarding with guided key generation, secure backup flows (including Shamir's secret sharing across multiple org admins), and clear documentation that key loss means permanent data loss.

Tenants who explicitly choose convenience over sovereignty can opt into GreenGrass-managed keys, which enables support-assisted data recovery and simplifies operations for less technical organizations.

**Alternatives considered:** Managed keys as default with BYOK as opt-in was rejected because it inverts the trust model — the platform would hold keys to sensitive political data by default, making it a target for compulsion. Platform-managed-only was never considered given the threat model.

### TLS 1.2+ with TLS 1.3 preferred

All network communication is encrypted. Clients supporting TLS 1.3 negotiate it automatically; older devices fall back to TLS 1.2 with weak cipher suites disabled. This balances security with device accessibility in the global south where older devices are common. HTTPS with HSTS and certificate pinning for mobile clients; mutual TLS for internal service communication.

### Assume-breach architecture

Every layer is designed assuming the layer above it has been compromised. Defense in depth, not perimeter security. Single-tenant architecture limits blast radius — compromising one tenant does not expose another. Application-level encryption protects high-sensitivity fields (political sentiment scores, canvassing notes, donor identity, candidate communications, national ID numbers) on top of storage-level encryption, so a database compromise alone does not expose the most sensitive data.

### Duress mode with sanitized interface

A secondary passkey logs into a sanitized view of the app that appears functional but contains no sensitive data. The duress login is indistinguishable from a normal login — no visual cues, no different loading behavior. It triggers a silent alert to the user's trusted contacts and Org Admin. Available on the aggressive security tier for tenants operating in hostile political environments.

<!-- REVISIT: "the aggressive security tier" conflates two different axes: metadata
protection (moderate / aggressive) and isolation (Standard / Enhanced / Maximum /
Self-hosted). There is no "aggressive security tier"; security.md places duress mode at
the aggressive metadata-protection tier. -->

The sanitized view shows plausible but scrubbed content — a real account structure with minimal data, not a blank or obviously fake state. This withstands casual inspection by an adversary.

**Alternatives considered:** No duress mode (out of scope) was rejected because physical device seizure is a real threat in target countries. Obvious decoy apps were rejected because they don't withstand inspection.

### Operational data only on field devices

Walk list downloads contain only what's operationally necessary: name, address, age, previous contact result, and the canvassing script. Detailed canvassing notes from prior visits, internal tags and scores, donation history, national ID, and full communication history stay on the server. If a device is seized, exposure is limited. All on-device data is encrypted (SQLCipher) and wiped at session end.

## Consequences

**Benefits:**
- BYOK makes GreenGrass architecturally unable to comply with data demands for most tenants — the strongest possible trust model
- Assume-breach architecture means no single point of compromise can expose the entire platform
- Duress mode provides physical security protection for activists in hostile environments
- Minimal field device data limits exposure from the most likely physical attack vector (device seizure)

**Costs:**
- BYOK key management creates a significant UX burden that must be solved through guided flows and Shamir's secret sharing
- Key loss is permanent data loss — the onboarding flow must make this consequence unmistakably clear
- Duress mode requires careful design to be indistinguishable from normal login, adding implementation complexity
- Application-level encryption on top of storage encryption adds query complexity for encrypted fields

**Constraints:**
- All security features must work on low-end devices common in the global south
- Silent duress alerts must be robust against network monitoring — the alert itself cannot be what reveals the duress
- Security must be invisible during normal operation — intrusive security UX undermines adoption

**Related ADRs:** [ADR-001](001-platform-architecture.md) (single-tenant isolation is a security control), [ADR-003](003-identity-access-organization.md) (authentication and session management), [ADR-005](005-offline-first-sync.md) (offline data encryption), [ADR-008](008-communications-messaging.md) (E2E encryption for messaging)
