import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import router from "./router";
import "@/styles/Global.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "swiper/swiper-bundle.css";
import "@/styles/SwiperStyles.css";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);  // Plugin einbinden

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount("#app");
