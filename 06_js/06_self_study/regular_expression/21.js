// Assertions
// (?=<pattern>) : pattern이 나올 때까지 탐색하지만 해당 pattern은 제외하라는 의미

const str1 = 'AAAX---aaax---111';

console.log(str1.match(/\w+(?=X)/));
console.log(str1.match(/\w+(?=X)/g));

console.log(str1.match(/\w+/));
console.log(str1.match(/\w+/g));

console.log(str1.match(/\w+(?=\w)/));
console.log(str1.match(/\w+(?=\w)/g));
