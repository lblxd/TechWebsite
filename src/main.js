import Vue from "vue";
import App from "./App.vue";

import "./style.css";
Vue.config.productionTip = false;

import "./assets/iconfont/iconfont.css";
import "./assets/scss/style.scss";
import router from "./router";

import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
Vue.use(VueAwesomeSwiper /* { default global options } */);

import Card from "./components/Card.vue";
Vue.component("m-card", Card);

import ListCard from "./components/ListCard.vue";
Vue.component("m-list-card", ListCard);


import "./plugins/element.js";

import http from "./http";
Vue.prototype.$http = http;

Vue.mixin({
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL + "/upload";
    },
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ""}`,
      };
    },
  },
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
