import {
  fetchNewsList,
  fetchJobsList,
  fetchAskList,
  fetchList,
  fetchUserInfo,
  fetchCommentItem
} from '../api/index.js'

export default {
  // Promise
  // FETCH_NEWS({ commit }) {
  //   return fetchNewsList()
  //     .then(response => {
  //       commit('SET_NEWS', response.data)
  //       return response
  //     })
  //     .catch(error => console.log(error))
  // },


  // async
  async FETCH_NEWS(context) {
    const response = await fetchNewsList()
    context.commit('SET_NEWS', response.data)
    return response // async도 마찬가지로 결과값을 return 해줘야 이 함수를 진행하고나서 다음 처리들을 순서대로 할 수 있게 된다.
    // 이때 어느 것을 return 해도 Promise 객체가 return 된다.
  },


  // FETCH_JOBS({ commit }) {
  //   return fetchJobsList()
  //     .then(({ data }) => commit('SET_JOBS', data))
  //     .catch(error => console.log(error))
  // },

  async FETCH_JOBS(context) {
    try {
      const response = await fetchJobsList()
      context.commit('SET_JOBS', response.data)
      return response
    } catch (error) {
      console.log(error)
    }
  },


  // FETCH_ASK({ commit }) {
  //   return fetchAskList()
  //     .then(({ data }) => commit('SET_ASK', data))
  //     .catch(error => console.log(error))
  // },

  async FETCH_ASK({ commit }) {
    const response = await fetchAskList()
    commit('SET_ASK', response.data)
    return response
  },

  // FETCH_USER({ commit }, name) {
  //   return fetchUserInfo(name)
  //     .then(({ data }) => commit('SET_USER', data))
  //     .catch(error => console.log(error))
  // },

  async FETCH_USER({ commit }) {
    const response = await fetchUserInfo()
    commit('SET_USER', response.data)
    return response
  },


  // FETCH_ITEM({ commit }, id) {
  //   return fetchCommentItem(id)
  //     .then(({ data }) => commit('SET_ITEM', data))
  //     .catch(error => console.log(error))
  // },

  async FETCH_ITEM({ commit }) {
    const response = await fetchCommentItem(id)
    commit('SET_ITEM', response.data)
    return response
  },
  
  // #2
  async FETCH_LIST({ commit }, pageName) {
    // #3
    const response = await fetchList(pageName)
    console.log(4)
    commit('SET_LIST', response.data)
    return response
  }
}