# :computer: Vue with Typescript #1

<br>

## 1. Create vue project with Typescript

- vue project 생성

```bash
vue create vue-project
```

- vue project에 typescript를 적용하기 위해 preset을 `Manually` 옵션으로 선택

![캡처01](https://user-images.githubusercontent.com/52685250/82523511-6c5a1080-9b67-11ea-87ef-cf01f52b8a91.JPG)

- 아래 사진과 같이 feature들을 선택(`Babel` 항목 반드시 해제!)

![캡처02](https://user-images.githubusercontent.com/52685250/82523596-a2979000-9b67-11ea-865d-79a7c66fc33a.JPG)

- 세 가지 항목에 대해 아래와 같이 작성
  - `Use class-style component syntax?` : Class-Based 컴포넌트 형태로 만들건지 확인
  - `Use Babel alongside TypeScript?` : Babel을 따라 스캐폴딩을 할건지 체크
  - `Use history mode for router?` : vue-router에서 history mode를 사용할 건지 여부 확인

![캡처03](https://user-images.githubusercontent.com/52685250/82523854-4719d200-9b68-11ea-804e-58a1c67f96fd.JPG)

- 어느 lint를 선택할 건지 고르는 문항인데 이전에는 Typescript로 개발할 때는 보통 `TSLint`를 선택했다.
  - 하지만 아래 사진에서 보시다시피 `TSLint`는 `deprecated` 즉, 더 이상 사용되지 않는 linter이기 때문에 요즘은 `ESLint`와 `Prettier`를 조합(네 번째 항목)해서 많이 쓴다고 한다.
  - 지금은 Vue project에 Typescript를 어떻게 적용하는지 학습하는 과정이므로 `TSLint`를 선택해도 무방하다. 우선 `TSLint`를 선택하자.

![캡처04](https://user-images.githubusercontent.com/52685250/82523961-93fda880-9b68-11ea-8c68-a0a22ea44e58.JPG)

- linter 관련 추가 설정 여부를 묻는 항목인데 default 값인 `Lint on save`를 선택하자.

![캡처05](https://user-images.githubusercontent.com/52685250/82524068-ee970480-9b68-11ea-86d8-32fde4325c67.JPG)

- Babel, ESLint, TSLint 등 관련 내용들을 하나의 파일로 합칠지(`In package.json`) 아니면 각각 파일을 만들지(`In dedicated config files`) 묻는 항목이다.
  - 각각 파일로 만들기 위해 첫 번째 항목을 선택하자.

![캡처06](https://user-images.githubusercontent.com/52685250/82524120-15edd180-9b69-11ea-8a40-60c0acbe4077.JPG)

- 다음 프로젝트를 위해 지금까지 설정한 preset 설정들을 저장할 것인지 묻는 항목인데 굳이 저장할 필요가 없기 때문에 `N`(또는 `n`)을 입력한다.

![캡처07](https://user-images.githubusercontent.com/52685250/82524210-55b4b900-9b69-11ea-9214-68cb9928df82.JPG)

- 프로젝트 생성 후 vscode에서 왼쪽에 있는 파일트리가 아래 사진과 같이 형성되면 프로젝트가 올바르게 생성된 것이다.

![캡처08](https://user-images.githubusercontent.com/52685250/82524303-8bf23880-9b69-11ea-9c54-3961a2b55222.JPG)

<br>

## 2. `tsconfig.json` & `tslint.json`

### (1) `tsconfig.json`

- `tsconfig.json` 파일은 typescript가 어떠한 방식으로 build되서 javascript 파일로 만들어줄 지 설정하는 파일이다.
  - 즉, typescript 언어를 사용하면 `tsconfig.json` 항상 함께 따라오는 파일이다.

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "strict": true,
    "jsx": "preserve",
    "importHelpers": true,
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "sourceMap": true,
    "baseUrl": ".",
    "types": [
      "webpack-env"
    ],
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "tests/**/*.ts",
    "tests/**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ]
}

```

- 위와 같이 굉장히 많은 설정 옵션들이 있어서 중요한 항목들만 잠깐 살펴보자.
  - 참고로 `tsconfig.json` 옵션들은 공식문서를 보면서 필요할 때마다 찾아서 설정하는 것이 가장 좋다!
  - tsconfig.json의 complier option 내용 => <a href="https://www.typescriptlang.org/docs/handbook/compiler-options.html" target="_blank">(공식 문서로 바로 이동)</a>
- `target` : build된 Javascript의 버전을 설정할 수 있음
- `module` : Javascript module과 관련된 설정 항목
- `strict` : 엄격 모드 설정 여부
- `jsx` : 주로 react에서 typescript로 개발할 때 `jsx` 파일로 변환할 지 체크하는 항목이여서 지금은 패스
- `moduleResolution` : module 해석 방식으로 우리는 node를 사용하기 때문에 `node`로 값이 설정되어 있음
- `experimentalDecorators` : 데코레이터(Decorator)를 사용하고 싶을 때 `true`로 켜면 된다.
- `lib` : 기본적으로 정의된 JS 문법 이외에 다른 최신 문법을 쓰는 경우 Array 안에 원소로 추가해주면 된다.
  - 버전 넣을 때 `ES6`를 넣는 경우 가급적 `ES2015`, `ES2017`은 함께 꼭! 추가하자.
- `include` : include 안에 있는 파일들을 Javascript 파일로 변환해줌
- `exclude` : Javascript 파일로 변환하는데 제외시킬 항목들을 여기에 작성

<br>

### (2) `tslint.json`

```json
{
  "defaultSeverity": "warning",
  "extends": [
    "tslint:recommended"
  ],
  "linterOptions": {
    "exclude": [
      "node_modules/**"
    ]
  },
  "rules": {
    "indent": [true, "spaces", 2],
    "interface-name": false,
    "no-consecutive-blank-lines": false,
    "object-literal-sort-keys": false,
    "ordered-imports": false,
    "quotemark": [true, "single"]
  }
}
```

- Typescript 언어로 코드를 작성할 때 지켜야 할 코딩 컨벤션 같은 것들을 설정할 수 있다.
- 예를 들어 `rules` 안에 있는 `indent` 항목을 보면 `space`, `2`로 설정되어 있는 것으로 보아 `Tab` 키를 눌렀을 때 적용되는 인덴트를 2칸으로 설정한다는 의미이다.

<br>

## 3. `@Component`

- `template` 단에서 작성하는 방식은 기존과 유사하나 `script` 단에서 사용되는 언어가 `Typescript` 이기 때문에 이 부분이 많이 다르다.
  - <b><u>그렇기 때문에 `script` 여는 태그 안에 `lang="ts"`를 반드시 작성해줘야 한다!</u></b>
- 우선 우리는 vue project에 Typescript 를 적용하기 위해 `vue-property-decorator`를 사용할 것이다.
- 첫 번째로 `@Component` 는 컴포넌트를 만들 때 기본적으로 작성하는 데코레이터이다.
- `@Component` 데코레이터는 클래스가 Vue 컴포넌트임을 나타낸다.

> `기존 JS 버전`
>
> ```vue
> <template>
>   <div>
>     <input type="text" v-model="message">
>     <div>{{ message }}</div>
>   </div>
> </template>
> 
> <script>
> export default {
>   data() {
>     return {
>       message: '메세지를 입력해주세요.';
>     }
>   }
> }
> </script>
> ```

> `TS 적용 버전` (`src/components/Message.vue`)
>
> ```vue
> <template>
>   <div>
>     <input type="text" v-model="message">
>     <div>{{ message }}</div>
>   </div>
> </template>
> 
> <script lang="ts">
> import { Component, Vue } from 'vue-property-decorator';
> 
> @Component
> export default class Message extends Vue {
>   message: string = '메세지를 입력해주세요.';
> }
> </script>
> ```

- `Message` 컴포넌트 작성 후 `views` 폴더의 `Home.vue` 에 아래와 같이 코드를 작성한다.

```vue
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Message></Message>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Message from '@/components/Message.vue';

@Component({
  components: {
    Message,
  },
})
export default class Home extends Vue {}
</script>
```

- 하지만 지금까지 완성된 프로젝트를  `npm run serve`로 열면 아래와 같이 Typescript 관련 주의 문구가 나온다.

![캡처09](https://user-images.githubusercontent.com/52685250/82526256-81866d80-9b6e-11ea-83a9-8dff1111c788.JPG)

- 접근자 관련 문구인데 Typescript 에서 class 내에 변수를 선언할 때에는 `private`, `public`, `protected` 와 같은 접근자를 작성해줘야 한다.
- 하지만 지금은 접근자를 작성할 필요가 없기 때문에 `tslint.json` 에서 아래와 같은 주의 문구가 나오지 않도록 설정한다.

- `tsconfig.json`
  - `member-access` 의 default 값이 `true` 이므로 `false`로 설정해준다.

```json
{
  // 중략
  "rules": {
    "indent": [true, "spaces", 2],
    "interface-name": false,
    "no-consecutive-blank-lines": false,
    "object-literal-sort-keys": false,
    "ordered-imports": false,
    "quotemark": [true, "single"],
    "member-access": false // 이 구문 추가
  }
}

```

- 저장 후 서버를 끄고 `npm run serve`로 서버를 다시 켜서 terminal 창을 확인하면 주의 문구가 나오지 않는다.