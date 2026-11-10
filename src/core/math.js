export const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v))
export const lerp = (a, b, t) => a + (b - a) * t
export const map = (v, inMin, inMax, outMin = 0, outMax = 1) =>
  outMin + ((v - inMin) / (inMax - inMin)) * (outMax - outMin)

// frame-rate independent smoothing: damp(current, target, speed, dt)
export const damp = (a, b, speed, dt) => lerp(a, b, 1 - Math.exp(-speed * dt))

export const smooth = (t) => t * t * (3 - 2 * t)
export const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)
export const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
