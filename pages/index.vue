<template>
  <main class="px-7 py-10">
    <article class="m-auto" style="max-width: 67ch;">
      <ContentDoc v-slot="{ doc }" path="bio">
        <ContentRenderer :value="doc" />
        <div class="text-black">
          <p>Find me on:</p>
          <a href="https://github.com/akinocccc">
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
