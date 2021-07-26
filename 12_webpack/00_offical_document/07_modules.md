# 07. modules

<br>

> 모듈형 프로그래밍(modular programmming)에서 개발자는 <b>모듈</b>이라는 개별 기능으로 프로그램을 나눕니다.
>
> 각 모듈은 전체 프로그램보다 영향 범위가 좁기 때문에 검증과 디버깅 및 테스트가 간단합니다.
>
> 잘 작성된 모듈은 견고한 추상화와 캡슐화의 경계를 만들므로 각 모듈은 전체 애플리케이션에서 일관성 있는 설계와 명확한 목적을 가질 수 있습니다.

<br>

## (1) What is a webpack Module

- webpack 모듈은 다양한 방식으로 의존성을 표현할 수 있다.
  - ES2015의 `import` 문
  - CommonJS의 `require()` 문
  - AMD의 `define`과 `require` 문
  - css/sass/less 파일 내의 `@import` 문
  - 스타일 시트 `url()` 의 이미지 URL 또는 HTML `<img src="...">` 파일

<br>

## (2) Supported Module Types

- webpack은 기본적으로 다음 유형의 모듈을 지원한다.
  - ECMAScript 모듈(ESM)
    - ESM은 웹에서 모듈을 사용하기 위한 사양이다.
    - 모든 최신 브라우저와 권장하는 웹 모듈 코드 작성법에서 지원된다.
    - `export` 키워드로 ESM 항목을 다른 모듈에 노출할 수 있고 `import` 키워드로 다른 모듈에 대한 참조를 ESM으로 가져올 수 있다.
  - CommonJS 모듈
  - AMD 모듈
  - Assets
    - Asset Module은 로더를 추가로 구성ㅇ하지 않아도 asset 파일(폰트, 아이콘 등)을 사용할 수 있도록 해주는 모듈이다.
    - webpack 5 이전에는 `raw-loader`, `url-loader`, `file-loader`를 사용하는 것이 일반적이었으나 webpack 5 버전에서는 이러한 로더를 대체하기 위한 4개의 새로운 모듈 유형이 추가되었다. ([webpack 공식 문서 - Asset Modules 참고](https://webpack.kr/guides/asset-modules/))
  - WebAssembly 모듈

- 그 밖에도 webpack은 여러 언어로 작성된 모듈과 로더를 통한 다양한 전처리기를 지원한다.
  - 로더는 webpack에서 네이티브가 아닌 모듈을 어떻게 처리하고 이러한 의존성을 번들에 포함할지 정의한다.
