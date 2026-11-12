# The MungTangE pipeline — researched design decisions

> **Optional deep reference.** Historical run IDs, manifests, JSON stage gates and CLI commands below describe the legacy Node CLI, **not requirements of the prompt-first SKILL.md**.

## Source provenance and specific adaptations

This pipeline is a **synthesis**, not a copy or official endorsement. Read and credit
the upstream SKILL.md files; their rules may change after 2026-11-12. The linked
repositories are influential examples of agent skill design. No popularity
ranking was verified for each individual entry.

| Upstream skill | What it actually emphasizes | Design decision here | Difference |
|---|---|---|---|
| [Anthropic — frontend-design](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md) | Context-specific visual identity, intentional type and layout, avoid generic output | Require a creative thesis and two truly distinct research directions | Never mandate aesthetic novelty that harms task clarity |
| [Impeccable](https://github.com/pbakaus/impeccable/blob/main/.agents/skills/impeccable/SKILL.md) | Choose visual ambition for the interface mode and verify what is rendered | Craft review adapts to landing, reading, operating and exploratory surfaces | Do not invoke Impeccable's optional launcher/binaries automatically |
| [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/.claude/skills/ui-ux-pro-max/SKILL.md) | Prioritized accessibility, interaction, responsive, tokens, animation, charts | QA priorities begin with accessibility and functional interaction | Catalog is metadata rather than copying proprietary tables |
| [OpenAI — figma-implement-design](https://github.com/openai/skills/blob/main/skills/.curated/figma-implement-design/SKILL.md) | Explicit Figma node/context extraction then design-system-aware implementation | Separate reference fidelity contract from production code | Figma connector optional; no fabricated file keys, measurements or context |
| [Vercel — react-best-practices](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/SKILL.md) | Prioritize costly async waterfalls/bundle problems, render efficiency | Framework-specific performance review, not premature optimization | React-only guidance is excluded when project isn't React-based |
| [Vercel — web-design-guidelines](https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md) | Read current guidelines and cite UI code findings by location | Audit output must name file/line, impact, fix and evidence | Network unavailable -> mark guidance version and use local QA; never claim fresh review |
| [Addy Osmani — spec-driven-development](https://github.com/addyosmani/agent-skills/blob/main/skills/spec-driven-development/SKILL.md) | Specify -> plan -> tasks -> implement with scoped gates | Scope and acceptance conditions precede design code | Very small, fully scoped fixes may use a lightweight brief |
| [Matt Pocock — implement-spec](https://github.com/mattpocock/skills/blob/main/skills/engineering/implement-spec/SKILL.md) | Dependency graph, task frontier, isolated worktrees, separate integration and review | For complex work, split only independent tasks with controlled integration | Default to one implementer unless parallelism saves meaningful time |
| [Wshobson — task-coordination-strategies](https://github.com/wshobson/agents/blob/main/plugins/agent-teams/skills/task-coordination-strategies/SKILL.md) | Task graph and file-ownership contracts avoid multi-agent conflicts | Each task names owned files, dependencies, owner, test and acceptance | No uncontrolled agents editing the same branch |
| [Murat Cankoylan — harness-engineering](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/main/skills/harness-engineering/SKILL.md) | Locked/editable/append-only/human-controlled surfaces; durable state, guard against metric gaming | Run-ID-based manifests, quality rubric, report files, human ship approval | CLI only verifies report structure, not truth of claims |
| [Owl-Listener — design-qa-checklist](https://github.com/Owl-Listener/designer-skills/blob/main/design-ops/skills/design-qa-checklist/SKILL.md) | QA against design specs with real screenshots/states and cross-platform review | Screen/keyboard/accessibility/contents matrix | A report doesn't substitute for actual browser/device inspections |

## Real execution graph

               PROJECT INSPECTION
                     |
            [A] Brief + constraints
                     |
            [B] Evidence and 2 directions
                     |
            [C] Semantic design system
                     |
            [D] Vertical-slice code
                     |
            [E] Independent browser+QA
                     |
            [F] Human release approval

All arrows are **gates**. A failed gate returns to the relevant owner,
not to a generalized unconstrained regeneration loop. Each stage creates a
compact durable handoff packet. The coordinator chooses *a few* references
from the 300-entry catalog based on stack/task fit.

### Data passed across the edges

- **A -> B:** Real audience, one primary user job, business constraints,
  a success criterion, and missing-information log.
- **B -> C:** Source citations, content inventory, 2 art directions,
  preferred direction and rejection rationale.
- **C -> D:** Token dictionary, typography, grids, component states,
  accessibility constraints and content/asset provenance.
- **D -> E:** Runnable branch/worktree, changed-file inventory,
  commands and actual tests run, known limitations.
- **E -> F:** Severity-ranked findings, captured artifacts,
  regression results, open risks, reproduction instructions.
- **F -> release:** A human's informed approval, changelog, rollback instructions.

## Parallelism and ownership

Only parallelize dependency-independent work. Example within stage B:
research and asset/provenance inspection can run concurrently; a single
design lead integrates their findings. In stage D, two implementers may
own different components only when the interface contracts are fixed.
No agents share mutable ownership of the same file; reviewers do not
mark their own generated work as independently audited.

Default roles:
1. **Coordinator:** locks rubric, decomposes work, integrates results.
2. **Researcher:** owns reference notes, user/task analysis.
3. **Designer:** owns visual rationale, token and component specifications.
4. **Implementer:** owns code and first-party tests.
5. **Independent verifier:** checks screenshots, keyboard, builds, claims.
6. **Human release owner:** authorizes merges and deployments.

Do not summon all six models for every request. A text-only or audit task
may need only one worker and one independent reviewer.

## State rules inspired by harness-engineering

| Surface | Rule | Examples |
|---|---|---|
| Locked | Do not weaken to pass | Quality rubric, CI tests, approved acceptance criteria, security policy |
| Editable | Can change within owned scope | UI code, token prototypes, research draft, generated task packets |
| Append-only | Preserve failure and alternatives | DECISIONS.md, evidence index, regressions, experiments |
| Human-controlled | Explicit approval required | Credentials, paid model/tool calls, deploy, destructive edits, PR merge |

Run manifest ID blocks accidentally recycling previous reports. The
CLI only checks *structural* truth (files exist, fields complete, previous
stages recorded). Independent reviewers check *empirical* truth (actual
rendering, test output and security). Never conflate them.

## Why not a 300-agent or 300-skill prompt?

Token flood is not knowledge retrieval. Loading all 300 instructions would
raise context cost, conflict risk, and prompt-injection exposure.
The selection process instead:
1. Scan current project stack locally.
2. Rank source metadata by task and framework overlap.
3. Diversify ownership (max two references from one repo/category).
4. Pick up to four references per category for the whole run.
5. Activate 3–5 specialties at a time, never copy 300 long instructions.
6. Check source licenses, content, and trust before any manual import.
7. Review decisions at each gate and preserve failed experiments.

## Growth path

The initial release is an offline CLI + descriptive task harness. A genuine
fully autonomous executor is **not** included. Future adapters may integrate
Codex, Claude, OpenCode, Playwright, axe-core and screenshot diffs. Those
adapters must have permission scoping, budget controls, immutable test
snapshots, retries, idempotency, private worktrees, and signed evidence.
