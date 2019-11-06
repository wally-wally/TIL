// webpack 설정 파일
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    // __dirname : 최상위 위치(entry point) - Django 에서 BASE_DIR 역할과 동일
    // 여기서 __dirname은 '02_vue_webpack'이다.
    app: path.join(__dirname, 'src', 'main.js') // 경로 설정 (src(entry의 시작 파일)는 vue-cli의 기본값임)
  },
  module: {
    rules: [ // rules는 배열로 선언
      {
        test: /\.vue$/, // 정규 표현식 : '.vue' 확장자를 가진 모든 파일을 test 한다는 의미
        use: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'] // 여러개는 배열로 작성
      }
    ]
  },
  plugins: [ // plugins는 배열로 선언
    new VueLoaderPlugin(),
  ],
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist'), // (dist는 vue-cli의 기본값임)
  },
}