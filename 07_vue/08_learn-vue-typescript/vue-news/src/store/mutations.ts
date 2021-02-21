import { NewsItem } from "@/api";
import { RootState } from "./state";

enum MutationTypes {
  SET_NEWS = "SET_NEWS"
}

const mutations = {
  // es6 computed property
  [MutationTypes.SET_NEWS](state: RootState, news: NewsItem[]) {
    state.news = news;
  }
};

// (주의) Mutation, Action은 vuex에서 기본적으로 제공하고 있는 type 이름이다.
type Mutations = typeof mutations;

export { MutationTypes, mutations, Mutations };

// export default {
//   SET_NEWS(state, news) {
//     state.news = news;
//   },
//   SET_ASK(state, ask) {
//     state.ask = ask;
//   },
//   SET_JOBS(state, jobs) {
//     state.jobs = jobs;
//   },
//   SET_USER(state, user) {
//     state.user = user;
//   },
//   SET_ITEM(state, item) {
//     state.item = item;
//   },
//   SET_LIST(state, list) {
//     state.list = list;
//   },
// }
