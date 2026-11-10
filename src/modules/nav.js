import { lenis } from '../core/lenis.js'

// Page transitions: a dark curtain rises over the page, then we navigate. The next page
// starts covered (pure CSS animation) and the curtain slides away, so it feels continuous.
const curtain = document.querySelector('.page-curtain')

export function go(href) {
  if (!curtain) return void (window.location.href = href)
  document.dispatchEvent(new CustomEvent('menu:close'))
  curtain.classList.add('is-leaving')
  setTimeout(() => (window.location.href = href), 650)
}

export function initNav() {
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const a = e.target.closest('a')
    if (!a || a.hasAttribute('data-coming-soon') || a.target === '_blank' || a.hasAttribute('download')) return
    const url = new URL(a.href, window.location.href)
    if (url.origin !== window.location.origin) return // mailto:, external
    if (url.pathname === window.location.pathname) {
      if (url.hash) return // in-page anchors are handled by menu.js
      e.preventDefault() // link to the page we're already on → scroll to top
      document.dispatchEvent(new CustomEvent('menu:close'))
      lenis.scrollTo(0, { duration: 1.4 })
      return
    }
    e.preventDefault()
    go(url.pathname + url.search + url.hash)
  })

  // coming back with the browser's back button (bfcache): don't stay covered
  window.addEventListener('pageshow', (e) => e.persisted && curtain?.classList.remove('is-leaving'))
}
