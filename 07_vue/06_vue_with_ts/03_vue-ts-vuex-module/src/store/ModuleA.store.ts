import { Module } from 'vuex';

import {RootState} from '@/store/store';

interface ModuleA {
  data: string;
}

const module: Module<ModuleA, RootState> = {
  namespaced: true,
  state: {
    data: 'ModuleA',
  },
  mutations: {
    setData(state, data: string) {
      state.data = data;
    },
  },
  actions: {
    setRootData({commit}, data: string) {
      commit('setData', data);
    },
  },
  getters: {
    data: (state) => state.data,
  },
};

export default module;
