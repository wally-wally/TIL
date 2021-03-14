// Character Class

const str1 = 'A1 B2 c3 d_4 e:5 ffGG77--__--';

// \w : alphanumeric plus "_"(단, 공백은 미포함) (=== [A-z0-9_])
console.log(str1.match(/\w/));
console.log(str1.match(/\w/g));

console.log(str1.match(/\w*/));
console.log(str1.match(/\w*/g));

// [a-z]\w* : a-z까지 한 문자가 오고 그 뒤에는 \w에 해당하는 문자가 없거나 있거나
console.log(str1.match(/[a-z]\w*/));
console.log(str1.match(/[a-z]\w*/g));

// \w 에 해당하는 문자 5개
console.log(str1.match(/\w{5}/));
console.log(str1.match(/\w{5}/g));

console.log(str1.match(/[A-z0-9_]/));
console.log(str1.match(/[A-z0-9_]/g));
