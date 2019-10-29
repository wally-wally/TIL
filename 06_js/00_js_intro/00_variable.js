// let (변수)

let x = 1

if (x === 1) {
  let x = 2 // 이건 가능
  // let x = 3 // 이건 불가능
  console.log(x) // 2가 출력
}

console.log(x) // 1이 출력

console.log()

// const (상수) - 상수는 보통 대문자로 쓴다.

// const 선언시에 초기값을 생략하면 오류 발생
// const MY_FAV

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

console.log()

// var (변수)

function varTest() {
  var x = 1
  if (true) {
    var x = 2
    console.log(x) // 2가 출력
  }
  console.log(x) // 2가 출력
}

varTest()

console.log()

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

console.log()

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


// 식별자 작성 스타일
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