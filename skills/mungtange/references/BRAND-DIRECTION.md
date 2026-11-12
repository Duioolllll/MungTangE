# Design Direction Competition + Brand Identity Engine

> Optional two-in-one guide for a major landing page or meaningful rebrand. For a tiny CSS fix or when the user has already chosen a direction, skip the competition. No automatically invented research, screenshots, benchmarks or quality scores.

## 1. Identify the product's trust mechanism

| Product | What users need to believe | First-screen evidence | Real primary action | Avoid |
| --- | --- | --- | --- | --- |
| **Developer framework / SDK / runtime** | I understand the actual API and can try it | True executable code, supported routing, architecture and limitations | Quickstart/docs/source | Generic SaaS mockup, fake star counts, speed claims |
| **Open-source library** | It fits my stack, is inspectable | Real import/use example, compatibility and license | Docs/repository | Fake usage metrics |
| **Developer operations tool** | It improves control and diagnosis | Real commands, output and workflow | Docs/CLI | Decorative fake logs |
| **B2B SaaS** | It solves a concrete business task | Real workflow and permissioned evidence | Demo/trial | Architecture as the only value proposition |
| **Consumer app** | It fits my context | Real usage and trustworthy benefit | Start/download | Developer syntax replacing the actual experience |

Before aesthetic work, identify target user, category, promise, source-backed proof, intended conversion, supported constraints and prohibited claims.

## 2. Design Direction Competition — THREE, not three color palettes

For an open-ended brand-sensitive landing, create **exactly three direction cards from one shared brief**. All three must differ in at least **three** meaningful dimensions: information narrative, hero composition, typographic voice, product-derived motif, proof placement and interaction rhythm. **Narrative or hero composition must differ in every pair.** Palette-only options are rejected.

Every direction card specifies:
- **Name / thesis:** "Because the product ___, the page should feel ___, shown by ___."
- **Narrative:** first three seconds, next five seconds, below-the-fold sequence.
- **Hero composition:** layout geometry, text/code/image placement, reading order and CTA.
- **Type:** display, body, code roles, scale and license-safe fallbacks.
- **Brand motif:** a repeatable visual structure derived from true product architecture/user workflow.
- **Proof / conversion:** real evidence with provenance and functioning primary/secondary CTAs.
- **Interaction / responsive:** motion purpose, reduced-motion fallback and how it recomposes at 390px.
- **Risk / effort:** trade-off against readability, accessibility, performance and maintenance.

### Selection: comparative evidence, not beauty adjectives

Make a compact side-by-side table of **product fit, credibility/proof, distinctiveness, legibility/a11y and implementation cost**. For each direction say High/Medium/Low and **why** using actual project constraints. These are reasoned judgments, not measured benchmark scores. Reject directions dependent on unsupported claims or accessibility barriers before selecting. **Choose one** and identify at least one strength of each rejected direction. If the user requests actual rendered concepts, render them when tools are available; otherwise direction cards are not screenshots.

The optional validator `node scripts/brand-competition.mjs validate --file example.json` checks structured proposals for three entries, required Brand DNA and pairwise meaningful differences. It cannot rank visual aesthetics.

## 3. Brand Identity Engine — ownable typography and visual grammar

Translate the chosen direction into a reusable **Brand DNA contract**, not just a CSS palette.

| Layer | Design decision | How to verify consistency |
| --- | --- | --- |
| Identity thesis | Product truth + intended audience feeling + concrete distinguishing proof | Hero and docs/navigation agree with the claim |
| **Typography fingerprint** | Licensed/available display, body and code stacks; type scale, weight and letter spacing | Long mobile headline and selectable code legible; no unsupported font dependencies |
| Semantic colors | Ink, paper, muted, action, focus, error; contrast measured in browser when available | Same meaning in buttons, syntax, diagrams and navigation |
| **Signature visual motif** | Geometry extracted from actual API/routes/workflow, not random glows | Reused meaningfully in hero and at least one lower section |
| **Layout grammar** | Max content measure, spacing rhythm, editorial alignment, asymmetric grids, responsive reflow | 1440/768/390 adaptation changes composition, not tiny text |
| Product evidence | Real code, screenshots, documented flow and limitations | Examples and labels agree with current source/version |
| Interaction language | Focus/hover/motion with clear purpose and reduced-motion | Works via keyboard without animations |
| Anti-template constraints | Three clichés to avoid for this brand | No interchangeable gradient/card/stock imagery |

**Output for implementation:** short token sheet/CSS custom properties, hero + proof component contract, motif reuse rules and breakpoint changes. A JSON file is optional, **not needed** for a simple prompt task. Do not choose Google Fonts blindly; inspect existing assets and font licensing, use fallback stacks.

**Ownability test:** if changing the logo would make the page plausible for five unrelated SaaS products, the identity needs more product-specific evidence or motif. A unique hero followed by generic feature cards is **not** a completed identity system.

## 4. PyNext example — three actual competing strategies

Project context sourced from its repository README at the time of authoring: PyNext is an **experimental Python + Rust** full-stack web framework with file-based routing, Python pages/APIs, Axum routing and SSR/SSG/ISR work. It is **not Next.js/React-compatible**. Its README warns against sensitive public production deployment. Reverify API, install command and version before publication.

| Finalist | Narrative / hero geometry | Distinct type, motif, proof | Weak point |
| --- | --- | --- | --- |
| **A — Runtime Blueprint** | Authentic Python code **left**, documented route/runtime flow **right**, concise thesis above both | Technical humanist sans + monospace; drawn route-path motif; real Python handler → documented runtime diagram | Visual diagram can overwhelm clarity or overpromise |
| **B — The Python Surface** | Editorial headline + **large executable Python page**, one-column docs-first hero | Airy sans, massive code hierarchy, syntax color; actual minimal page → quickstart | Resembles generic documentation |
| **C — Builder's Field Notes** | Engineering notebook: what works now → trade-offs → example/limitations | Warm editorial type, margins/annotations, capability status as motif; verified feature/limitation notes | Dense content and delayed CTA |

**Illustrative winner: A — Runtime Blueprint.** Its product-specific Rust/Python relationship can be turned into a repeatable architecture-derived visual identity, while genuine Python code grounds the promise. B is strongest for readability and speed to implement; C best for radical transparency. A is a **design hypothesis**, not a visually tested winner. If the diagram cannot be sourced accurately, choose B.

**PyNext Brand DNA proposal (not a measured site):** restrained ink/paper with a single route-blue accent; strong humanist system sans + readable system monospace; a real file-route/handler motif with correct architectural labels; asymmetrical hero and connected code/doc sections; at 390px headline → CTA → readable scrolling code → architecture; real docs/source links; reduced-motion support. **Never** claim enterprise-ready, Next.js drop-in compatibility or invented 2× performance.

## 5. Handoff and critic loop

Report winner + rejected strengths + actual Brand DNA + implemented paths. For screenshot-supported release review use [VISUAL-LOOP.md](VISUAL-LOOP.md) at **1440, 768, 390 px**; do not claim a design was reviewed unless its screenshots were actually viewed. A user-selected direction overrides this competition.
