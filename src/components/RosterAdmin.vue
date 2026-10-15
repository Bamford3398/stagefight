<script setup>
import { reactive, ref } from 'vue'
import { useRoster } from '../data/rosterStore'

const { people, savePerson, removePerson } = useRoster()

const blank = () => ({
  name: '',
  height: '',
  chest: '',
  waist: '',
})

const form = reactive(blank())
const errors = ref({})
const formOpen = ref(false)
const editingId = ref(null)
const pendingRemove = ref(null)
const photo = ref('')
const photoError = ref('')

function compressImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read that image.'))
    reader.onload = () => {
      const image = new Image()
      image.onerror = () => reject(new Error('Could not read that image.'))
      image.onload = () => {
        const max = 900
        const scale = Math.min(1, max / Math.max(image.width, image.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(image.width * scale)
        canvas.height = Math.round(image.height * scale)
        const context = canvas.getContext('2d')
        if (!context) {
          reject(new Error('Could not read that image.'))
          return
        }
        context.drawImage(image, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', 0.82))
      }
      image.src = String(reader.result)
    }
    reader.readAsDataURL(file)
  })
}

async function onPhoto(event) {
  const file = event.target.files?.[0]
  photoError.value = ''
  if (!file) return
  if (!file.type.startsWith('image/')) {
    photoError.value = 'Choose an image file.'
    return
  }
  try {
    photo.value = await compressImage(file)
  } catch {
    photoError.value = 'Could not read that image.'
  }
}

function openNew() {
  Object.assign(form, blank())
  photo.value = ''
  photoError.value = ''
  editingId.value = null
  errors.value = {}
  pendingRemove.value = null
  formOpen.value = true
}

function openEdit(person) {
  Object.assign(form, {
    name: person.name,
    height: person.height,
    chest: person.chest,
    waist: person.waist,
  })
  photo.value = person.photo
  photoError.value = ''
  editingId.value = person.id
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
  if (!form.name.trim()) next.name = 'Add the performer’s name.'
  if (!form.height.trim()) next.height = 'Add the height.'
  if (!form.chest.trim()) next.chest = 'Add the chest size.'
  if (!form.waist.trim()) next.waist = 'Add the waist size.'
  errors.value = next
  return Object.keys(next).length === 0
}

function save() {
  if (!validate()) return
  savePerson({ ...form, photo: photo.value }, editingId.value)
  closeForm()
}

function confirmRemove(id) {
  removePerson(id)
  pendingRemove.value = null
  if (editingId.value === id) closeForm()
}

defineExpose({ openNew })
</script>

<template>
  <section class="section paper admin-section">
    <div class="container admin-layout" :class="{ 'has-form': formOpen }">
      <div>
        <p class="intro">
          Add a name, a headshot, and the measurements. Bookers see this list on the agency page. Photos stay in this
          browser, the same way courses do.
        </p>
        <ul>
          <li v-for="person in people" :key="person.id">
            <img v-if="person.photo" :src="person.photo" :alt="`Headshot of ${person.name}`" />
            <div v-else class="shot-empty">No headshot</div>
            <div>
              <h3>{{ person.name }}</h3>
              <p class="course-meta">{{ person.height }}</p>
              <p class="course-meta">{{ person.chest }} chest · {{ person.waist }} waist</p>
              <div class="row-actions">
                <button type="button" @click="openEdit(person)">Edit</button>
                <button type="button" class="danger" @click="pendingRemove = person.id">Remove</button>
              </div>
              <p v-if="pendingRemove === person.id" class="confirm">
                Remove {{ person.name }}?
                <button type="button" class="danger" @click="confirmRemove(person.id)">Remove</button>
                <button type="button" @click="pendingRemove = null">Keep</button>
              </p>
            </div>
          </li>
        </ul>
        <p v-if="!people.length" class="empty">No one on the fight team yet.</p>
      </div>

      <form v-if="formOpen" class="editor" @submit.prevent="save">
        <p class="eyebrow">{{ editingId ? 'Edit performer' : 'New performer' }}</p>
        <h2>{{ editingId ? 'Update this person' : 'Add to the fight team' }}</h2>

        <label class="field">
          <span>Name</span>
          <input v-model="form.name" type="text" />
          <small v-if="errors.name" class="error">{{ errors.name }}</small>
        </label>

        <label class="field">
          <span>Height</span>
          <input v-model="form.height" type="text" placeholder="5 foot 8 inches" />
          <small v-if="errors.height" class="error">{{ errors.height }}</small>
        </label>

        <div class="split-fields">
          <label class="field">
            <span>Chest</span>
            <input v-model="form.chest" type="text" placeholder="38" />
            <small v-if="errors.chest" class="error">{{ errors.chest }}</small>
          </label>
          <label class="field">
            <span>Waist</span>
            <input v-model="form.waist" type="text" placeholder="30" />
            <small v-if="errors.waist" class="error">{{ errors.waist }}</small>
          </label>
        </div>

        <label class="field">
          <span>Headshot</span>
          <input type="file" accept="image/*" @change="onPhoto" />
          <small v-if="photoError" class="error">{{ photoError }}</small>
        </label>
        <img v-if="photo" class="preview" :src="photo" alt="Headshot preview" />

        <div class="editor-actions">
          <button class="btn btn-ink" type="submit">Save performer</button>
          <button class="btn btn-line" type="button" @click="closeForm">Cancel</button>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped>
.intro {
  margin: 0 0 16px;
  max-width: 640px;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 11.2px;
}

li {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 14.4px;
  align-items: center;
  padding: 12.8px;
  background: #fffdf9;
  border: 1px solid var(--line-dark);
}

img,
.shot-empty {
  width: 72px;
  height: 89.6px;
  object-fit: cover;
  background: var(--paper-2);
}

.shot-empty {
  display: grid;
  place-items: center;
  text-align: center;
  font-size: 10.88px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted-dark);
}

h3 {
  font-size: 19.2px;
}

.course-meta {
  color: var(--muted-dark);
}

.preview {
  width: 128px;
  height: 160px;
}

.empty {
  color: var(--muted-dark);
}

.admin-layout {
  display: grid;
  gap: 24px;
  align-items: start;
}

.editor {
  display: grid;
  gap: 13.6px;
  padding: 19.2px;
  background: #fffdf9;
  border: 1px solid var(--line-dark);
}

.editor h2 {
  font-family: var(--font-display);
  font-size: 41.6px;
  letter-spacing: -0.02em;
  line-height: 0.9;
  margin-bottom: 6.4px;
  text-transform: uppercase;
}

.split-fields {
  display: grid;
  gap: 13.6px;
}

.editor-actions,
.row-actions,
.confirm {
  display: flex;
  flex-wrap: wrap;
  gap: 9.6px;
  align-items: center;
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

@media (min-width: 720px) {
  .split-fields {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 980px) {
  .admin-layout.has-form {
    grid-template-columns: 1.2fr 0.8fr;
  }

  .editor {
    position: sticky;
    top: 86.4px;
  }
}
</style>
