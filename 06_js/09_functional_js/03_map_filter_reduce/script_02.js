const map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
};

console.log([1, 2, 3].map(a =>a + 1));

// console.log(document.querySelectorAll('*').map(el => el.nodeName)); // error
console.log(map(el => el.nodeName, document.querySelectorAll('*')));

const it = document.querySelectorAll('*')[Symbol.iterator]();
console.log(it.next());
console.log(it.next());
console.log(it.next());

function *gen() {
  yield 2;
  if (false) yield 3;
  yield 4;
}

console.log(map(a => a * a, gen()));

let m = new Map();
m.set('a', 10);
m.set('b', 20);
console.log(m);

console.log(new Map(map(([k, a]) => [k, a * 2], m)));