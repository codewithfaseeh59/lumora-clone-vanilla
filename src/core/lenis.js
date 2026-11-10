import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { ticker } from './ticker.js'

// Smooth scrolling. Lenis keeps using the real window scroll position, so our
// scroll-driven code (state.scrollY, sticky sections) keeps working unchanged.
export const lenis = new Lenis({
  lerp: 0.1,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1.4,
})

// Lenis runs inside our single rAF loop instead of starting its own.
export const initLenis = () => ticker.add((t) => lenis.raf(t * 1000))

// Instant jump (used by the infinite-loop wrap): no easing, and clears any momentum.
export const jumpTo = (y) => lenis.scrollTo(y, { immediate: true, force: true })
