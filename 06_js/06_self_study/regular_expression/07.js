// subpattern
// Alternating text can be enclosed in parentheses and alternatives separated with |.

const str1 = 'Monday Tuesday Friday';

console.log(str1.match(/(on|ues|rida)/)); // ["on", "on", index: 1, input: "Monday Tuesday Friday", groups: undefined]
console.log(str1.match(/(on|ues|rida)/g)); // ["on", "ues", "rida"]

console.log(str1.match(/(Mon|Tues|Fri)day/)); // ["Monday", "Mon", index: 0, input: "Monday Tuesday Friday", groups: undefined]
console.log(str1.match(/(Mon|Tues|Fri)day/g)); // ["Monday", "Tuesday", "Friday"]

// 위와 동일한 결과
console.log(str1.match(/..(id|esd|nd)ay/));
console.log(str1.match(/..(id|esd|nd)ay/g));
