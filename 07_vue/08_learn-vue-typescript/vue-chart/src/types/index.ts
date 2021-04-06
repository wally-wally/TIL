import { VueConstructor } from "vue";

export type MyVue<T> = VueConstructor<Vue & T>;
export type MyVueRefs<T> = VueConstructor<Vue & { $refs: T }>;
