<script setup lang="ts">
import { useDark } from '@vueuse/core'
import AppHeader from './AppHeader.vue'

const isDark = useDark()

const ArtComponent = computed(() => {
  let art = 'dots'
  if (art === 'random')
    art = Math.random() > 0.5 ? 'plum' : 'dots'
  if (typeof window !== 'undefined') {
    if (art === 'plum')
      return defineAsyncComponent(() => import('../components/ArtPlum.vue'))
    else if (art === 'dots')
      return defineAsyncComponent(() => import('../components/ArtDots.vue'))
  }
  return undefined
})
</script>

<template>
  <ClientOnly v-if="ArtComponent && !isDark">
    <component :is="ArtComponent" />
  </ClientOnly>
  <SolarSystem v-if="isDark" />
  <StarBackground v-if="isDark" />
  <div class="font-sans text-gray-700 dark:text-gray-200 relative">
    <AppHeader />
    <slot />
  </div>
</template>
