import { transformerDirectives } from 'unocss'

export default defineNuxtConfig({
  ssr: true,
  modules: [
    '@unocss/nuxt',
    '@nuxt/content',
  ],
  unocss: {
    uno: true,
    icons: {
      collections: {
        tabler: () => import('@iconify-json/tabler/icons.json').then(i => i.default),
      },
      extraProperties: {
        'display': 'inline-block',
        'height': '1.2em',
        'width': '1.2em',
        'vertical-align': 'text-bottom',
      },
    },
    attributify: true,
    webFonts: {
      fonts: {
        sans: 'Inter:400,600,800',
        mono: 'DM Mono:400,600',
        condensed: 'Roboto Condensed',
        wisper: 'Bad Script',
      },
    },
    transformers: [
      transformerDirectives(),
    ],
    shortcuts: [
      {
        'bg-base': 'bg-white dark:bg-black',
        'color-base': 'text-black dark:text-white',
        'border-base': 'border-[#8884]',
      },
      [/^btn-(\w+)$/, ([_, color]) => `op50 px2.5 py1 transition-all duration-200 ease-out no-underline! hover:(op100 text-${color} bg-${color}/10) border border-base! rounded`],
    ],
    rules: [
      [/^slide-enter-(\d+)$/, ([_, n]) => ({
        '--enter-stage': n,
      })],
    ],
  },
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },

  alias: {
    '~': '/',
  },
  // css: [
  //   '~/assets/style/global.css'
  // ]
})