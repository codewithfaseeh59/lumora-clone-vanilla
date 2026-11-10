// One requestAnimationFrame loop for the whole site. Modules subscribe with add().
const subscribers = new Set()
let last = 0

export const ticker = {
  add(fn) {
    subscribers.add(fn)
    return () => subscribers.delete(fn)
  },
}

function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000 || 0.016)
  last = now
  subscribers.forEach((fn) => fn(now / 1000, dt))
  requestAnimationFrame(frame)
}

export const startTicker = () => requestAnimationFrame(frame)
