import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'bootstrap/dist/css/bootstrap.css'

axios.defaults.baseURL = 'http://localhost:8090/api/v1/';

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
createApp(App).use(router).use(pinia).mount('#app')

import 'bootstrap/dist/js/bootstrap.js'