// ES5 이전 함수 선언 방식
// 함수 선언문
function sum1(a, b) {
  return a + b;
}

// 함수 표현식
var sum2 = function(a, b) {
  return a + b;
}

// ES6+ 함수 표현식(화살표 함수)
var sum3 = (a, b) => {
  return a + b;
}
var sum4 = (a, b) => a + b;

// 타입스크립트의 화살표 함수
var sum5 = (a: number, b: number): number => {
  return a + b;
}