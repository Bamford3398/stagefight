<script setup>
import { computed, reactive, ref } from 'vue'
import RosterAdmin from '../components/RosterAdmin.vue'
import { useCourses } from '../data/courseStore'

const PASSWORD = 'stagefight'
const SESSION_KEY = 'stagefight-admin'

const { courses, saveCourse, setStatus, removeCourse } = useCourses()
const signedIn = ref(sessionStorage.getItem(SESSION_KEY) === 'yes')
const password = ref('')
const passwordError = ref('')
const editingId = ref(null)
const formOpen = ref(false)
const pendingRemove = ref(null)

const blank = () => ({
  title: '',
  track: 'Screen',
  duration: '2-day',
  start: '',
  end: '',
  price: '',
  venue: '',
  city: '',
  status: 'open',
  spaces: '',
  requirement: '',
  bookingUrl: '',
})

const form = reactive(blank())
const errors = ref({})
const panel = ref('courses')
const rosterAdmin = ref(null)

const months = computed(() => {
  const groups = []
  for (const course of courses.value) {
    let group = groups.find((item) => item.key === course.monthKey && item.year === course.year)
    if (!group) {
      group = { key: course.monthKey, year: course.year, label: `${course.month} ${course.year}`, courses: [] }
      groups.push(group)
    }
    group.courses.push(course)
  }
  return groups
})

function signIn() {
  if (password.value.trim().toLowerCase() !== PASSWORD) {
    passwordError.value = 'That password is not right.'
    return
  }
  sessionStorage.setItem(SESSION_KEY, 'yes')
  signedIn.value = true
}

function signOut() {
  sessionStorage.removeItem(SESSION_KEY)
  signedIn.value = false
  password.value = ''
}

function showCourses() {
  panel.value = 'courses'
}

function showTeam() {
  panel.value = 'team'
  formOpen.value = false
}

function openNew() {
  if (panel.value === 'team') {
    rosterAdmin.value?.openNew()
    return
  }
  Object.assign(form, blank())
  editingId.value = null
  errors.value = {}
  pendingRemove.value = null
  formOpen.value = true
}

function openEdit(course) {
  Object.assign(form, {
    title: course.title,
    track: course.track,
    duration: course.duration,
    start: course.start,
    end: course.end,
    price: String(course.price),
    venue: course.venue,
    city: course.city,
    status: course.status,
    spaces: course.spaces ?? '',
    requirement: course.requirement,
    bookingUrl: course.bookingUrl || '',
  })
  editingId.value = course.id
  errors.value = {}
  pendingRemove.value = null
  formOpen.value = true
}

function closeForm() {
  formOpen.value = false
  editingId.value = null
}

function validate() {
  const next = {}
  if (!form.title.trim()) next.title = 'Add the course name.'
  if (!form.start) next.start = 'Add the start date.'
  if (!form.end) next.end = 'Add the end date.'
  if (form.start && form.end && form.end < form.start) next.end = 'The end date is before the start date.'
  if (form.price === '' || Number.isNaN(Number(form.price)) || Number(form.price) < 0) next.price = 'Add the price.'
  if (!form.venue.trim()) next.venue = 'Add the venue.'
  if (!form.city.trim()) next.city = 'Add the city.'
  if (form.spaces !== '' && (!Number.isInteger(Number(form.spaces)) || Number(form.spaces) < 0)) {
    next.spaces = 'Use a whole number, or leave this blank.'
  }
  if (form.bookingUrl.trim() && !form.bookingUrl.trim().startsWith('https://buy.stripe.com/')) {
    next.bookingUrl = 'Paste the payment link from Stripe. It starts with https://buy.stripe.com/'
  }
  errors.value = next
  return Object.keys(next).length === 0
}

function save() {
  if (!validate()) return
  saveCourse(form, editingId.value)
  closeForm()
}

function askRemove(course) {
  pendingRemove.value = course.id
  formOpen.value = false
}

function confirmRemove(id) {
  removeCourse(id)
  pendingRemove.value = null
}
</script>

<template>
  <div v-if="!signedIn" class="gate">
    <form class="gate-card" @submit.prevent="signIn">
      <p class="eyebrow">Stagefight</p>
      <h1 class="display">Course admin</h1>
      <p>Sign in to update courses and the fight team.</p>
      <label class="field">
        <span>Password</span>
        <input v-model="password" type="password" autocomplete="current-password" />
      </label>
      <p v-if="passwordError" class="error">{{ passwordError }}</p>
      <button class="btn btn-bronze" type="submit">Enter</button>
      <p class="hint">Preview password: stagefight</p>
    </form>
  </div>

  <div v-else>
    <header class="page-hero">
      <div class="container admin-head">
        <div>
          <p class="eyebrow">For the school</p>
          <h1 class="display">{{ panel === 'team' ? 'Fight team' : 'Courses' }}</h1>
        </div>
        <div class="admin-actions">
          <button class="btn" :class="panel === 'courses' ? 'btn-bronze' : 'btn-ghost'" type="button" @click="showCourses">
            Courses
          </button>
          <button class="btn" :class="panel === 'team' ? 'btn-bronze' : 'btn-ghost'" type="button" @click="showTeam">
            Fight team
          </button>
          <button class="btn btn-bronze" type="button" @click="openNew">
            {{ panel === 'team' ? 'Add a performer' : 'Add a course' }}
          </button>
          <button class="btn btn-ghost" type="button" @click="signOut">Sign out</button>
        </div>
      </div>
    </header>

    <RosterAdmin v-if="panel === 'team'" ref="rosterAdmin" />

    <section v-else class="section paper admin-section">
      <div class="container admin-layout" :class="{ 'has-form': formOpen }">
        <div>
          <article v-for="month in months" :key="`${month.key}-${month.year}`" class="month-block">
            <h2>{{ month.label }}</h2>
            <ul>
              <li v-for="course in month.courses" :key="course.id">
                <div>
                  <p class="course-date">{{ course.dateLabel }}</p>
                  <h3>{{ course.title }}</h3>
                  <p class="course-meta">{{ course.duration }} · {{ course.venue }}, {{ course.city }}</p>
                  <p v-if="course.requirement" class="course-meta">{{ course.requirement }}</p>
                  <p v-if="course.status === 'open'" class="course-meta">
                    {{ course.bookingUrl ? 'Stripe payment link added' : 'No Stripe payment link yet' }}
                  </p>
                </div>
                <div class="row-side">
                  <p class="course-price">£{{ Number(course.price).toFixed(2) }}</p>
                  <span class="pill" :class="course.status === 'open' ? 'pill-open' : 'pill-full'">
                    {{ course.spacesLabel }}
                  </span>
                  <div class="row-actions">
                    <button type="button" @click="openEdit(course)">Edit</button>
                    <button type="button" @click="setStatus(course.id, course.status === 'open' ? 'full' : 'open')">
                      {{ course.status === 'open' ? 'Mark booked' : 'Mark open' }}
                    </button>
                    <button type="button" class="danger" @click="askRemove(course)">Remove</button>
                  </div>
                  <p v-if="pendingRemove === course.id" class="confirm">
                    Remove {{ course.title }}?
                    <button type="button" class="danger" @click="confirmRemove(course.id)">Remove</button>
                    <button type="button" @click="pendingRemove = null">Keep</button>
                  </p>
                </div>
              </li>
            </ul>
          </article>
          <p v-if="!months.length" class="empty">No courses yet. Add the first one.</p>
        </div>

        <form v-if="formOpen" class="editor" @submit.prevent="save">
          <p class="eyebrow">{{ editingId ? 'Edit course' : 'New course' }}</p>
          <h2 class="display">{{ editingId ? 'Update this date' : 'Add a date' }}</h2>

          <label class="field">
            <span>Course name</span>
            <input v-model="form.title" type="text" />
            <small v-if="errors.title" class="error">{{ errors.title }}</small>
          </label>

          <div class="split-fields">
            <label class="field">
              <span>Type</span>
              <select v-model="form.track">
                <option>Screen</option>
                <option>Masterclass</option>
                <option>Refresher</option>
              </select>
            </label>
            <label class="field">
              <span>Length</span>
              <select v-model="form.duration">
                <option>1-day</option>
                <option>2-day</option>
              </select>
            </label>
          </div>

          <div class="split-fields">
            <label class="field">
              <span>Starts</span>
              <input v-model="form.start" type="date" />
              <small v-if="errors.start" class="error">{{ errors.start }}</small>
            </label>
            <label class="field">
              <span>Ends</span>
              <input v-model="form.end" type="date" />
              <small v-if="errors.end" class="error">{{ errors.end }}</small>
            </label>
          </div>

          <div class="split-fields">
            <label class="field">
              <span>Price (£)</span>
              <input v-model="form.price" type="number" min="0" step="0.01" />
              <small v-if="errors.price" class="error">{{ errors.price }}</small>
            </label>
            <label class="field">
              <span>Spaces left</span>
              <input v-model="form.spaces" type="number" min="0" step="1" placeholder="Optional" />
              <small v-if="errors.spaces" class="error">{{ errors.spaces }}</small>
            </label>
          </div>

          <label class="field">
            <span>Availability</span>
            <select v-model="form.status">
              <option value="open">Spaces available</option>
              <option value="full">Fully booked</option>
            </select>
          </label>

          <div class="split-fields">
            <label class="field">
              <span>Venue</span>
              <input v-model="form.venue" type="text" />
              <small v-if="errors.venue" class="error">{{ errors.venue }}</small>
            </label>
            <label class="field">
              <span>City</span>
              <input v-model="form.city" type="text" />
              <small v-if="errors.city" class="error">{{ errors.city }}</small>
            </label>
          </div>

          <label class="field">
            <span>Stripe payment link <em>(optional)</em></span>
            <input v-model="form.bookingUrl" type="url" placeholder="https://buy.stripe.com/..." />
            <small v-if="errors.bookingUrl" class="error">{{ errors.bookingUrl }}</small>
            <small v-else>Create a payment link in Stripe for this course, then paste it here.</small>
          </label>

          <label class="field">
            <span>Who can attend <em>(optional)</em></span>
            <textarea v-model="form.requirement" placeholder="For example: Screen Combat Stage-3 minimum."></textarea>
          </label>

          <div class="editor-actions">
            <button class="btn btn-ink" type="submit">Save course</button>
            <button class="btn btn-line" type="button" @click="closeForm">Cancel</button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<style scoped>
.gate {
  min-height: calc(100vh - 72px);
  display: grid;
  place-items: center;
  padding: 32px 20px 64px;
}

.gate-card {
  width: min(448px, 100%);
  display: grid;
  gap: 14.4px;
}

.gate-card h1 {
  font-size: 67.2px;
}

.gate-card p {
  color: rgba(246, 241, 232, 0.78);
}

.hint {
  color: var(--muted) !important;
  font-size: 14.72px;
}

.admin-head,
.admin-actions,
.editor-actions,
.row-actions,
.confirm {
  display: flex;
  flex-wrap: wrap;
  gap: 9.6px;
  align-items: center;
}

.admin-head {
  justify-content: space-between;
}

.admin-section {
  padding-top: 0;
}

.admin-layout {
  display: grid;
  gap: 24px;
  align-items: start;
}

.month-block + .month-block {
  margin-top: 28.8px;
}

.month-block h2,
.editor h2 {
  font-family: var(--font-display);
  font-size: 22.4px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.editor h2 {
  font-size: 41.6px;
  letter-spacing: -0.02em;
  line-height: 0.9;
  margin-bottom: 6.4px;
}

.month-block ul {
  list-style: none;
  margin: 11.2px 0 0;
  padding: 0;
  display: grid;
  gap: 11.2px;
}

.month-block li {
  display: grid;
  gap: 12.8px;
  padding: 16px 16px 14.4px;
  background: #fffdf9;
  border: 1px solid var(--line-dark);
}

.month-block h3 {
  font-size: 19.2px;
}

.row-side {
  display: grid;
  gap: 8.8px;
  justify-items: start;
}

.row-actions button,
.confirm button {
  border: 0;
  background: transparent;
  padding: 0;
  color: var(--bronze-deep);
  font-size: 13.12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.danger {
  color: var(--full) !important;
}

.confirm {
  color: var(--muted-dark);
  font-size: 14.72px;
}

.editor {
  display: grid;
  gap: 13.6px;
  padding: 19.2px;
  background: #fffdf9;
  border: 1px solid var(--line-dark);
  position: sticky;
  top: 86.4px;
}

.split-fields {
  display: grid;
  gap: 13.6px;
}

.field em {
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
}

@media (min-width: 720px) {
  .split-fields {
    grid-template-columns: 1fr 1fr;
  }

  .month-block li {
    grid-template-columns: 1fr auto;
    align-items: center;
  }

  .row-side {
    justify-items: end;
    text-align: right;
  }
}

@media (min-width: 980px) {
  .admin-layout.has-form {
    grid-template-columns: 1.2fr 0.8fr;
  }
}
</style>
