// \b matches a word boundary.
// A word boundary (\b) is defined as a spot between two characters that has a \w on one side of it and a \W on the other side of it (in either order).

const str1 = 'Ere iron was found or tree was hewn, When young was mountain under moon; Ere ring was made, or wrought was woe, It walked the forests long ago.';

// 단어 시작 지점 검출
console.log(str1.match(/\b./));
console.log(str1.match(/\b./g));

// 단어 종료 지점 검출
console.log(str1.match(/.\b/));
console.log(str1.match(/.\b/g));

// 단어 검출
console.log(str1.match(/\b\w+\b/));
console.log(str1.match(/\b\w+\b/g)); // 모든 단어


const str2 = 'cat concat';

console.log(str2.match(/\bcat/g)); // cat 한 개 검출
console.log(str2.match(/cat\b/g)); // cat 두 개 검출
