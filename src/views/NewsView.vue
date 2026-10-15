<script setup>
import { computed } from 'vue'
import MediaPlaceholder from '../components/MediaPlaceholder.vue'
import { news } from '../data/content'

const items = computed(() => [...news].sort((a, b) => b.date.localeCompare(a.date)))
</script>

<template>
  <div>
    <header class="page-hero">
      <div class="container">
        <p class="eyebrow">News & media</p>
        <h1 class="display">Latest from the school</h1>
        <p class="lede" style="margin-top: 16px">
          Course weekends, masterclasses, school workshops and the films the company is making.
        </p>
      </div>
    </header>

    <section class="section paper">
      <div class="container news-grid">
        <RouterLink v-for="item in items" :key="item.slug" class="news-card" :to="`/news/${item.slug}`">
          <MediaPlaceholder :label="item.category" kicker="Image placeholder" />
          <p class="meta-row">
            <span>{{ item.dateLabel }}</span>
            <span>{{ item.category }}</span>
          </p>
          <h3>{{ item.title }}</h3>
          <p>{{ item.excerpt }}</p>
        </RouterLink>
      </div>
    </section>
  </div>
</template>
