import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import axios from "axios";
import {useAuthStore} from "../stores/useAuthStore";
import Toast from "vue-toastification";
import 'vue-toastification/dist/index.css';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

const app = createApp(App)
app.use(Toast)
app.use(createPinia())

const store = useAuthStore()

/*window.Pusher = Pusher;
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'local',
    cluster: 'mt1',
    wsHost: '127.0.0.1',
    wsPort: 6001,
    forceTLS: false,
    disableStats:true,
    authEndpoint: "http://127.0.0.1:8000/api/broadcasting/auth",
    auth: {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token"),
        },
    },
});*/

store.getUser(localStorage.getItem("token")).then(()=>{
    app.use(router)
    app.mount('#app')
})
