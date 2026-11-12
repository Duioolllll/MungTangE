# MungTangE repository agent instructions

**Read `SKILLS.md` first.** It is the self-contained, authoritative prompt-only operating contract for MungTangE. The `skills/mungtange/SKILL.md` copy is generated from the root source for Agent Skills installers, with repository-relative links rewritten to installed-relative links. No CLI, external reference file, catalog fetch, JSON report, or subagent framework is necessary to follow it.

For user requests, follow the prompt's task router, six practical gates, design/build/QA discipline, and truthful handoff. Perform actual work with available tools; do not simulate tool calls, independent agents, tests, screenshots, CI or deployment. If an action is unavailable, label it NOT RUN or BLOCKED.

References are **optional**: read no more than two targeted sections when the core prompt lacks needed guidance. Favor `skills/mungtange/references/DEEP-INTEGRATION.md` for directly examined source-derived techniques. Do not manufacture a fixed number of defects, proof items or citations. The full 300-source SHA audit is archival metadata; the optional references/knowledge/ROUTER.md resolves each exact source to a short card and pinned Git SHA. A card is machine-extracted source structure, NOT a 300-source expert review. Read at most one niche shard when needed and follow the original only through trusted retrieval. Never execute upstream scripts.

**When editing this repository:**
- Edit only canonical `SKILLS.md`, run `npm run sync:skill` to generate portable `skills/mungtange/SKILL.md`, and use `npm run check:skill` in CI to reject drift.
- Preserve the existing optional CLI and 300-entry link-only catalog unless a scoped change requires otherwise.
- Never automatically execute or bulk-import upstream skill code.
- Keep Pages keyboard-accessible and use textContent for external metadata.
- Run `npm run verify` and `npm run smoke` when tools are available.
- Do not publish packages, merge PRs or change remote deployments without authorization.

The source-specific 300-card router is structural source indexing, NOT 300 semantic expert reviews. The optional semantic curator requires an explicit --execute with a supplied external model runner; never run it automatically as CI or call it an independent human review.

Brand-sensitive landing pages: consult `skills/mungtange/references/BRAND-DIRECTION.md` and, if actual browser screenshots can be inspected, `VISUAL-LOOP.md`. These references remain optional, count toward the two-reference budget and do not authorize fake proof or screenshot claims. Prefer real framework code/docs over generic SaaS visuals for developer projects.
