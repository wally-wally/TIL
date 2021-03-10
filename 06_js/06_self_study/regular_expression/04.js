// Inside square brackets "[]" a list of characters can be provided.
// The expression matches if any of these characters is found.
// The order of characters is insignificant.

const str1 = 'How do you do?';

// 한 글자 찾기
console.log(str1.match(/[oyu]/)); // ["o", index: 1, input: "How do you do?", groups: undefined]
console.log(str1.match(/[oyu]/g)); // ["o", "o", "y", "o", "u", "o"]

// 두 글자 찾기
// [dH]. => 두 글자를 찾는데 이 때 첫 번째 문자는 소문자 d 또는 대문자 H이어야 함(온점(.)은 아무 글자)
console.log(str1.match(/[dH]./)); // ["Ho", index: 0, input: "How do you do?", groups: undefined]
console.log(str1.match(/[dH]./g)); // ["Ho", "do", "do"]

console.log(str1.match(/[owy][yow]/)); // ["ow", index: 1, input: "How do you do?", groups: undefined]
console.log(str1.match(/[owy][yow]/g)); // ["ow", "yo"]
