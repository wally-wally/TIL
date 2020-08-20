// (6) 배열의 비구조화 할당

let numArr: number[] = [10, 20, 30, 40]
let [first, second, ...rest] = numArr
console.log(first) // 10
console.log(second) // 20
console.log(rest) // [30, 40]