// ES5
var sum = 0
for (let i = 1; i <= 5; i++) {
  sum = sum + i
}

console.log(sum) // 15
console.log(i) // 6


// ES6 - { } 단위로 변수의 범위가 제한됨
let sum = 0
for (let i = 1; i <= 5; i++) {
  sum = sum + i
}

console.log(sum) // 15
console.log(i) // Uncaught ReferenceError: i is not defined