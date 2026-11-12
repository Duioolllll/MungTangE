# Upstream comparison and provenance

This is a **specific comparison of reviewed examples**, not a claim that every one of the 300 catalog entries has been individually quality-audited. Sources were inspected on 2026-11-12; upstreams may change.

| Reference | Observed design pattern | MungTangE adaptation |
| --- | --- | --- |
| [Anthropic skills](https://github.com/anthropics/skills) | Self-contained directory with `SKILL.md` frontmatter; supporting scripts/references | First-party skill is portable; optional references colocated inside its folder |
| [Vercel skills CLI](https://github.com/vercel-labs/skills) | `npx skills add owner/repo --skill name`, agent-specific install paths | Support the standard installer **and** a separate GitHub-run CLI |
| [Vercel react-best-practices](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices) | High-impact performance checks are prioritized (waterfalls, bundle, rerenders) | Use framework-aware checks, don't force React patterns on Django/Vue |
| [Vercel web-design-guidelines](https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines) | UI findings and guidance tied to concrete files | Audit requires defect location, severity, evidence and remediation |
| [Superpowers](https://github.com/obra/superpowers) | Design → plan → isolated work → test → review → finish | Stage gates, bounded ownership and independent critique |
| [Addy Osmani agent-skills](https://github.com/addyosmani/agent-skills) | Spec → plan → build → verify → review → ship lifecycle | Explicit handoff packets and user-visible release proofs |
| [VoltAgent awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) | Broad curated discovery across organizations, with source links | Keep discovery separate from trusted execution; preserve upstream credit |
| [Agent Skills standard](https://agentskills.io/specification) | Name/description frontmatter and progressive disclosure | A small entrypoint with richer local reference files |

For task execution, read only the relevant [design](../skills/mungtange/references/DESIGN.md), [pipeline](../skills/mungtange/references/PIPELINE.md), or [orchestration](../skills/mungtange/references/ORCHESTRATION.md) reference. The installed Agent Skill does not require or bundle the 300-item source catalog.

## What is actually verified

**Dataset-level verified by repository checks:** 300 entries, three categories of 100, unique IDs, 40-character hexadecimal blob IDs, a GitHub source URL, a source path ending in `SKILL.md`, category alignment, no invalid local build output.

**Not asserted:** 300 independent functionality tests, 300 license grants, verified contributor popularity rankings, reproducible performance of each upstream skill, or runtime safety of external scripts.

## The three lanes

- **Design (100):** visual direction, UX research, design systems, typography, accessibility and critique.
- **Model output (100):** prompts, evaluation, tool use, orchestration, context strategy, code review and failure handling.
- **Web (100):** frontend implementation, interface review, browser testing, interactions, rendering and performance.

A candidate's `fit_score` is an authored heuristic for topic relevance. The page labels its review state. Importing source text requires license checking and human approval. For missing or changed source links, open an issue; never silently synthesize an upstream artifact.

## Why the model does not ingest 300 full skills

Mass-loading is slow, costly and vulnerable to contradictory instructions. MungTangE instead chooses a few likely relevant pointers, checks originals when needed, creates a bounded plan, and evaluates the concrete output. The design is **higher-signal retrieval with explicit gates**, not a claim of magical skill fusion.
