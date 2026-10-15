<script setup>
import { computed } from 'vue'
import CourseCard from '../components/CourseCard.vue'
import MediaPlaceholder from '../components/MediaPlaceholder.vue'
import { news } from '../data/content'
import { useCourses } from '../data/courseStore'

const { courses } = useCourses()
const openCourses = computed(() => courses.value.filter((course) => course.status === 'open'))
const latestNews = computed(() =>
  [...news].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3),
)

const disciplines = [
  {
    to: '/screen',
    index: '01',
    title: 'Screen',
    text: 'A four-stage course for camera: mechanics, performance and the etiquette of a working set.',
  },
  {
    to: '/stage',
    index: '02',
    title: 'Stage',
    text: 'Equity-approved qualifications, from unarmed and single sword through to advanced weapon work.',
  },
  {
    to: '/firearms',
    index: '03',
    title: 'Firearms',
    text: 'Safe, dramatic handling for film and television, taught with Firearms Training for Film & TV.',
  },
  {
    to: '/choreography',
    index: '04',
    title: 'Choreography',
    text: 'Fight arranging for stage and screen, plus fight teams, weapon hire and prop manufacture.',
  },
]
</script>

<template>
  <div>
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <p class="eyebrow">Established 2004 · Birmingham & London</p>
          <h1 class="display">
            Performance combat for <em>stage</em> and <em>screen</em>
          </h1>
          <p class="lede" style="margin-top: 20px">
            One of the UK’s leading performance combat schools. Professional training for actors,
            support artists, special action and stunt performers.
          </p>
          <div class="hero-actions">
            <RouterLink class="btn btn-bronze" to="/calendar">Course calendar</RouterLink>
            <RouterLink class="btn btn-ghost" to="/screen">Screen combat</RouterLink>
          </div>
        </div>
        <MediaPlaceholder class="hero-frame" label="Training showreel" kicker="Film placeholder" />
      </div>
    </section>

    <div class="container">
      <div class="stats">
        <div class="stat">
          <strong>2004</strong>
          <span>Teaching since</span>
        </div>
        <div class="stat">
          <strong>ECSPC</strong>
          <span>Accredited certification</span>
        </div>
        <div class="stat">
          <strong>Equity</strong>
          <span>Fight Directors pathway</span>
        </div>
        <div class="stat">
          <strong>Spotlight</strong>
          <span>Approved screen certificates</span>
        </div>
      </div>
    </div>

    <section class="section paper">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">The school</p>
          <h2 class="display">Four ways to train, one standard of safety.</h2>
        </div>
        <div class="discipline-grid">
          <RouterLink v-for="item in disciplines" :key="item.to" class="discipline" :to="item.to">
            <span class="discipline-index">{{ item.index }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
            <span class="discipline-more">View {{ item.title }}</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">2026 · spaces open</p>
          <h2 class="display">Book the courses that still have room.</h2>
        </div>
        <div class="course-list">
          <CourseCard v-for="course in openCourses" :key="course.id" :course="course" />
        </div>
        <p style="margin-top: 20px">
          <RouterLink class="btn btn-ghost" to="/calendar">Full calendar</RouterLink>
        </p>
      </div>
    </section>

    <section class="quote">
      <div class="container">
        <figure>
          <blockquote>
            We do not rise to the level of our expectations. We fall to the level of our training.
          </blockquote>
          <figcaption>Archilochus</figcaption>
        </figure>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">Pathways</p>
          <h2 class="display">Stage and screen are different jobs.</h2>
        </div>
        <div class="split">
          <article>
            <p class="eyebrow">Camera</p>
            <h3>Screen combat</h3>
            <p>
              Built for film and television. You learn how a fight reads to camera, and how to work on a set.
              Four stages. No previous combat experience required. Minimum age 18.
            </p>
            <p style="margin-top: 16px">
              <RouterLink class="btn btn-ghost" to="/screen">The four stages</RouterLink>
            </p>
          </article>
          <article>
            <p class="eyebrow">Live audience</p>
            <h3>Stage combat</h3>
            <p>
              Dramatic combat for theatre. Level-1 starts with unarmed work and single sword. Advanced training
              is recognised for entry to Equity’s Fight Directors Training Scheme.
            </p>
            <p style="margin-top: 16px">
              <RouterLink class="btn btn-ghost" to="/stage">The three levels</RouterLink>
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="section paper">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">Credits</p>
          <h2 class="display">Our students have worked with</h2>
          <p class="lede lede-dark">Production logos from the current site will sit in these frames.</p>
        </div>
        <div class="client-row">
          <div v-for="n in 8" :key="n" class="client-slot">Logo {{ n }}</div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">Latest news</p>
          <h2 class="display">From the training floor.</h2>
        </div>
        <div class="news-grid home-news">
          <RouterLink
            v-for="item in latestNews"
            :key="item.slug"
            class="news-card"
            :to="`/news/${item.slug}`"
          >
            <MediaPlaceholder :label="item.category" kicker="Image placeholder" />
            <p class="meta-row">{{ item.dateLabel }}</p>
            <h3>{{ item.title }}</h3>
            <p>{{ item.excerpt }}</p>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-grid {
  display: grid;
  gap: 40px;
}

.hero-frame {
  min-height: 352px;
}

@media (min-width: 980px) {
  .hero-grid {
    grid-template-columns: 1.15fr 0.85fr;
    align-items: end;
    min-height: calc(100vh - 72px - 112px);
  }

  .hero-frame {
    min-height: 512px;
  }
}
</style>
