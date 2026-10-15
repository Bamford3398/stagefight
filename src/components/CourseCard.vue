<script setup>
import { computed } from 'vue'
import { formatPrice } from '../data/content'

const props = defineProps({
  course: {
    type: Object,
    required: true,
  },
  tone: {
    type: String,
    default: 'dark',
  },
})

const enquiry = computed(() => ({
  path: '/contact',
  query: {
    course: props.course.id,
    intent: props.course.status === 'open' ? 'book' : 'waitlist',
  },
}))
</script>

<template>
  <article class="course-card" :class="tone">
    <div>
      <p class="course-meta">{{ course.month }} {{ course.year }} · {{ course.track }}</p>
      <p class="course-date">{{ course.dateLabel }}</p>
      <span class="pill" :class="course.status === 'open' ? 'pill-open' : 'pill-full'">
        {{ course.spacesLabel }}
      </span>
    </div>

    <div>
      <h3>{{ course.title }}</h3>
      <p class="course-meta">{{ course.duration }} · {{ course.venue }}, {{ course.city }}</p>
      <p v-if="course.requirement" class="requirement">{{ course.requirement }}</p>
    </div>

    <div class="course-buy">
      <p class="course-price">
        {{ formatPrice(course.price) }}
        <small>per person</small>
      </p>
      <a
        v-if="course.status === 'open' && course.bookingUrl"
        class="btn"
        :class="tone === 'paper' ? 'btn-ink' : 'btn-bronze'"
        :href="course.bookingUrl"
      >
        Book
      </a>
      <RouterLink v-else class="btn" :class="tone === 'paper' ? 'btn-ink' : 'btn-bronze'" :to="enquiry">
        {{ course.status === 'open' ? 'Enquire' : 'Waitlist' }}
      </RouterLink>
    </div>
  </article>
</template>

<style scoped>
.pill {
  margin-top: 12px;
}

.course-buy {
  display: grid;
  gap: 12px;
  justify-items: start;
}

@media (min-width: 760px) {
  .course-buy {
    justify-items: end;
  }
}
</style>
