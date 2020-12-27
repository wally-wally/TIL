// Generator
function *gen() {
  // yield를 통해 몇 번의 next를 통해 모든 값들을 꺼낼 수 있는지 결정한다.
  yield 1;
  yield 2;
  yield 3;
}
let iter = gen(); // 제너레이터를 실행한 결과는 이터레이터이다.
// 제너레이터를 통해 쉽게 이터레이터를 만들 수 있다.
console.log(iter.next()); // {value: 1, done: false}
console.log(iter.next()); // {value: 2, done: false}
console.log(iter.next()); // {value: 3, done: false}
console.log(iter.next()); // {value: undefined, done: true}

// 제너레이터는 well-formed iterator를 return하는 함수이다.
console.log(iter[Symbol.iterator]); // 제너레이터 실행 결과는 Symbol.iterator를 가지고 있다.
console.log(iter[Symbol.iterator]() === iter); // true

// 제너레이터는 순회가 가능하다.
for (const a of gen()) {
  console.log(a);
}