<template>
    <div class="pt-8 pb-8">
        <AppHeader />
        <slot />
    </div>
</template>

<script setup lang="ts">
import AppHeader from "./AppHeader.vue";
</script>