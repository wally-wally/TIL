/**
 * @param {string} s
 * @return {number}
 */
const lengthOfLastWord = (s) => s.trim().split(/\s/).reverse()[0].length;

console.log(lengthOfLastWord('Hello World')); // 5
console.log(lengthOfLastWord(' ')); // 0
