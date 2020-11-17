var a=1, b=2, c=3, d=4;
var e="a", f="b", g="c", h="d";

// 관계 연산자 => 결과값 : boolen type
console.log(a<b, a>b, a<=b, a>=b, a==a, a==b, a!=a, a!=b);
console.log(e==e, e!=e, e<f, f<e);
console.log("a"<"b");

// 논리 연산자
console.log(true && true, true && false, false && true, false && false); // AND 연산자
console.log(true || true, true || false, false || true, false || false); // OR 연산자
console.log(!true, !false); // NOT 연산자

var height=180;
var age=20;

console.log(height >= 180 && age >= 20 && age < 30);
console.log(height >= 190 && age >= 20 && age < 30);
console.log(age < 8 || age >= 65);
console.log(age < 30 || age >= 60);