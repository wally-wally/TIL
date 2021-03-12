// Several examples of "+" quantifier

const str1 = '-@@@- * ** - - "*" -- * ** -@@@-';

console.log(str1.match(/\*+/));
console.log(str1.match(/\*+/g));

// 맨 앞과 뒤는 반드시 마이너스 기호이고 그 사이에 @ 기호가 1개 이상인 경우
console.log(str1.match(/-@+-/));
console.log(str1.match(/-@+-/g));

// 대괄호 안에 ^은 부정의 의미
// [^ ]+ => 공백이 아닌 것이 하나 이상인 경우
console.log(str1.match(/[^ ]+/));
console.log(str1.match(/[^ ]+/g));
