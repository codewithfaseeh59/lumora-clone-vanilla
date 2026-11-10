import { state } from '../core/state.js'

// Preview frames rotate on a timer (only while the section is on screen).
// The next frame rises from below while the current one sinks back and fades.
export function initMethod() {
  const frames = [...document.querySelectorAll('.method-frame')]
  const steps = [...document.querySelectorAll('#methodSteps li')]
  let current = 0
  let timer = 0

  const show = (next) => {
    if (next === current) return
    const prev = frames[current]
    prev.classList.remove('is-active')
    prev.classList.add('is-leaving')
    setTimeout(() => prev.classList.remove('is-leaving'), 900)
    frames[next].classList.add('is-active')
    steps.forEach((s, i) => s.classList.toggle('is-on', i === next))
    current = next
  }
  steps[0].classList.add('is-on')

  const start = () => {
    clearInterval(timer)
    timer = setInterval(() => show((current + 1) % frames.length), 2600)
  }
  const stop = () => clearInterval(timer)

  steps.forEach((s, i) =>
    s.addEventListener('pointerenter', () => {
      if (state.canHover) {
        stop()
        show(i)
      }
    })
  )
  document.querySelector('#methodSteps').addEventListener('pointerleave', start)

  new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), {
    threshold: 0.25,
  }).observe(document.querySelector('#method'))
}
