<script setup>
import { contact } from '../data/content'
import { useRoster } from '../data/rosterStore'

const { people } = useRoster()

const bookSteps = [
  'Tell us the production, the dates, and the action you need.',
  'Look through the fight team below.',
  'We come back with who is free to work.',
]
</script>

<template>
  <div>
    <header class="page-hero">
      <div class="container">
        <p class="eyebrow">Agency</p>
        <h1 class="display">Fight team</h1>
        <ul class="hero-points">
          <li>Complete the Stagefight courses and you can audition to join the fight team.</li>
          <li>Productions, please look through our roster and contact if you would like to book any of our performers.</li>
        </ul>
      </div>
    </header>

    <section class="section paper">
      <div class="container provide-grid">
        <article>
          <p class="eyebrow">Book performers</p>
          <h2 class="display" style="font-size: 44.8px; margin-bottom: 16px">Tell us the job</h2>
          <ol class="steps-list">
            <li v-for="step in bookSteps" :key="step">{{ step }}</li>
          </ol>
          <p class="lede lede-dark" style="margin: 19.2px 0 22.4px">
            Call {{ contact.phoneDisplay }} or write to {{ contact.email }}.
          </p>
          <RouterLink class="btn btn-ink" to="/contact?intent=agency">Book performers</RouterLink>
        </article>
        <article>
          <p class="eyebrow">Join the team</p>
          <h2 class="display" style="font-size: 44.8px; margin-bottom: 16px">Train, then audition</h2>
          <p>
            Finishing the courses gives you the chance to audition for Stagefight’s fight team. A place on the team
            is offered after that audition. It does not come with the certificate alone.
          </p>
          <p style="margin-top: 22.4px">
            <RouterLink class="btn btn-line" to="/calendar">See the courses</RouterLink>
          </p>
        </article>
      </div>
    </section>

    <section class="section" aria-labelledby="roster-heading">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">Signed performers</p>
          <h2 id="roster-heading" class="display">Who you can book</h2>
        </div>
        <ul v-if="people.length" class="roster">
          <li v-for="person in people" :key="person.id">
            <img v-if="person.photo" :src="person.photo" :alt="`Headshot of ${person.name}`" />
            <div v-else class="shot-empty" role="img" :aria-label="`Headshot of ${person.name} to follow`">
              <span>Headshot</span>
            </div>
            <h3>{{ person.name }}</h3>
            <p>{{ person.height }}</p>
            <p>{{ person.chest }} chest · {{ person.waist }} waist</p>
          </li>
        </ul>
        <p v-else class="lede">The fight team list is empty.</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-points {
  margin: 16px 0 0;
  padding: 0 0 0 20px;
  max-width: 640px;
  color: rgba(246, 241, 232, 0.78);
  font-size: 17.92px;
  display: grid;
  gap: 8px;
}

.steps-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 8.8px;
  counter-reset: step;
}

.steps-list li {
  padding-top: 8.8px;
  border-top: 1px solid var(--line-dark);
  counter-increment: step;
}

.steps-list li::before {
  content: counter(step) ". ";
  font-weight: 600;
}

.roster {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
}

.roster li {
  display: grid;
  gap: 5.6px;
  align-content: start;
}

.roster img,
.shot-empty {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  object-position: center 18%;
  background: var(--bg-soft);
  margin-bottom: 7.2px;
}

.shot-empty {
  display: grid;
  place-items: end start;
  padding: 16px;
  border: 1px solid var(--line);
}

.shot-empty span {
  font-size: 11.52px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--bronze-soft);
}

.roster h3 {
  font-family: var(--font-display);
  font-size: 27.2px;
  font-weight: 600;
  letter-spacing: 0.04em;
  line-height: 0.95;
  text-transform: uppercase;
}

.roster p {
  color: var(--muted);
  font-size: 15.2px;
}
</style>
