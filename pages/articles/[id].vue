<script setup lang="ts">
import dayjs from 'dayjs'
</script>

<template>
  <main class="px-7 py-10">
    <div class="prose m-auto slide-enter-content">
      <ContentDoc v-slot="{ doc }" tag="div">
        <ContentRenderer :value="doc">
          <h1>{{ doc.title }}</h1>
          <span>{{ dayjs(doc.date).format("MMM D") }}</span>
          <ContentRendererMarkdown tag="article" :value="doc" />
        </ContentRenderer>
      </ContentDoc>
    </div>
  </main>
</template>
