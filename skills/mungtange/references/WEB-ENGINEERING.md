# Frontend engineering — sourced practice playbook

> Generated from SHA-verified upstream content using **automated lexical signals**. Apply judgment. A keyword match alone is not an endorsement or an expert evaluation.

## W1 — Network and async critical path

**Action:** Remove unnecessary sequential requests on the critical path.

**Proof:** Show measured change in critical-path or request timings.

**Provenance:** 63 sources matched. [build-threejs-scroll-worlds](https://github.com/MengTo/Skills/blob/HEAD/agent-skills/web-design/build-threejs-scroll-worlds/SKILL.md) · [optimize-web-animations](https://github.com/MengTo/Skills/blob/HEAD/agent-skills/codex/optimize-web-animations/SKILL.md) · [url-to-motion-design](https://github.com/MengTo/Skills/blob/HEAD/agent-skills/media/url-to-motion-design/SKILL.md)

## W2 — Bundle and loading budget

**Action:** Reduce shipped client code and defer noncritical work.

**Proof:** Inspect real bundle/network output rather than assuming speed.

**Provenance:** 36 sources matched. [build-awwwards-quality-sites](https://github.com/MengTo/Skills/blob/HEAD/agent-skills/web-design/build-awwwards-quality-sites/SKILL.md) · [build-threejs-scroll-worlds](https://github.com/MengTo/Skills/blob/HEAD/agent-skills/web-design/build-threejs-scroll-worlds/SKILL.md) · [explain-interface](https://github.com/jakubkrehel/skills/blob/HEAD/skills/explain-interface/SKILL.md)

## W3 — React state and rendering

**Action:** Localize state and avoid unnecessary rerendering.

**Proof:** Use profiler or regression evidence where practical.

**Provenance:** 126 sources matched. [critique-brand-consistency](https://github.com/Owl-Listener/designer-skills/blob/HEAD/visual-critique/skills/critique-brand-consistency/SKILL.md) · [design-debt-audit](https://github.com/Owl-Listener/designer-skills/blob/HEAD/design-ops/skills/design-debt-audit/SKILL.md) · [component-spec](https://github.com/Owl-Listener/designer-skills/blob/HEAD/design-systems/skills/component-spec/SKILL.md)

## W4 — Browser-tested user flows

**Action:** Validate the complete user journey with real browser tooling.

**Proof:** Report actual test results and traces, not planned checks.

**Provenance:** 79 sources matched. [journey-map](https://github.com/Owl-Listener/designer-skills/blob/HEAD/design-research/skills/journey-map/SKILL.md) · [accessibility-audit](https://github.com/Owl-Listener/designer-skills/blob/HEAD/design-systems/skills/accessibility-audit/SKILL.md) · [design-qa-checklist](https://github.com/Owl-Listener/designer-skills/blob/HEAD/design-ops/skills/design-qa-checklist/SKILL.md)

## W5 — Accessible semantic frontend

**Action:** Start with semantic HTML and explicit accessible names.

**Proof:** Verify focus order and keyboard completion.

**Provenance:** 102 sources matched. [accessibility-audit](https://github.com/Owl-Listener/designer-skills/blob/HEAD/design-systems/skills/accessibility-audit/SKILL.md) · [design-token-audit](https://github.com/Owl-Listener/designer-skills/blob/HEAD/designer-toolkit/skills/design-token-audit/SKILL.md) · [color-system](https://github.com/Owl-Listener/designer-skills/blob/HEAD/ui-design/skills/color-system/SKILL.md)

## W6 — Responsive UI implementation

**Action:** Implement explicit small-screen layout and navigation changes.

**Proof:** Check narrow/tablet/desktop overflow and reading order.

**Provenance:** 47 sources matched. [layout-grid](https://github.com/Owl-Listener/designer-skills/blob/HEAD/ui-design/skills/layout-grid/SKILL.md) · [critique-typography](https://github.com/Owl-Listener/designer-skills/blob/HEAD/visual-critique/skills/critique-typography/SKILL.md) · [design-qa-checklist](https://github.com/Owl-Listener/designer-skills/blob/HEAD/design-ops/skills/design-qa-checklist/SKILL.md)

## W7 — Measurable frontend performance

**Action:** Target observed UX bottlenecks before micro-optimizations.

**Proof:** Record baseline, environment and result.

**Provenance:** 130 sources matched. [animation-principles](https://github.com/Owl-Listener/designer-skills/blob/HEAD/interaction-design/skills/animation-principles/SKILL.md) · [component-spec](https://github.com/Owl-Listener/designer-skills/blob/HEAD/design-systems/skills/component-spec/SKILL.md) · [critique-color](https://github.com/Owl-Listener/designer-skills/blob/HEAD/visual-critique/skills/critique-color/SKILL.md)

## W8 — Correct data and navigation state

**Action:** Treat slow data, errors, navigation and recovery as real requirements.

**Proof:** Verify back navigation and failing requests.

**Provenance:** 198 sources matched. [journey-map](https://github.com/Owl-Listener/designer-skills/blob/HEAD/design-research/skills/journey-map/SKILL.md) · [accessibility-audit](https://github.com/Owl-Listener/designer-skills/blob/HEAD/design-systems/skills/accessibility-audit/SKILL.md) · [color-system](https://github.com/Owl-Listener/designer-skills/blob/HEAD/ui-design/skills/color-system/SKILL.md)

## W9 — Composable maintainable components

**Action:** Build reusable components consistent with existing stack.

**Proof:** A small change should not require unrelated rewrites.

**Provenance:** 91 sources matched. [design-token-audit](https://github.com/Owl-Listener/designer-skills/blob/HEAD/designer-toolkit/skills/design-token-audit/SKILL.md) · [color-system](https://github.com/Owl-Listener/designer-skills/blob/HEAD/ui-design/skills/color-system/SKILL.md) · [critique-brand-consistency](https://github.com/Owl-Listener/designer-skills/blob/HEAD/visual-critique/skills/critique-brand-consistency/SKILL.md)

## W10 — Web security boundaries

**Action:** Validate untrusted input and enforce permissions at real boundaries.

**Proof:** Confirm no credential disclosure or unsafe HTML insertion.

**Provenance:** 55 sources matched. [error-handling-ux](https://github.com/Owl-Listener/designer-skills/blob/HEAD/interaction-design/skills/error-handling-ux/SKILL.md) · [ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/HEAD/.claude/skills/ui-ux-pro-max/SKILL.md) · [filesystem-context](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/HEAD/skills/filesystem-context/SKILL.md)

