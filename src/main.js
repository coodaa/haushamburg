import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import "@/styles/Global.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "swiper/swiper-bundle.css";
import "@/styles/SwiperStyles.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
