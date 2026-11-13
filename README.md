# GreenGrass

Shared infrastructure for organizations: a headless Core, and a catalogue of modules each client enables individually. It is sold through two lanes. **Greengrass** is the political product, for community movements, unions and political parties. **Basecamp** is the commercial product, for advertisers, PR professionals and agencies. Each client runs its own instance, with its own data and its own accounts.

This repository began as the specification of GreenGrass, a single platform for managing grassroots political elections in the global south: a CRM, voter database, fundraising tools, communication suite and data analytics, designed for resource-constrained environments, intermittent connectivity, multilingual populations and decentralized organizing structures. Most of the documents here still describe that product, and they now describe the political lane. "Greengrass" names that product; the infrastructure under both lanes does not yet have a name of its own. The change of direction is recorded in ADRs 022 to 027 and in [diary entry 17](diary/17-two-lanes.md).

## Target Markets

Puerto Rico (alpha), Brazil, Thailand, India, and Lebanon — each with distinct electoral systems, languages, data protection laws, and infrastructure constraints.

## Project Status

**Current phase: Specification & Design — reopened by a change of product direction; one review still gates production**

The product specifications, UX design artifacts and architecture documents were complete as of October 2026. In November 2026 the product direction changed, and six ADRs record it. Two are accepted and reverse earlier decisions. Four are proposed, and the documents they would change are amended only where something is already decided.

| ADR | What it covers | Status |
|---|---|---|
| [ADR-022](decisions/022-core-modules-and-lanes.md) | Core, modules and lanes | Proposed. Decided within it: the two lanes, the CRM in the Core, one module for fundraising and payments |
| [ADR-023](decisions/023-surfaces-chat-admin-field.md) | A headless Core with chat, admin and field surfaces | Proposed. Decided within it: the ADR-018 gate binds the whole Core, in both lanes |
| [ADR-024](decisions/024-event-bus-as-federation.md) | The event bus in place of the federation layer | Proposed. Decided within it: an association of agencies works exactly like an alliance of parties |
| [ADR-025](decisions/025-identity-per-client.md) | Identity per client | Accepted. Supersedes the shared platform identity service and multi-org membership |
| [ADR-026](decisions/026-two-lane-pricing.md) | Two-lane pricing | Accepted. Supersedes the flat subscription and "no margin on metered costs". The definitions the prices need are open |
| [ADR-027](decisions/027-third-party-crm-sync-and-connectors.md) | Third-party CRM sync and connectors | Proposed. Decided within it: NationBuilder sync, by CSV first |

See [diary entry 17](diary/17-two-lanes.md) for what changed, what was reversed and what is still open.

One question remains open and gates production rather than implementation. The corpus decided AI five times, feature by feature, and never asked what changes if AI agents operate throughout the product. The threat model, the compliance framework and the audit model contain effectively no treatment of a non-human actor. [ADR-018](decisions/018-ai-agent-posture.md) records this as the project's first `Proposed` decision: the five accepted AI features ship as specified, and anything with broader read scope, tool authority or autonomous action waits for the review. See [diary entry 12](diary/12-the-agent-question.md).

The first decision taken since that gate opened is [ADR-019](decisions/019-central-services-and-metered-billing.md): shared capabilities get a home as central services executed per tenant, and the flat pricing model gains a second plane that passes third-party costs through at cost, with no margin. It supplies mechanisms the ADR-018 review can use and resolves nothing that review must decide. See [diary entry 13](diary/13-services-a-la-carte.md). [ADR-020](decisions/020-central-service-line-up-and-builders.md) names the four central services (Capture, Analysis, Builders, channel transport) and sequences them into the comms intelligence roadmap: text builders are accepted, while image and video builders wait for the ADR-018 review. [ADR-021](decisions/021-content-approval-pipeline.md) generalizes post approval into a content pipeline reviewed in rounds, each round kept and every revision request commented; a creator program it first specified was withdrawn the same day, because GreenGrass is not a tool for managing content creators. ADR-018 itself now carries the board's per-tenant agent harness as the proposal under review, with proposed answers for cost, credential breadth, the human gate and compartmented data, and a worked example in which a candidate approves the day's posts over WhatsApp. It remains `Proposed`, and read scope is the question it most needs to settle. See [diary entry 14](diary/14-the-proposal-under-review.md) and [diary entry 15](diary/15-not-a-creator-tool.md).

## Documentation Website

All of this documentation is also published as a browsable website — a left-hand sidebar table of contents linking every document, full-text search, an on-page outline, and dark mode. The site is generated from the Markdown sources by a small custom static generator (Node + `markdown-it`) and styled with GreenGrass's own design tokens, so it loads no external frameworks, fonts, or CDNs.

```bash
npm run dev      # install deps if needed, build, and serve — one command
```

`npm run dev` (`scripts/dev.sh`) is the only command you need: it installs the
build tooling on first run, regenerates `docs/`, and serves it, printing the URL.
It picks the first free port from 8000 up, so several worktrees can preview at
once. `PORT=9000 npm run dev` pins a port; `npm run dev -- --build-only`
regenerates without serving. Ctrl-C stops the server.

The individual steps are still available if you want them:

```bash
npm install      # install the build tooling
npm run build    # generate the site into docs/
npm run serve    # serve docs/ on port 8000
```

### Languages

The site is bilingual. Available in Spanish: the 16 specification documents, the system
architecture, the 27 ADRs plus the UX decisions record, and the 15 UX documents
that aren't wireframes — 60 documents in
all. The 24 wireframe documents and the project diary are still English only. An
**EN / ES** switch sits in the top-right of the header on every page; pages that aren't
translated still show it, dimmed, pointing at the Spanish home page, so the Spanish
edition is reachable from anywhere rather than appearing only on the pages that happen
to have it.

Spanish sources live in `i18n/es/`, mirroring the English paths (`spec/product.md` →
`i18n/es/spec/product.md`) and building to `docs/es/`. `i18n/GLOSSARY.md` holds the
canonical Spanish terminology and is the reference for any further translation. Search
is scoped to the language you're reading.

The Markdown files remain the canonical source; `docs/` is the generated rendering. On push to `main`, a GitHub Actions workflow rebuilds the site and deploys it to GitHub Pages (enable once under **Settings → Pages → Source: GitHub Actions**).

## Working with This Project

This project is developed using [Claude Code](https://docs.anthropic.com/en/docs/claude-code). Claude Code reads `CLAUDE.md` at the project root for context and conventions.

### Getting started

1. Clone the repo
2. Open the project directory in Claude Code: `cd Greengrass && claude`
3. Claude will automatically read `CLAUDE.md` for project context

### Project-specific commands

The project defines custom skills in `.claude/SKILLS.md`:

- `/spec` — Draft or refine a specification document
- `/ux` — Create or iterate on a UX artifact
- `/arch` — Draft or refine an architecture document
- `/adr` — Record an Architecture Decision Record
- `/review` — Review a spec or design document for completeness and gaps

### Reading order

If you're new to the project, read the specs in this order:

1. **[`spec/pitch.md`](spec/pitch.md)** — Start here. Pre-MVP pitch: a campaign assistant on Telegram drafts the day's posts and the candidate, or a committee president, approves each one. Written to stand on its own, for candidacies.
2. **[`spec/demo.md`](spec/demo.md)** — Campaign Approval Demo Spec: the same demonstration in full, and how it sits against GreenGrass and ADR-018. Its code lives in the separate, private `Onda-Corta/campaign-agent-demo` repository, and it accepts nothing in ADR-018.
3. **[`spec/product.md`](spec/product.md)** — High-level product description, target users, core feature set.
4. **[`spec/mvp.md`](spec/mvp.md)** — MVP product plan: the coalition data trust, and the pilot designed to test the project's riskiest assumption.
5. **[`spec/users.md`](spec/users.md)** — User personas, roles, permissions model.
6. **[`spec/workflows.md`](spec/workflows.md)** — 12 core workflows: canvassing, voter registration, fundraising, events, communications, and more.
7. **[`spec/geography.md`](spec/geography.md)** — Target countries, localization strategy, rollout sequence.
8. **[`spec/security.md`](spec/security.md)** — Threat model, 5-tier security, encryption architecture, auth.
9. **[`spec/compliance.md`](spec/compliance.md)** — Election law, data protection, campaign finance across all 5 countries.
10. **[`spec/fundraising.md`](spec/fundraising.md)** — Payment processing, donation types, alliance fundraising, donor experience.
11. **[`spec/integrations.md`](spec/integrations.md)** — External systems: GIS/mapping, SMS, WhatsApp, telephony, observability.
12. **[`spec/support.md`](spec/support.md)** — Tenant support surface, onboarding wizards, knowledge base, concierge model.
13. **[`spec/gotv.md`](spec/gotv.md)** — Get Out The Vote and election day operations.
14. **[`spec/messaging.md`](spec/messaging.md)** — Internal communications, notifications, E2E encryption.
15. **[`spec/press.md`](spec/press.md)** — Press, media, social media, public profiles, endorsements.
16. **[`spec/comms-intelligence.md`](spec/comms-intelligence.md)** — Post-MVP roadmap: media intelligence, fact check, media map, candidate vetting and opposition research, sequenced as iterations.
17. **[`design/architecture/system.md`](design/architecture/system.md)** — System architecture, data model, infrastructure.
18. **[`design/ux/00-overview.md`](design/ux/00-overview.md)** — UX design overview with reading order for all 38 UX documents.
19. **[`decisions/`](decisions/)** — 27 Architecture Decision Records extracting and formalizing decisions from all spec and design documents. ADRs 022 to 027 record the November 2026 direction; read [ADR-022](decisions/022-core-modules-and-lanes.md) first.

## Project Structure

```
GreenGrass/
├── CLAUDE.md                      # Claude Code project instructions
├── .claude/
│   └── SKILLS.md                  # Project-specific Claude skills
├── spec/
│   ├── pitch.md                   # Pre-MVP pitch: standalone, for candidacies
│   ├── demo.md                    # Campaign Approval Demo Spec
│   ├── product.md                 # High-level product description
│   ├── mvp.md                     # MVP product plan and pilot design
│   ├── users.md                   # User personas and roles
│   ├── workflows.md               # Core workflows
│   ├── geography.md               # Target geography and localization
│   ├── security.md                # Security and threat model
│   ├── compliance.md              # Compliance and legal framework
│   ├── fundraising.md             # Fundraising and payments
│   ├── integrations.md            # External integrations
│   ├── support.md                 # Tenant support and onboarding
│   ├── gotv.md                    # GOTV and election day operations
│   ├── messaging.md               # Internal communications
│   ├── press.md                   # Press, media, public communications
│   └── comms-intelligence.md      # Post-MVP roadmap: comms intelligence
├── design/
│   ├── ux/                        # UX design artifacts
│   │   ├── 00-overview.md         # Reading order and glossary
│   │   ├── 01-information-architecture/  # Navigation, screens, personas, URLs
│   │   ├── 02-global-patterns/    # Offline, notifications, search, security UX
│   │   ├── 03-design-system/      # Foundations, theming, components, responsive
│   │   └── 04-wireframes/         # 22 wireframe documents (240 screens)
│   └── architecture/
│       └── system.md              # System architecture
├── decisions/                     # Architecture Decision Records (ADRs)
│   ├── 001-platform-architecture.md
│   ├── ...                        # 002-015: security, identity, data, offline, etc.
│   ├── 016-cross-cutting-resolutions.md  # Resolution of 89 open questions
│   ├── 017-sharing-contract-trust-model.md  # The contract as universal trust primitive
│   ├── 018-ai-agent-posture.md    # Proposed — AI agent review gates production
│   ├── 019-central-services-and-metered-billing.md  # Central services, metered pass-through at cost
│   ├── 020-central-service-line-up-and-builders.md  # Capture, Analysis, Builders, transport
│   ├── 021-content-approval-pipeline.md  # Content pipeline, review in rounds
│   ├── 022-core-modules-and-lanes.md  # Proposed — Core, modules, two lanes
│   ├── 023-surfaces-chat-admin-field.md  # Proposed — headless Core; chat, admin, field
│   ├── 024-event-bus-as-federation.md  # Proposed — the bus in place of the federation layer
│   ├── 025-identity-per-client.md  # Identity per client; supersedes platform identity
│   ├── 026-two-lane-pricing.md    # Pricing as a lane rule; supersedes flat and no-margin
│   └── 027-third-party-crm-sync-and-connectors.md  # Proposed — NationBuilder sync, connectors
├── diary/                         # Project diary (17 entries)
├── scripts/
│   ├── build.mjs                  # Documentation site generator
│   └── dev.sh                     # One-command local preview (install, build, serve)
├── site-assets/                   # Site styles + client-side scripts (search, nav)
├── docs/                          # Generated documentation website (GitHub Pages)
└── package.json                   # Build tooling (Node + markdown-it)
```

## Key Design Principles

- **Offline-first** — everything works without connectivity, syncs when connected
- **Sovereignty-first** — tenants own their data, BYOK encryption by default
- **Multilingual from day one** — RTL support, AI-assisted translation with human review
- **Security as a feature** — 5-tier threat model, E2E messaging, passkey auth
- **Compliance built in** — campaign finance rules, data protection, and consent are guardrails, not afterthoughts
