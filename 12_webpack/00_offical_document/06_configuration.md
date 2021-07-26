# 06. configuration

<br>

## (1) configuration

> 가장 중요한 부분은 webpack **설정을 형식화**하고 스타일을 지정하는 다양한 방법이 있다는 것이다.
>
> 핵심은 **이해하고 유지보수할 수 있는 방식을 선택하여 일관된 형식을 유지**하는 것이다.

- webpack은 표준 Node.js Common JS 모듈이므로, 다음과 같은 작업을 할 수 있다.
  - `require()` 를 통해 다른 파일 가져오기
  - `require()` 를 통해 npm 유틸리티 사용하기
  - `?:` 연산자 같은 JavaScript 제어 흐름 표현식 사용하기
  - 자주 사용되는 값에 상수 또는 변수 사용하기
  - 설정 일부를 만들어 내는 함수 작성 및 실행하기
- 단, 아래 방법의 사용은 피해야 한다.
  - webpack CLI를 사용할 때 CLI를 작성하거나 `--env`를 사용하는 대신, CLI 인자에 접근하기
  - 결정되지 않은 값을 내보내기 (webpack을 두 번 호출하면 동일한 출력 파일이 생성됨)
  - 긴 설정 작성하기 (대신 설정을 여러 파일로 분할)

- webpack에서 설정할 수 있는 옵션들은 [여기](https://webpack.kr/configuration/)에서 확인하자.

<br>

## (2) Multiple Targets

- 단일 설정을 객체, 함수 또는 promise로 export 하는 것과 함께, 다중 설정을 export 할 수 있다.
- webpack을 실행할 때, 모든 설정이 빌드된다.
- 예를 들어, AMD나 Common JS 같은 여러 개의 target을 위한 라이브러리 빌드 시 유용하다.

```javascript
module.exports = [
  {
    output: {
      filename: './dist-amd.js',
      libraryTarget: 'amd',
    },
    name: 'amd',
    entry: './app.js',
    mode: 'production',
  },
  {
    output: {
      filename: './dist-commonjs.js',
      libraryTarget: 'commonjs',
    },
    name: 'commonjs',
    entry: './app.js',
    mode: 'production',
  },
];
```

- 만약 이름을 `--config-name` 플래그에 전달하면 `webpack`은 특정한 설정만 빌드하게 된다.

```bash
npx webpack --config-name amd
```

- 혹은 여러 값을 전달할 수도 있다.

```bash
npx webpack --config-name amd --config-name commonjs
```

<br>

## (3) Using other Configuration Languages

- webpack은 다양한 프로그래밍 및 데이터 언어로 작성된 설정 파일을 허용한다.

### :star: Typescript에서 webpack 설정하기

- 먼저 필요한 디펜던시, 예를들면 TypeScript와 [DefinitelyTyped](https://definitelytyped.org/)에서 관련있는 타입 정의를 설치해야 한다.

```bash
npm install --save-dev typescript ts-node @types/node @types/webpack
npm install --save-dev @types/webpack-dev-server
```

- 설치 후 webpack 설정 파일을 작성한다.

```typescript
// webpack.config.ts
// TypeScript 2.7 이상 버전의 tsconfig.json 파일에서 새로운 esModuleInterop 및 allowSyntheticDefaultImports 컴파일러 옵션과 함께 사용된다고 가정

import * as path from 'path';
import * as webpack from 'webpack';
import 'webpack-dev-server';

const config: webpack.Configuration = {
  mode: 'production',
  entry: './foo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js',
  },
};

export default config;
```

- 이 때 `tsconfig.json` 파일에서 `complierOptions`의 설정에서 `target` 옵션을  `"ES5"`로 설정하고 `module` 옵션을 `"CommonJS"` 또는 이 옵션을 완전히 제거해야 한다.
  - `target` : 사용할 특정 ECMAScript 버전 설정 / 빌드 결과물의 ECMAScript 버전
    - 'ES3' (기본), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', 혹은 'ESNEXT'
  - `module` : 모듈을 위한 코드 생성 설정 / 어떤 모듈 방식으로 컴파일할지 결정
    - 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'

```json
// tsconfig.json 예시

{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "esModuleInterop": true
  }
}
```

