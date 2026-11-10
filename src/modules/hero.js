import { heroObjects } from '../data/hero-objects.js'
import { state } from '../core/state.js'
import { ticker } from '../core/ticker.js'
import { clamp, damp, easeOutCubic, smooth } from '../core/math.js'

// How far the collage has "flown apart" (0 = resting hero, 1 = fully off to the sides).
// It leaves as the first screen scrolls away, and comes back during the last screen,
// so the final frame equals the first frame and the loop wrap is invisible.
export function exitAmount() {
  const { scrollY: y, vh, maxScroll } = state
  const leaving = smooth(clamp(y / (vh * 0.9)))
  const returning = 1 - smooth(clamp((y - (maxScroll - vh)) / vh))
  return Math.min(leaving, returning)
}

let introStart = null
export const startIntro = () => (introStart = performance.now())

export function initHero() {
  const stage = document.querySelector('#heroStage')
  const layer = document.querySelector('#visualLayer')

  const items = heroObjects.map((o, i) => {
    const el = document.createElement('div')
    el.className = `object object-${o.id}`
    el.setAttribute('aria-hidden', 'true')
    el.dataset.hoverColor = o.color
    el.dataset.hoverLabel = o.label
    el.dataset.href = o.href
    el.style.cssText = `--x:${o.x};--y:${o.y};--w:${o.w};--mx:${o.mx};--my:${o.my};--mw:${o.mw}`
    el.innerHTML = `<div class="rotator"><div class="sprite"><img src="${o.src}" alt="" draggable="false" /></div></div>`
    stage.appendChild(el)
    return {
      ...o,
      el,
      rotator: el.firstElementChild,
      phase: i * 0.8,
      // smoothed pointer influence (own value per object → each lags differently)
      ox: 0,
      oy: 0,
      tiltX: 0,
      tiltY: 0,
      away: false,
    }
  })

  ticker.add((t, dt) => {
    const u = state.unit
    const e = exitAmount()
    const intro = introStart === null ? 0 : (performance.now() - introStart) / 1000
    const calm = state.reduced ? 0 : 1
    // idle drift eases in once after boot so the collage "breathes up" instead of snapping on
    const breathe = clamp(intro / 2.5) * calm

    const away = e > 0.45
    if (away !== layer.classList.contains('is-away')) layer.classList.toggle('is-away', away)

    items.forEach((it, i) => {
      // entrance: each object rises + fades in, staggered
      const k = easeOutCubic(clamp((intro - i * 0.07) / 0.9))

      // pointer parallax: deeper objects travel further and tilt more
      const tx = state.nx * it.depth * 16 * u * calm
      const ty = state.ny * it.depth * 12 * u * calm
      it.ox = damp(it.ox, tx, 4 + it.depth * 2, dt)
      it.oy = damp(it.oy, ty, 4 + it.depth * 2, dt)
      it.tiltY = damp(it.tiltY, state.nx * it.depth * 9 * calm, 5, dt)
      it.tiltX = damp(it.tiltX, -state.ny * it.depth * 7 * calm, 5, dt)

      const driftX = Math.sin(t * 0.55 + it.phase) * it.axisX * 6 * u * breathe
      const driftY = Math.cos(t * 0.7 + it.phase) * Math.abs(it.axisY) * 7 * u * breathe
      const spin = Math.sin(t * 0.4 + it.phase) * it.spin * 0.35 * breathe

      // fly-apart: slide off toward the side each object already sits on
      const exitX = e * it.axisX * state.vw * 0.62
      const exitY = e * it.axisY * state.vh * 0.42
      const exitRot = e * it.spin * 7
      const scale = (0.82 + 0.18 * k) * (1 - e * 0.12)

      it.el.style.opacity = k.toFixed(3)
      it.el.style.transform = `translate3d(${(it.ox + driftX + exitX).toFixed(2)}px, ${(
        it.oy + driftY + exitY + (1 - k) * 60 * u
      ).toFixed(2)}px, 0) rotate(${(spin + exitRot).toFixed(2)}deg) scale(${scale.toFixed(3)})`
      it.rotator.style.transform = `perspective(${(900 * u).toFixed(0)}px) rotateX(${it.tiltX.toFixed(2)}deg) rotateY(${it.tiltY.toFixed(2)}deg)`
    })
  })
}
