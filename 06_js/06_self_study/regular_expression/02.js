// Character ^ matches the beginning of the line
// dollar sign $ the end of the line

const str1 = 'who is who';

// matching 된 index가 다른 것에 유의
console.log(str1.match(/^who/)); // ["who", index: 0, input: "who is who", groups: undefined]
console.log(str1.match(/who$/)); // ["who", index: 7, input: "who is who", groups: undefined]


const str2 = '$12$ \-\ $25$';

console.log(str2.match(/^$/)); // null

console.log(str2.match(/\$/)); // ["$", index: 0, input: "$12$ - $25$", groups: undefined]
console.log(str2.match(/\$/g)); // ["$", "$", "$", "$"]

console.log(str2.match(/^\$/)); // ["$", index: 0, input: "$12$ - $25$", groups: undefined]

console.log(str2.match(/\$$/)); // ["$", index: 10, input: "$12$ - $25$", groups: undefined]
console.log(str2.match(/\$$/g)); // ["$"]

console.log(str2.match(/\\/)); // null
console.log(str2.match(/\\/g)); // null
