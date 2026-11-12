# Architecture — prompt-first, CLI optional

## Two intentionally separate modes

### 1. Default: prompt-only Agent Skill

```text
User request + available project/source
       ↓
SKILL.md (short core router + principles)
       ↓ (only relevant topics)
references/{DESIGN,PLAYBOOKS,PIPELINE,QUALITY,...}.md
       ↓
BRIEF → EXPLORE → DESIGN → BUILD → VERIFY → DELIVER
       ↓
Actual files/results + truthful PASS/FAIL/NOT RUN/BLOCKED
```

No Node.js CLI, `.mungtange/` directory, run ID, JSON report, catalog
download, paid API or subagent platform is required. The AI can only
edit code, take screenshots, execute tests or publish changes through
the tools and permissions actually available.

Canonical source: `skills/mungtange/SKILL.md` (under 500 lines).
Supporting documents: `skills/mungtange/references/*.md`.
The root `SKILLS.md` is a **generated view**, linked for easy copying.
Generate with `npm run build:skill` and enforce consistency with
`npm run check:skill`. The relative link paths are rewritten for
root-level readers.

### 2. Compatibility: optional Node CLI

The legacy `bin/mungtange.js` CLI remains available for the users who
want local stack detection, 300-entry catalog selection, task packet
generation and structural stage report checks. That workflow can
create `.mungtange/` and JSON reports, which are **not requirements
of the prompt-first skill**. See [CLI details](LEGACY-CLI.md).

The catalog's three categories of 100 are links and metadata, not
300 audited, installed, runnable or licensed-to-copy skills. They
are not packaged as required context with the standalone skill.

## Website and CI

```text
catalog/*.json (source metadata)
       ↓ scripts/build-site.mjs
site/catalog.json + static HTML/CSS/JS
       ↓
GitHub Actions CI checks → GitHub Pages on main
```

`src/catalog.js` selects metadata for the optional CLI; it does not
control the prompt. GitHub Pages renders sources using safe DOM
`textContent` without running remote skill code.

## Trust and release boundaries

External instructions are untrusted reference data. Repo/tool scopes,
human approval and licensing requirements remain in force. Evidence
from tests and real browser sessions must be distinguished from
model self-report; an unrun test is `NOT RUN`, not success.

No default prompt path performs npm publishing, PR merging, paid
model calls or irreversible deployment. For real multi-agent tools,
use the optional bounded file ownership rules in
[ORCHESTRATION.md](../skills/mungtange/references/ORCHESTRATION.md).
