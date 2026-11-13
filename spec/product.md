# Project: GreenGrass

## *An Integrated Technology Platform for Grassroots Political Campaigns in the Global South*

## *by Pablo Defendini & Giovanni Collazo — 22 november 2024*

# The direction as of November 2026

*Added 2026-11-13. This is the oldest document in the repository, and everything below this section is the description as it was written in 2024, with later edits. It is kept as written, because every other document was built on it. This section says what has changed. Where the two disagree, this section is current.*

**What the project builds is now shared infrastructure for organizations, not one all-in-one product.** The infrastructure turns on a central product, the Core, with a catalogue of modules that each client enables individually. Some of those modules are: radio and TV monitoring; social monitoring; press summary; ad-art builder; electoral analysis; crisis management; polls and surveys; content distribution; street operations; event and volunteer management; fundraising and payments.

**It reaches clients through two lanes, each with its own brand and product.**

- **The political lane.** *Greengrass*, run by Blimp.io and Onda Corta, is the platform for community movements, unions and political parties. Its first clients are the PIP, the Movimiento Victoria Ciudadana (MVC) and the Alianza de País. These clients are charged at cost, plus a commission that covers the cost of selling.
- **The commercial lane.** *Basecamp* (PR Media / Relacionistas.app), run by R&R and Onda Corta, is the platform for advertisers, public relations professionals, agencies and other commercial businesses. Its first client is the Asociación de Publicistas. It is charged cost, plus a 30% margin for the product's owner, plus the Comercializadora's commission.
- **Shared modules.** Every module in the catalogue can run in either product, though some are not useful in both lanes: electoral intelligence, for example, belongs to the political lane only. Each client runs its own instance, with its own data and its own accounts.
- **Independent lanes.** A lane does not wait for the other. The work with the PIP and the MVC does not depend on what the Asociación de Publicistas' tool turns out to be, or the reverse. When one lane improves a shared module, the improvement reaches the other too.

<!-- REVISIT: "the product's owner" (la dueña del producto) and "the Comercializadora" are used as given and defined nowhere. See ADR-026. -->

**"Greengrass" now names the political product, not the infrastructure.** The Core does not yet have a name of its own. In the rest of this document, and in every document written before November 2026, "GreenGrass" means the whole platform.

**Three surfaces.** The Core is headless: everything it does is an API operation first. A chat UI is meant to carry 70 to 80% of daily staff work, an admin UI the complex rest, and the field app stays as the surface for work done without a connection.

**What no competitor integrates:** the voter file, offline field tools, and tools for coalitions of parties. These stay at the centre of the political product.

**It works with what organizations already run.** The CRM syncs both ways with third-party tools, starting with NationBuilder and starting with CSV.

| What this section says | Where it is recorded | Standing |
|---|---|---|
| Core, modules and lanes | [ADR-022](../decisions/022-core-modules-and-lanes.md) | Proposed. The two lanes, the CRM in the Core and one instance per client are decided |
| A headless Core, chat, admin and field | [ADR-023](../decisions/023-surfaces-chat-admin-field.md) | Proposed. The chat waits on the [ADR-018](../decisions/018-ai-agent-posture.md) review, in both lanes |
| An event bus between instances | [ADR-024](../decisions/024-event-bus-as-federation.md) | Proposed |
| Each client holds its own accounts | [ADR-025](../decisions/025-identity-per-client.md) | Accepted |
| The prices | [ADR-026](../decisions/026-two-lane-pricing.md) | Accepted; the definitions they need are open |
| Sync with third-party CRMs | [ADR-027](../decisions/027-third-party-crm-sync-and-connectors.md) | Proposed. NationBuilder by CSV is decided |

**What in the original no longer holds.** Three things below are superseded and are marked where they appear: "all-in-one" and "one-stop-shop" as the shape of the product; "one set fee"; and the revenue models at the end of the document. Read everything else below as a description of the political lane.

# Executive Summary

Progressive/left-wing movements run on limited money, aging tools, and a scatter of disconnected services that don't talk to each other — a problem everywhere, and sharper in the global south. **GreenGrass** puts what a grassroots campaign in the Global South actually has to do into one platform: organize people, reach them on the channels they use, and keep enough data to decide where the next week of effort goes. It is priced for campaigns with very little money, built for the phones and connections they already have, and translated into the languages they organize in. The point is to cut the number of tools a campaign has to hold together and give it more time in contact with the people it is trying to reach.

---

Progressive political campaigns in Global South countries face unique challenges, including:

* **Limited Access to Digital Tools:** Most political technology platforms are designed for developed markets, with high costs and steep learning curves that make them inaccessible to grassroots campaigns.   
* **Fragmented Communication Channels:** Campaigns often rely on a mix of disparate tools for email, social media, and SMS, leading to inconsistent messaging, inefficient use of resources, and burgeoning costs.  
* **Inefficient Voter Engagement:** Many campaigns lack the ability to track and segment voter data effectively, resulting in generic outreach that fails to resonate with their constituencies.  
* **Resource Constraints:** Campaigns often operate on tight budgets, limiting what they can spend on good software.

While platforms like NationBuilder, Action Network, and Mobilize exist, they are designed for developed markets and often priced out of reach for progressive campaigns in the Global South.

# Project: GreenGrass

<!-- REVISIT: "all-in-one", "one-stop-shop" and "one set fee" in the paragraph below are superseded by the November 2026 direction at the top of this document: the product is a Core with modules a client enables one at a time (ADR-022), and the price is cost plus each lane's rule (ADR-026). The paragraph is left as written. -->

**Project: GreenGrass** is an all-in-one campaign technology platform tailored specifically for the needs of grassroots campaigns in countries in the Global South. It’s intended to be a one-stop-shop—with one set fee—so that campaigns and organizations can use the service without having to depend on additional services or costs (with the exception of unavoidable variable costs such as SMS sends, which are usually billed by volume by the supplier).

The product combines a Constituent Relationship Manager (CRM), a voter database, fundraising tools, communication tools, and data analytics into a single package a small campaign can afford, so the whole operation runs out of one system instead of five stitched together. 

GreenGrass is web- and mobile-first. The application is progressively enhanced and optimized for low-bandwidth and mobile-first environments. 

## Key Features

### Integrated CRM & People Database

* A CRM that consolidates candidate, staff, volunteer, and supporter data, as well as voter information.   
* Customizable voter profiles that allow campaigns to segment audiences based on demographics, voting history, and engagement levels.  
* An omni-list that de-dupes people.  
* Explicit login access for *everyone*, with easy-to manage account preferences.

### Fundraising Tools

* Donation forms, with the ability to manage recurring and one-time donations, as well as the ability to have the donor take on credit card processing fees, and the ability to prompt for specific donation amounts  
* Multiple payment processors (and local payment vendors—ATH Movil, Venmo, Zelle, etc), which will vary by region.   
* A way to register/track cash donations (esp during in-person events)  
* Support for both in-system donation forms, as well as custom embeddable forms, to place on third party services and sites.

### Multi-Channel Communication Suite

* Email Campaigns: Simple tools to design, send, and track email outreach, including automated follow-ups and analytics.  
* SMS & WhatsApp Integration: Built-in support for SMS and WhatsApp messaging.  
* Social Media Integration: Schedule and manage posts across multiple social media platforms from one central place, with analytics to track engagement and performance.  
* Public-facing user, candidates, and organization profiles.

### Voter Outreach Tools

* Voter Registration: A tool for field teams to conduct voter registration drives, with offline capabilities for areas with limited connectivity.  
* Canvassing: A tool that allows volunteers to conduct door-to-door outreach, collect data, and sync information to the central CRM in real time.  
* Phone Banking System: Integrated phone banking with call scripts and tracking, allowing staff to manage phone bank volunteers and shifts.

### Activism and engagement

* Email writing campaigns

### Event Management and Volunteer Coordination

* Events: Create and manage campaign events, with built-in RSVP tracking and reminders via email and SMS.  
* Volunteer Portal: A centralized portal for volunteers to sign up for shifts, track their activities, and communicate with campaign staff. Shifts and other time-based work should have a calendar view so that volunteer managers can visualize and manage work allocation.  
* Task Management: Simple task assignment and tracking system to coordinate activities across teams.

### Analytics and Reporting

* Voter Intelligence Dashboards: Monitor key metrics like supporter behavior, volunteer activity, and fundraising performance.  
* Voter Insights: Tools for analyzing voter data to identify trends, optimize messaging, and prioritize outreach efforts.

## Table-stakes features

* Accessibility and Affordability: GreenGrass offers a tiered pricing model, including a freemium plan and a no-credit-card-necessary trial period for smaller campaigns, making it accessible even for campaigns with minimal budgets.  
* Local Language Support: The platform supports multiple languages and local dialects, so people can use it in the language they actually speak.  
* Offline Functionality: Designed for areas with unreliable internet access, key features of GreenGrass can function offline and sync data when connectivity is restored.  
* Mobile-First Design: Most people worldwide get online on a phone, so the platform is optimized for mobile devices.

## High-level Architecture notes

GreenGrass is built using an Open Source model, except where security or technical concerns make that approach unworkable. It also employs a single-tenant architecture. That is, a single instance of the application and its supporting infrastructure is dedicated to serving each customer (or tenant). Each tenant operates in isolation, with its own database, application, and resources, ensuring complete separation from other tenants. While this approach complicates deployment and version control at a high level, single-tenant systems prioritize security, performance, and customization for individual users or organizations. 

## Implementation Plan

### Phase 0: Buy-in (3-6 months)

* Define and refine product proposal, feature set, initial road map, and proposed business models  
* Identify and onboard three to five alpha clients, who are interested in the product, and will commit to paying for an MVP once it’s ready.

### Phase 1: Product Development (10 Months)

* Finalize feature set and begin development of core components.  
* Conduct user testing with alpha clients, select campaigns and/or stakeholders to gather feedback and refine the product.

### Phase 2: Pilot Program (10 Months)

* Launch a pilot program with alpha clients and/or partner campaigns in three target countries, providing training and support.  
* Collect data on usage, performance, and user feedback to further improve the platform.

### Phase 3: Full Launch and Scaling (6 Months and beyond)

* Roll out the platform to a broader audience with a focus on countries in Africa, Latin America, and Southeast Asia.  
* Implement a local support network with partnerships to provide training and customer service in key regions.

## Possible Revenue Models

<!-- REVISIT: superseded by ADR-026. Pricing is now a lane rule: cost plus a commission in the political lane; cost plus a 30% margin plus a commission in the commercial lane. Whether the freemium plan below survives is open there. The list is left as written. -->

* Freemium Plan: Basic access to core features, allowing small campaigns to get started for free.  
* Subscription Tiers: Paid plans with additional features designed for mid-sized and large campaigns. Explicitly not a per-user, or other scale-based pricing model, although we should still think about some kind of scale-based revenue structure in order to manage growing operating costs.  
* Partnerships: Revenue from partnerships with NGOs, political training organizations, and advocacy groups who can license the platform for their networks.  
* Bespoke services: development of integrations, data query creation and analysis, data enrichment, custom report generation.