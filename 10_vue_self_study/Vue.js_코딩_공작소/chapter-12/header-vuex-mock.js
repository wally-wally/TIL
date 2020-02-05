describe('Header.vue', () => {
  let store;
  let getters;
  let mutations;
  beforeEach(() => {
    getters = {
      session: () => false
    }
    mutations = {
      SET_SESSION: () => {}
    }
    store = new Vuex.Store({
      getters,
      mutations
    })
})
