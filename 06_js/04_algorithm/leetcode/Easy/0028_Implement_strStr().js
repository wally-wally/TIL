/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
  const REG = new RegExp(needle);
  const MATCH_RESULT = haystack.match(needle);
  return MATCH_RESULT ? MATCH_RESULT.index : -1;
};
