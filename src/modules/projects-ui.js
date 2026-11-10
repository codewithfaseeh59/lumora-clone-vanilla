import { projects, byId } from '../data/projects.js'
import { heroArt } from '../data/assets.js'
import { initReveal, initCounters } from './reveal.js'

const card = (p, i) => `
  <a class="proj-card" href="${p.href}" data-type="${p.type}" data-reveal style="--c:${p.color};--on:${p.on};--d:${i * 70}ms">
    <span class="proj-tag">${p.category} · ${p.year}</span>
    <img src="${heroArt(p.id)}" alt="" width="400" height="400" loading="lazy" />
    <span class="proj-meta"><h3 aria-level="2">${p.name}</h3><p>${p.label}</p></span>
    <span class="proj-arrow" aria-hidden="true">↗</span>
  </a>`

// Grid of project cards. filter: 'all' | 'branding' | 'web' | 'rebrand'
export function renderGrid(el, filter = 'all', limit = Infinity) {
  const list = projects.filter((p) => filter === 'all' || p.type === filter).slice(0, limit)
  el.innerHTML = list.map(card).join('')
  initReveal(el)
}

// /projects/: grid + filter chips
export function initProjectsPage() {
  const grid = document.querySelector('#projGrid')
  const chips = [...document.querySelectorAll('[data-filter]')]
  renderGrid(grid)
  chips.forEach((chip) =>
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.toggle('is-on', c === chip))
      renderGrid(grid, chip.dataset.filter)
      grid.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'))
    })
  )
}

// /digital/ and /branding/: a few related projects
export function initRelated() {
  document.querySelectorAll('[data-related]').forEach((el) => renderGrid(el, el.dataset.related, 3))
}

// /work/<id>/: case study built from data
export function initWorkPage() {
  const p = byId(document.body.dataset.project)
  const root = document.querySelector('#workRoot')
  if (!p || !root) return
  const next = projects[(projects.indexOf(p) + 1) % projects.length]
  const art = heroArt(p.id)
  document.title = `${p.name} — ${p.label} · lumora`

  root.innerHTML = `
    <section class="w-hero" style="--c:${p.color};--on:${p.on}">
      <p class="eyebrow">${p.category} · ${p.year}</p>
      <h1 class="p-title"><span class="line"><span>${p.name}</span></span></h1>
      <p class="p-lead">${p.label}</p>
      <img class="w-hero-art" src="${art}" alt="" width="400" height="400" />
      <dl class="w-meta">
        <div><dt>Client</dt><dd>${p.name}</dd></div>
        <div><dt>Year</dt><dd>${p.year}</dd></div>
        <div><dt>Services</dt><dd>${p.services.join(', ')}</dd></div>
      </dl>
    </section>

    <section class="p-section w-intro">
      <p class="w-big" data-reveal>${p.intro}</p>
    </section>

    <section class="w-panels" aria-hidden="true">
      <div class="w-panel" data-reveal style="--c:${p.color};--on:${p.on}"><img src="${art}" alt="" width="400" height="400" /></div>
      <div class="w-panel w-panel-ink" data-reveal style="--d:120ms"><img src="${art}" alt="" width="400" height="400" /></div>
      <div class="w-panel w-panel-wide" data-reveal style="--c:${p.color};--d:200ms"><img src="${art}" alt="" width="400" height="400" /><img src="${art}" alt="" width="400" height="400" /><img src="${art}" alt="" width="400" height="400" /></div>
    </section>

    <section class="p-section w-two">
      <div data-reveal><p class="eyebrow">the challenge</p><p class="w-text">${p.challenge}</p></div>
      <div data-reveal style="--d:120ms"><p class="eyebrow">our solution</p><p class="w-text">${p.solution}</p></div>
    </section>

    <section class="p-dark p-section">
      <p class="eyebrow">results</p>
      <div class="stats">
        ${p.results
          .map(
            (r, i) => `<div class="stat" data-reveal style="--d:${i * 100}ms">
              <b class="stat-n" data-count="${r.n}" data-prefix="${r.prefix || ''}" data-suffix="${r.suffix || ''}">${r.n}</b>
              <span>${r.l}</span></div>`
          )
          .join('')}
      </div>
    </section>

    <a class="w-next" href="${next.href}" style="--c:${next.color};--on:${next.on}">
      <span class="eyebrow">next project</span>
      <span class="w-next-name">${next.name} <i aria-hidden="true">→</i></span>
      <img src="${heroArt(next.id)}" alt="" width="400" height="400" />
    </a>`

  initReveal(root)
  initCounters(root)
}
