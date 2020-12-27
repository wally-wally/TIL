// reduce
const nums = [1, 2, 3, 4, 5, 6];

let total = 0;
for (const n of nums) {
  total = total + n;
}

console.log(total);

const reduce = (f, acc, iter) => {
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
}

const add = (a, b) => a + b;

console.log(reduce(add, 0, [1, 2, 3]));
console.log(add(add(add(0, 1), 2), 3));

const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
}

console.log(reduce(add, [1, 2, 3]));
console.log(reduce(add, 1, [2, 3]));

const products = [
  { name: 'Product1', price: 12000 },
  { name: 'Product2', price: 20000 },
  { name: 'Product3', price: 16000 },
  { name: 'Product4', price: 31000 },
  { name: 'Product5', price: 24000 }
]

console.log(
  reduce(
    (total_price, product) => total_price + product.price,
    0,
    products));