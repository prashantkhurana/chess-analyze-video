// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'

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
      },
      alias: {
        'utils': resolve(__dirname, './utils')
      }
})
