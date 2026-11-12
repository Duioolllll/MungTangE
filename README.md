# MungTangE 뭉탱이

**300 provenance-linked upstream skill references · one original design-to-code harness · evidence gates.**

MungTangE is a **reference-aware workflow**, not a bundle of 300 copied or automatically executed skills. It routes a design or frontend request through six checkpoints, produces explicit task packets, and blocks unverified completion claims. The catalog is split into 100 design, 100 model-output and 100 web entries. All original sources are credited; catalog inclusion is **not** an endorsement, security audit, license clearance, or performance benchmark.

[Explore the catalog](https://duioolllll.github.io/MungTangE/) · [Architecture](docs/ARCHITECTURE.md) · [Source analysis](docs/UPSTREAMS.md) · [Security](SECURITY.md)

## Quick start

Requires Node.js 20+ for the first-party CLI. The open `skills` installer has its own, possibly higher, runtime requirement.

~~~bash
# Run the repository CLI directly without npm publishing
npx --yes github:Duioolllll/MungTangE doctor
npx --yes github:Duioolllll/MungTangE init --agent all
npx --yes github:Duioolllll/MungTangE plan --goal "Build an accessible, distinctive school dashboard"
npx --yes github:Duioolllll/MungTangE prompt --stage brief

# Or install the standalone, portable Agent Skill (different CLI)
npx skills add Duioolllll/MungTangE --skill mungtange
~~~

**Security note:** `npx` resolves executable packages from a third party; inspect sources and pin a reviewed commit for sensitive projects. None of MungTangE's own commands invoke remote AI models, install upstream references, or execute upstream scripts.

## Workflow

~~~text
INSPECT
   ↓
BRIEF → RESEARCH → SYSTEM → BUILD → AUDIT → SHIP
  gate     gate       gate     gate     gate     human approval
~~~

| Stage | Required artifact | Failure policy |
| --- | --- | --- |
| Brief | User, outcome, scope and acceptance criteria | Stop on uncertain scope |
| Research | Real sources, two differentiated design directions | No uncited reference claims |
| System | Tokens, states, responsive rules and interactions | No undocumented assumptions |
| Build | End-to-end vertical slice, tests and changed-file list | Failing test blocks advancement |
| Audit | Screenshots, keyboard, contrast and performance evidence | Independent review required |
| Ship | Changelog, rollback, residual risks, explicit human approval | No silent deployment or merge |

Use `mungtange gate --stage audit` only **after** real evidence has been written. The CLI checks the shape and existence of reports, **not** whether a screenshot, benchmark or user study is truthful.

## Core commands

| Command | Purpose |
| --- | --- |
| `doctor` | Check environment and detect project stack |
| `catalog --category design --limit 10` | Explore upstream references |
| `init --agent codex,claude,opencode` | Copy the first-party skill locally |
| `plan --goal "..."` | Rank references, create a run manifest and task packets |
| `prompt --stage build` | Generate stage-specific agent instructions |
| `gate --stage audit` | Verify declared report structure and dependency gates |
| `verify` | Validate all six stage report structures |

## GitHub Pages

The site is a dependency-free, accessible static catalog: search, category filters, source links and a visual pipeline explanation. Its `catalog.json` is generated **from the existing catalog** — never hand-edited.

~~~bash
npm run verify
python3 -m http.server 8080 --directory site
# open http://localhost:8080
~~~

After merging the Pages workflow, set repository **Settings → Pages → Build and deployment → Source: GitHub Actions**. See [deployment details](docs/DEPLOYMENT.md). The URL above is an intended destination, **not a claim that Pages is already enabled**.

## Design principles

1. **Reference before execution**: source URLs and Git blob SHA are traceability, not permission to run.
2. **3–5 relevant specialties, not 300 agents**: rank context fit, isolate write ownership.
3. **Make failure visible**: missing evidence stays pending; never fabricate checks.
4. **One owner per edit surface**: parallel research is useful, parallel writes to the same file are not.
5. **Human release authority**: external actions require authorization.

See [SKILLS.md](SKILLS.md) for the field guide and [the main Agent Skill](skills/mungtange/SKILL.md) for the detailed behavior specification.

## Development

~~~bash
npm run check        # existing CLI checks and Node tests
npm run build:site   # generate site/catalog.json deterministically
npm run lint:catalog # catalog provenance and site contract checks
npm run verify       # all of the above
npm run smoke        # existing CLI smoke commands
~~~

No external npm dependencies are required. The repository package is currently **not claimed to be published on npm**. `npx --yes github:...` runs the GitHub package, while `npx skills add` invokes Vercel's independent skills installer.

## Contributing and licensing

Original MungTangE code, site and documentation are MIT-licensed (see [LICENSE](LICENSE)). Upstream skills remain owned and licensed by their respective authors and are **not relicensed by this repository**. Contributions require source provenance, appropriate license review, and truthful verification evidence. See [CONTRIBUTING.md](CONTRIBUTING.md).
