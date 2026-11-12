# Legacy CLI output and report contract (OPTIONAL)

> **CLI-only:** The prompt-first SKILL.md does not require these files, JSON schemas, or the `.mungtange/` directory. Read this reference only when the user explicitly chooses the legacy Node CLI workflow.

The **optional legacy CLI** generates files in project-relative `.mungtange/`.

## Strict stage report example

Use the generated template `reports/<stage>.example.json`. Copy to
`reports/<stage>.json` and update **all** check keys. Example only:

```json
{
  "stage": "brief",
  "run_id": "actual UUID from manifest.json",
  "status": "passed",
  "checks": {
    "audience": true,
    "outcome": true,
    "constraints": true,
    "success_criteria": true
  },
  "evidence": ["docs/real-audience-interviews.md"],
  "reviewer": "name of a person/agent who reviewed this",
  "notes": "Decision, unresolved caveats and direct references.",
  "approved_by_human": false
}
```

### Invariants enforced by the CLI

- Stage matches requested stage; run_id matches current manifest.
- Status is exactly `passed`; all required check values are literal booleans `true`.
- Non-placeholder reviewer name.
- At least one evidence path; every path must exist within project root
  and not be a direct symlink.
- All previous stage reports must also pass.
- `ship` requires `approved_by_human: true`.

### What the CLI cannot prove yet

The CLI **cannot** determine whether interview evidence is genuine,
the reviewer is independent, screenshot shows correct UI, or a test
log came from a genuine command. Flag this limitation before calling
anything "verified".

## Review finding format

```json
{
  "id": "UI-001",
  "severity": "critical|major|minor|nit",
  "category": "a11y|visual|interaction|responsive|performance|content|security",
  "location": "src/components/Form.tsx:45",
  "impact": "Keyboard user cannot submit form",
  "evidence": "artifacts/a11y/form-keyboard.mp4",
  "suggested_fix": "Use semantic button with keyboard activation",
  "status": "open",
  "confidence": "high"
}
```

## The human handoff

1. **Done:** file paths and summary.
2. **Evidence:** output generated from actual execution, including failures.
3. **Still open:** severity, owner, next action and risk.
4. **Source and license:** external material added or used.
5. **Approval:** who authorized production release.

No fabricated metrics, citations, screenshots, browser visits or
"tests passed" claims. When evidence is absent, keep `status: pending`.
