<script setup lang='ts'>
import { toggleDark } from '../logics'
</script>

<template>
  <a class="select-none" title="Toggle Color Scheme" @click="toggleDark">
    <i i-tabler-sun-high dark:i-tabler-moon-star />
  </a>
</template>
