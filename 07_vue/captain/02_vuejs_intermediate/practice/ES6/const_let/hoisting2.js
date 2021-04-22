// js 해석기가 아래 코드 순서를 어떻게 재조정할까?

var sum = 5
sum = sum + i

function sumAllNumbers() {
  // ...
}

var i = 10


// 재조정된 코드
// #1 - 함수 선언식과 변수 선언을 hoisting
var sum
function sumAllNumbers() {
  // ...
}
var i

// #2 - 변수 대입 및 할당
sum = 5
sum = sum + i
i = 10