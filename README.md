# GreenGrass

A platform for managing grassroots political elections in the global south.

GreenGrass combines a Constituent Relationship Manager (CRM), voter database, fundraising tools, communication suite, and data analytics into a single platform designed for resource-constrained environments, intermittent connectivity, multilingual populations, and decentralized organizing structures.

## Target Markets

Puerto Rico (alpha), Brazil, Thailand, India, and Lebanon — each with distinct electoral systems, languages, data protection laws, and infrastructure constraints.

## Project Status

**Current phase: Specification & Design (complete)**

All product specifications, UX design artifacts, and architecture documents are complete. The project is ready to move into implementation.

## Documentation Website

All of this documentation is also published as a browsable website — a left-hand sidebar table of contents linking every document, full-text search, an on-page outline, and dark mode. The site is generated from the Markdown sources by a small custom static generator (Node + `markdown-it`) and styled with GreenGrass's own design tokens, so it loads no external frameworks, fonts, or CDNs.

```bash
npm install      # one-time: install the build tooling
npm run build    # generate the site into docs/
npm run serve    # preview at http://localhost:8000
```

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
14. **[`design/architecture/system.md`](design/architecture/system.md)** — System architecture, data model, infrastructure.
15. **[`design/ux/00-overview.md`](design/ux/00-overview.md)** — UX design overview with reading order for all 37 UX documents.
16. **[`decisions/`](decisions/)** — 16 Architecture Decision Records extracting and formalizing decisions from all spec and design documents.

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
│   └── press.md                   # Press, media, public communications
├── design/
│   ├── ux/                        # UX design artifacts
│   │   ├── 00-overview.md         # Reading order and glossary
│   │   ├── 01-information-architecture/  # Navigation, screens, personas, URLs
│   │   ├── 02-global-patterns/    # Offline, notifications, search, security UX
│   │   ├── 03-design-system/      # Foundations, theming, components, responsive
│   │   └── 04-wireframes/         # 21 wireframe documents (236 screens)
│   └── architecture/
│       └── system.md              # System architecture
├── decisions/                     # Architecture Decision Records (ADRs)
│   ├── 001-platform-architecture.md
│   ├── ...                        # 002-015: security, identity, data, offline, etc.
│   └── 016-cross-cutting-resolutions.md  # Resolution of 89 open questions
├── diary/                         # Project diary (9 entries)
├── scripts/
│   └── build.mjs                  # Documentation site generator
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
