# Contributing

Thank you for helping improve MungTangE. This is a **quality-first** reference library, not a place to inflate skill counts.

## Proposals

- Open an issue with the user problem, project/stack, source URL, exact commit or blob SHA, and expected benefit.
- Explain novelty relative to existing references, plus known duplicates.
- For upstream entries, document license status and review status honestly. Link-only is preferred unless redistribution is clearly allowed.
- Never silently execute external skills, npm install hooks, shell snippets, or network tools.
- For a first-party skill edit, provide one success case, one failure case, a reviewer and a concrete verification procedure.

## Pull request checklist

- [ ] `npm run verify` passes locally
- [ ] Every displayed fact or provenance statement is accurate
- [ ] No unlicensed third-party content was copied
- [ ] No secrets, private information or unsafe remote code were added
- [ ] Pages view remains keyboard-accessible and usable at 375, 768 and 1440 px (attach real evidence if tested)
- [ ] CLI backwards compatibility is preserved or breaking changes documented
- [ ] Scope and rollback plan are clear

A PR should target `main`; do not bypass checks or merge on a self-declared pass.

## Canonical skill editing

Edit `skills/mungtange/SKILL.md`, not the generated root `SKILLS.md`. Keep the entrypoint under 500 lines and link task-specific depth from `skills/mungtange/references/`. Run `npm run build:skill` to refresh the root view, then `npm run verify` to ensure links, source/derived consistency and CLI backward compatibility. Prompt mode must never require the optional legacy CLI or `.mungtange/` reports.
