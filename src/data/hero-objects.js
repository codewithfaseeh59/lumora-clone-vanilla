import { assets } from './assets.js'

// depth: parallax strength · axisX/Y: drift direction · spin: tilt degrees
// color: full-screen wipe colour on hover · label: cursor badge text
export const heroObjects = [
  { id: 'orb', depth: 1.05, axisX: -1, axisY: 0.55, spin: -4, color: '#FF8DB6', label: 'fintech identity', href: '/work/orb' },
  { id: 'bloom', depth: 0.72, axisX: 0.35, axisY: -1.15, spin: 7, color: '#B8D95A', label: 'garden studio website', href: '/work/bloom' },
  { id: 'drop', depth: 0.56, axisX: -0.55, axisY: 0.9, spin: -5, color: '#FF7A59', label: 'how we do branding', href: '/branding' },
  { id: 'star', depth: 0.86, axisX: 0.9, axisY: -0.7, spin: 9, color: '#7E6DFF', label: 'night club identity', href: '/work/star' },
  { id: 'pill', depth: 0.48, axisX: -0.8, axisY: 0.38, spin: -3, color: '#FFBE3D', label: 'wellness rebranding', href: '/work/pill' },
  { id: 'cloud', depth: 0.38, axisX: 0.75, axisY: -0.45, spin: 3, color: '#FF5490', label: 'how we do websites', href: '/digital' },
  { id: 'cube', depth: 0.64, axisX: 1.1, axisY: 0.35, spin: 5, color: '#D5FF69', label: 'creator platform concept', href: '/work/cube' },
  { id: 'cup', depth: 1.18, axisX: -0.3, axisY: 1.2, spin: -9, color: '#F6E7C6', label: 'coffee chain', href: '/work/cup' },
  { id: 'wave', depth: 0.92, axisX: 1, axisY: -0.25, spin: -8, color: '#FF6B35', label: 'surf shop promo', href: '/work/wave' },
].map((o) => ({ ...o, src: assets.hero[o.id] }))
