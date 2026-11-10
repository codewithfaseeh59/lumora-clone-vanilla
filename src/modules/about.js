import { state } from '../core/state.js'
import { ticker } from '../core/ticker.js'
import { damp } from '../core/math.js'

// Floating ornaments drift with the pointer while it's over the about section.
// (Their hover wipe + badge come from hover.js.)
export function initAbout() {
  const section = document.querySelector('#about')
  const floats = [...document.querySelectorAll('.about-float')].map((el, i) => ({
    el,
    depth: Number(el.dataset.depth || 1),
    x: 0,
    y: 0,
    phase: i * 1.3,
  }))
  let inside = false
  section.addEventListener('pointerenter', () => (inside = true))
  section.addEventListener('pointerleave', () => (inside = false))

  ticker.add((t, dt) => {
    const g = state.geo.about
    if (!g || state.scrollY + state.vh < g.top || state.scrollY > g.top + g.height) return
    const u = state.unit
    floats.forEach((f) => {
      const k = inside && !state.reduced ? 1 : 0
      f.x = damp(f.x, state.nx * f.depth * 22 * u * k, 4, dt)
      f.y = damp(f.y, state.ny * f.depth * 16 * u * k, 4, dt)
      const bob = state.reduced ? 0 : Math.sin(t * 0.8 + f.phase) * 6 * u
      f.el.style.transform = `translate3d(${f.x.toFixed(1)}px, ${(f.y + bob).toFixed(1)}px, 0)`
    })
  })
}
