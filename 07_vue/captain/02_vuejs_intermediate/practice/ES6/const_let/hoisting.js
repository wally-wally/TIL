// Hoisting 이란 선언한 함수와 변수를 해석기가 가장 상단에 있는 것처럼 인식한다.
// js 해석기는 코드의 라인 순서와 관계 없이 함수 선언식과 변수를 위한 메모리 공간을 먼저 확보한다.
// 따라서 function a()와 var 는 코드의 최상단으로 끌어 올려진 것(hoisted) 처럼 보인다.

function willBeOveridden() {
  return 10
}
willBeOveridden() // 5
function willBeOveridden() {
  return 5
}

// cf)함수 선언식 vs 함수 표현식
// function statement(함수 선언식)
// function sum() {
//   return 10 + 20
// }

// function expression(함수 표현식)
// var sum = function() {
//   return 10 + 20
// }