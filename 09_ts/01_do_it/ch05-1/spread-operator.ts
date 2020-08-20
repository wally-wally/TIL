// (11) 전개 연산자
let arr1: number[] = [1]
let arr2: number[] = [2, 3, 4]

let mergedArr: number[] = [...arr1, ...arr2, 5]
console.log(mergedArr) // [1, 2, 3, 4, 5]