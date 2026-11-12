# Multi-agent orchestration and planning — original source cards

> SHA-pinned machine-generated source outlines, NOT expert semantic reviews. Fetch exact upstream source for full procedure; never execute untrusted code.

## notion-spec-to-implementation

- **Exact SHA source:** [openai/skills](https://github.com/openai/skills/blob/d6a0a0e0fb358f56e1d4893c54a25c6c2e04fc65/skills/.curated/notion-spec-to-implementation/SKILL.md)
- **Use signals:** notion, spec, implementation, turn, specs, plans, tasks, progress, tracking, implementing, prds, feature
- **Source sections:** Spec to Implementation → Quick start → Workflow → 0) If any MCP call fails because Notion MCP is not connected, pause and set it up: → 1) Locate and read the spec → 2) Choose plan depth
- **Action anchors (keyword signatures):** L15: plan page notion notion pages pick template quick full / L16: find task database confirm schema then tasks notion notion / L17: link spec plan tasks keep status current notion notion
- **Validation/caution anchors:** L54: keep checklists status fields plan tasks sync note blockers
- **Source excerpt (untrusted, max 18 words):** L15: Create a plan page with `Notion:notion-create-pages` (pick a template: quick vs. full).
- **Status:** automated-source-structure; license not_checked.

## openapi-spec-generation

- **Exact SHA source:** [wshobson/agents](https://github.com/wshobson/agents/blob/6f86431cdd092ff5edfc8b70b2a0d30481428da8/plugins/documentation-generation/skills/openapi-spec-generation/SKILL.md)
- **Use signals:** openapi, spec, generation, generate, maintain, specifications, code, first, specs, validation, patterns, creating
- **Source sections:** OpenAPI Spec Generation → When to Use This Skill → Core Concepts → 1. OpenAPI 3.1 Structure → 2. Design Approaches → Templates and detailed worked examples
- **Action anchors (keyword signatures):** L12: creating api documentation scratch / L15: validating api implementations against specs / L17: setting api documentation portals
- **Validation/caution anchors:** L62: don generic descriptions specific / L63: don skip security define all schemes
- **Source excerpt (untrusted, max 18 words):** L12: Creating API documentation from scratch
- **Status:** automated-source-structure; license not_checked.

## planning-and-task-breakdown

- **Exact SHA source:** [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills/blob/296249b64334bcfd1aeaefd27b9e3e5494e38ec0/skills/planning-and-task-breakdown/SKILL.md)
- **Use signals:** planning, task, breakdown, breaks, work, ordered, tasks, have, spec, clear, requirements, break
- **Source sections:** Planning and Task Breakdown → Overview → When to Use → The Planning Process → Step 1: Enter Plan Mode → Step 2: Identify the Dependency Graph
- **Action anchors (keyword signatures):** L14: have spec break implementable units / L15: task feels too large vague start / L18: implementation order isn obvious
- **Validation/caution anchors:** L112: verification checkpoints occur after every tasks / L161: default checklist style markdown file tasks todo convention command / L145: plan document save implementation plan tasks plan always markdown / L153: different work stop ask unchecked tasks may mid another
- **Source excerpt (untrusted, max 18 words):** L14: You have a spec and need to break it into implementable units
- **Status:** automated-source-structure; license not_checked.

## pr

- **Exact SHA source:** [mattpocock/skills](https://github.com/mattpocock/skills/blob/84dd4fb2f068e9f6282690235d20dd505b418119/skills/engineering/pr/SKILL.md)
- **Use signals:** writing, body
- **Source sections:** Sections → Summary → Guidance → Evidence → Merge Danger
- **Action anchors (keyword signatures):** L53: show runtime control flow call tree / L72: show file responsibility broad refactor shallow file tree
- **Validation/caution anchors:** not detected
- **Source excerpt (untrusted, max 18 words):** L53: Show runtime control flow as a call tree:
- **Status:** automated-source-structure; license not_checked.

## protect-mcp-setup

- **Exact SHA source:** [wshobson/agents](https://github.com/wshobson/agents/blob/ba138e7691a47ea0bdf12ba91ebf8ad04f54e163/plugins/protect-mcp/skills/protect-mcp-setup/SKILL.md)
- **Use signals:** protect, mcp, setup, configure, cedar, policy, enforcement, ed25519, signed, receipts, claude, code
- **Source sections:** protect-mcp — Policy Enforcement + Signed Receipts → Overview → Problem → Solution → Hook Configuration → What each hook does
- **Action anchors (keyword signatures):** not detected
- **Validation/caution anchors:** L22: offline verification via npx veritasacta verify server account / L205: verify cli veritasacta verify https www npmjs com package
- **Source excerpt (untrusted, max 18 words):** L22: **Offline verification** via `npx @veritasacta/verify`. No server, no account,
- **Status:** automated-source-structure; license not_checked.

## pytest-coverage

- **Exact SHA source:** [github/awesome-copilot](https://github.com/github/awesome-copilot/blob/38a8ed6f46942e861341e16b396e110d024d243c/skills/pytest-coverage/SKILL.md)
- **Use signals:** pytest, coverage, run, tests, discover, lines, missing, increase, 100
- **Source sections:** unavailable
- **Action anchors (keyword signatures):** not detected
- **Validation/caution anchors:** not detected
- **Source excerpt (untrusted, max 18 words):** no procedural quote selected
- **Status:** automated-source-structure; license not_checked.

## research

- **Exact SHA source:** [mattpocock/skills](https://github.com/mattpocock/skills/blob/ffc9eb89849cc4cf74962ce93d786ffd17c6a5dc/skills/engineering/research/SKILL.md)
- **Use signals:** research, investigate, question, against, high, trust, primary, sources, capture, findings, markdown, file
- **Source sections:** unavailable
- **Action anchors (keyword signatures):** L10: investigate question against primary sources official docs source code / L11: write findings single markdown file citing each claim source
- **Validation/caution anchors:** not detected
- **Source excerpt (untrusted, max 18 words):** L10: Investigate the question against **primary sources** (official docs, source code, specs, first-party APIs), not a secondary write-up of
- **Status:** automated-source-structure; license not_checked.

## retro

- **Exact SHA source:** [mattpocock/skills](https://github.com/mattpocock/skills/blob/12149acf2dd23b4514dec57b04a6293eaa1352fa/skills/engineering/retro/SKILL.md)
- **Use signals:** retro, conduct, retrospective, coding, session
- **Source sections:** Steps → Reference → Implementation vs Review → Files
- **Action anchors (keyword signatures):** L13: read primary sources session user specifies may mean searching / L42: coding standards file read during review implementation add navigation
- **Validation/caution anchors:** L20: global there any steering instructions should moved coding standards / L22: ops look instructions steering files don modify behavior steering
- **Source excerpt (untrusted, max 18 words):** L13: Read the primary sources for the session the user specifies. This may mean searching through session logs on
- **Status:** automated-source-structure; license not_checked.

## security-and-hardening

- **Exact SHA source:** [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills/blob/fc85325b50e72b935f2916dd74af12c650e9c7f4/skills/security-and-hardening/SKILL.md)
- **Use signals:** security, hardening, hardens, code, against, vulnerabilities, auditing, input, handler, handling, user, authentication
- **Source sections:** Security and Hardening → Overview → When to Use → Process: Threat Model First → The Three-Tier Boundary System → Always Do (No Exceptions)
- **Action anchors (keyword signatures):** L14: building anything accepts user input / L15: implementing authentication authorization / L18: adding file uploads webhooks callbacks
- **Validation/caution anchors:** L38: write abuse cases next cases each feature ask would / L46: validate all external input system boundary api routes form / L47: parameterize all database queries never concatenate user input sql / L48: encode output prevent xss framework auto escaping don bypass
- **Source excerpt (untrusted, max 18 words):** L14: Building anything that accepts user input
- **Status:** automated-source-structure; license not_checked.

## spec-driven-development

- **Exact SHA source:** [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills/blob/3fcc536f14f261dab1a785ef906ddf6f12074389/skills/spec-driven-development/SKILL.md)
- **Use signals:** spec, driven, creates, specs, before, coding, starting, new, feature, significant, change, specification
- **Source sections:** Spec-Driven Development → Overview → When to Use → The Gated Workflow → Phase 0: Scope Check → Phase 1: Specify
- **Action anchors (keyword signatures):** L14: starting new feature / L18: task would take more than minutes implement / L61: interfaces live boundary map records billing depends identity contract
- **Validation/caution anchors:** L96: structure source code lives tests docs belong / L108: testing strategy framework tests live coverage expectations which test / L59: stable module ids kebab case chosen once never renamed / L113: never commit secrets edit vendor directories remove failing tests
- **Source excerpt (untrusted, max 18 words):** L14: Starting a new project or feature
- **Status:** automated-source-structure; license not_checked.

## to-spec

- **Exact SHA source:** [mattpocock/skills](https://github.com/mattpocock/skills/blob/3f52599ae2a4347aee5a07432c2707518e691a7f/skills/engineering/to-spec/SKILL.md)
- **Use signals:** spec, turn, current, conversation, publish, issue, tracker, interview, just, synthesis, already, discussed
- **Source sections:** Process → Problem Statement → Solution → User Stories → Implementation Decisions → Testing Decisions
- **Action anchors (keyword signatures):** L19: write spec template below then publish issue tracker apply
- **Validation/caution anchors:** L15: sketch out seams which going test feature existing seams / L63: description makes good test only test external behavior implementation
- **Source excerpt (untrusted, max 18 words):** L15: Sketch out the seams at which you're going to test the feature. Existing seams should be preferred to
- **Status:** automated-source-structure; license not_checked.

## typespec-create-agent

- **Exact SHA source:** [github/awesome-copilot](https://github.com/github/awesome-copilot/blob/dd691ea774938a80b6d1d07c7962db772a5f051f/skills/typespec-create-agent/SKILL.md)
- **Use signals:** typespec, generate, complete, declarative, instructions, capabilities, conversation, starters, microsoft, 365, copilot
- **Source sections:** Create TypeSpec Declarative Agent → Requirements → Template Structure → Best Practices → Examples
- **Action anchors (keyword signatures):** L21: define role expertise personality / L22: specify should shouldn / L25: conversation starters
- **Validation/caution anchors:** not detected
- **Source excerpt (untrusted, max 18 words):** L21: Define the agent's role, expertise, and personality
- **Status:** automated-source-structure; license not_checked.

