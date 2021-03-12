// Several examples of "?" quantifier

const str1 = '--XX-@-XX-@@-XX-@@@-XX-@@@@-XX-@@-@@-';

// 필수로 있어야하는 X의 개수는 2개
console.log(str1.match(/-X?XX?X/));
console.log(str1.match(/-X?XX?X/g));

// 맨 앞과 뒤에 마이너스 기호가 붙으며 그 사이에 올 수 있는 @의 최대 개수는 3개, 최소 개수는 0개이다.
console.log(str1.match(/-@?@?@?-/));
console.log(str1.match(/-@?@?@?-/g));

console.log(str1.match(/[^@]@?@/));
console.log(str1.match(/[^@]@?@/g));
