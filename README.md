# GreenGrass

A platform for managing grassroots political elections in the global south.

GreenGrass combines a Constituent Relationship Manager (CRM), voter database, fundraising tools, communication suite, and data analytics into a single platform designed for resource-constrained environments, intermittent connectivity, multilingual populations, and decentralized organizing structures.

## Target Markets

Puerto Rico (alpha), Brazil, Thailand, India, and Lebanon — each with distinct electoral systems, languages, data protection laws, and infrastructure constraints.

## Project Status

**Current phase: Specification & Design (complete) — one review open before production**

All product specifications, UX design artifacts, and architecture documents are complete.

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

The site is bilingual. Available in Spanish: the 14 specification documents, the system
architecture, the 21 ADRs plus the UX decisions record, and the 15 UX documents
that aren't wireframes — 52 documents in
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

1. **[`spec/product.md`](spec/product.md)** — Start here. High-level product description, target users, core feature set.
2. **[`spec/mvp.md`](spec/mvp.md)** — MVP product plan: the coalition data trust, and the pilot designed to test the project's riskiest assumption.
3. **[`spec/users.md`](spec/users.md)** — User personas, roles, permissions model.
4. **[`spec/workflows.md`](spec/workflows.md)** — 12 core workflows: canvassing, voter registration, fundraising, events, communications, and more.
5. **[`spec/geography.md`](spec/geography.md)** — Target countries, localization strategy, rollout sequence.
6. **[`spec/security.md`](spec/security.md)** — Threat model, 5-tier security, encryption architecture, auth.
7. **[`spec/compliance.md`](spec/compliance.md)** — Election law, data protection, campaign finance across all 5 countries.
8. **[`spec/fundraising.md`](spec/fundraising.md)** — Payment processing, donation types, alliance fundraising, donor experience.
9. **[`spec/integrations.md`](spec/integrations.md)** — External systems: GIS/mapping, SMS, WhatsApp, telephony, observability.
10. **[`spec/support.md`](spec/support.md)** — Tenant support surface, onboarding wizards, knowledge base, concierge model.
11. **[`spec/gotv.md`](spec/gotv.md)** — Get Out The Vote and election day operations.
12. **[`spec/messaging.md`](spec/messaging.md)** — Internal communications, notifications, E2E encryption.
13. **[`spec/press.md`](spec/press.md)** — Press, media, social media, public profiles, endorsements.
14. **[`spec/comms-intelligence.md`](spec/comms-intelligence.md)** — Post-MVP roadmap: media intelligence, fact check, media map, candidate vetting and opposition research, sequenced as iterations.
15. **[`design/architecture/system.md`](design/architecture/system.md)** — System architecture, data model, infrastructure.
16. **[`design/ux/00-overview.md`](design/ux/00-overview.md)** — UX design overview with reading order for all 38 UX documents.
17. **[`decisions/`](decisions/)** — 21 Architecture Decision Records extracting and formalizing decisions from all spec and design documents.

## Project Structure

```
GreenGrass/
├── CLAUDE.md                      # Claude Code project instructions
├── .claude/
│   └── SKILLS.md                  # Project-specific Claude skills
├── spec/
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
│   └── 021-content-approval-pipeline.md  # Content pipeline, review in rounds
├── diary/                         # Project diary (15 entries)
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
