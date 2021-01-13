/**
 * @param {string} s
 * @return {string}
 */
let freqAlphabets = s => {
  // 26# - 25# - 24# - ... - 3 - 2 - 1 순서로 진행
  for (let i = 26; i >= 1; i--) {
    // 해당 문자열이 여러 개일 수 있기 때문에 'g' 플래그 사용
    const STRING_REG = new RegExp(`${i}${i >= 10 ? '#' : ''}`, 'g');
    // String.fromCharCode()로 아스키 코드 값에 해당하는 문자열로 변환
    s = s.replace(STRING_REG, String.fromCharCode(i + 96));
  }
  return s;
};
