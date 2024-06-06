<script setup lang="ts">
import AppHeader from './AppHeader.vue'
</script>

<template>
  <div class="font-sans text-gray-700 dark:text-gray-200 relative">
    <AppHeader />
    <slot />
  </div>
</template>
