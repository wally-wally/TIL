# :computer: Vue with Typescript #2

<br>

## 1. `@Prop`

- 컴포넌트에서 가장 기본적으로 익혀야 하고 중요한 관계가 `부모-자식` 관계이다.
- 부모 컴포넌트에서 자식 컴포넌트로 또는 반대 방향으로 데이터를 주고 받아야 하는데 Vue.js에서는 각각 방향을 `props`, `event`으로 정의하고 있다.

<img src="https://user-images.githubusercontent.com/52685250/82527927-96fd9680-9b72-11ea-9418-92c66b9fe87f.png" width="500">

- 위 사진은 Vue.js 공식 문서<a href="https://kr.vuejs.org/v2/guide/components.html#%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EC%9E%91%EC%84%B1" target="_blank">(바로 이동)</a>에 있는 사진이다.
- 부모 컴포넌트에서 자식 컴포넌트로 `props`를 통해 데이터를 내려 보내고, 자식 컴포넌트에서 부모 컴포넌트로 데이터를 보낼 때 `emit`이라는 `event`를 발생시킨다.

- 그렇다면 typescript 언어를 적용해서 props로 데이터를 어떻게 주고 받는지 살펴보자.
- vue에서 typescript를 사용해서 부모 컴포넌트에서 자식 컴포넌트로 데이터를 내려 보내기 위해서는 자식 컴포넌트의 `script` 단에서 `@Prop` 데코레이터를 사용해야 한다.

> `views/Home.vue` (부모 컴포넌트)
>
> - Javascript로 작성한 기존 방식과 같이 `template` 단에서는 `v-bind`(`:`)를 이용해서 데이터를 선언하고 `script` 단에서는 class 안에 변수를 선언해주면 된다.
>
> ```vue
> <template>
>   <div class="home">
>     <img alt="Vue logo" src="../assets/logo.png">
>     <Message></Message>
>     <hr>
>     <Children :parentMessage="message"></Children>
>   </div>
> </template>
> 
> <script lang="ts">
> import { Component, Vue } from 'vue-property-decorator';
> import Message from '@/components/Message.vue';
> import Children from '@/components/Children.vue';
> 
> @Component({
>   components: {
>     Message,
>     Children,
>   },
> })
> export default class Home extends Vue {
>   message: string = 'hello world';
> }
> </script>
> ```

> `src/components/Children.vue` (자식 컴포넌트)
>
> - 자식 컴포넌트에서는 props로 내려받은 데이터 변수 앞에 `@Prop()` 데코레이터를 붙여주면 된다.
>
> ```vue
> <template>
>   <div>
>     {{ parentMessage }}
>   </div>
> </template>
> 
> <script lang="ts">
> import { Component, Vue, Prop } from 'vue-property-decorator';
> 
> @Component
> export default class Children extends Vue {
>   @Prop() parentMessage: string;
> }
> </script>
> ```

- 하지만 이렇게 저장하고 서버를 돌리면 에러가 발생한다. 코드 창에서도 `parentMessage`에 빨간 줄이 표시됨을 볼 수 있다.

![캡처00](https://user-images.githubusercontent.com/52685250/82535410-c49e0c00-9b81-11ea-9e0e-697fdbecab32.JPG)

![캡처02](https://user-images.githubusercontent.com/52685250/82535398-c10a8500-9b81-11ea-8ee1-2c631e00f177.JPG)

- 위와 같은 오류가 발생하는 이유는 `tsconfig.json`에서 설정한 `strict` 값을 `true`로 해서 생긴 문제이다.
- `strict` 모드를 `true`로 해서 엄격 검사 모드로 설정했는데 이는 `undefined`를 포함하지 않는 class 속성은 <b>반드시 초기화 되어야 한다</b>는 규칙을 포함하고 있다.
- 그래서 `parentMessage` 값을 초기화 해버리면 부모 컴포넌트에서 자식 컴포넌트로 데이터를 보내도 자식 컴포넌트 쪽에서 설정한 초기화 값으로 덮어씌워져 버리기 때문에 원하지 않는 결과가 나타난다.
- 이와 같은 에러를 해결하려면 아래 코드와 같이 `?`를 붙이면 된다.

```vue
<script>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Children extends Vue {
  @Prop() parentMessage?: string;
}
</script>
```

- `?`는 해당 변수를 optional 하게 설정할 수 있는 의미이다. 즉, 이 값을 사용해도 되고 사용하지 않아도 된다.

<br>

## 2. `@Watch`

- `watch` 옵션은 Vue 인스턴스의 data 변경을 관찰하고 이에 반응하는 로직을 작성할 수 있는 옵션이다.
- 특정 데이터가 변경되었을 때 정의한 watcher 함수를 실행하게 되는데 typescript 언어로 `watch`를 사용하기 위해 `@Watch` 데코레이터를 사용한다.

> `views/Home.vue` (부모 컴포넌트)
>
> - 우선 부모 컴포넌트에서 버튼을 눌렀을 때 자식 컴포넌트로 props 되는 데이터를 바꾸는 `changeMessage` 함수를 작성해보자.
>
> ```vue
> <template>
>   <div class="home">
>     <img alt="Vue logo" src="../assets/logo.png">
>     <Message></Message>
>     <hr>
>     <Children :parentMessage="message"></Children>
>     <button @click="changeMessage">메세지를 바꿔줄게요.</button>
>   </div>
> </template>
> 
> <script lang="ts">
> import { Component, Vue } from 'vue-property-decorator';
> import Message from '@/components/Message.vue';
> import Children from '@/components/Children.vue';
> 
> @Component({
>   components: {
>     Message,
>     Children,
>   },
> })
> export default class Home extends Vue {
>   message: string = 'hello world';
> 
>   changeMessage() {
>     this.message = 'change';
>   }
> }
> </script>
> ```

> `src/components/Children.vue` (자식 컴포넌트)
>
> - 아래 코드에서 보는 것과 같이 `@Watch` 데코레이터의 파라미터로 변함을 감지할 변수명을 작성해준다.
> - 그리고 `update` 라는 이름을 가진 handler 함수를 작성하는데 이 함수의 파라미터로 두 개가 온다.
>   - 첫 번째 파라미터(여기서는 `value`) : 변경된 값
>   - 두 번째 파라미터(여기서는 `oldValue`) : 변경 이전 값
> - handler 함수에 해당 변수가 변했을 때 실행할 로직을 작성하면 된다.
>   - 여기서는 `alertMessage` 값을 다른 문자열로 변경하는 로직 수행
>
> ```vue
> <template>
>   <div>
>     <p>{{ alertMessage }}</p>
>     {{ parentMessage }}
>   </div>
> </template>
> 
> <script lang="ts">
> import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
> 
> @Component
> export default class Children extends Vue {
>   @Prop() parentMessage?: string;
> 
>   alertMessage: string = '';
> 
>   @Watch('parentMessage')
>   update(value: string, oldValue: string) {
>     this.alertMessage = '메세지를 업데이트 했습니다.';
>   }
> }
> </script>
> ```

- 추가로 `@Watch` 데코레이터에 아래 코드 처럼 두 번째 파라미터로 `immediate`와 `deep` 값을 설정할 수 있다.
  - `immediate` : `true`로 설정하면 이 속성의 현재 값으로 handler를 즉시 호출하겠다는 의미
  - `deep` : `true`로 설정하면 객체의 내부 속성까지 바뀌는 것을 감지하겠다는 의미

```typescript
@Watch('parentMessage', {immediate: true, deep: true})
```

---

:heavy_check_mark: <b>`@Component`, `@Prop`, `@Watch`가 적용된 지금까지 프로젝트 상황</b>

![캡처03](https://user-images.githubusercontent.com/52685250/82537435-fc5a8300-9b84-11ea-95cc-c706c0715245.JPG)

---

<br>

## 3. `@Emit`

- 자식 컴포넌트에서 부모 컴포넌트로 데이터를 보낼 때 `emit` 이라는 `event`를 발생시킨다.
- vue project에 typescript 언어 사용시 `emit`은 `@Emit` 데코레이터를 사용해서 코드를 작성한다.

> `src/components/Children.vue` (자식 컴포넌트)
>
> - 자식 컴포넌트에서 숫자를 증가시키는 버튼을 클릭했을 때 증가된 값을 부모 컴포넌트로 전달하는 것을 만들어보자.
> - `@Emit` 데코레이터의 파라미터로 부모 컴포넌트에서 발생할 이벤트 이름을 작성한다.
> - 아래와 같은 경우 버튼을 클릭하면 `addCounter` 함수가 실행되고 return 값으로 설정한 1 증가된 `childNum` 데이터로 부모 컴포넌트에 넘어간다.
>
> ```vue
> <template>
>   <div>
>     <p>{{ alertMessage }}</p>
>     {{ parentMessage }}
>     <button @click=addCounter>자식에서 숫자 1 증가</button>
>   </div>
> </template>
> 
> <script lang="ts">
> import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
> 
> @Component
> export default class Children extends Vue {
>   @Prop() parentMessage?: string;
> 
>   alertMessage: string = '';
> 
>   childNum: number = 0;
> 
>   @Watch('parentMessage')
>   update(value: string, oldValue: string) {
>     this.alertMessage = '메세지를 업데이트 했습니다.';
>   }
> 
>   @Emit('addCounter')
>   addCounter() {
>     return ++this.childNum;
>   }
> }
> </script>
> ```

> `views/Home.vue` (부모 컴포넌트)
>
> - `@addCounter="addCounter"` 부분에서 왼쪽의 `addCounter`가 자식 컴포넌트의 `@Emit` 의 파라미터에 작성한 이벤트 이름이고 자식 컴포넌트에서 버튼을 눌러서 해당 이벤트가 부모 컴포넌트에서 실행되기 때문에 오른쪽의 `addCounter` 함수가 실행되게 된다.
> - `script` 단에 있는 `addCounter` 함수를 보면 이 함수의 인자로 `childNum`이 있는데 이는 자식 컴포넌트에서 return 값으로 부모 쪽으로 올려보낸 데이터이다.
> - 이 데이터를 부모 컴포넌트의 `parentNum`에 할당해서 `template` 단에서 보여주면 된다.
> - 자식 컴포넌트에서 버튼을 누를 때마다 부모 컴포넌트의 `parentNum`이 1씩 증가되는 것을 볼 수 있다.
>
> ```vue
> <template>
>   <div class="home">
>     <img alt="Vue logo" src="../assets/logo.png">
>     <Message></Message>
>     <hr>
>     <Children :parentMessage="message" @addCounter="addCounter"></Children>
>     <button @click="changeMessage">메세지를 바꿔줄게요.</button>
>     <p>@Emit으로 부모 컴포넌트로 보낸 증가시킨 숫자 : {{ parentNum }}</p>
>   </div>
> </template>
> 
> <script lang="ts">
> import { Component, Vue } from 'vue-property-decorator';
> import Message from '@/components/Message.vue';
> import Children from '@/components/Children.vue';
> 
> @Component({
>   components: {
>     Message,
>     Children,
>   },
> })
> export default class Home extends Vue {
>   message: string = 'hello world';
> 
>   parentNum: number = 0;
> 
>   changeMessage() {
>     this.message = 'change';
>   }
> 
>   addCounter(childNum: number) {
>     this.parentNum = childNum;
>   }
> }
> </script>
> ```

---

:heavy_check_mark: <b>지금까지 진행 상황</b>

![캡처04](https://user-images.githubusercontent.com/52685250/82538657-07aeae00-9b87-11ea-983f-4d834bc18dde.JPG)

---

<br>

## 4. `@Provide`, `@Inject`

---

:warning: <b>`provide`, `inject`란?</b>  

- `provide`와 `inject`는 vue.js에서 잘 쓰이지 않는 옵션 중에 하나이다.
- 왜냐하면 부모와 자식 간에 데이터를 주고 받는 `props`와 `emit`을 더 많이 사용하고 있기 때문이다.
- (`provide`, `inject`)와 (`props`, `emit`) 이 두 쌍의 가장 큰 차이점은 몇 단계의 컴포넌트 레벨을 거쳐서 데이터를 주고 받을 수 있는지에 따라 다르다.
  - (`props`, `emit`) : 바로 상위에 있는 부모 또는 바로 하위에 있는 자식하고만 데이터를 주고 받을 수 있다.
  - (`provide`, `inject`) : 부모 컴포넌트에서 자식 컴포넌트로 데이터를 보낼 때만 사용되고 컴포넌트의 레벨 깊이에 관계없이 모든 자식 컴포넌트에 데이터를 보낼 수 있다는 특징이 있다.

- 글로만 설명하면 이해하기 어려울 수 있기 때문에 도식화해서 비교하면 아래 사진과 같다.

![props_emit_provide_inject](https://user-images.githubusercontent.com/52685250/82543004-e69d8b80-9b8d-11ea-8d9f-9a1d1bfdd01e.png)

- 그리고 vue.js 공식 문서에서도 아래와 같이 일반적인 상황에서도는 가급적 사용하지 말라고 권고하고 있다. <a href="https://kr.vuejs.org/v2/api/index.html#provide-inject" target="_blank">(공식 문서)</a>

![캡처05](https://user-images.githubusercontent.com/52685250/82543237-2cf2ea80-9b8e-11ea-8543-ac792234c9c3.JPG)

---

- `provide`와 `inject`에 대해 살펴보았고 Typescript 언어를 사용해서 vue project 개발시 해당 옵션을 어떻게 사용하는지 살펴보자.
- 우선 이 옵션들도 `@Provide`, `@Inject` 데코레이터를 사용한다.

> `src/components/Children.vue` (자식 컴포넌트)
>
> - 자식 컴포넌트에서 provide로 내린 데이터를 inject로 받는 코드를 작성해보자.
>
> - `@Inject() readonly injectMessage!: string;`
>
>   - Inject에서 선언된 값은 부모에서 받아서 쓰는 것이기 때문에 초기화를 시켜주면 안 된다.
>   - Property Decorator는 초기화를 하지 않으면 lint 오류가 발생하는 상황을 겪게 된다.
>   - 그래서 이를 해결하기 위해 `?`를 붙였는데 다른 방법으로 `!`를 붙일 수 있다.
>
>   - `!`를 붙인 이유는 이 값을 초기화 시켜주지 않은 것이 의도된 것이라고 인식하기 위해서이다.
>   - 또한 이 값은 부모에서 내려 받아서 변경되면 안 되는 값이기 때문에 변수 앞에 `readonly` 제한자를 붙여주면 변경할 수 없고 읽어들일 수만 있는 변수로 설정된다.
>
> ```vue
> <template>
>   <div>
>     <p>{{ alertMessage }}</p>
>     {{ parentMessage }}
>     <button @click=addCounter>자식에서 숫자 1 증가</button>
>     <p>부모 컴포넌트에서 provide로 보낸 데이터 : {{ injectMessage }}</p>
>   </div>
> </template>
> 
> <script lang="ts">
> import { Component, Vue, Prop, Watch, Emit, Inject } from 'vue-property-decorator';
> 
> @Component
> export default class Children extends Vue {
>   @Prop() parentMessage?: string;
> 
>   alertMessage: string = '';
> 
>   childNum: number = 0;
> 
>   @Inject() readonly injectMessage!: string;
> 
>   @Watch('parentMessage')
>   update(value: string, oldValue: string) {
>     this.alertMessage = '메세지를 업데이트 했습니다.';
>   }
> 
>   @Emit('addCounter')
>   addCounter() {
>     return ++this.childNum;
>   }
> }
> </script>
> ```

> `views/Home.vue` (부모 컴포넌트)
>
> - `@Provide` 데코레이터를 이용해서 자식으로 보낼 데이터를 선언해보자.
> - 자식 컴포넌트로 보내서 사용되는 속성(변수명)이 부모 컴포넌트와 자식 컴포넌트에서 동일한 경우 데코레이터의 파라미터를 작성하지 않아도 된다.
> - 반면 다른 경우 데코레이터의 파라미터에 자식 컴포넌트에서 `@Inject`로 받아서 사용할 변수명을 작성하면 된다.
>
> ```vue
> <template>
>   <div class="home">
>     <img alt="Vue logo" src="../assets/logo.png">
>     <Message></Message>
>     <hr>
>     <Children :parentMessage="message" @addCounter="addCounter"></Children>
>     <button @click="changeMessage">메세지를 바꿔줄게요.</button>
>     <p>@Emit으로 부모 컴포넌트로 보낸 증가시킨 숫자 : {{ parentNum }}</p>
>   </div>
> </template>
> 
> <script lang="ts">
> import { Component, Vue, Provide } from 'vue-property-decorator';
> import Message from '@/components/Message.vue';
> import Children from '@/components/Children.vue';
> 
> @Component({
>   components: {
>     Message,
>     Children,
>   },
> })
> export default class Home extends Vue {
>   message: string = 'hello world';
> 
>   parentNum: number = 0;
> 
>   // 보낸 속성(변수명)이 부모와 자식 컴포넌트에서 동일한 경우
>   // @Provide() injectMessage: string = 'provide & inject';
>   // 보낸 속성(변수명)이 부모와 자식 컴포넌트가 서로 다른 경우
>   @Provide('injectMessage') msg: string = 'provide & inject';
> 
>   changeMessage() {
>     this.message = 'change';
>   }
> 
>   addCounter(childNum: number) {
>     this.parentNum = childNum;
>   }
> }
> </script>
> ```

---

:heavy_check_mark: <b>지금까지 진행 상황</b>

- 아래 사진과 같이 `@Provide`, `@Inject`를 통해서 `Children.vue`에 `provide & inject` 문자열이 표시됨을 확인할 수 있다.

![캡처06](https://user-images.githubusercontent.com/52685250/82544668-6f1d2b80-9b90-11ea-914a-d75553dd7c11.JPG)

---

