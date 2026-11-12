# GSAP, animations, scroll and WebGL — original source cards

> SHA-pinned machine-generated source outlines, NOT expert semantic reviews. Fetch exact upstream source for full procedure; never execute untrusted code.

## fixing-motion-performance

- **Exact SHA source:** [ibelick/ui-skills](https://github.com/ibelick/ui-skills/blob/7d22f2ecdd3305f73cf202cb9b5a0e4c1d3700e5/skills/fixing-motion-performance/SKILL.md)
- **Use signals:** fixing, motion, performance, audit, fix, animation, issues, including, layout, thrashing, compositor, properties
- **Source sections:** fixing-motion-performance → how to use → when to apply → rendering steps glossary → rule categories by priority → quick reference
- **Action anchors (keyword signatures):** L26: adding changing animations css waapi motion raf gsap / L27: refactoring janky interactions transitions / L28: implementing scroll linked motion reveal scroll
- **Validation/caution anchors:** L30: reviewing components will change transforms measurement / L72: measure once then animate via transform opacity / L56: interleave layout reads writes same frame / L57: animate layout continuously large meaningful surfaces
- **Source excerpt (untrusted, max 18 words):** L26: adding or changing UI animations (CSS, WAAPI, Motion, rAF, GSAP)
- **Status:** automated-source-structure; license not_checked.

## game-dev-combat-animation

- **Exact SHA source:** [MengTo/Skills](https://github.com/MengTo/Skills/blob/3176811d6a3d400224fd5275301491d0086802c0/agent-skills/game-combat/game-dev-combat-animation/SKILL.md)
- **Use signals:** game, dev, combat, animation, fix, review, character, animations, melee, strikes, bow, shots
- **Source sections:** Game dev: combat animation → The loop → The arm and hand rules → Techniques that worked → Traps that each cost a round → Report
- **Action anchors (keyword signatures):** L17: write standard before touching keys extend docs combat animation / L23: keys anatomy hand positions each key pick upper arm / L58: shoulder relative hands arc interpolation fixed hand target lunging
- **Validation/caution anchors:** L20: mark each rule test measured reviewed scored frames / L28: measure before looking bake then / L36: ship rules tests changelog real screenshots push sizes publish / L64: never hold arm out foe blade hanging
- **Source excerpt (untrusted, max 18 words):** L17: **Write the standard before touching keys.** Extend `docs/combat-animation-standard.md` (or the project's equivalent) with the move's own numbered rules:
- **Status:** automated-source-structure; license not_checked.

## globe-particles

- **Exact SHA source:** [MengTo/Skills](https://github.com/MengTo/Skills/blob/b55295f3f06354e1173761fb94fc53d766280663/agent-skills/web-design/globe-particles/SKILL.md)
- **Use signals:** globe, particles, like, particle, visualization, dense, luminous, spherical, core, thinner, orbital, ring
- **Source sections:** Globe Particles → Scope → Visual Target → HTML And CSS → Particle Shader → Three.js Recipe
- **Action anchors (keyword signatures):** L9: apply only globe like particle visualization / L11: planetary orbital infrastructure synthesized data globe effects / L278: glow tune pointsize additive blending particle count shape stays
- **Validation/caution anchors:** L10: change full page layout copy unrelated motion systems
- **Source excerpt (untrusted, max 18 words):** L9: Apply only to a globe-like 3D particle visualization.
- **Status:** automated-source-structure; license not_checked.

## gsap-core

- **Exact SHA source:** [greensock/gsap-skills](https://github.com/greensock/gsap-skills/blob/98639432f4112b664aa5e53cf5d8ea1a4697eff9/skills/gsap-core/SKILL.md)
- **Use signals:** gsap, core, official, api, fromto, easing, duration, stagger, defaults, matchmedia, responsive, prefers
- **Source sections:** GSAP Core → When to Use This Skill → When to Use GSAP → Prefer GSAP Instead of CSS Animations When → When to recommend GSAP over other JavaScript animation libraries → Core Tween Methods
- **Action anchors (keyword signatures):** L37: runtime control pause reverse seek / L50: gsap fromto targets fromvars tovars explicit start end reading / L51: gsap set targets vars apply immediately duration
- **Validation/caution anchors:** L88: directional rotation append suffix rotation values string short shortest / L65: immediaterender true default fromto tween start state applied soon / L85: autoalpha prefer over opacity fade out value gsap also
- **Source excerpt (untrusted, max 18 words):** L37: ✅ runtime control (pause, reverse, seek)
- **Status:** automated-source-structure; license not_checked.

## gsap-frameworks

- **Exact SHA source:** [greensock/gsap-skills](https://github.com/greensock/gsap-skills/blob/3c2df8611b61d0c97abb8d32ed922ce8207424e5/skills/gsap-frameworks/SKILL.md)
- **Use signals:** gsap, frameworks, official, vue, svelte, other, non, react, lifecycle, scoping, selectors, cleanup
- **Source sections:** GSAP with Vue, Svelte, and Other Frameworks → When to Use This Skill → Principles (All Frameworks) → Vue 3 (Composition API) → Vue 3 (script setup) → Nuxt 4
- **Action anchors (keyword signatures):** L17: tweens scrolltriggers after component dom available onmounted onmount / L18: kill revert them unmount equivalent cleanup nothing runs detached / L19: scope selectors component root box similar only match elements
- **Validation/caution anchors:** not detected
- **Source excerpt (untrusted, max 18 words):** L17: **Create** tweens and ScrollTriggers **after** the component’s DOM is available (e.g. onMounted, onMount).
- **Status:** automated-source-structure; license not_checked.

## gsap-performance

- **Exact SHA source:** [greensock/gsap-skills](https://github.com/greensock/gsap-skills/blob/05792acf5b0ea7fd30042cdc5e91282e8e047898/skills/gsap-performance/SKILL.md)
- **Use signals:** gsap, performance, official, prefer, transforms, avoid, layout, thrashing, will, change, batching, optimizing
- **Source sections:** GSAP Performance → When to Use This Skill → Prefer Transform and Opacity → will-change → Batch Reads and Writes → Many Elements (Stagger, Lists)
- **Action anchors (keyword signatures):** L79: ignore cleanup stray tweens scrolltriggers keep running can hurt
- **Validation/caution anchors:** L59: scrub small value scrub can reduce work during scroll / L78: hundreds overlapping tweens scrolltriggers without testing low end devices / L20: avoid possible width height top left margin padding they / L39: long lists consider virtualization animating only visible items avoid
- **Source excerpt (untrusted, max 18 words):** L20: ❌ Avoid when possible: **width**, **height**, **top**, **left**, **margin**, **padding** (they trigger layout and can cause jank).
- **Status:** automated-source-structure; license not_checked.

## gsap-plugins

- **Exact SHA source:** [greensock/gsap-skills](https://github.com/greensock/gsap-skills/blob/bb5f7483038adf26a889c8b2b85e3ef2cf0141dc/skills/gsap-plugins/SKILL.md)
- **Use signals:** gsap, plugins, official, registration, scrolltoplugin, scrollsmoother, flip, draggable, inertia, observer, splittext, scrambletext
- **Source sections:** GSAP Plugins → When to Use This Skill → Licensing & Install (important) → Registering Plugins → Scroll → ScrollToPlugin
- **Action anchors (keyword signatures):** not detected
- **Validation/caution anchors:** L36: react register top level once app before first usegsap
- **Source excerpt (untrusted, max 18 words):** L36: ✅ In React, register at top level or once in the app (e.g. before first useGSAP); do not
- **Status:** automated-source-structure; license not_checked.

## gsap-react

- **Exact SHA source:** [greensock/gsap-skills](https://github.com/greensock/gsap-skills/blob/e2e51805457943cd4982fe792b858c14fa2c3c8f/skills/gsap-react/SKILL.md)
- **Use signals:** gsap, react, official, usegsap, hook, refs, context, cleanup, user, wants, animation, next
- **Source sections:** GSAP with React → When to Use This Skill → Installation → Prefer the useGSAP() Hook → Refs for Targets → Dependency array, scope, and revertOnUpdate
- **Action anchors (keyword signatures):** L41: pass scope ref element selectors like box scoped root / L42: cleanup reverting animations scrolltriggers runs automatically unmount / L77: pass scope ref element second argument selectors scoped node
- **Validation/caution anchors:** L43: contextsafe hook return value wrap callbacks oncomplete they after / L124: run gsap only client usegsap useeffect call gsap scrolltrigger
- **Source excerpt (untrusted, max 18 words):** L41: ✅ Pass a **scope** (ref or element) so selectors like `.box` are scoped to that root.
- **Status:** automated-source-structure; license not_checked.

## gsap-scrolltrigger

- **Exact SHA source:** [greensock/gsap-skills](https://github.com/greensock/gsap-skills/blob/6d8c09f2136c108595c9e0db859c4a39460e99cf/skills/gsap-scrolltrigger/SKILL.md)
- **Use signals:** gsap, scrolltrigger, official, scroll, linked, animations, pinning, scrub, triggers, building, recommending, based
- **Source sections:** GSAP ScrollTrigger → When to Use This Skill → Registering the Plugin → Basic Trigger → Key config options → ScrollTrigger.batch()
- **Action anchors (keyword signatures):** L83: triggers selector text box array elements / L91: interval number max time seconds collect each batch default / L92: batchmax number function max elements per batch full callback
- **Validation/caution anchors:** L84: vars standard scrolltrigger config start end once callbacks etc / L131: pintype fixed transform controls pinning applied scroller fixed pins / L275: call scrolltrigger refresh after dom layout changes new content
- **Source excerpt (untrusted, max 18 words):** L83: **triggers**: selector text (e.g. `".box"`) or Array of elements.
- **Status:** automated-source-structure; license not_checked.

## gsap-timeline

- **Exact SHA source:** [greensock/gsap-skills](https://github.com/greensock/gsap-skills/blob/1fed372b0e5276b2a207d80bc23f81180a0dff55/skills/gsap-timeline/SKILL.md)
- **Use signals:** gsap, timeline, official, timelines, position, parameter, nesting, playback, sequencing, animations, choreographing, keyframes
- **Source sections:** GSAP Timeline → When to Use This Skill → Creating a Timeline → Position Parameter → Timeline Defaults → Timeline Options (constructor)
- **Action anchors (keyword signatures):** L30: absolute start second / L33: placement start recently added animation starts start recently added / L55: paused true paused call play start
- **Validation/caution anchors:** not detected
- **Source excerpt (untrusted, max 18 words):** L30: **Absolute**: `1` — start at 1 second.
- **Status:** automated-source-structure; license not_checked.

## gsap-utils

- **Exact SHA source:** [greensock/gsap-skills](https://github.com/greensock/gsap-skills/blob/367e405e027936ce6b5fb85ec996beb135715194/skills/gsap-utils/SKILL.md)
- **Use signals:** gsap, utils, official, clamp, maprange, normalize, interpolate, random, snap, toarray, wrap, pipe
- **Source sections:** gsap.utils → When to Use This Skill → Overview → Clamping and Ranges → clamp(min, max, value?) → mapRange(inMin, inMax, outMin, outMax, value?)
- **Action anchors (keyword signatures):** L273: omit value argument get reusable function same range config / L274: snap grid aligned step based values toarray gsap code / L275: gsap utils selector scope components selectors scoped container ref
- **Validation/caution anchors:** not detected
- **Source excerpt (untrusted, max 18 words):** L273: ✅ Omit the value argument to get a reusable function when the same range/config is used many times
- **Status:** automated-source-structure; license not_checked.

## html-explainer-video

- **Exact SHA source:** [MengTo/Skills](https://github.com/MengTo/Skills/blob/5326cec466cbdc96d7d3a0b8cdca0d5b5b7f3668/agent-skills/media/html-explainer-video/SKILL.md)
- **Use signals:** html, explainer, video, turn, product, feature, idea, finished, one, minute, any, look
- **Source sections:** HTML Explainer Video → The mechanism → The three inputs → Workflow → Rules, each with the failure it prevents → Numbers from the source films and this one
- **Action anchors (keyword signatures):** L53: write explainer one idea someone should leave believing who / L55: write script references format hook benefit quick tutorial try / L56: free clock scripts words draft script txt out words
- **Validation/caution anchors:** L54: set look references looks scripts read look mjs their / L58: check scripts check film mjs film html every look / L73: something changes nearly every phrase its word engaging came / L74: times come words always name draft any film timed
- **Source excerpt (untrusted, max 18 words):** L53: **Write Explainer.md**: what it is, the one idea someone should leave believing, who it's for, every fact the
- **Status:** automated-source-structure; license not_checked.

