# :notebook_with_decorative_cover: 03_web - Day02

<br>

## 2. 8월01일(02일차)

### 2.1 CSS(Cascading Style Sheet)

- HTML은 <u>정보와 구조화</u>한다면 CSS는 <u>styling</u>를 정의하는 언어이다.
- 둘이 한 세트이지만 각자 문법이 다른 별개의 언어이고 HTML 없이 CSS 단독으로 사용할 수 없다.
- Cascading 이므로 맨 아래에 작성된 css가 적용된다.
- `h1{color: blue; font-size: 15px;}`
  - `h1` : 셀렉터(Selector)
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

```css
/* 외부 참조시 사용되는 파일 : 00_intro.css */
h3 {
  color: crimson;
}
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
- 모든 스타일 뒤에는 **세미콜론**을 붙인다.
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
  - `%` : **<u>백분율</u>** 단위의 **상대 단위** / 요소에 지정된 사이즈(상속된 사이즈나 디폴트 사이즈)에 **상대적인 사이즈**를 결정
  - `em` : **<u>배수</u>** 단위로 **상대 단위** / 요소에 지정된 사이즈(상속된 사이즈나 디폴트 사이즈)에 **상대적인 사이즈**를 결정
  - `rem` : **<u>최상위 요소(html)의 사이즈를 기준</u>**으로 삼는다.
    - `em`의 기준은 상속의 영향으로 바뀔 수 있지만 `rem`은 어딜가도 같다.
    - rem의 r은 root를 의미한다.
  - `Viewport` 단위 : 디바이스마다 다른 크기의 화면을 가지고 있으므로 상대적인 단위인 `viewport`를 기준으로 만든 단위 (단, IE는 지원X)
    - `vw` : 너비의 1/100
    - `vh` : 높이의 1/100
    - `vmin` : 너비 또는 높이 중 작은 쪽의 1/100
    - `vmax` : 너비 또는 높이 중 큰 쪽의 1/100
- `색상 표현 단위` : `https://htmlcolorcodes.com/` 와 같은 사이트에 들어가서 원하는 색상 사용하자.
  - HEX : `#ffffff`
  - RGB : `rgb(0, 0, 0)`
  - RGBA : `rgba(0, 0, 0, 0.5)` / 여기서 `A`는 투명도를 의미한다.(0.0(완전 투명)~1.0(완전 불투명))

```html
<body>
  <h1>단위를 알아봅시다.</h1>
  <p>Default font</p>

  <!-- 24px : 20 * 1.2-->
  <ol>
    <li>1.2rem</li> <!-- 20(html 기준) -->
  </ol>

  <!-- 28.8px : 20(기본 default값) * 1.2(상속한 ul / 부모) * 1.2(ul li / 내꺼) -->
  <ul>
    <li>1.2em</li>
  </ul>

  <!-- vw, vh -->
  <!-- css 파일에서 클래스로 지정하려면 class 이름 앞에 .을 붙인다.-->
  <span class="vw">10vw</span> <!-- 브라우저의 너비에 따라 반응하여 크기가 달라짐. -->
  <span class="vh">10vh</span> <!-- 브라우저의 높이에 따라 반응하여 크기가 달라짐. -->
  <!-- cf)박스 만들 때 div로 시작한다.-->
  <div class='div-vw'></div>
  <div class='div-vh'></div>

  <!-- vmin -->
  <!-- 창을 키우다가 어느 정도 되면 더 이상 안 커짐 -->
  <div class="div-vmin">10vmin</div>
</body>
```

```css
html {
  font-size: 20px;
}

ol,
ol li {
  font-size: 1.2rem;
}

ul,
ul li {
  font-size: 1.2em;
}

.vw {
  font-size: 10vw;
}

.vh {
  font-size: 10vh;
}

.div-vw {
  width: 10vw;
  height: 10vw;
  background-color: #DF5639;
}

.div-vh {
  width: 10vh;
  height: 10vh;
  background-color: rgba(40, 99, 122, 0.514);
}

.div-vmin {
  width: 10vmin;
  height: 10vmin;
  background-color: green;
}
```

<br>

### 2.5 선택자(selector)

- **선택자 우선순위 : `!important`(0순위) > `인라인 스타일` > `아이디 선택자` > `클래스 선택자` > `태그 선택자` > `전체 선택자`**

> 02_selector.html / 02_selector.css

```html
<body>
  <p>빨간색</p>
  <h1>태그 선택자</h1>
  <h2 class="pink">클래스 선택자</h2>
  <h3 id="green">아이디 선택자</h3>
  <h3 id="green" class="pink">아이디 > 클래스</h3>
  <h1 class="pink">클래스 > 태그</h2>

  <!--
    - span 태그와 div 태그는 모두 의미는 없지만 '마크업'을 해야
      css 를 적용시킬 수 있기 때문에 활용된다. 
    - 특정한 곳을 지정해야하고 따라서 선택자가 필요하게 되고 선택자를 잡기 위해서는
      마크업이 필요한 것이다.
  -->
  <p><span class="pink">핑크핑크</span>, <span class="yellow">노랑노랑</span></p> <!-- ,부분은 전체 선택자임 -->

  <!--
    [Cascading의 개념을 잊지 말자!]
    아래처럼 pink가 마지막에 써졌지만,
    중요한건 css 코드상으로 yellow가 마지막에 선언되었기 때문에 노란색으로 적용된다.
  -->
  <p class="bold yellow pink">나는 무슨색일까?</p> <!-- 클래스는 ""안에 공백을 기준으로 나눈다. 즉, 세 개의 클래스가 있는 것임-->

  <p class="bold yellow pink", id="orange" style="color: purple">가장 강한 우선순위</p>
</body>
```

```css
/* 전체 선택자 */
* {
  color: red;
}

/* 태그 선택자 */
h1 {
  color: blue;
}

/* 클래스 선택자(얘는 .으로 시작) */
.pink {
  color: pink;
}

/* 아이디 선택자(얘는 #으로 시작) */
#green {
  color: green;
}

.bold {
  font-weight: bold;
}

.yellow {
  color: yellow;
}

#orange {
  color: brown !important;
  color: orange
}

#purple {
  color: purple;
}
```

<br>

> 03_selector_ad.html / 03_selector_ad.css

```html
<body>
  <!-- 그룹 선택자 -->
  <p>그룹 선택자</p>
  <h3>그룹 선택자</h3>
  <p>그룹</p>
  <p>그룹</p>

  <!-- 인접 선택자 -->
  <div class="red"></div>
  <div class="blue"></div>
  <div></div>

  <!-- 자식 선택자 -->
  <ol>
    <li>ol의 자식 li</li>
  </ol>
  <ol id="chocolate">
    <li>허쉬</li>
    <li>드림카카오</li>
    <li>쿠앤크</li>
  </ol>

  <!-- 자손(후손) 선택자 -->
  <ul>
    <div>
      <li>자손</li>
      <li>자손</li>
      <li>자손</li>
    </div>
  </ul>
</body>
```

```css
/* 그룹 선택자 */
p,
h3 {
  color: grey;
}

/* div 세팅 */
div {
  width: 100px;
  height: 100px;
  border: 1px solid black;
}

.red {
  background-color: red;
}

.blue {
  background-color: blue;
}

/* 인접 선택자, 바로 붙어있는 */
/* +의 개념(~의 옆에 붙어있는) : red 옆에 blue 옆에 div */
.red + .blue + div {
  background-color: purple;
}

/* 자식 선택자 */
/* 자기 바로 아래 있는 거(=인덴트가 한 칸 차이)만 판단 가능(>) */
ol > li {
  color: darkgreen;
}

ol#chocolate > li {
  color: chocolate;
}

/* 자손(후손) 선택자 */
/* ul 아래에 있는 모든 li에 적용됨. */
ul li {
  color: lime;
}
```



### 2.6 Box model

------

:checkered_flag: **Box model의 구성**

![box-model](https://user-images.githubusercontent.com/52685250/62709607-a622b600-ba30-11e9-8638-f7c81636ba3f.JPG)

- `Content` : 실제 내용이 위치
- `Padding` : 테두리 안쪽의 내부 여백
  - 요소에 적용된 배경의 컬러, 이미지는 패딩까지 적용
- `Border` : 테두리 영역
- `Margin` : 테두리 바깥의 외부 여백
  - 배경색을 지정할 수 없다.

------

#### (1) box-sizing

> 04_box_model.html / 04_box_model.css

```html
<body>
  <div>div</div>
  <div class="margin">margin</div>
  <div class="padding">padding</div>
  <div class="border"></div>
  <div class="margin-shorthand-1"></div>
  <div class="margin-shorthand-2"></div>
  <div class="margin-shorthand-3"></div>
  <div class="margin-shorthand-4"></div>

  <div class="align-center"></div>
  <div class="align-right"></div>

  <div class="box-sizing content-box">
    <p>content-box</p>
  </div>
  <div class="box-sizing border-box">
    <p>border-box</p>
  </div>
</body>
```

```css
div {
  color: white;
  width: 100px;
  height: 100px;
  background-color: grey;
}

.margin {
  margin-top: 30px;
  /* 아래로 움직임 */
  margin-bottom: 30px;
  /* 위치 불변 */
  margin-left: 10px;
  /* 오른쪽으로 10px만큼 움직임 */
  margin-right: 10px;
  /* 움직이지 않음 */
}

.padding {
  padding-top: 30px;
  /* 아래로 움직이고 박스 크기도 커짐 */
  padding-bottom: 30px;
    /* 위로 박스 크기 거짐 */
}

.border {
  border-width: 5px;
  border-style: dotted;
  border-color: red;
  border-top-color: blue;
  border-radius: 10px;
  /* border: 5px dotted red; */
}

.margin-shorthand-1 {
  /* 상하좌우 */
  margin: 10px;
}

.margin-shorthand-2 {
  /* 상하/좌우 */
  margin: 10px 20px;
}

.margin-shorthand-3 {
  /* 상/좌우/하 */
  margin: 10px 20px 30px;
}

.margin-shorthand-4 {
  /* 상/좌/하/우 (시계방향) */
  margin: 10px 20px 30px 40px;
}

/* 가운데 정렬 */
.align-center {
  /* 오른쪽, 왼쪽에 반반 나눠준다. */
  /* 0px인 경우 px 단위를 안 써주는 것이 좋다. */
  margin: 0 auto;
}

/* 오른쪽 정렬 */
.align-right {
  /* 오른쪽의 남은 너비를 왼쪽으로 보낸다.(붙인다.) */
  /* 왼쪽에 남은 너비를 붙인다. */
  margin-left: auto;
}

/* box-sizing */
.box-sizing {
  margin: 20px; /* 상하좌우 모두 적용 */
  padding: 20px; /* 상하좌우 모두 적용 */
  border: 10px solid crimson;
  width: 300px;
}

.content-box {
  box-sizing: content-box;
}

/* 항상 이거만 쓴다! */
.border-box {
  box-sizing: border-box;
}
```

<img width="601" alt="03_day02_01" src="https://user-images.githubusercontent.com/52685250/62307918-74a16c00-b4bf-11e9-89c7-286790e65d02.png">

- `box-sizing: content-box;` : 박스 크기가 커지고 달라진다.
  - 박스 너비 = width 속성 + 2 × (margin 속성 + border 속성 + padding 속성)
  - 박스 높이 = height 속성 + 2 × (margin 속성 + border 속성 + padding 속성)
- `box-sizing: border-box;` : 박스 크기가 불변이다. 즉, content-box일 때 보다 박스 크기가 작다.
  - 박스 너비 = width 속성 + 2 × margin 속성
  - 박스 높이 = height 속성 + 2 × margin 속성

<br>

#### (2) shorthand

- margin 단축어

![shorthand](https://user-images.githubusercontent.com/52685250/62710862-074b8900-ba33-11e9-9e78-0cdeab4527fc.JPG)

- border 단축어

```css
.border {
  border-width: 5px;
  border-style: dotted;
  border-color: red;
}

/*
  위 구문을 border: 5px dotted red; 로 단축 가능
  5px dotted red의 순서는 중요하지 않지만 보통 이 순서로 쓴다.
*/
```

#### (3) <a href="https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing">마진상쇄</a>

- 상하 일 때 자식 또는 자손 관계 같은게 서로 있을 경우 큰 값으로 덮어씌어진다.

<br>

### 2.7 display 속성

#### (1) block

- 항상 새로운 라인에서 시작
- 화면 크기 전체의 가로폭을 차지한다. (width : 100%)
  - **기본적으로 너비의 100%!**
  - **너비가 정해지면 나머지를 margin으로!**
- block 레벨 요소 내에 inline 레벨 요소를 포함할 수 있다.
- **block 가로 정렬**

![block 가로정렬](https://user-images.githubusercontent.com/52685250/62715766-1551d780-ba3c-11e9-8cec-5c378d8276dd.JPG)

- 가운데 정렬은 `margin: 0 auto;`로 보통 작성한다.
- block 레벨 요소 예 : `div`, `h1` ~ `h6`, `p`, `ol`, `li`, `ul`, `hr`, `table`, `form`

#### (2) inline

- 새로운 라인에서 시작하지 않으며 문장의 중간에 들어갈 수 있다.
- content의 너비만큼 가로폭을 차지함
- inline은 내용없이 존재할 수 없다.
- **width, height, margin-top, margin-bottom 프로퍼티를 지정할 수 없다.**
- **대신 상, 하 여백은 line-height로 지정한다.**
- inline 예시

![inline](https://user-images.githubusercontent.com/52685250/62716040-8beed500-ba3c-11e9-97e8-99d664045e0d.JPG)

- inline 레벨 요소 예 : `span`, `a`, `strong`, `img`, `br`, `input`, `select`, `textarea`, `button`

#### (3) inline-block

- block과 inline 레벨 요소의 특징을 모두 갖는다.
- inline 레벨 요소처럼 한 줄에 표시되면서
- **block에서의 width, height, margin-top, margin-bottom 프로퍼티를 지정할 수 있다.**
- `inline-block` = `block 속성`(width, height 사용 가능)+ `inline 속성`(우측 margin이 사라짐)

> 06_display_ad.html

```html
<body>
  <!-- block -->
  <div>block</div>
  <div>block</div>

  <!--
    inline
    내용없이 존재할 수 없음.(width, height 적용x)
  -->
  <div class="inline">안녕하세요?</div>
  <div class="inline">저는 내용영역이 필요해요!</div>

  <!--
    inline-block
    block 속성(width, height) 사용 가능
    + inline 속성(우측 margin 이 사라짐)
  -->
  <div class="inline-block">i-b</div>
  <div class="inline-block">i-b</div>
</body>
```

![속성](https://user-images.githubusercontent.com/52685250/62716664-7cbc5700-ba3d-11e9-82eb-b375d31b7ba2.png)

#### (4) None

- 해당 요소를 화면에 표시하지 않는다. (**<u>공간조차 사라진다.</u>**)
- `display: none;`과 `visibility: hidden;`과 구분해서 반드시 알아둘 것!

<br>

### 2.8 visibility 속성

#### (1) visible

- 해당 요소를 보이게 한다.(기본값)

#### (2) hidden

- 해당 요소를 안 보이게 한다. 하지만 공간이 사라지는 것은 아니다.
- 그러므로 다른 요소에 영향을 주지 않는다.
- `display: none;`은 아예 공간까지 사라지게 하는 것
- `visibility: hidden;` 은 안 보이게만 할 뿐 공간은 유지됨

#### (3) opacity

- 요소의 투명도를 정한다.
- 0부터 1 사이의 숫자를 입력할 수 있으며 0은 투명한 상태, 1은 불투명한 상태이다.
  - ex) `opacity: 0.5;`

<br>

### 2.9 background 속성

- `background-image: url("images/camping.jpg");`
  - url 단위로 **배경에 넣을 그림을 지정**하는 스타일 속성
- `background-size` 속성
  - `700px 500px` : 배경 이미지의 가로를 700px, 세로를 500px로 설정
  - `contain` : 배경 이미지의 크기 비율을 유지한 상태에서 **부모 요소의 영역에 배경이미지가 보이지 않는 부분까지 전체가 들어갈 수 있도록** 이미지 크기를 조절한다.
  - `cover` : 배경 이미지의 크기 비율을 유지한 상태에서 **부모 요소의 width, height 중 큰 값에 배경 이미지를 맞춘다.** 따라서 **이미지의 일부가 보이지 않을 수 있다.**
- `background-repeat: no-repeat;` : **이미지가 반복**되지 않게 해줌(`background-repeat` 속성의 기본값은 `repeat`임)
- `background-position` 속성 : **이미지의 위치** 설정
  - `0, 0` : 이미지의 중심인 0, 0 설정
  - `center` : 이미지의 위치를 중앙으로 설정
- `background-attachment` 속성
  - `scroll` : 기본값임 / 화면 스크롤에 따라 배경 이미지가 함께 이동함
  - `fixed` : 화면을 스크롤해도 이미지가 이동하지 않고 고정됨

:heavy_check_mark: 보통 `background-size: cover;` ,  `background-position: center;` 로 맞추는게 제일 무난하다!

<br>

### 2.10 font & text

- `font-size` 속성 : **글자의 크기**를 지정하는 스타일 속성

  - `30px`, `2rem`, `130%`, `small` 등과 같이 키워드를 쓸 수 있음

- `font-family` 속성 : **폰트를 지정**하는 스타일 속성

  - `font-family: 'Black Han Sans', sans-serif;` : `Black Han Sans` 폰트가 없으면 `sans-serif` 폰트로 출력함

- `font-weight` 속성: **폰트의 두께**를 조정하는 스타일 속성

  - `lighter`, `bold`, `500` ~ `900` 등이 있음(cf. 일반 폰트의 두께는 `400`이고 두꺼운 폰트의 두께는 `700`임)

- `font-style: italic;` : **폰트의 기울기**를 설정할 수 있음

- `font-shorthand` (font 축약어)

  - font: *<u>font-style</u> <u>font-weight</u> <u>line-height</u>* **font-size(필수) font-family(필수)**
  - *<u>나머지 세 개는 옵션</u>*이지만 **font-size와 font-family는 필수**로 포함하고 **순서는 무관**하다.
  - 예시) `font: italic 2rem "Hack";`

- `text-align` 속성 : **글자의 정렬**과 관련된 속성(`text-align: center;`)

- `line-height` 속성 : **글자의 높이**를 지정

  - 요즘은 글자의 높이를 지정하는 기능보다 글자를 수직 중앙 정렬할 때 사용함
  - `line-height`를 부모의 height 만큼 주면 텍스트를 수직 중앙 정렬하기에 용이하다.(단, 텍스트가 한 줄인 경우에!)
  - 텍스트가 한 줄일 때 다음과 같이 정중앙 정렬함

  ```css
  .box > p {
    text-align: center;
    line-height: 100px;
  }
  ```