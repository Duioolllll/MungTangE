# MungTangE Benchmark v1

**Real A/B evaluation harness, not a claim that MungTangE is better.**
The original SKILL.md remains unchanged. Browser tests and reports live
outside the installed Agent Skill.

## Design

| Dimension | Setup |
| --- | --- |
| Tasks | **10** frontend UI development jobs in [tasks.json](tasks.json) |
| Groups | **baseline** (ordinary agent prompt) / **mungtange** (same prompt + exact SKILL.md guidance) |
| Runner | **ONE configurable agent binary and ONE declared model**, used for both groups |
| Checks | **21** deterministic functional browser assertions |
| Browser | Playwright Chromium at **375, 768 and 1440px**, with screenshots |
| A11y | axe-core on mobile/desktop; serious/critical rule violations |
| Report | One JSON report, Markdown comparison and paired screenshot diffs |

Five headline measurements:

1. **Functional success:** passed held-out behavior checks / executed checks.
2. **Accessibility:** pages with zero axe serious/critical violations (375 and 1440px) / scored pages.
3. **Responsive:** tested viewport widths without document horizontal overflow / tested widths.
4. **Browser robustness:** pages without JS page errors, console errors or blocked external requests / scored pages.
5. **Work cost:** actual elapsed agent seconds, recorded by the runner. **Not USD or tokens**; provider billing is unavailable unless independently supplied.

Screenshots are captured for every scored output. A pixelmatch image per paired
task/viewport shows how renders **differ**. It is **not** a measure of design
quality. Add blind human review for subjective visual quality.

## Task list

| ID | Scenario |
| --- | --- |
| contact-form | Name/email/message validation and submission feedback |
| todo-list | Add, complete and delete tasks |
| faq-accordion | Three keyboard-operable disclosures |
| mobile-navigation | Narrow-screen menu, Escape dismissal and desktop layout |
| product-filter | Product category selection, search and reset |
| signup-validation | Local-only password confirmation and errors |
| sortable-table | Numeric sort, toggle direction and empty search |
| modal-dialog | Named modal, Escape and focus restoration |
| price-calculator | Quantity × unit price updates |
| keyboard-tabs | Click and arrow-key tab navigation |

All tasks use the same public acceptance rules and specific data-testid hooks
for both groups. These hooks remove flaky selector guessing, but mean the
suite measures compliance with a specified contract—not general web
development intelligence. All tasks use **static HTML/CSS/JS** to remove
framework/dependency confounds. No external API, CDN or network permitted.

## Install evaluator dependencies (optional)

The main skill and normal npm run verify have zero required runtime dependencies.
For browser evaluations use Node 22+ and install pinned dev dependencies:

~~~bash
npm install
npx playwright install chromium
npm run eval:smoke
~~~

On Ubuntu CI, use npx playwright install --with-deps chromium.

**eval:smoke runs only known passing/broken FAQ fixtures.**
It confirms that the test harness accepts actual working UI, rejects a
broken UI, runs axe, creates screenshots/diffs and produces an
INCOMPLETE report for missing real agent data. It is **not an A/B model test**.

## Run a real paired benchmark

1. Prepare twenty fresh isolated workspace directories:

~~~bash
npm run eval:prepare -- --run trial01
~~~

2. Configure your **actual installed** coding agent. Copy the Codex example,
   verify its flags with your CLI version and replace the model identifier:

~~~bash
cp evals/runner.codex.example.json evals/.runner.local.json
# Edit evals/.runner.local.json with a real model ID and command/flags.
~~~

Or use another CLI/adapter with the same interface:

~~~json
{
  "model": "EXACT_MODEL_ID",
  "command": "/path/to/your-agent",
  "args": ["--prompt-file", "{promptFile}", "--workspace", "{workspace}"],
  "stdin_prompt": false,
  "timeout_seconds": 600,
  "env": {}
}
~~~

The command runs with cwd={workspace}, not the MungTangE repository root.
Template args available: {promptFile}, {workspace}, {taskId}, {group}, {runId}.
Set stdin_prompt=true for CLI tools accepting the entire prompt on stdin.
All groups receive the same declared command/model/timeout/environment.
Only the mungtange group has SKILL.md embedded in its prompt and the four
optional reference files copied into its clean workspace.

**Security:** The runner launches real code agents; model calls can cost
money. It does not use shell=true, but the configured agent itself may
write files/run commands. Only run trusted configurations in a dedicated,
low-privilege machine/container; keep it away from production credentials.
By default the subprocess inherits a small set of nonsecret environment
variables, not every host secret. Add credentials through the runner config
only when necessary; **do not commit them**. It is the user's
responsibility to isolate the agent beyond the benchmark's workspace
convention. The static browser evaluator blocks external resource
requests; that is not a substitute for an OS sandbox for the code agent.

3. Invoke the SAME model/runner for both groups in counterbalanced order:

~~~bash
npm run eval:run -- --run trial01 --config evals/.runner.local.json
~~~

Each task runs at most once per group in a fresh workspace. If a model
fails, the failure stays in run.json; do not selectively retry only the
weaker group. Run another full paired trial to assess stability.

4. Evaluate actual outputs:

~~~bash
npm run eval:score -- --run trial01
~~~

Outputs (all under gitignored evals/.runs/trial01/):

- report.md — paired table with five observed metrics and completeness;
- report.json — raw scored checks, violation details, screenshot paths,
  runtime errors and metadata;
- artifacts/TASK/GROUP/{375,768,1440}.png — screenshots;
- artifacts/TASK/visual-diff-WIDTH.png — paired image differences;
- jobs/TASK/GROUP/agent.*.log — agent tool output and timings.

**Important:** If no real model has produced the twenty pages, the report
says **INCOMPLETE / NOT RUN**, not "MungTangE wins". If browser tooling is
missing, evaluation cannot be marked successful. A metric only covers
completed, browser-scored jobs; partial results must never be presented
as a comparable full-sample average.

## Fairness and limitations

- Same task text, selectors, environment, browser, timeout, agent,
  version and model for both groups. The additional MungTangE instruction
  text is the **treatment** and naturally consumes more input tokens.
- One run per task is exploratory. Re-run with new run IDs, alternate
  execution order, disable long-term memories/harness plugins where
  possible and compare paired results over **at least three trials**.
- The evaluator does not prove that the agent read every reference,
  or that the MungTangE instructions caused the outcome.
- No run is automatically performed on PRs: CI runs **fixture smoke tests**,
  not an external paid model. Real comparative agent execution always
  requires an explicit user-supplied runner configuration.
- Runtime seconds are a cost proxy. Compare actual provider token/dollar
  telemetry separately before claiming monetary savings.
- axe-core does not prove full WCAG compliance. Visual pixel differences
  do not assign a quality winner. Blind human review is necessary for
  subjective design quality.
- A generated app can still be unsafe; only evaluate trusted outputs in
  an isolated environment.

## Evals are deliberately separate from SKILL.md

The installed Agent Skill remains a portable prompt. No Playwright, npm
package, rubric JSON or browser is required when simply *using* it.
