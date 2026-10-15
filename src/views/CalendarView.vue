<script setup>
import { computed, ref } from 'vue'
import CourseCard from '../components/CourseCard.vue'
import { useCourses } from '../data/courseStore'

const { courses } = useCourses()
const active = ref('all')

const filters = computed(() => {
  const months = []
  for (const course of courses.value) {
    if (!months.some((month) => month.id === course.monthKey)) {
      months.push({ id: course.monthKey, label: course.month })
    }
  }
  return [{ id: 'all', label: 'All' }, { id: 'open', label: 'Spaces open' }, ...months]
})

const visible = computed(() => {
  if (active.value === 'all') return courses.value
  if (active.value === 'open') return courses.value.filter((course) => course.status === 'open')
  return courses.value.filter((course) => course.monthKey === active.value)
})
</script>

<template>
  <div>
    <header class="page-hero">
      <div class="container">
        <p class="eyebrow">Workshops, classes & courses</p>
        <h1 class="display">Course calendar</h1>
      </div>
    </header>

    <section class="section" style="padding-top: 0">
      <div class="container">
        <div class="filters" role="group" aria-label="Filter courses">
          <button
            v-for="filter in filters"
            :key="filter.id"
            type="button"
            :aria-pressed="active === filter.id"
            @click="active = filter.id"
          >
            {{ filter.label }}
          </button>
        </div>

        <div v-if="visible.length" class="course-list">
          <CourseCard v-for="course in visible" :key="course.id" :course="course" />
        </div>
        <p v-else class="empty">Nothing matches that filter.</p>
      </div>
    </section>
  </div>
</template>
