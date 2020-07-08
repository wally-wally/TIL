# :computer: Vue with Typescript #5 - `vuex` 오픈소스

<br>

## 1. `vuex-module-decorator` - `04_vue-ts-vuex-module-decorator`

- 기존의 `vuex`의 `store`는 객체 형태로 구성되어 있었다.
- `vue-property-decorator` 처럼 `vuex`의 `module`에 `decorator`를 지원하는 라이브러리가 있는데 바로 `vuex-module-decorator`이다.
- `vuex-module-decorator` 라이브러리를 이용해서 컴포넌트 형태의 `class` 스타일로 `vuex`를 구성하는 방법을 알아보자.
- `ModuleA.store.ts`

```typescript
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
```

- 참고로 `vuex-module-decorator` 라이브러리를 반드시 사용해야 하는 것은 아니다. 본인의 코드 작성 스타일에 따라 또는 함께 협업하는 팀 프로젝트에서 `vuex`를 구성할 때 결정한 방식에 따라서 `vuex`를 구성하면 된다.

<br>

## 2. `vuex-class` - `05_vue-ts-vuex-class`

- `vuex`의 `store`를 컴포넌트에서 갖다 쓰기 편하게 해주는 `vuex-class` 라이브러리를 살펴보자.
- `vuex-class`에서 `State`, `Mutation`, `Action`, `Getter`를 `import` 한 후 데코레이터와 `readonly` 속성을 붙여서 사용하면 된다.
- `components/Count.vue`

```vue
<template>
  <div>
    <p>before</p>
    {{ $store.getters.getterCount }} / {{ $store.state.count }}
    <hr>
    <p>after</p>
    {{ getterCount }} / {{ count }}
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter, State } from 'vuex-class';

@Component
export default class Count extends Vue {
  @Getter readonly getterCount!: number; // 해당 변수는 변경되면 안 되기 때문에 readonly를 붙인다.
  @State readonly count!: number;
}
</script>
```

- `App.vue`

```vue
<template>
  <div id="app">
    <Count></Count>
    <button @click="increase">증가</button>
    <button @click="decrease">감소</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Mutation } from 'vuex-class';
import Count from '@/components/Count.vue';

@Component({
  components: {
    Count,
  },
})
export default class App extends Vue {
  // after
  // 이 컴포넌트 내에서 store의 actions와 mutations에 작성한 함수에 바로 접근할 수 있다.
  @Action readonly increase;
  @Action readonly decrease;
  @Mutation readonly setCount;

  // before
  // increase() {
  //   this.$store.dispatch('increase');
  // }
  // decrease() {
  //   this.$store.dispatch('decrease');
  // }
}
</script>
```

