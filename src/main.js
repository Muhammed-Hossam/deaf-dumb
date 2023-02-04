import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


const app = createApp(App);
library.add(faArrowRightLong)
app.use(store);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app');
