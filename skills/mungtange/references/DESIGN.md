# Design depth — read for design, redesign and reference-to-code

Read this **only** when the task needs deeper visual decisions. The core
`SKILL.md` owns the execution process; this file expands the art direction
and implementation standards without inventing extra gates.

## Direction before decoration

Define a one-sentence creative thesis: "The interface should feel like
[identity] because [audience/product context], using [specific typography,
layout, color, imagery and interaction]."

For substantial design work, compare two materially different, viable
directions. Judge them on task clarity, trust, accessibility, difference
from generic templates, development cost and maintenance.

Avoid purple gradients, faux-glass dashboards, identical feature cards,
random bento grids, arbitrary motion and fake statistics **as defaults**.
They are acceptable if the product and actual content warrant them.
No aesthetics should obscure a primary action.

## Visual system

1. **Information architecture:** One primary action; labels should
   describe outcomes. Lead with content users actually need.
2. **Typography:** Define display/title/body/caption hierarchy, line
   lengths, weights, line height and fallback families. Test long Korean
   strings and mixed Latin/Korean wrapping.
3. **Color:** Semantic roles (background, surface, elevated, text,
   secondary text, action, focus, warning, danger, success). Do not rely
   on color alone to communicate meaning.
4. **Spacing:** Create an intentional rhythm and responsive container
   rules. Dense operational tools need a different rhythm from a
   marketing landing page.
5. **Imagery:** Use permissioned, product-relevant assets. Avoid
   misleading generic photos and invented brand endorsements.
6. **Motion:** Reinforce status, causality and navigation; honor
   `prefers-reduced-motion`. Do not animate every surface.
7. **Responsiveness:** Define what stacks, hides, rearranges, scrolls
   or becomes an alternative at 375/768/1440 widths. Don't merely
   scale desktop down.

## Component state contract

For interactive components, reason about applicable:
`default`, `hover`, `focus-visible`, `pressed`, `disabled`,
`loading`, `error`, `empty`, `success` and `destructive` states.
Define focus order, accessible name, keyboard activation, touch size,
error recovery, scroll position and screen-reader announcements
where appropriate.

Use semantic controls first; avoid clickable non-buttons. Make real
links point somewhere meaningful. Show what happens after a form
submission, not only the pristine form.

## Existing app or visual source

Preserve routes, data contracts, auth/session rules, design tokens
and real behavior unless the user has explicitly authorized changing
them. Compare screenshots only if source and rendered output actually
exist in accessible tools. Document inaccessible fonts/assets and
fidelity deltas instead of claiming pixel-perfect equivalence.

## Final visual critique

Ask whether a first-time visitor knows where to look, whether visual
distinctiveness serves the product, whether the content is believable,
whether 375px works with long text, and whether keyboard navigation
reveals an unusable control. Fix the highest-impact **observed** problem
before polishing minor details.
