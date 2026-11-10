import { heroObjects } from '../data/hero-objects.js'
import { startIntro } from './hero.js'
import { state } from '../core/state.js'
import { lenis } from '../core/lenis.js'

// Dark intro: coloured drops fall and bounce, the wordmark rises, then a curtain with
// an arched edge lifts off to reveal the page and the collage animates in.
export function initPreloader() {
  const el = document.querySelector('#preloader')
  const drops = document.querySelector('#preloaderDrops')
  const body = document.body

  const finish = () => {
    body.classList.remove('is-booting')
    startIntro()
    el.remove()
  }

  if (state.reduced) return finish()
  lenis.stop() // no scrolling until the curtain lifts

  heroObjects.forEach((o, i) => {
    const d = document.createElement('i')
    d.className = 'preloader-drop'
    d.style.background = o.color
    d.style.left = `${6 + (i * 88) / (heroObjects.length - 1)}%`
    d.style.setProperty('--delay', `${0.15 + i * 0.09}s`)
    drops.appendChild(d)
  })

  const ready = document.fonts?.ready ?? Promise.resolve()
  const minTime = new Promise((r) => setTimeout(r, 2000))
  Promise.all([ready, minTime]).then(() => {
    el.classList.add('is-leaving')
    // reveal the page slightly after the curtain starts moving
    setTimeout(() => {
      body.classList.remove('is-booting')
      lenis.start()
      startIntro()
    }, 350)
    setTimeout(() => el.remove(), 1200)
  })
}
