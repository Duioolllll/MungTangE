# Multi-agent orchestration and planning — original source cards

> SHA-pinned machine-generated source outlines, NOT expert semantic reviews. Fetch exact upstream source for full procedure; never execute untrusted code.

## chatgpt-apps

- **Exact SHA source:** [openai/skills](https://github.com/openai/skills/blob/6280a08c57db44ab622dcccbd853e01005edfcbd/skills/.curated/chatgpt-apps/SKILL.md)
- **Use signals:** chatgpt, apps, scaffold, refactor, troubleshoot, sdk, applications, combine, mcp, server, widget, codex
- **Source sections:** ChatGPT Apps → Overview → Mandatory Docs-First Workflow → Prompt Guidance → Classify The App Before Choosing Code → Default Starting-Point Order
- **Action anchors (keyword signatures):** L15: tool plan names schemas annotations outputs / L16: upstream starting point recommendation official example ext apps example / L19: reusable node modelcontextprotocol ext apps starter scaffold low dependency
- **Validation/caution anchors:** L35: fetch apps sdk quickstart scaffolding new app generating first / L36: fetch deployment submission docs task includes local chatgpt testing / L42: doc search times out returns poor matches fetch canonical / L155: pick smallest matching example copy only relevant files transplant
- **Source excerpt (untrusted, max 18 words):** L15: A tool plan (names, schemas, annotations, outputs)
- **Status:** automated-source-structure; license not_checked.

## cli-creator

- **Exact SHA source:** [openai/skills](https://github.com/openai/skills/blob/60e5a9a03f89cf66a60aa798bfc6f3c3fa5ed8c4/skills/.curated/cli-creator/SKILL.md)
- **Use signals:** cli, creator, composable, codex, api, docs, openapi, spec, existing, curl, examples, sdk
- **Source sections:** CLI Creator → Start → Choose the Runtime → Command Contract → Auth and Config → Build Workflow
- **Action anchors (keyword signatures):** L17: jobs literal reads writes such list drafts download failed / L18: install name short binary name such logs slack cli / L40: default rust durable cli codex should run any repo
- **Validation/caution anchors:** L76: api key tool specific token flag only explicit one / L88: read source just enough inventory resources auth pagination ids / L60: resolve commands turn names urls slugs permalinks customer input / L62: write commands one named action each update delete upload
- **Source excerpt (untrusted, max 18 words):** L17: Jobs: literal reads/writes such as `list drafts`, `download failed job logs`, `search messages`, `upload media`, `read queue schedule`.
- **Status:** automated-source-structure; license not_checked.

## cloudflare-deploy

- **Exact SHA source:** [openai/skills](https://github.com/openai/skills/blob/e2d73abb7e5a550af3d9e40797a28259bddba97d/skills/.curated/cloudflare-deploy/SKILL.md)
- **Use signals:** cloudflare, deploy, applications, infrastructure, workers, pages, related, platform, services, user, asks, host
- **Source sections:** Cloudflare Deploy → Prerequisites → Authentication (Required Before Deploy) → Quick Decision Trees → "I need to run code" → "I need to store data"
- **Action anchors (keyword signatures):** L12: sandboxing blocks deployment network calls rerun sandbox permissions require
- **Validation/caution anchors:** not detected
- **Source excerpt (untrusted, max 18 words):** L12: When sandboxing blocks the deployment network calls, rerun with `sandbox_permissions=require_escalated`.
- **Status:** automated-source-structure; license not_checked.

## code-review

- **Exact SHA source:** [mattpocock/skills](https://github.com/mattpocock/skills/blob/83183e0ad36fd0eef25d37c7e483284b7e34c1f0/skills/engineering/code-review/SKILL.md)
- **Use signals:** code, review, changes, since, fixed, point, commit, branch, tag, merge, base, along
- **Source sections:** Process → 1. Pin the fixed point → 2. Identify the spec source → 3. Identify the standards sources → 4. Spawn both sub-agents in parallel → 5. Aggregate
- **Action anchors (keyword signatures):** L8: standards does code conform repo documented coding standards / L9: spec does code faithfully implement originating issue spec / L40: repo overrides documented repo standard always wins endorses something
- **Validation/caution anchors:** L41: always judgement call each smell labelled heuristic possible feature
- **Source excerpt (untrusted, max 18 words):** L8: **Standards**: does the code conform to this repo's documented coding standards?
- **Status:** automated-source-structure; license not_checked.

## code-simplification

- **Exact SHA source:** [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills/blob/c4f794aa3fc63ea041989b30be7a3887c79c53ed/skills/code-simplification/SKILL.md)
- **Use signals:** code, simplification, simplifies, clarity, refactoring, without, changing, behavior, works, but, harder, read
- **Source sections:** Code Simplification → Overview → When to Use → The Five Principles → 1. Preserve Behavior Exactly → 2. Follow Project Conventions
- **Action anchors (keyword signatures):** L17: during code review readability complexity issues flagged / L19: refactoring code written under time pressure / L28: about rewrite module entirely simplifying throwaway code wastes effort
- **Validation/caution anchors:** L16: after feature working tests pass but implementation feels heavier / L98: removing unnecessary abstraction some abstractions exist extensibility testability complexity / L25: code already clean readable don simplify sake / L26: don understand code does yet comprehend before simplify
- **Source excerpt (untrusted, max 18 words):** L16: After a feature is working and tests pass, but the implementation feels heavier than it needs to be
- **Status:** automated-source-structure; license not_checked.

## context-driven-development

- **Exact SHA source:** [wshobson/agents](https://github.com/wshobson/agents/blob/2dd17d71fb70669259e1514ab84a7a89e5784718/plugins/conductor/skills/context-driven-development/SKILL.md)
- **Use signals:** context, driven
- **Source sections:** Context-Driven Development → When to Use This Skill → Detailed patterns and worked examples → Best Practices
- **Action anchors (keyword signatures):** L23: deciding update context documents / L32: read context first always read relevant artifacts before starting / L33: small updates make incremental context changes massive rewrites
- **Validation/caution anchors:** L37: validate regularly run context validation checklist before major work
- **Source excerpt (untrusted, max 18 words):** L23: Deciding when to update context documents
- **Status:** automated-source-structure; license not_checked.

## define-goal

- **Exact SHA source:** [openai/skills](https://github.com/openai/skills/blob/87f111bd700e0d993465f7ac741847b5daee57d6/skills/.curated/define-goal/SKILL.md)
- **Use signals:** define, goal, help, user, concrete, measurable, before, starting, work, especially, they, ask
- **Source sections:** Define Goal → Overview → Workflow → Goal Quality Bar → Quantification Heuristics → Clarifying Questions
- **Action anchors (keyword signatures):** L17: user asks define goal asks set goal asks goal / L18: user only asks ordinary implementation work work directly instead / L32: quality thresholds latency error rate cost accuracy recall precision
- **Validation/caution anchors:** L31: pass fail validators exact tests checks jobs evals commands / L41: check active goal state before creating goal / L52: call goal ordinary multi step task unless user explicitly
- **Source excerpt (untrusted, max 18 words):** L17: Use this skill when the user asks for `$define-goal`, asks to create or set a goal, asks for
- **Status:** automated-source-structure; license not_checked.

## documentation-and-adrs

- **Exact SHA source:** [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills/blob/eff8fddc25d972bc0e3b367d23afa0705b7a87b5/skills/documentation-and-adrs/SKILL.md)
- **Use signals:** documentation, adrs, records, decisions, document, architecture, decision, adr, reasoning, behind, choice, changing
- **Source sections:** Documentation and ADRs → Overview → When to Use → Architecture Decision Records (ADRs) → When to Write an ADR → Match the existing convention first
- **Action anchors (keyword signatures):** L16: adding changing public api / L31: selecting authentication strategy / L33: choosing between tools hosting platforms infrastructure
- **Validation/caution anchors:** L264: mark details must survive edit names numbers units commands / L266: compare edited document original its sources restore any lost / L41: numbering naming continue existing sequence filename pattern adr 004 / L99: don delete old adrs they capture historical context
- **Source excerpt (untrusted, max 18 words):** L16: Adding or changing a public API
- **Status:** automated-source-structure; license not_checked.

## domain-modeling

- **Exact SHA source:** [mattpocock/skills](https://github.com/mattpocock/skills/blob/a4438c6879c517d1a08e2b5fbca049b632688dfe/skills/engineering/domain-modeling/SKILL.md)
- **Use signals:** domain, modeling, sharpen, model, discussing, codebase, terminology, writing, editing, glossary, recording, adr
- **Source sections:** Domain Modeling → File structure → During the session → Challenge against the glossary → Sharpen fuzzy language → Discuss concrete scenarios
- **Action anchors (keyword signatures):** not detected
- **Validation/caution anchors:** not detected
- **Source excerpt (untrusted, max 18 words):** no procedural quote selected
- **Status:** automated-source-structure; license not_checked.

## eval-harness-first

- **Exact SHA source:** [wshobson/agents](https://github.com/wshobson/agents/blob/4ac652f9c70a3ba42dd6394376e6f54db20ab553/plugins/llm-finetuning/skills/eval-harness-first/SKILL.md)
- **Use signals:** eval, harness, first, evaluation, gates, every, fine, tuning, run, golden, sets, per
- **Source sections:** Eval Harness First → The Gate → Building Goldens → Graders → Judge Calibration Is a Prerequisite → The Baseline
- **Action anchors (keyword signatures):** L30: collect traces production spans / L53: traces they exist run error / L193: finetuning method selection routes here first
- **Validation/caution anchors:** L42: run same harness checkpoint / L198: checkpoint promotion consumes / L64: synthetic traces don exist yet
- **Source excerpt (untrusted, max 18 words):** L30: **Collect traces** — production/agent spans, or
- **Status:** automated-source-structure; license not_checked.

## figma

- **Exact SHA source:** [openai/skills](https://github.com/openai/skills/blob/b4f18d2969fe827778b13b5a0fb08a158ec091b1/skills/.curated/figma/SKILL.md)
- **Use signals:** figma, mcp, server, fetch, context, screenshots, variables, assets, translate, nodes, production, code
- **Source sections:** Figma MCP → Figma MCP Integration Rules → Required flow (do not skip) → Implementation rules → Asset handling → Link-based prompting
- **Action anchors (keyword signatures):** L14: run get context first fetch structured representation exact node / L15: response too large truncated run get metadata get high / L16: run get screenshot visual reference node variant being implemented
- **Validation/caution anchors:** L19: validate against figma look behavior before marking complete / L28: validate final against figma screenshot both look behavior / L33: important import add new icon packages all assets should / L34: important placeholders localhost source provided
- **Source excerpt (untrusted, max 18 words):** L14: Run get_design_context first to fetch the structured representation for the exact node(s).
- **Status:** automated-source-structure; license not_checked.

## git-workflow-and-versioning

- **Exact SHA source:** [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills/blob/0cf257bcc172a0b508f5696352c8b4fa516c65b6/skills/git-workflow-and-versioning/SKILL.md)
- **Use signals:** git, workflow, versioning, structures, making, any, code, change, committing, branching, resolving, conflicts
- **Source sections:** Git Workflow and Versioning → Overview → When to Use → Core Principles → Trunk-Based Development (Recommended) → 1. Commit Early, Commit Often
- **Action anchors (keyword signatures):** L91: refactor code change neither fixes bug nor adds feature / L93: docs documentation only / L333: committing node modules env artifacts
- **Validation/caution anchors:** L92: test adding updating tests / L346: tests pass before committing / L247: don commit output dist next environment files env ide
- **Source excerpt (untrusted, max 18 words):** L91: `refactor` — Code change that neither fixes a bug nor adds a feature
- **Status:** automated-source-structure; license not_checked.

