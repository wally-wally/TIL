# :notebook_with_decorative_cover: 07_Vue - Day06

---

- 기본세팅 : vscode extensions `vetur`, `Vue VSCode Snippets` 설치(설치 순서 반드시 지키자!)
- chrome extension : 현재 페이지가 vue로 작성되었는지 확인 [(다운로드 페이지로 이동)](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd/related)
  - 다운로드 후 아이콘 오른쪽 버튼 > `확장 프로그램 관리` > `파일 URL에 대한 액세스 허용` ON
- 참고 사이트 : <a href="https://kr.vuejs.org/v2/guide/index.html" target="_blank">(Vue.js 공식 홈페이지)</a> <a href="https://github.com/vuejs/vue">(Vue.js 공식 github)</a>

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