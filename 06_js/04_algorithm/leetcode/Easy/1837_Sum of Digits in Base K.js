const sumBase = (n, k) => n.toString(k).split('').reduce((acc, curr) => acc += +curr, 0);

console.log(sumBase(34, 6)); // 9
console.log(sumBase(10, 10)); // 1