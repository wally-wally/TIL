// while
let i = 0

while (i < 6) {
  console.log(i)
  i++
} // 0부터 5까지 한줄에 하나씩 출력됨

// for - 1
for (let j = 0; j < 6; j++) {
  console.log(j)
} // while문과 같은 구문

// for - 2
const numbers = [0, 1, 2, 3, 4, 5]

for (let number of numbers) {
  console.log(number)
} // 0부터 5까지 한 줄에 하나씩 출력
// for (let number of [0, 1, 2, 3, 4, 5]) { 이렇게도 가능
//   console.log(number)
// }
// 상황에 따라 재할당 안하게 하기 위해 let 대신에 const도 가능
// for (const number of [0, 1, 2, 3, 4, 5]) {
//   console.log(number)
// }