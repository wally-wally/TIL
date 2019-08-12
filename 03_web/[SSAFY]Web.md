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

- `<div></div>` 는 **<u>단순히 공간만 구분</u>**해 주는 태그로서 특별한 의미는 없다. **<u>컨텐츠의 의미를 설명</u>**해주기 위해 태그인 시맨틱 태그를 사용한다.
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

    - ```css
      .box > p {
        text-align: center;
        line-height: 100px;
      }
      ```

<br>

---

<br>

## 3. 8월07일(03일차)

### 3.1 Position

#### (1) static(기본 위치)

- 기본적인 요소의 배치 순서에 따라 **위에서 아래로, 왼쪽에서 오른쪽으로** 따라 배치됨

- 부모 요소 내에 자식 요소로서 존재할 때는 부모 요소의 위치를 기준으로 배치됨

#### (2) relative(상대 위치)

- **기본 위치(자기가 원래 있어야 할 위치(static))를 기준**으로 좌표 프로퍼티(top, bottom, left, right)를 사용하여 위치를 이동(음수도 가능)

:warning: **relative로 이동하면 과거 static 이었던 공간도 차지한 상태로 이동한다.**

#### (3) absoltue(절대 위치) ==> `집 나간 자식`

- 부모 요소 또는 가장 가까이에 있는(조상) 요소(static 제외)를 기준으로 좌표 프로퍼티(top, bottom, left, right)만큼 이동함(**절대 위치 좌표** 설정)
- **relative, absolute, fixed 프로퍼티가 선언되어 있는** 부모 또는 조상 요소를 기준으로 위치가 결정됨.
- 다른 위치 보다 자유롭게 이동함
- 경우에 따른 절대 위치
  - 모든 부모가 static => `body`를 기준으로 함
  - 조상 중에 static이 아닌 가장 가까운 부모가 있을 때 => 그 조상 요소를 기준으로 좌표 프로퍼티만큼 이동
  - 해당 부모나 조상이 움직이면 함께 따라감

#### (4) fixed(고정 위치)

- 부모 요소와 관계없이 브라우저의 viewpoint를 기준으로 좌표 프로퍼티(top, bottom, left, right)을 사용하여 위치 이동함.
- **스크롤이 되더라도 화면에서 사라지지 않고 항상 같은 곳에 위치**

```css
/* 
  css에 position: fixed; bottom: 0;과 같이 작성하면
  화면 맨 아래에 항상 고정된다.
  만약 맨 위에 항상 고정하고 싶으면 bottom: 0; 대신에 top: 0;을 쓰면 된다.
*/
.fixed {
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
}
```

#### (5) z-index

- 큰 숫자값을 지정할수록 화면 전면에 출력된다.

<br>

### 3.2 float

- 해당 요소를 **다음 요소 위에 떠 있게(부유하게)** 한다.
  - '떠 있다(float)'의 의미는 요소가 기본 레이아웃 흐름에서 벗어나 **요소의 모서리가 왼쪽이나 오른쪽으로 이동하는 것**이다.
  - :warning: float를 사용할 때는 요소의 위치를 고정시켜버리는 `position: absolute;`를 사용하면 안 된다!

```html
<body>
  <div class="div">div</div>
    
  <div class="float-left">float-left</div>
  <div class="back">back</div>

  <div class="float-left">1</div>
  <div class="float-left">2</div>
  <div class="float-right">3</div>
  <div class="float-right">4</div>
  <div class="back">back</div>
</body>
```

```css
div {
  width: 100px;
  height: 100px;
  color: white;
  background-color: crimson;
  text-align: center;
  line-height: 100px;
}

.float-left {
  float: left;
}

.back {
  background-color: orange;
  width: 300px;
}

.float-right {
  float: right;
}

.clear {
  /* float 값을 무시하고 진행. */
  clear: both;
}
```

![float](https://user-images.githubusercontent.com/52685250/62793203-f4f14e00-bb0b-11e9-8c61-4281892388f1.jpg)

<br>

### 3.3 Bootstrap - Utilities

**:heavy_check_mark: <u>Bootstrap은 공식 문서(Documentation)를 옆에 켜놓고 작업한다!</u>**

:heavy_check_mark: Bootstrap은 클래스로 스타일을 적용한다. **<u>클래스</u>** 이름을 유심히 보자!

#### (1) CDN(Content Delivery(Distribution) Network)

- 컨텐츠(CSS, JS, Image, Text 등)를 효율적으로 전달하기 위해 여러 노드에 가진 네트워크에 데이터를 제공하는 시스템.
- 개별 end-user의 가까운 서버를 통해 빠르게 전달 가능(지리적 이점)
- 외부 서버를 활용함으로써 본인 서버의 부하가 적어짐.
- 적절한 수준의 캐시 설정으로 빠르게 로딩할 수 있음.

#### (2) spacing

- `.m-0` : `margin: 0;` / `.mr-0` : `margin-right: 0;`

- `.mt-1` = `margin-top: 0.25rem` = `margin-top: 4px;` (cf. 브라우저 기본 rem은 `16px`)
  - `.mt-1` => **0.25rem** * 16px = **4px** 
- `.mt-2` : **0.5rem** *16px = **8px** / `.mt-3` : **1rem** * 16px = **16px**
- `.mt-4` : **1.5rem** * 16px = **24px** / `.mt-2` : **3rem** *16px = **48px** 
- `mx-auto` : 가운데 정렬(= `margin-left: 0; margin-right: 0;`) / `ml-auto` : 오른쪽 정렬
- `.py-0` = `padding-top: 0; padding-bottom: 0;`

> spacing - 정리

![spacing](https://user-images.githubusercontent.com/52685250/62793642-ff601780-bb0c-11e9-930b-b42c44f241bd.JPG)

> spacing은 음수도 가능!

![spacing-음수](https://user-images.githubusercontent.com/52685250/62793815-7bf2f600-bb0d-11e9-85e1-e0d1782c409f.JPG)



#### (3) color

![color](https://user-images.githubusercontent.com/52685250/62793929-bf4d6480-bb0d-11e9-99b9-abbb4fec91ec.JPG)

- 배경색 변경 :  `class="bg-primary"` 
- 글자색 변경 : `class = "text-success"`
- 경고창 색 : `class="alert alert-warning"`
- 버튼색 변경 : `class="btn btn-secondary"`
- 뱃지색 변경 : `class="badge badge-info"`
- nav바를 dark로 하고 배경색을 primary로 하자 : `.navbar-dark .bg-primary`

#### (4) border

- `border-color: success` => `.border .border-success` 와 같이 border의 색상도 변경 가능함
- `.border-top`, `.border-right`, `.border-bottom`, `.border-left`와 같이 각 방향에서만 border를 표시할 수 있음
- `.rounded` : 4방향 둥글게 깎기 / `.rounded-top`, `.rounded-right`, `.rounded-bottom`, `.rounded-left` : 각 방향의 border의 꼭짓점 둥글게 깎기
- `.rounded-circle` : 원 모양으로 border 설정 /  .`rounded-pill` : 알약 모양으로 border 설정

#### (5) display

- `div` 태그는 원래 `block` 이지만 `inline`으로 만들 수 있다.
  - `d-inline` : `<div class="d-inline bg-primary text-white">div to inline</div>`
- `span` 태그는 원래 `inline` 이지만 `block`으로 만들 수 있다.
  - `d-block` : `<span class="d-block bg-dark text-white">span to block</span>`

> 반응형 웹 맛보기

![breakpoint](https://user-images.githubusercontent.com/52685250/62795049-b9a54e00-bb10-11e9-86a0-0d9e95215132.JPG)

- `	<div class="m-2 bg-danger d-sm-none d-md-block">보이나? 안보이나?</div>`
  - 너비가 576px ~ 768px 사이에서만 안 보이고 나머지 경우에는 보인다.(추후에 다시 자세히 나옴)
- position fixed : `<div class="sticky fixed-top bg-dark"></div>`
- `position: static;` 은 `.position-static`과 같이 줄여서 쓴다.

#### (6) text

- 텍스트 정렬
  - `class="text-left"`, `class="text-center"`, `class="text-right"`
- 텍스트 정렬 + 반응형
  - `class="text-sm-left"`, `class="text-md-center"`, `class="text-lg-right"` etc.
- 텍스트 변형
  - `class="text-lowercase"`, `class="text-uppercase"`, `class="text-capitalize"`
- 폰트 굵기 및 이텔릭체
  - `class="font-weight-bold(er)"`, `class="font-weight-normal"`, `class="font-weight-light(er)"`, `class="font-italic"`
- monospace(코드 같은거 출력시 사용)
  - `class="text-monospace"`

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

### 3.4 components

:heavy_check_mark: Bootstrap 공식문서를 확인하고 직접 써보면서 하나하나 익혀보는 것이 중요하다!

#### (1) Alerts

![alert](https://user-images.githubusercontent.com/52685250/62820375-86110500-bb9e-11e9-9fdf-170bc1f35823.JPG)

```html
<div class="alert alert-primary" role="alert">
  A simple primary alert—check it out!
</div>
```

#### (2) Badge

```html
<span class="badge badge-primary">Primary</span> <!-- 기본 모양 뱃지 -->
<span class="badge badge-pill badge-success">Success</span> <!-- 알약 모양 뱃지 -->
<a href="#" class="badge badge-warning">Warning</a> <!-- 뱃지에 링크 걸 때 -->
```

#### (3) Buttons

```html
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-info disabled">Primary</button> <!-- 버튼 비활성화 -->
```

#### (4) Button group

```html
<div class="btn-group" role="group">
  <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Dropdown
  </button>
  <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
    <a class="dropdown-item" href="#">Dropdown link</a>
    <a class="dropdown-item" href="#">Dropdown link</a>
  </div>
</div>
```

#### (5) Card

```html
<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <hr> <!-- hr 태그를 넣으면 카드 내용 안에 구분선을 추가할 수 있다. -->
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <!-- target="_blank"을 넣으면 버튼 선택시 새 창에서 열리기, 넣지 않으면 현재 창에서 열리기 -->
    <a href="#" class="btn btn-primary" target="_blank">Go somewhere</a>
  </div>
  <!-- card 맨 아래 footer 삽입시 -->
  <div class="card-footer">
    <small class="text-muted">Last updated 3 mins ago</small>
  </div>
</div>
```

#### (6) Carousel

```html
<div class="bd-example">
  <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
      <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="..." class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="..." class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="..." class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h5>Third slide label</h5>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </div>
      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</div>
```

#### (7) forms

![form](https://user-images.githubusercontent.com/52685250/62820393-b8bafd80-bb9e-11e9-882a-e9a6571ae7b2.JPG)

```html
<form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"> <!-- placeholder : 처음에 기본으로 쓰여져 있는 값 -->
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
  <div class="form-group form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

#### (8) modal

![modal](https://user-images.githubusercontent.com/52685250/62820411-dc7e4380-bb9e-11e9-819b-cd638b8d5ac8.JPG)

```html
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#서로_맞아야 _돼">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="서로_맞아야_돼" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <h5>Popover in a modal</h5>
        <p>This <a href="#" role="button" class="btn btn-secondary popover-test" title="Popover title" data-content="Popover body content is set in this attribute.">button</a> triggers a popover on click.</p>
        <hr>
        <h5>Tooltips in a modal</h5>
        <p><a href="#" class="tooltip-test" title="Tooltip">This link</a> and <a href="#" class="tooltip-test" title="Tooltip">that link</a> have tooltips on hover.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
```

#### (9) Navbar

```html
<nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand " href="#">영화추천시스템</a>
  <div class="collapse navbar-collapse d-flex justify-content-end align-items-center d-sm-none" id="navbarNav">
    <ul class="navbar-nav d-none d-sm-flex">
      <li class="mx-2">
        <a class="nav-link" href="#">Home</a>
      </li>
      <li class="mx-2">
        <a class="nav-link disabled" href="#">친구 평점 보러가기</a>
      </li>
      <li class="mx-2">
        <a class="nav-link disabled" href="#">Log In</a>
      </li>
    </ul>
  </div>
</nav>
```

<br>

### 3.5 Grid System

#### (1) grid의 기본 골격

![grid](https://user-images.githubusercontent.com/52685250/62822351-e9aa2b00-bbbc-11e9-910d-bea24d3c5cda.JPG)

- `<div class="container">` : 가운데로 모아주는 역할(필수 요소는 아님)
- `<div class="row">` : `row`는 grid 만들 때 필수 조건임
  - `row` 를 주면 block 속성이 깨짐, `row`는 `flex` 속성을 가지고 있다.(`display: flex;`)
- grid는 총 `12칸`으로 나눔(즉, 총 합 = 12)
  - 그 많은 숫자 중 12로 정한 이유 : 12는 약수가 많다. 즉, grid를 다양한 배열로 할 수 있다.
  - 12의 약수 : 1, 2, 3, 4, 6, 12

> `col-4` 3개 선언하면 간격이 균일한 박스 3개가 만들어짐
>
> `col-n` : 12칸 중에서 n칸 차지하는 박스 생성

```html
<div class="square col-4">1</div>
<div class="square col-4">2</div>
<div class="square col-4">3</div>
```

- `<div class="container-fluid">` : 양쪽 여백 없이 꽉차게

```html
<div class="container-fluid">
  <div class="row">
    <div class="square col-4">1</div>
    <div class="square col-4">2</div>
    <div class="square col-4">3</div>
  </div>
</div>
```

> gride 12칸을 초과하는 순간 아래로 떨어진다. 즉, 13번째 부터는 다음 줄로 넘어감

```html
<div class="container">
  <div class="row">
    <div class="square col-1">1</div>
    <div class="square col-1">2</div>
    <div class="square col-1">3</div>
    <div class="square col-1">4</div>
    <div class="square col-1">5</div>
    <div class="square col-1">6</div>
    <div class="square col-1">7</div>
    <div class="square col-1">8</div>
    <div class="square col-1">9</div>
    <div class="square col-1">10</div>
    <div class="square col-1">11</div>
    <div class="square col-1">12</div>
    <div class="square col-1">13</div>
  </div>
</div>
```

> grid col 합이 12를 초과하는 경우 아래로 내려간다.

```html
<div class="container">
  <div class="row">
    <div class="square col-9">col-9</div>
    <div class="square col-4">col-4</div>
    <div class="square col-3">col-3</div>
  </div>
</div>
```

- `<div class="square col-2 offset-5">col-2 offset-5</div>`
  - `offset-n` : n칸 뒤에 띄고 나서 시작

> 반응형 웹 맛보기

```html
<div class="row">
  <div class="square col-md-3 col-6"></div>
  <div class="square col-md-3 col-6"></div>
  <div class="square col-md-3 col-6"></div>
  <div class="square col-md-3 col-6"></div>
</div>
```

- 브라우저 창의 너비가 768px 이상일 때는 4등분 이였다가 그 이하로 줄어들면 한 줄에 박스가 2개씩 생성된다.

> [예제] 해당 조건에 맞게 grid를 통해 작성해보시오.
>
>  => 576px 미만 : 1등분 / 576px 이상 : 2등분 / 768px 이상 : 3등분
>
>  => 992px 이상 : 4등분 / 1200px 이상 :6등분

```html
<div class="row">
  <div class="square col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"></div>
  <div class="square col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"></div>
  <div class="square col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"></div>
  <div class="square col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"></div>
  <div class="square col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"></div>
  <div class="square col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"></div>
  <div class="square col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"></div>
  <div class="square col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"></div>
  <div class="square col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"></div>
  <div class="square col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"></div>
  <div class="square col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"></div>
  <div class="square col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"></div>
</div>
```

<br>

---

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

### 4.2 `flex-direction`, `flex-wrap`, `flex-flow`

#### (1) `flex-direction` : x축의 방향 설정

:warning: **`flex` 속성을 사용하기 위해서는 `display: flex;`를 반드시 선언해줘야 한다!(기본값은 x축 방향)**

- `flex-direction: row-reverse;` : x축 방향인데 거꾸로(맨 오른쪽부터 채워나가기 시작함)
  - bootstrap : `d-flex flex-row-reverse`
- `flex-direction: column;` : y축 방향
  - bootstrap : `d-flex flex-column`
- `flex-direction: column-reverse;` : y축 방향인데 거꾸로(맨 아래에서부터 채워나가기 시작함)
  - bootstrap : `d-flex flex-column-reverse`

#### (2) `flex-wrap` : 넘칠 때 어디로 넘치게 할지 결정

- `flex-wrap: nowrap;` : 모든 item을 한 줄에 나타나게 함(이게 기본 값)
  - bootstratp : `d-flex flex-nowrap`
- `flex-wrap : wrap;` : 넘치면 다음 줄로 넘김
  - bootstratp : `d-flex flex-wrap`
- `flex-wrap : wrap-reverse;` : 넘치면 위로 흐르게 함
  - bootstratp : `d-flex flex-wrap-reverse`

#### (3) `flex-flow` : direction과 wrap을 한 줄로 작성

- `flex-flow: row-reverse wrap;` 와 같이 작성

<br>

### 4.3 `flex-grow`

```html
<!DOCTYPE html>
<html lang="ko">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
		integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<link rel="stylesheet" href="flex_temp.css">
	<style>
	.container {
	  height: 100vh;
      border: 10px solid royalblue;
      display: flex;
    }
    
    .item {
      width: 300px;
      height: 200px;
    }

    .item2 {
      flex-grow: 2;
    }

    .item3 {
      flex-grow: 3;
    }

	</style>
</head>

<body>
	<div class="container p-0">
		<div class="item item1">1</div>
		<div class="item item2">2</div>
		<div class="item item3">3</div>
	</div>

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

- **남는 여백 부분에서 비율을 정해서 각 박스에 폭을 추가**한다.
  - grow를 주면 **전체적으로 부모에 맞춰 꽉차게 만들어준다.**
- **위와 같이 작성했다고 해서 3개 박스 비율이 정확히 1:2:3이 되는 것은 절대로 아니다!**
  - 각 박스의 비율은 원래 남는 비율을 grow 만큼 계산해서 추가해주기 때문에 1:2:3이 아니다.
  - 현재 상황인 남는 여백을 5등분 하여 item2에게 2, item3에게 3을 배분하므로 item1 : item2 : item3 = 1:2:3이 무조건은 아니다.
- 또한 item3에 grow를 안 주고 item2에만 `grow=1`을 준다고해서 item1:item2 = 1:2가 아니다.
  - 하나에만 숫자를 주는거는 그 값에 큰 의미가 없다.
  - 단지 여백 없이 꽉차게 하기 위한 것이다.

- `flex grow` 를 지정해주지 않으면 기본은 `0`이다.
- bootstrap : `flex-grow-1`

<br>

### 4.4 flex - 정렬(아주 중요!! 모두 외우자)

#### (1) x축 정렬(`justify-content`)

- 왼쪽 정렬 : `justify-content: flex-start;`
  - bootstrap : `d-flex justify-content-start`
- 오른쪽 정렬 : `justify-content: flex-end;`
  - bootstrap : `d-flex justify-content-end`
- 가운데 정렬 : `justify-content: center;`
  - bootstrap : `d-flex justify-content-center`
- 좌우 정렬 : `justify-content: space-between;`
  - 외곽 여백 없이 꽉차게 하여 아이템 간의 간격을 동일하게 유지한채 좌우 정렬함
  - bootstrap : `d-flex justify-content-between`
- 균등 좌우 정렬 : `justify-content: space-around;`
  - 요소 여백은 외곽 여백의 2배
  - bootstrap : `d-flex justify-content-around`
- 균등 정렬 : `justify-content: space-evenly;`
  - 요소 여백과 외곽 여백 모두 동일

#### (2) y축 정렬(`align-items`)

- 상하단 꽉차게 : `align-items: stretch;`
  - bootstrap : `d-flex align-items-stretch`
- 상단 정렬 : `align-items: flex-start;`
  - bootstrap : `align-items-start`
- 하단 정렬 : `align-items: flex-end;`
  - bootstrap : `d-flex align-items-end`
- 가운데 정렬 : `align-items: center;`
  - bootstrap : `d-flex align-items-cetner`
- baseline 정렬 : `align-items: baseline;`
  - item 내부의 text 라인 맞추는 정렬
  - y축에서만 있는 정렬로 글꼴의 크기가 다른 경우에 사용한다.
  - 글꼴의 가장 아래 부분을 기준으로 정렬된다.
  - bootstrap : `d-flex align-items-baseline`

![baseline](https://user-images.githubusercontent.com/52685250/62823054-7a860400-bbc7-11e9-8461-00859694ddde.JPG)

#### (3) 단독 정렬

- `align-self` : 자식들한테 단독으로 정렬할 때 사용
  - bootstrap : `align-self-center`와 같이 사용

```css
/* 나머지를 제외하고 item8의 요소만 하단 정렬 해준다. */
.items8{
  align-self: flex-end;
}

/* 나머지를 제외하고 item5의 요소만 가운데 정렬 해준다. */
.items5{
  align-self: center;
}
```

---

##### :heavy_check_mark: `flex - 정렬` 간단 정리

| x축       | y축     | 한줄    | 여러줄    | 단독    |
| --------- | ------- | ------- | --------- | ------- |
| `justify` | `align` | `items` | `content` | `selfs` |

**:warning: flex-direction이 column이 되는 순간 justify는 y축 정렬이 되므로 주의!**

---

#### (4) `order` - 배치 순서

- order 값이 없는 요소들은 0을 가지고 있다.(기본값)
- order는 숫자가 작을수록 왼쪽으로 간다.
- bootstrap : `order-1`와 같이 사용

<br>

### 4.5 flex-layout

![flex01](https://user-images.githubusercontent.com/52685250/62823291-a787e600-bbca-11e9-99a3-9d8fa7cbb467.JPG)

```html
<!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <link rel="stylesheet" href="06_flex_layout.css">
</head>

<body>
  <div class="container">
    <nav>
      <div class="logo">LOGO</div>
      <ul class="items">
        <li>Home</li>
        <li>About</li>
        <li>Content</li>
        <li>Contact</li>
      </ul>
    </nav>

    <div class="main">
      <aside>왼쪽</aside>
      <section>
        <div class="article">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt corporis, recusandae ab
          iure, dicta quo excepturi voluptatibus ea officiis hic sint? Eligendi ipsum fuga enim vero deleniti dolorum
          explicabo eius!
        </div>
        <div class="article">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt corporis, recusandae ab
          iure, dicta quo excepturi voluptatibus ea officiis hic sint? Eligendi ipsum fuga enim vero deleniti dolorum
          explicabo eius!
        </div>
        <div class="article">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt corporis, recusandae ab
          iure, dicta quo excepturi voluptatibus ea officiis hic sint? Eligendi ipsum fuga enim vero deleniti dolorum
          explicabo eius!
        </div>
      </section>
    </div>

    <footer>
      이곳은 푸터입니다.
    </footer>
  </div>
</body>

</html>
```

```css
.container {
  display: flex;
  height: 100vh;
  flex-direction: column;
}

nav {
  display: flex; /* 내부에서도 flex 가능 */
  height: 100px;
  background-color: wheat;
  justify-content: space-between; /* 양쪽으로 찢어놓기 */
  align-items: center;
}

.items {
  display: flex;
}

.items > li {
  list-style-type: none;
  margin: 0 20px;
}

.main {
  display: flex;
  height: 100%;  
}

aside {
  width: 300px;
  height: 100%;
  background-color: rosybrown;
}

section {
  display: flex;
  background-color: pink;
  height: 100%;
  flex-grow: 1;
  flex-direction: column;
}

.article {
  background-color: violet;
  border: 1px solid black;
  padding: 30px 10px;
  flex-grow: 1;
}

footer {
  background-color: wheat;
  width: 100%; /* 좌우 너비 꽉차게*/
  height: 100px;
  /* block 에서는 margin-top: auto; 불가능하지만 지금은 flex이므로 가능 */
  margin-top: auto; /* 맨 아래로 보내는 구문 */
}
```

<br>

### 4.6 flex-layout-bootstrap

![flex02](https://user-images.githubusercontent.com/52685250/62823294-ad7dc700-bbca-11e9-805f-3fabca64fd28.JPG)

```html
<!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <style>
    nav {
      height: 100px;
    }

    footer {
      height: 100px;
    }

    .items {
      list-style-type: none;
    }

    aside {
      width: 200px;
    }
  </style>
</head>

<body>
  <div class="container d-flex vh-100 flex-column">
    <nav class="d-flex bg-warning justify-content-between align-items-center">
      <div>LOGO</div>
      <ul class="items d-flex mb-0">
        <li class="mx-2">TEST</li>
        <li class="mx-2">TEST</li>
        <li class="mx-2">TEST</li>
        <li class="mx-2">TEST</li>
      </ul>
    </nav>

    <div class="main d-flex h-100">
      <aside class="bg-success">왼쪽</aside>
      <section class="d-flex flex-column">
        <div class="bg-dark text-white flex-grow-1 border border-light">Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quidem non error aliquid. Illo iure veniam dolor
          laudantium saepe amet dignissimos similique, unde, est a in ad deleniti accusantium vel veritatis.</div>
        <div class="bg-dark text-white flex-grow-1 border border-light">Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quidem non error aliquid. Illo iure veniam dolor
          laudantium saepe amet dignissimos similique, unde, est a in ad deleniti accusantium vel veritatis.</div>
        <div class="bg-dark text-white flex-grow-1 border border-light">Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quidem non error aliquid. Illo iure veniam dolor
          laudantium saepe amet dignissimos similique, unde, est a in ad deleniti accusantium vel veritatis.</div>
      </section>
    </div>
    <footer class="w-100 bg-primary mt-auto">푸터입니다.</footer>
  </div>

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

### 4.7 media query

```css
@media not|only mediatype and (조건문) {
  실행문
}

/* 하지만 우리는 아래와 같이 사용할 것이다. */
@media (조건문) {
  실행문
}

@media only all and (max-width: 1200px) {
  * {
    margin: 0;
  }
}
```

- `only | not` : 특정 미디어 타입에서만, 또는 특정 미디어 타입을 제외하고 스타일 적용
  - `only screen`, `only print`, `not print`
- `all` : 모든 미디어 타입 (기본값)
  - `all` 말고 `screen`, `print`, `tty`, `tv` 등이 있음
- 논리 연산자를 사용하여 조건을 설정할 수 있다.
  - `not`, `and`, `,`(or) 사용 가능

```html
<body>
  <h1>안녕하세요??</h1>
  <p class="orientation">지금 방향은?</p>
  <h2>바이!!!!</h2>
  <h1 class="rainbow">무지개</h1>
  <h3>너비와 높이를 한번에 적용!</h3>
  <p class="print">나는 프린트 할 때만 빨간색이야!</p>
</body>
```

> (1) 뷰포트 너비가 600px 이상 (최소 너비 600px)
>
> (2) 뷰포트 너비가 500px 이하 (최대 너비 500px)
>
> (3) 뷰포트 너비가 딱 500px 일 때

```css
/* (1)번 */
@media (min-width: 600px) {
  h1 {
    color: crimson;
  }
}

/* (2)번 */
@media (max-width: 500px) {
  h2 {
    color: darkgreen;
  }
}

/* (3)번 */
@media (width: 500px) {
  h1 {
    color: royalblue;
  }
}
```

> 가로 모드와 세로 모드

```css
@media (orientation: landscape) {
  .orientation::after {
    content: '가로입니다.';
  }
}

@media (orientation: portrait) {
  .orientation::after {
    content: '세로입니다.';
  }
}
```

> 무지개 만들기

```css
@media (min-width: 500px) {
  .rainbow {
    color: red;
  }
}

@media (min-width: 550px) {
  .rainbow {
    color: orange;
  }
}

@media (min-width: 600px) {
  .rainbow {
    color: yellow;
  }
}

@media (min-width: 650px) {
  .rainbow {
    color: green;
  }
}

@media (min-width: 700px) {
  .rainbow {
    color: blue;
  }
}

@media (min-width: 750px) {
  .rainbow {
    color: navy;
  }
}

@media (min-width: 800px) {
  .rainbow {
    color: purple;
  }
}
```

> 뷰포트 너비가 500px 이하 그리고 높이가 500px 이하 일 때 폰트색 brown으로 설정

```css
@media (max-height: 500px) and (max-width: 500px) {
  h3 {
    color: brown;
  }
}
```

> print 일 때만 폰트색 crimson으로 변경

```css
@media only print {
  .print {
    color: crimson;
  }
}
```