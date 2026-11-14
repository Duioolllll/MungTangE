# Roadmap and acceptance

## Phase A — Foundations (delivered in this PR after merge)

- Search/filter/static Pages UI generated from repository-local catalog.
- Two reproducible installation paths, documented without npm publication claims.
- Source provenance and security boundaries surfaced in site and docs.
- CI audit and a restricted Pages workflow.

## Phase B — Provenance and curation

- Human review each highest-priority reference for license, scripts, safety and actual behavior.
- Record `reviewed_at`, license evidence, reviewer, pinned upstream commit and expected stack.
- Add duplicate detection beyond unique IDs (same skill across multiple repos).
- Flag stale/removed source links with non-executing scheduled checks and a maintainer review queue.

## Phase C — Evaluation harness

- Golden task datasets for UI, design review, agent output and web implementation.
- Deterministic assertions plus real browser snapshots at 390/768/1440.
- Independent reproduction logs; security and accessibility blockers cannot be averaged away.
- Measure prompt/context budget, failure rates and task completion, with published methods.

## Phase D — Bounded agent scheduler

- JSON task DAG schema and conflict-free path leasing.
- Deterministic integration queue, back-pressure and retry caps.
- Cross-branch CI matrix, human approval and audit trails.
- No uncontrolled 50+ worker stampede on one repository.

## Exit criteria

The site is not "done" merely because a deployment URL exists. The owner should require a passing Actions run, real browser smoke tests, keyboard and mobile review, source link spot checks and acknowledgment of unreviewed catalog entries. Each phase must attach evidence before claiming completion.

## Phase E — identity-specific evaluation (not yet benchmarked)

- Assemble permissioned, first-party briefs for at least three genuinely different owners/projects within the same category (e.g. three developer blogs).
- For each, compare generic baseline, MungTangE without identity context, and evidence-led MungTangE with the substitution test.
- Require actually rendered 1440/768/390 screenshots, real content, keyboard flow, mobile font/line-height observations and independent blind judgments.
- Record whether swapping the owner's name/avatar leaves a misleadingly plausible site. Check artifact specificity and content hierarchy, not merely visual attractiveness.
- Publish results, run conditions, failures, token/time costs and reviewer disagreements. No unrun benchmark receives a score.
