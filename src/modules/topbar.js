import { state } from '../core/state.js'
import { ticker } from '../core/ticker.js'

// The logo turns white while the topbar band sits over the dark stretch of the page
// (manifesto → services → method). Uses cached geometry, no layout reads.
export function initTopbar() {
  let dark = null
  ticker.add(() => {
    const { manifesto, method, about } = state.geo
    if (!manifesto || !method || !about) return
    const y = state.scrollY + 40 * state.unit
    const next = y >= manifesto.top && y < about.top
    if (next !== dark) {
      dark = next
      document.body.classList.toggle('topbar-dark', next)
    }
  })
}
