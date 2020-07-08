import {Module, VuexModule, Mutation, Action} from 'vuex-module-decorators';

// namespac 속성은 Module Decorator 안에 작성하고, name 속성으로 namespace 이름을 지정할 수 있다.
@Module({namespaced: true, name: 'moduleA'})
export default class ModuleA extends VuexModule {
  // state
  data: string = 'moduleA';

  // mutations
  @Mutation
  setData(data: string) {
    this.data = data;
  }

  // actions (mutations와 같은 class 안에 있기 때문에 mutations의 함수명과 다르게 작성해야 한다.)
  @Action
  editData(data: string) {
    this.context.commit('setData', data);
  }

  // getters (class에서 property에 접근할 때 호출되는 get 함수가 getters가 된다.)
  // getters도 actions일 때와 마찬가지로 같은 class 안에 있기 때문에 이름이 겹치면 안 된다.
  get moduleAdata() {
    return this.data;
  }
}