// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const themeCookie = useCookie('theme')
  const vuetify = createVuetify({
    theme: {
      defaultTheme: themeCookie.value || 'light',
    }
  })
  app.vueApp.use(vuetify)
})
