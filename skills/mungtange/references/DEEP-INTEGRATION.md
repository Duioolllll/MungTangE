# Reviewed-source integration — higher-signal procedures

> **Scope:** MungTangE's 300-source audit verified complete SHA-pinned text and extracted 29 topic patterns algorithmically. In addition, the ten specific upstream source texts listed here were read for their concrete mechanisms. This is a deliberately narrower, qualitative integration sample; do not claim all 300 sources were manually or semantically reviewed. These are original paraphrased operating instructions with attribution, not copies of upstream SKILL.md content.

## 1. Product-aware visual system

**Grounding:** [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/HEAD/.claude/skills/ui-ux-pro-max/SKILL.md), SHA `2cacc8756e816a1eb6bfa44307372f2aeb445902`; [design-critique](https://github.com/Owl-Listener/designer-skills/blob/HEAD/design-ops/skills/design-critique/SKILL.md), SHA `c16cac6a68ffbda4f02fa81d2f51acaf04453059`.

**Apply:** For a new design, derive the visual system from product category, target audience and the primary task **before** choosing decoration. In order, check accessibility and touch interaction, responsiveness, layout, typography, form feedback and motion. After drafting, run a critique that separates observation, interpretation and actionable change. Critique by task success, not by personal preference.

**Proof:** Record one product-specific art-direction decision, the accessible action and focus states, and two observed interface defects resolved. Do not claim you ran upstream tools or consulted the original dataset—the installed MungTangE skill does not include their tools or style tables.

## 2. React/Next.js performance: critical path first

**Grounding:** [Vercel React Best Practices](https://github.com/vercel-labs/agent-skills/blob/HEAD/skills/react-best-practices/SKILL.md), SHA `237988de4a66dd8a71d30a2c24ebe1a86b58d04e`.

**Apply:** Inspect request chains before polishing individual render functions. Launch independent fetches concurrently where safe; avoid shipping unnecessary client dependencies, and only then optimize rerenders. Examine server/client serialization and auth boundaries separately. Apply only to React-based projects, with version awareness.

**Proof:** Show which waterfall/bundle/render defect existed and a reproducible test, trace or measurement. Never assume a priority label means the user's project has that bottleneck.

## 3. Component APIs: composition over boolean soup

**Grounding:** [Vercel Composition Patterns](https://github.com/vercel-labs/agent-skills/blob/HEAD/skills/composition-patterns/SKILL.md), SHA `d07025bf943345bc1cf15eb923594f889ff881f0`.

**Apply:** If a component has many independent behavioral booleans, split explicit variants or compose child parts instead of increasing conditional branches. Keep the state provider contract separate from visual pieces. Do not apply React 19-specific examples to React 18 without checking compatibility.

**Proof:** Compare public component APIs before/after, verify variants through representative use cases, and ensure the migration preserves behavior.

## 4. Motion engineering without animation debt

**Grounding:** [GSAP Performance](https://github.com/greensock/gsap-skills/blob/HEAD/skills/gsap-performance/SKILL.md), SHA `05792acf5b0ea7fd30042cdc5e91282e8e047898`.

**Apply:** Favor transform/opacity movement over layout properties; batch DOM reads and writes. Reuse timelines/tween machinery for frequently updated values, clean up off-screen animations and don't sprinkle will-change on every element. Pair with reduced-motion behavior.

**Proof:** Check smoothness on the actual target device/profile and confirm no leaked animations after navigation. A blanket "60 FPS" claim is not evidence.

## 5. Source-backed UI audits

**Grounding:** [Vercel Web Design Guidelines](https://github.com/vercel-labs/agent-skills/blob/HEAD/skills/web-design-guidelines/SKILL.md), SHA `ceae92ab319216a68274168fba9b63b998b65997`.

**Apply:** Audit the real source files with findings in `file:line` format, impact, supporting observation and a minimal fix. This upstream skill normally retrieves **another live guidelines document**; that external document is not automatically bundled or verified here. Don't claim current guideline compliance without retrieving it.

**Proof:** Provide reproducible findings on actual accessible code. If code or current guidance is unavailable, mark the limitation clearly.

## 6. Long-context engineering: optimize total tokens per completed task

**Grounding:** [Context Compression](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/HEAD/skills/context-compression/SKILL.md), SHA `44b78abf987b07ee5c63bc325a5ced366ffd7d15`.

**Apply:** Preserve the file/decision trail through compression. Track modified files, exact error strings, rationale, open risks and next actions. Prefer incremental updates to a stable handoff over repeatedly rewriting the entire summary. Minimize *refetching and rework*, not only individual prompts.

**Proof:** A resumed worker can identify altered files, next dependency and last failed check without rereading everything.

## 7. Evaluation: bias-aware comparisons

**Grounding:** [Advanced Evaluation](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/HEAD/skills/advanced-evaluation/SKILL.md), SHA `b11dd770ab961fba2d817a56e1d3f68f82c5e58d`.

**Apply:** Use direct scoring for objective, well-defined criteria and pairwise comparison for more subjective quality decisions. Where a model judges alternatives, swap their order to expose position bias; watch response-length and self-preference effects. Keep critical functional checks outside any aggregate aesthetic score.

**Proof:** Report the rubric, evidence and whether a real independent reviewer was available. Never fabricate a panel of judges.

## 8. Autonomous harness boundaries

**Grounding:** [Harness Engineering](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/HEAD/skills/harness-engineering/SKILL.md), SHA `05c84e7c87fb68e8e4ec154f2f7fdfd8a453205c`.

**Apply:** Separate **locked** acceptance/metrics, **editable** implementation, **append-only** experiment findings and **human-controlled** release actions. Keep feedback loops short and allow rollback. A normal prompt can *instruct* these boundaries, but cannot enforce runtime permissions.

**Proof:** Confirm reviewers cannot quietly change the pass criterion and no agent merges or deploys without actual authorization.

## 9. Spec-first only when complexity warrants it

**Grounding:** [Spec-driven Development](https://github.com/addyosmani/agent-skills/blob/HEAD/skills/spec-driven-development/SKILL.md), SHA `3fcc536f14f261dab1a785ef906ddf6f12074389`.

**Apply:** For a multi-capability feature, create a small capability/dependency map then a testable spec before implementation. Skip this ceremony for trivial, fully specified changes. Keep exact acceptance criteria and module boundaries stable as work progresses.

**Proof:** The implemented vertical slice maps cleanly to the spec and has a real test or observable acceptance check.

## 10. Cross-source synthesis: the reusable MungTangE loop

From the above distinct mechanisms, the original integrated workflow is:

1. **Select domain** from the user task; load only the one or two matching generated topical references.
2. **Pin acceptance** from user intent before modifying code.
3. **Choose design system** using audience, content and explicit states.
4. **Implement vertical slice** without violating existing routing, auth or component contracts.
5. **Check actual bottlenecks** (waterfalls, bundles, render, animation) as relevant—not all by habit.
6. **Critique independently if possible**, and detect evaluation biases without inventing independent agents.
7. **Repair failures** using original checks, preserve an accurate artifact trail, and respect human release control.

**Interpretation:** The first nine sections are qualitative synthesis from ten reviewed documents, while the generated DESIGN-DNA/WEB-ENGINEERING/AGENT-HARNESS files provide breadth over the entire 300-source corpus via deterministic extraction. Neither method verifies the safety or effectiveness of every upstream skill.
