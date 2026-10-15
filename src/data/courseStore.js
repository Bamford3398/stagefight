import { computed, reactive } from 'vue'
import { courses as seedCourses } from './content'

const STORAGE_KEY = 'stagefight-courses'

const seedEnds = {
  'sc-s1-sep-bham': '2026-09-13',
  'mc-sword-buckler': '2026-09-19',
  'refresher-sep': '2026-09-20',
  'sc-s3-oct': '2026-10-04',
  'sc-s2-oct': '2026-10-18',
  'mc-axe': '2026-11-07',
  'sc-s1-nov-london': '2026-11-15',
  'sc-s4-nov': '2026-11-22',
}

function spacesFromLabel(label) {
  const match = String(label || '').match(/^(\d+)\s+spaces?/i)
  return match ? Number(match[1]) : null
}

function spacesLabel(status, spaces) {
  if (status === 'full') return 'Fully booked'
  if (spaces) return `${spaces} ${spaces === 1 ? 'space' : 'spaces'} available`
  return 'Spaces available'
}

export function presentCourse(course) {
  const start = course.start || course.sort
  const end = course.end || seedEnds[course.id] || start
  const spaces = course.spaces ?? spacesFromLabel(course.spacesLabel)
  const status = course.status === 'open' ? 'open' : 'full'
  return {
    ...course,
    start,
    end,
    spaces,
    status,
    spacesLabel: spacesLabel(status, spaces),
    bookingUrl: typeof course.bookingUrl === 'string' ? course.bookingUrl.trim() : '',
  }
}

function loadCourses() {
  const seedById = Object.fromEntries(seedCourses.map((course) => [course.id, course]))
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return JSON.parse(saved).map((course) => {
        const seed = seedById[course.id]
        if (seed?.bookingUrl && !course.bookingUrl) {
          return presentCourse({ ...course, bookingUrl: seed.bookingUrl })
        }
        return presentCourse(course)
      })
    }
  } catch {
    // Ignore a damaged save and fall back to the published list.
  }
  return seedCourses.map(presentCourse)
}

const state = reactive({
  courses: loadCourses(),
})

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.courses))
}

function dateParts(start) {
  const date = new Date(`${start}T00:00:00`)
  const month = date.toLocaleString('en-GB', { month: 'long' })
  return {
    year: date.getFullYear(),
    month,
    monthKey: month.toLowerCase(),
    sort: start,
  }
}

function dateLabel(start, end) {
  const from = new Date(`${start}T00:00:00`)
  const to = new Date(`${end}T00:00:00`)
  const startMonth = from.toLocaleString('en-GB', { month: 'long' })
  const endMonth = to.toLocaleString('en-GB', { month: 'long' })
  if (start === end) return `${from.getDate()} ${startMonth}`
  if (from.getMonth() === to.getMonth() && from.getFullYear() === to.getFullYear()) {
    return `${from.getDate()}–${to.getDate()} ${startMonth}`
  }
  return `${from.getDate()} ${startMonth} – ${to.getDate()} ${endMonth}`
}

function courseId(title, start) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  return `${slug || 'course'}-${start}`
}

export function useCourses() {
  const courses = computed(() => [...state.courses].sort((a, b) => a.sort.localeCompare(b.sort)))

  function courseById(id) {
    return state.courses.find((course) => course.id === id)
  }

  function saveCourse(draft, existingId) {
    const start = draft.start
    const end = draft.end || draft.start
    const spaces = draft.spaces === '' || draft.spaces == null ? null : Number(draft.spaces)
    const next = presentCourse({
      id: existingId || courseId(draft.title.trim(), start),
      title: draft.title.trim(),
      track: draft.track,
      duration: draft.duration,
      start,
      end,
      dateLabel: dateLabel(start, end),
      ...dateParts(start),
      price: Number(draft.price),
      venue: draft.venue.trim(),
      city: draft.city.trim(),
      status: draft.status,
      spaces: Number.isFinite(spaces) ? spaces : null,
      requirement: draft.requirement.trim(),
      bookingUrl: draft.bookingUrl.trim(),
    })

    const index = state.courses.findIndex((course) => course.id === (existingId || next.id))
    if (index === -1) state.courses.push(next)
    else state.courses.splice(index, 1, next)
    persist()
    return next
  }

  function setStatus(id, status) {
    const course = courseById(id)
    if (!course) return
    course.status = status
    course.spacesLabel = spacesLabel(status, course.spaces)
    persist()
  }

  function removeCourse(id) {
    state.courses = state.courses.filter((course) => course.id !== id)
    persist()
  }

  return { courses, courseById, saveCourse, setStatus, removeCourse }
}
