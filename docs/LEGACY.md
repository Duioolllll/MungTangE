# Optional legacy tools and source archive

**MungTangE's main deliverable is a prompt-only Agent Skill.**
Nothing here is required to use `skills/mungtange/SKILL.md`.

## Legacy Node CLI

The pre-existing `bin/mungtange.js` / `src/` toolkit contains project inspection, metadata ranking, task packet generation and JSON-shaped gate checks. It **does not call an LLM**, run autonomous agents or prove screenshots and accessibility.

Commands such as `doctor`, `init`, `catalog`, `plan`, `prompt`, `gate` and `verify` are kept for compatibility. Their report format is in [OUTPUT.md](legacy/OUTPUT.md); the research pipeline background is [PIPELINE.md](legacy/PIPELINE.md). These conventions do **not** apply to ordinary prompt-only usage.

## Source corpus audit

The `catalog/` records are 300 Git references, not 300 reviewed or bundled skills. `research/source-audit.json` is a reproducibility record for Git blob SHA verification. It belongs to repository research, not the installed skill.

The exploratory keyword topic counts had low selectivity and can include false matches. They are no longer used for skill routing, proof quotas, or "300-skill synthesis" claims.

Re-run network checks only when maintaining the research corpus; day-to-day users should not need a GitHub token or network.

## Website

The optional GitHub Pages site displays the catalog for discovery. Visiting it is neither required nor part of skill installation.
