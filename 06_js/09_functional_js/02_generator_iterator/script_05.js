function *infinity(i = 0) {
  while (true) yield i++;
}

// 이터러블을 받아서 이터러블 안의 값들을 yield하다가 l과 같은 값이 나오면 더 이상 동작하지 않음
function *limit(l, iter) {
  for (const a of iter) {
    yield a;
    if (a === l) return;
  }
}

let iter4 = limit(4, [1, 2, 3, 4, 5, 6]);
console.log(iter4.next());
console.log(iter4.next());
console.log(iter4.next());
console.log(iter4.next());
console.log(iter4.next());

// script_04.js에 작성한 odds 제너레이터도 아래와 같이 변경 가능
function *odds(l) {
  for (const a of limit(l, infinity(1))) {
    if (a % 2) yield a;
  }
}

// 결과는 script_04.js에서 실행했을 때와 동일
let iter2 = odds(10);
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());

// 당연히 순회도 가능하다.
for (const a of odds(40)) {
  console.log(a);
}

console.log(...odds(10));
console.log([...odds(10), ...odds(20)]);

const [head, ...tail] = odds(5);
console.log(head);
console.log(tail);

const [a, b, ...rest] = odds(10);
console.log(a);
console.log(b);
console.log(rest);