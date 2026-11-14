# Visual Critic Loop — 1440 / 768 / 390 px

> Optional for brand-sensitive landing work. A real screenshot is required before claiming visual critique. Mechanical browser facts are **not** aesthetic quality. No screenshot = **NOT RUN**, no invented defects or score.

## 1. Critic evidence has two different levels

**Measured mechanical signals:** HTTP response, horizontal overflow, broken images, JavaScript console/page errors, loaded fonts and differences at fixed viewport settings. These can be captured by a browser script.

**Visual editorial observations:** product-specific motif, first-screen proof, hierarchy, typography, optical alignment, spacing, narrative continuity, code legibility and CTA. These require somebody actually **viewing the PNGs**. Pixel difference only proves change, never better design.

## 2. Capture → inspect → repair → validate

1. **Capture baseline:** same actual build at **1440px desktop, 768px tablet and 390px mobile**, constant viewport height, locale, color scheme, content, fonts, Chromium version and motion preference. Save both viewport and full-page screenshots with a technical manifest.
2. **Inspect images:** open screenshots at each width. Distinguish mechanical failures from subjective art direction. For a real issue record **width + image region + observed defect + evidence path + expected correction**. Do not fill an issue quota.
3. **Visual Critic review:** assess hero/product explanation, CTA, visual motif continuity beyond hero, code/diagram authenticity, typography, spacing and component micro-detail. Use source code/project docs for factual claims.
4. **Targeted correction:** fix the most consequential **observed** issue, preserve the selected Brand DNA, CTA, accessibility and existing routing. Don't rewrite an entire page merely to increase screenshot difference.
5. **Re-capture:** same 1440/768/390 environment after edits. Verify original defect resolved and no new overflow, broken imagery, JS errors or inaccessible controls; view before/after PNGs.
6. **Decision:** if an actual high-impact issue remains, a second targeted iteration may help. Otherwise stop; there is no mandatory loop count. Never label subjective quality as 9/10 without a reviewer actually examining the visuals.
7. **Handoff:** actual changed paths, screenshot artifact paths, browser outcomes and observed visual improvement with evidence. Separate **PASS, FAIL, NOT RUN**.

## 3. Brand-specific visual review sheet

| Area | What to inspect | Evidence |
| --- | --- | --- |
| Brand ownability | Can generic SaaS swap its logo onto this page? Does the product motif persist into section two? | Viewed screenshot and a specific visual observation |
| Hierarchy | What is the first fixated element? Is actual product proof readable before the CTA? | Region + width |
| Type and microcraft | Optical rhythm, cap height, heading wraps, code gutter, icon stroke, lines/spacing | Cropped before/after image or full screenshot |
| Responsive | At 390px, do code, menus and proof survive? At 768px does the hero compose rather than just shrink? | Three real PNGs and browser overflow record |
| Trust | Are examples/metrics/logo/version/claims actually verified? | Project docs and rendered text |
| Accessibility | Contrast, focus order, keyboard and reduced motion | Actual test evidence, not screenshot alone |

## 4. Optional runnable tools

~~~bash
npm install --no-save --ignore-scripts playwright@1.65.0 pixelmatch@6.0.0 pngjs@7.0.0
npx playwright install chromium

node scripts/visual-capture.mjs capture --url http://127.0.0.1:3000/ --out .visual-review/before
# View 1440.png, 768.png, 390.png and full-page captures, then edit code.
node scripts/visual-capture.mjs capture --url http://127.0.0.1:3000/ --out .visual-review/after
node scripts/visual-capture.mjs compare --before .visual-review/before --after .visual-review/after --out .visual-review/diff
node scripts/visual-critic.mjs --before .visual-review/before --after .visual-review/after --out .visual-review/critic.json
~~~

`visual-critic.mjs` compares **observed browser failures and regressions**; a clean browser report never implies someone visually reviewed the brand. Source screenshots stay local and are not automatically published. If tools are missing, record the visual loop as **NOT RUN** rather than inventing a comparison.

## 5. Mobile readability and honest critic gates

The browser helper now records candidate **small visible text** at 390px. A warning for text below 14px is a **manual reading review request**, not a proven accessibility defect. Review secondary labels, metadata, captions, dates, code annotations and navigation in screenshots. Inspect line height, contrast, sentence wrapping, zoom and tap target spacing. A page with no overflow can still be tiring or unreadable.

When running the optional repository tools, separate three states:

1. **Mechanical defects** — HTTP/page failures, overflow, broken images, JS or request failures. These can block a technical pass.
2. **Readability candidates** — small 390px text and compressed line-height reported with element type, approximate position and measured CSS values. They are warnings until the screenshots are actually viewed.
3. **Editorial brand criticism** — identity substitution, hierarchy, typography, visual consistency and individual authorship. Only mark reviewed when a person or vision reviewer really inspects the PNGs and records specific evidence.

Do not consider capture and diff automation a full visual evaluation. After any targeted fix, capture the *same* viewport, browser, color scheme, loaded content, fonts and motion conditions. Confirm the original issue is resolved and that the fix did not introduce new mobile readability regressions.

**Tooling location:** The scripts documented above are maintained at the **full MungTangE repository root** and are **not copied** by the standard `npx skills add` installation. Installed skill users should use their own authorized browser/capture tools; only run these `node scripts/*` commands when working from a full repository checkout.

## 6. Temporal critique for requested 3D/motion

For animation or an interactive 3D world, **one screenshot at the beginning is not motion QA**. Capture actual deterministic story beats at start, midpoints and end, in both forward and reverse scroll when appropriate. Inspect 1440/768/390px screenshots of those states and a short real recording/contact sheet when tools are available. Verify frame continuity, focused camera subject, readable HTML overlay, small mobile captions, GPU/context fallback, hover/touch/keyboard parity, reduced motion and offscreen pause/teardown. Re-capture the same beat after a focused fix.

The repository's optional `visual-capture.mjs` currently captures **static page states**, not a full animated timeline. Don't claim this helper verified frame choreography, WebGL stability or temporal FPS unless additional real browser runs demonstrate it. See [MOTION-3D.md](MOTION-3D.md) for the complete opt-in manual/agent protocol.
