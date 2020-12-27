const products = [
  { name: 'Product1', price: 12000 },
  { name: 'Product2', price: 20000 },
  { name: 'Product3', price: 16000 },
  { name: 'Product4', price: 31000 },
  { name: 'Product5', price: 24000 }
]

// 기존 방식
let names = [];
for (const product of products) {
  names.push(product.name);
}
console.log(names);

let prices = [];
for (const product of products) {
  prices.push(product.price);
}
console.log(prices);

// map 함수 적용
const map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
};

console.log(map(p => p.name, products));
console.log(map(p => p.price, products));