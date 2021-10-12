const path = require('path');

// 외부 플러그인
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
 
// 개발 환경 모드
const mode = process.env.NODE_ENV || 'development';
const isProdMode = mode === 'production';

// 파일 확장자명 정규표현식
const tsRegex = /\.tsx?$/;
const sassRegex = /\.s[ac]ss$/;

// path를 이용한 경로 지정
const entryPoint = path.join(__dirname, 'src', 'index.tsx');
const templatePoint = path.join(__dirname, 'public', 'index.html');
const buildPoint = path.join(__dirname, 'dist');
const aliasPoint = path.join(__dirname, 'src');

module.exports = {
  mode,

  devServer: {
    historyApiFallback: true, // history API를 사용하는 SPA 개발시 설정하고 404 에러 발생시 index.html로 돌아감
    port: 3000, // 접속할 포트 번호
    hot: true, // HMR 기능 활성화
  },

  entry: entryPoint,

  module: {
    rules: [
      {
        test: tsRegex,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
				test: sassRegex,
				use: [
          isProdMode ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader'
        ]
			},
    ],
  },

	output: {
    filename: 'bundle.js',
    path: buildPoint,
  },

  plugins: [
    new HtmlWebpackPlugin({
			template: templatePoint,
			minify:
        isProdMode
					? {
							collapseWhitespace: true,
							removeComments: true,
					  }
					: false,
		}),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],

  resolve: {
    alias: {
			'@': aliasPoint,
		},
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
};