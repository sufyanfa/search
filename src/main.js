import { createApp } from 'vue'
import './style.css'
import router from './route'
import axios from 'axios'
import App from './App.vue'



axios.defaults.baseURL = 'https://universitygroups.herokuapp.com';
createApp(App).use(router, axios).mount('#app')
