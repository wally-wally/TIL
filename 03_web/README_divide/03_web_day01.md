# :notebook_with_decorative_cover: 03_web - Day01

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
