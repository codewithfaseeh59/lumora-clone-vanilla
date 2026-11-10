import { state } from '../core/state.js'

// Fade/slide elements in as they enter the viewport: <div data-reveal style="--d:120ms">
export function initReveal(root = document) {
  const els = [...root.querySelectorAll('[data-reveal]:not(.is-in)')]
  if (!('IntersectionObserver' in window) || state.reduced) {
    els.forEach((el) => el.classList.add('is-in'))
    return
  }
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (!en.isIntersecting) return
        en.target.classList.add('is-in')
        io.unobserve(en.target)
      }),
    { rootMargin: '0px 0px -8% 0px' }
  )
  els.forEach((el) => io.observe(el))
}

// Numbers count up once visible: <b data-count="48" data-prefix="+" data-suffix="%">
export function initCounters(root = document) {
  root.querySelectorAll('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count)
    const pre = el.dataset.prefix || ''
    const suf = el.dataset.suffix || ''
    if (state.reduced) return void (el.textContent = pre + end + suf)
    el.textContent = pre + '0' + suf
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const t0 = performance.now()
        const tick = (now) => {
          const k = Math.min(1, (now - t0) / 1400)
          el.textContent = pre + Math.round(end * (1 - Math.pow(1 - k, 3))) + suf
          if (k < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.6 }
    )
    io.observe(el)
  })
}
