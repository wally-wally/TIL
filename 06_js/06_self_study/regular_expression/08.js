// Quantifiers(수량자) specify how many times a character can occur. (특정 패턴이 얼만큼 등장하는지)
// Star(*) => 0 ~ 여러개
// Plus(+) => 1 ~ 여러개
// Question mark(?) => 없거나 1개인 경우

const str1 = 'aabc abc bc';

// a*b => b 앞에 a가 0개 이상인 경우
console.log(str1.match(/a*b/));
console.log(str1.match(/a*b/g));

// a+b => b 앞에 a가 1개 이상인 경우
console.log(str1.match(/a+b/));
console.log(str1.match(/a+b/g));

// a?b => b 앞에 a가 없거나 1개인 경우
console.log(str1.match(/a?b/));
console.log(str1.match(/a?b/g));
