// Array 순회
const arr = [1, 2, 3, 4];
let iter1 = arr[Symbol.iterator]();
for (const a of iter1) {
  console.log(a);
}

// Set 순회
const set = new Set([1, 2, 3, 4]);
let iter2 = set[Symbol.iterator]();
for (const a of iter2) {
  console.log(a);
}

// Map 순회
const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
let iter3 = map[Symbol.iterator]();
for (const a of iter3) {
  console.log(a);
}

// Map 추가 내용
for (const k of map.keys()) {
  console.log(k);
}
for (const k of map.values()) {
  console.log(k);
}
for (const k of map.entries()) {
  console.log(k);
}

let mapIter = map.values();
for (const v of mapIter[Symbol.iterator]()) {
  console.log(v);
}

map.values(); // MapIterator {1, 2, 3}
mapIter[Symbol.iterator](); // MapIterator {1, 2, 3}