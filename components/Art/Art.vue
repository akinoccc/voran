<script setup lang="ts">
import { useDark } from '@vueuse/core'

const props = defineProps<{
  page: 'index' | 'blog' | 'blogDetail' | 'projects' | 'blog'
}>()

const isDark = useDark()
const appConfig = useAppConfig()

const ArtComponent = computed(() => {
  let art = appConfig.pages[props.page]?.art
  if (art === 'random')
    art = Math.random() > 0.5 ? 'plum' : 'dots'
  if (art === 'plum')
    return defineAsyncComponent(() => import('./ArtPlum.vue'))
  else if (art === 'dots')
    return defineAsyncComponent(() => import('./ArtDots.vue'))
  return undefined
})
</script>

<template>
  <div>
    <ClientOnly v-if="ArtComponent && !isDark">
      <component :is="ArtComponent" />
    </ClientOnly>
  </div>
</template>
