// arrow function
// 함수를 정의할 때 function 이라는 키워드를 사용하지 않고 => 로 대체
// 흔히 사용하는 콜백 함수의 문법을 간결화

// ES5
// var sum = function(a, b) {
//   return a + b
// }

// ES6
var sum = (a, b) => {
  return a + b
}

sum(10, 20)