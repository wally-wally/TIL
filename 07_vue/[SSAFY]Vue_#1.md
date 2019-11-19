# [SSAFY]Vue_#1(written by wally-wally)

----

**※참고사항※**

- `[SSAFY]Vue_#1`은 정규과정 `Vue`을 진행하면서 강의파일에 없는 추가적인 내용이나 중요하게 다루었던 내용을 상세하게 작성했음.
- 최대한 수업 시간의 모든 내용을 담으려했으나 없는 내용이 있을 수도 있음.
- 기본세팅 : vscode extensions `vetur`, `Vue VSCode Snippets` 설치(설치 순서 반드시 지키자!)
- chrome extension : 현재 페이지가 vue로 작성되었는지 확인 [(다운로드 페이지로 이동)](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd/related)
  - 다운로드 후 아이콘 오른쪽 버튼 > `확장 프로그램 관리` > `파일 URL에 대한 액세스 허용` ON
- 참고 사이트 : <a href="https://kr.vuejs.org/v2/guide/index.html" target="_blank">(Vue.js 공식 홈페이지)</a> <a href="https://github.com/vuejs/vue">(Vue.js 공식 github)</a>

------

<br>

## 1. 11월04일(1일차)

### 1.1 SPA(Single Page Application) <a href="https://poiemaweb.com/js-spa" target="_blank">(참고 문서)</a>

- 서버로부터 완전한 새로운 페이지를 불러오지 않고 현재의 페이지를 동적으로 다시 작성함으로써 특정 부분만 사용자와 소통하는 웹 애플리케이션이나 웹 사이트
- SPA의 가장 중요한 목표이자 핵심가치는 <b><u>사용자 경험(UX) 향상</u></b>이다.
  - 부가적으로 속도의 향상도 기대할 수 있다.
- <b>초기 구동 속도가 다소 느리다</b>는 단점이 있다.
  - 웹 애플리케이션에 필요한 모든 정적 리소스를 최초에 한번 다운로드하므로 초기 구동 속도가 상대적으로 느리다.
- 같은 페이지에서 필요한 부분만 변경되기 때문에 URL 주소가 변경되지 않는다.
- 페이지 전환이 없고 전체 렌더링이 아닌 <b>특정 부분만 동적으로 변한다.</b>
  - link tag를 사용하는 전통적인 웹 방식은 새로운 페이지 요청 시마다 정적 리소스가 다운로드되고 전체 페이지를 다시 렌더링하는 방식을 사용하므로 새로고침이 발생되어 사용성이 좋지 않다.
  - 그리고 변경이 필요없는 부분를 포함하여 전체 페이지를 갱신하므로 비효율적이다. 

<br>

### 1.2 Vue.js의 `MVVM` 패턴 <a href="https://joshua1988.github.io/web-development/vuejs/vuejs-tutorial-for-beginner/" target="_blank">(출처 페이지로 이동)</a>

![31](https://user-images.githubusercontent.com/52685250/68097489-9c5b0280-fefa-11e9-89dd-7b923a4f59c5.JPG)

#### (1) 용어 정리

- `View` : 사용자에게 보이는 화면
- `DOM` : HTML 문서에 들어가는 요소의 정보를 담는 데이터트리
- `ViewModel` : View와 Model을 연결해주는(바인딩 해주는) 중개자 역할
- `DOM Listener` : DOM의 변경내역에 대해 즉각적으로 반응하여 특정 로직을 수행하는 장치
- `Data Binding` : View에 표시되는 내용과 Model의 데이터 동기화
- `Model` : 데이터를 담는 용기 역할을 하며, 보통은 서버에서 가져온 데이터를 자바스크립트 객체 형태로 저장

<br>

#### (2) MVVM 패턴의 특징

- Backend 로직과 Client의 마크업 & 데이터 표현단을 분리하기 위한 구조로 전통적인 MVC 패턴의 방식에서 기인했다.
- 화면 앞단의 회면 동작 관련 로직과 뒷단의 DB 데이터 처리 및 서버 로직을 분리하고, 뒷단에서 넘어온 데이터를 Model 에 담아 View 로 넘어주는 중간 지점이라고 보면 된다.
- <b>데이터 바인딩</b>과 화면 단위를 컴포넌트 형태로 제공하며, 관련 API를 지원하는데에 궁극적인 목적
- Angular에서 지원하는 <b>양방향 데이터 바인딩</b> 을 동일하게 제공
- 하지만 <b>컴포넌트 간 통신</b>의 기본 골격은 React의 <b>단방향 데이터 흐름(부모 -> 자식)</b>을 사용
- 다른 프런트엔드 프레임워크(Angular, React)와 [비교](https://vuejs.org/v2/guide/comparison.html)했을 때 상대적으로 가볍고 빠름.
- 문법이 단순하고 간결하여 <b>초기 학습 비용이 낮고 누구나 쉽게 접근 가능</b>

<br>

### 1.3 Vue 기초

#### (1) binding

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="app"> <!-- View 요소 -->
    {{ message }} <!-- 문자열 표현식 => {{ }} : string interpolation(보간법) -->
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <!-- 기본적으로 vue는 html에서도 작성할 수 있다. -->
  <script> // view model
    const app = new Vue({
      el: '#app', // view model과 id가 app인 view와 binding됐다는 의미
      data: {
        message: 'Hello Vue!'
      }
    })
  </script>
</body>
</html>
```

![03](https://user-images.githubusercontent.com/52685250/68099974-d59a6f00-ff08-11e9-9411-fae55e41d83a.JPG)

:heavy_check_mark: <b>[참고]HTML 문서에서 Vue.js CDN 구문(`<script>`형태)</b> <a href="https://kr.vuejs.org/v2/guide/#%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0" target="_blank">(공식 문서)</a>

```html
<!-- 프로토타이밍 또는 학습용으로 항상 최신버전을 사용할 수 있다. -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

<!-- 상용버전, 속도와 용량이 최적화됨. -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>

<!-- 프로덕션 환경인 경우 새 버전에서 예상치 못한 오류를 방지하기 위해 특정 버전의 빌드 파일을 추가해야 한다. -->
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>

<!-- 기본 ES 모듈을 사용하는 경우 이를 지원하는 ES 모듈 호환 빌드 파일도 있다. -->
<script type="module">
  import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.0/dist/vue.esm.browser.js'
</script>
```

<br>

#### (2) `Vue` vs `Javascript`

- Vue는 반응형 웹이므로 Javascript와는 다르게 글자 입력과 동시에 바로 출력된다.

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <h3>JS</h3>
  <input type="text" id="js-input"> <!-- js용 -->
  <p id="js-p"></p> <!-- JS는 한글자씩 늦게 출력됨  -->

  <h3>Vue</h3>
  <div id="app">
    <input type="text" id="vue-input" v-model="message"> <!-- vue 용-->
    <p id="vue-p">{{ message }}</p> <!-- vue는 반응형 웹이므로 입력과 동시에 글자가 출력됨 -->
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script> <!-- vue를 쓰기 위한 CDN 구문 -->
  <script>
    // JS
    const input = document.querySelector('#js-input')
    input.addEventListener('keydown', function (e){ // 'keydown' : 키 누름 이벤트
      const value = e.target.value
      document.querySelector('#js-p').innerText = value
    })

    // Vue
    const app = new Vue({
      el: '#app', // el, data는 vue에서 정해진 이름임
      data: {
        message: ''
      }
    })
  </script>
</body>
</html>
```

- vue 관련 chorme extension 설치 후 console창에서 다음과 같이 확인할 수 있다.

![04](https://user-images.githubusercontent.com/52685250/68100335-e21fc700-ff0a-11e9-80c1-5eeb426a8175.JPG)

<br>

### 1.4 인스턴스 옵션

#### (1) el

- Vue 인스턴스와 DOM 을 연결(마운트, mount) 하는 옵션

- View - View Model 을 연결 시킨다.

- Vue 인스턴스 초기화에서 `.$mount()`로 대체 가능하다.

- HTML의 id 나 class 와 마운트가 가능하다.

  `el: '.myClass'` : `myClass` 클래스와 마운트 / `el: '#app'` : `app` id와 마운트

  ```html
  <body>
    {{ message }} <!-- view랑 연결되어 있지 않으므로(mount 안 됨) vue의 속성을 받지 못하고 저 글자 그대로 출력된다. -->
    <div class="myClass" id="app">
      {{ message }}
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script> // view model
      const app = new Vue({
        el: '#app',
        data: {
          message: 'Hello Vue!'
        }
      })
    </script>
  </body>
  ```

<br>

#### (2) data

- Vue 인스턴스의 데이터 객체, 인스턴스의 `속성` 이라고도 부름

- 데이터 객체는 반드시 기본 객체 (`{ }`) 여야 함.

- Vue 인스턴스가 최초 생성되면, `data` 객체 안의 모든 값들을 반응 시스템에 등록한다.

- 이 `data` 객체에 등록된 key에 대해서만 value 수정에 대하여 반응하므로, 최초 생성시 할당할 값이 없다면 `''`, `[]`, `{}`, `0`과 같은 값으로 초기화 해야 한다.

- 객체 내부의 아이템들은 value 로써 모든 타입의 객체를 가질 수 있다. (object, string, integer, array...)

- <b>Vue는 `data`가 변경되면 기본적으로 DOM을 다시 렌더링 한다.</b>(단, `v-once` 같은 디렉티브는 예외)

- 정의된 속성은 인터폴레이션(`{{ }}`)을 통해서 View 에서 렌더링 가능

- data 에서도 이벤트리스너와 비슷한 이유로 <b>화살표 함수를 작성해서는 안 된다.</b>

  ```html
  <body>
    <div id="app">
      {{ message }} - {{ count }}
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
      const app = new Vue({
        el: '#app',
        data: {
          message: 'Hello Vue!',
          count: 0, // count 추가
        }
      })
  
      app.message === app.$data.message // app.$data.message 이게 더 안전
      app.$data
    </script>
  </body>
  ```

<br>

#### (3) methods

- Vue 인스턴스에 추가할 메소드(사용할 다양한 함수들)를 정의하는 곳

- (주의) <b>메소드를 정의하는데에 화살표 함수를 사용해서는 안 된다.</b>

  ```html
  <body>
    <div id="app"> <!-- View 요소 -->
      {{ message }} - {{ count }} <!-- 문자열 표현식 => {{ }} : string interpolation(보간법) -->
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <!-- 기본적으로 vue는 html에서도 작성할 수 있다. -->
    <script> // view model
      const app = new Vue({
        el: '#app', // view model과 id가 app인 view와 binding됐다는 의미
        data: {
          message: 'Hello Vue!',
          count: 0,
        },
        methods: {
          // 표현식
          plus: function() {
            this.count++ // Vue instance 내에서는 data 내의 값들에 this 로 접근가능
          },
          // 선언식
          minus() {
            this.count--
          }
        }
      })
    </script>
  </body>
  ```

  ![05](https://user-images.githubusercontent.com/52685250/68100821-902c7080-ff0d-11e9-9d79-ac4ec851dfa9.JPG)

- 만약 함수를 화살표 함수로 작성하면 `undefined`로 뜨면서 숫자가 카운팅되지 않는다.

  이 때 화살표 함수가 가리키는 곳은 가장 최상위 객체인 `window`를 가리킨다.

  ```html
  <body>
    <div id="app"> <!-- View 요소 -->
      {{ message }} - {{ count }} <!-- 문자열 표현식 => {{ }} : string interpolation(보간법) -->
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <!-- 기본적으로 vue는 html에서도 작성할 수 있다. -->
    <script> // view model
      const app = new Vue({
        el: '#app', // view model과 id가 app인 view와 binding됐다는 의미
        data: {
          message: 'Hello Vue!',
          count: 0,
        },
        methods: {
          // 표현식
          plus: () => {
            this.count++ // Vue instance 내에서는 data 내의 값들에 this 로 접근가능
          },
          // 선언식
          minus() {
            this.count--
          }
        }
      })
    </script>
  </body>
  ```

  ![06](https://user-images.githubusercontent.com/52685250/68100822-902c7080-ff0d-11e9-81ff-358e2a88c6dc.JPG)

<br>

---

:heavy_check_mark: <b>일반 함수 vs 화살표 함수</b> - `arrow_this.html`

```html
<body>
  <button id="function">function</button>
  <button id="arrow">arrow function</button>
  <script>
    const functionButton = document.querySelector('#function')
    const arrowButton = document.querySelector('#arrow')

    functionButton.addEventListener('click', function(event) {
      console.log('====function====')
      console.log(this)
    })

    arrowButton.addEventListener('click', event => {
      console.log('====arrow function====')
      console.log(this)
    })
  </script>
</body>
```

![07](https://user-images.githubusercontent.com/52685250/68100918-23fe3c80-ff0e-11e9-8f6e-8d86aca68bbd.JPG)

- this는 어느 스코프 안에 있는지에 따라 출력되는 값이 달라진다.

  - function 표현식 : 함수호출 또는 함수 내 함수에서 호출하는 경우 window 객체가 뜬다.

    ```javascript
    const greeting = function() {
      console.log(this)
    }
    
    greeting() // 호출되는 위치가 전역쪽이라 전역 객체인 window가 나옴
    // Window {parent: Window, postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, …}
    ```

  - 메서드 호출 : 해당 객체가 뜬다.

    ```javascript
    const you = {
      name: 'kim',
      greeting
    }
    
    you.greeting() // 여기서 this는 해당 오브젝트(객체)
    // {name: "kim", greeting: ƒ}
    ```

  - arrow function : 함수 내 함수에서 사용한다.

    arrow에서 this는 호출 위치와 상관없이 상위 스코프 this를 가리킨다. (참고용어. lexical this)

    따라서, 메소드 선언을 arrow 함수로 하게 되면, 해당 오브젝트의 상위 스코프인 전역 객체 window 가 바인딩(binding) 된다.

    ```javascript
    const arrowGreeting = () => console.log(this)
    const me = {
      name: 'tak',
      arrowGreeting
    }
    
    arrowGreeting() // window / Window {parent: Window, postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, …}
        
    // 그렇다면 arrow 를 언제 활용? - 함수 내의 함수!
    const num = {
      numbers: [1],
      print: function() {
        console.log(this) // num 객체 / {numbers: Array(1), print: ƒ}
        console.log(this.numbers) // [1]
        this.numbers.forEach(function(num) {
          console.log(num) // 1
          console.log(this) // '1. function 표현식'에 의해 window가 뜬다. / Window {parent: Window, postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, …}
        })
      }
    }
    num.print()
    
    const num2 = {
      numbers: [1],
      print: function() {
        console.log(this) // num2 객체 / {numbers: Array(1), print: ƒ}
        console.log(this.numbers) // [1]
        this.numbers.forEach(num => {
          console.log(num) // 1
          console.log(this) // num2 객체 / {numbers: Array(1), print: ƒ} -- 이거만 위와 바뀜
          // 여기서 console.log(this) 때문에 arrow를 사용한다.
        })
      }
    }
    num2.print()
    ```

- 이벤트 리스너로 돌아와서 이벤트 리스너에서의 콜백 함수는 특별하게 function 키워드의 경우에는 이벤트 리스너를 호출한 대상(event.target)을 뜻한다.

  따라서, 호출한 대상을 원하면 this 를 사용할 수 있다.

  다만 arrow function 에 경우 상위 스코프를 지칭하기 때문에 window 객체가 출력된다.

<br>

### 1.5 Vue directive① (지시문) - `02_vue_todo_app.html`

---

:checkered_flag: directive는 `v-` 접두사가 있는 특수 속성(attr)이며, directive 속성의 값은 단일 JS 표현식이다.

---

#### (1) v-for, v-if

- `v-if` : 특정 조건을 만족할때만 보여지도록(렌더링되도록) 할 수 있다.
- `v-else`는 반드시 `v-if` 엘리먼트 바로 뒤에 와야 인식 가능.
- `v-else-if` 도 존재.
- <b>`v-bind:key`를 필요로 한다!</b>

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="app">
    <li v-for="todo in todos" v-if="!todo.completed">
      {{ todo.content }}
    </li>
    <li v-else>[완료!]</li>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        todos: [
          {
            content: '점심 메뉴 고민',
            completed: true,
          },
          {
            content: '사다리 타기',
            completed: false,
          },
          {
            content: '낮잠 자기',
            completed: false,
          },
          {
            content: '야자 하기',
            completed: false,
          },
        ]
      }
    })
  </script>
</body>
</html>
```

![08](https://user-images.githubusercontent.com/52685250/68102136-abe74500-ff14-11e9-88b4-f4fe3a0da90f.JPG)

:heavy_check_mark: <b>우선순위 주의사항!</b>

- <b><u>동일한 노드에서는 `v-for` 가 `v-if` 보다 높은 우선순위를 가짐</u></b>
- 즉, `v-if`는 루프가 반복될때마다 실행! (일부 항목만 렌더링 할 때 유용)
- [참고] Vue-CLI 환경에서는 기본적으로 `v-for`와 `v-if`를 함께 사용하면 에러를 발생시키도록 eslint 설정이 되어 있다.

<br>

:heavy_check_mark: <b>`v-for`를 사용하여 객체의 속성을 반복할 수 있는데 이 때 최대 세 개의 전달 인자를 제공할 수 있다.</b>

- 첫 번째 인자 : 객체의 `value`, 두 번째 인자: 객체의 `key`, 세 번째 인자: 객체의 `index`

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      <p v-for="(a, b, c) in bookData">
        {{ a }} - {{ b }} - {{ c }}
      </p>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
      const app = new Vue({
        el: 'div',
        data: {
          bookData: {
            title: '123',
            author: 'wally',
            publishedAt: '2018-06-07'
          }
        }
      })
    </script>
  </body>
  </html>
  ```

  ```
  123 - title - 0
  
  wally - author - 1
  
  2018-06-07 - publishedAt - 2
  ```

<br>

#### (2) v-on

- JS 에서 이벤트리스너랑 비슷한 역할을 함

- `v-on` 디렉티브를 사용하여 DOM 이벤트 핸들링이 기능하다.

- 이벤트 리스너는 HTML element 를 querySelector 로 가져와 이벤트를 붙여줬다면, Vue 는 <b>HTML element 자체에 이벤트를 붙여준다.</b>

- `v-on:` 뒤에 오는 친구(`click` 같은거)를 `전달인자` 라고 한다. `:` 을 붙여서 사용하는 디렉티브 바로 뒤에 붙는 친구들을 지칭한다.

- 첫 번째 방법 - `inline 방식`

  ```html
  <div id="app">
    <li v-for="todo in todos" v-if="!todo.completed" v-on:click="todo.completed=true">
      {{ todo.content }}
    </li>
    <li v-else>[완료!]</li>
  </div>
  ```

- 두 번째 방법 - `method 정의`

  ```html
  <body>
    <div id="app">
      <li v-for="todo in todos" v-if="!todo.completed" v-on:click="check(todo)"> 
      <!-- v-on:click="check(todo)"에 있는 todo는 for문에서 돌고 있는 todo임 -->
        {{ todo.content }}
      </li>
      <li v-else v-on:click="check(todo)">[완료!]</li>
    </div>
  
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
      const app = new Vue({
        el: '#app',
        data: {
          todos: [
            {
              content: '점심 메뉴 고민',
              completed: true,
            },
            {
              content: '사다리 타기',
              completed: false,
            },
            {
              content: '낮잠 자기',
              completed: false,
            },
            {
              content: '야자 하기',
              completed: false,
            },
          ]
        },
        methods: {
          check: function(todo) { // function의 인자로 들어가는 todo는 내가 임의로 정하는 변수명
            todo.completed = !todo.completed // [완료!] 상태에서 다시 누르면 원래대로 돌아가기
          }
        }
      })
    </script>
  </body>
  ```

<br>

#### (3) v-bind

- HTML element 의 <b><u>속성</u></b> 값을 변경할 때 사용(절대로 HTML 태그의 값을 다루는 것이 아니다.)

- HTML5 속성 뿐만 아니라, Vue 내부에서 사용하는 속성들도 `v-bind`를 통해 조작한다.

  ```html
  <!-- <div id="app"> 바로 아래에 추가 -->
  <div v-bind:class="classRed">red</div>
  <img v-bind:src="vueImage" alt="todo-list">
  <img :src="vueImage" alt="todo-list"> <!-- v-bind는 생략할 수도 있음(shortcut) -->
  
  <script>
    const app = new Vue({
      el: ~,
      data: {
        todos: [
        ...
        ],
        vueImage: '~',
        classRed: 'red',
      }
    ...
    })
    ...
  </script>
  ```

<br>

:heavy_check_mark: <b>강아지, 고양이 랜덤 사진 페이지 Vue.js로 다시 작성</b> - `03_dogs_and_cats_vue.html`

- 강아지, 고양이 사진 장수, 전체 사진 장수 기능도 추가해 봄

```html
<body>
  <h1>Random Dog & Cat Image</h1>
  <div id="app">
    <button v-on:click="getDogImage">Dog Image On!</button> <span v-on:click="getDogImage">{{ dogCount }}장</span> &nbsp;
    <button v-on:click="getCatImage">Cat Image On!</button> <span v-on:click="getCatImage">{{ catCount }}장</span> &nbsp; &nbsp; &nbsp;
    <span>Total Picture Count : <b>{{ dogCount + catCount }}</b></span>
    <br>
    <hr>
    <span v-for="image in images">
      <img v-bind:src="image" alt="img" v-if="image"> <!-- 엑박 지우기 : v-if="image"-->
    </span>
  </div>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        images: [], // 사진을 누적해서 보여주려면 빈 array 선언후 위에서 v-for문으로 돌린다.
        dogCount: 0,
        catCount: 0,
      },
      methods: {
        getDogImage: function () {
          const URL = 'https://dog.ceo/api/breeds/image/random'
          axios.get(URL)
            .then(response => {
              this.images.push(response.data.message) // .push() : JS에서 array에 요소 추가
              this.dogCount += 1
            })
        },
        getCatImage: function () {
          const URL = 'https://api.thecatapi.com/v1/images/search'
          axios.get(URL)
            .then(response => {
              this.images.push(response.data[0].url) // .push() : JS에서 array에 요소 추가
              this.catCount += 1
            })
        }
      }
    })
  </script>
</body>
```

![213213321](https://user-images.githubusercontent.com/52685250/68106387-dccf7600-ff24-11e9-8141-eb4f857b9749.JPG)

<br>

---

<br>

## 2. 11월05일(2일차)

### 2.1 Vue directive②

#### (1) v-model

- input tag의 value - <b>View</b> <------> v-model <------> data(<b>VM</b>)

- `input` / `textarea` 와 같은 요소에서 사용자의 입력과 <b>양방향 데이터 바인딩</b>을 공유할 때 사용한다.

- 일반적인 HTML 에서의 초기값인 `value`, `checked`, `selected` 등의 속성을 무시한다.

- `v-model`은 HTML의 `<input>`, `<select>`, `<textarea>` 태그, Vue의 `components`에서만 사용가능하다.

- input tag와 VM의 newTodo와 동기적으로 연결

  ```html
  <body>
    <div id="app">
      ...
      <div>
        <input type="text" v-model="newTodo" v-on:keyup.enter="addTodo"> <!-- input tag 추가 -->
        <button v-on:click="addTodo">+</button> <!-- 버튼을 눌러서도 입력 가능 -->
      </div>
    </div>
    <script>
      ...
      const app = new Vue({
        ...
        newTodo: '', // newTodo 추가
        vueImage: '~'
      })
    </script>
  </body>
  ```

  ```javascript
  // methods에 addTodo 함수 추가
  addTodo: function() {
    this.todos.push({
      content: this.newTodo,
      completed: false,
    })
    this.newTodo = '' // 입력 후 enter 누르면 input 안에 있는 내용은 clear됨
  }
  ```

- 완료된 목록 사라지게 하기

  ```html
  <body>
    <div id="app">
      ...
      <footer> <!-- footer에 버튼 추가 -->
        <!-- 아래 버튼 누르면 완료항목 전부 삭제 -->
        <button v-on:click="clearCompleted">Clear</button>
      </footer>   
    </div>
  </body>
  ```

  ```javascript
  // methods에 clearCompleted 함수 추가
  clearCompleted: function() { // completed가 false 인 객체만 모아서 배열로 return
    const notCompletedTodos = this.todos.filter(todo => {
      return !todo.completed
    })
    this.todos = notCompletedTodos
  }
  ```

- 리스트 대신에 checkbox 형태로 변경

  ```html
  <body>
    <div id="app">
      <img v-bind:src="vueImage" alt="todo-list">
      <div v-for="todo in todos">
        <input type="checkbox" v-model="todo.completed">
        <span>{{ todo.content }}</span>
      </div>
      <div>
        <input type="text" v-model="newTodo" v-on:keyup.enter="addTodo">
        <button v-on:click="addTodo">+</button>
      </div>
      <footer>
        <button v-on:click="clearCompleted">Clear</button>
      </footer>
    </div>
  
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
      const app = new Vue({
        el: '#app',
        data: {
          todos: [
            {
              content: '점심 메뉴 고민',
              completed: true,
            },
            {
              content: '사다리 타기',
              completed: false,
            },
            {
              content: '낮잠 자기',
              completed: false,
            },
            {
              content: '야자 하기',
              completed: false,
            },
          ],
          newTodo: '',
          vueImage: 'https://~~~'
        },
        methods: {
          check: function(todo) {
            todo.completed = !todo.completed
          },
          addTodo: function() {
            this.todos.push({
              content: this.newTodo,
              completed: false,
            })
            this.newTodo = ''
          },
          clearCompleted: function() {
            const notCompletedTodos = this.todos.filter(todo => {
              return !todo.completed
            })
            this.todos = notCompletedTodos
          }
        }
      })
    </script>
  </body>
  ```

- [참고] 텍스트 영역의 보간 (`<textarea>{{ text }}</textarea>`)은 작동하지 않는다. 대신 `v-model`을 사용해야 한다.

  ```html
  <!-- before -->
  <textarea>{{ text }}</textarea>
  
  <!-- after -->
  <p>{{ message }}</p>
  <textarea v-model="message"></textarea>
  ```

- [참고]셀렉트 옵션

  ```html
  <select v-model="selected">
    <!-- inline object literal -->
    <option v-bind:value="{ number: 123 }">123</option>
  </select>
  ```

  ```javascript
  // 선택 하면:
  typeof vm.selected // -> 'object'
  vm.selected.number // -> 123
  ```

- [참고] `v-for`를 이용한 동적 옵션 렌더링

  ```html
  <select v-model="selected">
    <option v-for="option in options" v-bind:value="option.value">
      {{ option.text }}
    </option>
  </select>
  <span>Selected: {{ selected }}</span>
  ```

  ```js
  new Vue({
    el: '...',
    data: {
      selected: 'A',
      options: [
        { text: 'One', value: 'A' },
        { text: 'Two', value: 'B' },
        { text: 'Three', value: 'C' }
      ]
    }
  })
  ```

  ```
  select 상자에서 One을 선택하면 오른쪽에 Selected: A가 나온다.
  select 상자에서 Two을 선택하면 오른쪽에 Selected: B가 나온다.
  select 상자에서 Three을 선택하면 오른쪽에 Selected: C가 나온다.
  ```

<br>

#### (2) style, class binding 작업

- style binding 작업

  ```html
  <body>
    <div id="app">
      <div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"> <!-- 글자 색상이나 폰트 변경시 v-bind를 반드시 써야 한다. -->
      <!-- 또한 console에서 <div style="{{ activeColor }}">로 작성했을 때 나오는 오류문구를 보면 -->
      <!-- style 지정시 interpolation은 "{ color: activeColor, fontSize: fontSize + 'px' }" 와 같이 써야 한다. -->
        Style test
      </div>
      <img v-bind:src="vueImage" alt="todo-list">
      <div v-for="todo in todos">
        <input type="checkbox" v-model="todo.completed">
        <span>{{ todo.content }}</span>
      </div>
      <div>
        <input type="text" v-model="newTodo" v-on:keyup.enter="addTodo">
        <button v-on:click="addTodo">+</button>
      </div>
      <footer>
        <button v-on:click="clearCompleted">Clear</button>
      </footer>
    </div>
  
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
      const app = new Vue({
        el: '#app',
        data: {
          activeColor: 'red',
          fontSize: 30,
          todos: [
            {
              content: '점심 메뉴 고민',
              completed: true,
            },
            {
              content: '사다리 타기',
              completed: false,
            },
            {
              content: '낮잠 자기',
              completed: false,
            },
            {
              content: '야자 하기',
              completed: false,
            },
          ],
          newTodo: '',
          vueImage: '~~~'
        },
        methods: {
          check: function(todo) {
            todo.completed = !todo.completed
          },
          addTodo: function() {
            this.todos.push({
              content: this.newTodo,
              completed: false,
            })
            this.newTodo = ''
          },
          clearCompleted: function() {
            const notCompletedTodos = this.todos.filter(todo => {
              return !todo.completed
            })
            this.todos = notCompletedTodos
          }
        }
      })
    </script>
  </body>
  ```

- class binding 작업

  체크박스에 체크되면 그 항목에 취소선이 생기면서 옅어짐

  ```html
  <!-- head 태그 안에 style 태그 추가 -->
  <style>
    .completed {
      text-decoration: line-through; /* 취소선 */
      opacity: 0.6;
    }
  </style>
  ```

  ```html
  <!-- before -->
  <div v-for="todo in todos" v-bind:class="{ completed }">
  
  <!-- after -->
  <div v-for="todo in todos" v-bind:class="{ completed: todo.completed }">
      
  <!-- 삼항 연산자를 이용해서도 작성할 수 있다. -->
  <div v-for="todo in todos" v-bind:class="todo.completed ? 'completed' : ''">
  ```

- 지금까지 출력 상황

  체크박스를 선택하면 class에 completed 생성, 체크 해제하면 completed가 없어지는 것을 볼 수 있다.

  ![001](https://user-images.githubusercontent.com/52685250/68169646-4ea0d180-ffb0-11e9-8ce9-8572cd7c7a2f.JPG)
  vue devtools에서도 completed의 값이 바뀜을 볼 수 있다.

  ![002](https://user-images.githubusercontent.com/52685250/68169648-4ea0d180-ffb0-11e9-9f64-884d5bd3d783.JPG)

<br>

#### (3) category 만들기

- methods에 todosByStatus 추가

  ```javascript
  todosByStatus: function() {
    // 진행중인 일(완료되지 않은 일)
    if (this.status === 'active') {
      return this.todos.filter( todo => {
        return !todo.completed
      })
    }
    // 완료된 일
    if (this.status === 'completed') {
      return this.todos.filter( todo => {
        return todo.completed
      })
    }
    return this.todos // all 상태일 때(active, completed 가 아닌, 완료 혹은 미완료가 모두 포함된 배열)
  }
  ```

  ![003](https://user-images.githubusercontent.com/52685250/68169925-3b423600-ffb1-11e9-996d-2631b207092c.JPG)

  ```html
  <select v-model="status">
    <option value="all" selected>all</option>
    <option value="active">active</option>
    <option value="completed">completed</option>
  </select>
  ...
  <!-- todos 대신에 todosByStatus()로 변경 -->
  <div v-for="todo in todosByStatus()" v-bind:class="{ completed: todo.completed }">
  ```

  하지만 현재까지의 상황에서 문제점이 발생했다.

  체크박스에서 active를 선택한 상태에서 항목을 삭제하려고 하면 밑의 항목이 자동으로 선택된다.

- 문제점 해결(1)

  ```html
  <!-- v-bind:key="todo.id" 추가 -->
  <div v-for="todo in todosByStatus()" v-bind:class="{ completed: todo.completed }" v-bind:key="todo.id">
  ```

  ```javascript
  // todos array의 각 원소에 id 추가
  
  // addTodo method에 id:Date.now() 추가
  addTodo: function() {
    this.todos.push({
      id: Date.now(),
      content: this.newTodo,
      completed: false,
    })
    this.newTodo = ''
  },
  ```

  <b>앞으로 v-for 작성할 때는 id 값을 사용하자!</b>

- 문제점 해결(2) - 데이터 입력시 빈 값일 때 입력되지 않도록 처리

  ```javascript
  // addTodo 함수에 if 조건문 추가
  
  addTodo: function() {
    if (this.newTodo.length !== 0 ) {
      this.todos.push({
        id: Date.now(),
        content: this.newTodo,
        completed: false,
      })
      this.newTodo = ''
    }
  },
  ```

<br>

### 2.2 인스턴스 옵션② - `computed`

- 미리 계산된 값을 반환

- `data`를 수정하지 않고, 가공된 `data`를 활용하고 싶을 때 사용한다.

- 반드시 `return`이 이써야 하며, 함수를 작성하지만 실제 Vue 인스턴스에서는 `return` 된(`data`를 가공한) 값을 캐싱한다. 즉, 종속 대상을 따라 저장(캐싱)되는 특성이 있다는 의미.

- 연산이 많이 필요한 경우 템플릿 안에서 연산 표현식을 사용하는 것보다 computed를 사용하는 것을 권장

- 너무 많은 연산을 템플릿 안에서 하면 코드가 비대해지고 유지보수가 어렵다.

- <b>계산된 속성을 정의할 때 화살표 함수를 사용하면 안 된다.</b>

  ```js
  // 잘못된 예제
  computed: {
    aDouble: vm => vm.a * 2
  }
  
  // 올바른 예제
  computed: {
    aDouble: function(vm) {
      return vm.a * 2
    }
  }
  ```

- `{{ newTodo.split('').reverse().join('') }}` 와 같은 newTodo 역순 출력하는 JS 구문을 vue를 통해 아래와 같이 작성하면 이것을 가져다가 쓰기만 하면 된다.

  ```vue
  computed: {
      reversedNewTodo: function() {
  		return this.newTodo.split('').reverse().join('')
  	}
  }
  ```

- method에 있는 `todasByStatus`를 `computed`로 가져오고 method에 있는 것은 삭제한다.

  ```javascript
        methods: {
          check: function(todo) {
            todo.completed = !todo.completed
          },
          addTodo: function() {
            if (this.newTodo.length !== 0 ) {
              this.todos.push({
                id: Date.now(),
                content: this.newTodo,
                completed: false,
              })
              this.newTodo = ''
            }
          },
          clearCompleted: function() {
            const notCompletedTodos = this.todos.filter(todo => {
              return !todo.completed
            })
            this.todos = notCompletedTodos
          }
        },
        computed: {
          computedTodosByStatus: function() {
            if (this.status === 'active') {
              return this.todos.filter( todo => {
                return !todo.completed
              })
            }
            if (this.status === 'completed') {
              return this.todos.filter( todo => {
                return todo.completed
              })
            }
            return this.todo
          }
        }
  ```

- computed는 이미 호출되어 있으므로 <b>소괄호()를 쓰지 않고 이름만 바로 가져온다.</b>

  ```html
  <!-- before -->
  <div v-for="todo in todosByStatus()" v-bind:class="{ completed: todo.completed }" v-bind:key="todo.id">
  
  <!-- after -->
  <div v-for="todo in computedTodosByStatus" v-bind:class="{ completed: todo.completed }" v-bind:key="todo.id">
  ```

- `methods` vs `computed` - `04_methods_and_computed.html`

  `methods` : 함수 자체 이므로 <b>호출할 때마다 매번 계산</b>

  `computed` : 한 페이지에서 <b>최초 선언할 때만 계산</b>됨

  아래 예시는 BUTTON을 누를 때마다 시간이 갱신됨(단, computed는 최초 선언될 때만 계산됨)

  ```html
  <body>
    <div id="app">
      <button v-on:click="visible = !visible">BUTTON</button>
      <ul v-if="visible">
        <li>methods : {{ dateMethod() }} </li> <!-- method로 출력-->
        <li>computed : {{ dateComputed }} </li> <!-- computed로 출력 -->
      </ul>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
      const app = new Vue({
        el: '#app',
        data: {
          visible: true,
        },
        methods: {
          dateMethod: function () {
            return new Date()
          }
        },
        computed: {
          dateComputed: function () {
            return new Date()
          }
        },
      })
    </script>
  </body>
  ```

<br>

### 2.3 Local Storage <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" target="_blank">(MDN 공식 문서)</a>

---

- `localStorage.getItem(key)` : 아이템 가져오기
- `localStorage.setItem(key, value)` : 아이템 저장
- `localStorage.removeItem(key)` : 아이템 삭제
- `localStorage.clear()` : 전체 삭제

---

- Local Storage가 Model의 역할을 빌려서 할 것이다.

- 현재 상황은 페이지를 새로고침하면 변경내용들이 저장되지 않고 다시 원상태로 복귀된다. 그래서 이를 브라우저가 가지고 있는 Local Storage에 저장함으로써 유지될 수 있도록 할 것이다.

- 저장하기 위한 준비 과정

  ```html
  <script>
    const STORAGE_KEY = 'vue-todos'
    const todoStorage = {
      // fetch : string => json
      fetch: function() {
        // parsing작업 : string을 json으로 바꾸는 작업
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      },
      save: function(todos) { // save할 때는 함수의 인자 필요
        // stringify작업 : json을 string으로 바꾸는 작업
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos)))
      }
    }
  
    const app  = new Vue({
      ...
    })
  </script>
  ```

<br>

### 2.4 인스턴스 옵션③ - `watch`, `mounted`

- `watch`
  - Vue 인스턴스의 data 변경을 관찰하고 이에 반응
  - 특정 데이터가 변경되었을 때 정의한 watcher 함수를 실행
  - 함수로 정의하며, key는 변경을 감지할 `data`의 key 값으로 작성한다.(아래 예시에서는 `todos`가 해당)
  - 다만, 같은 기능을 구현하기 위해 `computed` 속성과 `watch` 속성 두 가지 방법을 모두 사용할 수 있지만 `computed` 사용을 권장한다. 
    - Vue의 기본적인 패러다임인 `선언형 프로그래밍`에 더 적합하며 코드도 간결해 지기 때문이다.
  - 데이터 변경에 대한 응답으로 <u>비동기 또는 시간이 많이 소요되는</u> 조작을 수행하려는 경우에 적합
- `mounted`
  - 새로고침 될 때(DOM과 Vue instance 가 연결되는 시점) 실행되는 것
  - 화면 요소를 제어하는 로직에서 유용하다.

```javascript
watch: {
  todos: { // watch에서는 this 쓸 필요 없음
    handler: function(todos) { // handler : 특정 데이터가 변경 되었을 때 실행할 함수
      todoStorage.save(todos)
    },
    deep: true, // deep: 객체의 nested item 들도 관찰할 지 유무를 설정. true인 경우 내부 요소들도 감시하도록 함.
  }
},
// mounted : 새로고침 될 때(DOM과 Vue instance 가 연결되는 시점) 실행되는 것
mounted: function() {
  this.todos = todoStorage.fetch() // 새로고침할 때 마다 todotorge에 저장해놓은 데이터까지 가져오게 된다.
}
```

<br>

### 2.5 Vue directive③

---

:heavy_check_mark: <b>Vue directive shortcut</b>

- `v-bind:` => `:`
- `v-on:` => `@`

---

```html
<script>
  const app = new Vue({
    el: '#app',
    data: {
      name: 'harry',
      name2 : '<h1>h1 태그 입니다.</h1>',
      name3 : 'wallywally',
    }
  })
</script>
```

#### (1) v-text

- Vanilla JS 에서 `.innerText`와 동일한 기능을 수행하고, 태그를 일반 문자 상태로 보여준다.

- 보간법(`{{ }}`)을 사용하는 것과 같으며 보간법 사용을 권장한다.

  ```html
  <!-- v-text : interpolation 안 쓰고 text 출력 -->
  <span v-text="name"></span>
  <span>{{ name }}</span>
  ```

<br>

#### (2) v-html

- Vanilla JS에서 `.innerHTML`과 동일한 기능을 수행하며, 태그를 파싱하여 화면에 구현한다.

- XSS(Cross Site Scripting) 공격에 주의해야 한다.

  ```html
  <!-- v-html : 실제 html로 렌더링 해 줌 -->
  {{ name2 }}
  <span v-html="name2"></span>
  ```

- Vue-CLI에서 `<style>` 의 `scoped` 스타일은 `v-html` 내부에 적용하지 않는다. 다만, 적용하려면 `CSS-modules`를 추가해야 한다.

  - `css-loader`, `vue-style-loader` 추가해야 함

<br>

#### (3) v-show

- `v-if` : 조건에 맞지 않으면 렌더링 자체를 하지 않음

- `v-show` : 조건과 관계 없이 일단 렌더링 후에, 조건에 맞지 않으면 CCS display 속성읕 토글해서 숨겨버림.(`display: none;`)

  - `<template>` 구문 지원 X, `<v-else>`와도 작동 X

  ```html
  <p v-if="false">{{ name3 }}</p>
  <p v-show="false">{{ name3 }}</p>
  ```

- 아래 console 창에서 보는것과 같이 `v-if` 에 해당하는 구문이 사라졌다.

![004](https://user-images.githubusercontent.com/52685250/68174180-7ef06c00-ffc0-11e9-8119-cf9d298c77c7.JPG)

:heavy_check_mark: <b>`v-show` vs `v-if`</b>

- 일반적으로 `v-if`는 토글 비용이 높고 `v-show`는 초기 렌더링 비용이 더 높다.

- 해당 요소의 화면 표현 전환(on/off)이 잦다면, `v-show`를 사용하는 것이 렌더링 비용이 적다.
- 반면 전환이 잦지 않고 고정되어 있다면, `v-if`를 사용하는 것이 컴파일 비용이 적다.

<br>

#### (4) v-pre

- Vue.js 가 컴파일 하지 않는다.

- 보간법(`{{ }}`)도 그대로 브라우저에 나타난다.

  ```html
  <template>
    <div id="app">
      <p v-pre>
        {{ message }}
      </p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'app',
    data () {
      return {
        message: 'hi'
      }
    }
  }
  </script>
  <style></style>
  ```

  ```
  {{ message }}
  ```

<br>

#### (5) v-once

- 표현식이 필요하지 않는 디렉티브로 최초 렌더링을 단 한번만 수행한다.
- `data`가 수정되어도 처음 렌더링 된 값만을 보여준다.

<br>

---

:boxing_glove: <b>`computed` vs `watch`</b>

- `computed` : 계산해야 하는 `목표 데이터를 정의하는 방식`(선언형 프로그래밍)
- `watch` : 감시할 데이터를 지정하고 그 `데이터가 바뀌면 특정 함수를 실행하라는 방식`(명령형 프로그래밍)

---

<br>

### 2.6 Vue component

#### (1) Todo List 재구성 - `00_todo.html`

---

:checkered_flag: <b>Goal</b>

- 기본 todo 처럼 데이터 입력시 출력
- 각각의 todo 는 개별 id를 갖는다.
- (도전) 특정 todo 삭제할 수 있도록

---

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="app">
    <input type="text" v-model="newTodo">
    <button @click="addTodo">+</button>
    <li v-for="todo in todos" :key="todo.id">
      <span>{{ todo.content }}</span>
      <button @click="removeTodo(todo.id)">X</button>
    </li>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
  const app = new Vue({
    el: '#app',
    data: {
      todos: [],
      newTodo: '', // 실시간 동기화될 값
    },
    methods: {
      addTodo: function () {
        if (this.newTodo.length != 0) {
          this.todos.push({
            id: Date.now(),
            content: this.newTodo,
            completed: false,
          })
          this.newTodo = ''
        }
      },
      removeTodo: function (todoId) { // 개별 todo 삭제 가능하도록 함수 구성
        this.todos = this.todos.filter( todo => {
          // 완료한 todo
          // 완료된 todo를 제외한 나머지 todo만 filter를 통해서
          // 새로운 배열로 return
          return todo.id !== todoId
        })
      }
    }
  })
  </script>
</body>
</html>
```

<br>

#### (2) 카데고리별로 구분하기 - `01_categorized_todo.html`

- 다음과 같이 script 구문을 작성하면 반복되는 부분이 많고 유지보수하는데 아주 안 좋다.

```html
<body>
  <div id="app">
    <div class="todo-list">
      <h2>취업준비</h2>
      <input type="text" v-model="newTodo1">
      <button @click="addTodo1">+</button>
      <li v-for="todo in todos1" :key="todo.id">
        <span>{{ todo.content }}</span>
        <button @click="removeTodo1(todo.id)">X</button>
      </li>
    </div>
    <div class="todo-list">
      <h2>SSAFY</h2>
      <input type="text" v-model="newTodo2">
      <button v-on:click="addTodo2">+</button>
      <li v-for="todo in todos2" v-bind:key="todo.id">
        <span>{{ todo.content }}</span>
        <button v-on:click="removeTodo2(todo.id)">x</button>
      </li>
    </div>
    <div class="todo-list">
      <h2>기타</h2>
      <input type="text" v-model="newTodo3">
      <button @click="addTodo3">+</button>
      <li v-for="todo in todos3" :key="todo.id">
        <span>{{ todo.content }}</span>
        <button @click="removeTodo3(todo.id)">X</button>
      </li>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
  const app = new Vue({
    el: '#app',
    data: {
      todos1: [],
      newTodo1: '',
      todos2: [],
      newTodo2: '',
      todos3: [],
      newTodo3: '',
    },
    methods: {
      addTodo1: function () {
        if (this.newTodo1.length != 0) {
          this.todos1.push({
            id: Date.now(),
            content: this.newTodo1,
            completed: false,
          })
          this.newTodo1 = ''
        }
      },
      removeTodo1: function (todoId) {
        this.todos1 = this.todos1.filter( todo => {
          return todo.id !== todoId
        })
      },
      addTodo2: function () {
        if (this.newTodo2.length != 0) {
          this.todos2.push({
            id: Date.now(),
            content: this.newTodo2,
            completed: false,
          })
          this.newTodo2 = ''
        }
      },
      removeTodo2: function (todoId) {
        this.todos2 = this.todos2.filter( todo => {
          return todo.id !== todoId
        })
      },
      addTodo3: function () {
        if (this.newTodo3.length != 0) {
          this.todos3.push({
            id: Date.now(),
            content: this.newTodo3,
            completed: false,
          })
          this.newTodo3 = ''
        }
      },
      removeTodo3: function (todoId) {
        this.todos3 = this.todos3.filter( todo => {
          return todo.id !== todoId
        })
      }
    }
  })
  </script>
</body>
</html>
```

<br>

#### (3) 컴포넌트

- "소프트웨어 개발에서 독립적인 단위 모듈"
- 대체로 컴포넌트는 특정 기능이나 관련된 기능의 조합으로 구성되는데, 프로그래밍 설계에서 시스템은 모듈로 구성된 컴포넌트로 나뉜다.
- Vue 공식문서에 적힌 내용
  - 기본 HTML 엘리먼트를 확장하여 <b>재사용 가능한 코드로 캡슐화 하는 것</b>
- <b>모든 Vue 컴포넌트는 Vue 인스턴스다.</b> 그러므로, 모든 options 객체를 사용할 수 있다.(단, root에서만 사용할 수 있는 옵션은 제외)
- 한 Vue app 안에서 각 컴포넌트들은 Root 인스턴스를 시작으로 부모-자식 컴포넌트의 관계를 가진다.
- Vue cli 환경에서 사용하는 방법과 일반적인 HTML, JS 에서 사용하는 방법이 다르다.
- Component 에서 활용되는 속성들
  - `name` : 컴포넌트 사용 시, 해당 컴포넌트의 이름을 정의
  - `components` : 부모 컴포넌트에서 사용할 자식 컴포넌트의 이름(`name`)들을 작성
  - `props` : 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달할 때 사용

---

:heavy_check_mark: <b>컴포넌트 naming convention</b>

- 컴포넌트의 첫번째 인자는 태그이름, 두번째 인자는 속성들을 넣어준다.

1. kebab-case - `todo-list`
   - 호출할 때 : `<todo-list></todo-list>` 케밥케이스 태그로만 호출 가능
2. pascal Case - `TodoList`
   - 호출할 때 : `<todo-list></todo-list>` / `<TodoList>` 둘다 호출 가능
   - 단, DOM에 직접 작성할 때는 케밥케이스만 가능

- 그래서 vue는 <u>모두 소문자</u>여야하고 <u>하이픈을 포함하는 규칙</u>을 따르는 것을 권장한다.

---

- 다음과 같이 부모루트 밑에 자식루트가 세 개 있다.

  ![005](https://user-images.githubusercontent.com/52685250/68185939-3b105d80-ffe6-11e9-8fc5-bcb14b54f163.JPG)

- ex) 각 버튼이 독립적으로 카운트되기

  ```html
  <body>
    <div id="app">
      <h1>My Todo App</h1>
      <todo-list></todo-list>
      <todo-list></todo-list>
      <todo-list></todo-list>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
      var data = { counter: 0}
      Vue.component('todo-list', {
        template: '<button @click="counter += 1">{{ counter }}</button>',
        data: function() {
          return { // {}로 이름공간을 나눠졌기 때문이다.
            counter: 0
          }
        },
        methods: {
  
        },
      })
      const app = new Vue({
        el: '#app',
      })
    </script>
  </body>
  ```

  ![006](https://user-images.githubusercontent.com/52685250/68185940-3b105d80-ffe6-11e9-9890-a69ca5252fa5.JPG)

<br>

#### (4) `props`

- 컴포넌트를 재생산할 때 컴포넌트에서 사용할 변수를 부모에게 내려주게 되는데 이를 `props`라고 한다.

- `props`는 반복되는 컴포넌트에서 서로 다른 정보가 들어가야 할 때 사용

- 하위(자식)에서 상위(부모) 데이터를 직접 참조해선 안되고 실제로도 안된다.

  - 자식 컴포넌트에서 부모 컴포넌트를 움직이게 하려면, 이벤트를 발생(`emit`)시켜야 한다.
  - 모든 Vue 컴포넌트들은 `.$emit` 메서드를 통해 부모 컴포넌트가 들을 수 있는 이벤트를 발생시킬 수 있다.

- `props` 옵션을 통해 부모 -> 자식으로 데이터를 전달

- 전달하려고 하는 <b>데이터의 이름을 태그 내의 속성</b>으로, <b>내용을 속성 값</b>으로

- props 예제

  `type` : `String`, `Number`, `Boolean`, `Array`, `Object`, `Date`, `Function`, `Symbol`

  `default` : `any`

  `required` : `Boolean`

  `validator` : `Function`

  ```js
  // 단순한 구문
  Vue.component('props-demo-simple', {
    props: ['size', 'myMessage']
  })
  
  // 유효성 검사를 포함한 객체 구문
  Vue.component('props-demo-advanced', {
    props: {
      // 타입 체크만 합니다.
      height: Number,
      // 타입 체크와 유효성 검사를 합니다.
      age: {
        type: Number,
        default: 0,
        required: true,
        validator: function (value) {
          return value >= 0
        }
      }
    }
  })
  ```

---

- `props`로 데이터의 이름 추가

  ```html
  <body>
    <div id="app">
      ...
      <todo-list category="취업특강"></todo-list>
      <todo-list category="SSAFY"></todo-list>
      <todo-list category="기타"></todo-list>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
      // 컴포넌트 등록
      Vue.component('todo-list', {
        template: `
        <div class="todo-list">
          <h2>{{ category }}</h2> // {{ category }}에 값이 들어감
          <input type="text" v-model="newTodo">
          <button @click="addTodo">+</button>
          <li v-for="todo in todos" :key="todo.id">
            <span>{{ todo.content }}</span>
            <button @click="removeTodo(todo.id)">X</button>
          </li>
        </div>`,
        props: ['category'],
        // 컴포넌트에서 data는 함수여야 한다.
        // 이제 모든 todos 와 newTodo 는 각가 고유한 내부 상태가 있다.
        data: function () {
          return { // {}가 이름공간을 분리하여 객체를 따로따로 분리해준다.
            todos: [],
            newTodo: '',
          }
        },
        ...
      const app = new Vue({
        el: '#app',
      })
    </script>
  </body>
  ```

  ![007](https://user-images.githubusercontent.com/52685250/68187150-37caa100-ffe9-11e9-95bb-a13bb795d676.JPG)

- `props` 편집(타입 명시, required 속성, 유효성 검사)

  아래 사진과 같이 단순히 console 창에 오류를 띄울 뿐 제대로 된 오류 처리를 하려면 model까지 손봐야 한다.

  ```javascript
  props: {
    category: {
      type: String, // 적어도 타입 하나는 명시해야 한다.
      required: true, // category 타입은 string 이면서 필수 인자이다.
      // default 값도 설정할 수 있다.
      validator: function (value) { // 유효성 검사도 넣을 수 있다.
        if (value.length < 5) { // false라고 해서 입력이 안되는 것이 아니고 console 창에서 error를 띄운다.
          return true
        } else {
          return false
        }
      },
    }
  },
  ```

  ![00](https://user-images.githubusercontent.com/52685250/68189591-f6d58b00-ffee-11e9-8c31-97e45de6bd39.JPG)

- 지금까지 익힌 컴포넌트 방식은 실습을 위한 방식이고, 실제로는 `webpack` 개념을 이용하여 파일화해서 관리한다.

<br>

---

<br>

## 3. 11월06일(3일차)

### 3.1 webpack의 기본 개념

![웹팩](https://user-images.githubusercontent.com/52685250/68270147-c4d03180-009f-11ea-9110-b2ddeb7bc485.JPG)

- 서로 연관 있는 모듈 간의 관계를 해석하여 정적인 자원으로 변환해주는 변환 도구
- 파일 간의 연관관계를 파악하여 하나의 자바스크립트 파일로 변환해주는 변환 도구
- 웹팩은 현재 가장 널리 쓰이는 모듈 번들러.
- JS 뿐만 아니라 CSS, IMAGE 파일 등 리소스의 의존성들도 관리한다.

#### (1) 모듈, 모듈 번들러

- `모듈(Module)`
  - 어플리케이션을 구성하는 개별적 요소
  - 재사용 가능한 코드 조각
  - 모듈은 세부사항을 캡슐화한다.
  - 특정 기능을 갖는 작은 코드 단위
- `모듈 번들러(Module Bundler)`
  - 웹 어플리케이션을 구성하는 자원(HTML, CSS, JS, IMG 등)을 모두 각각의 모듈로 보고 이를 조합해서 병합된 하나의 결과물로 만드는 도구

- 개발을 편하게 모듈 단위 개발 => 모듈끼리 연결(의존성)을 신경쓰기가 어려워짐 => 웹팩이 하나로 만들어줘

---

:heavy_check_mark: <b>초기 설정</b>

- `npm init` : 설정을 모두 완료하면 `package.json` 파일이 새로 생긴다.

- javascript 관련 github에 가면 `package.json`에 기본 정보들이 담겨 있다. <a href="https://github.com/wally-wally/TIL/blob/master/07_vue/package.json%20%EB%B6%84%EC%84%9D%ED%95%98%EA%B8%B0.md" target="_blank">(package.json 분석)</a>

  ![npm init](https://user-images.githubusercontent.com/52685250/68270403-7ec79d80-00a0-11ea-9ab1-33bbf4fac237.JPG)

- `npm init` 후 `npm install vue`설치

  vue 설치를 완료하여 `node_modules` 폴더와 `package-lock.json` 파일이 새로 생성된다.

- `npm i webpack webpack-cli -D` 설치

  `webpack-cli`는 webpack 명령 실행시 필요하기 때문에 설치해야 한다.

  이 때 `-D`는 배포가 아닌 개발할 때의 모드를 의미함.

  각 종속성을 package.json의 devDependencies로 표시함(하나의 파일에 모든 종속성을 묶어 놈)

  ![result1](https://user-images.githubusercontent.com/52685250/68270531-d6660900-00a0-11ea-9793-d724b47dce0e.JPG)

- `webpack.config.js` : 웹팩 설정 파일 생성

  ```javascript
  module.exports = {
    entry: {},
    module: {},
    plugins: {},
    output: {},
  }
  ```

---

<br>

#### (2) webpack의 구성

| 요소    | 내용                                                         |
| ------- | ------------------------------------------------------------ |
| entry   | <ul><li>여러 js 파일들의 시작점 => 웹팩이 파일을 읽어 들이기 시작하는 부분</li><li>전체 애플리케이션 설치, 필요 라이브러리를 로딩하는 로직을 포함</li><li>웹팩으로 빌드(변환)할 대상 파일을 지정</li></ul> |
| module  | <ul><li>웹팩은 JS 만 변환 가능하기 때문에 HTML, CSS 등은 모듈을 통해서 웹팩이 이해할 수 있도록 변환이 필요하다.</li><li>변환 내용을 담는 곳</li></ul> |
| plugins | <ul><li>웹팩을 통해 번들된 결과물을 추가로 처리하는 부분</li><li>ex) 결과물의 사이즈를 줄이거나 결과물(기본적으로 JS)을 기타 CSS, HTML 파일로 분리하는 기능 등이 있음</li></ul> |
| output  | <ul><li>여러 js 파일을 <b>하나로 만들어 낸 결과물</b></li><li>결과물의 위치, 파일명 등 세부 옵션을 설정</li></ul> |

<br>

### 3.2 webpack 만들기

#### (1) webpack 파일 생성

- `webpack.config.js`

  ```javascript
  // webpack 설정 파일
  const VueLoaderPlugin = require('vue-loader/lib/plugin')
  const path = require('path')
  
  module.exports = {
    entry: {
      // __dirname : 최상위 위치(entry point) - Django 에서 BASE_DIR 역할과 동일
      // 여기서 __dirname은 '02_vue_webpack'이다.
      app: path.join(__dirname, 'src', 'main.js')
      // 경로 설정 (src(entry의 시작 파일)는 vue-cli의 기본값임)
      // main.js가 entry 역할을 한다.
    },
    module: {
      rules: [ // rules는 배열로 선언
        {
          test: /\.vue$/, // 정규 표현식 : '.vue' 확장자를 가진 모든 파일을 test 한다는 의미
          use: 'vue-loader',
        }
      ]
    },
    plugins: [ // plugins는 배열로 선언
      new VueLoaderPlugin(),
    ],
    output: {
      filename: 'app.js',
      path: path.join(__dirname, 'dist'), // (dist는 vue-cli의 기본값임)
    },
  }
  ```

- `package.json`

  ```json
  {
    "name": "02_vue_webpack",
    "version": "1.0.0",
    "description": "",
    "main": "module.js",
    "scripts": {
      "build": "webpack" // 기존의 test 구문 삭제
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
      "vue": "^2.6.10"
    },
    "devDependencies": {
      "vue-loader": "^15.7.2",
      "vue-template-compiler": "^2.6.10",
      "webpack": "^4.41.2",
      "webpack-cli": "^3.3.10"
    }
  }
  ```

- `src` > `main.js`

  `main.js`가 entry 역할을 한다.

  ```javascript
  // Vue 인스턴스를 최종으로 만드는 파일
  
  // 1. 설치된 vue를 추가
  // (내가 만든 파일 아닌 경우) 현재 위치에서 vue 이름을 가진 폴더가 없음 => 자동으로 node_modules 에서 가져옴
  import Vue from 'vue'
  
  // 2. 최상위 컴포넌트 추가(App.vue)
  // (내가 만든 파일인 경우) 상대 경로 표시를 해야 함
  import App from './App.vue'
  
  new Vue({
    render: h => h(App)// 보통 createElement를 h로 줄인다.
  }).$mount('#app') // .$mount('#app')는 el: '#app'과 유사한 역할 수행
  ```

- `App.vue`

  ```vue
  <template>
    <h1>여기는 최상위 컴포넌트 입니다.</h1>
  </template>
  
  <script>
  
  </script>
  
  <style>
  
  </style>
  ```

- `npm install vue-loader vue-template-compiler -D`

  - 웹팩은 js 코드만 이해 가능하기 때문에 vue파일(`vue-loader`) 및 html, css 파일(`vue-template-compiler`) 등을 변환하기 위하여 모듈을 설치

- `npm run build` : webpack 만드는 구문

- `dist` 폴더가 새로 생기고 이 안에 `app.js` 파일이 생성됨을 볼 수 있다.

- `public` > `index.html`

  ```html
  <!DOCTYPE html>
  <html lang="ko">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
  </head>
  <body>
    <div id="app">
  
    </div>
    <script src="../dist/app.js">
  
    </script>
  </body>
  </html>
  ```

- 하지만 현재 상황에서 chrome 에서 vue 창을 열 수 없다. 그래서 `webpack.config.js`에 `mode: 'development',`를 추가하고 다시 `npm run build`를 수행하면 chorme 창에서 vue 창을 볼 수 있다.

  ```javascript
  // webpack.config.js
  
  module.exports = {
    mode: 'development',
    entry: {
      ...
    }
    ...
  }
  ```

- 아래 사진에서 App(App.vue)이 최상위 컴포넌트이다.

  이를 바탕으로 하위 컴포넌트인 (TodoList.vue)를 만들 것이다.

  ![todolist.vue](https://user-images.githubusercontent.com/52685250/68274043-66a94b80-00ab-11ea-954a-89feb617d9ce.JPG)

<br>

#### (2) 하위 컴포넌트 생성 및 컴포넌트 등록

---

:heavy_check_mark: <b>컴포넌트 등록 3 steps (`App.vue`)</b>

1. `<script>` 에 등록할 컴포넌트 불러오기 (import)
2. `export default`에 `components` 항목에 추가
3. `<template>` 에서 컴포넌트 사용할 수 있도록 등록

:arrow_forward: 이 세가지 과정이 올바르게 성공하면 SPA(Single Page Application)이 완성된다.

![spa](https://user-images.githubusercontent.com/52685250/68279058-fce26f00-00b5-11ea-8153-74d803a4ae1e.JPG)

---

> `src` > `components` > `TodoList.vue`
>
> ```vue
> <template>
> <!-- 이전 수업자료(02_todo_component.html)에 적었던 template 내용 -->
> <div class="todo-list">
>  <h2>{{ category }}</h2>
>  <input type="text" v-model="newTodo">
>  <button @click="addTodo">+</button>
>  <li v-for="todo in todos" :key="todo.id">
>    <span>{{ todo.content }}</span>
>    <button @click="removeTodo(todo.id)">X</button>
>  </li>
> </div>
> </template>
> 
> <script> // 이전 수업자료(02_todo_component.html)에 적었던 props 이하의 내용
> export default {
>  props: {
>    category: {
>      type: String,
>      required: true,
>      validator: function (value) {
>        if (value.length < 5) {
>          return true
>        } else {
>          return false
>        }
>      },
>    }
>  },
>  data: function () {
>    return {
>      todos: [],
>      newTodo: '',
>    }
>  },
>  methods: {
>    addTodo: function () {
>      if (this.newTodo.length != 0) {
>        this.todos.push({
>          id: Date.now(),
>          content: this.newTodo,
>          completed: false,
>        })
>        this.newTodo = ''
>      }
>    },
>    removeTodo: function (todoId) {
>      this.todos = this.todos.filter(todo => {
>        return todo.id !== todoId
>      })
>    }
>  }
> }
> </script>
> 
> <style> /* 이전 수업자료(02_todo_component.html)에 적었던 style 내용 */
> .todo-list {
>  display: inline-block;
>  width: 33%;
> }
> </style>
> ```

> `App.vue`
>
> ```vue
> <template>
> <div> <!-- 반드시 div로 감싸줘야 한다.-->
>  <h1>여기는 최상위 컴포넌트 입니다.</h1>
>  <!-- 이하 component 사용 구문 -->
>  <!-- 3. 사용 -->
>  <todo-list category="취업특강"></todo-list>
>  <todo-list category="SSAFY"></todo-list>
>  <todo-list category="기타"></todo-list>
> </div>
> </template>
> 
> <script>
> // 1. 하위 컴포넌트 불러오기
> import TodoList from './components/TodoList.vue'
> 
> // 2. 불러온 컴포넌트를 최상위(부모) 컴포넌트에 등록
> export default {
>  components: {
>    TodoList
>  }
> }
> </script>
> 
> <style>
> 
> </style>
> ```

- 컴포넌트 등록 후 다시 `npm run build`를 하는데 이 때 오류가 발생한다. 하위 컴포넌트(`TodoList.vue`)에 작성된 css(`<style>` 부분)와 관련하여 npm을 설치해줘야 한다.

  ![css error](https://user-images.githubusercontent.com/52685250/68275208-534baf80-00ae-11ea-84d0-15a9bd66b4f6.JPG)

- css와 관련하여 npm 을 설치 => `npm install vue-style-loader css-loader -D`

  - `css-loader` : vue 파일에 작성한 CSS 또는 자바스크립트로 가져온 CSS를 가져와서 해당 파일경로를 확인
  - `vue-style-loader` : css-loader로 가져온 CSS를 HTML에 삽입. 그러면 HTML의 header 부분에 `<style>` 태그가 만들어짐

- 그러면 `package.json`의 `devDependencies`에 두 개의 항목이 추가 된다.

  cf) `babel-loader` : ES6 코드를 ES5 코드로 변환

  ```javascript
  "devDependencies": {
    "css-loader": "^3.2.0",
    "vue-loader": "^15.7.2",
    "vue-style-loader": "^4.1.2",
    "vue-template-compiler": "^2.6.10",
    "webpack": "^4.41.2",
    "webpack-cli": "^3.3.10"
  }
  ```

- 그리고 `webpack.config.js`의 `module`에  css와 관련된 rules를 추가한다. 추가한 후 `npm run build` 하면 오류가 발생하지 않는다.

  ```javascript
  module: {
    rules: [ // rules는 배열로 선언
      {
        test: /\.vue$/, // 정규 표현식 : '.vue' 확장자를 가진 모든 파일을 test 한다는 의미
        use: 'vue-loader',
      },
      {
        test: /\.css$/, // 이 구문 추가
        use: ['vue-style-loader', 'css-loader'] // 이 구문 추가, 여러개는 배열로 작성
      }
    ]
  },
  ```

<br>

---

:spiral_notepad: <b>webpack의 각 폴더 및 파일 정리</b>

- `node_modules` 폴더 : `npm install` 명령어로 다운받은 라이브러리가 존재하는 위치
- `src` 폴더 : vue 파일을 비롯해 애플리케이션이 동작하는데 필요한 로직이 들어가는 위치

- `index.html` : 뷰로 만든 웹 앱의 시작점, `npm run build` 시 로딩되는 파일
- `package.json` : npm 설정파일. 뷰, 애플리케이션이 동작하는데 필요한 라이브러리를 정의하는 파일
- `webpack.config.js` : 웹팩 설정 파일. 웹팩 빌드를 위해 필요한 로직들을 정의하는 파일

---

<br>

### 3.3 Vue-CLI <a href="https://cli.vuejs.org/guide/installation.html">(공식 문서)</a>

#### (1) Installation

- `npm i -g @vue/cli`
  - vue-cli로 webpack 설정 등 모든 것을 한 방에 해결해 준다.
  - django-admin startproject와 동일한 기능

- `vue --version`
  - vue 버전 확인
- `vue create todo-vue-cli` >`default (babel, eslint)` 선택
- `cd todo-vue-cli` > `npm run serve`

![filetree](https://user-images.githubusercontent.com/52685250/68277911-98beab80-00b3-11ea-8e05-76d58537c634.JPG)

<br>

#### (2) `vue.config.js`

- 웹팩을 직접 작성했을 때 만들었던 `webpack.config.js`(=== `vue.config.js`) 가 보이지 않는다.
- `vue.config.js`  는 `@vue/cli-service`에 의해 자동으로 로드되는 선택적 구성파일로 변경 되었다.
  - `package.json`에서 `@vue/cli-service` 항목 확인할 수 있음
- vue-cli 3 버전부터 노출되지 않으며 설정을 추가하기 위해서는 루트 디렉토리(최상단)에 직접 파일을 만들고 작성해야 한다.

- `vue.config.js` 숨긴 위치 : `node_moduls` > `@vue` > `cli-service` > `lib` > `config` > `base.js`

<br>

#### (3) 마무리 작업

- `02_vue_webpack`에서 작성했던 `TodoList.vue`를 복사하여 `03_vue_cli`의 `TodoList.vue`에 복사한다.

- 그리고 `App.vue`를 다음과 같이 수정한다.

  ```vue
  <template>
    <div id="app">
      <h1>여기는 최상위 컴포넌트 입니다.</h1>
      <todo-list category="취업특강"></todo-list>
      <todo-list category="SSAFY"></todo-list>
      <todo-list category="기타"></todo-list>
    </div>
  </template>
  
  <script>
  // import HelloWorld from './components/HelloWorld.vue'
  import TodoList from './components/TodoList.vue'
  
  export default {
    components: {
      TodoList,
    }
  }
  </script>
  
  <style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  </style>
  ```

- 마지막으로 `npm run build`으로 빌드 완료한 후 `npm run serve`로 확인하면 된다. 제대로 성공하면 파일트리에 `dist` 폴더가 생긴다.

  ![result](https://user-images.githubusercontent.com/52685250/68278590-fef7fe00-00b4-11ea-8a78-3e2236e9c30b.JPG)

- [참고] 서버 끈 상태에서 `vue ui`를 입력하면 `Vue 프로젝트 매니저`가 실행되어 코드 없이 Vue 프로젝트를 만들 수 있다.

  ![vue ui](https://user-images.githubusercontent.com/52685250/68279332-88f49680-00b6-11ea-8c14-7402b3ff52bf.JPG)

<br>

---

<br>

## 4. 11월11일(4일차) - `Youtube 검색 기능(Youtube Thumbnail)`

---

:heavy_check_mark: <b>Project Structure</b>

<img src="https://user-images.githubusercontent.com/52685250/68567123-91284980-049b-11ea-9c7c-e1dff97cc768.JPG" width="700px">

<img src="https://user-images.githubusercontent.com/52685250/68567124-91284980-049b-11ea-9a3b-0ada5a70ff3c.JPG" width="600px">

---

:heavy_check_mark: <b>기본 세팅</b>

- `vue create youtube-browser` 로 vue cli 생성
- `default (babel, eslint)` 항목 선택(Enter)
- `cd youtube-browser`로 디렉토리 이동
- `npm run serve`로 서버 잘 켜지나 확인

---

<br>

:black_flag: <b>최상단 컴포넌트 기본 세팅</b>

> `App.vue`
>
> - 기본으로 작성된 구문 지우고 초기상태로 시작!
>
> ```vue
> <template>
> <div id="app">
> 
> </div>
> </template>
> 
> <script>
> 
> export default {
> name: 'App', // 최상단 컴포넌트기 때문에 이름이 없어도 되지만 명시적으로 작성한다.
> 
> }
> </script>
> 
> <style>
> 
> </style>
> ```

<br>

### 4.1 SearchBar 컴포넌트 구성

> < 컴포넌트 기본 세팅 >
>
> `components` > `SearchBar.vue`
>
> ```vue
> <template>
> <div>
>   <input type="text">
> </div>
> </template>
> 
> <script>
> export default {
> name: 'SearchBar'
> 
> }
> </script>
> 
> <style>
> 
> </style>
> ```

#### (1) `SearchBar` 컴포넌트 최상단 컴포넌트와 연결

- 최상단 컴포넌트에 App 등록

  `App.vue`

  ```vue
  <template>
    <div id="app">
      <!-- 태그의 규칙 반드시 지키자! (kabab-case) -->
      <search-bar></search-bar> <!-- 3단계 -->
    </div>
  </template>
  
  <script>
  import SearchBar from './components/SearchBar' // 1단계
  
  export default {
    name: 'App', // 최상단 컴포넌트기 때문에 이름이 없어도 되지만 명시적으로 작성한다.
    components: { // 2단계
      SearchBar,
    },
  }
  </script>
  ```

- 하위 컴포넌트에서 입력한 데이터가 어디에 있는지 console.log로 확인

  `SearchBar.vue`

  ```vue
  <template>
    <div>
      <input @change="onInput" type="text">
      <!-- @change : 입력 후 enter를 쳐야 onInput 함수가 실행 -->
    </div>
  </template>
  
  <script>
    export default {
      name: 'SearchBar',
      methods: {
        onInput(e) {
          console.log(e)
          // 하지만 Unexpected console statement 오류가 발생하므로 추가 설정을 해준다.
          // vue는 배포할 때 console.log(e)와 같은 구문을 작성하면 안 된다고 설정해 놓기 때문
          // 중요한 정보가 누출될 수 있기 때문
        }
      }
    }
  </script>
  
  <style>
  
  </style>
  ```

  `package.json`의 <b>rules</b>에 <b>`"no-console": "off"`</b> 구문 추가하고 서버를 껐다가 다시 켜면 오류 없이 console 창에서 볼 수 있다.

  `target` > `value`에 input에 입력한 데이터를 확인할 수 있다.

  ![213213](https://user-images.githubusercontent.com/52685250/68555186-b99a4e80-046f-11ea-9a9d-ab4c24fb4f1c.JPG)

---

:heavy_exclamation_mark: <b>지금까지의 과정 정리 및 진행할 내용</b>

- 사용자가 검색어 입력(SearchBar) => 검색 결과를 `App.vue`로 올려줄 것이다. => `emit` events
  - Information can be easily communicated up and down components
  - Information cannot easily be communicated between sibling components
- 상위 => 하위 : `props`, 하위 => 상위 : `emit`

---

<br>

#### (2) `emit` 으로 하위 컴포넌트에서 상위 컴포넌트로 데이터 보내기

<img src="https://user-images.githubusercontent.com/52685250/68567125-91284980-049b-11ea-9a9b-f2b230261a7d.JPG" width="600px">

- 하위 컴포넌트에서 상위 컴포넌트로 데이터가 보내지도록 `emit`을 설정하자

  `Searchbar.vue`

  ```vue
  <script>
    export default {
      name: 'SearchBar',
      methods: {
        onInput(e) {
          this.$emit('inputChange', e.target.value)
          // $emit(부모 컴포넌트에서 발생하는 이벤트 이름(event name), 보낼 데이터(arguments))
        }
      }
    }
  </script>
  ```

  ![332](https://user-images.githubusercontent.com/52685250/68555345-adfb5780-0470-11ea-9297-fd617e0808b4.JPG)

  

  `App.vue`

  ```vue
  <template>
    <div id="app">
      <!-- 만약 inputChange 이벤트가 일어나면 onInputChange 라는 method 가 실행 됨 -->
      <search-bar @inputChange="onInputChange"></search-bar>
    </div>
  </template>
  
  <script>
  import SearchBar from './components/SearchBar'
  
  export default {
    name: 'App',
    components: {
      SearchBar,
    },
    methods: {
      onInputChange(inputValue) { // 하위 컴포넌트로부터 넘어온 데이터가 있으므로 인자가 있다.
      // inputValue = e.target.value
        console.log(inputValue)
      }
    }
  }
  </script>
  ```

  아래 사진과 같이 input에 입력한 대로 console 창에 출력된다.

  ![123321](https://user-images.githubusercontent.com/52685250/68555456-3843bb80-0471-11ea-8d42-c864b9c0bb91.JPG)

---

:heavy_check_mark: <b>단방향 데이터 흐름의 이점</b>

- vue app 의 데이터 흐름을 쉽게 파악할 수 있음
- 부모 컴포넌트에서 업데이트가 일어나면 자식 컴포넌트는 자동 업데이트(즉, 자식 컴포넌트의 상태를 관리하지 않아도 된다.)
- 하위 컴포넌트가 실수로 부모의 상태를 변경하려 app 데이터의 흐름을 추론하기 어렵게 만드는 것을 방지할 수 있다.

---

- `emit` : 하위에서 상위로 데이터를 올려 보낼 때는 Event 를 발생시키는 방법을 사용한다.
- `props` 는 배열, 객체, 함수 등 무엇이든 내려보내는 속성(properties)이고, `emit event` 는 자식에서 부모로 <b>이벤트를 발생</b> 시키는 것

---

:heavy_exclamation_mark: <b>SearchBar => App</b>

1. 트리거 : input 값 변경(@input)
   - 인자 : event
   - 실행 함수 : onInput
2. 트리거 : input 내 $emit(inputChange)
   - 인자 : 변경된 값
   - 실행 함수 : onInputChange

---

<br>

### 4.2 Google Youtube API 받기 <a href=" https://console.developers.google.com/">(바로 이동)</a>

---

:heavy_check_mark: <b>API 키 발급 과정(간략하게 작성함)</b>

- 새 프로젝트 생성 => 사용자 인증 정보 만들기 => 사용자 인증 정보 선택 도움말
- 인증 정보 종류 : Youtube Data API V3 선택
- 어떤 사용자 인증 정보가 필요한가요?
  - API 호출 위치 : 웹 브라우저, 액세스할 데이터 : 공개 데이터
- 사용자 인증 정보 가져오기 선택하면 API 키 발급 완료

---

- `App.vue`의 `script` 부분 상단에 `const API_KEY = '~~~'` 작성 후 서버 끄고 `npm i axios`로 axios 설치

- `script` 최상단에 axios 사용하기 위해 `import axios from 'axios'` 작성

- API_URL 작성 <a href="https://developers.google.com/youtube/v3/docs/search/list#%EC%9A%94%EC%B2%AD" target="_blank">(참고 홈페이지)</a>

- 현재 까지 `App.vue` 상황

  ```vue
  <script>
  import axios from 'axios'
  import SearchBar from './components/SearchBar'
  const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY // process.env.는 기본으로 작성
  const API_URL = 'https://www.googleapis.com/youtube/v3/search'
  
  export default {
    name: 'App',
    components: {
      SearchBar,
    },
    methods: {
      onInputChange(inputValue) {
        axios.get(API_URL, {
          params: {
            key: API_KEY,
            type: 'video',
            part: 'snippet',
            q: inputValue,
            // https://www.youtube.com/results?search_query=애플 에서 search_query 부분(q로 써도 인식함)
          }
        })
        .then(response => { // onInputChange 함수 안에 있으므로 arrow function으로 작성한다.
          console.log(response)
        })
        .catch(err => { // onInputChange 함수 안에 있으므로 arrow function으로 작성한다.
          console.log(err)
        })
      }
    }
  }
  </script>
  ```

- API_KEY 가리기 (`.gitignore`와 같은 위치에 `.env.local` 파일 생성)

  <b>반드시 'VUE_APP_' 접두사로 시작해야 webpack이 이해할 수 있다!</b>

  ```
  VUE_APP_YOUTUBE_API_KEY=~~~
  ```

<br>

### 4.3 VideoList 컴포넌트 구성

---

:heavy_check_mark: SearchBar에서 emit으로 App.vue로 올려준 데이터를 VideoList 컴포넌트로 내려준다.

<br>

:heavy_exclamation_mark: <b>지금까지의 과정</b>

- `SearchBar`
  - 사용자가 input 에 값을 입력하면 onInput 함수가 실행
  - inputChange 이벤트와 사용자가 입력한 value 가 함께 상위 컴포넌트인 `App.vue` 로 event 와 input value 가 emit된다.
- `App`
  - SearchBar 에서 넘어온 이벤트 inputChange 로 인해 onInputChange 함수가 실행된다.
  - onInputChange 함수는 유튜브 API에 요청을 보내고 비디오 리스트를 응답 받는다.

:heavy_exclamation_mark: <b>앞으로 해야 할 과정</b>

- `VideoList`
  - 넘겨 받은 비디오 리스트를 videos 라는 배열에 저장한다.
  - `data` object가 (videos 배열이 있는 곳) 업데이트 되면, 해당 컴포넌트 (App.vue)가 템플릿을 다시 렌더링한다.
  - 그리고 바로 자식 컴포넌트들도 모두 다시 렌더링 된다.
  - `VideoList` 컴포넌트가 비디오 배열을 받아 화면에 보여주게 된다. => 현재는 배열의 길이를 출력함 (`{{ videos.length }}`)

---

- 기본 세팅

  - `VideoList.vue` 기본 작성

    ```vue
    <template>
      <ul>
        VideoList
      </ul>
    </template>
    
    <script>
      export default {
        name: 'VideoList',
      }
    </script>
    
    <style>
    
    </style>
    ```

  - 컴포넌트 등록 과정 : `App.vue`에 컴포넌트 등록, template 부분에 `<video-list></video-list>`작성

- `App.vue`의 data()에 videos 배열 생성 - return 이름 공간 분리

  <b>[주의!!] Vue component에서는 return을 할 때만 이름공간을 분리해줘야 한다!! - <u>return {}</u> 으로 작성</b>

  return이 <b>Object를 return하는 함수</b>이다!!

  ```vue
  <template>
    <div id="app">
      <search-bar @inputChange="onInputChange"></search-bar>
      <!-- :videos의 videos는 이름이 바뀌어도 되고, 오른쪽 videos는 이름이 바뀔 수 없다. -->
      <video-list :videos="videos"></video-list>
      <!-- [props] :videos="videos" => :자식컴포넌트에_작성한_props의_이름="보낼_데이터_변수명" -->
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import SearchBar from './components/SearchBar'
  import VideoList from './components/VideoList'
  // process.env.는 vue 공식 문서에 나와 있음
  const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY
  const API_URL = 'https://www.googleapis.com/youtube/v3/search'
  
  export default {
    name: 'App',
    components: {
      SearchBar,
      VideoList,
    },
    data() {
      return {
      // [주의!!] Vue component에서는 return을 할 때만 이름공간을 분리해줘야 한다!! - return {} 으로 작성
      // return이 Object를 리턴하는 함수이다!!
        videos: [],
      }
    },
    methods: {
      onInputChange(inputValue) { 
        axios.get(API_URL, {
          params: {
            key: API_KEY,
            type: 'video',
            part: 'snippet',
            q: inputValue,
          }
        })
        .then(response => {
          this.videos = response.data.items
        })
        .catch(err => {
          console.log(err)
        })
      }
    }
  }
  </script>
  
  <style>
  
  </style>
  ```

- 받는 쪽(VideoList.vue)에서 props 명시

  ```vue
  <template>
    <ul>
      VideoList
      {{ videos.length }}
    </ul>
  </template>
  
  <script>
    export default {
      name: 'VideoList',
      props: {
        videos: {
          type: Array,
          required: true,
        }
      }
    }
  </script>
  ```

<br>

### 4.4 VideoListItem 컴포넌트 구성

> `VideoList.vue`
>
> ```vue
> <template>
> <ul>
> <!-- 여기선 etag가 hash 값이라 item간 서로 안 겹치므로 key로 사용 -->
> <!-- :video="video" : 자식쪽으로 넘겨줄 때도 v-bind 사용 -->
>   <video-list-item v-for="video in videos" :key="video.etag" :video="video"></video-list-item>
> </ul>
> </template>
> 
> <script>
> import VideoListItem from './VideoListItem' // VideoListItem의 최상위 컴포넌트는 VideoList 컴포넌트이므로 VideoListItem 컴포넌트 등록은 여기서 한다!
> export default {
> name: 'VideoList',
> components: {
>     VideoListItem,
> },
> props: {
>     videos: {
>       type: Array,
>       required: true,
>     }
> }
> }
> </script>
> 
> <style>
> 
> </style>
> ```

> `VideoListItem.vue`
>
> ```vue
> <template>
> <li>
>   {{ video.snippet.title }}
> </li>
> </template>
> 
> <script>
> export default {
> name: 'VideoListItem', // VideoListItem의 최상위 컴포넌트는 VideoList 컴포넌트이다.
> props: {
>     video: {
>       type: Object,
>       requried: true,
>     }
> }
> }
> </script>
> 
> <style>
> 
> </style>
> ```

![05](https://user-images.githubusercontent.com/52685250/68561953-017a9f00-048b-11ea-92d0-0d3a9b4b878c.JPG)

---

:art: <b>Bootstrap으로 디자인 정리</b>

- `public` > `index.html` 에 다음 구문(BootstrapCDN - CSS only) 추가

  ```html
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  ```

- `input` 태그에만 bootstrap 스타일 추가 => `SearchBar.vue`에만 style 적용하기 (`scoped`)

  ```vue
  <style scoped> /* scoped : 이 vue 에만 아래 style 적용 */
    input {
      width: 75%;
    }
  
    div {
      text-align: center;
      margin: 20px;
    }
  </style>
  ```

- `VideoList.vue` : class 추가

  ```vue
  <template>
    <ul class="list-group">
      <video-list-item v-for="video in videos" :key="video.etag" :video="video"></video-list-item>
    </ul>
  </template>
  ```

- `VideoListItem.vue` : class 추가

  ```vue
  <template>
    <li class="list-group-item">
      {{ video.snippet.title }}
    </li>
  </template>
  ```

![0001](https://user-images.githubusercontent.com/52685250/68562210-055af100-048c-11ea-99b2-b91b5c924b1c.JPG)

---

<br>

### 4.5 Thumbnail 이미지 출력

- Thumbnail 위치 : `video` > `snippet` > `thumbnails` > `default` > `url`

> `VideoListItem.vue`
>
> ```vue
> <template>
> <li class="list-group-item">
>   <img :src="video.snippet.thumbnails.default.url">
>   {{ video.snippet.title }}
> </li>
> </template>
> ```

- 하지만 `video.snippet.thumbnails.default.url`와 같이 길게 쓰는 것은 좋지 않아 미리 캐싱해두고 가져다가 쓰는 `computed`를 사용하자

> `VideoListItem.vue`
>
> ```vue
> <template>
> <li class="list-group-item">
>   <!-- 여기서 computed는 ()를 쓰지 않고 watched는 ()를 써야 한다! -->
>   <img :src="thumbnailUrl" alt="img">
>   <div class="media-body"> <!-- 글자가 어긋나게 삐져나가지 않도록 div 태그로 감싼다. -->
>       {{ video.snippet.title }}
>   </div>
> </li>
> </template>
> 
> <script>
> export default {
> name: 'VideoListItem', // VideoListItem의 최상위 컴포넌트는 VideoList 컴포넌트이다.
> props: {
>     video: {
>       type: Object,
>       requried: true,
>     }
> },
> computed: {
>     thumbnailUrl() {
>       return this.video.snippet.thumbnails.default.url // 이 곳에 미리 캐싱되어 있음
>     }
> }
> }
> </script>
> 
> <style scoped>
> li {
>   display: flex;
>   cursor: pointer;
> }
> 
> li:hover {
>   background-color: #eee; /* 마우스를 올렸을 때 회색 나게 한다. */
> }
> </style>
> ```

![005](https://user-images.githubusercontent.com/52685250/68562720-39371600-048e-11ea-8c4e-adfb4a8c61d3.JPG)

<br>

### 4.6 VideoDetail 컴포넌트 구성(조금 어려움)

- 데이터 전달 과정(컴포넌트 간의 관계를 잘 생각하자!)
  - `VideoListItem.vue` 에서 `VideoList.vue`로 데이터를 올리고,  다시 이를 `App.vue`로 올린다.
  - 그리고 `VideoDetail.vue`로 데이터를 내려 보내준다.

> `VideoListItem.vue`
>
> - `v-html` 속성을 이용하면 특수문자 깨짐 현상을 막을 수 있다.
>
> ```vue
> <template>
> <li @click="onVideoSelect" class="list-group-item">
>   <img :src="thumbnailUrl" alt="img"> <!-- 여기서 computed는 ()를 쓰지 않고 watched는 ()를 써야 한다! -->
>   <div class="media-body" v-html="video.snippet.title"> <!-- 글자가 어긋나게 삐져나가지 않도록 div 태그로 감싼다. -->
>   </div>
> </li>
> </template>
> 
> <script>
> export default {
> name: 'VideoListItem',
> props: {
>     video: {
>       type: Object,
>       requried: true,
>     }
> },
> methods: {
>     onVideoSelect() {
>       this.$emit('videoSelect', this.video) // VideoList로 올려 보내므로 emit 추가
>     }
> },
> computed: {
>     thumbnailUrl() {
>       return this.video.snippet.thumbnails.default.url 
>     }
> }
> }
> </script>
> ```

> `VideoList.vue`
>
> ```vue
> <template>
> <ul class="list-group">
>   <video-list-item
>       v-for="video in videos"
>       :key="video.etag"
>       :video="video"
>       @videoSelect="onVideoSelect">
>   <!-- VideoListItem.vue의 onVideoSelect와 다른 onVideoSelect 이다. -->
>   </video-list-item>
> </ul>
> </template>
> 
> <script>
> import VideoListItem from './VideoListItem'
> // VideoListItem의 최상위 컴포넌트는 VideoList 컴포넌트이므로 VideoListItem 컴포넌트 등록은 여기서 한다!
> export default {
> name: 'VideoList',
> components: {
>     VideoListItem,
> },
> methods: {
>     onVideoSelect(video) {
>       this.$emit('videoSelect', video) // App으로 올려 보내므로 emit 추가 
>     }
> },
> props: {
>     videos: {
>       type: Array,
>       required: true,
>     }
> }
> }
> </script>
> 
> <style>
> 
> </style>
> ```

> `App.vue`
>
> ```vue
> <template>
> <div id="app">
>   <search-bar @inputChange="onInputChange"></search-bar>
>   <!-- selecteVideo를 VideoDetail로 보내주기 위해 바인딩해준다. -->
>   <video-detail :video="selectedVideo"></video-detail>
>   <video-list @videoSelect="onVideoSelect" :videos="videos"></video-list>
> </div>
> </template>
> 
> <script>
> import axios from 'axios'
> import SearchBar from './components/SearchBar'
> import VideoList from './components/VideoList'
> import VideoDetail from './components/VideoDetail'
> const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY
> const API_URL = 'https://www.googleapis.com/youtube/v3/search'
> 
> export default {
> name: 'App',
> components: {
>   SearchBar, 
>   VideoList,
>   VideoDetail,
> },
> data() {
>   return {
>       videos: [],
>       // 올라온 video를 넣어줘야 하므로 새로운 변수 선언
>       // 선택 안 된 기본상태가 필요하므로 null 선언
>       selectedVideo: null,
>   }
> },
> methods: {
>   onVideoSelect(video) { // emit으로 받은 video를 selectedVideo에 할당 후 selectedVideo를 하위 컴포넌트인 VideoDetail.vue로 넘겨준다.
>       this.selectedVideo = video
>   },
>   onInputChange(inputValue) {
>       axios.get(API_URL, {
>         params: {
>           key: API_KEY,
>           type: 'video',
>           part: 'snippet',
>           q: inputValue,
>         }
>       })
>       .then(response => {
>         this.videos = response.data.items
>       })
>       .catch(err => {
>         console.log(err)
>       })
>   }
> }
> }
> </script>
> ```

> `VideoDetail.vue`
>
> ```vue
> <template>
> <!-- console에 출력되는 error를 처리하기 위해 video에 데이터가 있을 때만 출력! -->
> <div v-if="video" class="col-lg-8">
>   <div class="embed-responsive embed-responsive-16by9">
>       <iframe :src="videoUrl" frameborder="0" class="embed-responsive-item"></iframe>
>   </div>
>   <div class="details">
>     <!--
>       특수문자 인코딩 깨지는 것을 막기 위해
>       h4 태그 안에 작성했던 <h4>{{ video.snippet.title }}</h4>을
>       v-html을 이용해 <h4 v-html="video.snippet.title"></h4>로 작성한다.
>     -->
>       <h4 v-html="video.snippet.title"></h4>
>       <p>{{ video.snippet.description }}</p>
>   </div>
> </div>
> </template>
> 
> <script>
> export default {
> name: 'VideoDetail',
> props: { // App.vue에서 데이터를 받으므로 props 선언
>     video: {
>       type: Object,
>     }
> }
> }
> </script>
> 
> <style scoped>
> .details {
>   margin-top: 10px;
>   padding: 10px;
>   border: 1px solid #ddd;
>   border-radius: 4px;
> }
> </style>
> ```

- Youtube의 iframe을 이용해 동영상 띄우기 <a href="https://developers.google.com/youtube/iframe_api_reference" target="_blank">(참고 문서)</a>

> `VideoDetail.vue`
>
> ```vue
> <template>
> <div v-if="video">
>   <div> <!-- iframe 태그를 div 태그로 감싸 추가 -->
>       <iframe :src="videoUrl" frameborder="0"></iframe>
>   </div>
>   ...
> </div>
> </template>
> 
> <script>
> export default {
> ...
> computed: { // computed 구문 추가
>     videoUrl() {
>       const videoId = this.video.id.videoId
>       return `http://www.youtube.com/embed/${videoId}`
>     }
> }
> }
> </script>
> ```

![0005](https://user-images.githubusercontent.com/52685250/68564897-3ee42a00-0495-11ea-8f6d-05efac1a4710.JPG)

---

:art: <b>반응형 웹페이지로 다듬기</b>

> `VideoDetail.vue`
>
> ```vue
> <template>
> <div v-if="video" class="col-lg-8"> <!-- console에 출력되는 error를 처리하기 위해 video에 데이터가 있을 때만 출력! -->
>   <div class="embed-responsive embed-responsive-16by9">
>       <iframe :src="videoUrl" frameborder="0" class="embed-responsive-item"></iframe>
>   </div>
>  ...
> ```

> `App.vue`
>
> ```vue
> <template>
> <div id="app">
>   <search-bar @inputChange="onInputChange"></search-bar>
>   <div class="row">
>       <video-detail :video="selectedVideo"></video-detail>
>       <video-list @videoSelect="onVideoSelect" :videos="videos"></video-list>
>   </div>
> </div>
> </template>
> ```

> `VideoList.vue`
>
> ```vue
> <template>
> <ul class="col-lg-4 list-group">
> ..    
> </ul>
> </template>
> ```

:checkered_flag: <b>최종 결과 화면</b>

![6045](https://user-images.githubusercontent.com/52685250/68565172-07c24880-0496-11ea-911f-42d8808d55e0.JPG)

---

:crown: <b>Youtube Project 전체 흐름도</b>

- 아래 흐름도에서 `emmiti`를 `emit`으로 수정

<img src="https://user-images.githubusercontent.com/52685250/68567126-91284980-049b-11ea-94da-5653a82a608c.JPG" width="700px">

---

:triangular_flag_on_post: 참고로 이번 Youtube 프로젝트에서는`watched`는 사용하지 않고 `computed` 만으로 작성했는데 실제로 프로젝트 만들 때 가급적이면 `watched` 보다는 `computed`를 사용하는 것이 좋다. 그렇다고 아예 `watched`가 안 쓰이는 것은 아니다.