# [SSAFY]Web(written by wally-wally)

----

**※참고사항※**

- `[SSAFY]Web`은 정규과정 `Web`을 진행하면서 강의파일에 없는 추가적인 내용이나 중요하게 다루었던 내용을 상세하게 작성했음.
- 최대한 수업 시간의 모든 내용을 담으려했으나 없는 내용이 있을 수도 있음.

------

<br>

### :o: `vscode`에서 유용한 html 단축키

- `!` + `Enter` : HTML 기본 양식 자동완성
- `Ctrl` + `/`  : HTML에서 주석 입력
- `Alt` + `Shift` + `↓(아래 화살표)` : 복사하고싶은 라인 아래로 계속 복사
- `Ctrl` + `Alt` + `↓(아래 화살표)` : Multi Cursor

<br>

<br>

## 1. 7월31일(01일차)

### 1.1 Static Web & Dynamic Web

- `Static Web` : 요청했을 때 받는 페이지가 정해진 것(보여주는 데이터가 정해진 것)
  - ex) 댓글 기능이 없는 블로그 / `github.io` 홈페이지
- `Dynamic Web`(Web APP) : 데이터베이스를 접목시킨 동적 웹 => 무조건 이게 짱이 아님!
  - ex) 방명록 같은 기능이 있는 블로그

<br>

### 1.2 IP / 도메인 / URI / URL

- `IP(Internet Protocol)` : 8비트(0~255)까지의 숫자로 구성된 숫자의 집합
  - `172.217.27.78` 과 같은 형식으로 작성
- `Domain` : 네트워크상의 컴퓨터를 식별하는 호스트명
  - `google.com` 과 같은 형식으로 작성
- `URI(Uniform Resource Identifier, 통합 자원 식별자)` : 인터넷에 있는 자원을 나타내는 유일한 주소
- `URL(Uniform Resource Locator, 파일 식별자)` : 네트워크 상에서 자원이 어디 있는지를 알려주기 위한 고유 규약
  - `https://www.google.co.kr/search?q=구글` 과 같이 작성
  - 도메인 + 경로, 실제로 해당 서버에 저장된 자료의 위치
  - 흔히 웹 사이트 주소로 알고 있지만, 컴퓨터 네트워크 상의 자원을 모두 나타낼 수 있음
  - **`URL` 는 `URI`에 속한다. 하지만, `URI` 는 `URL` 에 속하지 않는다.**

<br>

### 1.3 HTML : Hyper Text Markup Language

- 웹 페이지를 작성하기 위한 역할 표시 언어

- `Hyper Text` : 특정한 링크를 통해 위치를 이동할 수 있음(정해진 순서가 없음)
  - `HTTP(S)` : HTML 통신 규약(`S`는 Security(보안)의 약자로 요즘은 `HTTPS`로 많이 쓴다.)
- `Markup` : 태그 등을 이용하여 문서나 데이터의 구조를 명기하는 언어의 한 가지
- `Language` : 웹 페이지를 작성하기 위한 역할 표시 언어

:warning: **<u>HTML은 프로그래밍 언어가 아니라 Markup Language이다!</u>**

:warning: **<u>CSS도 프로그래밍 언어가 아니다!</u>**

:warning: **<u>JavaScript는 프로그래밍 언어이다!</u>**

<br>

#### :pushpin: Internet Explorer 안 쓰는 이유

- 웹 표준을 지키지 않음

- 모바일 대응하지 않음

- 성능 개선X, 느림...(크롬은 V8 엔진으로 속도가 빠름(JavaScript로 만듬))

  :round_pushpin: `Cross Browsing` : 모든 사용자가 같은 브라우저는 사용하는게 아니기 때문에 IE에도 어느 정도 대응을 해야 함. 

<br>

### 1.4 HTML Style Guide

- 들여쓰기는 공백 2문자를 사용
- 속성 값들은 반드시 큰 따옴표를 사용
- 태그, 속성, 속성 값 등에는 모두 소문자만 사용(DOCTYPE만 제외)
- `<html lang="ko">` : 최상위 html 태그에는 lang 속성을 주어 문서의 기본 언어를 지정한다.(웹 접근성과 관련된 태그)
  - 스크린 리더는 lang을 통해 언어를 인식하여 자동으로 음성을 변환하거나 해당 언어에 적합한 발음을 제공한다.
- IE 는 특정 META 태그를 사용해 페이지가 특정 버전에 맞게 세팅 되도록 지정해준다.

```html
<meta http-equiv="X-UA-Compatible" content="ie=edge">
```

- `=` 양쪽 좌우 사이 속성명과 속성값은 서로 붙여서 쓴다.(`charset="UTF-8"`(O), `charset = "UTF-8"`(X))
- boolean 속성 값(`True`, `False`)은 따로 명시하지 않는다.

```html
<!-- bad -->
<input type="radio" checked=true>

<!-- good -->
<input type="radio" checked>


<!-- checked 없는 경우 -->
<!-- 그냥 안 쓰면 됨 -->

<!-- bad -->
<input type="radio" checked=false>

<!-- good -->
<input type="radio">
```

<br>

### 1.5 Tag와 DOM TREE

#### (1) Tag

- `요소(element)` : HTML의 element는 태그와 내용(contents)로 구성되어 있다.
  - `<h1> 웹문서 </h1>`
  - 태그는 대소문자를 구별하지 않으나, 소문자로 작성해야 한다.
  - 요소간의 중첩도 가능하다.
- `Self-closing element` : 닫는 태그가 없는 태그도 존재한다.
  - `<img src="url">`
- `속성(attribute)` : 태그에는 속성이 지정될 수 있다.
  - `<a href='google.com>` : `href`가 속성명, `google.com`이 속성값이다.
  - id, class, style은 태그와 상관없이 모두 사용 가능하다.

<br>

#### (2) DOM(Document Object Model) TREE

```html
<article>
  <h3>기초</h3>
  <ul>
    <li style="list-style-type:circle;">HTML</li>
    <li style="list-style-type:circle;">CSS</li>
  </ul>
  <a href="mailto:wallys0213@gmail.com">메일보내기</a>
</article>
```

- 태그는 중첩되어 사용가능하며, 이때 다음과 같은 관계를 갖는다.
  - `article` 태그와 `h3 `태그는 **부모(parent)-자식(child)** 관계
  - `li` 태그는 **형제(sibling)** 관계
  - `h3` 태그와 `ul` 태그는 **형제(sibling)** 관계

<br>

#### (3) 시맨틱 태그(Semantic Tag)

- `<div></div>` 는 단순히 공간만 구분해 주는 태그로서 컨텐츠의 의미를 설명해주기 위해 태그인 시맨틱 태그를 사용한다.
- HTML5에 새롭게 다음과 같은 시맨틱 태그가 추가되었다.

![03_day01_03](https://user-images.githubusercontent.com/52685250/62214597-587acd80-b3e0-11e9-8c3a-55029b6f4ff9.JPG)

- `div` 대신에 의미를 부여한 특별한 이름일 뿐 그 이름이 특정한 기능을 수행하는 것이 아니다. 시맨틱하게 보이기 위해서 태그를 더 만든 것이다.

:warning: **non semantic 요소 : `div` , `a` , `span` 등**

:heavy_check_mark:**시맨틱한 요소가 중요한 이유**

> **검색 엔진 최적화(SEO) 잘 지켰을 때** => 시맨틱한 요소가 굉장히 중요하다!!

![03_day01_01](https://user-images.githubusercontent.com/52685250/62177402-c7740a00-b37f-11e9-8cb4-bb1caaa7920b.JPG)

> 검색 엔진 최적화(SEO) 잘 안 지켰을 때

![03_day01_02](https://user-images.githubusercontent.com/52685250/62177444-e5416f00-b37f-11e9-980f-8d7853c07145.JPG)

- 개발자 및 사용자 뿐만 아니라 검색엔진(구글, 네이버) 등에 **의미 있는 정보의 그룹을 태그로 표현**하여 단순히 보여주기 위한 것을 넘어서 **의미를 가지는 태그**들을 활용하기 위한 노력

<br>

---

<br>

## 2. 8월01일(02일차)

### 2.1 CSS(Cascading Style Sheet)

- HTML은 <u>정보와 구조화</u>한다면 CSS는 <u>styling</u>를 정의하는 언어이다.
- 둘이 한 세트이지만 각자 문법이 다른 별개의 언어이고 HTML 없이 CSS 단독으로 사용할 수 없다.
- Cascading 이므로 맨 아래에 작성된 css가 적용된다.
- `h1{color: blue; font-size: 15px;}`
  - `h1` : 셀렉터
  - `color:blue;`, `font-size:15px;` : 선언
  - `color`, `font-size` : 프로퍼티(property)
  - `blue`, `15px` : 값(value)
- CSS는 외워서 쓰는게 아니다. 찾으면서 하자!

<br>

### 2.2 CSS 작성하는 방법

- `inline(인라인)` : HTML 태그안에 CSS 요소 작성하기

- `Embedding(내부참조)` : HTML 내부에 CSS를 포함시키기

- `link file(외부참조)` : 외부에 있는 CSS 파일을 로드하기
  - `컴포넌트화` : 일반적으로 외부 파일로서 활용한다.
  - 중복된 property는 컴포넌트화하여 작성하는게 좋다.

**:heavy_check_mark: 스타일 적용 우선순위 : `inline` > `embedding` > `link file`**

:heavy_check_mark:**​ 주로 `link file`을 가장 많이 쓰이고 `inline`은 아주 가끔 사용한다.**

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <link rel="stylesheet" href="00_intro.css"> <!-- link:css 치고 enter-->
  <!-- 내부참조 -->
  <style>
    h2 {
      color: burlywood
    }
  </style>
</head>
<body>
  <h1 style="color: royalblue;">inline css 적용</h1> <!-- inline -->
  <h2>내부참조, embedding</h2>
  <h3>외부참조, link file</h3>
</body>
</html>
```

<br>

### 2.3 CSS Style Guide

```css
h3 {
  color: crimson;
}
```

- 들여쓰기는 **2문자**이다.
- 클래스, 아이디명은 **케밥 케이스(kebob-case**) : 전부 소문자 인데 중간에 하이픈(-)을 쓴다.
- property는 `:`와 붙이고 한 칸 띄우고 value를 작성한다.
- 모든 스타일 뒤에는 세미콜론을 붙인다.
- 다중 선택 시 한 줄에 선택자를 하나씩 작성

```css
.bold,
.yellow {
    font-weight: bold;
}
```

- :warning: **[가장 중요!] 스타일 지정 시 아이디, 태그 대신에 *<u>클래스</u>*를 사용한다.(되도록!, 대부분!)**
- 아이디는 `html` 문서에서 한 번만 사용하자
- 숫자 0 이후에는 불필요한 단위를 작성하지 않는다.

```css
/* 가운데 정렬 */
.mx-auto {
  /* 상하 : 0, 좌우 : auto */
  margin: 0 auto;
}
```

- `'Google Font' > Korean`사용할 때 `@import` 대신 `<link>` 방법을 사용한다.
- 가능한 한 단축어(축약형)를 사용한다.
  - 단, 불필요하게 과용하는 것은 피한다.

<br>

### 2.4 CSS 단위 : 값(value) => 키워드, 크기단위, 색깔

- **`키워드`** : 개발자 도구로 확인 가능
- **`크기단위`** : 우리가 알고 있는 크기단위
  - `px` : **디바이스별로 픽셀의 크기는 제각각**임(해상도가 각각 다르기 때문), `px`단위가 100% 절대 단위는 아니다!(**크롬에서 Default font는 `16px`이다!**)
  - `%` : 백분율 단위의 **상대 단위** / 요소에 지정된 사이즈(상속된 사이즈나 디폴트 사이즈)에 **상대적인 사이즈**를 결정
  - `em` : 배수 단위로 **상대 단위** / 요소에 지정된 사이즈(상속된 사이즈나 디폴트 사이즈)에 **상대적인 사이즈**를 결정
  - `rem` : **<u>최상위 요소(html)의 사이즈를 기준</u>**으로 삼는다. / `em`의 기준은 상속의 영향으로 바뀔 수 있지만 `rem`은 어딜가도 같다.
  - `Viewport` 단위 : 디바이스마다 다른 크기의 화면을 가지고 있으므로 상대적인 단위인 `viewport`를 기준으로 만든 단위 (단, IE는 지원X)
- `색상 표현 단위` : `https://htmlcolorcodes.com/` 와 같은 사이트에 들어가서 원하는 색상 사용하자.

<br>

### 2.5 선택자(selector)

- **선택자 우선순위 : `!important`(0순위) > `인라인 스타일` > `아이디 선택자` > `클래스 선택자` > `태그 선택자` > `전체 선택자`**

<br>

### 2.6 Box model

#### (1) box-sizing

<img width="601" alt="03_day02_01" src="https://user-images.githubusercontent.com/52685250/62307918-74a16c00-b4bf-11e9-89c7-286790e65d02.png">

#### (2) shorthand

#### (3) <a href="https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing">마진상쇄</a>

- 상하 일 때 자식 또는 자손 관계 같은게 서로 있을 경우 큰 값으로 덮어씌어진다.

<br>

### 2.7 display 속성

#### (1) block

- 항상 새로운 라인에서 시작
- 화면 크기 전체의 가로폭을 차지한다. (width : 100%)

#### (2) inline

- 새로운 라인에서 시작하지 않으며 문장의 중간에 들어갈 수 있다.
- content의 너비만큼 가로폭을 차지함
- **width, height, margin-top, margin-bottom 프로퍼티를 지정할 수 없다.**
- **대신 상, 하 여백은 line-height로 지정한다.**

#### (3) inline-block

- block과 inline 레벨 요소의 특징을 모두 갖는다.
- **width, height, margin-top, margin-bottom 프로퍼티를 지정할 수 있다.**

#### (4) None

- 해댱 요소를 화면에 표시하지 않는다. (**<u>공간조차 사라진다.</u>**)

<br>

### 2.8 visibility 속성

#### (1) visible

#### (2) hidden

- 해당 요소를 안 보이게 한다. 하지만 공간이 사라지는 것은 아니다.
- 그러므로 다른 요소에 영향을 주지 않는다.

<br>

### 2.9 background 속성

#### (1) background-size

- `contain`
- `cover`

#### (2) background-repeat, position, attachment