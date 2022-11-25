import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
// import http from "./utils/http";
// import tracing from "web-tracing";
// import directives from "./directives";
import pv from "./plugins/pv";

import "./assets/main.scss";

const app = createApp(App);

app
  .use(router)
  .use(createPinia())
  //   .use(tracing, {
  //     requestUrl: "/operate/log/saveUserVisitLog",
  //     appName: "灵光",
  //     event: {
  //       core: true,
  //       unload: false,
  //     },
  //     pv: false,
  //   })
  //   .use(directives)
  .use(pv);

app.mount("#app");

// app.config.globalProperties.$http = http;
