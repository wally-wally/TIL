import jwtDecode from 'jwt-decode'

const state = {
  token: null, // 처음에는 토큰이 없으므로 null이 기본값
  loading: false,
}

// getters는 데이터(state)를 변경하지 않음!
// 데이터를 원본 그대로 혹은 가공된 데이터를 사용한다.
const getters = { // 로그인 여부 체크와 같은 저장이 필요한 것들을 정의
  isLoggedIn: function(state) {
    return state.token ? true : false
  },
  requestHeader: function(state) {
    return {
      headers: {
        Authorization: 'JWT ' + state.token
      }
    }
  },
  userId: function(state) {
    return state.token ? jwtDecode(state.token).user_id : null
  }
}

// 상태(토큰)을 받아와서 state를 update
const mutations = {
  setToken: function(state, token) { // 위에서 정의한 state, django로 부터 받은 token
    state.token = token
  },
  setLoading: function(state, status) {
    state.loading = status
  }
}

// 비동기 로직(axios 로 django 서버에 로그인/로그아웃 요청)
// options : actions 에서 사용할 수 있도록 만든 객체, Vuex 에서 제공하는 action 함수에서 사용할 수 있는 option 들이 있는 객체
const actions = {
  // commit 은 첫 번째 인자로 mutations 에 정의한 함수를 받는다.
  // 두 번째 인자로 token을 받아서, mutations에 정의된 함수를 통해 state 를 변경한다.
  login: function(options, token) {
    options.commit('setToken', token)
  },
  // 로그아웃의 경우 추가로 받는 인자는 없고 token의 상태를 null로 변경한다.
  logout: function(options) { // logout은 token의 상태를 null로 만듬
    options.commit('setToken')
  },
  startLoading: function(options) {
    options.commit('setLoading', true)
  },
  endLoading: function(options) {
    options.commit('setLoading', false)
  },
}

export default { // 여기서 export default는 보통 최하단에 작성한다.
  state,
  mutations,
  actions,
  getters,
}