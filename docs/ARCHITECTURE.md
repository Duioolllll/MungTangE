# Architecture: MungTangE pipeline

## Responsibilities and trust boundaries

~~~text
                 local user goal + project snapshot
                                 │
          ┌──────────────────────▼─────────────────────┐
          │ first-party CLI / skill: task classifier   │
          │ scanProject → loadCatalog → selectSkills   │
          └──────────────────────┬─────────────────────┘
                                 │
                      metadata only (no imports)
                                 ▼
             100 design | 100 model output | 100 web
                     provenance + SHA + heuristic
                                 │
                                 ▼
       brief ─gate─ research ─gate─ system ─gate─ build
          └───────── run manifest + decisions ─────────┘
                                 │
                          independent audit
                                 │
                       human release approval
                                 ▼
                          ship / handoff

  main → CI/Node tests → deterministic static build → Pages
  PR   → CI/Node tests → preview artifact NOT deployed
~~~

The upstream 300 are **candidates for discovery**, not runnable plugins. The only installable first-party skill is `skills/mungtange/SKILL.md` with local references. The app/site does not ingest or render remote Markdown.

## Source-of-truth files

| Layer | Source of truth | Output |
| --- | --- | --- |
| Skills catalog | `catalog/{design,model-output,web}.json` | metadata loaded by `src/catalog.js` |
| Ranking | `src/catalog.js` | context-specific selections |
| Project profile | `src/project.js` | framework/language detection |
| Lifecycle | `src/pipeline.js` | `.mungtange/manifest.json` and six report templates |
| Installation | `src/install.js` | first-party skill copied to Codex/Claude/OpenCode paths |
| CLI | `bin/mungtange.js` | commands and nonzero exit on failed gates |
| Web catalog | `scripts/build-site.mjs` | generated `site/catalog.json` |
| UX | `site/index.html` + CSS/JS | filterable, static GitHub Pages front end |
| QA/CI | `scripts/verify-catalog.mjs` + tests | schema, link allowlist, build integrity |

## Data contract

An upstream item has `id`, `name`, `category`, `source_repo`, `source_path`, `source_url`, `blob_sha`, `fit_score`, `tags`, `reviewed`. A file recorded in Git's tree is **not** necessarily safe or compatible.

Selection uses task words, stack detection, source diversity, and a heuristic score. Do not describe `fit_score` as star count, empirical effectiveness, or security confidence.

Stage reports require the correct run ID, a reviewer name, all required boolean checks and existing local evidence paths. This is structural validation, not a claim that artifacts were independently inspected. `ship` additionally requires recorded human approval.

## Multi-agent scheduler policy

Use a directed acyclic graph with one coordinator and bounded workers. Each task contract must include `id`, `depends_on`, `owner`, `owned_paths`, `inputs`, `outputs`, `verify_commands`, `risk` and `rollback`. Schedule only tasks whose dependencies passed and whose owned paths are disjoint. A critic cannot mark its own generated output independently verified.

### Fail-closed state changes

- `pending → running`: owner assigned and prerequisites passed
- `running → evidence-ready`: files and test logs exist
- `evidence-ready → verified`: independent reviewer reproduced checks
- `verified → approved`: relevant human approval received
- `any → blocked`: license uncertainty, unsafe request, failed test, conflict or stale report

A failed step returns to its owner with a reproduction path, not to a blind regeneration loop. Bounded retries (default two), explicit review, no silent overrides.

## Release boundaries

Pages is a read-only display of repository data. No page can authorize a merge. The CI workflow uses read permission. The Pages workflow obtains only the additional GitHub Pages/OIDC permissions needed for GitHub deployment. Branch protection and Pages source selection are manual repository-admin controls.
