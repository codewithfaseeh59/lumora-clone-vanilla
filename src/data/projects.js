// Fictional case studies written for this educational build.
// id matches a hero object (and its artwork). `on` is the text colour used on the project colour.
export const projects = [
  {
    id: 'orb', name: 'Orbit', label: 'fintech identity', category: 'Branding', type: 'branding', year: 2025,
    color: '#FF8DB6', on: '#0e0c0d', services: ['Naming', 'Visual identity', 'Brand guidelines', 'Launch kit'],
    intro: 'Orbit is a payments app for freelancers. We built the brand around one simple shape, a coin in motion, and let it travel from the logo all the way to the onboarding screens.',
    challenge: 'Fintech all looks the same: blue gradients and stock handshakes. Orbit had to feel friendly enough for a first invoice and solid enough for a first salary.',
    solution: 'A circular identity system with a bouncy wordmark, a warm pink-first palette and a library of "orbits", small motion shapes that explain each feature without jargon.',
    results: [{ n: 32, prefix: '+', suffix: '%', l: 'sign-ups in launch month' }, { n: 48, suffix: 'h', l: 'from brief to first direction' }, { n: 40, suffix: '+', l: 'brand assets delivered' }],
  },
  {
    id: 'bloom', name: 'Casa Bloom', label: 'garden studio website', category: 'Web', type: 'web', year: 2025,
    color: '#B8D95A', on: '#0e0c0d', services: ['Concept', 'UX & structure', 'Web design', 'Development'],
    intro: 'Casa Bloom designs small urban gardens. Their old site was a gallery with no story. We turned it into a guided walk through one garden, season by season.',
    challenge: 'Visitors loved the photos but never understood the process, so enquiries were vague and budgets unrealistic.',
    solution: 'A scroll-led journey that follows a garden from bare soil to full bloom, with a short brief form at each stage and a pricing guide that sets expectations early.',
    results: [{ n: 2, suffix: 'x', l: 'more qualified enquiries' }, { n: 61, suffix: '%', l: 'longer time on site' }, { n: 5, suffix: ' wks', l: 'concept to launch' }],
  },
  {
    id: 'star', name: 'Nova Club', label: 'night club identity', category: 'Branding', type: 'branding', year: 2024,
    color: '#7E6DFF', on: '#fbfbfb', services: ['Identity', 'Motion', 'Poster system', 'Social templates'],
    intro: 'Nova is a late-night club that changes its line-up every week. The identity had to change with it and still be recognisable from across the street.',
    challenge: 'A fixed logo felt dead next to a venue that reinvents itself weekly, and the team had no time to design new posters from scratch.',
    solution: 'A star that can be stretched, spun and stacked. A poster generator kit lets the team build a new night in minutes, always in the Nova voice.',
    results: [{ n: 120, suffix: '+', l: 'posters made by the team' }, { n: 3, suffix: 'x', l: 'social reach' }, { n: 9, suffix: ' days', l: 'to build the system' }],
  },
  {
    id: 'pill', name: 'Calma', label: 'wellness rebranding', category: 'Rebranding', type: 'rebrand', year: 2024,
    color: '#FFBE3D', on: '#0e0c0d', services: ['Brand strategy', 'Rebrand', 'Packaging', 'Website'],
    intro: 'Calma sells daily supplements. Their packaging looked like a pharmacy shelf; their customers wanted something that felt like a good morning.',
    challenge: 'Shifting perception from "medicine" to "ritual" without alienating loyal customers or losing shelf visibility.',
    solution: 'A sunny, rounded identity, friendlier names for each blend and packaging that reads as a gift. The site mirrors it with a calm, slow rhythm.',
    results: [{ n: 27, prefix: '+', suffix: '%', l: 'repeat purchases' }, { n: 4, suffix: '', l: 'retail partners onboarded' }, { n: 15, suffix: ' SKUs', l: 'redesigned' }],
  },
  {
    id: 'cube', name: 'Cubo', label: 'creator platform concept', category: 'Web', type: 'web', year: 2025,
    color: '#D5FF69', on: '#0e0c0d', services: ['Concept', 'Product site', 'Interaction design', 'Prototype'],
    intro: 'Cubo is a concept for a platform where creators sell small, playful digital products. We designed the pitch site that helped the founders raise their first round.',
    challenge: 'Explain a brand-new idea in under a minute to people who had never heard of it.',
    solution: 'A single-page story built around a rotating cube: each face is one benefit, and the whole page is a toy you can play with before you sign up.',
    results: [{ n: 1, suffix: 'st', l: 'funding round closed' }, { n: 8, suffix: 'k', l: 'waitlist sign-ups' }, { n: 3, suffix: ' min', l: 'average visit' }],
  },
  {
    id: 'cup', name: 'Cuppa Corner', label: 'coffee chain', category: 'Branding + Web', type: 'branding', year: 2023,
    color: '#F6E7C6', on: '#0e0c0d', services: ['Naming', 'Identity', 'Packaging', 'Website'],
    intro: 'A neighbourhood coffee chain growing from three cafés to twelve. We gave it a smile that fits on a cup, a sign and a loyalty card.',
    challenge: 'Look big enough to grow, but stay small enough to feel like your corner café.',
    solution: 'A cheerful, hand-made mark, a warm cream palette and a modular system for cups, menus and windows that each new café can set up in a day.',
    results: [{ n: 12, suffix: '', l: 'cafés on the new brand' }, { n: 35, prefix: '+', suffix: '%', l: 'loyalty card use' }, { n: 1, suffix: ' day', l: 'to dress a new store' }],
  },
  {
    id: 'wave', name: 'Marea Surf', label: 'surf shop promo', category: 'Web', type: 'web', year: 2023,
    color: '#FF6B35', on: '#0e0c0d', services: ['Campaign site', 'Motion design', 'Development'],
    intro: 'Marea needed a summer promo that felt like the first day of holidays. We built a one-month campaign site around a single wave.',
    challenge: 'A tiny budget, a three-week deadline and a product line that looked identical to every other surf shop.',
    solution: 'A wave-shaped scroll that carries you from product to product, with a countdown, a discount that grows as you scroll and a punchy, sun-bleached palette.',
    results: [{ n: 4, suffix: 'x', l: 'return on ad spend' }, { n: 21, suffix: ' days', l: 'brief to launch' }, { n: 18, suffix: 'k', l: 'visits in the first week' }],
  },
].map((p) => ({ ...p, href: `/work/${p.id}/` }))

export const byId = (id) => projects.find((p) => p.id === id)
