# :notebook_with_decorative_cover: 06_Javascript - Day02

<br>

## 2. 10월30일(2일차)

### 2.1 연산자 - `02_type_operator.js`

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

### 2.2 조건문 & 반복문 - `03_if_switch.js`, `04_loop.js`

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

### 2.3 함수 - `05_function.js`

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

#### (1) Array - Bulit-in Method - `06_data_structure_1.js`

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

#### (2) Object - `07_data_structure_2.js`

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

#### (3) JSON(JS Object Notation) - `07_data_structure_2.js`

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

#### (4) Array Helper Method - `08_forEach.js` ~ `13_some_every.js`

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

