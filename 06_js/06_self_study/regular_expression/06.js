// If a character class starts with ^, then specified characters will not be selected.(대괄호 안에서 사용하면 캐럿은 부정의 의미)

const str1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789';

console.log(str1.match(/[^CDghi45]/)); // ["A", index: 0, input: "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789", groups: undefined]
console.log(str1.match(/[^CDghi45]/g)); // ["A", "B", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ", "a", "b", "c", "d", "e", "f", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", " ", "0", "1", "2", "3", "6", "7", "8", "9"]

console.log(str1.match(/[^a-z]/)); // ["A", index: 0, input: "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789", groups: undefined]
console.log(str1.match(/[^a-z]/g)); // ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ", " ", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
