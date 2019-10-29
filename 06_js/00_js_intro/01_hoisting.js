console.log(a)
var a = 10
console.log(a)

// JS가 이해한 코드
var a // 선언과 초기화가 동시에 이루어졌다.
console.log(a) // undefined
a = 10
console.log(a)

// let은 안 된다.
console.log(b)
let b = 10
console.log(b)

// 마찬가지로 아래와 같은 과정을 거친다.
let = b // 선언 + TDZ로 이동(초기화는 안 된 상태임)
console.log(b) // 할당 불가 (초기화가 아직 안 됨, ReferenceError 발생)
b = 10 // 할당
console.log(b)

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

// hoisting 예제 - JS가 이해한 코드
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