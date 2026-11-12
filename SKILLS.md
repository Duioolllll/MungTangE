# MungTangE — field guide

**Entry point:** [`skills/mungtange/SKILL.md`](skills/mungtange/SKILL.md). It is the one first-party installable skill; the 300 catalog records are research references, not 300 separately installed skills.

## Invoke

~~~bash
npx skills add Duioolllll/MungTangE --skill mungtange
# or use its CLI
npx --yes github:Duioolllll/MungTangE init --agent all
~~~

## Routing rubric

| User request | Start | Specialist emphasis | Exit proof |
| --- | --- | --- | --- |
| Build new page | brief | user goal → visual direction → vertical slice | interaction tests + screenshots |
| Redesign | brief | preserve behavior, redesign states | before/after inspection |
| UI review | audit after snapshot | a11y, responsive, content, defects | severity + source locations |
| Design system | system after brief | semantic tokens and variants | examples and component-state matrix |
| Screenshot/Figma to code | research | faithful hierarchy, provenance | stated fidelity gaps and viewport evidence |
| Agent workflow | brief | DAG, ownership, gate conditions | reproducible manifests and fail-closed tests |

## Contract

1. Inspect code and user constraints first; do not claim a model or browser was run without evidence.
2. Select references using `plan`, then **review source/license before borrowing**.
3. Keep each stage's deliverables in `.mungtange/` with a unique run ID.
4. Allow parallel tasks only if their dependencies and file ownership do not overlap.
5. Separate the creator from the independent verifier.
6. Block deployment/merge until security and QA pass and a human authorizes it.
7. Report outcomes, evidence, unresolved issues, changed files and next owner.

## Read only what is relevant

- [Pipeline and owner contracts](skills/mungtange/references/PIPELINE.md)
- [Quality gates](skills/mungtange/references/QUALITY.md)
- [Security constraints](skills/mungtange/references/SECURITY.md)
- [Machine-readable output](skills/mungtange/references/OUTPUT.md)
- [Task playbooks](skills/mungtange/references/PLAYBOOKS.md)
- [Research and engineering provenance](docs/UPSTREAMS.md)
- [GitHub Actions deployment](docs/DEPLOYMENT.md)

**Reminder:** A 100-point score and a green-shaped JSON file are not proof that the experience works. Actual tests, screenshots and independent review are required.
