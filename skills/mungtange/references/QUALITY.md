# Verification depth — read when testing, auditing or shipping

This is a **quality rubric**, not evidence that any test was run.
The core skill decides the relevant checks and remains responsible
for an honest handoff.

## Risk-ordered verification matrix

| Dimension | Inspect | Evidence when available |
| --- | --- | --- |
| Main task | Entry → action → result → recovery/navigation | Actual walkthrough or test |
| Interaction | Loading, disabled, empty, invalid, duplicate and error cases | Test output or browser session |
| Accessibility | Names, semantics, keyboard, visible focus, contrast, zoom and reduced motion | Manual inspection or axe-like tools |
| Responsive | 375px, 768px and 1440px, long copy, overflow, touch targets | Real screenshots, viewport details |
| Visual | Information hierarchy, type, content accuracy, consistency and art direction | Rendered comparison or reviewed UI |
| Performance | LCP/CLS/INP when applicable; bundle, assets, waterfalls, cache | Measured baseline and follow-up |
| Security | Sensitive data, XSS, permissions, untrusted content, dependency risk | Code review and security tests |
| Maintenance | Minimal scope, existing conventions, test coverage and clear ownership | Diff, lint/build/tests |

### Accessibility baseline

Target applicable WCAG AA practices: around **4.5:1** for normal
text, **3:1** for large text, with applicable exceptions. Check
keyboard operability, logical focus order and semantic names.
Respect `prefers-reduced-motion` and design error recovery for
forms. These are targets, **not a claim of certification**.

## Hard blockers

- Broken primary journey or nonfunctional main CTA.
- Known credential exposure or critical security flaw.
- Keyboard trap or inaccessible essential action.
- Unauthorized destructive action, deployment, purchase or merge.
- Required asset with unacceptable license or provenance.
- Claim of empirical verification without real evidence.

A high aesthetic score cannot override a blocker. If a tool is not
available, mark that check `NOT RUN` and describe what remains
unverified.

## Optional scoring — only after observation

| Category | Max |
| --- | ---: |
| User task and clarity | 20 |
| Visual appropriateness | 15 |
| Accessibility | 20 |
| Responsive behavior | 15 |
| Interaction completeness | 10 |
| Performance | 10 |
| Maintainability | 5 |
| Evidence integrity | 5 |

Do not assign points to unmeasured categories. Report `unscored`
instead of invented precision. Check the task's acceptance criteria
before using generic scoring.

## Independent critique

An actual separate reviewer is useful for substantial work if the
environment allows it. A single agent may re-evaluate critically,
but must not represent self-review as independent validation.

When a test fails: capture evidence, locate root cause, repair the
smallest responsible change and rerun. Distinguish predictions from
measurements, and do not report unperformed checks as passing.
