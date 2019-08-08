# [SSAFY]Web(written by wally-wally)

----

**※참고사항※**

- `[SSAFY]Web`은 정규과정 `Web`을 진행하면서 강의파일에 없는 추가적인 내용이나 중요하게 다루었던 내용을 상세하게 작성했음.
- 최대한 수업 시간의 모든 내용을 담으려했으나 없는 내용이 있을 수도 있음.

------

<br>

---

### :o: `vscode`에서 유용한 html 단축키

- `!` + `Enter` : HTML 기본 양식 자동완성
- `Ctrl` + `/`  : HTML에서 주석 입력
- `Alt` + `Shift` + `↓(아래 화살표)` : 복사하고싶은 라인 아래로 계속 복사
- `Ctrl` + `Alt` + `↓(아래 화살표)` : Multi Cursor

---

<br>

## 1. 7월31일(01일차)

:heavy_check_mark: **들어가기전에...** (`월드 와이드 웹(World Wide Web, WWW, W3)`이란?)

- 인터넷에 연결된 / 컴퓨터들을 통해 / 사람들이 정보를 공유할 수 있는 전 세계적인 정보 공간
- 간단히 웹(Web)이라 부르는 경우가 많다.
- 인터넷과 동의어로 쓰이는 경우가 많으나 엄격히 말해 서로 다른 개념이다.



### 1.1 Static Web & Dynamic Web

- `Static Web` : 요청했을 때 받는 페이지가 정해진 것(보여주는 데이터가 정해진 것)
  - ex) 댓글 기능이 없는 블로그 / `github.io` 홈페이지
- `Dynamic Web`(Web APP) : 데이터베이스를 접목시킨 동적 웹 => 무조건 이게 짱이 아님!
  - ex) 방명록 같은 기능이 있는 블로그

<br>

### 1.2 IP / 도메인 / URI / URL

- `IP(Internet Protocol)` : **8비트(0~255)까지의 숫자로 구성된 숫자의 집합**
  - `172.217.27.78` 과 같은 형식으로 작성
  - 각자가 가지고 있는 주소와 동일함
- `Domain` : **네트워크상의 컴퓨터를 식별하는 호스트명**
  - `google.com` 과 같은 형식으로 작성
- `URI(Uniform Resource Identifier, 통합 자원 식별자)` : 인터넷에 있는 자원을 나타내는 유일한 주소
- `URL(Uniform Resource Locator, 파일 식별자)` : **네트워크 상에서 자원이 어디 있는지를 알려주기 위한 고유 규약**
  - `https://www.google.co.kr/search?q=구글` 과 같이 작성
  - **도메인 + 경로, 실제로 해당 서버에 저장된 자료의 위치**
  - 흔히 웹 사이트 주소로 알고 있지만, 컴퓨터 네트워크 상의 자원을 모두 나타낼 수 있음
  - **`URL` 는 `URI`에 속한다. 하지만, `URI` 는 `URL` 에 속하지 않는다.**

<br>

### 1.3 HTML : Hyper Text Markup Language

- 웹 페이지를 작성하기 위한 역할 표시 언어
- `HTML 파일` : HTML로 작성된 **문서파일**
- `Hyper Text` : 특정한 링크를 통해 위치를 이동할 수 있음(정해진 순서가 없음)
  - 기존의 선형적인 텍스트가 아닌 비선형적으로 이루어진 텍스트
  - 기본적으로 Hyper Link를 통해 텍스트를 이동한다.
  - `HTTP(S)` : HTML 통신 규약(`S`는 Security(보안)의 약자로 요즘은 `HTTPS`로 많이 쓴다.)

![하이퍼텍스트](https://user-images.githubusercontent.com/52685250/62685178-19123980-b9fd-11e9-833c-cce293963676.JPG)

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

### 1.4 웹 표준

- 현재는 `W3C(World Wide Web Consortium)`이지만 `whatwg`에서 `HTML Living Standard` 표준을 만드는 중이다.
- 언젠가는 `whatwg`의 표준으로 넘어갈수도...

<br>

### 1.5 HTML Style Guide

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

### 1.6 HTML 문서의 기본 구조

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  
</body>
</html>
```

① `DOCTYPE 선언부` : 사용하는 **문서의 종류**를 선언하는 부분. 보통 html을 사용한다.

② `html 요소` : HTML문서의 **최상위 요소**로 문서의 **root**를 뜻한다. **head와 body 부분으로 구분**된다.

③ `head 요소` : 문서 제목, 문자코드(인코딩)와 같이 해당 **문서 정보**를 담고 있으며, **브라우저에 나타나지 않는다**. **CSS 선언 혹은 외부 로딩 파일 지정** 등도 작성한다.

④ `body 요소` : 브라우저 화면에 나타나는 정보로 **실제 내용**에 해당한다.

<br>

### 1.7 Tag와 DOM TREE

#### (1) Tag

- `주석(Comment)` : HTML에서 사용되는 주석 표기법(화면에 나오지 않음) => `<!-- 주석 내용 -->`

- `요소(element)` : HTML의 element는 태그와 내용(contents)로 구성되어 있다.
  - `<h1> 웹문서 </h1>`
  - 태그는 대소문자를 구별하지 않으나, 소문자로 작성해야 한다.
  - 요소간의 중첩도 가능하다.
- `Self-closing element` : 닫는 태그가 없는 태그도 존재한다.
  - `<img src="url">`
- `속성(attribute)` : 태그에는 속성이 지정될 수 있다.
  - `<a href="https//google.com"></a>` : `href`가 속성명, `google.com`이 속성값이다.
  - id, class, style은 태그와 상관없이 모두 사용 가능하다.
  - `href`와 `"https://~"` 사이에 공백은 No!, 주소는 더블 쿼터로 묶는다!

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
- TAB(2 space)를 통해 구조를 잡자!

<br>

#### (3) 시맨틱 태그(Semantic Tag)

- `<div></div>` 는 **단순히 공간만 구분**해 주는 태그로서 특별한 의미는 없다. 컨텐츠의 의미를 설명해주기 위해 태그인 시맨틱 태그를 사용한다.
- `display` : block을 지정하기 위한 기본 레이아웃 태그
- HTML5에 새롭게 다음과 같은 시맨틱 태그가 추가되었다.

![03_day01_03](https://user-images.githubusercontent.com/52685250/62214597-587acd80-b3e0-11e9-8c3a-55029b6f4ff9.JPG)

- `div` 대신에 의미를 부여한 특별한 이름일 뿐 **<u>그 이름이 특정한 기능을 수행하는 것이 아니다.</u>** **시맨틱하게 보이기 위해**서 태그를 더 만든 것이다.

:warning: **non semantic 요소 : `div` , `a` , `span` 등**

:heavy_check_mark:**시맨틱한 요소가 중요한 이유**

> **검색 엔진 최적화(SEO) 잘 지켰을 때** => 시맨틱한 요소가 굉장히 중요하다!!

![03_day01_01](https://user-images.githubusercontent.com/52685250/62177402-c7740a00-b37f-11e9-8cb4-bb1caaa7920b.JPG)

> 검색 엔진 최적화(SEO) 잘 안 지켰을 때

![03_day01_02](https://user-images.githubusercontent.com/52685250/62177444-e5416f00-b37f-11e9-980f-8d7853c07145.JPG)

- 개발자 및 사용자 뿐만 아니라 검색엔진(구글, 네이버) 등에 **의미 있는 정보의 그룹을 태그로 표현**하여 단순히 보여주기 위한 것을 넘어서 **의미를 가지는 태그**들을 활용하기 위한 노력

<br>

### 1.8 HTML 문서 작성의 기본

> 01_semantic.html

```html
<body>
  <!-- &lt;는 <이고, &gt;는 >이다. -->
  <!-- div 태그는 의미적이지 않을 때 쓰인다.(아마 div 많이 쓰일 껴) -->
  <!-- 시맨틱 태그는 여러 번 써도 상관없다. -->
  <header>&lt;header&gt;</header>
  <nav>&lt;nav&gt;</nav>
  <section>
    &lt;section&gt;
    <article>&lt;article&gt;</article>
  </section>
  <aside>&lt;article&gt;</aside>
  <footer>&lt;footer&gt;</footer>
</body>
```

<br>

> 02_index.html

- **heading** : `h1` 태그는 한 페이지에 하나만 쓰는게 원칙이고, `h2` 태그부터는 여러 개 써도 무방함
- **bold** : `b` 태그와 달리 `strong` 태그는 semantic 적인 태그(의미가 부여됨)
- **italic** : `i` 태그와 달리 `em` 태그는 semantic 적인 태그
- **highlight** : `mark` 태그를 사용
- **취소선, 밑줄 표시** : `del` 태그, `ins` 태그
- **윗 첨자, 아래 첨자** : `sub` 태그, `sup` 태그
- `p` 태그 : **paragraph 태그** / `br` 태그 : **enter 태그**
- **글씨 자체를 그대로 출력**하고 싶을 때 : `pre` 태그
- **더블 쿼터** : `q` 태그
- **인용문 같이 들여쓰기 사용할 때**  : `blockquote` 태그
- **리스트 만들기**
  - `ol` 태그 : **순서가 있는 리스트** => 항목 앞에 번호가 붙음
  - `ul` 태그 : **순서가 없는 리스트** => 항목 앞에 기호가 붙음
  - `li` 태그는 반드시 `ol` 또는 `ul` 태그 안에서 사용한다.

<br>

> 03_markup.html

```html
<h1>프로그래밍 교육</h1>
<a href="#python"><img src="images/python.jpg" alt="python image" width="50px" height="50px"></a>
<a href="#web"><img src="images/web.png" alt="html image" width="50px" height="50px"></a>
<a href="index.html">참고사이트</a>
```

- alt 값이 웹 접근성이여서 안 보이는 사람한테 읽어준다.(이미지가 없을 때 나오는 글자 지정)
  - alt에 빈 값을 넣을 때는 `#`만 써놓고 나중에 채워넣어도 된다. 공백으로만 두지 말자!
- `a href=#python`으로 작성하면 밑에 코드에서 `id`가 `python`으로 지정된 곳으로 이동하게 된다.
  - `img src`로 이미지를 삽입하여 hyper link 역할을 할 수 있다.

```html
<a href="https://docs.python.org/ko/3/tutorial/index.html" target="_blank" id="python">파이썬</a>
```

- 위와 같이 `target="_blank"`를 넣으면 새 창에서 웹 페이지가 열리고, 작성하지 않으면 현재 창에서 웹 페이지가 열린다.

```html
<ol>
  <li style="list-style-type:disc;">int</li>
  <li style="list-style-type:disc;">float</li>
  <li style="list-style-type:disc;">complex</li>
  <li><del>str</del></li>
</ol>
```

- 위와 같이 `list-style-type` 속성으로 list의 bullet 모양을 바꿀수 있다.
  - none, square, circle, lower-alpha, upper-alpha, upper-roman

```html
<a href="mailto:wallys0213@gmail.com">메일보내기</a>
```

- `mailto:본인 이메일 주소` 로 href의 값을 작성하면 본인 이메일 주소로 메일을 보낼 수 있다.

<br>

> 04_table.html (`rowspan`과 `colspan`을 정확히 이해하자!)

```html
<body>
  <!-- 스크린 리더가 caption말고 summery의 내용을 읽어준다.(웹 접근성) -->
  <table border="1px solid black" summery="2019년 7월 마지막 주 월화수 점심메뉴 표입니다.">
    <caption>유성연수원 20주차 점심 메뉴표</caption>
      <!-- caption 태그는 table 태그 바로 아래에 작성 -->
    <thead>
      <tr>
        <!-- table row : 행 -->
        <th></th> <!-- table header : 자동으로 bold 체로 출력 -->
        <th>월</th>
        <th>화</th>
        <th>수</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>A 코스</td> <!-- table data : 열 -->
        <td rowspan="2">짬뽕</td>
        <td colspan="2">초밥</td>
      </tr>
      <tr>
        <td>B 코스</td>
        <td>김치찌개</td>
        <td>삼계탕</td>
      </tr>
    </tbody>
    <tfoot> <!-- 표에서 딱 한번밖에 못 씀 / 어느 위치에서 tfoot을 작성하건 맨 아래로 이동함-->
      <tr>
        <td>식수</td>
        <td colspan="3">총 150명 식사</td>
      </tr>
    </tfoot>
  </table>
</body>
```

![표](https://user-images.githubusercontent.com/52685250/62687371-a6578d00-ba01-11e9-865a-c23343a4c12e.JPG)

<br>

> 06_form.html

```html
<body>
  <form action="#">
    <!-- NUMBER 라벨을 클릭해도 오른쪽 박스가 선택되어 짐-->
    <label for="text">TEXT</label>
    <input type="text", id="text" placeholder="내용을 입력해주세요"><br>
    <label for="number">NUMBER</label>
    <input type="number" id="number"><br>
    PASSWORD: <input type="password"><br>
    EMAIL : <input type="email"><br>
    DATE: <input type="date"><br>
    <input type="radio", name="language" value="1" checked>HTML<br> <!-- HTML로 기본 체크 -->
    <input type="radio", name="language" value="2">CS<br>
    <input type="radio", name="language" value="3">JS<br>
    <select name="coutry" id="">
      <!-- select라는 애가 key값을 가지므로 option 태그는 select 안에 작성한다.-->
      <option value="1">한국</option>
      <option value="2" disabled>중국</option> <!-- 중국 항목은 비활성화 -->
      <option value="3">미국</option>
    </select><br>
    <input type="checkbox", name="option" value="1">체크1
    <input type="checkbox", name="option" value="2">체크2<br>
    <input type="submit">
  </form>
</body>
```

![form](https://user-images.githubusercontent.com/52685250/62687571-01897f80-ba02-11e9-96b2-54448c6fcfbe.JPG)

```html
<article>
  <h2>2. 사이즈 선택</h2>
  <input type="number" min="15" max="30" step="15"><br>
</article>
```

- 이와 같이 작성하면 15, 30 중에서만 고를 수 있다.

<br>

---

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

---

:checkered_flag: **Box model의 구성**

![box-model](https://user-images.githubusercontent.com/52685250/62709607-a622b600-ba30-11e9-8638-f7c81636ba3f.JPG)

- `Content` : 실제 내용이 위치
- `Padding` : 테두리 안쪽의 내부 여백
  - 요소에 적용된 배경의 컬러, 이미지는 패딩까지 적용
- `Border` : 테두리 영역
- `Margin` : 테두리 바깥의 외부 여백
  - 배경색을 지정할 수 없다.

---

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

- block 레벨 요소 예 : `div`, `h1` ~ `h6`, `p`, `ol`, `li`, `ul`, `hr`, `table`, `form`

#### (2) inline

- 새로운 라인에서 시작하지 않으며 문장의 중간에 들어갈 수 있다.
- content의 너비만큼 가로폭을 차지함
- **width, height, margin-top, margin-bottom 프로퍼티를 지정할 수 없다.**
- **대신 상, 하 여백은 line-height로 지정한다.**
- inline 예시

![inline](https://user-images.githubusercontent.com/52685250/62716040-8beed500-ba3c-11e9-97e8-99d664045e0d.JPG)

- inline 레벨 요소 예 : `span`, `a`, `strong`, `img`, `br`, `input`, `select`, `textarea`, `button`

#### (3) inline-block

- block과 inline 레벨 요소의 특징을 모두 갖는다.
- inline 레벨 요소처럼 한 줄에 표시되면서
- **block에서의 width, height, margin-top, margin-bottom 프로퍼티를 지정할 수 있다.**

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

- 해댱 요소를 화면에 표시하지 않는다. (**<u>공간조차 사라진다.</u>**)

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

<br>

### 2.9 background 속성

#### (1) background-size

- `contain`
- `cover`

#### (2) background-repeat, position, attachment

<br>

------

<br>

## 3. 8월07일(03일차)

### 3.1 Position

#### (1) static(기본 위치)

- 기본적인 요소의 배치 순서에 따라 위에서 아래로, 왼쪽에서 오른쪽으로 따라 배치됨

- 부모 요소의 위치를 기준으로 배치됨

#### (2) relative(상대 위치)

- **기본 위치(static으로 지정 되었을 때의 위치)를 기준**으로 좌표 프로퍼티(top, bottom, left, right)를 사용하여 위치를 이동(음수도 가능)

#### (3) absoltue(절대 위치) ==> `집 나간 자식`

- 부모 요소 또는 가장 가까이에 있는 요소(static 제외)를 기준으로 좌표 프로퍼티(top, bottom, left, right)만큼 이동함
- relative, absolute, fixed 프로퍼티가 선언되어 있는 부모 또는 조상 요소를 기준으로 위치가 결정됨.
- 다른 위치 보다 자유롭게 이동함

#### (4) fixed(고정 위치)

- 부모 요소와 관계없이 브라우저의 viewpoint를 기준으로 좌표 프로퍼티(top, bottom, left, right)을 사용하여 위치 이동함.
- **스크롤이 되더라도 화면에서 사라지지 않고 항상 같은 곳에 위치**

<br>

### 3.2 Bootstrap - Utilities

**:heavy_check_mark: <u>Bootstrap은 공식 문서(Documentation)를 옆에 켜놓고 작업한다!</u>**

:heavy_check_mark: Bootstrap은 클래스로 스타일을 적용한다. **<u>클래스</u>** 이름을 유심히 보자!

#### (1) CDN(Content Delivery(Distribution) Network)

- 컨텐츠(CSS, JS, Image, Text 등)를 효율적으로 전달하기 위해 여러 노드에 가진 네트워크에 데이터를 제공하는 시스템.
- 개별 end-user의 가까운 서버를 통해 빠르게 전달 가능(지리적 이점)
- 외부 서버를 활용함으로써 본인 서버의 부하가 적어짐.
- 적절한 수준의 캐시 설정으로 빠르게 로딩할 수 있음.

#### (2) spacing

- `.mt-1` : 0.25rem * 16px = 4px / `.mt-2` : 0.5rem *16px = 8px / `.mt-3` : 1rem * 16px = 16px
- `mx-auto` : 가운데 정렬

#### (3) color

- 배경색 변경 : `background-color: primary`를 `.bg-primary` 와 같이 줄여서 작성함
- 글자색 변경 : `color : success`를 `.text-success`와 같이 줄여서 작성함.
- 경고창 색 : `.alert-warning`
- 버튼색 변경 : `.btn-secondary`
- nav바를 dark로 하고 배경색을 primary로 하자 : `.navbar-dark .bg-primary`

#### (4) border

- `border-color: success` => `.border .border-success`
- `rounded-circle`, `rounded-ill`

#### (5) display

- `.d-block`, `.d-sm-none`

#### (6) text

- `fonr-weight: bold` => `font-weight-bold`

<br>

### 3.3 CSS Layout History

① **레이아웃이 없던 시절**

② **테이블 레이아웃**

③ **프레임 레이아웃**

④ **CSS (float / position)** => 이 때부터 구조를 짜기 시작함

⑤ **flex box** : x축 또는 y축을 기반으로 정렬함 -> 1차원 배열의 시작 / 동시에 두 축을 기반으로는 할 수 없음

⑥ **grid system**: 2차원 배열(x축과 y축을 동시에 작업할 수 있음) 격자무늬로 자유자재로 박스들을 조절할 수 있음

:heavy_check_mark: **grid는 flex box보다 늦게 나왔지만 완전히 대체하는 것은 아니다! (현재는 둘 다 쓰고 있다!)**

<br>

------

<br>

## 4. 8월08일(04일차)

### 4.1 font awesome

```html
<!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <script src="https://kit.fontawesome.com/17820a52a0.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css">
  <link rel="stylesheet" href="00_font_awesome.css">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <style>
  .square {
    width: 100px;
    height: 100px;
  }
  /* :hover 라고 치면 마우스 올렸을 때 효과를 지정할 수 있음. */
  /* bootstrap에 색깔을 덮어 씌우려면 !important를 반드시 붙여줘야 한다. */
  .square-animate:hover { 
    background-color: crimson !important;
    opacity: 0.7;
    animation: tada 2s infinite;
  }
</style>
</head>

<body>
  <i class="fas fa-camera fa-6x faa-burst animated"></i>
  <i class="fab fa-apple-pay fa-7x faa-spin animated-hover"></i>

  <div class="square bg-primary d-inline-block animated infinite tada delay-3s fast"></div>
  <div class="square square-animate bg-primary d-inline-block"></div>

  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
    integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous">
  </script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
    integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous">
  </script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
    integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous">
  </script>
</body>

</html>
```

<br>

### 4.2 flex - 정렬(아주 중요!! 모두 외우자)

#### (1) x축 정렬(`justify-content`)

- 왼쪽 정렬 : `justify-content: flex-start;`
- 오른쪽 정렬 : `justify-content: flex-end;`
- 가운데 정렬 : `justify-content: center;`

- 좌우 정렬 : `justify-content: space-between;`
- 균등 좌우 정렬 : `justify-content: space-around;`
  - 요소 여백은 외곽 여백의 2배
- 균등 정렬 : `justify-content: space-evenly;`
  - 요소 여백과 외곽 여백 모두 동일

#### (2) y축 정렬(`align-items`)

- 상하단 꽉차게 : `align-items: stretch;`
- 상단 정렬 : `align-items: flex-start;`
- 하단 정렬 : `align-items: flex-end;`
- 가운데 정렬 : `align-items: center;`
- baseline 정렬 : `align-items: baseline;`
  - item 내부의 text 라인 맞추는 정렬

#### (3) 단독 정렬

- `align-self` : 자식들한테 단독으로 정렬할 때 사용

---

##### :heavy_check_mark: `flex - 정렬` 간단 정리

- x축 : justify
- y축 : align

- 한줄 : items
- 여러줄 : content
- 단독 : selfs

**:warning: flex-direction이 column이 되는 순간 justify는 y축 정렬이 되므로 주의!**

---

