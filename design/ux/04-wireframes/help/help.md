# Support & Help Wireframes

## Purpose

Help screens provide self-service support — searchable knowledge base, AI concierge, and structured training for volunteers. These screens exist to reduce support burden while ensuring every user (from tech-savvy Org Admins to first-time volunteers) can learn the platform independently.

The core UX challenge: help content must be role-filtered (a volunteer doesn't need articles about compliance configuration), multilingual (matching the tenant's configured languages), and partially offline (volunteers in low-connectivity areas need cached training materials). The AI concierge adds a conversational interface but must know its limits and escalate when appropriate.

## Scope

| ID | Screen | Personas | Offline | Mobile | URL |
|----|--------|----------|---------|--------|-----|
| HELP-001 | Knowledge Base Browser | All authenticated | No | Yes | `/help` |
| HELP-002 | Knowledge Base Article | All authenticated | Partial | Yes | `/help/[slug]` |
| HELP-003 | AI Concierge Chat | All authenticated | No | Yes | `/help/chat` |
| HELP-004 | Training Module List | V, TL (learner); VC (admin) | Partial | Primary | `/training` |
| HELP-005 | Training Module Content | V, TL | Partial | Primary | `/training/[moduleId]` |
| HELP-006 | Training Quiz | V, TL | Partial | Primary | `/training/[moduleId]/quiz` |
| HELP-007 | Certification Status | V, TL (learner); VC (admin) | No | Yes | `/training/certifications` |
| HELP-008 | Training Content Editor | OA, VC | No | Desktop | `/volunteers/training` |

## Help Navigation Context

```
Help (accessible from sidebar footer + user menu)
  Knowledge Base    → HELP-001
  AI Concierge      → HELP-003

Training (within Volunteer section of sidebar)
  My Training       → HELP-004 (volunteer view)
  Modules           → HELP-004 (admin view)
  Certifications    → HELP-007
  Content Editor    → HELP-008 (admin view)
```

---

## HELP-001: Knowledge Base Browser

Searchable, role-filtered knowledge base. The main entry point for self-service help.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Help Center                                                                 │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │  🔍 Search help articles...                                             ││
│  └──────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  ┌──────────────────────┐  ┌────────────────────────────────────────────────┐│
│  │ Categories           │  │                                                ││
│  │ ─────────────        │  │  Getting Started                               ││
│  │                      │  │  ──────────────────                            ││
│  │ ● Getting Started    │  │                                                ││
│  │   People & CRM       │  │  ┌────────────────────────────────────────────┐││
│  │   Field Operations   │  │  │ Setting up your organization               │││
│  │   Fundraising        │  │  │ Learn how to configure your org profile,   │││
│  │   Communications     │  │  │ invite staff, and set up your first...     │││
│  │   Events             │  │  │ 5 min read · Getting Started               │││
│  │   GOTV               │  │  └────────────────────────────────────────────┘││
│  │   Volunteers         │  │                                                ││
│  │   Alliance           │  │  ┌────────────────────────────────────────────┐││
│  │   Settings           │  │  │ Understanding roles and permissions        │││
│  │   Security           │  │  │ How role templates work, what each role    │││
│  │                      │  │  │ can access, and how to customize...        │││
│  │ ─────────────        │  │  │ 3 min read · Getting Started              │││
│  │                      │  │  └────────────────────────────────────────────┘││
│  │ Popular Articles     │  │                                                ││
│  │ ─────────────        │  │  ┌────────────────────────────────────────────┐││
│  │ · How to start a     │  │  │ Navigating the platform                   │││
│  │   canvassing shift   │  │  │ A tour of the sidebar, top bar, and how   │││
│  │ · Adding contacts    │  │  │ to find what you need in GreenGrass...     │││
│  │ · Setting up events  │  │  │ 4 min read · Getting Started              │││
│  │ · GOTV overview      │  │  └────────────────────────────────────────────┘││
│  │                      │  │                                                ││
│  └──────────────────────┘  │  [Show all 8 articles in Getting Started →]   ││
│                             │                                                ││
│                             └────────────────────────────────────────────────┘│
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │ Can't find what you need?  [Ask AI Concierge →]                         ││
│  └──────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Mobile

```
┌────────────────────────────┐
│  Help Center               │
├────────────────────────────┤
│                            │
│  ┌────────────────────────┐│
│  │ 🔍 Search articles...  ││
│  └────────────────────────┘│
│                            │
│  Categories                │
│  ┌────────────────────────┐│
│  │ Getting Started     →  ││
│  │ People & CRM        →  ││
│  │ Field Operations    →  ││
│  │ Fundraising         →  ││
│  │ Communications      →  ││
│  │ Events              →  ││
│  │ GOTV                →  ││
│  │ Volunteers          →  ││
│  └────────────────────────┘│
│                            │
│  Popular                   │
│  · How to start a shift    │
│  · Adding contacts         │
│  · Setting up events       │
│                            │
│  ─────────────────────     │
│  [Ask AI Concierge 💬]     │
│                            │
└────────────────────────────┘
```

### Interaction

- **Search**: full-text search across all articles. Results ranked by relevance, filtered by user's role
- **Role filtering**: articles tagged by persona. A Volunteer sees volunteer-relevant articles prioritized; admin articles are still accessible but lower in results
- **Categories**: match the sidebar structure (People, Field Ops, Fundraising, etc.) for intuitive mapping
- **Popular articles**: dynamically ranked by view count within the tenant
- **[Ask AI Concierge →]**: navigates to HELP-003

---

## HELP-002: Knowledge Base Article

Individual article view with formatted content.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ← Help Center                                         [Share] [Print]       │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────────────────┐  ┌────────────────────────────────────┐│
│  │                                  │  │ On This Page                       ││
│  │  Setting Up Your Organization    │  │ ──────────────                     ││
│  │  ══════════════════════════════  │  │                                    ││
│  │                                  │  │ · Before you begin                 ││
│  │  Getting Started · 5 min read    │  │ · Step 1: Org profile              ││
│  │  Last updated: Feb 15, 2026      │  │ · Step 2: Invite staff             ││
│  │  For: Org Admin                  │  │ · Step 3: Configure settings       ││
│  │                                  │  │ · Next steps                       ││
│  │  ────────────────────────────    │  │                                    ││
│  │                                  │  │ ─────────────────────              ││
│  │  ## Before You Begin             │  │                                    ││
│  │                                  │  │ Related Articles                   ││
│  │  Before setting up your org,     │  │ · Understanding roles              ││
│  │  make sure you have:             │  │ · Compliance configuration         ││
│  │                                  │  │ · Integration setup                ││
│  │  - Your organization's logo      │  │                                    ││
│  │  - Brand colors (hex codes)      │  │ ─────────────────────              ││
│  │  - List of staff to invite       │  │                                    ││
│  │                                  │  │ [Ask AI Concierge →]              ││
│  │  ## Step 1: Organization Profile │  │                                    ││
│  │                                  │  │                                    ││
│  │  Navigate to **Settings > Org    │  │                                    ││
│  │  Profile** (or click [here]).    │  │                                    ││
│  │                                  │  │                                    ││
│  │  [Screenshot of SET-001]         │  │                                    ││
│  │                                  │  │                                    ││
│  │  Fill in your organization       │  │                                    ││
│  │  name, upload your logo...       │  │                                    ││
│  │                                  │  │                                    ││
│  │  ...                             │  │                                    ││
│  │                                  │  │                                    ││
│  │  ────────────────────────────    │  │                                    ││
│  │                                  │  │                                    ││
│  │  Was this helpful?               │  │                                    ││
│  │  [👍 Yes]  [👎 No]              │  │                                    ││
│  │                                  │  │                                    ││
│  │  ← Previous Article              │  │                                    ││
│  │    Next Article →                │  │                                    ││
│  │                                  │  │                                    ││
│  └──────────────────────────────────┘  └────────────────────────────────────┘│
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Mobile

Single column — article content full-width. Table of contents as a collapsible header. Related articles at bottom.

### Interaction

- **Table of contents**: sticky sidebar (desktop) or collapsible top section (mobile). Click to jump to section
- **Formatted content**: headings, lists, code blocks, screenshots, inline links to platform screens
- **Related articles**: manually curated by content editors. Shown in sidebar (desktop) or at bottom (mobile)
- **Feedback**: "Was this helpful?" with thumbs up/down. Aggregated to identify articles needing improvement
- **Previous/Next**: sequential navigation within the category
- **Partial offline**: articles can be cached for offline reading. Cached articles show "Cached" badge. Images may not be available offline
- **[Share]**: copies article URL. [Print]: opens print-friendly view
- **Deep links**: articles can link directly to settings screens or features — "Navigate to Settings > Org Profile" is a clickable link

---

## HELP-003: AI Concierge Chat

Conversational AI assistant that answers platform questions, provides guidance, and knows the user's context.

### Desktop (Side Panel)

```
                                    ┌──────────────────────────────────┐
                                    │ AI Concierge                [×]  │
                                    ├──────────────────────────────────┤
                                    │                                  │
                                    │  👋 Hi Ana! I'm the GreenGrass  │
                                    │  assistant. Ask me anything      │
                                    │  about the platform.             │
                                    │                                  │
                                    │  ─────────────────────────────   │
                                    │                                  │
                                    │  You: How do I set up a          │
                                    │  canvassing campaign?            │
                                    │                                  │
                                    │  ─────────────────────────────   │
                                    │                                  │
                                    │  🤖 To set up a canvassing      │
                                    │  campaign:                       │
                                    │                                  │
                                    │  1. Go to **Field Operations     │
                                    │     > Canvassing** in the        │
                                    │     sidebar                      │
                                    │  2. Click **+ New Campaign**     │
                                    │  3. Fill in the campaign          │
                                    │     details (name, dates,        │
                                    │     script, target area)         │
                                    │                                  │
                                    │  📎 Related article:             │
                                    │  [Creating Your First            │
                                    │   Canvassing Campaign →]         │
                                    │                                  │
                                    │  Would you like help with        │
                                    │  any of these steps?             │
                                    │                                  │
                                    │  ─────────────────────────────   │
                                    │                                  │
                                    │  You: What fields are required   │
                                    │  for the script?                 │
                                    │                                  │
                                    │  ─────────────────────────────   │
                                    │                                  │
                                    │  🤖 The Script Builder requires: │
                                    │                                  │
                                    │  - **Introduction** (what the    │
                                    │    canvasser says at the door)   │
                                    │  - At least one **question**     │
                                    │    with response options         │
                                    │  - **Thank you** message         │
                                    │                                  │
                                    │  Optional:                       │
                                    │  - Follow-up questions           │
                                    │  - Score mapping                 │
                                    │  - Branching logic               │
                                    │                                  │
                                    │  [Open Script Builder →]         │
                                    │                                  │
                                    │  ┌──────────────────────────┐   │
                                    │  │ Ask a question...        │   │
                                    │  │                     [→]  │   │
                                    │  └──────────────────────────┘   │
                                    │                                  │
                                    └──────────────────────────────────┘
```

### Mobile (Full Screen)

```
┌────────────────────────────┐
│  ← AI Concierge            │
├────────────────────────────┤
│                            │
│  👋 Hi Ana! Ask me         │
│  anything about GreenGrass.│
│                            │
│  ──────────────────────    │
│                            │
│  You: How do I set up a    │
│  canvassing campaign?      │
│                            │
│  ──────────────────────    │
│                            │
│  🤖 To set up a canvassing │
│  campaign:                 │
│                            │
│  1. Go to Field Operations │
│     > Canvassing           │
│  2. Click + New Campaign   │
│  3. Fill in details...     │
│                            │
│  📎 [Creating Your First   │
│   Canvassing Campaign →]   │
│                            │
│  ──────────────────────    │
│                            │
│  ┌────────────────────────┐│
│  │ Ask a question...      ││
│  │                   [→]  ││
│  └────────────────────────┘│
│                            │
└────────────────────────────┘
```

### Interaction

- **Context-aware**: the concierge knows which screen the user is on and can provide screen-specific guidance
- **Article links**: responses include links to relevant knowledge base articles for deeper reading
- **Action links**: responses can include direct links to platform features ("Open Script Builder →")
- **Chat history**: persisted across sessions. User can continue a previous conversation
- **Escalation**: for questions the AI can't answer: "I'm not sure about that. Would you like me to create a support request?" (Premium tier only — standard tier shows "Contact your admin")
- **Desktop**: slides in as a right-side panel over the current content. [×] to dismiss
- **Mobile**: full-screen chat view, accessed from sidebar footer or help center
- **Role-aware**: responses adapted to the user's role. A volunteer asking about "campaigns" gets canvassing campaign guidance; an admin gets campaign creation guidance

---

## HELP-004: Training Module List

Training modules for volunteers (learner view) and module management for Volunteer Coordinators (admin view).

### Mobile — Volunteer View (Primary)

```
┌────────────────────────────┐
│  My Training                │
├────────────────────────────┤
│                            │
│  Required                  │
│  ──────────                │
│                            │
│  ┌────────────────────────┐│
│  │ 📋 Platform Basics     ││
│  │    4 lessons · 15 min  ││
│  │    ████████████░░ 75%  ││
│  │    [Continue →]        ││
│  └────────────────────────┘│
│                            │
│  ┌────────────────────────┐│
│  │ 🚪 Canvassing Training ││
│  │    6 lessons · 25 min  ││
│  │    ░░░░░░░░░░░░ Not    ││
│  │    started              ││
│  │    [Start →]           ││
│  └────────────────────────┘│
│                            │
│  ┌────────────────────────┐│
│  │ 🛡 Safety & De-escal.  ││
│  │    3 lessons · 10 min  ││
│  │    ████████████████ ✓  ││
│  │    Completed Mar 1     ││
│  └────────────────────────┘│
│                            │
│  Recommended               │
│  ────────────              │
│                            │
│  ┌────────────────────────┐│
│  │ 📞 Phone Banking Tips  ││
│  │    3 lessons · 12 min  ││
│  │    [Start →]           ││
│  └────────────────────────┘│
│                            │
└────────────────────────────┘
```

### Desktop — Admin View (Volunteer Coordinator)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Training Modules                                          [+ Create Module] │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │ Module               Lessons  Required   Completed   Avg Score        │  │
│  │ ────────────────────  ───────  ────────   ─────────   ─────────        │  │
│  │ Platform Basics       4        ☑         42/48 (88%) 92%              │  │
│  │ Canvassing Training   6        ☑         28/48 (58%) 87%              │  │
│  │ Safety & De-escal.    3        ☑         45/48 (94%) 95%              │  │
│  │ Phone Banking Tips    3        □          12/48 (25%) 89%              │  │
│  │ GOTV Orientation      4        □          0/48 (0%)   —               │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                      │
│  │ Total Modules│  │ Avg Complete │  │ Volunteers   │                      │
│  │ 5            │  │ 53%          │  │ 48           │                      │
│  └──────────────┘  └──────────────┘  └──────────────┘                      │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- **Volunteer view**: shows assigned modules split into Required (must complete before shifts) and Recommended. Progress bar and status for each
- **Admin view**: shows all modules with completion rates across all volunteers. Click module to edit (HELP-008) or view details
- **Offline caching**: modules marked for offline include a download indicator. Cached content available without connectivity
- **[Continue →]**: resumes the module at the last completed lesson
- **[Start →]**: begins from lesson 1

---

## HELP-005: Training Module Content

Individual training module — lessons with text, images, and video.

### Mobile (Primary)

```
┌────────────────────────────┐
│  ← Canvassing Training     │
│  Lesson 2 of 6             │
├────────────────────────────┤
│                            │
│  The Door Approach         │
│  ══════════════════        │
│                            │
│  When a voter opens the    │
│  door, you have about 10   │
│  seconds to make a good    │
│  impression. Here's how:   │
│                            │
│  1. Smile and introduce    │
│     yourself by first name │
│                            │
│  2. Say who you're with:   │
│     "I'm volunteering with │
│     Partido Verde"         │
│                            │
│  3. State your purpose:    │
│     "We're talking to      │
│     neighbors about the    │
│     upcoming election"     │
│                            │
│  ┌────────────────────────┐│
│  │                        ││
│  │   [Video: Door         ││
│  │    approach demo]      ││
│  │   ▶ 2:30               ││
│  │                        ││
│  └────────────────────────┘│
│                            │
│  Key Points                │
│  ──────────                │
│  · Be warm but brief       │
│  · Don't block the doorway │
│  · If they say "not        │
│    interested," thank them │
│    and move on             │
│                            │
│  ─────────────────────     │
│                            │
│  ┌────────────────────────┐│
│  │  ← Previous            ││
│  │       Next Lesson →    ││
│  └────────────────────────┘│
│                            │
│  ● ● ○ ○ ○ ○  (lesson     │
│                 progress)  │
│                            │
└────────────────────────────┘
```

### Interaction

- **Sequential**: lessons in order. Previous/Next navigation. Progress dots at bottom
- **Video**: play-on-demand (not autoplay). Supports subtitles in tenant languages
- **Completion tracking**: lesson marked complete when the user reaches the bottom (scroll-based) or clicks "Next"
- **Offline**: text and images cached. Videos may not be available offline (too large). Offline indicator: "Video available when connected"
- **Bookmarking**: user's progress saved — returning to the module resumes at the last position

---

## HELP-006: Training Quiz

Knowledge check after completing a training module.

### Mobile (Primary)

```
┌────────────────────────────┐
│  Quiz: Canvassing Training │
│  Question 3 of 5           │
├────────────────────────────┤
│                            │
│  A voter says "I'm not     │
│  interested." What should  │
│  you do?                   │
│                            │
│  ○ Explain why they should │
│    listen                  │
│                            │
│  ● Thank them and move to  │
│    the next door           │
│                            │
│  ○ Ask them why they're    │
│    not interested          │
│                            │
│  ○ Leave campaign          │
│    literature and leave    │
│                            │
│                            │
│  ┌────────────────────────┐│
│  │    Next Question →     ││
│  └────────────────────────┘│
│                            │
│  ● ● ● ○ ○  (progress)    │
│                            │
└────────────────────────────┘
```

### Results Screen

```
┌────────────────────────────┐
│                            │
│         ✓                  │
│                            │
│  Quiz Complete!            │
│                            │
│  Score: 4 / 5 (80%)        │
│  Pass threshold: 70%       │
│  Result: Passed ✓          │
│                            │
│  Question Review:          │
│  1. ✓  Introduction basics │
│  2. ✓  Door approach       │
│  3. ✓  Handling "not       │
│        interested"         │
│  4. ✕  Recording responses │
│  5. ✓  Safety protocols    │
│                            │
│  [View Correct Answers]    │
│                            │
│  ─────────────────────     │
│                            │
│  ┌────────────────────────┐│
│  │  Back to Training      ││
│  └────────────────────────┘│
│                            │
└────────────────────────────┘
```

### Interaction

- **Question types**: multiple choice, true/false, short-answer
- **One question at a time**: reduces cognitive load on mobile
- **Progress**: dots showing position in quiz
- **Pass/fail**: configurable threshold per module (default 70%). Failed quiz can be retaken
- **Review**: after submission, shows which questions were right/wrong with correct answers
- **Offline**: quiz can be taken offline. Results sync when connected
- **No time limit**: volunteers may have intermittent attention (between door knocks, etc.)

---

## HELP-007: Certification Status

Track training completion and certification status.

### Mobile — Volunteer View

```
┌────────────────────────────┐
│  My Certifications          │
├────────────────────────────┤
│                            │
│  ┌────────────────────────┐│
│  │ ✓ Platform Basics      ││
│  │   Completed Mar 1      ││
│  │   Score: 92%            ││
│  │   No expiration         ││
│  └────────────────────────┘│
│                            │
│  ┌────────────────────────┐│
│  │ ✓ Safety & De-escal.   ││
│  │   Completed Mar 1      ││
│  │   Score: 95%            ││
│  │   Expires: Mar 2027    ││
│  │   [Renew Early]        ││
│  └────────────────────────┘│
│                            │
│  ┌────────────────────────┐│
│  │ ◐ Canvassing Training  ││
│  │   In Progress (75%)    ││
│  │   [Continue →]         ││
│  └────────────────────────┘│
│                            │
│  ┌────────────────────────┐│
│  │ ○ GOTV Orientation     ││
│  │   Not Started           ││
│  │   [Start →]            ││
│  └────────────────────────┘│
│                            │
└────────────────────────────┘
```

### Desktop — Admin View (Volunteer Coordinator)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  Volunteer Certifications                                    [Export CSV]     │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  [Search...]   Module: [All ▾]   Status: [All ▾]                            │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │ Volunteer        Platform  Canvassing  Safety   Phone    GOTV        │  │
│  │ ──────────────   ────────  ──────────  ──────   ──────   ──────      │  │
│  │ Ana López        ✓ 92%    ✓ 87%       ✓ 95%    ✓ 89%    ○           │  │
│  │ Carlos Méndez    ✓ 88%    ◐ 50%       ✓ 90%    ○        ○           │  │
│  │ María Santos     ✓ 95%    ✓ 91%       ✓ 100%   ○        ○           │  │
│  │ Luis Torres      ✓ 78%    ○           ✓ 85%    ○        ○           │  │
│  │ Rosa Delgado     ◐ 25%    ○           ○        ○        ○           │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                      │
│  │ Fully Cert.  │  │ In Progress  │  │ Need Renewal │                      │
│  │ 3 of 48      │  │ 12           │  │ 2            │                      │
│  └──────────────┘  └──────────────┘  └──────────────┘                      │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Interaction

- **Volunteer view**: personal certification cards with status (✓ Completed, ◐ In Progress, ○ Not Started), score, expiration
- **Admin view**: cross-tab matrix showing all volunteers × all modules. Quick scan for certification gaps
- **Expiration**: some certifications expire (e.g., safety training). [Renew Early] opens the module for retake
- **Renewal reminders**: system sends notification 30 days before expiration
- **[Export CSV]**: admin can export certification data for compliance or reporting

---

## HELP-008: Training Content Editor

Admin screen for creating and editing training modules.

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ← Training Modules            Edit: Canvassing Training                     │
│                                                 [Save Draft]  [Publish]      │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─ Module Settings ───────────────────────────────────────────────────────┐ │
│  │                                                                        │ │
│  │  Title *                              Required?                        │ │
│  │  ┌────────────────────────────┐      ☑ Yes                            │ │
│  │  │ Canvassing Training        │                                        │ │
│  │  └────────────────────────────┘      Pass Threshold                   │ │
│  │                                       [70 ▾] %                         │ │
│  │  Description                                                           │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐  │ │
│  │  │ Essential training for door-to-door canvassing volunteers...    │  │ │
│  │  └──────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                        │ │
│  │  Certification Expiry: [12 months ▾]  (○ No expiry)                   │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌─ Lessons ───────────────────────────────────────────────────────── [+] ┐ │
│  │                                                                        │ │
│  │  1. Introduction to Canvassing                           [Edit] [×]   │ │
│  │  2. The Door Approach                                    [Edit] [×]   │ │
│  │  3. Recording Responses                                  [Edit] [×]   │ │
│  │  4. Handling Difficult Situations                        [Edit] [×]   │ │
│  │  5. Safety Protocols                                     [Edit] [×]   │ │
│  │  6. Wrap-Up & Next Steps                                 [Edit] [×]   │ │
│  │                                                                        │ │
│  │  [+ Add Lesson]      Drag to reorder                                  │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌─ Quiz Questions ────────────────────────────────────────────────── [+] ┐ │
│  │                                                                        │ │
│  │  1. Multiple Choice: "What should you say when...?"      [Edit] [×]   │ │
│  │  2. True/False: "You should block the doorway..."        [Edit] [×]   │ │
│  │  3. Multiple Choice: "A voter says 'not interested'..."  [Edit] [×]   │ │
│  │  4. Multiple Choice: "How do you record a response..."   [Edit] [×]   │ │
│  │  5. Multiple Choice: "If you feel unsafe, you should..." [Edit] [×]   │ │
│  │                                                                        │ │
│  │  [+ Add Question]                                                      │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌─ Assignment ────────────────────────────────────────────────────────────┐ │
│  │                                                                        │ │
│  │  Assign to:                                                            │ │
│  │  ● All volunteers                                                     │ │
│  │  ○ Specific volunteers (select from list)                              │ │
│  │  ○ Volunteers in specific roles (Team Lead, etc.)                      │ │
│  │                                                                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────   │
│  [Preview Module]                           [Save Draft]  [Publish]          │
│                                                                              │
│  Version 3 · Last edited by María Santos, Mar 2, 2026                       │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Lesson Editor (on [Edit] click — modal or side panel)

Rich text editor with: headings, bold/italic, lists, images (upload), video embeds (URL), callout boxes (tip/warning). Content authored in the org's primary language. Translation support for additional languages (separate editing pass per language).

### Interaction

- **Lesson ordering**: drag-to-reorder. Sequence determines learner progression
- **Quiz question editor**: question text, answer options, correct answer indicator, optional explanation
- **Assignment**: who must take this module. "All volunteers" is default. Can restrict to specific roles or individuals
- **[Preview Module]**: opens the module as a volunteer would see it (HELP-005 view)
- **Versioning**: version history with diff. Allows rollback to previous versions
- **Save Draft vs Publish**: draft is only visible to admins. Publish makes it available to assigned volunteers

---

## Empty States Summary

| Screen | Empty Message | Action |
|--------|--------------|--------|
| HELP-001 (no articles) | Help articles are being prepared. In the meantime, try the AI Concierge for answers. | [Ask AI Concierge →] |
| HELP-001 (no search results) | No articles match your search. Try different keywords or ask the AI Concierge. | [Ask AI Concierge →] |
| HELP-004 Volunteer (no training) | No training modules have been assigned to you yet. | — |
| HELP-004 Admin (no modules) | Create training modules to onboard and certify your volunteers. | + Create Module |
| HELP-007 Admin (no volunteers) | Certification tracking will appear once volunteers start training modules. | — |

---

## Accessibility Notes

- Knowledge base articles use proper heading hierarchy (h2, h3, h4) for screen reader navigation
- AI concierge chat supports keyboard-only interaction
- Training video includes subtitles in tenant languages
- Quiz questions use proper radio button groups with clear labels
- Progress indicators use both visual (dots/bars) and text (Lesson 2 of 6)
- Certification status uses text alongside icons (✓ Completed, ◐ In Progress, ○ Not Started)

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Role-filtered help content | Articles tagged by persona, prioritized in search | A volunteer searching "campaign" needs canvassing help, not campaign compliance settings. Role filtering reduces noise |
| AI concierge as side panel (desktop) | Overlays current screen, not a separate page | User can reference the current screen while asking questions. Context preservation is key |
| Training modules with offline caching | Text/images cached, video online-only | Volunteers may take training in low-connectivity areas. Video is too large to cache reliably, but text content must be available |
| Quiz as separate step (not inline) | Dedicated quiz screen after completing lessons | Clear separation between learning and assessment. Prevents users from just scrolling to the quiz without reading content |
| Certification expiration | Configurable per module (optional) | Safety training should be renewed periodically. Platform basics don't need renewal. Each org decides which is which |
| Feedback on articles | Simple thumbs up/down | Low-friction feedback signal. Detailed feedback would require too much effort from users who are already stuck |

## Open Questions

1. **AI concierge language** — should the concierge respond in the user's configured language, or should it detect the language of the question? Multilingual users may ask in one language and expect responses in another
2. **Training completion gating** — should volunteers be blocked from starting shifts until required training is complete? Or should it be advisory only? Blocking improves training compliance but may prevent understaffed campaigns from operating
3. **External content** — should the knowledge base support linking to external resources (YouTube videos, partner org guides) or should all content be authored within GreenGrass? External links risk broken links and content drift
4. **Concierge hallucination** — how do we prevent the AI concierge from giving incorrect guidance? Should responses be grounded only in knowledge base articles, or should it also reason about the platform's general structure?
