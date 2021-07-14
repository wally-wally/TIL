# 05. plugins

<br>

## (1) plugins

- 로더는 특정 유형의 모듈을 변환하는 데 사용되지만, 플러그인을 활용하여 번들을 최적화하거나, asset을 관리하고, 또 환경 변수 주입등과 같은 광범위한 작업을 수행할 수 있다.
  - output으로 만들어진 번들링 결과물의 후처리를 담당한다.

- 플러그인을 사용하려면 `require()`를 통해 플러그인을 요청하고 `plugins` 배열에 추가해야 한다.
  - 대부분의 플러그인은 옵션을 통해 사용자가 지정할 수 있다.
  - 다른 목적으로 플러그인을 여러 번 사용하도록 설정할 수 있으므로 `new` 연산자로 호출하여 플러그인의 인스턴스를 만들어야 한다.
- 사용할 수 있는 플러그인이 많기 때문에 [여기](https://webpack.kr/plugins/)를 참고하여 필요한 플러그인을 가져다가 쓰자!

---

:round_pushpin: <b>플러그인 사용 예시</b>

- `html-webpack-plugin`
  - HTML 파일을 빌드 과정에 추가하는 플러그인
  - 동적으로 생성되는 CSS, JS 파일 그리고 빌드 타임에 결정되는 값(변수)들을 템플릿단에 넣어서 HTML 파일을 동적으로 만들어준다.
- `clean-webpack-plugin`
  - build할 때마다 기존에 있던 dist 폴더를 삭제하고 새로운 dist 폴더로 자동으로 바꿔줌
  - export default가 아니므로 중괄호 꼭 쓸 것
- `mini-css-extract-plugin`
  - 번들 결과에서 스타일시트 코드만 뽑아서 별도의 CSS 파일로 만들어 역할에 따라 파일을 분리해줌
  - (CSS를 별도 파일로 뽑아내는 플러그인)

```javascript
const path = require("path");
const webpack = require("webpack");
const childProcess = require("child_process");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV || "development";

module.exports = {
  // 생략

  plugins: [
    new webpack.BannerPlugin({
      // 번들링된 결과물 상단에 빌드 정보를 추가하는 플러그인
      banner: `
        Build Date: ${new Date().toLocaleString()}
        Commit Version: ${childProcess.execSync("git rev-parse --short HEAD")}
      `,
    }),
      
    new webpack.DefinePlugin({
      // 빌드 타임에 결정되는 환경 변수를 어플리케이션 단에 주입하기 위해 사용(ex. api의 주소)
      TWO: "1+1",
      THREE: JSON.stringify("1+2"), // 코드 텍스트 그 자체로 가져오고 싶을 때 JSON.stringify() 메소드 사용
      "api.domain": JSON.stringify("http://dev.api.domain.com"),
    }),
      
    new HtmlWebpackPlugin({
      template: "./src/index.html", // 템플릿 경로를 지정
      templateParameters: { // 템플릿에 주입할 파라매터 변수 지정
        env: process.env.NODE_ENV === "development" ? "(개발용)" : "",
      },
      minify:
        process.env.NODE_ENV === "production"
          ? {
              collapseWhitespace: true, // 빈칸 제거
              removeComments: true, // 주석 제거
            }
          : false,
    }),
      
    new CleanWebpackPlugin(),
      
    // MiniCssExtractPlugin은 JS에서 CSS 코드를 뽑아내는 것이기 때문에 굳이 development 환경에서는 JS 파일 하나로 빌드하는 것이 조금 더 빠르기 때문에 굳이 이 플러그인을 쓸 필요가 없다.
    // production 환경에서만 플러그인이 실행되도록 삼항 연산자로 작성하자.
    ...(process.env.NODE_ENV === "production"
      ? [new MiniCssExtractPlugin({ filename: "[name].css" })]
      : []),
  ],
};
```

---

