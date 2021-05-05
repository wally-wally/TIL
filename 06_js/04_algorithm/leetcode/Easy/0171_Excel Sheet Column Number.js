const titleToNumber = (columnTitle) => {
  // 알파벳 대문자 A의 아스키 코드가 65이므로 64를 빼서 1로 변환해준다.
  const convertTitleToNumber = (character) => character.charCodeAt() - 64;

  // 실제 계산 함수
  const calcColumnNumber = (acc, curr, index) => acc + (convertTitleToNumber(curr) * (26 ** index));

  // 26진법 형태로 고려해서 계산
  return columnTitle.split('').reverse().reduce(calcColumnNumber, 0);
}

console.log(titleToNumber('A')); // 1
console.log(titleToNumber('AB')); // 28
console.log(titleToNumber('ZY')); // 701
console.log(titleToNumber('FXSHRXW')); // 2147483647