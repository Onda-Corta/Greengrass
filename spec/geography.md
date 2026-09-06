# Target Geography

## Rollout Sequence

| Phase | Country | Languages | Payment rails | Key considerations |
|-------|---------|-----------|--------------|-------------------|
| Alpha | Puerto Rico | Spanish, English | ATH Movil, Venmo, Zelle, credit cards (US financial system) | Founders' home base. US territory — US election law, FEC compliance. Bilingual. Good connectivity with rural gaps. Smallest, most controlled environment for initial validation. |
| Pilot 1 | Brazil | Portuguese | PIX (dominant), Boleto, credit cards | Largest Latin American democracy. Active grassroots movements. PIX is a dominant instant payment system requiring first-class integration. Good urban connectivity, variable rural. |
| Pilot 2 | Thailand | Thai | PromptPay, TrueMoney, bank transfer | Thai script support. Good mobile penetration. Complex political environment with history of military intervention — security tier features become relevant. |
| Pilot 3 | India | Hindi, English + regional languages | UPI (dominant), Paytm, PhonePe, bank transfer | Largest democracy. Massive scale stress test. Multi-language within a single deployment. Enormous voter files. Diverse regulatory landscape across states. UPI integration essential. |
| Pilot 4 | Lebanon | Arabic, French, English | Cash-heavy, OMT, bank transfers (banking system in crisis) | **RTL support required.** Three languages per deployment. Most demanding security context — aggressive tier features (duress mode, traffic analysis resistance) are practical necessities. Economic crisis affects payment infrastructure. Sectarian political system. |

## Language Support Roadmap

| Phase | Languages added | Script requirements |
|-------|----------------|-------------------|
| Alpha | Spanish, English | Latin (LTR) |
| Pilot 1 | Portuguese | Latin (LTR) |
| Pilot 2 | Thai | Thai script (LTR) |
| Pilot 3 | Hindi + regional languages (TBD) | Devanagari + others (LTR) |
| Pilot 4 | Arabic, French | Arabic script (**RTL**), Latin (LTR) |

**Architecture implication:** RTL support must be designed into the UI framework from the start, even if Arabic isn't needed until Pilot 4. Retrofitting RTL into a mature LTR UI is significantly more expensive than building bidirectional support from day one.

## Payment Integration Roadmap

| Phase | Payment systems | Type |
|-------|----------------|------|
| Alpha | Credit cards, ATH Movil, Venmo, Zelle | US financial system — well-documented APIs, familiar compliance |
| Pilot 1 | PIX, Boleto | Brazilian instant payment (Central Bank regulated), bank slip |
| Pilot 2 | PromptPay, TrueMoney | Thai instant payment, e-wallet |
| Pilot 3 | UPI, Paytm, PhonePe | Indian instant payment ecosystem (massive scale) |
| Pilot 4 | OMT, cash-heavy workflows | Money transfer service, emphasis on cash donation tracking due to banking crisis |

**Architecture implication:** The payment layer must be modular — a common interface with per-country payment adapters. Each country's payment landscape is fundamentally different. The fundraising workflow's cash donation tracking (decided in workflows.md) becomes critical for Lebanon.

## Compliance Roadmap

| Phase | Key compliance areas |
|-------|---------------------|
| Alpha | US/FEC election law, US data protection, Puerto Rico-specific regulations |
| Pilot 1 | Brazilian election law (TSE regulations), LGPD (Brazil's data protection law) |
| Pilot 2 | Thai election law, PDPA (Thailand's data protection act), political activity restrictions |
| Pilot 3 | Indian election law (ECI regulations), IT Act, state-level variations |
| Pilot 4 | Lebanese election law (sectarian representation rules), no comprehensive data protection law (as of 2024), complex multi-confessional legal system |

<!-- REVISIT: Each country needs a dedicated compliance assessment before pilot launch. This should be a separate compliance spec per country, developed with local legal counsel. -->

## Data Residency Implications

Per the security spec, data residency is per-country. This means GreenGrass needs hosting presence in or near:

| Phase | Hosting location needed |
|-------|----------------------|
| Alpha | US (Puerto Rico is US territory) |
| Pilot 1 | Brazil (LGPD has data localization preferences) |
| Pilot 2 | Thailand or Singapore (regional hub) |
| Pilot 3 | India (data localization requirements under discussion/implementation) |
| Pilot 4 | Lebanon or privacy-friendly European location (given banking/infrastructure instability) |

## Security Tier Relevance by Country

| Country | Expected security tier demand | Notes |
|---------|------------------------------|-------|
| Puerto Rico | Standard | Stable US political environment |
| Brazil | Standard to Enhanced | Political polarization, but generally stable institutions |
| Thailand | Enhanced to Aggressive | History of military coups, political repression, lèse-majesté laws |
| India | Enhanced to Aggressive | State surveillance capabilities, political pressure on opposition, scale of data |
| Lebanon | Aggressive | Sectarian tensions, multiple intelligence services, regional geopolitical pressures, Hezbollah/state actor considerations |

## Localization Strategy

**DECIDED:** AI-assisted with human review.

AI generates initial translations, local teams review and correct. The AI keeps cost and turnaround manageable across a wide language surface (Spanish, Portuguese, Thai, Hindi, Arabic, French, English); the local reviewers are what keep it accurate.

- AI-generated translations are flagged as drafts until a human reviewer approves them.
- Critical flows (security prompts, legal text, donation forms, consent language) require human sign-off before going live.
- Local campaign teams can contribute corrections and improvements through an in-platform review interface.
- Translation memory accumulates reviewed translations to improve consistency and reduce review burden over time.

**DECIDED:** Both UI and content localization.

**UI localization:** The platform interface (buttons, labels, navigation, system messages, error states) is translated into all supported languages.

**Content localization:** Campaign content — email templates, canvassing scripts, donation form text, event descriptions, action page copy — can be authored in multiple languages within a single campaign. The correct version is served based on:
- The recipient's language preference (stored on their platform identity)
- The volunteer's language setting (for field tools like canvassing scripts)
- The visitor's browser/device language (for public-facing pages, with manual override)

**Architecture implication:** Every content-authoring surface in the platform needs multi-language support — not as an afterthought, but as a core capability. Content objects store multiple language variants, and the AI-assisted translation pipeline (decided above) can help staff generate initial translations of their content across the org's configured languages.

<!-- REVISIT: The content localization data model (how multi-language variants are stored, versioned, and served) needs treatment in the architecture spec. Also, the AI-assisted translation could be offered as an in-platform tool for campaign content, not just for UI strings. -->
