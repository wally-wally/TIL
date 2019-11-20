# :notebook_with_decorative_cover: 07_Vue - Day07

---

- 기본세팅 : vscode extensions `vetur`, `Vue VSCode Snippets` 설치(설치 순서 반드시 지키자!)
- chrome extension : 현재 페이지가 vue로 작성되었는지 확인 [(다운로드 페이지로 이동)](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd/related)
  - 다운로드 후 아이콘 오른쪽 버튼 > `확장 프로그램 관리` > `파일 URL에 대한 액세스 허용` ON
- 참고 사이트 : <a href="https://kr.vuejs.org/v2/guide/index.html" target="_blank">(Vue.js 공식 홈페이지)</a> <a href="https://github.com/vuejs/vue">(Vue.js 공식 github)</a>

---

<br>

## 7. 11월20일(7일차) - `Django & Vue.js 합치기 구현②`

### 7.1 `TodoList.vue` 구성(CRUD 중 D)

> `TodoList.vue`
>
> - `template` 쪽에 :wastebasket: 버튼 추가
> - `script` 쪽에 `deleteTodo(todo)` 메서드 추가
>
> ```vue
> <template>
> <div class="todo-list">
>  <div class="card" v-for="todo in todos" :key="todo.id">
>    <div class="card-body">
>      <span>{{ todo.title }}</span>
>      <span @click="deleteTodo(todo)">🗑️</span>
>    </div>
>  </div>
> </div>
> </template>
> 
> <script>
> import axios from 'axios'
> 
> export default {
>  name: 'TodoList',
>  props: {
>    todos: {
>      type: Array,
>      required: true,
>    }
>  },
>  methods: {
>    deleteTodo(todo) { // 인자 todo가 있으므로 decode할 필요가 없다.
>      this.$session.start() // 세션 활성화
>      const token = this.$session.get('jwt')
>      const requestHeader = {
>        headers: {
>          Authorization: 'JWT ' + token
>        }
>      }
>      axios.delete(`http://127.0.0.1:8000/api/v1/todos/${todo.id}/`, requestHeader)
>        .then(res => {
>          console.log(res)
>        })
>        .catch(err => {
>          console.log(err)
>        })
>    }
>  }
> }
> </script>
> 
> <style>
> 
> </style>
> ```

- :wastebasket: 버튼을 선택했을 때 `console.log(res)`에 찍힌 모습은 아래 사진과 같은데 django 측에서는 이미 delete 동작이 수행되어 삭제 되었다.(새로고침하면 삭제되어 있음)

- console 창에서 `data` 부분이 empty string(`""`)으로 된 것을 볼 수 있다.

  ![00001](https://user-images.githubusercontent.com/52685250/69198100-f0aae700-0b76-11ea-8992-440d86925154.JPG)

- 하지만 현재 상황은 새로고침을 해야만 삭제된 모습이 보이므로 실시간으로 삭제되는 모습이 보일 수 있도록 수정해야 한다.

- 즉, Vue에서 Array 에서 특정 아이템을 삭제해야 하는데 `splice` 메서드를 사용하면 된다.

---

:heavy_check_mark: <b>`splice()`</b>

1. <b>개념</b>

- 배열의 기존 요소를 삭제 혹은 교체하거나 새 요소를 추가하여 배열의 내용을 변경

2. <b>작성법(문법)</b>

- 문법 : `Array.splice(시작 index, 삭제할 요소 수, 배열에 추가할 요소)`
  - 이 때`시작 index`, `삭제할 요소 수`는 필수 인자, `배열에 추가할 요소`는 선택 인자
- `splice(start, deleteCount, [item1, item2, item3, ...])`와 같이 작성한다.

3. <b>argument</b>

- start
  - 배열의 변경을 시작할 인덱스
  - 배열의 길이보다 큰 값이면 시작 인덱스는 배열의 길이로 설정
  - 음수인 경우 배열의 가장 마지막에서 시작
  - 절댓값이 배열의 길이보다 큰 경우는 0으로 설정
- deleteCount
  - 배열에서 제거할 요소의 수
  - 생략할 경우 start 부터 모든 요소를 제거
  - 0 이하인 경우 어떤 요소도 삭제하지 않음. 이때는 최소한 하나의 추가할 새로운 요소를 지정해야 한다.
- `item1, item2, item3, ...`
  - 배열에 추가할 요소
  - 추가할 아무 요소도 지정하지 않으면 요소를 제거만 한다.
  - 즉, <b><u>추가할 요소를 지정하지 않으면 원본 배열의 특정 인덱스에서 몇 개의 요소를 삭제</u></b>할지 정한다. 이 상황이 우리가 해결해야 하는 상황이다.

---

> `TodoList.vue`
>
> - axios의 `.then` 부분 다음과 같이 추가
> - splice를 이용해 특정 부분만 삭제하고 실시간으로 반영되도록 한다.
>
> ```js
> .then(res => {
> console.log(res)
> const targetTodo = this.todos.find(function(el) {
>  return el === todo
> })
> const idx = this.todos.indexOf(targetTodo)
> if (idx > -1) {
>  this.todos.splice(idx, 1)
> }
> })
> ```

- 올바르게 삭제 되고 console 창의 status에 204가 나오는 것 까지 확인하면 된다.

  ![00002](https://user-images.githubusercontent.com/52685250/69198689-de31ad00-0b78-11ea-98e8-bc87fad41dd9.JPG)

<br>

### 7.2 `TodoList.vue` 구성(CRUD 중 U)

- 엄밀히 말하면 UPDATE는 아니고 각 todo의 완료여부를 바꾸는 작업을 할 것이다.

- `TodoList.vue`의 `style` 부분에 css 속성 추가

  ```css
  <style>
    .complete {
      text-decoration: line-through;
      color: rgb(112, 112, 112);
    }
  </style>
  ```

- `TodoList.vue`의 `template` 부분 class 속성 추가

  ```html
  <span @click="updateTodo(todo)" :class="{ complete: todo.completed }">{{ todo.title }}</span>
  ```

- `TodoList.vue`의 `script` 부분에 `updateTodo` 함수 추가

  ```js
  updateTodo(todo) {
    this.$session.start() // 세션 활성화
    const token = this.$session.get('jwt')
    const requestHeader = {
      headers: {
        Authorization: 'JWT ' + token
      }
    }
    const requestForm = new FormData()
    // 수정 전 기존 로직에서 데이터를 보내고 FormData에 담아야 한다.
    requestForm.append('id', todo.id)
    requestForm.append('title', todo.title)
    requestForm.append('user', todo.user)
    requestForm.append('completed', !todo.completed) // 완료 상태가 반대가 되어야 하므로 !를 붙여 준다.
  
    axios.put(`http://127.0.0.1:8000/api/v1/todos/${todo.id}/`, requestForm, requestHeader)
      .then(res => {
        console.log(res)
        todo.completed = !todo.completed // vue 화면 반응 실시간으로 적용
      })
      .catch(err => {
        console.log(err)
      })
  }
  ```

- 그러면 아래 사진과 같이 console 창에 completed 상태가 바뀐 것을 볼 수 있다.

  ![00003](https://user-images.githubusercontent.com/52685250/69199199-a592d300-0b7a-11ea-86c6-784b91d85987.JPG)

<br>

### 7.3 로그아웃 기능 구현

- 로그아웃은 별도의 라우터 링크가 필요 없으므로 우선 `a` 태그로 작성하자.

> `App.vue`
>
> ```vue
> <template>
> ...
> <a @click.prevent="logout" href="#">Logout</a> <!-- .prevent 로 기본적인 a 태그 동작(href로 이동시키는 기능)을 지워준다. -->
> ...
> </template>
> 
> <script> // script 부분 새로 추가
> export default {
> name: 'App',
> methods: {
>  logout() {
>    this.$session.destroy()
>    this.$router.push('/login') // 로그아웃 후 로그인 페이지로 이동
>  }
> }
> }
> </script>
> ```

- 하지만 현재 상태는 상단에 Login과 Logout 버튼이 함께 공존하는 상태이다. 이를 해결하기 위해 `updated`를 사용해 로그인 상태에 따라 나눌 것이다.

---

:heavy_check_mark: <b>updated</b>

1. 타입 : function
2. 상세

- 데이터가 변경되어 DOM이 re-render 되고 patch 되면 호출된다.(<b>DOM 변화</b>에 반응)
- DOM의 변화는 일반적으로 데이터의 변경에 의해 re-render 되는 시점에 일어난다.
- <b>데이터의 변화(상태의 변화)</b>에 반응하기 위해서는 computed 나 watch 를 사용하는 것이 좋다.

---

> `App.vue`
>
> - `v-if`로 session 값의 존재 여부(`isAuthenticated`)에 따라 nav쪽에 표시되는 Login 또는 Logout 버튼 을 나눠 준다.
>
> ```vue
> <template>
> <div id="app" class="container">
>  <div id="nav">
>    <div v-if="isAuthenticated">
>      <router-link to="/">Home</router-link> |
>      <a @click.prevent="logout" href="#">Logout</a> <!-- .prevent 로 기본적인 a 태그 동작(href로 이동시키는 기능)을 지워준다. -->
>    </div>
>    <div v-else>
>      <router-link to="/login">Login</router-link> <!-- router-link와 to는 정해진 이름이다. -->
>    </div>
>  </div>
>  <div class="row justify-content-center">
>    <router-view class="col-6"/> <!-- 이 곳에서 view가 출력되는 것이다. -->
>  </div>
> </div>
> </template>
> 
> <script>
> export default {
> name: 'App',
> data() {
>  return {
>    isAuthenticated: this.$session.has('jwt')
>  }
> },
> updated() {
>  // DOM 이 re-render 될 때 다시 토큰의 존재 여부를 확인
>  this.isAuthenticated = this.$session.has('jwt')
> },
> methods: {
>  logout() {
>    this.$session.destroy()
>    this.$router.push('/login') // 로그아웃 후 로그인 페이지로 이동
>  }
> }
> }
> </script>
> ```

- 아래 사진과 같이 로그인 상태에 따라 session storage에 session 값의 존재 여부를 확인할 수 있다.

  `로그인 상태`

  ![01](https://user-images.githubusercontent.com/52685250/69200877-e5a88480-0b7f-11ea-80f4-7caf1ad85651.JPG)

  `로그아웃 상태`

  ![02](https://user-images.githubusercontent.com/52685250/69200878-e5a88480-0b7f-11ea-8299-96c804c1f8ba.JPG)

<br>

### 7.4 Vuex - `코드를 refactoring 하는 과정`

#### (1) About Vuex

- State 관리를 위해 탄생
- 컴포넌트 간의 통신 혹은 데이터 전달을 유기적으로 관리

- 컴포넌트 간의 통신 혹은 이벤트 등의 관계를 한 곳에서 관리하기 쉽게 구조화

---

- 현재 todo 프로젝트 에서는 Auth 정보(로그인 혹은 로그아웃)은 django로 요청을 보낼 때 항상 필요하기 때문에, 요청을 수행하는 모든 컴포넌트에서 알고있어야 하고 그 정보를 내가 필요한 순간에 활용할 수 있어야 한다.

---

:heavy_check_mark: <b>Vuex concept</b>

- state
  - 상태(데이터)
- Getters
  - computed
- Mutations
  - methods
  - state 를 변경하기 위해 반드시 동기적인 method 만 사용 가능
  - 첫 번째 인자는 항상 state, 호출은 commit 으로!
- Actions
  - methods
  - 비동기 처리가 가능한 methods 까지 입력 가능
  - mutations 와 구분된 이유는 다양한 컴포넌트에서 vuex를 통해 상태관리, 메서드 호출 등을 하게 될텐데 그때 동기와 비동기를 구분하기 위해
  - 첫 번째 인자는 항상 context(state / commit / dispatch 등), 호출은 dispatch 로 된다.

---

:ballot_box: <b>vuex 라이브러리 설치</b>

- `vue ui`로 프로젝트 매니저에서 `@vue/cli-plugin-vuex` (공식 플러그인)을 설치한다.
- 그러면 파일 트리에 `src` 폴더 안에 `store` 폴더가 새로 생겼다.

---

<br>

#### (2) vuex 구성 -`auth module 구성`

- `store` 폴더 안에 `modules` 폴더 생성 후 그 안에 `auth.js` 파일 생성

> `index.js`
>
> - auth 모듈 등록 과정
>
> ```js
> import Vue from 'vue'
> import Vuex from 'vuex'
> import auth from './modules/auth'
> 
> Vue.use(Vuex)
> 
> export default new Vuex.Store({
> modules: { // 반드시 modules 라고 해야 한다!
>  auth, // auth module 등록 과정
> }
> })
> ```

- 로그인, 로그아웃 상태 module 구성

> `auth.js`
>
> ```js
> import jwtDecode from 'jwt-decode'
> 
> const state = {
> token: null // 처음에는 토큰이 없으므로 null이 기본값
> }
> 
> // getters는 데이터(state)를 변경하지 않음!
> // 데이터를 원본 그대로 혹은 가공된 데이터를 사용한다.
> const getters = { // 로그인 여부 체크와 같은 저장이 필요한 것들을 정의
> isLoggedIn: function(state) {
>  return state.token ? true : false
> },
> requestHeader: function(state) {
>  return {
>    headers: {
>      Authorization: 'JWT ' + state.token
>    }
>  }
> },
> userId: function(state) {
>  return state.token ? jwtDecode(state.token).user_id : null
> }
> }
> 
> // 상태(토큰)을 받아와서 state를 update
> const mutations = {
> setToken: function(state, token) { // 위에서 정의한 state, django로 부터 받은 token
>  state.token = token
> }
> }
> 
> // 비동기 로직(axios 로 django 서버에 로그인/로그아웃 요청)
> const actions = {
> // commit 은 첫 번째 인자로 mutations 에 정의한 함수를 받는다.
> // 두 번째 인자로 token을 받아서, mutations에 정의된 함수를 통해 state 를 변경한다.
> login: function(options, token) {
>  options.commit('setToken', token)
> },
> // 로그아웃의 경우 추가로 받는 인자는 없고 token의 상태를 null로 변경한다.
> logout: function(options) { // logout은 token의 상태를 null로 만듬
>  options.commit('setToken')
> }
> }
> 
> export default { // 여기서 export default는 보통 최하단에 작성한다.
> state,
> mutations,
> actions,
> getters,
> }
> ```

- 로딩 상태 module 구성

> `auth.js`
>
> ```js
> import jwtDecode from 'jwt-decode'
> 
> const state = {
> token: null, // 처음에는 토큰이 없으므로 null이 기본값
> loading: false,
> }
> 
> // getters는 데이터(state)를 변경하지 않음!
> // 데이터를 원본 그대로 혹은 가공된 데이터를 사용한다.
> const getters = { // 로그인 여부 체크와 같은 저장이 필요한 것들을 정의
> isLoggedIn: function(state) {
>  return state.token ? true : false
> },
> requestHeader: function(state) {
>  return {
>    headers: {
>      Authorization: 'JWT ' + state.token
>    }
>  }
> },
> userId: function(state) {
>  return state.token ? jwtDecode(state.token).user_id : null
> }
> }
> 
> // 상태(토큰)을 받아와서 state를 update
> const mutations = {
> setToken: function(state, token) { // 위에서 정의한 state, django로 부터 받은 token
>  state.token = token
> },
> setLoading: function(state, status) {
>  state.loading = status
> }
> }
> 
> // 비동기 로직(axios 로 django 서버에 로그인/로그아웃 요청)
> // options : actions 에서 사용할 수 있도록 만든 객체, Vuex 에서 제공하는 action 함수에서 사용할 수 있는 option 들이 있는 객체
> const actions = {
> // commit 은 첫 번째 인자로 mutations 에 정의한 함수를 받는다.
> // 두 번째 인자로 token을 받아서, mutations에 정의된 함수를 통해 state 를 변경한다.
> login: function(options, token) {
>  options.commit('setToken', token)
> },
> // 로그아웃의 경우 추가로 받는 인자는 없고 token의 상태를 null로 변경한다.
> logout: function(options) { // logout은 token의 상태를 null로 만듬
>  options.commit('setToken')
> },
> startLoading: function(options) {
>  options.commit('setLoading', true)
> },
> endLoading: function(options) {
>  options.commit('setLoading', false)
> },
> }
> 
> export default { // 여기서 export default는 보통 최하단에 작성한다.
> state,
> mutations,
> actions,
> getters,
> }
> ```

<br>

#### (3) Vuex를 이용하여 코드 재구성(refactoring)

- 공통적인 함수를 한 군데에 모아서 form 처럼 사용하고 싶을 때 vuex를 사용한다.

> `LoginForm.vue`
>
> - `loading: false` 구문 삭제
>
> - `computed` 구문 추가
>
> ```js
>    computed: {
>      loading: function() {
>        return this.$store.state.loading
>      }
>    },
> ```
>
> - methods의 `this.loading = true` 구문 삭제 => `this.$store.dispatch('startLoading')` 구문 추가
>
> - methods의 `this.$session.start()`,  `this.$session.set('jwt', res.data.token)`  구문 삭제 => `this.$store.dispatch('endLoading')`,  `this.$store.dispatch('login', res.data.token)`구문 추가
>
> - .catch 부분에서 `this.loading = false` 구문 삭제 => `this.$store.dispatch('endLoading')` 구문 추가

> `TodoList.vue`
>
> - `computed` 구문 추가
>
> ```js
> computed: {
>  requestHeader: function() {
>    return this.$store.getters.requestHeader
>  }
> },
> ```
>
> - methods의 deleteTodo의 아래 구문 삭제 (updateTodo도 동일하게 하면 됨)
>
> ```js
> this.$session.start() // 세션 활성화
> const token = this.$session.get('jwt')
> const requestHeader = {
>  headers: {
>    Authorization: 'JWT ' + token
>  }
> }
> ```
>
> 그리고 axios 안의 두번째 인자(requestHeader)를 `this.requestHeader`로 변경

> `Home.vue`
>
> - computed 추가
>
> ```vue
> <script>
> import { mapGetters } from 'vuex' // import 구문 추가
> ...    
>  computed: { // computed 구문 추가
>    // `...` spread 문법 -> 각각의 getters
>    // mapGetters 함수의 인자로 들어가는 배열에는 getters 에서 정의한 함수들 중에서 가지고 오고 싶은 getter들을 작성한다.
>    ...mapGetters([
>      'isLoggedIn',
>      'requestHeader',
>      'userId'
>    ])
>  },
> ...
> </script>
> ```
>
> - checkLoggedIn()
>
>   - `this.$session.start()` 삭제
>   - if 조건문 `!this.$session.has('jwt')` 을 `!this.isLoggedIn` 으로 대체
>
> - getTodos()
>
> ```js
> // 아래 구문 삭제
> this.$session.start()
> const token = this.$session.get('jwt')
> const requestHeader = {
>  headers: {
>    Authorization: 'JWT ' + token
>  }
> }
> const user_id = jwtDecode(token).user_id
> console.log(jwtDecode(token))
> ```
>
>   - axios 첫번째 구문 변경
>
>  ```js
>  axios.get(`http://127.0.0.1:8000/api/v1/users/${user_id}/`, requestHeader) // before
>  axios.get(`http://127.0.0.1:8000/api/v1/users/${this.userId}/`, this.requestHeader) // after
>  ```
>
> - createTodo(title)
>
> ```js
> // 아래 구문 삭제
> this.$session.start() // 세션 활성화
> const token = this.$session.get('jwt')
> const requestHeader = {
>  headers: {
>    Authorization: 'JWT ' + token
>  }
> }
> const user_id = jwtDecode(token).user_id
> ```
>
>   - `requestForm.append('user', user_id)` => `requestForm.append('user', this.userId)`
>
>   - axios 첫번째 구문 변경
>
>  ```js
>  axios.post('http://127.0.0.1:8000/api/v1/todos/', requestForm, requestHeader) // before
>  axios.post('http://127.0.0.1:8000/api/v1/todos/', requestForm, this.requestHeader) // after
>  ```

> `App.vue`
>
> - computed가 있기 때문에 data, updated 부분 필요 없으므로 삭제
>
> ```js
> computed: {
>  isLoggedIn: function() {
>    return this.$store.getters.isLoggedIn
>  }
> },
> ```
>
> - template의 `<div v-if="isAuthenticated">`을 `<div v-if="isLoggedIn">`으로 수정
>
> - methods의 `logout` 함수에서 `this.$session.destroy()` 구문 삭제 => `this.$store.dispatch('logout')` 구문으로 대체

---

:warning: <b>주의 및 참고!</b>

- vuex는 `vue-session`의 대체가 아니고 서로 하는 일이 다르다.
- vuex는 메서드와 data 의 대체라고 생각하자.
- 참고로 현재 상황은 session을 그대로 유지하는 상황이 아니여서 새로고침하면 자동으로 로그아웃 된다. 그래서 session까지 고려하는 코드를 작성하려면 다시 코드를 구성해야 한다.

---

