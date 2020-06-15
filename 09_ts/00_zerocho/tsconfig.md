## tsconfig.md

---

:heavy_check_mark: 강의 들으면서 바로 정리한 내용이라 부족한 점이 많습니다.

---

- `--allowJS` : 점진적인 업그레이드할 때 true로 설정

- `--baseUrl` : 기본경로 정할 때 사용하는 옵션

- `--charset` : 주로 기본값인 `utf-8` 사용

- `--declaration` : 이 옵션을 true로 하면 `d.ts` 파일을 만들어서 우리 프로젝트만의 타입들을 정의할 수 있다.

- `--esModuleInterop` : 함부로 켜면 매우 위험한 옵션(가급적이면 이 옵션은 켜지 말자!)
  - ex) `import React from 'react';` 와 `import * as React from 'react';` 두 구문은 서로 완전히 다르다!

- `--emitDecoratorMetadata` : 필요에 따라 데코레이터 사용하고 싶을 때 열면 된다.

- `--experimentalDecorators` : 필요에 따라 데코레이터 사용하고 싶을 때 열면 된다.

- `--jsx` : react쓸 때 `.tsx` => `.jsx`로 변환시 사용

- `--lib` : 기본적으로 정의된 js 문법 이외에 다른 최신 문법을 쓰는 경우 Array 안에 원소로 추가해주면 된다.
  - 버전 넣을 때 `ES6`를 넣는 경우 가급적 `ES2015`, `ES2017`은 함께 꼭! 추가하자.

- `--outDir` : `.ts`와 변환된 `.js` 파일을 다른 경로로 나누고 싶을 때 이 옵션을 켠다.

- `--target` : 기본적으로 `ES3` 버전의 .js파일로 변환해주는데 다른 버전의 js 파일로 변환하고 싶을 때 설정한다.
  - 보통 `ES5`나 `ES6`를 사용한다.
  - cf) ES6 => IE11에서는 동작X, class 관련 작업시 ES5에서 오류 생길 수도...

- `types`, `--typeRoots` : 내가 만든 커스텀 `d.ts`의 경로를 지정할 때 사용

- `--strict` : 타입을 얼마나 엄격하게 설정할 지(이 옵션은 가급적 켜놓자!)
  - 기본적으로 `strict` 관련 옵션들과 `noImplicit` 관련 옵션들은  `true`로 설정하는 것이 좋다. 그래야 typescript를 사용하는 의미가 생긴다.

- `strictNullChecks` : true로 설정하면 `null`과 `undefined`를 구분해준다.

- `--module` : 주로 `target` 보고 설정함

- `include` : 컴파일할 `.ts` 파일들 작성
- `exclude` : 컴파일 제외시킬 `.ts` 파일들 작성

- `extends` : 해당 폴더 안에 typescript 프로젝트가 여러 개 있을 때 공통 `tsconfig.json`이 있고 각 프로젝트마다 `tsconfig.json`가 있는 경우 각 프로젝트마다 `tsconfig.json` 내용을 확장할 수 있다.