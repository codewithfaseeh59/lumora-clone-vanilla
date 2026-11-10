import { state } from '../core/state.js'
import { ticker } from '../core/ticker.js'
import { jumpTo } from '../core/lenis.js'

// Infinite loop. The last screen is a copy of the first one (captions) and hero.js
// brings the collage back in during it, so at the very bottom the page looks exactly
// like the top. Reaching the bottom therefore just jumps scroll back to 0.
export function initLoop() {
  let cooldown = 0

  ticker.add(() => {
    if (document.body.classList.contains('is-booting') || state.maxScroll < 100) return
    const now = performance.now()
    if (now < cooldown) return
    if (state.scrollY >= state.maxScroll - 2) {
      cooldown = now + 250
      jumpTo(0)
      state.scrollY = 0
    }
  })

  // scrolling up from the very top wraps to the bottom
  window.addEventListener(
    'wheel',
    (e) => {
      if (e.deltaY < 0 && state.scrollY <= 0 && !document.body.classList.contains('menu-open')) {
        cooldown = performance.now() + 250
        jumpTo(state.maxScroll - 6)
      }
    },
    { passive: true }
  )
}
