// 함수의 인자 x, y 모두 숫자이며 함수의 결과물도 number이다.
function sum(x, y) {
    return x + y;
    // return null; // 결과물을 number로 정했는데 return 값을 null로 하면 에러 발생!
}
sum(10, 30);
function sumArray(numbers) {
    return numbers.reduce(function (acc, current) { return acc + current; }, 0);
}
var total = sumArray([1, 2, 3, 4, 5, 6]);
// 함수에서 아무것도 반환하지 않는다면 결과물 type을 void로 하면 된다.
function sayHello() {
    console.log('Hello World!');
}
