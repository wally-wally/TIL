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

### 2.1

<br>

### 2.2

<br>

### 2.3

<br>

### 2.4