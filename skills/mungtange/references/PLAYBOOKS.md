# Task-specific playbooks

> **Optional**: Read only for the matching task. Examples below are suggestions, not mandatory outputs. Do not add fictitious states, test runs, design options or issue counts merely to satisfy a list. Detailed, directly examined source techniques live in [DEEP-INTEGRATION.md](DEEP-INTEGRATION.md).

## Landing page (persuade)

- Identify archetype: developer framework/library landing is **not** the same as B2B SaaS. For framework sites, lead with actual syntax and architecture; for SaaS, lead with real workflow and customer outcome. See [BRAND-DIRECTION.md](BRAND-DIRECTION.md) only when brand-sensitive.
- Gather target audience, offer, evidence, desired conversion, truthful copy.
- For an open-ended premium landing, generate **exactly 3 different design directions**, compare on product fit, credible proof, distinctiveness, accessibility and cost, then select a justified winner. Do not force competition for user-selected layouts.
- Translate winner into Brand DNA: typography roles, semantic color tokens, signature motif, distinctive section layout and truthful CTA.
- Hero should communicate real value; CTA labels answer "what happens?"
- Avoid fake testimonials, logos, growth numbers and placeholder proof.
- When screenshot/browser tools exist, inspect the real hero and next section at mobile/tablet/desktop. Apply [VISUAL-LOOP.md](VISUAL-LOOP.md) only for meaningful observed gaps at **1440 / 768 / 390px**; don't fabricate a quality score.
- Validate mobile CTA, LCP, focus, text contrast and form completion.
- Relevant references: Anthropic frontend-design, Impeccable, Owl design-qa.

## Application dashboard (operate)

- Map core workflow, information density, permissions, error/freshness state.
- Prefer efficient repeated use over decorative novelty.
- Design real empty/loading/error/offline and date/number formatting.
- Test table scrolling, keyboard, search, filters and actual data ranges.
- React stack: inspect relevant Vercel react-best-practices guidance.

## Design system (system)

- Separate global primitives, semantic aliases, component tokens.
- Define component variants, interaction contract and theming.
- Decide token ownership and migration; never hardcode raw values everywhere.
- Ship docs that engineers can follow, not just token JSON.
- Validate 2–3 representative components across light/dark and breakpoints.

## Figma to code (reference-to-code)

- Confirm access to exact design node/context (never fabricate Figma IDs).
- Extract layout, colors, components, typographic metrics and assets.
- Preserve semantics and runtime behavior even if Figma lacks that detail.
- Compare screenshots, then document measured deltas and remaining gaps.
- If Figma tools unavailable, ask for supplied exports/screenshots or
  label the implementation "approximation", not pixel-perfect.

## Existing interface audit

- Read source code and product context; capture baseline if available.
- Identify severity, impact, precise file/line and reproducible fix.
- Use keyboard, contrast, overflow, responsive and reduced-motion tests.
- Do not change files in an audit-only task unless explicitly requested.
- Distinguish "suggested" from "verified" fixes.

## Multi-agent implementation

- Brief -> spec -> task DAG -> worktree ownership -> integration -> independent QA.
- Maximum concurrent code writers determined by independent file ownership.
- Every task: objective, files owned, boundary/interface, dependencies, tests,
  evidence and stop conditions. No reviewer should silently approve own work.
- A critical path determines sequence; separate research work can parallelize.
- Integrator alone creates the final release candidate, after all gates.
