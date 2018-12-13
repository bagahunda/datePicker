import Vue from "vue";
import App from "./App.vue";
import ClickOutsideDirective from "./directives/ClickOutside";

Vue.directive("clickOutside", ClickOutsideDirective);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
