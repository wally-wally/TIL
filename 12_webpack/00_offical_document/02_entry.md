# 02. entry

<br>

## (1) entry

- webpack이 내부의 Dependency Graph를 생성하기 위해 사용해야 하는 모듈
- webpack은 엔트리 포인트가 의존하는 다른 모듈과 라이브러리를 찾아낸다.
- 기본값은 `./src/index.js` 이지만, webpack의 `entry` 속성을 설정하여 다른 (또는 여러 엔트리 포인트)를 지정할 수 있다.

<br>

## (2) Single Entry Syntax

```javascript
module.exports = {
  entry: {
    main: './path/to/my/entry/file.js',
  },
};
```

```javascript
module.exports = {
  entry: ['./src/file_1.js', './src/file_2.js'],
  output: {
    filename: 'bundle.js',
  },
};
```

- 다중-메인 엔트리로 알려진 것을 생성하기 위해 `entry` 속성에 파일 경로를 배열로 전달할 수 있다.
  - 이는 여러 의존성 파일을 한 번에 주입하고 해당 의존성을 하나의 "청크"에 그래프로 표시하려는 경우에 유용하다.

- 단일 엔트리 구문은 라이브러리같이 하나의 엔트리 포인트가 있는 애플리케이션 또는 도구에 대한 webpack 설정을 빠르게 설정하려는 경우 훌륭한 선택이다.
  - 그러나, 이 구문을 사용하면 설정을 확장할 수 있는 유연성이 떨어지게 됩니다.

<br>

## (3) Object Syntax

```javascript
module.exports = {
  entry: {
    app: './src/app.js',
    adminApp: './src/adminApp.js',
  },
};
```

- 위와 같이 객체 형태로 작성하면 entry를 확장하여 설정할 수 있다.
  - 확장 가능한 webpack 설정은 재사용 가능하고 설정의 다른 부분과 결합할 수 있는 것이다.
  - 이것은 환경, 빌드 대상, 런타임 별로 관심사를 구분하는데 사용되는 인기 있는 기술이다.
  - 그런 다음 webpack-merge와 같은 특수 도구를 사용하여 병합된다.

---

### :heavy_plus_sign: webpack-merge

- 여러 개의 webpack 설정을 하나로 병합해주는 라이브러리
- 개발용과 배포용 webpack 설정을 나눠서 작성할 수 있다.
- **한 webpack 설정 파일에 실행 모드에 따라 조건문으로 분기 처리할 수 있으나 아예 파일을 나눠놓은 방식을 더 권장**한다.
- 각 파일별 작성하면 좋은 내용
  - 공통 설정 파일에는 엔트리, 아웃풋, 플러그인과 같이 실행 모드에 관계 없이 항상 들어가야 하는 코드를 추가한다.
  - 개발용 설정 파일에는 개발자 도구나 웹팩 데브 서버와 같은 설정을 추가한다.
    - 그리고 `webpack-merge` 라이브러리를 설치 및 로딩하고 나서 웹팩 공통 설정 파일인 `webpack.common.js` 파일을 로딩해서 같이 병합해준다.
  - 배포용 설정 파일에는 배포하기 전 웹 리소스 최적화를 위한 설정들을 추가해준다.

```javascript
// webpack.common.js

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(),
  ],
}
```

```javascript
// webpack.dev.js
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: { contentBase: './dist' }
});
```

```javascript
// webpack.prod.js
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production'
});
```

:book: <b>Reference</b>

- https://joshua1988.github.io/webpack-guide/advanced/webpack-merge.html#%EC%9B%B9%ED%8C%A9-%EC%84%A4%EC%A0%95-%ED%8C%8C%EC%9D%BC-%EA%B5%AC%EB%B6%84-%EC%A0%84%EB%9E%B5

<br>

## (4) EntryDescription object

```javascript
module.exports = {
  entry: {
    a2: 'dependingfile.js',
    b2: {
      dependOn: 'a2',
      import: './src/app.js',
    },
  },
};
```

| 속성       | 설명                                                         |
| ---------- | ------------------------------------------------------------ |
| dependOn   | 현재 entry point가 의존하는 entry point. 이 entry point를 로드하기 전에 로드해야 함 |
| filename   | 디스크에 있는 각 출력 파일의 이름 지정                       |
| import     | 시작 시 로드되는 모듈                                        |
| library    | 현재 entry에서 라이브러리를 번들링하려면 [라이브러리 옵션](https://webpack.kr/configuration/output/#outputlibrary)을 지정한다. |
| runtime    | 런타임 청크의 이름으로 설정되면 이 이름의 런타임 청크가 생성되고 그렇지 않으면 기존 엔트리 포인트의 이름이 사용된다. |
| publicPath | 브라우저에서 참조할 때 이 엔트리의 출력 파일에 대한 공용 URL 주소 |

:warning: <b>주의사항</b>

- `runtime`이 기존의 엔트리 포인트 이름을 가리키지 않아야 한다. 예를 들어 아래 설정에서는 오류가 발생한다.
- 또한 `dependOn`은 순환이 아니어야 하며, 다음 예제에서는 다시 오류가 발생한다.

---

### :heavy_plus_sign: `output.library`

- 엔트리 포인트의 export를 내보내는 라이브러리 설정

- 단일 엔트리 파일인 경우 사용하는 예시

```javascript
module.exports = {
  // …
  entry: './src/index.js',
  output: {
    library: 'MyLibrary',
  },
};
```

- 예를 들어 `src/index.js`를 엔트리에서 함수를 export했다고 가정하자.

```javascript
export function hello(name) {
  console.log(`hello ${name}`);
}
```

- 변수 `MyLibrary`가 엔트리 파일의 export와 바인딩된다.

```html
<script src="https://example.org/path/to/my-library.js"></script>
<script>
  MyLibrary.hello('webpack');
</script>
```

---

- Multi Page Application 예시

```javascript
module.exports = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js',
  },
};
```

- 3개의 개별 디펜던시 그래프를 원한다고 webpack에게 알려준다.
  - MPA에서 서버가 새 HTML 문서를 가져오고 페이지가 새 문서를 다시 로드하고 asset이 다시 다운로드된다.
  - 하지만 이것은 `optimization.splitChunks`를 사용하여 각 페이지 간에 공유되는 앺르리케이션 코드 번들을 만드는 것과 같은 작업을 수행할 특별한 기회를 제공한다.
  - 엔트리 포인트들 사이에 코드/모듈을 많이 재사용하는 MPA는 엔트리 포인트 수가 증가함에따라 이런 기법의 혜택을 크게 얻을 수 있다.

---

### :heavy_plus_sign: `optimization.splitChunks`

- 기존 entry나 새로운 chunk의 공통 의존성을 추출한다.

- 예를 들어 위 코드에 나와 있는 세 가지 엔트리 포인트에 각각 특정 라이브러리를 import하고 빌드를 하면 3개의 번들에서 해당 라이브러리를 각각 가지고 있는 모습을 볼 수 있다.
- 이러한 중복을 줄이기 위해 아래와 같은 설정을 추가하자.

```javascript
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}
```

- 위와 같이 설정하고 `npm run build`를 다시 실행하면 빌드 결과물이 1개 추가된다.
- 즉, 공통 의존성은 따로 split하여 중복 제거하는 것이 좋다.
- 참고로 `chunks` 옵션은 최적화를 위해 선택할 청크를 나타내고 `all`,  `async`, `initial` 세 가지 값이 올 수 있다.
  - 각 세 가지의 옵션에 관한 상세 내용은 [여기](https://simsimjae.medium.com/webpack4-splitchunksplugin-%EC%98%B5%EC%85%98-%ED%8C%8C%ED%97%A4%EC%B9%98%EA%B8%B0-19f5de32425a)를 참고하자.

:book: <b>Reference</b>

- https://hoilzz.github.io/webpack/6-code-split/#2-%EC%A4%91%EB%B3%B5-%EB%B0%A9%EC%A7%80

