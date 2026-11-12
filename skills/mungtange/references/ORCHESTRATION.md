# Multi-agent and long-task coordination — only when real tools exist

This file is **optional**. The base skill works with one AI in one
conversation. Specialist roles can be reasoning lenses and **must
not** be portrayed as actual independent workers unless the platform
really spawned them.

## Activation test

Use delegation only when (a) available agent tools genuinely support
it, (b) independent work is substantial, and (c) boundaries are
known. For one CSS file or a small page, a single implementer is
usually faster and more reliable.

Default to one accountable coordinator and up to three concurrent
bounded workers for genuinely independent tasks. This is a
conservative suggestion, not a tool platform limit.

## Dependency-first task graph

Write a short contract for each delegated task:

```text
TASK / objective:
DEPENDS ON / completed prerequisites:
OWNER / exclusive files or read-only scope:
INPUT / grounded context, actual paths and constraints:
OUTPUT / concrete patch, finding or research notes:
ACCEPT / observable test and quality criteria:
STOP / forbidden actions, budgets and escalation path:
```

Parallelize independent read-only research, accessibility checks
or nonoverlapping code areas. Do **not** have two code writers edit
the same file concurrently. A critic should not silently certify
its own implementation as independent QA.

Coordinator integration:
1. Fix shared interface contracts before delegating.
2. Keep file ownership disjoint; isolate writable branches/worktrees
   if available.
3. Merge mental results/patches only after dependency checks and
   actual validation.
4. Failed prerequisites block downstream tasks.
5. Retry a focused issue at most twice before revising the plan
   or reporting a blocker.
6. Keep evidence, known gaps, cost and approvals visible.
7. Only a legitimately authorized human approves releases, merges,
   paid tool calls and irreversible steps.

When tools are unavailable, follow the same analysis sequence yourself
without fictional subagent statuses, merges, CI or external calls.
The user asked for a better result, not an imaginary army.
