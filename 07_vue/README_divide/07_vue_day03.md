# :notebook_with_decorative_cover: 07_Vue - Day03

---

- 기본세팅 : vscode extensions `vetur`, `Vue VSCode Snippets` 설치(설치 순서 반드시 지키자!)
- chrome extension : 현재 페이지가 vue로 작성되었는지 확인 [(다운로드 페이지로 이동)](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd/related)
  - 다운로드 후 아이콘 오른쪽 버튼 > `확장 프로그램 관리` > `파일 URL에 대한 액세스 허용` ON
- 참고 사이트 : <a href="https://kr.vuejs.org/v2/guide/index.html" target="_blank">(Vue.js 공식 홈페이지)</a> <a href="https://github.com/vuejs/vue">(Vue.js 공식 github)</a>

---

<br>

## 3. 11월06일(3일차)

### 3.1 webpack의 기본 개념

![웹팩](https://user-images.githubusercontent.com/52685250/68270147-c4d03180-009f-11ea-9110-b2ddeb7bc485.JPG)

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

- javascript 관련 github에 가면 `package.json`에 기본 정보들이 담겨 있다.

  ![npm init](https://user-images.githubusercontent.com/52685250/68270403-7ec79d80-00a0-11ea-9ab1-33bbf4fac237.JPG)

- `npm init` 후 `npm install vue`, `npm i webpack webpack-cli -D` 설치

  이 때 `-D`는 배포가 아닌 개발할 때의 모드를 의미함.

- 설치하고 나면 `node_modules` 폴더가 새로 생긴다.

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
| entry   | <ul><li>여러 js 파일들의 시작점 => 웹팩이 파일을 읽어 들이기 시작하는 부분</li></ul> |
| module  | <ul><li>웹팩은 JS 만 변환 가능하기 때문에 HTML, CSS 등은 모듈을 통해서 웹팩이 이해할 수 있도록 변환이 필요하다.</li><li>변환 내용을 담는 곳</li></ul> |
| plugins | <ul><li>웹팩을 통해 번들된 결과물을 추가로 처리하는 부분</li></ul> |
| output  | <ul><li>여러 js 파일을 <b>하나로 만들어 낸 결과물</b></li></ul> |

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
      app: path.join(__dirname, 'src', 'main.js') // 경로 설정 (src(entry의 시작 파일)는 vue-cli의 기본값임)
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
  // (내가 판든 파일 아닌 경우) 현재 위치에서 vue 이름을 가진 폴더가 없음 => 자동으로 node_modules 에서 가져옴
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
  - `dist` 폴더에 `app.js` 파일이 생성됨을 볼 수 있다.

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
>   <!-- 이전 수업자료(02_todo_component.html)에 적었던 template 내용 -->
>   <div class="todo-list">
>     <h2>{{ category }}</h2>
>     <input type="text" v-model="newTodo">
>     <button @click="addTodo">+</button>
>     <li v-for="todo in todos" :key="todo.id">
>       <span>{{ todo.content }}</span>
>       <button @click="removeTodo(todo.id)">X</button>
>     </li>
>   </div>
> </template>
> 
> <script> // 이전 수업자료(02_todo_component.html)에 적었던 props 이하의 내용
>   export default {
>     props: {
>       category: {
>         type: String,
>         required: true,
>         validator: function (value) {
>           if (value.length < 5) {
>             return true
>           } else {
>             return false
>           }
>         },
>       }
>     },
>     data: function () {
>       return {
>         todos: [],
>         newTodo: '',
>       }
>     },
>     methods: {
>       addTodo: function () {
>         if (this.newTodo.length != 0) {
>           this.todos.push({
>             id: Date.now(),
>             content: this.newTodo,
>             completed: false,
>           })
>           this.newTodo = ''
>         }
>       },
>       removeTodo: function (todoId) {
>         this.todos = this.todos.filter(todo => {
>           return todo.id !== todoId
>         })
>       }
>     }
>   }
> </script>
> 
> <style> /* 이전 수업자료(02_todo_component.html)에 적었던 style 내용 */
>   .todo-list {
>     display: inline-block;
>     width: 33%;
>   }
> </style>
> ```

> `App.vue`
>
> ```vue
> <template>
>   <div> <!-- 반드시 div로 감싸줘야 한다.-->
>     <h1>여기는 최상위 컴포넌트 입니다.</h1>
>     <!-- 이하 component 사용 구문 -->
>     <!-- 3. 사용 -->
>     <todo-list category="취업특강"></todo-list>
>     <todo-list category="SSAFY"></todo-list>
>     <todo-list category="기타"></todo-list>
>   </div>
> </template>
> 
> <script>
>   // 1. 하위 컴포넌트 불러오기
>   import TodoList from './components/TodoList.vue'
> 
>   // 2. 불러온 컴포넌트를 최상위(부모) 컴포넌트에 등록
>   export default {
>     components: {
>       TodoList
>     }
>   }
> </script>
> 
> <style>
> 
> </style>
> ```

- 컴포넌트 등록 후 다시 `npm run build`를 하는데 이 때 오류가 발생한다. 하위 컴포넌트(`TodoList.vue`)에 작성된 css(`<style>` 부분)와 관련하여 npm을 설치해줘야 한다.

  ![css error](https://user-images.githubusercontent.com/52685250/68275208-534baf80-00ae-11ea-84d0-15a9bd66b4f6.JPG)

- css와 관련하여 npm 을 설치 => `npm install vue-style-loader css-loader -D`

- 그러면 `package.json`의 `devDependencies`에 두 개의 항목이 추가 된다.

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

### 3.3 Vue-CLI <a href="https://cli.vuejs.org/guide/installation.html">(공식 문서)</a>

#### (1) Installation

- `npm i -g @vue/cli`
  - vue-cli로 webpack 설정 등등 모든 것을 한 방에 해결해 준다.
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