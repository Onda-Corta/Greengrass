# Internal Communications & Notifications

## Purpose

This document specifies GreenGrass's internal communication system — how staff, candidates, and volunteers communicate with each other within the platform. This is distinct from external communications (email campaigns, SMS blasts, WhatsApp outreach to voters), which are specified in workflows.md.

Internal communications emerged as a gap across multiple specs: workflows.md identified it as needing its own spec pass, security.md decided E2E encryption by default with opt-in key escrow, users.md defined candidate-to-staff messaging as a core capability, and gotv.md revealed the need for real-time war room coordination.

Political campaigns have unique communication requirements: messages may contain sensitive strategic information, staff turnover is high, security threats are real, and the pace of communication varies wildly (quiet between elections, frantic during GOTV). The communication system must handle all of this.

## Communication Philosophy

1. **Security by default.** E2E encryption for all internal messages (decided in security.md). The platform cannot read message content unless the tenant explicitly enables key escrow.
2. **Campaign-shaped, not enterprise-shaped.** Campaigns aren't companies. Communication patterns are flat, fast, and contextual — not hierarchical approval chains. The system should feel more like Signal than Outlook.
3. **Context-rich.** Messages about a voter, a donation, a turf, or an event should link to those objects. Communication and action happen in the same place.
4. **Offline-tolerant.** Messages queue when offline and deliver when reconnected. No message loss.
5. **Noise-controlled.** Election day generates hundreds of events. The notification system must help users focus, not drown them.

## Message Types

### Direct Messages

One-to-one conversations between any two users within the same org.

- **Staff-to-staff** — the most common case. Field Director to Volunteer Coordinator, Communications Director to Org Admin, etc.
- **Candidate-to-staff** — candidates communicate with their key staff through the same messaging interface. Per users.md, the candidate's interface is curated — they see a simplified view, but messaging is full-featured.
- **Staff-to-volunteer** — Team Leads and staff can message individual volunteers (e.g., schedule changes, assignment updates, check-ins).

### Group Conversations

Multi-person conversations for team coordination.

- **Ad-hoc groups** — any user can create a group conversation and add members. No formal structure required.
- **Persistent groups** — groups that persist across the campaign (e.g., "Leadership Team," "Field Staff," "Finance Team"). Created by staff, membership managed by the group creator or org admins.
- **Team-linked groups** — automatically created when a Team (per users.md team structure) is created. All team members are included. Team Lead manages membership.

**DECIDED: Optional threading.** Messages appear in a flat chronological stream by default, but any message can be replied to as a thread. Threads keep side conversations from cluttering the main stream while maintaining the simplicity of a group chat for small groups. Balances the campaign's need for speed (flat chat) with scale (threading when groups get large during GOTV).

### Broadcasts

One-to-many messages from staff to large groups.

- **Org-wide announcements** — Org Admin or designated staff can send a message to all staff, all volunteers, or the entire org. Read-only — recipients cannot reply to the broadcast itself (but can start a DM with the sender).
- **Role-based broadcasts** — send to everyone with a specific role (e.g., all Team Leads, all Field staff).
- **Geographic broadcasts** — send to all staff/volunteers assigned to a specific geographic area (precinct, district, region).
- **Shift broadcasts** — send to all volunteers assigned to a specific shift or event.

Broadcasts are not E2E encrypted — they use server-side encryption (the tenant's envelope key) since they target large groups and individual key exchange is impractical. This is disclosed in the UI.

### Contextual Messages

Messages attached to specific platform objects, enabling communication in context.

- **Voter/contact notes** — already specified in workflows.md (canvassing notes). These are data, not messages, and are encrypted per the data model.
- **Event comments** — staff can discuss an event (logistics, issues) in a message thread attached to the event.
- **Shift comments** — Team Leads and staff can communicate about a specific shift (volunteer no-shows, supply issues) in a thread attached to the shift.
- **Issue threads** — poll watcher issues (gotv.md) have their own comment threads for escalation discussion.
- **Donation flags** — compliance-flagged donations (fundraising.md) can have discussion threads for review.

**DECIDED: Inherit from org setting.** Contextual messages follow the org's encryption mode. If the org has key escrow enabled, contextual messages use server-side encryption (searchable, accessible to anyone with permission on the parent object). If E2E is the org's mode, contextual messages are also E2E (with the trade-off that server-side search is unavailable and access requires per-participant key exchange).

## Notifications

### Notification Sources

The platform generates notifications from many subsystems:

| Source | Examples |
|--------|----------|
| **Messaging** | New DM, new group message, @mention, broadcast received |
| **Assignments** | New shift assignment, turf reassignment, staging location change |
| **GOTV** | Reallocation suggestion, ride request, poll watcher issue escalation |
| **Fundraising** | Compliance flag on donation, recurring donation failure, refund request |
| **Compliance** | Approaching contribution limit, consent expiration, reporting deadline, data subject request |
| **Volunteer** | New volunteer signup, training completion, certification expiration |
| **Events** | Event RSVP, event reminder, event cancellation |
| **System** | Security alert, sync failure, update notification, breach notification |

### Notification Channels

Notifications can be delivered through multiple channels:

- **In-app** — badge counts, notification drawer, toast/banner for urgent items. Always available.
- **Push notification** — mobile push via Capacitor. Requires device permission.
- **Email digest** — configurable summary of notifications (immediate, hourly, daily, or off). For users who aren't in the app constantly.
- **SMS** — reserved for critical alerts only (security breaches, urgent GOTV escalations). Opt-in.

### Notification Priority

**DECIDED: User-configurable priority.** Users set per-source notification preferences: which delivery channel (in-app, push, email, SMS), what priority level, and mute/unmute. Full user control over their notification experience. Security alerts and breach notifications are the sole exception — these are always delivered at critical priority and cannot be muted.

### Do Not Disturb & Quiet Hours

- **Do Not Disturb mode** — suppresses all non-critical notifications. Only security alerts and emergency-severity poll watcher issues break through.
- **Quiet hours** — configurable per user. No notifications delivered during quiet hours except critical alerts. Queued notifications delivered when quiet hours end.
- **Election day override** — during active GOTV operations, quiet hours are suspended for GOTV-related notifications (with user consent during election day setup).

## Candidate Communication

The candidate persona (users.md) has unique communication needs:

### Curated Interface

- The candidate sees messaging as a primary feature — it's one of the main things they use the platform for.
- Their message list shows conversations with key staff (Campaign Manager, Communications Director, Finance Director) prominently.
- Group conversations they're part of (e.g., "Leadership Team") are easily accessible.
- They don't see the full organizational chat landscape — only conversations they're part of.

### Candidate-Specific Patterns

- **Briefing messages** — staff can send structured briefings (talking points, schedule updates, polling data summaries) that appear distinctly from casual conversation. These are formatted messages with a specific template, not free-text chat.
- **Approval requests** — staff can send items for candidate approval (press release draft, social media post, fundraising email). The candidate can approve, reject, or comment. Tracked for audit.
- **Schedule integration** — messages can reference calendar events. "Your 3pm event at [location] has been moved to 4pm" with a link to the event.

## Alliance Communication

Alliances (workflows.md) need cross-org communication:

- **Alliance coordination channel** — a shared group conversation that includes designated representatives from each member org. Operates at the federation layer.
- **Cross-org DMs** — alliance staff can send direct messages to staff at other member orgs (subject to alliance sharing rules).
- **Alliance broadcasts** — the alliance coordinator can send announcements to all member orgs.

**DECIDED: Per-org key negotiation.** Alliance messages use an independently generated alliance group key, distributed to each member org encrypted with that org's public key. Key rotation occurs on every alliance membership change (org joins or leaves), ensuring forward secrecy (new members can't read historical messages) and post-compromise security (departing members can't read future messages). Rotating the key is a real ceremony, which makes an org joining or leaving feel like the consequential act it is and gives the join/leave flow a concrete moment to build around. More complex than federation-layer encryption, but consistent with the sovereignty model — no new trust boundary is introduced.

## War Room Communication

Election day war rooms (gotv.md) have specialized communication needs:

### War Room Channel

- **Dedicated war room channel** — automatically created when GOTV operations are activated for an election. Includes all war room staff (Org Admin, Field Directors, Rides Coordinator, Communications Director, legal team contacts).
- **Structured updates** — the channel receives automated updates: turnout milestones, reallocation suggestions, ride request backlog alerts, poll watcher escalations.
- **Pinned information** — key reference info pinned at the top: poll closing times, emergency contacts, legal hotline numbers, escalation procedures.

### Field Communication During GOTV

- **Team Lead → War Room** — Team Leads can escalate issues from the field directly to the war room channel.
- **War Room → Field** — war room staff can broadcast to all active field volunteers (e.g., "All canvassers: shift to evening turfs now").
- **Ride coordination messages** — ride requests and driver assignments generate notifications in the rides coordination thread.

## Technical Requirements

### E2E Encryption Implementation

Per security.md and system.md decisions:

- **Protocol:** Signal Protocol (Double Ratchet) or equivalent. Well-audited, widely implemented, handles multi-device gracefully.
- **Key generation:** each user generates a public/private key pair during onboarding ([system.md § Field mode authentication](../design/architecture/system.md#field-mode-authentication)). Private keys never leave the device.
- **Multi-device:** users may have multiple devices (phone + desktop). Key distribution across devices uses the established pattern (new device must be authorized from an existing device or through trusted contact recovery).
- **Group encryption:** Sender Keys protocol for group messages (each sender has a key shared with all group members — efficient for groups, one encryption operation per send regardless of group size).
- **Key escrow (opt-in):** when the tenant enables key escrow, a copy of the user's private key is encrypted with the tenant's envelope key and stored server-side. Enables server-side search and device recovery without trusted contacts.

### Message Storage

- **On-device:** messages stored in the local encrypted database (SQLCipher). Available offline.
- **Server-side (E2E mode):** server stores encrypted message blobs. Cannot read content. Stores metadata (sender, recipient, timestamp, message ID) for delivery routing.
- **Server-side (escrow mode):** server can decrypt and index messages for search. Same retention policy as other tenant data.
- **Retention:** messages follow the tenant's configured data retention policy. When retention expires, messages are deleted from server storage. On-device copies remain until the user clears them or the device is wiped.

### Message Delivery

- **Online delivery:** messages delivered via WebSocket connection in real-time.
- **Offline queuing:** if the recipient is offline, messages are queued server-side and delivered on next connection. Queue follows the same sync protocol as other data (system.md event sourcing).
- **Delivery receipts:** sender sees when message is delivered to the server and when it's received by the recipient's device. Displayed as checkmarks (single = sent, double = delivered).

**DECIDED: No read receipts.** The platform does not track or display when a message is read. Delivery receipts only (sent to server, delivered to device). Privacy-first, consistent with the security-focused messaging philosophy.

### Search

- **E2E mode (no escrow):** search is client-side only. The app searches the local message database on the device. Limited to messages that have been synced to that device. No server-side search.
- **Escrow mode:** full server-side search across all messages. Search results respect the user's access — you can only search messages in conversations you're part of.
- **Contextual messages:** if using server-side encryption (per decision above), always searchable server-side.

### Offline Behavior

- **Reading:** all synced messages are available offline. Users can read their full message history.
- **Composing:** users can compose and send messages while offline. Messages queue locally and send when connectivity is restored.
- **Receiving:** messages sent while the user is offline are queued and delivered on reconnection. No message loss.
- **Group sync:** when returning online, the app syncs missed group messages in chronological order.

### Media & File Sharing

- **Supported media:** images, short video clips, voice messages, PDF documents.
- **Size limits:** configurable per tenant (default: 25MB per attachment).
- **Storage:** media attachments stored encrypted (E2E in non-escrow mode, envelope key in escrow mode). Media counts against the tenant's storage quota.
- **Thumbnails:** for images, an encrypted thumbnail is generated for preview. In E2E mode, the thumbnail is encrypted with the same key as the full image.

**DECIDED: Voice messages scoped to field contexts.** Voice messages are available in field-related conversations — Team Lead channels, shift threads, GOTV war room, and field broadcast contexts — where field staff can't easily type (walking between doors, driving). Not available as a general messaging feature across all conversations. Automatic transcription (for search and accessibility) deferred to when AI infrastructure is in place.

## Moderation & Safety

### Content Policies

- GreenGrass does not moderate the content of internal messages — these are private communications within a political organization. The tenant (Org Admin) is responsible for their org's communication standards.
- **Exception:** the platform scans for known CSAM hashes (legally required in most jurisdictions) and blocks such content. This scanning operates on content hashes, not content reading, and works even in E2E mode.

### Abuse Reporting

- Users can report a message or conversation to the Org Admin. The report includes the message content (the reporting user provides it — the platform doesn't break E2E to extract it).
- Org Admins can remove users from group conversations and disable messaging for specific users.
- There is no platform-level (GreenGrass) moderation of internal messages. Tenant autonomy applies.

### Message Deletion

- **Sender can delete** — a sender can delete their own message. In E2E mode, this sends a deletion request to all recipients' devices (best-effort — if a device is offline, the message may persist until the device syncs the deletion).
**DECIDED: No disappearing messages.** All messages persist until manually deleted by the sender or until the tenant's data retention policy expires. Simpler, and avoids potential compliance issues with jurisdictions that may require message retention for campaign communications.

## GOTV-Specific Communication Modes

### Election Day Mode

When GOTV operations are activated:

- **Notification priority shifts** — GOTV-related notifications (turnout updates, reallocation suggestions, ride requests, poll watcher escalations) are elevated to high priority.
- **War room channel becomes primary** — the war room channel is pinned to the top of every war room member's message list.
- **Field broadcast capability** — war room staff gain a one-tap broadcast button to reach all active field volunteers.
- **Automated status updates** — the system posts periodic turnout summaries to the war room channel (e.g., every 30 minutes).

### Post-Election Wind-Down

- Election day mode deactivates after polls close (or manually by Org Admin).
- War room channel persists for post-election coordination but loses its priority status.
- Notification priorities return to normal.
- Election day message history is preserved per retention policy.

## Open Questions

1. **Voice and video calls** — should the platform support voice/video calls between users (not phone banking to voters, which is covered in workflows.md)? This would add significant complexity but could replace the need for external tools like Signal or WhatsApp for internal coordination. The Jitsi integration (integrations.md) could carry it.

2. **Message reactions** — should users be able to react to messages with emoji? Low-effort acknowledgment without a full reply. Common in modern messaging. Minimal implementation cost but adds UI complexity.

3. **Message forwarding** — should users be able to forward a message from one conversation to another? Useful for sharing information across teams. Privacy implications — the original sender may not have intended the message for a wider audience.

4. **Bot/automation messages** — should automated systems be able to post messages to channels (e.g., "New volunteer signup: [name]" posted to the #volunteers channel)? Useful for awareness but can become noisy.

5. **External messaging bridge** — some campaign staff may prefer to use existing tools (Signal, WhatsApp, Telegram) for internal communication. Should the platform offer a bridge that mirrors internal messages to external platforms? Significant security and compliance implications.

<!-- REVISIT: The Signal Protocol implementation needs careful security audit before launch. Consider using an established library (libsignal) rather than implementing from scratch. -->
<!-- REVISIT: Storage costs for media attachments in E2E mode need analysis. E2E encrypted media cannot be deduplicated server-side, which increases storage costs compared to server-side encryption. -->
