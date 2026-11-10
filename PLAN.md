# Agency Clone — Master Plan

Pixel- and motion-accurate educational rebuild of the **emblematica.agency** homepage,
in two versions:

| Version | Stack | Folder | Status |
|---|---|---|---|
| V1 | HTML + CSS + vanilla JS (ES modules), bundled with **Vite** | `v1-vanilla/` | Built |
| V2 | **Next.js** (App Router) + **TypeScript** | `v2-nextjs/` | After V1 is deployed |

**Rules**
- Design, layout, spacing, colors, typography, animations, hover effects and timings: **1:1 with the original**.
- Only the **brand** changes: name, logo, email, social links, meta/OG, footer credit.
- **No CDNs.** Every dependency comes from npm; every font/image/video is served locally.
- We **re-implement** the behavior ourselves. The original code in `reference/` is only for reading values (positions, colors, timings, easing curves). We never paste it into the project.

---

## 1. What the original is built with (findings)

- Built in **Tilda**, but ~265 KB of the page is **hand-written HTML/CSS/JS** in 8 custom blocks (saved in `reference/original-blocks/`).
- **No animation library.** It doesn't use GSAP, Lenis or Three.js. Everything is vanilla:
  `requestAnimationFrame` loop, `lerp` smoothing, CSS 3D (`perspective`, `rotateX/Y`),
  `clip-path` wipes, `IntersectionObserver`, `matchMedia`.
- **Native scroll** (no smooth-scroll library). Scroll position drives animation progress.
- **Font:** Inter Tight, mostly weight 800, uppercase.
- **Design unit system:** layout is designed on a 1440×760 artboard. One unit is
  `--u: min(0.0694444444vw, 0.1315789474dvh)` (= 1/1440 of width or 1/760 of height,
  whichever is smaller). Every size is `calc(N * var(--u))`, so the whole scene
  scales like an image. **We copy this system exactly.**
- **Design tokens:** `--ink #0e0c0d`, `--paper #dadada`, `--white #fbfbfb`,
  `--acid #d5ff69`, dark band `#08080a`.
- **Breakpoints:** `max-width: 900px` (mobile stack) / `min-width: 901px` (desktop),
  `hover: hover` (pointer devices only), `prefers-reduced-motion`, one at `600px`.
- **Scope:** homepage only. Every link to an inner page (`/branding`, `/digital`,
  `/web/...`) opens the **"This page is on its way"** modal, the same as the original.

---

## 2. Page anatomy (top → bottom)

| # | Section | Key behavior to reproduce |
|---|---|---|
| 0 | **Preloader** (`body.is-booting`) | Dark screen, `preloader-object-fall` + `preloader-curtain-arc` keyframes, then reveals the page |
| 1 | **Topbar** | Logo (left), `MENU ⠿` pill (center), `ESP` + `SHARE A BRIEF` (acid) pills (right). The logo **inverts** while it sits over the dark sections |
| 2 | **Menu overlay** | FLIP open/close animation, `menuCloseDrift` keyframes, focus trap, `inert` page, Eng/Esp toggle synced with topbar, nav: Web&Digital, Branding&Design, Who we are, Projects, Book a call |
| 3 | **Hero collage** (`.visual-layer` + `.hero`) | 9 3D objects (below). Idle "breathing" drift that eases in on boot, pointer parallax + 3D tilt per object (`depth`, `axis-x/y`, `spin`), hover: **full-screen color wipe** from the object's center + a **round badge** that follows the cursor with a label, click: link / coming-soon. 3 captions at the bottom |
| 4 | **Hero → Manifesto** | Objects **fly apart** to the sides on scroll (separate desktop and mobile exit maps). The dark manifesto rises over the hero |
| 5 | **Manifesto** | Label, kicker ("…we believe / Good design starts with a strong idea"), scroll-driven **per-character color highlight** of the paragraph |
| 6 | **Services** | 5 cards (lime, pink, violet, lilac, white), "side-entry" 3D animation with per-card perspective and a JS-pinned hold on the last card. Each card has a looping muted video + poster |
| 7 | **Creative method** | "First we make it make sense. Then we make it look good." Rotating preview images (`methodPreviewRise` / `methodPreviewLeave`, timer-driven), vision/mood/idea boards |
| 8 | **Method → About transition** | Curtain (`method-transition`) |
| 9 | **About** | "A women-founded agency…", founders portrait, floating 3D ornaments (certificates etc.) with pointer parallax and hover wipes, "More about us" → coming-soon |
| 10 | **Loop hero** | A clone of the first screen rises at the end. On reaching it the page **wraps scroll back to the top seamlessly**, giving an infinite loop. Desktop uses the "overlap seam"; mobile uses the plain transition |
| 11 | **Coming-soon modal** | Backdrop, card, close / "Got it", focus handling |

### Hero objects (exact data)

| Object | depth | axis-x | axis-y | spin | hover color | badge label |
|---|---|---|---|---|---|---|
| cow | 1.05 | -1 | 0.55 | -4 | `#FF8DB6` | crypto brand identity |
| grapes | 0.72 | 0.35 | -1.15 | 7 | `#B8D95A` | rural tourism website |
| brunette | 0.56 | -0.55 | 0.9 | -5 | `#FF7A59` | how we do branding |
| bird | 0.86 | 0.9 | -0.7 | 9 | `#7E6DFF` | brunch-to-bar identity |
| blob (bag) | 0.48 | -0.8 | 0.38 | -3 | `#FFBE3D` | art studio rebranding |
| blonde | 0.38 | 0.75 | -0.45 | 3 | `#FF5490` | how we do websites |
| tv | 0.64 | 1.1 | 0.35 | 5 | `#D5FF69` | influencer agency concept |
| cup | 1.18 | -0.3 | 1.2 | -9 | `#F6E7C6` | coffee chain |
| shawarma | 0.92 | 1 | -0.25 | -8 | `#FF6B35` | fast food restaurant promo |

**Color wipe recipe:** a fixed full-screen `div.color-wipe` with
`background: var(--wipe-color)`. It animates
`clip-path: circle(0 → 150vmax at x y)` over `920ms cubic-bezier(0.22,0.78,0.18,1)`.
Older wipes are removed after 960 ms. On leave, opacity fades to 0 over 300 ms.
It runs on desktop with real hover only, never during scroll-driven re-hit-tests.
The badge swaps label with a shrink (scale 0.48) → 140 ms → grow (scale 1).

---

## 3. Assets and copy (updated)

The characters, videos, photos and marketing copy of the original belong to the agency, so this
project does **not** download or reuse them. We reproduce the **mechanics and feel**
(hover color wipe, cursor badge, parallax, scroll choreography, infinite loop), with:

- **Original artwork:** placeholder characters (`public/assets/images/*.svg`, drawn for this project). To use
  your own 3D avatars later, change paths in `src/data/assets.js` only.
- **Original copy:** our own headlines and text, written in `src/data/site.js`.
- **Own brand:** `lumora` (name, logo, email), `noindex` + "educational project" footer note.
- `reference/` (the original source) stays local, is gitignored, and is only for studying techniques.

Because nothing third-party is shipped, the repo can be public and V1/V2 can be deployed freely.

---

## 4. Tech stack — V1

| Need | Choice | Why |
|---|---|---|
| Dev server / bundler | `vite` | Fast, zero-config, ES modules, builds to static `dist/` |
| Font | `@fontsource/inter-tight` (weights 400–900) | Local font from npm, no Google CDN |
| CSS | Plain CSS + custom properties, split per section, `@import` via Vite | Same as the original; nothing to "translate" |
| Animation | Own rAF engine + `lerp` + CSS transitions/keyframes | The original's exact feel. GSAP would change easing/feel |
| Lint/format | `prettier` | Clean code for the videos |
| Asset fetch | `scripts/fetch-assets.mjs` (Node `fetch`) | One command to pull reference assets locally |
| Image optimisation | Keep `.webp` as-is | The originals are already webp |
| Deploy | Vercel or Netlify (static `dist/`) | Free, git-connected |

No jQuery or Tilda runtime is needed; the custom code doesn't depend on them.

---

## 5. Folder structure

```
agency-clone/
├─ PLAN.md                  ← this file
├─ README.md
├─ .gitignore               ← node_modules, dist, reference/, v1-vanilla/public/assets/
├─ reference/               ← original HTML + 8 custom blocks (read-only, NOT pushed)
├─ v1-vanilla/
│  ├─ index.html            ← all markup (semantic, same class names)
│  ├─ package.json
│  ├─ vite.config.js
│  ├─ scripts/
│  │  └─ fetch-assets.mjs
│  ├─ public/
│  │  ├─ assets/            ← images/videos (gitignored, fetched)
│  │  └─ favicon.svg        ← new brand
│  └─ src/
│     ├─ main.js            ← boot order, wires modules into one rAF loop
│     ├─ data/
│     │  ├─ site.js         ← brand name, email, links, labels
│     │  ├─ assets.js       ← every asset path (swap point)
│     │  └─ hero-objects.js ← depth/axis/spin/color/label/href table
│     ├─ core/
│     │  ├─ ticker.js       ← single requestAnimationFrame loop (subscribe/unsubscribe)
│     │  ├─ math.js         ← lerp, clamp, mapRange, easing curves
│     │  ├─ geometry.js     ← cached docTop/height per section (no per-frame layout reads)
│     │  ├─ scroll.js       ← scrollY, progress helpers, wrap-jump support
│     │  ├─ pointer.js      ← normalized pointer, hover capability
│     │  └─ media.js        ← mobile MQ (900px), reduced-motion, broken-asset guard
│     ├─ modules/
│     │  ├─ preloader.js
│     │  ├─ topbar.js       ← logo invert over dark band
│     │  ├─ menu.js         ← overlay, FLIP, focus trap, lang toggle
│     │  ├─ coming-soon.js  ← modal + link interception
│     │  ├─ hero.js         ← objects: drift, parallax, tilt, fly-apart
│     │  ├─ hover.js        ← color wipe + cursor badge (hero + about)
│     │  ├─ manifesto.js    ← char split + scroll highlight
│     │  ├─ services.js     ← side-entry 3D cards, video play/pause in view
│     │  ├─ method.js       ← preview rotation + curtain
│     │  ├─ about.js        ← ornaments parallax
│     │  └─ loop.js         ← loop-hero clone + seamless wrap to top
│     └─ styles/
│        ├─ index.css       ← imports everything in order
│        ├─ tokens.css      ← colors, --u unit, z-index scale
│        ├─ base.css        ← reset, html/body, fonts, booting state
│        ├─ topbar.css · menu.css · preloader.css · hero.css · hover.css
│        ├─ manifesto.css · services.css · method.css · about.css
│        ├─ loop.css · coming-soon.css
│        └─ mobile.css      ← all ≤900px overrides (mirrors original part 2)
└─ v2-nextjs/               ← later
```

---

## 6. Build phases — V1

Each phase ends with a **side-by-side check** against the original (same window size, same scroll position).

### Phase 0 — Reference capture ✅ partly done
- [x] Download original HTML and split it into blocks (`reference/`)
- [x] Extract hero object data, tokens, breakpoints, wipe recipe
- [ ] Screen-record the original: desktop 1440×900, laptop 1920×1080, tablet 768, mobile 390
      (slow scroll, fast scroll, hover each object, open the menu, full loop)
- [ ] Screenshot every section at 1440 and 390 for overlay comparison

### Phase 1 — Setup
- [ ] `npm create vite@latest v1-vanilla -- --template vanilla`, then clean the boilerplate
- [ ] `npm i @fontsource/inter-tight` · `npm i -D prettier`
- [ ] `scripts/fetch-assets.mjs` + `npm run assets:fetch`
- [ ] `tokens.css` (incl. `--u`), `base.css`, `site.js`, `assets.js`
- [ ] `git init`, `.gitignore`, first commit

### Phase 2 — Static layout (no JS motion)
- [ ] Topbar + new logo
- [ ] Hero: 9 objects absolutely positioned in `--u` units + captions
- [ ] Manifesto, Services (5 cards static), Method, About, Loop hero
- [ ] Menu overlay + coming-soon modal (open state, styled)
- [ ] Mobile layout (≤900px) for all of the above
- **Check:** overlay screenshots at 1440 and 390 should match within ~1px

### Phase 3 — Core engine
- [ ] `ticker.js` single rAF loop, `math.js`, `geometry.js` (cached), `scroll.js`, `pointer.js`

### Phase 4 — Interactions & animations (in this order)
1. [ ] Menu: FLIP open/close, drift keyframes, focus trap, `inert`, lang sync
2. [ ] Coming-soon modal + capture-phase link interception
3. [ ] Topbar logo invert over the `#08080a` band
4. [ ] Hero idle drift (eased in on boot) + pointer parallax/tilt per object
5. [ ] Hover: color wipe + cursor badge (label swap, scale/rotate lerp), click to open
6. [ ] Hero fly-apart on scroll (desktop exit map), captions fade
7. [ ] Manifesto rise + per-character highlight (only touch DOM when the boundary moves)
8. [ ] Services side-entry 3D + last-card hold + video play only in view
9. [ ] Method preview rotation + curtain transition
10. [ ] About ornaments parallax + hover wipes
11. [ ] Loop hero overlap seam + seamless wrap to top
12. [ ] Preloader (object fall + curtain arc), then `is-booting` removed

### Phase 5 — Mobile & polish
- [ ] Mobile exit map + parallax ladder (damping factors per object)
- [ ] Mobile caption clip (manifesto covers captions bottom-up)
- [ ] Touch: no wipes without `hover: hover`, iOS pinch block, `touch-action: pan-y`
- [ ] `prefers-reduced-motion`
- [ ] Safari: no per-frame `getBoundingClientRect`, `scroll-anchoring: none`

### Phase 6 — QA
- [ ] Side-by-side video comparison per section
- [ ] Chrome, Safari (iOS), Firefox, Edge
- [ ] Lighthouse (performance / a11y), no console errors, no 404 assets

### Phase 7 — Ship V1
- [ ] Assets decision (section 3) resolved
- [ ] README with screenshots + "how to run"
- [ ] Push to GitHub, deploy on Vercel/Netlify, `noindex` + disclaimer

---

## 7. V2 — Next.js + TypeScript (after V1 is live)

- App Router, single `app/page.tsx`, server components for static markup
- Each animated section becomes a `'use client'` component. JS modules become hooks:
  `useTicker`, `useScrollProgress`, `usePointer`, `useHeroScene`, `useColorWipe`, `useLoopWrap`
- Typed data: `HeroObject`, `ServiceCard`, `SiteConfig`
- `next/font/local` for Inter Tight (from `@fontsource` files), `next/image` with `unoptimized` where exact sizing matters
- CSS Modules carrying over the same CSS (and the same `--u` unit)
- Same QA checklist, deployed on Vercel

---

## 8. YouTube series outline

1. Breakdown of the original + project setup
2. Design unit system (`--u`) + static hero
3. Static layout for all sections + mobile
4. Menu overlay (FLIP) + coming-soon modal
5. rAF engine + hero drift/parallax/tilt
6. Hover color wipe + cursor badge
7. Scroll engine: fly-apart + manifesto highlight
8. Services 3D side-entry + method
9. About + infinite loop wrap
10. Preloader, mobile polish, QA, deploy
11+. V2: porting to Next.js + TypeScript
