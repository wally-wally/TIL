// Point . matches any character.

const str1 = 'Regular expressions are powerful!!!';

console.log(str1.match(/./)); // ["R", index: 0, input: "Regular expressions are powerful!!!", groups: undefined]
console.log(str1.match(/./g)); // ["R", "e", "g", "u", "l", "a", "r", " ", "e", "x", "p", "r", "e", "s", "s", "i", "o", "n", "s", " ", "a", "r", "e", " ", "p", "o", "w", "e", "r", "f", "u", "l", "!", "!", "!"]

console.log(str1.match(/....../)); // ["Regula", index: 0, input: "Regular expressions are powerful!!!", groups: undefined]
// 마지막 남은 글자들은 6글자가 안 되므로 매칭이 되지 않는다.
console.log(str1.match(/....../g)); // ["Regula", "r expr", "ession", "s are ", "powerf"]


// The point must be escaped if literal meaning is required.
const str2 = 'O.K.';
console.log(str2.match(/./)); // ["O", index: 0, input: "O.K.", groups: undefined]
console.log(str2.match(/./g)); // ["O", ".", "K", "."]

console.log(str2.match(/\./)); // [".", index: 1, input: "O.K.", groups: undefined]
console.log(str2.match(/\./g)); // [".", "."]

console.log(str2.match(/\..\./)); // [".K.", index: 1, input: "O.K.", groups: undefined]
console.log(str2.match(/\..\./g)); // [".K."]
