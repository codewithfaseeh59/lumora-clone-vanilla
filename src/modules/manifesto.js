import { state } from '../core/state.js'
import { ticker } from '../core/ticker.js'
import { clamp } from '../core/math.js'

// Scroll-driven highlight: the paragraph is split into characters and they light up
// one by one as the (sticky) manifesto screen scrolls. We only touch the DOM for
// characters between the old and new boundary, never all of them every frame.
export function initManifesto() {
  const p = document.querySelector('#manifestoCopy')
  const text = p.textContent.trim()
  p.textContent = ''
  // real text for assistive tech; the per-character spans are decorative
  const sr = document.createElement('span')
  sr.textContent = text
  sr.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap'
  p.appendChild(sr)
  const chars = [...text].map((c) => {
    const s = document.createElement('span')
    s.className = 'ch'
    s.setAttribute('aria-hidden', 'true')
    s.textContent = c
    p.appendChild(s)
    return s
  })

  let lit = 0
  ticker.add(() => {
    const g = state.geo.manifesto
    if (!g) return
    const start = g.top + state.vh * 0.15
    const span = g.height - state.vh * 1.1
    const progress = clamp((state.scrollY - start) / span)
    const target = Math.round(progress * chars.length)
    if (target === lit) return
    if (target > lit) for (let i = lit; i < target; i++) chars[i].classList.add('is-lit')
    else for (let i = target; i < lit; i++) chars[i].classList.remove('is-lit')
    lit = target
  })
}
