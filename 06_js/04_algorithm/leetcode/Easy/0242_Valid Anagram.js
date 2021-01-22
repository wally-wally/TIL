/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isAnagram = (s, t) => s.split('').sort().join('') === t.split('').sort().join('');
