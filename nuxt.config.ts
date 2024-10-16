// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Clinic Management System',
      titleTemplate: '%s - Clinic Management System',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'A comprehensive system for managing medical clinics' }
      ]
    }
  },
  plugins: [
    '~/plugins/api.ts',
  ],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@pinia/nuxt',
    // '@nuxtjs/leaflet'
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  css: ['@mdi/font/css/materialdesignicons.min.css'],
  ssr: false, // Set to false for SPA mode
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL
    }
  },
})
