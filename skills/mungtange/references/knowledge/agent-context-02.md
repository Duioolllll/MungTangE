# LLM context, memory and prompts — original source cards

> SHA-pinned machine-generated source outlines, NOT expert semantic reviews. Fetch exact upstream source for full procedure; never execute untrusted code.

## long-horizon-prompting

- **Exact SHA source:** [muratcankoylan/Agent-Skills-for-Context-Engineering](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/a36ec67d53a00fbefc78d82650f0e5af37ffdc71/skills/long-horizon-prompting/SKILL.md)
- **Use signals:** long, horizon, prompting, should, used, writing, enhancing, evaluating, launch, prompt, running, autonomous
- **Source sections:** Long-Horizon Prompting → When to Activate → Core Concepts → Pseudo-Formal Task Specification → Anatomy of a Long-Horizon Brief → Persistence Cuts Both Ways
- **Action anchors (keyword signatures):** L16: writing reviewing prompt long running autonomous run before launching / L19: adding persistence instructions stop conditions effort floors return gates / L21: diagnosing failed long run whose failure traces brief premature
- **Validation/caution anchors:** L20: writing output contract acceptance checks each delegated worker must / L43: enumerated failure modes auditor concrete checklist domain specific ways / L42: non counting outcomes enumerated list results count partial progress / L75: define which findings block fresh adversarial reviewer always finds
- **Source excerpt (untrusted, max 18 words):** L16: Writing or reviewing the prompt for a long-running autonomous run before launching it
- **Status:** automated-source-structure; license not_checked.

## memory-forensics

- **Exact SHA source:** [wshobson/agents](https://github.com/wshobson/agents/blob/b13be6cc1452cd1b63e96ff7435c11ac6735d3f5/plugins/reverse-engineering/skills/memory-forensics/SKILL.md)
- **Use signals:** memory, forensics, master, techniques, including, acquisition, process, analysis, artifact, extraction, volatility, related
- **Source sections:** Memory Forensics → When to Use This Skill → Memory Acquisition → Live Acquisition Tools → Windows → Linux
- **Action anchors (keyword signatures):** L13: extracting malware artifacts processes injected code network connections ram / L329: document everything record time tool hash capture / L335: start broad get overview before deep diving
- **Validation/caution anchors:** L330: verify integrity hash memory dump immediately after capture / L339: validate results verify findings through multiple methods
- **Source excerpt (untrusted, max 18 words):** L13: Extracting malware artifacts (processes, injected code, network connections) from a RAM capture
- **Status:** automated-source-structure; license not_checked.

## memory-review

- **Exact SHA source:** [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills/blob/7efcdb15c9a570573a891f0ad7bc5a617c6e25f1/engineering-team/self-improving-agent/skills/memory-review/SKILL.md)
- **Use signals:** memory, review, has, learned, auto, promote, permanent, rules, stale, entries, prune, duplicates
- **Source sections:** /si:memory-review — Analyze Auto-Memory → Usage → What It Does → Step 1: Locate memory directory → Step 2: Read and analyze MEMORY.md → Step 3: Read topic files
- **Action anchors (keyword signatures):** L118: before starting new phase / L119: after onboarding new team member review claude learned / L123: run memory review quick frequently low overhead
- **Validation/caution anchors:** L49: references files longer exist find verify / L54: multiple entries about same topic three lines about testing / L126: don hesitate delete stale entries auto memory will learn
- **Source excerpt (untrusted, max 18 words):** L49: References files that no longer exist (`find` to verify)
- **Status:** automated-source-structure; license not_checked.

## memory-safety-patterns

- **Exact SHA source:** [wshobson/agents](https://github.com/wshobson/agents/blob/74f2e5bd812f9c6f2e330dde80ba2f795395963b/plugins/systems-programming/skills/memory-safety-patterns/SKILL.md)
- **Use signals:** memory, safety, patterns, implement, safe, programming, raii, ownership, smart, pointers, resource, management
- **Source sections:** Memory Safety Patterns → When to Use This Skill → Core Concepts → 1. Memory Bug Categories → 2. Safety Spectrum → Detailed patterns and worked examples
- **Action anchors (keyword signatures):** L15: implementing raii patterns / L52: tools addresssanitizer valgrind miri
- **Validation/caution anchors:** L51: check bounds safe access methods / L49: smart pointers avoid raw pointers / L56: don raw pointers unless interfacing
- **Source excerpt (untrusted, max 18 words):** L15: Implementing RAII patterns
- **Status:** automated-source-structure; license not_checked.

## memory-systems

- **Exact SHA source:** [muratcankoylan/Agent-Skills-for-Context-Engineering](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/5c42112555148f9dd3913e093eb4a8427c1a974a/skills/memory-systems/SKILL.md)
- **Use signals:** memory, systems, should, used, persistent, semantic, cross, session, knowledge, retention, entity, tracking
- **Source sections:** Memory System Design → When to Activate → Core Concepts → Detailed Topics → Production Framework Landscape → Memory Layers (Decision Points)
- **Action anchors (keyword signatures):** L13: building must persist knowledge across sessions / L16: implementing reasoning over accumulated knowledge / L19: building dynamic memory automatic entity relationship extraction self improving
- **Validation/caution anchors:** L99: prototype file system memory store facts structured json timestamps / L113: stale results check valid until timestamps most results expired / L115: storage failure queue writes retry never block response memory / L174: consolidate memories periodically invalidate but don discard
- **Source excerpt (untrusted, max 18 words):** L13: Building agents that must persist knowledge across sessions
- **Status:** automated-source-structure; license not_checked.

## on-call-handoff-patterns

- **Exact SHA source:** [wshobson/agents](https://github.com/wshobson/agents/blob/fac98d35f10b3e6b1b1fdca485c7fe6613b3cc29/plugins/incident-response/skills/on-call-handoff-patterns/SKILL.md)
- **Use signals:** call, handoff, patterns, master, shift, handoffs, context, transfer, escalation, procedures, documentation, transitioning
- **Source sections:** On-Call Handoff Patterns → When to Use This Skill → Core Concepts → 1. Handoff Components → 2. Handoff Timing → Templates and detailed worked examples
- **Action anchors (keyword signatures):** L14: documenting ongoing investigations / L69: incident runbook templates incident runbook templates runbooks incidents handed
- **Validation/caution anchors:** not detected
- **Source excerpt (untrusted, max 18 words):** L14: Documenting ongoing investigations
- **Status:** automated-source-structure; license not_checked.

## pptx-deck-context

- **Exact SHA source:** [wshobson/agents](https://github.com/wshobson/agents/blob/926c9ca2cbe2bda01f0dcf51b8cc2d3266c74732/plugins/pptx-deck-creation/skills/pptx-deck-context/SKILL.md)
- **Use signals:** pptx, deck, context, preparing, narrative, sources, new, editable
- **Source sections:** PPTX Deck Context → Decision sequence → Rules
- **Action anchors (keyword signatures):** L14: assign stable source ids plan source ref every metric / L15: choose documented direction prefer user brand guide then read / L24: keep long source material concise ask summary decision relevant
- **Validation/caution anchors:** L13: user selected narrative framework none specified offer mckinsey scqa / L22: copy external fonts images icons logos without recorded licensing
- **Source excerpt (untrusted, max 18 words):** L13: Use the user-selected narrative framework. If none is specified, offer `mckinsey`, `scqa`, `pyramid`, `mece`, `action-title`, `assertion-evidence`, `exec-summary-first`, or
- **Status:** automated-source-structure; license not_checked.

## self-managed-context

- **Exact SHA source:** [muratcankoylan/Agent-Skills-for-Context-Engineering](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/fcb93bf54346e76e682dbf873c5875f72844e06f/skills/self-managed-context/SKILL.md)
- **Use signals:** self, managed, context, should, used, model, gets, read, write, control, over, its
- **Source sections:** Self-Managed Context → When to Activate → Core Concepts → The Control Spectrum → Context as an Editable File → The Harness Owns the Invariants
- **Action anchors (keyword signatures):** L16: giving model write access its own live context instead / L27: cache stable layout observation masking under harness control context / L129: define pinned prefix system prompt task confirm excluded editable
- **Validation/caution anchors:** L224: measure prefix reuse compute context length report beside accuracy / L257: evidence references evidence read citing benchmark numbers comparing baselines / L22: diagnosing self editing never edits wipes useful state livelocks / L76: mind tail compact small early region under long still
- **Source excerpt (untrusted, max 18 words):** L16: Giving a model write access to its own live context instead of compacting on a fixed schedule
- **Status:** automated-source-structure; license not_checked.

## setup-matt-pocock-skills

- **Exact SHA source:** [mattpocock/skills](https://github.com/mattpocock/skills/blob/2df0b07981718fa5d9a51526dfbcaee87e3a543d/skills/engineering/setup-matt-pocock-skills/SKILL.md)
- **Use signals:** setup, matt, pocock, configure, repo, engineering, set, its, issue, tracker, triage, label
- **Source sections:** Setup Matt Pocock's Skills → Process → 1. Explore → 2. Present findings and ask → 3. Confirm and edit → 4. Write
- **Action anchors (keyword signatures):** L25: glossary glossary map repo root legacy context context map / L29: triage installed triage folder alongside one triage available decides / L69: block add whichever claude being edited see step selection
- **Validation/caution anchors:** L80: neither exists ask user which one don pick them
- **Source excerpt (untrusted, max 18 words):** L25: `GLOSSARY.md` and `GLOSSARY-MAP.md` at the repo root, and the legacy `CONTEXT.md` / `CONTEXT-MAP.md`. If a legacy file exists,
- **Status:** automated-source-structure; license not_checked.

## using-agent-skills

- **Exact SHA source:** [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills/blob/d56ac03ab057036c1bdcc9127c88952758ee2f0d/skills/using-agent-skills/SKILL.md)
- **Use signals:** discovers, invokes, starting, session, decide, which, workflow, applies, piece, work, hand, meta
- **Source sections:** Using Agent Skills → Overview → Skill Discovery → Core Operating Behaviors → 1. Surface Assumptions → 2. Manage Confusion Actively
- **Action anchors (keyword signatures):** L80: explain concrete downside quantify possible adds 200ms latency might / L104: refactor adjacent systems side effect / L106: add features spec because they seem useful
- **Validation/caution anchors:** L120: making wrong assumptions without checking / L133: check applicable before starting work encode processes prevent common / L67: stop proceed guess / L102: remove comments don understand
- **Source excerpt (untrusted, max 18 words):** L67: **STOP.** Do not proceed with a guess.
- **Status:** automated-source-structure; license not_checked.

