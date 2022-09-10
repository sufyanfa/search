import { createApp } from 'vue'
import './style.css'
import router from './route'
import axios from 'axios'
import App from './App.vue'


axios.defaults.baseURL = 'https://universitygroups.herokuapp.com/';

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
