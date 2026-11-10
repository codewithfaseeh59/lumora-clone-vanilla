import './styles/index.css'
import { site } from './data/site.js'
import { initState } from './core/state.js'
import { startTicker } from './core/ticker.js'
import { initHero } from './modules/hero.js'
import { initHover } from './modules/hover.js'
import { initTopbar } from './modules/topbar.js'
import { initMenu } from './modules/menu.js'
import { initComingSoon, openComingSoon } from './modules/coming-soon.js'
import { initManifesto } from './modules/manifesto.js'
import { initServices } from './modules/services.js'
import { initMethod } from './modules/method.js'
import { initAbout } from './modules/about.js'
import { initLoop } from './modules/loop.js'
import { initPreloader } from './modules/preloader.js'

document.title = site.title
history.scrollRestoration = 'manual'

// order matters: state first (geometry), DOM builders before hover, ticker last
initState()
initHero()
initHover(openComingSoon)
initTopbar()
initMenu()
initComingSoon()
initManifesto()
initServices()
initMethod()
initAbout()
initLoop()
initPreloader()
startTicker()
