var a=7+3*2;
var b=(7+3)*2;

console.log(a, b);

// 연산자 우선순위
// 1. Logical Operator : NOT(!)
// 2. Arithmetic Operator : *, /, %, +, -
// 3. Relational Operator : >, <, <=, >=, ==, !=
// 4. Logical Operator : AND(&&)
// 5. Logical Operator : OR(||)

var c = 2 * 3 > 4 + 5 && 6 / 3 == 2 || !false
// 2 * 3 > 4 + 5 && 6 / 3 == 2 || true
// 6 > 9 && 2 == 2 || true
// false && true || true
// false || true
// true
var height = 170;
var gender = "male";
var d = height >= 180 && gender == "male" || height >= 165 && gender == "female";
var e = (height >= 180 && gender == "male") || (height >= 165 && gender == "female");
// 코드의 가독성을 위해 d 식보다는 e 식처럼 괄호를 사용하여 연산자 우선순위를 명확하게 구분해주자.

console.log(c);
console.log(d);
console.log(e);