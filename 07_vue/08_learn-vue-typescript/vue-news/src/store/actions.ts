import { fetchNews } from "@/api";
import { ActionContext } from "vuex";
import { Mutations, MutationTypes } from "./mutations";
import { RootState } from "./state";

enum ActionTypes {
  FETCH_NEWS = "FETCH_NEWS"
}

// 모듈화된 vuex에서 action의 context 타입 정의할 때
// => ActionContext<모듈화된 현재 state, root State>
type MyActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<RootState, RootState>, "commit">;

const actions = {
  async [ActionTypes.FETCH_NEWS](context: MyActionContext, payload?: any) {
    const { data } = await fetchNews();
    context.commit(MutationTypes.SET_NEWS, data);
    return data;
  }
};

type Actions = typeof actions;

export { ActionTypes, actions, Actions };

// import {
//   fetchNews,
//   fetchAsk,
//   fetchJobs,
//   fetchUser,
//   fetchItem,
//   fetchList
// } from "../api/index";

// export default {
//   FETCH_NEWS({ commit }) {
//     return fetchNews().then(response => commit("SET_NEWS", response.data));
//   },
//   FETCH_ASK({ commit }) {
//     return fetchAsk().then(response => commit("SET_ASK", response.data));
//   },
//   FETCH_JOBS({ commit }) {
//     return fetchJobs().then(response => commit("SET_JOBS", response.data));
//   },
//   FETCH_USER({ commit }, userId) {
//     return fetchUser(userId).then(res => commit("SET_USER", res.data));
//   },
//   FETCH_ITEM({ commit }, itemId) {
//     return fetchItem(itemId).then(res => commit("SET_ITEM", res.data));
//   },
//   // hoc
//   FETCH_LIST({ commit }, listType) {
//     return fetchList(listType).then(res => commit("SET_LIST", res.data));
//   }
// };
