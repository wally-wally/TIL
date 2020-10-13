# Svelte 주의사항

<br>

## 1. CDN으로 Svelte를 사용할 수 없다.

- Svelte는 빌드 타임에 반응형이 결정된다.
  - 런타임이 필요하지 않다.
  - 번들된 파일에는 런타임이 포함되지 않으므로 번들의 크기가 작다.
  - 오버헤드를 줄여 성능이 향상된다는 장점이 있다.
- 런타임은 가상돔의 차이를 비교하여 차이점을 실제돔에 적용하는 역할을 한다.
  - 런타임이 있어야만 CDN이나 웹 IDE에서 사용할 수 있다.
  - Svelte는 런타임을 포함하고 있지 않기 때문에 CDN이나 웹 IDE에서 사용할 수 없다.

<br>

## 2. 브라우저 지원 체크가 필요하다.

- 공식 문서에서 정식으로 어느 브라우저까지 지원한다고 이야기하고 있지 않다.
  - IE11 이하의 구형 브라우저에서 Svelte를 사용하기 위해서는 별도의 설정 작업이 필요하다.
  - 크로스 브라우징 이슈에 민감한 서비스에서는 Svelte를 추천하지 않는다.

<br>

## 3. Svelte 생태계를 생각해야 한다.

> **Svelte는 신규 프레임워크여서 Vue나 React 만큼 생태계가 크지 않다.**

- CLI
  - React의 `create-react-app`이나 Vue나 `vue-cli`와 같이 간편하게 프로젝트를 생성할 수 있는 CLI가 존재하지 않는다.
  - 다만, Github에 `rollup`, `webpack` 번들러 2가지 버전의 보일러 플레이트가 올라와 있어, clone으로 프로젝트를 생성할 수 있다.
- Store
  - Svelte는 별도의 라이브러리를 사용하지 않아도 Svelte 안에 Store 기능을 포함한다.
- Router
  - Svelte에서 공식적으로 제공하는 router가 없다.
  - `svelte-spa-router`가 가장 많이 사용되는 라이브러리이다.

<br>

## :mag: Degit으로 svelte 프로젝트 생성하기

- Rollup 프로젝트

```bash
npx degit sveltejs/template my-svelte-project
cd my-svelte-project
npm i
npm run dev
```

- Webpack 프로젝트

```bash
npx degit sveltejs/template-webpack my-svelte-project-webpack
cd my-svelte-project-webpack
npm i
npm run dev
```

