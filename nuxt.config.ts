import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'SearchSearchGo',
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo.png' }
      ]
    }
  },
  modules: [
    'nuxt-elasticsearch',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  nuxtElasticsearch: {
    clientOpts: {
      node: process.env.ES_URL,
      auth: {
        username: process.env.ES_AUTH_USERNAME || '',
        password: process.env.ES_AUTH_PASSWORD || '',
      }
    }
  },
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  }
})
