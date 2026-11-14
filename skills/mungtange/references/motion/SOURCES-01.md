# 3D and motion pinned source cards 1/4

> Automatically extracted headings and short source-location clues, **not** human-tested implementation advice or permission to import code. For techniques, inspect the original source and its dependencies first.

## Source 1 — 3d-cloth-material

- Area: **materials-shaders** · pipeline: **build** · original: [SHA-pinned SKILL.md](https://github.com/MengTo/Skills/blob/99f5f0fde214812e597b56671b529e7868d5e5ac/agent-skills/3d/3d-cloth-material/SKILL.md)
- License and API compatibility: **not individually audited**
- Source size: 70 lines; fetched and structurally examined
- Headings: 3D Cloth Material (L6) · The rules, each with the failure it prevents (L16) · Constants (L32) · Gotchas, symptom first (L44) · Lifecycle (L56)
- Implementation clue: L18 — 1. **Integrate folds from an angle, not a height.** `α(s) = a·(sinθ + 0.16 sin…
- QA/safety clue: L19 — 2. **Uv is material metres, never re-fitted per frame.** Do not recompute uv f…
- Application rule: verify current original + supported API; never invoke a technique solely from its index entry.

## Source 2 — 3d-falling-leaves

- Area: **scene-3d** · pipeline: **build** · original: [SHA-pinned SKILL.md](https://github.com/MengTo/Skills/blob/db90d0355b97254de7997fd295dd0f05ba62508b/agent-skills/3d/3d-falling-leaves/SKILL.md)
- License and API compatibility: **not individually audited**
- Source size: 55 lines; fetched and structurally examined
- Headings: 3D Falling Leaves (L6) · Build one convincing leaf (L10) · Couple tumble and drift (L18) · Instance and recycle (L32) · Integrate with the world (L42)
- Implementation clue: L10 — ## Build one convincing leaf…
- QA/safety clue: L22 — The lateral velocity should follow the tumble, so a leaf slips fastest when ed…
- Application rule: verify current original + supported API; never invoke a technique solely from its index entry.

## Source 3 — 3d-four-seasons

- Area: **scene-3d** · pipeline: **build** · original: [SHA-pinned SKILL.md](https://github.com/MengTo/Skills/blob/23f00630a55a6589e911426d2fa250070ff1f2dd/agent-skills/3d/3d-four-seasons/SKILL.md)
- License and API compatibility: **not individually audited**
- Source size: 73 lines; fetched and structurally examined
- Headings: 3D Four Seasons (L6) · Author the seasonal identity (L10) · Share one state (L23) · Change foliage and snow convincingly (L48) · Keep the transition responsive (L60)
- Implementation clue: L21 — Choose particle effects only when they serve the scene. A seasonal selector do…
- QA/safety clue: L66 — Use keyboard-accessible controls with a visible selected state and updated acc…
- Application rule: verify current original + supported API; never invoke a technique solely from its index entry.

## Source 4 — 3d-high-poly-models

- Area: **render-performance** · pipeline: **verify** · original: [SHA-pinned SKILL.md](https://github.com/MengTo/Skills/blob/fe827ab0fb1ad78f5cfc86d57015212f0bc4145d/agent-skills/3d/3d-high-poly-models/SKILL.md)
- License and API compatibility: **not individually audited**
- Source size: 57 lines; fetched and structurally examined
- Headings: 3D High-Poly Models (L6) · Establish what the camera needs (L10) · Model for believable close-ups (L22) · Prepare runtime versions (L32) · Avoid a startup stall (L42)
- Implementation clue: L8 — Build the requested close-up detail into the model, then make it practical to …
- QA/safety clue: L12 — Inspect the reference, intended hero angle, closest approach, orbit range, mod…
- Application rule: verify current original + supported API; never invoke a technique solely from its index entry.

## Source 5 — 3d-high-resolution-textures

- Area: **render-performance** · pipeline: **verify** · original: [SHA-pinned SKILL.md](https://github.com/MengTo/Skills/blob/fb1830c755d4a46e40067f815f4ff67284498a86/agent-skills/3d/3d-high-resolution-textures/SKILL.md)
- License and API compatibility: **not individually audited**
- Source size: 53 lines; fetched and structurally examined
- Headings: 3D High-Resolution Textures (L6) · Choose resolution from the view (L10) · Build a coherent PBR material (L16) · Preserve detail during sampling (L30) · Deliver detail progressively (L36)
- Implementation clue: L10 — ## Choose resolution from the view…
- QA/safety clue: L41 — Keep assets external and cacheable. WebP/AVIF can reduce network bytes for col…
- Application rule: verify current original + supported API; never invoke a technique solely from its index entry.

## Source 6 — 3d-metal-material

- Area: **materials-shaders** · pipeline: **build** · original: [SHA-pinned SKILL.md](https://github.com/MengTo/Skills/blob/83ee5d94164b8ef13910195405890005e6036de9/agent-skills/3d/3d-metal-material/SKILL.md)
- License and API compatibility: **not individually audited**
- Source size: 93 lines; fetched and structurally examined
- Headings: 3D Metal Material (L6) · Build order (L14) · Constants (L36) · Symptom-first gotchas (L57) · Lifecycle and cost (L70)
- Implementation clue: L19 — 2. **A dark room with bright cards.** Build the environment as a real `Scene` …
- QA/safety clue: L72 — Reduced motion: no orbit, light parked at -0.3 (the window lands across the pl…
- Application rule: verify current original + supported API; never invoke a technique solely from its index entry.

## Source 7 — 3d-orbit-inspect-demo

- Area: **interaction** · pipeline: **build** · original: [SHA-pinned SKILL.md](https://github.com/MengTo/Skills/blob/e56030894f5a7ec438a89675610b6b22e162847d/agent-skills/3d/3d-orbit-inspect-demo/SKILL.md)
- License and API compatibility: **not individually audited**
- Source size: 78 lines; fetched and structurally examined
- Headings: 3D Orbit and Inspect (L6) · What is and is not in the source (L16) · Rules, each with the failure it prevents (L23) · Numbers (L40) · Room (L53)
- Implementation clue: L14 — Reuse `demo.html`: the joint, the room, the lean, the lift and the return are …
- QA/safety clue: L18 — Kibori (`kibori.html`, section "8b. Inspect — pick an item up") has click-to-l…
- Application rule: verify current original + supported API; never invoke a technique solely from its index entry.

## Source 8 — 3d-paper-material

- Area: **materials-shaders** · pipeline: **build** · original: [SHA-pinned SKILL.md](https://github.com/MengTo/Skills/blob/a70f649db07daa376364eb273c184b343539667b/agent-skills/3d/3d-paper-material/SKILL.md)
- License and API compatibility: **not individually audited**
- Source size: 86 lines; fetched and structurally examined
- Headings: 3D Paper Material (L6) · The pipeline (L14) · Constants that landed (L24) · Rules and the failure each prevents (L39) · Gotchas, symptom first (L51)
- Implementation clue: L43 — **Stack three offset copies behind the front layer, tinted 0.8-0.94 of the pap…
- QA/safety clue: L41 — **Cut the outline from four independent tear lines, never a rectangle with a w…
- Application rule: verify current original + supported API; never invoke a technique solely from its index entry.

## Source 9 — 3d-retina-resolution

- Area: **render-performance** · pipeline: **verify** · original: [SHA-pinned SKILL.md](https://github.com/MengTo/Skills/blob/6628c0076aa623be6bb574be4634d7e13ea1a4df/agent-skills/3d/3d-retina-resolution/SKILL.md)
- License and API compatibility: **not individually audited**
- Source size: 71 lines; fetched and structurally examined
- Headings: 3D Retina Resolution (L6) · Choose the scale deliberately (L10) · Synchronize the rendering pipeline (L18) · Handle layout and display changes (L46) · Budget and fallback (L54)
- Implementation clue: L10 — ## Choose the scale deliberately…
- QA/safety clue: L16 — Keep an explicit quality selection distinct from automatic adaptation. Inspect…
- Application rule: verify current original + supported API; never invoke a technique solely from its index entry.

## Source 10 — 3d-sky-background

- Area: **materials-shaders** · pipeline: **build** · original: [SHA-pinned SKILL.md](https://github.com/MengTo/Skills/blob/d36fb3d21af5f09ee4f8a8ef9892355eda99f45a/agent-skills/3d/3d-sky-background/SKILL.md)
- License and API compatibility: **not individually audited**
- Source size: 52 lines; fetched and structurally examined
- Headings: 3D Sky Background (L6) · Choose the representation (L10) · Build a stable surrounding sky (L16) · Map a panorama deliberately (L23) · Keep color and lighting coherent (L31)
- Implementation clue: L8 — Build a sky that surrounds the world, with a readable horizon and lighting tha…
- QA/safety clue: L12 — Inspect the project's renderer, camera range, color pipeline, environment ligh…
- Application rule: verify current original + supported API; never invoke a technique solely from its index entry.

## Source 11 — 3d-sky-rays

- Area: **materials-shaders** · pipeline: **build** · original: [SHA-pinned SKILL.md](https://github.com/MengTo/Skills/blob/ff55d90a82645808eb97280495c348777da75f1b/agent-skills/3d/3d-sky-rays/SKILL.md)
- License and API compatibility: **not individually audited**
- Source size: 62 lines; fetched and structurally examined
- Headings: 3D Sky Rays (L6) · Fit the existing renderer (L10) · Build an occlusion-aware ray pass (L16) · Tune appearance before cost (L43) · Verify (L51)
- Implementation clue: L12 — Inspect the renderer version, render targets, alpha usage, depth path, tone ma…
- QA/safety clue: L12 — Inspect the renderer version, render targets, alpha usage, depth path, tone ma…
- Application rule: verify current original + supported API; never invoke a technique solely from its index entry.

## Source 12 — 3d-ultra-realistic-water

- Area: **materials-shaders** · pipeline: **build** · original: [SHA-pinned SKILL.md](https://github.com/MengTo/Skills/blob/4c11350bd80c7db6e89140e6f1e2425eebc58257/agent-skills/3d/3d-ultra-realistic-water/SKILL.md)
- License and API compatibility: **not individually audited**
- Source size: 104 lines; fetched and structurally examined
- Headings: 3D Ultra-Realistic Water (L6) · The mechanism (L16) · Reuse the working effect (L20) · The stack, with the numbers that shipped (L50) · Rules, each with the failure it prevents (L66)
- Implementation clue: L8 — Use this for an open sea seen by a moving camera, with a horizon and a sun. Re…
- QA/safety clue: L89 — ## Lifecycle and accessibility…
- Application rule: verify current original + supported API; never invoke a technique solely from its index entry.

## Source 13 — 3d-underwater-god-rays

- Area: **materials-shaders** · pipeline: **build** · original: [SHA-pinned SKILL.md](https://github.com/MengTo/Skills/blob/fb61f257950a9499c2861c1e30403eae9ffeab5a/agent-skills/3d/3d-underwater-god-rays/SKILL.md)
- License and API compatibility: **not individually audited**
- Source size: 105 lines; fetched and structurally examined
- Headings: 3D Underwater God Rays (L6) · The mechanism (L18) · Reuse the working effect (L22) · The numbers that shipped (L56) · Rules, each with the failure it prevents (L73)
- Implementation clue: L8 — Use this when the camera is under the water and the light comes down through i…
- QA/safety clue: L90 — ## Lifecycle and accessibility…
- Application rule: verify current original + supported API; never invoke a technique solely from its index entry.

## Source 14 — 3d-virtual-tour

- Area: **scene-3d** · pipeline: **build** · original: [SHA-pinned SKILL.md](https://github.com/MengTo/Skills/blob/69a0d661c0ded474a0d35734e62270e726fbbb3c/agent-skills/3d/3d-virtual-tour/SKILL.md)
- License and API compatibility: **not individually audited**
- Source size: 83 lines; fetched and structurally examined
- Headings: 3D Virtual Tour (L6) · Establish the tour model (L10) · Author a route through real openings (L23) · Give one controller final camera ownership (L35) · Connect rooms, maps, and controls (L45)
- Implementation clue: L27 — Place keys before, within, and after narrow openings. Use floor-relative eye h…
- QA/safety clue: L12 — Inspect the scene, coordinate system, scale, floor elevations, door openings, …
- Application rule: verify current original + supported API; never invoke a technique solely from its index entry.

## Source 15 — 3d-wood-lighting-scorecard

- Area: **materials-shaders** · pipeline: **build** · original: [SHA-pinned SKILL.md](https://github.com/MengTo/Skills/blob/a394a37904a9691d9acbede0fa11bc461ac14d38/agent-skills/3d/3d-wood-lighting-scorecard/SKILL.md)
- License and API compatibility: **not individually audited**
- Source size: 92 lines; fetched and structurally examined
- Headings: 3D Wood Lighting Scorecard (L6) · Build order (L16) · Rules, each with the failure it prevents (L25) · Constants (L53) · Cost (measured, headless Chromium on Apple Silicon, Metal) (L67)
- Implementation clue: L51 — **The metric moves when the camera does.** Freeze the sway and time (`KiboriSc…
- QA/safety clue: L79 — ## Accessibility and lifecycle…
- Application rule: verify current original + supported API; never invoke a technique solely from its index entry.

## Source 16 — 3d-wood-material

- Area: **materials-shaders** · pipeline: **build** · original: [SHA-pinned SKILL.md](https://github.com/MengTo/Skills/blob/7667ae5c0388465d6ca64273791f213f0a0592ee/agent-skills/3d/3d-wood-material/SKILL.md)
- License and API compatibility: **not individually audited**
- Source size: 86 lines; fetched and structurally examined
- Headings: 3D Wood Material (L6) · Recipe (L14) · Species constants (from the workshop) (L37) · Anchored failures (L49) · Budgets (L63)
- Implementation clue: L17 — 2. **Bake one field.** A 1024² `RepeatWrapping`, `LinearMipmapLinear`, `NoColo…
- QA/safety clue: L68 — Under `prefers-reduced-motion` skip the slow orbit and snap camera moves; the …
- Application rule: verify current original + supported API; never invoke a technique solely from its index entry.

## Source 17 — add-mouse-driven-orbit

- Area: **interaction** · pipeline: **build** · original: [SHA-pinned SKILL.md](https://github.com/MengTo/Skills/blob/e045843d41df7bd8e3aa00eab8e51b19ae85bb5d/agent-skills/web-design/add-mouse-driven-orbit/SKILL.md)
- License and API compatibility: **not individually audited**
- Source size: 107 lines; fetched and structurally examined
- Headings: Add Mouse-Driven Orbit (L6) · Record intent, not layout (L12) · Dampen in the frame loop (L28) · Split the motion (L48) · Preserve framing across sizes (L76)
- Implementation clue: L26 — On `pointerleave`, set the target back to `0, 0`. On coarse pointers, keep the…
- QA/safety clue: L84 — Under `prefers-reduced-motion: reduce`, render a designed three-quarter still …
- Application rule: verify current original + supported API; never invoke a technique solely from its index entry.

## Source 18 — add-shader-cursor-trail

- Area: **materials-shaders** · pipeline: **build** · original: [SHA-pinned SKILL.md](https://github.com/MengTo/Skills/blob/8292c5e8518d3d547f1cda690408f69c7c6ca4e3/agent-skills/web-design/add-shader-cursor-trail/SKILL.md)
- License and API compatibility: **not individually audited**
- Source size: 35 lines; fetched and structurally examined
- Headings: Add Shader Cursor Trail (L6) · Workflow (L10) · Validate (L21)
- Implementation clue: L8 — Implement the exact trail as progressive enhancement. Preserve the host sectio…
- QA/safety clue: L12 — 1. Inspect the framework, rendering mode, existing motion stack, layer order, …
- Application rule: verify current original + supported API; never invoke a technique solely from its index entry.

## Source 19 — ambient-section-particles

- Area: **motion-system** · pipeline: **design** · original: [SHA-pinned SKILL.md](https://github.com/MengTo/Skills/blob/4beca95ab7da396a3aeb8cbe0a1dc192751bd48d/agent-skills/web-design/ambient-section-particles/SKILL.md)
- License and API compatibility: **not individually audited**
- Source size: 81 lines; fetched and structurally examined
- Headings: Ambient Section Particles (L6) · Choose the renderer (L10) · Define one configuration (L18) · Layer the section (L38) · Run the simulation (L46)
- Implementation clue: L8 — Build particles as a bounded atmosphere layer, not as a page-wide screensaver.…
- QA/safety clue: L36 — Scale density by container area, then clamp it for mobile and low-power device…
- Application rule: verify current original + supported API; never invoke a technique solely from its index entry.

## Source 20 — animation-on-scroll

- Area: **scroll-choreography** · pipeline: **design** · original: [SHA-pinned SKILL.md](https://github.com/MengTo/Skills/blob/86cdba41dee9eeb27ae7b7dcced46ade232f1b0e/agent-skills/web-design/animation-on-scroll/SKILL.md)
- License and API compatibility: **not individually audited**
- Source size: 111 lines; fetched and structurally examined
- Headings: Animation On Scroll Skill (L6) · Workflow (L8) · Usage checklist (L13) · IntersectionObserver trigger (L18) · Keyframes (L63)
- Implementation clue: L98 — Repeat: set `once = false` to allow replays when re-entering.…
- Application rule: verify current original + supported API; never invoke a technique solely from its index entry.

## Source 21 — animation-systems

- Area: **motion-system** · pipeline: **design** · original: [SHA-pinned SKILL.md](https://github.com/MengTo/Skills/blob/bfba54e968cc09d063e8d60765b24022d998cf31/agent-skills/web-design/animation-systems/SKILL.md)
- License and API compatibility: **not individually audited**
- Source size: 188 lines; fetched and structurally examined
- Headings: Animation Systems (Stripe × Linear × Apple × Vercel) (L6) · The goals (why motion exists) (L14) · The Stripe/Linear/Apple/Vercel style (shared traits) (L26) · 1) Restraint (L28) · 2) Clear choreography (L32)
- Implementation clue: L38 — Use easing that feels **human** (soft acceleration + gentle settle).…
- QA/safety clue: L39 — Avoid bouncy defaults for serious product UI.…
- Application rule: verify current original + supported API; never invoke a technique solely from its index entry.

## Source 22 — background-grid-webgl

- Area: **materials-shaders** · pipeline: **build** · original: [SHA-pinned SKILL.md](https://github.com/MengTo/Skills/blob/8bd40421adcbaf7600550d252e1c7618dd272be0/agent-skills/web-design/background-grid-webgl/SKILL.md)
- License and API compatibility: **not individually audited**
- Source size: 43 lines; fetched and structurally examined
- Headings: Background Grid WebGL Skill (L6) · Use When (L8) · Workflow (L11) · Scope (L13) · Visual target (L17)
- Implementation clue: L9 — Create a perspective WebGL background grid with fading lines, subtle particle …
- Application rule: verify current original + supported API; never invoke a technique solely from its index entry.

## Source 23 — build-interactive-particle-trail

- Area: **interaction** · pipeline: **build** · original: [SHA-pinned SKILL.md](https://github.com/MengTo/Skills/blob/429e5c683dc7e169ac327e89f9195f77562a1663/agent-skills/web-design/build-interactive-particle-trail/SKILL.md)
- License and API compatibility: **not individually audited**
- Source size: 119 lines; fetched and structurally examined
- Headings: Build an Interactive Particle Trail (L6) · Resolve the interaction plane (L12) · Emit by distance (L20) · Recycle a GPU pool (L56) · Reuse the pool for bursts (L86)
- Implementation clue: L6 — # Build an Interactive Particle Trail…
- QA/safety clue: L94 — Under `prefers-reduced-motion: reduce`, do not advance particle age. Seed a de…
- Application rule: verify current original + supported API; never invoke a technique solely from its index entry.

## Source 24 — build-threejs-scroll-worlds

- Area: **scroll-choreography** · pipeline: **design** · original: [SHA-pinned SKILL.md](https://github.com/MengTo/Skills/blob/8996aca04d8d0df3311e0b1e2d1208176a18ede9/agent-skills/web-design/build-threejs-scroll-worlds/SKILL.md)
- License and API compatibility: **not individually audited**
- Source size: 310 lines; fetched and structurally examined
- Headings: Build Three.js Scroll Worlds (L6) · Route the request correctly (L14) · Read the build references (L24) · Start with the output, not the template (L34) · Write the world bible before code (L50)
- Implementation clue: L6 — # Build Three.js Scroll Worlds…
- QA/safety clue: L46 — the initial-load and total-download budget.…
- Application rule: verify current original + supported API; never invoke a technique solely from its index entry.

## Source 25 — cinematic-gsap-lenis-motion-system

- Area: **scroll-choreography** · pipeline: **design** · original: [SHA-pinned SKILL.md](https://github.com/MengTo/Skills/blob/1aa69da8460ce0db325765de5ff14c1d6b92960f/agent-skills/web-design/cinematic-gsap-lenis-motion-system/SKILL.md)
- License and API compatibility: **not individually audited**
- Source size: 618 lines; fetched and structurally examined
- Headings: Cinematic GSAP Lenis Motion System (L6) · Use When (L8) · Motion Taste (L14) · Base Tokens (L28) · Setup (L39)
- Implementation clue: L12 — The stack can use GSAP, ScrollTrigger, and Lenis.…
- QA/safety clue: L151 — @media (prefers-reduced-motion: reduce), (pointer: coarse) {…
- Application rule: verify current original + supported API; never invoke a technique solely from its index entry.

