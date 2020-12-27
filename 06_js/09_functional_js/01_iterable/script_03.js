// 사용자 정의 이터러블 구현
// (1)
const iterable = {
  [Symbol.iterator]() {
    let i = 3;
  	return {
      next() {
        return i === 0 ? { done: true } : { value: i--, done: false }
      }
    }    
  }
};

let iterator = iterable[Symbol.iterator]();
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());

for (const a of iterable) {
  console.log(a);
}


// (2)
const arr2 = [1, 2, 3, 4];
for (const a of arr2) {
  console.log(a);
}

let iter2 = arr2[Symbol.iterator]();
iter2.next();
for (const a of iter2) {
  console.log(a);
}


// (3)
const iterable = {
  [Symbol.iterator]() {
    let i = 3;
  	return {
      next() {
        return i === 0 ? { done: true } : { value: i--, done: false }
      },
      [Symbol.iterator]() { // 자기 자신을 return 하는 코드 추가
        return this;
      }
    }    
  }
};

let iterator = iterable[Symbol.iterator]();

for (const a of iterator) {
  console.log(a);
}


// (4)
for (const a of document.querySelectorAll('*')) {
  console.log(a);
}

const all = document.querySelectorAll('*');
console.log(all); // all이 Symbol.iterator가 구현되어 있기 때문에 순회가 가능하다.
let iter3 = all[Symbol.iterator]();
console.log(iter3.next());
console.log(iter3.next());