/**
 * @param {string} s
 * @return {string}
 */
let reformat = s => {
  // [prechecker 1] 문자열 길이가 1인 경우 인자로 받은 문자열 그대로 return
  if (s.length <= 1) {
    return s;
  }

  let matchedNumbers = s.match(/[0-9]/g);
  let matchedLowerAlphabets = s.match(/[a-z]/g);
  
  // [prechecker 2] 받은 문자열에 숫자가 아예 없거나 영어 소문자가 아예 없으면 reformat을 못하므로 empty string return
  if (!matchedNumbers || !matchedLowerAlphabets) {
    return '';
  }
  
  const MATCHED_NUMBER_COUNT = matchedNumbers.length;
  const MATCHED_LOWER_ALPHABET_COUNT = matchedLowerAlphabets.length;
  // [prechecker 3] 숫자 개수와 영어 소문자 개수가 2 이상이여도 reformat을 못하므로 empty string return
  if (Math.abs(MATCHED_NUMBER_COUNT - MATCHED_LOWER_ALPHABET_COUNT) >= 2) {
    return '';
  }
  
  // 숫자 개수와 영어 소문자 개수 중 최솟값 인덱스까지 '숫자-영어' 패턴으로 반복해서 문자열을 우선 붙인다.
  let answer = '';
  for (let i = 0; i < Math.min(MATCHED_NUMBER_COUNT, MATCHED_LOWER_ALPHABET_COUNT); i++) {
    answer += `${matchedNumbers[i]}${matchedLowerAlphabets[i]}`;
  }
  // '숫자 개수 === 영어 소문자 개수'인 경우는 종료
  // '|숫자 개수 - 영어 소문자| === 1' 인 경우 둘 중 하나는 마지막 문자가 남으므로 숫자이면 맨 뒤에, 영어 소문자이면 맨 앞에 붙인다.
  if (MATCHED_NUMBER_COUNT > MATCHED_LOWER_ALPHABET_COUNT) {
    answer += matchedNumbers[MATCHED_NUMBER_COUNT - 1];
  } else if (MATCHED_NUMBER_COUNT < MATCHED_LOWER_ALPHABET_COUNT) {
    answer = matchedLowerAlphabets[MATCHED_LOWER_ALPHABET_COUNT - 1] + answer;
  }
  return answer;
};
