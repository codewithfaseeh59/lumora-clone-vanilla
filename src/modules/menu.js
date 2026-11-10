import { state } from '../core/state.js'

// Full-screen menu. A circle clip-path grows out of the Menu button (CSS does the
// animation; we just tell it where the button is). Focus is trapped while open and
// the rest of the page is made inert.
export function initMenu() {
  const menu = document.querySelector('#menu')
  const btn = document.querySelector('#menuBtn')
  const label = btn.querySelector('[data-label]')
  const body = document.body
  const pageEls = () => document.querySelectorAll('[data-page]')
  let open = false

  menu.querySelectorAll('.menu-link').forEach((a, i) => a.style.setProperty('--i', i))

  const anchorToButton = () => {
    const r = btn.getBoundingClientRect()
    menu.style.setProperty('--mx', `${r.left + r.width / 2}px`)
    menu.style.setProperty('--my', `${r.top + r.height / 2}px`)
  }

  const set = (next, fromKeyboard = false) => {
    if (next === open) return
    open = next
    anchorToButton()
    body.classList.toggle('menu-open', open)
    btn.setAttribute('aria-expanded', String(open))
    menu.setAttribute('aria-hidden', String(!open))
    label.textContent = open ? 'Close' : 'Menu'
    pageEls().forEach((el) => (el.inert = open))
    if (open) menu.querySelector('.menu-link')?.focus({ preventScroll: true, focusVisible: fromKeyboard })
    else btn.focus({ preventScroll: true, focusVisible: fromKeyboard })
  }

  btn.addEventListener('click', (e) => set(!open, e.detail === 0))
  document.addEventListener('menu:close', () => set(false))
  window.addEventListener('resize', anchorToButton)

  document.addEventListener('keydown', (e) => {
    if (!open) return
    if (e.key === 'Escape') return set(false, true)
    if (e.key !== 'Tab') return
    // focus trap: cycle between the menu button and the menu contents
    const f = [btn, ...menu.querySelectorAll('a, button')]
    const first = f[0]
    const last = f[f.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  })

  // in-page anchors: close, then scroll to the section
  const scrollToHash = (hash) => {
    const name = hash.slice(1)
    const geo = state.geo[name]
    const top = name === 'top' ? 0 : geo ? geo.top : null
    if (top !== null) window.scrollTo({ top, behavior: 'smooth' })
  }
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]')
    if (!a || a.hasAttribute('data-coming-soon')) return
    e.preventDefault()
    const wasOpen = open
    set(false)
    setTimeout(() => scrollToHash(a.getAttribute('href')), wasOpen ? 450 : 0)
  })

  // language: topbar pill and in-menu buttons are one control
  const langBtns = menu.querySelectorAll('[data-lang-set]')
  const pill = document.querySelector('[data-lang]')
  const setLang = (lang) => {
    langBtns.forEach((b) => b.classList.toggle('is-on', b.dataset.langSet === lang))
    pill.textContent = lang === 'en' ? 'Esp' : 'Eng'
    document.documentElement.lang = lang
  }
  langBtns.forEach((b) => b.addEventListener('click', () => setLang(b.dataset.langSet)))
  pill.addEventListener('click', () => setLang(document.documentElement.lang === 'en' ? 'es' : 'en'))
}
