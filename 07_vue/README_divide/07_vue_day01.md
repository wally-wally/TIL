# :notebook_with_decorative_cover: 07_Vue - Day01

---

- 기본세팅 : vscode extensions `vetur`, `Vue VSCode Snippets` 설치(설치 순서 반드시 지키자!)
- chrome extension : 현재 페이지가 vue로 작성되었는지 확인 [(다운로드 페이지로 이동)](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd/related)
  - 다운로드 후 아이콘 오른쪽 버튼 > `확장 프로그램 관리` > `파일 URL에 대한 액세스 허용` ON
- 참고 사이트 : <a href="https://kr.vuejs.org/v2/guide/index.html" target="_blank">(Vue.js 공식 홈페이지)</a> <a href="https://github.com/vuejs/vue">(Vue.js 공식 github)</a>

---

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

  `el: 'div'` : `div` 태그와 마운트 / `el: '#app'` : `app` id와 마운트
  
  ```html
  <body>
    {{ message }} <!-- view랑 연결되어 있지 않으므로(mount 안 됨) vue의 속성을 받지 못하고 저 글자 그대로 출력된다. -->
    <div id="app">
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