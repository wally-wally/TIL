# :computer: Vue with Typescript #4 - `vuex`

<br>

## 1. Interface & Generic

### (1) Interface

- 어떤 객체나 함수에 대해 어떻게 작성할지 선언하는 것이다.

```typescript
interface memberConfig {
  name: string; // 필수 요소
  age: number; // 필수 요소
  zipCode?: string; // 선택 요소('?'를 붙임)
}

function addMember(config: memberConfig): {name: string, age: number, zipCode: string} {
  let newMember = {name: 'noName', age: 0, zipCode: 'noZipCode'}
  if (config.name) {
    newMember.name = config.name;
  }
  if (config.age) {
    newMember.age = config.age;
  }
  if (config.zipCode) {
    newMember.zipCode = config.zipCode;
  }
  return newMember
}

let registeredMember = addMember({name: 'wally', age: 27});
console.log(registeredMember);
```

<br>

### (2) Generic

- 클래스나 함수에서 범용적으로 사용할 변수의 타입을 결정하는 요소이다.

```typescript
function identity<T>(arg: T): T {
  return arg;
}
```

- 만약 `identity`의 함수에 `<T>`에 `number` 타입이 들어오는 경우 아래 코드와 같은 결과를 얻을 수 있다.

```typescript
function identity(arg: number): number {
  return arg;
}
```

<br>

---

:heavy_check_mark: <b>Typescript로 작성한 Vuex 기본 구조</b>

```typescript
import Vue from 'vue';
import Vuex, {StoreOptions} from 'vuex';

Vue.use(Vuex);

interface State {
  // 상태 값에 대한 인터페이스
}

const Store: StoreOptions<State> = {
  state: {
    // 상태 값
  },
  mutations: {
    // 상태 변이 함수
  },
  actions: {
    // 상태 변이를 위한 로직 함수
  },
  getters: {
    // 상태 값에 따라 계산된 값을 반환하는 함수 (ex. 아이템 리스트를 필터링)
  }
}

export default new Vuex.Store(Store);
```

---

<br>

## 2. Interface로 Vuex 구현 - `02_vue-ts-vuex`

- `store/index.ts`

```typescript
import Vue from 'vue';
import Vuex, { StoreOptions, ActionContext } from 'vuex';

Vue.use(Vuex);

interface State {
  count: number;
}

const store: StoreOptions<State> = {
  state: {
    count: 0,
  },
  mutations: {
    setCount(state: State, count: number) {
      state.count = count;
    },
  },
  actions: {
    increase({state, commit}: ActionContext<State, State>) {
      commit('setCount', state.count + 1);
    },
    decrease({state, commit}: ActionContext<State, State>) {
      commit('setCount', state.count - 1);
    },
  },
  getters: {
    count: (state: State) => state.count,
  },
};

export default new Vuex.Store(store);
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
import Count from '@/components/Count.vue';

@Component({
  components: {
    Count,
  },
})
export default class App extends Vue {
  increase() {
    this.$store.dispatch('increase');
  }
  decrease() {
    this.$store.dispatch('decrease');
  }
}
</script>
```

- `components/Count.vue`
  - `$store.getters.count` 대신에 `$store.state.count`도 가능하다.
  - 현재 `getters`의 `count` 값은 `state`의 `count`와 동일한 값을 출력하기 때문이다.

```vue
<template>
  <div>
    {{ $store.getters.count }}
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Count extends Vue {}
</script>
```

<br>

## 3. Vuex Module Interface로 Store 분리 - `03_vue-ts-vuex-module`

- 지금까지는 vuex의 store가 하나인 경우만 살펴보았다.
- 하지만 프로젝트의 규모가 커지면 기능이 다양해지기 때문에 기능별로 모듈을 나눠서 store를 관리하는 것이 훨씬 좋다.
- 그래서 module로 vuex store를 분리해서 관리하는 방법을 알아보자.
- `store/store.ts`
  - `mutations`에서 `state`의 type은 굳이 작성하지 않아도 된다.(제네릭으로 넣은 state가 지정되어 있기 때문)
  - `actions`의 첫 번째 인자인 `{commit}`의 type인 `ActionContext`은 `StoreOptions`에 이미 정의되어 있으므로 type을 지정하지 않아도 된다.
  - `mutations`와 `actions`의 두 번째 인자는 사용자가 넣는 값이므로 type을 지정해야 한다.

```typescript
import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import ModuleA from './ModuleA.store';
import ModuleB from './ModuleB.store';

Vue.use(Vuex);

export interface RootState {
  data: string;
}

const store: StoreOptions<RootState> = {
  modules: {
    ModuleA,
    ModuleB,
  },
  state: {
    data: 'root',
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

export default new Vuex.Store(store);
```

- `ModuleA.store.ts`
  - `store`의 namespace를 살펴보기 위해 `ModuleA`의 `namespaced` 옵션을 `true`로 설정했다.

```typescript
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

```

- `ModuleB.store.ts`
  - `ModuleA.store.ts`에서 `namespaced` 옵션 부분만 제외하고 나머지 동일

- `App.vue`

```vue
<template>
  <div id="app">
    {{ $store.state }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  created() {
    console.log(this.$store);
  }
}
</script>
```

- `console` 창으로 `this.$store`를 출력해보자.

![001](https://user-images.githubusercontent.com/52685250/86921845-c0947080-c166-11ea-8f5c-6ee36feed199.JPG)

- `console`창에 출력된 결과를 보면 `_actions`와 `_getters`에 namespace로 설정된 `ModuleA`는 별도로 설정되어 있고 `ModuleB`와 `Root` 부분은 하나로 합쳐져 있음을 볼 수 있다.
- `created()` 훅에 `this.$store.dispatch('setRootData', 'test');` 코드를 추가해서 `store`의 `state`가 어떻게 변화하는지 살펴보자.

![002](https://user-images.githubusercontent.com/52685250/86921852-c25e3400-c166-11ea-95ad-05e13c9fe8cb.JPG)

- 위 사진과 같이 `RootState`의 `data`와 `ModuleB`의 `data`가 동시에 `test` string으로 바뀐 것을 볼 수 있다. 즉, namespace를 설정한 `ModuleA`는 영향을 받지 않는 것이다.
- `ModuleA`의 `data` 값을 바꾸기 위해서는 `this.$store.dispatch('ModuleA/setRootData', 'newTest');`와 같이 작성하면 된다.

![003](https://user-images.githubusercontent.com/52685250/86921853-c2f6ca80-c166-11ea-8925-23d86f5fc407.JPG)

- 참고로 `console` 창에 출력되는 `getter` 오류는 `ModuleB`와 `Root`부분의 `getters`에 작성된 key 중 `data`라고 중복되게 작성되서 나오는 오류이다.
- 추후 프로젝트를 진행할 때 `duplicate key` 오류가 나지 않게 하려면 이름을 다르게 작성하던가 `namespaced` 옵션을 `true`로 설정하면 해결할 수 있다.