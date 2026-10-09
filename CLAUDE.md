# GreenGrass

## Project Overview

GreenGrass is a custom platform for managing grassroots political elections in the global south. It is designed around the realities of resource-constrained environments, intermittent connectivity, multilingual populations, and decentralized organizing structures.

## Project Phase

**Current phase: Specification & Design (complete) — one review open before production**

All spec and design work is done. One cross-cutting question is open and gates production: the corpus decided AI five times as bounded features and never asked what changes if AI agents operate throughout the product. `decisions/018-ai-agent-posture.md` is `Proposed` — the first non-accepted ADR — and lists what the review must resolve. Do not add agent-shaped capability (cross-feature read scope, tool authority, autonomous action, broad credentials) to the spec or to an implementation without resolving it first. `decisions/019-central-services-and-metered-billing.md` (accepted) adds central services, a service catalogue with per-tenant entitlements, and metered pass-through billing at cost with no margin; it supplies mechanisms ADR-018 can build on and does not resolve it. `decisions/020-central-service-line-up-and-builders.md` (accepted) names the four central services and accepts text builders only; image and video builders are proposed and cannot be enabled until ADR-018 is accepted. `decisions/021-content-approval-pipeline.md` (accepted) generalizes post approval into a content pipeline reviewed in rounds. GreenGrass is not a tool for managing content creators: a creator program ADR-021 first specified was withdrawn, so do not reintroduce creator rosters, tiers, dispatch to creators or a creator inbox. ADR-018 now carries the board's per-tenant agent harness and, as its worked example, a candidate approving the day's posts over WhatsApp, as the proposal under review. That section is a proposal, not a decision: do not treat anything in it as accepted.

`spec/demo.md` (Campaign Approval Demo Spec) documents a pre-MVP pitch: a working demonstration of that approval flow, run with real candidates holding the phone, built to open the door with candidacies and regional committees. It runs on Telegram as a stand-in; WhatsApp's business terms bar political parties, so the production channel is decided with each campaign. Its code lives in a separate private repository, `Onda-Corta/campaign-agent-demo`, never in this one. It is a pitch, not specified capability, and it accepts nothing in ADR-018. It stays on the prototyping side of the gate by holding no voter, donor or member records and publishing nothing; keep it there. Everything candidate-specific in the demo is folder data (one folder per principal, a candidate or a regional committee, plus two folder templates that visitors fill in by registering through one shared link), so the demo must never hard-code a candidate. Everything it generates is marked as demo output, and everything is deleted the same day. `spec/pitch.md` (Pre-MVP Pitch) describes the same demonstration standalone, for candidacies: no GreenGrass, ADR or architecture vocabulary. Keep it that way, and keep it consistent with `demo.md`.

Completed phases:
1. **Product definition** — 12 spec documents covering product, users, workflows, security, compliance, etc.
2. **UX design** — 38 documents: information architecture, global patterns, design system, 22 wireframes (240 screens)
3. **Architecture** — system architecture document, 21 ADRs (20 accepted, 1 proposed) formalizing all decisions

## Project Structure

```
GreenGrass/
├── CLAUDE.md                      # Project instructions (this file)
├── .claude/
│   └── SKILLS.md                  # Project-specific skills
├── i18n/                          # Translations
│   ├── GLOSSARY.md                # Canonical ES terminology (not published)
│   └── es/                        # Spanish mirror of the English tree
│       ├── README.md              # Spanish home page
│       ├── spec/                  # The 16 specs, in Spanish
│       ├── decisions/             # The 21 ADRs + ux-decisions, in Spanish
│       └── design/                # Architecture + the 15 non-wireframe UX docs
├── spec/                          # Product specifications (16 docs)
│   ├── pitch.md                   # Pre-MVP pitch: standalone, for candidacies
│   ├── demo.md                    # Campaign Approval Demo Spec
│   ├── product.md                 # High-level product description
│   ├── mvp.md                     # MVP product plan and pilot design
│   ├── users.md                   # User personas and roles
│   ├── workflows.md               # Core workflows and user journeys
│   ├── geography.md               # Target geography and localization
│   ├── security.md                # Security and threat model
│   ├── compliance.md              # Compliance and legal framework
│   ├── fundraising.md             # Fundraising and payments
│   ├── integrations.md            # External integrations
│   ├── support.md                 # Tenant support and onboarding
│   ├── gotv.md                    # GOTV and election day operations
│   ├── messaging.md               # Internal communications and notifications
│   ├── press.md                   # Press, media, and public communications
│   └── comms-intelligence.md      # Post-MVP roadmap: comms intelligence
├── design/
│   ├── ux/                        # UX design artifacts (38 docs)
│   │   ├── 00-overview.md         # Reading order and glossary
│   │   ├── 01-information-architecture/  # Navigation, screens, personas, URLs
│   │   ├── 02-global-patterns/    # Offline, notifications, search, security UX
│   │   ├── 03-design-system/      # Foundations, theming, components, responsive
│   │   └── 04-wireframes/         # 22 wireframe documents (240 screens)
│   └── architecture/
│       └── system.md              # System architecture and data model
├── decisions/                     # Architecture Decision Records (21 ADRs)
├── diary/                         # Project diary (15 entries)
├── scripts/build.mjs              # Documentation site generator (Node + markdown-it)
├── scripts/dev.sh                 # One-command local preview (install, build, serve)
├── site-assets/                   # Site styles + client-side scripts (search, nav)
└── docs/                          # Generated documentation website (GitHub Pages)
```

The Markdown sources are canonical. `docs/` is generated from them by `npm run build`
(see the README's "Documentation Website" section) and published to GitHub Pages.

## Translations

The site is bilingual. English sources live at the repo root; Spanish lives under
`i18n/es/`, mirroring the English path exactly (`spec/product.md` ->
`i18n/es/spec/product.md`) and building to `docs/es/`. An EN/ES switch in the site
header moves between them. Translated so far: the 16 specs, the system architecture,
the 21 ADRs plus `ux-decisions.md`, and the 15 non-wireframe UX documents. Still English only: the 24
wireframe documents under `design/ux/04-wireframes/` and the project diary — the
switch on those pages is styled as a fallback and goes to the Spanish home page.

- **`i18n/GLOSSARY.md` is binding.** It is the terminology contract for Spanish. Any
  recurring term should be there before it is used; add to it rather than improvising.
  Its third part covers architecture, ADR and design-system vocabulary, and its
  "Reglas resueltas" settle the things parallel translators otherwise each decide
  differently: screen names are looked up in the Spanish `screen-inventory.md` rather
  than coined, the persona codes (`OA CD FD FiD VC DM V TL C S`) stay English, ASCII
  boxes get re-padded rather than left ragged, and enum values inside data-model
  blocks are database strings even where the same word is prose one line above.
- **Do not fix the English while translating.** Where a document contradicts itself,
  translate the contradiction and mark it `REVISIT:` in *both* languages. A silent
  correction creates an EN/ES divergence that no structural check can catch.
- Adding a language means adding one entry to `LANGS` in `scripts/build.mjs` (its
  `srcPrefix`/`outPrefix` and UI strings) and creating `i18n/<code>/`. A language
  directory with no documents is skipped, so partial translations are safe to commit.
- **Structure is load-bearing.** A translation must mirror its English original
  heading for heading, in order, and start with an `# H1`; its filename and every
  directory in its path must stay byte-identical to the English. The sidebar ordering
  and the EN/ES switch both key on English names, and the anchor pass maps the Nth
  English heading to the Nth translated one.
- After adding or retranslating a file, run `node scripts/fix-es-anchors.mjs`, then
  `npm run build`. The anchor pass walks the whole `i18n/` tree, validates it before
  writing anything, and exits non-zero on a missing `# H1`, a heading-count mismatch,
  a translated filename or an unmappable anchor. `--report-only` prints the parity
  table without touching files. The build then validates every link and anchor and
  exits non-zero if any is unresolved.

## Conventions

- All spec documents are Markdown
- Use plain, direct language — avoid jargon where possible
- Design for offline-first, low-bandwidth, multilingual contexts
- Decisions are recorded as ADRs in `decisions/`
- Each spec document should be self-contained but cross-reference related docs
- The `docs/` website is generated — edit the Markdown sources, then run `npm run build` to regenerate it; never hand-edit files in `docs/`
- Cross-document references use heading anchors (`[users.md § Staff](users.md#staff)`), never line numbers — line numbers break silently on the next edit, anchors are checked by the build

## Notes

- The target context is grassroots political elections in the global south
- Key constraints: intermittent connectivity, low-end devices, multilingual users, decentralized organizations, security sensitivity
- The platform must be trustworthy and transparent — election integrity is paramount

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. Route only to skills in the session's available-skills list; answer directly for quick questions or small scoped edits.

Key routing rules:
- Product ideas/brainstorming → invoke /office-hours
- Strategy/scope → invoke /plan-ceo-review
- Architecture → invoke /plan-eng-review
- Design system/plan review → invoke /design-consultation or /plan-design-review
- Full review pipeline → invoke /autoplan
- Bugs/errors → invoke /investigate
- QA/testing site behavior → invoke /qa or /qa-only
- Code review/diff check → invoke /review
- Visual polish → invoke /design-review
- Ship/deploy/PR → invoke /ship or /land-and-deploy
- Save progress → invoke /context-save
- Resume context → invoke /context-restore
- Author a backlog-ready spec/issue → invoke /spec
