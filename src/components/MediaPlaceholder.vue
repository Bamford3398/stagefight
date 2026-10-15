<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  kicker: {
    type: String,
    default: 'Placeholder',
  },
})
</script>

<template>
  <div class="ph" role="img" :aria-label="`${kicker}: ${label}`">
    <span>{{ kicker }}</span>
    <strong>{{ label }}</strong>
  </div>
</template>
