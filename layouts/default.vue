<script setup lang="ts">
import { useDark } from '@vueuse/core'
import AppHeader from './AppHeader.vue'

const isDark = useDark()
</script>

<template>
  <SolarSystem v-if="isDark" />
  <StarBackground v-if="isDark" />
  <div class="font-sans text-gray-700 dark:text-gray-200 relative">
    <AppHeader />
    <slot />
  </div>
</template>
