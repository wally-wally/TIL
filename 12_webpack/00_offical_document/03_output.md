# 03. output

<br>

## (1) output

- output 속성은 번들을 내보낼 위치와 이 파일의 이름을 지정하는 방법을 webpack에 알려주는 역할을 한다.
  - 즉, 번들링된 결과물의 저장 위치와 저장 방법을 결정한다.
  - 기본 출력 파일의 경우에는 `./dist/main.js`로, 생성된 기타 파일의 경우에는 `./dist` 폴더로 설정된다.
- `output` 속성 지정 예시

```javascript
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js',
  },
};
```

- 위 예제는 `output.filename`과 `output.path` 속성을 사용하여 webpack에 번들의 이름과 내보낼 위치를 알려준다.
  - `filename` : 번들링된 결과물의 파일명
    - 만약 `filename`을 `[nane].js`로 하게 되면 `entry` 부분에서 선언한 `key`의 이름이 `[name]` 부분에 들어간다.
  - `path` : 번들링된 결과물 저장 경로(모든 출력 파일을 저장할 로컬 디렉토리 경로(절대 경로))
    - cf) `publicPath` : 배포 빌드 할 때 webpack plugins, CSS나 HTML 파일안에 URL 들을 업데이트 해주기 위한 것(prefix 개념)(번들 파일을 업로드 한 위치(서버 루트에 상대적))

---

### :heavy_plus_sign: `path` 모듈

- 파일 경로를 지정하기 위해 사용되는 core Node.js 모듈
  - `path.join()` : 함수의 인자 값으로 들어온 `string` 값들을 이어 붙여서 하나의 url 주소를 만들어준다.
    - 여기서 `__dirname` 이라는 인자 값을 많이 사용하는데 이는 프로젝트의 최상위 위치(entry directory)를 의미한다.
    - 만약 인자 값으로 `..`을 받게 되면 현재 경로에서 한 단계 위의 상위 경로를 의미한다.(`path.resolve()`도 공통 속성)
  - `path.resolve()` : `path.join()`과 유사하게 인자 값들을 하나로 합쳐 문자열 형태를 return하여 하나의 url 주소를 만들어준다.
    - 하지만 다른 점은 전달받은 경로 인자들의 맨 오른쪽부터 왼쪽으로 인자 값들을 합치는 것이다.(<b>역순으로 합치는 것이 아님을 주의</b>)
    - 그리고 인자 값들을 합치는 중 `/`를 만나면 절대경로로 인식해서 나머지 경로 인자 값들을 무시한다.

```javascript
path.join('foo', 'bar', 'baz/biz'); // returns: /foo/bar/baz/biz
path.join('foo', 'bar', 'baz/biz', '..'); // returns: /foo/bar/baz

path.resolve('foo', '/bar', 'baz/biz'); // returns: /bar/baz/biz
```

---

<br>

## (2) Multiple Entry Points

- 설정에서 하나 이상의 청크를 생성한다면 파일이 고유한 이름을 갖도록 해야 한다.

```javascript
module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/search.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
  },
};

// writes to disk: ./dist/app.js, ./dist/search.js
```

<br>

## (3) Advanced

- 에셋에서 CDN과 has를 사용한 복잡한 예시

```javascript
module.exports = {
  //...
  output: {
    path: '/home/proj/cdn/assets/[fullhash]',
    publicPath: 'https://cdn.example.com/assets/[fullhash]/',
  },
};
```

- 출력 파일의 최종 `publicPath`를 컴파일 시점에 알 수 없는 경우, 공백으로 남겨두고 런타임에 엔트리 포인트 파일의 `__webpack_public_path__`를 통해 동적으로 설정할 수 있다.

```javascript
__webpack_public_path__ = process.env.ASSET_PATH;
```

- `__webpack_public_path__` 의 사용 예시는 [여기](https://webpack.kr/guides/public-path/)를 참고해보자.
