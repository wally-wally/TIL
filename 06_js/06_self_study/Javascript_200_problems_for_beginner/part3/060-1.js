const str1 = '자바스크립트 200제';
const str2 = new String('자바스크립트 200제');

console.log(typeof str1);
console.log(typeof str2);

console.log(str1 === '자바스크립트 200제');
console.log(str2 === new String('자바스크립트 200제'));

console.log(str1.valueOf());
console.log(str2.valueOf());