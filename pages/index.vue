<script setup lang="ts">
</script>

<template>
  <Art page="index" />
  <main class="px-7 py-10">
    <article class="prose m-auto slide-enter-content">
      <ContentDoc v-slot="{ doc }" path="/home">
        <ContentRenderer :value="doc">
          <h1>{{ doc.title }}</h1>
          <ContentRendererMarkdown tag="article" :value="doc" />
        </ContentRenderer>
        <div>
          <p>Find me on:</p>
          <a href="https://github.com/akinoccc">
            <i i-tabler-brand-github />
            Github
          </a>
          <a class="ml-2" href="https://x.com/akinoccc">
            <i i-tabler-brand-x />
            Twitter
          </a>
        </div>
      </ContentDoc>
    </article>
  </main>
</template>
