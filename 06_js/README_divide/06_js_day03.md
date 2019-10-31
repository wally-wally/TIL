# :notebook_with_decorative_cover: 06_Javascript - Day03

<br>

## 3. 10월31일(3일차)

---

:heavy_check_mark: <b>JS 함수는 `일급객체`</b> (cf. 파이썬도 `일급객체`)

- 일급 객체가 되기 위한 3가지 조건
  - 변수에 담을 수 있다.
  - 인자로 전달할 수 있다. `콜백함수`
  - 반환값으로 전달할 수 있다. `return n => n + 1`

---

:heavy_check_mark: <b>setTimeout</b>

```javascript
setTimeout(function () {
	console.log('3초 후 출력됩니다.')
}, 3000)
```

```javascript
setTimeout( () => console.log('3초 후 출력'), 3000)
```

---

:heavy_check_mark: <b>비동기식 처리 모델</b>

- 비동기식 = 병렬적 처리
- 호출될 함수 (콜백함수)를 미리 매개변수에 전달하고 처리가 종료되면 콜백함수를 호출하는 것.

---

### 3.1 callback 함수 - `01_callback_intro_2.js`

- 인수로 다른 함수에 전달된 함수

- 명시적으로 호출하는 방식이 아니라 <b>특정 이벤트가 발생했을 때</b> 시스템에 의해 호출되는 함수
  - 다른 함수의 실행이 끝나고 난 뒤에 실행되는 함수. `이따가 너 실행 끝나면 그때 나 좀 호출해줘.`
- 함수의 호출권한을 내가 아닌 시스템이 가진다.

```javascript
function doSomoething(subject, callback) {
  console.log(`이제 ${subject} 과목평가 준비를 시작해볼까?`)
  callback()
}

// callback 함수를 익명함수로 작성할 때
doSomoething('django', function () {
  console.log('며칠 안남았는데?')
})

// callback 함수를 기명함수로 작할 때
function alertFinish() {
  console.log('며칠 안남았는데?')
}

doSomoething('django', alertFinish)
```

<br>

### 3.2 이벤트 리스너(`무엇을` - `언제` - `어떻게`) - `02_event_listener.html`

- 이벤트 리스너 생각하는 법

  - `EventTarget.addEventListener(type, listener)`
  - `EventTarget`(무엇을 - 버튼을) - `type`(언제 - 클릭했을 때) - `listener`(어떻게 - 콘솔에 로그를)

- <b>이벤트 리스너는 함수 작성시 화살표 함수를 사용하지 않는다.</b>

- 콜백함수, 이벤트 리스너 활용

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
    <div id="my"></div>
  
    <button id="this-button">Click me!</button>
  
    <script>
      // 1. 무엇을
      const button = document.querySelector('#this-button')
  
      // 2. 언제 - 3. 어떻게(콜백함수)
      button.addEventListener('click', function(event) {
        console.log(event)
        const area = document.querySelector('#my')
        area.innerHTML = '<h1>뿅!!!</h1>'
      })
    </script>
  </body>
  </html>
  ```

  ![01](https://user-images.githubusercontent.com/52685250/67908851-6cd98c80-fbc0-11e9-9dd2-f114b851b3dc.JPG)

- JS 코드를 body의 최하단에 위치하는 이유
  - JS를 읽는 시간 때문에 BODY 안에 있는 HTML 요소들이 브라우저에 그려지는게 지연될 수 있기 때문이다.
  - JS에서 특정 HTML 요소들을 읽고 이벤트를 등록해야 할 때, JS 코드가 먼저 해석되면 해당 요소가 없다고 인식되어 이벤트 등록이 되지 않을 수 있기 때문이다.

<br>

### 3.3 DOM 조작

---

- javascript의 `window` 객체로 DOM 조작을 할 수 있다.
- `window.open()`, `window.confirm()`, `window.print()`, `window.document`

---

<br>

#### (1) DOM 트리

<img src="https://web222.ca/weeks/week07/images/dom-tree.png" width="550px">



- querySelector는 위에서 선택자로 요소를 찾으며 가장 먼저 찾아지는 요소를 반환(단수)

- querySelectorAll은 위에서부터 선택자로 요소를 찾으며 일치하는 요소들을 모두 반환(복수)

  ```html
  <body>
    <div class="bg">
      <img id="dino" width="100px" height="100px"
        src="https://is4-ssl.mzstatic.com/image/thumb/Purple118/v4/88/e5/36/88e536d4-8a08-7c3b-ad29-c4e5dabc9f45/AppIcon-1x_U007emarketing-sRGB-85-220-0-6.png/246x0w.jpg"
        alt="google-dino" />
    </div>
    <div class="bg">
      <img id="dino-2" width="100px" height="100px"
        src="https://is4-ssl.mzstatic.com/image/thumb/Purple118/v4/88/e5/36/88e536d4-8a08-7c3b-ad29-c4e5dabc9f45/AppIcon-1x_U007emarketing-sRGB-85-220-0-6.png/246x0w.jpg"
        alt="google-dino" />
    </div>
  
    <script>
    </script>
  </body>
  ```

  <img src="https://user-images.githubusercontent.com/52685250/67909285-05bcd780-fbc2-11e9-98b1-53d9ab8ef159.JPG" width="350px">

<br>

#### (2) Parent - Child 관계 이용하여 DOM 조작(이미지 이용)

① 각 속성에 접근하기

![03](https://user-images.githubusercontent.com/52685250/67909878-3271ee80-fbc4-11e9-9534-f460190578df.JPG)

② 이미지 style 조작

![04](https://user-images.githubusercontent.com/52685250/67909880-330a8500-fbc4-11e9-9d82-9a6177bac554.JPG)

③ 자식 요소 삭제 - 1

![05](https://user-images.githubusercontent.com/52685250/67909881-330a8500-fbc4-11e9-9e5a-8ed40c3a83a1.JPG)

④ 자식 요소 삭제 - 2

![06](https://user-images.githubusercontent.com/52685250/67909882-330a8500-fbc4-11e9-98a4-f834647b3d01.JPG)

⑤ 자식 요소 삭제 - 3

![07](https://user-images.githubusercontent.com/52685250/67909883-330a8500-fbc4-11e9-8258-f29712670808.JPG)

⑥ `img` 태그 완성 후 이미지 삽입

![08](https://user-images.githubusercontent.com/52685250/67909884-33a31b80-fbc4-11e9-9035-509212781810.JPG)

<br>

### 3.4 이벤트 리스너, DOM 조작 실습

#### (1) Google Dinosaur Page 만들기

- 참고 문서 - [`addEventListener`의 이벤트 유형] `키보드 이벤트`, `마우스 이벤트` 쪽 보기 <a href="https://developer.mozilla.org/ko/docs/Web/Events" target="_blank">(바로 이동)</a>

- 위치를 잡고 각 키보드 버튼의 값을 알기 위해 키보드 이벤트 실행 후 console에 찍힌 정보 중 원하는 값을 이용한다. - `code`, `key`, `keyCode`

  ![10](https://user-images.githubusercontent.com/52685250/67910815-8e8a4200-fbc7-11e9-95f1-da08f10a6e62.JPG)

- `console.log(dino.style)`로 margin의 정확한 명칭을 먼저 찾자

  ![11](https://user-images.githubusercontent.com/52685250/67911009-3e5faf80-fbc8-11e9-8992-288ddaaed989.JPG)

- 화살표 키 누르는 방향으로 공룡 이동 & 마우스 공룡에 가져다대면 랜덤 위치로 이동

  ```html
  <body>
    <div class="bg">
      <img id="dino" width="100px" height="100px"
        src="https://is4-ssl.mzstatic.com/image/thumb/Purple118/v4/88/e5/36/88e536d4-8a08-7c3b-ad29-c4e5dabc9f45/AppIcon-1x_U007emarketing-sRGB-85-220-0-6.png/246x0w.jpg"
        alt="google-dino" />
    </div>
  
    <script>
      const dino = document.querySelector('#dino')
      let x = 0
      let y = 0
      // addEventListener에서는 화살표 함수 쓰지말고 일반 표현식으로 쓰자!
      document.addEventListener('keydown', function(e) {
        console.log(e)
        if (e.key === ' ') {
          console.log('spacebar')
          alert('크아아아앙!!!')
        } else if (e.key === 'ArrowLeft') {
          console.log('left')
          x -= 20
          dino.style.marginLeft = `${x}px`
        } else if (e.code === 'ArrowUp') {
          console.log('up')
          y -= 20
          dino.style.marginTop = `${y}px`
        } else if (e.keyCode === 39) {
          console.log('right')
          x += 20
          dino.style.marginLeft = `${x}px`
        } else if (e.code === 'ArrowDown') {
          console.log('down')
          y += 20
          dino.style.marginTop = `${y}px`
        } else {
          console.log('You press wrong key!')
        }
      })
  
      // [추가내용] 공룡에 마우스 대면 랜덤위치로 공룡 이동하기
      dino.style.position = 'absolute'
      dino.addEventListener('mouseover', function() {
        // (현재 윈도우 너비 * 난수(0 ~ 1사이의 난수)) - (현재 윈도우 너비)
        const newWidth = window.innerWidth * Math.random() - window.innerWidth / 2
        const newHeight = window.innerHeight * Math.random() - window.innerHeight / 2
        dino.style.marginLeft = newWidth + 'px'
        dino.style.marginTop = newHeight + 'px'
      })
    </script>
  </body>
  ```

<br>

#### (2) Shopping List 만들기

- 입력한 아이템을 추가하거나 쇼핑 리스트에서 삭제할 수 있다.

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
    <h1>My Shopping List</h1>
    Enter a new item: <input type="text" id="item-input">
    <button id="add-button">Add Item</button>
    <ul id="shopping-list">
  
    </ul>
  
    <script>
      const input = document.querySelector('#item-input')
      const button = document.querySelector('#add-button')
      const shoppingList = document.querySelector('#shopping-list')
  
      button.addEventListener('click', function() {
        const itemName = input.value
        input.value = '' // 물건을 담고 초기화를 시켜줘야 기존의 value 값이 사라짐
  
        // item 변수에 li 태그 객체 담기
        const item = document.createElement('li')
        // item 에 itemName을 담는다.
        item.innerText = itemName
  
        // 1. Delete 버튼 태그 추가
        const deleteButton = document.createElement('button')
  
        // 2. deleteButton 변수에 텍스트(버튼에 들어가는 글자) 추가
        deleteButton.innerText = 'DELETE'
  
        // 3. item(li 태그)에 deleteButton 을 마지막 요소로 추가
        item.append(deleteButton)
  
        // 4. deleteButton 을 누르면 item을 삭제
        deleteButton.addEventListener('click', function() {
          item.remove()
        })
  
        // ul 태그(shoppingList)에 마지막에 item(li 태그)을 자식요소로 추가
        shoppingList.append(item)
      })
    </script>
  </body>
  </html>
  ```

  :checkered_flag: Result Screenshot

  <img src="https://user-images.githubusercontent.com/52685250/67913498-9f8b8100-fbd0-11e9-8003-16dadfb8852b.JPG" width="430px">

<br>

### 3.5 비동기식 처리 모델 [(비동기 처리 과정 한 눈에 보기)]( http://latentflip.com/loupe/?code=DQpmdW5jdGlvbiBwcmludEhlbGxvKCkgew0KICBjb25zb2xlLmxvZygnaGVsbG8gZnJvbSBiYXonKQ0KfQ0KDQpmdW5jdGlvbiBiYXooKSB7DQogIHNldFRpbWVvdXQocHJpbnRIZWxsbywgMCkNCn0NCg0KZnVuY3Rpb24gYmFyKCkgew0KICBiYXooKQ0KfQ0KDQpmdW5jdGlvbiBmb28oKSB7DQogIGJhcigpDQp9DQoNCmZvbygp!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D )

#### (1) 동기식 처리 모델과 비동기식 처리 모델

:heavy_check_mark: <b>동기식 처리 모델(Synchronous)</b>

- 직렬적으로 테스크를 수행
- 테스크는 순차적으로 실행되며 어떤 작업이 수행중이면 다음 작업은 대기
- 예) 서버에서 데이터를 가져와서 화면에 표시하는 작업을 수행할 때, 데이터가 응답될 때까지 이후 테스크들은 <b><u>블로킹(blocking)</u></b>된다.

:heavy_check_mark: <b>비동기식 처리 모델(Asynchronous)</b>

- 병렬적으로 테스크를 수행
- 테스크는 종료되지 않는 상태라 하더라도 대기하지 않고 다음 테스크를 실행
- 예) 서버에서 데이터를 가져와서 화면에 표시하는 작업을 수행할 때, 데이터가 응답될 때까지 <b><u>기다리지 않고(non-blocking)</u></b> 즉시 다음 테스크를 수행
- <u>JS 대부분의 DOM 이벤트</u>와 <u>Timer 함수</u>, <u>Ajax 요청</u>은 비동기식 처리 모델로 동작

<br>

#### (2) Blocking vs non-blocking

```javascript
const nothing = () => {
  console.log('sleeping')
}

console.log('start')
setTimeout(nothing, 3000)
console.log('end')
// start
// end가 나온후
// 3초 뒤에 sleeping이 출력된다.

function sleep_3s() {
  setTimeout(() => console.log('wake up'), 3000)
}
console.log('Start sleeping')
sleep_3s()
console.log('End of program')


function first() {
  console.log('first')
}

function second() {
  console.log('second')
}

function thrid() {
  console.log('thrid')
}
first()
seTtime(second, 1000)
thrid()
```

- 이벤트 루프
  - 단 한가지 <b>콜스택</b>과 <b>콜백큐</b>를 감시하는 역할만 한다.
  - 만약 콜스택이 비어 있으면 이벤트 루프는 콜백큐에서 첫 번째 이벤트를 가져다가 콜스택에 밀어 넣고, 결과적으로 해당 이벤트가 실행된다.
  - 이러한 반복은 이벤트 루프에서 `tick`이라고 한다.
  - 이벤트 루프는 호스팅 환경(브라우저 or nodejs)에 내장된 메커니즘(JS 엔진에 있는게 아니다.)
  - 이것은 시간의 흐름에 따라 코드의 수행을 처리하며 그 때마다 JS 엔진을 작동 시킨다.

<br>

#### (3) `setTimeout(mycallback, msecs)`

- callback 함수가 1초 뒤에 실행될 것이다 라는 의미가 아니다.
- <b>1초 후에 콜백 큐에 추가될 것이라는 의미</b>
- 만약에 콜백 큐에 mycallback 보다 먼저 추가된 이벤트가 있을수도 있기 때문에 실제 1초보다 더 오랜시간이 걸릴수도 있다.

- 비동기식 처리 순서 연습(1)

  ```javascript
  console.log('Hi')
  
  setTimeout(function ssafy() {
    console.log('ssafy')
  }, 5000)
  // [주의!] 5000이든 0이든 출력은 동일 - 이 시간은 콜백큐로 가는 시간이다. 비동기 처리가 모두 끝나야 출력된다!
  
  console.log('bye')
  ```

- 비동기식 처리 순서 연습(2)

  ```javascript
  function printHello() {
    console.log('hello from baz')
  }
  
  function baz() {
    setTimeout(printHello, 3000)
  }
  
  function bar() {
    baz()
  }
  
  function foo() {
    bar()
  }
  
  foo()
  ```

- callback 함수 연습

  ```javascript
  // 배열로 이루어진 숫자들을 모두 더하는 함수
  const numberAddEach = numbers => {
    let sum = 0
    for (const number of numbers) {
      sum += number
    }
    return sum
  }
  
  // 배열로 이루어진 숫자들을 모두 뺴는 함수
  const numberSubEach = numbers => {
    let sub = 0
    for (const number of numbers) {
      sub -= number
    }
    return sub
  }
  
  // 배열로 이루어진 숫자들을 모두 곱하는 함수
  const numberMulEach = numbers => {
    let mul = 1
    for (const number of numbers) {
      mul *= number
    }
    return mul
  }
  ```

  ```javascript
  // 그런데 매번 이렇게 함수를 새로 정의해야 되나...?
  // 공통점 : 수사로 이루어진 배열의 요소들을 각각 [???] 한다.
  // [???] 를 callback 함수에서 처리하는 일로 바꿔보자.
  ```

  ```javascript
  // base 템플릿 역할
  const numbersEach = (numbers, callback) => {
    let acc
    for (const number of numbers) {
      acc = callback(number, acc)
    }
    return acc
  }
  
  // 더한다
  const addEach = (number, acc = 0) => {
    return acc + number
  }
  
  // 뺀다
  const subEach = (number, acc = 0) => {
    return acc - number
  }
  
  // 곱한다
  const mulEach = (number, acc = 1) => {
    return acc * number
  }
  
  const NUMBERS = [1, 2, 3, 4, 5,]
  console.log(numbersEach(NUMBERS, addEach)) // 15
  console.log(numbersEach(NUMBERS, subEach)) // -15
  console.log(numbersEach(NUMBERS, mulEach)) // 120
  ```

  ```javascript
  // 그런데 addEach, subEach, mulEach 얘네들 다시 사용 안할 것 같은데??
  // numbersEach 이후의 제어를 함수 정의 없이 매번 자유롭게 하려면 어떻게 해야 할까?
  // 익명함수로 쓰자
  console.log(numbersEach(NUMBERS, (number, acc=0) => acc + number))
  console.log(numbersEach(NUMBERS, (number, sub=0) => sub - number))
  console.log(numbersEach(NUMBERS, (number, mul=1) => mul * number))
  ```

<br>

### 3.6 Axios <a href="https://github.com/axios/axios" target="_blank">(공식 github)</a> - `03_axios.js`

- `axiosXHR`을 요청으로 보내고 응답 받은 결과를 `Promise 객체`로 반환 해주는 라이브러리
- axios는 현재 JS 에서 가장 HOT한 라이브러리 중 하나이며 프론트엔드 프레임워크(react, vue)에서 데이터를 주고 받을 때 필수적으로 사용되고 있음(프론트엔드 프레임워크와 API 서버 간의 데이터를 주고 받을 때!)

- `npm install axios` 로 axios 라이브러리 설치

- 기본 axios 틀

  ```javascript
  const axios = require('axios') // JS에서 import하는 방법
  
  axios.get('http://jsonplaceholder.typicode.com/posts')
    .then(response => {
      console.log(response)
    })
    .catch(err => { // 요청이 잘못되었을 때
      console.log(err)
    })
  ```

- [실습] 랜덤 강아지, 고양이 이미지 가져오기 - `04_dogs_and_cats.html`

  강아지, 고양이 사진 매수 보여주기 기능도 추가함

  ```html
  <!DOCTYPE html>
  <html lang="ko">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
      img {
        width: 300px;
        height: 300px;
      }
    </style>
  </head>
  <body>
    <h1>Random Dog & Cat Image</h1>
    <button id="dog-button">Dog Image On!</button> <span id="dogCount">0</span>장 &nbsp;
    <button id="cat-button">Cat Image On!</button> <span id="catCount">0</span>장 <br>
    <hr>
    <div class="animals"></div>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script>
      const getDogImage = function () {
        // axios가 비동기 함수로 구동되고 있다.
        // 중요한건 누르는 순서가 아닌 내부적으로 처리되는 순서로 사진이 출력되므로
        // 우리가 원하는 대로 출력되지 않을 수도 있따.
        axios.get('https://dog.ceo/api/breeds/image/random')
          .then(response => { // () 안에 있는게 통째로 callback 함수이므로
            // 먼저 response를 consle로 찍어서 URL이 어디에 있는지 확인하자!
            const imgUrl = response.data.message
            // img tag 만들기
            const imgTag = document.createElement('img')
            // imgTag 의 src에 imgUrl 넣기
            imgTag.src = imgUrl
            // .animals 라는 div 의 자식요소로 imgTag 를 붙이자.
            document.querySelector('.animals').append(imgTag)
          })
          .catch(error => console.log(error))
      }
      const dogButton = document.querySelector('#dog-button')
      const dogCnt = document.querySelector('#dogCount')
      let dogCount = 0
      // dogButton.addEventListener('click', getDogImage)
      dogButton.addEventListener('click', function() {
        getDogImage()
        dogCount += 1
        dogCnt.innerText = dogCount
      })
    
      const getCatImage = function () {
        axios.get('https://api.thecatapi.com/v1/images/search')
          .then(response => {
            const imgUrl = response.data[0].url
            const imgTag = document.createElement('img')
            imgTag.src = imgUrl
            document.querySelector('.animals').append(imgTag)
          })
          .catch(error => console.log(error))
      }
      const catButton = document.querySelector('#cat-button')
      const catCnt = document.querySelector('#catCount')
      let catCount = 0
      catButton.addEventListener('click', function() {
        getCatImage()
        catCount += 1
        catCnt.innerText = catCount
      })
    </script>
  </body>
  </html>
  ```

  <img src="https://user-images.githubusercontent.com/52685250/67931197-bcda4280-fc04-11e9-972f-1d46df203cb5.JPG" width="750px">

