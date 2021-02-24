import { CommitOptions, DispatchOptions, Store } from "vuex";
import { Actions } from "./actions";
import { Getters } from "./getters";
import { Mutations } from "./mutations";
import { RootState } from "./state";

type MyMutations = {
  // <Mutations의 key, Payload의 type>
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
};

type MyActions = {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};

type MyGetters = {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};

// 기존 vuex에서 제공하는 commit을 사용하지 않고
// 내가 정의한 MyMutations 타입을 사용하겠다는 의미
export type MyStore = Omit<
  Store<RootState>,
  "getters" | "commit" | "dispatch"
> &
  MyMutations &
  MyActions &
  MyGetters;

// node_modules/vuex/types/vue.d.ts에서 Store<RootState>를 MyStore로 바꾸면
// vue 컴포넌트 파일에서 this.$store.commit()을 할 때 올바르게 타입 추론을 할 수 있게 된다.
