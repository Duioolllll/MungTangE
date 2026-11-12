# Legacy Node CLI — optional compatibility workflow

> This page documents the **optional first-party CLI** retained for
> existing users. It is **not required to use MungTangE SKILL.md**.
> Prompt-only work follows the core skill and on-demand references,
> without installing Node, generating JSON, or running `gate` commands.

## Running the optional CLI

```bash
npx --yes github:Duioolllll/MungTangE doctor
npx --yes github:Duioolllll/MungTangE init --agent codex
npx --yes github:Duioolllll/MungTangE plan --goal "Specific website result"
npx --yes github:Duioolllll/MungTangE prompt --stage brief
npx --yes github:Duioolllll/MungTangE gate --stage brief
```

This CLI scans local files, selects reference metadata and writes
`.mungtange/` task packets. **It does not call AI models, render
websites, run Playwright or verify the truth of claims.**

## Structured stage reports (CLI mode only)

The optional `plan` command creates `.mungtange/manifest.json` and
`reports/<stage>.example.json`. A report may look like:

```json
{
  "stage": "brief",
  "run_id": "actual run ID from manifest",
  "status": "pending",
  "checks": {
    "audience": false,
    "outcome": false,
    "constraints": false,
    "success_criteria": false
  },
  "evidence": [],
  "reviewer": "REPLACE_WITH_REVIEWER",
  "notes": "Fill only after real work",
  "approved_by_human": false
}
```

Copy the template into `reports/<stage>.json` and change fields
only when actual checks and evidence support them. The CLI verifies
stage/run identity, declared checks, evidence path existence and
earlier gate reports. For `ship` it also checks the reported
`approved_by_human` flag.

**These are structural assertions, not empirical truth.** The CLI
cannot establish real reviewer independence, a genuine screenshot
or the provenance of a test result. Browser QA and human approval
are outside its capabilities.

## Separation of concerns

| Prompt-first skill | Optional CLI |
| --- | --- |
| One short `SKILL.md` entrypoint + on-demand references | Node.js runner + generated task packets |
| No mandatory files or commands | `.mungtange/` workspace and report schemas |
| Results in natural-language evidence | JSON report structure checks |
| Uses whatever safe tools already exist | Does not automatically run a model |

Do not mix the CLI's structured report requirements into ordinary
prompt-only tasks. If a user chooses CLI mode, report it as such.
