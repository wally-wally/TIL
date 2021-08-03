# 12. Hot Module Replacement

<br>

## (1) What is HMR?

- Hot Module Replacement(HMR)는 **모듈 전체를 다시 로드하지 않고 애플리케이션이 실행되는 동안 교환, 추가 또는 제거**한다.
  - 모든 종류의 모듈을 새로고침 할 필요 없이 런타임에 업데이트 할 수 있다.
  - 참고로 HMR은 프로덕션용이 아니므로 개발용으로만 사용해야 한다.
- HMR을 이용해 개발 속도 높일 수 있는 방법
  - 전체 다시 로드 중에 손실되는 애플리케이션의 상태를 유지
  - 변경된 사항만 갱신하여 귀중한 개발 시간을 절약
  - 소스 코드에서 CSS/JS를 수정하면 브라우저에서 즉시 업데이트한다. 이는 브라우저의 개발자 도구에서 직접 스타일을 변경하는 것과 거의 비슷하다다.
- webpack-dev-server는 전체 페이지를 다시 로드하기 전에 HMR로 업데이트를 시도하는 `hot` 모드를 지원한다.

```javascript
// webpack.config.js

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};
```

```javascript
// index.js

if (module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('Accepting the updated printMe module!');
    printMe();
  })
}
```

<br>

## (2) How It Works

### :star: In the Application

- 애플리케이션은 HMR 런타임에 업데이트된 내용이 있는지 확인하도록 요청한다.
- 런타임에서 업데이트된 내용을 비동기적으로 다운로드받고 애플리케이션에 알린다.
- 그런 다음 애플리케이션은 런타임에 업데이트를 요청한다.
- 런타임은 업데이트를 동기적으로 적용한다.

<br>

### :star: In the Compiler

- 컴파일러는 빌드 간에 모듈 ID와 청크 ID가 일치하는지 확인한다.
- 일반적으로 이러한 ID를 메모리에 저장하지만 JSON 파일(manifest)에 저장할 수도 있다.

<br>

### :star: In a Module

- HMR은 HMR 코드가 포함된 모듈에만 영향을 미치는 선택적인 기능이다.
- 한 가지 예는 [`style-loader`](https://github.com/webpack-contrib/style-loader)를 통해 스타일을 가져오는 것이다.
  - 패치가 작동하기 위해 `style-loader`는 HMR 인터페이스를 구현한다.
  - HMR을 통해 업데이트를 받으면 이전 스타일을 새 스타일로 대체합니다.
