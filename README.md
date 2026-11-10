# lumora — agency homepage (educational project)

A concept-led design-studio homepage built to teach scroll-driven motion, in two versions:

| Version | Stack | Status |
|---|---|---|
| `v1-vanilla/` | HTML + CSS + vanilla JS, bundled with Vite. No animation libraries, no CDNs | ✅ built |
| `v2-nextjs/` | Next.js + TypeScript | planned |

All artwork (the smiley characters) and copy are original and were made for this project.

## Run V1

```bash
cd v1-vanilla
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/ (one folder per page)
```

## What's in V1

- **Preloader**: falling colour drops, wordmark, arched curtain
- **Hero collage**: 9 characters with idle drift, pointer parallax and 3D tilt
- **Hover**: full-screen colour wipe from the character's centre + a cursor-following badge
- **Smooth scroll**: Lenis (from npm), driven by the site's single rAF loop
- **Scroll choreography**: collage flies apart, manifesto rises, per-character text highlight
- **Services**: sticky stack, cards swing in from the side in 3D
- **Method**: timer-driven preview frames, **About**: pointer-parallax floaters
- **Infinite loop**: the last screen mirrors the first, so reaching the bottom wraps to the top seamlessly
- **Inner pages**: `/digital/`, `/branding/`, `/about/`, `/projects/` (with filters) and 7 case studies `/work/<id>/`, all sharing one header, menu, footer, Lenis and a curtain page-transition
- **Book a call** (`/book/`): dummy booking flow with a calendar, generated time slots, validated form, confirmation and a downloadable .ics; nothing is sent anywhere
- **Menu overlay** (circle reveal, focus trap, inert page), "coming soon" modal, full mobile layout

## Structure (V1)

```
src/
  core/      ticker (one rAF loop), state (cached geometry), math
  modules/   hero, hover, manifesto, services, method, about, loop, menu, topbar, preloader, coming-soon
  styles/    one CSS file per section + tokens (design unit --u) + mobile
  data/      site (brand + copy), assets (paths), hero-objects (layout, colours, labels)
```

Layout is designed on a 1440×760 artboard; every size is `calc(N * var(--u))`, so the page scales like an image.
Not affiliated with any real agency.
