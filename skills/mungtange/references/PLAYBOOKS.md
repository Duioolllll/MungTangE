# Task playbooks — read only the matching subsection

These are practical details, not separate execution engines. For
quality thresholds use `QUALITY.md`; for art direction use `DESIGN.md`.
Follow the core skill's six lightweight gates.

## Landing page: persuade without invented proof

- Establish the real audience, offer and conversion event.
- Use a distinct visual thesis and useful page rhythm.
- Lead with clear value and a meaningful primary CTA.
- Claims, testimonials, logos and metrics require real evidence.
- Verify mobile navigation, CTA behavior, keyboard focus, contrast,
  page weight and form completion where tools exist.

## Application dashboard: enable repeated work

- Map user jobs, data ownership and permission boundaries.
- Prioritize information density, clarity, freshness and real units
  over decorative charts.
- Include empty, loading, error and stale-data cases.
- Ensure filters, sorting, tables and controls genuinely work.
- Check keyboard navigation, narrow tables and realistic large data.

## Design system: keep components coherent

- Separate primitives, semantic aliases and component-level tokens.
- Define ownership, typography, spacing, variants and interactive states.
- Demonstrate representative components with code and usage examples.
- Avoid raw-value drift and undocumented breaking changes.
- Validate accessibility and representative responsive screens.

## Reference screenshot or Figma: work from real source

- Inspect supplied source only if accessible; do not invent design nodes.
- Record original viewport, assets, typography and interaction assumptions.
- Preserve user goals and semantics while matching hierarchy and geometry.
- Compare source and render when real screenshots can be captured.
- State fidelity gaps and asset substitutions explicitly.

## Existing interface review: diagnose before modifying

- Audit only; do not edit files unless asked.
- Identify affected user journey and rank severity by impact.
- Report exact file:line when inspected, otherwise precise UI location.
- Distinguish observed behavior, plausible risk and subjective preference.
- For each finding give actionable reproduction and a concrete fix.

## UI redesign: preserve the product

- Identify existing workflows and constraints before touching layout.
- Separate visual changes from business logic and API behavior.
- Define one new direction plus one rejected alternative and why.
- Incrementally update tokens and shared components.
- Verify behavioral regressions, long content and non-happy states.
