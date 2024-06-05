<template>
    <main class="p-16">
        <ContentList path="/blog" v-slot="{ list }">
            <div class="mb-4" v-for="blog in list" :key="blog._path">
                <span>{{ blog.title }}</span>
                <span class="ml-2 text-neutral text-size-xs">{{ blog.date }}</span>
                <!-- <span>{{ blog.description }}</span> -->
            </div>
        </ContentList>
    </main>
</template>

<script setup lang="ts">

</script>