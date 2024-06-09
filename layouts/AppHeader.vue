<script setup lang="ts">
</script>

<template>
  <header class="header">
    <NuxtLink class="logo" to="/">
      logo
    </NuxtLink>
    <nav class="nav">
      <div class="spacer" />
      <div class="right">
        <NuxtLink to="/blog">
          <span class="lt-md:hidden">Blog</span>
          <div i-tabler-clipboard-list class="md:hidden" />
        </NuxtLink>
        <NuxtLink to="/projects">
          <span class="lt-md:hidden">Projects</span>
          <div i-tabler-bulb class="md:hidden" />
        </NuxtLink>
        <NuxtLink i-tabler-brand-discord to="https://x.com/akinoccc" target="_blank" />
        <NuxtLink i-tabler-brand-x to="https://x.com/akinoccc" target="_blank" />
        <NuxtLink
          i-tabler-brand-github to="https://github.com/akinocccc"
          target="_blank"
        />
        <ToggleTheme />
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header h1 {
  margin-bottom: 0;
}

.logo {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
}

.nav {
  padding: 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: auto max-content;
  box-sizing: border-box;
}

.nav > * {
  margin: auto;
}

.nav img {
  margin-bottom: 0;
}

.nav a {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
  opacity: 0.6;
  outline: none;
}

.nav a:hover {
  opacity: 1;
  text-decoration-color: inherit;
}

.nav .right {
  display: grid;
  grid-gap: 1.2rem;
  grid-auto-flow: column;
}

.nav .right > * {
  margin: auto;
}
</style>
