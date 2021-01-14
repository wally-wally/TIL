/**
 * @param {string} sequence
 * @param {string} word
 * @return {number}
 */
let maxRepeating = (sequence, word) => {
  let answer = 0;

  const SEQUENCE_LENGTH = sequence.length;
  const WORD_LENGTH = word.length;
  const MAX_RANGE = SEQUENCE_LENGTH - WORD_LENGTH;

  const CHECK_SAME_WORD = startIndex => {
    let count = 0;
    while (startIndex <= MAX_RANGE) {
      if (sequence.slice(startIndex, startIndex + WORD_LENGTH) === word) {
        count += 1;
        startIndex += WORD_LENGTH;
      } else {
        return count;
      }
    }
    return count;
  }
  
  for (let i = 0; i <= MAX_RANGE; i++) {
    answer = Math.max(answer, CHECK_SAME_WORD(i));
  }

  return answer;
};
