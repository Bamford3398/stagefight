<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { contact } from '../data/content'
import { useCourses } from '../data/courseStore'

const route = useRoute()
const { courses, courseById } = useCourses()

const intents = computed(() => [
  { id: 'general', label: 'General enquiry' },
  { id: 'choreography', label: 'Choreography' },
  { id: 'firearms', label: 'Firearms training' },
  { id: 'stage', label: 'Stage combat levels' },
  { id: 'agency', label: 'Book performers' },
  ...courses.value.map((course) => ({
    id: course.id,
    label: `${course.dateLabel} ${course.year} — ${course.title}`,
  })),
])

const form = reactive({
  name: '',
  email: '',
  phone: '',
  interest: 'general',
  message: '',
  consent: false,
})

const errors = reactive({
  name: '',
  email: '',
  interest: '',
  consent: '',
})

const ready = ref(false)

function applyQuery() {
  const requested = typeof route.query.course === 'string' ? route.query.course : ''
  const intent = typeof route.query.intent === 'string' ? route.query.intent : ''
  if (requested && courseById(requested)) {
    form.interest = requested
    return
  }
  if (['choreography', 'firearms', 'stage', 'general', 'agency'].includes(intent)) {
    form.interest = intent
  }
}

applyQuery()
watch(() => route.fullPath, () => {
  applyQuery()
  ready.value = false
})

const selected = computed(() => intents.value.find((item) => item.id === form.interest))
const selectedCourse = computed(() => courseById(form.interest))
const pageTitle = computed(() => {
  if (selectedCourse.value?.status === 'full') return 'Join the waitlist'
  if (form.interest === 'agency') return 'Book performers'
  return 'Book a course'
})

const mailto = computed(() => {
  const subject = `Stagefight enquiry: ${selected.value?.label || 'General'}`
  const lines = [
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    `Phone: ${form.phone || '—'}`,
    `Interest: ${selected.value?.label || ''}`,
    '',
    form.message || 'No extra message.',
  ]
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
})

function validate() {
  errors.name = form.name.trim() ? '' : 'Add your name.'
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'Add a valid email address.'
  errors.interest = form.interest ? '' : 'Choose what this is about.'
  errors.consent = form.consent ? '' : 'Confirm we can reply to you.'
  return !errors.name && !errors.email && !errors.interest && !errors.consent
}

function submit() {
  if (!validate()) return
  ready.value = true
}
</script>

<template>
  <div>
    <header class="page-hero">
      <div class="container">
        <p class="eyebrow">Bookings & productions</p>
        <h1 class="display">{{ pageTitle }}</h1>
        <p class="lede" style="margin-top: 16px">
          Tell us what you want to train, or what the production needs. This preview keeps your note on screen and
          opens it in an email to {{ contact.email }}.
        </p>
      </div>
    </header>

    <section class="section paper">
      <div class="container contact-layout">
        <form v-if="!ready" class="form" novalidate @submit.prevent="submit">
          <p v-if="selectedCourse" class="note">
            {{ selectedCourse.dateLabel }} {{ selectedCourse.year }} · {{ selectedCourse.title }} ·
            {{ selectedCourse.venue }}, {{ selectedCourse.city }}. {{ selectedCourse.spacesLabel }}.
          </p>

          <label class="field">
            <span>Name</span>
            <input v-model="form.name" name="name" autocomplete="name" required />
            <small v-if="errors.name" class="error">{{ errors.name }}</small>
          </label>

          <label class="field">
            <span>Email</span>
            <input v-model="form.email" name="email" type="email" autocomplete="email" required />
            <small v-if="errors.email" class="error">{{ errors.email }}</small>
          </label>

          <label class="field">
            <span>Phone <em style="font-style: normal; font-weight: 400; letter-spacing: 0">(optional)</em></span>
            <input v-model="form.phone" name="phone" type="tel" autocomplete="tel" />
          </label>

          <label class="field">
            <span>This is about</span>
            <select v-model="form.interest" name="interest">
              <option v-for="item in intents" :key="item.id" :value="item.id">{{ item.label }}</option>
            </select>
          </label>

          <label class="field">
            <span>Message <em style="font-style: normal; font-weight: 400; letter-spacing: 0">(optional)</em></span>
            <textarea v-model="form.message" name="message" placeholder="Experience, role, or what the show needs."></textarea>
          </label>

          <label class="check">
            <input v-model="form.consent" type="checkbox" />
            <span>Stagefight can reply by email or phone about this enquiry. Nothing is stored on this site.</span>
          </label>
          <small v-if="errors.consent" class="error">{{ errors.consent }}</small>

          <button class="btn btn-ink" type="submit">Prepare email</button>
        </form>

        <div v-else class="success">
          <h2 class="display" style="font-size: 41.6px">Ready to send.</h2>
          <p>
            {{ form.name }}, your note about {{ selected?.label }} is filled in. Open the email and send it, or call
            the school directly.
          </p>
          <p>
            <a class="btn btn-ink" :href="mailto">Email {{ contact.email }}</a>
          </p>
          <p>
            <a :href="contact.phoneHref">{{ contact.phoneDisplay }}</a>
          </p>
          <button class="btn btn-line" type="button" @click="ready = false">Edit the note</button>
        </div>

        <aside class="contact-aside">
          <div>
            <p class="eyebrow">Call</p>
            <p><a :href="contact.phoneHref">{{ contact.phoneDisplay }}</a></p>
          </div>
          <div>
            <p class="eyebrow">Email</p>
            <p><a :href="`mailto:${contact.email}`">{{ contact.email }}</a></p>
          </div>
          <div>
            <p class="eyebrow">Where courses run</p>
            <p>AMPL Events Centre, Birmingham</p>
            <p>Halley House School, London, E8</p>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>
