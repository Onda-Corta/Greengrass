# ADR-015: Product Scope Boundaries

**Status:** Accepted
**Date:** 2026-03-03
**Sources:** `spec/workflows.md`, `spec/fundraising.md`, `spec/gotv.md`, `spec/messaging.md`, `spec/press.md`

## Context

As product definition progressed, several capability areas required explicit scoping decisions — should this be in the platform, deferred for later, or permanently out of scope? These decisions define the product boundary and prevent scope creep while ensuring critical capabilities aren't missed. Each decision was made based on the target market (grassroots campaigns in the global south), available engineering resources, and whether the capability is core to the platform's mission or tangential.

## Decision

### In scope: GOTV operations (separate spec)

Election day / Get Out The Vote operations are a first-class platform capability with their own detailed specification. GOTV includes: automated universe building, early/absentee voting tracking, door knocking with dynamic walk lists, chase calls, rides to polls, poll watching with issue reporting, real-time turnout tracking, dynamic resource reallocation, war room coordination, and post-election analysis.

**Rationale:** Election day is the single most operationally intense day of any campaign — the moment when all other work converges. A platform for grassroots political campaigns that can't handle election day is incomplete.

### In scope: internal messaging with E2E encryption (separate spec)

Internal messaging (staff-to-staff, candidate-to-staff, war room coordination) with E2E encryption by default, optional threading, broadcasts, contextual messages attached to platform objects, and alliance cross-org communication.

**Rationale:** Campaigns generate sensitive strategic communications that must be protected from surveillance. Forcing campaigns to use external tools (Signal, WhatsApp) for internal communication fragments the workflow and loses the ability to attach messages to operational context (voters, events, shifts).

### In scope: press and media management (separate spec)

Press contact management, media lists, press release distribution, media advisory creation, statement distribution, media coverage tracking, endorsement pipeline management, spokesperson management, talking points library, social media scheduling and analytics, and public profile hosting.

**Rationale:** Earned media does work a resource-constrained campaign cannot pay for. Making press operations workable for campaigns that have no dedicated press secretary is worth the build.

### Out of scope: volunteer gamification

No leaderboards, badges, achievement systems, or point-based volunteer incentives.

**Rationale:** There are better ways to keep volunteers coming back than cheap gamification. Leaderboards can create perverse incentives (speed over quality in canvassing), badges trivialize important work, and achievement systems distract from the actual mission. Volunteer motivation in political campaigns comes from the cause, not from game mechanics. The platform tracks volunteer activity for recognition purposes (hours, shifts completed, contacts made) but doesn't gamify it.

### Deferred: cryptocurrency donations

Not supported for alpha or pilots. If a tenant accepts crypto through their own external processor, the platform can record it as a manual/external donation. No active prevention, no active support.

**Rationale:** Regulatory clarity around cryptocurrency donations in political campaigns does not exist in most target jurisdictions. Building support now would mean building compliance frameworks against undefined rules. Revisit when regulatory clarity emerges in a target jurisdiction.

### Deferred: matching gifts

Not supported for alpha or pilots.

**Rationale:** Matching gifts are primarily a US/corporate feature, not relevant for most global south jurisdictions. Building matching gift infrastructure before the US market is a significant portion of the user base would be premature investment. Revisit when the platform matures and US market grows.

### Deferred: peer-to-peer fundraising

All fundraising pages are campaign-controlled. Supporter-created fundraising pages linked to campaigns are deferred.

**Rationale:** Peer-to-peer fundraising adds compliance complexity (who is responsible for content on supporter-created pages?) and moderation burden. The data model accommodates it (supporter-created pages with attribution tracking) so it can be added later without migration pain.

### Deferred: automated media monitoring

Media coverage tracking is manual logging only. Automated media monitoring (scanning publications for mentions) is deferred as a strategic opportunity.

**Rationale:** Existing media monitoring services (Meltwater, Cision) are expensive, Western-focused, and poorly cover regional/local media in the global south. A GreenGrass-native media monitoring capability covering local-language media across target countries could be a major differentiator — but it deserves serious investment as a dedicated product initiative, not a bolt-on integration.

## Consequences

**Benefits:**
- Clear scope boundaries prevent feature creep during an already ambitious development phase
- In-scope decisions ensure the platform covers the complete campaign lifecycle (including the highest-stakes moments like election day)
- Deferred items have clear revisit criteria, not permanent exclusion
- Out-of-scope gamification is a principled position that shapes the platform's character

**Costs:**
- Not supporting crypto donations may exclude some potential donors in jurisdictions where it's becoming mainstream
- Manual media monitoring creates work for press staff that could be automated
- No peer-to-peer fundraising means campaigns can't ask supporters to raise money from their own networks

**Constraints:**
- Deferred items must have their data model implications considered now to avoid migration pain when they're eventually built
- The "revisit when" criteria for deferred items must be tracked and re-evaluated periodically

**Related ADRs:** [ADR-006](006-field-operations-gotv.md) (GOTV in-scope details), [ADR-007](007-fundraising-payments.md) (fundraising scope, crypto/matching deferred), [ADR-008](008-communications-messaging.md) (internal messaging in-scope details)
