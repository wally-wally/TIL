# :notebook_with_decorative_cover: 07_Vue - Day02

---

- 기본세팅 : vscode extensions `vetur`, `Vue VSCode Snippets` 설치(설치 순서 반드시 지키자!)
- chrome extension : 현재 페이지가 vue로 작성되었는지 확인 [(다운로드 페이지로 이동)](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd/related)
  - 다운로드 후 아이콘 오른쪽 버튼 > `확장 프로그램 관리` > `파일 URL에 대한 액세스 허용` ON
- 참고 사이트 : <a href="https://kr.vuejs.org/v2/guide/index.html" target="_blank">(Vue.js 공식 홈페이지)</a> <a href="https://github.com/vuejs/vue">(Vue.js 공식 github)</a>

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