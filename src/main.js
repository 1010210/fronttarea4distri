import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import './assets/css/normalize.css';
import './assets/css/skeleton.css';

const app = createApp(App);  
  
app.config.globalProperties.url = 'https://dapper-starship-1fb1ec.netlify.app/';

app.use(router).mount("#app");