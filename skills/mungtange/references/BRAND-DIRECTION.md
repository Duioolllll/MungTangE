# Brand-specific art direction for web products

> **Optional specialist reference.** Use for an important public landing page, design-direction exploration or brand-sensitive redesign. Do not load for routine CSS fixes. This is a method for producing decisions, not a promise of a premium result.

## 1. Classify the product BEFORE choosing visuals

Never use the same hero architecture for unrelated products.

| Product archetype | What the visitor must believe | Best immediate proof | Hero strategy | Conversion | Avoid |
| --- | --- | --- | --- | --- | --- |
| **Developer framework / SDK / runtime** | "I can understand, try and trust its technical contract" | Tiny executable code sample, package install, API, architecture, actual docs | Product thesis + real code/architecture on first screen | Install, quickstart, docs, repository | Generic employee stock photos, fake GitHub stars, unverified performance claims, empty dashboard mockup |
| **General B2B SaaS** | "This solves a measurable job for my team" | Real workflow screenshot, concrete use case, authorized customer evidence | Problem → outcome → product-in-action | Start trial, demo, signup | Showing only abstract architecture or overloading with implementation detail |
| **Open-source library** | "It fits my stack and I can inspect it" | API surface, minimal integration snippet, compatibility, license, maintenance transparency | Value proposition + exact import/use sample | Repository, docs, package manager | Corporate-looking inflated testimonials, fake adoption numbers |
| **Developer operations tool** | "It gives me control and observability" | Real output, diagnostics, workflow diff, command/console interaction | Operational problem + before/after workflow | Try CLI, documentation | Fictitious charts, unreadable terminal theatrics |
| **Consumer app** | "This fits my life and feels trustworthy" | Real experience and benefits, authentic human/device context | Outcome-driven story, real usage | Download, start | Dense code/architecture above the main value |

**Decision rule:** first answer **who has the problem, what evidence earns trust, what exactly can users try today, and what should happen after the CTA.** Product taxonomy is a hypothesis; inspect actual repository/documentation and adjust for the real customer.

## 2. Distinctive directions, not four palettes

For a major landing page, consider **2–4 materially different creative theses** (four is appropriate for exploratory briefs, not mandatory for small changes). Each direction MUST differ in at least three dimensions: narrative structure, hero composition, typographic personality, signature visual evidence, interaction rhythm, information density. Changing color alone is not a distinct direction.

A direction card contains:

- **Name + one-sentence concept:** product-specific, not a decorative buzzword.
- **Brand thesis:** "Because this product ___, the site should make users feel ___ by showing ___."
- **Hero composition:** precise content order and what occupies the visual focus (code, diagram, screenshot, editorial type).
- **Design grammar:** type pairings/weights, spacing ratio, color semantics, lines/shape, image treatment, motion purpose.
- **Real proof:** a source-grounded feature, code demo, documented limitation, API or benchmark with provenance.
- **CTA ladder:** primary next action and secondary high-intent reference.
- **Risk + anti-pattern:** why this could look generic, unreadable, heavy or misleading.
- **Production effort:** content/assets and interactions required; don't propose bespoke 3D if the project's budget/constraints cannot support it.

Choose by the user's priorities: clarity, audience fit, proof, brand ownability, accessibility, implementation cost. Avoid single-score theater: document **trade-offs** and why the selected direction wins for this project.

## 3. PyNext — grounded developer-framework example

This is a **brief template**, not a critique of screenshots we have not viewed.

**Confirmed from PyNext repository README at the time of this brief:** an experimental Python + Rust full-stack framework inspired by file-based routing; Python pages and APIs, Axum routing, SSR/SSG/ISR, CLI quickstart; not a Next.js/React-compatible implementation. The README warns against production/Internet exposure for sensitive workloads. Content and install commands MUST be checked against the target release before publishing.

**Brand words:** experimental; Python ergonomics; Rust engine; inspectable routes; builder-first; transparent boundaries.

**Possible primary CTA:** "View quickstart" / "Read documentation"; second CTA "View source". An install command may accompany the CTA only when checked against the current release. No "production ready" badge. No invented 2× faster, stars, logos, adoption counts or "Next.js drop-in" claim.

Four genuinely differentiated concepts:

| Direction | Hero idea | Visual language | Proof structure | Risk |
| --- | --- | --- | --- | --- |
| **Runtime Blueprint** | Left: precise Python route; right: flowing Python → Rust → response architecture, with labels sourced from docs | Blueprint grid used sparingly, restrained cobalt/ink, confident mono+humanist sans, crisp diagram edges | Route snippet → runtime diagram → first app in minutes (only if tested) | Overengineering the diagram and hiding the quickstart |
| **The Python Surface** | Center stage: actual minimal Python page, editorial headline "Write pages in Python. Route them with Rust." (verify scope) | White/ink paper feel, technical typography, generous measure, carefully colored code syntax | Install → real route → render → supported/deferred features | Looks too much like generic docs without a distinct signature detail |
| **Inside the Engine** | Split narrative around Rust Axum request handling and Python handler execution | Dark observability tone with real trace-style annotations; no fabricated terminal output | Real request lifecycle and constraints → runtime options → repo | Readability/contrast and a misleading "enterprise grade" impression |
| **Builder's Field Notes** | Experimental, engineering notebook aesthetic: real implementation trade-offs and examples | Editorial field notes, annotated snippets, tight hierarchy, warm monochrome with a single assertive signal color | Why it exists → what works today → honest limits → examples/docs | Too much text and insufficient first-screen product evidence |

The chosen brand system must remain visible across hero, code panels, section separators, buttons, docs teasers and responsive layouts. **A distinctive hero followed by stock SaaS cards is not a distinctive brand.**

## 4. Construct the release-ready first screen

For developer framework landing pages:

1. **Three-second recognition:** product name, what it is, how it differs. No ambiguous "future of development" headline.
2. **Five-second proof:** a syntax snippet or architecture visual that uses actual supported API names. Avoid decorative fake terminals.
3. **Trust:** alpha/experimental scope stated honestly, version/docs/GitHub links, limitations accessible.
4. **Action:** real quickstart/docs link and functional repository link; keyboard focus and mobile CTA.
5. **Follow-through:** visual language continues in at least one below-the-fold module with meaningful content.
6. **Non-visual constraints:** code is selectable, line wraps/scrolls gracefully, images have alt text, reduced motion works, animations do not obstruct reading.

**Visual microcraft prompts:** check consistent baseline and cap-height alignment; optical rather than merely mathematical CTA centering; paragraph measure; code window padding; icon stroke and code gutter consistency; spacing scale; clean transitions between hero and next section; clipping near breakpoints; legibility in Korean/English where relevant.

## 5. Handoff: decisions rather than adjective soup

When design direction matters, report the chosen direction and its concrete artifacts (hero wireframe, visual grammar, proof module, CTA), key rejection reasons, actual implementation paths and screenshot evidence **only if captured**.

No fixed count of design options or defects is a requirement. If a user has already chosen a direction, implement it rather than reopening exploration. For independent blind comparisons or measuring improvement, use the separate evals workflow if present; this prompt cannot create independent judges by itself.
