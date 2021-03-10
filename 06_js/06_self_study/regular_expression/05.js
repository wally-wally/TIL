// A range of characters can be specified with [ - ] syntax.(범위)

const str1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789';

// [C-K] === [CDEFGHIJK]
console.log(str1.match(/[C-K]/)); // ["C", index: 2, input: "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789", groups: undefined]
console.log(str1.match(/[C-K]/g)); // ["C", "D", "E", "F", "G", "H", "I", "J", "K"]

// [a-d]
console.log(str1.match(/[a-d]/)); // ["a", index: 27, input: "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789", groups: undefined]
console.log(str1.match(/[a-d]/g)); // ["a", "b", "c", "d"]

// [2-6]
console.log(str1.match(/[2-6]/)); // ["2", index: 56, input: "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789", groups: undefined]
console.log(str1.match(/[2-6]/g)); // ["2", "3", "4", "5", "6"]

// [C-K2-6]
console.log(str1.match(/[C-K2-6]/)); // ["C", index: 2, input: "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789", groups: undefined]
console.log(str1.match(/[C-K2-6]/g)); // ["C", "D", "E", "F", "G", "H", "I", "J", "K", "2", "3", "4", "5", "6"]
