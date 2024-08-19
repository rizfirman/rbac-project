// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['@/assets/scss/global.scss'],
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@primevue/nuxt-module'],
  ssr: false,
  primevue: {
    options: {
      // unstyled: true,
      ripple: true,
      inputVariant: 'filled',
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: '.app-dark',
          cssLayer: false,
        },
      },
    },
  },
  router: {
    options: {
      linkActiveClass: 'active',
      linkExactActiveClass: 'exact-active',
    },
  },
});
