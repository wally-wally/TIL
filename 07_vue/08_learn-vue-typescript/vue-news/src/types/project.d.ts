// Vue.js 2.x 버전에서는 node_modules/vuex/types/vue.d.ts 파일을 삭제해줘야 아래 타입이 정상 추론됨
// Vue.js 3.x 버전에서는 이렇게 하지 않아도 올바르게 타입 추론이 되도록 개선됨

// Module Augmentation(타입 확장)
import Vue from "vue";
import { MyStore } from "@/store/types";

declare module "vue/types/vue" {
  interface Vue {
    $store: MyStore;
  }
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    store?: MyStore;
  }
}
