import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'

axios.defaults.baseURL = 'http://localhost:8090/api/v1/';

createApp(App).use(router).mount('#app')

import 'bootstrap/dist/js/bootstrap.js'