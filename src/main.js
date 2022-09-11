import { createApp } from 'vue'
import './style.css'
import router from './route'
import axios from 'axios'
import App from './App.vue'


axios.defaults.baseURL = import.meta.env.VITE_BACK_END_API;

if(sessionStorage.getItem("token")){
    axios.get('/api/users/me',{
            headers: { Authorization : `Bearer ${sessionStorage.getItem("token")}`}
        }
    ).then(response => {
        
    })
    .catch(error => {
    sessionStorage.removeItem("token"),
    router.push("/login")
    })
};
createApp(App).use(router, axios).mount('#app')
