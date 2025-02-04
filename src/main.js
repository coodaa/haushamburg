import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import "@/styles/Global.css";
import "@fortawesome/fontawesome-free/css/all.css"; // Font Awesome importieren
import 'swiper/swiper-bundle.css'; // Swiper-CSS global importieren
import '@/styles/SwiperStyles.css'; // Swiper-spezifische Styles importieren

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
