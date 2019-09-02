# :notebook_with_decorative_cover: 03_web - Day03

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
> => 576px 미만 : 1등분 / 576px 이상 : 2등분 / 768px 이상 : 3등분
>
> => 992px 이상 : 4등분 / 1200px 이상 :6등분

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