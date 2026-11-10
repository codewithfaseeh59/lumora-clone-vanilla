import './styles/index.css'
import { site } from './data/site.js'
import { initState } from './core/state.js'
import { startTicker } from './core/ticker.js'
import { initLenis } from './core/lenis.js'
import { initHero } from './modules/hero.js'
import { initHover } from './modules/hover.js'
import { initTopbar } from './modules/topbar.js'
import { initMenu } from './modules/menu.js'
import { initComingSoon } from './modules/coming-soon.js'
import { initNav, go } from './modules/nav.js'
import { initManifesto } from './modules/manifesto.js'
import { initServices } from './modules/services.js'
import { initMethod } from './modules/method.js'
import { initAbout } from './modules/about.js'
import { initLoop } from './modules/loop.js'
import { initPreloader } from './modules/preloader.js'

// The real stylesheet is in place by now (imported above), so the stop-gap critical CSS
// from index.html must go — otherwise it would keep the preloader's contents hidden.
document.getElementById('critical-css')?.remove()

document.title = site.title
history.scrollRestoration = 'manual'

// order matters: state first (geometry), DOM builders before hover, ticker last
initState()
initLenis() // first in the ticker, so scroll is updated before everything reads it
initHero()
initHover(go) // clicking a hero character opens its page
initTopbar()
initMenu()
initComingSoon()
initNav()
initManifesto()
initServices()
initMethod()
initAbout()
initLoop()
initPreloader()
startTicker()
