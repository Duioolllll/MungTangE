# Quality evaluation — verification rubric

This is an evaluation **contract**, not a promise that a human or browser
evaluation actually happened. A reviewer must attach real evidence.

## Weighting (100 points) — only if actual observations justify scoring

Do not score untested categories or invent test artifacts to make the sum add up. For a small change, report only checks relevant to that change. If no defect is observed, report 'none observed', not a fabricated remediation.

| Dimension | Points | Required evidence |
|---|---:|---|
| User task / information architecture | 20 | Journey completed with realistic content and measurable outcome |
| Visual craft / product-specific identity | 15 | Compared visual directions, typography, hierarchy, screens |
| Accessibility | 20 | Contrast readings, keyboard/focus, semantics, reduced motion |
| Responsive behavior | 15 | Captures at 375, 768, 1440 widths and overflow checks |
| Interaction completeness | 10 | Default/hover/active/disabled/loading/empty/error/success |
| Performance | 10 | Actual measurements of relevant pages, bundle/asset review |
| Maintainability | 5 | Reuse, consistent tokens, tests, no unnecessary dependencies |
| Evidence integrity | 5 | Reproducibility, citations, real files, no invented checks |

### Classification

- 90–100: ship candidate **only when no hard blockers**
- 75–89: needs polish before release
- 60–74: revise and rerun verification
- Below 60: design approach or implementation needs rework
- No measurement: **unscored**, never award default points.

### Non-negotiable blockers

- Core user journey fails.
- Critical contrast or keyboard trap/accessibility barrier.
- Known exposed secrets, unauthorized external network or unlicensed assets.
- Unreviewed destructive action or production deploy.
- Missing screenshot/test evidence when claiming visual/functional verification.
- Human owner hasn't approved release.

A 99-point score cannot override a blocker.

## Evidence files

Preferred:
- Source code paths and actual commits/patches.
- Test logs and exact commands/exit codes.
- Screenshot artifacts at three widths, annotated changes/diffs.
- axe-core or manually inspected accessibility results.
- Lighthouse/Performance insights with time/date and build context.
- Reviewer findings referencing exact components and user journeys.

Avoid unverifiable phrases like "beautiful", "perfect", "fully accessible".
Instead describe *what was checked* and *what remains uncertain*.
