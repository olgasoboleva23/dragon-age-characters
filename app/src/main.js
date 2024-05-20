import { createApp } from 'vue'
import store from './store/index.js'
import './style.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

// Components
import App from './App.vue'

const vuetify = createVuetify({})

createApp(App)
   .use(vuetify)
   .use(store)
   .mount('#app')
