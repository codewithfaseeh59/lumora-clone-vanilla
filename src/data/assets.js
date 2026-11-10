// Hero artwork lookup.
//
// To use your own characters: drop transparent PNG/WebP/AVIF files into  src/assets/hero/
// and name each file after a hero object id (see hero-objects.js), e.g. orb.webp.
// Any object without a matching file falls back to the built-in placeholder SVG.
const custom = import.meta.glob('../assets/hero/*.{webp,png,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const byName = Object.fromEntries(
  Object.entries(custom).map(([path, url]) => [path.split('/').pop().replace(/\.[^.]+$/, ''), url])
)

export const heroArt = (id) => byName[id] ?? `/assets/images/${id}.svg`
