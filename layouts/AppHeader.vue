<template>
  <nav class="nav">
    <NuxtLink class="flex" to="/">
      logo
    </NuxtLink>
    <div class="flex flex-1 flex-justify-end items-center text-neutral font-400">
      <a class="decoration-none hover:text-black" href="/blog">
        Blog
      </a>
      <a class="ml-4 decoration-none hover:text-black">
        Projects
      </a>
      <a class="ml-4 hover:text-black i-tabler-brand-discord" href="https://x.com/akinoccc" target="_blank" />
      <a class="ml-4 hover:text-black i-tabler-brand-x" href="https://x.com/akinoccc" target="_blank" />
      <a
        class="ml-4 mr-4 hover:text-black i-tabler-brand-github" href="https://github.com/akinocccc"
        target="_blank"
      />
      <ToggleTheme />
    </div>
  </nav>
</template>

<style scoped>
.nav {
  padding: 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: auto max-content;
  box-sizing: border-box;
}
</style>
