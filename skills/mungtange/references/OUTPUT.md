# Truthful output and evidence — optional handoff reference

This describes **human-readable results** for the prompt-only
workflow. No file, JSON schema, run ID or CLI is required.

## Delivery for implemented UI work

```text
RESULT: What the user can now do.
CHANGED: Actual edited paths, generated artifacts, or supplied code.
DESIGN: Only meaningful visual/product decisions.
CHECKED: Commands/tests/manual flows performed, with results.
NOT RUN: Checks that could not be performed and why.
OPEN: Highest-risk remaining defects or unknowns.
NEXT: Only required user approval or follow-up action.
```

For small changes, this can be two sentences. Do not force a table
or format when a concise response works better.

## Findings for audit-only requests

| Field | Expectation |
| --- | --- |
| Severity | critical / major / minor / polish |
| Location | Exact file:line if inspected, otherwise actual UI location |
| Impact | Which user or task is affected |
| Evidence | What was truly observed, not inferred |
| Fix | Concrete remedy, not "improve UX" |
| Confidence | Optional; label assumptions and untested concerns |

Report higher-severity issues first. Separate observed defects from
suggestions or hypotheses.

## Evidence vocabulary

- **PASS:** actually performed and met stated criterion, with method.
- **FAIL:** actually performed and failed, with reproduction.
- **NOT RUN:** tooling, time or source unavailable.
- **BLOCKED:** external approval, security constraint or missing
  essential prerequisite prevented completion.

A successful linter is not proof of a good mobile layout; an existing
screenshot does not prove current browser behavior; JSON booleans do
not prove the reviewer inspected the result.

## External actions

Do not report a PR, deployment, production release or paid tool action
as complete unless the tool confirms it. Link actual artifacts when
available. Record human authorization for high-risk release steps.

**Legacy, opt-in mode:** The repository has a separate Node CLI that
creates a `.mungtange/` directory and validates structured stage
reports. That contract is documented in `docs/LEGACY-CLI.md` at the
repository root, and **does not apply to this skill by default**.
