# Purposeful 3D & motion engineering — MungTangE specialist playbook

> **Optional one-reference playbook** for an actual motion/3D UI request. The base skill is enough for static/UI tasks. Do not load this merely because the project is a landing page. This guide synthesizes **12 directly examined original SKILL.md files**, while the separate [100-source router](motion/ROUTER.md) is an automatically indexed reference corpus; 100 sources have been retrieved and structurally inspected, **not** individually expert-tested. Original instructions may depend on missing referenced files or outdated library versions. Do not execute third-party code just because a card recommends it.

## 1. Identity first: scene and motion are product evidence, not a wallpaper

Before choosing Three.js, GSAP or shaders, answer:
- What **real source-backed author/product trait** warrants motion or 3D? Attach the owner's authentic artifact (route graph, product geometry, typography, architecture, authored illustration) and source.
- What is the user's job on this page? What should move, reveal, or remain still so the user understands it better?
- Why would the animation **not fit a different developer/brand**? Run the same two-substantive-element swap test as [BRAND-DIRECTION.md](BRAND-DIRECTION.md), now for the scene geometry, behavior, rhythm and proof.
- What must still work and be comprehensible on mobile, keyboard, low-power or reduced-motion? Specify a still-state composition and a real CTA.

**Avoid** one-size-fits-all floating orbs, generic abstract 3D loops, blinding particles, fake pseudo-technical data, text obscured by a canvas, decorative loading screens, and forced scroll hijacking. A scene that could be moved to any agency homepage without altering the underlying meaning fails **brand identity**, regardless of rendering quality.

From [motion-art-direction](https://github.com/VisualxIntelligence/motion-tools-and-skills/blob/70c5f92e106c0a2180f958488a4de245005f1f7e/docs/guides/iart-motion-fundamentals/motion-art-direction/SKILL.md): decide tone, focal point, rhythm, and restraint before implementing keyframes. Keep deliberately static anchors so viewers know where to look.

## 2. Select the cheapest truthful visual medium

| Requirement | Default choice | Escalate when |
| --- | --- | --- |
| Hover, loading or simple UI entrance | CSS transitions / keyframes | State orchestration truly needs a timeline |
| Coordinated section reveals and pinned storytelling | GSAP / ScrollTrigger (or available native alternatives) | Actual spatial depth and camera movement are essential |
| Flat icons, drawing, paths and vector interactions | SVG / DOM | Thousands of independent points / shader effects warrant GPU |
| One-time decorative ambiance | CSS or pre-rendered image | True user interaction/physics is needed |
| Fixed cinematic sequence with no spatial interaction | Image sequence or video with poster fallback | Users must orbit, touch or meaningfully inspect a 3D world |
| Live 3D object / configurable scene | Three.js + WebGLRenderer | React codebase needs declarative scene component ownership → React Three Fiber |
| Advanced GPU compute / TSL | WebGPU path after capability and current API checks | Only if a measured requirement cannot fit broader WebGL support |

The decision is not a blanket "WebGPU is faster". Treat renderers and shader APIs as version-sensitive; explicitly define the target browser and fallback (see [threejs-renderers](https://github.com/full-stack-skills/threejs-skills/blob/ec9ca2ca77bb932dbb41ee3d8cd81d710d094cc2/skills/threejs-renderers/SKILL.md) and [threejs-node-tsl](https://github.com/full-stack-skills/threejs-skills/blob/ecd25ccec6655be740150ee4094cb21cf3370415/skills/threejs-node-tsl/SKILL.md)). A 3D scene is optional for brand-sensitive requests without explicit 3D intent.

## 3. Scene brief and direction competition (EXPLORE → DESIGN)

For an open-ended 3D/immersive project, compare **three materially different concepts** when appropriate (when user already picked, implement rather than restarting competition).

Each proposal states: *brand signal → exact visual proof → world/space thesis → hero and lower-section storyline → interaction path → mobile composition → cost/risk → fallback*. Vary **spatial staging, narrative/section structure, typography overlay, camera rhythm and actual content**, not merely shader color. If the user wants three built designs, create and capture three real previews; three JSON concepts are not three rendered scenes.

For the chosen direction, produce a compact **World Bible / Motion DNA**:
- 3 factual source-backed identity signals and how geometry, material or motion embodies each.
- **Scene ledger**: objects, materials/textures, dimensions or scale, camera, depth cues, lighting, asset origin and license.
- **Timeline/storyboard**: key beats with normalized scroll/time state, user goal, on-screen DOM headline, focal object, transition and reversible exit.
- **Interaction ledger**: mouse/pen/touch/orbit, keyboard equivalent, focus, state, disabled/loading/error and what is intentionally static.
- **Environment contract**: target framework, renderer, device/bandwidth, asset-size and frame-time budgets, 390/768/1440 viewport reflow, reduced motion, poster fallback, current library versions.
- **Swap-test**: describe two important objects/motion beats that would be wrong for a substituted project. If neither breaks, revise before building.

[build-threejs-scroll-worlds](https://github.com/MengTo/Skills/blob/8996aca04d8d0df3311e0b1e2d1208176a18ede9/agent-skills/web-design/build-threejs-scroll-worlds/SKILL.md) distinguishes one persistent spatial world from an image/video sequence and advocates a deterministic scroll conductor. [web3d-integration-patterns](https://github.com/discover-dmc/motionstack/blob/3df1256cc8201d961ff162d13938fb7182bfd875/.claude/skills/web3d-integration-patterns/SKILL.md) distinguishes layered DOM + Three.js + GSAP from R3F composition. Don't indiscriminately combine all frameworks; pick a single scene owner and orchestration clock.

## 4. Build architecture (one vertical slice first)

1. **HTML is primary UI.** Keep headings, copy, CTA and keyboard-operable controls in semantic DOM; 3D Canvas supplies visual proof, not essential text. Keep a meaningful poster/still for unsupported GPU, low-power devices, slow connections and `prefers-reduced-motion`.
2. **Single scene owner.** Create one renderer/scene/camera lifecycle per view, resize it to the container, cap DPR based on device and measured GPU cost. Avoid unintended duplicate RAF loops. In R3F use `Canvas` and `useFrame` where appropriate; in Three.js use `renderer.setAnimationLoop` or a single RAF owner per documented setup.
3. **Deterministic time.** Drive camera/object/timeline positions from a reversible normalized `progress ∈ [0,1]` (scroll) or delta-time animation clock. Avoid non-deterministic scroll-history dependence; rapid reverse and resize must not create impossible camera jumps.
4. **Render only when useful.** For static/interaction-driven scenes render on demand; pause off-screen/background and when motion is reduced. Avoid repeated allocations, DOM reads and shader recompiles each frame.
5. **Resource lifecycle.** Load/gate assets (including GLTF textures) explicitly; reuse geometry/material where possible; handle loading errors, context loss and unmount. Cancel animations/observers/listeners; dispose of geometry, materials, textures and render targets.
6. **Progressive fidelity.** Prove a lightweight first scene and controls before adding postprocessing, large textures, particle simulations or high-poly assets. Monitor load and frame timings; don't assign arbitrary "60 FPS guaranteed" labels.
7. **Overlay continuity.** Maintain readable, appropriately scaled typography and consistent brand motifs across hero and later sections. Your scene must never make 390px secondary text unreadable.

Supporting sources: [threejs-animation](https://github.com/full-stack-skills/threejs-skills/blob/648cdf0c58a8b793869ccfd5f762ff80cded6878/skills/threejs-animation/SKILL.md), [react-three-fiber](https://github.com/discover-dmc/motionstack/blob/19d90a4843be33f950f3f6fd160168a650bf0934/.claude/skills/react-three-fiber/SKILL.md), [ambient-section-particles](https://github.com/MengTo/Skills/blob/4beca95ab7da396a3aeb8cbe0a1dc192751bd48d/agent-skills/web-design/ambient-section-particles/SKILL.md), [gsap-performance](https://github.com/greensock/gsap-skills/blob/05792acf5b0ea7fd30042cdc5e91282e8e047898/skills/gsap-performance/SKILL.md). [cinematic-gsap-lenis-motion-system](https://github.com/MengTo/Skills/blob/1aa69da8460ce0db325765de5ff14c1d6b92960f/agent-skills/web-design/cinematic-gsap-lenis-motion-system/SKILL.md) describes shared scroll orchestration but should not force smooth-scrolling dependencies into an existing codebase.

## 5. 3D & motion verification loop — visual AND temporal evidence

A zero-overflow screenshot is not proof of readability, a non-blank render is not proof of good choreography, and a pixel diff is not proof of artistic improvement.

### Optional real-browser scroll-beat capture

When the full repository and optional Playwright+Chromium are installed, use the **repo-only** helper (it is not bundled by the Agent Skills installer):

```bash
node scripts/motion-capture.mjs --url http://127.0.0.1:3000/ --out .visual-review/motion --selector '#scene'
node scripts/motion-capture.mjs --url http://127.0.0.1:3000/ --out .visual-review/motion-reduced --selector '#scene' --motion reduce
```

It records real PNG frames for **0/25/50/75/100% normalized document scroll**, then revisits 50% and 0% in reverse at 1440/768/390 widths, including canvas count, element transform, overflow and browser errors. The resulting `motion-manifest.json` contains facts, **not an aesthetic verdict**. A scene-root selector does not automatically validate 3D camera positions. Inspect PNGs and test custom motion manually. `npm run motion:smoke` tests the capture helper, not the actual product's visual quality.

### Capture real states

- At **1440, 768, 390px** capture full-page plus hero and lower sections with current source/URL, browser/renderer version, theme, content/asset readiness and time.
- For **scroll and animated work**, capture the same **named key beats** (e.g., start, story reveal, focus, transition, end), ideally via still frames and a short real recording/contact sheet where the browser/tool permits. Assert forward and reverse progress, pin/unpin, camera bounds, CTA availability and no misleading cover-up.
- For a user-requested **three-design comparison**, render all three under the same content and recording conditions and compare them blind for brand distinctiveness, proof quality and mobile reading order.
- Observe at **390px** caption/secondary text size, line-height, contrast, 200% zoom, responsive camera framing, touch target and whether 3D obscures DOM text.
- Test tab and keyboard focus (including users without hover), coarse pointer/touch, orientation and resize, reduced motion, WebGL unavailable, asset failure, page hidden/unmount/return, slower devices, and any actual route transitions.
- Inspect page errors, failed network requests, visual flashing, layout shifts and repeated creation of renderers/tweens. Measure frame time / page speed in the **real environment** and report actual numbers or **NOT RUN**.
- Do not make up screenshots, frame measurements, independent critics, sampled performance or fixes. Repair one or two observed high-impact defects, capture again under the same conditions and check for regressions.

The [claude-motion-review-loop](https://github.com/VisualxIntelligence/motion-tools-and-skills/blob/5aa982d105bdad98ed43b9dfb5ab0c758b632ec9/skills/claude-motion/claude-motion-review-loop/SKILL.md) source recommends examining a contact sheet of real captured beats before claiming motion work is finished. Its sample video commands are project-specific, **not automatically available in MungTangE**. Our repository-local screenshot CLI checks page dimensions and small text; it is **not** a timeline-motion judge.

### Mechanical vs subjective gates

| Gate | Proof | Blockers |
| --- | --- | --- |
| Render / navigation | Actual screenshot, interactive journey, console | Blank canvas, broken CTA, repeated fatal errors |
| Motion semantics | Viewed named beats, progress reverse and touch/keyboard tests | Animation hides meaning, traps scroll or overrides user preference |
| Mobile readability | Viewed 390px screenshot, CSS font metrics, zoom | Critical text unreadable/hidden or controls unreachable |
| GPU & loading | Measured target-device profile, asset failures/fallback, teardown | Known leak, severe stall, missing usable static alternative |
| Brand identity | Real owner/product evidence, swap-test mismatches, page continuity | Interchangeable generic 3D decoration marketed as unique |
| Source integrity | SHA-pinned link, license/version check before reuse | Unlicensed assets, unsupported API or unapproved code execution |

If a check is not executed, mark it **NOT RUN**. Distinguish a demo smoke test from live product QA.

## 6. Handoff contract

For any nontrivial motion deliverable, report: **PURPOSE** (why motion is needed and whose identity it reflects), **MEDIUM** (and why other options were rejected), **SCENE** (real source asset list and technical owner), **MOTION PROOF** (actual captured beat paths or NOT RUN), **READABILITY** (390px and static-mode observation), **PERFORMANCE** (real numbers or NOT RUN), **OPEN** (blockers/limitations), **NEXT** (release approval only if needed). Do not imply a specialist was delegated if these are reasoning perspectives.

## Deeply inspected source index

This playbook extracted practical integration rules by directly reading these **12 SKILL.md full texts** on 2026-11-14 (exact SHA-pinned content, not the 100-source index alone):

1. [motion-art-direction](https://github.com/VisualxIntelligence/motion-tools-and-skills/blob/70c5f92e106c0a2180f958488a4de245005f1f7e/docs/guides/iart-motion-fundamentals/motion-art-direction/SKILL.md)
2. [build-threejs-scroll-worlds](https://github.com/MengTo/Skills/blob/8996aca04d8d0df3311e0b1e2d1208176a18ede9/agent-skills/web-design/build-threejs-scroll-worlds/SKILL.md)
3. [web3d-integration-patterns](https://github.com/discover-dmc/motionstack/blob/3df1256cc8201d961ff162d13938fb7182bfd875/.claude/skills/web3d-integration-patterns/SKILL.md)
4. [threejs-renderers](https://github.com/full-stack-skills/threejs-skills/blob/ec9ca2ca77bb932dbb41ee3d8cd81d710d094cc2/skills/threejs-renderers/SKILL.md)
5. [threejs-node-tsl](https://github.com/full-stack-skills/threejs-skills/blob/ecd25ccec6655be740150ee4094cb21cf3370415/skills/threejs-node-tsl/SKILL.md)
6. [threejs-animation](https://github.com/full-stack-skills/threejs-skills/blob/648cdf0c58a8b793869ccfd5f762ff80cded6878/skills/threejs-animation/SKILL.md)
7. [react-three-fiber](https://github.com/discover-dmc/motionstack/blob/19d90a4843be33f950f3f6fd160168a650bf0934/.claude/skills/react-three-fiber/SKILL.md)
8. [ambient-section-particles](https://github.com/MengTo/Skills/blob/4beca95ab7da396a3aeb8cbe0a1dc192751bd48d/agent-skills/web-design/ambient-section-particles/SKILL.md)
9. [gsap-performance](https://github.com/greensock/gsap-skills/blob/05792acf5b0ea7fd30042cdc5e91282e8e047898/skills/gsap-performance/SKILL.md)
10. [cinematic-gsap-lenis-motion-system](https://github.com/MengTo/Skills/blob/1aa69da8460ce0db325765de5ff14c1d6b92960f/agent-skills/web-design/cinematic-gsap-lenis-motion-system/SKILL.md)
11. [3d-cloth-material](https://github.com/MengTo/Skills/blob/99f5f0fde214812e597b56671b529e7868d5e5ac/agent-skills/3d/3d-cloth-material/SKILL.md)
12. [claude-motion-review-loop](https://github.com/VisualxIntelligence/motion-tools-and-skills/blob/5aa982d105bdad98ed43b9dfb5ab0c758b632ec9/skills/claude-motion/claude-motion-review-loop/SKILL.md)

**Limitations:** Upstream libraries and version-specific claims must be checked against their latest official docs for the user's stack. Linked sources can have additional local references/assets absent here. The license of each of the 100 sources is not independently audited. The 100-card router is research/provenance; no third-party scripts or source text are installed or executed automatically.
