import { state } from '../core/state.js'
import { ticker } from '../core/ticker.js'
import { clamp, easeOutCubic } from '../core/math.js'

// Side-entry stack: the section is tall and its shell is sticky. Scrolling through it
// slides each next card in from the right with a 3D swing, while the cards already
// there sink back. The last card gets a hold so it can be read before the section ends.
export function initServices() {
  const cards = [...document.querySelectorAll('.service-card')]
  const stack = document.querySelector('#servicesStack')

  ticker.add(() => {
    const g = state.geo.services
    if (!g) return
    const s = (state.scrollY - g.top) / state.vh // 0 … ~4.6 viewport-heights into the section
    const u = state.unit

    // progress of each card's entry (card 0 is simply there)
    const p = cards.map((_, i) => (i === 0 ? 1 : clamp(s - (i - 1) * 1.0 - 0.1)))

    cards.forEach((card, i) => {
      const enter = easeOutCubic(p[i])
      // how deep this card is buried under cards that arrived later
      let buried = 0
      for (let j = i + 1; j < cards.length; j++) buried += easeOutCubic(p[j])

      const x = (1 - enter) * state.vw * 1.05
      const rotY = (1 - enter) * -32
      const scale = 1 - buried * 0.045
      const y = -buried * 18 * u

      card.style.zIndex = i + 1
      card.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotateY(${rotY.toFixed(2)}deg) scale(${scale.toFixed(3)})`
      card.style.filter = buried > 0 ? `brightness(${(1 - buried * 0.12).toFixed(3)})` : ''
      card.style.visibility = enter === 0 && i > 0 ? 'hidden' : 'visible'
    })
    stack.dataset.active = String(Math.min(cards.length - 1, Math.floor(s + 1)))
  })
}
