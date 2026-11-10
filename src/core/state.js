// Shared, read-only-ish site state. Geometry is cached here so the render loop never
// has to call getBoundingClientRect (forced layout every frame janks Safari).
const mobileMQ = window.matchMedia('(max-width: 900px)')

export const state = {
  scrollY: 0,
  vw: window.innerWidth,
  vh: window.innerHeight,
  maxScroll: 0,
  px: 0, // pointer in px
  py: 0,
  nx: 0, // pointer normalised to -1..1
  ny: 0,
  isMobile: false,
  canHover: false,
  reduced: false,
  unit: 1, // px per --u
  geo: {}, // { name: { top, height } } in document space
}

export function measure() {
  state.vw = window.innerWidth
  state.vh = window.innerHeight
  state.isMobile = mobileMQ.matches
  state.canHover = window.matchMedia('(hover: hover)').matches
  state.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  state.unit = state.isMobile ? state.vw / 390 : Math.min(state.vw / 1440, state.vh / 760)
  state.maxScroll = document.documentElement.scrollHeight - state.vh
  state.scrollY = window.scrollY

  document.querySelectorAll('[data-geo]').forEach((el) => {
    const r = el.getBoundingClientRect()
    state.geo[el.dataset.geo] = { top: r.top + window.scrollY, height: r.height }
  })
}

export function initState() {
  measure()
  window.addEventListener('scroll', () => (state.scrollY = window.scrollY), { passive: true })
  window.addEventListener('resize', measure)
  window.addEventListener(
    'pointermove',
    (e) => {
      state.px = e.clientX
      state.py = e.clientY
      state.nx = (e.clientX / state.vw) * 2 - 1
      state.ny = (e.clientY / state.vh) * 2 - 1
    },
    { passive: true }
  )
  // layout can shift after fonts/images load
  document.fonts?.ready.then(measure)
  window.addEventListener('load', measure)
}
