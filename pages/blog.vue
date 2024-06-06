<script setup lang="ts">
import dayjs from 'dayjs'
import type { ParsedContent } from '@nuxt/content/types'

const articles = await queryContent('/articles').find()

const articlesByYear = computed<{ year: number, articles: ParsedContent[] }[]>(() => {
  const articlesByYear: Record<number, ParsedContent[]> = {}

  articles?.forEach((article) => {
    const year = new Date(article.date).getFullYear()
    if (!articlesByYear[year]) {
      articlesByYear[year] = []
    }
    articlesByYear[year].push(article)
  })

  return Object.keys(articlesByYear).sort((a, b) => b - a).map(year => ({
    year,
    articles: articlesByYear[year],
  }))
})
</script>

<template>
  <main class="px-7 py-10 m-auto" style="max-width: 67ch;">
    <div v-for="year in articlesByYear" :key="year.year" class="m-auto mb-16">
      <div class="select-none relative h20 op-10" slide-enter style="--enter-stage: -2; --enter-step: 60ms">
        <span
          class="text-8em color-transparent absolute left--2rem top--2rem font-bold text-stroke-2
                    text-stroke-hex-aaa"
        >
          {{ year.year }}
        </span>
      </div>
      <ul class="pos-relative z-1">
        <a v-for="article in year.articles" :key="article._path">
          <li class="mb-4 text-neutral hover:text-black" flex="~ col md:row gap-2 md:items-center">
            <span class="text-lg" flex="~ gap-2 wrap">{{ article.title }}</span>
            <span class="text-size-xs" flex="~ gap-2 items-center">
              {{ dayjs(article.date).format('MMM D') }}
            </span>
          </li>
        </a>
      </ul>
    </div>
  </main>
</template>
