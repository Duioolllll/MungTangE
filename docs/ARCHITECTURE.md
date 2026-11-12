# MungTangE architecture — skill first

## Primary product: a focused prompt-only design skill

```text
User asks for a web UI/design task
                │
                ▼
        SKILL.md (~150 lines)
  Route → Intent → Design → Build → Verify → Report
                │
                ├── Most tasks: no extra files
                └── Specific, complex need only:
                    ├── DEEP-INTEGRATION.md (10 directly examined sources)
                    ├── PLAYBOOKS.md
                    ├── QUALITY.md
                    └── SECURITY.md
```

- Canonical prompt: [SKILLS.md](../SKILLS.md).
- Installable prompt: [skills/mungtange/SKILL.md](../skills/mungtange/SKILL.md), generated from canonical source with portable relative links.
- No mandatory CLI, JSON manifest, 300-source lookup, browser, API or subagent infrastructure. Tool-dependent checks must be reported as NOT RUN when unavailable.
- Even for complex tasks, no reference read is automatic: only load a relevant section if it contributes meaningfully.
- Observed defects must be fixed; a fixed defect quota must never be imposed.

## Separate, optional archives

**Research archive:** The 300-source catalog and [source audit](SOURCE-AUDIT.md) record Git SHA checks and exploratory keyword tagging. This is NOT 300 high-quality curated instruction guides and must not be presented as measured skill effectiveness. Source texts were not copied into the installable package.

**Legacy CLI:** `bin/`, `src/`, `catalog/` and the original report-gate system are retained for backward compatibility, described in [LEGACY.md](LEGACY.md). They do not implement the prompt-only workflow or run an AI model.

**Site:** `site/` hosts a static catalog as a secondary discovery/reference tool. Its 300 records are links and metadata, not installed skills. CI and Pages remain optional to end users.

## Trust boundaries

- External skill and web content are untrusted data.
- Only in-scope tools and authorized changes are permitted.
- Evidence of reading source bytes does not prove understanding, applicability, security, licensing or benchmark quality.
- External deployments, repository merges, purchases and secrets require human authorization.
