// \A matches the beginning of string.(시작점 경계를 의미)
// It is similar to ^, but ^ will match after each newline, if multiline strings are considered.
// Similarly, \Z matches only at the end of the string or before newline at the end of it. 
// It is similar to $, but $ will match before each newline.
// 단, \A와 ^ 그리고 \Z와 $는 서로 multiline일 때 다르게 검출된다는 것에 유의하자!

const str1 = 'Ere iron was found or tree was hewn, When young was mountain under moon; Ere ring was made, or wrought was woe, It walked the forests long ago.';

// 시작점을 기준으로 뒤의 세 개의 문자 검출
console.log(str1.match(/\A.../)); // "Ere"

// 종료점을 기준으로 앞의 세 개의 문자 검출
console.log(str1.match(/...\Z/)); // "go."
