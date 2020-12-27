const products = [
  { name: 'Product1', price: 12000 },
  { name: 'Product2', price: 20000 },
  { name: 'Product3', price: 16000 },
  { name: 'Product4', price: 31000 },
  { name: 'Product5', price: 24000 }
]

// 기존 방식
let under20000 = [];
for (const p of products) {
  if (p.price < 20000) {
    under20000.push(p);
  }
}

console.log(under20000);

// filter 함수 적용
const filter = (f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) {
      res.push(a);
    }
  }
  return res
};

console.log(filter(p => p.price < 20000, products));

console.log(filter(n => n % 2, [1, 2, 3, 4]));

console.log(filter(n => n % 2, function *() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
}()));