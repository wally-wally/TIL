import Vue from "vue";
import App from "./App.vue";
import ChartPlugin from "./plugins/ChartPlugin";

// Vue.prototype.$_Chart = Chart; 와 같은 의미
Vue.use(ChartPlugin);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
