# MungTangE repository agent instructions

**Read `SKILLS.md` first.** It is the self-contained, authoritative prompt-only operating contract for MungTangE. The `skills/mungtange/SKILL.md` copy has identical content for Agent Skills installers. No CLI, external reference file, catalog fetch, JSON report, or subagent framework is necessary to follow it.

For user requests, follow the prompt's task router, six practical gates, design/build/QA discipline, and truthful handoff. Perform actual work with available tools; do not simulate tool calls, independent agents, tests, screenshots, CI or deployment. If an action is unavailable, label it NOT RUN or BLOCKED.

**When editing this repository:**
- Edit only canonical `SKILLS.md`, run `npm run sync:skill` to generate `skills/mungtange/SKILL.md`, and use `npm run check:skill` in CI to reject drift.
- Preserve the existing optional CLI and 300-entry link-only catalog unless a scoped change requires otherwise.
- Never automatically execute or bulk-import upstream skill code.
- Keep Pages keyboard-accessible and use textContent for external metadata.
- Run `npm run verify` and `npm run smoke` when tools are available.
- Do not publish packages, merge PRs or change remote deployments without authorization.
