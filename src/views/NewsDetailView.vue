<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MediaPlaceholder from '../components/MediaPlaceholder.vue'
import { newsBySlug } from '../data/content'

const route = useRoute()
const item = computed(() => newsBySlug(route.params.slug))
</script>

<template>
  <div v-if="item">
    <header class="page-hero">
      <div class="container">
        <RouterLink class="back-link" to="/news">All news</RouterLink>
        <p class="meta-row" style="margin-top: 19.2px">
          <span>{{ item.dateLabel }}</span>
          <span>{{ item.category }}</span>
        </p>
        <h1 class="display" style="max-width: 16ch; margin-top: 9.6px">{{ item.title }}</h1>
      </div>
    </header>
    <section class="section paper">
      <div class="container article-layout">
        <MediaPlaceholder :label="item.category" kicker="Image placeholder" />
        <div class="prose">
          <p v-for="(paragraph, index) in item.body" :key="index">{{ paragraph }}</p>
        </div>
      </div>
    </section>
  </div>
  <div v-else class="section">
    <div class="container">
      <h1 class="display">That story is not on the site.</h1>
      <p style="margin-top: 16px">
        <RouterLink class="btn btn-bronze" to="/news">Back to news</RouterLink>
      </p>
    </div>
  </div>
</template>
