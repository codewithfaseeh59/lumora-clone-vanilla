import { lenis } from '../core/lenis.js'

// "This page is on its way" modal. Any link to a page that doesn't exist opens it.
const modal = document.querySelector('#comingSoon')
const card = modal.querySelector('.coming-soon-card')
let lastFocus = null

export function openComingSoon() {
  document.dispatchEvent(new CustomEvent('menu:close'))
  lastFocus = document.activeElement
  modal.classList.add('is-open')
  modal.setAttribute('aria-hidden', 'false')
  document.body.classList.add('cs-open')
  lenis.stop()
  card.focus({ preventScroll: true })
}

export function closeComingSoon() {
  modal.classList.remove('is-open')
  modal.setAttribute('aria-hidden', 'true')
  document.body.classList.remove('cs-open')
  lenis.start()
  lastFocus?.focus?.({ preventScroll: true })
}

export function initComingSoon() {
  modal.addEventListener('click', (e) => {
    if (e.target.closest('[data-cs-close]')) closeComingSoon()
  })
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeComingSoon()
  })

  // Capture phase so we run before navigation. Only links that are explicitly marked
  // data-coming-soon (booking, socials…) open the modal; real pages navigate normally.
  document.addEventListener(
    'click',
    (e) => {
      const a = e.target.closest('a[data-coming-soon]')
      if (!a) return
      e.preventDefault()
      e.stopImmediatePropagation()
      openComingSoon()
    },
    true
  )
}
