# 10. targets

<br>

## (1) What is targets?

- `target`은 특정 환경을 대상으로 하도록 webpack에 지정하는 설정이다.
  - 프로젝트에 browserslist 설정이 있으면, webpack은 이 설정을 사용합니다.
  - `browserslist` 설정이 없으면 `'browserslist'` 혹은 `'web'`으로 설정된다.

```javascript
module.exports = {
  target: 'node',
};
```

- 위 코드와 같이 `node` webpack을 사용하면 Node.js와 유사한 환경에서 사용할 수 있도록  컴파일된다. (Node.js의 `require`를 사용하여 청크를 로드하고 `fs`나 `path`와 같은 모듈은 수정하지 않는다.)

- 각 target은 배포와 환경에 관련된 다양한 추가 기능이 있으며, 필요에 맞게 지원된다. target에 관한 다양한 옵션 설정은 [여기](https://webpack.kr/configuration/target/)를 참고하면 된다.

<br>

## (2) Multiple Targets

- webpack에서는 한 개 이상의 문자열을 `target` 프로퍼티에 전달할 수 **없다**.
- 하지만 두 개의 개별 설정을 번들링하여 동일한 라이브러리를 생성할 수 있다.

```javascript
const path = require('path');
const serverConfig = {
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.node.js',
  },
  //…
};

const clientConfig = {
  target: 'web', // <=== 기본값은 'web'이므로 생략 가능
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.js',
  },
  //…
};

module.exports = [serverConfig, clientConfig];
```
