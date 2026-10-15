<script setup>
import { contact, nav } from '../data/content'
import SiteLogo from './SiteLogo.vue'
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <RouterLink to="/" class="footer-brand" aria-label="Stagefight home">
        <SiteLogo />
      </RouterLink>
      <div>
        <p>
          <a :href="contact.phoneHref">{{ contact.phoneDisplay }}</a><br />
          <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
        </p>
        <p>AMPL Events Centre, Birmingham<br />Halley House School, London</p>
      </div>
      <nav class="footer-links" aria-label="Footer">
        <RouterLink v-for="item in nav" :key="item.to" :to="item.to">{{ item.label }}</RouterLink>
        <RouterLink to="/calendar">Book</RouterLink>
      </nav>
    </div>
    <div class="container fine">
      <p>© {{ new Date().getFullYear() }} Stagefight. School of performance combat. Established 2004.</p>
    </div>
  </footer>
</template>
