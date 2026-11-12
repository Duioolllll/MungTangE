# Visual self-review and screenshot repair loop

> **Optional reference for design-sensitive releases**. A checklist or score alone does not certify visual quality. Distinguish measurable browser facts from subjective art direction, and never invent a screenshot, a review, or a defect.

## A. Two complementary review lenses

**Mechanical facts (need real code/browser):** layout/viewport overflow, clipped and overlapping content, actual font loading, visible CTA, image integrity, console/page errors, focus and accessibility observations. Browser automation can detect some of these but **cannot automatically decide brand uniqueness or visual elegance**.

**Visual editorial review (requires viewed screenshots):** brand signature, product-specific proof, focal hierarchy, typographic rhythm, spacing consistency, visual balance, image authenticity, microdetail and deliberate transitions. If no screenshot can be viewed, mark this section NOT RUN; a DOM/CSS scan is not an aesthetic assessment.

## B. Screenshot review rubric (0–4 only with evidence)

| Dimension | 0 = fails | 2 = serviceable | 4 = distinctive / resolved |
| --- | --- | --- | --- |
| **Brand/product fit** | Could swap logo with any SaaS without changing page | Some product-specific copy | Ownable visual system derived from actual product evidence |
| **Information hierarchy** | Primary action, product, proof unclear | Functional reading order | Strong first-screen focus + intentional deeper story |
| **Typography and microcraft** | Broken rhythm, wrapping or alignment | Legible but generic | Intentional type contrast, consistent optical detail across components |
| **Visual cohesion** | Hero and lower sections feel unrelated | Basic tokens repeated | Typography, color, space, diagrams, motion form a recognisable whole |
| **Proof and trust** | Invented claims, decorative fake console, non-working CTA | Some real proof | Real syntax/workflows, transparent limitations, direct verified action |
| **Responsive composition** | Clipped or hidden content | Fits widths with compromises | Recomposition preserves hierarchy and interaction across widths |

Use **observed screenshot references** (viewport + region + issue) as evidence. **N/A / NOT RUN** for unavailable dimensions; don't sum fake 24-point totals. A rubric is a diagnostic framework, not a claim of 8/10 or 9/10 improvement.

**Release blocker independent of taste:** inaccessible primary controls, known deceptive claims, unreadable text, broken navigation, severe layout clipping. Do not label a visually nice page "ship ready" until function, content and accessibility checks actually pass.

## C. Repeatable screenshot iteration

1. **Baseline:** Capture real same-build screens at 375, 768 and 1440 px (or meaningful project-specific widths). Record URL, viewport, timestamp, fonts readiness and browser logs. Save screenshot files under a local output directory.
2. **Inspect:** Actually open the images (or provide them to a vision-capable reviewer). State observed defects precisely: "1440 hero: code pane visually outweighs thesis", not "needs pop".
3. **Prioritize:** Choose the **one or two highest-impact observed problems**, not an invented quota. Separate factual bugs from subjective design decisions.
4. **Edit:** Make a targeted fix tied to brand thesis. Preserve function and routing. Do not indiscriminately regenerate the entire page.
5. **Re-capture:** Use identical browser/viewport/theme/content and compare before/after. A pixel diff only shows **change**, never which version is better.
6. **Re-evaluate:** Confirm original issue improved and no new regressions in mobile, keyboard, content or speed. A second pass is appropriate if there is still an observed high-impact gap. Stop if improvements plateau or evidence is unavailable.
7. **Deliver:** Include actual paths to before/after PNGs, concrete observed changes, checks run, and any unresolved risks. Mark anything not executed NOT RUN.

Do **not** trigger repetitive redesign for a quick CSS patch. Two focused iterations is a sensible default **maximum**, not a mandatory loop; change it for user scope or observed evidence.

## D. Practical capture CLI (optional)

If available, run the repo's screenshot helper:

~~~bash
# Requires optional local Playwright installation + Chromium:
npm install --no-save playwright@1.65.0 pixelmatch@6.0.0 pngjs@7.0.0
npx playwright install chromium

node scripts/visual-capture.mjs capture \
  --url http://127.0.0.1:3000/ --out .visual-review/before

# Edit targeted UI, then capture same URL/viewport:
node scripts/visual-capture.mjs capture \
  --url http://127.0.0.1:3000/ --out .visual-review/after

node scripts/visual-capture.mjs compare \
  --before .visual-review/before --after .visual-review/after \
  --out .visual-review/diff
~~~

This captures actual PNGs and mechanical JSON findings; optional comparison uses pixel-level differences. The script should be treated as **source evidence for human/vision critique**, not a magical visual-quality grader. For Figma/other sources, obtain authorized rendered captures first. If the browser is unavailable, deliver a review checklist/spec and explicitly label screenshot comparison NOT RUN.
