// \b의 반대

const str1 = 'Ere iron was found or tree was hewn, When young was mountain under moon; Ere ring was made, or wrought was woe, It walked the forests long ago.';

// 단어 시작 지점을 제외한 것들 검출
console.log(str1.match(/\B./));
console.log(str1.match(/\B./g));

// 단어 종료 지점을 제외한 것들 검출
console.log(str1.match(/.\B/));
console.log(str1.match(/.\B/g));
