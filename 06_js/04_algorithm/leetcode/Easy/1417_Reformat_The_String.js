/**
 * @param {string} s
 * @return {string}
 */
const reformat = (s) => {
  // [prechecker 1] 문자열 길이가 1인 경우 인자로 받은 문자열 그대로 return
  if (s.length <= 1) {
    return s;
  }

  const MATCHED_NUMBERS = s.match(/[0-9]/g);
  const MATCHED_LOWER_ALPHABETS = s.match(/[a-z]/g);

  // [prechecker 2] 받은 문자열에 숫자가 아예 없거나 영어 소문자가 아예 없으면 reformat을 못하므로 empty string return
  if (!MATCHED_NUMBERS || !MATCHED_LOWER_ALPHABETS) {
    return '';
  }

  const MATCHED_NUMBER_COUNT = MATCHED_NUMBERS.length;
  const MATCHED_LOWER_ALPHABET_COUNT = MATCHED_LOWER_ALPHABETS.length;
  // [prechecker 3] 숫자 개수와 영어 소문자 개수가 2 이상이여도 reformat을 못하므로 empty string return
  if (Math.abs(MATCHED_NUMBER_COUNT - MATCHED_LOWER_ALPHABET_COUNT) >= 2) {
    return '';
  }

  // 숫자와 영어를 반복하면서 이어 붙여서 새로운 문자열을 만든다.
  const makeNewString = (endIndex, frontArr, backArr) => {
    let tempAnswer = '';
    for (let i = 0; i < endIndex; i += 1) {
      tempAnswer += `${frontArr[i]}${backArr[i]}`;
    }
    return tempAnswer + (frontArr.length === backArr.length ? '' : frontArr[frontArr.length - 1]);
  };

  const END_INDEX = Math.min(MATCHED_NUMBER_COUNT, MATCHED_LOWER_ALPHABET_COUNT);
  let answer = '';
  if (MATCHED_NUMBER_COUNT >= MATCHED_LOWER_ALPHABET_COUNT) {
    answer = makeNewString(END_INDEX, MATCHED_NUMBERS, MATCHED_LOWER_ALPHABETS);
  } else if (MATCHED_NUMBER_COUNT < MATCHED_LOWER_ALPHABET_COUNT) {
    answer = makeNewString(END_INDEX, MATCHED_LOWER_ALPHABETS, MATCHED_NUMBERS);
  }

  return answer;
};

reformat('a0b1c2');
