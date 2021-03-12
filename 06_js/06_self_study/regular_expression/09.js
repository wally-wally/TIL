// Several examples of "*" quantifier

const str1 = '-@- *** -- "*" -- *** -@-';

console.log(str1.match(/.*/));
console.log(str1.match(/.*/g));

// -A*- => 뒤 마이너스 기호 앞에 A가 없거나 1개 이상 있고 그 앞에는 마이너스 기호가 있는 경우
console.log(str1.match(/-A*-/));
console.log(str1.match(/-A*-/g));

// [-@]* => - 또는 @가 없거나 1개 이상 있는 경우
console.log(str1.match(/[-@]*/));
console.log(str1.match(/[-@]*/g));
