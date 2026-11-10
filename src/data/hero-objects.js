import { heroArt } from './assets.js'

// Layout is on a 1440×760 artboard (x/y/w) and a 390×760 mobile artboard (mx/my/mw), in --u units.
// depth: parallax strength · axisX/Y: drift + exit direction · spin: tilt degrees
// color: full-screen wipe colour on hover · label: cursor badge text
export const heroObjects = [
  { id: 'orb', x: 30, y: 300, w: 330, mx: -30, my: 340, mw: 200, depth: 1.05, axisX: -1, axisY: 0.55, spin: -4, color: '#FF8DB6', label: 'fintech identity', href: '/work/orb/' },
  { id: 'bloom', x: 300, y: 70, w: 250, mx: 10, my: 70, mw: 150, depth: 0.72, axisX: 0.35, axisY: -1.15, spin: 7, color: '#B8D95A', label: 'garden studio website', href: '/work/bloom/' },
  { id: 'drop', x: 395, y: 330, w: 270, mx: -10, my: 200, mw: 170, depth: 0.56, axisX: -0.55, axisY: 0.9, spin: -5, color: '#FF7A59', label: 'how we do branding', href: '/branding/' },
  { id: 'star', x: 600, y: 60, w: 300, mx: 215, my: 60, mw: 170, depth: 0.86, axisX: 0.9, axisY: -0.7, spin: 9, color: '#7E6DFF', label: 'night club identity', href: '/work/star/' },
  { id: 'pill', x: 590, y: 390, w: 300, mx: 205, my: 190, mw: 190, depth: 0.48, axisX: -0.8, axisY: 0.38, spin: -3, color: '#FFBE3D', label: 'wellness rebranding', href: '/work/pill/' },
  { id: 'cloud', x: 880, y: 60, w: 300, mx: 215, my: 370, mw: 170, depth: 0.38, axisX: 0.75, axisY: -0.45, spin: 3, color: '#FF5490', label: 'how we do websites', href: '/digital/' },
  { id: 'cube', x: 940, y: 330, w: 290, mx: 20, my: 450, mw: 150, depth: 0.64, axisX: 1.1, axisY: 0.35, spin: 5, color: '#D5FF69', label: 'creator platform concept', href: '/work/cube/' },
  { id: 'cup', x: 770, y: 440, w: 190, mx: 150, my: 330, mw: 110, depth: 1.18, axisX: -0.3, axisY: 1.2, spin: -9, color: '#F6E7C6', label: 'coffee chain', href: '/work/cup/' },
  { id: 'wave', x: 1170, y: 170, w: 260, mx: 225, my: 460, mw: 140, depth: 0.92, axisX: 1, axisY: -0.25, spin: -8, color: '#FF6B35', label: 'surf shop promo', href: '/work/wave/' },
].map((o) => ({ ...o, src: heroArt(o.id) }))
