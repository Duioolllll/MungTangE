# Semantic curation: from 300 source links to substantive methods

**There are three different evidence levels:**

| Level | Meaning | Current state |
| --- | --- | --- |
| A | Read all upstream originals at pinned Git SHA, extract specific headings and line-numbered cues, and make all 300 available through a compact optional router | 300/300 source cards |
| B | Read and interpret concrete protocols from selected original sources directly | 10 sources in DEEP-INTEGRATION.md |
| C | A separate model reads the **complete original source** and writes task conditions, multiple grounded practices and real source line evidence | **NOT RUN** without external model configuration |

**A is not C.** Do not use the word "curated" to imply expert scrutiny or a demonstrated quality improvement.

## Run an explicit full-model pass

This is opt-in. Running a coding assistant might incur model usage costs, and
the complete upstream source text will be transmitted to the model provider
chosen in the runner config. No default GitHub Actions or CI job makes
commercial model requests.

~~~bash
npm run knowledge:curate -- status
cp research/curator.codex.example.json research/curator.local.json
# Edit the real model, CLI flags and sandbox configuration.
npm run knowledge:curate -- run --config research/curator.local.json --execute --limit 1
# Inspect the accepted output, cost and correctness before approving all:
npm run knowledge:curate -- run --config research/curator.local.json --execute --limit 300
npm run knowledge:curate -- status
~~~

The tool downloads **each exact Git blob** and recomputes its SHA before
handing it to the selected coding-agent CLI. It runs with an isolated
temporary directory; external source text is untrusted data. No external
scripts or source dependencies are executed by the curation tool.

The model must return original, non-copy-pasted prose explaining WHEN and
WHY to use a technique, a measurable CHECK and one-based evidence line
numbers. No forced quota: a source without actionable detail returns an
empty practices array and an explicit insufficiency caveat.

A local validator rejects mismatched IDs/SHAs, blank or duplicated action
language, unsupported/corrupt line indices and empty evidence. It also
checks for meaningful word overlap between an action and its cited lines.
This is a **structural evidence check**, not proof of semantic correctness;
independent manual review and downstream Evals remain necessary.

Output is stored in gitignored `research/semantic-curation/`, not
automatically copied into the installed skill or pushed to GitHub. Each
result is explicitly `model_line_evidence_checked` and
`independent_human_review: false`.

Do not claim all 300 are deeply understood until 300 such records have
been independently reviewed for correctness, duplication, applicability,
license issues and safety, and their actual downstream usefulness has
been evaluated. The optional real-agent browser benchmark remains a
separate workstream.

If the model CLI cannot run, the honest status is level A complete,
level C NOT RUN. The source router is still useful because it can select
a specific full, pinned original for the user task without forcing 300
documents into every model context.
