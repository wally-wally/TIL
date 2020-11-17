var obj = { a: 1, b: 2, c: 30, d: 44, e: 5 };

var { a, c } = obj;
console.log(`a >>> ${a}`);
console.log(`c >>> ${c}`);

var { a:newA=10, f:newF=5 } = obj;
console.log(`newA >>> ${newA}`);
console.log(`newF >>> ${newF}`);