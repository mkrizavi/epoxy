# V2 refinement and verification

## Mobile rendering diagnosis

The original mobile path still masked a viewport-sized photograph with SVG turbulence and displacement. `filter:none` was assigned to the ellipse, but the displacement filter is on its parent SVG group. Therefore that rule did not remove the filtered compositing stage. The moving mask could require repeated filtering and rasterization on mobile. This is a source-level diagnosis of an expensive rendering path, not a measured device performance trace. There was no per-frame React state update in the original hero.

Mobile now renders the completed photo without a mask, hides the desktop filter tree, and translates one opaque concrete cover with a pre-drawn, irregular curved leading edge. The edge carries a restrained metallic rim. Only its parent transform changes during the 4.8-second spread; no geometry, filter, clip-path, layout, canvas, DPR or React state changes occur per frame. The original easing is retained. Concrete noise is pre-rasterized to a small local WebP instead of rendering SVG turbulence during movement. A brief opacity-only final reflection replaces the large mobile shine sweep. The compositor hint is released on completion.

Desktop retains the original mask geometry, filter, easing, 7.2-second duration and 0.7-second secondary-front offset. Mobile remains 2× slower than its original 2.4-second duration. Reduced motion hides the moving cover and shows the finished surface immediately. CSS begins without waiting for hydration, so a poster remains usable without JavaScript. No animation blocks links.

One route-scoped IntersectionObserver manages reveals. All observers, visibility listeners and pointer frame requests are cleaned up. Hidden tabs pause CSS animation. Pointer reflection is fine-pointer only, throttled to one requestAnimationFrame, with cached geometry; touch devices have no reflection layer. Mobile parallax, image clipping reveals and large backdrop blur are disabled. No animation libraries or new dependencies were added.

## Visual changes

- Warm off-white header, original ET asset, graphite brand typography and navigation, yellow call button, compact scroll state without mobile height changes.
- Mobile menu remains mounted for opening/closing transitions, is inert when closed, has staggered text, active links, Escape handling, initial focus, a focus loop and breakpoint cleanup.
- All decorative arrows removed. Gallery previous/next controls use text and retain keyboard arrow-key support.
- Shared motion timing, typography entrances, image settling, restrained desktop parallax, tactile buttons, service image opacity/scale changes on hover and focus, and light footer with larger original brand text.
- Homepage staggered header/headline/support/CTA entrances run during the liquid reveal so meaningful actions do not wait for it to finish.
- Radovi retains all filters, concept labels, native dialog focus containment, Escape, previous/next and horizontal swipe. Filter changes and image changes animate immediately; dialog closing takes 140ms and restores trigger focus.
- O nama adds asymmetric image reveals and staggered schematic layers; process lines and steps animate when entering view.
- Kontakt has headline/image entrances, subtle row border/background feedback and a highlighted phone row. Email text stays stationary and selectable.

## Validation

Run `npm run lint`, `npm run typecheck`, `npm run build`, then `node scripts/check-v2.mjs`.

The static verification checks all four built routes, shared phone/email/navigation, local image availability, absence of decorative arrows, desktop/mobile spread timing and reduced-motion/visibility wiring. It does not simulate a browser.

No browser executable is installed in this environment, so screenshots, hydration checks, actual overflow measurements, touch/keyboard interaction tests and frame profiling remain unverified. Real-device QA is needed on iPhone Safari, Android Chrome and a mid-range phone. Check 360, 390, 430, 768, 1024, 1440 and 1920px widths, including an orientation change while the menu is open; ensure the organic edge clears the hero, no heading clips, phone/email links invoke the correct apps, gallery swipe ignores vertical gestures, and reduced motion works before load and when toggled. Check Performance/Layers tools to confirm compositing and frame pacing; no universal 60 FPS claim is made.

Nothing is committed, pushed or deployed.
