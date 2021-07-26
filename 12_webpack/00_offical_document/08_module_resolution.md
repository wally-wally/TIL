# 08. module resolution

<br>

---

- 리졸버는 절대 경로로 모듈을 찾는 데 도움이 되는 라이브러리이다.
  - 모듈은 다음과 같이 다른 모듈의 의존성으로서 필요할 수 있습니다.

```javascript
import foo from 'path/to/module';
// 또는
require('path/to/module');
```

- 의존성 모듈은 애플리케이션 코드 또는 써드 파티 라이브러리에서 가져올 수 있다.
  - 리졸버는 webpack이 모든 `require`/`import` 문에 대해 번들에 포함되어야 하는 모듈의 코드를 찾는 데 도움을 준다.
  - webpack은 모듈을 번들링하는 동안 파일 경로를 확인하기 위해 [enhanced-resolve](https://github.com/webpack/enhanced-resolve)를 사용합니다.

---

<br>

## (1) Resolving rules in webpack

- `enhanced-resolve`를 사용하여 webpack은 세 가지 종류의 파일 경로를 확인할 수 있다.

---

### :star: Absolute paths

```javascript
import '/home/me/file';

import 'C:\\Users\\me\\file';
```

- 이미 파일에 대한 절대 경로가 있으므로 끝!

<br>

### :star: Relative paths

``` javascript
import '../src/file1';
import './file2';
```

- 이 경우 `import` 또는 `require`가 발생하는 리소스 파일의 디렉터리를 컨텍스트 디렉터리로 간주한다.
-  `import/require`에 지정된 상대 경로는 이 컨텍스트 경로에 결합되어 모듈에 대한 절대 경로를 생성한다.

<br>

### :star: Module paths

```javascript
import 'module';
import 'module/lib/file';
```

- 모듈은 [`resolve.modules`](https://webpack.kr/configuration/resolve/#resolvemodules)에 지정된 모든 디렉터리 내에서 검색된다.
- [`resolve.alias`](https://webpack.kr/configuration/resolve/#resolvealias) 구성 옵션을 사용하여 별칭을 만들어 원래 모듈 경로를 대체 경로로 바꿀 수 있다.

---

### :star: `resolve`

- 모듈 해석에 대한 설정.

  - 예를 들어 ES2015에서 `import 'lodash'`를 호출할 때, `resolve` 옵션은 webpack이 `'lodash'`를 찾는 위치를 변경할 수 있다.

- `alias`

  - `import`나 `require`로 간단히 특정 모듈의 별칭을 만들 수 있다.
  - 예를 들어, 일반적으로 사용되는 `src/` 폴더의 별칭을 지정할 수 있다.

- `extensions`

  - `extensions: ['.js', '.json', '.wasm'],`와 같이 작성할 수 있으며 배열의 요소가 여러 개이면 확장자를 순서대로 해석한다.
  - 여러 파일에서 이름이 동일하지만 다른 확장자를 가진 경우, webpack은 배열의 앞에서부터 파일을 해석하고 남은 것은 해석하지 않는다.

- `fallback`

  - 정상적인 확인이 실패할 대 모듈 요청을 리디렉션한다.

- `modules`

  - 모듈을 해석할 때 검색할 디렉토리를 webpack에 알려준다.
  - 절대 경로와 상대 경로를 모두 사용하지만, 약간 다르게 동작할 수 있다.
    - 상대 경로는 Node가 현재 디렉터리와 상위 디렉터리를 통해 `node_modules`를 검색하는 방법과 유사하게 검색된다.
    - 절대 경로는 오직 주어진 디렉터리에서만 검색한다.
  - 만약 `node_modules/` 보다 우선으로 검색할 디렉토리를 추가하는 방법은 다음과 같다.

  ```javascript
  const path = require('path');
  
  module.exports = {
    //...
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  };
  ```

- `symlinks`
  - 심볼릭 링크를 심볼릭 링크된 위치로 해석할지 여부이다.
  - 활성화되면 심볼릭 링크된 리소스는 심볼릭 링크된 위치가 아닌 실제 경로에서 해석한다.
  - `npm link`와 같이 패키지를 심볼릭 링크하는 툴로 사용할 때, 모듈 해석이 실패할 수 있다.
  - 심볼릭 링크에 대한 자세한 설명은 [여기](https://simsimjae.medium.com/node-js-%EC%97%90%EC%84%9C%EB%8A%94-%EA%B0%84%EB%8B%A8%ED%95%9C-%EB%AA%A8%EB%93%88-%EB%B6%88%EB%9F%AC%EC%98%A4%EA%B8%B0-%EC%A0%84%EB%9E%B5%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%9C%EB%8B%A4-require-%EB%A1%9C-%EB%AA%A8%EB%93%88%EC%9D%84-%EB%B6%88%EB%9F%AC%EC%98%A4%EB%A9%B4-%EB%8B%A4%EC%9D%8C%EA%B3%BC-%EA%B0%99%EC%9D%80-%EC%9D%BC%EB%93%A4%EC%9D%B4-%EB%B2%8C%EC%96%B4%EC%A7%84%EB%8B%A4-5c3ecbde5517)를 참고하자.

---

<br>

## (2) Resolving Loaders

- 파일 분석에 명시된 것과 동일한 규칙을 따릅니다. 그러나 [`resolveLoader`](https://webpack.kr/configuration/resolve/#resolveloader) 구성 옵션을 사용하여 로더에 대한 별도의 분석 규칙을 가질 수 있습니다.
  - `resolveLoader` 옵션은 `resolve` 속성과 동일하지만, webpack의 loader 패키지를 해석하는데만 사용된다.

<br>

## (3) Caching

- 모든 파일 시스템 액세스가 캐시되므로 동일한 파일에 대한 여러 병렬 또는 직렬 요청이 더 빠르게 발생한다.
- [watch 모드](https://webpack.kr/configuration/watch/#watch)에서는 수정된 파일만 캐시에서 제거됩니다. watch 모드가 꺼져 있으면 모든 컴파일 전에 캐시가 제거된다.

---

### :star: `watch`

- `watch` 모드를 켜면 초기 빌드 후 webpack은 해석 된 파일의 변경 사항을 계속 감시한다.
- [webpack-dev-server](https://github.com/webpack/webpack-dev-server) 및 [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware)에서 watch 모드는 기본적으로 활성화되어 있다.

```javascript
module.exports = {
  //...
  watch: true,
};
```

- `watch` 모드를 켰을 때 적용할 수 있는 옵션들은 [여기](https://webpack.kr/configuration/watch/#watchoptions)를 참고하자.

---

