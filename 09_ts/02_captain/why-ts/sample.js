// function sum(a, b) {
//   return a + b;
// }
// sum(10, '20'); // 1020

// var result = sum(10, 20);
// result.toLocaleString();

// @ts-check

/**
 * 
 * @param {number} a 첫번째 숫자
 * @param {number} b 두번째 숫자
 */

function sum(a, b) {
  return a + b;
}

sum(10, 20);
sum(10, '20'); // Javascript 상에서는 타입 상에서의 오류를 알려주지 않는다.
// 그래서 @ts-check라는 것을 작성하면 Typescript에서 쓴 것과 같은 효과를 줄 수도 있다.