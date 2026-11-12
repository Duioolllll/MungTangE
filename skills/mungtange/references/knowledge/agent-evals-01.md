# AI evaluation, output quality and safety — original source cards

> SHA-pinned machine-generated source outlines, NOT expert semantic reviews. Fetch exact upstream source for full procedure; never execute untrusted code.

## advanced-evaluation

- **Exact SHA source:** [muratcankoylan/Agent-Skills-for-Context-Engineering](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/b11dd770ab961fba2d817a56e1d3f68f82c5e58d/skills/advanced-evaluation/SKILL.md)
- **Use signals:** advanced, evaluation, should, used, llm, judge, systems, direct, scoring, pairwise, comparison, rubric
- **Source sections:** Advanced Evaluation → When to Activate → Core Concepts → The Evaluation Taxonomy → The Bias Landscape → Metric Selection Framework
- **Action anchors (keyword signatures):** L16: building llm judge systems llm outputs / L17: comparing multiple model responses select one / L164: characteristics observable features define each level
- **Validation/caution anchors:** L20: designing tests prompt model changes / L25: general deterministic checks regression suites production quality gates outcome / L339: match scale granularity rubric specificity don without detailed level
- **Source excerpt (untrusted, max 18 words):** L16: Building LLM-as-judge systems for LLM outputs
- **Status:** automated-source-structure; license not_checked.

## apple-appstore-reviewer

- **Exact SHA source:** [github/awesome-copilot](https://github.com/github/awesome-copilot/blob/10f7d5de653fb4bfe424411372f575e35bc3ee0e/skills/apple-appstore-reviewer/SKILL.md)
- **Use signals:** apple, appstore, reviewer, serves, codebase, instructions, looking, app, store, optimizations, rejection, reasons
- **Source sections:** Apple App Store Review Specialist → Specific Instructions → Primary Objective → Constraints → Inputs You Should Look For → App metadata & configuration
- **Action anchors (keyword signatures):** L15: review codebase relevant files info plist entitlements privacy manifests / L16: produce prioritized actionable recommendations clear references app store review / L17: assume developer wants fast approval minimal review risk
- **Validation/caution anchors:** L31: improve review clarity demo test accounts reviewer notes predictable / L70: demo mode test account reviewers / L32: improve product quality signals crash risk edge cases pitfalls / L38: edit code propose prs first pass
- **Source excerpt (untrusted, max 18 words):** L15: **Review the codebase and relevant project files** (e.g., Info.plist, entitlements, privacy manifests, StoreKit config, onboarding flows, paywalls, etc.).
- **Status:** automated-source-structure; license not_checked.

## arize-evaluator

- **Exact SHA source:** [github/awesome-copilot](https://github.com/github/awesome-copilot/blob/1336030d8fcb38d0f861bf85d348993b79a2d32f/skills/arize-evaluator/SKILL.md)
- **Use signals:** arize, evaluator, handles, llm, judge, evaluation, workflows, including, creating, updating, evaluators, running
- **Source sections:** Arize Evaluator Skill → Prerequisites → Concepts → What is an Evaluator? → What is a Task? → Data Granularity
- **Action anchors (keyword signatures):** L25: space unknown run spaces list pick name ask user / L293: response correctness does response correctly address user financial query / L474: output output top level field each run
- **Validation/caution anchors:** L24: 401 unauthorized missing api key run profiles show inspect / L26: llm provider call fails missing openai api key anthropic / L27: security never read env files search filesystem credentials profiles
- **Source excerpt (untrusted, max 18 words):** L24: `401 Unauthorized` / missing API key → run `ax profiles show` to inspect the current profile. If the
- **Status:** automated-source-structure; license not_checked.

## code-review-and-quality

- **Exact SHA source:** [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills/blob/15ea44c93c61dcec705720342c1fd78755702f85/skills/code-review-and-quality/SKILL.md)
- **Use signals:** code, review, quality, conducts, multi, axis, before, merging, any, change, reviewing, written
- **Source sections:** Code Review and Quality → Overview → When to Use → The Five-Axis Review → 1. Correctness → 2. Readability & Simplicity
- **Action anchors (keyword signatures):** L17: after completing feature implementation / L19: refactoring existing code / L60: does refactor reduce complexity just relocate count concepts reader
- **Validation/caution anchors:** L20: after any bug fix review both fix regression test / L33: does pass all tests tests actually testing right things / L41: control flow straightforward avoid nested ternaries deep callbacks / L45: abstractions earning their complexity don generalize until third case
- **Source excerpt (untrusted, max 18 words):** L17: After completing a feature implementation
- **Status:** automated-source-structure; license not_checked.

## code-review-excellence

- **Exact SHA source:** [wshobson/agents](https://github.com/wshobson/agents/blob/7ffef3d96996eaaa6ee7e1d17dd5ed7681969bb1/plugins/developer-essentials/skills/code-review-excellence/SKILL.md)
- **Use signals:** code, review, excellence, master, effective, provide, constructive, feedback, catch, bugs, early, foster
- **Source sections:** Code Review Excellence → When to Use This Skill → Core Principles → 1. The Review Mindset → 2. Effective Feedback → 3. Review Scope
- **Action anchors (keyword signatures):** L12: reviewing pull requests code changes / L13: establishing code review standards teams / L14: mentoring junior developers through reviews
- **Validation/caution anchors:** L16: creating review checklists guidelines / L72: test coverage quality
- **Source excerpt (untrusted, max 18 words):** L12: Reviewing pull requests and code changes
- **Status:** automated-source-structure; license not_checked.

## debugging-and-error-recovery

- **Exact SHA source:** [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills/blob/13c1a431626c23270542c7b570d7193ba79c3a96/skills/debugging-and-error-recovery/SKILL.md)
- **Use signals:** debugging, error, recovery, guides, systematic, root, cause, tests, fail, builds, break, something
- **Source sections:** Debugging and Error Recovery → Overview → When to Use → The Stop-the-Line Rule → The Triage Checklist → Step 1: Reproduce
- **Action anchors (keyword signatures):** L16: runtime behavior doesn match expectations / L278: error message contains something looks like instruction run command / L295: root cause identified documented
- **Validation/caution anchors:** L14: tests fail after code change / L117: strip test bare minimum reproduces issue / L277: execute commands navigate urls follow steps found error messages / L279: treat error text logs third party apis external services
- **Source excerpt (untrusted, max 18 words):** L14: Tests fail after a code change
- **Status:** automated-source-structure; license not_checked.

## design-review-process

- **Exact SHA source:** [Owl-Listener/designer-skills](https://github.com/Owl-Listener/designer-skills/blob/d6375641efed9b9bbaafa19766abcd7cdc7c7a7c/design-ops/skills/design-review-process/SKILL.md)
- **Use signals:** review, process, establish, gates, criteria, checkpoints, approval, flow, work, ships, without, consistent
- **Source sections:** Design Review Process → What You Do → Review Gates → Gate 1: Concept Review → Gate 2: Design Review → Gate 3: Pre-Handoff Review
- **Action anchors (keyword signatures):** L11: problem clearly defined / L19: responsive behavior defined / L24: edge cases addressed
- **Validation/caution anchors:** L32: accessibility tested / L33: cross browser device checked
- **Source excerpt (untrusted, max 18 words):** L11: Problem clearly defined
- **Status:** automated-source-structure; license not_checked.

## diagnosing-bugs

- **Exact SHA source:** [mattpocock/skills](https://github.com/mattpocock/skills/blob/d039541ddd1c46e6ddbd662fe99d49b686fc5e12/skills/engineering/diagnosing-bugs/SKILL.md)
- **Use signals:** diagnosing, bugs, diagnosis, loop, hard, performance, regressions, user, says, diagnose, debug, reports
- **Source sections:** Diagnosing Bugs → Redact → Phase 1: Build a feedback loop → Ways to construct one, in roughly this order → Tighten the loop → Non-deterministic bugs
- **Action anchors (keyword signatures):** L27: curl http script against running dev server / L32: property fuzz loop bug sometimes wrong output run 1000 / L34: differential loop run same input through old version new
- **Validation/caution anchors:** L26: failing test whatever seam reaches bug unit integration e2e / L29: headless browser script playwright puppeteer drives asserts dom console / L108: never log everything grep
- **Source excerpt (untrusted, max 18 words):** L26: **Failing test** at whatever seam reaches the bug: unit, integration, e2e.
- **Status:** automated-source-structure; license not_checked.

## evaluation

- **Exact SHA source:** [muratcankoylan/Agent-Skills-for-Context-Engineering](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/4ad49d771c9ea97162ce3a1fa9a75e415ebcb63b/skills/evaluation/SKILL.md)
- **Use signals:** evaluation, should, used, building, systems, deterministic, checks, regression, suites, multi, dimensional, rubrics
- **Source sections:** Evaluation Methods for Agent Systems → When to Activate → Core Concepts → Detailed Topics → Evaluation Challenges → Evaluation Rubric Design
- **Action anchors (keyword signatures):** L17: building quality gates pipelines / L48: compare model upgrades against token increases better models may / L140: rubrics clear descriptive level definitions evaluators human llm produce
- **Validation/caution anchors:** L13: testing performance systematically / L49: validate multi architectures extra add tokens tool calls evaluate
- **Source excerpt (untrusted, max 18 words):** L13: Testing agent performance systematically
- **Status:** automated-source-structure; license not_checked.

## evaluation-methodology

- **Exact SHA source:** [wshobson/agents](https://github.com/wshobson/agents/blob/a7678a1b6f990aeba3dfd0aa697949e6bb92591d/plugins/plugin-eval/skills/evaluation-methodology/SKILL.md)
- **Use signals:** evaluation, methodology, plugineval, quality, covering, dimensions, rubrics, scoring, formulas, understanding, plugin, measured
- **Source sections:** Evaluation methodology → Evaluation depths → Static layer (lint) → LLM judge layer (experimental) → Monte Carlo layer (experimental) → Composite score
- **Action anchors (keyword signatures):** L74: activation rate share runs any non empty reply shows / L77: failure rate share runs errored / L152: triggering accuracy low quick depth add trigger phrase such
- **Validation/caution anchors:** L59: triggering accuracy haiku reads description writes test prompts should / L151: score drops after add content check layers anti patterns
- **Source excerpt (untrusted, max 18 words):** L59: `triggering_accuracy`: Haiku reads the description and writes 10 test prompts, 5 that should
- **Status:** automated-source-structure; license not_checked.

## information-security-manager-iso27001

- **Exact SHA source:** [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills/blob/481c1bf2be0899e9f1dbac2da6aa823a661672af/ra-qm-team/skills/information-security-manager-iso27001/SKILL.md)
- **Use signals:** information, security, manager, iso27001, designing, running, iso, 27001, isms, healthtech, medtech, risk
- **Source sections:** Information Security Manager - ISO 27001 → Table of Contents → Trigger Phrases → Quick Start → Run Security Risk Assessment → Check Compliance Status
- **Action anchors (keyword signatures):** L15: quick start quick start / L26: implement iso 27001 / L27: isms implementation
- **Validation/caution anchors:** L19: validation checkpoints validation checkpoints / L281: verify integrity before reconnection
- **Source excerpt (untrusted, max 18 words):** L15: [Quick Start](#quick-start)
- **Status:** automated-source-structure; license not_checked.

## interface-review

- **Exact SHA source:** [jakubkrehel/skills](https://github.com/jakubkrehel/skills/blob/3b14135fedc6ba71738070312024a0931d50cff1/skills/interface-review/SKILL.md)
- **Use signals:** interface, review, reviews, branch, pull, request, uncommitted, change, problems, introduced, regressed, across
- **Source sections:** Interface review → The change, not the codebase → 1. Resolve the change scope first → 2. With no change, ask rather than invent one → 3. A diff is not a surface → 4. Read the removed lines
- **Action anchors (keyword signatures):** L27: head ahead git merge base origin default branch head / L28: working tree dirty review uncommitted changes / L29: neither there change review follow change ask rather than
- **Validation/caution anchors:** not detected
- **Source excerpt (untrusted, max 18 words):** L27: `HEAD` is ahead of `git merge-base origin/<default-branch> HEAD`. Review that range **plus** any uncommitted changes, stating the commit
- **Status:** automated-source-structure; license not_checked.

