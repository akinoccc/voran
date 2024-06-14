<script setup lang="ts">
const appConfig = useAppConfig()

const footerText = computed<string>(() => {
  let { copyright, license, author } = appConfig?.footer
  if (license) {
    copyright = copyright?.replace('[license]', `<a target="_blank" href="${license.url}">${license.name}</a>`)
  }
  if (author) {
    copyright = copyright?.replace('[author]', `<a target="_blank" href="${author.url}">${author.name}</a>`)
  }
  return copyright
})
</script>

<template>
  <footer px-7 py-10 m-auto>
    <p class="max-w-65ch m-auto text-sm text-neutral" v-html="footerText" />
  </footer>
</template>
