// 전개 연산자(spread operator)
const a = [1, 2, 3, 4];
console.log(...a); // 1 2 3 4
console.log([...a, ...[5, 6]]); // [1, 2, 3, 4, 5, 6]

a[Symbol.iterator] = null;
// Uncaught TypeError: a is not iterable
console.log([...a, ...[5, 6]])


const b = [1, 2, 3, 4, 5];
const arr = [1, 2, 3, 4];
const set = new Set([1, 2, 3, 4]);
const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
console.log([...b, ...arr, ...set, ...map, ...map.values()]);