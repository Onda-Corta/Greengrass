# Project: GreenGrass

## *An Integrated Technology Platform for Grassroots Political Campaigns in the Global South*

## *by Pablo Defendini & Giovanni Collazo — 22 november 2024*

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

* Freemium Plan: Basic access to core features, allowing small campaigns to get started for free.  
* Subscription Tiers: Paid plans with additional features designed for mid-sized and large campaigns. Explicitly not a per-user, or other scale-based pricing model, although we should still think about some kind of scale-based revenue structure in order to manage growing operating costs.  
* Partnerships: Revenue from partnerships with NGOs, political training organizations, and advocacy groups who can license the platform for their networks.  
* Bespoke services: development of integrations, data query creation and analysis, data enrichment, custom report generation.