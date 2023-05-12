// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
      modules: ['nuxt-gtag'],
      gtag: {
        id: 'G-QHWN23BMBJ'
      }
})
