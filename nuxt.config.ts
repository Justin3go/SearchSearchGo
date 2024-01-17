// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nuxt-elasticsearch'
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
  devtools: { enabled: true }
})
