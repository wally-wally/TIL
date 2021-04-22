// ES6 - const 로 지정된 값 변경 불가능
const a = 10
a = 20 // Uncaught TypeError: Assignment to constant variable

// 하지만 객체나 배열의 내부는 변경할 수 있다.
const b = {}
b.num = 10
console.log(b) // {num: 10}

const c = []
c.push(20)
console.log(c) // [20]