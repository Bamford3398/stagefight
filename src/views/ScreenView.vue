<script setup>
import { computed } from 'vue'
import CourseCard from '../components/CourseCard.vue'
import { screenStages } from '../data/content'
import { useCourses } from '../data/courseStore'

const { courses } = useCourses()
const screenCourses = computed(() =>
  courses.value.filter((course) => course.track === 'Screen' || course.track === 'Masterclass' || course.track === 'Refresher'),
)
</script>

<template>
  <div>
    <header class="page-hero">
      <div class="container">
        <p class="eyebrow">Film & television</p>
        <h1 class="display">Screen combat</h1>
        <p class="lede" style="margin-top: 16px">
          Streaming and the boom in production have opened real work for actors, performers and stunt
          professionals. Stagefight teaches the technical, physical and acting craft of a convincing action sequence,
          including how to behave on a working set.
        </p>
      </div>
    </header>

    <section class="section paper">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">Four-stage course</p>
          <h2 class="display">The most practical route into screen action.</h2>
          <p class="lede lede-dark">
            Written for actors who want to work in the action industry. You learn the mechanics, then how to adapt
            them quickly to different locations and genres. Each completed stage earns an industry-accepted,
            Spotlight-approved certificate accredited by the ECSPC.
          </p>
        </div>
        <div class="steps">
          <article v-for="stage in screenStages" :key="stage.id" class="step">
            <h3>{{ stage.title }}</h3>
            <p>{{ stage.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">Before you book</p>
          <h2 class="display">What you need on day one.</h2>
        </div>
        <div class="provide-grid">
          <article class="note" style="background: var(--bg-raised); color: var(--cream); border-left-color: var(--bronze)">
            <p>Minimum age is 18.</p>
            <p>A reasonable level of fitness and mobility is essential.</p>
            <p>No previous performance combat or martial arts experience is required.</p>
          </article>
          <article>
            <h3 class="display" style="font-size: 32px; margin-bottom: 9.6px">Why it is not stage combat</h3>
            <p class="lede">
              The two disciplines share principles. Stage combat is written for a live audience, and a lot of it does
              not belong on a film set. Screen combat is about performing to camera, and about the etiquette of
              working under real production conditions.
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="section paper">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">Dates</p>
          <h2 class="display">Screen courses and masterclasses.</h2>
        </div>
        <div class="course-list">
          <CourseCard v-for="course in screenCourses" :key="course.id" :course="course" tone="paper" />
        </div>
      </div>
    </section>
  </div>
</template>
