import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from "@fortawesome/free-regular-svg-icons";
import Toast from 'vue-toastification';
import "vue-toastification/dist/index.css";


// Import fontawesome icons
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const app = createApp(App);
library.add(
  fab,
  far,
  faArrowRightLong,
  faPhoneVolume,
  faEnvelopeCircleCheck,
  faLocationDot,
  faUser,
  faCircleXmark,
  faCircleCheck,
  faCheckDouble,
  faXmark
);
app.use(store);
app.use(router);
app.use(Toast)
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
