// (3) 고차 함수: 또 다른 함수를 반환하는 함수

const add1 = (a: number, b: number): number => a + b // 보통 함수
const add2 = (a: number): (number) => number => (b: number): number => a + b // 고차 함수
const result = add2(1)(2)
console.log(result)