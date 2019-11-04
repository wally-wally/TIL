# [SSAFY] Javascript_#1(written by wally-wally)

----

**※참고사항※**

- `[SSAFY]Javascript_#1`은 정규과정 `Javascript`을 진행하면서 강의파일에 없는 추가적인 내용이나 중요하게 다루었던 내용을 상세하게 작성했음.
- 최대한 수업 시간의 모든 내용을 담으려했으나 없는 내용이 있을 수도 있음.
- Javascript Style Guide 참고 문서 : <a href="https://ui.toast.com/fe-guide/ko_CODING-CONVENSION/" target="_blank">(TOAST UI)</a> <a href="https://github.com/airbnb/javascript" target="_blank">(Airbnb github)</a>

------

<br>

## 1. 10월29일(1일차)

### 1.1 Introduction of Javascript

#### (1) Summery

- Javascript는 브라우저를 동적으로 사용하기 위해 고안된 언어다.
- Java와 Javascript는 서로 완전히 다른 언어다. 즉, 둘은 전혀 관련/유사성이 없다.
- 현재 Javascript는 ES5(2009)에서 ES6+(2015~)로 넘어가는 중이다.
- 브라우저 콘솔에서 바로 사용할 수 있는 JS를 Vanilla JS라고 부른다.
- Vanilla JS는 프로그래밍을 통해 BOM 조작, DOM 조작을 할 수 있다.
- 브라우저라는 제한된 환경을 넘어 브라우저 밖(컴퓨터)에서 JS를 구동할 수 있는 새로운 실행 환경인 `Node.js`가 등장한다. (Node.js 환경에서는 당연히 DOM, BOM 조작 불가능)

<br>

#### (2) Vanilla JS vs Node.js

- Vanilla JS
  - 브라우저 콘솔 환경에서 사용하는 가장 순정의 JS를 의미
  - 어떠한 라이브러리/프레임워크에도 의존하지 않는 Original Browser JS라고 할 수 있다.
  - BOM(Browser Object Model) 조작, DOM(Document Object Model) 조작, 프로그래밍 가능
- Node.js
  - 브라우저 밖에서 JS를 구동할 수 있는 새로운 JS 실행환경(runtime environment)인 `Node.js`가 등장
  - V8 엔진을 기반으로 제작되었으며, Node.js의 등장을 통해 JS 만으로 클라이언트-서버 를 모두 제작할 수 있게 되었다.

<br>

### 1.2 `let`, `const`, `var` - `00_variable.js`

---

:heavy_check_mark: <b>javascript 이용을 위한 기본 세팅</b>

- `Editor: Tab size` : 4에서 2로 수정

![01](https://user-images.githubusercontent.com/52685250/67741056-3f270300-fa5b-11e9-8b58-0db0dba29d79.JPG)

> `settings.json`
>
> ```json
>     "[python]": { // 이 부분 추가
>         "editor.tabSize": 4,
>         "editor.insertSpaces": true
>     },
>     
>     // "[html]": { // 기존 html, css, django-html 부분 삭제
>     //     "editor.tabSize": 2
>     // },
>     // "[css]": {
>     //     "editor.tabSize": 2
>     // },
>     // "[django-html]": {
>     //     "editor.tabSize": 2
>     // },
> ```

---

<br>

#### (1) `let` (변수)

- 값을 재할당 하 수 있는 변수를 선언
- 단, 각 변수는 <b>한 번만 선언</b>할 수 있다.(할당은 여러 번 가능)
- <b>블록 유효 범위(block scope)</b>를 가진다.
  - if문, for문, 함수와 같이 중괄호 내부가 블록 유효 범위에 해당

```javascript
let x = 1

if (x === 1) {
  let x = 2 // 이건 가능
  // let x = 3 // 이건 불가능
  console.log(x) // 2가 출력
}

console.log(x) // 1이 출력
```

<br>

#### (2) `const` (상수)

- 값이 변하지 않는 상수를 선언하는 키워드
- 담긴 값이 불변임을 뜻하는 게 아니다.
- 단지 상수의 값은 <b>재할당 할 수 없고 재선언도 안 된다.</b>
- <b>블록 유효 범위(block scope)</b>를 가진다.
- `const`는 선언시에 초기값을 생략하면 오류가 발생한다.

```javascript
const MY_FAV = 7

console.log('my favorite number is: ' + MY_FAV)

// 상수 재할당하려는 시도는 오류 발생
// MY_FAV = 20 - 위에 이미 할당되어 있으므로 재할당 불가능

// 상수를 재선언하려는 시도는 모두 오류 발생
// const MY_FAV = 20 - 재선언도 안 되기 때문에 has already been declared 오류 발생
// let MY_FAV = 20 - MY_FAV 자체를 const로 먹고 있기 때문에 오류 발생
// var MY_FAV = 20 - 이것도 불가능

if (MY_FAV === 7 ) {
  // 블록 유효 범위로 지정된 MY_FAV 이라는 변수를 만드므로 괜찮다.
  // 즉, 전역이 아닌 범위 안이므로 이름 공간에서 충돌이 나지 않는다.
  // 여기서 CONST 는 새로운 블록 유효 범위 이므로 const MY_FAV = 20으로 해도 같이 출력된다.
  let MY_FAV = 20

  console.log('my favorite number is :' + MY_FAV)
}
console.log(MY_FAV)
```

<br>

#### (3) `var` (변수)

- ES6 이전의 feature로 예기치 않은 문제를 많이 발생시키는 키워드로 절대 사용하지 않는다
- 함수 유효 범위(function scope)
- var로 선언된 변수의 범위는 현재 실행 문맥인데, 그 문맥이 함수 혹은 함수 외부의 전역으로도 갈 수 있다.
- 할당 및 선언이 자유임

```javascript
function varTest() {
  var x = 1
  if (true) {
    var x = 2
    console.log(x) // 2가 출력
  }
  console.log(x) // 2가 출력
}

varTest()

// let
function letTest() {
  let x = 1
  if (true) {
    let x = 2
    console.log(x) // 2가 출력(상위 블록(if문)과 같은 변수)
  }
  console.log(x) // 1이 출력(상위 블록과 다른 변수)
}

letTest()

// let 과 var 함께 쓰기
var a = 1
let b = 2
if (a === 1) {
  var a = 11
  let b = 22
  
  console.log(a) // 11이 출력 
  console.log(b) // 22가 출력 - 외부 b와 내부 b가 다르다.
}
console.log(a) // 11이 출력 
console.log(b) // 2가 출력
```

---

:heavy_check_mark: <b>언제 변수? 상수?를 써야하나???</b>

- 우선! `var` 는 쓰지 말자!
- 어디에 `let`, `const`를 쓸지 결정하는 건 프로그래머의 몫
  - `PI`, `DAYS_IN_JUNE`과 같은 경우는 `상수`가 적절
  - 날씨 온도와 같은 `WEATHER_TEMP` 즉, 각자가 생각하는 좋아하는 기온이 다를 수 있는 모호한 경우 이런 경우는 `변수`가 적절
- <b>일단 모든 선언에서 가능한 한 상수(`const`)를 사용해야 한다.</b>
- 먼저 상수를 생각하고 값이 바뀌는 것이 더 자연스러운 상황이라면 그때 변수로 바꿔서 사용하는 것을 권장.
  - `const`로 먼저 초기 선언하고 필요한 경우에 따라 `let`으로 바꿔서 사용하자.
  - 무조건 `const`가 대문자일 필요는 없다.

<br>

:heavy_check_mark: <b>변수, 상수 정리</b>

|       | 할당    | 선언    | 스코프      |
| ----- | ------- | ------- | ----------- |
| var   | 자유    | 자유    | 함수 스코프 |
| let   | 자유    | 한 번만 | 블록 스코프 |
| const | 한 번만 | 한 번만 | 블록 소크포 |

---

<br>

### 1.3 식별자(identifier) - `00_variable.js`

- 변수명은 식별자라고 불리며 특정 규칙을 따른다.

  - 반드시 문자, 달러($), 또는 밑줄로 시작해야 한다. 이후는 숫자도 가능.
  - 대소문자 구분하며 클래스명을 제외하고는 대문자로 시작하지 않는 것이 좋다.
  - 예약어는 사용 불가능(class, super, const, case, function, ...)

- 식별자 작성 스타일

  ```javascript
  // 1. 카멜 케이스(camelCase) - 객체, 변수, 함수 (=== lower-camel-case)
  let dog
  let variableName
  
  // 배열인 경우 보통 복수형으로 쓴다.
  const dogs = []
  
  // 정규표현식의 경우 보통 소문자 r로 시작
  const rDecs = /.*/
  
  // 함수
  function getPropertyName() {
    return 1
  }
  
  // boolean 을 반환하는 변수나 함수 - 'is'로 시작
  let isAvailable = false
  
  // 2. 파스칼 케이스(PascalCase) - 클래스, 생성자 (=== upper-camel-case)
  class User {
    constructor(options) {
      this.name = option.name
    }
  }
  
  // 3. 대문자 스네이크 케이스(SNAKE_CASE) - 상수
  // 이 표현은 변수와 변수의 속성이 변하지 않는다는 것을 프로그래머에게 알려준다.
  const API_KEY = 'avcavanfjnfsaecklnfealk'
  ```

<br>

### 1.4 hoisting 현상 - `01_hoisting.js`

- <b>선언만 끌어올리고 할당은 끌어올리지 않는다.</b>

- 이 개념은 JS 변수, 함수나 표현이 최상단으로 올려지는 것을 말한다.
- 끌어 올려진 변수는 `undefined` 값을 반환한다.
- 변수와 함수를 위한 메모리 공간을 확보하는 과정이다.

```javascript
console.log(a)
var a = 10 // 할당을 제외한 선언만 맨 위로 끌어 올린다.
console.log(a)
```

```
undefined // 선언만 위에서 했다고 JS가 이해했으므로 undefined가 출력된다.
10
```

```javascript
// JS가 이해한 코드
var a // 선언과 초기화가 동시에 이루어졌다.
console.log(a) // undefined
a = 10
console.log(a)
```

---

```javascript
// let은 안 된다.
console.log(b)  // 선언 + TDZ로 이동(초기화는 안 된 상태임 => ReferenceError 발생)
let b = 10
console.log(b)
```

```
ReferenceError: Cannot access 'b' before initialization
    at Object.<anonymous> (C:\Users\student\Desktop\TIL\06_js\00_js_intro\01_hoisting.js:11:13)
```

```javascript
// 마찬가지로 아래와 같은 과정을 거친다.
let = b // 선언 + TDZ로 이동(초기화는 안 된 상태임)
console.log(b) // 할당 불가 (초기화가 아직 안 됨, ReferenceError 발생)
b = 10 // 할당
console.log(b)
```

:heavy_check_mark: <b>`var`, `let` 할당 과정</b>

- `var` : `선언 + 초기화` => `할당`
- `let` : `선언` => `TDZ(Temporal Dead Zone, 임시적 사각지대)` => `초기화`  => `할당`

```javascript
// hoisting 예제
if (x != 1) {
  console.log(y) // undefined
  var y = 3 // 블록을 무시하고 var은 전역 변수가 된다.
  if (y === 3) {
    var x = 1
  }
  console.log(y) // 3
}

if (x === 1) {
  console.log(y) // 3
}
```

```javascript
// JS가 이해한 코드
var x
var y

if (x != 1) { // undefined != 1 이므로 if문이 실행된다.
  console.log(y) // undefined
  var y = 3
  if (y === 3) {
    var x = 1
  }
  console.log(y) // 3
}

if (x === 1) {
  console.log(y) // 3
}
```

- `let`, `const`의 정의가 <font color="blue"><b>평가되기까지 초기화가 되지 않는다</b></font>는 의미이지, <font color="red"><b>hoisting이 되지 않아 정의가 되지 않는다는 의미와는 다르다.</b></font>
- 하지만 이미 `var`로 작성된 javascript 코드가 많다.(`let`, `const`는 ES6+버전에 나왔다.)
- [참고]이를 해결하기 위해 `Babel` 로 ES6+ 문법을 그보다 아래 버전의 JS로 변경해서 사용하기도 한다.

<br>

### 1.5 타입(type)

#### (1) Primitive

- <b>불변하다</b>는 특징을 띄고 있다.

- Numbers

  - `Infinity` : 양의 무한대와 음의 무한대로 나뉨
  - `NaN` : Not a Number의 약자로 표현할 수 없는 값, 자기 자신과 일치하지 않는 유일한 값을 표현
    - 0/0, "문자"*10, Math.sqrt(-9)와 같이 표현할 수 없는 값

  ```javascript
  const a = 13
  const b = -3
  const c = 3.14 // float
  const d = 2.998e8 // 2.998 * 10^8 = 299,800,000
  const e = Infinity
  const f = -Infinity
  const g = NaN
  ```

- Strings

  ```javascript
  const sentence1 = 'sentence'
  const sentence2 = "sentence"
  const sentence3 = `sentence`
  
  // backtick(`)
  // 줄 바꿈 가능, python의 f-string과 같은 기능(Template Literal) 사용 가능
  // const word = "안녕
  // 하세요"
  // console.log(word)
  
  const word1 = "안녕 \n하세요"
  console.log(word1)
  
  const word2 = `안녕
  하세요`
  console.log(word2)
  
  // Template Literal
  // JS 에서 문자열을 입력하는 방식
  const age = 20
  const message = `홍길동은 ${age}
  세입니다.`
  console.log(message)
  
  // 문자열은 + 연산만 가능하다
  const happy = 'hello'
  const hacking = 'world' + 'lol' + '!!!'
  console.log(happy, hacking)
  ```

  ---

  :heavy_check_mark: <b>Literal</b>

  - 값을 프로그램 안에서 직접 지정한다는 의미
  - 값을 만드는 방법
  - JS는 우리가 제공한 리터럴 값을 받아 데이터를 만듦

  ```javascript
  // room 변수를 가리키는 식별자 / 'conference_room'(따옴표 안) 은 리터럴
  let room = 'conference_room'
  
  let hotelRoom = room
  
  // 아래 코드는 에러 발생, conference_room 식별자는 존재하지 않는다.
  hotelRoom = conference_room
  ```

  - JS는 따옴표를 통해 리터럴과 식별자를 구분한다.
  - 식별자는 숫자로 시작할 수 없으므로 숫자에는 따옴표가 필요없다. (숫자형 리터럴)

  ---

- Boolean

  - javascript의 boolean은 `true`, `false` (모두 소문자)가 있다.

- Empty Value - `null` / `undefined` (<b>둘의 차이를 구분하자!</b>)

  - 동일한 역할을 하는 이 2개의 키워드가 존재하는 이유는 단순한 JS의 설계 실수

  - 큰 차이를 두지 말고 interchangeable 하게 사용할 수 있도록 권장.

  - `undefined`

    - 값이 업을 경우 JS가 자동으로 할당해주는 값

      ```javascript
      let first_name // 선언만 하고 할당하지 않음.
      console.log(first_name) // undefined 출력
      ```

  - `null`

    - 값이 없음을 우리가 표현하기 위해서 인위적으로 사용하는 값

      ```javascript
      let last_name = null
      console.log(last_name) // null 출력 - 의도적으로 값이 없음을 표현
      ```

  - chrome console창에서 확인

    ![321](https://user-images.githubusercontent.com/52685250/67748969-70a9c980-fa6f-11e9-9b69-c2e1fae4b884.JPG)

    [참고] `Number.isNaN()` <a href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN" target="_blank">(Number.isNaN() 함수 공식 문서)</a>
    
    ```javascript
    // Number.isNaN() 함수는 값이 NaN 인지 여부를 판별.
    // 주어진 값이 유형이 Number 이고 값이 NaN 이면 true
    // 아니면 false
    Number.isNaN(null) // false
    Number.isNaN(undefined) // false
    Number.isNaN(1 + null) // false (숫자임)
    Number.isNaN(1 + undefined) // true (숫자가 아님)
    Number.isNaN('abc') // false
    isNaN('abc') // true
    ```

#### (2) Reference

<br>

---

<br>

## 2. 10월30일(2일차)

### 2.1 연산자

#### (1) 할당 연산자

| 연산자 | 의미                                 |
| ------ | ------------------------------------ |
| a++    | a를 평가한 다음에 a에 1을 더한다.    |
| ++a    | a에 1을 더한 다음에 a 값을 평가한다. |
| a--    | a를 평가한 다음에 a에서 1을 뺀다.    |
| --a    | a에 1을 뺀 다음에 a 값을 평가한다.   |

- 증가 연산자 또는 감소 연산자를 연속으로 사용하면 참조 오류가 발생한다.
  - `(a++)++` -> `ReferenceError`

<img src="https://user-images.githubusercontent.com/52685250/67818905-5a931c00-faf6-11e9-80fc-318468adf21f.JPG" width="200px">

<br>

#### (2) 비교 연산자

<img src="https://user-images.githubusercontent.com/52685250/67818906-5b2bb280-faf6-11e9-85ac-e0091d30cb39.JPG" width="200px">

<br>

#### (3) 동등 연산자

<img src="https://user-images.githubusercontent.com/52685250/67818907-5b2bb280-faf6-11e9-9ad5-4ea527f3dc55.JPG" width="500px">

<br>

#### (4) 일치 연산자

- `==` : 동등 연산자로 단순히 값만 같음
- `===` : 일치 연산자로 값과 타입까지 같음(동등 연산자보다 두 값을 엄격하게 비교함)
  - 예외) `NaN === NaN`의 결과는 `false`이다.

<img src="https://user-images.githubusercontent.com/52685250/67818908-5b2bb280-faf6-11e9-9fb7-0d48aaa81cdf.JPG" width="500px">

<br>

#### (5) 논리 연산자

- `&&` : 논리곱, `||` : 논리합, `!` : 부정

<img src="https://user-images.githubusercontent.com/52685250/67818909-5b2bb280-faf6-11e9-8b72-aa048445e576.JPG" width="350px">

<br>

#### (6) 삼항 연산자

- if문을 한 줄로 작성할 수 있으며 `?` 앞의 식이 참일 경우 `:` 왼쪽에 있는 값이 출력되고 거짓일 경우 `:` 오른쪽에 있는 값이 출력된다.

<img src="https://user-images.githubusercontent.com/52685250/67818910-5bc44900-faf6-11e9-8f5d-46f1a2282579.JPG" width="450px">

<br>

### 2.2 조건문 & 반복문

#### (1) if문 <a href="https://user-images.githubusercontent.com/52685250/67819540-e1e18f00-faf8-11e9-9842-cedf4381525f.JPG" target="_blank">(chrome console로 자세히 확인하기)</a>

```javascript
const userName = 'ssafy'

if (userName === '1q2w3e4r') {
  message = '<h1>This is admin page</h1>'
} else if (userName === 'ssafy') {
  message = '<h1>You r from ssafy</h1>'
} else {
  message = `<h1>hello ${userName}</h1>`
}
```

<br>

#### (2) switch문 <a href="https://user-images.githubusercontent.com/52685250/67819541-e1e18f00-faf8-11e9-8033-a28a7bc80ef8.JPG" target="_blank">(chrome console로 자세히 확인하기)</a>

```javascript
switch (userName) {
  case '1q2w3e4r': {
    message = '<h1>this is admin</h1>'
    break // 특정 케이스를 만족하면 break로 switch문을 탈출한다.
  }
  case 'ssafy': {
    message = '<h1>you r from ssafy</h1>'
    break
  }
  default: {
    message = `<h1>hello ${userName}</h1>`
    console.log(message)
  }
}
```

<br>

#### (3) while문

```javascript
let i = 0

while (i < 6) {
  console.log(i)
  i++
} // 0부터 5까지 한줄에 하나씩 출력됨
```

<br>

#### (4) for문

```javascript
// for - 1
for (let j = 0; j < 6; j++) {
  console.log(j)
} // while문과 같은 구문

// for - 2
const numbers = [0, 1, 2, 3, 4, 5]

for (let number of numbers) {
  console.log(number)
} // 0부터 5까지 한 줄에 하나씩 출력

// for (let number of [0, 1, 2, 3, 4, 5]) { 이렇게도 가능
//   console.log(number)
// }
// 상황에 따라 재할당 안하게 하기 위해 let 대신에 const도 가능
// for (const number of [0, 1, 2, 3, 4, 5]) {
//   console.log(number)
// }
```

<br>

### 2.3 함수

#### (1) 선언식(statement, declaration)

- 함수 선언식은 코드가 실행되기 전에 로드된다.

  ```javascript
  function add(num1, num2) {
    return num1 + num2
  }
  
  console.log(add(2, 7)) // 9가 출력됨
  ```

<br>

#### (2) 표현식(Expression)

- 함수 표현식은 인터프리터(javascript)가 해당 코드에 도달 했을 때 로드된다.(미리 로드X)

  ```javascript
  const sub = function(num1, num2) { // 이와 같이 이름이 없는 함수를 익명함수라고 함
    return num1 - num2
  }
  
  console.log(sub(7, 2)) // 5가 출력됨
  
  // [참고]함수도 하나의 값이다.
  console.log(typeof add) // function이라고 출력됨
  console.log(typeof sub) // function이라고 출력됨
  ```

<br>

#### (3) 화살표 함수(Arrow Function)

- 화살표 함수의 경우 일반 function 키워드로 정의한 함수와 100% 동일한 것이 아니다.

- 화살표 함수는 항상 익명함수이다.

- 변수에 할당할 수 있지만 이름 붙은 함수(생성자)로는 만들 수 없다.

  ```javascript
  const ssafy1 = function(name) {
    return `hello ${name}`
  }
  
  // 리팩토링(refactoring) : 화살표 함수로 줄여나가는 과정
  // (1) function 키워드 삭제(모든 경우 가능)
  const ssafy1 = (name) => { return `hello ${name}` }
  
  // (2) 매개변수의 `()` 소괄호 생략(단, 함수 매개변수가 하나일 경우에만 생략 가능)
  const ssafy1 = name => { return `hello ${name}` }
  
  // (3) {}와 return 생략(단, 함수의 바디에 표현식(return식)이 1개일 경우만 가능)
  const ssafy1 = name => `hello ${name}` // 이 식을 보고 위에 있는 함수 표현식으로 바꿀 수 있어야 함
  ```

- Arrow Function refactoring practice

  ```javascript
  let square = function(num) {
    return num ** 2
  }
  
  let square = (num) => { return num ** 2}
  let square = num => { return num ** 2 }
  let square = num => num ** 2
  ```

- 특수한 경우

  ```javascript
  // 매개변수가 없다면?? - ()나 _를 사용
  let noArgs = () => 'No args'
  let noArgs = _ => 'No args'
  ```

  ```javascript
  // object를 return 한다면?
  let returnObject = () => { return {key: 'value'} } // return을 명시적으로 적어준다.
  console.log(returnObject()) // { key: 'value' }로 출력됨
  
  // object를 return 하는데 return을 사용하지 않을 경우
  // 가장 밖에 있는 중괄호를 소괄호로 변경하여 사용
  let returnObject = () => ({key: 'value'}) // { key: 'value' }로 출력됨
  ```

- object를 return 시 문제 상황

  ```javascript
  // return 이 없는데 () 를 안 쓴 경우
  let returnObject = () => {key: 'value'}
  const test = returnObject()
  console.log(typeof test) // undefined가 출력됨
  ```

- 기본 매개변수

  기본 매개변수를 줄 때는 매개변수의 개수와 상관없이 무조건 ()를 써야한다.

  ```javascript
  const sayHello = (name='noName') => `hi ${name}`
  ```

- Anonymous Function(익명함수 / 1회용함수)

  - 기명함수로 만들기 (변수/상수에 할당하기) - 생성과 동시에 함수의 인수로 할당

    ```javascript
    const cube = function (num) { return num ** 3 } // 변수 할당
    const squareRoot = num => num ** 0.5
    
    console.log(cube(2)) // 8이 출력
    console.log(squareRoot(4)) // 2가 출력
    ```

  - 익명함수 즉시 실행 - 함수의 표현식을 소괄호로 한 번 더 묶어 준다.(파이썬의 람다식도 동일)

    ```javascript
    console.log((function (num) { return num ** 3 })(2)) // 8이 출력
    console.log((num => num ** 0.5)(4)) // 2가 출력
    ```

<br>

#### (4) 함수 호이스팅

```javascript
ssafy()

function ssafy() {
  console.log('hoisting!') // 올바르게 출력됨
}
```

- 다만 변수에 할당한 함수(표현식을 쓴 함수)는 호이스팅 되지 않는다.(변수의 유효 범위 규칙을 따르기 때문이다.)

  - `let` 

    ```javascript
    ssafy2()
    
    let ssafy2 = function () {
      console.log('hoisting!') // ReferenceError 발생
    }
    
    // let (JS가 이해한 코드)
    let ssafy2 // 1) 변수 선언
    
    ssafy2() // 2) 함수 호출 -> ssafy2는 초기화도 안됐는데 함수를 호출한다고?? -> 바로 ReferenceError!
    
    ssafy2 = function () {
      console.log('hoisting!')
    } // 3) 변수에 할당단계 (하지만, 함수 호출과정에서 이미 오류 발생함...)
    
    ```

  - `var`

    ```javascript
    ssafy3()
    
    var ssafy3 = function () {
      console.log('hoisting!') // TypeError 발생
    }
    
    // var (JS가 이해한 코드)
    var ssafy3 // 1) 변수 선언(단, var이므로 초기화과정도 진행)
    
    ssafy3() // 2) 변수 호출 -> ssafy3은 변수인데 호출을 한다고?? -> 바로 TypeError!
    
    ssafy3 = function() {
      console.log('hoisting!')
    }
    ```

<br>

### 2.4 Datastructure : Object와 Array

#### (1) Array - Bulit-in Method

```javascript
const numbers = [1, 2, 3, 4]

console.log(numbers[0]) // 1이 출력
console.log(numbers[-1]) // undefined가 출력(정확한 양의 정수 index만 가능)
console.log(numbers.length) // 4가 출력
```

```javascript
// reverse()는 원본 파괴됨
console.log(numbers.reverse()) // 배열 뒤집기
console.log(numbers)
console.log(numbers.reverse()) // 한 번더 반복하면 원상복구됨
```

```javascript
// push : 배열의 길이를 return
console.log(numbers.push('a'))
console.log(numbers)

// pop : 배열의 가장 마지막 요소 제거 후 return
console.log(numbers.pop())
console.log(numbers)

// unshift : 배열의 가장 앞에 요소를 추가하고 배열의 길이를 return
console.log(numbers.unshift('a'))
console.log(numbers)

// shift : 배열의 가장 앞에 요소를 제거 후 return
console.log(numbers.shift())
console.log(numbers)
```

```javascript
// includes : 배열에 요소가 있으면 true, 없으면 false를 return(boolean return)
console.log(numbers.includes(1))
console.log(numbers.includes(0))
```

```javascript
// indexOf : 중복이 존재한다면 처음 찾은 요소의 index를 return
console.log(numbers.push('a', 'a')) // 현재 배열 상태 : [1, 2, 3, 4, 'a', 'a']
console.log(numbers)
console.log(numbers.indexOf('a')) // 4가 출력
console.log(numbers.indexOf('b')) // 찾고자하는 요소가 없으면 -1을 return
```

```javascript
// join : 배열의 요소를 join 함수의 인자를 기준으로 이어서 문자열로 return
console.log(numbers.join()) // '1,2,3,4,a,a'로 출력 (아무것도 넣지 않으면 , 를 기준으로 가져옴)
console.log(numbers.join('')) // '1234aa'로 출력
console.log(numbers.join('-')) // '1-2-3-4-a-a'로 출력
console.log(numbers) // join은 원본을 변화시키지 않는다.
```

<br>

#### (2) Object

```javascript
const me = {
  name: 'ssafy', // key가 한 단어일 때는 그냥 변수인 것 처럼 쓸 수 있음
  'phone number': '01012345678', // key가 여러 단어 일 때 ''를 사용하여 씀
  appleProducts: {
    ipad: '2018pro',
    iphone: '7',
    macbook: '2019pro',
  }
}

// Object 접근하기
console.log(me.name) // 'ssafy' 출력
console.log(me['name']) // 위와 같은 출력
console.log(me['phone number']) // key가 여러 단어일 때는 반드시 []를 사용하여 접근

console.log(me.appleProducts) // { ipad: '2018pro', iphone: '7', macbook: '2019pro' }
console.log(me.appleProducts.ipad) // 2018pro
```

- Object Literal(객체 표현법)

  ```javascript
  var books = ['Learning JS', 'Eloquent JS']
  
  var comics = {
    'DC': ['Joker', 'Aquaman'],
    'Marvel': ['Captain Marvel', 'Avengers'],
  }
  
  var magazines = null
  ```

  ES5일 때

  ```javascript
  var bookShop = {
    books: books,
    comics: comics,
    magazines: magazines,
  }
  
  console.log(bookShop)
  console.log(typeof bookShop) // object로 출력
  console.log(bookShop.books[0]) // 'Learning JS'로 출력
  ```

  ES6+ 이후부터

  ```javascript
  // object의 key와 value 가 같다면, 마치 배열처럼 한 번만 작성 가능
  let bookShop2 = {
    books,
    comics,
    magazines,
  }
  
  console.log(bookShop2) // bookShop object 생성될 때와 같은 출력
  ```

<br>

#### (3) JSON(JS Object Notation)

- KEY-VALUE 형태의 자료구조를 JS 객체와 유사한 모습으로 표현하는 표기법
- 모습만 비슷할 뿐이고 <b>실제로 Object 처럼 사용</b>하려면 다른 언어들 처럼 JS에서도 <b>Parsing(구문 분석)작업이 필요하다.</b>
- JSON에서는 {} 안의 끝에 트레일링 콤마(,)를 쓸 수 없다.

```javascript
const jsonData = JSON.stringify({ // stringify : JSON -> String
  coffee: 'Americano',
  iceCream: 'Mint Choco',
})

console.log(jsonData) // '{"coffee":"Americano","iceCream":"Mint Choco"}'
console.log(typeof jsonData) // string

const parseData = JSON.parse(jsonData)
console.log(parseData) // { coffee: 'Americano', iceCream: 'Mint Choco' }
console.log(typeof parseData) // object
```

---

:heavy_check_mark: <b>Object vs JSON</b>

- `Object` : JS의 key-value 페어의 자료 구조
- `JSON` : 데이터를 표현하기 위한 <b>단순한 문자열</b>이므로 실제 Object 처럼 사용하려면 반드시 Parsing 작업을 행한다.

---

<br>

#### (4) Array Helper Method

---

:heavy_check_mark: <b>Helper</b>

- 자주 사용하는 로직을 재활용할 수 있게 만든 일종의 Library
- 이것도 전부 다 내장되어 있다.
- for문과 관련하여 `forEach` 같은 것이 있다.

---

##### ① `.forEach(callback())`

- 주어진 callback을 배열에 있는 각 요소에 대해 오름차순으로 한 번씩 실행

- callback 함수 : 인자로 다른 함수에 전달된 함수

  ```javascript
  // forEach가 나오기 전인 ES5
  var colors = ['red', 'blue', 'green']
  
  for (var i = 0; i < colors.length; i++) {
    console.log(colors[i])
  }
  
  // ES6에서 forEach 추가됨
  const COLORS = ['red', 'blue', 'green']
  
  COLORS.forEach(function (color) {
    console.log(color)
  })
  
  // 화살표 함수로 표현
  COLORS.forEach(color => console.log(color))
  
  // [주의] forEach는 아무것도 return 하지 않는다.(undefined)
  const result = COLORS.forEach(color => console.log(color))
  console.log(result) // undefined로 출력!
  ```

- `forEach` 연습(1)

  ```javascript
  function handlePosts() {
    const posts = [
      { id: 23, title: 'News'},
      { id: 52, title: 'Code City'},
      { id: 102, title: 'Python'},
    ]
  
    // for (let i = 0; i < posts.length; i++) {
    //   console.log(posts[i])
    //   console.log(posts[i].id)
    //   console.log(posts[i].title)
    // }
  
    // 위에 작성한 기본 for문과 동일하게 출력됨
    posts.forEach(function (post) {
      console.log(post)
      console.log(post.id)
      console.log(post.title)
    })
  }
  handlePosts()
  ```

- `forEach` 연습(2)

  images 배열 안에 있는 정보를 곱해서 넓이를 구하여 areas 라는 배열에 저장하시오.

  ```javascript
  const images = [
    { height: 10, width: 30},
    { height: 20, width: 90},
    { height: 54, width: 32},
  ]
  
  const areas = [] // 배열 생성시 new Array보다 []로 쓰자
  images.forEach(function (image) {
    areas.push(image.height * image.width)
  })
  console.log(areas) // [ 300, 1800, 1728 ] 출력
  ```

<br>

##### ② `.map(callback())`

- 배열 내의 모든 요소에 대하여 각각 주어진 함수(callback)를 호출한 결과를 모아 새로운 배열을 return

- 일정한 형식의 배열을 다른 형식으로 바꿔야 할 때 사용한다.

- map은 사본으로 return하고 원본은 유지한다.

  ```javascript
  // for
  var numbers = [1, 2, 3,]
  var doubleNumbers = []
  
  for (var i = 0; i < numbers.length; i++) {
    doubleNumbers.push(numbers[i] * 2)
  }
  console.log(doubleNumbers) // [ 2, 4, 6 ]
  console.log(numbers) // 원본 유지 ([ 1, 2, 3 ])
  
  // map
  const NUMBERS = [1, 2, 3]
  
  // const DOUBLE_NUMBERS = NUMBERS.map(function(number) {
  //   return number * 2 // 만약 return 안 쓰면 [ undefined, undefined, undefined ]
  // })
  
  // refactoring 적용
  const DOUBLE_NUMBERS = NUMBERS.map( number => number * 2)
  
  console.log(DOUBLE_NUMBERS) // [ 2, 4, 6 ]
  console.log(NUMBERS) // [ 1, 2, 3 ] - 원본 유지
  ```

- `map` 연습(1)

  ```javascript
  const newNumbers = [4, 9, 16,]
  
  const roots = newNumbers.map(Math.sqrt)
  
  console.log(roots)
  console.log(newNumbers) // 원본 유지
  ```

- `map` 연습(2)

  ```javascript
  // Q. map을 사용해 images 배열 안의 Object 들의 height 들만 저장되어 있는 heights 배열 만들기
  const images = [
    { height: '34px', width: '30px'},
    { height: '12px', width: '11px'},
    { height: '292px', width: '56px'},
  ]
  
  const heights = images.map( function (image) {
    return image.height
  })
  
  // refactoring 적용
  // const heights = images.map(image => image.height)
  // console.log(heights)
  ```

- `map` 연습(3)

  ```javascript
  // Q. map 을 사용해 trips 배열의 값들을 계산해서 속도 값을 저장하는 배열 speeds 만들기
  const trips = [
    {distance: 35, time: 10},
    {distance: 90, time: 10},
    {distance: 60, time: 25},
  ]
  
  const speeds = trips.map( function (trip) {
    return trip.distance / trip.time
  })
  console.log(speeds)
  
  // refactoring 적용
  // const speeds = trips.map(trip => trip.distance / trip.time)
  // console.log(speeds)
  ```

- `map` 연습(4)

  ```javascript
  const brands = ['Marvel', 'DC',]
  const movies = ['IronMan', 'Batman',]
  
  const comics = brands.map(function(x, i) {
    return { name: x, hero: movies[i] }
  })
  
  console.log(comics) // 아래와 같이 출력
  // [
  //   { name: 'Marvel', hero: 'Ironman'},
  //   { name: 'DC', hero: 'Batman'},
  // ]
  
  // refactoring 적용
  // const comics = brands.map( (x, i) => ({name: x, hero: movies[i]}))
  // console.log(comics)
  ```

<br>

##### ③ `.filter(callback())`

- 주어진 함수의 테스트를 통과한 모든 요소를 모아 새로운 배열을 반환한다.

- 즉, 주어진 콜백 함수로 원하는 요소만 filtering 할 수 있다.

- map과 마찬가지로 원본은 유지

  ```javascript
  // for
  var products = [
    { name: 'cucumber', type: 'vegetable' },
    { name: 'banana', type: 'fruit' },
    { name: 'carrot', type: 'vegetable' },
    { name: 'apple', type: 'fruit' },
  ]
  
  var fruitProducts = []
  for (var i = 0; i < products.length; i++) {
    if (products[i].type === 'fruit') {
      fruitProducts.push(products[i])
    }
  }
  
  console.log(fruitProducts)
  ```

  ```javascript
  // filter
  const PRODUCTS = [
    { name: 'cucumber', type: 'vegetable' },
    { name: 'banana', type: 'fruit' },
    { name: 'carrot', type: 'vegetable' },
    { name: 'apple', type: 'fruit' },
  ]
  
  const FRUIT_PRODUCTS = PRODUCTS.filter( function(product) {
    return product.type === 'fruit'
    // 해당 조건이 true 를 만족할 경우에 return
  })
  
  // refactoring 적용
  const FRUIT_PRODUCTS = PRODUCTS.filter(product => product.type === 'fruit')
  console.log(FRUIT_PRODUCTS)
  ```

- `filter` 연습(1)

  ```javascript
  // users 배열에서 admin 레벨이 true 인 user object 들만 filteredUsers 에 저장하고 
  // 배열의 두번째 유저의 이름을 출력
  const users = [
    { id: 1, admin: false, name: 'justin'},  
    { id: 2, admin: false, name: 'harry' },
    { id: 3, admin: true, name: 'tak' },
    { id: 4, admin: false, name: 'jason' },
    { id: 5, admin: true, name: 'juan' },
  ]
  
  const filteredUsers = users.filter(function (user) {
    return user.admin === true
  })
  console.log(filteredUsers)
  console.log(filteredUsers[1].name)
  
  // refactoring 적용
  // const filteredUsers = users.filter( user => user.admin === true )
  ```

<br>

##### ④ `.reduce(callback())`

- 배열의 각 요소에 대해 주어진 reduce 함수를 실행하고, 하나의 결과 값을 반환한다.

- reduce는 배열 내의 숫자 총합, 평균 등 배열의 값을 하나로 줄이는 동작을 한다.

- map 은 배열의 각 요소를 변형한다면, reduce는 배열 자체를 변형한다.

  ```javascript
  // 총합
  const ssafyTests = [90, 90, 80, 77,]
  const sum = ssafyTests.reduce(function (total, x) {
    return total += x // return이 있는 쪽에서는 0을 쓸 수 없다.
  }, 0) // 0을 쓰려고 하면 reduce의 세번째 인자로 작성해야 한다.
  
  // refactoring 적용
  // const sum = ssafyTests.reduce( (total, x) => total += x, 0 )
  // const sum = ssafyTests.reduce( (total, x) => total += x )
  
  console.log(sum)
  
  // callback 함수의 첫번째 매개변수는 누적 값(전 단계의 결과) === total
  // 두번째 매개변수는 현재 배열 요소, 현재 인덱스, 배열 자체 순이다. === x
  // 초기값 === 0 ( 첫 total 값 )
  // 만약 초기값이 생략되면 배열의 첫번째 요소가 초기값이 된다. 즉, 위와 같은 상황이면 초기값은 90이 된다.
  ```

- `reduce` 연습

  ```javascript
  // 다음 배열 내의 요소의 총합을 구하시오
  const arr = [0, 1, 2, 3,]
  
  const totalSum = arr.reduce( function (total, x) {
    return total += x
  }, 0)
  // const totalSum = arr.reduce( (total, x) => total += x, 0)
  ```

<br>

##### ⑤ `.find(callback())`

- 주어진 callback 함수를 만족하는 첫 번째 요소의 값을 반환

- 없다면 undefined 를 반환

- 조건에 맞는 인덱스가 아니라 요소 자체를 원할 때 주로 사용

  ```javascript
  // for
  var users = [
    { name: 'Tony Stark', age: 45 },
    { name: 'Steve Rogers', age: 32 },
    { name: 'Thor', age: 40 },
    { name: 'Tony Stark', age: 23 },
  ]
  
  // 원하는 object를 찾아도 users를 끝까지 돌게 된다.
  for (var i = 0; i < users.length; i++) {
    if (users[i].name === 'Tony Stark') {
      user = users[i]
      break // 원하는 조건에 도달하면 더 돌지 않는다.
    }
  }
  console.log(user)
  ```

  ```javascript
  // find
  const USERS = [
    { name: 'Tony Stark', age: 45 },
    { name: 'Steve Rogers', age: 32 },
    { name: 'Thor', age: 40 },
    { name: 'Tony Stark', age: 23 },
  ]
  
  const new_user = USERS.find(function (user) {
    return user.name === 'Tony Stark'
  })
  
  // refactoring 적용
  // const new_user = USERS.find( user => user.name === 'Tony Stark')
  console.log(new_user)
  ```

<br>

##### ⑥ `.some(callback())`

- 배열 안에 어떤 요소라도(===하나라도) 주어진 callback 함수를 통과하는지 테스트하고, 결과에 따라 boolean 을 return 한다.

- 빈 배열은 무조건 false 를 return

- 조건에 맞는 요소를 찾으면 즉시 검색을 멈추고 true 를 return

- 'or' 연산과 유사

  ```javascript
  // some - 하나라도!
  const arr = [1, 2, 3, 4, 5,]
  const result = arr.some(elem => elem % 2 === 0)
  console.log(result) // 짝수가 있으므로 true (이 때, arr에서 원소 2에서 멈춘다.)
  ```

<br>

##### ⑦ `.every(callback())`

- 배열 안에 모든 요소가 주어진 callback 함수를 통과하는지 테스트하고, 결과에 따라 boolean 을 return 한다.

- 빈 배열은 무조건 true 를 return

- 배열의 모든 요소가 조건에 맞아야 true, 그렇지 않다면 false

- 조건에 맞지 않는 요소를 찾으면 검색을 멈추고 false 를 return

- 'and' 연산과 유사

  ```javascript
  // every - 모든!
  const result2 = arr.every(elem => elem % 2 === 0)
  console.log(result2) // 모든 원소가 짝수가 아니므로 false(이 때, arr에서 원소 1에서 멈춘다.)
  ```

---

:heavy_check_mark: <b>`some`, `every` 연습</b>

- ram이 32보다 작으면 everyComputers 를 false로 아니면 someComputers 를 true

  ```javascript
  var everyComputers = true
  var someComputers = false
  
  // for
  var computers = [
    { name: 'macbook', ram: 8},
    { name: 'gram', ram: 16},
    { name: 'series9', ram: 32},
  ]
  
  for (var i = 0; i < computers.length; i++) {
    var computer = computers[i]
    if (computer.ram < 32) {
      everyComputers = false
    } else {
      someComputers = true
    }
  }
  
  console.log(everyComputers) // false
  console.log(someComputers) // true
  ```

  ```javascript
  // some, every
  const COMPUTERS = [
    { name: 'macbook', ram: 8},
    { name: 'gram', ram: 16},
    { name: 'series9', ram: 32},
  ]
  
  // (1)some
  const newsomeComputers = COMPUTERS.some(computer => computer.ram < 32)
  console.log(newsomeComputers) // true
  
  // (2)every
  const neweveryComputers = COMPUTERS.every(computer => computer.ram < 32)
  console.log(neweveryComputers) // false
  ```


<br>

### 2.5 callback 맛보기

- 인수로 다른 함수에 전달된 함수

- 명시적으로 호출하는 방식이 아니라 <b>특정 이벤트가 발생했을 때</b> 시스템에 의해 호출되는 함수
  - 다른 함수의 실행이 끝나고 난 뒤에 실행되는 함수. `이따가 너 실행 끝나면 그때 나 좀 호출해줘.`
- 함수의 호출권한을 내가 아닌 시스템이 가진다.

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
  <button id="myButton">Click Me</button>
  <script>
    const button = document.getElementById('myButton') // 1. 버튼 가져오기
    button.addEventListener('click', function () { // 2. 이벤트 설정 : click
      console.log('버튼이 눌렸어요!!!') // 3. 콜백함수 설정
    })
  </script>
</body>
</html>
```

<br>

---

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

<br>

---

<br>

## 4. 11월04일(4일차) - `04_django` > `07_django_axios`

---

:heavy_plus_sign: `좋아요` 기능 비동기적으로 구현하기(axios 적용) 

---

<br>

### :heavy_check_mark: `XMLHttpRequest`(XHR)

- 브라우저는 `XMLHttpRequest` 객체를 이용하여 Ajax 요청을 생성하고 전송
- 서버가 브라우저의 요청에 대해 응답을 반환하면 같은 XHR 객체가 그 결과를 처리
- (참고) 단, IE 5, 6 에서는 `ActiveXobject` 를 사용해야 한다.

<br>

### :heavy_check_mark: 기능 구현하기(1) - `좋아요 버튼 색깔 비동기적으로 바뀌게 구현`

- `base.html`에서 `fontawesome` 구문 아래에 구문 추가

  ```html
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  ```

- `_article.html`에서 아래 구문 삭제

  a 태그 안에 있던 if문은 그대로 유지한다.

  ```django
  <a href="{% url 'articles:like' article.pk %}">
  </a>
  ```

- `_article.html`

  `querySelector`를 위해 class에 `like-button` 추가

  ```django
  <i class="fas fa-heart like-button" style="color: crimson;"></i>
  <i class="fas fa-heart like-button" style="color: black;"></i>
  ```

- `index.html`

  가장 맨 아래 `{% endfor %}` 아래에 script 구문 추가

  (참고로 django 안에서 javascript 구문을 작성하기 때문에 자동완성이 안 된다. 그러므로 천천히 작성하자!)

  ```django
  <script>
    // 1. 각 게시글별로 좋아요 버튼이 있으니 모두 선택해야 한다.
    const likebuttons = document.querySelectorAll('.like-button')
  
    // 2. forEach를 사용해서 각각의 좋아요 버튼을 클릭
    likebuttons.forEach(button => {
      button.addEventListener('click', function (event) {
        console.log(event)
        // 항상 처음에는 console로 function의 인자를 찍어보고 어디로 들어가야 하는지 반드시 파악하자
      })
    })
  </script>
  ```

- 로그인 후 좋아요 버튼을 누르면 chrome console 창에서 이벤트 객체가 발생한다.

  그 중 target의 dataset을 볼 수 있다.

  ![01](https://user-images.githubusercontent.com/52685250/68095729-416fde00-feef-11e9-8729-c3562268dc8f.JPG)

- 어떤 게시글의 좋아요인지 알기 위해 `_article.html`에 `data-id` 속성을 추가한다.

  <b>`data-id`를 통해 각 객체에 접근할 수 있다.</b>

  구별할 수 있는 `article.pk`를 빌려와 사용한다.

  ```django
  <i class="fas fa-heart like-button" style="color: crimson;" data-id="{{ article.pk }}"></i>
  <i class="fas fa-heart like-button" style="color: black;" data-id="{{ article.pk }}"></i>
  ```

- `dataset` 을 통해 개별적인 객체에 접근이 가능하다.

  콘솔창에서 id가 새로 생성됨을 확인할 수 있다.

  ```
  dataset: DOMStringMap {id: "4"}
  ```

- `views.py` > `like` view 함수

  기존 redirect 로 인해 `index.html` 로 페이지가 로딩되는 것이 아닌 JSON 형태로 응답결과를 반환 받기로 변경한다.

  JSON 데이터에 liked 변수를 만들어서 template 에서 좋아요를 취소할지 추가할지를 판단할 수 있도록 한다.

  그래서 True False 값을 통해 좋아요 버튼의 style 값(여기서는 버튼의 색깔)을 변경한다.

  ```python
  return redirect('articles:index') # 구문 삭제
  
  # 앞으로는 json 파일에 담아서 같이 보낸다.
  from django.http import JsonResponse # 구문 추가
  ```

  ```python
  # 수정된 like view 함수
  
  @login_required
  def like(request, article_pk):
      article = get_object_or_404(Article, pk=article_pk)
      if article.like_users.filter(pk=request.user.pk).exists():
          article.like_users.remove(request.user)
          liked = False
      else:
          article.like_users.add(request.user)
          liked = True
      context = {'liked': liked,}
      return JsonResponse(context)
  ```

- 다시 console 창을 찍어보면 data 안에 liked가 생겼음을 확인할 수 있다.

  ![02](https://user-images.githubusercontent.com/52685250/68096007-40d84700-fef1-11e9-9c85-1646ba3bce05.JPG)

- 좋아요 색깔을 변경하기 위해 `console.log(event)`로 다시 확인한다.

  `event` > `target` > `style` > `color`에 색깔 정보가 있다.

- 지금까지의 `index.html` script 코드 상황

  좋아요 버튼 누를 때마다 버튼의 색깔만 바뀌고 좋아요 개수는 아직 변하지 않는다.
  
  ```html
  <script>
    // 1. 각 게시글별로 좋아요 버튼이 있으니 모두 선택해야 한다.
    const likebuttons = document.querySelectorAll('.like-button')
  
    // 2. forEach를 사용해서 각각의 좋아요 버튼을 클릭
    likebuttons.forEach(button => {
      button.addEventListener('click', function (event) {
        // 항상 처음에는 console로 function의 인자를 찍어보고 어디로 들어가야 하는지 반드시 파악하자
        // console.log(event)
  
        // event.target.dataset.id 의 value는 data-id 값이 들어 있다.
        const articleId = event.target.dataset.id // 이와 같이 사용하기 위해 console로 찍어서 경로를 확인해야 한다!
        axios.get(`/articles/${articleId}/like/`) // 해당 상세 게시글의 좋아요 요청을 보낸다.(url주소는 urls.py 참고)
          .then(response => {
            // console.log(response) // 반드시 console로 먼저 확인
            if (response.data.liked) {
              // 좋아요 색깔을 빨갛게
              event.target.style.color = 'crimson'
            } else {
              // 좋아요 색깔을 까맣게
              event.target.style.color = 'black'
            }
          })
          .catch(error => console.log(error)) // 반드시 console로 먼저 확인)
      })
    })
</script>
  ```
  

<br>

### :heavy_check_mark: 기능 구현하기(2) - `좋아요 개수도 함께 출력` 

- `like` view 함수의 `context` 안에 `'count': article.like_users.count(),` 추가

- `_article.html`에서 구문 수정

  span 태그로 숫자 부분만 감싸고 id 속성을 추가한다.

  각각이 다른 id 값을 가져야 하므로 id 작성시 article.pk 이용

  ```django
  <b>{{ article.like_users.all|length }}</b>명이 이 글을 좋아합니다. <!-- before -->
  <b><span id="like-count-{{ article.pk }}">{{ article.like_users.all|length }}</span></b>명이 이 글을 좋아합니다. <!-- after -->
  ```

- `index.html`

  .then 구문 안에 다음과 같은 구문 추가

  id 속성에 접근하므로 `.querySelector` 안에 작성시 #을 꼭 붙여준다.

  ```javascript
  document.querySelector(`#like-count-${articleId}`).innerText = response.data.count
  ```

- `index.html` - `post` 방식으로 보내기

  `axios.get(~)`을 `axios.post(~)`로 바꾸면 403 error(forbidden)가 발생한다.

  ```javascript
  axios.get(`/articles/${articleId}/like/`) // before
  axios.post(`/articles/${articleId}/like/`) // after
  ```

  이를 해결하기 위해 쿠키에 csrf를 담아서 보내줘야 한다. <a href="https://docs.djangoproject.com/en/2.2/ref/csrf/#setting-the-token-on-the-ajax-request" target="_blank">(공식 문서)</a>

  ```javascript
  // axios.post(~) 이전에 아래 두 줄 추가
  axios.defaults.xsrfCookieName = 'csrftoken'
  axios.defaults.xsrfHeaderName = 'X-CSRFToken'
  ```

- (추가사항)요청이 ajax 요청일 때만 받아들이게 하기

  ```python
  # views.py
  
  from django.http import JsonResponse, HttpResponseBadRequest
  
  @login_required
  def like(request, article_pk):
      if request.is_ajax(): # if문으로 분기
          article = get_object_or_404(Article, pk=article_pk)
          if article.like_users.filter(pk=request.user.pk).exists():
              article.like_users.remove(request.user)
              liked = False
          else:
              article.like_users.add(request.user)
              liked = True
          context = {'liked': liked, 'count': article.like_users.count(),}
          return JsonResponse(context)
      else:
          return HttpResponseBadRequest()
  ```

- 하지만 현재 상황은 django가 ajax 요청인지 아직 모른다.

  django측에 ajax 요청임을 알려줘야 한다.

  axios 공식 문서의 `Request Config`에서 `headers: {'X-Requested-With': 'XMLHttpRequest'},` 구문을 찾아 `index.html`에 붙여넣어야 한다. <a href="https://github.com/axios/axios#request-config" target="_blank">(공식 문서)</a>

  추가로 `.headers.common`도 붙여줘야 한다. <a href="https://github.com/axios/axios#global-axios-defaults" target="_blank">(공식 문서)</a>

  ```javascript
  const articleId = event.target.dataset.id
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest' // ajax 요청임을 알려주는 구문 (이거 추가)
  axios.defaults.xsrfCookieName = 'csrftoken' // POST 요청임을 알려주는 구문1 (이거 추가)
  axios.defaults.xsrfHeaderName = 'X-CSRFToken' // POST 요청임을 알려주는 구문2 (이거 추가)
  axios.post(`/articles/${articleId}/like/`)
  ...
  ```