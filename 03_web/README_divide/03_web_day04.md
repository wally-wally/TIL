# :notebook_with_decorative_cover: 03_web - Day04

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

------

##### :heavy_check_mark: `flex - 정렬` 간단 정리

| x축       | y축     | 한줄    | 여러줄    | 단독    |
| --------- | ------- | ------- | --------- | ------- |
| `justify` | `align` | `items` | `content` | `selfs` |

**:warning: flex-direction이 column이 되는 순간 justify는 y축 정렬이 되므로 주의!**

------

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

