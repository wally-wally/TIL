// Array Helper Method
// 6. .some(callback())
// 배열 안에 어떤 요소라도(===하나라도) 주어진 callback 함수를 통과하는지 테스트하고,
// 결과에 따라 boolean 을 return 한다.
// 빈 배열은 무조건 false 를 return
// 조건에 맞는 요소를 찾으면 즉시 검색을 멈추고 true 를 return
// 'or' 연산과 유사

// 7. .every(callback())
// 배열 안에 모든 요소가 주어진 callback 함수를 통과하는지 테스트하고,
// 결과에 따라 boolean 을 return 한다.
// 빈 배열은 무조건 true 를 return
// 배열의 모든 요소가 조건에 맞아야 true, 그렇지 않다면 false
// 조건에 맞지 않는 요소를 찾으면 검색을 멈추고 false 를 return
// 'and' 연산과 유사

// some - 하나라도!
const arr = [1, 2, 3, 4, 5,]
const result = arr.some(elem => elem % 2 === 0)
console.log(result) // 짝수가 있으므로 true (이 때, arr에서 원소 2에서 멈춘다.)

// every - 모든!
const result2 = arr.every(elem => elem % 2 === 0)
console.log(result2) // 모든 원소가 짝수가 아니므로 false(이 때, arr에서 원소 1에서 멈춘다.)

// some, every 연습
// ram이 32보다 작으면 everyComputers 를 false로 아니면 someComputers 를 true

var everyComputers = true
var someComputers = false

// for
var computers = [
  { name: 'macbook', ram: 8},
  { name: 'gram', ram: 16},
  { name: 'series9', ram: 32},
]

for (var i = 0; i < computers.length; i++) {
  var computer = computers[i]
  if (computer.ram < 32) {
    everyComputers = false
  } else {
    someComputers = true
  }
}

console.log(everyComputers) // false
console.log(someComputers) // true

// some, every
const COMPUTERS = [
  { name: 'macbook', ram: 8},
  { name: 'gram', ram: 16},
  { name: 'series9', ram: 32},
]

// (1)some
const newsomeComputers = COMPUTERS.some(computer => computer.ram < 32)
console.log(newsomeComputers) // true

// (2)every
const neweveryComputers = COMPUTERS.every(computer => computer.ram < 32)
console.log(neweveryComputers) // false