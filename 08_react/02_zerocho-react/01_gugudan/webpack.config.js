const path = require('path'); // node에서 경로 쉽게 조작할 수 있도록 제공
const webpack = require('webpack');

module.exports = {
  name: 'GuGuDan', // webpack 설정 이름
  mode: 'development', // 실서비스 에서는 production으로 변경
  devtool: 'eval', // 개발일 때는 eval, 실서비스일 때는 hidden-source-map
  resolve: {
    extensions: ['.js', '.jsx'] // 밑에 파일명 적을 때 확장자 생략 가능
  },

  entry: { // 입력
    app: ['./client'], // client.jsx 내에서 WordRelay.jsx를 불러오는 것을 자동으로 인식하기 때문에 WordRelay.jsx를 따로 적을 필요가 없다.
  },
  module: {
    rules: [
      {
        test: /\.jsx?/, // js와 jsx 파일에 적용
        loader: 'babel-loader', // babel-loader를 적용
        options: { // babel의 option
          // plugin들의 모음이 preset이다.
          presets: [
            ['@babel/preset-env', {
              targets: {
                // browserslist 참고
                browsers: ['> 1% in KR'], // 구체적으로 지원할 브라우저 버전을 명시할 수 있다.
                // '> 1% in KR': 한국에서 점유율이 1%가 넘는 브라우저들을 모두 지원하겠다는 의미
              },
              debug: true, // 개발용일 때 debug 옵션을 켤 수 있다.
            }],
            '@babel/preset-react'
          ],
          plugins: []
        }
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({ debug: true }), // loader의 option의 debug를 모두 true로 자동으로 설정한다.
  ],
  output: { // 출력
    path: path.join(__dirname, 'dist'), // path.join으로 현재 경로를 자동으로 합쳐준다.
    filename: 'app.js'
  },
};