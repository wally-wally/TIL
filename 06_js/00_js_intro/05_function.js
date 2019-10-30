// 1. 선언식 (statement, declaration)
// 함수 선언식은 코드가 실행되기 전에 로드된다.
function add(num1, num2) {
  return num1 + num2
}

console.log(add(2, 7)) // 9가 출력됨


// 2. 표현식 (Expression)
// 함수 표현식은 인터프리터(javascript)가 해당 코드에 도달 했을 때 로드된다.(미리 로드X)
const sub = function(num1, num2) { // 이와 같이 이름이 없는 함수를 익명함수라고 함
  return num1 - num2
}

console.log(sub(7, 2)) // 5가 출력됨

// [참고]함수도 하나의 값이다.
console.log(typeof add) // function이라고 출력됨
console.log(typeof sub) // function이라고 출력됨


// 3. Arrow Function 화살표 함수
// 화살표 함수의 경우 일반 function 키워드로 정의한 함수와 100% 동일한 것이 아니다.
// 화살표 함수는 항상 익명함수이다.
// 변수에 할당할 수 있지만 이름 붙은 함수(생성자)로는 만들 수 없다.
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

// Arrow Function refactoring practice
let square = function(num) {
  return num ** 2
}
let square = (num) => { return num ** 2}
let square = num => { return num ** 2 }
let square = num => num ** 2

// 매개변수가 없다면?? - ()나 _를 사용
let noArgs = () => 'No args'
let noArgs = _ => 'No args'

// object를 return 한다면?
let returnObject = () => { return {key: 'value'} } // return을 명시적으로 적어준다.
console.log(returnObject()) // { key: 'value' }로 출력됨

// object를 return 하는데 return을 사용하지 않을 경우
let returnObject = () => ({key: 'value'}) // 가장 밖에 있는 중괄호를 소괄호로 변경하여 사용

// object를 return 시 문제 상황
// return 이 없는데 () 를 안 쓴 경우
let returnObject = () => {key: 'value'}
const test = returnObject()
console.log(typeof test)

// 기본 매개변수를 줄 때는 매개변수의 개수와 상관없이 무조건 () 를 해야한다.
const sayHello = (name='noName') => `hi ${name}`

// Anonymous Function (익명함수 / 1회용함수) 사용하는 방법
// 1. 기명함수로 만들기 (변수/상수에 할당하기) - 생성과 동시에 함수의 인수로 할당
const cube = function (num) { return num ** 3 } // 변수 할당
const squareRoot = num => num ** 0.5

console.log(cube(2)) // 8이 출력
console.log(squareRoot(4)) // 2가 출력

// 2. 익명함수 즉시 실행
// 함수의 표현식을 소괄호로 한 번 더 묶어 준다.(파이썬의 람다식도 동일)
console.log((function (num) { return num ** 3 })(2)) // 8이 출력
console.log((num => num ** 0.5)(4)) // 2가 출력

// 함수 호이스팅
// 함수의 선언만 끌어 올려준다.
ssafy()

function ssafy() {
  console.log('hoisting!') // 올바르게 출력됨
}

// 다만 변수에 할당한 함수(표현식으로 쓴 함수)는 호이스팅 되지 않는다.
// 이것은 변수의 유효 범위 규칙을 따르기 때문이다.
// (1) let
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

// (2) var
ssafy3() // TypeError 발생

var ssafy3 = function () {
  console.log('hoisting!')
}

// var (JS가 이해한 코드)
var ssafy3 // 1) 변수 선언(단, var이므로 초기화과정도 진행)

ssafy3() // 2) 변수 호출 -> ssafy3은 변수인데 호출을 한다고?? -> 바로 TypeError!

ssafy3 = function() {
  console.log('hoisting!')
}