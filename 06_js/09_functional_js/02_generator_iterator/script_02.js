function *gen() {
  yield 1;
  yield 2;
  yield 3;
  return 100; // return을 작성하면 done이 true일 때 value 값을 지정할 수 있다.
}

let iter = gen();
console.log(iter.next()); // {value: 1, done: false}
console.log(iter.next()); // {value: 2, done: false}
console.log(iter.next()); // {value: 3, done: false}
console.log(iter.next()); // {value: 100, done: true}
// 단, 제너레이터의 return 값은 순회할 때 출력되지 않는다.

// 제너레이터는 순회할 값을 문장으로 표현하는 것이라고도 한다.
function *gen2() {
  yield 1;
  if (false) yield 2;
  yield 3;
}

let iter2 = gen2();
console.log(iter2.next()); // {value: 1, done: false}
console.log(iter2.next()); // {value: 3, done: false}
console.log(iter2.next()); // {value: undefined, done: true}
console.log(iter2.next()); // {value: undefined, done: true}