// (1) 함수 선언문

// (1-1) 함수 선언문 작성법
// 아래와 같이 함수의 인자로 매개변수와 타입을 함께 작성한다.
// 그리고 반환되는 값의 타입도 함께 작성해야 한다.
// 매개변수와 반환값의 타입 주석을 생략할 수 있지만 타입 생략을 하는 것은 바람직하지 않다.
// 타입이 생략되어 있으면 함수의 구현 의도를 알기 어렵고 잘못 사용하기 쉽기 때문이다.
function add(a: number, b: number): number {
  return a + b
}

console.log(add(2, 3))


// (1-2) void 타입
// 값을 반환하지 않는 함수는 return type이 voide이다.
function showAge(name: string, age: number): void {
  console.log(`${name}'s age is ${age}`)
}


// (1-3) 함수 시그니처
// 변수에 타입이 있듯이 함수 또한 타입이 있는데, 함수의 타입을 함수 시그니처라고 한다.
// 위에서 작성한 showAge 함수의 시그니처를 이용한 예이다.
// showAge 함수는 string, number 타입의 매개변수가 있고 return type이 void 이다.
// 따라서 이 함수의 시그니처는 (string, number) => void 이다.
// let showAge: (string, number) => void = function (name: string, age: number): void {}
// 만약 매개변수가 없으면 단순히 ()로 표현되고 이 때 함수의 시그니처는 () => void(return type이 아무것도 없는 경우)가 된다.


// (1-4) type 키워드로 별칭 만들기
// 위에서 만든 함수 시그니처를 stringNumberFunc이라는 이름으로 타입 별칭을 만들었다.
// 이로 인해 변수 f1, f2에 타입 주석을 더 간단하게 작성할 수 있다.
type stringNumberFunc = (string, number) => void
let f1: stringNumberFunc = function (x: string, y: number): void {}
let f2: stringNumberFunc = function (w: string, z: number): void {}


// (1-5) undefined를 고려한 함수 작성
interface INameable {
  name: string
}

function sayName(obj: INameable) {
  return obj !== undefined ? obj.name : 'unknown name'
}

console.log(sayName(undefined)); // unknown name
console.log(sayName({name: 'wally'})); // wally

interface IAgeable { // 선택적 속성이 있는 경우
  age?: number
}

function sayAge(obj: IAgeable) {
  return obj !== undefined && obj.age ? obj.age : 0
}

console.log(sayAge(undefined)) // 0
console.log(sayAge(null)) // 0
console.log(sayAge({age: 27})) // 27