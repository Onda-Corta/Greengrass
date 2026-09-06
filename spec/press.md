# Press, Media & Public Communications

## Purpose

This document specifies GreenGrass's press and media capabilities — how campaigns manage relationships with journalists, distribute press materials, track media coverage, manage public-facing content, and coordinate social media presence.

Campaigns live and die by earned media. For resource-constrained campaigns in the global south, earned media is often the most cost-effective way to reach voters — far more so than paid advertising. A well-timed press release, a viral social media post, or a favorable news story can have more impact than weeks of door-knocking. The platform must make press operations accessible to campaigns that may not have a dedicated press secretary.

This spec builds on: workflows.md (social media integration, activism delivery events), users.md (Communications Director role, public profiles, Contact record type), messaging.md (candidate approval requests for press content), compliance.md (public-facing content disclaimers), and system.md (social media adapter architecture).

## Press & Media Philosophy

1. **Earned media is the cheapest reach a campaign has.** For campaigns with limited budgets, press coverage buys more attention per dollar than any other channel. Press operations deserve the same support in the platform as canvassing or fundraising.
2. **Relationships, not blasts.** Effective press work is about relationships with specific journalists, not mass emails. The CRM's contact management should support media relationships as a first-class concern.
3. **Compliance-aware public communications.** Every public-facing piece of content — press releases, social media posts, public statements — must carry appropriate disclaimers per jurisdiction (compliance.md). The platform enforces this automatically.
4. **Candidate-controlled public voice.** Nothing goes public without the candidate's awareness. The approval workflow (messaging.md) ensures the candidate reviews public-facing content before distribution.

## Media Contact Management

### Media Contacts as CRM Records

Media contacts use the existing Contact record type ([users.md § Contact](users.md#contact)) with media-specific fields:

- **Outlet** — the publication, station, or platform the journalist works for
- **Beat** — what the journalist covers (politics, local government, education, labor, etc.)
- **Coverage area** — geographic scope of their coverage (national, state/province, city, district)
- **Contact method preferences** — how they prefer to receive pitches (email, phone, WhatsApp, Signal)
- **Language** — language(s) they work in
- **Relationship status** — cold, warm, established, close (informal tracking for the press team)
- **Notes** — free-text relationship notes (encrypted per data model)
- **Last contact date** — auto-populated from communication history

### Media Lists

Curated lists of journalists for targeted outreach:

- **List creation** — staff create named media lists (e.g., "Political reporters — San Juan," "National education beat," "Friendly columnists")
- **Dynamic lists** — lists can be defined by criteria (beat + coverage area + language) and auto-update as contacts are added/modified
- **Static lists** — manually curated lists for specific purposes (e.g., "Debate night press pool")
- **List sharing** — media lists are org-level resources, visible to all staff with press permissions

### Media Interaction Tracking

Every interaction with a media contact is logged:

- **Pitch sent** — what was pitched, when, through which channel, by whom
- **Response received** — journalist's response (interested, passed, needs more info, no response)
- **Interview scheduled** — date, time, format (in-person, phone, video), topic, interviewee (candidate or spokesperson)
- **Coverage resulted** — link to the resulting article/segment, sentiment (positive, neutral, negative, mixed)
- **Follow-up needed** — reminder to follow up with a journalist after an event, announcement, or pitch

This creates a complete picture of the campaign's media relationships and helps new press staff get up to speed quickly (critical given campaign staff turnover).

## Press Content

### Press Releases

- **Press release builder** — structured template with: headline, subhead, dateline, body, quote blocks (attributed to named individuals), boilerplate (org description), contact information
- **Compliance integration** — disclaimer text automatically appended based on jurisdiction (compliance.md). Press releases for political campaigns typically require "paid for by" or equivalent attribution.
- **Approval workflow** — press releases route through the candidate approval flow ([messaging.md § Alliance Communication](messaging.md#alliance-communication)). Candidate can approve, reject, or comment. Approval tracked for audit.
- **Distribution** — send the approved release to selected media lists via email. Personalization supported (journalist's name, outlet-specific notes).
- **Embargo support** — mark a release as embargoed until a specific date/time. Embargo notice included in the distribution. Platform tracks who received the embargoed release.
- **Versioning** — press releases maintain version history. If a release is updated after distribution (correction, update), the platform can send an updated version noting changes.

### Media Advisories

Shorter-form notices alerting media to upcoming events:

- **Advisory template** — who, what, when, where, why format. Simpler than a full press release.
- **Event integration** — advisories can be created directly from a platform event (workflows.md). Event details auto-populate the advisory fields.
- **Distribution** — same media list distribution as press releases.

### Statements

Official campaign statements in response to events:

- **Statement template** — attributed to a named individual (candidate, spokesperson, org leader). Shorter and more reactive than a press release.
- **Rapid approval** — statements often need to go out quickly. The approval workflow supports priority flagging for time-sensitive content.
- **Distribution** — to media lists and/or posted to public profiles and social media.

### Media Kit

A persistent collection of campaign materials for journalist reference:

- **Components:** candidate bio, high-resolution photos (headshot, action shots), org description/boilerplate, key policy positions, fact sheets, campaign logo and branding assets
- **Hosting** — media kit hosted on the campaign's public-facing page (see Public Profiles below). Downloadable as a ZIP or browsable online.
- **Access tracking** — optionally track which journalists access the media kit (requires the journalist to provide their email or click a tracked link).

**DECIDED: Configurable per asset.** Campaign controls access at the individual asset level. Candidate bio and boilerplate can be fully public, while high-resolution photos or internal fact sheets can be gated (journalist provides email to access). Gated access auto-creates media contact records in the CRM. Each campaign decides for itself where the line between reach and intelligence-gathering falls.

## Media Coverage Tracking

### Coverage Logging

When a media contact's interaction results in coverage:

- **Coverage entry** — staff log coverage with: outlet, journalist, date published, headline, URL (if online), format (article, TV segment, radio, podcast, social media mention), sentiment (positive, neutral, negative, mixed), topic/issue tags, reach estimate (if known)
- **Coverage linked to pitch** — coverage entries link back to the pitch or interaction that generated them, completing the pitch-to-coverage pipeline
- **Coverage linked to press release** — if coverage resulted from a specific release, the link is tracked

**DECIDED: Deferred — but flagged as a strategic opportunity.** Manual logging only for now. Automated media monitoring is deferred not because it's unimportant, but because it deserves serious investment rather than a bolt-on integration. Existing media monitoring services (Meltwater, Cision, etc.) are expensive, Western-focused, and poorly cover regional and local media in the global south. This is a significant market gap. A GreenGrass-native media monitoring capability — especially one that covers local-language media across target countries — could be a major differentiator. Revisit as a dedicated product initiative, not an afterthought.

### Coverage Analytics

- **Coverage volume** — total coverage over time, by outlet, by sentiment
- **Pitch-to-coverage rate** — percentage of pitches that resulted in coverage
- **Journalist responsiveness** — which journalists are most responsive to the campaign's pitches
- **Topic analysis** — which campaign issues/topics generate the most coverage
- **Reach estimates** — aggregate estimated reach across all coverage (where outlet reach data is available)

## Public-Facing Content

### Public Profiles

Per product.md: public-facing profiles for candidates, organizations, and (optionally) other users.

#### Candidate Profile

- **Content:** name, photo, bio, policy positions, endorsements, campaign contact information, social media links
- **Multi-language:** profile content available in the org's configured languages (geography.md)
- **Disclaimer:** jurisdiction-required disclaimer automatically displayed
- **Donation integration** — embedded donation form or prominent donate button linking to the campaign's donation page (fundraising.md)
- **Events** — upcoming public events displayed on the profile (from the event system, workflows.md)

#### Organization Profile

- **Content:** org name, logo, mission statement, leadership, contact information, social media links
- **Alliance display** — if the org is part of an alliance, option to display alliance membership and link to allied orgs' profiles
- **Donation integration** — same as candidate profile

#### Profile Hosting

**DECIDED: Both — platform-hosted default + API access.** Platform-hosted profiles work out of the box at the tenant's subdomain or custom domain, with a template-based profile builder. API access is available for campaigns that want to render profile content on their own website with full design control. The platform-hosted version is always available as a fallback, ensuring every campaign has a public presence regardless of technical capability.

### Social Media Management

Per workflows.md (486-488) and system.md (632-643), social media management is in scope with the following capabilities:

#### Post Creation & Scheduling

- **Multi-platform composer** — create posts for multiple platforms from a single interface. Platform-specific preview shows how the post will appear on each platform (character limits, media formats, link previews).
- **Scheduling** — schedule posts for future publication. Calendar view shows all scheduled and published posts.
- **Media attachment** — attach images, video, links. Platform-specific formatting (e.g., Instagram requires images, Twitter/X has character limits).
- **Compliance integration** — disclaimer requirements for political advertising on social media vary by platform and jurisdiction. The platform warns if a post may need a disclaimer and helps add it in the platform-appropriate format.

#### Supported Platforms

Per system.md, a modular adapter architecture supports per-platform integration:

- **Launch platforms:** Facebook, Instagram, Twitter/X
- **Future platforms:** TikTok, LinkedIn, YouTube (added by writing new adapters)
- **Per-country priorities:** WhatsApp Status (Brazil), LINE (Thailand), platform preferences vary by market

**DECIDED: Both — OAuth + copy-paste fallback.** Direct OAuth connection where available and approved by the social media platform. Copy-paste fallback with media download for platforms where API access is unavailable or restricted for political content. The copy-paste path is a critical safety net given the trend of social media platforms increasingly restricting API access for political content — the platform must never be in a position where a third-party API policy change breaks a campaign's ability to post.

#### Post Approval Workflow

- **Draft → Review → Approve → Schedule/Publish** — social media posts follow the same candidate approval workflow as press releases ([messaging.md § Alliance Communication](messaging.md#alliance-communication)).
- **Batch approval** — candidate can review and approve multiple scheduled posts in one session.
- **Emergency bypass** — Org Admin or Communications Director can publish without candidate approval for time-sensitive responses (logged for audit, candidate notified after the fact).

#### Analytics

- **Per-post metrics** — engagement (likes, shares, comments, clicks), reach, impressions. Pulled from platform APIs where available.
- **Cross-platform dashboard** — aggregate social media performance across all platforms.
- **Content performance** — which types of content (policy, personal, attack, event promotion) perform best on which platforms.
- **Audience growth** — follower/subscriber trends over time per platform.

### Endorsement Management

An endorsement is someone else vouching for the candidate, in their own words. For most campaigns it is the most valuable public communications asset they have.

- **Endorsement records** — track endorsements with: endorser name, title/position, organization (if applicable), date received, public/private status, endorsement text (quote), photo
- **Endorser as Contact** — endorsers are tracked as Contact records in the CRM ([users.md § Contact](users.md#contact)), linking the endorsement to the broader relationship
- **Public display** — approved endorsements can be displayed on the candidate's public profile, organized by category (elected officials, organizations, community leaders, individuals)
- **Endorsement announcement** — when a new endorsement is received, the platform can generate a press release from a template (endorser quote, candidate response quote, boilerplate) and a social media post

**DECIDED: Full pipeline.** Endorsements tracked as a pipeline: identified → approached → considering → committed → public. Gives campaigns a clear view of their endorsement strategy, progress, and gaps. Each stage can have notes, assigned staff, and target dates. When an endorsement moves to "public," it triggers the announcement workflow (press release template + social media post generation).

## Spokesperson Management

### Designated Spokespersons

- **Spokesperson designation** — Org Admin can designate which staff members are authorized to speak to the press on behalf of the campaign. This is a permission flag, not a separate role.
- **Topic assignment** — spokespersons can be assigned topic areas (e.g., "policy questions → Policy Director," "fundraising questions → Finance Director," "all other → Campaign Manager")
- **Contact routing** — when a journalist contacts the campaign through the platform (via public profile contact form or media kit), the inquiry is routed to the appropriate spokesperson based on topic

### Talking Points

- **Talking points library** — a managed collection of approved talking points organized by topic. Staff and the candidate can reference these when preparing for interviews or writing content.
- **Version control** — talking points are versioned. When a position evolves, the old version is archived and the new version is published. Staff always see the current approved language.
- **Distribution** — talking points can be pushed to designated staff via the internal messaging system (messaging.md) when updated.
- **Candidate briefing integration** — talking points feed into the candidate briefing messages ([messaging.md § Alliance Communication](messaging.md#alliance-communication)). Before an interview or press event, the candidate receives relevant talking points.

## Press Events

### Press Conference / Media Event Management

- **Event creation** — press conferences and media events use the existing event system (workflows.md) with press-specific fields: media advisory sent (yes/no/date), press pool invited (which media list), expected coverage format (TV, print, photo op)
- **Media RSVP tracking** — track which journalists have confirmed attendance
- **Post-event** — log resulting coverage, link to coverage entries

### Interview Scheduling

- **Interview requests** — log incoming interview requests with: journalist, outlet, topic, requested format, requested date/time, requested interviewee
- **Interview prep** — platform surfaces relevant talking points for the interview topic and recent coverage from the requesting outlet
- **Interview tracking** — after the interview, log outcome (aired/published, killed, pending) and link to resulting coverage

## Jurisdiction-Specific Considerations

### Political Advertising Disclaimers on Social Media

Per compliance.md, public-facing content requires jurisdiction-specific disclaimers:

- **US/Puerto Rico** — "Paid for by [committee name]" on all political advertising, including social media ads. Organic posts may also need disclaimers depending on jurisdiction and content.
- **Brazil** — TSE requires political advertising identification. Social media posts during campaign period must comply with TSE rules.
- **Thailand** — ECT regulations on political advertising. Campaign period restrictions apply to social media.
- **India** — ECI Model Code of Conduct restricts certain communications during election periods. Social media posts may require pre-certification for paid content.
- **Lebanon** — less formal requirements, but electoral law restricts certain campaign communications during the silence period.

The platform automatically warns when a post may need a disclaimer and helps apply it in the platform-appropriate format (e.g., text overlay for images, first line of caption for text posts).

### Media Landscape Differences

- **Puerto Rico** — bilingual media market (Spanish/English). Strong local TV and radio. Digital media growing. US national media occasionally covers PR elections.
- **Brazil** — massive social media market. WhatsApp is the dominant communication channel (including for news sharing). TV remains influential. TSE mandates free TV/radio time for campaigns (horário eleitoral).
- **Thailand** — LINE is a major platform alongside Facebook. Government influence on traditional media. Independent online media is significant. Lèse-majesté laws affect what can be said publicly (compliance.md).
- **India** — massive and fragmented media market. WhatsApp and YouTube are dominant digital channels. Regional language media is critical. ECI monitoring of social media during elections.
- **Lebanon** — confessional media landscape (outlets aligned with political/religious groups). WhatsApp is dominant for messaging. Social media is the primary channel for reaching younger voters. Arabic, French, and English media markets.

## Technical Requirements

### Social Media Adapter Architecture

Per system.md (632-643):

```
Tenant App → Post Scheduler → Platform Adapter → Social Media API
```

- One adapter per platform
- Common interface: `publish(post)`, `schedule(post, time)`, `getAnalytics(post_id)`, `getAudience()`
- Adapters handle platform-specific quirks (character limits, media formats, API rate limits, authentication)
- New platforms added by writing new adapters — no core changes
- Rate limiting per platform API requirements
- Token refresh and re-authentication handling

### Public Profile Rendering

- **Server-side rendered** — public profiles are server-side rendered for SEO and fast load times
- **Mobile-responsive** — profiles render well on all devices
- **Multi-language** — profiles serve content in the visitor's preferred language (with manual override, per geography.md)
- **Performance** — public profiles must load quickly even on slow connections (critical for target markets). Optimize images, minimize JavaScript.
- **Accessibility** — public profiles meet WCAG 2.1 AA standards

### Media Asset Management

- **Image storage** — high-resolution images stored in object storage ([system.md § What's inside a tenant](../design/architecture/system.md#whats-inside-a-tenant)). Multiple resolutions generated for different use cases (thumbnail, web, print-quality).
- **Brand assets** — logo, color palette, fonts stored as org-level assets. Available across all content creation tools (press releases, social media posts, public profiles, email templates).
- **Asset library** — searchable library of approved media assets (photos, graphics, video clips). Staff can browse and use approved assets when creating content.
- **Usage rights tracking** — optional field to track usage rights for media assets (photographer credit, license type, expiration date).

## Open Questions

1. **Paid social media advertising** — should the platform support creating and managing paid social media ads (Facebook Ads, Google Ads, etc.)? This is a significant product area with complex compliance requirements (political advertising transparency laws). May be better served by specialized tools.

2. **Press clipping service integration** — should the platform integrate with press clipping/media monitoring services (Meltwater, Cision, etc.)? These are expensive and primarily serve large campaigns. May not be relevant for the target market.

3. **Crisis communications** — should the platform have a dedicated crisis communications workflow (rapid response template, war room mode for comms, stakeholder notification sequence)? Or is the existing messaging + press release + social media infrastructure sufficient?

4. **Earned media valuation** — should coverage tracking include earned media value estimates (the equivalent advertising cost of the coverage received)? Common in PR but methodologically questionable.

5. **Brazil horário eleitoral** — Brazil's mandatory free TV/radio time for political campaigns is a unique media requirement. Should the platform support scheduling and tracking content for this format, or is it out of scope?

<!-- REVISIT: Social media platform API access for political content is increasingly restricted (Meta, Twitter/X). The adapter architecture must gracefully handle API access changes, rate limit reductions, and platform policy changes. The copy-paste fallback is a critical safety net. -->
<!-- REVISIT: Social media disclaimer requirements are evolving rapidly across jurisdictions. The compliance integration for social media needs to be easily updatable as laws change. -->
