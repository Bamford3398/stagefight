<script setup>
import { choreographyFor, choreographyProvides, contact } from '../data/content'
import MediaPlaceholder from '../components/MediaPlaceholder.vue'
</script>

<template>
  <div>
    <header class="page-hero">
      <div class="container">
        <p class="eyebrow">Fight arranging</p>
        <h1 class="display">Action choreography</h1>
        <p class="lede" style="margin-top: 16px">
          Since 2004 Stagefight has arranged fights for award-winning stage and screen work. From historical combat
          to fantasy film, the sequences are built with the director, the creative team and the performers.
        </p>
      </div>
    </header>

    <section class="section paper">
      <div class="container provide-grid">
        <article>
          <p class="eyebrow">We choreograph</p>
          <h2 class="display" style="font-size: 44.8px; margin-bottom: 16px">For the production in front of us</h2>
          <ul class="plain-list">
            <li v-for="item in choreographyFor" :key="item">{{ item }}</li>
          </ul>
        </article>
        <article>
          <p class="eyebrow">We can supply</p>
          <h2 class="display" style="font-size: 44.8px; margin-bottom: 16px">People, weapons, props</h2>
          <ul class="plain-list">
            <li v-for="item in choreographyProvides" :key="item">{{ item }}</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="section">
      <div class="container article-layout">
        <MediaPlaceholder label="Production still" kicker="Image placeholder" />
        <div>
          <p class="eyebrow">Book the team</p>
          <h2 class="display" style="font-size: clamp(41.6px, 5vw, 64px)">Tell us the show.</h2>
          <p class="lede" style="margin: 16px 0 22.4px">
            Call {{ contact.phoneDisplay }} or write to {{ contact.email }}. We will come back with who should be in
            the room, and what the fight needs.
          </p>
          <RouterLink class="btn btn-bronze" to="/contact?intent=choreography">Start an enquiry</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.plain-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 8.8px;
}

.plain-list li {
  padding-top: 8.8px;
  border-top: 1px solid var(--line-dark);
}
</style>
