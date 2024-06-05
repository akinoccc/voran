<template>
    <div class="flex flex-justify-center">
        <ContentDoc class="max-w-2xl" path="bio" v-slot="{ doc }">
            <ContentRenderer :value="doc" />
            <div class=" text-black">
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
    </div>
</template>