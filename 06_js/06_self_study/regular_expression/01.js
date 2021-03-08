const str1 = 'Hello, world!';

console.log(str1.match(/Hello/)); // ["Hello", index: 0, input: "Hello, world!", groups: undefined]
console.log(str1.match(/hello/)); // null


const str2 = 'Hello,   world!';
console.log(str2.match(/Hello, world!/)); // null
