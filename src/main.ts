import {createApp} from 'vue'
import './common/style.pcss'
import App from './App.vue'
import router from "./common/router";
import {createPinia} from "pinia";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

// redirect
const __origin = location.origin;
const __server_list = ['https://anissia.net', 'https://test.anissia.net', 'http://localhost', 'http://192.', 'http://172.', 'http://10.'];
if (__server_list.findIndex(e => __origin.startsWith(e)) == -1) {
    location.href = 'https://anissia.net';
    throw 'invalid origin';
}

// run
createApp(App)
    .use(router)
    .use(createPinia())
    .use(Toast, {
        position: "top-center",
        timeout: 1000,
        hideProgressBar: true,
        closeButton: false,
        icon: true
    })
    .mount('#app');
