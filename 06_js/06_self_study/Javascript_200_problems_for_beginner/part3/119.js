const str = 'To lose your path is the way to find that path';

const sensitiveCaseRegex = /to/;
const ignoreAllCaseRegex = /to/gi;
const findRangeRegex = /([a-f])\w+/i;
const findAllRangeRegex = /([a-f])\w+/gi;

console.log(str.match(sensitiveCaseRegex));
console.log(str.match(ignoreAllCaseRegex));
console.log(str.match(findRangeRegex));
console.log(str.match(findAllRangeRegex));