// Dummy booking flow: pick a date + time, enter details, get a confirmation.
// Availability is generated (deterministic per date) and nothing is sent anywhere.
const $ = (s) => document.querySelector(s)

const DAYS_AHEAD = 60
const SLOT_TIMES = ['09:30', '10:30', '12:00', '14:00', '15:30', '17:00']
const pad = (n) => String(n).padStart(2, '0')
const key = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const hash = (str) => [...str].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7)

const today = new Date()
today.setHours(0, 0, 0, 0)
const lastDay = new Date(today)
lastDay.setDate(lastDay.getDate() + DAYS_AHEAD)

const isWeekend = (d) => d.getDay() === 0 || d.getDay() === 6
// some days are "fully booked" so the calendar looks real
const isFull = (d) => hash(key(d)) % 6 === 0
const isOpen = (d) => d >= today && d <= lastDay && !isWeekend(d) && !isFull(d)
const slotsFor = (d) => {
  const open = SLOT_TIMES.filter((t) => hash(key(d) + t) % 4 !== 0)
  return open.length >= 2 ? open : SLOT_TIMES.slice(1, 4)
}

const fmtDay = (d) => d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })

export function initBooking() {
  const grid = $('#calGrid')
  const title = $('#calTitle')
  const slotsList = $('#slotsList')
  const slotsTitle = $('#slotsTitle')
  const picked = $('#bookPicked')
  const toDetails = $('#toDetails')
  const steps = [...document.querySelectorAll('#bookSteps li')]
  const panes = { time: $('#paneTime'), details: $('#paneDetails'), done: $('#paneDone') }

  const s = { month: new Date(today.getFullYear(), today.getMonth(), 1), date: null, time: null, type: 'New brand' }

  const showPane = (name) => {
    Object.entries(panes).forEach(([k, el]) => (el.hidden = k !== name))
    const idx = { time: 0, details: 1, done: 2 }[name]
    steps.forEach((li, i) => {
      li.classList.toggle('is-on', i === idx)
      li.classList.toggle('is-done', i < idx)
    })
    $('#bookCard').scrollIntoView({ block: 'start', behavior: 'smooth' })
  }

  // ---- calendar ----
  const renderCalendar = () => {
    const y = s.month.getFullYear()
    const m = s.month.getMonth()
    title.textContent = s.month.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
    const first = new Date(y, m, 1)
    const offset = (first.getDay() + 6) % 7 // Monday first
    const count = new Date(y, m + 1, 0).getDate()
    let html = '<i></i>'.repeat(offset)
    for (let day = 1; day <= count; day++) {
      const d = new Date(y, m, day)
      const open = isOpen(d)
      const on = s.date && key(s.date) === key(d)
      html += `<button type="button" class="day${on ? ' is-on' : ''}${key(d) === key(today) ? ' is-today' : ''}" data-date="${key(d)}" ${open ? '' : 'disabled'} aria-pressed="${!!on}" aria-label="${fmtDay(d)}${open ? '' : ' (unavailable)'}">${day}</button>`
    }
    grid.innerHTML = html
    $('#calPrev').disabled = y === today.getFullYear() && m === today.getMonth()
    $('#calNext').disabled = new Date(y, m + 1, 1) > lastDay
  }

  // ---- time slots ----
  const renderSlots = () => {
    if (!s.date) {
      slotsTitle.textContent = 'Choose a day'
      slotsList.innerHTML = '<p class="slots-empty">Pick a highlighted day to see available times.</p>'
      return
    }
    slotsTitle.textContent = fmtDay(s.date)
    slotsList.innerHTML = slotsFor(s.date)
      .map((t) => `<button type="button" class="slot${s.time === t ? ' is-on' : ''}" data-time="${t}" aria-pressed="${s.time === t}">${t}</button>`)
      .join('')
  }

  const renderPicked = () => {
    const ready = s.date && s.time
    picked.textContent = ready ? `${fmtDay(s.date)} at ${s.time}` : 'No time selected yet'
    toDetails.disabled = !ready
  }

  grid.addEventListener('click', (e) => {
    const b = e.target.closest('.day:not(:disabled)')
    if (!b) return
    const [y, m, d] = b.dataset.date.split('-').map(Number)
    s.date = new Date(y, m - 1, d)
    s.time = null
    renderCalendar()
    renderSlots()
    renderPicked()
  })
  slotsList.addEventListener('click', (e) => {
    const b = e.target.closest('.slot')
    if (!b) return
    s.time = b.dataset.time
    renderSlots()
    renderPicked()
  })
  $('#calPrev').addEventListener('click', () => ((s.month = new Date(s.month.getFullYear(), s.month.getMonth() - 1, 1)), renderCalendar()))
  $('#calNext').addEventListener('click', () => ((s.month = new Date(s.month.getFullYear(), s.month.getMonth() + 1, 1)), renderCalendar()))

  // ---- details form ----
  toDetails.addEventListener('click', () => showPane('details'))
  $('#backToTime').addEventListener('click', () => showPane('time'))
  $('#fType').addEventListener('click', (e) => {
    const b = e.target.closest('.chip')
    if (!b) return
    s.type = b.dataset.v
    document.querySelectorAll('#fType .chip').forEach((c) => c.classList.toggle('is-on', c === b))
  })

  const form = panes.details
  const setErr = (name, msg) => {
    form.querySelector(`[data-err="${name}"]`).textContent = msg
    form.elements[name].classList.toggle('is-bad', !!msg)
  }
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = form.elements.name.value.trim()
    const email = form.elements.email.value.trim()
    setErr('name', name ? '' : 'Please tell us your name')
    setErr('email', /^\S+@\S+\.\S+$/.test(email) ? '' : 'Please enter a valid email')
    if (!name || !/^\S+@\S+\.\S+$/.test(email)) return

    const ref = 'LM-' + hash(key(s.date) + s.time + email).toString(36).toUpperCase().slice(0, 5)
    $('#doneName').textContent = name.split(' ')[0]
    $('#doneWhen').textContent = `${fmtDay(s.date)}, ${s.time} (Lisbon time) · 30 min`
    $('#doneWhere').textContent = `Video call · https://meet.lumora.example/${ref.toLowerCase()}`
    $('#doneTopic').textContent = `${s.type} · ${form.elements.budget.value}`
    $('#doneRef').textContent = ref
    s.ref = ref
    showPane('done')
  })

  // ---- confirmation ----
  $('#addIcs').addEventListener('click', () => {
    const [h, mi] = s.time.split(':').map(Number)
    const start = new Date(s.date.getFullYear(), s.date.getMonth(), s.date.getDate(), h, mi)
    const end = new Date(start.getTime() + 30 * 60000)
    const f = (d) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`
    const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//lumora//demo//EN', 'BEGIN:VEVENT', `UID:${s.ref}@lumora.example`, `DTSTART:${f(start)}`, `DTEND:${f(end)}`, 'SUMMARY:Intro call with lumora (demo)', `DESCRIPTION:Reference ${s.ref}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n')
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(new Blob([ics], { type: 'text/calendar' })), download: `lumora-call-${s.ref}.ics` })
    a.click()
    URL.revokeObjectURL(a.href)
  })
  $('#bookAgain').addEventListener('click', () => {
    s.date = s.time = null
    form.reset()
    document.querySelectorAll('#fType .chip').forEach((c, i) => c.classList.toggle('is-on', i === 0))
    s.type = 'New brand'
    renderCalendar()
    renderSlots()
    renderPicked()
    showPane('time')
  })

  renderCalendar()
  renderSlots()
  renderPicked()
}
