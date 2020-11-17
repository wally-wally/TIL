import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

// application 처음 구동시 아래 코드 동작
const { token } = localStorage
store.commit('LOGIN', token)

export default store