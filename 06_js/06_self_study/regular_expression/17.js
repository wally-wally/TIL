// \d : 숫자인 것만 검출 (=== [0-9])
// \D : \d와 정반대

const str1 = 'Page 123; published: 1234 id=12#24@112';

console.log(str1.match(/\d/));
console.log(str1.match(/\d/g));

console.log(str1.match(/\D/));
console.log(str1.match(/\D/g));

console.log(str1.match(/[0-9]/));
console.log(str1.match(/[0-9]/g));
