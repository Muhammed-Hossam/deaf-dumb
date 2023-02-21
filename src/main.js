import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";


// Import fontawesome icons
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const app = createApp(App);
library.add(
  faArrowRightLong,
  faPhoneVolume,
  faEnvelopeCircleCheck,
  faLocationDot
);
app.use(store);
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
