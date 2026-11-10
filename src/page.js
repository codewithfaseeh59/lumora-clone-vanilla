import './styles/index.css'
import { initState } from './core/state.js'
import { startTicker } from './core/ticker.js'
import { initLenis } from './core/lenis.js'
import { initMenu } from './modules/menu.js'
import { initComingSoon } from './modules/coming-soon.js'
import { initNav } from './modules/nav.js'
import { initReveal, initCounters } from './modules/reveal.js'
import { initProjectsPage, initRelated, initWorkPage } from './modules/projects-ui.js'
import { heroArt } from './data/assets.js'

// Entry for every inner page (about, digital, branding, projects, work/*).
// The home page has its own entry (main.js).
initState()
initLenis()
initComingSoon() // before initNav, so "coming soon" links are claimed first
initMenu()
initNav()

// page-specific content built from data
const page = document.body.dataset.pageName
if (page === 'projects') initProjectsPage()
if (page === 'work') initWorkPage()
initRelated()

// artwork placeholders → real/custom art:  <img data-art="cloud">
document.querySelectorAll('img[data-art]').forEach((img) => (img.src = heroArt(img.dataset.art)))

// marquee: duplicate the words so the loop is seamless
document.querySelectorAll('[data-marquee]').forEach((m) => {
  m.innerHTML = `<div class="marquee-track">${m.innerHTML}${m.innerHTML}</div>`
})

initReveal()
initCounters()
startTicker()
