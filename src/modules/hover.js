import { state } from '../core/state.js'
import { ticker } from '../core/ticker.js'
import { clamp, damp } from '../core/math.js'

// Hover behaviour shared by the hero objects and the about-section floaters:
//   1. a colour circle wipes across the screen from the object's centre
//   2. a round badge follows the cursor and shows the object's label
// Elements opt in with data-hover-color / data-hover-label.
export function initHover(openLink) {
  const badgeEl = document.querySelector('#hoverBadge')
  const badge = { x: 0, y: 0, rot: 0, scale: 0.65, tScale: 0.65, opacity: 0, tOpacity: 0, ready: false }
  let hovered = null
  let swapTimer = 0

  const centerOf = (el) => {
    const r = el.getBoundingClientRect()
    return { x: r.left + r.width / 2, y: r.top + r.height / 2, rect: r }
  }

  const createWipe = (el, color) => {
    if (state.isMobile || !state.canHover) return
    const host = el.closest('[data-wipe-host]')
    const c = centerOf(el)
    const wipe = document.createElement('div')
    wipe.className = 'color-wipe'
    wipe.style.setProperty('--wipe-color', color)
    if (host) {
      const hr = host.getBoundingClientRect()
      wipe.classList.add('in-host')
      wipe.style.setProperty('--wipe-x', `${c.x - hr.left}px`)
      wipe.style.setProperty('--wipe-y', `${c.y - hr.top}px`)
      host.prepend(wipe)
    } else {
      wipe.style.setProperty('--wipe-x', `${c.x}px`)
      wipe.style.setProperty('--wipe-y', `${c.y}px`)
      document.body.appendChild(wipe)
    }
    const previous = [...document.querySelectorAll('.color-wipe')].filter((w) => w !== wipe)
    requestAnimationFrame(() => wipe.classList.add('is-active'))
    setTimeout(() => previous.forEach((w) => w.remove()), 960)
  }

  const clearWipes = () => {
    document.querySelectorAll('.color-wipe').forEach((w) => {
      w.classList.add('is-exiting')
      setTimeout(() => w.remove(), 320)
    })
  }

  const enter = (el) => {
    hovered = el
    const label = el.dataset.hoverLabel || 'view case'
    createWipe(el, el.dataset.hoverColor)
    if (!badge.ready) {
      badge.x = state.px
      badge.y = state.py
      badge.ready = true
    }
    // shrink, swap the text, grow back — the badge "re-pops" for each new object
    clearTimeout(swapTimer)
    badge.tScale = 0.48
    badge.tOpacity = 0.82
    swapTimer = setTimeout(() => {
      if (hovered !== el) return
      badgeEl.textContent = label
      badge.tScale = 1
      badge.tOpacity = 1
    }, 140)
  }

  const leave = (el) => {
    if (hovered !== el) return
    hovered = null
    clearTimeout(swapTimer)
    badge.tScale = 0.65
    badge.tOpacity = 0
    clearWipes()
  }

  document.querySelectorAll('[data-hover-color]').forEach((el) => {
    if (state.canHover) {
      el.addEventListener('pointerenter', () => enter(el))
      el.addEventListener('pointerleave', () => leave(el))
    }
    el.addEventListener('click', () => el.dataset.href && openLink?.(el.dataset.href))
  })

  // badge follows the cursor with a little lag, tilting with its velocity
  ticker.add((t, dt) => {
    const px = badge.x
    badge.x = damp(badge.x, state.px, 14, dt)
    badge.y = damp(badge.y, state.py, 14, dt)
    badge.rot = damp(badge.rot, clamp((badge.x - px) * 2.2, -18, 18), 10, dt)
    badge.scale = damp(badge.scale, badge.tScale, 16, dt)
    badge.opacity = damp(badge.opacity, badge.tOpacity, 16, dt)
    if (badge.opacity < 0.01 && !hovered) {
      badgeEl.style.opacity = '0'
      return
    }
    badgeEl.style.transform = `translate3d(${badge.x.toFixed(1)}px, ${badge.y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${badge.scale.toFixed(3)}) rotate(${badge.rot.toFixed(2)}deg)`
    badgeEl.style.opacity = badge.opacity.toFixed(3)
  })

  // objects sliding away on scroll must not keep a stale hover
  window.addEventListener('scroll', () => hovered && !hovered.matches(':hover') && leave(hovered), { passive: true })
}
