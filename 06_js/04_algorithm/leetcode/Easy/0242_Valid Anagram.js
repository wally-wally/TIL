/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = (s, t) => s.split('').sort().join('') === t.split('').sort().join('');
