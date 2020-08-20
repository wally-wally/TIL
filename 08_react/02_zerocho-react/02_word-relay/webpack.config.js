const path = require('path'); // node에서 경로 쉽게 조작할 수 있도록 제공

module.exports = {
  name: 'word-relay-setting', // webpack 설정 이름
  mode: 'development', // 실서비스 에서는 production으로 변경
  devtool: 'eval', // 빠르게 하겠다는 의미
  resolve: {
    extensions: ['.js', '.jsx'] // entry의 app에 작성한 파일과 extensions에 작성한 확장자명을 조합해서 해당 파일이 있는지 알아서 찾는다.
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
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-proposal-class-properties'],
        }
      }
    ]
  },
  output: { // 출력
    path: path.join(__dirname, 'dist'), // path.join으로 현재 경로를 자동으로 합쳐준다.
    filename: 'app.js'
  },
};