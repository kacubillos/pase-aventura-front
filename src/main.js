import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'bootstrap/dist/css/bootstrap.css'
import 'normalize.css'

/* import OhVueIcon icon component */
import { OhVueIcon, addIcons } from "oh-vue-icons";

/* import specific icons */
import { MdGridviewRound, HiViewList, MdAddRound, MdSearch, BiArrowLeftShort, MdDeleteforever, CoSearch, LaFilterSolid, LaUserPlusSolid, PrSave,BiTrash,LaUserEditSolid, FaRegularEdit} from "oh-vue-icons/icons";

/* add icons to the library */
addIcons(MdGridviewRound, HiViewList, MdAddRound, MdSearch, BiArrowLeftShort, MdDeleteforever, CoSearch, LaFilterSolid, LaUserPlusSolid, PrSave, BiTrash, LaUserEditSolid, FaRegularEdit);

axios.defaults.baseURL = 'http://localhost:8080/api/v1/';

/* create pinia's instance and use the persistance plugin */
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.component("v-icon", OhVueIcon);
app.use(router)
app.use(pinia)
app.mount('#app')

import 'bootstrap/dist/js/bootstrap.js'