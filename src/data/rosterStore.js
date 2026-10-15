import { computed, reactive } from 'vue'

const STORAGE_KEY = 'stagefight-roster'

const seedPeople = [
  {
    id: 'chris-bamford',
    name: 'Chris Bamford',
    height: '5 foot 8 inches',
    chest: '38',
    waist: '30',
    photo: `${import.meta.env.BASE_URL}assets/chris.bamford.jpg`,
  },
]

function presentPerson(person) {
  return {
    id: person.id,
    name: String(person.name || '').trim(),
    height: String(person.height || '').trim(),
    chest: String(person.chest || '').trim(),
    waist: String(person.waist || '').trim(),
    photo: typeof person.photo === 'string' ? person.photo : '',
  }
}

function loadPeople() {
  const seedById = Object.fromEntries(seedPeople.map((person) => [person.id, person]))
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return JSON.parse(saved).map((person) => {
        const seed = seedById[person.id]
        if (seed?.photo && !person.photo) return presentPerson({ ...person, photo: seed.photo })
        return presentPerson(person)
      })
    }
  } catch {
    // Ignore a damaged save and fall back to the published list.
  }
  return seedPeople.map(presentPerson)
}

const state = reactive({
  people: loadPeople(),
})

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.people))
}

function personId(name) {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  return slug || 'performer'
}

export function useRoster() {
  const people = computed(() => [...state.people].sort((a, b) => a.name.localeCompare(b.name)))

  function savePerson(draft, existingId) {
    const name = draft.name.trim()
    const next = presentPerson({
      id: existingId || personId(name),
      name,
      height: draft.height,
      chest: draft.chest,
      waist: draft.waist,
      photo: draft.photo || '',
    })

    const index = state.people.findIndex((person) => person.id === (existingId || next.id))
    if (index === -1) state.people.push(next)
    else state.people.splice(index, 1, next)
    persist()
    return next
  }

  function removePerson(id) {
    state.people = state.people.filter((person) => person.id !== id)
    persist()
  }

  return { people, savePerson, removePerson }
}
