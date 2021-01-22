/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
const strStr = (haystack, needle) => {
  const MATCH_RESULT = haystack.match(needle);
  return MATCH_RESULT ? MATCH_RESULT.index : -1;
};
