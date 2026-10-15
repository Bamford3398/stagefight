<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { nav } from '../data/content'
import SiteLogo from './SiteLogo.vue'

const route = useRoute()
const open = ref(false)

function isCurrent(path) {
  if (path === '/news') return route.path.startsWith('/news')
  return route.path === path
}

function close() {
  open.value = false
}

function onKey(event) {
  if (event.key === 'Escape') close()
}

watch(open, (value) => {
  document.body.classList.toggle('nav-open', value)
})

watch(
  () => route.fullPath,
  () => close(),
)

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  document.body.classList.remove('nav-open')
})
</script>

<template>
  <header class="site-header is-solid">
    <div class="header-inner">
      <RouterLink to="/" aria-label="Stagefight home" @click="close">
        <SiteLogo />
      </RouterLink>

      <nav class="nav-desktop" aria-label="Primary">
        <RouterLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          :class="{ 'is-active': isCurrent(item.to) }"
          :aria-current="isCurrent(item.to) ? 'page' : undefined"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <RouterLink class="btn btn-bronze header-cta" to="/calendar">Book a course</RouterLink>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="open"
        aria-controls="mobile-nav"
        @click="open = !open"
      >
        <span></span>
        <span></span>
        <span></span>
        <span class="sr-only">{{ open ? 'Close menu' : 'Open menu' }}</span>
      </button>
    </div>
  </header>

  <nav id="mobile-nav" class="nav-mobile" :class="{ 'is-open': open }" aria-label="Mobile">
    <RouterLink
      v-for="item in nav"
      :key="item.to"
      :to="item.to"
      :class="{ 'is-active': isCurrent(item.to) }"
      :aria-current="isCurrent(item.to) ? 'page' : undefined"
    >
      {{ item.label }}
    </RouterLink>
    <RouterLink class="btn btn-bronze" to="/calendar">Book a course</RouterLink>
  </nav>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.menu-toggle {
  position: relative;
}
</style>
