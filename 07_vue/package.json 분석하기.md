# :file_folder: `package.json` 분석하기 <a href="https://blog.martinwork.co.kr/vuejs/2018/04/22/what-is-packagejson.html" target="_blank">(참고 문서)</a>

<br>

:heavy_check_mark: `package.json`

```json
{
  "name": "todo-vue-cli",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  "dependencies": {
    "core-js": "^3.3.2",
    "vue": "^2.6.10"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "^4.0.0",
    "@vue/cli-plugin-eslint": "^4.0.0",
    "@vue/cli-service": "^4.0.0",
    "babel-eslint": "^10.0.3",
    "eslint": "^5.16.0",
    "eslint-plugin-vue": "^5.0.0",
    "vue-template-compiler": "^2.6.10"
  },
  "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/essential",
      "eslint:recommended"
    ],
    "rules": {},
    "parserOptions": {
      "parser": "babel-eslint"
    }
  },
  "postcss": {
    "plugins": {
      "autoprefixer": {}
    }
  },
  "browserslist": [
    "> 1%",
    "last 2 versions"
  ]
}
```

---

- `npm init`으로 설정을 모두 완료하면 `package.json`이 새로 생긴다.
- 또는 vue-cli 모듈 설치 후 vue 프로젝트를 생성(ex. `vue create todo-vue-cli`)하면 `package.json` 파일이 생긴다.

---

### 1. `name`

- 프로젝트의 이름을 적는 곳
- 만약 node package에 직접 만든 패키지를 등록하려고 한다면 version과 마찬가지로 필수 입력해줘야 한다.
- 다만 그렇지 않다면 해당 값은 선택값이다.
- `version` 과 `name`은 함께 해당 프로젝트의 `unique`한 값이다.
- `name`은 점(.)이나 언더스코어(_)로 시작될 수 없고 대문자를 포함하면 안 된다.

<br>

### 2. `version`

- 만약 해당 모듈을 npm에 올릴 계획이 있다면 `name`과 `version`은 필수인자이다.
- 다만 그렇지 않다면 해당 값은 선택값이다.

<br>

### 3. `private`

- 만약 해당 옵션을 `true`로 설정한다면, 해당 모듈을 npm에 올릴 수 없다.
- 개발자가 실수로 private한 모듈을 올리더라도 올린 모듈에 대해 배포를 막을 수 있는 방법 중 하나이다.

<br>

### 4. `scripts`

- 패키지의 다양한 생명주기 동안 실행되는 명령어를 포함하고 있다.
- key는 생명주기 이벤트를 나타내면, value는 해당 생명주기에 실행되는 명령어를 나타낸다.
- 개발자가 직접 정의한 script의 경우, run과 함께 사용하면 되고, 기본적으로 npm에서 제공되는 명령어는 그냥 해당 명령어만 실행시켜주면 된다. 

<br>

### 5. `devDependencies`

- 이 안에 있는 모듈들은 프로젝트의 루트에서 `npm install` 이나 `npm link`를 실행하게 되면 설치 된다.

<br>

### 6. `description`

- 프로젝트에 대한 설명을 문자열로 입력
- `npm search` 명령어를 사용했을 때, 사람들로 하여금 해당 모듈을 찾을 수 있게 도와준다.

<br>

### 7. `Author`

```json
{
  "author": {
    "name" : "Martin",
    "email" : "martin@within.com",
    "url" : "http://blog.martinwork.co.kr/"
  }
}
```

- 해당 값은 한 명의 사람에 대해서 나타낸다.
- 대신 `contributors` 값은 array 형태로 여려 명을 기입할 수 있다.
- 그리고 그 하나의 Person에 대해서는 name을 입력할 수 있으며, 선택값으로 email과 url을 입력할 수 있다.

<br>

### 8. `license`

- 해당 모듈에 대한 라이센스에 대한 정보를 기술하는 영역
- 해당 모듈이 npm에 올라갔을 경우 해당 모듈을 사용할 수 있는 권한에 대한 내용을 기술하는 영역

<br>

### 9. `browserslist`

```json
{
"browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
}
```

- `browserslist` 라이브러리에 대한 옵션으로서, 서로 다른 front-end 둘 간에 브라우저의 타겟을 공유하기 위해 사용한다.
- 위의 예시와 같은 경우 다음을 의미한다.
  - 전 세계 사용 통계 속에서 상위 1% 이상 선택(사용)된 브라우저
  - 각 브라우저의 최신 버전 2개
  - Internet Explorer 8 이하의 버전은 호환하지 않음