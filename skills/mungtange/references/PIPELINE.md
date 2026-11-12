# Execution flow — optional deep planning reference

**Scope:** Detailed reasoning for larger design-to-code tasks. The primary
`../SKILL.md` defines the six gates. This document expands what to check; it
does not require a command runner or generated state files.

## Working dependency graph

```text
Inspect user goal and actual project
    ↓
BRIEF: audience + job + observable acceptance + constraints
    ↓
EXPLORE: current UI/content + two viable directions if meaningful
    ↓
DESIGN: hierarchy + tokens + states + responsive rules
    ↓
BUILD: smallest complete action path + code/tests
    ↓
VERIFY: functional + visual + keyboard + responsive + risk checks
    ↓
DELIVER: artifact + real evidence + gaps + responsible next action
```

Each arrow is a decision gate, **not** an instruction to create a report
file. QUICK tasks may collapse gates into a few sentences or an edit.

## Compact transfer of information

- **BRIEF → EXPLORE:** who, why, what is sacred, non-goals, success.
- **EXPLORE → DESIGN:** source evidence, content hierarchy, chosen
  direction and rejected alternative.
- **DESIGN → BUILD:** semantic tokens, component states, layout rules,
  accessibility requirements, assets and integration assumptions.
- **BUILD → VERIFY:** changed paths, runnable behavior, test method,
  known failures and the primary journey.
- **VERIFY → DELIVER:** actual results, prioritized defects,
  reproduction steps, caveats and missing checks.

For a simple correction, keep this context in the conversation. For
long projects, reuse an existing project plan or task tracker if the
user has one. **Do not create .mungtange/ files or JSON reports as a
dependency of following the skill.**

## Bounded repair and completion

If a gate fails, observe → reproduce → isolate root cause → minimal
fix → rerun. Do not silently change acceptance criteria. A genuine
blocker should be reported with what was attempted and what permission,
source or capability is needed.

A passing build does not equal a visual or accessibility pass. Actual
browser evidence is required to claim browser verification. A
permission boundary remains human-controlled.

## Relationship to the legacy CLI

The repository **also** retains an optional backwards-compatible Node
CLI with `plan`, `prompt`, `gate`, and `verify` commands. It may create
`.mungtange/` manifests and JSON reports for users who explicitly
choose that workflow. It is **not used by this prompt-only path** and
not shipped as a required dependency of this skill.

If users specifically ask about the legacy CLI, point them to the
repository's `docs/LEGACY-CLI.md`. Otherwise ignore it and finish the
requested task using the AI's available native tools.
