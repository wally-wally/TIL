# Vue.js에서 Sass Loader Error 해결(10/22)

<br>

```text
Sass Loader Error: Invalid options object that does not match the API schema
```

- Vue.js에서 Sass를 적용하려고 했는데 위와 같은 에러 문구가 발생했다.
- 이러한 문제를 해결하기 위해 다음과 같이 해결했다.

- 우선 `vue.config.js`에 `loaderOptions`를 설정해서 모든 vue 컴포넌트에서 `assets/scss` 안에 선언한 scss 스타일들을 불러와서 사용할 수 있도록 다음과 같이 작성했다.

```js
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/scss/style.scss";
        `
      }
    }
  }
};

```

- sass 안에 data 옵션을 설정하는 것이 일반적인 방법인데 해결되지 않아서 구글링을 통해 더 자세히 찾아보니까 `sass-loader`의 버전에 따라서 해결방법이 약간 달랐다.
- `data` 옵션은 7 버전까지 유효하고 8 버전에서는 `data` 옵션명이 `prependData`로 바뀌었다.
- 그래서 `vue.config.js`의 `data` 옵션을 `prependData`로 이름을 바꿨더니 해결할 수 있었다.

---

:page_facing_up: <b>Reference</b>

- https://stackoverflow.com/questions/58184549/sass-loader-error-invalid-options-object-that-does-not-match-the-api-schema

- https://github.com/webpack-contrib/sass-loader/releases/tag/v8.0.0