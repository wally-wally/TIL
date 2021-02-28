import Chart from "chart.js";
import { VueConstructor } from "vue/types/umd";

export default {
  install(Vue: VueConstructor) {
    Vue.prototype.$_Chart = Chart;
  }
};

// App.vue
// new this.$_Chart();
