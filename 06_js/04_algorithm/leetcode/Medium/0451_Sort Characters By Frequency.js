/**
 * @param {string} s
 * @return {string}
 */
const frequencySort = (s) => {
  let alphabetInfo = new Map();
  for (const str of s) {
    if (!alphabetInfo.has(str)) {
      alphabetInfo.set(str, 1);
    } else {
      const INIT_COUNT = alphabetInfo.get(str);
      alphabetInfo.set(str, INIT_COUNT + 1);
    }
  }
  
  const REVERSE_SORTED_ALPHABET_COUNT_INFO = Array.from(alphabetInfo.entries()).sort((a, b) => b[1] - a[1]);
  let answer = '';
  for (const STR_INFO of REVERSE_SORTED_ALPHABET_COUNT_INFO) {
    answer += STR_INFO[0].repeat(STR_INFO[1]);
  }
  return answer;
};
