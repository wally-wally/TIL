// (1) Array 기본
// Array 클래스의 인스턴스 생성 후 push 메서드로 배열 만들기
let array = new Array
array.push(1)
array.push(2)
console.log(array)

// [] 단축 구문
let numbers = [1, 2, 3]
let strings = ['a', 'b', 'c']
console.log(numbers)
console.log(strings)

// JS 에서 배열은 객체다.
// JS 에서 배열은 다른 언어와 다르게 객체이다.
// 배열은 Array 클래스의 인스턴스인데, 클래스의 인스턴스는 객체이기 때문이다.
let arr = [1, 2]
let obj = {
  name: 'wally',
  age: 27
}
console.log(typeof arr) // "object"
console.log(typeof obj) // "object"
// Array.isArray를 이용해서 매개변수로 전달받은 심벌이 배열인지 객체인지 알려준다.
console.log(Array.isArray(arr)) // true
console.log(Array.isArray(obj)) // true