console.log("5" + 1);
console.log("5" - 1);
console.log("5" * 2);
console.log("There is " + 5);
console.log("Five" * 2);

console.log('- 연산자를 활용한 자료형 변환');
var str = 5 + "1";
console.log(str);
console.log(typeof str);

var num = +str;
console.log(num);
console.log(typeof num);

console.log('- 함수를 활용한 자료형 변환');
str = String(num);
console.log(str);
console.log(typeof str);

num = Number(str);
console.log(num);
console.log(typeof num);