# [SSAFY]Vue_#2(written by wally-wally)

----

**※참고사항※**

- `[SSAFY]Vue_#2`는 정규과정 `Vue`을 진행하면서 강의파일에 없는 추가적인 내용이나 중요하게 다루었던 내용을 상세하게 작성했음.
- 최대한 수업 시간의 모든 내용을 담으려했으나 없는 내용이 있을 수도 있음.
- 기본세팅 : vscode extensions `vetur`, `Vue VSCode Snippets` 설치(설치 순서 반드시 지키자!)
- chrome extension : 현재 페이지가 vue로 작성되었는지 확인 [(다운로드 페이지로 이동)](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd/related)
  - 다운로드 후 아이콘 오른쪽 버튼 > `확장 프로그램 관리` > `파일 URL에 대한 액세스 허용` ON
- 참고 사이트 : <a href="https://kr.vuejs.org/v2/guide/index.html" target="_blank">(Vue.js 공식 홈페이지)</a> <a href="https://github.com/vuejs/vue">(Vue.js 공식 github)</a>

------

<br>

---

:arrow_forward: <b>5~7일차에서는 서로 다른 두 프레임워크, Vue.js와 Django를 결합하여 Todo 웹 페이지를 만들게된다.</b>

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
>     <div> <!-- template에서는 최상단에 div 태그가 항상 있어야 한다. -->
>        <h1>로그인 페이지입니다.</h1>
>     </div>
> </template>
> 
> <script>
>   export default {
>     
>   }
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
>   {
>     path: '/',
>     name: 'home',
>     component: Home
>   },
>   {
>     path: '/login',
>     name: 'login',
>     component: Login
>   }
> ]
> ```

> `App.vue`
>
> ```vue
> <template>
>   <div id="app">
>     <div id="nav">
>       <!-- router-link와 to는 정해진 이름이다. -->
>       <router-link to="/">Home</router-link> |
>       <router-link to="/login">Login</router-link>
>     </div>
>     <div class="container col-6">
>       <router-view/> <!-- 이 곳에서 view가 출력되는 것이다. -->
>     </div>
>   </div>
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
>   <div class="home">
>     
>   </div>
> </template>
> 
> <script>
> // @ is an alias to /src
> 
> export default {
>   name: 'home',
>   components: {
>     
>   }
> }
> </script>
> 
> ```

> `HelloWorld.vue` 는 삭제하기

> `components` > `LoginForm.vue`
>
> ```vue
> <template>
>   <div class="login-div">
>     <div class="form-group">
>       <label for="id">ID</label>
>       <input type="text" class="form-control" id="id" placeholder="Enter the email">
>     </div>
>     <div class="form-group">
>       <label for="password">PASSWORD</label>
>       <input type="text" class="form-control" id="password" placeholder="Enter the password">
>     </div>
>     <button class="btn btn-primary">LOGIN</button>
>   </div>
> </template>
> 
> <script>
>   export default {
>     
>   }
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
>   <div> <!-- template에서는 최상단에 div 태그가 항상 있어야 한다. -->
>     <LoginForm/>
>   </div>
> </template>
> 
> <script>
>   // @ 는 /src 의 alias이다.
>   // import LoginForm from '../components/LoginForm' // 상대경로로 작성하는 법
>   import LoginForm from '@/components/LoginForm' // 절대경로로 작성하는 법
>   export default {
>     name: 'login',
>     components: {
>       LoginForm,
>     }
>   }
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
>   <div class="login-div">
> 
>     <div v-if="loading" class="spinner-border" role="status">
>       <span class="sr-only">Loading...</span>
>     </div>
> 
>     <div v-else class="login-form">
>       <div class="form-group">
>         <label for="id">ID</label>
>         <input type="text" class="form-control" id="id" placeholder="아이디 입력" v-model="credentials.username"
>           @keyup.enter="login">
>       </div>
>       <div class="form-group">
>         <label for="password">PASSWORD</label>
>         <input type="text" class="form-control" id="password" placeholder="비번 입력" v-model="credentials.password"
>           @keyup.enter="login">
>         <div>
>           <button class="btn btn-primary" @click="login">로그인</button>
>         </div>
>       </div>
>     </div>
> 
>   </div>
> </template>
> 
> <script>
>   export default {
>     name: 'LoginForm',
>     data() {
>       return {
>         credentials: {},
>         loading: false,
>       }
>     },
>     methods: {
>       login() {
>         console.log('Login button Clicked!!')
>       }
>     }
>   }
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
>   <div class="login-div">
> 
>     <div v-if="loading" class="spinner-border" role="status">
>       <span class="sr-only">Loading...</span>
>     </div>
> 
>     <form v-else class="login-form" @submit.prevent="login"> <!-- .prevent를 써야 redirect 되는 기본 동작을 막을 수 있다. -->
>       <!-- 에러 메세지 출력 -->
>       <div v-if="errors.length" class="error-list alert alert-danger" role="alert">
>         <h4>다음의 오류를 해결해주세요.</h4>
>         <hr>
>         <div v-for="(error, idx) in errors" :key="idx">
>           {{ error }}
>         </div>
>       </div>
> 
>       <div class="form-group">
>         <label for="id">ID</label>
>         <input type="text" class="form-control" id="id" placeholder="아이디 입력" v-model="credentials.username">
>       </div>
>       <div class="form-group">
>         <label for="password">PASSWORD</label>
>         <input type="password" class="form-control" id="password" placeholder="비번 입력" v-model="credentials.password">
>       </div>
>       <button class="btn btn-primary">로그인</button>
>     </form>
> 
>   </div>
> </template>
> 
> <script>
>   export default {
>     name: 'LoginForm',
>     data() {
>       return {
>         credentials: {
>           username: '',
>           password: '',
>         },
>         loading: false,
>         errors: [],
>       }
>     },
>     methods: {
>       login() {
>         if (this.checkForm()) {
>           console.log('로그인 성공')
>         } else {
>           console.log('로그인 실패') // return이 없으면 undefined 이므로 else 구문이 실행됨
>         }
>       },
>       checkForm() {
>         this.errors = [] // 로그인 버튼 누를 때마다 빈 배열로 시작해야 한다. 누적되면 안 됨!
>         if (!this.credentials.username) { // 아이디를 입력 안 했을 때
>           this.errors.push("아이디를 입력해주세요")
>         }
>         if (this.credentials.password.length < 8) {// 패스워드 길이가 8 미만인 경우 로그인 막기
>           this.errors.push("비밀번호는 8자 이상 입력해주세요.")
>         }
>         if (this.errors.length === 0) { // 로그인 검증을 모두 통과한 경우
>           return true
>         }
>       }
>     }
>   }
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
>       login() {
>         if (this.checkForm()) {
>           this.loading = true
>           axios.get('http://127.0.0.1:8000', this.credentials)
>           .then(res => {
>             console.log(res)
>           })
>           .catch(err => {
>             console.log(err)
>           })
>         } else {
>           console.log('로그인 검증 실패')
>         }
>       },
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

<br>

---

<br>

## 6. 11월19일(6일차) - `Django & Vue.js 합치기 구현①`

### 6.1 사전 준비 - 라이브러리 설치(`todo-back`)

:heavy_check_mark: <b>반드시 공식 문서를 보고 차근차근 설치하자!!</b>

- pip로 라이브러리 설치

  - `DRF` : `pip install djangorestframework`
  - `DRF-jwt`<a href="https://jpadilla.github.io/django-rest-framework-jwt">(공식 문서)</a> : `pip install djangorestframework-jwt`
  - `cors`<a href="https://github.com/adamchainz/django-cors-headers">(공식 문서)</a> : `pip install django-cors-headers`

- `settings.py` 설정 - `cors` 관련 내용

  - 라이브러리 설치 후 `INSTALLED_APPS`에 `'rest_framework'`, `'corsheaders'` 추가
  - `MIDDLEWARE`에 `'corsheaders.middleware.CorsMiddleware',` 추가
    - `'django.middleware.common.CommonMiddleware',` 도 추가해야하지만 이미 `settings.py`에 작성되어 있으므로 추가할 필요가 없다.
  - 원래대로 라면 `settings.py` 하단에 `CORS_ORIGIN_WHITELIST` 추가해야 하지만 지금은 개발 테스트 단계이므로 모든 요청을 허용하기 위해 주석처리 한다.

- `settings.py` 설정 - `DRF-jwt `관련 내용

  - MIDDLEWARE 부분 위에 추가로 작성

    ```python
    REST_FRAMEWORK = {
        # 로그인 여부를 확인하는 클래스
        'DEFAULT_PERMISSION_CLASSES': (
            'rest_framework.permissions.IsAuthenticated',
        ),
        # 인증 여부를 확인하는 클래스
        'DEFAULT_AUTHENTICATION_CLASSES': (
            'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
            'rest_framework.authentication.SessionAuthentication',
            'rest_framework.authentication.BasicAuthentication',
        ),
    }
    ```

  - 그 아래에 `JWT_AUTH` 내용 추가 - 공식 홈페이지에 나와 있는 내용에서 실습을 위해 내용을 수정함

    ```python
    import datetime # 최상단에 반드시 작성
    
    JWT_AUTH = {
        # JWT를 encrypt 함. 이 부분은 절대 외부 노출 금지.
        'JWT_SECRET_KEY': SECRET_KEY, # 배포 시에는 이 부분을 가려서 올려야 한다.
        # 토큰 해싱 알고리즘 (default: HS256)
        'JWT_ALGORITHM': 'HS256',
        # 7일간 유효한 토큰
        # (처음에 seconds=300 이라고 되어있었는데 이는 300초간 유효한 토큰을 의미했음)
        'JWT_EXPIRATION_DELTA': datetime.timedelta(days=7),
        # 토큰 갱신 허용 여부
        'JWT_ALLOW_REFRESH': True,
        # 28일 마다 토큰이 갱신(유효기간 연장시)
        'JWT_REFRESH_EXPIRATION_DELTA': datetime.timedelta(days=28),
    }
    ```

  - `urls.py`

    ```python
    from django.contrib import admin
    from django.urls import path
    from rest_framework_jwt.views import obtain_jwt_token
    
    urlpatterns = [
        path('api-token-auth/', obtain_jwt_token), # user 한테 jwt 토큰을 발급해 주는 곳
        path('admin/', admin.site.urls),
    ]
    ```

<br>

### 6.2 JWT Token 발급하기

- `settings.py` 하단에 `AUTH_USER_MODEL = 'todos.User'`  구문 추가

- `models.py`

  ```python
  from django.db import models
  from django.conf import settings
  from django.contrib.auth.models import AbstractUser
  
  # Create your models here.
  class User(AbstractUser):
      pass
  
  class Todo(models.Model):
      user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
      title = models.CharField(max_length=50)
      completed = models.BooleanField(default=False) # BooleanField는 default 값이 필요함
  
      def __str__(self):
          return self.title
  ```

- migrations 과정 수행

  `python manage.py makemigrations` => `python manage.py migrate`

- 실습을 위해 superuser를 만드는데 이 때 vue에서 설정한 비밀번호 최소 자리수 8자리 이상를 지켜서 만들어주자.

- django server를 켜고 ` http://127.0.0.1:8000/api-token-auth/ `로 들어가면 토큰 발행 페이지로 들어가진다.

  <img src="https://user-images.githubusercontent.com/52685250/69106193-ef16eb80-0ab0-11ea-97f5-d084fa0dfed6.JPG" width="700px">

- 이 때 createsuperuser로 만든 아이디와 비밀번호를 입력 후 POST로 보내면 JWT token을 발행해준다.
- 발급된 token을 <a href="https://jwt.io">(JWT 공식 홈페이지)</a>의 Debugger 부분에 넣으면 Decode해서 분석해준다.

- <b>앞으로 vue에서 헤더에 발급받은 jwt token을 붙여서 django 측으로 요청을 보내줄 것이다.</b>

<br>

### 6.3 vue에서 django로 요청 보내기 위한 준비 과정

#### (1) LoginForm.vue 수정

> `LoginForm.vue`
>
> - `methods`에 `this.loading = true` 구문 삭제
>
> ```js
> login() {
>   if (this.checkForm()) {
>     // this.loading = true
>     // 1. django jwt 를 생성하는 주소로 요청을 보냄
>     // 이때 post 요청으로 보내야하며 사용자가 입력한 로그인 정보를 같이 넘겨야 함.
>     axios.post('http://127.0.0.1:8000/api-token-auth/', this.credentials) // get => post로 변경, 주소에 api-token-auth/ 추가
>     .then(res => {
>       // 2. 로그인 이후에는 loading 의 상태를 다시 false 로 변경
>       // 그래야 spinner 가 계속 돌지 않고 로그인 form 을 받아 볼 수 있음
>       this.loading = false
>       console.log(res) // token 위치를 알기 위해 console.log를 반드시 찍어보자
>     })
>     .catch(err => {
>       // 3. 로그인 실패 시 loading 의 상태를 다시 false 로 변경
>       this.loading = false
>       console.log(err)
>     })
>   } else {
>     console.log('로그인 검증 실패') // return이 없으면 undefined 이므로 else 구문이 실행됨
>   }
> },
> ```

- django와 vue 모두 서버가 켜져 있는 채로 vue login 페이지에 들어가서 생성했던 superuser로 로그인하면 console 창에 Object 하나가 생기는데 data 부분 안에 token 값이 들어있다.

- vue command 창에 `npm a vue-session` 설치 <a href="https://www.npmjs.com/package/vue-session">(공식 문서)</a>

  - `main.js`

    ```js
    import Vue from 'vue'
    import App from './App.vue'
    import router from './router'
    import VueSession from 'vue-session' // 구문 추가
    
    Vue.config.productionTip = false
    Vue.use(VueSession) // 구문 추가
    
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
    
    ```

  - 그러면 component에서 ` $session `를 사용해 접근할 수 있다.

---

:hourglass_flowing_sand: <b>[아주 중요!!!] Vue <==> Django 흐름</b>

<img src="https://user-images.githubusercontent.com/52685250/69108418-ef66b500-0ab7-11ea-9f69-160587a8a574.png" width="700px">

0. [Django 내부]
   - 회원가입만 수행

1. [Vue => Django]
   - POST 유저정보(로그인 정보;credentials)를 통해 로그인시도(django 서버로 보냄)

2. [Django 내부]
   - Vue 에서 받은 유저정보에 해당하는 고유한 Web Token 발급

3. [Django => Vue]

   - 발급한 JWT 전달

   - 해당 유저에 대한 토큰을 Vue로 보냄

4. [Vue => Django]

   - <b>(Django로 가기 전 Vue 내부에서의 상황) Django 에서 받은 토큰을 vue-session을 통해 저장 (이 시점부터 vue 에서는 로그인 성공 상태)</b>

   - Authorization header에 JWT를 붙여서 요청을 보냄
   - <b>vue-session 에 저장된 토큰을 가지고  django에 로그인 요청</b>

5. [Django 내부]
   - JWT를 해석해서 정보 확인
   - <b>최초로 보낸 토큰과 일치하는지 여부를 확인(django의 세션에 저장된 토큰 == 요청자의 토큰 여부 확인)</b>

6. [Django => Vue] Response

---

<br>

#### (2) `$session`

| <div style="text-align:center">구문</div> | <div style="text-align:center">의미</div>                    |
| ----------------------------------------- | ------------------------------------------------------------ |
| ` this.$session.start() `                 | session-id 초기화. 만약 세션이 없이 저장하려고 하면 vue-session 플러그인이 자동으로 새로운 세션을 시작 |
| ` this.$session.set(key,value) `          | session 에 해당 key 에 맞는 값을 저장                        |
| ` this.$session.has(key) `                | key(JWT) 가 존재하는지 여부를 확인                           |
| `this.$session.destroy()`                 | 세션을 삭제                                                  |

> `LoginForm.vue`
>
> ```js
> import router from '../router' // router import 하는 구문 추가
> ...
> // login() 함수 부분
> login() {
>     if (this.checkForm()) {
>         this.loading = true // 다시 이 구문 추가
>         axios.post('http://127.0.0.1:8000/api-token-auth/', this.credentials)
>         .then(res => {
>             this.$session.start() // 추가
>             this.$session.set('jwt', res.data.token) // 추가
>             router.push('/') // 추가
>             // this.loading = false 이 구문은 삭제
>         }
>         ...
>     }
> }
> ```

- 다시 vue server를 켜고 로그인을 하면 `Application`의 `Session Storage`에 value 값이 특이하게 만들어짐을 확인할 수 있다.
  - `.start()` 를 통해 `session-id`:`sess`+`Date.now()` 가 만들어짐.
  - `.set()` 을 통해 `jwt: jwt 값` 이 만들어짐.

<br>

---

:cyclone: <b>이번 프로젝트에서 사용될 Vue의 라이프사이클</b> <a href="https://kr.vuejs.org/v2/guide/instance.html#%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4-%EB%8B%A4%EC%9D%B4%EC%96%B4%EA%B7%B8%EB%9E%A8">(Vue 라이프사이클 참고 공식 문서)</a>

- Vue instance 생성 (`create`)
- DOM 에 부착 (`mounted`)
- 업데이트 (`update`)
- 사라짐 (`destroy`)

---

<br>

#### (3) create, mounted 과정

> `Home.vue`
>
> ```vue
> <template>
>   <div class="home">
>     <h1>Todo with Django</h1>
>   </div>
> </template>
> 
> <script>
> import router from '../router'
> 
> export default {
>   name: 'home',
>   components: {
>     
>   },
>   methods: {
>     checkLoggedIn() {
>       this.$session.start()
>       if (!this.$session.has('jwt')) {
>         router.push('/login')
>       }
>     }
>   },
>   // DOM 에 Vue instance 가 mount 될 때마다 checkLoggedIn 이 실행되어 로그인 여부를 체크
>   mounted () { // Home Vue 인스턴스가 실행될 때 마다 실행될 내용들
>     this.checkLoggedIn()
>   },
> }
> </script>
> ```

- 현재까지의 상황은 로그인을 하면 Home.vue의 template 부분으로 이동하게 된다.

<br>

### 6.4 django로 백엔드 로직 구성

#### (1) `todo create`

> `serializers.py`
>
> ```python
> from rest_framework import serializers
> from .models import Todo
> 
> class TodoSerializer(serializers.ModelSerializer):
>     class Meta:
>         model = Todo
>         fields = ('id', 'user', 'title', 'completed',)
> ```

> `todoback` > `urls.py`
>
> ```python
> from django.contrib import admin
> from django.urls import path, include
> from rest_framework_jwt.views import obtain_jwt_token
> 
> urlpatterns = [
>     path('api/v1/', include('todos.urls')),
>     path('api-token-auth/', obtain_jwt_token), # user 한테 jwt 토큰을 발급해 주는 곳
>     path('admin/', admin.site.urls),
> ]
> ```

> `todos` > `urls.py`
>
> ```python
> from django.urls import path
> from . import views
> 
> urlpatterns = [
>     path('todos/', views.todo_create)
> ]
> ```

> `todos` > `views.py`
>
> ```python
> from rest_framework.response import Response
> from django.shortcuts import render
> from rest_framework.decorators import api_view, permission_classes, authentication_classes
> from rest_framework.permissions import IsAuthencated
> from rest_framework.authentication import JSONWebTokenAuthentication
> from .serializers import TodoSerializer
> 
> @api_view(['POST'])
> # 인증받은 사용자만 허가(로그인 여부만 체크)
> @permission_classes((IsAuthencated, )) # 이거는 반드시 튜플로 넣어줘야 한다.
> # jwt 인증
> @authentication_classes((JSONWebTokenAuthentication, ))
> def todo_create(request):
>     serializer = TodoSerializer(data=request.POST)
>     if serializer.is_valid():
>         serializer.save()
>         return Response(serializer.data)
>     return Response(status=400)
> ```
>
> - 위와 같은 코드는 데코레이터가 너무 많아서 다소 복잡하다.
> - 사실 `settings.py`에서 `REST_FRAMEWORK`에서  DEFAULT 값으로 `@permission_classes`, `@authentication_classes` 관련된 부분을 이미 선언해줬기 때문에 두 데코레이터는 작성하지 않고 아래와 같이 작성해도 무방하다.
>
> ```python
> from rest_framework.response import Response
> from django.shortcuts import render
> from rest_framework.decorators import api_view, permission_classes, authentication_classes
> # from rest_framework.permissions import IsAuthencated 이 구문도 필요 없으므로 주석 처리
> # from rest_framework.authentication import JSONWebTokenAuthentication 이 구문도 필요 없으므로 주석 처리
> from .serializers import TodoSerializer
> 
> @api_view(['POST'])
> # settings.py 에 DEFAULT 로 설정했기 때문에 아래 두 데코레이터는 설정하지 않아도 된다.
> # @permission_classes((IsAuthencated, ))
> # @authentication_classes((JSONWebTokenAuthentication, ))
> def todo_create(request):
>     serializer = TodoSerializer(data=request.POST)
>     if serializer.is_valid():
>         serializer.save()
>         return Response(serializer.data)
>     return Response(status=400)
> ```

- 여기까지 하고 django server를 다시 켠 후 ` http://127.0.0.1:8000/api/v1/todos/ `로 들어가면 JWT 인증을 하지 않은 상태이므로 401 error(Unauthorized) 상태가 발생한다.

  ```
  Unauthorized: /api/v1/todos/
  [19/Nov/2019 11:42:14] "GET /api/v1/todos/ HTTP/1.1" 401 3801
  ```

- 이를 해결하기 위해 Postman으로 실습을 해보자.

---

:memo: <b>Postman으로 확인하기</b> 

- <b>[STEP 1] token 값 받아오기</b>

  username, password : superuser 정보 입력

  ![001_](https://user-images.githubusercontent.com/52685250/69112192-07900180-0ac3-11ea-88b3-6d98b2a1348a.jpg)

- <b>[STEP 2] API 받아오기</b>

  아래와 같은 경우 Authorization Header에 JWT를 붙여서 요청하지 않은 경우이므로 오류가 발생한다.

  ![002](https://user-images.githubusercontent.com/52685250/69112197-07900180-0ac3-11ea-985a-dd0ad793c0b4.JPG)

- <b>[STEP 3] Authorization Header에 JWT를 붙여 API 받아오기</b>

  :warning: <b>주의사항 : token값 앞에 반드시 <u>JWT(대문자로 작성)</u>을 쓰고 <u>공백을 한칸 확보</u>해준다!</b>

  ![003_](https://user-images.githubusercontent.com/52685250/69112196-07900180-0ac3-11ea-9c0f-4a445912a4a1.jpg)

---

<br>

#### (2) `todo update, delete`

> `views.py`
>
> ```python
> @api_view(['PUT', 'DELETE'])
> def todo_update_delete(request, id): # api 만들 때는 pk 보다는 id 라고 작성하자.
>     todo = get_object_or_404(Todo, pk=id)
>     if request.method == 'PUT':
>         # 왼쪽 인자(todo) : 기존의 todo / 오른쪽 인자(data=request.data) : 새로 작성한 todo
>         serializer = TodoSerializer(todo, data=request.data)
>         if serializer.is_valid():
>             serializer.save()
>             return Response(serializer.data)
>         return Response(serializer.errors, status=400)
>     elif request.method == 'DELETE':
>         todo.delete()
>         # 204 : 해당하는 컨텐츠가 없는 경우(삭제를 했기 때문에 해당 데이터가 이제 존재하지 않음을 알려줌)
>         return Response(status=204)
> ```

> `urls.py`
>
> ```python
> path('todos/<int:id>/', views.todo_update_delete) # 구문 추가
> ```

- Postman에서 확인하기

- `PUT`

  ![004](https://user-images.githubusercontent.com/52685250/69117406-e6371180-0ad2-11ea-9eaa-64eb13917690.JPG)

  PUT의 경우도 Authorization Header에 JWT를 붙인 token 값도 함께 반드시 전송해야 Authorization error가 발생하지 않는다.

  ![005](https://user-images.githubusercontent.com/52685250/69117407-e6371180-0ad2-11ea-9ef4-c0aa3c860cd7.JPG)

- `DELETE`

- 정상적으로 동작하면 아무것도 안 뜨고 Status에 `204 No Content`가 뜨면 된다.

  ![006](https://user-images.githubusercontent.com/52685250/69117609-96a51580-0ad3-11ea-9357-096b34c1b4aa.JPG)

<br>

#### (3) user 회원가입 기능 구현

> `serializers.py`
>
> ```python
> from rest_framework import serializers
> from django.contrib.auth import get_user_model
> from .models import Todo
> 
> User = get_user_model()
> # 이 아래부터는 get_user_model() 대신에 User 라고 쓰면 된다.
> 
> class TodoSerializer(serializers.ModelSerializer):
>     class Meta:
>         model = Todo
>         fields = ('id', 'user', 'title', 'completed',)
> 
> 
> class UserCreationSerializer(serializers.ModelSerializer):
>     class Meta:
>         model = User
>         fields = ('id', 'username', 'password',)
> ```

> `views.py`
>
> ```python
> from rest_framework.permissions import IsAuthenticated, AllowAny
> from .serializers import TodoSerializer, UserCreationSerializer
> 
> @api_view(['POST'])
> # 이 경우 회원가입 하는 경우에만 로그인여부를 판단하지 않도록 @permission_classes 데코레이터를 사용하고
> # AllowAny를 튜플형태로 추가해준다.
> @permission_classes((AllowAny, ))
> def user_signup(request):
>     serializer = UserCreationSerializer(data=request.data)
>     if serializer.is_valid(raise_exception=True):
>         serializer.save()
>         return Response({'message': '회원가입이 성공적으로 완료되었습니다.'})
> ```

> `urls.py`
>
> ```python
> path('users/', views.user_signup) # 구문 추가
> ```

- Postman으로 확인하기

![007](https://user-images.githubusercontent.com/52685250/69118054-5a72b480-0ad5-11ea-965b-7cd0bacd43c3.JPG)

- 하지만 현재 상황은 비밀번호가 암호화되지 않고 그대로 노출되어 있다. 그래서 djangorestframework에서는 비밀번호 암호화 설정을 별도로 해줘야 한다.
- `.set_password()` 메소드를 통해 해시 값으로 비밀번호를 암호화 시켜준다. <a href="https://docs.djangoproject.com/en/2.2/ref/contrib/auth/#django.contrib.auth.models.User.set_password" target="_blank">(`set_password` 참고 공식 문서)</a>

> `views.py`
>
> ```python
> # if 문 안에 아래 세 줄 추가
> user = serializer.save()
> user.set_password(request.data.get('password'))
> user.save()
> ```

<br>

#### (4) user의 정보 보기 기능 구현

> `serializers.py`
>
> ```python
> class UserSerializer(serializers.ModelSerializer):
>     # 없을 수도 있지만 기본적으로 여러 개 들어가므로 many=True 속성을 써준다.
>     todo_set = TodoSerializer(many=True)
>     class Meta:
>         model = User
>         fields = ('id', 'username', 'todo_set',)
> ```

> `views.py`
>
> ```python
> from django.contrib.auth import get_user_model
> from django.http import HttpResponseForbidden # return HttpResponseForbidden()을 쓰기 위해 작성한 import 구문
> 
> User = get_user_model()
> 
> ...
> 
> @api_view(['GET'])
> def user_detail(request, id):
>     user = get_object_or_404(User, pk=id)
>     if request.user != user:
>         return HttpResponseForbidden()
>         # return Response(status=403) 으로 작성해도 위와 같은 동작
>     serializer = UserSerializer(user)
>     return Response(serializer.data)
> ```

> `urls.py`
>
> ```python
> path('users/<int:id>/', views.detail), # 구문 추가
> ```

![008](https://user-images.githubusercontent.com/52685250/69119662-9e1bed00-0ada-11ea-9533-97b5588bfa52.JPG)

- 만약 작성한 todo 내용이 없는 user인 경우 아래와 같이 출력된다.

![123213](https://user-images.githubusercontent.com/52685250/69119993-a0cb1200-0adb-11ea-9a1b-ff4db81a5fa9.JPG)

<br>

### 6.5 vue로 프론트엔드 로직 구성

#### (1) `TodoList.vue` 구성(CRUD 중 `R`)

> `components` > `TodoList.vue` : 기본 세팅
>
> ```vue
> <template>
>   <div class="todo-list">
> 
>   </div>
> </template>
> 
> <script>
>   export default {
>     name: 'TodoList',
>   }
> </script>
> 
> <style>
> 
> </style>
> ```

> `Home.vue`
>
> - `TodoList` 컴포넌트 등록
>
> ```vue
> <template>
>   <div class="home">
>     <h1>Todo with Django</h1>
>     <TodoList/>
>   </div>
> </template>
> 
> <script>
> import TodoList from '@/components/TodoList'
> ...
>   components: {
>     TodoList
>   },
> ...
> </script>
> ```

- `npm i jwt-decode` : jwt를 deocde하여 user 정보만 가져와야 한다.

  ```js
  const user_id = jwtDecode(token).user_id
  axios.get(`http://127.0.0.1:8000/api/v1/users/${user_id}/`, requestHeader)
  ...
  ```

- 지금까지 `Home.vue` 상황

  ```vue
  <template>
    <div class="home">
      <h1>Todo with Django</h1>
      <TodoList :todos="todos" />
    </div>
  </template>
  
  <script>
  import router from '../router'
  import TodoList from '@/components/TodoList'
  import axios from 'axios'
  import jwtDecode from 'jwt-decode'
  
  export default {
    name: 'home',
    components: {
      TodoList
    },
    data() {
      return {
        todos: [],
      }
    },
    methods: {
      checkLoggedIn() {
        this.$session.start()
        if (!this.$session.has('jwt')) {
          router.push('/login')
        }
      },
      getTodos() {
        this.$session.start()
        const token = this.$session.get('jwt')
        const requestHeader = {
          headers: {
            Authorization: 'JWT ' + token
          }
        }
        const user_id = jwtDecode(token).user_id
        console.log(jwtDecode(token))
        axios.get(`http://127.0.0.1:8000/api/v1/users/${user_id}/`, requestHeader)
        .then(res => {
          console.log(res)
          this.todos = res.data.todo_set
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
    // DOM 에 Vue instance 가 mount 될 때마다 checkLoggedIn 이 실행되어 로그인 여부를 체크
    mounted () { // Home Vue 인스턴스가 실행될 때 마다 실행될 내용들
      this.checkLoggedIn()
      this.getTodos()
    },
  }
  </script>
  ```

- `console.log(jwtDecode(token))` 출력 형태 (payload 부분만 출력됨)

  아래 사진과 같이 `user_id`를 확인할 수 있다. 그래서 `jwtDecode(token).user_id` 값을 axios의 주소에 사용할 수 있다.

  ![009](https://user-images.githubusercontent.com/52685250/69121054-a118dc80-0ade-11ea-89d7-b79b20e4f468.JPG)

- `console.log(res)` 출력 형태

  ![010](https://user-images.githubusercontent.com/52685250/69123964-120fc280-0ae6-11ea-9e7f-5ac70df48f6d.JPG)

- `TodoList.vue`에 props 정의 및 template 작성

  ```vue
  <template>
    <div class="todo-list">
      <div class="card" v-for="todo in todos" :key="todo.id">
        <div class="card-body">
          <span>{{ todo.title }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
    export default {
      name: 'TodoList',
      props: {
        todos: {
          type: Array,
          required: true,
        }
      }
    }
  </script>
  
  <style>
  
  </style>
  ```

- 결과 화면

  ![011](https://user-images.githubusercontent.com/52685250/69124186-94988200-0ae6-11ea-986e-4a03cd0e5775.JPG)

  

<br>

#### (2) `TodoInput.vue` 구성(CRUD 중 `C`)

> `TodoInput.vue` - 기본 세팅
>
> ```vue
> <template>
>   <div class="todo-input">
>     <form class="input-group mb-3">
>       <input type="text" class="form-control">
>       <button type="submit" class="btn btn-primary">+</button>
>     </form>
>   </div>
> </template>
> 
> <script>
>   export default {
>     name: 'TodoInput',
>   }
> </script>
> 
> <style>
> 
> </style>
> ```

> `Home.vue`
>
> ```vue
> <template>
>   <div class="home">
>     <h1>Todo with Django</h1>
>     <TodoInput/> <!-- 추가 -->
>     <TodoList :todos="todos" />
>   </div>
> </template>
> 
> <script>
> ...
> import TodoInput from '@/components/TodoInput'
> ...
> 
> export default {
>   ...
>   components: {
>     TodoList,
>     TodoInput, // 컴포넌트 등록
>   },
>   ..
> }
> </script>
> ```

- input란에 입력 후 TodoList에 추가하려면 `TodoInput.vue`에서 `Home.vue`로 emit으로 올려 보낸 후 다시 `TodoList.vue`로 내려 보내야 한다.(데이터 이동 방향 주의!)

> `TodoInput.vue`
>
> ```vue
> <template>
>   <div class="todo-input">
>     <form class="input-group mb-3" @submit.prevent="createTodo"> <!-- submit 시에는 prevent를 꼭 쓰자! -->
>       <input type="text" class="form-control" v-model="title">
>       <button type="submit" class="btn btn-primary">+</button>
>     </form>
>   </div>
> </template>
> 
> <script>
>   export default {
>     name: 'TodoInput',
>     data() {
>       return {
>         title: ''
>       }
>     },
>     methods: {
>       createTodo() {
>         this.$emit('createTodo', this.title)
>         this.title = '' // title을 보낸 후 empty string으로 초기화 시켜야 한다.
>       }
>     }
>   }
> </script>
> 
> <style>
> 
> </style>
> ```

> `Home.vue`
>
> - `template` 부분 : `<TodoInput @createTodo="createTodo"/>` 구문으로 수정
>
> - `script` 부분 - methods에 `createTodo` 함수  추가
>
>   ```js
>   createTodo(title) {
>     this.$session.start() // 세션 활성화
>     const token = this.$session.get('jwt')
>     const requestHeader = {
>       headers: {
>         Authorization: 'JWT ' + token
>       }
>     }
>     const user_id = jwtDecode(token).user_id
>     const requestForm = new FormData()
>     // 아래 두 줄이 Postman의 body로 들어가는 것이다.
>     requestForm.append('user', user_id)
>     requestForm.append('title', title)
>   
>     axios.post('http://127.0.0.1:8000/api/v1/todos/', requestForm, requestHeader)
>       .then(res => {
>         this.todos.push(res.data)
>         console.log(res) // [참고 그림] - res.data와 같이 data의 위치를 찾기 위해 console을 꼭 찍어보자!
>       })
>       .catch(err => {
>         console.log(err)
>       })
>   }
>   ```
>
> - `console.log(res)` 출력 형태 -- [참고 그림]
>
>   ![012](https://user-images.githubusercontent.com/52685250/69126874-83527400-0aec-11ea-92c1-8e5996fda06a.JPG)

---

:heavy_check_mark: <b>Formdata</b>

- 기존 키에 새로운 값을 추가하거나 키가 없는 경우 새로운 키를 추가. (`FormData.append()` 메서드로 key, value 값을 추가한다.)
- 문법 형식 : `FormData.append(name, value)`
- name : value 에 포함되는 데이터 필드 이름
- value : 필드 값

---

- 그러면 아래와 같이 새로운 할 일을 추가하면 TodoList에 항목이 추가되는 것을 볼 수 있다.

  ![013](https://user-images.githubusercontent.com/52685250/69127147-112e5f00-0aed-11ea-941b-25ce32aaa083.JPG)

<br>

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
>   <div class="todo-list">
>     <div class="card" v-for="todo in todos" :key="todo.id">
>       <div class="card-body">
>         <span>{{ todo.title }}</span>
>         <span @click="deleteTodo(todo)">🗑️</span>
>       </div>
>     </div>
>   </div>
> </template>
> 
> <script>
>   import axios from 'axios'
> 
>   export default {
>     name: 'TodoList',
>     props: {
>       todos: {
>         type: Array,
>         required: true,
>       }
>     },
>     methods: {
>       deleteTodo(todo) { // 인자 todo가 있으므로 decode할 필요가 없다.
>         this.$session.start() // 세션 활성화
>         const token = this.$session.get('jwt')
>         const requestHeader = {
>           headers: {
>             Authorization: 'JWT ' + token
>           }
>         }
>         axios.delete(`http://127.0.0.1:8000/api/v1/todos/${todo.id}/`, requestHeader)
>           .then(res => {
>             console.log(res)
>           })
>           .catch(err => {
>             console.log(err)
>           })
>       }
>     }
>   }
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
>   console.log(res)
>   const targetTodo = this.todos.find(function(el) {
>     return el === todo
>   })
>   const idx = this.todos.indexOf(targetTodo)
>   if (idx > -1) {
>     this.todos.splice(idx, 1)
>   }
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
>   <a @click.prevent="logout" href="#">Logout</a> <!-- .prevent 로 기본적인 a 태그 동작(href로 이동시키는 기능)을 지워준다. -->
> ...
> </template>
> 
> <script> // script 부분 새로 추가
> export default {
>   name: 'App',
>   methods: {
>     logout() {
>       this.$session.destroy()
>       this.$router.push('/login') // 로그아웃 후 로그인 페이지로 이동
>     }
>   }
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
>   <div id="app" class="container">
>     <div id="nav">
>       <div v-if="isAuthenticated">
>         <router-link to="/">Home</router-link> |
>         <a @click.prevent="logout" href="#">Logout</a> <!-- .prevent 로 기본적인 a 태그 동작(href로 이동시키는 기능)을 지워준다. -->
>       </div>
>       <div v-else>
>         <router-link to="/login">Login</router-link> <!-- router-link와 to는 정해진 이름이다. -->
>       </div>
>     </div>
>     <div class="row justify-content-center">
>       <router-view class="col-6"/> <!-- 이 곳에서 view가 출력되는 것이다. -->
>     </div>
>   </div>
> </template>
> 
> <script>
> export default {
>   name: 'App',
>   data() {
>     return {
>       isAuthenticated: this.$session.has('jwt')
>     }
>   },
>   updated() {
>     // DOM 이 re-render 될 때 다시 토큰의 존재 여부를 확인
>     this.isAuthenticated = this.$session.has('jwt')
>   },
>   methods: {
>     logout() {
>       this.$session.destroy()
>       this.$router.push('/login') // 로그아웃 후 로그인 페이지로 이동
>     }
>   }
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
>   modules: { // 반드시 modules 라고 해야 한다!
>     auth, // auth module 등록 과정
>   }
> })
> ```

- 로그인, 로그아웃 상태 module 구성

> `auth.js`
>
> ```js
> import jwtDecode from 'jwt-decode'
> 
> const state = {
>   token: null // 처음에는 토큰이 없으므로 null이 기본값
> }
> 
> // getters는 데이터(state)를 변경하지 않음!
> // 데이터를 원본 그대로 혹은 가공된 데이터를 사용한다.
> const getters = { // 로그인 여부 체크와 같은 저장이 필요한 것들을 정의
>   isLoggedIn: function(state) {
>     return state.token ? true : false
>   },
>   requestHeader: function(state) {
>     return {
>       headers: {
>         Authorization: 'JWT ' + state.token
>       }
>     }
>   },
>   userId: function(state) {
>     return state.token ? jwtDecode(state.token).user_id : null
>   }
> }
> 
> // 상태(토큰)을 받아와서 state를 update
> const mutations = {
>   setToken: function(state, token) { // 위에서 정의한 state, django로 부터 받은 token
>     state.token = token
>   }
> }
> 
> // 비동기 로직(axios 로 django 서버에 로그인/로그아웃 요청)
> const actions = {
>   // commit 은 첫 번째 인자로 mutations 에 정의한 함수를 받는다.
>   // 두 번째 인자로 token을 받아서, mutations에 정의된 함수를 통해 state 를 변경한다.
>   login: function(options, token) {
>     options.commit('setToken', token)
>   },
>   // 로그아웃의 경우 추가로 받는 인자는 없고 token의 상태를 null로 변경한다.
>   logout: function(options) { // logout은 token의 상태를 null로 만듬
>     options.commit('setToken')
>   }
> }
> 
> export default { // 여기서 export default는 보통 최하단에 작성한다.
>   state,
>   mutations,
>   actions,
>   getters,
> }
> ```

- 로딩 상태 module 구성

> `auth.js`
>
> ```js
> import jwtDecode from 'jwt-decode'
> 
> const state = {
>   token: null, // 처음에는 토큰이 없으므로 null이 기본값
>   loading: false,
> }
> 
> // getters는 데이터(state)를 변경하지 않음!
> // 데이터를 원본 그대로 혹은 가공된 데이터를 사용한다.
> const getters = { // 로그인 여부 체크와 같은 저장이 필요한 것들을 정의
>   isLoggedIn: function(state) {
>     return state.token ? true : false
>   },
>   requestHeader: function(state) {
>     return {
>       headers: {
>         Authorization: 'JWT ' + state.token
>       }
>     }
>   },
>   userId: function(state) {
>     return state.token ? jwtDecode(state.token).user_id : null
>   }
> }
> 
> // 상태(토큰)을 받아와서 state를 update
> const mutations = {
>   setToken: function(state, token) { // 위에서 정의한 state, django로 부터 받은 token
>     state.token = token
>   },
>   setLoading: function(state, status) {
>     state.loading = status
>   }
> }
> 
> // 비동기 로직(axios 로 django 서버에 로그인/로그아웃 요청)
> // options : actions 에서 사용할 수 있도록 만든 객체, Vuex 에서 제공하는 action 함수에서 사용할 수 있는 option 들이 있는 객체
> const actions = {
>   // commit 은 첫 번째 인자로 mutations 에 정의한 함수를 받는다.
>   // 두 번째 인자로 token을 받아서, mutations에 정의된 함수를 통해 state 를 변경한다.
>   login: function(options, token) {
>     options.commit('setToken', token)
>   },
>   // 로그아웃의 경우 추가로 받는 인자는 없고 token의 상태를 null로 변경한다.
>   logout: function(options) { // logout은 token의 상태를 null로 만듬
>     options.commit('setToken')
>   },
>   startLoading: function(options) {
>     options.commit('setLoading', true)
>   },
>   endLoading: function(options) {
>     options.commit('setLoading', false)
>   },
> }
> 
> export default { // 여기서 export default는 보통 최하단에 작성한다.
>   state,
>   mutations,
>   actions,
>   getters,
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
>   ```js
>       computed: {
>         loading: function() {
>           return this.$store.state.loading
>         }
>       },
>   ```
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
>   ```js
>   computed: {
>     requestHeader: function() {
>       return this.$store.getters.requestHeader
>     }
>   },
>   ```
>
> - methods의 deleteTodo의 아래 구문 삭제 (updateTodo도 동일하게 하면 됨)
>
>   ```js
>   this.$session.start() // 세션 활성화
>   const token = this.$session.get('jwt')
>   const requestHeader = {
>     headers: {
>       Authorization: 'JWT ' + token
>     }
>   }
>   ```
>
>   그리고 axios 안의 두번째 인자(requestHeader)를 `this.requestHeader`로 변경

> `Home.vue`
>
> - computed 추가
>
>   ```vue
>   <script>
>   import { mapGetters } from 'vuex' // import 구문 추가
>   ...    
>     computed: { // computed 구문 추가
>       // `...` spread 문법 -> 각각의 getters
>       // mapGetters 함수의 인자로 들어가는 배열에는 getters 에서 정의한 함수들 중에서 가지고 오고 싶은 getter들을 작성한다.
>       ...mapGetters([
>         'isLoggedIn',
>         'requestHeader',
>         'userId'
>       ])
>     },
>   ...
>   </script>
>   ```
>
> - checkLoggedIn()
>
>   - `this.$session.start()` 삭제
>   - if 조건문 `!this.$session.has('jwt')` 을 `!this.isLoggedIn` 으로 대체
>
> - getTodos()
>
>   ```js
>   // 아래 구문 삭제
>   this.$session.start()
>   const token = this.$session.get('jwt')
>   const requestHeader = {
>     headers: {
>       Authorization: 'JWT ' + token
>     }
>   }
>   const user_id = jwtDecode(token).user_id
>   console.log(jwtDecode(token))
>   ```
>
>   - axios 첫번째 구문 변경
>
>     ```js
>     axios.get(`http://127.0.0.1:8000/api/v1/users/${user_id}/`, requestHeader) // before
>     axios.get(`http://127.0.0.1:8000/api/v1/users/${this.userId}/`, this.requestHeader) // after
>     ```
>
> - createTodo(title)
>
>   ```js
>   // 아래 구문 삭제
>   this.$session.start() // 세션 활성화
>   const token = this.$session.get('jwt')
>   const requestHeader = {
>     headers: {
>       Authorization: 'JWT ' + token
>     }
>   }
>   const user_id = jwtDecode(token).user_id
>   ```
>
>   - `requestForm.append('user', user_id)` => `requestForm.append('user', this.userId)`
>
>   - axios 첫번째 구문 변경
>
>     ```js
>     axios.post('http://127.0.0.1:8000/api/v1/todos/', requestForm, requestHeader) // before
>     axios.post('http://127.0.0.1:8000/api/v1/todos/', requestForm, this.requestHeader) // after
>     ```

> `App.vue`
>
> - computed가 있기 때문에 data, updated 부분 필요 없으므로 삭제
>
>   ```js
>   computed: {
>     isLoggedIn: function() {
>       return this.$store.getters.isLoggedIn
>     }
>   },
>   ```
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

