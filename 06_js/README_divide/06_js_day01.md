# :notebook_with_decorative_cover: 06_Javascript - Day01

<br>

## 1. 10월29일(1일차)

### 1.1 Introduction of Javascript

<br>

### 1.2 `let`, `const`, `var` - `00_variable.js`

---

:heavy_check_mark: <b>javascript 이용을 위한 기본 세팅</b>

- `Editor: Tab size` : 4에서 2로 수정

![01](https://user-images.githubusercontent.com/52685250/67741056-3f270300-fa5b-11e9-8b58-0db0dba29d79.JPG)

> `settings.json`
>
> ```json
>  "[python]": { // 이 부분 추가
>      "editor.tabSize": 4,
>      "editor.insertSpaces": true
>  },
>  
>  // "[html]": { // 기존 html, css, django-html 부분 삭제
>  //     "editor.tabSize": 2
>  // },
>  // "[css]": {
>  //     "editor.tabSize": 2
>  // },
>  // "[django-html]": {
>  //     "editor.tabSize": 2
>  // },
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

### 1.5 타입과 연산자

#### (1) 타입(type)

##### ① Primitive

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

    <a href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN" target="_blank">(Number.isNaN() 함수 공식 문서)</a>

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

##### ② Reference

:heavy_exclamation_mark: `2일차 README`에 이어서 계속... <a href="#" target="_blank">(바로 이동)</a>