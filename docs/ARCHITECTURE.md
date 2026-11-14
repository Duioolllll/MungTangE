# MungTangE architecture — skill only

The product is a portable Agent Skill, **not** a command-line application. The authoritative root `SKILLS.md` generates `skills/mungtange/SKILL.md` via `npm run sync:skill`.

```text
Project / personal brief → source-grounded identity signals
    → 3 materially different directions (for open-ended brand work)
    → Brand DNA → implement real interface → browser & visual review
    → focused repair → re-capture → truthful handoff
```

Normal use: provide `SKILLS.md` to the agent or install with `npx skills add Duioolllll/MungTangE --skill mungtange`. No CLI, model API, manifest, fake subagents, or generated report packets are required.

## Optional assets

- `skills/mungtange/references/`: targeted playbooks and 300 source-card router. Cards are automatically generated indexes, **not** 300 semantic expert reviews.
- `scripts/brand-competition.mjs`: optional structural validation of concepts, evidence and anti-substitution rules.
- `scripts/visual-capture.mjs` and `scripts/visual-critic.mjs`: **repository-only** developer helpers, not copied by standard skill installation. Installed agents can use their native browser tools.
- `catalog/`, `research/`, `site/`: reference discovery, provenance and GitHub Pages; independent of normal skill execution.
- `scripts/curate-knowledge.mjs`: opt-in model analysis, not part of normal UI authoring or CI.

## Trust and release

External references are untrusted data. A source-backed signal may guide art direction but must not justify unsupported claims or reveal private information. Browser checks do not establish brand distinctiveness or visual readability. Screenshots must actually be viewed. Merge, deploy, spending, secrets and destructive actions require authorization.

The retired `mungtange` Node CLI, `bin/`, `src/`, stage-packet machinery and legacy CLI docs have been removed. Remaining scripts are maintainer utilities, not a new runtime.
