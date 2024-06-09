<template>
  <main class="px-7 py-10">
    <div class="prose m-auto text-center mb-10" slide-enter style="--enter-stage: -1">
      <h1 style="margin-bottom: 0;">
        Projects
      </h1>
      <p op50 text-lg italic>
        Projects that I created or maintaining.
      </p>
    </div>

    <div class="max-w-300 m-auto">
      <ContentQuery v-slot="{ data }" path="/projects">
        <div v-for="c in data" :key="c.category" class="mb-6">
          <div class="select-none relative h22" slide-enter style="--enter-stage: -2; --enter-step: 60ms">
            <span
              class="text-5em color-transparent line-height-5rem  absolute left--1rem font-bold text-stroke-2
                    text-stroke-hex-aaa op-20"
            >
              {{ c.category }}
            </span>
          </div>

          <div class="grid max-w-500 w-max mx-auto" grid="~ cols-1 md:cols-2 gap-4 lg:cols-3" slide-enter style="--enter-stage: 3;">
            <NuxtLink v-for="p in c.projects" :key="p.link" class="flex items-center w-350px px-4 py-3 m-auto rounded op-70 hover:op-100 hover:bg-#8881" :to="p.link">
              <img v-if="p.icon" class="w-14 mr-2" :src="p.icon">
              <h2 v-else class="flex items-center justify-center w-12 h-12 mr-2 rounded-full bg-#8884 text-xl fw-700">
                {{ p.name[0].toUpperCase() }}
              </h2>
              <div flex-1>
                <div>
                  {{ p.name }}
                </div>

                <div class="text-xs text-neutral">
                  {{ p.description }}
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </ContentQuery>
    </div>
  </main>
</template>
