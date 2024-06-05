<template>
    <div class="p-8 pl-14 pr-14">
        <AppHeader />
        <slot />
    </div>
</template>

<script setup lang="ts">
import AppHeader from "./AppHeader.vue";
</script>