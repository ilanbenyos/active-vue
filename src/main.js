import Vue from "vue";
// import "./plugins/vuetify";
import "vuetify/dist/vuetify.min.css"; // Ensure you are using css-loader

import App from "./App.vue";
import router from "./router";
import store from "./store";
import plugins from "./plugins/index";

Vue.config.productionTip = false;

Vue.prototype.$loading = bool => {
  store.commit("setLoading", bool);
};

window.vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
