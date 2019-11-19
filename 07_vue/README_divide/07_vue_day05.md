# :notebook_with_decorative_cover: 07_Vue - Day05

---

- 기본세팅 : vscode extensions `vetur`, `Vue VSCode Snippets` 설치(설치 순서 반드시 지키자!)
- chrome extension : 현재 페이지가 vue로 작성되었는지 확인 [(다운로드 페이지로 이동)](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd/related)
  - 다운로드 후 아이콘 오른쪽 버튼 > `확장 프로그램 관리` > `파일 URL에 대한 액세스 허용` ON
- 참고 사이트 : <a href="https://kr.vuejs.org/v2/guide/index.html" target="_blank">(Vue.js 공식 홈페이지)</a> <a href="https://github.com/vuejs/vue">(Vue.js 공식 github)</a>

---

<br>

## 5. 11월18일(5일차) - `Django & Vue.js 합치기 준비`

### 5.1 JWT(JSON Web Token) <a href="https://jwt.io/" target="_blank">(JWT 공식 홈페이지)</a>

#### (1) JWT 구조 - `xxxx.yyyy.zzzz`

- `xxxx` : 헤더(header), `yyyy` : 내용(payload), `zzzz` : 서명(signature)
- Header : token의 type과 사용된 알고리즘, 여기서 정의한 알고리즘은 시그니처에서 다시 사용된다.
- Payload : 토큰에 담길 정보가 들어있는 곳(claim - key:value)
- Signature : 헤더와 payload를 기반으로 이 둘을 조합해서 만든 비밀키로 hashing

---

:heavy_check_mark: <b>정보(Payload)</b>

- registered claim (등록된 클레임)
  - 토큰에 대한 정보들을 담기 위해 이름이 이미 정해진 클레임들.
  - 클레임의 사용은 모두 선택적이다.

- public claim
  - 공개 클레임은 충돌이 되지 않는 이름을 가지고 있어야 함.
  - 보통 충돌을 방지하기 위해 key 값을 URI 형태로 만든다.
  - ex) `apple` (X), `'https://test.co.kr/jwt_token': true` (O)

- private claim
  - 등록된 클레임도 아니고 공개 클레임도 아님.
  - 클라이언트와 서버간에 협의하에 사용되는 클레임들.
  - key 값이 중복되서 충돌이 될 수 있으니 유의해서 사용.
  - ex) `{"username": "admin"}` (Django에서 사용되는 field 값들과 같은 경우)

---

:heavy_check_mark: <b>서명(signature)</b>

- HEADER의 인코딩 값과, PAYLOAD의 인코딩 값을 합친 후 주어진 비밀키로 해시(hash)를 생성한 값

---

<br>

#### (2) JWT의 특징

- 정보를 안전하게 JSON 객체로 전송하기 위한 간결하고 독립적인 방법
- 서로 다른 웹 프레임워크 간 데이터를 주고 받을 때 검증을 위해 사용
- JWT 용도 : `Authorization`(회원 인증), `Information Exchanges`(정보 교환)

- 세션/쿠키와 함께 모바일과 웹의 인증을 책임지는 대표 기술 중 하나.
- 세션/쿠키의 정보 전달 방식과 유사하게 사용자는 Access Token (JWT Token) 을 HTTP header 에 실어서 서버로 요청을 보냄.
- 세션/쿠키 방식과 가장 큰 차이점은 세션/쿠키는 세션 저장소에 유저의 정보를 넣지만, JWT 는 토큰 안에 유저의 정보를 넣는다.

- <b>Client 의 입장에서는 HTTP header에 세션ID와 토큰을 실어서 보낸다는 점은 동일하지만, Server 입장에서는 인증을 위해 암호화(JWT 방식) 를 하냐 혹은 별도의 저장소(세션/쿠키 방식)를 이용하느냐의 차이</b>

<br>

#### (3) JWT 사용 상황

- 회원 인증(Authorization)
  - 서버가 유저 정보에 기반한 토큰(JWT)을 발급해 유저에게 전달하고, 유저는 서버에 요청을 보낼 때마다 JWT를 포함하여 전달.
  - 서버는 세션을 유지할 필요 없이 유저의 요청정보 안에 있는 JWT 만 확인하면 된다. (서버 자원 아낄 수 있음)
- 정보 교환(Information Exchanges)
  - 정보가 서명되어 있기 때문에 정보를 보낸 사람의 정보 혹은 정보가 조작여부 확인 등이 가능

<br>

---

:spiral_notepad: <b>요약</b>

- 두 개체에서 JSON 객체를 사용하여 가볍고 자가 수용적인(self-contained; 필요한 모든 정보를 자체적으로 지님) 방식으로 정보를안정성 있게 전달.
- 세션 상태를 저장하는 것이 아니라 필요한 정보를 JWT에 저장해서 사용자가 가지고 있게 하고, 해당 JWT를 증명서처럼 사용하는 방식.(즉, 매번 주민등록증을 내는 것과 같다고 생각하면 된다.)
- JWT 장점
  - 세션/쿠키처럼 별도의 저장소 관리가 필요 없고 발급한 이후에 검증만 하면 된다.
  - 토큰을 기반으로 한 다른 인증시스템에 접근이 용이하기 때문에 확장성이 뛰어나다.
  - 모바일 환경에 적합 (쿠키와 같은 데이터로 인증할 필요가 없기 때문) (세션/쿠키 방식은 모바일 환경에서 부적합)
  - Python, JS, Ruby, Go 등 주류 프로그래밍 언어에서 대부분 지원된다.
- JWT 단점
  - 이미 발급된 JWT는 유효기간이 완료될 때까지 계속 사용하기 때문에 악용될 가능성이 있다.(한 번 발급된 토큰은 값을 수정하거나 폐기할 수 없으므로 계속 같은것을 사용하는 것이다.)
    - 그래서 이 문제는 Access Token의 유효기간(expire time) 을 짧게하고 Refresh Token 등을 이용해서 중간중간 새로운 토큰을 재발행 해줌으로써 해결할 수 있다.
  - 세션/쿠키 방식에 비해 claim 데이터(payload)가 많아진다면 JWT 토큰의 길이가 길어지기 때문에 인증 요청이 많아 질수록 네트워크의 대역폭이 낭비될 수 있다.(= 요청량이 너무 많아 네트워크에 과부하가 걸릴 수 있다는 의미)
    - API 호출 시 매 호출마다 헤더에 붙여서 전달하기 때문이다.

---

<br>

### 5.2 Django & Vue.js 실습 프로젝트 - vue 세팅

---

:file_folder: <b>파일 트리</b>

```
todo-back
	-todoback
	-todos
	-venv
todo-front
	-node_modules
	-public
	-src
	...
```

---

#### (1) 뷰 라우터

- `vue ui`로 프로젝트 매니저 열고 폴더 경로를 `~~~/todo-front`(현재 vue 프로젝트가 있는 폴더 위치)로 잡아준다.

- 플러그인 탭 에서 router 검색시 가장 먼저 뜨는 플러그인을 설치한다.
- 설치 후 `@vue/cli-plugin-router의 설정`에서 `Use history mode for router?` 항목을 켜준다.(history mode를 켜준다.) 그리고 맨 밑에 `설치 완료`를 선택후 `계속`을 누른다.
- 설치가 완료되면 vscode에 `node_modules` 폴더에 `vue-router`가 생김을 확인할 수 있다.(만약에 안 뜨면 vscode에서 새로고침하고 다시 확인해보자.)

- 그리고 `src` 폳더에 `router`, `views` 폴더가 새로 생성된다. 이 때 `router` 폴더의 `index.js`가 django의 `urls.py` 역할을 하게 된다.
- <b>[주의!] 라우터에 직접적으로 연결되는 컴포넌트는 `views` 폴더에 작성하고, 그 밑의 자식 컴포넌트들은 `components` 폴더에 작성된다.</b>

<br>

#### (2) view 구성

##### ① 로그인 기능 구현하기

> `views` > `Login.vue`
>
> - 기본 세팅만 우선하기
>
> ```vue
> <template>
>   <div> <!-- template에서는 최상단에 div 태그가 항상 있어야 한다. -->
>     <h1>로그인 페이지입니다.</h1>
>   </div>
> </template>
> 
> <script>
> export default {
>  
> }
> </script>
> 
> <style>
> 
> </style>
> ```

> `index.js`
>
> ```js
> import Login from '../views/Login.vue' // import 구문 추가
> 
> Vue.use(VueRouter) // VueRouter를 사용하기 위한 코드
> 
> const routes = [
> {
>  path: '/',
>  name: 'home',
>  component: Home
> },
> {
>  path: '/login',
>  name: 'login',
>  component: Login
> }
> ]
> ```

> `App.vue`
>
> ```vue
> <template>
> <div id="app">
>  <div id="nav">
>    <!-- router-link와 to는 정해진 이름이다. -->
>    <router-link to="/">Home</router-link> |
>    <router-link to="/login">Login</router-link>
>  </div>
>  <div class="container col-6">
>    <router-view/> <!-- 이 곳에서 view가 출력되는 것이다. -->
>  </div>
> </div>
> </template>
> ```

> `public` > `index.html`
>
> - `<head>` 태그 안에 Bootstrap CSS 코드 붙여넣기

---

:heavy_check_mark: <b>`router-link`</b>

- router 지원 앱에서 사용자 네비게이션을 가능하게하는 컴포넌트
- 목표 위치는 `to` prop 으로 지정된다.
- 라우팅은 URI 에 따라 해당하는 정적 파일을 내려주는 방식인데 이를 브라우저에서 구현하는 것이 SPA 개발의 핵심
- `router-link`는 `a` 태그보다 선호되는데 이유는 HTML5 히스토리 모드에서 클릭 이벤트 자체를 차단하여 브라우저가 페이지를 다시 로드하지 않도록 한다.(기본적으로 `a` 태그는 클릭 이벤트가 자동으로 실행되어 페이지가 로드된다.)

:heavy_check_mark: <b>`router-view`</b>

- 라우팅이 경로에 맞는 컴포넌트를 제공하는 데 해당 경로에 맞는 컴포넌트를 렌더링 해주는 부분
- `<router-link to="/login">Login</router-link>`를 선택하면 `router-view`에 `Login.vue`가 렌더링 되는 것이다.

---

> `Home.vue`
>
> ```vue
> <template>
> <div class="home">
>  
> </div>
> </template>
> 
> <script>
> // @ is an alias to /src
> 
> export default {
> name: 'home',
> components: {
>  
> }
> }
> </script>
> 
> ```

> `HelloWorld.vue` 는 삭제하기

> `components` > `LoginForm.vue`
>
> ```vue
> <template>
> <div class="login-div">
>  <div class="form-group">
>    <label for="id">ID</label>
>    <input type="text" class="form-control" id="id" placeholder="Enter the email">
>  </div>
>  <div class="form-group">
>    <label for="password">PASSWORD</label>
>    <input type="text" class="form-control" id="password" placeholder="Enter the password">
>  </div>
>  <button class="btn btn-primary">LOGIN</button>
> </div>
> </template>
> 
> <script>
> export default {
>  
> }
> </script>
> 
> <style>
> 
> </style>
> ```

> `views` > `Login.vue`
>
> ```vue
> <template>
> <div> <!-- template에서는 최상단에 div 태그가 항상 있어야 한다. -->
>  <LoginForm/>
> </div>
> </template>
> 
> <script>
> // @ 는 /src 의 alias이다.
> // import LoginForm from '../components/LoginForm' // 상대경로로 작성하는 법
> import LoginForm from '@/components/LoginForm' // 절대경로로 작성하는 법
> export default {
>  name: 'login',
>  components: {
>    LoginForm,
>  }
> }
> </script>
> 
> <style>
> 
> </style>
> ```

> `LoginForm.vue`
>
> - 현재까지 상황은 vue console의 credentials에 로그인 폼에 입력하면 동적으로 입력이 되어야 하고 로그인 버튼을 누를때마다 console 창에 console 구문이 찍혀야 한다.
>
> ```vue
> <template>
> <div class="login-div">
> 
>  <div v-if="loading" class="spinner-border" role="status">
>    <span class="sr-only">Loading...</span>
>  </div>
> 
>  <div v-else class="login-form">
>    <div class="form-group">
>      <label for="id">ID</label>
>      <input type="text" class="form-control" id="id" placeholder="아이디 입력" v-model="credentials.username"
>        @keyup.enter="login">
>    </div>
>    <div class="form-group">
>      <label for="password">PASSWORD</label>
>      <input type="text" class="form-control" id="password" placeholder="비번 입력" v-model="credentials.password"
>        @keyup.enter="login">
>      <div>
>        <button class="btn btn-primary" @click="login">로그인</button>
>      </div>
>    </div>
>  </div>
> 
> </div>
> </template>
> 
> <script>
> export default {
>  name: 'LoginForm',
>  data() {
>    return {
>      credentials: {},
>      loading: false,
>    }
>  },
>  methods: {
>    login() {
>      console.log('Login button Clicked!!')
>    }
>  }
> }
> </script>
> 
> <style>
> 
> </style>
> ```

- 로그인 검증 구현하기

> `LoginForm.vue`
>
> - 이 때, `form-group`에 있는 `@keyup.enter` 구문 두 개와 로그인 버튼의 `@click="login"` 구문을 삭제하고 가장 밖에 있는 form 태그 안에 `@submit.prevent="login"`으로 작성하면 위 세 줄의 구문을 한 줄로 간단하게 작성할 수 있게 된다.
>
> ```vue
> <template>
> <div class="login-div">
> 
>  <div v-if="loading" class="spinner-border" role="status">
>    <span class="sr-only">Loading...</span>
>  </div>
> 
>  <form v-else class="login-form" @submit.prevent="login"> <!-- .prevent를 써야 redirect 되는 기본 동작을 막을 수 있다. -->
>    <!-- 에러 메세지 출력 -->
>    <div v-if="errors.length" class="error-list alert alert-danger" role="alert">
>      <h4>다음의 오류를 해결해주세요.</h4>
>      <hr>
>      <div v-for="(error, idx) in errors" :key="idx">
>        {{ error }}
>      </div>
>    </div>
> 
>    <div class="form-group">
>      <label for="id">ID</label>
>      <input type="text" class="form-control" id="id" placeholder="아이디 입력" v-model="credentials.username">
>    </div>
>    <div class="form-group">
>      <label for="password">PASSWORD</label>
>      <input type="password" class="form-control" id="password" placeholder="비번 입력" v-model="credentials.password">
>    </div>
>    <button class="btn btn-primary">로그인</button>
>  </form>
> 
> </div>
> </template>
> 
> <script>
> export default {
>  name: 'LoginForm',
>  data() {
>    return {
>      credentials: {
>        username: '',
>        password: '',
>      },
>      loading: false,
>      errors: [],
>    }
>  },
>  methods: {
>    login() {
>      if (this.checkForm()) {
>        console.log('로그인 성공')
>      } else {
>        console.log('로그인 실패') // return이 없으면 undefined 이므로 else 구문이 실행됨
>      }
>    },
>    checkForm() {
>      this.errors = [] // 로그인 버튼 누를 때마다 빈 배열로 시작해야 한다. 누적되면 안 됨!
>      if (!this.credentials.username) { // 아이디를 입력 안 했을 때
>        this.errors.push("아이디를 입력해주세요")
>      }
>      if (this.credentials.password.length < 8) {// 패스워드 길이가 8 미만인 경우 로그인 막기
>        this.errors.push("비밀번호는 8자 이상 입력해주세요.")
>      }
>      if (this.errors.length === 0) { // 로그인 검증을 모두 통과한 경우
>        return true
>      }
>    }
>  }
> }
> </script>
> 
> <style>
> 
> </style>
> ```

- axios로 django에 로그인 요청 보내기

  `npm i axios` => `LoginForm.vue`의 script 구문 상단에 `import axios from 'axios'` 작성

> `LoginForm.vue` > `<script>` 부분 > `methods`
>
> ```javascript
>    login() {
>      if (this.checkForm()) {
>        this.loading = true
>        axios.get('http://127.0.0.1:8000', this.credentials)
>        .then(res => {
>          console.log(res)
>        })
>        .catch(err => {
>          console.log(err)
>        })
>      } else {
>        console.log('로그인 검증 실패')
>      }
>    },
> ```

- vue에서 django 측으로 로그인 요청을 해야 하는데 django는 8000 포트번호를 사용하고 vue는 8080 포트번호를 사용하는데 서로 포트번호가 달라 request를 denied 해버리게 된다. 보안상의 이유로 제약을 걸어버린다.
- 이를 해결하기 위해 HTTP 접근 제어(CORS)를 처리해줘야 한다. 즉, CORS 헤더를 포함해야 한다.

<br>

##### ② CORS (Cross-Origin Resource Sharing) <a href="https://developer.mozilla.org/ko/docs/Web/HTTP/Access_control_CORS" target="_blank">(CORS MDN 공식 문서)</a>

<img src="https://user-images.githubusercontent.com/52685250/69104662-757cfe80-0aac-11ea-97de-f781540b3fb2.png" alt="CORS_principle" width="650px">

- 정의
  - 한 도메인에서 로드되어 다른 도메인에 있는 리소스와 상호 작용 하는 것.
  - 즉, 도메인이나 포트가 다른 서버의 자원을 요청하는 메커니즘.
- 문제 상황

  - 요청을 할 때 cross-origin HTTP 에 의해 요청을 한다.
  - 하지만 CORS 와 같은 상황이 발생하면 외부 서버에 의한 요청 데이터를 브라우저에서 차단하기 때문에(보안 목적) 정상적으로 데이터를 받을 수 없다.
  - 예를 들어, `http://localhost:8080/` 에서 vue를 실행하고, `http://localhost:8000/` 에서 django를 실행할 경우 포트가 달라 다른 도메인으로 인지하고 브라우저가 요청을 차단한다.
- 해결 방법

  - 가장 쉬운 방법은 서버(django)와 클라이언트(vue)가 같은 도메인과 포트를 사용하도록 한다. => 하지만 이 방법으로는 잘 해결 안 함

  - 서버에서 cross-origin HTTP 요청을 허가한다.(우리가 해결할 방법)
    - 실제 API 서버들은 이러한 CORS 제한과 관련된 처리를 모두 해두어야한다.