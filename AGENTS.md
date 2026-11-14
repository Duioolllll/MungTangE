# MungTangE repository agent instructions

**Read `SKILLS.md` first.** It is the self-contained, authoritative prompt-only operating contract for MungTangE. The `skills/mungtange/SKILL.md` copy is generated from the root source for Agent Skills installers, with repository-relative links rewritten to installed-relative links. No CLI, external reference file, catalog fetch, JSON report, or subagent framework is necessary to follow it.

For user requests, follow the prompt's task router, six practical gates, design/build/QA discipline, and truthful handoff. Perform actual work with available tools; do not simulate tool calls, independent agents, tests, screenshots, CI or deployment. If an action is unavailable, label it NOT RUN or BLOCKED.

References are **optional**: read no more than two targeted sections when the core prompt lacks needed guidance. Favor `skills/mungtange/references/DEEP-INTEGRATION.md` for directly examined source-derived techniques. Do not manufacture a fixed number of defects, proof items or citations. The full 300-source SHA audit is archival metadata; the optional references/knowledge/ROUTER.md resolves each exact source to a short card and pinned Git SHA. A card is machine-extracted source structure, NOT a 300-source expert review. Read at most one niche shard when needed and follow the original only through trusted retrieval. Never execute upstream scripts.

**When editing this repository:**
- Edit only canonical `SKILLS.md`, run `npm run sync:skill` to generate portable `skills/mungtange/SKILL.md`, and use `npm run check:skill` in CI to reject drift.
- The legacy Node CLI, src/ and bin/ are retired; do not reintroduce them. Preserve the standalone 300-entry research catalog and source-card router.
- Never automatically execute or bulk-import upstream skill code.
- Keep Pages keyboard-accessible and use textContent for external metadata.
- Run `npm run verify`, `npm run brand:validate` and the optional Chromium visual smoke where available; no Node CLI smoke command exists.
- Do not publish packages, merge PRs or change remote deployments without authorization.

The source-specific 300-card router is structural source indexing, NOT 300 semantic expert reviews. The optional semantic curator requires an explicit --execute with a supplied external model runner; never run it automatically as CI or call it an independent human review.

Brand-sensitive landing pages: consult `skills/mungtange/references/BRAND-DIRECTION.md` and, if actual browser screenshots can be inspected, `VISUAL-LOOP.md`. These references remain optional, count toward the two-reference budget and do not authorize fake proof or screenshot claims. Prefer real framework code/docs over generic SaaS visuals for developer projects.

For open-ended premium landing designs, apply a 3-way narrative/hero/proof competition and project-derived Brand DNA before implementation. The Visual Critic Loop captures 1440, 768 and 390 pixels; actual screenshots must be viewed for subjective findings. Keep references optional and honor the two-reference limit.

## Identity integrity and mobile readability

For a personal brand, inspect first-party writing/projects before choosing a visual style. Ground 3 concrete identity signals in actual sources; map them into voice, content order, motif and at least two page sections. Run the owner-swap test and record two substantive elements that would be wrong for a different developer. If those cannot be established without inventing biography, label the work PROVISIONAL. When three rendered designs are requested, build three real previews, not just three JSON ideas. Inspect 1440/768/390 screenshots; warn on small mobile metadata and review legibility in the image, including 200% zoom where possible. Browser overflow PASS is never equivalent to readable typography.

Repository-only optional `scripts/*` tools are **not bundled** by `npx skills add`. Never claim an installed-only agent can call those scripts unless the full repository is available.

## Opt-in 3D and motion source bank

Only activate the 3D/motion workflow for an explicit motion/spatial request or demonstrably necessary product interaction. Consult `skills/mungtange/references/MOTION-3D.md` as a targeted reference (counts within the existing two-reference limit). Never import all 100 sources into context; the SHA-pinned `references/motion/ROUTER.md` is an optional index of 100 original files read and structurally inspected, **not** 100 expert reviews or licensed source code. For a selected source technique retrieve its exact original, check current APIs and license, and never automatically run scripts from it.

Brand identity must dictate scene geometry/story/timing, not generic particle decoration. Preserve semantic DOM and static/reduced-motion fallbacks. Inspect actual 390/768/1440 screenshots **and temporal beats** for motion requests. Repository screenshot tooling alone does not certify a WebGL motion result. Run `npm run motion:verify` when changing motion research or the pipeline.
