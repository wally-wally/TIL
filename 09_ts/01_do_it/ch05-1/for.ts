// (7) for...in 문
// 배열의 인덱스값을 대상으로 순회
let names = ['wally', 'kim', 'mike']

for (let index in names) {
  console.log(index) // 0, 1, 2가 차례대로 출력
  const name = names[index]
  console.log(`${index + 1}번째 이름: ${name}`)
  // 1번째 이름: wally
  // 2번째 이름: kim
  // 3번째 이름: mike
}

let wally = {
  name: 'wally',
  age: 27
}

for (let property in wally) {
  console.log(`${property}: ${wally[property]}`)
  // name: wally
  // age: 27
}


// (8) for...of 문
// 배열의 원소 값을 대상으로 순회
// 그래서 원소 값만 필요할 때는 for...in 문보다 for...of 문을 사용해서 좀 더 간결하게 구현할 수 있다.
for (let name of names) {
  console.log(name) // wally, kim, mike가 차례대로 출력
}