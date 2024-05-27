import { createApp } from 'vue'
import store from './store/index.js'
import './style.css'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

// Components
import App from './App.vue'

// const vuetify = createVuetify({})
const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

createApp(App)
   .use(vuetify)
   .use(store)
   .mount('#app')
