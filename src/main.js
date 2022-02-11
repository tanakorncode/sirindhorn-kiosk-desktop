// import "./registerServiceWorker";

import App from "./App.vue";
import SocketIO from "socket.io-client";
import Vue from "vue";
import VueSocketIO from "vue-socket.io";
import _ from "lodash";
import axios from "./axios";
import { i18n } from "./i18n";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.http = Vue.prototype.$http = axios;

Vue.use(
  new VueSocketIO({
    debug: process.env.NODE_ENV === "development",
    connection: SocketIO(process.env.VUE_APP_SOCKET_URL || "http://sirindhorn.localhost", {
      transports: ["polling", "websocket"],
      path: "/node/socket.io",
    }),
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_",
    },
    // options: { transports: ["polling", "websocket"], path: "/node/socket.io" }, //Optional options
  })
);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
