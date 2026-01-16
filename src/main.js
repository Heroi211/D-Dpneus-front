/*
 =========================================================
 * Vue Black Dashboard - v1.1.3
 =========================================================

 * Product Page: https://www.creative-tim.com/product/black-dashboard
 * Copyright 2024 Creative Tim (http://www.creative-tim.com)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from "vue";
import VueRouter from "vue-router";
import RouterPrefetch from "vue-router-prefetch";
import App from "./App";
// TIP: change to import router from "./router/starterRouter"; to start with a clean layout
import router from "./router/index";

import BlackDashboard from "./plugins/blackDashboard";
import i18n from "./i18n";
import "./registerServiceWorker";
import logger from "./utils/logger";

// Teste do logger na inicialização
logger.log("🚀 Aplicação iniciada - Logger funcionando!");
logger.debug("VUE_APP_DEBUG:", process.env.VUE_APP_DEBUG);
logger.debug("VUE_APP_ENVIRONMENT:", process.env.VUE_APP_ENVIRONMENT);

Vue.use(BlackDashboard);
Vue.use(VueRouter);
Vue.use(RouterPrefetch);
new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
