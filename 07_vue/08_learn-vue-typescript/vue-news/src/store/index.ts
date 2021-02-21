import Vue from "vue";
import Vuex, { mapActions, StoreOptions } from "vuex";
import { RootState, state } from "./state";
import { mutations } from "./mutations";
// import getters from './getters.js';
// import mutations from './mutations.js';
// import actions from './actions.js';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: state,
  mutations: mutations,
  actions: actions
};

export default new Vuex.Store(store);

// export default new Vuex.Store({
//   strict: process.env.NODE_ENV !== 'production',
//   state: {
//     news: [],
//     ask: [],
//     jobs: [],
//     user: {},
//     item: {},
//     list: [],
//   },
//   getters,
//   mutations,
//   actions,
// })
