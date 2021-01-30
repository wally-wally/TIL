/**
 * @param {string} s
 * @return {string}
 */
const decodeString = (s) => {
  const STRING_LENGTH = s.length;

  const NUM_REG = /[0-9]/;
  const ALPHABET_REG = /[a-z]/;

  const makeDecodeString = (startIdx, repeatCount) => {
    let tempAnswer = '';
    let tempRepeatNumber = '';
    for (let i = startIdx; i < STRING_LENGTH; i += 1) {
      if (NUM_REG.test(s[i])) {
        tempRepeatNumber += s[i];
      } else if (s[i] === '[') {
        const [tempStr, tempIdx] = makeDecodeString(i + 1, Number(tempRepeatNumber));
        tempRepeatNumber = '';
        tempAnswer += tempStr;
        i = tempIdx;
      } else if (s[i] === ']') {
        return [tempAnswer.repeat(repeatCount), i];
      } else if (ALPHABET_REG.test(s[i])) {
        tempAnswer += s[i];
      }
    }
    return tempAnswer.repeat(repeatCount);
  };

  return makeDecodeString(0, 1);
};

decodeString('10[abc]');
