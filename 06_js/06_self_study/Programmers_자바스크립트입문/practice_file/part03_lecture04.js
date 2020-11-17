var empty_obj = {};
console.log(empty_obj);

var man = {name:"홍길동", age:20, height:180};
console.log(man);

// 객체 속성에 접근하기
// 1. man.name
// 2. man["name"]
console.log(man.name)
console.log(man["name"])

// 객체 속성 값 변경하기
man.name = "이몽룡";
man["age"] = 15;
console.log(man);