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
  card.focus({ preventScroll: true })
}

export function closeComingSoon() {
  modal.classList.remove('is-open')
  modal.setAttribute('aria-hidden', 'true')
  document.body.classList.remove('cs-open')
  lastFocus?.focus?.({ preventScroll: true })
}

export function initComingSoon() {
  modal.addEventListener('click', (e) => {
    if (e.target.closest('[data-cs-close]')) closeComingSoon()
  })
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeComingSoon()
  })

  // Capture phase so we beat default navigation: site-relative paths and
  // explicit data-coming-soon links show the modal; #anchors and mailto: pass through.
  document.addEventListener(
    'click',
    (e) => {
      const a = e.target.closest('a')
      if (!a) return
      const href = a.getAttribute('href') || ''
      if (a.hasAttribute('data-coming-soon') || (href.startsWith('/') && !href.startsWith('//'))) {
        e.preventDefault()
        e.stopPropagation()
        openComingSoon()
      }
    },
    true
  )
}
