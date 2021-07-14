# 04. loaders

<br>

## (1) loaders

- webpack은 기본적으로 Javascript와 JSON 파일만 이해한다.
  - 그래서 `loader`를 사용하면 webpack이 다른 유형의 파일을 처리하거나, 유효한 모듈로 변환하여 애플리케이션에서 사용하거나 디펜던시 그래프에 추가한다.
- 로더는 모듈의 소스 코드에 변경 사항을 적용한다.
  - 파일을 `import` 하거나 로드할 때 전처리를 할 수 있다.

- 상위 수준에서 로더는 아래와 같은 두 가지 속성을 가진다.

| 속성명 | 설명                                                         |
| ------ | ------------------------------------------------------------ |
| `test` | <ul><li>변환이 필요한 파일(들)을 식별하는 속성</li><li>로더가 처리해야하는 파일들의 패턴(정규표현식)</li></ul> |
| `use`  | <ul><li>변환을 수행하는데 사용되는 로더를 가리키는 속성</li><li>이 때 `use`에 작성한 로더를 배열로 작성하면 로드되는 순서는 뒤부터 진행된다.</li></ul> |

```javascript
const path = require('path');

module.exports = {
  output: {
    filename: 'my-first-webpack.bundle.js',
  },
  module: {
    // '.txt' 파일로 확인되는 경로를 발견하면 번들에 추가하기 전에 'raw-loader'를 사용하여 변환하라는 의미
    rules: [{ test: /\.txt$/, use: 'raw-loader' }], 
  },
};
```

---

:round_pushpin: <b>loader 사용 예시(1)</b>

- 모든 `.css` 파일에 `css-loader` 사용, `.ts` 파일에는 `ts-loader` 사용

```javascript
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' },
    ],
  },
};
```

---

:round_pushpin: <b>loader 사용 예시(2)</b>

- 아래 코드는 주로 `sass` 파일이 있는 경우 설정하는 예시이다.
- `loader`의 로드 순서는 반드시 `sass-loader` => `css-loader` => `style-loader` 이어야 한다.

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          // [style-loader](/loaders/style-loader)
          { loader: 'style-loader' },
          // [css-loader](/loaders/css-loader)
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          // [sass-loader](/loaders/sass-loader)
          { loader: 'sass-loader' }
        ]
      }
    ]
  }
};
```

---

<br>

## (2) Loader Features

- 로더는 연결할 수 있다.
  - 체인의 각 로더는 처리된 리소스에 변환을 적용한다.
  - 체인은 역순으로 실행된다.
  - 첫 번째 로더는 변환이 적용된 리소스를 다음 로더로 전달하며, 전달은 다음 로더로 계속된다.
  - webpack은 체인의 마지막 로더가 Javascript를 반환할 것으로 예상한다.
- 로더는 동기식 도는 비동기식일 수 있다.
- 로더는 `Node.js`에서 실행되며 `Node.js`에서 가능한 모든 작업을 수행할 수 있다.
- 로더는 `options` 객체로 구성할 수 있다.
  - `query` 파라미터 방식은 지양
- 일반 모듈은 `loader` 필드가 있는 `package.json`을 통해 `main` 및 로더를 내보낼 수 있다.
- 플러그인은 로더에 더 많은 기능을 제공할 수 있다.
- 로더는 추가로 임의의 파일을 생성할 수 있다.
