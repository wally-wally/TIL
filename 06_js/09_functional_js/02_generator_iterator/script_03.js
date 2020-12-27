// yield에 직접 입력해서 홀수 발생시킬 때
function *odds() {
  yield 1;
  yield 3;
  yield 5;
}

let iter = odds();
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());

// limit 값을 받아서 해당 범위까지의 홀수를 출력
function *odds(l) {
  for (let i = 0; i < l; i++) {
    if (i % 2) yield i;
  }
}

let iter2 = odds(10);
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());